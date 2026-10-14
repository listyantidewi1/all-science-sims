// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See that beat frequency = |f₁ − f₂|.',
      'Connect the visible envelope to the audible "wow-wow" rhythm.',
      'Why piano tuners listen for "no beats" — they are nulling the difference.',
    ],
    id: [
      'Melihat bahwa frekuensi layangan = |f₁ − f₂|.',
      'Menghubungkan amplop visual dengan ritme "wow-wow" yang terdengar.',
      'Mengapa penyetel piano mendengarkan "tanpa layangan" — mereka menihilkan selisih.',
    ],
  },  tryThis: {
    en: [
      'Set f₁ = f₂ — beats vanish (perfect unison).',
      'Set f₂ = f₁ + 1 Hz — beat once per second.',
      'Set f₂ = f₁ + 10 Hz — beats become a buzz (above your detection rate).',
    ],
    id: [
      'Atur f₁ = f₂ — layangan hilang (unison sempurna).',
      'Atur f₂ = f₁ + 1 Hz — satu layangan per detik.',
      'Atur f₂ = f₁ + 10 Hz — layangan menjadi dengungan.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Play two pure tones whose frequencies are very close, say 220 Hz and 222 Hz, and you do not hear two notes. You hear one note, at the average pitch, whose loudness swells and fades in a slow, regular "wow-wow-wow". These pulses are called beats. They happen because the two waves drift in and out of step: when their peaks line up they add to a large amplitude, and half a beat later, when the peak of one meets the trough of the other, they cancel almost completely.',
        'The simulation draws the two sine waves y₁ = sin(2π f₁ t) and y₂ = sin(2π f₂ t) and, underneath, their sum (scaled by one half so it fits). A trigonometric identity explains the picture: sin a + sin b = 2 cos((a − b)/2) · sin((a + b)/2). The sum is a fast wave at the average frequency (f₁ + f₂)/2 whose amplitude is modulated by the slow factor cos(π (f₁ − f₂) t), drawn as the dashed envelope. Loudness depends on the size of the amplitude, not its sign, so you hear a maximum twice per cycle of that cosine. The beat frequency is therefore f_beat = |f₁ − f₂|, and one beat lasts 1/f_beat seconds, which the readout shows.',
        'The f₁ and f₂ sliders set the two frequencies; only their difference changes the beat rate, which is why moving both together leaves the envelope unchanged. The visual window slider sets how many seconds of waveform are drawn: with a 1 s window you can count the envelope bulges directly and check that there are |f₁ − f₂| of them. The Match button sets f₂ equal to f₁ so the beat disappears, exactly what a musician does when tuning to a reference. Play sends the same two sines to your speakers so you can time the wobble with a stopwatch.',
        'The model is deliberately simple: two sines of equal amplitude, no decay, no harmonics. Real instrument notes contain harmonics, so a slightly mistuned string also beats between its overtones. Perception also has limits that the drawing does not show. Up to roughly 10–15 Hz difference you hear distinct beats; beyond that the beats blur into a rough buzz, and above a few tens of hertz you begin to hear two separate pitches instead. The envelope is still mathematically there, but your ear no longer follows it.',
      ],
      id: [
        'Bunyikan dua nada murni dengan frekuensi yang sangat berdekatan, misalnya 220 Hz dan 222 Hz, dan kamu tidak akan mendengar dua nada. Kamu mendengar satu nada, pada tinggi nada rata-rata, yang kerasnya naik-turun secara teratur seperti "wow-wow-wow". Denyut ini disebut layangan. Layangan terjadi karena kedua gelombang bergantian sefase dan berlawanan fase: saat puncak-puncaknya bertemu, amplitudonya menjadi besar, dan setengah layangan kemudian, saat puncak yang satu bertemu lembah yang lain, keduanya hampir saling meniadakan.',
        'Simulasi ini menggambar dua gelombang sinus y₁ = sin(2π f₁ t) dan y₂ = sin(2π f₂ t) serta, di bawahnya, jumlah keduanya (dikali setengah agar muat). Sebuah identitas trigonometri menjelaskan gambarnya: sin a + sin b = 2 cos((a − b)/2) · sin((a + b)/2). Jumlahnya adalah gelombang cepat pada frekuensi rata-rata (f₁ + f₂)/2 yang amplitudonya diatur oleh faktor lambat cos(π (f₁ − f₂) t), digambar sebagai selubung putus-putus. Kekerasan bunyi bergantung pada besar amplitudo, bukan tandanya, sehingga kamu mendengar dua maksimum tiap siklus kosinus itu. Karena itu frekuensi layangan adalah f_layangan = |f₁ − f₂|, dan satu layangan berlangsung 1/f_layangan sekon, seperti yang ditampilkan di layar.',
        'Slider f₁ dan f₂ mengatur kedua frekuensi; hanya selisihnya yang mengubah laju layangan, sehingga menggeser keduanya bersama-sama tidak mengubah selubung. Slider jendela visual mengatur berapa sekon bentuk gelombang yang digambar: dengan jendela 1 s kamu bisa langsung menghitung tonjolan selubung dan memeriksa bahwa jumlahnya |f₁ − f₂|. Tombol Match membuat f₂ sama dengan f₁ sehingga layangan hilang, persis yang dilakukan musisi ketika menyetel ke nada acuan. Play mengirim kedua sinus yang sama ke pengeras suara, jadi kamu bisa mengukur goyangannya dengan stopwatch.',
        'Modelnya sengaja dibuat sederhana: dua sinus dengan amplitudo sama, tanpa peredaman, tanpa harmonik. Nada alat musik sungguhan mengandung harmonik, sehingga dawai yang sedikit melenceng juga melayang di antara nada-nada atasnya. Pendengaran kita juga punya batas yang tidak tampak di gambar. Sampai selisih sekitar 10–15 Hz kamu mendengar layangan yang jelas; di atas itu layangan melebur menjadi dengung kasar, dan di atas beberapa puluh hertz kamu mulai mendengar dua tinggi nada terpisah. Selubungnya secara matematis tetap ada, tetapi telinga tidak lagi mengikutinya.',
      ],
    },
    figure: {
      caption: {
        en: 'Two sines of slightly different frequency (top) add to a wave at the average frequency whose amplitude follows a slow envelope (dashed). The envelope has |f₁ − f₂| bulges per second: the beats.',
        id: 'Dua sinus dengan frekuensi sedikit berbeda (atas) berjumlah menjadi gelombang pada frekuensi rata-rata yang amplitudonya mengikuti selubung lambat (putus-putus). Selubung itu memiliki |f₁ − f₂| tonjolan per sekon: itulah layangan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // f1 = 10, f2 = 12 "cycles per window" so the sum shows two beats.
        const wave = (fn, cy, amp) => {
          let d = '';
          for (let i = 0; i <= 320; i++) {
            const t = i / 320;
            d += `${i === 0 ? 'M' : 'L'}${(20 + i).toFixed(0)} ${(cy - fn(t) * amp).toFixed(1)} `;
          }
          return d.trim();
        };
        const y1 = (t) => Math.sin(2 * Math.PI * 10 * t);
        const y2 = (t) => Math.sin(2 * Math.PI * 12 * t);
        const sum = (t) => (y1(t) + y2(t)) / 2;
        const env = (t) => Math.abs(Math.cos(Math.PI * 2 * t));
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Two waves and their beat envelope', 'Dua gelombang dan selubung layangannya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;opacity:.35}.w{fill:none;stroke-width:1.6}</style>
  <line x1="20" y1="40" x2="340" y2="40" class="ax"/>
  <path d="${wave(y1, 40, 18)}" class="w" stroke="#3b82f6"/>
  <text x="24" y="16" fill="#3b82f6">y₁ (f₁)</text>
  <line x1="20" y1="100" x2="340" y2="100" class="ax"/>
  <path d="${wave(y2, 100, 18)}" class="w" stroke="#8b5cf6"/>
  <text x="24" y="76" fill="#8b5cf6">y₂ (f₂ = ${L('1.2', '1,2')} f₁)</text>
  <line x1="20" y1="180" x2="340" y2="180" class="ax"/>
  <path d="${wave(sum, 180, 40)}" class="w" stroke="#10b981"/>
  <path d="${wave(env, 180, 40)}" class="w" stroke="#f59e0b" stroke-dasharray="4 3"/>
  <path d="${wave((t) => -env(t), 180, 40)}" class="w" stroke="#f59e0b" stroke-dasharray="4 3"/>
  <text x="24" y="134" fill="#10b981">y₁ + y₂</text>
  <text x="250" y="134" fill="#f59e0b">${L('envelope', 'selubung')}</text>
  <line x1="100" y1="228" x2="260" y2="228" stroke="currentColor" stroke-width="1"/>
  <line x1="100" y1="223" x2="100" y2="233" stroke="currentColor" stroke-width="1"/>
  <line x1="260" y1="223" x2="260" y2="233" stroke="currentColor" stroke-width="1"/>
  <text x="128" y="222">${L('one beat = 1 / |f₁ − f₂|', 'satu layangan = 1 / |f₁ − f₂|')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Two tones of nearly equal frequency add to one tone at the average frequency whose loudness pulses.',
        'The beat frequency equals the difference of the two frequencies: f_beat = |f₁ − f₂|.',
        'The envelope is cos(π (f₁ − f₂) t); because loudness ignores sign, you hear two swells per cosine cycle.',
        'Zero beats means perfect unison, which is how musicians tune by ear.',
        'Beyond about 15 Hz difference the beats turn into roughness, then into two separate pitches.',
      ],
      id: [
        'Dua nada dengan frekuensi hampir sama berjumlah menjadi satu nada pada frekuensi rata-rata yang kerasnya berdenyut.',
        'Frekuensi layangan sama dengan selisih kedua frekuensi: f_layangan = |f₁ − f₂|.',
        'Selubungnya adalah cos(π (f₁ − f₂) t); karena kekerasan bunyi tidak peduli tanda, kamu mendengar dua puncak tiap siklus kosinus.',
        'Nol layangan berarti unison sempurna, dan itulah cara musisi menyetel dengan telinga.',
        'Di atas selisih sekitar 15 Hz layangan berubah menjadi kekasaran, lalu menjadi dua tinggi nada terpisah.',
      ],
    },
    vocabulary: {
      en: [
        ['Beat', 'A periodic swelling and fading of loudness produced when two tones of nearly equal frequency are heard together.'],
        ['Beat frequency', 'The number of loudness maxima per second, equal to |f₁ − f₂|.'],
        ['Pure tone', 'A sound whose pressure varies as a single sine wave, with one frequency and no harmonics.'],
        ['Superposition', 'The principle that two waves passing through the same point add: the total displacement is the sum of the individual ones.'],
        ['Envelope', 'The slowly varying curve that traces the maximum amplitude of a fast oscillation.'],
        ['Unison', 'Two tones at exactly the same frequency; they produce no beats.'],
        ['Phase', 'Where a wave is in its cycle at a given moment; beats arise because the two waves slowly drift in phase relative to each other.'],
      ],
      id: [
        ['Layangan', 'Naik-turunnya kekerasan bunyi secara berkala ketika dua nada dengan frekuensi hampir sama didengar bersamaan.'],
        ['Frekuensi layangan', 'Banyaknya puncak kekerasan per sekon, sama dengan |f₁ − f₂|.'],
        ['Nada murni', 'Bunyi yang tekanannya berubah mengikuti satu gelombang sinus, dengan satu frekuensi dan tanpa harmonik.'],
        ['Superposisi', 'Prinsip bahwa dua gelombang yang melewati titik yang sama saling dijumlahkan: simpangan total adalah jumlah simpangan masing-masing.'],
        ['Selubung', 'Kurva yang berubah lambat dan menelusuri amplitudo maksimum dari osilasi cepat.'],
        ['Unison', 'Dua nada pada frekuensi yang tepat sama; keduanya tidak menghasilkan layangan.'],
        ['Fase', 'Posisi gelombang dalam siklusnya pada suatu saat; layangan muncul karena fase kedua gelombang perlahan bergeser satu terhadap yang lain.'],
      ],
    },
    misconceptions: {
      en: [
        ['The beat is a new sound wave with its own frequency travelling through the air.', 'No new wave is created. The air carries only the two original frequencies; the beat is the slow rise and fall of their combined amplitude, which your ear perceives as a change in loudness.'],
        ['The beat frequency is half the difference, because the envelope is cos(π (f₁ − f₂) t), which cycles at (f₁ − f₂)/2 Hz.', 'The cosine does cycle at half the difference, but it crosses zero twice per cycle, and loudness is largest at both the positive and negative extremes. So there are |f₁ − f₂| loudness maxima per second.'],
        ['Making one tone louder changes the beat frequency.', 'Amplitude does not change the beat rate, only how completely the two waves cancel. Unequal amplitudes give beats that never go fully silent, but still at |f₁ − f₂| per second.'],
      ],
      id: [
        ['Layangan adalah gelombang bunyi baru dengan frekuensinya sendiri yang merambat di udara.', 'Tidak ada gelombang baru yang tercipta. Udara hanya membawa dua frekuensi asli; layangan adalah naik-turun lambat amplitudo gabungannya, yang oleh telinga dirasakan sebagai perubahan kekerasan.'],
        ['Frekuensi layangan adalah setengah selisihnya, karena selubungnya cos(π (f₁ − f₂) t) yang bersiklus pada (f₁ − f₂)/2 Hz.', 'Kosinusnya memang bersiklus pada setengah selisih, tetapi ia melewati nol dua kali tiap siklus, dan bunyi paling keras terjadi di ekstrem positif maupun negatif. Jadi ada |f₁ − f₂| puncak kekerasan per sekon.'],
        ['Membuat salah satu nada lebih keras mengubah frekuensi layangan.', 'Amplitudo tidak mengubah laju layangan, hanya seberapa sempurna kedua gelombang saling meniadakan. Amplitudo yang tidak sama menghasilkan layangan yang tidak pernah benar-benar senyap, tetapi tetap |f₁ − f₂| kali per sekon.'],
      ],
    },
    realWorld: {
      en: [
        'Piano tuners and guitarists tune a string against a reference tone and adjust until the beats slow down and vanish.',
        'Pilots of twin-engine propeller aircraft hear a slow beat when the two engines run at slightly different speeds, and synchronise them to remove the throb.',
        'Beats between the strings of a twelve-string guitar or the detuned reeds of an accordion are added on purpose to give a shimmering "chorus" sound.',
        'Radio receivers and Doppler radar mix an incoming signal with a local oscillator to produce a low beat frequency that is easier to measure.',
      ],
      id: [
        'Penyetel piano dan pemain gitar menyetel dawai terhadap nada acuan dan memutar penyetel sampai layangannya melambat dan hilang.',
        'Pilot pesawat baling-baling bermesin ganda mendengar layangan lambat saat kedua mesin berputar dengan kecepatan sedikit berbeda, lalu menyamakannya untuk menghilangkan getaran itu.',
        'Layangan antara dawai gitar dua belas senar atau pelat akordeon yang sengaja disetel sedikit berbeda dipakai untuk memberi kesan "chorus" yang berkilau.',
        'Penerima radio dan radar Doppler mencampur sinyal masuk dengan osilator lokal untuk menghasilkan frekuensi layangan rendah yang lebih mudah diukur.',
      ],
    },
    questions: {
      en: [
        { q: 'You set f₁ = 440.0 Hz and f₂ = 443.0 Hz. How many beats per second do you hear, and how long does each beat last?', a: '3 beats per second, because f_beat = |440 − 443| = 3 Hz. Each beat lasts 1/3 ≈ 0.33 s. The pitch you hear is the average, 441.5 Hz.' },
        { q: 'A guitarist hears 2 beats per second between her string and a 440 Hz tuning fork. What could the string\'s frequency be, and how can she tell which?', a: 'Either 438 Hz or 442 Hz: the beat only reveals the size of the difference, not its sign. She can tighten the string slightly: if the beats slow down, the string was too low (438 Hz); if they speed up, it was too high.' },
        { q: 'With f₁ = 220 Hz and f₂ = 222 Hz and a 1.00 s window, how many envelope bulges should you count in the sum panel? What changes if you set both to 330 Hz and 332 Hz?', a: 'Two bulges, because the difference is 2 Hz. Nothing changes in the envelope at 330 and 332 Hz: the difference is still 2 Hz, so still two bulges. Only the fast wiggles inside the envelope get denser, since the average frequency is higher.' },
      ],
      id: [
        { q: 'Kamu mengatur f₁ = 440,0 Hz dan f₂ = 443,0 Hz. Berapa layangan per sekon yang terdengar, dan berapa lama tiap layangan?', a: '3 layangan per sekon, karena f_layangan = |440 − 443| = 3 Hz. Tiap layangan berlangsung 1/3 ≈ 0,33 s. Tinggi nada yang terdengar adalah rata-ratanya, 441,5 Hz.' },
        { q: 'Seorang gitaris mendengar 2 layangan per sekon antara dawainya dan garpu tala 440 Hz. Berapa kemungkinan frekuensi dawainya, dan bagaimana ia bisa tahu yang mana?', a: 'Bisa 438 Hz atau 442 Hz: layangan hanya menunjukkan besar selisihnya, bukan tandanya. Ia bisa mengencangkan dawai sedikit: jika layangan melambat, dawainya tadi terlalu rendah (438 Hz); jika makin cepat, tadi terlalu tinggi.' },
        { q: 'Dengan f₁ = 220 Hz, f₂ = 222 Hz, dan jendela 1,00 s, berapa tonjolan selubung yang seharusnya terhitung di panel jumlah? Apa yang berubah jika keduanya diatur ke 330 Hz dan 332 Hz?', a: 'Dua tonjolan, karena selisihnya 2 Hz. Pada 330 dan 332 Hz selubungnya tidak berubah: selisihnya tetap 2 Hz, jadi tetap dua tonjolan. Yang berubah hanya gelombang cepat di dalam selubung yang menjadi lebih rapat, karena frekuensi rata-ratanya lebih tinggi.' },
      ],
    },
  },
};
