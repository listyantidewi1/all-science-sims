// Long-form text for the Analog to Digital sim (Fase F, grades 11–12).
export default {
  objectives: {
    en: [
      'Describe analog-to-digital conversion as two steps, sampling in time at rate fs and quantising in amplitude to 2ⁿ levels, and read a sample\'s binary code.',
      'Apply the Nyquist criterion fs > 2f_max and predict the alias frequency |f − fs·round(f/fs)| when it is violated.',
      'Calculate the quantisation step, the maximum quantisation error (half a step) and the bit rate fs × n in bit/s.',
    ],
    id: [
      'Menjelaskan konversi analog ke digital sebagai dua langkah, pencuplikan dalam waktu dengan laju fs dan kuantisasi amplitudo ke 2ⁿ tingkat, serta membaca kode biner sebuah cuplikan.',
      'Menerapkan kriteria Nyquist fs > 2f_maks dan memprediksi frekuensi alias |f − fs·round(f/fs)| ketika kriteria itu dilanggar.',
      'Menghitung langkah kuantisasi, galat kuantisasi maksimum (setengah langkah), dan laju bit fs × n dalam bit/s.',
    ],
  },
  tryThis: {
    en: [
      'Sine, f = 1000 Hz, fs = 8000 Hz, 3 bits. Count the levels on the staircase (8) and read the binary codes of the first samples. Raise the bits to 8: the staircase hugs the curve and the max error drops to 3.9 mV.',
      'Keep f = 1000 Hz and slide fs down past 2000 Hz. Below the Nyquist rate a dashed "alias" sine appears that passes through every sample. At fs = 1100 Hz it is a 100 Hz wave.',
      'Set fs = 44 100 Hz and 16 bits is CD quality; our sliders stop at 8 bits and 32 kHz, so try fs = 8000 Hz and 8 bits, the classic telephone standard: bit rate 64 kbit/s.',
      'Switch to the voice-like signal (harmonics up to 3f). The Nyquist rate is now 6f, not 2f: find the fs at which the staircase stops following the fast wiggles.',
    ],
    id: [
      'Sinus, f = 1000 Hz, fs = 8000 Hz, 3 bit. Hitung tingkat pada tangga (8) dan baca kode biner cuplikan pertama. Naikkan ke 8 bit: tangga menempel pada kurva dan galat maksimum turun ke 3,9 mV.',
      'Pertahankan f = 1000 Hz dan geser fs turun melewati 2000 Hz. Di bawah laju Nyquist muncul sinus "alias" putus-putus yang melewati setiap cuplikan. Pada fs = 1100 Hz ia menjadi gelombang 100 Hz.',
      'fs = 44 100 Hz dan 16 bit adalah kualitas CD; slider kita berhenti di 8 bit dan 32 kHz, jadi coba fs = 8000 Hz dan 8 bit, standar telepon klasik: laju bit 64 kbit/s.',
      'Ganti ke sinyal mirip suara (harmonik sampai 3f). Laju Nyquist kini 6f, bukan 2f: cari fs ketika tangga berhenti mengikuti goyangan cepatnya.',
    ],
  },

  learn: {
    background: {
      en: [
        'Sound, light, temperature and voltage from a microphone are analog: they vary smoothly and can take any value. Computers, phones and digital radios store and send only numbers, so an analog-to-digital converter (ADC) must turn the smooth signal into a list of integers. It does this in two steps. Sampling measures the signal at regular instants, fs times per second (the sample rate, in Hz or samples/s). Quantisation rounds each measurement to the nearest of 2ⁿ allowed levels, where n is the number of bits, and records the level as an n-bit binary number. A digital-to-analog converter later holds each number for one sample period, producing the staircase you see in the sim, which a low-pass filter then smooths.',
        'With n bits over a full-scale range of V_FS = 2 V (−1 V to +1 V in the sim) the step between levels is Δ = V_FS/(2ⁿ − 1): 0.667 V for 2 bits, 0.286 V for 3 bits, 7.8 mV for 8 bits and 30 μV for 16 bits. Rounding to the nearest level makes an error of at most Δ/2, so every extra bit halves the maximum quantisation error and improves the signal-to-noise ratio by about 6 dB. The data produced is fs × n bits every second: the telephone standard of 8000 samples/s at 8 bits is 64 kbit/s, and a CD\'s 44 100 samples/s at 16 bits in stereo is 1.41 Mbit/s.',
        'How often must you sample? The sampling theorem (Nyquist, Shannon) says a signal containing frequencies up to f_max is captured completely if fs > 2f_max; 2f_max is the Nyquist rate. If you sample too slowly, the samples are indistinguishable from those of a slower signal: a 1000 Hz sine sampled at 1100 Hz gives exactly the same points as a 100 Hz sine. The impostor frequency is f_alias = |f − fs·round(f/fs)|. This is aliasing, the same effect that makes wagon wheels appear to turn backwards in films shot at 24 frames per second. Real ADCs put an anti-aliasing low-pass filter before the sampler to remove anything above fs/2.',
        'Most real signals are not pure sines. A voice or a musical note is a sum of harmonics at f, 2f, 3f and so on, and a triangle wave contains odd harmonics at f, 3f, 5f with amplitudes falling as 1/k². Their highest significant component sets f_max, so they need a higher sample rate than a sine of the same fundamental. Human hearing reaches about 20 kHz, which is why CDs sample at 44.1 kHz; telephones keep only up to 3.4 kHz and sample at 8 kHz, which is why voices sound thin but perfectly intelligible on the phone.',
      ],
      id: [
        'Suara, cahaya, suhu, dan tegangan dari mikrofon bersifat analog: berubah mulus dan dapat bernilai apa saja. Komputer, telepon, dan radio digital hanya menyimpan dan mengirim angka, sehingga pengubah analog ke digital (ADC) harus mengubah sinyal mulus menjadi daftar bilangan bulat. Ini dilakukan dalam dua langkah. Pencuplikan mengukur sinyal pada saat-saat teratur, fs kali per sekon (laju cuplik, dalam Hz atau cuplikan/s). Kuantisasi membulatkan tiap pengukuran ke tingkat terdekat dari 2ⁿ tingkat yang tersedia, dengan n jumlah bit, dan mencatatnya sebagai bilangan biner n-bit. Pengubah digital ke analog kemudian menahan tiap angka selama satu periode cuplik, menghasilkan tangga yang kamu lihat di simulasi, yang lalu dihaluskan tapis lolos-rendah.',
        'Dengan n bit pada rentang skala penuh V_FS = 2 V (−1 V sampai +1 V dalam simulasi), langkah antar tingkat adalah Δ = V_FS/(2ⁿ − 1): 0,667 V untuk 2 bit, 0,286 V untuk 3 bit, 7,8 mV untuk 8 bit, dan 30 μV untuk 16 bit. Pembulatan ke tingkat terdekat menghasilkan galat paling besar Δ/2, sehingga tiap bit tambahan membagi dua galat kuantisasi maksimum dan memperbaiki rasio sinyal terhadap derau sekitar 6 dB. Data yang dihasilkan adalah fs × n bit tiap sekon: standar telepon 8000 cuplikan/s pada 8 bit adalah 64 kbit/s, dan CD dengan 44 100 cuplikan/s pada 16 bit stereo adalah 1,41 Mbit/s.',
        'Seberapa sering harus mencuplik? Teorema pencuplikan (Nyquist, Shannon) menyatakan sinyal yang mengandung frekuensi sampai f_maks tertangkap lengkap jika fs > 2f_maks; 2f_maks disebut laju Nyquist. Jika mencuplik terlalu lambat, cuplikannya tidak dapat dibedakan dari cuplikan sinyal yang lebih lambat: sinus 1000 Hz yang dicuplik 1100 Hz memberi titik-titik yang persis sama dengan sinus 100 Hz. Frekuensi palsunya f_alias = |f − fs·round(f/fs)|. Inilah aliasing, efek yang sama yang membuat roda kereta tampak berputar mundur dalam film 24 bingkai per sekon. ADC nyata memasang tapis lolos-rendah anti-aliasing sebelum pencuplik untuk membuang apa pun di atas fs/2.',
        'Kebanyakan sinyal nyata bukan sinus murni. Suara atau nada musik adalah jumlah harmonik pada f, 2f, 3f dan seterusnya, dan gelombang segitiga mengandung harmonik ganjil pada f, 3f, 5f dengan amplitudo turun sebagai 1/k². Komponen tertinggi yang berarti menentukan f_maks, sehingga sinyal itu memerlukan laju cuplik lebih tinggi daripada sinus dengan frekuensi dasar yang sama. Pendengaran manusia mencapai sekitar 20 kHz, itulah sebabnya CD mencuplik 44,1 kHz; telepon hanya menyimpan sampai 3,4 kHz dan mencuplik 8 kHz, itulah sebabnya suara terdengar tipis tetapi tetap jelas di telepon.',
      ],
    },
    figure: {
      caption: {
        en: 'An analog sine (smooth) is sampled at regular instants (dots) and each sample is rounded to one of 2ⁿ levels (3 bits: 8 levels), giving the staircase and the binary codes below. The error is never more than half a step.',
        id: 'Sinus analog (mulus) dicuplik pada saat-saat teratur (titik) dan tiap cuplikan dibulatkan ke salah satu dari 2ⁿ tingkat (3 bit: 8 tingkat), menghasilkan tangga dan kode biner di bawahnya. Galatnya tidak pernah lebih dari setengah langkah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const x0 = 40, x1 = 340, yMid = 100, amp = 60, N = 12;
        const levels = 8, step = 2 / (levels - 1);
        const sig = (t) => Math.sin(2 * Math.PI * 1.5 * t);
        let curve = '';
        for (let i = 0; i <= 120; i++) { const t = i / 120; curve += `${(x0 + (x1 - x0) * t).toFixed(1)},${(yMid - amp * sig(t)).toFixed(1)} `; }
        let stairs = '', dots = '', codes = '';
        for (let k = 0; k < N; k++) {
          const t = k / N, xs = sig(t);
          const code = Math.max(0, Math.min(levels - 1, Math.round((xs + 1) / step)));
          const xq = code * step - 1;
          const px = x0 + (x1 - x0) * t, pxn = x0 + (x1 - x0) * (k + 1) / N;
          stairs += `${px.toFixed(1)},${(yMid - amp * xq).toFixed(1)} ${pxn.toFixed(1)},${(yMid - amp * xq).toFixed(1)} `;
          dots += `<circle cx="${px.toFixed(1)}" cy="${(yMid - amp * xs).toFixed(1)}" r="3" fill="#fbbf24"/>`;
          if (k < 6) codes += `<text x="${(px + 2).toFixed(1)}" y="214" font-size="10" font-family="monospace">${code.toString(2).padStart(3, '0')}</text>`;
        }
        let grid = '';
        for (let l = 0; l < levels; l++) { const y = yMid - amp * (l * step - 1); grid += `<line x1="${x0}" y1="${y.toFixed(1)}" x2="${x1}" y2="${y.toFixed(1)}" stroke="currentColor" opacity=".15"/>`; }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Sampling and 3-bit quantisation of a sine wave', 'Pencuplikan dan kuantisasi 3 bit gelombang sinus')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}</style>
  ${grid}
  <line x1="${x0}" y1="30" x2="${x0}" y2="170" stroke="currentColor" opacity=".6"/>
  <line x1="${x0}" y1="${yMid}" x2="${x1}" y2="${yMid}" stroke="currentColor" opacity=".6"/>
  <polyline points="${curve.trim()}" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <polyline points="${stairs.trim()}" fill="none" stroke="#f97316" stroke-width="2"/>
  ${dots}
  <text x="8" y="44">+1 V</text>
  <text x="8" y="164">−1 V</text>
  <text x="${x1 - 60}" y="26" style="fill:#38bdf8">${L('analog', 'analog')}</text>
  <text x="${x1 - 60}" y="40" style="fill:#f97316">${L('staircase', 'tangga')}</text>
  <text x="${x0}" y="190">${L('samples every 1/fs; 3 bits → 8 levels, Δ = 0.29 V', 'cuplikan tiap 1/fs; 3 bit → 8 tingkat, Δ = 0,29 V')}</text>
  ${codes}
  <text x="240" y="214" font-size="10">…</text>
  <text x="${x0}" y="232">${L('max error = Δ/2; bit rate = fs × n', 'galat maks = Δ/2; laju bit = fs × n')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'ADC = sampling (fs times per second) + quantisation (to 2ⁿ levels, stored as n-bit binary codes).',
        'Step size Δ = V_FS/(2ⁿ − 1); the maximum quantisation error is Δ/2, halved by every extra bit.',
        'Nyquist: fs must exceed 2f_max to capture the signal; otherwise aliasing produces a false frequency |f − fs·round(f/fs)|.',
        'For signals with harmonics, f_max is the highest harmonic present, not the fundamental.',
        'Bit rate = fs × n bit/s: telephone 8000 × 8 = 64 kbit/s, CD 44 100 × 16 × 2 = 1.41 Mbit/s.',
        'Reconstruction holds each sample for 1/fs (a staircase) and then low-pass filters it to recover a smooth signal.',
      ],
      id: [
        'ADC = pencuplikan (fs kali per sekon) + kuantisasi (ke 2ⁿ tingkat, disimpan sebagai kode biner n-bit).',
        'Ukuran langkah Δ = V_FS/(2ⁿ − 1); galat kuantisasi maksimum Δ/2, dibagi dua oleh tiap bit tambahan.',
        'Nyquist: fs harus melebihi 2f_maks untuk menangkap sinyal; jika tidak, aliasing menghasilkan frekuensi palsu |f − fs·round(f/fs)|.',
        'Untuk sinyal berharmonik, f_maks adalah harmonik tertinggi yang ada, bukan frekuensi dasar.',
        'Laju bit = fs × n bit/s: telepon 8000 × 8 = 64 kbit/s, CD 44 100 × 16 × 2 = 1,41 Mbit/s.',
        'Rekonstruksi menahan tiap cuplikan selama 1/fs (tangga) lalu menapisnya dengan tapis lolos-rendah untuk memulihkan sinyal mulus.',
      ],
    },
    vocabulary: {
      en: [
        ['Analog signal', 'A quantity that varies continuously in time and value, such as the voltage from a microphone.'],
        ['Sample rate (fs)', 'Number of measurements taken per second, in Hz or samples/s.'],
        ['Quantisation', 'Rounding each sample to the nearest of a finite set of levels, 2ⁿ for n bits.'],
        ['Bit depth (n)', 'Number of binary digits per sample; 8 bits gives 256 levels, 16 bits gives 65 536.'],
        ['Nyquist rate', 'Twice the highest frequency in the signal, 2f_max; the minimum sample rate that avoids aliasing.'],
        ['Aliasing', 'A high frequency sampled too slowly appearing as a lower, false frequency.'],
        ['Bit rate', 'Bits produced per second, fs × n (× number of channels).'],
      ],
      id: [
        ['Sinyal analog', 'Besaran yang berubah kontinu dalam waktu dan nilai, seperti tegangan dari mikrofon.'],
        ['Laju cuplik (fs)', 'Jumlah pengukuran per sekon, dalam Hz atau cuplikan/s.'],
        ['Kuantisasi', 'Pembulatan tiap cuplikan ke tingkat terdekat dari himpunan tingkat berhingga, 2ⁿ untuk n bit.'],
        ['Kedalaman bit (n)', 'Jumlah digit biner per cuplikan; 8 bit memberi 256 tingkat, 16 bit memberi 65 536.'],
        ['Laju Nyquist', 'Dua kali frekuensi tertinggi dalam sinyal, 2f_maks; laju cuplik minimum yang menghindari aliasing.'],
        ['Aliasing', 'Frekuensi tinggi yang dicuplik terlalu lambat sehingga tampak sebagai frekuensi rendah palsu.'],
        ['Laju bit', 'Bit yang dihasilkan per sekon, fs × n (× jumlah kanal).'],
      ],
    },
    misconceptions: {
      en: [
        ['Sampling at exactly twice the frequency is always enough.', 'The theorem needs fs strictly greater than 2f_max, and real systems use a margin (CD: 44.1 kHz for 20 kHz audio). At exactly 2f a sine can be sampled at its zero crossings and vanish.'],
        ['More bits make the sampling finer in time.', 'Bits set the amplitude resolution (how many levels); the sample rate sets the time resolution. They are independent choices.'],
        ['Digital sound is always worse than analog because of the steps.', 'With enough bits the steps are smaller than the noise of any analog system: 16 bits gives a step of 30 μV on a 2 V range, far below tape hiss.'],
      ],
      id: [
        ['Mencuplik tepat dua kali frekuensi selalu cukup.', 'Teorema menuntut fs lebih besar secara ketat dari 2f_maks, dan sistem nyata memakai cadangan (CD: 44,1 kHz untuk audio 20 kHz). Tepat pada 2f sinus bisa tercuplik di titik nolnya dan hilang.'],
        ['Lebih banyak bit membuat pencuplikan lebih rapat dalam waktu.', 'Bit menentukan resolusi amplitudo (jumlah tingkat); laju cuplik menentukan resolusi waktu. Keduanya pilihan yang saling bebas.'],
        ['Suara digital selalu lebih buruk daripada analog karena bertangga.', 'Dengan bit yang cukup, langkahnya lebih kecil daripada derau sistem analog mana pun: 16 bit memberi langkah 30 μV pada rentang 2 V, jauh di bawah desis pita kaset.'],
      ],
    },
    realWorld: {
      en: [
        'Telephone networks digitise speech at 8000 samples/s and 8 bits (64 kbit/s), keeping frequencies up to 3.4 kHz.',
        'Audio CDs use 44 100 samples/s and 16 bits per channel; studio recordings often use 96 kHz and 24 bits.',
        'A phone camera\'s sensor is an ADC for light: each pixel\'s brightness is quantised, usually to 10–14 bits, before JPEG compression.',
        'Aliasing shows up as moiré patterns when photographing fine fabric and as helicopter rotors that seem frozen in video.',
        'ECG machines sample the heart\'s voltage at about 500 samples/s with 12–16 bits to resolve the tiny P wave.',
      ],
      id: [
        'Jaringan telepon mendigitalkan suara pada 8000 cuplikan/s dan 8 bit (64 kbit/s), menyimpan frekuensi sampai 3,4 kHz.',
        'CD audio memakai 44 100 cuplikan/s dan 16 bit per kanal; rekaman studio sering memakai 96 kHz dan 24 bit.',
        'Sensor kamera ponsel adalah ADC untuk cahaya: kecerahan tiap piksel dikuantisasi, biasanya 10–14 bit, sebelum kompresi JPEG.',
        'Aliasing muncul sebagai pola moiré saat memotret kain halus dan sebagai baling-baling helikopter yang tampak beku dalam video.',
        'Mesin EKG mencuplik tegangan jantung sekitar 500 cuplikan/s dengan 12–16 bit untuk menangkap gelombang P yang kecil.',
      ],
    },
    questions: {
      en: [
        { q: 'A 4-bit ADC covers −1 V to +1 V. What is the step size, the maximum quantisation error, and the code for a sample of +0.40 V?', a: 'Δ = 2 V/(2⁴ − 1) = 2/15 = 0.133 V; max error Δ/2 = 0.067 V. Level = round((0.40 + 1)/0.133) = round(10.5) = 10 or 11 → 1010 or 1011 (0.40 V sits exactly between levels 0.333 V and 0.467 V).' },
        { q: 'A 3 kHz tone is sampled at 5 kHz. What frequency will be heard after reconstruction?', a: 'fs < 2f, so it aliases: f_alias = |3000 − 5000 × round(0.6)| = |3000 − 5000| = 2000 Hz. A 2 kHz tone is heard instead.' },
        { q: 'What is the bit rate of mono audio sampled at 22 050 Hz with 8 bits, and how many bytes does one minute take?', a: '22 050 × 8 = 176 400 bit/s ≈ 176 kbit/s. One minute: 176 400 × 60 / 8 = 1 323 000 bytes ≈ 1.3 MB.' },
      ],
      id: [
        { q: 'ADC 4 bit mencakup −1 V sampai +1 V. Berapa ukuran langkah, galat kuantisasi maksimum, dan kode untuk cuplikan +0,40 V?', a: 'Δ = 2 V/(2⁴ − 1) = 2/15 = 0,133 V; galat maks Δ/2 = 0,067 V. Tingkat = round((0,40 + 1)/0,133) = round(10,5) = 10 atau 11 → 1010 atau 1011 (0,40 V tepat di tengah antara tingkat 0,333 V dan 0,467 V).' },
        { q: 'Nada 3 kHz dicuplik pada 5 kHz. Frekuensi berapa yang terdengar setelah rekonstruksi?', a: 'fs < 2f, sehingga terjadi alias: f_alias = |3000 − 5000 × round(0,6)| = |3000 − 5000| = 2000 Hz. Yang terdengar nada 2 kHz.' },
        { q: 'Berapa laju bit audio mono yang dicuplik 22 050 Hz dengan 8 bit, dan berapa byte untuk satu menit?', a: '22 050 × 8 = 176 400 bit/s ≈ 176 kbit/s. Satu menit: 176 400 × 60 / 8 = 1 323 000 byte ≈ 1,3 MB.' },
      ],
    },
  },
};
