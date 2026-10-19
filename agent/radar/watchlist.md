# Radar watchlist

What the radar watches. The Showrunner keeps it up to date through `repo_write`; the automation reads only the JSON block below.

Limits (anything beyond is ignored by the automation): at most 8 entries per list, entries without `#` or `@`, plain words, digits and spaces only. No private individuals, no minors, no accounts that asked not to be followed. Prefer hashtags and search terms over accounts.

Until ideation is done the lists hold generic seeds about AI characters and short absurd formats. After ideation, replace them with terms that fit the character's niche, and say why in the commit message.

```json
{
  "x": {
    "accounts": [],
    "keywords": ["ai character", "ai mascot", "ai generated video"]
  },
  "tiktok": {
    "hashtags": ["aicharacter", "aivideo", "absurdhumor"],
    "searchQueries": ["ai character", "ai mascot"],
    "profiles": []
  },
  "instagram": {
    "hashtags": ["aicharacter", "aivideo", "absurdhumor"]
  },
  "youtube": {
    "searchQueries": ["ai character shorts", "ai mascot shorts"]
  }
}
```
