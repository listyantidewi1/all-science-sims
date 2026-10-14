// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Describe the N-back task and what it demands of working memory updating.',
      'Classify each response as a hit, miss, false alarm, or correct rejection and compute d′.',
      'Show how performance drops as N rises and relate this to a limited-capacity buffer.',
    ],
    id: [
      'Menjelaskan tugas N-back dan tuntutannya pada pembaruan memori kerja.',
      'Mengklasifikasikan tiap respons sebagai hit, miss, alarm palsu, atau penolakan benar dan menghitung d′.',
      'Menunjukkan penurunan kinerja saat N naik dan mengaitkannya dengan penyangga berkapasitas terbatas.',
    ],
  },
  tryThis: {
    en: [
      'Run N = 1, then 2, 3, and 4 with letters. Where does d′ collapse?',
      'Switch to positions at N = 2. Is spatial N-back easier or harder for you?',
      'Slow the pace to 3 s per item at N = 3. Does extra time help, or does the buffer still overflow?',
    ],
    id: [
      'Jalankan N = 1, lalu 2, 3, dan 4 dengan huruf. Di mana d′ runtuh?',
      'Beralih ke posisi pada N = 2. Apakah N-back spasial lebih mudah atau lebih sulit bagi Anda?',
      'Perlambat tempo ke 3 s per item pada N = 3. Apakah waktu ekstra membantu, atau penyangga tetap meluap?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Working memory is the small mental workspace that holds information for a few seconds while you use it: the digits of a phone number as you dial, the start of a sentence while you read its end, a running total while you add up a bill. It is strikingly limited. Most people can keep only a handful of items active at once, and the real difficulty is not storing them but constantly replacing old items with new ones without losing track. The N-back task is a classic laboratory test of exactly this updating skill.',
        'In this simulation items appear one at a time: one of eight consonants, or one of eight lit cells on a 3×3 grid (the centre is never used). Each item is visible for the first 60% of the pace interval and then disappears. Your job is to press Match (Space or M) whenever the current item is identical to the one shown N steps earlier. The first N items are a warm-up, because nothing yet exists N steps back. After that, about 30% of items are targets. For N = 1 you only compare each item with the previous one; for N = 3 you must hold the last three items in order, compare the newest with the oldest, then drop the oldest and shift everything along, all in about two seconds.',
        'Every item is scored in one of four ways. A target you pressed for is a hit; a target you missed is a miss; a non-target you pressed for is a false alarm; a non-target you correctly ignored is a correct rejection. Plain accuracy is misleading here: since only 30% of items are targets, someone who never presses scores 70% while detecting nothing. The sim therefore reports sensitivity d′ = z(hit rate) − z(false-alarm rate), where z converts a proportion to a standard-normal score. A d′ of 0 means you cannot tell targets from non-targets, about 1 is weak, and 3 or more is excellent. To avoid infinite values when a rate is exactly 0 or 1, the sim adds 0.5 to each count and 1 to each total before computing d′. Each finished run is plotted as a dot of d′ against N, so after several runs you can see your own capacity curve.',
        'The controls change the load, not the rule. Raising N increases how many items must be held and reordered; slowing the pace gives more time for rehearsal; more items per run makes d′ less noisy, because a 20-item run contains only about six targets. Letters and positions test verbal and spatial working memory, which can differ within one person. The sim is deliberately simple: it does not plant lures (items that match N − 1 or N + 1 steps back), which make the real task harder, it does not adapt N to your performance, and it is not a training programme. Practice does improve N-back scores, but whether that improvement transfers to intelligence in general is disputed among researchers.',
      ],
      id: [
        'Memori kerja adalah ruang kerja mental kecil yang menyimpan informasi selama beberapa detik sementara kita memakainya: digit nomor telepon saat menekan tombol, awal kalimat saat kita membaca ujungnya, jumlah sementara saat menghitung belanjaan. Kapasitasnya sangat terbatas. Kebanyakan orang hanya mampu menjaga segelintir item aktif sekaligus, dan kesulitan sesungguhnya bukan pada penyimpanannya, melainkan pada mengganti item lama dengan item baru terus-menerus tanpa kehilangan jejak. Tugas N-back adalah uji laboratorium klasik untuk keterampilan pembaruan ini.',
        'Dalam simulasi ini item muncul satu per satu: salah satu dari delapan huruf konsonan, atau salah satu dari delapan sel yang menyala pada kisi 3×3 (sel tengah tidak pernah dipakai). Tiap item terlihat selama 60% pertama dari jeda tempo lalu menghilang. Tugas Anda menekan Cocok (Spasi atau M) setiap kali item saat ini identik dengan item yang muncul N langkah sebelumnya. N item pertama adalah pemanasan, karena belum ada item N langkah ke belakang. Setelah itu, sekitar 30% item adalah target. Pada N = 1 Anda hanya membandingkan tiap item dengan item sebelumnya; pada N = 3 Anda harus menyimpan tiga item terakhir secara berurutan, membandingkan yang terbaru dengan yang tertua, lalu membuang yang tertua dan menggeser semuanya, semua dalam waktu sekitar dua detik.',
        'Setiap item diskor dengan salah satu dari empat cara. Target yang Anda tekan adalah hit; target yang terlewat adalah miss; bukan-target yang Anda tekan adalah alarm palsu; bukan-target yang benar Anda abaikan adalah penolakan benar. Akurasi biasa menyesatkan di sini: karena hanya 30% item yang target, orang yang tidak pernah menekan mendapat akurasi 70% tanpa mendeteksi apa pun. Karena itu simulasi melaporkan sensitivitas d′ = z(laju hit) − z(laju alarm palsu), dengan z mengubah proporsi menjadi skor normal baku. d′ sebesar 0 berarti Anda tidak bisa membedakan target dari bukan-target, sekitar 1 berarti lemah, dan 3 atau lebih berarti sangat baik. Agar tidak muncul nilai tak hingga ketika suatu laju tepat 0 atau 1, simulasi menambahkan 0,5 pada tiap hitungan dan 1 pada tiap total sebelum menghitung d′. Tiap percobaan yang selesai digambar sebagai titik d′ terhadap N, sehingga setelah beberapa percobaan Anda dapat melihat kurva kapasitas Anda sendiri.',
        'Kontrol mengubah beban, bukan aturannya. Menaikkan N menambah jumlah item yang harus disimpan dan diurutkan ulang; memperlambat tempo memberi lebih banyak waktu untuk mengulang dalam hati; menambah item per percobaan membuat d′ kurang berisik, karena percobaan 20 item hanya berisi sekitar enam target. Huruf dan posisi menguji memori kerja verbal dan spasial, yang bisa berbeda pada satu orang yang sama. Simulasi ini sengaja dibuat sederhana: ia tidak menanam umpan (item yang cocok dengan N − 1 atau N + 1 langkah ke belakang) yang membuat tugas sesungguhnya lebih sulit, tidak menyesuaikan N dengan kinerja Anda, dan bukan program latihan. Latihan memang meningkatkan skor N-back, tetapi apakah peningkatan itu berpindah ke kecerdasan secara umum masih diperdebatkan para peneliti.',
      ],
    },
    figure: {
      caption: {
        en: 'A 2-back sequence. An item is a target when it equals the item two steps earlier (green arcs). The repeated F at positions 6 and 7 is a 1-back lure: tempting, but not a 2-back match. Below: the four possible outcomes of each item.',
        id: 'Rangkaian 2-back. Suatu item adalah target bila sama dengan item dua langkah sebelumnya (busur hijau). F yang berulang pada posisi 6 dan 7 adalah umpan 1-back: menggoda, tetapi bukan kecocokan 2-back. Di bawah: empat kemungkinan hasil tiap item.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const seq = ['B', 'C', 'B', 'F', 'H', 'F', 'F', 'D'];
        const boxes = seq.map((ch, i) => {
          const x = 24 + i * 40;
          const target = i === 2 || i === 5;
          const fill = target ? '#10b981' : i === 6 ? '#f59e0b' : 'none';
          const txt = target || i === 6 ? '#fff' : 'currentColor';
          return `<rect x="${x}" y="60" width="32" height="32" rx="4" fill="${fill}" stroke="currentColor" stroke-width="1.2"/><text x="${x + 16}" y="82" text-anchor="middle" font-size="16" font-weight="700" fill="${txt}">${ch}</text><text x="${x + 16}" y="108" text-anchor="middle" class="s">${i + 1}</text>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A 2-back sequence with targets marked', 'Rangkaian 2-back dengan target ditandai')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.6}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}.arc{fill:none;stroke:#10b981;stroke-width:2}</style>
  <text x="24" y="20" font-weight="700">${L('2-back: compare with 2 items earlier', '2-back: bandingkan dengan 2 item sebelumnya')}</text>
  <text x="24" y="36" class="s">${L('time →', 'waktu →')}</text>
  <path d="M40 58 Q80 28 120 58" class="arc" marker-end="url(#a)"/>
  <path d="M160 58 Q200 28 240 58" class="arc" marker-end="url(#a)"/>
  ${boxes}
  <text x="120" y="126" text-anchor="middle" fill="#10b981" font-weight="700">${L('match!', 'cocok!')}</text>
  <text x="240" y="126" text-anchor="middle" fill="#10b981" font-weight="700">${L('match!', 'cocok!')}</text>
  <text x="280" y="126" text-anchor="middle" fill="#f59e0b" class="s">${L('1-back lure', 'umpan 1-back')}</text>
  <text x="24" y="150" font-weight="700">${L('Scoring each item', 'Penskoran tiap item')}</text>
  <line x1="150" y1="156" x2="150" y2="236" class="m"/>
  <line x1="254" y1="156" x2="254" y2="236" class="m"/>
  <line x1="46" y1="178" x2="356" y2="178" class="m"/>
  <line x1="46" y1="208" x2="356" y2="208" class="m"/>
  <text x="200" y="172" text-anchor="middle" class="s">${L('target', 'target')}</text>
  <text x="304" y="172" text-anchor="middle" class="s">${L('not a target', 'bukan target')}</text>
  <text x="48" y="198" class="s">${L('pressed', 'ditekan')}</text>
  <text x="48" y="228" class="s">${L('not pressed', 'tidak ditekan')}</text>
  <text x="200" y="198" text-anchor="middle" fill="#10b981">${L('hit', 'hit')}</text>
  <text x="304" y="198" text-anchor="middle" fill="#ef4444">${L('false alarm', 'alarm palsu')}</text>
  <text x="200" y="228" text-anchor="middle" fill="#ef4444">${L('miss', 'miss')}</text>
  <text x="304" y="228" text-anchor="middle" fill="#10b981">${L('correct rejection', 'penolakan benar')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#10b981"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Working memory holds only a few items and must be updated continuously; the N-back task loads exactly this updating process.',
        'Each item is a hit, miss, false alarm, or correct rejection, and d′ = z(hit rate) − z(false-alarm rate) measures how well you separate targets from non-targets.',
        'Accuracy alone is misleading when only 30% of items are targets: never pressing already gives 70%.',
        'As N rises from 1 to 4, d′ falls for almost everyone, revealing a capacity limit of a few items.',
        'Verbal (letters) and spatial (positions) working memory can give different d′ for the same N.',
      ],
      id: [
        'Memori kerja hanya menampung beberapa item dan harus diperbarui terus-menerus; tugas N-back membebani persis proses pembaruan ini.',
        'Tiap item adalah hit, miss, alarm palsu, atau penolakan benar, dan d′ = z(laju hit) − z(laju alarm palsu) mengukur seberapa baik Anda memisahkan target dari bukan-target.',
        'Akurasi saja menyesatkan ketika hanya 30% item yang target: tidak pernah menekan sudah memberi 70%.',
        'Saat N naik dari 1 ke 4, d′ turun pada hampir semua orang, memperlihatkan batas kapasitas sebesar beberapa item.',
        'Memori kerja verbal (huruf) dan spasial (posisi) dapat memberi d′ berbeda untuk N yang sama.',
      ],
    },
    vocabulary: {
      en: [
        ['Working memory', 'The limited-capacity system that holds and manipulates information for a few seconds while a task is performed.'],
        ['Updating', 'Replacing old contents of working memory with new ones while keeping their order; the skill N-back demands most.'],
        ['Target', 'An item identical to the item N steps earlier, for which the correct response is to press Match.'],
        ['Hit', 'Pressing Match on a target.'],
        ['False alarm', 'Pressing Match on a non-target.'],
        ['Correct rejection', 'Not pressing on a non-target.'],
        ['Sensitivity (d′)', 'z(hit rate) − z(false-alarm rate); how well targets are distinguished from non-targets, independent of how often you press.'],
        ['Lure', 'A non-target that matches an item N − 1 or N + 1 steps back; it feels familiar and provokes false alarms.'],
      ],
      id: [
        ['Memori kerja', 'Sistem berkapasitas terbatas yang menyimpan dan mengolah informasi selama beberapa detik saat suatu tugas dikerjakan.'],
        ['Pembaruan', 'Mengganti isi lama memori kerja dengan yang baru sambil menjaga urutannya; keterampilan yang paling dituntut N-back.'],
        ['Target', 'Item yang identik dengan item N langkah sebelumnya, yang respons benarnya adalah menekan Cocok.'],
        ['Hit', 'Menekan Cocok pada target.'],
        ['Alarm palsu', 'Menekan Cocok pada bukan-target.'],
        ['Penolakan benar', 'Tidak menekan pada bukan-target.'],
        ['Sensitivitas (d′)', 'z(laju hit) − z(laju alarm palsu); seberapa baik target dibedakan dari bukan-target, terlepas dari seberapa sering Anda menekan.'],
        ['Umpan', 'Bukan-target yang cocok dengan item N − 1 atau N + 1 langkah ke belakang; terasa akrab dan memancing alarm palsu.'],
      ],
    },
    misconceptions: {
      en: [
        ['A high accuracy percentage proves good working memory.', 'Not in this task. With 30% targets, never pressing scores 70% and pressing always scores 30%, yet both have d′ = 0. Only a high hit rate combined with a low false-alarm rate gives a high d′.'],
        ['Working memory holds about seven items, so N = 4 should be easy.', 'The famous seven refers to repeating back a list once. N-back requires holding items in order and replacing them every couple of seconds; under that load most people struggle beyond N = 2 or 3, and modern estimates of working-memory capacity are closer to three or four chunks.'],
        ['Slowing the pace should make N = 4 easy.', 'Extra time helps a little with rehearsal, but the bottleneck is how many items you can hold and reorder, not how long you have. Longer gaps also give old items more time to fade and blur together.'],
        ['Training on N-back makes you smarter in general.', 'Practice reliably improves N-back scores. Whether that transfers to reasoning or intelligence is disputed; many careful studies find little or no transfer.'],
      ],
      id: [
        ['Persentase akurasi yang tinggi membuktikan memori kerja yang baik.', 'Tidak dalam tugas ini. Dengan 30% target, tidak pernah menekan memberi 70% dan selalu menekan memberi 30%, tetapi keduanya memiliki d′ = 0. Hanya laju hit tinggi yang disertai laju alarm palsu rendah yang menghasilkan d′ tinggi.'],
        ['Memori kerja menampung sekitar tujuh item, jadi N = 4 seharusnya mudah.', 'Angka tujuh yang terkenal itu berlaku untuk mengulang sebuah daftar sekali saja. N-back menuntut menyimpan item secara berurutan dan menggantinya tiap beberapa detik; di bawah beban itu kebanyakan orang kesulitan melampaui N = 2 atau 3, dan perkiraan modern kapasitas memori kerja lebih dekat ke tiga atau empat potongan.'],
        ['Memperlambat tempo akan membuat N = 4 mudah.', 'Waktu tambahan sedikit membantu untuk mengulang dalam hati, tetapi hambatannya adalah berapa banyak item yang bisa Anda simpan dan urutkan ulang, bukan berapa lama waktunya. Jeda yang lebih panjang juga memberi item lama lebih banyak waktu untuk memudar dan bercampur.'],
        ['Berlatih N-back membuat Anda lebih cerdas secara umum.', 'Latihan memang meningkatkan skor N-back. Apakah peningkatan itu berpindah ke penalaran atau kecerdasan masih diperdebatkan; banyak penelitian yang cermat menemukan sedikit atau tidak ada perpindahan.'],
      ],
    },
    realWorld: {
      en: [
        'Air traffic controllers hold the positions and headings of several aircraft in mind and update them every few seconds, a continuous N-back-like load.',
        'Mental arithmetic such as 47 × 6 requires holding partial results (42, carry 4) while computing the next step.',
        'Following a lecture while taking notes means holding the last sentence in memory while the next one arrives.',
        'The N-back task is widely used in brain-imaging studies of working memory and in research on attention disorders, because N can be raised step by step to increase the load.',
      ],
      id: [
        'Pengatur lalu lintas udara menyimpan posisi dan arah beberapa pesawat dalam pikiran dan memperbaruinya tiap beberapa detik, beban yang terus-menerus mirip N-back.',
        'Berhitung dalam hati seperti 47 × 6 menuntut menyimpan hasil sementara (42, simpan 4) sambil menghitung langkah berikutnya.',
        'Mengikuti kuliah sambil mencatat berarti menyimpan kalimat terakhir dalam ingatan sementara kalimat berikutnya datang.',
        'Tugas N-back banyak dipakai dalam penelitian pencitraan otak tentang memori kerja dan dalam riset gangguan atensi, karena N dapat dinaikkan setahap demi setahap untuk menambah beban.',
      ],
    },
    questions: {
      en: [
        { q: 'A run had 6 targets and 16 non-targets. You scored 5 hits, 1 miss, 2 false alarms, and 14 correct rejections. What is the accuracy, and roughly what is d′?', a: 'Accuracy = (5 + 14) / 22 ≈ 86%. Hit rate = 5/6 ≈ 0.83 (z ≈ 0.97) and false-alarm rate = 2/16 = 0.125 (z ≈ −1.15), so d′ ≈ 0.97 − (−1.15) ≈ 2.1. The sim\'s +0.5 correction pulls the rates toward 0.5 and reports a slightly lower value, about 1.8.' },
        { q: 'Why does the sim label the first N items "warm-up: nothing to match yet", and what happens if you press Match during them?', a: 'A target is defined as an item equal to the one N steps earlier, and for the first N items no such earlier item exists, so they cannot be targets. Pressing on them is scored as a false alarm, which lowers d′.' },
        { q: 'Someone decides to press Match on every single item of a 2-back run. What hit rate, false-alarm rate, accuracy, and d′ do they get, and why?', a: 'Hit rate 1.0 and false-alarm rate 1.0, so z(H) − z(FA) = 0: d′ = 0 (the sim\'s correction gives a value very near 0). Accuracy is about 30%, the proportion of targets. They detected nothing; they simply changed their response bias, which is exactly what d′ is designed to ignore.' },
      ],
      id: [
        { q: 'Sebuah percobaan berisi 6 target dan 16 bukan-target. Anda mendapat 5 hit, 1 miss, 2 alarm palsu, dan 14 penolakan benar. Berapa akurasinya, dan kira-kira berapa d′?', a: 'Akurasi = (5 + 14) / 22 ≈ 86%. Laju hit = 5/6 ≈ 0,83 (z ≈ 0,97) dan laju alarm palsu = 2/16 = 0,125 (z ≈ −1,15), sehingga d′ ≈ 0,97 − (−1,15) ≈ 2,1. Koreksi +0,5 pada simulasi menarik laju ke arah 0,5 dan melaporkan nilai sedikit lebih rendah, sekitar 1,8.' },
        { q: 'Mengapa simulasi menandai N item pertama sebagai "pemanasan: belum ada yang bisa dicocokkan", dan apa yang terjadi jika Anda menekan Cocok saat itu?', a: 'Target didefinisikan sebagai item yang sama dengan item N langkah sebelumnya, dan untuk N item pertama item sebelumnya itu belum ada, sehingga tidak mungkin menjadi target. Menekan pada item-item itu diskor sebagai alarm palsu, yang menurunkan d′.' },
        { q: 'Seseorang memutuskan menekan Cocok pada setiap item dalam percobaan 2-back. Berapa laju hit, laju alarm palsu, akurasi, dan d′ yang ia dapat, dan mengapa?', a: 'Laju hit 1,0 dan laju alarm palsu 1,0, sehingga z(H) − z(FA) = 0: d′ = 0 (koreksi pada simulasi memberi nilai sangat dekat 0). Akurasinya sekitar 30%, yaitu proporsi target. Ia tidak mendeteksi apa pun; ia hanya mengubah bias responsnya, dan justru itulah yang dirancang untuk diabaikan oleh d′.' },
      ],
    },
  },
};
