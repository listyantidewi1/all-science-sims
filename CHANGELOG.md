# Changelog

All notable changes to **All-Science Sims** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

> Notes for the next release go here.

---

## [1.5.0] — Interactivity Wave C (10 chart-heavy sims)

### Changed (chart sims gain hover crosshairs and drag handles)

Every sim below now uses `hoverProbe` + `drawCrosshair` for live (x, y) tooltips on the chart. Where a slider mapped naturally to a chart axis, the slider is now **also** a drag-on-the-curve handle.

- **Finance / Compound Interest** — hover the chart to see compound, simple, and contributed values at any year.
- **Finance / Sharpe Ratio** — hover any fund dot for µ, σ, and Sharpe; **drag** any fund dot on the risk-return scatter to change its (σ, µ) directly.
- **Finance / Bond Pricing** — hover the price-vs-yield curve for (yield, price); hover the yield-curve bars for (maturity, price); drag along the price-vs-yield chart to set the market yield.
- **Chemistry / Beer-Lambert** — hover the absorbance spectrum for (λ, A, ε); drag the spectrum to set the working wavelength.
- **Chemistry / Radioactive Decay** — hover the decay chart to compare actual atom count vs theoretical N₀·(½)^(t/T) at any time.
- **Biology / Enzyme Activity** — hover either the T or pH curve for (parameter, activity); drag horizontally on either curve to set T or pH.
- **Physics / Carnot Cycle** — hover the P–V diagram to read isothermal pressures at both T_h and T_c for any volume.
- **Physics / RLC Resonance** — hover the frequency response for (f, I, |Z|); drag horizontally to set the drive frequency.
- **Data Science / Distributions** — hover any bin to see empirical density vs theoretical pdf at that x.
- **Data Science / Central Limit Theorem** — hover either the parent or sample-mean histogram for the bin range and count.

### Notes

- Bundle: main grew ~0.1 KB (still 83 KB gzipped). Almost all upgrades are net code that doesn't ship to other sims; the lib helpers added in 1.4.0 are doing the heavy lifting.
- 17 of 153 sims now use the shared chart helpers — there's substantial room to apply the same pattern across the remaining ~25 chart-shaped sims (npv, capm, phillips-curve, monte-carlo-pi, hardy-weinberg, action-potential, hr-diagram, …) in subsequent waves.

---

## [1.4.0] — Interactivity Wave A + B (shared helpers + featured-sim upgrades)

### Added

- **`src/lib/chart.js`** — `hoverProbe(canvas, getProbe)`, `drawCrosshair(ctx, probe, opts)`, `drawTooltip(ctx, text, x, y, bounds)`. A reusable hover/probe/tooltip primitive: any sim can now wire pointer-following crosshairs and labelled tooltips on its canvas in a few lines.
- **`src/lib/handle.js`** — `dragHandle(canvas, { hitTest, onStart, onDrag, onEnd, ... })`. Pointer-event-based drag layer with proper coordinate mapping, pointer capture, and hover-cursor flips. Touch + mouse work uniformly.

### Changed (featured-sim interactivity upgrades)

- **Chemistry / Titration** — drag the red dot **anywhere along the pH curve** to scrub volume; hover the chart for a (volume, pH) tooltip. Replaces "set titrant added" slider as the primary input.
- **Data Science / Bayes' Theorem** — hover any dot in the 100×100 population grid to see whether it's a true positive / false negative / etc., with running counts; drag inside the grid to set prevalence directly.
- **Social Science / Schelling Segregation** — paint mode: drag the grid to seed your own configuration (red / blue / empty); hover a cell to see its same-neighbor ratio and happy/unhappy state.
- **Earth & Space / Moon Phases** — added synodic-day counter (Day X of 29.53) and an eclipse-alignment badge that lights up when the Moon is within ~6° of new or full.
- **Computer Science / Logic Gates** — "▶ Cycle inputs" button auto-walks every input combination on a timer, highlighting the corresponding row in the truth table as it goes.
- **Biology / DNA Transcription** — scrub slider for the polymerase position, "◀ Step" button to back up, **click any base** in the DNA strand to jump there, and the codon currently being translated is ringed in real time.
- **Physics / Electric Field** — scroll over a charge to change its magnitude (0.5 – 5 in 0.5 steps); charges visually scale with |q| and now show their value (`+2`, `−1.5`, etc.).

### Notes

