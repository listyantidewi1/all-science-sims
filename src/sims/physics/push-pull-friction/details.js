// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Recognise that a push starts the car moving and friction slows it down.',
      'Compare surfaces: rough surfaces have more friction, so the car stops sooner.',
      'Change one thing at a time (surface or push) and measure the distance with a ruler.',
    ],
    id: [
      'Mengenali bahwa dorongan membuat mobil bergerak dan gesekan memperlambatnya.',
      'Membandingkan permukaan: permukaan kasar memiliki gesekan lebih besar, sehingga mobil berhenti lebih cepat.',
      'Mengubah satu hal saja (permukaan atau dorongan) dan mengukur jarak dengan penggaris.',
    ],
  },
  tryThis: {
    en: [
      'Keep the push medium. Try all four surfaces. Which one lets the car go farthest? Why?',
      'Keep the surface on carpet. Try small, medium and big pushes. Guess the distance before you press Push.',
      'Add the ramp. Does the car go farther than with a big push alone?',
    ],
    id: [
      'Pertahankan dorongan sedang. Coba keempat permukaan. Mana yang membuat mobil paling jauh? Mengapa?',
      'Pertahankan permukaan karpet. Coba dorongan kecil, sedang, dan besar. Tebak jaraknya sebelum menekan Dorong.',
      'Tambahkan tanjakan. Apakah mobil melaju lebih jauh daripada dengan dorongan besar saja?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A toy car does not move by itself. It needs a push to get going. A push or a pull is called a force. Once the car is rolling, nothing keeps pushing it, so why does it stop? Another force is slowing it down the whole time. That force is friction. Friction happens where two things rub together, here the wheels and the ground.',
        'Rough ground makes a lot of friction. Smooth ground makes only a little. In the sim the ice is the smoothest, then the wood, then the carpet, and the sand is the roughest. On ice a medium push sends the car about 9 metres. On carpet the same push only gets it about 1 metre. The car slows down fastest where the friction is biggest. A bigger push makes the car start faster, so it rolls farther on every surface.',
        'The ramp gives the car extra speed before it reaches the flat track, like a running start. The big ruler lets you read how far the car went, and the grey flag remembers your last try so you can compare. The sim keeps things simple: the ground is the same all the way along, there is no wind, and the car never tips over or bumps into anything.',
      ],
      id: [
        'Mobil mainan tidak bergerak sendiri. Mobil perlu didorong supaya jalan. Dorongan atau tarikan disebut gaya. Setelah mobil meluncur, tidak ada lagi yang mendorongnya, jadi mengapa mobil berhenti? Ada gaya lain yang terus memperlambatnya. Gaya itu adalah gesekan. Gesekan terjadi ketika dua benda bergesekan, di sini roda dan tanah.',
        'Tanah yang kasar membuat gesekan besar. Tanah yang halus hanya membuat gesekan kecil. Di simulasi ini es paling halus, lalu kayu, lalu karpet, dan pasir paling kasar. Di atas es, dorongan sedang membuat mobil melaju sekitar 9 meter. Di atas karpet, dorongan yang sama hanya sekitar 1 meter. Mobil paling cepat melambat di tempat gesekannya paling besar. Dorongan yang lebih besar membuat mobil mulai lebih cepat, sehingga melaju lebih jauh di semua permukaan.',
        'Tanjakan memberi mobil kecepatan tambahan sebelum sampai ke lintasan datar, seperti ancang-ancang. Penggaris besar membantumu membaca sejauh apa mobil melaju, dan bendera abu-abu mengingat percobaan terakhirmu supaya bisa dibandingkan. Simulasi ini dibuat sederhana: tanahnya sama di sepanjang lintasan, tidak ada angin, dan mobil tidak pernah terguling atau menabrak apa pun.',
      ],
    },
    figure: {
      caption: {
        en: 'The same push on two kinds of ground. On smooth ice there is only a little friction pulling back, so the car rolls a long way. On rough carpet friction is much bigger, so the car stops soon.',
        id: 'Dorongan yang sama di dua jenis tanah. Di es yang halus hanya ada sedikit gesekan yang menahan, jadi mobil meluncur jauh. Di karpet yang kasar gesekannya jauh lebih besar, jadi mobil cepat berhenti.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A toy car on smooth ice and on rough carpet', 'Mobil mainan di es halus dan di karpet kasar')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1.3}.a{stroke-width:2.6;fill:none}</style>
  <defs>
    <marker id="pg" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#10b981"/></marker>
    <marker id="pr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#ef4444"/></marker>
  </defs>
  <text x="16" y="22" font-weight="600">${L('Smooth ice: little friction', 'Es halus: gesekan kecil')}</text>
  <rect x="16" y="88" width="330" height="10" fill="#3b82f6" opacity=".35"/>
  <line x1="16" y1="88" x2="346" y2="88" class="m" opacity=".5"/>
  <g transform="translate(30 60)">
    <path d="M0 22 L0 12 L6 10 L12 0 L34 0 L42 10 L56 12 L56 22 Z" fill="#3b82f6"/>
    <circle cx="14" cy="24" r="5" fill="currentColor"/><circle cx="42" cy="24" r="5" fill="currentColor"/>
  </g>
  <line x1="92" y1="72" x2="150" y2="72" class="a" stroke="#10b981" marker-end="url(#pg)"/>
  <text x="96" y="64" class="s" fill="#10b981">${L('push', 'dorongan')}</text>
  <line x1="52" y1="84" x2="42" y2="84" class="a" stroke="#ef4444" marker-end="url(#pr)"/>
  <text x="56" y="112" class="s" fill="#ef4444">${L('friction: small', 'gesekan: kecil')}</text>
  <line x1="318" y1="88" x2="318" y2="46" class="m" stroke="#f59e0b" stroke-width="2.5"/>
  <path d="M318 46 L338 52 L318 58 Z" fill="#f59e0b"/>
  <text x="246" y="42" class="s">${L('stops far away', 'berhenti jauh')}</text>
  <text x="16" y="140" font-weight="600">${L('Rough carpet: lots of friction', 'Karpet kasar: gesekan besar')}</text>
  <rect x="16" y="206" width="330" height="10" fill="#ef4444" opacity=".35"/>
  <path d="M16 206 L22 200 L28 206 L34 200 L40 206 L46 200 L52 206 L58 200 L64 206 L70 200 L76 206 L82 200 L88 206 L94 200 L100 206 L106 200 L112 206 L118 200 L124 206 L130 200 L136 206 L142 200 L148 206 L154 200 L160 206 L166 200 L172 206 L178 200 L184 206 L190 200 L196 206 L202 200 L208 206 L214 200 L220 206 L226 200 L232 206 L238 200 L244 206 L250 200 L256 206 L262 200 L268 206 L274 200 L280 206 L286 200 L292 206 L298 200 L304 206 L310 200 L316 206 L322 200 L328 206 L334 200 L340 206 L346 206" class="m"/>
  <g transform="translate(30 178)">
    <path d="M0 22 L0 12 L6 10 L12 0 L34 0 L42 10 L56 12 L56 22 Z" fill="#3b82f6"/>
    <circle cx="14" cy="24" r="5" fill="currentColor"/><circle cx="42" cy="24" r="5" fill="currentColor"/>
  </g>
  <line x1="92" y1="190" x2="150" y2="190" class="a" stroke="#10b981" marker-end="url(#pg)"/>
  <text x="96" y="182" class="s" fill="#10b981">${L('same push', 'dorongan sama')}</text>
  <line x1="52" y1="202" x2="24" y2="202" class="a" stroke="#ef4444" marker-end="url(#pr)"/>
  <text x="56" y="230" class="s" fill="#ef4444">${L('friction: big', 'gesekan: besar')}</text>
  <line x1="128" y1="206" x2="128" y2="164" class="m" stroke="#f59e0b" stroke-width="2.5"/>
  <path d="M128 164 L148 170 L128 176 Z" fill="#f59e0b"/>
  <text x="154" y="170" class="s">${L('stops soon', 'cepat berhenti')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A push or a pull is a force. A push starts the car moving.',
        'Friction is a force that acts where things rub together, and it always slows moving things down.',
        'Rough surfaces like carpet and sand make more friction than smooth surfaces like ice.',
        'More friction means the car stops sooner; a bigger push means it goes farther.',
        'To find out what one change does, change only that one thing and keep everything else the same.',
      ],
      id: [
        'Dorongan atau tarikan adalah gaya. Dorongan membuat mobil mulai bergerak.',
        'Gesekan adalah gaya yang bekerja di tempat benda saling bergesekan, dan selalu memperlambat benda yang bergerak.',
        'Permukaan kasar seperti karpet dan pasir membuat gesekan lebih besar daripada permukaan halus seperti es.',
        'Gesekan lebih besar berarti mobil lebih cepat berhenti; dorongan lebih besar berarti mobil melaju lebih jauh.',
        'Untuk mengetahui pengaruh satu perubahan, ubah satu hal saja dan biarkan yang lain tetap sama.',
      ],
    },
    vocabulary: {
      en: [
        ['Force', 'A push or a pull. Forces can start things moving, speed them up, slow them down or change their direction.'],
        ['Friction', 'The force that slows things down when they rub against each other.'],
        ['Rough', 'Bumpy or scratchy, like carpet or sand. Rough surfaces make a lot of friction.'],
        ['Smooth', 'Flat and slippery, like ice. Smooth surfaces make only a little friction.'],
        ['Distance', 'How far something travels. In the sim you read it from the ruler in metres.'],
      ],
      id: [
        ['Gaya', 'Dorongan atau tarikan. Gaya dapat membuat benda mulai bergerak, lebih cepat, lebih lambat, atau berubah arah.'],
        ['Gesekan', 'Gaya yang memperlambat benda ketika benda saling bergesekan.'],
        ['Kasar', 'Bergelombang atau tidak rata, seperti karpet atau pasir. Permukaan kasar membuat gesekan besar.'],
        ['Halus', 'Rata dan licin, seperti es. Permukaan halus hanya membuat gesekan kecil.'],
        ['Jarak', 'Sejauh apa benda berpindah. Di simulasi kamu membacanya dari penggaris dalam meter.'],
      ],
    },
    misconceptions: {
      en: [
        ['The car stops because the push runs out.', 'A push only lasts while the hand is touching the car. After that, the car keeps rolling by itself and only stops because friction slows it down. With no friction at all it would keep going.'],
        ['Friction is always bad.', 'Friction is what lets you walk without slipping, lets a bike stop when you brake, and keeps the car\'s wheels gripping the ground. Without friction nothing could stop or turn.'],
        ['A heavier push and a faster push are different things.', 'In the sim a bigger push just means the car sets off faster. Starting faster is why it rolls farther before friction brings it to a stop.'],
      ],
      id: [
        ['Mobil berhenti karena dorongannya habis.', 'Dorongan hanya ada selama tangan menyentuh mobil. Setelah itu mobil terus meluncur sendiri dan hanya berhenti karena gesekan memperlambatnya. Tanpa gesekan sama sekali, mobil akan terus bergerak.'],
        ['Gesekan selalu merugikan.', 'Gesekanlah yang membuatmu bisa berjalan tanpa terpeleset, membuat sepeda berhenti saat direm, dan membuat roda mobil mencengkeram tanah. Tanpa gesekan tidak ada yang bisa berhenti atau berbelok.'],
        ['Dorongan yang lebih kuat dan dorongan yang lebih cepat adalah dua hal yang berbeda.', 'Di simulasi, dorongan yang lebih besar berarti mobil berangkat lebih cepat. Karena mulai lebih cepat, mobil meluncur lebih jauh sebelum gesekan menghentikannya.'],
      ],
    },
    realWorld: {
      en: [
        'Ice skaters glide a long way with one push because ice is so smooth and has very little friction.',
        'Bicycle brakes press rubber pads against the wheel to make lots of friction and stop the bike.',
        'Shoes have bumpy soles to make more friction so you do not slip, and footballers wear studs for grip on wet grass.',
        'Playground slides are made smooth and shiny so friction is small and you slide down easily.',
      ],
      id: [
        'Pemain seluncur es meluncur jauh dengan satu dorongan karena es sangat halus dan gesekannya sangat kecil.',
        'Rem sepeda menekan bantalan karet ke roda untuk membuat gesekan besar dan menghentikan sepeda.',
        'Sepatu mempunyai sol bergerigi supaya gesekannya lebih besar dan kamu tidak terpeleset, dan pemain sepak bola memakai sepatu berpul agar mencengkeram rumput basah.',
        'Perosotan di taman bermain dibuat halus dan mengkilap supaya gesekannya kecil dan kamu mudah meluncur turun.',
      ],
    },
    questions: {
      en: [
        { q: 'You give the car a medium push on ice and then a medium push on carpet. Which time does the car go farther, and why?', a: 'On ice. The push is the same both times, so the car starts at the same speed. Ice is smooth and makes very little friction, so the car slows down slowly and rolls a long way. Carpet is rough and makes a lot of friction, so the car stops after about one metre.' },
        { q: 'On sand, the car stops very quickly even with a big push. What does that tell you about sand?', a: 'Sand makes a lot of friction. Its grains rub against the wheels, so the car loses speed fast. A big push helps a little, but the car still stops much sooner than on wood or ice.' },
        { q: 'Why does the car with the ramp go farther than the car without it, even though the push is the same?', a: 'Rolling down the ramp gives the car extra speed before it reaches the flat track. It arrives on the track faster than the push alone would make it, so it takes longer for friction to bring it to a stop.' },
      ],
      id: [
        { q: 'Kamu memberi mobil dorongan sedang di atas es, lalu dorongan sedang di atas karpet. Kapan mobil melaju lebih jauh, dan mengapa?', a: 'Di atas es. Dorongannya sama, jadi mobil mulai dengan kecepatan yang sama. Es halus dan gesekannya sangat kecil, jadi mobil melambat perlahan dan meluncur jauh. Karpet kasar dan gesekannya besar, jadi mobil berhenti setelah sekitar satu meter.' },
        { q: 'Di atas pasir, mobil berhenti sangat cepat walaupun dorongannya besar. Apa artinya tentang pasir?', a: 'Pasir membuat gesekan yang besar. Butirannya bergesekan dengan roda, jadi mobil cepat kehilangan kecepatan. Dorongan besar sedikit membantu, tetapi mobil tetap berhenti jauh lebih cepat daripada di kayu atau es.' },
        { q: 'Mengapa mobil dengan tanjakan melaju lebih jauh daripada mobil tanpa tanjakan, padahal dorongannya sama?', a: 'Meluncur menuruni tanjakan memberi mobil kecepatan tambahan sebelum sampai ke lintasan datar. Mobil tiba di lintasan lebih cepat daripada hanya dengan dorongan, jadi gesekan butuh waktu lebih lama untuk menghentikannya.' },
      ],
    },
  },
};
