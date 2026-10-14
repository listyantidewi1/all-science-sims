// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See that visual attention only registers what it focuses on.',
      'Compare flicker (with blank) vs continuous (no blank) to feel the difference.',
      'Understand why eyewitness reports are often unreliable.',
    ],
    id: [
      'Melihat bahwa perhatian visual hanya merekam yang difokuskan.',
      'Membandingkan flicker (dengan kosong) vs kontinu (tanpa kosong).',
      'Memahami mengapa laporan saksi sering tidak andal.',
    ],
  },  tryThis: {
    en: [
      'Flicker mode — change can take 30+ seconds to spot.',
      'Continuous mode — same change pops instantly.',
      'Click on the changing element to log your reaction time.',
    ],
    id: [
      'Mode flicker — perubahan bisa butuh 30+ detik untuk ditemukan.',
      'Mode kontinu — perubahan yang sama langsung muncul.',
      'Klik pada elemen yang berubah untuk mencatat waktu reaksi.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'It feels as if we see the whole scene in front of us in full detail, all the time. Change blindness shows that this is an illusion. When something in a scene changes at the same moment as a brief visual interruption, such as a blink, an eye movement, a camera cut or a flash of blank screen, people routinely fail to notice it, even when the change is large and in plain view. The scene is not being stored as a photograph; what persists from one glance to the next is mostly whatever attention was focused on.',
        'The classic laboratory version is the flicker paradigm, introduced by Ronald Rensink, Kevin O\'Regan and James Clark in 1997. An original image and a modified image alternate, separated by a short blank field. Observers can take many seconds, sometimes dozens of alternations, to find a change they then cannot un-see. Without the blank, the same change is detected almost instantly, because a sudden colour or shape change produces a local motion-like signal (a transient) that pulls attention straight to the spot. The blank fills the entire display with transients at once, so the one that matters is lost in the crowd.',
        'This simulation is a stripped-down flicker experiment. Twelve coloured shapes are scattered at random, and one of them has a different colour in scene B. In flicker mode scene A is shown for 600 ms, then a 100 ms blank, then scene B for 600 ms, then another blank, and so on. In continuous mode the two scenes simply alternate every half second with no blank, so the change announces itself. Click the shape you think is changing: a correct click records how long you took, a wrong click ends the trial. Press New trial for a fresh layout, and switch modes to feel how different the same change can be.',
        'The sim simplifies in several ways. Real studies use photographs of natural scenes, measure many trials per person and track eye movements; here there are abstract shapes, one trial at a time and no averaging, so your single times will be noisy. Only colour changes are used, whereas real experiments also vary position, presence and size, and show that changes to the "centre of interest" of a scene are found faster than changes to marginal objects. Nothing in the sim models attention itself; it only lets you experience what attention does and does not deliver.',
      ],
      id: [
        'Rasanya kita melihat seluruh pemandangan di depan kita secara lengkap, setiap saat. Buta perubahan menunjukkan bahwa ini ilusi. Ketika sesuatu dalam pemandangan berubah bersamaan dengan gangguan visual singkat, seperti kedipan mata, gerakan mata, potongan kamera, atau kilasan layar kosong, orang sering kali gagal menyadarinya, bahkan ketika perubahannya besar dan terlihat jelas. Pemandangan tidak disimpan seperti foto; yang bertahan dari satu pandangan ke pandangan berikutnya sebagian besar hanyalah apa yang sedang menjadi fokus perhatian.',
        'Versi laboratorium klasiknya adalah paradigma flicker, yang diperkenalkan Ronald Rensink, Kevin O\'Regan, dan James Clark pada 1997. Gambar asli dan gambar yang diubah ditampilkan bergantian, dipisahkan oleh bidang kosong singkat. Pengamat bisa butuh banyak detik, kadang puluhan pergantian, untuk menemukan perubahan yang setelah itu tidak bisa lagi mereka abaikan. Tanpa bidang kosong, perubahan yang sama terdeteksi hampir seketika, karena perubahan warna atau bentuk yang mendadak menghasilkan sinyal seperti gerakan lokal (transien) yang menarik perhatian langsung ke titik itu. Bidang kosong memenuhi seluruh layar dengan transien sekaligus, sehingga transien yang penting tenggelam di tengah keramaian.',
        'Simulasi ini adalah eksperimen flicker yang disederhanakan. Dua belas bentuk berwarna disebar secara acak, dan salah satunya berwarna berbeda pada adegan B. Dalam mode flicker, adegan A ditampilkan 600 ms, lalu kosong 100 ms, lalu adegan B 600 ms, lalu kosong lagi, dan seterusnya. Dalam mode kontinu kedua adegan hanya bergantian setiap setengah detik tanpa kosong, sehingga perubahannya langsung mengumumkan diri. Klik bentuk yang menurutmu berubah: klik yang benar mencatat berapa lama waktumu, klik yang salah mengakhiri percobaan. Tekan New trial untuk tata letak baru, dan ganti mode untuk merasakan betapa berbedanya perubahan yang sama.',
        'Simulasi ini menyederhanakan beberapa hal. Penelitian sungguhan memakai foto pemandangan alami, mengukur banyak percobaan per orang, dan melacak gerakan mata; di sini hanya ada bentuk abstrak, satu percobaan tiap kali, dan tanpa rata-rata, sehingga waktu tunggalmu akan berderau. Hanya perubahan warna yang dipakai, sedangkan eksperimen nyata juga mengubah posisi, keberadaan, dan ukuran, dan menunjukkan bahwa perubahan pada "pusat minat" pemandangan ditemukan lebih cepat daripada perubahan pada objek pinggiran. Tidak ada bagian simulasi yang memodelkan perhatian itu sendiri; simulasi hanya membuatmu mengalami apa yang diberikan dan tidak diberikan oleh perhatian.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: the flicker paradigm. Scene A and the altered scene A′ alternate with a blank between them; the blank floods the display with transients, so the change gives no unique signal. Bottom: with no blank, the colour change itself produces a local transient that captures attention immediately.',
        id: 'Atas: paradigma flicker. Adegan A dan adegan yang diubah A′ bergantian dengan bidang kosong di antaranya; bidang kosong membanjiri layar dengan transien, sehingga perubahan tidak memberi sinyal unik. Bawah: tanpa bidang kosong, perubahan warna itu sendiri menghasilkan transien lokal yang langsung menangkap perhatian.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const frame = (x, y, changed) => `
  <rect x="${x}" y="${y}" width="70" height="46" rx="3" fill="none" stroke="currentColor" stroke-width="1"/>
  <circle cx="${x + 14}" cy="${y + 13}" r="5" fill="#3b82f6"/>
  <rect x="${x + 44}" y="${y + 8}" width="10" height="10" fill="${changed ? '#3b82f6' : '#ef4444'}"/>
  <path d="M${x + 22} ${y + 38} L${x + 28} ${y + 27} L${x + 34} ${y + 38} Z" fill="#10b981"/>
  <circle cx="${x + 55}" cy="${y + 34}" r="5" fill="#f59e0b"/>`;
        const blank = (x, y) => `
  <rect x="${x}" y="${y}" width="70" height="46" rx="3" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="1"/>`;
        const arrow = (x, y) => `<line x1="${x}" y1="${y}" x2="${x + 12}" y2="${y}" stroke="currentColor" stroke-width="1.5" marker-end="url(#cb)"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Flicker paradigm versus continuous change', 'Paradigma flicker versus perubahan kontinu')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.b{font-weight:700;font-size:11px}.s{font-size:9px;opacity:.85}</style>
  <defs><marker id="cb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
  <text x="10" y="16" class="b">${L('Flicker: change hidden', 'Flicker: perubahan tersembunyi')}</text>
  ${frame(10, 26, false)}
  ${arrow(82, 49)}
  ${blank(98, 26)}
  ${arrow(170, 49)}
  ${frame(186, 26, true)}
  ${arrow(258, 49)}
  ${blank(274, 26)}
  <text x="45" y="84" text-anchor="middle" class="s">A · 600 ms</text>
  <text x="133" y="84" text-anchor="middle" class="s">${L('blank', 'kosong')} · 100 ms</text>
  <text x="221" y="84" text-anchor="middle" class="s">A′ · 600 ms</text>
  <text x="309" y="84" text-anchor="middle" class="s">${L('blank', 'kosong')} · 100 ms</text>
  <text x="180" y="100" text-anchor="middle" class="s">${L('every location changes at once: no unique transient to pull attention', 'semua lokasi berubah serentak: tak ada transien unik yang menarik perhatian')}</text>
  <text x="10" y="128" class="b">${L('Continuous: change pops out', 'Kontinu: perubahan langsung menonjol')}</text>
  ${frame(60, 138, false)}
  ${arrow(136, 161)}
  <text x="180" y="156" text-anchor="middle" class="s">${L('no blank', 'tanpa kosong')}</text>
  ${arrow(212, 161)}
  ${frame(230, 138, true)}
  <path d="M279 139 L282 146 L289 143 L285 149 L292 152 L285 154 L288 161 L282 157 L278 163 L277 156 L270 157 L275 152 L269 148 L276 148 Z" fill="#f59e0b" fill-opacity=".7"/>
  <text x="180" y="200" text-anchor="middle" class="s">${L('the colour change itself is a local transient', 'perubahan warna itu sendiri adalah transien lokal')}</text>
  <text x="180" y="213" text-anchor="middle" class="s">${L('attention is pulled straight to it', 'perhatian langsung tertarik ke sana')}</text>
  <text x="180" y="232" text-anchor="middle" class="s">${L('what you keep between glances is what you attended to', 'yang kamu simpan di antara pandangan adalah yang kamu perhatikan')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'We do not store a detailed picture of the scene from one moment to the next; we keep mostly what attention has selected.',
        'A change normally reveals itself through a local visual transient that attracts attention.',
        'A blank, blink, eye movement or camera cut masks that transient, so the change must be found by attending to objects one by one.',
        'Change blindness is about noticing, not about seeing: the eyes receive the changed image perfectly well.',
        'Because of this, confident eyewitness reports can miss large changes that happened in full view.',
      ],
      id: [
        'Kita tidak menyimpan gambar rinci pemandangan dari satu saat ke saat berikutnya; yang kita simpan sebagian besar adalah yang dipilih perhatian.',
        'Perubahan biasanya memperlihatkan dirinya melalui transien visual lokal yang menarik perhatian.',
        'Bidang kosong, kedipan, gerakan mata, atau potongan kamera menutupi transien itu, sehingga perubahan harus dicari dengan memperhatikan objek satu per satu.',
        'Buta perubahan menyangkut menyadari, bukan melihat: mata menerima gambar yang berubah dengan sempurna.',
        'Karena itu, laporan saksi mata yang yakin pun bisa melewatkan perubahan besar yang terjadi di depan mata.',
      ],
    },
    vocabulary: {
      en: [
        ['Change blindness', 'Failure to notice a change in a visual scene when the change coincides with a brief visual disruption.'],
        ['Flicker paradigm', 'An experiment in which two versions of a scene alternate with a blank field between them until the observer finds the difference.'],
        ['Visual transient', 'A sudden local change in brightness, colour or motion that automatically draws attention to its location.'],
        ['Selective attention', 'The process of focusing processing on some objects or locations at the expense of others.'],
        ['Visual short-term memory', 'The limited store, of roughly three to four objects, that carries information across glances and blinks.'],
        ['Inattentional blindness', 'A related effect: failing to notice an unexpected object that is fully visible because attention is engaged elsewhere.'],
      ],
      id: [
        ['Buta perubahan', 'Kegagalan menyadari perubahan dalam pemandangan visual ketika perubahan itu bertepatan dengan gangguan visual singkat.'],
        ['Paradigma flicker', 'Eksperimen ketika dua versi pemandangan bergantian dengan bidang kosong di antaranya sampai pengamat menemukan perbedaannya.'],
        ['Transien visual', 'Perubahan lokal mendadak dalam kecerahan, warna, atau gerakan yang otomatis menarik perhatian ke lokasinya.'],
        ['Perhatian selektif', 'Proses memusatkan pengolahan pada sebagian objek atau lokasi dengan mengorbankan yang lain.'],
        ['Memori visual jangka pendek', 'Penyimpanan terbatas, kira-kira tiga sampai empat objek, yang membawa informasi melintasi pandangan dan kedipan.'],
        ['Buta karena tidak memperhatikan', 'Efek terkait: gagal menyadari objek tak terduga yang terlihat penuh karena perhatian sedang tertuju ke tempat lain.'],
      ],
    },
    misconceptions: {
      en: [
        ['If something is right in front of my eyes, I will see it change.', 'Seeing and noticing are different. The retina records the change, but unless attention is on that object the comparison with the previous moment never happens, so the change goes unnoticed.'],
        ['People who miss the change simply were not looking carefully.', 'Change blindness happens to attentive, motivated observers who are actively searching. It reflects a limit of visual memory and attention, not carelessness.'],
        ['The brain stores the visual world like a video recording.', 'Only a few attended objects are carried across each glance. The feeling of a complete, stable picture comes from the world itself being available to look at again, not from an internal copy.'],
        ['The blank screen makes the change harder to see because it is too fast.', 'The 100 ms blank is long enough to see easily. It hides the change because it produces transients everywhere at once, drowning out the single transient that would normally mark the changed object.'],
      ],
      id: [
        ['Jika sesuatu ada tepat di depan mataku, aku akan melihatnya berubah.', 'Melihat dan menyadari itu berbeda. Retina merekam perubahannya, tetapi kecuali perhatian tertuju pada objek itu, perbandingan dengan saat sebelumnya tidak pernah terjadi, sehingga perubahan terlewat.'],
        ['Orang yang melewatkan perubahan hanya tidak melihat dengan cermat.', 'Buta perubahan terjadi pada pengamat yang penuh perhatian, termotivasi, dan aktif mencari. Ini mencerminkan batas memori visual dan perhatian, bukan kecerobohan.'],
        ['Otak menyimpan dunia visual seperti rekaman video.', 'Hanya beberapa objek yang diperhatikan yang terbawa melintasi tiap pandangan. Perasaan memiliki gambar lengkap dan stabil datang dari dunia itu sendiri yang bisa dilihat lagi, bukan dari salinan internal.'],
        ['Layar kosong membuat perubahan lebih sulit dilihat karena terlalu cepat.', 'Kosong 100 ms cukup lama untuk dilihat dengan mudah. Ia menyembunyikan perubahan karena menghasilkan transien di mana-mana sekaligus, menenggelamkan transien tunggal yang biasanya menandai objek yang berubah.'],
      ],
    },
    realWorld: {
      en: [
        'Film continuity errors, such as a glass that empties and refills between shots, usually pass unnoticed by audiences because the cut between shots works exactly like the blank in the flicker paradigm.',
        'In a well-known experiment by Daniel Simons and Daniel Levin (1998), a stranger asking for directions was swapped for a different person while two men carried a door between them; about half of the people did not notice they were now talking to someone else.',
        'Drivers can look directly at a motorcycle or pedestrian and fail to register it; the "looked but failed to see" collision is a documented road-safety category linked to these attentional limits.',
        'Radiologists and security screeners train with change-detection tasks because a lesion or a weapon that appears between two images gives no transient to catch the eye.',
      ],
      id: [
        'Kesalahan kontinuitas film, seperti gelas yang kosong lalu penuh lagi antar-adegan, biasanya tidak disadari penonton karena potongan antar-adegan bekerja persis seperti bidang kosong dalam paradigma flicker.',
        'Dalam eksperimen terkenal Daniel Simons dan Daniel Levin (1998), orang asing yang bertanya arah ditukar dengan orang lain saat dua pria membawa pintu melintas di antara mereka; sekitar setengah dari orang yang ditanya tidak menyadari bahwa mereka kini berbicara dengan orang yang berbeda.',
        'Pengemudi bisa menatap langsung sepeda motor atau pejalan kaki tetapi gagal mencatatnya; tabrakan "melihat tetapi tidak menyadari" adalah kategori keselamatan jalan yang terdokumentasi dan terkait dengan batas perhatian ini.',
        'Radiolog dan petugas pemeriksa keamanan berlatih dengan tugas deteksi perubahan karena lesi atau senjata yang muncul di antara dua gambar tidak memberi transien yang menarik mata.',
      ],
    },
    questions: {
      en: [
        { q: 'In flicker mode each full cycle (A, blank, B, blank) lasts 1.4 s. If you find the change after 21 s, roughly how many times did the changed shape switch colour in front of you before you noticed?', a: 'About 21 / 1.4 = 15 cycles, and the shape changes colour twice per cycle (A to B and B to A), so roughly 30 colour changes happened in plain view before you caught it.' },
        { q: 'Why does the same colour change that takes many seconds to find in flicker mode become obvious within one alternation in continuous mode?', a: 'Without a blank, only one location changes at that instant, so its transient stands out and attention is drawn straight there. With the blank, every location produces a transient at the same time, so the critical one gives no unique signal and you must check objects one by one.' },
        { q: 'A witness insists that nothing about a scene changed while they were watching, yet an object was replaced. Using change blindness, explain how both the witness\'s honesty and the change can be true.', a: 'The witness genuinely experienced a stable scene because the brain keeps only the attended objects between glances; a replacement timed with a blink, an eye movement or a distraction produced no transient and was never compared with the earlier view. Honesty is not the issue; the limits of attention and visual memory are.' },
      ],
      id: [
        { q: 'Dalam mode flicker tiap siklus penuh (A, kosong, B, kosong) berlangsung 1,4 s. Jika kamu menemukan perubahan setelah 21 s, kira-kira berapa kali bentuk yang berubah itu berganti warna di depanmu sebelum kamu menyadarinya?', a: 'Sekitar 21 / 1,4 = 15 siklus, dan bentuk itu berganti warna dua kali per siklus (A ke B dan B ke A), sehingga kira-kira 30 pergantian warna terjadi di depan mata sebelum kamu menangkapnya.' },
        { q: 'Mengapa perubahan warna yang sama, yang butuh banyak detik untuk ditemukan dalam mode flicker, menjadi jelas dalam satu pergantian pada mode kontinu?', a: 'Tanpa kosong, hanya satu lokasi yang berubah pada saat itu, sehingga transiennya menonjol dan perhatian langsung tertarik ke sana. Dengan kosong, setiap lokasi menghasilkan transien pada saat yang sama, sehingga transien yang penting tidak memberi sinyal unik dan kamu harus memeriksa objek satu per satu.' },
        { q: 'Seorang saksi bersikeras bahwa tidak ada yang berubah di pemandangan saat ia mengawasi, padahal sebuah objek telah diganti. Dengan konsep buta perubahan, jelaskan bagaimana kejujuran saksi dan perubahan itu bisa sama-sama benar.', a: 'Saksi itu sungguh-sungguh mengalami pemandangan yang stabil karena otak hanya menyimpan objek yang diperhatikan di antara pandangan; penggantian yang bertepatan dengan kedipan, gerakan mata, atau gangguan tidak menghasilkan transien dan tidak pernah dibandingkan dengan pandangan sebelumnya. Masalahnya bukan kejujuran, melainkan batas perhatian dan memori visual.' },
      ],
    },
  },
};
