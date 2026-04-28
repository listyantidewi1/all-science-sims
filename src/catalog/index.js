// Eagerly import only manifests (cheap). Sim code is lazy via manifest.load().
import projectileMotion from '../sims/physics/projectile-motion/manifest.js';
import pendulum         from '../sims/physics/pendulum/manifest.js';
import wavesOnString    from '../sims/physics/waves-on-string/manifest.js';
import electricField    from '../sims/physics/electric-field/manifest.js';
import newtonsCradle    from '../sims/physics/newtons-cradle/manifest.js';
import lenses           from '../sims/physics/lenses/manifest.js';
import springsShm       from '../sims/physics/springs-shm/manifest.js';
import doublePendulum   from '../sims/physics/double-pendulum/manifest.js';
import doppler          from '../sims/physics/doppler/manifest.js';
import diffraction      from '../sims/physics/diffraction/manifest.js';
import buoyancy         from '../sims/physics/buoyancy/manifest.js';
import orbitalMech      from '../sims/physics/orbital-mechanics/manifest.js';
import rlcResonance     from '../sims/physics/rlc-resonance/manifest.js';

import phIndicator      from '../sims/chemistry/ph-indicator/manifest.js';
import periodicTable    from '../sims/chemistry/periodic-table/manifest.js';
import gasLaws          from '../sims/chemistry/gas-laws/manifest.js';
import titration        from '../sims/chemistry/titration/manifest.js';
import bohrAtom         from '../sims/chemistry/bohr-atom/manifest.js';
import leChatelier      from '../sims/chemistry/le-chatelier/manifest.js';
import solubility       from '../sims/chemistry/solubility/manifest.js';
import vsepr            from '../sims/chemistry/vsepr/manifest.js';
import phaseDiagram     from '../sims/chemistry/phase-diagram/manifest.js';
import beerLambert      from '../sims/chemistry/beer-lambert/manifest.js';
import collisionTheory  from '../sims/chemistry/collision-theory/manifest.js';
import radioactiveDecay from '../sims/chemistry/radioactive-decay/manifest.js';
import aufbau           from '../sims/chemistry/aufbau/manifest.js';

import punnett          from '../sims/biology/punnett-square/manifest.js';
import cellExplorer     from '../sims/biology/cell-explorer/manifest.js';
import naturalSelection from '../sims/biology/natural-selection/manifest.js';
import dnaTranscription from '../sims/biology/dna-transcription/manifest.js';
import ecosystem        from '../sims/biology/ecosystem/manifest.js';
import enzymeActivity   from '../sims/biology/enzyme-activity/manifest.js';
import osmosis          from '../sims/biology/osmosis/manifest.js';
import hardyWeinberg    from '../sims/biology/hardy-weinberg/manifest.js';
import actionPotential  from '../sims/biology/action-potential/manifest.js';
import pedigree         from '../sims/biology/pedigree/manifest.js';
import photosynthesis   from '../sims/biology/photosynthesis/manifest.js';
import ecg              from '../sims/biology/ecg/manifest.js';
import mitosis          from '../sims/biology/mitosis/manifest.js';

import solarSystem      from '../sims/earth-space/solar-system/manifest.js';
import seasons          from '../sims/earth-space/seasons/manifest.js';
import plateTectonics   from '../sims/earth-space/plate-tectonics/manifest.js';
import moonPhases       from '../sims/earth-space/moon-phases/manifest.js';
import greenhouse       from '../sims/earth-space/greenhouse/manifest.js';
import eclipses         from '../sims/earth-space/eclipses/manifest.js';
import tides            from '../sims/earth-space/tides/manifest.js';
import coriolis         from '../sims/earth-space/coriolis/manifest.js';
import hrDiagram        from '../sims/earth-space/hr-diagram/manifest.js';
import mantleConvection from '../sims/earth-space/mantle-convection/manifest.js';
import waterCycle       from '../sims/earth-space/water-cycle/manifest.js';
import atmosphere       from '../sims/earth-space/atmosphere/manifest.js';
import blackHole        from '../sims/earth-space/black-hole/manifest.js';

