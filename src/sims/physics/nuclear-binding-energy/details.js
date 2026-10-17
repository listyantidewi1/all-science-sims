// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Calculate the binding energy of a nucleus from the mass defect, BE = [Z·m_H + N·m_n − M_atom]·931.494 MeV/u, and explain the shape of the BE/A curve with its maximum of 8.79 MeV near iron-56.',
      'Compute the energy released in the fission U-235 + n → Ba-141 + Kr-92 + 3n (≈ 173 MeV) and the fusion D + T → He-4 + n (17.6 MeV) from tabulated masses, and compare the energy per nucleon.',
      'Describe a chain reaction in terms of the multiplication factor k and explain how control rods and neutron leakage make a reactor subcritical (k < 1), critical (k = 1) or supercritical (k > 1).',
    ],
    id: [
      'Menghitung energi ikat inti dari defek massa, EI = [Z·m_H + N·m_n − M_atom]·931,494 MeV/u, dan menjelaskan bentuk kurva EI/A dengan maksimumnya 8,79 MeV dekat besi-56.',
      'Menghitung energi yang dilepaskan pada fisi U-235 + n → Ba-141 + Kr-92 + 3n (≈ 173 MeV) dan fusi D + T → He-4 + n (17,6 MeV) dari massa yang ditabelkan, serta membandingkan energi per nukleon.',
      'Mendeskripsikan reaksi berantai dengan faktor multiplikasi k dan menjelaskan bagaimana batang kendali dan kebocoran neutron membuat reaktor subkritis (k < 1), kritis (k = 1), atau superkritis (k > 1).',
    ],
  },
  tryThis: {
    en: [
      'On the curve, click He-4, Fe-56 and U-235. Notice that He-4 (7.07 MeV) sits well above its neighbours Li and Be, and that U-235 (7.59 MeV) is lower than Fe-56 (8.79 MeV).',
      'Open the fission panel and check the arithmetic: reactant mass 236.0526 u, product mass 235.8666 u, difference 0.186 u × 931.5 MeV/u ≈ 173 MeV.',
      'Compare energy per nucleon: fission gives about 0.73 MeV per nucleon, D–T fusion about 3.5 MeV per nucleon, nearly five times more.',
      'In the chain reaction, fire one neutron with the control rods withdrawn and watch k climb above 1. Insert the rods until k hovers near 1, then fully insert them so the reaction dies.',
    ],
    id: [
      'Pada kurva, klik He-4, Fe-56, dan U-235. Perhatikan bahwa He-4 (7,07 MeV) berada jauh di atas tetangganya Li dan Be, dan bahwa U-235 (7,59 MeV) lebih rendah daripada Fe-56 (8,79 MeV).',
      'Buka panel fisi dan periksa aritmetikanya: massa pereaksi 236,0526 u, massa produk 235,8666 u, selisih 0,186 u × 931,5 MeV/u ≈ 173 MeV.',
      'Bandingkan energi per nukleon: fisi memberi sekitar 0,73 MeV per nukleon, fusi D–T sekitar 3,5 MeV per nukleon, hampir lima kali lebih besar.',
      'Pada reaksi berantai, tembakkan satu neutron dengan batang kendali ditarik dan amati k naik di atas 1. Masukkan batang sampai k bertahan dekat 1, lalu masukkan sepenuhnya agar reaksi padam.',
    ],
  },

  learn: {
    background: {
      en: [
        'A nucleus weighs less than the protons and neutrons that make it up. The missing mass, the mass defect Δm, is the mass equivalent of the energy that was released when the nucleons bound together, and it is what you would have to supply to pull them apart again: the binding energy BE = Δm·c². Nuclear masses are listed as atomic masses in unified atomic mass units (1 u = 1.66054 × 10⁻²⁷ kg = 931.494 MeV/c²), so the convenient recipe is BE = [Z·m(¹H) + N·m_n − M_atom] × 931.494 MeV with m(¹H) = 1.007825 u and m_n = 1.008665 u; the electron masses cancel because the hydrogen atoms carry them. For iron-56 (Z = 26, N = 30) this gives 26 × 1.007825 + 30 × 1.008665 − 55.934936 = 0.5285 u, so BE = 492.3 MeV and BE/A = 8.79 MeV per nucleon.',
        'Plotting BE/A against mass number A gives the famous curve the sim draws from real data. It rises steeply for light nuclei, with helium-4 standing out as an unusually tightly bound peak (7.07 MeV), flattens around 8.5–8.8 MeV for A between 50 and 90, with the maximum at nickel-62 (8.795 MeV) and iron-56 (8.790 MeV), and then slowly declines to 7.57 MeV for uranium-238. The shape comes from a competition: the short-range strong force binds each nucleon only to its nearest neighbours, so BE/A would be constant for a large nucleus, but nucleons on the surface have fewer neighbours (which hurts small nuclei) and the long-range electric repulsion between protons grows as Z² (which hurts heavy nuclei). Any reaction that moves nucleons from lower to higher BE/A releases the difference as kinetic energy and radiation.',
        'Heavy nuclei can therefore release energy by splitting. When U-235 absorbs a slow neutron it forms an excited U-236 that fissions in many ways; one typical channel is U-235 + n → Ba-141 + Kr-92 + 3n. Adding the tabulated masses, the reactants total 236.0526 u and the products 235.8666 u, a defect of 0.186 u, or about 173 MeV per fission, roughly 0.73 MeV for every nucleon involved. One kilogram of U-235 contains 2.56 × 10²⁴ nuclei and could release about 7 × 10¹³ J, two million times more than burning a kilogram of coal. Light nuclei release energy by joining instead. The reaction used in fusion research, D + T → He-4 + n, has a mass defect of 0.0189 u and releases 17.6 MeV, 3.5 MeV per nucleon, but it only happens when the nuclei collide fast enough to overcome their electric repulsion, which means temperatures above 10⁸ K.',
        'Each fission releases two or three neutrons (2.43 on average for U-235), and if on average more than one of them goes on to cause another fission, the number of fissions grows geometrically: a chain reaction. The multiplication factor k is the number of fissions in one generation divided by the number in the previous generation. A reactor runs steadily at k = 1 (critical); k < 1 means the reaction dies out (subcritical), k > 1 means it grows (supercritical). The sim\'s chain-reaction panel has a block of U-235 nuclei, neutrons that fly in straight lines until they hit a nucleus, leave the block, or are captured, and control rods of boron or cadmium that absorb neutrons: inserting them lowers k. Real reactors also rely on a moderator (water or graphite) to slow neutrons down, because slow neutrons are far more likely to be captured by U-235.',
      ],
      id: [
        'Inti atom lebih ringan daripada proton dan neutron penyusunnya. Massa yang hilang, defek massa Δm, adalah setara massa dari energi yang dilepaskan ketika nukleon-nukleon terikat, dan itulah yang harus diberikan untuk memisahkannya kembali: energi ikat EI = Δm·c². Massa inti ditabelkan sebagai massa atom dalam satuan massa atom terpadu (1 u = 1,66054 × 10⁻²⁷ kg = 931,494 MeV/c²), sehingga resep praktisnya adalah EI = [Z·m(¹H) + N·m_n − M_atom] × 931,494 MeV dengan m(¹H) = 1,007825 u dan m_n = 1,008665 u; massa elektron saling meniadakan karena atom hidrogen membawanya. Untuk besi-56 (Z = 26, N = 30) ini memberi 26 × 1,007825 + 30 × 1,008665 − 55,934936 = 0,5285 u, sehingga EI = 492,3 MeV dan EI/A = 8,79 MeV per nukleon.',
        'Menggambar EI/A terhadap nomor massa A menghasilkan kurva terkenal yang digambar simulasi dari data nyata. Kurva naik tajam untuk inti ringan, dengan helium-4 menonjol sebagai puncak yang terikat luar biasa kuat (7,07 MeV), mendatar sekitar 8,5–8,8 MeV untuk A antara 50 dan 90, dengan maksimum pada nikel-62 (8,795 MeV) dan besi-56 (8,790 MeV), lalu perlahan turun ke 7,57 MeV untuk uranium-238. Bentuknya berasal dari persaingan: gaya kuat berjangkauan pendek hanya mengikat setiap nukleon dengan tetangga terdekatnya, sehingga EI/A akan konstan untuk inti besar, tetapi nukleon di permukaan punya lebih sedikit tetangga (merugikan inti kecil) dan tolakan listrik berjangkauan jauh antar proton tumbuh sebagai Z² (merugikan inti berat). Setiap reaksi yang memindahkan nukleon dari EI/A rendah ke EI/A tinggi melepaskan selisihnya sebagai energi kinetik dan radiasi.',
        'Inti berat karenanya dapat melepaskan energi dengan membelah. Ketika U-235 menyerap neutron lambat, terbentuk U-236 tereksitasi yang berfisi dengan banyak cara; satu saluran khas adalah U-235 + n → Ba-141 + Kr-92 + 3n. Menjumlahkan massa yang ditabelkan, pereaksi total 236,0526 u dan produk 235,8666 u, defek 0,186 u, atau sekitar 173 MeV per fisi, kira-kira 0,73 MeV untuk setiap nukleon yang terlibat. Satu kilogram U-235 mengandung 2,56 × 10²⁴ inti dan dapat melepaskan sekitar 7 × 10¹³ J, dua juta kali lebih besar daripada membakar sekilogram batu bara. Inti ringan melepaskan energi dengan bergabung. Reaksi yang dipakai dalam riset fusi, D + T → He-4 + n, memiliki defek massa 0,0189 u dan melepaskan 17,6 MeV, 3,5 MeV per nukleon, tetapi hanya terjadi ketika inti bertabrakan cukup cepat untuk mengatasi tolakan listriknya, yang berarti suhu di atas 10⁸ K.',
        'Setiap fisi melepaskan dua atau tiga neutron (rata-rata 2,43 untuk U-235), dan jika rata-rata lebih dari satu neutron itu menyebabkan fisi berikutnya, jumlah fisi tumbuh secara geometrik: reaksi berantai. Faktor multiplikasi k adalah jumlah fisi dalam satu generasi dibagi jumlah pada generasi sebelumnya. Reaktor berjalan stabil pada k = 1 (kritis); k < 1 berarti reaksi padam (subkritis), k > 1 berarti reaksi tumbuh (superkritis). Panel reaksi berantai di simulasi memiliki blok inti U-235, neutron yang terbang lurus sampai menabrak inti, keluar dari blok, atau ditangkap, serta batang kendali dari boron atau kadmium yang menyerap neutron: memasukkannya menurunkan k. Reaktor nyata juga mengandalkan moderator (air atau grafit) untuk memperlambat neutron, karena neutron lambat jauh lebih mungkin ditangkap U-235.',
      ],
    },
    figure: {
      caption: {
        en: 'Binding energy per nucleon against mass number for selected nuclides. Fusion of light nuclei (left arrow) and fission of heavy nuclei (right arrow) both move nucleons up the curve toward the iron peak and release the difference as energy.',
        id: 'Energi ikat per nukleon terhadap nomor massa untuk nuklida terpilih. Fusi inti ringan (panah kiri) dan fisi inti berat (panah kanan) sama-sama memindahkan nukleon naik di kurva menuju puncak besi dan melepaskan selisihnya sebagai energi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const pts = [[2, 1.11], [3, 2.83], [4, 7.07], [6, 5.33], [7, 5.61], [9, 6.46], [12, 7.68], [16, 7.98], [20, 8.03], [27, 8.33], [40, 8.55], [56, 8.79], [62, 8.795], [84, 8.72], [107, 8.55], [120, 8.50], [138, 8.39], [184, 8.05], [208, 7.87], [235, 7.59], [238, 7.57]];
        const x0 = 40, x1 = 345, y0 = 200, y1 = 24;
        const X = (A) => x0 + (A / 240) * (x1 - x0);
        const Y = (be) => y0 - (be / 9) * (y0 - y1);
        let d = '';
        pts.forEach(([A, be], i) => { d += (i ? 'L' : 'M') + X(A).toFixed(1) + ' ' + Y(be).toFixed(1) + ' '; });
        const dots = pts.map(([A, be]) => `<circle cx="${X(A).toFixed(1)}" cy="${Y(be).toFixed(1)}" r="2.6" fill="#3b82f6"/>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Binding energy per nucleon curve', 'Kurva energi ikat per nukleon')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:10px system-ui,sans-serif;fill:currentColor;opacity:.85}.m{stroke:currentColor;stroke-width:1.2;opacity:.5;fill:none}.a{stroke-width:2;fill:none}</style>
  <defs><marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#f59e0b"/></marker></defs>
  <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" class="m"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" class="m"/>
  <path d="${d}" fill="none" stroke="#3b82f6" stroke-width="1.6" opacity=".8"/>${dots}
  <text x="${(X(4) + 5).toFixed(1)}" y="${(Y(7.07) - 4).toFixed(1)}" class="s">He-4</text>
  <text x="${(X(56) - 8).toFixed(1)}" y="${(Y(8.79) - 8).toFixed(1)}" class="s">Fe-56</text>
  <text x="${(X(235) - 30).toFixed(1)}" y="${(Y(7.59) - 10).toFixed(1)}" class="s">U-235</text>
  <path d="M${X(2).toFixed(1)} ${(Y(1.11) - 6).toFixed(1)} Q ${X(2).toFixed(1)} ${Y(7).toFixed(1)} ${(X(4) - 6).toFixed(1)} ${(Y(7.07) + 2).toFixed(1)}" class="a" stroke="#f59e0b" marker-end="url(#ar)"/>
  <text x="${(X(2) + 4).toFixed(1)}" y="${Y(4).toFixed(1)}" class="s">${L('fusion', 'fusi')}</text>
  <path d="M${X(235).toFixed(1)} ${(Y(7.59) + 8).toFixed(1)} Q ${X(170).toFixed(1)} ${(Y(7.2)).toFixed(1)} ${(X(110) + 6).toFixed(1)} ${(Y(8.5) + 6).toFixed(1)}" class="a" stroke="#f59e0b" marker-end="url(#ar)"/>
  <text x="${X(150).toFixed(1)}" y="${(Y(7.0)).toFixed(1)}" class="s">${L('fission', 'fisi')}</text>
  <text x="${x0}" y="${y0 + 14}" class="s">0</text><text x="${(X(60) - 6).toFixed(1)}" y="${y0 + 14}" class="s">60</text><text x="${(X(120) - 8).toFixed(1)}" y="${y0 + 14}" class="s">120</text><text x="${(X(180) - 8).toFixed(1)}" y="${y0 + 14}" class="s">180</text><text x="${(X(240) - 12).toFixed(1)}" y="${y0 + 14}" class="s">240</text>
  <text x="${(x0 + x1) / 2 - 30}" y="${y0 + 30}">${L('mass number A', 'nomor massa A')}</text>
  <text x="${x0 - 30}" y="${Y(8) + 4}" class="s">8</text><text x="${x0 - 30}" y="${Y(4) + 4}" class="s">4</text><text x="${x0 - 30}" y="${Y(0) + 4}" class="s">0</text>
  <text x="2" y="${y1 - 8}" class="s">BE/A (MeV)</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Mass defect: Δm = Z·m(¹H) + N·m_n − M_atom; binding energy BE = Δm × 931.494 MeV/u. For Fe-56, Δm = 0.5285 u and BE = 492 MeV.',
        'BE/A peaks at about 8.8 MeV near A ≈ 56–62 (iron and nickel); He-4 is an exceptionally stable light nucleus at 7.07 MeV.',
        'Fission of a heavy nucleus and fusion of light nuclei both move nucleons toward the peak, releasing the difference in binding energy.',
        'U-235 + n → Ba-141 + Kr-92 + 3n releases about 173 MeV (0.186 u); D + T → He-4 + n releases 17.6 MeV (0.0189 u) but about five times more per nucleon.',
        'Multiplication factor k = fissions in one generation / fissions in the previous: k < 1 subcritical, k = 1 critical (steady reactor), k > 1 supercritical.',
        'Control rods (boron, cadmium) absorb neutrons to lower k; neutron leakage from a small fuel mass does the same, which is why a critical mass exists.',
      ],
      id: [
        'Defek massa: Δm = Z·m(¹H) + N·m_n − M_atom; energi ikat EI = Δm × 931,494 MeV/u. Untuk Fe-56, Δm = 0,5285 u dan EI = 492 MeV.',
        'EI/A memuncak sekitar 8,8 MeV dekat A ≈ 56–62 (besi dan nikel); He-4 adalah inti ringan yang luar biasa stabil pada 7,07 MeV.',
        'Fisi inti berat dan fusi inti ringan sama-sama memindahkan nukleon menuju puncak, melepaskan selisih energi ikatnya.',
        'U-235 + n → Ba-141 + Kr-92 + 3n melepaskan sekitar 173 MeV (0,186 u); D + T → He-4 + n melepaskan 17,6 MeV (0,0189 u) tetapi sekitar lima kali lebih besar per nukleon.',
        'Faktor multiplikasi k = fisi dalam satu generasi / fisi pada generasi sebelumnya: k < 1 subkritis, k = 1 kritis (reaktor stabil), k > 1 superkritis.',
        'Batang kendali (boron, kadmium) menyerap neutron untuk menurunkan k; kebocoran neutron dari massa bahan bakar yang kecil berefek sama, itulah sebabnya ada massa kritis.',
      ],
    },
    vocabulary: {
      en: [
        ['Mass defect Δm', 'The difference between the total mass of the separate nucleons and the mass of the nucleus; multiplied by c² (931.494 MeV per u) it gives the binding energy.'],
        ['Binding energy per nucleon BE/A', 'The binding energy divided by the number of nucleons; a measure of how tightly a nucleus is bound. Highest (≈ 8.8 MeV) for Fe and Ni.'],
        ['Fission', 'The splitting of a heavy nucleus such as U-235 into two medium-mass fragments plus two or three neutrons, releasing about 200 MeV.'],
        ['Fusion', 'The joining of two light nuclei into a heavier one, for example D + T → He-4 + n (17.6 MeV); needs temperatures of about 10⁸ K.'],
        ['Multiplication factor k', 'The average number of fissions caused by the neutrons from one fission. k = 1 keeps a reactor at constant power.'],
        ['Control rod', 'A rod of a strong neutron absorber (boron, cadmium, hafnium) that is pushed into a reactor core to lower k and withdrawn to raise it.'],
        ['Atomic mass unit u', '1/12 of the mass of a carbon-12 atom, 1.66054 × 10⁻²⁷ kg, equivalent to 931.494 MeV of energy.'],
      ],
      id: [
        ['Defek massa Δm', 'Selisih antara massa total nukleon-nukleon yang terpisah dan massa inti; dikalikan c² (931,494 MeV per u) memberi energi ikat.'],
        ['Energi ikat per nukleon EI/A', 'Energi ikat dibagi jumlah nukleon; ukuran seberapa kuat inti terikat. Tertinggi (≈ 8,8 MeV) untuk Fe dan Ni.'],
        ['Fisi', 'Pembelahan inti berat seperti U-235 menjadi dua fragmen bermassa sedang ditambah dua atau tiga neutron, melepaskan sekitar 200 MeV.'],
        ['Fusi', 'Penggabungan dua inti ringan menjadi inti yang lebih berat, misalnya D + T → He-4 + n (17,6 MeV); memerlukan suhu sekitar 10⁸ K.'],
        ['Faktor multiplikasi k', 'Jumlah rata-rata fisi yang disebabkan oleh neutron dari satu fisi. k = 1 menjaga reaktor pada daya tetap.'],
        ['Batang kendali', 'Batang dari penyerap neutron kuat (boron, kadmium, hafnium) yang didorong ke teras reaktor untuk menurunkan k dan ditarik untuk menaikkannya.'],
        ['Satuan massa atom u', '1/12 massa atom karbon-12, 1,66054 × 10⁻²⁷ kg, setara dengan energi 931,494 MeV.'],
      ],
    },
    misconceptions: {
      en: [
        ['Mass is "converted" into energy, so the energy comes from nowhere.', 'The energy was already there as binding energy. Mass and energy are the same quantity in different units (E = mc²); the products simply have less rest mass and more kinetic energy.'],
        ['Fission releases more energy than fusion.', 'Per reaction, yes (173 MeV vs 17.6 MeV), but per kilogram of fuel fusion wins: 3.5 MeV per nucleon against 0.73 MeV per nucleon, about five times more.'],
        ['Iron is the most stable element because it has the largest binding energy.', 'Iron-56 has the largest binding energy per nucleon (with Ni-62 very slightly higher). Total binding energy keeps increasing with A; U-238 has 1802 MeV in total but only 7.57 MeV per nucleon.'],
        ['A nuclear reactor is a slow nuclear bomb.', 'A reactor is held at k = 1 by control rods and the moderator, and its fuel is only 3–5 % U-235, which cannot sustain the fast, prompt-neutron chain a weapon needs. Reactors can overheat but cannot explode like a bomb.'],
      ],
      id: [
        ['Massa "diubah" menjadi energi, jadi energinya muncul dari ketiadaan.', 'Energi itu sudah ada sebagai energi ikat. Massa dan energi adalah besaran yang sama dalam satuan berbeda (E = mc²); produknya hanya memiliki massa diam lebih kecil dan energi kinetik lebih besar.'],
        ['Fisi melepaskan energi lebih besar daripada fusi.', 'Per reaksi, ya (173 MeV vs 17,6 MeV), tetapi per kilogram bahan bakar fusi menang: 3,5 MeV per nukleon dibanding 0,73 MeV per nukleon, sekitar lima kali lebih besar.'],
        ['Besi adalah unsur paling stabil karena memiliki energi ikat terbesar.', 'Besi-56 memiliki energi ikat per nukleon terbesar (dengan Ni-62 sedikit lebih tinggi). Energi ikat total terus bertambah dengan A; U-238 memiliki 1802 MeV total tetapi hanya 7,57 MeV per nukleon.'],
        ['Reaktor nuklir adalah bom nuklir yang lambat.', 'Reaktor dijaga pada k = 1 oleh batang kendali dan moderator, dan bahan bakarnya hanya 3–5 % U-235, yang tidak dapat mempertahankan rantai neutron cepat seperti yang dibutuhkan senjata. Reaktor bisa terlalu panas tetapi tidak bisa meledak seperti bom.'],
      ],
    },
    realWorld: {
      en: [
        'Nuclear power stations use U-235 fission at k = 1 to produce about 10 % of the world\'s electricity; one fuel pellet the size of a fingertip holds the energy of a tonne of coal.',
        'The Sun fuses 600 million tonnes of hydrogen into helium every second; the 0.7 % mass defect is the sunlight that reaches Earth.',
        'ITER and other tokamaks aim to run the D + T reaction at 150 million kelvin; the 14.1 MeV neutron carries most of the 17.6 MeV.',
        'Radioisotope dating and medical isotopes such as Tc-99m are fission products harvested from reactor fuel.',
        'Stellar nucleosynthesis builds elements only up to the iron peak by fusion; heavier elements like gold need the extra energy of supernovae or neutron-star mergers.',
      ],
      id: [
        'Pembangkit listrik tenaga nuklir memakai fisi U-235 pada k = 1 untuk menghasilkan sekitar 10 % listrik dunia; satu pelet bahan bakar seukuran ujung jari menyimpan energi setara satu ton batu bara.',
        'Matahari memfusikan 600 juta ton hidrogen menjadi helium setiap detik; defek massa 0,7 %-nya adalah sinar matahari yang mencapai Bumi.',
        'ITER dan tokamak lainnya bertujuan menjalankan reaksi D + T pada 150 juta kelvin; neutron 14,1 MeV membawa sebagian besar dari 17,6 MeV.',
        'Penanggalan radioisotop dan isotop medis seperti Tc-99m adalah produk fisi yang dipanen dari bahan bakar reaktor.',
        'Nukleosintesis bintang hanya membangun unsur sampai puncak besi melalui fusi; unsur yang lebih berat seperti emas memerlukan energi tambahan dari supernova atau penggabungan bintang neutron.',
      ],
    },
    questions: {
      en: [
        { q: 'Using m(¹H) = 1.007825 u, m_n = 1.008665 u and M(He-4) = 4.002602 u, find the binding energy and BE/A of helium-4.', a: 'Δm = 2(1.007825) + 2(1.008665) − 4.002602 = 0.030378 u. BE = 0.030378 × 931.494 = 28.30 MeV; BE/A = 7.07 MeV.' },
        { q: 'Compute the energy released in U-235 + n → Ba-141 + Kr-92 + 3n given M(U-235) = 235.043930 u, M(Ba-141) = 140.914411 u, M(Kr-92) = 91.926173 u.', a: 'Reactants: 235.043930 + 1.008665 = 236.052595 u. Products: 140.914411 + 91.926173 + 3(1.008665) = 235.866579 u. Δm = 0.186016 u → E = 173.3 MeV.' },
        { q: 'How much energy is released by the complete fission of 1.0 kg of U-235, at 173 MeV per fission?', a: 'Nuclei: 1000 g / 235 g·mol⁻¹ × 6.022 × 10²³ = 2.56 × 10²⁴. Energy: 2.56 × 10²⁴ × 173 × 10⁶ × 1.602 × 10⁻¹⁹ J ≈ 7.1 × 10¹³ J, about 20 GWh.' },
        { q: 'In a chain-reaction run the sim counts 8 fissions in one generation and 10 in the next. What is k, and what happens to the reaction if nothing changes?', a: 'k = 10/8 = 1.25, supercritical. The number of fissions grows by 25 % every generation and the reaction runs away until the fuel is used up or the rods are inserted.' },
      ],
      id: [
        { q: 'Dengan m(¹H) = 1,007825 u, m_n = 1,008665 u, dan M(He-4) = 4,002602 u, tentukan energi ikat dan EI/A helium-4.', a: 'Δm = 2(1,007825) + 2(1,008665) − 4,002602 = 0,030378 u. EI = 0,030378 × 931,494 = 28,30 MeV; EI/A = 7,07 MeV.' },
        { q: 'Hitung energi yang dilepaskan pada U-235 + n → Ba-141 + Kr-92 + 3n jika M(U-235) = 235,043930 u, M(Ba-141) = 140,914411 u, M(Kr-92) = 91,926173 u.', a: 'Pereaksi: 235,043930 + 1,008665 = 236,052595 u. Produk: 140,914411 + 91,926173 + 3(1,008665) = 235,866579 u. Δm = 0,186016 u → E = 173,3 MeV.' },
        { q: 'Berapa energi yang dilepaskan oleh fisi lengkap 1,0 kg U-235, pada 173 MeV per fisi?', a: 'Jumlah inti: 1000 g / 235 g·mol⁻¹ × 6,022 × 10²³ = 2,56 × 10²⁴. Energi: 2,56 × 10²⁴ × 173 × 10⁶ × 1,602 × 10⁻¹⁹ J ≈ 7,1 × 10¹³ J, sekitar 20 GWh.' },
        { q: 'Pada suatu reaksi berantai, simulasi menghitung 8 fisi dalam satu generasi dan 10 pada generasi berikutnya. Berapakah k, dan apa yang terjadi pada reaksi jika tidak ada yang berubah?', a: 'k = 10/8 = 1,25, superkritis. Jumlah fisi bertambah 25 % setiap generasi dan reaksi lepas kendali sampai bahan bakar habis atau batang kendali dimasukkan.' },
      ],
    },
  },
};
