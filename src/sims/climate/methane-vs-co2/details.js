// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See why GWP is horizon-dependent: 80× over 20 years, 28× over 100 years.',
      'Connect lifetime to integrated forcing: short-lived gases have huge near-term punch.',
      'Understand why methane reductions matter MORE for fast climate action.',
    ],
    id: [
      'Memahami mengapa GWP tergantung horizon: 80× di 20 tahun, 28× di 100 tahun.',
      'Menghubungkan masa hidup dengan paksaan terintegrasi: gas berumur pendek punya pukulan jangka pendek besar.',
      'Memahami mengapa pengurangan metana lebih penting untuk aksi iklim cepat.',
    ],
  },  tryThis: {
    en: [
      '20-year horizon: methane curve dominates.',
      '100-year horizon: CO₂ catches up; ratio shrinks.',
      '500-year horizon: methane area becomes a small spike, CO₂ wins.',
    ],
    id: [
      'Horizon 20 tahun: kurva metana mendominasi.',
      'Horizon 100 tahun: CO₂ menyusul; rasio menyusut.',
      'Horizon 500 tahun: area metana menjadi puncak kecil, CO₂ menang.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Methane (CH₄) and carbon dioxide (CO₂) are both greenhouse gases, but they behave very differently. Kilogram for kilogram, a fresh pulse of methane absorbs far more outgoing infrared than CO₂, partly because its absorption band near 7.7 µm is nowhere near saturated while the CO₂ band at 15 µm is. But methane does not last: it is destroyed in the troposphere mainly by reaction with the hydroxyl radical, CH₄ + OH → CH₃ + H₂O, and the perturbation decays with an e-folding time of about 12 years. CO₂, by contrast, is not destroyed by any chemical reaction in the air; it is only shuffled between the atmosphere, the ocean and the land, and a sizeable fraction of a pulse is still airborne after a thousand years.',
        'The simulation follows one kilogram of each gas released at time zero. The methane forcing is 95 × e^(−t/12) in units where a CO₂ kilogram gives 1 at t = 0. The CO₂ curve is a "Bern-style" sum of four parts: 0.21 + 0.26·e^(−t/172) + 0.34·e^(−t/18) + 0.19·e^(−t/2), meaning 19% is taken up within a few years, 34% within decades by the land and surface ocean, 26% over a couple of centuries by the deep ocean, and 21% effectively stays for good on these timescales. The shaded areas under the curves are the integrated forcings, and the Global Warming Potential displayed in the header is simply the methane area divided by the CO₂ area up to the chosen horizon. The slider and presets change only that horizon.',
        'Watch how the ratio moves. In the model, the methane area stops growing after about 50 years, at roughly 95 × 12 ≈ 1140 forcing-years, while the CO₂ area keeps growing by at least 0.21 per year forever. The instantaneous methane forcing falls below that of CO₂ after about 66 years. So the GWP is about 68 over 20 years, 24 over 100 years and 7 over 500 years in this model. IPCC values are somewhat higher, about 80 over 20 years and 28–30 over 100 years, because methane also produces ozone and stratospheric water vapour, and fossil methane oxidises into extra CO₂; the sim leaves out these indirect effects, as well as climate–carbon feedbacks and the fact that CO₂\'s forcing per kilogram depends on how much CO₂ is already in the air.',
        'The horizon dependence is not a flaw in the science; it is a value judgement about which future we care about. A 20-year horizon says that cutting methane today is the fastest way to slow warming over the coming decades, which is why leaks from gas pipelines, landfills and livestock receive so much attention. A 100-year or 500-year horizon says that the peak temperature humanity reaches is set almost entirely by cumulative CO₂, because methane released now will be gone long before then. Both statements are true at once, and the sim lets you see why.',
      ],
      id: [
        'Metana (CH₄) dan karbon dioksida (CO₂) sama-sama gas rumah kaca, tetapi perilakunya sangat berbeda. Kilogram per kilogram, pulsa metana yang baru dilepas menyerap inframerah keluar jauh lebih banyak daripada CO₂, sebagian karena pita serapannya di dekat 7,7 µm masih jauh dari jenuh sementara pita CO₂ di 15 µm sudah jenuh. Namun metana tidak bertahan lama: ia dihancurkan di troposfer terutama oleh reaksi dengan radikal hidroksil, CH₄ + OH → CH₃ + H₂O, dan gangguannya meluruh dengan waktu e-folding sekitar 12 tahun. Sebaliknya, CO₂ tidak dihancurkan oleh reaksi kimia apa pun di udara; ia hanya berpindah-pindah antara atmosfer, laut, dan darat, dan sebagian besar dari pulsanya masih berada di udara setelah seribu tahun.',
        'Simulasi mengikuti satu kilogram dari tiap gas yang dilepas pada waktu nol. Paksaan metana adalah 95 × e^(−t/12) dalam satuan yang membuat satu kilogram CO₂ bernilai 1 pada t = 0. Kurva CO₂ adalah jumlah "gaya Bern" dari empat bagian: 0,21 + 0,26·e^(−t/172) + 0,34·e^(−t/18) + 0,19·e^(−t/2), artinya 19% diserap dalam beberapa tahun, 34% dalam beberapa dekade oleh darat dan laut permukaan, 26% dalam beberapa abad oleh laut dalam, dan 21% praktis tinggal selamanya pada skala waktu ini. Area berwarna di bawah kurva adalah paksaan terintegrasi, dan Potensi Pemanasan Global (GWP) yang ditampilkan di kepala grafik hanyalah area metana dibagi area CO₂ sampai horizon yang dipilih. Slider dan tombol preset hanya mengubah horizon itu.',
        'Perhatikan bagaimana rasionya bergerak. Dalam model, area metana berhenti tumbuh setelah sekitar 50 tahun, pada kira-kira 95 × 12 ≈ 1140 satuan paksaan-tahun, sementara area CO₂ terus bertambah paling sedikit 0,21 per tahun selamanya. Paksaan sesaat metana turun di bawah paksaan CO₂ setelah sekitar 66 tahun. Jadi GWP dalam model ini sekitar 68 untuk 20 tahun, 24 untuk 100 tahun, dan 7 untuk 500 tahun. Nilai IPCC agak lebih tinggi, sekitar 80 untuk 20 tahun dan 28–30 untuk 100 tahun, karena metana juga menghasilkan ozon dan uap air stratosfer, dan metana fosil teroksidasi menjadi CO₂ tambahan; simulasi mengabaikan efek tak langsung ini, begitu pula umpan balik iklim–karbon dan kenyataan bahwa paksaan CO₂ per kilogram bergantung pada seberapa banyak CO₂ yang sudah ada di udara.',
        'Ketergantungan pada horizon bukan cacat ilmiah; itu adalah penilaian nilai tentang masa depan mana yang kita pedulikan. Horizon 20 tahun mengatakan bahwa memotong metana hari ini adalah cara tercepat memperlambat pemanasan dalam beberapa dekade mendatang, itulah sebabnya kebocoran pipa gas, tempat pembuangan sampah, dan ternak mendapat begitu banyak perhatian. Horizon 100 atau 500 tahun mengatakan bahwa suhu puncak yang dicapai umat manusia hampir sepenuhnya ditentukan oleh CO₂ kumulatif, karena metana yang dilepas sekarang sudah lama hilang sebelum itu. Kedua pernyataan itu benar sekaligus, dan simulasi ini membuatmu melihat alasannya.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: fraction of each pulse still forcing the climate. Methane is almost gone after 50 years; a fifth of the CO₂ never leaves on this timescale. Bottom: the GWP, the ratio of the two integrated forcings, falls steadily as the horizon lengthens.',
        id: 'Atas: bagian dari tiap pulsa yang masih memaksa iklim. Metana hampir habis setelah 50 tahun; seperlima CO₂ tidak pernah pergi pada skala waktu ini. Bawah: GWP, rasio kedua paksaan terintegrasi, turun terus saat horizon memanjang.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Decay of methane and CO2 pulses and GWP versus time horizon', 'Peluruhan pulsa metana dan CO2 serta GWP terhadap horizon waktu')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.b{font-weight:700;font-size:11px}.s{font-size:9px;opacity:.85}.ax{stroke:currentColor;stroke-width:1;opacity:.6}</style>
  <text x="40" y="14" class="b">${L('Fraction of pulse remaining', 'Bagian pulsa yang tersisa')}</text>
  <line x1="40" y1="30" x2="40" y2="100" class="ax"/>
  <line x1="40" y1="100" x2="340" y2="100" class="ax"/>
  <path d="M40 30.0 L52 49.8 L64 64.1 L76 74.2 L88 81.5 L100 86.8 L112 90.5 L124 93.2 L136 95.1 L148 96.5 L160 97.5 L172 98.2 L184 98.7 L196 99.1 L208 99.3 L220 99.5 L244 99.8 L268 99.9 L292 99.9 L340 100.0" fill="none" stroke="#10b981" stroke-width="2"/>
  <path d="M40 30.0 L52 46.7 L64 52.4 L76 56.1 L88 58.9 L100 61.3 L112 63.2 L124 64.8 L136 66.2 L148 67.3 L160 68.3 L172 69.1 L184 69.9 L196 70.5 L208 71.1 L220 71.6 L232 72.1 L244 72.5 L256 72.9 L268 73.3 L280 73.6 L292 73.9 L304 74.2 L316 74.5 L328 74.8 L340 75.0" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="36" y="33" text-anchor="end" class="s">1</text>
  <text x="36" y="103" text-anchor="end" class="s">0</text>
  <text x="40" y="112" text-anchor="middle" class="s">0</text>
  <text x="190" y="112" text-anchor="middle" class="s">50</text>
  <text x="340" y="112" text-anchor="middle" class="s">100 ${L('yr', 'thn')}</text>
  <text x="96" y="44" fill="#10b981" class="s">CH₄: e^(−t/12), ${L('gone in ~50 yr', 'habis dalam ~50 thn')}</text>
  <text x="200" y="66" fill="#f59e0b" class="s">CO₂: 21% ${L('stays for centuries', 'tinggal berabad-abad')}</text>
  <text x="40" y="134" class="b">GWP(H) = ${L('area', 'area')} CH₄ / ${L('area', 'area')} CO₂</text>
  <line x1="40" y1="150" x2="40" y2="220" class="ax"/>
  <line x1="40" y1="220" x2="340" y2="220" class="ax"/>
  <path d="M48 154.7 L55 160.7 L63 166.9 L70 172.4 L78 177.1 L85 181.0 L93 184.4 L100 187.3 L108 189.7 L115 191.8 L123 193.7 L130 195.3 L138 196.7 L145 197.9 L153 199.0 L160 200.0 L175 201.7 L190 203.1 L205 204.3 L220 205.3 L235 206.1 L250 206.9 L265 207.5 L280 208.1 L295 208.6 L310 209.1 L325 209.5 L340 209.9" fill="none" stroke="#8b5cf6" stroke-width="2"/>
  <circle cx="70" cy="172.4" r="3.5" fill="#8b5cf6"/>
  <circle cx="190" cy="203.1" r="3.5" fill="#8b5cf6"/>
  <text x="78" y="168" fill="#8b5cf6" class="s">${L('20 yr: ≈68', '20 thn: ≈68')}</text>
  <text x="198" y="199" fill="#8b5cf6" class="s">${L('100 yr: ≈24', '100 thn: ≈24')}</text>
  <text x="36" y="153" text-anchor="end" class="s">100</text>
  <text x="36" y="223" text-anchor="end" class="s">0</text>
  <text x="40" y="232" text-anchor="middle" class="s">0</text>
  <text x="190" y="232" text-anchor="middle" class="s">100</text>
  <text x="340" y="232" text-anchor="middle" class="s">200 ${L('yr horizon', 'thn horizon')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A kilogram of methane traps far more heat than a kilogram of CO₂ at first, but it is chemically destroyed within decades while CO₂ lingers for centuries.',
        'GWP compares the integrated forcing of equal-mass pulses over a chosen horizon, so it has no single value: it depends on the horizon.',
        'Methane\'s integrated forcing stops growing after about 50 years; CO₂\'s keeps growing, so the ratio falls as the horizon lengthens.',
        'Short horizons highlight the near-term benefit of cutting methane; long horizons show that peak warming is governed by cumulative CO₂.',
      ],
      id: [
        'Satu kilogram metana menjebak panas jauh lebih banyak daripada satu kilogram CO₂ pada awalnya, tetapi ia dihancurkan secara kimia dalam beberapa dekade sementara CO₂ bertahan berabad-abad.',
        'GWP membandingkan paksaan terintegrasi dari pulsa bermassa sama selama horizon yang dipilih, sehingga tidak punya satu nilai tunggal: bergantung pada horizon.',
        'Paksaan terintegrasi metana berhenti tumbuh setelah sekitar 50 tahun; paksaan CO₂ terus tumbuh, sehingga rasionya turun saat horizon memanjang.',
        'Horizon pendek menonjolkan manfaat jangka dekat dari pemotongan metana; horizon panjang menunjukkan bahwa puncak pemanasan diatur oleh CO₂ kumulatif.',
      ],
    },
    vocabulary: {
      en: [
        ['Radiative forcing', 'The change in Earth\'s energy balance caused by a change in a gas, in W/m²; positive values warm the planet.'],
        ['Pulse', 'A one-off release of a gas at a single moment, used to compare how gases behave afterwards.'],
        ['Lifetime (e-folding time)', 'The time for an exponentially decaying amount to fall to 1/e ≈ 37% of its starting value; about 12 years for methane.'],
        ['Integrated forcing', 'Forcing added up over time, the area under the forcing-versus-time curve, in W/m² × years.'],
        ['Global Warming Potential (GWP)', 'The integrated forcing of 1 kg of a gas divided by that of 1 kg of CO₂ over the same horizon.'],
        ['Time horizon', 'The number of years over which forcing is integrated when computing GWP; 20, 100 and 500 years are the conventional choices.'],
        ['Hydroxyl radical (OH)', 'The highly reactive molecule that oxidises methane and most other pollutants in the lower atmosphere.'],
      ],
      id: [
        ['Paksaan radiatif', 'Perubahan neraca energi Bumi akibat perubahan suatu gas, dalam W/m²; nilai positif menghangatkan planet.'],
        ['Pulsa', 'Pelepasan gas sekali saja pada satu saat, dipakai untuk membandingkan perilaku gas sesudahnya.'],
        ['Masa hidup (waktu e-folding)', 'Waktu bagi jumlah yang meluruh eksponensial untuk turun ke 1/e ≈ 37% dari nilai awalnya; sekitar 12 tahun untuk metana.'],
        ['Paksaan terintegrasi', 'Paksaan yang dijumlahkan sepanjang waktu, yaitu area di bawah kurva paksaan terhadap waktu, dalam W/m² × tahun.'],
        ['Potensi Pemanasan Global (GWP)', 'Paksaan terintegrasi dari 1 kg suatu gas dibagi paksaan 1 kg CO₂ selama horizon yang sama.'],
        ['Horizon waktu', 'Jumlah tahun tempat paksaan diintegrasikan saat menghitung GWP; 20, 100, dan 500 tahun adalah pilihan konvensional.'],
        ['Radikal hidroksil (OH)', 'Molekul sangat reaktif yang mengoksidasi metana dan sebagian besar polutan lain di atmosfer bawah.'],
      ],
    },
    misconceptions: {
      en: [
        ['Methane is "80 times worse than CO₂", full stop.', 'That figure is only the 20-year GWP. Over 100 years it is about 28–30, and over 500 years below 10. Any single number hides the horizon it was computed for.'],
        ['Because methane disappears, it does not really matter.', 'While it is in the air it is an extremely strong absorber, and emissions are continuous, so the atmosphere always holds a methane stock that is responsible for a large share of today\'s warming. Cutting it lowers that stock within a decade or two.'],
        ['CO₂ has a lifetime of about 100 years.', 'CO₂ has no single lifetime. Part of a pulse is absorbed within years, part over centuries, and about a fifth remains until rock weathering removes it over tens of thousands of years.'],
        ['The GWP tells you how much warmer the planet will be.', 'GWP compares integrated forcing, not temperature. Other metrics such as the Global Temperature-change Potential give different rankings, especially for short-lived gases.'],
      ],
      id: [
        ['Metana "80 kali lebih buruk daripada CO₂", titik.', 'Angka itu hanya GWP 20 tahun. Untuk 100 tahun nilainya sekitar 28–30, dan untuk 500 tahun di bawah 10. Angka tunggal apa pun menyembunyikan horizon yang dipakai menghitungnya.'],
        ['Karena metana menghilang, ia tidak terlalu penting.', 'Selama berada di udara, metana adalah penyerap yang sangat kuat, dan emisinya terus-menerus, sehingga atmosfer selalu menyimpan stok metana yang bertanggung jawab atas sebagian besar pemanasan saat ini. Memotongnya menurunkan stok itu dalam satu atau dua dekade.'],
        ['CO₂ punya masa hidup sekitar 100 tahun.', 'CO₂ tidak punya masa hidup tunggal. Sebagian pulsa diserap dalam hitungan tahun, sebagian dalam berabad-abad, dan sekitar seperlima tetap tinggal sampai pelapukan batuan menghilangkannya dalam puluhan ribu tahun.'],
        ['GWP memberi tahu seberapa hangat planet nanti.', 'GWP membandingkan paksaan terintegrasi, bukan suhu. Metrik lain seperti Potensi Perubahan Suhu Global memberi peringkat yang berbeda, terutama untuk gas berumur pendek.'],
      ],
    },
    realWorld: {
      en: [
        'The Global Methane Pledge (2021) targets a 30% cut in methane emissions by 2030 relative to 2020, precisely because the near-term climate benefit is so large.',
        'Satellites such as TROPOMI and GHGSat now spot individual methane "super-emitter" leaks from pipelines, coal mines and landfills, which can often be repaired cheaply.',
        'In Indonesia, rice paddies, livestock and landfills are major methane sources, while peatland and forest fires release mostly CO₂; the two kinds of emission call for different time horizons when judged.',
        'National greenhouse-gas inventories report emissions in "CO₂-equivalent" using 100-year GWPs, so the choice of horizon shapes how countries are compared.',
      ],
      id: [
        'Global Methane Pledge (2021) menargetkan pemotongan emisi metana 30% pada 2030 relatif terhadap 2020, persisnya karena manfaat iklim jangka dekatnya begitu besar.',
        'Satelit seperti TROPOMI dan GHGSat kini dapat menemukan kebocoran metana "super-emitter" dari pipa, tambang batu bara, dan tempat pembuangan sampah, yang sering bisa diperbaiki dengan murah.',
        'Di Indonesia, sawah, ternak, dan tempat pembuangan sampah adalah sumber utama metana, sementara kebakaran gambut dan hutan melepaskan sebagian besar CO₂; kedua jenis emisi itu perlu dinilai dengan horizon waktu yang berbeda.',
        'Inventarisasi gas rumah kaca nasional melaporkan emisi dalam "setara CO₂" menggunakan GWP 100 tahun, sehingga pilihan horizon membentuk cara negara-negara dibandingkan.',
      ],
    },
    questions: {
      en: [
        { q: 'In the model, methane forcing is 95·e^(−t/12). What fraction of a methane pulse is still forcing the climate after 12, 24 and 36 years?', a: 'After one lifetime (12 years) e^(−1) ≈ 37% remains; after 24 years e^(−2) ≈ 13.5%; after 36 years e^(−3) ≈ 5%. Each 12 years cuts the remaining amount by the same factor of about 2.7.' },
        { q: 'The total methane area approaches 95 × 12 ≈ 1140 forcing-years. The CO₂ area reaches about 47 at 100 years and about 154 at 500 years. Use these to estimate GWP₁₀₀ and GWP₅₀₀ and explain the trend.', a: 'GWP₁₀₀ ≈ 1140/47 ≈ 24 and GWP₅₀₀ ≈ 1140/154 ≈ 7.4. The numerator has stopped growing while the denominator keeps rising, roughly 0.21 per year from the permanent fraction alone, so the ratio must keep falling.' },
        { q: 'Why do the IPCC\'s GWP values for methane (about 80 over 20 years, 28–30 over 100 years) come out higher than the sim\'s 68 and 24?', a: 'The sim counts only methane\'s direct absorption. Real methane also increases tropospheric ozone and stratospheric water vapour, both greenhouse gases, and fossil methane oxidises to CO₂; adding these indirect effects raises the methane area and therefore the GWP.' },
      ],
      id: [
        { q: 'Dalam model, paksaan metana adalah 95·e^(−t/12). Berapa bagian pulsa metana yang masih memaksa iklim setelah 12, 24, dan 36 tahun?', a: 'Setelah satu masa hidup (12 tahun) tersisa e^(−1) ≈ 37%; setelah 24 tahun e^(−2) ≈ 13,5%; setelah 36 tahun e^(−3) ≈ 5%. Setiap 12 tahun memotong sisa dengan faktor yang sama, sekitar 2,7.' },
        { q: 'Area total metana mendekati 95 × 12 ≈ 1140 paksaan-tahun. Area CO₂ mencapai sekitar 47 pada 100 tahun dan sekitar 154 pada 500 tahun. Gunakan angka ini untuk memperkirakan GWP₁₀₀ dan GWP₅₀₀ dan jelaskan trennya.', a: 'GWP₁₀₀ ≈ 1140/47 ≈ 24 dan GWP₅₀₀ ≈ 1140/154 ≈ 7,4. Pembilangnya sudah berhenti tumbuh sementara penyebutnya terus naik, kira-kira 0,21 per tahun dari bagian permanen saja, sehingga rasionya pasti terus turun.' },
        { q: 'Mengapa nilai GWP metana dari IPCC (sekitar 80 untuk 20 tahun, 28–30 untuk 100 tahun) lebih tinggi daripada nilai simulasi 68 dan 24?', a: 'Simulasi hanya menghitung serapan langsung metana. Metana sungguhan juga menambah ozon troposfer dan uap air stratosfer, keduanya gas rumah kaca, dan metana fosil teroksidasi menjadi CO₂; menambahkan efek tak langsung ini memperbesar area metana dan karenanya GWP.' },
      ],
    },
  },
};
