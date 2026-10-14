// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Hear how N:M rhythms align every LCM(N, M) pulses.',
      'See visually that 3:4 differs from 5:4 and 5:7.',
      'Build intuition for compound time signatures.',
    ],
    id: [
      'Dengar bagaimana ritme N:M sejajar setiap LCM(N, M) pulsa.',
      'Lihat bahwa 3:4 berbeda dari 5:4 dan 5:7 secara visual.',
      'Membangun intuisi tanda birama majemuk.',
    ],
  },  tryThis: {
    en: [
      '3:2 — the simplest polyrhythm; very common in jazz and Latin music.',
      '3:4 — the "hemiola" of classical music; you cannot tap both at once until you slow it down.',
      '5:7 or 7:11 — what dense polyrhythms feel like.',
    ],
    id: [
      '3:2 — poliritme paling sederhana; sangat umum dalam jazz dan musik Latin.',
      '3:4 — "hemiola" musik klasik; Anda tidak bisa mengetuk keduanya sekaligus sampai melambat.',
      '5:7 atau 7:11 — rasanya poliritme rapat.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Clap a steady beat with one hand. Now imagine a friend clapping a different steady beat at the same time, so that in the time you clap three times, they clap four. You both start together, then your claps fall in different places, and after a while you land together again. Two steady beats of different speeds played at once make a polyrhythm. The pattern you hear is neither of the two beats alone but a new, bouncier rhythm made from how they interlock.',
        'The simulation shows one cycle as a strip from left to right. The top rail divides the cycle into N equal pulses and the bottom rail into M equal pulses, both starting on "1". The red line sweeps across as time passes, and each pulse lights up and clicks when the line reaches it (a high click for the top rail, a lower click for the bottom). The combined strip underneath stacks both sets of ticks on one timeline so you can see exactly where they land together and where they fall between each other.',
        'The N and M sliders set the two numbers, from 2 to 11. When the two numbers share no common factor, the pulses coincide only on the first beat of the cycle, and the number of little grid steps needed to describe both at once is the least common multiple: 3 and 4 need a grid of 12, which the readout shows. The tempo slider sets how long one cycle takes: the sim treats the cycle as a four-beat bar at that tempo, so at 60 bpm a cycle lasts 4 seconds whatever N and M are. Raising N therefore makes the top pulses faster but does not stretch the cycle.',
        'This is a machine-perfect version of something musicians do with feel. Real players add accents, swing and tiny timing variations, and in many traditions the two layers are played by different instruments with different sounds. The sim gives both rails the same loudness and perfectly even spacing, and it always begins both on the same downbeat. Try it slowly first: at 40 bpm you can tap one rail with each hand, then speed up and feel the moment when the two separate beats fuse into a single rolling pattern.',
      ],
      id: [
        'Tepuklah ketukan yang tetap dengan satu tangan. Sekarang bayangkan seorang teman menepuk ketukan tetap yang berbeda pada saat yang sama, sehingga dalam waktu kamu menepuk tiga kali, ia menepuk empat kali. Kalian mulai bersamaan, lalu tepukan kalian jatuh di tempat yang berbeda, dan setelah beberapa saat kalian bertemu lagi. Dua ketukan tetap dengan kecepatan berbeda yang dimainkan bersamaan membentuk poliritme. Pola yang terdengar bukan salah satu ketukan itu sendiri, melainkan ritme baru yang lebih lincah, yang terbentuk dari cara keduanya saling mengisi.',
        'Simulasi ini menampilkan satu siklus sebagai pita dari kiri ke kanan. Rel atas membagi siklus menjadi N pulsa yang sama panjang dan rel bawah menjadi M pulsa, keduanya mulai pada "1". Garis merah bergerak menyapu seiring waktu, dan tiap pulsa menyala dan berbunyi klik saat garis mencapainya (klik tinggi untuk rel atas, klik lebih rendah untuk rel bawah). Pita gabungan di bawahnya menumpuk kedua kelompok tanda pada satu garis waktu, sehingga kamu bisa melihat persis di mana keduanya jatuh bersamaan dan di mana saling bersilangan.',
        'Slider N dan M mengatur kedua bilangan itu, dari 2 sampai 11. Ketika kedua bilangan tidak punya faktor bersama, pulsanya hanya bertemu pada ketukan pertama siklus, dan banyaknya langkah kisi kecil yang diperlukan untuk menggambarkan keduanya sekaligus adalah kelipatan persekutuan terkecil (KPK): 3 dan 4 membutuhkan kisi 12, seperti yang ditampilkan di layar. Slider tempo mengatur lamanya satu siklus: simulasi memperlakukan siklus sebagai satu birama empat ketuk pada tempo itu, sehingga pada 60 bpm satu siklus berlangsung 4 sekon apa pun N dan M-nya. Karena itu menaikkan N membuat pulsa atas lebih cepat tetapi tidak memperpanjang siklus.',
        'Ini adalah versi mesin yang sempurna dari sesuatu yang dilakukan musisi dengan rasa. Pemain sungguhan menambahkan aksen, ayunan, dan variasi waktu yang halus, dan dalam banyak tradisi kedua lapisan dimainkan oleh alat musik berbeda dengan bunyi berbeda. Simulasi memberi kedua rel kekerasan yang sama dan jarak yang benar-benar rata, dan selalu memulai keduanya pada ketukan pertama yang sama. Cobalah perlahan dahulu: pada 40 bpm kamu bisa mengetuk satu rel dengan tiap tangan, lalu percepat dan rasakan saat kedua ketukan yang terpisah melebur menjadi satu pola yang bergulir.',
      ],
    },
    figure: {
      caption: {
        en: 'A 3:4 polyrhythm over one cycle. The top row has 3 evenly spaced pulses, the bottom row 4. Both fit on a grid of 12 small steps, the least common multiple, and they sound together only on beat 1.',
        id: 'Poliritme 3:4 dalam satu siklus. Baris atas memiliki 3 pulsa berjarak sama, baris bawah 4. Keduanya pas pada kisi 12 langkah kecil, yaitu KPK-nya, dan berbunyi bersamaan hanya pada ketukan 1.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const x0 = 40, w = 288;
        const dots = (n, cy, color) => Array.from({ length: n }, (_, i) => {
          const x = x0 + (i / n) * w;
          return `<circle cx="${x.toFixed(1)}" cy="${cy}" r="9" fill="${color}"/><text x="${x.toFixed(1)}" y="${cy + 4}" text-anchor="middle" class="n">${i + 1}</text>`;
        }).join('');
        const grid = Array.from({ length: 13 }, (_, i) => `<line x1="${(x0 + (i / 12) * w).toFixed(1)}" y1="150" x2="${(x0 + (i / 12) * w).toFixed(1)}" y2="${i % 4 === 0 || i % 3 === 0 ? 170 : 162}" class="ax"/>`).join('');
        const ticks = (n, color, h) => Array.from({ length: n }, (_, i) => `<rect x="${(x0 + (i / n) * w - 1.5).toFixed(1)}" y="${190 - h}" width="3" height="${h}" fill="${color}"/>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Three against four on a shared timeline', 'Tiga lawan empat pada satu garis waktu')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.n{font-size:10px;font-weight:700;fill:#fff}.s{font-size:10px;opacity:.8}.ax{stroke:currentColor;stroke-width:1;opacity:.5}</style>
  <text x="${x0}" y="22" class="s">${L('3 pulses per cycle', '3 pulsa per siklus')}</text>
  <line x1="${x0}" y1="40" x2="${x0 + w}" y2="40" class="ax"/>
  ${dots(3, 40, '#f59e0b')}
  <text x="${x0}" y="72" class="s">${L('4 pulses per cycle', '4 pulsa per siklus')}</text>
  <line x1="${x0}" y1="90" x2="${x0 + w}" y2="90" class="ax"/>
  ${dots(4, 90, '#3b82f6')}
  <text x="${x0}" y="140" class="s">${L('shared grid: 12 steps = LCM(3, 4)', 'kisi bersama: 12 langkah = KPK(3, 4)')}</text>
  <line x1="${x0}" y1="150" x2="${x0 + w}" y2="150" class="ax"/>
  ${grid}
  <line x1="${x0}" y1="190" x2="${x0 + w}" y2="190" class="ax"/>
  ${ticks(4, '#3b82f6', 14)}
  ${ticks(3, '#f59e0b', 22)}
  <rect x="${x0 - 6}" y="160" width="12" height="36" fill="none" stroke="#ef4444" stroke-width="1.5" rx="3"/>
  <text x="${x0 - 6}" y="212" class="s" fill="#ef4444">${L('together only here', 'bersamaan hanya di sini')}</text>
  <text x="${x0 + w}" y="212" class="s" text-anchor="end">${L('next cycle starts →', 'siklus berikutnya →')}</text>
  <text x="${x0}" y="232" class="s">${L('combined: 3 + 4 − 1 = 6 different click moments', 'gabungan: 3 + 4 − 1 = 6 saat klik yang berbeda')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A polyrhythm is two steady beats of different speeds played at the same time over the same cycle.',
        'If N and M share no common factor, the two beats coincide only on beat 1 and then interlock in between.',
        'The smallest grid that fits both beats has LCM(N, M) steps: 12 for 3:4, 6 for 3:2, 35 for 5:7.',
        'Changing N or M changes how fast each rail pulses, not how long the cycle lasts; the tempo sets the cycle length.',
        'When N divides M (like 2:4) there is no polyrhythm, just one beat subdividing the other.',
      ],
      id: [
        'Poliritme adalah dua ketukan tetap dengan kecepatan berbeda yang dimainkan bersamaan dalam siklus yang sama.',
        'Jika N dan M tidak punya faktor bersama, kedua ketukan hanya bertemu pada ketukan 1 lalu saling bersilangan di antaranya.',
        'Kisi terkecil yang memuat kedua ketukan memiliki KPK(N, M) langkah: 12 untuk 3:4, 6 untuk 3:2, 35 untuk 5:7.',
        'Mengubah N atau M mengubah seberapa cepat tiap rel berdenyut, bukan lamanya siklus; tempo yang mengatur panjang siklus.',
        'Bila N membagi M (seperti 2:4) tidak ada poliritme, hanya satu ketukan yang membagi ketukan lain.',
      ],
    },
    vocabulary: {
      en: [
        ['Pulse', 'One steady, evenly spaced beat, like the tick of a clock.'],
        ['Polyrhythm', 'Two or more different pulses sounding at the same time within the same cycle.'],
        ['Cycle', 'The stretch of time after which the whole pattern repeats; both rails start together at the beginning of each cycle.'],
        ['Tempo', 'How fast the music goes, counted in beats per minute (bpm).'],
        ['Least common multiple (LCM)', 'The smallest number that both N and M divide into; it is the number of grid steps needed to place every pulse of both rails.'],
        ['Hemiola', 'The musical name for three beats against two (or three against four), common in Western classical, Latin and African music.'],
        ['Downbeat', 'The first beat of a cycle, where all the pulses line up.'],
      ],
      id: [
        ['Pulsa', 'Satu ketukan tetap berjarak sama, seperti detak jam.'],
        ['Poliritme', 'Dua pulsa berbeda atau lebih yang berbunyi bersamaan dalam siklus yang sama.'],
        ['Siklus', 'Rentang waktu setelah seluruh pola berulang; kedua rel mulai bersamaan di awal tiap siklus.'],
        ['Tempo', 'Seberapa cepat musik berjalan, dihitung dalam ketukan per menit (bpm).'],
        ['Kelipatan persekutuan terkecil (KPK)', 'Bilangan terkecil yang habis dibagi N maupun M; itulah banyaknya langkah kisi yang diperlukan untuk menempatkan semua pulsa kedua rel.'],
        ['Hemiola', 'Nama musik untuk tiga ketukan lawan dua (atau tiga lawan empat), umum dalam musik klasik Barat, Latin, dan Afrika.'],
        ['Ketukan pertama (downbeat)', 'Ketukan pertama suatu siklus, tempat semua pulsa bertemu.'],
      ],
    },
    misconceptions: {
      en: [
        ['The beats in a 3:4 polyrhythm never line up.', 'They line up once every cycle, on beat 1. In between they fall in different places, which is what gives the pattern its bounce.'],
        ['Making N bigger makes the music slower because there are more beats.', 'The cycle length is fixed by the tempo. More pulses in the same cycle means each pulse is shorter, so the top rail actually gets faster.'],
        ['Any two numbers make a polyrhythm.', 'If one number divides the other, such as 2:4 or 3:6, every pulse of the slower rail lands on a pulse of the faster one, so you only hear one beat with subdivisions.'],
      ],
      id: [
        ['Ketukan dalam poliritme 3:4 tidak pernah bertemu.', 'Keduanya bertemu sekali tiap siklus, pada ketukan 1. Di antaranya keduanya jatuh di tempat berbeda, dan itulah yang membuat polanya terasa melompat.'],
        ['Membesarkan N membuat musik lebih lambat karena ketukannya lebih banyak.', 'Panjang siklus ditetapkan oleh tempo. Lebih banyak pulsa dalam siklus yang sama berarti tiap pulsa lebih pendek, jadi rel atas justru lebih cepat.'],
        ['Dua bilangan apa pun membentuk poliritme.', 'Jika satu bilangan membagi yang lain, seperti 2:4 atau 3:6, setiap pulsa rel yang lebih lambat jatuh tepat pada pulsa rel yang lebih cepat, sehingga yang terdengar hanya satu ketukan yang dibagi-bagi.'],
      ],
    },
    realWorld: {
      en: [
        'West African drumming ensembles and the Afro-Cuban music that grew from them are built on 3-against-2 and 6-against-4 patterns.',
        'In Chopin\'s Fantaisie-Impromptu the right hand plays four notes for every three in the left hand, a famous 4:3.',
        'Drummers practise "three over four" to play triplet fills on the cymbals while the feet keep a steady four.',
        'Walking while listening to music often creates an accidental polyrhythm between your footsteps and the song\'s beat.',
      ],
      id: [
        'Ansambel perkusi Afrika Barat dan musik Afro-Kuba yang tumbuh darinya dibangun di atas pola 3 lawan 2 dan 6 lawan 4.',
        'Dalam Fantaisie-Impromptu karya Chopin, tangan kanan memainkan empat nada untuk setiap tiga nada di tangan kiri, poliritme 4:3 yang terkenal.',
        'Pemain drum melatih "tiga di atas empat" untuk memainkan isian triol di simbal sementara kaki menjaga ketukan empat yang tetap.',
        'Berjalan sambil mendengarkan musik sering menciptakan poliritme tak sengaja antara langkah kakimu dan ketukan lagu.',
      ],
    },
    questions: {
      en: [
        { q: 'In a 3:4 polyrhythm, how many clicks are there in one cycle, and how many times do the two rails click at exactly the same moment?', a: '3 + 4 = 7 clicks, but the two rails click together only once, on beat 1, so you hear 6 different click moments per cycle. The sim\'s combined strip shows the one shared tick at the start.' },
        { q: 'Set the tempo to 60 bpm with N = 3 and M = 4. How long is one cycle, and how far apart are the pulses on each rail?', a: 'The sim treats the cycle as four beats at 60 bpm, so it lasts 4 seconds. The top rail\'s 3 pulses are 4 ÷ 3 ≈ 1.33 s apart; the bottom rail\'s 4 pulses are 4 ÷ 4 = 1 s apart.' },
        { q: 'You set N = 2 and M = 4. Does it sound like a polyrhythm? Explain using the combined strip.', a: 'No. Every pulse of the 2-rail lands exactly on a pulse of the 4-rail, because 4 is a multiple of 2. The combined strip shows no ticks falling between each other, so you hear a single beat with every second pulse doubled, not two competing beats.' },
      ],
      id: [
        { q: 'Dalam poliritme 3:4, berapa banyak klik dalam satu siklus, dan berapa kali kedua rel berbunyi tepat pada saat yang sama?', a: '3 + 4 = 7 klik, tetapi kedua rel berbunyi bersamaan hanya sekali, pada ketukan 1, sehingga terdengar 6 saat klik yang berbeda per siklus. Pita gabungan di simulasi menunjukkan satu tanda bersama itu di awal.' },
        { q: 'Atur tempo ke 60 bpm dengan N = 3 dan M = 4. Berapa lama satu siklus, dan berapa jarak antarpulsa di tiap rel?', a: 'Simulasi memperlakukan siklus sebagai empat ketukan pada 60 bpm, jadi lamanya 4 sekon. Ke-3 pulsa rel atas berjarak 4 ÷ 3 ≈ 1,33 s; ke-4 pulsa rel bawah berjarak 4 ÷ 4 = 1 s.' },
        { q: 'Kamu mengatur N = 2 dan M = 4. Apakah terdengar seperti poliritme? Jelaskan dengan pita gabungan.', a: 'Tidak. Setiap pulsa rel-2 jatuh tepat pada pulsa rel-4, karena 4 adalah kelipatan 2. Pita gabungan tidak menunjukkan tanda yang jatuh di antara tanda lain, sehingga yang terdengar satu ketukan dengan tiap pulsa kedua digandakan, bukan dua ketukan yang bersaing.' },
      ],
    },
  },
};
