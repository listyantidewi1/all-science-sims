// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe how the parameters a and b shape the graph of y = a·bˣ, distinguish growth (b > 1) from decay (0 < b < 1), and use the exponent rules to compute values such as a·b^(x+1) = b·(a·bˣ).',
      'Explain the logarithm as the inverse of the exponential, recognise its graph as the reflection of the exponential in y = x, and solve a·bˣ = c in the form x = log_b(c/a) = ln(c/a)/ln(b).',
      'Compute doubling times and half-lives from the growth factor and apply them to bacteria, radioactive decay and compound interest.',
    ],
    id: [
      'Menjelaskan bagaimana parameter a dan b membentuk grafik y = a·bˣ, membedakan pertumbuhan (b > 1) dari peluruhan (0 < b < 1), dan memakai sifat eksponen untuk menghitung nilai seperti a·b^(x+1) = b·(a·bˣ).',
      'Menjelaskan logaritma sebagai invers eksponen, mengenali grafiknya sebagai pencerminan grafik eksponen terhadap y = x, dan menyelesaikan a·bˣ = c dalam bentuk x = log_b(c/a) = ln(c/a)/ln(b).',
      'Menghitung waktu penggandaan dan waktu paruh dari faktor pertumbuhan serta menerapkannya pada bakteri, peluruhan radioaktif dan bunga majemuk.',
    ],
  },
  tryThis: {
    en: [
      'Set a = 1 and b = 2, then drag the yellow point from x = 0 to x = 1, 2, 3. Confirm that y doubles each step, and that moving one unit left halves it.',
      'Slide b from 2 down through 1 to 0.5. Watch the curve flatten, become the horizontal line y = a, and then flip into decay. What happens to the readout at exactly b = 1?',
      'With the inverse switched on, read the coordinates of the yellow point and its green reflection. Why are they swapped?',
      'Choose the compound-growth preset (8% per year) and set c = 20 to find when Rp 10 million doubles. Compare with the rule of 72.',
    ],
    id: [
      'Atur a = 1 dan b = 2, lalu seret titik kuning dari x = 0 ke x = 1, 2, 3. Pastikan y berlipat dua tiap langkah, dan bergeser satu satuan ke kiri membuatnya separuh.',
      'Geser b dari 2 turun melewati 1 hingga 0,5. Perhatikan kurva mendatar, menjadi garis horizontal y = a, lalu berbalik menjadi peluruhan. Apa yang terjadi pada bacaan tepat saat b = 1?',
      'Dengan invers dinyalakan, baca koordinat titik kuning dan pantulannya yang hijau. Mengapa keduanya tertukar?',
      'Pilih prasetel bunga majemuk (8% per tahun) dan atur c = 20 untuk mencari kapan Rp 10 juta berlipat dua. Bandingkan dengan aturan 72.',
    ],
  },

  learn: {
    background: {
      en: [
        'An exponential function has the variable in the exponent: y = a·bˣ with a > 0 and a base b > 0, b ≠ 1. The value a is the starting amount (y = a when x = 0) and b is the growth factor: every time x increases by 1, y is multiplied by b. This follows from the exponent rule b^(x+1) = bˣ·b¹. When b > 1 the graph rises ever more steeply (growth); when 0 < b < 1 it falls toward the x-axis without ever reaching it (decay). The x-axis is a horizontal asymptote, and because bˣ is never zero or negative, the graph never crosses it.',
        'Multiplying y by the same factor over equal steps means equal steps in x produce equal ratios in y, never equal differences. That is why a doubling time makes sense: the time t_d for y to double satisfies b^(t_d) = 2, so t_d = log_b 2 = ln 2 / ln b, the same no matter where you start on the curve. For decay the half-life is t_½ = ln 2 / ln(1/b). Bacteria that double every hour have b = 2 and t_d = 1 h; a sample that loses 10% per day has b = 0.9 and t_½ = ln 2/ln(1/0.9) ≈ 6.58 days; money at 8% a year has b = 1.08 and doubles in ln 2/ln 1.08 ≈ 9.0 years, close to the rule-of-72 estimate 72/8 = 9.',
        'The logarithm answers the reverse question: given y, which exponent x gives bˣ = y? We write x = log_b y. Since the exponential and the logarithm undo each other, their graphs are reflections of each other in the line y = x: the point (x, y) on y = a·bˣ becomes the point (y, x) on the inverse y = log_b(x/a). The sim draws that reflection in green. Because bˣ only produces positive outputs, the logarithm only accepts positive inputs, so its graph lives entirely to the right of the y-axis.',
        'To solve an equation such as 1·2ˣ = 50, divide by a to isolate bˣ, then take a logarithm of both sides. Any base works because of the change-of-base rule log_b q = ln q / ln b: here x = ln 50 / ln 2 ≈ 5.64. The sim lists these steps and checks the answer by substituting back. The same rule explains why a does not affect the doubling time: a cancels out when you compare a·b^(x+t) with a·bˣ.',
      ],
      id: [
        'Fungsi eksponensial memiliki variabel pada pangkatnya: y = a·bˣ dengan a > 0 dan bilangan pokok b > 0, b ≠ 1. Nilai a adalah jumlah awal (y = a saat x = 0) dan b adalah faktor pertumbuhan: setiap kali x bertambah 1, y dikalikan b. Ini mengikuti sifat eksponen b^(x+1) = bˣ·b¹. Bila b > 1 grafik naik semakin curam (pertumbuhan); bila 0 < b < 1 grafik turun mendekati sumbu x tanpa pernah menyentuhnya (peluruhan). Sumbu x adalah asimtot datar, dan karena bˣ tidak pernah nol atau negatif, grafik tidak pernah memotongnya.',
        'Mengalikan y dengan faktor yang sama pada langkah yang sama berarti langkah x yang sama menghasilkan rasio y yang sama, bukan selisih yang sama. Itulah mengapa waktu penggandaan bermakna: waktu t_d agar y berlipat dua memenuhi b^(t_d) = 2, sehingga t_d = log_b 2 = ln 2 / ln b, sama di mana pun kamu mulai pada kurva. Untuk peluruhan, waktu paruhnya t_½ = ln 2 / ln(1/b). Bakteri yang berlipat dua tiap jam memiliki b = 2 dan t_d = 1 jam; sampel yang kehilangan 10% per hari memiliki b = 0,9 dan t_½ = ln 2/ln(1/0,9) ≈ 6,58 hari; uang dengan bunga 8% per tahun memiliki b = 1,08 dan berlipat dua dalam ln 2/ln 1,08 ≈ 9,0 tahun, dekat dengan taksiran aturan 72, yaitu 72/8 = 9.',
        'Logaritma menjawab pertanyaan kebalikannya: diberikan y, pangkat x berapa yang membuat bˣ = y? Kita tulis x = log_b y. Karena eksponen dan logaritma saling membatalkan, grafik keduanya saling mencerminkan terhadap garis y = x: titik (x, y) pada y = a·bˣ menjadi titik (y, x) pada inversnya y = log_b(x/a). Simulasi menggambar pencerminan itu dengan warna hijau. Karena bˣ hanya menghasilkan nilai positif, logaritma hanya menerima masukan positif, sehingga grafiknya seluruhnya berada di kanan sumbu y.',
        'Untuk menyelesaikan persamaan seperti 1·2ˣ = 50, bagi dengan a untuk mengisolasi bˣ, lalu ambil logaritma kedua ruas. Bilangan pokok apa pun boleh dipakai karena aturan pindah basis log_b q = ln q / ln b: di sini x = ln 50 / ln 2 ≈ 5,64. Simulasi menuliskan langkah-langkah ini dan memeriksa jawabannya dengan substitusi balik. Aturan yang sama menjelaskan mengapa a tidak memengaruhi waktu penggandaan: a tercoret ketika kamu membandingkan a·b^(x+t) dengan a·bˣ.',
      ],
    },
    figure: {
      caption: {
        en: 'The exponential y = 2ˣ (orange) and its inverse y = log₂x (green) are reflections of each other in the dashed line y = x. The point (3, 8) on the exponential becomes (8, 3) on the logarithm. The exponential never touches the x-axis; the logarithm never touches the y-axis.',
        id: 'Fungsi eksponen y = 2ˣ (oranye) dan inversnya y = ²log x (hijau) saling mencerminkan terhadap garis putus-putus y = x. Titik (3, 8) pada eksponen menjadi (8, 3) pada logaritma. Eksponen tidak pernah menyentuh sumbu x; logaritma tidak pernah menyentuh sumbu y.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // Square plot 200×200 at (80,20); x,y in [-2, 9] mapped linearly.
        const X = (x) => (80 + ((x + 2) / 11) * 200).toFixed(1);
        const Y = (y) => (220 - ((y + 2) / 11) * 200).toFixed(1);
        const exp = [], log = [];
        for (let i = 0; i <= 60; i++) {
          const x = -2 + (i / 60) * 5.15;              // up to x≈3.15, y≈8.9 (stays inside the 200×200 plot box)
          exp.push(`${X(x)},${Y(Math.pow(2, x))}`);
        }
        for (let i = 1; i <= 80; i++) {
          const x = 0.25 + (i / 80) * 8.75;            // x from 0.36 to 9
          log.push(`${X(x)},${Y(Math.log2(x))}`);
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Exponential curve and its logarithm reflected in y = x', 'Kurva eksponen dan logaritmanya yang dicerminkan terhadap y = x')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:9px ui-monospace,monospace;fill:currentColor}</style>
  <rect x="80" y="20" width="200" height="200" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
  <line x1="80" y1="${Y(0)}" x2="280" y2="${Y(0)}" stroke="currentColor" stroke-width="1" opacity="0.7"/>
  <line x1="${X(0)}" y1="20" x2="${X(0)}" y2="220" stroke="currentColor" stroke-width="1" opacity="0.7"/>
  <line x1="${X(-2)}" y1="${Y(-2)}" x2="${X(9)}" y2="${Y(9)}" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4" opacity="0.6"/>
  <polyline points="${exp.join(' ')}" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
  <polyline points="${log.join(' ')}" fill="none" stroke="#34d399" stroke-width="2.2"/>
  <line x1="${X(3)}" y1="${Y(8)}" x2="${X(8)}" y2="${Y(3)}" stroke="#34d399" stroke-width="1" stroke-dasharray="3 3" opacity="0.8"/>
  <circle cx="${X(3)}" cy="${Y(8)}" r="4" fill="#fbbf24"/>
  <circle cx="${X(8)}" cy="${Y(3)}" r="4" fill="#34d399"/>
  <text x="${X(3) - 4}" y="${Y(8) - 7}" class="s" text-anchor="end">(3, 8)</text>
  <text x="${X(8) - 2}" y="${Y(3) + 14}" class="s" text-anchor="end">(8, 3)</text>
  <text x="${X(1)}" y="${Y(0) + 11}" class="s" text-anchor="middle">1</text>
  <text x="${X(0) - 3}" y="${Y(1) + 3}" class="s" text-anchor="end">1</text>
  <text x="${X(8)}" y="${Y(0) + 11}" class="s" text-anchor="middle">8</text>
  <text x="${X(0) - 3}" y="${Y(8) + 3}" class="s" text-anchor="end">8</text>
  <text x="${X(1.2)}" y="${Y(6.2)}" fill="#f59e0b" font-weight="bold">y = 2ˣ</text>
  <text x="${X(5)}" y="${Y(1.2)}" fill="#34d399" font-weight="bold">${L('y = log₂ x', 'y = ²log x')}</text>
  <text x="${X(6.3)}" y="${Y(7.6)}" opacity="0.8">y = x</text>
  <text x="290" y="40">${L('reflect in', 'cermin')}</text>
  <text x="290" y="54">y = x:</text>
  <text x="290" y="70" class="s">(x, y) → (y, x)</text>
  <text x="290" y="100" class="s">2³ = 8</text>
  <text x="290" y="114" class="s">${L('log₂ 8 = 3', '²log 8 = 3')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In y = a·bˣ, a is the value at x = 0 and b is the factor y is multiplied by for every unit increase in x.',
        'b > 1 gives growth and 0 < b < 1 gives decay; the x-axis is a horizontal asymptote and y is always positive.',
        'Exponent rules: bˣ·bʸ = b^(x+y), (bˣ)ʸ = b^(xy), b^(−x) = 1/bˣ, b⁰ = 1. These are what make equal x-steps give equal y-ratios.',
        'Doubling time t_d = ln 2 / ln b (b > 1) and half-life t_½ = ln 2 / ln(1/b) (b < 1) do not depend on a or on where you start.',
        'log_b y is the exponent x with bˣ = y; the graphs of bˣ and log_b x are reflections in y = x.',
        'To solve a·bˣ = c: x = log_b(c/a) = ln(c/a) / ln(b), and the answer exists only when c/a > 0.',
      ],
      id: [
        'Pada y = a·bˣ, a adalah nilai saat x = 0 dan b adalah faktor pengali y untuk setiap kenaikan x sebesar satu satuan.',
        'b > 1 memberi pertumbuhan dan 0 < b < 1 memberi peluruhan; sumbu x adalah asimtot datar dan y selalu positif.',
        'Sifat eksponen: bˣ·bʸ = b^(x+y), (bˣ)ʸ = b^(xy), b^(−x) = 1/bˣ, b⁰ = 1. Sifat inilah yang membuat langkah x yang sama memberi rasio y yang sama.',
        'Waktu penggandaan t_d = ln 2 / ln b (b > 1) dan waktu paruh t_½ = ln 2 / ln(1/b) (b < 1) tidak bergantung pada a atau titik awal.',
        'ᵇlog y adalah pangkat x dengan bˣ = y; grafik bˣ dan ᵇlog x saling mencerminkan terhadap y = x.',
        'Untuk menyelesaikan a·bˣ = c: x = ᵇlog(c/a) = ln(c/a) / ln(b), dan jawabannya ada hanya bila c/a > 0.',
      ],
    },
    vocabulary: {
      en: [
        ['Exponential function', 'A function of the form y = a·bˣ in which the variable appears in the exponent.'],
        ['Base (growth factor)', 'The number b that y is multiplied by each time x increases by 1; b > 1 means growth, 0 < b < 1 means decay.'],
        ['Logarithm', 'log_b y is the exponent to which b must be raised to give y; it is the inverse of the exponential with base b.'],
        ['Doubling time', 'The fixed increase in x needed for y to double: t_d = ln 2 / ln b.'],
        ['Half-life', 'The fixed increase in x needed for y to halve in a decay: t_½ = ln 2 / ln(1/b).'],
        ['Asymptote', 'A line a graph approaches ever more closely without touching; the x-axis for y = a·bˣ, the y-axis for y = log_b x.'],
      ],
      id: [
        ['Fungsi eksponensial', 'Fungsi berbentuk y = a·bˣ yang variabelnya muncul pada pangkat.'],
        ['Bilangan pokok (faktor pertumbuhan)', 'Bilangan b yang mengalikan y setiap kali x bertambah 1; b > 1 berarti pertumbuhan, 0 < b < 1 berarti peluruhan.'],
        ['Logaritma', 'ᵇlog y adalah pangkat yang harus diberikan pada b untuk menghasilkan y; logaritma adalah invers eksponen dengan bilangan pokok b.'],
        ['Waktu penggandaan', 'Pertambahan x tetap yang diperlukan agar y berlipat dua: t_d = ln 2 / ln b.'],
        ['Waktu paruh', 'Pertambahan x tetap yang diperlukan agar y menjadi separuh pada peluruhan: t_½ = ln 2 / ln(1/b).'],
        ['Asimtot', 'Garis yang didekati grafik semakin rapat tanpa pernah disentuh; sumbu x untuk y = a·bˣ, sumbu y untuk y = ᵇlog x.'],
      ],
    },
    misconceptions: {
      en: [
        ['Exponential growth means "growing fast".', 'It means growing by a constant factor per step. With b = 1.01 the curve looks almost flat for a long time; what makes it exponential is that it eventually outruns any straight line, not its initial speed.'],
        ['A larger starting value a gives a shorter doubling time.', 'The doubling time depends only on b: a·b^(x+t) = 2·a·bˣ gives bᵗ = 2 whatever a is. Try changing a in the sim and watch the readout stay fixed.'],
        ['Doubling b from 2 to 4 halves y everywhere or doubles it everywhere.', 'It squares the growth: 4ˣ = (2ˣ)². The doubling time halves (from 1 to 0.5), but y itself changes by different factors at different x.'],
        ['log(x + y) = log x + log y.', 'Logarithms turn products into sums, not sums into sums: log(xy) = log x + log y. For example log₂(4·8) = 2 + 3 = 5, but log₂(4 + 8) = log₂12 ≈ 3.58.'],
      ],
      id: [
        ['Pertumbuhan eksponensial berarti "tumbuh cepat".', 'Artinya tumbuh dengan faktor tetap per langkah. Dengan b = 1,01 kurva tampak hampir datar untuk waktu lama; yang membuatnya eksponensial adalah pada akhirnya ia melampaui garis lurus mana pun, bukan kecepatan awalnya.'],
        ['Nilai awal a yang lebih besar memberi waktu penggandaan yang lebih pendek.', 'Waktu penggandaan hanya bergantung pada b: a·b^(x+t) = 2·a·bˣ memberi bᵗ = 2 berapa pun a. Coba ubah a di simulasi dan perhatikan bacaannya tidak berubah.'],
        ['Menggandakan b dari 2 ke 4 membuat y separuh atau dua kali di semua tempat.', 'Ini mengkuadratkan pertumbuhannya: 4ˣ = (2ˣ)². Waktu penggandaan menjadi separuh (dari 1 ke 0,5), tetapi y sendiri berubah dengan faktor yang berbeda pada x yang berbeda.'],
        ['log(x + y) = log x + log y.', 'Logaritma mengubah perkalian menjadi penjumlahan, bukan penjumlahan menjadi penjumlahan: log(xy) = log x + log y. Misalnya ²log(4·8) = 2 + 3 = 5, tetapi ²log(4 + 8) = ²log 12 ≈ 3,58.'],
      ],
    },
    realWorld: {
      en: [
        'A bacterial culture that doubles every 20 minutes grows from 1,000 cells to about a million in just over 3 hours: N = 1000·2^(t/20).',
        'Carbon-14 has a half-life of 5,730 years; the fraction left in a bone, 0.5^(t/5730), lets archaeologists solve for its age t with a logarithm.',
        'The pH scale, the decibel scale and the Richter scale are logarithmic: each step of 1 means a factor of 10 in acidity, a fixed ratio of sound power, or about 32 times the energy of an earthquake.',
        'Savings at 8% per year obey M = M₀·1.08ᵗ and double roughly every 9 years, which is why starting to save early matters so much.',
        'Smartphone batteries, hot drinks cooling and medicine leaving the bloodstream all decay exponentially toward a limit, each with its own half-life.',
      ],
      id: [
        'Biakan bakteri yang berlipat dua tiap 20 menit tumbuh dari 1.000 sel menjadi sekitar satu juta hanya dalam sedikit lebih dari 3 jam: N = 1000·2^(t/20).',
        'Karbon-14 memiliki waktu paruh 5.730 tahun; sisa fraksinya dalam tulang, 0,5^(t/5730), memungkinkan arkeolog mencari umur t dengan logaritma.',
        'Skala pH, skala desibel dan skala Richter bersifat logaritmik: setiap kenaikan 1 berarti faktor 10 pada keasaman, rasio tetap pada daya bunyi, atau sekitar 32 kali energi gempa.',
        'Tabungan dengan bunga 8% per tahun mengikuti M = M₀·1,08ᵗ dan berlipat dua kira-kira tiap 9 tahun; itulah sebabnya mulai menabung lebih awal sangat berarti.',
        'Baterai ponsel, minuman panas yang mendingin dan obat yang meninggalkan aliran darah semuanya meluruh secara eksponensial menuju suatu batas, masing-masing dengan waktu paruhnya sendiri.',
      ],
    },
    questions: {
      en: [
        { q: 'A colony starts with 1 thousand cells and doubles every hour. Write N(t) and find when it reaches 50 thousand.', a: 'N(t) = 1·2ᵗ (thousands). Solve 2ᵗ = 50: t = ln 50 / ln 2 ≈ 5.64 hours.' },
        { q: 'A sample loses 10% of its mass each day (b = 0.9). What is its half-life, and how much of 10 g remains after 20 days?', a: 't_½ = ln 2 / ln(1/0.9) ≈ 6.58 days. After 20 days: 10·0.9²⁰ ≈ 1.22 g.' },
        { q: 'Why does the graph of y = log_b x have no points with x ≤ 0?', a: 'Because log_b x is the exponent with b^(that) = x, and a positive base raised to any real power is always positive. No exponent can produce 0 or a negative number.' },
        { q: 'Explain, using an exponent rule, why a·b^(x+1) is exactly b times a·bˣ.', a: 'b^(x+1) = bˣ·b¹ by the product rule for exponents, so a·b^(x+1) = a·bˣ·b = b·(a·bˣ). Each unit step multiplies y by b.' },
      ],
      id: [
        { q: 'Sebuah koloni mulai dengan 1 ribu sel dan berlipat dua tiap jam. Tuliskan N(t) dan cari kapan mencapai 50 ribu.', a: 'N(t) = 1·2ᵗ (ribuan). Selesaikan 2ᵗ = 50: t = ln 50 / ln 2 ≈ 5,64 jam.' },
        { q: 'Sebuah sampel kehilangan 10% massanya tiap hari (b = 0,9). Berapa waktu paruhnya, dan berapa sisa dari 10 g setelah 20 hari?', a: 't_½ = ln 2 / ln(1/0,9) ≈ 6,58 hari. Setelah 20 hari: 10·0,9²⁰ ≈ 1,22 g.' },
        { q: 'Mengapa grafik y = ᵇlog x tidak memiliki titik dengan x ≤ 0?', a: 'Karena ᵇlog x adalah pangkat dengan b^(pangkat itu) = x, dan bilangan pokok positif dipangkatkan bilangan real apa pun selalu positif. Tidak ada pangkat yang menghasilkan 0 atau bilangan negatif.' },
        { q: 'Jelaskan dengan sifat eksponen mengapa a·b^(x+1) tepat sama dengan b kali a·bˣ.', a: 'b^(x+1) = bˣ·b¹ menurut sifat perkalian pangkat, sehingga a·b^(x+1) = a·bˣ·b = b·(a·bˣ). Setiap langkah satu satuan mengalikan y dengan b.' },
      ],
    },
  },
};
