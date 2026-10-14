// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish visible light (incoming) from infrared (outgoing).',
      'Explain how more greenhouse gas raises surface temperature.',
      'Recognize the energy-balance argument behind climate models.',
    ],
    id: [
      'Membedakan cahaya tampak (masuk) dari inframerah (keluar).',
      'Menjelaskan mengapa lebih banyak gas rumah kaca menaikkan suhu permukaan.',
      'Mengenali argumen keseimbangan energi di balik model iklim.',
    ],
  },
  tryThis: {
    en: [
      'Drop CO₂ to 0 — what happens to surface temperature?',
      'Double CO₂ from 280 to 560 ppm, then to 1120 ppm — does each doubling add the same number of degrees?',
      'Compare today\'s ~420 ppm with the pre-industrial ~280 ppm.',
    ],
    id: [
      'Turunkan CO₂ ke 0 — apa yang terjadi pada suhu permukaan?',
      'Gandakan CO₂ dari 280 ke 560 ppm, lalu ke 1120 ppm — apakah setiap penggandaan menambah jumlah derajat yang sama?',
      'Bandingkan ~420 ppm saat ini dengan ~280 ppm pra-industri.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Sunlight arrives mostly as visible light, which passes almost freely through the air. About 30% of it is reflected straight back to space by clouds, ice and bright ground; this fraction is the albedo. The rest is absorbed and warms the surface. Every warm object radiates, and a surface at Earth-like temperatures radiates invisible infrared light. A planet settles at the temperature where the infrared energy leaving equals the sunlight energy absorbed. For Earth without an atmosphere that balance would be reached at about −18 °C, far below freezing.',
        'Greenhouse gases such as water vapour, carbon dioxide and methane are transparent to visible light but absorb infrared. When they absorb infrared coming up from the surface they re-emit it in all directions, so roughly half heads back down. The surface now receives sunlight plus this returned infrared, and it must warm up until it radiates enough to push the same energy out through the atmosphere. This extra warmth is the greenhouse effect; it lifts Earth\'s average from about −18 °C to the actual +15 °C, a difference of about 33 °C that makes liquid water and life possible.',
        'The simulation computes the temperature in two parts. First the energy balance gives the bare-planet temperature: the surface must radiate exactly the sunlight it absorbs, which for Earth\'s albedo of 0.30 is about −18 °C. Then a greenhouse warming is added that grows with the logarithm of the CO₂ concentration: 280 ppm gives the real pre-industrial +15 °C, and every doubling of CO₂ adds about 3 °C, the climate sensitivity that climate science estimates for the real Earth. Below about 20 ppm the warming is ramped smoothly to zero, so at 0 ppm the planet behaves as a bare rock at about −18 °C. The albedo slider changes how much sunlight is reflected before it can warm anything: a brighter planet is a colder planet. The yellow and red particles show visible light going down and infrared going up, with some red ones turned back by the green layer; the layer\'s opacity is only a picture of the absorption, not the number used for the temperature.',
        'The sim\'s numbers should be read as trends, not predictions. With the default albedo it gives 15 °C for 280 ppm, about 16.8 °C for 420 ppm and 18 °C for 560 ppm, so going from pre-industrial to today adds roughly 1.8 °C of eventual warming, close to what climate science expects once the oceans catch up. The logarithmic law is why each doubling adds the same amount: the strongest CO₂ absorption bands are already saturated, so extra CO₂ only widens their edges. The real atmosphere also has water vapour, clouds, winds, oceans and many layers, which the sim lumps into the single 3 °C-per-doubling number. The energy-balance reasoning, however, is exactly the argument that full climate models are built on.',
      ],
      id: [
        'Sinar matahari tiba sebagian besar sebagai cahaya tampak, yang hampir bebas menembus udara. Sekitar 30% dipantulkan langsung kembali ke angkasa oleh awan, es, dan permukaan yang cerah; bagian ini disebut albedo. Sisanya diserap dan memanaskan permukaan. Setiap benda hangat memancarkan radiasi, dan permukaan pada suhu seperti Bumi memancarkan cahaya inframerah yang tak terlihat. Sebuah planet menetap pada suhu ketika energi inframerah yang keluar sama dengan energi sinar matahari yang diserap. Untuk Bumi tanpa atmosfer, keseimbangan itu tercapai pada sekitar −18 °C, jauh di bawah titik beku.',
        'Gas rumah kaca seperti uap air, karbon dioksida, dan metana tembus cahaya tampak tetapi menyerap inframerah. Saat menyerap inframerah yang naik dari permukaan, gas-gas ini memancarkannya kembali ke segala arah, sehingga kira-kira setengahnya kembali ke bawah. Permukaan kini menerima sinar matahari ditambah inframerah yang dikembalikan, dan harus memanas sampai memancarkan cukup energi untuk mendorong jumlah yang sama keluar melewati atmosfer. Kehangatan ekstra inilah efek rumah kaca; ia menaikkan suhu rata-rata Bumi dari sekitar −18 °C ke +15 °C yang sebenarnya, selisih sekitar 33 °C yang memungkinkan air cair dan kehidupan.',
        'Simulasi menghitung suhu dalam dua bagian. Pertama, keseimbangan energi memberi suhu planet telanjang: permukaan harus memancarkan persis sebanyak sinar matahari yang diserapnya, yang untuk albedo Bumi 0,30 adalah sekitar −18 °C. Lalu ditambahkan pemanasan rumah kaca yang bertambah mengikuti logaritma konsentrasi CO₂: 280 ppm memberi +15 °C pra-industri yang sesungguhnya, dan setiap penggandaan CO₂ menambah sekitar 3 °C, yaitu sensitivitas iklim yang diperkirakan ilmu iklim untuk Bumi nyata. Di bawah sekitar 20 ppm pemanasan diturunkan mulus ke nol, sehingga pada 0 ppm planet berperilaku seperti batu telanjang pada sekitar −18 °C. Slider albedo mengubah berapa banyak sinar matahari yang dipantulkan sebelum sempat memanaskan apa pun: planet yang lebih cerah adalah planet yang lebih dingin. Partikel kuning dan merah menunjukkan cahaya tampak turun dan inframerah naik, dengan sebagian yang merah dibalikkan oleh lapisan hijau; kepekatan lapisan hanya gambaran penyerapan, bukan angka yang dipakai untuk menghitung suhu.',
        'Angka-angka simulasi sebaiknya dibaca sebagai kecenderungan, bukan prediksi. Dengan albedo bawaan, simulasi memberi 15 °C untuk 280 ppm, sekitar 16,8 °C untuk 420 ppm, dan 18 °C untuk 560 ppm, sehingga perubahan dari pra-industri ke hari ini menambah kira-kira 1,8 °C pemanasan akhir, dekat dengan perkiraan ilmu iklim setelah lautan menyusul. Hukum logaritma inilah sebabnya setiap penggandaan menambah jumlah yang sama: pita serapan CO₂ yang terkuat sudah jenuh, sehingga CO₂ tambahan hanya melebarkan tepinya. Atmosfer nyata juga memiliki uap air, awan, angin, lautan, dan banyak lapisan, yang oleh simulasi dirangkum ke dalam satu angka 3 °C per penggandaan. Namun, penalaran keseimbangan energinya persis argumen yang menjadi dasar model iklim lengkap.',
      ],
    },
    figure: {
      caption: {
        en: 'Energy flows in the sim\'s one-layer model. Of 100 units of sunlight, about 30 are reflected (albedo) and 70 warm the surface. The surface radiates infrared; the greenhouse layer absorbs part of it and sends half of that back down, so the surface must get warmer to push 70 units out to space.',
        id: 'Aliran energi dalam model satu lapisan simulasi. Dari 100 satuan sinar matahari, sekitar 30 dipantulkan (albedo) dan 70 memanaskan permukaan. Permukaan memancarkan inframerah; lapisan rumah kaca menyerap sebagian dan mengirim setengahnya kembali ke bawah, sehingga permukaan harus lebih panas untuk mendorong 70 satuan keluar ke angkasa.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Energy balance with a greenhouse layer', 'Keseimbangan energi dengan lapisan rumah kaca')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10.5px}.f{stroke-width:2.4;fill:none}.t{stroke-width:1.6;fill:none}</style>
  <text x="180" y="16" text-anchor="middle" class="s" opacity=".7">${L('space', 'angkasa')}</text>
  <rect x="0" y="96" width="360" height="28" fill="#10b981" opacity=".22"/>
  <text x="6" y="114" class="s" fill="#10b981">${L('greenhouse gas layer', 'lapisan gas rumah kaca')}</text>
  <rect x="0" y="196" width="360" height="44" fill="currentColor" opacity=".15"/>
  <text x="6" y="226" class="s">${L('surface', 'permukaan')}</text>
  <circle cx="40" cy="38" r="14" fill="#f59e0b"/>
  <line x1="62" y1="48" x2="120" y2="192" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="96" y="78" fill="#f59e0b" class="s">${L('sunlight 100', 'sinar matahari 100')}</text>
  <line x1="104" y1="150" x2="150" y2="30" class="t" stroke="#f59e0b" stroke-dasharray="5 3" marker-end="url(#a)"/>
  <text x="150" y="52" fill="#f59e0b" class="s">${L('reflected 30', 'dipantulkan 30')}</text>
  <text x="150" y="64" fill="#f59e0b" class="s">${L('(albedo)', '(albedo)')}</text>
  <text x="60" y="186" fill="#f59e0b" class="s">${L('absorbed 70', 'diserap 70')}</text>
  <line x1="230" y1="194" x2="230" y2="128" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="236" y="166" fill="#ef4444" class="s">${L('infrared from', 'inframerah dari')}</text>
  <text x="236" y="178" fill="#ef4444" class="s">${L('warm surface', 'permukaan hangat')}</text>
  <line x1="230" y1="94" x2="230" y2="30" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="236" y="46" fill="#ef4444" class="s">${L('escapes: 70', 'lolos: 70')}</text>
  <line x1="214" y1="126" x2="190" y2="192" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="124" y="150" fill="#ef4444" class="s">${L('half of absorbed', 'setengah yang diserap')}</text>
  <text x="124" y="162" fill="#ef4444" class="s">${L('IR returns down', 'IR kembali ke bawah')}</text>
  <text x="300" y="112" class="s" text-anchor="middle">${L('more CO₂ =', 'CO₂ lebih banyak =')}</text>
  <text x="300" y="124" class="s" text-anchor="middle">${L('more absorbed', 'lebih banyak diserap')}</text>
  <text x="300" y="214" class="s" text-anchor="middle" fill="#ef4444">${L('warmer surface', 'permukaan lebih hangat')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Visible sunlight passes through the air and warms the surface; the surface cools by radiating infrared.',
        'A planet\'s temperature settles where energy out equals energy in; without greenhouse gases Earth would average about −18 °C.',
        'Greenhouse gases absorb infrared and re-emit part of it downward, so the surface must be warmer to push the same energy out to space.',
        'More CO₂ means more infrared absorbed and a warmer surface; a higher albedo means more sunlight reflected and a cooler surface.',
        'Warming grows with the logarithm of CO₂: each doubling adds about 3 °C, so 280→560 ppm and 560→1120 ppm give the same temperature step.',
      ],
      id: [
        'Cahaya tampak dari Matahari menembus udara dan memanaskan permukaan; permukaan mendingin dengan memancarkan inframerah.',
        'Suhu planet menetap saat energi keluar sama dengan energi masuk; tanpa gas rumah kaca suhu rata-rata Bumi sekitar −18 °C.',
        'Gas rumah kaca menyerap inframerah dan memancarkan sebagian kembali ke bawah, sehingga permukaan harus lebih hangat untuk mendorong energi yang sama keluar ke angkasa.',
        'Lebih banyak CO₂ berarti lebih banyak inframerah diserap dan permukaan lebih hangat; albedo lebih tinggi berarti lebih banyak sinar matahari dipantulkan dan permukaan lebih dingin.',
        'Pemanasan bertambah mengikuti logaritma CO₂: setiap penggandaan menambah sekitar 3 °C, sehingga 280→560 ppm dan 560→1120 ppm memberi lonjakan suhu yang sama.',
      ],
    },
    vocabulary: {
      en: [
        ['Infrared radiation', 'Invisible light with longer wavelengths than red, emitted by anything warm, including Earth\'s surface.'],
        ['Albedo', 'The fraction of sunlight a surface reflects; Earth\'s average is about 0.30, fresh snow about 0.8, open ocean about 0.06.'],
        ['Greenhouse gas', 'A gas that lets visible light through but absorbs infrared: water vapour, carbon dioxide, methane, nitrous oxide and ozone.'],
        ['Energy balance', 'The condition where energy absorbed from the Sun equals energy radiated to space; it sets a planet\'s average temperature.'],
        ['Parts per million (ppm)', 'A concentration unit: 420 ppm CO₂ means 420 molecules of CO₂ in every million molecules of air.'],
        ['Greenhouse effect', 'The warming of a planet\'s surface caused by greenhouse gases returning part of the outgoing infrared.'],
        ['Climate sensitivity', 'The long-term warming caused by doubling CO₂, estimated at about 3 °C for the real Earth including feedbacks.'],
      ],
      id: [
        ['Radiasi inframerah', 'Cahaya tak terlihat dengan panjang gelombang lebih panjang dari merah, dipancarkan oleh benda hangat apa pun, termasuk permukaan Bumi.'],
        ['Albedo', 'Bagian sinar matahari yang dipantulkan suatu permukaan; rata-rata Bumi sekitar 0,30, salju segar sekitar 0,8, laut terbuka sekitar 0,06.'],
        ['Gas rumah kaca', 'Gas yang meloloskan cahaya tampak tetapi menyerap inframerah: uap air, karbon dioksida, metana, dinitrogen oksida, dan ozon.'],
        ['Keseimbangan energi', 'Keadaan saat energi yang diserap dari Matahari sama dengan energi yang dipancarkan ke angkasa; inilah yang menentukan suhu rata-rata planet.'],
        ['Bagian per juta (ppm)', 'Satuan konsentrasi: 420 ppm CO₂ berarti ada 420 molekul CO₂ dalam setiap sejuta molekul udara.'],
        ['Efek rumah kaca', 'Pemanasan permukaan planet yang disebabkan gas rumah kaca mengembalikan sebagian inframerah yang keluar.'],
        ['Sensitivitas iklim', 'Pemanasan jangka panjang akibat penggandaan CO₂, diperkirakan sekitar 3 °C untuk Bumi sungguhan termasuk umpan balik.'],
      ],
    },
    misconceptions: {
      en: [
        ['The greenhouse effect is the same as the ozone hole.', 'They are different problems. Ozone high in the atmosphere blocks ultraviolet light; its thinning lets more UV reach the ground. The greenhouse effect is about infrared being trapped by gases such as CO₂ and water vapour, mainly lower down.'],
        ['CO₂ is only a tiny fraction of the air, so it cannot matter.', 'Nitrogen and oxygen, 99% of the air, are nearly transparent to infrared, so the small amount of CO₂ does almost all the absorbing at certain wavelengths. Set CO₂ to zero in the sim and the planet drops to about −18 °C.'],
        ['The greenhouse effect is entirely harmful.', 'The natural greenhouse effect keeps Earth about 33 °C warmer than it would otherwise be, which is what makes liquid oceans possible. The problem is the extra warming from adding greenhouse gases faster than ecosystems and societies can adapt.'],
        ['Greenhouse gases work like the glass of a greenhouse.', 'A real greenhouse stays warm mostly because the glass stops warm air from rising and escaping. The atmospheric effect is about absorbing and re-emitting infrared radiation, not about blocking air flow; the name is a loose analogy.'],
      ],
      id: [
        ['Efek rumah kaca sama dengan lubang ozon.', 'Keduanya masalah yang berbeda. Ozon di atmosfer atas menghalangi sinar ultraviolet; menipisnya ozon membuat lebih banyak UV mencapai tanah. Efek rumah kaca menyangkut inframerah yang ditahan gas seperti CO₂ dan uap air, terutama di lapisan bawah.'],
        ['CO₂ hanya bagian sangat kecil dari udara, jadi tidak mungkin berpengaruh.', 'Nitrogen dan oksigen, 99% udara, hampir tembus terhadap inframerah, sehingga CO₂ yang sedikit itu melakukan hampir semua penyerapan pada panjang gelombang tertentu. Atur CO₂ ke nol di simulasi, dan suhu planet turun ke sekitar −18 °C.'],
        ['Efek rumah kaca sepenuhnya merugikan.', 'Efek rumah kaca alami menjaga Bumi sekitar 33 °C lebih hangat daripada seharusnya, dan inilah yang memungkinkan lautan tetap cair. Masalahnya adalah pemanasan tambahan karena gas rumah kaca ditambahkan lebih cepat daripada kemampuan ekosistem dan masyarakat untuk beradaptasi.'],
        ['Gas rumah kaca bekerja seperti kaca pada rumah kaca.', 'Rumah kaca sungguhan tetap hangat terutama karena kacanya mencegah udara hangat naik dan keluar. Efek di atmosfer menyangkut penyerapan dan pemancaran ulang radiasi inframerah, bukan penghalangan aliran udara; namanya hanya perumpamaan longgar.'],
      ],
    },
    realWorld: {
      en: [
        'Atmospheric CO₂ has risen from about 280 ppm before the industrial era to about 420 ppm today, measured continuously at Mauna Loa, Hawaii, since 1958.',
        'Venus has a thick atmosphere that is almost pure CO₂, and its surface temperature is about 460 °C, hot enough to melt lead, even though its clouds reflect most of the sunlight.',
        'The Moon has the same sunlight as Earth but no atmosphere, so its average surface temperature is far below 0 °C and swings by hundreds of degrees between day and night.',
        'Melting Arctic sea ice lowers Earth\'s albedo, because dark ocean absorbs sunlight that white ice used to reflect; the sim\'s albedo slider shows which way that pushes the temperature.',
      ],
      id: [
        'CO₂ di atmosfer naik dari sekitar 280 ppm sebelum era industri menjadi sekitar 420 ppm saat ini, diukur terus-menerus di Mauna Loa, Hawaii, sejak 1958.',
        'Venus memiliki atmosfer tebal yang hampir seluruhnya CO₂, dan suhu permukaannya sekitar 460 °C, cukup panas untuk melelehkan timbal, meskipun awannya memantulkan sebagian besar sinar matahari.',
        'Bulan menerima sinar matahari yang sama dengan Bumi tetapi tidak punya atmosfer, sehingga suhu permukaan rata-ratanya jauh di bawah 0 °C dan berayun ratusan derajat antara siang dan malam.',
        'Mencairnya es laut Arktik menurunkan albedo Bumi, karena laut yang gelap menyerap sinar matahari yang dulu dipantulkan es putih; slider albedo di simulasi menunjukkan ke arah mana hal itu mendorong suhu.',
      ],
    },
    questions: {
      en: [
        { q: 'Set CO₂ to 0 ppm with albedo 0.30. The sim shows about −18 °C. Explain where this number comes from.', a: 'With no greenhouse layer the surface simply radiates to space, so it settles at the temperature where its infrared output equals the absorbed sunlight: 70% of the incoming 1361 W/m², spread over the whole globe, is about 238 W/m². A surface radiating that much is at about 255 K, which is −18 °C. This is the "bare planet" temperature of Earth.' },
        { q: 'Raise the albedo from 0.30 to 0.60 while keeping CO₂ fixed. Does the temperature go up or down, and why?', a: 'Down. Albedo is the fraction of sunlight reflected before it is absorbed, so at 0.60 only 40% of the sunlight warms the surface instead of 70%. Less energy in means the surface balances at a lower temperature; an ice-covered "snowball Earth" would be very cold for this reason.' },
        { q: 'Going from 280 to 560 ppm raises the temperature by about 3 °C. How much more does going from 560 to 1120 ppm add, and why is it not twice as much?', a: 'Also about 3 °C. The warming grows with the logarithm of CO₂, so what matters is the ratio, not the number of ppm added: 560→1120 is another doubling, the same ratio as 280→560. Physically, the strongest CO₂ absorption bands are already nearly saturated, so adding more CO₂ only widens the edges of those bands, giving diminishing returns per ppm. (Venus, with a CO₂ atmosphere 90 times thicker than ours, still reaches 460 °C because its pressure and thickness put it far beyond this simple law.)' },
      ],
      id: [
        { q: 'Atur CO₂ ke 0 ppm dengan albedo 0,30. Simulasi menunjukkan sekitar −18 °C. Jelaskan dari mana angka ini berasal.', a: 'Tanpa lapisan rumah kaca, permukaan langsung memancarkan radiasi ke angkasa, sehingga menetap pada suhu ketika inframerah yang dipancarkannya sama dengan sinar matahari yang diserap: 70% dari 1361 W/m² yang datang, disebarkan ke seluruh bola Bumi, sekitar 238 W/m². Permukaan yang memancarkan sebesar itu bersuhu sekitar 255 K, yaitu −18 °C. Inilah suhu "planet telanjang" Bumi.' },
        { q: 'Naikkan albedo dari 0,30 ke 0,60 sambil menjaga CO₂ tetap. Apakah suhu naik atau turun, dan mengapa?', a: 'Turun. Albedo adalah bagian sinar matahari yang dipantulkan sebelum diserap, jadi pada 0,60 hanya 40% sinar matahari yang memanaskan permukaan, bukan 70%. Energi masuk yang lebih sedikit berarti permukaan seimbang pada suhu lebih rendah; "Bumi bola salju" yang tertutup es akan sangat dingin karena alasan ini.' },
        { q: 'Naik dari 280 ke 560 ppm menaikkan suhu sekitar 3 °C. Berapa tambahan dari 560 ke 1120 ppm, dan mengapa bukan dua kali lipatnya?', a: 'Juga sekitar 3 °C. Pemanasan bertambah mengikuti logaritma CO₂, jadi yang penting adalah rasionya, bukan jumlah ppm yang ditambahkan: 560→1120 adalah penggandaan lagi, rasio yang sama dengan 280→560. Secara fisik, pita serapan CO₂ yang terkuat sudah hampir jenuh, sehingga CO₂ tambahan hanya melebarkan tepi pita itu dan hasilnya per ppm makin kecil. (Venus, dengan atmosfer CO₂ 90 kali lebih tebal dari kita, tetap mencapai 460 °C karena tekanan dan ketebalannya jauh melampaui hukum sederhana ini.)' },
      ],
    },
  },
};
