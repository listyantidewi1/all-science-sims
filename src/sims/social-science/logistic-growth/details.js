// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See exponential growth become logistic when N approaches K.',
      'Identify the inflection point at N = K/2 — fastest growth.',
      'Connect r (intrinsic growth rate) and K (carrying capacity) to ecology and economics.',
    ],
    id: [
      'Melihat pertumbuhan eksponensial menjadi logistik saat N mendekati K.',
      'Mengidentifikasi titik belok di N = K/2 — pertumbuhan tercepat.',
      'Menghubungkan r (laju intrinsik) dan K (daya dukung) dengan ekologi dan ekonomi.',
    ],
  },
  tryThis: {
    en: [
      'Small N₀ — early growth looks exponential, then bends.',
      'Large r — population shoots up, overshoots K (in continuous logistic, no overshoot).',
      'Small K — population levels off quickly.',
    ],
    id: [
      'N₀ kecil — pertumbuhan awal tampak eksponensial, lalu membengkok.',
      'r besar — populasi meroket, melampaui K (di logistik kontinu, tak ada overshoot).',
      'K kecil — populasi cepat mendatar.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A population with plenty of food and space grows exponentially: each individual adds offspring at a steady per-capita rate r, so the more there are, the faster the total grows, and the curve bends ever more steeply upward. No real population can do this for long. As numbers rise, food, space, nesting sites or customers run short, deaths rise and births fall, and growth slows. The size at which the environment can just sustain the population, where births balance deaths, is the carrying capacity K.',
        'Pierre-François Verhulst (1838) captured this with the logistic equation, dN/dt = rN(1 − N/K). The factor rN is the exponential growth that would happen without limits; the factor (1 − N/K) is the brake. When N is tiny the brake is almost 1 and growth is almost exponential; when N is half of K the brake is 1/2; when N reaches K it is 0 and growth stops. The result is the S-shaped (sigmoid) curve: slow start, rapid middle, flat finish. Growth is fastest at the inflection point N = K/2, where the growth rate reaches its maximum of rK/4, and the time to get there is t* = ln((K − N₀)/N₀) / r.',
        'The simulation plots the exact solution, N(t) = K / (1 + A·e^(−rt)) with A = (K − N₀)/N₀. The r slider sets how steep the climb is and how soon the inflection arrives; K moves the ceiling and the dashed line that marks it; N₀ shifts the whole curve left or right in time without changing its shape; the time horizon zooms the axis. The toggle overlays the pure exponential N₀·e^(rt) so you can see the two curves agree while N is small and part company as N approaches K. Hovering shows both values at any time.',
        'The model leaves a lot out. The carrying capacity is treated as constant, although real environments change with the seasons and are themselves changed by the population. Because the sim uses the continuous solution, the population glides up to K and never overshoots; real populations with delayed responses or discrete breeding seasons can overshoot and oscillate, or even crash. There is no randomness, no migration, no age structure and no minimum viable population size. The logistic curve is best treated as a first sketch of limited growth, not a forecast.',
      ],
      id: [
        'Populasi dengan makanan dan ruang yang melimpah tumbuh secara eksponensial: setiap individu menambah keturunan dengan laju per kapita tetap r, sehingga makin banyak jumlahnya, makin cepat totalnya tumbuh, dan kurvanya menanjak makin curam. Tidak ada populasi nyata yang bisa begitu untuk waktu lama. Saat jumlah bertambah, makanan, ruang, tempat bersarang, atau pelanggan menjadi langka, kematian naik dan kelahiran turun, dan pertumbuhan melambat. Ukuran yang masih sanggup ditopang lingkungan, ketika kelahiran seimbang dengan kematian, disebut daya dukung K.',
        'Pierre-François Verhulst (1838) menangkap ini dengan persamaan logistik, dN/dt = rN(1 − N/K). Faktor rN adalah pertumbuhan eksponensial yang akan terjadi tanpa batas; faktor (1 − N/K) adalah remnya. Saat N sangat kecil, remnya hampir 1 dan pertumbuhan hampir eksponensial; saat N setengah dari K, remnya 1/2; saat N mencapai K, remnya 0 dan pertumbuhan berhenti. Hasilnya adalah kurva berbentuk S (sigmoid): awal lambat, tengah cepat, akhir mendatar. Pertumbuhan paling cepat terjadi di titik belok N = K/2, ketika laju pertumbuhan mencapai maksimum rK/4, dan waktu untuk mencapainya adalah t* = ln((K − N₀)/N₀) / r.',
        'Simulasi memplot solusi eksaknya, N(t) = K / (1 + A·e^(−rt)) dengan A = (K − N₀)/N₀. Slider r mengatur seberapa curam tanjakan dan seberapa cepat titik belok tiba; K memindahkan batas atas dan garis putus-putus yang menandainya; N₀ menggeser seluruh kurva ke kiri atau ke kanan dalam waktu tanpa mengubah bentuknya; horizon waktu memperbesar sumbu. Tombol toggle menumpangkan eksponensial murni N₀·e^(rt) sehingga kamu bisa melihat kedua kurva berimpit saat N kecil dan berpisah saat N mendekati K. Mengarahkan kursor menampilkan kedua nilai pada waktu mana pun.',
        'Model ini mengabaikan banyak hal. Daya dukung dianggap konstan, padahal lingkungan nyata berubah dengan musim dan juga diubah oleh populasinya sendiri. Karena simulasi memakai solusi kontinu, populasi meluncur mulus ke K dan tidak pernah melampauinya; populasi nyata dengan respons tertunda atau musim kawin yang diskret bisa melampaui dan berosilasi, bahkan runtuh. Tidak ada keacakan, migrasi, struktur umur, maupun ukuran populasi minimum yang layak. Kurva logistik sebaiknya dipandang sebagai sketsa awal pertumbuhan terbatas, bukan ramalan.',
      ],
    },
    figure: {
      caption: {
        en: 'Logistic growth with r = 0.4, K = 1000, N₀ = 10. The curve tracks the exponential (dashed) while N is small, grows fastest at the inflection point N = K/2 (here at t ≈ 11.5), then flattens as N approaches the carrying capacity K.',
        id: 'Pertumbuhan logistik dengan r = 0,4, K = 1000, N₀ = 10. Kurva mengikuti eksponensial (putus-putus) saat N kecil, tumbuh paling cepat di titik belok N = K/2 (di sini pada t ≈ 11,5), lalu mendatar saat N mendekati daya dukung K.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Logistic S-curve with carrying capacity', 'Kurva S logistik dengan daya dukung')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{stroke:currentColor;stroke-width:.6;opacity:.3}</style>
  <rect x="40" y="30" width="300" height="170" class="ax"/>
  <line x1="40" y1="138.5" x2="340" y2="138.5" class="g"/>
  <line x1="40" y1="77" x2="340" y2="77" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="5 4"/>
  <text x="300" y="72" class="s" fill="#f59e0b">K = 1000</text>
  <text x="8" y="81" class="s">1000</text>
  <text x="14" y="142" class="s">500</text>
  <text x="30" y="204" class="s">0</text>
  <text x="36" y="214" class="s">0</text>
  <text x="134" y="214" class="s">10</text>
  <text x="234" y="214" class="s">20</text>
  <text x="332" y="214" class="s">30</text>
  <text x="160" y="230">${L('time t', 'waktu t')}</text>
  <polyline points="40,198.8 80,193.9 100,186.5 120,169.9 140,132.8 150,99.8 160,50.5 164,30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4 4" opacity=".55"/>
  <text x="166" y="44" class="s" opacity=".8">${L('exponential: no limit', 'eksponensial: tanpa batas')}</text>
  <polyline points="40,198.8 80,194.1 100,187.7 120,175.6 140,156.2 155,138.3 170,120.4 190,101.2 210,89.1 240,80.9 280,77.8 340,77.1" fill="none" stroke="#10b981" stroke-width="2.6"/>
  <text x="214" y="112" fill="#10b981">${L('logistic: dN/dt = rN(1 − N/K)', 'logistik: dN/dt = rN(1 − N/K)')}</text>
  <circle cx="155" cy="138.3" r="5" fill="#ef4444"/>
  <text x="56" y="128" class="s" fill="#ef4444">${L('inflection N = K/2', 'titik belok N = K/2')}</text>
  <text x="56" y="140" class="s" fill="#ef4444">${L('fastest growth rK/4', 'pertumbuhan tercepat rK/4')}</text>
  <text x="48" y="190" class="s" opacity=".8">${L('slow start', 'awal lambat')}</text>
  <text x="250" y="96" class="s" opacity=".8">${L('brake (1 − N/K) → 0', 'rem (1 − N/K) → 0')}</text>
  <text x="12" y="150" class="s" transform="rotate(-90 12 150)">${L('population N', 'populasi N')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Exponential growth cannot last: resources limit every real population, and the carrying capacity K is the size the environment can sustain.',
        'The logistic equation dN/dt = rN(1 − N/K) multiplies exponential growth by a brake that falls from 1 to 0 as N rises to K.',
        'The S-curve grows fastest at N = K/2, where dN/dt = rK/4; before that growth accelerates, after it growth slows.',
        'Larger r makes the climb steeper and earlier; larger K raises the ceiling; N₀ shifts the curve in time without changing its shape.',
        'The continuous logistic curve approaches K smoothly and never overshoots; real populations can overshoot because of delays and discrete breeding.',
      ],
      id: [
        'Pertumbuhan eksponensial tidak bisa bertahan: sumber daya membatasi setiap populasi nyata, dan daya dukung K adalah ukuran yang bisa ditopang lingkungan.',
        'Persamaan logistik dN/dt = rN(1 − N/K) mengalikan pertumbuhan eksponensial dengan rem yang turun dari 1 ke 0 saat N naik menuju K.',
        'Kurva S tumbuh paling cepat pada N = K/2, ketika dN/dt = rK/4; sebelum itu pertumbuhan makin cepat, sesudahnya melambat.',
        'r yang lebih besar membuat tanjakan lebih curam dan lebih awal; K yang lebih besar menaikkan batas atas; N₀ menggeser kurva dalam waktu tanpa mengubah bentuknya.',
        'Kurva logistik kontinu mendekati K dengan mulus dan tidak pernah melampauinya; populasi nyata bisa melampaui K karena penundaan dan musim kawin yang diskret.',
      ],
    },
    vocabulary: {
      en: [
        ['Exponential growth', 'Growth at a constant per-capita rate, N(t) = N₀·e^(rt), which doubles every ln 2 / r units of time.'],
        ['Intrinsic growth rate (r)', 'The per-capita growth rate when resources are unlimited: births minus deaths per individual per unit time.'],
        ['Carrying capacity (K)', 'The maximum population size an environment can sustain indefinitely; growth is zero when N = K.'],
        ['Logistic growth', 'Growth that starts exponentially and slows as the population approaches K, producing an S-shaped curve.'],
        ['Inflection point', 'The point on the S-curve where growth is fastest and the curve switches from bending upward to bending downward, at N = K/2.'],
        ['Sigmoid (S-curve)', 'Any curve with a slow start, a steep middle and a flat finish, such as the logistic.'],
        ['Density dependence', 'Birth or death rates that change with population density; the brake term (1 − N/K) is the simplest form.'],
        ['Doubling time', 'Time for a population to double during exponential growth: ln 2 / r ≈ 0.69 / r.'],
      ],
      id: [
        ['Pertumbuhan eksponensial', 'Pertumbuhan dengan laju per kapita tetap, N(t) = N₀·e^(rt), yang berlipat dua setiap ln 2 / r satuan waktu.'],
        ['Laju pertumbuhan intrinsik (r)', 'Laju pertumbuhan per kapita saat sumber daya tak terbatas: kelahiran dikurangi kematian per individu per satuan waktu.'],
        ['Daya dukung (K)', 'Ukuran populasi maksimum yang dapat ditopang lingkungan tanpa batas waktu; pertumbuhan nol saat N = K.'],
        ['Pertumbuhan logistik', 'Pertumbuhan yang mula-mula eksponensial dan melambat saat populasi mendekati K, menghasilkan kurva berbentuk S.'],
        ['Titik belok', 'Titik pada kurva S ketika pertumbuhan paling cepat dan kurva berganti dari melengkung ke atas menjadi melengkung ke bawah, pada N = K/2.'],
        ['Sigmoid (kurva S)', 'Kurva apa pun dengan awal lambat, tengah curam, dan akhir mendatar, seperti kurva logistik.'],
        ['Kebergantungan kepadatan', 'Laju kelahiran atau kematian yang berubah dengan kepadatan populasi; suku rem (1 − N/K) adalah bentuk paling sederhananya.'],
        ['Waktu penggandaan', 'Waktu bagi populasi untuk berlipat dua selama pertumbuhan eksponensial: ln 2 / r ≈ 0,69 / r.'],
      ],
    },
    misconceptions: {
      en: [
        ['The population grows fastest just before it reaches K, because that is where it is biggest.', 'Growth is fastest at N = K/2. Above that, each extra individual adds less because the brake (1 − N/K) is shrinking faster than N is growing, so dN/dt falls toward zero as N nears K.'],
        ['Carrying capacity is a fixed property of a place.', 'K depends on the resource that is limiting, which changes with season, technology and the population itself. Humans have raised their own K repeatedly through agriculture and medicine, which is why human population curves are hard to fit with a single logistic.'],
        ['Changing N₀ changes how fast the population can grow.', 'In the logistic model N₀ only shifts the curve along the time axis. The steepness is set by r and the ceiling by K; a smaller N₀ simply means the inflection point arrives later.'],
        ['A large r makes the population overshoot K in this sim.', 'Not in the continuous logistic equation, which the sim solves exactly: N approaches K from below and never crosses it. Overshoot appears in discrete-time or delayed versions, which are different models.'],
      ],
      id: [
        ['Populasi tumbuh paling cepat tepat sebelum mencapai K, karena di situlah jumlahnya terbesar.', 'Pertumbuhan paling cepat pada N = K/2. Di atas itu, tiap individu tambahan menyumbang lebih sedikit karena rem (1 − N/K) menyusut lebih cepat daripada pertumbuhan N, sehingga dN/dt turun menuju nol saat N mendekati K.'],
        ['Daya dukung adalah sifat tetap suatu tempat.', 'K bergantung pada sumber daya yang membatasi, yang berubah dengan musim, teknologi, dan populasi itu sendiri. Manusia telah berulang kali menaikkan K-nya melalui pertanian dan kedokteran, karena itu kurva populasi manusia sulit dicocokkan dengan satu kurva logistik.'],
        ['Mengubah N₀ mengubah seberapa cepat populasi dapat tumbuh.', 'Dalam model logistik, N₀ hanya menggeser kurva sepanjang sumbu waktu. Kecuraman ditentukan r dan batas atas oleh K; N₀ yang lebih kecil hanya berarti titik belok tiba lebih lambat.'],
        ['r yang besar membuat populasi melampaui K dalam simulasi ini.', 'Tidak pada persamaan logistik kontinu, yang diselesaikan simulasi secara eksak: N mendekati K dari bawah dan tidak pernah melewatinya. Overshoot muncul pada versi waktu-diskret atau dengan penundaan, yang merupakan model berbeda.'],
      ],
    },
    realWorld: {
      en: [
        'Bacteria in a flask follow a logistic curve almost exactly: a lag, a log phase, then a plateau as nutrients run out.',
        'The spread of new technologies such as mobile phones or electric cars follows an S-curve: slow adoption by pioneers, rapid uptake, then saturation as nearly everyone who wants one has one.',
        'Fisheries management uses the logistic model: the maximum sustainable yield is taken at N = K/2, where the population replaces itself fastest.',
        'Epidemics in a closed population produce S-shaped cumulative case curves, and the inflection point marks the day new cases peak.',
      ],
      id: [
        'Bakteri dalam labu mengikuti kurva logistik hampir persis: fase lag, fase log, lalu dataran saat nutrisi habis.',
        'Penyebaran teknologi baru seperti ponsel atau mobil listrik mengikuti kurva S: adopsi lambat oleh perintis, serapan cepat, lalu jenuh saat hampir semua yang menginginkannya sudah memilikinya.',
        'Pengelolaan perikanan memakai model logistik: hasil tangkapan lestari maksimum diambil pada N = K/2, ketika populasi paling cepat menggantikan dirinya.',
        'Epidemi dalam populasi tertutup menghasilkan kurva kasus kumulatif berbentuk S, dan titik beloknya menandai hari ketika kasus baru mencapai puncak.',
      ],
    },
    questions: {
      en: [
        { q: 'A bacterial culture has r = 1 per hour, K = 1 000 000 and N₀ = 100. When does it reach 500 000 cells?', a: 'Half of K is the inflection point, reached at t* = ln((K − N₀)/N₀) / r = ln(999 900 / 100) / 1 = ln(9999) ≈ 9.2 hours. At that moment the culture is growing at its fastest, rK/4 = 250 000 cells per hour.' },
        { q: 'With the default settings (r = 0.4, K = 1000, N₀ = 10), what is the early doubling time, and roughly how large is the population when the logistic and exponential curves have clearly separated?', a: 'While N is small the growth is nearly exponential with doubling time ln 2 / r = 0.69 / 0.4 ≈ 1.7 time units. The brake (1 − N/K) is 0.9 at N = 100, so by about N = 100 to 200 the logistic curve is visibly below the exponential; at N = 500 the logistic grows at only half the exponential rate.' },
        { q: 'Why does the growth rate dN/dt fall to zero as N approaches K even though the population is larger than ever?', a: 'dN/dt = rN × (1 − N/K) is a product of two factors. N keeps growing, but (1 − N/K) shrinks toward zero as N nears K, and it shrinks faster than N grows once N passes K/2. At N = K the brake is exactly zero, so births equal deaths and the population holds steady; the curve becomes flat at the carrying capacity.' },
      ],
      id: [
        { q: 'Suatu kultur bakteri memiliki r = 1 per jam, K = 1.000.000, dan N₀ = 100. Kapan jumlahnya mencapai 500.000 sel?', a: 'Setengah dari K adalah titik belok, dicapai pada t* = ln((K − N₀)/N₀) / r = ln(999.900 / 100) / 1 = ln(9999) ≈ 9,2 jam. Pada saat itu kultur tumbuh paling cepat, rK/4 = 250.000 sel per jam.' },
        { q: 'Dengan pengaturan bawaan (r = 0,4, K = 1000, N₀ = 10), berapa waktu penggandaan awal, dan kira-kira seberapa besar populasi ketika kurva logistik dan eksponensial sudah jelas terpisah?', a: 'Saat N kecil pertumbuhannya hampir eksponensial dengan waktu penggandaan ln 2 / r = 0,69 / 0,4 ≈ 1,7 satuan waktu. Rem (1 − N/K) bernilai 0,9 pada N = 100, sehingga sekitar N = 100 sampai 200 kurva logistik sudah terlihat di bawah eksponensial; pada N = 500 kurva logistik tumbuh hanya setengah laju eksponensial.' },
        { q: 'Mengapa laju pertumbuhan dN/dt turun ke nol saat N mendekati K padahal populasinya lebih besar daripada sebelumnya?', a: 'dN/dt = rN × (1 − N/K) adalah hasil kali dua faktor. N terus bertambah, tetapi (1 − N/K) menyusut menuju nol saat N mendekati K, dan menyusut lebih cepat daripada pertumbuhan N begitu N melewati K/2. Pada N = K remnya tepat nol, sehingga kelahiran sama dengan kematian dan populasi tetap; kurva menjadi datar pada daya dukung.' },
      ],
    },
  },
};
