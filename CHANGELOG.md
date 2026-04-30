# Changelog

All notable changes to **All-Science Sims** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

> Notes for the next release go here.

---

## [1.15.0] — Click-to-start sims + Subjects dropdown in the navbar

Two UX fixes that surfaced once the catalog grew past ~14 subjects and ~95 sims.

### Changed — sims no longer auto-run

Every sim now opens with a Start gate over the stage area. The sim is only loaded and mounted after the user clicks the play button.

- **Why:** with auto-mount, opening a tab fires up animation loops and audio contexts before the user has even read the description. Background tabs were spinning frames; reduced-motion users had no opt-out.
- **Where:** [src/pages/sim.js](src/pages/sim.js) renders the gate and defers `sim.load()` + `mount()` until clicked. Single shell-level change — no per-sim edits needed.
- **i18n:** new `sim.start` / `sim.startHint` strings in [en.json](src/i18n/en.json) / [id.json](src/i18n/id.json).
- **Style:** `.sim-start` block in [layout.css](src/styles/layout.css) — circular play button in the subject accent color, brief hint pointing at the description aside.

### Changed — navbar collapses 14 subjects into a "Subjects ▾" dropdown

The horizontal subject list overflowed past Computer Science / Data Science on most laptop widths. Replaced with a single dropdown toggle.

- **Where:** [src/components/header.js](src/components/header.js) builds a click-driven dropdown panel listing all subjects in a 2-column grid (single column on mobile). Outside-click and Escape close it.
- **Active highlighting:** when on a `#/<subject>` route, the toggle gets the active style and the matching item inside the panel is highlighted with the subject accent color.
- **Style:** `.nav-dropdown` block in [layout.css](src/styles/layout.css) — caret rotates on open, items show subject icons in their accent color.

---

## [1.14.0] — Lab badge: visual identifier for lab-mode sims

Now that ~70 sims have virtual lab mode (since 1.13.0), users had no way to tell from the catalog which sims include the measurement/procedure/CSV-export workflow. A small green "🧪 Lab" pill now marks every lab-shaped sim — both on the cards (home + subject pages, search results) and beside the title on the sim detail page.

### Added

- **`hasLab: true` manifest flag** — added to all 70 sims that ship a lab panel. Detected by grepping `labPanel` usage in each `sim.js` and patching the corresponding `manifest.js`.
- **Lab badge on sim cards** ([src/components/sim-card.js](src/components/sim-card.js)) — small green pill rendered next to the subject tag when `hasLab` is true.
- **Lab badge on the sim detail header** ([src/components/sim-shell.js](src/components/sim-shell.js)) — slightly larger version of the same pill, inline with the H1.
- **i18n strings** — `lab.badge` / `lab.badgeTitle` in both [en.json](src/i18n/en.json) and [id.json](src/i18n/id.json). Tooltip explains what the badge means ("This sim has virtual lab mode — record measurements, follow a procedure, export CSV").
- **`.sim-card__lab` CSS** ([src/styles/layout.css](src/styles/layout.css)) — green-on-tinted-green pill, deliberately distinct from per-subject accent colors so the lab indicator reads as a category marker independent of subject.

### Why a single shared badge color (green, not subject-tinted)

The badge means "this sim has lab mode" — a property orthogonal to subject. A subject-colored badge would compete with the existing subject tag and muddle the signal. Green is unused elsewhere in the chrome, so the eye latches onto it as a distinct category.

---

## [1.13.0] — Virtual Lab mode goes catalog-wide (~60 sims now lab-shaped)

Every sim where measurements + a procedure makes pedagogical sense now has a lab panel. Pure visualizations, lookups, and audio sims are intentionally excluded.

### Changed — full lab mode coverage across the catalog

**Physics (12)** — waves-on-string (find harmonics), lenses (1/dₒ + 1/dᵢ = 1/f), springs-shm (T = 2π√(m/k)), snell (refraction + critical angle), buoyancy (Archimedes' fraction), atwood (Newton's 2nd law for systems), mirrors (mirror equation), carnot (η_max), bernoulli (continuity + pressure), collisions-1d (momentum + KE), inclined-plane (slip angle), doppler (frequency shift).

