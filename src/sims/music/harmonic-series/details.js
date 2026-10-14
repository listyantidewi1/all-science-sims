// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Build a sawtooth, square, or clarinet-like timbre from sine harmonics.',
      'See the Fourier-series construction with your own ears.',
      'Learn why timbre depends on the relative weights of overtones.',
    ],
    id: [
      'Bangun timbre gergaji, kotak, atau seperti klarinet dari harmonik sinus.',
      'Lihat dan dengar konstruksi deret Fourier secara langsung.',
      'Memahami mengapa timbre bergantung pada bobot relatif harmonik.',
    ],
  },  tryThis: {
    en: [
      'Preset "sawtooth": every harmonic with weight 1/n.',
      'Preset "square": only odd harmonics with weight 1/n.',
      'Preset "clarinet": odd harmonics only, but stronger lows.',
    ],
    id: [
      'Preset "gergaji": semua harmonik dengan bobot 1/n.',
      'Preset "kotak": hanya harmonik ganjil dengan bobot 1/n.',
      'Preset "klarinet": harmonik ganjil saja, frekuensi rendah lebih kuat.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A guitar string, a flute and a singing voice can all play the same note, yet you never confuse them. The pitch you hear is set by the lowest frequency in the sound, the fundamental f₀. But a vibrating string or air column does not produce only f₀: it vibrates in several patterns at once, and each pattern has its own frequency. For a string fixed at both ends, the allowed patterns fit 1, 2, 3, … half-wavelengths between the ends, so their frequencies are exactly 1f₀, 2f₀, 3f₀, … These are the harmonics, and the recipe of how strongly each one is present is what gives an instrument its timbre.',
        'The simulation adds eight sine waves with frequencies n·f₀ for n = 1 to 8 and lets you set the weight of each one between −1 and +1 (a negative weight simply flips that harmonic upside down). The top panel shows the sum over two periods of the fundamental, scaled to fit; the bars below show the weights. This is a Fourier series built by hand: the mathematician Fourier showed that any repeating waveform can be written as such a sum. The presets give textbook recipes. Weights 1/n for all n approach a sawtooth; 1/n for odd n only approach a square wave; and odd harmonics with weights that fall off faster, 1/n^1.4, give a hollow, clarinet-like tone.',
        'The fundamental slider changes f₀, which moves every harmonic together, so the pitch changes but the shape of the waveform, and so the timbre, stays the same. Press Play and the sim drives eight real oscillators with the same weights, so you can hear what each bar contributes. Notice that even when you turn the fundamental down to zero and leave only H2 and H3, the pattern still repeats once every 1/f₀ seconds, so your ear tends to still hear the pitch f₀: pitch is tied to the repetition period, not to the loudest component.',
        'Keep the simplifications in mind. A true sawtooth or square wave needs infinitely many harmonics, so with only eight the sharp edges come out wavy. All harmonics here start in the same phase, whereas in real sounds the phases differ and also drift. Real instruments add noise (breath, bow scrape), their harmonic recipe changes from the attack to the decay, and stiff strings such as piano wires have overtones slightly higher than exact multiples. The sim freezes one snapshot of a steady tone, which is exactly what makes the role of each harmonic easy to hear.',
      ],
      id: [
        'Dawai gitar, seruling, dan suara penyanyi bisa membunyikan nada yang sama, tetapi kamu tidak pernah keliru membedakannya. Tinggi nada yang terdengar ditentukan oleh frekuensi terendah dalam bunyi itu, yaitu frekuensi dasar f₀. Namun dawai atau kolom udara yang bergetar tidak hanya menghasilkan f₀: ia bergetar dalam beberapa pola sekaligus, dan tiap pola punya frekuensinya sendiri. Pada dawai yang terikat di kedua ujung, pola yang mungkin memuat 1, 2, 3, … setengah panjang gelombang di antara kedua ujung, sehingga frekuensinya tepat 1f₀, 2f₀, 3f₀, … Inilah harmonik, dan "resep" seberapa kuat tiap harmonik hadir itulah yang memberi warna nada (timbre) pada sebuah alat musik.',
        'Simulasi ini menjumlahkan delapan gelombang sinus berfrekuensi n·f₀ untuk n = 1 sampai 8 dan membolehkanmu mengatur bobot masing-masing antara −1 dan +1 (bobot negatif hanya membalik harmonik itu). Panel atas menampilkan jumlahnya selama dua periode frekuensi dasar, diskalakan agar muat; batang di bawahnya menunjukkan bobotnya. Ini adalah deret Fourier yang disusun dengan tangan: matematikawan Fourier menunjukkan bahwa setiap bentuk gelombang berulang dapat ditulis sebagai jumlah seperti ini. Preset memberikan resep buku teks. Bobot 1/n untuk semua n mendekati gelombang gergaji; 1/n hanya untuk n ganjil mendekati gelombang kotak; dan harmonik ganjil dengan bobot yang turun lebih cepat, 1/n^1,4, menghasilkan nada berongga mirip klarinet.',
        'Slider frekuensi dasar mengubah f₀, yang menggeser semua harmonik bersama-sama, sehingga tinggi nadanya berubah tetapi bentuk gelombang, dan karenanya warna nada, tetap sama. Tekan Play dan simulasi menggerakkan delapan osilator sungguhan dengan bobot yang sama, jadi kamu bisa mendengar sumbangan tiap batang. Perhatikan bahwa walaupun bobot frekuensi dasar dinolkan dan hanya H2 dan H3 yang tersisa, polanya tetap berulang setiap 1/f₀ sekon, sehingga telinga cenderung tetap mendengar tinggi nada f₀: tinggi nada terikat pada periode pengulangan, bukan pada komponen yang paling keras.',
        'Ingat penyederhanaannya. Gelombang gergaji atau kotak yang sejati membutuhkan harmonik tak hingga banyaknya, sehingga dengan hanya delapan harmonik tepian tajamnya tampak bergelombang. Semua harmonik di sini mulai dengan fase yang sama, sedangkan pada bunyi nyata fasenya berbeda-beda dan juga bergeser. Alat musik sungguhan menambahkan derau (napas, gesekan busur), resep harmoniknya berubah dari awal bunyi sampai meredup, dan dawai yang kaku seperti kawat piano memiliki nada atas yang sedikit lebih tinggi daripada kelipatan bulat. Simulasi ini membekukan satu potret nada yang stabil, dan justru itulah yang membuat peran tiap harmonik mudah didengar.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the first three vibration patterns of a string fixed at both ends; each extra half-wave adds f₀ to the frequency. Right: the harmonic ladder up to 8f₀, with the musical intervals between neighbouring rungs.',
        id: 'Kiri: tiga pola getaran pertama dawai yang terikat di kedua ujung; tiap tambahan setengah gelombang menambah f₀ pada frekuensinya. Kanan: tangga harmonik sampai 8f₀, dengan interval musik di antara anak tangga yang bertetangga.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const mode = (n, cy) => {
          let a = '', b = '';
          for (let i = 0; i <= 60; i++) {
            const u = i / 60, x = (20 + u * 130).toFixed(1), dy = 14 * Math.sin(n * Math.PI * u);
            a += `${i ? 'L' : 'M'}${x} ${(cy - dy).toFixed(1)} `;
            b += `${i ? 'L' : 'M'}${x} ${(cy + dy).toFixed(1)} `;
          }
          return `<path d="${a.trim()}" class="s" stroke="#3b82f6"/><path d="${b.trim()}" class="s" stroke="#3b82f6" opacity=".35" stroke-dasharray="3 3"/>`;
        };
        const rungY = (n) => 222 - n * 26;
        const rungs = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `<line x1="235" y1="${rungY(n)}" x2="285" y2="${rungY(n)}" stroke="${n % 2 ? '#3b82f6' : '#8b5cf6'}" stroke-width="3"/><text x="200" y="${rungY(n) + 4}">${n}·f₀</text>`).join('');
        const gap = (n, en, id) => `<text x="292" y="${(rungY(n) + rungY(n + 1)) / 2 + 4}" class="g">${L(en, id)}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('String modes and the harmonic ladder', 'Pola getar dawai dan tangga harmonik')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.g{font-size:10px;opacity:.8}.s{fill:none;stroke-width:1.8}.p{stroke:currentColor;stroke-width:3}</style>
  <line x1="20" y1="30" x2="20" y2="200" class="p"/>
  <line x1="150" y1="30" x2="150" y2="200" class="p"/>
  ${mode(1, 55)}<text x="26" y="36">n = 1 · f₀</text>
  ${mode(2, 115)}<text x="26" y="96">n = 2 · 2f₀</text>
  ${mode(3, 175)}<text x="26" y="156">n = 3 · 3f₀</text>
  <text x="20" y="222" class="g">${L('string fixed at both ends', 'dawai terikat di kedua ujung')}</text>
  <line x1="260" y1="222" x2="260" y2="10" stroke="currentColor" stroke-width="1" opacity=".4"/>
  ${rungs}
  ${gap(1, 'octave 2:1', 'oktaf 2:1')}
  ${gap(2, 'fifth 3:2', 'kuint 3:2')}
  ${gap(3, 'fourth 4:3', 'kuart 4:3')}
  ${gap(4, 'major 3rd 5:4', 'terts mayor 5:4')}
  <text x="292" y="${rungY(7) + 4}" class="g" fill="#3b82f6">${L('odd', 'ganjil')}</text>
  <text x="292" y="${rungY(8) + 4}" class="g" fill="#8b5cf6">${L('even', 'genap')}</text>
  <text x="200" y="234" class="g">${L('frequency ↑', 'frekuensi ↑')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A vibrating string or air column produces a fundamental f₀ plus harmonics at exact whole-number multiples: 2f₀, 3f₀, 4f₀, …',
        'Pitch is set by the fundamental (the repetition rate); timbre is set by the relative weights of the harmonics.',
        'Any repeating waveform can be built by adding sine waves of the right weights: this is a Fourier series.',
        'Odd harmonics only (square, clarinet) give a symmetric, hollow waveform; all harmonics (sawtooth) give a bright, buzzy one.',
        'Neighbouring harmonics form the basic musical intervals: 2:1 octave, 3:2 fifth, 4:3 fourth, 5:4 major third.',
      ],
      id: [
        'Dawai atau kolom udara yang bergetar menghasilkan frekuensi dasar f₀ plus harmonik pada kelipatan bulat yang tepat: 2f₀, 3f₀, 4f₀, …',
        'Tinggi nada ditentukan oleh frekuensi dasar (laju pengulangan); warna nada ditentukan oleh bobot relatif harmoniknya.',
        'Setiap bentuk gelombang berulang dapat disusun dengan menjumlahkan gelombang sinus berbobot tepat: inilah deret Fourier.',
        'Hanya harmonik ganjil (kotak, klarinet) memberi bentuk gelombang simetris yang terdengar berongga; semua harmonik (gergaji) memberi bunyi terang dan berdengung.',
        'Harmonik yang bertetangga membentuk interval musik dasar: oktaf 2:1, kuint 3:2, kuart 4:3, terts mayor 5:4.',
      ],
    },
    vocabulary: {
      en: [
        ['Fundamental (f₀)', 'The lowest frequency in a periodic sound; it sets the pitch we hear.'],
        ['Harmonic', 'A component whose frequency is a whole-number multiple of the fundamental; the n-th harmonic has frequency n·f₀.'],
        ['Overtone', 'Any component above the fundamental; the first overtone is the second harmonic.'],
        ['Timbre', 'The quality that distinguishes two sounds of the same pitch and loudness, largely set by the harmonic recipe.'],
        ['Fourier series', 'A way of writing a repeating waveform as a sum of sine waves at the fundamental and its harmonics.'],
        ['Standing wave', 'A vibration pattern with fixed nodes, formed on a string or in a pipe when waves reflect back and forth.'],
        ['Sawtooth and square wave', 'Classic waveforms: the sawtooth contains all harmonics with weights 1/n, the square wave only odd harmonics with weights 1/n.'],
      ],
      id: [
        ['Frekuensi dasar (f₀)', 'Frekuensi terendah dalam bunyi periodik; menentukan tinggi nada yang kita dengar.'],
        ['Harmonik', 'Komponen yang frekuensinya kelipatan bulat dari frekuensi dasar; harmonik ke-n berfrekuensi n·f₀.'],
        ['Nada atas', 'Komponen apa pun di atas frekuensi dasar; nada atas pertama adalah harmonik kedua.'],
        ['Warna nada (timbre)', 'Sifat yang membedakan dua bunyi dengan tinggi nada dan kekerasan sama, sebagian besar ditentukan oleh resep harmoniknya.'],
        ['Deret Fourier', 'Cara menuliskan bentuk gelombang berulang sebagai jumlah gelombang sinus pada frekuensi dasar dan harmoniknya.'],
        ['Gelombang berdiri', 'Pola getaran dengan simpul tetap, terbentuk pada dawai atau pipa ketika gelombang terpantul bolak-balik.'],
        ['Gelombang gergaji dan kotak', 'Bentuk gelombang klasik: gergaji memuat semua harmonik berbobot 1/n, kotak hanya harmonik ganjil berbobot 1/n.'],
      ],
    },
    misconceptions: {
      en: [
        ['Adding harmonics makes the note higher.', 'The pitch stays at f₀ because the whole pattern still repeats f₀ times per second. Harmonics change the brightness and colour of the note, not its pitch.'],
        ['A harmonic is just a slightly different, nearby frequency.', 'Harmonics are at exact whole-number multiples, so they are far apart in pitch: the second harmonic is an octave above the fundamental, the third an octave plus a fifth.'],
        ['The louder a harmonic is, the more it defines the pitch.', 'Pitch follows the repetition period of the whole waveform. Even with the fundamental turned off, a tone with only H2 and H3 repeats every 1/f₀ seconds and is usually heard at the pitch f₀.'],
      ],
      id: [
        ['Menambah harmonik membuat nadanya lebih tinggi.', 'Tinggi nadanya tetap f₀ karena seluruh pola tetap berulang f₀ kali per sekon. Harmonik mengubah keterangan dan warna nada, bukan tinggi nadanya.'],
        ['Harmonik hanyalah frekuensi lain yang sedikit berbeda dan berdekatan.', 'Harmonik berada pada kelipatan bulat yang tepat, sehingga jarak nadanya jauh: harmonik kedua satu oktaf di atas frekuensi dasar, harmonik ketiga satu oktaf plus satu kuint.'],
        ['Harmonik yang paling keras yang menentukan tinggi nada.', 'Tinggi nada mengikuti periode pengulangan seluruh gelombang. Bahkan dengan frekuensi dasar dimatikan, nada yang hanya berisi H2 dan H3 berulang setiap 1/f₀ sekon dan biasanya terdengar pada tinggi nada f₀.'],
      ],
    },
    realWorld: {
      en: [
        'A clarinet behaves like a pipe closed at one end, which suppresses the even harmonics; a flute, open at both ends, has them all. That is why the two sound so different on the same note.',
        'Guitarists play "harmonics" by lightly touching the string at its midpoint or third point, which forces a node there and lets only the 2nd (or 3rd) harmonic and its multiples ring.',
        'Synthesizers and the sound chips in old video-game consoles generate sawtooth, square and pulse waves directly, then filter their harmonics to shape the tone.',
        'Audio compression formats such as MP3 analyse sound into its frequency components, the same decomposition the sim does in reverse.',
      ],
      id: [
        'Klarinet berperilaku seperti pipa yang tertutup di satu ujung, sehingga harmonik genapnya tertekan; seruling, yang terbuka di kedua ujung, memiliki semuanya. Itulah mengapa keduanya terdengar sangat berbeda pada nada yang sama.',
        'Pemain gitar membunyikan "harmonik" dengan menyentuh ringan dawai di titik tengah atau sepertiganya, yang memaksa simpul di sana dan hanya membiarkan harmonik ke-2 (atau ke-3) beserta kelipatannya berbunyi.',
        'Synthesizer dan chip suara konsol gim lama menghasilkan gelombang gergaji, kotak, dan pulsa secara langsung, lalu menyaring harmoniknya untuk membentuk nada.',
        'Format kompresi audio seperti MP3 mengurai bunyi menjadi komponen frekuensinya, dekomposisi yang sama dengan yang dilakukan simulasi ini secara terbalik.',
      ],
    },
    questions: {
      en: [
        { q: 'With f₀ = 220 Hz, what are the frequencies of H2, H3 and H4, and what interval separates H2 from H3?', a: 'H2 = 440 Hz, H3 = 660 Hz, H4 = 880 Hz, because f_n = n·f₀. H3/H2 = 660/440 = 1.5 = 3:2, a perfect fifth. H2 and H4 are an octave apart (2:1).' },
        { q: 'Why does the Square preset set H2, H4, H6 and H8 to zero, and what kind of instrument behaves like that?', a: 'A square wave is symmetric: its second half is an upside-down copy of its first half, and only odd harmonics have that symmetry, so even harmonics must be absent. A pipe closed at one end, such as a clarinet, has the same odd-only series, which is why the Clarinet preset also leaves the even bars empty.' },
        { q: 'You double f₀ from 220 to 440 Hz with the Sawtooth preset active. What happens to each harmonic\'s frequency, to the ratios between them, and to the waveform shape?', a: 'Every harmonic doubles (H3 goes from 660 to 1320 Hz), so all ratios stay the same: H2/H1 is still 2, H3/H2 still 1.5. The weights have not changed, so the waveform drawn over two periods looks identical; only the pitch is an octave higher.' },
      ],
      id: [
        { q: 'Dengan f₀ = 220 Hz, berapa frekuensi H2, H3, dan H4, dan interval apa yang memisahkan H2 dari H3?', a: 'H2 = 440 Hz, H3 = 660 Hz, H4 = 880 Hz, karena f_n = n·f₀. H3/H2 = 660/440 = 1,5 = 3:2, yaitu kuint sempurna. H2 dan H4 berjarak satu oktaf (2:1).' },
        { q: 'Mengapa preset Kotak menolkan H2, H4, H6, dan H8, dan alat musik seperti apa yang berperilaku demikian?', a: 'Gelombang kotak bersifat simetris: paruh keduanya adalah salinan terbalik dari paruh pertama, dan hanya harmonik ganjil yang punya simetri itu, sehingga harmonik genap harus tidak ada. Pipa yang tertutup di satu ujung, seperti klarinet, memiliki deret ganjil-saja yang sama, sehingga preset Klarinet juga mengosongkan batang genap.' },
        { q: 'Kamu menggandakan f₀ dari 220 ke 440 Hz dengan preset Gergaji aktif. Apa yang terjadi pada frekuensi tiap harmonik, pada rasio di antaranya, dan pada bentuk gelombangnya?', a: 'Setiap harmonik menjadi dua kali lipat (H3 dari 660 ke 1320 Hz), sehingga semua rasio tetap: H2/H1 tetap 2, H3/H2 tetap 1,5. Bobotnya tidak berubah, jadi bentuk gelombang yang digambar selama dua periode tampak identik; hanya tinggi nadanya satu oktaf lebih tinggi.' },
      ],
    },
  },
};
