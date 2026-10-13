// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the major organelles of eukaryotic cells.',
      'List the structures unique to plant cells.',
      'Connect each organelle to a specific cellular function.',
    ],
    id: [
      'Mengenali organel utama sel eukariot.',
      'Mendaftar struktur yang khas pada sel tumbuhan.',
      'Menghubungkan tiap organel dengan fungsi sel tertentu.',
    ],
  },
  tryThis: {
    en: [
      'Find three structures in the plant cell that are absent in the animal cell.',
      'Which organelle would you remove to stop the cell from making proteins?',
      'Which organelle plays the same role in plants and animals?',
    ],
    id: [
      'Cari tiga struktur sel tumbuhan yang tidak ada pada sel hewan.',
      'Organel mana yang harus dihilangkan agar sel berhenti membuat protein?',
      'Organel mana yang memiliki peran sama pada tumbuhan dan hewan?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Every living thing is built from cells, and most cells are far too small to see without a microscope. Inside, a cell is not a bag of soup: it is organised into compartments called organelles, each with its own job, a bit like the rooms of a factory. The nucleus holds the DNA instructions, ribosomes build proteins from those instructions, the endoplasmic reticulum and Golgi apparatus fold, finish and ship the proteins, and mitochondria release the energy that powers all of it. The cell membrane wraps the whole thing and decides what is allowed in and out.',
        'Animal and plant cells share this basic kit, but plant cells have three extra structures that the sim lets you compare. The cell wall is a stiff cellulose box outside the membrane that gives plants their shape and lets them stand upright without a skeleton. Chloroplasts capture sunlight and use it to make sugar from carbon dioxide and water, which is why only plants can make their own food. The large central vacuole stores water and pushes outward against the wall, keeping the cell firm; when it loses water the plant wilts. Animal cells instead have small vacuoles and lysosomes, which digest worn-out parts and waste.',
        'Use the Cell type menu to switch between the two cells, then click any coloured shape to read what it does. Notice which structures disappear and which stay when you switch: the nucleus, mitochondria, ribosomes, ER and Golgi appear in both, because both kinds of cell need to read their DNA, make proteins and release energy. Mitochondria in a plant cell may surprise you, but a plant still has to break down the sugar it made in the daytime to power itself at night.',
        'The drawing is a simplified map, not a photograph. Real cells are three-dimensional, crowded with thousands of organelles and a web of protein fibres (the cytoskeleton) that the sim leaves out, and the shapes and sizes here are chosen for clarity rather than drawn to scale. The sim also shows only one typical animal cell and one typical plant cell; real bodies contain hundreds of specialised types, such as muscle cells packed with mitochondria or root cells with no chloroplasts at all.',
      ],
      id: [
        'Semua makhluk hidup tersusun dari sel, dan kebanyakan sel terlalu kecil untuk dilihat tanpa mikroskop. Di dalamnya, sel bukanlah kantong berisi cairan belaka: sel tertata dalam ruang-ruang yang disebut organel, masing-masing dengan tugas sendiri, mirip ruangan-ruangan di sebuah pabrik. Nukleus menyimpan instruksi DNA, ribosom membangun protein dari instruksi itu, retikulum endoplasma dan aparatus Golgi melipat, menyempurnakan, dan mengirim protein, sedangkan mitokondria melepaskan energi yang menggerakkan semuanya. Membran sel membungkus seluruhnya dan menentukan apa yang boleh masuk dan keluar.',
        'Sel hewan dan sel tumbuhan berbagi perangkat dasar ini, tetapi sel tumbuhan punya tiga struktur tambahan yang bisa kamu bandingkan di simulasi. Dinding sel adalah kotak selulosa kaku di luar membran yang memberi bentuk pada tumbuhan dan membuatnya berdiri tegak tanpa tulang. Kloroplas menangkap cahaya matahari dan memakainya untuk membuat gula dari karbon dioksida dan air; itulah sebabnya hanya tumbuhan yang bisa membuat makanannya sendiri. Vakuola pusat yang besar menyimpan air dan menekan dinding dari dalam sehingga sel tetap kencang; saat kehilangan air, tumbuhan menjadi layu. Sel hewan justru memiliki vakuola kecil dan lisosom, yang mencerna bagian sel yang sudah usang dan limbah.',
        'Gunakan menu jenis sel untuk berpindah antara kedua sel, lalu klik bentuk berwarna mana pun untuk membaca fungsinya. Perhatikan struktur mana yang hilang dan mana yang tetap saat kamu berpindah: nukleus, mitokondria, ribosom, RE, dan Golgi ada di keduanya, karena kedua jenis sel sama-sama perlu membaca DNA, membuat protein, dan melepaskan energi. Mitokondria pada sel tumbuhan mungkin mengejutkanmu, tetapi tumbuhan tetap harus memecah gula yang dibuatnya pada siang hari untuk menggerakkan dirinya pada malam hari.',
        'Gambar ini peta yang disederhanakan, bukan foto. Sel sungguhan berbentuk tiga dimensi, penuh sesak dengan ribuan organel dan jaring serat protein (sitoskeleton) yang tidak ditampilkan simulasi, dan bentuk serta ukuran di sini dipilih agar jelas, bukan menurut skala. Simulasi juga hanya menampilkan satu sel hewan dan satu sel tumbuhan yang khas; tubuh sungguhan berisi ratusan jenis sel khusus, misalnya sel otot yang penuh mitokondria atau sel akar yang sama sekali tidak punya kloroplas.',
      ],
    },
    figure: {
      caption: {
        en: 'How the organelles work together. Instructions copied from DNA in the nucleus are read by ribosomes on the rough ER, the Golgi finishes and packages the protein, and a vesicle carries it to the membrane. Mitochondria supply the energy (ATP) for every step; in plants, chloroplasts make the sugar that mitochondria burn.',
        id: 'Cara organel bekerja bersama. Instruksi yang disalin dari DNA di nukleus dibaca oleh ribosom pada RE kasar, Golgi menyempurnakan dan mengemas protein, lalu vesikel membawanya ke membran. Mitokondria memasok energi (ATP) untuk setiap langkah; pada tumbuhan, kloroplas membuat gula yang dibakar mitokondria.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Protein-making pipeline inside a cell', 'Jalur pembuatan protein di dalam sel')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.f{fill:none;stroke:currentColor;stroke-width:1.6}</style>
  <rect x="8" y="8" width="344" height="224" rx="40" fill="none" stroke="currentColor" stroke-width="2.5" opacity=".6"/>
  <text x="22" y="30" class="s">${L('cell membrane', 'membran sel')}</text>
  <circle cx="70" cy="110" r="34" fill="#8b5cf6" opacity=".8"/>
  <circle cx="74" cy="106" r="8" fill="#8b5cf6"/>
  <text x="46" y="156" font-weight="700">${L('nucleus', 'nukleus')}</text>
  <text x="38" y="169" class="s">${L('DNA instructions', 'instruksi DNA')}</text>
  <path d="M106 102 L138 102" class="f" marker-end="url(#a)"/>
  <text x="105" y="94" class="s">${L('mRNA copy', 'salinan mRNA')}</text>
  <path d="M148 78 q12 -14 24 0 q12 -14 24 0 q12 -14 24 0 M148 94 q12 -14 24 0 q12 -14 24 0 q12 -14 24 0 M148 110 q12 -14 24 0 q12 -14 24 0 q12 -14 24 0" fill="none" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
  <circle cx="160" cy="70" r="3" fill="#3b82f6"/><circle cx="184" cy="70" r="3" fill="#3b82f6"/><circle cx="208" cy="70" r="3" fill="#3b82f6"/>
  <text x="140" y="130" font-weight="700">${L('rough ER + ribosomes', 'RE kasar + ribosom')}</text>
  <text x="140" y="143" class="s">${L('build and fold the protein', 'membangun dan melipat protein')}</text>
  <path d="M228 96 L256 96" class="f" marker-end="url(#a)"/>
  <path d="M268 80 q20 -8 40 0 M264 94 q24 -10 48 0 M260 108 q28 -12 56 0" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" opacity=".75"/>
  <text x="262" y="130" font-weight="700">Golgi</text>
  <text x="246" y="143" class="s">${L('finish and package', 'menyempurnakan, mengemas')}</text>
  <path d="M290 60 L300 44" class="f" marker-end="url(#a)"/>
  <circle cx="306" cy="34" r="7" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="244" y="26" class="s">${L('vesicle to membrane', 'vesikel ke membran')}</text>
  <ellipse cx="200" cy="196" rx="40" ry="18" fill="#ef4444" opacity=".8"/>
  <path d="M172 196 q8 -10 16 0 q8 10 16 0 q8 -10 16 0 q8 10 16 0" fill="none" stroke="#fff" stroke-width="1.5" opacity=".8"/>
  <text x="166" y="226" font-weight="700">${L('mitochondrion', 'mitokondria')}</text>
  <path d="M190 176 L178 150" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#a)"/>
  <text x="196" y="166" fill="#ef4444" class="s">ATP (${L('energy', 'energi')})</text>
  <path d="M234 186 L262 118" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#a)"/>
  <ellipse cx="80" cy="200" rx="30" ry="14" fill="#10b981" opacity=".85"/>
  <text x="48" y="226" font-weight="700">${L('chloroplast (plant)', 'kloroplas (tumbuhan)')}</text>
  <path d="M112 198 L156 198" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#a)"/>
  <text x="112" y="190" fill="#10b981" class="s">${L('sugar', 'gula')}</text>
  <text x="22" y="186" fill="#10b981" class="s">${L('sunlight →', 'cahaya →')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A cell is divided into organelles, and each organelle does one main job for the cell.',
        'The nucleus stores the DNA instructions; ribosomes, the ER and the Golgi turn those instructions into finished proteins.',
        'Mitochondria release energy from sugar in both plant and animal cells.',
        'Plant cells have a cell wall, chloroplasts and a large central vacuole, which animal cells lack.',
        'Only chloroplasts can make sugar from sunlight, so plants make their own food and animals must eat.',
      ],
      id: [
        'Sel terbagi menjadi organel-organel, dan setiap organel mengerjakan satu tugas utama bagi sel.',
        'Nukleus menyimpan instruksi DNA; ribosom, RE, dan Golgi mengubah instruksi itu menjadi protein jadi.',
        'Mitokondria melepaskan energi dari gula pada sel tumbuhan maupun sel hewan.',
        'Sel tumbuhan memiliki dinding sel, kloroplas, dan vakuola pusat yang besar, yang tidak dimiliki sel hewan.',
        'Hanya kloroplas yang dapat membuat gula dari cahaya matahari, sehingga tumbuhan membuat makanannya sendiri dan hewan harus makan.',
      ],
    },
    vocabulary: {
      en: [
        ['Organelle', 'A structure inside a cell with a particular job, such as the nucleus or a mitochondrion.'],
        ['Cell membrane', 'The thin, flexible outer layer of every cell that controls what enters and leaves.'],
        ['Cell wall', 'A stiff layer of cellulose outside the membrane of plant cells that gives them shape and support.'],
        ['Nucleus', 'The control centre that stores the DNA and sends out copies of its instructions.'],
        ['Mitochondrion', 'The organelle that breaks down sugar with oxygen to release usable energy (ATP) for the cell.'],
        ['Chloroplast', 'The green organelle in plant cells where photosynthesis makes sugar from light, water and carbon dioxide.'],
        ['Vacuole', 'A fluid-filled sac; small in animal cells, but one large central vacuole keeps a plant cell firm.'],
        ['Ribosome', 'A tiny particle that reads messenger RNA and joins amino acids into a protein.'],
      ],
      id: [
        ['Organel', 'Struktur di dalam sel dengan tugas tertentu, seperti nukleus atau mitokondria.'],
        ['Membran sel', 'Lapisan luar tipis dan lentur pada setiap sel yang mengatur zat yang masuk dan keluar.'],
        ['Dinding sel', 'Lapisan selulosa kaku di luar membran sel tumbuhan yang memberi bentuk dan penyokong.'],
        ['Nukleus', 'Pusat kendali yang menyimpan DNA dan mengirimkan salinan instruksinya.'],
        ['Mitokondria', 'Organel yang memecah gula dengan oksigen untuk melepaskan energi siap pakai (ATP) bagi sel.'],
        ['Kloroplas', 'Organel hijau pada sel tumbuhan tempat fotosintesis membuat gula dari cahaya, air, dan karbon dioksida.'],
        ['Vakuola', 'Kantong berisi cairan; kecil pada sel hewan, tetapi satu vakuola pusat yang besar menjaga sel tumbuhan tetap kencang.'],
        ['Ribosom', 'Partikel sangat kecil yang membaca RNA duta dan menyambungkan asam amino menjadi protein.'],
      ],
    },
    misconceptions: {
      en: [
        ['Plant cells have chloroplasts instead of mitochondria.', 'Plant cells have both. Chloroplasts make sugar in the light, and mitochondria break that sugar down for energy day and night, just as they do in animal cells.'],
        ['The cell wall replaces the cell membrane in plants.', 'Plant cells have both: the membrane lies just inside the wall and still controls what enters and leaves. The wall only adds support.'],
        ['A cell is a bag of liquid with a few parts floating in it.', 'A cell is tightly packed and highly organised; organelles are held in place by a protein scaffold and materials are moved along set routes, like the ER-to-Golgi path in the figure.'],
        ['Big organisms have bigger cells.', 'An elephant\'s cells are about the same size as a mouse\'s. Larger organisms simply have far more cells.'],
      ],
      id: [
        ['Sel tumbuhan punya kloroplas sebagai pengganti mitokondria.', 'Sel tumbuhan punya keduanya. Kloroplas membuat gula saat ada cahaya, dan mitokondria memecah gula itu untuk energi siang dan malam, sama seperti pada sel hewan.'],
        ['Dinding sel menggantikan membran sel pada tumbuhan.', 'Sel tumbuhan punya keduanya: membran terletak tepat di dalam dinding dan tetap mengatur zat yang masuk dan keluar. Dinding hanya menambah penyokong.'],
        ['Sel adalah kantong cairan dengan beberapa bagian yang mengapung di dalamnya.', 'Sel sangat padat dan tertata rapi; organel ditahan pada tempatnya oleh rangka protein dan bahan-bahan dipindahkan lewat jalur tertentu, seperti jalur RE ke Golgi pada gambar.'],
        ['Makhluk hidup yang besar punya sel yang lebih besar.', 'Sel gajah berukuran hampir sama dengan sel tikus. Makhluk hidup yang lebih besar hanya punya sel yang jauh lebih banyak.'],
      ],
    },
    realWorld: {
      en: [
        'Muscle and heart cells are packed with mitochondria because they need a constant supply of energy; endurance training actually increases the number of mitochondria in your muscles.',
        'Celery goes limp in a warm kitchen and crisp again in water because its central vacuoles lose and then regain water pressure against the cell walls.',
        'Cells in your pancreas have an enormous rough ER and Golgi because they export large amounts of digestive enzymes and insulin.',
        'Paper, cotton and wood are mostly cellulose from plant cell walls, the most abundant natural material on Earth.',
      ],
      id: [
        'Sel otot dan sel jantung penuh dengan mitokondria karena membutuhkan pasokan energi terus-menerus; latihan ketahanan benar-benar menambah jumlah mitokondria di ototmu.',
        'Seledri menjadi lemas di dapur yang hangat dan renyah lagi di dalam air karena vakuola pusatnya kehilangan lalu mendapatkan kembali tekanan air terhadap dinding sel.',
        'Sel pankreas memiliki RE kasar dan Golgi yang sangat besar karena mengekspor enzim pencernaan dan insulin dalam jumlah besar.',
        'Kertas, katun, dan kayu sebagian besar adalah selulosa dari dinding sel tumbuhan, bahan alami yang paling melimpah di Bumi.',
      ],
    },
    questions: {
      en: [
        { q: 'A cell has a cell wall, a large central vacuole and chloroplasts. Is it an animal or a plant cell, and how can you tell?', a: 'A plant cell. All three structures are found only in plant cells; animal cells have no wall, only small vacuoles, and never chloroplasts.' },
        { q: 'A plant is kept in complete darkness for a week. Which organelle stops doing its main job, and which keeps working?', a: 'The chloroplasts stop making sugar because there is no light. The mitochondria keep working, breaking down the plant\'s stored sugar to release energy, which is why the plant eventually uses up its reserves.' },
        { q: 'Trace the path of a protein that the cell will export, naming the organelles in order.', a: 'The instructions are copied from DNA in the nucleus, read by ribosomes on the rough ER where the protein is built, then sent to the Golgi apparatus for finishing and packaging, and finally carried in a vesicle to the cell membrane, where it is released.' },
      ],
      id: [
        { q: 'Sebuah sel memiliki dinding sel, vakuola pusat yang besar, dan kloroplas. Apakah itu sel hewan atau sel tumbuhan, dan bagaimana kamu tahu?', a: 'Sel tumbuhan. Ketiga struktur itu hanya ada pada sel tumbuhan; sel hewan tidak punya dinding, hanya punya vakuola kecil, dan tidak pernah punya kloroplas.' },
        { q: 'Sebuah tumbuhan disimpan dalam gelap total selama seminggu. Organel mana yang berhenti mengerjakan tugas utamanya, dan mana yang tetap bekerja?', a: 'Kloroplas berhenti membuat gula karena tidak ada cahaya. Mitokondria tetap bekerja, memecah gula simpanan tumbuhan untuk melepaskan energi; itulah sebabnya tumbuhan akhirnya menghabiskan cadangannya.' },
        { q: 'Telusuri perjalanan protein yang akan dikeluarkan sel, dengan menyebutkan organelnya secara berurutan.', a: 'Instruksi disalin dari DNA di nukleus, dibaca oleh ribosom pada RE kasar tempat protein dibangun, lalu dikirim ke aparatus Golgi untuk disempurnakan dan dikemas, dan akhirnya dibawa dalam vesikel ke membran sel tempat protein dilepaskan.' },
      ],
    },
  },
};
