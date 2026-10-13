// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read fertility from the bottom bar.',
      'Connect shape to demographic transition.',
      'Predict the dependency ratio (kids + elders / workers).',
    ],
    id: [
      'Membaca fertilitas dari batang dasar.',
      'Mengaitkan bentuk dengan transisi demografi.',
      'Memprediksi rasio ketergantungan (anak + lansia / pekerja).',
    ],
  },
  tryThis: {
    en: [
      'Fertility 4 + low mortality — classic broad-base pyramid.',
      'Fertility 1.5 — does the bottom shrink?',
      'Run for 50 years, fertility 1.2 — what shape?',
    ],
    id: [
      'Fertilitas 4 + mortalitas rendah — piramida dasar lebar klasik.',
      'Fertilitas 1,5 — apakah dasar menyusut?',
      'Jalankan 50 tahun, fertilitas 1,2 — bentuk apa muncul?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A population pyramid is two bar charts placed back to back. Each bar is a five-year age group, males on the left and females on the right, with the youngest at the bottom and the oldest at the top. The shape is a record of a country\'s recent history: the number of births in the last five years sets the width of the bottom bar, and the share of people who survive to old age sets how quickly the bars narrow toward the top. A wide base with a narrow top means many births and short lives; a tall, even column means births roughly replacing deaths; a shape that is narrower at the bottom than in the middle means births have fallen and the population is ageing.',
        'The simulation keeps 18 age groups, from 0–4 up to 85+, and advances one year at a time. Each year one fifth of every group moves up to the next group, a fraction of every group dies, and new babies are added to the bottom bar. The number of births equals the number of women aged 15–49 multiplied by the fertility setting (children per woman over her whole life) and divided by 35, the number of years in that span. The baseline mortality slider is the yearly chance of dying for the youngest group; that chance is multiplied by 1.08 for each step up the age ladder, so the oldest group dies about four times as fast as the youngest.',
        'A fertility of about 2.1 children per woman is called replacement level: each generation of parents is just replaced by its children. Push fertility above that with low mortality and the base widens year after year. Drop it to 1.5 or lower and the bottom bars shrink while the people already born keep moving upward, so the pyramid becomes a column and then a top-heavy shape. The readout also gives the dependency ratio: children (0–14) plus elders (65+) divided by people of working age (15–64), as a percentage. It tells you how many dependants every 100 workers support.',
        'The model is deliberately simple. It ignores migration, assumes boys and girls are born in equal numbers (in reality about 105 boys are born for every 100 girls), gives both sexes the same death rates, and spreads births evenly across all women aged 15–49. The three presets are schematic shapes inspired by Niger, the United States and Japan, not real census data. Real demographers use single-year age data, life tables and migration flows, but the mechanism you see here, with cohorts moving upward while births and deaths reshape the two ends, is exactly what drives real population change.',
      ],
      id: [
        'Piramida penduduk adalah dua diagram batang yang disusun saling membelakangi. Setiap batang mewakili kelompok umur lima tahun, laki-laki di kiri dan perempuan di kanan, yang termuda di bawah dan yang tertua di atas. Bentuknya merekam sejarah suatu negara: jumlah kelahiran dalam lima tahun terakhir menentukan lebar batang paling bawah, dan berapa banyak orang yang bertahan hidup sampai tua menentukan seberapa cepat batang menyempit ke atas. Dasar lebar dengan puncak sempit berarti banyak kelahiran dan usia pendek; kolom tegak yang rata berarti kelahiran kira-kira menggantikan kematian; bentuk yang bagian bawahnya lebih sempit daripada bagian tengah berarti kelahiran sudah turun dan penduduk menua.',
        'Simulasi ini memakai 18 kelompok umur, dari 0–4 sampai 85+, dan maju satu tahun setiap langkah. Setiap tahun, seperlima dari tiap kelompok naik ke kelompok berikutnya, sebagian dari tiap kelompok meninggal, dan bayi baru ditambahkan ke batang paling bawah. Jumlah kelahiran sama dengan jumlah perempuan usia 15–49 dikalikan angka fertilitas (anak per perempuan sepanjang hidupnya) lalu dibagi 35, yaitu banyaknya tahun dalam rentang usia itu. Slider mortalitas dasar adalah peluang meninggal per tahun untuk kelompok termuda; peluang itu dikalikan 1,08 setiap naik satu kelompok umur, sehingga kelompok tertua meninggal sekitar empat kali lebih cepat daripada yang termuda.',
        'Fertilitas sekitar 2,1 anak per perempuan disebut tingkat penggantian: setiap generasi orang tua tepat digantikan oleh anak-anaknya. Naikkan fertilitas di atas angka itu dengan mortalitas rendah, dan dasar piramida melebar dari tahun ke tahun. Turunkan ke 1,5 atau lebih rendah, maka batang bawah menyusut sementara orang yang sudah lahir terus bergerak ke atas, sehingga piramida berubah menjadi kolom lalu menjadi bentuk yang berat di atas. Tampilan angka juga memberikan rasio ketergantungan: anak-anak (0–14) ditambah lansia (65+) dibagi penduduk usia kerja (15–64), dalam persen. Angka ini menunjukkan berapa orang yang ditanggung oleh setiap 100 pekerja.',
        'Modelnya sengaja dibuat sederhana. Migrasi diabaikan, bayi laki-laki dan perempuan dianggap lahir dalam jumlah sama (kenyataannya sekitar 105 bayi laki-laki per 100 bayi perempuan), kedua jenis kelamin diberi angka kematian yang sama, dan kelahiran disebar merata ke semua perempuan usia 15–49. Ketiga preset hanyalah bentuk skematis yang terinspirasi Niger, Amerika Serikat, dan Jepang, bukan data sensus sungguhan. Ahli demografi memakai data umur per tahun, tabel kematian, dan arus migrasi, tetapi mekanisme yang kamu lihat di sini, yaitu kohor yang bergerak ke atas sementara kelahiran dan kematian membentuk kedua ujungnya, memang inilah yang menggerakkan perubahan penduduk sungguhan.',
      ],
    },
    figure: {
      caption: {
        en: 'Three pyramid shapes. Every year each age group moves one step up; births set the width of the bottom and deaths trim the top, so fertility and mortality together sculpt the shape.',
        id: 'Tiga bentuk piramida. Setiap tahun tiap kelompok umur naik satu tingkat; kelahiran menentukan lebar bagian bawah dan kematian memangkas bagian atas, sehingga fertilitas dan mortalitas bersama-sama membentuk piramida.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Three population pyramid shapes', 'Tiga bentuk piramida penduduk')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}.s{font-size:10.5px}</style>
  <rect x="120" y="8" width="12" height="12" fill="#3b82f6"/>
  <text x="136" y="18" class="s">${L('male', 'laki-laki')}</text>
  <rect x="200" y="8" width="12" height="12" fill="#8b5cf6"/>
  <text x="216" y="18" class="s">${L('female', 'perempuan')}</text>
  <text x="2" y="44" class="s">85+</text>
  <text x="2" y="200" class="s">0–4</text>
  <line x1="24" y1="70" x2="350" y2="70" class="m" stroke-dasharray="3 3"/>
  <line x1="24" y1="110" x2="350" y2="110" class="m" stroke-dasharray="3 3"/>
  <line x1="24" y1="150" x2="350" y2="150" class="m" stroke-dasharray="3 3"/>
  <line x1="24" y1="190" x2="350" y2="190" class="m" stroke-dasharray="3 3"/>
  <polygon points="75,40 75,200 27,200" fill="#3b82f6" opacity=".85"/>
  <polygon points="75,40 75,200 123,200" fill="#8b5cf6" opacity=".85"/>
  <polygon points="185,40 170,40 155,80 153,200 185,200" fill="#3b82f6" opacity=".85"/>
  <polygon points="185,40 200,40 215,80 217,200 185,200" fill="#8b5cf6" opacity=".85"/>
  <polygon points="300,40 282,40 262,90 264,150 282,200 300,200" fill="#3b82f6" opacity=".85"/>
  <polygon points="300,40 318,40 338,90 336,150 318,200 300,200" fill="#8b5cf6" opacity=".85"/>
  <line x1="75" y1="40" x2="75" y2="200" stroke="currentColor" stroke-width="1" opacity=".6"/>
  <line x1="185" y1="40" x2="185" y2="200" stroke="currentColor" stroke-width="1" opacity=".6"/>
  <line x1="300" y1="40" x2="300" y2="200" stroke="currentColor" stroke-width="1" opacity=".6"/>
  <text x="75" y="218" text-anchor="middle">${L('Youthful', 'Muda')}</text>
  <text x="75" y="232" text-anchor="middle" class="s">${L('high fertility', 'fertilitas tinggi')}</text>
  <text x="185" y="218" text-anchor="middle">${L('Stable', 'Stabil')}</text>
  <text x="185" y="232" text-anchor="middle" class="s">${L('fertility near 2', 'fertilitas sekitar 2')}</text>
  <text x="300" y="218" text-anchor="middle">${L('Ageing', 'Menua')}</text>
  <text x="300" y="232" text-anchor="middle" class="s">${L('low fertility', 'fertilitas rendah')}</text>
  <line x1="345" y1="150" x2="345" y2="60" stroke="#10b981" stroke-width="2" marker-end="url(#a)"/>
  <text x="357" y="110" fill="#10b981" class="s" text-anchor="end" transform="rotate(-90 357 110)">${L('cohorts age upward', 'kohor menua ke atas')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The bottom bar shows recent births; the top bars show how many people survive to old age.',
        'A fertility of about 2.1 children per woman keeps a population roughly stable; higher widens the base, lower narrows it.',
        'Every year each cohort moves one step up the pyramid, so a bulge born decades ago is still visible as it ages.',
        'The dependency ratio compares children and elders with people of working age; both a very young and a very old population push it up.',
        'Population keeps changing for decades after fertility changes, because the people already born still have to age through the pyramid.',
      ],
      id: [
        'Batang paling bawah menunjukkan kelahiran terbaru; batang paling atas menunjukkan berapa banyak orang yang bertahan sampai tua.',
        'Fertilitas sekitar 2,1 anak per perempuan menjaga penduduk kira-kira stabil; lebih tinggi melebarkan dasar, lebih rendah menyempitkannya.',
        'Setiap tahun tiap kohor naik satu tingkat, sehingga tonjolan yang lahir puluhan tahun lalu tetap terlihat saat menua.',
        'Rasio ketergantungan membandingkan anak-anak dan lansia dengan penduduk usia kerja; penduduk yang sangat muda maupun sangat tua sama-sama menaikkannya.',
        'Penduduk terus berubah selama puluhan tahun setelah fertilitas berubah, karena orang yang sudah lahir masih harus menua melewati piramida.',
      ],
    },
    vocabulary: {
      en: [
        ['Total fertility rate (TFR)', 'The average number of children a woman would have over her lifetime at current birth rates.'],
        ['Replacement level', 'A fertility of about 2.1 children per woman, at which each generation just replaces the one before.'],
        ['Cohort', 'A group of people born in the same period, who move up the pyramid together.'],
        ['Mortality rate', 'The fraction of a group that dies in a year; it rises steeply with age.'],
        ['Dependency ratio', 'Children (0–14) plus elders (65+) divided by the working-age population (15–64), usually given per 100 workers.'],
        ['Demographic transition', 'The shift of a society from high birth and death rates to low ones, which turns a wide-based pyramid into a column.'],
        ['Population momentum', 'Continued growth after fertility falls, because large young cohorts have not yet reached childbearing age.'],
      ],
      id: [
        ['Angka fertilitas total (TFR)', 'Rata-rata jumlah anak yang akan dilahirkan seorang perempuan sepanjang hidupnya pada tingkat kelahiran saat ini.'],
        ['Tingkat penggantian', 'Fertilitas sekitar 2,1 anak per perempuan, saat setiap generasi tepat menggantikan generasi sebelumnya.'],
        ['Kohor', 'Kelompok orang yang lahir pada periode yang sama dan bergerak naik di piramida bersama-sama.'],
        ['Angka mortalitas', 'Bagian dari suatu kelompok yang meninggal dalam setahun; naik tajam seiring usia.'],
        ['Rasio ketergantungan', 'Anak-anak (0–14) ditambah lansia (65+) dibagi penduduk usia kerja (15–64), biasanya per 100 pekerja.'],
        ['Transisi demografi', 'Perubahan masyarakat dari angka kelahiran dan kematian tinggi ke rendah, yang mengubah piramida berdasar lebar menjadi kolom.'],
        ['Momentum penduduk', 'Pertumbuhan yang berlanjut setelah fertilitas turun, karena kohor muda yang besar belum mencapai usia melahirkan.'],
      ],
    },
    misconceptions: {
      en: [
        ['If fertility drops below 2, the population starts shrinking right away.', 'Not immediately. Large cohorts already born keep ageing, and deaths stay low for years, so the total can keep growing for decades before it declines. Run the sim at 1.2 and watch the total.'],
        ['A wide base means the country has a lot of people.', 'The pyramid shows proportions, not totals. A wide base means a large share of the population is young, which can be true of a small country as well as a large one.'],
        ['Old people are the only dependants.', 'Children are dependants too. A very young population with fertility 4 can have a dependency ratio as high as an aged one; the difference is who needs support: schools versus pensions and health care.'],
        ['A dent in the pyramid must be a mistake.', 'Dents are history. A war, famine or baby boom leaves a narrow or wide cohort that moves up the pyramid for the rest of its life.'],
      ],
      id: [
        ['Kalau fertilitas turun di bawah 2, jumlah penduduk langsung menyusut.', 'Tidak langsung. Kohor besar yang sudah lahir terus menua, dan kematian tetap rendah selama bertahun-tahun, sehingga totalnya masih bisa bertambah puluhan tahun sebelum akhirnya turun. Jalankan simulasi pada 1,2 dan perhatikan totalnya.'],
        ['Dasar yang lebar berarti negara itu berpenduduk banyak.', 'Piramida menunjukkan proporsi, bukan jumlah total. Dasar lebar berarti sebagian besar penduduknya muda, dan itu bisa terjadi di negara kecil maupun besar.'],
        ['Hanya orang tua yang menjadi tanggungan.', 'Anak-anak juga tanggungan. Penduduk yang sangat muda dengan fertilitas 4 bisa punya rasio ketergantungan setinggi penduduk yang menua; bedanya pada siapa yang perlu ditanggung: sekolah atau pensiun dan layanan kesehatan.'],
        ['Lekukan pada piramida pasti kesalahan data.', 'Lekukan adalah sejarah. Perang, kelaparan, atau ledakan kelahiran meninggalkan kohor yang sempit atau lebar, yang terus bergerak naik di piramida sepanjang hidupnya.'],
      ],
    },
    realWorld: {
      en: [
        'Niger has one of the highest fertility rates in the world, more than 6 children per woman, and about half its population is under 15: a textbook wide-based pyramid.',
        'Japan has had fertility below 1.5 for decades and now has more people over 65 than under 15, so its pyramid is top-heavy and its population is falling.',
        'Indonesia\'s fertility fell from about 5.6 in the late 1960s to about 2.2 today, turning a wide pyramid into a column; the large working-age share is called a demographic dividend.',
        'Governments use these projections to plan how many schools, hospitals and pension payments will be needed twenty years from now.',
      ],
      id: [
        'Niger memiliki salah satu angka fertilitas tertinggi di dunia, lebih dari 6 anak per perempuan, dan hampir separuh penduduknya berusia di bawah 15 tahun: contoh klasik piramida berdasar lebar.',
        'Fertilitas Jepang sudah di bawah 1,5 selama puluhan tahun, dan kini penduduk di atas 65 tahun lebih banyak daripada yang di bawah 15, sehingga piramidanya berat di atas dan jumlah penduduknya menurun.',
        'Fertilitas Indonesia turun dari sekitar 5,6 pada akhir 1960-an menjadi sekitar 2,2 saat ini, mengubah piramida lebar menjadi kolom; besarnya porsi usia kerja ini disebut bonus demografi.',
        'Pemerintah memakai proyeksi seperti ini untuk merencanakan berapa sekolah, rumah sakit, dan dana pensiun yang dibutuhkan dua puluh tahun mendatang.',
      ],
    },
    questions: {
      en: [
        { q: 'A country has 60 million people aged 15–64, 25 million children under 15 and 15 million people aged 65 or over. What is its dependency ratio?', a: '(25 + 15) / 60 = 0.667, or about 67 dependants per 100 workers. In the sim this appears as "Dependency ratio: 66.7%".' },
        { q: 'Set fertility to 1.2 and run the simulation for 30 years. Why does the total population keep growing for a while even though fertility is far below replacement?', a: 'This is population momentum. The large cohorts already alive are still young, so few of them die each year, and the women among them still have children, even if fewer. Only when those cohorts reach old age does the number of deaths overtake births and the total begins to fall.' },
        { q: 'In the "Aging" preset the top bar is longer on the female side. Does the simulation produce this difference by itself? What causes it in real populations?', a: 'No. The sim gives both sexes the same death rates, so the imbalance is only built into that preset (it starts with 10% more women than men in every group). In real populations women live about five years longer on average, so among the very old there are far more women than men.' },
      ],
      id: [
        { q: 'Suatu negara memiliki 60 juta penduduk usia 15–64, 25 juta anak di bawah 15 tahun, dan 15 juta orang berusia 65 tahun ke atas. Berapa rasio ketergantungannya?', a: '(25 + 15) / 60 = 0,667, atau sekitar 67 tanggungan per 100 pekerja. Di simulasi ini tampil sebagai "Dependency ratio: 66.7%".' },
        { q: 'Atur fertilitas ke 1,2 dan jalankan simulasi selama 30 tahun. Mengapa jumlah total penduduk masih bertambah untuk sementara meskipun fertilitas jauh di bawah tingkat penggantian?', a: 'Inilah momentum penduduk. Kohor besar yang sudah hidup masih muda, jadi hanya sedikit yang meninggal setiap tahun, dan para perempuan di dalamnya masih melahirkan meskipun lebih sedikit. Baru ketika kohor itu mencapai usia tua, jumlah kematian melampaui kelahiran dan totalnya mulai turun.' },
        { q: 'Pada preset "Aging", batang paling atas lebih panjang di sisi perempuan. Apakah simulasi menghasilkan perbedaan ini sendiri? Apa penyebabnya pada penduduk sungguhan?', a: 'Tidak. Simulasi memberi angka kematian yang sama untuk kedua jenis kelamin, jadi ketimpangan itu hanya dibangun ke dalam preset tersebut (dimulai dengan 10% lebih banyak perempuan di tiap kelompok). Pada penduduk sungguhan, perempuan rata-rata hidup sekitar lima tahun lebih lama, sehingga di antara orang yang sangat tua jumlah perempuan jauh lebih banyak daripada laki-laki.' },
      ],
    },
  },
};
