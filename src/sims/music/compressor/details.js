// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read the threshold (where compression kicks in) and ratio (how much compression).',
      'See that infinite ratio = a limiter (clips above threshold).',
      'Apply make-up gain to bring the average level back up.',
    ],
    id: [
      'Membaca ambang (saat kompresi mulai) dan rasio (jumlah kompresi).',
      'Melihat bahwa rasio tak hingga = limiter (memotong di atas ambang).',
      'Menerapkan gain makeup untuk mengembalikan level rata-rata.',
    ],
  },
  tryThis: {
    en: [
      'Threshold −20 dB, ratio 4:1 — gentle compression.',
      'Ratio ∞ (limiter) — output flat-tops above threshold.',
      'Add makeup gain — quiet parts get louder; perceived volume up.',
    ],
    id: [
      'Ambang −20 dB, rasio 4:1 — kompresi lembut.',
      'Rasio ∞ (limiter) — output mendatar di atas ambang.',
      'Tambah gain makeup — bagian sepi menjadi keras; persepsi volume naik.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Music and speech are not equally loud all the time. A drum hit is far louder than the ring of a cymbal that follows it, and a whispered word is far quieter than a shouted one. The gap between the softest and loudest parts is the dynamic range. A dynamics compressor is an automatic volume control that turns the loud moments down, so the whole recording fits into a narrower range and nothing jumps out or disappears. Audio levels are measured in decibels (dB), where 0 dB is the loudest level a digital system can hold and every −6 dB is roughly a halving of the signal size.',
        'The simulation applies a single rule to each moment of sound. If the input level is below the threshold, the output equals the input: nothing happens. If the input rises above the threshold, only the part above it is let through, divided by the ratio. With a threshold of −20 dB and a ratio of 4:1, an input of −8 dB is 12 dB over the threshold; the output is only 3 dB over, so it comes out at −17 dB. Finally the makeup gain adds a fixed number of decibels to everything, loud and quiet alike, so the quieter result can be brought back up to a comfortable level.',
        'The left panel draws this rule as a transfer curve of output level against input level. Below the threshold the curve follows the dashed 1:1 line; above it, the curve bends to a shallower slope of 1/ratio. You can drag the red threshold point along the line or use the slider. The ratio slider changes how sharply the curve bends: 1:1 is no compression, 4:1 is typical for a vocal, and ratios of 10:1 or more flatten the curve so much that the output barely rises at all, which is what a limiter does. Makeup gain lifts the whole curve upward. The right panel runs a made-up drum pattern (loud kicks, medium snares, quiet hi-hats) through the same rule, so you can see the tall bars shrink while the small ones are untouched.',
        'Real compressors are more complicated than this static curve. They measure the level with a detector that takes time to react (the attack and release controls), so short transients can slip through and the gain changes smoothly rather than instantly. Many have a soft knee that rounds off the bend instead of the sharp corner drawn here, and digital limiters look ahead to catch peaks before they arrive. The simulation ignores all timing behaviour, uses a hard knee, and never clips: with large makeup gain its output can exceed 0 dB, which a real system could not reproduce without distortion. The ratio slider stops at 50:1, which behaves almost exactly like a true infinite-ratio limiter.',
      ],
      id: [
        'Musik dan ucapan tidak selalu sama kerasnya. Pukulan drum jauh lebih keras daripada dentingan simbal yang mengikutinya, dan kata yang dibisikkan jauh lebih pelan daripada yang diteriakkan. Jarak antara bagian paling lembut dan paling keras disebut rentang dinamika. Kompresor dinamika adalah pengatur volume otomatis yang menurunkan momen-momen keras, sehingga seluruh rekaman masuk ke rentang yang lebih sempit dan tidak ada yang melonjak atau tenggelam. Level audio diukur dalam desibel (dB); 0 dB adalah level tertinggi yang bisa ditampung sistem digital, dan setiap −6 dB kira-kira setara dengan separuh ukuran sinyal.',
        'Simulasi menerapkan satu aturan pada tiap saat bunyi. Jika level masukan di bawah ambang (threshold), keluaran sama dengan masukan: tidak terjadi apa-apa. Jika masukan naik melewati ambang, hanya bagian di atas ambang yang diloloskan, dibagi dengan rasio. Dengan ambang −20 dB dan rasio 4:1, masukan −8 dB berada 12 dB di atas ambang; keluarannya hanya 3 dB di atas, sehingga keluar pada −17 dB. Terakhir, gain makeup menambahkan sejumlah desibel tetap ke semuanya, yang keras maupun yang pelan, sehingga hasil yang lebih pelan itu bisa dinaikkan kembali ke level yang nyaman.',
        'Panel kiri menggambar aturan ini sebagai kurva transfer: level keluaran terhadap level masukan. Di bawah ambang kurva mengikuti garis putus-putus 1:1; di atasnya kurva membelok ke kemiringan yang lebih landai, yaitu 1/rasio. Kamu bisa menyeret titik ambang merah sepanjang garis atau memakai slider. Slider rasio mengubah seberapa tajam belokannya: 1:1 berarti tanpa kompresi, 4:1 lazim untuk vokal, dan rasio 10:1 ke atas membuat kurva begitu datar sehingga keluaran hampir tidak naik lagi, dan itulah kerja limiter. Gain makeup mengangkat seluruh kurva ke atas. Panel kanan menjalankan pola drum buatan (kick keras, snare sedang, hi-hat pelan) lewat aturan yang sama, sehingga kamu bisa melihat batang yang tinggi menyusut sementara yang pendek tidak tersentuh.',
        'Kompresor sungguhan lebih rumit daripada kurva statis ini. Ia mengukur level dengan detektor yang butuh waktu untuk bereaksi (kontrol attack dan release), sehingga transien pendek bisa lolos dan perubahan gain berlangsung mulus, bukan seketika. Banyak kompresor punya soft knee yang membulatkan belokan, bukan sudut tajam seperti yang digambar di sini, dan limiter digital melihat ke depan untuk menangkap puncak sebelum tiba. Simulasi mengabaikan semua perilaku waktu itu, memakai hard knee, dan tidak pernah memotong sinyal: dengan gain makeup besar keluarannya bisa melebihi 0 dB, yang di sistem nyata tidak bisa direproduksi tanpa distorsi. Slider rasio berhenti di 50:1, yang perilakunya hampir sama persis dengan limiter berrasio tak hingga.',
      ],
    },
    figure: {
      caption: {
        en: 'Transfer curve of a compressor. Below the threshold (T) the output follows the 1:1 line. Above it the slope drops to 1/ratio, so a signal 12 dB over the threshold comes out only 3 dB over at 4:1. Makeup gain shifts the whole curve up.',
        id: 'Kurva transfer kompresor. Di bawah ambang (T) keluaran mengikuti garis 1:1. Di atasnya kemiringan turun menjadi 1/rasio, sehingga sinyal 12 dB di atas ambang keluar hanya 3 dB di atasnya pada 4:1. Gain makeup menggeser seluruh kurva ke atas.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Compressor transfer curve with threshold and ratio', 'Kurva transfer kompresor dengan ambang dan rasio')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.4}.c{fill:none;stroke-width:2.4}</style>
  <line x1="50" y1="200" x2="330" y2="200" class="ax"/>
  <line x1="50" y1="200" x2="50" y2="20" class="ax"/>
  <text x="235" y="222">${L('input level (dB)', 'level masukan (dB)')}</text>
  <text x="6" y="14">${L('output (dB)', 'keluaran (dB)')}</text>
  <line x1="50" y1="200" x2="310" y2="20" class="m" stroke-dasharray="4 4"/>
  <text x="268" y="40" opacity=".6">1:1</text>
  <path d="M50 200 L220 82 L310 66" class="c" stroke="#10b981"/>
  <path d="M50 176 L220 58 L310 42" class="c" stroke="#8b5cf6" stroke-dasharray="5 3"/>
  <circle cx="220" cy="82" r="5" fill="#ef4444"/>
  <text x="212" y="100" fill="#ef4444">T</text>
  <text x="196" y="116" fill="#ef4444">${L('threshold', 'ambang')}</text>
  <line x1="220" y1="82" x2="220" y2="200" class="m" stroke-dasharray="2 3"/>
  <line x1="220" y1="20" x2="310" y2="20" class="m"/>
  <line x1="310" y1="20" x2="310" y2="66" class="m"/>
  <text x="240" y="14">+12 dB ${L('in', 'masuk')}</text>
  <text x="316" y="48" fill="#10b981">+3</text>
  <text x="246" y="80" fill="#10b981">${L('ratio 4:1', 'rasio 4:1')}</text>
  <line x1="130" y1="145" x2="130" y2="121" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="70" y="128" fill="#8b5cf6">${L('makeup gain', 'gain makeup')}</text>
  <text x="56" y="190">${L('quiet: unchanged', 'pelan: tak berubah')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A compressor turns down only the parts of a signal that rise above the threshold; everything below it passes unchanged.',
        'The ratio sets how hard the loud parts are turned down: at 4:1, every 4 dB over the threshold comes out as 1 dB over.',
        'Very high ratios make the output almost flat above the threshold, which is a limiter.',
        'Makeup gain adds the same decibels to everything, so after compression the quiet parts end up louder relative to the peaks.',
        'The result is a smaller dynamic range: the loud and soft parts are closer together, so the recording sounds denser and more even.',
      ],
      id: [
        'Kompresor hanya menurunkan bagian sinyal yang naik melewati ambang; semua yang di bawahnya lolos tanpa berubah.',
        'Rasio menentukan seberapa kuat bagian keras diturunkan: pada 4:1, setiap 4 dB di atas ambang keluar sebagai 1 dB di atasnya.',
        'Rasio yang sangat tinggi membuat keluaran hampir datar di atas ambang, dan itulah limiter.',
        'Gain makeup menambahkan desibel yang sama ke semuanya, sehingga setelah kompresi bagian pelan menjadi lebih keras dibandingkan puncaknya.',
        'Hasilnya rentang dinamika yang lebih kecil: bagian keras dan lembut lebih berdekatan, sehingga rekaman terdengar lebih padat dan rata.',
      ],
    },
    vocabulary: {
      en: [
        ['Decibel (dB)', 'A logarithmic unit of level; here 0 dB is digital full scale and negative numbers are quieter. A change of −6 dB roughly halves the signal.'],
        ['Threshold', 'The input level above which the compressor starts to reduce the signal.'],
        ['Ratio', 'How many decibels of input above the threshold produce one decibel of output above it, written as 4:1, 10:1 and so on.'],
        ['Gain reduction', 'How many decibels the compressor has turned the signal down at a given moment; input minus output before makeup.'],
        ['Makeup gain', 'A fixed boost applied after compression to bring the overall level back up.'],
        ['Limiter', 'A compressor with a very high ratio, so the output effectively cannot exceed the threshold.'],
        ['Dynamic range', 'The difference in decibels between the quietest and loudest parts of a signal.'],
        ['Knee', 'The bend in the transfer curve at the threshold; a hard knee is a sharp corner, a soft knee is rounded.'],
      ],
      id: [
        ['Desibel (dB)', 'Satuan level yang logaritmik; di sini 0 dB adalah skala penuh digital dan angka negatif lebih pelan. Perubahan −6 dB kira-kira memperkecil sinyal menjadi separuh.'],
        ['Ambang (threshold)', 'Level masukan yang jika dilewati membuat kompresor mulai mengurangi sinyal.'],
        ['Rasio', 'Berapa desibel masukan di atas ambang yang menghasilkan satu desibel keluaran di atasnya, ditulis 4:1, 10:1, dan seterusnya.'],
        ['Pengurangan gain', 'Berapa desibel sinyal diturunkan kompresor pada suatu saat; masukan dikurangi keluaran sebelum makeup.'],
        ['Gain makeup', 'Penguatan tetap yang diterapkan setelah kompresi untuk mengembalikan level keseluruhan.'],
        ['Limiter', 'Kompresor dengan rasio sangat tinggi, sehingga keluaran praktis tidak bisa melewati ambang.'],
        ['Rentang dinamika', 'Selisih dalam desibel antara bagian paling pelan dan paling keras suatu sinyal.'],
        ['Knee', 'Belokan kurva transfer di ambang; hard knee berupa sudut tajam, soft knee membulat.'],
      ],
    },
    misconceptions: {
      en: [
        ['A compressor makes the music louder.', 'By itself it only makes the loud parts quieter. The recording sounds louder only after makeup gain is added, which is possible because the peaks have been lowered and there is room to raise everything.'],
        ['Compression squashes the quiet sounds.', 'Signals below the threshold pass through completely unchanged. Only the part of the signal above the threshold is reduced; the quiet parts are affected only by the makeup gain, which lifts them.'],
        ['A higher ratio compresses more of the song.', 'The threshold decides how much of the signal is affected; the ratio decides how strongly that part is reduced. A high ratio with a high threshold touches only the loudest peaks.'],
        ['Audio compression is the same as MP3 compression.', 'They share a word but nothing else. A dynamics compressor changes loudness over time; MP3 and similar codecs reduce file size by discarding data the ear is unlikely to notice.'],
      ],
      id: [
        ['Kompresor membuat musik lebih keras.', 'Dengan sendirinya ia hanya membuat bagian keras menjadi lebih pelan. Rekaman terdengar lebih keras hanya setelah gain makeup ditambahkan, dan itu mungkin karena puncaknya sudah diturunkan sehingga ada ruang untuk menaikkan semuanya.'],
        ['Kompresi menekan suara-suara pelan.', 'Sinyal di bawah ambang lolos tanpa berubah sama sekali. Hanya bagian sinyal di atas ambang yang dikurangi; bagian pelan hanya terpengaruh oleh gain makeup, yang justru mengangkatnya.'],
        ['Rasio lebih tinggi berarti lebih banyak bagian lagu yang dikompresi.', 'Ambang menentukan seberapa banyak sinyal yang terkena; rasio menentukan seberapa kuat bagian itu dikurangi. Rasio tinggi dengan ambang tinggi hanya menyentuh puncak-puncak paling keras.'],
        ['Kompresi audio sama dengan kompresi MP3.', 'Keduanya hanya berbagi kata. Kompresor dinamika mengubah kekerasan dari waktu ke waktu; MP3 dan codec serupa memperkecil ukuran berkas dengan membuang data yang kecil kemungkinannya disadari telinga.'],
      ],
    },
    realWorld: {
      en: [
        'Radio and podcast voices are heavily compressed so that every word is audible over road noise without the loud words being painful.',
        'Pop and rock drums are compressed to make the kick and snare sound punchy and consistent from hit to hit.',
        'Streaming services and mastering engineers use limiters so that a track reaches a target loudness without any sample exceeding 0 dB.',
        'Hearing aids use compression to fit the enormous loudness range of the world into the narrower range a damaged ear can handle comfortably.',
      ],
      id: [
        'Suara penyiar radio dan podcast dikompresi kuat agar setiap kata terdengar di atas bising jalan tanpa kata yang keras menjadi menyakitkan.',
        'Drum pop dan rock dikompresi agar kick dan snare terdengar bertenaga dan konsisten dari pukulan ke pukulan.',
        'Layanan streaming dan insinyur mastering memakai limiter agar sebuah lagu mencapai kekerasan target tanpa ada sampel yang melewati 0 dB.',
        'Alat bantu dengar memakai kompresi untuk memasukkan rentang kekerasan dunia yang sangat lebar ke rentang lebih sempit yang masih nyaman bagi telinga yang rusak.',
      ],
    },
    questions: {
      en: [
        { q: 'The threshold is −20 dB and the ratio is 4:1. An input arrives at −8 dB. What level comes out, and how much gain reduction is that?', a: 'The input is 12 dB above the threshold. Only 12 / 4 = 3 dB of that passes, so the output is −20 + 3 = −17 dB. The gain reduction is 9 dB.' },
        { q: 'With the same settings, what happens to a hi-hat at −30 dB? What if you then add 6 dB of makeup gain?', a: 'Nothing: −30 dB is below the threshold, so it comes out at −30 dB. With makeup gain it rises to −24 dB, the same 6 dB boost every other sound receives.' },
        { q: 'Using the Gentle preset (threshold −20 dB, ratio 4:1, makeup +4 dB), the kick drum peaks near −2 dB and the hi-hats near −25 dB. How does the gap between them change?', a: 'Before: 23 dB apart. The kick is 18 dB over the threshold, so it comes out at −20 + 18/4 = −15.5 dB, then −11.5 dB with makeup. The hi-hat is untouched and becomes −21 dB with makeup. The gap shrinks from 23 dB to 9.5 dB: the dynamic range has been compressed.' },
      ],
      id: [
        { q: 'Ambang −20 dB dan rasio 4:1. Masukan datang pada −8 dB. Berapa level keluarannya, dan berapa pengurangan gainnya?', a: 'Masukan berada 12 dB di atas ambang. Hanya 12 / 4 = 3 dB yang diloloskan, sehingga keluarannya −20 + 3 = −17 dB. Pengurangan gainnya 9 dB.' },
        { q: 'Dengan pengaturan yang sama, apa yang terjadi pada hi-hat di −30 dB? Bagaimana jika kemudian ditambah gain makeup 6 dB?', a: 'Tidak ada apa-apa: −30 dB berada di bawah ambang, jadi keluar tetap −30 dB. Dengan gain makeup ia naik ke −24 dB, penambahan 6 dB yang sama seperti yang diterima bunyi lainnya.' },
        { q: 'Dengan preset Gentle (ambang −20 dB, rasio 4:1, makeup +4 dB), kick drum memuncak sekitar −2 dB dan hi-hat sekitar −25 dB. Bagaimana jarak keduanya berubah?', a: 'Sebelumnya: berjarak 23 dB. Kick berada 18 dB di atas ambang, sehingga keluar di −20 + 18/4 = −15,5 dB, lalu −11,5 dB dengan makeup. Hi-hat tidak tersentuh dan menjadi −21 dB dengan makeup. Jaraknya menyusut dari 23 dB menjadi 9,5 dB: rentang dinamikanya telah dikompresi.' },
      ],
    },
  },
};
