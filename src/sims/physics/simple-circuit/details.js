// Long-form text for the sim page aside, written for the teacher.
export default {
  objectives: {
    en: [
      'Explain that a bulb lights only when the circuit is a complete, unbroken loop.',
      'Describe how adding bulbs makes each one dimmer and adding batteries makes them brighter.',
      'Sort everyday materials into conductors and insulators by testing them.',
    ],
    id: [
      'Menjelaskan bahwa lampu hanya menyala jika rangkaian membentuk jalur tertutup tanpa putus.',
      'Menjelaskan bahwa menambah lampu membuat tiap lampu lebih redup dan menambah baterai membuatnya lebih terang.',
      'Mengelompokkan benda sehari-hari menjadi konduktor dan isolator dengan mengujinya.',
    ],
  },
  tryThis: {
    en: [
      'Before you click the switch, ask: will the bulb light? Then click and check.',
      'Add a second bulb. Is each bulb brighter, dimmer, or the same? Now add a battery.',
      'Guess conductor or insulator for each material, then drop it in the gap and record the result.',
    ],
    id: [
      'Sebelum mengeklik sakelar, tanya: apakah lampu akan menyala? Lalu klik dan periksa.',
      'Tambah lampu kedua. Apakah tiap lampu lebih terang, lebih redup, atau sama? Sekarang tambah baterai.',
      'Tebak konduktor atau isolator untuk tiap bahan, lalu letakkan di celah dan catat hasilnya.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Electricity needs a complete path to flow. The path starts at one end of the battery, runs through the wires, the bulb and the switch, and comes back to the other end of the battery. This loop is called a circuit. If there is a break anywhere in the loop, the electricity cannot flow and the bulb stays dark. The switch is just a way to make or break the loop on purpose. In the sim, yellow dots run round the loop to show the electricity flowing, but you could not see anything like that in a real wire.',
        'The battery pushes the electricity round the loop, and the bulb glows because it turns some of that energy into light. If you add a second bulb in the same loop, the same push now has to work through two bulbs, so each one glows less brightly. If you add a second battery, the push is stronger, so the bulbs glow brighter. The sim lets you try up to three bulbs and three batteries. It keeps things simple and ignores that a real bulb can burn out if the push is too strong.',
        'The gap at the bottom of the board is a tester. Drop something in and the loop is only complete if that material lets electricity through. Materials that do are called conductors; in the sim these are copper, iron and pencil lead. Materials that block electricity are called insulators: plastic, wood and rubber. Metals are conductors, which is why wires are made of copper. Plastic is an insulator, which is why wires are wrapped in it to keep you safe.',
      ],
      id: [
        'Listrik memerlukan jalur yang lengkap untuk mengalir. Jalurnya mulai dari satu ujung baterai, melewati kabel, lampu dan sakelar, lalu kembali ke ujung baterai yang lain. Jalur melingkar ini disebut rangkaian. Jika ada yang putus di mana pun pada jalur itu, listrik tidak bisa mengalir dan lampu tetap padam. Sakelar hanyalah cara untuk menyambung atau memutus jalur dengan sengaja. Di simulasi, titik-titik kuning berjalan mengitari jalur untuk menunjukkan listrik yang mengalir, tetapi di kabel sungguhan kamu tidak bisa melihat hal seperti itu.',
        'Baterai mendorong listrik mengitari jalur, dan lampu menyala karena mengubah sebagian energi itu menjadi cahaya. Jika kamu menambah lampu kedua pada jalur yang sama, dorongan yang sama kini harus melewati dua lampu, sehingga tiap lampu menyala lebih redup. Jika kamu menambah baterai kedua, dorongannya lebih kuat, sehingga lampu menyala lebih terang. Simulasi membolehkan sampai tiga lampu dan tiga baterai. Simulasi ini dibuat sederhana dan mengabaikan bahwa lampu sungguhan bisa putus jika dorongannya terlalu kuat.',
        'Celah di bagian bawah papan adalah penguji. Letakkan sesuatu di sana, maka jalur hanya lengkap jika bahan itu bisa dilewati listrik. Bahan yang bisa dilewati disebut konduktor; di simulasi ini tembaga, besi dan isi pensil. Bahan yang menghalangi listrik disebut isolator: plastik, kayu dan karet. Logam adalah konduktor, karena itulah kabel dibuat dari tembaga. Plastik adalah isolator, karena itulah kabel dibungkus plastik supaya kamu aman.',
      ],
    },
    figure: {
      caption: {
        en: 'A complete circuit. Electricity flows from the battery, through the switch and the bulb, and back to the battery, so the bulb lights. Open the switch or put an insulator in the gap and the loop is broken.',
        id: 'Rangkaian lengkap. Listrik mengalir dari baterai, melewati sakelar dan lampu, lalu kembali ke baterai, sehingga lampu menyala. Buka sakelar atau letakkan isolator di celah, maka jalurnya putus.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Battery, switch and bulb joined in one loop', 'Baterai, sakelar dan lampu tersambung dalam satu jalur')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.w{fill:none;stroke:currentColor;stroke-width:3;stroke-linejoin:round}.m{fill:none;stroke:currentColor;stroke-width:1.3}</style>
  <defs><marker id="fl" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#f59e0b"/></marker></defs>
  <path d="M60 60 L150 60 M210 60 L300 60 L300 100 M300 140 L300 190 L220 190 M160 190 L60 190 L60 60" class="w"/>
  <circle cx="180" cy="48" r="22" fill="#f59e0b" opacity=".18"/>
  <circle cx="180" cy="48" r="14" fill="#f59e0b" opacity=".35"/>
  <circle cx="180" cy="48" r="14" class="m"/>
  <rect x="172" y="60" width="16" height="8" fill="currentColor"/>
  <path d="M150 60 L172 64 M188 64 L210 60" class="w"/>
  <path d="M175 56 L178 44 L182 54 L185 42" class="m" stroke="#ef4444" stroke-width="1.5"/>
  <text x="206" y="38" class="s">${L('bulb', 'lampu')}</text>
  <circle cx="300" cy="100" r="4" fill="currentColor"/>
  <circle cx="300" cy="140" r="4" fill="currentColor"/>
  <line x1="300" y1="100" x2="300" y2="140" stroke="#10b981" stroke-width="4"/>
  <line x1="300" y1="100" x2="326" y2="128" class="m" stroke-dasharray="3 3" opacity=".6"/>
  <text x="310" y="94" class="s">${L('switch', 'sakelar')}</text>
  <text x="310" y="150" class="s" fill="#10b981">${L('closed', 'tertutup')}</text>
  <rect x="160" y="178" width="60" height="24" rx="4" fill="#f59e0b"/>
  <text x="190" y="194" class="s" text-anchor="middle" fill="#fff" font-weight="600">${L('copper', 'tembaga')}</text>
  <text x="140" y="222" class="s">${L('tester gap: a conductor completes the loop', 'celah penguji: konduktor melengkapi jalur')}</text>
  <rect x="42" y="110" width="36" height="30" fill="#10b981"/>
  <rect x="42" y="110" width="10" height="30" fill="currentColor" opacity=".7"/>
  <text x="62" y="130" class="s" text-anchor="middle" fill="#fff" font-weight="700">+</text>
  <text x="47" y="130" class="s" text-anchor="middle" fill="#fff" font-weight="700">−</text>
  <text x="18" y="156" class="s">${L('battery', 'baterai')}</text>
  <path d="M90 52 L130 52" stroke="#f59e0b" stroke-width="2" marker-end="url(#fl)"/>
  <path d="M308 160 L308 182" stroke="#f59e0b" stroke-width="2" marker-end="url(#fl)"/>
  <path d="M130 198 L90 198" stroke="#f59e0b" stroke-width="2" marker-end="url(#fl)"/>
  <path d="M52 170 L52 150" stroke="#f59e0b" stroke-width="2" marker-end="url(#fl)"/>
  <text x="96" y="100" class="s">${L('a complete loop:', 'jalur yang lengkap:')}</text>
  <text x="96" y="113" class="s">${L('electricity flows all the way round', 'listrik mengalir sampai kembali')}</text>
  <text x="96" y="126" class="s">${L('and the bulb lights', 'dan lampu menyala')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A bulb only lights when there is a complete, unbroken loop from one end of the battery to the other.',
        'A switch works by making a break in the loop (off) or closing it (on).',
        'Adding more bulbs to the same loop makes each bulb dimmer; adding more batteries makes them brighter.',
        'Conductors such as copper, iron and pencil lead let electricity through; insulators such as plastic, wood and rubber block it.',
        'Wires are made of metal inside and covered in plastic outside: a conductor to carry the electricity and an insulator to keep it in.',
      ],
      id: [
        'Lampu hanya menyala jika ada jalur lengkap tanpa putus dari satu ujung baterai ke ujung lainnya.',
        'Sakelar bekerja dengan memutus jalur (mati) atau menyambungnya (nyala).',
        'Menambah lampu pada jalur yang sama membuat tiap lampu lebih redup; menambah baterai membuatnya lebih terang.',
        'Konduktor seperti tembaga, besi dan isi pensil dapat dilewati listrik; isolator seperti plastik, kayu dan karet menghalanginya.',
        'Kabel terbuat dari logam di dalam dan dibungkus plastik di luar: konduktor untuk membawa listrik dan isolator supaya listrik tidak keluar.',
      ],
    },
    vocabulary: {
      en: [
        ['Circuit', 'A complete loop that electricity can flow around, from the battery and back again.'],
        ['Battery', 'The part that pushes electricity round the circuit. It has a + end and a − end.'],
        ['Switch', 'A part that opens a gap in the circuit to turn it off, or closes the gap to turn it on.'],
        ['Conductor', 'A material that lets electricity flow through it, such as copper or iron.'],
        ['Insulator', 'A material that does not let electricity flow through it, such as plastic, wood or rubber.'],
        ['Bulb', 'A part that glows when electricity flows through it, turning electrical energy into light.'],
      ],
      id: [
        ['Rangkaian', 'Jalur lengkap yang dapat dialiri listrik, dari baterai dan kembali lagi.'],
        ['Baterai', 'Bagian yang mendorong listrik mengitari rangkaian. Baterai mempunyai ujung + dan ujung −.'],
        ['Sakelar', 'Bagian yang membuka celah pada rangkaian untuk mematikan, atau menutup celah untuk menyalakan.'],
        ['Konduktor', 'Bahan yang dapat dialiri listrik, seperti tembaga atau besi.'],
        ['Isolator', 'Bahan yang tidak dapat dialiri listrik, seperti plastik, kayu atau karet.'],
        ['Lampu', 'Bagian yang menyala ketika dialiri listrik, mengubah energi listrik menjadi cahaya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Only one wire is needed: electricity goes from the battery to the bulb and gets used up there.', 'Electricity must flow all the way round and back to the battery. With one wire the loop is broken and the bulb stays dark. The bulb uses energy, but the electricity itself keeps going round.'],
        ['The switch has to be next to the bulb to control it.', 'A switch anywhere in the loop works, because opening it breaks the whole path. In the sim the switch is on the far side from the bulb and still turns it off.'],
        ['All non-metals are insulators.', 'Most are, but pencil lead (graphite) is a non-metal that conducts, as the tester shows. And some things that look like metal, such as a painted surface, may not conduct where the paint covers them.'],
        ['Adding a second bulb makes the circuit brighter because there is more light.', 'There are two bulbs, but each one is dimmer, because the same battery push is shared between them. The total light is not more.'],
      ],
      id: [
        ['Cukup satu kabel: listrik pergi dari baterai ke lampu dan habis di sana.', 'Listrik harus mengalir memutar sampai kembali ke baterai. Dengan satu kabel jalurnya putus dan lampu tetap padam. Lampu memakai energi, tetapi listriknya sendiri terus berputar.'],
        ['Sakelar harus berada di sebelah lampu untuk mengendalikannya.', 'Sakelar di mana pun pada jalur tetap bekerja, karena membukanya memutus seluruh jalur. Di simulasi sakelar berada di sisi yang jauh dari lampu dan tetap bisa mematikannya.'],
        ['Semua bukan logam adalah isolator.', 'Kebanyakan memang begitu, tetapi isi pensil (grafit) adalah bukan logam yang menghantarkan listrik, seperti ditunjukkan penguji. Dan beberapa benda yang tampak seperti logam, misalnya permukaan yang dicat, mungkin tidak menghantar di bagian yang tertutup cat.'],
        ['Menambah lampu kedua membuat rangkaian lebih terang karena cahayanya lebih banyak.', 'Lampunya memang dua, tetapi tiap lampu lebih redup, karena dorongan baterai yang sama dibagi untuk keduanya. Cahaya totalnya tidak bertambah.'],
      ],
    },
    realWorld: {
      en: [
        'A torch is a simple circuit: batteries, a switch and a bulb in one loop inside the case.',
        'The wall switch in your bedroom breaks the loop to the ceiling light, which is why the light goes off even though the switch is far from the lamp.',
        'Electricians wear rubber-soled shoes and use tools with plastic handles because rubber and plastic are insulators.',
        'Old-style fairy lights wired in one loop all went out when a single bulb broke, because the break stopped the whole circuit.',
      ],
      id: [
        'Senter adalah rangkaian sederhana: baterai, sakelar dan lampu dalam satu jalur di dalam wadahnya.',
        'Sakelar di dinding kamarmu memutus jalur ke lampu langit-langit, karena itulah lampu padam walaupun sakelarnya jauh dari lampu.',
        'Tukang listrik memakai sepatu bersol karet dan alat bergagang plastik karena karet dan plastik adalah isolator.',
        'Lampu hias model lama yang dirangkai dalam satu jalur padam semua jika satu lampu putus, karena putusnya itu menghentikan seluruh rangkaian.',
      ],
    },
    questions: {
      en: [
        { q: 'The switch is ON and there is a piece of plastic in the gap. Will the bulb light? Why or why not?', a: 'No. Plastic is an insulator, so electricity cannot pass through it. The gap is still a break in the loop, just as if the switch were off. Swap in copper or iron and the loop is complete, so the bulb lights.' },
        { q: 'You add a second bulb to the loop. What happens to the brightness of the first bulb, and why?', a: 'It gets dimmer. The battery push is the same as before, but now it has to drive electricity through two bulbs instead of one, so each bulb gets less and glows less brightly.' },
        { q: 'With two bulbs glowing dimly, you add a second battery. What do you see, and what does that tell you?', a: 'Both bulbs get brighter again. Two batteries push harder than one, so more electricity flows round the loop and each bulb gets more energy to turn into light.' },
      ],
      id: [
        { q: 'Sakelar NYALA dan ada potongan plastik di celah. Apakah lampu menyala? Mengapa?', a: 'Tidak. Plastik adalah isolator, jadi listrik tidak bisa melewatinya. Celah itu tetap menjadi jalur yang putus, sama seperti jika sakelar mati. Ganti dengan tembaga atau besi, jalurnya lengkap dan lampu menyala.' },
        { q: 'Kamu menambah lampu kedua pada jalur. Apa yang terjadi pada terangnya lampu pertama, dan mengapa?', a: 'Lampu pertama menjadi lebih redup. Dorongan baterai sama seperti sebelumnya, tetapi kini harus mengalirkan listrik melewati dua lampu, jadi tiap lampu mendapat lebih sedikit dan menyala lebih redup.' },
        { q: 'Dengan dua lampu menyala redup, kamu menambah baterai kedua. Apa yang kamu lihat, dan apa artinya?', a: 'Kedua lampu menjadi lebih terang lagi. Dua baterai mendorong lebih kuat daripada satu, jadi lebih banyak listrik mengalir mengitari jalur dan tiap lampu mendapat lebih banyak energi untuk diubah menjadi cahaya.' },
      ],
    },
  },
};
