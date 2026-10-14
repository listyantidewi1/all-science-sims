// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish valid, invalid, and neutral cues and predict their effect on reaction time.',
      'Measure the validity effect (RT invalid − RT valid) as evidence of covert attention shifts.',
      'Explain why cue validity and the cue–target interval (SOA) change the size of the effect.',
    ],
    id: [
      'Membedakan isyarat valid, tidak valid, dan netral serta memprediksi efeknya pada waktu reaksi.',
      'Mengukur efek validitas (RT tidak valid − RT valid) sebagai bukti perpindahan atensi tersembunyi.',
      'Menjelaskan mengapa validitas isyarat dan jeda isyarat–target (SOA) mengubah besar efek.',
    ],
  },
  tryThis: {
    en: [
      'Run 30+ trials at 80% validity, SOA 300 ms — is RT valid < neutral < invalid?',
      'Drop validity to 50% — the cue is now uninformative; does the effect shrink?',
      'Set SOA to 100 ms, then 1000 ms. At which interval is the benefit biggest?',
    ],
    id: [
      'Jalankan 30+ percobaan pada validitas 80%, SOA 300 ms — apakah RT valid < netral < tidak valid?',
      'Turunkan validitas ke 50% — isyarat kini tidak informatif; apakah efeknya menyusut?',
      'Atur SOA ke 100 ms, lalu 1000 ms. Pada jeda mana manfaatnya paling besar?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'You can pay attention to a place without looking at it. Keep your eyes on a word in this sentence and you can still notice something moving at the edge of the page. Psychologists call this covert attention, and Michael Posner (1980) devised a simple task to measure it. A participant fixates a central cross while two boxes sit left and right. A cue briefly marks one box, and after a short delay a target appears in one of the boxes. When the target appears in the cued box (a valid trial) people respond faster than when no box is cued (neutral); when it appears in the other box (an invalid trial) they respond slower. Since the eyes never move, the speed-up must come from attention itself shifting to the cued location, like a spotlight that can be aimed independently of gaze.',
        'This simulation reproduces that design. Each trial begins with 500 ms of fixation, then one box brightens for 100 ms as the cue. On neutral trials, which make up 20% of the block, both boxes brighten. After the cue–target interval, called the stimulus onset asynchrony or SOA, a yellow dot appears in one box and you press F or the left arrow for the left box, J or the right arrow for the right box, as fast as you can. No response within 2 s counts as an error. Among the cued trials, the validity slider sets what percentage are valid. The chart shows the mean reaction time of correct trials for each cue type, and the validity effect is simply RT(invalid) − RT(valid). In Posner\'s terms the benefit is RT(neutral) − RT(valid) and the cost is RT(invalid) − RT(neutral).',
        'The two sliders probe two different questions. SOA asks how fast attention moves: if the target arrives only 50 ms after the cue, attention has barely begun to shift and the effect is small; by 200 to 300 ms it is fully in place. Validity asks why attention moves. A cue that is right 80% of the time is worth following deliberately, which is called endogenous or voluntary orienting. A cue that is right only 50% of the time carries no information, yet a sudden brightening at the edge of vision still grabs attention automatically, which is called exogenous or reflexive orienting. With real participants and peripheral cues like these, a further twist appears at long SOAs: after about 300 ms the cued location actually becomes slower than the uncued one, a phenomenon Posner and Cohen (1984) named inhibition of return.',
        'The simulated participant is a deliberately simple model. Its reaction time is 340 ms plus an offset of −25 ms for valid, 0 for neutral, or +35 ms for invalid cues, with the offset scaled by min(1, SOA / 250 ms) so that the effect grows during the first 250 ms and then stays constant. Random noise of ±30 ms is added and 4% of responses are errors. The model ignores the validity slider, never shows inhibition of return, and has no practice or fatigue, so its validity effect settles at 60 ms for any SOA of 250 ms or more. Only with a real human responding can you see whether validity matters or whether the effect reverses at 1000 ms. Real experiments also monitor eye position with an eye tracker to be sure the eyes stayed on the cross; the sim trusts you.',
      ],
      id: [
        'Kita bisa memperhatikan suatu tempat tanpa melihat ke arahnya. Tetaplah menatap satu kata dalam kalimat ini dan Anda masih bisa menyadari sesuatu bergerak di tepi halaman. Psikolog menyebutnya atensi tersembunyi, dan Michael Posner (1980) merancang tugas sederhana untuk mengukurnya. Peserta menatap tanda silang di tengah sementara dua kotak berada di kiri dan kanan. Sebuah isyarat sesaat menandai salah satu kotak, dan setelah jeda singkat target muncul di salah satu kotak. Ketika target muncul di kotak yang diisyaratkan (percobaan valid) orang merespons lebih cepat daripada ketika tidak ada kotak yang diisyaratkan (netral); ketika target muncul di kotak lain (percobaan tidak valid) respons lebih lambat. Karena mata tidak pernah bergerak, percepatan itu pasti berasal dari atensi yang berpindah ke lokasi isyarat, seperti lampu sorot yang bisa diarahkan terpisah dari arah pandang.',
        'Simulasi ini mereproduksi rancangan tersebut. Tiap percobaan dimulai dengan fiksasi 500 ms, lalu satu kotak menyala selama 100 ms sebagai isyarat. Pada percobaan netral, yang merupakan 20% dari blok, kedua kotak menyala. Setelah jeda isyarat–target, yang disebut stimulus onset asynchrony atau SOA, titik kuning muncul di salah satu kotak dan Anda menekan F atau panah kiri untuk kotak kiri, J atau panah kanan untuk kotak kanan, secepat mungkin. Tidak ada respons dalam 2 s dihitung sebagai kesalahan. Di antara percobaan berisyarat, slider validitas menentukan berapa persen yang valid. Grafik menampilkan rata-rata waktu reaksi percobaan benar untuk tiap jenis isyarat, dan efek validitas adalah RT(tidak valid) − RT(valid). Dalam istilah Posner, manfaat adalah RT(netral) − RT(valid) dan biaya adalah RT(tidak valid) − RT(netral).',
        'Kedua slider menyelidiki dua pertanyaan berbeda. SOA menanyakan seberapa cepat atensi berpindah: jika target datang hanya 50 ms setelah isyarat, atensi baru mulai bergeser dan efeknya kecil; pada 200 sampai 300 ms atensi sudah sepenuhnya tiba. Validitas menanyakan mengapa atensi berpindah. Isyarat yang benar 80% dari waktu layak diikuti dengan sengaja, yang disebut orientasi endogen atau sukarela. Isyarat yang benar hanya 50% tidak membawa informasi, tetapi kilatan mendadak di tepi penglihatan tetap menarik atensi secara otomatis, yang disebut orientasi eksogen atau refleksif. Dengan peserta sungguhan dan isyarat periferal seperti ini, muncul kejutan lain pada SOA panjang: setelah sekitar 300 ms lokasi yang diisyaratkan justru menjadi lebih lambat daripada yang tidak, gejala yang oleh Posner dan Cohen (1984) dinamai inhibition of return.',
        'Peserta simulasi adalah model yang sengaja dibuat sederhana. Waktu reaksinya 340 ms ditambah selisih −25 ms untuk isyarat valid, 0 untuk netral, atau +35 ms untuk tidak valid, dengan selisih itu dikalikan min(1, SOA / 250 ms) sehingga efeknya tumbuh selama 250 ms pertama lalu tetap. Derau acak ±30 ms ditambahkan dan 4% respons adalah kesalahan. Model ini mengabaikan slider validitas, tidak pernah menunjukkan inhibition of return, dan tidak mengenal latihan atau kelelahan, sehingga efek validitasnya menetap di 60 ms untuk SOA 250 ms ke atas. Hanya dengan manusia sungguhan yang merespons Anda bisa melihat apakah validitas berpengaruh atau apakah efeknya berbalik pada 1000 ms. Eksperimen sungguhan juga memantau posisi mata dengan pelacak mata untuk memastikan mata tetap di tanda silang; simulasi ini memercayai Anda.',
      ],
    },
    figure: {
      caption: {
        en: 'One trial: fixation, a 100 ms cue, then after the SOA the target dot. Here the cue is valid (same box). Below, the typical pattern of mean reaction times: valid fastest, invalid slowest.',
        id: 'Satu percobaan: fiksasi, isyarat 100 ms, lalu setelah SOA titik target. Di sini isyaratnya valid (kotak yang sama). Di bawah, pola khas rata-rata waktu reaksi: valid tercepat, tidak valid terlambat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const panel = (x, label, cueL, cueR, dot) => `
  <rect x="${x}" y="40" width="100" height="60" rx="4" class="m"/>
  <rect x="${x + 10}" y="55" width="30" height="30" fill="none" stroke="${cueL ? '#f59e0b' : 'currentColor'}" stroke-width="${cueL ? 3 : 1.2}"/>
  <rect x="${x + 60}" y="55" width="30" height="30" fill="none" stroke="${cueR ? '#f59e0b' : 'currentColor'}" stroke-width="${cueR ? 3 : 1.2}"/>
  <path d="M${x + 47} 70 h6 M${x + 50} 67 v6" stroke="currentColor" stroke-width="1.5"/>
  ${dot ? `<circle cx="${x + 25}" cy="70" r="6" fill="#3b82f6"/>` : ''}
  <text x="${x + 50}" y="30" text-anchor="middle" class="s">${label}</text>`;
        const bar = (x, h, color, rt) => `
  <rect x="${x}" y="${230 - h}" width="50" height="${h}" fill="${color}" opacity=".85"/>
  <text x="${x + 25}" y="${224 - h}" text-anchor="middle" class="s">${rt}</text>
`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Posner cueing trial sequence and reaction times', 'Urutan percobaan Posner dan waktu reaksi')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}.t{stroke:currentColor;stroke-width:1.2;fill:none}</style>
  ${panel(10, L('fixation 500 ms', 'fiksasi 500 ms'), false, false, false)}
  ${panel(130, L('cue 100 ms', 'isyarat 100 ms'), true, false, false)}
  ${panel(250, L('target', 'target'), false, false, true)}
  <line x1="10" y1="118" x2="350" y2="118" class="t" marker-end="url(#a)"/>
  <line x1="130" y1="112" x2="130" y2="124" class="t"/>
  <line x1="250" y1="112" x2="250" y2="124" class="t"/>
  <text x="190" y="136" text-anchor="middle" fill="#f59e0b" class="s">${L('SOA (cue onset to target onset)', 'SOA (awal isyarat ke awal target)')}</text>
  <text x="340" y="112" text-anchor="end" class="s">${L('time', 'waktu')}</text>
  <text x="10" y="160" font-weight="700" class="s">${L('Mean RT of correct trials', 'Rata-rata RT percobaan benar')}</text>
  ${bar(40, 60, '#10b981', '~320 ms')}
  ${bar(130, 70, '#3b82f6', '~340 ms')}
  ${bar(220, 84, '#ef4444', '~370 ms')}
  <text x="65" y="239" text-anchor="middle" class="s">${L('valid', 'valid')}</text>
  <text x="155" y="239" text-anchor="middle" class="s">${L('neutral', 'netral')}</text>
  <text x="245" y="239" text-anchor="middle" class="s">${L('invalid', 'tidak valid')}</text>
  <line x1="290" y1="170" x2="290" y2="146" class="t"/>
  <path d="M300 170 h40 M300 146 h40" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>
  <text x="345" y="162" text-anchor="end" fill="#f59e0b" class="s">${L('effect', 'efek')}</text>
  <text x="345" y="174" text-anchor="end" fill="#f59e0b" class="s">${L('= invalid − valid', '= tidak valid − valid')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Attention can shift to a location without any eye movement; this covert shift is what the cueing task measures.',
        'A valid cue speeds the response and an invalid cue slows it, so the validity effect (RT invalid − RT valid) is the signature of attention having moved.',
        'The effect needs time to build: at very short SOAs attention has not yet arrived, and it is largest from roughly 200 to 300 ms.',
        'Informative cues drive voluntary (endogenous) orienting, while a sudden peripheral flash captures attention reflexively (exogenous), even when it is uninformative.',
        'With peripheral cues and long SOAs, real participants often show inhibition of return, where the cued location becomes slower; the sim\'s simulated participant does not model this.',
      ],
      id: [
        'Atensi dapat berpindah ke suatu lokasi tanpa gerakan mata; perpindahan tersembunyi inilah yang diukur tugas isyarat.',
        'Isyarat valid mempercepat respons dan isyarat tidak valid memperlambatnya, sehingga efek validitas (RT tidak valid − RT valid) adalah tanda bahwa atensi telah berpindah.',
        'Efek ini butuh waktu untuk terbentuk: pada SOA sangat pendek atensi belum tiba, dan efek terbesar terjadi pada kira-kira 200 sampai 300 ms.',
        'Isyarat yang informatif mendorong orientasi sukarela (endogen), sedangkan kilatan periferal yang mendadak menarik atensi secara refleksif (eksogen), bahkan ketika tidak informatif.',
        'Dengan isyarat periferal dan SOA panjang, peserta sungguhan sering menunjukkan inhibition of return, yaitu lokasi yang diisyaratkan menjadi lebih lambat; peserta simulasi dalam sim ini tidak memodelkannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Covert attention', 'Directing attention to a location while the eyes stay fixed elsewhere.'],
        ['Cue', 'A brief signal (here, a box brightening) that indicates where the target is likely to appear.'],
        ['Valid / invalid / neutral trial', 'The target appears in the cued box, in the other box, or after both boxes were cued.'],
        ['SOA (stimulus onset asynchrony)', 'The time from the start of the cue to the start of the target.'],
        ['Validity effect', 'Mean RT on invalid trials minus mean RT on valid trials; the overall cost plus benefit of the cue.'],
        ['Endogenous orienting', 'Voluntary attention shifts driven by knowledge, such as following a cue that is usually right.'],
        ['Exogenous orienting', 'Reflexive attention capture by a sudden peripheral event, regardless of whether it is informative.'],
        ['Inhibition of return', 'At long SOAs with peripheral cues, responses to the previously cued location become slower than to the uncued one.'],
      ],
      id: [
        ['Atensi tersembunyi', 'Mengarahkan atensi ke suatu lokasi sementara mata tetap terpaku di tempat lain.'],
        ['Isyarat', 'Sinyal singkat (di sini, kotak yang menyala) yang menunjukkan di mana target kemungkinan muncul.'],
        ['Percobaan valid / tidak valid / netral', 'Target muncul di kotak yang diisyaratkan, di kotak lain, atau setelah kedua kotak diisyaratkan.'],
        ['SOA (stimulus onset asynchrony)', 'Waktu dari awal isyarat sampai awal target.'],
        ['Efek validitas', 'Rata-rata RT percobaan tidak valid dikurangi rata-rata RT percobaan valid; gabungan biaya dan manfaat isyarat.'],
        ['Orientasi endogen', 'Perpindahan atensi sukarela yang didorong pengetahuan, misalnya mengikuti isyarat yang biasanya benar.'],
        ['Orientasi eksogen', 'Penarikan atensi secara refleksif oleh peristiwa periferal yang mendadak, terlepas dari informatif atau tidak.'],
        ['Inhibition of return', 'Pada SOA panjang dengan isyarat periferal, respons terhadap lokasi yang tadi diisyaratkan menjadi lebih lambat daripada lokasi yang tidak.'],
      ],
    },
    misconceptions: {
      en: [
        ['Faster responses on valid trials happen because the eyes moved to the cued box.', 'Participants keep their eyes on the central cross, and in laboratory versions this is checked with an eye tracker. The speed-up comes from attention shifting covertly; the cue is also too brief and the target too soon for a useful eye movement.'],
        ['If the cue is right only 50% of the time, it should have no effect.', 'An uninformative cue is useless as a strategy, but a sudden brightening at the periphery still captures attention reflexively. Real participants usually show a smaller yet clear effect, which is why psychologists distinguish exogenous from endogenous orienting.'],
        ['A longer SOA always gives a bigger validity effect.', 'The effect grows only until attention has arrived, around 200 to 300 ms. With peripheral cues and SOAs beyond that, real participants often show the opposite pattern, inhibition of return.'],
        ['Thirty milliseconds is too small to matter.', 'Individual trials vary by ±30 ms or more, so a single trial proves nothing, but a consistent 30 ms shift across dozens of trials is a large and reliable effect in reaction-time research.'],
      ],
      id: [
        ['Respons lebih cepat pada percobaan valid terjadi karena mata bergerak ke kotak yang diisyaratkan.', 'Peserta menjaga mata di tanda silang tengah, dan pada versi laboratorium hal ini diperiksa dengan pelacak mata. Percepatan berasal dari atensi yang berpindah secara tersembunyi; isyaratnya juga terlalu singkat dan targetnya terlalu cepat untuk gerakan mata yang berguna.'],
        ['Jika isyarat benar hanya 50% dari waktu, seharusnya tidak ada efek.', 'Isyarat yang tidak informatif tidak berguna sebagai strategi, tetapi kilatan mendadak di tepi penglihatan tetap menarik atensi secara refleksif. Peserta sungguhan biasanya menunjukkan efek yang lebih kecil tetapi jelas, dan karena itulah psikolog membedakan orientasi eksogen dari endogen.'],
        ['SOA yang lebih panjang selalu memberi efek validitas yang lebih besar.', 'Efek hanya tumbuh sampai atensi tiba, sekitar 200 sampai 300 ms. Dengan isyarat periferal dan SOA lebih panjang dari itu, peserta sungguhan sering menunjukkan pola sebaliknya, inhibition of return.'],
        ['Tiga puluh milidetik terlalu kecil untuk berarti.', 'Percobaan tunggal bervariasi ±30 ms atau lebih, sehingga satu percobaan tidak membuktikan apa pun, tetapi pergeseran 30 ms yang konsisten pada puluhan percobaan adalah efek besar dan andal dalam penelitian waktu reaksi.'],
      ],
    },
    realWorld: {
      en: [
        'Brake lights and indicator lights are designed as sudden peripheral onsets because they capture a driver\'s attention reflexively, like the cue in this task.',
        'A feint in football or basketball is an invalid cue: the defender\'s attention shifts to the fake direction and their response to the real move is delayed.',
        'Phone notifications that pop up at the edge of the screen grab attention exogenously, which is why they are so hard to ignore while studying.',
        'Neuropsychologists use cueing tasks to study patients with parietal-lobe damage, who have particular difficulty shifting attention away from a cued location toward the opposite side.',
      ],
      id: [
        'Lampu rem dan lampu sein dirancang sebagai kemunculan periferal yang mendadak karena menarik atensi pengemudi secara refleksif, seperti isyarat dalam tugas ini.',
        'Gerak tipu dalam sepak bola atau basket adalah isyarat tidak valid: atensi pemain bertahan berpindah ke arah palsu dan responsnya terhadap gerakan sesungguhnya tertunda.',
        'Notifikasi ponsel yang muncul di tepi layar menarik atensi secara eksogen, dan karena itulah sulit diabaikan saat belajar.',
        'Neuropsikolog memakai tugas isyarat untuk mempelajari pasien dengan kerusakan lobus parietal, yang sangat kesulitan memindahkan atensi dari lokasi yang diisyaratkan ke sisi berlawanan.',
      ],
    },
    questions: {
      en: [
        { q: 'After 40 trials the chart shows mean RTs of 320 ms (valid), 340 ms (neutral) and 365 ms (invalid). What are the benefit, the cost, and the validity effect?', a: 'Benefit = neutral − valid = 340 − 320 = 20 ms. Cost = invalid − neutral = 365 − 340 = 25 ms. Validity effect = invalid − valid = 45 ms, which is also benefit + cost. The pattern valid < neutral < invalid is the classic Posner result.' },
        { q: 'With the simulated participant switched on, what validity effect do you expect at SOA = 100 ms, and at SOA = 500 ms? Show the calculation.', a: 'The offsets are −25 ms (valid) and +35 ms (invalid), scaled by min(1, SOA/250). At 100 ms the scale is 0.4, so the effect is 0.4 × (35 − (−25)) = 0.4 × 60 = 24 ms. At 500 ms the scale is 1, so the effect is 60 ms. Random noise means a short block will scatter around these values.' },
        { q: 'A student drops the validity slider to 50% and still measures a validity effect of about 30 ms. Does this show the sim is broken? What would a psychologist conclude?', a: 'No. A cue that is right half the time gives no useful information, so any effect cannot come from a deliberate strategy. It shows exogenous orienting: the sudden brightening of the box pulls attention automatically. (Note that with the simulated participant the effect never changes with validity, because that model ignores the slider; the test is only meaningful with a human responding.)' },
      ],
      id: [
        { q: 'Setelah 40 percobaan grafik menunjukkan rata-rata RT 320 ms (valid), 340 ms (netral), dan 365 ms (tidak valid). Berapa manfaat, biaya, dan efek validitasnya?', a: 'Manfaat = netral − valid = 340 − 320 = 20 ms. Biaya = tidak valid − netral = 365 − 340 = 25 ms. Efek validitas = tidak valid − valid = 45 ms, yang juga sama dengan manfaat + biaya. Pola valid < netral < tidak valid adalah hasil klasik Posner.' },
        { q: 'Dengan peserta simulasi dinyalakan, berapa efek validitas yang Anda harapkan pada SOA = 100 ms, dan pada SOA = 500 ms? Tunjukkan perhitungannya.', a: 'Selisihnya −25 ms (valid) dan +35 ms (tidak valid), dikalikan min(1, SOA/250). Pada 100 ms faktornya 0,4, sehingga efeknya 0,4 × (35 − (−25)) = 0,4 × 60 = 24 ms. Pada 500 ms faktornya 1, sehingga efeknya 60 ms. Derau acak membuat blok yang pendek tersebar di sekitar nilai-nilai ini.' },
        { q: 'Seorang siswa menurunkan slider validitas ke 50% dan masih mengukur efek validitas sekitar 30 ms. Apakah ini menunjukkan simulasinya rusak? Apa kesimpulan seorang psikolog?', a: 'Tidak. Isyarat yang benar separuh waktu tidak memberi informasi berguna, sehingga efek apa pun tidak mungkin berasal dari strategi yang disengaja. Ini menunjukkan orientasi eksogen: kotak yang menyala mendadak menarik atensi secara otomatis. (Perhatikan bahwa dengan peserta simulasi efeknya tidak pernah berubah terhadap validitas, karena model itu mengabaikan slider; pengujian ini hanya bermakna dengan manusia yang merespons.)' },
      ],
    },
  },
};
