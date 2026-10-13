// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish dominant strategy (PD) from coordination (Stag Hunt).',
      "Recognize there's no \"defect\" — only mistrust drives the failure.",
      'See how a small population shift can flip the equilibrium.',
    ],
    id: [
      'Membedakan strategi dominan (PD) dari koordinasi (Stag Hunt).',
      'Mengenali tidak ada "khianat" — hanya ketidakpercayaan yang menyebabkan kegagalan.',
      'Melihat pergeseran populasi kecil dapat membalik kesetimbangan.',
    ],
  },
  tryThis: {
    en: [
      'Start at 30% stag — does the population converge to all-hare?',
      'Start at 70% stag — does it converge to all-stag?',
      'Find the unstable middle equilibrium.',
    ],
    id: [
      'Mulai di 30% rusa — apakah populasi konvergen ke semua kelinci?',
      'Mulai di 70% rusa — apakah konvergen ke semua rusa?',
      'Cari kesetimbangan tengah yang tidak stabil.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The stag hunt is a story told by Rousseau in the 1750s. Two hunters can bring down a stag only if both stay at their posts; a hare, by contrast, any hunter can catch alone. The stag is worth far more, but if your partner wanders off after a hare you go home with nothing. In the simulation\'s default payoffs, two stag hunters each get a = 4, a hare hunter always gets 2 (c when the other hunts stag, d when the other hunts hare), and a stag hunter abandoned by a hare-hunting partner gets b = 0.',
        'This is a coordination game, and it differs sharply from the prisoner\'s dilemma. In the dilemma, defecting is best no matter what the other does. Here there is no dominant strategy: hunting stag is best if your partner hunts stag, and hunting hare is best if your partner hunts hare. Both all-stag and all-hare are therefore stable equilibria, from which nobody wants to deviate alone. All-stag is better for everyone (payoff-dominant), but all-hare is safer (risk-dominant): it never leaves you with nothing. Failure to cooperate here is caused not by greed but by doubt about what the other will do.',
        'The simulation plays the game in a large population where everyone meets random partners. The expected payoff of a stag hunter is p·a + (1 − p)·b, where p is the fraction of stag hunters, and that of a hare hunter is p·c + (1 − p)·d. Replicator dynamics then raise p when stag hunters earn above the population average and lower it when they earn below. The two payoffs are equal at the tipping point p* = (d − b) ÷ (a − b − c + d), 50% with the defaults; the dashed orange line marks it. Start above the line and the population climbs to all stag, start below and it slides to all hare, because being surrounded by hare hunters makes stag hunting a losing bet.',
        'The four payoff sliders let you reshape the game. Raising b (insurance for a stranded stag hunter) or a (a bigger stag) lowers the tipping point and makes cooperation easier to reach; raising d (a fatter hare) raises it. If you break the ordering a greater than c, and d greater than b, the game stops being a stag hunt: for example with c greater than a, hare becomes dominant and the game turns into a prisoner\'s dilemma. The model simplifies real life by assuming random matching, no communication, no memory of past partners and no mutation, so a population at exactly 0% or 100% stag can never move.',
      ],
      id: [
        'Berburu rusa adalah kisah yang diceritakan Rousseau pada 1750-an. Dua pemburu hanya bisa menjatuhkan seekor rusa jika keduanya tetap di posnya; kelinci, sebaliknya, bisa ditangkap sendirian oleh pemburu mana pun. Rusa jauh lebih bernilai, tetapi jika rekanmu pergi mengejar kelinci, kamu pulang tanpa apa-apa. Pada hasil bawaan simulasi, dua pemburu rusa masing-masing mendapat a = 4, pemburu kelinci selalu mendapat 2 (c jika yang lain berburu rusa, d jika yang lain berburu kelinci), dan pemburu rusa yang ditinggalkan rekannya mendapat b = 0.',
        'Ini permainan koordinasi, dan sangat berbeda dari dilema tahanan. Dalam dilema tahanan, berkhianat paling baik apa pun yang dilakukan pihak lain. Di sini tidak ada strategi dominan: berburu rusa paling baik jika rekanmu berburu rusa, dan berburu kelinci paling baik jika rekanmu berburu kelinci. Jadi semua-rusa dan semua-kelinci sama-sama kesetimbangan stabil, yang tak seorang pun ingin menyimpang darinya sendirian. Semua-rusa lebih baik bagi semua orang (dominan secara hasil), tetapi semua-kelinci lebih aman (dominan secara risiko): ia tidak pernah membuatmu pulang dengan tangan kosong. Gagalnya kerja sama di sini bukan karena ketamakan, melainkan keraguan tentang apa yang akan dilakukan pihak lain.',
        'Simulasi memainkan permainan ini dalam populasi besar yang semua anggotanya bertemu rekan acak. Hasil yang diharapkan pemburu rusa adalah p·a + (1 − p)·b, dengan p fraksi pemburu rusa, dan pemburu kelinci p·c + (1 − p)·d. Dinamika replicator lalu menaikkan p ketika pemburu rusa memperoleh di atas rata-rata populasi dan menurunkannya ketika di bawah. Kedua hasil sama besar pada titik balik p* = (d − b) ÷ (a − b − c + d), yaitu 50% dengan pengaturan awal; garis putus-putus oranye menandainya. Mulai di atas garis dan populasi menanjak ke semua rusa, mulai di bawahnya dan ia merosot ke semua kelinci, karena dikelilingi pemburu kelinci membuat berburu rusa menjadi taruhan yang merugi.',
        'Empat slider hasil memungkinkanmu membentuk ulang permainan. Menaikkan b (jaminan bagi pemburu rusa yang ditinggalkan) atau a (rusa lebih besar) menurunkan titik balik dan membuat kerja sama lebih mudah dicapai; menaikkan d (kelinci lebih gemuk) menaikkannya. Jika kamu melanggar urutan a lebih besar dari c, dan d lebih besar dari b, permainannya bukan lagi berburu rusa: misalnya dengan c lebih besar dari a, kelinci menjadi dominan dan permainan berubah menjadi dilema tahanan. Model ini menyederhanakan kehidupan nyata dengan mengasumsikan pasangan acak, tanpa komunikasi, tanpa ingatan akan rekan sebelumnya, dan tanpa mutasi, sehingga populasi yang tepat 0% atau 100% rusa tidak akan pernah bergeser.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: payoffs to the row player with the default a = 4, b = 0, c = 2, d = 2. Right: a stag hunter\'s expected payoff 4p (purple) rises with the share of stag hunters p, while a hare hunter\'s stays at 2 (green). They cross at the tipping point p* = 0.5; the population moves away from it in whichever direction it starts.',
        id: 'Kiri: hasil pemain baris dengan nilai awal a = 4, b = 0, c = 2, d = 2. Kanan: hasil yang diharapkan pemburu rusa 4p (ungu) naik bersama porsi pemburu rusa p, sedangkan pemburu kelinci tetap 2 (hijau). Keduanya berpotongan di titik balik p* = 0,5; populasi menjauh darinya ke arah mana pun ia mulai.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Stag hunt payoff matrix and tipping point', 'Matriks hasil berburu rusa dan titik balik')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.g{fill:none;stroke:currentColor;stroke-width:1;opacity:.5}.c{fill:none;stroke:currentColor;stroke-width:1}</style>
  <text x="12" y="18" font-weight="bold">${L('Payoff to row player', 'Hasil pemain baris')}</text>
  <text x="66" y="44" class="s">${L('vs Stag', 'vs Rusa')}</text>
  <text x="124" y="44" class="s">${L('vs Hare', 'vs Kelinci')}</text>
  <text x="12" y="76" fill="#8b5cf6">${L('Stag', 'Rusa')}</text>
  <text x="12" y="116" fill="#10b981">${L('Hare', 'Kelinci')}</text>
  <rect x="60" y="54" width="56" height="36" class="c"/>
  <rect x="116" y="54" width="56" height="36" class="c"/>
  <rect x="60" y="90" width="56" height="36" class="c"/>
  <rect x="116" y="90" width="56" height="36" class="c"/>
  <text x="66" y="68" class="s">a</text>
  <text x="84" y="84" font-weight="bold">4</text>
  <text x="122" y="68" class="s">b</text>
  <text x="140" y="84" font-weight="bold">0</text>
  <text x="66" y="104" class="s">c</text>
  <text x="84" y="120" font-weight="bold">2</text>
  <text x="122" y="104" class="s">d</text>
  <text x="140" y="120" font-weight="bold">2</text>
  <text x="12" y="150" class="s">${L('two stable equilibria:', 'dua kesetimbangan stabil:')}</text>
  <text x="12" y="164" class="s" fill="#8b5cf6">${L('both stag (4, 4) — best for both', 'keduanya rusa (4, 4) — terbaik bagi keduanya')}</text>
  <text x="12" y="178" class="s" fill="#10b981">${L('both hare (2, 2) — safe', 'keduanya kelinci (2, 2) — aman')}</text>
  <line x1="200" y1="200" x2="340" y2="200" class="g"/>
  <line x1="200" y1="60" x2="200" y2="200" class="g"/>
  <text x="186" y="204" class="s">0</text>
  <text x="186" y="64" class="s">4</text>
  <text x="186" y="134" class="s">2</text>
  <text x="196" y="214" class="s">0</text>
  <text x="334" y="214" class="s">1</text>
  <text x="228" y="236" class="s">${L('fraction hunting stag p', 'fraksi pemburu rusa p')}</text>
  <line x1="200" y1="200" x2="340" y2="60" stroke="#8b5cf6" stroke-width="2.2"/>
  <line x1="200" y1="130" x2="340" y2="130" stroke="#10b981" stroke-width="2.2"/>
  <text x="286" y="78" fill="#8b5cf6" class="s">${L('stag: 4p', 'rusa: 4p')}</text>
  <text x="206" y="124" fill="#10b981" class="s">${L('hare: 2', 'kelinci: 2')}</text>
  <circle cx="270" cy="130" r="4" fill="#f59e0b"/>
  <line x1="270" y1="130" x2="270" y2="200" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="252" y="224" fill="#f59e0b" class="s">p* = 0.5</text>
  <path d="M262 190 L224 190 L230 185 M224 190 L230 195" fill="none" stroke="#10b981" stroke-width="1.6"/>
  <path d="M278 190 L316 190 L310 185 M316 190 L310 195" fill="none" stroke="#8b5cf6" stroke-width="1.6"/>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In a stag hunt the best choice depends on what the other player does: stag if they hunt stag, hare if they hunt hare.',
        'There are two stable equilibria, all-stag (better for everyone) and all-hare (safer), separated by an unstable tipping point.',
        'The tipping point is p* = (d − b) ÷ (a − b − c + d), where stag and hare hunters earn the same; with the defaults it is 50%.',
        'Starting above the tipping point leads to full cooperation, starting below leads to its collapse, so expectations decide the outcome.',
        'Unlike the prisoner\'s dilemma, cooperation fails here through mistrust, not because defecting is always better.',
      ],
      id: [
        'Dalam berburu rusa, pilihan terbaik bergantung pada apa yang dilakukan pemain lain: rusa jika ia berburu rusa, kelinci jika ia berburu kelinci.',
        'Ada dua kesetimbangan stabil, semua-rusa (lebih baik bagi semua) dan semua-kelinci (lebih aman), dipisahkan oleh titik balik yang tak stabil.',
        'Titik baliknya p* = (d − b) ÷ (a − b − c + d), ketika pemburu rusa dan kelinci memperoleh hasil sama; dengan nilai awal, 50%.',
        'Mulai di atas titik balik menuju kerja sama penuh, mulai di bawahnya menuju keruntuhan, sehingga ekspektasi menentukan hasil akhir.',
        'Berbeda dari dilema tahanan, kerja sama di sini gagal karena ketidakpercayaan, bukan karena berkhianat selalu lebih baik.',
      ],
    },
    vocabulary: {
      en: [
        ['Coordination game', 'A game in which players do best by matching each other\'s choice, so there is more than one stable outcome.'],
        ['Nash equilibrium', 'A combination of strategies in which no player can gain by changing their own choice alone.'],
        ['Payoff-dominant equilibrium', 'The equilibrium that gives every player the highest payoff (all-stag).'],
        ['Risk-dominant equilibrium', 'The equilibrium that is the safer bet when you are unsure what the other will do (all-hare here).'],
        ['Dominant strategy', 'A choice that is best regardless of what others do; the stag hunt has none, the prisoner\'s dilemma does.'],
        ['Tipping point (unstable equilibrium)', 'The fraction of stag hunters at which both strategies earn the same; any nudge away from it grows.'],
        ['Replicator dynamics', 'The rule that a strategy\'s share grows when its payoff is above the population average and shrinks when below.'],
      ],
      id: [
        ['Permainan koordinasi', 'Permainan ketika pemain paling untung bila menyamakan pilihan satu sama lain, sehingga ada lebih dari satu hasil akhir yang stabil.'],
        ['Kesetimbangan Nash', 'Kombinasi strategi ketika tidak ada pemain yang bisa untung dengan mengubah pilihannya sendirian.'],
        ['Kesetimbangan dominan-hasil', 'Kesetimbangan yang memberi hasil tertinggi bagi setiap pemain (semua-rusa).'],
        ['Kesetimbangan dominan-risiko', 'Kesetimbangan yang merupakan taruhan lebih aman saat kamu tak yakin apa yang akan dilakukan pihak lain (di sini semua-kelinci).'],
        ['Strategi dominan', 'Pilihan yang paling baik apa pun yang dilakukan orang lain; berburu rusa tidak memilikinya, dilema tahanan punya.'],
        ['Titik balik (kesetimbangan tak stabil)', 'Fraksi pemburu rusa ketika kedua strategi memperoleh hasil sama; dorongan sekecil apa pun darinya akan membesar.'],
        ['Dinamika replicator', 'Aturan bahwa porsi sebuah strategi tumbuh ketika hasilnya di atas rata-rata populasi dan menyusut ketika di bawahnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['The stag hunt is just another version of the prisoner\'s dilemma.', 'In the prisoner\'s dilemma defecting is always best, so cooperation is never an equilibrium. In the stag hunt mutual cooperation is a stable equilibrium; the difficulty is only in getting there.'],
        ['Since both hunting stag is best for both, rational players will obviously choose it.', 'Only if each is confident the other will too. A hunter who thinks the partner might go for the hare rationally prefers the guaranteed 2 over a gamble between 4 and 0.'],
        ['A population stuck at all-hare is behaving irrationally.', 'Each hare hunter is making the best reply to a world of hare hunters. The outcome is bad for everyone, but no individual can fix it alone; that is what makes a coordination trap hard to escape.'],
      ],
      id: [
        ['Berburu rusa hanyalah versi lain dari dilema tahanan.', 'Dalam dilema tahanan, berkhianat selalu paling baik, sehingga kerja sama tidak pernah menjadi kesetimbangan. Dalam berburu rusa, kerja sama bersama adalah kesetimbangan yang stabil; kesulitannya hanya pada cara mencapainya.'],
        ['Karena berburu rusa bersama paling baik bagi keduanya, pemain rasional jelas akan memilihnya.', 'Hanya jika masing-masing yakin pihak lain juga memilihnya. Pemburu yang mengira rekannya mungkin mengejar kelinci secara rasional lebih memilih 2 yang pasti daripada taruhan antara 4 dan 0.'],
        ['Populasi yang terjebak di semua-kelinci berperilaku tidak rasional.', 'Setiap pemburu kelinci sedang memberi tanggapan terbaik terhadap dunia yang penuh pemburu kelinci. Hasilnya buruk bagi semua orang, tetapi tidak ada individu yang bisa memperbaikinya sendirian; itulah yang membuat jebakan koordinasi sulit ditinggalkan.'],
      ],
    },
    realWorld: {
      en: [
        'Switching to a new messaging app or technical standard is only worthwhile if your friends switch too, so everyone may stay on the old one even though all prefer the new.',
        'Joining a strike or a protest: it succeeds only with large numbers, so each person\'s decision depends on how many others they expect to show up.',
        'International treaties on fishing or emissions: cooperation pays if everyone complies, but a country that fears others will cheat may hold back.',
        'Choosing which side of the road to drive on, or which language to use in a multilingual meeting, is a pure coordination problem where expectations settle the matter.',
      ],
      id: [
        'Pindah ke aplikasi pesan atau standar teknis baru hanya berguna jika teman-temanmu juga pindah, sehingga semua orang bisa bertahan di yang lama meski semua lebih menyukai yang baru.',
        'Ikut mogok kerja atau demonstrasi: hanya berhasil dengan jumlah besar, sehingga keputusan tiap orang bergantung pada berapa banyak orang lain yang ia perkirakan akan hadir.',
        'Perjanjian internasional tentang perikanan atau emisi: kerja sama menguntungkan jika semua patuh, tetapi negara yang takut pihak lain berbuat curang bisa menahan diri.',
        'Memilih sisi jalan untuk berkendara, atau bahasa yang dipakai dalam rapat multibahasa, adalah masalah koordinasi murni yang diselesaikan oleh ekspektasi.',
      ],
    },
    questions: {
      en: [
        { q: 'With the default payoffs, the population starts at 40% stag hunters. Which way does it move, and why?', a: 'Toward all hare. A stag hunter expects 0.4 × 4 = 1.6 while a hare hunter expects 2, so stag hunters earn below average and their share falls. The tipping point is 50%, so 40% is on the hare side.' },
        { q: 'Raise the Stag-Hare payoff b from 0 to 1 (a stranded stag hunter still gets something). Where is the tipping point now?', a: 'p* = (d − b) ÷ (a − b − c + d) = (2 − 1) ÷ (4 − 1 − 2 + 2) = 1/3 ≈ 33%. A safety net for stag hunters makes cooperation easier: the population now tips to all stag from any start above 33%.' },
        { q: 'Why is the middle equilibrium called unstable, when it is a point where nobody is tempted to change?', a: 'At exactly p* both strategies earn the same, so the shares do not move. But the smallest push away is self-reinforcing: a few more stag hunters raise the stag payoff, attracting still more, and vice versa. Like a ball balanced on a hilltop, it is an equilibrium that cannot survive any disturbance.' },
      ],
      id: [
        { q: 'Dengan hasil bawaan, populasi mulai di 40% pemburu rusa. Ke arah mana ia bergerak, dan mengapa?', a: 'Menuju semua kelinci. Pemburu rusa mengharapkan 0,4 × 4 = 1,6 sedangkan pemburu kelinci mengharapkan 2, sehingga pemburu rusa memperoleh di bawah rata-rata dan porsinya turun. Titik baliknya 50%, jadi 40% berada di sisi kelinci.' },
        { q: 'Naikkan hasil Stag-Hare b dari 0 ke 1 (pemburu rusa yang ditinggalkan masih mendapat sesuatu). Di mana titik baliknya sekarang?', a: 'p* = (d − b) ÷ (a − b − c + d) = (2 − 1) ÷ (4 − 1 − 2 + 2) = 1/3 ≈ 33%. Jaring pengaman bagi pemburu rusa membuat kerja sama lebih mudah: populasi kini berbalik ke semua rusa dari titik awal mana pun di atas 33%.' },
        { q: 'Mengapa kesetimbangan tengah disebut tak stabil, padahal di titik itu tak ada yang tergoda untuk berubah?', a: 'Tepat di p* kedua strategi memperoleh hasil sama, sehingga porsinya tidak bergerak. Namun dorongan sekecil apa pun bersifat memperkuat diri: beberapa pemburu rusa tambahan menaikkan hasil rusa, menarik lebih banyak lagi, dan sebaliknya. Seperti bola yang diseimbangkan di puncak bukit, ia kesetimbangan yang tidak tahan gangguan apa pun.' },
      ],
    },
  },
};
