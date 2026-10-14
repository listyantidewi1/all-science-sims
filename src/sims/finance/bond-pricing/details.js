// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compute price = sum of discounted cash flows.',
      'See the inverse relationship: yield up → price down.',
      'Distinguish discount, par, and premium bonds.',
    ],
    id: [
      'Menghitung harga = jumlah arus kas yang didiskonto.',
      'Melihat hubungan terbalik: yield naik → harga turun.',
      'Membedakan obligasi diskon, par, dan premium.',
    ],
  },
  tryThis: {
    en: [
      'Coupon = yield → price equals par ($1000).',
      'Yield jumps from 4% to 6% — how much does a 10-year bond drop?',
      'Drop coupon to 0 — what is a zero-coupon bond worth?',
    ],
    id: [
      'Kupon = yield → harga sama dengan nilai nominal ($1000).',
      'Yield naik dari 4% ke 6% — berapa harga obligasi 10-tahun turun?',
      'Turunkan kupon ke 0 — berapa harga obligasi tanpa kupon?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A bond is a loan split into tradeable pieces. The borrower, a government or a company, promises a fixed coupon payment every year and repays the face value (here $1,000) at maturity. Those promised payments do not change after the bond is issued, but the price investors are willing to pay for them does. The key quantity is the market yield: the return investors can currently get on comparable bonds. If new bonds offer 6%, nobody will pay full price for an old bond paying 5%, so its price must fall until buying it at the lower price delivers 6% too.',
        'The sim prices a bond as the present value of its cash flows: Price = Σ C / (1 + y)ᵗ for t = 1 … n, plus F / (1 + y)ⁿ, where C is the yearly coupon (coupon rate × face value), F the face value, y the market yield and n the years to maturity. Every payment is divided by (1 + y) once for each year you have to wait for it, so distant payments are shrunk the most. The left chart draws this price for yields from 0 to 20%, with the current yield as a red dot you can drag, and the dashed line marks par. The curve slopes down (yield up, price down) and bends upward: the same change in yield moves the price more when yields are low than when they are high, a property called convexity.',
        'The coupon and yield sliders set the two rates whose comparison decides everything. When the coupon rate equals the yield the bond sells exactly at par, because it pays precisely the going rate. A coupon above the yield makes the bond a premium bond (price above face), and a coupon below makes it a discount bond. The maturity slider changes how many payments there are and how far away the face value is; the right panel shows the price of the same coupon and yield for every maturity from 1 to 30 years. Try a discount bond: the longer the maturity, the deeper the discount, because more years of too-small coupons must be made up by a lower price. Long bonds are therefore far more sensitive to yield changes than short ones, a sensitivity measured by duration.',
        'The sim simplifies in a few ways. Coupons are paid once a year, whereas many real bonds pay twice a year; the yield is the same for every maturity, so the right panel is a price-against-maturity chart at one yield rather than a true market yield curve; and there is no default risk, no inflation adjustment and no tax. Prices are also computed on a coupon date, with no accrued interest. Despite that, the pattern it shows, prices and yields moving in opposite directions with long bonds swinging furthest, is exactly what bond markets do every day.',
      ],
      id: [
        'Obligasi adalah pinjaman yang dipecah menjadi bagian-bagian yang bisa diperdagangkan. Peminjam, pemerintah atau perusahaan, berjanji membayar kupon tetap setiap tahun dan mengembalikan nilai nominal (di sini $1.000) saat jatuh tempo. Pembayaran yang dijanjikan itu tidak berubah setelah obligasi diterbitkan, tetapi harga yang bersedia dibayar investor untuk pembayaran tersebut berubah. Besaran kuncinya adalah yield pasar: imbal hasil yang saat ini bisa diperoleh investor dari obligasi sebanding. Jika obligasi baru menawarkan 6%, tidak ada yang mau membayar harga penuh untuk obligasi lama yang membayar 5%, sehingga harganya harus turun sampai membelinya pada harga lebih rendah juga menghasilkan 6%.',
        'Simulasi menilai obligasi sebagai nilai kini arus kasnya: Harga = Σ C / (1 + y)ᵗ untuk t = 1 … n, ditambah F / (1 + y)ⁿ, dengan C kupon tahunan (tingkat kupon × nilai nominal), F nilai nominal, y yield pasar, dan n tahun sampai jatuh tempo. Setiap pembayaran dibagi (1 + y) sekali untuk tiap tahun kamu harus menunggunya, sehingga pembayaran yang jauh paling banyak menyusut. Grafik kiri menggambar harga ini untuk yield dari 0 sampai 20%, dengan yield saat ini sebagai titik merah yang bisa diseret, dan garis putus-putus menandai par. Kurvanya menurun (yield naik, harga turun) dan melengkung ke atas: perubahan yield yang sama menggerakkan harga lebih besar saat yield rendah daripada saat tinggi, sifat yang disebut konveksitas.',
        'Slider kupon dan yield mengatur dua tingkat yang perbandingannya menentukan segalanya. Saat tingkat kupon sama dengan yield, obligasi terjual tepat pada par, karena ia membayar persis tingkat yang berlaku. Kupon di atas yield menjadikannya obligasi premium (harga di atas nominal), dan kupon di bawah yield menjadikannya obligasi diskon. Slider jatuh tempo mengubah berapa banyak pembayaran dan seberapa jauh nilai nominalnya; panel kanan menunjukkan harga untuk kupon dan yield yang sama pada setiap tenor dari 1 sampai 30 tahun. Coba obligasi diskon: semakin panjang tenornya, semakin dalam diskonnya, karena lebih banyak tahun kupon yang terlalu kecil harus ditebus dengan harga lebih rendah. Obligasi panjang karenanya jauh lebih peka terhadap perubahan yield daripada yang pendek, kepekaan yang diukur dengan durasi.',
        'Simulasi menyederhanakan beberapa hal. Kupon dibayar sekali setahun, padahal banyak obligasi sungguhan membayar dua kali setahun; yield-nya sama untuk semua tenor, sehingga panel kanan adalah grafik harga terhadap tenor pada satu yield, bukan kurva yield pasar yang sebenarnya; dan tidak ada risiko gagal bayar, penyesuaian inflasi, maupun pajak. Harga juga dihitung tepat pada tanggal kupon, tanpa bunga berjalan. Meski begitu, pola yang ditunjukkannya, harga dan yield bergerak berlawanan dengan obligasi panjang berayun paling jauh, persis yang terjadi di pasar obligasi setiap hari.',
      ],
    },
    figure: {
      caption: {
        en: 'Price of a 10-year bond with a 5% coupon and $1,000 face value as the market yield changes. At a 5% yield the price is exactly par; lower yields give a premium, higher yields a discount. The curve is convex: the drop from 5% to 6% (about $74) is smaller than the rise from 5% to 4% (about $81).',
        id: 'Harga obligasi 10 tahun berkupon 5% dengan nilai nominal $1.000 saat yield pasar berubah. Pada yield 5% harganya tepat par; yield lebih rendah memberi premium, yield lebih tinggi memberi diskon. Kurvanya konveks: penurunan dari 5% ke 6% (sekitar $74) lebih kecil daripada kenaikan dari 5% ke 4% (sekitar $81).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Bond price falling as market yield rises', 'Harga obligasi turun saat yield pasar naik')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.s{font-size:10px;opacity:.75}.c{fill:none;stroke-width:2.6;stroke-linejoin:round}</style>
  <line x1="50" y1="30" x2="50" y2="210" class="ax"/>
  <line x1="50" y1="210" x2="330" y2="210" class="ax"/>
  <rect x="50" y="30" width="117" height="80" fill="#10b981" opacity=".10"/>
  <rect x="167" y="110" width="163" height="100" fill="#ef4444" opacity=".10"/>
  <line x1="50" y1="110" x2="330" y2="110" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="5 3"/>
  <text x="4" y="114" class="s">$1000</text>
  <text x="4" y="54" class="s">$1300</text>
  <text x="10" y="194" class="s">$600</text>
  <text x="46" y="224" class="s">0</text>
  <text x="161" y="224" class="s">5%</text>
  <text x="275" y="224" class="s">10%</text>
  <text x="240" y="238" class="s">${L('market yield', 'yield pasar')} →</text>
  <text x="54" y="26" class="s">${L('price', 'harga')}</text>
  <path d="M73 34.2 L97 56.1 L120 75.9 L143 93.8 L167 110 L190 124.7 L213 138.1 L237 150.3 L283 171.4 L330 189.1" class="c" stroke="#3b82f6"/>
  <circle cx="167" cy="110" r="5" fill="#f59e0b"/>
  <text x="172" y="104" fill="#f59e0b">${L('par: coupon = yield', 'par: kupon = yield')}</text>
  <text x="58" y="44" fill="#10b981">${L('premium', 'premium')}</text>
  <text x="58" y="56" fill="#10b981" class="s">${L('coupon above yield', 'kupon di atas yield')}</text>
  <text x="236" y="190" fill="#ef4444">${L('discount', 'diskon')}</text>
  <text x="236" y="202" fill="#ef4444" class="s">${L('coupon below yield', 'kupon di bawah yield')}</text>
  <line x1="143" y1="93.8" x2="143" y2="110" stroke="#8b5cf6" stroke-width="2"/>
  <line x1="190" y1="110" x2="190" y2="124.7" stroke="#8b5cf6" stroke-width="2"/>
  <text x="104" y="92" fill="#8b5cf6" class="s">+$81</text>
  <text x="195" y="132" fill="#8b5cf6" class="s">−$74</text>
  <text x="190" y="62" class="s">${L('10-year, 5% coupon', 'tenor 10 tahun, kupon 5%')}</text>
  <text x="190" y="74" class="s">${L('price = Σ C/(1+y)ᵗ + F/(1+y)ⁿ', 'harga = Σ C/(1+y)ᵗ + F/(1+y)ⁿ')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A bond\'s price is the present value of its fixed coupons and face value, each discounted by (1 + y) for every year of waiting.',
        'Price and yield move in opposite directions: when market yields rise, existing bonds with fixed coupons must fall in price.',
        'Coupon above yield means a premium bond, coupon below yield a discount bond, and coupon equal to yield a bond at par.',
        'Longer maturity means more distant cash flows and therefore greater price sensitivity to yield changes.',
        'The price–yield curve is convex, so a fall in yields raises the price more than an equal rise in yields lowers it.',
      ],
      id: [
        'Harga obligasi adalah nilai kini kupon tetap dan nilai nominalnya, masing-masing didiskonto dengan (1 + y) untuk tiap tahun menunggu.',
        'Harga dan yield bergerak berlawanan: saat yield pasar naik, obligasi yang ada dengan kupon tetap harus turun harganya.',
        'Kupon di atas yield berarti obligasi premium, kupon di bawah yield obligasi diskon, dan kupon sama dengan yield berarti obligasi pada par.',
        'Tenor lebih panjang berarti arus kas lebih jauh dan karenanya kepekaan harga terhadap perubahan yield lebih besar.',
        'Kurva harga–yield konveks, sehingga penurunan yield menaikkan harga lebih besar daripada kenaikan yield yang sama menurunkannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Face value (par)', 'The amount repaid at maturity, $1,000 in the sim; also the base for the coupon.'],
        ['Coupon rate', 'The fixed yearly interest as a percentage of face value; a 5% coupon on $1,000 pays $50 a year.'],
        ['Yield to maturity', 'The single discount rate that makes the present value of all payments equal the price; the sim\'s market yield slider.'],
        ['Present value', 'Today\'s worth of a future payment: the payment divided by (1 + y) raised to the number of years.'],
        ['Premium bond', 'A bond priced above face value because its coupon exceeds the market yield.'],
        ['Discount bond', 'A bond priced below face value because its coupon is below the market yield.'],
        ['Zero-coupon bond', 'A bond with no coupons that pays only its face value at maturity, so it always trades at a discount.'],
        ['Duration', 'A measure of how strongly a bond\'s price responds to a change in yield; it grows with maturity and shrinks with coupon size.'],
      ],
      id: [
        ['Nilai nominal (par)', 'Jumlah yang dikembalikan saat jatuh tempo, $1.000 di simulasi; juga dasar perhitungan kupon.'],
        ['Tingkat kupon', 'Bunga tahunan tetap sebagai persentase nilai nominal; kupon 5% atas $1.000 membayar $50 per tahun.'],
        ['Yield sampai jatuh tempo', 'Satu tingkat diskonto yang membuat nilai kini semua pembayaran sama dengan harga; slider yield pasar di simulasi.'],
        ['Nilai kini', 'Nilai hari ini dari pembayaran di masa depan: pembayaran dibagi (1 + y) dipangkatkan jumlah tahunnya.'],
        ['Obligasi premium', 'Obligasi yang harganya di atas nilai nominal karena kuponnya melebihi yield pasar.'],
        ['Obligasi diskon', 'Obligasi yang harganya di bawah nilai nominal karena kuponnya di bawah yield pasar.'],
        ['Obligasi tanpa kupon', 'Obligasi tanpa kupon yang hanya membayar nilai nominal saat jatuh tempo, sehingga selalu diperdagangkan dengan diskon.'],
        ['Durasi', 'Ukuran seberapa kuat harga obligasi menanggapi perubahan yield; bertambah dengan tenor dan berkurang dengan besar kupon.'],
      ],
    },
    misconceptions: {
      en: [
        ['When interest rates rise, bondholders earn more.', 'Holders of existing fixed-coupon bonds receive the same coupons as before, but the market price of their bonds falls. Only new buyers at the lower price earn the higher yield.'],
        ['A bond is always worth its face value.', 'It is worth face value only at maturity, or whenever the coupon equals the market yield. In between it trades at a premium or a discount, sometimes far from par.'],
        ['The yield of a bond is just its coupon rate.', 'The coupon rate is fixed at issue; the yield depends on the price you pay. A $50 coupon on a bond bought for $926 yields more than 5%, because you also gain the $74 pull to par at maturity.'],
        ['A 1-year bond and a 30-year bond with the same coupon react the same way to a yield change.', 'The 30-year bond moves far more. Its cash flows are discounted over many more years, so each (1 + y) factor compounds the effect; the sim\'s right panel shows the bars at long maturities swinging much further.'],
      ],
      id: [
        ['Saat suku bunga naik, pemegang obligasi memperoleh lebih banyak.', 'Pemegang obligasi kupon tetap yang sudah ada menerima kupon yang sama seperti sebelumnya, tetapi harga pasar obligasinya turun. Hanya pembeli baru pada harga lebih rendah yang menikmati yield lebih tinggi.'],
        ['Obligasi selalu bernilai sebesar nilai nominalnya.', 'Nilainya sama dengan nominal hanya saat jatuh tempo, atau ketika kupon sama dengan yield pasar. Di antaranya ia diperdagangkan dengan premium atau diskon, kadang jauh dari par.'],
        ['Yield obligasi sama saja dengan tingkat kuponnya.', 'Tingkat kupon tetap sejak penerbitan; yield bergantung pada harga yang kamu bayar. Kupon $50 pada obligasi yang dibeli $926 menghasilkan lebih dari 5%, karena kamu juga memperoleh tarikan $74 menuju par saat jatuh tempo.'],
        ['Obligasi 1 tahun dan 30 tahun dengan kupon sama bereaksi sama terhadap perubahan yield.', 'Obligasi 30 tahun bergerak jauh lebih besar. Arus kasnya didiskonto selama lebih banyak tahun, sehingga tiap faktor (1 + y) melipatgandakan efeknya; panel kanan simulasi menunjukkan batang pada tenor panjang berayun jauh lebih besar.'],
      ],
    },
    realWorld: {
      en: [
        'Governments borrow by issuing bonds, from US Treasuries to Indonesia\'s Surat Berharga Negara, and the yields on these bonds set the benchmark for mortgage and loan rates throughout the economy.',
        'When a central bank raises its policy rate, market yields follow and the prices of existing bonds drop; bond-fund investors see this as a fall in the value of their holdings even though no coupon was missed.',
        'Pension funds and insurers hold long-maturity bonds to match their far-off obligations, and they watch duration closely because those bonds are the most yield-sensitive.',
        'Zero-coupon bonds, which the sim shows at a deep discount, are sold to savers who want a known lump sum on a known date, for example to pay for university.',
      ],
      id: [
        'Pemerintah meminjam dengan menerbitkan obligasi, dari US Treasury sampai Surat Berharga Negara Indonesia, dan yield obligasi ini menjadi acuan suku bunga KPR dan pinjaman di seluruh perekonomian.',
        'Saat bank sentral menaikkan suku bunga acuan, yield pasar mengikuti dan harga obligasi yang ada turun; investor reksa dana pendapatan tetap melihatnya sebagai penurunan nilai kepemilikan walaupun tidak ada kupon yang terlewat.',
        'Dana pensiun dan perusahaan asuransi memegang obligasi tenor panjang untuk mencocokkan kewajiban jauh di depan, dan mereka mengawasi durasi dengan saksama karena obligasi itu paling peka terhadap yield.',
        'Obligasi tanpa kupon, yang di simulasi tampak dengan diskon dalam, dijual kepada penabung yang menginginkan jumlah pasti pada tanggal pasti, misalnya untuk membiayai kuliah.',
      ],
    },
    questions: {
      en: [
        { q: 'A 10-year bond has a 5% coupon on $1,000 face value. What is its price when the market yield is 6%, and is it a premium or a discount bond?', a: 'Each year pays $50, discounted at 6%: the ten coupons are worth 50 × (1 − 1.06⁻¹⁰) / 0.06 ≈ $368.00 and the face value 1000 / 1.06¹⁰ ≈ $558.39, so the price is about $926.40. The coupon (5%) is below the yield (6%), so it is a discount bond.' },
        { q: 'Set the coupon to zero on a 10-year bond with a 5% yield. What is the bond worth, and why so little?', a: 'Only the face value remains: 1000 / 1.05¹⁰ ≈ $613.91. With no coupons, all of the return must come from the gap between the purchase price and the $1,000 repaid in ten years, so the price has to sit well below par.' },
        { q: 'With the yield above the coupon, why does the right-hand panel show the price getting lower as maturity increases, while with the yield below the coupon it gets higher?', a: 'A discount bond pays coupons that are too small for the market rate, and the shortfall must be compensated by the price; more years of shortfall mean a bigger compensation, so a deeper discount. A premium bond pays coupons that are too generous, and more years of generosity are worth more. At par the two effects vanish and every maturity prices at $1,000.' },
      ],
      id: [
        { q: 'Obligasi 10 tahun berkupon 5% atas nilai nominal $1.000. Berapa harganya saat yield pasar 6%, dan apakah ini obligasi premium atau diskon?', a: 'Tiap tahun membayar $50, didiskonto 6%: sepuluh kupon bernilai 50 × (1 − 1,06⁻¹⁰) / 0,06 ≈ $368,00 dan nilai nominal 1000 / 1,06¹⁰ ≈ $558,39, sehingga harganya sekitar $926,40. Kupon (5%) di bawah yield (6%), jadi ini obligasi diskon.' },
        { q: 'Atur kupon ke nol pada obligasi 10 tahun dengan yield 5%. Berapa nilai obligasinya, dan mengapa begitu kecil?', a: 'Hanya nilai nominal yang tersisa: 1000 / 1,05¹⁰ ≈ $613,91. Tanpa kupon, seluruh imbal hasil harus datang dari selisih antara harga beli dan $1.000 yang dikembalikan sepuluh tahun kemudian, sehingga harganya harus berada jauh di bawah par.' },
        { q: 'Saat yield di atas kupon, mengapa panel kanan menunjukkan harga semakin rendah saat tenor bertambah, sedangkan saat yield di bawah kupon harganya semakin tinggi?', a: 'Obligasi diskon membayar kupon yang terlalu kecil untuk tingkat pasar, dan kekurangan itu harus ditebus oleh harga; lebih banyak tahun kekurangan berarti tebusan lebih besar, jadi diskon lebih dalam. Obligasi premium membayar kupon yang terlalu besar, dan lebih banyak tahun kemurahan bernilai lebih tinggi. Pada par kedua efek itu hilang dan semua tenor berharga $1.000.' },
      ],
    },
  },
};
