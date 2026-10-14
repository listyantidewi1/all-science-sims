// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Describe how energy moves between kinetic and gravitational potential stores as a cart rolls.',
      'Show that the total energy stays the same when there is no friction.',
      'Explain where the energy goes when friction is switched on.',
    ],
    id: [
      'Menjelaskan bagaimana energi berpindah antara energi kinetik dan energi potensial gravitasi saat kereta meluncur.',
      'Menunjukkan bahwa energi total tetap sama ketika tidak ada gesekan.',
      'Menjelaskan ke mana energi pergi ketika gesekan dinyalakan.',
    ],
  },
  tryThis: {
    en: [
      'Drag a hill in the middle higher than the start. Can the cart get over it? Why not?',
      'Double the start height. Does the maximum speed double too?',
      'Turn friction on and wait. Where does the cart end up, and what does the thermal bar show?',
    ],
    id: [
      'Geser bukit di tengah lebih tinggi daripada titik awal. Bisakah kereta melewatinya? Mengapa tidak?',
      'Gandakan tinggi awal. Apakah kecepatan maksimum ikut menjadi dua kali lipat?',
      'Nyalakan gesekan dan tunggu. Di mana kereta berhenti, dan apa yang ditunjukkan batang energi panas?',
    ],
  },

  // "Learn" section: the physics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Energy is a quantity that is never created or destroyed, only moved from one store to another. A cart high on a roller-coaster track has energy stored because of its height: gravitational potential energy, which equals mass × g × height, where g is about 9.8 N/kg. As the cart rolls down, gravity does work on it and that energy becomes kinetic energy, the energy of movement, which equals half × mass × speed². Rolling up a hill reverses the trade. At every moment the two stores add up to the same total, so the cart can never climb higher than the point it was released from.',
        'The simulation draws a track through five control points whose heights you can drag, and lets you set the start height with a slider. The cart has a mass of 1 kg, so the numbers stay small: released from 30 m it carries 1 × 9.8 × 30 = 294 J. Three bars show kinetic, potential and thermal energy, with a dashed line for the total. With friction off, the kinetic and potential bars see-saw while their sum sits exactly on the dashed line; the sim actually computes the speed from the energy that is left, which is why the bars are always perfectly balanced.',
        'Switch friction on and a third store appears. Friction between the wheels and the track turns some kinetic energy into thermal energy, warming the track and the cart. The thermal bar grows a little for every metre travelled, the slider μ sets how fast, and the cart reaches a bit less height on each pass until it settles in the lowest dip, with everything above that dip\'s own potential energy now in the thermal bar. The total of the three bars still equals the starting energy: energy was not lost, it was spread into heat that cannot be gathered back to lift the cart.',
        'The sim simplifies a few things. The cart is a point that follows the track, so there is no air resistance and no energy in spinning wheels. The friction rule is simple: heat generated per metre is μ × weight, the same on slopes and flats, whereas real friction depends on how hard the track presses on the wheels. At the two ends of the track the cart bounces back without losing energy, like a perfect buffer. If a hill is higher than the energy allows, the cart turns around at the point where its kinetic energy would reach zero, exactly as a real cart would.',
      ],
      id: [
        'Energi adalah besaran yang tidak pernah diciptakan atau dimusnahkan, hanya dipindahkan dari satu bentuk ke bentuk lain. Kereta yang berada tinggi di lintasan roller coaster menyimpan energi karena ketinggiannya: energi potensial gravitasi, yang sama dengan massa × g × tinggi, dengan g sekitar 9,8 N/kg. Saat kereta meluncur turun, gravitasi melakukan kerja padanya dan energi itu berubah menjadi energi kinetik, energi gerak, yang sama dengan setengah × massa × kelajuan². Naik bukit membalik pertukaran itu. Setiap saat kedua bentuk energi berjumlah sama dengan total yang tetap, sehingga kereta tidak pernah bisa naik lebih tinggi daripada titik pelepasannya.',
        'Simulasi menggambar lintasan melalui lima titik kontrol yang tingginya bisa kamu seret, dan membolehkan kamu mengatur tinggi awal dengan slider. Massa kereta 1 kg agar angkanya tetap kecil: dilepas dari 30 m, kereta membawa 1 × 9,8 × 30 = 294 J. Tiga batang menunjukkan energi kinetik, potensial, dan panas, dengan garis putus-putus untuk total. Dengan gesekan mati, batang kinetik dan potensial naik-turun bergantian sementara jumlahnya tepat berada di garis putus-putus; sim memang menghitung kelajuan dari energi yang tersisa, sehingga batangnya selalu seimbang sempurna.',
        'Nyalakan gesekan dan bentuk energi ketiga muncul. Gesekan antara roda dan lintasan mengubah sebagian energi kinetik menjadi energi panas, menghangatkan lintasan dan kereta. Batang panas bertambah sedikit untuk setiap meter yang ditempuh, slider μ mengatur seberapa cepat, dan kereta mencapai tinggi yang sedikit lebih rendah pada setiap lintasan sampai akhirnya berhenti di lembah terendah, dengan semua energi selain energi potensial di lembah itu kini berada di batang panas. Jumlah ketiga batang masih sama dengan energi awal: energi tidak hilang, melainkan menyebar menjadi panas yang tidak bisa dikumpulkan kembali untuk mengangkat kereta.',
        'Sim ini menyederhanakan beberapa hal. Kereta berupa titik yang mengikuti lintasan, jadi tidak ada hambatan udara dan tidak ada energi pada putaran roda. Aturan gesekannya sederhana: panas yang dihasilkan per meter adalah μ × berat, sama di lereng maupun di bagian datar, sedangkan gesekan sungguhan bergantung pada seberapa kuat lintasan menekan roda. Di kedua ujung lintasan kereta memantul balik tanpa kehilangan energi, seperti penyangga sempurna. Jika sebuah bukit lebih tinggi daripada yang dimungkinkan energinya, kereta berbalik di titik tempat energi kinetiknya akan menjadi nol, persis seperti kereta sungguhan.',
      ],
    },
    figure: {
      caption: {
        en: 'The same cart at three places on a frictionless track. High up, nearly all its energy is potential; in the dip, most is kinetic; on the hill it is a mix. The two bars always add up to the same total, shown by the dashed line.',
        id: 'Kereta yang sama di tiga tempat pada lintasan tanpa gesekan. Di tempat tinggi, hampir semua energinya potensial; di lembah, sebagian besar kinetik; di bukit, campuran. Kedua batang selalu berjumlah sama, ditunjukkan garis putus-putus.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Energy bars for a cart at three points on a roller coaster', 'Batang energi kereta di tiga titik roller coaster')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.tr{fill:none;stroke:currentColor;stroke-width:3;opacity:.7}.t{font-size:10px;opacity:.8}.d{stroke:#f59e0b;stroke-width:1.2;stroke-dasharray:4 3}.g{stroke:currentColor;stroke-width:.6;opacity:.2}</style>
  <line x1="20" y1="150" x2="340" y2="150" class="g"/>
  <path d="M40 40 C80 40 90 140 130 140 S180 70 210 80 S260 140 320 130" class="tr"/>
  <rect x="32" y="26" width="18" height="10" fill="#ef4444"/><circle cx="36" cy="38" r="2.5" fill="currentColor"/><circle cx="46" cy="38" r="2.5" fill="currentColor"/>
  <rect x="121" y="126" width="18" height="10" fill="#ef4444"/><circle cx="125" cy="138" r="2.5" fill="currentColor"/><circle cx="135" cy="138" r="2.5" fill="currentColor"/>
  <rect x="201" y="66" width="18" height="10" fill="#ef4444"/><circle cx="205" cy="78" r="2.5" fill="currentColor"/><circle cx="215" cy="78" r="2.5" fill="currentColor"/>
  <text x="56" y="34" class="t">${L('start, 30 m', 'awal, 30 m')}</text>
  <text x="140" y="150" class="t">${L('dip, 5 m', 'lembah, 5 m')}</text>
  <text x="224" y="74" class="t">${L('hill, 20 m', 'bukit, 20 m')}</text>
  <line x1="20" y1="166" x2="340" y2="166" class="d"/>
  <text x="300" y="162" class="t" fill="#f59e0b">${L('total 294 J', 'total 294 J')}</text>
  <rect x="34" y="166" width="12" height="60" fill="#10b981"/><rect x="50" y="226" width="12" height="0.5" fill="#3b82f6"/>
  <rect x="122" y="216" width="12" height="10" fill="#10b981"/><rect x="138" y="176" width="12" height="50" fill="#3b82f6"/>
  <rect x="202" y="186" width="12" height="40" fill="#10b981"/><rect x="218" y="206" width="12" height="20" fill="#3b82f6"/>
  <text x="34" y="236" class="t">PE 294 · KE 0</text>
  <text x="118" y="236" class="t">PE 49 · KE 245</text>
  <text x="198" y="236" class="t">PE 196 · KE 98</text>
  <text x="252" y="190" class="t" fill="#10b981">${L('potential = m·g·h', 'potensial = m·g·h')}</text>
  <text x="252" y="204" class="t" fill="#3b82f6">${L('kinetic = ½·m·v²', 'kinetik = ½·m·v²')}</text>
  <text x="252" y="218" class="t">${L('friction on: a thermal', 'gesekan nyala: batang')}</text>
  <text x="252" y="230" class="t">${L('bar grows, total stays', 'panas tumbuh, total tetap')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Gravitational potential energy depends on height: mass × g × height. Kinetic energy depends on speed: half × mass × speed².',
        'Without friction, potential and kinetic energy swap back and forth but their total never changes.',
        'The cart can never rise above its release height, because that would need more energy than it has.',
        'Doubling the start height doubles the energy and the kinetic energy at the bottom, but the speed only grows by about 1.4 times, because kinetic energy depends on speed squared.',
        'Friction converts kinetic energy into thermal energy; the total is still conserved, but the thermal part cannot be turned back into motion.',
      ],
      id: [
        'Energi potensial gravitasi bergantung pada tinggi: massa × g × tinggi. Energi kinetik bergantung pada kelajuan: setengah × massa × kelajuan².',
        'Tanpa gesekan, energi potensial dan kinetik saling bertukar, tetapi jumlahnya tidak pernah berubah.',
        'Kereta tidak pernah bisa naik melampaui tinggi pelepasannya, karena itu membutuhkan energi lebih banyak daripada yang dimilikinya.',
        'Menggandakan tinggi awal menggandakan energi dan energi kinetik di dasar, tetapi kelajuannya hanya bertambah sekitar 1,4 kali, karena energi kinetik bergantung pada kuadrat kelajuan.',
        'Gesekan mengubah energi kinetik menjadi energi panas; totalnya tetap kekal, tetapi bagian panas tidak bisa diubah kembali menjadi gerak.',
      ],
    },
    vocabulary: {
      en: [
        ['Energy', 'The capacity to make things happen; measured in joules (J). It can change form but the total amount is conserved.'],
        ['Gravitational potential energy', 'Energy stored by being high up, equal to mass × g × height.'],
        ['Kinetic energy', 'Energy of motion, equal to half × mass × speed squared.'],
        ['Thermal energy', 'Energy in the random motion of particles; friction turns movement energy into this form and warms things up.'],
        ['Conservation of energy', 'The rule that the total energy of a closed system stays the same, whatever changes of form happen.'],
        ['Friction', 'A force between surfaces that rub, which opposes motion and converts kinetic energy into heat.'],
        ['Joule (J)', 'The unit of energy; lifting a 1 kg mass by about 10 cm stores about 1 J.'],
      ],
      id: [
        ['Energi', 'Kemampuan untuk membuat sesuatu terjadi; diukur dalam joule (J). Bentuknya bisa berubah tetapi jumlah totalnya kekal.'],
        ['Energi potensial gravitasi', 'Energi yang tersimpan karena berada di tempat tinggi, sama dengan massa × g × tinggi.'],
        ['Energi kinetik', 'Energi gerak, sama dengan setengah × massa × kuadrat kelajuan.'],
        ['Energi panas', 'Energi dalam gerak acak partikel; gesekan mengubah energi gerak menjadi bentuk ini dan menghangatkan benda.'],
        ['Kekekalan energi', 'Aturan bahwa energi total suatu sistem tertutup tetap sama, apa pun perubahan bentuk yang terjadi.'],
        ['Gesekan', 'Gaya antara permukaan yang saling bergesek, yang melawan gerak dan mengubah energi kinetik menjadi panas.'],
        ['Joule (J)', 'Satuan energi; mengangkat massa 1 kg setinggi sekitar 10 cm menyimpan sekitar 1 J.'],
      ],
    },
    misconceptions: {
      en: [
        ['When friction slows the cart, its energy is used up and disappears.', 'The energy becomes thermal energy in the track and cart. The sim\'s three bars still add up to the starting total; the thermal bar simply holds more and more of it.'],
        ['Twice the height means twice the speed at the bottom.', 'Twice the height means twice the kinetic energy, but kinetic energy grows with speed squared, so the speed only increases by √2 ≈ 1.4 times. Check the m/s readout at 10 m and 20 m.'],
        ['A heavier cart would go faster down the same track.', 'Mass appears in both energy stores, so it cancels: the speed at any height is the same for any mass (without friction). The heavier cart has more energy, but needs more to reach the same speed.'],
        ['The cart has no energy at the bottom because it is at height zero.', 'At the bottom its potential energy is zero but its kinetic energy is largest; it is moving fastest there. The total is unchanged.'],
      ],
      id: [
        ['Saat gesekan memperlambat kereta, energinya habis dan hilang.', 'Energi itu berubah menjadi energi panas pada lintasan dan kereta. Ketiga batang di sim masih berjumlah sama dengan total awal; batang panas hanya menampung semakin banyak bagiannya.'],
        ['Tinggi dua kali lipat berarti kelajuan di dasar dua kali lipat.', 'Tinggi dua kali lipat berarti energi kinetik dua kali lipat, tetapi energi kinetik bertambah dengan kuadrat kelajuan, jadi kelajuan hanya naik √2 ≈ 1,4 kali. Periksa bacaan m/s pada 10 m dan 20 m.'],
        ['Kereta yang lebih berat akan lebih cepat menuruni lintasan yang sama.', 'Massa muncul di kedua bentuk energi, sehingga saling meniadakan: kelajuan pada ketinggian mana pun sama untuk massa apa pun (tanpa gesekan). Kereta yang lebih berat punya energi lebih banyak, tetapi juga butuh lebih banyak untuk mencapai kelajuan yang sama.'],
        ['Kereta tidak punya energi di dasar karena tingginya nol.', 'Di dasar energi potensialnya nol tetapi energi kinetiknya terbesar; di sanalah ia bergerak paling cepat. Totalnya tidak berubah.'],
      ],
    },
    realWorld: {
      en: [
        'Real roller coasters are pulled up only the first hill; every later hill must be lower, and the ride ends with brakes turning the remaining motion into heat.',
        'A pendulum clock or a child\'s swing trades height for speed on every swing, and air resistance slowly drains the energy as heat unless it is topped up.',
        'Hydroelectric dams store water high up and let it fall through turbines, converting gravitational potential energy into electricity.',
        'Car brakes get hot because they convert the car\'s kinetic energy into thermal energy; hybrid cars recover part of it as electricity instead.',
      ],
      id: [
        'Roller coaster sungguhan hanya ditarik ke bukit pertama; setiap bukit berikutnya harus lebih rendah, dan wahana berakhir dengan rem yang mengubah sisa gerak menjadi panas.',
        'Jam bandul atau ayunan anak menukar tinggi dengan kelajuan pada setiap ayunan, dan hambatan udara perlahan menguras energinya menjadi panas kecuali ditambah lagi.',
        'Bendungan PLTA menyimpan air di tempat tinggi dan membiarkannya jatuh melalui turbin, mengubah energi potensial gravitasi menjadi listrik.',
        'Rem mobil menjadi panas karena mengubah energi kinetik mobil menjadi energi panas; mobil hibrida memulihkan sebagian darinya sebagai listrik.',
      ],
    },
    questions: {
      en: [
        { q: 'The cart (1 kg) is released from 20 m with friction off. How much kinetic energy does it have when it passes a point 5 m high, and roughly how fast is it going?', a: 'Total energy = 1 × 9.8 × 20 = 196 J. At 5 m the potential energy is 49 J, so the kinetic energy is 147 J. From half × 1 × v² = 147, v² = 294 and v ≈ 17 m/s.' },
        { q: 'You drag the middle hill up to 35 m while the start is at 30 m. What does the cart do, and what would you have to change to get it over?', a: 'It climbs the hill, slows, and turns back before the top: at 30 m its kinetic energy would already be zero, so it cannot reach 35 m. Raise the start height above 35 m (or lower the hill) so that the total energy exceeds the potential energy needed at the top.' },
        { q: 'With friction on and the default track, the cart released from 30 m eventually stops in the dip, which is 5 m high. The thermal bar reads about 245 J, not 294 J. Why, and has energy been destroyed?', a: 'The cart started with 294 J. At rest in the dip it has no kinetic energy but still 1 × 9.8 × 5 = 49 J of potential energy, so 294 − 49 = 245 J has become thermal energy. Nothing was destroyed: the three bars still total 294 J, but the thermal part now warms the track and wheels and cannot be collected to lift the cart again.' },
      ],
      id: [
        { q: 'Kereta (1 kg) dilepas dari 20 m dengan gesekan mati. Berapa energi kinetiknya saat melewati titik setinggi 5 m, dan kira-kira berapa kelajuannya?', a: 'Energi total = 1 × 9,8 × 20 = 196 J. Pada 5 m energi potensialnya 49 J, jadi energi kinetiknya 147 J. Dari setengah × 1 × v² = 147, v² = 294 dan v ≈ 17 m/s.' },
        { q: 'Kamu menyeret bukit tengah ke 35 m sementara titik awal di 30 m. Apa yang dilakukan kereta, dan apa yang harus diubah agar ia bisa melewatinya?', a: 'Kereta menaiki bukit, melambat, dan berbalik sebelum puncak: pada 30 m energi kinetiknya sudah nol, sehingga tidak mungkin mencapai 35 m. Naikkan tinggi awal melebihi 35 m (atau rendahkan bukit) agar energi total melebihi energi potensial yang dibutuhkan di puncak.' },
        { q: 'Dengan gesekan menyala dan lintasan bawaan, kereta yang dilepas dari 30 m akhirnya berhenti di lembah yang tingginya 5 m. Batang panas menunjukkan sekitar 245 J, bukan 294 J. Mengapa, dan apakah energi telah musnah?', a: 'Kereta mulai dengan 294 J. Saat diam di lembah ia tidak punya energi kinetik tetapi masih punya 1 × 9,8 × 5 = 49 J energi potensial, sehingga 294 − 49 = 245 J telah menjadi energi panas. Tidak ada yang musnah: ketiga batang masih berjumlah 294 J, tetapi bagian panas kini menghangatkan lintasan dan roda dan tidak bisa dikumpulkan untuk mengangkat kereta lagi.' },
      ],
    },
  },
};
