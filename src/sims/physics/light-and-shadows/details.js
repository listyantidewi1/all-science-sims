// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain that a shadow forms where an object blocks light travelling in straight lines.',
      'Predict how a shadow changes size and position when the light source moves.',
      'Sort materials into opaque, translucent and transparent by the shadow they make.',
    ],
    id: [
      'Menjelaskan bahwa bayangan terbentuk ketika benda menghalangi cahaya yang merambat lurus.',
      'Memprediksi perubahan ukuran dan posisi bayangan ketika sumber cahaya dipindahkan.',
      'Mengelompokkan bahan menjadi tidak tembus cahaya, tembus sebagian, dan tembus pandang berdasarkan bayangannya.',
    ],
  },
  tryThis: {
    en: [
      'Before dragging, ask: "If I bring the torch closer, will the shadow get bigger or smaller?" Then test it.',
      'Move the torch up high. Which way does the shadow move? Turn on the light rays to see why.',
      'Make the shadow exactly 4 grid squares tall. How far away did you need to put the torch?',
    ],
    id: [
      'Sebelum menggeser, tanyakan: "Jika senter didekatkan, bayangannya membesar atau mengecil?" Lalu uji.',
      'Naikkan senter tinggi-tinggi. Ke arah mana bayangan bergerak? Nyalakan garis cahaya untuk melihat alasannya.',
      'Buat bayangan tepat setinggi 4 kotak. Seberapa jauh senter harus ditempatkan?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Light comes out of a torch and travels in straight lines. It cannot bend around a toy. Where the toy blocks the light, the wall behind it stays dark. That dark shape is the shadow. A shadow is not a thing. It is just a place the light could not reach.',
        'In this sim you can drag the torch anywhere. When the torch is close to the toy, the toy blocks a bigger part of the light, so the shadow on the wall is big. When the torch is far away, the shadow is smaller. Move the torch up and the shadow slides down, because light from above the toy passes it and lands lower on the wall. Turn on the light rays to see the straight lines from the torch to the edge of the shadow.',
        'The toy can be made of different materials. A solid toy stops the light and makes a dark shadow. A frosted toy lets some light through, so its shadow is faint. Clear glass lets almost all the light through, so there is no shadow at all. The torch in the sim is a tiny point of light, so the shadow has sharp edges. A real torch is wider, so real shadows have soft, fuzzy edges.',
      ],
      id: [
        'Cahaya keluar dari senter dan merambat lurus. Cahaya tidak bisa berbelok mengelilingi mainan. Di tempat mainan menghalangi cahaya, dinding di belakangnya tetap gelap. Bentuk gelap itulah bayangan. Bayangan bukan sebuah benda. Bayangan hanyalah tempat yang tidak bisa dicapai cahaya.',
        'Di simulasi ini kamu bisa menggeser senter ke mana saja. Ketika senter dekat dengan mainan, mainan menghalangi bagian cahaya yang lebih besar, jadi bayangan di dinding menjadi besar. Ketika senter jauh, bayangannya lebih kecil. Naikkan senter, bayangan turun, karena cahaya dari atas mainan melewatinya dan jatuh lebih rendah di dinding. Nyalakan garis cahaya untuk melihat garis lurus dari senter ke tepi bayangan.',
        'Mainannya bisa dibuat dari bahan yang berbeda. Mainan padat menghentikan cahaya dan membuat bayangan gelap. Mainan buram meloloskan sebagian cahaya, jadi bayangannya samar. Kaca bening meloloskan hampir semua cahaya, jadi tidak ada bayangan sama sekali. Senter di simulasi ini adalah titik cahaya yang sangat kecil, sehingga tepi bayangannya tajam. Senter sungguhan lebih lebar, sehingga tepi bayangan sungguhan lembut dan kabur.',
      ],
    },
    figure: {
      caption: {
        en: 'Light travels in straight lines from the torch. The toy blocks some of it, and the dark patch on the wall behind is the shadow. The two rays that just miss the toy mark the edges of the shadow.',
        id: 'Cahaya merambat lurus dari senter. Mainan menghalangi sebagian cahaya, dan bagian gelap di dinding belakangnya adalah bayangan. Dua sinar yang hampir menyentuh mainan menandai tepi bayangan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A torch, a toy and its shadow on a wall', 'Senter, mainan dan bayangannya di dinding')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1.3}.r{stroke:#f59e0b;stroke-width:2;fill:none}</style>
  <rect x="300" y="30" width="30" height="180" fill="currentColor" opacity=".12"/>
  <path d="M300 60 L330 60 M300 90 L330 90 M300 120 L330 120 M300 150 L330 150 M300 180 L330 180 M315 30 L315 210" class="m" opacity=".25"/>
  <line x1="20" y1="210" x2="340" y2="210" class="m" opacity=".6"/>
  <path d="M40 120 L300 72.7 L300 167.3 Z" fill="#f59e0b" opacity=".12"/>
  <line x1="40" y1="120" x2="300" y2="72.7" class="r"/>
  <line x1="40" y1="120" x2="300" y2="167.3" class="r"/>
  <line x1="40" y1="120" x2="300" y2="120" class="r" stroke-dasharray="5 4" opacity=".5"/>
  <rect x="300" y="72.7" width="30" height="94.6" fill="currentColor" opacity=".5"/>
  <rect x="10" y="110" width="30" height="20" rx="4" fill="currentColor" opacity=".7"/>
  <circle cx="40" cy="120" r="7" fill="#f59e0b"/>
  <line x1="150" y1="140" x2="150" y2="210" class="m" stroke-width="4" opacity=".6"/>
  <circle cx="150" cy="120" r="20" fill="#ef4444"/>
  <circle cx="150" cy="120" r="20" class="m"/>
  <text x="8" y="100" class="s">${L('torch', 'senter')}</text>
  <text x="128" y="162" class="s">${L('toy', 'mainan')}</text>
  <text x="290" y="226" class="s">${L('wall', 'dinding')}</text>
  <text x="258" y="62" class="s">${L('shadow', 'bayangan')}</text>
  <text x="120" y="52" class="s" fill="#f59e0b">${L('light goes in straight lines', 'cahaya merambat lurus')}</text>
  <text x="170" y="196" class="s">${L('closer torch = bigger shadow', 'senter lebih dekat = bayangan lebih besar')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Light travels in straight lines and cannot bend around things.',
        'A shadow is the dark place behind an object where light could not reach.',
        'A light close to an object makes a big shadow; a light far away makes a small shadow.',
        'When the light moves up, the shadow moves down; the shadow always lands on the far side of the object from the light.',
        'Solid things make dark shadows, frosted things make faint shadows, and clear things make almost no shadow.',
      ],
      id: [
        'Cahaya merambat lurus dan tidak bisa berbelok mengelilingi benda.',
        'Bayangan adalah tempat gelap di belakang benda yang tidak bisa dicapai cahaya.',
        'Lampu yang dekat dengan benda membuat bayangan besar; lampu yang jauh membuat bayangan kecil.',
        'Ketika lampu naik, bayangan turun; bayangan selalu jatuh di sisi benda yang berlawanan dengan lampu.',
        'Benda padat membuat bayangan gelap, benda buram membuat bayangan samar, dan benda bening hampir tidak membuat bayangan.',
      ],
    },
    vocabulary: {
      en: [
        ['Light source', 'Something that gives out light, like a torch, a lamp or the Sun.'],
        ['Shadow', 'The dark shape behind an object where the light cannot reach.'],
        ['Opaque', 'Does not let light through. A solid toy or a book is opaque.'],
        ['Translucent', 'Lets some light through, but you cannot see clearly through it, like frosted glass.'],
        ['Transparent', 'Lets almost all the light through, so you can see through it, like clear glass.'],
      ],
      id: [
        ['Sumber cahaya', 'Sesuatu yang memancarkan cahaya, seperti senter, lampu atau Matahari.'],
        ['Bayangan', 'Bentuk gelap di belakang benda yang tidak bisa dicapai cahaya.'],
        ['Tidak tembus cahaya', 'Tidak meloloskan cahaya. Mainan padat atau buku tidak tembus cahaya.'],
        ['Tembus sebagian (buram)', 'Meloloskan sebagian cahaya, tetapi kamu tidak bisa melihat dengan jelas melaluinya, seperti kaca buram.'],
        ['Tembus pandang (bening)', 'Meloloskan hampir semua cahaya, sehingga kamu bisa melihat melaluinya, seperti kaca bening.'],
      ],
    },
    misconceptions: {
      en: [
        ['A shadow is something dark that comes out of the object.', 'A shadow is not made of anything. It is just the place where the object stopped the light from reaching the wall.'],
        ['A shadow is always the same size as the object.', 'The shadow can be much bigger than the object when the light is close. Try dragging the torch right up to the toy.'],
        ['Shadows are always on the ground, under things.', 'A shadow forms on the far side of the object from the light. If the torch is low, the shadow can be high up on a wall.'],
        ['Glass does not make a shadow because it is hard, not because of light.', 'Glass makes almost no shadow because light passes straight through it. A hard brick makes a dark shadow because light cannot pass through.'],
      ],
      id: [
        ['Bayangan adalah sesuatu yang gelap yang keluar dari benda.', 'Bayangan tidak terbuat dari apa pun. Bayangan hanyalah tempat yang cahayanya dihentikan oleh benda sehingga tidak sampai ke dinding.'],
        ['Bayangan selalu sama besar dengan bendanya.', 'Bayangan bisa jauh lebih besar daripada bendanya kalau lampunya dekat. Coba geser senter sampai sangat dekat dengan mainan.'],
        ['Bayangan selalu ada di tanah, di bawah benda.', 'Bayangan terbentuk di sisi benda yang berlawanan dengan lampu. Kalau senternya rendah, bayangan bisa berada tinggi di dinding.'],
        ['Kaca tidak membuat bayangan karena keras, bukan karena cahaya.', 'Kaca hampir tidak membuat bayangan karena cahaya lewat begitu saja menembusnya. Bata yang keras membuat bayangan gelap karena cahaya tidak bisa menembusnya.'],
      ],
    },
    realWorld: {
      en: [
        'Your shadow is long in the early morning and late afternoon, when the Sun is low, and short at midday, when the Sun is high.',
        'Shadow puppets are made by holding cut-out shapes between a lamp and a cloth screen; moving them closer to the lamp makes them grow.',
        'A sundial tells the time from the shadow of a stick, because the shadow moves as the Sun moves across the sky.',
        'Frosted bathroom windows let daylight in but stop people seeing through, because they are translucent.',
      ],
      id: [
        'Bayanganmu panjang di pagi hari dan sore hari, ketika Matahari rendah, dan pendek di tengah hari, ketika Matahari tinggi.',
        'Wayang kulit dimainkan dengan memegang bentuk pipih di antara lampu dan layar kain; mendekatkannya ke lampu membuat bayangannya membesar.',
        'Jam matahari menunjukkan waktu dari bayangan sebuah tongkat, karena bayangan bergerak mengikuti Matahari yang berpindah di langit.',
        'Jendela kamar mandi dari kaca buram meloloskan cahaya siang tetapi orang tidak bisa melihat tembus, karena kacanya tembus sebagian.',
      ],
    },
    questions: {
      en: [
        { q: 'You drag the torch closer to the teddy. What happens to the shadow on the wall, and why?', a: 'The shadow gets bigger. When the torch is close, the teddy blocks a wider spread of the light, so the dark patch on the wall grows. Turn on the rays and you can see them open out more widely.' },
        { q: 'You move the torch up, above the teddy. Which way does the shadow move?', a: 'Down. Light goes in straight lines, so light coming from above the teddy passes it and lands lower on the wall. The shadow is always on the opposite side from the torch.' },
        { q: 'Change the teddy to frosted, then to clear glass. What do you see, and what does it tell you about these materials?', a: 'The frosted teddy makes a faint, grey shadow because some light gets through it. The clear glass teddy makes no shadow because almost all the light passes through. Solid things block light, frosted things block some of it, and clear things block almost none.' },
      ],
      id: [
        { q: 'Kamu menggeser senter lebih dekat ke boneka beruang. Apa yang terjadi pada bayangan di dinding, dan mengapa?', a: 'Bayangannya membesar. Ketika senter dekat, boneka menghalangi sebaran cahaya yang lebih lebar, jadi bagian gelap di dinding bertambah besar. Nyalakan garis cahaya dan kamu bisa melihat garisnya melebar.' },
        { q: 'Kamu menaikkan senter ke atas boneka. Ke arah mana bayangan bergerak?', a: 'Ke bawah. Cahaya merambat lurus, jadi cahaya yang datang dari atas boneka melewatinya dan jatuh lebih rendah di dinding. Bayangan selalu berada di sisi yang berlawanan dengan senter.' },
        { q: 'Ganti boneka menjadi buram, lalu menjadi kaca bening. Apa yang kamu lihat, dan apa artinya tentang bahan-bahan ini?', a: 'Boneka buram membuat bayangan samar keabu-abuan karena sebagian cahaya tembus. Boneka kaca bening tidak membuat bayangan karena hampir semua cahaya lewat. Benda padat menghalangi cahaya, benda buram menghalangi sebagian, dan benda bening hampir tidak menghalangi sama sekali.' },
      ],
    },
  },
};
