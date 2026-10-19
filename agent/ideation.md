# Phase 1 and 2: ideation, bible and buffer

Run once, after `CONSTITUTION.md` is signed. Set `content/_data/site.json` → `status` to `ideation` when you start, and write a journal entry (`type: plan`) saying so.

## What we know about characters like this

Use this as evidence, not as a template to copy.

- **Jean Phil** (Sept 2026) went viral with 12 posts in four weeks: a fixed, exaggerated look, a silent setup followed by sudden shadowboxing, Paris as the backdrop that changes, trending music. Fans remixed it and invented relatives and rivals. Its coin peaked around $12M and lost about 70% when people learned the character was AI and felt deceived. It held value afterwards because the creator kept posting and did not sell.
- **His imitators** copied the look and arrived late: the closest copy (Archibald Brown) had a coin that fell from over $1M to about $15K. Since October 2026 tools sell that look in one click.
- **Coins that lasted** had a source that kept producing content or an IP that existed before the coin. Coins on a single spike lost 90 to 99%.
- **Stylized or "imperfect" designs** read better than near-real faces, which trigger uncanny-valley discomfort. A character with exaggerated features is also easier to keep consistent.

## Step 0: look at what is viral now

The notes above are from October 2026. Before ideating, spend one session on what is working **now**: AI characters and mascots trending on TikTok, Instagram and X in the last 30 days (use `radar_get` for the last days of TikTok, Instagram and YouTube data, and your own search on X), which formats and sounds carry them, which looks have become generic because tools sell them in one click, and which character coins launched recently and how they went. Write a short, sourced note at the top of `content/origin.md` (dates and links). Concepts that copy what is already saturated lose points on C3.

## Step 1: generate ten concepts

Ten concepts generated in one go tend to be ten versions of the same idea. Force the spread with this matrix: every cell in the first column must be used at least twice, every cell in the second and third at least once, and no two concepts may share all three.

| Figure | Gesture type | Setting |
|---|---|---|
| Stylized human | Physical burst (fight, dance, jump) | One city, many places |
| Anthropomorphic animal | Precision ritual (fold, pour, align) | Workplaces |
| Object or food with a face | Failed competence (tries, fails, stays proud) | Nature and transport |
| Creature or monster, friendly | Silent reaction (stares, nods, slow turn) | Domestic interiors |

Generate the concepts in at least two separate passes (five and five), rereading the matrix between them, so the second batch does not echo the first.

Each concept on one page, with:

1. **Name**, and the ticker you would use (the name itself, short, easy to say).
2. **Silhouette**: one or two exaggerated features readable in a thumbnail.
3. **Uniform**: the outfit worn in every piece of content.
4. **Palette**: three to five hex colors.
5. **Signature gesture**: one silent, repeatable physical action, with its setup and its absurd payoff.
6. **The incongruity**: the one thing about the character that does not fit and makes people remix it.
7. **The moving variable**: what changes from episode to episode (places, situations, objects).
8. **Signature sound**: a short sound the character owns (a sting, a call, a two-note motif) that every clip carries, generated with Grok Imagine. No borrowed music.
9. **Cast seeds**: two supporting characters (for example a rival and a relative), one line each.
10. **Personality and first arc**: who the character is, and the first story over four to six episodes. A single gag decays within two to three weeks, so the arc matters.
11. **Risks**: anything that might resemble a real person, an existing character, a brand, a known jingle, or the generic look of AI-influencer tools.

Make the ten concepts genuinely different from each other and from Jean Phil: different silhouettes, gestures and settings. At least three must not be human-realistic (stylized, anthropomorphic, or clearly cartoonish).

## Step 2: score them

Score each concept from 1 to 5 on each criterion. Show the full table.

| # | Criterion |
|---|---|
| C1 | Silhouette readable in a thumbnail |
| C2 | Same uniform works in every scene |
| C3 | Distinct from Jean Phil, his imitators and the default AI-influencer look |
| C4 | Signature gesture is silent, repeatable, with a payoff in the first seconds |
| C5 | The incongruity invites remixes |
| C6 | Moving variable gives at least 30 episodes without repeating |
| C7 | Cast and arc give a reason to follow, not just to watch once |
| C8 | Stays recognizably the same in Grok Imagine across poses and scenes (tested in step 3) |
| C9 | No resemblance to real people, characters or brands |
| C10 | Name and ticker are short, sayable, and free (step 3) |

C8 and C9 are gates: a concept scoring below 4 on either is out, whatever its total. C8 is scored for real only in step 3; in step 2 estimate it, favoring bold shapes and flat colors over fine facial detail.

## Step 3: check the top three

For the three highest scores:

