// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect F1 (mouth opening) and F2 (tongue position) to vowel identity.',
      'See why /i/ and /u/ sit at opposite corners of the formant map.',
      'Understand how source-filter synthesis builds vowels from a buzz + two peaks.',
    ],
    id: [
      'Menghubungkan F1 (bukaan mulut) dan F2 (posisi lidah) dengan identitas vokal.',
      'Melihat mengapa /i/ dan /u/ berada di sudut berlawanan peta forman.',
      'Memahami sintesis source-filter membangun vokal dari buzz + dua puncak.',
    ],
  },  tryThis: {
    en: [
      'Drag to F1 ≈ 800, F2 ≈ 1200 — that is /a/ ("ah").',
      'Drag to F1 ≈ 300, F2 ≈ 2300 — that is /i/ ("ee").',
      'Drag to F1 ≈ 300, F2 ≈ 700 — that is /u/ ("oo").',
    ],
    id: [
      'Geser ke F1 ≈ 800, F2 ≈ 1200 — itu /a/.',
      'Geser ke F1 ≈ 300, F2 ≈ 2300 — itu /i/.',
      'Geser ke F1 ≈ 300, F2 ≈ 700 — itu /u/.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Say "ee" and then "ah" on the same note. Your vocal folds buzz at the same pitch both times; what changes is the shape of the tube above them. Speech is a source-filter system: the vocal folds produce a buzz rich in harmonics (the source), and the throat, mouth and lips form a resonant tube (the filter) that boosts some frequency regions and damps others. The boosted regions are the formants, numbered F1, F2, F3, … from the lowest up. For a vowel, the first two carry most of the identity: F1 rises as the jaw opens and the tongue lowers, F2 rises as the tongue moves forward and falls as it moves back or the lips round.',
        'The simulation builds a vowel the same way. A sawtooth oscillator at the glottal pitch (80–250 Hz) stands in for the vocal folds, because a sawtooth contains every harmonic. Its output passes through two band-pass filters in series, centred on F1 and F2, each with a fixed sharpness (Q = 8). The canvas is a vowel chart: F2 runs along the horizontal axis with high values on the left, F1 runs down the vertical axis, so the layout matches the traditional articulatory diagram with front-close /i/ at top left, back-close /u/ at top right and open /a/ at the bottom. The grey dots are average formant values measured for adult male speakers, and the readout names the nearest one.',
        'Drag the orange dot or move the sliders and listen. Moving straight down (raising F1) opens the vowel from /i/ toward /æ/; moving right (lowering F2) pulls the tongue back from /i/ toward /u/. Changing the glottal pitch slider changes the note you are singing but not the vowel, which is the central lesson: pitch belongs to the source, vowel identity to the filter. The preset buttons jump to the six reference vowels so you can hear the filter alone change while the buzz stays fixed.',
        'The model is a caricature of a real vocal tract. Real speech has F3 and higher formants, which matter for /r/, for distinguishing speakers and for making /i/ sound convincing; the sim stops at two. Real formant bandwidths vary, the glottal source falls off faster with frequency than a sawtooth, and nasal sounds and consonants are not modelled at all. The reference dots are averages for adult men; women\'s and children\'s formants are noticeably higher because their vocal tracts are shorter, so the same vowel sits at different coordinates. Treat the chart as a map of relative positions rather than exact targets.',
      ],
      id: [
        'Ucapkan "i" lalu "a" pada nada yang sama. Pita suaramu bergetar pada tinggi nada yang sama di kedua kali itu; yang berubah adalah bentuk saluran di atasnya. Ucapan adalah sistem sumber-filter: pita suara menghasilkan dengung yang kaya harmonik (sumber), dan tenggorokan, mulut, serta bibir membentuk tabung beresonansi (filter) yang memperkuat beberapa daerah frekuensi dan meredam yang lain. Daerah yang diperkuat itulah forman, dinomori F1, F2, F3, … dari yang terendah. Untuk vokal, dua forman pertama membawa sebagian besar identitasnya: F1 naik saat rahang membuka dan lidah turun, F2 naik saat lidah maju dan turun saat lidah mundur atau bibir membulat.',
        'Simulasi ini membangun vokal dengan cara yang sama. Osilator gigi gergaji pada tinggi nada glotal (80–250 Hz) mewakili pita suara, karena gelombang gergaji memuat semua harmonik. Keluarannya melewati dua filter lolos-pita secara berurutan, berpusat pada F1 dan F2, masing-masing dengan ketajaman tetap (Q = 8). Kanvasnya adalah peta vokal: F2 di sumbu mendatar dengan nilai tinggi di kiri, F1 ke bawah di sumbu tegak, sehingga tata letaknya cocok dengan diagram artikulasi tradisional: /i/ depan-tertutup di kiri atas, /u/ belakang-tertutup di kanan atas, dan /a/ terbuka di bawah. Titik abu-abu adalah nilai forman rata-rata hasil pengukuran penutur pria dewasa, dan tampilan menyebutkan yang terdekat.',
        'Seret titik oranye atau geser slider dan dengarkan. Bergerak lurus ke bawah (menaikkan F1) membuka vokal dari /i/ ke arah /æ/; bergerak ke kanan (menurunkan F2) menarik lidah ke belakang dari /i/ ke arah /u/. Mengubah slider tinggi nada glotal mengubah nada yang kamu nyanyikan tetapi bukan vokalnya, dan inilah pelajaran utamanya: tinggi nada milik sumber, identitas vokal milik filter. Tombol preset melompat ke enam vokal acuan sehingga kamu bisa mendengar hanya filternya yang berubah sementara dengungnya tetap.',
        'Model ini adalah karikatur saluran suara sungguhan. Ucapan nyata memiliki F3 dan forman yang lebih tinggi, yang penting untuk /r/, untuk membedakan penutur, dan untuk membuat /i/ terdengar meyakinkan; simulasi berhenti di dua. Lebar pita forman nyata bervariasi, sumber glotal melemah lebih cepat terhadap frekuensi daripada gelombang gergaji, dan bunyi sengau serta konsonan sama sekali tidak dimodelkan. Titik acuan adalah rata-rata pria dewasa; forman perempuan dan anak-anak jelas lebih tinggi karena saluran suaranya lebih pendek, sehingga vokal yang sama berada di koordinat yang berbeda. Anggap peta ini sebagai peta posisi relatif, bukan sasaran yang tepat.',
      ],
    },
    figure: {
      caption: {
        en: 'Source-filter model of a vowel. The glottal buzz supplies a comb of harmonics at multiples of the pitch f₀; the vocal tract filter has resonant peaks at F1 and F2; the output is the comb shaped by the filter. Changing f₀ moves the comb teeth but not the peaks.',
        id: 'Model sumber-filter sebuah vokal. Dengung glotal menyediakan sisir harmonik pada kelipatan tinggi nada f₀; filter saluran suara memiliki puncak resonansi di F1 dan F2; keluarannya adalah sisir yang dibentuk oleh filter. Mengubah f₀ menggeser gigi sisir, tetapi tidak menggeser puncaknya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const base = 150, top = 60;
        const filt = (u) => Math.exp(-((u - 0.22) ** 2) / 0.006) + 0.75 * Math.exp(-((u - 0.6) ** 2) / 0.008) + 0.08;
        const comb = (x0, w, shape) => {
          let s = '';
          for (let n = 1; n <= 16; n++) {
            const u = n / 17, hgt = (1 / n ** 0.6) * shape(u);
            const x = (x0 + u * w).toFixed(1);
            s += `<line x1="${x}" y1="${base}" x2="${x}" y2="${(base - hgt * (base - top)).toFixed(1)}" stroke="#3b82f6" stroke-width="2"/>`;
          }
          return s;
        };
        const curve = (x0, w) => {
          let d = '';
          for (let i = 0; i <= 50; i++) { const u = i / 50; d += `${i ? 'L' : 'M'}${(x0 + u * w).toFixed(1)} ${(base - filt(u) / 1.08 * (base - top)).toFixed(1)} `; }
          return d.trim();
        };
        const panel = (x0, w, title) => `<line x1="${x0}" y1="${base}" x2="${x0 + w}" y2="${base}" class="ax"/><text x="${x0}" y="${top - 12}" class="t">${title}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Source, filter and output spectra of a vowel', 'Spektrum sumber, filter, dan keluaran sebuah vokal')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.t{font-weight:600}.s{font-size:9px;opacity:.8}.ax{stroke:currentColor;stroke-width:1;opacity:.5}</style>
  ${panel(10, 100, L('source: glottal buzz', 'sumber: dengung glotal'))}
  ${comb(10, 100, () => 1)}
  <text x="10" y="${base + 14}" class="s">f₀  2f₀  3f₀ …</text>
  <text x="112" y="${base - 36}" class="t">×</text>
  ${panel(130, 100, L('filter: vocal tract', 'filter: saluran suara'))}
  <path d="${curve(130, 100)}" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
  <text x="${130 + 0.22 * 100 - 8}" y="${top - 2}" fill="#f59e0b">F1</text>
  <text x="${130 + 0.6 * 100 - 8}" y="${top + 14}" fill="#f59e0b">F2</text>
  <text x="130" y="${base + 14}" class="s">${L('frequency →', 'frekuensi →')}</text>
  <text x="234" y="${base - 36}" class="t">=</text>
  ${panel(250, 100, L('output: vowel', 'keluaran: vokal'))}
  <path d="${curve(250, 100)}" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3 3" opacity=".7"/>
  ${comb(250, 100, (u) => filt(u) / 1.08)}
  <text x="${250 + 0.22 * 100 - 8}" y="${top - 2}" fill="#f59e0b">F1</text>
  <text x="${250 + 0.6 * 100 - 8}" y="${top + 14}" fill="#f59e0b">F2</text>
  <text x="10" y="190" class="s">${L('pitch slider: moves the blue teeth closer or further apart', 'slider tinggi nada: merapatkan atau merenggangkan gigi biru')}</text>
  <text x="10" y="206" class="s">${L('F1, F2 sliders: move the orange peaks, which decides the vowel', 'slider F1, F2: menggeser puncak oranye, yang menentukan vokalnya')}</text>
  <text x="10" y="226" class="s">${L('F1 ↑ = jaw more open · F2 ↑ = tongue further forward', 'F1 ↑ = rahang lebih terbuka · F2 ↑ = lidah lebih ke depan')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Speech is source plus filter: the vocal folds supply a harmonic-rich buzz, and the vocal tract shapes it with resonant peaks called formants.',
        'The first two formants largely determine which vowel is heard: F1 tracks mouth opening, F2 tracks tongue front-back position.',
        'Pitch and vowel are independent: changing f₀ moves the harmonics but not the formant peaks, so the vowel stays the same.',
        'A neutral vocal tract about 17 cm long resonates near 500, 1500 and 2500 Hz, like a tube closed at one end; moving tongue and lips shifts these peaks.',
        'The vowel chart in the sim uses average adult-male values; women and children have higher formants because their tracts are shorter.',
      ],
      id: [
        'Ucapan adalah sumber plus filter: pita suara menyediakan dengung kaya harmonik, dan saluran suara membentuknya dengan puncak resonansi yang disebut forman.',
        'Dua forman pertama sangat menentukan vokal yang terdengar: F1 mengikuti bukaan mulut, F2 mengikuti posisi depan-belakang lidah.',
        'Tinggi nada dan vokal saling bebas: mengubah f₀ menggeser harmonik tetapi tidak menggeser puncak forman, sehingga vokalnya tetap.',
        'Saluran suara netral sepanjang sekitar 17 cm beresonansi di dekat 500, 1500, dan 2500 Hz, seperti tabung yang tertutup di satu ujung; menggerakkan lidah dan bibir menggeser puncak-puncak ini.',
        'Peta vokal di simulasi memakai nilai rata-rata pria dewasa; perempuan dan anak-anak memiliki forman lebih tinggi karena salurannya lebih pendek.',
      ],
    },
    vocabulary: {
      en: [
        ['Formant', 'A frequency region that the vocal tract amplifies by resonance; F1 is the lowest, F2 the next.'],
        ['Source-filter model', 'The idea that speech is a sound source (the vibrating vocal folds) shaped by a filter (the vocal tract).'],
        ['Glottal pitch (f₀)', 'The rate at which the vocal folds open and close; it sets the pitch of the voice and the spacing of its harmonics.'],
        ['Vocal tract', 'The air passage from the vocal folds to the lips, roughly 17 cm long in adult men.'],
        ['Band-pass filter', 'A filter that lets through frequencies near its centre and attenuates the rest; the sim uses two in series to imitate F1 and F2.'],
        ['Resonance', 'The strong response of an air column at frequencies where reflected waves reinforce each other.'],
        ['Vowel chart', 'A plot of F1 against F2 on which each vowel occupies its own region.'],
      ],
      id: [
        ['Forman', 'Daerah frekuensi yang diperkuat saluran suara melalui resonansi; F1 yang terendah, F2 berikutnya.'],
        ['Model sumber-filter', 'Gagasan bahwa ucapan adalah sumber bunyi (pita suara yang bergetar) yang dibentuk oleh filter (saluran suara).'],
        ['Tinggi nada glotal (f₀)', 'Laju pita suara membuka dan menutup; menentukan tinggi nada suara dan jarak antarharmoniknya.'],
        ['Saluran suara', 'Jalur udara dari pita suara sampai bibir, panjangnya sekitar 17 cm pada pria dewasa.'],
        ['Filter lolos-pita', 'Filter yang meloloskan frekuensi di dekat pusatnya dan melemahkan sisanya; simulasi memakai dua secara berurutan untuk meniru F1 dan F2.'],
        ['Resonansi', 'Respons kuat kolom udara pada frekuensi tempat gelombang pantul saling memperkuat.'],
        ['Peta vokal', 'Grafik F1 terhadap F2 yang di dalamnya tiap vokal menempati daerahnya sendiri.'],
      ],
    },
    misconceptions: {
      en: [
        ['Formants are the harmonics of the voice.', 'Harmonics come from the source and sit at multiples of the pitch; formants are properties of the tube and stay put when the pitch changes. A formant is a peak in the envelope that the harmonics trace out.'],
        ['To sing a higher note you must change the vowel.', 'Pitch and vowel are set by different parts of the system. Only at very high pitches, when the harmonics are spaced more widely than the formant peaks, do vowels start to blur, which is why soprano lyrics can be hard to understand.'],
        ['Everyone\'s /a/ has F1 = 730 Hz and F2 = 1090 Hz.', 'Those are averages for adult men. A child\'s or a woman\'s /a/ has higher formants, and the same speaker varies between words. Listeners identify vowels from the pattern of formants relative to each other, not from fixed numbers.'],
      ],
      id: [
        ['Forman adalah harmonik suara.', 'Harmonik berasal dari sumber dan terletak pada kelipatan tinggi nada; forman adalah sifat tabung dan tetap di tempatnya saat tinggi nada berubah. Forman adalah puncak pada selubung yang ditelusuri oleh harmonik-harmonik itu.'],
        ['Untuk menyanyikan nada lebih tinggi kamu harus mengubah vokalnya.', 'Tinggi nada dan vokal diatur oleh bagian sistem yang berbeda. Hanya pada nada yang sangat tinggi, saat jarak harmonik lebih lebar daripada puncak forman, vokal mulai kabur, itulah sebabnya lirik yang dinyanyikan sopran bisa sulit dipahami.'],
        ['Vokal /a/ setiap orang memiliki F1 = 730 Hz dan F2 = 1090 Hz.', 'Itu rata-rata untuk pria dewasa. Vokal /a/ anak-anak atau perempuan memiliki forman lebih tinggi, dan penutur yang sama pun bervariasi antarkata. Pendengar mengenali vokal dari pola forman relatif satu terhadap yang lain, bukan dari angka tetap.'],
      ],
    },
    realWorld: {
      en: [
        'Speech recognition systems start by estimating the spectral envelope of each short slice of sound, which is where the formants live.',
        'Vocoders and "talk box" effects in music pass an instrument\'s sound through filters controlled by a singer\'s mouth, replacing the glottal source with a guitar or synth.',
        'Phoneticians use formant plots to document how accents and languages differ, for example how the vowels of Jakarta Indonesian differ from those of Javanese-influenced speech.',
        'Speech therapists and singing teachers use real-time formant displays to show students how jaw opening and tongue position change a vowel.',
      ],
      id: [
        'Sistem pengenalan ucapan mulai dengan memperkirakan selubung spektrum tiap irisan pendek bunyi, tempat forman berada.',
        'Vocoder dan efek "talk box" dalam musik melewatkan bunyi alat musik melalui filter yang dikendalikan mulut penyanyi, menggantikan sumber glotal dengan gitar atau synth.',
        'Ahli fonetik memakai grafik forman untuk mendokumentasikan perbedaan aksen dan bahasa, misalnya bagaimana vokal bahasa Indonesia dialek Jakarta berbeda dari ucapan yang dipengaruhi bahasa Jawa.',
        'Terapis wicara dan guru vokal memakai tampilan forman waktu-nyata untuk menunjukkan kepada murid bagaimana bukaan rahang dan posisi lidah mengubah sebuah vokal.',
      ],
    },
    questions: {
      en: [
        { q: 'Starting from /u/ (F1 ≈ 300, F2 ≈ 870), you drag the dot down to F1 ≈ 730 while F2 moves only a little. What has the mouth done, and which vowel do you reach?', a: 'Raising F1 corresponds to opening the jaw and lowering the tongue, while a back tongue position keeps F2 low. You arrive near /a/ as in "ah" (F1 ≈ 730, F2 ≈ 1090): the vowel has opened from a close back vowel to an open one.' },
        { q: 'Keep the dot on /i/ and move the glottal pitch slider from 100 Hz to 250 Hz. Does the vowel change? What does change in the sound?', a: 'The vowel stays /i/, because the formant peaks are set by the filters, not by the source. What changes is the pitch and the spacing of the harmonics: at 250 Hz they are 250 Hz apart, so fewer of them fall under each formant peak and the vowel colour becomes a little less distinct.' },
        { q: 'Treat the neutral vocal tract as a 17 cm tube closed at the glottis and open at the lips, with sound speed about 350 m/s in warm humid air. Estimate its first two resonances.', a: 'A closed-open tube resonates at odd multiples of v/(4L). With L = 0.17 m: v/(4L) = 350/0.68 ≈ 515 Hz for the first, and 3 × 515 ≈ 1545 Hz for the second. These are close to the F1 and F2 of the neutral vowel "uh" (schwa), and moving the tongue and lips shifts them to make the other vowels.' },
      ],
      id: [
        { q: 'Mulai dari /u/ (F1 ≈ 300, F2 ≈ 870), kamu menyeret titik ke bawah sampai F1 ≈ 730 sementara F2 hanya sedikit bergeser. Apa yang dilakukan mulut, dan vokal mana yang dicapai?', a: 'Menaikkan F1 bersesuaian dengan membuka rahang dan menurunkan lidah, sementara posisi lidah di belakang menjaga F2 tetap rendah. Kamu tiba di dekat /a/ (F1 ≈ 730, F2 ≈ 1090): vokalnya terbuka dari vokal belakang tertutup menjadi vokal terbuka.' },
        { q: 'Tahan titik di /i/ dan geser slider tinggi nada glotal dari 100 Hz ke 250 Hz. Apakah vokalnya berubah? Apa yang berubah pada bunyinya?', a: 'Vokalnya tetap /i/, karena puncak forman ditentukan oleh filter, bukan oleh sumber. Yang berubah adalah tinggi nada dan jarak antarharmonik: pada 250 Hz jaraknya 250 Hz, sehingga lebih sedikit harmonik yang berada di bawah tiap puncak forman dan warna vokalnya menjadi sedikit kurang jelas.' },
        { q: 'Anggap saluran suara netral sebagai tabung 17 cm yang tertutup di glotis dan terbuka di bibir, dengan cepat rambat bunyi sekitar 350 m/s di udara hangat dan lembap. Perkirakan dua resonansi pertamanya.', a: 'Tabung tertutup-terbuka beresonansi pada kelipatan ganjil v/(4L). Dengan L = 0,17 m: v/(4L) = 350/0,68 ≈ 515 Hz untuk yang pertama, dan 3 × 515 ≈ 1545 Hz untuk yang kedua. Nilai ini dekat dengan F1 dan F2 vokal netral (pepet, seperti "e" pada "emas"), dan menggerakkan lidah serta bibir menggesernya untuk membentuk vokal-vokal lain.' },
      ],
    },
  },
};
