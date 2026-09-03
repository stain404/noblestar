---
name: Noble Star Shipping
description: A GCC freight and customs surface built as an attested document — ruled fields, named authorities, and one overprint colour for what is not yet verified.
colors:
  paper-50: "#f8f9f5"
  paper-100: "#eff1e9"
  paper-200: "#e1e5d8"
  paper-300: "#c8cfba"
  paper-400: "#a6af95"
  paper-500: "#7f8970"
  ink-100: "#ebe8f0"
  ink-200: "#d8d3e0"
  ink-300: "#b9b2c8"
  ink-400: "#948aa9"
  ink-500: "#6d6088"
  ink-600: "#4d4166"
  ink-700: "#342b47"
  ink-800: "#221c2e"
  ink-900: "#17131f"
  stamp-50: "#f4f0fd"
  stamp-100: "#eae3fa"
  stamp-200: "#d6caf3"
  stamp-300: "#ae99e3"
  stamp-400: "#8467cf"
  stamp-500: "#6041b4"
  stamp-600: "#4c2f95"
  stamp-700: "#3d2578"
  stamp-800: "#2f1c5e"
  stamp-900: "#241547"
  oxide-100: "#f8e5e0"
  oxide-200: "#f0cec6"
  oxide-500: "#c43b22"
  oxide-600: "#a82f1c"
  oxide-700: "#8c2617"
  seal-100: "#e0ede7"
  seal-200: "#c6ded2"
  seal-500: "#3b7f62"
  seal-600: "#2a6049"
  seal-700: "#1d4635"
  seal-800: "#143528"
  mark-azure: "#1b75ba"
  mark-azure-light: "#28a6de"
  mark-amber: "#f79421"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.5rem + 5vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 1.4rem + 2.9vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.25rem + 1.6vw, 2.375rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.022em"
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Spline Sans Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.16em"
  datum:
    fontFamily: "Spline Sans Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "normal"
  data-cell:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "normal"
rounded:
  none: "0"
spacing:
  rule: "1px"
  field-padding: "1.5rem 1.375rem 1.375rem"
  section-y: "4rem"
  section-y-lg: "7rem"
  container-max: "82rem"
  container-pad: "1.25rem"
  container-pad-lg: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.stamp-600}"
    textColor: "{colors.paper-50}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.stamp-700}"
    textColor: "{colors.paper-50}"
  button-outline:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-800}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-outline-hover:
    textColor: "{colors.stamp-700}"
  button-oxide:
    backgroundColor: "{colors.oxide-600}"
    textColor: "{colors.paper-50}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  button-on-violet:
    backgroundColor: "transparent"
    textColor: "{colors.paper-50}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  field:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.none}"
    padding: "{spacing.field-padding}"
  field-caption:
    textColor: "{colors.ink-500}"
    typography: "{typography.label}"
  marker-cleared:
    backgroundColor: "{colors.seal-100}"
    textColor: "{colors.seal-700}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.375rem 0.5rem"
  marker-held:
    backgroundColor: "{colors.oxide-100}"
    textColor: "{colors.oxide-700}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.375rem 0.5rem"
  attestation:
    backgroundColor: "transparent"
    textColor: "{colors.stamp-600}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.4375rem 0.75rem"
---

# Design System: Noble Star Shipping

## Overview

**Creative North Star: "The Attested Document"**

In GCC trade nothing is true until an authority has stamped it. That is the
governing idea of this surface: it is not a website *about* freight, it is a
document that carries its own attestations. Every container is a ruled field
whose caption names what it holds, exactly like a box on a bill of lading.
Every claim that a named body stands behind carries its mark. One colour is
reserved, and reserved absolutely, for what is provisional or refused.

This exists because of a hard constraint in the product. There is no
photography, no client logo wall, no testimonials, no awards. Credibility has
to be carried by operational detail a bluffer could not produce — port names,
declaration systems, document checklists, failure modes — so the design's job
is to make that detail read as *evidence on a file* rather than as copy on a
page. Density is a feature here. A table of transit times or a six-step chain
of custody is not something to be broken up into friendlier chunks; it is the
proof, and it should look like proof.

The substrate is security paper, not cream: a cool, faintly green grey that
belongs to certificates and banknotes. The ink is stamp-pad black, which is
violet rather than neutral, and carries that violet cast at every step of the
ramp. Nothing in the system is decorative. A caption, a rule or a mark appears
only where it carries information — which is why the `Attestation` component
requires the naming authority as a prop and cannot be rendered without one.

**Key Characteristics:**

- Ruled fields with mono captions as the only container vocabulary
- Zero radius, zero elevation — depth from rule weight and ink darkness
- A violet-cast neutral ramp, never a true grey
- Colour drenches whole regions rather than accenting components
- Security-print textures (guilloche, line screen) on drenched bands only
- Actions are stamps: square, mono, uppercase, pressing down rather than lifting

## Colors

A cool document palette: security-paper grounds, violet-black ink, and three
signal colours that each mean one specific thing and are never used for mood.

