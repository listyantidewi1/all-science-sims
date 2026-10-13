// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish three boundary types from their cross-section.',
      'Predict where new crust forms and where it is destroyed.',
      'Connect boundary type to surface features (mountains, ridges, faults).',
    ],
    id: [
      'Membedakan tiga jenis batas lempeng dari penampangnya.',
      'Memprediksi tempat kerak baru terbentuk dan tempat yang hancur.',
      'Mengaitkan jenis batas dengan bentuk permukaan (gunung, punggungan, sesar).',
    ],
  },
  tryThis: {
    en: [
      'In the convergent case, where does the magma rise?',
      'How many earthquakes happen near a transform boundary versus divergent?',
      'Adjust the plate speed and observe how that changes feature growth.',
    ],
    id: [
      'Pada kasus konvergen, di mana magma muncul?',
      'Lebih banyak gempa terjadi di batas transform atau divergen?',
      'Atur kecepatan lempeng dan amati pengaruhnya pada pembentukan fitur.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Earth\'s outer shell, the lithosphere, is broken into about a dozen large plates and many smaller ones. They float on the hot, slowly flowing mantle beneath and move a few centimetres per year, about as fast as your fingernails grow. Almost all earthquakes, volcanoes and mountain ranges occur along the boundaries where plates meet, and what happens there depends on how the plates move relative to each other: toward each other, apart, or sideways past one another.',
        'The simulation shows a cross-section of one boundary at a time. In the convergent case a dense oceanic plate on the left meets a lighter continental plate; the oceanic plate bends and sinks into the mantle (subduction), the continental edge crumples and rises into mountains, and earthquakes appear along the sinking slab. In the divergent case two plates pull apart; the gap widens and hot magma rises to fill it, cooling into new crust, which is how mid-ocean ridges work. In the transform case two plates slide past each other with no gap and no collision, so no crust is created or destroyed, but the plates stick and jerk, producing frequent shallow earthquakes along the fault.',
        'The plate speed slider scales how fast the picture evolves: the mountain grows and the rift widens faster, and the transform plates slide faster. The red rings are earthquakes; their rate in the sim (most frequent at the transform fault, least frequent at the ridge) is set by hand to illustrate the contrast, not computed from physics. The faint red blobs in the mantle hint at convection, the slow circulation of hot rock that, together with the weight of sinking slabs, drives plate motion.',
        'The sim compresses millions of years into seconds and is a cartoon in several ways. Real subduction zones also produce a chain of volcanoes above the sinking plate, because water released from the slab lowers the melting point of the mantle above it; the sim shows the mountains but not the volcanic arc. It shows only ocean-continent convergence, not two oceanic plates (which makes island arcs such as Indonesia\'s) or two continental plates (which makes the Himalaya). It also does not show that convergent boundaries host the largest and deepest earthquakes on Earth, down to about 700 km, because the slab stays cold and brittle as it sinks.',
      ],
      id: [
        'Kulit terluar Bumi, litosfer, terpecah menjadi sekitar selusin lempeng besar dan banyak lempeng kecil. Lempeng-lempeng ini mengapung di atas mantel yang panas dan mengalir perlahan di bawahnya, bergerak beberapa sentimeter per tahun, kira-kira secepat kuku jarimu tumbuh. Hampir semua gempa, gunung api, dan pegunungan terjadi di sepanjang batas tempat lempeng bertemu, dan yang terjadi di sana bergantung pada gerak relatif lempengnya: saling mendekat, saling menjauh, atau bergeser menyamping satu sama lain.',
        'Simulasi menampilkan penampang satu jenis batas pada satu waktu. Pada kasus konvergen, lempeng samudra yang rapat di sebelah kiri bertemu lempeng benua yang lebih ringan; lempeng samudra melengkung dan tenggelam ke mantel (subduksi), tepi benua terlipat dan terangkat menjadi pegunungan, dan gempa muncul di sepanjang lempeng yang tenggelam. Pada kasus divergen dua lempeng saling menjauh; celahnya melebar dan magma panas naik mengisinya, lalu mendingin menjadi kerak baru, begitulah cara kerja punggungan tengah samudra. Pada kasus transform dua lempeng bergeser melewati satu sama lain tanpa celah dan tanpa tumbukan, sehingga tidak ada kerak yang tercipta atau hancur, tetapi lempengnya tersangkut lalu terlepas mendadak, menghasilkan gempa dangkal yang sering di sepanjang sesar.',
        'Slider kecepatan lempeng mengatur seberapa cepat gambar berubah: gunung tumbuh dan celah melebar lebih cepat, dan lempeng transform bergeser lebih cepat. Lingkaran merah adalah gempa; frekuensinya di simulasi (paling sering di sesar transform, paling jarang di punggungan) diatur secara manual untuk menunjukkan perbedaannya, bukan dihitung dari fisika. Bulatan merah samar di mantel melambangkan konveksi, peredaran lambat batuan panas yang, bersama berat lempeng yang tenggelam, menggerakkan lempeng.',
        'Simulasi memadatkan jutaan tahun menjadi beberapa detik dan merupakan kartun dalam beberapa hal. Zona subduksi sungguhan juga menghasilkan rangkaian gunung api di atas lempeng yang tenggelam, karena air yang dilepaskan lempeng menurunkan titik leleh mantel di atasnya; simulasi menampilkan pegunungannya tetapi tidak busur vulkaniknya. Yang ditampilkan hanya konvergen samudra-benua, bukan dua lempeng samudra (yang membentuk busur kepulauan seperti Indonesia) atau dua lempeng benua (yang membentuk Himalaya). Simulasi juga tidak menunjukkan bahwa batas konvergen menjadi tempat gempa terbesar dan terdalam di Bumi, sampai sekitar 700 km, karena lempeng tetap dingin dan rapuh saat tenggelam.',
      ],
    },
    figure: {
      caption: {
        en: 'At a mid-ocean ridge hot mantle rises and the plates spread, making new crust. Where the dense oceanic plate meets a continent it sinks; earthquakes (red dots) mark the sinking slab, and water released from it melts the mantle above, feeding volcanoes. Transform boundaries, not shown, slide sideways and neither make nor destroy crust.',
        id: 'Di punggungan tengah samudra, mantel panas naik dan lempeng menyebar, membentuk kerak baru. Saat lempeng samudra yang rapat bertemu benua, ia tenggelam; gempa (titik merah) menandai lempeng yang tenggelam, dan air yang dilepaskannya melelehkan mantel di atasnya sehingga memberi makan gunung api. Batas transform, yang tidak digambar, bergeser menyamping dan tidak membentuk maupun menghancurkan kerak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Cross-section from a mid-ocean ridge to a subduction zone', 'Penampang dari punggungan tengah samudra ke zona subduksi')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10.5px}.ar{stroke-width:2.2;fill:none}</style>
  <rect x="0" y="100" width="360" height="140" fill="#f59e0b" opacity=".18"/>
  <rect x="0" y="82" width="232" height="18" fill="#3b82f6" opacity=".35"/>
  <polygon points="0,100 54,100 54,118 0,118" fill="currentColor" opacity=".45"/>
  <polygon points="66,100 232,100 312,200 298,210 220,118 66,118" fill="currentColor" opacity=".45"/>
  <polygon points="54,100 66,100 60,150" fill="#ef4444" opacity=".85"/>
  <polygon points="232,100 232,70 262,55 282,30 302,55 340,66 360,70 360,132 318,132 232,100" fill="currentColor" opacity=".3"/>
  <polygon points="276,38 282,30 288,38" fill="#ef4444"/>
  <line x1="276" y1="160" x2="282" y2="40" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3"/>
  <circle cx="240" cy="112" r="3.2" fill="#ef4444"/>
  <circle cx="256" cy="132" r="3.2" fill="#ef4444"/>
  <circle cx="272" cy="152" r="3.2" fill="#ef4444"/>
  <circle cx="290" cy="178" r="3.2" fill="#ef4444"/>
  <line x1="48" y1="74" x2="18" y2="74" class="ar" stroke="#10b981" marker-end="url(#a)"/>
  <line x1="72" y1="74" x2="102" y2="74" class="ar" stroke="#10b981" marker-end="url(#a)"/>
  <line x1="170" y1="74" x2="205" y2="74" class="ar" stroke="#10b981" marker-end="url(#a)"/>
  <line x1="352" y1="46" x2="322" y2="46" class="ar" stroke="#10b981" marker-end="url(#a)"/>
  <path d="M60 165 C 60 225, 190 228, 228 172" class="ar" stroke="#f59e0b" marker-end="url(#a)"/>
  <line x1="60" y1="200" x2="60" y2="158" class="ar" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="6" y="62" class="s">${L('mid-ocean ridge: new crust', 'punggungan tengah samudra: kerak baru')}</text>
  <line x1="60" y1="66" x2="60" y2="96" class="m"/>
  <text x="112" y="134" class="s">${L('oceanic plate', 'lempeng samudra')}</text>
  <text x="232" y="20" class="s">${L('volcano', 'gunung api')}</text>
  <line x1="262" y1="22" x2="278" y2="34" class="m"/>
  <text x="296" y="90" class="s">${L('mountains', 'pegunungan')}</text>
  <text x="300" y="124" class="s">${L('continental plate', 'lempeng benua')}</text>
  <text x="300" y="166" class="s" fill="#ef4444">${L('earthquakes', 'gempa')}</text>
  <text x="300" y="214" class="s">${L('subduction', 'subduksi')}</text>
  <text x="112" y="208" class="s" fill="#f59e0b">${L('mantle convection', 'konveksi mantel')}</text>
  <text x="6" y="234" class="s" opacity=".7">${L('not to scale; green = plate motion', 'tidak sesuai skala; hijau = gerak lempeng')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Plates move a few centimetres per year, driven by mantle convection and the pull of sinking slabs.',
        'Divergent boundaries create new crust from rising magma; convergent boundaries destroy crust by subduction; transform boundaries do neither.',
        'The denser oceanic plate always sinks beneath a continental plate, forming a trench, mountains and volcanoes.',
        'Earthquakes occur at all three boundary types, but the largest and deepest happen at subduction zones.',
        'Over millions of years these slow motions open oceans, raise mountain ranges and rearrange the continents.',
      ],
      id: [
        'Lempeng bergerak beberapa sentimeter per tahun, digerakkan oleh konveksi mantel dan tarikan lempeng yang tenggelam.',
        'Batas divergen membentuk kerak baru dari magma yang naik; batas konvergen menghancurkan kerak lewat subduksi; batas transform tidak melakukan keduanya.',
        'Lempeng samudra yang lebih rapat selalu tenggelam di bawah lempeng benua, membentuk palung, pegunungan, dan gunung api.',
        'Gempa terjadi di ketiga jenis batas, tetapi yang terbesar dan terdalam terjadi di zona subduksi.',
        'Selama jutaan tahun gerakan lambat ini membuka samudra, mengangkat pegunungan, dan menata ulang benua.',
      ],
    },
    vocabulary: {
      en: [
        ['Lithosphere', 'The rigid outer layer of Earth, made of the crust and the uppermost mantle, which is broken into plates.'],
        ['Convergent boundary', 'A boundary where plates move toward each other; one may sink beneath the other or both may crumple into mountains.'],
        ['Divergent boundary', 'A boundary where plates move apart and magma rises to form new crust, as at a mid-ocean ridge.'],
        ['Transform boundary', 'A boundary where plates slide horizontally past each other, such as the San Andreas Fault.'],
        ['Subduction', 'The sinking of a dense oceanic plate into the mantle beneath another plate.'],
        ['Trench', 'The deep, narrow depression in the sea floor where a plate bends down to subduct.'],
        ['Mantle convection', 'The slow circulation of hot rock in the mantle, rising where it is hot and sinking where it is cool.'],
        ['Fault', 'A fracture in rock along which the two sides have moved; sudden slip on a fault is an earthquake.'],
      ],
      id: [
        ['Litosfer', 'Lapisan luar Bumi yang kaku, terdiri dari kerak dan bagian teratas mantel, yang terpecah menjadi lempeng-lempeng.'],
        ['Batas konvergen', 'Batas tempat lempeng saling mendekat; satu lempeng bisa tenggelam di bawah yang lain atau keduanya terlipat menjadi pegunungan.'],
        ['Batas divergen', 'Batas tempat lempeng saling menjauh dan magma naik membentuk kerak baru, seperti di punggungan tengah samudra.'],
        ['Batas transform', 'Batas tempat lempeng bergeser mendatar melewati satu sama lain, seperti Sesar San Andreas.'],
        ['Subduksi', 'Tenggelamnya lempeng samudra yang rapat ke dalam mantel di bawah lempeng lain.'],
        ['Palung', 'Lekukan dasar laut yang dalam dan sempit tempat lempeng melengkung ke bawah untuk bersubduksi.'],
        ['Konveksi mantel', 'Peredaran lambat batuan panas di mantel, naik di tempat yang panas dan turun di tempat yang dingin.'],
        ['Sesar', 'Retakan pada batuan yang kedua sisinya telah bergeser; pergeseran mendadak pada sesar adalah gempa.'],
      ],
    },
    misconceptions: {
      en: [
        ['The plates float on a sea of liquid magma.', 'The mantle is solid rock. It is hot enough to flow very slowly, like thick toffee, over millions of years, but it is not molten. Magma forms only in particular places, such as beneath ridges and above subducting slabs.'],
        ['Continents move; the ocean floor stays put.', 'Plates carry both continents and ocean floor, and the ocean floor is the part that is constantly made at ridges and destroyed at trenches. That is why no ocean crust is older than about 200 million years while continents hold rocks 4 billion years old.'],
        ['Mountains form only where plates collide.', 'Most high ranges do form at convergent boundaries, but volcanoes build mountains too, including above subduction zones and at hot spots far from any boundary, such as Hawaii.'],
        ['Earthquakes happen only at convergent boundaries.', 'All three boundary types produce earthquakes. Transform faults produce frequent shallow quakes and ridges produce small ones; subduction zones produce the biggest and deepest.'],
      ],
      id: [
        ['Lempeng mengapung di atas lautan magma cair.', 'Mantel adalah batuan padat. Suhunya cukup panas untuk mengalir sangat perlahan, seperti karamel kental, selama jutaan tahun, tetapi tidak meleleh. Magma hanya terbentuk di tempat tertentu, misalnya di bawah punggungan dan di atas lempeng yang bersubduksi.'],
        ['Benua yang bergerak; dasar laut tetap diam.', 'Lempeng membawa benua sekaligus dasar laut, dan dasar lautlah yang terus dibentuk di punggungan dan dihancurkan di palung. Itulah sebabnya tidak ada kerak samudra yang lebih tua dari sekitar 200 juta tahun, sementara benua menyimpan batuan berumur 4 miliar tahun.'],
        ['Pegunungan hanya terbentuk di tempat lempeng bertumbukan.', 'Sebagian besar pegunungan tinggi memang terbentuk di batas konvergen, tetapi gunung api juga membangun gunung, termasuk di atas zona subduksi dan di titik panas yang jauh dari batas lempeng, seperti Hawaii.'],
        ['Gempa hanya terjadi di batas konvergen.', 'Ketiga jenis batas menghasilkan gempa. Sesar transform menghasilkan gempa dangkal yang sering dan punggungan menghasilkan gempa kecil; zona subduksi menghasilkan gempa terbesar dan terdalam.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesia sits where the Indo-Australian plate subducts beneath the Eurasian plate, which is why it has about 130 active volcanoes and why the magnitude 9.1 earthquake of 2004 off Sumatra triggered a devastating tsunami.',
        'The Mid-Atlantic Ridge runs the length of the Atlantic, which widens by about 2.5 cm per year; Iceland sits right on the ridge and is slowly being pulled apart.',
        'The San Andreas Fault in California is a transform boundary where the Pacific plate slides north past the North American plate at about 3.5 cm per year.',
        'The Himalaya and Mount Everest are still rising a few millimetres per year as India continues to push into Asia, a continent-continent collision that began about 50 million years ago.',
      ],
      id: [
        'Indonesia berada di tempat lempeng Indo-Australia bersubduksi di bawah lempeng Eurasia, itulah sebabnya Indonesia memiliki sekitar 130 gunung api aktif dan mengapa gempa magnitudo 9,1 tahun 2004 di lepas pantai Sumatra memicu tsunami yang menghancurkan.',
        'Punggungan Tengah Atlantik membentang sepanjang Samudra Atlantik, yang melebar sekitar 2,5 cm per tahun; Islandia tepat berada di atas punggungan itu dan perlahan tertarik terbelah.',
        'Sesar San Andreas di California adalah batas transform tempat lempeng Pasifik bergeser ke utara melewati lempeng Amerika Utara sekitar 3,5 cm per tahun.',
        'Himalaya dan Gunung Everest masih naik beberapa milimeter per tahun karena India terus mendesak Asia, tumbukan benua-benua yang mulai sekitar 50 juta tahun lalu.',
      ],
    },
    questions: {
      en: [
        { q: 'The Atlantic Ocean widens by about 2.5 cm each year. How much wider will it be in one million years, in kilometres?', a: '2.5 cm × 1,000,000 = 2,500,000 cm = 25 km. Over the roughly 180 million years since it began to open, that rate gives several thousand kilometres, which matches the ocean\'s width today.' },
        { q: 'In the convergent case, why does the oceanic plate sink beneath the continental plate and not the other way round?', a: 'Oceanic lithosphere is made of denser rock (basalt and cooled mantle) and is thinner and colder than continental lithosphere, which is thick and made of lighter rock such as granite. The denser plate sinks; the lighter one stays afloat and gets pushed up into mountains.' },
        { q: 'Which boundary type can have both volcanoes and very deep earthquakes, and why does neither occur at a transform boundary?', a: 'A convergent (subduction) boundary. The sinking slab stays cold and brittle, so it can break and cause earthquakes down to about 700 km, and water released from it melts the mantle above, feeding volcanoes. At a transform boundary the plates only slide sideways: nothing sinks deep and no magma is produced, so earthquakes are shallow and there are no volcanoes.' },
      ],
      id: [
        { q: 'Samudra Atlantik melebar sekitar 2,5 cm setiap tahun. Berapa kilometer lebih lebar samudra itu dalam satu juta tahun?', a: '2,5 cm × 1.000.000 = 2.500.000 cm = 25 km. Selama kira-kira 180 juta tahun sejak mulai terbuka, laju itu menghasilkan beberapa ribu kilometer, yang cocok dengan lebar samudra saat ini.' },
        { q: 'Pada kasus konvergen, mengapa lempeng samudra yang tenggelam di bawah lempeng benua dan bukan sebaliknya?', a: 'Litosfer samudra tersusun dari batuan yang lebih rapat (basal dan mantel yang mendingin) serta lebih tipis dan lebih dingin daripada litosfer benua, yang tebal dan terbuat dari batuan lebih ringan seperti granit. Lempeng yang lebih rapat tenggelam; yang lebih ringan tetap mengapung dan terdorong ke atas menjadi pegunungan.' },
        { q: 'Jenis batas mana yang bisa memiliki gunung api sekaligus gempa sangat dalam, dan mengapa keduanya tidak terjadi di batas transform?', a: 'Batas konvergen (subduksi). Lempeng yang tenggelam tetap dingin dan rapuh sehingga bisa patah dan menyebabkan gempa sampai kedalaman sekitar 700 km, dan air yang dilepaskannya melelehkan mantel di atasnya sehingga memberi makan gunung api. Di batas transform lempeng hanya bergeser menyamping: tidak ada yang tenggelam dalam dan tidak ada magma yang terbentuk, sehingga gempanya dangkal dan tidak ada gunung api.' },
      ],
    },
  },
};
