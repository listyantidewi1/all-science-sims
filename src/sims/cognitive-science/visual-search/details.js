// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Experience the feature pop-out: a red O among blue Os jumps out instantly.',
      'Feel conjunction search: red O among blue Os AND red Xs takes serial scanning.',
      'See that pop-out reaction time is roughly flat vs N; conjunction grows with N.',
    ],
    id: [
      'Mengalami pop-out fitur: O merah di antara O biru langsung menonjol.',
      'Merasakan pencarian konjungsi: butuh pemindaian serial.',
      'Melihat waktu reaksi pop-out kira-kira datar vs N; konjungsi tumbuh dengan N.',
    ],
  },
  tryThis: {
    en: [
      'Feature search, N=10 — fast (~500 ms).',
      'Feature search, N=40 — still fast! (pop-out)',
      'Conjunction search, N=10 — slow; N=40 — much slower.',
    ],
    id: [
      'Pencarian fitur, N=10 — cepat (~500 ms).',
      'Pencarian fitur, N=40 — masih cepat! (pop-out)',
      'Pencarian konjungsi, N=10 — lambat; N=40 — jauh lebih lambat.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Finding one object among many is something you do all day: your friend in a crowd, a key on a cluttered desk, a typo on a page. Psychologists study it with the visual search task, in which a target is hidden among a variable number of distractors and the time to find it is measured. The crucial variable is the set size N, the total number of items on the screen. Plotting reaction time against N gives a search function, and its slope in milliseconds per item tells you how the brain is searching. A flat slope means every item was examined at once; a steep slope means items were inspected one after another.',
        'Anne Treisman and Garry Gelade (1980) found that the slope depends on what makes the target different. If the target differs from every distractor in a single basic feature, such as a red O among blue Os, it seems to pop out and the slope is near zero: a red O among 40 blue Os is found about as quickly as among 4. If the target is defined only by a conjunction of two features, such as a red O among blue Os and red Xs, no single feature identifies it. Each distractor shares one of the target\'s features, so the viewer must check items with focused attention, and reaction time rises roughly linearly with N, with classic slopes of about 20 to 40 ms per item. Their feature integration theory explains this with two stages: a fast parallel stage that registers features such as colour and shape across the whole display, and a slower serial stage in which attention binds the features of one object at a time.',
        'The sim implements both displays. In feature mode every distractor is a blue O; in conjunction mode distractors are drawn at random as blue Os or red Xs, roughly half each. There is always exactly one red O target, placed at a random position. Your reaction time runs from the moment the display appears until you click, and only correct clicks are recorded. The set-size slider goes from 4 to 60 items, and the lab panel averages the trials at the current N and mode so you can build a search function point by point, typically at N = 8, 16, 32 and 60. Since the recorded time includes moving the mouse to the target, your absolute times will be longer than the keyboard reaction times of laboratory studies, but the slopes should show the same contrast.',
        'Several simplifications are worth knowing. Items are scattered at random with no spacing rule, so two can overlap or sit at the edge, which adds noise. The target is always present, so the sim cannot show the second classic finding: when the target is absent in a serial search, the slope is roughly twice as steep, because every item must be checked before you can say no. Trials at different N are also shown in whatever order you choose rather than randomly intermixed, so practice can make later conditions look faster. Finally, the strict two-stage picture is itself a simplification; later research showed that conjunction search can be faster than pure item-by-item scanning when distractors are easy to group, and that search efficiency forms a continuum rather than two neat categories.',
      ],
      id: [
        'Menemukan satu benda di antara banyak benda adalah hal yang kita lakukan sepanjang hari: teman di kerumunan, kunci di meja yang berantakan, salah ketik di halaman. Psikolog mempelajarinya dengan tugas pencarian visual, yaitu sebuah target disembunyikan di antara sejumlah pengecoh yang bervariasi dan waktu untuk menemukannya diukur. Variabel kuncinya adalah ukuran set N, jumlah total item di layar. Menggambar waktu reaksi terhadap N menghasilkan fungsi pencarian, dan kemiringannya dalam milidetik per item memberi tahu bagaimana otak mencari. Kemiringan datar berarti semua item diperiksa sekaligus; kemiringan curam berarti item diperiksa satu demi satu.',
        'Anne Treisman dan Garry Gelade (1980) menemukan bahwa kemiringan itu bergantung pada apa yang membuat target berbeda. Jika target berbeda dari semua pengecoh dalam satu fitur dasar, misalnya O merah di antara O biru, target tampak menonjol (pop-out) dan kemiringannya hampir nol: O merah di antara 40 O biru ditemukan hampir secepat di antara 4. Jika target hanya ditentukan oleh konjungsi dua fitur, misalnya O merah di antara O biru dan X merah, tidak ada satu fitur pun yang mengidentifikasinya. Setiap pengecoh berbagi salah satu fitur target, sehingga pengamat harus memeriksa item dengan atensi terfokus, dan waktu reaksi naik kira-kira linear terhadap N, dengan kemiringan klasik sekitar 20 sampai 40 ms per item. Teori integrasi fitur mereka menjelaskan ini dengan dua tahap: tahap paralel yang cepat yang mencatat fitur seperti warna dan bentuk di seluruh tampilan, dan tahap serial yang lebih lambat yang di dalamnya atensi mengikat fitur-fitur satu objek pada satu waktu.',
        'Simulasi ini menerapkan kedua tampilan. Pada mode fitur semua pengecoh adalah O biru; pada mode konjungsi pengecoh digambar secara acak sebagai O biru atau X merah, kira-kira separuh-separuh. Selalu ada tepat satu target O merah, ditempatkan di posisi acak. Waktu reaksi Anda dihitung dari saat tampilan muncul sampai Anda mengklik, dan hanya klik yang benar yang direkam. Slider ukuran set berkisar dari 4 sampai 60 item, dan panel lab merata-ratakan percobaan pada N dan mode saat ini sehingga Anda dapat membangun fungsi pencarian titik demi titik, biasanya pada N = 8, 16, 32, dan 60. Karena waktu yang direkam mencakup menggerakkan mouse ke target, waktu absolut Anda akan lebih panjang daripada waktu reaksi dengan tombol keyboard di penelitian laboratorium, tetapi kemiringannya seharusnya menunjukkan kontras yang sama.',
        'Ada beberapa penyederhanaan yang perlu diketahui. Item disebar acak tanpa aturan jarak, sehingga dua item bisa tumpang tindih atau berada di tepi, yang menambah derau. Target selalu ada, sehingga simulasi tidak bisa menunjukkan temuan klasik kedua: ketika target tidak ada dalam pencarian serial, kemiringannya kira-kira dua kali lebih curam, karena semua item harus diperiksa sebelum bisa menjawab tidak. Percobaan pada N yang berbeda juga ditampilkan dalam urutan yang Anda pilih, bukan diacak, sehingga latihan dapat membuat kondisi yang belakangan tampak lebih cepat. Terakhir, gambaran dua tahap yang kaku itu sendiri adalah penyederhanaan; penelitian selanjutnya menunjukkan bahwa pencarian konjungsi bisa lebih cepat daripada pemindaian murni item demi item ketika pengecoh mudah dikelompokkan, dan bahwa efisiensi pencarian membentuk sebuah kontinum, bukan dua kategori yang rapi.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: in feature search the red O differs from every distractor in colour and pops out, so reaction time barely changes with set size. Right: in conjunction search each distractor shares a feature with the target, attention must inspect items one by one, and reaction time rises roughly linearly with N.',
        id: 'Kiri: pada pencarian fitur O merah berbeda warna dari semua pengecoh dan menonjol, sehingga waktu reaksi hampir tidak berubah terhadap ukuran set. Kanan: pada pencarian konjungsi tiap pengecoh berbagi satu fitur dengan target, atensi harus memeriksa item satu demi satu, dan waktu reaksi naik kira-kira linear terhadap N.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const pts = [[22, 46], [60, 40], [98, 50], [138, 42], [30, 78], [72, 86], [112, 74], [146, 84], [26, 112], [64, 106], [104, 118], [140, 108]];
        const feat = pts.map(([x, y], i) => `<text x="${x}" y="${y}" class="i" fill="${i === 6 ? '#ef4444' : '#3b82f6'}">O</text>`).join('');
        const conj = pts.map(([x, y], i) => {
          const dx = x + 190;
          if (i === 9) return `<text x="${dx}" y="${y}" class="i" fill="#ef4444">O</text>`;
          return i % 2 ? `<text x="${dx}" y="${y}" class="i" fill="#ef4444">X</text>` : `<text x="${dx}" y="${y}" class="i" fill="#3b82f6">O</text>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Feature versus conjunction search displays and their reaction-time slopes', 'Tampilan pencarian fitur versus konjungsi dan kemiringan waktu reaksinya')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.i{font:700 15px ui-monospace,monospace}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}.ax{stroke:currentColor;stroke-width:1.2;fill:none}</style>
  <text x="12" y="20" font-weight="700">${L('Feature search', 'Pencarian fitur')}</text>
  <text x="202" y="20" font-weight="700">${L('Conjunction search', 'Pencarian konjungsi')}</text>
  <rect x="12" y="28" width="150" height="100" rx="4" class="m"/>
  <rect x="202" y="28" width="150" height="100" rx="4" class="m"/>
  ${feat}
  ${conj}
  <circle cx="112" cy="69" r="12" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 2"/>
  <circle cx="254" cy="101" r="12" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 2"/>
  <text x="12" y="142" class="s">${L('target: red O among blue Os', 'target: O merah di antara O biru')}</text>
  <text x="202" y="142" class="s">${L('red O among blue Os and red Xs', 'O merah di antara O biru dan X merah')}</text>
  <line x1="60" y1="230" x2="340" y2="230" class="ax" marker-end="url(#a)"/>
  <line x1="60" y1="230" x2="60" y2="156" class="ax" marker-end="url(#a)"/>
  <text x="340" y="222" text-anchor="end" class="s">${L('set size N', 'ukuran set N')}</text>
  <text x="66" y="162" class="s">${L('reaction time', 'waktu reaksi')}</text>
  <line x1="70" y1="212" x2="320" y2="206" stroke="#3b82f6" stroke-width="2.5"/>
  <text x="326" y="210" fill="#3b82f6" class="s">${L('≈ 0 ms/item', '≈ 0 ms/item')}</text>
  <line x1="70" y1="212" x2="320" y2="166" stroke="#ef4444" stroke-width="2.5"/>
  <text x="326" y="170" fill="#ef4444" class="s">${L('20–40 ms/item', '20–40 ms/item')}</text>
  <text x="52" y="216" text-anchor="end" class="s">${L('base', 'dasar')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The slope of reaction time against set size N, in ms per item, reveals how the visual system is searching.',
        'A target that differs in one basic feature pops out: it is detected in parallel across the whole display, so the slope is near zero.',
        'A target defined by a conjunction of features requires focused attention on items one at a time, so reaction time rises roughly linearly with N.',
        'Feature integration theory (Treisman and Gelade, 1980) proposes a fast parallel feature stage followed by a slower serial binding stage.',
        'Search efficiency is really a continuum: how similar distractors are to the target, and to each other, sets the slope.',
      ],
      id: [
        'Kemiringan waktu reaksi terhadap ukuran set N, dalam ms per item, mengungkap bagaimana sistem visual mencari.',
        'Target yang berbeda dalam satu fitur dasar menonjol: terdeteksi secara paralel di seluruh tampilan, sehingga kemiringannya hampir nol.',
        'Target yang ditentukan oleh konjungsi fitur memerlukan atensi terfokus pada item satu per satu, sehingga waktu reaksi naik kira-kira linear terhadap N.',
        'Teori integrasi fitur (Treisman dan Gelade, 1980) mengusulkan tahap fitur paralel yang cepat diikuti tahap pengikatan serial yang lebih lambat.',
        'Efisiensi pencarian sebenarnya sebuah kontinum: seberapa mirip pengecoh dengan target, dan satu sama lain, menentukan kemiringannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Set size (N)', 'The total number of items on the display, target included.'],
        ['Distractor', 'Any non-target item in the display.'],
        ['Feature search', 'Search for a target that differs from all distractors in one basic feature, such as colour or shape.'],
        ['Conjunction search', 'Search for a target defined only by a combination of features, each of which some distractors share.'],
        ['Pop-out', 'The experience of a feature target being found immediately, regardless of how many distractors there are.'],
        ['Search slope', 'The increase in reaction time per added item, obtained from the line fitted to reaction time against N.'],
        ['Parallel processing', 'Analysing all items at the same time, as in the first stage of feature integration theory.'],
        ['Serial processing', 'Examining items one after another with focused attention.'],
      ],
      id: [
        ['Ukuran set (N)', 'Jumlah total item pada tampilan, termasuk target.'],
        ['Pengecoh', 'Setiap item bukan-target pada tampilan.'],
        ['Pencarian fitur', 'Pencarian target yang berbeda dari semua pengecoh dalam satu fitur dasar, seperti warna atau bentuk.'],
        ['Pencarian konjungsi', 'Pencarian target yang hanya ditentukan oleh gabungan fitur, yang masing-masing dimiliki sebagian pengecoh.'],
        ['Pop-out', 'Pengalaman target fitur yang langsung ditemukan, berapa pun jumlah pengecohnya.'],
        ['Kemiringan pencarian', 'Kenaikan waktu reaksi per item tambahan, diperoleh dari garis yang dicocokkan pada waktu reaksi terhadap N.'],
        ['Pemrosesan paralel', 'Menganalisis semua item pada waktu yang sama, seperti pada tahap pertama teori integrasi fitur.'],
        ['Pemrosesan serial', 'Memeriksa item satu demi satu dengan atensi terfokus.'],
      ],
    },
    misconceptions: {
      en: [
        ['Searching is always slower when there are more things to look through.', 'Only for inefficient searches. When the target differs in a single basic feature, it is found about as fast among 60 items as among 4, because colour and shape are registered everywhere at once.'],
        ['A red O is harder to find among red Xs and blue Os because red and blue are confusing colours.', 'The colours are easy to tell apart. The difficulty is that the red Xs share the target\'s colour and the blue Os share its shape, so no single feature singles it out; attention has to combine colour and shape for each item.'],
        ['The red O is only "found" when you consciously look at it, so search is always serial.', 'In feature search your eyes often land on the target in the very first movement because the parallel stage has already located it; the flat slope shows that the distractors were never inspected individually.'],
        ['A slope of 30 ms per item means attention visits each item for exactly 30 ms.', 'The slope is an average over trials; on target-present trials about half the items are checked before the target turns up, so the time per item inspected is roughly twice the measured slope. Grouping of similar distractors can also speed things up.'],
      ],
      id: [
        ['Mencari selalu lebih lambat jika ada lebih banyak benda yang harus diperiksa.', 'Hanya untuk pencarian yang tidak efisien. Jika target berbeda dalam satu fitur dasar, ia ditemukan hampir secepat di antara 60 item maupun 4 item, karena warna dan bentuk tercatat di semua tempat sekaligus.'],
        ['O merah lebih sulit ditemukan di antara X merah dan O biru karena merah dan biru adalah warna yang membingungkan.', 'Warnanya mudah dibedakan. Kesulitannya adalah X merah berbagi warna target dan O biru berbagi bentuknya, sehingga tidak ada satu fitur pun yang menandainya; atensi harus menggabungkan warna dan bentuk untuk tiap item.'],
        ['O merah hanya "ditemukan" ketika kita sengaja melihatnya, jadi pencarian selalu serial.', 'Pada pencarian fitur mata kita sering langsung mendarat di target pada gerakan pertama karena tahap paralel sudah menemukannya; kemiringan yang datar menunjukkan pengecoh tidak pernah diperiksa satu per satu.'],
        ['Kemiringan 30 ms per item berarti atensi mengunjungi tiap item tepat 30 ms.', 'Kemiringan adalah rata-rata antarpercobaan; pada percobaan dengan target sekitar separuh item diperiksa sebelum target muncul, sehingga waktu per item yang diperiksa kira-kira dua kali kemiringan terukur. Pengelompokan pengecoh yang serupa juga dapat mempercepat.'],
      ],
    },
    realWorld: {
      en: [
        'Radiologists scanning X-rays and airport screeners checking baggage images perform conjunction-like searches, and their miss rates rise when the target is rare.',
        'Warning signs and emergency exits use colours that no surrounding sign shares, so they pop out in a single glance.',
        'Highlighting one word in a document in a unique colour makes it a feature target; highlighting many words in the same colour turns finding a particular one back into a slow search.',
        'Camouflage works by giving an animal the same features as its background, so there is nothing for the parallel stage to detect.',
      ],
      id: [
        'Radiolog yang memindai foto rontgen dan petugas keamanan bandara yang memeriksa citra bagasi melakukan pencarian mirip konjungsi, dan tingkat kelolosannya naik ketika target jarang muncul.',
        'Rambu peringatan dan pintu darurat memakai warna yang tidak dimiliki rambu di sekitarnya, sehingga menonjol dalam satu pandangan.',
        'Menyorot satu kata dalam dokumen dengan warna unik menjadikannya target fitur; menyorot banyak kata dengan warna yang sama mengubah pencarian satu kata tertentu kembali menjadi pencarian yang lambat.',
        'Kamuflase bekerja dengan memberi hewan fitur yang sama dengan latarnya, sehingga tidak ada yang bisa dideteksi oleh tahap paralel.',
      ],
    },
    questions: {
      en: [
        { q: 'In conjunction mode a student measures mean RTs of 900 ms at N = 8 and 1620 ms at N = 32. Estimate the search slope and the intercept.', a: 'Slope = (1620 − 900) / (32 − 8) = 720 / 24 = 30 ms per item, in the classic range. Extrapolating back: intercept ≈ 900 − 8 × 30 = 660 ms, which includes perceiving the display, deciding, and moving the mouse.' },
        { q: 'Predict the same student\'s mean RT at N = 60 in conjunction mode and in feature mode, and explain the difference.', a: 'Conjunction: about 660 + 60 × 30 ≈ 2460 ms, because each extra item adds about 30 ms of serial checking. Feature: roughly the same as at any other N, around 600 to 700 ms, because the red O is registered in parallel and pops out regardless of how many blue Os surround it.' },
        { q: 'The sim always includes a target. If it also had target-absent trials in conjunction mode, how would their slope compare, and why?', a: 'Roughly twice as steep. With a target present, search stops on average after about half the items have been checked; with no target, every item must be examined before you can be sure it is absent, so each added item costs about twice as much time.' },
      ],
      id: [
        { q: 'Pada mode konjungsi seorang siswa mengukur rata-rata RT 900 ms pada N = 8 dan 1620 ms pada N = 32. Perkirakan kemiringan pencarian dan titik potongnya.', a: 'Kemiringan = (1620 − 900) / (32 − 8) = 720 / 24 = 30 ms per item, dalam rentang klasik. Ekstrapolasi ke belakang: titik potong ≈ 900 − 8 × 30 = 660 ms, yang mencakup mempersepsi tampilan, memutuskan, dan menggerakkan mouse.' },
        { q: 'Prediksikan rata-rata RT siswa yang sama pada N = 60 dalam mode konjungsi dan mode fitur, lalu jelaskan perbedaannya.', a: 'Konjungsi: sekitar 660 + 60 × 30 ≈ 2460 ms, karena tiap item tambahan menambah sekitar 30 ms pemeriksaan serial. Fitur: kira-kira sama seperti pada N lain, sekitar 600 sampai 700 ms, karena O merah tercatat secara paralel dan menonjol berapa pun jumlah O biru di sekitarnya.' },
        { q: 'Simulasi ini selalu menyertakan target. Jika ada juga percobaan tanpa target pada mode konjungsi, bagaimana kemiringannya dibandingkan, dan mengapa?', a: 'Kira-kira dua kali lebih curam. Dengan target ada, pencarian rata-rata berhenti setelah sekitar separuh item diperiksa; tanpa target, semua item harus diperiksa sebelum kita yakin target tidak ada, sehingga tiap item tambahan memakan waktu sekitar dua kali lipat.' },
      ],
    },
  },
};
