// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Recognize that perception is interpretation, not measurement.',
      'See how context warps size, length, and color judgments.',
      'Connect illusions to underlying neural mechanisms.',
    ],
    id: [
      'Mengenali bahwa persepsi adalah interpretasi, bukan pengukuran.',
      'Melihat konteks mempengaruhi penilaian ukuran, panjang, dan warna.',
      'Menghubungkan ilusi dengan mekanisme neural.',
    ],
  },
  tryThis: {
    en: [
      'Müller-Lyer — the two horizontal lines are the same length.',
      'Café Wall — the rows are perfectly straight.',
      'Checker Shadow — the two squares are the same shade of gray.',
    ],
    id: [
      'Müller-Lyer — kedua garis horizontal sama panjang.',
      'Café Wall — baris-barisnya lurus sempurna.',
      'Checker Shadow — kedua kotak sama warna abu-abu.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Seeing feels like looking through a window, but it is not. Light enters your eyes, and your brain then builds a picture using rules it has learned from a lifetime of looking at the world: things that are far away look small, lines that come together usually run off into the distance, and a surface in shadow sends less light to the eye than the same surface in sunlight. These rules are usually right, which is why you can catch a ball or walk through a doorway without thinking. An optical illusion is a drawing designed so that the rules give the wrong answer. The surprising part is that the illusion does not go away once you know the truth. You can measure the lines, prove they are equal, and still see one as longer, because perception is automatic and does not wait for your opinion.',
        'This gallery shows six famous examples. In the Müller-Lyer figure, two lines of equal length end in fins; the line with fins pointing outward looks longer than the line with arrowheads. In the Ponzo figure, two equal bars sit between two converging lines, like railway tracks; the bar nearer the narrow end looks longer, because the brain treats it as farther away, and a far object that still looks this big must really be large. In the Ebbinghaus figure, the same orange circle looks small when surrounded by big circles and large when surrounded by small ones. In the Hering figure, two straight parallel lines seem to bow outward where they cross a fan of radiating lines. In the Café Wall, rows of black and white tiles shifted by half a tile make the perfectly straight grey mortar lines look as if they slope. In the Checker Shadow, a square inside a shadow looks lighter than it really is, because the brain quietly adds back the light it thinks the shadow took away.',
        'Use the dropdown to pick an illusion and switch on the overlay to check it with dashed ruler lines, matching circles, or a connecting strip. The sim keeps each illusion in its simplest form, so it has limits worth knowing. It does not let you adjust a figure until it looks equal, which is how scientists measure how strong an illusion is, and it cannot tell you how strongly you personally are fooled. The illusions also depend on details: the Café Wall effect disappears if the thin grey mortar line is removed or made black or white, and the Checker Shadow drawn here is a simplified version of the real photograph-like figure, in which the two labelled squares are printed in exactly the same grey. What the gallery can show is the main lesson: the same ink on the screen can look different depending on what surrounds it.',
      ],
      id: [
        'Melihat terasa seperti memandang lewat jendela, padahal bukan. Cahaya masuk ke mata, lalu otak menyusun gambar dengan aturan yang dipelajarinya seumur hidup dari memandang dunia: benda yang jauh tampak kecil, garis-garis yang saling mendekat biasanya menjauh ke kejauhan, dan permukaan dalam bayangan mengirim lebih sedikit cahaya ke mata daripada permukaan yang sama di bawah sinar matahari. Aturan ini biasanya benar, dan karena itulah kita bisa menangkap bola atau melewati pintu tanpa berpikir. Ilusi optik adalah gambar yang sengaja dirancang agar aturan-aturan itu memberi jawaban yang salah. Yang mengejutkan, ilusinya tidak hilang setelah kita tahu kebenarannya. Kita bisa mengukur garisnya, membuktikan keduanya sama, dan tetap melihat salah satunya lebih panjang, karena persepsi berjalan otomatis dan tidak menunggu pendapat kita.',
        'Galeri ini menampilkan enam contoh terkenal. Pada gambar Müller-Lyer, dua garis yang sama panjang berujung sirip; garis dengan sirip mengarah ke luar tampak lebih panjang daripada garis dengan ujung anak panah. Pada gambar Ponzo, dua batang yang sama panjang berada di antara dua garis yang saling mendekat, seperti rel kereta; batang yang lebih dekat ke ujung sempit tampak lebih panjang, karena otak menganggapnya lebih jauh, dan benda jauh yang masih tampak sebesar ini pasti benar-benar besar. Pada gambar Ebbinghaus, lingkaran jingga yang sama tampak kecil saat dikelilingi lingkaran besar dan tampak besar saat dikelilingi lingkaran kecil. Pada gambar Hering, dua garis lurus yang sejajar tampak melengkung keluar ketika memotong kipas garis-garis yang memancar. Pada Café Wall, baris ubin hitam-putih yang digeser setengah ubin membuat garis semen abu-abu yang lurus sempurna tampak miring. Pada Bayangan Papan Catur, kotak di dalam bayangan tampak lebih terang dari warna aslinya, karena otak diam-diam menambahkan kembali cahaya yang menurutnya diambil oleh bayangan.',
        'Gunakan menu pilihan untuk memilih ilusi dan nyalakan overlay untuk memeriksanya dengan garis penggaris putus-putus, lingkaran pembanding, atau pita penghubung. Simulasi ini menjaga tiap ilusi dalam bentuk paling sederhana, sehingga ada batasan yang perlu diketahui. Ia tidak membiarkan Anda menyetel gambar sampai tampak sama, padahal begitulah cara ilmuwan mengukur kekuatan sebuah ilusi, dan ia tidak bisa memberi tahu seberapa kuat Anda pribadi tertipu. Ilusi juga bergantung pada detail: efek Café Wall hilang jika garis semen abu-abu yang tipis dihapus atau diganti hitam atau putih, dan Bayangan Papan Catur yang digambar di sini adalah versi sederhana dari gambar aslinya yang mirip foto, yang kedua kotak berlabelnya dicetak dengan abu-abu yang persis sama. Yang bisa ditunjukkan galeri ini adalah pelajaran utamanya: tinta yang sama di layar bisa tampak berbeda tergantung apa yang mengelilinginya.',
      ],
    },
    figure: {
      caption: {
        en: 'Müller-Lyer: the two horizontal lines are exactly the same length, as the dashed ruler lines show, yet the one with outward fins looks longer. Below, Ebbinghaus: both orange circles are the same size.',
        id: 'Müller-Lyer: kedua garis horizontal persis sama panjang, seperti ditunjukkan garis penggaris putus-putus, tetapi yang bersirip ke luar tampak lebih panjang. Di bawah, Ebbinghaus: kedua lingkaran jingga sama besar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const ring = (cx, cy, R, r, n) => Array.from({ length: n }, (_, i) => {
          const a = (i / n) * Math.PI * 2;
          return `<circle cx="${(cx + Math.cos(a) * R).toFixed(1)}" cy="${(cy + Math.sin(a) * R).toFixed(1)}" r="${r}" class="g"/>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Müller-Lyer and Ebbinghaus illusions with measuring overlays', 'Ilusi Müller-Lyer dan Ebbinghaus dengan overlay pengukur')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.65}.l{stroke:currentColor;stroke-width:3;fill:none;stroke-linecap:round}.r{stroke:#f59e0b;stroke-width:1.2;stroke-dasharray:4 3}.g{fill:currentColor;opacity:.35}</style>
  <text x="12" y="18" font-weight="700">${L('Same length, different look', 'Sama panjang, tampak berbeda')}</text>
  <path d="M100 40 L120 50 L100 60" class="l"/>
  <line x1="120" y1="50" x2="240" y2="50" class="l"/>
  <path d="M260 40 L240 50 L260 60" class="l"/>
  <text x="270" y="54" class="s">${L('looks shorter', 'tampak lebih pendek')}</text>
  <path d="M140 80 L120 90 L140 100" class="l"/>
  <line x1="120" y1="90" x2="240" y2="90" class="l"/>
  <path d="M220 80 L240 90 L220 100" class="l"/>
  <text x="270" y="94" class="s">${L('looks longer', 'tampak lebih panjang')}</text>
  <line x1="120" y1="32" x2="120" y2="112" class="r"/>
  <line x1="240" y1="32" x2="240" y2="112" class="r"/>
  <text x="124" y="118" fill="#f59e0b" class="s">${L('ruler: the ends line up', 'penggaris: ujungnya sejajar')}</text>
  <text x="12" y="146" font-weight="700">${L('Same size, different look', 'Sama besar, tampak berbeda')}</text>
  ${ring(90, 195, 38, 13, 6)}
  <circle cx="90" cy="195" r="13" fill="#f59e0b"/>
  ${ring(250, 195, 24, 5, 8)}
  <circle cx="250" cy="195" r="13" fill="#f59e0b"/>
  <circle cx="90" cy="195" r="13" fill="none" stroke="#10b981" stroke-width="1.2" stroke-dasharray="3 3"/>
  <circle cx="250" cy="195" r="13" fill="none" stroke="#10b981" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="103" y1="195" x2="237" y2="195" class="r"/>
  <text x="170" y="236" text-anchor="middle" fill="#10b981" class="s">${L('both orange circles: radius 13', 'kedua lingkaran jingga: jari-jari 13')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Perception is the brain\'s interpretation of light, not a direct measurement of the world.',
        'The brain uses shortcuts learned from experience, such as "converging lines mean distance" and "shadows make surfaces darker".',
        'An illusion appears when a drawing triggers one of these shortcuts in a situation where it gives the wrong answer.',
        'Context changes what we see: the same line, circle, or grey square looks different depending on what surrounds it.',
        'Knowing the truth does not switch an illusion off, because perception happens automatically before you think about it.',
      ],
      id: [
        'Persepsi adalah tafsiran otak atas cahaya, bukan pengukuran langsung terhadap dunia.',
        'Otak memakai jalan pintas yang dipelajari dari pengalaman, seperti "garis yang saling mendekat berarti jauh" dan "bayangan membuat permukaan lebih gelap".',
        'Ilusi muncul ketika sebuah gambar memicu jalan pintas itu dalam situasi yang membuatnya memberi jawaban salah.',
        'Konteks mengubah apa yang kita lihat: garis, lingkaran, atau kotak abu-abu yang sama tampak berbeda tergantung apa yang mengelilinginya.',
        'Mengetahui kebenaran tidak mematikan ilusi, karena persepsi terjadi otomatis sebelum kita memikirkannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Perception', 'The picture of the world that the brain builds from the signals sent by the senses.'],
        ['Optical illusion', 'An image that makes almost everyone see something different from what is really drawn.'],
        ['Context', 'The surroundings of an object, which the brain uses when judging its size, length, or brightness.'],
        ['Depth cue', 'A hint in a flat picture, such as converging lines, that the brain reads as distance.'],
        ['Lightness constancy', 'The brain\'s habit of judging how light or dark a surface is after allowing for shadows and lighting.'],
        ['Overlay', 'The dashed rulers and matching circles the sim draws on top of an illusion to check the true sizes.'],
      ],
      id: [
        ['Persepsi', 'Gambaran dunia yang disusun otak dari sinyal yang dikirim pancaindra.'],
        ['Ilusi optik', 'Gambar yang membuat hampir semua orang melihat sesuatu yang berbeda dari yang sebenarnya tergambar.'],
        ['Konteks', 'Lingkungan di sekitar suatu benda, yang dipakai otak saat menilai ukuran, panjang, atau kecerahannya.'],
        ['Petunjuk kedalaman', 'Isyarat dalam gambar datar, misalnya garis yang saling mendekat, yang dibaca otak sebagai jarak.'],
        ['Kekonstanan kecerahan', 'Kebiasaan otak menilai terang-gelapnya suatu permukaan setelah memperhitungkan bayangan dan pencahayaan.'],
        ['Overlay', 'Penggaris putus-putus dan lingkaran pembanding yang digambar simulasi di atas ilusi untuk memeriksa ukuran sebenarnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Illusions happen because there is something wrong with your eyes.', 'Your eyes are working fine. The illusion is created in the brain, by rules that are normally very useful. Being fooled is actually a sign that your visual system is doing its usual job.'],
        ['Once you know the lines are equal, you will see them as equal.', 'Almost nobody does. You can know the answer and still see the illusion, because perception is automatic and is not changed by knowledge.'],
        ['Only some people, or only children, are fooled by illusions.', 'Nearly everyone sees these illusions, including the scientists who study them. The strength can vary a little from person to person, but the direction is the same.'],
        ['The illusion is in the screen or the drawing.', 'The lines on the screen are exactly equal; a ruler proves it. The difference exists only in how the brain interprets them.'],
      ],
      id: [
        ['Ilusi terjadi karena ada yang salah dengan mata kita.', 'Mata kita bekerja dengan baik. Ilusi diciptakan di otak, oleh aturan-aturan yang biasanya sangat berguna. Tertipu justru pertanda sistem penglihatan kita bekerja seperti biasa.'],
        ['Setelah tahu kedua garis sama panjang, kita akan melihatnya sama.', 'Hampir tidak ada yang bisa. Kita bisa tahu jawabannya dan tetap melihat ilusinya, karena persepsi berjalan otomatis dan tidak berubah oleh pengetahuan.'],
        ['Hanya sebagian orang, atau hanya anak-anak, yang tertipu ilusi.', 'Hampir semua orang melihat ilusi ini, termasuk para ilmuwan yang mempelajarinya. Kekuatannya bisa sedikit berbeda antarorang, tetapi arahnya sama.'],
        ['Ilusinya ada di layar atau di gambarnya.', 'Garis di layar persis sama; penggaris membuktikannya. Perbedaannya hanya ada pada cara otak menafsirkannya.'],
      ],
    },
    realWorld: {
      en: [
        'The Moon looks much bigger near the horizon than high in the sky, although a photo shows it is the same size: another illusion of context.',
        'Film makers use forced perspective, placing an actor farther from the camera so that they look small next to another actor, the Ponzo idea in reverse.',
        'Clothing and interior design use the same tricks: vertical stripes and light colours make a body or a room look taller or larger.',
        'Road designers sometimes paint stripes that get closer together to make drivers feel they are speeding up, so they slow down before a bend.',
      ],
      id: [
        'Bulan tampak jauh lebih besar di dekat ufuk daripada tinggi di langit, padahal foto menunjukkan ukurannya sama: ilusi konteks yang lain.',
        'Pembuat film memakai perspektif paksa, menempatkan seorang aktor lebih jauh dari kamera agar tampak kecil di samping aktor lain, kebalikan dari gagasan Ponzo.',
        'Desain pakaian dan interior memakai trik yang sama: garis vertikal dan warna terang membuat tubuh atau ruangan tampak lebih tinggi atau lebih luas.',
        'Perancang jalan kadang mengecat garis yang makin rapat agar pengemudi merasa sedang bertambah cepat, sehingga mereka memperlambat laju sebelum tikungan.',
      ],
    },
    questions: {
      en: [
        { q: 'In the Ponzo illusion the two bars are the same length, but the top one looks longer. Explain why, using the idea of railway tracks.', a: 'The two converging lines look like railway tracks running into the distance, so the brain treats the top bar as farther away. If a far object makes the same-size image on the eye as a near one, the far object must really be bigger, so the brain shows the top bar as longer.' },
        { q: 'You switch on the overlay in the Müller-Lyer illusion and see that the ends line up. Will the lines now look equal to you? Why or why not?', a: 'Usually not. Knowing the lines are equal does not change the picture the brain builds, because perception is automatic. The line with outward fins will still look a little longer, even though you know it is not.' },
        { q: 'In a checker-shadow picture, why does a square inside the shadow look lighter than a square of the same grey outside the shadow?', a: 'The brain knows that shadows make surfaces look darker, so it adds back the light it thinks the shadow removed. A square that sends the same grey to the eye from inside a shadow is therefore judged to be a lighter surface. This is usually helpful, because it lets you recognise a white shirt as white whether it is in sun or shade.' },
      ],
      id: [
        { q: 'Pada ilusi Ponzo kedua batang sama panjang, tetapi batang atas tampak lebih panjang. Jelaskan mengapa, dengan memakai gagasan rel kereta.', a: 'Kedua garis yang saling mendekat tampak seperti rel kereta yang menjauh, sehingga otak menganggap batang atas lebih jauh. Jika benda yang jauh membentuk bayangan sebesar benda yang dekat di mata, benda jauh itu pasti benar-benar lebih besar, sehingga otak menampilkan batang atas sebagai lebih panjang.' },
        { q: 'Anda menyalakan overlay pada ilusi Müller-Lyer dan melihat ujung-ujungnya sejajar. Apakah garisnya kini tampak sama bagi Anda? Mengapa?', a: 'Biasanya tidak. Mengetahui bahwa garisnya sama tidak mengubah gambaran yang disusun otak, karena persepsi berjalan otomatis. Garis dengan sirip ke luar tetap tampak sedikit lebih panjang, meski Anda tahu sebenarnya tidak.' },
        { q: 'Pada gambar bayangan papan catur, mengapa kotak di dalam bayangan tampak lebih terang daripada kotak dengan abu-abu yang sama di luar bayangan?', a: 'Otak tahu bahwa bayangan membuat permukaan tampak lebih gelap, sehingga ia menambahkan kembali cahaya yang menurutnya dihilangkan bayangan. Kotak yang mengirim abu-abu yang sama ke mata dari dalam bayangan karenanya dinilai sebagai permukaan yang lebih terang. Ini biasanya berguna, karena membuat kita mengenali kemeja putih sebagai putih baik di bawah sinar matahari maupun di tempat teduh.' },
      ],
    },
  },
};
