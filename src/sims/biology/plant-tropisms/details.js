// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain phototropism and gravitropism as differential growth caused by an uneven distribution of auxin (IAA) across the shoot or root.',
      'Interpret the growth-rate vs auxin concentration curves to explain why extra auxin makes shoot cells elongate faster but inhibits root cells, so shoots bend up and towards light while roots bend down.',
      'Design controlled experiments (tip removed, tip covered, chamber rotated) in the tradition of Darwin, Boysen-Jensen and Went, and measure bend angle as a quantitative response.',
    ],
    id: [
      'Menjelaskan fototropisme dan gravitropisme sebagai pertumbuhan diferensial yang disebabkan oleh distribusi auksin (IAA) yang tidak merata pada batang atau akar.',
      'Menafsirkan kurva laju tumbuh terhadap konsentrasi auksin untuk menjelaskan mengapa auksin tambahan membuat sel batang memanjang lebih cepat tetapi menghambat sel akar, sehingga batang membengkok ke atas dan ke arah cahaya sementara akar membengkok ke bawah.',
      'Merancang percobaan terkontrol (ujung dibuang, ujung ditutup, kotak diputar) mengikuti tradisi Darwin, Boysen-Jensen, dan Went, serta mengukur sudut bengkok sebagai respons kuantitatif.',
    ],
  },
  tryThis: {
    en: [
      'Drag the lamp to 90° (horizontal, on the right), press "Start 60 s trial" and read the bend angle at the end. Repeat at 60°, 30° and 0°. Plot bend angle against light angle.',
      'Set the tip to "removed" and repeat the 90° trial. Then set it to "covered". Which treatment abolishes phototropism, and which still allows gravitropism?',
      'Turn the lamp off and rotate the chamber to 90°. Which way do the shoot and the root bend, and which side of each organ shows the most auxin colour?',
      'Watch the two markers on the growth-rate curve while the lamp is at 90°. The shaded side of the shoot has more auxin: is its marker higher or lower on the curve than the lit side? Now check the root markers during a rotation trial.',
    ],
    id: [
      'Geser lampu ke 90° (mendatar, di kanan), tekan "Start 60 s trial" dan baca sudut bengkok di akhir. Ulangi pada 60°, 30°, dan 0°. Plot sudut bengkok terhadap sudut cahaya.',
      'Atur ujung ke "removed" (dibuang) dan ulangi percobaan 90°. Lalu atur ke "covered" (ditutup). Perlakuan mana yang meniadakan fototropisme, dan mana yang masih membolehkan gravitropisme?',
      'Matikan lampu dan putar kotak ke 90°. Ke arah mana batang dan akar membengkok, dan sisi mana dari tiap organ yang menunjukkan warna auksin paling banyak?',
      'Amati dua penanda pada kurva laju tumbuh saat lampu di 90°. Sisi teduh batang memiliki lebih banyak auksin: apakah penandanya lebih tinggi atau lebih rendah pada kurva daripada sisi yang disinari? Sekarang periksa penanda akar saat percobaan rotasi.',
    ],
  },

  learn: {
    background: {
      en: [
        'Plants cannot move from place to place, but they can grow in a chosen direction. A growth response to a directional stimulus is a tropism: positive if the organ grows towards the stimulus, negative if away. Shoots show positive phototropism (towards light) and negative gravitropism (away from gravity); roots show positive gravitropism and are usually indifferent or weakly negative to light. Bending is produced by differential growth: cells on one side of the organ elongate faster than cells on the other, so the longer side ends up on the outside of the curve.',
        'The signal is the hormone auxin, indole-3-acetic acid (IAA), made in the shoot tip and transported down the stem. In 1880 Charles Darwin showed that covering the tip of a grass seedling stopped it bending towards light although the tip itself does not bend. In 1913 Boysen-Jensen found the signal could pass through a gelatin block but not a mica barrier, so it was a diffusible chemical, and in 1926 Frits Went collected it in agar blocks and showed that placing a block on one side of a decapitated seedling made it bend the other way. In the simulation the shaded side of the shoot is drawn in magenta in proportion to its auxin level: with the lamp at 90° about 70 % of the auxin ends up on the shaded side, which then grows faster and swings the tip towards the lamp. Removing the tip removes the auxin source and the bending; covering the tip with an opaque cap stops phototropism but leaves gravitropism.',
        'Why does the same hormone make roots bend the opposite way? The answer is in the dose–response curve shown on the right of the sim. Shoot cells elongate fastest at roughly 10⁻⁶ to 10⁻⁵ mol/L IAA and are only inhibited above about 10⁻⁴. Root cells are far more sensitive: their optimum is near 10⁻¹⁰ mol/L and concentrations above 10⁻⁹ inhibit elongation. When a plant is laid on its side, starch-filled statoliths settle on the lower side of the cells and auxin is redirected there in both organs. In the shoot the lower side therefore grows faster and the tip curves upward; in the root the lower side is inhibited, the upper side outgrows it and the tip curves downward.',
        'Real bending takes hours (a maize coleoptile reaches about 30° after 2–3 hours in unilateral light), so one simulated second stands for roughly ten minutes. The chamber-rotation slider lets you compare phototropism and gravitropism directly, and when both act at once the shoot settles at a compromise angle between “up” and “towards the lamp”. The 60-second trial button standardises the measurement so you can plot bend angle against light angle, or against treatment, in the lab table.',
      ],
      id: [
        'Tumbuhan tidak dapat berpindah tempat, tetapi dapat tumbuh ke arah yang dipilih. Respons tumbuh terhadap rangsang berarah disebut tropisme: positif jika organ tumbuh menuju rangsang, negatif jika menjauh. Batang menunjukkan fototropisme positif (menuju cahaya) dan gravitropisme negatif (menjauhi gravitasi); akar menunjukkan gravitropisme positif dan biasanya acuh atau sedikit negatif terhadap cahaya. Pembengkokan dihasilkan oleh pertumbuhan diferensial: sel di satu sisi organ memanjang lebih cepat daripada sel di sisi lain, sehingga sisi yang lebih panjang berada di luar lengkungan.',
        'Sinyalnya adalah hormon auksin, asam indol-3-asetat (IAA), yang dibuat di ujung batang dan diangkut turun sepanjang batang. Pada 1880 Charles Darwin menunjukkan bahwa menutup ujung kecambah rumput menghentikan pembengkokan ke arah cahaya meskipun ujungnya sendiri tidak membengkok. Pada 1913 Boysen-Jensen menemukan sinyal dapat melewati blok gelatin tetapi tidak melewati penghalang mika, jadi sinyal itu zat kimia yang dapat berdifusi, dan pada 1926 Frits Went mengumpulkannya dalam blok agar dan menunjukkan bahwa menempelkan blok di satu sisi kecambah yang dipotong ujungnya membuatnya membengkok ke sisi lain. Dalam simulasi, sisi teduh batang digambar magenta sebanding dengan kadar auksinnya: dengan lampu di 90° sekitar 70 % auksin berakhir di sisi teduh, yang lalu tumbuh lebih cepat dan mengayunkan ujung menuju lampu. Membuang ujung menghilangkan sumber auksin dan pembengkokan; menutup ujung dengan tudung buram menghentikan fototropisme tetapi menyisakan gravitropisme.',
        'Mengapa hormon yang sama membuat akar membengkok ke arah berlawanan? Jawabannya ada pada kurva dosis–respons di sisi kanan simulasi. Sel batang memanjang paling cepat pada kira-kira 10⁻⁶ sampai 10⁻⁵ mol/L IAA dan baru terhambat di atas sekitar 10⁻⁴. Sel akar jauh lebih peka: optimumnya dekat 10⁻¹⁰ mol/L dan konsentrasi di atas 10⁻⁹ menghambat pemanjangan. Ketika tumbuhan direbahkan, statolit berisi pati mengendap di sisi bawah sel dan auksin dialihkan ke sana pada kedua organ. Pada batang sisi bawah karenanya tumbuh lebih cepat dan ujung melengkung ke atas; pada akar sisi bawah terhambat, sisi atas tumbuh melebihinya dan ujung melengkung ke bawah.',
        'Pembengkokan nyata memakan waktu berjam-jam (koleoptil jagung mencapai sekitar 30° setelah 2–3 jam dalam cahaya satu sisi), jadi satu detik simulasi mewakili kira-kira sepuluh menit. Penggeser rotasi kotak memungkinkanmu membandingkan fototropisme dan gravitropisme secara langsung, dan ketika keduanya bekerja bersamaan batang menetap pada sudut kompromi antara “ke atas” dan “menuju lampu”. Tombol percobaan 60 detik membakukan pengukuran sehingga kamu dapat memplot sudut bengkok terhadap sudut cahaya, atau terhadap perlakuan, dalam tabel lab.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: unilateral light moves auxin (magenta) to the shaded side of the shoot tip; that side elongates more and the shoot bends towards the lamp. Centre: a seedling laid on its side; auxin collects on the lower side of both organs, so the shoot (stimulated) bends up and the root (inhibited) bends down. Right: growth rate against log auxin concentration; shoots peak near 10⁻⁶–10⁻⁵ mol/L, roots near 10⁻¹⁰ and are inhibited above 10⁻⁹.',
        id: 'Kiri: cahaya satu sisi memindahkan auksin (magenta) ke sisi teduh ujung batang; sisi itu memanjang lebih banyak dan batang membengkok menuju lampu. Tengah: kecambah yang direbahkan; auksin terkumpul di sisi bawah kedua organ, sehingga batang (dirangsang) membengkok ke atas dan akar (dihambat) membengkok ke bawah. Kanan: laju tumbuh terhadap log konsentrasi auksin; batang puncak dekat 10⁻⁶–10⁻⁵ mol/L, akar dekat 10⁻¹⁰ dan terhambat di atas 10⁻⁹.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // dose-response curves, x: log10 M from -12 to -3 mapped to 220..350, y: growth -0.3..1 mapped to 190..70
        const X = (lx) => 220 + ((lx + 12) / 9) * 130;
        const Y = (g) => 190 - ((g + 0.3) / 1.3) * 120;
        const gs = (x) => Math.exp(-((x + 5.5) ** 2) / (2 * 1.6 * 1.6)) - 0.3 / (1 + Math.exp(-2 * (x + 3.5)));
        const gr = (x) => { const rise = 1 / (1 + Math.exp(-1.5 * (x + 11.5))); const inh = 1 - 1 / (1 + Math.exp(-2.5 * (x + 9.3))); return rise * inh - 0.3 / (1 + Math.exp(-2 * (x + 8))); };
        let ps = '', prr = '';
        for (let x = -12; x <= -3.001; x += 0.25) {
          ps += `${ps ? 'L' : 'M'}${X(x).toFixed(1)} ${Y(gs(x)).toFixed(1)} `;
          prr += `${prr ? 'L' : 'M'}${X(x).toFixed(1)} ${Y(gr(x)).toFixed(1)} `;
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Auxin redistribution in phototropism and gravitropism, and the growth-rate vs auxin curves for shoot and root', 'Redistribusi auksin pada fototropisme dan gravitropisme, serta kurva laju tumbuh terhadap auksin untuk batang dan akar')}">
  <style>text{font:9px system-ui,sans-serif;fill:currentColor}.h{font:bold 10px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none}.st{stroke:#22c55e;stroke-width:5;fill:none;stroke-linecap:round}.rt{stroke:#d4a373;stroke-width:4;fill:none;stroke-linecap:round}.au{stroke:#ec4899;stroke-width:3;fill:none;stroke-linecap:round}</style>
  <text x="50" y="14" text-anchor="middle" class="h">${L('phototropism', 'fototropisme')}</text>
  <circle cx="98" cy="40" r="8" fill="#facc15"/>
  <line x1="88" y1="44" x2="70" y2="52" stroke="#facc15" stroke-width="1.2"/><line x1="88" y1="38" x2="66" y2="40" stroke="#facc15" stroke-width="1.2"/>
  <line x1="40" y1="130" x2="40" y2="100" class="st"/><path d="M40 100 C40 80 46 66 58 56" class="st"/>
  <path d="M36 100 C36 82 41 70 52 60" class="au"/>
  <rect x="20" y="130" width="60" height="20" fill="rgba(180,120,60,0.35)"/>
  <line x1="40" y1="130" x2="40" y2="160" class="rt"/>
  <text x="14" y="90" fill="#ec4899">${L('auxin', 'auksin')}</text><text x="14" y="100" fill="#ec4899">${L('shaded', 'teduh')}</text>
  <text x="50" y="176" text-anchor="middle">${L('shaded side grows faster', 'sisi teduh tumbuh lebih cepat')}</text>
  <text x="150" y="14" text-anchor="middle" class="h">${L('gravitropism', 'gravitropisme')}</text>
  <line x1="196" y1="30" x2="196" y2="50" stroke="currentColor" stroke-width="1.2"/><path d="M192 46 L196 52 L200 46" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="190" y="28">g</text>
  <rect x="130" y="80" width="24" height="40" fill="rgba(180,120,60,0.35)"/>
  <path d="M154 100 L120 100" class="rt" transform="translate(34 0)"/>
  <path d="M154 100 L178 100 C190 100 196 92 200 80" class="st"/>
  <path d="M158 104 L180 104 C190 104 195 98 198 88" class="au"/>
  <path d="M130 100 L112 100 C104 100 100 106 98 116" class="rt"/>
  <path d="M128 104 L112 104 C106 104 103 108 101 114" class="au"/>
  <text x="206" y="78" fill="#22c55e">${L('shoot: up', 'batang: ke atas')}</text>
  <text x="82" y="130" fill="#d4a373">${L('root: down', 'akar: ke bawah')}</text>
  <text x="150" y="150" text-anchor="middle">${L('auxin collects on the lower side', 'auksin terkumpul di sisi bawah')}</text>
  <text x="150" y="160" text-anchor="middle">${L('stimulates shoot, inhibits root', 'merangsang batang, menghambat akar')}</text>
  <line x1="220" y1="${Y(0)}" x2="350" y2="${Y(0)}" class="ax"/>
  <line x1="220" y1="70" x2="220" y2="190" class="ax"/>
  <path d="${ps.trim()}" stroke="#22c55e" stroke-width="2" fill="none"/>
  <path d="${prr.trim()}" stroke="#d4a373" stroke-width="2" fill="none"/>
  <text x="285" y="66" text-anchor="middle" class="h">${L('growth rate vs [IAA]', 'laju tumbuh vs [IAA]')}</text>
  <text x="222" y="200">10⁻¹²</text><text x="${X(-9)}" y="200" text-anchor="middle">10⁻⁹</text><text x="${X(-6)}" y="200" text-anchor="middle">10⁻⁶</text><text x="342" y="200" text-anchor="middle">10⁻³</text>
  <text x="285" y="212" text-anchor="middle">${L('auxin concentration (mol/L)', 'konsentrasi auksin (mol/L)')}</text>
  <text x="${X(-10.6)}" y="${Y(0.95)}" fill="#d4a373">${L('root', 'akar')}</text>
  <text x="${X(-6.2)}" y="${Y(1.08)}" fill="#22c55e">${L('shoot', 'batang')}</text>
  <text x="${X(-8.6)}" y="${Y(-0.2)}" fill="#d4a373">${L('inhibition', 'penghambatan')}</text>
  <text x="206" y="${Y(0) + 3}" text-anchor="end">0</text><text x="206" y="${Y(1) + 3}" text-anchor="end">+</text><text x="206" y="${Y(-0.3) + 3}" text-anchor="end">−</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A tropism is a directional growth response: positive towards the stimulus, negative away. Shoots are positively phototropic and negatively gravitropic; roots are positively gravitropic.',
        'Bending is differential growth: the side that elongates more becomes the outside of the curve. No cell moves; cells on one side simply grow longer.',
        'Auxin (IAA) is produced in the shoot tip and redistributed to the shaded side (phototropism) or lower side (gravitropism) before being transported down the organ.',
        'Shoot cells are stimulated by auxin up to about 10⁻⁵ mol/L, whereas root cells have an optimum near 10⁻¹⁰ mol/L and are inhibited above 10⁻⁹, so the same redistribution bends shoots up and roots down.',
        'Darwin (tip cover), Boysen-Jensen (gelatin vs mica) and Went (agar blocks) showed the signal is a diffusible chemical from the tip; removing the tip abolishes bending.',
        'Bend angle is a measurable response: in the sim it increases with light angle and saturates as the tip aligns with the lamp; real coleoptiles bend about 30° in 2–3 hours.',
      ],
      id: [
        'Tropisme adalah respons tumbuh berarah: positif menuju rangsang, negatif menjauh. Batang bersifat fototropik positif dan gravitropik negatif; akar bersifat gravitropik positif.',
        'Pembengkokan adalah pertumbuhan diferensial: sisi yang memanjang lebih banyak menjadi bagian luar lengkungan. Tidak ada sel yang berpindah; sel di satu sisi hanya tumbuh lebih panjang.',
        'Auksin (IAA) diproduksi di ujung batang dan didistribusikan ulang ke sisi teduh (fototropisme) atau sisi bawah (gravitropisme) sebelum diangkut turun sepanjang organ.',
        'Sel batang dirangsang auksin hingga sekitar 10⁻⁵ mol/L, sedangkan sel akar memiliki optimum dekat 10⁻¹⁰ mol/L dan terhambat di atas 10⁻⁹, sehingga redistribusi yang sama membengkokkan batang ke atas dan akar ke bawah.',
        'Darwin (penutup ujung), Boysen-Jensen (gelatin vs mika), dan Went (blok agar) menunjukkan sinyalnya adalah zat kimia yang berdifusi dari ujung; membuang ujung meniadakan pembengkokan.',
        'Sudut bengkok adalah respons terukur: dalam simulasi sudut bertambah seiring sudut cahaya dan jenuh saat ujung sejajar dengan lampu; koleoptil nyata membengkok sekitar 30° dalam 2–3 jam.',
      ],
    },
    vocabulary: {
      en: [
        ['Tropism', 'A growth movement of a plant organ towards (positive) or away from (negative) a directional stimulus such as light or gravity.'],
        ['Phototropism', 'Growth towards (shoots) or away from (some roots) a light source, caused by auxin accumulating on the shaded side.'],
        ['Gravitropism (geotropism)', 'Growth response to gravity: shoots grow upward (negative), roots downward (positive).'],
        ['Auxin (IAA)', 'Indole-3-acetic acid, the plant hormone made in shoot tips that promotes cell elongation in shoots at about 10⁻⁶ mol/L and inhibits root elongation above about 10⁻⁹ mol/L.'],
        ['Differential growth', 'Faster elongation on one side of an organ than the other, which bends the organ towards the slower side.'],
        ['Coleoptile', 'The protective sheath around the shoot of a grass seedling, used in the classic phototropism experiments.'],
        ['Statolith', 'A dense starch-filled plastid that settles to the lower side of a cell and signals the direction of gravity.'],
      ],
      id: [
        ['Tropisme', 'Gerak tumbuh organ tumbuhan menuju (positif) atau menjauhi (negatif) rangsang berarah seperti cahaya atau gravitasi.'],
        ['Fototropisme', 'Pertumbuhan menuju (batang) atau menjauhi (beberapa akar) sumber cahaya, disebabkan auksin yang menumpuk di sisi teduh.'],
        ['Gravitropisme (geotropisme)', 'Respons tumbuh terhadap gravitasi: batang tumbuh ke atas (negatif), akar ke bawah (positif).'],
        ['Auksin (IAA)', 'Asam indol-3-asetat, hormon tumbuhan yang dibuat di ujung batang, memacu pemanjangan sel batang pada sekitar 10⁻⁶ mol/L dan menghambat pemanjangan akar di atas sekitar 10⁻⁹ mol/L.'],
        ['Pertumbuhan diferensial', 'Pemanjangan yang lebih cepat di satu sisi organ daripada sisi lain, yang membengkokkan organ ke arah sisi yang lebih lambat.'],
        ['Koleoptil', 'Selubung pelindung di sekitar tunas kecambah rumput, dipakai dalam percobaan fototropisme klasik.'],
        ['Statolit', 'Plastid padat berisi pati yang mengendap ke sisi bawah sel dan memberi sinyal arah gravitasi.'],
      ],
    },
    misconceptions: {
      en: [
        ['The plant bends because its cells move or lean towards the light.', 'Cells do not move. The shaded side simply grows longer than the lit side, and the longer side ends up on the outside of the bend.'],
        ['Auxin always makes plant cells grow faster.', 'It depends on the organ and the dose. Root cells are about 10 000 times more sensitive than shoot cells, so the auxin concentration that stimulates a shoot inhibits a root. That is why roots bend down and shoots up.'],
        ['Light is what makes the stem grow.', 'In the sim the tip-covered seedling still grows and still responds to gravity; light only directs where auxin goes. Seedlings in the dark actually grow taller (etiolation).'],
        ['The tip bends because that is where the light hits.', 'The tip senses light but the bending happens in the growing zone below it. Darwin showed this by covering only the tip, which stopped the bending lower down.'],
      ],
      id: [
        ['Tumbuhan membengkok karena selnya bergerak atau condong ke arah cahaya.', 'Sel tidak bergerak. Sisi teduh hanya tumbuh lebih panjang daripada sisi yang disinari, dan sisi yang lebih panjang berada di luar lengkungan.'],
        ['Auksin selalu membuat sel tumbuhan tumbuh lebih cepat.', 'Tergantung organ dan dosisnya. Sel akar sekitar 10.000 kali lebih peka daripada sel batang, sehingga konsentrasi auksin yang merangsang batang justru menghambat akar. Itulah sebabnya akar membengkok ke bawah dan batang ke atas.'],
        ['Cahaya adalah yang membuat batang tumbuh.', 'Dalam simulasi kecambah yang ujungnya ditutup tetap tumbuh dan tetap merespons gravitasi; cahaya hanya mengarahkan ke mana auksin pergi. Kecambah di tempat gelap justru tumbuh lebih tinggi (etiolasi).'],
        ['Ujung membengkok karena di sanalah cahaya mengenai.', 'Ujung merasakan cahaya tetapi pembengkokan terjadi di zona tumbuh di bawahnya. Darwin menunjukkannya dengan menutup hanya ujungnya, yang menghentikan pembengkokan di bagian bawah.'],
      ],
    },
    realWorld: {
      en: [
        'Houseplants on a windowsill lean towards the glass; rotating the pot a quarter turn every few days keeps them growing straight.',
        'Synthetic auxins such as 2,4-D are used as selective weedkillers: at high doses they overstimulate broad-leaved weeds until they die, while grasses and cereals are much less affected.',
        'Rooting powder for cuttings contains the auxin IBA, which promotes root formation at the cut surface.',
        'On the International Space Station, seedlings grown in microgravity have no gravitropic cue and send roots in random directions unless a light gradient guides them.',
        'Sunflower heads track the sun across the sky each day (heliotropism) through auxin-driven differential growth on the east and west sides of the stem.',
      ],
      id: [
        'Tanaman hias di ambang jendela condong ke arah kaca; memutar pot seperempat putaran tiap beberapa hari membuatnya tumbuh lurus.',
        'Auksin sintetis seperti 2,4-D dipakai sebagai herbisida selektif: pada dosis tinggi senyawa ini merangsang gulma berdaun lebar secara berlebihan hingga mati, sementara rumput dan serealia jauh lebih sedikit terpengaruh.',
        'Serbuk perangsang akar untuk stek mengandung auksin IBA, yang memacu pembentukan akar di permukaan potongan.',
        'Di Stasiun Luar Angkasa Internasional, kecambah yang ditumbuhkan dalam mikrogravitasi tidak memiliki isyarat gravitropik dan mengirim akar ke arah acak kecuali ada gradien cahaya yang memandu.',
        'Bunga matahari mengikuti matahari melintasi langit setiap hari (heliotropisme) melalui pertumbuhan diferensial berbasis auksin di sisi timur dan barat batang.',
      ],
    },
    questions: {
      en: [
        { q: 'With the lamp at 90° the sim shows auxin 70 % on the left side and 30 % on the right. Which side is the lamp on, and which way will the shoot bend? Explain the mechanism.', a: 'The lamp is on the right: light drives auxin to the shaded (left) side. Auxin at shoot concentrations stimulates elongation, so the left side grows faster and the shoot bends to the right, towards the lamp.' },
        { q: 'A seedling with its tip removed is lit from one side for 60 s of simulated time and shows a bend of 0°. A seedling with its tip covered by foil also shows 0° to light but bends when the chamber is rotated. What do the two results tell you?', a: 'Removing the tip removes the auxin source, so there is no differential growth at all. Covering the tip leaves the auxin supply intact but blocks light perception, so phototropism is lost while gravity (sensed in the growing zone and root tip by statoliths) still redistributes auxin and causes bending. The light sensor is in the tip and the chemical signal comes from the tip.' },
        { q: 'Use the growth-rate curve to explain why a seedling laid horizontally bends its shoot up but its root down, even though auxin collects on the lower side of both.', a: 'The lower side of both organs receives more auxin. In the shoot the concentration (~10⁻⁶ mol/L) lies on the rising part of the shoot curve, so the lower side grows faster and pushes the tip upward. In the root the concentration (~10⁻¹⁰ to 10⁻⁹ mol/L) is above the root optimum, so the lower side is inhibited, the upper side grows faster and the tip turns downward.' },
        { q: 'In the sim the bend angle after 60 s at a light angle of 30° is smaller than at 90°. Why, and why does the angle stop increasing after a long time at 90°?', a: 'The amount of auxin redistribution depends on how far the light direction departs from the shoot axis, so a lamp nearly overhead produces only a small asymmetry. As the shoot bends towards the lamp the angle between the light and the shoot shrinks, the asymmetry fades, and growth becomes equal on both sides, so the bend saturates near the light direction.' },
      ],
      id: [
        { q: 'Dengan lampu di 90° simulasi menunjukkan auksin 70 % di sisi kiri dan 30 % di sisi kanan. Di sisi mana lampunya, dan ke mana batang akan membengkok? Jelaskan mekanismenya.', a: 'Lampu di sebelah kanan: cahaya mendorong auksin ke sisi teduh (kiri). Auksin pada konsentrasi batang merangsang pemanjangan, sehingga sisi kiri tumbuh lebih cepat dan batang membengkok ke kanan, menuju lampu.' },
        { q: 'Kecambah yang ujungnya dibuang disinari dari satu sisi selama 60 s waktu simulasi dan menunjukkan bengkok 0°. Kecambah yang ujungnya ditutup kertas timah juga menunjukkan 0° terhadap cahaya tetapi membengkok ketika kotak diputar. Apa yang ditunjukkan kedua hasil itu?', a: 'Membuang ujung menghilangkan sumber auksin, sehingga tidak ada pertumbuhan diferensial sama sekali. Menutup ujung menyisakan pasokan auksin tetapi menghalangi penerimaan cahaya, sehingga fototropisme hilang sementara gravitasi (dirasakan di zona tumbuh dan ujung akar oleh statolit) tetap mendistribusikan ulang auksin dan menyebabkan pembengkokan. Sensor cahaya ada di ujung dan sinyal kimianya berasal dari ujung.' },
        { q: 'Gunakan kurva laju tumbuh untuk menjelaskan mengapa kecambah yang direbahkan membengkokkan batang ke atas tetapi akar ke bawah, padahal auksin terkumpul di sisi bawah keduanya.', a: 'Sisi bawah kedua organ menerima lebih banyak auksin. Pada batang konsentrasinya (~10⁻⁶ mol/L) berada di bagian naik kurva batang, sehingga sisi bawah tumbuh lebih cepat dan mendorong ujung ke atas. Pada akar konsentrasinya (~10⁻¹⁰ sampai 10⁻⁹ mol/L) berada di atas optimum akar, sehingga sisi bawah terhambat, sisi atas tumbuh lebih cepat dan ujung berbalik ke bawah.' },
        { q: 'Dalam simulasi sudut bengkok setelah 60 s pada sudut cahaya 30° lebih kecil daripada pada 90°. Mengapa, dan mengapa sudut berhenti bertambah setelah lama di 90°?', a: 'Besarnya redistribusi auksin bergantung pada seberapa jauh arah cahaya menyimpang dari sumbu batang, sehingga lampu yang hampir tepat di atas hanya menghasilkan asimetri kecil. Saat batang membengkok menuju lampu, sudut antara cahaya dan batang mengecil, asimetri memudar, dan pertumbuhan menjadi sama di kedua sisi, sehingga pembengkokan jenuh di dekat arah cahaya.' },
      ],
    },
  },
};
