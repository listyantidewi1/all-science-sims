// Long-form text for the sim page aside, written for the teacher.
export default {
  objectives: {
    en: [
      'Explain that day and night happen because the Earth spins, not because the Sun moves.',
      'Describe how a shadow changes length and direction from morning to noon to evening.',
      'Show that two places on opposite sides of the Earth have day and night at different times.',
    ],
    id: [
      'Menjelaskan bahwa siang dan malam terjadi karena Bumi berputar, bukan karena Matahari bergerak.',
      'Menjelaskan bagaimana panjang dan arah bayangan berubah dari pagi, siang, hingga sore.',
      'Menunjukkan bahwa dua tempat di sisi Bumi yang berlawanan mengalami siang dan malam pada waktu yang berbeda.',
    ],
  },
  tryThis: {
    en: [
      'Set the time to 9 in the morning. Guess: will the shadow get longer or shorter by noon? Slide to check.',
      'Pick Jakarta and set noon. Look at New York on the Earth. Is it day or night there?',
      'Press Play and count how many times the shadow is shortest in one full spin.',
    ],
    id: [
      'Atur waktu ke jam 9 pagi. Tebak: bayangannya makin panjang atau makin pendek saat siang? Geser untuk mengecek.',
      'Pilih Jakarta dan atur ke tengah hari. Lihat New York di Bumi. Di sana siang atau malam?',
      'Tekan Putar dan hitung berapa kali bayangan paling pendek dalam satu putaran penuh.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The Sun does not travel around the Earth. The Earth spins, like a ball turning slowly. The Sun can only light up one half of the Earth at a time. The half that faces the Sun has day. The half that faces away has night. The Earth takes one whole day, 24 hours, to turn around once.',
        'In this sim you look down on the Earth from above the North Pole, with the Sun on the left. The time slider turns the Earth. The city you pick, Jakarta, London or New York, moves out of the dark into the light at sunrise, and back into the dark at sunset. When Jakarta is at noon, New York is on the far side of the Earth, so it is night there. You can also drag your city with your finger to turn the Earth yourself.',
        'On the right, a child holds a stick. The stick blocks the sunlight and makes a shadow on the ground. In the morning and the evening the Sun is low, so the shadow is long. At noon the Sun is high, so the shadow is short. The shadow always points away from the Sun. The sim keeps things simple: the Sun is right overhead at noon, and day and night are each 12 hours long, like at the equator. It does not show seasons.',
      ],
      id: [
        'Matahari tidak berkeliling mengitari Bumi. Bumilah yang berputar, seperti bola yang berputar pelan. Matahari hanya bisa menerangi separuh Bumi pada satu waktu. Separuh yang menghadap Matahari mengalami siang. Separuh yang membelakangi Matahari mengalami malam. Bumi membutuhkan satu hari penuh, 24 jam, untuk berputar satu kali.',
        'Dalam simulasi ini kamu melihat Bumi dari atas Kutub Utara, dengan Matahari di sebelah kiri. Slider waktu memutar Bumi. Kota yang kamu pilih, Jakarta, London, atau New York, keluar dari bagian gelap ke bagian terang saat matahari terbit, dan kembali ke bagian gelap saat matahari terbenam. Ketika di Jakarta tengah hari, New York berada di sisi Bumi yang jauh, jadi di sana malam. Kamu juga bisa menyeret kotamu dengan jari untuk memutar Bumi sendiri.',
        'Di sebelah kanan, seorang anak memegang tongkat. Tongkat itu menghalangi cahaya matahari dan membuat bayangan di tanah. Pada pagi dan sore hari Matahari rendah, jadi bayangannya panjang. Pada tengah hari Matahari tinggi, jadi bayangannya pendek. Bayangan selalu mengarah menjauhi Matahari. Simulasi ini dibuat sederhana: Matahari tepat di atas kepala saat tengah hari, dan siang serta malam masing-masing 12 jam, seperti di khatulistiwa. Simulasi ini tidak menunjukkan musim.',
      ],
    },
    figure: {
      caption: {
        en: 'The Sun lights one half of the Earth: that half has day, the other half has night. Below: a low morning Sun makes a long shadow; a high noon Sun makes a short one.',
        id: 'Matahari menerangi separuh Bumi: separuh itu mengalami siang, separuh lainnya malam. Di bawah: Matahari pagi yang rendah membuat bayangan panjang; Matahari tengah hari yang tinggi membuat bayangan pendek.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('The Sun lighting half of the Earth, and shadows at morning and noon', 'Matahari menerangi separuh Bumi, dan bayangan pada pagi dan tengah hari')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px}</style>
  <circle cx="44" cy="66" r="22" fill="#f59e0b"/>
  <g stroke="#f59e0b" stroke-width="1.6">
    <line x1="80" y1="40" x2="150" y2="40"/><line x1="80" y1="66" x2="150" y2="66"/><line x1="80" y1="92" x2="150" y2="92"/>
  </g>
  <text x="44" y="108" text-anchor="middle" class="s">${L('Sun', 'Matahari')}</text>
  <circle cx="220" cy="66" r="46" fill="currentColor" opacity=".3"/>
  <path d="M220 20 A46 46 0 0 0 220 112 Z" fill="#3b82f6"/>
  <circle cx="220" cy="66" r="46" class="m"/>
  <text x="196" y="70" text-anchor="middle" class="s" fill="#ffffff">${L('day', 'siang')}</text>
  <text x="244" y="70" text-anchor="middle" class="s">${L('night', 'malam')}</text>
  <path d="M250 14 A60 60 0 0 1 282 50" fill="none" stroke="#10b981" stroke-width="2" marker-end="url(#a)"/>
  <text x="290" y="20" class="s" fill="#10b981">${L('Earth spins', 'Bumi berputar')}</text>
  <line x1="20" y1="206" x2="340" y2="206" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="38" cy="156" r="10" fill="#f59e0b"/>
  <line x1="48" y1="160" x2="100" y2="176" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="100" y1="206" x2="100" y2="176" stroke="currentColor" stroke-width="3"/>
  <line x1="100" y1="206" x2="182" y2="206" stroke="#8b5cf6" stroke-width="5" opacity=".7"/>
  <text x="106" y="228" class="s">${L('morning: long shadow', 'pagi: bayangan panjang')}</text>
  <circle cx="268" cy="132" r="10" fill="#f59e0b"/>
  <line x1="268" y1="142" x2="268" y2="172" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="268" y1="206" x2="268" y2="176" stroke="currentColor" stroke-width="3"/>
  <line x1="264" y1="206" x2="276" y2="206" stroke="#8b5cf6" stroke-width="5" opacity=".7"/>
  <text x="222" y="228" class="s">${L('noon: short shadow', 'tengah hari: bayangan pendek')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The Earth spins once every 24 hours; that is what makes day and night.',
        'The side of the Earth facing the Sun has day, and the side facing away has night.',
        'When it is noon in one place, it is midnight on the other side of the Earth.',
        'A shadow is long when the Sun is low and short when the Sun is high, and it always points away from the Sun.',
      ],
      id: [
        'Bumi berputar satu kali setiap 24 jam; itulah yang membuat siang dan malam.',
        'Sisi Bumi yang menghadap Matahari mengalami siang, dan sisi yang membelakanginya mengalami malam.',
        'Ketika di satu tempat tengah hari, di sisi lain Bumi tengah malam.',
        'Bayangan panjang ketika Matahari rendah dan pendek ketika Matahari tinggi, dan selalu mengarah menjauhi Matahari.',
      ],
    },
    vocabulary: {
      en: [
        ['Spin (rotate)', 'To turn around, like a top. The Earth spins once a day.'],
        ['Day', 'The time when your side of the Earth faces the Sun and the sky is bright.'],
        ['Night', 'The time when your side of the Earth faces away from the Sun and the sky is dark.'],
        ['Noon', 'The middle of the day, when the Sun is highest in the sky and shadows are shortest.'],
        ['Shadow', 'The dark shape made on the ground when something blocks the light.'],
      ],
      id: [
        ['Berputar (rotasi)', 'Berbalik mengelilingi diri sendiri, seperti gasing. Bumi berputar satu kali sehari.'],
        ['Siang', 'Waktu ketika sisi Bumi tempatmu berada menghadap Matahari dan langit terang.'],
        ['Malam', 'Waktu ketika sisi Bumi tempatmu berada membelakangi Matahari dan langit gelap.'],
        ['Tengah hari', 'Pertengahan siang, ketika Matahari paling tinggi di langit dan bayangan paling pendek.'],
        ['Bayangan', 'Bentuk gelap di tanah yang terjadi ketika sesuatu menghalangi cahaya.'],
      ],
    },
    misconceptions: {
      en: [
        ['The Sun moves across the sky because it travels around the Earth.', 'It only looks that way. The Sun stays put and the Earth spins, so the Sun seems to rise in the east and set in the west.'],
        ['At night the Sun goes away or switches off.', 'The Sun shines all the time. At night your side of the Earth has turned away from it, and the Sun is lighting the other side.'],
        ['Shadows are longest at noon because the Sun is strongest then.', 'At noon the Sun is high, so the shadow is at its shortest. Shadows are longest early in the morning and late in the afternoon, when the Sun is low.'],
      ],
      id: [
        ['Matahari bergerak melintasi langit karena ia berkeliling mengitari Bumi.', 'Itu hanya tampaknya saja. Matahari tetap di tempatnya dan Bumi yang berputar, sehingga Matahari seolah terbit di timur dan terbenam di barat.'],
        ['Pada malam hari Matahari pergi atau padam.', 'Matahari bersinar terus. Pada malam hari sisi Bumi tempatmu berada sudah berputar membelakanginya, dan Matahari sedang menerangi sisi yang lain.'],
        ['Bayangan paling panjang saat tengah hari karena Matahari paling terik.', 'Saat tengah hari Matahari tinggi, jadi bayangan justru paling pendek. Bayangan paling panjang pada pagi-pagi dan sore hari, ketika Matahari rendah.'],
      ],
    },
    realWorld: {
      en: [
        'When you video-call family in another country, it can be morning for you and night for them, because they are on a different part of the spinning Earth.',
        'Indonesia is so wide that it has three time zones: the Sun rises in Papua about two hours before it rises in Jakarta.',
        'A sundial tells the time from the shadow of a stick: the shadow swings around as the Earth turns.',
        'Big football matches played in Europe in the evening are watched in Indonesia in the middle of the night.',
      ],
      id: [
        'Saat kamu video call dengan keluarga di negara lain, bisa saja di tempatmu pagi dan di tempat mereka malam, karena mereka berada di bagian lain Bumi yang berputar.',
        'Indonesia begitu lebar sehingga punya tiga zona waktu: Matahari terbit di Papua sekitar dua jam lebih awal daripada di Jakarta.',
        'Jam matahari menunjukkan waktu dari bayangan sebuah tongkat: bayangannya berayun berputar seiring Bumi berputar.',
        'Pertandingan sepak bola besar yang dimainkan di Eropa pada sore hari ditonton di Indonesia pada tengah malam.',
      ],
    },
    questions: {
      en: [
        { q: 'Set the time to 6 in the evening. Where is the Sun in the picture, and what does the shadow look like?', a: 'The Sun is low, near the ground on the right side. The shadow is very long and points to the left, away from the Sun. The Sun is about to set, so soon there will be no shadow at all.' },
        { q: 'Pick London and set noon. Look at the Earth. Is Jakarta in the light or in the dark? Is it day or night there?', a: 'Jakarta is just inside the dark side: it is about 7 in the evening there and the Sun has just set, so night is beginning. Jakarta is far to the east of London, so its day started earlier and finished earlier.' },
        { q: 'Press Play and watch the shadow for one full turn of the Earth. When is the shadow shortest, and when is there no shadow?', a: 'The shadow is shortest once, at noon, when the Sun is highest. There is no shadow at all during the night, from sunset at 6 in the evening to sunrise at 6 in the morning, because the Sun is not shining on that side.' },
      ],
      id: [
        { q: 'Atur waktu ke jam 6 sore. Di mana Matahari pada gambar, dan seperti apa bayangannya?', a: 'Matahari rendah, dekat tanah di sisi kanan. Bayangannya sangat panjang dan mengarah ke kiri, menjauhi Matahari. Matahari hampir terbenam, jadi sebentar lagi tidak ada bayangan sama sekali.' },
        { q: 'Pilih London dan atur ke tengah hari. Lihat Bumi. Apakah Jakarta berada di bagian terang atau gelap? Di sana siang atau malam?', a: 'Jakarta berada tepat di dalam bagian gelap: di sana sekitar jam 7 malam dan Matahari baru saja terbenam, jadi malam baru mulai. Jakarta jauh di sebelah timur London, jadi siangnya dimulai lebih awal dan berakhir lebih awal.' },
        { q: 'Tekan Putar dan amati bayangan selama satu putaran penuh Bumi. Kapan bayangannya paling pendek, dan kapan tidak ada bayangan?', a: 'Bayangan paling pendek satu kali, pada tengah hari, ketika Matahari paling tinggi. Tidak ada bayangan sama sekali pada malam hari, dari matahari terbenam jam 6 sore sampai matahari terbit jam 6 pagi, karena Matahari tidak menyinari sisi itu.' },
      ],
    },
  },
};
