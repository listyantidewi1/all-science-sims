// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Read a ruler, a vernier caliper and a dial balance correctly, including the estimated last digit.',
      'State the uncertainty of a reading as half the smallest division and write it as value ± uncertainty with a unit.',
      'Convert between mm, cm and m, between g and kg, and between mL and L, and count the significant figures of a measurement.',
    ],
    id: [
      'Membaca mistar, jangka sorong dan neraca jarum dengan benar, termasuk digit taksiran terakhir.',
      'Menyatakan ketidakpastian pengukuran sebagai setengah skala terkecil dan menulisnya sebagai nilai ± ketidakpastian dengan satuan.',
      'Mengonversi mm, cm dan m, g dan kg, serta mL dan L, dan menghitung angka penting suatu hasil pengukuran.',
    ],
  },
  tryThis: {
    en: [
      'Measure the same kind of object (the AA battery) with the ruler and then with the caliper. How many digits does each give?',
      'Type a reading that is 1 mm too big on the ruler. Is it accepted? Now try 1 mm too big on the caliper.',
      'Press "Use my reading" in the converter and write a 47 mm length as cm and as m. Which number is biggest?',
      'Turn on "Show answer" for one object, then turn it off and measure five more without it.',
    ],
    id: [
      'Ukur jenis benda yang sama (baterai AA) dengan mistar lalu dengan jangka sorong. Berapa digit yang diberikan masing-masing?',
      'Ketik bacaan yang 1 mm terlalu besar pada mistar. Diterima? Sekarang coba 1 mm terlalu besar pada jangka sorong.',
      'Tekan "Pakai bacaanku" di panel konversi dan tulis panjang 47 mm dalam cm dan dalam m. Angka mana yang paling besar?',
      'Nyalakan "Tampilkan jawaban" untuk satu benda, lalu matikan dan ukur lima benda lagi tanpa bantuan.',
    ],
  },

  learn: {
    background: {
      en: [
        'Measuring means comparing a quantity with a standard unit. Length is compared with the metre (m), mass with the kilogram (kg) and volume with the litre (L) or cubic metre. In everyday work we use smaller or larger multiples of these units: 1 m = 100 cm = 1000 mm, 1 kg = 1000 g and 1 L = 1000 mL. Changing to a larger unit makes the number smaller, so 47 mm is 4.7 cm or 0.047 m. A reading without a unit is not a measurement at all.',
        'No reading is perfectly exact. The smallest division on the scale limits how finely you can read. A ruler marked in millimetres lets you read to the nearest mm, so the uncertainty is half a division, ± 0.5 mm. A vernier caliper has a sliding scale with 10 divisions squeezed into 9 mm; the one vernier line that lines up with a main-scale line tells you the tenth of a millimetre, so the uncertainty is ± 0.05 mm. The dial balance in this sim has divisions of 5 g, so its uncertainty is ± 2.5 g. We write a result as value ± uncertainty, for example (47 ± 0.5) mm.',
        'Significant figures are the digits you actually read, including the last uncertain one. The ruler gives 47 mm (2 significant figures); the caliper gives 47.3 mm (3 significant figures). Converting units never adds information: 47.3 mm = 4.73 cm = 0.0473 m all have 3 significant figures, because the zeros in 0.0473 only hold the decimal place. In the sim, type the number you read, press Check, and the feedback shows the accepted value, its uncertainty and the significant-figure count.',
        'To read the vernier caliper: first find the main-scale line just to the left of the vernier zero (that is the whole number of millimetres). Then look along the vernier for the one line that lines up exactly with a main-scale line; its number is the tenths. For the ruler, remember that the object may not start at zero: length = end reading − start reading.',
      ],
      id: [
        'Mengukur berarti membandingkan suatu besaran dengan satuan baku. Panjang dibandingkan dengan meter (m), massa dengan kilogram (kg) dan volume dengan liter (L) atau meter kubik. Dalam kehidupan sehari-hari kita memakai kelipatan yang lebih kecil atau lebih besar: 1 m = 100 cm = 1000 mm, 1 kg = 1000 g dan 1 L = 1000 mL. Pindah ke satuan yang lebih besar membuat angkanya lebih kecil, jadi 47 mm sama dengan 4,7 cm atau 0,047 m. Bacaan tanpa satuan bukanlah hasil pengukuran.',
        'Tidak ada bacaan yang benar-benar tepat. Skala terkecil pada alat membatasi seberapa teliti kamu bisa membaca. Mistar dengan skala milimeter dibaca sampai mm terdekat, sehingga ketidakpastiannya setengah skala, ± 0,5 mm. Jangka sorong mempunyai skala geser (nonius) dengan 10 bagian yang dipadatkan dalam 9 mm; satu garis nonius yang tepat berimpit dengan garis skala utama menunjukkan persepuluhan milimeter, sehingga ketidakpastiannya ± 0,05 mm. Neraca jarum dalam simulasi ini berskala 5 g, sehingga ketidakpastiannya ± 2,5 g. Hasil ditulis sebagai nilai ± ketidakpastian, misalnya (47 ± 0,5) mm.',
        'Angka penting adalah digit yang benar-benar kamu baca, termasuk digit taksiran terakhir. Mistar memberi 47 mm (2 angka penting); jangka sorong memberi 47,3 mm (3 angka penting). Mengonversi satuan tidak pernah menambah informasi: 47,3 mm = 4,73 cm = 0,0473 m semuanya 3 angka penting, karena nol pada 0,0473 hanya menempatkan koma desimal. Di simulasi, ketik angka yang kamu baca, tekan Periksa, dan umpan balik menampilkan nilai yang diterima, ketidakpastiannya dan jumlah angka pentingnya.',
        'Cara membaca jangka sorong: pertama cari garis skala utama tepat di kiri nol nonius (itulah milimeter bulatnya). Lalu telusuri nonius untuk mencari satu garis yang tepat berimpit dengan garis skala utama; nomornya adalah persepuluhan. Pada mistar, ingat bahwa benda tidak selalu mulai dari nol: panjang = bacaan ujung − bacaan awal.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: an object on a millimetre ruler starts at 1.0 cm and ends between the 5.7 and 5.8 cm marks, so its length is (47 ± 0.5) mm. Bottom: the vernier of a caliper; the zero sits past 47 mm and the 3rd vernier line coincides with a main-scale line, giving (47.30 ± 0.05) mm.',
        id: 'Atas: benda pada mistar milimeter mulai di 1,0 cm dan berakhir di antara tanda 5,7 dan 5,8 cm, sehingga panjangnya (47 ± 0,5) mm. Bawah: nonius jangka sorong; nolnya lewat dari 47 mm dan garis nonius ke-3 berimpit dengan garis skala utama, memberi (47,30 ± 0,05) mm.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        let ticks = '';
        for (let mm = 0; mm <= 70; mm++) {
          const x = 30 + mm * 4.3;
          const h = mm % 10 === 0 ? 14 : mm % 5 === 0 ? 10 : 6;
          ticks += `<line x1="${x.toFixed(1)}" y1="70" x2="${x.toFixed(1)}" y2="${70 + h}" stroke="currentColor" stroke-width="${mm % 10 === 0 ? 1.4 : 0.8}"/>`;
          if (mm % 10 === 0) ticks += `<text x="${x.toFixed(1)}" y="96" text-anchor="middle">${mm / 10}</text>`;
        }
        let main = '';
        for (let mm = 44; mm <= 52; mm++) {
          const x = 40 + (mm - 44) * 36;
          main += `<line x1="${x}" y1="150" x2="${x}" y2="${mm % 5 === 0 ? 170 : 162}" stroke="currentColor" stroke-width="1.2"/>`;
          if (mm % 5 === 0 || mm === 47) main += `<text x="${x}" y="146" text-anchor="middle">${mm}</text>`;
        }
        let vern = '';
        for (let k = 0; k <= 7; k++) {
          const x = 40 + (3.3 + k * 0.9) * 36;
          vern += `<line x1="${x.toFixed(1)}" y1="172" x2="${x.toFixed(1)}" y2="${k % 5 === 0 ? 192 : 184}" stroke="${k === 3 ? '#ef4444' : 'currentColor'}" stroke-width="${k === 3 ? 2.2 : 1.2}"/>`;
          if (k === 0 || k === 5) vern += `<text x="${x.toFixed(1)}" y="206" text-anchor="middle">${k}</text>`;
        }
        const endX = (30 + 57.3 * 4.3).toFixed(1);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Reading a ruler and a vernier caliper', 'Membaca mistar dan jangka sorong')}">
  <style>text{font:9px system-ui,sans-serif;fill:currentColor}.t{font:11px system-ui,sans-serif;fill:currentColor}</style>
  <text x="30" y="20" class="t">${L('Ruler: length = 5.7 cm − 1.0 cm = 47 mm, uncertainty ± 0.5 mm', 'Mistar: panjang = 5,7 cm − 1,0 cm = 47 mm, ketidakpastian ± 0,5 mm')}</text>
  <rect x="73" y="40" width="${(47 * 4.3).toFixed(1)}" height="26" rx="5" fill="#f472b6" stroke="currentColor"/>
  <line x1="73" y1="36" x2="73" y2="84" stroke="#ef4444" stroke-dasharray="3 2"/>
  <line x1="${endX}" y1="36" x2="${endX}" y2="84" stroke="#ef4444" stroke-dasharray="3 2"/>
  <rect x="24" y="70" width="316" height="30" rx="2" fill="none" stroke="currentColor" opacity=".5"/>
  ${ticks}
  <text x="332" y="96">cm</text>
  <text x="30" y="128" class="t">${L('Vernier caliper: main scale 47 mm + vernier line 3 → 47.3 mm, ± 0.05 mm', 'Jangka sorong: skala utama 47 mm + garis nonius 3 → 47,3 mm, ± 0,05 mm')}</text>
  ${main}
  <line x1="40" y1="150" x2="340" y2="150" stroke="currentColor" opacity=".5"/>
  <line x1="40" y1="172" x2="340" y2="172" stroke="currentColor" opacity=".5"/>
  ${vern}
  <line x1="${(40 + 3.3 * 36).toFixed(1)}" y1="148" x2="${(40 + 3.3 * 36).toFixed(1)}" y2="194" stroke="#3b82f6" stroke-width="2"/>
  <text x="${(40 + 3.3 * 36 + 4).toFixed(1)}" y="222" fill="#3b82f6">${L('vernier zero: just past 47', 'nol nonius: lewat 47')}</text>
  <text x="${(40 + 6 * 36 + 4).toFixed(1)}" y="232" fill="#ef4444">${L('line 3 coincides', 'garis 3 berimpit')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Every measurement needs a number and a unit: 47 mm, not just 47.',
        'The uncertainty of a single reading is half the smallest division: ± 0.5 mm on a mm ruler, ± 0.05 mm on a 0.1 mm caliper, ± 2.5 g on a 5 g dial.',
        'Write results as value ± uncertainty, e.g. (47 ± 0.5) mm.',
        'Significant figures are the digits you read, including the last estimated one; a finer instrument gives more of them.',
        'Converting units moves the decimal point but never changes the number of significant figures: 47.3 mm = 4.73 cm = 0.0473 m.',
      ],
      id: [
        'Setiap pengukuran butuh angka dan satuan: 47 mm, bukan hanya 47.',
        'Ketidakpastian satu kali pembacaan adalah setengah skala terkecil: ± 0,5 mm pada mistar mm, ± 0,05 mm pada jangka sorong 0,1 mm, ± 2,5 g pada neraca berskala 5 g.',
        'Tulis hasil sebagai nilai ± ketidakpastian, misalnya (47 ± 0,5) mm.',
        'Angka penting adalah digit yang kamu baca, termasuk digit taksiran terakhir; alat yang lebih teliti memberi lebih banyak angka penting.',
        'Konversi satuan memindahkan koma desimal tetapi tidak mengubah jumlah angka penting: 47,3 mm = 4,73 cm = 0,0473 m.',
      ],
    },
    vocabulary: {
      en: [
        ['Physical quantity', 'Something that can be measured, such as length, mass, time or volume.'],
        ['Unit', 'The agreed standard a quantity is compared with: metre, kilogram, second, litre.'],
        ['Smallest division', 'The gap between two neighbouring marks on a scale; it sets how finely you can read.'],
        ['Uncertainty', 'How far the true value might be from your reading; for one reading, half the smallest division.'],
        ['Vernier scale', 'A sliding scale with 10 divisions in 9 mm that lets a caliper read to 0.1 mm.'],
        ['Significant figures', 'The digits in a measurement that carry information, including the last estimated digit.'],
      ],
      id: [
        ['Besaran fisis', 'Sesuatu yang dapat diukur, seperti panjang, massa, waktu atau volume.'],
        ['Satuan', 'Standar yang disepakati untuk membandingkan besaran: meter, kilogram, sekon, liter.'],
        ['Skala terkecil', 'Jarak antara dua garis tanda yang berdekatan pada alat ukur; menentukan seberapa teliti pembacaan.'],
        ['Ketidakpastian', 'Seberapa jauh nilai sebenarnya mungkin berbeda dari bacaanmu; untuk satu bacaan, setengah skala terkecil.'],
        ['Skala nonius', 'Skala geser dengan 10 bagian dalam 9 mm yang membuat jangka sorong bisa dibaca sampai 0,1 mm.'],
        ['Angka penting', 'Digit pada hasil pengukuran yang membawa informasi, termasuk digit taksiran terakhir.'],
      ],
    },
    misconceptions: {
      en: [
        ['A ruler gives an exact length.', 'Every instrument has a smallest division, and the true value lies somewhere within half a division of your reading. A mm ruler can only promise ± 0.5 mm.'],
        ['Converting 47 mm to 0.047 m makes the measurement more precise because it has more digits.', 'The zeros only place the decimal point. 47 mm and 0.047 m both have 2 significant figures and the same uncertainty.'],
        ['You always read a ruler from the left end of the object.', 'You read where the object starts and where it ends and subtract. If the object starts at 1.0 cm and ends at 5.7 cm, its length is 4.7 cm, not 5.7 cm.'],
        ['A bigger number means a bigger quantity.', 'Only within the same unit. 500 g is less than 1 kg, and 300 mm is less than 1 m.'],
      ],
      id: [
        ['Mistar memberikan panjang yang pasti.', 'Setiap alat mempunyai skala terkecil, dan nilai sebenarnya berada dalam setengah skala dari bacaanmu. Mistar mm hanya bisa menjamin ± 0,5 mm.'],
        ['Mengubah 47 mm menjadi 0,047 m membuat pengukuran lebih teliti karena digitnya lebih banyak.', 'Nol itu hanya menempatkan koma desimal. 47 mm dan 0,047 m sama-sama 2 angka penting dengan ketidakpastian yang sama.'],
        ['Mistar selalu dibaca dari ujung kiri benda.', 'Kamu membaca tempat benda mulai dan berakhir lalu mengurangkannya. Jika benda mulai di 1,0 cm dan berakhir di 5,7 cm, panjangnya 4,7 cm, bukan 5,7 cm.'],
        ['Angka yang lebih besar berarti besaran yang lebih besar.', 'Hanya jika satuannya sama. 500 g lebih kecil dari 1 kg, dan 300 mm lebih kecil dari 1 m.'],
      ],
    },
    realWorld: {
      en: [
        'A tailor measures to the nearest cm; a machinist making an engine part needs a caliper or micrometre reading to 0.01 mm.',
        'Pharmacists weigh medicines on balances that read to 0.001 g, because a few milligrams can matter.',
        'Food labels give mass in g and volume in mL; a 1.5 L bottle holds 1500 mL.',
        'Map scales, road signs in km and running tracks in m all rely on the same metre, defined so every country measures the same length.',
      ],
      id: [
        'Penjahit mengukur sampai cm terdekat; tukang bubut yang membuat bagian mesin memerlukan jangka sorong atau mikrometer yang terbaca sampai 0,01 mm.',
        'Apoteker menimbang obat dengan neraca yang terbaca sampai 0,001 g, karena beberapa miligram bisa sangat berarti.',
        'Label makanan mencantumkan massa dalam g dan volume dalam mL; botol 1,5 L berisi 1500 mL.',
        'Skala peta, rambu jalan dalam km dan lintasan lari dalam m semuanya memakai meter yang sama, yang didefinisikan agar setiap negara mengukur panjang yang sama.',
      ],
    },
    questions: {
      en: [
        { q: 'An object on the ruler starts at the 2.0 cm mark and ends between 6.3 and 6.4 cm, nearer 6.3. Write the length with its uncertainty in mm.', a: 'End ≈ 63 mm, start = 20 mm, so length = 43 mm. Uncertainty is half a division: (43 ± 0.5) mm.' },
        { q: 'The caliper shows the vernier zero just past 14 mm and the 6th vernier line coincides. What is the reading, and how many significant figures does it have?', a: '14.6 mm (± 0.05 mm), which has 3 significant figures.' },
        { q: 'Convert 14.6 mm to cm and to m. Does the number of significant figures change?', a: '1.46 cm and 0.0146 m. No: all three have 3 significant figures; the leading zeros only place the decimal point.' },
        { q: 'The balance needle points halfway between the 135 g and 140 g marks. What do you record?', a: 'About 137 or 138 g with an uncertainty of ± 2.5 g, so roughly (138 ± 2.5) g. Any value between 135 and 140 g is consistent with the reading.' },
      ],
      id: [
        { q: 'Sebuah benda pada mistar mulai di tanda 2,0 cm dan berakhir di antara 6,3 dan 6,4 cm, lebih dekat ke 6,3. Tulis panjangnya beserta ketidakpastian dalam mm.', a: 'Ujung ≈ 63 mm, awal = 20 mm, sehingga panjang = 43 mm. Ketidakpastian setengah skala: (43 ± 0,5) mm.' },
        { q: 'Jangka sorong menunjukkan nol nonius sedikit lewat 14 mm dan garis nonius ke-6 berimpit. Berapa bacaannya, dan berapa angka pentingnya?', a: '14,6 mm (± 0,05 mm), yang mempunyai 3 angka penting.' },
        { q: 'Ubah 14,6 mm ke cm dan ke m. Apakah jumlah angka pentingnya berubah?', a: '1,46 cm dan 0,0146 m. Tidak: ketiganya mempunyai 3 angka penting; nol di depan hanya menempatkan koma desimal.' },
        { q: 'Jarum neraca menunjuk di tengah antara tanda 135 g dan 140 g. Apa yang kamu catat?', a: 'Sekitar 137 atau 138 g dengan ketidakpastian ± 2,5 g, jadi kira-kira (138 ± 2,5) g. Nilai mana pun antara 135 dan 140 g sesuai dengan bacaan itu.' },
      ],
    },
  },
};
