// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See the formula mel = 2595 · log₁₀(1 + f/700).',
      'Hear the same perceptual interval at low and high frequencies.',
      'Understand why the mel-frequency cepstral coefficients (MFCCs) underpin speech recognition.',
    ],
    id: [
      'Melihat rumus mel = 2595 · log₁₀(1 + f/700).',
      'Dengar interval persepsi yang sama di frekuensi rendah dan tinggi.',
      'Memahami mengapa MFCC menjadi landasan pengenalan ucapan.',
    ],
  },  tryThis: {
    en: [
      'Slide from 100 → 200 Hz (one octave). Big perceived jump.',
      'Slide from 5000 → 10000 Hz (one octave). Smaller perceived jump.',
      'Use the mel slider in equal steps — every step sounds equally far apart.',
    ],
    id: [
      'Geser dari 100 → 200 Hz (satu oktaf). Lompatan persepsi besar.',
      'Geser dari 5000 → 10000 Hz (satu oktaf). Lompatan persepsi lebih kecil.',
      'Gunakan slider mel dengan langkah sama — tiap langkah terasa sama jauh.',
    ],
  },

  // "Learn" section: the psychoacoustics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Frequency is a physical quantity: how many times per second a sound wave repeats, in hertz (Hz). Pitch is what we hear, and the two are not proportional. In the 1930s, Stevens, Volkmann and Newman asked listeners to adjust tones until the steps between them sounded equally large, and built a scale of perceived pitch from the results. They called its unit the mel (from "melody") and anchored it so that a 1000 Hz tone is 1000 mel. The simulation uses a common formula fitted to such data: mel = 2595 · log10(1 + f/700), where f is the frequency in Hz.',
        'The shape of this curve is the whole story. Below about 1000 Hz the term f/700 is small, so the curve is nearly a straight line: equal steps in Hz sound like roughly equal steps in pitch. Above about 1000 Hz the logarithm takes over and the curve flattens: a step of 1000 Hz from 5000 to 6000 Hz is worth only about 180 mel, while the first 1000 Hz from 0 to 1000 Hz is worth 1000 mel. In this high range it is ratios, not differences, that sound equal; each doubling of frequency adds roughly 700 to 780 mel, close to the limit 2595 · log10(2) ≈ 781.',
        'In the sim the green curve plots mel against frequency. Drag the red marker or move the Hz slider and the readout shows the frequency and its mel value; press Beep to hear a pure sine tone at that frequency. The mel slider moves in equal perceptual steps, so stepping it by 200 mel near 300 Hz changes the frequency by only about 190 Hz, while the same 200 mel near 8000 Hz changes it by about 1700 Hz. The +1 oct and −1 oct buttons double or halve the frequency so you can hear how much pitch an octave covers at different places on the curve.',
        'The mel scale measures pitch height, the sense of a sound being high or low, not musical intervals. Musicians hear every octave as the same interval, yet on the mel scale an octave from 100 to 200 Hz is only about 130 mel while an octave from 5000 to 10000 Hz is about 710 mel; the two descriptions answer different questions. Also, the formula is an average fit to many listeners, perception depends on loudness and on the person, and real sounds are rarely pure sine tones. The sim covers 20 Hz to 20 kHz, the nominal range of human hearing, though the upper limit falls with age and the mel slider can be pushed slightly beyond audible frequencies.',
      ],
      id: [
        'Frekuensi adalah besaran fisika: berapa kali per detik gelombang bunyi berulang, dalam hertz (Hz). Tinggi nada (pitch) adalah apa yang kita dengar, dan keduanya tidak sebanding. Pada tahun 1930-an, Stevens, Volkmann, dan Newman meminta pendengar mengatur nada-nada sampai langkah di antaranya terdengar sama besar, lalu menyusun skala tinggi nada yang dirasakan dari hasilnya. Satuannya disebut mel (dari "melodi") dan ditetapkan sehingga nada 1000 Hz bernilai 1000 mel. Simulasi memakai rumus umum yang dicocokkan dengan data semacam itu: mel = 2595 · log10(1 + f/700), dengan f frekuensi dalam Hz.',
        'Bentuk kurva inilah intinya. Di bawah sekitar 1000 Hz suku f/700 kecil, sehingga kurva hampir berupa garis lurus: langkah Hz yang sama terdengar sebagai langkah nada yang hampir sama. Di atas sekitar 1000 Hz logaritma mulai berperan dan kurva melandai: langkah 1000 Hz dari 5000 ke 6000 Hz hanya bernilai sekitar 180 mel, sedangkan 1000 Hz pertama dari 0 ke 1000 Hz bernilai 1000 mel. Pada rentang tinggi ini yang terdengar sama adalah perbandingan, bukan selisih; setiap penggandaan frekuensi menambah kira-kira 700 sampai 780 mel, mendekati batas 2595 · log10(2) ≈ 781.',
        'Dalam sim, kurva hijau menggambarkan mel terhadap frekuensi. Seret penanda merah atau geser slider Hz, dan tampilan menunjukkan frekuensi beserta nilai mel-nya; tekan Beep untuk mendengar nada sinus murni pada frekuensi itu. Slider mel bergerak dalam langkah persepsi yang sama, sehingga menggesernya 200 mel di sekitar 300 Hz hanya mengubah frekuensi sekitar 190 Hz, sedangkan 200 mel yang sama di sekitar 8000 Hz mengubahnya sekitar 1700 Hz. Tombol +1 oct dan −1 oct menggandakan atau membagi dua frekuensi, jadi kamu bisa mendengar seberapa besar perubahan nada yang dicakup satu oktaf di berbagai bagian kurva.',
        'Skala mel mengukur ketinggian nada, yaitu kesan bunyi tinggi atau rendah, bukan interval musik. Musisi mendengar setiap oktaf sebagai interval yang sama, tetapi pada skala mel oktaf dari 100 ke 200 Hz hanya sekitar 130 mel sedangkan oktaf dari 5000 ke 10000 Hz sekitar 710 mel; kedua gambaran itu menjawab pertanyaan yang berbeda. Selain itu, rumusnya adalah kecocokan rata-rata dari banyak pendengar, persepsi bergantung pada kekerasan bunyi dan pada orangnya, dan bunyi nyata jarang berupa sinus murni. Sim mencakup 20 Hz sampai 20 kHz, rentang nominal pendengaran manusia, meskipun batas atasnya menurun seiring usia dan slider mel bisa didorong sedikit melampaui frekuensi yang terdengar.',
      ],
    },
    figure: {
      caption: {
        en: 'Perceived pitch in mel against frequency in Hz. The same 1000 Hz step is worth 1000 mel near the bottom of the range but only about 180 mel between 5 and 6 kHz: the curve is nearly linear below 1 kHz and logarithmic above.',
        id: 'Tinggi nada yang dirasakan (mel) terhadap frekuensi (Hz). Langkah 1000 Hz yang sama bernilai 1000 mel di bagian bawah rentang tetapi hanya sekitar 180 mel antara 5 dan 6 kHz: kurva hampir linear di bawah 1 kHz dan logaritmik di atasnya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Mel scale curve against frequency', 'Kurva skala mel terhadap frekuensi')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;opacity:.7;fill:none}.g{stroke:currentColor;stroke-width:.6;opacity:.15}.d{stroke:currentColor;stroke-width:1;stroke-dasharray:3 3;opacity:.55}.t{font-size:10px;opacity:.8}</style>
  <line x1="50" y1="146.9" x2="330" y2="146.9" class="g"/><line x1="50" y1="93.8" x2="330" y2="93.8" class="g"/><line x1="50" y1="40.6" x2="330" y2="40.6" class="g"/>
  <line x1="50" y1="200" x2="340" y2="200" class="ax" marker-end="url(#a)"/>
  <line x1="50" y1="200" x2="50" y2="18" class="ax" marker-end="url(#a)"/>
  <text x="44" y="204" class="t" text-anchor="end">0</text>
  <text x="44" y="150" class="t" text-anchor="end">1000</text>
  <text x="44" y="97" class="t" text-anchor="end">2000</text>
  <text x="44" y="44" class="t" text-anchor="end">3000</text>
  <text x="8" y="14" class="t">mel</text>
  <text x="78" y="214" class="t" text-anchor="middle">1k</text><text x="190" y="214" class="t" text-anchor="middle">5k</text><text x="330" y="214" class="t" text-anchor="middle">10k</text>
  <text x="300" y="230" class="t">${L('frequency (Hz)', 'frekuensi (Hz)')}</text>
  <path d="M50 200 L57 181.7 L64 167.7 L78 146.9 L106 119.2 L134 100.3 L162 86 L190 74.4 L218 64.8 L246 56.4 L274 49.1 L302 42.6 L330 36.7" fill="none" stroke="#10b981" stroke-width="2.5"/>
  <line x1="78" y1="200" x2="78" y2="146.9" class="d"/>
  <line x1="50" y1="146.9" x2="78" y2="146.9" class="d"/>
  <circle cx="78" cy="146.9" r="4" fill="#ef4444"/>
  <text x="84" y="150" class="t">1000 Hz = 1000 mel</text>
  <path d="M190 200 L190 74.4" class="d"/><path d="M218 200 L218 64.8" class="d"/>
  <line x1="190" y1="74.4" x2="236" y2="74.4" stroke="#f59e0b" stroke-width="1.2"/>
  <line x1="218" y1="64.8" x2="236" y2="64.8" stroke="#f59e0b" stroke-width="1.2"/>
  <line x1="236" y1="74.4" x2="236" y2="64.8" stroke="#f59e0b" stroke-width="2"/>
  <text x="241" y="73" class="t" fill="#f59e0b">+1000 Hz ≈ +180 mel</text>
  <line x1="94" y1="200" x2="94" y2="146.9" stroke="#3b82f6" stroke-width="2"/>
  <text x="98" y="190" class="t" fill="#3b82f6">+1000 Hz</text>
  <text x="98" y="178" class="t" fill="#3b82f6">= +1000 mel</text>
  <text x="56" y="30" class="t">mel = 2595 · log10(1 + f/700)</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Frequency (Hz) is physical; pitch is perceptual, and the mel scale maps one onto the other using listening experiments.',
        'The reference point is 1000 Hz = 1000 mel; the sim uses mel = 2595 · log10(1 + f/700).',
        'Below about 1000 Hz the scale is nearly linear in Hz; above it the scale is roughly logarithmic, so equal frequency ratios sound like equal steps.',
        'Equal steps on the mel slider sound equally far apart, but cover ever more hertz as the frequency rises.',
        'Speech recognition and audio machine learning analyse sound with filters spaced evenly in mel, so the analysis matches human hearing.',
      ],
      id: [
        'Frekuensi (Hz) bersifat fisik; tinggi nada bersifat persepsi, dan skala mel memetakan yang satu ke yang lain berdasarkan percobaan mendengar.',
        'Titik acuannya adalah 1000 Hz = 1000 mel; sim memakai mel = 2595 · log10(1 + f/700).',
        'Di bawah sekitar 1000 Hz skala ini hampir linear terhadap Hz; di atasnya kira-kira logaritmik, sehingga perbandingan frekuensi yang sama terdengar sebagai langkah yang sama.',
        'Langkah yang sama pada slider mel terdengar sama jauhnya, tetapi mencakup semakin banyak hertz seiring naiknya frekuensi.',
        'Pengenalan ucapan dan pembelajaran mesin audio menganalisis bunyi dengan filter yang berjarak sama dalam mel, sehingga analisisnya sesuai dengan pendengaran manusia.',
      ],
    },
    vocabulary: {
      en: [
        ['Frequency', 'The number of wave cycles per second, measured in hertz (Hz); a physical property of the sound.'],
        ['Pitch', 'The perceived highness or lowness of a sound; it depends mainly on frequency but is not proportional to it.'],
        ['Mel', 'A unit of perceived pitch, defined so that 1000 Hz corresponds to 1000 mel and equal mel steps sound equally large.'],
        ['Octave', 'A doubling of frequency; musically the same interval everywhere, but a varying number of mels.'],
        ['Logarithmic scale', 'A scale on which equal ratios, not equal differences, appear as equal steps.'],
        ['Psychoacoustics', 'The science of how physical sound is perceived by the ear and brain.'],
        ['Mel filterbank', 'A set of overlapping band filters spaced evenly in mel, used to analyse speech and music.'],
        ['MFCC', 'Mel-frequency cepstral coefficients: compact numbers describing the shape of a sound spectrum on the mel scale.'],
      ],
      id: [
        ['Frekuensi', 'Banyaknya siklus gelombang per detik, diukur dalam hertz (Hz); sifat fisik bunyi.'],
        ['Tinggi nada (pitch)', 'Kesan tinggi atau rendahnya bunyi; terutama bergantung pada frekuensi tetapi tidak sebanding dengannya.'],
        ['Mel', 'Satuan tinggi nada yang dirasakan, ditetapkan sehingga 1000 Hz setara 1000 mel dan langkah mel yang sama terdengar sama besar.'],
        ['Oktaf', 'Penggandaan frekuensi; secara musik interval yang sama di mana pun, tetapi jumlah mel-nya berbeda-beda.'],
        ['Skala logaritmik', 'Skala yang menampilkan perbandingan yang sama, bukan selisih yang sama, sebagai langkah yang sama.'],
        ['Psikoakustik', 'Ilmu tentang bagaimana bunyi fisik dipersepsikan oleh telinga dan otak.'],
        ['Bank filter mel', 'Sekumpulan filter pita yang saling tumpang tindih dan berjarak sama dalam mel, dipakai untuk menganalisis ucapan dan musik.'],
        ['MFCC', 'Koefisien cepstral frekuensi mel: bilangan ringkas yang menggambarkan bentuk spektrum bunyi pada skala mel.'],
      ],
    },
    misconceptions: {
      en: [
        ['Doubling the frequency doubles the pitch.', 'Doubling frequency gives an octave, which sounds like the same musical interval everywhere, but on the mel scale it adds a fixed amount only at high frequencies; 1000 to 2000 Hz adds about 520 mel, not another 1000.'],
        ['The ear is logarithmic at all frequencies.', 'Only roughly, and only above about 1000 Hz. Below that, the mel data are closer to linear in Hz, which is why the curve starts almost straight.'],
        ['A 1000 Hz difference is a 1000 Hz difference; it always sounds the same.', 'It does not. From 200 to 1200 Hz the change is enormous; from 9000 to 10000 Hz it is barely a nudge. Try both with the Beep button.'],
        ['The mel formula is a law of physics.', 'It is an empirical fit to listening tests. Other fits exist, individual listeners differ, and loudness and timbre also affect perceived pitch.'],
      ],
      id: [
        ['Menggandakan frekuensi menggandakan tinggi nada.', 'Menggandakan frekuensi menghasilkan satu oktaf, yang terdengar sebagai interval musik yang sama di mana pun, tetapi pada skala mel ia menambah jumlah tetap hanya di frekuensi tinggi; 1000 ke 2000 Hz menambah sekitar 520 mel, bukan 1000 lagi.'],
        ['Telinga bersifat logaritmik di semua frekuensi.', 'Hanya secara kasar, dan hanya di atas sekitar 1000 Hz. Di bawah itu, data mel lebih mendekati linear terhadap Hz, sehingga kurva dimulai hampir lurus.'],
        ['Selisih 1000 Hz tetap 1000 Hz; selalu terdengar sama.', 'Tidak. Dari 200 ke 1200 Hz perubahannya sangat besar; dari 9000 ke 10000 Hz hampir tidak terasa. Coba keduanya dengan tombol Beep.'],
        ['Rumus mel adalah hukum fisika.', 'Rumus ini adalah kecocokan empiris dengan uji pendengaran. Ada kecocokan lain, tiap pendengar berbeda, dan kekerasan serta warna bunyi juga memengaruhi tinggi nada yang dirasakan.'],
      ],
    },
    realWorld: {
      en: [
        'Speech-recognition systems convert audio to mel spectrograms or MFCCs before anything else, so that the features reflect what listeners actually hear.',
        'Text-to-speech and music-generation models are usually trained to produce mel spectrograms, which a second model turns back into a waveform.',
        'Audio codecs such as MP3 allocate bits according to perceptual models of hearing, spending less on fine detail at high frequencies where the ear cannot resolve it.',
        'Spectrum analysers and equalizers use logarithmic frequency axes so that each octave takes the same width, matching the way we hear the upper range.',
      ],
      id: [
        'Sistem pengenalan ucapan mengubah audio menjadi spektrogram mel atau MFCC sebelum apa pun, sehingga fiturnya mencerminkan apa yang benar-benar didengar.',
        'Model text-to-speech dan pembuat musik biasanya dilatih menghasilkan spektrogram mel, yang kemudian diubah kembali menjadi gelombang oleh model kedua.',
        'Kodek audio seperti MP3 membagi bit menurut model persepsi pendengaran, dengan lebih sedikit bit untuk detail halus di frekuensi tinggi yang tidak bisa dibedakan telinga.',
        'Penganalisis spektrum dan equalizer memakai sumbu frekuensi logaritmik sehingga setiap oktaf berlebar sama, sesuai cara kita mendengar rentang atas.',
      ],
    },
    questions: {
      en: [
        { q: 'Compute the mel value of 700 Hz and of 7000 Hz using the sim\'s formula.', a: 'For 700 Hz: 1 + 700/700 = 2, so mel = 2595 · log10(2) ≈ 781. For 7000 Hz: 1 + 10 = 11, so mel = 2595 · log10(11) ≈ 2702. Ten times the frequency gives less than four times the mel value.' },
        { q: 'Set 100 Hz and press +1 oct, noting the change in mel. Then set 5000 Hz and press +1 oct. Which octave covers more mels, and what does that tell you about the scale?', a: '100 to 200 Hz changes mel from about 150 to 283, roughly 130 mel. 5000 to 10000 Hz changes it from about 2363 to 3073, roughly 710 mel. The high octave covers far more mels, because at low frequencies the scale is nearly linear in Hz, so an octave there is only a 100 Hz step.' },
        { q: 'Why do speech-recognition systems space their analysis filters evenly in mel rather than evenly in Hz?', a: 'Even spacing in Hz would waste most filters on high frequencies where the ear barely distinguishes neighbouring frequencies, and give too few to the low range where vowel information lives. Mel spacing gives narrow filters at low frequencies and wide ones at high frequencies, matching hearing.' },
      ],
      id: [
        { q: 'Hitung nilai mel untuk 700 Hz dan 7000 Hz dengan rumus sim.', a: 'Untuk 700 Hz: 1 + 700/700 = 2, jadi mel = 2595 · log10(2) ≈ 781. Untuk 7000 Hz: 1 + 10 = 11, jadi mel = 2595 · log10(11) ≈ 2702. Frekuensi sepuluh kali lipat menghasilkan nilai mel kurang dari empat kali lipat.' },
        { q: 'Atur 100 Hz dan tekan +1 oct, catat perubahan mel-nya. Lalu atur 5000 Hz dan tekan +1 oct. Oktaf mana yang mencakup lebih banyak mel, dan apa artinya bagi skala ini?', a: '100 ke 200 Hz mengubah mel dari sekitar 150 ke 283, kira-kira 130 mel. 5000 ke 10000 Hz mengubahnya dari sekitar 2363 ke 3073, kira-kira 710 mel. Oktaf tinggi mencakup jauh lebih banyak mel, karena di frekuensi rendah skala ini hampir linear terhadap Hz, sehingga satu oktaf di sana hanyalah langkah 100 Hz.' },
        { q: 'Mengapa sistem pengenalan ucapan menjarakkan filter analisisnya sama dalam mel, bukan sama dalam Hz?', a: 'Jarak yang sama dalam Hz akan memboroskan sebagian besar filter pada frekuensi tinggi yang hampir tidak bisa dibedakan telinga, dan menyisakan terlalu sedikit untuk rentang rendah tempat informasi vokal berada. Jarak mel memberi filter sempit di frekuensi rendah dan lebar di frekuensi tinggi, sesuai pendengaran.' },
      ],
    },
  },
};
