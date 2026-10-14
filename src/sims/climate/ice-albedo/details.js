// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See that planetary albedo depends on temperature (more ice = more reflection).',
      'Spot the two stable equilibria — one icy, one warm.',
      'Find the tipping point: the unstable middle equilibrium.',
    ],
    id: [
      'Melihat bahwa albedo planet bergantung pada suhu (lebih banyak es = lebih banyak pantulan).',
      'Menemukan dua keseimbangan stabil — satu beku, satu hangat.',
      'Menemukan titik kritis: keseimbangan tak-stabil di tengah.',
    ],
  },  tryThis: {
    en: [
      'Drag the temperature ball — release at T<255K → snowball Earth.',
      'Drag the ball above ~270K → it slides up to a warm equilibrium.',
      'Lower solar input — the warm equilibrium disappears and only ice remains.',
    ],
    id: [
      'Geser bola suhu — lepas di T<255K → Bumi bola salju.',
      'Geser bola di atas ~270K → menggelinding ke keseimbangan hangat.',
      'Kurangi input matahari — keseimbangan hangat menghilang, hanya tinggal es.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A planet\'s temperature is set by an energy budget. Sunlight arrives at the top of the atmosphere at S = 1361 W/m², but averaged over the whole spinning sphere that is S/4 ≈ 340 W/m². A fraction α, the albedo, is reflected straight back to space; the rest is absorbed. The planet gets rid of energy by radiating infrared at a rate εσT⁴, where σ = 5.67×10⁻⁸ W/m²K⁴ is the Stefan–Boltzmann constant and ε is an effective emissivity that stands in for the greenhouse effect: a thicker greenhouse blanket means a smaller ε. With α = 0.30 and ε = 0.61 the balance (1 − α)·S/4 = εσT⁴ gives T ≈ 288 K, Earth\'s observed mean temperature.',
        'The twist is that albedo is not fixed. Snow and sea ice reflect 60–90% of sunlight, open ocean and forest reflect less than 10%, so a colder planet is a brighter planet. The simulation captures this with a simple rule: α = 0.62 below 263 K, α = 0.30 above 283 K, and a straight-line transition in between. This makes a loop: cooling grows the ice, more ice reflects more sunlight, less absorbed energy cools the planet further. It is a positive (amplifying) feedback, and it runs equally well in reverse, with melting ice darkening the surface and speeding up warming.',
        'The green curve in the sim is the net flux, absorbed minus emitted, as a function of temperature. Wherever it crosses zero the planet is in balance. Where the curve slopes downward through zero, a small push is undone: slightly warmer means more emission than absorption, so the planet cools back. That is a stable equilibrium. Where it slopes upward through zero, the feedback wins and a small push grows, so that crossing is unstable, a tipping point. At the default settings there are three crossings: a snowball state near 247 K, a warm state near 288 K, and an unstable point near 276 K that separates them. Drag the red ball to a starting temperature and the solver integrates dT/dt = (net flux)/C, so the ball rolls to whichever stable state is on its side of the tipping point.',
        'The solar slider scales S and the emissivity slider stands in for greenhouse gases. Lower the solar input to about 0.93 of today\'s and the warm crossing vanishes, leaving only the snowball; raise it to about 1.28 and the snowball vanishes. In between, both exist, and which one you get depends on history: this is hysteresis, and it means a frozen planet does not thaw just by restoring the sunlight that froze it. The model is zero-dimensional: one temperature for the whole globe, no latitudes, no seasons, no clouds, no water-vapour feedback (ε is fixed unless you move it), and a heat capacity C = 4×10⁸ J/m²K that makes equilibration look almost instantaneous on screen.',
      ],
      id: [
        'Suhu sebuah planet ditentukan oleh neraca energinya. Cahaya matahari tiba di puncak atmosfer sebesar S = 1361 W/m², tetapi jika dirata-ratakan ke seluruh bola yang berputar nilainya menjadi S/4 ≈ 340 W/m². Sebagian, yaitu albedo α, dipantulkan langsung kembali ke angkasa; sisanya diserap. Planet membuang energi dengan memancarkan inframerah dengan laju εσT⁴, dengan σ = 5,67×10⁻⁸ W/m²K⁴ adalah tetapan Stefan–Boltzmann dan ε adalah emisivitas efektif yang mewakili efek rumah kaca: selimut rumah kaca yang lebih tebal berarti ε lebih kecil. Dengan α = 0,30 dan ε = 0,61, keseimbangan (1 − α)·S/4 = εσT⁴ menghasilkan T ≈ 288 K, suhu rata-rata Bumi yang teramati.',
        'Kuncinya, albedo tidak tetap. Salju dan es laut memantulkan 60–90% cahaya matahari, laut terbuka dan hutan memantulkan kurang dari 10%, sehingga planet yang lebih dingin adalah planet yang lebih terang. Simulasi menangkap ini dengan aturan sederhana: α = 0,62 di bawah 263 K, α = 0,30 di atas 283 K, dan peralihan garis lurus di antaranya. Terbentuklah putaran: pendinginan memperluas es, es yang lebih banyak memantulkan lebih banyak cahaya, energi yang diserap berkurang dan planet makin dingin. Ini umpan balik positif (memperkuat), dan berjalan sama baiknya ke arah sebaliknya: es yang mencair menggelapkan permukaan dan mempercepat pemanasan.',
        'Kurva hijau dalam simulasi adalah fluks neto, yang diserap dikurangi yang dipancarkan, sebagai fungsi suhu. Di mana pun kurva memotong nol, planet berada dalam keseimbangan. Di tempat kurva menurun melewati nol, dorongan kecil akan dibatalkan: sedikit lebih hangat berarti pancaran melebihi serapan, sehingga planet mendingin kembali. Itu keseimbangan stabil. Di tempat kurva menaik melewati nol, umpan balik menang dan dorongan kecil membesar, sehingga perpotongan itu tak stabil, sebuah titik kritis. Pada pengaturan bawaan ada tiga perpotongan: keadaan bola salju dekat 247 K, keadaan hangat dekat 288 K, dan titik tak stabil dekat 276 K yang memisahkan keduanya. Seret bola merah ke suhu awal dan penyelesai mengintegrasikan dT/dt = (fluks neto)/C, sehingga bola menggelinding ke keadaan stabil mana pun yang berada di sisi titik kritisnya.',
        'Slider matahari menskalakan S dan slider emisivitas mewakili gas rumah kaca. Turunkan input matahari ke sekitar 0,93 kali nilai sekarang dan perpotongan hangat menghilang, menyisakan bola salju saja; naikkan ke sekitar 1,28 dan bola salju yang menghilang. Di antaranya, keduanya ada, dan yang kamu dapat bergantung pada sejarahnya: inilah histeresis, yang berarti planet beku tidak mencair hanya dengan mengembalikan cahaya matahari yang membekukannya. Model ini berdimensi nol: satu suhu untuk seluruh bola dunia, tanpa lintang, tanpa musim, tanpa awan, tanpa umpan balik uap air (ε tetap kecuali kamu menggesernya), dan kapasitas panas C = 4×10⁸ J/m²K yang membuat penyeimbangan tampak hampir seketika di layar.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the ice-albedo loop amplifies any change in temperature in either direction. Right: net flux versus temperature in the model; the curve crosses zero three times, giving a stable snowball state, an unstable tipping point and a stable warm state.',
        id: 'Kiri: putaran es-albedo memperkuat perubahan suhu ke arah mana pun. Kanan: fluks neto terhadap suhu dalam model; kurva memotong nol tiga kali, menghasilkan keadaan bola salju yang stabil, titik kritis yang tak stabil, dan keadaan hangat yang stabil.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const box = (x, y, w, h, l1, l2, col) => `
  <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="6" fill="${col}" fill-opacity=".22" stroke="${col}" stroke-width="1.2"/>
  <text x="${x}" y="${y - 2}" text-anchor="middle" class="s">${l1}</text>
  <text x="${x}" y="${y + 10}" text-anchor="middle" class="s">${l2}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Ice-albedo feedback loop and the bistable energy balance', 'Putaran umpan balik es-albedo dan neraca energi bistabil')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font-weight:700}.s{font-size:9px}.f{stroke-width:1.8;fill:none;stroke:currentColor}.ax{stroke:currentColor;stroke-width:1;opacity:.6}</style>
  <defs><marker id="i" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
  ${box(100, 28, 96, 30, L('Temperature', 'Suhu'), L('falls', 'turun'), '#3b82f6')}
  ${box(170, 118, 76, 34, L('More ice', 'Es dan salju'), L('and snow', 'bertambah'), '#8b5cf6')}
  ${box(100, 208, 108, 30, L('Albedo rises:', 'Albedo naik:'), L('more sunlight reflected', 'lebih banyak dipantulkan'), '#f59e0b')}
  ${box(30, 118, 58, 34, L('Less energy', 'Energi yang'), L('absorbed', 'diserap turun'), '#ef4444')}
  <path d="M136 44 Q168 70 168 100" class="f" marker-end="url(#i)"/>
  <path d="M168 136 Q168 170 140 192" class="f" marker-end="url(#i)"/>
  <path d="M60 192 Q32 170 32 136" class="f" marker-end="url(#i)"/>
  <path d="M32 100 Q32 70 64 44" class="f" marker-end="url(#i)"/>
  <text x="100" y="114" text-anchor="middle" class="b">+</text>
  <text x="100" y="128" text-anchor="middle" class="s">${L('amplifying loop', 'putaran memperkuat')}</text>
  <text x="100" y="140" text-anchor="middle" class="s">${L('(also runs in reverse)', '(berjalan juga terbalik)')}</text>
  <line x1="222" y1="118" x2="350" y2="118" class="ax" stroke-dasharray="3 3"/>
  <line x1="222" y1="40" x2="222" y2="200" class="ax"/>
  <line x1="222" y1="200" x2="350" y2="200" class="ax"/>
  <path d="M224 62 C244 80 258 118 268 150 C276 170 286 140 300 100 C312 70 322 96 334 140 C340 160 346 180 350 196" fill="none" stroke="#10b981" stroke-width="2"/>
  <circle cx="251" cy="118" r="4" fill="#3b82f6"/>
  <circle cx="294" cy="118" r="4" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="327" cy="118" r="4" fill="#ef4444"/>
  <text x="251" y="134" text-anchor="middle" class="s" fill="#3b82f6">247 K</text>
  <text x="294" y="106" text-anchor="middle" class="s" fill="#f59e0b">276 K</text>
  <text x="327" y="134" text-anchor="middle" class="s" fill="#ef4444">288 K</text>
  <text x="286" y="34" text-anchor="middle" class="s">${L('net flux = absorbed − emitted', 'fluks neto = diserap − dipancarkan')}</text>
  <text x="286" y="214" text-anchor="middle" class="s">${L('temperature T', 'suhu T')}</text>
  <text x="286" y="230" text-anchor="middle" class="s">${L('filled dots stable, hollow dot unstable', 'titik penuh stabil, titik kosong tak stabil')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A planet is in balance when absorbed sunlight, (1 − α)·S/4, equals emitted infrared, εσT⁴.',
        'Ice raises albedo, so cooling causes more cooling and warming causes more warming: a positive feedback.',
        'Equilibria where the net-flux curve slopes downward are stable; where it slopes upward they are unstable tipping points.',
        'With ice-albedo feedback the same solar input can support two stable climates, an icy one and a warm one.',
        'Hysteresis means leaving a snowball state needs far more forcing than it took to enter it.',
      ],
      id: [
        'Planet berada dalam keseimbangan ketika cahaya matahari yang diserap, (1 − α)·S/4, sama dengan inframerah yang dipancarkan, εσT⁴.',
        'Es menaikkan albedo, sehingga pendinginan menyebabkan pendinginan lebih lanjut dan pemanasan menyebabkan pemanasan lebih lanjut: umpan balik positif.',
        'Keseimbangan di tempat kurva fluks neto menurun bersifat stabil; di tempat kurva menaik, keseimbangannya adalah titik kritis yang tak stabil.',
        'Dengan umpan balik es-albedo, input matahari yang sama dapat menopang dua iklim stabil, satu beku dan satu hangat.',
        'Histeresis berarti keluar dari keadaan bola salju membutuhkan paksaan jauh lebih besar daripada yang dibutuhkan untuk masuk ke dalamnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Albedo (α)', 'The fraction of incoming sunlight a surface or planet reflects; about 0.3 for Earth today, 0.6–0.9 for fresh snow.'],
        ['Energy-balance model', 'A climate model that tracks only the energy entering and leaving a planet, with a single global temperature.'],
        ['Stefan–Boltzmann law', 'A body at temperature T radiates εσT⁴ watts per square metre, with σ = 5.67×10⁻⁸ W/m²K⁴.'],
        ['Effective emissivity (ε)', 'A number below 1 that reduces the emission to space, standing in for the greenhouse effect of the atmosphere.'],
        ['Positive feedback', 'A loop in which the result of a change pushes the system further in the same direction.'],
        ['Stable and unstable equilibrium', 'A balance point the system returns to after a small push, versus one it runs away from.'],
        ['Bistability', 'The existence of two stable states under the same external conditions.'],
        ['Hysteresis', 'Dependence of the current state on past history, so that a path forward and back do not retrace each other.'],
      ],
      id: [
        ['Albedo (α)', 'Bagian cahaya matahari datang yang dipantulkan suatu permukaan atau planet; sekitar 0,3 untuk Bumi saat ini, 0,6–0,9 untuk salju segar.'],
        ['Model neraca energi', 'Model iklim yang hanya melacak energi yang masuk dan keluar planet, dengan satu suhu global.'],
        ['Hukum Stefan–Boltzmann', 'Benda bersuhu T memancarkan εσT⁴ watt per meter persegi, dengan σ = 5,67×10⁻⁸ W/m²K⁴.'],
        ['Emisivitas efektif (ε)', 'Bilangan di bawah 1 yang mengurangi pancaran ke angkasa, mewakili efek rumah kaca atmosfer.'],
        ['Umpan balik positif', 'Putaran ketika akibat suatu perubahan mendorong sistem lebih jauh ke arah yang sama.'],
        ['Keseimbangan stabil dan tak stabil', 'Titik keseimbangan yang dituju kembali oleh sistem setelah dorongan kecil, versus titik yang ditinggalkannya.'],
        ['Bistabilitas', 'Adanya dua keadaan stabil pada kondisi luar yang sama.'],
        ['Histeresis', 'Ketergantungan keadaan saat ini pada sejarahnya, sehingga jalur maju dan jalur kembali tidak saling menapaki.'],
      ],
    },
    misconceptions: {
      en: [
        ['If you cool a planet and then restore the sunlight, it warms back to where it was.', 'Not once it has frozen over. The ice keeps the albedo high, so the same sunlight is no longer enough; in the model you must raise S to about 1.28 of today\'s before the snowball thaws.'],
        ['A positive feedback means a runaway that never stops.', 'Positive feedback amplifies change, but it is bounded here: once the planet is fully ice-covered or fully ice-free the albedo stops changing and the T⁴ emission term takes over, giving a new stable state.'],
        ['The point where the curve crosses zero is where the climate will settle.', 'Only if the curve slopes downward there. At the middle crossing the slope is upward, so any tiny deviation grows and the planet leaves that temperature for one of the two stable states.'],
        ['Ice reflects sunlight, so melting ice simply means a little less reflection.', 'Replacing sea ice (albedo 0.5–0.7) with dark ocean (below 0.1) changes the absorbed energy in that region by a factor of several, which is why the Arctic is warming about three to four times faster than the global average.'],
      ],
      id: [
        ['Jika sebuah planet didinginkan lalu cahaya mataharinya dikembalikan, planet itu menghangat kembali ke keadaan semula.', 'Tidak setelah ia membeku seluruhnya. Es menjaga albedo tinggi, sehingga cahaya matahari yang sama tidak lagi cukup; dalam model, S harus dinaikkan ke sekitar 1,28 kali nilai sekarang sebelum bola salju mencair.'],
        ['Umpan balik positif berarti pelarian tanpa henti.', 'Umpan balik positif memperkuat perubahan, tetapi di sini ada batasnya: setelah planet tertutup es seluruhnya atau bebas es seluruhnya, albedo berhenti berubah dan suku pancaran T⁴ mengambil alih, menghasilkan keadaan stabil baru.'],
        ['Titik ketika kurva memotong nol adalah tempat iklim akan menetap.', 'Hanya jika kurva menurun di sana. Pada perpotongan tengah kemiringannya menaik, sehingga simpangan sekecil apa pun membesar dan planet meninggalkan suhu itu menuju salah satu dari dua keadaan stabil.'],
        ['Es memantulkan cahaya matahari, jadi es yang mencair hanya berarti pantulan sedikit berkurang.', 'Mengganti es laut (albedo 0,5–0,7) dengan laut gelap (di bawah 0,1) mengubah energi yang diserap di wilayah itu beberapa kali lipat, itulah sebabnya Arktik menghangat sekitar tiga sampai empat kali lebih cepat daripada rata-rata global.'],
      ],
    },
    realWorld: {
      en: [
        'Arctic September sea ice has shrunk by roughly 12–13% per decade since satellite records began in 1979, and the exposed dark ocean absorbs more summer sunlight, a direct example of the loop in the figure.',
        'Geological evidence points to "Snowball Earth" episodes around 720–635 million years ago, when ice reached the tropics; volcanic CO₂ building up over millions of years is thought to have supplied the extra forcing needed to escape.',
        'The Sun was about 25–30% fainter when Earth formed, yet the early Earth was not frozen solid; stronger greenhouse gases (a lower ε in the model) are the leading explanation of this faint-young-Sun puzzle.',
        'Mikhail Budyko and William Sellers independently published energy-balance models with ice-albedo feedback in 1969, and this bistability was one of their first results.',
      ],
      id: [
        'Es laut Arktik pada bulan September telah menyusut kira-kira 12–13% per dekade sejak rekaman satelit dimulai pada 1979, dan laut gelap yang tersingkap menyerap lebih banyak cahaya matahari musim panas, contoh langsung dari putaran dalam gambar.',
        'Bukti geologi menunjukkan episode "Bumi Bola Salju" sekitar 720–635 juta tahun lalu, ketika es mencapai daerah tropis; CO₂ vulkanik yang menumpuk selama jutaan tahun diduga menyediakan paksaan tambahan yang dibutuhkan untuk lolos.',
        'Matahari sekitar 25–30% lebih redup saat Bumi terbentuk, tetapi Bumi awal tidak membeku seluruhnya; gas rumah kaca yang lebih kuat (ε lebih rendah dalam model) adalah penjelasan utama teka-teki Matahari muda yang redup ini.',
        'Mikhail Budyko dan William Sellers secara terpisah menerbitkan model neraca energi dengan umpan balik es-albedo pada 1969, dan bistabilitas ini adalah salah satu hasil pertama mereka.',
      ],
    },
    questions: {
      en: [
        { q: 'With α = 0.30 and ε = 1 (no greenhouse effect), what equilibrium temperature does (1 − α)·S/4 = εσT⁴ give? Compare with ε = 0.61.', a: 'Absorbed = 0.70 × 340 ≈ 238 W/m². With ε = 1: T⁴ = 238 / 5.67×10⁻⁸ ≈ 4.2×10⁹, so T ≈ 255 K (−18 °C). With ε = 0.61 the same sum gives T ≈ 288 K. The 33 K difference is the greenhouse effect.' },
        { q: 'At the default settings the net-flux curve crosses zero near 276 K. Start the ball at 274 K and then at 278 K. Where does it end up each time, and why?', a: 'From 274 K it slides down to the icy state near 247 K; from 278 K it climbs to the warm state near 288 K. At 276 K the curve slopes upward, so a small deviation is amplified: slightly colder means more ice and even less absorbed energy, slightly warmer means less ice and more absorbed energy.' },
        { q: 'Why does the model show two stable states only for solar inputs between roughly 0.93 and 1.28 times today\'s value?', a: 'Below 0.93 the absorbed energy with low albedo is too small to balance emission at warm temperatures, so the warm crossing disappears. Above 1.28 even the high-albedo planet absorbs more than it emits at cold temperatures, so the icy crossing disappears. Only in between does the albedo jump create three crossings.' },
      ],
      id: [
        { q: 'Dengan α = 0,30 dan ε = 1 (tanpa efek rumah kaca), berapa suhu keseimbangan dari (1 − α)·S/4 = εσT⁴? Bandingkan dengan ε = 0,61.', a: 'Diserap = 0,70 × 340 ≈ 238 W/m². Dengan ε = 1: T⁴ = 238 / 5,67×10⁻⁸ ≈ 4,2×10⁹, sehingga T ≈ 255 K (−18 °C). Dengan ε = 0,61 perhitungan yang sama memberi T ≈ 288 K. Selisih 33 K itu adalah efek rumah kaca.' },
        { q: 'Pada pengaturan bawaan, kurva fluks neto memotong nol dekat 276 K. Mulai bola di 274 K lalu di 278 K. Ke mana bola berakhir pada tiap kasus, dan mengapa?', a: 'Dari 274 K bola menggelinding turun ke keadaan beku dekat 247 K; dari 278 K bola naik ke keadaan hangat dekat 288 K. Pada 276 K kurva menaik, sehingga simpangan kecil diperkuat: sedikit lebih dingin berarti lebih banyak es dan energi yang diserap makin sedikit, sedikit lebih hangat berarti lebih sedikit es dan energi yang diserap lebih banyak.' },
        { q: 'Mengapa model menunjukkan dua keadaan stabil hanya untuk input matahari antara kira-kira 0,93 dan 1,28 kali nilai sekarang?', a: 'Di bawah 0,93 energi yang diserap dengan albedo rendah terlalu kecil untuk mengimbangi pancaran pada suhu hangat, sehingga perpotongan hangat menghilang. Di atas 1,28 bahkan planet beralbedo tinggi menyerap lebih banyak daripada yang dipancarkannya pada suhu dingin, sehingga perpotongan beku menghilang. Hanya di antaranya lompatan albedo menciptakan tiga perpotongan.' },
      ],
    },
  },
};
