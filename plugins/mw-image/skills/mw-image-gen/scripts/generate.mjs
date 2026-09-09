#!/usr/bin/env node
// mw-image-gen executor: calls a fal.ai endpoint and saves image(s) + a JSON sidecar.
// The API key is read from the FAL_KEY environment variable, never from arguments,
// and is never printed. Requires Node 18+ (native fetch), no dependencies.
//
// Usage:
//   node generate.mjs --model <fal-endpoint-id> --prompt-file <path> --out <dir-or-file>
//                     (--size WxH | --aspect W:H --resolution 0.5K|1K|2K|4K)   # family-dependent, see endpoints.md
//                     [--count N] [--seed N] [--quality auto|low|medium|high|xhigh|max]
//                     [--steps N] [--negative-file <path>] [--image <path-or-url>]...
//
// --image marks edit mode (use the endpoint's /edit id); local files are inlined
// as data URIs, http(s) URLs are passed through.

import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

// ---------- args ----------
const argv = process.argv.slice(2);
const opts = { images: [], count: 1 };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const next = () => {
    if (++i >= argv.length) fail(`missing value for ${a}`);
    return argv[i];
  };
  switch (a) {
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

const key = process.env.FAL_KEY;
if (!key) fail('FAL_KEY is not set. Store it as an environment variable (e.g. `setx FAL_KEY "..."` on Windows, then restart the terminal). Do not pass keys as arguments.');
if (!opts.model) fail('--model is required (exact fal endpoint id, e.g. fal-ai/flux-2/klein/4b)');
if (!opts.promptFile) fail('--prompt-file is required (prompts travel in files, not argv)');
if (!opts.out) fail('--out is required (directory, or a file path when --count is 1)');
if (!Number.isInteger(opts.count) || opts.count < 1) fail('--count must be a positive integer');

const prompt = readFileSync(opts.promptFile, 'utf8').trim();
if (!prompt) fail(`prompt file is empty: ${opts.promptFile}`);
const negative = opts.negativeFile ? readFileSync(opts.negativeFile, 'utf8').trim() : null;

// ---------- endpoint family rules (see references/endpoints.md) ----------
const model = opts.model;
const isNB = model.includes('nano-banana');
const isGPT = model.includes('gpt-image');
const isQwenEdit = model === 'fal-ai/qwen-image-edit';
const isEdit = opts.images.length > 0;

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

function toDataUri(ref) {
  if (/^https?:\/\//i.test(ref) || ref.startsWith('data:')) return ref;
  const p = resolve(ref);
  if (!existsSync(p)) fail(`--image file not found: ${ref}`);
  const mime = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif' }[extname(p).toLowerCase()];
  if (!mime) fail(`unsupported --image extension: ${ref}`);
  return `data:${mime};base64,${readFileSync(p).toString('base64')}`;
}

function buildParams(seed) {
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

// ---------- run ----------
const saved = [];
for (let n = 0; n < opts.count; n++) {
  const seed = opts.seed != null ? opts.seed + n : null;
  const params = buildParams(seed);
  process.stderr.write(`[${n + 1}/${opts.count}] ${model} ...\n`);

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

    // Sidecar: everything needed to reproduce or audit — but never the key,
    // and edit inputs are recorded as the original references, not data URIs.
    const sidecarParams = { ...params };
    if (sidecarParams.image_url) sidecarParams.image_url = opts.images[0];
    if (sidecarParams.image_urls) sidecarParams.image_urls = [...opts.images];
    const sidecar = {
      created: new Date().toISOString(),
      model,
      request_id: requestId,
      params: sidecarParams,
      seed_returned: data.seed ?? null,
      image: { file, width: img.width ?? null, height: img.height ?? null, content_type: img.content_type ?? null },
    };
    writeFileSync(file.replace(/\.[a-z]+$/i, '.json'), JSON.stringify(sidecar, null, 2));
    saved.push({ file, seed: data.seed ?? null, requestId });
    console.log(`saved ${file} (seed: ${data.seed ?? 'n/a'}, request: ${requestId})`);
  }
}
console.log(`done: ${saved.length} image(s)`);
