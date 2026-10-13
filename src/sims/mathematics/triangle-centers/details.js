// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify centroid (medians), circumcenter (perpendicular bisectors), incenter (angle bisectors), orthocenter (altitudes).',
      'See the Euler line: centroid, circumcenter, orthocenter are collinear.',
      'Recognize that for equilateral triangles all four centers coincide.',
    ],
    id: [
      'Mengenali sentroid (median), sirkumsenter (garis bagi tegak lurus), insenter (garis bagi sudut), ortosenter (garis tinggi).',
      'Melihat garis Euler: sentroid, sirkumsenter, dan ortosenter segaris.',
      'Mengenali bahwa pada segitiga sama sisi keempat pusat berimpit.',
    ],
  },  tryThis: {
    en: [
      'Make an equilateral triangle — do all four centers stack?',
      'Drag to make an obtuse triangle — does the orthocenter step outside?',
      'Find the Euler line — does the incenter sit on it?',
    ],
    id: [
      'Buat segitiga sama sisi — apakah keempat pusat berimpit?',
      'Buat segitiga tumpul — apakah ortosenter keluar dari segitiga?',
      'Cari garis Euler — apakah insenter berada di sana?',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A triangle has no single obvious middle, so geometers have defined several, each from a different set of three lines that always meet at one point. Join each corner to the midpoint of the opposite side and the three medians meet at the centroid G, the balance point of a cardboard triangle. Draw the perpendicular bisector of each side and they meet at the circumcenter O, the only point equally far from all three corners, so a circle centred there passes through all of them. Bisect each angle and the bisectors meet at the incenter I, the point equally far from all three sides, the centre of the largest circle that fits inside. Drop a perpendicular from each corner to the opposite side and these altitudes meet at the orthocenter H.',
        'The simulation lets you drag the red corners A, B and C anywhere and recomputes the four centres instantly. The toggles switch each centre on or off, and the circumcenter and incenter also show their circles. Watch what happens as the shape changes: the centroid and incenter always stay inside, but the circumcenter and orthocenter wander outside whenever an angle passes 90°. For a right triangle the circumcenter lands exactly on the midpoint of the hypotenuse and the orthocenter lands on the right-angled corner.',
        'The most surprising fact is that three of these points are always in a straight line. The dashed Euler line passes through the orthocenter H, the centroid G and the circumcenter O, with G always lying between the other two and exactly twice as far from H as from O. The sim uses this relation to find H: it computes O first and then places H so that G sits one third of the way from O to H. The incenter is the odd one out; it lies on the Euler line only when the triangle is isosceles. For an equilateral triangle all four centres collapse to one point and the Euler line disappears.',
        'Keep in mind what the sim leaves out. It shows the centres but not the medians, bisectors or altitudes that define them, so you have to picture those lines yourself. Corners are clamped inside the canvas, and if you drag the three points almost into a straight line the circumcenter and orthocenter fly off far away and are no longer drawn, because a nearly flat triangle has an enormous circumcircle. Only four of the many known triangle centres are shown; the nine-point circle, for example, is not.',
      ],
      id: [
        'Segitiga tidak punya satu titik tengah yang jelas, sehingga para ahli geometri mendefinisikan beberapa, masing-masing dari tiga garis yang selalu berpotongan di satu titik. Hubungkan setiap titik sudut ke titik tengah sisi di hadapannya, maka tiga garis berat (median) bertemu di sentroid G, titik keseimbangan segitiga dari karton. Gambar garis sumbu tiap sisi (garis bagi tegak lurus), maka ketiganya bertemu di sirkumsenter O, satu-satunya titik yang berjarak sama ke ketiga titik sudut, sehingga lingkaran berpusat di sana melalui ketiganya. Bagi dua setiap sudut, maka garis-garis bagi sudut bertemu di insenter I, titik yang berjarak sama ke ketiga sisi, pusat lingkaran terbesar yang muat di dalam. Tarik garis tegak lurus dari tiap titik sudut ke sisi di hadapannya, maka garis-garis tinggi ini bertemu di ortosenter H.',
        'Simulasi ini membolehkan kamu menyeret titik sudut merah A, B, dan C ke mana saja dan langsung menghitung ulang keempat pusat. Tombol-tombol menyalakan atau mematikan tiap pusat, dan sirkumsenter serta insenter juga menampilkan lingkarannya. Perhatikan yang terjadi saat bentuknya berubah: sentroid dan insenter selalu berada di dalam, tetapi sirkumsenter dan ortosenter keluar dari segitiga begitu salah satu sudut melewati 90°. Pada segitiga siku-siku, sirkumsenter tepat jatuh di titik tengah sisi miring dan ortosenter jatuh di titik sudut siku-sikunya.',
        'Fakta yang paling mengejutkan: tiga dari titik-titik ini selalu segaris. Garis Euler yang putus-putus melewati ortosenter H, sentroid G, dan sirkumsenter O, dengan G selalu berada di antara keduanya dan jaraknya ke H tepat dua kali jaraknya ke O. Sim memakai hubungan ini untuk mencari H: ia menghitung O dulu lalu menempatkan H sehingga G berada sepertiga jalan dari O ke H. Insenter adalah pengecualian; ia hanya berada pada garis Euler jika segitiganya sama kaki. Pada segitiga sama sisi keempat pusat berimpit menjadi satu titik dan garis Euler menghilang.',
        'Ingat apa yang tidak ditampilkan sim. Ia menunjukkan pusat-pusatnya tetapi tidak menggambar garis berat, garis bagi, atau garis tinggi yang mendefinisikannya, jadi kamu harus membayangkan garis-garis itu sendiri. Titik sudut dibatasi agar tetap di dalam kanvas, dan jika ketiga titik diseret hampir segaris, sirkumsenter dan ortosenter melesat sangat jauh dan tidak lagi digambar, karena segitiga yang hampir pipih punya lingkaran luar yang amat besar. Hanya empat dari banyak pusat segitiga yang dikenal yang ditampilkan; lingkaran sembilan titik, misalnya, tidak.',
      ],
    },
    figure: {
      caption: {
        en: 'One scalene triangle with its four centres. The centroid G, circumcenter O and orthocenter H lie on the dashed Euler line, with HG twice as long as GO; the incenter I (with its incircle) sits off the line.',
        id: 'Satu segitiga sembarang dengan keempat pusatnya. Sentroid G, sirkumsenter O, dan ortosenter H terletak pada garis Euler yang putus-putus, dengan HG dua kali panjang GO; insenter I (dengan lingkaran dalamnya) berada di luar garis itu.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Four centres of a triangle and the Euler line', 'Empat pusat segitiga dan garis Euler')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.4}.t{fill:#3b82f6;fill-opacity:.08;stroke:#3b82f6;stroke-width:2}</style>
  <polygon points="40,200 300,200 110,50" class="t"/>
  <line x1="110" y1="50" x2="170" y2="200" class="m"/>
  <line x1="110" y1="50" x2="110" y2="200" class="m"/>
  <line x1="170" y1="200" x2="170" y2="130" class="m"/>
  <text x="172" y="122" opacity=".6">${L('perp. bisector', 'garis sumbu')}</text>
  <text x="112" y="80" opacity=".6">${L('altitude', 'garis tinggi')}</text>
  <text x="148" y="190" opacity=".6">${L('median', 'median')}</text>
  <circle cx="131.7" cy="141.6" r="58.4" fill="none" stroke="#8b5cf6" stroke-width="1.2" opacity=".6"/>
  <line x1="70" y1="72.7" x2="230" y2="227.3" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="5 4"/>
  <text x="188" y="214" fill="#f59e0b">${L('Euler line', 'garis Euler')}</text>
  <circle cx="110" cy="111.3" r="5" fill="#ef4444"/>
  <text x="92" y="108" fill="#ef4444">H</text>
  <circle cx="150" cy="150" r="5" fill="#10b981"/>
  <text x="156" y="148" fill="#10b981">G</text>
  <circle cx="170" cy="169.3" r="5" fill="#f59e0b"/>
  <text x="177" y="174" fill="#f59e0b">O</text>
  <circle cx="131.7" cy="141.6" r="5" fill="#8b5cf6"/>
  <text x="118" y="140" fill="#8b5cf6">I</text>
  <circle cx="40" cy="200" r="4" fill="#3b82f6"/>
  <circle cx="300" cy="200" r="4" fill="#3b82f6"/>
  <circle cx="110" cy="50" r="4" fill="#3b82f6"/>
  <text x="28" y="218">A</text>
  <text x="298" y="218">B</text>
  <text x="104" y="42">C</text>
  <text x="240" y="22" fill="#10b981">G ${L('centroid', 'sentroid')}</text>
  <text x="240" y="38" fill="#f59e0b">O ${L('circumcenter', 'sirkumsenter')}</text>
  <text x="240" y="54" fill="#8b5cf6">I ${L('incenter', 'insenter')}</text>
  <text x="240" y="70" fill="#ef4444">H ${L('orthocenter', 'ortosenter')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Each centre comes from three special lines that always meet at a single point: medians, perpendicular bisectors, angle bisectors, or altitudes.',
        'The centroid and incenter always lie inside the triangle; the circumcenter and orthocenter move outside when the triangle is obtuse.',
        'The orthocenter, centroid and circumcenter are always collinear on the Euler line, with the centroid twice as close to the circumcenter as to the orthocenter.',
        'The incenter is generally not on the Euler line; it joins it only for isosceles triangles.',
        'In an equilateral triangle all four centres coincide.',
      ],
      id: [
        'Setiap pusat berasal dari tiga garis istimewa yang selalu bertemu di satu titik: garis berat, garis sumbu, garis bagi sudut, atau garis tinggi.',
        'Sentroid dan insenter selalu berada di dalam segitiga; sirkumsenter dan ortosenter keluar ketika segitiganya tumpul.',
        'Ortosenter, sentroid, dan sirkumsenter selalu segaris pada garis Euler, dengan sentroid dua kali lebih dekat ke sirkumsenter daripada ke ortosenter.',
        'Insenter umumnya tidak berada pada garis Euler; ia ikut segaris hanya pada segitiga sama kaki.',
        'Pada segitiga sama sisi keempat pusat berimpit.',
      ],
    },
    vocabulary: {
      en: [
        ['Median', 'A line from a corner to the midpoint of the opposite side; the three medians meet at the centroid.'],
        ['Centroid (G)', 'The intersection of the medians and the balance point of the triangle; it divides each median in the ratio 2 : 1.'],
        ['Perpendicular bisector', 'The line through the midpoint of a side at right angles to it; the three of them meet at the circumcenter.'],
        ['Circumcenter (O) and circumcircle', 'The point equally distant from all three corners, and the circle through the corners centred there.'],
        ['Angle bisector', 'A line that splits a corner angle into two equal halves; the three bisectors meet at the incenter.'],
        ['Incenter (I) and incircle', 'The point equally distant from all three sides, and the largest circle that fits inside the triangle, centred there.'],
        ['Altitude', 'A line from a corner perpendicular to the opposite side (extended if needed); the three altitudes meet at the orthocenter (H).'],
        ['Euler line', 'The straight line through the orthocenter, centroid and circumcenter of any non-equilateral triangle.'],
      ],
      id: [
        ['Garis berat (median)', 'Garis dari titik sudut ke titik tengah sisi di hadapannya; ketiga garis berat bertemu di sentroid.'],
        ['Sentroid (G)', 'Perpotongan garis-garis berat dan titik keseimbangan segitiga; ia membagi tiap garis berat dengan perbandingan 2 : 1.'],
        ['Garis sumbu (garis bagi tegak lurus)', 'Garis yang melalui titik tengah suatu sisi dan tegak lurus padanya; ketiganya bertemu di sirkumsenter.'],
        ['Sirkumsenter (O) dan lingkaran luar', 'Titik yang berjarak sama ke ketiga titik sudut, dan lingkaran melalui ketiga titik sudut yang berpusat di sana.'],
        ['Garis bagi sudut', 'Garis yang membagi sudut di suatu titik sudut menjadi dua bagian sama besar; ketiganya bertemu di insenter.'],
        ['Insenter (I) dan lingkaran dalam', 'Titik yang berjarak sama ke ketiga sisi, dan lingkaran terbesar yang muat di dalam segitiga, berpusat di sana.'],
        ['Garis tinggi', 'Garis dari titik sudut yang tegak lurus sisi di hadapannya (diperpanjang jika perlu); ketiga garis tinggi bertemu di ortosenter (H).'],
        ['Garis Euler', 'Garis lurus yang melalui ortosenter, sentroid, dan sirkumsenter setiap segitiga yang bukan sama sisi.'],
      ],
    },
    misconceptions: {
      en: [
        ['The "centre" of a triangle is always inside it.', 'The centroid and incenter are, but the circumcenter and orthocenter of an obtuse triangle lie outside. Drag one corner down toward the opposite side in the sim and watch them leave.'],
        ['The centroid is the point equally far from the three corners.', 'That is the circumcenter. The centroid is the average position of the three corners and the balance point; the two coincide only in an equilateral triangle.'],
        ['The medians divide the triangle into three pieces of different sizes.', 'The three small triangles formed by the medians around the centroid have exactly equal areas, which is why the centroid is the balance point.'],
        ['Any three of the four centres are collinear.', 'Only the orthocenter, centroid and circumcenter are. The incenter lies on the Euler line only when the triangle is isosceles, as the sim shows when you drag a corner.'],
      ],
      id: [
        ['"Pusat" segitiga selalu berada di dalamnya.', 'Sentroid dan insenter memang begitu, tetapi sirkumsenter dan ortosenter segitiga tumpul berada di luar. Seret satu titik sudut ke arah sisi di hadapannya dalam sim dan lihat keduanya keluar.'],
        ['Sentroid adalah titik yang berjarak sama ke ketiga titik sudut.', 'Itu sirkumsenter. Sentroid adalah posisi rata-rata ketiga titik sudut dan titik keseimbangan; keduanya berimpit hanya pada segitiga sama sisi.'],
        ['Garis-garis berat membagi segitiga menjadi tiga bagian yang luasnya berbeda.', 'Tiga segitiga kecil yang dibentuk garis-garis berat di sekeliling sentroid luasnya tepat sama, itulah sebabnya sentroid menjadi titik keseimbangan.'],
        ['Tiga pusat mana pun dari keempatnya selalu segaris.', 'Hanya ortosenter, sentroid, dan sirkumsenter yang segaris. Insenter berada pada garis Euler hanya jika segitiganya sama kaki, seperti terlihat di sim saat kamu menyeret titik sudut.'],
      ],
    },
    realWorld: {
      en: [
        'To balance a triangular tray or sign on one finger, hold it at the centroid.',
        'To place a single sprinkler or lamp equally far from three points, put it at the circumcenter of the triangle they form.',
        'The largest round table that fits into a triangular corner of a room has the incenter as its centre and touches all three walls.',
        'Surveyors and GPS receivers locate a position from three known points by intersecting circles, which is the circumcircle idea used in reverse.',
      ],
      id: [
        'Untuk menyeimbangkan nampan atau papan berbentuk segitiga di satu jari, pegang di sentroidnya.',
        'Untuk menempatkan satu penyiram tanaman atau lampu yang berjarak sama ke tiga titik, letakkan di sirkumsenter segitiga yang dibentuk ketiga titik itu.',
        'Meja bundar terbesar yang muat di sudut ruangan berbentuk segitiga berpusat di insenter dan menyentuh ketiga dinding.',
        'Juru ukur dan penerima GPS menentukan posisi dari tiga titik yang diketahui dengan memotongkan lingkaran-lingkaran, yaitu gagasan lingkaran luar yang dipakai terbalik.',
      ],
    },
    questions: {
      en: [
        { q: 'You drag the corners so that angle C is exactly 90°. Where do the circumcenter and orthocenter end up?', a: 'The circumcenter sits at the midpoint of the hypotenuse AB, because the hypotenuse is a diameter of the circumcircle (Thales\' theorem). The orthocenter is at C itself, since the two legs are already altitudes and they meet at C.' },
        { q: 'In the sim the circumcenter O and centroid G are 2 cm apart on screen. How far is the orthocenter H from G, and on which side?', a: '4 cm, on the opposite side of G from O. On the Euler line HG = 2·GO, which is exactly the relation the sim uses to compute H from O and G.' },
        { q: 'Make the triangle equilateral. Why does the Euler line disappear?', a: 'All four centres coincide at one point, so O and H are the same point and there is no unique line through them. A line needs two distinct points to define it.' },
      ],
      id: [
        { q: 'Kamu menyeret titik sudut sehingga sudut C tepat 90°. Di mana sirkumsenter dan ortosenter berakhir?', a: 'Sirkumsenter berada di titik tengah sisi miring AB, karena sisi miring adalah diameter lingkaran luar (teorema Thales). Ortosenter berada di C sendiri, karena kedua kaki segitiga sudah menjadi garis tinggi dan keduanya bertemu di C.' },
        { q: 'Di layar sim, sirkumsenter O dan sentroid G berjarak 2 cm. Berapa jarak ortosenter H dari G, dan di sisi mana?', a: '4 cm, di sisi G yang berlawanan dengan O. Pada garis Euler HG = 2·GO, dan hubungan inilah yang dipakai sim untuk menghitung H dari O dan G.' },
        { q: 'Buat segitiga sama sisi. Mengapa garis Euler menghilang?', a: 'Keempat pusat berimpit di satu titik, sehingga O dan H adalah titik yang sama dan tidak ada garis tunggal yang melaluinya. Sebuah garis memerlukan dua titik berbeda untuk mendefinisikannya.' },
      ],
    },
  },
};
