# Classrun Landing Page

Marketing website for **Classrun**, the class management system by **Pockraft Studio**. The site introduces the product, shows feature previews based on the Classrun app, answers common questions, and provides a product inquiry form.

## Stack

- React 19 with TypeScript
- Vite 7
- Lucide React icons
- Plain CSS

## Requirements

- Node.js and npm versions supported by the installed Vite 7 release

## Local development

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Run the TypeScript compiler checks, then create the production bundle in `dist/`. |
| `npm run preview` | Serve the production bundle locally for review. Run `npm run build` first. |

## Pages

- `/` — Hero, how Classrun works, and product inquiry form.
- `/features` — Four feature areas with selectable app screen previews and Brief/Detail descriptions.
- `/faq` — Frequently asked questions and product inquiry form.
- `/demo` — Classrun product demo video and product inquiry form.
- `/product-tour` — Alias for the demo page.

The header and footer are shared across pages. Feature previews use representative interface content modeled on the existing Classrun application. The landing page does not import or modify that application.

## Project layout

```text
.
├── index.html                 # HTML entry, metadata, and font loading
├── public/                    # Static images and demo video
│   ├── classrun-demo.mp4
│   ├── classrun-teacher-hero.png
│   └── programo-logo.png
├── src/
│   ├── App.tsx                # Page content, shared layout, and route selection
│   ├── main.tsx               # React application entry
│   └── style.css              # Site and responsive styles
├── package.json
└── tsconfig.json
```

## Product inquiries

The inquiry form uses a `mailto:` action addressed to `team.pockraft@gmail.com`. Submitting it opens the visitor’s configured email application; this project does not store submissions or send them through a server. The page also links to Pockraft Studio on Telegram at `@pockraft_studio` and the contact number `+95 978 570 0473`.

## Production deployment

Build the static site with:

```bash
npm run build
```

Deploy the generated `dist/` directory to a static hosting provider. Configure the host to serve `index.html` as the fallback for application paths such as `/features`, `/faq`, and `/demo`; this keeps direct visits and refreshes on those routes working. No server-side runtime or build-time environment variables are currently required.

To review the production output locally:

```bash
npm run preview
```

## Operational notes

- The product demo video is served from `public/classrun-demo.mp4`; keep the filename or update its reference in `src/App.tsx` when replacing it.
- Google Fonts are loaded from Google Fonts in `index.html`. The site falls back to local sans-serif fonts if the font service is unavailable.
- Contact details and social links are defined in `src/App.tsx`.
