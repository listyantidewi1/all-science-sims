// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain that sound is made when something vibrates (wobbles back and forth).',
      'Link a bigger vibration to a louder sound and a faster vibration to a higher sound.',
      'Describe how tightening or shortening a string changes its pitch.',
    ],
    id: [
      'Menjelaskan bahwa bunyi dihasilkan ketika suatu benda bergetar (bergoyang maju-mundur).',
      'Menghubungkan getaran yang lebih besar dengan bunyi lebih nyaring dan getaran lebih cepat dengan bunyi lebih tinggi.',
      'Menjelaskan bagaimana mengencangkan atau memendekkan senar mengubah tinggi nadanya.',
    ],
  },
  tryThis: {
    en: [
      'Ask: "What will the wave look like if we hit harder?" Then press Hit hard and compare the wave height.',
      'On the guitar, tighten the string and hit again. Do the waves get closer together or farther apart?',
      'Turn the sound off and ask children to guess high or low from the picture alone, then turn it on to check.',
    ],
    id: [
      'Tanyakan: "Seperti apa gelombangnya kalau kita pukul lebih keras?" Lalu tekan Pukul keras dan bandingkan tinggi gelombangnya.',
      'Pada gitar, kencangkan senar dan petik lagi. Apakah gelombangnya menjadi lebih rapat atau lebih renggang?',
      'Matikan suara dan minta anak menebak nada tinggi atau rendah dari gambarnya saja, lalu nyalakan untuk memeriksa.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Every sound starts with something vibrating. To vibrate means to wobble back and forth very quickly. When you hit a drum, the skin wobbles. When you pluck a guitar string, the string wobbles. The wobbling object pushes the air next to it, and the push travels through the air to your ear. Then your ear wobbles too, and you hear a sound.',
        'A hard hit makes a big wobble, and a big wobble makes a loud sound. A soft hit makes a small wobble and a quiet sound. The blue wave at the bottom of the sim is a picture of the wobble. A tall wave means loud; a short wave means quiet. Watch the wave shrink as the sound fades away, because the wobble gets smaller and smaller until it stops.',
        'How fast something wobbles decides how high or low the sound is. A fast wobble gives a high sound, and a slow wobble gives a low sound. A small drum, a tight or thin string, and a short tuning fork all wobble fast and sound high. A big drum, a loose string and a long fork wobble slowly and sound low. In the wave picture, a high sound has waves close together. Real things wobble hundreds of times every second, far too fast to see, so the sim slows the wobble down so your eyes can follow it.',
      ],
      id: [
        'Setiap bunyi berawal dari sesuatu yang bergetar. Bergetar berarti bergoyang maju-mundur dengan sangat cepat. Ketika kamu memukul drum, kulit drumnya bergoyang. Ketika kamu memetik senar gitar, senarnya bergoyang. Benda yang bergoyang mendorong udara di sebelahnya, dan dorongan itu merambat melalui udara sampai ke telingamu. Lalu telingamu ikut bergoyang, dan kamu mendengar bunyi.',
        'Pukulan keras membuat goyangan besar, dan goyangan besar membuat bunyi nyaring. Pukulan lembut membuat goyangan kecil dan bunyi pelan. Gelombang biru di bagian bawah simulasi adalah gambar dari goyangan itu. Gelombang tinggi berarti nyaring; gelombang pendek berarti pelan. Lihat gelombangnya mengecil saat bunyi menghilang, karena goyangannya makin kecil sampai berhenti.',
        'Seberapa cepat benda bergoyang menentukan tinggi atau rendahnya bunyi. Goyangan cepat memberi bunyi tinggi, dan goyangan lambat memberi bunyi rendah. Drum kecil, senar yang kencang atau tipis, dan garpu tala pendek semuanya bergoyang cepat dan berbunyi tinggi. Drum besar, senar yang kendur dan garpu tala panjang bergoyang lambat dan berbunyi rendah. Pada gambar gelombang, bunyi tinggi mempunyai gelombang yang rapat. Benda sungguhan bergoyang ratusan kali tiap detik, terlalu cepat untuk dilihat, jadi simulasi memperlambat goyangannya supaya matamu bisa mengikutinya.',
      ],
    },
    figure: {
      caption: {
        en: 'A plucked string wobbles up and down past its resting position. The wave trace draws that wobble: a harder hit makes a taller wave (louder), and a tighter string wobbles faster, so its waves are closer together (higher).',
        id: 'Senar yang dipetik bergoyang naik-turun melewati posisi diamnya. Jejak gelombang menggambar goyangan itu: pukulan lebih keras membuat gelombang lebih tinggi (lebih nyaring), dan senar yang lebih kencang bergoyang lebih cepat, sehingga gelombangnya lebih rapat (lebih tinggi nadanya).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A vibrating string and three wave traces', 'Senar yang bergetar dan tiga jejak gelombang')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;text-anchor:middle}.m{fill:none;stroke:currentColor;stroke-width:1.3}.w{fill:none;stroke:#3b82f6;stroke-width:2.4}</style>
  <defs><marker id="dd" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#ef4444"/></marker></defs>
  <rect x="26" y="40" width="14" height="60" fill="currentColor" opacity=".6"/>
  <rect x="320" y="40" width="14" height="60" fill="currentColor" opacity=".6"/>
  <line x1="40" y1="70" x2="320" y2="70" class="m" stroke-dasharray="4 4" opacity=".4"/>
  <path d="M40 70 Q180 24 320 70" class="m" stroke="#f59e0b" stroke-width="2.5"/>
  <path d="M40 70 Q180 116 320 70" class="m" stroke="#f59e0b" stroke-width="2.5" opacity=".45"/>
  <line x1="180" y1="56" x2="180" y2="50" stroke="#ef4444" stroke-width="2" marker-end="url(#dd)"/>
  <line x1="180" y1="84" x2="180" y2="90" stroke="#ef4444" stroke-width="2" marker-end="url(#dd)"/>
  <text x="180" y="18" class="s">${L('the string wobbles up and down: a vibration', 'senar bergoyang naik-turun: getaran')}</text>
  <text x="180" y="130" class="s" opacity=".7">${L('rest position (dashed)', 'posisi diam (putus-putus)')}</text>
  <line x1="12" y1="175" x2="348" y2="175" class="m" opacity=".3"/>
  <path d="M14 175 Q26 161 38 175 Q50 189 62 175 Q74 161 86 175 Q98 189 110 175" class="w"/>
  <path d="M126 175 Q138 143 150 175 Q162 207 174 175 Q186 143 198 175 Q210 207 222 175" class="w"/>
  <path d="M238 175 Q244 161 250 175 Q256 189 262 175 Q268 161 274 175 Q280 189 286 175 Q292 161 298 175 Q304 189 310 175 Q316 161 322 175 Q328 189 334 175" class="w"/>
  <text x="62" y="222" class="s">${L('soft hit:', 'pukulan lembut:')}</text>
  <text x="62" y="234" class="s">${L('short wave, quiet', 'gelombang pendek, pelan')}</text>
  <text x="174" y="222" class="s">${L('hard hit:', 'pukulan keras:')}</text>
  <text x="174" y="234" class="s">${L('tall wave, loud', 'gelombang tinggi, nyaring')}</text>
  <text x="286" y="222" class="s">${L('tight string:', 'senar kencang:')}</text>
  <text x="286" y="234" class="s">${L('close waves, high', 'gelombang rapat, tinggi')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Sound is made when something vibrates, which means it wobbles back and forth very fast.',
        'The vibration travels through the air to your ear; without air there would be no sound.',
        'A bigger vibration makes a louder sound, and shows up as a taller wave.',
        'A faster vibration makes a higher sound, and shows up as waves closer together.',
        'Small, tight or short things vibrate fast and sound high; big, loose or long things vibrate slowly and sound low.',
      ],
      id: [
        'Bunyi dihasilkan ketika sesuatu bergetar, yaitu bergoyang maju-mundur dengan sangat cepat.',
        'Getaran merambat melalui udara sampai ke telingamu; tanpa udara tidak akan ada bunyi.',
        'Getaran yang lebih besar membuat bunyi lebih nyaring, dan tampak sebagai gelombang yang lebih tinggi.',
        'Getaran yang lebih cepat membuat bunyi lebih tinggi, dan tampak sebagai gelombang yang lebih rapat.',
        'Benda yang kecil, kencang atau pendek bergetar cepat dan berbunyi tinggi; benda yang besar, kendur atau panjang bergetar lambat dan berbunyi rendah.',
      ],
    },
    vocabulary: {
      en: [
        ['Vibration', 'A fast wobble back and forth. Every sound starts with a vibration.'],
        ['Loud and quiet', 'How big the sound is. A big vibration is loud; a small one is quiet.'],
        ['Pitch', 'How high or low a sound is. A fast vibration has a high pitch; a slow one has a low pitch.'],
        ['Wave', 'The wobbly line in the sim that draws the vibration. Its height shows loudness and its spacing shows pitch.'],
        ['Tuning fork', 'A metal fork that vibrates at one steady pitch when you tap it; musicians use it to tune instruments.'],
      ],
      id: [
        ['Getaran', 'Goyangan cepat maju-mundur. Setiap bunyi berawal dari getaran.'],
        ['Nyaring dan pelan', 'Seberapa besar bunyinya. Getaran besar terdengar nyaring; getaran kecil terdengar pelan.'],
        ['Tinggi nada', 'Seberapa tinggi atau rendah bunyi. Getaran cepat bernada tinggi; getaran lambat bernada rendah.'],
        ['Gelombang', 'Garis bergoyang di simulasi yang menggambar getaran. Tingginya menunjukkan kenyaringan dan kerapatannya menunjukkan tinggi nada.'],
        ['Garpu tala', 'Garpu logam yang bergetar pada satu nada tetap ketika diketuk; pemusik memakainya untuk menyetel alat musik.'],
      ],
    },
    misconceptions: {
      en: [
        ['Loud sounds are high and quiet sounds are low.', 'Loudness and pitch are different things. A big drum hit hard is loud but low. A tuning fork tapped gently is quiet but high. In the sim, hitting harder changes the wave height but not how close the waves are.'],
        ['Sound comes out of an instrument like water out of a pipe, so you do not need vibration.', 'Nothing comes out. The instrument vibrates and makes the air next to it vibrate, and that vibration passes along through the air to your ear. Stop the vibration by touching the string, and the sound stops.'],
        ['Hitting a drum harder makes a higher sound.', 'Hitting harder only makes it louder. The pitch depends on the drum itself: a smaller drum skin gives a higher sound, as the sim shows with the Smaller drum button.'],
      ],
      id: [
        ['Bunyi yang nyaring itu tinggi dan bunyi yang pelan itu rendah.', 'Kenyaringan dan tinggi nada adalah dua hal yang berbeda. Drum besar yang dipukul keras berbunyi nyaring tetapi rendah. Garpu tala yang diketuk pelan berbunyi lembut tetapi tinggi. Di simulasi, memukul lebih keras mengubah tinggi gelombang tetapi tidak mengubah kerapatannya.'],
        ['Bunyi keluar dari alat musik seperti air dari pipa, jadi tidak perlu getaran.', 'Tidak ada yang keluar. Alat musik bergetar dan membuat udara di sebelahnya bergetar, lalu getaran itu merambat melalui udara sampai ke telingamu. Hentikan getaran dengan menyentuh senar, maka bunyinya berhenti.'],
        ['Memukul drum lebih keras membuat bunyinya lebih tinggi.', 'Memukul lebih keras hanya membuatnya lebih nyaring. Tinggi nada bergantung pada drumnya sendiri: kulit drum yang lebih kecil memberi bunyi lebih tinggi, seperti ditunjukkan simulasi dengan tombol Drum lebih kecil.'],
      ],
    },
    realWorld: {
      en: [
        'Put your fingers on your throat and hum: you can feel your voice box vibrating.',
        'A guitar has thick, loose strings for low notes and thin, tight strings for high notes, and pressing a string against the neck shortens it to raise the pitch.',
        'Big animals like elephants make deep, low sounds, while small animals like mice and birds make high ones.',
        'A loudspeaker has a cone that wobbles back and forth; turn the volume up and you can see it move further, which makes the sound louder.',
      ],
      id: [
        'Letakkan jarimu di tenggorokan lalu bergumam: kamu bisa merasakan pita suaramu bergetar.',
        'Gitar mempunyai senar tebal dan kendur untuk nada rendah serta senar tipis dan kencang untuk nada tinggi, dan menekan senar ke leher gitar memendekkannya sehingga nadanya naik.',
        'Hewan besar seperti gajah mengeluarkan bunyi berat dan rendah, sedangkan hewan kecil seperti tikus dan burung mengeluarkan bunyi tinggi.',
        'Pengeras suara mempunyai kerucut yang bergoyang maju-mundur; besarkan volumenya dan kamu bisa melihatnya bergerak lebih jauh, yang membuat bunyinya lebih nyaring.',
      ],
    },
    questions: {
      en: [
        { q: 'You hit the drum softly, then hit it hard. What changes in the wave picture, and what changes in the sound?', a: 'The wave gets taller, and the sound gets louder. A hard hit makes the drum skin wobble further, and a bigger wobble is a louder sound. The spacing of the waves does not change, so the pitch stays the same.' },
        { q: 'On the guitar, you press Tighten string and pluck again. Are the waves closer together or farther apart, and is the sound higher or lower?', a: 'Closer together, and higher. A tight string wobbles faster, and a faster wobble is a higher sound. In the picture, fast wobbles show up as waves packed closely together.' },
        { q: 'Which gives a lower sound: the long tuning fork or the short one? Why?', a: 'The long fork. Longer prongs are heavier and bendier, so they wobble more slowly, and a slow wobble is a low sound. The short fork wobbles faster and sounds higher.' },
      ],
      id: [
        { q: 'Kamu memukul drum dengan lembut, lalu memukulnya dengan keras. Apa yang berubah pada gambar gelombang, dan apa yang berubah pada bunyinya?', a: 'Gelombangnya menjadi lebih tinggi, dan bunyinya lebih nyaring. Pukulan keras membuat kulit drum bergoyang lebih jauh, dan goyangan yang lebih besar berarti bunyi lebih nyaring. Kerapatan gelombangnya tidak berubah, jadi tinggi nadanya tetap sama.' },
        { q: 'Pada gitar, kamu menekan Kencangkan senar dan memetik lagi. Apakah gelombangnya lebih rapat atau lebih renggang, dan bunyinya lebih tinggi atau lebih rendah?', a: 'Lebih rapat, dan lebih tinggi. Senar yang kencang bergoyang lebih cepat, dan goyangan yang lebih cepat berarti bunyi lebih tinggi. Pada gambar, goyangan cepat tampak sebagai gelombang yang berjejal rapat.' },
        { q: 'Mana yang berbunyi lebih rendah: garpu tala yang panjang atau yang pendek? Mengapa?', a: 'Garpu yang panjang. Batang yang lebih panjang lebih berat dan lebih lentur, jadi bergoyang lebih lambat, dan goyangan lambat berarti bunyi rendah. Garpu pendek bergoyang lebih cepat dan berbunyi lebih tinggi.' },
      ],
    },
  },
};
