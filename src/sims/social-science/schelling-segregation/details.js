// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect individual rules to emergent collective patterns.',
      'Show that mild preferences (e.g., 30% same) still produce strong segregation.',
      'Identify the threshold where the system stops self-segregating.',
    ],
    id: [
      'Menghubungkan aturan individu dengan pola kolektif yang muncul.',
      'Menunjukkan bahwa preferensi ringan (mis. 30% sejenis) tetap menghasilkan segregasi kuat.',
      'Mengenali ambang di mana sistem berhenti melakukan segregasi sendiri.',
    ],
  },
  tryThis: {
    en: [
      'Set tolerance to 30% — does the grid still segregate?',
      'Find the threshold where segregation stops.',
      'Crank density up — does the speed of segregation change?',
    ],
    id: [
      'Atur ambang ke 30% — apakah grid tetap tersegregasi?',
      'Cari ambang di mana segregasi berhenti.',
      'Naikkan kepadatan tinggi — apakah kecepatan segregasi berubah?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In 1971 the economist Thomas Schelling asked a simple question: if nobody minds living next to people from another group, as long as they are not too outnumbered, what does a neighbourhood end up looking like? His answer, worked out with coins on a chessboard, was that even very mild preferences produce sharply divided neighbourhoods. The sim rebuilds that experiment on a 50 × 50 grid. Each cell is empty or holds an agent from one of two groups, red or blue. An agent looks at the up to eight cells around it, ignores the empty ones, and counts what share of its occupied neighbours are the same colour. If that share is at least the threshold set by the "Tolerance" slider, the agent is happy and stays put; otherwise it is unhappy. An agent with no occupied neighbours at all counts as happy.',
        'Each step of the simulation picks one unhappy agent at random and moves it to a randomly chosen empty cell anywhere on the grid, whether or not the new spot is any better. The readout shows the share of happy agents and the number of moves so far, and movement stops once everyone is happy or no empty cell remains. Note that the slider\'s name can mislead: it sets the minimum share of similar neighbours an agent demands, so a higher value means a pickier agent. At 30%, every agent is content to be in a clear minority, yet the grid still sorts itself into large single-colour patches with, on average, 70% or more same-colour neighbours. The mechanism is a ratchet. Agents only move when unhappy and stop as soon as they are satisfied. Mixed neighbourhoods are fragile: one departure lowers the same-colour share of those left behind and can tip them into leaving too. Solid clusters, by contrast, satisfy everyone and are never disturbed. Random moves therefore drift the grid toward clustering far beyond what any individual asked for. That gap between the rule each agent follows and the pattern they produce together is what is meant by emergence.',
        'Density sets the share of cells that are occupied; with more empty cells there are more places to move to, while at very high density the few empty cells are quickly taken and unhappy agents have nowhere to go. Red share makes the groups unequal; the minority has a harder time finding same-colour neighbours and clusters more tightly. Moves per second only changes how fast you watch. The paint tool lets you draw starting patterns by dragging on the grid: try a perfect checkerboard, where each agent\'s four diagonal neighbours are the same colour and four side neighbours are different, so everyone has exactly 50% and is happy at any threshold up to 50%. That shows that a stable, fully integrated pattern exists; the random process simply never finds it. At high thresholds, around 70 to 80% and above, the grid never settles: with two groups demanding that most of their neighbours match, agents along every boundary between clusters stay unhappy, keep moving and keep disturbing others, so the happiness reading stalls below 100%.',
        'This is a model of one mechanism, not an explanation of real segregation. Real cities involve housing prices, incomes, discrimination by landlords and lenders, historical laws, schools and transport, none of which appear here. The movers in the sim relocate at random instead of searching for a spot they like, as the agents in Schelling\'s original did; every agent uses the same threshold; nobody ever moves for any other reason, and a happy agent stays even if it would be happier elsewhere. There are only two groups and the grid has hard edges, so corner cells have just three neighbours. What the model does establish is a logical point: observing a segregated pattern does not by itself prove that the people in it hold strong preferences for segregation.',
      ],
      id: [
        'Pada 1971 ekonom Thomas Schelling mengajukan pertanyaan sederhana: jika tidak ada yang keberatan bertetangga dengan orang dari kelompok lain, asalkan tidak terlalu kalah jumlah, seperti apa akhirnya wajah sebuah lingkungan? Jawabannya, yang ia kerjakan dengan koin di atas papan catur, adalah bahwa preferensi yang sangat ringan pun menghasilkan lingkungan yang terbelah tajam. Simulasi ini membangun ulang percobaan itu pada grid 50 × 50. Tiap sel kosong atau diisi seorang agen dari salah satu dua kelompok, merah atau biru. Seorang agen melihat sampai delapan sel di sekelilingnya, mengabaikan yang kosong, dan menghitung berapa bagian tetangganya yang terisi berwarna sama. Jika bagian itu paling sedikit sama dengan ambang yang diatur slider "Tolerance", agen itu senang dan bertahan; jika tidak, ia tidak senang. Agen yang sama sekali tidak punya tetangga terisi dihitung senang.',
        'Setiap langkah simulasi memilih satu agen yang tidak senang secara acak dan memindahkannya ke sel kosong yang dipilih acak di mana pun pada grid, entah tempat barunya lebih baik atau tidak. Tampilan menunjukkan bagian agen yang senang dan jumlah perpindahan sejauh ini, dan perpindahan berhenti begitu semua senang atau tidak ada sel kosong yang tersisa. Perhatikan bahwa nama slider itu bisa menyesatkan: ia mengatur bagian minimum tetangga serupa yang dituntut seorang agen, jadi nilai yang lebih tinggi berarti agen yang lebih pemilih. Pada 30%, setiap agen rela menjadi minoritas yang jelas, tetapi grid tetap menyusun diri menjadi petak-petak besar satu warna dengan, rata-rata, 70% atau lebih tetangga sewarna. Mekanismenya seperti gerigi searah. Agen hanya pindah saat tidak senang dan berhenti begitu puas. Lingkungan campuran bersifat rapuh: satu kepergian menurunkan bagian sewarna bagi yang tertinggal dan bisa mendorong mereka ikut pergi. Sebaliknya, gerombolan padat memuaskan semua orang dan tidak pernah terganggu. Perpindahan acak karena itu menghanyutkan grid menuju penggerombolan yang jauh melampaui apa yang diminta individu mana pun. Jurang antara aturan yang diikuti tiap agen dan pola yang mereka hasilkan bersama inilah yang disebut kemunculan (emergence).',
        'Density mengatur bagian sel yang terisi; dengan lebih banyak sel kosong ada lebih banyak tempat tujuan, sedangkan pada kepadatan sangat tinggi sel kosong yang sedikit cepat terisi dan agen yang tidak senang tidak punya tempat pergi. Red share membuat kedua kelompok tidak seimbang; minoritas lebih sulit menemukan tetangga sewarna dan menggerombol lebih rapat. Moves per second hanya mengubah seberapa cepat kamu menonton. Alat cat memungkinkanmu menggambar pola awal dengan menyeret di grid: cobalah papan catur sempurna, di mana empat tetangga diagonal tiap agen sewarna dan empat tetangga sisi berbeda warna, sehingga semua orang punya tepat 50% dan senang pada ambang berapa pun sampai 50%. Itu menunjukkan bahwa pola stabil yang terintegrasi penuh memang ada; proses acak hanya tidak pernah menemukannya. Pada ambang tinggi, sekitar 70 sampai 80% ke atas, grid tidak pernah menetap: dengan dua kelompok yang menuntut sebagian besar tetangganya serupa, agen di sepanjang setiap perbatasan antar-gerombolan tetap tidak senang, terus pindah, dan terus mengganggu yang lain, sehingga angka kesenangan tertahan di bawah 100%.',
        'Ini adalah model satu mekanisme, bukan penjelasan segregasi yang sesungguhnya. Kota nyata melibatkan harga rumah, pendapatan, diskriminasi oleh pemilik rumah dan pemberi kredit, hukum masa lalu, sekolah, dan transportasi, yang tidak satu pun muncul di sini. Agen yang pindah dalam simulasi berpindah secara acak, bukan mencari tempat yang mereka sukai seperti agen dalam percobaan asli Schelling; setiap agen memakai ambang yang sama; tidak ada yang pernah pindah karena alasan lain, dan agen yang senang bertahan meski bisa lebih senang di tempat lain. Hanya ada dua kelompok dan grid punya tepi keras, sehingga sel sudut hanya punya tiga tetangga. Yang berhasil ditegakkan model ini adalah satu poin logis: melihat pola yang tersegregasi tidak dengan sendirinya membuktikan bahwa orang-orang di dalamnya memiliki preferensi kuat untuk berpisah.',
      ],
    },
    figure: {
      caption: {
        en: 'The rule for one agent. Left: the red agent has 6 occupied neighbours, 2 of them red, so 33% are the same colour; below a 40% threshold it is unhappy. The sim moves it to a random empty cell. Right: in its new spot 3 of 5 occupied neighbours are red, 60%, so it is happy and stays.',
        id: 'Aturan untuk satu agen. Kiri: agen merah punya 6 tetangga terisi, 2 di antaranya merah, jadi 33% sewarna; di bawah ambang 40% ia tidak senang. Simulasi memindahkannya ke sel kosong acak. Kanan: di tempat barunya 3 dari 5 tetangga terisi berwarna merah, 60%, jadi ia senang dan bertahan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const C = { r: '#ef4444', b: '#3b82f6', e: 'none', x: '#ef4444' };
        const grid = (ox, oy, cells) => cells.map((c, i) => {
          const x = ox + (i % 3) * 30, y = oy + Math.floor(i / 3) * 30;
          const ring = c === 'x' ? `<rect x="${x + 1}" y="${y + 1}" width="24" height="24" rx="3" fill="none" stroke="#f59e0b" stroke-width="2.5"/>` : '';
          return `<rect x="${x}" y="${y}" width="26" height="26" rx="3" fill="${C[c]}" stroke="currentColor" stroke-opacity=".3" stroke-width="1" opacity="${c === 'e' ? 1 : 0.9}"/>${ring}`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Schelling neighbourhood rule: an unhappy agent moves', 'Aturan lingkungan Schelling: agen yang tidak senang pindah')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.8}</style>
  <text x="70" y="22" text-anchor="middle" style="font-weight:600">${L('Before', 'Sebelum')}</text>
  ${grid(25, 34, ['r', 'b', 'e', 'b', 'x', 'r', 'e', 'b', 'b'])}
  <text x="70" y="140" text-anchor="middle" class="s">${L('same: 2 of 6 = 33%', 'sewarna: 2 dari 6 = 33%')}</text>
  <text x="70" y="154" text-anchor="middle" class="s">${L('empty cells ignored', 'sel kosong diabaikan')}</text>
  <text x="70" y="172" text-anchor="middle" fill="#ef4444" style="font-weight:600">${L('33% &lt; 40%: unhappy', '33% &lt; 40%: tidak senang')}</text>
  <path d="M130 80 L220 80" stroke="#f59e0b" stroke-width="2" marker-end="url(#a)"/>
  <text x="178" y="70" text-anchor="middle" class="s" fill="#f59e0b">${L('moves to a', 'pindah ke')}</text>
  <text x="178" y="96" text-anchor="middle" class="s" fill="#f59e0b">${L('random empty cell', 'sel kosong acak')}</text>
  <text x="290" y="22" text-anchor="middle" style="font-weight:600">${L('After', 'Sesudah')}</text>
  ${grid(245, 34, ['r', 'e', 'r', 'e', 'x', 'b', 'r', 'b', 'e'])}
  <text x="290" y="140" text-anchor="middle" class="s">${L('same: 3 of 5 = 60%', 'sewarna: 3 dari 5 = 60%')}</text>
  <text x="290" y="172" text-anchor="middle" fill="#10b981" style="font-weight:600">${L('60% ≥ 40%: happy, stays', '60% ≥ 40%: senang, bertahan')}</text>
  <rect x="25" y="196" width="12" height="12" rx="2" fill="#ef4444" opacity=".9"/><text x="42" y="206" class="s">${L('group A', 'kelompok A')}</text>
  <rect x="105" y="196" width="12" height="12" rx="2" fill="#3b82f6" opacity=".9"/><text x="122" y="206" class="s">${L('group B', 'kelompok B')}</text>
  <rect x="185" y="196" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-opacity=".4"/><text x="202" y="206" class="s">${L('empty', 'kosong')}</text>
  <rect x="245" y="196" width="12" height="12" rx="2" fill="none" stroke="#f59e0b" stroke-width="2"/><text x="262" y="206" class="s">${L('the agent', 'agen yang dinilai')}</text>
  <text x="180" y="230" text-anchor="middle" class="s">${L('happy if same ÷ occupied neighbours ≥ threshold', 'senang jika sewarna ÷ tetangga terisi ≥ ambang')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#f59e0b"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Each agent follows one local rule: stay if at least a threshold share of your occupied neighbours are like you, otherwise move to a random empty cell.',
        'Even a threshold of 30%, which tolerates being a clear minority, produces large single-colour clusters with 70% or more same-colour neighbours.',
        'Segregation emerges because mixed neighbourhoods are fragile and solid clusters are stable, so random moves ratchet the grid toward clustering.',
        'A collective pattern can be far more extreme than the preferences of any individual in it; you cannot read preferences off the pattern.',
        'At very high thresholds the grid never settles, because agents along every cluster boundary stay unhappy and keep disturbing others.',
      ],
      id: [
        'Setiap agen mengikuti satu aturan lokal: bertahan jika paling sedikit sebagian ambang dari tetangga terisimu serupa denganmu, jika tidak pindah ke sel kosong acak.',
        'Bahkan ambang 30%, yang rela menjadi minoritas yang jelas, menghasilkan gerombolan besar satu warna dengan 70% atau lebih tetangga sewarna.',
        'Segregasi muncul karena lingkungan campuran rapuh sedangkan gerombolan padat stabil, sehingga perpindahan acak menggiring grid ke arah penggerombolan.',
        'Pola kolektif bisa jauh lebih ekstrem daripada preferensi individu mana pun di dalamnya; preferensi tidak bisa dibaca dari polanya.',
        'Pada ambang yang sangat tinggi grid tidak pernah menetap, karena agen di sepanjang setiap perbatasan gerombolan tetap tidak senang dan terus mengganggu yang lain.',
      ],
    },
    vocabulary: {
      en: [
        ['Agent-based model', 'A simulation made of many individuals, each following simple rules, whose combined behaviour is observed.'],
        ['Neighbourhood', 'The up to eight cells touching an agent\'s cell, including diagonals; empty cells are not counted.'],
        ['Threshold (the "Tolerance" slider)', 'The minimum share of same-colour neighbours an agent requires to be happy; higher means pickier.'],
        ['Happy / unhappy', 'An agent is happy when its same-colour share meets the threshold, or when it has no occupied neighbours.'],
        ['Emergence', 'A large-scale pattern produced by local interactions that is not written into any individual\'s rule.'],
        ['Segregation', 'The degree to which groups occupy separate areas; measured in the lab as the mean same-colour share of neighbours.'],
        ['Density', 'The fraction of grid cells that are occupied by agents.'],
      ],
      id: [
        ['Model berbasis agen', 'Simulasi yang terdiri dari banyak individu, masing-masing mengikuti aturan sederhana, dan perilaku gabungannya diamati.'],
        ['Lingkungan (tetangga)', 'Sampai delapan sel yang menyentuh sel seorang agen, termasuk diagonal; sel kosong tidak dihitung.'],
        ['Ambang (slider "Tolerance")', 'Bagian minimum tetangga sewarna yang dituntut seorang agen agar senang; lebih tinggi berarti lebih pemilih.'],
        ['Senang / tidak senang', 'Agen senang ketika bagian sewarnanya memenuhi ambang, atau ketika ia tidak punya tetangga terisi.'],
        ['Kemunculan (emergence)', 'Pola skala besar yang dihasilkan interaksi lokal dan tidak tertulis dalam aturan individu mana pun.'],
        ['Segregasi', 'Derajat kelompok-kelompok menempati wilayah terpisah; dalam lab diukur sebagai rata-rata bagian tetangga sewarna.'],
        ['Kepadatan', 'Bagian sel grid yang ditempati agen.'],
      ],
    },
    misconceptions: {
      en: [
        ['A segregated pattern proves that the people in it want to live apart.', 'The sim produces strongly segregated grids from agents who are each content to be in a minority. Strong segregation is consistent with mild preferences, so the pattern alone tells you little about what individuals want.'],
        ['Higher "tolerance" on the slider means more tolerant agents.', 'The slider is the share of similar neighbours an agent demands. Sliding it up makes agents pickier, and the grid segregates faster and more completely, until at very high values it cannot settle at all.'],
        ['An integrated neighbourhood can never be stable under these rules.', 'Paint a checkerboard: every agent has exactly 50% same-colour neighbours and is happy at any threshold up to 50%. Integrated stable patterns exist; the random moving process just never arrives at them, because mixed areas are easily tipped while clusters are not.'],
        ['The grid will segregate at any threshold above zero.', 'At very low thresholds, roughly 25% and below with two equal groups, most agents are already happy in a random arrangement, so very few moves happen and the grid stays mixed.'],
      ],
      id: [
        ['Pola yang tersegregasi membuktikan orang-orang di dalamnya ingin hidup terpisah.', 'Simulasi menghasilkan grid yang sangat tersegregasi dari agen-agen yang masing-masing rela menjadi minoritas. Segregasi kuat selaras dengan preferensi ringan, jadi polanya saja hanya sedikit mengatakan tentang keinginan individu.'],
        ['Nilai "tolerance" yang lebih tinggi pada slider berarti agen yang lebih toleran.', 'Slider itu adalah bagian tetangga serupa yang dituntut agen. Menaikkannya membuat agen lebih pemilih, dan grid tersegregasi lebih cepat dan lebih tuntas, sampai pada nilai yang sangat tinggi grid tidak bisa menetap sama sekali.'],
        ['Lingkungan yang terintegrasi tidak pernah bisa stabil dengan aturan ini.', 'Catlah papan catur: setiap agen punya tepat 50% tetangga sewarna dan senang pada ambang berapa pun sampai 50%. Pola stabil yang terintegrasi memang ada; proses perpindahan acak saja tidak pernah sampai ke sana, karena daerah campuran mudah terguncang sedangkan gerombolan tidak.'],
        ['Grid akan tersegregasi pada ambang berapa pun di atas nol.', 'Pada ambang sangat rendah, kira-kira 25% ke bawah dengan dua kelompok yang seimbang, sebagian besar agen sudah senang dalam susunan acak, sehingga sangat sedikit perpindahan terjadi dan grid tetap campur.'],
      ],
    },
    realWorld: {
      en: [
        'Schelling\'s model is a standard reference in studies of residential segregation, used to separate the effect of individual preferences from that of discrimination and income.',
        'Seating in a school canteen often sorts by friendship group or language within a few weeks, even though most students would happily sit anywhere with a couple of friends nearby.',
        'Online, people drift toward communities where most members share their views, producing echo chambers out of a mild wish not to be constantly outnumbered.',
        'Schelling shared the 2005 Nobel memorial prize in economics for his work on conflict and cooperation, of which this model is the best-known example.',
      ],
      id: [
        'Model Schelling menjadi rujukan baku dalam kajian segregasi hunian, dipakai untuk memisahkan pengaruh preferensi individu dari pengaruh diskriminasi dan pendapatan.',
        'Tempat duduk di kantin sekolah sering tersusun menurut kelompok pertemanan atau bahasa dalam beberapa minggu, meskipun sebagian besar siswa sebenarnya senang duduk di mana saja asal ada satu dua teman di dekatnya.',
        'Di dunia maya, orang hanyut ke komunitas yang sebagian besar anggotanya sependapat, menghasilkan ruang gema dari keinginan ringan untuk tidak terus-menerus kalah jumlah.',
        'Schelling berbagi hadiah Nobel ekonomi 2005 untuk karyanya tentang konflik dan kerja sama, dan model ini adalah contohnya yang paling terkenal.',
      ],
    },
    questions: {
      en: [
        { q: 'An agent has 8 surrounding cells: 3 hold the same colour, 3 the other colour and 2 are empty. What is its same-colour share, and is it happy at a threshold of 40%? At 60%?', a: 'Empty cells are ignored, so the share is 3 out of 6, which is 50%. At 40% it is happy (50% ≥ 40%). At 60% it is unhappy (50% < 60%) and would be moved.' },
        { q: 'At a threshold of 30% every agent is content to be in a minority. Explain why the finished grid nonetheless shows about 70% or more same-colour neighbours on average.', a: 'Moves are one-directional: an agent leaves only when unhappy and never leaves once happy. When an agent departs a mixed area, those left behind lose a same-colour neighbour and may become unhappy in turn, so mixed areas unravel. Solid clusters satisfy everyone and are never disturbed. Random moves therefore accumulate agents in clusters far denser than the 30% anyone asked for.' },
        { q: 'Set the threshold to 80%. Why does the happiness reading never reach 100%, and why does the move counter keep climbing?', a: 'With two groups each demanding at least 80% same-colour neighbours, some agents must live along the boundary between red and blue regions, and an agent on a straight boundary has at most about 5 of 8 neighbours of its own colour, 62%. Those agents are unhappy and keep moving; each random relocation drops them somewhere new, often creating fresh boundaries, so the system churns instead of settling.' },
      ],
      id: [
        { q: 'Seorang agen punya 8 sel di sekelilingnya: 3 berisi warna yang sama, 3 warna lain, dan 2 kosong. Berapa bagian sewarnanya, dan apakah ia senang pada ambang 40%? Pada 60%?', a: 'Sel kosong diabaikan, jadi bagiannya 3 dari 6, yaitu 50%. Pada 40% ia senang (50% ≥ 40%). Pada 60% ia tidak senang (50% < 60%) dan akan dipindahkan.' },
        { q: 'Pada ambang 30% setiap agen rela menjadi minoritas. Jelaskan mengapa grid akhir tetap menunjukkan rata-rata sekitar 70% atau lebih tetangga sewarna.', a: 'Perpindahan berlangsung satu arah: agen pergi hanya saat tidak senang dan tidak pernah pergi begitu senang. Ketika seorang agen meninggalkan daerah campuran, yang tertinggal kehilangan satu tetangga sewarna dan bisa menjadi tidak senang juga, sehingga daerah campuran terurai. Gerombolan padat memuaskan semua orang dan tidak pernah terganggu. Perpindahan acak karena itu menumpuk agen dalam gerombolan yang jauh lebih pekat daripada 30% yang diminta siapa pun.' },
        { q: 'Atur ambang ke 80%. Mengapa angka kesenangan tidak pernah mencapai 100%, dan mengapa penghitung perpindahan terus naik?', a: 'Dengan dua kelompok yang masing-masing menuntut paling sedikit 80% tetangga sewarna, sebagian agen pasti tinggal di sepanjang perbatasan antara wilayah merah dan biru, dan agen di perbatasan lurus paling banyak punya sekitar 5 dari 8 tetangga sewarna, 62%. Agen-agen itu tidak senang dan terus pindah; tiap perpindahan acak menjatuhkan mereka di tempat baru, sering menciptakan perbatasan baru, sehingga sistem terus bergolak alih-alih menetap.' },
      ],
    },
  },
};
