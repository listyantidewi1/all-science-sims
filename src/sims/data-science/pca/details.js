// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See PC1 as the direction of maximum variance.',
      'Recognize PCA as eigendecomposition of the covariance matrix.',
      'Connect explained variance ratio to dimensionality reduction.',
    ],
    id: [
      'Melihat PC1 sebagai arah variansi maksimum.',
      'Mengenali PCA sebagai dekomposisi eigen dari matriks kovariansi.',
      'Mengaitkan rasio variansi yang dijelaskan dengan reduksi dimensi.',
    ],
  },
  tryThis: {
    en: [
      'Drag points to a near-line — does PC1 explain ~99%?',
      'Make an isotropic blob — does PC1 dominate or near-equal PC2?',
      'Add an outlier — does it pull PC1 toward it?',
    ],
    id: [
      'Seret titik ke hampir-garis — apakah PC1 menjelaskan ~99%?',
      'Buat awan isotropik — apakah PC1 mendominasi atau mirip PC2?',
      'Tambah pencilan — apakah ia menarik PC1 ke arahnya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Principal component analysis (PCA) looks at a cloud of data points and asks: along which direction do the points spread out the most? That direction is the first principal component, PC1. The second, PC2, is the direction perpendicular to PC1 that captures the most of the remaining spread. Projecting every point onto PC1 alone turns two numbers per point into one while losing as little variance as possible, which is what dimensionality reduction means. Algebraically, PC1 and PC2 are the eigenvectors of the covariance matrix C = [[var(x), cov(x, y)], [cov(x, y), var(y)]], and the eigenvalues λ1 ≥ λ2 are the variances of the data along those two directions. Their sum equals var(x) + var(y), the total variance, so the explained variance ratio of PC1 is λ1 / (λ1 + λ2).',
        'The simulation computes exactly this for the points on screen. It finds the mean (white dot), forms the sample covariance matrix with n − 1 in the denominator, and solves the 2×2 eigenproblem in closed form: λ = tr/2 ± √(tr²/4 − det), where tr and det are the trace and determinant of C. It then draws PC1 (pink) and PC2 (green) through the mean, each with half-length 2√λ, that is, two standard deviations along that axis, so the axes form a frame that hugs the cloud. The readout gives both eigenvalues and the percentage of total variance each explains. Drag any point, click empty space to add one, or use the presets: an elongated cloud tilted 30°, an isotropic blob, a cloud lying almost on a line, or a clear canvas.',
        'Watch how the explained variance responds. For the near-line preset almost all the variance lies along one direction, so PC1 explains 99% or more and the data is essentially one-dimensional. For the isotropic blob the two eigenvalues are nearly equal, PC1 explains only about 50%, and its direction swings around as you nudge points, because when the spread is the same in every direction no direction is special. Drag one point far away and PC1 rotates toward it: variance weighs each point by the square of its distance from the mean, so a single distant outlier can dominate the result. Note also that PC1 is not the regression line; regression minimises vertical distances to a line, PCA minimises perpendicular distances, and the two lines coincide only in special cases.',
        'The sim is deliberately two-dimensional, where PCA can be drawn but is rarely needed; its real use is with tens or thousands of variables, where the first few components often capture most of the structure. It does not standardise the variables first. In practice, if x and y have different units or scales, the variable with the larger numbers will dominate the covariance and PCA will mostly report that fact, so each variable is usually divided by its standard deviation before the analysis. PCA is also strictly linear, so it cannot straighten a curved cloud, and the signs of the component vectors are arbitrary: PC1 pointing up-right or down-left is the same axis.',
      ],
      id: [
        'Analisis komponen utama (PCA) memandang sebuah awan titik data dan bertanya: di sepanjang arah mana titik-titik itu paling tersebar? Arah itu adalah komponen utama pertama, PC1. Yang kedua, PC2, adalah arah tegak lurus PC1 yang menangkap sebaran sisa paling banyak. Memproyeksikan setiap titik ke PC1 saja mengubah dua angka per titik menjadi satu dengan kehilangan variansi sesedikit mungkin; inilah yang dimaksud reduksi dimensi. Secara aljabar, PC1 dan PC2 adalah vektor eigen dari matriks kovariansi C = [[var(x), cov(x, y)], [cov(x, y), var(y)]], dan nilai eigen λ1 ≥ λ2 adalah variansi data di sepanjang kedua arah itu. Jumlahnya sama dengan var(x) + var(y), variansi total, sehingga rasio variansi yang dijelaskan PC1 adalah λ1 / (λ1 + λ2).',
        'Simulasi ini menghitung persis itu untuk titik-titik di layar. Ia mencari rata-rata (titik putih), membentuk matriks kovariansi sampel dengan penyebut n − 1, dan menyelesaikan masalah eigen 2×2 secara tertutup: λ = tr/2 ± √(tr²/4 − det), dengan tr dan det adalah teras dan determinan C. Lalu ia menggambar PC1 (merah muda) dan PC2 (hijau) melalui rata-rata, masing-masing dengan setengah panjang 2√λ, yaitu dua simpangan baku di sepanjang sumbu itu, sehingga kedua sumbu membentuk bingkai yang memeluk awan data. Panel menampilkan kedua nilai eigen dan persentase variansi total yang dijelaskan masing-masing. Seret titik mana pun, klik ruang kosong untuk menambah titik, atau pakai preset: awan memanjang yang miring 30°, awan isotropik, awan yang hampir terletak pada satu garis, atau kanvas kosong.',
        'Perhatikan bagaimana variansi yang dijelaskan merespons. Untuk preset hampir-garis, nyaris semua variansi berada di satu arah, sehingga PC1 menjelaskan 99% atau lebih dan datanya pada hakikatnya satu dimensi. Untuk awan isotropik kedua nilai eigen hampir sama, PC1 hanya menjelaskan sekitar 50%, dan arahnya berayun saat kamu menggeser titik, karena ketika sebaran sama di semua arah tidak ada arah yang istimewa. Seret satu titik jauh dan PC1 berputar ke arahnya: variansi menimbang setiap titik dengan kuadrat jaraknya dari rata-rata, sehingga satu pencilan yang jauh bisa mendominasi hasil. Perhatikan juga bahwa PC1 bukan garis regresi; regresi meminimalkan jarak vertikal ke garis, PCA meminimalkan jarak tegak lurus, dan kedua garis itu hanya berimpit dalam kasus khusus.',
        'Simulasi ini sengaja dua dimensi, tempat PCA bisa digambar tetapi jarang dibutuhkan; kegunaan sejatinya ada pada puluhan atau ribuan variabel, ketika beberapa komponen pertama sering menangkap sebagian besar strukturnya. Ia tidak menstandarkan variabel terlebih dahulu. Dalam praktik, jika x dan y berbeda satuan atau skala, variabel dengan angka lebih besar akan mendominasi kovariansi dan PCA sebagian besar hanya melaporkan fakta itu, sehingga setiap variabel biasanya dibagi simpangan bakunya sebelum analisis. PCA juga murni linear, sehingga tidak bisa meluruskan awan yang melengkung, dan tanda vektor komponennya sembarang: PC1 yang menunjuk ke kanan-atas atau kiri-bawah adalah sumbu yang sama.',
      ],
    },
    figure: {
      caption: {
        en: 'A tilted cloud with its mean, PC1 (direction of greatest variance) and the perpendicular PC2. One point is projected onto PC1 along the dashed perpendicular; keeping only that coordinate is dimensionality reduction from 2D to 1D.',
        id: 'Awan data miring dengan rata-ratanya, PC1 (arah variansi terbesar), dan PC2 yang tegak lurus. Satu titik diproyeksikan ke PC1 sepanjang garis putus-putus tegak lurus; menyimpan koordinat itu saja adalah reduksi dimensi dari 2D ke 1D.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        let seed = 99;
        const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648 - 0.5; };
        const ang = Math.PI / 7, c = Math.cos(ang), s = Math.sin(ang);
        const pts = [];
        for (let i = 0; i < 36; i++) { const u = (rnd() + rnd()) * 3.2, v = (rnd() + rnd()) * 0.9; pts.push([u * c - v * s, u * s + v * c]); }
        let mx = 0, my = 0; for (const [x, y] of pts) { mx += x / pts.length; my += y / pts.length; }
        let sxx = 0, syy = 0, sxy = 0; for (const [x, y] of pts) { sxx += (x - mx) ** 2; syy += (y - my) ** 2; sxy += (x - mx) * (y - my); }
        const n1 = pts.length - 1; sxx /= n1; syy /= n1; sxy /= n1;
        const tr = sxx + syy, det = sxx * syy - sxy * sxy, disc = Math.sqrt(Math.max(0, tr * tr / 4 - det));
        const l1 = tr / 2 + disc, l2 = tr / 2 - disc;
        let v1x = l1 - syy, v1y = sxy; const len = Math.hypot(v1x, v1y); v1x /= len; v1y /= len;
        const SC = 34, X = (x) => 150 + (x - mx) * SC, Y = (y) => 120 - (y - my) * SC;
        const axis = (vx, vy, lam, col) => `<line x1="${X(mx - vx * 2 * Math.sqrt(lam)).toFixed(1)}" y1="${Y(my - vy * 2 * Math.sqrt(lam)).toFixed(1)}" x2="${X(mx + vx * 2 * Math.sqrt(lam)).toFixed(1)}" y2="${Y(my + vy * 2 * Math.sqrt(lam)).toFixed(1)}" stroke="${col}" stroke-width="2.6"/>`;
        const p = pts[5]; const t = (p[0] - mx) * v1x + (p[1] - my) * v1y; const q = [mx + t * v1x, my + t * v1y];
        const pct = (100 * l1 / (l1 + l2)).toFixed(0);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Principal axes of a tilted point cloud', 'Sumbu utama sebuah awan titik yang miring')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.s{font-size:10px}.b{font-weight:600}</style>
  <line x1="20" y1="${Y(my)}" x2="300" y2="${Y(my)}" class="m"/>
  <line x1="${X(mx)}" y1="20" x2="${X(mx)}" y2="220" class="m"/>
  <text x="290" y="${Y(my) - 4}" class="s">x</text>
  <text x="${X(mx) + 4}" y="28" class="s">y</text>
  ${pts.map(([x, y]) => `<circle cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="3" fill="#3b82f6"/>`).join('')}
  ${axis(v1x, v1y, l1, '#ef4444')}
  ${axis(-v1y, v1x, l2, '#10b981')}
  <line x1="${X(p[0]).toFixed(1)}" y1="${Y(p[1]).toFixed(1)}" x2="${X(q[0]).toFixed(1)}" y2="${Y(q[1]).toFixed(1)}" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="4 3"/>
  <circle cx="${X(p[0]).toFixed(1)}" cy="${Y(p[1]).toFixed(1)}" r="4.5" fill="#f59e0b"/>
  <circle cx="${X(q[0]).toFixed(1)}" cy="${Y(q[1]).toFixed(1)}" r="3.5" fill="#f59e0b" stroke="currentColor" stroke-width="1"/>
  <circle cx="${X(mx).toFixed(1)}" cy="${Y(my).toFixed(1)}" r="4" fill="currentColor"/>
  <text x="${X(mx + v1x * 2 * Math.sqrt(l1)) + 6}" y="${Y(my + v1y * 2 * Math.sqrt(l1)) + 4}" class="b" fill="#ef4444">PC1</text>
  <text x="${X(mx - v1y * 2 * Math.sqrt(l2)) - 30}" y="${Y(my + v1x * 2 * Math.sqrt(l2)) - 6}" class="b" fill="#10b981">PC2</text>
  <text x="${X(p[0]) + 8}" y="${Y(p[1]) - 6}" class="s" fill="#f59e0b">${L('projection onto PC1', 'proyeksi ke PC1')}</text>
  <text x="${X(mx) + 6}" y="${Y(my) + 16}" class="s">${L('mean', 'rata-rata')}</text>
  <text x="8" y="232" class="s">${L('C = [[var x, cov], [cov, var y]];  λ1 = var along PC1, λ2 = var along PC2;  PC1 explains λ1/(λ1+λ2) ≈ ', 'C = [[var x, cov], [cov, var y]];  λ1 = variansi sepanjang PC1, λ2 = sepanjang PC2;  PC1 menjelaskan λ1/(λ1+λ2) ≈ ')}${pct}%</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'PC1 is the direction along which the data has the largest variance; PC2 is the perpendicular direction with the remaining variance.',
        'The principal components are the eigenvectors of the covariance matrix, and the eigenvalues are the variances along them.',
        'The explained variance ratio λ1 / (λ1 + λ2) tells you how much of the spread survives if you keep only the PC1 coordinate.',
        'Because variance uses squared distances, one distant outlier can rotate PC1 toward itself.',
        'When the cloud is isotropic the eigenvalues are nearly equal and the direction of PC1 is essentially arbitrary.',
      ],
      id: [
        'PC1 adalah arah tempat data memiliki variansi terbesar; PC2 adalah arah tegak lurusnya dengan variansi sisa.',
        'Komponen utama adalah vektor eigen dari matriks kovariansi, dan nilai eigennya adalah variansi di sepanjang arah-arah itu.',
        'Rasio variansi yang dijelaskan λ1 / (λ1 + λ2) menyatakan seberapa banyak sebaran yang tersisa jika hanya koordinat PC1 yang disimpan.',
        'Karena variansi memakai kuadrat jarak, satu pencilan yang jauh bisa memutar PC1 ke arahnya.',
        'Ketika awan data isotropik, kedua nilai eigen hampir sama dan arah PC1 pada dasarnya sembarang.',
      ],
    },
    vocabulary: {
      en: [
        ['Principal component', 'A direction in the data space along which the data is projected; PC1 has the largest variance, PC2 the next, and all are mutually perpendicular.'],
        ['Covariance matrix', 'The symmetric matrix of variances on the diagonal and covariances off it; it summarises the spread and tilt of the cloud.'],
        ['Eigenvector / eigenvalue', 'A direction that the covariance matrix only stretches, and the stretch factor; for C the eigenvalues are the variances along the principal axes.'],
        ['Explained variance ratio', 'The fraction of total variance carried by a component, λk / (sum of all λ).'],
        ['Dimensionality reduction', 'Replacing many variables by a few new ones (the leading components) while keeping most of the variation.'],
        ['Projection', 'Dropping a point perpendicularly onto an axis and recording where it lands; the PC1 score of a point.'],
        ['Standardisation', 'Dividing each variable by its standard deviation before PCA so that units and scales do not decide the result.'],
        ['Isotropic', 'Spread equally in all directions, so no principal direction is preferred.'],
      ],
      id: [
        ['Komponen utama', 'Arah dalam ruang data tempat data diproyeksikan; PC1 bervariansi terbesar, PC2 berikutnya, dan semuanya saling tegak lurus.'],
        ['Matriks kovariansi', 'Matriks simetris dengan variansi di diagonal dan kovariansi di luar diagonal; merangkum sebaran dan kemiringan awan data.'],
        ['Vektor eigen / nilai eigen', 'Arah yang hanya diregangkan oleh matriks kovariansi, dan faktor regangnya; untuk C, nilai eigennya adalah variansi di sepanjang sumbu utama.'],
        ['Rasio variansi yang dijelaskan', 'Fraksi variansi total yang dibawa sebuah komponen, λk / (jumlah semua λ).'],
        ['Reduksi dimensi', 'Mengganti banyak variabel dengan sedikit variabel baru (komponen-komponen utama) sambil mempertahankan sebagian besar variasinya.'],
        ['Proyeksi', 'Menjatuhkan titik secara tegak lurus ke sebuah sumbu dan mencatat tempat jatuhnya; skor PC1 sebuah titik.'],
        ['Standardisasi', 'Membagi setiap variabel dengan simpangan bakunya sebelum PCA agar satuan dan skala tidak menentukan hasilnya.'],
        ['Isotropik', 'Tersebar sama rata ke semua arah, sehingga tidak ada arah utama yang diutamakan.'],
      ],
    },
    misconceptions: {
      en: [
        ['PC1 is the same as the regression line of y on x.', 'Regression minimises vertical distances and treats x as the input; PCA minimises perpendicular distances and treats x and y symmetrically. The two lines agree only in special cases, for example when the cloud is perfectly on a line.'],
        ['PCA finds the most important variables.', 'It finds directions, which are combinations of variables, and ranks them by variance. Variance is not the same as importance: a variable can carry little variance yet matter most for a prediction task.'],
        ['The sign and direction of PC1 are meaningful.', 'Only the axis is defined; flipping PC1 to point the opposite way is an equally valid answer. In an isotropic cloud even the axis is arbitrary, because all directions have the same variance.'],
        ['PCA works the same whatever units the data is in.', 'It does not. Measuring x in millimetres instead of metres multiplies var(x) by a million and PC1 will simply align with x. Standardise the variables first unless they share a unit.'],
      ],
      id: [
        ['PC1 sama dengan garis regresi y terhadap x.', 'Regresi meminimalkan jarak vertikal dan memperlakukan x sebagai masukan; PCA meminimalkan jarak tegak lurus dan memperlakukan x dan y secara simetris. Kedua garis itu hanya sama dalam kasus khusus, misalnya saat awan data tepat berada pada satu garis.'],
        ['PCA menemukan variabel yang paling penting.', 'Ia menemukan arah, yaitu kombinasi variabel, dan mengurutkannya berdasarkan variansi. Variansi tidak sama dengan kepentingan: sebuah variabel bisa bervariansi kecil tetapi paling menentukan untuk tugas prediksi.'],
        ['Tanda dan arah PC1 bermakna.', 'Hanya sumbunya yang terdefinisi; membalik PC1 ke arah berlawanan adalah jawaban yang sama sahnya. Pada awan isotropik bahkan sumbunya sembarang, karena semua arah bervariansi sama.'],
        ['PCA bekerja sama saja apa pun satuan datanya.', 'Tidak. Mengukur x dalam milimeter alih-alih meter mengalikan var(x) sejuta kali dan PC1 akan begitu saja searah dengan x. Standarkan variabel terlebih dahulu kecuali jika satuannya sama.'],
      ],
    },
    realWorld: {
      en: [
        'In genetics, PCA on the DNA of thousands of people reduces hundreds of thousands of variables to two components, and the resulting plot often mirrors the geographic map of where their ancestors lived.',
        'Face-recognition systems of the 1990s ("eigenfaces") applied PCA to pixel intensities so that each face could be described by a few dozen numbers instead of thousands of pixels.',
        'Finance uses PCA on the daily returns of many stocks; the first component usually represents the whole market moving together.',
        'Image compression and noise reduction keep only the leading components of image blocks, discarding directions whose variance is mostly noise.',
      ],
      id: [
        'Dalam genetika, PCA pada DNA ribuan orang mereduksi ratusan ribu variabel menjadi dua komponen, dan grafik yang dihasilkan sering mencerminkan peta geografis tempat leluhur mereka tinggal.',
        'Sistem pengenalan wajah tahun 1990-an ("eigenfaces") menerapkan PCA pada intensitas piksel sehingga setiap wajah bisa digambarkan dengan beberapa puluh angka, bukan ribuan piksel.',
        'Keuangan memakai PCA pada imbal hasil harian banyak saham; komponen pertama biasanya mewakili seluruh pasar yang bergerak bersama.',
        'Kompresi citra dan pengurangan derau hanya menyimpan komponen-komponen utama dari blok-blok gambar, membuang arah-arah yang variansinya sebagian besar hanya derau.',
      ],
    },
    questions: {
      en: [
        { q: 'A data set has covariance matrix C = [[4, 0], [0, 1]]. What are the principal components, their eigenvalues, and the explained variance ratio of PC1?', a: 'Because the covariance is zero the matrix is already diagonal: the eigenvalues are 4 and 1, PC1 is the x-axis (1, 0) and PC2 is the y-axis (0, 1). PC1 explains 4 / (4 + 1) = 80% of the variance.' },
        { q: 'Now C = [[2, 1], [1, 2]]. Find the eigenvalues and the direction of PC1, and compute the explained variance ratio.', a: 'tr = 4 and det = 3, so λ = 2 ± √(4 − 3) = 3 and 1. For λ1 = 3 the eigenvector satisfies (2 − 3)v_x + v_y = 0, so v = (1, 1)/√2: PC1 points along the diagonal. PC1 explains 3 / (3 + 1) = 75%.' },
        { q: 'Start from the isotropic blob preset and drag one point far from the cloud. Explain, using how variance is computed, why PC1 swings to point at that outlier.', a: 'Variance along a direction is the mean of squared projections onto it. A point 8 units from the mean contributes 64 to the variance along the direction toward it, while typical blob points at distance 1 contribute about 1 each, so the direction toward the outlier gains far more variance than any other, and the eigenvector with the largest eigenvalue rotates toward it.' },
      ],
      id: [
        { q: 'Sebuah kumpulan data memiliki matriks kovariansi C = [[4, 0], [0, 1]]. Apa komponen utamanya, nilai eigennya, dan rasio variansi yang dijelaskan PC1?', a: 'Karena kovariansinya nol, matriksnya sudah diagonal: nilai eigennya 4 dan 1, PC1 adalah sumbu x (1, 0) dan PC2 adalah sumbu y (0, 1). PC1 menjelaskan 4 / (4 + 1) = 80% variansi.' },
        { q: 'Sekarang C = [[2, 1], [1, 2]]. Cari nilai eigen dan arah PC1, lalu hitung rasio variansi yang dijelaskan.', a: 'tr = 4 dan det = 3, sehingga λ = 2 ± √(4 − 3) = 3 dan 1. Untuk λ1 = 3 vektor eigennya memenuhi (2 − 3)v_x + v_y = 0, sehingga v = (1, 1)/√2: PC1 searah diagonal. PC1 menjelaskan 3 / (3 + 1) = 75%.' },
        { q: 'Mulai dari preset awan isotropik dan seret satu titik jauh dari awan. Jelaskan, dengan cara variansi dihitung, mengapa PC1 berayun menunjuk ke pencilan itu.', a: 'Variansi di sepanjang suatu arah adalah rata-rata kuadrat proyeksi ke arah itu. Titik yang berjarak 8 satuan dari rata-rata menyumbang 64 pada variansi di arah menujunya, sedangkan titik-titik awan biasa yang berjarak sekitar 1 hanya menyumbang sekitar 1 masing-masing, sehingga arah menuju pencilan memperoleh variansi jauh lebih besar daripada arah lain, dan vektor eigen dengan nilai eigen terbesar berputar ke arahnya.' },
      ],
    },
  },
};
