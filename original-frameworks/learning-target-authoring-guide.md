---
skill_id: "original-frameworks/learning-target-authoring-guide"
skill_name: "Purpose-Driven Learning Target Authoring Guide"
domain: "original-frameworks"
version: "1.0"
evidence_strength: "emerging"
evidence_sources:
  - "Manning — Learning Target Authoring Guide v3.1 (January 2026, original methodology)"
  - "Black & Wiliam (1998) — Assessment and classroom learning (clear learning intentions as prerequisite for formative assessment)"
  - "Wiggins & McTighe (2005) — Understanding by Design (backwards design, extended with Manning's upstream 'why' layer)"
  - "Bloom et al. (1956) — Taxonomy of educational objectives (observable verb hierarchy)"
  - "Vygotsky (1978) — Mind in society (ZPD — band statements specify upper edge of capability with support)"
input_schema:
  required:
    - field: "competency_name"
      type: "string"
      description: "The broad capability being decomposed into learning targets"
    - field: "competency_definition"
      type: "string"
      description: "One sentence beginning 'The ability to...'"
    - field: "band_range"
      type: "string"
      description: "Which developmental bands this LT set covers — e.g. Bands A-D"
    - field: "programme_purpose"
      type: "string"
      description: "Why this competency matters for this school's mission — the upstream 'why'"
  optional:
    - field: "existing_draft"
      type: "string"
      description: "Any existing LT wording to review and revise"
    - field: "subject_area"
      type: "string"
      description: "The curriculum domain"
    - field: "assessment_context"
      type: "string"
      description: "How LTs will be used — reporting, project assessment, or both"
output_schema:
  type: "object"
  fields:
    - field: "competency_review"
      type: "object"
      description: "Is this competency right? Does it serve the mission? Is it genuinely a capability or a topic list in disguise?"
    - field: "lt_decomposition"
      type: "object"
      description: "The 2-3 LTs that make the competency actionable, with rationale for each"
    - field: "lt_definitions"
      type: "object"
      description: "One-sentence 'I can...' definitions for each LT"
    - field: "band_statements"
      type: "object"
      description: "Full A-D progression for each LT using the appropriate progression levers"
    - field: "quality_check"
      type: "object"
      description: "Running through the checklist — single-construct rule, no inline examples, observable verbs, vertical coherence, horizontal coherence"
    - field: "known_limitations"
      type: "object"
      description: "Where the LT set is strongest; where teacher judgment will still be needed"
chains_well_with:
  - "developmental-band-system-designer"
  - "coherent-rubric-logic-builder"
  - "self-determined-project-design-protocol"
  - "curriculum-knowledge-architecture-designer"
  - "kud-knowledge-type-mapper"
teacher_time: "5 minutes"
tags: ["learning-targets", "Manning", "competency", "authoring", "backwards-design", "observable-verbs", "band-statements", "progression"]
---

# Purpose-Driven Learning Target Authoring Guide

## What This Skill Does

This skill encodes an original practitioner framework developed by Gareth Manning, educator, curriculum designer, and learning systems designer. Unlike skills in other domains, it is not drawn from peer-reviewed research traditions. It is grounded in serious engagement with learning science, original curriculum design work, and active classroom testing. It is included because the methodology is coherent, transferable, and genuinely useful — and because intellectual honesty requires distinguishing practitioner frameworks from research-validated approaches.

This skill guides an educator or curriculum designer through writing a complete, coherent set of learning targets (LTs) for a competency — from the upstream question of whether the competency is right, through decomposition into 2-3 LTs, to writing band-level statements that are developmental, precise, and assessable. Learning targets are the bridge between a broad competency ("Critical Thinking") and what a teacher can actually observe and assess in a student's work. Without well-written LTs, competency-based education degenerates into either vague impressions or checklist-style task completion. The output is a complete LT set ready for use in planning and reporting, with quality checks built into the process. The methodology draws on Black & Wiliam (1998) — clear learning intentions are a prerequisite for effective formative assessment — and extends Wiggins & McTighe's (2005) backwards design with Manning's upstream "why" layer: before asking "What should students learn?" the process asks "Why does this competency matter for our mission?"

## Evidence Foundation

