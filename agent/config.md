# Configuration

Filled in by the Operator. The Showrunner reads it at the start of every task and never edits it.

The caps and budgets below are the values to plan with. The automation behind the `n8n` tools holds the real limits and refuses anything above them; if the two ever differ, the automation wins and the Operator updates this file.

## Project

| Key | Value |
|---|---|
| Website URL | [WEBSITE_URL] |
| Repository URL | [REPO_URL] |
| Time zone | Europe/Rome |
| Managing X account | @showrunnerlab |

## Character accounts

Created by the Operator after ideation, with the project's email.

| Platform | Handle | Publishing method |
|---|---|---|
| X | [X_HANDLE] | `n8n` → `publish` (posts and threads through the publishing service, replies through the X API) |
| TikTok | [TIKTOK_HANDLE] | `n8n` → `publish` |
| Instagram | [IG_HANDLE] | `n8n` → `publish` (Reels) |
| YouTube Shorts | [YT_HANDLE] | `n8n` → `publish` |

Reading mentions on X: your own access to X, signed in to the character's account by the Operator.

## Integrations

| Key | Value |
|---|---|
| Connector name in Grok Bot | `n8n` |
| Tools | `ping`, `radar_get`, `radar_run`, `media_upload`, `publish`, `publish_log`, `repo_write`, `coin_data` (contracts in `agent/integrations.md`) |
| Repository writes | only `repo_write` |

## Cadence and caps

| Key | Value |
|---|---|
| Episodes per week | 3–4 |
| Episode time | 12:30 |
| Max X posts per day (first two weeks) | 3 |
| Max X posts per day (after) | 5 |
| Max TikTok posts per day | 2 |
| Max Instagram posts per day | 2 |
| Max YouTube posts per day | 2 |
| Max replies on X per day | 10 |
| Max media uploads per day | 30 |

## Radar

| Key | Value |
|---|---|
| R0 time | 08:00 |
| Automatic collection (TikTok, Instagram, YouTube) | 07:00, by the automation |
| Budget | 1 USD per day, 30 USD per month (enforced by the automation) |
| Watchlist | `agent/radar/watchlist.md` (at most 8 entries per list) |
| Videos watched closely per day | 3–5 |

## Generation

| Key | Value |
|---|---|
| Image, video and sound tool | Grok Imagine, only (constitution, section 6) |
| Access path | [app: Grok Bot drives Grok Imagine directly / api: xAI API, model grok-imagine-video-1.5 or newer] |
| Monthly API budget (only if access path is api) | [e.g. 0 USD] |
| Max video resolution | 720p |
| Reference input | [separate: master images in slots / sheet: continuity sheet in slot 1 — set by the Operator after the smoke test] |
| Audio editing tool | `ffmpeg` on the Showrunner's computer (editing only, never generation) |
| Usage budget | One weekly usage pool shared by chat, Grok Imagine and Grok Bot. Video generation is the heaviest item: generate the three candidates, never more without a reason, and log in the journal when the pool runs out. If the Operator switches the access path to `api`, video generation is billed separately and does not draw from the pool |
| Reviewer | off (set to `on` to route the quality check to a second "Reviewer" bot; costs allowance) |

## Sound

| Key | Value |
|---|---|
| Signature sound file | set by the Showrunner in the canon, "Sound" section (`content/media/canon/`) |
| Instagram audio name | [IG_AUDIO_NAME, set by the Operator in the automation after ideation, e.g. "<character> theme"] |
| Music added by platforms | never (TikTok `autoAddMusic` is fixed to off by the automation) |

## Launch

| Key | Value |
|---|---|
| Launch thresholds (all must be true) | one episode above 1,000,000 views; follower count growing for 48 consecutive hours |
| Quote token | [ask the Operator at launch time / SPCX / TSLA] |
| Contract address on Instagram and YouTube | no |
