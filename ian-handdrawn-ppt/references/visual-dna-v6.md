# Visual DNA V6

Use this visual system for Chinese handdrawn technical PPT image pages.

## Positioning

Create refined handdrawn technical explanation images: small exact Chinese text, fine ink lines, light pastel marks, sparse characters, clear structure, and a premium Chinese article/teaching-note feeling.

Do not create generic business templates, cute slide decks, big-title quote cards, dense whiteboards, or poster-like full-page illustrations.

## Canvas

- Final output is a complete raster image.
- Use role-specific canvases:
  - Blog/article cover image: 21:9, preferably 2520x1080.
  - Body illustration: 16:9, preferably 1920x1080.
  - Standard deck page: 16:9 unless the user specifies otherwise.
- Use very light warm white paper, near `#FBFAF5`, with only extremely subtle grain. Avoid yellow, beige, old paper, or tea-stained paper.
- Default to no full-page border. Do not draw a rectangular frame around the page unless the user explicitly asks for a card/bordered look.
- Keep only tiny notebook marks at the corners: faint grey grid, dots, ruler ticks, or construction lines. These marks should feel incidental and very quiet.
- Keep the central diagram small and refined:
  - Body illustration diagram: about 50-60% of page width and 35-45% of page height.
  - 21:9 cover metaphor: about 50-55% of page width.
- Use large negative space. The page should feel like a premium article illustration, not a filled PPT canvas.

## Master Consistency

Lock these constants across a multi-page deck before generating:

- Same paper tone and grain.
- Same no-border shell by default; if a border is explicitly requested, use the same very faint border style across all pages.
- Same small page number convention, usually `01 / 10` in the upper-left.
- Same title treatment: centered, hard-pen Chinese, medium size, with one short pale blue underline.
- Same subtitle treatment: one short line below the title, smaller than title.
- Same title optical size across body pages. Do not enlarge short titles just because they contain fewer characters.
- Same diagram line weight and hatching style.
- Same pastel label fills: light blue, sage green, pale peach, soft lavender.
- Same character policy: usually none; at most one tiny reader/engineer far in a corner.
- Same margin rhythm: wide margins, calm center, no full-bleed crowding.

If multiple pages feel like different illustrators made them, revise prompts before regenerating.

## Deck Shell And Variation

Treat a deck as one fixed shell plus variable semantic diagrams:

- Fixed shell: paper tone, grain, no-border default, upper-left page number, centered title, pale blue title underline, subtitle position, corner construction marks, wide margins, and overall text scale.
- Variable middle: the object diagram, flow direction, grouping, arrows, labels, and metaphor chosen for the slide's content.
- Vary layouts by semantic archetype, not by changing the deck identity. A horizontal process, contrast page, loop, and layered map can feel different while still sharing the same shell.
- Do not create variety by moving the title, adding/removing borders, switching font mood, adding more people, changing title scale, or changing the palette.

## Typography

The final image contains the visible Chinese text. Keep the text short, exact, and manually checkable.

Style:

- Heading: clear handdrawn hard-pen Chinese title feel
- Body: small readable hard-pen Chinese
- Avoid calligraphic brush style, dramatic flyaway strokes, childish doodle fonts, and heavy advertising type.

Scale guidance:

- Cover title: medium-large, but only on cover pages
- Body illustration title: medium and restrained
- Normal slide title: medium
- Section labels: small-medium, often inside small pastel marker labels
- Node text: small
- Annotations: smaller
- Bottom takeaway: only slightly stronger than body text

Avoid huge typography. The page should feel authored and precise, not like a cheap poster.
Short-title trap: when a title has only 4-6 Chinese characters, explicitly keep the same optical size as other body pages. Do not let the image model make it a cover headline.

## Text Budget

For reliable Chinese rendering, prefer:

- Title: 5-12 Chinese characters.
- Subtitle: 3-12 Chinese characters, or three short terms separated by `·`.
- Main labels: 2-5 labels per slide.
- Captions/annotations: 0-6 short items, each usually 2-6 Chinese characters.

If a slide needs more text than this, split it or move detail into speaker notes/adjacent pages.

## Color

- Background: very light warm white paper, near `#FBFAF5`
- Line: near black, fine handdrawn stroke
- Pastels: very light blue, sage green, peach, lavender
- Accent: small red-orange star, dot, or underline only when useful

Avoid:

- Large saturated blocks
- Shadows
- Gradients
- Neon colors
- Product-card styling

## Line And Shape

- Use fine handdrawn lines.
- Lines should be stable but slightly irregular.
- Use careful line-art objects: nets, sieves, drawers, cards, cabinets, funnels, clocks, dials, trays, shelves, documents, magnifying glasses.
- Use small rounded boxes, tags, speech bubbles, dashed notes, arrows, tables, and diagrams only when they explain the content.
- Most containers should be paper-filled with thin outline; use pastel fills sparingly.
- Prefer detailed object drawing and hatching over flat vector icons.
- Arrows should be slim and quiet.
- Props such as cards, books, screens, trays, and documents should be blank or contain only simple line marks unless the text is listed in `Required text only`. Avoid fake English, fake URLs, and filler writing.

## Characters

Characters are reader proxies or metaphor actors.

Rules:

- Prefer no character. If used, place one tiny character in a corner or edge, not beside every node.
- Max one tiny emotional character per page.
- Do not place a character beside every node.
- Character area should stay visually small.

## Slide Density

Prefer:

- Two to four main structure groups
- Four to twelve micro modules
- Zero to three annotations
- One main idea per slide

Avoid:

- Three to five huge colored cards
- Oversized bottom quotes
- Heavy bottom conclusion boxes
- Overcrowded bullet text
- Decorative people or icons that do not explain anything

## Text In Images

For final image-page decks:

- Chinese text is part of the final generated page.
- Keep required text short: title, subtitle, section labels, and a few micro labels.
- Always provide a `Required text only` list in the image prompt.
- Avoid long paragraphs, dense bullets, URLs, code blocks, and any non-essential text.
- If text accuracy is poor, regenerate with fewer words or split the page.
- If exact Chinese text is still wrong after simplification, keep the accepted visual direction and add the required text with deterministic post-processing. This is a text-fidelity repair, not the primary visual-generation method.

## Reference-Style Anchor

For blog/article cover and body illustrations, use `assets/reference-handdrawn-article-illustration-style.png` as the active style anchor:

- Near-white warm paper, not yellow.
- No full-page border.
- Faint corner grid/dot construction marks only.
- Small, refined central object diagrams with large negative space.
- Medium restrained body-page titles with short pale blue underlines.
- Fine ink-and-pencil object drawings with delicate hatching.
- No extra text beyond the required visible Chinese text.

Legacy bordered PPT references are archived outside active assets. Do not load or imitate them unless the user explicitly asks for the older bordered page style.

## Final Look

The page should feel like a technical author carefully drew a compact concept illustration on near-white paper, then polished it enough for paid teaching, article publishing, or commercial delivery.
