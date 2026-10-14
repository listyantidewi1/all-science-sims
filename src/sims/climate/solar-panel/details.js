// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See sun-angle math: power ∝ cos(angle of incidence).',
      'Find the optimum tilt — usually close to your latitude.',
      'Compare summer vs winter yield at high vs low latitudes.',
    ],
    id: [
      'Melihat matematika sudut matahari: daya ∝ cos(sudut datang).',
      'Menemukan kemiringan optimum — biasanya dekat lintang Anda.',
      'Membandingkan hasil musim panas vs dingin di lintang tinggi vs rendah.',
    ],
  },
  tryThis: {
    en: [
      'Equator (lat 0) — flat panel is optimum year-round.',
      'High latitude (60°N) — tilt 50–60° is best, summer gives most power.',
      'Cloudy day — losses scale linearly with cloud cover.',
    ],
    id: [
      'Khatulistiwa (lat 0) — panel datar optimum sepanjang tahun.',
      'Lintang tinggi (60°LU) — kemiringan 50–60° terbaik, musim panas paling banyak daya.',
      'Hari berawan — kerugian linear dengan tutupan awan.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Sunlight arriving at the top of the atmosphere carries about 1360 W for every square metre facing the Sun, and roughly 1000 W/m² reaches the ground on a clear day with the Sun high in the sky. A solar panel collects the most energy when the rays strike it head-on. If the rays arrive at an angle of incidence θ from the panel\'s perpendicular, the same beam is spread over a larger area and the panel receives only cos θ of the full amount. At 60° from perpendicular it gets half; at 90° it gets nothing. Nearly everything about panel placement follows from this cosine rule.',
        'Where the Sun is in the sky depends on latitude, date and time. The Earth\'s axis is tilted 23.44°, so the Sun\'s declination swings between +23.44° in June and −23.44° in December; the sim computes it as 23.44° × sin(2π (day − 81) / 365), which puts the equinoxes near day 81 and day 264. The Sun\'s elevation above the horizon then follows the standard formula sin α = sin(lat) sin δ + cos(lat) cos δ cos h, where h is the hour angle, 15° for every hour from solar noon. At noon on an equinox the Sun\'s elevation is simply 90° minus your latitude, which is where the "tilt = latitude" rule of thumb comes from: a panel tilted by the latitude faces the noon equinox Sun squarely.',
        'The sim treats the panel as facing the equator and assumes the Sun is always in the panel\'s vertical plane, so the angle of incidence is given by cos θ = sin(α + β), where β is the tilt. It then multiplies 1000 W/m² by cos θ, by an atmospheric factor exp(−0.18 / sin α) that removes more light when the Sun is low and its rays cross more air, and by (1 − cloud cover). The left chart shows this power through one day, with a flat panel dashed for comparison; the right chart adds the power up over each day of the year to give the daily yield in kWh/m². The sliders set latitude, tilt, day and cloud cover, and the button applies the rule of thumb.',
        'Several simplifications matter. Ignoring the Sun\'s compass direction means the sim lets a tilted panel catch a low morning or evening Sun that in reality would be off to the side or behind it; this overstates output in summer and at high latitudes and pushes the sim\'s best summer tilt steeper than the real-world advice of latitude minus about 15°. Clouds are treated as a simple percentage loss, although an overcast sky still delivers diffuse light. The numbers are the sunlight landing on the panel, not electricity: a real panel converts about 15 to 22% of it, and loses a little more when it gets hot, dusty or partly shaded.',
      ],
      id: [
        'Sinar matahari yang tiba di puncak atmosfer membawa sekitar 1360 W untuk setiap meter persegi yang menghadap Matahari, dan kira-kira 1000 W/m² mencapai permukaan tanah pada hari cerah saat Matahari tinggi. Panel surya mengumpulkan energi paling banyak ketika sinar mengenainya tegak lurus. Jika sinar datang dengan sudut datang θ dari garis tegak lurus panel, berkas yang sama tersebar di luasan lebih besar dan panel hanya menerima cos θ dari jumlah penuhnya. Pada 60° dari garis tegak lurus panel hanya mendapat setengahnya; pada 90° tidak mendapat apa-apa. Hampir semua hal tentang penempatan panel mengikuti aturan kosinus ini.',
        'Posisi Matahari di langit bergantung pada lintang, tanggal, dan jam. Sumbu Bumi miring 23,44°, sehingga deklinasi Matahari berayun antara +23,44° pada Juni dan −23,44° pada Desember; sim menghitungnya sebagai 23,44° × sin(2π (hari − 81) / 365), yang menempatkan ekuinoks di sekitar hari ke-81 dan ke-264. Ketinggian Matahari di atas horizon lalu mengikuti rumus baku sin α = sin(lintang) sin δ + cos(lintang) cos δ cos h, dengan h adalah sudut jam, 15° untuk setiap jam dari tengah hari surya. Pada tengah hari saat ekuinoks, ketinggian Matahari sama dengan 90° dikurangi lintangmu, dan dari sinilah aturan praktis "kemiringan = lintang" berasal: panel yang dimiringkan sebesar lintang menghadap tepat ke Matahari tengah hari ekuinoks.',
        'Sim memperlakukan panel sebagai menghadap khatulistiwa dan menganggap Matahari selalu berada di bidang vertikal panel, sehingga sudut datangnya diberikan oleh cos θ = sin(α + β), dengan β adalah kemiringan. Sim lalu mengalikan 1000 W/m² dengan cos θ, dengan faktor atmosfer exp(−0,18 / sin α) yang mengurangi lebih banyak cahaya saat Matahari rendah dan sinarnya menembus lebih banyak udara, dan dengan (1 − tutupan awan). Grafik kiri menampilkan daya ini sepanjang satu hari, dengan panel datar sebagai pembanding bergaris putus-putus; grafik kanan menjumlahkan daya untuk setiap hari dalam setahun menjadi hasil harian dalam kWh/m². Slider mengatur lintang, kemiringan, hari, dan tutupan awan, dan tombolnya menerapkan aturan praktis tadi.',
        'Beberapa penyederhanaan penting untuk diingat. Mengabaikan arah kompas Matahari berarti sim membiarkan panel miring menangkap Matahari pagi atau sore yang rendah, yang pada kenyataannya berada di samping atau di belakang panel; ini melebih-lebihkan keluaran pada musim panas dan lintang tinggi, dan mendorong kemiringan musim panas terbaik di sim menjadi lebih curam daripada saran dunia nyata, yaitu lintang dikurangi sekitar 15°. Awan diperlakukan sebagai persentase kerugian sederhana, padahal langit mendung masih memberikan cahaya baur. Angka yang ditampilkan adalah sinar matahari yang mendarat di panel, bukan listrik: panel sungguhan mengubah sekitar 15 sampai 22% darinya, dan kehilangan sedikit lagi saat panas, berdebu, atau sebagian terbayangi.',
      ],
    },
    figure: {
      caption: {
        en: 'Panel-angle geometry. The Sun is at elevation α above the horizon and the panel is tilted by β. The angle of incidence θ between the rays and the panel\'s perpendicular is 90° − (α + β), so the panel receives cos θ = sin(α + β) of the beam. When α + β = 90° the rays hit head-on.',
        id: 'Geometri sudut panel. Matahari berada pada ketinggian α di atas horizon dan panel dimiringkan sebesar β. Sudut datang θ antara sinar dan garis tegak lurus panel adalah 90° − (α + β), sehingga panel menerima cos θ = sin(α + β) dari berkas. Saat α + β = 90°, sinar mengenai panel tegak lurus.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Geometry of sun elevation, panel tilt and angle of incidence', 'Geometri ketinggian matahari, kemiringan panel, dan sudut datang')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.r{stroke:#f59e0b;stroke-width:2;fill:none}</style>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
  <line x1="20" y1="200" x2="340" y2="200" stroke="currentColor" stroke-width="1.5"/>
  <text x="300" y="216">${L('ground', 'tanah')}</text>
  <line x1="240" y1="200" x2="120" y2="130.7" stroke="#3b82f6" stroke-width="5"/>
  <text x="112" y="124" fill="#3b82f6">${L('panel, tilt β', 'panel, kemiringan β')}</text>
  <path d="M212 200 A28 28 0 0 1 215.8 186" class="m"/>
  <text x="196" y="190">β</text>
  <line x1="180" y1="165.4" x2="221.7" y2="93.2" stroke="#10b981" stroke-width="1.6" stroke-dasharray="5 3"/>
  <text x="226" y="92" fill="#10b981">${L('perpendicular', 'garis tegak lurus')}</text>
  <circle cx="300" cy="40" r="14" fill="#f59e0b"/>
  <line x1="300" y1="40" x2="186" y2="162.9" class="r" marker-end="url(#ar)"/>
  <line x1="265" y1="30" x2="156" y2="149" class="r" opacity=".5" marker-end="url(#ar)"/>
  <text x="186" y="52" fill="#f59e0b">${L('sunlight', 'sinar matahari')}</text>
  <line x1="180" y1="165.4" x2="340" y2="165.4" class="m" stroke-dasharray="4 4"/>
  <path d="M222 165.4 A42 42 0 0 0 209 135.1" class="m"/>
  <text x="228" y="150">α</text>
  <text x="290" y="180" opacity=".7">${L('horizontal', 'horizontal')}</text>
  <path d="M192 144.6 A24 24 0 0 1 196.6 148.1" class="m" stroke="#10b981"/>
  <text x="196" y="136" fill="#10b981">θ</text>
  <text x="20" y="226">θ = 90° − (α + β)</text>
  <text x="180" y="226">${L('received: cos θ = sin(α + β)', 'diterima: cos θ = sin(α + β)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A panel receives cos θ of the available sunlight, where θ is the angle between the rays and the panel\'s perpendicular.',
        'At solar noon on an equinox the Sun\'s elevation is 90° minus the latitude, so tilt = latitude points a fixed panel straight at it.',
        'Flatter tilts favour summer, when the Sun is high; steeper tilts favour winter, when it is low.',
        'Low Sun angles lose power twice: through the cosine and through the longer path of the rays through the atmosphere.',
        'The sim ignores the Sun\'s compass direction, panel efficiency and diffuse light from clouds, so treat its numbers as relative, not as electrical output.',
      ],
      id: [
        'Panel menerima cos θ dari sinar matahari yang tersedia, dengan θ adalah sudut antara sinar dan garis tegak lurus panel.',
        'Pada tengah hari surya saat ekuinoks, ketinggian Matahari sama dengan 90° dikurangi lintang, sehingga kemiringan = lintang membuat panel tetap menghadap tepat ke arahnya.',
        'Kemiringan yang lebih landai menguntungkan musim panas, saat Matahari tinggi; kemiringan yang lebih curam menguntungkan musim dingin, saat Matahari rendah.',
        'Sudut Matahari yang rendah membuang daya dua kali: lewat kosinus dan lewat jalur sinar yang lebih panjang menembus atmosfer.',
        'Sim mengabaikan arah kompas Matahari, efisiensi panel, dan cahaya baur dari awan, jadi anggap angkanya sebagai perbandingan relatif, bukan keluaran listrik.',
      ],
    },
    vocabulary: {
      en: [
        ['Irradiance', 'Power of sunlight per unit area, in watts per square metre; about 1000 W/m² on a clear day with the Sun overhead.'],
        ['Angle of incidence (θ)', 'The angle between the incoming rays and the line perpendicular to the panel\'s surface.'],
        ['Solar elevation (α)', 'The Sun\'s angle above the horizon; 0° at sunrise and sunset, 90° directly overhead.'],
        ['Declination (δ)', 'The latitude at which the Sun is overhead at noon; it moves between +23.44° and −23.44° through the year.'],
        ['Tilt (β)', 'The angle between the panel and the horizontal ground.'],
        ['Hour angle', 'How far the Sun has moved from solar noon, 15° per hour.'],
        ['Daily yield', 'The energy collected over one day per square metre, found by adding up power through the day; measured in kWh/m².'],
        ['Air mass', 'How much atmosphere the rays pass through compared with the Sun overhead; larger at low Sun angles, so more light is scattered and absorbed.'],
      ],
      id: [
        ['Iradiansi', 'Daya sinar matahari per satuan luas, dalam watt per meter persegi; sekitar 1000 W/m² pada hari cerah saat Matahari tepat di atas.'],
        ['Sudut datang (θ)', 'Sudut antara sinar yang datang dan garis tegak lurus permukaan panel.'],
        ['Ketinggian Matahari (α)', 'Sudut Matahari di atas horizon; 0° saat terbit dan terbenam, 90° saat tepat di atas kepala.'],
        ['Deklinasi (δ)', 'Lintang tempat Matahari berada tepat di atas kepala pada tengah hari; bergeser antara +23,44° dan −23,44° sepanjang tahun.'],
        ['Kemiringan (β)', 'Sudut antara panel dan tanah yang mendatar.'],
        ['Sudut jam', 'Seberapa jauh Matahari telah bergerak dari tengah hari surya, 15° per jam.'],
        ['Hasil harian', 'Energi yang terkumpul dalam satu hari per meter persegi, didapat dengan menjumlahkan daya sepanjang hari; diukur dalam kWh/m².'],
        ['Massa udara', 'Seberapa banyak atmosfer yang ditembus sinar dibandingkan saat Matahari tepat di atas; lebih besar saat Matahari rendah, sehingga lebih banyak cahaya terhambur dan terserap.'],
      ],
    },
    misconceptions: {
      en: [
        ['A panel should always lie flat to face the sky.', 'Flat is best only near the equator. Elsewhere the Sun is never overhead, so a flat panel always receives rays at an angle; tilting it toward the equator by about the latitude catches far more over the year.'],
        ['Steeper is always better in winter, so point the panel straight at the horizon.', 'Winter Sun is low but not at the horizon; at latitude 35° it is still about 32° high at noon in December. A vertical panel wastes the noon hours, and the sim shows yield falling again past roughly 60° of tilt.'],
        ['Solar panels produce nothing on cloudy days.', 'Overcast skies still deliver diffuse light, typically 10 to 25% of a clear day. The sim\'s simple (1 − cloud) factor goes to zero at 100% cloud, which is a simplification.'],
        ['The W/m² shown is the electricity the panel produces.', 'It is the sunlight landing on the panel. A real panel converts only about 15 to 22% of it into electricity, so 1000 W/m² of sunshine gives roughly 150 to 220 W per square metre of panel.'],
      ],
      id: [
        ['Panel sebaiknya selalu dipasang datar agar menghadap langit.', 'Datar hanya paling baik di dekat khatulistiwa. Di tempat lain Matahari tidak pernah tepat di atas kepala, sehingga panel datar selalu menerima sinar secara miring; memiringkannya ke arah khatulistiwa sebesar kira-kira lintang menangkap jauh lebih banyak sepanjang tahun.'],
        ['Semakin curam semakin baik di musim dingin, jadi arahkan panel lurus ke horizon.', 'Matahari musim dingin memang rendah tetapi tidak di horizon; pada lintang 35° ia masih sekitar 32° tingginya pada tengah hari Desember. Panel vertikal menyia-nyiakan jam-jam tengah hari, dan sim menunjukkan hasil kembali turun setelah kemiringan sekitar 60°.'],
        ['Panel surya tidak menghasilkan apa-apa saat berawan.', 'Langit mendung masih memberikan cahaya baur, biasanya 10 sampai 25% dari hari cerah. Faktor sederhana (1 − awan) di sim menjadi nol pada awan 100%, dan itu adalah penyederhanaan.'],
        ['Angka W/m² yang ditampilkan adalah listrik yang dihasilkan panel.', 'Itu adalah sinar matahari yang mendarat di panel. Panel sungguhan hanya mengubah sekitar 15 sampai 22% darinya menjadi listrik, sehingga 1000 W/m² sinar matahari memberi kira-kira 150 sampai 220 W per meter persegi panel.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesia straddles the equator, so rooftop panels there are usually mounted nearly flat, with a small tilt mainly so that rain washes the dust off.',
        'In Germany, at around 50°N, fixed panels are typically tilted 30 to 35° and produce several times more energy in June than in December.',
        'Utility-scale solar farms often use single-axis trackers that turn the panels to follow the Sun through the day, gaining roughly 20 to 30% more energy than fixed mounts.',
        'Spacecraft solar arrays are steered to face the Sun head-on, because in space there is no atmosphere or cloud and the cosine rule is the only thing that matters.',
      ],
      id: [
        'Indonesia terbentang di khatulistiwa, sehingga panel atap di sini biasanya dipasang hampir datar, dengan kemiringan kecil terutama agar hujan membersihkan debunya.',
        'Di Jerman, sekitar 50°LU, panel tetap biasanya dimiringkan 30 sampai 35° dan menghasilkan energi beberapa kali lebih banyak pada Juni daripada Desember.',
        'Ladang surya skala besar sering memakai pelacak satu sumbu yang memutar panel mengikuti Matahari sepanjang hari, meraih sekitar 20 sampai 30% energi lebih banyak daripada dudukan tetap.',
        'Panel surya wahana antariksa diarahkan agar selalu tegak lurus ke Matahari, karena di ruang angkasa tidak ada atmosfer atau awan dan aturan kosinus adalah satu-satunya yang berpengaruh.',
      ],
    },
    questions: {
      en: [
        { q: 'At latitude 35° on an equinox, how high is the Sun at solar noon, and what panel tilt makes the noon rays hit the panel head-on?', a: 'On an equinox the declination is 0°, so the noon elevation is 90° − 35° = 55°. Head-on means α + β = 90°, so β = 35°: the tilt equals the latitude. That is the "tilt = latitude" button.' },
        { q: 'The Sun is 20° above the horizon and the panel is tilted 35°, with no cloud. What power does the sim show?', a: 'cos θ = sin(20° + 35°) = sin 55° ≈ 0.82. The atmospheric factor is exp(−0.18 / sin 20°) = exp(−0.53) ≈ 0.59. So the power is 1000 × 0.82 × 0.59 ≈ 480 W/m². The low Sun loses almost half the light to the atmosphere alone.' },
        { q: 'Why does the daily yield at the equator change so little through the year, while at 60° latitude it is many times larger in June than in December?', a: 'At the equator the noon Sun is never lower than about 66.5° and the days are always about 12 hours long, so the cosine factor and the day length barely change. At 60° the noon Sun ranges from about 53° in June to only 6.5° in December, and the day shrinks from about 19 hours to about 6, so both the cosine factor and the number of sunlit hours collapse in winter.' },
      ],
      id: [
        { q: 'Pada lintang 35° saat ekuinoks, berapa ketinggian Matahari pada tengah hari surya, dan kemiringan panel berapa yang membuat sinar tengah hari mengenai panel tegak lurus?', a: 'Saat ekuinoks deklinasinya 0°, jadi ketinggian tengah hari adalah 90° − 35° = 55°. Tegak lurus berarti α + β = 90°, sehingga β = 35°: kemiringan sama dengan lintang. Itulah tombol "Tilt = latitude".' },
        { q: 'Matahari berada 20° di atas horizon dan panel dimiringkan 35°, tanpa awan. Berapa daya yang ditunjukkan sim?', a: 'cos θ = sin(20° + 35°) = sin 55° ≈ 0,82. Faktor atmosfernya exp(−0,18 / sin 20°) = exp(−0,53) ≈ 0,59. Jadi dayanya 1000 × 0,82 × 0,59 ≈ 480 W/m². Matahari yang rendah kehilangan hampir separuh cahayanya karena atmosfer saja.' },
        { q: 'Mengapa hasil harian di khatulistiwa hampir tidak berubah sepanjang tahun, sedangkan pada lintang 60° hasilnya berkali-kali lebih besar pada Juni daripada Desember?', a: 'Di khatulistiwa Matahari tengah hari tidak pernah lebih rendah dari sekitar 66,5° dan siang selalu sekitar 12 jam, sehingga faktor kosinus dan panjang hari hampir tidak berubah. Pada 60° Matahari tengah hari berkisar dari sekitar 53° pada Juni sampai hanya 6,5° pada Desember, dan siang menyusut dari sekitar 19 jam menjadi sekitar 6 jam, sehingga faktor kosinus maupun jumlah jam bersinar sama-sama runtuh di musim dingin.' },
      ],
    },
  },
};
