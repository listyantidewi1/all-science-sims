// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain that sound is a vibration that needs a material (a medium) to travel through, and that it cannot cross a vacuum.',
      'Compare how fast sound travels through air, water and steel, and say that it is fastest in solids.',
      'Describe how pitch and loudness change the picture of a sound wave: pitch changes how close the waves are, loudness changes how tall they are.',
    ],
    id: [
      'Menjelaskan bahwa bunyi adalah getaran yang membutuhkan zat perantara (medium) untuk merambat, dan tidak dapat melewati ruang hampa.',
      'Membandingkan kecepatan bunyi di udara, air dan baja, dan menyatakan bahwa bunyi paling cepat di benda padat.',
      'Menjelaskan bagaimana nada dan kekerasan mengubah gambar gelombang bunyi: nada mengubah kerapatan gelombang, kekerasan mengubah tingginya.',
    ],
  },
  tryThis: {
    en: [
      'Choose Air and ring the bell. Watch the stopwatch. How long does the sound take to reach the ear 1 km away?',
      'Now choose Steel rod and ring again. Is it faster or slower than in air? Try Water too.',
      'Choose Vacuum jar and ring the bell. Wait. Does anything reach the ear? Look at the loudness bar.',
      'Slide Pitch all the way up, then down, while ringing in air. How does the drawn wave change? Now try the Loudness slider.',
    ],
    id: [
      'Pilih Udara dan bunyikan bel. Perhatikan stopwatch. Berapa lama bunyi sampai ke telinga yang berjarak 1 km?',
      'Sekarang pilih Batang baja dan bunyikan lagi. Lebih cepat atau lebih lambat daripada di udara? Coba juga Air.',
      'Pilih Tabung hampa dan bunyikan bel. Tunggu. Apakah ada yang sampai ke telinga? Lihat batang kekerasan.',
      'Geser Nada sampai paling tinggi, lalu paling rendah, sambil membunyikan bel di udara. Bagaimana gambar gelombangnya berubah? Sekarang coba penggeser Kekerasan.',
    ],
  },

  learn: {
    background: {
      en: [
        'Sound is made when something vibrates, like a bell that has just been struck. The vibrating bell pushes on the tiny particles of air next to it. Those particles bump the next ones, and the next, and so the push-and-pull travels outwards as a sound wave. The particles themselves only wobble back and forth around their spot; it is the vibration that travels. When the vibration reaches your ear, it makes your eardrum wobble too, and you hear the sound.',
        'Because sound is passed from particle to particle, it needs a material to travel through. Air, water, wood and steel all work. In a vacuum, where there are no particles at all, sound cannot travel. That is why the ear in the sim hears nothing through the vacuum jar, and why space is silent. Sound travels at different speeds in different materials: about 340 metres per second in air, about 1,500 m/s in water and about 5,000 m/s in steel. Particles in a solid are packed tightly and bonded, so they pass the vibration on very quickly. In the sim the bell and ear are 1 km apart, so sound takes about 3 seconds through air, 0.7 seconds through water and 0.2 seconds through a steel rod.',
        'The curvy line in the sim is a picture of the sound wave. A high-pitched sound vibrates many times each second, so its waves are packed close together (a short wavelength). A low-pitched sound has waves that are spread further apart. A loud sound has tall waves (a big amplitude), because the particles are pushed further from their spots; a quiet sound has small waves. Pitch and loudness do not change how fast the sound travels: the stopwatch reads the same for a high note and a low one.',
      ],
      id: [
        'Bunyi dihasilkan saat sesuatu bergetar, seperti bel yang baru dipukul. Bel yang bergetar mendorong partikel-partikel kecil udara di sampingnya. Partikel itu menumbuk partikel berikutnya, dan berikutnya lagi, sehingga dorongan dan tarikan itu merambat keluar sebagai gelombang bunyi. Partikelnya sendiri hanya bergoyang maju-mundur di tempatnya; getarannyalah yang merambat. Saat getaran itu mencapai telingamu, gendang telingamu ikut bergoyang, dan kamu mendengar bunyi.',
        'Karena bunyi diteruskan dari partikel ke partikel, bunyi membutuhkan zat untuk merambat. Udara, air, kayu dan baja semuanya bisa. Di ruang hampa, yang tidak punya partikel sama sekali, bunyi tidak bisa merambat. Itulah sebabnya telinga di simulasi tidak mendengar apa pun lewat tabung hampa, dan mengapa ruang angkasa sunyi. Bunyi merambat dengan kecepatan berbeda di bahan yang berbeda: sekitar 340 meter per detik di udara, sekitar 1.500 m/s di air dan sekitar 5.000 m/s di baja. Partikel dalam benda padat tersusun rapat dan terikat, sehingga meneruskan getaran dengan sangat cepat. Di simulasi, bel dan telinga berjarak 1 km, jadi bunyi butuh sekitar 3 detik lewat udara, 0,7 detik lewat air dan 0,2 detik lewat batang baja.',
        'Garis berlekuk di simulasi adalah gambar gelombang bunyi. Bunyi bernada tinggi bergetar berkali-kali tiap detik, sehingga gelombangnya rapat (panjang gelombang pendek). Bunyi bernada rendah gelombangnya lebih renggang. Bunyi yang keras punya gelombang yang tinggi (amplitudo besar), karena partikel terdorong lebih jauh dari tempatnya; bunyi yang lembut gelombangnya kecil. Nada dan kekerasan tidak mengubah kecepatan bunyi: stopwatch menunjukkan angka yang sama untuk nada tinggi dan nada rendah.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: a bell vibrates and the air particles pass the push-and-pull along to the ear; the wavy line is a picture of that sound. Bottom left: a high pitch means waves close together, a low pitch means waves far apart; a loud sound means tall waves. Bottom right: in a vacuum jar there are no particles, so no sound reaches the ear.',
        id: 'Atas: bel bergetar dan partikel udara meneruskan dorongan dan tarikan sampai ke telinga; garis bergelombang adalah gambar bunyi itu. Kiri bawah: nada tinggi berarti gelombang rapat, nada rendah berarti gelombang renggang; bunyi keras berarti gelombang tinggi. Kanan bawah: dalam tabung hampa tidak ada partikel, jadi tidak ada bunyi yang sampai ke telinga.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const wave = (x0, x1, y, lambda, amp) => {
          let d = `M${x0} ${y}`;
          for (let x = x0; x <= x1; x += 2) d += ` L${x} ${(y - amp * Math.sin(((x - x0) / lambda) * Math.PI * 2)).toFixed(1)}`;
          return d;
        };
        const dots = (x0, x1, y0, y1, step) => {
          let s = '';
          for (let x = x0; x <= x1; x += step) for (let y = y0; y <= y1; y += step) {
            const dx = 3 * Math.sin((x / 18) * Math.PI * 2);
            s += `<circle cx="${(x + dx).toFixed(1)}" cy="${y}" r="1.6" fill="currentColor" opacity=".55"/>`;
          }
          return s;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Sound passing through air particles to an ear, wave shapes for pitch and loudness, and a silent vacuum jar', 'Bunyi melewati partikel udara ke telinga, bentuk gelombang untuk nada dan kekerasan, dan tabung hampa yang sunyi')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.h{font:bold 11px system-ui,sans-serif;fill:currentColor}.c{fill:none;stroke:currentColor;stroke-width:1.4}.w{fill:none;stroke:#38bdf8;stroke-width:2}</style>
  <path d="M28 20 C18 20 14 50 10 56 L46 56 C42 50 38 20 28 20 Z" fill="#fbbf24"/><circle cx="28" cy="60" r="4" fill="#fbbf24"/>
  <path d="M52 30 Q58 42 52 54 M58 24 Q67 42 58 60" class="c" opacity=".7"/>
  ${dots(74, 270, 22, 60, 14)}
  <path d="${wave(72, 276, 76, 36, 8)}" class="w"/>
  <path d="M300 30 C290 30 284 42 288 52 C292 60 298 60 300 66 M300 30 C312 30 314 48 304 54 M298 44 C302 40 306 44 304 50" class="c" stroke-width="2"/>
  <text x="28" y="92">${L('bell vibrates', 'bel bergetar')}</text>
  <text x="175" y="98">${L('air particles wobble and pass the vibration along', 'partikel udara bergoyang dan meneruskan getaran')}</text>
  <text x="300" y="92">${L('ear hears', 'telinga mendengar')}</text>
  <text x="10" y="124" class="h" text-anchor="start">${L('Pitch and loudness', 'Nada dan kekerasan')}</text>
  <path d="${wave(10, 110, 142, 14, 6)}" class="w"/><text x="60" y="160">${L('high pitch', 'nada tinggi')}</text>
  <path d="${wave(10, 110, 182, 40, 6)}" class="w"/><text x="60" y="200">${L('low pitch', 'nada rendah')}</text>
  <path d="${wave(130, 230, 162, 24, 16)}" class="w"/><text x="180" y="200">${L('loud = tall waves', 'keras = gelombang tinggi')}</text>
  <text x="300" y="124" class="h">${L('Vacuum jar', 'Tabung hampa')}</text>
  <rect x="262" y="132" width="76" height="66" rx="10" class="c"/>
  <path d="M270 150 C266 150 264 160 262 164 L278 164 C276 160 274 150 270 150 Z" fill="#fbbf24"/>
  <path d="M318 150 C314 150 312 156 314 160 C316 164 318 164 318 166 M318 150 C324 150 325 158 320 161" class="c"/>
  <text x="300" y="186">${L('no particles', 'tidak ada partikel')}</text>
  <text x="300" y="212">${L('no sound', 'tidak ada bunyi')}</text>
  <text x="120" y="230">${L('sound needs a material to travel through', 'bunyi membutuhkan zat untuk merambat')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Sound is made by something vibrating.',
        'Sound travels as particles pass the vibration to their neighbours. The particles wobble; they do not travel with the sound.',
        'Sound needs a material to travel through: it goes through air, water and solids, but not through a vacuum.',
        'Sound is fastest in solids, slower in liquids and slowest in gases: about 5,000 m/s in steel, 1,500 m/s in water, 340 m/s in air.',
        'Pitch is how high or low a sound is; high pitch means waves close together. Loudness is how big the vibration is; loud means tall waves.',
      ],
      id: [
        'Bunyi dihasilkan oleh sesuatu yang bergetar.',
        'Bunyi merambat saat partikel meneruskan getaran ke tetangganya. Partikel hanya bergoyang; partikel tidak ikut berpindah bersama bunyi.',
        'Bunyi membutuhkan zat untuk merambat: bunyi melewati udara, air dan benda padat, tetapi tidak melewati ruang hampa.',
        'Bunyi paling cepat di benda padat, lebih lambat di zat cair dan paling lambat di gas: sekitar 5.000 m/s di baja, 1.500 m/s di air, 340 m/s di udara.',
        'Nada adalah tinggi rendahnya bunyi; nada tinggi berarti gelombang rapat. Kekerasan adalah besarnya getaran; keras berarti gelombang tinggi.',
      ],
    },
    vocabulary: {
      en: [
        ['Vibration', 'A fast back-and-forth wobble. Everything that makes a sound is vibrating.'],
        ['Medium', 'The material that sound travels through, such as air, water or steel.'],
        ['Vacuum', 'A space with no particles in it at all, like outer space or an emptied jar.'],
        ['Pitch', 'How high or low a sound is. Fast vibrations give a high pitch.'],
        ['Loudness', 'How strong a sound is. Bigger vibrations give a louder sound.'],
        ['Wavelength', 'The distance from one wave crest to the next. High pitch means a short wavelength.'],
      ],
      id: [
        ['Getaran', 'Goyangan maju-mundur yang cepat. Semua yang menghasilkan bunyi sedang bergetar.'],
        ['Medium', 'Zat perantara yang dilewati bunyi, seperti udara, air atau baja.'],
        ['Ruang hampa', 'Ruang tanpa partikel sama sekali, seperti luar angkasa atau tabung yang dikosongkan.'],
        ['Nada', 'Tinggi rendahnya bunyi. Getaran yang cepat memberi nada tinggi.'],
        ['Kekerasan', 'Kuat lemahnya bunyi. Getaran yang lebih besar memberi bunyi yang lebih keras.'],
        ['Panjang gelombang', 'Jarak dari satu puncak gelombang ke puncak berikutnya. Nada tinggi berarti panjang gelombang pendek.'],
      ],
    },
    misconceptions: {
      en: [
        ['Sound travels best through air, and solids block it.', 'Sound travels faster and often further through solids. Put your ear on a table and tap the far end: you hear it clearly. Walls muffle sound mostly because sound has to pass from air into the wall and back out again.'],
        ['The air particles fly from the bell to your ear.', 'The particles only wobble around their own spot. Only the vibration passes along, like a ripple across a pond while the water stays where it is.'],
        ['Loud sounds travel faster than quiet sounds.', 'Loudness does not change speed. In the sim the stopwatch reads the same whatever the loudness or pitch; only the medium changes the time.'],
        ['You could hear an explosion in space.', 'Space is a vacuum with almost no particles, so there is nothing to carry the vibration. Space is silent.'],
      ],
      id: [
        ['Bunyi merambat paling baik lewat udara, dan benda padat menghalanginya.', 'Bunyi merambat lebih cepat dan sering lebih jauh lewat benda padat. Tempelkan telingamu di meja dan ketuk ujung jauhnya: terdengar jelas. Tembok meredam bunyi terutama karena bunyi harus berpindah dari udara ke tembok lalu keluar lagi.'],
        ['Partikel udara terbang dari bel ke telingamu.', 'Partikel hanya bergoyang di sekitar tempatnya sendiri. Hanya getarannya yang diteruskan, seperti riak di kolam sementara airnya tetap di tempat.'],
        ['Bunyi yang keras merambat lebih cepat daripada bunyi yang lembut.', 'Kekerasan tidak mengubah kecepatan. Di simulasi, stopwatch menunjukkan angka yang sama apa pun kekerasan atau nadanya; hanya medium yang mengubah waktunya.'],
        ['Kita bisa mendengar ledakan di luar angkasa.', 'Luar angkasa adalah ruang hampa yang hampir tidak punya partikel, jadi tidak ada yang membawa getarannya. Luar angkasa itu sunyi.'],
      ],
    },
    realWorld: {
      en: [
        'Whales and dolphins call to each other across many kilometres of ocean because sound travels fast and far in water.',
        'Astronauts on a spacewalk talk by radio, because there is no air outside the spacecraft to carry their voices.',
        'In old films, people put an ear to a railway track to hear a distant train: the sound arrives through the steel long before it arrives through the air.',
        'You see lightning before you hear thunder because light is far faster than sound; count the seconds and divide by three to get the distance in kilometres.',
      ],
      id: [
        'Paus dan lumba-lumba saling memanggil melintasi banyak kilometer lautan karena bunyi merambat cepat dan jauh di air.',
        'Astronaut yang berjalan di luar angkasa berbicara lewat radio, karena tidak ada udara di luar pesawat yang membawa suara mereka.',
        'Dalam film lama, orang menempelkan telinga ke rel kereta untuk mendengar kereta yang jauh: bunyinya sampai lewat baja jauh lebih dulu daripada lewat udara.',
        'Kamu melihat kilat sebelum mendengar guntur karena cahaya jauh lebih cepat daripada bunyi; hitung detiknya dan bagi tiga untuk mendapat jaraknya dalam kilometer.',
      ],
    },
    questions: {
      en: [
        { q: 'The bell is 1 km away. Why does the stopwatch read about 3 s in air but only about 0.2 s for the steel rod?', a: 'Sound travels about 340 m/s in air, so 1 km takes about 3 s. In steel it travels about 5,000 m/s, so 1 km takes about 0.2 s. Solids pass the vibration on much faster.' },
        { q: 'Nothing reaches the ear through the vacuum jar. What does that tell you about how sound travels?', a: 'Sound needs particles to pass the vibration along. A vacuum has no particles, so the vibration cannot cross it.' },
        { q: 'You slide Loudness up to maximum. Does the sound reach the ear sooner?', a: 'No. The wave is drawn taller, but the stopwatch reads the same. Loudness changes the size of the vibration, not its speed.' },
      ],
      id: [
        { q: 'Bel berjarak 1 km. Mengapa stopwatch menunjukkan sekitar 3 s di udara tetapi hanya sekitar 0,2 s untuk batang baja?', a: 'Bunyi merambat sekitar 340 m/s di udara, jadi 1 km butuh sekitar 3 s. Di baja bunyi merambat sekitar 5.000 m/s, jadi 1 km butuh sekitar 0,2 s. Benda padat meneruskan getaran jauh lebih cepat.' },
        { q: 'Tidak ada yang sampai ke telinga lewat tabung hampa. Apa artinya tentang cara bunyi merambat?', a: 'Bunyi membutuhkan partikel untuk meneruskan getaran. Ruang hampa tidak punya partikel, jadi getarannya tidak bisa melewatinya.' },
        { q: 'Kamu menggeser Kekerasan sampai maksimum. Apakah bunyi sampai ke telinga lebih cepat?', a: 'Tidak. Gelombangnya digambar lebih tinggi, tetapi stopwatch menunjukkan angka yang sama. Kekerasan mengubah besar getaran, bukan kecepatannya.' },
      ],
    },
  },
};
