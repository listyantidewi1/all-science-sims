// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      "See cascades depend on threshold and seed placement.",
      "Recognize tipping points in network adoption.",
      'Compare to simple contagion (probability per contact).',
    ],
    id: [
      'Melihat cascade bergantung ambang dan posisi benih.',
      'Mengenali titik balik dalam adopsi jaringan.',
      'Membandingkan dengan penularan sederhana (probabilitas per kontak).',
    ],
  },
  tryThis: {
    en: [
      'Threshold 30%, single seed — full cascade?',
      'Threshold 50% — same seed often fizzles.',
      'Try seeding hubs vs random nodes.',
    ],
    id: [
      'Ambang 30%, benih tunggal — cascade penuh?',
      'Ambang 50% — benih yang sama sering mati.',
      'Coba menabur di hub vs simpul acak.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Some things spread like a cold: one contact with an infected person can be enough. Many social behaviours do not. Joining a protest, adopting a new app, changing how you dress or speak, is risky or costly, and people usually wait until enough of the people around them have already done it. Granovetter formalized this in 1978 as a threshold model: each person has a threshold, the fraction of their contacts who must adopt before they do. Whether a behaviour sweeps through a group then depends on how the thresholds and the contacts fit together, not only on how good the idea is.',
        'The simulation builds a random network: each pair of nodes is connected with a probability chosen so that the average node has about the Avg degree you set, and one node, the one with the most connections, starts as an adopter. The rule is the same for everyone and is set by the Adoption threshold slider: a node adopts when the fraction of its neighbours who have already adopted reaches the threshold. All nodes are updated together once per step, nobody ever un-adopts, and the header counts how many have adopted. Clicking a node toggles it, so you can seed a cascade anywhere; Rebuild network draws a fresh random graph and Clear adoption resets it.',
        'The key to the model is that the threshold is a fraction, not a count. A node with 3 neighbours adopts after a single adopting neighbour if the threshold is 30% or less (1/3 ≈ 33%), while a node with 10 neighbours needs three. Early in a cascade the only nodes that can be converted by a lone adopter are these low-degree, vulnerable nodes, so the cascade must find a connected path of them. At 30% most networks with average degree 6 cascade fully; at 50% a single seed usually converts only a few neighbours and then stalls, because every remaining node has too many non-adopting friends. That sharp change is the tipping point. Raising the average degree can actually make a cascade harder to start, since well-connected people are harder to tip, which is the opposite of what happens with a disease.',
        'This complex contagion differs from simple contagion, where each contact independently passes the behaviour on with some probability and more contacts always help. The sim is a stripped-down version even of the threshold model: everyone shares one threshold, where real populations have a spread of them; updates are synchronous; the random graph has no clusters or communities, which in real networks both protect against and incubate cascades; and the automatic seed is a hub, which the model shows is not always the best choice. Use the click-to-seed feature to compare hubs with clusters of low-degree nodes.',
      ],
      id: [
        'Ada hal yang menyebar seperti pilek: satu kontak dengan orang yang tertular bisa cukup. Banyak perilaku sosial tidak begitu. Ikut demonstrasi, mengadopsi aplikasi baru, mengubah cara berpakaian atau berbicara, itu berisiko atau mahal, dan orang biasanya menunggu sampai cukup banyak orang di sekitarnya sudah melakukannya. Granovetter merumuskannya pada 1978 sebagai model ambang: setiap orang punya ambang, yaitu fraksi kontaknya yang harus mengadopsi sebelum ia ikut. Apakah suatu perilaku menyapu seluruh kelompok lalu bergantung pada bagaimana ambang dan kontak itu saling cocok, bukan hanya pada seberapa bagus idenya.',
        'Simulasi membangun jaringan acak: setiap pasangan simpul dihubungkan dengan peluang yang dipilih agar simpul rata-rata punya kira-kira Avg degree yang kamu atur, dan satu simpul, yang koneksinya terbanyak, mulai sebagai pengadopsi. Aturannya sama bagi semua orang dan diatur slider Adoption threshold: sebuah simpul mengadopsi ketika fraksi tetangganya yang sudah mengadopsi mencapai ambang. Semua simpul diperbarui bersamaan sekali per langkah, tidak ada yang pernah berhenti mengadopsi, dan baris judul menghitung berapa yang telah mengadopsi. Mengklik simpul membalik statusnya, sehingga kamu bisa menanam cascade di mana saja; Rebuild network menggambar graf acak baru dan Clear adoption mengosongkannya.',
        'Kunci model ini adalah ambangnya berupa fraksi, bukan jumlah. Simpul dengan 3 tetangga mengadopsi setelah satu tetangga mengadopsi jika ambangnya 30% atau kurang (1/3 ≈ 33%), sedangkan simpul dengan 10 tetangga membutuhkan tiga. Di awal cascade, satu-satunya simpul yang bisa diubah oleh pengadopsi tunggal adalah simpul berderajat rendah yang rentan ini, sehingga cascade harus menemukan jalur yang tersambung di antara mereka. Pada 30%, kebanyakan jaringan berderajat rata-rata 6 mengalami cascade penuh; pada 50%, satu benih biasanya hanya mengubah beberapa tetangga lalu macet, karena setiap simpul yang tersisa punya terlalu banyak teman yang belum mengadopsi. Perubahan tajam itulah titik balik. Menaikkan derajat rata-rata justru bisa menyulitkan cascade dimulai, karena orang yang banyak koneksinya lebih sulit digoyang; ini kebalikan dari yang terjadi pada penyakit.',
        'Penularan kompleks ini berbeda dari penularan sederhana, yang setiap kontaknya secara independen meneruskan perilaku dengan suatu peluang dan lebih banyak kontak selalu membantu. Simulasi ini versi yang sangat disederhanakan bahkan dari model ambang: semua orang berbagi satu ambang, padahal populasi nyata punya sebaran ambang; pembaruan dilakukan serempak; graf acaknya tidak punya gugus atau komunitas, yang dalam jaringan nyata sekaligus melindungi dari dan menetaskan cascade; dan benih otomatisnya adalah hub, yang menurut model ini tidak selalu pilihan terbaik. Gunakan fitur klik-untuk-menanam untuk membandingkan hub dengan gugus simpul berderajat rendah.',
      ],
    },
    figure: {
      caption: {
        en: 'Threshold 30%, one adopter (red). Node X has 4 neighbours, so one adopter is only 25% of them: X waits. Node Y has 2 neighbours, so the same single adopter is 50%: Y adopts, and may push the cascade onward. The fraction rule makes poorly connected people the easiest to tip and hubs the hardest.',
        id: 'Ambang 30%, satu pengadopsi (merah). Simpul X punya 4 tetangga, jadi satu pengadopsi hanya 25% darinya: X menunggu. Simpul Y punya 2 tetangga, jadi pengadopsi tunggal yang sama berarti 50%: Y mengadopsi, dan bisa mendorong cascade berlanjut. Aturan fraksi membuat orang yang sedikit koneksinya paling mudah digoyang dan hub paling sulit.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Threshold rule on two nodes with different degree', 'Aturan ambang pada dua simpul berderajat berbeda')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.e{stroke:currentColor;stroke-width:1.5;opacity:.55}.n{fill:none;stroke:currentColor;stroke-width:1.4}.w{font-weight:bold}</style>
  <text x="12" y="18" class="w">${L('Adopt when adopted neighbours ÷ all neighbours ≥ 30%', 'Adopsi bila tetangga pengadopsi ÷ semua tetangga ≥ 30%')}</text>
  <line x1="90" y1="110" x2="40" y2="60" class="e"/>
  <line x1="90" y1="110" x2="40" y2="160" class="e"/>
  <line x1="90" y1="110" x2="140" y2="60" class="e"/>
  <line x1="90" y1="110" x2="140" y2="160" class="e"/>
  <circle cx="40" cy="60" r="10" fill="#ef4444"/>
  <circle cx="40" cy="160" r="10" class="n"/>
  <circle cx="140" cy="60" r="10" class="n"/>
  <circle cx="140" cy="160" r="10" class="n"/>
  <circle cx="90" cy="110" r="14" class="n" stroke-dasharray="3 2"/>
  <text x="85" y="114" class="w">X</text>
  <text x="30" y="192" class="s">${L('X: 1 of 4 = 25%', 'X: 1 dari 4 = 25%')}</text>
  <text x="30" y="206" class="s" fill="#3b82f6">${L('below 30% → waits', 'di bawah 30% → menunggu')}</text>
  <line x1="270" y1="110" x2="220" y2="60" class="e"/>
  <line x1="270" y1="110" x2="320" y2="60" class="e"/>
  <circle cx="220" cy="60" r="10" fill="#ef4444"/>
  <circle cx="320" cy="60" r="10" class="n"/>
  <circle cx="270" cy="110" r="14" fill="#ef4444" opacity=".35" stroke="#ef4444" stroke-width="1.6"/>
  <text x="265" y="114" class="w">Y</text>
  <text x="210" y="192" class="s">${L('Y: 1 of 2 = 50%', 'Y: 1 dari 2 = 50%')}</text>
  <text x="210" y="206" class="s" fill="#ef4444">${L('reaches 30% → adopts', 'mencapai 30% → mengadopsi')}</text>
  <path d="M270 124 L270 150 L265 143 M270 150 L275 143" fill="none" stroke="#ef4444" stroke-width="1.6"/>
  <text x="278" y="146" class="s" fill="#ef4444">${L('next step', 'langkah berikut')}</text>
  <circle cx="24" cy="226" r="5" fill="#ef4444"/>
  <text x="34" y="230" class="s">${L('adopted', 'sudah mengadopsi')}</text>
  <circle cx="140" cy="226" r="5" class="n"/>
  <text x="150" y="230" class="s">${L('not yet', 'belum')}</text>
  <text x="210" y="230" class="s" fill="#f59e0b">${L('one adopter tips degree ≤ 3 only', 'satu pengadopsi hanya menggoyang derajat ≤ 3')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In a threshold model a person adopts only when a large enough fraction of their contacts already has; one contact is rarely enough.',
        'Because the threshold is a fraction, a node with few neighbours is easier to tip than a hub with many.',
        'A cascade from a single seed must travel through a connected path of vulnerable, low-degree nodes; if none exists it stalls after a few steps.',
        'Small changes in the threshold or the network can switch the outcome from a fizzle to a full cascade: a tipping point.',
        'More connections make simple contagion (like a disease) spread faster but can make complex contagion (like a costly behaviour) harder to start.',
      ],
      id: [
        'Dalam model ambang, seseorang mengadopsi hanya ketika fraksi kontaknya yang sudah mengadopsi cukup besar; satu kontak jarang cukup.',
        'Karena ambangnya berupa fraksi, simpul dengan sedikit tetangga lebih mudah digoyang daripada hub dengan banyak tetangga.',
        'Cascade dari satu benih harus menjalar lewat jalur tersambung dari simpul rentan berderajat rendah; jika tidak ada, ia macet setelah beberapa langkah.',
        'Perubahan kecil pada ambang atau jaringan bisa mengubah hasil dari mati di tempat menjadi cascade penuh: sebuah titik balik.',
        'Lebih banyak koneksi membuat penularan sederhana (seperti penyakit) menyebar lebih cepat, tetapi bisa menyulitkan dimulainya penularan kompleks (seperti perilaku yang berbiaya).',
      ],
    },
    vocabulary: {
      en: [
        ['Threshold', 'The fraction of a person\'s contacts who must have adopted before that person adopts too.'],
        ['Cascade', 'A chain reaction in which each new adoption pushes further nodes over their threshold.'],
        ['Seed', 'The node or nodes that adopt first, before any social influence.'],
        ['Degree', 'The number of neighbours a node has in the network.'],
        ['Vulnerable node', 'A node that can be tipped by a single adopting neighbour, i.e. whose degree is at most 1 ÷ threshold.'],
        ['Simple contagion', 'Spreading in which each exposure independently has some chance of passing the thing on, as with a virus.'],
        ['Complex contagion', 'Spreading that requires reinforcement from several sources before a person adopts.'],
        ['Random (Erdős–Rényi) graph', 'A network in which each pair of nodes is linked independently with the same probability; it has no clusters.'],
      ],
      id: [
        ['Ambang', 'Fraksi kontak seseorang yang harus sudah mengadopsi sebelum orang itu ikut mengadopsi.'],
        ['Cascade', 'Reaksi berantai ketika setiap adopsi baru mendorong simpul lain melewati ambangnya.'],
        ['Benih', 'Simpul yang mengadopsi pertama kali, sebelum ada pengaruh sosial apa pun.'],
        ['Derajat', 'Jumlah tetangga yang dimiliki sebuah simpul dalam jaringan.'],
        ['Simpul rentan', 'Simpul yang bisa digoyang oleh satu tetangga pengadopsi saja, yaitu yang derajatnya paling banyak 1 ÷ ambang.'],
        ['Penularan sederhana', 'Penyebaran yang setiap paparannya secara independen berpeluang meneruskan sesuatu, seperti virus.'],
        ['Penularan kompleks', 'Penyebaran yang membutuhkan penguatan dari beberapa sumber sebelum seseorang mengadopsi.'],
        ['Graf acak (Erdős–Rényi)', 'Jaringan yang setiap pasangan simpulnya dihubungkan secara independen dengan peluang sama; tidak punya gugus.'],
      ],
    },
    misconceptions: {
      en: [
        ['More connections always help something spread.', 'True for simple contagion, but in a threshold model a well-connected person needs more adopting friends before they move. Raise Avg degree at a 40% threshold and watch cascades become rarer, not more common.'],
        ['Seeding the biggest hub is always the best way to start a cascade.', 'A hub\'s neighbours each have many other friends who have not adopted, so the hub alone may tip none of them. A cluster of a few low-degree nodes seeded together often spreads further. Try both with the click-to-seed feature.'],
        ['If a behaviour fails to spread, it must have been a bad idea.', 'In the model the idea has no quality at all; only thresholds and network structure decide. The same seed in the same network succeeds at 30% and fails at 50%.'],
        ['Adoption spreads like an epidemic, with each contact giving some chance of infection.', 'That is simple contagion. Here adoption is deterministic and needs reinforcement: a node exposed to one adopter a hundred times is no more likely to adopt than after one exposure.'],
      ],
      id: [
        ['Lebih banyak koneksi selalu membantu sesuatu menyebar.', 'Benar untuk penularan sederhana, tetapi dalam model ambang orang yang banyak koneksinya membutuhkan lebih banyak teman pengadopsi sebelum bergerak. Naikkan Avg degree pada ambang 40% dan lihat cascade menjadi lebih jarang, bukan lebih sering.'],
        ['Menanam di hub terbesar selalu cara terbaik memulai cascade.', 'Tetangga hub masing-masing punya banyak teman lain yang belum mengadopsi, sehingga hub sendirian mungkin tidak menggoyang satu pun dari mereka. Gugus beberapa simpul berderajat rendah yang ditanam bersama sering menyebar lebih jauh. Coba keduanya dengan fitur klik-untuk-menanam.'],
        ['Jika suatu perilaku gagal menyebar, idenya pasti buruk.', 'Dalam model ini ide tidak punya mutu sama sekali; hanya ambang dan struktur jaringan yang menentukan. Benih yang sama dalam jaringan yang sama berhasil pada 30% dan gagal pada 50%.'],
        ['Adopsi menyebar seperti wabah, setiap kontak memberi peluang tertular.', 'Itu penularan sederhana. Di sini adopsi bersifat deterministik dan membutuhkan penguatan: simpul yang terpapar satu pengadopsi seratus kali tidak lebih mungkin mengadopsi daripada setelah satu paparan.'],
      ],
    },
    realWorld: {
      en: [
        'Granovetter\'s original example was a crowd deciding whether to riot: each person joins once enough others have, so two crowds with almost identical people can behave completely differently.',
        'Protests and strikes grow this way: people turn out when they expect enough others to turn out, which is why they can stay small for years and then suddenly become huge.',
        'Centola\'s 2010 online experiment showed a health behaviour spread further and faster in clustered networks, where people got reinforcement from several friends, than in random ones.',
        'New messaging apps, payment apps and social platforms face the same problem: most people switch only when a large share of their own friends already have.',
      ],
      id: [
        'Contoh asli Granovetter adalah kerumunan yang memutuskan apakah akan membuat kerusuhan: setiap orang bergabung begitu cukup banyak orang lain bergabung, sehingga dua kerumunan dengan orang-orang yang hampir identik bisa berperilaku sangat berbeda.',
        'Demonstrasi dan mogok kerja tumbuh dengan cara ini: orang hadir ketika mengharapkan cukup banyak orang lain hadir; itulah sebabnya aksi bisa tetap kecil bertahun-tahun lalu tiba-tiba menjadi besar.',
        'Eksperimen daring Centola pada 2010 menunjukkan perilaku kesehatan menyebar lebih jauh dan lebih cepat di jaringan bergugus, tempat orang mendapat penguatan dari beberapa teman, dibanding di jaringan acak.',
        'Aplikasi pesan, aplikasi pembayaran, dan platform sosial baru menghadapi masalah yang sama: kebanyakan orang pindah hanya ketika sebagian besar temannya sendiri sudah pindah.',
      ],
    },
    questions: {
      en: [
        { q: 'The threshold is 30%. A node has 7 neighbours, 2 of whom have adopted. Does it adopt this step? How many adopting neighbours would it need?', a: 'No: 2/7 ≈ 28.6%, just under 30%. It needs 3 adopting neighbours, since 3/7 ≈ 42.9% is the first fraction at or above the threshold.' },
        { q: 'With a single seed and threshold 30%, which of the seed\'s neighbours can adopt in the very first step? What changes at threshold 50%?', a: 'Only neighbours whose degree is at most 3, because one adopter out of 3 is 33%, which clears 30%, while one out of 4 is 25%. At 50% only neighbours of degree 1 or 2 qualify. With average degree 6 such nodes are scarce, so the cascade usually dies at once.' },
        { q: 'Why can raising the average degree make a cascade less likely here, when more contacts always speed up a disease?', a: 'Because the threshold is a fraction of neighbours. A disease needs only one infected contact, so more contacts mean more chances. A threshold adopter needs a share of contacts to have adopted, so each extra non-adopting friend makes a single adopting friend count for less. Denser networks therefore have fewer vulnerable nodes and fewer paths for an early cascade.' },
      ],
      id: [
        { q: 'Ambangnya 30%. Sebuah simpul punya 7 tetangga, 2 di antaranya sudah mengadopsi. Apakah ia mengadopsi pada langkah ini? Berapa tetangga pengadopsi yang ia butuhkan?', a: 'Tidak: 2/7 ≈ 28,6%, sedikit di bawah 30%. Ia membutuhkan 3 tetangga pengadopsi, karena 3/7 ≈ 42,9% adalah fraksi pertama yang mencapai atau melewati ambang.' },
        { q: 'Dengan satu benih dan ambang 30%, tetangga benih mana yang bisa mengadopsi pada langkah pertama? Apa yang berubah pada ambang 50%?', a: 'Hanya tetangga berderajat paling banyak 3, karena satu pengadopsi dari 3 adalah 33%, yang melewati 30%, sedangkan satu dari 4 hanya 25%. Pada 50% hanya tetangga berderajat 1 atau 2 yang memenuhi. Dengan derajat rata-rata 6, simpul seperti itu langka, sehingga cascade biasanya langsung mati.' },
        { q: 'Mengapa menaikkan derajat rata-rata bisa membuat cascade lebih jarang di sini, padahal lebih banyak kontak selalu mempercepat penyakit?', a: 'Karena ambangnya adalah fraksi dari tetangga. Penyakit hanya membutuhkan satu kontak yang tertular, sehingga lebih banyak kontak berarti lebih banyak peluang. Pengadopsi berambang membutuhkan sebagian kontaknya sudah mengadopsi, sehingga setiap teman tambahan yang belum mengadopsi membuat satu teman pengadopsi bernilai lebih kecil. Jaringan yang lebih padat karenanya punya lebih sedikit simpul rentan dan lebih sedikit jalur bagi cascade awal.' },
      ],
    },
  },
};
