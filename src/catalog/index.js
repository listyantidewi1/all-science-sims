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

import trussAnalyzer     from '../sims/engineering/truss-analyzer/manifest.js';
import beamBending       from '../sims/engineering/beam-bending/manifest.js';
import pidController     from '../sims/engineering/pid-controller/manifest.js';
import gearRatios        from '../sims/engineering/gear-ratios/manifest.js';
import pulleySystem      from '../sims/engineering/pulley-system/manifest.js';
import opAmp             from '../sims/engineering/op-amp/manifest.js';
import rcFilter          from '../sims/engineering/rc-filter/manifest.js';
import stressStrain      from '../sims/engineering/stress-strain/manifest.js';

import beatFrequencies   from '../sims/music/beat-frequencies/manifest.js';
import harmonicSeries    from '../sims/music/harmonic-series/manifest.js';
import equalTemperament  from '../sims/music/equal-temperament/manifest.js';
import adsrEnvelope      from '../sims/music/adsr-envelope/manifest.js';
import formants          from '../sims/music/formants/manifest.js';
import polyrhythms       from '../sims/music/polyrhythms/manifest.js';
import melScale          from '../sims/music/mel-scale/manifest.js';
import chordBuilder      from '../sims/music/chord-builder/manifest.js';

import carbonCycle       from '../sims/climate/carbon-cycle/manifest.js';
import iceAlbedo         from '../sims/climate/ice-albedo/manifest.js';
import energyMix         from '../sims/climate/energy-mix/manifest.js';
import seaLevelRise      from '../sims/climate/sea-level-rise/manifest.js';
import oceanAcidification from '../sims/climate/ocean-acidification/manifest.js';
import solarPanel        from '../sims/climate/solar-panel/manifest.js';
import daisyworld        from '../sims/climate/daisyworld/manifest.js';
import carbonFootprint   from '../sims/climate/carbon-footprint/manifest.js';

// 1.8.0: school-curriculum staples
import inclinedPlane     from '../sims/physics/inclined-plane/manifest.js';
import hookesLaw         from '../sims/physics/hookes-law/manifest.js';
import atwood            from '../sims/physics/atwood/manifest.js';
import mirrors           from '../sims/physics/mirrors/manifest.js';
import stoichiometry     from '../sims/chemistry/stoichiometry/manifest.js';
import calorimetry       from '../sims/chemistry/calorimetry/manifest.js';
import electrolysis      from '../sims/chemistry/electrolysis/manifest.js';
import cardiacCycle      from '../sims/biology/cardiac-cycle/manifest.js';
import foodWeb           from '../sims/biology/food-web/manifest.js';
import microscope        from '../sims/biology/microscope/manifest.js';
import rockCycle         from '../sims/earth-space/rock-cycle/manifest.js';
import quadratic         from '../sims/mathematics/quadratic/manifest.js';
import slopeIntercept    from '../sims/mathematics/slope-intercept/manifest.js';
import pascalTriangle    from '../sims/mathematics/pascal-triangle/manifest.js';
import fractions         from '../sims/mathematics/fractions/manifest.js';
import binaryNumbers     from '../sims/computer-science/binary-numbers/manifest.js';
import towerOfHanoi      from '../sims/computer-science/tower-of-hanoi/manifest.js';
import boxPlot           from '../sims/data-science/box-plot/manifest.js';
import correlation       from '../sims/data-science/correlation/manifest.js';
import logisticGrowth    from '../sims/social-science/logistic-growth/manifest.js';