- Bundle: main grew ~1 KB (still 83 KB gzipped). Shared helpers ship as part of the main bundle so any sim can pull them in without a new chunk.
- These 7 sims now serve as the reference templates for Wave C — the chart-heavy sims in finance / chemistry / data science can apply the same hover-tooltip / drag-handle pattern with minimal code per sim.

---

## [1.3.0] — Discoverability + PWA

### Added

- **Search bar** on the home page (searches the full 153-sim catalog by title, description, topic, or subject — EN and ID terms both match) and on each subject page (filters within that subject). Live results, count indicator, accessible.
- **Favorites**: a star button on every sim card. Starred sims persist in `localStorage` and surface as a "Your favorites" section on the home page (hidden until you star something). Re-rendering reflects toggles immediately.
- **PWA / installable + offline**:
  - Web App Manifest (`manifest.webmanifest`) with name, theme color, standalone display, and icon.
  - Service worker (`sw.js`) with network-first for HTML (so deploys land) and cache-first for hashed assets (instant offline once visited). Old caches are evicted on each new version.
  - "Install app" button appears in the header when the browser fires `beforeinstallprompt` (Android Chrome/Edge, desktop Chrome/Edge). On iOS, "Add to Home Screen" works via Safari's share sheet thanks to the manifest + apple-touch-icon link.
- **i18n strings** for search placeholders, favorites section, and install button (EN + ID).

### Changed

- `src/lib/store.js` now exports `getFavorites`, `isFavorite`, `toggleFavorite`, `onFavoritesChange` alongside the existing `get`/`set`.
- Sim cards gained a star button overlay; the existing card layout, hover, and accent color are preserved.

### Notes

- The service worker is **only registered in production builds** (`import.meta.env.PROD`); dev keeps Vite HMR clean.
- Bundle: main grew ~5 KB (gzipped 81 → 83 KB) for search + favorites + PWA glue. Sim chunks are unchanged and remain lazy-loaded.

---

## [1.2.0] — Big Wave (153 sims, 27 added)

### Added

- **Physics (3)**: Snell's Law (refraction with TIR) · Magnetic Field around a Wire · Photoelectric Effect
- **Chemistry (3)**: Buffer pH (Henderson-Hasselbalch) · Crystal Lattices (SC, BCC, FCC, HCP — rotatable 3D) · Hybridization (sp / sp² / sp³)
- **Biology (3)**: Cellular Respiration (glycolysis → Krebs → ETC, full ATP budget) · Epidemic on a Network (compare to well-mixed SIR) · Population Pyramid (with demographic-transition presets)
- **Earth & Space (3)**: Stellar Parallax · Earth's Interior (drag depth probe) · Hurricane Formation (SST + Coriolis + shear)
- **Computer Science (3)**: Stack vs Queue · Recursive Fibonacci with Memoization (call-tree visualizer) · RSA Public-Key Crypto (toy primes)
- **Data Science (3)**: Bootstrap Resampling (95% CI from percentiles) · Decision Tree Classifier · Time Series Smoothing (MA vs EMA)
- **Social Science (3)**: Yard-Sale Wealth Model · Trust Game · Threshold Diffusion on a Network
- **Mathematics (3)**: Galton Board (binomial → Gaussian) · Matrix Multiplication (click-to-explain) · Mandelbrot Set (click to zoom)
- **Finance & Economics (3)**: Yield Curve Shapes (drag rates by tenor) · Sharpe Ratio (rank funds with adjustable rᶠ) · Tax-Advantaged Accounts (taxable vs Trad vs Roth)

---

## [1.1.0] — Round-out wave (126 sims, 9 subjects)

### Added

- **Mathematics (5)**: Pythagorean Theorem · Unit Circle Trigonometry · Conic Sections · Archimedes' π from Polygons · Triangle Centers (with Euler line)
- **Finance & Economics (5)**: Bond Pricing & Yield Curve · NPV / Discounted Cash Flow · Phillips Curve · CAPM & Beta · First-price vs Second-price Auction Mechanics
- **Physics (2)**: 1D Collisions · Carnot Heat Engine
- **Chemistry (1)**: Galvanic Cell (Battery)
- **Biology (1)**: DNA Replication (replication fork with Okazaki fragments)
- **Earth & Space (1)**: Hohmann Transfer Orbit
- **Computer Science (2)**: Hash Tables & Collisions · Big-O Comparison
- **Data Science (1)**: Principal Component Analysis (PCA)
- **Social Science (1)**: Median Voter Theorem

Mathematics and Finance & Economics now both have 13 sims, matching the other subjects.

