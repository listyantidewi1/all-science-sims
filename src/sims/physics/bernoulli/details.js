// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply continuity: A₁v₁ = A₂v₂.',
      'Apply Bernoulli: P + ½ρv² + ρgh = constant.',
      'See the inverse relationship between fluid speed and pressure.',
    ],
    id: [
      'Menerapkan kontinuitas: A₁v₁ = A₂v₂.',
      'Menerapkan Bernoulli: P + ½ρv² + ρgh = konstan.',
      'Melihat hubungan terbalik antara kecepatan fluida dan tekanan.',
    ],
  },  tryThis: {
    en: [
      'Squeeze pipe to half — speed doubles, pressure drops by ~3× the kinetic energy density.',
      'Make pipe wider in the middle — speed drops, pressure rises.',
      'Tilt the pipe — gravity term changes the picture.',
    ],
    id: [
      'Sempitkan pipa setengah — kecepatan dua kali, tekanan turun ~3× kerapatan energi kinetik.',
      'Lebarkan pipa di tengah — kecepatan turun, tekanan naik.',
      'Miringkan pipa — gravitasi mengubah gambaran.',
    ],
  },

  // "Learn" section: the physics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Water flowing steadily through a pipe cannot pile up anywhere: whatever volume enters one end each second must leave the other end. If the pipe narrows, the same volume per second has to pass through a smaller opening, so the water must move faster. This is the continuity equation, A1·v1 = A2·v2, where A is the cross-sectional area and v the speed. Halve the area and the speed doubles; squeeze it to a quarter and the speed is four times higher.',
        'Speeding the water up takes a force, and in a horizontal pipe the only thing that can provide it is a difference in pressure. The water entering the narrow section is pushed from behind by higher pressure than it feels ahead of it, so the pressure must be lower where the flow is faster. Bernoulli\'s equation makes this exact for an ideal fluid: P + ½·ρ·v² + ρ·g·h is the same at every point along a streamline. For a horizontal pipe the height term does not change, so P1 + ½·ρ·v1² = P2 + ½·ρ·v2², and the pressure drop in the throat is ΔP = ½·ρ·(v2² − v1²). It is really conservation of energy per unit volume: pressure energy is traded for kinetic energy.',
        'The simulation is a Venturi tube: the ends have a fixed area A1 = 1 m² and the slider sets the throat area A2. You also set the inlet speed v1 and the inlet pressure P1, and the fluid is water with density 1000 kg/m³. The sim computes the speed everywhere from continuity and the pressure from Bernoulli, drawing moving particles that visibly speed up in the throat and three gauges whose size and reading shrink where the flow is fast. With A2 = 0.5 m² and v1 = 1 m/s, the throat speed is 2 m/s and the pressure falls by ½·1000·(4 − 1) = 1500 Pa, or 1.5 kPa; since the exit is as wide as the entrance, the pressure there recovers to P1.',
        'This is the idealized version. Real water has viscosity, so friction with the walls makes pressure fall steadily along any pipe and the exit pressure never fully recovers; the sim shows no such loss. It also assumes steady, smooth, incompressible flow with no turbulence, and the pipe is horizontal, so the ρ·g·h term never appears. At extreme settings, a very narrow throat with a fast inlet, the computed pressure can fall to zero or below, which no real liquid can do: the water would boil into vapour bubbles (cavitation) first. Treat such readings as a sign that the model has left its range of validity.',
      ],
      id: [
        'Air yang mengalir tunak melalui pipa tidak bisa menumpuk di mana pun: volume yang masuk di satu ujung tiap detik harus keluar di ujung lain. Jika pipa menyempit, volume per detik yang sama harus melewati bukaan yang lebih kecil, sehingga air harus bergerak lebih cepat. Inilah persamaan kontinuitas, A1·v1 = A2·v2, dengan A luas penampang dan v kelajuan. Bagi dua luasnya, kelajuan menjadi dua kali lipat; perkecil menjadi seperempat, kelajuan menjadi empat kali lipat.',
        'Mempercepat air membutuhkan gaya, dan dalam pipa mendatar satu-satunya yang bisa menyediakannya adalah perbedaan tekanan. Air yang memasuki bagian sempit didorong dari belakang oleh tekanan yang lebih besar daripada yang dirasakannya di depan, sehingga tekanan harus lebih rendah di tempat aliran lebih cepat. Persamaan Bernoulli menjadikan ini tepat untuk fluida ideal: P + ½·ρ·v² + ρ·g·h bernilai sama di setiap titik sepanjang garis arus. Untuk pipa mendatar suku ketinggian tidak berubah, sehingga P1 + ½·ρ·v1² = P2 + ½·ρ·v2², dan penurunan tekanan di bagian sempit adalah ΔP = ½·ρ·(v2² − v1²). Ini sebenarnya kekekalan energi per satuan volume: energi tekanan ditukar dengan energi kinetik.',
        'Simulasi ini adalah tabung Venturi: kedua ujungnya berluas tetap A1 = 1 m² dan slider mengatur luas leher A2. Kamu juga mengatur kelajuan masuk v1 dan tekanan masuk P1, dan fluidanya air dengan massa jenis 1000 kg/m³. Sim menghitung kelajuan di setiap titik dari kontinuitas dan tekanan dari Bernoulli, menggambar partikel bergerak yang tampak melaju di leher serta tiga pengukur yang ukuran dan angkanya mengecil di tempat aliran cepat. Dengan A2 = 0,5 m² dan v1 = 1 m/s, kelajuan di leher 2 m/s dan tekanan turun sebesar ½·1000·(4 − 1) = 1500 Pa, atau 1,5 kPa; karena bagian keluar selebar bagian masuk, tekanan di sana pulih ke P1.',
        'Ini adalah versi ideal. Air sungguhan memiliki viskositas, sehingga gesekan dengan dinding membuat tekanan turun terus sepanjang pipa dan tekanan keluar tidak pernah pulih sepenuhnya; sim tidak menunjukkan kehilangan seperti itu. Sim juga mengasumsikan aliran tunak, mulus, tak termampatkan, tanpa turbulensi, dan pipanya mendatar sehingga suku ρ·g·h tidak pernah muncul. Pada pengaturan ekstrem, leher sangat sempit dengan aliran masuk yang cepat, tekanan yang dihitung bisa jatuh ke nol atau negatif, yang tidak mungkin terjadi pada zat cair nyata: air akan lebih dulu mendidih menjadi gelembung uap (kavitasi). Anggap angka seperti itu sebagai tanda bahwa model sudah keluar dari rentang keberlakuannya.',
      ],
    },
    figure: {
      caption: {
        en: 'A Venturi tube with pressure taps. The water column in each standpipe shows the pressure: lower in the throat, where continuity forces the flow to speed up, and recovered at the wide exit in this ideal, frictionless model.',
        id: 'Tabung Venturi dengan keran tekanan. Kolom air di tiap pipa tegak menunjukkan tekanan: lebih rendah di leher, tempat kontinuitas memaksa aliran melaju, dan pulih di bagian keluar yang lebar pada model ideal tanpa gesekan ini.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Venturi tube with three pressure taps', 'Tabung Venturi dengan tiga keran tekanan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:currentColor;stroke-width:2}.fl{fill:#3b82f6;opacity:.35}.ar{stroke:#10b981;stroke-width:2.4;fill:none}.t{font-size:10px;opacity:.8}</style>
  <path d="M30 80 L120 80 L150 100 L210 100 L240 80 L330 80 L330 160 L240 160 L210 140 L150 140 L120 160 L30 160 Z" class="fl"/>
  <path d="M30 80 L120 80 L150 100 L210 100 L240 80 L330 80" class="w"/>
  <path d="M30 160 L120 160 L150 140 L210 140 L240 160 L330 160" class="w"/>
  <rect x="68" y="24" width="14" height="56" class="w"/>
  <rect x="173" y="24" width="14" height="76" class="w"/>
  <rect x="278" y="24" width="14" height="56" class="w"/>
  <rect x="68" y="40" width="14" height="40" class="fl"/>
  <rect x="173" y="72" width="14" height="28" class="fl"/>
  <rect x="278" y="40" width="14" height="40" class="fl"/>
  <line x1="60" y1="40" x2="300" y2="40" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>
  <text x="304" y="44" class="t">P1</text>
  <text x="192" y="76" class="t" fill="#ef4444">P2 ${L('lower', 'lebih rendah')}</text>
  <line x1="46" y1="120" x2="76" y2="120" class="ar" marker-end="url(#a)"/>
  <line x1="152" y1="120" x2="206" y2="120" class="ar" marker-end="url(#a)"/>
  <line x1="256" y1="120" x2="286" y2="120" class="ar" marker-end="url(#a)"/>
  <text x="60" y="176" text-anchor="middle" class="t">A1, v1</text>
  <text x="180" y="156" text-anchor="middle" class="t">A2, v2</text>
  <text x="300" y="176" text-anchor="middle" class="t">A1, v1</text>
  <text x="30" y="198" class="t">${L('continuity:', 'kontinuitas:')} A1·v1 = A2·v2  ${L('→ narrower means faster', '→ lebih sempit berarti lebih cepat')}</text>
  <text x="30" y="214" class="t">${L('Bernoulli (horizontal):', 'Bernoulli (mendatar):')} P1 + ½·ρ·v1² = P2 + ½·ρ·v2²</text>
  <text x="30" y="230" class="t">${L('faster flow, lower pressure: ΔP = ½·ρ·(v2² − v1²)', 'aliran lebih cepat, tekanan lebih rendah: ΔP = ½·ρ·(v2² − v1²)')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Continuity: for an incompressible fluid the volume flow rate A·v is the same everywhere along the pipe, so a narrower section means faster flow.',
        'Bernoulli: along a streamline of an ideal fluid, P + ½·ρ·v² + ρ·g·h is constant; it expresses conservation of energy per unit volume.',
        'In a horizontal pipe, faster flow means lower pressure: the pressure difference is what accelerates the fluid into the throat.',
        'Halving the area doubles the speed and quadruples the kinetic energy term, so the pressure drop grows with the square of the speed.',
        'The equation assumes steady, non-viscous, incompressible flow; real pipes always lose some pressure to friction.',
      ],
      id: [
        'Kontinuitas: untuk fluida tak termampatkan, debit A·v sama di setiap titik sepanjang pipa, sehingga bagian yang lebih sempit berarti aliran lebih cepat.',
        'Bernoulli: sepanjang garis arus fluida ideal, P + ½·ρ·v² + ρ·g·h bernilai tetap; ini menyatakan kekekalan energi per satuan volume.',
        'Dalam pipa mendatar, aliran lebih cepat berarti tekanan lebih rendah: perbedaan tekananlah yang mempercepat fluida memasuki leher.',
        'Membagi dua luas penampang menggandakan kelajuan dan melipatempatkan suku energi kinetik, sehingga penurunan tekanan bertambah sebanding dengan kuadrat kelajuan.',
        'Persamaan ini mengasumsikan aliran tunak, tak kental, dan tak termampatkan; pipa sungguhan selalu kehilangan sebagian tekanan karena gesekan.',
      ],
    },
    vocabulary: {
      en: [
        ['Volume flow rate', 'The volume of fluid passing a cross-section per second, equal to A·v; measured in m³/s.'],
        ['Continuity equation', 'A1·v1 = A2·v2: the flow rate is the same at every cross-section of a full pipe.'],
        ['Pressure (P)', 'Force per unit area exerted by the fluid, in pascals (Pa); 1 kPa = 1000 Pa.'],
        ['Dynamic pressure', 'The term ½·ρ·v², the kinetic energy of the fluid per unit volume.'],
        ['Streamline', 'The path a small parcel of fluid follows in steady flow; Bernoulli\'s equation holds along it.'],
        ['Venturi tube', 'A pipe with a smooth constriction, used to measure flow rate from the pressure drop in the throat.'],
        ['Ideal fluid', 'A fluid with no viscosity and constant density, which Bernoulli\'s equation assumes.'],
        ['Cavitation', 'The formation of vapour bubbles when a liquid\'s pressure falls to its vapour pressure, which the sim does not model.'],
      ],
      id: [
        ['Debit', 'Volume fluida yang melewati suatu penampang per detik, sama dengan A·v; diukur dalam m³/s.'],
        ['Persamaan kontinuitas', 'A1·v1 = A2·v2: debit sama di setiap penampang pipa yang terisi penuh.'],
        ['Tekanan (P)', 'Gaya per satuan luas yang diberikan fluida, dalam pascal (Pa); 1 kPa = 1000 Pa.'],
        ['Tekanan dinamis', 'Suku ½·ρ·v², energi kinetik fluida per satuan volume.'],
        ['Garis arus', 'Lintasan yang diikuti sebagian kecil fluida dalam aliran tunak; persamaan Bernoulli berlaku di sepanjangnya.'],
        ['Tabung Venturi', 'Pipa dengan penyempitan mulus, dipakai untuk mengukur debit dari penurunan tekanan di lehernya.'],
        ['Fluida ideal', 'Fluida tanpa viskositas dan dengan massa jenis tetap, seperti yang diasumsikan persamaan Bernoulli.'],
        ['Kavitasi', 'Terbentuknya gelembung uap ketika tekanan zat cair turun sampai tekanan uapnya; sim tidak memodelkannya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Squeezing the pipe raises the pressure in the narrow part, like pinching a hose.', 'Pinching a hose raises the pressure upstream of the pinch, but inside the fast-moving throat the pressure is lower. The sim\'s middle gauge always reads less than the end gauges.'],
        ['Fast-moving fluid "pushes harder", so its pressure must be higher.', 'Pressure is the force the fluid exerts sideways on the walls or a probe, not its momentum. In steady flow the fluid had to be pushed by higher pressure behind it to get fast, so fast flow goes with low pressure.'],
        ['Halving the area halves the pressure.', 'Halving the area doubles the speed; the pressure then drops by ½·ρ·(v2² − v1²), which depends on the speeds, not simply on the areas. With v1 = 1 m/s that is only 1.5 kPa out of 100 kPa.'],
        ['Bernoulli\'s equation works for any pipe flow.', 'It holds for ideal, steady, streamline flow. Viscous friction, turbulence and pumps or turbines in the line all break the simple constant, which is why engineers add loss terms.'],
      ],
      id: [
        ['Menyempitkan pipa menaikkan tekanan di bagian sempit, seperti menjepit selang.', 'Menjepit selang menaikkan tekanan di hulu jepitan, tetapi di dalam leher yang alirannya cepat tekanannya justru lebih rendah. Pengukur tengah di sim selalu menunjukkan nilai lebih kecil daripada pengukur di ujung.'],
        ['Fluida yang bergerak cepat "mendorong lebih keras", jadi tekanannya pasti lebih tinggi.', 'Tekanan adalah gaya yang diberikan fluida ke samping pada dinding atau alat ukur, bukan momentumnya. Dalam aliran tunak, fluida harus didorong oleh tekanan lebih tinggi di belakangnya agar menjadi cepat, sehingga aliran cepat berpasangan dengan tekanan rendah.'],
        ['Membagi dua luas penampang membagi dua tekanan.', 'Membagi dua luas menggandakan kelajuan; tekanan lalu turun sebesar ½·ρ·(v2² − v1²), yang bergantung pada kelajuan, bukan langsung pada luas. Dengan v1 = 1 m/s penurunannya hanya 1,5 kPa dari 100 kPa.'],
        ['Persamaan Bernoulli berlaku untuk semua aliran pipa.', 'Ia berlaku untuk aliran ideal, tunak, dan mengikuti garis arus. Gesekan kental, turbulensi, serta pompa atau turbin dalam saluran semuanya merusak nilai tetap yang sederhana itu; karena itulah insinyur menambahkan suku kehilangan.'],
      ],
    },
    realWorld: {
      en: [
        'Venturi flow meters in water mains and chemical plants measure flow rate from the pressure drop in a constriction, exactly as the sim\'s gauges do.',
        'A carburettor and a perfume atomizer use the low pressure in a fast air stream to draw liquid up a tube and mix it into the air.',
        'Aircraft wings and racing-car spoilers are shaped so that air moves at different speeds over their two surfaces, producing a pressure difference and therefore lift or downforce.',
        'A shower curtain drifts inward because the fast-moving air and water inside the shower lower the pressure there compared with the still air outside.',
      ],
      id: [
        'Pengukur aliran Venturi pada pipa air utama dan pabrik kimia mengukur debit dari penurunan tekanan di sebuah penyempitan, persis seperti pengukur di sim.',
        'Karburator dan penyemprot parfum memanfaatkan tekanan rendah dalam aliran udara cepat untuk menyedot cairan lewat pipa kecil dan mencampurnya ke udara.',
        'Sayap pesawat dan sayap mobil balap dibentuk agar udara bergerak dengan kelajuan berbeda di kedua permukaannya, menghasilkan perbedaan tekanan dan karenanya gaya angkat atau gaya tekan ke bawah.',
        'Tirai kamar mandi tertarik ke dalam karena udara dan air yang bergerak cepat di dalam pancuran menurunkan tekanan di sana dibandingkan udara diam di luar.',
      ],
    },
    questions: {
      en: [
        { q: 'With v1 = 1 m/s and P1 = 100 kPa, set A2 = 0.25 m². Predict the throat speed and pressure, then check the middle gauge.', a: 'Continuity: v2 = v1·A1/A2 = 1·1/0.25 = 4 m/s. Bernoulli: P2 = 100000 − ½·1000·(16 − 1) = 100000 − 7500 = 92.5 kPa.' },
        { q: 'Keep A2 = 0.5 m² and raise v1 from 1 to 2 m/s. By what factor does the pressure drop in the throat change?', a: 'At v1 = 1 m/s, v2 = 2 m/s and ΔP = 500·(4 − 1) = 1.5 kPa. At v1 = 2 m/s, v2 = 4 m/s and ΔP = 500·(16 − 4) = 6 kPa. Doubling the inlet speed quadruples the pressure drop, because both speeds double and the drop depends on their squares.' },
        { q: 'Why does the sim\'s exit gauge read the same as the inlet gauge, and why would a real pipe disagree?', a: 'The exit has the same area as the inlet, so continuity gives the same speed and Bernoulli gives the same pressure. A real fluid loses energy to viscous friction along the walls, so the exit pressure is lower than the inlet pressure; the sim ignores viscosity.' },
      ],
      id: [
        { q: 'Dengan v1 = 1 m/s dan P1 = 100 kPa, atur A2 = 0,25 m². Prediksi kelajuan dan tekanan di leher, lalu periksa pengukur tengah.', a: 'Kontinuitas: v2 = v1·A1/A2 = 1·1/0,25 = 4 m/s. Bernoulli: P2 = 100000 − ½·1000·(16 − 1) = 100000 − 7500 = 92,5 kPa.' },
        { q: 'Pertahankan A2 = 0,5 m² dan naikkan v1 dari 1 ke 2 m/s. Berapa kali lipat perubahan penurunan tekanan di leher?', a: 'Pada v1 = 1 m/s, v2 = 2 m/s dan ΔP = 500·(4 − 1) = 1,5 kPa. Pada v1 = 2 m/s, v2 = 4 m/s dan ΔP = 500·(16 − 4) = 6 kPa. Menggandakan kelajuan masuk melipatempatkan penurunan tekanan, karena kedua kelajuan menjadi dua kali lipat dan penurunannya bergantung pada kuadratnya.' },
        { q: 'Mengapa pengukur keluar di sim menunjukkan nilai yang sama dengan pengukur masuk, dan mengapa pipa sungguhan tidak demikian?', a: 'Bagian keluar berluas sama dengan bagian masuk, sehingga kontinuitas memberi kelajuan yang sama dan Bernoulli memberi tekanan yang sama. Fluida nyata kehilangan energi karena gesekan kental di sepanjang dinding, sehingga tekanan keluar lebih rendah dari tekanan masuk; sim mengabaikan viskositas.' },
      ],
    },
  },
};