// 1.9.0: balance + breadth wave
import ottoCycle         from '../sims/engineering/otto-cycle/manifest.js';
import wheatstone        from '../sims/engineering/wheatstone/manifest.js';
import transformer       from '../sims/engineering/transformer/manifest.js';
import heatSink          from '../sims/engineering/heat-sink/manifest.js';
import fmSynthesis       from '../sims/music/fm-synthesis/manifest.js';
import compressor        from '../sims/music/compressor/manifest.js';
import dopplerAudio      from '../sims/music/doppler-audio/manifest.js';
import scalesModes       from '../sims/music/scales-modes/manifest.js';
import ghgAbsorption     from '../sims/climate/ghg-absorption/manifest.js';
import enso              from '../sims/climate/enso/manifest.js';
import methaneVsCo2      from '../sims/climate/methane-vs-co2/manifest.js';
import ozoneLayer        from '../sims/climate/ozone-layer/manifest.js';
import bernoulli         from '../sims/physics/bernoulli/manifest.js';
import circuits          from '../sims/physics/circuits/manifest.js';
import emissionSpectra   from '../sims/chemistry/emission-spectra/manifest.js';
import activationEnergy  from '../sims/chemistry/activation-energy/manifest.js';
import meiosis           from '../sims/biology/meiosis/manifest.js';
import antibioticResistance from '../sims/biology/antibiotic-resistance/manifest.js';
import starLifeCycle     from '../sims/earth-space/star-life-cycle/manifest.js';
import volcanoTypes      from '../sims/earth-space/volcano-types/manifest.js';
import vennDiagrams      from '../sims/mathematics/venn-diagrams/manifest.js';
import systemOfEquations from '../sims/mathematics/system-of-equations/manifest.js';
import finiteStateAutomata from '../sims/computer-science/finite-state-automata/manifest.js';
import pValue            from '../sims/data-science/p-value/manifest.js';
import titForTat         from '../sims/social-science/tit-for-tat/manifest.js';

// 1.10.0: Psychology + Cognitive Science
import stroopTest        from '../sims/psychology/stroop-test/manifest.js';
import reactionTime      from '../sims/psychology/reaction-time/manifest.js';
import anchoringBias     from '../sims/psychology/anchoring-bias/manifest.js';
import forgettingCurve   from '../sims/psychology/forgetting-curve/manifest.js';
import aschConformity    from '../sims/psychology/asch-conformity/manifest.js';
import classicalConditioning from '../sims/psychology/classical-conditioning/manifest.js';
import serialPosition    from '../sims/psychology/serial-position/manifest.js';
import operantConditioning from '../sims/psychology/operant-conditioning/manifest.js';
import webersLaw         from '../sims/psychology/webers-law/manifest.js';
import bystanderEffect   from '../sims/psychology/bystander-effect/manifest.js';
import opticalIllusions  from '../sims/cognitive-science/optical-illusions/manifest.js';
import visualSearch      from '../sims/cognitive-science/visual-search/manifest.js';
import mentalRotation    from '../sims/cognitive-science/mental-rotation/manifest.js';
import digitSpan         from '../sims/cognitive-science/digit-span/manifest.js';
import signalDetection   from '../sims/cognitive-science/signal-detection/manifest.js';
import changeBlindness   from '../sims/cognitive-science/change-blindness/manifest.js';
import posnerCueing      from '../sims/cognitive-science/posner-cueing/manifest.js';
import flankerTask       from '../sims/cognitive-science/flanker-task/manifest.js';
import nBack             from '../sims/cognitive-science/n-back/manifest.js';
import driftDiffusion    from '../sims/cognitive-science/drift-diffusion/manifest.js';
import floatingSinking   from '../sims/physics/floating-sinking/manifest.js';
import pushPullFriction  from '../sims/physics/push-pull-friction/manifest.js';
import digestiveSystem   from '../sims/biology/digestive-system/manifest.js';
import weatherStation    from '../sims/earth-space/weather-station/manifest.js';
import earthquakeWaves   from '../sims/earth-space/earthquake-waves/manifest.js';
import energyTransfers   from '../sims/physics/energy-transfers/manifest.js';
import ratioProportion   from '../sims/mathematics/ratio-proportion/manifest.js';
import airPressureWeather from '../sims/earth-space/air-pressure-weather/manifest.js';
import electromagnet     from '../sims/physics/electromagnet/manifest.js';
import separatingMixtures from '../sims/chemistry/separating-mixtures/manifest.js';
import physicalChemicalChange from '../sims/chemistry/physical-chemical-change/manifest.js';
import breathingLungs    from '../sims/biology/breathing-lungs/manifest.js';
import simpleCircuit     from '../sims/physics/simple-circuit/manifest.js';
import plantGrowth       from '../sims/biology/plant-growth/manifest.js';
import lifeCycles        from '../sims/biology/life-cycles/manifest.js';
import dayAndNight       from '../sims/earth-space/day-and-night/manifest.js';
import statesOfMatter    from '../sims/chemistry/states-of-matter/manifest.js';
import lightAndShadows   from '../sims/physics/light-and-shadows/manifest.js';
import soundVibrations   from '../sims/physics/sound-vibrations/manifest.js';
import magnets           from '../sims/physics/magnets/manifest.js';
import density           from '../sims/chemistry/density/manifest.js';
import particleModel     from '../sims/chemistry/particle-model/manifest.js';
import heatTransfer      from '../sims/physics/heat-transfer/manifest.js';
import speedDistanceTime from '../sims/physics/speed-distance-time/manifest.js';

