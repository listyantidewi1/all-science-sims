# All-Science Sims

> One stop for interactive science simulations and virtual labs.
> 28 hand-built sims across 7 subjects · runs entirely in your browser · bilingual (English / Bahasa Indonesia) · free and open source.

A client-side hub of original interactive simulations covering **physics, chemistry, biology, earth & space, computer science, data science, and social science**. No backend, no tracking, no install — just open the page and start clicking, dragging, and learning. Useful for students, teachers, self-learners, tutors, and anyone curious about science.

---

## Features

- **28 original simulations** across 7 subjects (4 per subject) — see [Catalog](#catalog) below.
- **Direct manipulation everywhere** — drag charges, drag the pendulum bob, drag data points, draw walls in the maze, click switches in a logic circuit, and so on.
- **Bilingual UI**: every sim has English and Bahasa Indonesia text. Toggle in the header; preference is saved to `localStorage`.
- **Fully client-side** — no servers, no APIs, no analytics. Loads fast, works offline once cached, runs from `file://` if you want.
- **Lazy-loaded sims** — the home page is ~20 KB gzipped; each sim downloads only when opened.
- **Hash-based routing** — the same `dist/` folder works on GitHub Pages, Netlify, Vercel, S3, your own server, or a USB stick.
- **Responsive + dark-mode aware** — adapts to your OS theme via `prefers-color-scheme`.
- **Reduced-motion respect** — non-essential animations slow down for `prefers-reduced-motion: reduce`.

---

## Catalog

### Physics

| Sim | What you do |
|---|---|
| Projectile Motion | Click anywhere on the field to aim the launcher. Adjust angle, speed, gravity, and air drag; compare ranges with ghost trails. |
| Simple Pendulum | Grab and drag the bob to set the initial angle. Compare measured period vs. small-angle prediction. |
| Waves on a String | Drive a string at one end, choose fixed/free far end, find resonant frequencies. |
| Electric Field & Charges | Drop, drag, and right-click charges. Toggle field lines, vector grid, or potential heatmap. |

### Chemistry

| Sim | What you do |
|---|---|
| pH Indicator Lab | Pick an indicator and a pH preset (lemon juice, vinegar, soap…) and see the beaker color flip. |
| Periodic Table Explorer | Hover any of the 118 elements; color the table by category, state at 25 °C, or period. |
| Ideal Gas Law | Tune n, T, and V; watch particles bounce while pressure (collision rate) responds as PV = nRT predicts. |
| Acid-Base Titration | Drip NaOH into strong or weak acid; the pH curve traces out and the indicator color changes in real time. |

### Biology

| Sim | What you do |
|---|---|
| Punnett Square | Cross monohybrid (Aa × Aa) and dihybrid (AaBb × AaBb) parents; ratios fill in automatically. |
| Cell Explorer | Click any organelle in an animal or plant cell to see what it does. |
| Natural Selection | Color-camouflaged prey reproduce on a colored background; the population shifts toward camouflaging hues. |
| DNA Transcription & Translation | Type any DNA, watch RNA polymerase + ribosome walk it base-by-base into a polypeptide. |

### Earth & Space

| Sim | What you do |
|---|---|
| Solar System Orrery | Watch the eight planets orbit at speeds proportional to real periods. |
| Seasons & Axial Tilt | Move Earth around its orbit; read day length at any latitude on any date. |
| Plate Tectonics | Pick convergent / divergent / transform; the cross-section animates with earthquakes. |
| Moon Phases | Drag the Moon around Earth; top-down and from-Earth views update together. |

### Computer Science

| Sim | What you do |
|---|---|
| Sorting Visualizer | Race bubble, insertion, selection, merge, quicksort on the same array. |
| Binary Search Tree | Insert / search / delete; compare sorted vs. balanced insertion shapes. |
| Pathfinding | Drag walls, start, and goal; race BFS against A*. |
| Logic Gates & Circuits | Toggle inputs, swap gate types, build half-adders and full-adders; truth table fills in alongside. |

### Data Science

| Sim | What you do |
|---|---|
| Linear Regression Playground | Drag points, drag your best-guess line, compare your error against the least-squares optimum. |
| Distribution Explorer | Sample from normal / uniform / exponential / binomial; histogram converges on the PDF. |
| K-Means Clustering | Drag points and centroids; step or run-to-convergence. |
| Central Limit Theorem | Pick a wild parent (bimodal, exponential…); sample-mean histogram smooths into a Gaussian. |

### Social Science

| Sim | What you do |
|---|---|
| Supply & Demand | Shift curves, set price ceilings or floors, watch shortages and surpluses form. |
| Prisoner's Dilemma | Pit Always Cooperate, Always Defect, Tit-for-Tat, Grim, Pavlov, Random against each other over hundreds of rounds. |
| Population Dynamics | Lotka–Volterra predator-prey, with both time-series and phase-plot views. |
| Schelling's Segregation | 50×50 agent grid; even mild same-neighbor preferences produce strong segregation. |

---

## Quick start (run locally)

You'll need [Node.js](https://nodejs.org/) 18 or newer.

```bash
git clone https://github.com/listyantidewi1/all-science-sims.git
cd all-science-sims
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173`). Open it in any modern browser.

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload. |
| `npm run build` | Produce a static, deployable bundle in `dist/`. |
| `npm run preview` | Preview the production build locally before deploying. |