import sortingViz       from '../sims/computer-science/sorting-visualizer/manifest.js';
import bst              from '../sims/computer-science/binary-search-tree/manifest.js';
import pathfinding      from '../sims/computer-science/pathfinding/manifest.js';
import logicGates       from '../sims/computer-science/logic-gates/manifest.js';
import gameOfLife       from '../sims/computer-science/game-of-life/manifest.js';
import fractals         from '../sims/computer-science/fractals/manifest.js';
import caesarCipher     from '../sims/computer-science/caesar-cipher/manifest.js';
import turingMachine    from '../sims/computer-science/turing-machine/manifest.js';
import boids            from '../sims/computer-science/boids/manifest.js';
import elementaryCA     from '../sims/computer-science/elementary-ca/manifest.js';
import reactionDiffusion from '../sims/computer-science/reaction-diffusion/manifest.js';
import mazeGeneration   from '../sims/computer-science/maze-generation/manifest.js';
import geneticAlgo      from '../sims/computer-science/genetic-algorithm/manifest.js';

import linearReg        from '../sims/data-science/linear-regression/manifest.js';
import distributions    from '../sims/data-science/distributions/manifest.js';
import kMeans           from '../sims/data-science/k-means/manifest.js';
import clt              from '../sims/data-science/central-limit-theorem/manifest.js';
import bayes            from '../sims/data-science/bayes-theorem/manifest.js';
import confusionMatrix  from '../sims/data-science/confusion-matrix/manifest.js';
import outliers         from '../sims/data-science/outliers/manifest.js';
import anscombe         from '../sims/data-science/anscombe/manifest.js';
import monteCarloPi     from '../sims/data-science/monte-carlo-pi/manifest.js';
import simpsons         from '../sims/data-science/simpsons-paradox/manifest.js';
import gradientDescent  from '../sims/data-science/gradient-descent/manifest.js';
import biasVariance     from '../sims/data-science/bias-variance/manifest.js';
import markovText       from '../sims/data-science/markov-text/manifest.js';

import supplyDemand     from '../sims/social-science/supply-demand/manifest.js';
import prisonersDilemma from '../sims/social-science/prisoners-dilemma/manifest.js';
import populationDynamics from '../sims/social-science/population-dynamics/manifest.js';
import schelling        from '../sims/social-science/schelling-segregation/manifest.js';
import sirEpidemic      from '../sims/social-science/sir-epidemic/manifest.js';
import votingMethods    from '../sims/social-science/voting-methods/manifest.js';
import inequality       from '../sims/social-science/inequality/manifest.js';
import preferentialAtt  from '../sims/social-science/preferential-attachment/manifest.js';
import publicGoods      from '../sims/social-science/public-goods/manifest.js';
import hawksDoves       from '../sims/social-science/hawks-doves/manifest.js';
import stagHunt         from '../sims/social-science/stag-hunt/manifest.js';
import ultimatum        from '../sims/social-science/ultimatum/manifest.js';
import bassDiffusion    from '../sims/social-science/bass-diffusion/manifest.js';

export const SIMS = [
  projectileMotion, pendulum, wavesOnString, electricField, newtonsCradle, lenses, springsShm,
  doublePendulum, doppler, diffraction, buoyancy, orbitalMech, rlcResonance,

  phIndicator, periodicTable, gasLaws, titration, bohrAtom, leChatelier, solubility,
  vsepr, phaseDiagram, beerLambert, collisionTheory, radioactiveDecay, aufbau,

  punnett, cellExplorer, naturalSelection, dnaTranscription, ecosystem, enzymeActivity,
  osmosis, hardyWeinberg, actionPotential, pedigree, photosynthesis, ecg, mitosis,

  solarSystem, seasons, plateTectonics, moonPhases, greenhouse, eclipses, tides,
  coriolis, hrDiagram, mantleConvection, waterCycle, atmosphere, blackHole,

  sortingViz, bst, pathfinding, logicGates, gameOfLife, fractals, caesarCipher,
  turingMachine, boids, elementaryCA, reactionDiffusion, mazeGeneration, geneticAlgo,

  linearReg, distributions, kMeans, clt, bayes, confusionMatrix, outliers,
  anscombe, monteCarloPi, simpsons, gradientDescent, biasVariance, markovText,

  supplyDemand, prisonersDilemma, populationDynamics, schelling, sirEpidemic, votingMethods,
  inequality, preferentialAtt, publicGoods, hawksDoves, stagHunt, ultimatum, bassDiffusion,
];

export const SIMS_BY_ID = Object.fromEntries(SIMS.map((s) => [`${s.subject}/${s.id}`, s]));

export function simsBySubject(subjectId) {
  return SIMS.filter((s) => s.subject === subjectId);
}

export function findSim(subjectId, simId) {
  return SIMS_BY_ID[`${subjectId}/${simId}`] ?? null;
}
