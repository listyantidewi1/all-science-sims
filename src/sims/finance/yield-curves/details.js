// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify normal, flat, and inverted yield curves.',
      'Compute the 10y−2y spread (a famous recession indicator).',
      'Connect curve shape to inflation expectations and policy.',
    ],
    id: [
      'Mengenali kurva imbal hasil normal, datar, dan terbalik.',
      'Menghitung spread 10y−2y (indikator resesi terkenal).',
      'Mengaitkan bentuk kurva dengan ekspektasi inflasi dan kebijakan.',
    ],
  },
  tryThis: {
    en: [
      'Drag short rates above long ones — what shape?',
      "Set 10y−2y to −0.5% — that's an inversion.",
      "Build a steep normal curve — what does that suggest about expected growth?",
    ],
    id: [
      'Geser bunga pendek di atas bunga panjang — bentuk apa?',
      'Atur 10y−2y ke −0,5% — itu inversi.',
      'Buat kurva normal curam — apa artinya untuk ekspektasi pertumbuhan?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A government borrows for many different lengths of time at once, from three-month bills to thirty-year bonds, and each maturity has its own yield, the yearly return an investor earns by holding it to the end. Plotting yield against maturity gives the yield curve. On a normal day the curve slopes upward: lenders want extra compensation for tying up money for longer, both because they give up flexibility and because more can go wrong over thirty years than over three months. That extra is called the term premium. The curve is also a forecast in disguise, since a ten-year yield must roughly match what investors expect to earn by rolling over short-term bills for ten years; if they expect short rates to fall, long yields sit below short ones.',
        'The sim is a drawing board rather than a model. Eight points, from three months to thirty years, can be dragged up and down, and preset buttons load textbook shapes: normal, steep, flat, inverted and humped. The box reports the shape and the spread between the ten-year and two-year yields, the most widely quoted single summary of the curve. The sim classifies a spread above 0.3 percentage points as normal, between −0.05 and 0.3 as flat or mildly inverted, and below −0.05 as inverted. Those thresholds are the sim\'s own; there is no official boundary, and the shape of the whole curve matters more than one number.',
        'Each shape tells a story about expectations. A steep curve usually appears when the central bank has cut short-term rates to support a weak economy while investors expect growth and inflation, and therefore higher rates, to return. A flat curve means the market sees little difference between lending for two years or ten, often at the turning point of a cycle. An inverted curve, with short yields above long ones, means the central bank has pushed short rates up, typically to fight inflation, while investors expect those rates to be cut later, which usually happens when the economy slows. That is why an inversion of the 10y−2y spread has preceded most US recessions of the past half-century, though with a lag of a year or more and not without false alarms. A humped curve, high in the middle, often marks the transition between the two.',
        'Because the points are set by hand, the sim does not enforce any relationship between them, so you can draw curves no market would produce. It shows yields for a single borrower with no default risk, ignores the fact that yields are quoted on bonds with different coupons, and treats the ten-year-minus-two-year spread as the only diagnostic, when analysts also watch the 10y−3-month spread and the level of real yields. Above all, the recession signal is a historical regularity, not a mechanism: an inverted curve reflects expectations of rate cuts, and it is the slowdown that prompts those cuts, not the curve, that causes the recession.',
      ],
      id: [
        'Pemerintah meminjam untuk berbagai jangka waktu sekaligus, dari surat utang tiga bulan sampai obligasi tiga puluh tahun, dan setiap tenor punya imbal hasil (yield) sendiri, yaitu return tahunan yang diperoleh investor dengan memegangnya sampai akhir. Memplot yield terhadap tenor menghasilkan kurva imbal hasil. Pada hari biasa kurvanya menanjak: pemberi pinjaman menginginkan kompensasi tambahan karena mengikat uang lebih lama, baik karena kehilangan keluwesan maupun karena lebih banyak hal bisa salah dalam tiga puluh tahun daripada tiga bulan. Tambahan itu disebut premi jangka waktu. Kurva juga merupakan ramalan terselubung, karena yield sepuluh tahun harus kira-kira cocok dengan yang diharapkan investor dari memperpanjang surat utang jangka pendek selama sepuluh tahun; jika mereka memperkirakan bunga pendek turun, yield panjang berada di bawah yield pendek.',
        'Simulasi ini adalah papan gambar, bukan model. Delapan titik, dari tiga bulan sampai tiga puluh tahun, bisa diseret naik turun, dan tombol preset memuat bentuk-bentuk buku teks: normal, curam, datar, terbalik, dan berpunuk. Kotak melaporkan bentuk kurva dan spread antara yield sepuluh tahun dan dua tahun, ringkasan tunggal kurva yang paling banyak dikutip. Simulasi menggolongkan spread di atas 0,3 poin persentase sebagai normal, antara −0,05 dan 0,3 sebagai datar atau sedikit terbalik, dan di bawah −0,05 sebagai terbalik. Ambang itu adalah pilihan simulasi sendiri; tidak ada batas resmi, dan bentuk seluruh kurva lebih penting daripada satu angka.',
        'Setiap bentuk bercerita tentang ekspektasi. Kurva curam biasanya muncul ketika bank sentral telah memangkas bunga jangka pendek untuk menopang ekonomi yang lemah sementara investor memperkirakan pertumbuhan dan inflasi, dan karenanya bunga lebih tinggi, akan kembali. Kurva datar berarti pasar melihat sedikit perbedaan antara meminjamkan dua tahun atau sepuluh tahun, sering pada titik balik siklus. Kurva terbalik, dengan yield pendek di atas yield panjang, berarti bank sentral telah mendorong bunga pendek naik, biasanya untuk melawan inflasi, sementara investor memperkirakan bunga itu akan dipangkas kemudian, yang biasanya terjadi saat ekonomi melambat. Itulah sebabnya inversi spread 10y−2y telah mendahului sebagian besar resesi AS dalam setengah abad terakhir, meski dengan jeda setahun atau lebih dan tidak tanpa alarm palsu. Kurva berpunuk, tinggi di tengah, sering menandai peralihan antara keduanya.',
        'Karena titik-titiknya diatur dengan tangan, simulasi tidak memaksakan hubungan apa pun di antara mereka, sehingga kamu bisa menggambar kurva yang tidak akan dihasilkan pasar mana pun. Ia menunjukkan yield untuk satu peminjam tanpa risiko gagal bayar, mengabaikan kenyataan bahwa yield dikutip pada obligasi dengan kupon berbeda, dan memperlakukan spread sepuluh tahun dikurangi dua tahun sebagai satu-satunya diagnosis, padahal analis juga mengamati spread 10y−3 bulan dan tingkat yield riil. Yang terpenting, sinyal resesi adalah keteraturan historis, bukan mekanisme: kurva terbalik mencerminkan ekspektasi pemangkasan bunga, dan perlambatanlah yang memicu pemangkasan itu, bukan kurvanya, yang menyebabkan resesi.',
      ],
    },
    figure: {
      caption: {
        en: 'Three yield-curve shapes from the sim\'s presets. Normal (green): long yields above short ones, 10y−2y = +0.5. Flat (amber): the same yield at every maturity, spread 0. Inverted (red): short yields above long ones, 10y−2y = −0.5, the pattern that has often preceded recessions.',
        id: 'Tiga bentuk kurva imbal hasil dari preset simulasi. Normal (hijau): yield panjang di atas yield pendek, 10y−2y = +0,5. Datar (kuning): yield sama di setiap tenor, spread 0. Terbalik (merah): yield pendek di atas yield panjang, 10y−2y = −0,5, pola yang sering mendahului resesi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Normal, flat and inverted yield curves', 'Kurva imbal hasil normal, datar, dan terbalik')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.s{font-size:10px;opacity:.75}.c{fill:none;stroke-width:2.6;stroke-linejoin:round}.g{stroke:currentColor;stroke-width:.8;opacity:.3}</style>
  <line x1="50" y1="40" x2="50" y2="200" class="ax"/>
  <line x1="50" y1="200" x2="330" y2="200" class="ax"/>
  <text x="26" y="44" class="s">6%</text>
  <text x="26" y="97" class="s">5%</text>
  <text x="26" y="150" class="s">4%</text>
  <text x="26" y="204" class="s">3%</text>
  <line x1="69" y1="40" x2="69" y2="200" class="g" stroke-dasharray="3 3"/>
  <line x1="143" y1="40" x2="143" y2="200" class="g" stroke-dasharray="3 3"/>
  <text x="62" y="214" class="s">2y</text>
  <text x="134" y="214" class="s">10y</text>
  <text x="230" y="214" class="s">20y</text>
  <text x="320" y="214" class="s">30y</text>
  <text x="236" y="230" class="s">${L('maturity', 'tenor')} →</text>
  <text x="54" y="36" class="s">${L('yield', 'yield')}</text>
  <path d="M52 146.7 L59 130.7 L69 120 L97 109.3 L143 93.3 L237 82.7 L330 77.3" class="c" stroke="#10b981"/>
  <path d="M52 120 L330 120" class="c" stroke="#f59e0b"/>
  <path d="M52 66.7 L59 82.7 L69 93.3 L97 109.3 L143 120 L237 125.3 L330 130.7" class="c" stroke="#ef4444"/>
  <circle cx="69" cy="120" r="3.5" fill="#10b981"/>
  <circle cx="143" cy="93.3" r="3.5" fill="#10b981"/>
  <circle cx="69" cy="93.3" r="3.5" fill="#ef4444"/>
  <circle cx="143" cy="120" r="3.5" fill="#ef4444"/>
  <text x="246" y="72" fill="#10b981">${L('normal: 10y−2y = +0.5', 'normal: 10y−2y = +0,5')}</text>
  <text x="246" y="112" fill="#f59e0b">${L('flat: spread 0', 'datar: spread 0')}</text>
  <text x="246" y="146" fill="#ef4444">${L('inverted: 10y−2y = −0.5', 'terbalik: 10y−2y = −0,5')}</text>
  <text x="150" y="60" class="s">${L('short rates set by the central bank;', 'bunga pendek ditentukan bank sentral;')}</text>
  <text x="150" y="71" class="s">${L('long rates reflect expected future rates', 'bunga panjang mencerminkan ekspektasi bunga mendatang')}</text>
  <text x="150" y="82" class="s">${L('plus a term premium', 'ditambah premi jangka waktu')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The yield curve plots the yield of one borrower\'s bonds against their time to maturity.',
        'A normal curve slopes upward because lenders demand a term premium for committing money longer and expect rates to stay steady or rise.',
        'Long yields embody expectations of future short rates, so when the market expects cuts, long yields can drop below short ones and the curve inverts.',
        'The 10y−2y spread is a one-number summary of the slope; its sign turning negative has preceded most US recessions, with a lag and some false alarms.',
        'The central bank controls the short end of the curve directly; the long end is set by investors\' expectations of growth, inflation and policy.',
      ],
      id: [
        'Kurva imbal hasil memplot yield obligasi satu peminjam terhadap waktu sampai jatuh temponya.',
        'Kurva normal menanjak karena pemberi pinjaman menuntut premi jangka waktu untuk mengikat uang lebih lama dan memperkirakan bunga tetap atau naik.',
        'Yield panjang memuat ekspektasi bunga pendek di masa depan, sehingga saat pasar memperkirakan pemangkasan, yield panjang bisa turun di bawah yield pendek dan kurva terbalik.',
        'Spread 10y−2y adalah ringkasan satu angka dari kemiringan; perubahan tandanya menjadi negatif telah mendahului sebagian besar resesi AS, dengan jeda dan beberapa alarm palsu.',
        'Bank sentral mengendalikan ujung pendek kurva secara langsung; ujung panjang ditentukan ekspektasi investor tentang pertumbuhan, inflasi, dan kebijakan.',
      ],
    },
    vocabulary: {
      en: [
        ['Yield', 'The yearly return earned by buying a bond at its current price and holding it to maturity.'],
        ['Maturity (tenor)', 'The time until a bond repays its face value; the horizontal axis of the curve.'],
        ['Yield curve', 'The graph of yield against maturity for bonds of the same issuer, usually the government.'],
        ['Term premium', 'The extra yield investors require for lending over a longer period, over and above expected short-term rates.'],
        ['Inverted curve', 'A yield curve in which short-maturity yields exceed long-maturity yields.'],
        ['10y−2y spread', 'The ten-year yield minus the two-year yield, in percentage points; positive for a normal curve, negative when inverted.'],
        ['Policy rate', 'The short-term interest rate set by the central bank, which anchors the short end of the curve.'],
        ['Expectations hypothesis', 'The idea that a long-term yield equals the average of the short-term rates investors expect over that period, plus any term premium.'],
      ],
      id: [
        ['Imbal hasil (yield)', 'Return tahunan yang diperoleh dengan membeli obligasi pada harga saat ini dan memegangnya sampai jatuh tempo.'],
        ['Jatuh tempo (tenor)', 'Waktu sampai obligasi mengembalikan nilai nominalnya; sumbu mendatar kurva.'],
        ['Kurva imbal hasil', 'Grafik yield terhadap tenor untuk obligasi dari penerbit yang sama, biasanya pemerintah.'],
        ['Premi jangka waktu', 'Tambahan yield yang dituntut investor untuk meminjamkan dalam periode lebih panjang, di atas bunga jangka pendek yang diharapkan.'],
        ['Kurva terbalik', 'Kurva imbal hasil dengan yield tenor pendek melebihi yield tenor panjang.'],
        ['Spread 10y−2y', 'Yield sepuluh tahun dikurangi yield dua tahun, dalam poin persentase; positif untuk kurva normal, negatif saat terbalik.'],
        ['Suku bunga acuan', 'Suku bunga jangka pendek yang ditetapkan bank sentral, yang menjangkar ujung pendek kurva.'],
        ['Hipotesis ekspektasi', 'Gagasan bahwa yield jangka panjang sama dengan rata-rata bunga jangka pendek yang diharapkan investor selama periode itu, ditambah premi jangka waktu.'],
      ],
    },
    misconceptions: {
      en: [
        ['An inverted yield curve causes a recession.', 'It reflects expectations rather than causing anything. Short rates are high because the central bank is tightening, and long yields are lower because investors expect cuts when the economy slows. The inversion is a symptom of those expectations, and it has sometimes been followed by no recession at all.'],
        ['Long-term bonds always pay more than short-term ones.', 'Usually, because of the term premium, but not always. Whenever the curve is flat or inverted, as in the sim\'s presets, two-year bonds yield as much as or more than ten-year bonds.'],
        ['The central bank sets the whole yield curve.', 'It sets the short end through its policy rate. Longer yields are set by investors trading bonds, based on what they expect policy, inflation and growth to do over the life of the bond.'],
        ['A spread of exactly zero is the official line between normal and inverted.', 'There is no official line. The sim uses its own thresholds (0.3 and −0.05 points), and analysts look at the whole shape and at other spreads, such as 10y−3-month, before drawing conclusions.'],
      ],
      id: [
        ['Kurva imbal hasil terbalik menyebabkan resesi.', 'Kurva mencerminkan ekspektasi, bukan menyebabkan apa pun. Bunga pendek tinggi karena bank sentral mengetatkan, dan yield panjang lebih rendah karena investor memperkirakan pemangkasan saat ekonomi melambat. Inversi adalah gejala ekspektasi itu, dan kadang tidak diikuti resesi sama sekali.'],
        ['Obligasi jangka panjang selalu membayar lebih dari jangka pendek.', 'Biasanya begitu, karena premi jangka waktu, tetapi tidak selalu. Setiap kali kurva datar atau terbalik, seperti pada preset simulasi, obligasi dua tahun menghasilkan sama atau lebih dari obligasi sepuluh tahun.'],
        ['Bank sentral menetapkan seluruh kurva imbal hasil.', 'Bank sentral menetapkan ujung pendek melalui suku bunga acuan. Yield yang lebih panjang ditentukan investor yang memperdagangkan obligasi, berdasarkan perkiraan mereka tentang kebijakan, inflasi, dan pertumbuhan selama umur obligasi.'],
        ['Spread tepat nol adalah garis resmi antara normal dan terbalik.', 'Tidak ada garis resmi. Simulasi memakai ambangnya sendiri (0,3 dan −0,05 poin), dan analis melihat bentuk keseluruhan serta spread lain, seperti 10y−3 bulan, sebelum menarik kesimpulan.'],
      ],
    },
    realWorld: {
      en: [
        'The US Treasury yield curve is published every trading day and the 10y−2y spread is tracked by newspapers and central banks alike; it inverted ahead of most US recessions since the 1970s.',
        'Indonesia\'s government bond (SBN) yield curve is published daily and serves as the benchmark for pricing corporate bonds and setting bank lending rates.',
        'Banks borrow short (deposits) and lend long (mortgages, business loans), so a steep curve widens their margins while a flat or inverted curve squeezes them.',
        'Mortgage and long-term loan rates follow the long end of the curve, while savings and credit-card rates follow the short end, which is why they can move in different directions.',
      ],
      id: [
        'Kurva imbal hasil US Treasury diterbitkan setiap hari perdagangan dan spread 10y−2y dipantau surat kabar maupun bank sentral; kurva itu terbalik menjelang sebagian besar resesi AS sejak 1970-an.',
        'Kurva imbal hasil Surat Berharga Negara (SBN) Indonesia diterbitkan setiap hari dan menjadi acuan untuk menetapkan harga obligasi korporasi dan suku bunga kredit bank.',
        'Bank meminjam jangka pendek (simpanan) dan meminjamkan jangka panjang (KPR, kredit usaha), sehingga kurva curam melebarkan margin mereka sementara kurva datar atau terbalik menekannya.',
        'Suku bunga KPR dan pinjaman jangka panjang mengikuti ujung panjang kurva, sementara bunga tabungan dan kartu kredit mengikuti ujung pendek, itulah sebabnya keduanya bisa bergerak berlawanan arah.',
      ],
    },
    questions: {
      en: [
        { q: 'The two-year yield is 4.5% and the ten-year yield is 5.0%. What is the 10y−2y spread, and how does the sim classify the curve?', a: 'Spread = 5.0 − 4.5 = +0.5 percentage points. That is above the sim\'s 0.3 threshold, so it reports a normal, steep curve: investors are being paid extra for lending longer.' },
        { q: 'Load the Inverted preset. What is the spread, and what story about the central bank and investors does that shape tell?', a: 'The preset puts the two-year at 5.0% and the ten-year at 4.5%, a spread of −0.5 points, so the sim flags an inversion. It suggests the central bank has raised short rates, probably to fight inflation, while investors expect those rates to be cut in the coming years, which is what usually happens when growth slows.' },
        { q: 'Under the expectations hypothesis, if one-year rates are expected to be 4% this year and 6% next year, roughly what should the two-year yield be, and why would a term premium push it higher?', a: 'Lending for two years should earn about the average of the two one-year rates, (4% + 6%) / 2 = 5%, so that investors are indifferent between one two-year bond and two successive one-year bills. A term premium adds a little on top, say 5.2%, because investors want compensation for locking money away and for the extra uncertainty of the longer commitment.' },
      ],
      id: [
        { q: 'Yield dua tahun 4,5% dan yield sepuluh tahun 5,0%. Berapa spread 10y−2y, dan bagaimana simulasi menggolongkan kurvanya?', a: 'Spread = 5,0 − 4,5 = +0,5 poin persentase. Itu di atas ambang 0,3 simulasi, sehingga ia melaporkan kurva normal yang curam: investor dibayar lebih untuk meminjamkan lebih lama.' },
        { q: 'Muat preset Inverted. Berapa spread-nya, dan cerita apa tentang bank sentral dan investor yang disampaikan bentuk itu?', a: 'Preset menempatkan yield dua tahun di 5,0% dan sepuluh tahun di 4,5%, spread −0,5 poin, sehingga simulasi menandai inversi. Ini menunjukkan bank sentral telah menaikkan bunga pendek, mungkin untuk melawan inflasi, sementara investor memperkirakan bunga itu akan dipangkas dalam beberapa tahun ke depan, yang biasanya terjadi saat pertumbuhan melambat.' },
        { q: 'Menurut hipotesis ekspektasi, jika bunga satu tahun diperkirakan 4% tahun ini dan 6% tahun depan, kira-kira berapa seharusnya yield dua tahun, dan mengapa premi jangka waktu mendorongnya lebih tinggi?', a: 'Meminjamkan selama dua tahun seharusnya menghasilkan sekitar rata-rata kedua bunga satu tahun, (4% + 6%) / 2 = 5%, sehingga investor tidak berbeda antara satu obligasi dua tahun dan dua surat utang satu tahun berturut-turut. Premi jangka waktu menambah sedikit di atasnya, misalnya 5,2%, karena investor menginginkan kompensasi untuk mengikat uang dan untuk ketidakpastian tambahan dari komitmen yang lebih panjang.' },
      ],
    },
  },
};
