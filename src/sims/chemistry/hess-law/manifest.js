export default {
  id: 'hess-law',
  subject: 'chemistry',
  title: { en: "Enthalpy Diagrams and Hess's Law", id: 'Diagram Entalpi dan Hukum Hess' },
  description: {
    en: 'Build a reaction pathway by dragging step reactions into a cycle, flipping any that run the wrong way, and watch the enthalpy level diagram add the ΔH values until the steps match the target reaction. A calculator mode uses a table of standard enthalpies of formation to compute ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants) and draws the same cycle through the elements.',
    id: 'Susun lintasan reaksi dengan menyeret reaksi-reaksi tahap ke dalam siklus, balik tahap yang arahnya keliru, dan amati diagram tingkat entalpi menjumlahkan nilai ΔH sampai tahap-tahapnya sesuai dengan reaksi target. Mode kalkulator menggunakan tabel entalpi pembentukan standar untuk menghitung ΔH°reaksi = ΣΔH°f(produk) − ΣΔH°f(pereaksi) dan menggambar siklus yang sama melalui unsur-unsurnya.',
  },
  topics: ['thermochemistry', 'enthalpy', 'energy'],
  grade: [11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