import bloodJourney from '../sims/biology/blood-journey/manifest.js';
import dichotomousKey from '../sims/biology/dichotomous-key/manifest.js';
import fiveSenses from '../sims/biology/five-senses/manifest.js';
import pondEcosystem from '../sims/biology/pond-ecosystem/manifest.js';
import riverHealth from '../sims/biology/river-health/manifest.js';
import dissolving from '../sims/chemistry/dissolving/manifest.js';
import forestAndFlood from '../sims/climate/forest-and-flood/manifest.js';
import saveEnergyHome from '../sims/climate/save-energy-home/manifest.js';
import earthRotationRevolution from '../sims/earth-space/earth-rotation-revolution/manifest.js';
import pocketMoney from '../sims/finance/pocket-money/manifest.js';
import angles from '../sims/mathematics/angles/manifest.js';
import areaPerimeter from '../sims/mathematics/area-perimeter/manifest.js';
import barChartsPictograms from '../sims/mathematics/bar-charts-pictograms/manifest.js';
import circleGeometry from '../sims/mathematics/circle-geometry/manifest.js';
import clockTime from '../sims/mathematics/clock-time/manifest.js';
import cuboidVolume from '../sims/mathematics/cuboid-volume/manifest.js';
import integersNumberLine from '../sims/mathematics/integers-number-line/manifest.js';
import linearEquationBalance from '../sims/mathematics/linear-equation-balance/manifest.js';
import meanMedianMode from '../sims/mathematics/mean-median-mode/manifest.js';
import multiplicationArrays from '../sims/mathematics/multiplication-arrays/manifest.js';
import numberLine from '../sims/mathematics/number-line/manifest.js';
import placeValueBlocks from '../sims/mathematics/place-value-blocks/manifest.js';
import similarTriangles from '../sims/mathematics/similar-triangles/manifest.js';
import solidsVolume from '../sims/mathematics/solids-volume/manifest.js';
import bentStrawRefraction from '../sims/physics/bent-straw-refraction/manifest.js';
import electromagneticInduction from '../sims/physics/electromagnetic-induction/manifest.js';
import energyChain from '../sims/physics/energy-chain/manifest.js';
import eyeAndGlasses from '../sims/physics/eye-and-glasses/manifest.js';
import forcesShapeMotion from '../sims/physics/forces-shape-motion/manifest.js';
import hotSpoonConduction from '../sims/physics/hot-spoon-conduction/manifest.js';
import hydraulicLift from '../sims/physics/hydraulic-lift/manifest.js';
import leverClasses from '../sims/physics/lever-classes/manifest.js';
import liquidPressureDepth from '../sims/physics/liquid-pressure-depth/manifest.js';
import measurementUnits from '../sims/physics/measurement-units/manifest.js';
import mirrorReflection from '../sims/physics/mirror-reflection/manifest.js';
import motionGraphs from '../sims/physics/motion-graphs/manifest.js';
import newtonsSecondLaw from '../sims/physics/newtons-second-law/manifest.js';
import pressureSolids from '../sims/physics/pressure-solids/manifest.js';
import seesawLever from '../sims/physics/seesaw-lever/manifest.js';
import staticElectricity from '../sims/physics/static-electricity/manifest.js';
import thermalExpansion from '../sims/physics/thermal-expansion/manifest.js';

import factorsMultiples from '../sims/mathematics/factors-multiples/manifest.js';
import waveAnatomy from '../sims/physics/wave-anatomy/manifest.js';
import transformations from '../sims/mathematics/transformations/manifest.js';

