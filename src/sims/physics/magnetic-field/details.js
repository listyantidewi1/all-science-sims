// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply B = μ₀I / (2πr).',
      'Use right-hand rule: thumb along current, fingers curl in field direction.',
      'See B fall off as 1/r from the wire.',
    ],
    id: [
      'Menerapkan B = μ₀I / (2πr).',
      'Menggunakan aturan tangan kanan: ibu jari sepanjang arus, jari melengkung di arah medan.',
      'Melihat B menurun sebagai 1/r dari kawat.',
    ],
  },
  tryThis: {
    en: [
      'Double current — does field strength double?',
      'Move twice as far away — half the field?',
      'Flip current direction — does field flip too?',
    ],
    id: [
      'Gandakan arus — apakah kuat medan menjadi dua kali lipat?',
      'Bergerak dua kali lebih jauh — setengah medan?',
      'Balikkan arah arus — apakah medan ikut berbalik?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In 1820 Hans Christian Ørsted noticed that a compass needle swings when a nearby wire carries current. Moving charges create a magnetic field, and for a long straight wire that field has a surprising shape: it does not point toward or away from the wire but wraps around it in circles. At every point the field is tangent to a circle centred on the wire. The direction follows the right-hand rule: point your right thumb along the current and your curled fingers show which way the field circulates. Seen end-on with the current coming toward you, the field runs counterclockwise; with the current going away from you, it runs clockwise.',
        'The strength of the field at a distance r from a long straight wire is B = μ₀I/(2πr), where μ₀ = 4π × 10⁻⁷ T·m/A is the permeability of free space. The field is proportional to the current and inversely proportional to the distance: double I and B doubles, double r and B halves. This is a 1/r law, gentler than the 1/r² of gravity or point charges, because the field comes from the whole infinitely long line of current rather than from a single point.',
        'The simulation shows the wire end-on as a yellow disc: a dot means the current is coming out of the screen toward you, a cross means it is going in. Arrows mark the field direction at many points and their length and brightness grow with B; the faint rings are field lines. Move the pointer over the canvas and the green probe reports B at that spot in microtesla, using the scale 100 pixels = 1 metre. With the default 5 A, the field 1 m from the wire is just 1 µT, far weaker than Earth\'s field of about 25 to 65 µT, which is why you need many turns of wire, or a much smaller distance, to make a useful electromagnet.',
        'The formula assumes an infinitely long, perfectly straight, thin wire with a steady current, and it applies only outside the wire; inside a real wire the field grows from zero at the centre. The simulation also ignores Earth\'s own field and any other currents nearby, and it caps the arrow length near the wire so the picture stays readable, so arrow length is only a rough guide to B very close to the wire. Use the probe for actual values.',
      ],
      id: [
        'Pada 1820 Hans Christian Ørsted memperhatikan bahwa jarum kompas bergerak ketika kawat di dekatnya dialiri arus. Muatan yang bergerak menciptakan medan magnet, dan untuk kawat lurus panjang medan itu berbentuk mengejutkan: tidak mengarah ke kawat atau menjauhinya, melainkan melingkar mengitarinya. Di setiap titik medan menyinggung lingkaran yang berpusat di kawat. Arahnya mengikuti aturan tangan kanan: arahkan ibu jari kanan searah arus, maka jari-jari yang menggenggam menunjukkan arah putaran medan. Dilihat dari ujung dengan arus mendekati kita, medan berputar berlawanan arah jarum jam; dengan arus menjauhi kita, medan berputar searah jarum jam.',
        'Kuat medan pada jarak r dari kawat lurus panjang adalah B = μ₀I/(2πr), dengan μ₀ = 4π × 10⁻⁷ T·m/A adalah permeabilitas ruang hampa. Medan sebanding dengan arus dan berbanding terbalik dengan jarak: gandakan I maka B berlipat dua, gandakan r maka B menjadi setengahnya. Ini hukum 1/r, lebih landai daripada 1/r² pada gravitasi atau muatan titik, karena medan berasal dari seluruh garis arus yang panjangnya tak berhingga, bukan dari satu titik.',
        'Simulasi menampilkan kawat dari ujungnya sebagai cakram kuning: titik berarti arus keluar dari layar menuju kita, tanda silang berarti arus masuk ke layar. Panah-panah menandai arah medan di banyak titik dan panjang serta kecerahannya bertambah mengikuti B; cincin-cincin redup adalah garis medan. Gerakkan penunjuk di atas kanvas dan probe hijau melaporkan B di titik itu dalam mikrotesla, dengan skala 100 piksel = 1 meter. Dengan arus bawaan 5 A, medan pada jarak 1 m dari kawat hanya 1 µT, jauh lebih lemah daripada medan Bumi yang sekitar 25 sampai 65 µT; itulah sebabnya dibutuhkan banyak lilitan kawat, atau jarak yang jauh lebih dekat, untuk membuat elektromagnet yang berguna.',
        'Rumus ini mengasumsikan kawat tipis yang lurus sempurna, panjangnya tak berhingga, dan berarus tetap, dan hanya berlaku di luar kawat; di dalam kawat sungguhan medan tumbuh dari nol di pusat. Simulasi juga mengabaikan medan Bumi dan arus lain di sekitarnya, serta membatasi panjang panah di dekat kawat agar gambar tetap terbaca, sehingga panjang panah hanya petunjuk kasar untuk B di dekat kawat. Gunakan probe untuk nilai yang sebenarnya.',
      ],
    },
    figure: {
      caption: {
        en: 'Seen end-on, with the current coming out of the page (dot), the field circles the wire counterclockwise, as the right-hand rule predicts. The arrows shrink with distance because B falls as 1/r (graph on the right).',
        id: 'Dilihat dari ujung, dengan arus keluar dari bidang gambar (titik), medan melingkari kawat berlawanan arah jarum jam, sesuai aturan tangan kanan. Panah mengecil seiring jarak karena B turun sebagai 1/r (grafik di kanan).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Magnetic field circling a current-carrying wire', 'Medan magnet melingkari kawat berarus')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.b{stroke:#3b82f6;stroke-width:2.2;fill:none}.s{font-size:10px;opacity:.8}</style>
  <circle cx="110" cy="120" r="32" class="m"/>
  <circle cx="110" cy="120" r="64" class="m"/>
  <circle cx="110" cy="120" r="96" class="m"/>
  <circle cx="110" cy="120" r="9" fill="#f59e0b"/>
  <circle cx="110" cy="120" r="2.5" fill="currentColor"/>
  <text x="122" y="110" class="s">I ${L('out of page', 'keluar bidang')}</text>
  <line x1="142" y1="132" x2="142" y2="104" class="b" marker-end="url(#h)"/>
  <line x1="78" y1="108" x2="78" y2="136" class="b" marker-end="url(#h)"/>
  <line x1="124" y1="88" x2="96" y2="88" class="b" marker-end="url(#h)"/>
  <line x1="96" y1="152" x2="124" y2="152" class="b" marker-end="url(#h)"/>
  <line x1="174" y1="127" x2="174" y2="111" class="b" marker-end="url(#h)"/>
  <line x1="46" y1="113" x2="46" y2="129" class="b" marker-end="url(#h)"/>
  <line x1="118" y1="56" x2="102" y2="56" class="b" marker-end="url(#h)"/>
  <line x1="102" y1="184" x2="118" y2="184" class="b" marker-end="url(#h)"/>
  <line x1="206" y1="125" x2="206" y2="114" class="b" marker-end="url(#h)"/>
  <line x1="14" y1="115" x2="14" y2="126" class="b" marker-end="url(#h)"/>
  <line x1="116" y1="24" x2="105" y2="24" class="b" marker-end="url(#h)"/>
  <line x1="105" y1="216" x2="116" y2="216" class="b" marker-end="url(#h)"/>
  <line x1="110" y1="120" x2="155" y2="75" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 3"/>
  <text x="138" y="92" fill="#ef4444">r</text>
  <text x="150" y="60" fill="#3b82f6">B</text>
  <text x="14" y="236" class="s">${L('right hand: thumb = I, fingers = B', 'tangan kanan: ibu jari = I, jari = B')}</text>
  <line x1="236" y1="40" x2="236" y2="196" class="m"/>
  <line x1="236" y1="196" x2="346" y2="196" class="m" marker-end="url(#h)"/>
  <text x="222" y="50">B</text>
  <text x="338" y="212">r</text>
  <path d="M242 48 C246 140 280 182 346 188" stroke="#3b82f6" stroke-width="2.2" fill="none"/>
  <line x1="262" y1="196" x2="262" y2="108" class="m" stroke-dasharray="3 3"/>
  <line x1="288" y1="196" x2="288" y2="152" class="m" stroke-dasharray="3 3"/>
  <text x="258" y="208" class="s">r</text>
  <text x="282" y="208" class="s">2r</text>
  <text x="292" y="150" class="s">B/2</text>
  <text x="246" y="232" class="s">B = μ₀I/(2πr)</text>
  <defs><marker id="h" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'An electric current produces a magnetic field that circles the wire; the field lines are closed loops with no start or end.',
        'The right-hand rule gives the direction: thumb along the current, fingers curl along B.',
        'B = μ₀I/(2πr): the field is proportional to the current and falls off as 1/r with distance.',
        'Reversing the current reverses the field everywhere; it does not change its strength.',
        'The field of a single wire at everyday currents and distances is tiny compared with Earth\'s field, which is why coils with many turns are used in practice.',
      ],
      id: [
        'Arus listrik menghasilkan medan magnet yang melingkari kawat; garis-garis medannya berupa lintasan tertutup tanpa awal dan akhir.',
        'Aturan tangan kanan memberi arahnya: ibu jari searah arus, jari-jari menggenggam searah B.',
        'B = μ₀I/(2πr): medan sebanding dengan arus dan menurun sebagai 1/r terhadap jarak.',
        'Membalik arah arus membalik arah medan di semua tempat; kekuatannya tidak berubah.',
        'Medan dari satu kawat pada arus dan jarak sehari-hari sangat kecil dibanding medan Bumi, itulah sebabnya dalam praktik dipakai kumparan dengan banyak lilitan.',
      ],
    },
    vocabulary: {
      en: [
        ['Magnetic field (B)', 'The magnetic influence at a point, with a strength and a direction; measured in tesla (T). 1 µT is one millionth of a tesla.'],
        ['Field line', 'A line drawn so that the field is tangent to it everywhere; for a straight wire the field lines are circles.'],
        ['Right-hand rule', 'Thumb along the current, curled fingers along the magnetic field; a way to remember the direction of B.'],
        ['Permeability of free space (μ₀)', 'The constant 4π × 10⁻⁷ T·m/A that links current to the magnetic field it produces in vacuum.'],
        ['Dot and cross notation', 'A dot marks a current (or field) coming toward you, like an arrow tip; a cross marks one going away, like the arrow\'s tail feathers.'],
        ['Inverse proportionality', 'When one quantity doubles the other halves; here B and r.'],
      ],
      id: [
        ['Medan magnet (B)', 'Pengaruh magnet di suatu titik, memiliki besar dan arah; diukur dalam tesla (T). 1 µT adalah sepersejuta tesla.'],
        ['Garis medan', 'Garis yang digambar sehingga medan menyinggungnya di setiap titik; untuk kawat lurus garis medannya berupa lingkaran.'],
        ['Aturan tangan kanan', 'Ibu jari searah arus, jari-jari yang menggenggam searah medan magnet; cara mengingat arah B.'],
        ['Permeabilitas ruang hampa (μ₀)', 'Tetapan 4π × 10⁻⁷ T·m/A yang menghubungkan arus dengan medan magnet yang dihasilkannya di vakum.'],
        ['Notasi titik dan silang', 'Titik menandai arus (atau medan) yang mendekati kita, seperti ujung anak panah; silang menandai yang menjauhi kita, seperti bulu ekor anak panah.'],
        ['Berbanding terbalik', 'Jika satu besaran digandakan, yang lain menjadi setengahnya; di sini B dan r.'],
      ],
    },
    misconceptions: {
      en: [
        ['The magnetic field points away from the wire, like the electric field of a charge.', 'It wraps around the wire in circles. At any point it is perpendicular both to the wire and to the line from the wire to that point.'],
        ['Doubling the distance cuts the field to a quarter.', 'That is the inverse-square rule for point sources. A long straight wire gives a 1/r field, so doubling r halves B. The sim\'s probe lets you check this directly.'],
        ['A wire with no current still has a weak magnetic field.', 'Not from the current. Set I to 0 in the sim and every arrow disappears; a steady current is needed to make the field.'],
        ['Reversing the current makes the field weaker.', 'It only reverses the direction. The magnitude μ₀I/(2πr) depends on the size of I, not on its sign.'],
      ],
      id: [
        ['Medan magnet mengarah menjauhi kawat, seperti medan listrik sebuah muatan.', 'Medan melingkari kawat. Di titik mana pun medan tegak lurus terhadap kawat dan terhadap garis dari kawat ke titik itu.'],
        ['Menggandakan jarak memperkecil medan menjadi seperempat.', 'Itu aturan kuadrat terbalik untuk sumber titik. Kawat lurus panjang memberi medan 1/r, sehingga menggandakan r membuat B setengahnya. Probe di simulasi memungkinkan kamu memeriksanya langsung.'],
        ['Kawat tanpa arus tetap memiliki medan magnet lemah.', 'Tidak dari arusnya. Atur I ke 0 di simulasi dan semua panah hilang; dibutuhkan arus tetap untuk menghasilkan medan.'],
        ['Membalik arah arus membuat medan lebih lemah.', 'Hanya arahnya yang berbalik. Besarnya, μ₀I/(2πr), bergantung pada besar I, bukan pada tandanya.'],
      ],
    },
    realWorld: {
      en: [
        'A compass placed next to a current-carrying wire deflects, which is exactly how Ørsted discovered electromagnetism in 1820 and how simple classroom ammeters once worked.',
        'Coiling a wire into a solenoid stacks the fields of many turns, producing the strong, uniform fields used in electromagnets, relays and MRI scanners.',
        'High-voltage power lines create measurable fields of a few microtesla directly beneath them, comparable to the field a few centimetres from a household appliance.',
        'Clamp meters measure the current in a cable without cutting it by sensing the circular magnetic field around the conductor.',
      ],
      id: [
        'Kompas yang diletakkan di dekat kawat berarus menyimpang; begitulah Ørsted menemukan elektromagnetisme pada 1820 dan begitulah amperemeter sederhana di kelas dulu bekerja.',
        'Menggulung kawat menjadi solenoida menumpuk medan dari banyak lilitan, menghasilkan medan kuat dan seragam yang dipakai pada elektromagnet, relai, dan pemindai MRI.',
        'Saluran listrik tegangan tinggi menciptakan medan terukur beberapa mikrotesla tepat di bawahnya, sebanding dengan medan beberapa sentimeter dari peralatan rumah tangga.',
        'Tang ampere mengukur arus dalam kabel tanpa memutusnya dengan mendeteksi medan magnet melingkar di sekitar penghantar.',
      ],
    },
    questions: {
      en: [
        { q: 'A long straight wire carries 10 A. What is the magnetic field 0.5 m away?', a: 'B = μ₀I/(2πr) = (4π × 10⁻⁷ × 10)/(2π × 0.5) = 4 × 10⁻⁶ T = 4 µT. In the sim, set I = 10 A and hold the probe 50 pixels from the wire to check.' },
        { q: 'At one point the field is 2 µT. Where would you find a field of 0.5 µT with the same current?', a: 'At four times the distance. B falls as 1/r, so quartering B requires multiplying r by 4. Doubling the distance would only halve the field, to 1 µT.' },
        { q: 'Looking at the sim with the current coming toward you, which way should the field arrows circulate on the right-hand side of the wire, and why?', a: 'Upward on screen, part of a counterclockwise loop. Point your right thumb toward yourself: your fingers curl counterclockwise. Reasoning from the vector rule, with current toward you and the position to the right, the field is perpendicular to both, pointing up.' },
      ],
      id: [
        { q: 'Kawat lurus panjang mengalirkan arus 10 A. Berapa medan magnet pada jarak 0,5 m?', a: 'B = μ₀I/(2πr) = (4π × 10⁻⁷ × 10)/(2π × 0,5) = 4 × 10⁻⁶ T = 4 µT. Di simulasi, atur I = 10 A dan letakkan probe 50 piksel dari kawat untuk memeriksanya.' },
        { q: 'Di suatu titik medannya 2 µT. Di mana kamu akan menemukan medan 0,5 µT dengan arus yang sama?', a: 'Pada jarak empat kali lipat. B turun sebagai 1/r, sehingga memperempat B membutuhkan r dikali 4. Menggandakan jarak hanya akan membuat medan setengahnya, menjadi 1 µT.' },
        { q: 'Melihat simulasi dengan arus mendekati kita, ke arah mana panah medan di sisi kanan kawat seharusnya berputar, dan mengapa?', a: 'Ke atas pada layar, bagian dari putaran berlawanan arah jarum jam. Arahkan ibu jari kanan ke arahmu: jari-jari menggenggam berlawanan arah jarum jam. Dari aturan vektor, dengan arus mendekati kita dan posisi di sebelah kanan, medan tegak lurus keduanya dan mengarah ke atas.' },
      ],
    },
  },
};
