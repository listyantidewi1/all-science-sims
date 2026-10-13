// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Explain why seasons exist (tilt, not distance).',
      'Predict day length at any latitude on a given date.',
      'Identify solstices and equinoxes by the geometry.',
    ],
    id: [
      'Menjelaskan mengapa musim terjadi (kemiringan, bukan jarak).',
      'Memprediksi panjang siang pada lintang apa pun di tanggal tertentu.',
      'Mengidentifikasi titik balik matahari dan ekuinoks dari geometri.',
    ],
  },
  tryThis: {
    en: [
      'Set tilt to 0° — does day length still change with the seasons?',
      'Find the date when the day at 60° N is longest.',
      'Compare day length at the equator across the year.',
    ],
    id: [
      'Atur kemiringan ke 0° — apakah panjang siang masih berubah saat musim?',
      'Cari tanggal ketika siang di 60° LU paling panjang.',
      'Bandingkan panjang siang di khatulistiwa sepanjang tahun.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Earth\'s axis of rotation is tilted about 23.5° from upright, and it keeps pointing the same way in space all year, toward the North Star. As Earth travels around the Sun, this means the northern hemisphere leans toward the Sun in June and away from it in December. The hemisphere leaning toward the Sun gets two boosts at once: the Sun climbs higher in the sky, so its light is concentrated on a smaller patch of ground, and the Sun stays up for more hours. Both effects deliver more energy per day, and that is summer. The other hemisphere gets the opposite, and that is winter.',
        'The simulation describes the Sun\'s position with one number, the solar declination: the latitude at which the Sun is directly overhead at noon. It is modelled as a smooth wave through the year, equal to the tilt times the sine of the day of year measured from the March equinox. The declination is zero at the two equinoxes (around 20 March and 22 September), reaches +23.5° at the June solstice and −23.5° at the December solstice. From the declination and your latitude the sim computes the length of the day with the standard sunrise equation, and the noon altitude of the Sun as 90° minus the difference between your latitude and the declination.',
        'The tilt slider is the key experiment. At 0° the declination is always zero, every place on Earth has a 12-hour day all year and there are no seasons at all. Increase the tilt and the seasons grow more extreme: the summer Sun climbs higher, winter days get shorter, and the polar regions with 24-hour days or nights spread toward the equator. The latitude slider shows why the equator barely notices the seasons (its day length stays near 12 hours) while places above 66.5° north or south have days when the Sun never sets or never rises.',
        'The orbit is drawn as a perfect circle, and that is deliberate: distance from the Sun is not what makes seasons. Earth\'s real orbit is slightly oval, and Earth is actually closest to the Sun in early January, during the northern winter. The sim also ignores the bending of light by the atmosphere (which adds several minutes of daylight), treats the Sun as a point, and uses a simplified declination formula that is accurate to about a degree. It shows the geometry of sunlight, not the temperature: real seasons lag a few weeks behind the solstices because land and especially oceans take time to warm up and cool down.',
      ],
      id: [
        'Sumbu rotasi Bumi miring sekitar 23,5° dari tegak, dan arahnya di ruang angkasa tetap sama sepanjang tahun, menunjuk ke arah Bintang Utara. Saat Bumi mengelilingi Matahari, belahan utara condong ke arah Matahari pada bulan Juni dan menjauh darinya pada bulan Desember. Belahan yang condong ke Matahari mendapat dua keuntungan sekaligus: Matahari naik lebih tinggi di langit sehingga cahayanya terpusat pada bidang tanah yang lebih kecil, dan Matahari bersinar lebih lama. Keduanya memberi lebih banyak energi per hari, dan itulah musim panas. Belahan lainnya mengalami kebalikannya, dan itulah musim dingin.',
        'Simulasi menggambarkan posisi Matahari dengan satu angka, deklinasi matahari: lintang tempat Matahari tepat di atas kepala pada tengah hari. Deklinasi dimodelkan sebagai gelombang halus sepanjang tahun, yaitu kemiringan sumbu dikalikan sinus dari hari dalam setahun yang dihitung sejak ekuinoks Maret. Nilainya nol pada dua ekuinoks (sekitar 20 Maret dan 22 September), mencapai +23,5° pada solstis Juni dan −23,5° pada solstis Desember. Dari deklinasi dan lintangmu, simulasi menghitung panjang siang dengan persamaan terbit matahari yang baku, dan ketinggian Matahari pada tengah hari sebagai 90° dikurangi selisih antara lintangmu dan deklinasi.',
        'Slider kemiringan adalah percobaan kuncinya. Pada 0° deklinasi selalu nol, setiap tempat di Bumi mengalami siang 12 jam sepanjang tahun, dan tidak ada musim sama sekali. Perbesar kemiringan, maka musim menjadi lebih ekstrem: Matahari musim panas naik lebih tinggi, siang musim dingin lebih pendek, dan daerah kutub yang mengalami siang atau malam 24 jam meluas ke arah khatulistiwa. Slider lintang menunjukkan mengapa khatulistiwa hampir tidak merasakan musim (panjang siangnya tetap sekitar 12 jam), sementara tempat di atas 66,5° utara atau selatan mengalami hari-hari ketika Matahari tidak pernah terbenam atau tidak pernah terbit.',
        'Orbit digambar sebagai lingkaran sempurna, dan itu memang disengaja: jarak dari Matahari bukanlah penyebab musim. Orbit Bumi yang sebenarnya sedikit oval, dan Bumi justru paling dekat ke Matahari pada awal Januari, saat musim dingin di belahan utara. Simulasi juga mengabaikan pembiasan cahaya oleh atmosfer (yang menambah beberapa menit siang), menganggap Matahari sebagai titik, dan memakai rumus deklinasi sederhana yang akurat sekitar satu derajat. Yang ditampilkan adalah geometri sinar matahari, bukan suhu: musim yang sesungguhnya tertinggal beberapa minggu dari solstis karena daratan dan terutama lautan butuh waktu untuk memanas dan mendingin.',
      ],
    },
    figure: {
      caption: {
        en: 'The axis keeps the same direction all year. In June the northern hemisphere leans toward the Sun: the Sun is high and the day is long. Six months later the same tilt leans it away. The equator (dashed) is lit for 12 hours either way.',
        id: 'Arah sumbu tetap sepanjang tahun. Pada bulan Juni belahan utara condong ke Matahari: Matahari tinggi dan siang panjang. Enam bulan kemudian kemiringan yang sama membuatnya menjauh. Khatulistiwa (garis putus-putus) tetap terang 12 jam dalam kedua keadaan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Earth at the June and December solstices', 'Bumi pada solstis Juni dan Desember')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.ax{stroke:currentColor;stroke-width:2.2}.s{font-size:11px}</style>
  <circle cx="180" cy="120" r="18" fill="#f59e0b"/>
  <text x="180" y="152" text-anchor="middle" class="s">${L('Sun', 'Matahari')}</text>
  <line x1="150" y1="104" x2="110" y2="104" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a)"/>
  <line x1="150" y1="120" x2="110" y2="120" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a)"/>
  <line x1="150" y1="136" x2="110" y2="136" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a)"/>
  <line x1="210" y1="104" x2="250" y2="104" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a)"/>
  <line x1="210" y1="120" x2="250" y2="120" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a)"/>
  <line x1="210" y1="136" x2="250" y2="136" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a)"/>
  <circle cx="60" cy="120" r="26" fill="#3b82f6"/>
  <path d="M60 94 A26 26 0 0 0 60 146 Z" fill="currentColor" opacity=".55"/>
  <line x1="36.2" y1="109.6" x2="83.8" y2="130.4" class="m" stroke-dasharray="3 3"/>
  <line x1="46.4" y1="151.2" x2="73.6" y2="88.8" class="ax"/>
  <text x="76" y="84" class="s">N</text>
  <circle cx="300" cy="120" r="26" fill="#3b82f6"/>
  <path d="M300 94 A26 26 0 0 1 300 146 Z" fill="currentColor" opacity=".55"/>
  <line x1="276.2" y1="109.6" x2="323.8" y2="130.4" class="m" stroke-dasharray="3 3"/>
  <line x1="286.4" y1="151.2" x2="313.6" y2="88.8" class="ax"/>
  <text x="316" y="84" class="s">N</text>
  <text x="60" y="36" text-anchor="middle" fill="#10b981">${L('June solstice', 'Solstis Juni')}</text>
  <text x="60" y="52" text-anchor="middle" class="s">${L('north leans toward Sun', 'utara condong ke Matahari')}</text>
  <text x="60" y="176" text-anchor="middle" class="s">${L('N: long days, high Sun', 'Utara: siang panjang, Matahari tinggi')}</text>
  <text x="60" y="190" text-anchor="middle" class="s">${L('S: short days', 'Selatan: siang pendek')}</text>
  <text x="300" y="36" text-anchor="middle" fill="#8b5cf6">${L('December solstice', 'Solstis Desember')}</text>
  <text x="300" y="52" text-anchor="middle" class="s">${L('north leans away', 'utara menjauh dari Matahari')}</text>
  <text x="300" y="176" text-anchor="middle" class="s">${L('N: short days, low Sun', 'Utara: siang pendek, Matahari rendah')}</text>
  <text x="300" y="190" text-anchor="middle" class="s">${L('S: long days', 'Selatan: siang panjang')}</text>
  <text x="180" y="226" text-anchor="middle" class="s">${L('Both axes are parallel: the tilt never changes, only Earth\'s position does', 'Kedua sumbu sejajar: kemiringannya tetap, hanya posisi Bumi yang berubah')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Seasons are caused by the tilt of Earth\'s axis, not by changes in distance from the Sun.',
        'The hemisphere tilted toward the Sun gets a higher Sun and longer days, so it receives more energy each day.',
        'Solar declination swings between +23.5° and −23.5° over the year and is zero at the equinoxes.',
        'Day length is about 12 hours everywhere at the equinoxes and always close to 12 hours at the equator.',
        'With zero tilt there would be no seasons; with more tilt the seasons would be more extreme.',
      ],
      id: [
        'Musim disebabkan oleh kemiringan sumbu Bumi, bukan oleh perubahan jarak dari Matahari.',
        'Belahan yang condong ke Matahari mendapat Matahari lebih tinggi dan siang lebih panjang, sehingga menerima lebih banyak energi setiap hari.',
        'Deklinasi matahari berayun antara +23,5° dan −23,5° sepanjang tahun dan bernilai nol pada ekuinoks.',
        'Panjang siang sekitar 12 jam di mana-mana saat ekuinoks dan selalu mendekati 12 jam di khatulistiwa.',
        'Tanpa kemiringan tidak akan ada musim; dengan kemiringan lebih besar musim akan lebih ekstrem.',
      ],
    },
    vocabulary: {
      en: [
        ['Axial tilt', 'The angle between Earth\'s rotation axis and a line perpendicular to its orbit, about 23.5°.'],
        ['Solar declination', 'The latitude where the Sun is directly overhead at noon on a given day; it ranges from +23.5° to −23.5°.'],
        ['Solstice', 'The day when the declination is at its extreme (around 21 June and 21 December): the longest or shortest day of the year.'],
        ['Equinox', 'The day when the declination is zero (around 20 March and 22 September) and day and night are each about 12 hours everywhere.'],
        ['Noon altitude', 'The angle of the Sun above the horizon at midday, equal to 90° minus the difference between latitude and declination.'],
        ['Polar day and polar night', 'Periods of 24-hour daylight or darkness, which occur only poleward of about 66.5° latitude.'],
        ['Tropics', 'The band between 23.5° N and 23.5° S, the only places where the Sun can be directly overhead.'],
      ],
      id: [
        ['Kemiringan sumbu', 'Sudut antara sumbu rotasi Bumi dan garis tegak lurus bidang orbitnya, sekitar 23,5°.'],
        ['Deklinasi matahari', 'Lintang tempat Matahari tepat di atas kepala pada tengah hari di tanggal tertentu; nilainya dari +23,5° sampai −23,5°.'],
        ['Solstis (titik balik matahari)', 'Hari ketika deklinasi mencapai nilai ekstremnya (sekitar 21 Juni dan 21 Desember): siang terpanjang atau terpendek dalam setahun.'],
        ['Ekuinoks', 'Hari ketika deklinasi nol (sekitar 20 Maret dan 22 September) dan siang serta malam masing-masing sekitar 12 jam di mana-mana.'],
        ['Ketinggian tengah hari', 'Sudut Matahari di atas horizon pada tengah hari, sama dengan 90° dikurangi selisih antara lintang dan deklinasi.'],
        ['Siang kutub dan malam kutub', 'Masa siang atau gelap 24 jam, yang hanya terjadi di lintang lebih dari sekitar 66,5°.'],
        ['Daerah tropis', 'Pita antara 23,5° LU dan 23,5° LS, satu-satunya tempat Matahari bisa tepat di atas kepala.'],
      ],
    },
    misconceptions: {
      en: [
        ['Summer happens when Earth is closer to the Sun.', 'Earth\'s distance changes by only about 3% over the year, and Earth is actually closest in early January. If distance caused seasons, both hemispheres would have summer at the same time. They do not: it is tilt.'],
        ['The tilt itself changes during the year, leaning toward the Sun in summer and away in winter.', 'The axis points the same direction in space all year. What changes is Earth\'s position in its orbit, so the fixed tilt points toward the Sun from one side and away from it from the other.'],
        ['The Sun is directly overhead at noon everywhere in summer.', 'The Sun can only be overhead between the tropics, 23.5° N and 23.5° S. In Jakarta it happens twice a year; in London or Tokyo it never happens.'],
        ['The equator has the longest days because it is hottest.', 'The equator has about 12 hours of daylight all year. The longest days occur toward the poles in summer, where the Sun can stay up for 24 hours; it is hot at the equator because the Sun is high all year, not because the days are long.'],
      ],
      id: [
        ['Musim panas terjadi ketika Bumi lebih dekat ke Matahari.', 'Jarak Bumi hanya berubah sekitar 3% sepanjang tahun, dan Bumi justru paling dekat pada awal Januari. Jika jarak penyebab musim, kedua belahan Bumi akan mengalami musim panas bersamaan. Kenyataannya tidak: penyebabnya kemiringan sumbu.'],
        ['Kemiringan sumbu berubah sepanjang tahun, condong ke Matahari saat musim panas dan menjauh saat musim dingin.', 'Sumbu menunjuk ke arah yang sama di ruang angkasa sepanjang tahun. Yang berubah adalah posisi Bumi di orbitnya, sehingga kemiringan yang tetap itu mengarah ke Matahari dari satu sisi dan menjauh dari sisi lainnya.'],
        ['Matahari tepat di atas kepala pada tengah hari di mana saja saat musim panas.', 'Matahari hanya bisa tepat di atas kepala di antara garis balik, 23,5° LU dan 23,5° LS. Di Jakarta itu terjadi dua kali setahun; di London atau Tokyo tidak pernah.'],
        ['Khatulistiwa memiliki siang terpanjang karena paling panas.', 'Khatulistiwa mengalami siang sekitar 12 jam sepanjang tahun. Siang terpanjang terjadi ke arah kutub saat musim panas, saat Matahari bisa bersinar 24 jam; khatulistiwa panas karena Matahari tinggi sepanjang tahun, bukan karena siangnya panjang.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesia lies on the equator, so day length stays within about half an hour of 12 hours all year and the Sun passes directly overhead twice a year; its seasons are wet and dry, driven by monsoon winds rather than by tilt.',
        'In Tromsø, Norway (69° N), the Sun does not set from late May to late July and does not rise from late November to mid January.',
        'Solar panels are tilted toward the equator at an angle close to the local latitude, so that they face the noon Sun as squarely as possible through the year.',
        'Stonehenge in England is aligned with the sunrise at the June solstice and the sunset at the December solstice, showing that people tracked the Sun\'s yearly swing thousands of years ago.',
      ],
      id: [
        'Indonesia terletak di khatulistiwa, sehingga panjang siang hanya berubah sekitar setengah jam dari 12 jam sepanjang tahun dan Matahari melintas tepat di atas kepala dua kali setahun; musimnya adalah hujan dan kemarau, yang digerakkan oleh angin muson, bukan oleh kemiringan sumbu.',
        'Di Tromsø, Norwegia (69° LU), Matahari tidak terbenam dari akhir Mei sampai akhir Juli dan tidak terbit dari akhir November sampai pertengahan Januari.',
        'Panel surya dimiringkan ke arah khatulistiwa dengan sudut mendekati lintang setempat, agar menghadap Matahari tengah hari setegak mungkin sepanjang tahun.',
        'Stonehenge di Inggris sejajar dengan arah terbit Matahari pada solstis Juni dan terbenamnya pada solstis Desember, menunjukkan bahwa manusia sudah mengamati ayunan tahunan Matahari ribuan tahun lalu.',
      ],
    },
    questions: {
      en: [
        { q: 'On 21 June the solar declination is +23.5°. What is the noon altitude of the Sun at latitude 60° N according to the sim\'s formula? And at 60° S?', a: 'At 60° N: 90° − (60° − 23.5°) = 53.5°. At 60° S: 90° − (60° + 23.5°) = 6.5°, barely above the horizon. The same date gives midsummer in the north and midwinter in the south.' },
        { q: 'Why does the equator have close to 12 hours of daylight on every day of the year?', a: 'The boundary between day and night always passes through the centre of Earth and divides every circle of latitude that it crosses. For the equator, a great circle through the centre, the division is always exactly in half, so half of each rotation, about 12 hours, is in daylight whatever the declination.' },
        { q: 'Set the tilt to 0°, then to 45°. Describe how the day length at 50° N over the year changes in each case, and explain why.', a: 'At 0° tilt the declination is zero all year, so 50° N has 12-hour days every day and no seasons. At 45° tilt the declination swings between +45° and −45°; at 50° N the sim shows 24-hour days around June and 24-hour nights around December, because the polar circles move down to 45° latitude. Larger tilt means more extreme seasons.' },
      ],
      id: [
        { q: 'Pada 21 Juni deklinasi matahari adalah +23,5°. Berapa ketinggian Matahari tengah hari di lintang 60° LU menurut rumus simulasi? Dan di 60° LS?', a: 'Di 60° LU: 90° − (60° − 23,5°) = 53,5°. Di 60° LS: 90° − (60° + 23,5°) = 6,5°, hampir menyentuh horizon. Tanggal yang sama memberi puncak musim panas di utara dan puncak musim dingin di selatan.' },
        { q: 'Mengapa khatulistiwa mengalami siang hampir 12 jam setiap hari sepanjang tahun?', a: 'Batas antara siang dan malam selalu melewati pusat Bumi dan membagi setiap lingkaran lintang yang dilintasinya. Untuk khatulistiwa, lingkaran besar yang melalui pusat, pembagiannya selalu tepat setengah, sehingga separuh dari setiap rotasi, sekitar 12 jam, berada dalam siang berapa pun deklinasinya.' },
        { q: 'Atur kemiringan ke 0°, lalu ke 45°. Jelaskan bagaimana panjang siang di 50° LU berubah sepanjang tahun pada tiap kasus, dan mengapa.', a: 'Pada kemiringan 0° deklinasi nol sepanjang tahun, jadi 50° LU mengalami siang 12 jam setiap hari dan tidak ada musim. Pada kemiringan 45° deklinasi berayun antara +45° dan −45°; di 50° LU simulasi menunjukkan siang 24 jam sekitar Juni dan malam 24 jam sekitar Desember, karena lingkaran kutub turun ke lintang 45°. Kemiringan lebih besar berarti musim lebih ekstrem.' },
      ],
    },
  },
};
