// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compute portfolio return = w·μ.',
      'Compute portfolio risk = √(w² σ_a² + (1-w)² σ_b² + 2w(1-w)·ρ σ_aσ_b).',
      'See diversification reduce risk when ρ < 1.',
    ],
    id: [
      'Menghitung return portofolio = w·μ.',
      'Menghitung risiko portofolio = √(w² σ_a² + (1-w)² σ_b² + 2w(1-w)·ρ σ_aσ_b).',
      'Melihat diversifikasi menurunkan risiko saat ρ < 1.',
    ],
  },  tryThis: {
    en: [
      'ρ = +1 — does the frontier become a straight line?',
      'ρ = −1 — can you find a zero-risk mix?',
      'Drag weight to find the minimum-variance portfolio.',
    ],
    id: [
      'ρ = +1 — apakah frontier menjadi garis lurus?',
      'ρ = −1 — bisakah Anda menemukan campuran tanpa risiko?',
      'Geser bobot untuk menemukan portofolio variansi minimum.',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An investment can be summarised by two numbers: its expected return μ, the average yearly gain you anticipate, and its risk σ, the standard deviation of that yearly gain. Mixing two assets A and B with weights w and 1 − w gives a portfolio whose expected return is just the weighted average, w·μ_A + (1 − w)·μ_B. Its risk is not a weighted average. The portfolio variance is w²σ_A² + (1 − w)²σ_B² + 2w(1 − w)·ρ·σ_A·σ_B, where the correlation ρ measures how much the two assets move together, and the portfolio risk is the square root of that.',
        'The simulation plots risk on the horizontal axis and return on the vertical axis. The two dots are the assets themselves, A (bond-like by default: 6% return, 8% risk) and B (stock-like: 12% return, 20% risk). The blue curve traces every mix from 100% A to 100% B, and the yellow dot is the mix set by the Weight slider. The other sliders change each asset\'s return and risk and the correlation ρ between them. A dashed green line runs from the fixed risk-free rate of 2% to the mix with the highest Sharpe ratio, the return above the risk-free rate per unit of risk, which is marked in green.',
        'The key insight is in the correlation slider. When ρ = +1 the two assets move in lockstep, the curve becomes a straight line, and mixing only trades return for risk in fixed proportion. For any ρ below 1 the curve bows to the left, meaning that some mixes carry less risk than either a straight-line blend would suggest, and at low enough ρ less risk than the safer asset on its own. At ρ = −1 the curve touches the vertical axis: a weight of σ_B / (σ_A + σ_B) on A produces zero risk, because every loss in one asset is exactly offset by a gain in the other. This reduction of risk by combining assets that do not move together is diversification.',
        'The sim simplifies in several ways. The curve shows all mixes between 0% and 100% of each asset, with no borrowing or short selling; strictly, only the upper part of the curve, from the minimum-variance mix upward, is the efficient frontier, since the lower part is dominated by mixes with the same risk and higher return. The inputs μ, σ and ρ are treated as known constants, whereas in reality they are estimated from past data and change over time. The axes are fixed at 0 to 30% risk and 0 to 18% return, so extreme slider settings go off the chart. None of this is a recommendation about real assets; it illustrates how the arithmetic of risk works.',
      ],
      id: [
        'Sebuah investasi bisa dirangkum dengan dua bilangan: imbal hasil yang diharapkan μ, yaitu keuntungan tahunan rata-rata yang diantisipasi, dan risikonya σ, yaitu simpangan baku keuntungan tahunan itu. Mencampur dua aset A dan B dengan bobot w dan 1 − w memberi portofolio dengan imbal hasil yang diharapkan berupa rata-rata berbobot, w·μ_A + (1 − w)·μ_B. Risikonya bukan rata-rata berbobot. Variansi portofolio adalah w²σ_A² + (1 − w)²σ_B² + 2w(1 − w)·ρ·σ_A·σ_B, dengan korelasi ρ mengukur seberapa searah kedua aset bergerak, dan risiko portofolio adalah akar kuadratnya.',
        'Simulasi ini memplot risiko pada sumbu mendatar dan imbal hasil pada sumbu tegak. Dua titik adalah aset-aset itu sendiri, A (mirip obligasi secara bawaan: imbal hasil 6%, risiko 8%) dan B (mirip saham: imbal hasil 12%, risiko 20%). Kurva biru menelusuri setiap campuran dari 100% A sampai 100% B, dan titik kuning adalah campuran yang diatur slider bobot. Slider lainnya mengubah imbal hasil dan risiko tiap aset serta korelasi ρ di antara keduanya. Garis hijau putus-putus ditarik dari suku bunga bebas risiko yang tetap 2% ke campuran dengan rasio Sharpe tertinggi, yaitu imbal hasil di atas suku bunga bebas risiko per satuan risiko, yang ditandai dengan warna hijau.',
        'Wawasan utamanya ada pada slider korelasi. Saat ρ = +1 kedua aset bergerak serempak, kurvanya menjadi garis lurus, dan mencampur hanya menukar imbal hasil dengan risiko dalam perbandingan tetap. Untuk ρ di bawah 1 kurvanya melengkung ke kiri, artinya beberapa campuran membawa risiko lebih kecil daripada yang disiratkan garis lurus, dan pada ρ yang cukup rendah risikonya lebih kecil daripada aset yang lebih aman sekalipun. Pada ρ = −1 kurva menyentuh sumbu tegak: bobot σ_B / (σ_A + σ_B) pada A menghasilkan risiko nol, karena setiap kerugian di satu aset tepat ditutup oleh keuntungan di aset lain. Pengurangan risiko dengan menggabungkan aset yang tidak bergerak searah inilah yang disebut diversifikasi.',
        'Sim ini menyederhanakan dalam beberapa hal. Kurva menampilkan semua campuran antara 0% dan 100% tiap aset, tanpa pinjaman atau short selling; secara ketat, hanya bagian atas kurva, dari campuran variansi minimum ke atas, yang disebut frontier efisien, karena bagian bawahnya dikalahkan oleh campuran dengan risiko sama tetapi imbal hasil lebih tinggi. Masukan μ, σ, dan ρ dianggap konstanta yang diketahui, padahal kenyataannya nilai-nilai itu ditaksir dari data masa lalu dan berubah dari waktu ke waktu. Sumbunya tetap pada risiko 0 sampai 30% dan imbal hasil 0 sampai 18%, sehingga pengaturan slider yang ekstrem keluar dari grafik. Tidak ada di antaranya yang merupakan rekomendasi tentang aset nyata; sim ini mengilustrasikan cara kerja aritmetika risiko.',
      ],
    },
    figure: {
      caption: {
        en: 'Mixes of A (6% return, 8% risk) and B (12% return, 20% risk). With ρ = +1 the mixes lie on the straight line; with ρ = 0.2 the curve bows left and the minimum-variance mix (amber) has less risk than A alone; with ρ = −1 one mix has zero risk.',
        id: 'Campuran A (imbal hasil 6%, risiko 8%) dan B (imbal hasil 12%, risiko 20%). Dengan ρ = +1 campuran berada pada garis lurus; dengan ρ = 0,2 kurva melengkung ke kiri dan campuran variansi minimum (oranye) berisiko lebih kecil daripada A sendiri; dengan ρ = −1 ada satu campuran yang berisiko nol.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Risk and return of two-asset mixes for three correlations', 'Risiko dan imbal hasil campuran dua aset untuk tiga korelasi')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{fill:none;stroke:currentColor;stroke-width:1.4}.m{stroke:currentColor;stroke-width:1;opacity:.3}.c{fill:none;stroke-width:2.2}</style>
  <line x1="50" y1="25" x2="50" y2="215" class="ax"/>
  <line x1="50" y1="215" x2="340" y2="215" class="ax"/>
  <line x1="162" y1="25" x2="162" y2="215" class="m" stroke-dasharray="3 3"/><text x="150" y="229">10%</text>
  <line x1="274" y1="25" x2="274" y2="215" class="m" stroke-dasharray="3 3"/><text x="262" y="229">20%</text>
  <line x1="50" y1="155" x2="340" y2="155" class="m" stroke-dasharray="3 3"/><text x="26" y="159">5%</text>
  <line x1="50" y1="95" x2="340" y2="95" class="m" stroke-dasharray="3 3"/><text x="20" y="99">10%</text>
  <text x="250" y="239" opacity=".8">${L('risk σ →', 'risiko σ →')}</text>
  <text x="56" y="20" opacity=".8">${L('return μ ↑', 'imbal hasil μ ↑')}</text>
  <line x1="139.6" y1="143" x2="274" y2="71" class="c" stroke="currentColor" stroke-dasharray="5 4" opacity=".5"/>
  <text x="222" y="118" opacity=".7">ρ = +1</text>
  <path d="M139.6 143 L50 122.5 L274 71" class="c" stroke="#10b981" stroke-dasharray="5 4"/>
  <text x="56" y="112" fill="#10b981">ρ = −1: ${L('zero risk', 'risiko nol')}</text>
  <path d="M139.6 143 L137.8 137.2 L141.8 128.6 L163.3 114.2 L195.8 99.8 L233.7 85.4 L274 71" class="c" stroke="#3b82f6"/>
  <text x="150" y="88" fill="#3b82f6">${L('ρ = 0.2', 'ρ = 0,2')}</text>
  <circle cx="137.8" cy="137.2" r="5" fill="#f59e0b"/>
  <text x="104" y="166" fill="#f59e0b">${L('min variance', 'variansi minimum')}</text>
  <circle cx="139.6" cy="143" r="5.5" fill="#8b5cf6"/>
  <text x="146" y="156" fill="#8b5cf6">A (6%, 8%)</text>
  <circle cx="274" cy="71" r="5.5" fill="#ef4444"/>
  <text x="282" y="68" fill="#ef4444">B (12%, 20%)</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A portfolio\'s expected return is the weighted average of its assets\' returns, but its risk is usually less than the weighted average of their risks.',
        'The lower the correlation between two assets, the more the risk–return curve bows to the left; this bow is the benefit of diversification.',
        'With correlation +1 there is no diversification benefit; with correlation −1 some mix has zero risk.',
        'Only the upper part of the curve, from the minimum-variance portfolio upward, is efficient: for any risk level it offers the highest return.',
        'The Sharpe ratio, (return − risk-free rate) / risk, picks out the mix where a line from the risk-free rate just touches the frontier.',
      ],
      id: [
        'Imbal hasil yang diharapkan dari portofolio adalah rata-rata berbobot imbal hasil asetnya, tetapi risikonya biasanya lebih kecil daripada rata-rata berbobot risiko asetnya.',
        'Semakin rendah korelasi dua aset, semakin kurva risiko–imbal hasil melengkung ke kiri; lengkungan ini adalah manfaat diversifikasi.',
        'Dengan korelasi +1 tidak ada manfaat diversifikasi; dengan korelasi −1 ada campuran yang berisiko nol.',
        'Hanya bagian atas kurva, dari portofolio variansi minimum ke atas, yang efisien: untuk setiap tingkat risiko ia memberi imbal hasil tertinggi.',
        'Rasio Sharpe, (imbal hasil − suku bunga bebas risiko) / risiko, menunjuk campuran tempat garis dari suku bunga bebas risiko tepat menyinggung frontier.',
      ],
    },
    vocabulary: {
      en: [
        ['Expected return (μ)', 'The average yearly gain an asset is assumed to deliver, as a percentage.'],
        ['Risk / volatility (σ)', 'The standard deviation of yearly returns; a measure of how far outcomes typically stray from the average.'],
        ['Correlation (ρ)', 'A number from −1 to +1 describing how two assets move together: +1 in lockstep, 0 unrelated, −1 in opposite directions.'],
        ['Portfolio weight (w)', 'The fraction of the money placed in one asset; the rest, 1 − w, goes in the other.'],
        ['Diversification', 'Reducing risk by combining assets that do not move perfectly together.'],
        ['Minimum-variance portfolio', 'The mix with the lowest possible risk; the leftmost point of the curve.'],
        ['Efficient frontier', 'The set of mixes that give the highest return for each level of risk; the upper branch of the curve.'],
        ['Sharpe ratio', 'Return in excess of the risk-free rate divided by risk; the green dot in the sim maximises it.'],
      ],
      id: [
        ['Imbal hasil yang diharapkan (μ)', 'Keuntungan tahunan rata-rata yang diasumsikan diberikan suatu aset, dalam persen.'],
        ['Risiko / volatilitas (σ)', 'Simpangan baku imbal hasil tahunan; ukuran seberapa jauh hasil biasanya menyimpang dari rata-rata.'],
        ['Korelasi (ρ)', 'Bilangan dari −1 sampai +1 yang menggambarkan bagaimana dua aset bergerak bersama: +1 serempak, 0 tak berkaitan, −1 berlawanan arah.'],
        ['Bobot portofolio (w)', 'Bagian uang yang ditempatkan pada satu aset; sisanya, 1 − w, ditempatkan pada aset lain.'],
        ['Diversifikasi', 'Mengurangi risiko dengan menggabungkan aset-aset yang tidak bergerak persis searah.'],
        ['Portofolio variansi minimum', 'Campuran dengan risiko sekecil mungkin; titik paling kiri pada kurva.'],
        ['Frontier efisien', 'Himpunan campuran yang memberi imbal hasil tertinggi untuk setiap tingkat risiko; cabang atas kurva.'],
        ['Rasio Sharpe', 'Imbal hasil di atas suku bunga bebas risiko dibagi risiko; titik hijau di sim memaksimalkannya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Adding a riskier asset to a safe one always makes the portfolio riskier.', 'Not necessarily. With the sim\'s defaults (ρ = 0.2), putting 8% into the stock-like asset B lowers the risk from 8.0% to about 7.8% while raising the return, because B\'s moves partly cancel A\'s.'],
        ['Portfolio risk is the weighted average of the assets\' risks.', 'That is true only when ρ = +1. For any lower correlation the cross term 2w(1 − w)ρσ_Aσ_B is smaller, so the portfolio risk falls below the weighted average; the curve bows away from the straight line.'],
        ['Diversification raises returns.', 'It does not change the expected return of a given mix at all; that is always the weighted average. Diversification lowers the risk at which that return is obtained.'],
        ['Negative correlation means one asset must have a negative return.', 'Correlation describes how the two assets\' ups and downs line up, not their average levels. Two assets can both have positive expected returns yet tend to move in opposite directions.'],
      ],
      id: [
        ['Menambahkan aset yang lebih berisiko ke aset yang aman selalu membuat portofolio lebih berisiko.', 'Tidak selalu. Dengan nilai bawaan sim (ρ = 0,2), menempatkan 8% pada aset mirip saham B menurunkan risiko dari 8,0% menjadi sekitar 7,8% sambil menaikkan imbal hasil, karena gerakan B sebagian meniadakan gerakan A.'],
        ['Risiko portofolio adalah rata-rata berbobot risiko aset-asetnya.', 'Itu hanya benar jika ρ = +1. Untuk korelasi yang lebih rendah, suku silang 2w(1 − w)ρσ_Aσ_B lebih kecil, sehingga risiko portofolio turun di bawah rata-rata berbobot; kurvanya melengkung menjauhi garis lurus.'],
        ['Diversifikasi menaikkan imbal hasil.', 'Diversifikasi sama sekali tidak mengubah imbal hasil yang diharapkan dari suatu campuran; nilainya selalu rata-rata berbobot. Diversifikasi menurunkan risiko untuk memperoleh imbal hasil itu.'],
        ['Korelasi negatif berarti salah satu aset pasti berimbal hasil negatif.', 'Korelasi menggambarkan bagaimana naik-turun kedua aset berpasangan, bukan tingkat rata-ratanya. Dua aset bisa sama-sama punya imbal hasil yang diharapkan positif namun cenderung bergerak berlawanan arah.'],
      ],
    },
    realWorld: {
      en: [
        'Pension funds and index funds spread money across thousands of securities so that no single company\'s bad year dominates the result.',
        'Stocks and government bonds have often had low or negative correlation, which is why many balanced funds hold both.',
        'An umbrella seller and an ice-cream seller sharing one shop have negatively correlated sales, so their combined income is steadier than either alone.',
        'Farmers plant several crops with different weather sensitivities for the same reason: a bad season for one is rarely a bad season for all.',
      ],
      id: [
        'Dana pensiun dan reksa dana indeks menyebarkan uang ke ribuan surat berharga agar tahun buruk satu perusahaan tidak mendominasi hasilnya.',
        'Saham dan obligasi pemerintah sering berkorelasi rendah atau negatif, itulah sebabnya banyak reksa dana campuran memegang keduanya.',
        'Penjual payung dan penjual es krim yang berbagi satu kios punya penjualan yang berkorelasi negatif, sehingga pendapatan gabungan mereka lebih stabil daripada masing-masing sendiri.',
        'Petani menanam beberapa jenis tanaman dengan kepekaan cuaca yang berbeda karena alasan yang sama: musim buruk bagi satu tanaman jarang menjadi musim buruk bagi semuanya.',
      ],
    },
    questions: {
      en: [
        { q: 'With the default assets (σ_A = 8%, σ_B = 20%) and ρ = −1, what weight on A gives zero risk, and what is that portfolio\'s return?', a: 'w = σ_B / (σ_A + σ_B) = 0.20 / 0.28 ≈ 0.714, so about 71% in A and 29% in B. The return is 0.714 × 6% + 0.286 × 12% ≈ 7.7%, a riskless 7.7% in this idealised model. Set ρ = −1 and slide the weight to 71% to see the yellow dot touch the axis.' },
        { q: 'Compute the risk of a 50/50 mix of the default assets for ρ = 1, ρ = 0 and ρ = −1.', a: 'Variance = 0.25·0.0064 + 0.25·0.04 + 0.5·ρ·0.016 = 0.0116 + 0.008ρ. For ρ = 1: √0.0196 = 14.0%, the plain average of 8% and 20%. For ρ = 0: √0.0116 ≈ 10.8%. For ρ = −1: √0.0036 = 6.0%, lower than either asset alone.' },
        { q: 'Why does the sim call only part of the blue curve the efficient frontier, and how would you find where that part begins?', a: 'Below the minimum-variance point, every mix is beaten by another mix with the same risk but a higher return, so those mixes are inefficient. The frontier starts at the minimum-variance mix, w* = (σ_B² − ρσ_Aσ_B) / (σ_A² + σ_B² − 2ρσ_Aσ_B), which for the defaults is w* = 0.92, and runs up to 100% B.' },
      ],
      id: [
        { q: 'Dengan aset bawaan (σ_A = 8%, σ_B = 20%) dan ρ = −1, bobot A berapa yang memberi risiko nol, dan berapa imbal hasil portofolio itu?', a: 'w = σ_B / (σ_A + σ_B) = 0,20 / 0,28 ≈ 0,714, jadi sekitar 71% di A dan 29% di B. Imbal hasilnya 0,714 × 6% + 0,286 × 12% ≈ 7,7%, yaitu 7,7% tanpa risiko dalam model ideal ini. Atur ρ = −1 dan geser bobot ke 71% untuk melihat titik kuning menyentuh sumbu.' },
        { q: 'Hitung risiko campuran 50/50 aset bawaan untuk ρ = 1, ρ = 0, dan ρ = −1.', a: 'Variansi = 0,25·0,0064 + 0,25·0,04 + 0,5·ρ·0,016 = 0,0116 + 0,008ρ. Untuk ρ = 1: √0,0196 = 14,0%, rata-rata biasa dari 8% dan 20%. Untuk ρ = 0: √0,0116 ≈ 10,8%. Untuk ρ = −1: √0,0036 = 6,0%, lebih rendah daripada kedua aset sendiri-sendiri.' },
        { q: 'Mengapa sim menyebut hanya sebagian kurva biru sebagai frontier efisien, dan bagaimana menemukan awal bagian itu?', a: 'Di bawah titik variansi minimum, setiap campuran dikalahkan oleh campuran lain dengan risiko sama tetapi imbal hasil lebih tinggi, sehingga campuran itu tidak efisien. Frontier dimulai dari campuran variansi minimum, w* = (σ_B² − ρσ_Aσ_B) / (σ_A² + σ_B² − 2ρσ_Aσ_B), yang untuk nilai bawaan adalah w* = 0,92, dan berlanjut sampai 100% B.' },
      ],
    },
  },
};
