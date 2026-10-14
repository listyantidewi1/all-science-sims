// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply f_observed = f_source · (c) / (c − v_source) when approaching.',
      'Hear the symmetric drop as the source passes.',
      'Connect the audio shift to the visual position.',
    ],
    id: [
      'Menerapkan f_diamati = f_sumber · (c) / (c − v_sumber) saat mendekat.',
      'Mendengar penurunan simetris saat sumber lewat.',
      'Menghubungkan pergeseran audio dengan posisi visual.',
    ],
  },
  tryThis: {
    en: [
      'Slow source — barely perceptible shift.',
      'Fast source (200 m/s) — dramatic pitch swing.',
      'Stationary — no Doppler, just the source frequency.',
    ],
    id: [
      'Sumber lambat — pergeseran nyaris tak terlihat.',
      'Sumber cepat (200 m/s) — perubahan nada dramatis.',
      'Diam — tanpa Doppler, hanya frekuensi sumber.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A siren sends out sound waves at a steady rate: so many wave crests per second, which is its frequency. If the siren stands still, the crests spread out as evenly spaced circles and a listener receives them at the same rate they were made. If the siren is moving, each new crest is emitted from a point a little further along, so in front of the siren the crests are squeezed closer together and behind it they are stretched apart. Closer crests mean a shorter wavelength, and because the sound still travels at the same speed through the air, more crests arrive per second: the listener hears a higher frequency. Behind the siren the opposite happens and the pitch drops. This is the Doppler effect.',
        'For a source moving toward a stationary listener, the received frequency is f_obs = f_src × c / (c − v), where c is the speed of sound (343 m/s in the simulation) and v is the source\'s speed toward the listener. Moving away, v is negative and the fraction becomes less than one. Notice that the shift is not symmetric: at 60 m/s a 440 Hz siren is heard at 533 Hz approaching but 374 Hz receding, a rise of 93 Hz and a fall of only 65 Hz. The simulation uses this exact formula, with the Web Audio oscillator retuned every frame to the computed value, so what you hear is the real frequency, not a recording.',
        'The listener in the simulation stands 8 m to the side of the siren\'s path, which matters. The formula uses only the component of velocity pointing at the listener, the radial velocity shown in the readout. Far away, almost all of the siren\'s motion is toward the listener, so the pitch sits steadily high. As the siren draws level, the radial velocity passes smoothly through zero and the pitch slides down to its low value instead of jumping. The speed slider sets how large the swing is, the frequency slider sets the siren\'s own pitch, and the toggle stops the siren so you can confirm there is no shift when nothing moves. The faint circles are past wave crests, drawn centred on where the siren was when it emitted them.',
        'Several things are left out. The sound you hear is computed from where the siren is now, not where it was when the sound left it, so the real small delay of propagation is ignored. The speed of sound is fixed at 343 m/s, which is right for air at about 20 °C and ignores wind. The listener never moves (a moving listener follows a slightly different formula, f_obs = f_src × (c + v_listener) / c), and the source speed is capped at 200 m/s, well below the speed of sound, so the simulation never reaches the sonic boom that occurs when v equals c. Loudness falls with distance in the audio, which is a separate effect from the pitch shift.',
      ],
      id: [
        'Sirene memancarkan gelombang bunyi dengan laju tetap: sekian puncak gelombang per detik, yaitu frekuensinya. Jika sirene diam, puncak-puncak itu menyebar sebagai lingkaran berjarak sama dan pendengar menerimanya dengan laju yang sama seperti saat dibuat. Jika sirene bergerak, setiap puncak baru dipancarkan dari titik yang sedikit lebih maju, sehingga di depan sirene puncak-puncaknya merapat dan di belakangnya merenggang. Puncak yang lebih rapat berarti panjang gelombang lebih pendek, dan karena bunyi tetap merambat dengan kelajuan yang sama di udara, lebih banyak puncak tiba per detik: pendengar mendengar frekuensi yang lebih tinggi. Di belakang sirene terjadi kebalikannya dan nada turun. Inilah efek Doppler.',
        'Untuk sumber yang mendekati pendengar diam, frekuensi yang diterima adalah f_amat = f_sumber × c / (c − v), dengan c kelajuan bunyi (343 m/s dalam simulasi) dan v kelajuan sumber ke arah pendengar. Saat menjauh, v bernilai negatif dan pecahannya menjadi kurang dari satu. Perhatikan bahwa pergeserannya tidak simetris: pada 60 m/s sirene 440 Hz terdengar 533 Hz saat mendekat tetapi 374 Hz saat menjauh, naik 93 Hz tetapi turun hanya 65 Hz. Simulasi memakai rumus ini persis, dengan osilator Web Audio yang disetel ulang setiap frame ke nilai hasil hitungan, sehingga yang kamu dengar adalah frekuensi sesungguhnya, bukan rekaman.',
        'Pendengar dalam simulasi berdiri 8 m di samping lintasan sirene, dan ini penting. Rumus hanya memakai komponen kecepatan yang mengarah ke pendengar, yaitu kecepatan radial yang ditampilkan di bacaan. Dari jauh, hampir seluruh gerak sirene mengarah ke pendengar, sehingga nadanya bertahan tinggi. Saat sirene sejajar dengan pendengar, kecepatan radial melewati nol dengan mulus dan nadanya meluncur turun ke nilai rendahnya, bukan melompat. Slider kelajuan mengatur seberapa besar ayunannya, slider frekuensi mengatur nada asli sirene, dan tombol toggle menghentikan sirene agar kamu bisa memastikan tidak ada pergeseran ketika tidak ada yang bergerak. Lingkaran-lingkaran samar adalah puncak gelombang lampau, digambar berpusat di tempat sirene berada saat memancarkannya.',
        'Beberapa hal diabaikan. Bunyi yang kamu dengar dihitung dari posisi sirene sekarang, bukan posisinya saat bunyi itu berangkat, sehingga jeda kecil perambatan yang sebenarnya diabaikan. Kelajuan bunyi ditetapkan 343 m/s, yang tepat untuk udara sekitar 20 °C dan mengabaikan angin. Pendengar tidak pernah bergerak (pendengar yang bergerak mengikuti rumus yang sedikit berbeda, f_amat = f_sumber × (c + v_pendengar) / c), dan kelajuan sumber dibatasi 200 m/s, jauh di bawah kelajuan bunyi, sehingga simulasi tidak pernah mencapai ledakan sonik yang terjadi ketika v sama dengan c. Kekerasan bunyi berkurang dengan jarak di audionya, dan itu efek terpisah dari pergeseran nada.',
      ],
    },
    figure: {
      caption: {
        en: 'Wave crests emitted by a siren moving to the right. Each crest is a circle centred on where the siren was when it was emitted, so crests bunch up ahead (shorter wavelength, higher pitch) and spread out behind (longer wavelength, lower pitch).',
        id: 'Puncak gelombang yang dipancarkan sirene yang bergerak ke kanan. Tiap puncak adalah lingkaran berpusat di posisi sirene saat memancarkannya, sehingga puncak merapat di depan (panjang gelombang pendek, nada tinggi) dan merenggang di belakang (panjang gelombang panjang, nada rendah).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Doppler wavefronts from a moving siren', 'Muka gelombang Doppler dari sirene yang bergerak')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.1;opacity:.5}.k{fill:none;stroke-width:1.6}</style>
  <circle cx="110" cy="115" r="100" class="m"/>
  <circle cx="130" cy="115" r="80" class="m"/>
  <circle cx="150" cy="115" r="60" class="m"/>
  <circle cx="170" cy="115" r="40" class="m"/>
  <circle cx="190" cy="115" r="20" class="m"/>
  <circle cx="210" cy="115" r="9" fill="#ef4444"/>
  <line x1="222" y1="115" x2="262" y2="115" stroke="#ef4444" stroke-width="2.2" marker-end="url(#a)"/>
  <text x="226" y="106" fill="#ef4444">v</text>
  <line x1="110" y1="12" x2="110" y2="24" class="m"/>
  <text x="68" y="10" opacity=".8">${L('emitted here first', 'dipancarkan di sini dulu')}</text>
  <line x1="214" y1="124" x2="222" y2="138" class="k" stroke="#10b981"/>
  <line x1="226" y1="124" x2="232" y2="138" class="k" stroke="#10b981"/>
  <text x="236" y="142" fill="#10b981">λ ${L('short', 'pendek')}</text>
  <text x="236" y="156" fill="#10b981">${L('higher pitch', 'nada lebih tinggi')}</text>
  <line x1="30" y1="140" x2="10" y2="140" class="k" stroke="#3b82f6"/>
  <line x1="50" y1="140" x2="30" y2="140" class="k" stroke="#3b82f6" stroke-dasharray="3 3"/>
  <text x="8" y="160" fill="#3b82f6">λ ${L('long', 'panjang')}</text>
  <text x="8" y="174" fill="#3b82f6">${L('lower pitch', 'nada lebih rendah')}</text>
  <circle cx="300" cy="204" r="8" fill="#f59e0b"/>
  <text x="258" y="228" fill="#f59e0b">${L('listener (still)', 'pendengar (diam)')}</text>
  <text x="120" y="228">${L('crests travel at c = 343 m/s', 'puncak merambat dengan c = 343 m/s')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A moving source squeezes its wave crests together ahead of it and stretches them behind, so the frequency heard is higher in front and lower behind.',
        'For a source moving toward a still listener, f_obs = f_src × c / (c − v); moving away, v changes sign and the pitch drops.',
        'Only the component of velocity toward the listener counts, which is why the pitch slides smoothly down as the siren passes rather than jumping.',
        'The upward shift when approaching is larger than the downward shift when receding at the same speed.',
        'The source\'s own frequency never changes; only what the listener receives does.',
      ],
      id: [
        'Sumber yang bergerak merapatkan puncak gelombang di depannya dan merenggangkannya di belakang, sehingga frekuensi yang terdengar lebih tinggi di depan dan lebih rendah di belakang.',
        'Untuk sumber yang mendekati pendengar diam, f_amat = f_sumber × c / (c − v); saat menjauh, tanda v berbalik dan nada turun.',
        'Hanya komponen kecepatan ke arah pendengar yang berpengaruh, itulah sebabnya nada meluncur turun dengan mulus saat sirene lewat, bukan melompat.',
        'Kenaikan nada saat mendekat lebih besar daripada penurunannya saat menjauh dengan kelajuan yang sama.',
        'Frekuensi asli sumber tidak pernah berubah; yang berubah hanya yang diterima pendengar.',
      ],
    },
    vocabulary: {
      en: [
        ['Doppler effect', 'The change in received frequency when a source and a listener move relative to each other.'],
        ['Frequency (f)', 'The number of wave crests emitted or received per second, in hertz (Hz); heard as pitch.'],
        ['Wavelength (λ)', 'The distance between neighbouring crests; shorter in front of a moving source, longer behind it.'],
        ['Speed of sound (c)', 'How fast crests travel through the air, about 343 m/s at 20 °C; it does not depend on how the source moves.'],
        ['Radial velocity', 'The part of the source\'s velocity that points directly toward (positive) or away from (negative) the listener.'],
        ['Wavefront', 'A surface joining points of the same phase, such as one crest; from a point source each wavefront is a sphere, drawn as a circle.'],
      ],
      id: [
        ['Efek Doppler', 'Perubahan frekuensi yang diterima ketika sumber dan pendengar bergerak relatif satu sama lain.'],
        ['Frekuensi (f)', 'Banyaknya puncak gelombang yang dipancarkan atau diterima per detik, dalam hertz (Hz); terdengar sebagai tinggi nada.'],
        ['Panjang gelombang (λ)', 'Jarak antara puncak yang berdekatan; lebih pendek di depan sumber yang bergerak, lebih panjang di belakangnya.'],
        ['Kelajuan bunyi (c)', 'Seberapa cepat puncak merambat di udara, sekitar 343 m/s pada 20 °C; tidak bergantung pada gerak sumber.'],
        ['Kecepatan radial', 'Bagian kecepatan sumber yang mengarah langsung ke pendengar (positif) atau menjauhinya (negatif).'],
        ['Muka gelombang', 'Permukaan yang menghubungkan titik-titik berfase sama, misalnya satu puncak; dari sumber titik tiap muka gelombang berbentuk bola, digambar sebagai lingkaran.'],
      ],
    },
    misconceptions: {
      en: [
        ['The siren itself changes pitch as it drives past.', 'The siren emits exactly the same frequency the whole time; the driver hears no change. Only the frequency arriving at a listener changes, because of the relative motion.'],
        ['The pitch depends on how close the siren is.', 'It depends on how fast the siren is moving toward or away from you, not on distance. A siren approaching at steady speed from far away has a steady high pitch; the pitch only changes as it passes, when the radial velocity flips sign. Distance affects loudness instead.'],
        ['The pitch rises by as much as it later falls.', 'The two shifts are different sizes. At 60 m/s a 440 Hz siren rises to 533 Hz (+93 Hz) but falls to 374 Hz (−65 Hz), because the speed is subtracted from c in one case and added in the other.'],
        ['Sound from a moving source travels faster.', 'The speed of sound is set by the air, not by the source. Moving the source changes where each crest starts, which changes the spacing between crests, but every crest still travels at c.'],
      ],
      id: [
        ['Sirenenya sendiri berubah nada saat melintas.', 'Sirene memancarkan frekuensi yang persis sama sepanjang waktu; pengemudinya tidak mendengar perubahan. Yang berubah hanya frekuensi yang tiba pada pendengar, karena gerak relatif.'],
        ['Tinggi nada bergantung pada seberapa dekat sirenenya.', 'Nada bergantung pada seberapa cepat sirene mendekati atau menjauhi kamu, bukan pada jarak. Sirene yang mendekat dengan kelajuan tetap dari jauh nadanya tinggi dan tetap; nada hanya berubah saat ia lewat, ketika tanda kecepatan radialnya berbalik. Jarak memengaruhi kekerasan, bukan nada.'],
        ['Nada naik sebesar penurunannya nanti.', 'Kedua pergeserannya berbeda besar. Pada 60 m/s sirene 440 Hz naik ke 533 Hz (+93 Hz) tetapi turun ke 374 Hz (−65 Hz), karena kelajuan dikurangkan dari c pada satu kasus dan ditambahkan pada kasus lain.'],
        ['Bunyi dari sumber yang bergerak merambat lebih cepat.', 'Kelajuan bunyi ditentukan oleh udara, bukan oleh sumber. Menggerakkan sumber mengubah tempat tiap puncak berangkat, yang mengubah jarak antar puncak, tetapi setiap puncak tetap merambat dengan c.'],
      ],
    },
    realWorld: {
      en: [
        'An ambulance or train horn passing by is the everyday example: a steady high note, a slide as it passes, then a steady low note.',
        'Police radar guns and weather radar use the Doppler shift of reflected radio waves to measure the speed of cars and of raindrops inside storms.',
        'Doppler ultrasound in hospitals measures how fast blood flows in arteries and the heart from the frequency shift of echoes off moving blood cells.',
        'Astronomers measure the same effect with light: the spectral lines of galaxies moving away from us are shifted toward the red, which is how the expansion of the universe was discovered.',
      ],
      id: [
        'Ambulans atau klakson kereta yang melintas adalah contoh sehari-hari: nada tinggi yang tetap, meluncur turun saat lewat, lalu nada rendah yang tetap.',
        'Radar polisi dan radar cuaca memakai pergeseran Doppler gelombang radio yang dipantulkan untuk mengukur kelajuan mobil dan tetesan hujan di dalam badai.',
        'Ultrasonografi Doppler di rumah sakit mengukur seberapa cepat darah mengalir di arteri dan jantung dari pergeseran frekuensi gema yang dipantulkan sel darah yang bergerak.',
        'Astronom mengukur efek yang sama pada cahaya: garis spektrum galaksi yang menjauhi kita bergeser ke arah merah, dan dari sinilah pengembangan alam semesta ditemukan.',
      ],
    },
    questions: {
      en: [
        { q: 'A 440 Hz siren moves straight toward you at 60 m/s. What frequency do you hear? And after it has passed and is moving straight away?', a: 'Approaching: 440 × 343 / (343 − 60) = 440 × 343 / 283 ≈ 533 Hz. Receding: 440 × 343 / (343 + 60) = 440 × 343 / 403 ≈ 374 Hz. Both match the readout when the siren is far from the listener, where nearly all its velocity is radial.' },
        { q: 'Why does the f_observed readout slide smoothly from high to low as the siren passes, instead of jumping at the moment it is level with the listener?', a: 'The listener stands 8 m to the side of the path, so the velocity toward the listener is the radial component v × cos(angle). As the siren comes level, that angle approaches 90°, the radial velocity passes through zero and the shift passes smoothly through zero too. A listener exactly on the path would hear an abrupt jump.' },
        { q: 'What would the formula predict if the source speed could be raised to 343 m/s, and what happens physically?', a: 'The denominator c − v becomes zero, so the formula gives an infinite frequency, which signals that the model has broken down. Physically, every crest is emitted at the same point as the previous one, so the wavefronts pile up into a single shock wave: a sonic boom. The simulation caps the speed at 200 m/s to stay in the ordinary regime.' },
      ],
      id: [
        { q: 'Sirene 440 Hz bergerak lurus ke arahmu dengan kelajuan 60 m/s. Frekuensi berapa yang kamu dengar? Dan setelah lewat dan bergerak lurus menjauh?', a: 'Mendekat: 440 × 343 / (343 − 60) = 440 × 343 / 283 ≈ 533 Hz. Menjauh: 440 × 343 / (343 + 60) = 440 × 343 / 403 ≈ 374 Hz. Keduanya cocok dengan bacaan saat sirene jauh dari pendengar, ketika hampir semua kecepatannya radial.' },
        { q: 'Mengapa bacaan f_amat meluncur mulus dari tinggi ke rendah saat sirene lewat, bukan melompat pada saat sejajar dengan pendengar?', a: 'Pendengar berdiri 8 m di samping lintasan, sehingga kecepatan ke arah pendengar adalah komponen radial v × cos(sudut). Saat sirene sejajar, sudut itu mendekati 90°, kecepatan radial melewati nol dan pergeserannya pun melewati nol dengan mulus. Pendengar yang tepat di lintasan akan mendengar lompatan mendadak.' },
        { q: 'Apa yang diprediksi rumus jika kelajuan sumber bisa dinaikkan sampai 343 m/s, dan apa yang terjadi secara fisik?', a: 'Penyebut c − v menjadi nol, sehingga rumus memberi frekuensi tak hingga, tanda bahwa modelnya tidak lagi berlaku. Secara fisik, setiap puncak dipancarkan di titik yang sama dengan puncak sebelumnya, sehingga muka gelombang menumpuk menjadi satu gelombang kejut: ledakan sonik. Simulasi membatasi kelajuan di 200 m/s agar tetap di rezim biasa.' },
      ],
    },
  },
};
