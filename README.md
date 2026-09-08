# CV Maker — Free & Open-Source ATS-Friendly Resume Builder

Build a clean, single-column, ATS-parseable resume in minutes — entirely in your browser. No sign-up, no server, no data collection. Your resume is autosaved locally and never leaves your device.

## Features

- Live side-by-side form and resume preview (stacked on mobile)
- Sections: Contact Info, Summary, Work Experience, Projects, Volunteer Experience, Education, Skills, Languages, Certifications, Awards & Honors
- Custom sections for publications, memberships, interests, conferences, or any field-specific content
- Add / remove / reorder entries with a click (↑ / ↓ buttons)
- Autosave to your browser's localStorage — a refresh never loses your work
- **Download PDF** — opens your browser's print dialog with a print-optimized stylesheet (choose "Save as PDF" as the destination)
- **Copy as Plain Text** and **Download .txt** — for pasting straight into ATS web forms
- **Clear all / Start over** with a confirmation prompt
- Live **ATS readiness checklist** that flags common issues as you type

## Why it's ATS-friendly

Applicant Tracking Systems (ATS) parse resumes best when they are structurally simple. This project enforces that by design:

- **Single column** — no tables, grids, or text boxes for layout
- **Standard fonts only** — Arial / system sans-serif in the resume output
- **No images, icons, graphics, or headshots** in the resume
- **Standard section headers** — Summary, Work Experience, Education, Skills, Certifications
- **Plain • bullets** for achievements, not custom icons
- **Reverse-chronological** entries (reorder anytime with the ↑ / ↓ buttons)
- **Plain-text export** so you can paste a clean version into any online application form

## Getting started (local development)

Prerequisites: [Node.js](https://nodejs.org) 18+ and npm.

```bash
git clone <your-fork-url>
cd cvMaker
npm install
npm run dev
```

Open http://localhost:5173 and start building your resume.

## Building for production

```bash
npm run build    # outputs a static site to dist/
npm run preview  # serves the production build locally for a final check
```

## Deploying for free

The app is a single static site — any static host works.

### Vercel

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com](https://vercel.com) → "Add New Project" → import the repo.
3. Vite is auto-detected; click Deploy. (Or from the CLI: `npx vercel`.)

### Netlify

1. Push the repo to GitHub.
2. [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import an existing project".
3. Build command: `npm run build` — Publish directory: `dist`.

### GitHub Pages

1. Run `npm run build`.
2. Publish the `dist/` folder with your preferred method (e.g. the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package or a GitHub Actions workflow).

## Privacy

Everything runs client-side. Your resume data is stored only in your browser's localStorage. "Clear All" deletes it permanently. Nothing is ever sent anywhere.

## Contributing

Contributions are welcome — this project exists for the community!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Guidelines:

- Keep the app 100% client-side — no backend, no accounts, no tracking
- Keep the resume template strictly ATS-safe: single column, standard fonts, standard headers, no images
- Run `npm run build` and make sure it passes with zero errors before opening a PR
- Bug reports and feature suggestions via [Issues](../../issues) are greatly appreciated too

## License

[MIT](LICENSE) — free to use, modify, and distribute.
