// Long-form text for the Angle Explorer sim (grades 5-6).
export default {
  objectives: {
    en: [
      'Measure an angle in degrees with a protractor and name it acute, right, obtuse, straight or reflex.',
      'Show that the three angles inside any triangle add up to 180°.',
      'Find the four angles where two straight lines cross, and explain why the opposite angles are equal.',
    ],
    id: [
      'Mengukur besar sudut dalam derajat dengan busur derajat dan menamainya lancip, siku-siku, tumpul, lurus atau refleks.',
      'Menunjukkan bahwa jumlah ketiga sudut dalam segitiga apa pun adalah 180°.',
      'Menentukan keempat sudut pada dua garis yang berpotongan, dan menjelaskan mengapa sudut yang bertolak belakang sama besar.',
    ],
  },
  tryThis: {
    en: [
      'Drag the arm slowly from 0° to 180°. Say the name of the angle out loud each time the colour changes.',
      'Turn off "Show degrees", press "Surprise me", and guess the angle. Turn the degrees back on to check.',
      'In Triangle mode, drag corner C far away so angle C becomes tiny. What happens to A and B? What is the sum?',
      'In Two crossing lines, turn the yellow line until angle a is 90°. What are the other three angles?',
    ],
    id: [
      'Geser lengan perlahan dari 0° ke 180°. Sebutkan nama sudutnya setiap kali warnanya berubah.',
      'Matikan "Tampilkan derajat", tekan "Acak", dan tebak besar sudutnya. Nyalakan lagi derajatnya untuk memeriksa.',
      'Di mode Segitiga, tarik titik C jauh-jauh sehingga sudut C menjadi sangat kecil. Apa yang terjadi pada A dan B? Berapa jumlahnya?',
      'Di Dua garis berpotongan, putar garis kuning sampai sudut a tepat 90°. Berapa ketiga sudut lainnya?',
    ],
  },

  learn: {
    background: {
      en: [
        'An angle is the amount of turn between two arms that meet at a point called the vertex. We measure it in degrees. A full turn is 360°, half a turn is 180°, and a quarter turn, the corner of a square, is 90°. In the sim one arm stays still and you turn the other one. The circle of little marks around the vertex is a protractor: every small mark is 5°, every long mark is 30°.',
        'Angles get names from their size. An acute angle is smaller than 90°, like the tip of a slice of pizza. A right angle is exactly 90° and is shown with a little square in the corner. An obtuse angle is bigger than 90° but smaller than 180°. A straight angle is exactly 180°: the two arms make one straight line. A reflex angle is bigger than 180°, all the way up to 360°. The sim colours each kind differently so you can see the change.',
        'A triangle has three corners, so it has three angles. Drag the corners anywhere you like: the three angles change, but they always add up to exactly 180°. Make one angle bigger and the other two get smaller to make room. If one angle is 90° we call it a right triangle; if one angle is bigger than 90° it is an obtuse triangle; if all three are smaller than 90° it is an acute triangle.',
        'When two straight lines cross they make four angles. The angles opposite each other, a and c, are always equal, and so are b and d. Two angles next to each other, like a and b, sit on a straight line, so they add up to 180°. Turn one line in the sim and watch all four numbers change together: a and c stay equal, and a + b stays 180°.',
      ],
      id: [
        'Sudut adalah besar putaran antara dua lengan yang bertemu di satu titik yang disebut titik sudut. Kita mengukurnya dalam derajat. Satu putaran penuh adalah 360°, setengah putaran 180°, dan seperempat putaran, yaitu pojok persegi, adalah 90°. Di simulasi, satu lengan diam dan kamu memutar lengan yang lain. Lingkaran tanda kecil di sekitar titik sudut adalah busur derajat: setiap tanda kecil bernilai 5°, setiap tanda panjang 30°.',
        'Sudut diberi nama menurut besarnya. Sudut lancip lebih kecil dari 90°, seperti ujung potongan pizza. Sudut siku-siku tepat 90° dan ditandai dengan kotak kecil di pojoknya. Sudut tumpul lebih besar dari 90° tetapi lebih kecil dari 180°. Sudut lurus tepat 180°: kedua lengan membentuk satu garis lurus. Sudut refleks lebih besar dari 180°, sampai 360°. Simulasi memberi warna berbeda untuk setiap jenis agar perubahannya terlihat.',
        'Segitiga punya tiga pojok, jadi punya tiga sudut. Tarik titik sudutnya ke mana saja: ketiga sudut berubah, tetapi jumlahnya selalu tepat 180°. Perbesar satu sudut, maka dua sudut lainnya mengecil untuk memberi tempat. Jika satu sudutnya 90°, segitiga itu disebut segitiga siku-siku; jika satu sudutnya lebih dari 90°, segitiga tumpul; jika ketiganya kurang dari 90°, segitiga lancip.',
        'Dua garis lurus yang berpotongan membentuk empat sudut. Sudut yang saling berhadapan, a dan c, selalu sama besar, begitu juga b dan d. Dua sudut yang bersebelahan, seperti a dan b, terletak pada satu garis lurus, sehingga jumlahnya 180°. Putar satu garis di simulasi dan lihat keempat angka berubah bersama: a dan c tetap sama, dan a + b tetap 180°.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: a protractor reads an angle of 120°, an obtuse angle, because it is between 90° and 180°. Right: a triangle with angles 60°, 50° and 70°; they add to 180°.',
        id: 'Kiri: busur derajat membaca sudut 120°, sudut tumpul, karena berada di antara 90° dan 180°. Kanan: segitiga dengan sudut 60°, 50° dan 70°; jumlahnya 180°.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cx = 95, cy = 150, R = 75;
        const pt = (deg, r) => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)];
        let ticks = '';
        for (let d = 0; d <= 180; d += 10) {
          const major = d % 30 === 0;
          const [x1, y1] = pt(d, R - (major ? 12 : 7));
          const [x2, y2] = pt(d, R);
          ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="currentColor" stroke-width="${major ? 1.5 : 0.8}"/>`;
          if (major) {
            const [tx, ty] = pt(d, R + 12);
            ticks += `<text x="${tx.toFixed(1)}" y="${(ty + 4).toFixed(1)}" class="s">${d}</text>`;
          }
        }
        const [ax, ay] = pt(120, R * 0.95);
        const [sx, sy] = pt(120, 40);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A protractor reading 120 degrees and a triangle whose angles add to 180 degrees', 'Busur derajat membaca 120 derajat dan segitiga yang jumlah sudutnya 180 derajat')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font:9px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.t{font:bold 12px system-ui,sans-serif;text-anchor:middle}</style>
  <path d="M${cx - R} ${cy} A${R} ${R} 0 0 1 ${cx + R} ${cy} Z" fill="none" stroke="currentColor" stroke-width="1" opacity=".5"/>
  ${ticks}
  <path d="M${cx} ${cy} L${cx + 40} ${cy} A40 40 0 0 0 ${sx.toFixed(1)} ${sy.toFixed(1)} Z" fill="#fb923c" opacity=".45"/>
  <line x1="${cx}" y1="${cy}" x2="${cx + R * 0.95}" y2="${cy}" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy}" x2="${ax.toFixed(1)}" y2="${ay.toFixed(1)}" stroke="#fb923c" stroke-width="3" stroke-linecap="round"/>
  <circle cx="${cx}" cy="${cy}" r="3" fill="currentColor"/>
  <text x="${cx}" y="${cy + 24}" class="t" fill="#fb923c">120°</text>
  <text x="${cx}" y="${cy + 40}" class="t" fill="#fb923c">${L('obtuse angle', 'sudut tumpul')}</text>
  <text x="${cx}" y="${cy + 56}" class="s">${L('between 90° and 180°', 'antara 90° dan 180°')}</text>
  <polygon points="215,170 335,170 264,85" fill="#38bdf8" opacity=".18" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <path d="M237 170 A22 22 0 0 0 226 151" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <path d="M313 170 A22 22 0 0 1 321 153" fill="none" stroke="#fb923c" stroke-width="2"/>
  <path d="M253 104 A22 22 0 0 0 278 102" fill="none" stroke="#a78bfa" stroke-width="2"/>
  <text x="246" y="162" class="t" fill="#38bdf8">60°</text>
  <text x="302" y="162" class="t" fill="#fb923c">50°</text>
  <text x="265" y="122" class="t" fill="#a78bfa">70°</text>
  <text x="208" y="186" class="t">A</text>
  <text x="342" y="186" class="t">B</text>
  <text x="264" y="78" class="t">C</text>
  <text x="275" y="208" class="t">60° + 50° + 70° = 180°</text>
  <text x="275" y="224" class="s">${L('the three angles of a triangle always add to 180°', 'tiga sudut segitiga selalu berjumlah 180°')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Angles are measured in degrees: a full turn is 360°, half a turn is 180°, a quarter turn is 90°.',
        'Acute means less than 90°; right means exactly 90°; obtuse means between 90° and 180°; straight means exactly 180°; reflex means more than 180°.',
        'The three angles of any triangle add up to 180°.',
        'When two lines cross, opposite angles are equal.',
        'Two angles next to each other on a straight line add up to 180°.',
      ],
      id: [
        'Sudut diukur dalam derajat: satu putaran penuh 360°, setengah putaran 180°, seperempat putaran 90°.',
        'Lancip berarti kurang dari 90°; siku-siku tepat 90°; tumpul antara 90° dan 180°; lurus tepat 180°; refleks lebih dari 180°.',
        'Jumlah ketiga sudut segitiga apa pun adalah 180°.',
        'Jika dua garis berpotongan, sudut yang bertolak belakang sama besar.',
        'Dua sudut yang bersebelahan pada satu garis lurus berjumlah 180°.',
      ],
    },
    vocabulary: {
      en: [
        ['Angle', 'The amount of turn between two arms that meet at a point.'],
        ['Vertex', 'The point where the two arms of an angle meet.'],
        ['Degree (°)', 'The unit for measuring angles. A full turn is 360 degrees.'],
        ['Protractor', 'A tool with degree marks for measuring angles.'],
        ['Right angle', 'An angle of exactly 90°, like the corner of a book.'],
        ['Opposite angles', 'The two angles facing each other where two lines cross. They are always equal.'],
      ],
      id: [
        ['Sudut', 'Besar putaran antara dua lengan yang bertemu di satu titik.'],
        ['Titik sudut', 'Titik tempat kedua lengan sudut bertemu.'],
        ['Derajat (°)', 'Satuan untuk mengukur sudut. Satu putaran penuh adalah 360 derajat.'],
        ['Busur derajat', 'Alat dengan tanda derajat untuk mengukur sudut.'],
        ['Sudut siku-siku', 'Sudut yang besarnya tepat 90°, seperti pojok buku.'],
        ['Sudut bertolak belakang', 'Dua sudut yang saling berhadapan di perpotongan dua garis. Keduanya selalu sama besar.'],
      ],
    },
    misconceptions: {
      en: [
        ['An angle with longer arms is a bigger angle.', 'No. The angle is the amount of turn between the arms, not their length. In the sim the arms never change length, yet the angle goes from 0° to 359°.'],
        ['A big, wide triangle has angles that add to more than 180°.', 'The size of the triangle does not matter. Stretch the triangle as much as you like: the sum stays at exactly 180°.'],
        ['When two lines cross, all four angles are equal.', 'Only the opposite pairs are equal. a equals c and b equals d. All four are equal only when the lines cross at right angles, so each is 90°.'],
      ],
      id: [
        ['Sudut dengan lengan lebih panjang adalah sudut yang lebih besar.', 'Tidak. Sudut adalah besar putaran antara lengan, bukan panjangnya. Di simulasi, panjang lengan tidak pernah berubah, tetapi sudutnya berubah dari 0° sampai 359°.'],
        ['Segitiga yang besar dan lebar punya jumlah sudut lebih dari 180°.', 'Ukuran segitiga tidak berpengaruh. Tarik segitiga sebesar apa pun: jumlahnya tetap tepat 180°.'],
        ['Jika dua garis berpotongan, keempat sudutnya sama besar.', 'Hanya pasangan yang bertolak belakang yang sama. a sama dengan c dan b sama dengan d. Keempatnya sama besar hanya jika garisnya berpotongan tegak lurus, sehingga masing-masing 90°.'],
      ],
    },
    realWorld: {
      en: [
        'The hands of a clock make an angle: at 3 o\'clock it is a right angle, at 6 o\'clock a straight angle.',
        'Carpenters check that a table corner is a right angle, 90°, with a square-shaped tool.',
        'Roof trusses are triangles, and builders use the 180° rule to work out the angle to cut each beam.',
        'Where two roads cross, the opposite corners have the same angle, which is why the corner plots are the same shape.',
      ],
      id: [
        'Jarum jam membentuk sudut: pada pukul 3 sudutnya siku-siku, pada pukul 6 sudutnya lurus.',
        'Tukang kayu memeriksa bahwa pojok meja adalah sudut siku-siku, 90°, dengan alat berbentuk siku.',
        'Rangka atap berbentuk segitiga, dan tukang bangunan memakai aturan 180° untuk menentukan sudut potong setiap balok.',
        'Di perempatan dua jalan, pojok yang berhadapan punya sudut yang sama, itulah sebabnya kaveling di pojok itu bentuknya sama.',
      ],
    },
    questions: {
      en: [
        { q: 'An angle measures 135°. Is it acute, right, obtuse or reflex?', a: 'Obtuse, because 135° is more than 90° but less than 180°.' },
        { q: 'Two angles of a triangle are 40° and 65°. What is the third angle?', a: '180° − 40° − 65° = 75°.' },
        { q: 'Two lines cross and one of the angles is 30°. What are the other three?', a: 'The opposite angle is also 30°. The two angles next to it are each 180° − 30° = 150°.' },
      ],
      id: [
        { q: 'Sebuah sudut besarnya 135°. Apakah lancip, siku-siku, tumpul atau refleks?', a: 'Tumpul, karena 135° lebih dari 90° tetapi kurang dari 180°.' },
        { q: 'Dua sudut segitiga besarnya 40° dan 65°. Berapa sudut ketiga?', a: '180° − 40° − 65° = 75°.' },
        { q: 'Dua garis berpotongan dan salah satu sudutnya 30°. Berapa ketiga sudut lainnya?', a: 'Sudut yang bertolak belakang juga 30°. Dua sudut di sebelahnya masing-masing 180° − 30° = 150°.' },
      ],
    },
  },
};
