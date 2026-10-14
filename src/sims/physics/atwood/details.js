// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Derive a and T from the two free-body equations.',
      'Verify a = (m₁ − m₂)g/(m₁ + m₂) and T = 2 m₁ m₂ g / (m₁ + m₂).',
      'See that equal masses give a = 0, T = mg.',
    ],
    id: [
      'Menurunkan a dan T dari dua persamaan benda bebas.',
      'Memverifikasi a = (m₁ − m₂)g/(m₁ + m₂) dan T = 2 m₁ m₂ g / (m₁ + m₂).',
      'Melihat bahwa massa sama memberi a = 0, T = mg.',
    ],
  },  tryThis: {
    en: [
      'Equal masses — system is balanced; T = mg.',
      'm₁ = 2·m₂ — heavier side falls at g/3; T = (4/3)·m₂·g.',
      'Tiny mass difference — slow acceleration; tension barely above each weight.',
    ],
    id: [
      'Massa sama — sistem seimbang; T = mg.',
      'm₁ = 2·m₂ — sisi lebih berat jatuh g/3; T = (4/3)·m₂·g.',
      'Selisih massa kecil — percepatan lambat; tegangan sedikit di atas berat masing-masing.',
    ],
  },

  // "Learn" section: the physics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An Atwood machine is two masses hanging from a string that passes over a pulley. George Atwood built it in 1784 to study motion under gravity at a controllable, slow pace: because the two weights nearly cancel, the system accelerates much more gently than a dropped stone, which made it possible to time with the clocks of the day. The same idea makes it a favourite classroom example of Newton\'s second law applied to two connected bodies.',
        'Each mass feels two forces: its weight pulling down and the string tension T pulling up. If the pulley is massless and frictionless and the string is light and does not stretch, the tension is the same on both sides and both masses move with the same acceleration a, one down and the other up. Newton\'s second law for the heavier mass gives m1·g − T = m1·a, and for the lighter one T − m2·g = m2·a. Adding the two equations eliminates T: a = (m1 − m2)·g / (m1 + m2). The difference of the weights is the net force, and the sum of the masses is what must be accelerated. Substituting back gives T = 2·m1·m2·g / (m1 + m2).',
        'The simulation shows both masses hanging from a pulley and lets you set m1 and m2 from 0.5 to 15 kg with g = 9.8 m/s². It computes a and T from the formulas above, moves the masses with that constant acceleration, and prints a, T, the two weights and the current speed. Notice that when the masses differ, the tension sits between the two weights: less than the heavier weight, so that mass accelerates downward, and more than the lighter weight, so that one accelerates upward. Equal masses give a = 0 and T = mg; the system stays at rest wherever it is, because nothing is pulling it either way.',
        'The sim is the idealized textbook version. It ignores the pulley\'s mass and bearing friction, which in a real machine make the acceleration smaller than the formula predicts and make the tensions on the two sides differ. It also ignores the mass of the string and air resistance. The string has a finite length, so when one mass has moved 1.5 m the sim simply stops it; a real machine would also stop when a mass hits the floor or the pulley. Changing a slider resets the masses to their starting positions.',
      ],
      id: [
        'Mesin Atwood adalah dua massa yang digantung pada tali yang melewati sebuah katrol. George Atwood membuatnya pada 1784 untuk mempelajari gerak akibat gravitasi dengan laju yang lambat dan terkendali: karena kedua berat hampir saling meniadakan, sistem ini dipercepat jauh lebih lembut daripada batu yang dijatuhkan, sehingga bisa diukur waktunya dengan jam pada zaman itu. Gagasan yang sama menjadikannya contoh favorit di kelas untuk hukum kedua Newton pada dua benda yang terhubung.',
        'Setiap massa mengalami dua gaya: beratnya yang menarik ke bawah dan tegangan tali T yang menarik ke atas. Jika katrol tak bermassa dan tanpa gesekan serta tali ringan dan tidak mulur, tegangannya sama di kedua sisi dan kedua massa bergerak dengan percepatan a yang sama, satu ke bawah dan satu ke atas. Hukum kedua Newton untuk massa yang lebih berat memberi m1·g − T = m1·a, dan untuk yang lebih ringan T − m2·g = m2·a. Menjumlahkan kedua persamaan menghilangkan T: a = (m1 − m2)·g / (m1 + m2). Selisih berat adalah gaya total, dan jumlah massa adalah yang harus dipercepat. Substitusi kembali memberi T = 2·m1·m2·g / (m1 + m2).',
        'Simulasi menampilkan kedua massa yang menggantung pada katrol dan membolehkan kamu mengatur m1 dan m2 dari 0,5 sampai 15 kg dengan g = 9,8 m/s². Sim menghitung a dan T dari rumus di atas, menggerakkan massa dengan percepatan tetap itu, dan mencetak a, T, kedua berat, serta kecepatan saat ini. Perhatikan bahwa ketika massanya berbeda, tegangan berada di antara kedua berat: lebih kecil dari berat yang lebih besar, sehingga massa itu dipercepat ke bawah, dan lebih besar dari berat yang lebih kecil, sehingga massa itu dipercepat ke atas. Massa yang sama memberi a = 0 dan T = mg; sistem tetap diam di mana pun posisinya, karena tidak ada yang menariknya ke salah satu arah.',
        'Sim ini adalah versi ideal seperti di buku teks. Ia mengabaikan massa katrol dan gesekan porosnya, yang pada mesin sungguhan membuat percepatan lebih kecil dari prediksi rumus dan membuat tegangan di kedua sisi berbeda. Ia juga mengabaikan massa tali dan hambatan udara. Talinya berhingga, jadi ketika satu massa telah bergerak 1,5 m sim menghentikannya begitu saja; mesin sungguhan juga berhenti ketika massa menyentuh lantai atau katrol. Mengubah slider mengembalikan massa ke posisi awalnya.',
      ],
    },
    figure: {
      caption: {
        en: 'Free-body diagrams for the two masses. The same tension T acts upward on both; the weights differ, so the net force on the heavier mass points down and on the lighter mass points up, and both share the acceleration a.',
        id: 'Diagram benda bebas kedua massa. Tegangan T yang sama bekerja ke atas pada keduanya; beratnya berbeda, sehingga gaya total pada massa yang lebih berat mengarah ke bawah dan pada yang lebih ringan ke atas, dan keduanya memiliki percepatan a yang sama.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Atwood machine with forces on each mass', 'Mesin Atwood dengan gaya pada tiap massa')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.f{stroke-width:2.4;fill:none}.t{font-size:10px;opacity:.8}</style>
  <rect x="120" y="14" width="120" height="6" fill="currentColor" opacity=".6"/>
  <line x1="180" y1="20" x2="180" y2="40" stroke="currentColor" stroke-width="2"/>
  <circle cx="180" cy="62" r="22" class="m"/>
  <circle cx="180" cy="62" r="3" fill="currentColor"/>
  <line x1="158" y1="62" x2="158" y2="130" stroke="currentColor" stroke-width="1.6"/>
  <line x1="202" y1="62" x2="202" y2="100" stroke="currentColor" stroke-width="1.6"/>
  <rect x="136" y="130" width="44" height="44" fill="#3b82f6" opacity=".85"/>
  <text x="158" y="157" text-anchor="middle" fill="#fff" font-weight="bold">m1</text>
  <rect x="186" y="100" width="32" height="32" fill="#8b5cf6" opacity=".85"/>
  <text x="202" y="121" text-anchor="middle" fill="#fff" font-weight="bold">m2</text>
  <line x1="158" y1="130" x2="158" y2="96" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="130" y="100" fill="#10b981">T</text>
  <line x1="158" y1="174" x2="158" y2="226" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="166" y="222" fill="#ef4444">m1·g</text>
  <line x1="202" y1="100" x2="202" y2="66" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="208" y="80" fill="#10b981">T</text>
  <line x1="202" y1="132" x2="202" y2="162" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="208" y="160" fill="#ef4444">m2·g</text>
  <line x1="100" y1="140" x2="100" y2="176" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="84" y="134" fill="#f59e0b">a</text>
  <line x1="262" y1="146" x2="262" y2="110" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="256" y="162" fill="#f59e0b">a</text>
  <text x="40" y="34" class="t">m1 ${L('heavier', 'lebih berat')}: m1·g − T = m1·a</text>
  <text x="40" y="48" class="t">m2 ${L('lighter', 'lebih ringan')}: T − m2·g = m2·a</text>
  <text x="236" y="34" class="t">a = (m1 − m2)·g / (m1 + m2)</text>
  <text x="236" y="48" class="t">T = 2·m1·m2·g / (m1 + m2)</text>
  <text x="40" y="236" class="t">${L('same string, same T; m2·g is smaller than T, which is smaller than m1·g', 'tali sama, T sama; m2·g lebih kecil dari T, dan T lebih kecil dari m1·g')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The net force on the system is the difference of the two weights, and the mass being accelerated is the sum: a = (m1 − m2)·g / (m1 + m2).',
        'With a massless, frictionless pulley the string tension is the same on both sides, so both masses share one acceleration.',
        'The tension always lies between the two weights: T = 2·m1·m2·g / (m1 + m2).',
        'Equal masses give zero acceleration and T = mg; the system is in equilibrium at any position.',
        'The acceleration can never exceed g; it approaches g only when one mass is negligible compared with the other.',
      ],
      id: [
        'Gaya total pada sistem adalah selisih kedua berat, dan massa yang dipercepat adalah jumlahnya: a = (m1 − m2)·g / (m1 + m2).',
        'Dengan katrol tak bermassa dan tanpa gesekan, tegangan tali sama di kedua sisi, sehingga kedua massa memiliki satu percepatan yang sama.',
        'Tegangan selalu berada di antara kedua berat: T = 2·m1·m2·g / (m1 + m2).',
        'Massa yang sama memberi percepatan nol dan T = mg; sistem setimbang pada posisi mana pun.',
        'Percepatan tidak pernah melampaui g; ia mendekati g hanya ketika satu massa dapat diabaikan dibandingkan yang lain.',
      ],
    },
    vocabulary: {
      en: [
        ['Tension (T)', 'The pulling force a string exerts on whatever it is attached to; the same along a light string over an ideal pulley.'],
        ['Weight', 'The force of gravity on a mass, equal to m·g; measured in newtons.'],
        ['Net force', 'The vector sum of all forces on a body; by Newton\'s second law it equals mass times acceleration.'],
        ['Free-body diagram', 'A sketch of one object alone with arrows for every force acting on it.'],
        ['Inextensible string', 'A string that does not stretch, so both ends move the same distance and have the same speed and acceleration.'],
        ['Ideal pulley', 'A pulley with no mass and no friction; it changes the direction of the string without changing its tension.'],
        ['Equilibrium', 'A state with zero net force, so the acceleration is zero; here, when the two masses are equal.'],
      ],
      id: [
        ['Tegangan (T)', 'Gaya tarik yang diberikan tali pada benda yang terikat padanya; sama di sepanjang tali ringan yang melewati katrol ideal.'],
        ['Berat', 'Gaya gravitasi pada suatu massa, sama dengan m·g; diukur dalam newton.'],
        ['Gaya total', 'Jumlah vektor semua gaya pada sebuah benda; menurut hukum kedua Newton sama dengan massa kali percepatan.'],
        ['Diagram benda bebas', 'Sketsa satu benda saja dengan anak panah untuk setiap gaya yang bekerja padanya.'],
        ['Tali tak mulur', 'Tali yang tidak memanjang, sehingga kedua ujungnya bergerak sejauh yang sama dan memiliki kecepatan serta percepatan yang sama.'],
        ['Katrol ideal', 'Katrol tanpa massa dan tanpa gesekan; ia mengubah arah tali tanpa mengubah tegangannya.'],
        ['Kesetimbangan', 'Keadaan dengan gaya total nol, sehingga percepatannya nol; di sini, ketika kedua massa sama.'],
      ],
    },
    misconceptions: {
      en: [
        ['The tension equals the weight of the heavier mass, since that is what pulls the string.', 'If T equalled m1·g the heavier mass would have zero net force and could not accelerate. T is less than m1·g and more than m2·g; check the readout.'],
        ['The heavier mass falls with acceleration g, like free fall.', 'The string holds it back. Only the difference of the weights accelerates the whole system, so a is less than g, and much less when the masses are similar.'],
        ['Doubling both masses doubles the acceleration.', 'Doubling both doubles the net force and doubles the mass to be moved, so a is unchanged. The tension, however, doubles.'],
        ['Equal masses means the system must hang still at the same height.', 'Equal masses means zero acceleration, not zero velocity. If set moving, it would keep moving at constant speed; at any height it is in equilibrium.'],
      ],
      id: [
        ['Tegangan sama dengan berat massa yang lebih berat, karena itulah yang menarik tali.', 'Jika T sama dengan m1·g, gaya total pada massa yang lebih berat nol dan ia tidak bisa dipercepat. T lebih kecil dari m1·g dan lebih besar dari m2·g; periksa tampilannya.'],
        ['Massa yang lebih berat jatuh dengan percepatan g, seperti jatuh bebas.', 'Tali menahannya. Hanya selisih berat yang mempercepat seluruh sistem, jadi a lebih kecil dari g, dan jauh lebih kecil ketika massanya hampir sama.'],
        ['Menggandakan kedua massa menggandakan percepatan.', 'Menggandakan keduanya menggandakan gaya total sekaligus menggandakan massa yang harus digerakkan, jadi a tidak berubah. Tegangannya, bagaimanapun, menjadi dua kali lipat.'],
        ['Massa sama berarti sistem harus diam pada ketinggian yang sama.', 'Massa sama berarti percepatan nol, bukan kecepatan nol. Jika digerakkan, ia terus bergerak dengan kecepatan tetap; pada ketinggian mana pun ia setimbang.'],
      ],
    },
    realWorld: {
      en: [
        'Traction elevators use a counterweight on the other side of the cable, so the motor only has to supply the difference in weight plus friction.',
        'A well bucket on a rope over a pulley, with a person on the other end, is an Atwood machine with a human providing one of the forces.',
        'Funicular railways run two cars attached to one cable over a drum at the top; the descending car helps lift the ascending one.',
        'Physics labs still use Atwood machines with photogates to measure g and to test Newton\'s second law with small, easily timed accelerations.',
      ],
      id: [
        'Lift dengan tali baja memakai bobot pengimbang di sisi lain kabel, sehingga motor hanya perlu menyediakan selisih berat ditambah gesekan.',
        'Ember sumur pada tali yang melewati katrol, dengan orang di ujung lainnya, adalah mesin Atwood dengan manusia sebagai salah satu gayanya.',
        'Kereta funikular menjalankan dua gerbong yang terikat pada satu kabel melewati drum di puncak; gerbong yang turun membantu mengangkat gerbong yang naik.',
        'Laboratorium fisika masih memakai mesin Atwood dengan gerbang cahaya untuk mengukur g dan menguji hukum kedua Newton dengan percepatan kecil yang mudah diukur waktunya.',
      ],
    },
    questions: {
      en: [
        { q: 'Set m1 = 6 kg and m2 = 4 kg. Predict a and T before reading them off the sim.', a: 'a = (6 − 4)·9.8 / (6 + 4) = 1.96 m/s². T = 2·6·4·9.8 / 10 = 47.04 N, which lies between m2·g = 39.2 N and m1·g = 58.8 N, as it must.' },
        { q: 'Why does the "Tiny diff" preset (5.1 kg and 5 kg) accelerate so slowly, even though both masses are fairly large?', a: 'The net force is only the difference of the weights, (5.1 − 5)·9.8 ≈ 0.98 N, but it has to accelerate the whole 10.1 kg. So a ≈ 0.097 m/s², about 1% of g. Large total mass with a small difference is exactly what Atwood wanted for slow, measurable motion.' },
        { q: 'A real Atwood machine with the same masses as the "2:1" preset is found to accelerate at less than g/3. Give two reasons.', a: 'The pulley has mass, so part of the net force goes into spinning it, and bearing friction opposes the motion. Both reduce a below (m1 − m2)·g / (m1 + m2); the sim ignores them.' },
      ],
      id: [
        { q: 'Atur m1 = 6 kg dan m2 = 4 kg. Prediksi a dan T sebelum membacanya di sim.', a: 'a = (6 − 4)·9,8 / (6 + 4) = 1,96 m/s². T = 2·6·4·9,8 / 10 = 47,04 N, yang berada di antara m2·g = 39,2 N dan m1·g = 58,8 N, seperti seharusnya.' },
        { q: 'Mengapa preset "Tiny diff" (5,1 kg dan 5 kg) dipercepat begitu lambat, padahal kedua massanya cukup besar?', a: 'Gaya totalnya hanya selisih berat, (5,1 − 5)·9,8 ≈ 0,98 N, tetapi harus mempercepat seluruh 10,1 kg. Jadi a ≈ 0,097 m/s², sekitar 1% dari g. Massa total besar dengan selisih kecil persis yang diinginkan Atwood untuk gerak lambat yang bisa diukur.' },
        { q: 'Mesin Atwood sungguhan dengan massa seperti preset "2:1" ternyata dipercepat kurang dari g/3. Berikan dua alasan.', a: 'Katrol bermassa, sehingga sebagian gaya total dipakai untuk memutarnya, dan gesekan poros melawan gerak. Keduanya membuat a lebih kecil dari (m1 − m2)·g / (m1 + m2); sim mengabaikan keduanya.' },
      ],
    },
  },
};
