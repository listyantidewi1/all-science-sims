// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read sin θ and cos θ off the unit circle directly.',
      'Connect the four quadrants to sign of sin/cos.',
      'See where tan θ blows up (asymptotes).',
    ],
    id: [
      'Membaca sin θ dan cos θ langsung dari lingkaran satuan.',
      'Mengaitkan empat kuadran dengan tanda sin/cos.',
      'Melihat di mana tan θ meledak (asimtot).',
    ],
  },  tryThis: {
    en: [
      'Set θ to 90° — what are sin, cos, tan?',
      'Find the angle where sin θ = cos θ.',
      'Drag past 360° — does the function curve repeat?',
    ],
    id: [
      'Atur θ ke 90° — berapa sin, cos, tan?',
      'Cari sudut di mana sin θ = cos θ.',
      'Geser melewati 360° — apakah kurva fungsinya berulang?',
    ],
  },
  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In a right triangle, sine and cosine are ratios of sides, but that definition only covers angles between 0° and 90°. The unit circle extends them to every angle. Draw a circle of radius 1 centred at the origin and start at the point (1, 0). Turn counterclockwise through an angle θ and look at where you end up: the x-coordinate of that point is cos θ and the y-coordinate is sin θ. For angles below 90° this agrees with the triangle definition, because the radius is the hypotenuse of length 1, the horizontal leg is the adjacent side and the vertical leg is the opposite side.',
        'In the simulation the red point sits on the circle at the angle set by the slider or by dragging. The blue horizontal segment from the centre is cos θ and the green vertical segment down to the axis is sin θ; both are read off as numbers in the corner, together with tan θ = sin θ / cos θ. The right-hand panel plots sin (green) and cos (blue) against the angle from 0 to 4π, with a dot marking the current angle, so you can see how turning around the circle sweeps out the two wave shapes. The preset buttons jump to the standard angles 0°, 30°, 45°, 60°, 90°, 180° and 270°, whose values are worth remembering: at 30° the point is (√3/2, 1/2), at 45° it is (√2/2, √2/2), and at 60° it is (1/2, √3/2).',
        'The circle makes the signs obvious. In the first quadrant (0° to 90°) both coordinates are positive. In the second (90° to 180°) the point is left of the axis, so cos is negative while sin stays positive; in the third both are negative, and in the fourth cos is positive and sin negative. Because every point on the circle is 1 unit from the centre, Pythagoras gives sin²θ + cos²θ = 1 for every angle. The tangent is the slope of the radius, and geometrically it is the length of the vertical tangent segment at (1, 0) cut off by the extended radius; it grows without bound as θ approaches 90°, where cos θ = 0 and the readout shows ±∞.',
        'Going past 360° returns the point to where it started, so the simulation\'s slider runs to 720° to show the second lap producing identical values: sine and cosine are periodic with period 360° (2π radians). The readout quotes θ in both degrees and multiples of π, and the plotted waves use radians. The pink segment on the vertical line x = 1, cut off by the dashed extension of the radius, is the tangent segment, and its length is tan θ; it stretches off the screen as θ nears 90° or 270°. The readout always reduces the angle to one turn, 0° to 360° (0 to 2π), so dragging the point just below the axis reads 330° rather than −30°.',
      ],
      id: [
        'Pada segitiga siku-siku, sinus dan kosinus adalah perbandingan sisi, tetapi definisi itu hanya mencakup sudut antara 0° dan 90°. Lingkaran satuan memperluasnya ke setiap sudut. Gambar lingkaran berjari-jari 1 yang berpusat di titik asal dan mulai dari titik (1, 0). Berputar berlawanan arah jarum jam sebesar sudut θ dan lihat titik akhirnya: koordinat x titik itu adalah cos θ dan koordinat y-nya adalah sin θ. Untuk sudut di bawah 90° ini sesuai dengan definisi segitiga, karena jari-jari adalah sisi miring sepanjang 1, kaki mendatar adalah sisi samping, dan kaki tegak adalah sisi depan.',
        'Dalam simulasi, titik merah berada di lingkaran pada sudut yang diatur slider atau dengan menyeret. Ruas biru mendatar dari pusat adalah cos θ dan ruas hijau tegak turun ke sumbu adalah sin θ; keduanya dibaca sebagai angka di sudut layar, bersama tan θ = sin θ / cos θ. Panel kanan menggambar sin (hijau) dan cos (biru) terhadap sudut dari 0 sampai 4π, dengan titik yang menandai sudut saat ini, sehingga kamu bisa melihat bagaimana berputar mengitari lingkaran menyapu kedua bentuk gelombang. Tombol preset melompat ke sudut-sudut baku 0°, 30°, 45°, 60°, 90°, 180°, dan 270°, yang nilainya layak diingat: pada 30° titiknya (√3/2, 1/2), pada 45° (√2/2, √2/2), dan pada 60° (1/2, √3/2).',
        'Lingkaran membuat tanda nilainya jelas. Di kuadran pertama (0° sampai 90°) kedua koordinat positif. Di kuadran kedua (90° sampai 180°) titiknya di kiri sumbu, jadi cos negatif sementara sin tetap positif; di kuadran ketiga keduanya negatif, dan di kuadran keempat cos positif dan sin negatif. Karena setiap titik pada lingkaran berjarak 1 satuan dari pusat, Pythagoras memberi sin²θ + cos²θ = 1 untuk setiap sudut. Tangen adalah kemiringan jari-jari, dan secara geometris ia adalah panjang ruas garis singgung tegak di (1, 0) yang dipotong oleh perpanjangan jari-jari; nilainya membesar tanpa batas saat θ mendekati 90°, tempat cos θ = 0 dan tampilan menunjukkan ±∞.',
        'Melewati 360° mengembalikan titik ke tempat semula, jadi slider simulasi berjalan sampai 720° untuk menunjukkan putaran kedua menghasilkan nilai yang persis sama: sinus dan kosinus periodik dengan periode 360° (2π radian). Tampilan menulis θ dalam derajat sekaligus kelipatan π, dan gelombang yang digambar memakai radian. Ruas merah muda pada garis tegak x = 1, yang dipotong oleh perpanjangan putus-putus jari-jari, adalah ruas tangen, dan panjangnya adalah tan θ; ruas itu memanjang keluar layar saat θ mendekati 90° atau 270°. Tampilan selalu mereduksi sudut ke satu putaran, 0° sampai 360° (0 sampai 2π), sehingga menyeret titik tepat di bawah sumbu terbaca 330°, bukan −30°.',
      ],
    },
    figure: {
      caption: {
        en: 'On a circle of radius 1, the point at angle θ = 40° has coordinates (cos θ, sin θ) ≈ (0.77, 0.64). Extending the radius to the vertical tangent line at (1, 0) cuts off a segment of length tan θ ≈ 0.84. By Pythagoras, cos²θ + sin²θ = 1.',
        id: 'Pada lingkaran berjari-jari 1, titik pada sudut θ = 40° berkoordinat (cos θ, sin θ) ≈ (0,77, 0,64). Memperpanjang jari-jari ke garis singgung tegak di (1, 0) memotong ruas sepanjang tan θ ≈ 0,84. Menurut Pythagoras, cos²θ + sin²θ = 1.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Sine, cosine and tangent on the unit circle', 'Sinus, kosinus, dan tangen pada lingkaran satuan')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px;opacity:.7}</style>
  <line x1="20" y1="125" x2="240" y2="125" class="m"/>
  <line x1="130" y1="15" x2="130" y2="235" class="m"/>
  <circle cx="130" cy="125" r="85" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".7"/>
  <text x="206" y="138" class="s">(1, 0)</text>
  <text x="112" y="34" class="s">(0, 1)</text>
  <line x1="215" y1="30" x2="215" y2="220" class="m" stroke-dasharray="4 4"/>
  <line x1="130" y1="125" x2="215" y2="53.7" class="m" stroke-dasharray="3 3"/>
  <line x1="130" y1="125" x2="195.1" y2="125" stroke="#3b82f6" stroke-width="3.5"/>
  <text x="140" y="140" fill="#3b82f6">cos θ ≈ 0.77</text>
  <line x1="195.1" y1="125" x2="195.1" y2="70.4" stroke="#10b981" stroke-width="3.5"/>
  <text x="152" y="86" fill="#10b981">sin θ ≈ 0.64</text>
  <line x1="215" y1="125" x2="215" y2="53.7" stroke="#ef4444" stroke-width="3.5"/>
  <text x="221" y="92" fill="#ef4444">tan θ ≈ 0.84</text>
  <line x1="130" y1="125" x2="195.1" y2="70.4" stroke="#f59e0b" stroke-width="2"/>
  <text x="150" y="104" fill="#f59e0b">1</text>
  <path d="M152 125 A22 22 0 0 0 146.9 110.9" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="156" y="118" fill="#f59e0b" class="s">θ = 40°</text>
  <circle cx="195.1" cy="70.4" r="5" fill="#ef4444"/>
  <text x="200" y="66" class="s">(cos θ, sin θ)</text>
  <text x="248" y="150">${L('radius 1 is the', 'jari-jari 1 adalah')}</text>
  <text x="248" y="164">${L('hypotenuse, so', 'sisi miring, jadi')}</text>
  <text x="248" y="182" fill="#8b5cf6">cos²θ + sin²θ = 1</text>
  <text x="248" y="206" class="s">tan θ = sin θ / cos θ</text>
  <text x="248" y="220" class="s">${L('= slope of the radius', '= kemiringan jari-jari')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The point on the unit circle at angle θ has coordinates (cos θ, sin θ); this defines both functions for every angle.',
        'Because the radius is 1, Pythagoras gives sin²θ + cos²θ = 1 for all θ.',
        'The signs of sin and cos follow the quadrant: cos is the x-coordinate, sin is the y-coordinate.',
        'tan θ = sin θ / cos θ is the slope of the radius; it is undefined at 90° and 270°, where cos θ = 0.',
        'One full turn of 360° (2π radians) brings every value back, so sine and cosine are periodic.',
      ],
      id: [
        'Titik pada lingkaran satuan di sudut θ berkoordinat (cos θ, sin θ); inilah definisi kedua fungsi untuk setiap sudut.',
        'Karena jari-jarinya 1, Pythagoras memberi sin²θ + cos²θ = 1 untuk semua θ.',
        'Tanda sin dan cos mengikuti kuadrannya: cos adalah koordinat x, sin adalah koordinat y.',
        'tan θ = sin θ / cos θ adalah kemiringan jari-jari; tidak terdefinisi di 90° dan 270°, tempat cos θ = 0.',
        'Satu putaran penuh 360° (2π radian) mengembalikan semua nilai, sehingga sinus dan kosinus periodik.',
      ],
    },
    vocabulary: {
      en: [
        ['Unit circle', 'A circle of radius 1 centred at the origin, used to define trig functions for all angles.'],
        ['Radian', 'The angle for which the arc length equals the radius; a full turn is 2π radians, so 180° = π radians.'],
        ['Sine (sin θ)', 'The y-coordinate of the point on the unit circle at angle θ.'],
        ['Cosine (cos θ)', 'The x-coordinate of the point on the unit circle at angle θ.'],
        ['Tangent (tan θ)', 'sin θ divided by cos θ; the slope of the radius to the point at angle θ.'],
        ['Quadrant', 'One of the four regions of the plane cut out by the axes, numbered counterclockwise from the top right.'],
        ['Period', 'The angle after which a function repeats: 360° for sine and cosine, 180° for tangent.'],
        ['Asymptote', 'A line a graph approaches without reaching; tan θ has vertical asymptotes at 90°, 270° and so on.'],
      ],
      id: [
        ['Lingkaran satuan', 'Lingkaran berjari-jari 1 yang berpusat di titik asal, dipakai untuk mendefinisikan fungsi trigonometri bagi semua sudut.'],
        ['Radian', 'Sudut yang panjang busurnya sama dengan jari-jari; satu putaran penuh 2π radian, jadi 180° = π radian.'],
        ['Sinus (sin θ)', 'Koordinat y titik pada lingkaran satuan di sudut θ.'],
        ['Kosinus (cos θ)', 'Koordinat x titik pada lingkaran satuan di sudut θ.'],
        ['Tangen (tan θ)', 'sin θ dibagi cos θ; kemiringan jari-jari ke titik di sudut θ.'],
        ['Kuadran', 'Salah satu dari empat daerah bidang yang dipotong oleh sumbu, dinomori berlawanan arah jarum jam dari kanan atas.'],
        ['Periode', 'Sudut setelah mana fungsi berulang: 360° untuk sinus dan kosinus, 180° untuk tangen.'],
        ['Asimtot', 'Garis yang didekati grafik tanpa pernah dicapai; tan θ punya asimtot tegak di 90°, 270°, dan seterusnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Sine and cosine only make sense for angles in a triangle, below 90°.', 'The unit circle defines them for every angle, including 180°, 270° and negative angles. At 180° the point is (−1, 0), so cos = −1 and sin = 0.'],
        ['sin θ can be bigger than 1 for a big enough angle.', 'The point never leaves the circle of radius 1, so its coordinates stay between −1 and 1. Only tan θ can grow without bound.'],
        ['tan 90° equals zero or some very large number.', 'It is undefined: cos 90° = 0 and division by zero has no value. Just below 90° tan is hugely positive, just above it is hugely negative, which the ±∞ readout hints at.'],
        ['A radian is just a different name for a degree.', 'A radian is much bigger: 1 radian is about 57.3°, and a full turn is 2π ≈ 6.28 radians rather than 360.'],
      ],
      id: [
        ['Sinus dan kosinus hanya bermakna untuk sudut dalam segitiga, di bawah 90°.', 'Lingkaran satuan mendefinisikannya untuk setiap sudut, termasuk 180°, 270°, dan sudut negatif. Pada 180° titiknya (−1, 0), jadi cos = −1 dan sin = 0.'],
        ['sin θ bisa lebih besar dari 1 untuk sudut yang cukup besar.', 'Titiknya tidak pernah keluar dari lingkaran berjari-jari 1, jadi koordinatnya tetap antara −1 dan 1. Hanya tan θ yang bisa membesar tanpa batas.'],
        ['tan 90° sama dengan nol atau suatu bilangan yang sangat besar.', 'Nilainya tidak terdefinisi: cos 90° = 0 dan pembagian dengan nol tidak punya nilai. Tepat di bawah 90° tan sangat positif, tepat di atasnya sangat negatif, dan tampilan ±∞ mengisyaratkan itu.'],
        ['Radian hanyalah nama lain untuk derajat.', 'Radian jauh lebih besar: 1 radian sekitar 57,3°, dan satu putaran penuh 2π ≈ 6,28 radian, bukan 360.'],
      ],
    },
    realWorld: {
      en: [
        'The height of a seat on a Ferris wheel over time is a sine wave: the wheel is the unit circle scaled up, and the angle grows steadily with time.',
        'Alternating current in household wiring follows a sine curve, completing 50 or 60 full circles every second.',
        'Surveyors and navigators convert a distance and a bearing into east-west and north-south components with cosine and sine.',
        'Computer games and animation place objects moving in circles with x = r·cos θ and y = r·sin θ, updating θ every frame.',
      ],
      id: [
        'Ketinggian kursi kincir ria terhadap waktu adalah gelombang sinus: kincir itu lingkaran satuan yang diperbesar, dan sudutnya bertambah teratur seiring waktu.',
        'Arus bolak-balik pada listrik rumah mengikuti kurva sinus, menyelesaikan 50 atau 60 putaran penuh setiap sekon.',
        'Juru ukur dan navigator mengubah jarak dan arah kompas menjadi komponen timur-barat dan utara-selatan dengan kosinus dan sinus.',
        'Gim komputer dan animasi menempatkan objek yang bergerak melingkar dengan x = r·cos θ dan y = r·sin θ, memperbarui θ setiap frame.',
      ],
    },
    questions: {
      en: [
        { q: 'Set θ = 90° with the preset. What are sin, cos and tan, and why?', a: 'The point is at the top of the circle, (0, 1). So cos 90° = 0 and sin 90° = 1. tan = sin/cos would divide by zero, so it is undefined; the readout shows ±∞.' },
        { q: 'At what angles between 0° and 360° does sin θ = cos θ, and what is the common value?', a: 'The x- and y-coordinates are equal on the line y = x, which meets the circle at 45° and 225°. At 45° both equal √2/2 ≈ 0.707; at 225° both equal −√2/2 ≈ −0.707. In both cases tan θ = 1.' },
        { q: 'The readout shows cos θ = −0.6 and the point is in the third quadrant. Find sin θ and tan θ.', a: 'From sin²θ + cos²θ = 1, sin²θ = 1 − 0.36 = 0.64, so sin θ = ±0.8. In the third quadrant sine is negative, so sin θ = −0.8. Then tan θ = (−0.8)/(−0.6) ≈ 1.33, positive, as it always is in the third quadrant.' },
      ],
      id: [
        { q: 'Atur θ = 90° dengan preset. Berapa sin, cos, dan tan, dan mengapa?', a: 'Titiknya di puncak lingkaran, (0, 1). Jadi cos 90° = 0 dan sin 90° = 1. tan = sin/cos akan membagi dengan nol, jadi tidak terdefinisi; tampilan menunjukkan ±∞.' },
        { q: 'Pada sudut berapa antara 0° dan 360° berlaku sin θ = cos θ, dan berapa nilainya?', a: 'Koordinat x dan y sama pada garis y = x, yang memotong lingkaran di 45° dan 225°. Pada 45° keduanya √2/2 ≈ 0,707; pada 225° keduanya −√2/2 ≈ −0,707. Pada kedua kasus tan θ = 1.' },
        { q: 'Tampilan menunjukkan cos θ = −0,6 dan titiknya di kuadran ketiga. Tentukan sin θ dan tan θ.', a: 'Dari sin²θ + cos²θ = 1, sin²θ = 1 − 0,36 = 0,64, jadi sin θ = ±0,8. Di kuadran ketiga sinus negatif, jadi sin θ = −0,8. Maka tan θ = (−0,8)/(−0,6) ≈ 1,33, positif, seperti selalu di kuadran ketiga.' },
      ],
    },
  },
};
