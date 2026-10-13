// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Order the six stages of cell division.',
      "Identify each stage from the chromosome layout.",
      'Recognize the spindle apparatus and centrosomes.',
    ],
    id: [
      'Mengurutkan enam tahap pembelahan sel.',
      'Mengenali tiap tahap dari tata letak kromosom.',
      'Mengenali aparatus spindel dan sentrosom.',
    ],
  },
  tryThis: {
    en: [
      'Pause at metaphase — what aligns the chromosomes?',
      'Step from anaphase to telophase — what changes first?',
      'Spot the centrosomes — when do they reach the poles?',
    ],
    id: [
      'Jeda saat metafase — apa yang menjajarkan kromosom?',
      'Telusuri dari anafase ke telofase — apa yang berubah lebih dulu?',
      'Cari sentrosom — kapan mereka mencapai kutub?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Your body replaces worn-out cells and grows by cell division. Mitosis is the kind of division that produces two daughter cells genetically identical to the parent, with the same number of chromosomes. The copying of the DNA happens before mitosis, during the S phase of interphase, so by the time division starts each chromosome already consists of two identical sister chromatids joined at a centromere. Mitosis is the choreography that sorts those copies so that each daughter cell gets exactly one of every pair of sister chromatids.',
        'In prophase the long, loose chromatin coils up into compact chromosomes that are visible as X shapes, the nuclear envelope breaks apart and the two centrosomes move to opposite ends of the cell, building the spindle of microtubules between them. In metaphase spindle fibres from both poles have attached to each chromosome at its centromere and tug it into line at the cell\'s equator, the metaphase plate. In anaphase the sister chromatids are pulled apart and dragged toward opposite poles, each now counting as a chromosome in its own right. In telophase nuclear envelopes form around the two groups and the chromosomes unwind again. Cytokinesis, the division of the cytoplasm, overlaps with telophase: an animal cell pinches in two along a cleavage furrow, while a plant cell builds a new cell wall across the middle.',
        'The simulation shows a cell with four chromosomes, a simple count that is easy to follow (a human cell has 46). Use the "Stage" menu or "Next stage" to jump to any stage, turn on "Auto-play" to run through the whole cycle, and set "Speed" to slow a stage down. The yellow dots are centrosomes, the faint lines between them are spindle fibres, and the dashed circle is the nuclear envelope, which fades in prophase and returns in telophase. The progress bar shows how far through the cycle you are.',
        'The sim simplifies in several ways. Interphase is shown as a single stage, but it actually fills most of a cell\'s life and has its own phases (G1, S and G2), and in a typical human cell mitosis takes about an hour out of a roughly 24-hour cycle. The brief prometaphase, when spindle fibres first capture the chromosomes, is folded into prophase and metaphase. The chromosomes are drawn in four different colours as independent units, not as homologous pairs, and the X shapes do not show the kinetochores where fibres attach. Cytokinesis is drawn as two circles separating, which matches an animal cell but not a plant cell. Real cells also have checkpoints that stop the cycle if DNA is damaged or chromosomes are not properly attached.',
      ],
      id: [
        'Tubuhmu mengganti sel yang aus dan bertumbuh lewat pembelahan sel. Mitosis adalah jenis pembelahan yang menghasilkan dua sel anak yang secara genetik identik dengan sel induk, dengan jumlah kromosom yang sama. Penyalinan DNA terjadi sebelum mitosis, selama fase S interfase, sehingga saat pembelahan dimulai setiap kromosom sudah terdiri atas dua kromatid saudara yang identik dan terikat pada sentromer. Mitosis adalah koreografi yang memilah salinan itu agar setiap sel anak menerima tepat satu dari setiap pasang kromatid saudara.',
        'Pada profase, kromatin yang panjang dan longgar menggulung menjadi kromosom padat yang tampak sebagai bentuk X, selubung inti terurai, dan kedua sentrosom bergerak ke ujung-ujung sel yang berlawanan sambil membangun gelendong (spindel) mikrotubulus di antara keduanya. Pada metafase, serat gelendong dari kedua kutub telah menempel pada setiap kromosom di sentromernya dan menariknya hingga berjajar di ekuator sel, lempeng metafase. Pada anafase, kromatid saudara dipisahkan dan diseret ke kutub yang berlawanan, masing-masing kini terhitung sebagai kromosom tersendiri. Pada telofase, selubung inti terbentuk di sekeliling kedua kelompok dan kromosom mengurai kembali. Sitokinesis, pembagian sitoplasma, tumpang tindih dengan telofase: sel hewan mencubit dirinya menjadi dua di sepanjang lekukan pembelahan, sedangkan sel tumbuhan membangun dinding sel baru di tengah.',
        'Simulasi menampilkan sel dengan empat kromosom, jumlah sederhana yang mudah diikuti (sel manusia memiliki 46). Gunakan menu "Stage" atau "Next stage" untuk melompat ke tahap mana pun, nyalakan "Auto-play" untuk menjalankan seluruh siklus, dan atur "Speed" untuk memperlambat suatu tahap. Titik kuning adalah sentrosom, garis samar di antara keduanya adalah serat gelendong, dan lingkaran putus-putus adalah selubung inti, yang memudar pada profase dan kembali pada telofase. Bilah kemajuan menunjukkan sudah sejauh mana siklus berjalan.',
        'Simulasi ini menyederhanakan dalam beberapa hal. Interfase ditampilkan sebagai satu tahap, padahal sebenarnya mengisi sebagian besar hidup sel dan memiliki fase-fasenya sendiri (G1, S, dan G2), dan pada sel manusia tipikal mitosis hanya memakan sekitar satu jam dari siklus kira-kira 24 jam. Prometafase yang singkat, saat serat gelendong pertama kali menangkap kromosom, dilebur ke dalam profase dan metafase. Kromosom digambar dalam empat warna berbeda sebagai unit yang berdiri sendiri, bukan sebagai pasangan homolog, dan bentuk X-nya tidak menampilkan kinetokor tempat serat menempel. Sitokinesis digambar sebagai dua lingkaran yang memisah, yang sesuai untuk sel hewan tetapi tidak untuk sel tumbuhan. Sel sungguhan juga memiliki titik pemeriksaan yang menghentikan siklus jika DNA rusak atau kromosom belum menempel dengan benar.',
      ],
    },
    figure: {
      caption: {
        en: 'The four stages of mitosis in a cell with two chromosomes. Each X-shaped chromosome is two identical sister chromatids; anaphase separates them so that each daughter nucleus receives one complete set.',
        id: 'Empat tahap mitosis pada sel dengan dua kromosom. Setiap kromosom berbentuk X adalah dua kromatid saudara yang identik; anafase memisahkannya sehingga setiap inti anak menerima satu set lengkap.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Prophase, metaphase, anaphase and telophase', 'Profase, metafase, anafase, dan telofase')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.c{fill:none;stroke:currentColor;stroke-width:1.6}.sp{stroke:#f59e0b;stroke-width:.8;opacity:.6}.x{stroke-width:4;fill:none;stroke-linecap:round}.s{font-size:10px;opacity:.75}.b{font-size:11px;font-weight:600}</style>
  <g transform="translate(48 110)">
    <circle r="40" class="c"/><circle r="26" class="m" stroke-dasharray="3 3"/>
    <circle cx="-30" cy="-26" r="3" fill="#f59e0b"/><circle cx="30" cy="26" r="3" fill="#f59e0b"/>
    <path d="M-12 -6 L-2 8 M-12 8 L-2 -6" class="x" stroke="#ef4444"/>
    <path d="M4 -10 L14 4 M4 4 L14 -10" class="x" stroke="#3b82f6"/>
  </g>
  <text x="22" y="170" class="b">${L('Prophase', 'Profase')}</text>
  <text x="8" y="184" class="s">${L('condense,', 'memadat,')}</text>
  <text x="8" y="196" class="s">${L('spindle forms', 'gelendong terbentuk')}</text>
  <g transform="translate(136 110)">
    <circle r="40" class="c"/>
    <circle cx="-34" cy="0" r="3" fill="#f59e0b"/><circle cx="34" cy="0" r="3" fill="#f59e0b"/>
    <path d="M-34 0 L0 -12 M-34 0 L0 12 M34 0 L0 -12 M34 0 L0 12" class="sp"/>
    <line x1="0" y1="-32" x2="0" y2="32" class="m" stroke-dasharray="2 3"/>
    <path d="M-5 -19 L5 -5 M-5 -5 L5 -19" class="x" stroke="#ef4444"/>
    <path d="M-5 5 L5 19 M-5 19 L5 5" class="x" stroke="#3b82f6"/>
  </g>
  <text x="106" y="170" class="b">${L('Metaphase', 'Metafase')}</text>
  <text x="96" y="184" class="s">${L('line up at equator', 'berjajar di ekuator')}</text>
  <g transform="translate(224 110)">
    <ellipse rx="46" ry="38" class="c"/>
    <circle cx="-38" cy="0" r="3" fill="#f59e0b"/><circle cx="38" cy="0" r="3" fill="#f59e0b"/>
    <path d="M-38 0 L-16 -12 M-38 0 L-16 12 M38 0 L16 -12 M38 0 L16 12" class="sp"/>
    <path d="M-20 -18 L-14 -12 L-20 -6" class="x" stroke="#ef4444"/><path d="M20 -18 L14 -12 L20 -6" class="x" stroke="#ef4444"/>
    <path d="M-20 6 L-14 12 L-20 18" class="x" stroke="#3b82f6"/><path d="M20 6 L14 12 L20 18" class="x" stroke="#3b82f6"/>
  </g>
  <text x="198" y="170" class="b">${L('Anaphase', 'Anafase')}</text>
  <text x="184" y="184" class="s">${L('chromatids pulled', 'kromatid ditarik')}</text>
  <text x="184" y="196" class="s">${L('to the poles', 'ke kutub')}</text>
  <g transform="translate(312 110)">
    <path d="M0 -26 C-30 -34 -46 -14 -46 0 C-46 14 -30 34 0 26 C30 34 46 14 46 0 C46 -14 30 -34 0 -26 Z" class="c"/>
    <circle cx="-24" cy="0" r="16" class="m" stroke-dasharray="3 3"/><circle cx="24" cy="0" r="16" class="m" stroke-dasharray="3 3"/>
    <path d="M-30 -8 L-18 -4" class="x" stroke="#ef4444"/><path d="M-30 6 L-18 10" class="x" stroke="#3b82f6"/>
    <path d="M18 -8 L30 -4" class="x" stroke="#ef4444"/><path d="M18 6 L30 10" class="x" stroke="#3b82f6"/>
  </g>
  <text x="286" y="170" class="b">${L('Telophase', 'Telofase')}</text>
  <text x="272" y="184" class="s">${L('two nuclei form;', 'dua inti; lalu')}</text>
  <text x="272" y="196" class="s">${L('then cell splits', 'sel membelah')}</text>
  <text x="8" y="22" class="s">${L('Before mitosis (S phase) the DNA was copied,', 'Sebelum mitosis (fase S) DNA sudah disalin,')}</text>
  <text x="8" y="34" class="s">${L('so each X is two identical sister chromatids.', 'jadi tiap X adalah dua kromatid saudara identik.')}</text>
  <circle cx="14" cy="226" r="3" fill="#f59e0b"/><text x="22" y="230" class="s">${L('centrosome', 'sentrosom')}</text>
  <line x1="90" y1="226" x2="112" y2="226" class="sp" stroke-width="1.5"/><text x="118" y="230" class="s">${L('spindle fibre', 'serat gelendong')}</text>
  <circle cx="200" cy="226" r="5" class="m" stroke-dasharray="2 2"/><text x="210" y="230" class="s">${L('nuclear envelope', 'selubung inti')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Mitosis produces two daughter cells that are genetically identical to the parent and have the same chromosome number.',
        'DNA is copied before mitosis, in the S phase of interphase; mitosis only sorts the copies.',
        'The spindle, built from the two centrosomes, attaches to each chromosome at its centromere and lines the chromosomes up at the equator.',
        'Sister chromatids separate in anaphase, so what looked like 4 X-shaped chromosomes becomes 4 chromosomes at each pole.',
        'Cytokinesis, the division of the cytoplasm, is a separate process that overlaps with telophase.',
      ],
      id: [
        'Mitosis menghasilkan dua sel anak yang secara genetik identik dengan induknya dan memiliki jumlah kromosom yang sama.',
        'DNA disalin sebelum mitosis, pada fase S interfase; mitosis hanya memilah salinan-salinan itu.',
        'Gelendong, yang dibangun dari kedua sentrosom, menempel pada setiap kromosom di sentromernya dan menjajarkan kromosom di ekuator.',
        'Kromatid saudara berpisah pada anafase, sehingga 4 kromosom berbentuk X menjadi 4 kromosom di setiap kutub.',
        'Sitokinesis, pembagian sitoplasma, adalah proses terpisah yang tumpang tindih dengan telofase.',
      ],
    },
    vocabulary: {
      en: [
        ['Chromatin', 'The loosely packed form of DNA and protein found in the nucleus between divisions.'],
        ['Chromosome', 'A single, tightly coiled DNA molecule with its proteins; visible as a compact body during division.'],
        ['Sister chromatids', 'The two identical copies of a replicated chromosome, joined at the centromere until anaphase.'],
        ['Centromere', 'The narrow region where sister chromatids are held together and where spindle fibres attach.'],
        ['Centrosome', 'The structure that organises the spindle; the two centrosomes move to opposite poles of the cell.'],
        ['Spindle', 'The framework of microtubule fibres that moves the chromosomes during mitosis.'],
        ['Metaphase plate', 'The imaginary plane across the middle of the cell where chromosomes line up in metaphase.'],
        ['Cytokinesis', 'The splitting of the cytoplasm into two cells, by a cleavage furrow in animals or a cell plate in plants.'],
      ],
      id: [
        ['Kromatin', 'Bentuk DNA dan protein yang terkemas longgar di dalam inti di antara pembelahan.'],
        ['Kromosom', 'Satu molekul DNA yang tergulung rapat beserta proteinnya; tampak sebagai badan padat saat pembelahan.'],
        ['Kromatid saudara', 'Dua salinan identik dari kromosom yang telah direplikasi, terikat di sentromer sampai anafase.'],
        ['Sentromer', 'Daerah sempit tempat kromatid saudara saling terikat dan tempat serat gelendong menempel.'],
        ['Sentrosom', 'Struktur yang mengorganisasi gelendong; kedua sentrosom bergerak ke kutub sel yang berlawanan.'],
        ['Gelendong (spindel)', 'Kerangka serat mikrotubulus yang menggerakkan kromosom selama mitosis.'],
        ['Lempeng metafase', 'Bidang khayal di tengah sel tempat kromosom berjajar pada metafase.'],
        ['Sitokinesis', 'Pembelahan sitoplasma menjadi dua sel, lewat lekukan pembelahan pada hewan atau lempeng sel pada tumbuhan.'],
      ],
    },
    misconceptions: {
      en: [
        ['DNA is copied during mitosis.', 'DNA is copied earlier, in the S phase of interphase. By prophase each chromosome already has two sister chromatids; mitosis separates copies that already exist.'],
        ['Interphase is a resting stage when nothing happens.', 'Interphase is the busiest part of the cycle: the cell grows, makes proteins, copies all its DNA and duplicates its centrosome. Most cells spend over 90% of their time in interphase.'],
        ['Mitosis halves the number of chromosomes.', 'That is meiosis. In mitosis each daughter cell receives the same number of chromosomes as the parent: 46 in a human cell.'],
        ['After anaphase each side has only half of the genetic information.', 'Each side has one complete set, because the sister chromatids that separated were identical copies. Each daughter nucleus ends up with all the genes the parent had.'],
      ],
      id: [
        ['DNA disalin selama mitosis.', 'DNA disalin lebih awal, pada fase S interfase. Saat profase setiap kromosom sudah memiliki dua kromatid saudara; mitosis memisahkan salinan yang sudah ada.'],
        ['Interfase adalah tahap istirahat ketika tidak terjadi apa-apa.', 'Interfase adalah bagian tersibuk dari siklus: sel bertumbuh, membuat protein, menyalin seluruh DNA-nya, dan menggandakan sentrosomnya. Kebanyakan sel menghabiskan lebih dari 90% waktunya dalam interfase.'],
        ['Mitosis mengurangi jumlah kromosom menjadi setengah.', 'Itu meiosis. Pada mitosis setiap sel anak menerima jumlah kromosom yang sama dengan induknya: 46 pada sel manusia.'],
        ['Setelah anafase, tiap sisi hanya memiliki setengah informasi genetik.', 'Tiap sisi memiliki satu set lengkap, karena kromatid saudara yang berpisah adalah salinan identik. Setiap inti anak berakhir dengan semua gen yang dimiliki induknya.'],
      ],
    },
    realWorld: {
      en: [
        'The lining of your gut and the outer layer of your skin are replaced every few days to weeks by cells dividing by mitosis.',
        'Cancer is cell division that has escaped the normal checkpoints; several chemotherapy drugs (such as vinblastine and paclitaxel) work by jamming the spindle so cancer cells cannot complete mitosis.',
        'Pressing a stained onion root tip under a microscope is a classic school lab: the tip is full of dividing cells, so every stage of mitosis can be found in one slide.',
        'A cut heals because cells at the edge of the wound divide by mitosis to fill the gap with identical new cells.',
      ],
      id: [
        'Lapisan usus dan lapisan terluar kulitmu diganti setiap beberapa hari sampai minggu oleh sel yang membelah lewat mitosis.',
        'Kanker adalah pembelahan sel yang lolos dari titik pemeriksaan normal; beberapa obat kemoterapi (seperti vinblastin dan paklitaksel) bekerja dengan mengganggu gelendong sehingga sel kanker tidak bisa menyelesaikan mitosis.',
        'Menekan ujung akar bawang yang diwarnai di bawah mikroskop adalah praktikum sekolah klasik: ujung akar penuh sel yang membelah, sehingga setiap tahap mitosis bisa ditemukan dalam satu preparat.',
        'Luka sayat sembuh karena sel di tepi luka membelah lewat mitosis untuk mengisi celah dengan sel baru yang identik.',
      ],
    },
    questions: {
      en: [
        { q: 'A cell has 8 chromosomes. How many chromatids does it contain at metaphase, and how many chromosomes does each daughter cell have after mitosis?', a: '16 chromatids at metaphase, because each of the 8 chromosomes has been copied into two sister chromatids. After anaphase separates them, each daughter cell receives 8 chromosomes, the same number as the parent.' },
        { q: 'A drug stops spindle fibres from forming. At which stage would the cell get stuck, and why?', a: 'It could condense its chromosomes in prophase but could never line them up at the metaphase plate or pull sister chromatids apart, so it would stall before completing metaphase. Without a spindle there is no way to move chromosomes.' },
        { q: 'In the sim the four chromosomes never pair up with each other. What would be different in meiosis, and why does that matter?', a: 'In meiosis I homologous chromosomes pair up and the pairs, not sister chromatids, are separated, so each product has half the chromosome number. Mitosis treats every chromosome independently and keeps the number the same, which is what growth and repair require.' },
      ],
      id: [
        { q: 'Sebuah sel memiliki 8 kromosom. Berapa kromatid yang dikandungnya saat metafase, dan berapa kromosom yang dimiliki tiap sel anak setelah mitosis?', a: '16 kromatid saat metafase, karena setiap dari 8 kromosom telah disalin menjadi dua kromatid saudara. Setelah anafase memisahkannya, tiap sel anak menerima 8 kromosom, sama dengan induknya.' },
        { q: 'Sebuah obat menghentikan pembentukan serat gelendong. Pada tahap mana sel akan tersangkut, dan mengapa?', a: 'Sel masih bisa memadatkan kromosomnya pada profase tetapi tidak pernah bisa menjajarkannya di lempeng metafase atau menarik kromatid saudara berpisah, sehingga ia terhenti sebelum menyelesaikan metafase. Tanpa gelendong tidak ada cara untuk menggerakkan kromosom.' },
        { q: 'Di simulasi, keempat kromosom tidak pernah berpasangan satu sama lain. Apa yang berbeda pada meiosis, dan mengapa itu penting?', a: 'Pada meiosis I kromosom homolog berpasangan dan pasangan itulah, bukan kromatid saudara, yang dipisahkan, sehingga tiap hasilnya memiliki setengah jumlah kromosom. Mitosis memperlakukan setiap kromosom secara mandiri dan menjaga jumlahnya tetap, sesuai kebutuhan pertumbuhan dan perbaikan.' },
      ],
    },
  },
};
