// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe the path of blood as a double loop: heart to lungs and back, then heart to body and back.',
      'Explain why blood changes colour: it is bright red when carrying oxygen and darker red when it has given the oxygen away.',
      'Relate heart rate to activity, and explain why the heart beats faster when we run.',
    ],
    id: [
      'Menjelaskan jalur darah sebagai lintasan ganda: jantung ke paru-paru dan kembali, lalu jantung ke tubuh dan kembali.',
      'Menjelaskan mengapa warna darah berubah: merah terang saat membawa oksigen dan merah lebih gelap setelah melepaskan oksigen.',
      'Menghubungkan denyut jantung dengan aktivitas, dan menjelaskan mengapa jantung berdetak lebih cepat saat kita berlari.',
    ],
  },
  tryThis: {
    en: [
      'Watch one cell for a whole trip. Where does it turn bright red? Where does it turn dark again?',
      'Set the heart rate to Rest, count how many laps a cell makes in one minute, then set it to Run and count again.',
      'Tap the lungs, the heart and the body and read the three facts. Which one surprised you?',
      'Feel your own pulse on your wrist, count the beats for 15 seconds and multiply by 4. Set the slider to your number!',
    ],
    id: [
      'Perhatikan satu sel darah selama satu perjalanan penuh. Di mana ia berubah merah terang? Di mana ia menjadi gelap lagi?',
      'Atur denyut jantung ke Istirahat, hitung berapa putaran yang dibuat satu sel dalam satu menit, lalu atur ke Lari dan hitung lagi.',
      'Ketuk paru-paru, jantung, dan tubuh lalu baca tiga faktanya. Mana yang paling mengejutkanmu?',
      'Rasakan denyut nadimu di pergelangan tangan, hitung denyut selama 15 detik lalu kalikan 4. Atur pengatur ke angkamu!',
    ],
  },

  learn: {
    background: {
      en: [
        'Your body is made of billions of tiny cells, and every one of them needs oxygen to stay alive. Blood is the delivery service. The heart is a strong muscle pump about the size of your fist. It pushes blood through tubes called blood vessels. Arteries carry blood away from the heart and veins carry it back.',
        'Blood travels in a double loop. The right side of the heart pumps blood to the lungs. In the lungs the blood picks up oxygen from the air you breathe in and drops off carbon dioxide, which you breathe out. The blood turns bright red and flows back to the left side of the heart. The left side pumps it out to the whole body. Muscles, the brain, the stomach and every other part take oxygen out of the blood and put carbon dioxide in. The blood becomes a darker red and returns to the right side of the heart, ready to go round again.',
        'In this simulation the blood cells are drawn blue when they have little oxygen and red when they are full. Real blood is never blue, only brighter or darker red, but diagrams use blue to make the two halves of the loop easy to see. At rest a whole trip around the body takes about one minute. When you run, your muscles need much more oxygen, so your heart beats faster and the blood goes round in less time. The heart-rate slider speeds up the cells, and the readout shows how long one trip would take in a real body.',
      ],
      id: [
        'Tubuhmu terbuat dari miliaran sel kecil, dan setiap sel membutuhkan oksigen agar tetap hidup. Darah adalah layanan pengantarnya. Jantung adalah pompa otot yang kuat, kira-kira sebesar kepalan tanganmu. Jantung mendorong darah melalui pipa-pipa yang disebut pembuluh darah. Arteri membawa darah menjauh dari jantung dan vena membawanya kembali.',
        'Darah bergerak dalam lintasan ganda. Sisi kanan jantung memompa darah ke paru-paru. Di paru-paru darah mengambil oksigen dari udara yang kamu hirup dan melepaskan karbon dioksida, yang kamu hembuskan. Darah menjadi merah terang dan mengalir kembali ke sisi kiri jantung. Sisi kiri memompanya ke seluruh tubuh. Otot, otak, perut, dan setiap bagian lain mengambil oksigen dari darah dan memasukkan karbon dioksida. Darah menjadi merah lebih gelap dan kembali ke sisi kanan jantung, siap berkeliling lagi.',
        'Dalam simulasi ini sel darah digambar biru saat oksigennya sedikit dan merah saat penuh. Darah sungguhan tidak pernah biru, hanya merah lebih terang atau lebih gelap, tetapi gambar memakai warna biru agar dua bagian lintasan mudah dibedakan. Saat istirahat, satu perjalanan penuh mengelilingi tubuh memakan waktu sekitar satu menit. Saat berlari, ototmu membutuhkan jauh lebih banyak oksigen, sehingga jantung berdetak lebih cepat dan darah berkeliling dalam waktu lebih singkat. Pengatur denyut jantung mempercepat sel-sel darah, dan tampilan angka menunjukkan berapa lama satu perjalanan di tubuh sungguhan.',
      ],
    },
    figure: {
      caption: {
        en: 'The double loop. Dark blood goes from the heart to the lungs, loads oxygen (O₂) and turns bright red, returns to the heart, and is pumped to the body where it unloads oxygen and picks up carbon dioxide (CO₂).',
        id: 'Lintasan ganda. Darah gelap pergi dari jantung ke paru-paru, memuat oksigen (O₂) dan menjadi merah terang, kembali ke jantung, lalu dipompa ke tubuh tempat ia melepaskan oksigen dan mengambil karbon dioksida (CO₂).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Double loop of blood through lungs, heart and body', 'Lintasan ganda darah melalui paru-paru, jantung, dan tubuh')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.t{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.v{fill:none;stroke-width:8;stroke-linecap:round}</style>
  <defs>
    <marker id="ar" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#ef4444"/></marker>
    <marker id="ab" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#3b82f6"/></marker>
  </defs>
  <path d="M196 118 C240 110 240 50 200 46" class="v" stroke="#3b82f6"/>
  <path d="M160 46 C120 50 120 110 164 118" class="v" stroke="#ef4444"/>
  <path d="M164 128 C120 136 120 196 160 200" class="v" stroke="#ef4444"/>
  <path d="M200 200 C240 196 240 136 196 128" class="v" stroke="#3b82f6"/>
  <path d="M222 62 L222 54" stroke="#3b82f6" stroke-width="2" marker-end="url(#ab)"/>
  <path d="M138 100 L138 108" stroke="#ef4444" stroke-width="2" marker-end="url(#ar)"/>
  <path d="M138 150 L138 158" stroke="#ef4444" stroke-width="2" marker-end="url(#ar)"/>
  <path d="M222 190 L222 182" stroke="#3b82f6" stroke-width="2" marker-end="url(#ab)"/>
  <ellipse cx="166" cy="46" rx="18" ry="24" fill="#f9a8d4" stroke="currentColor" stroke-width="1.2"/>
  <ellipse cx="194" cy="46" rx="18" ry="24" fill="#f9a8d4" stroke="currentColor" stroke-width="1.2"/>
  <text x="180" y="20" class="t">${L('lungs', 'paru-paru')}</text>
  <text x="252" y="40">O₂ ${L('in', 'masuk')}</text><text x="252" y="54">CO₂ ${L('out', 'keluar')}</text>
  <path d="M180 142 C160 128 150 108 168 104 C176 102 180 110 180 112 C180 110 184 102 192 104 C210 108 200 128 180 142 z" fill="#dc2626" stroke="currentColor" stroke-width="1.2"/>
  <line x1="180" y1="106" x2="180" y2="140" stroke="#7f1d1d" stroke-width="1.5"/>
  <text x="180" y="156" class="t">${L('heart', 'jantung')}</text>
  <text x="153" y="118" text-anchor="end" style="font-size:9px">${L('left', 'kiri')}</text><text x="207" y="118" style="font-size:9px">${L('right', 'kanan')}</text>
  <rect x="156" y="186" width="48" height="30" rx="8" fill="#a3a3a3" stroke="currentColor" stroke-width="1.2"/>
  <text x="180" y="232" class="t">${L('body: muscles, brain, organs', 'tubuh: otot, otak, organ')}</text>
  <text x="252" y="196">O₂ ${L('out', 'keluar')}</text><text x="252" y="210">CO₂ ${L('in', 'masuk')}</text>
  <circle cx="60" cy="60" r="6" fill="#ef4444"/><text x="72" y="64">${L('full of oxygen', 'penuh oksigen')}</text>
  <circle cx="60" cy="84" r="6" fill="#3b82f6"/><text x="72" y="88">${L('low on oxygen', 'sedikit oksigen')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The heart is a muscle pump. It pushes blood around the body through blood vessels.',
        'Blood travels in a double loop: heart to lungs and back, then heart to body and back.',
        'In the lungs blood picks up oxygen and drops off carbon dioxide.',
        'In the body, muscles and organs take the oxygen and give back carbon dioxide.',
        'Arteries carry blood away from the heart; veins carry it back.',
        'When you exercise your muscles need more oxygen, so your heart beats faster and blood goes round quicker.',
      ],
      id: [
        'Jantung adalah pompa otot. Jantung mendorong darah mengelilingi tubuh melalui pembuluh darah.',
        'Darah bergerak dalam lintasan ganda: jantung ke paru-paru dan kembali, lalu jantung ke tubuh dan kembali.',
        'Di paru-paru darah mengambil oksigen dan melepaskan karbon dioksida.',
        'Di tubuh, otot dan organ mengambil oksigen dan mengembalikan karbon dioksida.',
        'Arteri membawa darah menjauh dari jantung; vena membawanya kembali.',
        'Saat berolahraga ototmu membutuhkan lebih banyak oksigen, sehingga jantung berdetak lebih cepat dan darah berkeliling lebih cepat.',
      ],
    },
    vocabulary: {
      en: [
        ['Heart', 'A muscle pump in your chest that pushes blood around the body.'],
        ['Blood vessel', 'A tube that blood flows through. Arteries, veins and tiny capillaries are all blood vessels.'],
        ['Artery', 'A blood vessel that carries blood away from the heart.'],
        ['Vein', 'A blood vessel that carries blood back to the heart.'],
        ['Oxygen', 'A gas in the air that every cell needs. Blood carries it from the lungs to the body.'],
        ['Carbon dioxide', 'A waste gas made by cells. Blood carries it to the lungs so you can breathe it out.'],
        ['Heart rate', 'How many times the heart beats in one minute, measured in beats per minute (bpm).'],
      ],
      id: [
        ['Jantung', 'Pompa otot di dadamu yang mendorong darah mengelilingi tubuh.'],
        ['Pembuluh darah', 'Pipa tempat darah mengalir. Arteri, vena, dan pembuluh kapiler yang sangat kecil semuanya pembuluh darah.'],
        ['Arteri', 'Pembuluh darah yang membawa darah menjauh dari jantung.'],
        ['Vena', 'Pembuluh darah yang membawa darah kembali ke jantung.'],
        ['Oksigen', 'Gas di udara yang dibutuhkan setiap sel. Darah membawanya dari paru-paru ke tubuh.'],
        ['Karbon dioksida', 'Gas sisa yang dibuat oleh sel. Darah membawanya ke paru-paru agar bisa dihembuskan keluar.'],
        ['Denyut jantung', 'Berapa kali jantung berdetak dalam satu menit, diukur dalam denyut per menit (bpm).'],
      ],
    },
    misconceptions: {
      en: [
        ['Blood with little oxygen is blue.', 'Real blood is always red: bright red with oxygen and dark red without. Veins look bluish through the skin only because of how light passes through skin. Diagrams use blue just to tell the two halves of the loop apart.'],
        ['The heart is on the left side of the chest.', 'The heart sits in the middle of the chest, tilted a little to the left. You feel it on the left because the strong left pump is there.'],
        ['Blood goes round once and is used up.', 'The same blood goes round and round, thousands of times a day. It is reloaded with oxygen on every trip through the lungs.'],
        ['The heart only pumps blood to the body.', 'The heart is really two pumps side by side. The right side pumps to the lungs and the left side pumps to the body.'],
      ],
      id: [
        ['Darah yang sedikit oksigennya berwarna biru.', 'Darah sungguhan selalu merah: merah terang dengan oksigen dan merah gelap tanpa oksigen. Vena terlihat kebiruan di bawah kulit hanya karena cara cahaya melewati kulit. Gambar memakai biru hanya untuk membedakan dua bagian lintasan.'],
        ['Jantung ada di sisi kiri dada.', 'Jantung berada di tengah dada, sedikit miring ke kiri. Kamu merasakannya di kiri karena pompa kiri yang kuat ada di sana.'],
        ['Darah berkeliling sekali lalu habis.', 'Darah yang sama berkeliling terus, ribuan kali sehari. Darah diisi ulang dengan oksigen setiap kali melewati paru-paru.'],
        ['Jantung hanya memompa darah ke tubuh.', 'Jantung sebenarnya dua pompa yang berdampingan. Sisi kanan memompa ke paru-paru dan sisi kiri memompa ke tubuh.'],
      ],
    },
    realWorld: {
      en: [
        'A doctor or nurse counts your pulse at the wrist: that is your heart rate, usually 70 to 100 beats per minute for a child at rest.',
        'Athletes have strong hearts that pump more blood with each beat, so their resting heart rate can be as low as 50.',
        'When you run, your face goes red because more blood is sent to the skin to carry heat away.',
        'Blood donors give about 450 mL of blood; the body makes it back within a few weeks.',
        'A stethoscope lets a doctor hear the "lub-dub" of the heart valves closing with each beat.',
      ],
      id: [
        'Dokter atau perawat menghitung denyut nadimu di pergelangan tangan: itulah denyut jantungmu, biasanya 70 sampai 100 denyut per menit untuk anak yang sedang istirahat.',
        'Atlet mempunyai jantung yang kuat dan memompa lebih banyak darah setiap denyut, sehingga denyut istirahatnya bisa serendah 50.',
        'Saat berlari wajahmu memerah karena lebih banyak darah dikirim ke kulit untuk membuang panas.',
        'Pendonor darah memberikan sekitar 450 mL darah; tubuh membuatnya kembali dalam beberapa minggu.',
        'Stetoskop membuat dokter bisa mendengar bunyi "lub-dub" katup jantung yang menutup di setiap denyut.',
      ],
    },
    questions: {
      en: [
        { q: 'A blood cell has just left the lungs. What colour is it in the sim, and where does it go next?', a: 'It is bright red because it is full of oxygen. It goes back to the heart (the left side), which pumps it out to the body.' },
        { q: 'Why does the blood turn dark when it passes through the body?', a: 'Muscles and organs take the oxygen out of the blood to make energy, and put carbon dioxide in. Blood with little oxygen is darker.' },
        { q: 'You move the slider from Rest (70 bpm) to Run (150 bpm). What happens to the number of laps per minute, and why does the body need this?', a: 'Laps per minute roughly double, because the heart pumps more often. Running muscles use oxygen much faster, so blood must bring fresh oxygen more often.' },
      ],
      id: [
        { q: 'Sebuah sel darah baru saja meninggalkan paru-paru. Apa warnanya di simulasi, dan ke mana ia pergi berikutnya?', a: 'Merah terang karena penuh oksigen. Ia kembali ke jantung (sisi kiri), yang memompanya ke seluruh tubuh.' },
        { q: 'Mengapa darah menjadi gelap saat melewati tubuh?', a: 'Otot dan organ mengambil oksigen dari darah untuk menghasilkan energi, dan memasukkan karbon dioksida. Darah yang sedikit oksigennya lebih gelap.' },
        { q: 'Kamu menggeser pengatur dari Istirahat (70 bpm) ke Lari (150 bpm). Apa yang terjadi pada jumlah putaran per menit, dan mengapa tubuh membutuhkannya?', a: 'Putaran per menit kira-kira menjadi dua kali lipat, karena jantung memompa lebih sering. Otot yang berlari memakai oksigen jauh lebih cepat, jadi darah harus membawa oksigen baru lebih sering.' },
      ],
    },
  },
};
