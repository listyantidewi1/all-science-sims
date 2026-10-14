// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the three rock families and the processes that connect them.',
      'See that no rock type is "permanent" — all transform given enough time.',
      'Understand that one rock can take many paths through the cycle.',
    ],
    id: [
      'Mengidentifikasi tiga keluarga batuan dan proses yang menghubungkannya.',
      'Melihat bahwa tidak ada jenis batuan yang "permanen" — semuanya berubah seiring waktu.',
      'Memahami bahwa satu batu dapat menempuh banyak jalan melintasi siklus.',
    ],
  },
  tryThis: {
    en: [
      'Crank weathering — sedimentary pile grows.',
      'Crank metamorphism — sedimentary turns metamorphic.',
      'Crank melting — every rock returns to magma.',
    ],
    id: [
      'Naikkan pelapukan — tumpukan sedimen tumbuh.',
      'Naikkan metamorfisme — sedimen berubah menjadi metamorf.',
      'Naikkan peleburan — setiap batu kembali menjadi magma.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Rocks look permanent, but over millions of years they change from one kind into another. Deep underground, rock is so hot that it melts into magma. When magma cools it hardens into igneous rock: slowly underground to make coarse-grained granite, or quickly at the surface as lava to make fine-grained basalt. At the surface, rain, ice, wind and plant roots break any rock into small pieces called sediment. Rivers and wind carry the sediment to lakes and seas, where it settles in layers; as the layers pile up they are squeezed and cemented into sedimentary rock such as sandstone, shale and limestone. This hardening step is called lithification. When rock is buried deep and heated and squeezed without melting, its minerals rearrange into metamorphic rock: limestone becomes marble, shale becomes slate. And if it gets hot enough, any rock melts back into magma and the loop begins again.',
        'The sim follows 80 particles, each standing for a bit of mineral, through five stages: magma, igneous rock, loose sediment, sedimentary rock and metamorphic rock. Every second, each particle has a chance of jumping along one of the arrows leaving its stage; the sliders set those chances. Raise the weathering rate and more rock becomes sediment, so the sediment and sedimentary counts grow; raise melting and particles drain back into magma. The speed slider runs everything faster. Notice that igneous, sedimentary and metamorphic rock can each be weathered, metamorphosed or melted, so a particle can take many different routes and there is no fixed order.',
        'The numbers are made up for the purpose of the animation, not measured. Real rock-cycle changes take thousands to millions of years, and how fast they happen depends on climate, depth and plate movements that the sim does not model. The sim also skips the steps of uplift, transport and burial that happen between the stages, treats every particle as identical, and does not tell apart the many rocks inside each family. It is a map of the possible paths, not a clock.',
      ],
      id: [
        'Batu tampak kekal, tetapi selama jutaan tahun batu berubah dari satu jenis ke jenis lain. Jauh di bawah tanah, batuan begitu panas sehingga melebur menjadi magma. Saat magma mendingin, ia mengeras menjadi batuan beku: perlahan di bawah tanah menjadi granit berbutir kasar, atau cepat di permukaan sebagai lava menjadi basal berbutir halus. Di permukaan, hujan, es, angin, dan akar tumbuhan memecah batuan apa pun menjadi butiran kecil yang disebut sedimen. Sungai dan angin membawa sedimen ke danau dan laut, tempat ia mengendap berlapis-lapis; ketika lapisan menumpuk, ia tertekan dan tersemen menjadi batuan sedimen seperti batu pasir, serpih, dan batu gamping. Langkah pengerasan ini disebut litifikasi. Ketika batuan terkubur dalam, lalu dipanaskan dan ditekan tanpa melebur, mineralnya tersusun ulang menjadi batuan metamorf: batu gamping menjadi marmer, serpih menjadi sabak. Dan jika cukup panas, batuan apa pun melebur kembali menjadi magma dan putaran dimulai lagi.',
        'Simulasi mengikuti 80 partikel, masing-masing mewakili sedikit mineral, melalui lima tahap: magma, batuan beku, sedimen lepas, batuan sedimen, dan batuan metamorf. Setiap detik, tiap partikel punya peluang melompat lewat salah satu panah yang keluar dari tahapnya; slider mengatur peluang itu. Naikkan laju pelapukan, maka lebih banyak batuan menjadi sedimen sehingga jumlah sedimen dan batuan sedimen bertambah; naikkan peleburan, maka partikel mengalir balik ke magma. Slider kecepatan menjalankan semuanya lebih cepat. Perhatikan bahwa batuan beku, sedimen, dan metamorf masing-masing bisa melapuk, bermetamorfosis, atau melebur, sehingga satu partikel bisa menempuh banyak rute berbeda dan tidak ada urutan yang tetap.',
        'Angka-angkanya dibuat untuk keperluan animasi, bukan hasil pengukuran. Perubahan siklus batuan yang nyata memakan waktu ribuan sampai jutaan tahun, dan kecepatannya bergantung pada iklim, kedalaman, dan pergerakan lempeng yang tidak dimodelkan simulasi. Simulasi juga melewatkan langkah pengangkatan, pengangkutan, dan penimbunan yang terjadi di antara tahap-tahap itu, memperlakukan semua partikel sama, dan tidak membedakan banyak jenis batuan di dalam tiap keluarga. Ia adalah peta jalur yang mungkin, bukan jam.',
      ],
    },
    figure: {
      caption: {
        en: 'The rock cycle. Magma cools into igneous rock; any rock at the surface weathers into sediment, which is buried and lithified into sedimentary rock; heat and pressure turn any rock into metamorphic rock; enough heat melts any rock back into magma.',
        id: 'Siklus batuan. Magma mendingin menjadi batuan beku; batuan apa pun di permukaan melapuk menjadi sedimen, yang terkubur dan terlitifikasi menjadi batuan sedimen; panas dan tekanan mengubah batuan apa pun menjadi batuan metamorf; panas yang cukup melebur batuan apa pun kembali menjadi magma.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('The rock cycle loop', 'Putaran siklus batuan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font-weight:700}.s{font-size:9px;opacity:.8}.ar{stroke:currentColor;stroke-width:1.4;fill:none;opacity:.65}</style>
  <ellipse cx="180" cy="208" rx="52" ry="20" fill="#ef4444" opacity=".3" stroke="#ef4444"/>
  <text x="180" y="212" text-anchor="middle" class="b" fill="#ef4444">${L('MAGMA', 'MAGMA')}</text>
  <rect x="18" y="86" width="92" height="40" rx="8" fill="#3b82f6" opacity=".3" stroke="#3b82f6"/>
  <text x="64" y="103" text-anchor="middle" class="b" fill="#3b82f6">${L('IGNEOUS', 'BATUAN BEKU')}</text>
  <text x="64" y="117" text-anchor="middle" class="s">${L('granite, basalt', 'granit, basal')}</text>
  <rect x="134" y="14" width="92" height="36" rx="8" fill="#f59e0b" opacity=".25" stroke="#f59e0b" stroke-dasharray="4 3"/>
  <text x="180" y="30" text-anchor="middle" class="b" fill="#f59e0b">${L('SEDIMENT', 'SEDIMEN')}</text>
  <text x="180" y="43" text-anchor="middle" class="s">${L('sand, mud, pebbles', 'pasir, lumpur, kerikil')}</text>
  <rect x="250" y="86" width="96" height="40" rx="8" fill="#f59e0b" opacity=".35" stroke="#f59e0b"/>
  <text x="298" y="103" text-anchor="middle" class="b" fill="#f59e0b">${L('SEDIMENTARY', 'BATUAN SEDIMEN')}</text>
  <text x="298" y="117" text-anchor="middle" class="s">${L('sandstone, limestone', 'batu pasir, gamping')}</text>
  <rect x="236" y="160" width="100" height="40" rx="8" fill="#8b5cf6" opacity=".3" stroke="#8b5cf6"/>
  <text x="286" y="177" text-anchor="middle" class="b" fill="#8b5cf6">${L('METAMORPHIC', 'BATUAN METAMORF')}</text>
  <text x="286" y="191" text-anchor="middle" class="s">${L('marble, slate', 'marmer, sabak')}</text>
  <path d="M132 198 L80 130" class="ar" marker-end="url(#r)"/>
  <text x="56" y="160" text-anchor="end" class="s">${L('cooling', 'pendinginan')}</text>
  <text x="56" y="171" text-anchor="end" class="s">${L('(crystallise)', '(mengkristal)')}</text>
  <path d="M86 84 L140 44" class="ar" marker-end="url(#r)"/>
  <text x="96" y="56" text-anchor="middle" class="s">${L('weathering,', 'pelapukan,')}</text>
  <text x="96" y="67" text-anchor="middle" class="s">${L('erosion', 'erosi')}</text>
  <path d="M222 44 L274 84" class="ar" marker-end="url(#r)"/>
  <text x="262" y="56" text-anchor="middle" class="s">${L('burial, compaction,', 'penimbunan, pemadatan,')}</text>
  <text x="262" y="67" text-anchor="middle" class="s">${L('cementing (lithification)', 'penyemenan (litifikasi)')}</text>
  <path d="M298 128 L292 156" class="ar" marker-end="url(#r)"/>
  <text x="306" y="146" class="s">${L('heat and', 'panas dan')}</text>
  <text x="306" y="156" class="s">${L('pressure', 'tekanan')}</text>
  <path d="M250 196 L228 206" class="ar" marker-end="url(#r)"/>
  <text x="236" y="222" text-anchor="middle" class="s">${L('melting', 'peleburan')}</text>
  <path d="M110 112 L234 170" class="ar" stroke-dasharray="4 3" marker-end="url(#r)"/>
  <text x="168" y="134" text-anchor="middle" class="s">${L('heat and pressure', 'panas dan tekanan')}</text>
  <path d="M276 160 L190 52" class="ar" stroke-dasharray="4 3" marker-end="url(#r)"/>
  <text x="246" y="140" text-anchor="start" class="s">${L('weathering', 'pelapukan')}</text>
  <path d="M254 124 L198 190" class="ar" stroke-dasharray="4 3" marker-end="url(#r)"/>
  <text x="208" y="168" text-anchor="start" class="s">${L('melting', 'peleburan')}</text>
  <path d="M70 128 L136 196" class="ar" stroke-dasharray="4 3" marker-end="url(#r)"/>
  <text x="112" y="176" text-anchor="end" class="s">${L('melting', 'peleburan')}</text>
  <text x="180" y="236" text-anchor="middle" class="s">${L('solid arrows: the classic loop · dashed: shortcuts the sim also allows', 'panah penuh: putaran klasik · putus-putus: jalan pintas yang juga ada di simulasi')}</text>
  <defs><marker id="r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'There are three rock families: igneous (from cooled magma), sedimentary (from compacted sediment) and metamorphic (changed by heat and pressure without melting).',
        'Weathering and erosion break rock into sediment; burial and cementing turn sediment into sedimentary rock.',
        'Metamorphism changes a rock\'s minerals and texture while it stays solid; melting turns any rock back into magma.',
        'Any rock type can turn into any other given the right conditions, so the cycle has many possible paths, not one fixed order.',
        'The changes take thousands to millions of years; the sim\'s rates are only for watching, not real speeds.',
      ],
      id: [
        'Ada tiga keluarga batuan: beku (dari magma yang mendingin), sedimen (dari sedimen yang terpadatkan), dan metamorf (berubah karena panas dan tekanan tanpa melebur).',
        'Pelapukan dan erosi memecah batuan menjadi sedimen; penimbunan dan penyemenan mengubah sedimen menjadi batuan sedimen.',
        'Metamorfisme mengubah mineral dan tekstur batuan selagi tetap padat; peleburan mengubah batuan apa pun kembali menjadi magma.',
        'Jenis batuan apa pun bisa berubah menjadi jenis lain pada kondisi yang tepat, sehingga siklus punya banyak jalur, bukan satu urutan tetap.',
        'Perubahannya memakan waktu ribuan sampai jutaan tahun; laju di simulasi hanya untuk ditonton, bukan kecepatan sesungguhnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Magma', 'Molten rock below the surface; when it reaches the surface it is called lava.'],
        ['Igneous rock', 'Rock formed when magma or lava cools and hardens, such as granite or basalt.'],
        ['Weathering', 'The breaking down of rock into smaller pieces by water, ice, wind, temperature changes and living things.'],
        ['Erosion', 'The carrying away of weathered pieces by water, wind or ice.'],
        ['Sediment', 'Loose pieces of rock, such as sand, mud and pebbles, that settle in layers.'],
        ['Lithification', 'The squeezing and cementing of sediment layers into solid sedimentary rock.'],
        ['Metamorphic rock', 'Rock changed by heat and pressure without melting, such as marble or slate.'],
        ['Metamorphism', 'The process of changing a rock\'s minerals and texture using heat and pressure while it stays solid.'],
      ],
      id: [
        ['Magma', 'Batuan cair di bawah permukaan; ketika mencapai permukaan disebut lava.'],
        ['Batuan beku', 'Batuan yang terbentuk ketika magma atau lava mendingin dan mengeras, seperti granit atau basal.'],
        ['Pelapukan', 'Pemecahan batuan menjadi butiran lebih kecil oleh air, es, angin, perubahan suhu, dan makhluk hidup.'],
        ['Erosi', 'Pengangkutan butiran hasil pelapukan oleh air, angin, atau es.'],
        ['Sedimen', 'Butiran lepas batuan, seperti pasir, lumpur, dan kerikil, yang mengendap berlapis.'],
        ['Litifikasi', 'Penekanan dan penyemenan lapisan sedimen menjadi batuan sedimen yang padat.'],
        ['Batuan metamorf', 'Batuan yang berubah karena panas dan tekanan tanpa melebur, seperti marmer atau sabak.'],
        ['Metamorfisme', 'Proses perubahan mineral dan tekstur batuan oleh panas dan tekanan selagi batuan tetap padat.'],
      ],
    },
    misconceptions: {
      en: [
        ['Rocks never change.', 'They do, but far too slowly to watch. Mountains are worn down to sand, sand is buried into sandstone, and sandstone can be baked into quartzite over millions of years.'],
        ['The rock cycle goes round in one fixed order: igneous → sedimentary → metamorphic → igneous.', 'Any rock can weather, be metamorphosed or melt. An igneous rock can go straight to metamorphic, and a metamorphic rock can weather into sediment; the sim includes these shortcuts.'],
        ['Metamorphic rock forms by melting and re-hardening.', 'If a rock melts it becomes magma and then igneous rock. Metamorphism happens while the rock stays solid; heat and pressure rearrange its minerals.'],
        ['Sedimentary rock forms quickly when mud dries out.', 'Dried mud is still sediment. Turning it into rock needs deep burial, great pressure and mineral cement, which takes thousands to millions of years.'],
      ],
      id: [
        ['Batu tidak pernah berubah.', 'Batu berubah, tetapi terlalu lambat untuk disaksikan. Gunung terkikis menjadi pasir, pasir terkubur menjadi batu pasir, dan batu pasir bisa terpanggang menjadi kuarsit selama jutaan tahun.'],
        ['Siklus batuan berputar dalam satu urutan tetap: beku → sedimen → metamorf → beku.', 'Batuan apa pun bisa melapuk, bermetamorfosis, atau melebur. Batuan beku bisa langsung menjadi metamorf, dan batuan metamorf bisa melapuk menjadi sedimen; simulasi memasukkan jalan pintas ini.'],
        ['Batuan metamorf terbentuk dengan melebur lalu mengeras lagi.', 'Jika batuan melebur, ia menjadi magma lalu batuan beku. Metamorfisme terjadi selagi batuan tetap padat; panas dan tekanan menyusun ulang mineralnya.'],
        ['Batuan sedimen terbentuk cepat ketika lumpur mengering.', 'Lumpur kering masih berupa sedimen. Mengubahnya menjadi batuan membutuhkan penimbunan yang dalam, tekanan besar, dan semen mineral, yang memakan waktu ribuan sampai jutaan tahun.'],
      ],
    },
    realWorld: {
      en: [
        'Each eruption of Indonesia\'s volcanoes, such as Merapi, pours out lava and ash that cool into new igneous rock; Borobudur temple is built from blocks of andesite, a volcanic igneous rock.',
        'Limestone cliffs and caves are sedimentary rock made from the shells of sea creatures, which is why they often contain fossils.',
        'Marble, used for statues and floors, is limestone that was metamorphosed by heat and pressure deep in the crust.',
        'Beach sand is sediment on its way to becoming rock: grains weathered from mountains, carried by rivers, waiting to be buried.',
      ],
      id: [
        'Setiap letusan gunung api Indonesia, seperti Merapi, mencurahkan lava dan abu yang mendingin menjadi batuan beku baru; Candi Borobudur dibangun dari balok andesit, batuan beku vulkanik.',
        'Tebing dan gua batu gamping adalah batuan sedimen yang terbentuk dari cangkang makhluk laut; karena itu sering mengandung fosil.',
        'Marmer, yang dipakai untuk patung dan lantai, adalah batu gamping yang bermetamorfosis karena panas dan tekanan jauh di dalam kerak.',
        'Pasir pantai adalah sedimen yang sedang dalam perjalanan menjadi batuan: butiran hasil pelapukan gunung, dibawa sungai, menunggu terkubur.',
      ],
    },
    questions: {
      en: [
        { q: 'In the sim, set the melting rate to zero and leave the others as they are. What happens to the magma count over time, and why?', a: 'It falls to zero. Particles still leave magma by cooling into igneous rock, but with melting at zero nothing ever returns to magma. In the real world, melting deep in the Earth keeps the cycle going.' },
        { q: 'Can a sedimentary rock turn directly into an igneous rock?', a: 'No. To become igneous it must first melt into magma and then cool. The sim has no direct sedimentary → igneous arrow for the same reason; the only way in to igneous is from magma.' },
        { q: 'A rock is made of tiny grains of sand cemented together, and another has large shiny crystals that lock into each other. Which family does each belong to, and how did each form?', a: 'The sand grains cemented together are sedimentary rock (sandstone): sediment that was buried and lithified. The interlocking crystals are igneous rock (such as granite): minerals that grew as magma cooled slowly underground.' },
      ],
      id: [
        { q: 'Dalam simulasi, atur laju peleburan ke nol dan biarkan yang lain. Apa yang terjadi pada jumlah magma seiring waktu, dan mengapa?', a: 'Jumlahnya turun sampai nol. Partikel masih keluar dari magma dengan mendingin menjadi batuan beku, tetapi dengan peleburan nol tidak ada yang kembali menjadi magma. Di dunia nyata, peleburan jauh di dalam Bumi menjaga siklus terus berjalan.' },
        { q: 'Bisakah batuan sedimen langsung berubah menjadi batuan beku?', a: 'Tidak. Untuk menjadi batuan beku, ia harus melebur dulu menjadi magma lalu mendingin. Simulasi juga tidak punya panah langsung sedimen → beku karena alasan yang sama; satu-satunya jalan masuk ke batuan beku adalah dari magma.' },
        { q: 'Sebuah batu terdiri atas butiran pasir kecil yang tersemen, dan batu lain memiliki kristal besar berkilau yang saling mengunci. Masing-masing termasuk keluarga apa, dan bagaimana terbentuknya?', a: 'Butiran pasir yang tersemen adalah batuan sedimen (batu pasir): sedimen yang terkubur dan terlitifikasi. Kristal yang saling mengunci adalah batuan beku (seperti granit): mineral yang tumbuh saat magma mendingin perlahan di bawah tanah.' },
      ],
    },
  },
};
