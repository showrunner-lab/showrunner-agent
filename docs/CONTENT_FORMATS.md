# Content formats

How the Showrunner writes to this repository. Every commit to `main` rebuilds the public website, so **every file here is public the moment it is pushed**. The Showrunner writes only through the `repo_write` tool (`agent/integrations.md`), which refuses files that break the rules below.

Rules that apply to every file:

- Write in English.
- Never write secrets, API keys, private messages, personal data of followers, or the names of real people who did not agree to be named.
- One commit per change, with a message that says what changed and why (for example `journal: weekly plan W45`, `canon: add rival character`).
- Never rewrite history. Corrections are new commits; a wrong journal entry gets a correction note, not a silent edit.
- `CONSTITUTION.md` is changed only through the amendment process (constitution, section 9). The Showrunner may propose changes in the journal but never edits the file.

## Journal entry · `content/journal/YYYY-MM-DD-short-slug.md`

```markdown
---
title: One line, says what was decided
date: 2026-11-01
author: showrunner        # showrunner | operator
type: decision            # decision | plan | retro | canon-change | gate | pause | setup | correction
gate: G1                  # only for type: gate (G1 launch, G2 funds, G3 amendment)
summary: One sentence shown in lists.
---

What was decided, in one paragraph.

Why: the reasons and the data behind them (numbers with their source).

What I expect to happen, and how I will know if I was wrong.

Follow-up: (added later) what actually happened.
```

Minimum cadence: one entry per week (`type: plan` on Monday or `type: retro` on Sunday), plus one entry for every decision that changes the canon, the plan or the coin.

## Episode · `content/episodes/YYYY-MM-DD-short-slug.md`

One file per published piece of content.

```markdown
---
title: Short title of the episode
date: 2026-11-02
arc: pilot                # story arc this episode belongs to
platforms:
  - { name: TikTok, url: "https://..." }
  - { name: X, url: "https://..." }
tools: [Grok Imagine]     # tools used to make it
---

One or two sentences: what happens in the episode and which canon element it uses.
```

Media files, if any, go in `content/media/` (keep them small, at most 2 MB; the platforms host the videos). The links in `platforms` come from `publish_log`: add only links that are live.

## Canon · `content/canon/character.md`

The single source of truth for the character. Bump `version` in the front matter on every change and log it in the journal (`type: canon-change`). Sections, in this order:

1. **Look**: silhouette, signature features, outfit, palette (hex values). These must match the reference images.
2. **Signature gesture**: the one repeatable action, described so it can be reproduced.
3. **Sound**: the signature sound file in `content/media/canon/`, where it falls in a clip, whether it replaces or is mixed with the clip's own audio, and the exact command used. Never borrowed music or trending sounds.
4. **Personality**: how the character behaves; what makes it funny.
5. **Cast**: supporting characters, each with one line.
6. **Lore**: the story so far and the open arcs.
7. **Never**: what the character never does or says (includes everything in constitution section 4).
8. **Visual references**: links to the approved master images, the continuity sheet and the reference slot plan (which image goes in which Reference Mode slot), all in `content/media/canon/`.

When the palette is set, copy the hex values to `content/_data/theme.json` so the website uses the character's colors.

## Origin · `content/origin.md`

Written once, during ideation: every concept proposed, the score of each against the criteria, the winner and the reasons, and the discarded ones. After the character is chosen this page is not edited, except to fix errors with a visible note.

## Site settings · `content/_data/site.json`

`characterName`, `tagline`, `status` (`pre-ideation` → `ideation` → `live`) and the official account links. Update when they change.

## Radar summary · `content/_data/radar.json`

Overwritten by routine R0 every day (`agent/radar.md`). It is the public, aggregated view of what the Showrunner watched: numbers and the Showrunner's own labels only. Never links to other people's content, handles, captions, sound titles, or anything about upcoming episodes.

```json
{
  "date": "2026-11-02",
  "sources": {
    "x": { "looked": 10 },
    "tiktok": { "items": 40, "medianVelocity": 5200 },
    "instagram": { "items": 25, "medianVelocity": 1800 },
    "youtube": { "items": 20, "medianVelocity": 2400 }
  },
  "shares": { "aiCharacter": 0.18, "coinMention": 0.04, "originalSound": 0.35 },
  "formats": [
    { "label": "deadpan office POV", "count": 7 },
    { "label": "slow zoom reveal", "count": 5 }
  ],
  "note": "One sentence in the Showrunner's words about the day."
}
```

## Coin data · `content/_data/coin.json`

The Showrunner fills these fields right after the Operator confirms the launch (gate G1), and only with facts it can link to on Anoncoin or on-chain: `status`, `ticker`, `chain`, `contractAddress`, `launchPageUrl`, `launchedAt`.

Never write wallet addresses, balances, trades or fee amounts of the people behind the project.
