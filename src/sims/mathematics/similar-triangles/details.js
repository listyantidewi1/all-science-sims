// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Decide whether two triangles are similar by comparing matching angles (AA) or the ratios of matching sides (SSS ratio).',
      'Decide whether two triangles are congruent and name the rule that proves it: SSS, SAS or ASA.',
      'Use a pair of similar triangles to find an unknown length, such as the height of a tree from the length of its shadow.',
    ],
    id: [
      'Menentukan apakah dua segitiga sebangun dengan membandingkan sudut yang bersesuaian (sudut-sudut) atau perbandingan sisi yang bersesuaian (sisi-sisi-sisi).',
      'Menentukan apakah dua segitiga kongruen dan menyebutkan aturan yang membuktikannya: sisi-sisi-sisi, sisi-sudut-sisi, atau sudut-sisi-sudut.',
      'Menggunakan sepasang segitiga sebangun untuk mencari panjang yang tidak diketahui, misalnya tinggi pohon dari panjang bayangannya.',
    ],
  },
  tryThis: {
    en: [
      'Press "Similar ×2". Check that all three ratios DE/AB, EF/BC and FD/CA are 2.00. Now drag just one corner of DEF a little: which ratio changes first, and does the verdict change?',
      'Press "Congruent", then drag D so that DEF is a mirror image of ABC. Is it still congruent? Which of the five rules still show a tick?',
      'Start from "Not similar" and try to make DEF similar to ABC using only the angles (match ∠D to ∠A and ∠E to ∠B). Does the sim agree that the side ratios also match?',
      'Open the "Tree shadow" preset. Drag the stick height and the shadow tips. Write the proportion tree height ÷ tree shadow = stick height ÷ stick shadow and check it against the number on screen.',
    ],
    id: [
      'Tekan "Sebangun ×2". Periksa bahwa ketiga perbandingan DE/AB, EF/BC, dan FD/CA bernilai 2,00. Sekarang geser sedikit satu titik sudut DEF: perbandingan mana yang berubah lebih dulu, dan apakah kesimpulannya berubah?',
      'Tekan "Kongruen", lalu seret D sehingga DEF menjadi bayangan cermin dari ABC. Apakah masih kongruen? Aturan mana dari kelima aturan yang masih bertanda centang?',
      'Mulai dari "Tidak sebangun" dan cobalah membuat DEF sebangun dengan ABC hanya dengan mencocokkan sudut (∠D = ∠A dan ∠E = ∠B). Apakah simulasi setuju bahwa perbandingan sisinya juga sama?',
      'Buka pengaturan "Bayangan pohon". Geser tinggi tongkat dan ujung bayangan. Tulis perbandingan tinggi pohon ÷ bayangan pohon = tinggi tongkat ÷ bayangan tongkat dan periksa dengan angka di layar.',
    ],
  },

  learn: {
    background: {
      en: [
        'Two triangles are congruent when they are exactly the same shape and size: every side of one matches a side of the other, and every angle matches too. Two triangles are similar when they have the same shape but possibly a different size: the matching angles are equal, and every pair of matching sides has the same ratio, called the scale factor k. A congruent pair is just a similar pair with k = 1. In this sim the corners are matched by name: A with D, B with E and C with F, so side AB matches DE, BC matches EF and CA matches FD.',
        'You do not need to check all six measurements to be sure. For similarity, two equal pairs of angles are enough (the AA rule), because the third angle of any triangle is fixed by the other two: the three angles always add to 180°. Equivalently, if all three side ratios DE/AB, EF/BC and FD/CA are equal, the triangles are similar (the SSS ratio rule). For congruence, three matching sides (SSS), two sides and the angle between them (SAS), or two angles and the side between them (ASA) each pin down a triangle completely, so any one of them proves the triangles are congruent.',
        'The sim measures the sides in grid units and the angles in degrees, then tests every rule with a small tolerance (about 1.5° for angles and 2% for lengths), because dragged points are never perfect. The verdict at the top names the simplest rule that works. The checklist underneath shows all five rules, so you can see that a congruent pair satisfies every rule at once, while a merely similar pair satisfies only AA and the SSS ratio.',
        'Similar triangles are the basis of indirect measurement. On a sunny day the rays from the Sun are parallel, so a stick and a tree standing on level ground make two right-angled triangles with the same angle of elevation: the triangles are similar by AA. Measure the stick, its shadow and the shadow of the tree, and the proportion tree height ÷ tree shadow = stick height ÷ stick shadow gives the height of the tree. The "Tree shadow" preset lets you drag all three measurements and watch the calculated height change.',
      ],
      id: [
        'Dua segitiga disebut kongruen jika bentuk dan ukurannya tepat sama: setiap sisi pada segitiga pertama sama panjang dengan sisi pasangannya, dan setiap sudut juga sama besar. Dua segitiga disebut sebangun jika bentuknya sama tetapi ukurannya boleh berbeda: sudut-sudut yang bersesuaian sama besar, dan setiap pasangan sisi yang bersesuaian memiliki perbandingan yang sama, yang disebut faktor skala k. Pasangan kongruen adalah pasangan sebangun dengan k = 1. Dalam simulasi ini titik sudut dipasangkan menurut namanya: A dengan D, B dengan E, dan C dengan F, sehingga sisi AB berpasangan dengan DE, BC dengan EF, dan CA dengan FD.',
        'Kamu tidak perlu memeriksa keenam ukuran untuk yakin. Untuk kesebangunan, dua pasang sudut yang sama sudah cukup (aturan sudut-sudut), karena sudut ketiga setiap segitiga sudah ditentukan oleh dua sudut lainnya: ketiga sudut selalu berjumlah 180°. Setara dengan itu, jika ketiga perbandingan sisi DE/AB, EF/BC, dan FD/CA sama, kedua segitiga sebangun (aturan sisi-sisi-sisi). Untuk kekongruenan, tiga sisi yang sama (sisi-sisi-sisi), dua sisi dan sudut di antaranya (sisi-sudut-sisi), atau dua sudut dan sisi di antaranya (sudut-sisi-sudut) masing-masing sudah menentukan sebuah segitiga sepenuhnya, sehingga satu aturan saja cukup untuk membuktikan kekongruenan.',
        'Simulasi mengukur sisi dalam satuan kisi dan sudut dalam derajat, lalu menguji setiap aturan dengan toleransi kecil (sekitar 1,5° untuk sudut dan 2% untuk panjang), karena titik yang diseret tidak pernah sempurna. Kesimpulan di bagian atas menyebutkan aturan paling sederhana yang berlaku. Daftar centang di bawahnya menampilkan kelima aturan, sehingga kamu dapat melihat bahwa pasangan kongruen memenuhi semua aturan sekaligus, sedangkan pasangan yang hanya sebangun memenuhi aturan sudut-sudut dan sisi-sisi-sisi (perbandingan) saja.',
        'Segitiga sebangun adalah dasar pengukuran tak langsung. Pada hari cerah sinar Matahari sejajar, sehingga tongkat dan pohon yang berdiri di tanah datar membentuk dua segitiga siku-siku dengan sudut elevasi yang sama: kedua segitiga sebangun menurut aturan sudut-sudut. Ukur tongkat, bayangannya, dan bayangan pohon, lalu perbandingan tinggi pohon ÷ bayangan pohon = tinggi tongkat ÷ bayangan tongkat memberikan tinggi pohon. Pengaturan "Bayangan pohon" memungkinkanmu menggeser ketiga ukuran dan melihat tinggi hasil perhitungan berubah.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: triangles ABC and DEF are similar with scale factor k = 2. Matching angles (same colour marks) are equal and every matching side of DEF is twice as long. Right: a stick and a tree in parallel sunlight form similar right-angled triangles, so H / S = h / s.',
        id: 'Kiri: segitiga ABC dan DEF sebangun dengan faktor skala k = 2. Sudut yang bersesuaian (tanda warna sama) sama besar dan setiap sisi DEF dua kali lebih panjang. Kanan: tongkat dan pohon di bawah sinar matahari sejajar membentuk segitiga siku-siku yang sebangun, sehingga H / S = h / s.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Similar triangles with scale factor 2 and the tree-shadow method', 'Segitiga sebangun dengan faktor skala 2 dan metode bayangan pohon')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:10px system-ui,sans-serif;fill:currentColor;opacity:.8}.t{fill:none;stroke:currentColor;stroke-width:1.6}.g{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}</style>
  <polygon points="20,100 80,100 40,60" class="t"/>
  <text x="14" y="112">A</text><text x="80" y="112">B</text><text x="36" y="56">C</text>
  <path d="M32 100 A12 12 0 0 0 28.5 91.5" fill="none" stroke="#ef4444" stroke-width="2"/>
  <path d="M68 100 A12 12 0 0 1 71.5 91.5" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <text x="44" y="92" class="s">3</text><text x="64" y="80" class="s">4</text><text x="20" y="80" class="s">2.8</text>
  <polygon points="100,200 220,200 140,120" class="t"/>
  <text x="94" y="212">D</text><text x="220" y="212">E</text><text x="136" y="116">F</text>
  <path d="M124 200 A24 24 0 0 0 117 183" fill="none" stroke="#ef4444" stroke-width="2"/>
  <path d="M196 200 A24 24 0 0 1 203 183" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <text x="156" y="196" class="s">6</text><text x="186" y="160" class="s">8</text><text x="104" y="160" class="s">5.6</text>
  <text x="20" y="150" class="s">${L('k = DE/AB = 6/3 = 2', 'k = DE/AB = 6/3 = 2')}</text>
  <text x="20" y="164" class="s">${L('EF/BC = 8/4 = 2', 'EF/BC = 8/4 = 2')}</text>
  <text x="20" y="178" class="s">${L('∠A = ∠D, ∠B = ∠E', '∠A = ∠D, ∠B = ∠E')}</text>
  <line x1="240" y1="200" x2="350" y2="200" class="t"/>
  <line x1="262" y1="200" x2="262" y2="170" stroke="#f59e0b" stroke-width="3"/>
  <line x1="262" y1="170" x2="244" y2="200" class="g" stroke-dasharray="3 3"/>
  <text x="248" y="226" class="s">s</text><text x="266" y="186" class="s">h</text>
  <line x1="320" y1="200" x2="320" y2="110" stroke="#10b981" stroke-width="4"/>
  <circle cx="320" cy="112" r="14" fill="#10b981" opacity=".7"/>
  <line x1="320" y1="110" x2="266" y2="200" class="g" stroke-dasharray="3 3"/>
  <text x="290" y="226" class="s">S</text><text x="325" y="160" class="s">H</text>
  <text x="246" y="100" class="s">${L('H / S = h / s', 'H / S = h / s')}</text>
  <text x="246" y="86" class="s">${L('parallel sun rays', 'sinar matahari sejajar')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Similar triangles have equal matching angles and equal ratios of matching sides; the common ratio is the scale factor k.',
        'Congruent triangles are similar triangles with k = 1: matching sides are equal as well as matching angles.',
        'Two equal pairs of angles (AA) are enough to prove similarity, because the angles of a triangle add to 180°.',
        'Three equal side ratios (SSS ratio) also prove similarity, even without measuring any angle.',
        'SSS, SAS and ASA each fix a triangle completely, so any one of them proves two triangles congruent.',
        'If k is the scale factor for lengths, the ratio of the areas is k², not k.',
      ],
      id: [
        'Segitiga sebangun memiliki sudut bersesuaian yang sama besar dan perbandingan sisi bersesuaian yang sama; perbandingan itu disebut faktor skala k.',
        'Segitiga kongruen adalah segitiga sebangun dengan k = 1: sisi yang bersesuaian sama panjang, begitu juga sudutnya.',
        'Dua pasang sudut yang sama (sudut-sudut) sudah cukup membuktikan kesebangunan, karena jumlah sudut segitiga 180°.',
        'Tiga perbandingan sisi yang sama (sisi-sisi-sisi) juga membuktikan kesebangunan, tanpa mengukur sudut sama sekali.',
        'Sisi-sisi-sisi, sisi-sudut-sisi, dan sudut-sisi-sudut masing-masing menentukan segitiga sepenuhnya, sehingga satu saja cukup membuktikan kekongruenan.',
        'Jika k adalah faktor skala panjang, perbandingan luasnya adalah k², bukan k.',
      ],
    },
    vocabulary: {
      en: [
        ['Similar (sebangun)', 'Same shape, possibly different size: matching angles equal and matching sides in the same ratio.'],
        ['Congruent (kongruen)', 'Same shape and same size: all matching sides and angles are equal.'],
        ['Scale factor k', 'The ratio of a side of the second triangle to its matching side in the first triangle, the same for all three pairs.'],
        ['Corresponding (matching) parts', 'Sides or angles in the same position in two triangles, here A↔D, B↔E, C↔F.'],
        ['AA', 'Angle-Angle: two pairs of equal angles prove two triangles similar.'],
        ['SSS, SAS, ASA', 'Side-Side-Side, Side-Angle-Side (angle between the sides), Angle-Side-Angle (side between the angles): the three congruence rules.'],
      ],
      id: [
        ['Sebangun', 'Bentuk sama, ukuran boleh berbeda: sudut bersesuaian sama besar dan sisi bersesuaian berbanding sama.'],
        ['Kongruen', 'Bentuk dan ukuran sama: semua sisi dan sudut yang bersesuaian sama.'],
        ['Faktor skala k', 'Perbandingan sisi segitiga kedua dengan sisi pasangannya pada segitiga pertama, sama untuk ketiga pasangan.'],
        ['Bagian yang bersesuaian', 'Sisi atau sudut yang menempati posisi sama pada dua segitiga, di sini A↔D, B↔E, C↔F.'],
        ['Sudut-sudut (AA)', 'Dua pasang sudut yang sama membuktikan dua segitiga sebangun.'],
        ['Sisi-sisi-sisi, sisi-sudut-sisi, sudut-sisi-sudut', 'Tiga aturan kekongruenan: SSS, SAS (sudut di antara kedua sisi), ASA (sisi di antara kedua sudut).'],
      ],
    },
    misconceptions: {
      en: [
        ['If two triangles have the same three angles, they are congruent.', 'Equal angles only make them similar. Press "Similar ×2": all the angles match, but DEF is twice the size, so it is not congruent.'],
        ['Doubling the sides of a triangle doubles its area.', 'Doubling every side multiplies the area by 2² = 4. Area scales with k², because both the base and the height are multiplied by k.'],
        ['Two sides and any angle (SSA) are enough to prove congruence.', 'The angle must be between the two sides (SAS). With SSA two different triangles can share the same measurements, so it is not a valid rule.'],
        ['A mirror-image triangle is not congruent because it is "flipped".', 'Reflection does not change any length or angle, so a mirror image is still congruent. Try it with the Congruent preset.'],
      ],
      id: [
        ['Jika dua segitiga memiliki tiga sudut yang sama, keduanya kongruen.', 'Sudut yang sama hanya membuat keduanya sebangun. Tekan "Sebangun ×2": semua sudut sama, tetapi DEF dua kali lebih besar, jadi tidak kongruen.'],
        ['Menggandakan sisi segitiga menggandakan luasnya.', 'Menggandakan setiap sisi mengalikan luas dengan 2² = 4. Luas berbanding dengan k², karena alas dan tinggi keduanya dikalikan k.'],
        ['Dua sisi dan sembarang sudut (sisi-sisi-sudut) cukup untuk membuktikan kekongruenan.', 'Sudutnya harus berada di antara kedua sisi (sisi-sudut-sisi). Dengan sisi-sisi-sudut, dua segitiga berbeda bisa memiliki ukuran yang sama, jadi bukan aturan yang sah.'],
        ['Segitiga bayangan cermin tidak kongruen karena "terbalik".', 'Pencerminan tidak mengubah panjang atau sudut mana pun, jadi bayangan cermin tetap kongruen. Coba dengan pengaturan Kongruen.'],
      ],
    },
    realWorld: {
      en: [
        'Surveyors and foresters measure the height of a tree, tower or cliff from its shadow or from a small sighting triangle, exactly as in the Tree shadow preset.',
        'Maps and scale models are similar figures: a 1:50 000 map shrinks every length by the same factor k = 1/50 000.',
        'Architects use congruent triangles in roof trusses and bridges, because identical triangles share loads evenly and are rigid.',
        'Thales is said to have measured the height of the Great Pyramid around 600 BC by comparing its shadow with the shadow of a stick.',
        'Photographs, projectors and photocopier enlargements all produce similar figures: angles stay the same while lengths scale.',
      ],
      id: [
        'Juru ukur dan petugas kehutanan mengukur tinggi pohon, menara, atau tebing dari bayangannya atau dari segitiga pembidik kecil, persis seperti pengaturan Bayangan pohon.',
        'Peta dan model skala adalah bangun yang sebangun: peta 1:50.000 memperkecil setiap panjang dengan faktor k yang sama, yaitu 1/50.000.',
        'Arsitek memakai segitiga kongruen pada rangka atap dan jembatan, karena segitiga yang identik membagi beban secara merata dan kaku.',
        'Thales dikatakan mengukur tinggi Piramida Besar sekitar 600 SM dengan membandingkan bayangannya dengan bayangan sebuah tongkat.',
        'Foto, proyektor, dan pembesaran mesin fotokopi semuanya menghasilkan bangun yang sebangun: sudut tetap, panjang berubah dengan skala.',
      ],
    },
    questions: {
      en: [
        { q: 'Triangle ABC has sides 3, 4 and 5 units. Triangle DEF has sides 4.5, 6 and 7.5 units. Are they similar? What is k?', a: 'Yes. 4.5/3 = 6/4 = 7.5/5 = 1.5, so all three ratios are equal (SSS ratio) and k = 1.5.' },
        { q: 'A 1.2 m stick casts a shadow 0.8 m long. At the same moment a tree casts a shadow 6.0 m long. How tall is the tree?', a: 'H / 6.0 = 1.2 / 0.8 = 1.5, so H = 9.0 m. The sun rays are parallel, so the two right-angled triangles are similar by AA.' },
        { q: 'In the sim, ∠A = ∠D and ∠B = ∠E, but AB = 4 and DE = 6. Are the triangles congruent? Similar?', a: 'Not congruent, because a matching side differs. They are similar by AA, with scale factor 6/4 = 1.5.' },
        { q: 'You know AB = DE, BC = EF and ∠A = ∠D. Can you conclude the triangles are congruent?', a: 'No. The known angle is not between the two known sides, so this is SSA, which is not a congruence rule. You would need ∠B = ∠E (the included angle) for SAS.' },
      ],
      id: [
        { q: 'Segitiga ABC bersisi 3, 4, dan 5 satuan. Segitiga DEF bersisi 4,5, 6, dan 7,5 satuan. Apakah keduanya sebangun? Berapa k?', a: 'Ya. 4,5/3 = 6/4 = 7,5/5 = 1,5, sehingga ketiga perbandingan sama (sisi-sisi-sisi) dan k = 1,5.' },
        { q: 'Tongkat 1,2 m membentuk bayangan 0,8 m. Pada saat yang sama sebuah pohon membentuk bayangan 6,0 m. Berapa tinggi pohon?', a: 'H / 6,0 = 1,2 / 0,8 = 1,5, jadi H = 9,0 m. Sinar matahari sejajar, sehingga kedua segitiga siku-siku sebangun menurut aturan sudut-sudut.' },
        { q: 'Di simulasi, ∠A = ∠D dan ∠B = ∠E, tetapi AB = 4 dan DE = 6. Apakah kedua segitiga kongruen? Sebangun?', a: 'Tidak kongruen, karena ada sisi bersesuaian yang berbeda. Keduanya sebangun menurut aturan sudut-sudut, dengan faktor skala 6/4 = 1,5.' },
        { q: 'Diketahui AB = DE, BC = EF, dan ∠A = ∠D. Bisakah kamu menyimpulkan kedua segitiga kongruen?', a: 'Tidak. Sudut yang diketahui tidak berada di antara kedua sisi yang diketahui, jadi ini sisi-sisi-sudut, yang bukan aturan kekongruenan. Dibutuhkan ∠B = ∠E (sudut apit) untuk sisi-sudut-sisi.' },
      ],
    },
  },
};
