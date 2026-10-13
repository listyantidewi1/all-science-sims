// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See spread depend on network structure, not just R₀.',
      'Recognize the role of hubs (super-spreaders).',
      'Compare cluster die-off vs well-mixed epidemic.',
    ],
    id: [
      'Melihat penyebaran bergantung struktur jaringan, bukan hanya R₀.',
      'Mengenali peran hub (super-spreader).',
      'Membandingkan kematian klaster vs epidemi campur-merata.',
    ],
  },
  tryThis: {
    en: [
      'Vaccinate hubs first — does the outbreak die?',
      'Try a tightly-clustered network — does R₀ matter the same?',
      'Vary infection probability — find the percolation threshold.',
    ],
    id: [
      'Vaksinasi hub dulu — apakah wabah mati?',
      'Coba jaringan yang sangat berklaster — apakah R₀ memiliki dampak sama?',
      'Variasikan probabilitas infeksi — temukan ambang perkolasi.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Epidemiologists sort a population into three groups: Susceptible people who could catch the disease, Infected people who can pass it on, and Recovered (or removed) people who are immune. In the classic SIR model everyone mixes with everyone, and the fate of an outbreak hangs on the basic reproduction number R₀, the average number of people one case infects in a fully susceptible population. If R₀ is above 1 the outbreak grows; if it is below 1 it fizzles. As people recover and become immune, each case finds fewer susceptible contacts, the effective reproduction number falls, and the epidemic peaks and dies out even though some susceptible people remain: that is herd immunity.',
        'Real people do not mix with everyone; they meet along a web of contacts. This simulation draws that web as a network of nodes (people) and edges (contacts). Each pair of people is connected with a probability chosen so that the average number of contacts per person equals the "Avg degree" slider, which produces a random graph in which most people have about the average number of contacts and a few have noticeably more. One random person starts infected (red). At every time step, each infected person passes the disease to each susceptible neighbour (blue) with the "Infection prob.", and recovers (green) with the "Recovery prob.". A recovery probability of 0.05 means a person stays infectious for about 20 steps on average.',
        'On a network, what matters is whether an infected person is likely to pass the disease along an edge before recovering, and how many edges there are. Roughly, an outbreak can take off when that per-edge transmission chance multiplied by the average degree is more than 1. You can cross the threshold either by raising the infection probability or by adding contacts, and you can fall below it by lowering either, which is why both masks and distancing work. Below an average degree of about 1 the network itself breaks into small islands, so even a disease that spreads with certainty along every edge cannot travel far: this is percolation. Because the model is random, the same settings give different outcomes each run, and an outbreak can die out early just by bad luck for the virus; rebuild and rerun several times before drawing conclusions.',
        'The network built here is a simple random graph. Real social networks are more clustered (your friends know each other) and have hubs with far more contacts than average, and the page title hints at those richer "small-world" structures, which the current model does not reproduce. There is no vaccination button, though you can imitate immunity by lowering the average degree or raising the recovery probability. The model also has no latent period between catching and spreading, no births, deaths or waning immunity, and time moves in discrete steps with everyone updating at once. The layout of the dots is purely cosmetic: only the edges matter.',
      ],
      id: [
        'Ahli epidemiologi membagi populasi menjadi tiga kelompok: orang Rentan (Susceptible) yang bisa tertular, orang Terinfeksi (Infected) yang bisa menularkan, dan orang Pulih (Recovered) yang kebal. Dalam model SIR klasik semua orang bercampur dengan semua orang, dan nasib wabah bergantung pada bilangan reproduksi dasar R₀, yaitu rata-rata jumlah orang yang ditulari oleh satu kasus dalam populasi yang seluruhnya rentan. Jika R₀ di atas 1 wabah membesar; jika di bawah 1 wabah padam. Saat orang-orang pulih dan menjadi kebal, tiap kasus menemukan lebih sedikit kontak yang rentan, bilangan reproduksi efektif turun, dan epidemi mencapai puncak lalu mati walaupun masih ada orang rentan: itulah kekebalan kelompok.',
        'Orang sungguhan tidak bercampur dengan semua orang; mereka bertemu lewat jaring kontak. Simulasi ini menggambar jaring itu sebagai jaringan simpul (orang) dan sisi (kontak). Setiap pasangan orang dihubungkan dengan peluang yang dipilih agar rata-rata jumlah kontak per orang sama dengan slider "Avg degree", yang menghasilkan graf acak dengan kebanyakan orang memiliki kontak sekitar rata-rata dan beberapa orang jelas lebih banyak. Satu orang acak mulai terinfeksi (merah). Pada setiap langkah waktu, tiap orang terinfeksi menularkan penyakit ke tiap tetangga yang rentan (biru) dengan "Infection prob.", dan pulih (hijau) dengan "Recovery prob.". Peluang pulih 0,05 berarti seseorang tetap menular rata-rata sekitar 20 langkah.',
        'Pada jaringan, yang penting adalah apakah orang yang terinfeksi cenderung menularkan penyakit lewat suatu sisi sebelum pulih, dan berapa banyak sisi yang ada. Secara kasar, wabah bisa meledak ketika peluang penularan per sisi dikalikan derajat rata-rata lebih dari 1. Kamu bisa melewati ambang itu dengan menaikkan peluang infeksi atau menambah kontak, dan bisa turun ke bawahnya dengan menurunkan salah satunya, itulah sebabnya masker maupun jaga jarak sama-sama bekerja. Di bawah derajat rata-rata sekitar 1, jaringan itu sendiri pecah menjadi pulau-pulau kecil, sehingga penyakit yang pasti menular lewat setiap sisi pun tidak bisa berjalan jauh: inilah perkolasi. Karena modelnya acak, pengaturan yang sama memberi hasil berbeda tiap kali dijalankan, dan wabah bisa padam lebih awal hanya karena virusnya kurang beruntung; bangun ulang dan jalankan beberapa kali sebelum menarik kesimpulan.',
        'Jaringan yang dibangun di sini adalah graf acak sederhana. Jaringan sosial nyata lebih berklaster (teman-temanmu saling mengenal) dan memiliki hub dengan kontak jauh di atas rata-rata, dan judul halaman ini mengisyaratkan struktur "small-world" yang lebih kaya itu, yang tidak direproduksi oleh model saat ini. Tidak ada tombol vaksinasi, meskipun kamu bisa meniru kekebalan dengan menurunkan derajat rata-rata atau menaikkan peluang pulih. Model ini juga tidak memiliki masa laten antara tertular dan menularkan, tidak ada kelahiran, kematian, atau kekebalan yang memudar, dan waktu bergerak dalam langkah diskret dengan semua orang diperbarui serentak. Tata letak titik-titiknya hanya kosmetik: yang penting hanya sisi-sisinya.',
      ],
    },
    figure: {
      caption: {
        en: 'Disease travels only along edges. Infected nodes (red) can pass it to susceptible neighbours (blue); recovered nodes (green) block the path. A hub with many contacts spreads it fast, while an isolated cluster can never be reached.',
        id: 'Penyakit hanya berjalan lewat sisi. Simpul terinfeksi (merah) bisa menularkannya ke tetangga rentan (biru); simpul pulih (hijau) menghalangi jalur. Hub dengan banyak kontak menyebarkannya cepat, sedangkan klaster terpencil tidak pernah bisa dijangkau.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('SIR spread on a contact network', 'Penyebaran SIR pada jaringan kontak')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.e{stroke:currentColor;stroke-width:1.4;opacity:.4}.f{stroke-width:2.2;fill:none}.s{font-size:10px;opacity:.75}</style>
  <g class="e">
    <line x1="60" y1="60" x2="110" y2="100"/><line x1="60" y1="60" x2="40" y2="120"/><line x1="40" y1="120" x2="110" y2="100"/>
    <line x1="110" y1="100" x2="150" y2="60"/><line x1="110" y1="100" x2="160" y2="130"/><line x1="110" y1="100" x2="90" y2="170"/>
    <line x1="160" y1="130" x2="150" y2="60"/><line x1="160" y1="130" x2="210" y2="90"/><line x1="160" y1="130" x2="200" y2="170"/>
    <line x1="160" y1="130" x2="130" y2="190"/><line x1="90" y1="170" x2="130" y2="190"/><line x1="210" y1="90" x2="250" y2="60"/>
    <line x1="200" y1="170" x2="240" y2="150"/><line x1="240" y1="150" x2="250" y2="60"/>
    <line x1="300" y1="180" x2="330" y2="150"/><line x1="300" y1="180" x2="335" y2="200"/><line x1="330" y1="150" x2="335" y2="200"/>
  </g>
  <line x1="118" y1="106" x2="152" y2="124" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <circle cx="60" cy="60" r="7" fill="#10b981"/><circle cx="40" cy="120" r="7" fill="#10b981"/>
  <circle cx="110" cy="100" r="8" fill="#ef4444"/>
  <circle cx="150" cy="60" r="7" fill="#3b82f6"/><circle cx="160" cy="130" r="9" fill="#3b82f6"/>
  <circle cx="90" cy="170" r="7" fill="#3b82f6"/><circle cx="130" cy="190" r="7" fill="#3b82f6"/>
  <circle cx="210" cy="90" r="7" fill="#3b82f6"/><circle cx="200" cy="170" r="7" fill="#3b82f6"/>
  <circle cx="250" cy="60" r="7" fill="#3b82f6"/><circle cx="240" cy="150" r="7" fill="#3b82f6"/>
  <circle cx="300" cy="180" r="7" fill="#3b82f6"/><circle cx="330" cy="150" r="7" fill="#3b82f6"/><circle cx="335" cy="200" r="7" fill="#3b82f6"/>
  <text x="112" y="88" class="s" fill="#ef4444">${L('infected', 'terinfeksi')}</text>
  <text x="168" y="118" class="s">${L('hub: 5 contacts', 'hub: 5 kontak')}</text>
  <text x="14" y="42" class="s" fill="#10b981">${L('recovered: immune,', 'pulih: kebal,')}</text>
  <text x="14" y="54" class="s" fill="#10b981">${L('path blocked', 'jalur terhalang')}</text>
  <text x="278" y="118" class="s">${L('isolated cluster:', 'klaster terpencil:')}</text>
  <text x="278" y="130" class="s">${L('unreachable', 'tak terjangkau')}</text>
  <text x="14" y="212" class="s">${L('each step: infect each S neighbour with p_infect;', 'tiap langkah: tulari tetangga S dengan p_infect;')}</text>
  <text x="14" y="224" class="s">${L('recover with p_recover (I lasts ~1/p_recover steps)', 'pulih dengan p_recover (I ~1/p_recover langkah)')}</text>
  <circle cx="190" cy="26" r="5" fill="#3b82f6"/><text x="200" y="30" class="s">S</text>
  <circle cx="226" cy="26" r="5" fill="#ef4444"/><text x="236" y="30" class="s">I</text>
  <circle cx="258" cy="26" r="5" fill="#10b981"/><text x="268" y="30" class="s">R</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Infection spreads only along contacts, so the structure of the contact network shapes an epidemic as much as the pathogen does.',
        'There is a threshold: roughly, outbreaks take off when the chance of transmitting along an edge times the average degree exceeds 1.',
        'Reducing contacts (degree) and reducing per-contact infection probability are interchangeable ways to push an epidemic below threshold.',
        'Outcomes are random: the same settings can give a fizzle or a large outbreak, so repeat runs are essential.',
        'As recovered, immune people accumulate they block transmission paths, and the epidemic ends while susceptible people still remain: herd immunity.',
      ],
      id: [
        'Infeksi hanya menyebar lewat kontak, sehingga struktur jaringan kontak membentuk epidemi sama besarnya dengan patogen itu sendiri.',
        'Ada ambang: secara kasar, wabah meledak ketika peluang menular lewat satu sisi dikalikan derajat rata-rata melebihi 1.',
        'Mengurangi kontak (derajat) dan mengurangi peluang infeksi per kontak adalah dua cara yang setara untuk menekan epidemi ke bawah ambang.',
        'Hasilnya acak: pengaturan yang sama bisa menghasilkan wabah yang padam atau wabah besar, sehingga pengulangan sangat penting.',
        'Saat orang pulih yang kebal menumpuk, mereka menutup jalur penularan, dan epidemi berakhir walaupun masih ada orang rentan: kekebalan kelompok.',
      ],
    },
    vocabulary: {
      en: [
        ['SIR model', 'A model that tracks Susceptible, Infected and Recovered people and the flows S → I → R.'],
        ['Node and edge', 'A node is one person; an edge is a contact between two people along which infection can pass.'],
        ['Degree', 'The number of edges a node has, that is, how many contacts a person has.'],
        ['Basic reproduction number (R₀)', 'The average number of new cases one infected person causes in a fully susceptible population.'],
        ['Herd immunity', 'The state in which enough people are immune that each case infects fewer than one other person, so the outbreak declines.'],
        ['Epidemic threshold', 'The combination of transmissibility and contacts above which an outbreak can grow rather than fizzle.'],
        ['Percolation', 'Whether a network has a connected path spanning most of it; below a critical average degree it breaks into small islands.'],
        ['Stochastic', 'Governed by chance; a stochastic model gives a different outcome every run even with identical settings.'],
      ],
      id: [
        ['Model SIR', 'Model yang melacak orang Rentan (S), Terinfeksi (I), dan Pulih (R) serta aliran S → I → R.'],
        ['Simpul dan sisi', 'Simpul adalah satu orang; sisi adalah kontak antara dua orang yang bisa dilalui infeksi.'],
        ['Derajat', 'Jumlah sisi yang dimiliki sebuah simpul, yaitu berapa banyak kontak yang dimiliki seseorang.'],
        ['Bilangan reproduksi dasar (R₀)', 'Rata-rata jumlah kasus baru yang ditimbulkan satu orang terinfeksi dalam populasi yang seluruhnya rentan.'],
        ['Kekebalan kelompok', 'Keadaan ketika cukup banyak orang kebal sehingga tiap kasus menulari kurang dari satu orang lain, dan wabah pun menurun.'],
        ['Ambang epidemi', 'Kombinasi daya tular dan kontak yang di atasnya wabah bisa membesar, bukan padam.'],
        ['Perkolasi', 'Apakah sebuah jaringan memiliki jalur terhubung yang mencakup sebagian besarnya; di bawah derajat rata-rata kritis jaringan pecah menjadi pulau-pulau kecil.'],
        ['Stokastik', 'Diatur oleh peluang; model stokastik memberi hasil berbeda setiap kali dijalankan walaupun pengaturannya identik.'],
      ],
    },
    misconceptions: {
      en: [
        ['R₀ is a fixed property of a virus.', 'It depends just as much on the population: how many contacts people have and how they behave. The same virus has a different R₀ in a crowded city and a scattered village, which is why lowering the average degree in the sim changes the outcome.'],
        ['If the disease is above threshold, a big outbreak is guaranteed.', 'Early on, with only one or two infected people, chance dominates. The first case may recover before infecting anyone, so even strongly transmissible diseases often fizzle; run the sim several times to see this.'],
        ['Herd immunity means the disease has disappeared or that everyone is immune.', 'It means enough people are immune that each case infects fewer than one other, so the outbreak shrinks. Some susceptible people remain and can still be infected during the decline.'],
        ['Doubling the infection probability doubles the size of the outbreak.', 'The response is strongly non-linear: below threshold almost nothing happens, just above it the final size jumps, and at high values it saturates because nearly everyone reachable is already infected.'],
      ],
      id: [
        ['R₀ adalah sifat tetap sebuah virus.', 'R₀ sama bergantungnya pada populasi: berapa banyak kontak yang dimiliki orang dan bagaimana mereka berperilaku. Virus yang sama memiliki R₀ berbeda di kota padat dan di desa yang tersebar, itulah sebabnya menurunkan derajat rata-rata di simulasi mengubah hasilnya.'],
        ['Jika penyakit di atas ambang, wabah besar pasti terjadi.', 'Di awal, dengan hanya satu atau dua orang terinfeksi, peluang yang berkuasa. Kasus pertama bisa pulih sebelum menulari siapa pun, sehingga penyakit yang sangat menular pun sering padam; jalankan simulasi beberapa kali untuk melihatnya.'],
        ['Kekebalan kelompok berarti penyakit sudah hilang atau semua orang kebal.', 'Artinya cukup banyak orang kebal sehingga tiap kasus menulari kurang dari satu orang lain, dan wabah menyusut. Masih ada orang rentan yang tetap bisa tertular selama penurunan itu.'],
        ['Menggandakan peluang infeksi menggandakan ukuran wabah.', 'Responsnya sangat tak linear: di bawah ambang hampir tidak terjadi apa-apa, tepat di atasnya ukuran akhir melonjak, dan pada nilai tinggi hasilnya jenuh karena hampir semua orang yang terjangkau sudah terinfeksi.'],
      ],
    },
    realWorld: {
      en: [
        'Contact tracing is network epidemiology in practice: health workers follow the edges from each case to find who may have been exposed.',
        'Super-spreading events, in which one person at a crowded gathering infects dozens, show how a high-degree node drives an outbreak; for many diseases a minority of cases cause most transmissions.',
        'Smallpox was eradicated partly through ring vaccination, immunising the contacts of each case to cut the edges around it rather than vaccinating everyone.',
        'School closures and gathering limits during COVID-19 worked by lowering the average degree of the contact network, the same lever as the "Avg degree" slider.',
      ],
      id: [
        'Pelacakan kontak adalah epidemiologi jaringan dalam praktik: petugas kesehatan mengikuti sisi-sisi dari tiap kasus untuk menemukan siapa yang mungkin terpapar.',
        'Peristiwa penularan super, ketika satu orang di kerumunan menulari puluhan orang, menunjukkan bagaimana simpul berderajat tinggi mendorong wabah; pada banyak penyakit, sebagian kecil kasus menyebabkan sebagian besar penularan.',
        'Cacar diberantas antara lain lewat vaksinasi cincin, mengimunisasi kontak-kontak dari tiap kasus untuk memutus sisi-sisi di sekitarnya, bukan memvaksinasi semua orang.',
        'Penutupan sekolah dan pembatasan kerumunan selama COVID-19 bekerja dengan menurunkan derajat rata-rata jaringan kontak, tuas yang sama dengan slider "Avg degree".',
      ],
    },
    questions: {
      en: [
        { q: 'With recovery probability 0.05, how long does a person stay infectious on average? What happens to the outbreak if you raise it to 0.25, and why?', a: 'About 1/0.05 = 20 steps. At 0.25 the infectious period drops to about 4 steps, so each person has far fewer chances to transmit along each edge, the per-edge transmission chance falls, and the outbreak is much more likely to fizzle. Faster isolation of cases has the same effect in real life.' },
        { q: 'Set the average degree to 1 and the infection probability to 1.0. Outbreaks still almost always stay tiny. Why?', a: 'With an average degree of about 1 or less, a random network has no large connected component; it is a scatter of small islands. The disease spreads with certainty along every edge, but it runs out of edges after a handful of people. This is the percolation limit: network structure, not the pathogen, stops the spread.' },
        { q: 'Estimate the early reproduction number at the default settings: average degree 4, infection probability 0.15, recovery probability 0.05.', a: 'The chance of infecting a given neighbour before recovering is about 0.15 / (0.15 + 0.05) ≈ 0.75 (ignoring the small chance of both happening in the same step). An early case has about 4 contacts, but one of them is the person who infected it, so roughly 3 susceptible neighbours × 0.75 ≈ 2 to 2.5 new cases each: well above 1, so large outbreaks are common at these settings.' },
      ],
      id: [
        { q: 'Dengan peluang pulih 0,05, berapa lama rata-rata seseorang tetap menular? Apa yang terjadi pada wabah jika dinaikkan ke 0,25, dan mengapa?', a: 'Sekitar 1/0,05 = 20 langkah. Pada 0,25 masa menular turun ke sekitar 4 langkah, sehingga tiap orang punya jauh lebih sedikit kesempatan menular lewat tiap sisi, peluang penularan per sisi turun, dan wabah jauh lebih mungkin padam. Isolasi kasus yang lebih cepat memberi efek yang sama dalam kehidupan nyata.' },
        { q: 'Atur derajat rata-rata ke 1 dan peluang infeksi ke 1,0. Wabah hampir selalu tetap kecil. Mengapa?', a: 'Dengan derajat rata-rata sekitar 1 atau kurang, jaringan acak tidak memiliki komponen terhubung yang besar; ia hanya sebaran pulau-pulau kecil. Penyakit pasti menular lewat setiap sisi, tetapi kehabisan sisi setelah segelintir orang. Inilah batas perkolasi: struktur jaringan, bukan patogennya, yang menghentikan penyebaran.' },
        { q: 'Perkirakan bilangan reproduksi awal pada pengaturan awal: derajat rata-rata 4, peluang infeksi 0,15, peluang pulih 0,05.', a: 'Peluang menulari seorang tetangga tertentu sebelum pulih sekitar 0,15 / (0,15 + 0,05) ≈ 0,75 (mengabaikan peluang kecil keduanya terjadi pada langkah yang sama). Kasus awal punya sekitar 4 kontak, tetapi salah satunya adalah orang yang menularinya, jadi kira-kira 3 tetangga rentan × 0,75 ≈ 2 sampai 2,5 kasus baru per orang: jauh di atas 1, sehingga wabah besar umum terjadi pada pengaturan ini.' },
      ],
    },
  },
};
