#!/usr/bin/env node
// mw-image-gen executor: calls fal.ai or OpenAI and saves image(s) + a JSON sidecar.
// The API key is read from the environment (FAL_KEY or OPENAI_API_KEY), never from
// arguments, and is never printed. Requires Node 18+ (native fetch/FormData/Blob),
// no dependencies.
//
// Usage:
//   node generate.mjs --model <endpoint-id> --prompt-file <path> --out <dir-or-file>
//                     [--provider fal|openai]                      # default: fal
//                     (--size WxH | --aspect W:H --resolution 0.5K|1K|2K|4K)   # family-dependent, see endpoints.md
//                     [--count N] [--seed N] [--quality auto|low|medium|high|xhigh|max]
//                     [--steps N] [--negative-file <path>] [--image <path-or-url>]...
//
// --image marks edit mode (use the endpoint's /edit id on fal); local files are
// inlined as data URIs on fal, uploaded as multipart parts on OpenAI.
//
// The two providers spell the same model differently: fal wants the slash path
// (openai/gpt-image-2.5/flare/text-to-image), OpenAI wants the hyphenated id
// (gpt-image-2.5-flare). --provider picks the path; the id must match it.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { extname, join, resolve, basename } from 'node:path';

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

// ---------- args ----------
const argv = process.argv.slice(2);
const opts = { images: [], count: 1, provider: 'fal' };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const next = () => {
    if (++i >= argv.length) fail(`missing value for ${a}`);
    return argv[i];
  };
  switch (a) {
    case '--provider': opts.provider = next(); break;
    case '--model': opts.model = next(); break;
    case '--prompt-file': opts.promptFile = next(); break;
    case '--negative-file': opts.negativeFile = next(); break;
    case '--out': opts.out = next(); break;
    case '--size': opts.size = next(); break;
    case '--aspect': opts.aspect = next(); break;
    case '--resolution': opts.resolution = next(); break;
    case '--count': opts.count = parseInt(next(), 10); break;
    case '--seed': opts.seed = parseInt(next(), 10); break;
    case '--quality': opts.quality = next(); break;
    case '--steps': opts.steps = parseInt(next(), 10); break;
    case '--image': opts.images.push(next()); break;
    default: fail(`unknown argument: ${a}`);
  }
}

if (!['fal', 'openai'].includes(opts.provider)) fail(`--provider must be fal or openai, got: ${opts.provider}`);
const isOpenAI = opts.provider === 'openai';

const keyName = isOpenAI ? 'OPENAI_API_KEY' : 'FAL_KEY';
const key = process.env[keyName];
if (!key) fail(`${keyName} is not set. Store it as an environment variable (e.g. \`setx ${keyName} "..."\` on Windows, then restart the terminal). Do not pass keys as arguments.`);
if (!opts.model) fail(`--model is required (exact endpoint id, e.g. ${isOpenAI ? 'gpt-image-2.5-flare' : 'fal-ai/flux-2/klein/4b'})`);
if (!opts.promptFile) fail('--prompt-file is required (prompts travel in files, not argv)');
if (!opts.out) fail('--out is required (directory, or a file path when --count is 1)');
if (!Number.isInteger(opts.count) || opts.count < 1) fail('--count must be a positive integer');

const prompt = readFileSync(opts.promptFile, 'utf8').trim();
if (!prompt) fail(`prompt file is empty: ${opts.promptFile}`);
const negative = opts.negativeFile ? readFileSync(opts.negativeFile, 'utf8').trim() : null;

// ---------- endpoint family rules (see references/endpoints.md) ----------
const model = opts.model;
const isNB = !isOpenAI && model.includes('nano-banana');
const isGPT = model.includes('gpt-image');
const isQwenEdit = model === 'fal-ai/qwen-image-edit';
const isEdit = opts.images.length > 0;

