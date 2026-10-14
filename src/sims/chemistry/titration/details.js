// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the equivalence point on a titration curve.',
      'Distinguish strong-acid vs weak-acid curve shapes.',
      'Choose an indicator whose pH range matches the equivalence point.',
    ],
    id: [
      'Mengenali titik ekuivalen pada kurva titrasi.',
      'Membedakan bentuk kurva asam kuat vs asam lemah.',
      'Memilih indikator yang rentang pH-nya cocok dengan titik ekuivalen.',
    ],
  },
  tryThis: {
    en: [
      'Titrate a weak acid (Ka small) — find the half-equivalence buffering plateau.',
      'Compare phenolphthalein and methyl orange on the same titration.',
      'Add titrant slowly near the equivalence point — what jumps?',
    ],
    id: [
      'Titrasi asam lemah (Ka kecil) — cari plato buffer di setengah-ekuivalen.',
      'Bandingkan fenolftalein dan metil oranye pada titrasi yang sama.',
      'Tambahkan titran perlahan dekat titik ekuivalen — apa yang melonjak?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A titration is a way of measuring how much acid is in a solution by neutralising it with a base of known concentration. The base (the titrant, here NaOH) is added from a burette into the flask of acid (the analyte) while the pH is followed. H⁺ from the acid and OH⁻ from the base combine to form water, so each millilitre of base removes a known number of moles of acid. The equivalence point is the moment when the moles of base added exactly equal the moles of acid that were present: V_eq = Ca·Va / Cb.',
        'The simulation calculates the pH from the moles in the flask at each volume. For a strong acid, the acid is fully dissociated, so before equivalence the pH comes from the H⁺ left over and after equivalence from the OH⁻ in excess; at equivalence only water and a neutral salt remain, so pH = 7 (at 25 °C). For a weak acid the sim solves the full acid–base equilibrium from Ka: the starting pH follows from Ka and the concentration, the middle of the curve is a buffer where pH = pKa + log([A⁻]/[HA]) (Henderson–Hasselbalch), and at equivalence the conjugate base A⁻ reacts slightly with water to make OH⁻, so the equivalence pH is above 7.',
        'The acid and base concentrations and the acid volume set where the equivalence point sits along the volume axis, but not the shape of the curve. The Ka slider matters only for the weak acid: a smaller Ka (larger pKa) lifts the whole buffer plateau and the equivalence pH. At half-equivalence [A⁻] = [HA], so the pH there equals the pKa, which is how chemists measure Ka in the lab. The indicator menu paints the pH range over which that dye changes colour as a band on the graph; a good indicator has its band inside the steep vertical part of the curve, so one drop makes it flip.',
        'The model is simplified. It assumes 25 °C (Kw = 1.0 × 10⁻¹⁴), a monoprotic acid, and ideal behaviour. Real titrations are also affected by dissolved CO₂, the temperature of the room, and how well the flask is mixed. The pH you see jumps by several units within a few tenths of a millilitre near equivalence, which is why real titrations are finished drop by drop.',
      ],
      id: [
        'Titrasi adalah cara mengukur banyaknya asam dalam suatu larutan dengan menetralkannya memakai basa yang konsentrasinya diketahui. Basa (titran, di sini NaOH) ditambahkan dari buret ke dalam labu berisi asam (analit) sambil pH-nya dipantau. H⁺ dari asam dan OH⁻ dari basa bergabung membentuk air, sehingga setiap mililiter basa menghabiskan sejumlah mol asam yang pasti. Titik ekuivalen adalah saat mol basa yang ditambahkan tepat sama dengan mol asam semula: V_ek = Ca·Va / Cb.',
        'Simulasi ini menghitung pH dari jumlah mol di dalam labu pada setiap volume. Untuk asam kuat, asam terionisasi sempurna, sehingga sebelum ekuivalen pH ditentukan oleh sisa H⁺ dan setelah ekuivalen oleh kelebihan OH⁻; pada titik ekuivalen hanya ada air dan garam netral, jadi pH = 7 (pada 25 °C). Untuk asam lemah simulasi menyelesaikan kesetimbangan asam–basa secara lengkap dari Ka: pH awal dihitung dari Ka dan konsentrasi, bagian tengah kurva adalah daerah penyangga dengan pH = pKa + log([A⁻]/[HA]) (Henderson–Hasselbalch), dan pada titik ekuivalen basa konjugat A⁻ bereaksi sedikit dengan air menghasilkan OH⁻, sehingga pH ekuivalennya di atas 7.',
        'Konsentrasi asam dan basa serta volume asam menentukan letak titik ekuivalen pada sumbu volume, tetapi tidak mengubah bentuk kurva. Slider Ka hanya berpengaruh pada asam lemah: Ka yang lebih kecil (pKa lebih besar) mengangkat seluruh plato penyangga dan pH ekuivalen. Pada setengah ekuivalen [A⁻] = [HA], sehingga pH di titik itu sama dengan pKa; inilah cara kimiawan mengukur Ka di laboratorium. Menu indikator melukis rentang pH tempat zat warna itu berubah warna sebagai pita pada grafik; indikator yang baik pitanya berada di bagian kurva yang curam, sehingga satu tetes saja sudah membalik warnanya.',
        'Modelnya disederhanakan. Simulasi mengasumsikan suhu 25 °C (Kw = 1,0 × 10⁻¹⁴), asam monoprotik, dan perilaku ideal. Titrasi sungguhan juga dipengaruhi CO₂ terlarut, suhu ruangan, dan seberapa baik labu diaduk. pH yang kamu lihat melonjak beberapa satuan hanya dalam beberapa persepuluh mililiter di dekat ekuivalen; itulah sebabnya titrasi sungguhan diselesaikan tetes demi tetes.',
      ],
    },
    figure: {
      caption: {
        en: 'Titration of 25 mL of 0.10 M acid with 0.10 M NaOH. Both curves reach equivalence at 25 mL, but the weak acid starts higher, has a buffer plateau where pH = pKa at half-equivalence, and its equivalence pH is above 7. The amber band is the colour-change range of phenolphthalein.',
        id: 'Titrasi 25 mL asam 0,10 M dengan NaOH 0,10 M. Kedua kurva mencapai ekuivalen pada 25 mL, tetapi asam lemah mulai lebih tinggi, memiliki plato penyangga dengan pH = pKa di setengah ekuivalen, dan pH ekuivalennya di atas 7. Pita jingga adalah rentang perubahan warna fenolftalein.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Titration curves for a strong and a weak acid', 'Kurva titrasi asam kuat dan asam lemah')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{stroke:currentColor;stroke-width:.6;opacity:.3}.c{fill:none;stroke-width:2.4}</style>
  <rect x="50" y="71" width="290" height="23" fill="#f59e0b" opacity=".25"/>
  <text x="246" y="88" fill="#f59e0b">${L('phenolphthalein 8.2–10', 'fenolftalein 8,2–10')}</text>
  <line x1="50" y1="110" x2="340" y2="110" class="g" stroke-dasharray="3 3"/>
  <text x="325" y="106" opacity=".7">pH 7</text>
  <path d="M50 187 L108 182 L166 175 L189 165 L194 152 L195 110 L196 68 L201 55 L224 46 L282 41 L340 39" class="c" stroke="#3b82f6"/>
  <path d="M50 163 L79 147 L122 139 L166 131 L189 121 L194 108 L195 88 L196 68 L201 55" class="c" stroke="#10b981"/>
  <circle cx="195" cy="110" r="4" fill="#ef4444"/>
  <circle cx="195" cy="88" r="4" fill="#ef4444"/>
  <text x="203" y="118" fill="#ef4444">${L('equivalence (strong) pH 7', 'ekuivalen (kuat) pH 7')}</text>
  <text x="203" y="33" fill="#ef4444">${L('equivalence (weak) pH ≈ 8.7', 'ekuivalen (lemah) pH ≈ 8,7')}</text>
  <line x1="203" y1="36" x2="197" y2="85" stroke="#ef4444" stroke-width=".8"/>
  <circle cx="122" cy="139" r="3.5" fill="#10b981"/>
  <text x="56" y="128" fill="#10b981">${L('half-equivalence: pH = pKa', 'setengah ekuivalen: pH = pKa')}</text>
  <text x="60" y="178" fill="#3b82f6">${L('strong acid', 'asam kuat')}</text>
  <text x="60" y="155" fill="#10b981">${L('weak acid', 'asam lemah')}</text>
  <line x1="50" y1="20" x2="50" y2="200" class="ax"/>
  <line x1="50" y1="200" x2="340" y2="200" class="ax"/>
  <text x="30" y="24">14</text><text x="36" y="113">7</text><text x="36" y="203">0</text>
  <text x="18" y="112" transform="rotate(-90 18 112)" text-anchor="middle">pH</text>
  <text x="47" y="214">0</text><text x="185" y="214">25</text><text x="330" y="214">50</text>
  <text x="195" y="230" text-anchor="middle">${L('volume of NaOH added (mL)', 'volume NaOH yang ditambahkan (mL)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The equivalence volume depends only on the moles of acid and the base concentration: V_eq = Ca·Va / Cb, and is the same for a strong or a weak acid.',
        'A strong acid titrated with a strong base has its equivalence point at pH 7; a weak acid has it above 7 because its conjugate base is slightly basic.',
        'A weak acid shows a buffer plateau, and at half-equivalence the pH equals its pKa.',
        'Near equivalence the pH jumps by several units for a fraction of a millilitre, which is where the indicator should change colour.',
        'An indicator is itself a weak acid whose two forms have different colours; it changes over a pH range of about two units, not at one exact pH.',
      ],
      id: [
        'Volume ekuivalen hanya bergantung pada mol asam dan konsentrasi basa: V_ek = Ca·Va / Cb, dan sama untuk asam kuat maupun lemah.',
        'Asam kuat yang dititrasi dengan basa kuat memiliki titik ekuivalen pada pH 7; asam lemah titik ekuivalennya di atas 7 karena basa konjugatnya sedikit bersifat basa.',
        'Asam lemah menunjukkan plato penyangga, dan pada setengah ekuivalen pH-nya sama dengan pKa.',
        'Di dekat ekuivalen pH melonjak beberapa satuan hanya dalam sepersekian mililiter; di situlah indikator seharusnya berubah warna.',
        'Indikator sendiri adalah asam lemah yang dua bentuknya berbeda warna; ia berubah dalam rentang pH sekitar dua satuan, bukan pada satu pH tepat.',
      ],
    },
    vocabulary: {
      en: [
        ['Titrant', 'The solution of known concentration added from the burette (here NaOH).'],
        ['Analyte', 'The solution being analysed, in the flask (here the acid).'],
        ['Equivalence point', 'The volume at which moles of added base equal the moles of acid originally present.'],
        ['End point', 'The volume at which the indicator visibly changes colour; a good indicator makes this coincide with the equivalence point.'],
        ['Ka and pKa', 'The acid dissociation constant and its negative logarithm; a smaller Ka (larger pKa) means a weaker acid.'],
        ['Buffer region', 'The part of a weak-acid curve where HA and A⁻ are both present and the pH changes only slowly.'],
        ['Half-equivalence point', 'Where half the acid has been neutralised, so [HA] = [A⁻] and pH = pKa.'],
        ['Indicator', 'A dye whose colour depends on pH; each has its own transition range, such as 8.2–10.0 for phenolphthalein.'],
      ],
      id: [
        ['Titran', 'Larutan berkonsentrasi diketahui yang ditambahkan dari buret (di sini NaOH).'],
        ['Analit', 'Larutan yang dianalisis, berada di dalam labu (di sini asam).'],
        ['Titik ekuivalen', 'Volume saat mol basa yang ditambahkan sama dengan mol asam semula.'],
        ['Titik akhir', 'Volume saat indikator terlihat berubah warna; indikator yang baik membuat titik ini berimpit dengan titik ekuivalen.'],
        ['Ka dan pKa', 'Tetapan ionisasi asam dan negatif logaritmanya; Ka lebih kecil (pKa lebih besar) berarti asam lebih lemah.'],
        ['Daerah penyangga', 'Bagian kurva asam lemah ketika HA dan A⁻ sama-sama ada sehingga pH berubah sangat lambat.'],
        ['Titik setengah ekuivalen', 'Saat separuh asam telah dinetralkan, sehingga [HA] = [A⁻] dan pH = pKa.'],
        ['Indikator', 'Zat warna yang warnanya bergantung pada pH; masing-masing punya rentang perubahan sendiri, misalnya 8,2–10,0 untuk fenolftalein.'],
      ],
    },
    misconceptions: {
      en: [
        ['The equivalence point is always at pH 7.', 'Only for a strong acid with a strong base. For a weak acid the salt formed (such as acetate) is slightly basic, so the equivalence pH is above 7; the simulation gives about 8.7 for acetic acid.'],
        ['A weak acid needs less base to neutralise than a strong acid of the same concentration.', 'It needs exactly the same volume. Weak means few molecules are dissociated at any moment, not that there are fewer molecules; as OH⁻ removes H⁺, more HA dissociates until all of it has reacted.'],
        ['The indicator changes colour exactly at the equivalence point.', 'It changes over its own pH range, which has nothing to do with the acid in the flask. Methyl orange (3.1–4.4) would change far too early in a weak-acid titration, inside the buffer region.'],
        ['pH rises steadily as base is added.', 'Most of the added base barely moves the pH; then within a few tenths of a millilitre the pH jumps by 5 or 6 units. That is why the curve is S-shaped and why the last drops matter.'],
      ],
      id: [
        ['Titik ekuivalen selalu berada pada pH 7.', 'Hanya untuk asam kuat dengan basa kuat. Untuk asam lemah, garam yang terbentuk (misalnya asetat) sedikit bersifat basa, sehingga pH ekuivalen di atas 7; simulasi memberi sekitar 8,7 untuk asam asetat.'],
        ['Asam lemah membutuhkan basa lebih sedikit daripada asam kuat dengan konsentrasi sama.', 'Volumenya tepat sama. Lemah berarti hanya sedikit molekul yang terionisasi pada suatu saat, bukan jumlah molekulnya lebih sedikit; saat OH⁻ menghabiskan H⁺, lebih banyak HA terionisasi sampai semuanya bereaksi.'],
        ['Indikator berubah warna tepat pada titik ekuivalen.', 'Indikator berubah dalam rentang pH-nya sendiri, yang tidak berkaitan dengan asam di labu. Metil oranye (3,1–4,4) akan berubah terlalu awal pada titrasi asam lemah, masih di daerah penyangga.'],
        ['pH naik secara merata saat basa ditambahkan.', 'Sebagian besar basa yang ditambahkan hampir tidak menggeser pH; lalu dalam beberapa persepuluh mililiter pH melonjak 5 atau 6 satuan. Itulah sebabnya kurvanya berbentuk S dan tetes-tetes terakhir sangat menentukan.'],
      ],
    },
    realWorld: {
      en: [
        'Food laboratories titrate vinegar with NaOH to check that it contains the acetic acid content stated on the label (typically 4–5%).',
        'Water-quality technicians titrate samples to measure alkalinity and hardness, which decide how a treatment plant doses chemicals.',
        'Pharmacists and quality-control chemists titrate aspirin and other acidic drugs to confirm the dose in each tablet.',
        'Measuring the pH at half-equivalence is the standard laboratory method for finding the pKa of a new compound.',
      ],
      id: [
        'Laboratorium pangan menitrasi cuka dengan NaOH untuk memastikan kadar asam asetatnya sesuai label (biasanya 4–5%).',
        'Teknisi kualitas air menitrasi sampel untuk mengukur alkalinitas dan kesadahan, yang menentukan takaran bahan kimia di instalasi pengolahan.',
        'Apoteker dan kimiawan kendali mutu menitrasi aspirin dan obat asam lainnya untuk memastikan dosis tiap tablet.',
        'Mengukur pH pada setengah ekuivalen adalah metode laboratorium baku untuk menentukan pKa senyawa baru.',
      ],
    },
    questions: {
      en: [
        { q: 'You titrate 20.0 mL of 0.150 M HCl with 0.100 M NaOH. At what volume is the equivalence point?', a: 'Moles of acid = 0.0200 L × 0.150 M = 3.00 × 10⁻³ mol. The same number of moles of NaOH is needed: V = 3.00 × 10⁻³ mol / 0.100 M = 0.0300 L = 30.0 mL.' },
        { q: 'Why is the equivalence pH of a weak acid above 7, even though all the acid has been neutralised?', a: 'At equivalence the flask contains the conjugate base A⁻. It is a weak base and reacts a little with water (A⁻ + H₂O ⇌ HA + OH⁻), producing OH⁻. The smaller the Ka of the acid, the stronger its conjugate base and the higher the equivalence pH.' },
        { q: 'For the weak acid with Ka = 1.8 × 10⁻⁵, which indicator in the sim is suitable and which is not? Explain using the curve.', a: 'Phenolphthalein (8.2–10.0) is suitable: its band lies inside the steep jump around equivalence, so it flips within a drop. Methyl orange (3.1–4.4) is not: pH 3–4 is reached while the solution is still a buffer, several millilitres before equivalence, so it would signal far too early. Bromothymol blue (6.0–7.6) is borderline here because the equivalence pH is about 8.7.' },
      ],
      id: [
        { q: 'Kamu menitrasi 20,0 mL HCl 0,150 M dengan NaOH 0,100 M. Pada volume berapa titik ekuivalennya?', a: 'Mol asam = 0,0200 L × 0,150 M = 3,00 × 10⁻³ mol. Dibutuhkan mol NaOH yang sama: V = 3,00 × 10⁻³ mol / 0,100 M = 0,0300 L = 30,0 mL.' },
        { q: 'Mengapa pH ekuivalen asam lemah berada di atas 7, padahal semua asam sudah dinetralkan?', a: 'Pada titik ekuivalen labu berisi basa konjugat A⁻. Ia basa lemah dan bereaksi sedikit dengan air (A⁻ + H₂O ⇌ HA + OH⁻) menghasilkan OH⁻. Semakin kecil Ka asamnya, semakin kuat basa konjugatnya dan semakin tinggi pH ekuivalennya.' },
        { q: 'Untuk asam lemah dengan Ka = 1,8 × 10⁻⁵, indikator mana di simulasi yang cocok dan mana yang tidak? Jelaskan dengan kurva.', a: 'Fenolftalein (8,2–10,0) cocok: pitanya berada di dalam lonjakan curam di sekitar ekuivalen, sehingga berubah dalam satu tetes. Metil oranye (3,1–4,4) tidak cocok: pH 3–4 sudah tercapai saat larutan masih berupa penyangga, beberapa mililiter sebelum ekuivalen, jadi sinyalnya terlalu awal. Bromotimol biru (6,0–7,6) kurang pas di sini karena pH ekuivalennya sekitar 8,7.' },
      ],
    },
  },
};
