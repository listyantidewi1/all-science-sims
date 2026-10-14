// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect mass to lifespan: bigger stars die younger.',
      'Recognize each phase on the H-R diagram.',
      'Understand the four end-states: white dwarf, neutron star, black hole, brown dwarf failure.',
    ],
    id: [
      'Menghubungkan massa dengan masa hidup: bintang lebih besar mati lebih muda.',
      'Mengenali tiap fase di diagram H-R.',
      'Memahami empat keadaan akhir: katai putih, bintang neutron, lubang hitam, kegagalan katai coklat.',
    ],
  },
  tryThis: {
    en: [
      '0.5 M☉ — red dwarf, lives a trillion years.',
      '1 M☉ — sun-like, ~10 billion years total, white dwarf at end.',
      '20 M☉ — supergiant, ~10 million years, supernova → neutron star.',
      '50 M☉ — Wolf-Rayet, ~3 million years, supernova → black hole.',
    ],
    id: [
      '0,5 M☉ — katai merah, hidup satu triliun tahun.',
      '1 M☉ — seukuran Matahari, total ~10 miliar tahun, katai putih di akhir.',
      '20 M☉ — supergiant, ~10 juta tahun, supernova → bintang neutron.',
      '50 M☉ — Wolf-Rayet, ~3 juta tahun, supernova → lubang hitam.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A star begins as a cloud of gas and dust, mostly hydrogen, that collapses under its own gravity. The shrinking centre heats up, and when it reaches about ten million kelvin, hydrogen nuclei start fusing into helium. The energy released pushes outward and balances gravity, and the star settles into a long, stable stage called the main sequence. From that moment on, one number decides almost everything about the star: its mass. A more massive star is hotter and far brighter, but it burns through its fuel so much faster that it lives a much shorter life. The Sun will spend about ten billion years on the main sequence; a 20-solar-mass star lasts only around ten million years; a small red dwarf can keep going for trillions of years, longer than the universe has existed so far.',
        'The Hertzsprung-Russell (H-R) diagram is the astronomer\'s map of stars. It plots luminosity (how much energy a star emits, compared with the Sun) against surface temperature, with hot stars on the left by convention. Both axes are logarithmic because stars span a vast range. Most stars sit on a diagonal band, the main sequence, running from hot bright giants at top left to cool dim dwarfs at bottom right. In the sim, the mass slider (0.05 to 60 solar masses) picks a star and the phase slider steps it through its life; each phase is a dot on the diagram with an estimated duration. For the main sequence the sim uses the standard approximations that luminosity grows roughly as mass to the power 3.5 and lifetime is about ten billion years divided by mass to the power 2.5.',
        'How a star dies depends on its mass. Below about 0.08 solar masses the core never gets hot enough for steady hydrogen fusion, and the object is a brown dwarf, a failed star that simply cools. Between about 0.08 and 0.5 solar masses, red dwarfs burn slowly for trillions of years and are expected to end as helium white dwarfs, though none has had time to do so yet. Stars from about 0.5 to 8 solar masses, including the Sun, swell into red giants when the core hydrogen runs out, fuse helium for a while, then puff their outer layers away as a glowing planetary nebula, leaving the hot core behind as an Earth-sized white dwarf that slowly cools. Stars of roughly 8 to 25 solar masses become supergiants, build up heavier elements all the way to iron, and then the core collapses in a fraction of a second and the star explodes as a supernova; what remains is a neutron star, a city-sized ball about as massive as the Sun. Above roughly 25 solar masses the star sheds mass in fierce winds (the Wolf-Rayet stage) and its supernova leaves a black hole.',
        'The sim is a sketch, not a calculation of a real star. The mass boundaries are rounded; the real values depend on how much mass the star loses, its chemical make-up, how fast it spins and whether it has a companion star. Each phase is shown as a single point and a rounded duration, whereas a real star moves continuously across the diagram, and the giant-stage luminosities and the protostar stages are only rough placeholders. The star picture on the right shows colour and relative size schematically. What the sim does capture faithfully is the big pattern: mass sets a star\'s brightness, lifetime and fate.',
      ],
      id: [
        'Bintang bermula sebagai awan gas dan debu, sebagian besar hidrogen, yang runtuh karena gravitasinya sendiri. Pusat yang menyusut memanas, dan ketika mencapai sekitar sepuluh juta kelvin, inti-inti hidrogen mulai berfusi menjadi helium. Energi yang dilepaskan mendorong ke luar dan mengimbangi gravitasi, dan bintang memasuki tahap panjang yang stabil yang disebut deret utama. Sejak saat itu, satu angka menentukan hampir segalanya tentang bintang: massanya. Bintang yang lebih masif lebih panas dan jauh lebih terang, tetapi menghabiskan bahan bakarnya begitu cepat sehingga hidupnya jauh lebih pendek. Matahari akan menghabiskan sekitar sepuluh miliar tahun di deret utama; bintang bermassa 20 kali Matahari hanya bertahan sekitar sepuluh juta tahun; katai merah yang kecil bisa terus hidup triliunan tahun, lebih lama daripada umur alam semesta sampai sekarang.',
        'Diagram Hertzsprung-Russell (H-R) adalah peta bintang bagi para astronom. Diagram ini memplot luminositas (berapa banyak energi yang dipancarkan bintang, dibandingkan dengan Matahari) terhadap suhu permukaan, dengan bintang panas di sebelah kiri sesuai kesepakatan. Kedua sumbu memakai skala logaritmik karena rentang bintang sangat luas. Sebagian besar bintang berada pada pita diagonal, deret utama, yang membentang dari bintang panas dan terang di kiri atas sampai bintang dingin dan redup di kanan bawah. Dalam simulasi, slider massa (0,05 sampai 60 massa Matahari) memilih bintang dan slider fase menjalankannya melewati tahap-tahap hidupnya; tiap fase adalah satu titik pada diagram dengan perkiraan durasi. Untuk deret utama, simulasi memakai pendekatan baku bahwa luminositas bertambah kira-kira sebanding dengan massa pangkat 3,5 dan masa hidup sekitar sepuluh miliar tahun dibagi massa pangkat 2,5.',
        'Cara bintang mati bergantung pada massanya. Di bawah sekitar 0,08 massa Matahari, inti tidak pernah cukup panas untuk fusi hidrogen yang stabil, dan benda itu menjadi katai coklat, bintang gagal yang hanya mendingin. Antara sekitar 0,08 dan 0,5 massa Matahari, katai merah berfusi perlahan selama triliunan tahun dan diperkirakan berakhir sebagai katai putih helium, meskipun belum ada yang sempat mencapainya. Bintang bermassa sekitar 0,5 sampai 8 massa Matahari, termasuk Matahari, mengembang menjadi raksasa merah ketika hidrogen di intinya habis, berfusi helium untuk sementara, lalu melepaskan lapisan luarnya sebagai nebula planeter yang berpendar, meninggalkan inti panas berupa katai putih seukuran Bumi yang perlahan mendingin. Bintang bermassa kira-kira 8 sampai 25 massa Matahari menjadi maharaksasa, membentuk unsur-unsur yang lebih berat hingga besi, lalu intinya runtuh dalam sepersekian detik dan bintang meledak sebagai supernova; yang tersisa adalah bintang neutron, bola seukuran kota dengan massa kira-kira sama dengan Matahari. Di atas kira-kira 25 massa Matahari, bintang melepaskan massa lewat angin yang dahsyat (tahap Wolf-Rayet) dan supernovanya meninggalkan lubang hitam.',
        'Simulasi ini adalah sketsa, bukan perhitungan bintang sungguhan. Batas-batas massanya dibulatkan; nilai sebenarnya bergantung pada seberapa banyak massa yang hilang, susunan kimianya, kecepatan rotasinya, dan apakah ia punya bintang pendamping. Tiap fase ditampilkan sebagai satu titik dan durasi yang dibulatkan, padahal bintang sungguhan bergerak secara kontinu melintasi diagram, dan luminositas tahap raksasa serta tahap protobintang hanyalah perkiraan kasar. Gambar bintang di sebelah kanan menunjukkan warna dan ukuran relatif secara skematis. Yang ditangkap simulasi dengan setia adalah pola besarnya: massa menentukan kecerlangan, masa hidup, dan nasib bintang.',
      ],
    },
    figure: {
      caption: {
        en: 'Every star starts as a protostar; its mass then chooses the branch. Low-mass stars end quietly as white dwarfs, massive stars explode as supernovae and leave a neutron star or a black hole.',
        id: 'Setiap bintang bermula sebagai protobintang; massanya kemudian memilih cabangnya. Bintang bermassa rendah berakhir tenang sebagai katai putih, bintang masif meledak sebagai supernova dan meninggalkan bintang neutron atau lubang hitam.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Stellar life-cycle branches by mass', 'Cabang siklus hidup bintang menurut massa')}">
  <style>text{font:9px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.t{text-anchor:middle}.b{font-size:10px;font-weight:700}</style>
  <circle cx="34" cy="120" r="14" fill="#8b5cf6" opacity=".8"/>
  <text x="34" y="146" class="t b">${L('protostar', 'protobintang')}</text>
  <text x="34" y="20" class="t b">${L('mass', 'massa')}</text>
  <path d="M48 116 Q70 40 92 40 M48 118 Q70 80 92 80 M48 120 L92 120 M48 122 Q70 160 92 160 M48 124 Q70 200 92 200" class="m"/>
  <text x="92" y="30" class="t">${L('below 0.08 M☉', 'di bawah 0,08 M☉')}</text>
  <circle cx="150" cy="40" r="4" fill="#ef4444" opacity=".6"/><text x="150" y="55" class="t">${L('brown dwarf (never ignites)', 'katai coklat (tak pernah menyala)')}</text>
  <text x="92" y="70" class="t">0.08–0.5 M☉</text>
  <line x1="130" y1="80" x2="300" y2="80" class="m"/>
  <circle cx="150" cy="80" r="5" fill="#ef4444"/><text x="150" y="95" class="t">${L('red dwarf, ~1 trillion yr', 'katai merah, ~1 triliun thn')}</text>
  <circle cx="300" cy="80" r="3" fill="#ffffff" stroke="currentColor"/><text x="300" y="95" class="t">${L('white dwarf', 'katai putih')}</text>
  <text x="92" y="110" class="t">0.5–8 M☉</text>
  <line x1="130" y1="120" x2="300" y2="120" class="m"/>
  <circle cx="150" cy="120" r="5" fill="#f59e0b"/><text x="150" y="135" class="t">${L('main sequence', 'deret utama')}</text>
  <circle cx="205" cy="120" r="9" fill="#ef4444"/><text x="205" y="135" class="t">${L('red giant', 'raksasa merah')}</text>
  <circle cx="255" cy="120" r="9" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="3 2"/><text x="255" y="135" class="t">${L('planetary nebula', 'nebula planeter')}</text>
  <circle cx="300" cy="120" r="3" fill="#ffffff" stroke="currentColor"/><text x="300" y="135" class="t">${L('white dwarf', 'katai putih')}</text>
  <text x="92" y="150" class="t">8–25 M☉</text>
  <line x1="130" y1="160" x2="300" y2="160" class="m"/>
  <circle cx="150" cy="160" r="7" fill="#3b82f6"/><text x="150" y="175" class="t">${L('main sequence', 'deret utama')}</text>
  <circle cx="205" cy="160" r="12" fill="#ef4444"/><text x="205" y="179" class="t">${L('supergiant', 'maharaksasa')}</text>
  <path d="M255 148 L258 157 L267 160 L258 163 L255 172 L252 163 L243 160 L252 157 Z" fill="#f59e0b"/><text x="255" y="179" class="t">supernova</text>
  <circle cx="300" cy="160" r="2.5" fill="#8b5cf6"/><text x="300" y="175" class="t">${L('neutron star', 'bintang neutron')}</text>
  <text x="92" y="190" class="t">${L('above 25 M☉', 'di atas 25 M☉')}</text>
  <line x1="130" y1="200" x2="300" y2="200" class="m"/>
  <circle cx="150" cy="200" r="9" fill="#3b82f6"/><text x="150" y="217" class="t">${L('O star', 'bintang O')}</text>
  <circle cx="205" cy="200" r="9" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 2"/><text x="205" y="217" class="t">Wolf-Rayet</text>
  <path d="M255 186 L259 197 L270 200 L259 203 L255 214 L251 203 L240 200 L251 197 Z" fill="#f59e0b"/><text x="255" y="224" class="t">supernova</text>
  <circle cx="300" cy="200" r="6" fill="currentColor"/><circle cx="300" cy="200" r="9" fill="none" stroke="#f59e0b" stroke-width="1.5"/><text x="300" y="217" class="t">${L('black hole', 'lubang hitam')}</text>
  <text x="340" y="80" class="t">10¹² yr</text><text x="340" y="120" class="t">10¹⁰ yr</text><text x="340" y="160" class="t">10⁷ yr</text><text x="340" y="200" class="t">10⁶ yr</text>
  <text x="340" y="20" class="t b">${L('lifetime', 'masa hidup')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A star is a ball of gas held together by gravity and held up by the energy of nuclear fusion in its core.',
        'Mass decides everything: more massive stars are hotter and brighter but burn their fuel far faster and live much shorter lives.',
        'The H-R diagram plots luminosity against surface temperature; most stars spend most of their lives on its main-sequence band.',
        'Stars below about 8 solar masses end as white dwarfs; heavier stars explode as supernovae and leave a neutron star or a black hole.',
        'The sim shows each phase as a single point with a rounded duration; real stars change continuously and the mass boundaries are approximate.',
      ],
      id: [
        'Bintang adalah bola gas yang disatukan oleh gravitasi dan ditopang oleh energi fusi nuklir di intinya.',
        'Massa menentukan segalanya: bintang yang lebih masif lebih panas dan lebih terang, tetapi membakar bahan bakarnya jauh lebih cepat dan hidup jauh lebih singkat.',
        'Diagram H-R memplot luminositas terhadap suhu permukaan; sebagian besar bintang menghabiskan sebagian besar hidupnya di pita deret utama.',
        'Bintang di bawah sekitar 8 massa Matahari berakhir sebagai katai putih; bintang yang lebih berat meledak sebagai supernova dan meninggalkan bintang neutron atau lubang hitam.',
        'Simulasi menampilkan tiap fase sebagai satu titik dengan durasi yang dibulatkan; bintang sungguhan berubah secara kontinu dan batas-batas massanya hanya perkiraan.',
      ],
    },
    vocabulary: {
      en: [
        ['Protostar', 'A collapsing clump of gas that is heating up but has not yet started steady hydrogen fusion.'],
        ['Nuclear fusion', 'The joining of light atomic nuclei into heavier ones, releasing energy; stars fuse hydrogen into helium.'],
        ['Main sequence', 'The long stable stage in which a star fuses hydrogen in its core; on the H-R diagram it is the diagonal band where most stars sit.'],
        ['H-R diagram', 'A plot of luminosity against surface temperature (hot on the left) on which each star is a point and a star\'s life is a track.'],
        ['Red giant', 'A swollen, cool, very bright star that has used up the hydrogen in its core.'],
        ['White dwarf', 'The hot, dense, Earth-sized leftover core of a low- or medium-mass star, slowly cooling for ever.'],
        ['Supernova', 'The explosion of a massive star when its iron core collapses; for a few weeks it can outshine a whole galaxy.'],
        ['Black hole', 'A remnant so compact that nothing, not even light, can escape from inside its event horizon.'],
      ],
      id: [
        ['Protobintang', 'Gumpalan gas yang runtuh dan memanas tetapi belum memulai fusi hidrogen yang stabil.'],
        ['Fusi nuklir', 'Penggabungan inti-inti atom ringan menjadi inti yang lebih berat dengan melepaskan energi; bintang memfusikan hidrogen menjadi helium.'],
        ['Deret utama', 'Tahap panjang dan stabil ketika bintang memfusikan hidrogen di intinya; pada diagram H-R inilah pita diagonal tempat sebagian besar bintang berada.'],
        ['Diagram H-R', 'Plot luminositas terhadap suhu permukaan (panas di sebelah kiri); tiap bintang adalah satu titik dan hidup bintang adalah satu lintasan.'],
        ['Raksasa merah', 'Bintang yang mengembang, dingin, dan sangat terang setelah hidrogen di intinya habis.'],
        ['Katai putih', 'Sisa inti bintang bermassa rendah atau sedang yang panas, padat, seukuran Bumi, dan mendingin perlahan selamanya.'],
        ['Supernova', 'Ledakan bintang masif ketika inti besinya runtuh; selama beberapa minggu ia bisa lebih terang daripada seluruh galaksi.'],
        ['Lubang hitam', 'Sisa bintang yang begitu mampat sehingga tidak ada apa pun, bahkan cahaya, yang bisa lolos dari dalam horizon peristiwanya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Bigger stars live longer because they have more fuel.', 'They have more fuel, but they burn it enormously faster: a star ten times the Sun\'s mass is thousands of times brighter. The result is a life hundreds of times shorter, not longer.'],
        ['The Sun will one day explode as a supernova.', 'It is far too light. The Sun will swell into a red giant, shed its outer layers as a planetary nebula and end as a white dwarf. Only stars above about 8 solar masses go supernova.'],
        ['Stars are burning, like a fire.', 'Fire is a chemical reaction with oxygen. Stars shine by nuclear fusion, which joins hydrogen nuclei into helium and releases millions of times more energy per kilogram than any chemical burning.'],
        ['A black hole sucks in everything around it like a vacuum cleaner.', 'At a given distance a black hole pulls exactly as hard as any other object of the same mass. If the Sun became a black hole of the same mass, the Earth would keep orbiting just as it does now, only in the dark.'],
      ],
      id: [
        ['Bintang yang lebih besar hidup lebih lama karena bahan bakarnya lebih banyak.', 'Bahan bakarnya memang lebih banyak, tetapi dibakar jauh lebih cepat: bintang bermassa sepuluh kali Matahari ribuan kali lebih terang. Akibatnya hidupnya ratusan kali lebih pendek, bukan lebih panjang.'],
        ['Matahari suatu hari akan meledak sebagai supernova.', 'Massanya terlalu kecil. Matahari akan mengembang menjadi raksasa merah, melepaskan lapisan luarnya sebagai nebula planeter, dan berakhir sebagai katai putih. Hanya bintang di atas sekitar 8 massa Matahari yang menjadi supernova.'],
        ['Bintang terbakar, seperti api.', 'Api adalah reaksi kimia dengan oksigen. Bintang bersinar karena fusi nuklir, yang menggabungkan inti hidrogen menjadi helium dan melepaskan energi jutaan kali lebih besar per kilogram daripada pembakaran kimia apa pun.'],
        ['Lubang hitam menyedot semua yang ada di sekitarnya seperti penyedot debu.', 'Pada jarak tertentu, lubang hitam menarik tepat sekuat benda lain bermassa sama. Jika Matahari menjadi lubang hitam bermassa sama, Bumi akan tetap mengorbit seperti sekarang, hanya dalam gelap.'],
      ],
    },
    realWorld: {
      en: [
        'The Sun is about 4.6 billion years old and roughly halfway through its main-sequence life; in about 5 billion years it will become a red giant large enough to swallow Mercury and Venus.',
        'Betelgeuse, the bright red shoulder of Orion, is a red supergiant of around 15 to 20 solar masses that is expected to explode as a supernova sometime in the next hundred thousand years.',
        'The Crab Nebula is the debris of a supernova that Chinese astronomers recorded in the year 1054; at its centre spins a neutron star 30 times per second.',
        'Almost every element heavier than helium in your body, including the calcium in your bones and the iron in your blood, was made inside stars and scattered by stellar winds and supernovae.',
      ],
      id: [
        'Matahari berumur sekitar 4,6 miliar tahun dan kira-kira berada di pertengahan hidup deret utamanya; dalam sekitar 5 miliar tahun ia akan menjadi raksasa merah yang cukup besar untuk menelan Merkurius dan Venus.',
        'Betelgeuse, bahu merah terang pada rasi Orion, adalah maharaksasa merah bermassa sekitar 15 sampai 20 massa Matahari yang diperkirakan meledak sebagai supernova dalam seratus ribu tahun ke depan.',
        'Nebula Kepiting adalah serpihan supernova yang dicatat astronom Tionghoa pada tahun 1054; di pusatnya berputar sebuah bintang neutron 30 kali per detik.',
        'Hampir setiap unsur yang lebih berat daripada helium di tubuhmu, termasuk kalsium di tulang dan besi di darah, dibuat di dalam bintang dan disebarkan oleh angin bintang dan supernova.',
      ],
    },
    questions: {
      en: [
        { q: 'Set the mass to 1 and then to 20 solar masses and compare the main-sequence durations. Why does the heavier star, with twenty times more fuel, live so much shorter?', a: 'Because its luminosity rises much faster than its mass. With luminosity scaling roughly as mass to the power 3.5, the 20-solar-mass star shines tens of thousands of times brighter than the Sun, so it spends its fuel at that same enormous rate. The sim\'s rule, lifetime of about 10 billion years divided by mass to the power 2.5, gives only a few million years.' },
        { q: 'A student says the Sun will end its life in a supernova. Use the sim to check and explain what actually happens to a 1-solar-mass star.', a: 'Step through the phases at 1 solar mass: main sequence, subgiant, red giant, planetary nebula, white dwarf. There is no supernova, because the Sun is far below the roughly 8-solar-mass threshold needed for core collapse. Its core will end as a white dwarf while the outer layers drift away as a planetary nebula.' },
        { q: 'The universe is about 13.8 billion years old. Looking at the durations the sim shows for a 0.3-solar-mass red dwarf, have any red dwarfs that formed early in the universe reached their white-dwarf stage yet?', a: 'No. The sim gives the red dwarf stage about a trillion years, far longer than the age of the universe, so every red dwarf ever formed is still on the main sequence. Their final white-dwarf stage is a prediction from theory, not something astronomers have observed.' },
      ],
      id: [
        { q: 'Atur massa ke 1 lalu ke 20 massa Matahari dan bandingkan durasi deret utamanya. Mengapa bintang yang lebih berat, dengan bahan bakar dua puluh kali lebih banyak, hidup jauh lebih singkat?', a: 'Karena luminositasnya naik jauh lebih cepat daripada massanya. Dengan luminositas yang kira-kira sebanding dengan massa pangkat 3,5, bintang bermassa 20 kali Matahari bersinar puluhan ribu kali lebih terang daripada Matahari, sehingga bahan bakarnya habis dengan laju sebesar itu pula. Aturan simulasi, masa hidup sekitar 10 miliar tahun dibagi massa pangkat 2,5, hanya memberi beberapa juta tahun.' },
        { q: 'Seorang siswa berkata Matahari akan mengakhiri hidupnya dengan supernova. Gunakan simulasi untuk memeriksa dan jelaskan apa yang sebenarnya terjadi pada bintang bermassa 1 Matahari.', a: 'Telusuri fase-fase pada massa 1 Matahari: deret utama, subraksasa, raksasa merah, nebula planeter, katai putih. Tidak ada supernova, karena Matahari jauh di bawah ambang sekitar 8 massa Matahari yang dibutuhkan untuk keruntuhan inti. Intinya akan berakhir sebagai katai putih sementara lapisan luarnya melayang pergi sebagai nebula planeter.' },
        { q: 'Umur alam semesta sekitar 13,8 miliar tahun. Melihat durasi yang ditampilkan simulasi untuk katai merah bermassa 0,3 Matahari, apakah ada katai merah yang terbentuk di awal alam semesta yang sudah mencapai tahap katai putih?', a: 'Tidak. Simulasi memberi tahap katai merah sekitar satu triliun tahun, jauh lebih lama daripada umur alam semesta, sehingga setiap katai merah yang pernah terbentuk masih berada di deret utama. Tahap akhir katai putihnya adalah prediksi teori, bukan sesuatu yang pernah diamati para astronom.' },
      ],
    },
  },
};
