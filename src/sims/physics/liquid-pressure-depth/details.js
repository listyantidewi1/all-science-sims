// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe how the pressure in a liquid at rest increases with depth, and explain why using the weight of the liquid above.',
      'Calculate hydrostatic pressure with P = ρgh and convert between pascals and kilopascals.',
      'Predict how changing the liquid density or the depth changes the pressure, and relate the result to water jets and to diving.',
    ],
    id: [
      'Menjelaskan bagaimana tekanan dalam zat cair diam bertambah dengan kedalaman, dan mengapa demikian berdasarkan berat zat cair di atasnya.',
      'Menghitung tekanan hidrostatis dengan P = ρgh dan mengubah satuan antara pascal dan kilopascal.',
      'Memprediksi bagaimana perubahan massa jenis zat cair atau kedalaman mengubah tekanan, dan mengaitkannya dengan pancaran air dan penyelaman.',
    ],
  },
  tryThis: {
    en: [
      'Fill the bottle to the top and compare the three jets. Which hole has the longest range, and why?',
      'Drag the probe to 0.50 m below the surface and read P. Then drag it to 1.00 m. Did the pressure double?',
      'Switch from water to oil without moving the probe. What changed, and what did not? Look at the jets too.',
      'Open the diver scene and sink the diver to 10 m, 20 m and 30 m. How much does the gauge pressure rise for every 10 m?',
    ],
    id: [
      'Isi botol sampai penuh dan bandingkan ketiga pancaran. Lubang mana yang jangkauannya paling jauh, dan mengapa?',
      'Geser sensor ke 0,50 m di bawah permukaan dan baca P. Lalu geser ke 1,00 m. Apakah tekanannya menjadi dua kali lipat?',
      'Ganti air menjadi minyak tanpa memindahkan sensor. Apa yang berubah, dan apa yang tidak? Perhatikan juga pancarannya.',
      'Buka adegan penyelam dan turunkan penyelam ke 10 m, 20 m dan 30 m. Berapa kenaikan tekanan hidrostatis untuk setiap 10 m?',
    ],
  },

  learn: {
    background: {
      en: [
        'Every part of a liquid has to hold up the liquid above it. Deeper down there is more liquid overhead, so the pressure is greater. For a liquid at rest the rule is simple: the extra pressure at depth h is P = ρgh, where ρ (rho) is the density of the liquid in kg/m³, g ≈ 9.8 m/s² and h is the depth below the surface in metres. In water (ρ = 1000 kg/m³) every metre of depth adds 9800 Pa, about 9.8 kPa. This is called hydrostatic or gauge pressure, because it is the pressure above the air pressure that already pushes on the surface.',
        'The pressure acts in every direction, not just downward, so it pushes sideways on the walls of a container. Make a hole and the liquid squirts out. A hole lower down has more pressure behind it, so the liquid leaves faster: the speed is v = √(2gh), the same speed an object would reach falling freely through height h. Surprisingly, the speed does not depend on the density: oil and water leave a hole at the same speed, because the heavier liquid pushes harder but is also harder to accelerate. The pressure behind the hole, however, does depend on density.',
        'In the sim a 1 m bottle has three holes. Each jet is a projectile launched horizontally, and its range on the ground is 2√(h·y), where h is the depth of the hole below the surface and y its height above the ground. The middle hole often wins, because the lowest hole has the fastest jet but the least height to fall. Drag the probe anywhere in the liquid and read ρgh; drag it to the bottom and the readout equals the pressure that the whole column of liquid produces.',
        'The diver scene scales the same formula up to the sea. Sea water has ρ ≈ 1030 kg/m³, so every 10 m of depth adds about 101 kPa, almost exactly one atmosphere. A diver at 30 m feels 4 atmospheres in total: 1 from the air above the sea plus 3 from the water. This is why divers equalise their ears, why submarines need thick hulls, and why dam walls are built much thicker at the bottom than at the top.',
      ],
      id: [
        'Setiap bagian zat cair harus menahan zat cair di atasnya. Semakin dalam, semakin banyak zat cair di atas, sehingga tekanannya semakin besar. Untuk zat cair diam aturannya sederhana: tekanan tambahan pada kedalaman h adalah P = ρgh, dengan ρ (rho) massa jenis zat cair dalam kg/m³, g ≈ 9,8 m/s² dan h kedalaman di bawah permukaan dalam meter. Dalam air (ρ = 1000 kg/m³) setiap meter kedalaman menambah 9800 Pa, sekitar 9,8 kPa. Ini disebut tekanan hidrostatis, yaitu tekanan di atas tekanan udara yang sudah menekan permukaan.',
        'Tekanan bekerja ke segala arah, tidak hanya ke bawah, sehingga menekan ke samping pada dinding wadah. Buat lubang, maka zat cair memancar keluar. Lubang yang lebih rendah mempunyai tekanan lebih besar di belakangnya, sehingga zat cair keluar lebih cepat: lajunya v = √(2gh), sama dengan laju benda yang jatuh bebas setinggi h. Menariknya, laju ini tidak bergantung pada massa jenis: minyak dan air keluar dari lubang dengan laju yang sama, karena zat cair yang lebih berat mendorong lebih kuat tetapi juga lebih sulit dipercepat. Namun tekanan di belakang lubang memang bergantung pada massa jenis.',
        'Di simulasi, botol setinggi 1 m mempunyai tiga lubang. Tiap pancaran adalah proyektil yang diluncurkan mendatar, dan jangkauannya di tanah adalah 2√(h·y), dengan h kedalaman lubang di bawah permukaan dan y tingginya di atas tanah. Lubang tengah sering menang, karena lubang terbawah memiliki pancaran tercepat tetapi tinggi jatuhnya paling kecil. Geser sensor ke mana saja di dalam zat cair dan baca ρgh; geser ke dasar dan angkanya sama dengan tekanan yang dihasilkan seluruh kolom zat cair.',
        'Adegan penyelam memperbesar rumus yang sama ke skala laut. Air laut memiliki ρ ≈ 1030 kg/m³, sehingga setiap 10 m kedalaman menambah sekitar 101 kPa, hampir tepat satu atmosfer. Penyelam di kedalaman 30 m merasakan total 4 atmosfer: 1 dari udara di atas laut dan 3 dari air. Itulah sebabnya penyelam menyamakan tekanan telinganya, kapal selam memerlukan lambung tebal, dan dinding bendungan dibangun jauh lebih tebal di dasar daripada di puncak.',
      ],
    },
    figure: {
      caption: {
        en: 'A bottle with three holes. Pressure P = ρgh grows with depth below the surface (arrows), so lower holes squirt faster. Each jet is a horizontal projectile; its range on the ground is 2√(h·y).',
        id: 'Botol dengan tiga lubang. Tekanan P = ρgh bertambah dengan kedalaman di bawah permukaan (panah), sehingga lubang yang lebih rendah memancar lebih cepat. Tiap pancaran adalah proyektil mendatar; jangkauannya di tanah 2√(h·y).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // Bottle: x 40..110, surface y=40, ground y=200 (160 px = 1 m). Holes at heights 0.75, 0.5, 0.25 m.
        const g = 200, s = 40, m = 160;
        const jet = (yh) => { // yh: height above ground (m)
          const h = 1 - yh, y0 = g - yh * m; const pts = [];
          for (let i = 0; i <= 12; i++) { const f = i / 12; const x = 2 * Math.sqrt(Math.max(0, h * yh)) * f; const y = yh - (x * x) / (4 * Math.max(1e-6, h)); pts.push(`${(110 + x * m).toFixed(1)} ${(g - Math.max(0, y) * m).toFixed(1)}`); }
          const range = 2 * Math.sqrt(Math.max(0, h * yh));
          return { path: `M${pts.join(' L')}`, y0, range: range.toFixed(2), rx: (110 + range * m).toFixed(1) };
        };
        const a = jet(0.75), b = jet(0.5), c = jet(0.25);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Bottle with three holes and their water jets', 'Botol dengan tiga lubang dan pancaran airnya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{text-anchor:middle}.b{font:bold 12px system-ui,sans-serif}</style>
  <defs><marker id="ar" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#ef4444"/></marker></defs>
  <rect x="40" y="${s}" width="70" height="${g - s}" fill="#3b82f6" opacity=".5"/>
  <path d="M40 30 L40 ${g} L110 ${g} L110 30" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="20" y1="${g}" x2="340" y2="${g}" stroke="currentColor" stroke-width="1.5"/>
  <path d="${a.path}" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
  <path d="${b.path}" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
  <path d="${c.path}" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
  <line x1="60" y1="${a.y0}" x2="${60 + 10}" y2="${a.y0}" stroke="#ef4444" stroke-width="2" marker-end="url(#ar)"/>
  <line x1="60" y1="${b.y0}" x2="${60 + 24}" y2="${b.y0}" stroke="#ef4444" stroke-width="2" marker-end="url(#ar)"/>
  <line x1="60" y1="${c.y0}" x2="${60 + 38}" y2="${c.y0}" stroke="#ef4444" stroke-width="2" marker-end="url(#ar)"/>
  <text x="${a.rx}" y="${g + 14}" class="c">${a.range} m</text>
  <text x="${b.rx}" y="${g + 26}" class="c">${b.range} m</text>
  <text x="${c.rx}" y="${g + 38}" class="c">${c.range} m</text>
  <line x1="24" y1="${s}" x2="24" y2="${g}" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="14" y="${(s + g) / 2}" transform="rotate(-90 14 ${(s + g) / 2})" class="c">1 m</text>
  <text x="75" y="${s - 6}" class="c">${L('surface', 'permukaan')}</text>
  <text x="250" y="60" class="c b">P = ρ g h</text>
  <text x="250" y="78" class="c">${L('water: +9.8 kPa per metre', 'air: +9,8 kPa per meter')}</text>
  <text x="250" y="96" class="c">v = √(2gh)</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Pressure in a liquid at rest increases with depth: P = ρgh (gauge pressure, above atmospheric).',
        'In water each metre of depth adds about 9.8 kPa; in sea water each 10 m adds about 1 atmosphere (101 kPa).',
        'A denser liquid gives more pressure at the same depth; oil (800 kg/m³) gives 20 % less than water.',
        'Liquid pressure acts in all directions, so a deeper hole squirts faster: v = √(2gh), independent of density.',
        'The shape or width of the container does not matter, only the vertical depth below the surface.',
      ],
      id: [
        'Tekanan dalam zat cair diam bertambah dengan kedalaman: P = ρgh (tekanan hidrostatis, di atas tekanan udara).',
        'Dalam air setiap meter kedalaman menambah sekitar 9,8 kPa; dalam air laut setiap 10 m menambah sekitar 1 atmosfer (101 kPa).',
        'Zat cair yang lebih rapat memberi tekanan lebih besar pada kedalaman yang sama; minyak (800 kg/m³) memberi 20 % lebih kecil daripada air.',
        'Tekanan zat cair bekerja ke segala arah, sehingga lubang yang lebih dalam memancar lebih cepat: v = √(2gh), tidak bergantung pada massa jenis.',
        'Bentuk atau lebar wadah tidak berpengaruh, hanya kedalaman vertikal di bawah permukaan.',
      ],
    },
    vocabulary: {
      en: [
        ['Hydrostatic pressure', 'The pressure produced by the weight of a liquid at rest, P = ρgh, measured above atmospheric pressure.'],
        ['Density (ρ)', 'Mass per unit volume, in kg/m³. Water 1000, cooking oil about 800, sea water about 1030.'],
        ['Depth (h)', 'The vertical distance below the free surface of the liquid, in metres.'],
        ['Gauge pressure', 'Pressure measured relative to the surrounding air pressure; a gauge reads zero at the surface.'],
        ['Absolute pressure', 'Gauge pressure plus atmospheric pressure (about 101 kPa at sea level).'],
        ['Atmosphere (atm)', 'A unit of pressure equal to normal air pressure at sea level, 101.3 kPa.'],
      ],
      id: [
        ['Tekanan hidrostatis', 'Tekanan yang dihasilkan berat zat cair diam, P = ρgh, diukur di atas tekanan udara.'],
        ['Massa jenis (ρ)', 'Massa per satuan volume, dalam kg/m³. Air 1000, minyak goreng sekitar 800, air laut sekitar 1030.'],
        ['Kedalaman (h)', 'Jarak vertikal di bawah permukaan bebas zat cair, dalam meter.'],
        ['Tekanan terukur (gauge)', 'Tekanan relatif terhadap tekanan udara sekitar; alat ukur menunjukkan nol di permukaan.'],
        ['Tekanan mutlak', 'Tekanan terukur ditambah tekanan atmosfer (sekitar 101 kPa di permukaan laut).'],
        ['Atmosfer (atm)', 'Satuan tekanan yang sama dengan tekanan udara normal di permukaan laut, 101,3 kPa.'],
      ],
    },
    misconceptions: {
      en: [
        ['Pressure depends on how much liquid there is in total.', 'It depends only on the depth below the surface and the density. A narrow 1 m tube and a wide 1 m tank give exactly the same pressure at the bottom.'],
        ['Liquid pressure only pushes downward.', 'It pushes equally in every direction at a given depth, which is why the jets shoot out sideways and why your ears hurt from all sides when you dive.'],
        ['The lowest hole always squirts the farthest.', 'It has the fastest jet, but the least height to fall, so its range can be shorter. With a full 1 m bottle, the hole halfway up has the longest range.'],
        ['A denser liquid squirts out of a hole faster.', 'The jet speed √(2gh) does not depend on density. The denser liquid has more pressure behind it but also more mass to accelerate.'],
      ],
      id: [
        ['Tekanan bergantung pada jumlah total zat cair.', 'Tekanan hanya bergantung pada kedalaman di bawah permukaan dan massa jenis. Pipa sempit 1 m dan tangki lebar 1 m memberi tekanan yang sama persis di dasarnya.'],
        ['Tekanan zat cair hanya mendorong ke bawah.', 'Tekanan mendorong sama besar ke segala arah pada kedalaman tertentu, itulah sebabnya pancaran keluar ke samping dan telinga terasa sakit dari segala arah saat menyelam.'],
        ['Lubang terbawah selalu memancar paling jauh.', 'Pancarannya memang tercepat, tetapi tinggi jatuhnya paling kecil, sehingga jangkauannya bisa lebih pendek. Pada botol penuh 1 m, lubang di tengah memiliki jangkauan terjauh.'],
        ['Zat cair yang lebih rapat memancar lebih cepat dari lubang.', 'Laju pancaran √(2gh) tidak bergantung pada massa jenis. Zat cair yang lebih rapat memiliki tekanan lebih besar di belakangnya, tetapi juga massa lebih besar untuk dipercepat.'],
      ],
    },
    realWorld: {
      en: [
        'Dam walls are much thicker at the base, where the water pressure is greatest.',
        'Scuba divers must ascend slowly: at 30 m the pressure is 4 atm and gases dissolved in the blood expand as it falls.',
        'Water towers are built tall so the depth of water above the taps gives enough pressure for the whole town.',
        'Submarines and deep-sea vehicles need very thick hulls; at 1000 m the pressure is about 100 atmospheres.',
        'A doctor measures blood pressure in millimetres of mercury, a unit based on the height of a liquid column.',
      ],
      id: [
        'Dinding bendungan jauh lebih tebal di dasarnya, tempat tekanan air paling besar.',
        'Penyelam scuba harus naik perlahan: pada 30 m tekanannya 4 atm dan gas yang terlarut dalam darah memuai saat tekanan turun.',
        'Menara air dibangun tinggi agar kedalaman air di atas keran memberi tekanan yang cukup untuk seluruh kota.',
        'Kapal selam dan kendaraan laut dalam memerlukan lambung yang sangat tebal; pada 1000 m tekanannya sekitar 100 atmosfer.',
        'Dokter mengukur tekanan darah dalam milimeter raksa, satuan yang didasarkan pada tinggi kolom zat cair.',
      ],
    },
    questions: {
      en: [
        { q: 'What is the gauge pressure 0.80 m below the surface of water (ρ = 1000 kg/m³, g = 9.8 m/s²)?', a: 'P = ρgh = 1000 × 9.8 × 0.80 = 7840 Pa ≈ 7.8 kPa.' },
        { q: 'The same probe is moved to 0.80 m deep in oil of density 800 kg/m³. What does it read now?', a: 'P = 800 × 9.8 × 0.80 = 6272 Pa ≈ 6.3 kPa, 20 % less than in water because the oil is 20 % less dense.' },
        { q: 'A diver is 25 m deep in sea water (ρ = 1030 kg/m³). Find the gauge pressure and the absolute pressure, taking air pressure as 101 kPa.', a: 'Gauge: 1030 × 9.8 × 25 = 252 350 Pa ≈ 252 kPa. Absolute: 252 + 101 ≈ 353 kPa, about 3.5 atmospheres.' },
      ],
      id: [
        { q: 'Berapa tekanan hidrostatis 0,80 m di bawah permukaan air (ρ = 1000 kg/m³, g = 9,8 m/s²)?', a: 'P = ρgh = 1000 × 9,8 × 0,80 = 7840 Pa ≈ 7,8 kPa.' },
        { q: 'Sensor yang sama dipindahkan ke kedalaman 0,80 m dalam minyak bermassa jenis 800 kg/m³. Berapa yang terbaca sekarang?', a: 'P = 800 × 9,8 × 0,80 = 6272 Pa ≈ 6,3 kPa, 20 % lebih kecil daripada di air karena minyak 20 % lebih renggang.' },
        { q: 'Seorang penyelam berada 25 m di dalam air laut (ρ = 1030 kg/m³). Hitung tekanan hidrostatis dan tekanan mutlaknya, dengan tekanan udara 101 kPa.', a: 'Hidrostatis: 1030 × 9,8 × 25 = 252 350 Pa ≈ 252 kPa. Mutlak: 252 + 101 ≈ 353 kPa, sekitar 3,5 atmosfer.' },
      ],
    },
  },
};
