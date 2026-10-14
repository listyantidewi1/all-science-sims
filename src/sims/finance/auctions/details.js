// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish first-price from second-price (Vickrey) auctions.',
      'See bidders shade bids in first-price auctions.',
      "Verify that revenue equivalence roughly holds in expectation.",
    ],
    id: [
      'Membedakan lelang harga pertama dari harga kedua (Vickrey).',
      'Melihat penawar menahan tawaran pada lelang harga pertama.',
      'Memverifikasi bahwa kesetaraan pendapatan kira-kira berlaku di harapan.',
    ],
  },
  tryThis: {
    en: [
      'N=2 bidders — average revenue should match in both formats.',
      'N=10 — does first-price approach valuation?',
      'Try truth-telling in first-price — does the seller\'s revenue rise toward the highest value?',
    ],
    id: [
      'N=2 penawar — pendapatan rata-rata sama di kedua format.',
      'N=10 — apakah harga pertama mendekati nilai sejati?',
      'Coba jujur di harga pertama — apakah pendapatan penjual naik mendekati nilai tertinggi?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An auction is a set of rules for selling one item to the bidder who wants it most, when the seller does not know how much anyone values it. In a sealed-bid first-price auction every bidder writes down one bid, the highest bid wins, and the winner pays their own bid. In a second-price auction the highest bid still wins, but the winner pays only the second-highest bid. The second format is named after William Vickrey, who showed in 1961 that it has a remarkable property: each bidder\'s best strategy is simply to bid exactly what the item is worth to them, whatever anyone else does.',
        'The reason is that in a second-price auction your bid decides only whether you win, never how much you pay. Bidding above your value risks winning at a price above what the item is worth to you; bidding below it risks losing an item you could have bought at a price you would gladly have paid; bidding your true value avoids both mistakes. In a first-price auction the same bid sets the price, so bidding your full value would guarantee a profit of zero. Rational bidders therefore shade their bids below their values, trading a smaller chance of winning for a positive profit when they do win. With n bidders whose values are independently and uniformly spread between 0 and 1, the equilibrium bid is value × (n − 1) / n: half your value with two rivals, 90% of it with ten.',
        'The sim plays this game thousands of times. Each round draws n private values uniformly between 0 and 1. In the first-price auction the bidders follow the strategy you select, shading by (n − 1) / n, bidding truthfully, or shading by a random fraction, and the winner pays their bid. In the second-price auction the bidders bid their values, as Vickrey\'s argument says they should, and the winner pays the runner-up\'s value. The two histograms show the seller\'s revenue across all rounds and report its mean. With the equilibrium strategy the two means come out almost equal, both near (n − 1) / (n + 1): this is the revenue equivalence theorem, which says that under these assumptions the seller can expect the same revenue from either format. The bidders slider shows competition at work, since more bidders push the expected winning price toward the top of the value range in both formats.',
        'The model relies on textbook assumptions. Bidders are risk-neutral, symmetric, know only their own value, and draw it from the same uniform distribution; there is no reserve price, no collusion and no common-value component such as uncertainty about what an oil lease is really worth. The shading rule (n − 1) / n is the equilibrium only for uniform values, and the sim fixes second-price bidders at truthful bidding rather than letting them deviate. Choosing truthful bidding in the first-price auction raises the seller\'s average revenue to the expected highest value, n / (n + 1), but leaves every bidder with zero profit, which is why no one would do it; it is included so you can see the cost of not shading. The histograms are built from a finite number of random rounds, so the means wobble slightly each time you press Re-run.',
      ],
      id: [
        'Lelang adalah seperangkat aturan untuk menjual satu barang kepada penawar yang paling menginginkannya, ketika penjual tidak tahu seberapa besar nilai barang itu bagi siapa pun. Dalam lelang harga pertama dengan tawaran tertutup, setiap penawar menulis satu tawaran, tawaran tertinggi menang, dan pemenang membayar tawarannya sendiri. Dalam lelang harga kedua, tawaran tertinggi tetap menang, tetapi pemenang hanya membayar tawaran tertinggi kedua. Format kedua dinamai menurut William Vickrey, yang pada 1961 menunjukkan sifat luar biasanya: strategi terbaik tiap penawar adalah menawar persis sebesar nilai barang itu bagi dirinya, apa pun yang dilakukan orang lain.',
        'Alasannya, dalam lelang harga kedua tawaranmu hanya menentukan apakah kamu menang, bukan berapa yang kamu bayar. Menawar di atas nilaimu berisiko menang dengan harga di atas nilai barang bagimu; menawar di bawahnya berisiko kehilangan barang yang sebenarnya bisa kamu beli pada harga yang rela kamu bayar; menawar nilai sejatimu menghindari kedua kesalahan itu. Dalam lelang harga pertama, tawaran yang sama menentukan harga, sehingga menawar nilai penuh menjamin keuntungan nol. Penawar rasional karenanya menahan tawaran di bawah nilainya, menukar peluang menang yang lebih kecil dengan keuntungan positif saat menang. Dengan n penawar yang nilainya tersebar bebas dan seragam antara 0 dan 1, tawaran keseimbangannya adalah nilai × (n − 1) / n: setengah nilaimu dengan dua pesaing, 90% dengan sepuluh.',
        'Simulasi memainkan permainan ini ribuan kali. Tiap putaran menarik n nilai pribadi secara seragam antara 0 dan 1. Dalam lelang harga pertama, penawar mengikuti strategi yang kamu pilih, menahan sebesar (n − 1) / n, menawar jujur, atau menahan dengan pecahan acak, dan pemenang membayar tawarannya. Dalam lelang harga kedua, penawar menawar nilainya, seperti kata argumen Vickrey, dan pemenang membayar nilai peringkat kedua. Kedua histogram menunjukkan pendapatan penjual di semua putaran dan melaporkan rata-ratanya. Dengan strategi keseimbangan, kedua rata-rata hampir sama, keduanya dekat (n − 1) / (n + 1): inilah teorema kesetaraan pendapatan, yang menyatakan bahwa dengan asumsi-asumsi ini penjual dapat mengharapkan pendapatan yang sama dari kedua format. Slider jumlah penawar memperlihatkan persaingan bekerja, karena lebih banyak penawar mendorong harga menang harapan mendekati puncak rentang nilai di kedua format.',
        'Model ini bertumpu pada asumsi buku teks. Penawar netral terhadap risiko, simetris, hanya mengetahui nilainya sendiri, dan menariknya dari distribusi seragam yang sama; tidak ada harga minimum, tidak ada kolusi, dan tidak ada komponen nilai bersama seperti ketidakpastian berapa nilai sebenarnya sebuah konsesi minyak. Aturan penahanan (n − 1) / n hanya merupakan keseimbangan untuk nilai seragam, dan simulasi menetapkan penawar harga kedua selalu jujur alih-alih membiarkan mereka menyimpang. Memilih tawaran jujur dalam lelang harga pertama menaikkan pendapatan rata-rata penjual ke nilai tertinggi harapan, n / (n + 1), tetapi menyisakan keuntungan nol bagi setiap penawar, itulah sebabnya tidak ada yang akan melakukannya; pilihan ini disertakan agar kamu bisa melihat biaya tidak menahan tawaran. Histogram dibangun dari sejumlah terbatas putaran acak, sehingga rata-ratanya sedikit bergoyang setiap kali tombol Re-run ditekan.',
      ],
    },
    figure: {
      caption: {
        en: 'One round with five bidders whose private values are the hollow circles. In the first-price auction (left) each bids 4/5 of their value and the winner pays their own shaded bid, 0.74. In the second-price auction (right) each bids their true value and the winner pays the runner-up\'s, 0.71. Averaged over many rounds both formats yield (n − 1)/(n + 1) = 0.67.',
        id: 'Satu putaran dengan lima penawar yang nilai pribadinya ditandai lingkaran kosong. Dalam lelang harga pertama (kiri) tiap penawar menawar 4/5 nilainya dan pemenang membayar tawarannya sendiri yang sudah ditahan, 0,74. Dalam lelang harga kedua (kanan) tiap penawar menawar nilai sejatinya dan pemenang membayar nilai peringkat kedua, 0,71. Dirata-ratakan atas banyak putaran, kedua format menghasilkan (n − 1)/(n + 1) = 0,67.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Bids and price paid in a first-price and a second-price auction', 'Tawaran dan harga yang dibayar dalam lelang harga pertama dan harga kedua')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.s{font-size:10px;opacity:.75}.v{fill:none;stroke:currentColor;stroke-width:1.4;opacity:.7}.col{stroke:currentColor;stroke-width:1;opacity:.25}</style>
  <line x1="40" y1="40" x2="40" y2="200" class="ax"/>
  <text x="18" y="44" class="s">1.0</text>
  <text x="18" y="124" class="s">0.5</text>
  <text x="24" y="204" class="s">0</text>
  <text x="44" y="28" class="s">${L('value / bid', 'nilai / tawaran')}</text>
  <line x1="40" y1="93.3" x2="330" y2="93.3" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="5 3"/>
  <text x="196" y="106" fill="#f59e0b" class="s">${L('expected revenue (n−1)/(n+1) = 0.67', 'pendapatan harapan (n−1)/(n+1) = 0,67')}</text>
  <line x1="110" y1="40" x2="110" y2="200" class="col"/>
  <line x1="250" y1="40" x2="250" y2="200" class="col"/>
  <text x="68" y="222" fill="#3b82f6">${L('first-price', 'harga pertama')}</text>
  <text x="62" y="234" class="s">${L('bid = 0.8 × value', 'tawaran = 0,8 × nilai')}</text>
  <text x="210" y="222" fill="#10b981">${L('second-price', 'harga kedua')}</text>
  <text x="212" y="234" class="s">${L('bid = value', 'tawaran = nilai')}</text>
  <circle cx="110" cy="52.8" r="4" class="v"/>
  <circle cx="110" cy="86.4" r="4" class="v"/>
  <circle cx="110" cy="112" r="4" class="v"/>
  <circle cx="110" cy="139.2" r="4" class="v"/>
  <circle cx="110" cy="177.6" r="4" class="v"/>
  <line x1="110" y1="52.8" x2="110" y2="82.2" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="110" cy="82.2" r="4.5" fill="#3b82f6"/>
  <circle cx="110" cy="109.1" r="3" fill="#3b82f6" opacity=".6"/>
  <circle cx="110" cy="129.6" r="3" fill="#3b82f6" opacity=".6"/>
  <circle cx="110" cy="151.4" r="3" fill="#3b82f6" opacity=".6"/>
  <circle cx="110" cy="182.1" r="3" fill="#3b82f6" opacity=".6"/>
  <text x="120" y="50" class="s">${L('value 0.92', 'nilai 0,92')}</text>
  <text x="120" y="78" fill="#3b82f6" class="s">${L('pays own bid 0.74', 'bayar tawaran sendiri 0,74')}</text>
  <text x="46" y="66" class="s" fill="#3b82f6">${L('shade ↓', 'tahan ↓')}</text>
  <circle cx="250" cy="52.8" r="4" class="v"/>
  <circle cx="250" cy="86.4" r="4" class="v"/>
  <circle cx="250" cy="112" r="4" class="v"/>
  <circle cx="250" cy="139.2" r="4" class="v"/>
  <circle cx="250" cy="177.6" r="4" class="v"/>
  <circle cx="250" cy="52.8" r="4.5" fill="#10b981"/>
  <circle cx="250" cy="86.4" r="4.5" fill="#ef4444"/>
  <text x="260" y="50" fill="#10b981" class="s">${L('winner bids 0.92', 'pemenang menawar 0,92')}</text>
  <text x="260" y="82" fill="#ef4444" class="s">${L('pays runner-up 0.71', 'bayar peringkat kedua 0,71')}</text>
  <text x="258" y="130" class="s">${L('other bidders', 'penawar lain')}</text>
  <text x="258" y="142" class="s">${L('bid their values', 'menawar nilainya')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In a second-price (Vickrey) auction bidding your true value is a dominant strategy, because your bid decides whether you win but not what you pay.',
        'In a first-price auction the winner pays their own bid, so bidders shade below their values; with n bidders and uniform values the equilibrium bid is value × (n − 1)/n.',
        'Revenue equivalence: under the standard assumptions both formats give the seller the same expected revenue, (n − 1)/(n + 1) for uniform values.',
        'More bidders mean more competition, pushing expected revenue toward the top of the value range in either format.',
        'The formats differ in how the price is set, not in who wins: in both, the bidder with the highest value takes the item.',
      ],
      id: [
        'Dalam lelang harga kedua (Vickrey), menawar nilai sejatimu adalah strategi dominan, karena tawaranmu menentukan apakah kamu menang tetapi bukan berapa yang kamu bayar.',
        'Dalam lelang harga pertama pemenang membayar tawarannya sendiri, sehingga penawar menahan tawaran di bawah nilainya; dengan n penawar dan nilai seragam, tawaran keseimbangannya nilai × (n − 1)/n.',
        'Kesetaraan pendapatan: dengan asumsi baku, kedua format memberi penjual pendapatan harapan yang sama, (n − 1)/(n + 1) untuk nilai seragam.',
        'Lebih banyak penawar berarti persaingan lebih ketat, mendorong pendapatan harapan mendekati puncak rentang nilai di kedua format.',
        'Kedua format berbeda dalam cara harga ditetapkan, bukan siapa yang menang: pada keduanya, penawar dengan nilai tertinggi mendapatkan barangnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Private value', 'How much the item is worth to one particular bidder; known to them but not to the others.'],
        ['First-price sealed-bid auction', 'Bidders submit one bid each; the highest wins and pays their own bid.'],
        ['Second-price (Vickrey) auction', 'Bidders submit one bid each; the highest wins but pays the second-highest bid.'],
        ['Bid shading', 'Deliberately bidding below your value to earn a profit when you win, at the cost of winning less often.'],
        ['Dominant strategy', 'A choice that is best for a player no matter what the other players do; truthful bidding in a Vickrey auction is one.'],
        ['Revenue equivalence', 'The theorem that, with risk-neutral bidders and independent values, standard auction formats yield the same expected revenue.'],
        ['Equilibrium', 'A set of strategies, one per bidder, from which no bidder can gain by changing their own strategy alone.'],
        ['Expected value', 'The long-run average of a random quantity; the histogram means estimate the expected revenue.'],
      ],
      id: [
        ['Nilai pribadi', 'Seberapa besar nilai barang bagi satu penawar tertentu; diketahui olehnya tetapi tidak oleh yang lain.'],
        ['Lelang harga pertama tertutup', 'Tiap penawar mengajukan satu tawaran; yang tertinggi menang dan membayar tawarannya sendiri.'],
        ['Lelang harga kedua (Vickrey)', 'Tiap penawar mengajukan satu tawaran; yang tertinggi menang tetapi membayar tawaran tertinggi kedua.'],
        ['Penahanan tawaran (bid shading)', 'Sengaja menawar di bawah nilaimu untuk memperoleh keuntungan saat menang, dengan risiko lebih jarang menang.'],
        ['Strategi dominan', 'Pilihan yang terbaik bagi seorang pemain apa pun yang dilakukan pemain lain; tawaran jujur dalam lelang Vickrey adalah salah satunya.'],
        ['Kesetaraan pendapatan', 'Teorema bahwa, dengan penawar netral risiko dan nilai saling bebas, format lelang baku menghasilkan pendapatan harapan yang sama.'],
        ['Keseimbangan', 'Sekumpulan strategi, satu per penawar, yang tidak seorang pun penawar bisa diuntungkan dengan mengubah strateginya sendiri saja.'],
        ['Nilai harapan', 'Rata-rata jangka panjang suatu besaran acak; rata-rata histogram menaksir pendapatan harapan.'],
      ],
    },
    misconceptions: {
      en: [
        ['The second-price auction must earn the seller less, because the winner pays less than their bid.', 'The winner pays less than their bid, but bidders bid more (their full value) than they would in a first-price auction. The two effects cancel on average, which is what the matching histogram means show.'],
        ['In a first-price auction, bidding your true value is the honest and therefore best strategy.', 'It guarantees zero profit: you pay exactly what the item is worth to you. Shading below your value is the rational response, and the sim\'s truthful option shows it hands all the surplus to the seller.'],
        ['In a Vickrey auction you can gain by bidding a little above your value to win more often.', 'The extra wins are exactly the cases where the second-highest bid is above your value, so you pay more than the item is worth to you. Overbidding can only hurt.'],
        ['Shading by (n − 1)/n is always the right amount.', 'That formula is the equilibrium only for values drawn uniformly, with symmetric, risk-neutral bidders. Different value distributions, risk aversion or asymmetric bidders change the optimal shading.'],
      ],
      id: [
        ['Lelang harga kedua pasti memberi penjual lebih sedikit, karena pemenang membayar kurang dari tawarannya.', 'Pemenang memang membayar kurang dari tawarannya, tetapi penawar menawar lebih tinggi (nilai penuhnya) daripada dalam lelang harga pertama. Kedua efek itu saling meniadakan secara rata-rata, itulah yang ditunjukkan rata-rata histogram yang hampir sama.'],
        ['Dalam lelang harga pertama, menawar nilai sejati adalah strategi yang jujur dan karenanya terbaik.', 'Itu menjamin keuntungan nol: kamu membayar persis sebesar nilai barang bagimu. Menahan tawaran di bawah nilai adalah respons rasional, dan pilihan jujur di simulasi menunjukkan seluruh surplus beralih ke penjual.'],
        ['Dalam lelang Vickrey kamu bisa untung dengan menawar sedikit di atas nilaimu agar lebih sering menang.', 'Kemenangan tambahan itu persis kasus ketika tawaran tertinggi kedua berada di atas nilaimu, sehingga kamu membayar lebih dari nilai barang bagimu. Menawar berlebihan hanya bisa merugikan.'],
        ['Menahan sebesar (n − 1)/n selalu jumlah yang tepat.', 'Rumus itu hanya keseimbangan untuk nilai yang ditarik seragam, dengan penawar simetris dan netral risiko. Distribusi nilai yang berbeda, keengganan terhadap risiko, atau penawar yang tidak simetris mengubah penahanan optimalnya.'],
      ],
    },
    realWorld: {
      en: [
        'Online advertising slots were long sold through second-price auctions run automatically every time a page loads, precisely because truthful bidding makes the system simple for advertisers.',
        'Governments sell radio-spectrum licences and treasury bonds by auction, and the design of those auctions, built on the theory in this sim, has raised many billions of dollars.',
        'Sealed-bid tenders for construction contracts are first-price auctions in reverse: the lowest bid wins and is paid, so contractors shade their bids upward above cost.',
        'William Vickrey received the Nobel Memorial Prize in Economics in 1996, and Paul Milgrom and Robert Wilson received it in 2020 for improvements to auction theory and the design of new auction formats.',
      ],
      id: [
        'Slot iklan daring lama dijual melalui lelang harga kedua yang dijalankan otomatis setiap kali halaman dimuat, justru karena tawaran jujur membuat sistemnya sederhana bagi pengiklan.',
        'Pemerintah menjual izin spektrum radio dan surat utang negara melalui lelang, dan rancangan lelang itu, yang dibangun di atas teori dalam simulasi ini, telah menghasilkan miliaran dolar.',
        'Tender tertutup untuk kontrak konstruksi adalah lelang harga pertama yang dibalik: tawaran terendah menang dan dibayar, sehingga kontraktor menahan tawarannya ke atas melebihi biaya.',
        'William Vickrey menerima Hadiah Nobel Ekonomi pada 1996, dan Paul Milgrom serta Robert Wilson menerimanya pada 2020 atas penyempurnaan teori lelang dan rancangan format lelang baru.',
      ],
    },
    questions: {
      en: [
        { q: 'Five bidders have values drawn uniformly between 0 and 1. What average revenue should the sim show for each format when the first-price bidders shade optimally?', a: 'The expected second-highest of five uniform values is (n − 1)/(n + 1) = 4/6 ≈ 0.667, which is the second-price revenue. In the first-price auction the winner bids 4/5 of the highest value, whose expectation is n/(n + 1) = 5/6, giving 4/5 × 5/6 = 4/6 ≈ 0.667 as well. The two histogram means should agree to within random noise.' },
        { q: 'In a second-price auction your value is 0.60. Explain why bidding 0.70 or 0.50 can never do better than bidding 0.60.', a: 'Your bid only affects whether you win; the price is the runner-up\'s bid. Bidding 0.70 changes the outcome only when the runner-up is between 0.60 and 0.70, and then you win and pay more than 0.60, a loss. Bidding 0.50 changes the outcome only when the runner-up is between 0.50 and 0.60, and then you lose an item you could have had for less than 0.60, a missed profit. Bidding 0.60 avoids both.' },
        { q: 'Switch the first-price strategy to truthful bidding. Why does the seller\'s mean revenue rise, and why would real bidders never do this?', a: 'With truthful bids the winner pays the highest value itself, whose expectation is n/(n + 1), 0.833 for five bidders, instead of 0.667. But paying your full value leaves you exactly zero profit whether you win or lose, so every bidder would prefer to shade; the extra revenue is simply the bidders\' surplus handed to the seller.' },
      ],
      id: [
        { q: 'Lima penawar punya nilai yang ditarik seragam antara 0 dan 1. Berapa pendapatan rata-rata yang seharusnya ditunjukkan simulasi untuk tiap format saat penawar harga pertama menahan secara optimal?', a: 'Nilai tertinggi kedua harapan dari lima nilai seragam adalah (n − 1)/(n + 1) = 4/6 ≈ 0,667, yaitu pendapatan harga kedua. Dalam lelang harga pertama pemenang menawar 4/5 dari nilai tertinggi, yang harapannya n/(n + 1) = 5/6, memberi 4/5 × 5/6 = 4/6 ≈ 0,667 juga. Kedua rata-rata histogram seharusnya cocok dalam batas derau acak.' },
        { q: 'Dalam lelang harga kedua nilaimu 0,60. Jelaskan mengapa menawar 0,70 atau 0,50 tidak pernah bisa lebih baik daripada menawar 0,60.', a: 'Tawaranmu hanya memengaruhi apakah kamu menang; harganya adalah tawaran peringkat kedua. Menawar 0,70 mengubah hasil hanya saat peringkat kedua berada antara 0,60 dan 0,70, dan saat itu kamu menang tetapi membayar lebih dari 0,60, sebuah kerugian. Menawar 0,50 mengubah hasil hanya saat peringkat kedua berada antara 0,50 dan 0,60, dan saat itu kamu kehilangan barang yang bisa kamu dapat dengan harga di bawah 0,60, keuntungan yang hilang. Menawar 0,60 menghindari keduanya.' },
        { q: 'Ganti strategi harga pertama ke tawaran jujur. Mengapa pendapatan rata-rata penjual naik, dan mengapa penawar sungguhan tidak akan pernah melakukannya?', a: 'Dengan tawaran jujur pemenang membayar nilai tertinggi itu sendiri, yang harapannya n/(n + 1), yaitu 0,833 untuk lima penawar, alih-alih 0,667. Tetapi membayar nilai penuh menyisakan keuntungan tepat nol baik menang maupun kalah, sehingga setiap penawar lebih memilih menahan; pendapatan tambahan itu hanyalah surplus penawar yang diserahkan kepada penjual.' },
      ],
    },
  },
};
