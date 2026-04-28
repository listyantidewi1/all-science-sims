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
import medianVoter      from '../sims/social-science/median-voter/manifest.js';

import collisions1d     from '../sims/physics/collisions-1d/manifest.js';
import carnot           from '../sims/physics/carnot/manifest.js';
import galvanicCell     from '../sims/chemistry/galvanic-cell/manifest.js';
import dnaReplication   from '../sims/biology/dna-replication/manifest.js';
import hohmann          from '../sims/earth-space/hohmann/manifest.js';
import hashTables       from '../sims/computer-science/hash-tables/manifest.js';
import bigO             from '../sims/computer-science/big-o/manifest.js';
import pca              from '../sims/data-science/pca/manifest.js';

import functionPlotter  from '../sims/mathematics/function-plotter/manifest.js';
import derivative       from '../sims/mathematics/derivative/manifest.js';
import riemann          from '../sims/mathematics/riemann/manifest.js';
import fourier          from '../sims/mathematics/fourier/manifest.js';
import vectors          from '../sims/mathematics/vectors/manifest.js';
import complexPlane     from '../sims/mathematics/complex-plane/manifest.js';
import linearTrans      from '../sims/mathematics/linear-transformations/manifest.js';
import newtonsMethod    from '../sims/mathematics/newtons-method/manifest.js';
import pythagorean      from '../sims/mathematics/pythagorean/manifest.js';
import unitCircle       from '../sims/mathematics/unit-circle/manifest.js';
import conicSections    from '../sims/mathematics/conic-sections/manifest.js';
import piPolygons       from '../sims/mathematics/pi-polygons/manifest.js';
import triangleCenters  from '../sims/mathematics/triangle-centers/manifest.js';

import compoundInterest from '../sims/finance/compound-interest/manifest.js';
import loanAmortization from '../sims/finance/loan-amortization/manifest.js';
import stockWalk        from '../sims/finance/stock-walk/manifest.js';
import efficientFrontier from '../sims/finance/efficient-frontier/manifest.js';
import inflation        from '../sims/finance/inflation/manifest.js';
import taxBrackets      from '../sims/finance/tax-brackets/manifest.js';
import dca              from '../sims/finance/dca/manifest.js';
import blackScholes     from '../sims/finance/black-scholes/manifest.js';
import bondPricing      from '../sims/finance/bond-pricing/manifest.js';
import npv              from '../sims/finance/npv/manifest.js';
import phillipsCurve    from '../sims/finance/phillips-curve/manifest.js';
import capm             from '../sims/finance/capm/manifest.js';
import auctions         from '../sims/finance/auctions/manifest.js';

// v1.2.0 wave (27 more sims, 3 per subject)
import snell             from '../sims/physics/snell/manifest.js';
import magneticField     from '../sims/physics/magnetic-field/manifest.js';
import photoelectric     from '../sims/physics/photoelectric/manifest.js';

import bufferPh          from '../sims/chemistry/buffer-ph/manifest.js';
import crystalLattices   from '../sims/chemistry/crystal-lattices/manifest.js';
import hybridization     from '../sims/chemistry/hybridization/manifest.js';

import cellularRespiration from '../sims/biology/cellular-respiration/manifest.js';
import networkEpidemic   from '../sims/biology/network-epidemic/manifest.js';
import populationPyramid from '../sims/biology/population-pyramid/manifest.js';

import stellarParallax   from '../sims/earth-space/stellar-parallax/manifest.js';
import earthInterior     from '../sims/earth-space/earth-interior/manifest.js';
import hurricane         from '../sims/earth-space/hurricane/manifest.js';

import stackQueue        from '../sims/computer-science/stack-queue/manifest.js';
import fibonacci         from '../sims/computer-science/fibonacci/manifest.js';
import rsa               from '../sims/computer-science/rsa/manifest.js';

import bootstrap         from '../sims/data-science/bootstrap/manifest.js';
import decisionTree      from '../sims/data-science/decision-tree/manifest.js';
import timeSeries        from '../sims/data-science/time-series/manifest.js';

import yardSale          from '../sims/social-science/yard-sale/manifest.js';
import trustGame         from '../sims/social-science/trust-game/manifest.js';
import networkDiffusion  from '../sims/social-science/network-diffusion/manifest.js';

import galtonBoard       from '../sims/mathematics/galton-board/manifest.js';
import matrixMult        from '../sims/mathematics/matrix-mult/manifest.js';
import mandelbrot        from '../sims/mathematics/mandelbrot/manifest.js';

import yieldCurves       from '../sims/finance/yield-curves/manifest.js';
import sharpe            from '../sims/finance/sharpe/manifest.js';
import taxAccounts       from '../sims/finance/tax-accounts/manifest.js';

export const SIMS = [
  projectileMotion, pendulum, wavesOnString, electricField, newtonsCradle, lenses, springsShm,
  doublePendulum, doppler, diffraction, buoyancy, orbitalMech, rlcResonance,
  collisions1d, carnot, snell, magneticField, photoelectric,

  phIndicator, periodicTable, gasLaws, titration, bohrAtom, leChatelier, solubility,
  vsepr, phaseDiagram, beerLambert, collisionTheory, radioactiveDecay, aufbau, galvanicCell,
  bufferPh, crystalLattices, hybridization,

  punnett, cellExplorer, naturalSelection, dnaTranscription, ecosystem, enzymeActivity,
  osmosis, hardyWeinberg, actionPotential, pedigree, photosynthesis, ecg, mitosis, dnaReplication,
  cellularRespiration, networkEpidemic, populationPyramid,

  solarSystem, seasons, plateTectonics, moonPhases, greenhouse, eclipses, tides,
  coriolis, hrDiagram, mantleConvection, waterCycle, atmosphere, blackHole, hohmann,
  stellarParallax, earthInterior, hurricane,

  sortingViz, bst, pathfinding, logicGates, gameOfLife, fractals, caesarCipher,
  turingMachine, boids, elementaryCA, reactionDiffusion, mazeGeneration, geneticAlgo,
  hashTables, bigO, stackQueue, fibonacci, rsa,

  linearReg, distributions, kMeans, clt, bayes, confusionMatrix, outliers,
  anscombe, monteCarloPi, simpsons, gradientDescent, biasVariance, markovText, pca,
  bootstrap, decisionTree, timeSeries,

  supplyDemand, prisonersDilemma, populationDynamics, schelling, sirEpidemic, votingMethods,
  inequality, preferentialAtt, publicGoods, hawksDoves, stagHunt, ultimatum, bassDiffusion,
  medianVoter, yardSale, trustGame, networkDiffusion,

  functionPlotter, derivative, riemann, fourier, vectors, complexPlane, linearTrans, newtonsMethod,
  pythagorean, unitCircle, conicSections, piPolygons, triangleCenters,
  galtonBoard, matrixMult, mandelbrot,

  compoundInterest, loanAmortization, stockWalk, efficientFrontier, inflation, taxBrackets, dca, blackScholes,
  bondPricing, npv, phillipsCurve, capm, auctions,
  yieldCurves, sharpe, taxAccounts,
];

export const SIMS_BY_ID = Object.fromEntries(SIMS.map((s) => [`${s.subject}/${s.id}`, s]));

export function simsBySubject(subjectId) {
  return SIMS.filter((s) => s.subject === subjectId);
}

export function findSim(subjectId, simId) {
  return SIMS_BY_ID[`${subjectId}/${simId}`] ?? null;
}
