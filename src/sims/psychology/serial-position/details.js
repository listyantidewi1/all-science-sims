// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Describe the serial position curve and name its primacy and recency components.',
      'Explain primacy by rehearsal into long-term memory and recency by the short-term store.',
      'Predict how a filled delay before recall changes each part of the curve.',
    ],
    id: [
      'Mendeskripsikan kurva posisi serial serta komponen primasi dan resensinya.',
      'Menjelaskan primasi lewat pengulangan ke memori jangka panjang dan resensi lewat penyimpanan jangka pendek.',
      'Memprediksi bagaimana jeda terisi sebelum mengingat mengubah tiap bagian kurva.',
    ],
  },
  tryThis: {
    en: [
      'Run five 12-word lists with no delay and record primacy, middle and recency percentages.',
      'Set the delay to 20 s and run five more lists — which part of the curve drops?',
      'Lengthen the list to 20 words. Does the middle get worse, better, or stay the same?',
    ],
    id: [
      'Jalankan lima daftar 12 kata tanpa jeda dan catat persentase primasi, tengah, dan resensi.',
      'Atur jeda ke 20 s dan jalankan lima daftar lagi — bagian kurva mana yang turun?',
      'Panjangkan daftar ke 20 kata. Apakah bagian tengah memburuk, membaik, atau tetap?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Read a list of a dozen words once and then write down all you can remember, in any order. You will almost certainly recall the first few and the last few, and lose most of the middle. Plotting the chance of recalling a word against its position in the list gives the serial position curve, a U shape with a high start (the primacy effect) and a high end (the recency effect). Murdock (1962) measured this carefully with lists of different lengths and presentation speeds, and the U shape appeared every time.',
        'The standard explanation uses two memory stores. Words at the start of the list get rehearsed many times while little else competes for attention, so they are transferred into long-term memory and survive. Words at the end are still sitting in short-term memory, a small buffer that holds only a few items for a few seconds, so they can be read straight out at recall. Middle words get neither advantage: rehearsal is shared among too many items and they have been pushed out of the buffer by the words that followed.',
        'The two stores make different predictions, and the sim lets you test them. The Delay before recall slider inserts a filled interval, counting backwards by threes, between the last word and recall. Counting occupies short-term memory and empties the buffer, so the recency effect collapses, while primacy, already in long-term memory, is unaffected. Lengthening the list spreads rehearsal thinner and lowers the middle, while the two ends stay roughly where they are. Run lists yourself or press Simulate to add trials from a model observer; the purple line is the model\'s prediction, with a base rate that shrinks with list length, a primacy bump that fades over the first few positions, and a recency bump that decays with the delay.',
        'The sim simplifies in several ways. Its model does not react to the Seconds per word slider, although in real experiments slower presentation improves primacy (more rehearsal time) while leaving recency unchanged. It treats each word as recalled or not with a fixed probability, ignoring how meaningful, long or distinctive the words are and the order in which people actually recall them (usually the last words first). Your own results will be noisier than the model because a handful of lists is a small sample.',
      ],
      id: [
        'Bacalah satu daftar berisi selusin kata sekali, lalu tuliskan semua yang bisa kamu ingat, dalam urutan apa pun. Kamu hampir pasti mengingat beberapa kata pertama dan beberapa kata terakhir, dan kehilangan sebagian besar bagian tengah. Memplot peluang mengingat kata terhadap posisinya dalam daftar menghasilkan kurva posisi serial, bentuk U dengan awal yang tinggi (efek primasi) dan akhir yang tinggi (efek resensi). Murdock (1962) mengukurnya dengan cermat memakai daftar dengan panjang dan kecepatan penyajian yang berbeda, dan bentuk U itu muncul setiap kali.',
        'Penjelasan standarnya memakai dua penyimpanan memori. Kata-kata di awal daftar diulang berkali-kali saat belum banyak yang bersaing merebut perhatian, sehingga dipindahkan ke memori jangka panjang dan bertahan. Kata-kata di akhir masih berada di memori jangka pendek, penyangga kecil yang hanya menampung beberapa butir selama beberapa detik, sehingga bisa langsung dibacakan saat mengingat. Kata-kata di tengah tidak mendapat kedua keuntungan itu: pengulangan terbagi di antara terlalu banyak butir dan mereka sudah terdesak keluar dari penyangga oleh kata-kata berikutnya.',
        'Kedua penyimpanan ini memberi prediksi yang berbeda, dan simulasi memungkinkanmu mengujinya. Slider Delay before recall menyisipkan selang terisi, menghitung mundur tiga-tiga, antara kata terakhir dan saat mengingat. Menghitung menyibukkan memori jangka pendek dan mengosongkan penyangga, sehingga efek resensi runtuh, sementara primasi, yang sudah berada di memori jangka panjang, tidak terpengaruh. Memperpanjang daftar membagi pengulangan lebih tipis dan menurunkan bagian tengah, sementara kedua ujungnya tetap kira-kira di tempatnya. Jalankan daftar sendiri atau tekan Simulate untuk menambah percobaan dari pengamat model; garis ungu adalah prediksi model, dengan laju dasar yang mengecil seiring panjang daftar, tonjolan primasi yang memudar pada beberapa posisi pertama, dan tonjolan resensi yang meluruh seiring jeda.',
        'Simulasi menyederhanakan dalam beberapa hal. Modelnya tidak bereaksi pada slider Seconds per word, padahal dalam eksperimen sungguhan penyajian yang lebih lambat memperbaiki primasi (lebih banyak waktu mengulang) tanpa mengubah resensi. Model memperlakukan tiap kata sebagai teringat atau tidak dengan peluang tetap, mengabaikan seberapa bermakna, panjang, atau mencolok kata-katanya serta urutan orang benar-benar mengingat (biasanya kata-kata terakhir lebih dulu). Hasilmu sendiri akan lebih berisik daripada model karena beberapa daftar saja adalah sampel yang kecil.',
      ],
    },
    figure: {
      caption: {
        en: 'The serial position curve for a 12-word list. Early words (primacy) are rehearsed into long-term memory; late words (recency) are read out of short-term memory. A 20 s filled delay empties short-term memory, flattening recency while primacy survives.',
        id: 'Kurva posisi serial untuk daftar 12 kata. Kata-kata awal (primasi) diulang hingga masuk memori jangka panjang; kata-kata akhir (resensi) dibaca dari memori jangka pendek. Jeda terisi 20 s mengosongkan memori jangka pendek, meratakan resensi sementara primasi bertahan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Serial position curve with and without a delay', 'Kurva posisi serial dengan dan tanpa jeda')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{stroke:currentColor;stroke-width:.6;opacity:.3}</style>
  <rect x="50" y="30" width="280" height="160" class="ax"/>
  <rect x="50" y="30" width="70" height="160" fill="#10b981" opacity=".1"/>
  <rect x="260" y="30" width="70" height="160" fill="#3b82f6" opacity=".1"/>
  <line x1="50" y1="70" x2="330" y2="70" class="g"/>
  <line x1="50" y1="110" x2="330" y2="110" class="g"/>
  <line x1="50" y1="150" x2="330" y2="150" class="g"/>
  <text x="18" y="34" class="s">100%</text>
  <text x="24" y="74" class="s">75%</text>
  <text x="24" y="114" class="s">50%</text>
  <text x="24" y="154" class="s">25%</text>
  <text x="56" y="44" class="s" fill="#10b981">${L('primacy', 'primasi')}</text>
  <text x="266" y="44" class="s" fill="#3b82f6">${L('recency', 'resensi')}</text>
  <text x="150" y="176" class="s" opacity=".8">${L('middle: neither advantage', 'tengah: tanpa keuntungan')}</text>
  <polyline points="62,55.6 85.3,97.2 108.6,118 131.9,129 155.2,135.6 178.5,138.8 201.8,138.8 225.1,137.2 248.4,131.6 271.7,120.4 295,96.4 318.3,47.6" fill="none" stroke="#f59e0b" stroke-width="2.4"/>
  <circle cx="62" cy="55.6" r="3.5" fill="#f59e0b"/>
  <circle cx="318.3" cy="47.6" r="3.5" fill="#f59e0b"/>
  <polyline points="225.1,137.2 248.4,141.5 271.7,140 295,137 318.3,131" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3"/>
  <text x="200" y="60" class="s" fill="#ef4444">${L('after 20 s filled delay:', 'setelah jeda terisi 20 s:')}</text>
  <text x="200" y="72" class="s" fill="#ef4444">${L('recency collapses', 'resensi runtuh')}</text>
  <line x1="318" y1="78" x2="318" y2="124" stroke="#ef4444" stroke-width="1.4" marker-end="url(#a)"/>
  <text x="58" y="204" class="s">1</text>
  <text x="104" y="204" class="s">3</text>
  <text x="150" y="204" class="s">5</text>
  <text x="196" y="204" class="s">7</text>
  <text x="242" y="204" class="s">9</text>
  <text x="288" y="204" class="s">11</text>
  <text x="110" y="222">${L('position of the word in the list', 'posisi kata dalam daftar')}</text>
  <text x="12" y="140" class="s" transform="rotate(-90 12 140)">${L('recall probability', 'peluang teringat')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Recall depends on where a word sat in the list: first and last words are remembered best, middle words worst.',
        'Primacy comes from rehearsal: early words get repeated most and reach long-term memory.',
        'Recency comes from short-term memory: the last few words are still in the buffer when recall begins.',
        'A filled delay before recall wipes recency but spares primacy, which is strong evidence that the two effects come from different stores.',
        'Longer lists lower the middle of the curve because rehearsal is spread over more items; the two ends change little.',
      ],
      id: [
        'Daya ingat bergantung pada posisi kata dalam daftar: kata pertama dan terakhir paling diingat, kata di tengah paling tidak.',
        'Primasi berasal dari pengulangan: kata-kata awal paling sering diulang dan mencapai memori jangka panjang.',
        'Resensi berasal dari memori jangka pendek: beberapa kata terakhir masih ada di penyangga saat mengingat dimulai.',
        'Jeda terisi sebelum mengingat menghapus resensi tetapi menyisakan primasi, bukti kuat bahwa kedua efek itu berasal dari penyimpanan yang berbeda.',
        'Daftar yang lebih panjang menurunkan bagian tengah kurva karena pengulangan tersebar ke lebih banyak butir; kedua ujungnya hanya sedikit berubah.',
      ],
    },
    vocabulary: {
      en: [
        ['Serial position effect', 'The finding that recall depends on an item\'s position in a list, producing a U-shaped curve.'],
        ['Primacy effect', 'Better recall of the first few items in a list.'],
        ['Recency effect', 'Better recall of the last few items in a list.'],
        ['Free recall', 'Reporting remembered items in any order, the task used in this sim.'],
        ['Short-term memory', 'A limited store holding a few items for seconds unless they are rehearsed.'],
        ['Long-term memory', 'The large, durable store that rehearsed or meaningful material is transferred into.'],
        ['Rehearsal', 'Repeating items to yourself to keep them in short-term memory and transfer them to long-term memory.'],
        ['Filled delay (distractor task)', 'An interval before recall occupied by another task, such as counting backwards, that blocks rehearsal.'],
      ],
      id: [
        ['Efek posisi serial', 'Temuan bahwa daya ingat bergantung pada posisi butir dalam daftar, menghasilkan kurva berbentuk U.'],
        ['Efek primasi', 'Daya ingat yang lebih baik untuk beberapa butir pertama dalam daftar.'],
        ['Efek resensi', 'Daya ingat yang lebih baik untuk beberapa butir terakhir dalam daftar.'],
        ['Ingatan bebas', 'Melaporkan butir yang diingat dalam urutan apa pun, tugas yang dipakai dalam simulasi ini.'],
        ['Memori jangka pendek', 'Penyimpanan terbatas yang menampung beberapa butir selama beberapa detik kecuali diulang.'],
        ['Memori jangka panjang', 'Penyimpanan besar dan tahan lama tempat materi yang diulang atau bermakna dipindahkan.'],
        ['Pengulangan', 'Mengulang butir dalam hati untuk mempertahankannya di memori jangka pendek dan memindahkannya ke memori jangka panjang.'],
        ['Jeda terisi (tugas pengalih)', 'Selang sebelum mengingat yang diisi tugas lain, seperti menghitung mundur, yang menghalangi pengulangan.'],
      ],
    },
    misconceptions: {
      en: [
        ['The last words are remembered best simply because they were seen most recently and are "freshest".', 'Freshness alone cannot explain it, because a 20 to 30 second filled delay removes the recency advantage completely even though the words are still recent. The effect depends on the words still being in short-term memory, and the delay task pushes them out.'],
        ['Middle words are forgotten because they are harder or less interesting.', 'The words are drawn at random, so any word can land in the middle. Middle positions do badly because they get little rehearsal and are no longer in the buffer, not because of the words themselves.'],
        ['A delay before recall makes you forget the whole list equally.', 'The delay hits only the recency part. Early words, already in long-term memory, are recalled about as well as before. This selective loss is what shows that two different stores are involved.'],
        ['The model line in the sim is what every person\'s curve should look like.', 'It is an average pattern. Individual curves vary with attention, rehearsal strategy and how many lists have been run, so a few of your own lists may look quite different from the smooth U.'],
      ],
      id: [
        ['Kata-kata terakhir paling diingat hanya karena paling baru dilihat dan "masih segar".', 'Kesegaran saja tidak bisa menjelaskannya, karena jeda terisi 20 sampai 30 detik menghapus keuntungan resensi sepenuhnya meski kata-katanya masih baru. Efek ini bergantung pada kata yang masih berada di memori jangka pendek, dan tugas pengalih mendesaknya keluar.'],
        ['Kata-kata di tengah terlupakan karena lebih sulit atau kurang menarik.', 'Kata-kata dipilih acak, sehingga kata apa pun bisa jatuh di tengah. Posisi tengah buruk karena hanya sedikit diulang dan tidak lagi berada di penyangga, bukan karena kata-katanya sendiri.'],
        ['Jeda sebelum mengingat membuat seluruh daftar sama-sama terlupakan.', 'Jeda hanya memukul bagian resensi. Kata-kata awal, yang sudah di memori jangka panjang, teringat kira-kira sama baiknya seperti sebelumnya. Kehilangan selektif inilah yang menunjukkan ada dua penyimpanan berbeda yang terlibat.'],
        ['Garis model dalam simulasi adalah bentuk kurva yang seharusnya untuk setiap orang.', 'Itu pola rata-rata. Kurva individu bervariasi menurut perhatian, strategi pengulangan, dan berapa banyak daftar yang sudah dijalankan, sehingga beberapa daftarmu sendiri bisa tampak cukup berbeda dari bentuk U yang mulus.'],
      ],
    },
    realWorld: {
      en: [
        'Speakers and advertisers put their key message first and repeat it last, because the middle of a talk or an advert is what the audience forgets.',
        'When you are introduced to a row of people at a party, you usually remember the first and last names and lose the ones in between.',
        'Studying: the middle of a long revision session is the least well remembered, so splitting it into shorter blocks creates more beginnings and endings.',
        'Witness interviews: police are trained to let witnesses report freely first, because what a witness heard most recently (including the questions) can overwrite the recency part of their memory.',
      ],
      id: [
        'Pembicara dan pengiklan menaruh pesan utama di awal dan mengulanginya di akhir, karena bagian tengah ceramah atau iklan adalah yang dilupakan penonton.',
        'Saat diperkenalkan kepada sederet orang di sebuah pesta, biasanya kamu mengingat nama pertama dan terakhir dan kehilangan yang di antaranya.',
        'Belajar: bagian tengah sesi belajar yang panjang adalah yang paling tidak diingat, sehingga membaginya menjadi blok-blok pendek menciptakan lebih banyak awal dan akhir.',
        'Wawancara saksi: polisi dilatih membiarkan saksi bercerita bebas lebih dulu, karena apa yang paling baru didengar saksi (termasuk pertanyaan) bisa menimpa bagian resensi ingatannya.',
      ],
    },
    questions: {
      en: [
        { q: 'In a 12-word list with no delay, the sim\'s model gives word 1 about an 84% chance of recall and word 6 about 32%. Which memory store explains the difference, and what would happen to word 1 if recall were delayed by 20 s?', a: 'Word 1 benefits from primacy: it was rehearsed repeatedly and entered long-term memory, while word 6 shared rehearsal with many others and left short-term memory long ago. A 20 s delay would not change word 1 much, because long-term memory is not emptied by counting backwards; only the last few words would suffer.' },
        { q: 'A student runs five 12-word lists and gets primacy 80%, middle 35%, recency 85%. After adding a 20 s filled delay she gets 78%, 33% and 40%. Explain the pattern.', a: 'Primacy and middle barely change, which fits them being in long-term memory, but recency drops from 85% to about 40%, close to the middle. Counting backwards for 20 s occupied short-term memory and displaced the final words, so they lost their advantage. This is the classic dissociation between the two stores.' },
        { q: 'Why does the sim\'s model lower the middle of the curve when the list grows from 12 to 20 words, while the two ends stay about the same?', a: 'The model\'s base rate is 3.5 divided by the list length (capped at 50%), which falls from about 29% to about 18% as the list grows: the same rehearsal effort is spread over more words. The primacy bump still covers the first few positions and the recency bump still covers the last few, so the ends keep roughly their height while the valley between them gets lower and wider.' },
      ],
      id: [
        { q: 'Dalam daftar 12 kata tanpa jeda, model simulasi memberi kata ke-1 peluang teringat sekitar 84% dan kata ke-6 sekitar 32%. Penyimpanan memori mana yang menjelaskan selisihnya, dan apa yang terjadi pada kata ke-1 jika mengingat ditunda 20 s?', a: 'Kata ke-1 mendapat keuntungan primasi: diulang berkali-kali dan masuk memori jangka panjang, sementara kata ke-6 berbagi pengulangan dengan banyak kata lain dan sudah lama keluar dari memori jangka pendek. Jeda 20 s tidak banyak mengubah kata ke-1, karena memori jangka panjang tidak dikosongkan oleh menghitung mundur; hanya beberapa kata terakhir yang terpengaruh.' },
        { q: 'Seorang siswa menjalankan lima daftar 12 kata dan memperoleh primasi 80%, tengah 35%, resensi 85%. Setelah menambahkan jeda terisi 20 s ia memperoleh 78%, 33%, dan 40%. Jelaskan polanya.', a: 'Primasi dan tengah hampir tidak berubah, yang sesuai dengan keberadaannya di memori jangka panjang, tetapi resensi turun dari 85% ke sekitar 40%, mendekati bagian tengah. Menghitung mundur selama 20 s menyibukkan memori jangka pendek dan menggeser kata-kata terakhir, sehingga keuntungannya hilang. Inilah disosiasi klasik antara dua penyimpanan.' },
        { q: 'Mengapa model simulasi menurunkan bagian tengah kurva ketika daftar bertambah dari 12 menjadi 20 kata, sementara kedua ujungnya tetap kira-kira sama?', a: 'Laju dasar model adalah 3,5 dibagi panjang daftar (dibatasi 50%), yang turun dari sekitar 29% ke sekitar 18% saat daftar memanjang: usaha pengulangan yang sama tersebar ke lebih banyak kata. Tonjolan primasi tetap mencakup beberapa posisi pertama dan tonjolan resensi tetap mencakup beberapa posisi terakhir, sehingga kedua ujung mempertahankan tingginya sementara lembah di antaranya menjadi lebih rendah dan lebih lebar.' },
      ],
    },
  },
};
