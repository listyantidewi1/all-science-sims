// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply NPV = Σ CF_t / (1+r)^t.',
      'Identify IRR as the rate that makes NPV = 0.',
      'Distinguish "negative now, positive later" projects from "positive now, negative later".',
    ],
    id: [
      'Menerapkan NPV = Σ CF_t / (1+r)^t.',
      'Mengenali IRR sebagai tingkat yang membuat NPV = 0.',
      'Membedakan proyek "negatif sekarang, positif nanti" dari "positif sekarang, negatif nanti".',
    ],
  },
  tryThis: {
    en: [
      'Initial investment $1000, $300/year for 5 years — what is NPV at 8%?',
      'Find the discount rate where NPV = 0 (the IRR).',
      'Push rate to 30% — does NPV go negative?',
    ],
    id: [
      'Investasi awal Rp10jt, kas masuk Rp3jt/tahun selama 5 tahun — berapa NPV pada 8%?',
      'Cari tingkat diskonto di mana NPV = 0 (IRR).',
      'Naikkan tingkat ke 30% — apakah NPV jadi negatif?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A dollar promised next year is worth less than a dollar in hand today, because today\'s dollar could be invested and grow in the meantime. If money can earn a rate r, then receiving CF in t years is equivalent to having CF / (1 + r)ᵗ now; this is called discounting, and r is the discount rate. Net present value (NPV) applies the idea to a whole project: add up every cash flow, inflows positive and outflows negative, each discounted back to today. A positive NPV means the project returns more than the same money would earn at rate r elsewhere; a negative NPV means it returns less.',
        'The sim\'s project is the classic shape: an outflow today (t = 0, not discounted because it happens now) followed by equal yearly inflows for a chosen number of years. The left chart draws each cash flow as a bar, with a darker inner bar showing its discounted value; notice how the inner bars shrink with time while the outflow at t = 0 does not shrink at all. The right chart plots NPV against the discount rate from 0 to 50%, with the current rate as a red dot and a dashed line at zero. At r = 0 the NPV is simply the sum of the raw cash flows. As r rises the distant inflows are discounted more and more heavily while the up-front cost stays fixed, so the curve falls.',
        'The internal rate of return (IRR) is the discount rate at which the curve crosses zero: the rate that makes the project exactly break even in present-value terms. The sim finds it numerically by bisection, narrowing in on the crossing between −99% and 500%. For a project of this shape the decision rule is simple: NPV is positive, and the project adds value, whenever the discount rate is below the IRR. The sliders let you test this. Raising the annual inflow or the number of years lifts the whole curve and pushes the IRR right; raising the initial cost lowers the curve and pulls the IRR left; the rate slider only moves the dot along a fixed curve.',
        'The model is as simple as discounting gets. Cash flows are known with certainty, arrive exactly once a year, are the same every year, and the discount rate is constant. Real projects have uncertain and uneven cash flows, and the appropriate discount rate depends on how risky they are. Because the sim only allows a negative initial flow and non-negative later flows, the NPV curve always slopes down and the IRR is unique. Projects with the opposite pattern, cash in now and payments later, like taking a loan, have an upward-sloping curve, and the rule flips: they are attractive when the discount rate is above the IRR. Projects whose cash flows change sign several times can even have more than one IRR, which is why NPV, not IRR, is the primary tool.',
      ],
      id: [
        'Satu dolar yang dijanjikan tahun depan bernilai lebih kecil daripada satu dolar di tangan hari ini, karena dolar hari ini bisa diinvestasikan dan tumbuh sementara itu. Jika uang dapat menghasilkan tingkat r, maka menerima CF dalam t tahun setara dengan memiliki CF / (1 + r)ᵗ sekarang; ini disebut pendiskontoan, dan r adalah tingkat diskonto. Nilai kini bersih (NPV) menerapkan gagasan itu pada seluruh proyek: jumlahkan setiap arus kas, kas masuk positif dan kas keluar negatif, masing-masing didiskonto ke hari ini. NPV positif berarti proyek mengembalikan lebih banyak daripada yang dihasilkan uang yang sama pada tingkat r di tempat lain; NPV negatif berarti mengembalikan lebih sedikit.',
        'Proyek di simulasi berbentuk klasik: kas keluar hari ini (t = 0, tidak didiskonto karena terjadi sekarang) diikuti kas masuk tahunan yang sama besar selama jumlah tahun yang dipilih. Grafik kiri menggambar tiap arus kas sebagai batang, dengan batang dalam yang lebih gelap menunjukkan nilai diskontonya; perhatikan bagaimana batang dalam menyusut seiring waktu sementara kas keluar di t = 0 tidak menyusut sama sekali. Grafik kanan memplot NPV terhadap tingkat diskonto dari 0 sampai 50%, dengan tingkat saat ini sebagai titik merah dan garis putus-putus pada nol. Pada r = 0, NPV hanyalah jumlah arus kas mentah. Saat r naik, kas masuk yang jauh didiskonto semakin berat sementara biaya awal tetap, sehingga kurva turun.',
        'Tingkat pengembalian internal (IRR) adalah tingkat diskonto tempat kurva memotong nol: tingkat yang membuat proyek tepat impas dalam nilai kini. Simulasi menemukannya secara numerik dengan metode bagi dua, mempersempit titik potong antara −99% dan 500%. Untuk proyek berbentuk seperti ini aturan keputusannya sederhana: NPV positif, dan proyek menambah nilai, setiap kali tingkat diskonto berada di bawah IRR. Slider memungkinkanmu mengujinya. Menaikkan kas masuk tahunan atau jumlah tahun mengangkat seluruh kurva dan mendorong IRR ke kanan; menaikkan biaya awal menurunkan kurva dan menarik IRR ke kiri; slider tingkat hanya menggeser titik sepanjang kurva yang tetap.',
        'Modelnya sesederhana pendiskontoan bisa dibuat. Arus kas diketahui dengan pasti, datang tepat sekali setahun, sama setiap tahun, dan tingkat diskontonya tetap. Proyek sungguhan punya arus kas yang tak pasti dan tidak rata, dan tingkat diskonto yang tepat bergantung pada seberapa berisikonya. Karena simulasi hanya mengizinkan arus awal negatif dan arus berikutnya tidak negatif, kurva NPV selalu menurun dan IRR-nya tunggal. Proyek dengan pola sebaliknya, kas masuk sekarang dan pembayaran nanti, seperti mengambil pinjaman, punya kurva yang menaik, dan aturannya terbalik: proyek itu menarik saat tingkat diskonto di atas IRR. Proyek yang arus kasnya berganti tanda beberapa kali bahkan bisa punya lebih dari satu IRR, itulah sebabnya NPV, bukan IRR, menjadi alat utama.',
      ],
    },
    figure: {
      caption: {
        en: 'NPV of a project costing $1,000 today and paying $300 a year for five years, plotted against the discount rate. At 0% the NPV is the plain sum, $500. The curve falls as the rate rises and crosses zero at the IRR, about 15.2%; at the sim\'s default 8% the NPV is about $198.',
        id: 'NPV proyek berbiaya $1.000 hari ini yang membayar $300 per tahun selama lima tahun, diplot terhadap tingkat diskonto. Pada 0% NPV adalah jumlah biasa, $500. Kurva turun saat tingkat naik dan memotong nol pada IRR, sekitar 15,2%; pada tingkat bawaan simulasi 8%, NPV-nya sekitar $198.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('NPV falling with the discount rate and crossing zero at the IRR', 'NPV menurun terhadap tingkat diskonto dan memotong nol pada IRR')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.s{font-size:10px;opacity:.75}.c{fill:none;stroke-width:2.6;stroke-linejoin:round}</style>
  <rect x="50" y="30" width="142" height="112.5" fill="#10b981" opacity=".10"/>
  <rect x="192" y="142.5" width="138" height="67.5" fill="#ef4444" opacity=".10"/>
  <line x1="50" y1="30" x2="50" y2="210" class="ax"/>
  <line x1="50" y1="210" x2="330" y2="210" class="ax"/>
  <line x1="50" y1="142.5" x2="330" y2="142.5" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="5 3"/>
  <text x="26" y="146" class="s">0</text>
  <text x="10" y="34" class="s">+500</text>
  <text x="10" y="200" class="s">−250</text>
  <text x="46" y="224" class="s">0%</text>
  <text x="134" y="224" class="s">10%</text>
  <text x="226" y="224" class="s">20%</text>
  <text x="318" y="224" class="s">30%</text>
  <text x="230" y="238" class="s">${L('discount rate r', 'tingkat diskonto r')} →</text>
  <text x="54" y="26" class="s">NPV ($)</text>
  <path d="M50 30 L97 75.3 L143 111.6 L190 141.2 L237 165.6 L283 186 L330 203.1" class="c" stroke="#3b82f6"/>
  <circle cx="124.7" cy="98" r="5" fill="#ef4444"/>
  <text x="131" y="96" fill="#ef4444" class="s">r = 8%, NPV ≈ 198</text>
  <circle cx="192" cy="142.5" r="5" fill="#f59e0b"/>
  <line x1="192" y1="142.5" x2="192" y2="210" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="197" y="160" fill="#f59e0b">IRR ≈ 15.2%</text>
  <text x="58" y="130" fill="#10b981">${L('r below IRR: NPV positive', 'r di bawah IRR: NPV positif')}</text>
  <text x="208" y="200" fill="#ef4444">${L('r above IRR: NPV negative', 'r di atas IRR: NPV negatif')}</text>
  <text x="56" y="44" class="s">${L('at r = 0: plain sum = 500', 'pada r = 0: jumlah biasa = 500')}</text>
  <text x="200" y="52" class="s">−1000 ${L('today', 'hari ini')}, +300 × 5 ${L('years', 'tahun')}</text>
  <text x="200" y="64" class="s">NPV = Σ CFₜ / (1 + r)ᵗ</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Discounting converts a future cash flow into its value today: CF / (1 + r)ᵗ.',
        'NPV is the sum of all discounted cash flows, with the outflow today counted in full and later inflows shrunk by their waiting time.',
        'For an invest-now, receive-later project, NPV falls as the discount rate rises because the inflows shrink while the up-front cost does not.',
        'The IRR is the discount rate at which NPV = 0; such a project adds value exactly when r is below its IRR.',
        'NPV is the more reliable guide: the IRR rule flips for projects with cash in first, and some cash-flow patterns have more than one IRR.',
      ],
      id: [
        'Pendiskontoan mengubah arus kas masa depan menjadi nilainya hari ini: CF / (1 + r)ᵗ.',
        'NPV adalah jumlah semua arus kas terdiskonto, dengan kas keluar hari ini dihitung penuh dan kas masuk berikutnya menyusut sesuai lama menunggunya.',
        'Untuk proyek investasi-sekarang, terima-nanti, NPV turun saat tingkat diskonto naik karena kas masuk menyusut sementara biaya awal tidak.',
        'IRR adalah tingkat diskonto saat NPV = 0; proyek seperti itu menambah nilai tepat ketika r di bawah IRR-nya.',
        'NPV adalah panduan yang lebih andal: aturan IRR terbalik untuk proyek dengan kas masuk lebih dulu, dan beberapa pola arus kas punya lebih dari satu IRR.',
      ],
    },
    vocabulary: {
      en: [
        ['Cash flow (CFₜ)', 'Money received (positive) or paid out (negative) at time t.'],
        ['Discount rate (r)', 'The yearly rate used to shrink future cash flows to today\'s value; often the return available on alternatives of similar risk.'],
        ['Present value', 'What a future cash flow is worth today: CF / (1 + r)ᵗ.'],
        ['Net present value (NPV)', 'The sum of the present values of all of a project\'s cash flows, including the initial outlay.'],
        ['Internal rate of return (IRR)', 'The discount rate that makes a project\'s NPV exactly zero.'],
        ['Hurdle rate', 'The minimum return a project must offer to be accepted; the IRR is compared with it.'],
        ['Bisection', 'A numerical method that finds where a function crosses zero by repeatedly halving an interval that brackets the crossing.'],
      ],
      id: [
        ['Arus kas (CFₜ)', 'Uang yang diterima (positif) atau dibayarkan (negatif) pada waktu t.'],
        ['Tingkat diskonto (r)', 'Tingkat tahunan yang dipakai untuk menyusutkan arus kas masa depan ke nilai hari ini; sering kali imbal hasil alternatif dengan risiko serupa.'],
        ['Nilai kini', 'Nilai arus kas masa depan pada hari ini: CF / (1 + r)ᵗ.'],
        ['Nilai kini bersih (NPV)', 'Jumlah nilai kini semua arus kas suatu proyek, termasuk pengeluaran awal.'],
        ['Tingkat pengembalian internal (IRR)', 'Tingkat diskonto yang membuat NPV proyek tepat nol.'],
        ['Tingkat ambang (hurdle rate)', 'Imbal hasil minimum yang harus ditawarkan proyek agar diterima; IRR dibandingkan dengannya.'],
        ['Metode bagi dua', 'Metode numerik yang menemukan titik potong nol suatu fungsi dengan berulang kali membagi dua selang yang mengurung titik potong itu.'],
      ],
    },
    misconceptions: {
      en: [
        ['A project is worthwhile if it pays back more than it costs.', 'Only if it pays back more after discounting. The sim\'s project returns $1,500 on a $1,000 cost, yet at any discount rate above 15.2% its NPV is negative, because the money could have earned more elsewhere.'],
        ['A higher discount rate makes every project look better, since it means higher returns.', 'The discount rate is the return demanded, not the return earned. Raising it shrinks the value of future inflows while the up-front cost is unchanged, so NPV falls.'],
        ['The IRR tells you how much money a project makes.', 'It is a percentage rate, not an amount. A tiny project can have a huge IRR and still add little value; NPV measures value added in dollars.'],
        ['The project with the higher IRR is always the better one.', 'Not when projects differ in size or timing, or when cash flows change sign more than once. Compare NPVs at the appropriate discount rate instead.'],
      ],
      id: [
        ['Proyek layak jika mengembalikan lebih banyak daripada biayanya.', 'Hanya jika mengembalikan lebih banyak setelah didiskonto. Proyek di simulasi mengembalikan $1.500 atas biaya $1.000, tetapi pada tingkat diskonto di atas 15,2% NPV-nya negatif, karena uang itu bisa menghasilkan lebih banyak di tempat lain.'],
        ['Tingkat diskonto lebih tinggi membuat setiap proyek tampak lebih baik, karena berarti imbal hasil lebih tinggi.', 'Tingkat diskonto adalah imbal hasil yang dituntut, bukan yang diperoleh. Menaikkannya menyusutkan nilai kas masuk masa depan sementara biaya awal tidak berubah, sehingga NPV turun.'],
        ['IRR memberi tahu berapa uang yang dihasilkan proyek.', 'IRR adalah tingkat persentase, bukan jumlah. Proyek kecil bisa punya IRR sangat besar tetapi menambah nilai sedikit; NPV mengukur nilai tambah dalam dolar.'],
        ['Proyek dengan IRR lebih tinggi selalu lebih baik.', 'Tidak jika proyek berbeda ukuran atau waktunya, atau jika arus kas berganti tanda lebih dari sekali. Bandingkan NPV pada tingkat diskonto yang tepat sebagai gantinya.'],
      ],
    },
    realWorld: {
      en: [
        'Companies decide whether to build a factory, buy a machine or launch a product by forecasting the cash flows and discounting them at their cost of capital; a positive NPV is the standard test.',
        'Governments appraise roads, dams and railways the same way, discounting future benefits and costs, and the choice of discount rate is often the most argued-over number in the analysis.',
        'A fixed-rate loan is the mirror image of the sim\'s project: cash in now, payments later, and the lender\'s quoted interest rate is the IRR of those payments.',
        'Spreadsheet functions such as NPV and IRR carry out exactly the sum and the root search the sim performs, which is why these two numbers appear in almost every business plan.',
      ],
      id: [
        'Perusahaan memutuskan apakah membangun pabrik, membeli mesin, atau meluncurkan produk dengan meramalkan arus kas dan mendiskontonya pada biaya modal mereka; NPV positif adalah ujian bakunya.',
        'Pemerintah menilai jalan, bendungan, dan jalur kereta dengan cara yang sama, mendiskonto manfaat dan biaya masa depan, dan pilihan tingkat diskonto sering menjadi angka yang paling diperdebatkan dalam analisis.',
        'Pinjaman berbunga tetap adalah bayangan cermin proyek di simulasi: kas masuk sekarang, pembayaran nanti, dan suku bunga yang dikutip pemberi pinjaman adalah IRR dari pembayaran-pembayaran itu.',
        'Fungsi spreadsheet seperti NPV dan IRR melakukan persis penjumlahan dan pencarian akar yang dilakukan simulasi, itulah sebabnya kedua angka ini muncul di hampir setiap rencana bisnis.',
      ],
    },
    questions: {
      en: [
        { q: 'A project costs $1,000 today and pays $300 at the end of each of the next five years. What is its NPV at an 8% discount rate?', a: 'The five inflows form an annuity worth 300 × (1 − 1.08⁻⁵) / 0.08 ≈ 300 × 3.993 ≈ $1,197.8 today. Subtracting the $1,000 outlay gives NPV ≈ $197.8, so the project adds value at 8%.' },
        { q: 'For the same project, roughly what is the IRR?', a: 'We need 300 × annuity factor = 1,000, so the factor must be 3.333. At 15% the factor is 3.352 (NPV ≈ +$5.6) and at 16% it is 3.274 (NPV ≈ −$17.7), so the crossing is just above 15%: IRR ≈ 15.2%. The sim\'s bisection reports the same value.' },
        { q: 'Why does the NPV curve always slope downward for the projects this sim allows, and what would it look like for a loan?', a: 'The only negative flow is at t = 0, where (1 + r)⁰ = 1, so its present value does not depend on r, while every positive inflow is divided by a larger (1 + r)ᵗ as r grows. A loan reverses the signs: cash in today, payments later, so its NPV rises with r, and the borrower is better off when the discount rate exceeds the loan\'s IRR, that is, when they could earn more than the interest rate elsewhere.' },
      ],
      id: [
        { q: 'Sebuah proyek berbiaya $1.000 hari ini dan membayar $300 di akhir tiap tahun selama lima tahun ke depan. Berapa NPV-nya pada tingkat diskonto 8%?', a: 'Lima kas masuk membentuk anuitas bernilai 300 × (1 − 1,08⁻⁵) / 0,08 ≈ 300 × 3,993 ≈ $1.197,8 hari ini. Dikurangi pengeluaran $1.000 memberi NPV ≈ $197,8, jadi proyek menambah nilai pada 8%.' },
        { q: 'Untuk proyek yang sama, kira-kira berapa IRR-nya?', a: 'Kita perlu 300 × faktor anuitas = 1.000, sehingga faktornya harus 3,333. Pada 15% faktornya 3,352 (NPV ≈ +$5,6) dan pada 16% faktornya 3,274 (NPV ≈ −$17,7), jadi titik potongnya sedikit di atas 15%: IRR ≈ 15,2%. Metode bagi dua di simulasi melaporkan nilai yang sama.' },
        { q: 'Mengapa kurva NPV selalu menurun untuk proyek yang diizinkan simulasi ini, dan seperti apa bentuknya untuk sebuah pinjaman?', a: 'Satu-satunya arus negatif ada di t = 0, dengan (1 + r)⁰ = 1, sehingga nilai kininya tidak bergantung pada r, sementara setiap kas masuk positif dibagi (1 + r)ᵗ yang semakin besar saat r naik. Pinjaman membalik tandanya: kas masuk hari ini, pembayaran nanti, sehingga NPV-nya naik bersama r, dan peminjam lebih diuntungkan saat tingkat diskonto melebihi IRR pinjaman, yaitu saat ia bisa menghasilkan lebih dari suku bunga itu di tempat lain.' },
      ],
    },
  },
};