// A model id spelled for the other provider is a 404 that reads like an outage.
// Catch it here, before it costs a round trip and a confused debugging session.
if (isOpenAI && model.includes('/')) {
  fail(`--provider openai takes the hyphenated OpenAI model id (e.g. gpt-image-2.5-flare), not the fal slash path: ${model}`);
}
if (!isOpenAI && isGPT && !model.includes('/')) {
  fail(`--provider fal takes the fal endpoint id (e.g. openai/gpt-image-2.5/flare/text-to-image), not the OpenAI model id: ${model}`);
}

// Size is locked upstream by the prompt deliverable; there is deliberately no default.
let width = null, height = null;
if (isNB) {
  if (opts.size) fail('nano-banana endpoints take --aspect and --resolution, not --size (see endpoints.md)');
  if (!opts.aspect || !opts.resolution) fail('nano-banana endpoints require --aspect W:H and --resolution 0.5K|1K|2K|4K');
} else {
  if (!opts.size) fail('--size WxH is required and has no default: take it from the prompt deliverable');
  const m = opts.size.match(/^(\d+)x(\d+)$/i);
  if (!m) fail(`--size must be WxH in pixels, got: ${opts.size}`);
  width = parseInt(m[1], 10);
  height = parseInt(m[2], 10);
}

// GPT-Image-2.5 publishes hard size constraints, identical on both providers.
// Checking them locally turns a paid rejection into a free error — and stops the
// silent substitution that is how a 4:5 brief ends up shipping as 2:3.
if (isGPT && width && height) {
  const px = width * height;
  const ratio = Math.max(width, height) / Math.min(width, height);
  if (width % 16 || height % 16) fail(`gpt-image sizes must be multiples of 16: ${width}x${height}`);
  if (width > 3840 || height > 3840) fail(`gpt-image max edge is 3840px: ${width}x${height}`);
  if (ratio > 3) fail(`gpt-image aspect must stay within 3:1, got ${ratio.toFixed(2)}:1 (${width}x${height})`);
  if (px < 655360 || px > 8294400) fail(`gpt-image total pixels must be 655,360-8,294,400, got ${px.toLocaleString()} (${width}x${height})`);
  if (Math.max(width, height) > 2560 || Math.min(width, height) > 1440) {
    process.stderr.write(`note: ${width}x${height} is above 2560x1440, which OpenAI documents as experimental.\n`);
  }
}

// OpenAI bills these models per token, and output tokens track the quality tier.
// Letting quality default to `auto` lets the model pick the tier — and the bill —
// per request, which makes the skill's pre-approved cost statement impossible.
if (isOpenAI && !opts.quality) {
  fail('--quality is required on --provider openai: OpenAI defaults to `auto`, which re-picks the tier (and the price) per request. Name a tier: low|medium|high|xhigh|max.');
}

function mimeFor(ref) {
  const mime = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif' }[extname(ref).toLowerCase()];
  if (!mime) fail(`unsupported --image extension: ${ref}`);
  return mime;
}