Manning developed the Learning Target Authoring Guide through iterative curriculum design at REAL School Budapest, documented in v3.1 (January 2026). The methodology addresses a specific problem: most competency-based curricula have poorly written learning targets. Common failure modes include: targets that use unobservable verbs ("Understands the water cycle" — how do you observe understanding?), targets that are topic lists disguised as competencies ("Knows the causes of WWI" — this is content, not capability), targets that lack developmental progression (the same statement at every band level with "simple" and "complex" bolted on), and compound targets that assess multiple things simultaneously ("Analyses and evaluates sources to construct an argument" — which part is the student struggling with?). Black & Wiliam (1998) established that effective formative assessment requires clear, shared learning intentions. If the teacher doesn't know precisely what they're looking for, they cannot provide useful feedback, and students cannot self-assess. LTs are the unit of clarity: specific enough to assess, broad enough to apply across multiple projects and contexts. Wiggins & McTighe (2005) provide the backwards design framework, which Manning extends by adding an upstream "why" layer. Standard UBD starts with given curriculum goals. Purpose-driven backwards design starts with the school's mission and asks: Why does this competency exist in our curriculum? What would we lose if we removed it? This upstream questioning prevents the accumulation of competencies that nobody can justify but nobody dares remove. Bloom's taxonomy (1956, revised 2001) provides the verb hierarchy that constrains LT writing: observable, assessable verbs (identify, describe, compare, explain, justify, analyse, evaluate, create) replace unobservable verbs (understand, know, appreciate, be aware of). Vygotsky's (1978) ZPD informs band-level specification: each band statement describes what students can do WITH APPROPRIATE SUPPORT at that developmental stage — the upper edge of the ZPD.

## Input Schema

The educator must provide:
- **Competency name:** The broad capability. *e.g. "Critical Thinking" / "Scientific Investigation" / "Collaborative Problem-Solving" / "Written Communication"*
- **Competency definition:** One sentence. *e.g. "The ability to analyse information, evaluate evidence, and construct well-reasoned arguments" / "The ability to design, conduct, and interpret investigations using scientific methods" / "The ability to work with others to identify, define, and solve problems that no individual could solve alone"*
- **Band range:** Which bands. *e.g. "Bands A-D (ages 5-14)" / "Bands B-D (ages 8-14)" / "Bands A-C (ages 5-12)"*
- **Programme purpose:** Why this competency matters. *e.g. "Our mission requires students who can contribute to a world that needs them — contribution requires the ability to think critically about complex problems, not just accept what they're told" / "Scientific investigation is central to our inquiry-based programme — students must be able to design their own investigations, not just follow recipes"*

Optional (injected by context engine if available):
- **Existing draft:** Any current LT wording to revise
- **Subject area:** The curriculum domain
- **Assessment context:** How LTs will be used

## Prompt