---

## Deploying

The build is host-agnostic — `vite.config.js` uses `base: './'` so all asset paths are relative. Drop `dist/` on any static host.

### GitHub Pages

```bash
npm run build
# Push the dist/ folder to a gh-pages branch (e.g. with the gh-pages npm package),
# or copy dist/ into a /docs folder on main and enable Pages → main /docs.
```

The hash-based routing (`#/physics/projectile-motion`) means GitHub Pages needs no rewrite rules.

### Netlify / Vercel

Connect the repo, set:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

Done — every push to `main` redeploys.

### Self-hosting

After `npm run build`, `dist/` contains a static site. Serve it with any web server (`nginx`, `caddy`, `python -m http.server`, `npx serve dist`). No special config needed.

---

## How to use a sim

Every sim page has the same layout:

- **Stage** (left/top): the interactive canvas or SVG, plus its controls panel underneath.
- **Aside** (right/bottom): a short description, learning objectives, and "try this" prompts.
- **Header**: site nav, language toggle (EN ↔ ID).

Most sims accept several kinds of input:

- **Sliders** for continuous parameters (speed, temperature, k, slope, etc.).
- **Dropdowns** for discrete choices (algorithm, indicator, distribution).
- **Buttons** for actions (Launch, Reset, Run, Step).
- **Direct manipulation on the canvas** — drag handles, click switches, draw walls. Look for `crosshair` / `grab` cursor changes to discover what's interactive. Right-click typically removes the nearest item.

The "Try this" prompts in the sidebar are good starting points if you're not sure what to explore.

---

## Project structure

```
all-science-sims/
├── index.html                     # SPA entry
├── package.json
├── vite.config.js                 # base: './' (host-agnostic)
├── public/
│   └── favicon.svg
└── src/
    ├── main.js                    # bootstrap: header, router, footer
    ├── router.js                  # hash router → page renderers
    ├── i18n/                      # translations
    │   ├── index.js               # t(key), tr(field), getLocale, setLocale
    │   ├── en.json
    │   └── id.json
    ├── styles/
    │   ├── tokens.css             # CSS variables (colors, spacing, type)
    │   ├── base.css               # reset, body, typography
    │   └── layout.css             # header, grid, cards, sim shell
    ├── lib/                       # shared helpers used by every sim
    │   ├── canvas.js              # createCanvas (DPR-aware), animation loop
    │   ├── controls.js            # slider, toggle, button, select
    │   ├── vec2.js, color.js, store.js
    ├── components/                # header, footer, sim-card, sim-shell
    ├── pages/                     # home, subject, sim, about
    ├── catalog/
    │   ├── subjects.js            # subject metadata
    │   └── index.js               # imports all sim manifests
    └── sims/
        ├── physics/<sim-id>/{manifest.js, sim.js}
        ├── chemistry/<sim-id>/...
        ├── biology/<sim-id>/...
        ├── earth-space/<sim-id>/...
        ├── computer-science/<sim-id>/...
        ├── data-science/<sim-id>/...
        └── social-science/<sim-id>/...
```

---

## Adding a new sim

Each sim is a folder with two files. The catalog imports the **manifest eagerly** (cheap), and the **sim code is lazy-loaded** when the user navigates to it.

### 1. Create the folder

```
src/sims/<subject>/<my-sim-id>/
├── manifest.js
└── sim.js
```

`<subject>` must be one of: `physics`, `chemistry`, `biology`, `earth-space`, `computer-science`, `data-science`, `social-science`.

### 2. Write the manifest

```js
// src/sims/physics/my-sim/manifest.js
export default {
  id: 'my-sim',
  subject: 'physics',
  title:       { en: 'My Simulation',  id: 'Simulasi Saya' },
  description: { en: 'One paragraph…',  id: 'Satu paragraf…' },
  objectives:  { en: ['…','…'],         id: ['…','…'] },
  tryThis:     { en: ['…','…'],         id: ['…','…'] },
  topics: ['kinematics'],
  grade: [10, 11],
  load: () => import('./sim.js'),  // lazy
};
```

### 3. Write the sim

```js
// src/sims/physics/my-sim/sim.js
import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  // … build state, draw, mouse handlers, controls …

  const animator = loop((dt) => { /* step + draw */ });
  animator.start();

  // Return a cleanup function — called on navigation away.
  return () => { animator.stop(); cv.destroy(); };
}
```