- **Name and handle availability** on X, TikTok, Instagram and YouTube. Record what you find; do not create accounts.
- **Domain availability**: the name with `.com` and two or three alternatives (for example `.xyz`, `.fun`, `.tv`). Record only whether each is free and its yearly price; never register, reserve or put a domain in a cart.
- **Ticker**: use the Anoncoin connector's `check_ticker`, and search existing coins with the same name on Anoncoin, DexScreener and pump.fun. Availability is not a reservation; just record it.
- **Resemblance search**: search the web and image results for the name and for a description of the look. Record anything close.
- **Consistency test in Grok Imagine**: for each finalist, generate a front master, then with Reference Mode three more images (profile, back, in a scene doing the gesture) and one 6-second video of the gesture. Score each against the master with the quality check in `agent/SKILL.md`. This is the real C8 score. A concept Grok Imagine cannot keep consistent is out, however good it is on paper.

## Step 4: choose and publish the origin

Choose the winner yourself. Then:

1. **Tell the Operator first, privately**: the name, the handles to register, and the domain you chose with two fallbacks. Only the Operator creates accounts and buys the domain. The character's X account already exists under a placeholder handle: the Operator renames it, so give the X handle you want it renamed to. The repository is public: if the name appears there before the handles and the domain are taken, anyone can take them. **Commit nothing that reveals the name until the Operator confirms the handles and the domain are registered.**
2. When the Operator confirms, write `content/origin.md`: the ten concepts, the full score table, the checks of step 3, the winner and the reasons, and what you rejected and why. This page is the character's birth certificate: it is not edited later except to correct errors with a visible note.
3. Write a journal entry (`type: decision`) and commit.

## Phase 2: the bible

Build once, version forever. Save images in `content/media/canon/` (compressed, small; upload them with `media_upload` and commit them with `repo_write` and `fromUrl`) and describe everything in `content/canon/character.md`, in the section order of `docs/CONTENT_FORMATS.md`.

How to build every reference image (masters, expressions, outfit, props):

- **Highest resolution Grok Imagine offers**, on a **plain neutral grey background**, even light, no scene behind the character.
- **Empty hands.** Objects held in the hands change from one angle to the next. Every prop gets its own reference image.
- **Close-ups of the small details** (teeth, a scar, a button, a logo-free pattern): the model reproduces only what the references show.
- **Four options, then lock.** For each master, generate four options, pick the best against the concept, and lock it. Never regenerate a locked master casually: a new master is a canon change.
- Keep the full-resolution files on your computer for Reference Mode; commit compressed copies (at most 2 MB each) to the repository.

1. **Master images**: front, three-quarter, profile, back, full body. Approve them against the concept; these are the anchor of every future image and video.
2. **Expression sheet**: six to eight expressions.
3. **Outfit and props sheet**, with the distinctive details named.
4. **Palette** in hex, and copy it to `content/_data/theme.json` (`bg`, `surface`, `text`, `muted`, `accent`, `line`), keeping the text readable on the background.
5. **Location plates** for the first arc.
6. **Signature gesture**: a written beat-by-beat description, plus a reference clip.
7. **Signature sound**: generate it with Grok Imagine (two to four seconds, recognizable, no melody that resembles existing music), save it in `content/media/canon/` (small `m4a` or `mp3`, through `media_upload` and `repo_write`), and write in the canon "Sound" section where it falls in a clip (for example on the payoff of the gesture), whether it replaces or is mixed with the clip's own audio, and the exact `ffmpeg` command you use.
8. **Locked descriptors**: the exact words you use in every prompt for this character, and a "do not change" checklist (features to never add or alter), written so that each line matches a criterion of the quality check in `agent/SKILL.md`.
9. **Tool settings**: Grok Imagine version and mode, the prompt template, and the **reference slot plan**: which of the (at most) seven Reference Mode slots holds which image, in which order (for example: 1 front master, 2 three-quarter, 3 profile or back, 4 face close-up, 5 prop, 6 location plate, 7 free). When Grok Imagine changes version, re-run the six test scenes of the drift audit before producing more.
10. **Continuity sheet**: one page assembled from the approved images above (cropped and laid out with a command-line tool, never generated in one shot), with name, key traits, palette and the "do not change" checklist. It goes on the Canon page of the website and to the Reviewer. Use it as a Reference Mode input only if the Operator's smoke test showed that a sheet scores better than separate images (`agent/config.md` → `Reference input`).
11. **Personality, cast, lore and "never"** sections.

Bump the canon `version` to `1.0.0`, update `site.json` (`characterName`, `tagline`, `status: buffer`), write a journal entry (`type: canon-change`) and commit.

## Phase 2: the buffer

Before the first public post, produce **ten to fifteen finished episodes** that pass the quality check, covering the first arc. Keep them unpublished. When the Operator has created the accounts and filled `agent/config.md`, set `status: live`, write a journal entry, and start the routines in `agent/routines.md`.
