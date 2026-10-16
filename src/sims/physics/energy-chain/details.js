// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Name common forms of energy: light, heat, sound, moving (motion), electric, and the stored energy in food and batteries.',
      'Name the sun, food, batteries and the electricity from a plug as sources of energy.',
      'Describe how a device changes energy from one form to another, step by step, as a chain.',
    ],
    id: [
      'Menyebutkan bentuk-bentuk energi yang umum: cahaya, panas, bunyi, gerak, listrik, dan energi yang tersimpan dalam makanan dan baterai.',
      'Menyebutkan matahari, makanan, baterai dan listrik dari stopkontak sebagai sumber energi.',
      'Menjelaskan bagaimana sebuah alat mengubah energi dari satu bentuk ke bentuk lain, langkah demi langkah, sebagai sebuah rantai.',
    ],
  },
  tryThis: {
    en: [
      'Start with the torch. Where does its energy come from? Drag that card into the first slot.',
      'Build the kettle chain. Only two cards are needed. Which card is the energy that comes out?',
      'Build the bicycle chain. Where does the rider get the energy to pedal?',
      'Build the plant and runner chain. Then look back at the bicycle chain: do they start the same way?',
    ],
    id: [
      'Mulai dari senter. Dari mana energinya berasal? Seret kartu itu ke kotak pertama.',
      'Susun rantai ketel. Hanya perlu dua kartu. Kartu mana yang menjadi energi yang keluar?',
      'Susun rantai sepeda. Dari mana pengendara mendapat energi untuk mengayuh?',
      'Susun rantai tumbuhan dan pelari. Lalu lihat lagi rantai sepeda: apakah awalnya sama?',
    ],
  },

  learn: {
    background: {
      en: [
        'Energy is what makes things happen. It makes a lamp shine, a kettle hot, a radio sing and a bicycle move. Energy comes in different forms. Light, heat, sound and moving (motion) are forms you can see or feel. Electric energy travels through wires. Food and batteries hold stored energy that is waiting to be used. The sun is the biggest energy source of all.',
        'Energy is never used up. When a device works, it changes energy from one form into another. A torch changes the stored energy in its battery into electric energy, and the bulb changes the electric energy into light. We can write this as a chain: battery → electric → light. Every device has its own chain. In this sim you build the chain by dragging energy cards into the slots. A right card lights up and the device starts to work. A wrong card shakes and goes back to the tray.',
        'Some chains start a long way back. A plant catches light from the sun and stores it as food. A person eats the food and uses that stored energy to run. So the runner\'s energy chain is: sun → food → moving. The bicycle with a lamp is even longer: food gives the rider energy to pedal, pedalling turns a little generator that makes electric energy, and the lamp changes that into light.',
      ],
      id: [
        'Energi adalah yang membuat segala sesuatu terjadi. Energi membuat lampu menyala, ketel panas, radio berbunyi dan sepeda bergerak. Energi punya berbagai bentuk. Cahaya, panas, bunyi dan gerak adalah bentuk yang bisa dilihat atau dirasakan. Energi listrik mengalir lewat kabel. Makanan dan baterai menyimpan energi yang menunggu untuk dipakai. Matahari adalah sumber energi terbesar.',
        'Energi tidak pernah habis. Saat sebuah alat bekerja, alat itu mengubah energi dari satu bentuk ke bentuk lain. Senter mengubah energi yang tersimpan dalam baterai menjadi energi listrik, dan bohlam mengubah energi listrik menjadi cahaya. Kita bisa menulisnya sebagai rantai: baterai → listrik → cahaya. Setiap alat punya rantainya sendiri. Di simulasi ini kamu menyusun rantai dengan menyeret kartu energi ke kotak. Kartu yang benar menyala dan alatnya mulai bekerja. Kartu yang salah bergetar dan kembali ke nampan.',
        'Beberapa rantai dimulai dari jauh. Tumbuhan menangkap cahaya matahari dan menyimpannya sebagai makanan. Orang memakan makanan itu dan memakai energi yang tersimpan untuk berlari. Jadi rantai energi pelari adalah: matahari → makanan → gerak. Sepeda berlampu lebih panjang lagi: makanan memberi pengendara energi untuk mengayuh, kayuhan memutar dinamo kecil yang menghasilkan energi listrik, dan lampu mengubahnya menjadi cahaya.',
      ],
    },
    figure: {
      caption: {
        en: 'Two energy chains. Top: a torch changes the stored energy in a battery into electric energy, then into light. Bottom: the sun gives a plant energy to make food, and a runner changes that food energy into moving energy.',
        id: 'Dua rantai energi. Atas: senter mengubah energi tersimpan dalam baterai menjadi energi listrik, lalu menjadi cahaya. Bawah: matahari memberi tumbuhan energi untuk membuat makanan, dan pelari mengubah energi makanan itu menjadi energi gerak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Energy chains for a torch and for a runner', 'Rantai energi senter dan pelari')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.h{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:start}.c{fill:none;stroke:currentColor;stroke-width:1.3}.a{fill:none;stroke:currentColor;stroke-width:2}</style>
  <defs><marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="currentColor"/></marker></defs>
  <text x="12" y="18" class="h">${L('Torch', 'Senter')}</text>
  <rect x="20" y="36" width="80" height="56" rx="8" class="c"/>
  <rect x="42" y="50" width="34" height="18" rx="3" fill="#22c55e"/><rect x="76" y="55" width="5" height="8" fill="#22c55e"/>
  <text x="60" y="84">${L('battery', 'baterai')}</text>
  <line x1="104" y1="64" x2="132" y2="64" class="a" marker-end="url(#ar)"/>
  <rect x="140" y="36" width="80" height="56" rx="8" class="c"/>
  <path d="M184 44 L170 64 L180 64 L176 78 L192 56 L182 56 Z" fill="#facc15"/>
  <text x="180" y="84">${L('electric', 'listrik')}</text>
  <line x1="224" y1="64" x2="252" y2="64" class="a" marker-end="url(#ar)"/>
  <rect x="260" y="36" width="80" height="56" rx="8" class="c"/>
  <circle cx="300" cy="56" r="10" fill="#fde68a"/><rect x="295" y="66" width="10" height="6" fill="#94a3b8"/>
  <line x1="300" y1="40" x2="300" y2="44" stroke="#fde68a" stroke-width="2"/><line x1="286" y1="48" x2="289" y2="50" stroke="#fde68a" stroke-width="2"/><line x1="314" y1="48" x2="311" y2="50" stroke="#fde68a" stroke-width="2"/>
  <text x="300" y="84">${L('light', 'cahaya')}</text>
  <text x="12" y="130" class="h">${L('Plant and runner', 'Tumbuhan dan pelari')}</text>
  <rect x="20" y="148" width="80" height="56" rx="8" class="c"/>
  <circle cx="60" cy="168" r="10" fill="#fbbf24"/>
  <line x1="60" y1="152" x2="60" y2="156" stroke="#fbbf24" stroke-width="2"/><line x1="60" y1="180" x2="60" y2="184" stroke="#fbbf24" stroke-width="2"/><line x1="44" y1="168" x2="48" y2="168" stroke="#fbbf24" stroke-width="2"/><line x1="72" y1="168" x2="76" y2="168" stroke="#fbbf24" stroke-width="2"/>
  <text x="60" y="196">${L('sun', 'matahari')}</text>
  <line x1="104" y1="176" x2="132" y2="176" class="a" marker-end="url(#ar)"/>
  <rect x="140" y="148" width="80" height="56" rx="8" class="c"/>
  <circle cx="180" cy="170" r="11" fill="#ef4444"/><path d="M180 159 C184 152 190 152 192 156 C186 156 182 159 180 159 Z" fill="#22c55e"/>
  <text x="180" y="196">${L('food', 'makanan')}</text>
  <line x1="224" y1="176" x2="252" y2="176" class="a" marker-end="url(#ar)"/>
  <rect x="260" y="148" width="80" height="56" rx="8" class="c"/>
  <circle cx="296" cy="158" r="4" fill="currentColor"/>
  <path d="M296 162 L298 172 L292 182 M298 172 L306 180 M290 166 L300 168 L308 164" class="a"/>
  <line x1="316" y1="166" x2="326" y2="166" class="a"/><line x1="316" y1="172" x2="330" y2="172" class="a"/>
  <text x="300" y="196">${L('moving', 'gerak')}</text>
  <text x="180" y="228">${L('Each arrow means: the energy changes form here.', 'Setiap panah berarti: energi berubah bentuk di sini.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Energy has many forms: light, heat, sound, moving, electric, and stored energy in food and batteries.',
        'The sun, food, batteries and the electricity from a plug are sources of energy.',
        'A device changes energy from one form to another. We can draw this as a chain with arrows.',
        'Energy is not used up when it changes form. It only changes from one form to another.',
        'Most energy on Earth starts with the sun. Plants store sunlight as food, and animals eat the food.',
      ],
      id: [
        'Energi punya banyak bentuk: cahaya, panas, bunyi, gerak, listrik, dan energi tersimpan dalam makanan dan baterai.',
        'Matahari, makanan, baterai dan listrik dari stopkontak adalah sumber energi.',
        'Sebuah alat mengubah energi dari satu bentuk ke bentuk lain. Kita bisa menggambarnya sebagai rantai dengan panah.',
        'Energi tidak habis saat berubah bentuk. Energi hanya berubah dari satu bentuk ke bentuk lain.',
        'Sebagian besar energi di Bumi berawal dari matahari. Tumbuhan menyimpan cahaya matahari sebagai makanan, dan hewan memakan makanan itu.',
      ],
    },
    vocabulary: {
      en: [
        ['Energy', 'What is needed to make things happen: to move, to shine, to heat, to make sound.'],
        ['Energy source', 'Where energy comes from, like the sun, food, a battery or a power plug.'],
        ['Form of energy', 'A kind of energy, such as light, heat, sound, moving or electric energy.'],
        ['Stored energy', 'Energy that is kept for later, like the energy in food or in a battery.'],
        ['Energy chain', 'A line of arrows showing how energy changes form, step by step.'],
      ],
      id: [
        ['Energi', 'Yang dibutuhkan agar sesuatu terjadi: bergerak, bersinar, memanaskan, berbunyi.'],
        ['Sumber energi', 'Asal energi, seperti matahari, makanan, baterai atau stopkontak.'],
        ['Bentuk energi', 'Jenis energi, seperti energi cahaya, panas, bunyi, gerak atau listrik.'],
        ['Energi tersimpan', 'Energi yang disimpan untuk nanti, seperti energi dalam makanan atau dalam baterai.'],
        ['Rantai energi', 'Barisan panah yang menunjukkan bagaimana energi berubah bentuk, langkah demi langkah.'],
      ],
    },
    misconceptions: {
      en: [
        ['When a battery goes flat, its energy is gone forever.', 'The energy is not destroyed. It was changed into light, heat and sound and spread out into the room, so we cannot collect it again.'],
        ['Electricity is the only kind of energy a device needs.', 'Electricity is just one form. A bicycle runs on food energy, a candle on stored energy in wax, and a plant on sunlight.'],
        ['Food is not energy, it is just stuff we eat.', 'Food holds stored energy that came from sunlight. Our bodies change it into moving energy and body heat.'],
      ],
      id: [
        ['Saat baterai habis, energinya hilang selamanya.', 'Energi tidak musnah. Energi itu berubah menjadi cahaya, panas dan bunyi lalu menyebar ke ruangan, sehingga kita tidak bisa mengumpulkannya lagi.'],
        ['Listrik adalah satu-satunya jenis energi yang dibutuhkan alat.', 'Listrik hanya salah satu bentuk. Sepeda berjalan dengan energi makanan, lilin dengan energi tersimpan dalam lilin, dan tumbuhan dengan cahaya matahari.'],
        ['Makanan bukan energi, hanya sesuatu yang kita makan.', 'Makanan menyimpan energi yang berasal dari cahaya matahari. Tubuh kita mengubahnya menjadi energi gerak dan panas tubuh.'],
      ],
    },
    realWorld: {
      en: [
        'A solar panel on a roof changes sunlight into electric energy for the lights inside the house.',
        'A hair dryer changes electric energy into heat and moving air, and also some sound.',
        'A campfire changes the stored energy in wood into heat and light.',
        'A wind-up toy stores your moving energy in a spring and gives it back as the toy walks.',
      ],
      id: [
        'Panel surya di atap mengubah cahaya matahari menjadi energi listrik untuk lampu di dalam rumah.',
        'Pengering rambut mengubah energi listrik menjadi panas dan udara yang bergerak, dan juga sedikit bunyi.',
        'Api unggun mengubah energi tersimpan dalam kayu menjadi panas dan cahaya.',
        'Mainan putar menyimpan energi gerakmu dalam pegas dan mengembalikannya saat mainan berjalan.',
      ],
    },
    questions: {
      en: [
        { q: 'What is the energy chain for a torch?', a: 'Battery (stored energy) → electric → light. The battery pushes electricity through the wire, and the bulb changes the electricity into light.' },
        { q: 'A kettle is plugged in and the water gets hot. Which form of energy goes in, and which comes out?', a: 'Electric energy goes in and heat comes out. The kettle changes electric energy into heat energy.' },
        { q: 'Why does the runner\'s chain start with the sun?', a: 'Plants need sunlight to make food. The runner eats the food and changes its stored energy into moving energy. Without the sun there would be no food.' },
      ],
      id: [
        { q: 'Apa rantai energi untuk senter?', a: 'Baterai (energi tersimpan) → listrik → cahaya. Baterai mendorong listrik lewat kabel, dan bohlam mengubah listrik menjadi cahaya.' },
        { q: 'Ketel dicolokkan dan airnya menjadi panas. Bentuk energi apa yang masuk, dan apa yang keluar?', a: 'Energi listrik masuk dan panas keluar. Ketel mengubah energi listrik menjadi energi panas.' },
        { q: 'Mengapa rantai pelari dimulai dari matahari?', a: 'Tumbuhan butuh cahaya matahari untuk membuat makanan. Pelari memakan makanan itu dan mengubah energi tersimpannya menjadi energi gerak. Tanpa matahari tidak ada makanan.' },
      ],
    },
  },
};
