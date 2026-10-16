// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Name a push and a pull as forces, and say that a force is needed to start something moving.',
      'Show that a force can make a thing move faster, slow down, or change direction.',
      'Show that a force can change the shape of a soft thing, but not a hard thing.',
    ],
    id: [
      'Menyebut dorongan dan tarikan sebagai gaya, dan menyatakan bahwa gaya diperlukan untuk membuat benda mulai bergerak.',
      'Menunjukkan bahwa gaya dapat membuat benda bergerak lebih cepat, lebih lambat, atau berubah arah.',
      'Menunjukkan bahwa gaya dapat mengubah bentuk benda yang lunak, tetapi tidak benda yang keras.',
    ],
  },
  tryThis: {
    en: [
      'Tap the ball and press Push once. Now press Push again while it is still rolling. Does it go faster?',
      'Get the car rolling, then press Sideways. Which way does it go now?',
      'Press Squash on the clay, then on the ball, then on the car. Which one stays squashed? Which one springs back?',
      'Press Pull on a ball that is rolling to the right. What happens to its motion?',
    ],
    id: [
      'Ketuk bola lalu tekan Dorong sekali. Sekarang tekan Dorong lagi saat bola masih menggelinding. Apakah makin cepat?',
      'Buat mobil menggelinding, lalu tekan Samping. Ke arah mana mobil sekarang?',
      'Tekan Remas pada tanah liat, lalu pada bola, lalu pada mobil. Mana yang tetap gepeng? Mana yang kembali bulat?',
      'Tekan Tarik pada bola yang sedang menggelinding ke kanan. Apa yang terjadi pada geraknya?',
    ],
  },

  learn: {
    background: {
      en: [
        'A force is a push or a pull. You cannot see a force, but you can see what it does. When you push a toy car, it starts to move. When you pull a rope, the rope and whatever is tied to it come towards you. Every time something starts moving, stops, speeds up, slows down or turns, a force did it.',
        'In this sim, the table is seen from above, like a bird looking down. Push sends the thing to the right, Pull drags it to the left, and Sideways gives it a shove upwards on the screen. If the thing is already rolling, a sideways push makes it turn and roll a new way. A push the same way it is going makes it faster, and a pull against its motion makes it slower or even turns it back. The table has a little rim, so things bounce back when they reach the edge, and friction with the table slowly makes them stop.',
        'A force can also change the shape of a thing. Squash presses on the thing from above and below. The soft clay gets flat and stays flat. The rubber ball goes flat for a moment and then springs back round. The hard toy car does not change shape at all. Hard things need a very big force to change shape, and the small squash in this sim is not enough.',
      ],
      id: [
        'Gaya adalah dorongan atau tarikan. Gaya tidak bisa dilihat, tetapi akibatnya bisa dilihat. Saat kamu mendorong mobil mainan, mobil mulai bergerak. Saat kamu menarik tali, tali dan apa pun yang terikat padanya mendekat ke arahmu. Setiap kali sesuatu mulai bergerak, berhenti, makin cepat, makin lambat atau berbelok, ada gaya yang melakukannya.',
        'Di simulasi ini meja dilihat dari atas, seperti burung yang memandang ke bawah. Dorong mengirim benda ke kanan, Tarik menyeret benda ke kiri, dan Samping memberi sentakan ke arah atas layar. Jika benda sudah menggelinding, dorongan dari samping membuatnya berbelok dan menggelinding ke arah baru. Dorongan searah geraknya membuat benda makin cepat, dan tarikan melawan geraknya membuat benda makin lambat atau bahkan berbalik. Meja punya bibir kecil di tepinya, jadi benda memantul balik saat sampai di tepi, dan gesekan dengan meja perlahan membuatnya berhenti.',
        'Gaya juga dapat mengubah bentuk benda. Remas menekan benda dari atas dan bawah. Tanah liat yang lunak menjadi gepeng dan tetap gepeng. Bola karet gepeng sesaat lalu kembali bulat. Mobil mainan yang keras tidak berubah bentuk sama sekali. Benda keras membutuhkan gaya yang sangat besar untuk berubah bentuk, dan remasan kecil di simulasi ini tidak cukup.',
      ],
    },
    figure: {
      caption: {
        en: 'Three things a force can do. Left: a push makes the ball start to move and go faster. Middle: a sideways push makes the rolling car change direction. Right: a squash changes the shape of the clay.',
        id: 'Tiga hal yang dapat dilakukan gaya. Kiri: dorongan membuat bola mulai bergerak dan makin cepat. Tengah: dorongan dari samping membuat mobil yang menggelinding berubah arah. Kanan: remasan mengubah bentuk tanah liat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A push changes motion, a sideways push changes direction, a squash changes shape', 'Dorongan mengubah gerak, dorongan samping mengubah arah, remasan mengubah bentuk')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.h{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.a{fill:none;stroke-width:3}.d{fill:none;stroke:currentColor;stroke-width:1.2;stroke-dasharray:4 3;opacity:.6}</style>
  <defs>
    <marker id="fo" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#f97316"/></marker>
    <marker id="fg" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#10b981"/></marker>
  </defs>
  <text x="60" y="20" class="h">${L('MOTION', 'GERAK')}</text>
  <text x="180" y="20" class="h">${L('DIRECTION', 'ARAH')}</text>
  <text x="300" y="20" class="h">${L('SHAPE', 'BENTUK')}</text>
  <line x1="120" y1="10" x2="120" y2="200" class="d"/>
  <line x1="240" y1="10" x2="240" y2="200" class="d"/>
  <circle cx="62" cy="100" r="18" fill="#ef4444"/>
  <circle cx="56" cy="94" r="5" fill="#fca5a5"/>
  <line x1="16" y1="100" x2="38" y2="100" class="a" stroke="#f97316" marker-end="url(#fo)"/>
  <line x1="86" y1="100" x2="108" y2="100" class="a" stroke="#10b981" marker-end="url(#fg)"/>
  <text x="60" y="140" text-anchor="middle">${L('push', 'dorong')} → ${L('rolls faster', 'makin cepat')}</text>
  <rect x="160" y="88" width="40" height="22" rx="5" fill="#3b82f6"/>
  <circle cx="170" cy="112" r="5" fill="#1f2937"/><circle cx="190" cy="112" r="5" fill="#1f2937"/>
  <line x1="180" y1="150" x2="180" y2="122" class="a" stroke="#f97316" marker-end="url(#fo)"/>
  <line x1="205" y1="99" x2="228" y2="99" class="d"/>
  <line x1="205" y1="95" x2="226" y2="74" class="a" stroke="#10b981" marker-end="url(#fg)"/>
  <text x="180" y="172" text-anchor="middle">${L('sideways push', 'dorong samping')} → ${L('turns', 'berbelok')}</text>
  <ellipse cx="300" cy="104" rx="30" ry="11" fill="#a16207"/>
  <ellipse cx="300" cy="104" rx="16" ry="20" fill="none" stroke="#a16207" stroke-width="1.5" stroke-dasharray="3 3"/>
  <line x1="300" y1="56" x2="300" y2="86" class="a" stroke="#f97316" marker-end="url(#fo)"/>
  <line x1="300" y1="150" x2="300" y2="122" class="a" stroke="#f97316" marker-end="url(#fo)"/>
  <text x="300" y="172" text-anchor="middle">${L('squash', 'remas')} → ${L('goes flat', 'jadi gepeng')}</text>
  <text x="180" y="215" text-anchor="middle" fill="#f97316">${L('orange = the force (push or pull)', 'oranye = gaya (dorongan atau tarikan)')}</text>
  <text x="180" y="232" text-anchor="middle" fill="#10b981">${L('green = how the thing moves afterwards', 'hijau = gerak benda sesudahnya')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A force is a push or a pull.',
        'A force can make a still thing start to move.',
        'A force can make a moving thing go faster, go slower, stop, or change direction.',
        'A force can change the shape of a soft thing, like clay. Hard things keep their shape.',
        'Friction is a force from the table that slowly makes rolling things stop.',
      ],
      id: [
        'Gaya adalah dorongan atau tarikan.',
        'Gaya dapat membuat benda diam mulai bergerak.',
        'Gaya dapat membuat benda yang bergerak makin cepat, makin lambat, berhenti, atau berubah arah.',
        'Gaya dapat mengubah bentuk benda lunak, seperti tanah liat. Benda keras tetap bentuknya.',
        'Gesekan adalah gaya dari meja yang perlahan membuat benda yang menggelinding berhenti.',
      ],
    },
    vocabulary: {
      en: [
        ['Force', 'A push or a pull on a thing.'],
        ['Push', 'A force that moves a thing away from you.'],
        ['Pull', 'A force that moves a thing towards you.'],
        ['Direction', 'The way a thing is going, like left, right or up.'],
        ['Friction', 'A force that slows things down when they rub against a surface.'],
      ],
      id: [
        ['Gaya', 'Dorongan atau tarikan pada suatu benda.'],
        ['Dorongan', 'Gaya yang membuat benda menjauh darimu.'],
        ['Tarikan', 'Gaya yang membuat benda mendekat ke arahmu.'],
        ['Arah', 'Ke mana benda bergerak, misalnya kiri, kanan atau atas.'],
        ['Gesekan', 'Gaya yang memperlambat benda saat bergesekan dengan permukaan.'],
      ],
    },
    misconceptions: {
      en: [
        ['A thing stops by itself when you stop pushing.', 'It stops because another force, friction with the table, slows it down. On very smooth ice a push keeps a puck sliding for a long time.'],
        ['Only big things need a force to move.', 'Everything needs a force to start moving, even a feather. Light things just need a smaller force.'],
        ['A force always makes things move.', 'A force can also change shape without moving the thing, like squashing clay that stays in place.'],
      ],
      id: [
        ['Benda berhenti sendiri saat kita berhenti mendorong.', 'Benda berhenti karena ada gaya lain, yaitu gesekan dengan meja, yang memperlambatnya. Di atas es yang sangat licin, satu dorongan membuat keping meluncur lama sekali.'],
        ['Hanya benda besar yang butuh gaya untuk bergerak.', 'Semua benda butuh gaya untuk mulai bergerak, bahkan bulu ayam. Benda ringan hanya butuh gaya yang lebih kecil.'],
        ['Gaya selalu membuat benda bergerak.', 'Gaya juga bisa mengubah bentuk tanpa memindahkan benda, seperti meremas tanah liat yang tetap di tempatnya.'],
      ],
    },
    realWorld: {
      en: [
        'Kicking a football is a push that starts it moving; a second kick while it rolls makes it faster.',
        'A goalkeeper slapping a ball sideways changes its direction so it misses the goal.',
        'A potter pushes and pulls soft clay to change its shape into a bowl.',
        'Pulling a wagon makes it come towards you; pushing a shopping trolley sends it away.',
      ],
      id: [
        'Menendang bola sepak adalah dorongan yang membuatnya mulai bergerak; tendangan kedua saat bola menggelinding membuatnya makin cepat.',
        'Penjaga gawang yang menepis bola ke samping mengubah arahnya sehingga bola tidak masuk gawang.',
        'Perajin gerabah mendorong dan menarik tanah liat lunak untuk mengubah bentuknya menjadi mangkuk.',
        'Menarik gerobak membuatnya mendekat ke arahmu; mendorong troli belanja membuatnya menjauh.',
      ],
    },
    questions: {
      en: [
        { q: 'The ball is sitting still. You press Push. What changes?', a: 'Its motion. It was still and now it rolls to the right. A force made it start moving.' },
        { q: 'The car is rolling to the right. You press Sideways. What changes?', a: 'Its direction. It keeps rolling but now it goes up and to the right instead of straight right.' },
        { q: 'You press Squash on the ball and on the car. Why does the ball change but the car does not?', a: 'The ball is soft rubber, so a small force can change its shape, and it springs back. The car is hard plastic, so a small force cannot change its shape.' },
      ],
      id: [
        { q: 'Bola sedang diam. Kamu menekan Dorong. Apa yang berubah?', a: 'Geraknya. Tadinya diam dan sekarang menggelinding ke kanan. Gaya membuatnya mulai bergerak.' },
        { q: 'Mobil menggelinding ke kanan. Kamu menekan Samping. Apa yang berubah?', a: 'Arahnya. Mobil tetap menggelinding tetapi sekarang ke arah atas dan kanan, bukan lurus ke kanan.' },
        { q: 'Kamu menekan Remas pada bola dan pada mobil. Mengapa bola berubah tetapi mobil tidak?', a: 'Bola terbuat dari karet lunak, jadi gaya kecil bisa mengubah bentuknya, dan bola kembali bulat. Mobil terbuat dari plastik keras, jadi gaya kecil tidak bisa mengubah bentuknya.' },
      ],
    },
  },
};
