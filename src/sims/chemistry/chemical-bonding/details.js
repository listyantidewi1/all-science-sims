// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Use the electronegativity difference ΔEN, together with whether a metal is present, to predict ionic, polar covalent, non-polar covalent or metallic bonding.',
      'Describe what the valence electrons do in each bond type: transfer to form ions, sharing in one or more pairs, or delocalisation into a sea of electrons.',
      'Link the bond type to measurable properties: melting point class, electrical conductivity in the solid and molten state, and solubility in water.',
    ],
    id: [
      'Menggunakan selisih keelektronegatifan ΔEN, bersama ada atau tidaknya logam, untuk memprediksi ikatan ion, kovalen polar, kovalen nonpolar, atau logam.',
      'Menjelaskan apa yang dilakukan elektron valensi pada tiap jenis ikatan: berpindah membentuk ion, dipakai bersama dalam satu atau lebih pasangan, atau terdelokalisasi dalam lautan elektron.',
      'Mengaitkan jenis ikatan dengan sifat yang dapat diukur: kelas titik leleh, daya hantar listrik dalam keadaan padat dan lelehan, serta kelarutan dalam air.',
    ],
  },
  tryThis: {
    en: [
      'Pick Na then Cl. Watch one electron jump across and count the charges on the ions. Then swap Na for Mg: how many electrons move, and how does the formula change?',
      'Set Element 2 to F, then use the Element 1 dropdown to pick H, B and Si in turn (a click on the table alternates between the two slots). ΔEN is above 1.7 every time, yet no metal is present. Read the exception note under the properties.',
      'Click Cl twice (Cl + Cl), then O + O, then N + N. Compare the number of shared pairs in the Lewis diagram.',
      'Click Al then Cl. ΔEN is only 1.55. Which column of the ΔEN bar does it land in, and what does the note say about AlCl₃?',
    ],
    id: [
      'Pilih Na lalu Cl. Lihat satu elektron melompat dan hitung muatan pada ion. Lalu ganti Na dengan Mg: berapa elektron yang berpindah, dan bagaimana rumusnya berubah?',
      'Atur Unsur 2 = F, lalu pakai menu Unsur 1 untuk memilih H, B, dan Si bergantian (klik pada tabel bergantian mengisi kedua slot). ΔEN selalu di atas 1,7, tetapi tidak ada logam. Baca catatan pengecualian di bawah daftar sifat.',
      'Klik Cl dua kali (Cl + Cl), lalu O + O, lalu N + N. Bandingkan jumlah pasangan elektron yang dipakai bersama pada diagram Lewis.',
      'Klik Al lalu Cl. ΔEN hanya 1,55. Di kolom mana batang ΔEN menunjuk, dan apa kata catatan tentang AlCl₃?',
    ],
  },

  learn: {
    background: {
      en: [
        'Atoms bond because a lower-energy arrangement of their valence electrons is available. How they reach it depends mostly on how strongly each atom pulls on shared electrons, measured by its electronegativity (EN) on the Pauling scale (F = 3.98 at the top, Cs ≈ 0.79 at the bottom). When two atoms differ a lot in EN, the more electronegative one takes the electrons outright: Na (EN 0.93) hands its single 3s electron to Cl (EN 3.16), making Na⁺ and Cl⁻ that pack into a lattice held by electrostatic attraction in every direction. That is an ionic bond. When the EN values are close, neither atom can take the electrons, so they are shared as one or more pairs: a covalent bond. If the two atoms are identical the sharing is equal (non-polar); if they differ moderately the pair sits closer to the more electronegative atom and the bond has a δ+ and a δ− end (polar covalent).',
        'The difference ΔEN = |EN₁ − EN₂| is a useful guideline. Textbooks often quote ΔEN < 0.4 as non-polar covalent, 0.4–1.7 as polar covalent and > 1.7 as ionic, and the sim colours its ΔEN bar that way. But bonding is a continuum, not three boxes. The sim also checks whether a metal is present: HF has ΔEN 1.78 but is a molecular gas (b.p. 20 °C), while AlCl₃ has ΔEN 1.55 and sublimes at 180 °C with marked covalent character. A combination of metal + non-metal with ΔEN above roughly 1.7 is the safest recipe for an ionic compound.',
        'Metals bond differently again. Their atoms have low EN and only one to three valence electrons, which are weakly held. In a block of metal these electrons leave their parent atoms and move freely among a lattice of cations, the sea of electrons. This explains why metals conduct electricity as solids (mobile electrons), are malleable (the cations can slide while the electron sea keeps holding them) and are shiny.',
        'Bond type predicts bulk properties. Ionic compounds have high melting points (NaCl 801 °C, MgO 2852 °C) because breaking a lattice means separating many ions; they conduct only when molten or dissolved, when the ions are free to move. Molecular covalent substances have low melting points because only weak forces between molecules must be overcome (Cl₂ −102 °C, H₂O 0 °C); they do not conduct. Covalent networks such as diamond and SiO₂ are the exception: every atom is bonded to its neighbours, so melting points are very high. The sim\'s property card gives these classes and typical values.',
      ],
      id: [
        'Atom berikatan karena tersedia susunan elektron valensi yang energinya lebih rendah. Cara mencapainya sangat bergantung pada seberapa kuat tiap atom menarik elektron yang dipakai bersama, yang diukur sebagai keelektronegatifan (EN) pada skala Pauling (F = 3,98 tertinggi, Cs ≈ 0,79 terendah). Jika dua atom sangat berbeda EN-nya, atom yang lebih elektronegatif mengambil elektron sepenuhnya: Na (EN 0,93) menyerahkan satu elektron 3s-nya kepada Cl (EN 3,16), membentuk Na⁺ dan Cl⁻ yang tersusun dalam kisi dan ditahan gaya elektrostatik ke segala arah. Itulah ikatan ion. Jika nilai EN hampir sama, tak satu pun atom bisa merebut elektron, sehingga elektron dipakai bersama sebagai satu atau lebih pasangan: ikatan kovalen. Jika kedua atom identik, pemakaian bersamanya setara (nonpolar); jika berbeda sedang, pasangan elektron lebih dekat ke atom yang lebih elektronegatif dan ikatan memiliki ujung δ+ dan δ− (kovalen polar).',
        'Selisih ΔEN = |EN₁ − EN₂| adalah pedoman yang berguna. Buku teks sering menyebut ΔEN < 0,4 kovalen nonpolar, 0,4–1,7 kovalen polar, dan > 1,7 ion, dan simulasi mewarnai batang ΔEN-nya seperti itu. Namun ikatan adalah rentang kontinu, bukan tiga kotak. Simulasi juga memeriksa ada atau tidaknya logam: HF memiliki ΔEN 1,78 tetapi berupa gas molekuler (titik didih 20 °C), sedangkan AlCl₃ memiliki ΔEN 1,55 dan menyublim pada 180 °C dengan sifat kovalen yang menonjol. Kombinasi logam + nonlogam dengan ΔEN di atas sekitar 1,7 adalah resep paling aman untuk senyawa ion.',
        'Logam berikatan dengan cara yang berbeda lagi. Atomnya memiliki EN rendah dan hanya satu sampai tiga elektron valensi yang terikat lemah. Dalam sebongkah logam, elektron ini meninggalkan atom asalnya dan bergerak bebas di antara kisi kation, yang disebut lautan elektron. Ini menjelaskan mengapa logam menghantarkan listrik dalam keadaan padat (elektron bergerak), dapat ditempa (kation dapat bergeser sementara lautan elektron tetap menahannya), dan berkilau.',
        'Jenis ikatan memprediksi sifat zat. Senyawa ion bertitik leleh tinggi (NaCl 801 °C, MgO 2852 °C) karena merusak kisi berarti memisahkan banyak ion; senyawa ion hanya menghantarkan listrik saat meleleh atau larut, ketika ionnya bebas bergerak. Zat kovalen molekuler bertitik leleh rendah karena hanya gaya lemah antarmolekul yang harus diputus (Cl₂ −102 °C, H₂O 0 °C); zat ini tidak menghantarkan listrik. Jaringan kovalen seperti intan dan SiO₂ adalah pengecualian: setiap atom terikat pada tetangganya sehingga titik lelehnya sangat tinggi. Kartu sifat di simulasi memberikan kelas-kelas ini beserta nilai tipikalnya.',
      ],
    },
    figure: {
      caption: {
        en: 'Three ways valence electrons settle. Left: Na transfers one electron to Cl, giving Na⁺ and Cl⁻ in a lattice (ΔEN 2.23). Middle: H and Cl share one pair that sits closer to Cl, so the bond is polar (ΔEN 0.96). Right: Na cations in a sea of delocalised electrons (ΔEN 0).',
        id: 'Tiga cara elektron valensi menata diri. Kiri: Na memindahkan satu elektron ke Cl, menghasilkan Na⁺ dan Cl⁻ dalam kisi (ΔEN 2,23). Tengah: H dan Cl memakai bersama satu pasangan yang lebih dekat ke Cl, sehingga ikatannya polar (ΔEN 0,96). Kanan: kation Na dalam lautan elektron terdelokalisasi (ΔEN 0).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const dots = (cx, cy, r, n, skip = -1) => {
          let s = '';
          for (let k = 0; k < 8; k++) {
            if (k >= n && k !== skip) continue;
            const a = -Math.PI / 2 + (k * Math.PI) / 4;
            const x = (cx + Math.cos(a) * r).toFixed(1), y = (cy + Math.sin(a) * r).toFixed(1);
            s += `<circle cx="${x}" cy="${y}" r="2.6" fill="#fde047"/>`;
          }
          return s;
        };
        const sea = [[22, 158], [48, 172], [70, 150], [96, 176], [120, 154], [34, 196], [60, 212], [88, 200], [112, 214], [138, 196], [30, 232], [78, 228], [122, 232]]
          .map(([x, y]) => `<circle cx="${x + 220}" cy="${y - 36}" r="2.4" fill="#fde047"/>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Ionic, polar covalent and metallic bonding compared', 'Perbandingan ikatan ion, kovalen polar, dan logam')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.t{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.s{font:bold 12px system-ui,sans-serif;fill:#0b1220;text-anchor:middle}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.4}</style>
  <text x="60" y="18" class="t">${L('Ionic', 'Ion')} · ΔEN 2.23</text>
  <circle cx="34" cy="60" r="13" fill="#f59e0b"/><text x="34" y="64" class="s">Na</text>
  <circle cx="92" cy="60" r="17" fill="#38bdf8"/><text x="92" y="64" class="s">Cl</text>
  ${dots(92, 60, 23, 7)}
  <circle cx="63" cy="40" r="3" fill="#fb923c"/>
  <path d="M48 48 Q63 30 86 38" fill="none" stroke="#fb923c" stroke-width="1.4" stroke-dasharray="3 2"/>
  <text x="20" y="34">+</text><text x="110" y="34">−</text>
  <g>
    <circle cx="22" cy="106" r="6" fill="#f59e0b"/><circle cx="42" cy="106" r="8" fill="#38bdf8"/><circle cx="62" cy="106" r="6" fill="#f59e0b"/><circle cx="82" cy="106" r="8" fill="#38bdf8"/><circle cx="102" cy="106" r="6" fill="#f59e0b"/>
    <circle cx="22" cy="126" r="8" fill="#38bdf8"/><circle cx="42" cy="126" r="6" fill="#f59e0b"/><circle cx="62" cy="126" r="8" fill="#38bdf8"/><circle cx="82" cy="126" r="6" fill="#f59e0b"/><circle cx="102" cy="126" r="8" fill="#38bdf8"/>
  </g>
  <text x="60" y="150" class="t" style="font-weight:400">${L('lattice of Na⁺ and Cl⁻', 'kisi Na⁺ dan Cl⁻')}</text>
  <text x="180" y="18" class="t">${L('Polar covalent', 'Kovalen polar')} · ΔEN 0.96</text>
  <circle cx="152" cy="70" r="10" fill="#38bdf8"/><text x="152" y="74" class="s">H</text>
  <circle cx="206" cy="70" r="17" fill="#38bdf8"/><text x="206" y="74" class="s">Cl</text>
  <circle cx="182" cy="64" r="2.8" fill="#fde047"/><circle cx="182" cy="76" r="2.8" fill="#fde047"/>
  ${dots(206, 70, 23, 7, -1).replace(/<circle cx="183\.0"[^>]*\/>/, '')}
  <text x="152" y="46" fill="#f87171">δ+</text><text x="200" y="40" fill="#f87171">δ−</text>
  <line x1="150" y1="104" x2="206" y2="104" stroke="#f87171" stroke-width="1.6"/>
  <path d="M199 99 L206 104 L199 109" fill="none" stroke="#f87171" stroke-width="1.6"/>
  <line x1="153" y1="99" x2="153" y2="109" stroke="#f87171" stroke-width="1.6"/>
  <text x="180" y="124" class="t" style="font-weight:400">${L('shared pair pulled to Cl', 'pasangan tertarik ke Cl')}</text>
  <text x="180" y="150" class="t" style="font-weight:400">HCl: b.p. −85 °C</text>
  <text x="300" y="18" class="t">${L('Metallic', 'Logam')} · ΔEN 0</text>
  <rect x="238" y="110" width="124" height="104" fill="none" class="m"/>
  <g>
    <circle cx="258" cy="130" r="9" fill="#f59e0b"/><circle cx="300" cy="130" r="9" fill="#f59e0b"/><circle cx="342" cy="130" r="9" fill="#f59e0b"/>
    <circle cx="258" cy="164" r="9" fill="#f59e0b"/><circle cx="300" cy="164" r="9" fill="#f59e0b"/><circle cx="342" cy="164" r="9" fill="#f59e0b"/>
    <circle cx="258" cy="198" r="9" fill="#f59e0b"/><circle cx="300" cy="198" r="9" fill="#f59e0b"/><circle cx="342" cy="198" r="9" fill="#f59e0b"/>
    <text x="258" y="134" class="s">+</text><text x="300" y="134" class="s">+</text><text x="342" y="134" class="s">+</text>
    <text x="258" y="168" class="s">+</text><text x="300" y="168" class="s">+</text><text x="342" y="168" class="s">+</text>
    <text x="258" y="202" class="s">+</text><text x="300" y="202" class="s">+</text><text x="342" y="202" class="s">+</text>
  </g>
  ${sea}
  <text x="300" y="60" class="t" style="font-weight:400">${L('cations + free electrons', 'kation + elektron bebas')}</text>
  <text x="300" y="78" class="t" style="font-weight:400">${L('conducts as a solid', 'menghantar saat padat')}</text>
  <text x="300" y="232" class="t" style="font-weight:400">Na: m.p. 98 °C</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Electronegativity (Pauling scale) measures how strongly an atom in a bond pulls shared electrons toward itself; it rises across a period and falls down a group.',
        'ΔEN < 0.4 → non-polar covalent, 0.4–1.7 → polar covalent, > 1.7 → ionic is a guideline, not a law; HF (1.78) is molecular and AlCl₃ (1.55) has strong covalent character.',
        'Ionic bonding transfers electrons to make ions; the formula balances charges (Mg²⁺ with 2 Cl⁻ → MgCl₂, 2 Al³⁺ with 3 O²⁻ → Al₂O₃).',
        'Covalent bonding shares pairs; the bond order equals the number of shared pairs (Cl–Cl 1, O=O 2, N≡N 3).',
        'Metallic bonding is a lattice of cations in a sea of delocalised electrons, which is why metals conduct as solids and bend without breaking.',
        'Bond type predicts properties: ionic → high m.p., conducts only when molten or dissolved; molecular covalent → low m.p., non-conductor; metallic → conductor in all states.',
      ],
      id: [
        'Keelektronegatifan (skala Pauling) mengukur seberapa kuat atom dalam ikatan menarik elektron bersama ke dirinya; nilainya naik sepanjang periode dan turun sepanjang golongan.',
        'ΔEN < 0,4 → kovalen nonpolar, 0,4–1,7 → kovalen polar, > 1,7 → ion adalah pedoman, bukan hukum; HF (1,78) bersifat molekuler dan AlCl₃ (1,55) berkarakter kovalen kuat.',
        'Ikatan ion memindahkan elektron untuk membentuk ion; rumusnya menyeimbangkan muatan (Mg²⁺ dengan 2 Cl⁻ → MgCl₂, 2 Al³⁺ dengan 3 O²⁻ → Al₂O₃).',
        'Ikatan kovalen memakai pasangan elektron bersama; orde ikatan sama dengan jumlah pasangan yang dipakai bersama (Cl–Cl 1, O=O 2, N≡N 3).',
        'Ikatan logam adalah kisi kation dalam lautan elektron terdelokalisasi, sehingga logam menghantarkan listrik saat padat dan dapat dibengkokkan tanpa patah.',
        'Jenis ikatan memprediksi sifat: ion → titik leleh tinggi, menghantar hanya saat meleleh atau larut; kovalen molekuler → titik leleh rendah, nonkonduktor; logam → konduktor dalam semua wujud.',
      ],
    },
    vocabulary: {
      en: [
        ['Electronegativity (EN)', 'The tendency of a bonded atom to attract shared electrons; dimensionless on the Pauling scale, from 0.79 (Cs) to 3.98 (F).'],
        ['Ionic bond', 'Electrostatic attraction between oppositely charged ions formed when one atom transfers electrons to another.'],
        ['Covalent bond', 'A bond in which two atoms share one or more pairs of electrons; single, double or triple according to the number of pairs.'],
        ['Polar covalent bond', 'A covalent bond whose shared pair is pulled toward the more electronegative atom, giving partial charges δ+ and δ−.'],
        ['Metallic bond', 'Attraction between a lattice of metal cations and the delocalised electrons that move freely among them.'],
        ['Lattice', 'The regular, repeating three-dimensional arrangement of ions (or atoms) in a crystalline solid.'],
      ],
      id: [
        ['Keelektronegatifan (EN)', 'Kecenderungan atom yang berikatan untuk menarik elektron bersama; tanpa satuan pada skala Pauling, dari 0,79 (Cs) hingga 3,98 (F).'],
        ['Ikatan ion', 'Tarikan elektrostatik antara ion bermuatan berlawanan yang terbentuk ketika satu atom memindahkan elektron ke atom lain.'],
        ['Ikatan kovalen', 'Ikatan ketika dua atom memakai bersama satu atau lebih pasangan elektron; tunggal, rangkap dua, atau rangkap tiga sesuai jumlah pasangan.'],
        ['Ikatan kovalen polar', 'Ikatan kovalen yang pasangan elektronnya tertarik ke atom yang lebih elektronegatif, menghasilkan muatan parsial δ+ dan δ−.'],
        ['Ikatan logam', 'Tarikan antara kisi kation logam dan elektron terdelokalisasi yang bergerak bebas di antaranya.'],
        ['Kisi', 'Susunan tiga dimensi yang teratur dan berulang dari ion (atau atom) dalam padatan kristal.'],
      ],
    },
    misconceptions: {
      en: [
        ['ΔEN above 1.7 always means the compound is ionic.', 'Not without a metal. HF (ΔEN 1.78), BF₃ (1.94) and SiF₄ (2.08) are all molecular covalent compounds. The 1.7 line works best for metal + non-metal pairs.'],
        ['In NaCl, one Na atom is bonded to one Cl atom as a molecule.', 'There are no NaCl molecules in the solid. Each Na⁺ is surrounded by six Cl⁻ and vice versa in a giant lattice; the formula gives only the ratio of ions.'],
        ['Ionic compounds conduct electricity because they contain charged ions.', 'Only when the ions can move. Solid NaCl is an insulator because the ions are locked in the lattice; molten or dissolved NaCl conducts well.'],
        ['Covalent bonds are weaker than ionic bonds, which is why covalent substances melt at low temperatures.', 'A C–C or H–O covalent bond is as strong as many ionic attractions. Molecular substances melt easily because melting breaks only the weak forces between molecules, not the covalent bonds inside them; diamond, a covalent network, melts above 3500 °C.'],
      ],
      id: [
        ['ΔEN di atas 1,7 selalu berarti senyawanya ionik.', 'Tidak jika tanpa logam. HF (ΔEN 1,78), BF₃ (1,94), dan SiF₄ (2,08) semuanya senyawa kovalen molekuler. Garis 1,7 paling cocok untuk pasangan logam + nonlogam.'],
        ['Dalam NaCl, satu atom Na berikatan dengan satu atom Cl sebagai molekul.', 'Tidak ada molekul NaCl dalam padatannya. Setiap Na⁺ dikelilingi enam Cl⁻ dan sebaliknya dalam kisi raksasa; rumus hanya memberikan perbandingan ion.'],
        ['Senyawa ion menghantarkan listrik karena mengandung ion bermuatan.', 'Hanya jika ionnya dapat bergerak. NaCl padat adalah isolator karena ionnya terkunci dalam kisi; NaCl lelehan atau larutan menghantar dengan baik.'],
        ['Ikatan kovalen lebih lemah daripada ikatan ion, itulah sebabnya zat kovalen meleleh pada suhu rendah.', 'Ikatan kovalen C–C atau H–O sekuat banyak tarikan ion. Zat molekuler mudah meleleh karena pelelehan hanya memutus gaya lemah antarmolekul, bukan ikatan kovalen di dalamnya; intan, jaringan kovalen, meleleh di atas 3500 °C.'],
      ],
    },
    realWorld: {
      en: [
        'Table salt (NaCl, ionic, m.p. 801 °C) dissolves in water and the solution conducts, which is why seawater is a far better conductor than pure water.',
        'Cooking oil and petrol are non-polar covalent molecules; they do not mix with water and are insulators, so spilled fuel does not short out electrical circuits.',
        'Copper wiring relies on metallic bonding: the delocalised electrons carry current, and the same mobility lets copper be drawn into thin wire.',
        'Aluminium chloride, AlCl₃, is used as a catalyst in organic chemistry precisely because its bonding is covalent enough for it to dissolve in organic solvents.',
        'Hydrofluoric acid, HF, etches glass. Its bond is polar covalent despite ΔEN 1.78, so it is a gas at 25 °C rather than a crystalline salt.',
      ],
      id: [
        'Garam dapur (NaCl, ion, titik leleh 801 °C) larut dalam air dan larutannya menghantar listrik, sehingga air laut jauh lebih konduktif daripada air murni.',
        'Minyak goreng dan bensin adalah molekul kovalen nonpolar; keduanya tidak bercampur dengan air dan bersifat isolator, sehingga tumpahan bahan bakar tidak membuat rangkaian listrik terhubung singkat.',
        'Kabel tembaga mengandalkan ikatan logam: elektron terdelokalisasi membawa arus, dan mobilitas yang sama memungkinkan tembaga ditarik menjadi kawat tipis.',
        'Aluminium klorida, AlCl₃, dipakai sebagai katalis dalam kimia organik justru karena ikatannya cukup kovalen sehingga larut dalam pelarut organik.',
        'Asam fluorida, HF, mengetsa kaca. Ikatannya kovalen polar meskipun ΔEN 1,78, sehingga berwujud gas pada 25 °C, bukan garam kristal.',
      ],
    },
    questions: {
      en: [
        { q: 'Mg (EN 1.31) pairs with O (EN 3.44). Calculate ΔEN, predict the bond type, and write the formula with ion charges.', a: 'ΔEN = 3.44 − 1.31 = 2.13 > 1.7 and a metal is present, so the bond is ionic. Mg loses 2 electrons (Mg²⁺) and O gains 2 (O²⁻); charges balance 1:1, so the formula is MgO.' },
        { q: 'H (2.20) and F (3.98) give ΔEN = 1.78, above the 1.7 line. Why does the sim still call HF polar covalent?', a: 'No metal is present. Both atoms are non-metals that hold their electrons tightly, so they share a pair rather than transfer it. The shared pair sits strongly toward F, making HF a very polar molecule, but it is still molecular: HF boils at 20 °C, whereas ionic solids melt at hundreds of degrees.' },
        { q: 'Which of these should conduct electricity when solid: NaCl, Cu, Cl₂, SiO₂? Explain using the bonding model.', a: 'Only Cu. Its delocalised electron sea carries charge. Solid NaCl has ions that cannot move, Cl₂ is a molecular substance with no free charges, and SiO₂ is a covalent network with all electrons locked in bonds.' },
        { q: 'Predict the order of ΔEN for Li–F, Na–F and K–F, and explain the trend from the periodic table.', a: 'K–F (3.16) > Na–F (3.05) > Li–F (3.00). Electronegativity falls down group 1 (Li 0.98, Na 0.93, K 0.82) because the valence electron is farther from the nucleus and better shielded, so the difference from F grows.' },
      ],
      id: [
        { q: 'Mg (EN 1,31) berpasangan dengan O (EN 3,44). Hitung ΔEN, prediksi jenis ikatan, dan tuliskan rumus beserta muatan ionnya.', a: 'ΔEN = 3,44 − 1,31 = 2,13 > 1,7 dan ada logam, sehingga ikatannya ion. Mg melepas 2 elektron (Mg²⁺) dan O menerima 2 (O²⁻); muatan seimbang 1:1, jadi rumusnya MgO.' },
        { q: 'H (2,20) dan F (3,98) memberi ΔEN = 1,78, di atas garis 1,7. Mengapa simulasi tetap menyebut HF kovalen polar?', a: 'Tidak ada logam. Kedua atom adalah nonlogam yang memegang elektronnya erat, sehingga keduanya memakai bersama satu pasangan, bukan memindahkannya. Pasangan itu sangat condong ke F, membuat HF molekul yang sangat polar, tetapi tetap molekuler: HF mendidih pada 20 °C, sedangkan padatan ion meleleh pada ratusan derajat.' },
        { q: 'Mana yang menghantarkan listrik saat padat: NaCl, Cu, Cl₂, SiO₂? Jelaskan dengan model ikatan.', a: 'Hanya Cu. Lautan elektron terdelokalisasinya membawa muatan. NaCl padat memiliki ion yang tidak dapat bergerak, Cl₂ zat molekuler tanpa muatan bebas, dan SiO₂ jaringan kovalen dengan semua elektron terkunci dalam ikatan.' },
        { q: 'Prediksi urutan ΔEN untuk Li–F, Na–F, dan K–F, dan jelaskan kecenderungannya dari tabel periodik.', a: 'K–F (3,16) > Na–F (3,05) > Li–F (3,00). Keelektronegatifan turun sepanjang golongan 1 (Li 0,98, Na 0,93, K 0,82) karena elektron valensi makin jauh dari inti dan lebih terperisai, sehingga selisihnya dengan F makin besar.' },
      ],
    },
  },
};
