// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Read an analog clock to the hour, half hour, quarter hour and to five minutes.',
      'Match the analog clock to the digital time and to the words we use, such as "half past seven".',
      'Work out how much time has passed between a start time and an end time in hours and minutes.',
    ],
    id: [
      'Membaca jam analog sampai jam, setengah jam, seperempat jam dan lima menit.',
      'Mencocokkan jam analog dengan waktu digital dan dengan kata-kata yang kita pakai, seperti "pukul setengah delapan".',
      'Menghitung lama waktu antara waktu mulai dan waktu selesai dalam jam dan menit.',
    ],
  },
  tryThis: {
    en: [
      'Drag the long minute hand all the way round once. Watch the short hour hand: how far did it move?',
      'Choose Set the clock and turn on Easy. Set each time it asks for. Then turn Easy off for five-minute times.',
      'Choose Elapsed time. Set the start to 07:30 and the end to 09:15. How long is that? Check with the timeline.',
      'Set the clock to half past six. Where is the hour hand: on the 6, or between the 6 and the 7?',
    ],
    id: [
      'Geser jarum menit yang panjang satu putaran penuh. Perhatikan jarum jam yang pendek: seberapa jauh ia bergerak?',
      'Pilih Atur jam dan nyalakan Mudah. Atur setiap waktu yang diminta. Lalu matikan Mudah untuk waktu lima menitan.',
      'Pilih Lama waktu. Atur mulai ke 07.30 dan selesai ke 09.15. Berapa lamanya? Periksa dengan garis waktunya.',
      'Atur jam ke setengah tujuh. Di mana jarum jamnya: tepat di angka 6, atau di antara 6 dan 7?',
    ],
  },

  learn: {
    background: {
      en: [
        'A clock face has the numbers 1 to 12 around a circle and two hands. The short hand is the hour hand. It points to the hour, and it takes a whole 12 hours to go once around. The long hand is the minute hand. It goes all the way round once every hour, so one full turn of the minute hand moves the hour hand from one number to the next.',
        'Between two numbers on the clock face there are five small marks, and each mark is one minute. From 12 to 1 is five minutes, from 12 to 3 is fifteen minutes, from 12 to 6 is thirty minutes, and all the way round is sixty minutes. In this sim you can drag either hand. Drag the minute hand past the 12 and watch the hour change. Drag the hour hand and the minute hand turns with it, just like a real clock, because the two hands are joined by gears.',
        'We say the time in different ways. "Seven o\'clock" is 07:00, when the minute hand points straight up. "Half past seven" is 07:30, when the minute hand points straight down. In Indonesian we say "setengah delapan", which means half way to eight. "Quarter past" is 15 minutes after the hour and "quarter to" is 15 minutes before the next hour. The digital display always shows the hour, then two dots, then the minutes.',
        'Elapsed time is how long something takes. To find it, count on from the start time to the end time: first in whole hours, then in minutes. From 07:30 to 09:15 is one hour to 08:30, another hour to 09:30 would be too far, so stop at 09:15: 45 minutes after 08:30. Altogether that is 1 hour 45 minutes. The timeline under the two clocks shows these jumps.',
      ],
      id: [
        'Muka jam mempunyai angka 1 sampai 12 yang melingkar dan dua jarum. Jarum pendek adalah jarum jam. Ia menunjuk jam, dan memerlukan 12 jam penuh untuk satu putaran. Jarum panjang adalah jarum menit. Ia berputar satu kali penuh setiap jam, sehingga satu putaran penuh jarum menit menggeser jarum jam dari satu angka ke angka berikutnya.',
        'Di antara dua angka pada muka jam ada lima garis kecil, dan setiap garis adalah satu menit. Dari 12 ke 1 adalah lima menit, dari 12 ke 3 adalah lima belas menit, dari 12 ke 6 adalah tiga puluh menit, dan satu putaran penuh adalah enam puluh menit. Di simulasi ini kamu bisa menggeser kedua jarum. Geser jarum menit melewati angka 12 dan lihat jamnya berganti. Geser jarum jam, maka jarum menit ikut berputar, seperti jam sungguhan, karena kedua jarum terhubung oleh roda gigi.',
        'Kita menyebut waktu dengan berbagai cara. "Pukul tujuh tepat" adalah 07.00, saat jarum menit menunjuk lurus ke atas. "Pukul setengah delapan" adalah 07.30, saat jarum menit menunjuk lurus ke bawah: artinya sudah setengah jalan menuju pukul delapan. "Lewat seperempat" berarti 15 menit setelah jam itu dan "kurang seperempat" berarti 15 menit sebelum jam berikutnya. Tampilan digital selalu menunjukkan jam, lalu dua titik, lalu menit.',
        'Lama waktu adalah berapa lama sesuatu berlangsung. Untuk mencarinya, hitung maju dari waktu mulai ke waktu selesai: dahulu dalam jam penuh, lalu dalam menit. Dari 07.30 ke 09.15: satu jam sampai 08.30, satu jam lagi sampai 09.30 terlalu jauh, jadi berhenti di 09.15: 45 menit setelah 08.30. Semuanya 1 jam 45 menit. Garis waktu di bawah kedua jam menunjukkan lompatan-lompatan ini.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the clock shows half past seven (07:30). The long minute hand points to the 6, and the short hour hand is half way between 7 and 8. Right: counting on from 07:30 to 09:15 gives 1 hour and 45 minutes.',
        id: 'Kiri: jam menunjukkan pukul setengah delapan (07.30). Jarum menit yang panjang menunjuk angka 6, dan jarum jam yang pendek berada di tengah antara 7 dan 8. Kanan: menghitung maju dari 07.30 ke 09.15 menghasilkan 1 jam 45 menit.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cx = 95, cy = 120, r = 80;
        let face = '';
        for (let i = 0; i < 60; i++) {
          const a = (i / 60) * Math.PI * 2;
          const big = i % 5 === 0;
          const r1 = big ? r - 10 : r - 5;
          face += `<line x1="${(cx + Math.sin(a) * r1).toFixed(1)}" y1="${(cy - Math.cos(a) * r1).toFixed(1)}" x2="${(cx + Math.sin(a) * r).toFixed(1)}" y2="${(cy - Math.cos(a) * r).toFixed(1)}" stroke="currentColor" stroke-width="${big ? 2 : 1}"/>`;
        }
        let nums = '';
        for (let n = 1; n <= 12; n++) {
          const a = (n / 12) * Math.PI * 2;
          nums += `<text x="${(cx + Math.sin(a) * (r - 22)).toFixed(1)}" y="${(cy - Math.cos(a) * (r - 22) + 4).toFixed(1)}" text-anchor="middle" class="n">${n}</text>`;
        }
        const hourA = ((7.5) / 12) * Math.PI * 2;
        const minA = Math.PI;
        const hand = (a, len, w, col) => `<line x1="${cx}" y1="${cy}" x2="${(cx + Math.sin(a) * len).toFixed(1)}" y2="${(cy - Math.cos(a) * len).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A clock showing half past seven, and a timeline from 07:30 to 09:15', 'Jam yang menunjukkan pukul setengah delapan, dan garis waktu dari 07.30 ke 09.15')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.n{font:bold 11px system-ui,sans-serif;fill:currentColor}.s{font:bold 12px system-ui,sans-serif;fill:currentColor}</style>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="2"/>
  ${face}${nums}
  ${hand(hourA, 42, 6, '#3b82f6')}
  ${hand(minA, 62, 4, '#ef4444')}
  <circle cx="${cx}" cy="${cy}" r="4" fill="currentColor"/>
  <text x="${cx}" y="226" text-anchor="middle" class="s">07:30 · ${L('half past seven', 'setengah delapan')}</text>
  <text x="140" y="30" fill="#3b82f6">${L('short hand = hours', 'jarum pendek = jam')}</text>
  <text x="140" y="44" fill="#ef4444">${L('long hand = minutes', 'jarum panjang = menit')}</text>
  <line x1="200" y1="150" x2="345" y2="150" stroke="currentColor" stroke-width="2"/>
  <line x1="200" y1="143" x2="200" y2="157" stroke="currentColor" stroke-width="2"/>
  <line x1="275" y1="143" x2="275" y2="157" stroke="currentColor" stroke-width="2"/>
  <line x1="331" y1="143" x2="331" y2="157" stroke="currentColor" stroke-width="2"/>
  <path d="M200 148 Q237 105 275 148" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <path d="M275 148 Q303 118 331 148" fill="none" stroke="#22c55e" stroke-width="2"/>
  <text x="237" y="118" text-anchor="middle" fill="#f59e0b">${L('+1 hour', '+1 jam')}</text>
  <text x="303" y="126" text-anchor="middle" fill="#22c55e">${L('+45 min', '+45 menit')}</text>
  <text x="200" y="172" text-anchor="middle">07:30</text>
  <text x="275" y="172" text-anchor="middle">08:30</text>
  <text x="331" y="172" text-anchor="middle">09:15</text>
  <text x="270" y="200" text-anchor="middle" class="s">${L('1 hour 45 minutes', '1 jam 45 menit')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The short hand shows the hour; the long hand shows the minutes.',
        'Each small mark is one minute; from one number to the next is five minutes.',
        'One full turn of the minute hand is one hour, and the hour hand moves one number.',
        'At half past, the minute hand points to the 6 and the hour hand is half way between two numbers.',
        'To find elapsed time, count on in whole hours first, then in minutes.',
      ],
      id: [
        'Jarum pendek menunjukkan jam; jarum panjang menunjukkan menit.',
        'Setiap garis kecil adalah satu menit; dari satu angka ke angka berikutnya adalah lima menit.',
        'Satu putaran penuh jarum menit adalah satu jam, dan jarum jam bergeser satu angka.',
        'Pada setengah jam, jarum menit menunjuk angka 6 dan jarum jam berada di tengah antara dua angka.',
        'Untuk mencari lama waktu, hitung maju dalam jam penuh dahulu, lalu dalam menit.',
      ],
    },
    vocabulary: {
      en: [
        ['Hour hand', 'The short hand. It goes once around the clock in 12 hours.'],
        ['Minute hand', 'The long hand. It goes once around the clock in 60 minutes, which is one hour.'],
        ['O\'clock', 'An exact hour, when the minute hand points to the 12. For example 3 o\'clock is 03:00.'],
        ['Half past', 'Thirty minutes after the hour, when the minute hand points to the 6. Half past 7 is 07:30.'],
        ['Quarter past / quarter to', '15 minutes after the hour (minute hand on the 3) or 15 minutes before the next hour (minute hand on the 9).'],
        ['Elapsed time', 'How much time has passed between a start and an end.'],
      ],
      id: [
        ['Jarum jam', 'Jarum pendek. Ia berputar satu kali penuh dalam 12 jam.'],
        ['Jarum menit', 'Jarum panjang. Ia berputar satu kali penuh dalam 60 menit, yaitu satu jam.'],
        ['Tepat', 'Jam yang pas, saat jarum menit menunjuk angka 12. Misalnya pukul 3 tepat adalah 03.00.'],
        ['Setengah', 'Tiga puluh menit setelah jam, saat jarum menit menunjuk angka 6. Pukul setengah delapan adalah 07.30.'],
        ['Lewat seperempat / kurang seperempat', '15 menit setelah jam (jarum menit di angka 3) atau 15 menit sebelum jam berikutnya (jarum menit di angka 9).'],
        ['Lama waktu', 'Berapa banyak waktu yang berlalu antara mulai dan selesai.'],
      ],
    },
    misconceptions: {
      en: [
        ['When the minute hand points to the 3, it is 3 minutes past.', 'It is 15 minutes past. The numbers on the face count hours for the short hand. For the long hand, each number is worth five minutes: 3 × 5 = 15.'],
        ['At half past seven the hour hand points exactly at the 7.', 'No. By half past, the hour hand has moved half way towards the 8. The hour hand creeps forward all the time, not in jumps.'],
        ['From 07:30 to 09:15 is 2 hours 15 minutes, because 9 − 7 = 2 and 15 is the minutes.', 'Count on instead: 07:30 to 08:30 is 1 hour, and 08:30 to 09:15 is 45 minutes. The answer is 1 hour 45 minutes. You cannot subtract hours and minutes separately when the minutes go "past 60".'],
      ],
      id: [
        ['Saat jarum menit menunjuk angka 3, berarti lewat 3 menit.', 'Berarti lewat 15 menit. Angka pada muka jam menghitung jam untuk jarum pendek. Untuk jarum panjang, setiap angka bernilai lima menit: 3 × 5 = 15.'],
        ['Pada pukul setengah delapan, jarum jam menunjuk tepat ke angka 7.', 'Tidak. Pada setengah jam, jarum jam sudah bergeser setengah jalan ke angka 8. Jarum jam merayap maju terus-menerus, bukan melompat.'],
        ['Dari 07.30 ke 09.15 adalah 2 jam 15 menit, karena 9 − 7 = 2 dan 15 adalah menitnya.', 'Hitung maju saja: 07.30 ke 08.30 adalah 1 jam, dan 08.30 ke 09.15 adalah 45 menit. Jawabannya 1 jam 45 menit. Jam dan menit tidak bisa dikurangkan terpisah begitu saja ketika menitnya "melewati 60".'],
      ],
    },
    realWorld: {
      en: [
        'School timetables tell you when each lesson starts and ends, so you can work out how long the break is.',
        'Cooking instructions such as "bake for 45 minutes" mean you need to read the clock now and add 45 minutes.',
        'Bus and train timetables use digital times like 07:45, so you need to picture them on a clock to know how long to wait.',
        'Prayer times, bedtime and the start of your favourite programme are all times you read from a clock every day.',
      ],
      id: [
        'Jadwal pelajaran memberi tahu kapan setiap pelajaran mulai dan selesai, sehingga kamu bisa menghitung berapa lama istirahat.',
        'Petunjuk memasak seperti "panggang selama 45 menit" berarti kamu harus membaca jam sekarang dan menambah 45 menit.',
        'Jadwal bus dan kereta memakai waktu digital seperti 07.45, jadi kamu perlu membayangkannya di jam untuk tahu berapa lama menunggu.',
        'Waktu salat, waktu tidur dan mulainya acara kesukaanmu adalah waktu yang kamu baca dari jam setiap hari.',
      ],
    },
    questions: {
      en: [
        { q: 'The minute hand points to the 9 and the hour hand is just before the 5. What time is it?', a: '04:45, which is quarter to five. The hour hand has not reached the 5 yet, so the hour is still 4, and the 9 means 45 minutes.' },
        { q: 'A film starts at 06:20 and finishes at 08:05. How long is it?', a: '1 hour 45 minutes. From 06:20 to 07:20 is 1 hour, and from 07:20 to 08:05 is 45 minutes.' },
        { q: 'Why does the hour hand move when you drag the minute hand all the way round?', a: 'Because one full turn of the minute hand is 60 minutes, which is one hour, so the hour hand must move on to the next number.' },
      ],
      id: [
        { q: 'Jarum menit menunjuk angka 9 dan jarum jam sedikit sebelum angka 5. Pukul berapa itu?', a: '04.45, yaitu pukul lima kurang seperempat. Jarum jam belum sampai angka 5, jadi jamnya masih 4, dan angka 9 berarti 45 menit.' },
        { q: 'Sebuah film mulai pukul 06.20 dan selesai pukul 08.05. Berapa lamanya?', a: '1 jam 45 menit. Dari 06.20 ke 07.20 adalah 1 jam, dan dari 07.20 ke 08.05 adalah 45 menit.' },
        { q: 'Mengapa jarum jam bergeser ketika kamu menggeser jarum menit satu putaran penuh?', a: 'Karena satu putaran penuh jarum menit adalah 60 menit, yaitu satu jam, sehingga jarum jam harus bergeser ke angka berikutnya.' },
      ],
    },
  },
};
