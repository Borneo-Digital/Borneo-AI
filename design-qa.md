# BorneoAI design QA

## Evidence

- Source visual truth: `design/reference/borneoai-multipage-reference.png`
- Source visual dimensions: 1536 × 1024 px
- Source page crops:
  - `design/reference/home-reference.png`
  - `design/reference/learn-reference.png`
  - `design/reference/business-reference.png`
  - `design/reference/community-reference.png`
- Browser-rendered implementation evidence:
  - `design/qa/home-desktop-final.png`
  - `design/qa/learn-desktop-pass3-normalized.png`
  - `design/qa/business-desktop-normalized.png`
  - `design/qa/community-desktop-normalized.png`
  - `design/qa/home-mobile-390x843-css-v2.png`
- Side-by-side comparison evidence:
  - `design/qa/home-comparison-final.png`
  - `design/qa/learn-comparison-pass3.png`
  - `design/qa/business-comparison-pass1.png`
  - `design/qa/community-comparison-pass1.png`

## Viewport and normalization

- Desktop CSS viewport: 1280 × 900 at device pixel ratio 0.8.
- Desktop normalized capture: 1024 × 720 px.
- Mobile CSS viewport: 390 × 843 at device pixel ratio 0.8.
- Mobile normalized capture: 312 × 675 px.
- Source page crops: 768 × 512 px.
- For side-by-side inspection, each implementation capture was resampled to 768 × 540 and placed beside its corresponding 768 × 512 source crop.
- The in-app browser capture backend returned additional repeated pixels beyond its authoritative first viewport tile. `scripts/crop-browser-capture.mjs` crops the first tile to the reported CSS viewport and device density before comparison.
- State: public, unauthenticated, light theme, page top, no dialog open unless explicitly testing a conversion flow.

## Full-view comparison

The implementation preserves the selected Field Collective direction across all four pages:

- Asymmetric copy-and-documentary-image hero composition.
- Manrope humanist typography with IBM Plex Mono field labels and metadata.
- Warm paper, deep indigo, oxidised orange, moss green, and chartreuse signal tokens.
- Thin rules, dashed field divisions, stamped numbering, square actions, and minimal elevation.
- Clear separation between Upskilling and Business while keeping one shared collective identity.
- Documentary imagery is local, candid, properly cropped, and consistent across the page family.

The implementation intentionally expands the board’s abbreviated page concepts into complete responsive pages. The above-the-fold hierarchy, content order, visual rhythm, and core page identity remain consistent with the source.

## Focused-region comparison

Separate micro-crops were not required. The 768 px comparison panels keep the hero typography, primary actions, imagery, field metadata, pathway sequencing, rule weights, and signal bars legible enough to judge directly. The browser DOM was also inspected for heading hierarchy, image alternatives, labels, and interactive controls.

## Required fidelity surfaces

### Fonts and typography

- Manrope matches the warm geometric/humanist display voice of the selected direction.
- IBM Plex Mono is limited to field labels, numbering, metadata, and calls to action.
- Display wrapping is intentional and responsive. `AI‑savvy` uses a nonbreaking hyphen to avoid an awkward line break.
- Each route has exactly one `h1`; hierarchy is coherent through `h2` and `h3`.
- No actionable typography mismatch remains.

### Spacing and layout rhythm

- Desktop, tablet, and mobile layouts were checked.
- Supporting-page hero height, headline scale, image ratio, and padding were tightened during QA so the first curriculum or process section remains visible near the fold.
- No horizontal overflow was found at 1280, 767, or 390 CSS px.
- Cards, rounded surfaces, and nested elevation were avoided in favour of rules, spacing, and flat colour fields.
- No actionable spacing or layout mismatch remains.

### Colors and visual tokens

- All primary surfaces map to the source palette with flat colour only.
- No decorative gradients, glass effects, sci-fi purple, or neon AI styling is present.
- Text/action contrast is strong across paper, indigo, green, orange, and signal surfaces.
- Focus indicators use a visible three-pixel orange outline.
- No actionable token mismatch remains.

### Image quality and asset fidelity

- All four visible documentary image slots use dedicated generated assets in the selected art direction.
- No placeholder imagery, CSS drawing, custom SVG art, or generic stock-photo substitute is used.
- Wide page images are stored as quality-88 JPEGs after a browser raster issue was discovered with their PNG versions.
- Crops remain clear and purposeful at desktop and mobile breakpoints.
- No actionable image-quality issue remains.

### Copy and content

- The visible copy matches the chosen strategy: practical AI, real work, responsible adoption, and shared capability.
- The event date was updated to 22 August 2026 rather than preserving the generated mock’s stale placeholder date.
- Forms ask about participation or the business problem rather than requesting a predetermined AI solution.
- No actionable content mismatch remains.

### Icons and interaction states

- Phosphor provides a consistent thin-line icon family; no handmade or inline SVG substitutes are present.
- Navigation links, mobile menu, join actions, readiness-clinic actions, close controls, form validation, and success states work.
- Dialogs move focus to the close control, trap keyboard focus, close with Escape, and make background sections inert.
- No console warnings or errors were present in the final browser check.

## Responsive and interaction evidence

- Desktop: all four routes inspected at 1280 × 900 CSS px.
- Tablet: all four routes inspected at 767 × 1023 CSS px with no horizontal overflow and one `h1` per page.
- Mobile: home and navigation inspected at 390 × 843 CSS px with no horizontal overflow.
- Mobile menu opened, changed its accessible name to `Close navigation`, and routed successfully to `/learn`.
- Join flow tested with local mock data through the success state: `You’re on the founding list.`
- Business clinic flow tested with local mock data through the success state: `We’ll help you find the right first step.`
- Images on all routes have useful alternative text.
- Final browser console check: zero warnings and zero errors.

## Comparison history

### Iteration 1

- [P1] Supporting-page documentary images painted as a thin strip in the in-app browser.
  - Evidence: `design/qa/learn-comparison-pass1.png`
  - Fix: converted all wide documentary assets from PNG to quality-88 JPEG and updated the consuming routes.
  - Post-fix evidence: `design/qa/learn-comparison-pass2.png`, `design/qa/business-comparison-pass1.png`, and `design/qa/community-comparison-pass1.png`.

- [P2] The Upskilling hero was too tall, leaving the curriculum below the initial viewport and changing the source hierarchy.
  - Evidence: `design/qa/learn-comparison-pass2.png`
  - Fix: reduced supporting-page hero minimum height and vertical padding, tightened the display scale, used a wider image ratio, and prevented `AI‑savvy` from splitting.
  - Post-fix evidence: `design/qa/learn-comparison-pass3.png`

### Final pass

- No actionable P0, P1, or P2 findings remain.
- The expanded sections below the visual board are intentional product completion, not design drift.

## Open questions

- None blocking this first version.

## Implementation checklist

- [x] Four core routes implemented.
- [x] Shared design system applied consistently.
- [x] Generated documentary asset set installed.
- [x] Desktop, tablet, and mobile layouts checked.
- [x] Navigation and mobile menu tested.
- [x] Join and readiness-clinic flows tested.
- [x] Dialog keyboard behaviour checked.
- [x] Browser console checked.
- [x] Production build passed.
- [x] Sites worker tests passed.

## Follow-up polish

- [P3] A commissioned BorneoAI wordmark and local documentary photography can replace the current typographic brand and generated launch imagery once those assets exist.

final result: passed
