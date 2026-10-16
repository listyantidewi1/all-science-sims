// Long-form text for the Coulomb's Law sim (Fase F, grades 11–12).
export default {
  objectives: {
    en: [
      'Apply F = k·q₁q₂/r² with k = 8.99 × 10⁹ N·m²/C² to calculate the force between two point charges in newtons.',
      'Show from recorded data that the force follows an inverse-square law: halving r multiplies F by four, and a log-log plot of F against r has slope −2.',
      'Use the superposition principle to find the net force on a charge from two other charges as a vector sum.',
    ],
    id: [
      'Menerapkan F = k·q₁q₂/r² dengan k = 8,99 × 10⁹ N·m²/C² untuk menghitung gaya antara dua muatan titik dalam newton.',
      'Menunjukkan dari data rekaman bahwa gaya mengikuti hukum kuadrat terbalik: memperpendek r menjadi setengah membuat F empat kali lipat, dan grafik log-log F terhadap r berkemiringan −2.',
      'Menggunakan prinsip superposisi untuk menentukan gaya total pada sebuah muatan akibat dua muatan lain sebagai jumlah vektor.',
    ],
  },
  tryThis: {
    en: [
      'Set q₁ = q₂ = +5 μC and drag q₂ so r = 0.20 m, then 0.10 m. Does the force readout become exactly four times larger?',
      'Flip the sign of one charge. The arrows reverse: like charges repel, unlike charges attract, but the magnitude is unchanged.',
      'Record F at six separations between 0.10 m and 1.00 m, then switch the plot to log-log. The points should lie on a straight line of slope −2.',
      'Turn on the third charge, give it −8 μC and drag it above q₂. Watch the two partial forces on q₂ and their vector sum (the bold arrow).',
    ],
    id: [
      'Atur q₁ = q₂ = +5 μC dan seret q₂ sehingga r = 0,20 m, lalu 0,10 m. Apakah bacaan gaya menjadi tepat empat kali lebih besar?',
      'Balik tanda salah satu muatan. Panahnya berbalik: muatan sejenis tolak-menolak, muatan berlawanan tarik-menarik, tetapi besarnya tidak berubah.',
      'Catat F pada enam jarak antara 0,10 m dan 1,00 m, lalu ganti grafik ke log-log. Titik-titiknya harus membentuk garis lurus dengan kemiringan −2.',
      'Nyalakan muatan ketiga, beri −8 μC dan seret ke atas q₂. Perhatikan dua gaya parsial pada q₂ dan jumlah vektornya (panah tebal).',
    ],
  },

  learn: {
    background: {
      en: [
        'In 1785 Charles-Augustin de Coulomb used a torsion balance to measure the tiny force between two charged spheres. He found that the force is proportional to the product of the charges and inversely proportional to the square of the distance between their centres: F = k·q₁q₂/r². The constant k = 1/(4πε₀) = 8.99 × 10⁹ N·m²/C², where ε₀ = 8.85 × 10⁻¹² C²/(N·m²) is the permittivity of free space. Because k is so large, laboratory charges are tiny: two charges of 1 μC (10⁻⁶ C) at a distance of 0.10 m push each other with 0.90 N, about the weight of an apple.',
        'The sign of the product q₁q₂ tells you the direction. If both charges have the same sign the product is positive and the force is repulsive: the arrow on each charge points away from the other. If the signs differ the product is negative and the force is attractive. Newton\'s third law applies: the force on q₁ due to q₂ has exactly the same magnitude as the force on q₂ due to q₁, even when one charge is much bigger than the other. The simulation draws both arrows to the same scale so you can check this.',
        'The inverse-square dependence is the heart of the law. Doubling r divides F by 4; tripling r divides F by 9. On a linear F–r graph the curve drops steeply then flattens into a long tail. Taking logarithms gives log F = log(k q₁q₂) − 2 log r, a straight line of slope −2 on log-log axes. That is why the sim offers a log-log view of your recorded points: a straight line with slope −2 is the fingerprint of an inverse-square law, the same shape that gravitation follows.',
        'With more than two charges, the net force on any one of them is the vector sum of the separate Coulomb forces (the superposition principle). Each pair interacts as if the others were not there. When you switch on the third charge the simulation draws the two partial forces on q₂ as thin arrows and their resultant as a bold arrow; the resultant\'s magnitude is found with the parallelogram rule, not by adding the numbers.',
      ],
      id: [
        'Pada tahun 1785 Charles-Augustin de Coulomb memakai neraca puntir untuk mengukur gaya sangat kecil antara dua bola bermuatan. Ia menemukan bahwa gaya sebanding dengan hasil kali muatan dan berbanding terbalik dengan kuadrat jarak antara pusatnya: F = k·q₁q₂/r². Konstanta k = 1/(4πε₀) = 8,99 × 10⁹ N·m²/C², dengan ε₀ = 8,85 × 10⁻¹² C²/(N·m²) adalah permitivitas ruang hampa. Karena k sangat besar, muatan di laboratorium sangat kecil: dua muatan 1 μC (10⁻⁶ C) pada jarak 0,10 m saling mendorong dengan gaya 0,90 N, sekitar berat sebuah apel.',
        'Tanda hasil kali q₁q₂ menentukan arah. Jika kedua muatan sejenis, hasil kalinya positif dan gayanya tolak-menolak: panah pada tiap muatan menjauhi muatan lain. Jika tandanya berbeda, hasil kalinya negatif dan gayanya tarik-menarik. Hukum III Newton berlaku: gaya pada q₁ akibat q₂ besarnya tepat sama dengan gaya pada q₂ akibat q₁, meskipun salah satu muatan jauh lebih besar. Simulasi menggambar kedua panah dengan skala yang sama agar kamu bisa memeriksanya.',
        'Ketergantungan kuadrat terbalik adalah inti hukum ini. Menggandakan r membagi F dengan 4; melipattigakan r membagi F dengan 9. Pada grafik F–r linear, kurva turun tajam lalu mendatar menjadi ekor panjang. Mengambil logaritma menghasilkan log F = log(k q₁q₂) − 2 log r, garis lurus berkemiringan −2 pada sumbu log-log. Itulah sebabnya simulasi menyediakan tampilan log-log untuk titik rekamanmu: garis lurus berkemiringan −2 adalah sidik jari hukum kuadrat terbalik, bentuk yang sama yang diikuti gravitasi.',
        'Dengan lebih dari dua muatan, gaya total pada salah satunya adalah jumlah vektor dari gaya-gaya Coulomb terpisah (prinsip superposisi). Tiap pasangan berinteraksi seolah muatan lain tidak ada. Saat kamu menyalakan muatan ketiga, simulasi menggambar dua gaya parsial pada q₂ sebagai panah tipis dan resultannya sebagai panah tebal; besar resultan dicari dengan aturan jajargenjang, bukan dengan menjumlahkan angkanya begitu saja.',
      ],
    },
    figure: {
      caption: {
        en: 'Two like charges repel along the line joining them with equal and opposite forces F = k·q₁q₂/r². Right: on log-log axes the inverse-square law is a straight line of slope −2.',
        id: 'Dua muatan sejenis saling menolak sepanjang garis penghubungnya dengan gaya sama besar berlawanan arah, F = k·q₁q₂/r². Kanan: pada sumbu log-log hukum kuadrat terbalik menjadi garis lurus berkemiringan −2.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Coulomb forces between two charges and a log-log plot', 'Gaya Coulomb antara dua muatan dan grafik log-log')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none;opacity:.6}.f{stroke-width:2.5;fill:none}</style>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
  <line x1="20" y1="70" x2="190" y2="70" class="ax" stroke-dasharray="3 3"/>
  <circle cx="60" cy="70" r="13" fill="#ef4444"/>
  <text x="55" y="75" style="fill:#fff;font-weight:700">+</text>
  <circle cx="150" cy="70" r="13" fill="#ef4444"/>
  <text x="145" y="75" style="fill:#fff;font-weight:700">+</text>
  <line x1="47" y1="70" x2="12" y2="70" class="f" stroke="#f59e0b" marker-end="url(#ar)"/>
  <line x1="163" y1="70" x2="198" y2="70" class="f" stroke="#f59e0b" marker-end="url(#ar)"/>
  <text x="10" y="56" style="fill:#f59e0b">F₁₂</text>
  <text x="172" y="56" style="fill:#f59e0b">F₂₁</text>
  <text x="48" y="104">q₁</text>
  <text x="140" y="104">q₂</text>
  <line x1="60" y1="92" x2="150" y2="92" class="ax"/>
  <line x1="60" y1="88" x2="60" y2="96" class="ax"/>
  <line x1="150" y1="88" x2="150" y2="96" class="ax"/>
  <text x="100" y="116">r</text>
  <text x="14" y="146">F = k·q₁q₂ / r²</text>
  <text x="14" y="166">k = 8,99 × 10⁹ N·m²/C²</text>
  <text x="14" y="186">${L('1 μC, 1 μC, 0.10 m → 0.90 N', '1 μC, 1 μC, 0,10 m → 0,90 N')}</text>
  <text x="14" y="206">${L('same sign: repel · opposite: attract', 'sejenis: tolak · berlawanan: tarik')}</text>
  <line x1="230" y1="40" x2="230" y2="200" class="ax"/>
  <line x1="230" y1="200" x2="350" y2="200" class="ax"/>
  <line x1="240" y1="52" x2="340" y2="188" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="250" cy="65.6" r="3" fill="#3b82f6"/>
  <circle cx="275" cy="99.6" r="3" fill="#3b82f6"/>
  <circle cx="300" cy="133.6" r="3" fill="#3b82f6"/>
  <circle cx="325" cy="167.6" r="3" fill="#3b82f6"/>
  <text x="236" y="36">log F</text>
  <text x="318" y="216">log r</text>
  <text x="290" y="88" style="fill:#3b82f6">${L('slope −2', 'kemiringan −2')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'F = k·q₁q₂/r², with k = 8.99 × 10⁹ N·m²/C²; charges in coulombs, distance in metres, force in newtons.',
        'Same-sign charges repel, opposite-sign charges attract; the force acts along the line joining the charges.',
        'The two charges feel equal and opposite forces (Newton\'s third law), whatever their sizes.',
        'Inverse square: doubling r divides F by 4; on a log-log plot F against r is a straight line of slope −2.',
        'Superposition: with several charges, the net force on one charge is the vector sum of the individual Coulomb forces.',
      ],
      id: [
        'F = k·q₁q₂/r², dengan k = 8,99 × 10⁹ N·m²/C²; muatan dalam coulomb, jarak dalam meter, gaya dalam newton.',
        'Muatan sejenis tolak-menolak, muatan berlawanan tarik-menarik; gaya bekerja sepanjang garis penghubung muatan.',
        'Kedua muatan merasakan gaya sama besar berlawanan arah (hukum III Newton), berapa pun besar muatannya.',
        'Kuadrat terbalik: menggandakan r membagi F dengan 4; pada grafik log-log F terhadap r berupa garis lurus berkemiringan −2.',
        'Superposisi: dengan beberapa muatan, gaya total pada satu muatan adalah jumlah vektor gaya-gaya Coulomb masing-masing.',
      ],
    },
    vocabulary: {
      en: [
        ['Point charge', 'A charged object small enough that its size can be ignored compared with the distances involved.'],
        ['Coulomb (C)', 'The SI unit of charge; one electron carries −1.60 × 10⁻¹⁹ C, so 1 μC is about 6 × 10¹² electrons.'],
        ['Coulomb constant k', 'k = 1/(4πε₀) = 8.99 × 10⁹ N·m²/C², the proportionality constant in Coulomb\'s law.'],
        ['Inverse-square law', 'A relationship in which a quantity falls as 1/r²; gravity and light intensity from a point source follow it too.'],
        ['Superposition principle', 'The net electrostatic force on a charge is the vector sum of the forces from every other charge taken one at a time.'],
        ['Log-log plot', 'A graph with logarithmic scales on both axes; a power law F ∝ rⁿ appears as a straight line of slope n.'],
      ],
      id: [
        ['Muatan titik', 'Benda bermuatan yang cukup kecil sehingga ukurannya dapat diabaikan dibanding jarak yang terlibat.'],
        ['Coulomb (C)', 'Satuan SI muatan; satu elektron membawa −1,60 × 10⁻¹⁹ C, sehingga 1 μC setara sekitar 6 × 10¹² elektron.'],
        ['Konstanta Coulomb k', 'k = 1/(4πε₀) = 8,99 × 10⁹ N·m²/C², konstanta kesebandingan dalam hukum Coulomb.'],
        ['Hukum kuadrat terbalik', 'Hubungan dengan besaran yang berkurang sebagai 1/r²; gravitasi dan intensitas cahaya dari sumber titik juga mengikutinya.'],
        ['Prinsip superposisi', 'Gaya elektrostatik total pada sebuah muatan adalah jumlah vektor gaya dari setiap muatan lain satu per satu.'],
        ['Grafik log-log', 'Grafik dengan skala logaritma pada kedua sumbu; hukum pangkat F ∝ rⁿ tampil sebagai garis lurus berkemiringan n.'],
      ],
    },
    misconceptions: {
      en: [
        ['The bigger charge pushes harder on the smaller one than the smaller one pushes back.', 'Both forces have the same magnitude k·q₁q₂/r²; the product q₁q₂ is the same whichever way round you read it. Newton\'s third law holds for electric forces.'],
        ['Doubling the distance halves the force.', 'Doubling the distance divides the force by four, because r is squared. To halve the force you need r × √2 ≈ 1.41.'],
        ['With three charges you can add the force magnitudes to get the total.', 'Forces are vectors. Two 3 N forces at right angles give a resultant of √(3² + 3²) ≈ 4.2 N, not 6 N; two equal opposite forces give zero.'],
      ],
      id: [
        ['Muatan yang lebih besar mendorong muatan kecil lebih kuat daripada dorongan baliknya.', 'Kedua gaya besarnya sama, k·q₁q₂/r²; hasil kali q₁q₂ sama dibaca dari arah mana pun. Hukum III Newton berlaku untuk gaya listrik.'],
        ['Menggandakan jarak membuat gaya menjadi setengah.', 'Menggandakan jarak membagi gaya dengan empat, karena r dikuadratkan. Untuk mengecilkan gaya menjadi setengah diperlukan r × √2 ≈ 1,41.'],
        ['Dengan tiga muatan, besar gaya cukup dijumlahkan untuk mendapat gaya total.', 'Gaya adalah vektor. Dua gaya 3 N yang saling tegak lurus menghasilkan resultan √(3² + 3²) ≈ 4,2 N, bukan 6 N; dua gaya sama besar berlawanan arah menghasilkan nol.'],
      ],
    },
    realWorld: {
      en: [
        'Laser printers and photocopiers charge a drum to about −600 V so toner particles are attracted by Coulomb forces only where the image should be.',
        'Electrostatic precipitators in power-station chimneys charge smoke particles and pull them onto plates, removing over 99% of fly ash.',
        'Inside every atom the proton–electron attraction is a Coulomb force; in hydrogen it is about 8 × 10⁻⁸ N at 5.3 × 10⁻¹¹ m, 10³⁹ times stronger than their gravitational pull.',
        'Clingfilm, static-charged balloons sticking to walls and the shock from a door handle are all everyday Coulomb forces between microcoulomb-scale charges.',
      ],
      id: [
        'Printer laser dan mesin fotokopi memuati drum sekitar −600 V sehingga partikel toner ditarik gaya Coulomb hanya di tempat gambar harus muncul.',
        'Presipitator elektrostatik di cerobong PLTU memuati partikel asap dan menariknya ke pelat, menyingkirkan lebih dari 99% abu terbang.',
        'Di dalam setiap atom tarikan proton–elektron adalah gaya Coulomb; pada hidrogen besarnya sekitar 8 × 10⁻⁸ N pada jarak 5,3 × 10⁻¹¹ m, 10³⁹ kali lebih kuat daripada tarikan gravitasinya.',
        'Plastik pembungkus yang lengket, balon bermuatan yang menempel di dinding, dan sengatan dari gagang pintu adalah gaya Coulomb sehari-hari antara muatan berskala mikrocoulomb.',
      ],
    },
    questions: {
      en: [
        { q: 'Two charges of +4 μC and −6 μC are 0.30 m apart. What is the force between them, and is it attractive or repulsive?', a: 'F = 8.99 × 10⁹ × (4 × 10⁻⁶)(6 × 10⁻⁶)/0.30² = 2.4 N. The signs differ, so the force is attractive.' },
        { q: 'A force of 1.8 N acts between two charges at 0.20 m. What force acts at 0.60 m?', a: 'The distance is 3 times larger, so the force is 9 times smaller: 1.8 N / 9 = 0.20 N.' },
        { q: 'Charge q₂ feels 3.0 N to the right from q₁ and 4.0 N straight up from q₃. What is the net force?', a: 'Vector sum: magnitude √(3.0² + 4.0²) = 5.0 N, pointing up and to the right at tan⁻¹(4/3) ≈ 53° above the horizontal.' },
      ],
      id: [
        { q: 'Dua muatan +4 μC dan −6 μC terpisah 0,30 m. Berapa gaya di antaranya, dan apakah tarik-menarik atau tolak-menolak?', a: 'F = 8,99 × 10⁹ × (4 × 10⁻⁶)(6 × 10⁻⁶)/0,30² = 2,4 N. Tandanya berbeda, sehingga gayanya tarik-menarik.' },
        { q: 'Gaya 1,8 N bekerja antara dua muatan pada jarak 0,20 m. Berapa gayanya pada jarak 0,60 m?', a: 'Jaraknya 3 kali lebih besar, sehingga gayanya 9 kali lebih kecil: 1,8 N / 9 = 0,20 N.' },
        { q: 'Muatan q₂ merasakan 3,0 N ke kanan dari q₁ dan 4,0 N lurus ke atas dari q₃. Berapa gaya totalnya?', a: 'Jumlah vektor: besarnya √(3,0² + 4,0²) = 5,0 N, mengarah ke kanan atas pada sudut tan⁻¹(4/3) ≈ 53° di atas horizontal.' },
      ],
    },
  },
};
