// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read a thermometer and a rain gauge using a number scale.',
      'Describe wind (calm, breezy, windy) and cloud cover (clear, some clouds, cloudy) from what you see.',
      'Compare several days of weather and describe how seasons differ.',
    ],
    id: [
      'Membaca termometer dan penakar hujan dengan skala angka.',
      'Menggambarkan angin (tenang, berangin pelan, berangin kencang) dan tutupan awan (cerah, berawan sebagian, berawan) dari yang dilihat.',
      'Membandingkan cuaca beberapa hari dan menjelaskan perbedaan antar musim.',
    ],
  },
  tryThis: {
    en: [
      'Record five days in the dry season, then five in the rainy season. Which has more rain? Which is warmer?',
      'Switch to four seasons. Find a winter day. What does the thermometer show? What falls from the sky?',
      'Watch the tree on a windy day. Then look at the flag. How do they match?',
    ],
    id: [
      'Catat lima hari di musim kemarau, lalu lima hari di musim hujan. Mana yang lebih banyak hujan? Mana yang lebih hangat?',
      'Beralih ke empat musim. Cari hari musim dingin. Apa yang ditunjukkan termometer? Apa yang turun dari langit?',
      'Perhatikan pohon pada hari berangin. Lalu lihat benderanya. Bagaimana kecocokannya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Weather is what the air is doing outside today. It can be hot or cold, wet or dry, windy or still, cloudy or clear. Weather changes from one day to the next. To describe it fairly, scientists do not just guess. They measure it with instruments and write the numbers down.',
        'In this sim you are the weather reporter. Pick a season and press New day. The sim makes a new day with weather that fits that season. Then read the four instruments. The thermometer shows how warm the air is, in degrees Celsius: the red line climbs higher when it is hotter. The rain gauge is a cup that catches rain; the water level shows how many millimetres of rain fell. The flag shows the wind: it hangs down when the air is calm and flies straight out when it is windy, and the arrow points to where the wind is coming from. The cloud gauge shows how much of the sky is covered by cloud. Turn on Show numbers to see the exact values.',
        'Indonesia has two seasons, the dry season and the rainy season. Many other countries have four: spring, summer, autumn and winter. The sim picks each day\'s weather by chance from the usual range for that season, so two days in the same season are never exactly the same. But over many days you will see that the rainy season is wetter and winter is colder. When the air is at or below 0 degrees, the rain falls as snow instead. Remember this is pretend weather, not a forecast for your town, and it leaves out things like humidity and thunder.',
      ],
      id: [
        'Cuaca adalah keadaan udara di luar pada hari ini. Bisa panas atau dingin, basah atau kering, berangin atau tenang, berawan atau cerah. Cuaca berubah dari hari ke hari. Untuk menggambarkannya dengan adil, para ilmuwan tidak sekadar menebak. Mereka mengukurnya dengan alat dan menuliskan angkanya.',
        'Dalam simulasi ini kamu menjadi pelapor cuaca. Pilih musim dan tekan Hari baru. Simulasi membuat hari baru dengan cuaca yang cocok untuk musim itu. Lalu bacalah keempat alatnya. Termometer menunjukkan seberapa hangat udara, dalam derajat Celsius: garis merahnya naik lebih tinggi saat lebih panas. Penakar hujan adalah gelas yang menangkap hujan; tinggi airnya menunjukkan berapa milimeter hujan yang turun. Bendera menunjukkan angin: bendera menggantung ke bawah saat udara tenang dan berkibar lurus saat berangin kencang, dan panahnya menunjuk dari mana angin datang. Pengukur awan menunjukkan seberapa banyak langit yang tertutup awan. Nyalakan Show numbers untuk melihat angka pastinya.',
        'Indonesia punya dua musim, musim kemarau dan musim hujan. Banyak negara lain punya empat musim: musim semi, musim panas, musim gugur, dan musim dingin. Simulasi memilih cuaca tiap hari secara acak dari rentang yang biasa untuk musim itu, jadi dua hari di musim yang sama tidak pernah persis sama. Tetapi setelah banyak hari kamu akan melihat bahwa musim hujan lebih basah dan musim dingin lebih dingin. Saat udara 0 derajat atau lebih rendah, hujan turun sebagai salju. Ingat, ini cuaca pura-pura, bukan ramalan untuk kotamu, dan hal-hal seperti kelembapan dan guntur tidak ditampilkan.',
      ],
    },
    figure: {
      caption: {
        en: 'The four instruments: a thermometer (read the top of the red line), a rain gauge (read the water level), a flag for wind, and a cloud gauge.',
        id: 'Keempat alat: termometer (baca ujung garis merah), penakar hujan (baca tinggi air), bendera untuk angin, dan pengukur awan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Thermometer, rain gauge, wind flag and cloud gauge', 'Termometer, penakar hujan, bendera angin, dan pengukur awan')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.t{text-anchor:middle}.b{font-size:12px;font-weight:700}</style>
  <rect x="52" y="24" width="16" height="152" rx="8" class="m"/>
  <rect x="56" y="84" width="8" height="92" fill="#ef4444"/>
  <circle cx="60" cy="184" r="13" fill="#ef4444"/>
  <path d="M68 40 L76 40 M68 72 L76 72 M68 104 L76 104 M68 136 L76 136 M68 168 L76 168" stroke="currentColor" stroke-width="1.2"/>
  <text x="80" y="44">40</text><text x="80" y="76">30</text><text x="80" y="108">20</text><text x="80" y="140">10</text><text x="80" y="172">0 °C</text>
  <text x="38" y="88" text-anchor="end" fill="#ef4444">25</text>
  <text x="60" y="222" class="t b">${L('Heat', 'Panas')}</text>
  <rect x="134" y="56" width="40" height="124" class="m"/>
  <rect x="135" y="141" width="38" height="38" fill="#3b82f6" opacity=".7"/>
  <path d="M174 90 L182 90 M174 120 L182 120 M174 150 L182 150 M174 180 L182 180" stroke="currentColor" stroke-width="1.2"/>
  <text x="186" y="94">30</text><text x="186" y="124">20</text><text x="186" y="154">10</text><text x="186" y="184">0 mm</text>
  <text x="128" y="145" text-anchor="end" fill="#3b82f6">13</text>
  <text x="154" y="222" class="t b">${L('Rain', 'Hujan')}</text>
  <line x1="242" y1="40" x2="242" y2="190" stroke="currentColor" stroke-width="2.5"/>
  <path d="M242 46 L292 60 L242 74 Z" fill="#10b981"/>
  <path d="M252 110 L228 110" stroke="currentColor" stroke-width="2" marker-end="url(#a)"/>
  <text x="258" y="114">${L('wind from', 'angin dari')}</text>
  <text x="258" y="126">${L('the east', 'timur')}</text>
  <text x="242" y="222" class="t b">${L('Wind', 'Angin')}</text>
  <circle cx="322" cy="90" r="22" class="m"/>
  <path d="M322 90 L322 68 A22 22 0 1 1 304 103 Z" fill="currentColor" opacity=".5"/>
  <text x="322" y="128" class="t">${L('cloudy', 'berawan')}</text>
  <text x="322" y="140" class="t">70%</text>
  <text x="322" y="222" class="t b">${L('Clouds', 'Awan')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Weather is what the air is doing today; a season is the pattern of weather over many weeks.',
        'A thermometer measures how warm the air is, in degrees Celsius.',
        'A rain gauge collects rain so you can measure how much fell, in millimetres.',
        'A flag or vane shows how strong the wind is and where it comes from.',
        'Measuring and writing numbers down every day lets you compare days and seasons fairly.',
      ],
      id: [
        'Cuaca adalah keadaan udara hari ini; musim adalah pola cuaca selama berminggu-minggu.',
        'Termometer mengukur seberapa hangat udara, dalam derajat Celsius.',
        'Penakar hujan menampung hujan sehingga kamu bisa mengukur berapa banyak yang turun, dalam milimeter.',
        'Bendera atau baling-baling angin menunjukkan seberapa kencang angin dan dari mana arahnya.',
        'Mengukur dan menuliskan angka setiap hari membuatmu bisa membandingkan hari dan musim dengan adil.',
      ],
    },
    vocabulary: {
      en: [
        ['Thermometer', 'An instrument that measures how hot or cold something is. The red line rises when it gets warmer.'],
        ['Rain gauge', 'A cup with a scale that catches rain. The water level tells you how many millimetres of rain fell.'],
        ['Wind vane', 'An arrow that swings around to point to where the wind is coming from.'],
        ['Cloud cover', 'How much of the sky is hidden by clouds: clear, some clouds, or cloudy.'],
        ['Season', 'A part of the year with its own usual weather, such as the dry season, the rainy season, or winter.'],
      ],
      id: [
        ['Termometer', 'Alat yang mengukur seberapa panas atau dingin sesuatu. Garis merahnya naik saat lebih hangat.'],
        ['Penakar hujan', 'Gelas berskala yang menangkap hujan. Tinggi airnya memberi tahu berapa milimeter hujan yang turun.'],
        ['Baling-baling angin', 'Panah yang berputar untuk menunjuk dari mana angin datang.'],
        ['Tutupan awan', 'Seberapa banyak langit yang tertutup awan: cerah, berawan sebagian, atau berawan.'],
        ['Musim', 'Bagian tahun dengan cuaca khasnya sendiri, seperti musim kemarau, musim hujan, atau musim dingin.'],
      ],
    },
    misconceptions: {
      en: [
        ['If there are clouds, it will rain.', 'Not always. Rain needs clouds, but many cloudy days stay dry. In the sim you will often see a grey, cloudy day with an empty rain gauge.'],
        ['The wind is made by the trees waving their branches.', 'It is the other way round. Moving air is the wind, and the wind pushes the branches. In the sim, the flag and the tree both move because the same wind blows on them.'],
        ['Weather and season mean the same thing.', 'Weather is about today. A season is the usual weather over many weeks. One cool day in the dry season does not make it the rainy season.'],
        ['The rain gauge shows how hard it is raining right now.', 'It shows how much rain has been collected in total, like a bucket filling up. A long gentle drizzle can fill it as much as a short heavy shower.'],
      ],
      id: [
        ['Kalau ada awan, pasti akan hujan.', 'Tidak selalu. Hujan memang membutuhkan awan, tetapi banyak hari berawan yang tetap kering. Dalam simulasi kamu akan sering melihat hari kelabu berawan dengan penakar hujan yang kosong.'],
        ['Angin dibuat oleh pohon yang menggoyangkan dahannya.', 'Justru sebaliknya. Udara yang bergerak itulah angin, dan angin mendorong dahan-dahan. Dalam simulasi, bendera dan pohon bergerak karena angin yang sama meniup keduanya.'],
        ['Cuaca dan musim artinya sama.', 'Cuaca adalah tentang hari ini. Musim adalah cuaca yang biasa terjadi selama berminggu-minggu. Satu hari sejuk di musim kemarau tidak membuatnya menjadi musim hujan.'],
        ['Penakar hujan menunjukkan seberapa deras hujan saat ini.', 'Penakar menunjukkan berapa banyak hujan yang sudah tertampung seluruhnya, seperti ember yang terisi. Gerimis lama bisa mengisinya sebanyak hujan deras yang singkat.'],
      ],
    },
    realWorld: {
      en: [
        'The weather service BMKG has stations all over Indonesia with the same kinds of instruments, and the numbers they collect become the forecast you see on TV and on your phone.',
        'Farmers watch the rain gauge to decide when to plant rice: the rainy season brings the water the young plants need.',
        'You can make a rain gauge from a plastic bottle with a ruler taped to the side, and keep your own weather diary at school.',
        'Pilots, sailors and fishermen check the wind direction and strength before they set off, just as you read the flag and vane.',
      ],
      id: [
        'BMKG memiliki stasiun di seluruh Indonesia dengan alat-alat yang sama jenisnya, dan angka yang mereka kumpulkan menjadi ramalan cuaca yang kamu lihat di TV dan di ponsel.',
        'Petani memperhatikan penakar hujan untuk memutuskan kapan menanam padi: musim hujan membawa air yang dibutuhkan tanaman muda.',
        'Kamu bisa membuat penakar hujan dari botol plastik dengan penggaris yang ditempel di sisinya, dan menulis buku harian cuaca sendiri di sekolah.',
        'Pilot, pelaut, dan nelayan memeriksa arah dan kekuatan angin sebelum berangkat, sama seperti kamu membaca bendera dan baling-baling angin.',
      ],
    },
    questions: {
      en: [
        { q: 'Press New day in the rainy season a few times. When the rain gauge fills up, what does the cloud gauge always show?', a: 'It always shows a lot of cloud, at least "some clouds" and usually "cloudy". Rain comes from clouds, so the sim never lets it rain from a clear sky. The sky also turns grey and the sun hides.' },
        { q: 'Switch to four seasons and make a winter day where the thermometer is below 0. What falls from the sky, and why?', a: 'Snow falls instead of rain, as white flakes that drift down slowly. Water freezes at 0 degrees Celsius, so when the air is that cold the water in the clouds falls as ice crystals. The ground turns white too.' },
        { q: 'Look at a day when the flag hangs straight down. What is the tree doing, and what word does the wind gauge show?', a: 'The tree stands still and the gauge says "calm". A flag only flies out when moving air pushes it, so a hanging flag means the air is hardly moving. On a windy day the flag flies out, the tree bends and the clouds drift faster.' },
      ],
      id: [
        { q: 'Tekan Hari baru di musim hujan beberapa kali. Saat penakar hujan terisi, apa yang selalu ditunjukkan pengukur awan?', a: 'Selalu menunjukkan banyak awan, paling sedikit "berawan sebagian" dan biasanya "berawan". Hujan berasal dari awan, jadi simulasi tidak pernah membiarkan hujan turun dari langit cerah. Langit juga berubah kelabu dan matahari bersembunyi.' },
        { q: 'Beralih ke empat musim dan buat hari musim dingin dengan termometer di bawah 0. Apa yang turun dari langit, dan mengapa?', a: 'Yang turun salju, bukan hujan, berupa kepingan putih yang melayang pelan. Air membeku pada 0 derajat Celsius, jadi saat udara sedingin itu air di awan turun sebagai kristal es. Tanah pun berubah putih.' },
        { q: 'Perhatikan hari ketika bendera menggantung lurus ke bawah. Apa yang dilakukan pohon, dan kata apa yang ditunjukkan pengukur angin?', a: 'Pohon berdiri diam dan pengukurnya menunjukkan "tenang". Bendera hanya berkibar saat udara yang bergerak mendorongnya, jadi bendera yang menggantung berarti udara hampir tidak bergerak. Pada hari berangin kencang bendera berkibar, pohon melengkung, dan awan bergerak lebih cepat.' },
      ],
    },
  },
};
