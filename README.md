# FREE KIT ♥

> All the free stuff, in one very cute place.

**FREE KIT** is a community-sourced directory of free resources 
for creative directors, designers, and media professionals. 
Built with a pixelated Hello Kitty aesthetic because why not.

🌐 **Live site:** https://free-kit-project.vercel.app/

---

## ✨ What's Inside

70+ free resources across 8 categories:

| Category | What you'll find |
|----------|-----------------|
| 🖼️ Images | Stock photos, illustrations, icons, mockups |
| 🎬 Video | Stock footage, motion graphics, film reference |
| 🎵 Audio | Music, sound effects, ambient audio |
| 🔤 Fonts | Open source, commercial-use, display fonts |
| 🔍 Reference | Film stills, moodboards, design inspiration |
| 🎨 Color | Palette generators, color theory tools |
| 🛠️ Tools | Design, editing, compression, 3D tools |
| 📄 Templates | Presentation, web, and design templates |

All resources are **free** — no paywalls, no credit cards, 
no surprises. Some require attribution, noted in descriptions.

---

## 🎮 Features

**Browse & Filter**
Search by name or description in real time.
Filter by category with one click.

**NEW THIS WEEK ♥**
A horizontal strip at the top showing the latest additions.
Updated every Sunday.

**Surprise Me ✨**
Can't decide? Hit the button and go somewhere random.

**Copy Link**
One click to copy any resource URL.
Confetti included.

**FREE KIT CATCHER ♥ — Mini Game**
Catch falling resource cards to save them to your personal 
list. Cards fall faster as your score climbs.
- Arrow keys or A/D to move
- Catch 5 in a row for x2 score
- Gold cards = +50 points ★
- Top 3 scores saved locally
- Saved resources accessible from MY FREEBS ♥ panel

**Hello Kitty Decorations**
She's everywhere. Sleeping in the corner. Drifting across 
the bottom. Peeking near the search bar with tips.
You're welcome.

---

## 🗂️ Tech Stack

- **React + Vite** — frontend framework
- **Vanilla CSS** — all styling, no UI libraries
- **Press Start 2P + Nunito** — Google Fonts
- **localStorage** — game scores and saved resources
- **Vercel** — deployment
- **GitHub Pages** — source

No backend. No database. No API keys.
Just a JSON file and good vibes.

---

## 📬 Submit a Resource

Found a free resource that should be here?

Click the **"FOUND A FREEBIE? ♥ SUBMIT IT"** button 
on the site — it opens a pre-filled email template.

Or email directly with:
- Resource name
- URL
- Category
- Why it's great

The list is updated **every Sunday**. 
Community submissions are reviewed before adding.

---

## 🛠️ Run Locally

```bash
git clone https://github.com/pranjalsuthar-555/free-kit.git
cd free-kit
npm install
npm run dev
```

Open http://localhost:5173

---

## ➕ Adding Resources

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

Valid categories: `images` `video` `audio` `fonts` 
`reference` `color` `tools` `templates`

Set `isNew: true` for the weekly batch, 
flip back to `false` the following Sunday.

---

## 🗓️ Weekly Update Process

Every Sunday:
1. Set all previous `isNew: true` back to `false`
2. Add new community submissions with `isNew: true`
3. `git add . && git commit -m "♥ weekly update - [date]"`
4. `git push` — Vercel auto-deploys

---

## 🤝 Contributing

This is a community project. Ways to help:

- **Submit resources** via the button on the site
- **Star the repo** so more people find it ★
- **Share it** with your creative director friends
- **Open an issue** if a link is broken or outdated

---

## 👾 Made By

Built by **Pranjal** as a portfolio project.

Designed for creative professionals who are tired of 
Googling the same 10 free resource sites over and over.

*Powered by Hello Kitty energy ♥*

---

## 📄 License

MIT — use it, fork it, build on it.
Just don't charge people for the resources listed. 
They're free. That's the whole point. ♥
