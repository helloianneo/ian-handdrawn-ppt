# Output And Quality Gates

Use this before final delivery.

## Output Modes

### Blueprint

Use when the user wants planning first or the source is not ready for production.

Include:

- Deck type
- Assumptions
- Slide count
- Slide-by-slide blueprint
- Missing inputs or risks

### Final Image Deck

Use by default when the user asks for PPT/PPTX/slides/courseware/配图/效果图 as finished visual page images.

PPT/PPTX wording alone does not mean editable output. Treat it as PPT-style final PNG page images. Editable PPTX, image-based PPTX, PDF export, and object-level presentation modification are out of scope for this skill.

Deliver:

- Role-specific PNG pages:
  - Blog/article cover: 21:9, preferably 2520x1080
  - Body illustrations and standard pages: 16:9, preferably 1920x1080
- Contact sheet for quick review when there are multiple pages
- Short blueprint summary
- Assumptions and verification

### Polished Delivery

Use when the user asks for polished delivery.

Deliver when feasible:

- Final PNG pages
- Contact sheet
- Speaker notes
- Visual style notes

## Content Quality Gate

Check:

- Each slide has one main point.
- Slide order creates a coherent story.
- Claims are supported by source material or clearly marked as assumptions.
- Terminology is consistent.
- Examples are not fabricated as facts.
- The audience level is appropriate.

## Layout Quality Gate

Check:

- Archetype matches slide semantics.
- Layouts vary by content semantics, but share one master visual language.
- Non-cover titles are not oversized.
- Short body-page titles are not enlarged into cover headlines.
- Central body diagrams stay compact, usually 50-60% page width and 35-45% page height.
- Slides are not just bullet lists.
- Diagrams explain, not decorate.

## Visual Quality Gate

Check:

- Small readable Chinese text
- Fine handdrawn lines
- Light pastel marks
- Few characters
- Near-white warm paper, not yellow or beige.
- No full-page border unless explicitly requested.
- Faint corner construction marks only; no heavy frame.
- Page number, centered title, and understated underline are consistent when the deck uses the reference style.
- Pages feel like one illustrator and one deck, not unrelated images.
- No large card-heavy look
- No poster-like full-page illustration look
- No heavy bottom quote/conclusion boxes
- No shadows, gradients, neon, or corporate template feel

## Dimension Gate

Check:

- Page images match their role:
  - Cover image: 21:9 or very close.
  - Body illustration: 16:9 or very close.
- Actual pixel dimensions are reported honestly.
- If strict delivery size is requested, normalize accepted body images to 1920x1080 and cover images to 2520x1080 after generation with high-quality resampling, then verify the normalized images still look sharp.
- Do not claim 1920x1080 or 2520x1080 if the generated source files are a different native size.

## Image Text Gate

Check:

- Required Chinese text appears and is readable.
- Text is short enough for the image model to render cleanly.
- No fake filler text, random English, URLs, watermarks, or extra labels.
- Props such as books, screens, documents, and cards are blank or only contain line marks unless their text is explicitly listed.
- If exact text fails, reduce text and regenerate.
- If exact text remains wrong after simplification, use deterministic text overlay on the accepted generated base image, then re-check readability, alignment, and style consistency before delivery.

## Contact Sheet Gate

For multiple images, make a contact sheet and inspect it before delivery:

- Backgrounds match and are not drifting yellow.
- Page shells match: no-border default, same title position, same underline style.
- Body-page titles look optically equal even when character counts differ.
- Diagrams have similar visual weight and do not suddenly become huge.
- The cover is clearly 21:9 and body illustrations are clearly 16:9.

## Final Report

Mention:

- Output folder and contact sheet path
- Page count
- Deck type
- Major assumptions
- Verification performed
- Remaining risks
