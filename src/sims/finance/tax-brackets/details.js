// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish marginal from effective tax rate.',
      'Compute total tax as sum across bracket slices.',
      'See why "moving into a higher bracket" never reduces take-home.',
    ],
    id: [
      'Membedakan tarif marginal dan tarif efektif.',
      'Menghitung total pajak sebagai jumlah irisan tiap bracket.',
      'Melihat mengapa "naik ke bracket lebih tinggi" tidak pernah mengurangi pendapatan bersih.',
    ],
  },
  tryThis: {
    en: [
      'Income $50k under US 2024 brackets — what is the effective rate?',
      'Bump to $100k — does each dollar above $47k get taxed at 22%?',
      "Compare US to a flat 20% — at what income do they match?",
    ],
    id: [
      'Pendapatan Rp50jt pada tarif Indonesia — berapa tarif efektifnya?',
      'Naikkan ke Rp250jt — apakah tiap Rp di atas Rp250jt kena 25%?',
      'Bandingkan dengan tarif tunggal 20% — pada pendapatan berapa keduanya sama?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Most countries tax income progressively: the rate goes up in steps as income rises. The steps are called brackets, and the key rule is that a bracket\'s rate applies only to the slice of income that falls inside that bracket, not to the whole income. Think of income as water poured into a stack of buckets. The first bucket fills at the lowest rate; only when it is full does the overflow start filling the next bucket at the next rate. Your total tax is the sum of what is taken from each bucket.',
        'The simulation shows this slicing directly. The coloured strip at the top is the schedule: each band is one bracket with its rate and upper limit, and the white marker is your income. Below it, your income is cut into slices, one per bracket you reach, and the coloured part of each slice is the tax taken from it. The bottom line reports three numbers. Total tax is the sum of the slices. The effective rate is total tax divided by income, your average rate. The marginal rate is the rate of the bracket your last unit of income lands in, so it tells you how much of the next dollar you would keep.',
        'The schedule menu lets you switch between the United States 2024 single-filer schedule (seven brackets from 10% to 37%), Indonesia\'s 2024 schedule (five brackets from 5% to 35%), and a flat 20% tax with a single bracket. The income slider moves the marker across the strip; its range and currency follow the schedule, up to $1,000,000 for the dollar schedules and Rp2 billion for Indonesia. Watch what happens when the marker crosses a bracket boundary: the marginal rate jumps, but total tax and the effective rate change smoothly, because only the income above the boundary is charged at the new rate. That is why a raise can never leave you with less take-home pay under a schedule like this.',
        'The model is a simplification. Real tax systems first subtract allowances and deductions, such as Indonesia\'s non-taxable income (PTKP) or the US standard deduction, and only then apply the brackets to the remaining taxable income; the sim applies the brackets to the whole income. It also ignores tax credits, social-security contributions, local taxes and different filing statuses, and bracket limits are adjusted most years. The sim\'s income slider is in a single unit, so for the Indonesian schedule it does not reach beyond the first bracket; the structure of the calculation is the same, only the numbers are larger.',
      ],
      id: [
        'Kebanyakan negara memajaki penghasilan secara progresif: tarifnya naik bertahap seiring penghasilan bertambah. Tahap-tahap itu disebut lapisan atau bracket, dan aturan kuncinya adalah tarif suatu lapisan hanya berlaku untuk irisan penghasilan yang berada di dalam lapisan itu, bukan untuk seluruh penghasilan. Bayangkan penghasilan sebagai air yang dituang ke tumpukan ember. Ember pertama terisi dengan tarif terendah; hanya setelah penuh, luapannya mulai mengisi ember berikutnya dengan tarif berikutnya. Total pajakmu adalah jumlah yang diambil dari setiap ember.',
        'Simulasi ini menunjukkan pengirisan itu secara langsung. Pita berwarna di atas adalah jadwal tarif: tiap pita adalah satu lapisan dengan tarif dan batas atasnya, dan penanda putih adalah penghasilanmu. Di bawahnya, penghasilanmu dipotong menjadi irisan, satu untuk setiap lapisan yang tercapai, dan bagian berwarna dari tiap irisan adalah pajak yang diambil darinya. Baris paling bawah melaporkan tiga angka. Total pajak adalah jumlah semua irisan. Tarif efektif adalah total pajak dibagi penghasilan, yaitu tarif rata-ratamu. Tarif marginal adalah tarif lapisan tempat satuan penghasilan terakhirmu jatuh, sehingga memberi tahu berapa dari rupiah berikutnya yang akan kamu simpan.',
        'Menu jadwal memungkinkan kamu berpindah antara jadwal Amerika Serikat 2024 untuk wajib pajak tunggal (tujuh lapisan dari 10% sampai 37%), jadwal Indonesia 2024 (lima lapisan dari 5% sampai 35%), dan pajak tunggal 20% dengan satu lapisan saja. Slider penghasilan menggeser penanda sepanjang pita; rentang dan mata uangnya mengikuti jadwal, sampai $1.000.000 untuk jadwal dolar dan Rp2 miliar untuk Indonesia. Perhatikan saat penanda melewati batas lapisan: tarif marginal melompat, tetapi total pajak dan tarif efektif berubah mulus, karena hanya penghasilan di atas batas yang dikenai tarif baru. Itulah sebabnya kenaikan gaji tidak pernah membuat pendapatan bersihmu berkurang pada jadwal seperti ini.',
        'Modelnya adalah penyederhanaan. Sistem pajak sungguhan terlebih dahulu mengurangkan pengurang dan penghasilan tidak kena pajak, seperti PTKP di Indonesia atau standard deduction di AS, lalu baru menerapkan lapisan pada sisa penghasilan kena pajak; simulasi ini menerapkan lapisan pada seluruh penghasilan. Ia juga mengabaikan kredit pajak, iuran jaminan sosial, pajak daerah, dan perbedaan status wajib pajak, dan batas lapisan disesuaikan hampir setiap tahun. Slider penghasilan memakai satu satuan angka, sehingga untuk jadwal Indonesia ia tidak mencapai lapisan di atas yang pertama; struktur perhitungannya tetap sama, hanya angkanya yang lebih besar.',
      ],
    },
    figure: {
      caption: {
        en: 'A three-bracket schedule (10%, 20%, 30%). The staircase is the marginal rate; the shaded blocks are the tax from each slice of an income at the dashed marker. The smooth curve is the effective rate, which always stays below the current step.',
        id: 'Jadwal tiga lapisan (10%, 20%, 30%). Tangga menunjukkan tarif marginal; balok berwarna adalah pajak dari tiap irisan penghasilan pada penanda putus-putus. Kurva mulus adalah tarif efektif, yang selalu berada di bawah anak tangga saat ini.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Marginal-rate staircase and effective-rate curve', 'Tangga tarif marginal dan kurva tarif efektif')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.s{font-size:10px;opacity:.75}.st{fill:none;stroke-width:2.4}</style>
  <line x1="50" y1="30" x2="50" y2="200" class="ax"/>
  <line x1="50" y1="200" x2="330" y2="200" class="ax"/>
  <rect x="50" y="160" width="84" height="40" fill="#10b981" opacity=".35"/>
  <rect x="134" y="120" width="112" height="80" fill="#f59e0b" opacity=".35"/>
  <rect x="246" y="80" width="42" height="120" fill="#ef4444" opacity=".35"/>
  <path d="M50 160 H134 V120 H246 V80 H330" class="st" stroke="#3b82f6"/>
  <path d="M50 160 L134 160 L162 150 L190 144 L218 140 L246 137 L288 127 L330 120" class="st" stroke="#8b5cf6" stroke-dasharray="5 3"/>
  <line x1="288" y1="60" x2="288" y2="200" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".7"/>
  <text x="256" y="54" class="s">${L('your income', 'penghasilanmu')}</text>
  <text x="26" y="164" class="s">10%</text>
  <text x="26" y="124" class="s">20%</text>
  <text x="26" y="84" class="s">30%</text>
  <text x="58" y="156" class="s">${L('slice 1 × 10%', 'irisan 1 × 10%')}</text>
  <text x="140" y="116" class="s">${L('slice 2 × 20%', 'irisan 2 × 20%')}</text>
  <text x="250" y="76" class="s">${L('slice 3', 'irisan 3')}</text>
  <text x="250" y="88" class="s">× 30%</text>
  <text x="160" y="42" fill="#3b82f6">${L('marginal rate (steps)', 'tarif marginal (tangga)')}</text>
  <text x="150" y="176" fill="#8b5cf6">${L('effective rate = total tax / income', 'tarif efektif = total pajak / penghasilan')}</text>
  <text x="124" y="214" class="s">${L('limit 1', 'batas 1')}</text>
  <text x="236" y="214" class="s">${L('limit 2', 'batas 2')}</text>
  <text x="250" y="232" class="s">${L('income', 'penghasilan')} →</text>
  <text x="54" y="26" class="s">${L('tax rate', 'tarif pajak')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In a progressive schedule each bracket\'s rate applies only to the slice of income inside that bracket.',
        'Total tax is the sum of slice × rate over every bracket you reach.',
        'The marginal rate is the rate on your next unit of income; the effective rate is total tax divided by income.',
        'The effective rate is always at or below the marginal rate, and it rises smoothly even though the marginal rate jumps.',
        'Crossing into a higher bracket never reduces take-home pay, because only the extra income is taxed at the higher rate.',
      ],
      id: [
        'Pada jadwal progresif, tarif tiap lapisan hanya berlaku untuk irisan penghasilan di dalam lapisan itu.',
        'Total pajak adalah jumlah irisan × tarif untuk setiap lapisan yang tercapai.',
        'Tarif marginal adalah tarif untuk satuan penghasilan berikutnya; tarif efektif adalah total pajak dibagi penghasilan.',
        'Tarif efektif selalu sama dengan atau di bawah tarif marginal, dan naik mulus walaupun tarif marginal melompat.',
        'Masuk ke lapisan lebih tinggi tidak pernah mengurangi pendapatan bersih, karena hanya tambahan penghasilan yang dikenai tarif lebih tinggi.',
      ],
    },
    vocabulary: {
      en: [
        ['Progressive tax', 'A tax whose rate rises as income rises, so higher earners pay a larger share of their income.'],
        ['Tax bracket', 'A range of income taxed at one rate; the schedule is the full list of brackets and rates.'],
        ['Marginal rate', 'The rate charged on the last (or next) unit of income, set by the bracket that unit falls in.'],
        ['Effective rate', 'Total tax divided by total income: the average rate actually paid.'],
        ['Taxable income', 'Income after allowances and deductions, which is what real schedules are applied to.'],
        ['Take-home pay', 'Income minus tax, the amount you actually keep.'],
        ['Flat tax', 'A schedule with a single rate for all income, so marginal and effective rates are equal.'],
        ['Non-taxable allowance', 'An amount of income exempt from tax before the brackets apply, such as Indonesia\'s PTKP.'],
      ],
      id: [
        ['Pajak progresif', 'Pajak yang tarifnya naik seiring penghasilan naik, sehingga yang berpenghasilan lebih tinggi membayar bagian lebih besar dari penghasilannya.'],
        ['Lapisan (bracket) pajak', 'Rentang penghasilan yang dikenai satu tarif; jadwal tarif adalah daftar lengkap lapisan dan tarifnya.'],
        ['Tarif marginal', 'Tarif yang dikenakan pada satuan penghasilan terakhir (atau berikutnya), ditentukan oleh lapisan tempat satuan itu jatuh.'],
        ['Tarif efektif', 'Total pajak dibagi total penghasilan: tarif rata-rata yang sebenarnya dibayar.'],
        ['Penghasilan kena pajak', 'Penghasilan setelah pengurang dan penghasilan tidak kena pajak, yang menjadi dasar penerapan lapisan pada sistem sungguhan.'],
        ['Pendapatan bersih', 'Penghasilan dikurangi pajak, jumlah yang benar-benar kamu terima.'],
        ['Pajak tunggal (flat)', 'Jadwal dengan satu tarif untuk semua penghasilan, sehingga tarif marginal dan efektif sama.'],
        ['Penghasilan tidak kena pajak', 'Bagian penghasilan yang dibebaskan dari pajak sebelum lapisan diterapkan, misalnya PTKP di Indonesia.'],
      ],
    },
    misconceptions: {
      en: [
        ['A raise that pushes me into a higher bracket could leave me with less money.', 'Impossible under a bracket system. Only the income above the boundary is taxed at the new rate, so each extra dollar still adds something to take-home pay. Slide the income across a boundary and watch take-home keep rising.'],
        ['Being in the 22% bracket means 22% of my income goes to tax.', 'Only the slice inside that bracket is taxed at 22%; the slices below are taxed at 10% and 12%. For $50,000 the effective rate is about 12%, far below the 22% marginal rate.'],
        ['The effective rate can end up higher than the marginal rate.', 'It cannot in a progressive schedule. The effective rate is a weighted average of the rates on all your slices, and every one of those is at or below your top (marginal) rate.'],
        ['A flat tax means everyone pays the same amount.', 'It means everyone pays the same percentage. Someone earning twice as much pays twice as much tax; the amounts differ, the rate does not.'],
      ],
      id: [
        ['Kenaikan gaji yang mendorongku ke lapisan lebih tinggi bisa membuat uangku berkurang.', 'Tidak mungkin pada sistem lapisan. Hanya penghasilan di atas batas yang dikenai tarif baru, sehingga setiap rupiah tambahan tetap menambah pendapatan bersih. Geser penghasilan melewati batas lapisan dan lihat pendapatan bersih terus naik.'],
        ['Berada di lapisan 25% berarti 25% penghasilanku masuk ke pajak.', 'Hanya irisan di dalam lapisan itu yang dikenai 25%; irisan di bawahnya dikenai 5% dan 15%. Tarif efektifnya selalu jauh lebih rendah daripada tarif marginal tertinggi yang dicapai.'],
        ['Tarif efektif bisa lebih tinggi daripada tarif marginal.', 'Tidak bisa pada jadwal progresif. Tarif efektif adalah rata-rata berbobot dari tarif semua irisanmu, dan setiap irisan itu tarifnya sama dengan atau di bawah tarif tertinggi (marginal) yang kamu capai.'],
        ['Pajak tunggal berarti semua orang membayar jumlah yang sama.', 'Artinya semua orang membayar persentase yang sama. Orang yang berpenghasilan dua kali lipat membayar pajak dua kali lipat; jumlahnya berbeda, tarifnya tidak.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesia\'s personal income tax (PPh 21) uses the five brackets in the sim: 5% up to Rp60 million, 15% to Rp250 million, 25% to Rp500 million, 30% to Rp5 billion and 35% above, applied after the PTKP allowance is subtracted.',
        'The US federal income tax has seven brackets; the limits shown are for a single filer in 2024 and are adjusted for inflation each year.',
        'Employers usually withhold an estimate of the year\'s tax from each payslip, so the slicing happens month by month even though the brackets are defined per year.',
        'Some countries, such as Estonia, use a single flat rate on income, which is exactly the sim\'s one-bracket schedule: marginal and effective rates are identical.',
      ],
      id: [
        'Pajak penghasilan orang pribadi di Indonesia (PPh 21) memakai lima lapisan seperti di simulasi: 5% sampai Rp60 juta, 15% sampai Rp250 juta, 25% sampai Rp500 juta, 30% sampai Rp5 miliar, dan 35% di atasnya, diterapkan setelah PTKP dikurangkan.',
        'Pajak penghasilan federal AS memiliki tujuh lapisan; batas yang ditampilkan adalah untuk wajib pajak tunggal tahun 2024 dan disesuaikan terhadap inflasi setiap tahun.',
        'Pemberi kerja biasanya memotong taksiran pajak setahun dari setiap slip gaji, sehingga pengirisan terjadi bulan demi bulan walaupun lapisan ditetapkan per tahun.',
        'Beberapa negara, misalnya Estonia, memakai satu tarif tunggal untuk penghasilan, persis seperti jadwal satu lapisan di simulasi: tarif marginal dan efektifnya sama.',
      ],
    },
    questions: {
      en: [
        { q: 'Under the US 2024 schedule, how much tax does an income of $50,000 pay, and what are the marginal and effective rates?', a: 'Slices: $11,600 × 10% = $1,160; ($47,150 − $11,600) × 12% = $4,266; ($50,000 − $47,150) × 22% = $627. Total $6,053. The marginal rate is 22% (the bracket the last dollar is in) but the effective rate is 6,053 / 50,000 ≈ 12.1%.' },
        { q: 'Your income rises from $47,000 to $48,000, crossing the 12%/22% boundary at $47,150. How much of the $1,000 raise do you keep?', a: 'The first $150 of the raise is taxed at 12% ($18) and the remaining $850 at 22% ($187), so tax rises by $205 and take-home rises by $795. Crossing the boundary only changed the rate on the part above it.' },
        { q: 'At what income does the US 2024 schedule charge the same total tax as a flat 20%?', a: 'Tax at the top of the 22% bracket ($100,525) is about $17,169, an effective rate of 17.1%, so the match lies in the 24% bracket. Solve 17,169 + 0.24 × (I − 100,525) = 0.20 × I, giving I ≈ $174,000. Below that the progressive schedule charges less than the flat tax; above it, more.' },
      ],
      id: [
        { q: 'Pada jadwal AS 2024, berapa pajak untuk penghasilan $50.000, dan berapa tarif marginal serta efektifnya?', a: 'Irisan: $11.600 × 10% = $1.160; ($47.150 − $11.600) × 12% = $4.266; ($50.000 − $47.150) × 22% = $627. Total $6.053. Tarif marginalnya 22% (lapisan tempat dolar terakhir berada), tetapi tarif efektifnya 6.053 / 50.000 ≈ 12,1%.' },
        { q: 'Penghasilanmu naik dari $47.000 ke $48.000, melewati batas 12%/22% di $47.150. Berapa dari kenaikan $1.000 itu yang kamu simpan?', a: '$150 pertama dari kenaikan dikenai 12% ($18) dan sisa $850 dikenai 22% ($187), sehingga pajak naik $205 dan pendapatan bersih naik $795. Melewati batas hanya mengubah tarif untuk bagian di atasnya.' },
        { q: 'Pada penghasilan berapa jadwal AS 2024 memungut total pajak yang sama dengan pajak tunggal 20%?', a: 'Pajak di puncak lapisan 22% ($100.525) sekitar $17.169, tarif efektif 17,1%, jadi titik temunya ada di lapisan 24%. Selesaikan 17.169 + 0,24 × (I − 100.525) = 0,20 × I, diperoleh I ≈ $174.000. Di bawah itu jadwal progresif memungut lebih sedikit daripada pajak tunggal; di atasnya, lebih banyak.' },
      ],
    },
  },
};
