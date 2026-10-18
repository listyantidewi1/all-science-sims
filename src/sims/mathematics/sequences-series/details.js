// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Write the general term u_n and the partial sum S_n of an arithmetic sequence (a, d) and of a geometric sequence (a, r), and check them against the bars and points in the sim.',
      'Explain why simple interest produces an arithmetic sequence of balances while compound interest produces a geometric one, and quantify the gap after n periods.',
      'Compute the periodic payment of an annuity or loan from the principal, the rate and the number of periods, and describe how each input changes the payment.',
    ],
    id: [
      'Menuliskan suku umum u_n dan jumlah parsial S_n barisan aritmetika (a, b) dan barisan geometri (a, r), lalu mencocokkannya dengan batang dan titik di simulasi.',
      'Menjelaskan mengapa bunga tunggal menghasilkan barisan aritmetika dari saldo sedangkan bunga majemuk menghasilkan barisan geometri, dan menghitung selisihnya setelah n periode.',
      'Menghitung angsuran periodik anuitas atau pinjaman dari pokok, suku bunga dan banyak periode, serta menjelaskan pengaruh setiap masukan terhadap angsuran.',
    ],
  },
  tryThis: {
    en: [
      'Arithmetic mode: set a = 3 and d = 2. Read u_n and S_n at n = 10 from the header, then check S_10 by adding the ten bar heights.',
      'Geometric mode: set r = 0.5 and slide n up to 20 with partial sums on. The green squares flatten out: what value does S_n approach, and how does it match a/(1 − r)?',
      'Geometric mode: set r = −0.8. Why do the bars alternate above and below the axis, and does S_n still settle down?',
      'Finance mode, annuity view: keep M₀ = 10 million and n = 10, then move the rate from 0% to 12%. How does the total interest change? Now halve n instead.',
    ],
    id: [
      'Mode aritmetika: atur a = 3 dan b = 2. Baca u_n dan S_n pada n = 10 dari judul, lalu periksa S_10 dengan menjumlahkan tinggi sepuluh batang.',
      'Mode geometri: atur r = 0,5 dan geser n sampai 20 dengan jumlah parsial dinyalakan. Kotak hijau mendatar: nilai apa yang didekati S_n, dan bagaimana kaitannya dengan a/(1 − r)?',
      'Mode geometri: atur r = −0,8. Mengapa batang bergantian di atas dan di bawah sumbu, dan apakah S_n tetap menuju suatu nilai?',
      'Mode keuangan, tampilan anuitas: pertahankan M₀ = 10 juta dan n = 10, lalu geser suku bunga dari 0% ke 12%. Bagaimana total bunga berubah? Sekarang coba separuhkan n.',
    ],
  },

  learn: {
    background: {
      en: [
        'A sequence is an ordered list of numbers u_1, u_2, u_3, … built by a rule. In an arithmetic sequence each term is the previous term plus a fixed common difference d, so u_n = a + (n − 1)d where a = u_1. The terms lie on a straight line when plotted against n, which is why the dotted guide in the sim is straight: the sequence is a linear function sampled at whole numbers. In a geometric sequence each term is the previous term multiplied by a fixed common ratio r, so u_n = a·r^(n−1). Plotted against n these points follow an exponential curve: they bend upward when |r| > 1 and decay toward 0 when |r| < 1, and a negative r makes the signs alternate.',
        'A series is what you get when you add the terms. The partial sum S_n = u_1 + u_2 + … + u_n has a closed formula in both cases. Pairing the first and last terms of an arithmetic sequence gives S_n = n(a + u_n)/2 = n/2·(2a + (n − 1)d). Multiplying a geometric sum by r and subtracting gives S_n = a(1 − rⁿ)/(1 − r) for r ≠ 1 (and S_n = na when r = 1). When |r| < 1 the powers rⁿ shrink toward 0, so the partial sums settle at the limit S_∞ = a/(1 − r): the green squares in the sim flatten out at that height.',
        'Money grows by exactly these rules. With simple interest the interest each period is a fixed amount M₀·i, so the balance M_n = M₀(1 + i·n) is an arithmetic sequence with d = M₀·i. With compound interest the interest is a fixed fraction of the current balance, so M_n = M₀(1 + i)ⁿ is a geometric sequence with r = 1 + i. For M₀ = Rp 10 million at 6% the two balances are equal after 1 period (both Rp 10.6 million), differ by only Rp 36,000 after 2 periods, but by about Rp 1.9 million after 10 periods, and the gap keeps widening. The finance view shows the straight line and the exponential curve on the same axes.',
        'An annuity is a sequence of equal payments A at regular intervals. For a loan of M₀ repaid in n payments at rate i per period, each payment is A = M₀·i / (1 − (1 + i)^(−n)): this is a geometric series in disguise, because the present values of the n payments, A/(1+i) + A/(1+i)² + … + A/(1+i)ⁿ, must add up to M₀. The payment table in the sim splits each A into interest (balance × i) and principal (the rest). Early payments are mostly interest; as the balance falls the principal share grows, and the final balance reaches exactly zero.',
      ],
      id: [
        'Barisan adalah daftar bilangan berurutan u_1, u_2, u_3, … yang dibangun oleh suatu aturan. Pada barisan aritmetika setiap suku sama dengan suku sebelumnya ditambah beda tetap b, sehingga u_n = a + (n − 1)b dengan a = u_1. Jika digambar terhadap n, suku-sukunya terletak pada satu garis lurus; itulah sebabnya garis bantu putus-putus di simulasi berbentuk lurus: barisan ini adalah fungsi linear yang dicuplik pada bilangan bulat. Pada barisan geometri setiap suku sama dengan suku sebelumnya dikali rasio tetap r, sehingga u_n = a·r^(n−1). Titik-titiknya mengikuti kurva eksponensial: melengkung ke atas bila |r| > 1 dan menyusut menuju 0 bila |r| < 1, sedangkan r negatif membuat tandanya bergantian.',
        'Deret diperoleh dengan menjumlahkan suku-suku barisan. Jumlah parsial S_n = u_1 + u_2 + … + u_n memiliki rumus tertutup pada kedua kasus. Memasangkan suku pertama dan terakhir barisan aritmetika memberi S_n = n(a + u_n)/2 = n/2·(2a + (n − 1)b). Mengalikan jumlah geometri dengan r lalu mengurangkannya memberi S_n = a(1 − rⁿ)/(1 − r) untuk r ≠ 1 (dan S_n = na bila r = 1). Bila |r| < 1, pangkat rⁿ menyusut menuju 0 sehingga jumlah parsial menuju limit S_∞ = a/(1 − r): kotak hijau di simulasi mendatar pada ketinggian itu.',
        'Uang tumbuh dengan aturan yang sama persis. Pada bunga tunggal, bunga tiap periode adalah jumlah tetap M₀·i, sehingga saldo M_n = M₀(1 + i·n) merupakan barisan aritmetika dengan b = M₀·i. Pada bunga majemuk, bunga adalah pecahan tetap dari saldo saat itu, sehingga M_n = M₀(1 + i)ⁿ merupakan barisan geometri dengan r = 1 + i. Untuk M₀ = Rp 10 juta pada 6%, kedua saldo sama setelah 1 periode (keduanya Rp 10,6 juta), hanya berbeda Rp 36.000 setelah 2 periode, tetapi sekitar Rp 1,9 juta setelah 10 periode, dan selisihnya terus melebar. Tampilan keuangan memperlihatkan garis lurus dan kurva eksponensial pada sumbu yang sama.',
        'Anuitas adalah rangkaian pembayaran tetap A pada selang waktu teratur. Untuk pinjaman M₀ yang dilunasi dengan n angsuran pada suku bunga i per periode, setiap angsuran adalah A = M₀·i / (1 − (1 + i)^(−n)): ini sebenarnya deret geometri terselubung, karena nilai kini dari n angsuran, A/(1+i) + A/(1+i)² + … + A/(1+i)ⁿ, harus berjumlah M₀. Tabel angsuran di simulasi memecah setiap A menjadi bunga (sisa pinjaman × i) dan pokok (selebihnya). Angsuran awal didominasi bunga; ketika sisa pinjaman turun, porsi pokok bertambah, dan sisa pinjaman terakhir tepat menjadi nol.',
      ],
    },
    figure: {
      caption: {
        en: 'Six terms of an arithmetic sequence (a = 3, d = 2, blue) and a geometric sequence (a = 3, r = 1.5, purple) drawn as bars. The arithmetic bars grow by the same amount each step; the geometric bars grow by the same factor, so they soon overtake. Partial sums: S_6 = 48 and S_6 ≈ 62.4.',
        id: 'Enam suku barisan aritmetika (a = 3, b = 2, biru) dan barisan geometri (a = 3, r = 1,5, ungu) digambar sebagai batang. Batang aritmetika bertambah dengan jumlah yang sama tiap langkah; batang geometri bertambah dengan faktor yang sama sehingga segera menyusul. Jumlah parsial: S_6 = 48 dan S_6 ≈ 62,4.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // Precomputed bars: baseline y = 200, scale 6 px per unit.
        const ar = [3, 5, 7, 9, 11, 13];
        const ge = [3, 4.5, 6.75, 10.125, 15.1875, 22.78125];
        const base = 200, sc = 6;
        const bars = (vals, x0, color) => vals.map((v, i) => {
          const h = v * sc, x = x0 + i * 26;
          return `<rect x="${x}" y="${(base - h).toFixed(1)}" width="18" height="${h.toFixed(1)}" fill="${color}" opacity="0.9"/><text x="${x + 9}" y="${(base - h - 4).toFixed(1)}" text-anchor="middle" class="s">${Number.isInteger(v) ? v : v.toFixed(1)}</text>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Bars of an arithmetic and a geometric sequence', 'Batang barisan aritmetika dan barisan geometri')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:9px ui-monospace,monospace;fill:currentColor}.t{font:bold 11px system-ui,sans-serif}</style>
  <line x1="14" y1="200" x2="346" y2="200" stroke="currentColor" stroke-width="1" opacity="0.6"/>
  ${bars(ar, 20, '#38bdf8')}
  ${bars(ge, 196, '#a78bfa')}
  <text x="98" y="214" text-anchor="middle" class="t" fill="#38bdf8">${L('arithmetic: a = 3, d = 2', 'aritmetika: a = 3, b = 2')}</text>
  <text x="98" y="228" text-anchor="middle" class="s">u_n = 3 + 2(n−1),  S_6 = 48</text>
  <text x="274" y="214" text-anchor="middle" class="t" fill="#a78bfa">${L('geometric: a = 3, r = 1.5', 'geometri: a = 3, r = 1,5')}</text>
  <text x="274" y="228" text-anchor="middle" class="s">u_n = 3·1.5^(n−1),  S_6 ≈ 62.4</text>
  <text x="20" y="24">${L('+2 each step (straight line)', '+2 tiap langkah (garis lurus)')}</text>
  <text x="196" y="24">${L('×1.5 each step (curve)', '×1,5 tiap langkah (kurva)')}</text>
  <polyline points="29,182 55,170 81,158 107,146 133,134 159,122" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="3 3"/>
  <polyline points="205,182 231,173 257,159.5 283,139 309,109 335,63" fill="none" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3 3"/>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Arithmetic: u_n = a + (n − 1)d and S_n = n/2·(2a + (n − 1)d). The terms lie on a straight line.',
        'Geometric: u_n = a·r^(n−1) and S_n = a(1 − rⁿ)/(1 − r) for r ≠ 1. The terms lie on an exponential curve.',
        'If |r| < 1 the infinite geometric series converges to S_∞ = a/(1 − r); if |r| ≥ 1 the partial sums never settle.',
        'Simple interest is arithmetic growth (M_n = M₀(1 + in)); compound interest is geometric growth (M_n = M₀(1 + i)ⁿ). The difference grows without bound.',
        'An annuity payment A = M₀·i/(1 − (1 + i)^(−n)) comes from a geometric series of discounted payments; raising i or shortening n raises A.',
      ],
      id: [
        'Aritmetika: u_n = a + (n − 1)b dan S_n = n/2·(2a + (n − 1)b). Suku-sukunya terletak pada garis lurus.',
        'Geometri: u_n = a·r^(n−1) dan S_n = a(1 − rⁿ)/(1 − r) untuk r ≠ 1. Suku-sukunya terletak pada kurva eksponensial.',
        'Jika |r| < 1 deret geometri tak hingga konvergen ke S_∞ = a/(1 − r); jika |r| ≥ 1 jumlah parsialnya tidak pernah menuju suatu nilai.',
        'Bunga tunggal adalah pertumbuhan aritmetika (M_n = M₀(1 + in)); bunga majemuk adalah pertumbuhan geometri (M_n = M₀(1 + i)ⁿ). Selisihnya terus membesar tanpa batas.',
        'Angsuran anuitas A = M₀·i/(1 − (1 + i)^(−n)) berasal dari deret geometri pembayaran yang didiskon; menaikkan i atau memperpendek n menaikkan A.',
      ],
    },
    vocabulary: {
      en: [
        ['Arithmetic sequence', 'A sequence in which consecutive terms differ by the same amount d, the common difference.'],
        ['Geometric sequence', 'A sequence in which each term is the previous term multiplied by the same number r, the common ratio.'],
        ['Partial sum S_n', 'The total of the first n terms of a sequence; the sequence of partial sums is called a series.'],
        ['Convergent series', 'A series whose partial sums approach a finite limit; a geometric series converges exactly when |r| < 1.'],
        ['Compound interest', 'Interest computed on the current balance (principal plus interest already earned), giving geometric growth.'],
        ['Annuity', 'A sequence of equal payments at equal time intervals, such as the monthly instalments of a loan.'],
      ],
      id: [
        ['Barisan aritmetika', 'Barisan yang selisih dua suku berurutannya selalu sama, yaitu beda b.'],
        ['Barisan geometri', 'Barisan yang setiap sukunya sama dengan suku sebelumnya dikali bilangan tetap r, yaitu rasio.'],
        ['Jumlah parsial S_n', 'Jumlah n suku pertama suatu barisan; barisan dari jumlah parsial disebut deret.'],
        ['Deret konvergen', 'Deret yang jumlah parsialnya mendekati suatu limit berhingga; deret geometri konvergen tepat bila |r| < 1.'],
        ['Bunga majemuk', 'Bunga yang dihitung dari saldo saat ini (pokok ditambah bunga yang sudah diperoleh), sehingga tumbuh secara geometri.'],
        ['Anuitas', 'Rangkaian pembayaran yang besarnya sama pada selang waktu yang sama, misalnya angsuran bulanan sebuah pinjaman.'],
      ],
    },
    misconceptions: {
      en: [
        ['A geometric sequence always grows faster than an arithmetic one.', 'Only eventually, and only if |r| > 1. With r = 1.5 and d = 2 the arithmetic terms are larger for the first few n; and with |r| < 1 the geometric terms shrink toward zero.'],
        ['Doubling the interest rate doubles the loan payment.', 'It does not. In the annuity view, going from 6% to 12% on Rp 10 million over 10 periods raises the payment from about Rp 1.36 million to about Rp 1.77 million, roughly 30%, because most of each payment is repayment of principal, which does not depend on the rate.'],
        ['An infinite sum of positive numbers must be infinite.', 'If the terms shrink fast enough the sum is finite. The geometric series with a = 3 and r = 0.5 adds up to exactly 6: each new term closes half of the remaining gap.'],
        ['Simple and compound interest give nearly the same result.', 'They agree after one period and diverge ever faster afterwards. After 30 periods at 6%, compound interest gives about 5.7 times the principal while simple interest gives only 2.8 times.'],
      ],
      id: [
        ['Barisan geometri selalu tumbuh lebih cepat daripada barisan aritmetika.', 'Hanya pada akhirnya, dan hanya jika |r| > 1. Dengan r = 1,5 dan b = 2, suku aritmetika lebih besar pada beberapa n pertama; dan dengan |r| < 1 suku geometri justru menyusut menuju nol.'],
        ['Menggandakan suku bunga akan menggandakan angsuran.', 'Tidak. Pada tampilan anuitas, naik dari 6% ke 12% untuk Rp 10 juta selama 10 periode menaikkan angsuran dari sekitar Rp 1,36 juta menjadi sekitar Rp 1,77 juta, hanya sekitar 30%, karena sebagian besar angsuran adalah pengembalian pokok yang tidak bergantung pada suku bunga.'],
        ['Jumlah tak hingga bilangan positif pasti tak hingga.', 'Jika suku-sukunya menyusut cukup cepat, jumlahnya berhingga. Deret geometri dengan a = 3 dan r = 0,5 berjumlah tepat 6: setiap suku baru menutup separuh dari sisa selisih.'],
        ['Bunga tunggal dan bunga majemuk memberi hasil yang hampir sama.', 'Keduanya sama setelah satu periode lalu berbeda semakin cepat. Setelah 30 periode pada 6%, bunga majemuk memberi sekitar 5,7 kali pokok, sedangkan bunga tunggal hanya 2,8 kali.'],
      ],
    },
    realWorld: {
      en: [
        'A theatre with 20 seats in the first row and 2 more in each row behind it has 20 + 22 + … seats: an arithmetic series tells you the total capacity.',
        'Bank deposits, population growth and inflation all compound: a 5% yearly rise is a geometric sequence with r = 1.05, and the balance doubles roughly every 14 years.',
        'A car or house loan is an annuity: the bank fixes the monthly instalment so that the discounted payments add up to the amount borrowed.',
        'The bouncing of a ball that returns to 80% of its previous height is a geometric sequence, and the total distance it travels is a convergent geometric series.',
      ],
      id: [
        'Gedung pertunjukan dengan 20 kursi di baris pertama dan bertambah 2 kursi tiap baris di belakangnya memiliki 20 + 22 + … kursi: deret aritmetika memberi total kapasitasnya.',
        'Simpanan bank, pertumbuhan penduduk dan inflasi semuanya majemuk: kenaikan 5% per tahun adalah barisan geometri dengan r = 1,05, dan nilainya berlipat dua kira-kira setiap 14 tahun.',
        'Kredit mobil atau rumah adalah anuitas: bank menetapkan angsuran bulanan sehingga jumlah pembayaran yang didiskon sama dengan jumlah yang dipinjam.',
        'Pantulan bola yang kembali ke 80% tinggi sebelumnya membentuk barisan geometri, dan total jarak yang ditempuhnya adalah deret geometri yang konvergen.',
      ],
    },
    questions: {
      en: [
        { q: 'An arithmetic sequence has a = 3 and d = 2. Find u_20 and S_20, then check them in the sim.', a: 'u_20 = 3 + 19·2 = 41 and S_20 = 20/2·(6 + 19·2) = 10·44 = 440.' },
        { q: 'A geometric sequence has a = 3 and r = 0.5. What is S_∞, and how many terms are needed before S_n is within 0.01 of it?', a: 'S_∞ = 3/(1 − 0.5) = 6. The gap is S_∞ − S_n = 3·0.5ⁿ/(0.5) = 6·0.5ⁿ, which drops below 0.01 when 0.5ⁿ < 1/600, i.e. n ≥ 10 (6·0.5¹⁰ ≈ 0.0059).' },
        { q: 'Rp 10 million is borrowed at 1% per month for 12 months. Estimate the monthly payment and the total interest.', a: 'A = 10 000 000 × 0.01 / (1 − 1.01^(−12)) ≈ Rp 888,500 per month. Total paid ≈ Rp 10.66 million, so total interest ≈ Rp 0.66 million.' },
        { q: 'Why does the payment table show the interest portion shrinking every period even though the payment stays the same?', a: 'Interest each period is balance × i. Every payment reduces the balance, so the next interest charge is smaller and a larger share of the fixed payment goes to principal.' },
      ],
      id: [
        { q: 'Barisan aritmetika memiliki a = 3 dan b = 2. Tentukan u_20 dan S_20, lalu periksa di simulasi.', a: 'u_20 = 3 + 19·2 = 41 dan S_20 = 20/2·(6 + 19·2) = 10·44 = 440.' },
        { q: 'Barisan geometri memiliki a = 3 dan r = 0,5. Berapa S_∞, dan berapa suku yang diperlukan agar S_n berjarak kurang dari 0,01 darinya?', a: 'S_∞ = 3/(1 − 0,5) = 6. Selisihnya S_∞ − S_n = 6·0,5ⁿ, yang turun di bawah 0,01 ketika 0,5ⁿ < 1/600, yaitu n ≥ 10 (6·0,5¹⁰ ≈ 0,0059).' },
        { q: 'Rp 10 juta dipinjam dengan bunga 1% per bulan selama 12 bulan. Taksir angsuran bulanan dan total bunganya.', a: 'A = 10.000.000 × 0,01 / (1 − 1,01^(−12)) ≈ Rp 888.500 per bulan. Total dibayar ≈ Rp 10,66 juta, jadi total bunga ≈ Rp 0,66 juta.' },
        { q: 'Mengapa tabel angsuran memperlihatkan porsi bunga menyusut tiap periode padahal angsurannya tetap?', a: 'Bunga tiap periode adalah sisa pinjaman × i. Setiap angsuran mengurangi sisa pinjaman, sehingga bunga berikutnya lebih kecil dan porsi angsuran tetap yang menjadi pokok lebih besar.' },
      ],
    },
  },
};
