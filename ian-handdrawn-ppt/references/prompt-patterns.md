# Prompt Patterns

Use these patterns when generating final image-model PPT pages or planning slide content.

## Deck Style Lock

Write this once before generating a multi-page deck. Reuse the same style language in every page prompt.

```text
Refined commercial Chinese handdrawn technical article/PPT illustration.
Complete raster image on very light warm white paper, near #FBFAF5, with extremely subtle grain.
No full-page border and no rectangular frame unless explicitly requested.
Upper-left small page number in handwritten style.
Centered medium Chinese title with one pale blue handdrawn underline.
Small subtitle under title when needed.
For body pages, keep title size optically consistent across pages; do not enlarge short titles.
Fine black ink and pencil linework, delicate hatching, stable but slightly irregular.
Muted pastel marker labels: pale blue, sage green, peach, lavender.
Sparse corner construction marks only: faint pale grey grid, dots, ruler ticks, measurement lines.
Generous negative space, calm premium teaching-note feeling.
Mostly small object-based diagrams; no more than one tiny person, placed far in a corner.
Props should be blank or contain only simple line marks unless their text appears in Required text only.
Avoid full-page border, yellow paper, beige paper, giant fonts, cheap poster look, childish doodles, many characters, thick marker strokes, dense bullets, corporate template style, shadows, gradients, neon, watermark, gibberish text, English filler.
```

## Reference Match Clause

Use this when the user wants the reference-image look or a commercial style sample.

```text
Match the approved article-illustration shell: near-white warm paper, no full-page border, upper-left small page number, centered restrained handwritten Chinese title, one pale blue underline, small subtitle beneath, sparse corner grid/dot construction marks, fine ink-and-pencil object drawings with delicate hatching, small refined central diagram, and large negative space. Keep the outer shell consistent across pages; only vary the central diagram layout according to the content.
```

## Page Role Locks

Use exactly one page role in every production prompt.

```text
Page role: cover image.
Canvas: 21:9 ultra-wide, preferred final size 2520x1080.
Title may be medium-large but still elegant and restrained.
Main metaphor occupies about 50-55% of page width.
No page number unless requested.
```

```text
Page role: body illustration.
Canvas: 16:9, preferred final size 1920x1080.
This is not a cover page.
Title is medium and restrained, optically consistent with the other body pages.
Even if the title is short, do not enlarge it.
Central diagram occupies about 50-60% of page width and 35-45% of page height.
```

## Complete Page Image Prompt

Use for each final page image. Use the built-in image generation model directly. Do not substitute script-generated layouts for style trials.

```text
Use case: productivity-visual.
Asset type: one complete Chinese handdrawn technical article/PPT image, final raster page.
Preferred final size: use the page role target, 2520x1080 for 21:9 cover or 1920x1080 for 16:9 body illustration when supported; otherwise keep native role ratio and report actual dimensions.

Create page <number>/<total> of a coherent deck.
Page role: <cover image | body illustration | standard deck page>
Page number text exactly: <NN / TT, omit for cover if page number is not wanted>
Title exactly: <short Chinese title>
Subtitle exactly: <optional short Chinese subtitle>
Archetype: <cover metaphor | left-right contrast | horizontal process | circular mechanism | branching map | classification map | matrix table | main metaphor | takeaway>
Main point: <one sentence>

Apply the deck style lock: <paste compact style lock>.
Reference match clause: <paste when needed>.

Composition:
<specific layout based on semantics. Describe object-based handdrawn diagram, not generic boxes.>
Scale lock:
<for body illustration: central diagram 50-60% page width and 35-45% page height; title same optical size as other body pages.>

Required text only:
<list every visible Chinese text item exactly. Keep this list short.>

Avoid:
full-page border, yellow paper, beige paper, oversized central objects, oversized body-page title, heavy bottom boxes, extra text, invented micro-labels, gibberish, English, watermark, crowded composition, many people, childish cartoons, thick outlines, saturated colors, corporate template look.
```

