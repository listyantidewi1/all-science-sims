// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See how two simple PDEs produce complex patterns.',
      'Connect feed/kill rates to spots vs stripes vs mazes.',
      'Recognize Turing-pattern style biology (zebra, leopard, fish skins).',
    ],
    id: [
      'Melihat bagaimana dua PDE sederhana menghasilkan pola kompleks.',
      'Mengaitkan laju umpan/kill dengan bintik vs garis vs labirin.',
      'Mengenali biologi pola Turing (zebra, macan, kulit ikan).',
    ],
  },
  tryThis: {
    en: [
      'Spots preset (F=0.035, k=0.065).',
      'Coral preset (F=0.0545, k=0.062) — the F slider rounds it to 0.054.',
      'Click the canvas to inject more activator.',
    ],
    id: [
      'Praatur Bintik (F=0,035, k=0,065).',
      'Praatur Karang (F=0,0545, k=0,062) — slider F membulatkannya menjadi 0,054.',
      'Klik kanvas untuk menyuntikkan aktivator lebih banyak.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In 1952 Alan Turing proposed that the patterns on animal skins could arise from two chemicals that react with each other while spreading through tissue. Diffusion on its own smooths everything out, so it seems the last thing that could create stripes. Turing showed that if one chemical promotes its own production and the other is consumed or inhibits it, and the two spread at different rates, a uniform mixture can become unstable and break into regular spots or stripes with a characteristic wavelength. Patterns formed this way are now called Turing patterns.',
        'The simulation uses the Gray-Scott model, a two-chemical system that shows this behaviour vividly. U is a fuel that is fed in everywhere at rate F, and V is an activator that converts fuel into more of itself through the reaction U + 2V → 3V, which happens at a rate proportional to u·v². V is also removed at rate k, and both chemicals are washed out at rate F. In equations: du/dt = Du·lap(u) − u·v² + F·(1 − u) and dv/dt = Dv·lap(v) + u·v² − (F + k)·v, where lap is the Laplacian, the diffusion term. The sim uses Du = 0.16 and Dv = 0.08, so the activator spreads half as fast as the fuel, which is essential for the instability. The grid is 160 by 100 cells, the colour shows the amount of V, and it starts from a uniform sea of fuel with a square seed of V in the middle.',
        'The feed rate F and kill rate k are the two knobs. Where V is present it eats fuel and multiplies, but V can only grow where enough U remains; its own success starves it, which sets the size of a spot, and the slower diffusion of V keeps spots from simply spreading out. Small changes in F and k shift the balance: the presets Spots, Coral, Maze, Mitosis and Worms differ by only a few thousandths yet give self-replicating dots, branching coral, labyrinths, dividing cells and wriggling lines. Pressing and dragging on the canvas writes V = 1 into a small patch, so you can seed the pattern wherever you like. The Iterations per frame slider only changes how many time steps are computed per drawn frame, not the model.',
        'The sim solves the equations with the simplest possible method: one time unit per step, nearest-neighbour differences for the Laplacian, and a fixed border where nothing changes. Negative concentrations are clipped to zero. This is accurate enough to show the phenomena but not a chemistry simulation: the concentrations are dimensionless, there is no temperature, no real reaction mechanism and no third dimension. In living tissue the "chemicals" may be signalling molecules or even cell movements, and whether a particular animal pattern is truly a Turing pattern is still investigated case by case.',
      ],
      id: [
        'Pada 1952 Alan Turing mengusulkan bahwa pola pada kulit hewan dapat muncul dari dua zat kimia yang saling bereaksi sambil menyebar dalam jaringan. Difusi sendiri meratakan segalanya, sehingga tampak seperti hal terakhir yang bisa menciptakan garis-garis. Turing menunjukkan bahwa jika satu zat memacu produksi dirinya sendiri dan zat lain dikonsumsi atau menghambatnya, dan keduanya menyebar dengan laju berbeda, campuran yang seragam dapat menjadi tak stabil dan pecah menjadi bintik atau garis teratur dengan panjang gelombang khas. Pola yang terbentuk dengan cara ini kini disebut pola Turing.',
        'Simulasi memakai model Gray-Scott, sistem dua zat kimia yang memperlihatkan perilaku ini dengan jelas. U adalah bahan bakar yang dipasok di mana-mana dengan laju F, dan V adalah aktivator yang mengubah bahan bakar menjadi lebih banyak dirinya lewat reaksi U + 2V → 3V, yang berlangsung dengan laju sebanding dengan u·v². V juga dibuang dengan laju k, dan kedua zat terbilas keluar dengan laju F. Dalam persamaan: du/dt = Du·lap(u) − u·v² + F·(1 − u) dan dv/dt = Dv·lap(v) + u·v² − (F + k)·v, dengan lap adalah Laplacian, yaitu suku difusi. Simulasi memakai Du = 0,16 dan Dv = 0,08, sehingga aktivator menyebar separuh kecepatan bahan bakar, dan itu penting bagi ketidakstabilannya. Gridnya 160 kali 100 sel, warna menunjukkan jumlah V, dan simulasi dimulai dari lautan bahan bakar yang seragam dengan satu benih persegi V di tengah.',
        'Laju umpan F dan laju kill k adalah dua kenopnya. Di tempat V hadir, ia memakan bahan bakar dan berlipat ganda, tetapi V hanya bisa tumbuh jika cukup U yang tersisa; keberhasilannya sendiri membuatnya kelaparan, dan itulah yang menentukan ukuran bintik, sementara difusi V yang lebih lambat mencegah bintik melebar begitu saja. Perubahan kecil pada F dan k menggeser keseimbangan: praatur Spots, Coral, Maze, Mitosis, dan Worms hanya berbeda beberapa perseribu tetapi menghasilkan titik yang menggandakan diri, karang bercabang, labirin, sel yang membelah, dan garis yang menggeliat. Menekan dan menyeret pada kanvas menuliskan V = 1 pada petak kecil, sehingga kamu bisa menanam pola di mana pun. Slider Iterations per frame hanya mengubah berapa langkah waktu yang dihitung per frame yang digambar, bukan modelnya.',
        'Simulasi menyelesaikan persamaan dengan metode paling sederhana: satu satuan waktu per langkah, selisih tetangga terdekat untuk Laplacian, dan tepi tetap yang tidak berubah. Konsentrasi negatif dipotong menjadi nol. Ini cukup akurat untuk memperlihatkan fenomenanya tetapi bukan simulasi kimia: konsentrasinya tak berdimensi, tidak ada suhu, tidak ada mekanisme reaksi sungguhan, dan tidak ada dimensi ketiga. Dalam jaringan hidup, "zat kimia" itu bisa berupa molekul sinyal atau bahkan gerakan sel, dan apakah suatu pola hewan tertentu benar-benar pola Turing masih diteliti kasus per kasus.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the Gray-Scott processes. Fuel U is fed in, the activator V converts it into more V at rate u·v², V is removed at rate k, both are washed out at rate F, and V diffuses half as fast as U. Right: the five presets in the F–k plane; parameters a few thousandths apart give entirely different patterns.',
        id: 'Kiri: proses Gray-Scott. Bahan bakar U dipasok, aktivator V mengubahnya menjadi lebih banyak V dengan laju u·v², V dibuang dengan laju k, keduanya terbilas dengan laju F, dan V berdifusi separuh kecepatan U. Kanan: lima praatur pada bidang F–k; parameter yang hanya berbeda beberapa perseribu memberi pola yang sama sekali berbeda.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const px = (k) => 206 + ((k - 0.04) / 0.035) * 140;
        const py = (F) => 172 - (F / 0.08) * 125;
        const presets = [['Spots', 0.035, 0.065, 6, 12], ['Coral', 0.0545, 0.062, -34, -6], ['Maze', 0.029, 0.057, -32, 12], ['Mitosis', 0.0367, 0.0649, 6, -4], ['Worms', 0.078, 0.061, 6, 4]];
        const dots = presets.map(([n, F, k, dx, dy]) => `<circle cx="${px(k).toFixed(1)}" cy="${py(F).toFixed(1)}" r="3.5" fill="#8b5cf6"/><text x="${(px(k) + dx).toFixed(1)}" y="${(py(F) + dy).toFixed(1)}" class="s">${n}</text>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Gray-Scott reactions and parameter plane', 'Reaksi Gray-Scott dan bidang parameter')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.f{fill:none;stroke-width:2}.ax{fill:none;stroke:currentColor;stroke-width:1;opacity:.6}.s{font-size:10px}.t{font-weight:700}.m{font-size:10px;opacity:.75}</style>
  <text x="10" y="22" class="t">${L('Reactions', 'Reaksi')}</text>
  <rect x="30" y="60" width="44" height="30" rx="5" fill="#3b82f6" fill-opacity=".85"/>
  <text x="52" y="80" text-anchor="middle" class="t" fill="#fff">U</text>
  <rect x="120" y="60" width="44" height="30" rx="5" fill="#10b981" fill-opacity=".85"/>
  <text x="142" y="80" text-anchor="middle" class="t" fill="#fff">V</text>
  <line x1="52" y1="34" x2="52" y2="56" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <text x="58" y="44" class="m">${L('feed F(1 − u)', 'umpan F(1 − u)')}</text>
  <line x1="76" y1="75" x2="116" y2="75" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="62" y="106" class="m" fill="#f59e0b">U + 2V → 3V</text>
  <text x="74" y="119" class="m" fill="#f59e0b">${L('rate u·v²', 'laju u·v²')}</text>
  <line x1="142" y1="92" x2="142" y2="128" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="148" y="118" class="m" fill="#ef4444">${L('removal (F + k)v', 'pembuangan (F + k)v')}</text>
  <text x="10" y="150" class="m">${L('both spread by diffusion:', 'keduanya menyebar lewat difusi:')}</text>
  <text x="10" y="164" class="m" fill="#3b82f6">Du = 0.16</text>
  <text x="80" y="164" class="m" fill="#10b981">Dv = 0.08 ${L('(slower)', '(lebih lambat)')}</text>
  <text x="10" y="186" class="m">${L('V grows only where fuel U remains,', 'V tumbuh hanya jika bahan bakar U tersisa,')}</text>
  <text x="10" y="199" class="m">${L('so a spot starves its own centre.', 'sehingga bintik membuat pusatnya kelaparan.')}</text>
  <text x="206" y="22" class="t">${L('Presets in the F–k plane', 'Praatur pada bidang F–k')}</text>
  <path d="M206 42 V172 H346" class="ax"/>
  <text x="200" y="176" text-anchor="end" class="s">0</text>
  <text x="200" y="48" text-anchor="end" class="s">0.08</text>
  <text x="190" y="110" text-anchor="end" class="s">F</text>
  <text x="206" y="188" class="s">0.040</text>
  <text x="346" y="188" text-anchor="end" class="s">0.075</text>
  <text x="276" y="202" text-anchor="middle" class="s">k</text>
  ${dots}
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Diffusion alone smooths concentrations out, but reaction plus diffusion at two different rates can make a uniform state unstable and form patterns.',
        'In Gray-Scott, fuel U is fed in at rate F, the activator V reproduces by consuming U at rate u·v², and V is removed at rate F + k.',
        'The activator must diffuse more slowly than the fuel (here Dv is half of Du) for spots and stripes to form.',
        'Tiny changes in F and k move the system between spots, stripes, mazes, dividing blobs and worms, or kill the pattern entirely.',
        'The same mathematics is a leading explanation for animal coat patterns, though each case must be confirmed experimentally.',
      ],
      id: [
        'Difusi sendiri meratakan konsentrasi, tetapi reaksi ditambah difusi dengan dua laju berbeda dapat membuat keadaan seragam menjadi tak stabil dan membentuk pola.',
        'Dalam Gray-Scott, bahan bakar U dipasok dengan laju F, aktivator V berkembang biak dengan mengonsumsi U pada laju u·v², dan V dibuang dengan laju F + k.',
        'Aktivator harus berdifusi lebih lambat daripada bahan bakar (di sini Dv separuh Du) agar bintik dan garis terbentuk.',
        'Perubahan kecil pada F dan k menggeser sistem di antara bintik, garis, labirin, gumpalan yang membelah, dan cacing, atau mematikan pola sama sekali.',
        'Matematika yang sama menjadi penjelasan utama bagi pola bulu hewan, meskipun setiap kasus harus dipastikan lewat eksperimen.',
      ],
    },
    vocabulary: {
      en: [
        ['Reaction-diffusion system', 'Equations describing substances that react with one another while spreading through space.'],
        ['Diffusion', 'Net movement of a substance from high to low concentration; in the equations it is the Laplacian term multiplied by a diffusion coefficient.'],
        ['Laplacian', 'The sum of second derivatives in space; on the grid it is the average of the four neighbours minus the cell itself.'],
        ['Activator', 'A substance that speeds up its own production; V in this model.'],
        ['Autocatalysis', 'A reaction whose product is also its catalyst, such as U + 2V → 3V.'],
        ['Feed rate (F)', 'The rate at which fresh U is supplied and both chemicals are flushed out.'],
        ['Kill rate (k)', 'The extra rate at which V is converted into an inert product and lost.'],
        ['Turing instability', 'The mechanism by which a uniform mixture becomes unstable and forms a pattern with a definite wavelength.'],
      ],
      id: [
        ['Sistem reaksi-difusi', 'Persamaan yang menggambarkan zat-zat yang saling bereaksi sambil menyebar dalam ruang.'],
        ['Difusi', 'Perpindahan bersih zat dari konsentrasi tinggi ke rendah; dalam persamaan, suku Laplacian dikalikan koefisien difusi.'],
        ['Laplacian', 'Jumlah turunan kedua dalam ruang; pada grid, rata-rata empat tetangga dikurangi sel itu sendiri.'],
        ['Aktivator', 'Zat yang mempercepat produksinya sendiri; V dalam model ini.'],
        ['Autokatalisis', 'Reaksi yang produknya juga menjadi katalisnya, seperti U + 2V → 3V.'],
        ['Laju umpan (F)', 'Laju pemasokan U segar sekaligus laju pembilasan kedua zat.'],
        ['Laju kill (k)', 'Laju tambahan V diubah menjadi produk lembam dan hilang.'],
        ['Ketidakstabilan Turing', 'Mekanisme yang membuat campuran seragam menjadi tak stabil dan membentuk pola dengan panjang gelombang tertentu.'],
      ],
    },
    misconceptions: {
      en: [
        ['Diffusion can only blur things, so it cannot create patterns.', 'Alone, yes. Combined with a reaction in which one substance is self-amplifying and the two spread at different rates, diffusion is what sets the spacing of the pattern. That was Turing\'s insight.'],
        ['The spots are regions where V attracts more V from elsewhere.', 'Nothing attracts anything; both chemicals just diffuse down their gradients. Spots persist because V reproduces where fuel is available and dies where it has used it up.'],
        ['The pattern is stored somewhere in the program.', 'The program only contains the two update equations and the parameters. Spots, stripes and mazes are not drawn; they emerge from the equations and the random-looking seed you give them.'],
        ['Turing patterns have been proved to make zebra stripes.', 'The mechanism is well supported for some cases, such as fish skin stripes and the spacing of hair follicles and digits in mice, but for many animals it remains a leading hypothesis rather than a settled fact.'],
      ],
      id: [
        ['Difusi hanya bisa mengaburkan, jadi tidak mungkin menciptakan pola.', 'Sendirian, memang. Digabung dengan reaksi di mana satu zat memperkuat dirinya sendiri dan keduanya menyebar dengan laju berbeda, difusilah yang menentukan jarak pola. Itulah wawasan Turing.'],
        ['Bintik adalah daerah tempat V menarik lebih banyak V dari tempat lain.', 'Tidak ada yang menarik apa pun; kedua zat hanya berdifusi menuruni gradiennya. Bintik bertahan karena V berkembang biak di tempat bahan bakar tersedia dan mati di tempat yang sudah dihabiskannya.'],
        ['Polanya tersimpan di suatu tempat dalam program.', 'Program hanya memuat dua persamaan pembaruan dan parameternya. Bintik, garis, dan labirin tidak digambar; semuanya muncul dari persamaan dan benih yang kamu berikan.'],
        ['Pola Turing sudah terbukti membentuk garis zebra.', 'Mekanismenya didukung kuat untuk beberapa kasus, seperti garis pada kulit ikan serta jarak folikel rambut dan jari pada tikus, tetapi untuk banyak hewan ia masih hipotesis utama, bukan fakta yang sudah pasti.'],
      ],
    },
    realWorld: {
      en: [
        'Stripes on zebrafish and angelfish have been shown to rearrange as the fish grows exactly as a reaction-diffusion model predicts.',
        'The spacing of hair follicles, feather buds and the fingers of a developing limb are explained with Turing-type models.',
        'The Belousov-Zhabotinsky reaction in a petri dish produces spreading spirals and rings, a visible chemical reaction-diffusion system.',
        'Reaction-diffusion equations also model vegetation patterns in dry regions, where plants compete for water and form spots and stripes seen from satellites.',
      ],
      id: [
        'Garis pada ikan zebra dan angelfish terbukti menata ulang diri seiring ikan tumbuh persis seperti prediksi model reaksi-difusi.',
        'Jarak folikel rambut, tunas bulu, dan jari-jari pada tungkai yang berkembang dijelaskan dengan model bertipe Turing.',
        'Reaksi Belousov-Zhabotinsky dalam cawan petri menghasilkan spiral dan cincin yang menyebar, sistem reaksi-difusi kimia yang bisa dilihat langsung.',
        'Persamaan reaksi-difusi juga memodelkan pola vegetasi di daerah kering, di mana tanaman bersaing memperebutkan air dan membentuk bintik serta garis yang terlihat dari satelit.',
      ],
    },
    questions: {
      en: [
        { q: 'A cell has u = 1, v = 0.5 and the same values as all its neighbours (so no diffusion), with F = 0.035 and k = 0.065. Compute the change in u and v over one time step.', a: 'The reaction term is u·v² = 1 × 0.25 = 0.25. du = −0.25 + 0.035 × (1 − 1) = −0.25, so u drops to 0.75. dv = +0.25 − (0.035 + 0.065) × 0.5 = 0.25 − 0.05 = 0.20, so v rises to 0.70. The activator grows at the expense of fuel.' },
        { q: 'Why do spots in the Spots preset stay a fixed size instead of growing until they cover the canvas?', a: 'V can only reproduce where U is present, and inside a spot it has consumed most of the fuel, so the centre starves and only the rim is active. Fuel diffuses in from outside faster than V diffuses out, which fixes the rim width. The slow diffusion of V means spots stay compact rather than smearing out.' },
        { q: 'Set the feed rate to its minimum, 0.005, from any preset. Predict what happens and explain with the equations.', a: 'The pattern fades and the canvas returns to uniform fuel (V everywhere zero). With F tiny, very little fresh U arrives, so u·v² cannot keep up with the removal (F + k)·v, and V decays everywhere. The trivial state u = 1, v = 0 is the only stable one for small F.' },
      ],
      id: [
        { q: 'Sebuah sel punya u = 1, v = 0,5 dan nilai yang sama dengan semua tetangganya (sehingga tidak ada difusi), dengan F = 0,035 dan k = 0,065. Hitung perubahan u dan v dalam satu langkah waktu.', a: 'Suku reaksinya u·v² = 1 × 0,25 = 0,25. du = −0,25 + 0,035 × (1 − 1) = −0,25, sehingga u turun menjadi 0,75. dv = +0,25 − (0,035 + 0,065) × 0,5 = 0,25 − 0,05 = 0,20, sehingga v naik menjadi 0,70. Aktivator tumbuh dengan mengorbankan bahan bakar.' },
        { q: 'Mengapa bintik pada praatur Spots tetap berukuran tertentu dan tidak tumbuh sampai menutupi kanvas?', a: 'V hanya bisa berkembang biak di tempat U ada, dan di dalam bintik ia sudah menghabiskan sebagian besar bahan bakar, sehingga pusatnya kelaparan dan hanya tepinya yang aktif. Bahan bakar berdifusi masuk dari luar lebih cepat daripada V berdifusi keluar, dan itu menetapkan lebar tepi. Difusi V yang lambat membuat bintik tetap padat, tidak melebar.' },
        { q: 'Atur laju umpan ke nilai minimumnya, 0,005, dari praatur mana pun. Prediksi apa yang terjadi dan jelaskan dengan persamaannya.', a: 'Pola memudar dan kanvas kembali menjadi bahan bakar seragam (V nol di mana-mana). Dengan F sangat kecil, hanya sedikit U segar yang datang, sehingga u·v² tidak dapat mengimbangi pembuangan (F + k)·v, dan V meluruh di mana-mana. Keadaan trivial u = 1, v = 0 adalah satu-satunya yang stabil untuk F kecil.' },
      ],
    },
  },
};
