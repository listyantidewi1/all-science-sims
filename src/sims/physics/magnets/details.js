// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe that every magnet has two poles, and that like poles push apart while unlike poles pull together.',
      'Sort everyday objects into "sticks to a magnet" and "does not stick", and notice that only iron and steel stick.',
      'Recognise the pattern that iron filings make around a bar magnet as a picture of its invisible field.',
    ],
    id: [
      'Menjelaskan bahwa setiap magnet memiliki dua kutub, kutub sejenis saling tolak dan kutub berbeda saling tarik.',
      'Mengelompokkan benda sehari-hari menjadi "menempel pada magnet" dan "tidak menempel", serta menyadari bahwa hanya besi dan baja yang menempel.',
      'Mengenali pola serbuk besi di sekitar magnet batang sebagai gambaran medan magnet yang tak terlihat.',
    ],
  },
  tryThis: {
    en: [
      'Before each object, ask children to vote: will it stick? Record their guess, then test it.',
      'Push the red end of one magnet toward the red end of the other. Then press Flip and try again.',
      'Turn on the iron filings. Where are the lines most crowded? That is where the magnet is strongest.',
    ],
    id: [
      'Sebelum setiap benda, minta anak memilih: akan menempel atau tidak? Catat tebakan mereka, lalu uji.',
      'Dorong ujung merah satu magnet ke ujung merah magnet lainnya. Lalu tekan Balik dan coba lagi.',
      'Nyalakan serbuk besi. Di mana garisnya paling rapat? Di sanalah magnet paling kuat.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A magnet is a piece of metal that can pull on iron without touching it. Every magnet has two ends, called poles. One end is the north pole and the other is the south pole. In this sim the north pole is red and marked N, and the south pole is blue and marked S. The poles are where the magnet is strongest.',
        'Two magnets push or pull on each other. A north pole and a south pole pull together, and they snap tight when they get close. Two north poles push each other away, and so do two south poles. The push and pull get stronger as the magnets get closer. In the sim the magnets only move each other when they are close and lined up end to end, and you can press Flip to turn a magnet around.',
        'A magnet does not stick to everything. Drag a magnet over the tray and only the iron nail and the steel paper clip jump up. Steel is made mostly of iron, so it sticks too. The copper coin, the aluminium can, the plastic toy, the wooden block and the rubber band do not stick. The iron filings button draws lines that show the invisible magnetic field around the magnets. The lines are most crowded near the poles, where the pull is strongest.',
      ],
      id: [
        'Magnet adalah logam yang dapat menarik besi tanpa menyentuhnya. Setiap magnet mempunyai dua ujung yang disebut kutub. Satu ujung adalah kutub utara dan ujung lainnya kutub selatan. Di simulasi ini kutub utara berwarna merah dan bertanda N (utara), dan kutub selatan berwarna biru dan bertanda S (selatan). Di kutub inilah magnet paling kuat.',
        'Dua magnet saling mendorong atau saling menarik. Kutub utara dan kutub selatan saling menarik, dan keduanya menempel rapat ketika sudah dekat. Dua kutub utara saling mendorong, begitu juga dua kutub selatan. Dorongan dan tarikan makin kuat ketika magnet makin dekat. Di simulasi ini magnet hanya saling menggerakkan jika sudah dekat dan sejajar ujung ke ujung, dan kamu bisa menekan Balik untuk memutar magnet.',
        'Magnet tidak menempel pada semua benda. Geser magnet ke atas nampan, maka hanya paku besi dan penjepit kertas baja yang melompat menempel. Baja sebagian besar terbuat dari besi, jadi baja juga menempel. Koin tembaga, kaleng aluminium, mainan plastik, balok kayu dan karet gelang tidak menempel. Tombol serbuk besi menggambar garis-garis yang menunjukkan medan magnet tak terlihat di sekitar magnet. Garisnya paling rapat di dekat kutub, tempat tarikannya paling kuat.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: a north pole facing a south pole pulls the magnets together. Middle: two north poles facing each other push the magnets apart. Bottom: the invisible field around a bar magnet, drawn as lines that loop from N round to S and crowd together at the poles.',
        id: 'Atas: kutub utara yang berhadapan dengan kutub selatan menarik kedua magnet saling mendekat. Tengah: dua kutub utara yang berhadapan mendorong kedua magnet saling menjauh. Bawah: medan tak terlihat di sekitar magnet batang, digambar sebagai garis yang melingkar dari N ke S dan merapat di kutub.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Bar magnets attracting, repelling, and their field lines', 'Magnet batang saling tarik, saling tolak, dan garis medannya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.p{font:bold 13px system-ui,sans-serif;fill:#fff;text-anchor:middle}.m{fill:none;stroke:currentColor;stroke-width:1.3}.a{stroke-width:2.5;fill:none}.fl{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.55}</style>
  <defs>
    <marker id="g" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#10b981"/></marker>
    <marker id="v" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#8b5cf6"/></marker>
  </defs>
  <rect x="30" y="34" width="50" height="26" fill="#ef4444"/><rect x="80" y="34" width="50" height="26" fill="#3b82f6"/>
  <rect x="30" y="34" width="100" height="26" rx="4" class="m"/>
  <text x="55" y="52" class="p">N</text><text x="105" y="52" class="p">S</text>
  <rect x="230" y="34" width="50" height="26" fill="#ef4444"/><rect x="280" y="34" width="50" height="26" fill="#3b82f6"/>
  <rect x="230" y="34" width="100" height="26" rx="4" class="m"/>
  <text x="255" y="52" class="p">N</text><text x="305" y="52" class="p">S</text>
  <line x1="140" y1="47" x2="172" y2="47" class="a" stroke="#10b981" marker-end="url(#g)"/>
  <line x1="220" y1="47" x2="188" y2="47" class="a" stroke="#10b981" marker-end="url(#g)"/>
  <text x="180" y="78" text-anchor="middle" fill="#10b981">${L('different poles pull together', 'kutub berbeda saling menarik')}</text>
  <rect x="30" y="104" width="50" height="26" fill="#3b82f6"/><rect x="80" y="104" width="50" height="26" fill="#ef4444"/>
  <rect x="30" y="104" width="100" height="26" rx="4" class="m"/>
  <text x="55" y="122" class="p">S</text><text x="105" y="122" class="p">N</text>
  <rect x="230" y="104" width="50" height="26" fill="#ef4444"/><rect x="280" y="104" width="50" height="26" fill="#3b82f6"/>
  <rect x="230" y="104" width="100" height="26" rx="4" class="m"/>
  <text x="255" y="122" class="p">N</text><text x="305" y="122" class="p">S</text>
  <line x1="170" y1="117" x2="140" y2="117" class="a" stroke="#8b5cf6" marker-end="url(#v)"/>
  <line x1="190" y1="117" x2="220" y2="117" class="a" stroke="#8b5cf6" marker-end="url(#v)"/>
  <text x="180" y="148" text-anchor="middle" fill="#8b5cf6">${L('same poles push apart', 'kutub sejenis saling mendorong')}</text>
  <path d="M130 196 C100 160 260 160 230 196" class="fl"/>
  <path d="M130 196 C70 145 290 145 230 196" class="fl"/>
  <path d="M130 196 C40 130 320 130 230 196" class="fl"/>
  <path d="M130 196 C100 232 260 232 230 196" class="fl"/>
  <path d="M130 196 C70 236 290 236 230 196" class="fl"/>
  <rect x="130" y="184" width="50" height="24" fill="#ef4444"/><rect x="180" y="184" width="50" height="24" fill="#3b82f6"/>
  <rect x="130" y="184" width="100" height="24" rx="4" class="m"/>
  <text x="155" y="201" class="p">N</text><text x="205" y="201" class="p">S</text>
  <text x="18" y="170">${L('field lines: strongest at the poles', 'garis medan: paling kuat di kutub')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Every magnet has two poles, north and south, and it is strongest at the poles.',
        'A north pole and a south pole pull together; two north poles or two south poles push apart.',
        'The pull or push gets stronger as the magnets get closer.',
        'Magnets stick to iron and to steel, which is made from iron; they do not stick to copper, aluminium, plastic, wood or rubber.',
        'The space around a magnet where it can pull is called its magnetic field, and iron filings show its shape.',
      ],
      id: [
        'Setiap magnet mempunyai dua kutub, utara dan selatan, dan paling kuat di kutubnya.',
        'Kutub utara dan kutub selatan saling menarik; dua kutub utara atau dua kutub selatan saling mendorong.',
        'Tarikan atau dorongan makin kuat ketika magnet makin dekat.',
        'Magnet menempel pada besi dan baja, yang terbuat dari besi; magnet tidak menempel pada tembaga, aluminium, plastik, kayu atau karet.',
        'Ruang di sekitar magnet tempat magnet bisa menarik disebut medan magnet, dan serbuk besi memperlihatkan bentuknya.',
      ],
    },
    vocabulary: {
      en: [
        ['Magnet', 'An object that can pull iron and steel towards it without touching them.'],
        ['Pole', 'One of the two ends of a magnet, north (N) or south (S), where the magnet is strongest.'],
        ['Attract', 'To pull together. A north pole and a south pole attract each other.'],
        ['Repel', 'To push apart. Two north poles repel each other, and so do two south poles.'],
        ['Magnetic field', 'The invisible space around a magnet where it can push or pull. Iron filings line up to show its shape.'],
      ],
      id: [
        ['Magnet', 'Benda yang dapat menarik besi dan baja ke arahnya tanpa menyentuhnya.'],
        ['Kutub', 'Salah satu dari dua ujung magnet, utara (N) atau selatan (S), tempat magnet paling kuat.'],
        ['Menarik', 'Saling mendekat. Kutub utara dan kutub selatan saling menarik.'],
        ['Menolak', 'Saling mendorong menjauh. Dua kutub utara saling menolak, begitu juga dua kutub selatan.'],
        ['Medan magnet', 'Ruang tak terlihat di sekitar magnet tempat magnet bisa mendorong atau menarik. Serbuk besi berbaris memperlihatkan bentuknya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Magnets stick to all metals.', 'They do not. In the sim the copper coin and the aluminium can are metal but do not stick. Magnets stick to iron and steel, and to a few other metals such as nickel, but not to copper, aluminium, gold or silver.'],
        ['Bigger objects are pulled more strongly, so a big wooden block should stick better than a small nail.', 'Size does not matter; the material does. A tiny iron nail sticks, but a huge wooden block never will.'],
        ['The red end is the "strong" end and the blue end is the "weak" end.', 'Both poles are equally strong. The colours only tell you which end is north and which is south.'],
        ['A magnet has to touch something to pull it.', 'A magnet pulls through empty space, and even through paper or plastic. In the sim the clip jumps to the magnet before they touch.'],
      ],
      id: [
        ['Magnet menempel pada semua logam.', 'Tidak. Di simulasi, koin tembaga dan kaleng aluminium adalah logam tetapi tidak menempel. Magnet menempel pada besi dan baja, dan pada beberapa logam lain seperti nikel, tetapi tidak pada tembaga, aluminium, emas atau perak.'],
        ['Benda yang lebih besar ditarik lebih kuat, jadi balok kayu besar seharusnya lebih menempel daripada paku kecil.', 'Ukuran tidak penting; bahannya yang penting. Paku besi yang kecil menempel, tetapi balok kayu sebesar apa pun tidak akan menempel.'],
        ['Ujung merah adalah ujung yang "kuat" dan ujung biru ujung yang "lemah".', 'Kedua kutub sama kuatnya. Warna hanya menunjukkan ujung mana yang utara dan mana yang selatan.'],
        ['Magnet harus menyentuh benda untuk menariknya.', 'Magnet menarik melalui ruang kosong, bahkan menembus kertas atau plastik. Di simulasi, penjepit kertas melompat ke magnet sebelum keduanya bersentuhan.'],
      ],
    },
    realWorld: {
      en: [
        'Fridge magnets hold notes on the door because the door is made of steel.',
        'A compass needle is a tiny magnet that turns to line up with the Earth\'s own magnetic field, so it always points north.',
        'Scrapyards use huge electromagnets on cranes to lift iron and steel out of piles of mixed rubbish.',
        'Magnetic clasps on bags, cupboard door catches and phone cases use the pull between unlike poles to snap shut.',
      ],
      id: [
        'Magnet kulkas dapat menahan catatan di pintu karena pintunya terbuat dari baja.',
        'Jarum kompas adalah magnet kecil yang berputar mengikuti medan magnet Bumi, sehingga selalu menunjuk ke utara.',
        'Tempat rongsokan memakai elektromagnet raksasa di derek untuk mengangkat besi dan baja dari tumpukan sampah campuran.',
        'Pengait magnet pada tas, penutup pintu lemari dan sarung ponsel memanfaatkan tarikan antara kutub berbeda agar menutup rapat.',
      ],
    },
    questions: {
      en: [
        { q: 'You slide the blue end of magnet A towards the red end of magnet B. What happens, and why?', a: 'They pull together and snap tight. Blue is a south pole and red is a north pole, and different poles attract each other.' },
        { q: 'Now press Flip on magnet A and try again. What happens this time?', a: 'They push apart. Flipping A puts its red (north) end facing B\'s red (north) end. Same poles repel, so the free magnet slides away.' },
        { q: 'Look at your Does it stick? table. Which objects stuck, and what do they have in common?', a: 'Only the iron nail and the steel paper clip stuck. Both contain iron. The copper coin and aluminium can are metal but have no iron, so they did not stick, and neither did plastic, wood or rubber.' },
      ],
      id: [
        { q: 'Kamu menggeser ujung biru magnet A ke arah ujung merah magnet B. Apa yang terjadi, dan mengapa?', a: 'Keduanya saling menarik dan menempel rapat. Biru adalah kutub selatan dan merah kutub utara, dan kutub yang berbeda saling menarik.' },
        { q: 'Sekarang tekan Balik pada magnet A dan coba lagi. Apa yang terjadi kali ini?', a: 'Keduanya saling mendorong menjauh. Membalik A membuat ujung merahnya (utara) berhadapan dengan ujung merah (utara) B. Kutub sejenis saling menolak, sehingga magnet yang bebas bergeser menjauh.' },
        { q: 'Lihat tabel Apakah menempel? milikmu. Benda mana yang menempel, dan apa persamaannya?', a: 'Hanya paku besi dan penjepit kertas baja yang menempel. Keduanya mengandung besi. Koin tembaga dan kaleng aluminium adalah logam tetapi tidak mengandung besi, jadi tidak menempel, begitu juga plastik, kayu dan karet.' },
      ],
    },
  },
};
