// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read equilibrium price and quantity from a market diagram.',
      'Predict the effect of demand or supply shifts.',
      'Distinguish a binding from a non-binding price control.',
    ],
    id: [
      'Membaca harga dan jumlah keseimbangan dari diagram pasar.',
      'Memprediksi efek pergeseran permintaan atau penawaran.',
      'Membedakan kebijakan harga yang mengikat dan yang tidak.',
    ],
  },
  tryThis: {
    en: [
      'Shift demand right — what happens to price and quantity?',
      'Set a price ceiling below equilibrium. How big is the shortage?',
      'Find a price floor that doesn\'t change the market at all.',
    ],
    id: [
      'Geser permintaan ke kanan — apa yang terjadi pada harga dan jumlah?',
      'Tetapkan harga maksimum di bawah keseimbangan. Seberapa besar kekurangannya?',
      'Cari harga minimum yang tidak mengubah pasar sama sekali.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A market diagram puts price on the vertical axis and quantity on the horizontal one. The demand curve shows how much buyers want to buy at each price; it slopes down because at a higher price fewer people want the good and those who do want less of it. The supply curve shows how much sellers are willing to sell at each price; it slopes up because a higher price covers the costs of more producers and tempts each to make more. Where the two lines cross, buyers\' plans and sellers\' plans match exactly. That point is the equilibrium, with price P* and quantity Q*. At any higher price sellers would offer more than buyers take and unsold stock pushes the price down; at any lower price buyers want more than is available and competition among them pushes the price up.',
        'The sim uses straight lines. Demand is P = a − b·Q and supply is P = c + d·Q, so setting them equal gives Q* = (a − c)/(b + d) and P* follows from either line. With the default values a = 100, b = 1, c = 10 and d = 0.8 the equilibrium is Q* = 90/1.8 = 50 and P* = 50. The demand intercept a is the most anyone would pay for the first unit; raising it shifts the whole demand line outward, which is what happens when incomes rise, a product becomes fashionable, or more buyers enter the market. The demand slope b says how quickly quantity falls as price rises; a larger b makes the line steeper, so buyers are less responsive to price. The supply intercept c is the lowest price at which anyone will produce, roughly the cost of the cheapest unit; a higher c shifts supply up, as a tax or a rise in input costs would. The supply slope d plays the same role for sellers.',
        'A price ceiling is a legal maximum price, such as rent control. It only matters, or binds, when it is set below P*. Then, at the ceiling price, buyers want Qd = (a − pc)/b units but sellers offer only Qs = (pc − c)/d, and the difference is a shortage. With the default curves a ceiling of 30 gives Qd = 70 and Qs = 25, a shortage of 45 units, which the sim shades in red. A price floor, such as a minimum wage or a farm price support, is a legal minimum and binds only when set above P*; then Qs exceeds Qd and the gap is a surplus, shaded purple. In both cases the quantity actually traded is the smaller of the two amounts, the so-called short side of the market. A control set on the wrong side of P*, a ceiling above it or a floor below it, is drawn as a dashed line but changes nothing.',
        'The model leaves out a great deal. Real demand and supply curves bend rather than run straight, and the sim shows only the final equilibrium, not the path of haggling and inventory changes by which a market gets there. It assumes many small buyers and sellers of one identical good, so no one can set the price alone. Taxes, subsidies and production costs can only be imitated by moving the supply intercept c. Finally, the real consequences of binding controls, such as queues, black markets, reduced quality or informal payments, are not modelled; the sim measures a shortage or surplus only as a number of units.',
      ],
      id: [
        'Diagram pasar menempatkan harga pada sumbu tegak dan jumlah pada sumbu datar. Kurva permintaan menunjukkan berapa banyak yang ingin dibeli pembeli pada tiap harga; kurvanya menurun karena pada harga lebih tinggi lebih sedikit orang yang menginginkan barang itu dan yang masih ingin pun membeli lebih sedikit. Kurva penawaran menunjukkan berapa banyak yang bersedia dijual penjual pada tiap harga; kurvanya menaik karena harga yang lebih tinggi menutup biaya lebih banyak produsen dan mendorong tiap produsen membuat lebih banyak. Di titik kedua garis berpotongan, rencana pembeli dan rencana penjual tepat sama. Itulah keseimbangan, dengan harga P* dan jumlah Q*. Pada harga yang lebih tinggi penjual menawarkan lebih banyak daripada yang diambil pembeli dan stok tak terjual menekan harga turun; pada harga yang lebih rendah pembeli menginginkan lebih banyak daripada yang tersedia dan persaingan di antara mereka mendorong harga naik.',
        'Simulasi memakai garis lurus. Permintaan P = a − b·Q dan penawaran P = c + d·Q, sehingga menyamakan keduanya memberi Q* = (a − c)/(b + d) dan P* diperoleh dari salah satu garis. Dengan nilai bawaan a = 100, b = 1, c = 10 dan d = 0,8 keseimbangannya Q* = 90/1,8 = 50 dan P* = 50. Perpotongan permintaan a adalah harga tertinggi yang bersedia dibayar siapa pun untuk unit pertama; menaikkannya menggeser seluruh garis permintaan ke luar, seperti yang terjadi ketika pendapatan naik, suatu produk menjadi tren, atau lebih banyak pembeli masuk pasar. Kemiringan permintaan b menyatakan seberapa cepat jumlah turun saat harga naik; b yang lebih besar membuat garis lebih curam, sehingga pembeli kurang peka terhadap harga. Perpotongan penawaran c adalah harga terendah yang membuat seseorang mau berproduksi, kira-kira biaya unit termurah; c yang lebih tinggi menggeser penawaran ke atas, seperti pengaruh pajak atau kenaikan harga bahan baku. Kemiringan penawaran d memainkan peran yang sama bagi penjual.',
        'Harga maksimum (ceiling) adalah batas atas harga yang ditetapkan hukum, misalnya pengendalian harga sewa. Batas itu hanya berpengaruh, atau mengikat, jika ditetapkan di bawah P*. Pada harga maksimum tersebut pembeli menginginkan Qd = (a − pc)/b unit tetapi penjual hanya menawarkan Qs = (pc − c)/d, dan selisihnya adalah kekurangan (shortage). Dengan kurva bawaan, harga maksimum 30 memberi Qd = 70 dan Qs = 25, kekurangan 45 unit, yang diarsir merah oleh simulasi. Harga minimum (floor), misalnya upah minimum atau harga dasar gabah, adalah batas bawah dan hanya mengikat jika ditetapkan di atas P*; saat itu Qs melebihi Qd dan selisihnya adalah surplus, diarsir ungu. Dalam kedua kasus, jumlah yang benar-benar diperdagangkan adalah yang lebih kecil dari keduanya, yang disebut sisi pendek pasar. Kebijakan harga yang berada di sisi yang salah dari P*, yaitu harga maksimum di atasnya atau harga minimum di bawahnya, tetap digambar sebagai garis putus-putus tetapi tidak mengubah apa pun.',
        'Model ini mengabaikan banyak hal. Kurva permintaan dan penawaran yang sesungguhnya melengkung, bukan lurus, dan simulasi hanya menampilkan keseimbangan akhir, bukan proses tawar-menawar dan perubahan stok yang membawa pasar ke sana. Model ini mengasumsikan banyak pembeli dan penjual kecil untuk satu barang yang identik, sehingga tidak ada yang bisa menentukan harga sendirian. Pajak, subsidi, dan biaya produksi hanya bisa ditiru dengan menggeser perpotongan penawaran c. Terakhir, akibat nyata dari kebijakan harga yang mengikat, seperti antrean, pasar gelap, penurunan mutu, atau pungutan tak resmi, tidak dimodelkan; simulasi mengukur kekurangan atau surplus hanya sebagai jumlah unit.',
      ],
    },
    figure: {
      caption: {
        en: 'The default market: demand P = 100 − Q and supply P = 10 + 0.8Q cross at P* = 50, Q* = 50. A price ceiling of 30 is binding: buyers want 70 units, sellers offer 25, so 45 units are short.',
        id: 'Pasar bawaan: permintaan P = 100 − Q dan penawaran P = 10 + 0,8Q berpotongan di P* = 50, Q* = 50. Harga maksimum 30 bersifat mengikat: pembeli ingin 70 unit, penjual menawarkan 25, sehingga kekurangannya 45 unit.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const X = (q) => 40 + q * 3, Y = (p) => 220 - p * (200 / 110);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Supply and demand with a binding price ceiling', 'Penawaran dan permintaan dengan harga maksimum yang mengikat')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.s{font-size:10px;opacity:.8}</style>
  <line x1="${X(0)}" y1="${Y(0)}" x2="${X(100)}" y2="${Y(0)}" stroke="currentColor" stroke-width="1.2"/>
  <line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(110)}" stroke="currentColor" stroke-width="1.2"/>
  <text x="${X(100)}" y="${Y(0) + 14}" text-anchor="end" class="s">Q</text>
  <text x="${X(0) - 6}" y="${Y(110) + 8}" text-anchor="end" class="s">P</text>
  <line x1="${X(0)}" y1="${Y(100)}" x2="${X(100)}" y2="${Y(0)}" stroke="#f59e0b" stroke-width="2.5"/>
  <text x="${X(100) - 4}" y="${Y(0) - 6}" text-anchor="end" fill="#f59e0b" style="font-weight:600">D</text>
  <line x1="${X(0)}" y1="${Y(10)}" x2="${X(100)}" y2="${Y(90)}" stroke="#3b82f6" stroke-width="2.5"/>
  <text x="${X(100) - 4}" y="${Y(90) - 6}" text-anchor="end" fill="#3b82f6" style="font-weight:600">S</text>
  <line x1="${X(0)}" y1="${Y(50)}" x2="${X(50)}" y2="${Y(50)}" class="m" stroke-dasharray="3 3"/>
  <line x1="${X(50)}" y1="${Y(50)}" x2="${X(50)}" y2="${Y(0)}" class="m" stroke-dasharray="3 3"/>
  <circle cx="${X(50)}" cy="${Y(50)}" r="5" fill="#10b981"/>
  <text x="${X(50) + 8}" y="${Y(50) - 6}" fill="#10b981" style="font-weight:600">P* = 50, Q* = 50</text>
  <text x="${X(0) - 6}" y="${Y(50) + 4}" text-anchor="end" class="s">50</text>
  <text x="${X(50)}" y="${Y(0) + 14}" text-anchor="middle" class="s">50</text>
  <line x1="${X(0)}" y1="${Y(30)}" x2="${X(100)}" y2="${Y(30)}" stroke="#ef4444" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="${X(0) - 6}" y="${Y(30) + 4}" text-anchor="end" class="s" fill="#ef4444">30</text>
  <text x="${X(100)}" y="${Y(30) - 6}" text-anchor="end" class="s" fill="#ef4444">${L('price ceiling', 'harga maksimum')}</text>
  <circle cx="${X(25)}" cy="${Y(30)}" r="4" fill="#3b82f6"/>
  <circle cx="${X(70)}" cy="${Y(30)}" r="4" fill="#f59e0b"/>
  <rect x="${X(25)}" y="${Y(30) + 10}" width="${X(70) - X(25)}" height="14" fill="#ef4444" opacity=".25"/>
  <text x="${X(47.5)}" y="${Y(30) + 21}" text-anchor="middle" class="s" fill="#ef4444">${L('shortage = 70 − 25 = 45', 'kekurangan = 70 − 25 = 45')}</text>
  <line x1="${X(25)}" y1="${Y(30)}" x2="${X(25)}" y2="${Y(0)}" class="m" stroke-dasharray="3 3"/>
  <line x1="${X(70)}" y1="${Y(30)}" x2="${X(70)}" y2="${Y(0)}" class="m" stroke-dasharray="3 3"/>
  <text x="${X(25)}" y="${Y(0) + 14}" text-anchor="middle" class="s" fill="#3b82f6">Qs = 25</text>
  <text x="${X(70)}" y="${Y(0) + 14}" text-anchor="middle" class="s" fill="#f59e0b">Qd = 70</text>
  <text x="${X(0) - 6}" y="${Y(100) + 4}" text-anchor="end" class="s">100</text>
  <text x="${X(0) - 6}" y="${Y(10) + 4}" text-anchor="end" class="s">10</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Equilibrium is the price at which the quantity buyers want equals the quantity sellers offer; any other price creates pressure back toward it.',
        'Shifting demand outward raises both price and quantity; shifting supply up (higher costs) raises price but lowers quantity.',
        'A price ceiling binds only when set below the equilibrium price, and then causes a shortage; a price floor binds only above it, and then causes a surplus.',
        'The quantity actually traded under a binding control is the smaller of quantity demanded and quantity supplied.',
        'Steeper curves (larger b or d) mean buyers or sellers respond less to price, so the same shift moves price more and quantity less.',
      ],
      id: [
        'Keseimbangan adalah harga ketika jumlah yang diinginkan pembeli sama dengan jumlah yang ditawarkan penjual; harga lain menimbulkan tekanan kembali ke titik itu.',
        'Menggeser permintaan ke luar menaikkan harga dan jumlah; menggeser penawaran ke atas (biaya lebih tinggi) menaikkan harga tetapi menurunkan jumlah.',
        'Harga maksimum hanya mengikat jika ditetapkan di bawah harga keseimbangan, dan saat itu menimbulkan kekurangan; harga minimum hanya mengikat di atasnya, dan saat itu menimbulkan surplus.',
        'Jumlah yang benar-benar diperdagangkan di bawah kebijakan harga yang mengikat adalah yang lebih kecil antara jumlah yang diminta dan yang ditawarkan.',
        'Kurva yang lebih curam (b atau d lebih besar) berarti pembeli atau penjual kurang tanggap terhadap harga, sehingga pergeseran yang sama lebih mengubah harga dan kurang mengubah jumlah.',
      ],
    },
    vocabulary: {
      en: [
        ['Demand curve', 'The quantity buyers are willing to buy at each price; it slopes downward.'],
        ['Supply curve', 'The quantity sellers are willing to sell at each price; it slopes upward.'],
        ['Equilibrium (P*, Q*)', 'The price and quantity where the two curves cross and the market clears.'],
        ['Shift versus pivot', 'Changing an intercept (a or c) moves a curve sideways; changing a slope (b or d) tilts it around its intercept.'],
        ['Price ceiling', 'A legal maximum price; binding only if below P*, producing a shortage.'],
        ['Price floor', 'A legal minimum price; binding only if above P*, producing a surplus.'],
        ['Shortage', 'Quantity demanded minus quantity supplied at a price below equilibrium.'],
        ['Surplus', 'Quantity supplied minus quantity demanded at a price above equilibrium.'],
      ],
      id: [
        ['Kurva permintaan', 'Jumlah yang bersedia dibeli pembeli pada tiap harga; menurun ke kanan.'],
        ['Kurva penawaran', 'Jumlah yang bersedia dijual penjual pada tiap harga; menaik ke kanan.'],
        ['Keseimbangan (P*, Q*)', 'Harga dan jumlah tempat kedua kurva berpotongan dan pasar habis terjual.'],
        ['Geser versus putar', 'Mengubah perpotongan (a atau c) memindahkan kurva ke samping; mengubah kemiringan (b atau d) memiringkannya di sekitar perpotongannya.'],
        ['Harga maksimum (ceiling)', 'Batas atas harga menurut hukum; hanya mengikat jika di bawah P*, menimbulkan kekurangan.'],
        ['Harga minimum (floor)', 'Batas bawah harga menurut hukum; hanya mengikat jika di atas P*, menimbulkan surplus.'],
        ['Kekurangan (shortage)', 'Jumlah yang diminta dikurangi jumlah yang ditawarkan pada harga di bawah keseimbangan.'],
        ['Surplus', 'Jumlah yang ditawarkan dikurangi jumlah yang diminta pada harga di atas keseimbangan.'],
      ],
    },
    misconceptions: {
      en: [
        ['A price ceiling always lowers the price people pay.', 'Only if it is set below the equilibrium price, and even then it lowers the listed price while creating a shortage: some buyers who would have bought at P* now get nothing. A ceiling above P* changes nothing at all.'],
        ['When demand rises, the price goes up and so quantity demanded must fall.', 'A rise in demand shifts the whole curve; the new equilibrium has both a higher price and a higher quantity. The fall in quantity when price rises happens along a fixed curve, which is a different situation.'],
        ['A shortage means the good has run out.', 'A shortage is the gap between what buyers want and what sellers offer at the controlled price. Sellers still sell Qs units; the problem is that Qd − Qs buyers go without, and in a free market the price would rise until that gap closed.'],
        ['Price floors help every seller.', 'Sellers who still find buyers receive a higher price, but the surplus means some sellers cannot sell at all. Which sellers lose is not decided by the price, so floors are usually paired with government purchases or quotas.'],
      ],
      id: [
        ['Harga maksimum selalu menurunkan harga yang dibayar orang.', 'Hanya jika ditetapkan di bawah harga keseimbangan, dan saat itu pun ia menurunkan harga resmi sambil menciptakan kekurangan: sebagian pembeli yang tadinya bisa membeli pada P* kini tidak mendapat apa-apa. Harga maksimum di atas P* tidak mengubah apa pun.'],
        ['Jika permintaan naik, harga naik, sehingga jumlah yang diminta pasti turun.', 'Kenaikan permintaan menggeser seluruh kurva; keseimbangan baru punya harga lebih tinggi sekaligus jumlah lebih besar. Penurunan jumlah saat harga naik terjadi di sepanjang kurva yang tetap, dan itu situasi yang berbeda.'],
        ['Kekurangan berarti barangnya habis.', 'Kekurangan adalah selisih antara yang diinginkan pembeli dan yang ditawarkan penjual pada harga yang dikendalikan. Penjual tetap menjual Qs unit; masalahnya, Qd − Qs pembeli tidak mendapat barang, dan di pasar bebas harga akan naik sampai selisih itu tertutup.'],
        ['Harga minimum menolong semua penjual.', 'Penjual yang masih menemukan pembeli menerima harga lebih tinggi, tetapi surplus berarti sebagian penjual tidak bisa menjual sama sekali. Siapa yang kalah tidak ditentukan oleh harga, sehingga harga minimum biasanya dipasangkan dengan pembelian pemerintah atau kuota.'],
      ],
    },
    realWorld: {
      en: [
        'Rent control in large cities is a price ceiling: rents are lower for those who find a flat, but waiting lists and fewer new rentals show the shortage.',
        'Minimum wages are a price floor in the labour market; economists debate how large the resulting surplus of job-seekers is, since labour demand may be steep.',
        'Governments that guarantee farmers a minimum price for rice or sugar end up buying the surplus and storing it.',
        'A harvest failure shifts a crop\'s supply curve up, which is why vegetable prices spike after floods even though demand has not changed.',
      ],
      id: [
        'Pengendalian harga sewa di kota besar adalah harga maksimum: sewa lebih murah bagi yang mendapat rumah, tetapi daftar tunggu dan berkurangnya hunian sewa baru menunjukkan kekurangannya.',
        'Upah minimum adalah harga minimum di pasar tenaga kerja; para ekonom berdebat seberapa besar surplus pencari kerja yang ditimbulkannya, karena permintaan tenaga kerja bisa curam.',
        'Pemerintah yang menjamin harga dasar gabah atau gula bagi petani akhirnya membeli dan menyimpan surplusnya.',
        'Gagal panen menggeser kurva penawaran suatu komoditas ke atas, itulah sebabnya harga sayur melonjak setelah banjir meskipun permintaan tidak berubah.',
      ],
    },
    questions: {
      en: [
        { q: 'Start from the default curves (a = 100, b = 1, c = 10, d = 0.8) and raise the demand intercept to a = 120. What are the new P* and Q*?', a: 'Q* = (120 − 10)/(1 + 0.8) = 110/1.8 ≈ 61.1 and P* = 120 − 61.1 ≈ 58.9. Both rise, as they must when demand shifts outward along an upward-sloping supply curve.' },
        { q: 'With the default curves, a price floor is set at 70. How large is the surplus? What if the floor were set at 40 instead?', a: 'At 70, quantity demanded is (100 − 70)/1 = 30 and quantity supplied is (70 − 10)/0.8 = 75, so the surplus is 45 units. A floor of 40 lies below P* = 50, so it is not binding: the market stays at its equilibrium and nothing changes.' },
        { q: 'Input costs rise and the supply intercept moves from c = 10 to c = 30. How do P* and Q* change, and does the price rise by the full 20?', a: 'Q* = (100 − 30)/1.8 ≈ 38.9 and P* = 100 − 38.9 ≈ 61.1, so price rises by about 11.1 and quantity falls by about 11.1. The price rises by less than the 20-unit cost increase because buyers cut back; the burden is shared between buyers, who pay more, and sellers, who sell less and keep less per unit after costs.' },
      ],
      id: [
        { q: 'Mulai dari kurva bawaan (a = 100, b = 1, c = 10, d = 0,8) lalu naikkan perpotongan permintaan ke a = 120. Berapa P* dan Q* yang baru?', a: 'Q* = (120 − 10)/(1 + 0,8) = 110/1,8 ≈ 61,1 dan P* = 120 − 61,1 ≈ 58,9. Keduanya naik, seperti seharusnya ketika permintaan bergeser ke luar di sepanjang kurva penawaran yang menaik.' },
        { q: 'Dengan kurva bawaan, harga minimum ditetapkan 70. Berapa besar surplusnya? Bagaimana jika harga minimumnya 40?', a: 'Pada 70, jumlah yang diminta (100 − 70)/1 = 30 dan jumlah yang ditawarkan (70 − 10)/0,8 = 75, sehingga surplusnya 45 unit. Harga minimum 40 berada di bawah P* = 50, jadi tidak mengikat: pasar tetap di keseimbangannya dan tidak ada yang berubah.' },
        { q: 'Biaya bahan baku naik dan perpotongan penawaran bergeser dari c = 10 ke c = 30. Bagaimana P* dan Q* berubah, dan apakah harga naik sebesar 20 penuh?', a: 'Q* = (100 − 30)/1,8 ≈ 38,9 dan P* = 100 − 38,9 ≈ 61,1, jadi harga naik sekitar 11,1 dan jumlah turun sekitar 11,1. Harga naik kurang dari kenaikan biaya 20 karena pembeli mengurangi pembelian; bebannya dibagi antara pembeli, yang membayar lebih, dan penjual, yang menjual lebih sedikit dan menerima lebih sedikit per unit setelah biaya.' },
      ],
    },
  },
};
