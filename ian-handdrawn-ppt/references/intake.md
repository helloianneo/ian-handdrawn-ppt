# Intake And Gap Diagnosis

Use this reference when source material or output requirements are incomplete.

## Accepted Inputs

- Article, essay, newsletter, blog post
- Markdown notes
- DOCX document
- PDF document
- Existing PPTX deck
- Course outline
- Lesson transcript or video script
- Rough ideas or bullet points
- A theme plus desired audience

## Extract First

From the source, identify:

- Topic: what the deck is about
- Audience: who needs to understand it
- Scenario: teaching, sales, report, workshop, social content, internal training
- Goal: what the audience should believe, understand, or do after viewing
- Core claims: the few statements the deck must preserve
- Concepts: terms that need explanation
- Flow: steps, phases, mechanisms, loops, or sequences
- Contrasts: old/new, wrong/right, before/after, option A/B
- Evidence: examples, numbers, cases, quotes, observations
- Risks: claims that need user confirmation

## Defaults

Use these defaults when safe:

- Audience: Chinese learners with moderate technical familiarity
- Scenario: teaching or public explanation
- Length: 8-12 slides for one article; 15-30 for a course module
- Depth: practical conceptual explanation, not academic proof
- Style: V6 handdrawn Chinese technical PPT
- Output: role-specific final PNG page images when the user asks for slides/effect images; blueprint when the user asks for planning
- Blog/article visual split: 21:9 cover image plus 16:9 body illustrations when the user asks for both cover and body images

Interpret "PPT" as PPT-style final page images by default. Editable PPTX, image-based PPTX, PDF export, and object-level presentation modification are out of scope for this skill.

## Ask Only For Critical Missing Inputs

Ask at most 1-3 concise questions when the answer changes the deck materially.

Ask when:

- The topic is ambiguous.
- Audience depth would change the language level.
- Use scenario is unknown and affects structure.
- The user asks for commercial delivery but gives only a rough topic.
- Source material contains claims that look important but unsupported.
- The user gives a strict page count or delivery format but it is missing.

Do not ask when:

- You can choose a reasonable default and continue.
- The missing detail only affects polish, not structure.
- The user clearly wants a first draft.

## Gap Diagnosis Output

When you need to ask, frame the default and the missing choice:

```text
我可以先按“中文技术课件，面向有基础的新手，10 页左右”处理。
但有一个决定性信息会影响结构：这套 PPT 是用于教学、销售说明，还是公开分享？
```

## Source Sufficiency Levels

- **Enough**: has thesis, several points, examples or process, and a conclusion.
- **Thin but usable**: has thesis and points but few examples. Proceed and mark assumptions.
- **Insufficient**: only a theme or slogan. Ask for goal, audience, and 3-5 raw points.