### Primary
- **Attestation Violet** (`#4c2f95` / `stamp-600`): the mark, and every primary
  action. It drenches whole bands — the CTA band, the certificate panel in the
  homepage hero — rather than appearing as an accent on a white page. Deeper
  steps (`stamp-700`, `stamp-800`) carry those grounds; `stamp-300` is the
  caption colour on top of them.

### Secondary
- **Oxide Red** (`#a82f1c` / `oxide-600`): the official overprint. Provisional,
  refused, held, stopped. Deliberately deeper and cooler than the logo mark's
  amber so the two never read as the same signal. Used on the three causes that
  stop a food consignment, on held-section markers, and nowhere else.
- **Seal Green** (`#2a6049` / `seal-600`): cleared, verified, own-operation.
  The counterpart to oxide, and equally literal.

### Neutral
- **Security Paper** (`#f8f9f5` / `paper-50`): the page ground. Cool, faintly
  green, never cream. `paper-100`–`paper-300` carry tints and rules;
  `paper-300` is the standard hairline.
- **Stamp-Pad Ink** (`#17131f` / `ink-900`): headings and the darkest ground.
  Violet-cast at every step, so text never reads as neutral grey on this paper.
- **Muted Ink** (`#6d6088` / `ink-500`): secondary and caption text on light
  grounds. **`ink-400` is its counterpart on ink grounds only** — see the rule
  below.

### Brand
- **Mark Azure** (`#1b75ba`), **Mark Azure Light** (`#28a6de`), **Mark Amber**
  (`#f79421`): the supplied logo's own colours. Binding artwork — never
  re-tinted, and never borrowed for UI.

### Named Rules

**The Mirrored Muted Rule.** `ink-500` is the muted text colour on paper and
white; `ink-400` is the muted text colour on ink grounds. Each one fails WCAG
on the other's background — `ink-400` measures 3.24:1 on white, `ink-500`
measures 3.2:1 on `ink-900`. Never reach for the lighter step to soften text on
a light surface.

**The Named Authority Rule.** A stamp may only be rendered where a named body
actually stands behind the claim. `Attestation` enforces this by requiring
`authority` as a prop with no default. A stamp with nobody behind it is exactly
the decoration this design exists to refuse.

**The One Signal Rule.** Oxide means stopped. Seal means cleared. Neither is
ever used because a section needed warming up.

## Typography

**Display / Body Font:** Archivo (with `ui-sans-serif, system-ui, sans-serif`)
**Label / Mono Font:** Spline Sans Mono (with `ui-monospace, SFMono-Regular, monospace`)

**Character:** Archivo is a grotesque out of signage and printed-form
lettering, loaded with its width axis (`wdth`) live. That axis is the whole
typographic idea: headings are *wide* the way stencilled and stamped lettering
is wide, without reaching for a second family. Spline Sans Mono carries every
field caption, reference number and cell of tabular data — it is used for
measurement and data, never as a costume for "technical".

### Hierarchy
- **Display** (700, `clamp(2.75rem, 1.5rem + 5vw, 5.5rem)`, 0.94, -0.035em,
  `wdth` 118): reserved, and currently unused. It suits a short, declarative
  headline of four or five words; the homepage proposition is descriptive and
  longer than that, so it sits at Headline instead. Reach for Display only when
  the line is short enough to hold the page at 5.5rem.
- **Headline** (700, `clamp(2.125rem, 1.4rem + 2.9vw, 3.5rem)`, 1.02, -0.028em):
  every page's hero title, the homepage included.
- **Title** (700, `clamp(1.625rem, 1.25rem + 1.6vw, 2.375rem)`, 1.08, -0.022em):
  section headings.
- **Body** (400, 1rem, ~1.65): running prose, held to a comfortable measure.
  Long-form copy blocks sit at `max-w-xl`/`max-w-3xl` rather than full width.
- **Label** (400, 0.6875rem, 0.16em, uppercase, mono): field captions, eyebrows,
  markers, small button text, sequence numbers.
- **Datum** (400, 0.8125rem, 1.35, mono, sentence case): reference numbers, lane
  codes, declaration system names — any value that reads as document data
  rather than as a label. Also the large button's text size.
- **Data cell** (400, 0.9375rem, 1.35): the body text inside `DataTable` rows
  and other dense tabular content, one step below body copy so a full schedule
  fits without becoming a wall.

### The mono ramp

Mono runs on a deliberately fine scale, because a document's small print is
information rather than decoration. Four steps are in use, and each belongs to a
specific job — do not add a fifth without a reason:

| Size | Job |
|---|---|
| 0.6875rem | Field captions, eyebrows, markers, sequence numbers |
| 0.75rem | Medium button text |
| 0.8125rem | Datum — reference numbers, lane codes, large button text |
| 0.9375rem | Data cell body |

Three smaller sizes exist and are **component-private, not ramp steps**:
`0.5625rem` for the authority line inside `Attestation`, and `0.5rem` /
`0.4375rem` for the two sub-lines of the supplied logo lockup. They are
determined by the artwork and the stamp, and must not be reused as a general
type size.

### Named Rules

**The Width-Not-Weight Rule.** Headings get their authority from the width axis
(`font-stretch: 112%`, or 118% via `.u-wide`), not from a heavier weight or a
second typeface.

