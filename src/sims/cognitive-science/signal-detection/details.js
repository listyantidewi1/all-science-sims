// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply d′ = (μ_signal − μ_noise) / σ as the sensitivity measure.',
      'Read the four cells of the confusion table from the criterion shift.',
      'Trace the ROC curve as β sweeps from strict to liberal.',
    ],
    id: [
      'Menerapkan d′ = (μ_sinyal − μ_noise) / σ sebagai ukuran sensitivitas.',
      'Membaca empat sel tabel konfusi dari geser kriteria.',
      'Menelusuri kurva ROC saat β menyapu dari ketat ke longgar.',
    ],
  },
  tryThis: {
    en: [
      'd′ = 1 — moderate overlap; β controls trade-off.',
      'd′ = 3 — distributions barely overlap; easy task.',
      'd′ = 0 — pure guessing; ROC is the diagonal.',
    ],
    id: [
      'd′ = 1 — tumpang tindih sedang; β mengatur trade-off.',
      'd′ = 3 — distribusi hampir tak tumpang tindih; tugas mudah.',
      'd′ = 0 — tebak murni; ROC adalah diagonal.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Many decisions are a yes-or-no judgement made on noisy evidence: is there a tumour on this scan, did the smoke alarm hear a fire, was that faint tone really played? Signal detection theory (SDT), developed in the 1950s from radar engineering and brought into psychology by Green and Swets, treats such a decision as a comparison between an internal evidence value and a threshold. On every trial the observer gets a single number: how "signal-like" the evidence feels. On noise-only trials this number comes from one bell-shaped distribution; when a signal is present it comes from a second distribution shifted to the right. The two curves overlap, so no threshold can be perfect.',
        'The observer sets a criterion and says "yes" whenever the evidence exceeds it. That splits every trial into four outcomes: a hit (signal present, said yes), a miss (signal present, said no), a false alarm (no signal, said yes) and a correct rejection (no signal, said no). The hit rate is the area of the signal distribution to the right of the criterion, and the false-alarm rate is the area of the noise distribution to the right of it. Sensitivity, d′, is the distance between the two means in units of their common standard deviation: d′ = (μ_signal − μ_noise) / σ. From data it is computed as d′ = z(hit rate) − z(false-alarm rate). A d′ of 0 means the distributions coincide and the observer is guessing; a d′ of 3 means they barely overlap.',
        'In the simulation the noise distribution has mean 0, the signal distribution has mean d′, and both have σ = 1. The d′ slider changes the separation; the Criterion slider (or dragging the yellow line) moves the threshold. The confusion matrix shows the four outcome probabilities, and the ROC panel plots hit rate against false-alarm rate for every possible criterion, with the current operating point marked. Moving the criterion slides the point along the ROC curve without changing d′, which is the central lesson: sensitivity and bias are independent. Raising d′ bows the curve toward the top-left corner; at d′ = 0 the curve is the diagonal.',
        'Two simplifications matter. First, the sim labels the criterion position β, but in most textbooks β is the likelihood ratio of the two curves at the criterion, while the position itself is written c or λ; the sim\'s slider is the position on the evidence axis. Second, the model assumes equal-variance Gaussian distributions, which gives symmetric ROC curves; real data often show unequal variances and a slightly skewed curve. The sim also ignores payoffs and base rates, the two factors that normally determine where a rational observer places the criterion.',
      ],
      id: [
        'Banyak keputusan berupa penilaian ya-atau-tidak berdasarkan bukti yang berisik: adakah tumor pada hasil pindaian ini, apakah alarm asap benar mendeteksi api, apakah nada samar itu sungguh dibunyikan? Teori deteksi sinyal (SDT), yang berkembang pada 1950-an dari rekayasa radar dan dibawa ke psikologi oleh Green dan Swets, memandang keputusan seperti itu sebagai perbandingan antara nilai bukti internal dan sebuah ambang. Pada setiap percobaan pengamat menerima satu angka: seberapa "mirip sinyal" bukti itu terasa. Pada percobaan tanpa sinyal angka itu berasal dari satu distribusi berbentuk lonceng; ketika sinyal hadir angka itu berasal dari distribusi kedua yang bergeser ke kanan. Kedua kurva tumpang tindih, sehingga tidak ada ambang yang sempurna.',
        'Pengamat menetapkan kriteria dan menjawab "ya" setiap kali bukti melampauinya. Ini membagi tiap percobaan menjadi empat hasil: hit (sinyal ada, jawab ya), miss (sinyal ada, jawab tidak), alarm palsu (tak ada sinyal, jawab ya), dan penolakan benar (tak ada sinyal, jawab tidak). Laju hit adalah luas distribusi sinyal di sebelah kanan kriteria, dan laju alarm palsu adalah luas distribusi noise di sebelah kanannya. Sensitivitas, d′, adalah jarak antara kedua rerata dalam satuan simpangan baku bersamanya: d′ = (μ_sinyal − μ_noise) / σ. Dari data, nilainya dihitung sebagai d′ = z(laju hit) − z(laju alarm palsu). d′ = 0 berarti kedua distribusi berimpit dan pengamat sekadar menebak; d′ = 3 berarti keduanya hampir tidak tumpang tindih.',
        'Dalam simulasi, distribusi noise bermean 0, distribusi sinyal bermean d′, dan keduanya memiliki σ = 1. Slider d′ mengubah jarak pisah; slider Criterion (atau menyeret garis kuning) menggeser ambang. Matriks konfusi menampilkan probabilitas keempat hasil, dan panel ROC menggambar laju hit terhadap laju alarm palsu untuk setiap kemungkinan kriteria, dengan titik operasi saat ini ditandai. Menggeser kriteria menggerakkan titik itu di sepanjang kurva ROC tanpa mengubah d′, dan inilah pelajaran utamanya: sensitivitas dan bias saling bebas. Menaikkan d′ melengkungkan kurva ke arah sudut kiri atas; pada d′ = 0 kurvanya adalah diagonal.',
        'Dua penyederhanaan perlu dicatat. Pertama, simulasi melabeli posisi kriteria sebagai β, padahal di kebanyakan buku teks β adalah rasio kemungkinan kedua kurva pada kriteria, sedangkan posisinya sendiri ditulis c atau λ; slider di simulasi ini adalah posisi pada sumbu bukti. Kedua, model mengasumsikan distribusi Gauss dengan varians sama, yang menghasilkan kurva ROC simetris; data nyata sering menunjukkan varians tak sama dan kurva yang sedikit miring. Simulasi juga mengabaikan imbalan dan laju dasar, dua faktor yang biasanya menentukan di mana pengamat rasional meletakkan kriterianya.',
      ],
    },
    figure: {
      caption: {
        en: 'Evidence on noise-only trials (blue) and signal trials (red) with d′ = 1.5. Everything right of the criterion (yellow) is called "yes": the red area is the hit rate (0.77), the shaded blue area is the false-alarm rate (0.23). Moving the line trades one against the other; only d′ changes the overlap.',
        id: 'Bukti pada percobaan tanpa sinyal (biru) dan percobaan bersinyal (merah) dengan d′ = 1,5. Semua di sebelah kanan kriteria (kuning) dijawab "ya": luas merah adalah laju hit (0,77), luas biru yang diarsir adalah laju alarm palsu (0,23). Menggeser garis menukar satu dengan yang lain; hanya d′ yang mengubah tumpang tindih.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const noise = 'M20 173.8 L30.7 172.5 L41.3 170.2 L52 166.2 L62.7 160.1 L73.3 151.2 L84 139.3 L94.7 124.6 L105.3 108.3 L116 92 L126.7 77.9 L137.3 68.4 L148 65 L158.7 68.4 L169.3 77.9 L180 92 L190.7 108.3 L201.3 124.6 L212 139.3 L222.7 151.2 L233.3 160.1 L244 166.2 L254.7 170.2 L265.3 172.5 L276 173.8 L297.3 174.8 L340 175';
        const signal = 'M20 175 L62.7 174.8 L84 173.8 L94.7 172.5 L105.3 170.2 L116 166.2 L126.7 160.1 L137.3 151.2 L148 139.3 L158.7 124.6 L169.3 108.3 L180 92 L190.7 77.9 L201.3 68.4 L212 65 L222.7 68.4 L233.3 77.9 L244 92 L254.7 108.3 L265.3 124.6 L276 139.3 L286.7 151.2 L297.3 160.1 L308 166.2 L318.7 170.2 L329.3 172.5 L340 173.8';
        const fa = 'M180 175 L180 92 L190.7 108.3 L201.3 124.6 L212 139.3 L222.7 151.2 L233.3 160.1 L244 166.2 L254.7 170.2 L265.3 172.5 L276 173.8 L297.3 174.8 L340 175 Z';
        const hit = 'M180 175 L180 92 L190.7 77.9 L201.3 68.4 L212 65 L222.7 68.4 L233.3 77.9 L244 92 L254.7 108.3 L265.3 124.6 L276 139.3 L286.7 151.2 L297.3 160.1 L308 166.2 L318.7 170.2 L329.3 172.5 L340 173.8 L340 175 Z';
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Noise and signal distributions with a decision criterion', 'Distribusi noise dan sinyal dengan kriteria keputusan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.s{font-size:10px;opacity:.75}</style>
  <path d="${hit}" fill="#ef4444" opacity=".28"/>
  <path d="${fa}" fill="#3b82f6" opacity=".45"/>
  <path d="${noise}" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <path d="${signal}" fill="none" stroke="#ef4444" stroke-width="2"/>
  <line x1="20" y1="175" x2="340" y2="175" class="m"/>
  <text x="20" y="190" class="s">${L('low evidence', 'bukti rendah')}</text>
  <text x="280" y="190" class="s">${L('high evidence', 'bukti tinggi')}</text>
  <line x1="148" y1="175" x2="148" y2="65" class="m" stroke-dasharray="3 3"/>
  <line x1="212" y1="175" x2="212" y2="65" class="m" stroke-dasharray="3 3"/>
  <line x1="148" y1="56" x2="212" y2="56" stroke="#8b5cf6" stroke-width="1.6" marker-start="url(#pa)" marker-end="url(#pb)"/>
  <text x="180" y="50" text-anchor="middle" fill="#8b5cf6" font-weight="700">d′</text>
  <line x1="180" y1="30" x2="180" y2="178" stroke="#f59e0b" stroke-width="2.4"/>
  <text x="184" y="30" fill="#f59e0b" font-weight="700">${L('criterion', 'kriteria')}</text>
  <text x="60" y="80" fill="#3b82f6" font-weight="700">${L('noise only', 'noise saja')}</text>
  <text x="236" y="80" fill="#ef4444" font-weight="700">${L('noise + signal', 'noise + sinyal')}</text>
  <text x="108" y="160" fill="#3b82f6" class="s" text-anchor="end">← ${L('"no"', '"tidak"')}</text>
  <text x="188" y="160" fill="#f59e0b" class="s">${L('"yes"', '"ya"')} →</text>
  <text x="20" y="212" fill="#ef4444" font-weight="700">${L('red area right of line = hits', 'luas merah di kanan garis = hit')}</text>
  <text x="20" y="226" fill="#3b82f6" font-weight="700">${L('blue area right of line = false alarms', 'luas biru di kanan garis = alarm palsu')}</text>
  <text x="200" y="212" class="s">${L('left of line: misses (red), correct rejections (blue)', 'kiri garis: miss (merah), penolakan benar (biru)')}</text>
  <defs>
    <marker id="pa" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto"><path d="M8 0 L0 4 L8 8 z" fill="#8b5cf6"/></marker>
    <marker id="pb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#8b5cf6"/></marker>
  </defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A yes/no decision on noisy evidence always produces four outcomes: hits, misses, false alarms and correct rejections.',
        'Sensitivity d′ is the separation of the signal and noise distributions in standard-deviation units; it measures how good the evidence is.',
        'The criterion is a separate choice: a strict criterion gives few false alarms but many misses, a liberal one the reverse.',
        'Moving the criterion slides the operating point along one ROC curve; only a change in d′ moves to a different curve.',
        'Hit rate alone cannot show skill, because a person who says "yes" to everything scores 100% hits and 100% false alarms.',
      ],
      id: [
        'Keputusan ya/tidak atas bukti yang berisik selalu menghasilkan empat hasil: hit, miss, alarm palsu, dan penolakan benar.',
        'Sensitivitas d′ adalah jarak pisah distribusi sinyal dan noise dalam satuan simpangan baku; ia mengukur seberapa baik buktinya.',
        'Kriteria adalah pilihan terpisah: kriteria ketat memberi sedikit alarm palsu tetapi banyak miss, kriteria longgar sebaliknya.',
        'Menggeser kriteria memindahkan titik operasi di sepanjang satu kurva ROC; hanya perubahan d′ yang berpindah ke kurva lain.',
        'Laju hit saja tidak bisa menunjukkan kemampuan, karena orang yang menjawab "ya" untuk semuanya mendapat 100% hit dan 100% alarm palsu.',
      ],
    },
    vocabulary: {
      en: [
        ['Signal detection theory', 'A model of decisions under uncertainty that separates how discriminable the evidence is (d′) from how the observer sets the threshold.'],
        ['Hit', 'A signal was present and the observer said "yes".'],
        ['Miss', 'A signal was present and the observer said "no".'],
        ['False alarm', 'No signal was present but the observer said "yes".'],
        ['Correct rejection', 'No signal was present and the observer said "no".'],
        ['Sensitivity (d′)', 'The distance between the means of the signal and noise distributions divided by their standard deviation; d′ = z(hit rate) − z(false-alarm rate).'],
        ['Criterion', 'The evidence level above which the observer says "yes"; its position reflects response bias.'],
        ['ROC curve', 'Receiver operating characteristic: the plot of hit rate against false-alarm rate for every possible criterion at a fixed d′.'],
      ],
      id: [
        ['Teori deteksi sinyal', 'Model keputusan dalam ketidakpastian yang memisahkan seberapa terbedakan buktinya (d′) dari cara pengamat menetapkan ambang.'],
        ['Hit', 'Sinyal ada dan pengamat menjawab "ya".'],
        ['Miss', 'Sinyal ada dan pengamat menjawab "tidak".'],
        ['Alarm palsu', 'Sinyal tidak ada tetapi pengamat menjawab "ya".'],
        ['Penolakan benar', 'Sinyal tidak ada dan pengamat menjawab "tidak".'],
        ['Sensitivitas (d′)', 'Jarak antara rerata distribusi sinyal dan noise dibagi simpangan bakunya; d′ = z(laju hit) − z(laju alarm palsu).'],
        ['Kriteria', 'Tingkat bukti yang jika dilampaui membuat pengamat menjawab "ya"; posisinya mencerminkan bias respons.'],
        ['Kurva ROC', 'Receiver operating characteristic: plot laju hit terhadap laju alarm palsu untuk setiap kemungkinan kriteria pada d′ tetap.'],
      ],
    },
    misconceptions: {
      en: [
        ['A higher hit rate means a better detector.', 'Not on its own. Lowering the criterion raises the hit rate and the false-alarm rate together. Only d′, which uses both rates, measures how well the signal is actually discriminated.'],
        ['There is one correct place for the criterion.', 'The best criterion depends on the costs of each error and how common the signal is. A cancer screen should accept many false alarms to avoid misses; a spam filter should do the opposite.'],
        ['False alarms show the observer is careless or guessing.', 'With overlapping distributions, false alarms are unavoidable for anyone who achieves a reasonable hit rate. Zero false alarms is only possible by missing many real signals.'],
      ],
      id: [
        ['Laju hit yang lebih tinggi berarti pendeteksi yang lebih baik.', 'Tidak dengan sendirinya. Menurunkan kriteria menaikkan laju hit dan laju alarm palsu bersamaan. Hanya d′, yang memakai kedua laju, yang mengukur seberapa baik sinyal benar-benar dibedakan.'],
        ['Ada satu tempat yang benar untuk kriteria.', 'Kriteria terbaik bergantung pada biaya tiap kesalahan dan seberapa sering sinyal muncul. Skrining kanker sebaiknya menerima banyak alarm palsu untuk menghindari miss; penyaring spam sebaliknya.'],
        ['Alarm palsu menunjukkan pengamat ceroboh atau menebak.', 'Dengan distribusi yang tumpang tindih, alarm palsu tak terhindarkan bagi siapa pun yang mencapai laju hit yang layak. Nol alarm palsu hanya mungkin dengan melewatkan banyak sinyal nyata.'],
      ],
    },
    realWorld: {
      en: [
        'Radiologists reading mammograms: a more liberal criterion catches more tumours but sends more healthy patients for biopsy, and ROC analysis is the standard way to compare imaging methods.',
        'Smoke detectors are set to a liberal criterion on purpose, so burnt toast triggers them (false alarm) rather than risk a missed fire.',
        'Airport baggage screeners face rare signals; SDT explains why planted test images are used to keep screeners\' criteria from drifting toward "no".',
        'Eyewitness line-ups and recognition-memory experiments are analysed with d′ so that a witness\'s willingness to pick someone is separated from their actual ability to recognise the face.',
      ],
      id: [
        'Radiolog membaca mamogram: kriteria lebih longgar menangkap lebih banyak tumor tetapi mengirim lebih banyak pasien sehat untuk biopsi, dan analisis ROC adalah cara baku membandingkan metode pencitraan.',
        'Detektor asap sengaja diatur dengan kriteria longgar, sehingga roti gosong memicunya (alarm palsu) daripada berisiko melewatkan kebakaran.',
        'Petugas pemindai bagasi bandara menghadapi sinyal yang langka; SDT menjelaskan mengapa citra uji disisipkan agar kriteria petugas tidak bergeser ke arah "tidak".',
        'Identifikasi saksi mata dan eksperimen memori pengenalan dianalisis dengan d′ agar kesediaan saksi menunjuk seseorang dipisahkan dari kemampuan sesungguhnya mengenali wajah.',
      ],
    },
    questions: {
      en: [
        { q: 'With d′ = 1.5 and the criterion at 0.75 (exactly halfway between the means), what hit rate and false-alarm rate does the sim show, and why are they symmetric?', a: 'Hit rate ≈ 0.77 and false-alarm rate ≈ 0.23. The criterion sits 0.75σ above the noise mean and 0.75σ below the signal mean, so the tail of the noise curve beyond it equals the tail of the signal curve short of it, and the two probabilities sum to 1.' },
        { q: 'An observer has a hit rate of 0.84 and a false-alarm rate of 0.16. What is d′, and would saying "yes" more often raise it?', a: 'z(0.84) ≈ 1.0 and z(0.16) ≈ −1.0, so d′ ≈ 2.0. Saying "yes" more often raises both rates together and leaves d′ unchanged; it only moves the operating point along the same ROC curve.' },
        { q: 'A doctor screening for a dangerous but treatable disease wants to be sure not to miss a case. Which way should she move the criterion in the sim, and what price does she pay?', a: 'To the left (more liberal). Misses fall and hits rise, but false alarms rise too: more healthy people get worrying results and follow-up tests. The right amount depends on the relative cost of a missed case versus an unnecessary test.' },
      ],
      id: [
        { q: 'Dengan d′ = 1,5 dan kriteria pada 0,75 (tepat di tengah antara kedua rerata), berapa laju hit dan laju alarm palsu yang ditampilkan simulasi, dan mengapa keduanya simetris?', a: 'Laju hit ≈ 0,77 dan laju alarm palsu ≈ 0,23. Kriteria berada 0,75σ di atas rerata noise dan 0,75σ di bawah rerata sinyal, sehingga ekor kurva noise di seberangnya sama dengan ekor kurva sinyal yang tidak sampai, dan kedua probabilitas berjumlah 1.' },
        { q: 'Seorang pengamat memiliki laju hit 0,84 dan laju alarm palsu 0,16. Berapa d′-nya, dan apakah lebih sering menjawab "ya" akan menaikkannya?', a: 'z(0,84) ≈ 1,0 dan z(0,16) ≈ −1,0, jadi d′ ≈ 2,0. Lebih sering menjawab "ya" menaikkan kedua laju bersamaan dan d′ tidak berubah; itu hanya menggeser titik operasi di sepanjang kurva ROC yang sama.' },
        { q: 'Seorang dokter yang menyaring penyakit berbahaya tetapi dapat diobati ingin memastikan tidak ada kasus terlewat. Ke arah mana ia harus menggeser kriteria di simulasi, dan apa harga yang dibayar?', a: 'Ke kiri (lebih longgar). Miss berkurang dan hit bertambah, tetapi alarm palsu juga naik: lebih banyak orang sehat menerima hasil mengkhawatirkan dan tes lanjutan. Jumlah yang tepat bergantung pada biaya relatif kasus terlewat dibanding tes yang tidak perlu.' },
      ],
    },
  },
};
