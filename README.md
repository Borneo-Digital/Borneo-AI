# BorneoAI

The public website and founding-stage prototype for **BorneoAI**, a practitioner-led collective
helping people and organisations across Borneo learn, adopt, and share practical AI.

The collective begins in Sarawak and Sabah with two connected pathways:

- **Learn** — practical AI upskilling for individuals.
- **For Business** — responsible AI readiness and adoption for organisations.

The website also introduces the founding community and the **100 Useful AI Workflows for Borneo**
field project.

## Technology

- React 19
- Vite 6
- JavaScript and CSS
- Cloudflare Worker-compatible static hosting

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm test
npm run build
npm run test:sites
```

The production build generates route-specific SEO documents for:

- `/`
- `/learn`
- `/business`
- `/community`

It also publishes `robots.txt`, `sitemap.xml`, Open Graph metadata, X/Twitter cards, canonical URLs,
and JSON-LD structured data.

## Current product status

BorneoAI is at the founding stage. Learning cohorts, readiness clinics, gatherings, and
contribution workflows are represented as interest flows while their operating details are being
finalised.

The visible forms are prototype interactions only. They are not connected to a submission service
and do not transmit or store user data.