**Chemistry (8)** — ph-indicator (transition ranges), le-chatelier (predict shift), solubility (curves vs T), beer-lambert (A vs c·L), collision-theory (rate vs T, Arrhenius), radioactive-decay (verify half-life), galvanic-cell (E°_cell), activation-energy (Arrhenius + catalysis).

**Biology (5)** — punnett-square (offspring ratios), natural-selection (selection coefficient), osmosis (water flow direction), hardy-weinberg (allele freq evolution), photosynthesis (find limiting factor).

**Earth & Space (4)** — solar-system (Kepler's 3rd: T²/a³), moon-phases (illumination vs angle), greenhouse (T vs CO₂), stellar-parallax (d = 1/p).

**Engineering (8)** — beam-bending (M_max), gear-ratios (speed-torque trade), op-amp (gain + clipping), rc-filter (Bode), stress-strain (yield/ultimate), otto-cycle (η vs r), transformer (turns ratio), heat-sink (thermal-RC).

**Climate (4)** — carbon-cycle (pool tracking), ice-albedo (bistable equilibria), energy-mix (CO₂/cost/reliability trilemma), ocean-acidification (pH + Ω vs CO₂).

**Data Science (6)** — linear-regression (least-squares fit), distributions (sample vs theoretical), central-limit-theorem (SD scaling), monte-carlo-pi (1/√N convergence), gradient-descent (lr vs convergence), bootstrap (CI for mean).

**Finance (6)** — compound-interest (compound vs simple), loan-amortization (M, total interest), stock-walk (GBM distribution), inflation (real vs nominal), bond-pricing (premium/par/discount), npv (NPV + IRR).

**Social (4)** — supply-demand (equilibrium + price controls), sir-epidemic (herd threshold), logistic-growth (inflection at K/2), population-dynamics (Lotka-Volterra cycles).

**Math (2)** — pi-polygons (Archimedes' bracket), galton-board (binomial → Gaussian).

**Psychology (1)** — forgetting-curve (design a study schedule).

### Notes

- ~60 sims gained lab panels in this push, on top of the 10 from 1.12.0 → **70 sims now have full lab affordances** (procedure + prediction + data table + CSV export).
- Pure visualizations, lookups, music/audio, and conceptual sims (Mandelbrot, optical illusions, food web, periodic table, harmonic series, etc.) deliberately skipped — they don't fit the lab shape.
- Bundle: virtually no main growth (~0.1 KB); each sim's chunk grew ~1 KB. Total catalog still 234 sims.

---

## [1.12.0] — Virtual Lab mode rolls out (10 sims now lab-shaped)

The `lib/lab.js` helper from 1.11.0 now ships across the seven additional lab-shaped sims. Each has a custom procedure and prediction prompt designed around the actual experiment a teacher would assign. Combined with the three exemplars from 1.11.0 (pendulum, titration, Hooke's law), **10 sims now produce real lab data** that students can record and export.

### Changed (7 more sims now in lab mode)

- **Chemistry / Gas Laws** — Boyle / Charles / combined: 5-step procedure varying V then T, columns for n, T, V, P, P·V, and PV/(nT). Verifies the ideal-gas constant from your own data.
- **Biology / Enzyme Activity** — Find the optimum (T, pH) for pepsin, trypsin, etc. Sweep T at fixed pH, then pH at fixed T; the optimum reveals itself in the data.
- **Physics / Photoelectric Effect** — Measure h and the work function. Sweep frequency above the threshold, plot KE vs f, slope is Planck's h.
- **Chemistry / Calorimetry** — Predict T_f from m₁c₁T₁ + m₂c₂T₂ formula, then verify against the live equilibrium. Q = mcΔT energy bookkeeping in the data table.
- **Chemistry / Electrolysis** — Faraday's laws verified directly: n = It/(zF). Also captures the 2:1 H₂:O₂ ratio across all rows.
- **Physics / Series & Parallel Circuits** — Ohm's law and the resistance-combination rules. Toggle bulbs off mid-trial to see the cascade differences between configs.
- **Physics / Projectile Motion** — Range vs angle: sweep through 15°, 30°, 45°, 60°, 75° and verify R = v²sin(2θ)/g (no drag) — the 30°/60° symmetry pops out of the data.

### Notes

- Catalog: still 234 sims; 10 now have full lab affordances (prediction → procedure → data table → CSV export).
- Bundle: ~0.02 KB main growth; each lab-mode sim's chunk grew ~1 KB.
- Pattern is fully shaken out — the next batch (any 10–20 lab-shaped sims) will be ~30 lines of sim code each.

---

## [1.11.0] — Virtual Lab mode (lib/lab.js + 3 exemplar upgrades)

The first wave of "sim → virtual lab" upgrades. A shared infrastructure piece + three lab-shaped sims that now have proper lab affordances: structured procedures, prediction prompts, a recordable data table, and CSV export.

### Added

- **`src/lib/lab.js`** — `labPanel({ title, columns, procedure, predict, source, filename })`. Drop-in panel any sim can append to its controls. Procedure section is collapsible with check-off-able steps; prediction section captures free text before measurement; data table grows by row, supports per-row delete; "↓ CSV" exports the full table as a downloadable file.
- **CSS** — sticky-header table, monospace numerics, accent-colored left rule on the panel so it sits visibly distinct from sliders/buttons.

### Changed (3 exemplar sims now in lab mode)

- **Physics / Pendulum** — "Period vs length" lab: 5-step procedure (vary L from 0.5 → 3.0 m), prediction prompt about T vs L scaling, columns for L, θ₀, g, measured T, and theoretical 2π√(L/g). Drag the bob, let it settle, click Record. Export the rows and your students get a real T-vs-L dataset they can plot on graph paper.
- **Chemistry / Titration** — "Find the equivalence point" lab: drip slowly, click Record every 2 mL, then more often near the steep midpoint. Auto-tags the row with "equivalence" or "half-equiv (pH ≈ pKa)" when the volume crosses those reference points.
- **Physics / Hooke's Law** — "F = kx" lab: pick a spring, vary mass from 0.5 → 2.5 kg, record stretch and F/x ratio per row. Procedure walks through how to read k off the slope; the elastic-limit deviation becomes obvious from the data once mass gets high.

### Notes

- Catalog: still 234 sims. This wave is depth, not breadth.
- Bundle: ~3 KB gzipped added (lab.js + CSS); each lab-mode sim's chunk grew ~1 KB.
- The pattern is now ready to apply to the next batch (gas-laws, enzyme-activity, photoelectric, calorimetry, electrolysis, circuits, projectile-motion). Each takes ~30 lines of sim code: import labPanel, define columns + procedure + source, append to ctrlPanel.

---

## [1.10.0] — Two new subjects: Psychology + Cognitive Science (234 sims, 14 subjects)

### Added — Psychology 🧠 (6 sims, new subject)

These sims share a fundamentally new interaction pattern: **the user is the experiment subject**.

- **Stroop Test** — color words in mismatched ink; click the ink color, not the word. Live RT comparison between congruent and incongruent trials shows the classic ~30-50% interference.
- **Reaction Time Test** — wait for green flash, click as fast as you can. Simple vs choice modes; live histogram of trial RTs.
- **Anchoring Bias** — Tversky-Kahneman style: drag an anchor and watch a simulated population's estimates drift toward it. 5 calibrated trivia questions.
- **Ebbinghaus Forgetting Curve** — exponential memory decay with draggable review markers; consolidation makes each curve shallower.
- **Asch Conformity** — line-comparison task with adjustable confederates and an optional ally; track how often you go along with the wrong answer.
- **Classical Conditioning (Pavlov)** — pair bell + food, watch the association curve grow; "bell only" trials produce extinction.

### Added — Cognitive Science 💡 (6 sims, new subject)

- **Optical Illusions Gallery** — six classics (Müller-Lyer, Ponzo, Café Wall, Ebbinghaus, Hering, Checker Shadow) with a "ruler/proof" overlay that confirms the illusion.
- **Visual Search** — find the target among distractors. Feature search (pop-out, ~constant RT vs N) vs conjunction search (slow, RT scales with N) live comparison.
- **Mental Rotation (Shepard task)** — 3D-style "letter R" with rotation/mirror; RT-vs-angle scatter plot accumulates as you respond.
- **Digit Span** — flashing digit sequences; type back forward or backward; auto-extends span on success. Hits Miller's 7±2 region.
- **Signal Detection Theory** — overlapping noise/signal Gaussians with draggable criterion β; live confusion matrix and ROC curve.
- **Change Blindness** — flicker paradigm vs continuous mode; one element changes between two scenes; click the changed item to log RT.

### Added — Subject + theming infrastructure

- New entries in `src/catalog/subjects.js`: `psychology` (🧠) and `cognitive-science` (💡), bilingual.
- New accent colors in `src/styles/tokens.css`: `--subj-psychology: #f43f5e` (rose) and `--subj-cognitive-science: #6366f1` (indigo).
- Two new featured picks added to the home grid: stroop-test (psychology) and optical-illusions (cog-sci).

### Notes

- Total catalog: **234 sims across 14 subjects**.
- Bundle: main grew ~20 KB (132 KB gzipped, up from 125). Each new sim is its own lazy chunk.
- The catalog now spans natural sciences, formal sciences, social sciences, applied sciences, and (with this wave) the experimental human sciences — covering the full breadth of what most curricula classify as "science".

---

## [1.9.0] — Balance + breadth wave (222 sims, +25 added)

A wave focused on bringing the new subjects (engineering, music, climate) up from 8 to 12 each — and filling targeted gaps across the rest of the catalog.

### Added — Engineering ⚙ (8 → 12)

- **Otto Cycle** — animated 4-stroke engine with synchronized P-V diagram; adjust compression ratio and watch ideal efficiency η = 1 − 1/r^(γ−1) climb.
- **Wheatstone Bridge** — diamond of four resistors with galvanometer; balance condition R₁R₄ = R₂R₃; auto-balance button.
- **Transformer** — primary/secondary windings with adjustable turns; live V/I scaling by N₂/N₁; step-up vs step-down; 1:1 isolation preset.
- **Heat Sink Design** — thermal-RC model: T_chip = T_amb + P·R_θ in steady state; live time-domain plot; throttle/damage zones marked.

### Added — Music & Acoustics 🎵 (8 → 12)

- **FM Synthesis** — modulator + carrier with adjustable index I and ratio; presets for vibrato/bell/bass/wood; click Play to hear.
- **Dynamics Compressor** — drag-handle threshold on the input-output transfer curve; sample drum-loop dynamics tamed; 4 presets including limiter.
- **Doppler Effect (Audio)** — siren racing past a fixed observer; pitch shifts in real time on Play; concentric wavefronts visible.
- **Scales & Modes** — clickable piano with root + 15 scale/mode choices (major, modes, blues, harmonic minor, whole-tone…); play scale to hear.

### Added — Climate & Sustainability 🌱 (8 → 12)

- **GHG Absorption Spectra** — Earth's IR emission with five gas band toggles (H₂O, CO₂, CH₄, N₂O, O₃); see which "atmospheric windows" close.
- **El Niño / La Niña (ENSO)** — Pacific cross-section with thermocline tilt + global rainfall anomaly map; sweep the index from −2.5 to +2.5.
- **Methane vs CO₂** — pulse-response GWP visualization; horizon-dependent (20y, 100y, 500y) integrated forcing comparison.
- **Ozone Layer & CFCs** — atmospheric column with CFC slider + polar-vortex toggle; ozone DU history chart with 220-DU "hole" threshold.

### Added — Other subjects (9)

- **Physics / Bernoulli** — narrowing pipe with continuity (A₁v₁ = A₂v₂); pressure gauges show the P-v inverse relationship; flowing particles.
- **Physics / Series & Parallel Circuits** — three light bulbs you can toggle; brightness scales with power dissipated; mode switch + bulb-resistance sliders.
- **Chemistry / Atomic Emission Spectra** — H, He, Ne, Na, Hg with prominent lines drawn on a 200–800 nm spectrum; hover for nm reading.
- **Chemistry / Activation Energy & Catalysis** — energy diagram with draggable peak/products; live Arrhenius rate; catalyst toggle compares uncatalyzed reference.
- **Biology / Meiosis** — 9-phase walk-through (interphase → telophase II) with chromosome dance and crossing-over highlight.
- **Biology / Antibiotic Resistance** — bacterial dish + S/R population history; turn antibiotic on/off and watch resistance evolve.
- **Earth & Space / Star Life Cycle** — pick a stellar mass (0.05 – 60 M☉) and walk through its phases on the H-R diagram; four end-state classes.
- **Earth & Space / Volcano Types** — viscosity × gas → shield / cinder cone / stratovolcano / lava dome with eruption animation.
- **Mathematics / Venn Diagrams** — 3-set Venn with set-builder operations (∪, ∩, −, △, complement); pixel-shaded result regions.
- **Mathematics / System of Linear Equations** — two lines with draggable control points; live intersection or "no/infinite solution" classification.
- **Computer Science / Finite-State Automata** — three pre-built DFAs (ends-with-01, even-parity, divisible-by-3); type input and step through.
- **Data Science / p-value & Hypothesis Testing** — standard normal with draggable observed z; one- vs two-tailed; α rejection region shaded.
- **Social Science / Tit-for-Tat Tournament** — 6 strategies × 6 strategies round-robin (Axelrod-style) with live ranking + score matrix.

### Notes

- Total catalog: **222 sims across 12 subjects**.
- Subject distribution post-wave: physics 24, chemistry 22, biology 22, earth-space 20, computer-science 21, data-science 20, social-science 19, mathematics 22, finance 16, engineering 12, music 12, climate 12.
- Bundle: main grew ~40 KB (125 KB gzipped, up from 110). Each new sim is its own lazy-loaded chunk.

---

## [1.8.0] — School-curriculum staples (197 sims, +20 added)

A targeted wave hitting the most-frequently-assigned middle/high-school topics across 9 subjects. Every sim is direct-manipulation by default and uses the shared `hoverProbe` / `dragHandle` helpers where it fits.

### Added — Physics (4)

- **Inclined Plane with Friction** — drag the ramp angle, set μ_s/μ_k, watch the block stick or slide; live free-body diagram with mg sin θ, mg cos θ, normal, and friction.
- **Hooke's Law** — three springs (soft/medium/stiff) on the same F-vs-x axes; drag the mass, see the linear law and the elastic-limit kink.
- **Atwood Machine** — two masses on a string over a pulley; live formulas a = (m₁−m₂)g/(m₁+m₂) and T = 2m₁m₂g/(m₁+m₂).
- **Curved Mirrors** — concave/convex with a draggable candle; live ray construction (parallel ray, focal-point ray); real vs virtual classification, magnification.

### Added — Chemistry (3)

- **Stoichiometry & Limiting Reagent** — pick a reaction (combustion, Haber, magnesium burn, rust), set grams of each reactant; the limiting reagent is highlighted; theoretical yield computed.
- **Calorimetry** — drop a hot block into a cool liquid and watch temperatures equilibrate to T_f; 8 substances with realistic specific heats (water, iron, copper, mercury, etc.).
- **Electrolysis of Water** — animated cell with current-controlled bubble production; live H₂/O₂ volume in 2:1 ratio; Faraday's law n = It/(zF).

### Added — Biology (3)

- **Cardiac Cycle** — pulsing schematic heart with synchronized P-V loop; four phases (filling, isovolumetric contract, ejection, isovolumetric relax) tracked in real time.
- **Food Web Builder** — grassland ecosystem with 10 species; drag organisms, click pairs to toggle predator-prey arrows, "remove species" cascade-collapses dependent layers.
- **Microscope Simulator** — virtual compound microscope with 6 slides (onion, plant stem, blood, paramecium, cheek cells, pond water); switch objectives, turn the focus knob, watch the field-of-view change with magnification.

### Added — Earth & Space (1)

- **Rock Cycle** — 80 particles flow between magma / igneous / sedimentary / metamorphic via process arrows; adjust each rate (cooling, weathering, lithification, metamorphism, melting) and watch the system rebalance.

### Added — Mathematics (4)

- **Quadratic Formula Visualizer** — drag a, b, c; live parabola, roots, vertex, axis of symmetry; discriminant Δ = b² − 4ac classifies the three root-cases; vertex draggable directly on the plot.
- **Slope-Intercept y = mx + b** — drag two points; rise-over-run triangle drawn between them; y-intercept marker; equation, slope, and intercept update live.
- **Pascal's Triangle** — clickable cells with path-counting highlight; toggle "show parity" to reveal the Sierpinski-triangle fractal in odd entries; up to 20 rows.
- **Fractions Visualizer** — three views (pie / bar / number line) for two fractions side by side; common-denominator computation; compare/add/subtract; mixed-number and decimal conversions.

### Added — Computer Science (2)

- **Binary Numbers** — clickable bit toggles for 4/8/16/32-bit widths; live decimal, hex, and binary readout; "+1" button shows the rollover behavior.
- **Tower of Hanoi** — 2 to 8 disks; click pegs to move by hand or hit "Auto-solve" to watch the recursive algorithm; move counter vs the optimum 2^N − 1.

### Added — Data Science (2)

- **Box Plot & 5-Number Summary** — type any list of numbers, see the box plot + dot plot + 5-number table; adjustable IQR multiplier reveals/hides outliers; 5 presets.
- **Correlation Explorer** — scatter plot with draggable points, click to add, right-click to remove; live Pearson r and best-fit regression line; presets for positive/negative/none/curved relationships.

### Added — Social Science (1)

- **Logistic Population Growth** — dN/dt = rN(1 − N/K) with adjustable r, K, N₀; logistic curve overlaid on exponential reference; inflection point at K/2 marked; hover for (t, N).

### Notes

- Total catalog: **197 sims across 12 subjects**.
- Bundle: main grew ~32 KB (110 KB gzipped, up from 98). Each new sim is a separately-lazy-loaded chunk; only catalog metadata sits in the main bundle.
- Subject distribution post-wave: physics 22, chemistry 20, biology 20, earth-space 18, computer-science 20, data-science 19, social-science 18, math 20, finance 16, engineering 8, music 8, climate 8.

---

## [1.7.0] — Thickening the new subjects (177 sims, +15 added)

Engineering, Music & Acoustics, and Climate & Sustainability each gain 5 new sims. Every new sim uses the shared `hoverProbe` / `dragHandle` helpers (and WebAudio for the music ones) — direct manipulation by default, sliders only as a backstop.

### Added — Engineering ⚙ (3 → 8)

- **Gear Train Ratios** — three meshed gears with adjustable tooth counts; live RPM and torque ratios; meshed gears reverse direction so it animates correctly.
- **Pulley & Mechanical Advantage** — block-and-tackle with 1× through 6× MA; drag the rope grip vertically to lift the load; W_in vs W_out energy bookkeeping.
- **Op-Amp Inverting Amplifier** — schematic + live waveform; adjust R_in and R_f to see gain G = −R_f/R_in change; output clips at the supply rails when over-driven.
- **RC Low-Pass Filter** — Bode magnitude + phase plot with f_c marker; drag horizontally to set drive frequency; time-domain output shows actual phase lag and attenuation.
- **Stress-Strain Curve** — drag the strain in the chart and watch a virtual specimen stretch, neck, and fracture; four materials (steel / aluminum / glass / polymer) overlaid for comparison.

### Added — Music & Acoustics 🎵 (3 → 8)

- **ADSR Synth Envelope** — drag four corner handles to sculpt the envelope; click Play to hear your custom shape on a triangle oscillator; presets for pluck / pad / organ / stab.
- **Vowel Formants** — drag a point in F1-F2 space; identifies the closest IPA vowel; source-filter synthesis (sawtooth source through two band-pass filters at F1, F2) lets you actually hear the vowel.
- **Polyrhythms** — N:M dual-beat visualizer with shared playhead and per-beat clicks; 3:2, 3:4, 5:7, 7:11 presets; tempo control.
- **Pitch Perception (Mel Scale)** — see the mel = 2595·log₁₀(1 + f/700) curve and hear that octave-up at low f sounds like a bigger jump than at high f.
- **Chord Builder** — clickable two-octave piano; recognizes major / minor / dim / aug / sus / 7th / m7 / maj7 / m7♭5 / dim7 / 6 / add9; click Play to hear the chord.

### Added — Climate & Sustainability 🌱 (3 → 8)

- **Sea Level Rise** — procedurally generated coastal map with three relief profiles (mixed / flat / mountainous); drag the hypsometric curve to set sea level; live "% land flooded" stat.
- **Ocean Acidification** — pH and aragonite saturation Ω as functions of atmospheric CO₂ (ppm); the Ω = 1 shell-dissolving threshold marked; drag CO₂ horizontally on the curve.
- **Solar Panel Yield** — clear-sky model: latitude × tilt × day-of-year × cloud cover; daily power curve + annual yield curve side by side with hover crosshairs on both.
- **Daisyworld** (Lovelock & Watson 1983) — emergent self-regulation; planet temperature stays nearly flat as solar luminosity sweeps; T-vs-L hysteresis history visualized.
- **Carbon Footprint Calculator** — 10 lifestyle sliders × CO₂-eq factors → tons/year; gauge benchmarks against global average and the 2°C target; presets for typical American / European / vegan / 2°C-compatible lifestyles.

### Notes

- Total catalog: **177 sims across 12 subjects**. Engineering, Music, Climate are now at 8 each (matching the shape of the other subjects more closely).
- Bundle: main grew ~25 KB (98.5 KB gzipped, up from 89). Each new sim is its own lazy-loaded chunk; only catalog metadata sits in the main bundle.
- WebAudio sims (3 of the 5 new music ones) follow the established pattern: lazy AudioContext on first user gesture, torn down on sim unmount.

---

## [1.6.0] — Three new subjects (162 sims, 12 subjects)

### Added — Engineering ⚙

- **Truss Analyzer** — 3-panel Warren bridge with method-of-joints solver (Gaussian-elimination 14×14 system per frame). Drag the load along the deck; members color-code red for tension, blue for compression; hover any member for its force.
- **Beam Bending** — simply-supported beam with a draggable point load. Live shear, moment, and Euler-Bernoulli deflection diagrams; hover any diagram for (x, value).
- **PID Controller** — first-order plant + tunable Kp/Ki/Kd; live response chart with disturbance kicks; hover for (t, y, u). Demonstrates the classic gain-tuning failure modes: oscillation, slow rise, steady-state offset.

### Added — Music & Acoustics 🎵 (introduces audio output for the first time)

- **Beat Frequencies** — two pure tones; stacked y₁, y₂, sum waveform with the beat envelope highlighted; click Play to hear it (WebAudio).
- **Harmonic Series** — first 8 harmonics with adjustable weights and presets (sine, sawtooth, square, clarinet); see and hear the Fourier construction; live waveform + bar chart.
- **Equal Temperament vs Just Intonation** — table of all 12 intervals with cents difference and visual cents-deviation bars; click Play to hear "just" or "ET" versions back-to-back.

### Added — Climate & Sustainability 🌱

- **Carbon Cycle** — four-pool box model (atmosphere, surface ocean, deep ocean, land biosphere) with linear exchange fluxes and adjustable emissions. Live pool reservoirs + 100-year fractional-anomaly chart with hover crosshair.
- **Ice-Albedo Feedback** — energy-balance climate model with temperature-dependent albedo; net-flux curve shows the bistable equilibria. Drag the temperature ball to slide between snowball-Earth and warm states.
- **Energy Mix Optimizer** — allocate global electricity between coal / gas / nuclear / hydro / wind / solar; live CO₂ intensity, average cost, and reliability dashboard. Presets for "today", "Nordic-like", "all renewable", etc.

### Added — Subject + theming infrastructure

- New entries in `src/catalog/subjects.js`: `engineering`, `music`, `climate`, each bilingual.
- New accent colors in `src/styles/tokens.css`: `--subj-engineering: #94a3b8`, `--subj-music: #d946ef`, `--subj-climate: #22c55e`.
- Three new featured picks added to the home grid (one per new subject), keeping the "one featured per subject" coverage at 12/12.

### Notes

- Total catalog: **162 sims across 12 subjects**.
- Bundle: main grew ~16 KB (89 KB gzipped, up from 83) — most of that is the 9 new sim chunks being lazy-loaded plus the truss solver / climate model state in the index.
- WebAudio is gated behind a Play-button user gesture (browser requirement) and is torn down cleanly on sim unmount.

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
