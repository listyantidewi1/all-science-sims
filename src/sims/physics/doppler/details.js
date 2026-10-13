// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply f_obs = f_src · c / (c − v_src·cos θ) qualitatively.',
      'Connect wavefront spacing to observed pitch.',
      'Predict the supersonic Mach cone when v ≥ c.',
    ],
    id: [
      'Menerapkan f_obs = f_src · c / (c − v_src·cos θ) secara kualitatif.',
      'Menghubungkan jarak muka gelombang dengan frekuensi yang didengar.',
      'Memprediksi kerucut Mach supersonik saat v ≥ c.',
    ],
  },
  tryThis: {
    en: [
      'Pass the source close to the observer — when does pitch flip?',
      'Push speed past sound speed — does a Mach cone appear?',
      'Move the observer instead — same effect or different?',
    ],
    id: [
      'Lewatkan sumber dekat pengamat — kapan nada berubah?',
      'Naikkan kecepatan melewati kecepatan suara — apakah muncul kerucut Mach?',
      'Gerakkan pengamat bukan sumber — efeknya sama atau beda?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A sound source sends out a wavefront every T = 1/f seconds, and each front spreads out as a circle at the speed of sound c, centred on the spot where the source was when it was emitted. If the source stands still, the fronts are concentric and evenly spaced one wavelength λ = c/f apart. If the source moves, each new front is emitted from a new position: ahead of the source the fronts are squeezed together, and behind it they are stretched out. The sound itself always travels at c through the air; only the spacing changes.',
        'An observer counts how many fronts arrive per second. Ahead of the source the fronts are closer, so more arrive each second and the pitch is higher; behind, fewer arrive and the pitch is lower. For a source moving at speed v straight toward the observer, f_obs = f c / (c − v); moving straight away, f_obs = f c / (c + v). In general only the component of the velocity along the line to the observer counts, f_obs = f c / (c − v cos θ), so the shift is largest head-on and vanishes at the instant the source passes at right angles. This is why a siren seems to drop in pitch as it goes by: the observed frequency changes smoothly from above f to below f as the direction to the observer swings round.',
        'The simulation draws every wavefront as an expanding circle anchored at the source\'s position when it was emitted, so the bunching and stretching appear automatically. Speeds are in pixels per second: the source-speed and sound-speed sliders set v and c, the frequency slider sets how often fronts are emitted, and the readout applies the formula above using the component of the source velocity toward the observer at that moment. Drag the source to fling it in any direction, or drag the observer to listen from a different place. When v exceeds c, the source outruns its own sound; the fronts pile up on a V-shaped shock front, the Mach cone, whose half-angle obeys sin α = c/v. Everything inside the cone has heard the source; a listener on the ground hears the whole cone sweep past as a single sonic boom.',
        'Several things are simplified. The formula uses the source\'s current position rather than the position at the moment each front was emitted, which is a good approximation when v is well below c but drifts off as v approaches c. The readout accounts only for source motion; dragging the observer changes what you see but the number shown assumes a stationary listener, so you cannot measure the slightly different observer-moving formula f_obs = f (c + v_obs)/c here. The medium is still (no wind), the picture is two-dimensional, and the loudness of the sound is not modelled.',
      ],
      id: [
        'Sumber bunyi memancarkan satu muka gelombang setiap T = 1/f sekon, dan tiap muka gelombang menyebar sebagai lingkaran dengan kelajuan bunyi c, berpusat di tempat sumber berada saat muka itu dipancarkan. Jika sumber diam, muka-muka gelombang sepusat dan berjarak sama, yaitu satu panjang gelombang λ = c/f. Jika sumber bergerak, tiap muka baru dipancarkan dari posisi baru: di depan sumber muka-muka gelombang terdesak rapat, dan di belakangnya teregang. Bunyi itu sendiri selalu merambat dengan kelajuan c di udara; hanya jaraknya yang berubah.',
        'Pengamat menghitung berapa muka gelombang yang tiba tiap sekon. Di depan sumber muka-muka lebih rapat, sehingga lebih banyak yang tiba tiap sekon dan nadanya lebih tinggi; di belakang, lebih sedikit yang tiba dan nadanya lebih rendah. Untuk sumber yang bergerak dengan kelajuan v lurus menuju pengamat, f_obs = f c / (c − v); lurus menjauh, f_obs = f c / (c + v). Secara umum hanya komponen kecepatan sepanjang garis ke pengamat yang berpengaruh, f_obs = f c / (c − v cos θ), sehingga pergeseran terbesar saat berhadapan langsung dan hilang pada saat sumber melintas tegak lurus. Itulah sebabnya sirene terdengar menurun nadanya saat melintas: frekuensi yang terdengar berubah mulus dari di atas f menjadi di bawah f ketika arah ke pengamat berputar.',
        'Simulasi menggambar setiap muka gelombang sebagai lingkaran yang membesar, berpusat di posisi sumber saat muka itu dipancarkan, sehingga perapatan dan peregangan muncul dengan sendirinya. Kelajuan dalam piksel per sekon: slider kelajuan sumber dan kelajuan bunyi mengatur v dan c, slider frekuensi mengatur seberapa sering muka dipancarkan, dan tampilan menerapkan rumus di atas memakai komponen kecepatan sumber menuju pengamat pada saat itu. Seret sumber untuk melemparkannya ke arah mana pun, atau seret pengamat untuk mendengar dari tempat lain. Ketika v melebihi c, sumber mendahului bunyinya sendiri; muka-muka gelombang menumpuk pada muka kejut berbentuk V, yaitu kerucut Mach, yang setengah sudutnya memenuhi sin α = c/v. Semua yang berada di dalam kerucut sudah mendengar sumber; pendengar di tanah mendengar seluruh kerucut menyapu lewat sebagai satu dentuman sonik.',
        'Beberapa hal disederhanakan. Rumusnya memakai posisi sumber saat ini, bukan posisi saat tiap muka gelombang dipancarkan, yang merupakan pendekatan baik ketika v jauh di bawah c tetapi meleset saat v mendekati c. Tampilan hanya memperhitungkan gerak sumber; menyeret pengamat mengubah apa yang kamu lihat, tetapi angka yang ditampilkan mengasumsikan pendengar diam, sehingga rumus pengamat bergerak yang sedikit berbeda, f_obs = f (c + v_obs)/c, tidak dapat diukur di sini. Mediumnya diam (tanpa angin), gambarnya dua dimensi, dan kenyaringan bunyi tidak dimodelkan.',
      ],
    },
    figure: {
      caption: {
        en: 'Each wavefront is centred where the source was when it was emitted. Because the source has moved on, the fronts bunch up ahead (shorter wavelength, higher pitch) and spread out behind (longer wavelength, lower pitch). Here v = c/2.',
        id: 'Setiap muka gelombang berpusat di tempat sumber berada saat muka itu dipancarkan. Karena sumber terus bergerak, muka-muka merapat di depan (panjang gelombang lebih pendek, nada lebih tinggi) dan merenggang di belakang (panjang gelombang lebih panjang, nada lebih rendah). Di sini v = c/2.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Wavefronts from a moving sound source', 'Muka gelombang dari sumber bunyi yang bergerak')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.w{fill:none;stroke:#3b82f6;stroke-width:1.6}</style>
  <circle cx="140" cy="120" r="120" class="w"/>
  <circle cx="160" cy="120" r="80" class="w"/>
  <circle cx="180" cy="120" r="40" class="w"/>
  <circle cx="140" cy="120" r="2.5" fill="currentColor" opacity=".7"/>
  <circle cx="160" cy="120" r="2.5" fill="currentColor" opacity=".7"/>
  <circle cx="180" cy="120" r="2.5" fill="currentColor" opacity=".7"/>
  <circle cx="200" cy="120" r="8" fill="#ef4444"/>
  <line x1="208" y1="120" x2="236" y2="120" stroke="#ef4444" stroke-width="2.2" marker-end="url(#a)"/>
  <text x="212" y="112" fill="#ef4444">v</text>
  <line x1="220" y1="150" x2="240" y2="150" class="m" marker-start="url(#b)" marker-end="url(#b)"/>
  <text x="224" y="166" fill="#f59e0b">${L('short λ', 'λ pendek')}</text>
  <line x1="20" y1="150" x2="80" y2="150" class="m" marker-start="url(#b)" marker-end="url(#b)"/>
  <text x="24" y="166" fill="#8b5cf6">${L('long λ', 'λ panjang')}</text>
  <circle cx="300" cy="120" r="9" fill="#10b981"/>
  <text x="276" y="100" fill="#10b981">${L('higher pitch', 'nada tinggi')}</text>
  <text x="300" y="140" fill="#10b981">f c/(c − v)</text>
  <text x="26" y="40" fill="#8b5cf6">${L('behind: lower pitch', 'belakang: nada rendah')}</text>
  <text x="26" y="56" fill="#8b5cf6">f c/(c + v)</text>
  <text x="24" y="228">${L('sound always travels at c; only the spacing changes', 'bunyi selalu merambat dengan c; hanya jaraknya berubah')}</text>
  <text x="120" y="210">${L('dots: where each front was emitted', 'titik: tempat tiap muka dipancarkan')}</text>
  <defs>
    <marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="3" refY="3"><circle cx="3" cy="3" r="2" fill="currentColor"/></marker>
  </defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A moving source emits each wavefront from a new place, so fronts bunch up ahead of it and spread out behind.',
        'The observed frequency is f_obs = f c / (c − v) for a source approaching head-on and f c / (c + v) for one receding.',
        'Only the velocity component along the line to the observer matters; the shift vanishes at the moment of closest approach.',
        'The speed of sound in the air is unchanged; only the wavelength and the observed frequency change.',
        'When the source is faster than sound the fronts pile up into a Mach cone with sin α = c/v, heard as a sonic boom.',
      ],
      id: [
        'Sumber yang bergerak memancarkan tiap muka gelombang dari tempat baru, sehingga muka-muka merapat di depannya dan merenggang di belakangnya.',
        'Frekuensi yang terdengar adalah f_obs = f c / (c − v) untuk sumber yang mendekat lurus dan f c / (c + v) untuk yang menjauh.',
        'Hanya komponen kecepatan sepanjang garis ke pengamat yang berpengaruh; pergeseran hilang pada saat jarak terdekat.',
        'Kelajuan bunyi di udara tidak berubah; yang berubah hanya panjang gelombang dan frekuensi yang terdengar.',
        'Ketika sumber lebih cepat daripada bunyi, muka-muka gelombang menumpuk menjadi kerucut Mach dengan sin α = c/v, yang terdengar sebagai dentuman sonik.',
      ],
    },
    vocabulary: {
      en: [
        ['Wavefront', 'The set of points reached by one emitted pulse at the same moment; a circle (sphere in 3D) around the emission point.'],
        ['Frequency (f)', 'The number of wavefronts emitted or received per second, heard as pitch.'],
        ['Wavelength (λ)', 'The distance between neighbouring wavefronts, equal to c/f for a stationary source.'],
        ['Doppler shift', 'The difference between the observed frequency and the source frequency caused by relative motion.'],
        ['Speed of sound (c)', 'How fast a wavefront travels through the medium, about 343 m/s in air at 20 °C; it does not depend on the source\'s motion.'],
        ['Mach number', 'The ratio v/c of the source speed to the speed of sound; above 1 is supersonic.'],
        ['Mach cone', 'The V-shaped shock front formed by overlapping wavefronts from a supersonic source, with half-angle α where sin α = c/v.'],
        ['Redshift and blueshift', 'The Doppler effect for light: frequencies drop (redden) from receding sources and rise (bluen) from approaching ones.'],
      ],
      id: [
        ['Muka gelombang', 'Himpunan titik yang dicapai satu denyut yang dipancarkan pada saat yang sama; lingkaran (bola dalam 3D) di sekitar titik pancar.'],
        ['Frekuensi (f)', 'Jumlah muka gelombang yang dipancarkan atau diterima per sekon, terdengar sebagai tinggi nada.'],
        ['Panjang gelombang (λ)', 'Jarak antara dua muka gelombang berurutan, sama dengan c/f untuk sumber diam.'],
        ['Pergeseran Doppler', 'Selisih antara frekuensi yang terdengar dan frekuensi sumber akibat gerak relatif.'],
        ['Kelajuan bunyi (c)', 'Seberapa cepat muka gelombang merambat di medium, sekitar 343 m/s di udara pada 20 °C; tidak bergantung pada gerak sumber.'],
        ['Bilangan Mach', 'Rasio v/c antara kelajuan sumber dan kelajuan bunyi; di atas 1 disebut supersonik.'],
        ['Kerucut Mach', 'Muka kejut berbentuk V yang terbentuk dari tumpang tindih muka gelombang sumber supersonik, dengan setengah sudut α yang memenuhi sin α = c/v.'],
        ['Pergeseran merah dan biru', 'Efek Doppler untuk cahaya: frekuensi turun (memerah) dari sumber yang menjauh dan naik (membiru) dari sumber yang mendekat.'],
      ],
    },
    misconceptions: {
      en: [
        ['The siren itself changes pitch as the ambulance passes.', 'The source emits the same frequency the whole time; the driver hears no change. What changes is the spacing of the wavefronts reaching you, because the source moved between emitting them.'],
        ['The pitch keeps rising as the source gets closer.', 'For a source moving straight toward you at constant speed, the pitch is constant (and higher than f). It is loudness that rises. The pitch only slides downward as the source passes and the direction to you swings round.'],
        ['The Doppler effect makes the sound travel faster or slower.', 'The speed of sound is set by the air, not by the source. Every wavefront moves at c; the motion of the source only changes where each front starts and therefore how far apart they are.'],
        ['A sonic boom happens once, at the moment the aircraft breaks the sound barrier.', 'A supersonic aircraft drags its Mach cone along continuously. Each listener on the ground hears a boom when the cone sweeps over them, so the boom is heard along the whole flight path.'],
      ],
      id: [
        ['Sirene itu sendiri berubah nadanya saat ambulans melintas.', 'Sumber memancarkan frekuensi yang sama sepanjang waktu; pengemudi tidak mendengar perubahan. Yang berubah adalah jarak muka-muka gelombang yang mencapai kamu, karena sumber telah bergerak di antara pemancarannya.'],
        ['Nada terus naik saat sumber semakin dekat.', 'Untuk sumber yang bergerak lurus menuju kamu dengan kelajuan tetap, nadanya tetap (dan lebih tinggi dari f). Yang naik adalah kenyaringannya. Nada baru meluncur turun saat sumber melintas dan arah ke kamu berputar.'],
        ['Efek Doppler membuat bunyi merambat lebih cepat atau lebih lambat.', 'Kelajuan bunyi ditentukan oleh udara, bukan oleh sumber. Setiap muka gelombang bergerak dengan c; gerak sumber hanya mengubah tempat tiap muka bermula dan karenanya seberapa jauh jaraknya satu sama lain.'],
        ['Dentuman sonik terjadi sekali, pada saat pesawat menembus batas kelajuan bunyi.', 'Pesawat supersonik menyeret kerucut Mach-nya terus-menerus. Setiap pendengar di tanah mendengar dentuman saat kerucut menyapu lewat di atasnya, sehingga dentuman terdengar di sepanjang jalur penerbangan.'],
      ],
    },
    realWorld: {
      en: [
        'Police speed radar and weather radar measure the Doppler shift of reflected radio waves to find how fast cars or raindrops are moving.',
        'Medical ultrasound uses the Doppler shift from moving blood cells to display blood flow in arteries and the heartbeat of a fetus.',
        'Astronomers measure redshifts in starlight to find how fast galaxies recede, the evidence that the universe is expanding, and detect planets from the tiny wobble of their stars.',
        'Bats and dolphins use Doppler shifts in their echoes to tell whether prey is moving toward or away from them.',
      ],
      id: [
        'Radar kecepatan polisi dan radar cuaca mengukur pergeseran Doppler gelombang radio yang dipantulkan untuk mengetahui seberapa cepat mobil atau tetes hujan bergerak.',
        'Ultrasonografi medis memakai pergeseran Doppler dari sel darah yang bergerak untuk menampilkan aliran darah di pembuluh dan detak jantung janin.',
        'Astronom mengukur pergeseran merah cahaya bintang untuk mengetahui seberapa cepat galaksi menjauh, bukti bahwa alam semesta mengembang, dan mendeteksi planet dari goyangan kecil bintangnya.',
        'Kelelawar dan lumba-lumba memakai pergeseran Doppler pada gema mereka untuk mengetahui apakah mangsa bergerak mendekat atau menjauh.',
      ],
    },
    questions: {
      en: [
        { q: 'A siren emits 1000 Hz and the ambulance moves at 50 m/s through still air (c = 343 m/s). What frequency do you hear as it approaches, and as it recedes?', a: 'Approaching: f_obs = 1000 × 343 / (343 − 50) = 1000 × 343/293 ≈ 1171 Hz. Receding: 1000 × 343 / (343 + 50) = 1000 × 343/393 ≈ 873 Hz. The drop as it passes is about 300 Hz, a clearly audible slide of several semitones.' },
        { q: 'In the sim, set c = 120, f = 1.5 Hz and source speed 60 (half the speed of sound). What frequencies does the readout show when the source heads straight at the observer and straight away?', a: 'Toward: 1.5 × 120 / (120 − 60) = 1.5 × 2 = 3.0 Hz, double the emitted frequency. Away: 1.5 × 120 / (120 + 60) = 1.5 × 120/180 = 1.0 Hz. Notice the shifts are not symmetric: +1.5 Hz approaching but only −0.5 Hz receding.' },
        { q: 'Why does the readout show almost exactly the source frequency at the instant the source passes directly beside the observer, even though it is moving fast?', a: 'At that moment the source\'s velocity is perpendicular to the line joining it to the observer, so the component toward the observer, v cos θ, is zero. The formula f c / (c − v cos θ) then gives f_obs = f. Fronts emitted at that instant are neither bunched nor stretched along that direction.' },
      ],
      id: [
        { q: 'Sebuah sirene memancarkan 1000 Hz dan ambulans bergerak 50 m/s di udara diam (c = 343 m/s). Berapa frekuensi yang kamu dengar saat mendekat, dan saat menjauh?', a: 'Mendekat: f_obs = 1000 × 343 / (343 − 50) = 1000 × 343/293 ≈ 1171 Hz. Menjauh: 1000 × 343 / (343 + 50) = 1000 × 343/393 ≈ 873 Hz. Penurunan saat melintas sekitar 300 Hz, luncuran beberapa seminada yang jelas terdengar.' },
        { q: 'Di simulasi, atur c = 120, f = 1,5 Hz, dan kelajuan sumber 60 (setengah kelajuan bunyi). Frekuensi berapa yang ditampilkan saat sumber bergerak lurus menuju pengamat dan lurus menjauh?', a: 'Menuju: 1,5 × 120 / (120 − 60) = 1,5 × 2 = 3,0 Hz, dua kali frekuensi pancaran. Menjauh: 1,5 × 120 / (120 + 60) = 1,5 × 120/180 = 1,0 Hz. Perhatikan pergeserannya tidak simetris: +1,5 Hz saat mendekat tetapi hanya −0,5 Hz saat menjauh.' },
        { q: 'Mengapa tampilan menunjukkan hampir tepat frekuensi sumber pada saat sumber melintas tepat di samping pengamat, padahal sumber bergerak cepat?', a: 'Pada saat itu kecepatan sumber tegak lurus terhadap garis yang menghubungkannya dengan pengamat, sehingga komponen menuju pengamat, v cos θ, bernilai nol. Rumus f c / (c − v cos θ) lalu memberi f_obs = f. Muka gelombang yang dipancarkan saat itu tidak merapat maupun merenggang sepanjang arah tersebut.' },
      ],
    },
  },
};
