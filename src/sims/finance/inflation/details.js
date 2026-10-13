// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply real value = nominal / (1 + π)ⁿ.',
      'Compute real return = (1 + r) / (1 + π) − 1.',
      'See decades of low inflation halve purchasing power.',
    ],
    id: [
      'Menerapkan nilai riil = nominal / (1 + π)ⁿ.',
      'Menghitung return riil = (1 + r) / (1 + π) − 1.',
      'Melihat puluhan tahun inflasi rendah menyetengahkan daya beli.',
    ],
  },
  tryThis: {
    en: [
      '3% for 24 years — does $1 become $0.50?',
      'Hyperinflation 100%/year — what happens in a decade?',
      'Find the nominal rate needed to keep real value flat at 7% inflation.',
    ],
    id: [
      '3% selama 24 tahun — apakah Rp1 jadi Rp0,50?',
      'Hiperinflasi 100%/tahun — apa yang terjadi dalam satu dekade?',
      'Cari suku nominal agar nilai riil tetap pada inflasi 7%.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Inflation is a general rise in prices over time, which means the same amount of money buys a little less each year. If prices rise 3% a year, something that costs $100 today costs $103 next year, and about $134 after ten years, because each year\'s 3% is applied to an already higher price. The simulation follows a single sum of money for many years and asks two different questions about it: how many dollars will the account show, and what will those dollars actually buy? The first is the nominal value; the second is the real value, measured in today\'s prices.',
        'Three lines are drawn. The blue line is the nominal account balance, starting amount × (1 + r)ⁿ, where r is the savings rate and n the number of years. The red line is the purchasing power of the original cash if it had simply been kept at home: starting amount / (1 + π)ⁿ, where π is the inflation rate. The green line is the real value of the growing account, nominal / (1 + π)ⁿ, which is what the balance would buy at today\'s prices. The box reports the real return per year, (1 + r) / (1 + π) − 1. For small rates this is close to r − π, but not exactly: 5% growth with 3% inflation gives 1.94% real, not 2%.',
        'The inflation slider runs from −5% (deflation, when prices fall) to 50%, with preset buttons for typical, high and hyper-inflation. The nominal rate slider sets how fast the account grows, and the years slider stretches the time horizon so you can see compounding bend the curves: a constant percentage applied to a growing base curves upward, while a constant percentage shaved off a shrinking base curves downward and never quite reaches zero. The starting amount only rescales the picture; every ratio between the lines stays the same. A handy shortcut is the rule of 72: money halves in roughly 72 / π years, so about 24 years at 3% and about 7 years at 10%.',
        'The model is deliberately simple. It assumes one constant inflation rate and one constant savings rate for the entire period, compounds once a year, and ignores taxes, fees, deposits and withdrawals. Real inflation changes from year to year and differs between goods, so the published rate is an average over a basket of typical purchases, and your personal inflation can be higher or lower depending on what you buy. The sim is a tool for seeing how rates and time interact, not a forecast.',
      ],
      id: [
        'Inflasi adalah kenaikan harga secara umum dari waktu ke waktu, sehingga jumlah uang yang sama membeli sedikit lebih sedikit setiap tahun. Jika harga naik 3% per tahun, barang seharga $100 hari ini menjadi $103 tahun depan, dan sekitar $134 setelah sepuluh tahun, karena 3% tiap tahun dikenakan pada harga yang sudah lebih tinggi. Simulasi ini mengikuti sejumlah uang selama bertahun-tahun dan mengajukan dua pertanyaan berbeda: berapa angka saldo yang tertera di rekening, dan apa yang sebenarnya bisa dibeli dengan uang itu? Yang pertama disebut nilai nominal; yang kedua nilai riil, diukur dengan harga hari ini.',
        'Ada tiga garis yang digambar. Garis biru adalah saldo nominal rekening, jumlah awal × (1 + r)ⁿ, dengan r suku bunga simpanan dan n jumlah tahun. Garis merah adalah daya beli uang awal seandainya hanya disimpan di rumah: jumlah awal / (1 + π)ⁿ, dengan π tingkat inflasi. Garis hijau adalah nilai riil rekening yang tumbuh, nominal / (1 + π)ⁿ, yaitu apa yang bisa dibeli saldo itu dengan harga hari ini. Kotak informasi menampilkan return riil per tahun, (1 + r) / (1 + π) − 1. Untuk tingkat yang kecil nilainya mendekati r − π, tetapi tidak persis: pertumbuhan 5% dengan inflasi 3% memberi return riil 1,94%, bukan 2%.',
        'Slider inflasi bergerak dari −5% (deflasi, saat harga turun) sampai 50%, dengan tombol preset untuk inflasi normal, tinggi, dan hiper. Slider suku nominal mengatur seberapa cepat rekening tumbuh, dan slider tahun memanjangkan horizon waktu sehingga kamu bisa melihat bunga majemuk melengkungkan kurva: persentase tetap yang dikenakan pada dasar yang membesar melengkung ke atas, sedangkan persentase tetap yang dipotong dari dasar yang mengecil melengkung ke bawah dan tidak pernah benar-benar mencapai nol. Jumlah awal hanya mengubah skala gambar; semua perbandingan antar garis tetap sama. Jalan pintas yang berguna adalah aturan 72: uang menyusut setengah dalam kira-kira 72 / π tahun, jadi sekitar 24 tahun pada inflasi 3% dan sekitar 7 tahun pada 10%.',
        'Modelnya sengaja dibuat sederhana. Ia mengasumsikan satu tingkat inflasi dan satu suku bunga yang tetap selama seluruh periode, bunga dihitung sekali setahun, serta mengabaikan pajak, biaya, setoran, dan penarikan. Inflasi sungguhan berubah dari tahun ke tahun dan berbeda antar barang, sehingga angka yang diumumkan adalah rata-rata dari sekeranjang belanja umum, dan inflasi pribadimu bisa lebih tinggi atau lebih rendah tergantung apa yang kamu beli. Simulasi ini alat untuk melihat bagaimana tingkat dan waktu saling berinteraksi, bukan ramalan.',
      ],
    },
    figure: {
      caption: {
        en: '$1,000 at a 5% nominal rate with 3% inflation over 30 years. The nominal balance climbs to about $4,300, but in today\'s prices it is worth only about $1,780 (green), while cash kept at home would buy only about $410 worth (red).',
        id: '$1.000 pada suku nominal 5% dengan inflasi 3% selama 30 tahun. Saldo nominal naik ke sekitar $4.300, tetapi dalam harga hari ini nilainya hanya sekitar $1.780 (hijau), sementara uang tunai yang disimpan di rumah hanya setara sekitar $410 (merah).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Nominal balance, real value and purchasing power over 30 years', 'Saldo nominal, nilai riil, dan daya beli selama 30 tahun')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.g{stroke:currentColor;stroke-width:.6;fill:none;opacity:.2}.c{fill:none;stroke-width:2.4;stroke-linejoin:round}.s{font-size:10px;opacity:.75}</style>
  <line x1="50" y1="30" x2="50" y2="210" class="ax"/>
  <line x1="50" y1="210" x2="330" y2="210" class="ax"/>
  <line x1="50" y1="170" x2="330" y2="170" class="g" stroke-dasharray="3 3"/>
  <text x="8" y="174" class="s">$1000</text>
  <text x="8" y="94" class="s">$3000</text>
  <line x1="50" y1="90" x2="330" y2="90" class="g"/>
  <text x="46" y="224" class="s">0</text>
  <text x="135" y="224" class="s">10 ${L('yr', 'thn')}</text>
  <text x="228" y="224" class="s">20 ${L('yr', 'thn')}</text>
  <text x="318" y="224" class="s">30</text>
  <path d="M50 170 L97 159 L143 145 L190 127 L237 104 L283 75 L330 37" class="c" stroke="#3b82f6"/>
  <path d="M50 170 L97 166 L143 162 L190 157 L237 151 L283 145 L330 139" class="c" stroke="#10b981"/>
  <path d="M50 170 L97 175 L143 180 L190 184 L237 188 L283 191 L330 194" class="c" stroke="#ef4444"/>
  <text x="212" y="52" fill="#3b82f6">${L('nominal balance', 'saldo nominal')}</text>
  <text x="212" y="62" fill="#3b82f6" class="s">× (1 + r)ⁿ</text>
  <text x="200" y="134" fill="#10b981">${L('real value', 'nilai riil')}</text>
  <text x="200" y="144" fill="#10b981" class="s">${L('nominal', 'nominal')} / (1 + π)ⁿ</text>
  <text x="180" y="206" fill="#ef4444">${L('cash kept at home', 'uang tunai di rumah')}</text>
  <text x="56" y="40" class="s">${L('value in dollars', 'nilai dalam dolar')}</text>
  <text x="250" y="238" class="s">${L('years', 'tahun')} →</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Inflation makes each unit of money buy less, so a growing balance can still be losing value.',
        'Real value = nominal value / (1 + π)ⁿ: divide by inflation compounded over the years.',
        'Real return = (1 + r) / (1 + π) − 1, which is roughly r − π when both rates are small.',
        'Compounding works both ways: small yearly percentages become large changes over decades (about 72 / π years to halve).',
        'Savings keep their purchasing power only when the nominal rate is higher than inflation.',
      ],
      id: [
        'Inflasi membuat tiap satuan uang membeli lebih sedikit, sehingga saldo yang bertambah bisa saja sedang kehilangan nilai.',
        'Nilai riil = nilai nominal / (1 + π)ⁿ: dibagi inflasi yang berlipat selama bertahun-tahun.',
        'Return riil = (1 + r) / (1 + π) − 1, yang kira-kira sama dengan r − π bila kedua tingkat kecil.',
        'Bunga majemuk bekerja dua arah: persentase kecil per tahun menjadi perubahan besar dalam puluhan tahun (sekitar 72 / π tahun untuk menyusut setengah).',
        'Tabungan mempertahankan daya belinya hanya jika suku nominal lebih tinggi daripada inflasi.',
      ],
    },
    vocabulary: {
      en: [
        ['Inflation (π)', 'The yearly percentage rise in the general level of prices.'],
        ['Nominal value', 'An amount of money as it appears on paper, without adjusting for price changes.'],
        ['Real value', 'An amount expressed in the prices of a fixed base year, here today, so it measures what the money can buy.'],
        ['Purchasing power', 'The quantity of goods and services a given sum of money can buy.'],
        ['Real return', 'The growth of purchasing power per year: (1 + r) / (1 + π) − 1.'],
        ['Compounding', 'Applying a percentage change to an amount that already includes previous changes, so growth builds on growth.'],
        ['Deflation', 'A general fall in prices, a negative inflation rate; money then buys more over time.'],
        ['Rule of 72', 'A quick estimate: a quantity growing or shrinking at p% per year doubles or halves in about 72 / p years.'],
      ],
      id: [
        ['Inflasi (π)', 'Persentase kenaikan tingkat harga umum per tahun.'],
        ['Nilai nominal', 'Jumlah uang sebagaimana tertulis, tanpa penyesuaian terhadap perubahan harga.'],
        ['Nilai riil', 'Jumlah yang dinyatakan dengan harga suatu tahun dasar, di sini hari ini, sehingga mengukur apa yang bisa dibeli uang itu.'],
        ['Daya beli', 'Banyaknya barang dan jasa yang dapat dibeli dengan sejumlah uang tertentu.'],
        ['Return riil', 'Pertumbuhan daya beli per tahun: (1 + r) / (1 + π) − 1.'],
        ['Bunga majemuk', 'Menerapkan perubahan persentase pada jumlah yang sudah memuat perubahan sebelumnya, sehingga pertumbuhan menumpuk di atas pertumbuhan.'],
        ['Deflasi', 'Penurunan harga secara umum, yaitu inflasi negatif; uang justru membeli lebih banyak seiring waktu.'],
        ['Aturan 72', 'Taksiran cepat: besaran yang tumbuh atau menyusut p% per tahun menjadi dua kali atau setengahnya dalam sekitar 72 / p tahun.'],
      ],
    },
    misconceptions: {
      en: [
        ['Real return is exactly the nominal rate minus inflation.', 'That is only an approximation. The exact value is (1 + r) / (1 + π) − 1; at 5% and 3% it is 1.94%, and the gap grows at high rates, as the sim shows with the hyperinflation preset.'],
        ['If my balance goes up every year, I am getting richer.', 'Only if the rate beats inflation. At 4% interest with 6% inflation the balance rises while its purchasing power falls about 1.9% a year.'],
        ['Two or three percent inflation is too small to matter.', 'Over decades it is not small: at 3% prices roughly double every 24 years, so the purchasing power of fixed cash halves in the same time.'],
        ['The inflation rate means every price rose by that amount.', 'It is an average across a basket of goods and services. Some prices rise much faster, others fall, and each household\'s own experience differs.'],
      ],
      id: [
        ['Return riil persis sama dengan suku nominal dikurangi inflasi.', 'Itu hanya pendekatan. Nilai tepatnya (1 + r) / (1 + π) − 1; pada 5% dan 3% hasilnya 1,94%, dan selisihnya membesar pada tingkat tinggi, seperti terlihat di preset hiperinflasi.'],
        ['Kalau saldoku naik setiap tahun, aku semakin kaya.', 'Hanya jika bunganya mengalahkan inflasi. Dengan bunga 4% dan inflasi 6%, saldo naik tetapi daya belinya turun sekitar 1,9% per tahun.'],
        ['Inflasi dua atau tiga persen terlalu kecil untuk dipedulikan.', 'Dalam puluhan tahun itu tidak kecil: pada 3% harga kira-kira berlipat dua setiap 24 tahun, sehingga daya beli uang tunai menyusut setengah dalam waktu yang sama.'],
        ['Angka inflasi berarti semua harga naik sebesar itu.', 'Itu rata-rata dari sekeranjang barang dan jasa. Beberapa harga naik jauh lebih cepat, yang lain turun, dan pengalaman tiap rumah tangga berbeda.'],
      ],
    },
    realWorld: {
      en: [
        'Central banks, including Bank Indonesia and the US Federal Reserve, aim for low and steady inflation of a few percent a year rather than zero, because mild inflation is easier to manage than deflation.',
        'Germany in 1923 and Zimbabwe in 2008 saw hyperinflation so severe that prices doubled within days, and people spent wages immediately because cash lost value by the hour.',
        'Pensions, minimum wages and some government bonds are often indexed to inflation so that their real value, not just their nominal value, is protected.',
        'A savings account paying less than the inflation rate has a negative real return: the balance rises, but what it can buy shrinks, exactly like the sim\'s green line sloping down.',
      ],
      id: [
        'Bank sentral, termasuk Bank Indonesia dan Federal Reserve AS, menargetkan inflasi rendah dan stabil beberapa persen per tahun, bukan nol, karena inflasi ringan lebih mudah dikelola daripada deflasi.',
        'Jerman tahun 1923 dan Zimbabwe tahun 2008 mengalami hiperinflasi begitu parah sehingga harga berlipat dua dalam hitungan hari, dan orang segera membelanjakan gajinya karena nilai uang turun tiap jam.',
        'Dana pensiun, upah minimum, dan sebagian obligasi pemerintah sering diindeks terhadap inflasi agar nilai riilnya, bukan hanya nilai nominalnya, tetap terlindungi.',
        'Rekening tabungan dengan bunga di bawah inflasi punya return riil negatif: saldonya naik, tetapi yang bisa dibeli menyusut, persis seperti garis hijau di simulasi yang menurun.',
      ],
    },
    questions: {
      en: [
        { q: 'Inflation is 3% a year. Roughly what fraction of its purchasing power does $1,000 in cash keep after 24 years?', a: 'About half. 1.03 raised to the 24th power is about 2.03, so the real value is 1000 / 2.03 ≈ $490. This matches the rule of 72: 72 / 3 = 24 years to halve.' },
        { q: 'Your savings earn 4% while inflation is 6%. What is the real return, and after 10 years is $1,000 worth more or less in today\'s prices?', a: 'Real return = 1.04 / 1.06 − 1 ≈ −1.9% per year. After 10 years the balance shows about $1,480, but its real value is 1000 × (1.04 / 1.06)¹⁰ ≈ $827, so you are poorer in purchasing power.' },
        { q: 'Set the nominal rate equal to the inflation rate. Why does the green real-value line stay perfectly flat?', a: 'Because nominal / (1 + π)ⁿ = starting amount × (1 + r)ⁿ / (1 + π)ⁿ, and with r = π the two factors cancel every year. The balance grows just fast enough to buy the same basket of goods, so the real return is exactly 0%.' },
      ],
      id: [
        { q: 'Inflasi 3% per tahun. Kira-kira berapa bagian daya beli yang masih dimiliki uang tunai $1.000 setelah 24 tahun?', a: 'Sekitar setengahnya. 1,03 pangkat 24 kira-kira 2,03, sehingga nilai riilnya 1000 / 2,03 ≈ $490. Ini cocok dengan aturan 72: 72 / 3 = 24 tahun untuk menyusut setengah.' },
        { q: 'Tabunganmu berbunga 4% sementara inflasi 6%. Berapa return riilnya, dan setelah 10 tahun apakah $1.000 bernilai lebih atau kurang dalam harga hari ini?', a: 'Return riil = 1,04 / 1,06 − 1 ≈ −1,9% per tahun. Setelah 10 tahun saldo menunjukkan sekitar $1.480, tetapi nilai riilnya 1000 × (1,04 / 1,06)¹⁰ ≈ $827, jadi daya belimu berkurang.' },
        { q: 'Atur suku nominal sama dengan tingkat inflasi. Mengapa garis hijau nilai riil tetap datar sempurna?', a: 'Karena nominal / (1 + π)ⁿ = jumlah awal × (1 + r)ⁿ / (1 + π)ⁿ, dan dengan r = π kedua faktor saling meniadakan setiap tahun. Saldo tumbuh tepat secepat yang dibutuhkan untuk membeli keranjang barang yang sama, sehingga return riilnya persis 0%.' },
      ],
    },
  },
};