---

## [1.0.0] — Two new subjects: Mathematics + Finance & Economics (107 sims)

### Added

- **Mathematics** subject (📐, sky-blue accent) with 8 sims:
  Function Plotter · Derivative as Tangent Slope · Riemann Sums · Fourier Series Builder · Vectors & Operations · Complex Plane Mappings · Linear Transformations · Newton's Method for Roots
- **Finance & Economics** subject (💰, yellow accent) with 8 sims:
  Compound Interest · Loan Amortization · Stock Random Walk (GBM) · Portfolio Efficient Frontier · Inflation Eraser · Progressive Tax Brackets · DCA vs Lump Sum · Black-Scholes Option Pricing

### Changed

- Subject grid on home page now shows 9 cards instead of 7.
- `tokens.css` gains `--subj-mathematics` and `--subj-finance` color variables.

---

## [0.9.0] — Round 6: 21 more sims (91 total, 13 per subject)

### Added

- **Physics (3)**: Buoyancy & Archimedes · Orbital Mechanics (drag-to-launch Kepler) · RLC Circuit Resonance
- **Chemistry (3)**: Collision Theory & Reaction Rates · Radioactive Decay & Half-Life · Aufbau Principle (orbital filling)
- **Biology (3)**: Photosynthesis Rate · ECG / Heart Rhythm · Mitosis Stages
- **Earth & Space (3)**: Hydrologic Cycle · Atmospheric Layers · Black Hole Gravitational Lens
- **Computer Science (3)**: Reaction-Diffusion (Gray-Scott) · Maze Generation (DFS / Prim's / Wilson's) · Genetic Algorithm
- **Data Science (3)**: Gradient Descent · Bias-Variance Tradeoff · Markov Chain Text Generator
- **Social Science (3)**: Stag Hunt · Ultimatum Game · Bass Diffusion of Innovation

---

## [0.8.0] — Featured sims curated

### Changed

- Home page **Featured simulations** trimmed from "all 70 sims" to one curated pick per subject (7 cards), to avoid an endless scroll. Subject grid above is the canonical entry point.
- Added `home.featuredHint` translation key in EN and ID.

---

## [0.7.0] — Round 5: 21 "rare" sims (70 total)

### Added

Sims deliberately picked for being uncommon in educational collections — chaos, classic CS toys, mind-bending statistics.

- **Physics (3)**: Double Pendulum (chaos with ghost) · Doppler Effect (with Mach cone) · Diffraction & Interference (single/multi-slit)
- **Chemistry (3)**: VSEPR Molecular Geometry (rotatable 3D) · Phase Diagram of Water · Beer-Lambert Spectroscopy
- **Biology (3)**: Hardy-Weinberg Equilibrium · Neuron Action Potential (FitzHugh-Nagumo) · Mendelian Pedigree Analyzer
- **Earth & Space (3)**: Coriolis Effect (rotating vs inertial frames) · Hertzsprung-Russell Diagram · Mantle Convection (live PDE)
- **Computer Science (3)**: Turing Machine · Boids (flocking) · Elementary Cellular Automata (Wolfram rules)
- **Data Science (3)**: Anscombe's Quartet · Monte Carlo Pi · Simpson's Paradox
- **Social Science (3)**: Preferential Attachment Networks · Public Goods Game · Hawks vs Doves

---

## [0.6.0] — Round 4: 21 more sims (49 total)

### Added

- **Physics (3)**: Newton's Cradle · Lenses & Refraction (drag-the-object) · Springs & Simple Harmonic Motion
- **Chemistry (3)**: Bohr Atom Model · Le Chatelier's Principle · Solubility & Saturation
- **Biology (3)**: Predator-Prey Ecosystem (agent-based) · Enzyme Activity (T, pH curves) · Osmosis & Membrane Transport
- **Earth & Space (3)**: Greenhouse Effect · Eclipse Geometry · Tides (with spring vs neap)
- **Computer Science (3)**: Conway's Game of Life · Fractals (Sierpinski / Koch / fractal tree / Cantor) · Caesar Cipher
- **Data Science (3)**: Bayes' Theorem · Confusion Matrix & ROC · Outlier Effects
- **Social Science (3)**: SIR Epidemic Model · Voting Methods · Inequality & Lorenz Curve

---

## [0.5.0] — README, screenshots, scope broadening

### Added

