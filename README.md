# Free Kit ♥

**All the free stuff, in one very cute place.**

70+ free design resources (stock photos, fonts, tools, templates, colour palettes, references) organized in one searchable directory. Community-sourced, updated weekly, wrapped in pixelated Hello Kitty energy and a mini arcade game.

🌐 **Live:** [free-kit-project.vercel.app](https://free-kit-project.vercel.app/)  
💎 **Built for:** creative directors, designers, and media professionals tired of hunting the same 10 free resource sites over and over

---

## Why this exists

Every creative professional has a spreadsheet of free resources. Everyone's is different. Everyone's gets outdated. Everyone wastes time re-Googling "free stock photos" because they forgot where they saved that one good site.

**Free Kit** is what should already exist: one place, all of them, organized clearly, regularly updated, and wrapped in genuine care (Hello Kitty energy included).

---

## What's inside

**70+ resources** across 8 categories:

| Category | What you'll find |
|----------|-----------------|
| 🖼️ **Images** | Stock photos, illustrations, icons, mockups |
| 🎬 **Video** | Stock footage, motion graphics, film references |
| 🎵 **Audio** | Music, sound effects, ambient audio |
| 🔤 **Fonts** | Open source, commercial-use, display fonts |
| 🔍 **Reference** | Film stills, moodboards, design inspiration |
| 🎨 **Color** | Palette generators, color theory tools |
| 🛠️ **Tools** | Design, editing, compression, 3D tools |
| 📄 **Templates** | Presentation, web, and design templates |

All resources are **genuinely free** — no paywalls, no credit card walls, no surprises. Some require attribution (noted in descriptions).

---

## Features

**Browse & filter**
- Search any resource by name or description in real time
- Filter by category with one click
- No friction between "need" and "found"

**NEW THIS WEEK**
- Horizontal strip at the top showing the latest additions
- Updated every Sunday
- Stay ahead of the resource curve

**Surprise Me ✨**
- Can't decide? Hit the button and get sent somewhere random
- Serendipity engine for when you don't know what you need

**Copy link**
- One click to copy any resource URL
- Confetti included (because joy matters)

**Free Kit Catcher ♥ — Mini Game**
- Catch falling resource cards to save them to your personal list
- Arrow keys or A/D to move
- Catch 5 in a row for 2x score multiplier
- Gold cards = +50 points ★
- Top 3 scores saved locally
- Saved resources accessible from MY FREEBS ♥ panel
- Mechanic teaches you: exploration beats scrolling

**Hello Kitty Decorations**
- She's everywhere. Sleeping in the corner. Drifting across the bottom. Peeking near the search bar with tips.
- Reminder: design can be functional *and* genuinely joyful.

---

## Tech stack

- **React + Vite** — fast frontend framework
- **Vanilla CSS** — all styling, no UI libraries (Press Start 2P + Nunito from Google Fonts)
- **localStorage** — game scores and saved resources stored client-side
- **Vercel** — deployment
- **JSON data** — no backend, no database, no API keys

Just a data structure and good vibes.

---

## How to contribute

**Found a free resource that should be here?**

Click the **"FOUND A FREEBIE? ♥ SUBMIT IT"** button on the site — it opens a pre-filled email template. Or email directly with:
- Resource name
- URL
- Category
- Why it's great

The list is updated **every Sunday**. Community submissions are reviewed before adding (spam filter + quality control).

---

## How to run locally

```bash
git clone https://github.com/pranjalsuthar-555/free-kit.git
cd free-kit

npm install
npm run dev
# → http://localhost:5173

npm run build
npm run preview
```

Open http://localhost:5173

---

## Adding resources

All resources live in `src/data/resources.json`.

Each entry follows this structure:

```json
{
  "id": "unique-slug",
  "name": "Resource Name",
  "description": "One line description",
  "url": "https://example.com",
  "category": "images",
  "tags": ["free", "no-attribution"],
  "isNew": true,
  "isCommunityPick": false,
  "addedDate": "2026-05-17"
}
```

**Valid categories:** `images` `video` `audio` `fonts` `reference` `color` `tools` `templates`

Set `isNew: true` for the weekly batch. Flip back to `false` the following Sunday.

---

## Weekly update process

Every Sunday:
1. Set all previous `isNew: true` back to `false`
2. Add new community submissions with `isNew: true`
3. `git add . && git commit -m "♥ weekly update - [date]"`
4. `git push` — Vercel auto-deploys

---

## What you can learn from this

✓ Building playful interfaces that work  
✓ Game mechanics in web design (the Catcher game)  
✓ Client-side persistence with localStorage  
✓ Large JSON dataset management without a backend  
✓ Real-time search + filtering  
✓ Community contribution workflows  
✓ Constraint-based design (retro aesthetics as feature, not limitation)

---

## Contributing

This is a community project. Ways to help:

- **Submit resources** via the button on the site
- **Star the repo** so more people find it ★
- **Share it** with your creative director friends
- **Open an issue** if a link is broken or outdated
- **Ideas** for new categories or features

---

## About

Built by **Pranjal Suthar** as a portfolio project solving a real problem I had ten times a week.

Designed for creative professionals who are tired of Googling the same 10 free resource sites over and over. Built because the version that should already exist didn't.

→ [GitHub](https://github.com/pranjalsuthar-555) · [LinkedIn](https://www.linkedin.com/in/sutharpranjal) · [Email](mailto:pranjalsuthar.work@gmail.com)

---

## License

MIT — use it, fork it, build on it.  
Just don't charge people for the resources listed. They're free. That's the whole point. ♥
