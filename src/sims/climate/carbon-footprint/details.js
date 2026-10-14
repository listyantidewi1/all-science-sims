// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See where the biggest contributions come from for typical lifestyles.',
      'Compare your number to the global average (~4.7 t/yr) and the 2°C target (~2 t/yr).',
      'Identify high-leverage changes (one trans-Atlantic flight ≈ a year of beef).',
    ],
    id: [
      'Melihat dari mana kontribusi terbesar untuk gaya hidup tipikal.',
      'Membandingkan angka Anda dengan rata-rata global (~4,7 t/thn) dan target 2°C (~2 t/thn).',
      'Mengidentifikasi perubahan berdampak besar (satu penerbangan trans-Atlantik ≈ setahun daging sapi).',
    ],
  },
  tryThis: {
    en: [
      '"Average American" preset: the largest per-capita footprint in the world.',
      '"Vegan, no flights" preset: how low can a developed-country lifestyle go.',
      'Adjust your own values: what is your number?',
    ],
    id: [
      'Preset "rata-rata Amerika": jejak per kapita terbesar di dunia.',
      'Preset "vegan, tanpa terbang": seberapa rendah gaya hidup negara maju bisa.',
      'Atur nilai Anda sendiri: berapa angka Anda?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Almost everything we do releases greenhouse gases somewhere. Driving a car burns petrol, which turns into carbon dioxide. The electricity for lights and phones often comes from burning coal or gas. Cows burp methane while they grow, and factories emit gases while making the things we buy. A carbon footprint adds all of this up for one person over one year. Because methane and other gases warm the planet by different amounts, they are converted into the amount of CO₂ that would cause the same warming, and the total is given in tonnes of CO₂-equivalent.',
        'The simulation works with a simple rule: footprint equals how much you do of something, multiplied by how much that activity emits per unit, added up across all the categories. The number of grams per unit is called an emission factor. In this sim, driving one kilometre emits about 0.18 kg, one kilometre of flying about 0.20 kg, one kilowatt-hour of electricity about 0.40 kg, and one kilogram of beef about 27 kg, compared with about 0.8 kg for a kilogram of vegetables or grain. Shopping and electronics are estimated very roughly from the money spent.',
        'Each slider sets how much of one activity you do in a year, and the bars on the right re-sort so the biggest contributor is always at the top. The gauge compares your total with three markers: the 2 °C target of about 2 tonnes per person, the world average of about 4.7 tonnes, and the United States average of about 16 tonnes. The preset buttons give typical lifestyles to start from, but do not expect them to land exactly on the markers: the markers come from whole-country emissions divided by population, while the sliders estimate one household\'s consumption with rough factors.',
        'The factors are averages, and real ones vary a lot. Electricity from a coal-heavy grid, like much of Indonesia\'s, emits more per kilowatt-hour than the sim\'s 0.40 kg, while a grid run on hydro or nuclear emits far less. Flying also warms the planet through contrails and other high-altitude effects that the simple factor leaves out. And the sim only counts things you choose yourself; roads, schools, hospitals and the army also emit, and in rich countries that shared part adds several tonnes to everyone\'s footprint whether they like it or not.',
      ],
      id: [
        'Hampir semua yang kita lakukan melepaskan gas rumah kaca di suatu tempat. Mengendarai mobil membakar bensin, yang berubah menjadi karbon dioksida. Listrik untuk lampu dan ponsel sering berasal dari pembakaran batubara atau gas. Sapi bersendawa mengeluarkan metana selama tumbuh, dan pabrik mengeluarkan gas saat membuat barang yang kita beli. Jejak karbon menjumlahkan semua ini untuk satu orang selama satu tahun. Karena metana dan gas lain memanaskan Bumi dengan kekuatan berbeda, semuanya dikonversi menjadi jumlah CO₂ yang akan menyebabkan pemanasan yang sama, dan totalnya dinyatakan dalam ton CO₂-ekuivalen.',
        'Simulasi ini bekerja dengan aturan sederhana: jejak karbon sama dengan seberapa banyak kamu melakukan sesuatu, dikalikan dengan seberapa banyak kegiatan itu mengeluarkan emisi per satuan, lalu dijumlahkan untuk semua kategori. Jumlah gram per satuan itu disebut faktor emisi. Dalam sim ini, menyetir satu kilometer mengeluarkan sekitar 0,18 kg, terbang satu kilometer sekitar 0,20 kg, satu kilowatt-jam listrik sekitar 0,40 kg, dan satu kilogram daging sapi sekitar 27 kg, dibandingkan dengan sekitar 0,8 kg untuk satu kilogram sayur atau biji-bijian. Belanja dan elektronik ditaksir sangat kasar dari uang yang dibelanjakan.',
        'Setiap slider mengatur seberapa banyak satu kegiatan kamu lakukan dalam setahun, dan batang di sebelah kanan diurutkan ulang sehingga penyumbang terbesar selalu di atas. Pengukur membandingkan totalmu dengan tiga penanda: target 2 °C sekitar 2 ton per orang, rata-rata dunia sekitar 4,7 ton, dan rata-rata Amerika Serikat sekitar 16 ton. Tombol preset memberi gaya hidup tipikal sebagai titik awal, tetapi jangan berharap preset itu tepat jatuh di penanda: penanda berasal dari emisi seluruh negara dibagi jumlah penduduk, sedangkan slider menaksir konsumsi satu rumah tangga dengan faktor kasar.',
        'Faktor-faktor itu adalah rata-rata, dan nilai sebenarnya sangat beragam. Listrik dari jaringan yang didominasi batubara, seperti sebagian besar jaringan Indonesia, mengeluarkan lebih banyak per kilowatt-jam daripada 0,40 kg di sim, sedangkan jaringan yang bertumpu pada hidro atau nuklir mengeluarkan jauh lebih sedikit. Terbang juga memanaskan Bumi lewat jejak kondensasi dan efek ketinggian lain yang tidak masuk faktor sederhana ini. Dan sim hanya menghitung hal yang kamu pilih sendiri; jalan, sekolah, rumah sakit, dan tentara juga mengeluarkan emisi, dan di negara kaya bagian bersama itu menambah beberapa ton pada jejak setiap orang, suka atau tidak.',
      ],
    },
    figure: {
      caption: {
        en: 'Emission factors used by the sim: how many kilograms of CO₂-equivalent one unit of each activity releases. Your footprint is each amount multiplied by its factor, added together. The same kilogram of food or the same 100 km can differ by a factor of ten or more.',
        id: 'Faktor emisi yang dipakai sim: berapa kilogram CO₂-ekuivalen yang dilepaskan satu satuan tiap kegiatan. Jejak karbonmu adalah setiap jumlah dikalikan faktornya, lalu dijumlahkan. Satu kilogram makanan atau 100 km yang sama bisa berbeda sepuluh kali lipat atau lebih.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Bar chart of emission factors per unit of activity', 'Diagram batang faktor emisi per satuan kegiatan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.h{font-weight:bold}.v{font-size:10px}.ax{stroke:currentColor;stroke-width:1;opacity:.5}</style>
  <text x="10" y="16" class="h">${L('kg CO₂-eq per unit (sim factors)', 'kg CO₂-ek per satuan (faktor sim)')}</text>
  <text x="10" y="40" class="h">${L('Food, per 1 kg', 'Makanan, per 1 kg')}</text>
  <line x1="150" y1="44" x2="150" y2="232" class="ax"/>
  <text x="10" y="60">${L('beef', 'daging sapi')}</text>
  <rect x="150" y="50" width="135" height="14" fill="#ef4444"/>
  <text x="290" y="61" class="v">27</text>
  <text x="10" y="82">${L('pork / poultry', 'babi / unggas')}</text>
  <rect x="150" y="72" width="35" height="14" fill="#f59e0b"/>
  <text x="190" y="83" class="v">7</text>
  <text x="10" y="104">${L('dairy', 'susu dan olahannya')}</text>
  <rect x="150" y="94" width="16" height="14" fill="#f59e0b"/>
  <text x="171" y="105" class="v">3,2</text>
  <text x="10" y="126">${L('vegetables / grains', 'sayur / biji-bijian')}</text>
  <rect x="150" y="116" width="4" height="14" fill="#10b981"/>
  <text x="159" y="127" class="v">0,8</text>
  <text x="10" y="154" class="h">${L('Travel and energy', 'Perjalanan dan energi')}</text>
  <text x="10" y="174">${L('car, 100 km', 'mobil, 100 km')}</text>
  <rect x="150" y="164" width="90" height="14" fill="#3b82f6"/>
  <text x="245" y="175" class="v">18</text>
  <text x="10" y="196">${L('plane, 100 km', 'pesawat, 100 km')}</text>
  <rect x="150" y="186" width="100" height="14" fill="#3b82f6"/>
  <text x="255" y="197" class="v">20</text>
  <text x="10" y="218">${L('electricity, 100 kWh', 'listrik, 100 kWh')}</text>
  <rect x="150" y="208" width="200" height="14" fill="#8b5cf6"/>
  <text x="300" y="206" class="v">40</text>
  <text x="150" y="238" class="v">${L('footprint = amount × factor, summed over all rows', 'jejak = jumlah × faktor, dijumlahkan semua baris')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A carbon footprint is the total greenhouse gas from one person\'s activities in a year, expressed in tonnes of CO₂-equivalent.',
        'Footprint = amount of an activity × its emission factor, added up over all activities.',
        'A few activities dominate: flights, car travel, home energy and beef usually make up most of the total.',
        'The same kilogram of food can differ enormously: beef emits roughly thirty times more than vegetables or grain per kilogram.',
        'The world average is about 4.7 tonnes per person and a 2 °C-compatible level is about 2 tonnes, so most rich-country lifestyles need to shrink several times over.',
      ],
      id: [
        'Jejak karbon adalah total gas rumah kaca dari kegiatan satu orang dalam setahun, dinyatakan dalam ton CO₂-ekuivalen.',
        'Jejak = jumlah suatu kegiatan × faktor emisinya, dijumlahkan untuk semua kegiatan.',
        'Beberapa kegiatan mendominasi: penerbangan, perjalanan mobil, energi rumah, dan daging sapi biasanya menyusun sebagian besar total.',
        'Satu kilogram makanan yang sama bisa sangat berbeda: daging sapi mengeluarkan kira-kira tiga puluh kali lebih banyak daripada sayur atau biji-bijian per kilogram.',
        'Rata-rata dunia sekitar 4,7 ton per orang dan tingkat yang sesuai target 2 °C sekitar 2 ton, sehingga sebagian besar gaya hidup negara kaya perlu menyusut beberapa kali lipat.',
      ],
    },
    vocabulary: {
      en: [
        ['Carbon footprint', 'The total amount of greenhouse gas caused by a person, product or activity, usually per year.'],
        ['Greenhouse gas', 'A gas such as carbon dioxide or methane that traps heat in the atmosphere and warms the planet.'],
        ['CO₂-equivalent (CO₂-eq)', 'A way of counting all greenhouse gases as the amount of CO₂ that would cause the same warming.'],
        ['Emission factor', 'How much CO₂-eq one unit of an activity releases, for example kilograms per kilometre driven or per kilowatt-hour used.'],
        ['Tonne (t)', 'One thousand kilograms; footprints are usually a few tonnes per person per year.'],
        ['Kilowatt-hour (kWh)', 'The energy a 1000 W appliance uses in one hour; the unit on your electricity bill.'],
        ['Per capita', 'Per person: a country\'s total emissions divided by its population.'],
      ],
      id: [
        ['Jejak karbon', 'Jumlah total gas rumah kaca yang ditimbulkan seseorang, produk, atau kegiatan, biasanya per tahun.'],
        ['Gas rumah kaca', 'Gas seperti karbon dioksida atau metana yang menahan panas di atmosfer dan memanaskan Bumi.'],
        ['CO₂-ekuivalen (CO₂-ek)', 'Cara menghitung semua gas rumah kaca sebagai jumlah CO₂ yang akan menyebabkan pemanasan yang sama.'],
        ['Faktor emisi', 'Berapa CO₂-ek yang dilepaskan satu satuan kegiatan, misalnya kilogram per kilometer berkendara atau per kilowatt-jam yang dipakai.'],
        ['Ton (t)', 'Seribu kilogram; jejak karbon biasanya beberapa ton per orang per tahun.'],
        ['Kilowatt-jam (kWh)', 'Energi yang dipakai alat 1000 W dalam satu jam; satuan pada tagihan listrikmu.'],
        ['Per kapita', 'Per orang: total emisi suatu negara dibagi jumlah penduduknya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Small everyday habits like unplugging chargers make the biggest difference.', 'They help a little, but the sim shows that flights, driving, heating and beef are each worth tonnes, while a phone charger is worth grams. Focus on the tall bars first.'],
        ['Food has a small footprint compared with transport.', 'It depends what you eat. A typical meat-heavy diet can rival a car in annual emissions, mostly because of beef and dairy; a plant-based diet is several times smaller.'],
        ['Electricity is clean because nothing burns in my house.', 'The burning happens at the power station. On a coal-heavy grid each kilowatt-hour carries roughly 0.7 to 0.9 kg of CO₂, more than the sim\'s average factor of 0.40 kg.'],
        ['If my own footprint reaches 2 tonnes, the climate problem is solved for my share.', 'The 2-tonne figure is a rough per-person budget, and shared emissions from roads, hospitals and industry are not in the sliders. Personal choices matter, but so do the systems around us.'],
      ],
      id: [
        ['Kebiasaan kecil sehari-hari seperti mencabut pengisi daya memberi perbedaan terbesar.', 'Itu sedikit membantu, tetapi sim menunjukkan penerbangan, berkendara, pemanas, dan daging sapi masing-masing bernilai berton-ton, sedangkan pengisi daya ponsel bernilai gram. Perhatikan batang yang paling panjang dulu.'],
        ['Makanan punya jejak kecil dibandingkan transportasi.', 'Tergantung apa yang dimakan. Pola makan yang banyak dagingnya bisa menyaingi mobil dalam emisi tahunan, terutama karena daging sapi dan susu; pola makan nabati beberapa kali lebih kecil.'],
        ['Listrik itu bersih karena tidak ada yang terbakar di rumahku.', 'Pembakarannya terjadi di pembangkit listrik. Pada jaringan yang didominasi batubara, tiap kilowatt-jam membawa kira-kira 0,7 sampai 0,9 kg CO₂, lebih besar daripada faktor rata-rata 0,40 kg di sim.'],
        ['Jika jejakku sendiri mencapai 2 ton, masalah iklim untuk bagianku sudah selesai.', 'Angka 2 ton adalah anggaran kasar per orang, dan emisi bersama dari jalan, rumah sakit, dan industri tidak ada di slider. Pilihan pribadi penting, tetapi sistem di sekitar kita juga penting.'],
      ],
    },
    realWorld: {
      en: [
        'A single long-haul return flight, for example Jakarta to Europe and back at about 22 000 km, adds roughly 4 tonnes by the sim\'s factor, more than the world average person emits in a whole year.',
        'Indonesia\'s electricity comes mostly from coal, so the same air conditioner has a larger footprint in Jakarta than in a country with lots of hydro power.',
        'Cities with good public transport, like Tokyo or Singapore, let residents keep a far smaller travel footprint than car-dependent suburbs.',
        'Food labels and restaurant menus in some countries now show CO₂-eq per dish, using emission factors just like the ones in this sim.',
      ],
      id: [
        'Satu penerbangan jarak jauh pulang-pergi, misalnya Jakarta ke Eropa dan kembali sekitar 22.000 km, menambah kira-kira 4 ton menurut faktor sim, lebih besar daripada emisi rata-rata orang di dunia selama setahun penuh.',
        'Listrik Indonesia sebagian besar berasal dari batubara, sehingga pendingin udara yang sama punya jejak lebih besar di Jakarta daripada di negara yang banyak PLTA-nya.',
        'Kota dengan transportasi umum yang baik, seperti Tokyo atau Singapura, memungkinkan penduduknya punya jejak perjalanan jauh lebih kecil daripada pinggiran kota yang bergantung pada mobil.',
        'Label makanan dan menu restoran di beberapa negara kini mencantumkan CO₂-ek per hidangan, memakai faktor emisi seperti yang ada di sim ini.',
      ],
    },
    questions: {
      en: [
        { q: 'A family drives 10 000 km in a year. Using the sim\'s factor of 0.18 kg per km, how many tonnes of CO₂-eq is that?', a: '10 000 km × 0.18 kg/km = 1800 kg, which is 1.8 tonnes. That alone is almost the whole 2-tonne target for one person.' },
        { q: 'Someone eats 1 kg of beef a week, about 52 kg a year. How does its footprint compare with eating 52 kg of vegetables instead?', a: 'Beef: 52 × 27 = 1404 kg, about 1.4 tonnes. Vegetables: 52 × 0.8 ≈ 42 kg. The beef emits about 34 times more for the same weight of food, so swapping it is one of the biggest single changes on the food sliders.' },
        { q: 'Two students each use 3000 kWh of electricity a year, one in a town powered by coal and one in a town powered by hydro. Does the sim give them the same footprint, and should it?', a: 'The sim gives both 3000 × 0.40 = 1200 kg, because it uses one average factor. In reality the coal-powered student causes roughly 0.8 kg per kWh, about 2.4 tonnes, while the hydro-powered one causes only a small fraction of that. The footprint of electricity depends on how it was made, not just how much was used.' },
      ],
      id: [
        { q: 'Sebuah keluarga menyetir 10.000 km dalam setahun. Dengan faktor sim 0,18 kg per km, berapa ton CO₂-ek yang dihasilkan?', a: '10.000 km × 0,18 kg/km = 1.800 kg, yaitu 1,8 ton. Itu saja sudah hampir seluruh target 2 ton untuk satu orang.' },
        { q: 'Seseorang makan 1 kg daging sapi tiap minggu, sekitar 52 kg per tahun. Bagaimana jejaknya dibandingkan dengan makan 52 kg sayur sebagai gantinya?', a: 'Daging sapi: 52 × 27 = 1.404 kg, sekitar 1,4 ton. Sayur: 52 × 0,8 ≈ 42 kg. Daging sapi mengeluarkan sekitar 34 kali lebih banyak untuk berat makanan yang sama, sehingga menggantinya adalah salah satu perubahan tunggal terbesar pada slider makanan.' },
        { q: 'Dua siswa masing-masing memakai 3.000 kWh listrik per tahun, satu di kota yang listriknya dari batubara dan satu di kota yang listriknya dari PLTA. Apakah sim memberi mereka jejak yang sama, dan haruskah begitu?', a: 'Sim memberi keduanya 3.000 × 0,40 = 1.200 kg, karena memakai satu faktor rata-rata. Pada kenyataannya siswa dengan listrik batubara menyebabkan kira-kira 0,8 kg per kWh, sekitar 2,4 ton, sedangkan yang dari PLTA hanya sebagian kecil dari itu. Jejak listrik bergantung pada cara listrik dibuat, bukan hanya berapa banyak yang dipakai.' },
      ],
    },
  },
};
