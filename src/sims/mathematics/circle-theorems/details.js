// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'State and apply the angle theorems of a circle: inscribed angle = ½ central angle, angles in the same segment are equal, the angle in a semicircle is 90°, and opposite angles of a cyclic quadrilateral sum to 180°.',
      'Use the tangent theorems: a tangent is perpendicular to the radius at the point of contact, two tangents from an external point are equal, and the tangent–chord angle equals the inscribed angle in the alternate segment.',
      'Verify the intersecting-chords relation AX·XB = CX·XD by measurement and explain it with similar triangles.',
    ],
    id: [
      'Menyatakan dan menerapkan teorema sudut pada lingkaran: sudut keliling = ½ sudut pusat, sudut-sudut dalam tembereng yang sama besarnya sama, sudut dalam setengah lingkaran 90°, dan sudut berhadapan segi empat tali busur berjumlah 180°.',
      'Menggunakan teorema garis singgung: garis singgung tegak lurus jari-jari di titik singgung, dua garis singgung dari titik luar sama panjang, dan sudut antara garis singgung dan tali busur sama dengan sudut keliling di tembereng berseberangan.',
      'Memverifikasi hubungan tali busur berpotongan AX·XB = CX·XD melalui pengukuran dan menjelaskannya dengan segitiga sebangun.',
    ],
  },
  tryThis: {
    en: [
      'In Inscribed vs central, drag P anywhere along the major arc. Does ∠APB change? Now drag P onto the minor arc between A and B and read the new relation.',
      'In Cyclic quadrilateral, drag one vertex until the shape looks like a kite or a trapezium. Do the opposite angles still add to 180°?',
      'In Intersecting chords, slide A so that AX gets very short. What happens to XB, CX and XD to keep the products equal?',
      'In Two tangents, drag P far away from the circle. What angle do the two tangents make, and what happens to ∠T₁OT₂?',
    ],
    id: [
      'Pada mode Sudut keliling vs pusat, geser P di mana saja sepanjang busur besar. Apakah ∠APB berubah? Sekarang geser P ke busur kecil di antara A dan B dan baca hubungan barunya.',
      'Pada mode Segi empat tali busur, geser satu titik sudut sampai bentuknya mirip layang-layang atau trapesium. Apakah sudut berhadapannya masih berjumlah 180°?',
      'Pada mode Tali busur berpotongan, geser A sehingga AX menjadi sangat pendek. Apa yang terjadi pada XB, CX dan XD agar hasil kalinya tetap sama?',
      'Pada mode Dua garis singgung, geser P jauh dari lingkaran. Berapa sudut antara kedua garis singgung, dan apa yang terjadi pada ∠T₁OT₂?',
    ],
  },

  learn: {
    background: {
      en: [
        'All the circle theorems grow out of one fact: every radius has the same length, so any triangle with two vertices on the circle and one at the centre O is isosceles. Take a point P on the circle and a chord AB. The inscribed angle ∠APB subtends the arc AB that does not contain P, and the central angle ∠AOB subtends the same arc. Splitting each with the diameter through P gives two isosceles triangles whose exterior angles at O are exactly twice the base angles at P, so ∠AOB = 2·∠APB. In the sim, drag P and watch ∠APB stay fixed while the central angle stays at double its value.',
        'Three famous results follow immediately. Angles in the same segment: two inscribed angles on the same arc both equal half the same central angle, so they are equal (if P and Q are on opposite arcs the two angles are supplementary instead). Angle in a semicircle: when AB is a diameter the central angle is 180°, so every inscribed angle on it is 90°, a result known as Thales\' theorem. Cyclic quadrilateral: the angles at opposite vertices A and C subtend arcs that together make the whole circle (360°), so ∠A + ∠C = ½·360° = 180°, and likewise ∠B + ∠D = 180°.',
        'A tangent touches the circle at one point T and is perpendicular to the radius OT. From an external point P you can draw exactly two tangents, and the right triangles OPT₁ and OPT₂ share the hypotenuse OP and have equal legs OT₁ = OT₂ = r, so PT₁ = PT₂ = √(OP² − r²). The alternate segment theorem says the angle between a tangent and a chord TA equals the inscribed angle that TA subtends on the far side of the chord. Both angles equal half the arc TA cut off on the tangent\'s side.',
        'When two chords AB and CD cross at a point X inside the circle, triangles AXC and DXB are similar: they share the vertical angle at X and ∠CAB = ∠CDB because both are inscribed angles on arc CB. Matching sides give AX/DX = CX/BX, so AX·XB = CX·XD. The product is called the power of the point X and depends only on where X is, not on which chord you draw through it. In the sim the lengths are measured in units with radius r = 5, so the products should agree to within rounding.',
      ],
      id: [
        'Semua teorema lingkaran tumbuh dari satu fakta: setiap jari-jari sama panjang, sehingga segitiga dengan dua titik sudut pada lingkaran dan satu di pusat O selalu sama kaki. Ambil titik P pada lingkaran dan tali busur AB. Sudut keliling ∠APB menghadap busur AB yang tidak memuat P, dan sudut pusat ∠AOB menghadap busur yang sama. Membelah masing-masing dengan diameter melalui P menghasilkan dua segitiga sama kaki yang sudut luarnya di O tepat dua kali sudut alas di P, sehingga ∠AOB = 2·∠APB. Di simulasi, geser P dan perhatikan ∠APB tetap sementara sudut pusat tetap dua kali lipatnya.',
        'Tiga hasil terkenal langsung mengikuti. Sudut dalam tembereng yang sama: dua sudut keliling pada busur yang sama keduanya sama dengan setengah sudut pusat yang sama, jadi besarnya sama (jika P dan Q berada di busur yang berlawanan, kedua sudut itu berpelurus). Sudut dalam setengah lingkaran: jika AB diameter, sudut pusatnya 180°, sehingga setiap sudut keliling padanya 90°, hasil yang dikenal sebagai teorema Thales. Segi empat tali busur: sudut di titik sudut berhadapan A dan C menghadap busur yang bersama-sama membentuk seluruh lingkaran (360°), sehingga ∠A + ∠C = ½·360° = 180°, dan demikian pula ∠B + ∠D = 180°.',
        'Garis singgung menyentuh lingkaran di satu titik T dan tegak lurus jari-jari OT. Dari titik luar P dapat ditarik tepat dua garis singgung, dan segitiga siku-siku OPT₁ dan OPT₂ berbagi sisi miring OP serta memiliki kaki sama OT₁ = OT₂ = r, sehingga PT₁ = PT₂ = √(OP² − r²). Teorema tembereng berseberangan menyatakan sudut antara garis singgung dan tali busur TA sama dengan sudut keliling yang dihadapkan TA di sisi lain tali busur. Kedua sudut itu sama dengan setengah busur TA yang terpotong di sisi garis singgung.',
        'Jika dua tali busur AB dan CD berpotongan di titik X di dalam lingkaran, segitiga AXC dan DXB sebangun: keduanya berbagi sudut bertolak belakang di X dan ∠CAB = ∠CDB karena keduanya sudut keliling pada busur CB. Sisi-sisi yang bersesuaian memberi AX/DX = CX/BX, sehingga AX·XB = CX·XD. Hasil kali ini disebut kuasa titik X dan hanya bergantung pada letak X, bukan pada tali busur mana yang ditarik melaluinya. Di simulasi, panjang diukur dalam satuan dengan jari-jari r = 5, sehingga hasil kalinya harus sama dalam batas pembulatan.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the inscribed angle at P is half the central angle at O on the same arc AB (here 35° and 70°); it stays 35° wherever P moves on the major arc. Right: from an external point P the two tangent lengths are equal and each tangent is perpendicular to its radius.',
        id: 'Kiri: sudut keliling di P adalah setengah sudut pusat di O pada busur AB yang sama (di sini 35° dan 70°); besarnya tetap 35° ke mana pun P bergerak di busur besar. Kanan: dari titik luar P kedua panjang garis singgung sama dan setiap garis singgung tegak lurus jari-jarinya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // Left circle: centre (90,130) r=70. A,B at angles ±35° about the downward direction (central angle 70°); P at the top.
        const cx = 90, cy = 130, r = 70;
        const pt = (deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
        const [ax, ay] = pt(55), [bx, by] = pt(125), [px, py] = pt(-100);
        const f = (v) => v.toFixed(1);
        // Right circle: centre (270,120) r=50; P at (270, 215) → OP = 95, tangent length √(95²−50²) ≈ 80.8.
        const ox = 270, oy = 120, rr = 50, qx = 270, qy = 215;
        const d = qy - oy;                                   // 95
        const tLen = Math.sqrt(Math.max(0, d * d - rr * rr));   // ≈ 80.78
        const ang = Math.acos(rr / d);                        // angle T–O–P
        const t1 = [ox - rr * Math.sin(ang), oy + rr * Math.cos(ang)];
        const t2 = [ox + rr * Math.sin(ang), oy + rr * Math.cos(ang)];
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Inscribed and central angle on one arc; two equal tangents from a point', 'Sudut keliling dan sudut pusat pada satu busur; dua garis singgung sama panjang dari satu titik')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{fill:none;stroke:currentColor;stroke-width:1.5}.l{stroke:currentColor;stroke-width:1.2;fill:none;opacity:.8}.lbl{font:bold 11px system-ui,sans-serif}</style>
  <circle cx="${cx}" cy="${cy}" r="${r}" class="c"/>
  <path d="M${f(ax)} ${f(ay)} L${f(px)} ${f(py)} L${f(bx)} ${f(by)}" stroke="#f59e0b" stroke-width="2" fill="none"/>
  <path d="M${f(ax)} ${f(ay)} L${cx} ${cy} L${f(bx)} ${f(by)}" stroke="#38bdf8" stroke-width="2" fill="none"/>
  <path d="M${f(ax)} ${f(ay)} A${r} ${r} 0 0 1 ${f(bx)} ${f(by)}" stroke="#a78bfa" stroke-width="3" fill="none"/>
  <circle cx="${cx}" cy="${cy}" r="2.5" fill="currentColor"/>
  <circle cx="${f(ax)}" cy="${f(ay)}" r="3" fill="#a78bfa"/><circle cx="${f(bx)}" cy="${f(by)}" r="3" fill="#a78bfa"/><circle cx="${f(px)}" cy="${f(py)}" r="3.5" fill="#f59e0b"/>
  <text x="${f(ax + 6)}" y="${f(ay + 10)}" class="lbl">A</text><text x="${f(bx - 14)}" y="${f(by + 10)}" class="lbl">B</text>
  <text x="${f(px - 4)}" y="${f(py - 8)}" class="lbl">P</text><text x="${cx + 5}" y="${cy - 4}" class="lbl">O</text>
  <text x="${f(px - 10)}" y="${f(py + 26)}" fill="#f59e0b" class="lbl">35°</text>
  <text x="${cx - 10}" y="${cy + 26}" fill="#38bdf8" class="lbl">70°</text>
  <text x="18" y="222">∠AOB = 2·∠APB</text>
  <circle cx="${ox}" cy="${oy}" r="${rr}" class="c"/>
  <line x1="${qx}" y1="${qy}" x2="${f(t1[0])}" y2="${f(t1[1])}" stroke="#34d399" stroke-width="2"/>
  <line x1="${qx}" y1="${qy}" x2="${f(t2[0])}" y2="${f(t2[1])}" stroke="#34d399" stroke-width="2"/>
  <line x1="${ox}" y1="${oy}" x2="${f(t1[0])}" y2="${f(t1[1])}" class="l"/><line x1="${ox}" y1="${oy}" x2="${f(t2[0])}" y2="${f(t2[1])}" class="l"/>
  <line x1="${ox}" y1="${oy}" x2="${qx}" y2="${qy}" class="l" stroke-dasharray="3 3"/>
  <circle cx="${ox}" cy="${oy}" r="2.5" fill="currentColor"/><circle cx="${qx}" cy="${qy}" r="3.5" fill="#34d399"/>
  <circle cx="${f(t1[0])}" cy="${f(t1[1])}" r="3" fill="#34d399"/><circle cx="${f(t2[0])}" cy="${f(t2[1])}" r="3" fill="#34d399"/>
  <text x="${ox + 5}" y="${oy - 4}" class="lbl">O</text><text x="${qx + 6}" y="${qy + 4}" class="lbl">P</text>
  <text x="${f(t1[0] - 16)}" y="${f(t1[1] - 4)}" class="lbl">T₁</text><text x="${f(t2[0] + 6)}" y="${f(t2[1] - 4)}" class="lbl">T₂</text>
  <text x="212" y="40" fill="#34d399">PT₁ = PT₂ = √(OP² − r²)</text>
  <text x="212" y="54" fill="#34d399">= √(${d}² − ${rr}²) ≈ ${tLen.toFixed(1)}</text>
  <text x="300" y="150">OT ⟂ PT</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Inscribed angle theorem: an angle at the circumference is half the angle at the centre standing on the same arc, ∠APB = ½∠AOB.',
        'Angles in the same segment are equal; the angle in a semicircle is 90° because the central angle is 180°.',
        'In a cyclic quadrilateral opposite angles are supplementary: ∠A + ∠C = ∠B + ∠D = 180°.',
        'A tangent is perpendicular to the radius at the point of contact, and two tangents from an external point are equal in length.',
        'Alternate segment theorem: the angle between a tangent and a chord equals the inscribed angle on the opposite side of the chord.',
        'Intersecting chords: AX·XB = CX·XD, a consequence of the similar triangles AXC and DXB.',
      ],
      id: [
        'Teorema sudut keliling: sudut di keliling lingkaran adalah setengah sudut di pusat yang menghadap busur yang sama, ∠APB = ½∠AOB.',
        'Sudut-sudut dalam tembereng yang sama besarnya sama; sudut dalam setengah lingkaran 90° karena sudut pusatnya 180°.',
        'Dalam segi empat tali busur, sudut berhadapan saling berpelurus: ∠A + ∠C = ∠B + ∠D = 180°.',
        'Garis singgung tegak lurus jari-jari di titik singgung, dan dua garis singgung dari satu titik luar sama panjang.',
        'Teorema tembereng berseberangan: sudut antara garis singgung dan tali busur sama dengan sudut keliling di sisi lain tali busur.',
        'Tali busur berpotongan: AX·XB = CX·XD, akibat dari kesebangunan segitiga AXC dan DXB.',
      ],
    },
    vocabulary: {
      en: [
        ['Chord', 'A line segment joining two points on a circle. A chord through the centre is a diameter.'],
        ['Arc', 'A part of the circumference between two points; the minor arc is the shorter one, the major arc the longer one.'],
        ['Central angle', 'An angle with its vertex at the centre O; it equals the arc (in degrees) it cuts off.'],
        ['Inscribed angle', 'An angle with its vertex on the circle whose arms are chords; also called an angle at the circumference.'],
        ['Segment', 'The region between a chord and an arc. Two inscribed angles are "in the same segment" when they lie on the same side of the chord.'],
        ['Cyclic quadrilateral', 'A four-sided figure whose four vertices all lie on one circle.'],
        ['Tangent', 'A line that touches the circle at exactly one point, the point of contact.'],
        ['Power of a point', 'For a point X, the constant product AX·XB for any chord AB through X.'],
      ],
      id: [
        ['Tali busur', 'Ruas garis yang menghubungkan dua titik pada lingkaran. Tali busur yang melalui pusat disebut diameter.'],
        ['Busur', 'Bagian keliling lingkaran di antara dua titik; busur kecil adalah yang lebih pendek, busur besar yang lebih panjang.'],
        ['Sudut pusat', 'Sudut dengan titik sudut di pusat O; besarnya sama dengan busur (dalam derajat) yang dipotongnya.'],
        ['Sudut keliling', 'Sudut dengan titik sudut pada lingkaran dan kaki-kakinya berupa tali busur.'],
        ['Tembereng', 'Daerah antara tali busur dan busur. Dua sudut keliling "dalam tembereng yang sama" jika berada di sisi yang sama dari tali busur.'],
        ['Segi empat tali busur', 'Bangun bersisi empat yang keempat titik sudutnya terletak pada satu lingkaran.'],
        ['Garis singgung', 'Garis yang menyentuh lingkaran tepat di satu titik, yaitu titik singgung.'],
        ['Kuasa titik', 'Untuk titik X, hasil kali tetap AX·XB untuk sembarang tali busur AB yang melalui X.'],
      ],
    },
    misconceptions: {
      en: [
        ['The inscribed angle is always half of the central angle ∠AOB that is less than 180°.', 'It is half of the central angle on the arc opposite P. If P lies on the minor arc, the relevant central angle is the reflex one (greater than 180°), and the inscribed angle is 180° minus half the smaller central angle. Drag P onto the minor arc to see this.'],
        ['The angle in a semicircle is 90° only when P is at the top of the circle.', 'It is 90° for every position of P on the circle (other than A and B). The sim lets you drag P anywhere to confirm.'],
        ['Any quadrilateral has opposite angles adding to 180°.', 'Only cyclic ones do. A general parallelogram that is not a rectangle has opposite angles equal, not supplementary, and cannot be inscribed in a circle.'],
        ['For intersecting chords the sums AX + XB and CX + XD are equal.', 'The products are equal, not the sums. Two chords of different lengths can still cross with AX·XB = CX·XD.'],
        ['The tangent–chord angle equals the inscribed angle on the same side as the angle.', 'It equals the inscribed angle in the alternate (opposite) segment. The angle on the same side is its supplement.'],
      ],
      id: [
        ['Sudut keliling selalu setengah dari sudut pusat ∠AOB yang kurang dari 180°.', 'Ia setengah dari sudut pusat pada busur yang berseberangan dengan P. Jika P terletak di busur kecil, sudut pusat yang relevan adalah sudut refleks (lebih dari 180°), dan sudut kelilingnya adalah 180° dikurangi setengah sudut pusat yang kecil. Geser P ke busur kecil untuk melihatnya.'],
        ['Sudut dalam setengah lingkaran 90° hanya jika P berada di puncak lingkaran.', 'Sudutnya 90° untuk setiap posisi P pada lingkaran (selain A dan B). Simulasi membolehkan P digeser ke mana saja untuk memastikannya.'],
        ['Setiap segi empat memiliki sudut berhadapan yang berjumlah 180°.', 'Hanya segi empat tali busur. Jajaran genjang yang bukan persegi panjang memiliki sudut berhadapan yang sama, bukan berpelurus, dan tidak bisa dilukis di dalam lingkaran.'],
        ['Untuk tali busur berpotongan, jumlah AX + XB dan CX + XD sama.', 'Yang sama adalah hasil kalinya, bukan jumlahnya. Dua tali busur dengan panjang berbeda tetap bisa berpotongan dengan AX·XB = CX·XD.'],
        ['Sudut antara garis singgung dan tali busur sama dengan sudut keliling di sisi yang sama dengan sudut itu.', 'Ia sama dengan sudut keliling di tembereng berseberangan (sisi lain). Sudut di sisi yang sama adalah pelurusnya.'],
      ],
    },
    realWorld: {
      en: [
        'Surveyors and sailors fix a position with the "danger circle": every point from which two landmarks appear at the same angle lies on one circle, by the angles-in-the-same-segment theorem.',
        'A carpenter\'s square placed inside a circular pipe with its corner on the wall touches the pipe at two ends of a diameter (angle in a semicircle), a quick way to find the centre.',
        'Camera and stadium designers use inscribed angles: every seat on a circular arc through the two goal posts sees the goal at the same angle.',
        'Satellite horizons are tangent lines: the distance from a satellite to its horizon is √(OP² − r²), the two-tangents length, where OP is the distance to Earth\'s centre.',
        'Gear and pulley belts run along tangents to each wheel, which is why the belt leaves each wheel at right angles to the radius.',
      ],
      id: [
        'Juru ukur dan pelaut menentukan posisi dengan "lingkaran bahaya": setiap titik yang melihat dua tengara dengan sudut yang sama terletak pada satu lingkaran, berdasarkan teorema sudut dalam tembereng yang sama.',
        'Siku tukang kayu yang diletakkan di dalam pipa bundar dengan sudutnya di dinding menyentuh pipa di dua ujung diameter (sudut dalam setengah lingkaran), cara cepat menemukan pusat.',
        'Perancang kamera dan stadion memakai sudut keliling: setiap kursi pada busur lingkaran yang melalui kedua tiang gawang melihat gawang dengan sudut yang sama.',
        'Horizon satelit adalah garis singgung: jarak satelit ke horizonnya adalah √(OP² − r²), panjang dua garis singgung, dengan OP jarak ke pusat Bumi.',
        'Sabuk roda gigi dan katrol berjalan sepanjang garis singgung setiap roda, itulah sebabnya sabuk meninggalkan roda tegak lurus terhadap jari-jari.',
      ],
    },
    questions: {
      en: [
        { q: 'A, B and P lie on a circle with centre O. If ∠AOB = 140° and P is on the major arc, what is ∠APB? What is it if P is on the minor arc?', a: 'On the major arc ∠APB = ½·140° = 70°. On the minor arc the inscribed angle stands on the reflex central angle 360° − 140° = 220°, so ∠APB = 110° (= 180° − 70°).' },
        { q: 'Chords AB and CD cross at X with AX = 3, XB = 8 and CX = 4. Find XD.', a: 'AX·XB = CX·XD gives 3·8 = 4·XD, so XD = 6.' },
        { q: 'A point P is 13 cm from the centre of a circle of radius 5 cm. How long is each tangent from P, and what is the angle between the two tangents?', a: 'PT = √(13² − 5²) = √144 = 12 cm. In right triangle OTP, sin(∠OPT) = 5/13, so ∠OPT ≈ 22.6° and the angle between the tangents is 2·22.6° ≈ 45.2°.' },
        { q: 'In cyclic quadrilateral ABCD, ∠A = 95° and ∠B = 70°. Find ∠C and ∠D, and explain why the figure could not be a parallelogram.', a: '∠C = 180° − 95° = 85° and ∠D = 180° − 70° = 110°. A parallelogram needs ∠A = ∠C, which would force both to be 90°; with ∠A = 95° that is impossible.' },
      ],
      id: [
        { q: 'A, B dan P terletak pada lingkaran berpusat O. Jika ∠AOB = 140° dan P berada di busur besar, berapa ∠APB? Berapa jika P berada di busur kecil?', a: 'Di busur besar ∠APB = ½·140° = 70°. Di busur kecil sudut keliling menghadap sudut pusat refleks 360° − 140° = 220°, sehingga ∠APB = 110° (= 180° − 70°).' },
        { q: 'Tali busur AB dan CD berpotongan di X dengan AX = 3, XB = 8 dan CX = 4. Tentukan XD.', a: 'AX·XB = CX·XD memberi 3·8 = 4·XD, sehingga XD = 6.' },
        { q: 'Titik P berjarak 13 cm dari pusat lingkaran berjari-jari 5 cm. Berapa panjang setiap garis singgung dari P, dan berapa sudut antara kedua garis singgung?', a: 'PT = √(13² − 5²) = √144 = 12 cm. Pada segitiga siku-siku OTP, sin(∠OPT) = 5/13, sehingga ∠OPT ≈ 22,6° dan sudut antara kedua garis singgung 2·22,6° ≈ 45,2°.' },
        { q: 'Pada segi empat tali busur ABCD, ∠A = 95° dan ∠B = 70°. Tentukan ∠C dan ∠D, dan jelaskan mengapa bangun itu tidak mungkin jajaran genjang.', a: '∠C = 180° − 95° = 85° dan ∠D = 180° − 70° = 110°. Jajaran genjang memerlukan ∠A = ∠C, yang memaksa keduanya 90°; dengan ∠A = 95° itu tidak mungkin.' },
      ],
    },
  },
};
