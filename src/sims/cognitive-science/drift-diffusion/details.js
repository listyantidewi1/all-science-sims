// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Name the five parameters of the drift-diffusion model and what each represents psychologically.',
      'Explain why response times are right-skewed and why errors can be faster or slower than correct responses.',
      'Describe the speed–accuracy tradeoff as a change in boundary separation, not in evidence quality.',
    ],
    id: [
      'Menyebutkan lima parameter model difusi-drift dan makna psikologis masing-masing.',
      'Menjelaskan mengapa waktu respons miring ke kanan dan mengapa kesalahan bisa lebih cepat atau lebih lambat daripada respons benar.',
      'Menggambarkan pertukaran kecepatan–akurasi sebagai perubahan jarak batas, bukan kualitas bukti.',
    ],
  },
  tryThis: {
    en: [
      'Raise the boundary from 0.6 to 2.0 — accuracy climbs, but how much slower do decisions get?',
      'Set drift to 0: evidence is pure noise. What accuracy and RT distribution do you get?',
      'Move the starting point toward the lower bound — do errors become fast and frequent?',
    ],
    id: [
      'Naikkan batas dari 0,6 ke 2,0 — akurasi naik, tetapi seberapa lambat keputusan menjadi?',
      'Atur drift ke 0: bukti murni derau. Akurasi dan distribusi RT apa yang Anda dapat?',
      'Geser titik awal ke arah batas bawah — apakah kesalahan menjadi cepat dan sering?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Many everyday decisions are two-choice judgements made under uncertainty: is that word real, is this dot pattern moving left or right, is the face familiar? Roger Ratcliff\'s drift-diffusion model (1978) describes such decisions as the gradual accumulation of noisy evidence. A single quantity, the decision variable x, starts at a point z between two absorbing boundaries, 0 and a. At each instant it moves by v·dt, the drift, plus a random kick s·√dt·N(0,1), the noise. The first boundary it touches determines the response, and the time it takes, plus a fixed non-decision time Ter for encoding the stimulus and executing the movement, is the response time: RT = decision time + Ter.',
        'Each parameter has a psychological reading. The drift rate v is the quality of the evidence, high for an easy stimulus or a skilled observer, zero when the stimulus carries no information. The boundary separation a is caution: wide boundaries demand more evidence before committing. The starting point z captures bias toward one response, from expectation or payoff. The noise s is a scaling constant, conventionally fixed, and Ter accounts for everything that is not deciding. Because noise can push the variable to the wrong boundary, the model predicts both the proportion of errors and the full shape of the RT distributions, which are right-skewed because a trial that wanders takes a long time while no trial can be faster than Ter.',
        'For constant parameters the model has closed-form results that the sim prints as "theory". The probability of reaching the upper (correct) boundary is P = (1 − e^(−2vz/s²)) / (1 − e^(−2va/s²)), and the mean decision time is (a·P − z)/v; for an unbiased start z = a/2 this becomes (a/2v)·tanh(va/2s²). With the default settings (v = 0.3, a = 1, s = 1, z = 0.5, Ter = 0.25 s) that gives 57% correct and a mean RT of about 0.50 s. Each slider recomputes a batch of 1500 simulated trials for the histograms and replays 24 live traces; the boundary-sweep panel plots accuracy and mean RT against a with everything else fixed, which is the speed–accuracy tradeoff in its purest form: the same evidence, traded between speed and caution.',
        'The sim implements the simplest version of the model. With constant drift and a symmetric start, correct and error RT distributions are identical; the "full" model adds trial-to-trial variability in drift, which produces slow errors, and in starting point, which produces fast errors. Here fast errors appear only when you move z toward the lower boundary. Trials still undecided after 3 s are dropped from the histograms, time is discretised in 2 ms steps, and the decision variable is a one-dimensional abstraction: the brain does not literally hold a single number, although firing rates in some parietal and frontal neurons rise toward a threshold in strikingly similar fashion.',
      ],
      id: [
        'Banyak keputusan sehari-hari adalah penilaian dua pilihan dalam ketidakpastian: apakah kata itu kata sungguhan, apakah pola titik ini bergerak ke kiri atau kanan, apakah wajah ini dikenal? Model difusi-drift Roger Ratcliff (1978) menggambarkan keputusan semacam itu sebagai penumpukan bertahap bukti yang berderau. Satu besaran, variabel keputusan x, mulai dari titik z di antara dua batas penyerap, 0 dan a. Pada tiap saat ia bergerak sebesar v·dt, yaitu drift, ditambah sentakan acak s·√dt·N(0,1), yaitu derau. Batas pertama yang disentuhnya menentukan respons, dan waktu yang dibutuhkan, ditambah waktu non-keputusan tetap Ter untuk menyandikan stimulus dan menjalankan gerakan, adalah waktu respons: RT = waktu keputusan + Ter.',
        'Tiap parameter punya makna psikologis. Laju drift v adalah kualitas bukti, tinggi untuk stimulus yang mudah atau pengamat yang terlatih, nol ketika stimulus tidak membawa informasi. Jarak batas a adalah kehati-hatian: batas yang lebar menuntut lebih banyak bukti sebelum memutuskan. Titik awal z menangkap bias ke salah satu respons, dari ekspektasi atau imbalan. Derau s adalah tetapan skala yang biasanya dibuat tetap, dan Ter mencakup semua hal selain memutuskan. Karena derau bisa mendorong variabel ke batas yang salah, model memprediksi baik proporsi kesalahan maupun bentuk lengkap distribusi RT, yang miring ke kanan karena percobaan yang berkelana memakan waktu lama sementara tidak ada percobaan yang bisa lebih cepat daripada Ter.',
        'Untuk parameter tetap, model ini punya hasil bentuk tertutup yang dicetak simulasi sebagai "theory". Peluang mencapai batas atas (benar) adalah P = (1 − e^(−2vz/s²)) / (1 − e^(−2va/s²)), dan rata-rata waktu keputusan adalah (a·P − z)/v; untuk awal tanpa bias z = a/2 rumusnya menjadi (a/2v)·tanh(va/2s²). Dengan pengaturan bawaan (v = 0,3, a = 1, s = 1, z = 0,5, Ter = 0,25 s) hasilnya 57% benar dan rata-rata RT sekitar 0,50 s. Tiap slider menghitung ulang 1500 percobaan simulasi untuk histogram dan memutar ulang 24 lintasan langsung; panel sapuan batas memplot akurasi dan rata-rata RT terhadap a dengan semua yang lain tetap, yaitu pertukaran kecepatan–akurasi dalam bentuk paling murni: bukti yang sama, ditukar antara kecepatan dan kehati-hatian.',
        'Simulasi ini menerapkan versi paling sederhana dari model. Dengan drift tetap dan awal simetris, distribusi RT benar dan salah identik; model "lengkap" menambahkan variabilitas antar-percobaan pada drift, yang menghasilkan kesalahan lambat, dan pada titik awal, yang menghasilkan kesalahan cepat. Di sini kesalahan cepat hanya muncul jika kamu menggeser z ke arah batas bawah. Percobaan yang belum terputus setelah 3 s dibuang dari histogram, waktu didiskretkan dalam langkah 2 ms, dan variabel keputusan adalah abstraksi satu dimensi: otak tidak sungguh-sungguh menyimpan satu angka, meskipun laju tembakan sejumlah neuron parietal dan frontal naik menuju ambang dengan cara yang sangat mirip.',
      ],
    },
    figure: {
      caption: {
        en: 'Noisy evidence traces start at z after the non-decision time Ter and drift upward at rate v. The first boundary reached decides the response; the spread of arrival times builds the right-skewed RT distributions for correct (top) and error (bottom) responses.',
        id: 'Lintasan bukti berderau mulai dari z setelah waktu non-keputusan Ter dan hanyut ke atas dengan laju v. Batas pertama yang dicapai menentukan respons; sebaran waktu tiba membentuk distribusi RT yang miring ke kanan untuk respons benar (atas) dan salah (bawah).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Drift-diffusion model: evidence traces racing to two boundaries', 'Model difusi-drift: lintasan bukti berpacu ke dua batas')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.b{font-weight:700;font-size:11px}.s{font-size:9px;opacity:.85}.tr{fill:none;stroke-width:1.3}</style>
  <defs><marker id="dd" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
  <rect x="112" y="40" width="8" height="12" fill="#10b981" opacity=".8"/><rect x="122" y="30" width="8" height="22" fill="#10b981" opacity=".8"/><rect x="132" y="20" width="8" height="32" fill="#10b981" opacity=".8"/><rect x="142" y="14" width="8" height="38" fill="#10b981" opacity=".8"/><rect x="152" y="18" width="8" height="34" fill="#10b981" opacity=".8"/><rect x="162" y="26" width="8" height="26" fill="#10b981" opacity=".8"/><rect x="172" y="32" width="8" height="20" fill="#10b981" opacity=".8"/><rect x="182" y="37" width="8" height="15" fill="#10b981" opacity=".8"/><rect x="192" y="41" width="8" height="11" fill="#10b981" opacity=".8"/><rect x="202" y="44" width="8" height="8" fill="#10b981" opacity=".8"/><rect x="212" y="46" width="8" height="6" fill="#10b981" opacity=".8"/><rect x="222" y="48" width="8" height="4" fill="#10b981" opacity=".8"/><rect x="232" y="49" width="8" height="3" fill="#10b981" opacity=".8"/><rect x="242" y="50" width="8" height="2" fill="#10b981" opacity=".8"/>
  <rect x="122" y="178" width="8" height="5" fill="#ef4444" opacity=".8"/><rect x="132" y="178" width="8" height="10" fill="#ef4444" opacity=".8"/><rect x="142" y="178" width="8" height="14" fill="#ef4444" opacity=".8"/><rect x="152" y="178" width="8" height="12" fill="#ef4444" opacity=".8"/><rect x="162" y="178" width="8" height="9" fill="#ef4444" opacity=".8"/><rect x="172" y="178" width="8" height="7" fill="#ef4444" opacity=".8"/><rect x="182" y="178" width="8" height="5" fill="#ef4444" opacity=".8"/><rect x="192" y="178" width="8" height="4" fill="#ef4444" opacity=".8"/><rect x="202" y="178" width="8" height="3" fill="#ef4444" opacity=".8"/><rect x="212" y="178" width="8" height="2" fill="#ef4444" opacity=".8"/>
  <rect x="30" y="54" width="40" height="120" fill="currentColor" fill-opacity=".08"/>
  <line x1="30" y1="54" x2="340" y2="54" stroke="currentColor" stroke-width="2"/>
  <line x1="30" y1="174" x2="340" y2="174" stroke="currentColor" stroke-width="2"/>
  <line x1="30" y1="114" x2="340" y2="114" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
  <path d="M70 114 L80 108 L90 116 L100 102 L110 106 L120 94 L130 98 L140 86 L150 90 L160 76 L170 80 L180 64 L190 54" class="tr" stroke="#10b981"/>
  <path d="M70 114 L80 104 L90 96 L100 100 L110 88 L120 80 L130 72 L140 62 L150 54" class="tr" stroke="#10b981"/>
  <path d="M70 114 L85 120 L100 112 L115 122 L130 108 L145 114 L160 100 L175 104 L190 92 L205 96 L220 82 L235 74 L250 62 L260 54" class="tr" stroke="#10b981"/>
  <path d="M70 114 L85 122 L100 116 L115 130 L130 124 L145 138 L160 132 L175 146 L190 154 L205 150 L220 164 L230 174" class="tr" stroke="#ef4444"/>
  <path d="M70 114 L75 110 L80 118 L85 112 L90 120 L95 114 L100 122" class="tr" stroke="currentColor" opacity=".6"/>
  <line x1="100" y1="122" x2="150" y2="104" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#dd)"/>
  <text x="156" y="104" fill="#3b82f6" class="s">${L('mean drift v', 'drift rata-rata v')}</text>
  <text x="34" y="50" class="b">a</text>
  <text x="50" y="50" class="s">${L('upper bound: correct', 'batas atas: benar')}</text>
  <text x="34" y="186" class="b">0</text>
  <text x="50" y="186" class="s">${L('lower bound: error', 'batas bawah: salah')}</text>
  <text x="34" y="111" class="b">z</text>
  <text x="50" y="128" class="s">Ter</text>
  <text x="250" y="20" fill="#10b981" class="s">${L('correct RT distribution', 'distribusi RT benar')}</text>
  <text x="230" y="186" fill="#ef4444" class="s">${L('error RT distribution', 'distribusi RT salah')}</text>
  <line x1="30" y1="200" x2="340" y2="200" stroke="currentColor" stroke-width="1" marker-end="url(#dd)"/>
  <text x="185" y="214" text-anchor="middle" class="s">${L('time →  RT = decision time + Ter', 'waktu →  RT = waktu keputusan + Ter')}</text>
  <text x="185" y="232" text-anchor="middle" class="s">${L('noise s jitters every step; wider a means slower but more accurate', 'derau s menggoyang tiap langkah; a lebih lebar berarti lebih lambat tetapi lebih akurat')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A two-choice decision is modelled as noisy evidence accumulating from a starting point z until it hits one of two boundaries, 0 or a.',
        'Drift rate v is evidence quality, boundary separation a is caution, z is bias, s is noise and Ter is the time for everything other than deciding.',
        'Widening the boundaries raises accuracy and lengthens RT with the evidence unchanged: that is the speed–accuracy tradeoff.',
        'RT distributions are right-skewed because the noisy walk can wander for a long time but can never finish before Ter.',
        'With fixed parameters errors and correct responses have the same RT distribution; bias toward the error boundary makes errors fast, drift variability would make them slow.',
      ],
      id: [
        'Keputusan dua pilihan dimodelkan sebagai bukti berderau yang menumpuk dari titik awal z sampai menyentuh salah satu dari dua batas, 0 atau a.',
        'Laju drift v adalah kualitas bukti, jarak batas a adalah kehati-hatian, z adalah bias, s adalah derau, dan Ter adalah waktu untuk segala hal selain memutuskan.',
        'Melebarkan batas menaikkan akurasi dan memperpanjang RT dengan bukti yang tidak berubah: itulah pertukaran kecepatan–akurasi.',
        'Distribusi RT miring ke kanan karena jalan acak berderau bisa berkelana lama tetapi tidak pernah bisa selesai sebelum Ter.',
        'Dengan parameter tetap, respons salah dan benar punya distribusi RT yang sama; bias ke arah batas salah membuat kesalahan cepat, variabilitas drift akan membuatnya lambat.',
      ],
    },
    vocabulary: {
      en: [
        ['Decision variable', 'The running total of evidence for one response over the other; its position between the boundaries at any moment.'],
        ['Drift rate (v)', 'The average speed at which evidence accumulates toward the correct boundary; a measure of stimulus quality or skill.'],
        ['Boundary separation (a)', 'The distance between the two decision thresholds; larger values mean more caution.'],
        ['Starting point (z)', 'Where accumulation begins; z = a/2 is unbiased, values nearer one boundary favour that response.'],
        ['Non-decision time (Ter)', 'Time spent encoding the stimulus and producing the motor response, added to the decision time.'],
        ['Wiener process', 'The continuous random walk with constant drift and Gaussian noise that the model uses for evidence accumulation.'],
        ['Speed–accuracy tradeoff', 'The fact that faster decisions are less accurate when evidence quality is held constant, produced here by changing a.'],
        ['Right-skewed distribution', 'A distribution with a long tail toward large values, the typical shape of response-time data.'],
      ],
      id: [
        ['Variabel keputusan', 'Jumlah berjalan bukti yang mendukung satu respons dibanding yang lain; posisinya di antara kedua batas pada tiap saat.'],
        ['Laju drift (v)', 'Kecepatan rata-rata bukti menumpuk menuju batas yang benar; ukuran kualitas stimulus atau keterampilan.'],
        ['Jarak batas (a)', 'Jarak antara kedua ambang keputusan; nilai yang lebih besar berarti lebih hati-hati.'],
        ['Titik awal (z)', 'Tempat penumpukan bermula; z = a/2 tanpa bias, nilai yang lebih dekat ke satu batas menguntungkan respons itu.'],
        ['Waktu non-keputusan (Ter)', 'Waktu untuk menyandikan stimulus dan menghasilkan respons motorik, ditambahkan ke waktu keputusan.'],
        ['Proses Wiener', 'Jalan acak kontinu dengan drift tetap dan derau Gauss yang dipakai model untuk penumpukan bukti.'],
        ['Pertukaran kecepatan–akurasi', 'Kenyataan bahwa keputusan yang lebih cepat kurang akurat jika kualitas bukti dijaga tetap, di sini dihasilkan dengan mengubah a.'],
        ['Distribusi miring ke kanan', 'Distribusi dengan ekor panjang ke arah nilai besar, bentuk khas data waktu respons.'],
      ],
    },
    misconceptions: {
      en: [
        ['Faster responders are simply better at the task.', 'Speed alone is ambiguous. A person can be fast because evidence is strong (high v) or because they are reckless (small a). Only the joint pattern of RT and accuracy separates skill from caution, which is what the model is for.'],
        ['Errors are always faster than correct responses because people guess.', 'In the basic model with an unbiased start, error and correct RTs are identical. Fast errors need a bias or variable starting point; slow errors arise from variable drift. The sim shows fast errors only when you move z toward the lower bound.'],
        ['Doubling the boundary doubles accuracy.', 'Accuracy is bounded at 100% and follows a saturating function of a, while mean decision time grows almost in proportion to a. From a = 1 to a = 2 at the default drift, accuracy goes from 57% to 65% but mean RT from 0.50 s to about 1.22 s.'],
        ['Non-decision time is a fudge factor.', 'Ter corresponds to real, measurable processes: sensory encoding and motor execution take time regardless of the decision. It shifts the whole RT distribution without changing its shape or the error rate.'],
      ],
      id: [
        ['Orang yang merespons lebih cepat berarti lebih mahir dalam tugas itu.', 'Kecepatan saja bersifat ambigu. Seseorang bisa cepat karena buktinya kuat (v tinggi) atau karena gegabah (a kecil). Hanya pola bersama RT dan akurasi yang memisahkan keterampilan dari kehati-hatian, dan untuk itulah model ini ada.'],
        ['Kesalahan selalu lebih cepat daripada respons benar karena orang menebak.', 'Dalam model dasar dengan awal tanpa bias, RT salah dan benar identik. Kesalahan cepat memerlukan bias atau titik awal yang bervariasi; kesalahan lambat timbul dari drift yang bervariasi. Simulasi menunjukkan kesalahan cepat hanya jika kamu menggeser z ke arah batas bawah.'],
        ['Menggandakan batas menggandakan akurasi.', 'Akurasi dibatasi 100% dan mengikuti fungsi jenuh terhadap a, sementara rata-rata waktu keputusan tumbuh hampir sebanding dengan a. Dari a = 1 ke a = 2 pada drift bawaan, akurasi naik dari 57% ke 65% tetapi rata-rata RT dari 0,50 s menjadi sekitar 1,22 s.'],
        ['Waktu non-keputusan hanyalah angka pengisi.', 'Ter sesuai dengan proses nyata yang terukur: penyandian sensorik dan pelaksanaan motorik memakan waktu terlepas dari keputusannya. Ia menggeser seluruh distribusi RT tanpa mengubah bentuknya atau tingkat kesalahan.'],
      ],
    },
    realWorld: {
      en: [
        'In random-dot motion tasks, the firing rate of neurons in the monkey lateral intraparietal area ramps up like a diffusion trace and the animal responds when it reaches a threshold, giving the model a neural interpretation.',
        'Drift-diffusion fits show that older adults are often slower mainly because they set wider boundaries (more caution) and have longer Ter, not because their evidence quality is much worse.',
        'Clinical studies use the model to separate symptoms: in ADHD, for example, lower drift rates rather than impulsive boundaries often explain the slower, more variable responses.',
        'The same mathematics describes sequential sampling in statistics (Wald\'s sequential probability ratio test), where one keeps collecting data until the evidence crosses a preset threshold.',
      ],
      id: [
        'Dalam tugas gerak titik acak, laju tembakan neuron di area intraparietal lateral monyet naik seperti lintasan difusi dan hewan merespons ketika mencapai ambang, memberi model ini tafsir saraf.',
        'Pencocokan difusi-drift menunjukkan bahwa orang lanjut usia sering lebih lambat terutama karena memasang batas lebih lebar (lebih hati-hati) dan Ter lebih panjang, bukan karena kualitas buktinya jauh lebih buruk.',
        'Studi klinis memakai model ini untuk memilah gejala: pada ADHD, misalnya, laju drift yang lebih rendah, bukan batas yang impulsif, sering menjelaskan respons yang lebih lambat dan lebih bervariasi.',
        'Matematika yang sama menggambarkan pengambilan sampel berurutan dalam statistika (uji rasio peluang berurutan Wald), ketika data terus dikumpulkan sampai bukti melewati ambang yang ditetapkan.',
      ],
    },
    questions: {
      en: [
        { q: 'With v = 0.3, s = 1 and an unbiased start, compute the predicted accuracy for a = 1 and for a = 2 using P = (1 − e^(−2vz/s²)) / (1 − e^(−2va/s²)) with z = a/2.', a: 'For a = 1, z = 0.5: P = (1 − e^(−0.3)) / (1 − e^(−0.6)) = 0.259 / 0.451 ≈ 0.57. For a = 2, z = 1: P = (1 − e^(−0.6)) / (1 − e^(−1.2)) = 0.451 / 0.699 ≈ 0.65. Doubling caution adds about 8 percentage points here.' },
        { q: 'Using mean decision time = (a·P − z)/v, find the mean RT for the two cases above with Ter = 0.25 s, and state what this says about the speed–accuracy tradeoff.', a: 'a = 1: (1 × 0.574 − 0.5)/0.3 ≈ 0.25 s, so RT ≈ 0.50 s. a = 2: (2 × 0.646 − 1)/0.3 ≈ 0.97 s, so RT ≈ 1.22 s. Accuracy rose modestly while RT more than doubled: caution buys accuracy at a steep price in time.' },
        { q: 'Set the drift rate to 0 in the sim. What accuracy do you expect, why are RTs still finite, and what would the mean decision time be for a = 1, z = 0.5, s = 1?', a: 'Accuracy is 50% because with no drift the walk is equally likely to hit either boundary (P = z/a). Noise alone eventually carries the variable to a boundary, so RTs are finite but long and widely spread. The zero-drift mean decision time is z(a − z)/s² = 0.5 × 0.5 = 0.25 s, giving RT ≈ 0.50 s.' },
      ],
      id: [
        { q: 'Dengan v = 0,3, s = 1, dan awal tanpa bias, hitung akurasi yang diprediksi untuk a = 1 dan a = 2 menggunakan P = (1 − e^(−2vz/s²)) / (1 − e^(−2va/s²)) dengan z = a/2.', a: 'Untuk a = 1, z = 0,5: P = (1 − e^(−0,3)) / (1 − e^(−0,6)) = 0,259 / 0,451 ≈ 0,57. Untuk a = 2, z = 1: P = (1 − e^(−0,6)) / (1 − e^(−1,2)) = 0,451 / 0,699 ≈ 0,65. Menggandakan kehati-hatian menambah sekitar 8 poin persentase di sini.' },
        { q: 'Dengan rata-rata waktu keputusan = (a·P − z)/v, cari rata-rata RT untuk kedua kasus di atas dengan Ter = 0,25 s, dan nyatakan apa artinya bagi pertukaran kecepatan–akurasi.', a: 'a = 1: (1 × 0,574 − 0,5)/0,3 ≈ 0,25 s, sehingga RT ≈ 0,50 s. a = 2: (2 × 0,646 − 1)/0,3 ≈ 0,97 s, sehingga RT ≈ 1,22 s. Akurasi naik sedikit sementara RT lebih dari dua kali lipat: kehati-hatian membeli akurasi dengan harga waktu yang mahal.' },
        { q: 'Atur laju drift ke 0 dalam simulasi. Akurasi apa yang kamu perkirakan, mengapa RT tetap berhingga, dan berapa rata-rata waktu keputusan untuk a = 1, z = 0,5, s = 1?', a: 'Akurasi 50% karena tanpa drift jalan acak sama mungkinnya menyentuh batas mana pun (P = z/a). Derau saja akhirnya membawa variabel ke suatu batas, sehingga RT berhingga tetapi panjang dan tersebar lebar. Rata-rata waktu keputusan tanpa drift adalah z(a − z)/s² = 0,5 × 0,5 = 0,25 s, memberi RT ≈ 0,50 s.' },
      ],
    },
  },
};
