// Eagerly import only manifests (cheap). Sim code is lazy via manifest.load().
import projectileMotion from '../sims/physics/projectile-motion/manifest.js';
import pendulum         from '../sims/physics/pendulum/manifest.js';
import wavesOnString    from '../sims/physics/waves-on-string/manifest.js';
import electricField    from '../sims/physics/electric-field/manifest.js';
import newtonsCradle    from '../sims/physics/newtons-cradle/manifest.js';
import lenses           from '../sims/physics/lenses/manifest.js';
import springsShm       from '../sims/physics/springs-shm/manifest.js';

import phIndicator      from '../sims/chemistry/ph-indicator/manifest.js';
import periodicTable    from '../sims/chemistry/periodic-table/manifest.js';
import gasLaws          from '../sims/chemistry/gas-laws/manifest.js';
import titration        from '../sims/chemistry/titration/manifest.js';
import bohrAtom         from '../sims/chemistry/bohr-atom/manifest.js';
import leChatelier      from '../sims/chemistry/le-chatelier/manifest.js';
import solubility       from '../sims/chemistry/solubility/manifest.js';

import punnett          from '../sims/biology/punnett-square/manifest.js';
import cellExplorer     from '../sims/biology/cell-explorer/manifest.js';
import naturalSelection from '../sims/biology/natural-selection/manifest.js';
import dnaTranscription from '../sims/biology/dna-transcription/manifest.js';
import ecosystem        from '../sims/biology/ecosystem/manifest.js';
import enzymeActivity   from '../sims/biology/enzyme-activity/manifest.js';
import osmosis          from '../sims/biology/osmosis/manifest.js';

import solarSystem      from '../sims/earth-space/solar-system/manifest.js';
import seasons          from '../sims/earth-space/seasons/manifest.js';
import plateTectonics   from '../sims/earth-space/plate-tectonics/manifest.js';
import moonPhases       from '../sims/earth-space/moon-phases/manifest.js';
import greenhouse       from '../sims/earth-space/greenhouse/manifest.js';
import eclipses         from '../sims/earth-space/eclipses/manifest.js';
import tides            from '../sims/earth-space/tides/manifest.js';

import sortingViz       from '../sims/computer-science/sorting-visualizer/manifest.js';
import bst              from '../sims/computer-science/binary-search-tree/manifest.js';
import pathfinding      from '../sims/computer-science/pathfinding/manifest.js';
import logicGates       from '../sims/computer-science/logic-gates/manifest.js';
import gameOfLife       from '../sims/computer-science/game-of-life/manifest.js';
import fractals         from '../sims/computer-science/fractals/manifest.js';
import caesarCipher     from '../sims/computer-science/caesar-cipher/manifest.js';

import linearReg        from '../sims/data-science/linear-regression/manifest.js';
import distributions    from '../sims/data-science/distributions/manifest.js';
import kMeans           from '../sims/data-science/k-means/manifest.js';
import clt              from '../sims/data-science/central-limit-theorem/manifest.js';
import bayes            from '../sims/data-science/bayes-theorem/manifest.js';
import confusionMatrix  from '../sims/data-science/confusion-matrix/manifest.js';
import outliers         from '../sims/data-science/outliers/manifest.js';

import supplyDemand     from '../sims/social-science/supply-demand/manifest.js';
import prisonersDilemma from '../sims/social-science/prisoners-dilemma/manifest.js';
import populationDynamics from '../sims/social-science/population-dynamics/manifest.js';
import schelling        from '../sims/social-science/schelling-segregation/manifest.js';
import sirEpidemic      from '../sims/social-science/sir-epidemic/manifest.js';
import votingMethods    from '../sims/social-science/voting-methods/manifest.js';
import inequality       from '../sims/social-science/inequality/manifest.js';

export const SIMS = [
  projectileMotion, pendulum, wavesOnString, electricField, newtonsCradle, lenses, springsShm,
  phIndicator, periodicTable, gasLaws, titration, bohrAtom, leChatelier, solubility,
  punnett, cellExplorer, naturalSelection, dnaTranscription, ecosystem, enzymeActivity, osmosis,
  solarSystem, seasons, plateTectonics, moonPhases, greenhouse, eclipses, tides,
  sortingViz, bst, pathfinding, logicGates, gameOfLife, fractals, caesarCipher,
  linearReg, distributions, kMeans, clt, bayes, confusionMatrix, outliers,
  supplyDemand, prisonersDilemma, populationDynamics, schelling, sirEpidemic, votingMethods, inequality,
];

export const SIMS_BY_ID = Object.fromEntries(SIMS.map((s) => [`${s.subject}/${s.id}`, s]));

export function simsBySubject(subjectId) {
  return SIMS.filter((s) => s.subject === subjectId);
}

export function findSim(subjectId, simId) {
  return SIMS_BY_ID[`${subjectId}/${simId}`] ?? null;
}