### 4. Register it in the catalog

In [src/catalog/index.js](src/catalog/index.js), import the manifest and add it to the `SIMS` array.

```js
import mySim from '../sims/physics/my-sim/manifest.js';

export const SIMS = [
  // …existing sims…
  mySim,
];
```

That's it — `npm run dev` will hot-reload and the sim shows up on the Physics subject page.

### Conventions worth following

- **DPR-aware canvas**: always use `createCanvas(parent, { aspect })` from [src/lib/canvas.js](src/lib/canvas.js). It handles devicePixelRatio and resize automatically.
- **Animation loop**: use `loop((dt, t) => { ... })` from the same module. `dt` is in seconds and clamped to 0.05 to survive tab-switches.
- **Controls**: prefer the helpers in [src/lib/controls.js](src/lib/controls.js) (`slider`, `toggle`, `button`, `select`, `row`) so styling matches.
- **Bilingual content lives in the manifest**, not in the sim code. The shell renders `description` / `objectives` / `tryThis` automatically. If the sim itself needs translated strings, add them to [src/i18n/en.json](src/i18n/en.json) and [src/i18n/id.json](src/i18n/id.json) and read with `t('key')`.
- **Cleanup**: the function you return from `mount` is called when the user navigates away. Stop animation loops, remove window-level event listeners.
- **No external assets**: keep sims self-contained — no images, no fonts, no API calls. Everything is drawn in code.

---

## Internationalization

Two locales ship: `en` (English) and `id` (Bahasa Indonesia). The user can switch any time via the header toggle; the choice persists in `localStorage`.

- **UI strings** live in [src/i18n/en.json](src/i18n/en.json) and [src/i18n/id.json](src/i18n/id.json) and are looked up with `t(key)`.
- **Per-sim strings** (titles, descriptions, etc.) are bilingual objects on the manifest — `{ en: '…', id: '…' }`. Use `tr(field)` to resolve in the current locale.

To add another language:

1. Create `src/i18n/<code>.json` with the same keys as `en.json`.
2. Add the code to the `SUPPORTED` array in [src/i18n/index.js](src/i18n/index.js).
3. Add a button to the language toggle in [src/components/header.js](src/components/header.js).
4. Add an `<code>` field on every sim manifest's bilingual fields.

---

## Tech stack

- **[Vite](https://vitejs.dev/)** — dev server, HMR, build.
- **Vanilla JavaScript** (ES modules) — no UI framework.
- **HTML5 Canvas** for animated sims, **inline SVG** for diagram-style sims, **CSS Grid/Flex** for layout.
- **CSS custom properties** for theming (colors, spacing, type scale, per-subject accents, dark mode).

No framework, no build-time CSS preprocessor, no runtime dependencies. The whole thing is ~50 KB of JS gzipped on the home page, with each sim adding 2–10 KB on demand.

---

## Browser support

Tested in modern Chromium, Firefox, and Safari (desktop and mobile). Requires:

- ES2020 (`??`, `?.`, optional chaining)
- `ResizeObserver`
- `Float32Array`, `Uint8Array`
- CSS `aspect-ratio`, `color-mix`, `backdrop-filter`

Roughly: anything from 2021 onward should work.

---

## Performance notes

- Sim code is split into per-sim chunks via `import()` in each manifest's `load()` — the home page only ships the catalog index and shared libs.
- Canvas is set up once per sim and resized via `ResizeObserver`, avoiding layout thrash.
- Animation loops respect `prefers-reduced-motion: reduce` (`reduceMotion` flag is exposed on the loop object).
- No third-party fonts, no analytics, no service worker (yet) — first paint is instant on cached visits.

---

## Roadmap / ideas

Open to PRs in any of these directions:

- More sims — there's room for plenty more in every subject.
- More languages — the i18n system is ready; just add a JSON.
- **Touch/pointer events** on every drag handle (most already work, but a few use mouse events only — mobile testing would help).
- **Keyboard support** for sliders and drag handles (left/right to nudge).
- **Worksheet mode** — printable lab handouts auto-generated from the manifest.
- **Sim presets / scenario URLs** — share a parameter set as a deep link.
- **Audio cues** for waves, oscillations, sorting comparisons.
- **PWA / offline cache** so the site keeps working without a connection after first visit.
- **Smoke tests** with Playwright on at least one sim per subject.

---

## License

Released under the MIT License. See [LICENSE](LICENSE) (you may want to add a `LICENSE` file with the standard MIT text).

If you build on this for your classroom, blog, or product, no attribution is required — but a star or a "made with All-Science Sims" link is appreciated.

---

## Acknowledgements

Built with curiosity and a lot of `requestAnimationFrame`. The sim physics, chemistry, and biology models are simplifications chosen for clarity and snappiness — they prioritize getting the right intuition over numerical precision. If you spot a model that's flat-out wrong (not just approximate), please open an issue.
