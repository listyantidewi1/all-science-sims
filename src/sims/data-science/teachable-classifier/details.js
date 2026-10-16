// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain that a machine learns to classify by looking at labelled examples, not by being told rules.',
      'Describe how the machine uses two features (size and colour) to find the pattern and draw its own "regions".',
      'Show that the machine\'s guesses depend on the examples it was given: wrong or one-sided examples lead to wrong guesses.',
    ],
    id: [
      'Menjelaskan bahwa mesin belajar mengklasifikasi dengan melihat contoh berlabel, bukan dengan diberi aturan.',
      'Menjelaskan cara mesin memakai dua ciri (ukuran dan warna) untuk menemukan pola dan menggambar "wilayah" miliknya sendiri.',
      'Menunjukkan bahwa tebakan mesin bergantung pada contoh yang diberikan: contoh yang salah atau sepihak menghasilkan tebakan yang salah.',
    ],
  },
  tryThis: {
    en: [
      'Label only one apple and one lemon, then press Test. How sure is the machine? Now add five more of each and test again.',
      'Press Biased data (small apples) and then test several times. Which fruit does the machine call a big red apple?',
      'Be a bad teacher: label a few lemons as "Apple" on purpose. Watch the apple region move. Does the machine complain?',
      'Turn off the regions and try to guess the mystery fruit yourself before the machine does. Who is right more often?',
    ],
    id: [
      'Beri label hanya satu apel dan satu lemon, lalu tekan Uji. Seberapa yakin mesinnya? Sekarang tambahkan lima contoh lagi untuk tiap buah dan uji lagi.',
      'Tekan Data bias (apel kecil) lalu uji beberapa kali. Buah apa yang disebut mesin untuk apel merah yang besar?',
      'Jadilah guru yang buruk: beri label "Apel" pada beberapa lemon dengan sengaja. Lihat wilayah apel bergeser. Apakah mesin protes?',
      'Matikan wilayah dan coba tebak sendiri buah misterinya sebelum mesin menebak. Siapa yang lebih sering benar?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A computer does not know what an apple is. It only sees numbers. In this sim every fruit is turned into two numbers, called features: how big it is (left to right on the chart) and how red or yellow its colour is (bottom to top). A lemon is small and yellow, so it lands near the bottom left. An apple is big and red, so it lands near the top right. Each fruit becomes one dot on the chart.',
        'The machine learns from you. Every time you tap Apple, Orange or Lemon you give it a labelled example. The machine keeps all your examples and, for each fruit name, works out the average position of its dots. That average point is called the centroid, drawn as a big ring. When a mystery fruit arrives, the machine measures the distance from the mystery dot to each centroid and picks the nearest one. The coloured regions show which name wins at every spot on the chart. This method is called a nearest-centroid classifier and it is one of the simplest kinds of machine learning.',
        'The machine also says how sure it is. If the mystery dot is much closer to one centroid than to the others, the confidence is high. If it sits halfway between two centroids, the confidence is close to 50%, which means "I am guessing". Being honest about uncertainty is an important part of a good AI system.',
        'The most important lesson is that the machine is only as good as its examples. If you label a lemon as an apple, the apple centroid drifts towards the lemons and future guesses get worse. The Biased data button shows a sneakier problem: all the training apples are small. The machine never saw a big apple, so when a normal big red apple appears it is closer to the orange centroid, and the machine confidently calls it an orange. Real AI systems make the same mistake when their training data leaves out part of the world, for example face recognisers trained mostly on one skin tone.',
      ],
      id: [
        'Komputer tidak tahu apa itu apel. Ia hanya melihat angka. Di simulasi ini setiap buah diubah menjadi dua angka, yang disebut ciri (fitur): seberapa besar buahnya (dari kiri ke kanan di peta) dan seberapa merah atau kuning warnanya (dari bawah ke atas). Lemon kecil dan kuning, jadi ia mendarat di kiri bawah. Apel besar dan merah, jadi ia mendarat di kanan atas. Setiap buah menjadi satu titik di peta.',
        'Mesin belajar darimu. Setiap kali kamu mengetuk Apel, Jeruk atau Lemon, kamu memberinya satu contoh berlabel. Mesin menyimpan semua contohmu dan, untuk setiap nama buah, menghitung posisi rata-rata titik-titiknya. Titik rata-rata itu disebut centroid, digambar sebagai lingkaran besar. Saat buah misteri datang, mesin mengukur jarak dari titik misteri ke setiap centroid dan memilih yang terdekat. Wilayah berwarna menunjukkan nama mana yang menang di setiap tempat pada peta. Metode ini disebut pengklasifikasi centroid terdekat dan merupakan salah satu jenis machine learning paling sederhana.',
        'Mesin juga mengatakan seberapa yakin dirinya. Jika titik misteri jauh lebih dekat ke satu centroid daripada yang lain, keyakinannya tinggi. Jika titik itu berada di tengah antara dua centroid, keyakinannya mendekati 50%, yang berarti "aku hanya menebak". Jujur tentang ketidakpastian adalah bagian penting dari sistem AI yang baik.',
        'Pelajaran terpenting: mesin hanya sebaik contoh-contohnya. Jika kamu memberi label apel pada sebuah lemon, centroid apel bergeser ke arah lemon dan tebakan berikutnya memburuk. Tombol Data bias menunjukkan masalah yang lebih licik: semua apel latihan berukuran kecil. Mesin tidak pernah melihat apel besar, sehingga ketika apel merah besar yang normal muncul, titiknya lebih dekat ke centroid jeruk, dan mesin dengan yakin menyebutnya jeruk. Sistem AI sungguhan membuat kesalahan yang sama ketika data latihnya melewatkan sebagian dunia, misalnya pengenal wajah yang dilatih terutama dengan satu warna kulit.',
      ],
    },
    figure: {
      caption: {
        en: 'The feature chart: size runs left to right, colour runs yellow (bottom) to red (top). Each labelled fruit is a dot; each ring is the average (centroid) of one fruit name. The mystery fruit (?) is nearest the orange centroid, so the machine guesses "orange".',
        id: 'Peta ciri: ukuran dari kiri ke kanan, warna dari kuning (bawah) ke merah (atas). Setiap buah berlabel adalah satu titik; setiap lingkaran adalah rata-rata (centroid) satu nama buah. Buah misteri (?) paling dekat ke centroid jeruk, jadi mesin menebak "jeruk".',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Feature chart with apple, orange and lemon groups and a mystery fruit', 'Peta ciri dengan kelompok apel, jeruk dan lemon serta buah misteri')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{fill:none;stroke-width:1;opacity:.35}</style>
  <defs>
    <linearGradient id="hue" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#facc15"/><stop offset="0.5" stop-color="#f97316"/><stop offset="1" stop-color="#dc2626"/></linearGradient>
  </defs>
  <path d="M60 20 L60 190 L340 190" class="ax"/>
  <rect x="48" y="20" width="8" height="170" fill="url(#hue)" rx="2"/>
  <text x="200" y="212" text-anchor="middle">${L('size: small → big', 'ukuran: kecil → besar')}</text>
  <text x="18" y="110" transform="rotate(-90 18 110)" text-anchor="middle">${L('colour: yellow → red', 'warna: kuning → merah')}</text>
  <path d="M60 190 L190 190 L60 110 Z" fill="#facc15" opacity=".12"/>
  <path d="M60 20 L220 20 L340 110 L340 190 L190 190 L60 110 Z" fill="#f97316" opacity=".10"/>
  <path d="M220 20 L340 20 L340 110 Z" fill="#dc2626" opacity=".14"/>
  <circle cx="92" cy="160" r="5" fill="#facc15"/><circle cx="110" cy="150" r="5" fill="#facc15"/><circle cx="100" cy="172" r="5" fill="#facc15"/><circle cx="122" cy="166" r="5" fill="#facc15"/>
  <circle cx="106" cy="162" r="11" class="g" stroke="#facc15" stroke-width="2.5" opacity=".9"/>
  <text x="124" y="146" fill="#facc15">${L('lemon', 'lemon')}</text>
  <circle cx="190" cy="108" r="6" fill="#f97316"/><circle cx="208" cy="118" r="6" fill="#f97316"/><circle cx="178" cy="124" r="6" fill="#f97316"/><circle cx="200" cy="96" r="6" fill="#f97316"/>
  <circle cx="194" cy="112" r="11" class="g" stroke="#f97316" stroke-width="2.5" opacity=".9"/>
  <text x="212" y="140" fill="#f97316">${L('orange', 'jeruk')}</text>
  <circle cx="280" cy="48" r="8" fill="#dc2626"/><circle cx="300" cy="58" r="8" fill="#dc2626"/><circle cx="268" cy="66" r="8" fill="#dc2626"/><circle cx="292" cy="38" r="8" fill="#dc2626"/>
  <circle cx="285" cy="52" r="12" class="g" stroke="#dc2626" stroke-width="2.5" opacity=".9"/>
  <text x="300" y="82" fill="#dc2626">${L('apple', 'apel')}</text>
  <circle cx="232" cy="130" r="7" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 2"/>
  <text x="229" y="134" style="font:bold 10px system-ui,sans-serif">?</text>
  <line x1="232" y1="130" x2="194" y2="112" stroke="#f97316" stroke-width="1.5" stroke-dasharray="3 3"/>
  <line x1="232" y1="130" x2="285" y2="52" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
  <line x1="232" y1="130" x2="106" y2="162" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4" opacity=".5"/>
  <text x="246" y="156">${L('nearest ring wins', 'lingkaran terdekat menang')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A machine sees each object as numbers (features). Here the features are size and colour.',
        'Learning means collecting labelled examples and finding the pattern in them; here the pattern is the average position of each fruit name.',
        'Classifying means choosing the label whose centroid is nearest to the new object.',
        'Confidence tells you how much nearer the winning centroid is than the runner-up.',
        'Garbage in, garbage out: mislabelled or one-sided training examples produce wrong, but confident, guesses.',
      ],
      id: [
        'Mesin melihat setiap benda sebagai angka (ciri). Di sini cirinya adalah ukuran dan warna.',
        'Belajar berarti mengumpulkan contoh berlabel dan menemukan polanya; di sini polanya adalah posisi rata-rata setiap nama buah.',
        'Mengklasifikasi berarti memilih label yang centroid-nya paling dekat dengan benda baru.',
        'Keyakinan menunjukkan seberapa lebih dekat centroid pemenang dibanding peringkat kedua.',
        'Sampah masuk, sampah keluar: contoh latihan yang salah label atau sepihak menghasilkan tebakan yang salah tetapi penuh percaya diri.',
      ],
    },
    vocabulary: {
      en: [
        ['Feature', 'A number that describes one thing about an object, such as its size or its colour.'],
        ['Label', 'The correct name of an example, given by the teacher: apple, orange or lemon.'],
        ['Training data', 'All the labelled examples the machine has been shown.'],
        ['Centroid', 'The average position of all the examples with the same label.'],
        ['Classify', 'To decide which group a new object belongs to.'],
        ['Bias', 'When the training examples do not fairly represent the real world, so the machine learns a lopsided pattern.'],
      ],
      id: [
        ['Ciri (fitur)', 'Angka yang menggambarkan satu hal tentang benda, misalnya ukuran atau warnanya.'],
        ['Label', 'Nama yang benar untuk sebuah contoh, diberikan oleh guru: apel, jeruk atau lemon.'],
        ['Data latih', 'Semua contoh berlabel yang telah ditunjukkan kepada mesin.'],
        ['Centroid', 'Posisi rata-rata dari semua contoh yang berlabel sama.'],
        ['Mengklasifikasi', 'Memutuskan benda baru termasuk kelompok yang mana.'],
        ['Bias', 'Ketika contoh latihan tidak mewakili dunia nyata secara adil, sehingga mesin mempelajari pola yang miring.'],
      ],
    },
    misconceptions: {
      en: [
        ['The machine knows what an apple really is.', 'It does not. It only knows that the dots you called "apple" are, on average, big and red. Call lemons "apple" and it will happily learn that instead.'],
        ['More confidence means the machine is more likely to be right.', 'Confidence only measures distance to the centroids. After the biased data, the machine is very confident that a big red apple is an orange, and it is wrong.'],
        ['A computer is always objective and fair.', 'A computer repeats the pattern in its data. If the examples are one-sided (bias), its decisions are one-sided too, even though it never "meant" to be unfair.'],
      ],
      id: [
        ['Mesin tahu apa itu apel sesungguhnya.', 'Tidak. Ia hanya tahu bahwa titik-titik yang kamu sebut "apel" rata-rata besar dan merah. Sebut lemon sebagai "apel" dan ia akan dengan senang hati mempelajari itu.'],
        ['Keyakinan yang lebih tinggi berarti mesin lebih mungkin benar.', 'Keyakinan hanya mengukur jarak ke centroid. Setelah data bias, mesin sangat yakin bahwa apel merah besar adalah jeruk, dan ia salah.'],
        ['Komputer selalu objektif dan adil.', 'Komputer mengulang pola dalam datanya. Jika contohnya sepihak (bias), keputusannya juga sepihak, meskipun ia tidak pernah "bermaksud" tidak adil.'],
      ],
    },
    realWorld: {
      en: [
        'Fruit-sorting machines in packing houses photograph each fruit and classify it by size and colour, exactly like this chart but with many more features.',
        'Your phone\'s photo app groups pictures of the same person by turning each face into a list of numbers and finding the nearest known face.',
        'Spam filters, voice assistants and handwriting readers all learn from labelled examples given by thousands of human "teachers".',
        'Face recognition systems trained mostly on one group of people make more mistakes on everyone else: the same problem as the small-apples button.',
      ],
      id: [
        'Mesin penyortir buah di rumah pengemasan memotret setiap buah dan mengklasifikasinya berdasarkan ukuran dan warna, persis seperti peta ini tetapi dengan ciri yang jauh lebih banyak.',
        'Aplikasi foto di ponselmu mengelompokkan foto orang yang sama dengan mengubah setiap wajah menjadi daftar angka dan mencari wajah yang dikenal yang paling dekat.',
        'Penyaring spam, asisten suara dan pembaca tulisan tangan semuanya belajar dari contoh berlabel yang diberikan oleh ribuan "guru" manusia.',
        'Sistem pengenal wajah yang dilatih terutama pada satu kelompok orang membuat lebih banyak kesalahan pada orang lain: masalah yang sama dengan tombol apel kecil.',
      ],
    },
    questions: {
      en: [
        { q: 'You have labelled three lemons but no apples or oranges. What will the machine say about a big red fruit, and why?', a: 'It can only say "lemon", because lemon is the only centroid it has. A classifier cannot predict a group it has never seen an example of.' },
        { q: 'After pressing Biased data, a big red apple is called an orange with 80% confidence. Is the machine broken?', a: 'No. It is doing exactly what it learned. All its "apple" examples were small, so the apple centroid is small and red; a big red fruit is nearer to the medium-sized orange centroid. The data was the problem, not the method.' },
        { q: 'A mystery fruit sits exactly halfway between the orange and lemon centroids. What confidence should the machine report?', a: 'About 50% for each of those two, because neither is nearer. A good classifier should say it is unsure rather than pretend to know.' },
      ],
      id: [
        { q: 'Kamu sudah memberi label tiga lemon tetapi belum ada apel atau jeruk. Apa yang akan dikatakan mesin tentang buah merah besar, dan mengapa?', a: 'Ia hanya bisa berkata "lemon", karena lemon adalah satu-satunya centroid yang dimilikinya. Pengklasifikasi tidak bisa memprediksi kelompok yang belum pernah ia lihat contohnya.' },
        { q: 'Setelah menekan Data bias, apel merah besar disebut jeruk dengan keyakinan 80%. Apakah mesinnya rusak?', a: 'Tidak. Ia melakukan persis seperti yang dipelajarinya. Semua contoh "apel" berukuran kecil, sehingga centroid apel kecil dan merah; buah merah besar lebih dekat ke centroid jeruk yang berukuran sedang. Masalahnya pada data, bukan pada metode.' },
        { q: 'Buah misteri berada tepat di tengah antara centroid jeruk dan lemon. Berapa keyakinan yang seharusnya dilaporkan mesin?', a: 'Sekitar 50% untuk masing-masing dari keduanya, karena tidak ada yang lebih dekat. Pengklasifikasi yang baik sebaiknya mengaku tidak yakin daripada berpura-pura tahu.' },
      ],
    },
  },
};
