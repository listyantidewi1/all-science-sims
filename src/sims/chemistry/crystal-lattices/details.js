// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the four common metallic crystal structures.',
      'Compute coordination number and packing fraction.',
      'Connect lattice type to material name.',
    ],
    id: [
      'Mengenali empat struktur kristal logam yang umum.',
      'Menghitung bilangan koordinasi dan fraksi kemasan.',
      'Mengaitkan jenis kisi dengan nama material.',
    ],
  },
  tryThis: {
    en: [
      'Compare BCC vs FCC packing — which is denser?',
      'Find the coordination number of FCC.',
      'Hexagonal close-packed shares packing fraction with FCC — see why.',
    ],
    id: [
      'Bandingkan kemasan BCC vs FCC — mana lebih rapat?',
      'Temukan bilangan koordinasi FCC.',
      'Heksagonal tumpukan-padat berbagi fraksi kemasan dengan FCC — lihat mengapa.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A metal is a vast, orderly stack of identical atoms held together by a shared sea of electrons. Because the attraction is the same in every direction, the atoms behave like hard spheres trying to pack as closely as they can. The whole crystal can be described by one small repeating box, the unit cell: copy it in all three directions and you rebuild the entire solid. The sim draws a single unit cell as blue spheres on a faint cube, and you can drag or auto-rotate it to see how the atoms sit in space.',
        'Three cubic arrangements cover most metals. Simple cubic (SC) puts an atom only at the eight corners; each corner is shared by eight cells, so the cell holds 8 × 1/8 = 1 atom, every atom touches 6 neighbours, and only 52% of the space is filled. Body-centered cubic (BCC, iron and chromium) adds one atom in the middle: 2 atoms per cell, coordination number 8, 68% filled. Face-centered cubic (FCC, copper, aluminium, gold) adds an atom to the centre of each of the six faces instead: 1 + 6 × 1/2 = 4 atoms per cell, coordination number 12, and 74% filled, the densest packing possible for equal spheres.',
        'The packing fraction can be derived with geometry. In FCC the spheres touch along a face diagonal, so √2·a = 4r and a = 2√2·r; four spheres of volume (4/3)πr³ in a cube of volume a³ gives π/(3√2) ≈ 0.74. In BCC they touch along the body diagonal, √3·a = 4r, and two spheres give π√3/8 ≈ 0.68. Hexagonal close-packed (HCP, magnesium, titanium, zinc) is the other way to reach 74% and coordination 12: both FCC and HCP are stacks of the same close-packed layers, but FCC repeats the layer positions as ABCABC while HCP alternates ABAB.',
        'The sim is a geometric model and leaves out a lot. The spheres are drawn far smaller than real atoms so the inside of the cell stays visible; their sizes are scaled in proportion to the contact radius of each lattice (a/2 for SC, √3a/4 for BCC, √2a/4 for FCC), but you cannot read the touching distances from the picture; atoms are shown as perfect hard balls with no vibration; and the figures for coordination number and packing fraction are looked up, not computed from the drawing. The HCP view is a simplified seven-atom hexagonal prism rather than the full crystallographic cell, and it is drawn inside the same cube outline as the others. Real metals also contain vacancies, grain boundaries and impurities that the perfect lattice ignores, and these defects are what make a metal easy or hard to bend.',
      ],
      id: [
        'Logam adalah tumpukan rapi atom-atom identik dalam jumlah sangat besar yang disatukan oleh lautan elektron bersama. Karena tarikannya sama ke segala arah, atom berperilaku seperti bola keras yang berusaha berjejal serapat mungkin. Seluruh kristal dapat digambarkan oleh satu kotak kecil yang berulang, yaitu sel satuan: salin kotak itu ke tiga arah dan kamu membangun kembali seluruh zat padatnya. Simulasi menggambar satu sel satuan sebagai bola biru pada kubus tipis, dan kamu bisa menyeret atau memutarnya otomatis untuk melihat bagaimana atom duduk dalam ruang.',
        'Tiga susunan kubik mencakup sebagian besar logam. Kubik sederhana (SC) hanya menempatkan atom di delapan sudut; setiap sudut dibagi oleh delapan sel, sehingga satu sel memuat 8 × 1/8 = 1 atom, setiap atom menyentuh 6 tetangga, dan hanya 52% ruang yang terisi. Kubik berpusat-badan (BCC, besi dan kromium) menambahkan satu atom di tengah: 2 atom per sel, bilangan koordinasi 8, 68% terisi. Kubik berpusat-muka (FCC, tembaga, aluminium, emas) justru menambahkan atom di pusat tiap-tiap dari enam mukanya: 1 + 6 × 1/2 = 4 atom per sel, bilangan koordinasi 12, dan 74% terisi, kemasan paling rapat yang mungkin untuk bola-bola berukuran sama.',
        'Fraksi kemasan dapat diturunkan dengan geometri. Pada FCC bola-bola bersentuhan sepanjang diagonal muka, sehingga √2·a = 4r dan a = 2√2·r; empat bola bervolume (4/3)πr³ dalam kubus bervolume a³ memberi π/(3√2) ≈ 0,74. Pada BCC bola bersentuhan sepanjang diagonal badan, √3·a = 4r, dan dua bola memberi π√3/8 ≈ 0,68. Heksagonal tumpukan-padat (HCP, magnesium, titanium, seng) adalah cara lain mencapai 74% dan koordinasi 12: FCC dan HCP sama-sama tumpukan lapisan rapat yang serupa, tetapi FCC mengulang posisi lapisan sebagai ABCABC sedangkan HCP berselang-seling ABAB.',
        'Simulasi ini model geometris dan banyak hal ditinggalkan. Bola digambar jauh lebih kecil daripada atom sungguhan agar bagian dalam sel tetap terlihat; ukurannya diskalakan sebanding dengan jari-jari sentuh tiap kisi (a/2 untuk SC, √3a/4 untuk BCC, √2a/4 untuk FCC), tetapi jarak sentuh tidak bisa dibaca dari gambarnya; atom ditampilkan sebagai bola keras sempurna tanpa getaran; dan angka bilangan koordinasi serta fraksi kemasan diambil dari tabel, bukan dihitung dari gambar. Tampilan HCP adalah prisma heksagonal tujuh atom yang disederhanakan, bukan sel kristalografi lengkapnya, dan digambar di dalam garis kubus yang sama dengan yang lain. Logam sungguhan juga mengandung kekosongan, batas butir, dan pengotor yang diabaikan oleh kisi sempurna, dan cacat-cacat inilah yang membuat logam mudah atau sukar dibengkokkan.',
      ],
    },
    figure: {
      caption: {
        en: 'The three cubic unit cells. Corner atoms (blue) are shared by 8 cells, face atoms (green) by 2, and the body-centre atom (red) belongs to one cell, which gives 1, 2 and 4 atoms per cell. HCP reaches the same 74% as FCC by stacking the same close-packed layers in an ABAB pattern.',
        id: 'Tiga sel satuan kubik. Atom sudut (biru) dibagi oleh 8 sel, atom muka (hijau) oleh 2, dan atom pusat badan (merah) milik satu sel, sehingga diperoleh 1, 2, dan 4 atom per sel. HCP mencapai 74% yang sama dengan FCC dengan menumpuk lapisan rapat yang sama dalam pola ABAB.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cube = (x, y) => `<path class="m" d="M${x} ${y} h50 v50 h-50 z M${x + 18} ${y - 18} h50 v50 h-50 z M${x} ${y} l18 -18 M${x + 50} ${y} l18 -18 M${x + 50} ${y + 50} l18 -18 M${x} ${y + 50} l18 -18"/>`;
        const corners = (x, y) => [[0, 0], [50, 0], [50, 50], [0, 50], [18, -18], [68, -18], [68, 32], [18, 32]]
          .map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="5.5" fill="#3b82f6"/>`).join('');
        const faces = (x, y) => [[25, 25], [43, 7], [34, -9], [34, 41], [9, 16], [59, 16]]
          .map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="5.5" fill="#10b981"/>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Simple cubic, body-centered cubic and face-centered cubic unit cells', 'Sel satuan kubik sederhana, kubik berpusat-badan, dan kubik berpusat-muka')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.6}.s{font-size:10px}.t{font-weight:700}</style>
  ${cube(30, 70)}${corners(30, 70)}
  ${cube(150, 70)}${corners(150, 70)}<circle cx="184" cy="86" r="5.5" fill="#ef4444"/>
  ${cube(270, 70)}${corners(270, 70)}${faces(270, 70)}
  <text x="24" y="38" class="t">${L('Simple cubic', 'Kubik sederhana')}</text>
  <text x="150" y="38" class="t">${L('Body-centered', 'Berpusat-badan')}</text>
  <text x="270" y="38" class="t">${L('Face-centered', 'Berpusat-muka')}</text>
  <text x="24" y="146" class="s">1 ${L('atom per cell', 'atom per sel')}</text>
  <text x="24" y="160" class="s">${L('coordination', 'koordinasi')} 6</text>
  <text x="24" y="174" class="s">${L('packing', 'kemasan')} 52%</text>
  <text x="24" y="188" class="s">Po</text>
  <text x="150" y="146" class="s">2 ${L('atoms per cell', 'atom per sel')}</text>
  <text x="150" y="160" class="s">${L('coordination', 'koordinasi')} 8</text>
  <text x="150" y="174" class="s">${L('packing', 'kemasan')} 68%</text>
  <text x="150" y="188" class="s">Fe, Cr, W</text>
  <text x="270" y="146" class="s">4 ${L('atoms per cell', 'atom per sel')}</text>
  <text x="270" y="160" class="s">${L('coordination', 'koordinasi')} 12</text>
  <text x="270" y="174" class="s">${L('packing', 'kemasan')} 74%</text>
  <text x="270" y="188" class="s">Cu, Al, Au</text>
  <text x="24" y="214" class="s" fill="#8b5cf6">${L('HCP (Mg, Ti, Zn): also 12 neighbours and 74%; layers stacked ABAB instead of FCC\'s ABCABC', 'HCP (Mg, Ti, Zn): juga 12 tetangga dan 74%; lapisan ditumpuk ABAB, bukan ABCABC seperti FCC')}</text>
  <text x="24" y="232" class="s">${L('atoms touch along: edge (SC), body diagonal (BCC), face diagonal (FCC)', 'atom bersentuhan sepanjang: rusuk (SC), diagonal badan (BCC), diagonal muka (FCC)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A crystal is a repeating pattern, and the unit cell is the smallest box that reproduces it when copied in three directions.',
        'Atoms on corners, faces and edges are shared between cells, so SC, BCC and FCC hold 1, 2 and 4 atoms per cell.',
        'Coordination number counts nearest neighbours: 6 for SC, 8 for BCC, 12 for FCC and HCP.',
        'Packing fraction is the share of volume filled by atoms: 52% (SC), 68% (BCC) and 74% (FCC and HCP), the maximum for equal spheres.',
        'FCC and HCP are both close-packed; they differ only in how the identical layers are stacked (ABCABC vs ABAB).',
      ],
      id: [
        'Kristal adalah pola berulang, dan sel satuan adalah kotak terkecil yang mereproduksinya ketika disalin ke tiga arah.',
        'Atom di sudut, muka, dan rusuk dibagi antar-sel, sehingga SC, BCC, dan FCC memuat 1, 2, dan 4 atom per sel.',
        'Bilangan koordinasi menghitung tetangga terdekat: 6 untuk SC, 8 untuk BCC, 12 untuk FCC dan HCP.',
        'Fraksi kemasan adalah bagian volume yang terisi atom: 52% (SC), 68% (BCC), dan 74% (FCC dan HCP), nilai maksimum untuk bola berukuran sama.',
        'FCC dan HCP sama-sama tumpukan rapat; perbedaannya hanya pada cara lapisan identik ditumpuk (ABCABC vs ABAB).',
      ],
    },
    vocabulary: {
      en: [
        ['Unit cell', 'The smallest repeating block of a crystal; its edge length a is the lattice parameter.'],
        ['Lattice', 'The regular three-dimensional array of points on which the atoms of a crystal sit.'],
        ['Coordination number', 'The number of nearest neighbours touching a given atom.'],
        ['Packing fraction', 'The fraction of the unit cell volume occupied by atoms, treating them as hard spheres.'],
        ['Body-centered cubic (BCC)', 'Cubic cell with atoms at the corners and one at the centre; 2 atoms per cell.'],
        ['Face-centered cubic (FCC)', 'Cubic cell with atoms at the corners and at the centre of each face; 4 atoms per cell.'],
        ['Hexagonal close-packed (HCP)', 'Close-packed layers stacked ABAB in a hexagonal cell; the same density as FCC.'],
        ['Close packing', 'The densest possible arrangement of equal spheres, 74% full, in which each sphere touches 12 others.'],
      ],
      id: [
        ['Sel satuan', 'Blok berulang terkecil dari kristal; panjang rusuknya a disebut parameter kisi.'],
        ['Kisi', 'Susunan titik tiga dimensi yang teratur tempat atom-atom kristal berada.'],
        ['Bilangan koordinasi', 'Jumlah tetangga terdekat yang menyentuh suatu atom.'],
        ['Fraksi kemasan', 'Bagian volume sel satuan yang ditempati atom, dengan menganggap atom sebagai bola keras.'],
        ['Kubik berpusat-badan (BCC)', 'Sel kubik dengan atom di sudut-sudut dan satu di pusat; 2 atom per sel.'],
        ['Kubik berpusat-muka (FCC)', 'Sel kubik dengan atom di sudut-sudut dan di pusat tiap muka; 4 atom per sel.'],
        ['Heksagonal tumpukan-padat (HCP)', 'Lapisan rapat yang ditumpuk ABAB dalam sel heksagonal; kerapatannya sama dengan FCC.'],
        ['Tumpukan rapat', 'Susunan terpadat yang mungkin untuk bola berukuran sama, 74% terisi, dengan setiap bola menyentuh 12 bola lain.'],
      ],
    },
    misconceptions: {
      en: [
        ['A unit cell with 8 corner atoms contains 8 atoms.', 'Each corner atom is shared by eight neighbouring cells, so only one eighth of it belongs to this cell. Eight corners add up to just one atom.'],
        ['Adding more atoms to the cell always makes the packing denser.', 'Density depends on how the atoms touch, not on how many are drawn. BCC has 2 atoms per cell but packs 68%; the 4-atom FCC cell packs 74% because its atoms touch along face diagonals.'],
        ['A heavier metal must have a more tightly packed lattice.', 'Density in kg/m³ depends on atomic mass and atomic radius as well as packing. Lead (FCC) is dense mainly because its atoms are heavy, while aluminium has the same FCC lattice and is light.'],
        ['The spheres in the sim show how big the atoms really are relative to the cell.', 'The sim draws all atoms at one fixed size for clarity. In the real structures the atoms touch their nearest neighbours, which is exactly what fixes the packing fraction.'],
      ],
      id: [
        ['Sel satuan dengan 8 atom sudut berisi 8 atom.', 'Setiap atom sudut dibagi oleh delapan sel tetangga, jadi hanya seperdelapannya milik sel ini. Delapan sudut hanya berjumlah satu atom.'],
        ['Menambah atom ke dalam sel selalu membuat kemasan lebih rapat.', 'Kerapatan bergantung pada cara atom bersentuhan, bukan pada jumlah yang digambar. BCC punya 2 atom per sel tetapi terisi 68%; sel FCC dengan 4 atom terisi 74% karena atomnya bersentuhan sepanjang diagonal muka.'],
        ['Logam yang lebih berat pasti memiliki kisi yang lebih rapat.', 'Massa jenis dalam kg/m³ bergantung pada massa atom dan jari-jari atom, selain kemasan. Timbal (FCC) padat terutama karena atomnya berat, sedangkan aluminium berkisi FCC yang sama tetapi ringan.'],
        ['Bola di simulasi menunjukkan ukuran atom yang sebenarnya relatif terhadap sel.', 'Simulasi menggambar semua atom dengan satu ukuran tetap agar jelas. Pada struktur sungguhan atom bersentuhan dengan tetangga terdekatnya, dan itulah yang menentukan fraksi kemasan.'],
      ],
    },
    realWorld: {
      en: [
        'Steel-making depends on iron changing lattice: BCC at room temperature, FCC above about 910 °C, and back to BCC on cooling, which lets carbon be trapped in different ways when the metal is quenched.',
        'FCC metals such as copper, aluminium and gold can be hammered into thin foil because their close-packed planes slide over each other easily; HCP metals like magnesium and titanium are stronger but more brittle.',
        'X-ray diffraction measures lattice parameters to a fraction of a picometre, and was how the structures of metals, salts and eventually DNA were determined.',
        'Tin "pest" and other phase changes happen when a metal switches lattice type at low temperature; historical organ pipes and tin buttons crumbled in cold winters for this reason.',
      ],
      id: [
        'Pembuatan baja bergantung pada perubahan kisi besi: BCC pada suhu kamar, FCC di atas sekitar 910 °C, dan kembali ke BCC saat mendingin, yang memungkinkan karbon terperangkap dengan cara berbeda ketika logam dicelup cepat.',
        'Logam FCC seperti tembaga, aluminium, dan emas bisa ditempa menjadi lembaran tipis karena bidang-bidang rapatnya mudah saling bergeser; logam HCP seperti magnesium dan titanium lebih kuat tetapi lebih getas.',
        'Difraksi sinar-X mengukur parameter kisi hingga sepersekian pikometer, dan inilah cara struktur logam, garam, dan akhirnya DNA ditentukan.',
        '"Hama timah" dan perubahan fase lain terjadi ketika logam berganti jenis kisi pada suhu rendah; pipa organ dan kancing timah kuno hancur pada musim dingin yang parah karena hal ini.',
      ],
    },
    questions: {
      en: [
        { q: 'Copper is FCC with lattice parameter a = 0.361 nm. What is the radius of a copper atom?', a: 'In FCC atoms touch along the face diagonal: √2·a = 4r, so r = √2·a/4 = 1.414 × 0.361 / 4 ≈ 0.128 nm.' },
        { q: 'Why do FCC and HCP have exactly the same packing fraction even though their unit cells look completely different?', a: 'Both are built from identical close-packed layers in which each sphere touches six in-plane neighbours and three in each adjacent layer. The only difference is whether the third layer sits over the first (ABAB, HCP) or in a new position (ABCABC, FCC); the fraction of filled space is the same in both.' },
        { q: 'A BCC cell of iron has a = 0.287 nm. How many atoms does it contain, and what is the volume per atom?', a: 'BCC holds 8 × 1/8 + 1 = 2 atoms. The cell volume is a³ = (0.287 nm)³ ≈ 0.0236 nm³, so each atom occupies about 0.0118 nm³ of the crystal.' },
      ],
      id: [
        { q: 'Tembaga berkisi FCC dengan parameter kisi a = 0,361 nm. Berapa jari-jari atom tembaga?', a: 'Pada FCC atom bersentuhan sepanjang diagonal muka: √2·a = 4r, sehingga r = √2·a/4 = 1,414 × 0,361 / 4 ≈ 0,128 nm.' },
        { q: 'Mengapa FCC dan HCP memiliki fraksi kemasan yang persis sama meskipun sel satuannya tampak sangat berbeda?', a: 'Keduanya dibangun dari lapisan rapat identik yang setiap bolanya menyentuh enam tetangga sebidang dan tiga di tiap lapisan yang berdekatan. Satu-satunya perbedaan adalah apakah lapisan ketiga berada di atas lapisan pertama (ABAB, HCP) atau di posisi baru (ABCABC, FCC); bagian ruang yang terisi sama pada keduanya.' },
        { q: 'Sel BCC besi memiliki a = 0,287 nm. Berapa atom yang dikandungnya, dan berapa volume per atom?', a: 'BCC memuat 8 × 1/8 + 1 = 2 atom. Volume sel a³ = (0,287 nm)³ ≈ 0,0236 nm³, sehingga setiap atom menempati sekitar 0,0118 nm³ dari kristal.' },
      ],
    },
  },
};
