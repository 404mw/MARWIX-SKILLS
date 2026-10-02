# mw-image-prompt — A worked example, rough idea to deliverable

One job end to end: the batch, the user's answers, the deliverable — then the same
asset encoded for a second model family, to show what changes and what does not. The
facts here are invented for the example; the shape is the point.

---

## The ask

> need something for our launch post on linkedin. we cut onboarding from 3 days to
> 20 minutes

No repository, no brand docs: a web chat. Step 1 finds nothing and moves on silently.

## The batch

> **What I understand.** A LinkedIn post announcing that onboarding dropped from three
> days to twenty minutes. The image's one job is to make that contrast land at feed
> size in under a second, so the post gets read. The number is your material — it's
> stronger than any illustration of "speed", so I'd build the image around it.
>
> **Draft brief**
>
> ```
> Purpose & placement   LinkedIn launch post image, seen at feed size on a phone     [user]
> Mode                  promotional                                                   [proposed]
> Destiny               whole-frame                                                   [proposed]
> Subject + action      the 3-day → 20-minute contrast, shown physically              [proposed]
> Style source          none documented                                               [open]
> Camera                straight top-down, whole desk surface in frame                [proposed]
> Lighting              one soft window light from camera-left, gentle shadows        [proposed]
> Palette & grade       warm neutrals, one accent color                               [proposed]
> In-image text         "3 DAYS → 20 MIN"                                             [proposed]
> Where it's generated  ?                                                             [open]
> Ratio & size          1:1 — takes the most vertical space in the LinkedIn feed      [proposed]
> Lock level            L2                                                            [proposed]
> Budget                draft and iterate at standard quality; no final-tier render   [proposed]
> Verification          pre-post audit (social.md)                                    [proposed]
> ```
>
> **Questions**
>
> 1. **What should the image show?** I recommend (a).
>    (a) *The diff:* a thick stapled 3-day onboarding checklist beside a kitchen timer
>    set to 20:00. (b) *The receipt:* a real screenshot of your new onboarding screen,
>    staged on a laptop. (c) *A metaphor:* a long winding road beside a one-step
>    staircase — weaker, since it doesn't use your actual number.
> 2. **Where will you generate it?** I recommend whatever you already pay for.
>    (a) ChatGPT (b) Gemini (c) Midjourney (d) an API or another tool
> 3. **Is there a look to match** — a past post, your site, brand colors? If not: warm,
>    editorial, product-photography restraint, with your brand color as the one accent.
> 4. **Text in the image:** "3 DAYS → 20 MIN" as the headline, or none and keep the
>    words in the post? I recommend the headline — it's the hook.

## The user's answers

> a, chatgpt, our brand color is #3B5BDB, headline yes

Every work-changing row is now settled, so the deliverable follows directly.

## The deliverable

**Confirmed brief**

```
Purpose & placement   LinkedIn launch post image, seen at feed size on a phone      [user]
Mode                  promotional                                                    [user]
Destiny               whole-frame                                                    [user]
Subject + action      stapled 3-day checklist beside a kitchen timer at 20:00        [user]
Style source          warm editorial product photography; brand accent #3B5BDB       [user]
Camera                straight top-down, whole desk surface in frame                 [proposed → accepted]
Lighting              one soft window light from camera-left, gentle shadows         [proposed → accepted]
Palette & grade       warm off-white and pale wood; the only saturated color is the
                      #3B5BDB headline                                               [user]
In-image text         "3 DAYS → 20 MIN"                                              [user]
Where it's generated  GPT-Image-2.5 in ChatGPT                                       [user]
Ratio & size          1:1                                                            [proposed → accepted]
Lock level            L2                                                             [proposed → accepted]
Budget                standard quality; no final-tier render                         [proposed → accepted]
Verification          pre-post audit (social.md)                                     [proposed → accepted]
Constraints           banned: watermark, signature, extra text, extra logos, real brand marks
                      process: none (no references attached)
```

### Asset 1 — `launch-onboarding-cover.png`, LinkedIn post image

**Where to generate:** GPT-Image-2.5 in ChatGPT. Paste the prompt as one message and
ask for it to be used as written.

