// Long-form text for the Immune Response and Vaccines sim (grade 11–12).
export default {
  objectives: {
    en: [
      'Sequence the events of an immune response: innate phagocytosis, antigen presentation, helper T cell activation, B cell clonal selection, plasma cells secreting antibodies, and memory cell formation.',
      'Read an antibody-concentration graph to measure lag time, days to peak, peak level and days of illness for a primary and a secondary response, and explain why the secondary response is faster and larger.',
      'Explain how a vaccine produces immunological memory without disease, and use measured peak values to argue why booster doses and high coverage matter.',
    ],
    id: [
      'Mengurutkan peristiwa respons imun: fagositosis bawaan, presentasi antigen, aktivasi sel T penolong, seleksi klonal sel B, sel plasma yang menyekresi antibodi, dan pembentukan sel memori.',
      'Membaca grafik konsentrasi antibodi untuk mengukur waktu jeda, hari sampai puncak, kadar puncak dan hari sakit pada respons primer dan sekunder, serta menjelaskan mengapa respons sekunder lebih cepat dan lebih besar.',
      'Menjelaskan bagaimana vaksin menghasilkan memori imunologis tanpa penyakit, dan menggunakan nilai puncak terukur untuk berargumen mengapa dosis penguat dan cakupan tinggi itu penting.',
    ],
  },
  tryThis: {
    en: [
      'Expose a fresh body to the pathogen. Count the days before antibodies appear, the day of the antibody peak, and how many days the body is ill.',
      'Wait until day 60 (or press Skip 30 days twice) and expose it again. Compare the lag, the peak height and the days ill with your first numbers.',
      'Reset, vaccinate first, then expose to the pathogen 30 days later. Did the body get ill?',
      'Raise the pathogen growth rate to 2.5 per day. Can the primary response still clear it before the body is very ill?',
    ],
    id: [
      'Paparkan tubuh baru ke patogen. Hitung hari sebelum antibodi muncul, hari puncak antibodi, dan berapa hari tubuh sakit.',
      'Tunggu sampai hari ke-60 (atau tekan Lompat 30 hari dua kali) lalu paparkan lagi. Bandingkan jeda, tinggi puncak dan hari sakit dengan angka pertamamu.',
      'Atur ulang, vaksinasi dulu, lalu paparkan ke patogen 30 hari kemudian. Apakah tubuh jatuh sakit?',
      'Naikkan laju pertumbuhan patogen ke 2,5 per hari. Masihkah respons primer bisa membersihkannya sebelum tubuh sakit parah?',
    ],
  },

  learn: {
    background: {
      en: [
        'When a pathogen gets past the skin and mucous membranes it starts to multiply, often doubling every 12–24 hours. The innate immune system responds within minutes to hours: phagocytes such as neutrophils and macrophages engulf and digest microbes, and inflammation brings more of them to the site. This response is fast but not specific, and on its own it usually cannot stop a rapidly growing pathogen; in the simulation it only slows the growth while the adaptive response is prepared.',
        'The adaptive response is specific but slow to start. Macrophages and dendritic cells present fragments of the pathogen (antigens) to helper T cells, which multiply and release signalling molecules. The few B cells whose receptors happen to fit the antigen are selected and divide repeatedly (clonal selection and expansion), roughly doubling every 8–12 hours. Many become plasma cells, which each secrete thousands of antibody molecules per second. Antibodies bind the pathogen, clump it together and mark it for destruction by phagocytes and complement. Because the useful clone starts as a handful of cells, it takes about 5–7 days before antibodies are detectable and 10–14 days to reach the peak, and the pathogen load keeps climbing in that lag, which is when you feel ill. Cytotoxic T cells, not modelled in detail here, destroy infected cells during the same period.',
        'After the infection clears, most plasma cells die and antibody levels fall over weeks, but a population of long-lived memory B cells and memory T cells remains. On a second exposure these cells respond to much smaller amounts of antigen, expand faster and switch to high-affinity IgG antibodies, so the antibody level rises within 2–4 days and reaches a peak 10–100 times higher than the first time. The pathogen is cleared before it can cause symptoms. This is the secondary response, and it is the reason you catch most childhood infections only once.',
        'A vaccine delivers antigen, as a killed or weakened microbe, a protein, or mRNA that makes the body produce the protein, without the ability to cause disease. The body runs a full primary response and makes memory cells, so a later real infection meets a secondary response from the start. Booster doses raise the memory pool and antibody level further. Vaccination also protects people who cannot be vaccinated: when a large enough fraction of a population is immune (about 95% for measles, which spreads very easily), the pathogen cannot find enough susceptible hosts to keep spreading.',
      ],
      id: [
        'Ketika patogen melewati kulit dan membran mukosa, ia mulai berkembang biak, sering menggandakan diri tiap 12–24 jam. Sistem imun bawaan merespons dalam hitungan menit sampai jam: fagosit seperti neutrofil dan makrofag menelan dan mencerna mikrob, dan peradangan mendatangkan lebih banyak fagosit ke lokasi. Respons ini cepat tetapi tidak spesifik, dan sendirian biasanya tidak bisa menghentikan patogen yang tumbuh cepat; di simulasi ia hanya memperlambat pertumbuhan sementara respons adaptif disiapkan.',
        'Respons adaptif bersifat spesifik tetapi lambat dimulai. Makrofag dan sel dendritik mempresentasikan potongan patogen (antigen) kepada sel T penolong, yang berlipat ganda dan melepaskan molekul sinyal. Sedikit sel B yang reseptornya kebetulan cocok dengan antigen diseleksi dan membelah berulang kali (seleksi dan ekspansi klonal), kira-kira menggandakan diri tiap 8–12 jam. Banyak yang menjadi sel plasma, yang masing-masing menyekresi ribuan molekul antibodi per detik. Antibodi mengikat patogen, menggumpalkannya dan menandainya untuk dihancurkan fagosit dan komplemen. Karena klon yang berguna bermula dari segelintir sel, perlu sekitar 5–7 hari sebelum antibodi terdeteksi dan 10–14 hari untuk mencapai puncak, dan beban patogen terus naik selama jeda itu, saat itulah kamu merasa sakit. Sel T sitotoksik, yang tidak dimodelkan rinci di sini, menghancurkan sel terinfeksi pada periode yang sama.',
        'Setelah infeksi bersih, sebagian besar sel plasma mati dan kadar antibodi turun selama berminggu-minggu, tetapi populasi sel B memori dan sel T memori yang berumur panjang tetap ada. Pada paparan kedua sel-sel ini merespons jumlah antigen yang jauh lebih kecil, berekspansi lebih cepat dan beralih ke antibodi IgG berafinitas tinggi, sehingga kadar antibodi naik dalam 2–4 hari dan mencapai puncak 10–100 kali lebih tinggi daripada pertama kali. Patogen dibersihkan sebelum menimbulkan gejala. Inilah respons sekunder, dan itulah sebabnya sebagian besar infeksi masa kanak-kanak hanya dialami sekali.',
        'Vaksin menyampaikan antigen, berupa mikrob yang dimatikan atau dilemahkan, protein, atau mRNA yang membuat tubuh memproduksi proteinnya, tanpa kemampuan menimbulkan penyakit. Tubuh menjalankan respons primer penuh dan membuat sel memori, sehingga infeksi nyata di kemudian hari langsung disambut respons sekunder. Dosis penguat menaikkan kumpulan memori dan kadar antibodi lebih jauh. Vaksinasi juga melindungi orang yang tidak bisa divaksin: ketika fraksi populasi yang imun cukup besar (sekitar 95% untuk campak, yang sangat mudah menyebar), patogen tidak menemukan cukup inang rentan untuk terus menyebar.',
      ],
    },
    figure: {
      caption: {
        en: 'Antibody concentration after a first exposure (primary response: lag of about a week, peak at 10–14 days) and after a second exposure to the same antigen (secondary response: faster rise, a peak many times higher, and a slower decline). The pathogen (red) is cleared before it can cause illness the second time.',
        id: 'Konsentrasi antibodi setelah paparan pertama (respons primer: jeda sekitar seminggu, puncak pada 10–14 hari) dan setelah paparan kedua terhadap antigen yang sama (respons sekunder: naik lebih cepat, puncak berkali lipat lebih tinggi, dan turun lebih lambat). Patogen (merah) dibersihkan sebelum menimbulkan sakit pada paparan kedua.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Primary and secondary antibody response curves', 'Kurva respons antibodi primer dan sekunder')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:9.5px system-ui,sans-serif;fill:currentColor;opacity:.8}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{stroke:currentColor;stroke-width:.6;opacity:.3}</style>
  <line x1="40" y1="200" x2="340" y2="200" class="ax"/>
  <line x1="40" y1="200" x2="40" y2="20" class="ax"/>
  <text x="190" y="228" text-anchor="middle">${L('time (days)', 'waktu (hari)')}</text>
  <text x="14" y="110" transform="rotate(-90 14 110)" text-anchor="middle">${L('antibody concentration', 'konsentrasi antibodi')}</text>
  <line x1="40" y1="140" x2="340" y2="140" class="g"/><line x1="40" y1="80" x2="340" y2="80" class="g"/>
  <path d="M40 200 L60 200 C70 200 75 196 85 184 C95 172 100 162 110 160 C120 160 135 175 160 190 C175 198 185 200 190 200" fill="none" stroke="#facc15" stroke-width="2.4"/>
  <path d="M200 200 L204 200 C208 190 212 150 218 100 C222 60 226 40 232 36 C240 32 260 60 290 100 C310 125 330 140 340 146" fill="none" stroke="#facc15" stroke-width="2.4"/>
  <path d="M60 200 C70 190 80 170 90 160 C98 152 104 160 110 180 C113 190 116 198 120 200" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="4 3"/>
  <path d="M204 200 C206 196 208 192 210 192 C212 192 214 196 216 200" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="4 3"/>
  <path d="M60 212 L55 220 L65 220 Z" fill="#ef4444"/><text x="60" y="213" text-anchor="middle" class="s" dy="-4">${L('1st exposure', 'paparan 1')}</text>
  <path d="M204 212 L199 220 L209 220 Z" fill="#ef4444"/><text x="204" y="213" text-anchor="middle" class="s" dy="-4">${L('2nd exposure', 'paparan 2')}</text>
  <text x="110" y="150" text-anchor="middle" class="s" fill="#facc15">${L('primary: peak ~day 12', 'primer: puncak ~hari 12')}</text>
  <text x="258" y="30" class="s" fill="#facc15">${L('secondary: faster, 10–100× higher', 'sekunder: lebih cepat, 10–100× lebih tinggi')}</text>
  <text x="80" y="170" class="s" fill="#ef4444">${L('pathogen', 'patogen')}</text>
  <text x="62" y="196" class="s">${L('lag ~5–7 d', 'jeda ~5–7 h')}</text>
  <rect x="62" y="202" width="56" height="5" fill="#ef4444" opacity=".5"/><text x="92" y="196" text-anchor="middle" class="s" dy="-12"></text>
  <text x="120" y="212" class="s" fill="#ef4444">${L('ill', 'sakit')}</text>
  <text x="56" y="30" class="s">${L('memory cells form →', 'sel memori terbentuk →')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Innate immunity (phagocytes, inflammation) acts within hours but is not specific; adaptive immunity (B and T lymphocytes) is specific but needs about a week to build up.',
        'Clonal selection: only B cells whose receptor fits the antigen are activated; they divide repeatedly and become plasma cells (antibody factories) and memory cells.',
        'A primary response has a lag of 5–7 days and peaks at 10–14 days; the person is ill while the pathogen outruns the response.',
        'A secondary response starts from many memory cells, so it rises within 2–4 days to a peak 10–100× higher, and the pathogen is cleared before symptoms.',
        'A vaccine triggers a primary response and memory without disease; a real infection later meets a secondary response.',
        'Antibody levels fall after each response (half-life of weeks), but memory cells persist for years or decades.',
      ],
      id: [
        'Imunitas bawaan (fagosit, peradangan) bekerja dalam hitungan jam tetapi tidak spesifik; imunitas adaptif (limfosit B dan T) spesifik tetapi butuh sekitar seminggu untuk terbentuk.',
        'Seleksi klonal: hanya sel B yang reseptornya cocok dengan antigen yang diaktifkan; mereka membelah berulang kali dan menjadi sel plasma (pabrik antibodi) dan sel memori.',
        'Respons primer memiliki jeda 5–7 hari dan puncak pada 10–14 hari; orang sakit selama patogen mendahului respons.',
        'Respons sekunder bermula dari banyak sel memori, sehingga naik dalam 2–4 hari ke puncak 10–100× lebih tinggi, dan patogen bersih sebelum gejala muncul.',
        'Vaksin memicu respons primer dan memori tanpa penyakit; infeksi nyata di kemudian hari langsung disambut respons sekunder.',
        'Kadar antibodi turun setelah tiap respons (waktu paruh mingguan), tetapi sel memori bertahan bertahun-tahun atau puluhan tahun.',
      ],
    },
    vocabulary: {
      en: [
        ['Antigen', 'A molecule, usually a protein on a pathogen, that is recognised by lymphocyte receptors and antibodies.'],
        ['Phagocyte', 'A white blood cell (neutrophil, macrophage) that engulfs and digests microbes; part of the innate response.'],
        ['Helper T cell', 'A lymphocyte that recognises presented antigen and releases cytokines that activate B cells and other T cells.'],
        ['Clonal selection', 'Activation and repeated division of only those lymphocytes whose receptors fit the antigen.'],
        ['Plasma cell', 'A short-lived B-cell descendant that secretes large amounts of antibody.'],
        ['Memory cell', 'A long-lived lymphocyte left after a response that allows a faster, stronger secondary response.'],
        ['Antibody (immunoglobulin)', 'A Y-shaped protein that binds a specific antigen, neutralising the pathogen and marking it for destruction.'],
        ['Vaccine', 'A preparation of antigen (killed or weakened pathogen, protein or mRNA) that produces immunity without causing the disease.'],
      ],
      id: [
        ['Antigen', 'Molekul, biasanya protein pada patogen, yang dikenali reseptor limfosit dan antibodi.'],
        ['Fagosit', 'Sel darah putih (neutrofil, makrofag) yang menelan dan mencerna mikrob; bagian dari respons bawaan.'],
        ['Sel T penolong', 'Limfosit yang mengenali antigen yang dipresentasikan dan melepaskan sitokin yang mengaktifkan sel B dan sel T lain.'],
        ['Seleksi klonal', 'Aktivasi dan pembelahan berulang hanya pada limfosit yang reseptornya cocok dengan antigen.'],
        ['Sel plasma', 'Turunan sel B berumur pendek yang menyekresi antibodi dalam jumlah besar.'],
        ['Sel memori', 'Limfosit berumur panjang yang tersisa setelah respons dan memungkinkan respons sekunder yang lebih cepat dan kuat.'],
        ['Antibodi (imunoglobulin)', 'Protein berbentuk Y yang mengikat antigen tertentu, menetralkan patogen dan menandainya untuk dihancurkan.'],
        ['Vaksin', 'Sediaan antigen (patogen yang dimatikan atau dilemahkan, protein atau mRNA) yang menghasilkan imunitas tanpa menyebabkan penyakit.'],
      ],
    },
    misconceptions: {
      en: [
        ['Antibodies are made as soon as a pathogen enters the body.', 'The specific B cells must first be selected and multiply from a handful of cells, which takes 5–7 days. During that lag the pathogen grows and you feel ill.'],
        ['Vaccines work by giving you a mild version of the disease.', 'Most vaccines contain killed pathogens, pieces of them, or instructions to make one protein; they cannot cause the disease. They work by triggering the same primary response and memory cells an infection would.'],
        ['Once antibodies drop after an infection, immunity is gone.', 'Antibody levels do fall, but memory cells persist. On re-exposure they produce a faster and much larger secondary response, often before you notice anything.'],
        ['A stronger immune system means more antibodies all the time.', 'Constant high antibody levels against every possible antigen would be impossible. Immunity works by remembering specific antigens and responding quickly when they reappear.'],
      ],
      id: [
        ['Antibodi dibuat segera setelah patogen masuk ke tubuh.', 'Sel B spesifik harus dulu diseleksi dan berlipat ganda dari segelintir sel, yang memakan 5–7 hari. Selama jeda itu patogen tumbuh dan kamu merasa sakit.'],
        ['Vaksin bekerja dengan memberimu versi ringan dari penyakitnya.', 'Kebanyakan vaksin berisi patogen yang dimatikan, potongannya, atau instruksi untuk membuat satu protein; vaksin tidak bisa menyebabkan penyakitnya. Vaksin bekerja dengan memicu respons primer dan sel memori yang sama seperti infeksi.'],
        ['Setelah antibodi turun pascainfeksi, imunitas hilang.', 'Kadar antibodi memang turun, tetapi sel memori bertahan. Pada paparan ulang mereka menghasilkan respons sekunder yang lebih cepat dan jauh lebih besar, sering sebelum kamu menyadari apa pun.'],
        ['Sistem imun yang lebih kuat berarti antibodi lebih banyak sepanjang waktu.', 'Kadar antibodi tinggi terus-menerus terhadap semua antigen tidak mungkin. Imunitas bekerja dengan mengingat antigen tertentu dan merespons cepat saat muncul lagi.'],
      ],
    },
    realWorld: {
      en: [
        'Measles spreads so easily (each case infects 12–18 others in an unvaccinated population) that about 95% coverage is needed to stop outbreaks.',
        'Blood tests for antibodies (serology) show whether someone has been infected or vaccinated in the past, because IgG remains detectable for months to years.',
        'Booster doses for tetanus every ten years and seasonal influenza vaccines top up memory against antigens that fade or change.',
        'Smallpox was eradicated in 1980 by vaccination; polio has been reduced from hundreds of thousands of cases a year to a handful.',
        'Monoclonal antibodies made from cloned plasma cells are used as medicines, for example to neutralise viruses or block cancer-cell signals.',
      ],
      id: [
        'Campak menyebar begitu mudah (tiap kasus menulari 12–18 orang pada populasi tak divaksin) sehingga cakupan sekitar 95% diperlukan untuk menghentikan wabah.',
        'Tes darah untuk antibodi (serologi) menunjukkan apakah seseorang pernah terinfeksi atau divaksin, karena IgG tetap terdeteksi berbulan-bulan sampai bertahun-tahun.',
        'Dosis penguat tetanus tiap sepuluh tahun dan vaksin influenza musiman mengisi ulang memori terhadap antigen yang memudar atau berubah.',
        'Cacar diberantas pada 1980 lewat vaksinasi; polio turun dari ratusan ribu kasus per tahun menjadi segelintir.',
        'Antibodi monoklonal yang dibuat dari sel plasma klonal dipakai sebagai obat, misalnya untuk menetralkan virus atau memblokir sinyal sel kanker.',
      ],
    },
    questions: {
      en: [
        { q: 'A pathogen doubles every 16 hours. Starting from 1 unit, how many units are there after 4 days, and why does this matter for the lag of the primary response?', a: '4 days = 96 h = 6 doublings, so 2⁶ = 64 units. The adaptive response needs about a week, so the pathogen can grow by a factor of hundreds before antibodies appear, which is why you fall ill during a first infection.' },
        { q: 'In the simulation the first exposure gave an antibody peak of about 1 unit on day 15 and 5 days of illness; the second gave a peak of about 14 units on day 8 and no illness. Explain both differences.', a: 'Memory B cells formed after the first infection respond to tiny amounts of antigen, expand faster and differentiate quickly into plasma cells, so antibodies rise sooner and reach a far higher level. The pathogen is neutralised before its load reaches the level that causes symptoms.' },
        { q: 'Why does a person vaccinated 30 days before an infection not get ill, even though their antibody level had already fallen?', a: 'The vaccine ran a primary response and left memory cells. When the real pathogen arrives the memory cells launch a secondary response within 2–4 days, clearing the pathogen before it can multiply enough to cause disease. Protection comes from memory, not from the antibodies that happen to be present at the moment of exposure.' },
      ],
      id: [
        { q: 'Sebuah patogen menggandakan diri tiap 16 jam. Mulai dari 1 unit, berapa unit setelah 4 hari, dan mengapa ini penting bagi jeda respons primer?', a: '4 hari = 96 jam = 6 penggandaan, jadi 2⁶ = 64 unit. Respons adaptif butuh sekitar seminggu, sehingga patogen bisa tumbuh ratusan kali sebelum antibodi muncul, itulah sebabnya kamu jatuh sakit pada infeksi pertama.' },
        { q: 'Di simulasi paparan pertama memberi puncak antibodi sekitar 1 unit pada hari ke-15 dan 5 hari sakit; paparan kedua memberi puncak sekitar 14 unit pada hari ke-8 tanpa sakit. Jelaskan kedua perbedaan itu.', a: 'Sel B memori yang terbentuk setelah infeksi pertama merespons antigen dalam jumlah sangat kecil, berekspansi lebih cepat dan cepat berdiferensiasi menjadi sel plasma, sehingga antibodi naik lebih awal dan mencapai kadar jauh lebih tinggi. Patogen dinetralkan sebelum bebannya mencapai tingkat yang menimbulkan gejala.' },
        { q: 'Mengapa orang yang divaksin 30 hari sebelum infeksi tidak jatuh sakit, padahal kadar antibodinya sudah turun?', a: 'Vaksin menjalankan respons primer dan meninggalkan sel memori. Ketika patogen nyata datang, sel memori melancarkan respons sekunder dalam 2–4 hari, membersihkan patogen sebelum cukup berlipat ganda untuk menimbulkan penyakit. Perlindungan datang dari memori, bukan dari antibodi yang kebetulan ada saat paparan.' },
      ],
    },
  },
};