**The Caption Names the Box Rule.** Every field caption states what the box
actually holds — "Issued by", "Description of goods", "Parties to the file". A
caption that only decorates the top of a container is a defect.

## Layout

A single centred measure: `container-page` at `max-width: 82rem`, with
`1.25rem` inline padding rising to `2.5rem` at 1024px. Sections carry their own
vertical rhythm at `4rem` / `5rem` / `7rem` across the `sm` and `lg`
breakpoints.

The signature layout primitive is `.field-grid` — a grid of fields sharing
single rules the way a printed form's boxes do. The container draws the outer
top and left rules; each cell draws only its own right and bottom. A list
wrapper set to `display: contents` passes its child through as the real grid
item, so the rule has to reach the grandchild or the dividing lines silently
vanish.

Bands alternate between the paper ground and white to separate sections, with
two drenched tones (`violet`, `ink`) reserved for moments that should carry
colour across the full width. Where two same-toned sections meet, a
`border-t border-paper-300` hairline does the separating — the way a rule
separates blocks on a printed document.

## Elevation & Depth

**There is no elevation in this system.** No shadows, no rings, no glass, no
elevation scale. Depth is carried entirely by rule weight and ink darkness: a
darker rule or a darker ground reads as nearer. This is not a stylistic
preference to be relaxed on a case-by-case basis — a shadow anywhere on this
surface breaks the premise that you are looking at a document.

Texture stands in where depth would otherwise be needed. `.guilloche` is a fine
engine-turned screen — the moiré on a certificate of origin. `.linescreen` is a
ruled tint block — the band behind a document's header. Both are used only on
flat drenched bands, never as wallpaper, and **never over a photograph**: an
image already carries its own detail, and a screen laid over one reads as a
rendering artefact rather than as security printing.

### Named Rules

**The Flat Document Rule.** If a box needs to feel separate, rule it or change
its ground. Never lift it.

## Shapes

**Nothing rounds.** `border-radius: 0` everywhere, including the focus ring,
which is a square stamp outline (`2px solid stamp-600`, `2px` offset). Markers
are squares, not pills. The only curve in the entire system belongs to the
supplied logo artwork.

Borders are `1px` hairlines in `paper-300` on light grounds and `ink-800` on
ink grounds. The stamp is the one exception at `2px`, plus an inset
`box-shadow` at 35% opacity to give the uneven bite of a rubber die on paper —
the single place a shadow property appears, and it is being used as ink, not as
elevation.

## Components

- **Button.** Actions are stamps: square, ruled, mono-labelled, uppercase,
  `0.14em` tracking. They press *down* on hover and active
  (`active:translate-y-px`) rather than lifting. Five variants — `primary`
  (violet ground), `outline`, `quiet`, `onViolet` (paper is the ink on violet
  bands), and `oxide` (destructive/held). Heights 2.25 / 2.75 / 3.5rem.
- **Field.** The only container primitive: a ruled box on white with an optional
  mono caption naming what it holds. `FieldSurface` is the same box acting as a
  link surface — put `group` on the anchor and hovering rules the box in violet.
- **Marker.** A square status chip in three tones: `cleared` (seal), `held`
  (oxide), `plain` (neutral classification, no status meaning).
- **Attestation.** The mark. Rotated, double-ruled, animated in with
  `stamp-land` — pressed down, ink spreading, no bounce back out. Requires a
  named `authority`.
- **DataTable / DataHead / DataCell.** Ruled schedules and checklists with rules
  only between rows, the way a printed schedule sets them. Carries most of the
  site's credibility.
- **Photograph.** A photograph set as an exhibit attached to the file: ruled
  frame, a field caption naming what it shows, aspect ratio reserved so nothing
  shifts as the image decodes. The caption is not optional — an unlabelled
  photograph on a freight site is decoration, and the reader has no way to know
  whether it shows this company's own operation or a stock library's.

### Named Rules

**The No-Card Rule.** There are no cards here and there is no elevation. If a
box has no honest caption, it should not be a box.

**The Optional Photograph Rule.** Every photographic slot resolves at build time
and falls back to the pre-photography design when the file is absent. The
surface must never have a photo-shaped hole in it.

## Do's and Don'ts

**Do:**

- Do caption every box with what it actually holds.
- Do reach for a rule or a change of ground when something needs separating.
- Do let colour drench a whole region rather than accenting one component.
- Do use mono for captions, data, references and measurements.
- Do keep oxide for stopped and seal for cleared, and nothing else.
- Do set headings wide on the width axis rather than heavier.
- Do let dense tables and long checklists stay dense — the detail is the proof.

**Don't:**

- Don't add shadows, rounded corners, cards or elevation of any kind.
- Don't render a stamp, seal or badge without a named authority behind it.
- Don't use container-ship hero photography, arcing route maps on world globes,
  animated counters, or glossy blue gradients — the category's defaults, which
  this design was built against.
- Don't soften muted text by reaching for a lighter ink step on a light ground.
- Don't use the logo's azure or amber for UI; they belong to the mark alone.
- Don't apply the security textures as wallpaper — drenched bands only.
- Don't introduce a second typeface to get a different heading voice.
