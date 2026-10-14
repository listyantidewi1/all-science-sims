// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Measure your simple reaction time (~250 ms typical).',
      'See the +150 ms cost of adding a yes/no decision.',
      'Watch the distribution: lognormal-ish, with rare slow outliers.',
    ],
    id: [
      'Mengukur waktu reaksi sederhana Anda (~250 ms tipikal).',
      'Melihat biaya +150 ms saat menambah keputusan ya/tidak.',
      'Mengamati distribusi: agak lognormal, dengan beberapa pencilan lambat.',
    ],
  },
  tryThis: {
    en: [
      'Simple mode: react when green appears.',
      'Choice mode: only react to green; ignore red.',
      'Run 30 trials and read your mean and distribution.',
    ],
    id: [
      'Mode sederhana: reaksi saat hijau muncul.',
      'Mode pilihan: hanya bereaksi pada hijau; abaikan merah.',
      'Jalankan 30 percobaan dan baca rata-rata serta distribusi.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Reaction time is the gap between a signal appearing and your response to it. It is never zero, because a lot has to happen in between: light from the screen reaches your eye, the signal travels along nerves to the brain, the brain recognises it and decides what to do, a command travels down to the muscles of your hand, and the muscles move your finger. Each stage takes a few tens of milliseconds, and together they add up to about a fifth to a quarter of a second for a simple visual signal, roughly 200 to 250 milliseconds.',
        'The Dutch physiologist Franciscus Donders realised in the 1860s that reaction times can be used to measure thinking. If a task needs an extra mental step, such as deciding whether to respond at all, the extra time it takes tells you how long that step lasts. The sim uses the same idea. In Simple mode the screen always turns green and you click as fast as you can. In Choice mode it turns either green or red, and you must click only for green. Your brain now has to identify the colour and decide before acting, and most people are around 100 to 150 ms slower.',
        'The sim waits a random time between 0.8 and 3.2 s before showing the colour, so you cannot guess the moment; clicking early counts as a false start and is not recorded. Every valid trial goes into a histogram at the bottom. After thirty or so trials you will see that the distribution is not symmetrical: most times bunch near your fastest, but a tail of slow trials stretches to the right, caused by moments of lost attention. Because of this tail the mean is pulled above the median, so the median is often the fairer summary of how fast you are.',
        'Keep the limits in mind. The timer includes the time your screen takes to change colour and the time your mouse or touchscreen takes to report the click, which together can add several tens of milliseconds, so your real reaction time is a little shorter than the number shown. The Choice mode is technically a "go/no-go" task, because there is only one response and the choice is whether to make it; a true choice task would use two different buttons. The sim also records only correct trials, and a red trial that you correctly ignore is not counted at all.',
      ],
      id: [
        'Waktu reaksi adalah selang antara munculnya sinyal dan responsmu terhadapnya. Nilainya tidak pernah nol, karena banyak yang harus terjadi di antaranya: cahaya dari layar mencapai mata, sinyal menjalar melalui saraf ke otak, otak mengenalinya dan memutuskan apa yang dilakukan, perintah turun ke otot tangan, dan otot menggerakkan jari. Setiap tahap memakan beberapa puluh milidetik, dan seluruhnya berjumlah sekitar seperlima sampai seperempat detik untuk sinyal visual sederhana, kira-kira 200 sampai 250 milidetik.',
        'Ahli fisiologi Belanda Franciscus Donders menyadari pada 1860-an bahwa waktu reaksi bisa dipakai untuk mengukur proses berpikir. Jika suatu tugas memerlukan satu langkah mental tambahan, misalnya memutuskan apakah harus merespons atau tidak, waktu tambahan yang diperlukan memberi tahu berapa lama langkah itu berlangsung. Simulasi memakai gagasan yang sama. Pada mode Simple, layar selalu berubah hijau dan kamu mengklik secepat mungkin. Pada mode Choice, layar berubah hijau atau merah, dan kamu hanya boleh mengklik untuk hijau. Otakmu kini harus mengenali warna dan memutuskan sebelum bertindak, dan kebanyakan orang menjadi sekitar 100 sampai 150 ms lebih lambat.',
        'Simulasi menunggu waktu acak antara 0,8 dan 3,2 s sebelum menampilkan warna, sehingga kamu tidak bisa menebak saatnya; mengklik terlalu awal dihitung sebagai start salah dan tidak dicatat. Setiap percobaan yang sah masuk ke histogram di bagian bawah. Setelah sekitar tiga puluh percobaan kamu akan melihat sebarannya tidak simetris: sebagian besar waktu berkumpul dekat waktu tercepatmu, tetapi ada ekor percobaan lambat yang memanjang ke kanan, akibat saat-saat perhatian teralih. Karena ekor ini, rata-rata tertarik ke atas median, sehingga median sering menjadi ringkasan yang lebih adil tentang seberapa cepat kamu.',
        'Ingat batasannya. Pencatat waktu mencakup waktu layar berubah warna dan waktu tetikus atau layar sentuh melaporkan klik, yang bersama-sama bisa menambah beberapa puluh milidetik, sehingga waktu reaksi sebenarnya sedikit lebih pendek daripada angka yang ditampilkan. Mode Choice secara teknis adalah tugas "go/no-go", karena hanya ada satu respons dan pilihannya adalah melakukannya atau tidak; tugas pilihan sejati memakai dua tombol berbeda. Simulasi juga hanya mencatat percobaan yang benar, dan percobaan merah yang berhasil kamu abaikan tidak dihitung sama sekali.',
      ],
    },
    figure: {
      caption: {
        en: 'Reaction times are not all the same. Simple reactions (blue) cluster around 250 ms with a tail of slow trials to the right; adding a decision (purple) shifts the whole distribution later by about 150 ms. The tail pulls the mean above the median.',
        id: 'Waktu reaksi tidak selalu sama. Reaksi sederhana (biru) berkumpul di sekitar 250 ms dengan ekor percobaan lambat di kanan; menambahkan keputusan (ungu) menggeser seluruh sebaran sekitar 150 ms lebih lambat. Ekor itu menarik rata-rata ke atas median.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const x = (ms) => 40 + (ms - 100) * 0.5;
        const bars = (start, hs, fill, op) => hs.map((h, i) => `<rect x="${x(start + i * 25) + 0.5}" y="${170 - h * 1.4}" width="11.5" height="${h * 1.4}" fill="${fill}" opacity="${op}"/>`).join('\n  ');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Reaction time histograms for simple and choice tasks', 'Histogram waktu reaksi untuk tugas sederhana dan pilihan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.ax{stroke:currentColor;stroke-width:1.2;fill:none}</style>
  ${bars(175, [4, 12, 30, 56, 70, 58, 40, 26, 16, 10, 6, 4], '#3b82f6', '.85')}
  ${bars(300, [3, 8, 20, 40, 56, 60, 46, 32, 20, 13, 8, 5, 3], '#8b5cf6', '.6')}
  <line x1="40" y1="170" x2="340" y2="170" class="ax"/>
  <text x="${x(100) - 4}" y="186" class="s">100</text>
  <text x="${x(200) - 8}" y="186" class="s">200</text>
  <text x="${x(300) - 8}" y="186" class="s">300</text>
  <text x="${x(400) - 8}" y="186" class="s">400</text>
  <text x="${x(500) - 8}" y="186" class="s">500</text>
  <text x="${x(600) - 8}" y="186" class="s">600</text>
  <text x="${x(700) - 8}" y="186" class="s">700</text>
  <text x="130" y="204">${L('reaction time (milliseconds)', 'waktu reaksi (milidetik)')}</text>
  <text x="${x(175)}" y="40" fill="#3b82f6">${L('simple: react to any flash', 'sederhana: bereaksi pada kedipan apa pun')}</text>
  <text x="${x(330)}" y="62" fill="#8b5cf6">${L('choice: decide first', 'pilihan: putuskan dulu')}</text>
  <line x1="${x(265)}" y1="70" x2="${x(265)}" y2="170" stroke="#3b82f6" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="${x(415)}" y1="70" x2="${x(415)}" y2="170" stroke="#8b5cf6" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="${x(265)}" y1="76" x2="${x(412)}" y2="76" stroke="currentColor" stroke-width="1.4" marker-end="url(#a)"/>
  <text x="${x(280)}" y="90" class="s">${L('about +150 ms for the decision', 'sekitar +150 ms untuk keputusan')}</text>
  <text x="${x(440)}" y="150" class="s" opacity=".8">${L('slow tail: lapses of attention', 'ekor lambat: perhatian teralih')}</text>
  <text x="40" y="226" class="s">${L('typical simple visual reaction: 200–250 ms; the screen and mouse add a few tens of ms', 'reaksi visual sederhana tipikal: 200–250 ms; layar dan tetikus menambah beberapa puluh ms')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A simple visual reaction takes about 200 to 250 ms, because sensing, deciding and moving each take time.',
        'Adding a decision (react to green, not red) adds roughly 100 to 150 ms; the extra time measures the decision.',
        'Reaction times vary from trial to trial and the distribution is skewed, with a tail of slow trials.',
        'The median is usually a better summary than the mean, because a few very slow trials drag the mean upward.',
        'The sim measures your reaction plus the screen and input lag of your device, so the numbers are slightly inflated.',
      ],
      id: [
        'Reaksi visual sederhana memakan sekitar 200 sampai 250 ms, karena merasakan, memutuskan, dan bergerak masing-masing butuh waktu.',
        'Menambahkan keputusan (bereaksi pada hijau, bukan merah) menambah kira-kira 100 sampai 150 ms; waktu tambahan itu mengukur keputusannya.',
        'Waktu reaksi berbeda dari percobaan ke percobaan dan sebarannya miring, dengan ekor percobaan lambat.',
        'Median biasanya ringkasan yang lebih baik daripada rata-rata, karena beberapa percobaan yang sangat lambat menyeret rata-rata ke atas.',
        'Simulasi mengukur reaksimu ditambah jeda layar dan masukan perangkatmu, sehingga angkanya sedikit lebih besar dari yang sebenarnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Reaction time', 'The time between a stimulus appearing and the start of the response to it, usually measured in milliseconds.'],
        ['Stimulus', 'The signal you respond to, such as the screen turning green.'],
        ['Simple reaction task', 'One stimulus, one response: react as soon as anything appears.'],
        ['Go/no-go task', 'Respond to one kind of stimulus and withhold the response to another; the sim\'s "Choice" mode is this type.'],
        ['False start', 'Responding before the stimulus appears, by guessing the timing.'],
        ['Millisecond (ms)', 'One thousandth of a second; a blink lasts about 100 to 150 ms.'],
        ['Median', 'The middle value when all your times are sorted; half the trials were faster and half slower.'],
        ['Skewed distribution', 'A histogram with a longer tail on one side, here the slow side.'],
      ],
      id: [
        ['Waktu reaksi', 'Waktu antara munculnya stimulus dan awal respons terhadapnya, biasanya diukur dalam milidetik.'],
        ['Stimulus', 'Sinyal yang kamu respons, seperti layar yang berubah hijau.'],
        ['Tugas reaksi sederhana', 'Satu stimulus, satu respons: bereaksi segera setelah apa pun muncul.'],
        ['Tugas go/no-go', 'Merespons satu jenis stimulus dan menahan respons untuk jenis lainnya; mode "Choice" di simulasi termasuk jenis ini.'],
        ['Start salah', 'Merespons sebelum stimulus muncul, dengan menebak waktunya.'],
        ['Milidetik (ms)', 'Seperseribu detik; satu kedipan mata berlangsung sekitar 100 sampai 150 ms.'],
        ['Median', 'Nilai tengah ketika semua waktumu diurutkan; separuh percobaan lebih cepat dan separuh lebih lambat.'],
        ['Sebaran miring', 'Histogram dengan ekor yang lebih panjang di satu sisi, di sini sisi lambat.'],
      ],
    },
    misconceptions: {
      en: [
        ['A fast person reacts instantly, in zero time.', 'Nobody does. Nerve signals travel at limited speed and the brain needs time to process, so even elite athletes need well over 100 ms to react to a starting gun; a sprint start faster than that is ruled a false start.'],
        ['Your reaction time is one fixed number.', 'It varies from trial to trial by tens of milliseconds, depending on attention, fatigue and chance. That is why the sim collects many trials and shows a distribution rather than a single value.'],
        ['The mean is the best way to summarise reaction times.', 'A few very slow trials pull the mean upward, so the mean can be misleading. The median ignores those outliers and better reflects your typical speed.'],
        ['Reaction time and reflexes are the same thing.', 'A reflex, like the knee jerk, is handled by the spinal cord without the brain and takes under 50 ms. Reacting to a colour on a screen needs the brain to see, recognise and decide, which is why it takes several times longer.'],
      ],
      id: [
        ['Orang yang cepat bereaksi secara instan, tanpa waktu tunda.', 'Tidak ada yang begitu. Sinyal saraf menjalar dengan kecepatan terbatas dan otak butuh waktu memproses, sehingga atlet elit pun butuh jauh lebih dari 100 ms untuk bereaksi pada pistol start; start sprint yang lebih cepat dari itu dinyatakan sebagai start salah.'],
        ['Waktu reaksimu adalah satu angka tetap.', 'Nilainya berubah dari percobaan ke percobaan sebesar puluhan milidetik, bergantung pada perhatian, kelelahan, dan kebetulan. Itulah sebabnya simulasi mengumpulkan banyak percobaan dan menampilkan sebaran, bukan satu nilai.'],
        ['Rata-rata adalah cara terbaik meringkas waktu reaksi.', 'Beberapa percobaan yang sangat lambat menarik rata-rata ke atas, sehingga rata-rata bisa menyesatkan. Median mengabaikan pencilan itu dan lebih mencerminkan kecepatan tipikalmu.'],
        ['Waktu reaksi dan refleks itu sama.', 'Refleks, seperti sentakan lutut, ditangani sumsum tulang belakang tanpa otak dan berlangsung di bawah 50 ms. Bereaksi pada warna di layar memerlukan otak untuk melihat, mengenali, dan memutuskan, karena itu memakan waktu beberapa kali lebih lama.'],
      ],
    },
    realWorld: {
      en: [
        'Road safety: at 60 km/h a car travels about 17 metres per second, so a driver\'s reaction time of one second (longer than in the lab, because they are not expecting the hazard) adds 17 metres before braking even begins.',
        'Athletics: starting blocks measure reaction time, and a start under 100 ms after the gun is treated as a false start because no one can react that quickly.',
        'Video games and e-sports: competitive players train and measure reaction times, and display and controller lag of tens of milliseconds can decide a match.',
        'Medicine: slowed reaction time is an early sign of fatigue, alcohol and some illnesses, and simple tests like this one are used to screen for them.',
      ],
      id: [
        'Keselamatan jalan: pada 60 km/jam mobil menempuh sekitar 17 meter per detik, sehingga waktu reaksi pengemudi satu detik (lebih lama daripada di laboratorium, karena bahaya tidak terduga) menambah 17 meter sebelum pengereman dimulai.',
        'Atletik: balok start mengukur waktu reaksi, dan start di bawah 100 ms setelah pistol dianggap start salah karena tidak ada yang bisa bereaksi secepat itu.',
        'Gim video dan e-sport: pemain kompetitif melatih dan mengukur waktu reaksi, dan jeda layar serta pengendali sebesar puluhan milidetik bisa menentukan hasil pertandingan.',
        'Kedokteran: waktu reaksi yang melambat adalah tanda awal kelelahan, alkohol, dan beberapa penyakit, dan tes sederhana seperti ini dipakai untuk menyaringnya.',
      ],
    },
    questions: {
      en: [
        { q: 'Your five simple-mode times are 230, 245, 250, 260 and 515 ms. What are the mean and the median, and which describes you better?', a: 'The mean is (230 + 245 + 250 + 260 + 515) / 5 = 300 ms; the median is the middle value, 250 ms. One slow trial of 515 ms (probably a lapse of attention) pulled the mean up by 50 ms, so the median of 250 ms describes your usual speed better.' },
        { q: 'Your median is 240 ms in Simple mode and 390 ms in Choice mode. What does the difference tell you?', a: 'The 150 ms difference is roughly the time your brain needs to identify the colour and decide whether to click. The sensing and moving parts are the same in both modes, so the extra time belongs to the decision, which is Donders\' subtraction idea.' },
        { q: 'Why does the sim wait a random time (between 0.8 and 3.2 s) before the screen changes colour instead of always waiting 2 s?', a: 'If the wait were always the same, you could learn the rhythm and click at the right moment without seeing the colour at all, which would measure your timing, not your reaction. A random wait forces you to respond to the stimulus itself; guessing early shows up as a false start.' },
      ],
      id: [
        { q: 'Lima waktu mode sederhanamu adalah 230, 245, 250, 260, dan 515 ms. Berapa rata-rata dan mediannya, dan mana yang lebih menggambarkan dirimu?', a: 'Rata-ratanya (230 + 245 + 250 + 260 + 515) / 5 = 300 ms; mediannya adalah nilai tengah, 250 ms. Satu percobaan lambat 515 ms (mungkin perhatian teralih) menarik rata-rata naik 50 ms, sehingga median 250 ms lebih menggambarkan kecepatanmu yang biasa.' },
        { q: 'Medianmu 240 ms pada mode Simple dan 390 ms pada mode Choice. Apa arti selisihnya?', a: 'Selisih 150 ms itu kira-kira waktu yang dibutuhkan otakmu untuk mengenali warna dan memutuskan apakah mengklik. Bagian merasakan dan bergerak sama di kedua mode, sehingga waktu tambahan itu milik keputusan, inilah gagasan pengurangan Donders.' },
        { q: 'Mengapa simulasi menunggu waktu acak (antara 0,8 dan 3,2 s) sebelum layar berubah warna, bukan selalu 2 s?', a: 'Jika waktu tunggunya selalu sama, kamu bisa mempelajari iramanya dan mengklik di saat yang tepat tanpa melihat warnanya sama sekali, sehingga yang terukur adalah ketepatan waktumu, bukan reaksimu. Waktu tunggu acak memaksamu merespons stimulus itu sendiri; menebak terlalu awal muncul sebagai start salah.' },
      ],
    },
  },
};
