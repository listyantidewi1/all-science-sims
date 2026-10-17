// Long-form text for the Charge in a Magnetic Field sim (Fase F, grade 12).
export default {
  objectives: {
    en: [
      'Use F = qvB sin θ and the right-hand rule to find the size and direction of the magnetic force on a moving charge.',
      'Derive and apply r = mv/(qB) for circular motion in a uniform field, and show that the period T = 2πm/(qB) does not depend on speed.',
      'Explain how crossed E and B fields select one speed (v = E/B) and how a mass spectrometer separates isotopes by radius.',
    ],
    id: [
      'Menggunakan F = qvB sin θ dan kaidah tangan kanan untuk menentukan besar dan arah gaya magnet pada muatan yang bergerak.',
      'Menurunkan dan menerapkan r = mv/(qB) untuk gerak melingkar dalam medan seragam, dan menunjukkan bahwa periode T = 2πm/(qB) tidak bergantung pada kelajuan.',
      'Menjelaskan bagaimana medan E dan B bersilangan memilih satu kelajuan (v = E/B) dan bagaimana spektrometer massa memisahkan isotop berdasarkan jari-jari.',
    ],
  },
  tryThis: {
    en: [
      'Choose the proton with v = 1.0 × 10⁵ m/s and B = 0.10 T. Check that r = 1.04 cm. Double B: the radius halves. Double v: the radius doubles.',
      'Switch from the proton to the electron without changing v or B. The circle flips to the other side and shrinks about 1836 times; turn off Auto-fit view to see both on one scale.',
      'Flip B from "out of page" to "into page" and watch the particle curve the other way. Use the right-hand rule to predict the direction before you flip.',
      'Turn on the velocity selector, press "Set E = vB" so the particle flies straight, then change v slightly: it bends up or down. Load the Ne isotopes preset and read the landing spots.',
    ],
    id: [
      'Pilih proton dengan v = 1,0 × 10⁵ m/s dan B = 0,10 T. Periksa bahwa r = 1,04 cm. Gandakan B: jari-jari menjadi setengah. Gandakan v: jari-jari menjadi dua kali.',
      'Ganti proton dengan elektron tanpa mengubah v atau B. Lingkarannya berpindah ke sisi lain dan mengecil sekitar 1836 kali; matikan Auto-fit view untuk melihat keduanya pada skala yang sama.',
      'Balik B dari "keluar bidang" ke "masuk bidang" dan lihat partikel melengkung ke arah lain. Gunakan kaidah tangan kanan untuk memprediksi arahnya sebelum membalik.',
      'Nyalakan pemilih kecepatan, tekan "Set E = vB" agar partikel lurus, lalu ubah v sedikit: lintasan membelok ke atas atau bawah. Muat preset isotop Ne dan baca titik pendaratannya.',
    ],
  },

  learn: {
    background: {
      en: [
        'A charge q moving with velocity v through a magnetic field B feels the Lorentz force F = q v × B. Its magnitude is F = qvB sin θ, where θ is the angle between v and B, and its direction is given by the right-hand rule: point your fingers along v, curl them toward B, and your thumb gives the force on a positive charge; a negative charge is pushed the opposite way. The force is always perpendicular to the velocity, so it changes the direction of motion but never the speed, and it does no work. An electron at 1.0 × 10⁷ m/s in a 1.0 mT field feels only 1.6 × 10⁻¹⁵ N, yet because its mass is 9.1 × 10⁻³¹ kg that is an acceleration of 1.8 × 10¹⁵ m/s².',
        'When v is perpendicular to a uniform B the force has constant magnitude and always points toward one side, so the particle moves in a circle. Setting the magnetic force equal to the centripetal force, qvB = mv²/r, gives the radius r = mv/(qB): heavier or faster particles make bigger circles, stronger fields or larger charges make tighter ones. A proton at 1.0 × 10⁵ m/s in 0.10 T circles with r = 1.04 cm; an alpha particle (twice the charge, four times the mass) at the same speed has twice the radius. One lap takes T = 2πr/v = 2πm/(qB), which does not depend on v at all. This is the principle of the cyclotron: a fixed-frequency alternating voltage can keep accelerating particles because every lap takes the same time.',
        'If an electric field E is added perpendicular to both v and B, the electric force qE can cancel the magnetic force qvB, but only for the one speed v = E/B. Particles with that speed go straight through; faster ones are bent by the magnetic force, slower ones by the electric force. This crossed-field arrangement is a velocity selector, and it works for any charge and any mass because both forces are proportional to q. With E = 1.0 × 10⁴ V/m and B = 0.10 T, only particles at 1.0 × 10⁵ m/s pass.',
        'A mass spectrometer uses a velocity selector followed by a region of magnetic field alone. Ions of the same charge and speed but different mass follow semicircles of different radius and strike a detector plate at a distance 2r = 2mv/(qB) from the entrance, so the position on the plate measures the mass. Neon-20 and neon-22 ions at 1.0 × 10⁵ m/s in 0.50 T land 8.3 cm and 9.1 cm from the slit. This is how isotope abundances are measured, how uranium was enriched for the first atomic bombs (in calutrons), and how laboratories identify molecules in medicine, forensics and doping tests.',
      ],
      id: [
        'Muatan q yang bergerak dengan kecepatan v menembus medan magnet B merasakan gaya Lorentz F = q v × B. Besarnya F = qvB sin θ, dengan θ sudut antara v dan B, dan arahnya ditentukan kaidah tangan kanan: arahkan jari-jari searah v, tekuk ke arah B, dan ibu jari menunjuk gaya pada muatan positif; muatan negatif didorong ke arah berlawanan. Gaya selalu tegak lurus kecepatan, sehingga mengubah arah gerak tetapi tidak pernah mengubah kelajuan, dan tidak melakukan usaha. Elektron berkelajuan 1,0 × 10⁷ m/s dalam medan 1,0 mT hanya merasakan 1,6 × 10⁻¹⁵ N, tetapi karena massanya 9,1 × 10⁻³¹ kg percepatannya mencapai 1,8 × 10¹⁵ m/s².',
        'Ketika v tegak lurus B yang seragam, gaya berbesar tetap dan selalu menunjuk ke satu sisi, sehingga partikel bergerak melingkar. Menyamakan gaya magnet dengan gaya sentripetal, qvB = mv²/r, menghasilkan jari-jari r = mv/(qB): partikel lebih berat atau lebih cepat membuat lingkaran lebih besar, medan lebih kuat atau muatan lebih besar membuat lingkaran lebih rapat. Proton berkelajuan 1,0 × 10⁵ m/s dalam 0,10 T melingkar dengan r = 1,04 cm; partikel alfa (muatan dua kali, massa empat kali) pada kelajuan sama berjari-jari dua kali lipat. Satu putaran memakan waktu T = 2πr/v = 2πm/(qB), yang sama sekali tidak bergantung pada v. Inilah prinsip siklotron: tegangan bolak-balik berfrekuensi tetap dapat terus mempercepat partikel karena setiap putaran memakan waktu yang sama.',
        'Jika medan listrik E ditambahkan tegak lurus terhadap v dan B, gaya listrik qE dapat meniadakan gaya magnet qvB, tetapi hanya untuk satu kelajuan v = E/B. Partikel dengan kelajuan itu lurus; yang lebih cepat dibelokkan gaya magnet, yang lebih lambat dibelokkan gaya listrik. Susunan medan bersilangan ini disebut pemilih kecepatan, dan berlaku untuk muatan dan massa apa pun karena kedua gaya sebanding dengan q. Dengan E = 1,0 × 10⁴ V/m dan B = 0,10 T, hanya partikel berkelajuan 1,0 × 10⁵ m/s yang lolos.',
        'Spektrometer massa memakai pemilih kecepatan yang diikuti daerah bermedan magnet saja. Ion dengan muatan dan kelajuan sama tetapi massa berbeda menempuh setengah lingkaran berjari-jari berbeda dan menumbuk pelat detektor pada jarak 2r = 2mv/(qB) dari celah masuk, sehingga posisi pada pelat mengukur massa. Ion neon-20 dan neon-22 berkelajuan 1,0 × 10⁵ m/s dalam 0,50 T mendarat 8,3 cm dan 9,1 cm dari celah. Begitulah kelimpahan isotop diukur, uranium diperkaya untuk bom atom pertama (dalam kalutron), dan laboratorium mengidentifikasi molekul dalam kedokteran, forensik, dan tes doping.',
      ],
    },
    figure: {
      caption: {
        en: 'A positive charge entering a field that points out of the page (dots) is pushed sideways and traces a semicircle of radius r = mv/(qB); a heavier isotope at the same speed lands farther along the detector.',
        id: 'Muatan positif yang memasuki medan yang menunjuk keluar bidang (titik) didorong ke samping dan menempuh setengah lingkaran berjari-jari r = mv/(qB); isotop yang lebih berat dengan kelajuan sama mendarat lebih jauh di detektor.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        let dots = '';
        for (let i = 0; i < 6; i++) for (let j = 0; j < 5; j++) dots += `<circle cx="${150 + i * 36}" cy="${40 + j * 40}" r="2.2" fill="currentColor" opacity=".55"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Charged particle curving in a magnetic field', 'Partikel bermuatan melengkung dalam medan magnet')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none;opacity:.6}</style>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
  <rect x="134" y="24" width="212" height="196" fill="none" stroke="currentColor" opacity=".35" stroke-dasharray="4 4"/>
  ${dots}
  <text x="300" y="36" opacity=".7">B ${L('out of page', 'keluar bidang')}</text>
  <line x1="134" y1="60" x2="134" y2="220" stroke="currentColor" stroke-width="4" opacity=".5"/>
  <text x="80" y="232" opacity=".8">${L('detector', 'detektor')}</text>
  <line x1="20" y1="60" x2="130" y2="60" stroke="#f59e0b" stroke-width="2" marker-end="url(#ar)"/>
  <text x="40" y="52" style="fill:#f59e0b">v</text>
  <path d="M134 60 A50 50 0 0 1 134 160" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
  <path d="M134 60 A58 58 0 0 1 134 176" fill="none" stroke="#a78bfa" stroke-width="2.5" stroke-dasharray="6 3"/>
  <circle cx="134" cy="60" r="6" fill="#ef4444"/>
  <text x="140" y="52" style="fill:#ef4444">+q</text>
  <line x1="184" y1="110" x2="184" y2="62" class="ax" stroke-dasharray="3 3"/>
  <text x="188" y="92">r</text>
  <circle cx="184" cy="110" r="2" fill="currentColor"/>
  <line x1="170" y1="80" x2="150" y2="100" stroke="#22c55e" stroke-width="2" marker-end="url(#ar)"/>
  <text x="140" y="118" style="fill:#22c55e">F = qvB</text>
  <text x="100" y="164" style="fill:#38bdf8">2r</text>
  <text x="100" y="180" style="fill:#a78bfa">${L('heavier', 'lebih berat')}</text>
  <text x="20" y="100">r = mv / (qB)</text>
  <text x="20" y="120">T = 2πm / (qB)</text>
  <text x="20" y="140">${L('selector: v = E/B', 'pemilih: v = E/B')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Magnetic force on a moving charge: F = qvB sin θ, perpendicular to both v and B; direction from the right-hand rule, reversed for negative charges.',
        'The force does no work: it changes the direction of v but not its magnitude, so the kinetic energy stays constant.',
        'Circular motion in a uniform field: r = mv/(qB). Doubling v doubles r; doubling B halves r.',
        'Period T = 2πm/(qB) and frequency f = qB/(2πm) are independent of speed and radius (the cyclotron principle).',
        'Crossed E and B fields pass only particles with v = E/B, for any q and m.',
        'Mass spectrometer: same q and v, different m → different r; ions hit the detector at 2r = 2mv/(qB).',
      ],
      id: [
        'Gaya magnet pada muatan bergerak: F = qvB sin θ, tegak lurus v dan B; arahnya dari kaidah tangan kanan, dibalik untuk muatan negatif.',
        'Gaya ini tidak melakukan usaha: mengubah arah v tetapi tidak besarnya, sehingga energi kinetik tetap.',
        'Gerak melingkar dalam medan seragam: r = mv/(qB). Menggandakan v menggandakan r; menggandakan B membuat r setengahnya.',
        'Periode T = 2πm/(qB) dan frekuensi f = qB/(2πm) tidak bergantung pada kelajuan dan jari-jari (prinsip siklotron).',
        'Medan E dan B bersilangan hanya meloloskan partikel dengan v = E/B, untuk q dan m apa pun.',
        'Spektrometer massa: q dan v sama, m berbeda → r berbeda; ion menumbuk detektor pada 2r = 2mv/(qB).',
      ],
    },
    vocabulary: {
      en: [
        ['Lorentz force', 'The total force on a charge in electric and magnetic fields, F = q(E + v × B).'],
        ['Tesla (T)', 'SI unit of magnetic field; 1 T = 1 N/(A·m). Earth\'s field is about 5 × 10⁻⁵ T, an MRI magnet 1.5–3 T.'],
        ['Right-hand rule', 'Fingers along v, curl toward B, thumb gives the force on a positive charge.'],
        ['Centripetal force', 'The inward force needed for circular motion, mv²/r; here supplied by qvB.'],
        ['Velocity selector', 'Crossed E and B fields that let through only particles with v = E/B.'],
        ['Mass spectrometer', 'An instrument that sorts ions by mass using the radius r = mv/(qB) of their path in a magnetic field.'],
        ['Isotope', 'Atoms of the same element with different numbers of neutrons, so the same charge but different mass.'],
      ],
      id: [
        ['Gaya Lorentz', 'Gaya total pada muatan dalam medan listrik dan magnet, F = q(E + v × B).'],
        ['Tesla (T)', 'Satuan SI medan magnet; 1 T = 1 N/(A·m). Medan Bumi sekitar 5 × 10⁻⁵ T, magnet MRI 1,5–3 T.'],
        ['Kaidah tangan kanan', 'Jari-jari searah v, tekuk ke arah B, ibu jari menunjuk gaya pada muatan positif.'],
        ['Gaya sentripetal', 'Gaya ke pusat yang diperlukan untuk gerak melingkar, mv²/r; di sini disediakan oleh qvB.'],
        ['Pemilih kecepatan', 'Medan E dan B bersilangan yang hanya meloloskan partikel dengan v = E/B.'],
        ['Spektrometer massa', 'Alat yang memilah ion berdasarkan massa memakai jari-jari lintasan r = mv/(qB) dalam medan magnet.'],
        ['Isotop', 'Atom unsur yang sama dengan jumlah neutron berbeda, sehingga muatannya sama tetapi massanya berbeda.'],
      ],
    },
    misconceptions: {
      en: [
        ['A magnetic field speeds the particle up or slows it down.', 'The magnetic force is always perpendicular to the velocity, so it only turns the particle. The speed and kinetic energy stay exactly constant.'],
        ['A faster particle completes its circle in less time.', 'It moves faster but on a proportionally bigger circle; T = 2πm/(qB) is the same for every speed in the same field.'],
        ['The force on a charge at rest in a magnetic field points along B.', 'A charge at rest feels no magnetic force at all (v = 0), and a moving charge feels a force perpendicular to B, never along it.'],
      ],
      id: [
        ['Medan magnet mempercepat atau memperlambat partikel.', 'Gaya magnet selalu tegak lurus kecepatan, sehingga hanya membelokkan partikel. Kelajuan dan energi kinetiknya tetap sama persis.'],
        ['Partikel yang lebih cepat menyelesaikan lingkarannya dalam waktu lebih singkat.', 'Ia bergerak lebih cepat tetapi pada lingkaran yang lebih besar secara proporsional; T = 2πm/(qB) sama untuk semua kelajuan dalam medan yang sama.'],
        ['Gaya pada muatan diam dalam medan magnet mengarah sepanjang B.', 'Muatan diam tidak merasakan gaya magnet sama sekali (v = 0), dan muatan bergerak merasakan gaya yang tegak lurus B, tidak pernah sejajar.'],
      ],
    },
    realWorld: {
      en: [
        'Old CRT televisions steered an electron beam across the screen with magnetic deflection coils, 25 or 30 full pictures every second.',
        'The aurora forms where charged particles from the Sun spiral along Earth\'s magnetic field lines into the polar atmosphere.',
        'Mass spectrometers date rocks, detect doping agents in athletes\' urine and identify proteins in medical research.',
        'The Large Hadron Collider uses 8.3 T superconducting magnets to bend protons at 99.9999991% of the speed of light around a 27 km ring.',
        'Cyclotrons in hospitals make short-lived radioactive isotopes such as fluorine-18 for PET scans.',
      ],
      id: [
        'Televisi tabung (CRT) lama mengarahkan berkas elektron ke seluruh layar dengan kumparan pembelok magnetik, 25 atau 30 gambar penuh setiap detik.',
        'Aurora terbentuk ketika partikel bermuatan dari Matahari berpilin sepanjang garis medan magnet Bumi menuju atmosfer kutub.',
        'Spektrometer massa menentukan umur batuan, mendeteksi zat doping dalam urin atlet, dan mengidentifikasi protein dalam riset medis.',
        'Large Hadron Collider memakai magnet superkonduktor 8,3 T untuk membelokkan proton pada 99,9999991% kelajuan cahaya mengelilingi cincin 27 km.',
        'Siklotron di rumah sakit membuat isotop radioaktif berumur pendek seperti fluor-18 untuk pemindaian PET.',
      ],
    },
    questions: {
      en: [
        { q: 'A proton (m = 1.67 × 10⁻²⁷ kg, q = 1.60 × 10⁻¹⁹ C) moves at 2.0 × 10⁶ m/s perpendicular to a 0.50 T field. Find the force and the radius of its path.', a: 'F = qvB = 1.60 × 10⁻¹⁹ × 2.0 × 10⁶ × 0.50 = 1.6 × 10⁻¹³ N. r = mv/(qB) = 1.67 × 10⁻²⁷ × 2.0 × 10⁶ / (1.60 × 10⁻¹⁹ × 0.50) = 4.2 × 10⁻² m = 4.2 cm.' },
        { q: 'An electron and a proton enter the same field with the same speed. Compare their radii and the directions in which they curve.', a: 'The proton\'s radius is about 1836 times larger because r ∝ m. They curve in opposite directions because their charges have opposite signs.' },
        { q: 'A velocity selector has E = 2.0 × 10⁴ V/m and B = 0.20 T. Which speed passes straight through? What happens to a faster ion?', a: 'v = E/B = 1.0 × 10⁵ m/s. A faster ion feels a magnetic force qvB larger than the electric force qE, so it is deflected toward the magnetic-force side.' },
      ],
      id: [
        { q: 'Proton (m = 1,67 × 10⁻²⁷ kg, q = 1,60 × 10⁻¹⁹ C) bergerak 2,0 × 10⁶ m/s tegak lurus medan 0,50 T. Tentukan gaya dan jari-jari lintasannya.', a: 'F = qvB = 1,60 × 10⁻¹⁹ × 2,0 × 10⁶ × 0,50 = 1,6 × 10⁻¹³ N. r = mv/(qB) = 1,67 × 10⁻²⁷ × 2,0 × 10⁶ / (1,60 × 10⁻¹⁹ × 0,50) = 4,2 × 10⁻² m = 4,2 cm.' },
        { q: 'Elektron dan proton memasuki medan yang sama dengan kelajuan sama. Bandingkan jari-jari dan arah lengkungannya.', a: 'Jari-jari proton sekitar 1836 kali lebih besar karena r ∝ m. Keduanya melengkung ke arah berlawanan karena tanda muatannya berlawanan.' },
        { q: 'Pemilih kecepatan memiliki E = 2,0 × 10⁴ V/m dan B = 0,20 T. Kelajuan berapa yang lolos lurus? Apa yang terjadi pada ion yang lebih cepat?', a: 'v = E/B = 1,0 × 10⁵ m/s. Ion yang lebih cepat merasakan gaya magnet qvB lebih besar daripada gaya listrik qE, sehingga dibelokkan ke sisi gaya magnet.' },
      ],
    },
  },
};
