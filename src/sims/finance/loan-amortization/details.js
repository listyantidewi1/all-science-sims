// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the amortization formula M = P · r(1+r)ⁿ / ((1+r)ⁿ−1).',
      'See how early payments are mostly interest.',
      'Compare 15- vs 30-year terms total cost.',
    ],
    id: [
      'Menerapkan rumus amortisasi M = P · r(1+r)ⁿ / ((1+r)ⁿ−1).',
      'Melihat pembayaran awal sebagian besar adalah bunga.',
      'Membandingkan total biaya jangka 15 vs 30 tahun.',
    ],
  },  tryThis: {
    en: [
      '$300k at 6% for 30 years — total interest paid?',
      'Same loan, 15 years — interest savings?',
      'Drop rate to 3% — how much does monthly payment fall?',
    ],
    id: [
      'Rp3 M pada 6% selama 30 tahun — total bunganya berapa?',
      'Pinjaman sama, 15 tahun — penghematan bunganya?',
      'Turunkan ke 3% — seberapa turun angsuran bulanannya?',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An amortizing loan is repaid with the same payment every month until the balance reaches zero. Each payment does two jobs: it first covers the interest that the outstanding balance has earned over the month, and whatever is left reduces the balance itself. Because the interest charge is a fixed fraction of the balance, it is largest at the start, when the balance is largest, and shrinks as the loan is paid down. The monthly payment M that makes the balance hit exactly zero after n payments at monthly rate r = annual rate / 12 is M = P · r(1 + r)^n / ((1 + r)^n − 1).',
        'The simulation computes this payment for the loan amount, annual rate and term you choose, then walks through the schedule month by month. The left chart stacks each month\'s payment as principal (green) below interest (red); the bar height is constant, but the red share melts away over the term. The right chart shows the outstanding balance, which falls slowly at first and quickly at the end. The readout gives the monthly payment, the total interest, and the total paid, and the preset buttons jump to 15-year and 30-year mortgages or a 5-year car loan.',
        'Take the default $300,000 at 6% for 30 years. The payment is about $1799. In month one the interest is $300,000 × 0.005 = $1500, so only $299 goes toward the principal; by the final month almost the whole payment is principal. Over 360 payments the total interest is about $348,000, more than the amount borrowed. Shorten the term to 15 years and the payment rises to about $2532, but total interest falls to about $156,000, because the balance is paid down faster and there is less of it to charge interest on. Cutting the rate from 6% to 3% on the 30-year loan lowers the payment to about $1265 and halves the interest to about $155,000.',
        'The model is the textbook one and leaves out much that real loans include: no fees, insurance, taxes or inflation, no late or extra payments, and a rate that never changes. Real mortgages often allow early repayment, which shortens the schedule, and adjustable-rate loans recompute the payment when the rate moves. The sim is a tool for seeing how rate and term shape the cost of borrowing, not a quote for any actual loan.',
      ],
      id: [
        'Pinjaman beramortisasi dilunasi dengan angsuran yang sama setiap bulan sampai saldonya nol. Setiap angsuran punya dua tugas: pertama menutup bunga yang timbul dari saldo terutang selama sebulan, dan sisanya mengurangi saldo pokok itu sendiri. Karena beban bunga adalah bagian tetap dari saldo, bunga paling besar di awal, saat saldonya paling besar, dan menyusut seiring pinjaman dilunasi. Angsuran bulanan M yang membuat saldo tepat nol setelah n kali bayar dengan suku bunga bulanan r = suku bunga tahunan / 12 adalah M = P · r(1 + r)^n / ((1 + r)^n − 1).',
        'Simulasi ini menghitung angsuran tersebut untuk jumlah pinjaman, suku bunga tahunan, dan jangka waktu yang kamu pilih, lalu menelusuri jadwalnya bulan demi bulan. Grafik kiri menumpuk angsuran tiap bulan sebagai pokok (hijau) di bawah bunga (merah); tinggi batangnya tetap, tetapi porsi merahnya meleleh sepanjang jangka waktu. Grafik kanan menunjukkan saldo terutang, yang turun perlahan di awal dan cepat di akhir. Panel angka memberi angsuran bulanan, total bunga, dan total yang dibayar, dan tombol preset melompat ke KPR 15 tahun, KPR 30 tahun, atau kredit mobil 5 tahun.',
        'Ambil nilai bawaan $300.000 pada 6% selama 30 tahun. Angsurannya sekitar $1799. Pada bulan pertama bunganya $300.000 × 0,005 = $1500, sehingga hanya $299 yang mengurangi pokok; pada bulan terakhir hampir seluruh angsuran adalah pokok. Selama 360 kali bayar total bunganya sekitar $348.000, lebih besar daripada jumlah yang dipinjam. Persingkat jangka waktu menjadi 15 tahun, angsuran naik menjadi sekitar $2532, tetapi total bunga turun menjadi sekitar $156.000, karena saldo dilunasi lebih cepat sehingga lebih sedikit yang dikenai bunga. Menurunkan suku bunga dari 6% ke 3% pada pinjaman 30 tahun menurunkan angsuran menjadi sekitar $1265 dan memangkas bunga separuhnya menjadi sekitar $155.000.',
        'Model ini adalah model buku teks dan mengabaikan banyak hal pada pinjaman sungguhan: tidak ada biaya, asuransi, pajak, atau inflasi, tidak ada keterlambatan atau pembayaran tambahan, dan suku bunga tidak pernah berubah. KPR sungguhan sering membolehkan pelunasan dipercepat, yang memperpendek jadwal, dan pinjaman bersuku bunga mengambang menghitung ulang angsuran saat suku bunga bergerak. Sim ini alat untuk melihat bagaimana suku bunga dan jangka waktu membentuk biaya meminjam, bukan penawaran untuk pinjaman nyata mana pun.',
      ],
    },
    figure: {
      caption: {
        en: 'Every payment on a $300,000, 6%, 30-year loan is the same $1799, but its split changes: at first about $1500 is interest (red) and $299 principal (green); the share flips as the balance falls, and the last payment is almost all principal.',
        id: 'Setiap angsuran pinjaman $300.000, 6%, 30 tahun sama besar, $1799, tetapi pembagiannya berubah: di awal sekitar $1500 adalah bunga (merah) dan $299 pokok (hijau); porsinya berbalik saat saldo turun, dan angsuran terakhir hampir seluruhnya pokok.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('How each loan payment splits between interest and principal over time', 'Pembagian tiap angsuran antara bunga dan pokok sepanjang waktu')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{fill:none;stroke:currentColor;stroke-width:1.4}.m{stroke:currentColor;stroke-width:1;opacity:.4}</style>
  <rect x="50" y="60" width="280" height="150" fill="#ef4444" opacity=".55"/>
  <path d="M50 185.1 C100 180 130 170 143.3 164.7 C170 155 200 140 236.7 127.5 C260 118 300 95 330 60 L330 210 L50 210 Z" fill="#10b981" opacity=".75"/>
  <line x1="50" y1="60" x2="50" y2="210" class="ax"/>
  <line x1="50" y1="210" x2="330" y2="210" class="ax"/>
  <line x1="50" y1="60" x2="330" y2="60" class="m" stroke-dasharray="4 3"/>
  <text x="54" y="54">${L('payment: $1799 every month', 'angsuran: $1799 setiap bulan')}</text>
  <text x="18" y="64">$1799</text>
  <text x="34" y="214">$0</text>
  <text x="46" y="226">0</text><text x="90" y="226">5</text><text x="136" y="226">10</text><text x="183" y="226">15</text><text x="229" y="226">20</text><text x="276" y="226">25</text><text x="320" y="226">30</text>
  <text x="150" y="238" opacity=".7">${L('year of the loan', 'tahun pinjaman')}</text>
  <text x="70" y="110" fill="currentColor" font-weight="bold">${L('interest', 'bunga')}</text>
  <text x="70" y="124" opacity=".85">${L('$1500 in month 1', '$1500 di bulan ke-1')}</text>
  <text x="222" y="178" fill="currentColor" font-weight="bold">${L('principal', 'pokok')}</text>
  <text x="222" y="192" opacity=".85">${L('$299 in month 1', '$299 di bulan ke-1')}</text>
  <line x1="190" y1="60" x2="190" y2="210" class="m" stroke-dasharray="3 3"/>
  <text x="194" y="72" opacity=".8">${L('year 15: 59% interest', 'tahun 15: 59% bunga')}</text>
  <text x="20" y="22" opacity=".8">$300,000 ${L('at', 'pada')} 6%, 30 ${L('years', 'tahun')}: ${L('total interest $348,000', 'total bunga $348.000')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A fixed payment covers that month\'s interest first; only the remainder reduces the balance.',
        'Interest is a fixed fraction of the outstanding balance, so early payments are mostly interest and late payments mostly principal.',
        'The payment formula M = P · r(1 + r)^n / ((1 + r)^n − 1) is chosen so the balance reaches exactly zero at the last payment.',
        'A shorter term means a higher monthly payment but far less total interest, because the balance is reduced sooner.',
        'Total interest can exceed the amount borrowed on a long loan; at 6% over 30 years it does.',
      ],
      id: [
        'Angsuran tetap menutup bunga bulan itu lebih dulu; hanya sisanya yang mengurangi saldo.',
        'Bunga adalah bagian tetap dari saldo terutang, sehingga angsuran awal sebagian besar bunga dan angsuran akhir sebagian besar pokok.',
        'Rumus angsuran M = P · r(1 + r)^n / ((1 + r)^n − 1) dipilih agar saldo tepat nol pada angsuran terakhir.',
        'Jangka waktu lebih pendek berarti angsuran bulanan lebih tinggi tetapi total bunga jauh lebih kecil, karena saldo berkurang lebih cepat.',
        'Total bunga bisa melebihi jumlah yang dipinjam pada pinjaman jangka panjang; pada 6% selama 30 tahun itu terjadi.',
      ],
    },
    vocabulary: {
      en: [
        ['Principal', 'The amount borrowed, or the part of a payment that reduces what is still owed.'],
        ['Interest', 'The charge for borrowing, calculated each month as the monthly rate times the outstanding balance.'],
        ['Amortization', 'Paying off a loan gradually with regular payments that cover interest and reduce the principal.'],
        ['Term (n)', 'The total number of payments; a 30-year monthly loan has n = 360.'],
        ['Outstanding balance', 'What is still owed at a given moment; the right-hand chart in the sim.'],
        ['Amortization schedule', 'The month-by-month table of payment, interest, principal and remaining balance.'],
        ['Annual percentage rate', 'The yearly interest rate quoted for the loan; the sim divides it by 12 to get the monthly rate.'],
      ],
      id: [
        ['Pokok', 'Jumlah yang dipinjam, atau bagian angsuran yang mengurangi sisa utang.'],
        ['Bunga', 'Biaya meminjam, dihitung tiap bulan sebagai suku bunga bulanan dikali saldo terutang.'],
        ['Amortisasi', 'Melunasi pinjaman secara bertahap dengan angsuran rutin yang menutup bunga dan mengurangi pokok.'],
        ['Jangka waktu (n)', 'Jumlah total angsuran; pinjaman bulanan 30 tahun punya n = 360.'],
        ['Saldo terutang', 'Sisa utang pada suatu saat; grafik kanan pada sim.'],
        ['Jadwal amortisasi', 'Tabel bulan demi bulan berisi angsuran, bunga, pokok, dan sisa saldo.'],
        ['Suku bunga tahunan', 'Suku bunga per tahun yang dikutip untuk pinjaman; sim membaginya dengan 12 untuk mendapat suku bunga bulanan.'],
      ],
    },
    misconceptions: {
      en: [
        ['Each payment reduces the balance by the same amount.', 'The payment is constant, but the split is not. Early on most of it is interest, so the balance barely moves; the sim\'s balance curve is nearly flat at first and steep at the end.'],
        ['Halving the term doubles the monthly payment.', 'It raises the payment much less than that. For $300,000 at 6%, 30 years costs $1799 a month and 15 years costs $2532, about 40% more, because far less interest accrues over the shorter term.'],
        ['A 6% loan over 30 years costs 6% of the amount borrowed in interest.', 'The 6% applies every year to whatever is still owed. Over 30 years the total interest on $300,000 is about $348,000, more than the principal itself.'],
        ['Lowering the interest rate by one percentage point saves roughly one percent of the loan.', 'It saves far more. Cutting the rate on $300,000 over 30 years from 6% to 5% reduces total interest from about $348,000 to about $280,000, a saving of roughly $68,000, well over 20% of the loan.'],
      ],
      id: [
        ['Setiap angsuran mengurangi saldo dengan jumlah yang sama.', 'Angsurannya tetap, tetapi pembagiannya tidak. Di awal sebagian besar adalah bunga, sehingga saldo hampir tidak bergerak; kurva saldo di sim hampir datar di awal dan curam di akhir.'],
        ['Memangkas jangka waktu menjadi separuh menggandakan angsuran bulanan.', 'Kenaikannya jauh lebih kecil dari itu. Untuk $300.000 pada 6%, 30 tahun berbiaya $1799 per bulan dan 15 tahun $2532, sekitar 40% lebih tinggi, karena bunga yang timbul jauh lebih sedikit pada jangka waktu yang lebih pendek.'],
        ['Pinjaman 6% selama 30 tahun berbiaya bunga 6% dari jumlah yang dipinjam.', '6% itu dikenakan setiap tahun pada sisa utang. Selama 30 tahun total bunga atas $300.000 sekitar $348.000, lebih besar daripada pokoknya sendiri.'],
        ['Menurunkan suku bunga satu poin persen menghemat sekitar satu persen dari pinjaman.', 'Hematnya jauh lebih besar. Menurunkan suku bunga $300.000 selama 30 tahun dari 6% ke 5% mengurangi total bunga dari sekitar $348.000 menjadi sekitar $280.000, hemat sekitar $68.000, jauh di atas 20% dari pinjaman.'],
      ],
    },
    realWorld: {
      en: [
        'Home mortgages are the classic amortizing loan; the schedule explains why homeowners build equity slowly in the first years.',
        'Car loans and student loans use the same formula over shorter terms, which is why their interest totals are smaller for the same rate.',
        'Making one extra payment that goes entirely to principal shortens the schedule and removes all the future interest that principal would have generated.',
        'Lenders in many countries must disclose the total cost of credit, which is the total interest figure the sim reports.',
      ],
      id: [
        'KPR adalah contoh klasik pinjaman beramortisasi; jadwalnya menjelaskan mengapa pemilik rumah membangun ekuitas dengan lambat pada tahun-tahun pertama.',
        'Kredit mobil dan pinjaman pendidikan memakai rumus yang sama dengan jangka lebih pendek, itulah sebabnya total bunganya lebih kecil untuk suku bunga yang sama.',
        'Satu pembayaran tambahan yang seluruhnya masuk ke pokok memperpendek jadwal dan menghapus semua bunga masa depan yang akan ditimbulkan pokok itu.',
        'Di banyak negara pemberi pinjaman wajib mengungkapkan total biaya kredit, yaitu angka total bunga yang dilaporkan sim.',
      ],
    },
    questions: {
      en: [
        { q: 'For a $200,000 loan at 5% over 30 years, compute the monthly payment and the total interest.', a: 'r = 0.05/12 ≈ 0.004167 and n = 360, so (1 + r)^n ≈ 4.468 and M = 200,000 × 0.004167 × 4.468 / 3.468 ≈ $1074. Total paid is 360 × $1074 ≈ $386,500, so total interest is about $186,500.' },
        { q: 'In the first month of the default $300,000 loan at 6%, how much of the $1799 payment is interest and how much is principal? What about the second month?', a: 'Month 1: interest = 300,000 × 0.005 = $1500, principal = $299, leaving $299,701. Month 2: interest = 299,701 × 0.005 ≈ $1498.50, so principal is about $300.15. The principal share creeps up by about $1.50 a month at first and accelerates later.' },
        { q: 'Why does the balance curve on the right fall slowly at first and quickly at the end, even though the payment never changes?', a: 'Because the payment first covers interest, which is proportional to the balance. When the balance is large, interest eats most of the payment and little is left to reduce the balance. As the balance shrinks, so does the interest, so more of each payment goes to principal, and the curve steepens.' },
      ],
      id: [
        { q: 'Untuk pinjaman $200.000 pada 5% selama 30 tahun, hitung angsuran bulanan dan total bunganya.', a: 'r = 0,05/12 ≈ 0,004167 dan n = 360, sehingga (1 + r)^n ≈ 4,468 dan M = 200.000 × 0,004167 × 4,468 / 3,468 ≈ $1074. Total yang dibayar 360 × $1074 ≈ $386.500, jadi total bunganya sekitar $186.500.' },
        { q: 'Pada bulan pertama pinjaman bawaan $300.000 pada 6%, berapa dari angsuran $1799 yang menjadi bunga dan berapa yang menjadi pokok? Bagaimana pada bulan kedua?', a: 'Bulan 1: bunga = 300.000 × 0,005 = $1500, pokok = $299, sisa $299.701. Bulan 2: bunga = 299.701 × 0,005 ≈ $1498,50, sehingga pokoknya sekitar $300,15. Porsi pokok merambat naik sekitar $1,50 per bulan di awal dan makin cepat belakangan.' },
        { q: 'Mengapa kurva saldo di kanan turun perlahan di awal dan cepat di akhir, padahal angsurannya tidak pernah berubah?', a: 'Karena angsuran lebih dulu menutup bunga, yang sebanding dengan saldo. Saat saldo besar, bunga menghabiskan sebagian besar angsuran dan hanya sedikit yang tersisa untuk mengurangi saldo. Saat saldo menyusut, bunganya juga menyusut, sehingga lebih banyak dari tiap angsuran masuk ke pokok, dan kurvanya makin curam.'},
      ],
    },
  },
};
