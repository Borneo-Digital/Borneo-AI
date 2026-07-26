# BorneoAI UI and UX Audit

Date: 26 July 2026
Scope: Home, Learn, Business, Community, responsive navigation, collective form, readiness-clinic form, and confirmation state.

## Overall verdict

BorneoAI already has a distinctive, credible visual identity and a clear two-pathway proposition. The main weakness is not aesthetics; it is the gap between what calls to action promise and what happens next. The next iteration should prioritise information architecture, offer clarity, trust, and conversion-flow specificity before adding more decorative polish.

## Audit steps

1. **Homepage — Healthy with clarity gaps**
   - Strong first impression, local positioning, and clear Learn/Business split.
   - The secondary “Join the Collective” action competes with two primary pathways without explaining membership.

2. **Learn pathway — Healthy structure, incomplete offer**
   - Four progression levels are easy to scan.
   - Missing programme format, duration, schedule, delivery mode, location, price, prerequisites, and a concrete next session.

3. **Business pathway — Healthy structure, incomplete conversion context**
   - The adoption sequence and responsible-AI framing are credible.
   - The clinic CTA does not explain duration, deliverables, who attends, cost, or expected response time.

4. **Community pathway — Needs improvement**
   - Strong initiative/event/contribution structure.
   - “Explore the playbook,” “View details,” and “Contribute now” all lead to the same general joining form. The actions promise different outcomes but do not deliver distinct flows.

5. **Responsive navigation — Fair**
   - Menu is visually clean and its open/close control is labelled.
   - Current location is not visibly differentiated in the responsive menu; page links do not expose `aria-current`.
   - The page behind the menu remains interactive and scrollable.

6. **Collective form — Good visual execution, needs better routing**
   - Labels, required fields, focus entry, dialog semantics, Escape handling, focus trap, and inert background are implemented.
   - A free-form “How would you like to take part?” field creates unnecessary effort. Structured interests would route people more effectively.
   - No privacy note, consent context, or response expectation is shown.

7. **Readiness clinic form — Good visual execution, incomplete reassurance**
   - Business-specific prompt and organisation field are appropriate.
   - Missing clinic logistics, data/privacy reassurance, and what happens after submission.

8. **Confirmation state — Visually clear, accessibility gap**
   - Confirmation copy is calm and useful.
   - After submission, focus falls to the document body and there is no live region, so assistive technology may not announce the state change.
   - No response timeframe is provided.

## Strengths

- Distinctive editorial/field-notebook design that avoids generic AI aesthetics.
- Clear Borneo grounding without leaning on superficial technological imagery.
- Consistent typography, colour, linework, photography, and generated illustrations.
- Strong Learn versus Business pathway framing.
- Responsive layouts tested without horizontal document overflow.
- Good baseline keyboard focus treatment, semantic headings, image alternatives, and modal structure.
- No console errors were observed during the audit.

## Prioritised improvements

| Priority | Improvement | Why it matters | Effort |
|---|---|---|---|
| High | Make every CTA deliver the action it names | Playbook, event details, contribution, membership, and clinic requests currently collapse into overly similar form flows | Medium |
| High | Simplify the primary navigation | Workshops/Resources/Field Notes/Projects do not map cleanly to the two core pathways; For Business is missing as a direct top-level destination | Low |
| High | Add concrete programme and clinic details | Visitors cannot judge fit, commitment, timing, cost, or next steps | Medium |
| High | Add trust and ownership signals | A new collective needs named organisers, practitioner profiles, partners, proof of work, or launch milestones | Medium |
| High | Fix orange contrast | Orange on paper is 3.32:1 and light text on orange is 3.69:1, below 4.5:1 for normal text | Low |
| High | Offset anchored sections below the sticky header | The learning-path jump lands at `top: 0` behind a 77px sticky header | Low |
| Medium | Add active-route semantics and route-change handling | Navigation lacks `aria-current`; titles and focus do not update after client-side navigation | Low |
| Medium | Improve responsive-menu accessibility | Add current-page treatment, focus management, Escape handling, inert/backdrop behaviour, and body-scroll locking | Medium |
| Medium | Structure the membership form | Offer selectable interests such as Learn, Contribute, Attend, Mentor, Partner, or Business | Low |
| Medium | Announce successful submissions | Move focus to the confirmation heading or status and add a live region | Low |
| Medium | Increase small touch targets and microcopy sizes | Menu, inline links, footer links, field-strip text, and stamps are small for touch and comfortable reading | Low |
| Medium | Add privacy and response expectations | Email forms need clear data use and “what happens next” reassurance | Low |
| Low | Remove unused PNG duplicates | Unused public PNG versions add roughly 8MB to the deployable project | Low |
| Low | Add per-route metadata | All routes share the same browser title and lack route-specific descriptions | Low |

## Recommended information architecture

Primary navigation:

- Learn
- For Business
- Community
- About
- Join the Collective

Secondary links should live inside their relevant pathway:

- Workshops and curriculum under Learn
- Projects and readiness process under For Business
- Resources, Field Notes, events, and contribution under Community

## Recommended conversion flows

- **Start Learning** → programme overview → upcoming cohort/session → register interest
- **Book a Clinic** → clinic details → request form → response timeframe
- **Explore Playbook** → browsable workflow library
- **View Event Details** → event page/modal → RSVP
- **Contribute** → contribution guidance → submission form
- **Join the Collective** → selectable interests → relevant onboarding

## Accessibility considerations

- Change orange text to the darker orange token, or use navy text on orange for normal-sized copy.
- Add `aria-current="page"` to the active navigation link.
- Add a skip link and route-specific document titles.
- Move focus to the main heading after client-side navigation.
- Add `scroll-margin-top` to hash targets.
- Keep interactive targets at approximately 44 by 44 CSS pixels.
- Announce form success with focus management and `role="status"` or an appropriate live region.

## Evidence limits

- This was a local prototype audit using current screenshots, DOM inspection, source inspection, and interaction testing.
- It does not establish full WCAG compliance.
- No real submission backend, production analytics, email delivery, performance telemetry, or error/retry state was available.
- Responsive reflow was structurally checked down to a narrow logical viewport, but the accepted visual screenshots use the live in-app browser width.

## Screenshot evidence

- `01-home.png`
- `02-learn.png`
- `03-business.png`
- `04-community.png`
- `05-menu-open.png`
- `06-join-modal.png`
- `07-clinic-modal.png`
- `08-clinic-success.png`
