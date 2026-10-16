// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Graph a system of linear inequalities in two variables, identify the feasible region as the intersection of half-planes, and find its corner points by solving pairs of linear equations.',
      'Explain why a linear objective z = px + qy reaches its maximum and minimum at corner points of a bounded feasible region, using the level-line (isoprofit) argument.',
      'Translate a word problem with limited resources into constraints and an objective, solve it graphically, and interpret the optimal corner in context.',
    ],
    id: [
      'Menggambar sistem pertidaksamaan linear dua variabel, mengenali daerah penyelesaian sebagai irisan setengah bidang, dan menentukan titik pojoknya dengan menyelesaikan pasangan persamaan linear.',
      'Menjelaskan mengapa fungsi tujuan linear z = px + qy mencapai maksimum dan minimum di titik pojok daerah penyelesaian yang terbatas, dengan argumen garis selidik.',
      'Menerjemahkan soal cerita dengan sumber daya terbatas menjadi kendala dan fungsi tujuan, menyelesaikannya secara grafis, dan menafsirkan titik pojok optimum dalam konteks.',
    ],
  },
  tryThis: {
    en: [
      'With the default constraints, drag the dashed level line slowly from z = 0 upward. Watch which corner it leaves last: that is the maximum. Press "Move level line to optimum" to confirm.',
      'Change the objective coefficient q from 3 down to 1 and then to 0.5. At which value does the winning corner jump from (4, 6) to (6, 0)? Why does it jump rather than slide?',
      'Switch on constraint C3 (x + y ≤ 10) and move its c slider down to 8, then 6. Which corners disappear and which new ones appear?',
      'Load the bakery preset. Lower the sugar limit C2 from 70 to 50 and read the new plan. Then raise the price of cake (q) until the bakery should make only cakes.',
    ],
    id: [
      'Dengan kendala bawaan, seret garis selidik putus-putus perlahan dari z = 0 ke atas. Amati titik pojok mana yang terakhir ditinggalkannya: itulah maksimum. Tekan "Move level line to optimum" untuk memastikan.',
      'Ubah koefisien tujuan q dari 3 turun ke 1 lalu ke 0,5. Pada nilai berapa pojok pemenang melompat dari (4, 6) ke (6, 0)? Mengapa melompat, bukan bergeser?',
      'Nyalakan kendala C3 (x + y ≤ 10) dan geser penggeser c-nya turun ke 8, lalu 6. Pojok mana yang hilang dan pojok baru mana yang muncul?',
      'Muat prasetel toko roti. Turunkan batas gula C2 dari 70 ke 50 dan baca rencana barunya. Lalu naikkan harga kue (q) sampai toko sebaiknya hanya membuat kue.',
    ],
  },

  learn: {
    background: {
      en: [
        'A linear inequality such as x + 2y ≤ 16 describes a half-plane: the boundary line x + 2y = 16 together with everything on one side of it. Test a point not on the line (the origin is convenient): 0 + 0 ≤ 16 is true, so the side containing the origin is shaded. A system of inequalities is satisfied only by points that lie in every half-plane at once, so the feasible region is their intersection. With x ≥ 0 and y ≥ 0 as well, the region is a convex polygon in the first quadrant whose corners occur where two boundary lines cross. Solving the pair x + 2y = 16, 3x + y = 18 gives the corner (4, 6).',
        'Linear programming asks for the best value of a linear objective z = px + qy over that region. Setting z equal to a constant gives a level line px + qy = z; all level lines are parallel, and sliding one in the direction of the vector (p, q) increases z. Imagine pushing the dashed line across the region: the last point it touches before leaving is where z is largest, and the first point it touches on the way in is where z is smallest. Because the region is a convex polygon, that last contact is always at a corner, or along a whole edge when the level line is parallel to that edge. This is the corner-point theorem, and it means you only need to evaluate z at the finitely many corners.',
        'The sim computes the corners by clipping a large square successively by every active constraint, then lists each corner with its z value and the constraints that are tight there. For the default problem the corners are (0, 0), (6, 0), (4, 6) and (0, 8), with z = 2x + 3y taking the values 0, 12, 26 and 24, so the maximum 26 is at (4, 6). Changing p or q tilts the level line; the optimum stays at (4, 6) as long as the slope of the level line lies between the slopes of the two edges that meet there, and jumps to a neighbouring corner when it passes one of them. Loosening a constraint (larger c) can enlarge the region and create new corners; tightening it can remove them, and contradictory constraints leave no feasible region at all.',
        'Word problems become linear programs by naming the decision variables and writing one inequality per limited resource. In the bakery preset, x loaves of bread and y cakes need 200 g and 300 g of flour, 10 g and 20 g of sugar, and one oven slot each; with 11.4 kg of flour, 700 g of sugar and 48 oven slots the constraints are 2x + 3y ≤ 114, x + 2y ≤ 70 and x + y ≤ 48. Profit is Rp 3 thousand per loaf and Rp 5 thousand per cake, so z = 3x + 5y. The corners are (0, 0), (48, 0), (30, 18), (18, 26) and (0, 35), and the best plan is 18 loaves and 26 cakes for Rp 184 thousand. At that corner the sugar and flour constraints are tight (both resources fully used) while 4 oven slots are left over.',
      ],
      id: [
        'Pertidaksamaan linear seperti x + 2y ≤ 16 menggambarkan setengah bidang: garis batas x + 2y = 16 beserta semua titik di salah satu sisinya. Uji satu titik yang tidak terletak pada garis (titik asal paling mudah): 0 + 0 ≤ 16 benar, sehingga sisi yang memuat titik asal diarsir. Sistem pertidaksamaan hanya dipenuhi oleh titik yang berada di semua setengah bidang sekaligus, sehingga daerah penyelesaiannya adalah irisannya. Dengan x ≥ 0 dan y ≥ 0, daerah itu berupa poligon cembung di kuadran pertama yang pojok-pojoknya terjadi di perpotongan dua garis batas. Menyelesaikan pasangan x + 2y = 16, 3x + y = 18 memberi pojok (4, 6).',
        'Program linear mencari nilai terbaik fungsi tujuan linear z = px + qy pada daerah itu. Menetapkan z sama dengan suatu konstanta memberi garis selidik px + qy = z; semua garis selidik sejajar, dan menggesernya searah vektor (p, q) menaikkan z. Bayangkan mendorong garis putus-putus melintasi daerah: titik terakhir yang disentuhnya sebelum keluar adalah tempat z terbesar, dan titik pertama yang disentuh saat masuk adalah tempat z terkecil. Karena daerahnya poligon cembung, sentuhan terakhir itu selalu di titik pojok, atau di sepanjang satu sisi bila garis selidik sejajar sisi tersebut. Inilah teorema titik pojok, yang berarti kamu hanya perlu menghitung z di titik pojok yang banyaknya berhingga.',
        'Simulasi menghitung titik pojok dengan memotong sebuah persegi besar berturut-turut oleh setiap kendala aktif, lalu mencantumkan tiap pojok beserta nilai z-nya dan kendala yang tepat terpenuhi di sana. Untuk soal bawaan, pojoknya adalah (0, 0), (6, 0), (4, 6) dan (0, 8), dengan z = 2x + 3y bernilai 0, 12, 26 dan 24, sehingga maksimum 26 dicapai di (4, 6). Mengubah p atau q memiringkan garis selidik; optimum tetap di (4, 6) selama gradien garis selidik berada di antara gradien dua sisi yang bertemu di sana, dan melompat ke pojok tetangga ketika melewati salah satunya. Melonggarkan kendala (c lebih besar) dapat memperluas daerah dan menciptakan pojok baru; memperketatnya dapat menghilangkan pojok, dan kendala yang bertentangan tidak menyisakan daerah penyelesaian sama sekali.',
        'Soal cerita menjadi program linear dengan menamai variabel keputusan dan menulis satu pertidaksamaan untuk setiap sumber daya terbatas. Pada prasetel toko roti, x roti dan y kue memerlukan tepung 200 g dan 300 g, gula 10 g dan 20 g, serta satu slot oven masing-masing; dengan 11,4 kg tepung, 700 g gula dan 48 slot oven, kendalanya adalah 2x + 3y ≤ 114, x + 2y ≤ 70 dan x + y ≤ 48. Laba Rp 3 ribu per roti dan Rp 5 ribu per kue, sehingga z = 3x + 5y. Titik pojoknya (0, 0), (48, 0), (30, 18), (18, 26) dan (0, 35), dan rencana terbaik adalah 18 roti dan 26 kue dengan laba Rp 184 ribu. Di pojok itu kendala gula dan tepung tepat terpenuhi (kedua bahan habis terpakai) sedangkan 4 slot oven tersisa.',
      ],
    },
    figure: {
      caption: {
        en: 'Feasible region (shaded) of x + 2y ≤ 16, 3x + y ≤ 18, x ≥ 0, y ≥ 0 with corners (0, 0), (6, 0), (4, 6) and (0, 8). The dashed level lines of z = 2x + 3y are parallel; sliding them in the direction (2, 3) increases z, and the last corner touched is (4, 6), where z = 26.',
        id: 'Daerah penyelesaian (berbayang) dari x + 2y ≤ 16, 3x + y ≤ 18, x ≥ 0, y ≥ 0 dengan pojok (0, 0), (6, 0), (4, 6) dan (0, 8). Garis selidik putus-putus z = 2x + 3y saling sejajar; menggesernya searah (2, 3) menaikkan z, dan pojok terakhir yang disentuh adalah (4, 6), tempat z = 26.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // window [0,10]² → 200 px square at (50,20)
        const X = (x) => (50 + x * 20).toFixed(1);
        const Y = (y) => (220 - y * 20).toFixed(1);
        const pt = (x, y) => `${X(x)},${Y(y)}`;
        // level line 2x+3y=z between x=0 and x=10: y=(z-2x)/3
        const level = (z) => `<line x1="${X(0)}" y1="${Y(z / 3)}" x2="${X(Math.min(10, z / 2))}" y2="${Y(Math.max(0, (z - 20) / 3))}" stroke="#fbbf24" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.7"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Feasible region with corner points and level lines of the objective', 'Daerah penyelesaian dengan titik pojok dan garis selidik fungsi tujuan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:9px ui-monospace,monospace;fill:currentColor}</style>
  <rect x="50" y="20" width="200" height="200" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <polygon points="${pt(0, 0)} ${pt(6, 0)} ${pt(4, 6)} ${pt(0, 8)}" fill="#34d399" opacity="0.3" stroke="#34d399" stroke-width="1.5"/>
  <line x1="${X(0)}" y1="${Y(8)}" x2="${X(10)}" y2="${Y(3)}" stroke="#38bdf8" stroke-width="2"/>
  <line x1="${X(6)}" y1="${Y(0)}" x2="${X(10 / 3)}" y2="${Y(8)}" stroke="#f472b6" stroke-width="2"/>
  <line x1="${X(10 / 3)}" y1="${Y(8)}" x2="${X(2.67)}" y2="${Y(10)}" stroke="#f472b6" stroke-width="2"/>
  ${level(12)}${level(18)}
  <line x1="${X(0)}" y1="${Y(26 / 3)}" x2="${X(10)}" y2="${Y(2)}" stroke="#fbbf24" stroke-width="2" stroke-dasharray="6 4"/>
  <line x1="${X(5)}" y1="${Y(2)}" x2="${X(6.2)}" y2="${Y(3.8)}" stroke="#fbbf24" stroke-width="1.5"/>
  <polygon points="${pt(6.2, 3.8)} ${pt(5.75, 3.55)} ${pt(6.15, 3.3)}" fill="#fbbf24"/>
  <circle cx="${X(0)}" cy="${Y(0)}" r="3.5" fill="currentColor"/>
  <circle cx="${X(6)}" cy="${Y(0)}" r="3.5" fill="currentColor"/>
  <circle cx="${X(0)}" cy="${Y(8)}" r="3.5" fill="currentColor"/>
  <circle cx="${X(4)}" cy="${Y(6)}" r="5" fill="#fbbf24"/>
  <circle cx="${X(4)}" cy="${Y(6)}" r="9" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="${X(0.3)}" y="${Y(0.4)}" class="s">(0,0) z=0</text>
  <text x="${X(5.2)}" y="${Y(-0.7)}" class="s">(6,0) z=12</text>
  <text x="${X(0.3)}" y="${Y(8.6)}" class="s">(0,8) z=24</text>
  <text x="${X(4.6)}" y="${Y(6.6)}" class="s" fill="#fbbf24" font-weight="bold">(4,6) z=26 ★</text>
  <text x="${X(7)}" y="${Y(3.6)}" fill="#38bdf8" class="s">x+2y=16</text>
  <text x="${X(6.3)}" y="${Y(1.2)}" fill="#f472b6" class="s">3x+y=18</text>
  <text x="${X(5)}" y="${Y(9.2)}" class="s" fill="#fbbf24">2x+3y=z</text>
  <text x="258" y="40">${L('level lines', 'garis selidik')}</text>
  <text x="258" y="54">${L('z = 12, 18, 26', 'z = 12, 18, 26')}</text>
  <text x="258" y="76">${L('push along', 'dorong searah')}</text>
  <text x="258" y="90">(p, q) = (2, 3)</text>
  <text x="258" y="112">${L('last corner', 'pojok terakhir')}</text>
  <text x="258" y="126">${L('touched: max', 'tersentuh: maks')}</text>
  <text x="${X(5)}" y="236" text-anchor="middle" class="s">x</text>
  <text x="40" y="${Y(5)}" text-anchor="middle" class="s">y</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Each inequality ax + by ≤ c is a half-plane bounded by the line ax + by = c; test one point to decide which side is shaded.',
        'The feasible region of a system is the intersection of all its half-planes; with x ≥ 0, y ≥ 0 it is a convex polygon (or empty, or unbounded).',
        'Corner points are found by solving two boundary equations simultaneously.',
        'The level lines px + qy = z of a linear objective are parallel; z increases in the direction of (p, q).',
        'Corner-point theorem: on a bounded feasible region a linear objective attains its maximum and minimum at corners, so compare z at the corners only.',
        'A word problem becomes a linear program by naming variables, writing one constraint per resource, and one objective to maximise (profit) or minimise (cost).',
      ],
      id: [
        'Setiap pertidaksamaan ax + by ≤ c adalah setengah bidang yang dibatasi garis ax + by = c; uji satu titik untuk menentukan sisi yang diarsir.',
        'Daerah penyelesaian suatu sistem adalah irisan semua setengah bidangnya; dengan x ≥ 0, y ≥ 0 bentuknya poligon cembung (atau kosong, atau tak terbatas).',
        'Titik pojok ditentukan dengan menyelesaikan dua persamaan garis batas secara simultan.',
        'Garis selidik px + qy = z dari fungsi tujuan linear saling sejajar; z naik searah (p, q).',
        'Teorema titik pojok: pada daerah penyelesaian yang terbatas, fungsi tujuan linear mencapai maksimum dan minimum di titik pojok, sehingga cukup bandingkan z di titik pojok saja.',
        'Soal cerita menjadi program linear dengan menamai variabel, menulis satu kendala per sumber daya, dan satu fungsi tujuan untuk dimaksimumkan (laba) atau diminimumkan (biaya).',
      ],
    },
    vocabulary: {
      en: [
        ['Half-plane', 'All points on one side of a line, together with the line itself when the inequality includes equality (≤ or ≥).'],
        ['Feasible region', 'The set of points satisfying every constraint at once; the shaded polygon in the sim.'],
        ['Corner point (vertex)', 'A point of the feasible region where two boundary lines meet.'],
        ['Objective function', 'The linear expression z = px + qy whose value is to be maximised or minimised.'],
        ['Level line (isoprofit line)', 'The line px + qy = z for one fixed value of z; all level lines of an objective are parallel.'],
        ['Binding (tight) constraint', 'A constraint that holds with equality at the optimal point, meaning that resource is fully used.'],
      ],
      id: [
        ['Setengah bidang', 'Semua titik di satu sisi suatu garis, beserta garis itu sendiri bila pertidaksamaannya memuat tanda sama dengan (≤ atau ≥).'],
        ['Daerah penyelesaian', 'Himpunan titik yang memenuhi semua kendala sekaligus; poligon berbayang di simulasi.'],
        ['Titik pojok', 'Titik pada daerah penyelesaian tempat dua garis batas bertemu.'],
        ['Fungsi tujuan', 'Bentuk linear z = px + qy yang nilainya akan dimaksimumkan atau diminimumkan.'],
        ['Garis selidik', 'Garis px + qy = z untuk satu nilai z tetap; semua garis selidik suatu fungsi tujuan saling sejajar.'],
        ['Kendala aktif (mengikat)', 'Kendala yang berlaku dengan tanda sama dengan di titik optimum, artinya sumber daya itu habis terpakai.'],
      ],
    },
    misconceptions: {
      en: [
        ['The optimum is at the corner farthest from the origin.', 'Distance does not matter; direction does. In the default problem (0, 8) is farther from the origin than (4, 6), yet z = 2x + 3y is larger at (4, 6). With q = 1 the winning corner is (6, 0), which is even closer.'],
        ['The maximum of z could be somewhere inside the region.', 'Never for a linear objective. A level line through an interior point can always be pushed further in the direction (p, q) while still touching the region, so z keeps increasing until the line reaches the boundary.'],
        ['Every constraint affects the answer.', 'A redundant constraint lies entirely outside the region formed by the others and changes nothing. In the sim, raise C1\'s c well above 16 and watch the region stop depending on it.'],
        ['More of the most profitable product is always best.', 'Cake earns more per unit in the bakery preset, but making only cakes (0, 35) earns Rp 175 thousand, less than the mixed plan (18, 26) with Rp 184 thousand, because the mix uses the scarce resources more completely.'],
      ],
      id: [
        ['Optimum selalu di pojok yang terjauh dari titik asal.', 'Jarak tidak menentukan; arah yang menentukan. Pada soal bawaan (0, 8) lebih jauh dari titik asal daripada (4, 6), tetapi z = 2x + 3y lebih besar di (4, 6). Dengan q = 1 pojok pemenangnya (6, 0), yang justru lebih dekat.'],
        ['Maksimum z bisa berada di dalam daerah.', 'Tidak pernah untuk fungsi tujuan linear. Garis selidik yang melalui titik dalam selalu bisa didorong lebih jauh searah (p, q) sambil tetap menyentuh daerah, sehingga z terus naik sampai garis mencapai batas.'],
        ['Setiap kendala memengaruhi jawaban.', 'Kendala yang berlebihan terletak seluruhnya di luar daerah yang dibentuk kendala lain dan tidak mengubah apa pun. Di simulasi, naikkan c pada C1 jauh di atas 16 dan perhatikan daerahnya tidak lagi bergantung padanya.'],
        ['Membuat sebanyak mungkin produk yang paling menguntungkan selalu terbaik.', 'Kue memberi laba lebih besar per satuan pada prasetel toko roti, tetapi hanya membuat kue (0, 35) menghasilkan Rp 175 ribu, lebih kecil daripada rencana campuran (18, 26) dengan Rp 184 ribu, karena campuran memakai sumber daya yang langka lebih tuntas.'],
      ],
    },
    realWorld: {
      en: [
        'Factories decide how many units of each product to make when machines, labour hours and raw materials are limited, exactly the bakery problem at a larger scale.',
        'Diet planning chooses amounts of foods that meet nutrient minimums at the lowest cost; the first large linear programs in the 1940s were diet problems for the army.',
        'Airlines and logistics firms assign crews, aircraft and delivery trucks with linear programs that have thousands of variables, solved by the simplex algorithm rather than by graphing.',
        'Farmers allocate land between crops subject to water, fertiliser and labour limits to maximise expected income.',
      ],
      id: [
        'Pabrik memutuskan berapa unit tiap produk yang dibuat ketika mesin, jam kerja dan bahan baku terbatas, persis soal toko roti dalam skala lebih besar.',
        'Perencanaan menu memilih jumlah makanan yang memenuhi kebutuhan gizi minimum dengan biaya terendah; program linear besar pertama pada 1940-an adalah soal menu untuk tentara.',
        'Maskapai penerbangan dan perusahaan logistik menugaskan kru, pesawat dan truk pengiriman dengan program linear ribuan variabel, yang diselesaikan dengan algoritma simpleks, bukan dengan menggambar.',
        'Petani membagi lahan antara beberapa tanaman dengan batas air, pupuk dan tenaga kerja untuk memaksimumkan pendapatan yang diharapkan.',
      ],
    },
    questions: {
      en: [
        { q: 'Find the corner where x + 2y = 16 and 3x + y = 18 meet, and the value of z = 2x + 3y there.', a: 'From the second equation y = 18 − 3x; substitute: x + 36 − 6x = 16, so x = 4 and y = 6. z = 8 + 18 = 26.' },
        { q: 'For the default region, for which values of q (with p = 2) is (4, 6) the maximiser of z = 2x + qy?', a: 'The level line slope −2/q must lie between the slopes of the edges at (4, 6), which are −1/2 and −3. So −3 ≤ −2/q ≤ −1/2, giving 2/3 ≤ q ≤ 4. Below 2/3 the optimum jumps to (6, 0); above 4 it jumps to (0, 8).' },
        { q: 'In the bakery problem, which resources are fully used at the optimal plan (18, 26), and how much of the third is left?', a: 'Flour: 2·18 + 3·26 = 114 (all used). Sugar: 18 + 52 = 70 (all used). Oven: 18 + 26 = 44 of 48 slots, so 4 slots are spare.' },
        { q: 'Why does the sim report "no feasible region" if you set C1 to x + y ≤ 5 and C2 to −x − y ≤ −8?', a: 'C2 means x + y ≥ 8, which contradicts x + y ≤ 5. No point satisfies both, so the intersection of the half-planes is empty and there is nothing to optimise.' },
      ],
      id: [
        { q: 'Tentukan pojok tempat x + 2y = 16 dan 3x + y = 18 bertemu, serta nilai z = 2x + 3y di sana.', a: 'Dari persamaan kedua y = 18 − 3x; substitusikan: x + 36 − 6x = 16, sehingga x = 4 dan y = 6. z = 8 + 18 = 26.' },
        { q: 'Untuk daerah bawaan, untuk nilai q berapa (dengan p = 2) titik (4, 6) menjadi pemaksimum z = 2x + qy?', a: 'Gradien garis selidik −2/q harus berada di antara gradien dua sisi di (4, 6), yaitu −1/2 dan −3. Jadi −3 ≤ −2/q ≤ −1/2, memberi 2/3 ≤ q ≤ 4. Di bawah 2/3 optimum melompat ke (6, 0); di atas 4 melompat ke (0, 8).' },
        { q: 'Pada soal toko roti, sumber daya mana yang habis terpakai pada rencana optimum (18, 26), dan berapa sisa yang ketiga?', a: 'Tepung: 2·18 + 3·26 = 114 (habis). Gula: 18 + 52 = 70 (habis). Oven: 18 + 26 = 44 dari 48 slot, jadi 4 slot tersisa.' },
        { q: 'Mengapa simulasi melaporkan "tidak ada daerah penyelesaian" jika C1 diatur x + y ≤ 5 dan C2 diatur −x − y ≤ −8?', a: 'C2 berarti x + y ≥ 8, yang bertentangan dengan x + y ≤ 5. Tidak ada titik yang memenuhi keduanya, sehingga irisan setengah bidangnya kosong dan tidak ada yang bisa dioptimumkan.' },
      ],
    },
  },
};
