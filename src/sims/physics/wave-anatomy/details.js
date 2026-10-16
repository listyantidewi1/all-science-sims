// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Label the parts of a transverse wave (crest, trough, amplitude, wavelength) and of a longitudinal wave (compression, rarefaction, wavelength).',
      'Distinguish transverse from longitudinal waves by the direction the particles move compared with the direction the wave travels.',
      'Use v = fλ and T = 1/f to calculate wavelength and period, and check the result by measuring the wave with a ruler.',
    ],
    id: [
      'Memberi label bagian-bagian gelombang transversal (puncak, lembah, amplitudo, panjang gelombang) dan gelombang longitudinal (rapatan, renggangan, panjang gelombang).',
      'Membedakan gelombang transversal dan longitudinal dari arah gerak partikel dibandingkan arah rambat gelombang.',
      'Menggunakan v = fλ dan T = 1/f untuk menghitung panjang gelombang dan periode, lalu memeriksanya dengan mengukur gelombang memakai penggaris.',
    ],
  },
  tryThis: {
    en: [
      'Set f = 1 Hz and v = 2 m/s. Pause and use the ruler to measure the distance between two crests. Does it match λ = v/f?',
      'Double the frequency without changing the speed. What happens to the wavelength? Now double the speed instead.',
      'Watch the red marker on the rope and the red coil in the spring. Which one moves up and down, and which one moves back and forth?',
      'Turn the amplitude right up. Does the wave travel any faster? Does the wavelength change?',
    ],
    id: [
      'Atur f = 1 Hz dan v = 2 m/s. Jeda, lalu ukur jarak antara dua puncak dengan penggaris. Apakah sesuai dengan λ = v/f?',
      'Gandakan frekuensi tanpa mengubah cepat rambat. Apa yang terjadi pada panjang gelombang? Sekarang gandakan cepat rambatnya.',
      'Perhatikan penanda merah pada tali dan lilitan merah pada pegas. Mana yang bergerak naik-turun, dan mana yang bergerak maju-mundur?',
      'Naikkan amplitudo sampai maksimum. Apakah gelombang merambat lebih cepat? Apakah panjang gelombangnya berubah?',
    ],
  },

  learn: {
    background: {
      en: [
        'A wave is a disturbance that travels through a material (or through space) carrying energy, while the material itself only vibrates about its rest position. Shake one end of a rope and a hump runs along it, but each piece of rope simply moves up and down. Push one end of a long spring and a bunched-up region travels along it, while each coil only slides back and forth. In both cases the source vibrates with a frequency f, measured in hertz (Hz, vibrations per second), and the time for one complete vibration is the period T = 1/f.',
        'When the particles move at right angles to the direction the wave travels, the wave is transverse. Its high points are crests and its low points are troughs; the amplitude is the greatest distance a particle moves from its rest position, and the wavelength λ is the distance from one crest to the next. When the particles move back and forth along the direction of travel, the wave is longitudinal. Regions where the coils are squeezed together are compressions and regions where they are spread apart are rarefactions; here the wavelength is the distance from one compression to the next.',
        'The wave speed v is how fast a crest (or a compression) moves along. In one period the source completes one vibration and the wave moves forward by one wavelength, so v = λ/T = fλ, or λ = v/f. The speed is set by the medium, not by the source: a tighter rope or a stiffer spring carries waves faster. If you shake faster at the same speed, the crests are closer together and λ shrinks. Changing the amplitude only changes how big the vibration is, not how fast it travels.',
        'The sim drives a rope and a spring from the same source so you can compare them. Pause the motion and drag the two ends of the ruler onto crests, troughs or compressions to measure λ and the amplitude; the readout also shows the values from the formulas. The longitudinal displacement of the coils is exaggerated so the compressions are easy to see. Sound is a longitudinal wave in air; light and waves on water surfaces are mostly transverse.',
      ],
      id: [
        'Gelombang adalah gangguan yang merambat melalui suatu medium (atau ruang) sambil membawa energi, sementara mediumnya sendiri hanya bergetar di sekitar posisi setimbangnya. Goyangkan satu ujung tali, maka gundukan berjalan di sepanjang tali, tetapi tiap bagian tali hanya bergerak naik-turun. Dorong satu ujung pegas panjang, maka daerah yang merapat berjalan di sepanjang pegas, sementara tiap lilitan hanya bergeser maju-mundur. Pada keduanya, sumber bergetar dengan frekuensi f, diukur dalam hertz (Hz, getaran per sekon), dan waktu untuk satu getaran penuh adalah periode T = 1/f.',
        'Jika partikel bergerak tegak lurus terhadap arah rambat gelombang, gelombang itu transversal. Titik tertingginya disebut puncak dan titik terendahnya lembah; amplitudo adalah simpangan terbesar partikel dari posisi setimbang, dan panjang gelombang λ adalah jarak dari satu puncak ke puncak berikutnya. Jika partikel bergerak maju-mundur searah rambatan, gelombang itu longitudinal. Daerah dengan lilitan yang saling merapat disebut rapatan dan daerah dengan lilitan yang merenggang disebut renggangan; di sini panjang gelombang adalah jarak dari satu rapatan ke rapatan berikutnya.',
        'Cepat rambat gelombang v adalah seberapa cepat puncak (atau rapatan) bergerak maju. Dalam satu periode sumber menyelesaikan satu getaran dan gelombang maju sejauh satu panjang gelombang, sehingga v = λ/T = fλ, atau λ = v/f. Cepat rambat ditentukan oleh medium, bukan oleh sumber: tali yang lebih tegang atau pegas yang lebih kaku merambatkan gelombang lebih cepat. Jika kamu menggoyang lebih cepat pada cepat rambat yang sama, puncak-puncaknya lebih rapat dan λ mengecil. Mengubah amplitudo hanya mengubah besarnya getaran, bukan kecepatan rambatnya.',
        'Simulasi menggerakkan tali dan pegas dari sumber yang sama supaya kamu dapat membandingkannya. Jeda gerakannya dan geser kedua ujung penggaris ke puncak, lembah atau rapatan untuk mengukur λ dan amplitudo; tampilan angka juga menunjukkan nilai dari rumus. Pergeseran lilitan pada gelombang longitudinal dibuat berlebihan agar rapatannya mudah terlihat. Bunyi adalah gelombang longitudinal di udara; cahaya dan gelombang di permukaan air umumnya transversal.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: a transverse wave with crest, trough, amplitude A and wavelength λ; the particle (red) moves up and down. Bottom: a longitudinal wave with compressions and rarefactions one wavelength apart; the coil (red) moves back and forth along the wave.',
        id: 'Atas: gelombang transversal dengan puncak, lembah, amplitudo A dan panjang gelombang λ; partikel (merah) bergerak naik-turun. Bawah: gelombang longitudinal dengan rapatan dan renggangan yang berjarak satu panjang gelombang; lilitan (merah) bergerak maju-mundur searah gelombang.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // Transverse: y = 60 - 30 sin(2π (x-30)/120), x from 30 to 330 (2.5 wavelengths of 120 px).
        const pts = [];
        for (let x = 30; x <= 330; x += 5) pts.push(`${x} ${(60 - 30 * Math.sin(2 * Math.PI * (x - 30) / 120)).toFixed(1)}`);
        // Longitudinal: coils at rest positions x0, displaced by 9 sin(2π x0/120).
        const coils = [];
        for (let x0 = 30; x0 <= 330; x0 += 6) {
          const x = x0 + 9 * Math.sin(2 * Math.PI * (x0 - 30) / 120);
          coils.push(`<line x1="${x.toFixed(1)}" y1="160" x2="${x.toFixed(1)}" y2="196" stroke="${Math.abs(x0 - 150) < 3 ? '#ef4444' : 'currentColor'}" stroke-width="${Math.abs(x0 - 150) < 3 ? 3 : 1.5}"/>`);
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Parts of a transverse wave and a longitudinal wave', 'Bagian-bagian gelombang transversal dan longitudinal')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{text-anchor:middle}.b{font:bold 11px system-ui,sans-serif}</style>
  <line x1="30" y1="60" x2="330" y2="60" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".6"/>
  <polyline points="${pts.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <circle cx="60" cy="30" r="4" fill="#ef4444"/>
  <line x1="60" y1="14" x2="60" y2="22" stroke="#ef4444" stroke-width="1.5"/><line x1="60" y1="38" x2="60" y2="46" stroke="#ef4444" stroke-width="1.5"/>
  <text x="60" y="12" class="c b">${L('crest', 'puncak')}</text>
  <text x="120" y="104" class="c b">${L('trough', 'lembah')}</text>
  <line x1="180" y1="60" x2="180" y2="30" stroke="#10b981" stroke-width="1.5"/>
  <text x="186" y="48" fill="#10b981">A</text>
  <line x1="60" y1="118" x2="180" y2="118" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="60" y1="113" x2="60" y2="123" stroke="#f59e0b" stroke-width="1.5"/><line x1="180" y1="113" x2="180" y2="123" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="120" y="131" class="c" fill="#f59e0b">λ</text>
  <text x="250" y="104" class="c">${L('transverse: particles move ⊥ to travel', 'transversal: partikel bergerak ⊥ arah rambat')}</text>
  ${coils.join('\n  ')}
  <line x1="30" y1="160" x2="330" y2="160" stroke="currentColor" stroke-width="1" opacity=".4"/>
  <line x1="30" y1="196" x2="330" y2="196" stroke="currentColor" stroke-width="1" opacity=".4"/>
  <text x="90" y="152" class="c b">${L('compression', 'rapatan')}</text>
  <text x="150" y="152" class="c b">${L('rarefaction', 'renggangan')}</text>
  <text x="210" y="152" class="c b">${L('compression', 'rapatan')}</text>
  <line x1="90" y1="210" x2="210" y2="210" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="90" y1="205" x2="90" y2="215" stroke="#f59e0b" stroke-width="1.5"/><line x1="210" y1="205" x2="210" y2="215" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="150" y="224" class="c" fill="#f59e0b">λ</text>
  <text x="250" y="236" class="c">${L('longitudinal: particles move ∥ to travel', 'longitudinal: partikel bergerak ∥ arah rambat')}</text>
  <text x="330" y="60" class="c b" fill="#f59e0b">v →</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Waves carry energy; the particles of the medium only vibrate about their rest positions.',
        'Transverse: particles move perpendicular to the wave direction (crests and troughs). Longitudinal: particles move parallel (compressions and rarefactions).',
        'Wavelength λ is crest-to-crest or compression-to-compression; amplitude is the largest displacement from rest.',
        'Period T = 1/f. In one period the wave travels one wavelength, so v = fλ.',
        'The medium sets the speed. For a fixed speed, higher frequency means shorter wavelength; amplitude does not change speed or wavelength.',
      ],
      id: [
        'Gelombang membawa energi; partikel medium hanya bergetar di sekitar posisi setimbangnya.',
        'Transversal: partikel bergerak tegak lurus arah rambat (puncak dan lembah). Longitudinal: partikel bergerak sejajar (rapatan dan renggangan).',
        'Panjang gelombang λ adalah jarak puncak ke puncak atau rapatan ke rapatan; amplitudo adalah simpangan terbesar dari posisi setimbang.',
        'Periode T = 1/f. Dalam satu periode gelombang merambat satu panjang gelombang, sehingga v = fλ.',
        'Medium menentukan cepat rambat. Pada cepat rambat tetap, frekuensi lebih tinggi berarti panjang gelombang lebih pendek; amplitudo tidak mengubah cepat rambat maupun panjang gelombang.',
      ],
    },
    vocabulary: {
      en: [
        ['Crest / trough', 'The highest and lowest points of a transverse wave.'],
        ['Compression / rarefaction', 'Regions of a longitudinal wave where the particles are squeezed together or spread apart.'],
        ['Amplitude (A)', 'The maximum displacement of a particle from its rest position, in metres or centimetres.'],
        ['Wavelength (λ)', 'The distance between two neighbouring points that are in step, such as two crests, in metres.'],
        ['Frequency (f)', 'The number of complete vibrations per second, in hertz (Hz).'],
        ['Period (T)', 'The time for one complete vibration, in seconds; T = 1/f.'],
      ],
      id: [
        ['Puncak / lembah', 'Titik tertinggi dan terendah pada gelombang transversal.'],
        ['Rapatan / renggangan', 'Daerah pada gelombang longitudinal tempat partikel saling merapat atau merenggang.'],
        ['Amplitudo (A)', 'Simpangan maksimum partikel dari posisi setimbangnya, dalam meter atau sentimeter.'],
        ['Panjang gelombang (λ)', 'Jarak antara dua titik berdekatan yang sefase, misalnya dua puncak, dalam meter.'],
        ['Frekuensi (f)', 'Banyaknya getaran penuh per sekon, dalam hertz (Hz).'],
        ['Periode (T)', 'Waktu untuk satu getaran penuh, dalam sekon; T = 1/f.'],
      ],
    },
    misconceptions: {
      en: [
        ['The rope (or the water, or the air) travels along with the wave.', 'Only the disturbance and the energy travel. Watch the red marker: it bobs up and down in one place while the crests pass by.'],
        ['A bigger amplitude makes the wave travel faster.', 'Speed depends on the medium only. Turning the amplitude up makes taller crests, but they still arrive at the same time.'],
        ['Higher frequency means a faster wave.', 'At a fixed speed, a higher frequency simply packs the crests closer together: λ = v/f gets smaller while v stays the same.'],
        ['Wavelength is the distance from a crest to the next trough.', 'That is only half a wavelength. A full wavelength is crest to crest, or trough to trough.'],
      ],
      id: [
        ['Tali (atau air, atau udara) ikut berpindah bersama gelombang.', 'Hanya gangguan dan energinya yang merambat. Perhatikan penanda merah: ia naik-turun di satu tempat sementara puncak-puncak melewatinya.'],
        ['Amplitudo yang lebih besar membuat gelombang merambat lebih cepat.', 'Cepat rambat hanya bergantung pada medium. Menaikkan amplitudo membuat puncak lebih tinggi, tetapi tetap tiba pada waktu yang sama.'],
        ['Frekuensi lebih tinggi berarti gelombang lebih cepat.', 'Pada cepat rambat tetap, frekuensi lebih tinggi hanya membuat puncak lebih rapat: λ = v/f mengecil sementara v tetap.'],
        ['Panjang gelombang adalah jarak dari puncak ke lembah berikutnya.', 'Itu hanya setengah panjang gelombang. Satu panjang gelombang penuh adalah puncak ke puncak, atau lembah ke lembah.'],
      ],
    },
    realWorld: {
      en: [
        'Sound is a longitudinal wave: a loudspeaker cone pushes the air into compressions and rarefactions that travel at about 340 m/s.',
        'Radio stations are named by frequency; a 100 MHz FM signal has λ = (3 × 10⁸)/(10⁸) = 3 m, which sets the size of the antenna.',
        'Earthquakes send out both kinds: P-waves are longitudinal and arrive first; S-waves are transverse and do more shaking.',
        'A guitar string carries transverse waves; tightening it raises the wave speed and so raises the pitch.',
        'Ultrasound scanners use longitudinal sound waves of a few megahertz, giving wavelengths under a millimetre so they can image small details.',
      ],
      id: [
        'Bunyi adalah gelombang longitudinal: membran pengeras suara mendorong udara menjadi rapatan dan renggangan yang merambat sekitar 340 m/s.',
        'Stasiun radio dinamai dengan frekuensinya; sinyal FM 100 MHz memiliki λ = (3 × 10⁸)/(10⁸) = 3 m, yang menentukan ukuran antenanya.',
        'Gempa bumi memancarkan kedua jenis gelombang: gelombang P longitudinal dan tiba lebih dulu; gelombang S transversal dan menimbulkan guncangan lebih besar.',
        'Senar gitar merambatkan gelombang transversal; mengencangkannya menaikkan cepat rambat sehingga nada menjadi lebih tinggi.',
        'Pemindai ultrasonografi memakai gelombang bunyi longitudinal berfrekuensi beberapa megahertz, dengan panjang gelombang di bawah satu milimeter agar dapat mencitrakan detail kecil.',
      ],
    },
    questions: {
      en: [
        { q: 'A rope is shaken at 2.0 Hz and the waves travel at 3.0 m/s. What are the period and the wavelength?', a: 'T = 1/f = 0.50 s. λ = v/f = 3.0/2.0 = 1.5 m.' },
        { q: 'With the ruler you measure 0.80 m between neighbouring compressions in the spring while f = 2.5 Hz. What is the wave speed?', a: 'v = fλ = 2.5 × 0.80 = 2.0 m/s.' },
        { q: 'You double the amplitude and watch the red marker on the rope. Describe how its motion changes and whether the crests move any faster.', a: 'The marker moves twice as far up and down, so it moves faster through the middle, but it still completes one vibration per period. The crests move along at the same speed, because the speed is set by the rope, not the amplitude.' },
      ],
      id: [
        { q: 'Sebuah tali digoyang dengan frekuensi 2,0 Hz dan gelombangnya merambat 3,0 m/s. Berapa periode dan panjang gelombangnya?', a: 'T = 1/f = 0,50 s. λ = v/f = 3,0/2,0 = 1,5 m.' },
        { q: 'Dengan penggaris kamu mengukur 0,80 m antara dua rapatan yang berdekatan pada pegas saat f = 2,5 Hz. Berapa cepat rambat gelombangnya?', a: 'v = fλ = 2,5 × 0,80 = 2,0 m/s.' },
        { q: 'Kamu menggandakan amplitudo dan mengamati penanda merah pada tali. Jelaskan bagaimana gerakannya berubah dan apakah puncak-puncaknya bergerak lebih cepat.', a: 'Penanda bergerak naik-turun dua kali lebih jauh, sehingga lebih cepat saat melewati tengah, tetapi tetap menyelesaikan satu getaran per periode. Puncak-puncak merambat dengan kecepatan yang sama, karena cepat rambat ditentukan oleh tali, bukan amplitudo.' },
      ],
    },
  },
};