- New `README.md` with full catalog, quick-start, deploy instructions for GitHub Pages / Netlify / Vercel, project structure, sim-authoring guide, i18n guide.
- Embedded screenshots (`screenshots/1.png` … `8.png`) into the README — home page, featured grid, two subject pages, and four sample sim pages.

### Changed

- Removed all "high school" / "SMA" references from the site copy. The project's audience is now described as "students, teachers, self-learners, tutors, and anyone curious about science."
- `index.html` meta description, `package.json` description, and EN/ID i18n strings updated accordingly.
- Fixed favicon path in `index.html` (was pointing under `/public/`).

---

## [0.4.0] — Round 3: 7 highly-interactive sims + drag upgrades (28 total)

### Added

- **Physics**: Electric Field & Charges (drag charges, field lines / vector grid / potential heatmap)
- **Chemistry**: Acid-Base Titration (drip burette, live pH curve)
- **Biology**: DNA Transcription & Translation (type any DNA, ribosome walks it codon-by-codon)
- **Earth & Space**: Moon Phases (drag the Moon)
- **Computer Science**: Logic Gates & Circuits (toggleable inputs, half-adder / full-adder presets, live truth table)
- **Data Science**: Central Limit Theorem (sample-mean histogram converges to a Gaussian)
- **Social Science**: Schelling's Segregation (50×50 agent grid)

### Changed

- **Direct manipulation upgrades** to four existing sims:
  - Projectile Motion: click anywhere on the field to aim the launcher
  - Pendulum: grab and drag the bob to set initial angle
  - Linear Regression: drag any point; right-click to remove
  - K-Means: drag points and centroids; right-click to remove

---

## [0.3.0] — Round 2: 14 more sims (21 total)

### Added

- **Physics (2)**: Simple Pendulum (drag the bob) · Waves on a String
- **Chemistry (2)**: Periodic Table Explorer (118 elements, color by category / state / period) · Ideal Gas Law (kinetic particles)
- **Biology (2)**: Cell Explorer (animal/plant SVG) · Natural Selection (color camouflage)
- **Earth & Space (2)**: Seasons & Axial Tilt · Plate Tectonics
- **Computer Science (2)**: Binary Search Tree (insert/search/delete) · Pathfinding (BFS vs A*)
- **Data Science (2)**: Distribution Explorer · K-Means Clustering
- **Social Science (2)**: Population Dynamics (Lotka–Volterra) · Prisoner's Dilemma (6 strategies, iterated, with noise)

---

## [0.2.0] — Initial wave: 7 sims, one per subject

### Added

- **Physics**: Projectile Motion
- **Chemistry**: pH Indicator Lab
- **Biology**: Punnett Square (mono- and dihybrid)
- **Earth & Space**: Solar System Orrery
- **Computer Science**: Sorting Visualizer (5 algorithms)
- **Data Science**: Linear Regression Playground
- **Social Science**: Supply & Demand

---

## [0.1.0] — Project scaffold

### Added

- Vite + vanilla-JS scaffold with `base: './'` for host-agnostic deploys.
- Bilingual (English / Bahasa Indonesia) i18n with `localStorage`-persisted locale and per-sim bilingual manifest fields.
- Hash-based router (`#/`, `#/<subject>`, `#/<subject>/<simId>`, `#/about`) supporting GitHub Pages without rewrites.
- Subject system with seven hand-themed accent colors (Physics, Chemistry, Biology, Earth & Space, Computer Science, Data Science, Social Science).
- Shared `lib/` for sims: DPR-aware canvas + animation loop, slider/toggle/button/select control builders, vector and color helpers, localStorage helpers.
- `sim-shell` component that wraps every sim with intro / objectives / "try this" content from its manifest.
- Sim contract: each sim is a folder with `manifest.js` (cheap, eager-loaded) and `sim.js` (lazy `import()` on navigation).
- Catalog registry: every sim is one import away from showing up in the home grid, subject pages, and search.
- Dark-mode-aware tokens, mobile-responsive grids, `prefers-reduced-motion` respect.

---

[Unreleased]: https://github.com/listyantidewi1/all-science-sims/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v1.2.0
[1.1.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v1.1.0
[1.0.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v1.0.0
[0.9.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v0.9.0
[0.8.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v0.8.0
[0.7.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v0.7.0
[0.6.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v0.6.0
[0.5.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v0.5.0
[0.4.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v0.4.0
[0.3.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v0.3.0
[0.2.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v0.2.0
[0.1.0]: https://github.com/listyantidewi1/all-science-sims/releases/tag/v0.1.0
