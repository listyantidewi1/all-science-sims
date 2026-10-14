// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply x = (−b ± √Δ) / (2a) where Δ = b² − 4ac.',
      'Understand the three discriminant cases: Δ > 0 (two roots), Δ = 0 (one), Δ < 0 (none real).',
      'Find the vertex at (−b/(2a), c − b²/(4a)).',
    ],
    id: [
      'Menerapkan x = (−b ± √Δ) / (2a) dengan Δ = b² − 4ac.',
      'Memahami tiga kasus diskriminan: Δ > 0 (dua akar), Δ = 0 (satu), Δ < 0 (tak ada nyata).',
      'Menemukan puncak di (−b/(2a), c − b²/(4a)).',
    ],
  },  tryThis: {
    en: [
      'a = 1, b = −5, c = 6 — roots at x = 2 and 3.',
      'a = 1, b = 0, c = 1 — no real roots; parabola sits above the x-axis.',
      'a = 1, b = 4, c = 4 — discriminant zero; one root at x = −2.',
    ],
    id: [
      'a = 1, b = −5, c = 6 — akar di x = 2 dan 3.',
      'a = 1, b = 0, c = 1 — tak ada akar nyata; parabola di atas sumbu-x.',
      'a = 1, b = 4, c = 4 — diskriminan nol; satu akar di x = −2.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The graph of f(x) = ax² + bx + c is a parabola, and each coefficient has a job. The coefficient a decides which way it opens and how fast: positive a opens upward, negative a opens downward, and a larger |a| makes the curve narrower because the x² term grows faster. The constant c is the height at x = 0, so the parabola always crosses the y-axis at (0, c). The coefficient b, working together with a, slides the turning point away from the y-axis: the vertex sits at x = −b/(2a), and the vertical line through it is the axis of symmetry, with the two halves of the curve mirroring each other.',
        'Solving ax² + bx + c = 0 means finding where the graph crosses the x-axis. Completing the square gives the quadratic formula x = (−b ± √Δ)/(2a), where the discriminant Δ = b² − 4ac decides how many answers there are. If Δ > 0 the square root is a real number and there are two roots, placed symmetrically on either side of the axis −b/(2a). If Δ = 0 the ± adds nothing and the two roots merge into one: the vertex just touches the x-axis. If Δ < 0 the square root of a negative number is not real, so the parabola never reaches the axis and the equation has no real solutions (its solutions are complex numbers, which the graph cannot show).',
        'The sim recomputes everything live. Slide a, b and c (a is never allowed to be exactly 0, since then the curve would be a straight line), and the parabola, its two green root markers, the amber vertex and the dashed axis of symmetry redraw at once; the header shows Δ and the formula with your numbers filled in. You can also grab the vertex and drag it: the sim keeps a fixed and solves for the b and c that put the vertex where you dropped it, using b = −2a·h and c = k + a·h². Hover anywhere on the chart to read x and f(x), and use the preset buttons to jump to the three discriminant cases.',
        'The window is fixed at −10 to 10 on both axes, so a steep or wide parabola may run off the screen and roots beyond ±10 will not be visible even though the header still lists them. Values are rounded to two or three decimal places, so a displayed Δ of 0.000 might really be a tiny positive or negative number. The vertex y-value shown, c − b²/(4a), is the minimum of f when a > 0 and the maximum when a < 0.',
      ],
      id: [
        'Grafik f(x) = ax² + bx + c berbentuk parabola, dan setiap koefisien punya tugas. Koefisien a menentukan arah bukaan dan kecuramannya: a positif membuka ke atas, a negatif membuka ke bawah, dan |a| yang lebih besar membuat kurva lebih sempit karena suku x² tumbuh lebih cepat. Konstanta c adalah tinggi kurva di x = 0, sehingga parabola selalu memotong sumbu-y di (0, c). Koefisien b, bekerja bersama a, menggeser titik balik menjauh dari sumbu-y: puncak berada di x = −b/(2a), dan garis tegak yang melaluinya adalah sumbu simetri, dengan kedua belahan kurva saling mencerminkan.',
        'Menyelesaikan ax² + bx + c = 0 berarti mencari tempat grafik memotong sumbu-x. Melengkapkan kuadrat menghasilkan rumus kuadrat x = (−b ± √Δ)/(2a), dengan diskriminan Δ = b² − 4ac yang menentukan banyaknya jawaban. Jika Δ > 0 akar kuadratnya bilangan real dan ada dua akar, terletak simetris di kedua sisi sumbu −b/(2a). Jika Δ = 0 tanda ± tidak menambah apa-apa dan kedua akar menyatu menjadi satu: puncak tepat menyentuh sumbu-x. Jika Δ < 0 akar kuadrat dari bilangan negatif tidak real, sehingga parabola tidak pernah mencapai sumbu dan persamaan tidak punya penyelesaian real (penyelesaiannya bilangan kompleks, yang tidak bisa ditampilkan grafik).',
        'Simulasi menghitung ulang semuanya secara langsung. Geser a, b, dan c (a tidak pernah dibiarkan tepat 0, karena kurvanya akan menjadi garis lurus), dan parabola, dua penanda akar hijau, puncak kuning, serta sumbu simetri putus-putus langsung digambar ulang; bagian atas menampilkan Δ dan rumus dengan angka-angkamu. Kamu juga bisa menyeret puncaknya: simulasi mempertahankan a dan mencari b serta c yang menempatkan puncak di tempat kamu melepasnya, memakai b = −2a·h dan c = k + a·h². Arahkan kursor ke mana pun di grafik untuk membaca x dan f(x), dan pakai tombol preset untuk melompat ke tiga kasus diskriminan.',
        'Jendelanya tetap dari −10 sampai 10 pada kedua sumbu, sehingga parabola yang curam atau lebar bisa keluar layar dan akar di luar ±10 tidak terlihat walau tetap tercantum di bagian atas. Nilai dibulatkan ke dua atau tiga desimal, sehingga Δ yang tampil 0,000 mungkin sebenarnya bilangan positif atau negatif yang sangat kecil. Nilai y puncak yang ditampilkan, c − b²/(4a), adalah nilai minimum f ketika a > 0 dan maksimum ketika a < 0.',
      ],
    },
    figure: {
      caption: {
        en: 'f(x) = x² − 2x − 3. The y-intercept is c = −3, the vertex is at x = −b/(2a) = 1, and Δ = 16 > 0 gives two roots, x = −1 and x = 3, equally spaced about the axis of symmetry.',
        id: 'f(x) = x² − 2x − 3. Titik potong sumbu-y adalah c = −3, puncak berada di x = −b/(2a) = 1, dan Δ = 16 > 0 memberi dua akar, x = −1 dan x = 3, berjarak sama dari sumbu simetri.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A parabola with its vertex, roots and y-intercept', 'Parabola dengan puncak, akar, dan titik potong sumbu-y')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.4;fill:none}.s{font-size:10px}</style>
  <line x1="30" y1="129" x2="350" y2="129" class="ax" marker-end="url(#a)"/>
  <line x1="152.5" y1="232" x2="152.5" y2="12" class="ax" marker-end="url(#a)"/>
  <text x="344" y="144" class="s">x</text>
  <text x="160" y="20" class="s">y</text>
  <line x1="190" y1="20" x2="190" y2="222" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4 3"/>
  <text x="196" y="30" fill="#f59e0b" class="s">${L('axis of symmetry x = 1', 'sumbu simetri x = 1')}</text>
  <path d="M77.5 38.2 Q190 365.4 302.5 38.2" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <circle cx="115" cy="129" r="5" fill="#10b981"/>
  <circle cx="265" cy="129" r="5" fill="#10b981"/>
  <text x="110" y="118" text-anchor="end" fill="#10b981" class="s" font-weight="bold">x₁ = −1</text>
  <text x="272" y="118" fill="#10b981" class="s" font-weight="bold">x₂ = 3</text>
  <circle cx="152.5" cy="183.6" r="5" fill="#8b5cf6"/>
  <text x="146" y="188" text-anchor="end" fill="#8b5cf6" class="s">c = −3</text>
  <circle cx="190" cy="201.8" r="5" fill="#f59e0b"/>
  <text x="200" y="214" fill="#f59e0b" class="s" font-weight="bold">${L('vertex (1, −4)', 'puncak (1, −4)')}</text>
  <line x1="115" y1="129" x2="190" y2="129" stroke="#10b981" stroke-width="1" stroke-dasharray="2 3"/>
  <line x1="190" y1="129" x2="265" y2="129" stroke="#10b981" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="152" y="142" text-anchor="middle" fill="#10b981" class="s">2</text>
  <text x="228" y="142" text-anchor="middle" fill="#10b981" class="s">2</text>
  <text x="30" y="166" class="s" font-weight="bold">f(x) = x² − 2x − 3</text>
  <text x="30" y="181" class="s">a = 1, b = −2, c = −3</text>
  <text x="30" y="196" class="s">Δ = b² − 4ac = 4 + 12 = 16</text>
  <text x="30" y="211" class="s">x = (2 ± √16) / 2 = (2 ± 4) / 2</text>
  <text x="30" y="226" class="s">${L('roots', 'akar')}: −1 ${L('and', 'dan')} 3</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The roots of ax² + bx + c = 0 are the x-values where the parabola crosses the x-axis, given by x = (−b ± √Δ)/(2a).',
        'The discriminant Δ = b² − 4ac tells how many real roots there are: two if positive, one if zero, none if negative.',
        'The vertex lies on the axis of symmetry x = −b/(2a), exactly midway between the two roots when they exist.',
        'a sets the direction and width of the parabola, c sets the y-intercept, and b (with a) shifts the vertex.',
        'A quadratic with no real roots still has a graph; it simply never touches the x-axis.',
      ],
      id: [
        'Akar dari ax² + bx + c = 0 adalah nilai x tempat parabola memotong sumbu-x, diberikan oleh x = (−b ± √Δ)/(2a).',
        'Diskriminan Δ = b² − 4ac menentukan banyaknya akar real: dua jika positif, satu jika nol, tidak ada jika negatif.',
        'Puncak terletak pada sumbu simetri x = −b/(2a), tepat di tengah antara kedua akar jika akarnya ada.',
        'a menentukan arah dan lebar parabola, c menentukan titik potong sumbu-y, dan b (bersama a) menggeser puncak.',
        'Persamaan kuadrat tanpa akar real tetap punya grafik; grafiknya hanya tidak pernah menyentuh sumbu-x.',
      ],
    },
    vocabulary: {
      en: [
        ['Parabola', 'The U-shaped graph of a quadratic function.'],
        ['Root (zero)', 'A value of x for which f(x) = 0; graphically, where the curve meets the x-axis.'],
        ['Discriminant (Δ)', 'The quantity b² − 4ac under the square root in the quadratic formula; its sign gives the number of real roots.'],
        ['Vertex', 'The turning point of the parabola, its lowest point if a > 0 or highest if a < 0, at (−b/(2a), c − b²/(4a)).'],
        ['Axis of symmetry', 'The vertical line x = −b/(2a) through the vertex; the parabola is its own mirror image across it.'],
        ['y-intercept', 'The point (0, c) where the graph crosses the y-axis.'],
        ['Coefficient', 'A number multiplying a power of x; here a, b and c.'],
        ['Completing the square', 'Rewriting ax² + bx + c as a(x − h)² + k, which reveals the vertex (h, k) and leads to the quadratic formula.'],
      ],
      id: [
        ['Parabola', 'Grafik berbentuk U dari fungsi kuadrat.'],
        ['Akar (pembuat nol)', 'Nilai x yang membuat f(x) = 0; secara grafik, tempat kurva bertemu sumbu-x.'],
        ['Diskriminan (Δ)', 'Besaran b² − 4ac di bawah tanda akar pada rumus kuadrat; tandanya menentukan banyaknya akar real.'],
        ['Puncak (titik balik)', 'Titik balik parabola, titik terendah jika a > 0 atau tertinggi jika a < 0, di (−b/(2a), c − b²/(4a)).'],
        ['Sumbu simetri', 'Garis tegak x = −b/(2a) yang melalui puncak; parabola adalah bayangan cermin dirinya sendiri terhadap garis ini.'],
        ['Titik potong sumbu-y', 'Titik (0, c) tempat grafik memotong sumbu-y.'],
        ['Koefisien', 'Bilangan yang mengalikan pangkat x; di sini a, b, dan c.'],
        ['Melengkapkan kuadrat', 'Menulis ulang ax² + bx + c sebagai a(x − h)² + k, yang memperlihatkan puncak (h, k) dan menghasilkan rumus kuadrat.'],
      ],
    },
    misconceptions: {
      en: [
        ['A negative discriminant means the equation has no solutions at all.', 'It has no real solutions. The two solutions are complex numbers, which is why the graph, drawn over real x, never meets the x-axis.'],
        ['A larger a makes the parabola wider.', 'A larger |a| makes it narrower, because x² is multiplied by a bigger number and the curve rises faster. Values of a between −1 and 1 give wider parabolas.'],
        ['c is where the parabola crosses the x-axis.', 'c is the y-intercept: f(0) = c. The x-axis crossings are the roots, which depend on all three coefficients through the quadratic formula.'],
        ['Changing b only slides the parabola left or right.', 'The vertex moves both sideways and up or down, because its height c − b²/(4a) also depends on b. Slide b in the sim and watch the vertex trace out its own curve.'],
      ],
      id: [
        ['Diskriminan negatif berarti persamaan tidak punya penyelesaian sama sekali.', 'Persamaan itu tidak punya penyelesaian real. Kedua penyelesaiannya bilangan kompleks, itulah sebabnya grafik, yang digambar untuk x real, tidak pernah bertemu sumbu-x.'],
        ['a yang lebih besar membuat parabola lebih lebar.', '|a| yang lebih besar membuatnya lebih sempit, karena x² dikalikan bilangan yang lebih besar dan kurva naik lebih cepat. Nilai a antara −1 dan 1 memberi parabola yang lebih lebar.'],
        ['c adalah tempat parabola memotong sumbu-x.', 'c adalah titik potong sumbu-y: f(0) = c. Perpotongan dengan sumbu-x adalah akar, yang bergantung pada ketiga koefisien lewat rumus kuadrat.'],
        ['Mengubah b hanya menggeser parabola ke kiri atau kanan.', 'Puncak bergerak ke samping sekaligus naik atau turun, karena tingginya c − b²/(4a) juga bergantung pada b. Geser b di simulasi dan perhatikan puncak menelusuri kurvanya sendiri.'],
      ],
    },
    realWorld: {
      en: [
        'The height of a thrown ball follows h = −4.9t² + v·t + h₀; the roots tell when it is at ground level and the vertex gives the highest point.',
        'Satellite dishes, car headlights and solar cookers are parabolic because a parabola focuses parallel rays to a single point.',
        'A farmer with a fixed length of fence maximises the enclosed rectangular area by finding the vertex of a quadratic.',
        'Businesses model revenue as price × quantity sold; when demand falls linearly with price, revenue is a downward parabola whose vertex is the best price.',
      ],
      id: [
        'Tinggi bola yang dilempar mengikuti h = −4,9t² + v·t + h₀; akarnya menunjukkan kapan bola di tanah dan puncaknya memberi titik tertinggi.',
        'Antena parabola, lampu depan mobil, dan kompor tenaga surya berbentuk parabola karena parabola memusatkan sinar sejajar ke satu titik.',
        'Petani dengan panjang pagar tertentu memaksimalkan luas persegi panjang yang dikelilingi dengan mencari puncak sebuah fungsi kuadrat.',
        'Usaha memodelkan pendapatan sebagai harga × jumlah terjual; jika permintaan turun linear terhadap harga, pendapatannya parabola terbuka ke bawah yang puncaknya adalah harga terbaik.',
      ],
    },
    questions: {
      en: [
        { q: 'For a = 1, b = −5, c = 6, find Δ, the roots and the vertex.', a: 'Δ = 25 − 24 = 1. x = (5 ± 1)/2, so the roots are 2 and 3. The vertex is at x = 5/2 = 2.5, midway between them, and f(2.5) = 6.25 − 12.5 + 6 = −0.25, so the vertex is (2.5, −0.25).' },
        { q: 'Set a = 2, b = 4, c = 5. Without looking at the graph, how many times does the parabola cross the x-axis, and where is its vertex?', a: 'Δ = 16 − 40 = −24 < 0, so it never crosses. The vertex is at x = −4/4 = −1 and y = 5 − 16/8 = 3, so the lowest point (−1, 3) is above the axis, consistent with no real roots since a > 0.' },
        { q: 'Why is the vertex always exactly halfway between the two roots?', a: 'The roots are −b/(2a) − √Δ/(2a) and −b/(2a) + √Δ/(2a): the same centre value with the same amount subtracted and added. Their average is −b/(2a), which is the x-coordinate of the vertex, and the parabola is symmetric about that line.' },
      ],
      id: [
        { q: 'Untuk a = 1, b = −5, c = 6, tentukan Δ, akar-akarnya, dan puncaknya.', a: 'Δ = 25 − 24 = 1. x = (5 ± 1)/2, jadi akarnya 2 dan 3. Puncak berada di x = 5/2 = 2,5, di tengah keduanya, dan f(2,5) = 6,25 − 12,5 + 6 = −0,25, jadi puncaknya (2,5; −0,25).' },
        { q: 'Atur a = 2, b = 4, c = 5. Tanpa melihat grafik, berapa kali parabola memotong sumbu-x, dan di mana puncaknya?', a: 'Δ = 16 − 40 = −24 < 0, jadi tidak pernah memotong. Puncak berada di x = −4/4 = −1 dan y = 5 − 16/8 = 3, sehingga titik terendah (−1, 3) berada di atas sumbu, sesuai dengan tidak adanya akar real karena a > 0.' },
        { q: 'Mengapa puncak selalu tepat di tengah antara kedua akar?', a: 'Akarnya adalah −b/(2a) − √Δ/(2a) dan −b/(2a) + √Δ/(2a): nilai tengah yang sama dikurangi dan ditambah besaran yang sama. Rata-ratanya −b/(2a), yaitu koordinat x puncak, dan parabola simetris terhadap garis itu.' },
      ],
    },
  },
};
