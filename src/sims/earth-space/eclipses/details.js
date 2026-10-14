// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish solar from lunar eclipses by geometry.',
      'Identify umbra (total) vs penumbra (partial).',
      'Explain why eclipses don\'t happen every full or new moon.',
    ],
    id: [
      'Membedakan gerhana matahari dan gerhana bulan dari geometrinya.',
      'Mengenali umbra (total) vs penumbra (sebagian).',
      'Menjelaskan mengapa gerhana tidak terjadi setiap purnama atau bulan baru.',
    ],
  },
  tryThis: {
    en: [
      'Place the Moon between Earth and Sun — does Earth get a shadow?',
      'Move the Moon behind Earth — what kind of eclipse is that?',
      'Tilt the Moon\'s orbit slightly off-axis — does an eclipse still happen?',
    ],
    id: [
      'Tempatkan Bulan di antara Bumi dan Matahari — apakah Bumi mendapat bayangan?',
      'Geser Bulan di belakang Bumi — gerhana apa itu?',
      'Miringkan sedikit orbit Bulan dari sumbu — apakah gerhana tetap terjadi?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An eclipse is a shadow. Because the Sun is a big glowing ball and not a tiny point, the shadow behind the Moon or Earth has two parts. In the umbra the Sun is completely hidden, and it is dark. In the penumbra only part of the Sun is hidden, so it is only dimmer. The Sun is far larger than the Moon or Earth, so the umbra is a cone that gets narrower and narrower until it ends in a point, while the penumbra spreads out wider.',
        'A solar eclipse happens when the Moon moves between the Sun and Earth and its shadow falls on Earth. People standing inside the narrow umbra see the Sun completely covered for a few minutes: a total eclipse. People in the wide penumbra see only a bite taken out of the Sun: a partial eclipse. A lunar eclipse happens when Earth is between the Sun and the Moon and the Moon moves into Earth\'s shadow. Earth\'s umbra is much longer and wider than the Moon, so a lunar eclipse can be seen by everyone on the night side of Earth and can last for hours, with the Moon turning a dim copper red.',
        'In the simulation you can drag the Moon and Earth and watch the umbra (dark cone) and penumbra (lighter cone) move with them. The label tells you which eclipse the line-up gives: total when the Moon\'s umbra reaches Earth, annular when the umbra ends before Earth and only its continuation (the antumbra) arrives, partial when only the penumbra touches Earth, and lunar when the Moon sits in Earth\'s shadow. The sim works out how long the umbra is from the sizes of the Sun and the Moon: a bigger Moon casts a longer umbra. If you make the Moon small or drag it farther from Earth, its umbra ends before it reaches Earth, and that gives an annular eclipse, where a thin ring of Sun stays visible around the Moon. The "Tilt off-axis" button moves the Moon above or below the line; this is the real reason eclipses are rare. The Moon\'s orbit is tilted by about 5 degrees, so most months its shadow passes above or below Earth, and the Moon passes above or below Earth\'s shadow.',
        'The picture is not to scale. The real Sun is about 400 times wider than the Moon and also about 400 times farther away, which is why the two look the same size in our sky, a coincidence that makes total solar eclipses possible at all. The sim draws the penumbra roughly, as a wide cone, so judge total, annular and partial from the label rather than from the drawn shading.',
      ],
      id: [
        'Gerhana adalah bayangan. Karena Matahari adalah bola bercahaya yang besar dan bukan titik kecil, bayangan di belakang Bulan atau Bumi memiliki dua bagian. Di dalam umbra, Matahari tertutup seluruhnya sehingga gelap. Di dalam penumbra hanya sebagian Matahari yang tertutup, sehingga hanya lebih redup. Matahari jauh lebih besar daripada Bulan atau Bumi, sehingga umbra berbentuk kerucut yang semakin menyempit sampai berakhir pada satu titik, sedangkan penumbra melebar.',
        'Gerhana matahari terjadi ketika Bulan bergerak di antara Matahari dan Bumi dan bayangannya jatuh ke Bumi. Orang yang berdiri di dalam umbra yang sempit melihat Matahari tertutup seluruhnya selama beberapa menit: gerhana total. Orang di penumbra yang lebar hanya melihat Matahari seperti tergigit: gerhana sebagian. Gerhana bulan terjadi ketika Bumi berada di antara Matahari dan Bulan dan Bulan masuk ke bayangan Bumi. Umbra Bumi jauh lebih panjang dan lebih lebar daripada Bulan, sehingga gerhana bulan bisa dilihat oleh semua orang di sisi malam Bumi dan bisa berlangsung berjam-jam, dengan Bulan berubah menjadi merah tembaga yang redup.',
        'Di simulasi kamu bisa menyeret Bulan dan Bumi dan melihat umbra (kerucut gelap) dan penumbra (kerucut lebih terang) ikut bergerak. Label memberi tahu gerhana apa yang dihasilkan susunan itu: total saat umbra Bulan mencapai Bumi, cincin saat umbra berakhir sebelum Bumi dan hanya kelanjutannya (antumbra) yang tiba, sebagian saat hanya penumbra yang menyentuh Bumi, dan gerhana bulan saat Bulan berada di dalam bayangan Bumi. Simulasi menghitung panjang umbra dari ukuran Matahari dan Bulan: Bulan yang lebih besar membuat umbra lebih panjang. Jika kamu memperkecil Bulan atau menyeretnya lebih jauh dari Bumi, umbranya berakhir sebelum mencapai Bumi, dan itu menghasilkan gerhana cincin, saat cincin tipis Matahari tetap terlihat mengelilingi Bulan. Tombol "Tilt off-axis" menggeser Bulan ke atas atau ke bawah garis; inilah alasan sebenarnya gerhana jarang terjadi. Orbit Bulan miring sekitar 5 derajat, sehingga pada kebanyakan bulan bayangannya lewat di atas atau di bawah Bumi, dan Bulan lewat di atas atau di bawah bayangan Bumi.',
        'Gambar ini tidak sesuai skala. Matahari sungguhan sekitar 400 kali lebih lebar daripada Bulan dan juga sekitar 400 kali lebih jauh, itulah sebabnya keduanya tampak sama besar di langit kita, suatu kebetulan yang membuat gerhana matahari total bisa terjadi. Simulasi menggambar penumbra secara kasar sebagai kerucut lebar, jadi tentukan total, cincin, atau sebagian dari label, bukan dari bayangan yang digambar.',
      ],
    },
    figure: {
      caption: {
        en: 'The Moon\'s umbra (dark) narrows to a point that just reaches Earth, so only a small spot sees a total eclipse, while the wide penumbra (lighter) gives a partial eclipse. Earth\'s much longer shadow stretches to the right; when the Moon passes through it, there is a lunar eclipse. Not to scale.',
        id: 'Umbra Bulan (gelap) menyempit menjadi titik yang hanya pas mencapai Bumi, sehingga hanya daerah kecil yang melihat gerhana total, sedangkan penumbra yang lebar (lebih terang) memberi gerhana sebagian. Bayangan Bumi yang jauh lebih panjang memanjang ke kanan; saat Bulan melewatinya, terjadi gerhana bulan. Tidak sesuai skala.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Umbra and penumbra of the Moon and Earth', 'Umbra dan penumbra Bulan dan Bumi')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.5}.s{font-size:10.5px}</style>
  <line x1="40" y1="84" x2="250" y2="100" class="m" stroke-dasharray="3 3"/>
  <line x1="40" y1="156" x2="250" y2="140" class="m" stroke-dasharray="3 3"/>
  <polygon points="170,108 250,78.5 250,161.5 170,132" fill="currentColor" opacity=".18"/>
  <polygon points="170,108 170,132 235,120" fill="currentColor" opacity=".65"/>
  <polygon points="250,100 360,108.4 360,131.6 250,140" fill="currentColor" opacity=".55"/>
  <polygon points="250,100 360,60 360,180 250,140" fill="currentColor" opacity=".12"/>
  <circle cx="40" cy="120" r="36" fill="#f59e0b"/>
  <circle cx="170" cy="120" r="12" fill="currentColor" opacity=".8"/>
  <circle cx="250" cy="120" r="20" fill="#3b82f6"/>
  <text x="40" y="176" text-anchor="middle" class="s">${L('Sun', 'Matahari')}</text>
  <text x="170" y="92" text-anchor="middle" class="s">${L('Moon', 'Bulan')}</text>
  <text x="250" y="200" text-anchor="middle" class="s">${L('Earth', 'Bumi')}</text>
  <line x1="205" y1="121" x2="190" y2="186" class="m" stroke="#ef4444"/>
  <text x="160" y="200" text-anchor="middle" class="s" fill="#ef4444">${L('umbra: total eclipse', 'umbra: gerhana total')}</text>
  <text x="160" y="212" text-anchor="middle" class="s" fill="#ef4444">${L('(small spot on Earth)', '(daerah kecil di Bumi)')}</text>
  <line x1="215" y1="97" x2="190" y2="50" class="m" stroke="#8b5cf6"/>
  <text x="150" y="40" text-anchor="middle" class="s" fill="#8b5cf6">${L('penumbra: partial eclipse', 'penumbra: gerhana sebagian')}</text>
  <text x="150" y="52" text-anchor="middle" class="s" fill="#8b5cf6">${L('(wide area)', '(daerah luas)')}</text>
  <text x="300" y="98" text-anchor="middle" class="s" fill="#10b981">${L('Earth\'s shadow', 'bayangan Bumi')}</text>
  <text x="302" y="152" text-anchor="middle" class="s" fill="#10b981">${L('Moon here =', 'Bulan di sini =')}</text>
  <text x="302" y="164" text-anchor="middle" class="s" fill="#10b981">${L('lunar eclipse', 'gerhana bulan')}</text>
  <circle cx="320" cy="120" r="7" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 2"/>
  <text x="8" y="232" class="s" opacity=".7">${L('not to scale', 'tidak sesuai skala')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A shadow from a large light source has a dark umbra and a lighter penumbra around it.',
        'Solar eclipse: the Moon\'s shadow falls on Earth. Lunar eclipse: the Moon moves into Earth\'s shadow.',
        'Inside the umbra the eclipse is total; inside the penumbra it is partial.',
        'The Moon\'s umbra is tiny when it reaches Earth, so total solar eclipses are seen only along a narrow path; Earth\'s umbra is huge, so lunar eclipses are seen by half the planet.',
        'Eclipses do not happen every month because the Moon\'s orbit is tilted about 5 degrees, so the shadows usually miss.',
      ],
      id: [
        'Bayangan dari sumber cahaya yang besar memiliki umbra yang gelap dan penumbra yang lebih terang di sekelilingnya.',
        'Gerhana matahari: bayangan Bulan jatuh ke Bumi. Gerhana bulan: Bulan masuk ke bayangan Bumi.',
        'Di dalam umbra gerhananya total; di dalam penumbra gerhananya sebagian.',
        'Umbra Bulan sangat kecil saat mencapai Bumi, sehingga gerhana matahari total hanya terlihat di sepanjang jalur sempit; umbra Bumi sangat besar, sehingga gerhana bulan terlihat oleh separuh planet.',
        'Gerhana tidak terjadi setiap bulan karena orbit Bulan miring sekitar 5 derajat, sehingga bayangannya biasanya meleset.',
      ],
    },
    vocabulary: {
      en: [
        ['Umbra', 'The darkest, central part of a shadow, where the light source is completely blocked.'],
        ['Penumbra', 'The lighter outer part of a shadow, where only part of the light source is blocked.'],
        ['Solar eclipse', 'The Moon passes between the Sun and Earth and casts its shadow on Earth; it can only happen at new moon.'],
        ['Lunar eclipse', 'The Moon passes through Earth\'s shadow; it can only happen at full moon.'],
        ['Total eclipse', 'The Sun (or Moon) is completely covered; for a solar eclipse this is seen only from inside the umbra.'],
        ['Partial eclipse', 'Only part of the Sun or Moon is covered, seen from the penumbra.'],
        ['Annular eclipse', 'A solar eclipse in which the Moon is too far away to cover the whole Sun, leaving a bright ring.'],
      ],
      id: [
        ['Umbra', 'Bagian bayangan yang paling gelap di tengah, tempat sumber cahaya tertutup seluruhnya.'],
        ['Penumbra', 'Bagian luar bayangan yang lebih terang, tempat hanya sebagian sumber cahaya yang tertutup.'],
        ['Gerhana matahari', 'Bulan melintas di antara Matahari dan Bumi dan bayangannya jatuh ke Bumi; hanya bisa terjadi saat bulan baru.'],
        ['Gerhana bulan', 'Bulan melintasi bayangan Bumi; hanya bisa terjadi saat bulan purnama.'],
        ['Gerhana total', 'Matahari (atau Bulan) tertutup seluruhnya; untuk gerhana matahari ini hanya terlihat dari dalam umbra.'],
        ['Gerhana sebagian', 'Hanya sebagian Matahari atau Bulan yang tertutup, terlihat dari penumbra.'],
        ['Gerhana cincin', 'Gerhana matahari saat Bulan terlalu jauh untuk menutupi seluruh Matahari, sehingga tersisa cincin terang.'],
      ],
    },
    misconceptions: {
      en: [
        ['A lunar eclipse is the same thing as a new moon.', 'At new moon the Moon is between us and the Sun and we see its dark side. In a lunar eclipse the Moon is on the opposite side, at full moon, and is darkened by passing through Earth\'s shadow. They are opposite positions.'],
        ['Eclipses are very rare events.', 'There are at least two solar eclipses and usually two lunar eclipses somewhere on Earth every year. What is rare is a total solar eclipse at your own town: on average about once every 375 years.'],
        ['The Moon disappears completely during a total lunar eclipse.', 'It usually turns a dim red instead. Earth\'s atmosphere bends some sunlight into the umbra and filters out the blue, so a little red light still reaches the Moon.'],
        ['Since the Moon orbits every month, there should be an eclipse every month.', 'The Moon\'s orbit is tilted about 5 degrees, so most months the Moon passes above or below the line between the Sun and Earth. Eclipses only happen when the Moon crosses that line at new or full moon.'],
      ],
      id: [
        ['Gerhana bulan sama dengan bulan baru.', 'Saat bulan baru, Bulan berada di antara kita dan Matahari dan kita melihat sisi gelapnya. Saat gerhana bulan, Bulan berada di sisi berlawanan, saat purnama, dan menjadi gelap karena melewati bayangan Bumi. Keduanya posisi yang berlawanan.'],
        ['Gerhana adalah peristiwa yang sangat jarang.', 'Setiap tahun ada paling sedikit dua gerhana matahari dan biasanya dua gerhana bulan di suatu tempat di Bumi. Yang jarang adalah gerhana matahari total di kotamu sendiri: rata-rata sekitar sekali tiap 375 tahun.'],
        ['Bulan menghilang sepenuhnya saat gerhana bulan total.', 'Biasanya Bulan justru berubah merah redup. Atmosfer Bumi membelokkan sebagian sinar matahari ke dalam umbra dan menyaring warna birunya, sehingga sedikit cahaya merah masih mencapai Bulan.'],
        ['Karena Bulan mengorbit setiap bulan, seharusnya ada gerhana setiap bulan.', 'Orbit Bulan miring sekitar 5 derajat, sehingga pada kebanyakan bulan, Bulan lewat di atas atau di bawah garis antara Matahari dan Bumi. Gerhana hanya terjadi ketika Bulan memotong garis itu saat bulan baru atau purnama.'],
      ],
    },
    realWorld: {
      en: [
        'On 9 March 2016 a total solar eclipse crossed Indonesia from Sumatra through Kalimantan and Sulawesi to Maluku; people outside that path saw only a partial eclipse.',
        'Never look directly at the Sun during a solar eclipse: even a thin sliver can damage your eyes. Use certified eclipse glasses or project the image through a pinhole.',
        'During a total solar eclipse the sky darkens enough to see the Sun\'s faint outer atmosphere, the corona, which is otherwise hidden by the Sun\'s glare.',
        'Because the Moon is slowly drifting away from Earth, a few centimetres per year, in about 600 million years its umbra will no longer reach Earth and total solar eclipses will stop.',
      ],
      id: [
        'Pada 9 Maret 2016 gerhana matahari total melintasi Indonesia dari Sumatra melalui Kalimantan dan Sulawesi sampai Maluku; orang di luar jalur itu hanya melihat gerhana sebagian.',
        'Jangan pernah menatap Matahari langsung saat gerhana matahari: bahkan sabit tipis pun dapat merusak mata. Gunakan kacamata gerhana bersertifikat atau proyeksikan bayangannya lewat lubang jarum.',
        'Saat gerhana matahari total, langit cukup gelap untuk melihat atmosfer luar Matahari yang redup, korona, yang biasanya tersembunyi oleh silau Matahari.',
        'Karena Bulan perlahan menjauh dari Bumi, beberapa sentimeter per tahun, sekitar 600 juta tahun lagi umbranya tidak akan lagi mencapai Bumi dan gerhana matahari total akan berhenti.',
      ],
    },
    questions: {
      en: [
        { q: 'Why can a lunar eclipse be seen by everyone on the night side of Earth, while a total solar eclipse is seen only from a narrow strip?', a: 'Because of the size of the umbra. Earth\'s umbra is much wider than the Moon, so the whole Moon fits inside it and anyone who can see the Moon sees the eclipse. The Moon\'s umbra has narrowed almost to a point by the time it reaches Earth, only a few hundred kilometres across, so only people inside that small spot see the Sun fully covered.' },
        { q: 'Use the "Moon size" slider to make the Moon smaller. What happens to the umbra, and what kind of solar eclipse would that produce?', a: 'The umbra becomes shorter, because a smaller object blocks a narrower cone of light. If the umbra ends before it reaches Earth, nobody sees the Sun fully covered; instead the Moon looks slightly smaller than the Sun and a bright ring remains. That is an annular eclipse, which the label reports, and which really happens when the Moon is at the far part of its orbit.' },
        { q: 'A solar eclipse can only happen at new moon and a lunar eclipse only at full moon. Explain why, using the positions of the Sun, Earth and Moon.', a: 'For the Moon\'s shadow to fall on Earth, the Moon must be between the Sun and Earth, which is exactly the position of new moon. For the Moon to enter Earth\'s shadow, Earth must be between the Sun and the Moon, which is the position of full moon. At other phases the Moon is off to the side, so neither shadow can reach the other body.' },
      ],
      id: [
        { q: 'Mengapa gerhana bulan bisa dilihat oleh semua orang di sisi malam Bumi, sedangkan gerhana matahari total hanya terlihat dari jalur sempit?', a: 'Karena ukuran umbranya. Umbra Bumi jauh lebih lebar daripada Bulan, sehingga seluruh Bulan muat di dalamnya dan siapa pun yang bisa melihat Bulan akan melihat gerhananya. Umbra Bulan sudah menyempit hampir menjadi titik saat mencapai Bumi, hanya beberapa ratus kilometer lebarnya, sehingga hanya orang di dalam daerah kecil itu yang melihat Matahari tertutup seluruhnya.' },
        { q: 'Gunakan slider "Moon size" untuk memperkecil Bulan. Apa yang terjadi pada umbra, dan gerhana matahari jenis apa yang akan terjadi?', a: 'Umbra menjadi lebih pendek, karena benda yang lebih kecil menghalangi kerucut cahaya yang lebih sempit. Jika umbra berakhir sebelum mencapai Bumi, tidak ada yang melihat Matahari tertutup seluruhnya; Bulan justru tampak sedikit lebih kecil daripada Matahari dan tersisa cincin terang. Itulah gerhana cincin, yang dilaporkan label, dan yang sungguh terjadi saat Bulan berada di bagian orbitnya yang jauh.' },
        { q: 'Gerhana matahari hanya bisa terjadi saat bulan baru dan gerhana bulan hanya saat purnama. Jelaskan mengapa, dengan posisi Matahari, Bumi, dan Bulan.', a: 'Agar bayangan Bulan jatuh ke Bumi, Bulan harus berada di antara Matahari dan Bumi, dan itu tepat posisi bulan baru. Agar Bulan masuk ke bayangan Bumi, Bumi harus berada di antara Matahari dan Bulan, yaitu posisi bulan purnama. Pada fase lain Bulan berada di samping, sehingga tidak ada bayangan yang bisa mencapai benda lainnya.' },
      ],
    },
  },
};
