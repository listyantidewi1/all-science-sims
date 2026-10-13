// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply n₁ sin θ₁ = n₂ sin θ₂.',
      'See light bending toward / away from normal as n changes.',
      'Identify the critical angle for total internal reflection.',
    ],
    id: [
      'Menerapkan n₁ sin θ₁ = n₂ sin θ₂.',
      'Melihat cahaya membelok mendekati / menjauhi normal saat n berubah.',
      'Mengenali sudut kritis untuk pemantulan internal total.',
    ],
  },
  tryThis: {
    en: [
      'Air → glass (n=1.5) — does light bend toward or away from normal?',
      'Glass → air, angle 50° — total internal reflection?',
      'Find the critical angle for water (n=1.33) → air.',
    ],
    id: [
      'Udara → kaca (n=1,5) — cahaya membelok ke arah atau menjauhi normal?',
      'Kaca → udara, sudut 50° — pemantulan internal total?',
      'Cari sudut kritis air (n=1,33) → udara.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Light travels at 300,000 km/s in empty space, but inside water or glass it moves more slowly. The refractive index n of a material tells you by how much: n = c/v, so in glass with n = 1.5 light travels at two thirds of its vacuum speed. When a beam crosses the boundary between two materials at an angle, the side of the beam that enters the slower material first is held back, and the whole beam swings round. This change of direction is refraction. Entering a slower (higher-n) material, light bends toward the normal, the line perpendicular to the surface; entering a faster material it bends away from the normal.',
        'The amount of bending follows Snell\'s law: n₁ sin θ₁ = n₂ sin θ₂, where the angles are measured from the normal, not from the surface. In the simulation you choose the two materials and set the angle of incidence by dragging the yellow ray or using the slider. The sim then solves Snell\'s law for θ₂ and draws the refracted ray in green. For example, light going from air into glass at 30° has sin θ₂ = sin 30°/1.5 = 0.333, so θ₂ ≈ 19.5°. Along the normal (θ₁ = 0°) there is no bending at all, only a change of speed.',
        'Something dramatic happens when light goes from a denser to a less dense material, say glass to air. Now θ₂ is larger than θ₁, and as you increase θ₁ the refracted ray flattens toward the surface. At the critical angle, sin θ_c = n₂/n₁, the refracted ray would skim along the surface at 90°. Beyond it Snell\'s law would need sin θ₂ > 1, which is impossible, so no light gets out: it is all reflected back, which is total internal reflection. The sim shows this by turning the reflected ray bright red. For glass to air θ_c ≈ 41.8°, for water to air ≈ 48.6°, and for diamond to air only ≈ 24.4°.',
        'The simulation keeps things simple. It draws a single ray of one colour, but real n depends slightly on wavelength, so white light fans out into a spectrum (dispersion), which is how prisms and raindrops make rainbows. It also shows a faint reflected ray at every angle but does not calculate how bright it is; in reality some light is always reflected at a boundary, and the reflected share grows as the angle increases, reaching 100% only at and beyond the critical angle. Absorption and surface roughness are ignored, and the index values are typical ones for yellow light.',
      ],
      id: [
        'Cahaya bergerak 300.000 km/s di ruang hampa, tetapi di dalam air atau kaca ia bergerak lebih lambat. Indeks bias n suatu bahan menyatakan seberapa lambat: n = c/v, sehingga di kaca dengan n = 1,5 cahaya bergerak dengan dua pertiga kecepatannya di vakum. Ketika berkas melintasi batas dua bahan secara miring, sisi berkas yang lebih dulu memasuki bahan yang lebih lambat tertahan, dan seluruh berkas berputar arah. Perubahan arah inilah pembiasan. Saat memasuki bahan yang lebih lambat (n lebih besar), cahaya membelok mendekati garis normal, yaitu garis tegak lurus permukaan; saat memasuki bahan yang lebih cepat, cahaya membelok menjauhi normal.',
        'Besar pembelokan mengikuti hukum Snell: n₁ sin θ₁ = n₂ sin θ₂, dengan sudut diukur dari garis normal, bukan dari permukaan. Di simulasi kamu memilih dua bahan dan mengatur sudut datang dengan menyeret berkas kuning atau memakai slider. Simulasi lalu menyelesaikan hukum Snell untuk θ₂ dan menggambar berkas bias berwarna hijau. Misalnya, cahaya dari udara ke kaca pada 30° memiliki sin θ₂ = sin 30°/1,5 = 0,333, sehingga θ₂ ≈ 19,5°. Sepanjang garis normal (θ₁ = 0°) tidak ada pembelokan sama sekali, hanya perubahan kecepatan.',
        'Sesuatu yang dramatis terjadi ketika cahaya bergerak dari bahan yang lebih rapat ke yang kurang rapat, misalnya kaca ke udara. Kini θ₂ lebih besar daripada θ₁, dan saat θ₁ diperbesar berkas bias makin rebah mendekati permukaan. Pada sudut kritis, sin θ_c = n₂/n₁, berkas bias akan menyusur permukaan pada 90°. Melewati sudut itu hukum Snell menuntut sin θ₂ > 1, yang tidak mungkin, sehingga tidak ada cahaya yang keluar: semuanya dipantulkan kembali, inilah pemantulan internal total. Simulasi menunjukkannya dengan mengubah berkas pantul menjadi merah terang. Untuk kaca ke udara θ_c ≈ 41,8°, untuk air ke udara ≈ 48,6°, dan untuk berlian ke udara hanya ≈ 24,4°.',
        'Simulasi ini menyederhanakan keadaan. Ia menggambar satu berkas dengan satu warna, padahal n sesungguhnya sedikit bergantung pada panjang gelombang, sehingga cahaya putih terurai menjadi spektrum (dispersi); begitulah prisma dan tetes hujan membentuk pelangi. Simulasi juga menampilkan berkas pantul redup pada setiap sudut tetapi tidak menghitung seberapa terangnya; dalam kenyataan selalu ada sebagian cahaya yang dipantulkan di batas bahan, dan bagian yang dipantulkan bertambah seiring sudut, mencapai 100% hanya pada dan setelah sudut kritis. Penyerapan dan kekasaran permukaan diabaikan, dan nilai indeks yang dipakai adalah nilai khas untuk cahaya kuning.',
      ],
    },
    figure: {
      caption: {
        en: 'Light entering a slower medium (higher n) bends toward the normal. The short lines are wavefronts: they are closer together in glass because the light travels more slowly there, and that difference in speed is what turns the beam.',
        id: 'Cahaya yang memasuki medium lebih lambat (n lebih besar) membelok mendekati garis normal. Garis-garis pendek adalah muka gelombang: di kaca jaraknya lebih rapat karena cahaya bergerak lebih lambat, dan perbedaan kecepatan itulah yang membelokkan berkas.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Refraction of a ray at an air-glass boundary', 'Pembiasan berkas pada batas udara-kaca')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.r{stroke-width:2.6;fill:none}.w{stroke:currentColor;stroke-width:1.1;opacity:.7}.s{font-size:10px;opacity:.8}</style>
  <rect x="20" y="130" width="320" height="100" fill="#3b82f6" opacity=".12"/>
  <line x1="20" y1="130" x2="340" y2="130" stroke="currentColor" stroke-width="1.6"/>
  <line x1="180" y1="24" x2="180" y2="232" class="m" stroke-dasharray="4 4"/>
  <text x="186" y="34" class="s">${L('normal', 'normal')}</text>
  <text x="26" y="118">n₁ = ${L('1.0', '1,0')} (${L('air', 'udara')})</text>
  <text x="26" y="150">n₂ = ${L('1.5', '1,5')} (${L('glass', 'kaca')})</text>
  <line x1="102" y1="52" x2="180" y2="130" class="r" stroke="#f59e0b" marker-end="url(#n)"/>
  <text x="70" y="50" fill="#f59e0b">${L('incident', 'datang')}</text>
  <line x1="180" y1="130" x2="227" y2="218" class="r" stroke="#10b981" marker-end="url(#n)"/>
  <text x="232" y="228" fill="#10b981">${L('refracted', 'bias')}</text>
  <line x1="180" y1="130" x2="258" y2="52" class="m" stroke-dasharray="3 3" marker-end="url(#n)"/>
  <text x="262" y="48" class="s">${L('reflected (faint)', 'pantul (redup)')}</text>
  <line x1="109.9" y1="72.7" x2="122.7" y2="59.9" class="w"/>
  <line x1="124.1" y1="86.9" x2="136.9" y2="74.1" class="w"/>
  <line x1="138.2" y1="101" x2="151" y2="88.2" class="w"/>
  <line x1="152.4" y1="115.2" x2="165.2" y2="102.4" class="w"/>
  <line x1="178.3" y1="145.9" x2="194.1" y2="137.5" class="w"/>
  <line x1="184.6" y1="157.8" x2="200.4" y2="149.4" class="w"/>
  <line x1="190.9" y1="169.5" x2="206.7" y2="161.1" class="w"/>
  <line x1="197.1" y1="181.3" x2="212.9" y2="172.9" class="w"/>
  <line x1="203.4" y1="193.1" x2="219.2" y2="184.7" class="w"/>
  <path d="M180 100 A30 30 0 0 0 158.8 108.8" class="m"/>
  <text x="156" y="96">θ₁</text>
  <path d="M180 160 A30 30 0 0 0 194.1 156.5" class="m"/>
  <text x="160" y="178">θ₂</text>
  <text x="236" y="160" class="s">${L('wavefronts closer:', 'muka gelombang rapat:')}</text>
  <text x="236" y="173" class="s">${L('light is slower here', 'cahaya lebih lambat')}</text>
  <text x="236" y="196" class="s">n₁ sin θ₁ = n₂ sin θ₂</text>
  <text x="26" y="222" class="s">${L('θ₂ smaller than θ₁', 'θ₂ lebih kecil dari θ₁')}</text>
  <defs><marker id="n" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Light bends at a boundary because it changes speed; the refractive index n = c/v measures how much slower it goes in a material.',
        'Snell\'s law, n₁ sin θ₁ = n₂ sin θ₂, with angles measured from the normal, predicts the new direction.',
        'Going into a higher-n material the ray bends toward the normal; going into a lower-n material it bends away.',
        'When n₁ > n₂ there is a critical angle, sin θ_c = n₂/n₁; beyond it no light is transmitted and all of it is reflected inside.',
        'Light hitting the boundary head-on (θ₁ = 0°) is slowed but not bent.',
      ],
      id: [
        'Cahaya membelok di batas bahan karena kecepatannya berubah; indeks bias n = c/v mengukur seberapa lambat cahaya di dalam bahan.',
        'Hukum Snell, n₁ sin θ₁ = n₂ sin θ₂, dengan sudut diukur dari garis normal, memprediksi arah barunya.',
        'Masuk ke bahan dengan n lebih besar, berkas membelok mendekati normal; masuk ke bahan dengan n lebih kecil, berkas membelok menjauhi normal.',
        'Jika n₁ > n₂ ada sudut kritis, sin θ_c = n₂/n₁; melewati sudut itu tidak ada cahaya yang diteruskan dan semuanya dipantulkan di dalam.',
        'Cahaya yang mengenai batas secara tegak lurus (θ₁ = 0°) melambat tetapi tidak membelok.',
      ],
    },
    vocabulary: {
      en: [
        ['Refraction', 'The bending of light as it passes from one material into another with a different speed of light.'],
        ['Refractive index (n)', 'The ratio of the speed of light in vacuum to its speed in a material; air ≈ 1.00, water 1.33, glass about 1.5, diamond 2.42.'],
        ['Normal', 'The imaginary line perpendicular to the surface at the point where the ray hits; all angles are measured from it.'],
        ['Angle of incidence / refraction', 'The angle between the incoming ray and the normal (θ₁), and between the outgoing ray and the normal (θ₂).'],
        ['Critical angle (θ_c)', 'The angle of incidence, going from high n to low n, at which the refracted ray grazes the surface at 90°.'],
        ['Total internal reflection', 'What happens beyond the critical angle: all the light is reflected back into the denser material.'],
        ['Dispersion', 'The slight dependence of n on colour, which splits white light into a spectrum.'],
      ],
      id: [
        ['Pembiasan', 'Pembelokan cahaya saat berpindah dari satu bahan ke bahan lain yang kecepatan cahayanya berbeda.'],
        ['Indeks bias (n)', 'Perbandingan kecepatan cahaya di vakum terhadap kecepatannya di suatu bahan; udara ≈ 1,00, air 1,33, kaca sekitar 1,5, berlian 2,42.'],
        ['Garis normal', 'Garis khayal yang tegak lurus permukaan di titik berkas mengenai permukaan; semua sudut diukur dari garis ini.'],
        ['Sudut datang / sudut bias', 'Sudut antara berkas datang dan normal (θ₁), dan antara berkas keluar dan normal (θ₂).'],
        ['Sudut kritis (θ_c)', 'Sudut datang, dari n besar ke n kecil, ketika berkas bias menyusur permukaan pada 90°.'],
        ['Pemantulan internal total', 'Yang terjadi melewati sudut kritis: seluruh cahaya dipantulkan kembali ke bahan yang lebih rapat.'],
        ['Dispersi', 'Ketergantungan kecil n pada warna, yang menguraikan cahaya putih menjadi spektrum.'],
      ],
    },
    misconceptions: {
      en: [
        ['The angles in Snell\'s law are measured from the surface.', 'They are measured from the normal, the line perpendicular to the surface. A ray along the normal has θ = 0°, not 90°.'],
        ['Light always bends when it enters glass.', 'Only if it arrives at an angle. A ray along the normal slows down but goes straight on; the sim shows θ₂ = 0° when θ₁ = 0°.'],
        ['Total internal reflection can happen going from air into glass.', 'It requires going from higher n to lower n. From air into glass, sin θ₂ = sin θ₁/1.5 is always less than 1, so there is always a refracted ray.'],
        ['The reflected ray appears only at the critical angle.', 'Some light is reflected at every angle of incidence; the sim draws it faintly. What changes at the critical angle is that the reflection becomes total.'],
      ],
      id: [
        ['Sudut pada hukum Snell diukur dari permukaan.', 'Sudut diukur dari garis normal, garis yang tegak lurus permukaan. Berkas yang searah normal memiliki θ = 0°, bukan 90°.'],
        ['Cahaya selalu membelok saat memasuki kaca.', 'Hanya jika datang secara miring. Berkas yang searah normal melambat tetapi terus lurus; simulasi menunjukkan θ₂ = 0° saat θ₁ = 0°.'],
        ['Pemantulan internal total bisa terjadi dari udara ke kaca.', 'Ini membutuhkan perpindahan dari n besar ke n kecil. Dari udara ke kaca, sin θ₂ = sin θ₁/1,5 selalu kurang dari 1, sehingga selalu ada berkas bias.'],
        ['Berkas pantul hanya muncul pada sudut kritis.', 'Sebagian cahaya dipantulkan pada setiap sudut datang; simulasi menggambarnya redup. Yang berubah pada sudut kritis adalah pemantulannya menjadi total.'],
      ],
    },
    realWorld: {
      en: [
        'Optical fibres carry internet and phone signals as light that bounces along by total internal reflection, because the glass core has a higher n than its coating.',
        'A swimming pool looks shallower than it is, and a straw in a glass looks bent, because light from underwater bends away from the normal as it leaves the water.',
        'Diamonds sparkle because their very high n gives a small critical angle (about 24°), so light entering a well-cut stone is trapped and bounced back out of the top.',
        'Eyeglasses, camera lenses and your own eye all work by refraction: curved surfaces bend rays by different amounts so they meet at a focus.',
      ],
      id: [
        'Serat optik membawa sinyal internet dan telepon sebagai cahaya yang terus memantul lewat pemantulan internal total, karena inti kacanya memiliki n lebih besar daripada lapisan pembungkusnya.',
        'Kolam renang tampak lebih dangkal dari aslinya, dan sedotan di dalam gelas tampak bengkok, karena cahaya dari dalam air membelok menjauhi normal saat keluar dari air.',
        'Berlian berkilau karena n-nya yang sangat besar memberi sudut kritis kecil (sekitar 24°), sehingga cahaya yang masuk ke batu yang dipotong dengan baik terperangkap dan dipantulkan kembali keluar dari bagian atas.',
        'Kacamata, lensa kamera, dan mata kita sendiri bekerja dengan pembiasan: permukaan lengkung membelokkan berkas dengan besar yang berbeda-beda sehingga berkas bertemu di satu titik fokus.',
      ],
    },
    questions: {
      en: [
        { q: 'A ray in air strikes water (n = 1.33) at 45°. What is the angle of refraction?', a: 'sin θ₂ = (1.00 × sin 45°)/1.33 = 0.707/1.33 = 0.532, so θ₂ ≈ 32°. The ray bends toward the normal because water is the slower medium.' },
        { q: 'What is the critical angle for light going from glass (n = 1.5) into air? What happens to a ray hitting the boundary at 50°?', a: 'sin θ_c = 1.0/1.5 = 0.667, so θ_c ≈ 41.8°. A ray at 50° exceeds this, so Snell\'s law would require sin θ₂ = 1.5 × sin 50° = 1.15, which is impossible: the ray is totally internally reflected, as the sim shows in red.' },
        { q: 'Set both media in the sim to the same material. What do you observe, and why?', a: 'The ray goes straight through with θ₂ = θ₁. Snell\'s law with n₁ = n₂ gives sin θ₂ = sin θ₁. There is no change of speed, so nothing causes the beam to turn. Refraction needs a difference in refractive index, not just a boundary.' },
      ],
      id: [
        { q: 'Sebuah berkas di udara mengenai air (n = 1,33) pada sudut 45°. Berapa sudut biasnya?', a: 'sin θ₂ = (1,00 × sin 45°)/1,33 = 0,707/1,33 = 0,532, sehingga θ₂ ≈ 32°. Berkas membelok mendekati normal karena air adalah medium yang lebih lambat.' },
        { q: 'Berapa sudut kritis cahaya dari kaca (n = 1,5) ke udara? Apa yang terjadi pada berkas yang mengenai batas pada 50°?', a: 'sin θ_c = 1,0/1,5 = 0,667, sehingga θ_c ≈ 41,8°. Berkas pada 50° melampaui nilai ini, sehingga hukum Snell menuntut sin θ₂ = 1,5 × sin 50° = 1,15, yang tidak mungkin: berkas dipantulkan internal total, seperti ditunjukkan simulasi dengan warna merah.' },
        { q: 'Atur kedua medium di simulasi ke bahan yang sama. Apa yang kamu amati, dan mengapa?', a: 'Berkas lurus menembus dengan θ₂ = θ₁. Hukum Snell dengan n₁ = n₂ memberi sin θ₂ = sin θ₁. Tidak ada perubahan kecepatan, sehingga tidak ada yang membelokkan berkas. Pembiasan membutuhkan perbedaan indeks bias, bukan sekadar adanya batas.' },
      ],
    },
  },
};
