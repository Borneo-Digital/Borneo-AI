# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## BorneoAI visual direction

- Treat the selected Field Collective multi-page mock as the visual source of truth.
- Avoid AI clichés, futuristic interfaces, generic SaaS cards, glass effects, decorative gradients, and appropriated indigenous motifs.
- Use the shared field-system tokens: warm paper, deep indigo, oxidised orange, moss green, and chartreuse signals.
- Use Manrope for display/body copy and IBM Plex Mono for field labels, numbering, metadata, and wayfinding.
- Keep imagery documentary, local, candid, and grounded in real learning or business work.
- BorneoAI is a practitioner-led collective founded in Sarawak and Sabah; every page should feel useful, participatory, and human.

## Founding-stage product truth

- Present BorneoAI as a collective that is now forming, not as an established programme with past results.
- Do not invent testimonials, participant feedback, case studies, partner logos, outcome metrics, confirmed schedules, or pricing.
- Learning cohorts, readiness clinics, gatherings, and the workflow playbook should use honest interest or coming-soon states until details are real.
- Prototype forms must visibly say that submissions are not connected or transmitted.
