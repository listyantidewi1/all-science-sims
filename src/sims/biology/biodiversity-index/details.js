// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Use quadrat sampling to estimate species richness and relative abundance in a habitat, and explain why more quadrats give a more reliable estimate.',
      'Calculate Simpson’s index of diversity D = 1 − Σ n(n−1)/N(N−1) and Shannon’s index H = −Σ p ln p from a table of species counts.',
      'Compare the biodiversity of a natural forest with a monoculture plantation, and predict how disturbance that removes species changes richness, evenness and both indices.',
    ],
    id: [
      'Menggunakan sampling kuadrat untuk memperkirakan kekayaan spesies dan kelimpahan relatif di suatu habitat, serta menjelaskan mengapa lebih banyak kuadrat memberi perkiraan yang lebih andal.',
      'Menghitung indeks keanekaragaman Simpson D = 1 − Σ n(n−1)/N(N−1) dan indeks Shannon H = −Σ p ln p dari tabel jumlah spesies.',
      'Membandingkan keanekaragaman hayati hutan alami dengan perkebunan monokultur, dan memprediksi bagaimana gangguan yang menghilangkan spesies mengubah kekayaan, kemerataan, dan kedua indeks.',
    ],
  },
  tryThis: {
    en: [
      'Place one quadrat in the forest and one in the plantation. Then add quadrats one at a time and watch Simpson D: after how many quadrats does it stop changing much?',
      'Compare 5 quadrats in the forest with 5 in the plantation. Which habitat has the higher richness S, and which has the higher evenness J?',
      'Set habitat B to Custom with richness 8 and dominance 0. Then raise dominance towards 1. Richness does not change, so why do D and H fall?',
      'Move the disturbance slider slowly from 0 to 100 %. Which species disappear first, and which index reacts first: Simpson or Shannon?',
    ],
    id: [
      'Letakkan satu kuadrat di hutan dan satu di perkebunan. Lalu tambahkan kuadrat satu per satu dan amati Simpson D: setelah berapa kuadrat nilainya hampir tidak berubah lagi?',
      'Bandingkan 5 kuadrat di hutan dengan 5 di perkebunan. Habitat mana yang kekayaan S-nya lebih tinggi, dan mana yang kemerataan J-nya lebih tinggi?',
      'Atur habitat B ke Custom dengan kekayaan 8 dan dominansi 0. Lalu naikkan dominansi menuju 1. Kekayaan tidak berubah, jadi mengapa D dan H turun?',
      'Geser kontrol gangguan perlahan dari 0 ke 100 %. Spesies mana yang hilang lebih dulu, dan indeks mana yang bereaksi lebih dulu: Simpson atau Shannon?',
    ],
  },

  learn: {
    background: {
      en: [
        'Biodiversity has two parts: how many species live in a place (species richness, S) and how evenly the individuals are spread among them (evenness). A habitat with 10 species where one of them makes up 95 % of all individuals is less diverse than one with 10 species that are equally common. Diversity indices combine richness and evenness into a single number so habitats can be compared and monitored over time.',
        'Ecologists rarely count every organism. Instead they sample with quadrats: square frames, often 1 m × 1 m, placed at random positions, inside which every individual is identified and counted. In this simulation each grid cell is one 1 m² quadrat; clicking it adds its contents to the sample for that habitat. Because the sample is random, a single quadrat can be very misleading; the indices settle down only after several quadrats, which is why real surveys use 10 or more.',
        'Simpson’s index of diversity is D = 1 − Σ nᵢ(nᵢ − 1) / [N(N − 1)], where nᵢ is the number of individuals of species i and N is the total. It is the probability that two individuals picked at random belong to different species, so it runs from 0 (one species) towards 1 and is most sensitive to the dominant species. Shannon’s index is H = −Σ pᵢ ln pᵢ with pᵢ = nᵢ/N; it is 0 for one species and reaches ln S when all S species are equally common, so evenness can be reported as J = H / ln S. Tropical rainforest plots typically give H between 3 and 4.5 and D above 0.9; an oil-palm or rubber monoculture gives H below 1 and D often below 0.5.',
        'The disturbance slider models habitat loss, logging or pollution: rare species vanish first, then populations of the survivors are thinned. Watch how richness drops in steps while the indices fall smoothly, and notice that when only the dominant species remains both indices reach zero even though the habitat may still look “green”.',
      ],
      id: [
        'Keanekaragaman hayati memiliki dua bagian: berapa banyak spesies yang hidup di suatu tempat (kekayaan spesies, S) dan seberapa merata individu tersebar di antara spesies tersebut (kemerataan). Habitat dengan 10 spesies yang 95 % individunya berasal dari satu spesies kurang beragam dibandingkan habitat dengan 10 spesies yang sama umum. Indeks keanekaragaman menggabungkan kekayaan dan kemerataan menjadi satu angka sehingga habitat dapat dibandingkan dan dipantau dari waktu ke waktu.',
        'Ahli ekologi jarang menghitung setiap organisme. Mereka mengambil sampel dengan kuadrat: bingkai persegi, sering 1 m × 1 m, yang diletakkan pada posisi acak, dan setiap individu di dalamnya diidentifikasi dan dihitung. Dalam simulasi ini setiap sel grid adalah satu kuadrat 1 m²; mengkliknya menambahkan isinya ke sampel habitat tersebut. Karena sampel bersifat acak, satu kuadrat saja bisa sangat menyesatkan; indeks baru stabil setelah beberapa kuadrat, itulah sebabnya survei nyata memakai 10 kuadrat atau lebih.',
        'Indeks keanekaragaman Simpson adalah D = 1 − Σ nᵢ(nᵢ − 1) / [N(N − 1)], dengan nᵢ jumlah individu spesies i dan N jumlah total. Nilainya adalah peluang dua individu yang diambil acak berasal dari spesies berbeda, sehingga berkisar dari 0 (satu spesies) menuju 1 dan paling peka terhadap spesies dominan. Indeks Shannon adalah H = −Σ pᵢ ln pᵢ dengan pᵢ = nᵢ/N; nilainya 0 untuk satu spesies dan mencapai ln S ketika semua S spesies sama umum, sehingga kemerataan dapat dilaporkan sebagai J = H / ln S. Petak hutan hujan tropis biasanya memberi H antara 3 dan 4,5 dan D di atas 0,9; monokultur kelapa sawit atau karet memberi H di bawah 1 dan D sering di bawah 0,5.',
        'Kontrol gangguan memodelkan hilangnya habitat, penebangan, atau pencemaran: spesies langka hilang lebih dulu, lalu populasi yang bertahan menipis. Amati bagaimana kekayaan turun bertahap sementara indeks turun mulus, dan perhatikan bahwa ketika hanya spesies dominan yang tersisa kedua indeks mencapai nol walaupun habitat masih tampak “hijau”.',
      ],
    },
    figure: {
      caption: {
        en: 'Two 1 m² quadrats with the same number of individuals (N = 12). Left: four species, three individuals each, p = 0.25 for every species, so D = 1 − 4·(3·2)/(12·11) = 0.82 and H = −4 × 0.25 ln 0.25 = 1.39 = ln 4 (evenness J = 1). Right: one dominant species with 9 of 12 individuals, D = 1 − (72 + 0 + 0 + 0)/132 = 0.45 and H = 0.84 (J = 0.60) even though S is still 4.',
        id: 'Dua kuadrat 1 m² dengan jumlah individu sama (N = 12). Kiri: empat spesies, tiga individu masing-masing, p = 0,25 untuk setiap spesies, sehingga D = 1 − 4·(3·2)/(12·11) = 0,82 dan H = −4 × 0,25 ln 0,25 = 1,39 = ln 4 (kemerataan J = 1). Kanan: satu spesies dominan dengan 9 dari 12 individu, D = 1 − (72 + 0 + 0 + 0)/132 = 0,45 dan H = 0,84 (J = 0,60) walaupun S tetap 4.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cols = ['#10b981', '#f59e0b', '#8b5cf6', '#38bdf8'];
        const dot = (x, y, c) => `<circle cx="${x}" cy="${y}" r="7" fill="${c}"/>`;
        let left = '';
        const leftSp = [0, 1, 2, 3, 1, 2, 3, 0, 2, 3, 0, 1];
        leftSp.forEach((s, i) => { left += dot(40 + (i % 4) * 28, 70 + Math.floor(i / 4) * 28, cols[s]); });
        let right = '';
        const rightSp = [0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3];
        rightSp.forEach((s, i) => { right += dot(220 + (i % 4) * 28, 70 + Math.floor(i / 4) * 28, cols[s]); });
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Two quadrats with equal N but different evenness and diversity indices', 'Dua kuadrat dengan N sama tetapi kemerataan dan indeks keanekaragaman berbeda')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.h{font:bold 11px system-ui,sans-serif;fill:currentColor}.q{fill:none;stroke:currentColor;stroke-width:1.4}.f{font:11px ui-monospace,monospace;fill:currentColor}</style>
  <text x="82" y="18" text-anchor="middle" class="h">${L('Even: S = 4, N = 12', 'Merata: S = 4, N = 12')}</text>
  <text x="262" y="18" text-anchor="middle" class="h">${L('Dominated: S = 4, N = 12', 'Didominasi: S = 4, N = 12')}</text>
  <rect x="24" y="54" width="116" height="100" class="q"/>
  ${left}
  <rect x="204" y="54" width="116" height="100" class="q"/>
  ${right}
  <text x="26" y="48">1 m</text><text x="206" y="48">1 m</text>
  <text x="82" y="172" text-anchor="middle" class="f">n = 3, 3, 3, 3</text>
  <text x="82" y="186" text-anchor="middle" class="f">D = 1 − 24/132 = 0.82</text>
  <text x="82" y="200" text-anchor="middle" class="f">H = 1.39 = ln 4, J = 1.00</text>
  <text x="262" y="172" text-anchor="middle" class="f">n = 9, 1, 1, 1</text>
  <text x="262" y="186" text-anchor="middle" class="f">D = 1 − 72/132 = 0.45</text>
  <text x="262" y="200" text-anchor="middle" class="f">H = 0.84, J = 0.60</text>
  <text x="180" y="226" text-anchor="middle">${L('D = 1 − Σ n(n−1)/N(N−1)      H = −Σ p ln p      J = H / ln S', 'D = 1 − Σ n(n−1)/N(N−1)      H = −Σ p ln p      J = H / ln S')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Species richness S counts species; evenness describes how equally individuals are shared among them. Diversity indices combine both.',
        'Simpson’s index of diversity D = 1 − Σ n(n−1)/N(N−1) is the chance that two randomly chosen individuals are different species; it ranges from 0 to nearly 1 and is dominated by the commonest species.',
        'Shannon’s index H = −Σ p ln p rises with both richness and evenness; its maximum is ln S, so J = H/ln S measures evenness alone.',
        'Quadrat sampling estimates a habitat from a small random fraction of it; estimates only become reliable after many quadrats, and quadrat positions must be random to avoid bias.',
        'Natural tropical forest typically has H ≈ 3–4.5 and D > 0.9; monoculture plantations have H < 1 because one planted species dominates.',
        'Disturbance removes rare species first; richness drops in steps while the indices fall smoothly, and both indices reach 0 when a single species remains.',
      ],
      id: [
        'Kekayaan spesies S menghitung jumlah spesies; kemerataan menggambarkan seberapa setara individu terbagi di antara spesies. Indeks keanekaragaman menggabungkan keduanya.',
        'Indeks keanekaragaman Simpson D = 1 − Σ n(n−1)/N(N−1) adalah peluang dua individu yang dipilih acak berbeda spesies; nilainya 0 sampai hampir 1 dan didominasi spesies yang paling umum.',
        'Indeks Shannon H = −Σ p ln p naik seiring kekayaan dan kemerataan; maksimumnya ln S, sehingga J = H/ln S mengukur kemerataan saja.',
        'Sampling kuadrat memperkirakan habitat dari sebagian kecil acak; perkiraan baru andal setelah banyak kuadrat, dan posisi kuadrat harus acak untuk menghindari bias.',
        'Hutan tropis alami biasanya memiliki H ≈ 3–4,5 dan D > 0,9; perkebunan monokultur memiliki H < 1 karena satu spesies tanaman mendominasi.',
        'Gangguan menghilangkan spesies langka lebih dulu; kekayaan turun bertahap sementara indeks turun mulus, dan kedua indeks mencapai 0 ketika hanya satu spesies tersisa.',
      ],
    },
    vocabulary: {
      en: [
        ['Species richness (S)', 'The number of different species recorded in a sample or habitat.'],
        ['Evenness', 'How equally the individuals are distributed among the species; J = H / ln S ranges from 0 to 1.'],
        ['Quadrat', 'A square sampling frame (here 1 m²) within which every individual is counted; placed at random to avoid bias.'],
        ['Simpson’s index of diversity (D)', 'D = 1 − Σ n(n−1)/N(N−1): the probability that two individuals drawn at random are of different species.'],
        ['Shannon index (H)', 'H = −Σ pᵢ ln pᵢ, where pᵢ is the proportion of individuals in species i; maximum ln S.'],
        ['Monoculture', 'An area planted with a single crop species, such as an oil-palm plantation, giving very low diversity.'],
        ['Disturbance', 'Any event (logging, fire, pollution, land conversion) that removes individuals or whole species from a habitat.'],
      ],
      id: [
        ['Kekayaan spesies (S)', 'Jumlah spesies berbeda yang tercatat dalam sampel atau habitat.'],
        ['Kemerataan', 'Seberapa setara individu terbagi di antara spesies; J = H / ln S berkisar 0 sampai 1.'],
        ['Kuadrat', 'Bingkai sampel persegi (di sini 1 m²) yang setiap individu di dalamnya dihitung; diletakkan acak untuk menghindari bias.'],
        ['Indeks keanekaragaman Simpson (D)', 'D = 1 − Σ n(n−1)/N(N−1): peluang dua individu yang diambil acak berasal dari spesies berbeda.'],
        ['Indeks Shannon (H)', 'H = −Σ pᵢ ln pᵢ, dengan pᵢ proporsi individu spesies i; maksimum ln S.'],
        ['Monokultur', 'Area yang ditanami satu spesies tanaman, seperti perkebunan kelapa sawit, dengan keanekaragaman sangat rendah.'],
        ['Gangguan', 'Setiap peristiwa (penebangan, kebakaran, pencemaran, alih fungsi lahan) yang menghilangkan individu atau seluruh spesies dari habitat.'],
      ],
    },
    misconceptions: {
      en: [
        ['The habitat with more individuals is more biodiverse.', 'Total numbers do not matter. A plantation can hold more individual plants than a forest patch yet score far lower because nearly all of them are the same species.'],
        ['Two habitats with the same number of species are equally diverse.', 'Evenness matters too. In the figure both quadrats have S = 4, but D falls from 0.82 to 0.45 when one species makes up 9 of the 12 individuals.'],
        ['One quadrat is enough if it is placed carefully in a “typical” spot.', 'Choosing the spot introduces bias, and one quadrat misses rare species by chance. Random placement and many quadrats are needed before the indices settle.'],
        ['A lower Simpson value always means more diversity.', 'It depends which form is used. The sim reports Simpson’s index of diversity D = 1 − Σn(n−1)/N(N−1), which rises with diversity; the raw Simpson dominance Σn(n−1)/N(N−1) falls with diversity. Always check the formula.'],
      ],
      id: [
        ['Habitat dengan lebih banyak individu lebih beragam.', 'Jumlah total tidak menentukan. Perkebunan bisa memuat lebih banyak individu tumbuhan daripada petak hutan tetapi skornya jauh lebih rendah karena hampir semuanya spesies yang sama.'],
        ['Dua habitat dengan jumlah spesies sama berarti sama beragamnya.', 'Kemerataan juga penting. Pada gambar kedua kuadrat memiliki S = 4, tetapi D turun dari 0,82 ke 0,45 ketika satu spesies menyusun 9 dari 12 individu.'],
        ['Satu kuadrat cukup jika diletakkan dengan cermat di tempat yang “tipikal”.', 'Memilih tempat menimbulkan bias, dan satu kuadrat melewatkan spesies langka secara kebetulan. Penempatan acak dan banyak kuadrat diperlukan sebelum indeks stabil.'],
        ['Nilai Simpson lebih rendah selalu berarti lebih beragam.', 'Tergantung bentuk rumus yang dipakai. Simulasi melaporkan indeks keanekaragaman Simpson D = 1 − Σn(n−1)/N(N−1), yang naik dengan keanekaragaman; dominansi Simpson mentah Σn(n−1)/N(N−1) turun dengan keanekaragaman. Selalu periksa rumusnya.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesia is one of 17 “megadiverse” countries: with about 1.3 % of the world’s land it holds roughly 10 % of flowering plant species and 17 % of bird species.',
        'Field studies in Sumatra and Kalimantan find that converting lowland rainforest to oil palm removes more than half of the forest bird and butterfly species and cuts Shannon diversity by two thirds or more.',
        'Environmental impact assessments for mines, roads and plantations in Indonesia must report species richness and diversity indices from quadrat or transect surveys before and after the project.',
        'Coral-reef monitoring programmes such as Reef Check use the same indices on transects to track how bleaching and blast fishing change fish and coral diversity.',
        'Shannon’s index was borrowed from information theory, where H measures the uncertainty of the next symbol in a message; here it measures the uncertainty of the species of the next individual you find.',
      ],
      id: [
        'Indonesia adalah salah satu dari 17 negara “megabiodiversitas”: dengan sekitar 1,3 % daratan dunia, Indonesia memiliki kira-kira 10 % spesies tumbuhan berbunga dan 17 % spesies burung.',
        'Studi lapangan di Sumatra dan Kalimantan menemukan bahwa konversi hutan hujan dataran rendah menjadi kelapa sawit menghilangkan lebih dari separuh spesies burung dan kupu-kupu hutan serta memangkas keanekaragaman Shannon dua pertiga atau lebih.',
        'Analisis mengenai dampak lingkungan (AMDAL) untuk tambang, jalan, dan perkebunan di Indonesia harus melaporkan kekayaan spesies dan indeks keanekaragaman dari survei kuadrat atau transek sebelum dan sesudah proyek.',
        'Program pemantauan terumbu karang seperti Reef Check memakai indeks yang sama pada transek untuk melacak bagaimana pemutihan dan penangkapan ikan dengan bom mengubah keanekaragaman ikan dan karang.',
        'Indeks Shannon dipinjam dari teori informasi, yang H-nya mengukur ketidakpastian simbol berikutnya dalam pesan; di sini H mengukur ketidakpastian spesies individu berikutnya yang kamu temukan.',
      ],
    },
    questions: {
      en: [
        { q: 'A quadrat sample contains 6 individuals of species A, 3 of species B and 1 of species C. Calculate N, S and Simpson’s index of diversity D.', a: 'N = 10, S = 3. Σ n(n−1) = 6·5 + 3·2 + 1·0 = 36. N(N−1) = 90. D = 1 − 36/90 = 0.60.' },
        { q: 'For the same sample, calculate Shannon’s H and the evenness J. (ln 0.6 = −0.511, ln 0.3 = −1.204, ln 0.1 = −2.303, ln 3 = 1.099)', a: 'H = −(0.6×−0.511 + 0.3×−1.204 + 0.1×−2.303) = 0.307 + 0.361 + 0.230 = 0.898. J = 0.898 / 1.099 = 0.82.' },
        { q: 'In the sim a single forest quadrat gave D = 0.55, but after 8 quadrats D = 0.88. Which value should be reported, and why?', a: 'The 8-quadrat value. One quadrat is a tiny random sample that happened to miss most species; pooling many random quadrats approaches the true community composition and the estimate stops changing.' },
        { q: 'The disturbance slider is at 60 %: three rare species have gone but the two commonest species are still present. Explain why Shannon’s H dropped more than Simpson’s D.', a: 'Simpson’s D is governed mainly by the probability of drawing the dominant species twice, which barely changes when rare species vanish. Shannon’s H gives every species a term −p ln p, so losing species, even rare ones, removes those terms and lowers H noticeably.' },
      ],
      id: [
        { q: 'Sebuah sampel kuadrat berisi 6 individu spesies A, 3 spesies B, dan 1 spesies C. Hitung N, S, dan indeks keanekaragaman Simpson D.', a: 'N = 10, S = 3. Σ n(n−1) = 6·5 + 3·2 + 1·0 = 36. N(N−1) = 90. D = 1 − 36/90 = 0,60.' },
        { q: 'Untuk sampel yang sama, hitung Shannon H dan kemerataan J. (ln 0,6 = −0,511; ln 0,3 = −1,204; ln 0,1 = −2,303; ln 3 = 1,099)', a: 'H = −(0,6×−0,511 + 0,3×−1,204 + 0,1×−2,303) = 0,307 + 0,361 + 0,230 = 0,898. J = 0,898 / 1,099 = 0,82.' },
        { q: 'Dalam simulasi satu kuadrat hutan memberi D = 0,55, tetapi setelah 8 kuadrat D = 0,88. Nilai mana yang harus dilaporkan, dan mengapa?', a: 'Nilai 8 kuadrat. Satu kuadrat adalah sampel acak yang sangat kecil dan kebetulan melewatkan sebagian besar spesies; menggabungkan banyak kuadrat acak mendekati komposisi komunitas sebenarnya dan perkiraan berhenti berubah.' },
        { q: 'Kontrol gangguan pada 60 %: tiga spesies langka hilang tetapi dua spesies paling umum masih ada. Jelaskan mengapa Shannon H turun lebih banyak daripada Simpson D.', a: 'Simpson D terutama ditentukan oleh peluang mengambil spesies dominan dua kali, yang hampir tidak berubah saat spesies langka hilang. Shannon H memberi setiap spesies suku −p ln p, sehingga hilangnya spesies, walau langka, menghapus suku-suku itu dan menurunkan H secara nyata.' },
      ],
    },
  },
};