```
You are authoring learning targets using Gareth Manning's methodology (Learning Target Authoring Guide v3.1). You must follow these rules PRECISELY — they are the quality standard for every LT produced.

LT WRITING RULES (non-negotiable):
1. **Every band statement begins "I can..."** — present tense, active voice, first person.
2. **No parentheses, no inline examples, no "such as" or "for example" anywhere.** Examples are provided separately in teaching guidance, never embedded in the LT statement itself. A statement with examples baked in becomes an implicit checklist.
3. **Single-construct rule.** Each statement describes ONE coherent capability. Test: "Could I assess these separately?" If yes, they must be separate LTs or separate statements. "Analyses sources and constructs arguments" violates this — analysis and argument construction are separately assessable.
4. **Observable action verbs ONLY.** Use: identify, describe, compare, explain, justify, analyse, evaluate, create, design, plan, conduct, present, reflect. NEVER use: understand, know, appreciate, be aware of, effectively, sophisticated, well (without observable criteria).
5. **Progression uses LEVERS, not topic escalation.** The six progression levers: independence (how much support needed), complexity (how many variables or perspectives), scope (how broad the context), precision (how accurate or detailed), reasoning (how deep the justification), transfer (how far from the original context). Progression across bands is achieved by advancing one or more of these levers — NOT by changing the topic or adding content.
6. **2 LTs per competency is the default.** 3 only if the strands are genuinely distinct and cannot be collapsed without losing meaning.
7. **The LT definition describes what ALL band levels do.** It is the generalised "I can..." statement that applies across every band. It is NOT a Band A statement.

DECOMPOSITION LOGIC:
A competency is too broad to assess directly. It must be decomposed into 2-3 LTs that together COVER the competency and are individually ASSESSABLE. The decomposition should feel natural — like cutting a diamond along its grain, not chopping it into arbitrary pieces.

Test the decomposition:
- **Coverage test:** Do the LTs together cover the full meaning of the competency? Is anything missing?
- **Distinctness test:** Are the LTs genuinely different capabilities, or are they different ways of saying the same thing?
- **Assessability test:** Can each LT be assessed through observable student work?

QUALITY CHECK (run on every LT set):
- [ ] Single-construct rule: each statement assesses one thing
- [ ] No parentheses, no "such as," no inline examples
- [ ] Observable verbs only (no "understand," "know," "appreciate")
- [ ] Vertical coherence: Band D is genuinely more advanced than Band A on the SAME capability
- [ ] Horizontal coherence: all Band B statements describe roughly the same level of developmental demand
- [ ] The LT definition describes what ALL band levels do
- [ ] 2 LTs per competency (3 only if justified)

Your task is to author a complete LT set for:

**Competency name:** {{competency_name}}
**Competency definition:** {{competency_definition}}
**Band range:** {{band_range}}
**Programme purpose:** {{programme_purpose}}

The following optional context may or may not be provided. Use whatever is available; ignore any fields marked "not provided."

**Existing draft:** {{existing_draft}} — if provided, review and revise against the quality rules. If not provided, author from scratch.
**Subject area:** {{subject_area}} — if not provided, design the LTs to work across subjects.
**Assessment context:** {{assessment_context}} — if not provided, design for use in both project assessment and reporting.

Return your output in this exact format:

## Learning Target Set: [Competency Name]

**Competency:** [Name]
**Definition:** [One sentence, "The ability to..."]
**Programme purpose:** [Why this matters for the mission]
**Number of LTs:** [2 or 3, with rationale]

### Competency Review

[Is this competency right? Does it serve the mission? Is it a genuine capability or a topic list in disguise? If the competency needs reframing, say so before proceeding.]

### LT Decomposition

[The 2-3 LTs, with rationale for each and evidence that the decomposition passes the coverage, distinctness, and assessability tests]

**LT1: [Name]**
- **Definition:** "I can [generalised statement that applies across all bands]"
- **Rationale:** [Why this strand exists as a separate LT]

**LT2: [Name]**
- **Definition:** "I can [generalised statement]"
- **Rationale:** [Why this strand exists]

### Band Statements

**LT1: [Name]**

| Band | Statement | Progression Lever(s) |
|---|---|---|
| A | I can [Band A statement] | [Which lever(s)] |
| B | I can [Band B statement] | [Which lever(s)] |
| C | I can [Band C statement] | [Which lever(s)] |
| D | I can [Band D statement] | [Which lever(s)] |

**LT2: [Name]**

| Band | Statement | Progression Lever(s) |
|---|---|---|
| A | I can [Band A statement] | [Which lever(s)] |
| B | I can [Band B statement] | [Which lever(s)] |
| C | I can [Band C statement] | [Which lever(s)] |
| D | I can [Band D statement] | [Which lever(s)] |

### Quality Check

[Run every statement through the checklist. Flag any issues.]

- [ ] Single-construct rule
- [ ] No parentheses or inline examples
- [ ] Observable verbs only
- [ ] Vertical coherence
- [ ] Horizontal coherence
- [ ] LT definition describes all band levels
- [ ] 2 LTs per competency (or 3 with justification)

### Known Limitations

[Where the LT set is strongest and where teacher judgment will still be needed]

**Self-check before returning output:** Verify that (a) every statement begins "I can," (b) no statement contains parentheses or "such as," (c) all verbs are observable, (d) progression uses levers not topic escalation, (e) the single-construct rule is respected, and (f) the quality checklist passes.
```

## Example Output

**Scenario:** *Competency name: "Critical Thinking" / Competency definition: "The ability to analyse information, evaluate evidence, and construct well-reasoned arguments" / Band range: "Bands A-D (ages 5-14)" / Programme purpose: "Our mission requires students who can contribute to a world that needs them. Contribution to complex real-world problems requires the ability to think critically — to distinguish strong evidence from weak, to identify assumptions, and to construct arguments that can withstand challenge. Without critical thinking, students become consumers of other people's conclusions rather than producers of their own"*

---

## Learning Target Set: Critical Thinking

**Competency:** Critical Thinking
**Definition:** The ability to analyse information, evaluate evidence, and construct well-reasoned arguments
**Programme purpose:** Contribution to a world that needs critical thinkers — people who produce their own conclusions, not consume others'
**Number of LTs:** 2 — Analysis and Argument are genuinely distinct capabilities (you can analyse without arguing, and argue without analysing well)

### Competency Review

This competency is well-framed. It describes a genuine capability (not a topic), it serves the mission directly (critical contribution requires critical thinking), and it is broad enough to apply across all subjects and projects. The definition contains three elements: analyse, evaluate, construct arguments. Analysis and evaluation are closely related (evaluating IS a form of analysis), so these collapse into one LT. Argument construction is distinct — it's a productive capability (making something) rather than an analytical capability (taking something apart). Two LTs.

### LT Decomposition

**LT1: Analysis of Evidence**
- **Definition:** "I can examine information and evidence to identify what is relevant, reliable, and significant"
- **Rationale:** This LT covers the ANALYTICAL dimension of critical thinking — the ability to take information apart, assess its quality, and determine what matters. It is the input side of critical thinking: processing what is given.

**LT2: Reasoned Argument**
- **Definition:** "I can construct a clear argument supported by evidence and reasoning"
- **Rationale:** This LT covers the PRODUCTIVE dimension of critical thinking — the ability to build a case, support it with evidence, and present it in a way that can be examined and challenged. It is the output side of critical thinking: producing a position.

