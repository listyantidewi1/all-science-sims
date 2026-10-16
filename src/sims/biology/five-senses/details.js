// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Name the five senses and the body part that does each one: eyes see, ears hear, nose smells, tongue tastes, skin feels.',
      'Match everyday things (a flash, a bell, a flower, a lemon, a feather) to the sense organ that notices them.',
      'Point to the main parts of each sense organ, such as the pupil of the eye and the eardrum of the ear.',
    ],
    id: [
      'Menyebutkan lima indra dan bagian tubuh yang bekerja untuk tiap indra: mata melihat, telinga mendengar, hidung mencium, lidah mengecap, kulit meraba.',
      'Memasangkan benda sehari-hari (kilatan cahaya, bel, bunga, lemon, bulu) dengan alat indra yang merasakannya.',
      'Menunjuk bagian utama setiap alat indra, seperti pupil pada mata dan gendang telinga pada telinga.',
    ],
  },
  tryThis: {
    en: [
      'Play the game until you get 10 in a row. Which stimulus was the trickiest?',
      'Switch to Explore mode and tap the ear. Find the eardrum. What do you think happens to it when a drum bangs?',
      'In Explore mode tap the eye. Close your own eyes for ten seconds in a bright room, then open them: your pupil was big and now it shrinks!',
      'Think of something that uses two senses at once, like eating a crispy cracker. Which two organs are working?',
    ],
    id: [
      'Mainkan permainannya sampai kamu benar 10 kali berturut-turut. Rangsangan mana yang paling sulit?',
      'Pindah ke mode Jelajah dan ketuk telinga. Temukan gendang telinga. Menurutmu apa yang terjadi padanya saat gendang dipukul?',
      'Di mode Jelajah ketuk mata. Tutup matamu sendiri sepuluh detik di ruangan terang, lalu buka: pupilmu tadi besar dan sekarang mengecil!',
      'Pikirkan sesuatu yang memakai dua indra sekaligus, seperti makan kerupuk yang renyah. Dua alat indra mana yang bekerja?',
    ],
  },

  learn: {
    background: {
      en: [
        'Your body finds out about the world with five senses. Each sense has its own organ. Your eyes see light and colour. Your ears hear sounds. Your nose smells the tiny bits of things that float in the air. Your tongue tastes food: sweet, salty, sour, bitter and savoury. Your skin feels touch, pressure, heat and cold. Every sense organ sends messages along nerves to your brain, and your brain works out what is happening.',
        'In the game, something happens in the picture. A light flashes, a bell rings, a flower gives off a smell, a lemon tastes sour, or a feather brushes past. You tap the organ that would notice it. Some things can be noticed by more than one sense. You can see a bell and hear it. The game asks about the main sense for each thing, and it gives you a hint if you pick a different one.',
        'Explore mode looks inside each organ. The eye has a black hole called the pupil that lets light in, a lens that focuses the light, and a retina at the back that turns light into nerve messages. The ear has an outer ear that catches sound, a thin eardrum that shakes when sound hits it, and a snail-shaped part called the cochlea that turns the shaking into messages. The nose has smell cells high inside it. The tongue is covered in tiny bumps that hold taste buds. The skin has nerve endings for touch, heat and cold, and sweat glands and hairs too.',
      ],
      id: [
        'Tubuhmu mengenali dunia dengan lima indra. Setiap indra punya alat indranya sendiri. Matamu melihat cahaya dan warna. Telingamu mendengar bunyi. Hidungmu mencium bagian-bagian kecil benda yang melayang di udara. Lidahmu mengecap rasa makanan: manis, asin, asam, pahit, dan gurih. Kulitmu merasakan sentuhan, tekanan, panas, dan dingin. Setiap alat indra mengirim pesan lewat saraf ke otak, dan otak memahami apa yang sedang terjadi.',
        'Dalam permainan, sesuatu terjadi di gambar. Lampu menyala, bel berbunyi, bunga mengeluarkan bau harum, lemon terasa asam, atau bulu menyentuh kulit. Kamu mengetuk alat indra yang akan merasakannya. Beberapa hal bisa dirasakan lebih dari satu indra. Bel bisa dilihat dan juga didengar. Permainan ini menanyakan indra utama untuk tiap benda, dan memberi petunjuk jika kamu memilih indra lain.',
        'Mode Jelajah melihat bagian dalam setiap alat indra. Mata punya lubang hitam bernama pupil yang memasukkan cahaya, lensa yang memfokuskan cahaya, dan retina di bagian belakang yang mengubah cahaya menjadi pesan saraf. Telinga punya daun telinga yang menangkap bunyi, gendang telinga tipis yang bergetar saat bunyi mengenainya, dan bagian berbentuk rumah siput bernama koklea yang mengubah getaran menjadi pesan. Hidung punya sel pembau jauh di dalamnya. Lidah ditutupi tonjolan kecil yang berisi kuncup pengecap. Kulit punya ujung saraf untuk sentuhan, panas, dan dingin, juga kelenjar keringat dan rambut.',
      ],
    },
    figure: {
      caption: {
        en: 'The five sense organs and what each one notices. Every organ sends messages along nerves to the brain.',
        id: 'Lima alat indra dan apa yang dirasakan oleh masing-masing. Setiap alat indra mengirim pesan lewat saraf ke otak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Five sense organs connected to the brain', 'Lima alat indra terhubung ke otak')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.t{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.s{font:10px system-ui,sans-serif;fill:currentColor;text-anchor:middle;opacity:.8}.n{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5;stroke-dasharray:3 3}</style>
  <ellipse cx="180" cy="40" rx="46" ry="26" fill="#f9a8d4" stroke="currentColor" stroke-width="1.3"/>
  <path d="M150 40 q10 -14 30 -4 q12 -12 28 2" fill="none" stroke="#be185d" stroke-width="1.5"/>
  <text x="180" y="78" class="t">${L('brain', 'otak')}</text>
  <path d="M40 150 L160 58" class="n"/><path d="M110 150 L172 66" class="n"/><path d="M180 150 L180 66" class="n"/><path d="M250 150 L188 66" class="n"/><path d="M320 150 L200 58" class="n"/>
  <ellipse cx="40" cy="165" rx="24" ry="14" fill="#fff" stroke="currentColor" stroke-width="1.3"/>
  <circle cx="40" cy="165" r="9" fill="#3b82f6"/><circle cx="40" cy="165" r="4" fill="#111"/>
  <text x="40" y="200" class="t">${L('eye', 'mata')}</text><text x="40" y="214" class="s">${L('sees light', 'melihat cahaya')}</text>
  <path d="M100 150 q-14 10 -8 26 q6 12 18 10 q10 -4 8 -12 q-4 -8 -10 -4" fill="#fcd9b6" stroke="currentColor" stroke-width="1.3"/>
  <text x="110" y="200" class="t">${L('ear', 'telinga')}</text><text x="110" y="214" class="s">${L('hears sound', 'mendengar bunyi')}</text>
  <path d="M174 148 L166 176 q6 8 14 8 q8 0 14 -8 L186 148 z" fill="#fcd9b6" stroke="currentColor" stroke-width="1.3"/>
  <circle cx="173" cy="180" r="2.5" fill="#111"/><circle cx="187" cy="180" r="2.5" fill="#111"/>
  <text x="180" y="200" class="t">${L('nose', 'hidung')}</text><text x="180" y="214" class="s">${L('smells', 'mencium bau')}</text>
  <path d="M232 152 q18 -10 36 0 q4 20 -18 34 q-22 -14 -18 -34 z" fill="#f87171" stroke="currentColor" stroke-width="1.3"/>
  <line x1="250" y1="158" x2="250" y2="182" stroke="#b91c1c" stroke-width="1.2"/>
  <text x="250" y="200" class="t">${L('tongue', 'lidah')}</text><text x="250" y="214" class="s">${L('tastes', 'mengecap rasa')}</text>
  <path d="M304 186 L304 160 q0 -8 6 -8 q6 0 6 8 L316 150 q0 -6 5 -6 q5 0 5 6 L326 158 q4 -4 8 0 L334 186 z" fill="#fcd9b6" stroke="currentColor" stroke-width="1.3"/>
  <text x="320" y="200" class="t">${L('skin', 'kulit')}</text><text x="320" y="214" class="s">${L('feels touch', 'merasakan sentuhan')}</text>
  <text x="180" y="232" class="s">${L('nerves carry messages to the brain', 'saraf membawa pesan ke otak')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'We have five senses: sight, hearing, smell, taste and touch.',
        'Each sense has its own organ: eye, ear, nose, tongue and skin.',
        'Light goes into the eye through the pupil. Sound makes the eardrum shake.',
        'Sense organs send messages along nerves to the brain, and the brain tells us what we sense.',
        'Some things are noticed by more than one sense, such as food that we see, smell and taste.',
      ],
      id: [
        'Kita punya lima indra: penglihatan, pendengaran, penciuman, pengecapan, dan perabaan.',
        'Setiap indra punya alat indranya sendiri: mata, telinga, hidung, lidah, dan kulit.',
        'Cahaya masuk ke mata melalui pupil. Bunyi membuat gendang telinga bergetar.',
        'Alat indra mengirim pesan lewat saraf ke otak, dan otak memberi tahu apa yang kita rasakan.',
        'Beberapa hal dirasakan oleh lebih dari satu indra, misalnya makanan yang kita lihat, cium, dan kecap.',
      ],
    },
    vocabulary: {
      en: [
        ['Sense', 'A way the body notices the world: seeing, hearing, smelling, tasting or touching.'],
        ['Sense organ', 'The body part that does a sense, such as the eye or the ear.'],
        ['Pupil', 'The black hole in the middle of the eye that lets light in. It gets bigger in the dark.'],
        ['Eardrum', 'A thin skin inside the ear that shakes when sound reaches it.'],
        ['Taste bud', 'A tiny part of the tongue that notices sweet, salty, sour, bitter or savoury.'],
        ['Nerve', 'A thin thread in the body that carries messages to the brain.'],
      ],
      id: [
        ['Indra', 'Cara tubuh mengenali dunia: melihat, mendengar, mencium, mengecap, atau meraba.'],
        ['Alat indra', 'Bagian tubuh yang menjalankan suatu indra, seperti mata atau telinga.'],
        ['Pupil', 'Lubang hitam di tengah mata yang memasukkan cahaya. Pupil membesar di tempat gelap.'],
        ['Gendang telinga', 'Selaput tipis di dalam telinga yang bergetar saat bunyi mencapainya.'],
        ['Kuncup pengecap', 'Bagian kecil pada lidah yang merasakan manis, asin, asam, pahit, atau gurih.'],
        ['Saraf', 'Benang tipis di dalam tubuh yang membawa pesan ke otak.'],
      ],
    },
    misconceptions: {
      en: [
        ['We taste only with the tongue.', 'Most of what we call flavour is smell. When your nose is blocked by a cold, food tastes dull because the nose cannot help.'],
        ['The ear is just the part you can see on the side of your head.', 'The outer ear only catches sound. The eardrum and the cochlea, which do the real hearing, are hidden inside the head.'],
        ['Skin only feels touch.', 'Skin also feels heat, cold, pressure and pain. Different nerve endings in the skin do different jobs.'],
        ['The eye sees by itself.', 'The eye only collects light. The brain makes the picture. That is why a knock on the head can make you "see stars".'],
      ],
      id: [
        ['Kita mengecap rasa hanya dengan lidah.', 'Sebagian besar yang kita sebut rasa sebenarnya adalah bau. Saat hidung tersumbat karena pilek, makanan terasa hambar karena hidung tidak bisa membantu.'],
        ['Telinga hanyalah bagian yang terlihat di samping kepala.', 'Daun telinga hanya menangkap bunyi. Gendang telinga dan koklea, yang benar-benar mendengar, tersembunyi di dalam kepala.'],
        ['Kulit hanya merasakan sentuhan.', 'Kulit juga merasakan panas, dingin, tekanan, dan sakit. Ujung saraf yang berbeda di kulit punya tugas yang berbeda.'],
        ['Mata melihat dengan sendirinya.', 'Mata hanya mengumpulkan cahaya. Otaklah yang membuat gambarnya. Itulah sebabnya benturan di kepala bisa membuat kita "melihat bintang".'],
      ],
    },
    realWorld: {
      en: [
        'A doctor shines a small light into your eye to watch your pupil get smaller. That shows the eye and brain are working well.',
        'Loud music through earphones can damage the tiny hairs in the cochlea, so keep the volume low.',
        'Smell warns us of danger: burning food, a gas leak or spoiled milk.',
        'People who cannot see use touch to read braille, bumps on paper felt with the fingertips.',
        'Fever is measured with a thermometer because skin alone cannot tell exact temperature.',
      ],
      id: [
        'Dokter menyorotkan lampu kecil ke matamu untuk melihat pupilmu mengecil. Itu menunjukkan mata dan otak bekerja dengan baik.',
        'Musik keras lewat earphone bisa merusak rambut-rambut halus di koklea, jadi jaga volumenya rendah.',
        'Penciuman memperingatkan bahaya: makanan gosong, kebocoran gas, atau susu basi.',
        'Orang yang tidak bisa melihat memakai perabaan untuk membaca huruf braille, titik-titik timbul di kertas yang diraba ujung jari.',
        'Demam diukur dengan termometer karena kulit saja tidak bisa menyebutkan suhu yang tepat.',
      ],
    },
    questions: {
      en: [
        { q: 'A bell rings in the picture. Which organ do you tap, and why?', a: 'The ear. Sound travels through the air, goes into the ear and makes the eardrum shake. The eye can see the bell, but it cannot hear it ring.' },
        { q: 'You bite a lemon. Which sense organ notices that it is sour?', a: 'The tongue. Taste buds on the tongue notice sour, sweet, salty, bitter and savoury.' },
        { q: 'In Explore mode, what does the pupil do, and why does it change size?', a: 'The pupil lets light into the eye. In the dark it grows big to let in more light; in bright light it shrinks to protect the eye.' },
      ],
      id: [
        { q: 'Bel berbunyi di gambar. Alat indra mana yang kamu ketuk, dan mengapa?', a: 'Telinga. Bunyi merambat lewat udara, masuk ke telinga, dan membuat gendang telinga bergetar. Mata bisa melihat bel, tetapi tidak bisa mendengar bunyinya.' },
        { q: 'Kamu menggigit lemon. Alat indra mana yang merasakan asamnya?', a: 'Lidah. Kuncup pengecap di lidah merasakan asam, manis, asin, pahit, dan gurih.' },
        { q: 'Di mode Jelajah, apa tugas pupil, dan mengapa ukurannya berubah?', a: 'Pupil memasukkan cahaya ke mata. Di tempat gelap pupil membesar agar lebih banyak cahaya masuk; di tempat terang pupil mengecil untuk melindungi mata.' },
      ],
    },
  },
};
