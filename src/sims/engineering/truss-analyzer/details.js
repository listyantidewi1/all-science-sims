// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify zero-force members under specific loads.',
      'Connect tension/compression patterns to truss geometry.',
      'See where the most stressed member is — that is what limits the bridge.',
    ],
    id: [
      'Mengidentifikasi batang gaya-nol di beban tertentu.',
      'Menghubungkan pola tarik/tekan ke geometri rangka.',
      'Melihat batang paling tertekan — itu yang membatasi jembatan.',
    ],
  },
  tryThis: {
    en: [
      'Drag the load to mid-span — verticals carry the load, diagonals route it to the supports.',
      'Drag the load near a support — the far half of the bridge is barely stressed.',
      'Increase the load — colors deepen, the worst member is your weakest link.',
    ],
    id: [
      'Geser beban ke tengah bentang — batang vertikal menanggung beban, diagonal menyalurkannya ke tumpuan.',
      'Geser beban dekat tumpuan — separuh jembatan jauh dari beban hampir tidak tertekan.',
      'Naikkan beban — warna semakin pekat, batang terburuk adalah titik terlemah Anda.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A truss is a framework of straight members connected at their ends, arranged in triangles. Because the connections are treated as frictionless pins and loads are applied only at the joints, no member can be bent: each one is either pulled along its length (tension) or squeezed along its length (compression). That is what makes trusses light and efficient, and also what makes them easy to analyse. At every joint the forces from the members meeting there, plus any support reaction or external load, must add up to zero both horizontally and vertically. Writing those two equations at every joint is the method of joints.',
        'The simulation shows a three-panel Warren truss: four joints along the deck, three along the top, and eleven members forming six triangles. The left support is a pin, which can push horizontally and vertically, and the right support is a roller, which can only push vertically. That gives 11 member forces plus 3 reaction components, 14 unknowns, and 7 joints times 2 equations gives exactly 14 equations, so the structure is statically determinate: equilibrium alone fixes every force. The sim solves this 14-by-14 system every frame. Red members are in tension, blue in compression, and the colour depth and thickness scale with the force relative to the largest force present.',
        'Drag the load along the deck or set its position and size with the sliders. A load between two deck joints is shared between them in proportion to its distance from each, just as a deck beam resting on those joints would share it. Doubling P doubles every force, because the equations are linear. As the load moves, the force pattern follows it: the top chord is compressed and the bottom chord stretched, like the flanges of a beam, with chord force roughly equal to the bending moment divided by the truss height; the diagonals near the load carry it up to the top chord and down to the supports, and the support nearer the load takes the larger reaction. With the load exactly at mid-span the two middle diagonals carry nothing at all.',
        'This is a statics model, so several real effects are left out. Members have no weight and do not stretch or shorten, so the truss does not deflect. Nothing is said about how strong the members are: a long, slender member in compression can buckle at a force far below what it could carry in tension, and in real bridges that usually decides the design. Connections are ideal pins, the load is static rather than a moving vehicle with inertia, and the whole structure is two-dimensional. Because the colours are scaled to the current maximum, the same shade can mean different forces at different loads; hover over a member to read the actual value in kilonewtons.',
      ],
      id: [
        'Rangka batang adalah kerangka dari batang-batang lurus yang disambung di ujung-ujungnya dan disusun membentuk segitiga. Karena sambungannya dianggap sendi tanpa gesekan dan beban hanya bekerja di titik simpul, tidak ada batang yang melentur: setiap batang hanya ditarik sepanjang sumbunya (tarik) atau ditekan sepanjang sumbunya (tekan). Itulah yang membuat rangka batang ringan dan efisien, sekaligus mudah dianalisis. Di setiap titik simpul, gaya dari batang-batang yang bertemu di sana, ditambah reaksi tumpuan atau beban luar jika ada, harus berjumlah nol baik mendatar maupun tegak. Menuliskan dua persamaan itu di setiap simpul disebut metode titik simpul (metode buhul).',
        'Simulasi menampilkan rangka Warren tiga panel: empat simpul di sepanjang dek, tiga di atas, dan sebelas batang yang membentuk enam segitiga. Tumpuan kiri berupa sendi, yang dapat mendorong mendatar dan tegak, dan tumpuan kanan berupa rol, yang hanya dapat mendorong tegak. Dengan demikian ada 11 gaya batang ditambah 3 komponen reaksi, yaitu 14 besaran yang belum diketahui, dan 7 simpul kali 2 persamaan memberi tepat 14 persamaan, sehingga strukturnya statis tertentu: kesetimbangan saja sudah menentukan semua gaya. Simulasi menyelesaikan sistem 14 × 14 ini di setiap frame. Batang merah mengalami tarik, biru mengalami tekan, dan kepekatan warna serta ketebalan garis mengikuti besar gaya relatif terhadap gaya terbesar yang sedang bekerja.',
        'Seret beban di sepanjang dek atau atur posisi dan besarnya dengan slider. Beban yang berada di antara dua simpul dek dibagi ke keduanya sebanding dengan jaraknya, persis seperti balok dek yang bertumpu pada kedua simpul itu membagi bebannya. Menggandakan P menggandakan semua gaya, karena persamaannya linear. Saat beban bergeser, pola gaya mengikutinya: batang tepi atas tertekan dan batang tepi bawah tertarik, seperti sayap sebuah balok, dengan gaya batang tepi kira-kira sama dengan momen lentur dibagi tinggi rangka; diagonal di dekat beban menyalurkannya ke batang atas lalu turun ke tumpuan, dan tumpuan yang lebih dekat ke beban menerima reaksi lebih besar. Dengan beban tepat di tengah bentang, kedua diagonal tengah tidak memikul gaya sama sekali.',
        'Ini model statika, sehingga beberapa efek nyata diabaikan. Batang tidak berbobot dan tidak memanjang atau memendek, sehingga rangka tidak melendut. Tidak ada informasi tentang kekuatan batang: batang panjang dan langsing yang tertekan dapat tertekuk (buckling) pada gaya yang jauh lebih kecil daripada yang dapat dipikulnya saat tertarik, dan pada jembatan sungguhan hal itu biasanya menentukan desain. Sambungan dianggap sendi ideal, beban bersifat statis dan bukan kendaraan bergerak yang punya inersia, dan seluruh struktur dua dimensi. Karena warna diskalakan terhadap gaya maksimum saat itu, warna yang sama bisa berarti gaya yang berbeda pada beban yang berbeda; arahkan kursor ke sebuah batang untuk membaca nilai sebenarnya dalam kilonewton.',
      ],
    },
    figure: {
      caption: {
        en: 'Load at mid-span: the top chord is squeezed (compression, blue), the bottom chord is stretched (tension, red), the end diagonals carry the load down to the supports and the two middle diagonals carry nothing. Inset: at the left support joint the reaction, the chord pull and the diagonal push add up to zero.',
        id: 'Beban di tengah bentang: batang tepi atas tertekan (biru), batang tepi bawah tertarik (merah), diagonal ujung menyalurkan beban ke tumpuan, dan kedua diagonal tengah tidak memikul gaya. Sisipan: di simpul tumpuan kiri, reaksi, tarikan batang tepi, dan dorongan diagonal berjumlah nol.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Member forces in a Warren truss and equilibrium at a joint', 'Gaya batang pada rangka Warren dan kesetimbangan di satu simpul')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.t{stroke:#ef4444;stroke-width:4;fill:none}.c{stroke:#3b82f6;stroke-width:4;fill:none}.z{stroke:currentColor;stroke-width:2;fill:none;opacity:.3;stroke-dasharray:4 3}.f{stroke-width:2.2;fill:none}.s{font-size:10px}</style>
  <line x1="30" y1="130" x2="110" y2="130" class="t"/>
  <line x1="110" y1="130" x2="190" y2="130" class="t" stroke-width="6"/>
  <line x1="190" y1="130" x2="270" y2="130" class="t"/>
  <line x1="70" y1="80" x2="150" y2="80" class="c" stroke-width="6"/>
  <line x1="150" y1="80" x2="230" y2="80" class="c" stroke-width="6"/>
  <line x1="30" y1="130" x2="70" y2="80" class="c"/>
  <line x1="70" y1="80" x2="110" y2="130" class="t"/>
  <line x1="110" y1="130" x2="150" y2="80" class="z"/>
  <line x1="150" y1="80" x2="190" y2="130" class="z"/>
  <line x1="190" y1="130" x2="230" y2="80" class="t"/>
  <line x1="230" y1="80" x2="270" y2="130" class="c"/>
  <circle cx="30" cy="130" r="4" fill="currentColor"/><circle cx="110" cy="130" r="4" fill="currentColor"/><circle cx="190" cy="130" r="4" fill="currentColor"/><circle cx="270" cy="130" r="4" fill="currentColor"/>
  <circle cx="70" cy="80" r="4" fill="currentColor"/><circle cx="150" cy="80" r="4" fill="currentColor"/><circle cx="230" cy="80" r="4" fill="currentColor"/>
  <path d="M30 134 L22 148 L38 148 z" fill="currentColor" opacity=".6"/>
  <circle cx="270" cy="140" r="5" fill="currentColor" opacity=".6"/>
  <line x1="150" y1="96" x2="150" y2="124" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="156" y="112" fill="#f59e0b">P</text>
  <text x="112" y="70" fill="#3b82f6" class="s">${L('compression', 'tekan')}</text>
  <text x="128" y="148" fill="#ef4444" class="s">${L('tension', 'tarik')}</text>
  <text x="148" y="160" class="s" opacity=".7">${L('dashed = zero force', 'putus-putus = gaya nol')}</text>
  <line x1="30" y1="160" x2="30" y2="137" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="36" y="162" fill="#10b981" class="s">R_A = P/2</text>
  <line x1="270" y1="166" x2="270" y2="147" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="276" y="166" fill="#10b981" class="s">R_B = P/2</text>
  <circle cx="300" cy="200" r="34" fill="none" stroke="currentColor" stroke-width="1" opacity=".4"/>
  <circle cx="300" cy="200" r="3" fill="currentColor"/>
  <line x1="300" y1="200" x2="300" y2="172" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <line x1="300" y1="200" x2="328" y2="200" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <line x1="300" y1="200" x2="283" y2="226" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <text x="178" y="190" class="s">${L('joint A (left support):', 'simpul A (tumpuan kiri):')}</text>
  <text x="178" y="204" class="s">${L('R_A up, chord pulls right,', 'R_A ke atas, tepi menarik ke kanan,')}</text>
  <text x="178" y="218" class="s">${L('diagonal pushes down-left.', 'diagonal mendorong ke kiri bawah.')}</text>
  <text x="178" y="232" class="s">${L('Sum = 0 in x and in y.', 'Jumlah = 0 pada x dan y.')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'With pinned joints and loads at the joints, every truss member carries a purely axial force: tension or compression, never bending.',
        'At each joint the forces must balance horizontally and vertically; solving those equations for every joint is the method of joints.',
        'The truss behaves like a deep beam: the top chord is compressed, the bottom chord is stretched, and the diagonals carry the shear toward the supports.',
        'A member can carry zero force under one load position and a large force under another, so the whole range of load positions matters in design.',
        'Forces scale linearly with the load, and the support nearer the load takes the larger reaction.',
      ],
      id: [
        'Dengan sambungan sendi dan beban di titik simpul, setiap batang rangka memikul gaya aksial murni: tarik atau tekan, tidak pernah lentur.',
        'Di setiap simpul gaya-gaya harus setimbang secara mendatar dan tegak; menyelesaikan persamaan itu untuk semua simpul adalah metode titik simpul.',
        'Rangka berperilaku seperti balok yang tinggi: tepi atas tertekan, tepi bawah tertarik, dan diagonal menyalurkan gaya geser ke tumpuan.',
        'Sebuah batang bisa memikul gaya nol pada satu posisi beban dan gaya besar pada posisi lain, sehingga seluruh rentang posisi beban penting dalam perancangan.',
        'Gaya berskala linear terhadap beban, dan tumpuan yang lebih dekat ke beban menerima reaksi yang lebih besar.',
      ],
    },
    vocabulary: {
      en: [
        ['Member', 'A straight bar of the truss, carrying force only along its length.'],
        ['Joint (node)', 'A point where members meet; modelled as a frictionless pin that transmits force but not bending.'],
        ['Tension', 'A pulling force that tends to stretch a member; shown in red and counted positive.'],
        ['Compression', 'A pushing force that tends to shorten a member; shown in blue and counted negative.'],
        ['Reaction', 'The force a support exerts on the structure; the pin gives horizontal and vertical reactions, the roller only vertical.'],
        ['Statically determinate', 'A structure whose internal forces can all be found from equilibrium alone; for a planar truss, members + reactions = 2 × joints.'],
        ['Zero-force member', 'A member that carries no force under a particular loading but may be essential under another or for stability.'],
        ['Chord', 'The top or bottom row of members running the length of the truss.'],
      ],
      id: [
        ['Batang', 'Sebuah elemen lurus pada rangka yang hanya memikul gaya sepanjang sumbunya.'],
        ['Titik simpul (buhul)', 'Titik pertemuan batang-batang; dimodelkan sebagai sendi tanpa gesekan yang meneruskan gaya tetapi tidak meneruskan momen lentur.'],
        ['Tarik', 'Gaya yang cenderung memanjangkan batang; ditampilkan merah dan dihitung positif.'],
        ['Tekan', 'Gaya yang cenderung memendekkan batang; ditampilkan biru dan dihitung negatif.'],
        ['Reaksi tumpuan', 'Gaya yang diberikan tumpuan pada struktur; sendi memberi reaksi mendatar dan tegak, rol hanya tegak.'],
        ['Statis tertentu', 'Struktur yang semua gaya dalamnya dapat ditemukan dari kesetimbangan saja; untuk rangka bidang, jumlah batang + reaksi = 2 × jumlah simpul.'],
        ['Batang gaya nol', 'Batang yang tidak memikul gaya pada suatu pembebanan tertentu tetapi bisa penting pada pembebanan lain atau untuk kestabilan.'],
        ['Batang tepi (chord)', 'Deretan batang atas atau bawah yang membentang sepanjang rangka.'],
      ],
    },
    misconceptions: {
      en: [
        ['A member that shows zero force is useless and could be removed.', 'It is zero only for that load position. Move the load and the same member picks up force; it may also be needed to keep the frame rigid and to stop compression members buckling sideways.'],
        ['Tension and compression are equally dangerous for a member of a given size.', 'A long slender member can carry far more in tension than in compression, because in compression it can buckle, bowing sideways suddenly. Engineers usually make compression members thicker or shorter.'],
        ['The members directly under the load do all the work.', 'The load spreads through the whole truss: the chords far from the load carry large forces too, because they resist the overall bending moment. The sim shows the top and bottom chords deeply coloured even where no load is applied.'],
      ],
      id: [
        ['Batang yang gayanya nol tidak berguna dan bisa dibuang.', 'Gayanya nol hanya untuk posisi beban itu. Geser beban dan batang yang sama ikut memikul gaya; batang itu juga bisa diperlukan untuk menjaga kekakuan rangka dan mencegah batang tekan tertekuk ke samping.'],
        ['Tarik dan tekan sama bahayanya bagi batang dengan ukuran tertentu.', 'Batang panjang dan langsing dapat memikul gaya tarik jauh lebih besar daripada gaya tekan, karena saat tertekan ia bisa tertekuk, melengkung ke samping secara tiba-tiba. Insinyur biasanya membuat batang tekan lebih tebal atau lebih pendek.'],
        ['Batang yang tepat di bawah beban melakukan semua kerja.', 'Beban menyebar ke seluruh rangka: batang tepi yang jauh dari beban juga memikul gaya besar, karena menahan momen lentur keseluruhan. Simulasi menunjukkan tepi atas dan bawah berwarna pekat bahkan di tempat yang tidak dibebani.'],
      ],
    },
    realWorld: {
      en: [
        'Steel railway and road bridges of the nineteenth and twentieth centuries are mostly trusses (Warren, Pratt and Howe types), and their members are sized exactly by this kind of analysis for every position of a train or truck.',
        'Roof trusses in houses and sports halls use the same principle in timber or light steel: chords and diagonals in pure tension or compression span large rooms with little material.',
        'Electricity pylons, construction cranes and the booms of tower cranes are three-dimensional trusses, light enough to lift and stiff enough to carry heavy loads.',
        'Engineers analyse a moving load by sliding it along the span, just as the sim does, and design each member for the worst force it sees at any position (an influence line).',
      ],
      id: [
        'Jembatan kereta api dan jalan raya dari baja pada abad ke-19 dan ke-20 sebagian besar berupa rangka batang (tipe Warren, Pratt, dan Howe), dan ukuran batangnya ditentukan persis dengan analisis seperti ini untuk setiap posisi kereta atau truk.',
        'Kuda-kuda atap rumah dan gedung olahraga memakai prinsip yang sama dari kayu atau baja ringan: batang tepi dan diagonal yang murni tertarik atau tertekan membentangi ruang besar dengan sedikit material.',
        'Menara listrik, tiang derek, dan lengan derek menara adalah rangka batang tiga dimensi, cukup ringan untuk diangkat dan cukup kaku untuk memikul beban berat.',
        'Insinyur menganalisis beban bergerak dengan menggesernya di sepanjang bentang, seperti yang dilakukan simulasi, dan merancang setiap batang untuk gaya terburuk yang dialaminya di posisi mana pun (garis pengaruh).',
      ],
    },
    questions: {
      en: [
        { q: 'A 10 kN load sits exactly at mid-span of the 6 m truss. What are the two support reactions, and how do you know without solving the whole truss?', a: 'Each reaction is 5 kN. Taking moments about the left support, R_B × 6 m must balance 10 kN × 3 m, so R_B = 5 kN; the vertical forces must sum to zero, so R_A = 5 kN too. Symmetry gives the same answer at once.' },
        { q: 'With that same mid-span load the sim reports about 6.67 kN of tension in the middle bottom-chord member. Check this with a moment calculation.', a: 'The load is shared 5 kN onto each of the two middle deck joints. Cut the truss between x = 2 m and x = 3 m and take moments about the top-middle joint (x = 3 m, height 1.5 m) for the left part: R_A × 3 m − 5 kN × 1 m = 15 − 5 = 10 kN·m. The only cut member that can resist this is the bottom chord, at a lever arm of 1.5 m, so F = 10 / 1.5 = 6.67 kN in tension. The top chord carries the same 6.67 kN in compression.' },
        { q: 'Why do the two middle diagonals show zero force when the load is at mid-span, and what happens if you nudge the load slightly to one side?', a: 'At the second deck joint, the end diagonal coming down from the left already has a vertical component exactly equal to the 5 kN share of the load there, so the diagonal rising toward the middle has nothing left to carry; the right side mirrors this. Nudging the load unbalances the shares (and the reactions), so both middle diagonals immediately pick up force, one in tension and one in compression.' },
      ],
      id: [
        { q: 'Beban 10 kN berada tepat di tengah bentang rangka 6 m. Berapa kedua reaksi tumpuan, dan bagaimana kamu mengetahuinya tanpa menyelesaikan seluruh rangka?', a: 'Masing-masing reaksi 5 kN. Ambil momen terhadap tumpuan kiri: R_B × 6 m harus mengimbangi 10 kN × 3 m, sehingga R_B = 5 kN; jumlah gaya tegak harus nol, sehingga R_A = 5 kN juga. Simetri langsung memberi jawaban yang sama.' },
        { q: 'Dengan beban tengah bentang yang sama, simulasi melaporkan sekitar 6,67 kN tarik pada batang tepi bawah bagian tengah. Periksa dengan perhitungan momen.', a: 'Beban terbagi 5 kN ke masing-masing dua simpul dek tengah. Potong rangka di antara x = 2 m dan x = 3 m dan ambil momen terhadap simpul atas tengah (x = 3 m, tinggi 1,5 m) untuk bagian kiri: R_A × 3 m − 5 kN × 1 m = 15 − 5 = 10 kN·m. Satu-satunya batang terpotong yang dapat menahan momen ini adalah tepi bawah, dengan lengan 1,5 m, sehingga F = 10 / 1,5 = 6,67 kN tarik. Tepi atas memikul 6,67 kN yang sama dalam tekan.' },
        { q: 'Mengapa kedua diagonal tengah menunjukkan gaya nol ketika beban di tengah bentang, dan apa yang terjadi jika beban digeser sedikit ke satu sisi?', a: 'Di simpul dek kedua, diagonal ujung yang turun dari kiri sudah punya komponen tegak yang tepat sama dengan bagian beban 5 kN di sana, sehingga diagonal yang naik ke tengah tidak punya sisa gaya untuk dipikul; sisi kanan mencerminkannya. Menggeser beban membuat pembagian beban (dan reaksi) tidak seimbang, sehingga kedua diagonal tengah segera memikul gaya, satu tarik dan satu tekan.' },
      ],
    },
  },
};