**Prompt** — labeled sections, the GPT-Image family's preferred shape for a brief with
text and layout:

```
A square 1:1 image. Photorealistic photograph, real product-photography look, not an
illustration or 3D render.

Scene: a pale wood desk seen from directly above, the whole desk surface filling the
frame, lit by one soft window light from camera-left that casts gentle shadows to the
right.

Subject: on the left half, a thick stapled stack of paper — a long onboarding
checklist, about forty rows of soft gray lines with empty tick boxes, edges slightly
curled from use. On the right half, a plain unbranded white kitchen timer whose dial
reads exactly 20:00. The contrast between the heavy stack and the small timer is the
point: the viewer should feel how much time disappeared.

Details: across the top fifth of the frame, the headline "3 DAYS → 20 MIN" in a bold
geometric sans-serif, color #3B5BDB, centered, generous margins. The checklist rows
are soft gray lines, not legible words. The timer is plain white with a clean, unmarked
face apart from its numbers. Warm off-white and pale wood tones throughout; the
headline is the only saturated color.

Constraints: render the headline verbatim — "3 DAYS → 20 MIN" — with no extra
characters and no duplicate text. Clean, unmarked corners. Every object plain and
unbranded.
```

**Settings outside the prompt:** none in ChatGPT — ratio and quality are carried by
the prompt.

**Constraints, as phrased for this family:** positive restatement throughout ("plain
unbranded", "clean, unmarked corners", "soft gray lines, not legible words"); the only
direct instruction is the text hard stop, which OpenAI's guidance sanctions for text.

**Variations** (composition and camera only):

- *V1 — three-quarter angle:* camera lowered to 45° from camera-front, the stack in the
  foreground left, the timer sharp behind it; headline unchanged.
- *V2 — tighter crop:* the stack's top edge and the full timer fill the frame; the
  headline sits on the desk surface in the top fifth.

**Pre-post audit, instantiated:**

- [ ] "3 DAYS → 20 MIN" letter by letter, arrow included
- [ ] timer reads exactly 20:00
- [ ] no brand marks on the timer, the paper or the staple
- [ ] zoom-out test: contrast readable at thumbnail size on a phone
- [ ] honesty: the post states the 3-day → 20-minute claim the image makes
- [ ] dark-mode check: headline holds against a dark feed
- [ ] alt text: "A thick stapled onboarding checklist beside a kitchen timer set to
      20 minutes, under the headline '3 days → 20 min'."

**Anchor block to reuse** — tuned on **GPT-Image-2.5**; valid only on that family:

```
Photorealistic photograph, real product-photography look, not an illustration or 3D
render. A pale wood desk seen from directly above, lit by one soft window light from
camera-left that casts gentle shadows to the right. Warm off-white and pale wood tones
throughout; the only saturated color is #3B5BDB, used for the headline alone.
```

## The same asset, encoded for Midjourney V8.2

Had the user answered "Midjourney", the brief would not change — only the encoding:

- **Text moves out of the model.** Midjourney renders a word or two reliably; a
  headline with an arrow and a number is a composite job. Generate the image with the
  top fifth left as empty desk, and set the headline in an editor.
- **Prose shortens, parameters carry the settings.** Ratio, literalness and exclusions
  become parameters.
- **Exclusions get a real channel.** `--no` takes bare nouns — but not `text`
  here: it would fight the timer's numerals. An exclusion that contradicts the subject
  is a bug, whatever the channel.

```
Top-down photograph of a pale wood desk, the whole surface in frame. On the left, a
thick stapled onboarding checklist, about forty rows of soft gray lines with empty
tick boxes, edges curled from use. On the right, a plain white kitchen timer reading
20:00. One soft window light from camera-left, gentle shadows to the right, warm
off-white and pale wood tones. The top fifth of the frame is empty desk surface.
Editorial product photography, quiet and precise. --ar 1:1 --raw --s 50 --v 8.2 --no logo, watermark, signature
```

The anchor for a Midjourney series is the description's style sentences *and* the
parameter string `--raw --s 50 --v 8.2`, stamped **Midjourney V8.2** — the GPT-Image
anchor above does not transfer.
