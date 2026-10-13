// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See that gravitational gradient produces two bulges, not one.',
      'Identify spring vs neap tides from Sun-Moon-Earth geometry.',
      'Predict why the same coast sees roughly two highs and two lows per day.',
    ],
    id: [
      'Melihat bahwa gradien gravitasi menghasilkan dua tonjolan, bukan satu.',
      'Mengenali pasang purnama vs pasang perbani dari geometri Matahari-Bulan-Bumi.',
      'Memprediksi mengapa pantai yang sama mengalami sekitar dua pasang dan dua surut per hari.',
    ],
  },
  tryThis: {
    en: [
      'Place Moon and Sun in line — what kind of tide?',
      'Place Sun perpendicular to Moon — does the bulge shrink?',
      'Watch a spot on Earth\'s surface as it rotates through both bulges.',
    ],
    id: [
      'Tempatkan Bulan dan Matahari segaris — pasang macam apa?',
      'Tempatkan Matahari tegak lurus terhadap Bulan — apakah tonjolan mengecil?',
      'Amati satu titik di permukaan Bumi saat berputar melewati kedua tonjolan.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The Moon\'s gravity pulls on every part of Earth, but not equally. The side of Earth facing the Moon is about 6,400 km closer than the centre and is pulled a little harder; the far side is pulled a little less. Earth as a whole falls toward the Moon with the pull felt at its centre, so what matters is the difference: the near side is pulled ahead of the centre, and the far side lags behind. These leftover pulls, called the tidal force, stretch Earth along the Earth–Moon line. The oceans, being free to flow, pile up into two bulges, one facing the Moon and one facing directly away, while the water in between is drawn down.',
        'Earth rotates once a day underneath these bulges, so a point on the coast passes through a high-water bulge, then a low, then the second bulge, then another low. That gives roughly two high tides and two low tides each day. Because the Moon moves along its orbit in the same direction Earth spins, Earth needs about 24 hours 50 minutes to bring the Moon back overhead, so successive high tides are about 12 hours 25 minutes apart and arrive about 50 minutes later each day.',
        'The Sun also raises tides. It is 27 million times more massive than the Moon, but it is about 390 times farther away, and the tidal force depends on mass divided by the cube of the distance. The cube of 390 is about 59 million, so the Sun\'s tidal effect is only 27/59, about 0.46 of the Moon\'s. The simulation adds the two bulge patterns with exactly these strengths, 1.00 for the Moon and 0.46 for the Sun. When the Sun and Moon line up, at new moon and full moon, the bulges add to 1.46 and we get large spring tides. When they are at right angles, at the quarter moons, the Sun\'s bulge partly fills the Moon\'s low points, the combined bulge drops to 0.54 and we get small neap tides. Drag the Moon or Sun, use the angle sliders, toggle the Sun on and off, and watch the yellow marker on the rotating Earth ride through the bulges.',
        'This is the equilibrium tide, the pattern an idealised water-covered Earth would show if the oceans responded instantly, and the bulge is hugely exaggerated for visibility: in the open ocean it is only about half a metre high. Real tides are shaped by continents that block the bulges, by the depth and shape of ocean basins in which water sloshes back and forth, and by friction that makes the bulges lag behind the Moon. That is why some coasts get one tide a day instead of two, and why the tidal range varies from a few centimetres in the Mediterranean to over 15 metres in Canada\'s Bay of Fundy. The sim also ignores the Moon\'s varying distance and its position north or south of the equator, both of which change tide heights from day to day.',
      ],
      id: [
        'Gravitasi Bulan menarik setiap bagian Bumi, tetapi tidak sama kuat. Sisi Bumi yang menghadap Bulan sekitar 6.400 km lebih dekat daripada pusat Bumi dan ditarik sedikit lebih kuat; sisi yang jauh ditarik sedikit lebih lemah. Bumi secara keseluruhan jatuh ke arah Bulan dengan tarikan yang dirasakan di pusatnya, jadi yang penting adalah selisihnya: sisi dekat ditarik mendahului pusat, dan sisi jauh tertinggal di belakang. Tarikan sisa ini, yang disebut gaya pasang surut, meregangkan Bumi di sepanjang garis Bumi–Bulan. Lautan, yang bebas mengalir, menumpuk menjadi dua tonjolan, satu menghadap Bulan dan satu tepat membelakanginya, sementara air di antaranya tertarik turun.',
        'Bumi berputar sekali sehari di bawah tonjolan ini, sehingga sebuah titik di pantai melewati tonjolan air pasang, lalu surut, lalu tonjolan kedua, lalu surut lagi. Hasilnya kira-kira dua kali pasang dan dua kali surut setiap hari. Karena Bulan bergerak di orbitnya searah dengan putaran Bumi, Bumi membutuhkan sekitar 24 jam 50 menit untuk membawa Bulan kembali tepat di atas, sehingga pasang berikutnya berjarak sekitar 12 jam 25 menit dan datang sekitar 50 menit lebih lambat setiap hari.',
        'Matahari juga menimbulkan pasang. Massanya 27 juta kali massa Bulan, tetapi jaraknya sekitar 390 kali lebih jauh, dan gaya pasang surut bergantung pada massa dibagi pangkat tiga jarak. Pangkat tiga dari 390 kira-kira 59 juta, sehingga efek pasang Matahari hanya 27/59, sekitar 0,46 kali efek Bulan. Simulasi menjumlahkan dua pola tonjolan dengan kekuatan tepat seperti ini, 1,00 untuk Bulan dan 0,46 untuk Matahari. Saat Matahari dan Bulan segaris, pada bulan baru dan purnama, tonjolan bertambah menjadi 1,46 dan terjadilah pasang purnama yang besar. Saat keduanya tegak lurus, pada bulan kuartal, tonjolan Matahari sebagian mengisi titik rendah Bulan, tonjolan gabungan turun menjadi 0,54 dan terjadilah pasang perbani yang kecil. Seret Bulan atau Matahari, pakai slider sudut, nyalakan atau matikan Matahari, dan amati penanda kuning di Bumi yang berputar melewati tonjolan.',
        'Ini adalah pasang kesetimbangan, pola yang akan ditunjukkan Bumi ideal yang tertutup air jika lautan merespons seketika, dan tonjolannya sangat dibesar-besarkan agar terlihat: di laut terbuka tingginya hanya sekitar setengah meter. Pasang sungguhan dibentuk oleh benua yang menghalangi tonjolan, oleh kedalaman dan bentuk cekungan samudra tempat air berayun bolak-balik, dan oleh gesekan yang membuat tonjolan tertinggal di belakang Bulan. Itulah sebabnya beberapa pantai hanya mengalami satu kali pasang sehari, bukan dua, dan mengapa rentang pasang bervariasi dari beberapa sentimeter di Laut Tengah sampai lebih dari 15 meter di Teluk Fundy, Kanada. Simulasi juga mengabaikan jarak Bulan yang berubah-ubah dan posisinya di utara atau selatan khatulistiwa, yang keduanya mengubah tinggi pasang dari hari ke hari.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: the Moon pulls the near side of Earth harder than the centre, and the centre harder than the far side. Bottom: subtract the pull on the centre (which moves Earth as a whole) and what remains, the tidal force, stretches Earth along the Earth–Moon line, raising two bulges.',
        id: 'Atas: Bulan menarik sisi dekat Bumi lebih kuat daripada pusatnya, dan pusat lebih kuat daripada sisi jauh. Bawah: kurangkan tarikan pada pusat (yang menggerakkan Bumi secara keseluruhan), dan yang tersisa, gaya pasang surut, meregangkan Bumi di sepanjang garis Bumi–Bulan sehingga timbul dua tonjolan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Why there are two tidal bulges', 'Mengapa ada dua tonjolan pasang')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.f{stroke-width:2.4;fill:none}.s{font-size:10.5px}</style>
  <text x="8" y="16" class="s">${L('1. Moon\'s pull: stronger on the near side', '1. Tarikan Bulan: lebih kuat di sisi dekat')}</text>
  <circle cx="110" cy="66" r="30" class="m"/>
  <circle cx="320" cy="66" r="10" fill="currentColor" opacity=".7"/>
  <text x="320" y="92" text-anchor="middle" class="s">${L('Moon', 'Bulan')}</text>
  <line x1="80" y1="66" x2="98" y2="66" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <line x1="110" y1="56" x2="136" y2="56" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <line x1="140" y1="66" x2="176" y2="66" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <circle cx="110" cy="56" r="2.5" fill="currentColor"/>
  <text x="46" y="100" class="s" fill="#3b82f6">${L('far side: weak', 'sisi jauh: lemah')}</text>
  <text x="104" y="44" class="s" fill="#3b82f6">${L('centre', 'pusat')}</text>
  <text x="150" y="100" class="s" fill="#3b82f6">${L('near side: strong', 'sisi dekat: kuat')}</text>
  <text x="8" y="130" class="s">${L('2. Minus the pull on the centre = tidal force', '2. Dikurangi tarikan pada pusat = gaya pasang surut')}</text>
  <ellipse cx="110" cy="180" rx="46" ry="26" fill="#3b82f6" opacity=".3"/>
  <circle cx="110" cy="180" r="30" class="m"/>
  <circle cx="320" cy="180" r="10" fill="currentColor" opacity=".7"/>
  <line x1="140" y1="180" x2="170" y2="180" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <line x1="80" y1="180" x2="50" y2="180" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <line x1="110" y1="146" x2="110" y2="158" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <line x1="110" y1="214" x2="110" y2="202" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="176" y="184" class="s" fill="#ef4444">${L('bulge toward Moon', 'tonjolan ke arah Bulan')}</text>
  <text x="46" y="226" class="s" fill="#ef4444">${L('bulge away from Moon', 'tonjolan menjauhi Bulan')}</text>
  <text x="196" y="226" class="s" fill="#3b82f6">${L('blue = ocean, exaggerated', 'biru = lautan, dibesar-besarkan')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Tides are caused by the difference in the Moon\'s pull across Earth, not by the pull itself.',
        'That difference stretches Earth along the Earth–Moon line, producing two bulges: one toward the Moon and one away from it.',
        'Earth rotating under two bulges gives about two high and two low tides a day, roughly 12 hours 25 minutes apart.',
        'The Sun\'s tidal effect is about 0.46 of the Moon\'s; aligned they give spring tides, at right angles they give neap tides.',
        'Real tides depend heavily on coastlines and ocean basins, so the simple two-bulge model is only the starting point.',
      ],
      id: [
        'Pasang surut disebabkan oleh selisih tarikan Bulan di seluruh Bumi, bukan oleh tarikan itu sendiri.',
        'Selisih itu meregangkan Bumi di sepanjang garis Bumi–Bulan, menghasilkan dua tonjolan: satu ke arah Bulan dan satu menjauhinya.',
        'Bumi yang berputar di bawah dua tonjolan mengalami sekitar dua pasang dan dua surut sehari, berjarak kira-kira 12 jam 25 menit.',
        'Efek pasang Matahari sekitar 0,46 kali efek Bulan; saat segaris menghasilkan pasang purnama, saat tegak lurus menghasilkan pasang perbani.',
        'Pasang sungguhan sangat bergantung pada garis pantai dan cekungan samudra, sehingga model dua tonjolan yang sederhana hanyalah titik awal.',
      ],
    },
    vocabulary: {
      en: [
        ['Tidal force', 'The difference between the gravitational pull at a point on Earth and the pull at Earth\'s centre; it stretches Earth along the line to the Moon.'],
        ['Tidal bulge', 'A region where the ocean is raised by the tidal force; there are two, on opposite sides of Earth.'],
        ['High tide and low tide', 'The highest and lowest water levels at a coast as Earth rotates through the bulges and the troughs between them.'],
        ['Tidal range', 'The height difference between high tide and low tide.'],
        ['Spring tide', 'A larger-than-usual tidal range at new and full moon, when the Sun and Moon pull along the same line.'],
        ['Neap tide', 'A smaller-than-usual tidal range at the quarter moons, when the Sun and Moon are at right angles.'],
        ['Semidiurnal tide', 'A tide pattern with two highs and two lows per day, as in the sim and on most coasts.'],
        ['Lunar day', 'The time for the Moon to return overhead, about 24 hours 50 minutes, because the Moon moves along its orbit while Earth spins.'],
      ],
      id: [
        ['Gaya pasang surut', 'Selisih antara tarikan gravitasi di suatu titik di Bumi dan tarikan di pusat Bumi; gaya ini meregangkan Bumi di sepanjang garis ke Bulan.'],
        ['Tonjolan pasang', 'Daerah tempat permukaan laut terangkat oleh gaya pasang surut; ada dua, di sisi Bumi yang berlawanan.'],
        ['Pasang dan surut', 'Permukaan air tertinggi dan terendah di pantai saat Bumi berputar melewati tonjolan dan lembah di antaranya.'],
        ['Rentang pasang', 'Selisih tinggi antara air pasang dan air surut.'],
        ['Pasang purnama', 'Rentang pasang yang lebih besar dari biasanya saat bulan baru dan purnama, ketika Matahari dan Bulan menarik sepanjang garis yang sama.'],
        ['Pasang perbani', 'Rentang pasang yang lebih kecil dari biasanya saat bulan kuartal, ketika Matahari dan Bulan tegak lurus.'],
        ['Pasang semidiurnal', 'Pola pasang dengan dua kali pasang dan dua kali surut per hari, seperti di simulasi dan di sebagian besar pantai.'],
        ['Hari bulan', 'Waktu bagi Bulan untuk kembali tepat di atas kepala, sekitar 24 jam 50 menit, karena Bulan bergerak di orbitnya sementara Bumi berputar.'],
      ],
    },
    misconceptions: {
      en: [
        ['The Moon pulls the water up on the side facing it, so there should be only one bulge.', 'The Moon pulls the whole Earth, and it pulls the near side harder than the centre and the centre harder than the far side. Relative to the centre, the near side is pulled toward the Moon and the far side is left behind, so Earth is stretched and there are two bulges.'],
        ['Spring tides happen in the spring season.', 'The name has nothing to do with the season; it comes from the water "springing up". Spring tides happen twice every month, at new moon and full moon, all year round.'],
        ['The Sun is far more massive than the Moon, so it must dominate the tides.', 'Tidal force falls off with the cube of distance. The Sun\'s enormous mass is outweighed by its 390-times-greater distance, leaving it with only about 46% of the Moon\'s tidal effect.'],
        ['High tide happens exactly when the Moon is overhead.', 'In the sim it does, but real bulges lag behind the Moon because water takes time to move and is blocked by continents. On many coasts high tide comes hours after the Moon passes overhead.'],
      ],
      id: [
        ['Bulan menarik air naik di sisi yang menghadapnya, jadi seharusnya hanya ada satu tonjolan.', 'Bulan menarik seluruh Bumi, dan menarik sisi dekat lebih kuat daripada pusat, serta pusat lebih kuat daripada sisi jauh. Relatif terhadap pusat, sisi dekat tertarik ke arah Bulan dan sisi jauh tertinggal, sehingga Bumi teregang dan ada dua tonjolan.'],
        ['Pasang purnama hanya terjadi saat bulan purnama.', 'Pasang purnama terjadi dua kali setiap bulan: saat purnama dan juga saat bulan baru, karena pada keduanya Matahari dan Bulan segaris dengan Bumi dan tarikannya saling menguatkan.'],
        ['Matahari jauh lebih masif daripada Bulan, jadi pastilah Matahari yang mendominasi pasang surut.', 'Gaya pasang surut berkurang mengikuti pangkat tiga jarak. Massa Matahari yang sangat besar kalah oleh jaraknya yang 390 kali lebih jauh, sehingga efek pasangnya hanya sekitar 46% dari efek Bulan.'],
        ['Air pasang terjadi tepat saat Bulan di atas kepala.', 'Di simulasi memang begitu, tetapi tonjolan sungguhan tertinggal di belakang Bulan karena air butuh waktu untuk bergerak dan terhalang benua. Di banyak pantai, air pasang datang beberapa jam setelah Bulan melintas di atas kepala.'],
      ],
    },
    realWorld: {
      en: [
        'Tide tables, used by fishers, sailors and port operators, are built from exactly this geometry plus local corrections measured over years at each harbour.',
        'The Bay of Fundy in Canada has the largest tidal range on Earth, up to about 16 metres, because the natural sloshing period of the bay matches the 12 hour 25 minute tidal rhythm.',
        'Tidal friction slowly transfers Earth\'s spin to the Moon\'s orbit: the day lengthens by about 2 milliseconds per century and the Moon drifts away about 3.8 cm per year.',
        'The same tidal stretching, acting on the Moon, locked its rotation so that it always shows us the same face; Jupiter\'s moon Io is squeezed so hard by tides that its interior melts and it is covered in volcanoes.',
      ],
      id: [
        'Tabel pasang surut, yang dipakai nelayan, pelaut, dan pengelola pelabuhan, dibuat dari geometri yang persis seperti ini ditambah koreksi lokal yang diukur selama bertahun-tahun di tiap pelabuhan.',
        'Teluk Fundy di Kanada memiliki rentang pasang terbesar di Bumi, sampai sekitar 16 meter, karena periode ayunan alami teluk itu cocok dengan irama pasang 12 jam 25 menit.',
        'Gesekan pasang surut perlahan memindahkan putaran Bumi ke orbit Bulan: hari bertambah panjang sekitar 2 milidetik per abad dan Bulan menjauh sekitar 3,8 cm per tahun.',
        'Regangan pasang surut yang sama, yang bekerja pada Bulan, mengunci rotasinya sehingga Bulan selalu menunjukkan wajah yang sama kepada kita; bulan Jupiter, Io, diremas begitu kuat oleh pasang surut sehingga bagian dalamnya meleleh dan permukaannya penuh gunung api.',
      ],
    },
    questions: {
      en: [
        { q: 'The Sun has about 27 million times the mass of the Moon but is about 390 times farther from Earth. Show that its tidal effect is less than half the Moon\'s.', a: 'Tidal force is proportional to mass divided by distance cubed. 390 × 390 × 390 is about 59 million, so the Sun\'s tidal effect relative to the Moon\'s is 27 million / 59 million, about 0.46. This is the value the sim uses for the Sun\'s bulge.' },
        { q: 'Using the sim\'s strengths (Moon 1.00, Sun 0.46), how many times larger is the spring-tide bulge than the neap-tide bulge?', a: 'Aligned: 1.00 + 0.46 = 1.46. At right angles: 1.00 − 0.46 = 0.54. The ratio is 1.46 / 0.54, about 2.7. Real coasts show a smaller contrast because local basin effects dominate, but spring ranges are clearly bigger than neap ranges everywhere.' },
        { q: 'If a coast has high tide at 6:00 this morning, when are the next two high tides expected, and why not at 18:00 and 6:00 sharp?', a: 'About 18:25 today and 6:50 tomorrow. Successive highs are about 12 hours 25 minutes apart because the Moon moves along its orbit while Earth spins, so Earth needs 24 hours 50 minutes, not 24 hours, to bring the Moon back overhead; two bulges fit in that lunar day.' },
      ],
      id: [
        { q: 'Massa Matahari sekitar 27 juta kali massa Bulan, tetapi jaraknya dari Bumi sekitar 390 kali lebih jauh. Tunjukkan bahwa efek pasangnya kurang dari separuh efek Bulan.', a: 'Gaya pasang surut sebanding dengan massa dibagi pangkat tiga jarak. 390 × 390 × 390 kira-kira 59 juta, sehingga efek pasang Matahari relatif terhadap Bulan adalah 27 juta / 59 juta, sekitar 0,46. Inilah nilai yang dipakai simulasi untuk tonjolan Matahari.' },
        { q: 'Dengan kekuatan di simulasi (Bulan 1,00, Matahari 0,46), berapa kali lebih besar tonjolan pasang purnama dibanding tonjolan pasang perbani?', a: 'Segaris: 1,00 + 0,46 = 1,46. Tegak lurus: 1,00 − 0,46 = 0,54. Rasionya 1,46 / 0,54, sekitar 2,7. Pantai sungguhan menunjukkan perbedaan yang lebih kecil karena efek cekungan setempat mendominasi, tetapi rentang pasang purnama jelas lebih besar daripada pasang perbani di mana pun.' },
        { q: 'Jika suatu pantai mengalami air pasang pukul 6.00 pagi ini, kapan dua pasang berikutnya diperkirakan terjadi, dan mengapa bukan tepat pukul 18.00 dan 6.00?', a: 'Sekitar pukul 18.25 hari ini dan 6.50 besok. Pasang berikutnya berjarak sekitar 12 jam 25 menit karena Bulan bergerak di orbitnya sementara Bumi berputar, sehingga Bumi membutuhkan 24 jam 50 menit, bukan 24 jam, untuk membawa Bulan kembali tepat di atas kepala; dua tonjolan tercakup dalam satu hari bulan itu.' },
      ],
    },
  },
};
