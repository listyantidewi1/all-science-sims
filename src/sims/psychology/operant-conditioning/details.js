// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish ratio schedules (based on responses) from interval schedules (based on time).',
      'Read a cumulative record: slope = response rate, tick marks = reinforcers.',
      'Match each schedule to its signature pattern: break-and-run, steady rate, scallop.',
    ],
    id: [
      'Membedakan jadwal rasio (berdasar jumlah respons) dari jadwal interval (berdasar waktu).',
      'Membaca rekaman kumulatif: kemiringan = laju respons, tanda garis = penguat.',
      'Mencocokkan tiap jadwal dengan pola khasnya: jeda-dan-lari, laju stabil, scallop.',
    ],
  },
  tryThis: {
    en: [
      'Run FI 10 s with the simulated rat and watch the scallop: slow after food, fast near the deadline.',
      'Switch to VR 10 — why does the rat never pause? Compare responses per minute with FR 10.',
      'Turn the rat off and press the lever yourself on FI. Can you earn food with fewer presses?',
    ],
    id: [
      'Jalankan FI 10 s dengan tikus simulasi dan amati scallop: lambat setelah makan, cepat mendekati tenggat.',
      'Ganti ke VR 10 — mengapa tikus tidak pernah berhenti? Bandingkan respons per menit dengan FR 10.',
      'Matikan tikus dan tekan tuas sendiri pada FI. Bisakah Anda mendapat makanan dengan lebih sedikit tekanan?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Operant conditioning is learning from consequences: a behaviour that is followed by something rewarding is repeated more often, and one followed by something unpleasant less often. B. F. Skinner studied this with an operant chamber, now called a Skinner box, in which a rat presses a lever or a pigeon pecks a key and a feeder sometimes delivers a pellet. The pellet is a reinforcer, and the rule deciding which presses earn a pellet is the schedule of reinforcement. Skinner found that the schedule, more than the size of the reward, shapes the pattern of behaviour.',
        'Schedules come in two families. Ratio schedules count responses: a fixed ratio (FR 10) pays after every tenth press, while a variable ratio (VR 10) pays after a number of presses that varies around ten. Interval schedules count time: a fixed interval (FI 10 s) pays the first press made after ten seconds have passed since the last pellet, and a variable interval (VI 10 s) does the same with waiting times that vary around ten seconds. Pressing faster earns more under ratio schedules but earns nothing extra under interval schedules, and animals behave as if they know it.',
        'Skinner plotted behaviour on a cumulative record: time runs along the bottom, every press moves the pen up one step, and a small tick marks each reinforcer. The slope therefore shows response rate, and a flat stretch is a pause. Each schedule has a signature. FR gives a pause after each pellet and then a rapid run to the next one. VR gives a steady, very high rate with no pauses, because the next press might always be the one that pays. FI gives a scallop: almost nothing right after a pellet, then faster and faster pressing as the interval runs out. VI gives a steady, moderate rate.',
        'In the simulation you choose the schedule and its parameter, then either press the lever yourself or switch on the simulated rat. The rat is scripted rather than taught: its pressing rate follows the textbook pattern for the chosen schedule (slow after food on FR and FI, steady on VR and VI), so you can see the signatures clearly without waiting hours for a real animal to learn them. Real animals acquire these patterns gradually, get full and slow down, and respond to many things the sim leaves out, such as the sound of the feeder or the lighting; the sim also never runs extinction, in which reinforcement stops entirely.',
      ],
      id: [
        'Pengondisian operan adalah belajar dari konsekuensi: perilaku yang diikuti sesuatu yang menyenangkan akan lebih sering diulang, dan yang diikuti sesuatu yang tidak menyenangkan akan berkurang. B. F. Skinner mempelajarinya dengan kamar operan, yang kini disebut kotak Skinner, tempat tikus menekan tuas atau merpati mematuk tombol dan pemberi makanan sesekali mengeluarkan pelet. Pelet itu adalah penguat, dan aturan yang menentukan tekanan mana yang menghasilkan pelet disebut jadwal penguatan. Skinner menemukan bahwa jadwal, lebih daripada besarnya hadiah, yang membentuk pola perilaku.',
        'Jadwal terbagi dalam dua keluarga. Jadwal rasio menghitung respons: rasio tetap (FR 10) membayar setelah setiap tekanan kesepuluh, sedangkan rasio variabel (VR 10) membayar setelah jumlah tekanan yang bervariasi di sekitar sepuluh. Jadwal interval menghitung waktu: interval tetap (FI 10 s) membayar tekanan pertama setelah sepuluh detik berlalu sejak pelet terakhir, dan interval variabel (VI 10 s) melakukan hal yang sama dengan waktu tunggu yang bervariasi di sekitar sepuluh detik. Menekan lebih cepat menghasilkan lebih banyak pada jadwal rasio tetapi tidak menambah apa pun pada jadwal interval, dan hewan berperilaku seolah mengetahuinya.',
        'Skinner memplot perilaku pada rekaman kumulatif: waktu berjalan di sumbu bawah, setiap tekanan menaikkan pena satu langkah, dan tanda kecil menandai tiap penguat. Kemiringan garis menunjukkan laju respons, dan bagian yang datar adalah jeda. Setiap jadwal punya ciri khas. FR memberi jeda setelah tiap pelet lalu lari cepat menuju pelet berikutnya. VR memberi laju yang stabil dan sangat tinggi tanpa jeda, karena tekanan berikutnya selalu mungkin menjadi yang membayar. FI memberi scallop: hampir tidak ada tekanan tepat setelah pelet, lalu makin cepat seiring interval hampir habis. VI memberi laju sedang yang stabil.',
        'Dalam simulasi kamu memilih jadwal dan parameternya, lalu menekan tuas sendiri atau menyalakan tikus simulasi. Tikus ini diskenariokan, bukan dilatih: laju tekanannya mengikuti pola buku teks untuk jadwal yang dipilih (lambat setelah makan pada FR dan FI, stabil pada VR dan VI), sehingga kamu bisa melihat ciri khasnya dengan jelas tanpa menunggu berjam-jam sampai hewan sungguhan mempelajarinya. Hewan sungguhan memperoleh pola ini secara bertahap, menjadi kenyang dan melambat, dan merespons banyak hal yang diabaikan simulasi, seperti bunyi pemberi makanan atau pencahayaan; simulasi juga tidak pernah menjalankan pemadaman, ketika penguatan dihentikan sama sekali.',
      ],
    },
    figure: {
      caption: {
        en: 'Cumulative records for the four basic schedules. Each press raises the line one step; ticks mark reinforcers. FR: pause then run. VR: steady high rate. FI: scallop that speeds up toward the end of each interval. VI: steady moderate rate.',
        id: 'Rekaman kumulatif untuk empat jadwal dasar. Setiap tekanan menaikkan garis satu langkah; tanda kecil menandai penguat. FR: jeda lalu lari. VR: laju tinggi yang stabil. FI: scallop yang makin cepat menjelang akhir tiap interval. VI: laju sedang yang stabil.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Cumulative records for FR, VR, FI and VI schedules', 'Rekaman kumulatif untuk jadwal FR, VR, FI, dan VI')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.5}.t{stroke:#f59e0b;stroke-width:1.6}</style>
  <path d="M20 100 L20 20 M20 100 L170 100" class="ax"/>
  <text x="24" y="18" font-weight="bold">${L('FR 10: pause, then run', 'FR 10: jeda, lalu lari')}</text>
  <polyline points="20,100 44,100 60,68 84,68 100,36 124,36 140,4" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <path d="M60 68 L66 76 M100 36 L106 44" class="t"/>
  <text x="140" y="112" class="s" opacity=".8">${L('time', 'waktu')}</text>
  <path d="M200 100 L200 20 M200 100 L350 100" class="ax"/>
  <text x="204" y="18" font-weight="bold">${L('VR 10: steady, high', 'VR 10: stabil, tinggi')}</text>
  <polyline points="200,100 230,76 262,50 290,28 320,8" fill="none" stroke="#10b981" stroke-width="2"/>
  <path d="M224 80 L230 88 M250 60 L256 68 M284 33 L290 41 M310 14 L316 22" class="t"/>
  <path d="M20 220 L20 140 M20 220 L170 220" class="ax"/>
  <text x="24" y="138" font-weight="bold">${L('FI 10 s: scallop', 'FI 10 s: scallop')}</text>
  <path d="M20 220 L40 219 L52 214 L60 204 L66 190 L70 178 L96 177 L108 172 L116 162 L122 148 L126 136" fill="none" stroke="#8b5cf6" stroke-width="2"/>
  <path d="M70 178 L76 186 M126 136 L132 144" class="t"/>
  <text x="80" y="206" class="s" opacity=".8">${L('slow after food,', 'lambat setelah makan,')}</text>
  <text x="80" y="217" class="s" opacity=".8">${L('fast before deadline', 'cepat menjelang tenggat')}</text>
  <path d="M200 220 L200 140 M200 220 L350 220" class="ax"/>
  <text x="204" y="138" font-weight="bold">${L('VI 10 s: steady, moderate', 'VI 10 s: stabil, sedang')}</text>
  <polyline points="200,220 240,204 280,188 320,172 350,160" fill="none" stroke="#ef4444" stroke-width="2"/>
  <path d="M222 211 L228 219 M268 193 L274 201 M296 182 L302 190 M334 166 L340 174" class="t"/>
  <text x="6" y="70" class="s" transform="rotate(-90 6 70)">${L('presses', 'tekanan')}</text>
  <text x="236" y="236" class="s" fill="#f59e0b">${L('tick = reinforcer', 'tanda = penguat')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Behaviour followed by a reinforcer becomes more frequent; the schedule that delivers the reinforcer shapes the pattern of responding.',
        'Ratio schedules reward counts of responses and produce high rates; interval schedules reward the first response after a time has passed and produce lower rates.',
        'Fixed schedules produce pauses or scallops after each reinforcer, because the animal learns that the next reward is not yet available; variable schedules produce steady responding.',
        'On a cumulative record the slope is the response rate: steep means fast pressing, flat means a pause.',
        'Variable-ratio schedules produce the highest, most persistent responding and are the hardest to extinguish.',
      ],
      id: [
        'Perilaku yang diikuti penguat menjadi lebih sering; jadwal yang menyalurkan penguat membentuk pola respons.',
        'Jadwal rasio mengganjar jumlah respons dan menghasilkan laju tinggi; jadwal interval mengganjar respons pertama setelah waktu tertentu berlalu dan menghasilkan laju lebih rendah.',
        'Jadwal tetap menghasilkan jeda atau scallop setelah tiap penguat, karena hewan belajar bahwa hadiah berikutnya belum tersedia; jadwal variabel menghasilkan respons yang stabil.',
        'Pada rekaman kumulatif, kemiringan adalah laju respons: curam berarti menekan cepat, datar berarti jeda.',
        'Jadwal rasio variabel menghasilkan respons tertinggi dan paling gigih serta paling sulit dipadamkan.',
      ],
    },
    vocabulary: {
      en: [
        ['Reinforcer', 'Any consequence that makes the behaviour it follows more likely, such as a food pellet for a hungry rat.'],
        ['Positive reinforcement', 'Adding something pleasant after a behaviour (food after a press) to strengthen it.'],
        ['Negative reinforcement', 'Removing something unpleasant after a behaviour (a shock stops when the lever is pressed) to strengthen it; it is not punishment.'],
        ['Punishment', 'A consequence that makes a behaviour less likely.'],
        ['Schedule of reinforcement', 'The rule that decides which responses, or which moments, earn a reinforcer.'],
        ['Fixed ratio (FR) / variable ratio (VR)', 'Reinforcement after a set number of responses (FR) or after a number that varies around an average (VR).'],
        ['Fixed interval (FI) / variable interval (VI)', 'Reinforcement for the first response after a set time (FI) or after a time that varies around an average (VI).'],
        ['Cumulative record', 'A graph that steps up with every response; its slope is the response rate and ticks mark reinforcers.'],
      ],
      id: [
        ['Penguat', 'Konsekuensi apa pun yang membuat perilaku yang mendahuluinya lebih mungkin terjadi, seperti pelet makanan bagi tikus lapar.'],
        ['Penguatan positif', 'Menambahkan sesuatu yang menyenangkan setelah perilaku (makanan setelah menekan) untuk memperkuatnya.'],
        ['Penguatan negatif', 'Menghilangkan sesuatu yang tidak menyenangkan setelah perilaku (kejutan listrik berhenti saat tuas ditekan) untuk memperkuatnya; ini bukan hukuman.'],
        ['Hukuman', 'Konsekuensi yang membuat perilaku lebih jarang terjadi.'],
        ['Jadwal penguatan', 'Aturan yang menentukan respons mana, atau saat mana, yang menghasilkan penguat.'],
        ['Rasio tetap (FR) / rasio variabel (VR)', 'Penguatan setelah sejumlah respons yang tetap (FR) atau setelah jumlah yang bervariasi di sekitar rata-rata (VR).'],
        ['Interval tetap (FI) / interval variabel (VI)', 'Penguatan untuk respons pertama setelah waktu tertentu (FI) atau setelah waktu yang bervariasi di sekitar rata-rata (VI).'],
        ['Rekaman kumulatif', 'Grafik yang naik satu langkah pada setiap respons; kemiringannya adalah laju respons dan tanda kecil menandai penguat.'],
      ],
    },
    misconceptions: {
      en: [
        ['Negative reinforcement is a polite name for punishment.', 'Negative reinforcement strengthens a behaviour by removing something unpleasant (fastening a seatbelt stops the beeping). Punishment weakens a behaviour. "Negative" refers to taking something away, not to being bad.'],
        ['Rewarding every single response is the best way to make a habit last.', 'Continuous reinforcement teaches quickly but extinguishes quickly too. Behaviour learned on a variable schedule, where rewards are unpredictable, persists far longer when the rewards stop.'],
        ['On a fixed-interval schedule the animal presses steadily throughout the interval.', 'It does not. After a pellet the animal barely responds, then accelerates as the interval nears its end, producing the scallop. Steady responding is the signature of variable schedules.'],
        ['The simulated rat in this sim has learned the schedule.', 'It has not; its pressing rate is scripted from textbook patterns so that the signatures appear immediately. A real rat shows the same patterns only after many sessions of training.'],
      ],
      id: [
        ['Penguatan negatif adalah nama halus untuk hukuman.', 'Penguatan negatif memperkuat perilaku dengan menghilangkan sesuatu yang tidak menyenangkan (memasang sabuk pengaman menghentikan bunyi bip). Hukuman melemahkan perilaku. "Negatif" berarti mengambil sesuatu, bukan berarti buruk.'],
        ['Mengganjar setiap respons adalah cara terbaik membuat kebiasaan bertahan.', 'Penguatan berkelanjutan mengajarkan dengan cepat tetapi juga cepat padam. Perilaku yang dipelajari pada jadwal variabel, dengan hadiah yang tak terduga, bertahan jauh lebih lama ketika hadiah berhenti.'],
        ['Pada jadwal interval tetap, hewan menekan dengan stabil sepanjang interval.', 'Tidak. Setelah pelet, hewan hampir tidak merespons, lalu makin cepat saat interval hampir berakhir, menghasilkan scallop. Respons stabil adalah ciri jadwal variabel.'],
        ['Tikus simulasi dalam simulasi ini telah mempelajari jadwalnya.', 'Belum; laju tekanannya diskenariokan dari pola buku teks agar ciri khasnya langsung muncul. Tikus sungguhan menunjukkan pola yang sama hanya setelah banyak sesi pelatihan.'],
      ],
    },
    realWorld: {
      en: [
        'Slot machines and loot boxes pay out on a variable-ratio schedule, which is why players keep pulling the lever through long losing streaks.',
        'Piecework pay (a fixed amount per item made) is a fixed-ratio schedule and produces fast work with short breaks after each batch.',
        'Checking for a weekly test result or a monthly salary is fixed-interval behaviour: little checking early, frantic checking as the date approaches.',
        'Refreshing a social media feed is variable-interval reinforcement: new posts arrive at unpredictable times, so people check at a steady, moderate rate all day.',
      ],
      id: [
        'Mesin slot dan loot box membayar dengan jadwal rasio variabel, karena itu pemain terus menarik tuas meski kalah berkali-kali.',
        'Upah borongan (jumlah tetap per barang yang dibuat) adalah jadwal rasio tetap dan menghasilkan kerja cepat dengan istirahat singkat setelah tiap kelompok barang.',
        'Mengecek hasil ujian mingguan atau gaji bulanan adalah perilaku interval tetap: jarang mengecek di awal, mengecek terus-menerus saat tanggalnya mendekat.',
        'Menyegarkan lini masa media sosial adalah penguatan interval variabel: unggahan baru datang pada waktu tak terduga, sehingga orang mengecek dengan laju sedang yang stabil sepanjang hari.',
      ],
    },
    questions: {
      en: [
        { q: 'On FI 10 s, what is the smallest number of presses per minute that still earns every available pellet, and why does the simulated rat press far more than that?', a: 'Six: one press just after each ten-second interval has elapsed. The rat presses more because it cannot tell time exactly, so it starts pressing early and speeds up as the interval nears its end; this produces the scallop. Any press before the deadline is wasted, which is why interval schedules give lower rates than ratio schedules.' },
        { q: 'A rat presses at about 4 presses per second on both FR 10 and VR 10. Why does FR 10 still produce fewer responses per minute?', a: 'Because of the post-reinforcement pause. On FR the rat knows the next pellet is ten presses away and rests after each one, and these flat stretches lower the average rate. On VR the next press might pay immediately, so there is no pause and the cumulative record is a straight steep line.' },
        { q: 'A teacher wants students to keep reading at home even after the weekly reward stickers stop. Which schedule should she use during the term, and what does the sim suggest about the pattern of behaviour it will produce?', a: 'A variable schedule, such as awarding stickers after an unpredictable number of reading logs (VR). The sim shows VR produces steady responding with no pauses, and variable schedules are also the most resistant to extinction, so reading is more likely to continue when the stickers stop. A fixed weekly check (FI) would instead produce a burst of reading just before each check.' },
      ],
      id: [
        { q: 'Pada FI 10 s, berapa jumlah tekanan per menit paling sedikit yang tetap menghasilkan semua pelet yang tersedia, dan mengapa tikus simulasi menekan jauh lebih banyak dari itu?', a: 'Enam: satu tekanan tepat setelah tiap interval sepuluh detik berlalu. Tikus menekan lebih banyak karena tidak bisa mengukur waktu dengan tepat, sehingga mulai menekan lebih awal dan makin cepat saat interval hampir habis; inilah yang menghasilkan scallop. Tekanan sebelum tenggat sia-sia, karena itu jadwal interval memberi laju lebih rendah daripada jadwal rasio.' },
        { q: 'Seekor tikus menekan sekitar 4 tekanan per detik baik pada FR 10 maupun VR 10. Mengapa FR 10 tetap menghasilkan lebih sedikit respons per menit?', a: 'Karena jeda pasca-penguatan. Pada FR, tikus tahu pelet berikutnya masih sepuluh tekanan lagi dan beristirahat setelah tiap pelet, dan bagian datar ini menurunkan laju rata-rata. Pada VR, tekanan berikutnya mungkin langsung membayar, sehingga tidak ada jeda dan rekaman kumulatifnya berupa garis lurus yang curam.' },
        { q: 'Seorang guru ingin siswa terus membaca di rumah bahkan setelah stiker hadiah mingguan dihentikan. Jadwal mana yang sebaiknya ia pakai selama semester, dan apa yang disarankan simulasi tentang pola perilaku yang akan dihasilkan?', a: 'Jadwal variabel, misalnya memberi stiker setelah sejumlah catatan membaca yang tidak dapat diduga (VR). Simulasi menunjukkan VR menghasilkan respons stabil tanpa jeda, dan jadwal variabel juga paling tahan terhadap pemadaman, sehingga membaca lebih mungkin berlanjut saat stiker berhenti. Pemeriksaan mingguan yang tetap (FI) justru akan menghasilkan ledakan membaca tepat sebelum tiap pemeriksaan.' },
      ],
    },
  },
};
