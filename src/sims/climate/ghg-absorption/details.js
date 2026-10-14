// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See that water vapor dominates IR absorption — and CO₂ closes the "atmospheric window".',
      'Identify the bands where each gas absorbs.',
      'Understand why doubling CO₂ has a logarithmic (not linear) effect.',
    ],
    id: [
      'Melihat bahwa uap air mendominasi serapan IR — dan CO₂ menutup "jendela atmosfer".',
      'Mengidentifikasi pita di mana tiap gas menyerap.',
      'Memahami mengapa menggandakan CO₂ berefek logaritmik (bukan linear).',
    ],
  },  tryThis: {
    en: [
      'Turn off everything — Earth\'s blackbody curve goes out unmolested.',
      'Add water vapor — many bands fill in immediately.',
      'Double the CO₂ — the 15-µm peak deepens; the central window closes.',
    ],
    id: [
      'Matikan semua — kurva benda hitam Bumi keluar tanpa hambatan.',
      'Tambah uap air — banyak pita terisi seketika.',
      'Gandakan CO₂ — puncak 15 µm makin dalam; jendela tengah menutup.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Every object radiates according to its temperature. The Sun, at about 5800 K, radiates mostly visible light; Earth\'s surface, at about 288 K, radiates in the thermal infrared, with a peak near 10 µm given by Wien\'s law, λ_max = 2898 µm·K / T. The dashed curve in the simulation is this Planck (blackbody) curve for the chosen surface temperature, normalised to its peak. The atmosphere\'s main gases, N₂ and O₂, are transparent to this infrared because their symmetric molecules do not change their electric dipole when they vibrate. Molecules with three or more atoms, such as H₂O, CO₂, CH₄, N₂O and O₃, do, so they absorb infrared at the specific wavelengths that match their vibration and rotation frequencies.',
        'Each gas therefore has its own absorption bands. Water vapour absorbs strongly around 6.3 µm and across a broad region beyond about 18 µm; CO₂ has a very strong band centred on 15 µm and another at 4.3 µm; methane and nitrous oxide absorb near 7.7 µm; ozone absorbs at 9.6 µm. Between roughly 8 and 12 µm there is a gap, the atmospheric window, where only ozone and weak water-vapour absorption get in the way, so most radiation at those wavelengths escapes directly to space. Infrared absorbed by greenhouse gases is re-emitted in all directions, including back down, which keeps the surface about 33 °C warmer than it would be with a transparent atmosphere.',
        'The simulation represents each band as a smooth bell-shaped curve with a centre, a width and a peak strength. The on/off toggles include or exclude a gas, and each amount slider multiplies the strength of its bands between 0 and 3 times the default. The absorptions of all active gases are added together and capped at 100%, and the solid curve shows what is transmitted: the Planck curve multiplied by one minus the absorption. The surface-temperature slider shifts and reshapes the Planck curve, so you can see that a hotter planet radiates more at short wavelengths while the bands stay where they are. Hover over the chart to read the absorption at any wavelength.',
        'This is a cartoon of a real spectrum. Real bands are made of thousands of narrow lines, and transmission through a gas follows the Beer–Lambert law, I = I₀·exp(−τ), where the optical depth τ grows with the amount of gas. At the centre of the 15 µm band τ is already so large that extra CO₂ changes nothing there; the additional absorption comes from the edges of the band, which is why the climate forcing grows roughly as 5.35·ln(C/C₀) W/m², about 3.7 W/m² per doubling, rather than in proportion to concentration. The sim mimics saturation only crudely through its 100% cap, and it ignores the temperature profile of the atmosphere, pressure broadening, clouds and the fact that emission to space happens from cold high altitudes, which is the real heart of the greenhouse effect.',
      ],
      id: [
        'Setiap benda memancarkan radiasi sesuai suhunya. Matahari, pada sekitar 5800 K, memancarkan terutama cahaya tampak; permukaan Bumi, pada sekitar 288 K, memancarkan inframerah termal dengan puncak dekat 10 µm menurut hukum Wien, λ_maks = 2898 µm·K / T. Kurva putus-putus dalam simulasi adalah kurva Planck (benda hitam) untuk suhu permukaan yang dipilih, dinormalkan ke puncaknya. Gas utama atmosfer, N₂ dan O₂, tembus terhadap inframerah ini karena molekulnya yang simetris tidak mengubah dipol listriknya saat bergetar. Molekul dengan tiga atom atau lebih, seperti H₂O, CO₂, CH₄, N₂O, dan O₃, mengubahnya, sehingga mereka menyerap inframerah pada panjang gelombang tertentu yang cocok dengan frekuensi getaran dan rotasinya.',
        'Karena itu tiap gas punya pita serapan sendiri. Uap air menyerap kuat di sekitar 6,3 µm dan di wilayah lebar di atas kira-kira 18 µm; CO₂ punya pita sangat kuat berpusat di 15 µm dan pita lain di 4,3 µm; metana dan dinitrogen oksida menyerap di dekat 7,7 µm; ozon menyerap di 9,6 µm. Antara kira-kira 8 dan 12 µm ada celah, yaitu jendela atmosfer, tempat hanya ozon dan serapan uap air yang lemah yang menghalangi, sehingga sebagian besar radiasi pada panjang gelombang itu lolos langsung ke angkasa. Inframerah yang diserap gas rumah kaca dipancarkan kembali ke segala arah, termasuk ke bawah, sehingga permukaan sekitar 33 °C lebih hangat daripada jika atmosfernya tembus pandang.',
        'Simulasi ini menggambarkan tiap pita sebagai kurva lonceng mulus dengan pusat, lebar, dan kekuatan puncak. Tombol on/off menyertakan atau mengabaikan suatu gas, dan tiap slider jumlah mengalikan kekuatan pitanya antara 0 dan 3 kali nilai bawaan. Serapan semua gas aktif dijumlahkan dan dibatasi 100%, dan kurva tegas menunjukkan yang diteruskan: kurva Planck dikalikan satu dikurangi serapan. Slider suhu permukaan menggeser dan mengubah bentuk kurva Planck, sehingga kamu bisa melihat bahwa planet yang lebih panas memancarkan lebih banyak pada panjang gelombang pendek sementara pita-pitanya tetap di tempat. Arahkan kursor ke grafik untuk membaca serapan pada panjang gelombang mana pun.',
        'Ini adalah kartun dari spektrum nyata. Pita sebenarnya terdiri dari ribuan garis sempit, dan transmisi melalui gas mengikuti hukum Beer–Lambert, I = I₀·exp(−τ), dengan kedalaman optik τ yang bertambah bersama jumlah gas. Di pusat pita 15 µm nilai τ sudah begitu besar sehingga CO₂ tambahan tidak mengubah apa pun di sana; serapan tambahan datang dari tepi pita, itulah sebabnya paksaan iklim tumbuh kira-kira sebagai 5,35·ln(C/C₀) W/m², sekitar 3,7 W/m² per penggandaan, bukan sebanding dengan konsentrasi. Simulasi hanya meniru kejenuhan secara kasar lewat batas 100%-nya, dan mengabaikan profil suhu atmosfer, pelebaran tekanan, awan, serta kenyataan bahwa pancaran ke angkasa terjadi dari ketinggian yang dingin, yang merupakan inti sebenarnya dari efek rumah kaca.',
      ],
    },
    figure: {
      caption: {
        en: 'Earth\'s thermal emission at 288 K (curve) and the main absorption bands. Water vapour dominates below 8 µm and above 18 µm, CO₂ blocks 13–17 µm, and ozone sits inside the 8–12 µm atmospheric window through which most surface radiation escapes.',
        id: 'Pancaran termal Bumi pada 288 K (kurva) dan pita-pita serapan utama. Uap air mendominasi di bawah 8 µm dan di atas 18 µm, CO₂ menutup 13–17 µm, dan ozon berada di dalam jendela atmosfer 8–12 µm yang meloloskan sebagian besar radiasi permukaan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Infrared absorption bands of greenhouse gases', 'Pita serapan inframerah gas rumah kaca')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:9.5px;opacity:.85}.ax{stroke:currentColor;stroke-width:1;opacity:.6}</style>
  <rect x="42" y="40" width="36" height="140" fill="#3b82f6" opacity=".3"/>
  <rect x="72" y="40" width="12" height="140" fill="#10b981" opacity=".35"/>
  <rect x="94" y="40" width="8" height="140" fill="#8b5cf6" opacity=".4"/>
  <rect x="137" y="40" width="48" height="140" fill="#f59e0b" opacity=".35"/>
  <rect x="197" y="40" width="143" height="140" fill="#3b82f6" opacity=".3"/>
  <path d="M30 173 L42 152 L54 121 L66 90 L78 67 L90 54 L102 50 L113 52 L125 59 L137 67 L149 77 L161 87 L173 96 L185 105 L197 113 L209 120 L221 127 L233 132 L245 137 L257 142 L268 146 L280 149 L292 152 L304 155 L316 158 L328 160 L340 162" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="30" y1="180" x2="340" y2="180" class="ax"/>
  <line x1="30" y1="40" x2="30" y2="180" class="ax"/>
  <text x="30" y="194" text-anchor="middle" class="s">4</text>
  <text x="78" y="194" text-anchor="middle" class="s">8</text>
  <text x="126" y="194" text-anchor="middle" class="s">12</text>
  <text x="173" y="194" text-anchor="middle" class="s">16</text>
  <text x="221" y="194" text-anchor="middle" class="s">20</text>
  <text x="280" y="194" text-anchor="middle" class="s">25</text>
  <text x="340" y="194" text-anchor="middle" class="s">30 µm</text>
  <text x="185" y="208" text-anchor="middle" class="s">${L('wavelength', 'panjang gelombang')}</text>
  <text x="26" y="110" text-anchor="middle" class="s" transform="rotate(-90 26 110)">${L('emitted power', 'daya pancar')}</text>
  <text x="60" y="30" text-anchor="middle" fill="#3b82f6" class="s">H₂O ${L('6.3', '6,3')}</text>
  <text x="84" y="18" text-anchor="middle" fill="#10b981" class="s">CH₄ N₂O ${L('7.7', '7,7')}</text>
  <text x="98" y="30" text-anchor="middle" fill="#8b5cf6" class="s">O₃ ${L('9.6', '9,6')}</text>
  <text x="161" y="30" text-anchor="middle" fill="#f59e0b" class="s">CO₂ 15</text>
  <text x="268" y="30" text-anchor="middle" fill="#3b82f6" class="s">H₂O ${L('rotation band', 'pita rotasi')}</text>
  <line x1="80" y1="160" x2="125" y2="160" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="102" y="152" text-anchor="middle" class="s">${L('window', 'jendela')}</text>
  <text x="102" y="172" text-anchor="middle" class="s">8–12 µm</text>
  <text x="185" y="228" text-anchor="middle" class="s">${L('shaded = absorbed by the atmosphere; unshaded = escapes to space', 'berwarna = diserap atmosfer; tanpa warna = lolos ke angkasa')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Earth radiates thermal infrared peaking near 10 µm, far from the visible light it receives from the Sun.',
        'Greenhouse gases absorb only at specific wavelengths set by their molecular vibrations; N₂ and O₂ do not absorb in the thermal infrared.',
        'Water vapour is the biggest absorber overall, but CO₂ owns the 15 µm band next to the peak of Earth\'s emission.',
        'The 8–12 µm atmospheric window lets most surface radiation escape directly to space.',
        'Because band centres are saturated, the forcing from CO₂ grows with the logarithm of its concentration, about 3.7 W/m² per doubling.',
      ],
      id: [
        'Bumi memancarkan inframerah termal dengan puncak dekat 10 µm, jauh dari cahaya tampak yang diterimanya dari Matahari.',
        'Gas rumah kaca hanya menyerap pada panjang gelombang tertentu yang ditentukan getaran molekulnya; N₂ dan O₂ tidak menyerap inframerah termal.',
        'Uap air adalah penyerap terbesar secara keseluruhan, tetapi CO₂ menguasai pita 15 µm di sebelah puncak pancaran Bumi.',
        'Jendela atmosfer 8–12 µm meloloskan sebagian besar radiasi permukaan langsung ke angkasa.',
        'Karena pusat pita sudah jenuh, paksaan dari CO₂ tumbuh mengikuti logaritma konsentrasinya, sekitar 3,7 W/m² per penggandaan.',
      ],
    },
    vocabulary: {
      en: [
        ['Blackbody (Planck) curve', 'The spectrum of radiation emitted by an ideal object at a given temperature; its peak wavelength shortens as temperature rises.'],
        ['Wien\'s law', 'λ_max = 2898 µm·K / T: the wavelength of peak emission for a body at temperature T.'],
        ['Absorption band', 'A range of wavelengths over which a gas absorbs radiation, caused by the vibrations and rotations of its molecules.'],
        ['Atmospheric window', 'The 8–12 µm region where the atmosphere is nearly transparent to infrared, letting surface radiation escape to space.'],
        ['Optical depth (τ)', 'A measure of how opaque a layer is; transmission is exp(−τ), so τ = 1 lets about 37% through.'],
        ['Saturation', 'The state of a band whose centre already absorbs nearly everything, so adding more gas only widens the band\'s edges.'],
        ['Radiative forcing', 'The change in Earth\'s energy balance, in W/m², caused by a change in greenhouse gases or other factors.'],
      ],
      id: [
        ['Kurva benda hitam (Planck)', 'Spektrum radiasi yang dipancarkan benda ideal pada suhu tertentu; panjang gelombang puncaknya memendek saat suhu naik.'],
        ['Hukum Wien', 'λ_maks = 2898 µm·K / T: panjang gelombang pancaran puncak untuk benda bersuhu T.'],
        ['Pita serapan', 'Rentang panjang gelombang tempat suatu gas menyerap radiasi, disebabkan getaran dan rotasi molekulnya.'],
        ['Jendela atmosfer', 'Wilayah 8–12 µm tempat atmosfer hampir tembus terhadap inframerah, sehingga radiasi permukaan lolos ke angkasa.'],
        ['Kedalaman optik (τ)', 'Ukuran seberapa buram suatu lapisan; transmisinya exp(−τ), sehingga τ = 1 meloloskan sekitar 37%.'],
        ['Kejenuhan', 'Keadaan pita yang pusatnya sudah menyerap hampir semuanya, sehingga menambah gas hanya melebarkan tepi pita.'],
        ['Paksaan radiatif', 'Perubahan keseimbangan energi Bumi, dalam W/m², akibat perubahan gas rumah kaca atau faktor lain.'],
      ],
    },
    misconceptions: {
      en: [
        ['Greenhouse gases trap the Sun\'s light.', 'They are nearly transparent to sunlight. They absorb the infrared that Earth\'s surface emits after it has been warmed by the Sun, which is radiation at much longer wavelengths.'],
        ['CO₂ is only 0.04% of the air, so it cannot matter.', 'What matters is how much infrared a gas absorbs, not its share of molecules. N₂ and O₂, 99% of the air, absorb none of the thermal infrared, while CO₂ absorbs almost everything in its 15 µm band right beside Earth\'s emission peak.'],
        ['The 15 µm band is saturated, so more CO₂ cannot warm the planet further.', 'The centre is saturated, but the edges of the band are not, and emission to space comes from high, cold layers where CO₂ is far from saturated. The effect is weaker than linear, which is why it is logarithmic, but it is not zero.'],
        ['Water vapour is the main greenhouse gas, so human CO₂ is irrelevant.', 'Water vapour is the largest absorber, but its amount is set by temperature: it rains out within days. CO₂ stays for centuries and sets the baseline; warming from CO₂ then adds more water vapour, amplifying the effect.'],
      ],
      id: [
        ['Gas rumah kaca menjebak cahaya Matahari.', 'Gas-gas itu hampir tembus terhadap cahaya matahari. Mereka menyerap inframerah yang dipancarkan permukaan Bumi setelah dihangatkan Matahari, yaitu radiasi dengan panjang gelombang yang jauh lebih panjang.'],
        ['CO₂ hanya 0,04% dari udara, jadi tidak mungkin berpengaruh.', 'Yang penting adalah seberapa banyak inframerah yang diserap suatu gas, bukan bagiannya dalam jumlah molekul. N₂ dan O₂, 99% udara, sama sekali tidak menyerap inframerah termal, sementara CO₂ menyerap hampir semuanya di pita 15 µm tepat di sebelah puncak pancaran Bumi.'],
        ['Pita 15 µm sudah jenuh, jadi CO₂ tambahan tidak bisa menghangatkan planet lebih jauh.', 'Pusatnya memang jenuh, tetapi tepi pitanya tidak, dan pancaran ke angkasa berasal dari lapisan tinggi yang dingin tempat CO₂ jauh dari jenuh. Efeknya lebih lemah daripada linear, itulah sebabnya logaritmik, tetapi tidak nol.'],
        ['Uap air adalah gas rumah kaca utama, jadi CO₂ dari manusia tidak relevan.', 'Uap air memang penyerap terbesar, tetapi jumlahnya ditentukan suhu: ia turun sebagai hujan dalam hitungan hari. CO₂ bertahan berabad-abad dan menentukan garis dasarnya; pemanasan dari CO₂ lalu menambah uap air, memperkuat efeknya.'],
      ],
    },
    realWorld: {
      en: [
        'Satellite instruments such as IRIS on Nimbus 4 (1970) and later AIRS and IASI measure Earth\'s outgoing infrared spectrum and show exactly the CO₂ bite at 15 µm and the ozone dip at 9.6 µm sketched here.',
        'Thermal-imaging cameras work in the 8–14 µm window because that is where the air is transparent enough to see warm objects at a distance.',
        'Venus has an atmosphere almost entirely of CO₂ at 90 times Earth\'s surface pressure; its bands are so broadened that almost no window remains, giving a surface temperature near 460 °C.',
        'Radiative-transfer codes built on these band physics are used in weather forecasting every day, which is one reason the greenhouse effect is among the best-tested parts of climate science.',
      ],
      id: [
        'Instrumen satelit seperti IRIS di Nimbus 4 (1970) dan kemudian AIRS dan IASI mengukur spektrum inframerah keluar Bumi dan menunjukkan persis gigitan CO₂ di 15 µm dan lekukan ozon di 9,6 µm seperti yang disketsakan di sini.',
        'Kamera pencitra termal bekerja di jendela 8–14 µm karena di situlah udara cukup tembus untuk melihat benda hangat dari jauh.',
        'Venus beratmosfer hampir seluruhnya CO₂ dengan tekanan permukaan 90 kali Bumi; pita-pitanya begitu melebar sehingga hampir tidak ada jendela tersisa, menghasilkan suhu permukaan sekitar 460 °C.',
        'Kode transfer radiasi yang dibangun dari fisika pita ini dipakai dalam prakiraan cuaca setiap hari, salah satu alasan efek rumah kaca termasuk bagian ilmu iklim yang paling teruji.',
      ],
    },
    questions: {
      en: [
        { q: 'Use Wien\'s law to find the peak emission wavelength of Earth\'s surface at 288 K and of the Sun at 5800 K. Why does this explain why the atmosphere is transparent to one and not the other?', a: 'Earth: 2898/288 ≈ 10 µm (thermal infrared). Sun: 2898/5800 ≈ 0.5 µm (visible). Greenhouse-gas bands lie in the infrared, so sunlight passes through almost untouched while Earth\'s emission is partly absorbed.' },
        { q: 'In the sim, set every gas off except CO₂, then raise the CO₂ amount from 1 to 2. Which parts of the 15 µm band change and which do not? Relate this to the logarithmic forcing law.', a: 'The centre, already at 100% absorption, cannot change; only the edges of the band darken. Because each doubling adds about the same extra width at the edges, forcing grows as roughly 5.35·ln(C/C₀), about 3.7 W/m² per doubling.' },
        { q: 'Why is the 9.6 µm ozone band climatically important even though it is narrow?', a: 'It sits in the middle of the 8–12 µm window, close to the peak of Earth\'s emission, where otherwise radiation escapes freely. Absorbing there removes energy from the most intense part of the spectrum, so a narrow band has a disproportionate effect.' },
      ],
      id: [
        { q: 'Gunakan hukum Wien untuk mencari panjang gelombang pancaran puncak permukaan Bumi pada 288 K dan Matahari pada 5800 K. Mengapa ini menjelaskan atmosfer tembus terhadap yang satu tetapi tidak terhadap yang lain?', a: 'Bumi: 2898/288 ≈ 10 µm (inframerah termal). Matahari: 2898/5800 ≈ 0,5 µm (tampak). Pita gas rumah kaca berada di inframerah, sehingga cahaya matahari lewat hampir tanpa gangguan sementara pancaran Bumi sebagian diserap.' },
        { q: 'Dalam simulasi, matikan semua gas kecuali CO₂, lalu naikkan jumlah CO₂ dari 1 ke 2. Bagian mana dari pita 15 µm yang berubah dan mana yang tidak? Hubungkan dengan hukum paksaan logaritmik.', a: 'Pusat pita, yang sudah 100% serapan, tidak bisa berubah; hanya tepi pita yang menggelap. Karena tiap penggandaan menambah lebar tepi yang kira-kira sama, paksaan tumbuh sebagai sekitar 5,35·ln(C/C₀), kira-kira 3,7 W/m² per penggandaan.' },
        { q: 'Mengapa pita ozon 9,6 µm penting bagi iklim meskipun sempit?', a: 'Pita itu berada di tengah jendela 8–12 µm, dekat puncak pancaran Bumi, tempat radiasi biasanya lolos bebas. Menyerap di sana mengambil energi dari bagian spektrum yang paling kuat, sehingga pita yang sempit punya efek yang tidak sebanding dengan lebarnya.' },
      ],
    },
  },
};