## 21:9 Cover Image Prompt

Use when the user asks for a blog/article cover.

```text
Use case: Chinese blog/article cover image.
Asset type: one complete 21:9 ultra-wide Chinese handdrawn technical cover image, final raster page.
Preferred final size: 2520x1080 if supported.

Page role: cover image.
Title exactly: <title>
Subtitle exactly: <subtitle>
Archetype: cover metaphor
Main point: <one sentence>

Apply the deck style lock: <paste compact style lock>.
Apply the cover role lock: <paste cover role lock>.

Composition:
<one small refined central metaphor, occupying about 50-55% page width, with wide empty margins.>

Required text only:
<short exact visible Chinese text list>

Avoid:
full-page border, yellow paper, beige paper, large poster composition, giant title, heavy boxes, extra text, invented micro-labels, English, gibberish, watermark.
```

## 16:9 Body Illustration Prompt

Use for article body images and regular explanatory pages.

```text
Use case: Chinese blog/article body illustration.
Asset type: one complete 16:9 Chinese handdrawn technical body illustration, final raster page.
Preferred final size: 1920x1080 if supported.

Page role: body illustration.
Create page <number>/<total> of a coherent illustration set.
Page number text exactly: <NN / TT>
Title exactly: <title>
Subtitle exactly: <subtitle>
Archetype: <left-right contrast | horizontal process | circular mechanism | branching map | classification map | matrix table | main metaphor | takeaway>
Main point: <one sentence>

Apply the deck style lock: <paste compact style lock>.
Apply the body illustration role lock: <paste body role lock>.

Composition:
<small refined central semantic diagram. Keep the diagram about 50-60% page width and 35-45% page height.>

Required text only:
<short exact visible Chinese text list>

Avoid:
full-page border, yellow paper, beige paper, large central objects, oversized title, heavy bottom quote box, extra text, invented micro-labels, English, gibberish, watermark, crowded composition.
```

## Compact Three-Station Body Page

Use when the content is a process, pipeline, or three-part framework in the approved article-illustration style.

```text
Composition: three calm stations across the middle with slim arrows between them.
Each station has a pastel marker label above, a detailed handdrawn object in the center, and one tiny semantic caption below with a short colored underline.
Keep object drawings more detailed than icons: pencil hatching, fine contour lines, small construction details.
Leave wide margins and quiet negative space.
Keep the three-station group compact: about 55-60% page width on body illustrations.
No full-page border. Near-white warm paper. Faint corner marks only.
Use at most one tiny figure in the lower-right corner.
```

## Slide Content Compression

Use this prompt internally:

```text
Compress this source section into one slide.
Keep exactly one main point.
Choose the best semantic archetype.
Return a title, 2-4 content blocks, optional annotations, required visible text, and a complete page image brief.
Do not produce a bullet dump.
```

## Multi-Page Consistency Pass

Before generating page images, check:

```text
- Does every page share the same page number position?
- Does every page use the same near-white paper, no-border shell, title underline, line weight, and pastel family?
- Are cover images 21:9 and body illustrations 16:9?
- Are body-page titles optically the same size, including short titles?
- Is the central diagram compact enough, or did the model fill the page?
- Are layouts semantic rather than randomly different?
- Are there too many people across the deck?
- Is each page's Required text only list short enough for clean image rendering?
- Are props free of fake English, URLs, and filler text?
```

## Text Fidelity Fallback

Use only after the image direction is accepted and image-generated Chinese text remains incorrect.

```text
Regenerate or reuse the accepted visual with blank reserved spaces for every exact Chinese label.
Do not invent any placeholder writing.
Leave clean pale marker labels or empty paper areas where text will be overlaid.
After generation, add only the Required text items with deterministic local post-processing, matching the small hard-pen Chinese title/body style as closely as practical.
Re-check that no duplicate, fake, or misspelled generated text remains visible.
```