**Decomposition tests:**
- **Coverage:** Together, LT1 (analysis) and LT2 (argument) cover the full meaning of "Critical Thinking." A student who can analyse evidence AND construct reasoned arguments is a critical thinker.
- **Distinctness:** A student can be strong at analysis but weak at argument (they see the flaws but can't articulate their own position), or strong at argument but weak at analysis (they argue persuasively but from poor evidence). These are genuinely different capabilities.
- **Assessability:** Both LTs produce observable evidence in student work — analysis can be seen in how students evaluate sources, identify bias, and select evidence; argument can be seen in how students structure claims, support them, and address counter-positions.

### Band Statements

**LT1: Analysis of Evidence**

| Band | Statement | Progression Lever(s) |
|---|---|---|
| A | I can identify relevant information from a given source | Scope: single source; Independence: given source |
| B | I can compare information from more than one source and identify differences | Complexity: multiple sources; Reasoning: comparison |
| C | I can evaluate the reliability of sources and explain why some evidence is stronger than others | Reasoning: evaluative judgment; Precision: explaining why |
| D | I can analyse competing evidence, identify assumptions and bias, and justify which evidence is most credible for a given purpose | Transfer: applying analysis to novel contexts; Complexity: competing evidence, multiple criteria |

**LT2: Reasoned Argument**

| Band | Statement | Progression Lever(s) |
|---|---|---|
| A | I can state my opinion and give a reason for it | Independence: single claim, single reason |
| B | I can present a claim supported by more than one piece of evidence | Complexity: multiple evidence points |
| C | I can construct an argument with a clear claim, supporting evidence, and acknowledgement of a different viewpoint | Scope: includes counter-position; Reasoning: structural awareness |
| D | I can build a sustained argument that integrates evidence, addresses counterarguments, and evaluates the strength of my own position | Transfer: self-evaluation of argument; Precision: sustained and integrated |

### Quality Check

- [x] **Single-construct rule:** Each statement assesses one coherent capability. LT1 is always about examining evidence; LT2 is always about building argument. No statement combines both.
- [x] **No parentheses or inline examples:** None present. No "such as" or "for example."
- [x] **Observable verbs only:** identify, compare, evaluate, explain, analyse, justify, state, present, construct, build, integrate, address. No "understand," "know," or "appreciate."
- [x] **Vertical coherence:** Within each LT, Band D is genuinely more advanced than Band A — the progression is clear and continuous through the levers.
- [x] **Horizontal coherence:** Band B across both LTs describes a similar developmental demand — comparing sources and presenting multi-evidence claims are both Band B level tasks.
- [x] **LT definition describes all band levels:** "I can examine information and evidence to identify what is relevant, reliable, and significant" applies to all bands — Band A does this simply (single source), Band D does this sophisticatedly (competing evidence).
- [x] **2 LTs:** Justified — analysis and argument are genuinely distinct.

### Known Limitations

1. **Critical thinking is domain-dependent as well as domain-general.** A student who thinks critically about science may not transfer that skill to history. These LTs are written as domain-general capabilities, but teachers should expect that critical thinking looks different in different subjects and that transfer across subjects requires explicit teaching.

2. **Band A is deliberately modest.** "I can state my opinion and give a reason" may seem too simple for critical thinking, but it accurately represents the developmental starting point for a 5-7-year-old. Pushing Band A toward "analyse multiple perspectives" would set an impossible expectation that produces either false compliance or teacher frustration.

3. **The LTs do not capture the DISPOSITION to think critically.** A student can have the CAPABILITY to analyse evidence (they can do it when asked) but not the DISPOSITION (they don't do it spontaneously). Critical thinking as a disposition — the habit of questioning, seeking evidence, and challenging assumptions — is not captured by "I can..." statements. Teachers must cultivate the disposition alongside the capability.

---

## Known Limitations

1. **This is a practitioner methodology, not a peer-reviewed framework.** The LT authoring rules have been developed and refined through classroom implementation, not through controlled experimental research. They are grounded in established assessment research (Black & Wiliam, Bloom, Wiggins & McTighe) but the specific rules (single-construct, no inline examples, progression levers) are Manning's original synthesis.

2. **LTs require professional judgment to apply.** A well-written LT set provides the structure, but assessing whether a specific piece of student work meets a specific band statement still requires teacher professional judgment. The LTs reduce subjectivity — they do not eliminate it.

3. **The 2-LT default may not suit all competencies.** Some competencies decompose naturally into 2 strands; others resist clean decomposition. If a competency feels forced into 2 LTs, it may need 3 — or the competency itself may need reframing. The methodology provides the test (coverage, distinctness, assessability) but the designer must exercise judgment about when to follow the default and when to deviate.
