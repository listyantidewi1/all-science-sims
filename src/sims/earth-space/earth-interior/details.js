// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify crust, mantle, outer core, inner core boundaries.',
      'See temperature climb to ~5,500 K and pressure to ~360 GPa at center.',
      'Connect material state to seismology (P-waves, S-waves).',
    ],
    id: [
      'Mengenali batas kerak, mantel, inti luar, inti dalam.',
      'Melihat suhu memanjat ~5.500 K dan tekanan ~360 GPa di pusat.',
      'Mengaitkan wujud material dengan seismologi (gelombang P dan S).',
    ],
  },  tryThis: {
    en: [
      'Probe at 35 km — what layer? (Mohorovičić discontinuity)',
      'Probe at 2900 km — Gutenberg discontinuity, where is it?',
      'Why does the outer core have liquid iron despite being so hot?',
    ],
    id: [
      'Probe pada 35 km — lapisan apa? (Diskontinuitas Mohorovičić)',
      'Probe pada 2900 km — di mana diskontinuitas Gutenberg?',
      'Mengapa inti luar berisi besi cair meskipun sangat panas?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The deepest hole ever drilled reaches only about 12 km, a fifth of one percent of the way to Earth\'s centre, yet we know the inside of our planet in surprising detail. The main clue is earthquakes. Every large quake sends waves through the whole Earth, and those waves speed up, slow down, bend or stop wherever the rock changes. P waves (push-and-pull waves) travel through solids and liquids; S waves (side-to-side waves) travel only through solids. S waves never arrive on the far side of the planet, so there must be a liquid layer in the middle: the outer core. A second clue is weight: the whole Earth has an average density of 5.5 g/cm³, but surface rocks are only about 2.7 to 3, so the deep interior must be made of something much heavier, which iron meteorites suggest is iron and nickel.',
        'From the outside in, the layers are: the crust, a thin skin of cool rock about 35 km thick under the continents and only 5 to 10 km under the oceans; the mantle, almost 2,900 km of hot solid rock that creeps very slowly over millions of years, with a change in mineral structure near 660 km that divides it into upper and lower parts; the outer core, about 2,260 km of liquid iron and nickel whose stirring generates Earth\'s magnetic field; and the inner core, a solid ball of iron and nickel about 1,220 km in radius. The inner core is hotter than the outer core and yet solid, because the colossal pressure at the centre raises the melting point of iron faster than the temperature rises.',
        'In the sim you drag a probe from the surface to the centre, or use the depth slider and the preset buttons, and read off the layer, its state, and approximate temperature, pressure and density at that depth. The cross-section is drawn to scale, which is why the crust is barely a hairline. Temperature climbs steeply through the crust (roughly 25 °C for every kilometre, which is why deep mines are hot) and then more gently, reaching a few thousand degrees in the mantle and about 5,500 K near the centre, similar to the surface of the Sun. Pressure grows to roughly 135 GPa at the core boundary and about 360 GPa at the centre, over three million times the air pressure at sea level.',
        'The numbers are textbook averages, not exact measurements, and the model simplifies a lot. The crust is given a single thickness of 35 km everywhere, density changes in sudden steps instead of smoothly, and the temperature and pressure curves are straight-line approximations (the real deep temperatures are uncertain by several hundred degrees). The sim shows temperature in kelvin, so the surface should read about 288 K, which is 15 °C. It also does not distinguish the rigid lithosphere from the softer asthenosphere beneath it, which is what the tectonic plates actually ride on.',
      ],
      id: [
        'Lubang terdalam yang pernah digali hanya mencapai sekitar 12 km, seperlima persen dari jarak ke pusat Bumi, tetapi kita mengenal bagian dalam planet kita dengan rincian yang mengejutkan. Petunjuk utamanya adalah gempa bumi. Setiap gempa besar mengirim gelombang menembus seluruh Bumi, dan gelombang itu mempercepat, melambat, membelok, atau berhenti di mana pun batuannya berubah. Gelombang P (gelombang dorong-tarik) merambat melalui zat padat dan cair; gelombang S (gelombang goyang menyamping) hanya merambat melalui zat padat. Gelombang S tidak pernah tiba di sisi seberang planet, jadi pasti ada lapisan cair di tengah: inti luar. Petunjuk kedua adalah berat: seluruh Bumi memiliki kerapatan rata-rata 5,5 g/cm³, tetapi batuan permukaan hanya sekitar 2,7 sampai 3, sehingga bagian dalam yang jauh pasti terbuat dari sesuatu yang jauh lebih berat, yang menurut petunjuk dari meteorit besi adalah besi dan nikel.',
        'Dari luar ke dalam, lapisannya adalah: kerak, kulit tipis batuan dingin setebal sekitar 35 km di bawah benua dan hanya 5 sampai 10 km di bawah samudra; mantel, hampir 2.900 km batuan padat panas yang merayap sangat lambat selama jutaan tahun, dengan perubahan struktur mineral di dekat 660 km yang membaginya menjadi bagian atas dan bawah; inti luar, sekitar 2.260 km besi dan nikel cair yang pengadukannya membangkitkan medan magnet Bumi; dan inti dalam, bola padat besi dan nikel berjari-jari sekitar 1.220 km. Inti dalam lebih panas daripada inti luar tetapi padat, karena tekanan luar biasa di pusat menaikkan titik lebur besi lebih cepat daripada kenaikan suhunya.',
        'Dalam sim, kamu menyeret probe dari permukaan ke pusat, atau memakai slider kedalaman dan tombol preset, lalu membaca lapisan, wujudnya, serta perkiraan suhu, tekanan, dan kerapatan pada kedalaman itu. Penampangnya digambar sesuai skala, itulah sebabnya kerak hampir tak lebih dari segaris rambut. Suhu naik tajam di kerak (kira-kira 25 °C untuk setiap kilometer, karena itu tambang dalam terasa panas) lalu lebih landai, mencapai beberapa ribu derajat di mantel dan sekitar 5.500 K di dekat pusat, mirip permukaan Matahari. Tekanan bertambah sampai kira-kira 135 GPa di batas inti dan sekitar 360 GPa di pusat, lebih dari tiga juta kali tekanan udara di permukaan laut.',
        'Angka-angkanya adalah rata-rata buku teks, bukan pengukuran pasti, dan modelnya banyak menyederhanakan. Kerak diberi satu ketebalan 35 km di mana-mana, kerapatan berubah dalam lompatan mendadak dan bukan secara mulus, dan kurva suhu serta tekanan adalah pendekatan garis lurus (suhu sesungguhnya di kedalaman masih tidak pasti sampai beberapa ratus derajat). Sim menampilkan suhu dalam kelvin, sehingga di permukaan seharusnya terbaca sekitar 288 K, yaitu 15 °C. Sim juga tidak membedakan litosfer yang kaku dari astenosfer yang lebih lunak di bawahnya, tempat lempeng tektonik sebenarnya menumpang.',
      ],
    },
    figure: {
      caption: {
        en: 'Earth\'s layers to scale, with two earthquake waves. S waves (red) cannot enter the liquid outer core, so they never reach the far side; P waves (blue) bend at the boundary but pass through. The crust is drawn thicker than scale so it can be seen.',
        id: 'Lapisan Bumi sesuai skala, dengan dua gelombang gempa. Gelombang S (merah) tidak bisa masuk ke inti luar yang cair, sehingga tidak pernah mencapai sisi seberang; gelombang P (biru) membelok di batas tetapi menembus. Kerak digambar lebih tebal dari skala agar terlihat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Layers of the Earth and seismic waves', 'Lapisan Bumi dan gelombang seismik')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:9.5px;opacity:.85}</style>
  <circle cx="105" cy="130" r="95" fill="#f59e0b" opacity=".35"/>
  <circle cx="105" cy="130" r="95" fill="none" stroke="currentColor" stroke-width="2.5" opacity=".7"/>
  <circle cx="105" cy="130" r="52" fill="#ef4444" opacity=".45"/>
  <circle cx="105" cy="130" r="18" fill="#8b5cf6" opacity=".75"/>
  <circle cx="105" cy="35" r="3" fill="currentColor"/>
  <text x="112" y="32" class="s">${L('earthquake', 'gempa')}</text>
  <path d="M105 35 Q82 60 62 100" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <line x1="56" y1="94" x2="68" y2="106" stroke="#ef4444" stroke-width="2"/>
  <line x1="68" y1="94" x2="56" y2="106" stroke="#ef4444" stroke-width="2"/>
  <text x="8" y="118" class="s" fill="#ef4444">${L('S stops', 'S berhenti')}</text>
  <path d="M105 35 L134 72 L149 98 L156 130 L149 162 L133 205 L129 224" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <rect x="212" y="42" width="14" height="10" fill="currentColor" opacity=".7"/>
  <text x="232" y="51" class="s">${L('Crust 0–35 km', 'Kerak 0–35 km')}</text>
  <text x="232" y="62" class="s">${L('solid rock', 'batuan padat')}</text>
  <rect x="212" y="76" width="14" height="10" fill="#f59e0b" opacity=".6"/>
  <text x="232" y="85" class="s">${L('Mantle 35–2,890 km', 'Mantel 35–2.890 km')}</text>
  <text x="232" y="96" class="s">${L('solid rock, flows slowly', 'batuan padat, mengalir perlahan')}</text>
  <rect x="212" y="110" width="14" height="10" fill="#ef4444" opacity=".6"/>
  <text x="232" y="119" class="s">${L('Outer core 2,890–5,150 km', 'Inti luar 2.890–5.150 km')}</text>
  <text x="232" y="130" class="s">${L('liquid iron and nickel', 'besi dan nikel cair')}</text>
  <rect x="212" y="144" width="14" height="10" fill="#8b5cf6" opacity=".8"/>
  <text x="232" y="153" class="s">${L('Inner core 5,150–6,371 km', 'Inti dalam 5.150–6.371 km')}</text>
  <text x="232" y="164" class="s">${L('solid iron and nickel', 'besi dan nikel padat')}</text>
  <text x="212" y="190" class="s" fill="#3b82f6">${L('blue: P waves bend at the', 'biru: gelombang P membelok')}</text>
  <text x="212" y="201" class="s" fill="#3b82f6">${L('liquid core and pass through', 'di inti cair dan menembus')}</text>
  <text x="212" y="216" class="s" fill="#ef4444">${L('red: S waves cannot travel', 'merah: gelombang S tidak bisa')}</text>
  <text x="212" y="227" class="s" fill="#ef4444">${L('through liquid', 'merambat melalui cairan')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Earth has four main layers: a thin rocky crust, a thick mantle of hot solid rock that flows very slowly, a liquid iron outer core and a solid iron inner core.',
        'Temperature, pressure and density all increase with depth; at the centre the pressure is over three million atmospheres.',
        'Earthquake waves reveal the layers: S waves cannot cross the liquid outer core, and P waves bend at each boundary.',
        'The inner core is solid even though it is the hottest layer, because extreme pressure raises the melting point of iron.',
        'Churning liquid iron in the outer core generates Earth\'s magnetic field.',
      ],
      id: [
        'Bumi memiliki empat lapisan utama: kerak batuan yang tipis, mantel tebal dari batuan padat panas yang mengalir sangat lambat, inti luar besi cair, dan inti dalam besi padat.',
        'Suhu, tekanan, dan kerapatan semuanya bertambah seiring kedalaman; di pusat tekanannya lebih dari tiga juta atmosfer.',
        'Gelombang gempa mengungkap lapisan-lapisan itu: gelombang S tidak bisa menyeberangi inti luar yang cair, dan gelombang P membelok di setiap batas.',
        'Inti dalam berwujud padat walaupun merupakan lapisan terpanas, karena tekanan ekstrem menaikkan titik lebur besi.',
        'Pengadukan besi cair di inti luar membangkitkan medan magnet Bumi.',
      ],
    },
    vocabulary: {
      en: [
        ['Crust', 'The thin outer layer of cool, solid rock we live on: about 35 km thick under continents, 5–10 km under oceans.'],
        ['Mantle', 'The thick layer of hot solid rock between crust and core, reaching to 2,890 km depth; it creeps slowly over millions of years.'],
        ['Outer core', 'The liquid iron-nickel layer from about 2,890 to 5,150 km depth, source of Earth\'s magnetic field.'],
        ['Inner core', 'The solid iron-nickel ball at Earth\'s centre, from 5,150 km depth to the centre at 6,371 km.'],
        ['P wave', 'A push-and-pull earthquake wave that travels through solids and liquids; the fastest seismic wave.'],
        ['S wave', 'A side-to-side earthquake wave that travels only through solids.'],
        ['Moho', 'The Mohorovičić discontinuity: the boundary between the crust and the mantle.'],
        ['Density', 'Mass per unit volume; it rises from about 2.7 g/cm³ in the crust to about 13 g/cm³ in the inner core.'],
      ],
      id: [
        ['Kerak', 'Lapisan luar tipis dari batuan dingin dan padat yang kita tinggali: setebal sekitar 35 km di bawah benua, 5–10 km di bawah samudra.'],
        ['Mantel', 'Lapisan tebal batuan padat panas antara kerak dan inti, sampai kedalaman 2.890 km; merayap perlahan selama jutaan tahun.'],
        ['Inti luar', 'Lapisan besi-nikel cair dari kedalaman sekitar 2.890 sampai 5.150 km, sumber medan magnet Bumi.'],
        ['Inti dalam', 'Bola besi-nikel padat di pusat Bumi, dari kedalaman 5.150 km sampai pusat di 6.371 km.'],
        ['Gelombang P', 'Gelombang gempa dorong-tarik yang merambat melalui zat padat dan cair; gelombang seismik tercepat.'],
        ['Gelombang S', 'Gelombang gempa goyang menyamping yang hanya merambat melalui zat padat.'],
        ['Moho', 'Diskontinuitas Mohorovičić: batas antara kerak dan mantel.'],
        ['Kerapatan', 'Massa per satuan volume; naik dari sekitar 2,7 g/cm³ di kerak sampai sekitar 13 g/cm³ di inti dalam.'],
      ],
    },
    misconceptions: {
      en: [
        ['Just below the crust there is an ocean of molten lava.', 'The mantle is solid rock. We know this because S waves, which cannot pass through liquid, travel right through it. Magma forms only in small pockets, mostly in the upper mantle and crust, where conditions allow rock to melt.'],
        ['The deeper you go, the more liquid things become, because it gets hotter.', 'Pressure matters as much as temperature. The outer core is liquid, but the even hotter inner core is solid because the pressure there is so high that iron cannot melt.'],
        ['The crust is a thick, sturdy shell.', 'The crust is less than 1% of Earth\'s radius, proportionally thinner than the shell of an egg. Almost all of Earth\'s volume is mantle and core.'],
        ['Earth\'s core is hot because of the Sun.', 'Sunlight only warms the top few metres of ground. The interior is hot from the heat of Earth\'s formation, from radioactive decay in the rocks, and from heat released as the inner core slowly freezes.'],
      ],
      id: [
        ['Tepat di bawah kerak ada lautan lava cair.', 'Mantel adalah batuan padat. Kita tahu ini karena gelombang S, yang tidak bisa melewati cairan, merambat menembusnya. Magma hanya terbentuk di kantong-kantong kecil, kebanyakan di mantel atas dan kerak, di tempat kondisinya memungkinkan batuan meleleh.'],
        ['Makin dalam, makin cair, karena makin panas.', 'Tekanan sama pentingnya dengan suhu. Inti luar cair, tetapi inti dalam yang lebih panas lagi justru padat karena tekanan di sana begitu tinggi sehingga besi tidak bisa meleleh.'],
        ['Kerak adalah cangkang yang tebal dan kokoh.', 'Kerak kurang dari 1% jari-jari Bumi, secara proporsional lebih tipis daripada kulit telur. Hampir seluruh volume Bumi adalah mantel dan inti.'],
        ['Inti Bumi panas karena Matahari.', 'Sinar Matahari hanya menghangatkan beberapa meter teratas tanah. Bagian dalam Bumi panas karena sisa panas pembentukan Bumi, peluruhan radioaktif di batuan, dan panas yang dilepaskan saat inti dalam perlahan membeku.'],
      ],
    },
    realWorld: {
      en: [
        'The Kola Superdeep Borehole in Russia reached 12.3 km, where the rock was already about 180 °C; drilling had to stop because the rock was too hot and soft.',
        'A compass works because the swirling liquid iron of the outer core generates Earth\'s magnetic field, which also shields us from charged particles from the Sun.',
        'Indonesia\'s geothermal power stations tap the steep temperature rise in the crust, using hot water from a few kilometres down to spin turbines.',
        'Diamonds form more than 150 km deep in the mantle, where pressure is high enough to squeeze carbon into its hardest form, and are carried up by rare volcanic eruptions.',
      ],
      id: [
        'Lubang Bor Superdalam Kola di Rusia mencapai 12,3 km, dan batuan di sana sudah bersuhu sekitar 180 °C; pengeboran terpaksa dihentikan karena batuannya terlalu panas dan lunak.',
        'Kompas bekerja karena besi cair yang berputar di inti luar membangkitkan medan magnet Bumi, yang juga melindungi kita dari partikel bermuatan dari Matahari.',
        'Pembangkit listrik tenaga panas bumi di Indonesia memanfaatkan kenaikan suhu yang tajam di kerak, memakai air panas dari kedalaman beberapa kilometer untuk memutar turbin.',
        'Berlian terbentuk lebih dari 150 km di dalam mantel, tempat tekanannya cukup tinggi untuk memampatkan karbon menjadi bentuk terkerasnya, dan dibawa naik oleh letusan gunung api yang langka.',
      ],
    },
    questions: {
      en: [
        { q: 'Why do S waves from an earthquake never arrive on the opposite side of the Earth, while P waves do?', a: 'S waves can only travel through solids. On their way to the far side they meet the liquid outer core and are stopped, leaving a large S-wave shadow zone. P waves can travel through liquid, so they bend at the core boundary but continue to the other side.' },
        { q: 'Why is the inner core solid when it is hotter than the liquid outer core?', a: 'The melting point of iron rises with pressure. At the centre of Earth the pressure is about 360 GPa, enough to raise iron\'s melting point above the actual temperature there, so the iron freezes solid even at roughly 5,500 K.' },
        { q: 'In the sim, pressure rises by about 0.05 GPa for every kilometre through the mantle. Estimate the pressure at 1,000 km depth, and say which layer the probe is in.', a: 'About 1,000 × 0.05 = 50 GPa (the sim gives 49 GPa, since it starts from about 1 GPa at the base of the crust). That is roughly 500,000 times atmospheric pressure, and 1,000 km is in the lower mantle, below the 660 km boundary.' },
      ],
      id: [
        { q: 'Mengapa gelombang S dari gempa tidak pernah tiba di sisi berlawanan Bumi, sedangkan gelombang P bisa?', a: 'Gelombang S hanya bisa merambat melalui zat padat. Dalam perjalanan ke sisi seberang mereka bertemu inti luar yang cair dan terhenti, meninggalkan zona bayangan gelombang S yang luas. Gelombang P bisa merambat melalui cairan, sehingga membelok di batas inti tetapi terus ke sisi lain.' },
        { q: 'Mengapa inti dalam berwujud padat padahal lebih panas daripada inti luar yang cair?', a: 'Titik lebur besi naik seiring tekanan. Di pusat Bumi tekanannya sekitar 360 GPa, cukup untuk menaikkan titik lebur besi di atas suhu sesungguhnya di sana, sehingga besi membeku padat meski suhunya kira-kira 5.500 K.' },
        { q: 'Dalam sim, tekanan naik sekitar 0,05 GPa untuk setiap kilometer di mantel. Perkirakan tekanan pada kedalaman 1.000 km, dan sebutkan di lapisan mana probe berada.', a: 'Sekitar 1.000 × 0,05 = 50 GPa (sim memberi 49 GPa, karena dimulai dari sekitar 1 GPa di dasar kerak). Itu kira-kira 500.000 kali tekanan atmosfer, dan 1.000 km berada di mantel bawah, di bawah batas 660 km.' },
      ],
    },
  },
};
