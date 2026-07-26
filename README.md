# The Nixon Index

Corruption, measured. Static site built with Astro, deployed on Netlify.

## Setup

```bash
npm install
npm run dev      # local dev at localhost:4321
npm run build    # static output to dist/
```

## Deploy (Netlify)

1. Push this repo to GitHub.
2. Netlify → Add new site → Import from GitHub → pick this repo.
3. Netlify auto-detects Astro. Build command `npm run build`, publish dir `dist`. Accept defaults.
4. Buy `nixonindex.com` in Netlify → Domain management. DNS + SSL are automatic.

## Publishing a new case file

Add one markdown file to `src/content/case-files/`. That's the whole
workflow — no code changes. Frontmatter schema (validated at build time by
`src/content.config.ts`):

```yaml
caseNumber: "002"
title: "How many Nixons is ...?"
subject: "Short label"
ruled: 2026-08-01
summary: "One-paragraph teaser."
scores: { f1: 0-10, f2: 0-10, f3: 0-10, f4: 0-10, f5: 0-10 }
sources:
  - label: "Outlet — headline (date)"
    url: "https://..."
```

The total score, stamp, factor bars, and receipt line are all computed
from `scores` automatically. Body markdown below the frontmatter becomes
the article.

## Editorial rules (the credibility armor)

- Every factor input cites a public record listed in `sources`.
- Scores are framed as opinions under the published methodology (footer
  disclaimer is baked into the layout — leave it).
- The formula lives in `src/data/factors.js`. If you change weights, bump
  the methodology version on the methodology page and note it publicly.