function toDataUri(ref) {
  if (/^https?:\/\//i.test(ref) || ref.startsWith('data:')) return ref;
  const p = resolve(ref);
  if (!existsSync(p)) fail(`--image file not found: ${ref}`);
  return `data:${mimeFor(p)};base64,${readFileSync(p).toString('base64')}`;
}

async function toBlobPart(ref) {
  if (/^https?:\/\//i.test(ref)) {
    const dl = await fetch(ref);
    if (!dl.ok) fail(`--image download failed (${dl.status}): ${ref}`);
    const type = dl.headers.get('content-type') || 'image/png';
    return { blob: new Blob([await dl.arrayBuffer()], { type }), name: basename(new URL(ref).pathname) || 'image.png' };
  }
  const p = resolve(ref);
  if (!existsSync(p)) fail(`--image file not found: ${ref}`);
  return { blob: new Blob([readFileSync(p)], { type: mimeFor(p) }), name: basename(p) };
}

// ---------- request builders ----------
function buildFalParams(seed) {
  const params = { prompt, output_format: 'png', sync_mode: false };
  if (isNB) {
    params.aspect_ratio = opts.aspect;
    params.resolution = opts.resolution;
  } else {
    params.image_size = { width, height };
  }
  if (seed != null && !isGPT) params.seed = seed; // gpt-image endpoints have no seed param
  if (opts.quality) params.quality = opts.quality;
  if (opts.steps) params.num_inference_steps = opts.steps;
  if (negative) params.negative_prompt = negative;
  if (isEdit) {
    if (isQwenEdit) {
      if (opts.images.length !== 1) fail('qwen-image-edit takes exactly one --image (singular image_url)');
      params.image_url = toDataUri(opts.images[0]);
    } else {
      params.image_urls = opts.images.map(toDataUri);
    }
  }
  return params;
}

function buildOpenAIParams() {
  // No seed, no negative channel, no step control on the OpenAI image models.
  // Say so rather than dropping the flag silently.
  if (opts.seed != null) process.stderr.write('note: --seed is ignored on --provider openai (no seed parameter).\n');
  if (opts.steps) process.stderr.write('note: --steps is ignored on --provider openai.\n');
  if (negative) {
    process.stderr.write('note: --negative-file has no negative channel on --provider openai; its text is appended to the prompt as stated exclusions.\n');
  }
  return {
    model,
    prompt: negative ? `${prompt}\n\nExclude: ${negative}` : prompt,
    size: `${width}x${height}`,
    quality: opts.quality,
    output_format: 'png',
    n: 1,
  };
}

// Posted rates, USD per million tokens, read 2026-09-20. Indicative only — they
// decay like every other price in this plugin. The sidecar keeps the raw usage
// block so a past run can be re-priced instead of re-guessed.
const OPENAI_RATES = { text_input: 5, image_input: 8, output: 30 };

function priceFromUsage(usage) {
  if (!usage || typeof usage !== 'object') return null;
  const details = usage.input_tokens_details || {};
  const textIn = details.text_tokens ?? null;
  const imageIn = details.image_tokens ?? null;
  const out = usage.output_tokens ?? null;
  if (out == null) return null;
  let cost = (out / 1e6) * OPENAI_RATES.output;
  if (textIn != null) cost += (textIn / 1e6) * OPENAI_RATES.text_input;
  if (imageIn != null) cost += (imageIn / 1e6) * OPENAI_RATES.image_input;
  // Fall back to a blended input rate when the breakdown is absent.
  if (textIn == null && imageIn == null && usage.input_tokens != null) {
    cost += (usage.input_tokens / 1e6) * (isEdit ? OPENAI_RATES.image_input : OPENAI_RATES.text_input);
  }
  return Number(cost.toFixed(5));
}

async function callFal(params) {
  const res = await fetch(`https://fal.run/${model}`, {
    method: 'POST',
    headers: { Authorization: `Key ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const requestId = res.headers.get('x-fal-request-id');
  if (!res.ok) fail(`fal returned ${res.status} for ${model}: ${await res.text()}`);
  const data = await res.json();
  const images = data.images || (data.image ? [data.image] : []);
  if (images.length === 0) fail(`no images in response (request ${requestId})`);
  return { requestId, images, seedReturned: data.seed ?? null, usage: null };
}

async function callOpenAI(params) {
  const url = `https://api.openai.com/v1/images/${isEdit ? 'edits' : 'generations'}`;
  let res;
  if (isEdit) {
    const form = new FormData();
    for (const [k, v] of Object.entries(params)) form.append(k, String(v));
    for (const ref of opts.images) {
      const { blob, name } = await toBlobPart(ref);
      form.append('image[]', blob, name);
    }
    res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${key}` }, body: form });
  } else {
    res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  }
  const requestId = res.headers.get('x-request-id');
  if (!res.ok) fail(`OpenAI returned ${res.status} for ${model}: ${await res.text()}`);
  const data = await res.json();
  const items = data.data || [];
  if (items.length === 0) fail(`no images in response (request ${requestId})`);
  // The gpt-image models return base64 only; there is no url to download.
  const images = items.map((item) => ({
    url: item.b64_json ? `data:image/png;base64,${item.b64_json}` : item.url,
    content_type: 'image/png',
    width: null,
    height: null,
  }));
  return { requestId, images, seedReturned: null, usage: data.usage ?? null };
}

// ---------- output naming ----------
const outIsFile = /\.(png|jpe?g|webp)$/i.test(opts.out);
if (outIsFile && opts.count > 1) fail('--out must be a directory when --count > 1');
if (!outIsFile) mkdirSync(opts.out, { recursive: true });
const slug = model.replace(/^fal-ai\//, '').replace(/[^a-z0-9]+/gi, '-');
const stamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);

function extFor(contentType) {
  if (/jpe?g/.test(contentType || '')) return '.jpg';
  if (/webp/.test(contentType || '')) return '.webp';
  return '.png';
}

// OpenAI returns no dimensions with the image, but the skill's verification step
// checks output size against the brief — engines substitute their nearest
// supported size silently. Read it off the PNG header so the sidecar can answer.
function pngSize(bytes) {
  if (bytes.length < 24 || bytes.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

// ---------- run ----------
const saved = [];
let spend = 0;
for (let n = 0; n < opts.count; n++) {
  const seed = opts.seed != null ? opts.seed + n : null;
  const params = isOpenAI ? buildOpenAIParams() : buildFalParams(seed);
  process.stderr.write(`[${n + 1}/${opts.count}] ${opts.provider}:${model} ...\n`);

  const { requestId, images, seedReturned, usage } = isOpenAI
    ? await callOpenAI(params)
    : await callFal(params);

  const cost = isOpenAI ? priceFromUsage(usage) : null;
  if (cost != null) spend += cost;

  for (let j = 0; j < images.length; j++) {
    const img = images[j];
    let bytes;
    if (img.url.startsWith('data:')) {
      bytes = Buffer.from(img.url.slice(img.url.indexOf(',') + 1), 'base64');
    } else {
      const dl = await fetch(img.url);
      if (!dl.ok) fail(`image download failed: ${dl.status}`);
      bytes = Buffer.from(await dl.arrayBuffer());
    }
    const file = outIsFile
      ? resolve(opts.out)
      : join(resolve(opts.out), `${slug}-${stamp}-${String(n + 1).padStart(2, '0')}${images.length > 1 ? `-${j + 1}` : ''}${extFor(img.content_type)}`);
    writeFileSync(file, bytes);

    const measured = (img.width == null || img.height == null) ? pngSize(bytes) : null;
    const outWidth = img.width ?? measured?.width ?? null;
    const outHeight = img.height ?? measured?.height ?? null;
    if (width && height && outWidth && outHeight && (outWidth !== width || outHeight !== height)) {
      process.stderr.write(`warning: requested ${width}x${height} but the engine returned ${outWidth}x${outHeight}.\n`);
    }

    // Sidecar: everything needed to reproduce or audit — but never the key,
    // and edit inputs are recorded as the original references, not data URIs.
    const sidecarParams = { ...params };
    if (sidecarParams.image_url) sidecarParams.image_url = opts.images[0];
    if (sidecarParams.image_urls) sidecarParams.image_urls = [...opts.images];
    if (isOpenAI && isEdit) sidecarParams.images = [...opts.images];
    const sidecar = {
      created: new Date().toISOString(),
      provider: opts.provider,
      model,
      request_id: requestId,
      params: sidecarParams,
      seed_returned: seedReturned,
      // Kept raw and unparsed: these models bill per token and the rates move.
      // The verbatim block is what lets a past run be re-priced rather than
      // re-guessed from a number someone wrote down once.
      usage: usage ?? null,
      estimated_cost_usd: cost,
      image: { file, width: outWidth, height: outHeight, content_type: img.content_type ?? null },
    };
    writeFileSync(file.replace(/\.[a-z]+$/i, '.json'), JSON.stringify(sidecar, null, 2));
    saved.push({ file, seed: seedReturned, requestId });
    console.log(`saved ${file} (seed: ${seedReturned ?? 'n/a'}, request: ${requestId}${cost != null ? `, ~$${cost.toFixed(4)}` : ''})`);
  }
}
console.log(`done: ${saved.length} image(s)${spend > 0 ? ` — measured spend ~$${spend.toFixed(4)}, from the usage block at posted rates` : ''}`);
