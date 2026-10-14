// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See the FM equation: y(t) = sin(ωc·t + I·sin(ωm·t)).',
      'Connect modulation index I to the spectral spread.',
      'Hear bell, brass, bass, and percussion tones from a single algorithm.',
    ],
    id: [
      'Melihat persamaan FM: y(t) = sin(ωc·t + I·sin(ωm·t)).',
      'Menghubungkan indeks modulasi I dengan penyebaran spektral.',
      'Mendengar nada bel, kuningan, bass, dan perkusi dari satu algoritma.',
    ],
  },
  tryThis: {
    en: [
      'Ratio 1:1, low I — slight vibrato.',
      'Ratio 1:1, high I — bell-like clang.',
      'Ratio 1:3 — woody timbre.',
    ],
    id: [
      'Rasio 1:1, I rendah — vibrato sedikit.',
      'Rasio 1:1, I tinggi — bel berdentang.',
      'Rasio 1:3 — timbre kayu.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A sine oscillator produces the plainest possible tone: one frequency, no overtones. Frequency modulation (FM) takes that oscillator, called the carrier, and makes its frequency rise and fall under the control of a second oscillator, the modulator. If the modulator is slow (a few hertz) and the swing is small, you hear a wobble in pitch, which musicians call vibrato. If the modulator runs at an audio frequency (tens to thousands of hertz), the ear can no longer follow the wobble. Instead it hears a new, steady timbre, because the modulation creates extra frequencies, called sidebands, that were not present in either oscillator.',
        'The simulation computes y(t) = sin(2π·fc·t + I·sin(2π·fm·t)), and the audio graph does the same thing by adding the modulator\'s output, scaled by fm·I, to the carrier\'s frequency. I is the modulation index: the peak frequency swing Δf divided by the modulator frequency, I = Δf / fm. Fourier analysis shows that the sidebands sit at fc ± fm, fc ± 2fm, fc ± 3fm and so on, with amplitudes given by Bessel functions of I. As a rule of thumb about I + 1 pairs of sidebands carry noticeable energy, so turning I up spreads the sound across a wider band of frequencies and makes it brighter and harsher, without making it louder.',
        'The three sliders map directly onto the equation. The carrier frequency fc sets the pitch for whole-number ratios. The ratio fm / fc decides where the sidebands land: with a whole-number ratio (1, 2, 3) every sideband is a multiple of fc, so the spectrum is harmonic and the sound is clearly pitched; with ratio 0.5 the sidebands are spaced fc/2 apart, so the lowest component, and the perceived pitch, drops an octave (the Bass preset). A ratio that is not a simple fraction, such as 1.41, scatters the sidebands into an inharmonic spectrum, which is what gives bells and gongs their metallic clang. The waveform panel shows 50 ms of the output; you can see the cycles bunch up and stretch out as the frequency swings.',
        'The simulation is deliberately minimal. It uses one sine carrier and one sine modulator, and the index I stays constant while a note sounds. Real FM instruments such as the six-operator Yamaha DX7 stack several carriers and modulators and, crucially, move I with an envelope over time: a bright, high-I attack decaying to a mellow, low-I sustain is what makes an FM electric piano or brass sound alive. The ratio slider stops at 0.25, so with fc = 220 Hz the modulator cannot go below 55 Hz; a true singer-style vibrato of 5 to 7 Hz is below its range, and the Vibrato preset is heard as a slight change of timbre rather than a wobble. The sim also shows no spectrum display, so the sidebands have to be inferred from the waveform and from listening.',
      ],
      id: [
        'Osilator sinus menghasilkan nada paling sederhana: satu frekuensi tanpa nada tambahan. Modulasi frekuensi (FM) mengambil osilator itu, yang disebut pembawa (carrier), lalu membuat frekuensinya naik-turun di bawah kendali osilator kedua, yaitu modulator. Jika modulatornya lambat (beberapa hertz) dan ayunannya kecil, kamu mendengar nada yang bergetar, yang oleh musisi disebut vibrato. Jika modulator berjalan pada frekuensi audio (puluhan sampai ribuan hertz), telinga tidak lagi bisa mengikuti getarannya. Yang terdengar justru warna suara (timbre) baru yang stabil, karena modulasi menciptakan frekuensi-frekuensi tambahan, disebut pita sisi (sideband), yang tidak ada pada kedua osilator aslinya.',
        'Simulasi menghitung y(t) = sin(2π·fc·t + I·sin(2π·fm·t)), dan rangkaian audionya melakukan hal yang sama dengan menambahkan keluaran modulator, dikalikan fm·I, ke frekuensi pembawa. I adalah indeks modulasi: simpangan frekuensi maksimum Δf dibagi frekuensi modulator, I = Δf / fm. Analisis Fourier menunjukkan bahwa pita sisi berada pada fc ± fm, fc ± 2fm, fc ± 3fm, dan seterusnya, dengan amplitudo yang mengikuti fungsi Bessel dari I. Sebagai patokan, sekitar I + 1 pasang pita sisi membawa energi yang berarti, sehingga menaikkan I menyebarkan suara ke rentang frekuensi yang lebih lebar dan membuatnya lebih terang dan kasar, tanpa membuatnya lebih keras.',
        'Ketiga slider terhubung langsung ke persamaan itu. Frekuensi pembawa fc menentukan tinggi nada untuk rasio bilangan bulat. Rasio fm / fc menentukan letak pita sisi: dengan rasio bulat (1, 2, 3) semua pita sisi adalah kelipatan fc, sehingga spektrumnya harmonik dan nadanya jelas; dengan rasio 0,5 pita sisi berjarak fc/2, sehingga komponen terendah, dan nada yang terdengar, turun satu oktaf (preset Bass). Rasio yang bukan pecahan sederhana, misalnya 1,41, menyebarkan pita sisi menjadi spektrum inharmonik, dan inilah yang memberi bel dan gong dentang logamnya. Panel gelombang menampilkan 50 ms keluaran; kamu bisa melihat siklusnya merapat dan merenggang saat frekuensinya berayun.',
        'Simulasi ini sengaja dibuat minimal. Ia memakai satu pembawa sinus dan satu modulator sinus, dan indeks I tetap konstan selama nada berbunyi. Instrumen FM sungguhan seperti Yamaha DX7 dengan enam operator menumpuk beberapa pembawa dan modulator dan, yang terpenting, menggerakkan I dengan envelope dari waktu ke waktu: serangan yang terang dengan I tinggi lalu meluruh ke sustain yang lembut dengan I rendah inilah yang membuat piano elektrik atau brass FM terasa hidup. Slider rasio berhenti di 0,25, jadi dengan fc = 220 Hz modulator tidak bisa di bawah 55 Hz; vibrato penyanyi yang sekitar 5 sampai 7 Hz berada di luar jangkauannya, dan preset Vibrato terdengar sebagai perubahan timbre tipis, bukan getaran nada. Simulasi juga tidak menampilkan spektrum, sehingga pita sisi harus disimpulkan dari bentuk gelombang dan dari pendengaran.',
      ],
    },
    figure: {
      caption: {
        en: 'The modulator (amber) pushes the carrier\'s frequency up and down. Where the modulator is high, the output (green) cycles faster; where it is low, the cycles stretch out. The result contains frequencies that neither oscillator produced on its own.',
        id: 'Modulator (oranye) mendorong frekuensi pembawa naik dan turun. Saat modulator tinggi, keluaran (hijau) bersiklus lebih cepat; saat rendah, siklusnya merenggang. Hasilnya mengandung frekuensi yang tidak dihasilkan oleh kedua osilator sendiri-sendiri.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const wave = (fn, y0, amp) => {
          let d = '';
          for (let i = 0; i <= 240; i++) {
            const t = i / 240;
            d += (i ? 'L' : 'M') + (80 + t * 270).toFixed(1) + ' ' + (y0 - amp * fn(t)).toFixed(1);
          }
          return d;
        };
        const car = (t) => Math.sin(2 * Math.PI * 8 * t);
        const mod = (t) => Math.sin(2 * Math.PI * 2 * t);
        const out = (t) => Math.sin(2 * Math.PI * 8 * t + 3 * Math.sin(2 * Math.PI * 2 * t));
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Carrier, modulator and FM output waves', 'Gelombang pembawa, modulator, dan keluaran FM')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}.w{fill:none;stroke-width:1.8}</style>
  <line x1="80" y1="40" x2="350" y2="40" class="m"/>
  <line x1="80" y1="110" x2="350" y2="110" class="m"/>
  <line x1="80" y1="190" x2="350" y2="190" class="m"/>
  <path d="${wave(car, 40, 20)}" class="w" stroke="#3b82f6"/>
  <path d="${wave(mod, 110, 20)}" class="w" stroke="#f59e0b"/>
  <path d="${wave(out, 190, 26)}" class="w" stroke="#10b981"/>
  <text x="6" y="36" fill="#3b82f6">${L('carrier', 'pembawa')}</text>
  <text x="6" y="50" fill="#3b82f6">fc</text>
  <text x="6" y="106" fill="#f59e0b">modulator</text>
  <text x="6" y="120" fill="#f59e0b">fm, I</text>
  <text x="6" y="186" fill="#10b981">${L('FM output', 'keluaran FM')}</text>
  <text x="6" y="200" fill="#10b981">y(t)</text>
  <line x1="113" y1="132" x2="113" y2="160" class="m" stroke-dasharray="3 3"/>
  <line x1="181" y1="132" x2="181" y2="160" class="m" stroke-dasharray="3 3"/>
  <text x="90" y="232">${L('frequency high here', 'frekuensi tinggi di sini')}</text>
  <text x="232" y="232">${L('frequency low here', 'frekuensi rendah di sini')}</text>
  <line x1="113" y1="222" x2="113" y2="214" class="m"/>
  <line x1="181" y1="222" x2="181" y2="214" class="m"/>
  <text x="140" y="140">+</text>
  <text x="208" y="140">−</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'FM makes one oscillator (the modulator) steer the frequency of another (the carrier): y(t) = sin(2π·fc·t + I·sin(2π·fm·t)).',
        'Modulation creates sidebands at fc ± k·fm; roughly I + 1 pairs matter, so a larger index I means a brighter, wider spectrum.',
        'Whole-number fm/fc ratios give harmonic, clearly pitched tones; irrational ratios give inharmonic, bell-like tones.',
        'The index I = Δf / fm controls timbre, not loudness: raising it redistributes energy from the carrier into the sidebands.',
        'Slow modulation (a few Hz, small I) is heard as vibrato; audio-rate modulation is heard as a new timbre.',
      ],
      id: [
        'FM membuat satu osilator (modulator) mengendalikan frekuensi osilator lain (pembawa): y(t) = sin(2π·fc·t + I·sin(2π·fm·t)).',
        'Modulasi menciptakan pita sisi pada fc ± k·fm; sekitar I + 1 pasang yang berarti, sehingga indeks I yang lebih besar berarti spektrum lebih terang dan lebar.',
        'Rasio fm/fc bilangan bulat memberi nada harmonik yang jelas; rasio irasional memberi nada inharmonik seperti bel.',
        'Indeks I = Δf / fm mengatur timbre, bukan kekerasan: menaikkannya memindahkan energi dari pembawa ke pita sisi.',
        'Modulasi lambat (beberapa Hz, I kecil) terdengar sebagai vibrato; modulasi pada laju audio terdengar sebagai timbre baru.',
      ],
    },
    vocabulary: {
      en: [
        ['Carrier', 'The oscillator whose frequency is being modulated; its frequency fc usually sets the pitch.'],
        ['Modulator', 'The oscillator that varies the carrier\'s frequency, at frequency fm.'],
        ['Modulation index (I)', 'Peak frequency deviation divided by the modulator frequency, I = Δf / fm; it sets how many sidebands are audible.'],
        ['Sideband', 'A frequency component at fc ± k·fm created by the modulation; it exists in neither oscillator alone.'],
        ['Ratio', 'fm divided by fc. Whole-number ratios give harmonic spectra; other ratios give inharmonic ones.'],
        ['Harmonic spectrum', 'A set of partials that are all whole-number multiples of one fundamental frequency, heard as a single clear pitch.'],
        ['Timbre', 'The quality that distinguishes two sounds of the same pitch and loudness, set by the spectrum and how it changes over time.'],
        ['Bessel functions', 'The mathematical functions J_k(I) that give the amplitude of the k-th sideband pair for a given index I.'],
      ],
      id: [
        ['Pembawa (carrier)', 'Osilator yang frekuensinya dimodulasi; frekuensinya fc biasanya menentukan tinggi nada.'],
        ['Modulator', 'Osilator yang mengubah-ubah frekuensi pembawa, pada frekuensi fm.'],
        ['Indeks modulasi (I)', 'Simpangan frekuensi maksimum dibagi frekuensi modulator, I = Δf / fm; menentukan berapa banyak pita sisi yang terdengar.'],
        ['Pita sisi (sideband)', 'Komponen frekuensi pada fc ± k·fm yang tercipta oleh modulasi; tidak ada pada kedua osilator secara terpisah.'],
        ['Rasio', 'fm dibagi fc. Rasio bilangan bulat memberi spektrum harmonik; rasio lain memberi spektrum inharmonik.'],
        ['Spektrum harmonik', 'Kumpulan parsial yang semuanya kelipatan bulat dari satu frekuensi dasar, terdengar sebagai satu nada yang jelas.'],
        ['Timbre (warna suara)', 'Sifat yang membedakan dua bunyi dengan tinggi nada dan kekerasan sama, ditentukan oleh spektrum dan perubahannya terhadap waktu.'],
        ['Fungsi Bessel', 'Fungsi matematika J_k(I) yang memberi amplitudo pasangan pita sisi ke-k untuk indeks I tertentu.'],
      ],
    },
    misconceptions: {
      en: [
        ['FM just plays the two oscillators together.', 'Playing them together is mixing, and you would hear only fc and fm. FM multiplies their effects inside the sine, which creates new frequencies at fc ± k·fm that neither oscillator produced.'],
        ['Turning up the modulation index makes the sound louder.', 'The total output stays around the same level. A higher I moves energy from the carrier frequency into the sidebands, so the sound becomes brighter and more complex, not louder.'],
        ['A higher ratio means a higher pitch.', 'For whole-number ratios the pitch stays at fc; the ratio only changes the spacing of the sidebands, which changes the timbre. Ratios below 1, such as 0.5, can even lower the perceived pitch by adding a component below fc.'],
        ['FM radio and FM synthesis have nothing to do with each other.', 'They are the same mathematics. In FM radio the modulator is the audio signal and the carrier is around 100 MHz; in FM synthesis both are in the audio range, so the sidebands themselves become the sound.'],
      ],
      id: [
        ['FM hanya membunyikan kedua osilator bersama-sama.', 'Membunyikan bersama adalah mixing, dan yang terdengar hanya fc dan fm. FM menggabungkan keduanya di dalam fungsi sinus, sehingga tercipta frekuensi baru pada fc ± k·fm yang tidak dihasilkan osilator mana pun.'],
        ['Menaikkan indeks modulasi membuat suara lebih keras.', 'Level keluaran totalnya kira-kira tetap. I yang lebih tinggi memindahkan energi dari frekuensi pembawa ke pita sisi, sehingga suara menjadi lebih terang dan rumit, bukan lebih keras.'],
        ['Rasio lebih besar berarti nada lebih tinggi.', 'Untuk rasio bilangan bulat tinggi nada tetap di fc; rasio hanya mengubah jarak antar pita sisi, yang mengubah timbre. Rasio di bawah 1, misalnya 0,5, justru bisa menurunkan nada yang terdengar karena menambah komponen di bawah fc.'],
        ['Radio FM dan sintesis FM tidak berhubungan.', 'Matematikanya sama. Pada radio FM modulatornya adalah sinyal audio dan pembawanya sekitar 100 MHz; pada sintesis FM keduanya berada di rentang audio, sehingga pita sisinya sendiri yang menjadi bunyi.'],
      ],
    },
    realWorld: {
      en: [
        'The Yamaha DX7 (1983) used six FM operators and defined the sound of 1980s pop: its electric piano, bass and bell patches appear on countless records.',
        'The Sega Mega Drive / Genesis game console generated its music with a Yamaha FM sound chip, so much 16-bit game music is FM synthesis.',
        'A singer\'s or violinist\'s vibrato is FM with a slow modulator (about 5 to 7 Hz) and a small deviation, which is why it is heard as a wobble, not a timbre.',
        'FM radio broadcasts use the same principle with a carrier near 100 MHz; the audio signal is the modulator and the receiver recovers it from the frequency swing.',
      ],
      id: [
        'Yamaha DX7 (1983) memakai enam operator FM dan membentuk suara pop tahun 1980-an: patch piano elektrik, bass, dan belnya muncul di banyak sekali rekaman.',
        'Konsol gim Sega Mega Drive / Genesis membuat musiknya dengan chip suara FM Yamaha, sehingga banyak musik gim 16-bit adalah sintesis FM.',
        'Vibrato penyanyi atau pemain biola adalah FM dengan modulator lambat (sekitar 5 sampai 7 Hz) dan simpangan kecil, sehingga terdengar sebagai getaran nada, bukan timbre.',
        'Siaran radio FM memakai prinsip yang sama dengan pembawa sekitar 100 MHz; sinyal audio menjadi modulatornya dan penerima mengambilnya kembali dari ayunan frekuensi.',
      ],
    },
    questions: {
      en: [
        { q: 'With fc = 220 Hz, ratio 1 and I = 2, where do the first sidebands fall, and why does the tone still sound like a clear 220 Hz note?', a: 'fm = 220 Hz, so sidebands sit at 220 ± 220 Hz, 220 ± 440 Hz, 220 ± 660 Hz: that is 440, 660, 880 Hz above, while the ones below fold back to 220 Hz and 440 Hz. Every component is a multiple of 220 Hz, so the spectrum is a harmonic series and the pitch stays at 220 Hz; with I = 2 about three sideband pairs are audible.' },
        { q: 'Why does the Bass preset (ratio 0.5, I = 3) sound an octave lower than the carrier?', a: 'fm = 110 Hz, so the sidebands land at 220 ± 110 = 110 and 330 Hz, 220 ± 220 = 0 and 440 Hz, and so on. The lowest component is now 110 Hz and every component is a multiple of 110 Hz, so the ear hears a fundamental of 110 Hz, one octave below 220 Hz.' },
        { q: 'The Vibrato preset uses ratio 1 and I = 0.3 at fc = 220 Hz. How large is the frequency swing, and why does it not sound like a singer\'s vibrato?', a: 'Δf = I·fm = 0.3 × 220 = 66 Hz, so the carrier swings between about 154 and 286 Hz, but it does so 220 times a second. A wobble is only heard when the modulator is below roughly 20 Hz (singers use 5 to 7 Hz). At 220 Hz the ear hears the sidebands as timbre instead: a steady 220 Hz tone with a faint second harmonic.' },
      ],
      id: [
        { q: 'Dengan fc = 220 Hz, rasio 1 dan I = 2, di mana letak pita sisi pertama, dan mengapa nadanya tetap terdengar sebagai 220 Hz yang jelas?', a: 'fm = 220 Hz, sehingga pita sisi berada di 220 ± 220 Hz, 220 ± 440 Hz, 220 ± 660 Hz: yaitu 440, 660, 880 Hz di atas, sementara yang di bawah terlipat kembali ke 220 Hz dan 440 Hz. Semua komponen adalah kelipatan 220 Hz, jadi spektrumnya deret harmonik dan tinggi nadanya tetap 220 Hz; dengan I = 2 sekitar tiga pasang pita sisi terdengar.' },
        { q: 'Mengapa preset Bass (rasio 0,5, I = 3) terdengar satu oktaf lebih rendah daripada pembawanya?', a: 'fm = 110 Hz, sehingga pita sisi jatuh di 220 ± 110 = 110 dan 330 Hz, 220 ± 220 = 0 dan 440 Hz, dan seterusnya. Komponen terendah kini 110 Hz dan semua komponen adalah kelipatan 110 Hz, sehingga telinga mendengar nada dasar 110 Hz, satu oktaf di bawah 220 Hz.' },
        { q: 'Preset Vibrato memakai rasio 1 dan I = 0,3 pada fc = 220 Hz. Seberapa besar ayunan frekuensinya, dan mengapa tidak terdengar seperti vibrato penyanyi?', a: 'Δf = I·fm = 0,3 × 220 = 66 Hz, jadi pembawa berayun antara sekitar 154 dan 286 Hz, tetapi 220 kali per detik. Getaran nada hanya terdengar jika modulator di bawah kira-kira 20 Hz (penyanyi memakai 5 sampai 7 Hz). Pada 220 Hz telinga justru mendengar pita sisinya sebagai timbre: nada 220 Hz yang stabil dengan harmonik kedua yang tipis.' },
      ],
    },
  },
};
