// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read isobars and a barometer to compare air pressure at different towns.',
      'Explain that wind blows from high pressure to low pressure, and faster when isobars are close together.',
      'Link low pressure with clouds and rain, high pressure with clear skies, and name the weather a cold or warm front brings.',
    ],
    id: [
      'Membaca isobar dan barometer untuk membandingkan tekanan udara di kota yang berbeda.',
      'Menjelaskan bahwa angin bertiup dari tekanan tinggi ke tekanan rendah, dan lebih kencang saat isobar berdekatan.',
      'Menghubungkan tekanan rendah dengan awan dan hujan, tekanan tinggi dengan langit cerah, dan menyebutkan cuaca yang dibawa front dingin atau front hangat.',
    ],
  },
  tryThis: {
    en: [
      'Drag the LOW right on top of a town. What does its barometer say, and what is the weather?',
      'Push the HIGH and LOW close together. What happens to the isobars and the wind arrows between them?',
      'Switch the Coriolis effect on and change hemisphere. Which way does the wind spiral around the low?',
    ],
    id: [
      'Geser pusat RENDAH tepat di atas sebuah kota. Apa yang dibaca barometernya, dan bagaimana cuacanya?',
      'Dekatkan pusat TINGGI dan RENDAH. Apa yang terjadi pada isobar dan panah angin di antara keduanya?',
      'Nyalakan efek Coriolis dan ganti belahan bumi. Ke arah mana angin berputar mengelilingi pusat tekanan rendah?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Air has weight. The whole column of air above one square metre of ground weighs about ten tonnes, and that weight pressing down is air pressure. At sea level it averages about 1013 hectopascals (hPa), but it is never exactly the same everywhere: where air is warm and rising, less air presses down and the pressure is a little lower; where air is cool and sinking, the pressure is a little higher. A barometer measures the pressure at one place, and a weather map joins places with equal pressure using lines called isobars.',
        'The simulation builds its map from just two centres. The HIGH adds pressure around itself and the LOW takes pressure away, and both effects fade smoothly with distance, like a round hill and a round hollow on a landscape of pressure. Isobars are drawn every 4 hPa, so where the pressure changes quickly the lines crowd together. The two sliders set how far above or below 1013 hPa each centre reaches, and you can drag the centres anywhere. The wind at every point is worked out from how steeply the pressure changes there: air flows from higher pressure toward lower pressure, and the steeper the change, the stronger the wind. That is why the arrows grow longer when you push the HIGH and LOW close together.',
        'Because the Earth spins, air that moves across its surface does not travel in a straight line but is deflected: to the right in the northern hemisphere and to the left in the southern hemisphere. This is the Coriolis effect. When the toggle is on, the simulation turns every wind arrow by about 70 degrees, so air spirals anticlockwise into a northern low and clockwise into a southern low, and the opposite way out of a high. High above the ground the real wind blows almost exactly along the isobars; near the ground friction slows it and lets it cross the isobars at an angle, so the angle used here is a reasonable middle value.',
        'Near a low, air converges and rises, cools, and its water vapour condenses into cloud and rain. Near a high, air sinks and warms, which dissolves cloud and gives clear skies. The simulation shortcuts this: it reads the pressure at your chosen town and calls it rain below 1004 hPa, cloudy up to 1011 hPa, and sunny above that. You can also add a front: a cold front (blue triangles) brings tall clouds and heavy showers, then cooler, clearer air; a warm front (red half-circles) brings wide sheets of cloud and steady light rain, then milder air. The model ignores temperature, humidity, mountains and the sea, and nothing changes with time, so treat it as a clear cartoon of the pattern rather than a forecast.',
      ],
      id: [
        'Udara memiliki berat. Seluruh kolom udara di atas satu meter persegi tanah beratnya sekitar sepuluh ton, dan berat yang menekan ke bawah itulah yang disebut tekanan udara. Di permukaan laut rata-ratanya sekitar 1013 hektopascal (hPa), tetapi nilainya tidak pernah sama persis di semua tempat: di tempat udara hangat dan naik, udara yang menekan lebih sedikit sehingga tekanannya sedikit lebih rendah; di tempat udara sejuk dan turun, tekanannya sedikit lebih tinggi. Barometer mengukur tekanan di satu tempat, dan peta cuaca menghubungkan tempat-tempat bertekanan sama dengan garis yang disebut isobar.',
        'Simulasi ini membangun petanya hanya dari dua pusat. Pusat TINGGI menambah tekanan di sekitarnya dan pusat RENDAH mengurangi tekanan, dan kedua pengaruh itu melemah secara halus seiring jarak, seperti bukit bundar dan cekungan bundar pada "bentang alam" tekanan. Isobar digambar setiap 4 hPa, sehingga di tempat tekanan berubah cepat garis-garisnya berdesakan. Dua slider mengatur seberapa jauh tiap pusat berada di atas atau di bawah 1013 hPa, dan pusatnya bisa kamu geser ke mana saja. Angin di tiap titik dihitung dari seberapa curam tekanan berubah di sana: udara mengalir dari tekanan lebih tinggi ke tekanan lebih rendah, dan makin curam perubahannya makin kencang anginnya. Itulah sebabnya panah angin memanjang ketika pusat TINGGI dan RENDAH kamu dekatkan.',
        'Karena Bumi berputar, udara yang bergerak di permukaannya tidak menempuh garis lurus melainkan dibelokkan: ke kanan di belahan bumi utara dan ke kiri di belahan bumi selatan. Inilah efek Coriolis. Saat sakelarnya dinyalakan, simulasi memutar setiap panah angin sekitar 70 derajat, sehingga udara berpusar berlawanan arah jarum jam ke dalam pusat rendah di utara dan searah jarum jam di selatan, serta sebaliknya ketika keluar dari pusat tinggi. Jauh di atas permukaan, angin sebenarnya bertiup hampir sejajar isobar; di dekat tanah gesekan memperlambatnya dan membuatnya memotong isobar dengan sudut tertentu, jadi sudut yang dipakai di sini adalah nilai tengah yang masuk akal.',
        'Di dekat pusat rendah, udara berkumpul dan naik, mendingin, lalu uap airnya mengembun menjadi awan dan hujan. Di dekat pusat tinggi, udara turun dan menghangat, sehingga awan menghilang dan langit cerah. Simulasi memotong jalan: ia membaca tekanan di kota pilihanmu dan menyebutnya hujan di bawah 1004 hPa, berawan sampai 1011 hPa, dan cerah di atas itu. Kamu juga bisa menambahkan front: front dingin (segitiga biru) membawa awan tinggi dan hujan deras, lalu udara lebih sejuk dan cerah; front hangat (setengah lingkaran merah) membawa lapisan awan luas dan hujan ringan terus-menerus, lalu udara lebih hangat. Model ini mengabaikan suhu, kelembapan, gunung dan laut, dan tidak ada yang berubah terhadap waktu, jadi anggaplah ia sebagai kartun yang jelas tentang polanya, bukan ramalan cuaca.',
      ],
    },
    figure: {
      caption: {
        en: 'Isobars around a high (H) and a low (L). Air flows from high to low pressure, fastest where the isobars are closest. With the Coriolis effect (northern hemisphere) the wind is bent to the right, so it spirals anticlockwise into the low.',
        id: 'Isobar di sekitar pusat tinggi (H) dan pusat rendah (L). Udara mengalir dari tekanan tinggi ke rendah, paling kencang di tempat isobar paling rapat. Dengan efek Coriolis (belahan utara) angin dibelokkan ke kanan, sehingga berpusar berlawanan arah jarum jam ke dalam pusat rendah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Isobars and wind between a high and a low', 'Isobar dan angin antara pusat tinggi dan rendah')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:10px}</style>
  <rect x="6" y="6" width="348" height="196" rx="6" class="m"/>
  <ellipse cx="92" cy="104" rx="28" ry="22" fill="none" stroke="#ef4444" stroke-width="1.6"/>
  <ellipse cx="92" cy="104" rx="56" ry="44" fill="none" stroke="#ef4444" stroke-width="1.6" opacity=".7"/>
  <ellipse cx="92" cy="104" rx="84" ry="66" fill="none" stroke="#ef4444" stroke-width="1.6" opacity=".4"/>
  <text x="92" y="109" text-anchor="middle" font-weight="700" fill="#ef4444">H</text>
  <text x="92" y="78" text-anchor="middle" class="s" fill="#ef4444">1025</text>
  <text x="92" y="56" text-anchor="middle" class="s" fill="#ef4444">1021</text>
  <text x="92" y="34" text-anchor="middle" class="s" fill="#ef4444">1017</text>
  <ellipse cx="274" cy="112" rx="18" ry="14" fill="none" stroke="#3b82f6" stroke-width="1.6"/>
  <ellipse cx="274" cy="112" rx="36" ry="28" fill="none" stroke="#3b82f6" stroke-width="1.6" opacity=".7"/>
  <ellipse cx="274" cy="112" rx="54" ry="42" fill="none" stroke="#3b82f6" stroke-width="1.6" opacity=".4"/>
  <text x="274" y="117" text-anchor="middle" font-weight="700" fill="#3b82f6">L</text>
  <text x="274" y="94" text-anchor="middle" class="s" fill="#3b82f6">997</text>
  <text x="274" y="80" text-anchor="middle" class="s" fill="#3b82f6">1001</text>
  <text x="274" y="66" text-anchor="middle" class="s" fill="#3b82f6">1005</text>
  <line x1="150" y1="104" x2="212" y2="110" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="140" y="96" class="s" fill="#10b981">${L('wind: high to low', 'angin: tinggi ke rendah')}</text>
  <path d="M150 128 Q190 128 226 150" class="f" stroke="#8b5cf6" stroke-dasharray="5 3" marker-end="url(#a)"/>
  <text x="128" y="166" class="s" fill="#8b5cf6">${L('with Coriolis: bent right (N)', 'dengan Coriolis: belok kanan (U)')}</text>
  <path d="M296 150 A30 30 0 1 1 250 150" fill="none" stroke="#8b5cf6" stroke-width="1.6" marker-end="url(#a)"/>
  <path d="M286 52 q-6 -12 6 -14 q4 -10 14 -5 q12 -3 12 8 q6 6 -4 11 z" fill="#8b5cf6" opacity=".55"/>
  <text x="318" y="66" class="s">${L('rising air, cloud, rain', 'udara naik, awan, hujan')}</text>
  <text x="60" y="188" class="s" fill="#ef4444">${L('sinking air, clear sky', 'udara turun, langit cerah')}</text>
  <text x="180" y="226" text-anchor="middle" class="s">${L('isobars close together = strong wind', 'isobar rapat = angin kencang')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Air pressure is the weight of the air above you; at sea level it is about 1013 hPa and varies from place to place by a few tens of hPa.',
        'Isobars join places with equal pressure; where they crowd together the pressure changes steeply and the wind is strong.',
        'Wind flows from high pressure to low pressure, but the spinning Earth bends it: right in the northern hemisphere, left in the southern.',
        'Air rises at a low, making clouds and rain; air sinks at a high, giving clear skies.',
        'A front is the boundary between two air masses; a cold front brings heavy showers then cooler air, a warm front brings steady rain then milder air.',
      ],
      id: [
        'Tekanan udara adalah berat udara di atas kita; di permukaan laut sekitar 1013 hPa dan berbeda beberapa puluh hPa dari satu tempat ke tempat lain.',
        'Isobar menghubungkan tempat-tempat bertekanan sama; di tempat isobar berdesakan, tekanan berubah curam dan angin kencang.',
        'Angin mengalir dari tekanan tinggi ke tekanan rendah, tetapi Bumi yang berputar membelokkannya: ke kanan di belahan utara, ke kiri di belahan selatan.',
        'Udara naik di pusat rendah dan membentuk awan serta hujan; udara turun di pusat tinggi dan memberi langit cerah.',
        'Front adalah batas antara dua massa udara; front dingin membawa hujan deras lalu udara sejuk, front hangat membawa hujan ringan terus-menerus lalu udara lebih hangat.',
      ],
    },
    vocabulary: {
      en: [
        ['Air pressure', 'The push of the air on a surface, caused by the weight of the air above it. Measured in hectopascals (hPa).'],
        ['Barometer', 'An instrument that measures air pressure. Falling pressure often means rain is coming; rising pressure means clearing weather.'],
        ['Isobar', 'A line on a weather map joining places that have the same air pressure.'],
        ['Pressure gradient', 'How quickly pressure changes with distance. A steep gradient (close isobars) drives a strong wind.'],
        ['High (anticyclone)', 'A region where pressure is higher than its surroundings; air sinks and spreads outward, usually bringing clear, settled weather.'],
        ['Low (depression)', 'A region where pressure is lower than its surroundings; air flows in and rises, usually bringing clouds and rain.'],
        ['Coriolis effect', 'The apparent sideways bending of moving air (or water) caused by the Earth\'s rotation.'],
        ['Front', 'The boundary where a cold air mass and a warm air mass meet. Clouds and rain form along it.'],
      ],
      id: [
        ['Tekanan udara', 'Dorongan udara pada suatu permukaan, yang disebabkan oleh berat udara di atasnya. Diukur dalam hektopascal (hPa).'],
        ['Barometer', 'Alat untuk mengukur tekanan udara. Tekanan yang turun sering berarti hujan akan datang; tekanan naik berarti cuaca akan cerah.'],
        ['Isobar', 'Garis pada peta cuaca yang menghubungkan tempat-tempat dengan tekanan udara yang sama.'],
        ['Gradien tekanan', 'Seberapa cepat tekanan berubah terhadap jarak. Gradien curam (isobar rapat) menghasilkan angin kencang.'],
        ['Pusat tekanan tinggi (antisiklon)', 'Daerah dengan tekanan lebih tinggi daripada sekitarnya; udara turun dan menyebar ke luar, biasanya membawa cuaca cerah dan tenang.'],
        ['Pusat tekanan rendah (depresi)', 'Daerah dengan tekanan lebih rendah daripada sekitarnya; udara mengalir masuk dan naik, biasanya membawa awan dan hujan.'],
        ['Efek Coriolis', 'Pembelokan udara (atau air) yang bergerak ke samping, yang tampak terjadi karena rotasi Bumi.'],
        ['Front', 'Batas tempat massa udara dingin dan massa udara hangat bertemu. Awan dan hujan terbentuk di sepanjangnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Air is weightless, so it cannot press on anything.', 'Air has mass. The column of air above one square metre weighs about ten tonnes; we do not feel it because it presses equally from all sides and our bodies push back.'],
        ['High pressure means bad weather, because the air is "pressing down" hard.', 'It is the opposite. In a high, air sinks and warms, which dries it out and clears the sky. Clouds and rain belong to lows, where air rises and cools.'],
        ['Wind blows in a straight line from the high to the nearest low.', 'Only in the simplest picture. Over hundreds of kilometres the Earth\'s rotation bends the flow, so air actually spirals around highs and lows rather than running straight between them.'],
        ['The Coriolis effect decides which way water swirls down a sink.', 'The effect is far too weak at the scale of a sink; the swirl there is set by how the water was poured. Coriolis matters for air and water moving over hundreds of kilometres for hours.'],
      ],
      id: [
        ['Udara tidak punya berat, jadi tidak bisa menekan apa pun.', 'Udara punya massa. Kolom udara di atas satu meter persegi beratnya sekitar sepuluh ton; kita tidak merasakannya karena tekanan itu datang sama besar dari semua arah dan tubuh kita menekan balik.'],
        ['Tekanan tinggi berarti cuaca buruk, karena udaranya "menekan" kuat ke bawah.', 'Justru kebalikannya. Di pusat tinggi udara turun dan menghangat, sehingga mengering dan langit cerah. Awan dan hujan milik pusat rendah, tempat udara naik dan mendingin.'],
        ['Angin bertiup lurus dari pusat tinggi ke pusat rendah terdekat.', 'Hanya dalam gambaran paling sederhana. Pada jarak ratusan kilometer rotasi Bumi membelokkan aliran, sehingga udara sebenarnya berpusar mengelilingi pusat tinggi dan rendah, bukan mengalir lurus di antara keduanya.'],
        ['Efek Coriolis menentukan arah putaran air di wastafel.', 'Efek itu terlalu lemah pada skala wastafel; putaran di sana ditentukan oleh cara air dituang. Coriolis baru berarti untuk udara dan air yang bergerak ratusan kilometer selama berjam-jam.'],
      ],
    },
    realWorld: {
      en: [
        'TV and app weather maps use exactly these symbols: H and L, isobars, blue-triangle cold fronts and red-half-circle warm fronts.',
        'A tropical cyclone (typhoon or hurricane) is an extremely deep low, down to 900 hPa in the strongest storms, with winds spiralling into it under the Coriolis effect.',
        'Tropical cyclones almost never form within about 5 degrees of the equator, because the Coriolis effect is too weak there to start the spin. This is one reason Indonesia is rarely hit directly.',
        'Many phones and watches contain a tiny barometer; hikers use the falling pressure reading as an early warning of a storm.',
      ],
      id: [
        'Peta cuaca di TV dan aplikasi memakai simbol yang sama persis: H dan L, isobar, front dingin bersegitiga biru, dan front hangat bersetengah lingkaran merah.',
        'Siklon tropis (topan atau hurikan) adalah pusat rendah yang sangat dalam, sampai 900 hPa pada badai terkuat, dengan angin yang berpusar masuk karena efek Coriolis.',
        'Siklon tropis hampir tidak pernah terbentuk dalam jarak sekitar 5 derajat dari khatulistiwa, karena efek Coriolis di sana terlalu lemah untuk memulai pusaran. Ini salah satu alasan Indonesia jarang diterjang langsung.',
        'Banyak ponsel dan jam tangan berisi barometer kecil; pendaki memakai bacaan tekanan yang turun sebagai peringatan dini akan badai.',
      ],
    },
    questions: {
      en: [
        { q: 'Town Mawar reads 1030 hPa and town Teratai reads 1000 hPa. Which town is more likely to have rain, and why?', a: 'Teratai. Its low pressure means air is converging and rising there; rising air cools and its water vapour condenses into cloud and rain. At Mawar, air is sinking and warming, so the sky stays clear. In the sim, 1000 hPa is below the 1004 hPa "rain" threshold.' },
        { q: 'You drag the HIGH and the LOW close together without changing the sliders. What happens to the wind between them, and why?', a: 'It gets stronger. The pressure difference between the centres is the same, but it now occurs over a shorter distance, so the pressure gradient is steeper. Steeper gradient means the isobars crowd together and the wind arrows grow longer.' },
        { q: 'With the Coriolis effect on and the northern hemisphere selected, which way does the air circle the LOW? What changes if you switch to the southern hemisphere?', a: 'Anticlockwise. Air heading inward toward the low is bent to its right, which turns the straight inflow into an anticlockwise spiral. In the southern hemisphere the deflection is to the left, so the spiral becomes clockwise.' },
      ],
      id: [
        { q: 'Kota Mawar membaca 1030 hPa dan kota Teratai membaca 1000 hPa. Kota mana yang lebih mungkin hujan, dan mengapa?', a: 'Teratai. Tekanan rendahnya berarti udara berkumpul dan naik di sana; udara yang naik mendingin dan uap airnya mengembun menjadi awan dan hujan. Di Mawar udara turun dan menghangat, sehingga langit tetap cerah. Dalam simulasi, 1000 hPa berada di bawah ambang "hujan" 1004 hPa.' },
        { q: 'Kamu mendekatkan pusat TINGGI dan RENDAH tanpa mengubah slider. Apa yang terjadi pada angin di antara keduanya, dan mengapa?', a: 'Anginnya menjadi lebih kencang. Selisih tekanan antara kedua pusat tetap sama, tetapi kini terjadi pada jarak yang lebih pendek, sehingga gradien tekanannya lebih curam. Gradien yang lebih curam berarti isobar berdesakan dan panah angin memanjang.' },
        { q: 'Dengan efek Coriolis menyala dan belahan bumi utara dipilih, ke arah mana udara mengelilingi pusat RENDAH? Apa yang berubah jika kamu beralih ke belahan selatan?', a: 'Berlawanan arah jarum jam. Udara yang menuju ke dalam pusat rendah dibelokkan ke kanannya, sehingga aliran masuk yang lurus berubah menjadi pusaran berlawanan arah jarum jam. Di belahan selatan pembelokannya ke kiri, sehingga pusarannya menjadi searah jarum jam.' },
      ],
    },
  },
};
