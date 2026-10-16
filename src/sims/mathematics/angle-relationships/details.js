// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Name and find the pairs of angles made when a transversal crosses two parallel lines: corresponding, alternate interior, alternate exterior and co-interior.',
      'Use vertical angles and angles on a straight line to find unknown angles when two lines cross.',
      'Explain why the three angles of any triangle add up to 180° and use this to find a missing angle.',
    ],
    id: [
      'Menyebutkan dan menemukan pasangan sudut yang terbentuk ketika transversal memotong dua garis sejajar: sudut sehadap, dalam berseberangan, luar berseberangan, dan dalam sepihak.',
      'Menggunakan sudut bertolak belakang dan sudut berpelurus untuk mencari sudut yang belum diketahui ketika dua garis berpotongan.',
      'Menjelaskan mengapa ketiga sudut segitiga selalu berjumlah 180° dan menggunakannya untuk mencari sudut yang hilang.',
    ],
  },
  tryThis: {
    en: [
      'In Parallel lines mode, drag the transversal until ∠1 reads 40°. Without looking, predict all seven other angles, then check.',
      'Choose the "Co-interior" pair. Drag the transversal to many positions: does ∠3 + ∠6 ever stop being 180°?',
      'In Triangle mode, drag a vertex to make a very flat triangle, then press "Tear off corners". Do the three pieces still make a straight line?',
      'In Quiz mode, answer five questions in a row. For each one, say which rule you used before you type the number.',
    ],
    id: [
      'Pada mode Garis sejajar, seret transversal hingga ∠1 menunjukkan 40°. Tanpa melihat, tebak ketujuh sudut lainnya, lalu periksa.',
      'Pilih pasangan "Dalam sepihak". Seret transversal ke banyak posisi: apakah ∠3 + ∠6 pernah tidak sama dengan 180°?',
      'Pada mode Segitiga, seret satu titik sudut hingga segitiganya sangat gepeng, lalu tekan "Sobek sudut". Apakah ketiga potongan masih membentuk garis lurus?',
      'Pada mode Kuis, jawab lima soal berturut-turut. Untuk setiap soal, sebutkan aturan yang kamu pakai sebelum mengetik angkanya.',
    ],
  },

  learn: {
    background: {
      en: [
        'When two straight lines cross, they make four angles around the crossing point. Angles opposite each other, called vertical (or vertically opposite) angles, are always equal. Angles next to each other share a straight line, so they add up to 180°; such a pair is called a linear pair or supplementary angles. Knowing just one of the four angles is enough to find the other three.',
        'A line that cuts across two other lines is called a transversal. If the two lines are parallel, the eight angles it makes come in only two sizes, and they are related in named pairs. Corresponding angles sit in the same position at each crossing (for example both upper-right) and are equal. Alternate angles sit on opposite sides of the transversal, either both between the parallel lines (alternate interior) or both outside them (alternate exterior), and are equal. Co-interior angles sit on the same side of the transversal between the lines and add up to 180°. The sim labels the angles 1 to 8 so you can see which positions pair up.',
        'The three angles of any triangle add up to 180°. The tear-off demonstration in the sim shows why: the three corner wedges, placed side by side with their vertices at one point, exactly fill a straight angle. The proof uses parallel lines: draw a line through one vertex parallel to the opposite side, and the two angles it makes with the triangle\'s sides are alternate angles equal to the other two angles of the triangle; together with the vertex angle they fill the straight line.',
        'These rules are what you use to find unknown angles in diagrams. First look for a pair that includes the angle you know: vertical angles and corresponding or alternate angles give you an equal angle; a linear pair or co-interior angles give you 180° minus the known angle; in a triangle, the third angle is 180° minus the other two. The quiz mode hides one angle and asks you to find it, then names the rule you should have used.',
      ],
      id: [
        'Ketika dua garis lurus berpotongan, terbentuk empat sudut di sekitar titik potongnya. Sudut yang saling berhadapan, disebut sudut bertolak belakang, selalu sama besar. Sudut yang bersebelahan berbagi satu garis lurus, sehingga jumlahnya 180°; pasangan seperti itu disebut sudut berpelurus atau saling suplemen. Mengetahui satu saja dari keempat sudut cukup untuk mencari tiga sudut lainnya.',
        'Garis yang memotong dua garis lain disebut transversal. Jika kedua garis itu sejajar, kedelapan sudut yang terbentuk hanya memiliki dua ukuran, dan saling berhubungan dalam pasangan yang bernama. Sudut sehadap menempati posisi yang sama di tiap perpotongan (misalnya keduanya kanan-atas) dan sama besar. Sudut berseberangan berada di sisi berlawanan dari transversal, keduanya di antara garis sejajar (dalam berseberangan) atau keduanya di luar (luar berseberangan), dan sama besar. Sudut dalam sepihak berada di sisi yang sama dari transversal di antara kedua garis dan berjumlah 180°. Simulasi memberi label sudut 1 sampai 8 sehingga kamu dapat melihat posisi mana yang berpasangan.',
        'Ketiga sudut setiap segitiga berjumlah 180°. Demonstrasi sobek-sudut di simulasi menunjukkan alasannya: ketiga potongan sudut, diletakkan berjajar dengan titik sudutnya di satu titik, tepat mengisi sudut lurus. Buktinya memakai garis sejajar: tarik garis melalui satu titik sudut yang sejajar dengan sisi di hadapannya, maka dua sudut yang terbentuk dengan sisi-sisi segitiga adalah sudut berseberangan yang sama dengan dua sudut lain segitiga; bersama sudut di titik itu ketiganya mengisi garis lurus.',
        'Aturan-aturan ini yang kamu pakai untuk mencari sudut yang belum diketahui dalam gambar. Pertama cari pasangan yang memuat sudut yang diketahui: sudut bertolak belakang serta sudut sehadap atau berseberangan memberi sudut yang sama; sudut berpelurus atau dalam sepihak memberi 180° dikurangi sudut yang diketahui; pada segitiga, sudut ketiga adalah 180° dikurangi dua sudut lainnya. Mode kuis menyembunyikan satu sudut dan memintamu mencarinya, lalu menyebutkan aturan yang seharusnya kamu pakai.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: a transversal crossing two parallel lines makes eight angles of only two sizes, x and 180° − x. Angles 1 and 5 are corresponding, 3 and 5 are alternate interior, 3 and 6 are co-interior. Right: the corners of a triangle torn off and lined up fill a straight angle, so A + B + C = 180°.',
        id: 'Kiri: transversal yang memotong dua garis sejajar membentuk delapan sudut dengan hanya dua ukuran, x dan 180° − x. Sudut 1 dan 5 sehadap, 3 dan 5 dalam berseberangan, 3 dan 6 dalam sepihak. Kanan: sudut-sudut segitiga yang disobek dan disusun berjajar mengisi sudut lurus, sehingga A + B + C = 180°.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // transversal through (100,60) and (60,140): direction angle 63.4° from the lines
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Angles at parallel lines and the triangle angle sum', 'Sudut pada garis sejajar dan jumlah sudut segitiga')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:10px system-ui,sans-serif;fill:currentColor}.ln{stroke:currentColor;stroke-width:1.6;fill:none}</style>
  <line x1="20" y1="60" x2="190" y2="60" class="ln"/>
  <line x1="20" y1="140" x2="190" y2="140" class="ln"/>
  <line x1="125" y1="10" x2="45" y2="170" class="ln"/>
  <path d="M100 60 L116 60 A16 16 0 0 0 107.2 45.7 Z" fill="#ef4444" opacity=".8"/>
  <path d="M100 60 L84 60 A16 16 0 0 1 92.8 74.3 Z" fill="#ef4444" opacity=".8"/>
  <path d="M60 140 L76 140 A16 16 0 0 0 67.2 125.7 Z" fill="#ef4444" opacity=".8"/>
  <path d="M60 140 L44 140 A16 16 0 0 1 52.8 154.3 Z" fill="#ef4444" opacity=".8"/>
  <path d="M100 60 L84 60 A16 16 0 0 0 107.2 45.7 Z" fill="#3b82f6" opacity=".55"/>
  <path d="M100 60 L116 60 A16 16 0 0 1 92.8 74.3 Z" fill="#3b82f6" opacity=".55"/>
  <path d="M60 140 L44 140 A16 16 0 0 0 67.2 125.7 Z" fill="#3b82f6" opacity=".55"/>
  <path d="M60 140 L76 140 A16 16 0 0 1 52.8 154.3 Z" fill="#3b82f6" opacity=".55"/>
  <text x="120" y="50" class="s">1</text><text x="80" y="50" class="s">2</text><text x="78" y="78" class="s">3</text><text x="118" y="78" class="s">4</text>
  <text x="80" y="130" class="s">5</text><text x="40" y="130" class="s">6</text><text x="38" y="158" class="s">7</text><text x="78" y="158" class="s">8</text>
  <text x="20" y="190" class="s" fill="#ef4444">${L('red angles = x (1, 3, 5, 7)', 'sudut merah = x (1, 3, 5, 7)')}</text>
  <text x="20" y="204" class="s" fill="#3b82f6">${L('blue angles = 180° − x (2, 4, 6, 8)', 'sudut biru = 180° − x (2, 4, 6, 8)')}</text>
  <text x="20" y="218" class="s">${L('∠1 = ∠5 corresponding · ∠3 = ∠5 alternate · ∠3 + ∠6 = 180° co-interior', '∠1 = ∠5 sehadap · ∠3 = ∠5 berseberangan · ∠3 + ∠6 = 180° sepihak')}</text>
  <polygon points="220,120 340,120 265,40" class="ln"/>
  <path d="M220 120 L240 120 A20 20 0 0 0 232.3 104.3 Z" fill="#ef4444" opacity=".8"/>
  <path d="M340 120 L320 120 A20 20 0 0 1 326.3 105.4 Z" fill="#a78bfa" opacity=".8"/>
  <path d="M265 40 L252.4 62 A22 22 0 0 0 280.3 56.8 Z" fill="#f472b6" opacity=".8"/>
  <text x="212" y="134" class="s">A</text><text x="336" y="134" class="s">B</text><text x="262" y="34" class="s">C</text>
  <line x1="220" y1="190" x2="350" y2="190" class="ln"/>
  <path d="M285 190 L315 190 A30 30 0 0 0 303.5 166.4 Z" fill="#ef4444" opacity=".8"/>
  <path d="M285 190 L303.5 166.4 A30 30 0 0 0 263.6 169.6 Z" fill="#a78bfa" opacity=".8"/>
  <path d="M285 190 L263.6 169.6 A30 30 0 0 0 255 190 Z" fill="#f472b6" opacity=".8"/>
  <text x="285" y="208" text-anchor="middle" class="s">${L('A + B + C = 180°', 'A + B + C = 180°')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Vertical angles (opposite each other at a crossing) are equal.',
        'Angles on a straight line (a linear pair) add up to 180°.',
        'With parallel lines, corresponding angles are equal and alternate angles are equal.',
        'With parallel lines, co-interior angles add up to 180°.',
        'All eight angles at a transversal come in just two sizes: x and 180° − x.',
        'The angles of a triangle add up to 180°, which follows from the alternate-angle rule.',
      ],
      id: [
        'Sudut bertolak belakang (berhadapan di titik potong) sama besar.',
        'Sudut pada garis lurus (sudut berpelurus) berjumlah 180°.',
        'Pada garis sejajar, sudut sehadap sama besar dan sudut berseberangan sama besar.',
        'Pada garis sejajar, sudut dalam sepihak berjumlah 180°.',
        'Kedelapan sudut pada transversal hanya memiliki dua ukuran: x dan 180° − x.',
        'Jumlah sudut segitiga adalah 180°, yang mengikuti dari aturan sudut berseberangan.',
      ],
    },
    vocabulary: {
      en: [
        ['Transversal', 'A line that crosses two or more other lines.'],
        ['Vertical angles', 'The two angles opposite each other where two lines cross; they are equal.'],
        ['Linear pair / supplementary', 'Two angles that together make a straight line, adding to 180°.'],
        ['Corresponding angles', 'Angles in the same position at the two crossings of a transversal with parallel lines; equal.'],
        ['Alternate angles', 'Angles on opposite sides of the transversal, both inside (interior) or both outside (exterior) the parallel lines; equal.'],
        ['Co-interior angles', 'Angles on the same side of the transversal between the parallel lines; they add to 180°.'],
      ],
      id: [
        ['Transversal', 'Garis yang memotong dua garis lain atau lebih.'],
        ['Sudut bertolak belakang', 'Dua sudut yang saling berhadapan di titik potong dua garis; sama besar.'],
        ['Sudut berpelurus / suplemen', 'Dua sudut yang bersama-sama membentuk garis lurus, berjumlah 180°.'],
        ['Sudut sehadap', 'Sudut pada posisi yang sama di dua titik potong transversal dengan garis sejajar; sama besar.'],
        ['Sudut berseberangan', 'Sudut di sisi berlawanan dari transversal, keduanya di dalam (dalam berseberangan) atau keduanya di luar (luar berseberangan) garis sejajar; sama besar.'],
        ['Sudut dalam sepihak', 'Sudut di sisi yang sama dari transversal di antara garis sejajar; berjumlah 180°.'],
      ],
    },
    misconceptions: {
      en: [
        ['Corresponding angles are always equal, whatever the two lines.', 'Only when the two lines are parallel. The sim keeps its lines parallel; on non-parallel lines the eight angles would have four different sizes.'],
        ['Alternate angles add up to 180°.', 'Alternate angles are equal. It is the co-interior pair (same side, between the lines) that adds to 180°. Highlight each pair in the sim to compare.'],
        ['A very flat or very tall triangle has angles that add to more or less than 180°.', 'Every triangle, whatever its shape, has an angle sum of exactly 180°. Drag a vertex far away in Triangle mode: one angle grows while the others shrink to keep the total fixed.'],
        ['The angle a line makes is measured from the line\'s length.', 'An angle depends only on the directions of the two rays, not on how long they are drawn. Extending the lines in a diagram does not change any angle.'],
      ],
      id: [
        ['Sudut sehadap selalu sama besar, apa pun kedua garisnya.', 'Hanya jika kedua garis sejajar. Simulasi menjaga garisnya sejajar; pada garis yang tidak sejajar kedelapan sudut akan memiliki empat ukuran berbeda.'],
        ['Sudut berseberangan berjumlah 180°.', 'Sudut berseberangan sama besar. Pasangan dalam sepihak (sisi sama, di antara garis) yang berjumlah 180°. Soroti tiap pasangan di simulasi untuk membandingkan.'],
        ['Segitiga yang sangat gepeng atau sangat tinggi memiliki jumlah sudut lebih atau kurang dari 180°.', 'Setiap segitiga, apa pun bentuknya, memiliki jumlah sudut tepat 180°. Seret satu titik sudut jauh di mode Segitiga: satu sudut membesar sementara yang lain mengecil agar jumlahnya tetap.'],
        ['Besar sudut diukur dari panjang garisnya.', 'Sudut hanya bergantung pada arah kedua sinarnya, bukan pada panjang gambarnya. Memperpanjang garis dalam gambar tidak mengubah sudut mana pun.'],
      ],
    },
    realWorld: {
      en: [
        'Street grids: when a diagonal avenue crosses a set of parallel streets, every corner has the same two angles, which is why corner buildings along it share the same shape.',
        'Carpenters and tilers use corresponding angles to cut matching pieces when laying boards or tiles against a slanted wall.',
        'Railway tracks are parallel; a bridge crossing them at an angle makes equal corresponding angles at every rail.',
        'Surveyors check that a triangular plot has been measured correctly by making sure the three angles add to 180°.',
        'Navigators use alternate angles when a ship\'s bearing is read from two parallel lines of latitude.',
      ],
      id: [
        'Jaringan jalan kota: ketika jalan diagonal memotong sederet jalan sejajar, setiap sudut perempatan memiliki dua ukuran sudut yang sama, itulah sebabnya bangunan sudut di sepanjangnya berbentuk sama.',
        'Tukang kayu dan tukang ubin memakai sudut sehadap untuk memotong potongan yang serasi ketika memasang papan atau ubin di tembok yang miring.',
        'Rel kereta sejajar; jembatan yang melintasinya dengan sudut tertentu membentuk sudut sehadap yang sama pada setiap rel.',
        'Juru ukur memeriksa pengukuran petak tanah segitiga dengan memastikan ketiga sudutnya berjumlah 180°.',
        'Navigator memakai sudut berseberangan ketika arah kapal dibaca dari dua garis lintang yang sejajar.',
      ],
    },
    questions: {
      en: [
        { q: 'Two lines cross and one of the angles is 35°. What are the other three?', a: 'The vertical angle is also 35°. The two angles next to it are each 180° − 35° = 145°.' },
        { q: 'A transversal crosses two parallel lines and ∠1 = 72°. Find ∠5 and ∠6, and name the rule for each.', a: '∠5 = 72° because ∠1 and ∠5 are corresponding angles. ∠6 = 180° − 72° = 108° because ∠5 and ∠6 are a linear pair (or because ∠2 = 108° and ∠6 corresponds to it).' },
        { q: 'In a triangle, two angles are 48° and 67°. What is the third?', a: '180° − 48° − 67° = 65°.' },
        { q: 'Why does tearing off the corners of a triangle and lining them up always make a straight line?', a: 'Because the three angles always add to 180°, and a straight angle is 180°. The reason is the alternate-angle rule: a line through one vertex parallel to the opposite side copies the other two angles next to the vertex angle, filling the straight line.' },
      ],
      id: [
        { q: 'Dua garis berpotongan dan salah satu sudutnya 35°. Berapa tiga sudut lainnya?', a: 'Sudut bertolak belakangnya juga 35°. Dua sudut di sebelahnya masing-masing 180° − 35° = 145°.' },
        { q: 'Transversal memotong dua garis sejajar dan ∠1 = 72°. Tentukan ∠5 dan ∠6, dan sebutkan aturannya.', a: '∠5 = 72° karena ∠1 dan ∠5 sudut sehadap. ∠6 = 180° − 72° = 108° karena ∠5 dan ∠6 berpelurus (atau karena ∠2 = 108° dan ∠6 sehadap dengannya).' },
        { q: 'Dalam sebuah segitiga, dua sudutnya 48° dan 67°. Berapa sudut ketiga?', a: '180° − 48° − 67° = 65°.' },
        { q: 'Mengapa menyobek sudut-sudut segitiga dan menyusunnya berjajar selalu membentuk garis lurus?', a: 'Karena ketiga sudut selalu berjumlah 180°, dan sudut lurus adalah 180°. Alasannya adalah aturan sudut berseberangan: garis melalui satu titik sudut yang sejajar sisi di hadapannya menyalin dua sudut lainnya di sebelah sudut puncak, sehingga mengisi garis lurus.' },
      ],
    },
  },
};
