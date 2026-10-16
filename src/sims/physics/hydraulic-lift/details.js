// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'State Pascal\'s law: pressure applied to an enclosed fluid is transmitted undiminished to every part of the fluid.',
      'Use F₁/A₁ = F₂/A₂ to calculate the output force of a hydraulic lift and explain why a bigger area ratio multiplies the force.',
      'Show that the piston travel shrinks by the same factor the force grows, so that work in equals work out.',
    ],
    id: [
      'Menyatakan hukum Pascal: tekanan yang diberikan pada zat cair dalam ruang tertutup diteruskan sama besar ke seluruh bagian zat cair.',
      'Menggunakan F₁/A₁ = F₂/A₂ untuk menghitung gaya keluaran dongkrak hidrolik dan menjelaskan mengapa perbandingan luas yang lebih besar melipatgandakan gaya.',
      'Menunjukkan bahwa jarak gerak piston mengecil dengan faktor yang sama dengan pembesaran gaya, sehingga usaha masuk sama dengan usaha keluar.',
    ],
  },
  tryThis: {
    en: [
      'Set the area ratio to 10 and the input force to 100 N. Read F₂, then double the ratio. Does F₂ double?',
      'Drag the small piston down 20 cm. How far does the big piston rise? Multiply each distance by its force and compare the two works.',
      'Press "Lift a car" and then lower the input force step by step. At what force does the car stop lifting?',
      'Keep the input force fixed and shrink A₁. Watch the pressure in the fluid climb even though F₁ did not change.',
    ],
    id: [
      'Atur perbandingan luas 10 dan gaya masukan 100 N. Baca F₂, lalu gandakan perbandingannya. Apakah F₂ juga menjadi dua kali lipat?',
      'Geser piston kecil turun 20 cm. Seberapa tinggi piston besar naik? Kalikan tiap jarak dengan gayanya dan bandingkan kedua usahanya.',
      'Tekan "Angkat mobil" lalu turunkan gaya masukan sedikit demi sedikit. Pada gaya berapa mobil berhenti terangkat?',
      'Pertahankan gaya masukan dan perkecil A₁. Perhatikan tekanan zat cair naik meskipun F₁ tidak berubah.',
    ],
  },

  learn: {
    background: {
      en: [
        'Liquids are almost impossible to squash. When you push on a liquid that is sealed in a container, the pressure you create does not stay where you pushed: it is passed on, undiminished, to every part of the liquid and to every wall of the container. This is Pascal\'s law, named after Blaise Pascal, who studied it in the 1600s. Pressure is force per area, P = F/A, so pressing with force F₁ on a piston of area A₁ raises the pressure throughout the liquid by F₁/A₁.',
        'A hydraulic lift uses two cylinders connected by a pipe. The same pressure acts on the large piston of area A₂, so it pushes up with F₂ = P × A₂ = F₁ × A₂/A₁. If the large piston has 40 times the area of the small one, the force is multiplied by 40: a 300 N push from one arm becomes a 12 000 N lift, enough to raise a small car. The multiplying factor A₂/A₁ is the mechanical advantage of the lift.',
        'There is a price. The liquid that leaves the small cylinder must fit into the large one, so if the small piston moves down a distance d₁ the large piston rises only d₂ = d₁ × A₁/A₂. With a ratio of 40, pushing 20 cm lifts the car just 0.5 cm. Work is force × distance, and F₁d₁ = F₂d₂: the work you put in equals the work the lift delivers. Real jacks pump many small strokes through a valve to build up a useful lift height.',
        'The sim draws both cylinders with piston widths to scale, so you can see the area ratio directly. Drag the small piston (or use the stroke slider) and watch the fluid move from one cylinder to the other. The readout shows the pressure, which is the same on both sides, and the two works, which stay equal however you set the sliders.',
      ],
      id: [
        'Zat cair hampir tidak dapat dimampatkan. Ketika kamu menekan zat cair yang tertutup rapat dalam wadah, tekanan yang kamu buat tidak tinggal di tempat kamu menekan: tekanan itu diteruskan sama besar ke seluruh bagian zat cair dan ke setiap dinding wadah. Inilah hukum Pascal, dinamai dari Blaise Pascal yang mempelajarinya pada tahun 1600-an. Tekanan adalah gaya per luas, P = F/A, sehingga menekan dengan gaya F₁ pada piston seluas A₁ menaikkan tekanan di seluruh zat cair sebesar F₁/A₁.',
        'Dongkrak hidrolik memakai dua tabung yang dihubungkan pipa. Tekanan yang sama bekerja pada piston besar seluas A₂, sehingga piston itu mendorong ke atas dengan F₂ = P × A₂ = F₁ × A₂/A₁. Jika piston besar luasnya 40 kali piston kecil, gayanya dilipatgandakan 40 kali: dorongan 300 N dari satu lengan menjadi angkatan 12 000 N, cukup untuk mengangkat mobil kecil. Faktor pengali A₂/A₁ adalah keuntungan mekanis dongkrak.',
        'Ada harganya. Zat cair yang keluar dari tabung kecil harus masuk ke tabung besar, sehingga jika piston kecil turun sejauh d₁, piston besar hanya naik d₂ = d₁ × A₁/A₂. Dengan perbandingan 40, mendorong 20 cm hanya mengangkat mobil 0,5 cm. Usaha adalah gaya × jarak, dan F₁d₁ = F₂d₂: usaha yang kamu berikan sama dengan usaha yang diberikan dongkrak. Dongkrak sungguhan memompa banyak langkah pendek melalui katup untuk mengumpulkan ketinggian angkat yang berguna.',
        'Simulasi menggambar kedua tabung dengan lebar piston sesuai skala, sehingga perbandingan luasnya terlihat langsung. Geser piston kecil (atau pakai slider langkah) dan lihat zat cair berpindah dari satu tabung ke tabung lain. Tampilan angka menunjukkan tekanan, yang sama di kedua sisi, dan kedua usaha, yang tetap sama bagaimanapun kamu mengatur slider.',
      ],
    },
    figure: {
      caption: {
        en: 'Two connected cylinders. The same pressure P acts on both pistons, so the force scales with area (F₂ = F₁·A₂/A₁) while the distance moved scales the other way (d₂ = d₁·A₁/A₂).',
        id: 'Dua tabung yang terhubung. Tekanan P yang sama bekerja pada kedua piston, sehingga gaya sebanding dengan luas (F₂ = F₁·A₂/A₁) sementara jarak gerak berbanding terbalik (d₂ = d₁·A₁/A₂).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Hydraulic lift with small input piston and large output piston', 'Dongkrak hidrolik dengan piston masukan kecil dan piston keluaran besar')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{text-anchor:middle}.b{font:bold 12px system-ui,sans-serif}</style>
  <defs><marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="context-stroke"/></marker></defs>
  <path d="M60 70 L60 190 L300 190 L300 50" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M90 70 L90 160 L160 160 L160 50" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M60 130 L60 190 L300 190 L300 110 L160 110 L160 160 L90 160 L90 130 Z" fill="#3b82f6" opacity=".55"/>
  <rect x="60" y="118" width="30" height="12" fill="#f59e0b"/>
  <rect x="160" y="98" width="140" height="12" fill="#f59e0b"/>
  <line x1="75" y1="76" x2="75" y2="112" stroke="#ef4444" stroke-width="2.5" marker-end="url(#ar)"/>
  <text x="75" y="70" class="c b" fill="#ef4444">F₁</text>
  <line x1="230" y1="95" x2="230" y2="62" stroke="#10b981" stroke-width="2.5" marker-end="url(#ar)"/>
  <text x="230" y="56" class="c b" fill="#10b981">F₂ = F₁·A₂/A₁</text>
  <text x="75" y="150" class="c" fill="#fff">A₁</text>
  <text x="230" y="150" class="c" fill="#fff">A₂</text>
  <text x="180" y="182" class="c" fill="#fff">P = F₁/A₁ = F₂/A₂</text>
  <line x1="40" y1="118" x2="40" y2="140" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 2"/>
  <text x="36" y="134" style="text-anchor:end">d₁</text>
  <line x1="320" y1="98" x2="320" y2="103" stroke="currentColor" stroke-width="1.2"/>
  <text x="326" y="106">d₂ = d₁·A₁/A₂</text>
  <text x="180" y="226" class="c b">F₁·d₁ = F₂·d₂</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Pascal\'s law: pressure applied to an enclosed liquid is transmitted equally to every part of it.',
        'Both pistons feel the same pressure, so F₁/A₁ = F₂/A₂ and the output force is F₂ = F₁ × A₂/A₁.',
        'The force multiplier equals the area ratio A₂/A₁; a 40:1 ratio turns 300 N into 12 000 N.',
        'Liquid volume is conserved, so the big piston moves less: d₂ = d₁ × A₁/A₂.',
        'Work in equals work out: F₁d₁ = F₂d₂. A hydraulic lift multiplies force, not energy.',
      ],
      id: [
        'Hukum Pascal: tekanan yang diberikan pada zat cair tertutup diteruskan sama besar ke seluruh bagiannya.',
        'Kedua piston merasakan tekanan yang sama, sehingga F₁/A₁ = F₂/A₂ dan gaya keluaran F₂ = F₁ × A₂/A₁.',
        'Faktor pengali gaya sama dengan perbandingan luas A₂/A₁; perbandingan 40:1 mengubah 300 N menjadi 12 000 N.',
        'Volume zat cair kekal, sehingga piston besar bergerak lebih sedikit: d₂ = d₁ × A₁/A₂.',
        'Usaha masuk sama dengan usaha keluar: F₁d₁ = F₂d₂. Dongkrak hidrolik melipatgandakan gaya, bukan energi.',
      ],
    },
    vocabulary: {
      en: [
        ['Pascal\'s law', 'A change in pressure applied to an enclosed fluid is transmitted undiminished to every point of the fluid and the container walls.'],
        ['Piston', 'A tight-fitting disc that slides inside a cylinder and pushes on the fluid or is pushed by it.'],
        ['Hydraulic', 'Working by means of a liquid under pressure, usually oil.'],
        ['Area ratio (A₂/A₁)', 'The large piston area divided by the small piston area; equal to the force multiplier of the lift.'],
        ['Work', 'Force × distance moved in the direction of the force, in joules (J). 1 J = 1 N·m.'],
      ],
      id: [
        ['Hukum Pascal', 'Perubahan tekanan yang diberikan pada zat cair tertutup diteruskan sama besar ke setiap titik zat cair dan dinding wadahnya.'],
        ['Piston', 'Cakram yang pas rapat dan dapat meluncur di dalam tabung, menekan zat cair atau ditekan olehnya.'],
        ['Hidrolik', 'Bekerja dengan bantuan zat cair bertekanan, biasanya minyak.'],
        ['Perbandingan luas (A₂/A₁)', 'Luas piston besar dibagi luas piston kecil; sama dengan faktor pengali gaya dongkrak.'],
        ['Usaha', 'Gaya × jarak perpindahan searah gaya, dalam joule (J). 1 J = 1 N·m.'],
      ],
    },
    misconceptions: {
      en: [
        ['A hydraulic lift creates extra energy, since the output force is bigger.', 'The output force is bigger but the output distance is smaller by the same factor. F₁d₁ = F₂d₂, so no energy is created.'],
        ['The pressure is higher at the big piston because the force there is bigger.', 'The pressure is the same everywhere in the connected liquid. The force is bigger only because the area is bigger: F₂ = P × A₂.'],
        ['Pushing harder on the small piston makes the big piston move further.', 'How far the big piston moves depends only on how far the small piston moves and the area ratio, not on the force. Pushing harder raises the pressure and the output force.'],
      ],
      id: [
        ['Dongkrak hidrolik menciptakan energi tambahan karena gaya keluarannya lebih besar.', 'Gaya keluaran memang lebih besar, tetapi jarak keluarannya lebih kecil dengan faktor yang sama. F₁d₁ = F₂d₂, jadi tidak ada energi yang tercipta.'],
        ['Tekanan di piston besar lebih tinggi karena gayanya lebih besar.', 'Tekanan sama di seluruh zat cair yang terhubung. Gaya lebih besar hanya karena luasnya lebih besar: F₂ = P × A₂.'],
        ['Menekan piston kecil lebih kuat membuat piston besar bergerak lebih jauh.', 'Seberapa jauh piston besar bergerak hanya bergantung pada jarak gerak piston kecil dan perbandingan luas, bukan pada gaya. Menekan lebih kuat menaikkan tekanan dan gaya keluaran.'],
      ],
    },
    realWorld: {
      en: [
        'Car jacks and the lifts in repair garages raise whole vehicles with a hand pump or a small motor.',
        'Car brakes are hydraulic: a light push on the pedal becomes a large squeezing force on the brake discs at all four wheels at once.',
        'Excavators, cranes and dump trucks move their arms and buckets with hydraulic cylinders fed by one pump.',
        'Dentist and barber chairs rise smoothly on a hydraulic cylinder operated by a foot pedal.',
        'Hydraulic presses in factories shape metal with forces of millions of newtons.',
      ],
      id: [
        'Dongkrak mobil dan lift di bengkel mengangkat seluruh kendaraan dengan pompa tangan atau motor kecil.',
        'Rem mobil bersifat hidrolik: tekanan ringan pada pedal menjadi gaya jepit besar pada cakram rem di keempat roda sekaligus.',
        'Ekskavator, derek dan truk pengangkut menggerakkan lengan dan ember mereka dengan silinder hidrolik yang dipasok satu pompa.',
        'Kursi dokter gigi dan kursi tukang cukur naik dengan mulus di atas silinder hidrolik yang dioperasikan pedal kaki.',
        'Mesin pres hidrolik di pabrik membentuk logam dengan gaya jutaan newton.',
      ],
    },
    questions: {
      en: [
        { q: 'The small piston has area 5 cm² and the large piston 200 cm². You push with 150 N. What is the pressure in the fluid and the output force?', a: 'P = 150 N / 0.0005 m² = 300 000 Pa = 300 kPa. F₂ = 150 × 200/5 = 6000 N.' },
        { q: 'In the same lift you push the small piston down 10 cm. How far does the large piston rise, and how much work is done on each side?', a: 'd₂ = 10 cm × 5/200 = 0.25 cm. Work in = 150 N × 0.10 m = 15 J; work out = 6000 N × 0.0025 m = 15 J. They are equal.' },
        { q: 'A mechanic needs to lift a 12 000 N car but can only push with 400 N. What area ratio does the lift need?', a: 'A₂/A₁ must be at least 12 000 / 400 = 30.' },
      ],
      id: [
        { q: 'Piston kecil luasnya 5 cm² dan piston besar 200 cm². Kamu mendorong dengan 150 N. Berapa tekanan zat cair dan gaya keluarannya?', a: 'P = 150 N / 0,0005 m² = 300 000 Pa = 300 kPa. F₂ = 150 × 200/5 = 6000 N.' },
        { q: 'Pada dongkrak yang sama kamu mendorong piston kecil turun 10 cm. Seberapa tinggi piston besar naik, dan berapa usaha di tiap sisi?', a: 'd₂ = 10 cm × 5/200 = 0,25 cm. Usaha masuk = 150 N × 0,10 m = 15 J; usaha keluar = 6000 N × 0,0025 m = 15 J. Keduanya sama.' },
        { q: 'Seorang mekanik perlu mengangkat mobil 12 000 N tetapi hanya bisa mendorong dengan 400 N. Berapa perbandingan luas yang diperlukan dongkrak?', a: 'A₂/A₁ harus paling sedikit 12 000 / 400 = 30.' },
      ],
    },
  },
};
