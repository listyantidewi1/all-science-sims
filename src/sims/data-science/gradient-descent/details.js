// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect step direction to negative gradient.',
      'See learning rate trade-off: speed vs stability.',
      'Distinguish convex vs non-convex landscapes (multiple minima).',
    ],
    id: [
      'Mengaitkan arah langkah dengan negatif gradien.',
      'Melihat trade-off learning rate: kecepatan vs kestabilan.',
      'Membedakan landskap konveks vs non-konveks (banyak minimum).',
    ],
  },
  tryThis: {
    en: [
      'Lower learning rate to 0.005 — does it slow to a crawl?',
      'Raise learning rate to 0.5 — does it bounce out?',
      'Switch to multi-modal — does the start point matter?',
    ],
    id: [
      'Turunkan learning rate ke 0,005 — apakah merayap?',
      'Naikkan learning rate ke 0,5 — apakah memantul keluar?',
      'Beralih ke multi-modal — apakah titik awal penting?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Training a machine-learning model means choosing parameters that make a loss function as small as possible. With two parameters (x, y) the loss L(x, y) is a landscape: height is loss, and we want the lowest valley. The gradient ∇L = (∂L/∂x, ∂L/∂y) is the vector that points in the direction of steepest ascent, and its length says how steep the slope is. Gradient descent takes a step the opposite way: (x, y) ← (x, y) − η·∇L, where η is the learning rate. Repeating this walks downhill. Real models have millions of parameters, but every step is the same rule applied in millions of directions at once.',
        'The simulation offers four landscapes. The convex bowl L = ½(x² + y²) has gradient (x, y) and a single minimum at the origin. The banana valley is a Rosenbrock-type function, L = (1 − x)² + 5(y − x²)²; the textbook version uses 100 instead of 5, which has been softened here so the valley is visible. The multi-modal surface L = sin(1.5x)·cos(1.5y) + 0.05(x² + y²) has many local minima. The saddle L = x² − y² curves up along x and down along y, so the origin has zero gradient but is not a minimum. Click to drop a marble; the heatmap and contour lines show height, the yellow trail is the path, and the readout shows the current loss and step count. Steps per second only changes the animation speed, not the mathematics.',
        'The learning rate decides how far each step goes. On the bowl each step multiplies the distance from the centre by (1 − η), so with η = 0.05 the marble creeps in by 5% per step and needs about 90 steps to get within 1% of the minimum, while η = 0.5 halves the distance each step. For a quadratic the update is stable as long as η is less than 2 divided by the curvature; the bowl has curvature 1, so it converges for every η on the slider, and you will not see it overshoot. The banana valley is different: its curvature across the valley is about 10, so for η above roughly 0.2 the marble overshoots from wall to wall, the oscillation grows, and it flies off the map (the sim removes it once it leaves the drawn area). The momentum slider adds a velocity term, v ← β·v − η·∇L, which averages recent gradients: it accelerates along directions that keep agreeing and damps the zig-zag across narrow valleys, which is why it helps so much on the banana.',
        'On the multi-modal surface the marble stops in whichever basin it started in; gradient descent only ever moves downhill, so it cannot climb out of a local minimum to find a lower one, and different starting clicks give different final losses. On the saddle a marble released exactly on the line y = 0 slides to the origin and stalls, while any tiny offset lets it escape downward along y. The sim simplifies in several ways: it uses exact gradients rather than the noisy mini-batch estimates of stochastic gradient descent, keeps the learning rate fixed rather than adapting it as modern optimisers such as Adam do, and shows only two parameters. The intuitions, though, carry over directly.',
      ],
      id: [
        'Melatih model pembelajaran mesin berarti memilih parameter yang membuat fungsi loss sekecil mungkin. Dengan dua parameter (x, y), loss L(x, y) menjadi sebuah landskap: ketinggian adalah loss, dan kita ingin lembah terendah. Gradien ∇L = (∂L/∂x, ∂L/∂y) adalah vektor yang menunjuk ke arah tanjakan paling curam, dan panjangnya menyatakan seberapa curam lerengnya. Penurunan gradien melangkah ke arah sebaliknya: (x, y) ← (x, y) − η·∇L, dengan η adalah learning rate (laju pembelajaran). Mengulanginya berarti berjalan menuruni bukit. Model sungguhan memiliki jutaan parameter, tetapi setiap langkahnya adalah aturan yang sama yang diterapkan ke jutaan arah sekaligus.',
        'Simulasi ini menyediakan empat landskap. Mangkuk konveks L = ½(x² + y²) bergradien (x, y) dan memiliki satu minimum di titik asal. Lembah pisang adalah fungsi bertipe Rosenbrock, L = (1 − x)² + 5(y − x²)²; versi buku teks memakai 100 alih-alih 5, yang di sini dilunakkan supaya lembahnya terlihat. Permukaan multi-modal L = sin(1,5x)·cos(1,5y) + 0,05(x² + y²) memiliki banyak minimum lokal. Pelana L = x² − y² melengkung ke atas sepanjang x dan ke bawah sepanjang y, sehingga titik asal bergradien nol tetapi bukan minimum. Klik untuk menjatuhkan bola; peta warna dan garis kontur menunjukkan ketinggian, jejak kuning adalah lintasannya, dan panel menampilkan loss saat ini serta jumlah langkah. Langkah per detik hanya mengubah kecepatan animasi, bukan matematikanya.',
        'Learning rate menentukan seberapa jauh setiap langkah. Pada mangkuk, setiap langkah mengalikan jarak dari pusat dengan (1 − η), sehingga dengan η = 0,05 bola merayap mendekat 5% per langkah dan butuh sekitar 90 langkah untuk berada dalam 1% dari minimum, sedangkan η = 0,5 memotong jaraknya menjadi separuh tiap langkah. Untuk fungsi kuadrat, pembaruan stabil selama η lebih kecil dari 2 dibagi kelengkungan; mangkuk berkelengkungan 1, sehingga konvergen untuk setiap η pada slider, dan kamu tidak akan melihatnya melompati minimum. Lembah pisang berbeda: kelengkungannya melintang lembah sekitar 10, sehingga untuk η di atas kira-kira 0,2 bola melompat dari dinding ke dinding, osilasinya membesar, dan ia terbang keluar peta (simulasi menghapusnya begitu keluar dari area gambar). Slider momentum menambahkan suku kecepatan, v ← β·v − η·∇L, yang merata-ratakan gradien terakhir: ia mempercepat di arah yang terus sejalan dan meredam zig-zag melintang lembah sempit; itulah sebabnya momentum sangat membantu pada lembah pisang.',
        'Pada permukaan multi-modal bola berhenti di cekungan tempat ia mulai; penurunan gradien hanya pernah bergerak menurun, sehingga tidak bisa memanjat keluar dari minimum lokal untuk menemukan yang lebih rendah, dan klik awal yang berbeda memberi loss akhir yang berbeda. Pada pelana, bola yang dilepas tepat di garis y = 0 meluncur ke titik asal dan macet, sedangkan geseran sekecil apa pun membuatnya lolos menurun sepanjang y. Simulasi menyederhanakan beberapa hal: ia memakai gradien eksak, bukan taksiran mini-batch yang berderau seperti pada penurunan gradien stokastik, mempertahankan learning rate tetap alih-alih menyesuaikannya seperti pengoptimal modern semacam Adam, dan hanya menampilkan dua parameter. Intuisinya, bagaimanapun, langsung berlaku.',
      ],
    },
    figure: {
      caption: {
        en: 'Gradient descent on L = x² (gradient 2x) from x = 2. Left: η = 0.3 shrinks the distance by 40% each step. Right: η = 0.9 overshoots the minimum every step; the steps shrink only slowly, and at η = 1 or more they would grow.',
        id: 'Penurunan gradien pada L = x² (gradien 2x) dari x = 2. Kiri: η = 0,3 memangkas jarak 40% tiap langkah. Kanan: η = 0,9 melompati minimum di setiap langkah; langkahnya hanya menyusut perlahan, dan pada η = 1 atau lebih justru akan membesar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const panel = (ox, eta, col, title) => {
          const X = (x) => ox + 75 + x * 28, Y = (y) => 200 - y * 24;
          let curve = '';
          for (let x = -2.5; x <= 2.51; x += 0.25) curve += (x === -2.5 ? 'M' : 'L') + X(x).toFixed(1) + ' ' + Y(x * x).toFixed(1) + ' ';
          let x = 2, path = '', dots = '';
          for (let k = 0; k < 5; k++) {
            path += (k === 0 ? 'M' : 'L') + X(x).toFixed(1) + ' ' + Y(x * x).toFixed(1) + ' ';
            dots += `<circle cx="${X(x).toFixed(1)}" cy="${Y(x * x).toFixed(1)}" r="${k === 0 ? 5 : 3.5}" fill="${col}"/>`;
            x = x - eta * 2 * x;
          }
          return `<text x="${ox + 8}" y="40" class="b" fill="${col}">${title}</text>
  <path d="${curve}" class="c"/>
  <line x1="${X(-2.5)}" y1="${Y(0)}" x2="${X(2.5)}" y2="${Y(0)}" class="m"/>
  <line x1="${X(0)}" y1="${Y(0) + 4}" x2="${X(0)}" y2="${Y(0) - 4}" class="m"/>
  <path d="${path}" fill="none" stroke="${col}" stroke-width="1.6" stroke-dasharray="3 2"/>
  ${dots}
  <text x="${X(2) - 10}" y="${Y(4) - 10}" class="s">x₀ = 2</text>
  <text x="${X(0) - 18}" y="${Y(0) + 16}" class="s">${L('minimum', 'minimum')}</text>`;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Gradient descent steps on a parabola for two learning rates', 'Langkah penurunan gradien pada parabola untuk dua learning rate')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.c{fill:none;stroke:currentColor;stroke-width:1.8;opacity:.8}.s{font-size:10px}.b{font-weight:600}</style>
  <text x="8" y="18" class="b">${L('x ← x − η · dL/dx,  L = x²', 'x ← x − η · dL/dx,  L = x²')}</text>
  ${panel(0, 0.3, '#10b981', 'η = 0.3: 2 → 0.8 → 0.32 → 0.13')}
  ${panel(180, 0.9, '#ef4444', 'η = 0.9: 2 → −1.6 → 1.28 → −1.02')}
  <text x="8" y="232" class="s">${L('Stable while η · curvature &lt; 2 (here curvature = 2, so η &lt; 1).', 'Stabil selama η · kelengkungan &lt; 2 (di sini kelengkungan = 2, jadi η &lt; 1).')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The gradient points uphill; gradient descent steps the other way, by an amount set by the learning rate.',
        'Too small a learning rate crawls; too large a one overshoots, oscillates and can diverge; the stable range depends on the curvature of the loss.',
        'On a convex bowl every start leads to the same minimum; on a multi-modal surface the result depends on where you start.',
        'Momentum averages recent gradients, speeding up along consistent directions and damping zig-zags in narrow valleys.',
        'A saddle point has zero gradient but is not a minimum; descent stalls there only if it arrives exactly along the ridge.',
      ],
      id: [
        'Gradien menunjuk ke arah menanjak; penurunan gradien melangkah ke arah sebaliknya, sejauh yang ditentukan learning rate.',
        'Learning rate terlalu kecil membuat merayap; terlalu besar membuat melompati minimum, berosilasi, dan bisa divergen; rentang stabilnya bergantung pada kelengkungan loss.',
        'Pada mangkuk konveks setiap titik awal menuju minimum yang sama; pada permukaan multi-modal hasilnya bergantung pada titik awal.',
        'Momentum merata-ratakan gradien terakhir, mempercepat di arah yang konsisten dan meredam zig-zag di lembah sempit.',
        'Titik pelana bergradien nol tetapi bukan minimum; penurunan macet di sana hanya jika tiba tepat sepanjang punggungannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Loss function', 'A function of the model parameters that measures how badly the model is doing; training tries to minimise it.'],
        ['Gradient', 'The vector of partial derivatives (∂L/∂x, ∂L/∂y); it points in the direction of steepest increase.'],
        ['Learning rate (η)', 'The multiplier on the gradient that sets the step size.'],
        ['Convex', 'A bowl-shaped landscape with a single minimum, where gradient descent is guaranteed to converge for a small enough step.'],
        ['Local minimum', 'A point lower than all its neighbours but not necessarily the lowest point overall.'],
        ['Saddle point', 'A point where the gradient is zero but the surface curves up in one direction and down in another.'],
        ['Momentum', 'An update rule that keeps a running velocity, v ← βv − η∇L, so steps remember previous gradients.'],
        ['Convergence', 'The process of the iterates settling at a minimum, where the gradient approaches zero and the steps shrink.'],
      ],
      id: [
        ['Fungsi loss', 'Fungsi dari parameter model yang mengukur seberapa buruk kinerja model; pelatihan berusaha meminimalkannya.'],
        ['Gradien', 'Vektor turunan parsial (∂L/∂x, ∂L/∂y); menunjuk ke arah kenaikan paling curam.'],
        ['Learning rate (η)', 'Pengali gradien yang menentukan besar langkah.'],
        ['Konveks', 'Landskap berbentuk mangkuk dengan satu minimum, tempat penurunan gradien pasti konvergen untuk langkah yang cukup kecil.'],
        ['Minimum lokal', 'Titik yang lebih rendah dari semua tetangganya tetapi belum tentu titik terendah secara keseluruhan.'],
        ['Titik pelana', 'Titik bergradien nol tetapi permukaannya melengkung ke atas di satu arah dan ke bawah di arah lain.'],
        ['Momentum', 'Aturan pembaruan yang menyimpan kecepatan berjalan, v ← βv − η∇L, sehingga langkah mengingat gradien sebelumnya.'],
        ['Konvergensi', 'Proses iterasi menetap di sebuah minimum, tempat gradien mendekati nol dan langkah-langkah menyusut.'],
      ],
    },
    misconceptions: {
      en: [
        ['A bigger learning rate always gets there faster.', 'Only up to a point. Once η exceeds 2 divided by the curvature, each step overshoots further than the last and the marble diverges. On the banana valley this happens around η = 0.2; on the gentle bowl it would need η above 2, beyond the slider.'],
        ['Gradient descent always finds the lowest point.', 'It finds a point where the gradient is zero, which on a non-convex surface is usually the nearest local minimum. Try several starting points on the multi-modal surface and compare the final losses.'],
        ['Zero gradient means we are at a minimum.', 'A saddle point also has zero gradient. On L = x² − y² the origin is a saddle: moving along y lowers the loss, so it is not a minimum.'],
        ['Momentum is just a bigger learning rate.', 'Momentum changes direction, not just size: it accumulates gradients so that components that keep flipping sign cancel out while consistent components build up. That is why it tames the zig-zag in a narrow valley where a larger η alone would diverge.'],
      ],
      id: [
        ['Learning rate yang lebih besar selalu lebih cepat sampai.', 'Hanya sampai batas tertentu. Begitu η melebihi 2 dibagi kelengkungan, setiap langkah melompat lebih jauh dari sebelumnya dan bola divergen. Pada lembah pisang ini terjadi sekitar η = 0,2; pada mangkuk yang landai butuh η di atas 2, di luar jangkauan slider.'],
        ['Penurunan gradien selalu menemukan titik terendah.', 'Ia menemukan titik bergradien nol, yang pada permukaan non-konveks biasanya adalah minimum lokal terdekat. Coba beberapa titik awal di permukaan multi-modal dan bandingkan loss akhirnya.'],
        ['Gradien nol berarti kita berada di minimum.', 'Titik pelana juga bergradien nol. Pada L = x² − y² titik asal adalah pelana: bergerak sepanjang y menurunkan loss, sehingga ia bukan minimum.'],
        ['Momentum hanyalah learning rate yang lebih besar.', 'Momentum mengubah arah, bukan hanya besar: ia mengakumulasi gradien sehingga komponen yang terus berganti tanda saling menghapus sementara komponen yang konsisten menumpuk. Itulah sebabnya ia menjinakkan zig-zag di lembah sempit, tempat η yang lebih besar saja justru akan divergen.'],
      ],
    },
    realWorld: {
      en: [
        'Every neural network, from image classifiers to large language models, is trained with a variant of gradient descent over millions or billions of parameters.',
        'Choosing the learning rate is the first thing a machine-learning engineer tunes; too large and training "blows up" to NaN losses, too small and it never finishes.',
        'Adaptive optimisers such as Adam and RMSProp automatically scale the step for each parameter, which is why they are the default in most deep-learning libraries.',
        'Fitting a straight line by least squares, GPS position estimation and many physics simulations also minimise a loss surface, sometimes with gradient descent and sometimes with exact formulas when the surface is a simple bowl.',
      ],
      id: [
        'Setiap jaringan saraf, dari pengklasifikasi gambar sampai model bahasa besar, dilatih dengan varian penurunan gradien atas jutaan atau miliaran parameter.',
        'Memilih learning rate adalah hal pertama yang disetel seorang insinyur pembelajaran mesin; terlalu besar membuat pelatihan "meledak" menjadi loss NaN, terlalu kecil membuatnya tak pernah selesai.',
        'Pengoptimal adaptif seperti Adam dan RMSProp otomatis menyesuaikan besar langkah untuk tiap parameter; itulah sebabnya keduanya menjadi bawaan di sebagian besar pustaka deep learning.',
        'Mencocokkan garis lurus dengan kuadrat terkecil, penaksiran posisi GPS, dan banyak simulasi fisika juga meminimalkan sebuah permukaan loss, kadang dengan penurunan gradien dan kadang dengan rumus eksak jika permukaannya mangkuk sederhana.',
      ],
    },
    questions: {
      en: [
        { q: 'On the bowl L = ½(x² + y²), the marble starts at (4, 2) with η = 0.5 and no momentum. Where is it after one step, and after three?', a: 'The gradient at (x, y) is (x, y), so each step maps (x, y) to (1 − 0.5)(x, y) = (0.5x, 0.5y). After one step: (2, 1). After three steps: (0.5, 0.25). The distance to the minimum halves every step.' },
        { q: 'For the one-dimensional loss L = x², which learning rates make gradient descent converge, and which single value reaches the minimum in one step?', a: 'The update is x ← x − η·2x = (1 − 2η)x, which shrinks only if |1 − 2η| < 1, i.e. 0 < η < 1. At η = 0.5 the factor is 0, so the minimum is reached in one step. At η = 1 the marble jumps to −x forever; above 1 it diverges.' },
        { q: 'On the multi-modal surface two students click at different places and get final losses of −0.9 and −0.4. Both say their marble "converged". Who is right, and what could they do about the difference?', a: 'Both converged, but to different local minima; the gradient is zero at each, so plain gradient descent stops. To find a lower minimum they could try many random starting points and keep the best, or add momentum, which can carry the marble over small ridges.' },
      ],
      id: [
        { q: 'Pada mangkuk L = ½(x² + y²), bola mulai di (4, 2) dengan η = 0,5 tanpa momentum. Di mana posisinya setelah satu langkah, dan setelah tiga langkah?', a: 'Gradien di (x, y) adalah (x, y), sehingga setiap langkah memetakan (x, y) ke (1 − 0,5)(x, y) = (0,5x; 0,5y). Setelah satu langkah: (2, 1). Setelah tiga langkah: (0,5; 0,25). Jarak ke minimum menjadi separuh setiap langkah.' },
        { q: 'Untuk loss satu dimensi L = x², learning rate mana yang membuat penurunan gradien konvergen, dan nilai tunggal mana yang mencapai minimum dalam satu langkah?', a: 'Pembaruannya x ← x − η·2x = (1 − 2η)x, yang menyusut hanya jika |1 − 2η| < 1, yaitu 0 < η < 1. Pada η = 0,5 faktornya 0, sehingga minimum tercapai dalam satu langkah. Pada η = 1 bola melompat ke −x selamanya; di atas 1 ia divergen.' },
        { q: 'Pada permukaan multi-modal dua siswa mengklik di tempat berbeda dan mendapat loss akhir −0,9 dan −0,4. Keduanya mengatakan bolanya "konvergen". Siapa yang benar, dan apa yang bisa dilakukan terhadap perbedaan itu?', a: 'Keduanya konvergen, tetapi ke minimum lokal yang berbeda; gradien nol di masing-masing, sehingga penurunan gradien polos berhenti. Untuk menemukan minimum yang lebih rendah mereka bisa mencoba banyak titik awal acak dan menyimpan yang terbaik, atau menambahkan momentum, yang bisa membawa bola melewati punggungan kecil.' },
      ],
    },
  },
};
