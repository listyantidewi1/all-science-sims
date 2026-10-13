// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply A = ε · c · L (the Beer-Lambert law).',
      'Recognize that absorbance is logarithmic in transmission.',
      'Read the absorption spectrum of a sample at multiple wavelengths.',
    ],
    id: [
      'Menerapkan A = ε · c · L (hukum Beer-Lambert).',
      'Mengenali bahwa absorbansi bersifat logaritmik terhadap transmisi.',
      'Membaca spektrum absorpsi sampel pada berbagai panjang gelombang.',
    ],
  },
  tryThis: {
    en: [
      'Double concentration — does absorbance double?',
      'Tune wavelength to the sample\'s λ_max — does intensity drop fastest?',
      'Halve path length — same effect as halving concentration?',
    ],
    id: [
      'Gandakan konsentrasi — apakah absorbansi juga ikut menggandakan?',
      'Atur panjang gelombang ke λ_max sampel — apakah intensitas turun paling cepat?',
      'Setengahkan panjang lintasan — efeknya sama dengan menyetengahkan konsentrasi?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A coloured solution looks coloured because it absorbs some wavelengths of light and lets others through. Potassium permanganate absorbs green light around 525 nm, so the light that reaches your eye is missing green and looks purple. When a beam of intensity I₀ passes through the solution, every thin layer removes the same fraction of whatever light reaches it, so the intensity falls exponentially with distance, not linearly. The fraction that gets through is the transmittance T = I/I₀, and the quantity that behaves simply is the absorbance, A = −log₁₀ T = log₁₀(I₀/I).',
        'The Beer–Lambert law states that absorbance is proportional to how many absorbing molecules the beam meets: A = ε · c · L, where c is the molar concentration, L is the path length through the cuvette in centimetres, and ε (the molar absorptivity, in L mol⁻¹ cm⁻¹) measures how strongly one mole of that substance absorbs at that particular wavelength. ε depends on the substance and the wavelength, which is why each sample has its own absorption spectrum. The simulation models every sample\'s spectrum as a smooth peak centred on its λ_max, computes A = εcL, and then T = 10^−A to decide how much of the beam reaches the detector.',
        'The three sliders are the three factors in the law. Doubling the concentration or doubling the path length doubles A, which drops the transmitted light by the same factor again: A = 1 lets 10% through, A = 2 lets 1% through, A = 3 only 0.1%. The wavelength slider moves along the spectrum; at λ_max the molar absorptivity is largest, so a given concentration produces the largest absorbance and a small change in concentration gives the biggest change in reading. Off the peak, ε is small and the same solution looks almost transparent to the beam. Hover over the spectrum to read A and ε at any wavelength, and use the lab panel to record A against c and confirm the straight line.',
        'Several things are simplified. Real spectra are not perfect bell curves, and real ε values differ enormously between substances (the hydrated Cu²⁺ ion absorbs weakly, with ε around 10, while β-carotene exceeds 100 000), whereas the sim gives every sample the same peak height of 5000 so that the sliders behave comparably. Real instruments also deviate from the law at high absorbance (above roughly 1.5–2) because of stray light and because the beam is never perfectly single-wavelength, and the law assumes the molecules do not interact or react with each other as the concentration rises. Reflection and absorption by the cuvette walls are removed in practice by measuring a blank, which the sim takes for granted.',
      ],
      id: [
        'Larutan tampak berwarna karena menyerap sebagian panjang gelombang cahaya dan meneruskan sisanya. Kalium permanganat menyerap cahaya hijau di sekitar 525 nm, sehingga cahaya yang sampai ke mata kehilangan hijaunya dan tampak ungu. Ketika berkas berintensitas I₀ melewati larutan, setiap lapisan tipis menyingkirkan fraksi yang sama dari cahaya yang mencapainya, sehingga intensitas turun secara eksponensial terhadap jarak, bukan linear. Fraksi yang lolos disebut transmitans T = I/I₀, dan besaran yang berperilaku sederhana adalah absorbansi, A = −log₁₀ T = log₁₀(I₀/I).',
        'Hukum Beer–Lambert menyatakan bahwa absorbansi sebanding dengan banyaknya molekul penyerap yang ditemui berkas: A = ε · c · L, dengan c konsentrasi molar, L panjang lintasan melalui kuvet dalam sentimeter, dan ε (absorptivitas molar, dalam L mol⁻¹ cm⁻¹) mengukur seberapa kuat satu mol zat itu menyerap pada panjang gelombang tersebut. ε bergantung pada zat dan panjang gelombang, sehingga setiap sampel memiliki spektrum absorpsinya sendiri. Simulasi memodelkan spektrum setiap sampel sebagai puncak mulus yang berpusat di λ_maks, menghitung A = εcL, lalu T = 10^−A untuk menentukan seberapa banyak berkas yang mencapai detektor.',
        'Ketiga slider adalah tiga faktor dalam hukum itu. Menggandakan konsentrasi atau menggandakan panjang lintasan menggandakan A, yang menurunkan cahaya terusan dengan faktor yang sama lagi: A = 1 meloloskan 10%, A = 2 meloloskan 1%, A = 3 hanya 0,1%. Slider panjang gelombang bergerak sepanjang spektrum; pada λ_maks absorptivitas molar paling besar, sehingga konsentrasi tertentu menghasilkan absorbansi terbesar dan perubahan kecil pada konsentrasi memberi perubahan pembacaan paling besar. Di luar puncak, ε kecil dan larutan yang sama tampak hampir tembus bagi berkas. Arahkan kursor ke spektrum untuk membaca A dan ε pada panjang gelombang mana pun, dan gunakan panel lab untuk mencatat A terhadap c lalu memastikan garis lurusnya.',
        'Beberapa hal disederhanakan. Spektrum nyata bukan kurva lonceng sempurna, dan nilai ε nyata sangat berbeda antarzat (ion Cu²⁺ terhidrasi menyerap lemah, dengan ε sekitar 10, sedangkan β-karoten melebihi 100.000), sementara simulasi memberi semua sampel tinggi puncak yang sama, 5000, agar slider berperilaku sebanding. Instrumen nyata juga menyimpang dari hukum pada absorbansi tinggi (di atas kira-kira 1,5–2) karena cahaya sesatan dan karena berkas tidak pernah benar-benar satu panjang gelombang, dan hukum ini mengasumsikan molekul tidak saling berinteraksi atau bereaksi saat konsentrasi naik. Pemantulan dan penyerapan oleh dinding kuvet dalam praktik dihilangkan dengan mengukur blanko, yang di simulasi dianggap sudah dilakukan.',
      ],
    },
    figure: {
      caption: {
        en: 'Light of intensity I₀ enters a cuvette of path length L. Each layer absorbs the same fraction, so the intensity decays exponentially and I/I₀ = 10^−A, where A = εcL. Doubling c or L doubles A and squares the fraction transmitted.',
        id: 'Cahaya berintensitas I₀ masuk ke kuvet dengan panjang lintasan L. Setiap lapisan menyerap fraksi yang sama, sehingga intensitas meluruh secara eksponensial dan I/I₀ = 10^−A, dengan A = εcL. Menggandakan c atau L menggandakan A dan mengkuadratkan fraksi yang diteruskan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Light intensity falling through an absorbing solution', 'Intensitas cahaya menurun saat melewati larutan penyerap')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.m{stroke:currentColor;stroke-width:.8;opacity:.5}</style>
  <rect x="110" y="40" width="160" height="90" fill="#8b5cf6" opacity=".22" stroke="currentColor" stroke-width="1.5"/>
  <text x="190" y="34" text-anchor="middle">${L('cuvette, concentration c', 'kuvet, konsentrasi c')}</text>
  <line x1="30" y1="85" x2="108" y2="85" stroke="#f59e0b" stroke-width="10"/>
  <text x="38" y="72" fill="#f59e0b" style="font-weight:bold">I₀</text>
  <line x1="272" y1="85" x2="320" y2="85" stroke="#f59e0b" stroke-width="10" opacity=".3"/>
  <text x="290" y="72" fill="#f59e0b" style="font-weight:bold">I</text>
  <rect x="322" y="55" width="14" height="60" fill="#10b981"/>
  <text x="329" y="130" text-anchor="middle">${L('detector', 'detektor')}</text>
  <path d="M110 48 C150 95 200 115 270 122" fill="none" stroke="#ef4444" stroke-width="2.4"/>
  <text x="178" y="62" fill="#ef4444">${L('intensity inside', 'intensitas di dalam')}</text>
  <line x1="150" y1="40" x2="150" y2="130" class="m" stroke-dasharray="3 3"/>
  <line x1="190" y1="40" x2="190" y2="130" class="m" stroke-dasharray="3 3"/>
  <line x1="230" y1="40" x2="230" y2="130" class="m" stroke-dasharray="3 3"/>
  <text x="118" y="146" opacity=".8">${L('each layer absorbs the same fraction', 'setiap lapisan menyerap fraksi yang sama')}</text>
  <line x1="110" y1="160" x2="270" y2="160" class="ax" marker-start="url(#ar2)" marker-end="url(#ar)"/>
  <text x="190" y="174" text-anchor="middle">L (cm)</text>
  <text x="30" y="200" style="font-weight:bold">A = log₁₀(I₀/I) = ε · c · L</text>
  <text x="30" y="218">T = I/I₀ = 10^−A</text>
  <text x="200" y="200">A = 1 → T = 10%</text>
  <text x="200" y="214">A = 2 → T = 1%</text>
  <text x="200" y="228">A = 3 → T = 0.1%</text>
  <defs>
    <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker>
    <marker id="ar2" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto"><path d="M8 0 L0 4 L8 8 z" fill="context-stroke"/></marker>
  </defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Absorbance is proportional to concentration and path length: A = ε · c · L.',
        'Transmittance falls exponentially: T = 10^−A, so A = 1 means 10% of the light gets through and A = 2 means 1%.',
        'The molar absorptivity ε depends on both the substance and the wavelength; the spectrum is ε plotted against λ.',
        'Measurements are made at λ_max because the absorbance, and therefore the sensitivity to concentration, is greatest there.',
        'A solution appears the colour that is complementary to the light it absorbs.',
      ],
      id: [
        'Absorbansi sebanding dengan konsentrasi dan panjang lintasan: A = ε · c · L.',
        'Transmitans turun secara eksponensial: T = 10^−A, sehingga A = 1 berarti 10% cahaya lolos dan A = 2 berarti 1%.',
        'Absorptivitas molar ε bergantung pada zat sekaligus panjang gelombang; spektrum adalah grafik ε terhadap λ.',
        'Pengukuran dilakukan pada λ_maks karena absorbansi, dan karenanya kepekaan terhadap konsentrasi, paling besar di sana.',
        'Larutan tampak berwarna komplementer dari cahaya yang diserapnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Transmittance (T)', 'The fraction of incident light that passes through the sample, I/I₀, often quoted as a percentage.'],
        ['Absorbance (A)', 'log₁₀(I₀/I), a dimensionless measure of how much light is absorbed; it adds up across layers and across solutes.'],
        ['Molar absorptivity (ε)', 'The absorbance of a 1 mol/L solution in a 1 cm cell at a given wavelength, in L mol⁻¹ cm⁻¹.'],
        ['Path length (L)', 'The distance the beam travels through the solution, usually the 1.00 cm width of a standard cuvette.'],
        ['λ_max', 'The wavelength at which a substance absorbs most strongly, the peak of its spectrum.'],
        ['Absorption spectrum', 'A graph of absorbance (or ε) against wavelength, characteristic of each substance.'],
        ['Spectrophotometer', 'An instrument that shines light of a chosen wavelength through a sample and measures the transmitted intensity.'],
        ['Blank', 'A cuvette of pure solvent used to set I₀, so that reflection and solvent absorption are cancelled out.'],
      ],
      id: [
        ['Transmitans (T)', 'Fraksi cahaya datang yang lolos melalui sampel, I/I₀, sering dinyatakan dalam persen.'],
        ['Absorbansi (A)', 'log₁₀(I₀/I), ukuran tanpa satuan untuk banyaknya cahaya yang diserap; nilainya menjumlah antarlapisan dan antarzat terlarut.'],
        ['Absorptivitas molar (ε)', 'Absorbansi larutan 1 mol/L dalam sel 1 cm pada panjang gelombang tertentu, dalam L mol⁻¹ cm⁻¹.'],
        ['Panjang lintasan (L)', 'Jarak yang ditempuh berkas melalui larutan, biasanya lebar 1,00 cm kuvet standar.'],
        ['λ_maks', 'Panjang gelombang tempat suatu zat menyerap paling kuat, puncak spektrumnya.'],
        ['Spektrum absorpsi', 'Grafik absorbansi (atau ε) terhadap panjang gelombang, khas untuk tiap zat.'],
        ['Spektrofotometer', 'Instrumen yang menyorotkan cahaya dengan panjang gelombang terpilih melalui sampel dan mengukur intensitas yang diteruskan.'],
        ['Blanko', 'Kuvet berisi pelarut murni yang dipakai untuk menetapkan I₀, sehingga pemantulan dan penyerapan oleh pelarut tersisihkan.'],
      ],
    },
    misconceptions: {
      en: [
        ['Transmittance is proportional to concentration, just like absorbance.', 'Only absorbance is linear in c. Transmittance falls exponentially: doubling c from A = 1 to A = 2 takes the transmitted light from 10% to 1%, not from 10% to 5%.'],
        ['A solution looks the colour of the light it absorbs.', 'It looks the colour that is left over. KMnO₄ absorbs green and appears purple; CuSO₄ absorbs red and near-infrared and appears blue; chlorophyll absorbs red and blue and appears green.'],
        ['A thicker cuvette halves the light if it is twice as thick.', 'Each layer removes the same fraction, so twice the thickness squares the transmitted fraction. If 1 cm lets 50% through, 2 cm lets 25% through, and the absorbance doubles from 0.30 to 0.60.'],
        ['Any wavelength will do for measuring concentration.', 'Away from λ_max the absorbance is small, so the reading barely changes with concentration and small errors in wavelength or noise swamp the signal. Measuring at the peak gives the largest, most stable response.'],
      ],
      id: [
        ['Transmitans sebanding dengan konsentrasi, sama seperti absorbansi.', 'Hanya absorbansi yang linear terhadap c. Transmitans turun eksponensial: menggandakan c dari A = 1 ke A = 2 menurunkan cahaya terusan dari 10% menjadi 1%, bukan dari 10% menjadi 5%.'],
        ['Larutan tampak berwarna seperti cahaya yang diserapnya.', 'Larutan tampak berwarna sisa cahaya yang tidak diserap. KMnO₄ menyerap hijau dan tampak ungu; CuSO₄ menyerap merah dan inframerah dekat dan tampak biru; klorofil menyerap merah dan biru dan tampak hijau.'],
        ['Kuvet dua kali lebih tebal meloloskan separuh cahaya.', 'Setiap lapisan menyingkirkan fraksi yang sama, sehingga ketebalan dua kali mengkuadratkan fraksi yang lolos. Jika 1 cm meloloskan 50%, 2 cm meloloskan 25%, dan absorbansinya berlipat dari 0,30 menjadi 0,60.'],
        ['Panjang gelombang apa pun bisa dipakai untuk mengukur konsentrasi.', 'Jauh dari λ_maks absorbansinya kecil, sehingga pembacaan hampir tidak berubah terhadap konsentrasi dan kesalahan kecil pada panjang gelombang atau derau menenggelamkan sinyal. Mengukur pada puncak memberi respons terbesar dan paling stabil.'],
      ],
    },
    realWorld: {
      en: [
        'Hospital analysers measure haemoglobin, glucose and cholesterol by adding a reagent that forms a coloured product and reading its absorbance against a calibration line.',
        'A pulse oximeter clips to a finger and compares absorbance at two wavelengths (about 660 and 940 nm) to estimate how much haemoglobin is carrying oxygen.',
        'Water-quality kits turn phosphate or nitrate into a coloured complex whose absorbance gives the pollutant concentration in a river or aquarium.',
        'Molecular biologists quantify DNA by its absorbance at 260 nm, using a path length of 1 cm and the known absorptivity of nucleic acids.',
      ],
      id: [
        'Alat analisis rumah sakit mengukur hemoglobin, glukosa, dan kolesterol dengan menambahkan reagen yang membentuk produk berwarna lalu membaca absorbansinya terhadap garis kalibrasi.',
        'Oksimeter denyut dijepit di jari dan membandingkan absorbansi pada dua panjang gelombang (sekitar 660 dan 940 nm) untuk memperkirakan berapa banyak hemoglobin yang membawa oksigen.',
        'Kit kualitas air mengubah fosfat atau nitrat menjadi kompleks berwarna yang absorbansinya memberi konsentrasi pencemar di sungai atau akuarium.',
        'Ahli biologi molekuler mengukur jumlah DNA dari absorbansinya pada 260 nm, memakai panjang lintasan 1 cm dan absorptivitas asam nukleat yang sudah diketahui.',
      ],
    },
    questions: {
      en: [
        { q: 'A KMnO₄ solution in a 1.00 cm cuvette reads A = 0.60 at λ_max, where the sim\'s ε = 5000 L mol⁻¹ cm⁻¹. What is its concentration?', a: 'c = A / (ε · L) = 0.60 / (5000 × 1.00) = 1.2 × 10⁻⁴ mol/L. In the sim, setting c = 0.0001 M gives A = 0.50 and 0.00012 M gives 0.60.' },
        { q: 'A sample has A = 2.0. What percentage of the light reaches the detector, and what would it be if the path length were halved?', a: 'T = 10^−2 = 0.01, so 1% of the light gets through. Halving L halves A to 1.0, and T = 10^−1 = 10%. Halving the path length lets ten times more light through, not twice as much.' },
        { q: 'Why do chemists measure at λ_max rather than at some other wavelength, given that the Beer–Lambert law holds at every wavelength?', a: 'At λ_max ε is largest, so the slope of A against c is steepest and small concentration differences give large, easily measured changes in A. The peak is also flat on top, so a small error in the set wavelength barely changes ε, whereas on the steep side of the peak the same error would shift the reading noticeably.' },
      ],
      id: [
        { q: 'Larutan KMnO₄ dalam kuvet 1,00 cm terbaca A = 0,60 pada λ_maks, dengan ε simulasi = 5000 L mol⁻¹ cm⁻¹. Berapa konsentrasinya?', a: 'c = A / (ε · L) = 0,60 / (5000 × 1,00) = 1,2 × 10⁻⁴ mol/L. Di simulasi, mengatur c = 0,0001 M memberi A = 0,50 dan 0,00012 M memberi 0,60.' },
        { q: 'Sebuah sampel memiliki A = 2,0. Berapa persen cahaya yang mencapai detektor, dan berapa jika panjang lintasannya disetengahkan?', a: 'T = 10^−2 = 0,01, jadi 1% cahaya lolos. Menyetengahkan L menyetengahkan A menjadi 1,0, dan T = 10^−1 = 10%. Menyetengahkan panjang lintasan meloloskan sepuluh kali lebih banyak cahaya, bukan dua kali.' },
        { q: 'Mengapa kimiawan mengukur pada λ_maks dan bukan pada panjang gelombang lain, padahal hukum Beer–Lambert berlaku pada setiap panjang gelombang?', a: 'Pada λ_maks ε paling besar, sehingga kemiringan A terhadap c paling curam dan perbedaan konsentrasi kecil memberi perubahan A yang besar dan mudah diukur. Puncaknya juga datar di atas, sehingga kesalahan kecil pada pengaturan panjang gelombang hampir tidak mengubah ε, sedangkan di sisi curam puncak kesalahan yang sama akan menggeser pembacaan secara nyata.' },
      ],
    },
  },
};
