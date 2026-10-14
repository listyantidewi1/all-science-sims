// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply m_h c_h (T_h − T_f) = m_c c_c (T_f − T_c) to find equilibrium temperature.',
      'Compare specific heats: water (4.18) vs metals (0.4–0.9) vs gases.',
      'See why "thermal mass" matters for buildings and oceans.',
    ],
    id: [
      'Menerapkan m_p c_p (T_p − T_f) = m_d c_d (T_f − T_d) untuk mencari suhu setimbang.',
      'Membandingkan kalor jenis: air (4,18) vs logam (0,4–0,9) vs gas.',
      'Memahami mengapa "massa termal" penting bagi bangunan dan lautan.',
    ],
  },
  tryThis: {
    en: [
      '100 g iron at 200°C into 200 g water at 20°C — water barely warms.',
      'Same iron into 20 g water — water boils much closer.',
      'Replace water with mercury (c ≈ 0.14) — equilibrium hugely shifted.',
    ],
    id: [
      '100 g besi 200°C ke 200 g air 20°C — air sedikit memanas.',
      'Besi yang sama ke 20 g air — air mendekati mendidih.',
      'Ganti air dengan raksa (c ≈ 0,14) — keseimbangan jauh bergeser.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Put a hot object in contact with a cold one and energy flows from hot to cold as heat, until both reach the same temperature: thermal equilibrium. How much the temperature of an object changes for a given amount of heat depends on its mass and on its material. The rule is Q = m · c · ΔT, where Q is the heat in joules, m the mass in grams, ΔT the temperature change, and c the specific heat capacity: the energy needed to warm 1 g of the material by 1 °C. Water has an unusually large c (4.184 J/g·°C); iron (0.449) needs about nine times less energy for the same temperature rise.',
        'If the two objects are insulated from everything else, all the heat the hot object loses is gained by the cold one: m₁c₁(T₁ − T_f) = m₂c₂(T_f − T₂). Solving for the final temperature gives T_f = (m₁c₁T₁ + m₂c₂T₂) ÷ (m₁c₁ + m₂c₂). This is a weighted average of the two starting temperatures, where each object\'s weight is its heat capacity m·c. The object with the larger m·c "wins": the final temperature ends up closer to where it started.',
        'In the simulation you choose a substance, mass and starting temperature for a hot object and a cool one. The sim shows the predicted T_f from the formula and animates both temperatures relaxing toward it. The speed of that animation is schematic: both temperatures move at the same fractional rate, chosen so the result is easy to watch, not computed from how fast heat really conducts (which depends on contact area, stirring and the materials). Energy is conserved at every instant, though, so the heat lost by one object always equals the heat gained by the other.',
        'The sim ignores several things a real experiment cannot. There are no phase changes: water above 100 °C stays liquid instead of boiling, and nothing freezes. Heat does not leak to the surroundings or into the container, so the sim behaves like a perfect calorimeter; real ones have their own heat capacity that must be accounted for. Specific heat is treated as constant, although for real materials it changes slightly with temperature.',
      ],
      id: [
        'Jika benda panas disentuhkan dengan benda dingin, energi mengalir dari yang panas ke yang dingin sebagai kalor, sampai keduanya mencapai suhu yang sama: kesetimbangan termal. Seberapa besar suhu benda berubah untuk sejumlah kalor tertentu bergantung pada massanya dan bahannya. Aturannya Q = m · c · ΔT, dengan Q kalor dalam joule, m massa dalam gram, ΔT perubahan suhu, dan c kalor jenis: energi yang diperlukan untuk memanaskan 1 g bahan sebesar 1 °C. Air memiliki c yang luar biasa besar (4,184 J/g·°C); besi (0,449) membutuhkan energi sekitar sembilan kali lebih sedikit untuk kenaikan suhu yang sama.',
        'Jika kedua benda terisolasi dari lingkungan, semua kalor yang dilepas benda panas diterima oleh benda dingin: m₁c₁(T₁ − T_f) = m₂c₂(T_f − T₂). Menyelesaikan untuk suhu akhir memberi T_f = (m₁c₁T₁ + m₂c₂T₂) ÷ (m₁c₁ + m₂c₂). Ini adalah rata-rata berbobot dari kedua suhu awal, dengan bobot tiap benda adalah kapasitas kalornya m·c. Benda dengan m·c lebih besar "menang": suhu akhir berakhir lebih dekat ke suhu awalnya.',
        'Dalam simulasi kamu memilih zat, massa, dan suhu awal untuk benda panas dan benda dingin. Simulasi menampilkan T_f yang diprediksi rumus dan menganimasikan kedua suhu mendekati nilai itu. Kecepatan animasinya hanya skematis: kedua suhu bergerak dengan laju pecahan yang sama, dipilih agar mudah diamati, bukan dihitung dari seberapa cepat kalor sungguh-sungguh merambat (yang bergantung pada luas kontak, pengadukan, dan bahannya). Namun energi kekal di setiap saat, sehingga kalor yang dilepas satu benda selalu sama dengan kalor yang diterima benda lainnya.',
        'Simulasi mengabaikan beberapa hal yang tidak bisa diabaikan di percobaan nyata. Tidak ada perubahan wujud: air di atas 100 °C tetap cair, bukan mendidih, dan tidak ada yang membeku. Kalor tidak bocor ke lingkungan atau ke wadah, sehingga simulasi berperilaku seperti kalorimeter sempurna; kalorimeter nyata punya kapasitas kalor sendiri yang harus diperhitungkan. Kalor jenis dianggap tetap, padahal pada bahan nyata nilainya sedikit berubah terhadap suhu.',
      ],
    },
    figure: {
      caption: {
        en: 'Heat flows from the hot iron into the cool water until both reach T_f. The heat lost equals the heat gained, but the iron\'s temperature falls far more than the water\'s rises because the water\'s m·c is about 19 times larger.',
        id: 'Kalor mengalir dari besi panas ke air dingin sampai keduanya mencapai T_f. Kalor yang dilepas sama dengan kalor yang diterima, tetapi suhu besi turun jauh lebih besar daripada kenaikan suhu air karena m·c air sekitar 19 kali lebih besar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Heat flow between a hot block and cool water', 'Aliran kalor antara balok panas dan air dingin')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font-weight:700}.s{font-size:9.5px;opacity:.75}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.g{fill:none;stroke-width:2.2}</style>
  <rect x="14" y="40" width="80" height="70" rx="6" fill="#ef4444" opacity=".25" stroke="#ef4444"/>
  <text x="54" y="60" text-anchor="middle" class="b" fill="#ef4444">${L('iron 100 g', 'besi 100 g')}</text>
  <text x="54" y="76" text-anchor="middle">c = ${L('0.449', '0,449')}</text>
  <text x="54" y="92" text-anchor="middle">200 °C → T_f</text>
  <rect x="150" y="40" width="80" height="70" rx="6" fill="#3b82f6" opacity=".25" stroke="#3b82f6"/>
  <text x="190" y="60" text-anchor="middle" class="b" fill="#3b82f6">${L('water 200 g', 'air 200 g')}</text>
  <text x="190" y="76" text-anchor="middle">c = ${L('4.184', '4,184')}</text>
  <text x="190" y="92" text-anchor="middle">20 °C → T_f</text>
  <path d="M98 75 L144 75" stroke="#f59e0b" stroke-width="4" fill="none" marker-end="url(#h)"/>
  <text x="121" y="66" text-anchor="middle" class="b" fill="#f59e0b">Q</text>
  <text x="122" y="130" text-anchor="middle" class="s">${L('Q lost = m₁c₁(T₁ − T_f)', 'Q lepas = m₁c₁(T₁ − T_f)')}</text>
  <text x="122" y="144" text-anchor="middle" class="s">${L('Q gained = m₂c₂(T_f − T₂)', 'Q terima = m₂c₂(T_f − T₂)')}</text>
  <text x="122" y="160" text-anchor="middle" class="b">T_f ≈ ${L('29.2', '29,2')} °C</text>
  <text x="122" y="174" text-anchor="middle" class="s">Q ≈ 7 670 J</text>
  <line x1="262" y1="30" x2="262" y2="200" class="m"/>
  <line x1="262" y1="200" x2="350" y2="200" class="m"/>
  <text x="306" y="214" text-anchor="middle" class="s">${L('time', 'waktu')}</text>
  <text x="258" y="36" text-anchor="end" class="s">200</text>
  <text x="258" y="176" text-anchor="end" class="s">20</text>
  <text x="258" y="166" text-anchor="end" class="s" fill="#10b981">T_f</text>
  <line x1="262" y1="163" x2="350" y2="163" stroke="#10b981" stroke-width="1" stroke-dasharray="3 3"/>
  <path d="M262 34 C280 150 300 162 350 163" class="g" stroke="#ef4444"/>
  <path d="M262 174 C280 166 300 163 350 163" class="g" stroke="#3b82f6"/>
  <text x="306" y="22" text-anchor="middle" class="s">${L('temperature', 'suhu')}</text>
  <text x="180" y="232" text-anchor="middle" class="s">${L('T_f = (m₁c₁T₁ + m₂c₂T₂) ÷ (m₁c₁ + m₂c₂)', 'T_f = (m₁c₁T₁ + m₂c₂T₂) ÷ (m₁c₁ + m₂c₂)')}</text>
  <defs><marker id="h" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Heat is energy in transfer from a hotter object to a colder one; temperature measures how hot something is, not how much heat it holds.',
        'Q = m·c·ΔT: the heat needed to change a temperature grows with mass, specific heat and the size of the change.',
        'In an insulated system the heat lost by the hot object equals the heat gained by the cold one.',
        'The final temperature is a weighted average of the starting temperatures, weighted by each object\'s heat capacity m·c.',
        'Water\'s very large specific heat means it changes temperature slowly, which is why oceans moderate climate.',
      ],
      id: [
        'Kalor adalah energi yang berpindah dari benda yang lebih panas ke yang lebih dingin; suhu mengukur seberapa panas suatu benda, bukan berapa banyak kalor yang dikandungnya.',
        'Q = m·c·ΔT: kalor yang diperlukan untuk mengubah suhu bertambah dengan massa, kalor jenis, dan besar perubahannya.',
        'Dalam sistem terisolasi, kalor yang dilepas benda panas sama dengan kalor yang diterima benda dingin.',
        'Suhu akhir adalah rata-rata berbobot dari suhu-suhu awal, dengan bobot kapasitas kalor m·c tiap benda.',
        'Kalor jenis air yang sangat besar membuat suhunya berubah lambat; itulah sebabnya lautan menyejukkan iklim.',
      ],
    },
    vocabulary: {
      en: [
        ['Heat (Q)', 'Energy transferred because of a temperature difference, measured in joules.'],
        ['Temperature', 'A measure of how hot an object is, related to the average kinetic energy of its particles.'],
        ['Specific heat capacity (c)', 'Energy needed to raise 1 g of a substance by 1 °C, in J/g·°C.'],
        ['Heat capacity (m·c)', 'Energy needed to raise a whole object by 1 °C; also called thermal mass.'],
        ['Thermal equilibrium', 'The state in which two objects in contact have the same temperature and no net heat flows.'],
        ['Calorimeter', 'An insulated container used to measure heat exchange from temperature changes.'],
        ['Conservation of energy', 'Energy is never created or destroyed; here, heat lost equals heat gained.'],
      ],
      id: [
        ['Kalor (Q)', 'Energi yang berpindah karena perbedaan suhu, diukur dalam joule.'],
        ['Suhu', 'Ukuran seberapa panas suatu benda, terkait energi kinetik rata-rata partikelnya.'],
        ['Kalor jenis (c)', 'Energi yang diperlukan untuk menaikkan suhu 1 g zat sebesar 1 °C, dalam J/g·°C.'],
        ['Kapasitas kalor (m·c)', 'Energi yang diperlukan untuk menaikkan suhu seluruh benda sebesar 1 °C; disebut juga massa termal.'],
        ['Kesetimbangan termal', 'Keadaan ketika dua benda yang bersentuhan bersuhu sama dan tidak ada lagi kalor yang mengalir bersih.'],
        ['Kalorimeter', 'Wadah terisolasi untuk mengukur pertukaran kalor dari perubahan suhu.'],
        ['Kekekalan energi', 'Energi tidak pernah diciptakan atau dimusnahkan; di sini, kalor yang dilepas sama dengan kalor yang diterima.'],
      ],
    },
    misconceptions: {
      en: [
        ['The final temperature is halfway between the two starting temperatures.', 'Only if both objects have the same heat capacity m·c. In the default setting 100 g of iron at 200 °C barely warms 200 g of water from 20 °C to about 29 °C, because the water\'s m·c is about 19 times larger.'],
        ['Heat and temperature are the same thing.', 'Heat is energy that moves between objects (joules); temperature describes how hot an object is (°C). A bathtub of warm water holds far more heat than a red-hot pin, even though the pin has the higher temperature.'],
        ['The hot object loses more heat than the cold object gains, because it cools by more degrees.', 'In an insulated system the two amounts of heat are exactly equal. The hot object changes by more degrees only because its m·c is smaller, so the same joules shift its temperature further.'],
        ['Metals have a high specific heat because they heat up fast.', 'The opposite: metals heat up fast precisely because their specific heat is low, so a little energy raises their temperature a lot. Water heats up slowly because its c is high.'],
      ],
      id: [
        ['Suhu akhir berada tepat di tengah antara kedua suhu awal.', 'Hanya jika kedua benda memiliki kapasitas kalor m·c yang sama. Pada pengaturan awal, 100 g besi 200 °C hanya memanaskan 200 g air dari 20 °C menjadi sekitar 29 °C, karena m·c air sekitar 19 kali lebih besar.'],
        ['Kalor dan suhu adalah hal yang sama.', 'Kalor adalah energi yang berpindah antarbenda (joule); suhu menggambarkan seberapa panas benda (°C). Satu bak mandi air hangat menyimpan kalor jauh lebih banyak daripada jarum membara, walaupun suhu jarum lebih tinggi.'],
        ['Benda panas melepas kalor lebih banyak daripada yang diterima benda dingin, karena suhunya turun lebih banyak derajat.', 'Dalam sistem terisolasi kedua jumlah kalor itu tepat sama. Suhu benda panas berubah lebih banyak derajat hanya karena m·c-nya lebih kecil, sehingga joule yang sama menggeser suhunya lebih jauh.'],
        ['Logam punya kalor jenis tinggi karena cepat panas.', 'Justru sebaliknya: logam cepat panas karena kalor jenisnya rendah, sehingga sedikit energi sudah menaikkan suhunya banyak. Air lambat panas karena c-nya tinggi.'],
      ],
    },
    realWorld: {
      en: [
        'Coastal cities have milder summers and winters than inland ones because the sea, with its huge heat capacity, warms and cools slowly.',
        'Car engines are cooled with water-based coolant because each kilogram of water can carry away far more heat per degree than oil or air.',
        'A metal spoon left in hot soup becomes too hot to touch in seconds, while the ceramic bowl stays comfortable: the spoon has a low specific heat and conducts well.',
        'The Calorie values printed on food packets are measured in bomb calorimeters: the food is burned and the temperature rise of a known mass of water gives the energy released.',
      ],
      id: [
        'Kota pesisir mengalami musim panas dan musim dingin yang lebih lunak daripada kota pedalaman karena laut, dengan kapasitas kalornya yang sangat besar, memanas dan mendingin dengan lambat.',
        'Mesin mobil didinginkan dengan cairan pendingin berbasis air karena tiap kilogram air dapat membawa kalor jauh lebih banyak per derajat dibanding minyak atau udara.',
        'Sendok logam yang ditinggalkan dalam sup panas menjadi terlalu panas untuk disentuh dalam hitungan detik, sementara mangkuk keramiknya tetap nyaman: sendok memiliki kalor jenis rendah dan menghantarkan kalor dengan baik.',
        'Nilai kalori pada kemasan makanan diukur dengan kalorimeter bom: makanan dibakar dan kenaikan suhu sejumlah air yang massanya diketahui menunjukkan energi yang dilepaskan.',
      ],
    },
    questions: {
      en: [
        { q: 'Using the default setting (100 g iron at 200 °C, 200 g water at 20 °C), calculate the predicted final temperature and the heat exchanged.', a: 'm₁c₁ = 100 × 0.449 = 44.9 J/°C; m₂c₂ = 200 × 4.184 = 836.8 J/°C. T_f = (44.9 × 200 + 836.8 × 20) ÷ (44.9 + 836.8) = 25 716 ÷ 881.7 ≈ 29.2 °C. Heat lost by iron: 44.9 × (200 − 29.2) ≈ 7 670 J, the same as the heat gained by the water: 836.8 × 9.2 ≈ 7 670 J.' },
        { q: 'Equal masses of water at 20 °C and ethanol (c = 2.46) at 80 °C are mixed. Is the final temperature 50 °C? Calculate it.', a: 'No. The masses cancel, so T_f = (4.184 × 20 + 2.46 × 80) ÷ (4.184 + 2.46) = 280.5 ÷ 6.644 ≈ 42.2 °C. Water has the larger specific heat, so the result is pulled toward water\'s starting temperature.' },
        { q: 'A 100 g block of copper (c = 0.385) and a 100 g block of aluminium (c = 0.897), both at 100 °C, are dropped into identical cups of cold water. Which cup ends up warmer, and why?', a: 'The aluminium cup. For the same mass and the same temperature drop, aluminium gives off about 0.897 ÷ 0.385 ≈ 2.3 times as much heat, because each gram stores more energy per degree. More heat delivered to the same water means a higher final temperature.' },
      ],
      id: [
        { q: 'Dengan pengaturan awal (100 g besi 200 °C, 200 g air 20 °C), hitung suhu akhir yang diprediksi dan kalor yang dipertukarkan.', a: 'm₁c₁ = 100 × 0,449 = 44,9 J/°C; m₂c₂ = 200 × 4,184 = 836,8 J/°C. T_f = (44,9 × 200 + 836,8 × 20) ÷ (44,9 + 836,8) = 25.716 ÷ 881,7 ≈ 29,2 °C. Kalor yang dilepas besi: 44,9 × (200 − 29,2) ≈ 7.670 J, sama dengan kalor yang diterima air: 836,8 × 9,2 ≈ 7.670 J.' },
        { q: 'Air 20 °C dan etanol (c = 2,46) 80 °C dengan massa sama dicampur. Apakah suhu akhirnya 50 °C? Hitunglah.', a: 'Tidak. Massanya saling meniadakan, sehingga T_f = (4,184 × 20 + 2,46 × 80) ÷ (4,184 + 2,46) = 280,5 ÷ 6,644 ≈ 42,2 °C. Kalor jenis air lebih besar, sehingga hasilnya tertarik ke arah suhu awal air.' },
        { q: 'Balok tembaga 100 g (c = 0,385) dan balok aluminium 100 g (c = 0,897), keduanya 100 °C, dimasukkan ke dua cangkir air dingin yang identik. Cangkir mana yang berakhir lebih hangat, dan mengapa?', a: 'Cangkir aluminium. Untuk massa dan penurunan suhu yang sama, aluminium melepas kalor sekitar 0,897 ÷ 0,385 ≈ 2,3 kali lebih banyak, karena tiap gramnya menyimpan lebih banyak energi per derajat. Kalor lebih banyak ke air yang sama berarti suhu akhir lebih tinggi.' },
      ],
    },
  },
};
