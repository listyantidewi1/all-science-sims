// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe conduction as heat moving through a solid from the hot part to the cold part.',
      'Compare materials: metals conduct heat quickly (good conductors); wood and plastic conduct it slowly (insulators).',
      'Explain how the temperature of the water changes how fast heat travels along a spoon.',
    ],
    id: [
      'Menjelaskan konduksi sebagai perpindahan panas melalui benda padat dari bagian panas ke bagian dingin.',
      'Membandingkan bahan: logam menghantarkan panas dengan cepat (konduktor yang baik); kayu dan plastik menghantarkannya lambat (isolator).',
      'Menjelaskan bagaimana suhu air mengubah kecepatan panas merambat di sepanjang sendok.',
    ],
  },
  tryThis: {
    en: [
      'Press Start with the water at 90 °C. Which butter falls first? Write down the time.',
      'Watch the colour on the wooden and plastic spoons. How far up do they warm after one minute?',
      'Set the water to 60 °C and press Start again. Does the metal spoon\'s butter still fall? Is it faster or slower?',
      'Try 40 °C. Does any butter fall now? Why not?',
    ],
    id: [
      'Tekan Mulai dengan air 90 °C. Mentega mana yang jatuh lebih dulu? Tulis waktunya.',
      'Perhatikan warna pada sendok kayu dan plastik. Sampai mana sendok itu menghangat setelah satu menit?',
      'Atur air ke 60 °C dan tekan Mulai lagi. Apakah mentega sendok logam masih jatuh? Lebih cepat atau lebih lambat?',
      'Coba 40 °C. Apakah ada mentega yang jatuh sekarang? Mengapa tidak?',
    ],
  },

  learn: {
    background: {
      en: [
        'Heat moves from hot things to cold things. When a solid object touches something hot, the heat travels through the object from the hot part to the cold part. This is called conduction. The tiny particles in the hot part jiggle faster and bump their neighbours, which start to jiggle faster too, and so the heat spreads along. Nothing flows; the particles stay in place, only the jiggling is passed on.',
        'Different materials conduct heat at very different speeds. Metals are good conductors: heat races along a metal spoon, and in this sim the handle glows red within seconds and the butter melts and slides off. Wood and plastic are poor conductors, also called insulators. Heat creeps up them so slowly that the handle barely warms and the butter stays put. In the sim each spoon is coloured along its length: its own colour means cool, red means hot. The number by each butter pat is the temperature right there.',
        'The hotter the water, the bigger the difference between the hot end and the cold end, and the faster heat flows. With 90 °C water the metal spoon\'s butter falls quickly. With 60 °C water it still falls, but later. With 40 °C water the handle never reaches the butter\'s melting point of about 35 °C, because the handle also loses heat to the air around it. The sim speeds things up a little compared with a real kitchen, but the order and the pattern are the same as in a real experiment.',
      ],
      id: [
        'Panas berpindah dari benda panas ke benda dingin. Saat benda padat menyentuh sesuatu yang panas, panas merambat melalui benda itu dari bagian panas ke bagian dingin. Ini disebut konduksi. Partikel-partikel kecil di bagian panas bergetar lebih cepat dan menumbuk tetangganya, yang ikut bergetar lebih cepat, dan begitulah panas menyebar. Tidak ada yang mengalir; partikelnya tetap di tempat, hanya getarannya yang diteruskan.',
        'Bahan yang berbeda menghantarkan panas dengan kecepatan yang sangat berbeda. Logam adalah konduktor yang baik: panas melaju di sepanjang sendok logam, dan di simulasi ini gagangnya memerah dalam hitungan detik lalu menteganya meleleh dan jatuh. Kayu dan plastik adalah konduktor yang buruk, disebut juga isolator. Panas merambat di dalamnya begitu lambat sehingga gagangnya hampir tidak menghangat dan menteganya tetap menempel. Di simulasi, tiap sendok diwarnai di sepanjang gagangnya: warna aslinya berarti dingin, merah berarti panas. Angka di dekat tiap mentega adalah suhu di tempat itu.',
        'Makin panas airnya, makin besar perbedaan antara ujung panas dan ujung dingin, dan makin cepat panas mengalir. Dengan air 90 °C, mentega sendok logam cepat jatuh. Dengan air 60 °C mentega masih jatuh, tetapi lebih lama. Dengan air 40 °C gagang tidak pernah mencapai titik leleh mentega sekitar 35 °C, karena gagang juga melepaskan panas ke udara di sekitarnya. Simulasi ini sedikit mempercepat kejadian dibanding dapur sungguhan, tetapi urutan dan polanya sama seperti percobaan nyata.',
      ],
    },
    figure: {
      caption: {
        en: 'Heat travelling along a spoon by conduction. The bowl sits in hot water; jiggling particles pass their energy to their neighbours. A metal spoon (left) lets heat race up to the butter, which melts. A wooden spoon (right) is an insulator: the heat barely reaches the handle.',
        id: 'Panas merambat di sepanjang sendok secara konduksi. Mangkuk sendok berada di air panas; partikel yang bergetar meneruskan energinya ke tetangganya. Sendok logam (kiri) membiarkan panas melaju sampai ke mentega yang kemudian meleleh. Sendok kayu (kanan) adalah isolator: panasnya hampir tidak sampai ke gagang.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Heat conduction along a metal spoon and a wooden spoon in hot water', 'Konduksi panas di sepanjang sendok logam dan sendok kayu dalam air panas')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.h{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.c{fill:none;stroke:currentColor;stroke-width:1.5}</style>
  <defs>
    <linearGradient id="hotMetal" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ef4444"/><stop offset="0.55" stop-color="#f97316"/><stop offset="1" stop-color="#fbbf24"/></linearGradient>
    <linearGradient id="hotWood" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ef4444"/><stop offset="0.25" stop-color="#a16207"/><stop offset="1" stop-color="#a16207"/></linearGradient>
  </defs>
  <text x="90" y="18" class="h">${L('metal spoon', 'sendok logam')}</text>
  <text x="270" y="18" class="h">${L('wooden spoon', 'sendok kayu')}</text>
  <rect x="40" y="150" width="100" height="70" rx="8" fill="#38bdf8" opacity=".35"/>
  <rect x="40" y="150" width="100" height="70" rx="8" class="c"/>
  <rect x="220" y="150" width="100" height="70" rx="8" fill="#38bdf8" opacity=".35"/>
  <rect x="220" y="150" width="100" height="70" rx="8" class="c"/>
  <rect x="84" y="40" width="12" height="160" rx="5" fill="url(#hotMetal)"/>
  <ellipse cx="90" cy="200" rx="16" ry="10" fill="#ef4444"/>
  <rect x="264" y="40" width="12" height="160" rx="5" fill="url(#hotWood)"/>
  <ellipse cx="270" cy="200" rx="16" ry="10" fill="#ef4444"/>
  <path d="M78 70 C70 76 80 84 72 92 C64 98 86 100 90 104 L108 104 C112 96 104 84 108 70 Z" fill="#fde68a"/>
  <path d="M98 104 C96 112 100 120 97 126" stroke="#fde68a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="128" y="78">${L('butter melts', 'mentega meleleh')}</text>
  <rect x="258" y="62" width="24" height="18" rx="3" fill="#fde68a"/>
  <text x="310" y="78">${L('butter stays', 'mentega tetap')}</text>
  <g fill="currentColor" opacity=".7">
    <circle cx="90" cy="135" r="2"/><circle cx="90" cy="121" r="2"/><circle cx="90" cy="107" r="2"/><circle cx="90" cy="93" r="2"/>
    <circle cx="270" cy="135" r="2"/><circle cx="270" cy="121" r="2"/>
  </g>
  <path d="M70 185 L70 60" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#ar)"/>
  <path d="M250 185 L250 130" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#ar)" stroke-dasharray="4 3"/>
  <defs><marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#ef4444"/></marker></defs>
  <text x="90" y="236">${L('hot water 90 °C', 'air panas 90 °C')}</text>
  <text x="270" y="236">${L('hot water 90 °C', 'air panas 90 °C')}</text>
  <text x="180" y="130" fill="#ef4444">${L('heat flows', 'panas mengalir')}</text>
  <text x="180" y="144" fill="#ef4444">${L('hot → cold', 'panas → dingin')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Heat moves from hot to cold. Through a solid it moves by conduction.',
        'In conduction the particles stay in place; they pass on their jiggling to their neighbours.',
        'Metals are good conductors: heat travels through them quickly.',
        'Wood, plastic, cloth and air are insulators: heat travels through them very slowly.',
        'A bigger temperature difference makes heat flow faster.',
      ],
      id: [
        'Panas berpindah dari yang panas ke yang dingin. Melalui benda padat, panas berpindah secara konduksi.',
        'Dalam konduksi, partikel tetap di tempat; mereka meneruskan getarannya ke tetangganya.',
        'Logam adalah konduktor yang baik: panas merambat melaluinya dengan cepat.',
        'Kayu, plastik, kain dan udara adalah isolator: panas merambat melaluinya sangat lambat.',
        'Perbedaan suhu yang lebih besar membuat panas mengalir lebih cepat.',
      ],
    },
    vocabulary: {
      en: [
        ['Conduction', 'Heat moving through a solid from its hot part to its cold part.'],
        ['Conductor', 'A material that lets heat through quickly, like iron, copper or aluminium.'],
        ['Insulator', 'A material that lets heat through very slowly, like wood, plastic or wool.'],
        ['Temperature', 'How hot something is, measured in degrees Celsius (°C).'],
        ['Melting point', 'The temperature at which a solid turns into a liquid. Butter melts at about 35 °C.'],
      ],
      id: [
        ['Konduksi', 'Perpindahan panas melalui benda padat dari bagian panas ke bagian dingin.'],
        ['Konduktor', 'Bahan yang menghantarkan panas dengan cepat, seperti besi, tembaga atau aluminium.'],
        ['Isolator', 'Bahan yang menghantarkan panas sangat lambat, seperti kayu, plastik atau wol.'],
        ['Suhu', 'Seberapa panas suatu benda, diukur dalam derajat Celsius (°C).'],
        ['Titik leleh', 'Suhu ketika benda padat berubah menjadi cair. Mentega meleleh pada sekitar 35 °C.'],
      ],
    },
    misconceptions: {
      en: [
        ['Metal is colder than wood.', 'A metal spoon and a wooden spoon on the same table are the same temperature. Metal feels colder because it conducts heat away from your hand quickly.'],
        ['Heat flows through the spoon like water flows through a pipe.', 'Nothing moves along the spoon. The particles stay where they are and only pass on their jiggling to the next particle.'],
        ['An insulator makes things warm.', 'An insulator does not make heat. It only slows heat down, so a hot drink stays hot longer and a cold drink stays cold longer.'],
      ],
      id: [
        ['Logam lebih dingin daripada kayu.', 'Sendok logam dan sendok kayu di meja yang sama bersuhu sama. Logam terasa lebih dingin karena menghantarkan panas dari tanganmu dengan cepat.'],
        ['Panas mengalir melalui sendok seperti air mengalir melalui pipa.', 'Tidak ada yang bergerak di sepanjang sendok. Partikel tetap di tempatnya dan hanya meneruskan getarannya ke partikel berikutnya.'],
        ['Isolator membuat benda menjadi hangat.', 'Isolator tidak membuat panas. Isolator hanya memperlambat panas, sehingga minuman panas tetap panas lebih lama dan minuman dingin tetap dingin lebih lama.'],
      ],
    },
    realWorld: {
      en: [
        'Cooking pots are metal so heat passes quickly into the food, but their handles are plastic or wood so you can hold them.',
        'A thick cloth or oven glove is an insulator that protects your hand from a hot tray.',
        'A metal spoon left in a cup of hot tea soon feels hot at the handle; a plastic spoon does not.',
        'Houses in cold countries have walls filled with fluffy insulation to keep heat from leaking out.',
      ],
      id: [
        'Panci terbuat dari logam agar panas cepat masuk ke makanan, tetapi gagangnya dari plastik atau kayu supaya bisa dipegang.',
        'Kain tebal atau sarung tangan oven adalah isolator yang melindungi tanganmu dari loyang panas.',
        'Sendok logam yang ditinggalkan dalam cangkir teh panas segera terasa panas di gagangnya; sendok plastik tidak.',
        'Rumah di negara dingin memiliki dinding berisi bahan isolasi yang lembut agar panas tidak bocor keluar.',
      ],
    },
    questions: {
      en: [
        { q: 'Which butter pat fell first, and why?', a: 'The one on the metal spoon. Metal is a good conductor, so heat travelled quickly from the hot water up the handle to the butter.' },
        { q: 'The butter on the wooden spoon never fell. Does that mean no heat went into the wooden spoon?', a: 'No. Some heat did go in, and the bottom of the spoon warmed up (you can see a little colour). But wood is an insulator, so the heat moved so slowly that the handle also lost heat to the air and never reached 35 °C.' },
        { q: 'With 60 °C water the metal spoon\'s butter took longer to fall than with 90 °C water. Why?', a: 'Heat flows faster when the temperature difference is bigger. With cooler water the handle warmed more slowly, so it took longer to reach the melting point.' },
      ],
      id: [
        { q: 'Mentega mana yang jatuh lebih dulu, dan mengapa?', a: 'Mentega di sendok logam. Logam adalah konduktor yang baik, jadi panas merambat cepat dari air panas naik ke gagang sampai ke mentega.' },
        { q: 'Mentega di sendok kayu tidak pernah jatuh. Apakah itu berarti tidak ada panas yang masuk ke sendok kayu?', a: 'Tidak. Sebagian panas masuk, dan bagian bawah sendok menghangat (terlihat sedikit berwarna). Tetapi kayu adalah isolator, jadi panasnya merambat begitu lambat sehingga gagang juga melepaskan panas ke udara dan tidak pernah mencapai 35 °C.' },
        { q: 'Dengan air 60 °C mentega sendok logam butuh waktu lebih lama untuk jatuh dibanding air 90 °C. Mengapa?', a: 'Panas mengalir lebih cepat saat perbedaan suhu lebih besar. Dengan air yang lebih dingin, gagang menghangat lebih lambat, jadi butuh waktu lebih lama untuk mencapai titik leleh.' },
      ],
    },
  },
};
