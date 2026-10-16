// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Sort the parts of a pond into living (biotic) and non-living (abiotic) components.',
      'Trace the food chain algae → water fleas → small fish → big fish and predict what happens to each link when one changes.',
      'Explain how sunlight, temperature and pollution (abiotic factors) change the living things in the pond.',
    ],
    id: [
      'Mengelompokkan bagian-bagian kolam menjadi komponen hidup (biotik) dan tak hidup (abiotik).',
      'Menelusuri rantai makanan alga → kutu air → ikan kecil → ikan besar dan memperkirakan apa yang terjadi pada tiap mata rantai jika salah satunya berubah.',
      'Menjelaskan bagaimana sinar matahari, suhu, dan pencemaran (faktor abiotik) mengubah makhluk hidup di kolam.',
    ],
  },
  tryThis: {
    en: [
      'Start with the clean sunny pond and wait until the bars stop moving. Write down the four numbers.',
      'Choose "Cloudy week". Which bar drops first? Which one drops last? Why in that order?',
      'Choose "Fertiliser spill". The algae bar shoots up but the fish disappear. Read the fact on screen to find out why.',
      'Make the pond dirty, wait for the fish to go, then set pollution back to 0. How many days does it take for the big fish to come back?',
    ],
    id: [
      'Mulai dengan kolam bersih dan cerah lalu tunggu sampai batangnya berhenti bergerak. Tulis keempat angkanya.',
      'Pilih "Minggu mendung". Batang mana yang turun lebih dulu? Mana yang turun paling akhir? Mengapa urutannya begitu?',
      'Pilih "Tumpahan pupuk". Batang alga melonjak tetapi ikannya hilang. Baca keterangan di layar untuk tahu alasannya.',
      'Buat kolam tercemar, tunggu sampai ikannya hilang, lalu kembalikan pencemaran ke 0. Berapa hari sampai ikan besar kembali?',
    ],
  },

  learn: {
    background: {
      en: [
        'A pond is an ecosystem: a place where living things and non-living things affect each other. The living things are called biotic components. In this pond they are algae (tiny green plants), water fleas (tiny animals that eat algae), small fish that eat water fleas, and big fish that eat small fish. The non-living things are called abiotic components: sunlight, the temperature of the water, the oxygen dissolved in it, and anything that pollutes it.',
        'The living things are joined in a food chain. Algae use sunlight to make their own food, so they are the producers. Everything else is a consumer. Energy passes up the chain, but a lot is lost at every step, so there are always far more algae than water fleas, more fleas than small fish, and only a few big fish. When one link changes, the change travels along the chain. Less sunlight means fewer algae, so soon there are fewer water fleas, then fewer small fish, then fewer big fish.',
        'The simulation uses simple rules. Algae grow faster with more sunlight and at a comfortable temperature of about 26 °C. Each animal grows when it has enough food and shrinks when it is hunted or when the water is bad. Warm water holds less oxygen, and pollution uses oxygen up, so fish suffer first when the pond is hot or dirty. Fertiliser pollution has a twist: it feeds the algae, so the algae bar rises, but the rotting algae use up the oxygen and the fish die. This is called an algal bloom. Time runs fast: one second in the sim is about two days in the pond.',
      ],
      id: [
        'Kolam adalah sebuah ekosistem: tempat makhluk hidup dan benda tak hidup saling memengaruhi. Makhluk hidup disebut komponen biotik. Di kolam ini mereka adalah alga (tumbuhan hijau yang sangat kecil), kutu air (hewan kecil pemakan alga), ikan kecil pemakan kutu air, dan ikan besar pemakan ikan kecil. Benda tak hidup disebut komponen abiotik: sinar matahari, suhu air, oksigen yang larut di dalamnya, dan apa pun yang mencemarinya.',
        'Makhluk hidup terhubung dalam rantai makanan. Alga memakai sinar matahari untuk membuat makanannya sendiri, jadi alga adalah produsen. Yang lainnya adalah konsumen. Energi berpindah ke atas rantai, tetapi banyak yang hilang di setiap tahap, sehingga alga selalu jauh lebih banyak daripada kutu air, kutu air lebih banyak daripada ikan kecil, dan ikan besar hanya sedikit. Ketika satu mata rantai berubah, perubahan itu menjalar sepanjang rantai. Sinar matahari yang berkurang berarti alga berkurang, lalu kutu air berkurang, kemudian ikan kecil, lalu ikan besar.',
        'Simulasi ini memakai aturan sederhana. Alga tumbuh lebih cepat dengan lebih banyak sinar matahari dan pada suhu nyaman sekitar 26 °C. Setiap hewan bertambah saat makanannya cukup dan berkurang saat dimangsa atau saat airnya buruk. Air hangat menyimpan lebih sedikit oksigen, dan pencemaran menghabiskan oksigen, sehingga ikan paling dulu menderita saat kolam panas atau kotor. Pencemaran pupuk punya kejutan: pupuk memberi makan alga, sehingga batang alga naik, tetapi alga yang membusuk menghabiskan oksigen dan ikan mati. Ini disebut ledakan alga. Waktu berjalan cepat: satu detik di simulasi kira-kira dua hari di kolam.',
      ],
    },
    figure: {
      caption: {
        en: 'The pond food chain (biotic components, left to right) and the abiotic components that act on it. Arrows show which way the food energy goes.',
        id: 'Rantai makanan kolam (komponen biotik, dari kiri ke kanan) dan komponen abiotik yang memengaruhinya. Panah menunjukkan arah perpindahan energi makanan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Pond food chain with sunlight, temperature and pollution acting on it', 'Rantai makanan kolam dengan sinar matahari, suhu, dan pencemaran yang memengaruhinya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.t{font:bold 11px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.s{font:10px system-ui,sans-serif;fill:currentColor;text-anchor:middle;opacity:.8}</style>
  <defs><marker id="pa" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="currentColor"/></marker></defs>
  <rect x="10" y="100" width="340" height="90" rx="12" fill="#1d4ed8" opacity=".25"/>
  <circle cx="40" cy="40" r="16" fill="#facc15"/>
  <text x="40" y="74" class="s">${L('sunlight', 'sinar matahari')}</text>
  <path d="M40 60 L55 100" stroke="#facc15" stroke-width="2" fill="none" marker-end="url(#pa)"/>
  <rect x="150" y="26" width="10" height="36" rx="5" fill="#ef4444"/><circle cx="155" cy="66" r="7" fill="#ef4444"/>
  <text x="155" y="88" class="s">${L('temperature', 'suhu')}</text>
  <path d="M240 36 l12 -8 l12 8 l12 -8 l12 8" stroke="#78350f" stroke-width="3" fill="none"/><rect x="236" y="36" width="56" height="20" rx="3" fill="#78350f"/>
  <text x="264" y="74" class="s">${L('pollution', 'pencemaran')}</text>
  <path d="M264 60 L264 100" stroke="#78350f" stroke-width="2" fill="none" marker-end="url(#pa)"/>
  <circle cx="45" cy="140" r="5" fill="#22c55e"/><circle cx="57" cy="150" r="4" fill="#22c55e"/><circle cx="38" cy="155" r="4" fill="#22c55e"/><circle cx="60" cy="135" r="3" fill="#22c55e"/>
  <text x="50" y="178" class="t">${L('algae', 'alga')}</text>
  <path d="M75 145 L105 145" stroke="currentColor" stroke-width="1.6" marker-end="url(#pa)"/>
  <ellipse cx="130" cy="145" rx="9" ry="6" fill="#f97316"/><circle cx="137" cy="143" r="1.5" fill="#111"/><path d="M121 145 l-6 -4 M121 145 l-6 4" stroke="#f97316" stroke-width="1.5"/>
  <text x="130" y="178" class="t">${L('water flea', 'kutu air')}</text>
  <path d="M150 145 L180 145" stroke="currentColor" stroke-width="1.6" marker-end="url(#pa)"/>
  <path d="M195 145 q12 -10 26 0 q-14 10 -26 0 z M221 145 l8 -6 v12 z" fill="#38bdf8"/>
  <text x="212" y="178" class="t">${L('small fish', 'ikan kecil')}</text>
  <path d="M240 145 L268 145" stroke="currentColor" stroke-width="1.6" marker-end="url(#pa)"/>
  <path d="M278 145 q22 -16 46 0 q-24 16 -46 0 z M324 145 l14 -10 v20 z" fill="#f43f5e"/>
  <text x="304" y="178" class="t">${L('big fish', 'ikan besar')}</text>
  <text x="180" y="212" class="s">${L('biotic: the living things in the water', 'biotik: makhluk hidup di dalam air')}</text>
  <text x="180" y="230" class="s">${L('abiotic: sunlight, temperature, pollution', 'abiotik: sinar matahari, suhu, pencemaran')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'An ecosystem has living (biotic) parts and non-living (abiotic) parts, and they affect each other.',
        'Algae are producers: they make food from sunlight. Animals are consumers.',
        'In a food chain, a change in one link soon changes the next links.',
        'There are always many more producers than top predators, because energy is lost at each step.',
        'Warm or polluted water holds less oxygen, so fish suffer first.',
        'Fertiliser pollution makes algae bloom, and the bloom uses up the oxygen that fish need.',
      ],
      id: [
        'Ekosistem punya bagian hidup (biotik) dan tak hidup (abiotik), dan keduanya saling memengaruhi.',
        'Alga adalah produsen: membuat makanan dari sinar matahari. Hewan adalah konsumen.',
        'Dalam rantai makanan, perubahan pada satu mata rantai segera mengubah mata rantai berikutnya.',
        'Produsen selalu jauh lebih banyak daripada pemangsa puncak, karena energi hilang di setiap tahap.',
        'Air yang hangat atau tercemar menyimpan lebih sedikit oksigen, sehingga ikan paling dulu menderita.',
        'Pencemaran pupuk membuat alga meledak, dan ledakan itu menghabiskan oksigen yang dibutuhkan ikan.',
      ],
    },
    vocabulary: {
      en: [
        ['Ecosystem', 'All the living things in a place together with the non-living things around them.'],
        ['Biotic', 'Living, or made by living things: algae, water fleas, fish.'],
        ['Abiotic', 'Non-living: sunlight, water, temperature, oxygen, rocks.'],
        ['Producer', 'A living thing that makes its own food from sunlight, such as algae and plants.'],
        ['Consumer', 'An animal that eats other living things.'],
        ['Food chain', 'A line showing who eats whom, with arrows pointing to the eater.'],
        ['Algal bloom', 'A sudden huge growth of algae, often caused by fertiliser washing into the water.'],
      ],
      id: [
        ['Ekosistem', 'Semua makhluk hidup di suatu tempat bersama benda tak hidup di sekitarnya.'],
        ['Biotik', 'Hidup, atau dibuat oleh makhluk hidup: alga, kutu air, ikan.'],
        ['Abiotik', 'Tak hidup: sinar matahari, air, suhu, oksigen, batu.'],
        ['Produsen', 'Makhluk hidup yang membuat makanannya sendiri dari sinar matahari, seperti alga dan tumbuhan.'],
        ['Konsumen', 'Hewan yang memakan makhluk hidup lain.'],
        ['Rantai makanan', 'Garis yang menunjukkan siapa memakan siapa, dengan panah menunjuk ke pemakannya.'],
        ['Ledakan alga', 'Pertumbuhan alga yang tiba-tiba sangat banyak, sering disebabkan pupuk yang terbawa ke air.'],
      ],
    },
    misconceptions: {
      en: [
        ['More algae is always good for the pond.', 'Too much algae is a problem. When the bloom dies and rots it uses up the oxygen, and fish suffocate. In the sim the fertiliser spill makes algae rise and fish fall.'],
        ['Pollution only hurts the animals that touch it.', 'Pollution travels along the food chain and through the water. Fish die even though the fertiliser never touched them, because the oxygen in the water ran out.'],
        ['The big fish are the most important because they are at the top.', 'The algae are the base. Without producers nothing above them can live. Remove the big fish and the pond goes on; remove the algae and everything disappears.'],
        ['Sunlight is only for plants on land.', 'Algae in water also need sunlight. A cloudy week or muddy water lowers the algae, and the whole chain shrinks.'],
      ],
      id: [
        ['Semakin banyak alga semakin baik untuk kolam.', 'Alga yang terlalu banyak adalah masalah. Saat ledakan alga mati dan membusuk, oksigen habis dan ikan mati lemas. Di simulasi, tumpahan pupuk membuat alga naik dan ikan turun.'],
        ['Pencemaran hanya menyakiti hewan yang menyentuhnya.', 'Pencemaran menjalar sepanjang rantai makanan dan melalui air. Ikan mati walaupun pupuk tidak pernah menyentuhnya, karena oksigen di air habis.'],
        ['Ikan besar paling penting karena berada di puncak.', 'Alga adalah dasarnya. Tanpa produsen, tidak ada yang di atasnya bisa hidup. Hilangkan ikan besar, kolam tetap berjalan; hilangkan alga, semuanya lenyap.'],
        ['Sinar matahari hanya untuk tumbuhan di darat.', 'Alga di air juga butuh sinar matahari. Minggu yang mendung atau air yang keruh menurunkan alga, dan seluruh rantai mengecil.'],
      ],
    },
    realWorld: {
      en: [
        'Fish farmers in Indonesian ponds and lakes install aerators to add oxygen on hot, still days when fish gasp at the surface.',
        'Fertiliser and detergent washing into Lake Toba and Jakarta\'s reservoirs cause green algal blooms and fish kills.',
        'Rice-field ditches are mini ponds: when farmers spray chemicals, the frogs and small fish disappear first.',
        'Aquarium keepers watch temperature and clean the water for the same reasons: warm, dirty water means sick fish.',
      ],
      id: [
        'Pembudidaya ikan di kolam dan danau Indonesia memasang aerator untuk menambah oksigen pada hari panas tanpa angin saat ikan megap-megap di permukaan.',
        'Pupuk dan deterjen yang terbawa ke Danau Toba dan waduk-waduk Jakarta menyebabkan ledakan alga hijau dan kematian ikan.',
        'Parit sawah adalah kolam mini: saat petani menyemprot bahan kimia, katak dan ikan kecil menghilang lebih dulu.',
        'Pemelihara akuarium memantau suhu dan membersihkan air untuk alasan yang sama: air hangat dan kotor berarti ikan sakit.',
      ],
    },
    questions: {
      en: [
        { q: 'You set sunlight to very low. Which population drops first and which drops last?', a: 'Algae drop first because they need sunlight to make food. Then the water fleas run short of food, then the small fish, and the big fish drop last.' },
        { q: 'After a fertiliser spill the algae bar goes up. Why do the fish still die?', a: 'The fertiliser feeds the algae, but the rotting bloom uses up the oxygen in the water. Fish need oxygen, so they suffocate even with plenty of food around.' },
        { q: 'Which parts of the pond are abiotic, and which are biotic?', a: 'Abiotic: sunlight, water temperature, oxygen and pollution. Biotic: algae, water fleas, small fish and big fish.' },
      ],
      id: [
        { q: 'Kamu mengatur sinar matahari sangat rendah. Populasi mana yang turun lebih dulu dan mana yang paling akhir?', a: 'Alga turun lebih dulu karena butuh sinar matahari untuk membuat makanan. Lalu kutu air kekurangan makanan, kemudian ikan kecil, dan ikan besar turun paling akhir.' },
        { q: 'Setelah tumpahan pupuk, batang alga naik. Mengapa ikan tetap mati?', a: 'Pupuk memberi makan alga, tetapi ledakan alga yang membusuk menghabiskan oksigen di air. Ikan butuh oksigen, jadi mereka mati lemas meskipun makanan berlimpah.' },
        { q: 'Bagian kolam mana yang abiotik, dan mana yang biotik?', a: 'Abiotik: sinar matahari, suhu air, oksigen, dan pencemaran. Biotik: alga, kutu air, ikan kecil, dan ikan besar.' },
      ],
    },
  },
};
