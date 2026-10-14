// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See how rational individual choice undermines a collective good.',
      'Recognize that punishment can sustain cooperation.',
      'Connect to real public goods (taxes, climate, vaccines).',
    ],
    id: [
      'Melihat bagaimana pilihan rasional individu meruntuhkan kebaikan bersama.',
      'Mengenali bahwa hukuman dapat mempertahankan kerja sama.',
      'Mengaitkan dengan barang publik nyata (pajak, iklim, vaksin).',
    ],
  },
  tryThis: {
    en: [
      'Run with no punishment — contributions head to zero?',
      'Enable punishment — does it stabilize?',
      'Add 1 free-rider to a generous group — does it spread?',
    ],
    id: [
      'Jalankan tanpa hukuman — apakah kontribusi menuju nol?',
      'Aktifkan hukuman — apakah jadi stabil?',
      'Tambahkan 1 free-rider ke kelompok dermawan — apakah ia menular?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A public good is something everyone in a group can enjoy whether or not they helped pay for it: clean air, street lighting, a well-kept classroom. In the public goods game each of n players receives an endowment of $10 and chooses how much to put into a shared pot. The pot is multiplied by a factor r (greater than 1, because cooperation creates value) and then divided equally among all players, contributors and non-contributors alike. A player\'s payoff is therefore 10 − (own contribution) + r × (total contributions) ÷ n.',
        'The trap sits in that last term. Each dollar you contribute grows into r dollars for the group, but you personally get back only r ÷ n of it; this is the marginal per-capita return. With the default 8 players and r = 1.6 you get back only $0.20 for every $1 you give, so keeping your money always pays more for you, whatever the others do. Yet if everyone reasons this way the pot is empty and each player ends with $10, while full cooperation would have given everyone $16. Individually rational choices lead to a collectively poor result: a social dilemma.',
        'The simulation plays this game round after round with players who adapt. Each player starts with a habitual contribution somewhere between 40% and 80% of the endowment and adds a little noise each round. After the payoffs are paid, every player looks at one random other player and, if that player earned more, shifts their own contribution toward that player\'s by the learning rate; a tiny random mutation keeps strategies from freezing. Because free-riders always earn more than contributors in the same group, this imitation steadily erodes contributions, and the green history line drifts toward zero. The Players slider changes n and so the marginal per-capita return r ÷ n; the Multiplier slider changes r; the Learning rate sets how fast imitation acts.',
        'Switching on Punishment of free-riders changes the payoffs: anyone contributing less than 80% of the group average loses $3 that round, while everyone else pays a small fee of $0.30 for doing the punishing; in a round where nobody falls below that line, no one is punished and no fee is charged. Cutting your contribution now costs more than it saves, so imitation no longer favours free-riding and contributions can be held up, matching laboratory experiments in which costly punishment restored cooperation. The model is a simplification: contributions are decided by imitation rather than by reasoning, punishment is automatic and uniform (and its cost is paid even when there is no one to punish), and there is no communication, reputation or choice of partners, all of which matter in real groups.',
      ],
      id: [
        'Barang publik adalah sesuatu yang bisa dinikmati semua anggota kelompok, ikut membayar atau tidak: udara bersih, lampu jalan, ruang kelas yang terawat. Dalam permainan barang publik, masing-masing dari n pemain menerima modal $10 dan memilih berapa yang dimasukkan ke dompet bersama. Isi dompet dikalikan faktor r (lebih dari 1, karena kerja sama menciptakan nilai) lalu dibagi rata ke semua pemain, baik yang menyumbang maupun yang tidak. Jadi hasil seorang pemain adalah 10 − (sumbangan sendiri) + r × (total sumbangan) ÷ n.',
        'Jebakannya ada di suku terakhir itu. Setiap dolar yang kamu sumbangkan tumbuh menjadi r dolar untuk kelompok, tetapi kamu sendiri hanya menerima kembali r ÷ n bagiannya; inilah imbal hasil marginal per kapita. Dengan pengaturan awal 8 pemain dan r = 1,6, kamu hanya menerima kembali $0,20 untuk setiap $1 yang diberikan, jadi menyimpan uang selalu lebih menguntungkan bagimu, apa pun yang dilakukan pemain lain. Namun jika semua orang berpikir begitu, dompet kosong dan tiap pemain berakhir dengan $10, padahal kerja sama penuh akan memberi semua orang $16. Pilihan yang rasional secara individu menghasilkan nasib kelompok yang buruk: sebuah dilema sosial.',
        'Simulasi memainkan permainan ini putaran demi putaran dengan pemain yang beradaptasi. Setiap pemain mulai dengan kebiasaan menyumbang antara 40% dan 80% modal, ditambah sedikit variasi acak tiap putaran. Setelah hasil dibagikan, tiap pemain melihat satu pemain lain secara acak dan, jika pemain itu memperoleh lebih banyak, menggeser sumbangannya ke arah sumbangan pemain itu sebesar laju belajar; mutasi acak kecil menjaga strategi agar tidak membeku. Karena penumpang gratis selalu memperoleh lebih banyak daripada penyumbang dalam kelompok yang sama, peniruan ini terus menggerus sumbangan, dan garis riwayat hijau merosot menuju nol. Slider Players mengubah n dan dengan itu imbal hasil marginal r ÷ n; slider Multiplier mengubah r; Learning rate mengatur seberapa cepat peniruan bekerja.',
        'Mengaktifkan Punishment of free-riders mengubah hasil: siapa pun yang menyumbang kurang dari 80% rata-rata kelompok kehilangan $3 pada putaran itu, sedangkan pemain lain membayar ongkos kecil $0,30 untuk menghukum; pada putaran ketika tidak ada yang berada di bawah batas itu, tidak ada yang dihukum dan tidak ada ongkos yang dibebankan. Memangkas sumbangan kini lebih mahal daripada penghematannya, sehingga peniruan tidak lagi berpihak pada penumpang gratis dan sumbangan bisa dipertahankan, sejalan dengan eksperimen laboratorium di mana hukuman yang berbiaya memulihkan kerja sama. Model ini penyederhanaan: sumbangan ditentukan oleh peniruan, bukan penalaran; hukuman bersifat otomatis dan seragam (ongkosnya pun dibayar meski tidak ada yang perlu dihukum); dan tidak ada komunikasi, reputasi, atau pilihan rekan, yang semuanya penting dalam kelompok sungguhan.',
      ],
    },
    figure: {
      caption: {
        en: 'Four players, $10 each, multiplier 1.6. If all contribute, everyone ends with $16, better than the $10 from keeping everything. But a lone free-rider does best of all ($22) while pulling the contributors down to $12: each $1 given returns only 1.6 ÷ 4 = $0.40 to the giver.',
        id: 'Empat pemain, masing-masing $10, pengali 1,6. Jika semua menyumbang, semua berakhir dengan $16, lebih baik daripada $10 jika semua menyimpan. Tetapi satu penumpang gratis justru paling untung ($22) sambil menyeret para penyumbang turun ke $12: setiap $1 yang diberikan hanya kembali 1,6 ÷ 4 = $0,40 ke pemberinya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Payoffs in a four-player public goods game', 'Hasil dalam permainan barang publik empat pemain')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.t{font-weight:bold}.ax{stroke:currentColor;stroke-width:1;opacity:.5}</style>
  <text x="12" y="18" class="t">${L('Payoff per player (endowment $10, r = 1.6, n = 4)', 'Hasil tiap pemain (modal $10, r = 1,6, n = 4)')}</text>
  <line x1="20" y1="190" x2="350" y2="190" class="ax"/>
  <line x1="20" y1="190" x2="20" y2="30" class="ax"/>
  <text x="2" y="194" class="s">0</text>
  <text x="2" y="124" class="s">10</text>
  <line x1="17" y1="120" x2="350" y2="120" class="ax" stroke-dasharray="3 3"/>
  <text x="2" y="54" class="s">20</text>
  <line x1="17" y1="50" x2="23" y2="50" class="ax"/>
  <rect x="40" y="78" width="16" height="112" fill="#10b981"/>
  <rect x="60" y="78" width="16" height="112" fill="#10b981"/>
  <rect x="80" y="78" width="16" height="112" fill="#10b981"/>
  <rect x="100" y="78" width="16" height="112" fill="#10b981"/>
  <text x="58" y="72" class="s">$16</text>
  <text x="30" y="208" class="s">${L('all give $10', 'semua beri $10')}</text>
  <text x="30" y="221" class="s">${L('pot 40 × 1.6 = 64', 'dompet 40 × 1,6 = 64')}</text>
  <rect x="150" y="106" width="16" height="84" fill="#10b981"/>
  <rect x="170" y="106" width="16" height="84" fill="#10b981"/>
  <rect x="190" y="106" width="16" height="84" fill="#10b981"/>
  <rect x="210" y="36" width="16" height="154" fill="#ef4444"/>
  <text x="160" y="100" class="s">$12</text>
  <text x="208" y="30" class="s" fill="#ef4444">$22</text>
  <text x="146" y="208" class="s">${L('3 give $10, 1 gives $0', '3 beri $10, 1 beri $0')}</text>
  <text x="146" y="221" class="s">${L('pot 30 × 1.6 = 48', 'dompet 30 × 1,6 = 48')}</text>
  <rect x="262" y="120" width="16" height="70" fill="currentColor" opacity=".4"/>
  <rect x="282" y="120" width="16" height="70" fill="currentColor" opacity=".4"/>
  <rect x="302" y="120" width="16" height="70" fill="currentColor" opacity=".4"/>
  <rect x="322" y="120" width="16" height="70" fill="currentColor" opacity=".4"/>
  <text x="282" y="114" class="s">$10</text>
  <text x="262" y="208" class="s">${L('nobody gives', 'tak ada yang beri')}</text>
  <text x="262" y="221" class="s">${L('pot 0', 'dompet 0')}</text>
  <text x="200" y="236" class="s" fill="#f59e0b">${L('marginal return per $1 given: 1.6 ÷ 4 = $0.40', 'imbal hasil tiap $1 yang diberi: 1,6 ÷ 4 = $0,40')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A public good benefits everyone in the group, including those who did not pay for it, so free-riding is tempting.',
        'Each $1 contributed returns r ÷ n to the contributor; when this is below 1, keeping the money is individually best even though full cooperation is best for all.',
        'Payoff-based imitation copies whoever earns more, and free-riders earn more, so contributions decay toward zero over the rounds.',
        'Larger groups (bigger n) have a smaller marginal per-capita return and collapse faster; a bigger multiplier slows the decline.',
        'Costly punishment of low contributors changes the payoffs so that free-riding no longer pays, and cooperation can be sustained.',
      ],
      id: [
        'Barang publik menguntungkan semua anggota kelompok, termasuk yang tidak ikut membayar, sehingga menumpang gratis terasa menggoda.',
        'Setiap $1 yang disumbangkan hanya kembali r ÷ n ke penyumbang; bila nilai ini di bawah 1, menyimpan uang paling untung secara individu meski kerja sama penuh paling baik untuk semua.',
        'Peniruan berbasis hasil menyalin siapa pun yang memperoleh lebih banyak, dan penumpang gratis memperoleh lebih banyak, sehingga sumbangan merosot menuju nol dari putaran ke putaran.',
        'Kelompok lebih besar (n lebih besar) punya imbal hasil marginal lebih kecil dan runtuh lebih cepat; pengali lebih besar memperlambat penurunan.',
        'Hukuman berbiaya terhadap penyumbang rendah mengubah hasil sehingga menumpang gratis tidak lagi menguntungkan, dan kerja sama bisa dipertahankan.',
      ],
    },
    vocabulary: {
      en: [
        ['Public good', 'A good that everyone can use and that is not used up by one person using it, such as street lighting or clean air.'],
        ['Endowment', 'The money each player receives at the start of a round ($10 in the simulation).'],
        ['Multiplier (r)', 'The factor by which the pot is multiplied before being shared; it represents the value created by cooperation.'],
        ['Marginal per-capita return', 'The amount a player gets back from each $1 they contribute: r ÷ n.'],
        ['Free-rider', 'Someone who enjoys the public good while contributing little or nothing to it.'],
        ['Social dilemma', 'A situation in which each person\'s self-interested choice leaves everyone worse off than cooperation would.'],
        ['Costly punishment', 'Paying a price to reduce the payoff of someone who behaved unfairly or did not cooperate.'],
      ],
      id: [
        ['Barang publik', 'Barang yang bisa dipakai semua orang dan tidak habis karena dipakai seseorang, seperti lampu jalan atau udara bersih.'],
        ['Modal (endowment)', 'Uang yang diterima tiap pemain di awal putaran ($10 dalam simulasi).'],
        ['Pengali (r)', 'Faktor pengali isi dompet sebelum dibagi; melambangkan nilai yang diciptakan kerja sama.'],
        ['Imbal hasil marginal per kapita', 'Jumlah yang diterima kembali seorang pemain dari setiap $1 yang disumbangkannya: r ÷ n.'],
        ['Penumpang gratis (free-rider)', 'Orang yang menikmati barang publik sambil menyumbang sedikit atau tidak sama sekali.'],
        ['Dilema sosial', 'Situasi ketika pilihan yang mementingkan diri tiap orang membuat semua orang lebih buruk daripada jika bekerja sama.'],
        ['Hukuman berbiaya', 'Membayar harga untuk mengurangi hasil seseorang yang berlaku tidak adil atau tidak bekerja sama.'],
      ],
    },
    misconceptions: {
      en: [
        ['People are selfish, so nobody will contribute from the start.', 'In laboratory versions of this game people typically contribute 40–60% of their endowment in the first round. The problem is not a lack of goodwill but that contributions erode as people notice free-riders earning more.'],
        ['Since everyone benefits from the pot, a rational person will contribute.', 'The group benefits, but the contributor personally gets back only r ÷ n of each dollar. When that is below 1, contributing is a loss for the individual no matter what the others do; that is exactly what makes it a dilemma.'],
        ['Punishing someone at a cost to yourself is irrational, so it will not happen.', 'Experiments show people readily pay to punish free-riders, even in one-shot anonymous games. Whatever its motive, the threat of punishment changes the payoffs and keeps contributions high.'],
        ['A bigger group is better for a public good because there are more people to share the cost.', 'In this game a bigger group lowers the marginal per-capita return r ÷ n, so free-riding becomes more tempting and contributions collapse faster. Try 16 players against 3.'],
      ],
      id: [
        ['Orang itu egois, jadi dari awal tidak ada yang akan menyumbang.', 'Dalam versi laboratorium permainan ini, orang biasanya menyumbang 40–60% modalnya pada putaran pertama. Masalahnya bukan kurangnya niat baik, melainkan sumbangan yang tergerus begitu orang melihat penumpang gratis memperoleh lebih banyak.'],
        ['Karena semua orang untung dari dompet bersama, orang rasional pasti menyumbang.', 'Kelompoknya untung, tetapi penyumbang sendiri hanya menerima kembali r ÷ n dari tiap dolar. Bila nilai itu di bawah 1, menyumbang adalah kerugian bagi individu apa pun yang dilakukan orang lain; itulah yang menjadikannya dilema.'],
        ['Menghukum orang lain dengan merugikan diri sendiri itu tidak rasional, jadi tidak akan terjadi.', 'Eksperimen menunjukkan orang bersedia membayar untuk menghukum penumpang gratis, bahkan dalam permainan sekali main yang anonim. Apa pun motifnya, ancaman hukuman mengubah hasil dan menjaga sumbangan tetap tinggi.'],
        ['Kelompok yang lebih besar lebih baik untuk barang publik karena lebih banyak orang berbagi biaya.', 'Dalam permainan ini kelompok yang lebih besar menurunkan imbal hasil marginal r ÷ n, sehingga menumpang gratis makin menggoda dan sumbangan runtuh lebih cepat. Coba 16 pemain dibandingkan 3.'],
      ],
    },
    realWorld: {
      en: [
        'Taxes pay for roads, schools and hospitals that everyone uses; tax evasion is free-riding, and audits with fines are the punishment that sustains the system.',
        'Climate: every country benefits from a stable climate, but each bears the full cost of its own emission cuts, which is why international agreements are so hard to keep.',
        'Vaccination: a vaccinated person protects others through herd immunity, so someone who skips the vaccine still enjoys much of the protection paid for by others.',
        'Group projects at school: the mark is shared, so a member who does little still benefits, and the others may respond by working less too.',
      ],
      id: [
        'Pajak membiayai jalan, sekolah, dan rumah sakit yang dipakai semua orang; mengelak pajak adalah menumpang gratis, dan pemeriksaan dengan denda adalah hukuman yang menopang sistem.',
        'Iklim: setiap negara diuntungkan iklim yang stabil, tetapi masing-masing menanggung penuh biaya pemangkasan emisinya sendiri; itulah sebabnya perjanjian internasional sulit dipatuhi.',
        'Vaksinasi: orang yang divaksin melindungi orang lain lewat kekebalan kelompok, sehingga yang melewatkan vaksin tetap menikmati sebagian besar perlindungan yang dibayar orang lain.',
        'Tugas kelompok di sekolah: nilainya dibagi bersama, jadi anggota yang bekerja sedikit tetap untung, dan yang lain bisa membalas dengan ikut mengurangi usaha.',
      ],
    },
    questions: {
      en: [
        { q: 'Eight players, multiplier 1.6, endowment $10. You contribute all $10 and the other seven contribute nothing. What do you and the others each end up with?', a: 'The pot is $10 × 1.6 = $16, shared as $2 each. You end with $0 + $2 = $2; each of the others ends with $10 + $2 = $12. Your generosity made the group $6 richer but cost you $8.' },
        { q: 'With 4 players, what multiplier would make contributing no longer a personal loss? Can you reach it in the simulation?', a: 'Contributing stops being a loss when r ÷ n reaches 1, i.e. r = n = 4. The slider only goes to 3, so with 4 or more players free-riding always pays individually. With 3 players and r = 3 each $1 given returns exactly $1, the break-even case.' },
        { q: 'Why does switching on punishment stop the slide in contributions even though the punishers themselves pay a fee?', a: 'Imitation copies whoever earns more. Without punishment a free-rider earns more than a contributor, so free-riding spreads. With punishment anyone below 80% of the average loses $3 while contributors pay only $0.30, so cutting your contribution now lowers your payoff and imitation favours contributing. Whether cooperation holds fully depends on how harsh the punishment is compared with what a free-rider saves.' },
      ],
      id: [
        { q: 'Delapan pemain, pengali 1,6, modal $10. Kamu menyumbang seluruh $10 dan tujuh pemain lain tidak menyumbang apa pun. Berapa yang kamu dan mereka peroleh?', a: 'Dompet berisi $10 × 1,6 = $16, dibagi menjadi $2 per orang. Kamu berakhir dengan $0 + $2 = $2; setiap pemain lain berakhir dengan $10 + $2 = $12. Kedermawananmu membuat kelompok $6 lebih kaya, tetapi merugikanmu $8.' },
        { q: 'Dengan 4 pemain, berapa pengali yang membuat menyumbang tidak lagi merugikan diri sendiri? Bisakah kamu mencapainya di simulasi?', a: 'Menyumbang berhenti merugikan ketika r ÷ n mencapai 1, yaitu r = n = 4. Slider hanya sampai 3, jadi dengan 4 pemain atau lebih, menumpang gratis selalu untung secara individu. Dengan 3 pemain dan r = 3, setiap $1 yang diberi kembali tepat $1: kasus impas.' },
        { q: 'Mengapa mengaktifkan hukuman menghentikan merosotnya sumbangan padahal para penghukum sendiri membayar ongkos?', a: 'Peniruan menyalin siapa pun yang memperoleh lebih banyak. Tanpa hukuman, penumpang gratis memperoleh lebih banyak daripada penyumbang, jadi menumpang gratis menyebar. Dengan hukuman, siapa pun di bawah 80% rata-rata kehilangan $3 sedangkan penyumbang hanya membayar $0,30, sehingga memangkas sumbangan kini menurunkan hasilmu dan peniruan berpihak pada penyumbang. Apakah kerja sama bertahan sepenuhnya bergantung pada seberapa keras hukuman dibanding penghematan si penumpang gratis.' },
      ],
    },
  },
};
