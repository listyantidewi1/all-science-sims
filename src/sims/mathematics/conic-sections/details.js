// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify each conic by the angle of the cutting plane.',
      'Connect eccentricity to the conic class.',
      'See parabola as the limit between ellipse and hyperbola.',
    ],
    id: [
      'Mengenali tiap irisan kerucut dari sudut bidangnya.',
      'Mengaitkan eksentrisitas dengan kelas irisan kerucut.',
      'Melihat parabola sebagai batas antara elips dan hiperbola.',
    ],
  },  tryThis: {
    en: [
      'Plane perpendicular to axis — circle.',
      'Tilt slightly — ellipse.',
      'Tilt to parallel-to-side — parabola. Past it — hyperbola (cuts both nappes).',
    ],
    id: [
      'Bidang tegak lurus sumbu — lingkaran.',
      'Miringkan sedikit — elips.',
      'Miringkan sejajar sisi — parabola. Lebih dari itu — hiperbola (memotong kedua kerucut).',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Take a straight line through a fixed point (the apex) and spin it around a vertical axis: it sweeps out a double cone, two nappes joined tip to tip. Now cut this surface with a flat plane. Whatever curve appears on the cut is called a conic section, and there are only four possibilities: a circle, an ellipse, a parabola, or a hyperbola. All four are one family, and which one you get depends only on how steeply the plane is tilted compared with the slanted side of the cone.',
        'In this simulation the cone\'s side makes 45° with the axis, and the slider tilts the plane from 0° (horizontal) up to 75°. A horizontal plane cuts one nappe in a circle. Tilt it a little and the cut stretches into a closed oval, an ellipse. At exactly 45° the plane is parallel to one side of the cone, so the curve never closes: that is the parabola, a single boundary case. Past 45° the plane is steeper than the cone\'s side, so it slices through both nappes and gives the two separate branches of a hyperbola. The preset buttons jump straight to each case.',
        'A single number, the eccentricity e, measures how far a conic is from being a circle: e = 0 for a circle, 0 < e < 1 for an ellipse, e = 1 for a parabola, and e > 1 for a hyperbola. For a cone whose side makes angle α with the axis and a plane tilted θ from horizontal, e = sin θ / cos α; with α = 45° this is e = √2 · sin θ, which reaches 1 exactly when θ = 45°. So the slider is really an eccentricity dial, and the parabola sits at the knife-edge between the closed curves and the open ones.',
        'The sim is a schematic. The left panel is a side view, not a 3D rendering, and the plane is drawn as a slab anchored below the apex; it does not visibly reach the upper nappe in the hyperbola case, even though the real plane would. The right panel shows the type of curve, not the true size of the cut: the ellipse is drawn with axis ratio cos θ rather than the exact section shape, and the parabola and hyperbola have fixed proportions. The classification uses a small tolerance (about 1°) around 0° and 45°, because a true circle and a true parabola occur at exactly one angle each.',
      ],
      id: [
        'Ambil sebuah garis lurus yang melewati satu titik tetap (puncak), lalu putar garis itu mengelilingi sumbu tegak: garis tersebut menyapu sebuah kerucut ganda, dua kerucut yang bertemu di puncaknya. Sekarang iris permukaan itu dengan sebuah bidang datar. Kurva apa pun yang muncul pada irisan disebut irisan kerucut, dan hanya ada empat kemungkinan: lingkaran, elips, parabola, atau hiperbola. Keempatnya satu keluarga, dan jenis yang muncul hanya bergantung pada seberapa miring bidang dibandingkan sisi miring kerucut.',
        'Dalam simulasi ini sisi kerucut membentuk sudut 45° dengan sumbu, dan slider memiringkan bidang dari 0° (mendatar) sampai 75°. Bidang mendatar mengiris satu kerucut menjadi lingkaran. Miringkan sedikit, irisannya memanjang menjadi oval tertutup, yaitu elips. Tepat pada 45° bidang sejajar dengan salah satu sisi kerucut, sehingga kurvanya tidak pernah menutup: itulah parabola, satu kasus batas. Lewat 45° bidang lebih curam daripada sisi kerucut, sehingga memotong kedua kerucut dan menghasilkan dua cabang terpisah dari sebuah hiperbola. Tombol preset langsung melompat ke tiap kasus.',
        'Satu bilangan, eksentrisitas e, mengukur seberapa jauh irisan kerucut menyimpang dari lingkaran: e = 0 untuk lingkaran, 0 < e < 1 untuk elips, e = 1 untuk parabola, dan e > 1 untuk hiperbola. Untuk kerucut dengan sisi bersudut α terhadap sumbu dan bidang yang dimiringkan θ dari mendatar, e = sin θ / cos α; dengan α = 45° rumus ini menjadi e = √2 · sin θ, yang tepat bernilai 1 saat θ = 45°. Jadi slider itu sebenarnya pengatur eksentrisitas, dan parabola berada tepat di perbatasan antara kurva tertutup dan kurva terbuka.',
        'Simulasi ini bersifat skematis. Panel kiri adalah tampak samping, bukan gambar 3D, dan bidang digambar sebagai lempeng yang ditambatkan di bawah puncak; pada kasus hiperbola lempeng itu tidak terlihat mencapai kerucut atas, meskipun bidang sesungguhnya pasti memotongnya. Panel kanan menunjukkan jenis kurvanya, bukan ukuran irisan yang sebenarnya: elips digambar dengan perbandingan sumbu cos θ, bukan bentuk irisan yang tepat, dan parabola serta hiperbolanya berproporsi tetap. Pengelompokan memakai toleransi kecil (sekitar 1°) di sekitar 0° dan 45°, karena lingkaran sejati dan parabola sejati masing-masing hanya terjadi pada satu sudut.',
      ],
    },
    figure: {
      caption: {
        en: 'Side view of a double cone with side at 45°. A horizontal plane gives a circle; a gentle tilt an ellipse; a plane parallel to the side (45°) a parabola; a steeper plane cuts both nappes and gives a hyperbola.',
        id: 'Tampak samping kerucut ganda dengan sisi 45°. Bidang mendatar menghasilkan lingkaran; kemiringan kecil menghasilkan elips; bidang sejajar sisi (45°) menghasilkan parabola; bidang yang lebih curam memotong kedua kerucut dan menghasilkan hiperbola.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Planes cutting a double cone', 'Bidang-bidang yang mengiris kerucut ganda')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.c{fill:none;stroke:currentColor;stroke-width:1.6}.p{stroke-width:2.4;fill:none}</style>
  <line x1="120" y1="30" x2="120" y2="210" class="m" stroke-dasharray="4 4"/>
  <path d="M45 45 L120 120 L195 45 Z" class="c" fill="currentColor" fill-opacity="0.06"/>
  <path d="M45 195 L120 120 L195 195 Z" class="c" fill="currentColor" fill-opacity="0.06"/>
  <path d="M45 45 A75 10 0 0 0 195 45" class="m"/>
  <path d="M45 195 A75 10 0 0 1 195 195" class="m"/>
  <text x="124" y="40" opacity=".7">${L('axis', 'sumbu')}</text>
  <text x="150" y="178" opacity=".7">45°</text>
  <line x1="65" y1="165" x2="175" y2="165" class="p" stroke="#3b82f6"/>
  <line x1="65" y1="97" x2="175" y2="59" class="p" stroke="#10b981"/>
  <line x1="70" y1="125" x2="140" y2="195" class="p" stroke="#f59e0b"/>
  <line x1="112" y1="50" x2="164" y2="190" class="p" stroke="#ef4444"/>
  <text x="178" y="169" fill="#3b82f6">0°</text>
  <text x="178" y="62" fill="#10b981">20°</text>
  <text x="46" y="128" fill="#f59e0b">45°</text>
  <text x="166" y="200" fill="#ef4444">70°</text>
  <circle cx="265" cy="50" r="15" class="p" stroke="#3b82f6"/>
  <text x="290" y="54" fill="#3b82f6">${L('circle', 'lingkaran')}</text>
  <ellipse cx="265" cy="103" rx="21" ry="11" class="p" stroke="#10b981"/>
  <text x="290" y="107" fill="#10b981">${L('ellipse', 'elips')}</text>
  <path d="M246 170 Q265 118 284 170" class="p" stroke="#f59e0b"/>
  <text x="290" y="152" fill="#f59e0b">${L('parabola', 'parabola')}</text>
  <path d="M258 188 Q244 212 258 236" class="p" stroke="#ef4444"/>
  <path d="M272 188 Q286 212 272 236" class="p" stroke="#ef4444"/>
  <text x="290" y="215" fill="#ef4444">${L('hyperbola', 'hiperbola')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Circle, ellipse, parabola, and hyperbola are all slices of the same double cone; only the tilt of the cutting plane changes.',
        'The parabola is the single boundary case: the plane is exactly parallel to the cone\'s side, so the curve never closes.',
        'Steeper than the side, the plane cuts both nappes, which is why a hyperbola has two branches.',
        'Eccentricity e sorts the family in one number: 0 (circle), between 0 and 1 (ellipse), exactly 1 (parabola), above 1 (hyperbola).',
        'A circle is just an ellipse with e = 0, not a different kind of curve.',
      ],
      id: [
        'Lingkaran, elips, parabola, dan hiperbola semuanya adalah irisan dari kerucut ganda yang sama; yang berubah hanya kemiringan bidang pengirisnya.',
        'Parabola adalah satu-satunya kasus batas: bidang tepat sejajar dengan sisi kerucut, sehingga kurvanya tidak pernah menutup.',
        'Jika lebih curam daripada sisi kerucut, bidang memotong kedua kerucut; itulah sebabnya hiperbola punya dua cabang.',
        'Eksentrisitas e mengurutkan keluarga ini dengan satu bilangan: 0 (lingkaran), antara 0 dan 1 (elips), tepat 1 (parabola), di atas 1 (hiperbola).',
        'Lingkaran hanyalah elips dengan e = 0, bukan jenis kurva yang berbeda.',
      ],
    },
    vocabulary: {
      en: [
        ['Double cone', 'The surface swept out by a line through a fixed point (the apex) rotating about an axis; it has two halves, or nappes, meeting at the apex.'],
        ['Nappe', 'One of the two halves of a double cone, above or below the apex.'],
        ['Conic section', 'Any curve obtained by cutting a double cone with a plane: circle, ellipse, parabola, or hyperbola.'],
        ['Eccentricity (e)', 'A number describing the shape of a conic: 0 for a circle, less than 1 for an ellipse, 1 for a parabola, greater than 1 for a hyperbola.'],
        ['Degenerate conic', 'What you get when the plane passes through the apex: a point, a single line, or a pair of crossing lines.'],
        ['Generator', 'Any straight line on the cone\'s surface through the apex; a plane parallel to a generator cuts a parabola.'],
      ],
      id: [
        ['Kerucut ganda', 'Permukaan yang disapu oleh sebuah garis melalui titik tetap (puncak) yang berputar mengelilingi sumbu; terdiri dari dua bagian yang bertemu di puncak.'],
        ['Kerucut atas/bawah (nappe)', 'Salah satu dari dua bagian kerucut ganda, di atas atau di bawah puncak.'],
        ['Irisan kerucut', 'Kurva yang diperoleh dengan mengiris kerucut ganda menggunakan sebuah bidang: lingkaran, elips, parabola, atau hiperbola.'],
        ['Eksentrisitas (e)', 'Bilangan yang menggambarkan bentuk irisan kerucut: 0 untuk lingkaran, kurang dari 1 untuk elips, 1 untuk parabola, lebih dari 1 untuk hiperbola.'],
        ['Irisan degenerat', 'Hasil ketika bidang melewati puncak: sebuah titik, satu garis, atau sepasang garis yang berpotongan.'],
        ['Garis pelukis', 'Garis lurus mana pun pada permukaan kerucut yang melalui puncak; bidang yang sejajar garis pelukis menghasilkan parabola.'],
      ],
    },
    misconceptions: {
      en: [
        ['A parabola is just one half of an ellipse, or an ellipse that has been stretched a lot.', 'No. However much you stretch an ellipse it stays closed, and its eccentricity stays below 1. A parabola has e = 1 exactly and never closes; it is a genuinely different case that occurs at one specific tilt.'],
        ['A hyperbola is two separate parabolas facing away from each other.', 'The two branches come from a single plane cutting both nappes of one cone, and they straighten toward two asymptotes. A parabola\'s arms never approach a straight line, so the shapes are different even if they look similar near the vertex.'],
        ['Tilting the plane further makes the ellipse smaller.', 'Tilting makes the ellipse longer and more eccentric, not smaller. Its size depends on where the plane crosses the axis; its shape depends only on the tilt.'],
      ],
      id: [
        ['Parabola hanyalah separuh elips, atau elips yang sangat diregangkan.', 'Tidak. Seberapa pun elips diregangkan, kurvanya tetap tertutup dan eksentrisitasnya tetap di bawah 1. Parabola punya e tepat 1 dan tidak pernah menutup; ia kasus yang benar-benar berbeda dan hanya muncul pada satu kemiringan tertentu.'],
        ['Hiperbola adalah dua parabola yang saling membelakangi.', 'Kedua cabangnya berasal dari satu bidang yang memotong kedua bagian kerucut yang sama, dan keduanya mendekati dua garis asimtot. Lengan parabola tidak pernah mendekati garis lurus, sehingga bentuknya berbeda walau tampak serupa di dekat puncaknya.'],
        ['Semakin miring bidangnya, elipsnya semakin kecil.', 'Memiringkan bidang membuat elips lebih panjang dan lebih eksentrik, bukan lebih kecil. Ukurannya bergantung pada letak bidang memotong sumbu; bentuknya hanya bergantung pada kemiringan.'],
      ],
    },
    realWorld: {
      en: [
        'The circle of light from a torch becomes an ellipse when you tilt the torch toward a wall, a parabola when the edge of the beam is parallel to the wall, and a hyperbola when you tilt further.',
        'Planets and comets on closed orbits follow ellipses with the Sun at one focus; an object with just enough speed to escape follows a parabola, and a faster one a hyperbola.',
        'Satellite dishes and car headlights use parabolic reflectors: incoming parallel rays all meet at the focus, and a bulb at the focus sends out a parallel beam.',
        'The sundial shadow of a gnomon tip traces a hyperbola across the ground over a day, because the Sun\'s rays through the tip form a cone cut by the flat ground.',
      ],
      id: [
        'Lingkaran cahaya senter berubah menjadi elips saat senter dimiringkan ke dinding, menjadi parabola saat tepi berkas sejajar dinding, dan menjadi hiperbola saat dimiringkan lebih jauh.',
        'Planet dan komet dengan orbit tertutup mengikuti elips dengan Matahari di salah satu fokus; benda dengan kelajuan pas untuk lepas mengikuti parabola, dan yang lebih cepat mengikuti hiperbola.',
        'Antena parabola dan lampu depan mobil memakai pemantul berbentuk parabola: sinar sejajar yang datang semuanya bertemu di fokus, dan bola lampu di fokus memancarkan berkas sejajar.',
        'Bayangan ujung tongkat jam matahari menelusuri hiperbola di tanah sepanjang hari, karena sinar Matahari yang melewati ujung tongkat membentuk kerucut yang diiris oleh tanah yang datar.',
      ],
    },
    questions: {
      en: [
        { q: 'In this sim the cone\'s side makes 45° with the axis. What eccentricity does a plane tilted 30° produce, and which conic is it?', a: 'e = sin 30° / cos 45° = 0.5 / 0.707 ≈ 0.71. That is between 0 and 1, so the cut is an ellipse, and the sim labels 30° as an ellipse.' },
        { q: 'Why does the sim show two separate curves as soon as the tilt passes 45°, but only one closed curve below it?', a: 'Below 45° the plane is less steep than the cone\'s side, so it passes through one nappe only and the cut closes up. Above 45° it is steeper than the side, so it must also meet the other nappe, giving a second branch. The two branches are one hyperbola.' },
        { q: 'If the cone were narrower, with its side at 30° from the axis, at what plane tilt would the parabola appear?', a: 'At 60° from horizontal. The parabola occurs when the plane is parallel to the cone\'s side, and a side 30° from the vertical axis is 60° from horizontal. Equivalently, e = sin θ / cos 30° equals 1 when sin θ = cos 30°, i.e. θ = 60°. In the sim the side is at 45°, so there the parabola appears at 45°.' },
      ],
      id: [
        { q: 'Dalam sim ini sisi kerucut bersudut 45° terhadap sumbu. Berapa eksentrisitas yang dihasilkan bidang dengan kemiringan 30°, dan irisan apa itu?', a: 'e = sin 30° / cos 45° = 0,5 / 0,707 ≈ 0,71. Nilainya antara 0 dan 1, jadi irisannya elips, dan sim memang menandai 30° sebagai elips.' },
        { q: 'Mengapa sim menampilkan dua kurva terpisah begitu kemiringan melewati 45°, tetapi hanya satu kurva tertutup di bawahnya?', a: 'Di bawah 45° bidang lebih landai daripada sisi kerucut, sehingga hanya melewati satu bagian kerucut dan irisannya menutup. Di atas 45° bidang lebih curam daripada sisi, sehingga pasti juga memotong bagian kerucut yang lain dan memunculkan cabang kedua. Kedua cabang itu adalah satu hiperbola.' },
        { q: 'Jika kerucutnya lebih ramping, dengan sisi bersudut 30° terhadap sumbu, pada kemiringan bidang berapa parabola muncul?', a: 'Parabola muncul ketika bidang sejajar sisi kerucut. Dengan rumus, e = sin θ / cos 30° bernilai 1 ketika sin θ = cos 30°, yaitu θ = 60° diukur dari mendatar (sama dengan sejajar sisi yang bersudut 30° dari sumbu). Pada sim ini sisinya 45°, sehingga parabola muncul tepat di 45°.' },
      ],
    },
  },
};