import angleRelationships from '../sims/mathematics/angle-relationships/manifest.js';

import soundThroughMaterials from '../sims/physics/sound-through-materials/manifest.js';

import compassMap from '../sims/earth-space/compass-map/manifest.js';

import doubleCirculation from '../sims/biology/double-circulation/manifest.js';
import nephronFilter from '../sims/biology/nephron-filter/manifest.js';
import earthMoonSunPositions from '../sims/earth-space/earth-moon-sun-positions/manifest.js';

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

  trussAnalyzer, beamBending, pidController,
  gearRatios, pulleySystem, opAmp, rcFilter, stressStrain,

  beatFrequencies, harmonicSeries, equalTemperament,
  adsrEnvelope, formants, polyrhythms, melScale, chordBuilder,

  carbonCycle, iceAlbedo, energyMix,
  seaLevelRise, oceanAcidification, solarPanel, daisyworld, carbonFootprint,

  // 1.8.0 school-curriculum wave
  inclinedPlane, hookesLaw, atwood, mirrors,
  stoichiometry, calorimetry, electrolysis,
  cardiacCycle, foodWeb, microscope,
  rockCycle,
  quadratic, slopeIntercept, pascalTriangle, fractions,
  binaryNumbers, towerOfHanoi,
  boxPlot, correlation,
  logisticGrowth,

  // 1.9.0
  ottoCycle, wheatstone, transformer, heatSink,
  fmSynthesis, compressor, dopplerAudio, scalesModes,
  ghgAbsorption, enso, methaneVsCo2, ozoneLayer,
  bernoulli, circuits,
  emissionSpectra, activationEnergy,
  meiosis, antibioticResistance,
  starLifeCycle, volcanoTypes,
  vennDiagrams, systemOfEquations,
  finiteStateAutomata,
  pValue,
  titForTat,

  // 1.10.0
  stroopTest, reactionTime, anchoringBias, forgettingCurve, aschConformity, classicalConditioning,
  opticalIllusions, visualSearch, mentalRotation, digitSpan, signalDetection, changeBlindness,

  // 1.17.0
  serialPosition, operantConditioning, webersLaw, bystanderEffect,
  posnerCueing, flankerTask, nBack, driftDiffusion,

  // 1.18.0 — primary and middle school
  floatingSinking, pushPullFriction, digestiveSystem, weatherStation,
  earthquakeWaves, energyTransfers, ratioProportion, airPressureWeather,
  electromagnet, separatingMixtures, physicalChemicalChange, breathingLungs,
  simpleCircuit, plantGrowth, lifeCycles, dayAndNight,
  statesOfMatter, lightAndShadows, soundVibrations, magnets,
  density, particleModel, heatTransfer, speedDistanceTime,

  // 1.20.0 — Kurikulum Merdeka CP 2025, primary and middle school
  doubleCirculation, nephronFilter, earthMoonSunPositions,
  compassMap,
  soundThroughMaterials,
  angleRelationships,
  factorsMultiples, waveAnatomy, transformations,
  bloodJourney, dichotomousKey, fiveSenses, pondEcosystem, riverHealth, dissolving, forestAndFlood, saveEnergyHome, earthRotationRevolution, pocketMoney, angles, areaPerimeter, barChartsPictograms, circleGeometry, clockTime, cuboidVolume, integersNumberLine, linearEquationBalance, meanMedianMode, multiplicationArrays, numberLine, placeValueBlocks, similarTriangles, solidsVolume, bentStrawRefraction, electromagneticInduction, energyChain, eyeAndGlasses, forcesShapeMotion, hotSpoonConduction, hydraulicLift, leverClasses, liquidPressureDepth, measurementUnits, mirrorReflection, motionGraphs, newtonsSecondLaw, pressureSolids, seesawLever, staticElectricity, thermalExpansion,
];

export const SIMS_BY_ID = Object.fromEntries(SIMS.map((s) => [`${s.subject}/${s.id}`, s]));

export function simsBySubject(subjectId) {
  return SIMS.filter((s) => s.subject === subjectId);
}

export function findSim(subjectId, simId) {
  return SIMS_BY_ID[`${subjectId}/${simId}`] ?? null;
}
