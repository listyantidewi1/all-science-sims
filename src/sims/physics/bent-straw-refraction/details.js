// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe that light changes direction (refracts) when it passes from water into air.',
      'Explain why a straight straw looks bent at the water surface and why things under water look closer to the surface than they really are.',
      'Predict what happens to the bend when the water level or the viewing angle changes.',
    ],
    id: [
      'Menjelaskan bahwa cahaya berubah arah (membias) ketika berpindah dari air ke udara.',
      'Menjelaskan mengapa sedotan yang lurus tampak bengkok di permukaan air dan mengapa benda di dalam air tampak lebih dekat ke permukaan daripada sebenarnya.',
      'Memperkirakan apa yang terjadi pada bengkokan ketika tinggi air atau sudut pandang berubah.',
    ],
  },
  tryThis: {
    en: [
      'Set the water level to 0. Is the straw straight? Now slide the water up slowly and watch the bottom of the straw.',
      'Keep the water full and change the viewing angle from 10° to 60°. When does the straw look most bent?',
      'Switch to the bowl. With no water, can you see the coin? Add water until the coin appears.',
      'Compare the faint "real" straw with the solid "what you see" straw. Which one is higher?',
    ],
    id: [
      'Atur tinggi air ke 0. Apakah sedotan lurus? Sekarang naikkan air perlahan dan perhatikan ujung bawah sedotan.',
      'Biarkan air penuh dan ubah sudut pandang dari 10° ke 60°. Kapan sedotan tampak paling bengkok?',
      'Pindah ke mangkuk. Tanpa air, bisakah kamu melihat koin? Tambahkan air sampai koin muncul.',
      'Bandingkan sedotan "asli" yang samar dengan sedotan "yang terlihat" yang jelas. Mana yang lebih tinggi?',
    ],
  },

  learn: {
    background: {
      en: [
        'We see things because light from them travels to our eyes. Light moves in straight lines, but when it passes from one clear material into another, such as from water into air, it changes direction at the border. This bending is called refraction. Light travels a little slower in water than in air, and that difference is what makes it turn.',
        'Your brain always assumes light came to your eye in a straight line. So when light from the bottom of a straw bends at the water surface, your brain traces the light straight back and places the straw bottom somewhere it is not: higher up than it really is. The part of the straw above the water is seen correctly, so the straw looks as if it has a kink right at the surface. The straw is not really bent at all.',
        'The same trick makes a pool look shallower than it is, and it makes a coin at the bottom of a bowl pop into view when you pour in water. Without water, the rim of the bowl blocks your view of the coin. Add water and the light from the coin bends at the surface, so it can climb over the rim and reach your eye.',
        'In this sim the faint dotted straw shows where the straw really is and the solid straw shows what your eye sees. The yellow line is the light ray from the bottom of the straw to the eye, with its bend at the surface. The more water there is, and the more sideways you look, the bigger the bend.',
      ],
      id: [
        'Kita melihat benda karena cahaya dari benda itu sampai ke mata kita. Cahaya bergerak lurus, tetapi ketika berpindah dari satu bahan bening ke bahan bening lain, misalnya dari air ke udara, cahaya berubah arah di batasnya. Pembelokan ini disebut pembiasan. Cahaya bergerak sedikit lebih lambat di air daripada di udara, dan perbedaan itulah yang membuatnya berbelok.',
        'Otakmu selalu menganggap cahaya datang ke mata dalam garis lurus. Jadi ketika cahaya dari ujung bawah sedotan membelok di permukaan air, otakmu menarik garis lurus ke belakang dan menempatkan ujung sedotan di tempat yang salah: lebih tinggi dari yang sebenarnya. Bagian sedotan di atas air terlihat dengan benar, sehingga sedotan tampak patah tepat di permukaan. Padahal sedotan tidak bengkok sama sekali.',
        'Tipuan yang sama membuat kolam tampak lebih dangkal dari sebenarnya, dan membuat koin di dasar mangkuk tiba-tiba terlihat ketika air dituangkan. Tanpa air, bibir mangkuk menghalangi pandanganmu ke koin. Tambahkan air, maka cahaya dari koin membelok di permukaan sehingga bisa melewati bibir mangkuk dan sampai ke matamu.',
        'Di simulasi ini sedotan putus-putus yang samar menunjukkan posisi sedotan yang sebenarnya, dan sedotan yang jelas menunjukkan apa yang dilihat matamu. Garis kuning adalah berkas cahaya dari ujung bawah sedotan ke mata, dengan belokan di permukaan. Semakin banyak air dan semakin miring kamu melihat, semakin besar bengkokannya.',
      ],
    },
    figure: {
      caption: {
        en: 'Light from the bottom of the straw bends at the water surface on its way to the eye. The eye traces the light straight back (dashed) and sees the straw bottom higher than it really is, so the straw looks bent.',
        id: 'Cahaya dari ujung bawah sedotan membelok di permukaan air dalam perjalanannya ke mata. Mata menarik garis lurus ke belakang (putus-putus) dan melihat ujung sedotan lebih tinggi dari sebenarnya, sehingga sedotan tampak bengkok.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A straw in water looks bent because light bends at the surface', 'Sedotan di dalam air tampak bengkok karena cahaya membelok di permukaan')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.ray{stroke:#f59e0b;stroke-width:2.5;fill:none}</style>
  <defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#f59e0b"/></marker></defs>
  <path d="M60 60 L70 220 L190 220 L200 60" fill="none" stroke="currentColor" stroke-width="2"/>
  <rect x="66" y="120" width="128" height="100" fill="#38bdf8" opacity="0.3"/>
  <line x1="66" y1="120" x2="194" y2="120" stroke="#38bdf8" stroke-width="2"/>
  <text x="200" y="124" fill="#38bdf8">${L('water', 'air')}</text>
  <line x1="150" y1="30" x2="90" y2="212" stroke="#ef4444" stroke-width="3" stroke-dasharray="6 5" opacity="0.5"/>
  <line x1="150" y1="30" x2="120" y2="120" stroke="#ef4444" stroke-width="7"/>
  <line x1="120" y1="120" x2="90" y2="165" stroke="#ef4444" stroke-width="7"/>
  <text x="40" y="232">${L('real straw', 'sedotan asli')}</text>
  <text x="20" y="170" fill="#ef4444">${L('what you see', 'yang terlihat')}</text>
  <line x1="90" y1="212" x2="160" y2="120" class="ray"/>
  <line x1="160" y1="120" x2="290" y2="40" class="ray" marker-end="url(#ar2)"/>
  <line x1="160" y1="120" x2="90" y2="163" class="m" stroke="#f59e0b" stroke-dasharray="4 4"/>
  <line x1="160" y1="80" x2="160" y2="160" class="m" stroke-dasharray="3 3"/>
  <ellipse cx="300" cy="36" rx="16" ry="9" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="300" cy="36" r="4" fill="currentColor"/>
  <text x="280" y="22">${L('eye', 'mata')}</text>
  <text x="222" y="90" fill="#f59e0b">${L('light bends here', 'cahaya membelok di sini')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Light bends (refracts) when it passes from water into air or from air into water.',
        'Your eye assumes light travelled in a straight line, so objects under water appear higher than they really are.',
        'A straight straw looks bent at the water surface because the part under water is seen in the wrong place.',
        'The more sideways you look at the surface, the bigger the bend looks.',
        'Water can make a hidden object visible by bending light over the edge of a bowl.',
      ],
      id: [
        'Cahaya membelok (membias) ketika berpindah dari air ke udara atau dari udara ke air.',
        'Mata menganggap cahaya bergerak lurus, sehingga benda di dalam air tampak lebih tinggi dari sebenarnya.',
        'Sedotan yang lurus tampak bengkok di permukaan air karena bagian di dalam air terlihat di tempat yang salah.',
        'Semakin miring kamu melihat permukaan air, semakin besar bengkokan yang tampak.',
        'Air dapat membuat benda tersembunyi terlihat dengan membelokkan cahaya melewati bibir mangkuk.',
      ],
    },
    vocabulary: {
      en: [
        ['Refraction', 'The bending of light when it passes from one clear material into another, such as from water to air.'],
        ['Surface', 'The top of the water, where the water meets the air. This is where the light bends.'],
        ['Apparent position', 'Where something seems to be. Under water, the apparent position is higher than the real position.'],
        ['Ray', 'A thin line that shows the path light takes.'],
        ['Transparent', 'Lets light pass through, like water, glass and air.'],
      ],
      id: [
        ['Pembiasan', 'Pembelokan cahaya ketika berpindah dari satu bahan bening ke bahan bening lain, misalnya dari air ke udara.'],
        ['Permukaan', 'Bagian atas air, tempat air bertemu udara. Di sinilah cahaya membelok.'],
        ['Posisi semu', 'Tempat sesuatu tampak berada. Di dalam air, posisi semu lebih tinggi daripada posisi sebenarnya.'],
        ['Berkas cahaya', 'Garis tipis yang menunjukkan jalan yang ditempuh cahaya.'],
        ['Tembus pandang', 'Dapat dilewati cahaya, seperti air, kaca dan udara.'],
      ],
    },
    misconceptions: {
      en: [
        ['The water really bends the straw.', 'The straw stays perfectly straight. Lift it out and it is straight. Only the light coming from it bends, so the picture your eye gets is bent.'],
        ['Things under water look further away.', 'They look closer to the surface than they really are. That is why a swimming pool looks shallower than it is, and why you must be careful when you jump in.'],
        ['Light always travels in straight lines, no matter what.', 'Light travels straight inside one material, but it changes direction at the border between two materials, such as the water surface.'],
      ],
      id: [
        ['Air benar-benar membengkokkan sedotan.', 'Sedotan tetap lurus sempurna. Angkat sedotan, dan ia lurus. Hanya cahaya yang datang darinya yang membelok, sehingga gambar yang diterima matamu tampak bengkok.'],
        ['Benda di dalam air tampak lebih jauh.', 'Benda tampak lebih dekat ke permukaan dari sebenarnya. Itu sebabnya kolam renang tampak lebih dangkal dari sebenarnya, dan kamu harus berhati-hati saat melompat masuk.'],
        ['Cahaya selalu bergerak lurus, apa pun yang terjadi.', 'Cahaya bergerak lurus di dalam satu bahan, tetapi berubah arah di batas antara dua bahan, misalnya di permukaan air.'],
      ],
    },
    realWorld: {
      en: [
        'A swimming pool or river looks shallower than it really is, so always check the depth before jumping in.',
        'Fishermen who spear fish aim below where the fish appears to be, because the fish is really deeper.',
        'Glasses and magnifying lenses work because light bends as it passes through curved glass.',
        'Your legs look short and bent when you stand in a clear pool and look down.',
      ],
      id: [
        'Kolam renang atau sungai tampak lebih dangkal dari sebenarnya, jadi selalu periksa kedalamannya sebelum melompat masuk.',
        'Pemancing yang menombak ikan mengarahkan tombak di bawah tempat ikan tampak berada, karena ikan sebenarnya lebih dalam.',
        'Kacamata dan kaca pembesar bekerja karena cahaya membelok saat melewati kaca yang melengkung.',
        'Kakimu tampak pendek dan bengkok ketika kamu berdiri di kolam yang jernih dan melihat ke bawah.',
      ],
    },
    questions: {
      en: [
        { q: 'You set the water level to 0. Does the straw look bent? Why or why not?', a: 'No. With no water there is only air around the straw, so the light travels in one straight line to your eye and the straw looks straight.' },
        { q: 'The coin in the bowl is hidden. What two things could you do to see it?', a: 'Add water so the light from the coin bends over the rim, or look from a steeper angle (more from above) so the rim no longer blocks the view.' },
        { q: 'A pupil says the bottom of the pool is 1 metre deep because it looks that way. Is the pool really 1 metre deep, or more?', a: 'More. Water makes the bottom look closer than it is, so the real depth is greater, roughly 1.3 metres when looking straight down.' },
      ],
      id: [
        { q: 'Kamu mengatur tinggi air ke 0. Apakah sedotan tampak bengkok? Mengapa?', a: 'Tidak. Tanpa air hanya ada udara di sekitar sedotan, sehingga cahaya bergerak dalam satu garis lurus ke matamu dan sedotan tampak lurus.' },
        { q: 'Koin di mangkuk tersembunyi. Dua hal apa yang bisa kamu lakukan agar koin terlihat?', a: 'Tambahkan air agar cahaya dari koin membelok melewati bibir mangkuk, atau lihat dari sudut yang lebih tegak (lebih dari atas) agar bibir mangkuk tidak lagi menghalangi.' },
        { q: 'Seorang murid berkata dasar kolam sedalam 1 meter karena terlihat begitu. Apakah kolam itu benar-benar sedalam 1 meter, atau lebih?', a: 'Lebih. Air membuat dasar tampak lebih dekat dari sebenarnya, sehingga kedalaman aslinya lebih besar, sekitar 1,3 meter jika dilihat tegak lurus dari atas.' },
      ],
    },
  },
};
