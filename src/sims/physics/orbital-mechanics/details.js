// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply Kepler\'s 1st law: orbits are ellipses with the sun at a focus.',
      'See Kepler\'s 2nd law: equal areas swept in equal time.',
      'Connect total energy sign to bound vs unbound trajectories.',
    ],
    id: [
      'Menerapkan hukum Kepler 1: orbit adalah elips dengan matahari di salah satu fokus.',
      'Melihat hukum Kepler 2: luas yang disapu sama dalam waktu sama.',
      'Mengaitkan tanda energi total dengan lintasan terikat vs tak terikat.',
    ],
  },
  tryThis: {
    en: [
      'Aim a perpendicular launch at just the right speed — does it circle?',
      'Slightly faster — does the orbit get more elongated?',
      'Faster than escape velocity — does it leave forever?',
    ],
    id: [
      'Bidik peluncuran tegak lurus pada kecepatan tepat — apakah menjadi lingkaran?',
      'Sedikit lebih cepat — apakah orbit memanjang?',
      'Lebih cepat dari kecepatan lepas — apakah benda pergi selamanya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A planet does not orbit because something pushes it sideways. It orbits because it is falling. Gravity pulls it straight toward the sun with a force F = GMm/r², but the planet already has sideways velocity, so instead of hitting the sun it keeps curving around it. Newton showed that this one inverse-square force produces exactly the paths Kepler had measured: closed orbits are ellipses with the sun at one focus (first law), a planet sweeps out equal areas in equal times, so it moves fastest when closest to the sun (second law), and the square of the period is proportional to the cube of the orbit\'s semi-major axis (third law).',
        'The simulation fixes the sun at the centre and treats the planet as a point whose mass is tiny compared with the sun, so only the planet moves. Each small time step it computes the acceleration a = GM/r² toward the sun, updates the velocity, then updates the position. You place the planet with a click, then drag to set the launch velocity: the length of the green line is the speed. The GM slider sets how strongly the sun pulls; its units are screen units, not SI, so the numbers cannot be compared with the real solar system. The Speed slider only changes playback speed, not the physics.',
        'The energy readout is the energy per unit mass, E = v²/2 − GM/r. Its sign decides the fate of the planet: negative means it can never get infinitely far away, so the path is a bound ellipse (or circle); zero gives a parabola; positive means it escapes along a hyperbola, which the sim labels UNBOUND. Launching perpendicular to the sun at exactly v = √(GM/r) gives a circle. Launch a little faster and the start point becomes the closest point of an ellipse (perihelion); a little slower and it becomes the farthest point (aphelion). At v = √(2GM/r), about 1.41 times circular speed, the energy reaches zero and the planet escapes.',
        'Real orbits are messier. The sun also moves slightly, other planets tug on each other, and the orbit of Mercury even shows a tiny effect of general relativity. The simulation ignores all of this, stops the planet if it comes within a small radius of the sun, and keeps only the last 800 trail points. Because the force is updated in finite steps, very close, fast passes near the sun are also slightly less accurate than wide, gentle orbits.',
      ],
      id: [
        'Planet tidak mengorbit karena ada yang mendorongnya ke samping. Planet mengorbit karena ia sedang jatuh. Gravitasi menariknya lurus ke arah matahari dengan gaya F = GMm/r², tetapi planet sudah memiliki kecepatan menyamping, sehingga alih-alih menabrak matahari ia terus melengkung mengitarinya. Newton menunjukkan bahwa satu gaya kuadrat terbalik ini menghasilkan tepat lintasan yang diukur Kepler: orbit tertutup berbentuk elips dengan matahari di salah satu fokus (hukum pertama), planet menyapu luas yang sama dalam waktu yang sama sehingga bergerak paling cepat saat paling dekat dengan matahari (hukum kedua), dan kuadrat periode sebanding dengan pangkat tiga sumbu semimayor orbit (hukum ketiga).',
        'Simulasi ini menahan matahari diam di pusat dan memperlakukan planet sebagai titik bermassa sangat kecil dibanding matahari, sehingga hanya planet yang bergerak. Pada tiap langkah waktu kecil, simulasi menghitung percepatan a = GM/r² ke arah matahari, memperbarui kecepatan, lalu memperbarui posisi. Kamu meletakkan planet dengan klik, lalu menyeret untuk mengatur kecepatan awal: panjang garis hijau adalah lajunya. Slider GM mengatur seberapa kuat tarikan matahari; satuannya adalah satuan layar, bukan SI, jadi angkanya tidak bisa dibandingkan dengan tata surya sungguhan. Slider Speed hanya mengubah kecepatan pemutaran, bukan fisikanya.',
        'Angka energi yang ditampilkan adalah energi per satuan massa, E = v²/2 − GM/r. Tandanya menentukan nasib planet: negatif berarti planet tidak pernah bisa menjauh tanpa batas, sehingga lintasannya elips terikat (atau lingkaran); nol menghasilkan parabola; positif berarti planet lepas sepanjang hiperbola, yang diberi label UNBOUND oleh simulasi. Peluncuran tegak lurus arah matahari dengan laju tepat v = √(GM/r) menghasilkan lingkaran. Sedikit lebih cepat, titik awal menjadi titik terdekat elips (perihelion); sedikit lebih lambat, titik awal menjadi titik terjauh (aphelion). Pada v = √(2GM/r), sekitar 1,41 kali laju lingkaran, energi mencapai nol dan planet lepas.',
        'Orbit sungguhan lebih rumit. Matahari juga ikut bergerak sedikit, planet-planet saling menarik, dan orbit Merkurius bahkan memperlihatkan efek kecil relativitas umum. Simulasi mengabaikan semua itu, menghentikan planet jika masuk ke radius kecil di sekitar matahari, dan hanya menyimpan 800 titik jejak terakhir. Karena gaya diperbarui dalam langkah-langkah berhingga, lintasan yang sangat dekat dan cepat di sekitar matahari juga sedikit kurang akurat dibanding orbit lebar yang tenang.',
      ],
    },
    figure: {
      caption: {
        en: 'The sun sits at one focus of the ellipse; the other focus is empty. Gravity (red) always points at the sun and is strongest at perihelion, where the planet also moves fastest. Velocity (blue) is tangent to the path.',
        id: 'Matahari berada di salah satu fokus elips; fokus lainnya kosong. Gravitasi (merah) selalu mengarah ke matahari dan paling kuat di perihelion, tempat planet juga bergerak paling cepat. Kecepatan (biru) menyinggung lintasan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Elliptical orbit with the sun at a focus', 'Orbit elips dengan matahari di fokus')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:10px;opacity:.8}</style>
  <ellipse cx="170" cy="130" rx="130" ry="100" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <line x1="40" y1="130" x2="300" y2="130" class="m" stroke-dasharray="4 4"/>
  <circle cx="253" cy="130" r="11" fill="#f59e0b"/>
  <text x="243" y="156" class="s">${L('sun (focus)', 'matahari (fokus)')}</text>
  <circle cx="87" cy="130" r="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <text x="62" y="148" class="s">${L('empty focus', 'fokus kosong')}</text>
  <circle cx="300" cy="130" r="7" fill="#3b82f6"/>
  <line x1="300" y1="137" x2="300" y2="182" class="f" stroke="#3b82f6" marker-end="url(#o)"/>
  <text x="306" y="178" fill="#3b82f6">v</text>
  <line x1="293" y1="130" x2="268" y2="130" class="f" stroke="#ef4444" marker-end="url(#o)"/>
  <text x="262" y="118" fill="#ef4444">F = GMm/r²</text>
  <text x="222" y="200" class="s">${L('perihelion: fastest,', 'perihelion: paling cepat,')}</text>
  <text x="222" y="213" class="s">${L('strongest pull', 'tarikan paling kuat')}</text>
  <circle cx="40" cy="130" r="5" fill="#3b82f6"/>
  <line x1="40" y1="125" x2="40" y2="108" class="f" stroke="#3b82f6" marker-end="url(#o)"/>
  <text x="48" y="112" fill="#3b82f6">v</text>
  <line x1="45" y1="130" x2="56" y2="130" class="f" stroke="#ef4444" marker-end="url(#o)"/>
  <text x="14" y="52" class="s">${L('aphelion: slowest,', 'aphelion: paling lambat,')}</text>
  <text x="14" y="65" class="s">${L('weakest pull', 'tarikan paling lemah')}</text>
  <path d="M100 150 A130 100 0 0 0 150 228" class="m" marker-end="url(#o)"/>
  <text x="104" y="226" class="s">${L('orbit', 'orbit')}</text>
  <defs><marker id="o" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Gravity always points toward the sun and weakens with distance as 1/r²; the planet orbits because it is continuously falling while moving sideways.',
        'Bound orbits are ellipses with the sun at one focus; a circle is the special case where speed is exactly √(GM/r).',
        'A planet speeds up as it falls toward the sun and slows as it climbs away, so it moves fastest at perihelion (Kepler\'s second law).',
        'The sign of E = v²/2 − GM/r decides everything: negative is bound, zero is a parabola, positive is escape.',
        'Escape speed is √2 ≈ 1.41 times the circular speed at the same distance.',
      ],
      id: [
        'Gravitasi selalu mengarah ke matahari dan melemah dengan jarak sebagai 1/r²; planet mengorbit karena terus-menerus jatuh sambil bergerak menyamping.',
        'Orbit terikat berbentuk elips dengan matahari di salah satu fokus; lingkaran adalah kasus khusus ketika lajunya tepat √(GM/r).',
        'Planet makin cepat saat jatuh mendekati matahari dan melambat saat menjauh, sehingga paling cepat di perihelion (hukum Kepler kedua).',
        'Tanda E = v²/2 − GM/r menentukan segalanya: negatif berarti terikat, nol parabola, positif berarti lepas.',
        'Laju lepas adalah √2 ≈ 1,41 kali laju orbit lingkaran pada jarak yang sama.',
      ],
    },
    vocabulary: {
      en: [
        ['Focus', 'One of two special points inside an ellipse; the sun sits at one of them, the other is empty.'],
        ['Perihelion / aphelion', 'The closest and farthest points of an orbit from the sun.'],
        ['Semi-major axis', 'Half the longest diameter of the ellipse; it sets the orbital period through Kepler\'s third law.'],
        ['Bound orbit', 'An orbit with negative total energy, so the planet can never reach infinity.'],
        ['Escape velocity', 'The minimum speed, √(2GM/r), that lets a body leave the sun forever.'],
        ['GM', 'The gravitational constant times the sun\'s mass; it is the only property of the sun that matters for the orbit.'],
        ['Inverse-square law', 'A force that falls to one quarter when the distance doubles.'],
      ],
      id: [
        ['Fokus', 'Salah satu dari dua titik istimewa di dalam elips; matahari berada di salah satunya, yang lain kosong.'],
        ['Perihelion / aphelion', 'Titik orbit yang paling dekat dan paling jauh dari matahari.'],
        ['Sumbu semimayor', 'Setengah diameter terpanjang elips; menentukan periode orbit lewat hukum Kepler ketiga.'],
        ['Orbit terikat', 'Orbit dengan energi total negatif, sehingga planet tidak pernah bisa mencapai tak hingga.'],
        ['Kecepatan lepas', 'Laju minimum, √(2GM/r), yang membuat benda meninggalkan matahari selamanya.'],
        ['GM', 'Konstanta gravitasi dikali massa matahari; satu-satunya sifat matahari yang berpengaruh pada orbit.'],
        ['Hukum kuadrat terbalik', 'Gaya yang turun menjadi seperempat ketika jaraknya digandakan.'],
      ],
    },
    misconceptions: {
      en: [
        ['Orbiting objects are beyond the reach of gravity, which is why astronauts float.', 'Gravity at the space station is about 90% as strong as on the ground. Astronauts float because they and the station are falling together around the Earth.'],
        ['A planet needs a sideways push to keep going around.', 'No force is needed to keep it moving; Newton\'s first law does that. Gravity only bends the path. In the sim the only force is the pull toward the sun.'],
        ['The sun is at the centre of the ellipse.', 'The sun is at a focus, off centre. Only for a perfect circle do the focus and centre coincide.'],
        ['A heavier planet would orbit differently.', 'As long as the planet is much lighter than the sun, its mass cancels out: the acceleration GM/r² does not depend on the planet\'s mass.'],
      ],
      id: [
        ['Benda yang mengorbit berada di luar jangkauan gravitasi, itulah sebabnya astronaut melayang.', 'Gravitasi di stasiun antariksa masih sekitar 90% kekuatannya di permukaan. Astronaut melayang karena mereka dan stasiunnya jatuh bersama-sama mengitari Bumi.'],
        ['Planet butuh dorongan ke samping agar terus berkeliling.', 'Tidak perlu gaya untuk menjaganya bergerak; itu hukum pertama Newton. Gravitasi hanya membelokkan lintasan. Di simulasi, satu-satunya gaya adalah tarikan ke matahari.'],
        ['Matahari berada di pusat elips.', 'Matahari berada di fokus, bukan di pusat. Hanya pada lingkaran sempurna fokus dan pusat berimpit.'],
        ['Planet yang lebih berat akan mengorbit secara berbeda.', 'Selama planet jauh lebih ringan dari matahari, massanya tidak berpengaruh: percepatan GM/r² tidak bergantung pada massa planet.'],
      ],
    },
    realWorld: {
      en: [
        'Satellites are launched sideways, not straight up: a rocket tilts over soon after lift-off to build the roughly 7.7 km/s of horizontal speed needed for low Earth orbit.',
        'Comets follow very elongated ellipses, so they spend most of their time far from the sun and race through the inner solar system in a few months.',
        'Spacecraft to the outer planets use flybys of Venus, Earth and Jupiter to gain the extra energy needed for an unbound, escaping trajectory.',
        'Communications satellites in geostationary orbit, about 36,000 km up, have a period of exactly one day, as Kepler\'s third law requires for that distance.',
      ],
      id: [
        'Satelit diluncurkan menyamping, bukan lurus ke atas: roket segera memiringkan diri setelah lepas landas untuk membangun laju mendatar sekitar 7,7 km/s yang diperlukan untuk orbit rendah Bumi.',
        'Komet mengikuti elips yang sangat lonjong, sehingga sebagian besar waktunya jauh dari matahari dan melesat melewati tata surya bagian dalam hanya dalam beberapa bulan.',
        'Wahana antariksa ke planet luar memanfaatkan lintasan dekat Venus, Bumi, dan Jupiter untuk mendapat tambahan energi yang diperlukan agar lintasannya lepas (tak terikat).',
        'Satelit komunikasi di orbit geostasioner, sekitar 36.000 km di atas permukaan, berperiode tepat satu hari, sesuai tuntutan hukum Kepler ketiga untuk jarak itu.',
      ],
    },
    questions: {
      en: [
        { q: 'A planet is in a circular orbit with speed v. How fast would it need to go, at the same distance, to escape the sun completely?', a: 'About 1.41 v. Circular speed is √(GM/r) and escape speed is √(2GM/r), so the ratio is √2. In the sim, the energy readout would move from negative to zero at exactly that speed.' },
        { q: 'You launch the planet perpendicular to the sun, slightly faster than circular speed. Is the launch point the nearest or farthest point of the resulting ellipse? Why?', a: 'The nearest point (perihelion). With extra speed the planet climbs away from the sun, slowing down as it goes, reaches its farthest point on the opposite side, then falls back. The launch point is where it is lowest and fastest.' },
        { q: 'In the sim, the planet visibly speeds up near the sun and slows far from it. Explain this using energy.', a: 'E = v²/2 − GM/r is constant. Near the sun r is small, so −GM/r is very negative and v²/2 must be large to compensate. Far away −GM/r is closer to zero, so v is smaller. Equivalently, gravity does positive work on the inbound leg and negative work on the outbound leg.' },
      ],
      id: [
        { q: 'Sebuah planet berada di orbit lingkaran dengan laju v. Berapa laju yang diperlukan, pada jarak yang sama, agar planet lepas sepenuhnya dari matahari?', a: 'Sekitar 1,41 v. Laju lingkaran adalah √(GM/r) dan laju lepas √(2GM/r), jadi perbandingannya √2. Di simulasi, angka energi akan berubah dari negatif menjadi nol tepat pada laju itu.' },
        { q: 'Kamu meluncurkan planet tegak lurus arah matahari, sedikit lebih cepat dari laju lingkaran. Apakah titik peluncuran menjadi titik terdekat atau terjauh dari elips yang terbentuk? Mengapa?', a: 'Titik terdekat (perihelion). Dengan laju ekstra, planet menjauh dari matahari sambil melambat, mencapai titik terjauh di sisi seberang, lalu jatuh kembali. Titik peluncuran adalah tempat planet paling rendah dan paling cepat.' },
        { q: 'Di simulasi, planet jelas makin cepat di dekat matahari dan melambat saat jauh. Jelaskan dengan konsep energi.', a: 'E = v²/2 − GM/r bernilai tetap. Di dekat matahari r kecil, sehingga −GM/r sangat negatif dan v²/2 harus besar untuk mengimbanginya. Saat jauh, −GM/r mendekati nol, sehingga v lebih kecil. Dengan kata lain, gravitasi melakukan kerja positif saat planet mendekat dan kerja negatif saat planet menjauh.' },
      ],
    },
  },
};
