// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      "Apply x_{n+1} = x_n − f(x_n)/f'(x_n).",
      'Compare quadratic convergence near a root vs slow start far away.',
      'See cycles, divergence, and basins of attraction.',
    ],
    id: [
      "Menerapkan x_{n+1} = x_n − f(x_n)/f'(x_n).",
      'Membandingkan konvergensi kuadratik dekat akar vs awal lambat di kejauhan.',
      'Melihat siklus, divergensi, dan basin of attraction.',
    ],
  },  tryThis: {
    en: [
      'Click near a root — usually 3-4 iterations.',
      "Click far away — does it overshoot or settle on the wrong root?",
      "Try f(x) = x³ - x — three roots, three basins.",
    ],
    id: [
      'Klik dekat akar — biasanya 3-4 iterasi.',
      'Klik jauh — apakah melompati atau menetap di akar yang salah?',
      'Coba f(x) = x³ - x — tiga akar, tiga basin.',
    ],
  },
  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Solving f(x) = 0 exactly is often impossible: x³ − 2x − 5 = 0 has no tidy formula answer and cos(x) = 0.5x has none at all. Newton\'s method gives a number anyway: start with a guess x₀, draw the tangent line to the curve at that point, and follow it down to where it crosses the x-axis. A straight line is easy to solve, and the crossing point x₁ is usually much closer to the true root than x₀ was. Repeating from x₁ gives x₂, and so on. Because the tangent at xₙ has slope f\'(xₙ) and passes through (xₙ, f(xₙ)), its crossing point is xₙ₊₁ = xₙ − f(xₙ)/f\'(xₙ).',
        'In the simulation, clicking on the graph sets x₀ at that horizontal position. Each yellow segment is a tangent line followed to the axis, each dotted vertical returns to the curve at the new x, and the red dots are the successive guesses, labelled x₀, x₁, x₂ and so on. The Max iterations slider caps how many steps are taken, and the readout shows the final x together with f at that point. The function menu offers a cubic with one real root near 2.09, the cubic x³ − x with roots at −1, 0 and 1, e^x − 2 with root ln 2, and cos(x) − 0.5x with a root near 1.03.',
        'Near a root the method is remarkably fast. Once a guess is close, each step roughly doubles the number of correct digits: an error of 0.1 becomes about 0.01, then about 0.0001, then about 0.00000001. This is called quadratic convergence, and it is why three or four iterations are often enough. Far from a root the story is different: the tangent is a poor stand-in for the curve, so a step may overshoot wildly, and if f\'(xₙ) is close to zero the tangent is almost flat and sends the next guess far away. With x³ − x, starting at x₀ = 0.5 lands exactly on −1 in one step, x₀ = 0.6 is flung out to 5.4 and then creeps back to 1, and x₀ = 0.45 bounces around for many steps: the set of starting points that end at each root, its basin of attraction, has a complicated boundary.',
        'The simulation uses exact formulas for f and f\', so it shows the method itself rather than any difficulty in computing derivatives. It stops early if the slope is smaller than about 10⁻⁹, and the readout says "Converged" only when f at the newest guess is essentially zero (below 10⁻¹⁰) or the last step moved x by less than that; if the iteration budget runs out first, or the tangent goes flat, it says "Did not converge" instead, so raise Max iterations or start closer to a root. Guesses can leave the visible window of x from −3 to 3 and come back, and the lab panel lets you record how many steps each starting point needed and which root it reached.',
      ],
      id: [
        'Menyelesaikan f(x) = 0 secara eksak sering tidak mungkin: x³ − 2x − 5 = 0 tidak punya jawaban rumus yang rapi dan cos(x) = 0,5x tidak punya rumus sama sekali. Metode Newton tetap memberi sebuah bilangan: mulailah dengan tebakan x₀, gambar garis singgung kurva di titik itu, lalu ikuti garis itu turun sampai memotong sumbu-x. Garis lurus mudah diselesaikan, dan titik potong x₁ biasanya jauh lebih dekat ke akar sebenarnya daripada x₀. Mengulang dari x₁ memberi x₂, dan seterusnya. Karena garis singgung di xₙ berkemiringan f\'(xₙ) dan melewati (xₙ, f(xₙ)), titik potongnya adalah xₙ₊₁ = xₙ − f(xₙ)/f\'(xₙ).',
        'Dalam simulasi, mengeklik grafik menetapkan x₀ pada posisi mendatar itu. Setiap ruas kuning adalah garis singgung yang diikuti sampai ke sumbu, setiap garis tegak putus-putus kembali ke kurva pada x yang baru, dan titik-titik merah adalah tebakan berturut-turut, berlabel x₀, x₁, x₂, dan seterusnya. Slider Max iterations membatasi jumlah langkah, dan tampilan menunjukkan x terakhir beserta nilai f di titik itu. Menu fungsi menyediakan kubik dengan satu akar real dekat 2,09, kubik x³ − x dengan akar di −1, 0, dan 1, e^x − 2 dengan akar ln 2, dan cos(x) − 0,5x dengan akar dekat 1,03.',
        'Dekat akar, metode ini luar biasa cepat. Begitu tebakan sudah dekat, tiap langkah kira-kira menggandakan jumlah angka yang benar: galat 0,1 menjadi sekitar 0,01, lalu sekitar 0,0001, lalu sekitar 0,00000001. Ini disebut konvergensi kuadratik, dan itulah sebabnya tiga atau empat iterasi sering sudah cukup. Jauh dari akar ceritanya berbeda: garis singgung menjadi pengganti kurva yang buruk, sehingga satu langkah bisa melompat terlalu jauh, dan jika f\'(xₙ) hampir nol garis singgungnya hampir mendatar dan melempar tebakan berikutnya ke tempat yang jauh. Dengan x³ − x, mulai dari x₀ = 0,5 tepat mendarat di −1 dalam satu langkah, x₀ = 0,6 terlempar ke 5,4 lalu merayap kembali ke 1, dan x₀ = 0,45 memantul-mantul selama banyak langkah: himpunan titik awal yang berakhir di tiap akar, yaitu basin of attraction-nya, berbatas rumit.',
        'Simulasi memakai rumus eksak untuk f dan f\', sehingga ia memperlihatkan metodenya sendiri, bukan kesulitan menghitung turunan. Ia berhenti lebih awal jika kemiringan lebih kecil dari sekitar 10⁻⁹, dan tampilannya menulis "Konvergen" hanya jika f pada tebakan terbaru pada dasarnya nol (di bawah 10⁻¹⁰) atau langkah terakhir menggeser x kurang dari itu; jika jatah iterasi habis lebih dulu, atau garis singgungnya mendatar, tampilan menulis "Tidak konvergen", jadi naikkan Max iterations atau mulailah lebih dekat ke akar. Tebakan bisa keluar dari jendela x antara −3 dan 3 lalu kembali, dan panel lab memungkinkanmu mencatat berapa langkah yang dibutuhkan tiap titik awal dan akar mana yang dicapainya.',
      ],
    },
    figure: {
      caption: {
        en: 'Two Newton steps on f(x) = x² − 2 from x₀ = 3. The tangent at x₀ meets the axis at x₁ = 3 − 7/6 ≈ 1.833; the tangent at x₁ gives x₂ ≈ 1.462, already close to the root √2 ≈ 1.414.',
        id: 'Dua langkah Newton pada f(x) = x² − 2 dari x₀ = 3. Garis singgung di x₀ memotong sumbu di x₁ = 3 − 7/6 ≈ 1,833; garis singgung di x₁ memberi x₂ ≈ 1,462, sudah dekat ke akar √2 ≈ 1,414.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Newton steps following tangent lines to the axis', 'Langkah Newton mengikuti garis singgung ke sumbu')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px;opacity:.7}</style>
  <line x1="20" y1="168.6" x2="345" y2="168.6" class="m"/>
  <line x1="30" y1="12" x2="30" y2="225" class="m"/>
  <text x="332" y="182" class="s">x</text>
  <path d="M30 205.7 Q180 205.7 330 15.5" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <text x="250" y="20" fill="#3b82f6">f(x) = x² − 2</text>
  <line x1="311.3" y1="38.6" x2="201.9" y2="168.6" stroke="#f59e0b" stroke-width="2"/>
  <line x1="201.9" y1="168.6" x2="201.9" y2="143.3" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="201.9" y1="143.3" x2="167.1" y2="168.6" stroke="#f59e0b" stroke-width="2"/>
  <line x1="167.1" y1="168.6" x2="167.1" y2="166" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 3"/>
  <circle cx="311.3" cy="38.6" r="5" fill="#ef4444"/>
  <text x="318" y="48" fill="#ef4444">x₀ = 3</text>
  <circle cx="201.9" cy="143.3" r="5" fill="#ef4444"/>
  <text x="208" y="140" fill="#ef4444">x₁ ≈ 1.833</text>
  <circle cx="167.1" cy="166" r="5" fill="#ef4444"/>
  <text x="128" y="156" fill="#ef4444">x₂ ≈ 1.462</text>
  <circle cx="162.6" cy="168.6" r="3.5" fill="#10b981"/>
  <text x="132" y="186" fill="#10b981">${L('root √2', 'akar √2')}</text>
  <text x="212" y="100" fill="#f59e0b">${L('tangent at x₀', 'garis singgung di x₀')}</text>
  <text x="212" y="113" fill="#f59e0b" class="s">${L("slope f'(3) = 6", "kemiringan f'(3) = 6")}</text>
  <text x="36" y="206" class="s">x₁ = x₀ − f(x₀)/f'(x₀)</text>
  <text x="36" y="220" class="s">= 3 − 7/6 ≈ 1.833</text>
  <text x="36" y="234" class="s">${L('each step: slide down the tangent to the axis', 'tiap langkah: turun sepanjang garis singgung ke sumbu')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Each Newton step replaces the curve by its tangent line and solves that line instead: xₙ₊₁ = xₙ − f(xₙ)/f\'(xₙ).',
        'Near a simple root the convergence is quadratic: the number of correct digits roughly doubles with every step.',
        'Where the slope f\'(xₙ) is near zero the tangent is almost flat and the next guess can be thrown far away.',
        'Different starting points can lead to different roots; the regions that lead to each root are its basin of attraction.',
        'The method needs a good starting guess and a differentiable function; it is fast but not guaranteed to succeed.',
      ],
      id: [
        'Setiap langkah Newton mengganti kurva dengan garis singgungnya dan menyelesaikan garis itu: xₙ₊₁ = xₙ − f(xₙ)/f\'(xₙ).',
        'Dekat akar sederhana konvergensinya kuadratik: jumlah angka yang benar kira-kira menggandakan diri setiap langkah.',
        'Di tempat kemiringan f\'(xₙ) hampir nol, garis singgung hampir mendatar dan tebakan berikutnya bisa terlempar jauh.',
        'Titik awal yang berbeda bisa menuju akar yang berbeda; daerah yang menuju tiap akar adalah basin of attraction-nya.',
        'Metode ini membutuhkan tebakan awal yang baik dan fungsi yang dapat diturunkan; cepat tetapi tidak dijamin berhasil.',
      ],
    },
    vocabulary: {
      en: [
        ['Root (zero)', 'A value x with f(x) = 0; graphically, where the curve crosses the x-axis.'],
        ['Iteration', 'One repetition of the step from xₙ to xₙ₊₁; the method is a sequence of iterations.'],
        ['Tangent line', 'The straight line touching the curve at xₙ with slope f\'(xₙ); Newton\'s method follows it to the axis.'],
        ['Quadratic convergence', 'Error shrinking roughly to the square of the previous error, so correct digits double each step.'],
        ['Basin of attraction', 'The set of starting points from which the iteration converges to a particular root.'],
        ['Divergence', 'When the iterates move away from every root or grow without bound instead of settling.'],
        ['Cycle', 'When the iterates repeat a pattern of values forever without reaching a root.'],
        ['Stationary point', 'A point where f\'(x) = 0; the tangent there is horizontal and the Newton step is undefined.'],
      ],
      id: [
        ['Akar (pembuat nol)', 'Nilai x dengan f(x) = 0; pada grafik, tempat kurva memotong sumbu-x.'],
        ['Iterasi', 'Satu pengulangan langkah dari xₙ ke xₙ₊₁; metode ini adalah barisan iterasi.'],
        ['Garis singgung', 'Garis lurus yang menyentuh kurva di xₙ dengan kemiringan f\'(xₙ); metode Newton mengikutinya ke sumbu.'],
        ['Konvergensi kuadratik', 'Galat menyusut kira-kira menjadi kuadrat galat sebelumnya, sehingga angka yang benar menggandakan diri tiap langkah.'],
        ['Basin of attraction', 'Himpunan titik awal yang iterasinya konvergen ke akar tertentu.'],
        ['Divergensi', 'Ketika iterasi menjauh dari semua akar atau membesar tanpa batas, bukan menetap.'],
        ['Siklus', 'Ketika iterasi mengulang pola nilai selamanya tanpa mencapai akar.'],
        ['Titik stasioner', 'Titik dengan f\'(x) = 0; garis singgungnya mendatar dan langkah Newton tidak terdefinisi.'],
      ],
    },
    misconceptions: {
      en: [
        ['Newton\'s method always finds the root closest to the starting point.', 'It often does not. From x₀ = 0.6 on x³ − x the nearest root is 1, but the first step jumps to 5.4; from 0.5 it lands on −1, farther away than 0 or 1.'],
        ['Starting twice as far away needs twice as many iterations.', 'Once the iterates are in the fast zone, each step doubles the correct digits, so extra distance costs only a few extra steps, not proportionally more.'],
        ['If the readout says "Did not converge", the function has no root there.', 'It only means the iteration budget ran out, or the tangent went flat, before |f| dropped below 10⁻¹⁰. Raise Max iterations or start closer to a root and the same function usually converges in a few steps.'],
        ['A smaller value of f(xₙ) always means the guess is closer to the root.', 'Not when the curve is steep or flat. A flat stretch can have small f far from any root, which is exactly where a Newton step overshoots.'],
      ],
      id: [
        ['Metode Newton selalu menemukan akar terdekat dari titik awal.', 'Sering tidak. Dari x₀ = 0,6 pada x³ − x akar terdekatnya 1, tetapi langkah pertama melompat ke 5,4; dari 0,5 ia mendarat di −1, lebih jauh daripada 0 atau 1.'],
        ['Mulai dua kali lebih jauh membutuhkan iterasi dua kali lebih banyak.', 'Begitu iterasi masuk zona cepat, tiap langkah menggandakan angka yang benar, sehingga jarak tambahan hanya memakan beberapa langkah tambahan, bukan sebanding.'],
        ['Jika tampilan menulis "Tidak konvergen", fungsinya tidak punya akar di sana.', 'Itu hanya berarti jatah iterasi habis, atau garis singgungnya mendatar, sebelum |f| turun di bawah 10⁻¹⁰. Naikkan Max iterations atau mulailah lebih dekat ke akar, dan fungsi yang sama biasanya konvergen dalam beberapa langkah.'],
        ['Nilai f(xₙ) yang lebih kecil selalu berarti tebakan lebih dekat ke akar.', 'Tidak jika kurvanya curam atau landai. Bagian landai bisa punya f kecil jauh dari akar mana pun, dan di sanalah langkah Newton melompat terlalu jauh.'],
      ],
    },
    realWorld: {
      en: [
        'Calculators and computers compute square roots with Newton\'s method on x² − a; a few steps give full precision.',
        'GPS receivers solve for position by applying Newton-type iterations to the distance equations from several satellites.',
        'Engineers find the equilibrium of circuits and structures by solving large systems of nonlinear equations with a multidimensional Newton method.',
        'Finance software finds the interest rate implied by a loan or bond price (the internal rate of return) with Newton iterations.',
      ],
      id: [
        'Kalkulator dan komputer menghitung akar kuadrat dengan metode Newton pada x² − a; beberapa langkah sudah memberi ketelitian penuh.',
        'Penerima GPS menentukan posisi dengan menerapkan iterasi jenis Newton pada persamaan jarak dari beberapa satelit.',
        'Insinyur menemukan kesetimbangan rangkaian dan struktur dengan menyelesaikan sistem besar persamaan nonlinear memakai metode Newton multidimensi.',
        'Perangkat lunak keuangan menemukan suku bunga yang tersirat dari harga pinjaman atau obligasi (tingkat pengembalian internal) dengan iterasi Newton.',
      ],
    },
    questions: {
      en: [
        { q: 'For f(x) = x³ − 2x − 5 with x₀ = 2.5, compute x₁ by hand and compare with the simulation.', a: 'f(2.5) = 15.625 − 5 − 5 = 5.625 and f\'(2.5) = 3·6.25 − 2 = 16.75. So x₁ = 2.5 − 5.625/16.75 ≈ 2.164. The next steps give 2.0971 and 2.09455, matching the root 2.094551 to six digits by x₄.' },
        { q: 'For f(x) = x³ − x, why does clicking at x₀ = 0.5 land exactly on the root −1 in one step?', a: 'f(0.5) = 0.125 − 0.5 = −0.375 and f\'(0.5) = 0.75 − 1 = −0.25, so x₁ = 0.5 − (−0.375)/(−0.25) = 0.5 − 1.5 = −1. The tangent happens to cross the axis exactly at the root, and f(−1) = 0 so every later step stays there.' },
        { q: 'What goes wrong if you start Newton\'s method on x³ − x at x₀ = 1/√3 ≈ 0.577?', a: 'That is where f\'(x) = 3x² − 1 = 0, so the tangent is horizontal and never meets the axis; the formula would divide by zero. The simulation stops when the slope is below about 10⁻⁹. Starting slightly to either side gives a nearly flat tangent and a huge jump, which is why 0.6 is flung out to 5.4.' },
      ],
      id: [
        { q: 'Untuk f(x) = x³ − 2x − 5 dengan x₀ = 2,5, hitung x₁ secara manual dan bandingkan dengan simulasi.', a: 'f(2,5) = 15,625 − 5 − 5 = 5,625 dan f\'(2,5) = 3·6,25 − 2 = 16,75. Jadi x₁ = 2,5 − 5,625/16,75 ≈ 2,164. Langkah berikutnya memberi 2,0971 dan 2,09455, cocok dengan akar 2,094551 sampai enam angka pada x₄.' },
        { q: 'Untuk f(x) = x³ − x, mengapa mengeklik di x₀ = 0,5 tepat mendarat di akar −1 dalam satu langkah?', a: 'f(0,5) = 0,125 − 0,5 = −0,375 dan f\'(0,5) = 0,75 − 1 = −0,25, jadi x₁ = 0,5 − (−0,375)/(−0,25) = 0,5 − 1,5 = −1. Garis singgungnya kebetulan memotong sumbu tepat di akar, dan f(−1) = 0 sehingga semua langkah berikutnya tetap di sana.' },
        { q: 'Apa yang salah jika metode Newton pada x³ − x dimulai di x₀ = 1/√3 ≈ 0,577?', a: 'Di sana f\'(x) = 3x² − 1 = 0, jadi garis singgungnya mendatar dan tidak pernah bertemu sumbu; rumusnya akan membagi dengan nol. Simulasi berhenti ketika kemiringan di bawah sekitar 10⁻⁹. Mulai sedikit di kiri atau kanannya memberi garis singgung yang hampir mendatar dan lompatan besar, itulah sebabnya 0,6 terlempar ke 5,4.' },
      ],
    },
  },
};
