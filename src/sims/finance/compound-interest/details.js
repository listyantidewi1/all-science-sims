// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply A = P(1 + r/n)^(nt) for compound interest.',
      'Compare simple vs compound growth over decades.',
      'See the effect of monthly contributions on long-term wealth.',
    ],
    id: [
      'Menerapkan A = P(1 + r/n)^(nt) untuk bunga majemuk.',
      'Membandingkan pertumbuhan bunga sederhana vs majemuk selama puluhan tahun.',
      'Melihat efek kontribusi bulanan terhadap kekayaan jangka panjang.',
    ],
  },  tryThis: {
    en: [
      '$1000 at 7% for 30 years — what does it grow to?',
      'Add $200/month — does it dwarf the principal?',
      'Compare 5% vs 10% over 40 years — feel the exponential.',
    ],
    id: [
      'Rp1.000.000 pada 7% selama 30 tahun — menjadi berapa?',
      'Tambah Rp200.000/bulan — apakah jauh lebih besar dari modal awal?',
      'Bandingkan 5% vs 10% selama 40 tahun — rasakan eksponensialnya.',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Interest is the price of using money over time. With simple interest the amount earned each year is fixed: a principal P at annual rate r earns P·r every year, so after t years the balance is P·(1 + r·t), a straight line. With compound interest the interest earned is added to the balance, and the next period\'s interest is calculated on the new, larger balance. Interest earns interest, and the balance follows a curve that bends upward: compounded once a year it is P·(1 + r)^t, and compounded monthly, as in this sim, it is P·(1 + r/12)^(12t).',
        'The simulation starts with a principal P and applies one twelfth of the annual rate every month, then adds the monthly contribution. The yellow curve is the compound balance, the pink line is what simple interest on the same deposits would give, and the grey line is just the money you put in. The sliders set the principal, the annual rate (0 to 20%), the number of years, and the monthly contribution; the three preset buttons only change the rate. Hover over the chart to read all three values at any year. The lab panel records the final values so you can compare runs.',
        'Two things make the curve steep. The first is time: because each year\'s growth is a fixed percentage of an ever-larger balance, the last ten years of a forty-year run add far more than the first ten. A handy estimate is the rule of 72: money doubles roughly every 72 divided by the rate in percent, so about every 12 years at 6% and every 9 years at 8%. The second is the rate itself: over 30 years, $1000 grows to about $3300 at 4% but to about $8100 at 7% with monthly compounding, and the gap between the yellow and pink curves is exactly the "interest on interest".',
        'The sim is deliberately simple. The rate never changes, there are no fees, taxes or inflation, contributions are made at the end of every month without fail, and compounding is always monthly even though the objective formula allows n periods per year. The simple-interest comparison treats each monthly deposit as earning simple interest from the month it is made. Real savings accounts, bonds and funds have rates that move, and their past returns do not promise future ones, so the preset labels are illustrations of different rates, not forecasts.',
      ],
      id: [
        'Bunga adalah harga penggunaan uang selama suatu waktu. Pada bunga sederhana, jumlah yang diperoleh setiap tahun tetap: modal P dengan suku bunga tahunan r menghasilkan P·r setiap tahun, sehingga setelah t tahun saldonya P·(1 + r·t), sebuah garis lurus. Pada bunga majemuk, bunga yang diperoleh ditambahkan ke saldo, dan bunga periode berikutnya dihitung dari saldo baru yang lebih besar. Bunga menghasilkan bunga, dan saldo mengikuti kurva yang melengkung ke atas: jika dimajemukkan sekali setahun saldonya P·(1 + r)^t, dan jika dimajemukkan bulanan, seperti dalam sim ini, saldonya P·(1 + r/12)^(12t).',
        'Simulasi ini mulai dari modal P dan menerapkan seperdua belas suku bunga tahunan setiap bulan, lalu menambahkan setoran bulanan. Kurva kuning adalah saldo bunga majemuk, garis merah muda adalah hasil bunga sederhana atas setoran yang sama, dan garis abu-abu hanyalah uang yang kamu setorkan. Slider mengatur modal, suku bunga tahunan (0 sampai 20%), jumlah tahun, dan setoran bulanan; tiga tombol preset hanya mengubah suku bunga. Arahkan kursor ke grafik untuk membaca ketiga nilai pada tahun mana pun. Panel lab mencatat nilai akhir agar kamu bisa membandingkan beberapa percobaan.',
        'Dua hal membuat kurva itu curam. Pertama, waktu: karena pertumbuhan tiap tahun adalah persentase tetap dari saldo yang terus membesar, sepuluh tahun terakhir dari 40 tahun menambah jauh lebih banyak daripada sepuluh tahun pertama. Taksiran praktisnya adalah aturan 72: uang berlipat dua kira-kira setiap 72 dibagi suku bunga dalam persen, jadi sekitar tiap 12 tahun pada 6% dan tiap 9 tahun pada 8%. Kedua, suku bunganya sendiri: selama 30 tahun, $1000 tumbuh menjadi sekitar $3300 pada 4% tetapi sekitar $8100 pada 7% dengan pemajemukan bulanan, dan jarak antara kurva kuning dan merah muda itulah "bunga atas bunga".',
        'Sim ini sengaja dibuat sederhana. Suku bunga tidak pernah berubah, tidak ada biaya, pajak, atau inflasi, setoran dilakukan di akhir setiap bulan tanpa pernah terlewat, dan pemajemukan selalu bulanan walaupun rumus di tujuan pembelajaran membolehkan n periode per tahun. Pembanding bunga sederhana menganggap tiap setoran bulanan memperoleh bunga sederhana sejak bulan setoran. Tabungan, obligasi, dan reksa dana sungguhan punya suku bunga yang berubah, dan imbal hasil masa lalu tidak menjanjikan masa depan, sehingga label preset hanyalah ilustrasi suku bunga yang berbeda, bukan ramalan.',
      ],
    },
    figure: {
      caption: {
        en: '$1000 at 7% for 30 years. The grey line is the money deposited, the red line is simple interest (a straight line to $3100), and the green curve is monthly compounding (about $8100). The widening gap is interest earned on earlier interest.',
        id: '$1000 pada 7% selama 30 tahun. Garis abu-abu adalah uang yang disetor, garis merah adalah bunga sederhana (garis lurus menuju $3100), dan kurva hijau adalah pemajemukan bulanan (sekitar $8100). Jarak yang makin lebar adalah bunga yang diperoleh atas bunga sebelumnya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Compound growth curve compared with simple interest', 'Kurva pertumbuhan majemuk dibandingkan bunga sederhana')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}.ax{fill:none;stroke:currentColor;stroke-width:1.4}.l{fill:none;stroke-width:2.4}</style>
  <line x1="50" y1="30" x2="50" y2="210" class="ax"/>
  <line x1="50" y1="210" x2="330" y2="210" class="ax"/>
  <line x1="50" y1="167.6" x2="330" y2="167.6" class="m"/><text x="18" y="171">$2k</text>
  <line x1="50" y1="125.2" x2="330" y2="125.2" class="m"/><text x="18" y="129">$4k</text>
  <line x1="50" y1="82.8" x2="330" y2="82.8" class="m"/><text x="18" y="86">$6k</text>
  <line x1="50" y1="40.4" x2="330" y2="40.4" class="m"/><text x="18" y="44">$8k</text>
  <text x="46" y="226">0</text><text x="136" y="226">10</text><text x="229" y="226">20</text><text x="320" y="226">30</text>
  <text x="150" y="238" opacity=".7">${L('years', 'tahun')}</text>
  <line x1="50" y1="188.8" x2="330" y2="188.8" stroke="currentColor" stroke-width="2" opacity=".5"/>
  <text x="60" y="202" opacity=".7">${L('deposited: $1000', 'disetor: $1000')}</text>
  <line x1="50" y1="188.8" x2="330" y2="144.3" class="l" stroke="#ef4444"/>
  <text x="236" y="160" fill="#ef4444">${L('simple: $3100', 'sederhana: $3100')}</text>
  <path d="M50 188.8 L96.7 180 L143.3 167.4 L190 149.6 L236.7 124.4 L283.3 88.6 L330 38" class="l" stroke="#10b981"/>
  <text x="196" y="46" fill="#10b981">${L('compound: $8100', 'majemuk: $8100')}</text>
  <line x1="322" y1="42" x2="322" y2="140" stroke="#f59e0b" stroke-width="1.6" marker-start="url(#a)" marker-end="url(#a)"/>
  <text x="238" y="100" fill="#f59e0b">${L('interest on', 'bunga atas')}</text>
  <text x="238" y="113" fill="#f59e0b">${L('interest', 'bunga')}</text>
  <text x="60" y="24" opacity=".8">${L('$1000 at 7%, compounded monthly', '$1000 pada 7%, majemuk bulanan')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse"><path d="M1 1 L4 4 L1 7" fill="none" stroke="#f59e0b" stroke-width="1.4"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Simple interest grows in a straight line; compound interest grows along an upward-bending curve because interest is earned on interest.',
        'With monthly compounding the balance after t years is P·(1 + r/12)^(12t); the exponent is where the power of time comes from.',
        'Doubling time is roughly 72 divided by the rate in percent, so small differences in rate become large differences over decades.',
        'Regular contributions matter most when they start early, because the earliest deposits compound for the longest.',
        'The gap between the compound and simple curves is the interest earned on earlier interest, and it widens every year.',
      ],
      id: [
        'Bunga sederhana tumbuh mengikuti garis lurus; bunga majemuk tumbuh mengikuti kurva yang melengkung ke atas karena bunga menghasilkan bunga.',
        'Dengan pemajemukan bulanan, saldo setelah t tahun adalah P·(1 + r/12)^(12t); eksponen itulah sumber kekuatan waktu.',
        'Waktu berlipat dua kira-kira 72 dibagi suku bunga dalam persen, sehingga selisih kecil pada suku bunga menjadi selisih besar setelah puluhan tahun.',
        'Setoran rutin paling berpengaruh jika dimulai lebih awal, karena setoran paling awal dimajemukkan paling lama.',
        'Jarak antara kurva majemuk dan kurva sederhana adalah bunga yang diperoleh atas bunga sebelumnya, dan jarak itu melebar setiap tahun.',
      ],
    },
    vocabulary: {
      en: [
        ['Principal (P)', 'The original amount of money deposited or borrowed, before any interest.'],
        ['Interest rate (r)', 'The fraction of the balance paid as interest per year, e.g. 0.07 for 7%.'],
        ['Simple interest', 'Interest calculated only on the original principal, so the same amount is added every period.'],
        ['Compound interest', 'Interest calculated on the current balance including earlier interest, so the amount added grows each period.'],
        ['Compounding period', 'How often interest is added to the balance: yearly, monthly, daily. This sim compounds monthly.'],
        ['Exponential growth', 'Growth by a fixed percentage per period, so the balance is multiplied by the same factor each time; its graph curves upward.'],
        ['Rule of 72', 'A quick estimate: doubling time in years is about 72 divided by the interest rate in percent.'],
      ],
      id: [
        ['Modal / pokok (P)', 'Jumlah uang awal yang disetor atau dipinjam, sebelum ada bunga.'],
        ['Suku bunga (r)', 'Bagian dari saldo yang dibayarkan sebagai bunga per tahun, misalnya 0,07 untuk 7%.'],
        ['Bunga sederhana', 'Bunga yang dihitung hanya dari modal awal, sehingga jumlah yang ditambahkan setiap periode sama.'],
        ['Bunga majemuk', 'Bunga yang dihitung dari saldo saat ini termasuk bunga sebelumnya, sehingga jumlah yang ditambahkan bertambah tiap periode.'],
        ['Periode pemajemukan', 'Seberapa sering bunga ditambahkan ke saldo: tahunan, bulanan, harian. Sim ini memajemukkan bulanan.'],
        ['Pertumbuhan eksponensial', 'Pertumbuhan dengan persentase tetap per periode, sehingga saldo dikalikan faktor yang sama setiap kali; grafiknya melengkung ke atas.'],
        ['Aturan 72', 'Taksiran cepat: waktu berlipat dua dalam tahun kira-kira 72 dibagi suku bunga dalam persen.'],
      ],
    },
    misconceptions: {
      en: [
        ['Doubling the rate doubles the final amount.', 'It does far more than that over long periods. Over 30 years with monthly compounding, $1000 becomes about $3300 at 4% but about $11,000 at 8%, more than three times as much, because the rate sits in the exponent.'],
        ['Doubling the time doubles the final amount.', 'Only for simple interest. With compounding, 20 years at 7% turns $1000 into about $4000, and 40 years into about $16,000: doubling the time squares the growth factor.'],
        ['Small monthly contributions hardly matter compared with a big starting amount.', 'Over long periods they dominate. In the sim, $0 principal with $100 a month at 7% for 30 years grows to about $122,000 from $36,000 contributed; most of the final balance is interest.'],
        ['A higher advertised rate always means more money.', 'Only if the compounding period and fees are the same. A rate compounded monthly yields a little more than the same rate compounded yearly, and fees or inflation, which the sim ignores, can erase the difference.'],
      ],
      id: [
        ['Menggandakan suku bunga menggandakan jumlah akhir.', 'Pengaruhnya jauh lebih besar dalam jangka panjang. Selama 30 tahun dengan pemajemukan bulanan, $1000 menjadi sekitar $3300 pada 4% tetapi sekitar $11.000 pada 8%, lebih dari tiga kali lipat, karena suku bunga berada di eksponen.'],
        ['Menggandakan waktu menggandakan jumlah akhir.', 'Itu hanya berlaku untuk bunga sederhana. Dengan pemajemukan, 20 tahun pada 7% mengubah $1000 menjadi sekitar $4000, dan 40 tahun menjadi sekitar $16.000: menggandakan waktu mengkuadratkan faktor pertumbuhannya.'],
        ['Setoran bulanan kecil hampir tidak berarti dibandingkan modal awal yang besar.', 'Dalam jangka panjang justru setoran itu yang dominan. Di sim, modal $0 dengan $100 per bulan pada 7% selama 30 tahun tumbuh menjadi sekitar $122.000 dari $36.000 yang disetor; sebagian besar saldo akhir adalah bunga.'],
        ['Suku bunga yang diiklankan lebih tinggi selalu berarti uang lebih banyak.', 'Hanya jika periode pemajemukan dan biayanya sama. Suku bunga yang dimajemukkan bulanan menghasilkan sedikit lebih banyak daripada suku bunga yang sama dimajemukkan tahunan, dan biaya atau inflasi, yang diabaikan sim, bisa menghapus selisihnya.'],
      ],
    },
    realWorld: {
      en: [
        'Savings accounts and time deposits credit interest monthly or quarterly, and the credited interest then earns interest itself.',
        'Credit-card debt compounds the same way in reverse: unpaid interest is added to the balance and charged interest the next month.',
        'Population growth, the spread of an epidemic and the growth of a bacterial culture follow the same exponential pattern as a compounding balance.',
        'Inflation compounds too: prices rising 3% a year do not add 30% in ten years but about 34%, and roughly double in 24 years.',
      ],
      id: [
        'Rekening tabungan dan deposito mengkreditkan bunga bulanan atau triwulanan, dan bunga yang dikreditkan itu lalu menghasilkan bunga juga.',
        'Utang kartu kredit memajemuk dengan cara yang sama tetapi terbalik: bunga yang tidak dibayar ditambahkan ke saldo dan dikenai bunga lagi bulan berikutnya.',
        'Pertumbuhan penduduk, penyebaran wabah, dan pertumbuhan biakan bakteri mengikuti pola eksponensial yang sama dengan saldo yang dimajemukkan.',
        'Inflasi juga memajemuk: harga yang naik 3% per tahun tidak bertambah 30% dalam sepuluh tahun melainkan sekitar 34%, dan kira-kira berlipat dua dalam 24 tahun.',
      ],
    },
    questions: {
      en: [
        { q: 'Using the rule of 72, roughly how long does money take to double at 6%? Check the estimate with the sim\'s formula.', a: 'About 72 / 6 = 12 years. The formula gives (1 + 0.06/12)^(144) ≈ 2.05, so $1000 becomes about $2050 after 12 years with monthly compounding: the rule is slightly conservative but close.' },
        { q: 'Set P = $1000, 7%, 30 years and no contributions. The sim shows about $8100 for compound and $3100 for simple. Where does the $5000 difference come from?', a: 'Simple interest pays 7% of the original $1000, i.e. $70, every year, for a total of $2100 in interest. Compounding pays 7% of the current balance, so the interest grows every year; the extra $5000 is interest earned on interest that had already been credited.' },
        { q: 'Two savers each put in $100 a month at 7%. One starts at age 25 and stops at 35; the other starts at 35 and continues to 65. Who has more at 65, and why does the answer surprise people?', a: 'The first saver. Their $12,000 grows untouched for 30 more years and ends near $140,000, while the second saver\'s $36,000 of deposits grows to about $122,000. Starting early gives every deposit more doubling periods, which outweighs contributing three times as much.' },
      ],
      id: [
        { q: 'Dengan aturan 72, kira-kira berapa lama uang berlipat dua pada 6%? Periksa taksiran itu dengan rumus sim.', a: 'Sekitar 72 / 6 = 12 tahun. Rumus memberi (1 + 0,06/12)^(144) ≈ 2,05, sehingga $1000 menjadi sekitar $2050 setelah 12 tahun dengan pemajemukan bulanan: aturan ini sedikit konservatif tetapi dekat.' },
        { q: 'Atur P = $1000, 7%, 30 tahun tanpa setoran. Sim menunjukkan sekitar $8100 untuk majemuk dan $3100 untuk sederhana. Dari mana selisih $5000 itu berasal?', a: 'Bunga sederhana membayar 7% dari $1000 awal, yaitu $70, setiap tahun, total $2100 bunga. Pemajemukan membayar 7% dari saldo saat ini, sehingga bunganya bertambah setiap tahun; tambahan $5000 itu adalah bunga yang diperoleh atas bunga yang sudah dikreditkan sebelumnya.' },
        { q: 'Dua penabung masing-masing menyetor $100 per bulan pada 7%. Yang pertama mulai pada usia 25 dan berhenti pada 35; yang kedua mulai pada 35 dan terus sampai 65. Siapa yang punya lebih banyak pada usia 65, dan mengapa jawabannya mengejutkan?', a: 'Penabung pertama. Setoran $12.000-nya tumbuh tanpa disentuh selama 30 tahun lagi dan berakhir di sekitar $140.000, sedangkan setoran $36.000 penabung kedua tumbuh menjadi sekitar $122.000. Memulai lebih awal memberi setiap setoran lebih banyak periode berlipat dua, dan itu mengalahkan menyetor tiga kali lebih banyak.' },
      ],
    },
  },
};
