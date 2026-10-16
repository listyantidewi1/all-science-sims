// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Recognise Indonesian coins and notes from Rp 500 to Rp 100,000 and count out change from a Rp 20,000 note.',
      'Sort things into needs and wants, and decide which to buy now, save for later or skip.',
      'Explain how saving a little each week adds up to reach a bigger goal.',
    ],
    id: [
      'Mengenali koin dan uang kertas rupiah dari Rp 500 sampai Rp 100.000 dan menghitung kembalian dari uang Rp 20.000.',
      'Mengelompokkan barang menjadi kebutuhan dan keinginan, dan memutuskan mana yang dibeli sekarang, disimpan untuk nanti, atau dilewati.',
      'Menjelaskan bagaimana menabung sedikit setiap minggu bisa terkumpul untuk mencapai tujuan yang lebih besar.',
    ],
  },
  tryThis: {
    en: [
      'Buy only the needs this week. How much goes into the jar? How many weeks until you reach the goal?',
      'Try to buy everything. What does the screen say? Which items would you give up first?',
      'Buy items that cost exactly Rp 13,000 in total. Which notes and coins come back as change from Rp 20,000?',
      'Pick the school bag as your goal. Find a plan that reaches it in 6 weeks or fewer.',
    ],
    id: [
      'Beli hanya kebutuhan minggu ini. Berapa yang masuk celengan? Berapa minggu sampai tujuanmu tercapai?',
      'Coba beli semuanya. Apa yang dikatakan layar? Barang mana yang akan kamu lepaskan dulu?',
      'Beli barang yang jumlahnya tepat Rp 13.000. Uang kertas dan koin apa yang kembali dari Rp 20.000?',
      'Pilih tas sekolah sebagai tujuanmu. Temukan rencana yang mencapainya dalam 6 minggu atau kurang.',
    ],
  },

  learn: {
    background: {
      en: [
        'Money is what we use to buy things. Indonesia uses the rupiah (Rp). Coins come in Rp 500 and Rp 1,000 (there are smaller coins too, but you rarely see them in shops now). Notes come in Rp 1,000, Rp 2,000, Rp 5,000, Rp 10,000, Rp 20,000, Rp 50,000 and Rp 100,000. Each note has its own colour and a picture of an Indonesian hero, so you can tell them apart quickly. When you pay with a note that is bigger than the price, the shopkeeper gives you the difference back as change.',
        'A need is something you must have, like a pencil for school or the bus fare to get there. A want is something that is nice to have, like a comic or an ice cream. Pocket money is usually not enough for everything, so you have to choose. A good plan pays for needs first, then decides about wants. Saying "later" to a want is not the same as "never": you can save up and buy it when you have enough.',
        'The money you do not spend is saved. In the sim it goes into a jar that fills up towards a goal you choose. Saving is slow at first, but it adds up: Rp 10,000 a week becomes Rp 40,000 in a month and Rp 120,000 in three months. The sim shows how many weeks it will take to reach your goal at your current speed, so you can see how each choice today changes what you can afford later.',
      ],
      id: [
        'Uang adalah alat yang kita pakai untuk membeli barang. Indonesia memakai rupiah (Rp). Koin ada Rp 500 dan Rp 1.000 (ada koin yang lebih kecil juga, tetapi sekarang jarang terlihat di toko). Uang kertas ada Rp 1.000, Rp 2.000, Rp 5.000, Rp 10.000, Rp 20.000, Rp 50.000, dan Rp 100.000. Setiap uang kertas punya warna sendiri dan gambar pahlawan Indonesia, jadi mudah dibedakan dengan cepat. Saat kamu membayar dengan uang yang lebih besar daripada harganya, penjual mengembalikan selisihnya sebagai uang kembalian.',
        'Kebutuhan adalah sesuatu yang harus kamu miliki, seperti pensil untuk sekolah atau ongkos bus untuk sampai ke sana. Keinginan adalah sesuatu yang menyenangkan untuk dimiliki, seperti komik atau es krim. Uang saku biasanya tidak cukup untuk semuanya, jadi kamu harus memilih. Rencana yang baik membayar kebutuhan dulu, lalu memutuskan tentang keinginan. Berkata "nanti" untuk sebuah keinginan tidak sama dengan "tidak pernah": kamu bisa menabung dan membelinya saat uangmu cukup.',
        'Uang yang tidak kamu belanjakan menjadi tabungan. Di simulasi, uang itu masuk ke celengan yang terisi menuju tujuan yang kamu pilih. Menabung terasa lambat di awal, tetapi terus bertambah: Rp 10.000 seminggu menjadi Rp 40.000 dalam sebulan dan Rp 120.000 dalam tiga bulan. Simulasi menunjukkan berapa minggu yang dibutuhkan untuk mencapai tujuanmu dengan kecepatan sekarang, sehingga kamu bisa melihat bagaimana setiap pilihan hari ini mengubah apa yang bisa kamu beli nanti.',
      ],
    },
    figure: {
      caption: {
        en: 'Indonesian money used in the sim, from the Rp 500 coin to the Rp 100,000 note, and an example of change: pay Rp 13,000 with a Rp 20,000 note and get Rp 7,000 back as Rp 5,000 + Rp 2,000.',
        id: 'Uang rupiah yang dipakai di simulasi, dari koin Rp 500 sampai uang kertas Rp 100.000, dan contoh kembalian: bayar Rp 13.000 dengan uang Rp 20.000 dan terima kembalian Rp 7.000 berupa Rp 5.000 + Rp 2.000.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const notes = [[1000, '#a3a3a3'], [2000, '#9ca3af'], [5000, '#b45309'], [10000, '#7e22ce'], [20000, '#15803d'], [50000, '#1d4ed8'], [100000, '#b91c1c']];
        const fmt = (n) => 'Rp ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'id' ? '.' : ',');
        const noteSvg = notes.map(([v, c], i) => {
          const x = 20 + (i % 4) * 84, y = 36 + Math.floor(i / 4) * 44;
          return `<rect x="${x}" y="${y}" width="72" height="32" rx="4" fill="${c}"/><rect x="${x + 4}" y="${y + 4}" width="64" height="24" rx="3" fill="none" stroke="#fff" stroke-opacity=".6"/><text x="${x + 36}" y="${y + 20}" class="n">${fmt(v)}</text>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Indonesian coins and notes and an example of change', 'Koin dan uang kertas rupiah serta contoh kembalian')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.n{font:bold 10px system-ui,sans-serif;fill:#fff;text-anchor:middle}.t{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.s{font:10px system-ui,sans-serif;fill:currentColor;text-anchor:middle;opacity:.85}</style>
  <text x="180" y="20" class="t">${L('notes (uang kertas)', 'uang kertas')}</text>
  ${noteSvg}
  <circle cx="300" cy="96" r="14" fill="#d4d4d8" stroke="#71717a"/><text x="300" y="100" class="n" style="fill:#1f2937">1.000</text>
  <circle cx="332" cy="96" r="12" fill="#eab308" stroke="#a16207"/><text x="332" y="100" class="n" style="fill:#1f2937">500</text>
  <text x="316" y="124" class="s">${L('coins', 'koin')}</text>
  <line x1="20" y1="140" x2="340" y2="140" stroke="currentColor" opacity=".3"/>
  <text x="180" y="158" class="t">${L('change from Rp 20,000 for a Rp 13,000 purchase', 'kembalian dari Rp 20.000 untuk belanja Rp 13.000')}</text>
  <rect x="30" y="170" width="72" height="32" rx="4" fill="#15803d"/><text x="66" y="190" class="n">${fmt(20000)}</text>
  <text x="118" y="190" class="t">−</text>
  <rect x="134" y="170" width="60" height="32" rx="4" fill="none" stroke="currentColor"/><text x="164" y="190" class="t">${fmt(13000)}</text>
  <text x="208" y="190" class="t">=</text>
  <rect x="222" y="170" width="52" height="32" rx="4" fill="#b45309"/><text x="248" y="190" class="n">${fmt(5000)}</text>
  <text x="283" y="190" class="t">+</text>
  <rect x="292" y="170" width="52" height="32" rx="4" fill="#9ca3af"/><text x="318" y="190" class="n">${fmt(2000)}</text>
  <text x="180" y="226" class="s">${L('always count your change: 13,000 + 7,000 = 20,000', 'selalu hitung kembalianmu: 13.000 + 7.000 = 20.000')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Indonesian money is the rupiah: coins of Rp 500 and Rp 1,000, and notes from Rp 1,000 to Rp 100,000, each with its own colour.',
        'Change is the money you get back when you pay with more than the price.',
        'Needs come first; wants can wait, be saved for, or be skipped.',
        'Money you do not spend is saved, and small savings add up week after week.',
        'Planning before you spend helps you reach bigger goals.',
      ],
      id: [
        'Uang Indonesia adalah rupiah: koin Rp 500 dan Rp 1.000, serta uang kertas dari Rp 1.000 sampai Rp 100.000, masing-masing dengan warnanya sendiri.',
        'Kembalian adalah uang yang kamu terima kembali saat membayar lebih dari harganya.',
        'Kebutuhan didahulukan; keinginan bisa menunggu, ditabung dulu, atau dilewati.',
        'Uang yang tidak dibelanjakan menjadi tabungan, dan tabungan kecil terus bertambah minggu demi minggu.',
        'Merencanakan sebelum membelanjakan membantu mencapai tujuan yang lebih besar.',
      ],
    },
    vocabulary: {
      en: [
        ['Rupiah (Rp)', 'The money of Indonesia.'],
        ['Change', 'The money a shopkeeper gives back when you pay with more than the price.'],
        ['Need', 'Something you must have, like school supplies or food.'],
        ['Want', 'Something nice to have but you can live without, like a toy.'],
        ['Saving', 'Keeping money instead of spending it, so you can use it later.'],
        ['Goal', 'Something you are saving up for.'],
        ['Budget', 'A plan for how you will spend and save your money.'],
      ],
      id: [
        ['Rupiah (Rp)', 'Mata uang Indonesia.'],
        ['Kembalian', 'Uang yang dikembalikan penjual saat kamu membayar lebih dari harganya.'],
        ['Kebutuhan', 'Sesuatu yang harus kamu miliki, seperti alat sekolah atau makanan.'],
        ['Keinginan', 'Sesuatu yang menyenangkan dimiliki tetapi bisa ditunda, seperti mainan.'],
        ['Menabung', 'Menyimpan uang daripada membelanjakannya, agar bisa dipakai nanti.'],
        ['Tujuan', 'Sesuatu yang sedang kamu tabung untuk dibeli.'],
        ['Anggaran', 'Rencana bagaimana kamu akan membelanjakan dan menabung uangmu.'],
      ],
    },
    misconceptions: {
      en: [
        ['A bigger note or coin is always worth more.', 'Size does not tell you the value. The Rp 500 coin is bigger than some notes are thick, yet a thin Rp 100,000 note is worth 200 of them. Read the number.'],
        ['If I have money, I should spend it, or it is wasted.', 'Money that is saved is not wasted. It waits for you and lets you buy something bigger later.'],
        ['Saving means never buying anything fun.', 'Saving means choosing. In the sim you can still buy a want each week and reach the goal, it just takes a little longer.'],
      ],
      id: [
        ['Uang yang lebih besar bentuknya selalu lebih besar nilainya.', 'Ukuran tidak menunjukkan nilai. Koin Rp 500 tebal dan berat, tetapi selembar uang Rp 100.000 yang tipis bernilai 200 koin itu. Bacalah angkanya.'],
        ['Kalau punya uang, sebaiknya dibelanjakan, kalau tidak sia-sia.', 'Uang yang ditabung tidak sia-sia. Uang itu menunggumu dan membuatmu bisa membeli sesuatu yang lebih besar nanti.'],
        ['Menabung berarti tidak pernah membeli yang menyenangkan.', 'Menabung berarti memilih. Di simulasi kamu tetap bisa membeli satu keinginan tiap minggu dan mencapai tujuan, hanya butuh waktu sedikit lebih lama.'],
      ],
    },
    realWorld: {
      en: [
        'At the school canteen, paying for a Rp 7,000 snack with a Rp 10,000 note should get you Rp 3,000 back. Count it!',
        'Many Indonesian families keep a celengan (money box) at home, and some children open a school savings account (tabungan sekolah).',
        'Shopkeepers sometimes give sweets instead of small coins as change; now you know what the coins should have been.',
        'Planning pocket money is the same skill grown-ups use for a monthly salary: needs first, then savings, then wants.',
      ],
      id: [
        'Di kantin sekolah, membayar jajanan Rp 7.000 dengan uang Rp 10.000 seharusnya mendapat kembalian Rp 3.000. Hitunglah!',
        'Banyak keluarga Indonesia memakai celengan di rumah, dan sebagian anak membuka tabungan sekolah.',
        'Penjual kadang memberi permen sebagai pengganti koin kecil untuk kembalian; sekarang kamu tahu berapa koin yang seharusnya.',
        'Merencanakan uang saku adalah keterampilan yang sama yang dipakai orang dewasa untuk gaji bulanan: kebutuhan dulu, lalu tabungan, lalu keinginan.',
      ],
    },
    questions: {
      en: [
        { q: 'You buy a pencil (Rp 3,000) and a notebook (Rp 8,000) and pay with a Rp 20,000 note. How much change do you get, and in which notes?', a: 'The total is Rp 11,000, so the change is Rp 9,000: one Rp 5,000 note and two Rp 2,000 notes.' },
        { q: 'Your pocket money is Rp 25,000 a week and you spend Rp 15,000. How many weeks until you have saved Rp 60,000 for the football?', a: 'You save Rp 10,000 a week. Rp 60,000 ÷ Rp 10,000 = 6 weeks.' },
        { q: 'Which items on the list are needs and which are wants? Why might the answer be different for different children?', a: 'Pencil, notebook and bus fare are needs for school. Snack, ice cream, stickers, comic and toy car are wants. A child who walks to school does not need the bus fare, so needs depend on your situation.' },
      ],
      id: [
        { q: 'Kamu membeli pensil (Rp 3.000) dan buku tulis (Rp 8.000) lalu membayar dengan uang Rp 20.000. Berapa kembaliannya, dan dalam pecahan apa?', a: 'Jumlahnya Rp 11.000, jadi kembaliannya Rp 9.000: satu lembar Rp 5.000 dan dua lembar Rp 2.000.' },
        { q: 'Uang sakumu Rp 25.000 seminggu dan kamu membelanjakan Rp 15.000. Berapa minggu sampai tabunganmu mencapai Rp 60.000 untuk bola?', a: 'Kamu menabung Rp 10.000 seminggu. Rp 60.000 ÷ Rp 10.000 = 6 minggu.' },
        { q: 'Barang mana di daftar yang kebutuhan dan mana yang keinginan? Mengapa jawabannya bisa berbeda untuk anak yang berbeda?', a: 'Pensil, buku tulis, dan ongkos bus adalah kebutuhan untuk sekolah. Jajanan, es krim, stiker, komik, dan mobil mainan adalah keinginan. Anak yang berjalan kaki ke sekolah tidak butuh ongkos bus, jadi kebutuhan tergantung keadaanmu.' },
      ],
    },
  },
};
