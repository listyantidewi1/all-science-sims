// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See exponential decay R(t) = e^(−t/τ).',
      'Understand why spaced repetition produces deeper retention.',
      'Design a review schedule that keeps retention above 80%.',
    ],
    id: [
      'Melihat peluruhan eksponensial R(t) = e^(−t/τ).',
      'Memahami mengapa pengulangan terjadwal menghasilkan retensi lebih dalam.',
      'Merancang jadwal tinjauan yang menjaga retensi di atas 80%.',
    ],
  },
  tryThis: {
    en: [
      'No reviews — retention drops to ~20% in a few days.',
      'Reviews at 1 hr, 1 day, 3 days — classic spaced-repetition schedule.',
      'Closely-spaced reviews — diminishing returns.',
    ],
    id: [
      'Tanpa tinjauan — retensi turun ~20% dalam beberapa hari.',
      'Tinjauan di 1 jam, 1 hari, 3 hari — jadwal pengulangan terjadwal klasik.',
      'Tinjauan terlalu rapat — hasil berkurang.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Hermann Ebbinghaus (1885) was the first person to measure forgetting. Using himself as the only subject, he memorised lists of nonsense syllables such as "ZOF" and "KEB" until he could recite them perfectly, waited, and then measured how long it took to relearn each list. The time saved on relearning was his measure of how much had been retained. The result was the forgetting curve: memory drops steeply in the first hours (he retained only about a third after a day) and then levels off, so that about a fifth was still there a month later.',
        'The simulation models retention R as an exponential decay, R(t) = e^(−t/τ), where τ (tau) is the time constant: the number of days for retention to fall to about 37%, and τ × 0.69 is the half-life. The Initial decay τ slider sets how quickly new, unrehearsed material fades. The dashed grey curve shows this no-review case. Each review (the orange markers, which you can drag) does two things in the model: it resets retention to 100%, and it multiplies τ by the Consolidation factor, so every later decay is slower than the one before. That is why the green curve becomes shallower after each review, which is the basis of spaced repetition.',
        'Compare the presets. With no review the curve plunges; a single review at day 1 buys a few extra days; the spaced schedule (1, 3, 7, 14 days) keeps retention high across the month because each review arrives before the memory has faded far and leaves a stronger, slower-decaying trace. Hover over the chart to read retention on any day, and use the horizon slider to zoom out to a semester.',
        'This is a simplified picture. Ebbinghaus\'s own data are fitted better by a curve that keeps a long tail (a power or logarithmic law) than by a pure exponential. Real reviews do not restore memory to exactly 100%, and the benefit of a review depends on its timing: reviewing when you have nearly forgotten strengthens memory more than reviewing immediately, an effect called the spacing effect that the model ignores, since it multiplies τ by the same factor however close the reviews are. Retention also depends on how meaningful the material is and how it is tested, none of which the single number τ can capture.',
      ],
      id: [
        'Hermann Ebbinghaus (1885) adalah orang pertama yang mengukur lupa. Dengan dirinya sendiri sebagai satu-satunya subjek, ia menghafal daftar suku kata tak bermakna seperti "ZOF" dan "KEB" sampai bisa mengucapkannya sempurna, menunggu, lalu mengukur berapa lama waktu untuk mempelajari ulang tiap daftar. Waktu yang dihemat saat belajar ulang menjadi ukuran seberapa banyak yang masih tersimpan. Hasilnya adalah kurva lupa: ingatan turun tajam dalam beberapa jam pertama (ia hanya mempertahankan sekitar sepertiga setelah satu hari) lalu mendatar, sehingga sekitar seperlima masih ada sebulan kemudian.',
        'Simulasi memodelkan retensi R sebagai peluruhan eksponensial, R(t) = e^(−t/τ), dengan τ (tau) sebagai konstanta waktu: jumlah hari sampai retensi turun ke sekitar 37%, dan τ × 0,69 adalah waktu paruhnya. Slider Initial decay τ mengatur seberapa cepat materi baru yang tidak diulang memudar. Kurva abu-abu putus-putus menunjukkan kasus tanpa tinjauan ini. Setiap tinjauan (penanda oranye, yang bisa kamu geser) melakukan dua hal dalam model: mengembalikan retensi ke 100%, dan mengalikan τ dengan faktor Consolidation, sehingga setiap peluruhan berikutnya lebih lambat daripada sebelumnya. Itulah mengapa kurva hijau menjadi makin landai setelah tiap tinjauan, dan inilah dasar pengulangan berjarak.',
        'Bandingkan preset-presetnya. Tanpa tinjauan, kurva terjun bebas; satu tinjauan di hari ke-1 menambah beberapa hari saja; jadwal berjarak (1, 3, 7, 14 hari) menjaga retensi tetap tinggi sepanjang bulan karena tiap tinjauan datang sebelum ingatan memudar jauh dan meninggalkan jejak yang lebih kuat dan lebih lambat meluruh. Arahkan kursor ke grafik untuk membaca retensi pada hari mana pun, dan gunakan slider horizon untuk memperluas pandangan hingga satu semester.',
        'Ini gambaran yang disederhanakan. Data Ebbinghaus sendiri lebih cocok dengan kurva yang mempertahankan ekor panjang (hukum pangkat atau logaritmik) daripada eksponensial murni. Tinjauan sungguhan tidak mengembalikan ingatan tepat ke 100%, dan manfaat tinjauan bergantung pada waktunya: meninjau saat hampir lupa memperkuat ingatan lebih besar daripada meninjau segera, yang disebut efek jarak dan diabaikan model ini, karena τ dikalikan dengan faktor yang sama seberapa pun rapatnya tinjauan. Retensi juga bergantung pada seberapa bermakna materinya dan cara mengujinya, yang tidak dapat ditangkap oleh satu angka τ.',
      ],
    },
    figure: {
      caption: {
        en: 'Without review (dashed) retention decays exponentially with time constant τ. Each review (orange) resets retention to 100% and lengthens τ, so the green curve falls more slowly after every review: this is the mechanism behind spaced repetition.',
        id: 'Tanpa tinjauan (putus-putus) retensi meluruh eksponensial dengan konstanta waktu τ. Setiap tinjauan (oranye) mengembalikan retensi ke 100% dan memperpanjang τ, sehingga kurva hijau turun lebih lambat setelah tiap tinjauan: inilah mekanisme di balik pengulangan berjarak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Forgetting curve with spaced reviews', 'Kurva lupa dengan tinjauan berjarak')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{stroke:currentColor;stroke-width:.6;opacity:.3}</style>
  <rect x="40" y="30" width="300" height="160" class="ax"/>
  <line x1="40" y1="62" x2="340" y2="62" class="g"/>
  <line x1="40" y1="110" x2="340" y2="110" class="g"/>
  <line x1="40" y1="158" x2="340" y2="158" class="g"/>
  <text x="8" y="34" class="s">100%</text>
  <text x="14" y="66" class="s">80%</text>
  <text x="14" y="114" class="s">50%</text>
  <text x="14" y="162" class="s">20%</text>
  <text x="36" y="206" class="s">0</text>
  <text x="94" y="206" class="s">6</text>
  <text x="150" y="206" class="s">12</text>
  <text x="210" y="206" class="s">18</text>
  <text x="270" y="206" class="s">24</text>
  <text x="326" y="206" class="s">30</text>
  <text x="150" y="224">${L('days since learning', 'hari sejak belajar')}</text>
  <polyline points="40,30 45,93 50,131 60,168 70,182 90,189 340,190" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4 4" opacity=".55"/>
  <text x="76" y="178" class="s" opacity=".8">${L('no review, τ = 1 day', 'tanpa tinjauan, τ = 1 hari')}</text>
  <path d="M40 30 L45 93 L50 131 L50 30 L60 101 L70 141 L70 30 L90 110 L110 150 L110 30 L140 103 L180 152 L180 30 L220 91 L260 129 L300 152 L340 166" fill="none" stroke="#10b981" stroke-width="2.4"/>
  <line x1="50" y1="30" x2="50" y2="190" stroke="#f59e0b" stroke-width="1" opacity=".6"/>
  <line x1="70" y1="30" x2="70" y2="190" stroke="#f59e0b" stroke-width="1" opacity=".6"/>
  <line x1="110" y1="30" x2="110" y2="190" stroke="#f59e0b" stroke-width="1" opacity=".6"/>
  <line x1="180" y1="30" x2="180" y2="190" stroke="#f59e0b" stroke-width="1" opacity=".6"/>
  <circle cx="50" cy="30" r="4.5" fill="#f59e0b"/>
  <circle cx="70" cy="30" r="4.5" fill="#f59e0b"/>
  <circle cx="110" cy="30" r="4.5" fill="#f59e0b"/>
  <circle cx="180" cy="30" r="4.5" fill="#f59e0b"/>
  <text x="188" y="46" class="s" fill="#f59e0b">${L('reviews at day 1, 3, 7, 14', 'tinjauan hari ke-1, 3, 7, 14')}</text>
  <text x="222" y="80" class="s" fill="#10b981">${L('each review: τ × 1.7', 'tiap tinjauan: τ × 1,7')}</text>
  <text x="222" y="94" class="s" fill="#10b981">${L('slower forgetting', 'lupa lebih lambat')}</text>
  <text x="12" y="120" class="s" transform="rotate(-90 12 120)">${L('retention', 'retensi')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Forgetting is fastest right after learning and slows down later; most of what is lost goes in the first day.',
        'In the model, R(t) = e^(−t/τ): a larger time constant τ means slower forgetting, and retention reaches 50% after about 0.69 τ.',
        'A review restores retention and, more importantly, makes the memory decay more slowly afterwards.',
        'Spacing reviews out over days keeps retention high for far less total study time than restudying everything at the end.',
        'The sim ignores the spacing effect itself (how timing changes a review\'s benefit), so it rewards late reviews only because they arrive later, not because they are harder.',
      ],
      id: [
        'Lupa berlangsung paling cepat tepat setelah belajar dan melambat kemudian; sebagian besar yang hilang pergi dalam hari pertama.',
        'Dalam model, R(t) = e^(−t/τ): konstanta waktu τ yang lebih besar berarti lupa lebih lambat, dan retensi mencapai 50% setelah sekitar 0,69 τ.',
        'Tinjauan memulihkan retensi dan, yang lebih penting, membuat ingatan meluruh lebih lambat setelahnya.',
        'Menjarakkan tinjauan selama beberapa hari menjaga retensi tetap tinggi dengan total waktu belajar yang jauh lebih sedikit daripada mengulang semuanya di akhir.',
        'Simulasi mengabaikan efek jarak itu sendiri (bagaimana waktu mengubah manfaat tinjauan), sehingga tinjauan yang terlambat menguntungkan hanya karena datang belakangan, bukan karena lebih menantang.',
      ],
    },
    vocabulary: {
      en: [
        ['Retention', 'The fraction of learned material that can still be recalled or relearned quickly at a given time.'],
        ['Forgetting curve', 'The graph of retention against time since learning: steep at first, then flattening.'],
        ['Time constant (τ)', 'In exponential decay, the time for retention to fall to about 37% (1/e) of its starting value.'],
        ['Half-life', 'The time for retention to halve; for exponential decay it equals τ × ln 2 ≈ 0.69 τ.'],
        ['Savings method', 'Ebbinghaus\'s measure of memory: how much less time relearning takes compared with the original learning.'],
        ['Consolidation', 'The process by which a memory becomes more stable and resistant to forgetting; in the sim, each review multiplies τ.'],
        ['Spaced repetition', 'Reviewing material at increasing intervals so that each review arrives just before it would be forgotten.'],
        ['Cramming (massed practice)', 'Many reviews packed into a short time; it produces good short-term recall but poor long-term retention.'],
      ],
      id: [
        ['Retensi', 'Bagian materi yang dipelajari yang masih bisa diingat atau dipelajari ulang dengan cepat pada waktu tertentu.'],
        ['Kurva lupa', 'Grafik retensi terhadap waktu sejak belajar: tajam di awal, lalu mendatar.'],
        ['Konstanta waktu (τ)', 'Dalam peluruhan eksponensial, waktu sampai retensi turun ke sekitar 37% (1/e) dari nilai awalnya.'],
        ['Waktu paruh', 'Waktu sampai retensi menjadi setengahnya; untuk peluruhan eksponensial sama dengan τ × ln 2 ≈ 0,69 τ.'],
        ['Metode penghematan', 'Ukuran ingatan Ebbinghaus: seberapa lebih sedikit waktu yang dibutuhkan untuk belajar ulang dibandingkan belajar awal.'],
        ['Konsolidasi', 'Proses ketika ingatan menjadi lebih stabil dan tahan terhadap lupa; dalam simulasi, tiap tinjauan mengalikan τ.'],
        ['Pengulangan berjarak', 'Meninjau materi pada selang yang makin panjang sehingga tiap tinjauan datang tepat sebelum materi itu terlupakan.'],
        ['Belajar kebut semalam (latihan terpusat)', 'Banyak tinjauan yang dipadatkan dalam waktu singkat; menghasilkan ingatan jangka pendek yang baik tetapi retensi jangka panjang yang buruk.'],
      ],
    },
    misconceptions: {
      en: [
        ['Forgetting happens at a steady rate, so you lose the same amount each day.', 'The loss is front-loaded. In Ebbinghaus\'s data most forgetting happened within the first day, and the following weeks removed comparatively little. The curve is steep then flat, not a straight line.'],
        ['Re-reading your notes the night before an exam is as good as reviewing them during the weeks before.', 'Cramming can produce high recall the next morning, but the memory decays fast afterwards. Spaced reviews leave a slower-decaying trace, so a month later the spaced learner remembers far more for the same total time.'],
        ['If you have forgotten something, the memory is gone and you start from zero.', 'Relearning is much faster than first learning; that saving is exactly what Ebbinghaus measured. Even material you cannot recall leaves a trace that makes the next review cheaper.'],
        ['The sim\'s exponential curve is the exact shape of human forgetting.', 'It is an approximation. Real forgetting curves have a longer tail than an exponential, and the amount retained depends on the material, the person and the kind of memory test.'],
      ],
      id: [
        ['Lupa terjadi dengan laju tetap, jadi yang hilang tiap hari sama banyaknya.', 'Kehilangannya terpusat di awal. Dalam data Ebbinghaus, sebagian besar lupa terjadi dalam hari pertama, dan minggu-minggu berikutnya menghilangkan relatif sedikit. Kurvanya tajam lalu datar, bukan garis lurus.'],
        ['Membaca ulang catatan semalam sebelum ujian sama baiknya dengan meninjaunya selama minggu-minggu sebelumnya.', 'Belajar kebut semalam bisa menghasilkan ingatan tinggi keesokan paginya, tetapi ingatan itu cepat meluruh. Tinjauan berjarak meninggalkan jejak yang lebih lambat meluruh, sehingga sebulan kemudian pelajar yang menjarakkan tinjauan mengingat jauh lebih banyak dengan total waktu yang sama.'],
        ['Kalau sudah lupa, ingatannya hilang dan kita mulai dari nol.', 'Belajar ulang jauh lebih cepat daripada belajar pertama kali; penghematan itulah yang diukur Ebbinghaus. Bahkan materi yang tidak bisa diingat meninggalkan jejak yang membuat tinjauan berikutnya lebih murah.'],
        ['Kurva eksponensial simulasi adalah bentuk persis dari lupa pada manusia.', 'Itu hanya pendekatan. Kurva lupa sungguhan punya ekor yang lebih panjang daripada eksponensial, dan jumlah yang tersimpan bergantung pada materi, orangnya, dan jenis tes ingatannya.'],
      ],
    },
    realWorld: {
      en: [
        'Flashcard apps such as Anki schedule each card at growing intervals (1 day, 3 days, a week, a month), which is the spaced schedule in this sim automated per card.',
        'Language learners who practise ten minutes a day retain far more vocabulary than those who study the same seventy minutes in one weekly session.',
        'Medical and pilot training uses refresher courses at set intervals because skills such as CPR decay measurably within months of certification.',
        'Teachers who begin each lesson with a short quiz on earlier topics are inserting reviews before the forgetting curve bottoms out.',
      ],
      id: [
        'Aplikasi kartu hafalan seperti Anki menjadwalkan tiap kartu pada selang yang makin panjang (1 hari, 3 hari, seminggu, sebulan), yaitu jadwal berjarak dalam simulasi ini yang diotomatiskan per kartu.',
        'Pelajar bahasa yang berlatih sepuluh menit sehari mempertahankan kosakata jauh lebih banyak daripada yang belajar tujuh puluh menit yang sama dalam satu sesi mingguan.',
        'Pelatihan medis dan pilot memakai kursus penyegaran pada selang tertentu karena keterampilan seperti CPR terukur menurun dalam beberapa bulan setelah sertifikasi.',
        'Guru yang memulai tiap pelajaran dengan kuis singkat tentang topik sebelumnya sedang menyisipkan tinjauan sebelum kurva lupa mencapai dasarnya.',
      ],
    },
    questions: {
      en: [
        { q: 'With τ = 1 day and no reviews, what retention does the model predict after 1 day and after 3 days?', a: 'R(1) = e^(−1) ≈ 0.37, so 37%; R(3) = e^(−3) ≈ 0.05, so about 5%. This is why the dashed curve is almost on the floor by the end of the first week.' },
        { q: 'You review once at day 1 with a consolidation factor of 1.7. What is retention at day 3 now, compared with the no-review case?', a: 'The review resets retention to 100% at day 1 and stretches τ to 1.7 days. Two days later, R = e^(−2/1.7) ≈ e^(−1.18) ≈ 0.31, so 31% instead of 5%. One well-timed review has multiplied the surviving memory by six.' },
        { q: 'Starting from τ = 1 day and a consolidation factor of 1.7, how many reviews would you need so that retention stays at or above 80% for a full week after the last review?', a: 'You need e^(−7/τ) ≥ 0.8, so 7/τ ≤ 0.223 and τ ≥ about 31 days. Each review multiplies τ by 1.7, so solve 1.7^n ≥ 31: n ≥ ln 31 / ln 1.7 ≈ 3.43 / 0.53 ≈ 6.5, so 7 reviews. In the sim you can check this by dragging seven markers into place and hovering a week after the last one.' },
      ],
      id: [
        { q: 'Dengan τ = 1 hari dan tanpa tinjauan, berapa retensi yang diprediksi model setelah 1 hari dan setelah 3 hari?', a: 'R(1) = e^(−1) ≈ 0,37, yaitu 37%; R(3) = e^(−3) ≈ 0,05, yaitu sekitar 5%. Itulah sebabnya kurva putus-putus hampir menyentuh dasar pada akhir minggu pertama.' },
        { q: 'Kamu meninjau sekali di hari ke-1 dengan faktor konsolidasi 1,7. Berapa retensi di hari ke-3 sekarang, dibandingkan dengan kasus tanpa tinjauan?', a: 'Tinjauan mengembalikan retensi ke 100% di hari ke-1 dan memperpanjang τ menjadi 1,7 hari. Dua hari kemudian, R = e^(−2/1,7) ≈ e^(−1,18) ≈ 0,31, yaitu 31% dan bukan 5%. Satu tinjauan yang tepat waktu melipatgandakan ingatan yang bertahan sebanyak enam kali.' },
        { q: 'Mulai dari τ = 1 hari dan faktor konsolidasi 1,7, berapa tinjauan yang diperlukan agar retensi tetap 80% atau lebih selama seminggu penuh setelah tinjauan terakhir?', a: 'Dibutuhkan e^(−7/τ) ≥ 0,8, sehingga 7/τ ≤ 0,223 dan τ ≥ sekitar 31 hari. Tiap tinjauan mengalikan τ dengan 1,7, jadi selesaikan 1,7^n ≥ 31: n ≥ ln 31 / ln 1,7 ≈ 3,43 / 0,53 ≈ 6,5, jadi 7 tinjauan. Dalam simulasi kamu bisa mengeceknya dengan menggeser tujuh penanda ke tempatnya dan mengarahkan kursor ke seminggu setelah tinjauan terakhir.' },
      ],
    },
  },
};
