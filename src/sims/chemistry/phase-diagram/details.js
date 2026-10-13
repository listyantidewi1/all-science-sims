// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify solid / liquid / gas regions on a P-T diagram.',
      'Locate the triple point and the critical point.',
      "Recognize water's anomalous melting curve (slope is negative).",
    ],
    id: [
      'Mengenali wilayah padat / cair / gas pada diagram P-T.',
      'Menemukan titik tripel dan titik kritis.',
      'Mengenali kurva leleh air yang anomali (kemiringan negatif).',
    ],
  },
  tryThis: {
    en: [
      'Cross the triple point — what state-changes happen?',
      'Heat past the critical point — is it still gas? Or supercritical?',
      "Drag along water's melting curve — what does the negative slope mean for ice skating?",
    ],
    id: [
      'Lewati titik tripel — perubahan fasa apa yang terjadi?',
      'Panaskan melebihi titik kritis — apakah masih gas? Atau superkritis?',
      'Geser di sepanjang kurva leleh air — apa arti kemiringan negatif itu untuk bermain ski es?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Whether a substance is solid, liquid or gas depends on two things: how hot it is and how hard it is squeezed. A phase diagram is a map with temperature along the bottom and pressure up the side, divided into regions where each phase is stable. The lines between regions are the conditions where two phases can coexist, such as the boiling curve where liquid and vapour are in equilibrium. Crossing a line is a phase change: melting or freezing across the solid–liquid line, boiling or condensing across the liquid–gas line, and sublimation or deposition across the solid–gas line.',
        'Two special points stand out. At the triple point all three lines meet and ice, liquid water and water vapour coexist; for water this is 0.01 °C and 0.006 atm. The boiling curve ends at the critical point (374 °C, 218 atm for water). Beyond it there is no boiling at all: the liquid and gas become identical and the substance is a single supercritical fluid, dense like a liquid but filling its container like a gas. Water is also unusual in that its melting line leans slightly to the left, so at a higher pressure ice melts at a slightly lower temperature. This is because ice is less dense than liquid water, and squeezing favours the denser phase.',
        'Drag the marker anywhere on the diagram and the panel names the phase and sketches how the particles are arranged: an ordered lattice for solid, a crowded jumble for liquid, a sparse scatter for gas. The pressure axis is logarithmic so that 0.001 atm and 1000 atm fit on one screen; each gridline is a factor of ten. The presets take you to everyday and extreme conditions. Moving horizontally at 1 atm from left to right takes you from ice through liquid to steam; moving vertically at a fixed temperature shows that lowering the pressure makes water boil at lower temperature, which is why cooking is slower on a mountain and faster in a pressure cooker.',
        'The diagram is schematic. The boundary curves are drawn from simple formulas chosen to give the right shape and to pass through the triple and critical points, not from measured vapour-pressure data, so the exact position of the boiling curve relative to the gridlines is unreliable: for accurate numbers such as the boiling point at a given pressure, use a steam table. Use the sim for the qualitative picture: which regions touch, where the triple and critical points sit, the direction of the melting line, and what happens when you cross each boundary. It also ignores the many high-pressure forms of ice and metastable states such as supercooled water.',
      ],
      id: [
        'Apakah suatu zat berwujud padat, cair, atau gas bergantung pada dua hal: seberapa panas dan seberapa kuat ditekan. Diagram fasa adalah peta dengan suhu di sumbu mendatar dan tekanan di sumbu tegak, terbagi menjadi wilayah-wilayah tempat masing-masing fasa stabil. Garis-garis antarwilayah adalah kondisi saat dua fasa dapat hidup berdampingan, misalnya kurva didih tempat cairan dan uap setimbang. Melintasi garis berarti perubahan fasa: meleleh atau membeku melintasi garis padat–cair, mendidih atau mengembun melintasi garis cair–gas, serta menyublim atau mengkristal dari uap melintasi garis padat–gas.',
        'Ada dua titik istimewa. Pada titik tripel ketiga garis bertemu dan es, air cair, serta uap air hadir bersamaan; untuk air titik ini pada 0,01 °C dan 0,006 atm. Kurva didih berakhir di titik kritis (374 °C, 218 atm untuk air). Di luarnya tidak ada lagi pendidihan: cairan dan gas menjadi identik dan zat itu berupa satu fluida superkritis, rapat seperti cairan tetapi memenuhi wadah seperti gas. Air juga tidak biasa karena garis lelehnya sedikit condong ke kiri, sehingga pada tekanan lebih tinggi es meleleh pada suhu sedikit lebih rendah. Ini karena es kurang rapat daripada air cair, dan penekanan menguntungkan fasa yang lebih rapat.',
        'Seret penanda ke mana pun pada diagram, dan panel akan menyebut fasanya serta menyketsakan susunan partikelnya: kisi teratur untuk padat, tumpukan rapat tak beraturan untuk cair, sebaran jarang untuk gas. Sumbu tekanan bersifat logaritmik agar 0,001 atm dan 1000 atm muat di satu layar; setiap garis kisi berarti kelipatan sepuluh. Tombol preset membawamu ke kondisi sehari-hari dan kondisi ekstrem. Bergerak mendatar pada 1 atm dari kiri ke kanan membawa dari es melewati air cair sampai uap; bergerak tegak pada suhu tetap menunjukkan bahwa menurunkan tekanan membuat air mendidih pada suhu lebih rendah, itulah sebabnya memasak lebih lambat di gunung dan lebih cepat di panci presto.',
        'Diagram ini bersifat skematik. Kurva-kurva batasnya digambar dari rumus sederhana yang dipilih agar bentuknya benar dan melewati titik tripel serta titik kritis, bukan dari data tekanan uap hasil pengukuran, sehingga posisi persis kurva didih terhadap garis kisi tidak dapat diandalkan: untuk angka yang akurat, misalnya titik didih pada tekanan tertentu, gunakan tabel uap. Pakailah simulasi untuk gambaran kualitatifnya: wilayah mana yang bersentuhan, letak titik tripel dan titik kritis, arah garis leleh, dan apa yang terjadi saat melintasi tiap batas. Simulasi juga mengabaikan banyak bentuk es bertekanan tinggi dan keadaan metastabil seperti air lewat dingin.',
      ],
    },
    figure: {
      caption: {
        en: 'Schematic phase diagram of water (pressure on a log scale). The three boundary lines meet at the triple point; the boiling curve ends at the critical point, beyond which the fluid is supercritical. Water\'s melting line leans left: higher pressure lowers the melting point. The dashed path at 1 atm goes ice → water → steam.',
        id: 'Diagram fasa skematik air (tekanan pada skala log). Ketiga garis batas bertemu di titik tripel; kurva didih berakhir di titik kritis, dan di luarnya fluida bersifat superkritis. Garis leleh air condong ke kiri: tekanan lebih tinggi menurunkan titik leleh. Lintasan putus-putus pada 1 atm berjalan es → air → uap.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Phase diagram of water', 'Diagram fasa air')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.c{fill:none;stroke:currentColor;stroke-width:2}.ttl{font-weight:bold}</style>
  <path d="M50 205 Q100 190 130 150 L115 30 L50 30 Z" fill="#3b82f6" opacity=".13"/>
  <path d="M130 150 L115 30 L260 30 L260 70 Q200 140 130 150 Z" fill="#10b981" opacity=".13"/>
  <path d="M50 205 Q100 190 130 150 Q200 140 260 70 L340 70 L340 205 Z" fill="#f59e0b" opacity=".13"/>
  <rect x="260" y="30" width="80" height="40" fill="#8b5cf6" opacity=".18"/>
  <path d="M50 205 Q100 190 130 150" class="c"/>
  <path d="M130 150 Q200 140 260 70" class="c"/>
  <line x1="130" y1="150" x2="115" y2="30" class="c"/>
  <line x1="260" y1="70" x2="260" y2="30" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>
  <line x1="260" y1="70" x2="340" y2="70" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>
  <text x="72" y="100" fill="#3b82f6" class="ttl">${L('SOLID', 'PADAT')}</text>
  <text x="160" y="80" fill="#10b981" class="ttl">${L('LIQUID', 'CAIR')}</text>
  <text x="235" y="185" fill="#f59e0b" class="ttl">${L('GAS', 'GAS')}</text>
  <text x="300" y="52" fill="#8b5cf6" text-anchor="middle">${L('supercritical', 'superkritis')}</text>
  <circle cx="130" cy="150" r="4.5" fill="#ef4444"/>
  <text x="136" y="166" fill="#ef4444">${L('triple point', 'titik tripel')}</text>
  <text x="136" y="178" fill="#ef4444">0.01 °C, 0.006 atm</text>
  <circle cx="260" cy="70" r="4.5" fill="#8b5cf6"/>
  <text x="266" y="88" fill="#8b5cf6">${L('critical point', 'titik kritis')}</text>
  <text x="266" y="100" fill="#8b5cf6">374 °C, 218 atm</text>
  <line x1="60" y1="120" x2="330" y2="120" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="5 3" marker-end="url(#ar)"/>
  <text x="56" y="116" fill="#ef4444">1 atm</text>
  <text x="104" y="134" fill="#ef4444">${L('melt 0 °C', 'leleh 0 °C')}</text>
  <text x="194" y="116" fill="#ef4444">${L('boil 100 °C', 'didih 100 °C')}</text>
  <text x="62" y="48" opacity=".75">${L('melting line leans left', 'garis leleh condong ke kiri')}</text>
  <line x1="50" y1="20" x2="50" y2="205" class="ax"/>
  <line x1="50" y1="205" x2="340" y2="205" class="ax"/>
  <text x="18" y="112" transform="rotate(-90 18 112)" text-anchor="middle">${L('pressure (log)', 'tekanan (log)')}</text>
  <text x="195" y="222" text-anchor="middle">${L('temperature', 'suhu')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A phase diagram maps which phase is stable at each pressure and temperature; the lines mark where two phases coexist and a phase change happens.',
        'At the triple point (0.01 °C, 0.006 atm for water) solid, liquid and gas coexist.',
        'The boiling point rises with pressure along the liquid–gas curve, which ends at the critical point (374 °C, 218 atm); beyond it liquid and gas are indistinguishable.',
        'Water\'s melting line has a negative slope because ice is less dense than liquid water, so pressure melts ice.',
        'Below the triple-point pressure, ice turns directly into vapour (sublimation) without melting.',
      ],
      id: [
        'Diagram fasa memetakan fasa mana yang stabil pada tiap tekanan dan suhu; garis-garisnya menandai tempat dua fasa berdampingan dan perubahan fasa terjadi.',
        'Pada titik tripel (0,01 °C, 0,006 atm untuk air) padat, cair, dan gas hadir bersamaan.',
        'Titik didih naik seiring tekanan sepanjang kurva cair–gas, yang berakhir di titik kritis (374 °C, 218 atm); di luarnya cairan dan gas tidak dapat dibedakan.',
        'Garis leleh air berkemiringan negatif karena es kurang rapat daripada air cair, sehingga tekanan melelehkan es.',
        'Di bawah tekanan titik tripel, es langsung berubah menjadi uap (menyublim) tanpa meleleh.',
      ],
    },
    vocabulary: {
      en: [
        ['Phase', 'A physically distinct, uniform form of matter: solid, liquid, gas or supercritical fluid.'],
        ['Phase boundary', 'A line on the diagram along which two phases are in equilibrium; crossing it is a phase change.'],
        ['Triple point', 'The single pressure and temperature at which solid, liquid and gas coexist.'],
        ['Critical point', 'The end of the liquid–gas curve; above its temperature and pressure the two phases merge.'],
        ['Supercritical fluid', 'The state beyond the critical point, with liquid-like density but gas-like flow and no surface.'],
        ['Sublimation', 'A solid turning directly into gas, which happens below the triple-point pressure.'],
        ['Vapour pressure', 'The pressure of vapour in equilibrium with its liquid (or solid) at a given temperature; boiling occurs when it equals the outside pressure.'],
        ['Normal boiling point', 'The temperature at which the vapour pressure equals 1 atm: 100 °C for water.'],
      ],
      id: [
        ['Fasa', 'Wujud materi yang seragam dan berbeda secara fisik: padat, cair, gas, atau fluida superkritis.'],
        ['Batas fasa', 'Garis pada diagram tempat dua fasa berada dalam kesetimbangan; melintasinya berarti perubahan fasa.'],
        ['Titik tripel', 'Satu-satunya pasangan tekanan dan suhu tempat padat, cair, dan gas hadir bersamaan.'],
        ['Titik kritis', 'Ujung kurva cair–gas; di atas suhu dan tekanannya kedua fasa menyatu.'],
        ['Fluida superkritis', 'Keadaan di luar titik kritis, dengan kerapatan seperti cairan tetapi mengalir seperti gas dan tanpa permukaan.'],
        ['Sublimasi', 'Padatan yang langsung berubah menjadi gas, terjadi di bawah tekanan titik tripel.'],
        ['Tekanan uap', 'Tekanan uap yang setimbang dengan cairannya (atau padatannya) pada suhu tertentu; pendidihan terjadi saat tekanan uap sama dengan tekanan luar.'],
        ['Titik didih normal', 'Suhu saat tekanan uap sama dengan 1 atm: 100 °C untuk air.'],
      ],
    },
    misconceptions: {
      en: [
        ['Water always boils at 100 °C.', 'Only at 1 atm. On a high mountain, where the pressure is about a third of an atmosphere, water boils near 70 °C; in a pressure cooker at about 2 atm it boils near 120 °C. Drag the marker vertically to see the boundary move.'],
        ['A solid has to melt before it can become a gas.', 'Below the triple-point pressure there is no liquid region at all, so ice passes straight to vapour. Freeze-drying and the shrinking of snow on a cold, dry day both use sublimation.'],
        ['Squeezing something always makes it solidify.', 'For most substances yes, but water\'s melting line leans left, so squeezing ice near 0 °C melts it. The effect is small, about 1 °C for every 130 atm, which is why pressure alone cannot explain how ice skates glide; friction does most of the work.'],
        ['Any gas can be liquefied if you compress it enough.', 'Not above its critical temperature. Steam at 400 °C stays a supercritical fluid no matter how hard it is compressed; it must be cooled below 374 °C before a liquid can form.'],
      ],
      id: [
        ['Air selalu mendidih pada 100 °C.', 'Hanya pada 1 atm. Di gunung tinggi, dengan tekanan sekitar sepertiga atmosfer, air mendidih di dekat 70 °C; di panci presto sekitar 2 atm air mendidih di dekat 120 °C. Seret penanda secara tegak untuk melihat batasnya bergeser.'],
        ['Padatan harus meleleh dulu sebelum menjadi gas.', 'Di bawah tekanan titik tripel tidak ada wilayah cair sama sekali, sehingga es langsung menjadi uap. Pengeringan beku dan menyusutnya salju pada hari dingin yang kering sama-sama memakai sublimasi.'],
        ['Menekan sesuatu selalu membuatnya memadat.', 'Untuk kebanyakan zat ya, tetapi garis leleh air condong ke kiri, sehingga menekan es di dekat 0 °C justru melelehkannya. Efeknya kecil, sekitar 1 °C untuk setiap 130 atm, sehingga tekanan saja tidak dapat menjelaskan mengapa sepatu es meluncur; gesekanlah yang paling berperan.'],
        ['Gas apa pun dapat dicairkan asal ditekan cukup kuat.', 'Tidak di atas suhu kritisnya. Uap pada 400 °C tetap berupa fluida superkritis seberapa pun kuat ditekan; ia harus didinginkan di bawah 374 °C sebelum cairan dapat terbentuk.'],
      ],
    },
    realWorld: {
      en: [
        'A pressure cooker raises the pressure to roughly 2 atm so water boils near 120 °C and food cooks in a fraction of the time.',
        'Recipes need longer cooking times at high altitude because the lower air pressure lowers the boiling point of water.',
        'Freeze-dried food and instant coffee are made by freezing the product and then lowering the pressure below the triple point so the ice sublimes away.',
        'Supercritical carbon dioxide is used to decaffeinate coffee and extract flavours: it dissolves like a liquid but is removed completely just by releasing the pressure.',
      ],
      id: [
        'Panci presto menaikkan tekanan menjadi kira-kira 2 atm sehingga air mendidih di dekat 120 °C dan makanan matang dalam waktu jauh lebih singkat.',
        'Resep memerlukan waktu masak lebih lama di dataran tinggi karena tekanan udara yang lebih rendah menurunkan titik didih air.',
        'Makanan kering beku dan kopi instan dibuat dengan membekukan produk lalu menurunkan tekanan di bawah titik tripel sehingga esnya menyublim.',
        'Karbon dioksida superkritis dipakai untuk menghilangkan kafein kopi dan mengekstrak cita rasa: ia melarutkan seperti cairan tetapi hilang sepenuhnya hanya dengan melepaskan tekanan.',
      ],
    },
    questions: {
      en: [
        { q: 'Ice is held at −10 °C and the pressure is slowly lowered from 1 atm to 0.001 atm. Describe what happens and name the process.', a: 'The marker moves straight down through the solid region until it crosses the solid–gas line, which lies below the triple-point pressure of 0.006 atm. The ice turns directly into vapour without ever becoming liquid: sublimation. This is exactly how freeze-drying works.' },
        { q: 'Water is at 400 °C and 300 atm. Is it a liquid or a gas? Explain using the critical point.', a: 'Neither. Both values are above the critical point (374 °C, 218 atm), so the sample is a supercritical fluid. There is no boundary to cross between liquid and gas in that region, and the sample has no meniscus or surface.' },
        { q: 'Why does the melting line of water lean to the left, and what would it look like for a substance whose solid is denser than its liquid?', a: 'Compressing a system favours the phase that takes up less volume. Liquid water is denser than ice, so higher pressure favours the liquid and the melting temperature falls: the line leans left. For most substances the solid is the denser phase, so pressure favours the solid, the melting point rises, and the line leans right.' },
      ],
      id: [
        { q: 'Es dijaga pada −10 °C dan tekanannya diturunkan perlahan dari 1 atm ke 0,001 atm. Jelaskan apa yang terjadi dan sebutkan nama prosesnya.', a: 'Penanda bergerak lurus ke bawah melewati wilayah padat sampai melintasi garis padat–gas, yang berada di bawah tekanan titik tripel 0,006 atm. Es langsung berubah menjadi uap tanpa pernah menjadi cair: sublimasi. Inilah cara kerja pengeringan beku.' },
        { q: 'Air berada pada 400 °C dan 300 atm. Apakah ia cairan atau gas? Jelaskan dengan titik kritis.', a: 'Bukan keduanya. Kedua nilai berada di atas titik kritis (374 °C, 218 atm), sehingga sampel berupa fluida superkritis. Tidak ada batas antara cair dan gas yang dapat dilintasi di wilayah itu, dan sampel tidak memiliki meniskus atau permukaan.' },
        { q: 'Mengapa garis leleh air condong ke kiri, dan bagaimana bentuknya untuk zat yang padatannya lebih rapat daripada cairannya?', a: 'Menekan suatu sistem menguntungkan fasa yang volumenya lebih kecil. Air cair lebih rapat daripada es, sehingga tekanan lebih tinggi menguntungkan cairan dan suhu leleh turun: garis condong ke kiri. Untuk kebanyakan zat padatan adalah fasa yang lebih rapat, sehingga tekanan menguntungkan padatan, titik leleh naik, dan garisnya condong ke kanan.' },
      ],
    },
  },
};
