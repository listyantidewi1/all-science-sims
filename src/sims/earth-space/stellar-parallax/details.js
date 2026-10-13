// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply d (parsec) = 1 / p (arcsec).',
      'See parallax shrink rapidly with distance.',
      "Recognize why we couldn't measure it before precise telescopes (Bessel 1838).",
    ],
    id: [
      'Menerapkan d (parsec) = 1 / p (detik busur).',
      'Melihat paralaks menyusut cepat dengan jarak.',
      'Mengenali mengapa kita tak bisa mengukurnya sebelum teleskop presisi (Bessel 1838).',
    ],
  },  tryThis: {
    en: [
      'Distance 10 parsec — what is parallax?',
      'Move to 100 pc — does parallax fall by 10×?',
      'Try 1 pc (closer than any real star) — what is the angle?',
    ],
    id: [
      'Jarak 10 parsec — berapa paralaksnya?',
      'Pindah ke 100 pc — apakah paralaks turun 10×?',
      'Coba 1 pc (lebih dekat dari bintang nyata) — berapa sudutnya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Hold a finger in front of your face and look at it first with one eye, then the other: it jumps against the background. The jump is parallax, and it is smaller the farther away the finger is. Astronomers do the same thing on a grand scale. As Earth travels around the Sun, our viewpoint shifts by up to 2 AU (300 million km) over six months, and a nearby star appears to move against the far more distant stars behind it. The parallax angle p is defined as half of that total yearly shift, which is the same as the angle that the Earth–Sun distance (1 AU) would subtend as seen from the star.',
        'The geometry is a very thin triangle: tan p = 1 AU / d, and because p is tiny, p = 1 AU / d. Astronomers chose a unit to make this trivial. One parsec is the distance at which the parallax is exactly one arcsecond (1/3600 of a degree), so d (parsec) = 1 / p (arcsec). One parsec is 3.26 light-years, 206,265 AU, or about 3.1 × 10¹³ km. Even the nearest star, Proxima Centauri, has a parallax of only 0.77 arcseconds, less than a thousandth of a degree. That is why no one measured a stellar parallax until Friedrich Bessel did so for 61 Cygni in 1838; before precise telescopes, the failure to see any parallax was used as an argument that Earth did not move.',
        'The top of the sim shows the Sun, Earth now and Earth six months later, and the sight lines from both positions to the target star. The bottom panel shows what a telescope would see: the target star sliding back and forth against the fixed background. The distance slider (1 to 200 pc) sets the true distance, and the readout computes p = 1/d. The preset buttons jump to real stars: Proxima at 1.3 pc, Sirius at 2.6 pc, Vega at 7.7 pc and Polaris at about 133 pc. The lab panel lets you record d and p and confirm their inverse relationship.',
        'The wobble on screen is exaggerated enormously, by a factor of many thousands: real parallaxes are smaller than the blurring caused by Earth\'s atmosphere, which is why they are so hard to measure. The sim\'s star lies in the plane of Earth\'s orbit, so it moves back and forth along a line; a star near the pole of the orbit would trace a small circle, and stars in between trace ellipses. The model ignores the star\'s own motion through space (proper motion) and treats Earth\'s orbit as a perfect circle. From the ground, parallaxes are reliable only out to about 100 pc; the Hipparcos satellite (1989–1993) reached a precision of about a thousandth of an arcsecond, and Gaia (launched 2013) measures tens of millionths of an arcsecond for bright stars, extending the method to thousands of parsecs.',
      ],
      id: [
        'Angkat satu jari di depan wajahmu dan lihat dengan satu mata, lalu dengan mata yang lain: jari itu tampak melompat terhadap latar belakang. Lompatan itu adalah paralaks, dan makin jauh jarinya makin kecil lompatannya. Astronom melakukan hal yang sama dalam skala raksasa. Saat Bumi mengelilingi Matahari, titik pandang kita bergeser sampai 2 AU (300 juta km) dalam enam bulan, dan bintang yang dekat tampak bergerak terhadap bintang-bintang jauh di belakangnya. Sudut paralaks p didefinisikan sebagai setengah dari total pergeseran tahunan itu, yang sama dengan sudut yang dibentuk jarak Bumi–Matahari (1 AU) jika dilihat dari bintang tersebut.',
        'Geometrinya adalah segitiga yang sangat lancip: tan p = 1 AU / d, dan karena p sangat kecil, p = 1 AU / d. Astronom memilih satuan agar hubungan ini menjadi sederhana. Satu parsec adalah jarak yang paralaksnya tepat satu detik busur (1/3600 derajat), sehingga d (parsec) = 1 / p (detik busur). Satu parsec sama dengan 3,26 tahun cahaya, 206.265 AU, atau sekitar 3,1 × 10¹³ km. Bahkan bintang terdekat, Proxima Centauri, paralaksnya hanya 0,77 detik busur, kurang dari seperseribu derajat. Itulah sebabnya tidak ada yang berhasil mengukur paralaks bintang sampai Friedrich Bessel melakukannya untuk 61 Cygni pada 1838; sebelum ada teleskop presisi, gagalnya menemukan paralaks dipakai sebagai argumen bahwa Bumi tidak bergerak.',
        'Bagian atas sim menampilkan Matahari, Bumi saat ini dan Bumi enam bulan kemudian, serta garis pandang dari kedua posisi ke bintang target. Panel bawah memperlihatkan apa yang dilihat teleskop: bintang target bergeser bolak-balik terhadap latar yang tetap. Slider jarak (1 sampai 200 pc) mengatur jarak sebenarnya, dan tampilan menghitung p = 1/d. Tombol preset melompat ke bintang nyata: Proxima pada 1,3 pc, Sirius pada 2,6 pc, Vega pada 7,7 pc, dan Polaris pada sekitar 133 pc. Panel lab memungkinkanmu mencatat d dan p dan memastikan hubungan kebalikannya.',
        'Goyangan di layar dilebih-lebihkan luar biasa, ribuan kali lipat: paralaks sesungguhnya lebih kecil daripada kaburnya citra akibat atmosfer Bumi, dan itulah sebabnya ia begitu sulit diukur. Bintang dalam sim terletak pada bidang orbit Bumi, sehingga bergerak bolak-balik sepanjang garis; bintang di dekat kutub orbit akan menelusuri lingkaran kecil, dan bintang di antaranya menelusuri elips. Model ini mengabaikan gerak bintang itu sendiri di ruang angkasa (gerak diri) dan menganggap orbit Bumi lingkaran sempurna. Dari permukaan Bumi, paralaks hanya andal sampai sekitar 100 pc; satelit Hipparcos (1989–1993) mencapai ketelitian sekitar seperseribu detik busur, dan Gaia (diluncurkan 2013) mengukur puluhan sepersejuta detik busur untuk bintang terang, memperluas metode ini sampai ribuan parsec.',
      ],
    },
    figure: {
      caption: {
        en: 'Seen from opposite sides of Earth\'s orbit, a nearby star lines up with different background stars. Half the total shift is the parallax angle p, the angle 1 AU subtends at the star. Angles here are hugely exaggerated.',
        id: 'Dilihat dari dua sisi berlawanan orbit Bumi, bintang dekat tampak segaris dengan bintang latar yang berbeda. Setengah dari pergeseran totalnya adalah sudut paralaks p, yaitu sudut yang dibentuk 1 AU dilihat dari bintang. Sudut di sini sangat dilebih-lebihkan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Geometry of stellar parallax', 'Geometri paralaks bintang')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:1.6;fill:none}.s{font-size:9.5px;opacity:.8}.r{text-anchor:end}</style>
  <circle cx="60" cy="120" r="40" class="m"/>
  <circle cx="60" cy="120" r="7" fill="#f59e0b"/>
  <text x="50" y="142" class="s">${L('Sun', 'Matahari')}</text>
  <circle cx="60" cy="80" r="5" fill="#3b82f6"/>
  <text x="68" y="74" fill="#3b82f6">${L('Earth, January', 'Bumi, Januari')}</text>
  <circle cx="60" cy="160" r="5" fill="#3b82f6"/>
  <text x="68" y="174" fill="#3b82f6">${L('Earth, July', 'Bumi, Juli')}</text>
  <line x1="46" y1="80" x2="46" y2="120" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="42" y="104" class="r" fill="#8b5cf6">1 AU</text>
  <line x1="60" y1="120" x2="240" y2="120" class="m" stroke-dasharray="4 4"/>
  <text x="146" y="114" class="s">d</text>
  <line x1="60" y1="80" x2="345" y2="143" class="f" stroke="#3b82f6" opacity=".85"/>
  <line x1="60" y1="160" x2="345" y2="97" class="f" stroke="#3b82f6" opacity=".85"/>
  <circle cx="240" cy="120" r="6" fill="#10b981"/>
  <text x="222" y="142" fill="#10b981">${L('nearby star', 'bintang dekat')}</text>
  <path d="M210 120 A30 30 0 0 1 210.7 113.5" fill="none" stroke="#10b981" stroke-width="1.5"/>
  <text x="198" y="110" fill="#10b981">p</text>
  <circle cx="300" cy="60" r="1.5" fill="currentColor" opacity=".7"/>
  <circle cx="330" cy="72" r="1.5" fill="currentColor" opacity=".7"/>
  <circle cx="312" cy="178" r="1.5" fill="currentColor" opacity=".7"/>
  <circle cx="338" cy="190" r="1.5" fill="currentColor" opacity=".7"/>
  <circle cx="320" cy="124" r="1.5" fill="currentColor" opacity=".7"/>
  <circle cx="345" cy="97" r="4" fill="#10b981" opacity=".45"/>
  <circle cx="345" cy="143" r="4" fill="#10b981" opacity=".45"/>
  <text x="345" y="46" class="r s">${L('distant background stars', 'bintang latar yang jauh')}</text>
  <text x="338" y="90" class="r s" fill="#10b981">${L('seen in July', 'tampak di Juli')}</text>
  <text x="338" y="158" class="r s" fill="#10b981">${L('seen in January', 'tampak di Januari')}</text>
  <text x="10" y="216" class="s">${L('angles exaggerated thousands of times; real p is under 1 arcsecond', 'sudut dilebih-lebihkan ribuan kali; p nyata di bawah 1 detik busur')}</text>
  <text x="10" y="232">p (arcsec) = 1 AU / d   →   d (pc) = 1 / p</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Parallax is the apparent shift of a nearby object against a distant background when the viewpoint moves.',
        'The parallax angle p is half the star\'s total yearly shift, equal to the angle that 1 AU subtends at the star.',
        'd (parsec) = 1 / p (arcsecond): doubling the distance halves the angle.',
        'All stellar parallaxes are under one arcsecond, so the measurement needs extremely precise instruments and failed until 1838.',
        'Parallax is the first rung of the cosmic distance ladder; every other distance method is calibrated against it.',
      ],
      id: [
        'Paralaks adalah pergeseran semu benda dekat terhadap latar yang jauh ketika titik pandang berpindah.',
        'Sudut paralaks p adalah setengah dari pergeseran tahunan total bintang, sama dengan sudut yang dibentuk 1 AU dilihat dari bintang.',
        'd (parsec) = 1 / p (detik busur): menggandakan jarak membuat sudutnya setengah.',
        'Semua paralaks bintang kurang dari satu detik busur, sehingga pengukurannya membutuhkan instrumen yang sangat presisi dan baru berhasil pada 1838.',
        'Paralaks adalah anak tangga pertama tangga jarak kosmik; semua metode jarak lainnya dikalibrasi terhadapnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Parallax', 'The apparent change in position of an object when it is viewed from two different places.'],
        ['Parallax angle (p)', 'Half of a star\'s total apparent shift over a year; the angle subtended by 1 AU at the star\'s distance.'],
        ['Arcsecond', 'An angle of 1/3600 of a degree, written ″; roughly the size of a coin seen from 4 km away.'],
        ['Parsec (pc)', 'The distance at which the parallax is one arcsecond: 3.26 light-years or 206,265 AU.'],
        ['Astronomical unit (AU)', 'The average Earth–Sun distance, about 150 million km; the baseline of the parallax triangle.'],
        ['Baseline', 'The known separation between two viewpoints; the longer it is, the larger the parallax.'],
        ['Proper motion', 'A star\'s real drift across the sky due to its own motion through space, which must be separated from the yearly parallax wobble.'],
        ['Distance ladder', 'The chain of overlapping methods astronomers use to measure ever larger distances, beginning with parallax.'],
      ],
      id: [
        ['Paralaks', 'Perubahan posisi semu suatu benda ketika dilihat dari dua tempat yang berbeda.'],
        ['Sudut paralaks (p)', 'Setengah dari total pergeseran semu bintang dalam setahun; sudut yang dibentuk 1 AU pada jarak bintang itu.'],
        ['Detik busur', 'Sudut sebesar 1/3600 derajat, ditulis ″; kira-kira ukuran sebuah koin dilihat dari jarak 4 km.'],
        ['Parsec (pc)', 'Jarak yang paralaksnya satu detik busur: 3,26 tahun cahaya atau 206.265 AU.'],
        ['Satuan astronomi (AU)', 'Jarak rata-rata Bumi–Matahari, sekitar 150 juta km; alas segitiga paralaks.'],
        ['Garis alas (baseline)', 'Jarak yang diketahui antara dua titik pandang; makin panjang, makin besar paralaksnya.'],
        ['Gerak diri', 'Pergeseran nyata bintang di langit akibat geraknya sendiri di ruang angkasa, yang harus dipisahkan dari goyangan paralaks tahunan.'],
        ['Tangga jarak', 'Rangkaian metode yang saling tumpang tindih yang dipakai astronom untuk mengukur jarak yang makin besar, dimulai dari paralaks.'],
      ],
    },
    misconceptions: {
      en: [
        ['The parallax angle is the whole shift you see between January and July.', 'By definition p is half of that total shift, so that it corresponds to a baseline of exactly 1 AU. Using the full shift would make every distance come out half as large.'],
        ['A star with a larger parallax is farther away.', 'It is the reverse: parallax is inversely proportional to distance. Big wobble means a close star.'],
        ['Parallax measures how the star moves.', 'The star is essentially fixed; the apparent motion comes from Earth changing position. That is why the wobble repeats exactly every year.'],
        ['Astronomers use parallax for every distance, even to other galaxies.', 'Direct parallax works only to a few thousand parsecs, even with Gaia. Beyond that, distances come from standard candles such as Cepheid variables and supernovae, which are themselves calibrated using nearby parallax distances.'],
      ],
      id: [
        ['Sudut paralaks adalah seluruh pergeseran yang kamu lihat antara Januari dan Juli.', 'Menurut definisi, p adalah setengah dari pergeseran total itu, agar bersesuaian dengan garis alas tepat 1 AU. Memakai pergeseran penuh akan membuat semua jarak keluar setengah dari seharusnya.'],
        ['Bintang dengan paralaks lebih besar berada lebih jauh.', 'Justru sebaliknya: paralaks berbanding terbalik dengan jarak. Goyangan besar berarti bintang yang dekat.'],
        ['Paralaks mengukur bagaimana bintang bergerak.', 'Bintangnya pada dasarnya diam; gerak semu itu berasal dari Bumi yang berpindah posisi. Itulah sebabnya goyangannya berulang persis setiap tahun.'],
        ['Astronom memakai paralaks untuk semua jarak, bahkan ke galaksi lain.', 'Paralaks langsung hanya berfungsi sampai beberapa ribu parsec, bahkan dengan Gaia. Di luar itu, jarak diperoleh dari lilin standar seperti variabel Cepheid dan supernova, yang sendiri dikalibrasi dengan jarak paralaks bintang-bintang dekat.'],
      ],
    },
    realWorld: {
      en: [
        'Friedrich Bessel measured the first stellar parallax in 1838, for the star 61 Cygni, finally proving directly that Earth orbits the Sun.',
        'The Hipparcos satellite (1989–1993) measured parallaxes for about 118,000 stars, and ESA\'s Gaia mission is doing the same for well over a billion.',
        'Your two eyes are about 6 cm apart, and your brain uses the parallax between them to judge depth; surveyors and rangefinders use the same triangulation with longer baselines.',
        'The parsec, defined through parallax, is the everyday distance unit of professional astronomy: the Milky Way is about 30,000 pc across.',
      ],
      id: [
        'Friedrich Bessel mengukur paralaks bintang pertama pada 1838, untuk bintang 61 Cygni, yang akhirnya membuktikan secara langsung bahwa Bumi mengelilingi Matahari.',
        'Satelit Hipparcos (1989–1993) mengukur paralaks sekitar 118.000 bintang, dan misi Gaia milik ESA melakukan hal yang sama untuk lebih dari satu miliar bintang.',
        'Kedua matamu terpisah sekitar 6 cm, dan otakmu memakai paralaks di antara keduanya untuk menilai kedalaman; juru ukur dan alat pengukur jarak memakai triangulasi yang sama dengan garis alas yang lebih panjang.',
        'Parsec, yang didefinisikan lewat paralaks, adalah satuan jarak sehari-hari dalam astronomi profesional: Bima Sakti lebarnya sekitar 30.000 pc.',
      ],
    },
    questions: {
      en: [
        { q: 'A star\'s measured parallax is 0.05 arcseconds. How far away is it in parsecs and in light-years?', a: 'd = 1/p = 1/0.05 = 20 pc. Multiplying by 3.26 gives about 65 light-years.' },
        { q: 'Sirius is 2.64 pc away. What parallax should the sim report, and how does that compare with one degree?', a: 'p = 1/2.64 ≈ 0.38 arcseconds. One degree is 3,600 arcseconds, so this is about one ten-thousandth of a degree, which shows why such measurements need very precise instruments.' },
        { q: 'A telescope can measure parallaxes to a precision of 0.001 arcseconds. Why can it not give a useful distance for a star 10,000 pc away?', a: 'That star\'s parallax would be 1/10,000 = 0.0001 arcseconds, ten times smaller than the measurement error. The uncertainty would be larger than the value itself, so the distance would be essentially unknown. Other methods are needed beyond a few thousand parsecs.' },
      ],
      id: [
        { q: 'Paralaks sebuah bintang terukur 0,05 detik busur. Berapa jaraknya dalam parsec dan dalam tahun cahaya?', a: 'd = 1/p = 1/0,05 = 20 pc. Dikalikan 3,26 menghasilkan sekitar 65 tahun cahaya.' },
        { q: 'Sirius berjarak 2,64 pc. Berapa paralaks yang seharusnya ditampilkan sim, dan bagaimana dibandingkan dengan satu derajat?', a: 'p = 1/2,64 ≈ 0,38 detik busur. Satu derajat sama dengan 3.600 detik busur, jadi ini sekitar sepersepuluh ribu derajat, yang menunjukkan mengapa pengukuran seperti ini membutuhkan instrumen yang sangat presisi.' },
        { q: 'Sebuah teleskop bisa mengukur paralaks dengan ketelitian 0,001 detik busur. Mengapa teleskop itu tidak bisa memberi jarak yang berguna untuk bintang sejauh 10.000 pc?', a: 'Paralaks bintang itu hanya 1/10.000 = 0,0001 detik busur, sepuluh kali lebih kecil daripada galat pengukuran. Ketidakpastiannya lebih besar daripada nilainya sendiri, sehingga jaraknya praktis tidak diketahui. Di luar beberapa ribu parsec diperlukan metode lain.' },
      ],
    },
  },
};
