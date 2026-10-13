// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See how local rules produce hubs with very high degree.',
      'Recognize a power-law in the degree histogram.',
      'Compare to a uniform random graph (no preferential attachment).',
    ],
    id: [
      'Melihat aturan lokal menghasilkan hub dengan derajat sangat tinggi.',
      'Mengenali power-law pada histogram derajat.',
      'Membandingkan dengan graf acak uniform (tanpa preferential attachment).',
    ],
  },
  tryThis: {
    en: [
      'Run preferential attachment to 200 nodes — find the biggest hub.',
      'Switch to uniform — does any node become a giant hub?',
      'Increase m (links per new node) — does diameter shrink?',
    ],
    id: [
      'Jalankan preferential attachment hingga 200 simpul — cari hub terbesar.',
      'Beralih ke uniform — apakah ada simpul yang jadi hub raksasa?',
      'Naikkan m (jumlah link per simpul baru) — apakah diameter mengecil?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Many real networks, from the links between web pages to airline routes, citation networks and online friendships, share a striking feature: a few nodes are enormously connected while the great majority have only a handful of links. A classical random graph, in which every pair of nodes is linked with the same probability, never looks like this. Its degrees cluster tightly around the average, the way human heights do, and a node with ten times the average degree is essentially impossible. In 1999 Barabási and Albert showed that two simple ingredients, growth and preferential attachment, are enough to produce hubs.',
        'The simulation starts from a triangle of three connected nodes and adds one node at a time until the network reaches the target size. Each newcomer arrives with m links. In Preferential mode each link lands on an existing node with probability proportional to that node\'s current degree, so a node with 10 links is ten times as likely to be chosen as a node with 1. In Uniform random mode every existing node is equally likely to be chosen. Node size and colour grow with degree, and the panel on the right plots how many nodes have each degree, on log–log axes.',
        'Preferential attachment is a rich-get-richer feedback loop: the earlier a node arrived and the more links it has already collected, the faster it collects new ones. In the long run the fraction of nodes with degree k follows a power law, P(k) ∝ k^−3, which appears as a roughly straight descending line on the log–log plot (the dashed orange guide). Doubling the degree divides the number of such nodes by about eight, yet there is no cutoff, so very large hubs do occur. Under uniform attachment the degree distribution falls off exponentially instead: the plot bends down steeply, the maximum degree stays small, and no giant hub forms. Raising m gives every node more links and shortens paths between nodes, but it does not change the exponent of the power law.',
        'The model is deliberately minimal. Real networks also lose nodes and links, rewire, and connect by geography, cost or similarity rather than by popularity alone, and nodes can be attractive for reasons other than their link count (their fitness). With only a few hundred nodes the histogram is noisy and the biggest degrees are limited, so the power law shows as a trend rather than a clean line. The spring layout is only there for readability; node positions carry no information about the model.',
      ],
      id: [
        'Banyak jaringan nyata, dari tautan antarhalaman web sampai rute penerbangan, jaringan sitasi, dan pertemanan daring, punya ciri yang mencolok: beberapa simpul terhubung luar biasa banyak, sedangkan sebagian besar simpul hanya punya segelintir tautan. Graf acak klasik, yang setiap pasangan simpulnya terhubung dengan peluang yang sama, tidak pernah tampak seperti itu. Derajat simpulnya mengumpul rapat di sekitar rata-rata, seperti tinggi badan manusia, dan simpul dengan derajat sepuluh kali rata-rata praktis tidak mungkin ada. Pada 1999 Barabási dan Albert menunjukkan bahwa dua bahan sederhana, pertumbuhan dan preferential attachment (pelekatan preferensial), sudah cukup untuk melahirkan hub.',
        'Simulasi dimulai dari segitiga tiga simpul yang saling terhubung, lalu menambahkan satu simpul demi satu sampai jaringan mencapai ukuran target. Setiap simpul baru datang membawa m tautan. Pada mode Preferential, setiap tautan jatuh ke simpul lama dengan peluang yang sebanding dengan derajat simpul itu saat ini, jadi simpul berderajat 10 berpeluang sepuluh kali lebih besar terpilih daripada simpul berderajat 1. Pada mode Uniform random, semua simpul lama berpeluang sama. Ukuran dan warna simpul bertambah mengikuti derajat, dan panel di kanan memplot berapa simpul yang punya tiap derajat, pada sumbu log–log.',
        'Preferential attachment adalah umpan balik "yang kaya makin kaya": semakin awal sebuah simpul datang dan semakin banyak tautan yang sudah dikumpulkannya, semakin cepat ia mengumpulkan tautan baru. Dalam jangka panjang, fraksi simpul berderajat k mengikuti hukum pangkat, P(k) ∝ k^−3, yang tampak sebagai garis menurun yang hampir lurus pada plot log–log (garis putus-putus oranye). Menggandakan derajat membagi jumlah simpul seperti itu sekitar delapan kali, tetapi tidak ada batas atas, sehingga hub yang sangat besar memang muncul. Pada pelekatan uniform, distribusi derajat justru turun secara eksponensial: plotnya menukik tajam, derajat maksimum tetap kecil, dan tidak ada hub raksasa yang terbentuk. Menaikkan m memberi setiap simpul lebih banyak tautan dan memperpendek jarak antarsimpul, tetapi tidak mengubah pangkat hukum pangkatnya.',
        'Model ini sengaja dibuat seminimal mungkin. Jaringan nyata juga kehilangan simpul dan tautan, menyambung ulang, dan terhubung karena letak geografis, biaya, atau kesamaan, bukan hanya karena popularitas; simpul juga bisa menarik karena alasan lain selain jumlah tautannya (kebugaran atau fitness). Dengan hanya beberapa ratus simpul, histogramnya berisik dan derajat terbesar terbatas, sehingga hukum pangkat tampak sebagai tren, bukan garis mulus. Tata letak pegas hanya untuk keterbacaan; posisi simpul tidak membawa informasi apa pun tentang model.',
      ],
    },
    figure: {
      caption: {
        en: 'A new node (blue) arrives with m = 2 links. Each link goes to an existing node with probability proportional to its degree: A holds 4 of the 10 link-ends, so it gets 40% of the chances, while D and E get 10% each. Hubs grow fastest because they are already big.',
        id: 'Simpul baru (biru) datang dengan m = 2 tautan. Setiap tautan menuju simpul lama dengan peluang yang sebanding dengan derajatnya: A memegang 4 dari 10 ujung tautan, jadi peluangnya 40%, sedangkan D dan E masing-masing 10%. Hub tumbuh paling cepat karena sudah besar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('One growth step of preferential attachment', 'Satu langkah pertumbuhan preferential attachment')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.e{stroke:currentColor;stroke-width:1.5;opacity:.6}.n{fill:none;stroke:currentColor;stroke-width:1.2}.s{font-size:10px;opacity:.75}</style>
  <line x1="110" y1="120" x2="60" y2="60" class="e"/>
  <line x1="110" y1="120" x2="40" y2="140" class="e"/>
  <line x1="110" y1="120" x2="150" y2="50" class="e"/>
  <line x1="110" y1="120" x2="170" y2="180" class="e"/>
  <line x1="60" y1="60" x2="40" y2="140" class="e"/>
  <line x1="30" y1="215" x2="110" y2="120" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 3"/>
  <line x1="30" y1="215" x2="40" y2="140" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 3"/>
  <circle cx="110" cy="120" r="16" fill="#f59e0b"/>
  <circle cx="60" cy="60" r="10" class="n"/>
  <circle cx="40" cy="140" r="10" class="n"/>
  <circle cx="150" cy="50" r="7" class="n"/>
  <circle cx="170" cy="180" r="7" class="n"/>
  <circle cx="30" cy="215" r="9" fill="#3b82f6"/>
  <text x="105" y="124" font-weight="bold">A</text>
  <text x="56" y="64">B</text>
  <text x="36" y="144">C</text>
  <text x="146" y="54">D</text>
  <text x="166" y="184">E</text>
  <text x="44" y="226" fill="#3b82f6">${L('new node, m = 2', 'simpul baru, m = 2')}</text>
  <text x="128" y="110" class="s">k = 4</text>
  <text x="72" y="50" class="s">k = 2</text>
  <text x="20" y="128" class="s">k = 2</text>
  <text x="160" y="42" class="s">k = 1</text>
  <text x="180" y="196" class="s">k = 1</text>
  <text x="215" y="40">${L('chance of getting a new link', 'peluang menerima tautan baru')}</text>
  <text x="215" y="54" class="s">${L('= degree ÷ total degree (10)', '= derajat ÷ total derajat (10)')}</text>
  <line x1="220" y1="200" x2="350" y2="200" stroke="currentColor" stroke-width="1"/>
  <rect x="225" y="120" width="18" height="80" fill="#f59e0b"/>
  <rect x="251" y="160" width="18" height="40" fill="currentColor" opacity=".45"/>
  <rect x="277" y="160" width="18" height="40" fill="currentColor" opacity=".45"/>
  <rect x="303" y="180" width="18" height="20" fill="currentColor" opacity=".45"/>
  <rect x="329" y="180" width="18" height="20" fill="currentColor" opacity=".45"/>
  <text x="226" y="114" class="s">40%</text>
  <text x="252" y="154" class="s">20%</text>
  <text x="278" y="154" class="s">20%</text>
  <text x="304" y="174" class="s">10%</text>
  <text x="330" y="174" class="s">10%</text>
  <text x="230" y="214">A</text>
  <text x="256" y="214">B</text>
  <text x="282" y="214">C</text>
  <text x="308" y="214">D</text>
  <text x="334" y="214">E</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Growth plus preferential attachment (new links favour already well-connected nodes) produces hubs; uniform attachment does not.',
        'The resulting degree distribution is a power law, P(k) ∝ k^−3, which is a straight line on log–log axes.',
        'Preferential attachment is a positive feedback loop, so early arrivals have a lasting advantage.',
        'A power law has a heavy tail: most nodes are small, but a few nodes have degrees far above the average.',
        'The number of links per new node, m, changes how dense the network is but not the shape of the distribution.',
      ],
      id: [
        'Pertumbuhan plus preferential attachment (tautan baru cenderung ke simpul yang sudah banyak terhubung) melahirkan hub; pelekatan uniform tidak.',
        'Distribusi derajat yang dihasilkan adalah hukum pangkat, P(k) ∝ k^−3, yang tampak sebagai garis lurus pada sumbu log–log.',
        'Preferential attachment adalah umpan balik positif, sehingga simpul yang datang lebih awal punya keunggulan yang bertahan lama.',
        'Hukum pangkat berekor berat: kebanyakan simpul kecil, tetapi beberapa simpul berderajat jauh di atas rata-rata.',
        'Jumlah tautan per simpul baru, m, mengubah kepadatan jaringan tetapi tidak mengubah bentuk distribusinya.',
      ],
    },
    vocabulary: {
      en: [
        ['Node and edge', 'A node is an item in the network (a person, a web page); an edge is a link between two nodes.'],
        ['Degree (k)', 'The number of edges attached to a node.'],
        ['Hub', 'A node whose degree is far larger than the average.'],
        ['Preferential attachment', 'A growth rule in which the probability of receiving a new link is proportional to a node\'s current degree.'],
        ['Degree distribution', 'The fraction of nodes P(k) that have each degree k.'],
        ['Power law', 'A relation of the form P(k) ∝ k^−γ; on log–log axes it is a straight line with slope −γ.'],
        ['Scale-free network', 'A network whose degree distribution follows a power law, so there is no typical degree.'],
        ['Random (Erdős–Rényi) graph', 'A graph in which every pair of nodes is linked independently with the same probability; its degrees cluster around the mean.'],
      ],
      id: [
        ['Simpul dan sisi', 'Simpul adalah satuan dalam jaringan (orang, halaman web); sisi adalah tautan antara dua simpul.'],
        ['Derajat (k)', 'Jumlah sisi yang menempel pada sebuah simpul.'],
        ['Hub', 'Simpul yang derajatnya jauh lebih besar daripada rata-rata.'],
        ['Preferential attachment', 'Aturan pertumbuhan: peluang menerima tautan baru sebanding dengan derajat simpul saat ini.'],
        ['Distribusi derajat', 'Fraksi simpul P(k) yang memiliki tiap derajat k.'],
        ['Hukum pangkat (power law)', 'Hubungan berbentuk P(k) ∝ k^−γ; pada sumbu log–log berupa garis lurus dengan kemiringan −γ.'],
        ['Jaringan bebas skala', 'Jaringan yang distribusi derajatnya mengikuti hukum pangkat, sehingga tidak ada derajat yang "khas".'],
        ['Graf acak (Erdős–Rényi)', 'Graf yang setiap pasangan simpulnya terhubung secara independen dengan peluang sama; derajatnya mengumpul di sekitar rata-rata.'],
      ],
    },
    misconceptions: {
      en: [
        ['Hubs appear because some nodes are better or more important.', 'In this model all nodes are identical. Hubs form only because early nodes get a head start and the feedback loop amplifies it. Real networks mix this effect with genuine differences in quality.'],
        ['A power law looks like a straight line on an ordinary graph.', 'On ordinary axes it looks like a steep curve hugging both axes. The straight line appears only on log–log axes, which is why the simulation plots the histogram that way.'],
        ['A random network also has hubs, just by chance.', 'In a random graph the chance of a node having many times the average degree shrinks exponentially, so giant hubs essentially never appear. Switch to Uniform mode to see the maximum degree stay small.'],
        ['The network stops changing once it is big.', 'Growth keeps the hubs growing: the oldest node\'s expected degree rises with the square root of the network size, so there is no final state while nodes keep arriving.'],
      ],
      id: [
        ['Hub muncul karena beberapa simpul memang lebih baik atau lebih penting.', 'Dalam model ini semua simpul identik. Hub terbentuk hanya karena simpul awal mendapat awalan lebih dulu dan umpan balik memperbesarnya. Jaringan nyata memadukan efek ini dengan perbedaan mutu yang sungguhan.'],
        ['Hukum pangkat tampak seperti garis lurus pada grafik biasa.', 'Pada sumbu biasa ia tampak seperti kurva curam yang menempel pada kedua sumbu. Garis lurus hanya muncul pada sumbu log–log; itulah sebabnya simulasi menggambar histogramnya begitu.'],
        ['Jaringan acak juga punya hub, hanya karena kebetulan.', 'Pada graf acak, peluang sebuah simpul berderajat berkali-kali rata-rata menyusut secara eksponensial, sehingga hub raksasa praktis tidak pernah muncul. Beralihlah ke mode Uniform untuk melihat derajat maksimum tetap kecil.'],
        ['Jaringan berhenti berubah setelah menjadi besar.', 'Pertumbuhan terus membesarkan hub: derajat yang diharapkan dari simpul tertua naik sebanding dengan akar kuadrat ukuran jaringan, jadi tidak ada keadaan akhir selama simpul terus berdatangan.'],
      ],
    },
    realWorld: {
      en: [
        'The World Wide Web: a handful of sites receive a huge share of all incoming links, while most pages receive almost none.',
        'Scientific citations: a small number of papers are cited thousands of times, and already well-cited papers attract new citations fastest.',
        'Airline networks: a few hub airports connect to hundreds of destinations, so removing a hub disrupts far more travel than removing a small airport.',
        'Social media followers: accounts that are already popular are recommended more often and gain followers faster, a rich-get-richer effect.',
      ],
      id: [
        'World Wide Web: segelintir situs menerima bagian sangat besar dari seluruh tautan masuk, sementara kebanyakan halaman hampir tidak menerima apa pun.',
        'Sitasi ilmiah: sejumlah kecil makalah dikutip ribuan kali, dan makalah yang sudah banyak dikutip menarik kutipan baru paling cepat.',
        'Jaringan penerbangan: beberapa bandara hub terhubung ke ratusan tujuan, sehingga menutup satu hub mengganggu perjalanan jauh lebih banyak daripada menutup bandara kecil.',
        'Pengikut media sosial: akun yang sudah populer lebih sering direkomendasikan dan menambah pengikut lebih cepat, efek "yang kaya makin kaya".',
      ],
    },
    questions: {
      en: [
        { q: 'A network has total degree 200. Node X has degree 20 and node Y has degree 2. In Preferential mode, how much more likely is X than Y to receive the next link?', a: 'Ten times. The probability is degree ÷ total degree: 20/200 = 10% for X and 2/200 = 1% for Y. Each link the hub gains makes the gap a little wider.' },
        { q: 'Why does Uniform mode never produce a giant hub, even at 300 nodes?', a: 'Every existing node has the same chance of being chosen, so there is no feedback. An old node picks up new links only slowly (its expected degree grows roughly with the logarithm of the network size), and the degree distribution falls off exponentially rather than as a power law.' },
        { q: 'In the simulation, which nodes are most likely to end up as the biggest hubs, and what does that say about the model?', a: 'The first nodes added, including the three seed nodes. They have been collecting links for longest, and every link they gain raises their odds of getting the next one. The model therefore produces hubs from timing and luck alone; it has no notion of a node being better. Real networks add quality (fitness) on top of this effect.' },
      ],
      id: [
        { q: 'Sebuah jaringan punya total derajat 200. Simpul X berderajat 20 dan simpul Y berderajat 2. Pada mode Preferential, berapa kali lebih besar peluang X dibanding Y untuk menerima tautan berikutnya?', a: 'Sepuluh kali. Peluangnya adalah derajat ÷ total derajat: 20/200 = 10% untuk X dan 2/200 = 1% untuk Y. Setiap tautan yang didapat hub membuat jurangnya sedikit lebih lebar.' },
        { q: 'Mengapa mode Uniform tidak pernah menghasilkan hub raksasa, bahkan pada 300 simpul?', a: 'Setiap simpul lama berpeluang sama untuk dipilih, jadi tidak ada umpan balik. Simpul tua hanya perlahan menambah tautan baru (derajat yang diharapkannya tumbuh kira-kira sebanding dengan logaritma ukuran jaringan), dan distribusi derajatnya turun secara eksponensial, bukan mengikuti hukum pangkat.' },
        { q: 'Dalam simulasi, simpul mana yang paling mungkin berakhir sebagai hub terbesar, dan apa artinya bagi model ini?', a: 'Simpul-simpul pertama yang ditambahkan, termasuk tiga simpul awal. Mereka paling lama mengumpulkan tautan, dan setiap tautan yang didapat menaikkan peluang mendapat tautan berikutnya. Jadi model ini melahirkan hub hanya dari waktu kedatangan dan keberuntungan; tidak ada konsep simpul yang "lebih baik". Jaringan nyata menambahkan mutu (fitness) di atas efek ini.' },
      ],
    },
  },
};
