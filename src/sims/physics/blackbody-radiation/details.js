// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe the shape of the blackbody spectrum and state Planck\'s law B(λ,T) = (2hc²/λ⁵)·1/(e^{hc/λkT} − 1) as the quantum explanation of it.',
      'Use Wien\'s displacement law λ_max = b/T (b = 2.898 × 10⁻³ m·K) to find the peak wavelength or the temperature of an emitter.',
      'Use the Stefan–Boltzmann law P/A = σT⁴ (σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴) to compare the radiated power of hot objects and explain why doubling T gives 16 times the power.',
    ],
    id: [
      'Mendeskripsikan bentuk spektrum benda hitam dan menyatakan hukum Planck B(λ,T) = (2hc²/λ⁵)·1/(e^{hc/λkT} − 1) sebagai penjelasan kuantumnya.',
      'Menggunakan hukum pergeseran Wien λ_maks = b/T (b = 2,898 × 10⁻³ m·K) untuk menentukan panjang gelombang puncak atau suhu suatu pemancar.',
      'Menggunakan hukum Stefan–Boltzmann P/A = σT⁴ (σ = 5,67 × 10⁻⁸ W m⁻² K⁻⁴) untuk membandingkan daya radiasi benda panas dan menjelaskan mengapa menggandakan T memberi daya 16 kali.',
    ],
  },
  tryThis: {
    en: [
      'Press the Sun preset (5778 K). The peak should sit at 0.50 μm, in the middle of the visible band, and about 44 % of the power is visible light.',
      'Press Incandescent (2700 K). The peak moves to 1.07 μm in the infrared and only about 7 % of the power is visible: most of a filament bulb\'s electricity becomes heat.',
      'Slide from 3000 K to 6000 K and watch P/A on the readout. It should multiply by exactly 2⁴ = 16.',
      'Press Earth (288 K) and switch on the log scale: the curve peaks near 10 μm, far in the infrared, which is why the Earth glows only in thermal cameras.',
    ],
    id: [
      'Tekan preset Matahari (5778 K). Puncaknya seharusnya di 0,50 μm, di tengah pita tampak, dan sekitar 44 % dayanya berupa cahaya tampak.',
      'Tekan Pijar (2700 K). Puncaknya bergeser ke 1,07 μm di inframerah dan hanya sekitar 7 % dayanya tampak: sebagian besar listrik lampu filamen menjadi panas.',
      'Geser dari 3000 K ke 6000 K dan perhatikan P/A pada bacaan. Nilainya seharusnya berlipat tepat 2⁴ = 16.',
      'Tekan Bumi (288 K) dan nyalakan skala log: kurvanya memuncak dekat 10 μm, jauh di inframerah, itulah sebabnya Bumi hanya berpijar di kamera termal.',
    ],
  },

  learn: {
    background: {
      en: [
        'Every object above absolute zero radiates electromagnetic waves because its charged particles are jiggling. A blackbody is an ideal object that absorbs all radiation falling on it and therefore also emits the maximum possible amount at every wavelength; a small hole in a hot oven, a star\'s surface and a glowing filament are close approximations. Its spectrum depends only on temperature: it rises steeply at short wavelengths, peaks, and falls off slowly at long wavelengths. Classical physics (the Rayleigh–Jeans law) predicted ever more radiation at shorter wavelengths, the "ultraviolet catastrophe". In 1900 Max Planck fixed this by assuming that the energy of the oscillators in the walls could only change in packets of E = hf, with h = 6.626 × 10⁻³⁴ J·s. His law for the spectral radiance, B(λ,T) = (2hc²/λ⁵) · 1/(e^{hc/(λkT)} − 1), fits every measured blackbody spectrum and was the birth of quantum physics.',
        'Two simpler laws follow from Planck\'s formula. Wien\'s displacement law says the wavelength of the peak is inversely proportional to temperature: λ_max = b/T with b = 2.898 × 10⁻³ m·K. For the Sun\'s surface at 5778 K this gives 0.50 μm, green-blue light at the centre of the visible band, which is no coincidence: our eyes evolved under sunlight. A 2700 K incandescent filament peaks at 1.07 μm in the infrared, the human body at 310 K peaks at 9.3 μm, and the hot star Sirius at 9940 K peaks at 0.29 μm in the ultraviolet, which makes it look blue-white. Astronomers measure the colour of stars precisely to read their surface temperature this way.',
        'The Stefan–Boltzmann law gives the total power radiated per unit area, the area under the whole curve: P/A = σT⁴ with σ = 5.670 × 10⁻⁸ W m⁻² K⁻⁴. The fourth power is dramatic: doubling the temperature multiplies the power by 16. The Sun\'s surface emits 6.3 × 10⁷ W/m², a 2700 K filament 3.0 × 10⁶ W/m², the Earth\'s surface at 288 K only 390 W/m². Real objects emit a fraction ε (the emissivity, between 0 and 1) of the blackbody value. In the sim the curve is drawn in units of W per m² per μm of wavelength so that the shaded area really is σT⁴; the visible band 380–750 nm is marked, and the readout integrates the curve numerically to tell you what fraction of the power your eyes could see. The colour swatch converts the spectrum into the approximate colour a human would perceive, from dull red at 1000 K through white near 6500 K to blue-white above 10 000 K.',
      ],
      id: [
        'Setiap benda di atas nol mutlak memancarkan gelombang elektromagnetik karena partikel-partikel bermuatannya bergetar. Benda hitam adalah benda ideal yang menyerap semua radiasi yang mengenainya dan karena itu juga memancarkan jumlah maksimum yang mungkin pada setiap panjang gelombang; lubang kecil pada tungku panas, permukaan bintang, dan filamen pijar adalah pendekatan yang baik. Spektrumnya hanya bergantung pada suhu: naik tajam pada panjang gelombang pendek, memuncak, lalu turun perlahan pada panjang gelombang panjang. Fisika klasik (hukum Rayleigh–Jeans) meramalkan radiasi yang terus bertambah pada panjang gelombang yang makin pendek, "bencana ultraviolet". Pada 1900 Max Planck memperbaikinya dengan mengandaikan energi osilator di dinding hanya dapat berubah dalam paket E = hf, dengan h = 6,626 × 10⁻³⁴ J·s. Hukumnya untuk radiansi spektral, B(λ,T) = (2hc²/λ⁵) · 1/(e^{hc/(λkT)} − 1), cocok dengan setiap spektrum benda hitam yang terukur dan menjadi kelahiran fisika kuantum.',
        'Dua hukum yang lebih sederhana mengikuti dari rumus Planck. Hukum pergeseran Wien menyatakan panjang gelombang puncak berbanding terbalik dengan suhu: λ_maks = b/T dengan b = 2,898 × 10⁻³ m·K. Untuk permukaan Matahari pada 5778 K hasilnya 0,50 μm, cahaya hijau-biru di pusat pita tampak, dan itu bukan kebetulan: mata kita berevolusi di bawah sinar matahari. Filamen pijar 2700 K memuncak di 1,07 μm di inframerah, tubuh manusia pada 310 K memuncak di 9,3 μm, dan bintang panas Sirius pada 9940 K memuncak di 0,29 μm di ultraviolet, yang membuatnya tampak putih kebiruan. Astronom mengukur warna bintang dengan teliti untuk membaca suhu permukaannya dengan cara ini.',
        'Hukum Stefan–Boltzmann memberikan daya total yang dipancarkan per satuan luas, yaitu luas di bawah seluruh kurva: P/A = σT⁴ dengan σ = 5,670 × 10⁻⁸ W m⁻² K⁻⁴. Pangkat empat itu dramatis: menggandakan suhu melipatgandakan daya 16 kali. Permukaan Matahari memancarkan 6,3 × 10⁷ W/m², filamen 2700 K 3,0 × 10⁶ W/m², permukaan Bumi pada 288 K hanya 390 W/m². Benda nyata memancarkan sebagian ε (emisivitas, antara 0 dan 1) dari nilai benda hitam. Dalam simulasi, kurva digambar dalam satuan W per m² per μm panjang gelombang sehingga luas yang diarsir benar-benar σT⁴; pita tampak 380–750 nm ditandai, dan bacaan mengintegralkan kurva secara numerik untuk memberi tahu berapa bagian daya yang bisa dilihat matamu. Contoh warna mengubah spektrum menjadi perkiraan warna yang dilihat manusia, dari merah redup pada 1000 K melalui putih dekat 6500 K hingga putih kebiruan di atas 10 000 K.',
      ],
    },
    figure: {
      caption: {
        en: 'Planck spectra for 3000 K, 4000 K and 5778 K on the same axes. Hotter emitters are brighter at every wavelength, their peaks move to shorter wavelengths (λ_max·T = constant) and the area under the curve grows as T⁴. The grey band marks visible light, 0.38–0.75 μm.',
        id: 'Spektrum Planck untuk 3000 K, 4000 K, dan 5778 K pada sumbu yang sama. Pemancar yang lebih panas lebih terang pada setiap panjang gelombang, puncaknya bergeser ke panjang gelombang lebih pendek (λ_maks·T = konstan), dan luas di bawah kurva tumbuh sebagai T⁴. Pita abu-abu menandai cahaya tampak, 0,38–0,75 μm.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const h = 6.626e-34, c = 2.998e8, k = 1.381e-23;
        const B = (lam, T) => { const x = (h * c) / (lam * k * T); if (x > 700) return 0; return (2 * h * c * c) / Math.pow(lam, 5) / Math.expm1(x); };
        const x0 = 40, x1 = 340, y0 = 200, y1 = 30, lamMax = 3e-6;
        const norm = B(2.898e-3 / 5778, 5778) || 1;
        const curve = (T, color) => {
          let d = '';
          for (let i = 0; i <= 120; i++) {
            const lam = Math.max(1e-8, (i / 120) * lamMax);
            const v = Math.min(1, B(lam, T) / norm);
            const x = x0 + (i / 120) * (x1 - x0), y = y0 - v * (y0 - y1);
            d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
          }
          return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2"/>`;
        };
        const peak = (T) => x0 + ((2.898e-3 / T) / lamMax) * (x1 - x0);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Blackbody spectra at three temperatures', 'Spektrum benda hitam pada tiga suhu')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:10px system-ui,sans-serif;fill:currentColor;opacity:.85}.m{stroke:currentColor;stroke-width:1.2;opacity:.5;fill:none}</style>
  <rect x="${(x0 + (0.38e-6 / lamMax) * (x1 - x0)).toFixed(1)}" y="${y1}" width="${(((0.75 - 0.38) * 1e-6) / lamMax * (x1 - x0)).toFixed(1)}" height="${y0 - y1}" fill="currentColor" opacity=".12"/>
  <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" class="m"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" class="m"/>
  ${curve(5778, '#fbbf24')}${curve(4000, '#f97316')}${curve(3000, '#ef4444')}
  <line x1="${peak(5778).toFixed(1)}" y1="${y1}" x2="${peak(5778).toFixed(1)}" y2="${y0}" stroke="#fbbf24" stroke-dasharray="3 3" opacity=".7"/>
  <text x="${(peak(5778) + 4).toFixed(1)}" y="${y1 + 12}" class="s" fill="#fbbf24">5778 K</text>
  <text x="${(peak(4000) + 60).toFixed(1)}" y="${y1 + 70}" class="s">4000 K</text>
  <text x="${(peak(3000) + 90).toFixed(1)}" y="${y1 + 118}" class="s">3000 K</text>
  <text x="${x0 + 2}" y="${y0 + 14}" class="s">0</text><text x="${x1 - 10}" y="${y0 + 14}" class="s">3</text>
  <text x="${(x0 + x1) / 2 - 2}" y="${y0 + 14}" class="s">1.5</text>
  <text x="${(x0 + x1) / 2 - 26}" y="${y0 + 30}">λ (μm)</text>
  <text x="4" y="${y1 - 6}" class="s">B(λ,T)</text>
  <text x="${x0 + 6}" y="${y0 - 6}" class="s">${L('visible', 'tampak')}</text>
  <text x="180" y="236" class="s">λ_max = b/T,  P/A = σT⁴</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'All objects emit thermal radiation; a blackbody emits the maximum possible, with a spectrum that depends only on temperature.',
        'Planck\'s law B(λ,T) = (2hc²/λ⁵)/(e^{hc/λkT} − 1) requires quantised energy E = hf and removes the classical ultraviolet catastrophe.',
        'Wien: λ_max·T = 2.898 × 10⁻³ m·K. Sun 5778 K → 0.50 μm (visible); filament 2700 K → 1.07 μm (infrared); Earth 288 K → 10 μm (far infrared).',
        'Stefan–Boltzmann: P/A = σT⁴, σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴. Doubling T multiplies radiated power by 16.',
        'A hotter blackbody is brighter at every wavelength, not just near its peak; the curves never cross.',
        'Only part of the spectrum falls in the visible band 380–750 nm: about 44 % for the Sun but only 7 % for an incandescent bulb.',
      ],
      id: [
        'Semua benda memancarkan radiasi termal; benda hitam memancarkan jumlah maksimum yang mungkin, dengan spektrum yang hanya bergantung pada suhu.',
        'Hukum Planck B(λ,T) = (2hc²/λ⁵)/(e^{hc/λkT} − 1) memerlukan energi terkuantisasi E = hf dan menghilangkan bencana ultraviolet klasik.',
        'Wien: λ_maks·T = 2,898 × 10⁻³ m·K. Matahari 5778 K → 0,50 μm (tampak); filamen 2700 K → 1,07 μm (inframerah); Bumi 288 K → 10 μm (inframerah jauh).',
        'Stefan–Boltzmann: P/A = σT⁴, σ = 5,67 × 10⁻⁸ W m⁻² K⁻⁴. Menggandakan T melipatgandakan daya radiasi 16 kali.',
        'Benda hitam yang lebih panas lebih terang pada setiap panjang gelombang, bukan hanya di dekat puncaknya; kurva-kurvanya tidak pernah berpotongan.',
        'Hanya sebagian spektrum yang jatuh di pita tampak 380–750 nm: sekitar 44 % untuk Matahari tetapi hanya 7 % untuk lampu pijar.',
      ],
    },
    vocabulary: {
      en: [
        ['Blackbody', 'An idealised object that absorbs all radiation that hits it and emits a spectrum that depends only on its temperature.'],
        ['Spectral radiance B(λ,T)', 'Power emitted per unit area, per unit solid angle, per unit wavelength. Multiplying by π gives the power per m² per unit wavelength leaving the surface.'],
        ['Wien\'s displacement law', 'λ_max = b/T, with b = 2.898 × 10⁻³ m·K: the peak wavelength is inversely proportional to temperature.'],
        ['Stefan–Boltzmann law', 'P/A = σT⁴: the total power radiated per unit area grows with the fourth power of the absolute temperature.'],
        ['Emissivity ε', 'The fraction (0 to 1) of blackbody radiation a real surface emits; polished metal has ε ≈ 0.05, human skin ≈ 0.98.'],
        ['Planck\'s constant h', '6.626 × 10⁻³⁴ J·s, the proportionality between a photon\'s energy and its frequency, E = hf.'],
      ],
      id: [
        ['Benda hitam', 'Benda ideal yang menyerap semua radiasi yang mengenainya dan memancarkan spektrum yang hanya bergantung pada suhunya.'],
        ['Radiansi spektral B(λ,T)', 'Daya yang dipancarkan per satuan luas, per satuan sudut ruang, per satuan panjang gelombang. Dikalikan π memberi daya per m² per satuan panjang gelombang yang meninggalkan permukaan.'],
        ['Hukum pergeseran Wien', 'λ_maks = b/T, dengan b = 2,898 × 10⁻³ m·K: panjang gelombang puncak berbanding terbalik dengan suhu.'],
        ['Hukum Stefan–Boltzmann', 'P/A = σT⁴: daya total yang dipancarkan per satuan luas tumbuh dengan pangkat empat suhu mutlak.'],
        ['Emisivitas ε', 'Bagian (0 sampai 1) radiasi benda hitam yang dipancarkan permukaan nyata; logam mengilap ε ≈ 0,05, kulit manusia ≈ 0,98.'],
        ['Tetapan Planck h', '6,626 × 10⁻³⁴ J·s, kesebandingan antara energi foton dan frekuensinya, E = hf.'],
      ],
    },
    misconceptions: {
      en: [
        ['A "red-hot" object emits only red light.', 'It emits a whole continuous spectrum, mostly infrared. Red is just the visible wavelength it emits most strongly; as it heats up it also emits yellow, green and blue and turns white.'],
        ['Cold objects do not radiate.', 'Everything above 0 K radiates. Ice at 273 K emits about 315 W/m², peaking near 10.6 μm. You cannot see it, but a thermal camera can.'],
        ['Doubling the temperature doubles the brightness.', 'Total power goes as T⁴, so doubling T gives 16 times the power. From 3000 K to 6000 K the sim\'s P/A jumps from 4.6 × 10⁶ to 7.3 × 10⁷ W/m².'],
        ['The Sun is yellow because its peak is at yellow.', 'Its peak at 0.50 μm is green-blue, and its visible output is nearly flat across the spectrum, so sunlight is white. The Sun looks yellow-orange near the horizon only because the atmosphere scatters blue light away.'],
      ],
      id: [
        ['Benda "merah membara" hanya memancarkan cahaya merah.', 'Ia memancarkan seluruh spektrum kontinu, sebagian besar inframerah. Merah hanyalah panjang gelombang tampak yang paling kuat dipancarkan; saat makin panas ia juga memancarkan kuning, hijau, dan biru lalu menjadi putih.'],
        ['Benda dingin tidak memancarkan radiasi.', 'Segala sesuatu di atas 0 K memancarkan radiasi. Es pada 273 K memancarkan sekitar 315 W/m², memuncak dekat 10,6 μm. Kamu tidak bisa melihatnya, tetapi kamera termal bisa.'],
        ['Menggandakan suhu menggandakan kecerahan.', 'Daya total berbanding dengan T⁴, jadi menggandakan T memberi daya 16 kali. Dari 3000 K ke 6000 K, P/A di simulasi melonjak dari 4,6 × 10⁶ ke 7,3 × 10⁷ W/m².'],
        ['Matahari berwarna kuning karena puncaknya di kuning.', 'Puncaknya di 0,50 μm adalah hijau-biru, dan keluaran tampaknya hampir rata di seluruh spektrum, sehingga sinar matahari berwarna putih. Matahari tampak kuning-jingga dekat cakrawala hanya karena atmosfer menghamburkan cahaya biru.'],
      ],
    },
    realWorld: {
      en: [
        'Astronomers read a star\'s surface temperature from its colour: red Betelgeuse is about 3500 K, the Sun 5778 K, blue-white Rigel about 12 000 K.',
        'Incandescent bulbs convert only about 7 % of their power into visible light; LED lamps avoid thermal emission entirely and use a tenth of the electricity.',
        'Infrared thermometers and thermal cameras measure body or surface temperature by detecting the 8–14 μm radiation predicted by Planck\'s law.',
        'The cosmic microwave background is a near-perfect blackbody spectrum at 2.725 K, the cooled afterglow of the early universe, peaking at about 1.06 mm.',
        'The Earth\'s energy balance uses σT⁴: sunlight absorbed must equal the thermal infrared radiated, and greenhouse gases that trap part of that infrared raise the surface temperature.',
      ],
      id: [
        'Astronom membaca suhu permukaan bintang dari warnanya: Betelgeuse yang merah sekitar 3500 K, Matahari 5778 K, Rigel yang putih kebiruan sekitar 12 000 K.',
        'Lampu pijar hanya mengubah sekitar 7 % dayanya menjadi cahaya tampak; lampu LED menghindari emisi termal sama sekali dan memakai sepersepuluh listriknya.',
        'Termometer inframerah dan kamera termal mengukur suhu tubuh atau permukaan dengan mendeteksi radiasi 8–14 μm yang diramalkan hukum Planck.',
        'Radiasi latar gelombang mikro kosmik adalah spektrum benda hitam yang hampir sempurna pada 2,725 K, sisa pijar alam semesta awal yang mendingin, memuncak sekitar 1,06 mm.',
        'Kesetimbangan energi Bumi memakai σT⁴: sinar matahari yang diserap harus sama dengan inframerah termal yang dipancarkan, dan gas rumah kaca yang menahan sebagian inframerah itu menaikkan suhu permukaan.',
      ],
    },
    questions: {
      en: [
        { q: 'A star\'s spectrum peaks at 0.29 μm. What is its surface temperature?', a: 'T = b/λ_max = (2.898 × 10⁻³ m·K)/(0.29 × 10⁻⁶ m) ≈ 10 000 K, close to Sirius at 9940 K.' },
        { q: 'How much power does 1 m² of the Sun\'s surface (5778 K) radiate? How does this compare with a 2889 K surface?', a: 'P/A = σT⁴ = 5.67 × 10⁻⁸ × 5778⁴ = 6.3 × 10⁷ W/m². At half the temperature the power is 1/16 of this, 3.9 × 10⁶ W/m².' },
        { q: 'Why does an incandescent bulb waste so much energy compared with an LED?', a: 'A 2700 K filament peaks at 1.07 μm in the infrared; the sim shows only about 7 % of its σT⁴ falls in the 380–750 nm visible band. The other 93 % is radiated as invisible heat.' },
        { q: 'Human skin is about 306 K. Where does its radiation peak, and roughly how much power does a 1.8 m² person radiate?', a: 'λ_max = 2.898 × 10⁻³/306 = 9.5 μm (far infrared). P = εσAT⁴ ≈ 0.98 × 5.67 × 10⁻⁸ × 1.8 × 306⁴ ≈ 880 W (the surroundings radiate most of this back).' },
      ],
      id: [
        { q: 'Spektrum sebuah bintang memuncak pada 0,29 μm. Berapakah suhu permukaannya?', a: 'T = b/λ_maks = (2,898 × 10⁻³ m·K)/(0,29 × 10⁻⁶ m) ≈ 10 000 K, dekat dengan Sirius pada 9940 K.' },
        { q: 'Berapa daya yang dipancarkan 1 m² permukaan Matahari (5778 K)? Bandingkan dengan permukaan 2889 K.', a: 'P/A = σT⁴ = 5,67 × 10⁻⁸ × 5778⁴ = 6,3 × 10⁷ W/m². Pada setengah suhu, dayanya 1/16 dari ini, 3,9 × 10⁶ W/m².' },
        { q: 'Mengapa lampu pijar membuang begitu banyak energi dibandingkan LED?', a: 'Filamen 2700 K memuncak di 1,07 μm di inframerah; simulasi menunjukkan hanya sekitar 7 % dari σT⁴-nya jatuh di pita tampak 380–750 nm. Sisanya, 93 %, dipancarkan sebagai panas tak terlihat.' },
        { q: 'Kulit manusia sekitar 306 K. Di mana puncak radiasinya, dan kira-kira berapa daya yang dipancarkan orang berluas 1,8 m²?', a: 'λ_maks = 2,898 × 10⁻³/306 = 9,5 μm (inframerah jauh). P = εσAT⁴ ≈ 0,98 × 5,67 × 10⁻⁸ × 1,8 × 306⁴ ≈ 880 W (lingkungan memancarkan kembali sebagian besar dari ini).' },
      ],
    },
  },
};
