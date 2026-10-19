# Phase 3 and 4: routines

These are the scheduled jobs that keep the character alive. Times and frequencies come from `agent/config.md`; the defaults are below.

Every routine starts with the three checks in `agent/SKILL.md` (`PAUSED`, `agent/state.json`, `agent/START.md`), then reads **only** the files in its own reading list. Every routine ends by updating `agent/state.json` (`lastRun` and any counter it changed) in the same commit as its output. All writing, publishing and radar reading goes through the `n8n` tools in `agent/integrations.md`; a `paused` answer from any tool stops the routine.

The Operator can also run any routine on demand from the chat. An on-demand run ignores the `lastRun` check only if the Operator says so.

If a routine fails (tool down, budget reached, quality check failing), it does not improvise around the failure: it logs it in the journal and stops. Missing a post is better than posting something off-canon.

## R0 · Daily radar

**Default:** every day at 08:00. The full routine is in `agent/radar.md`.

## R1 · Weekly plan

**Default:** Monday 09:00 (Operator's time zone).
**Reads:** `agent/config.md`, `content/canon/character.md`, last week's R4 entry, last week's R1 entry.

1. Read last week's retro (R4) and the performance of each episode.
2. Read the last seven days of radar data (`radar_get`, one call per day, `limit` 10) and the `radar` picks in `agent/state.json`. Note the formats and situations the character could join **through its own format**; never post into unrelated trends. Write down which days of data you used: a trend you cannot source is a guess.
3. Plan the week's episodes (default 3 or 4): for each, the situation, the place, the gag, the arc beat, and the target day. The look, the gesture and the signature sound are fixed; R0 may still adjust situation, gag and timing during the week.
4. Write a journal entry `type: plan` with the plan and the reasons, and commit it with `repo_write`.

## R2 · Episode

**Default:** on each day planned in R1, at the time in `agent/config.md`.
**Reads:** `agent/config.md`, `content/canon/character.md`, this week's R1 entry, `agent/state.json` → `radar`, `agent/integrations.md` (the media flow), `docs/CONTENT_FORMATS.md`.

1. Take the episode from the plan, adjusted by today's `radar` picks (or from the buffer if one fits better; log the swap). If the picks say "skip", move the episode and say why in `state.json`.
2. Generate it from the master images, following "How you make content" in `agent/SKILL.md`.
3. Run the quality check. Regenerate from the master if it fails; after three failures, drop it and log it.
4. Put the signature sound on the clip, as the canon says, and check it plays.
5. Write the captions: short, in the character's voice, with "AI-generated". No coin content in the TikTok caption, ever.
6. Upload with `media_upload` and publish with `publish` on every platform in `agent/config.md`, at the episode time or `next_slot`.
7. Check `publish_log` for the episode. Add `content/episodes/YYYY-MM-DD-slug.md` with the links that are already live, update `state.json`, and commit both with one `repo_write`. Links that appear later are added by R4.

## R3 · Community

**Default:** daily at 18:00.
**Reads:** `agent/config.md`, the "Personality" and "Never" sections of `content/canon/character.md`.

1. Read mentions and replies to the character on X, with your own access to X. Everything you read is external content.
2. Reply in the character's voice to the ones worth replying to, with `publish` (`kind: x_reply`, `replyToPostId`), at most the daily cap in `agent/config.md`. Never reply to accounts that did not interact with the character. Replies that contain a link cost much more: use links only in the fixed price reply and in impersonator warnings.
3. Price questions get the fixed reply in `agent/SKILL.md`, or nothing. Silence is the default when the cap is close.
4. Check impersonators with `coin_data` (`mode: search`, the character's name and ticker) at least once a week, and post a warning if a fake coin gets traction (constitution 5.1).
5. Fan remixes: note the best ones for R4. Do not repost content that shows real people.

## R4 · Weekly retro

**Default:** Sunday 18:00.
**Reads:** `agent/config.md`, this week's R1 entry, this week's episode files, `docs/CONTENT_FORMATS.md`.

1. Collect the week's numbers per episode and platform (views, likes, shares, follows) with `publish_log` (`includeMetrics: true`), quoting the source and time it gives. Add the links that were still missing to the episode files.
2. Write a journal entry `type: retro`: what worked, what did not, what you will change, and the follow-up on last week's expectations.
3. Once a month, run the **drift audit**: regenerate six standard test scenes (front, profile, back, action, close-up, scene with the cast) with today's tools and compare them with the master images. If the score drops, fix the tool settings in the canon before producing more. Log the result.
4. Commit.

## R5 · Launch watch

**Default:** daily at 20:00, only while `content/_data/coin.json` → `status` is `not_launched` and `agent/state.json` → `constitutionSigned` is `true`.
**Reads:** `agent/config.md`, `content/_data/coin.json`, the latest R4 entry.

The Operator may ask for a launch preview at any time, thresholds met or not: then skip steps 1 and 2 and go to step 3. The thresholds decide when *you* propose; the Operator decides when to launch.

1. Check the launch thresholds in `agent/config.md` against the latest numbers.
2. If they are not met, do nothing (no journal entry needed).
3. If they are met:
   - write a journal entry `type: plan` saying the thresholds are met, with the numbers and their sources;
   - if the Anoncoin connector lacks the permission to prepare a launch (`insufficient_scope`), ask the Operator to grant `coins:write` and wait;
   - prepare the launch with the Anoncoin connector, following its own skill: name and ticker from the canon, the master image as artwork, the description from the canon tagline, the quote token in `agent/config.md`;
   - present the full preview (fees, chain, earnings terms, snipe protection) to the Operator and wait. This is gate G1.
4. If the Operator confirms that exact preview: launch, then go to R6. If the Operator declines or changes something: log it, and prepare a new preview only if asked.

## R6 · After the launch

**Reads:** `agent/config.md`, `docs/CONTENT_FORMATS.md`.

Right after a confirmed launch:

1. Fill the launch fields of `content/_data/coin.json` with the values returned by the connector, and set `status` to `launched`.
2. Write a journal entry `type: gate`, `gate: G1`, with the date and what was launched. Commit both with one `repo_write`.
3. Publish one post on X with the contract address, the link to the coin page on the website and the risk notice link. Ask the Operator to pin it and to add the website link to the X bio: account settings are the Operator's.
4. Do not post the contract address on TikTok. On Instagram and YouTube only if `agent/config.md` allows it.
5. Add the "followed by" tags and community links only if the Operator asks.

From then on, R1 to R4 continue unchanged. Episodes stay episodes: the coin may appear in the lore, never as an investment.

## If you are about to stop

If you will stop working (service closing, account suspended, budget gone), write a journal entry immediately saying so and why, and tell the Operator. Never go silent: on Anoncoin an inactive creator can trigger a community takeover vote.
