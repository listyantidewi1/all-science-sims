// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      "Compare game-theoretic prediction (any offer >0) to real-world rejection thresholds.",
      'See fairness override pure self-interest.',
      'Connect to negotiations, tipping, and social norms.',
    ],
    id: [
      'Membandingkan prediksi teori-permainan (tawaran >0 apa pun) dengan ambang penolakan nyata.',
      'Melihat keadilan mengalahkan kepentingan pribadi murni.',
      'Mengaitkan dengan negosiasi, tips, dan norma sosial.',
    ],
  },
  tryThis: {
    en: [
      'Set responder threshold to 0% — does any offer succeed?',
      'Threshold 30% — most empirical humans match this.',
      'Run 100 rounds with each strategy — count failed offers.',
    ],
    id: [
      'Atur ambang penerima ke 0% — apakah setiap tawaran berhasil?',
      'Ambang 30% — kebanyakan manusia empiris cocok dengan ini.',
      'Jalankan 100 putaran tiap strategi — hitung tawaran gagal.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The ultimatum game is one of the simplest experiments in economics, first run by Güth, Schmittberger and Schwarze in 1982. Two strangers are given $10 to share. The proposer suggests a split; the responder can accept it, in which case both are paid, or reject it, in which case both get nothing. There is no bargaining and no second chance, which is why it is called an ultimatum.',
        'If people cared only about their own money, the prediction would be clear. Any positive amount is better than nothing, so the responder should accept even $0.10, and knowing this the proposer should offer the smallest possible amount and keep the rest. Real people do not behave like this. In experiments around the world, proposers typically offer 40–50% of the pot, and responders frequently reject offers below about 20–30%, giving up real money to punish a split they consider unfair.',
        'The simulation turns the responder into a rule: accept any offer at or above the threshold set by the Responder threshold slider, reject anything below it. The Proposer offer slider sets how much of the $10 goes to the responder. Play 1 round pays out the current offer or rejects it; Play 100 (random offers) draws 100 offers spread evenly between 0% and 100% and tests each against the threshold, so you can see which fraction fails. The chart on the right colours each offer green when accepted and red when rejected, and the header totals each player\'s earnings.',
        'This is a deliberately stripped-down model. The responder never changes their mind, never weighs the size of the pot, and does not react to the proposer\'s history; the proposer does not learn from rejections; and the random offers do not resemble real proposers, who cluster near a fair split. Real responders also differ from one another and from culture to culture, so a single threshold is only a convenient summary of average behaviour.',
      ],
      id: [
        'Permainan ultimatum adalah salah satu eksperimen paling sederhana dalam ekonomi, pertama kali dijalankan oleh Güth, Schmittberger, dan Schwarze pada 1982. Dua orang asing diberi $10 untuk dibagi. Pengusul menawarkan sebuah pembagian; penanggap bisa menerimanya, sehingga keduanya dibayar, atau menolaknya, sehingga keduanya tidak mendapat apa-apa. Tidak ada tawar-menawar dan tidak ada kesempatan kedua; itulah sebabnya disebut ultimatum.',
        'Jika orang hanya peduli pada uangnya sendiri, prediksinya jelas. Jumlah positif berapa pun lebih baik daripada nol, jadi penanggap seharusnya menerima bahkan $0,10, dan karena tahu itu, pengusul seharusnya menawarkan jumlah sekecil mungkin dan menyimpan sisanya. Manusia sungguhan tidak berperilaku begitu. Dalam eksperimen di berbagai negara, pengusul biasanya menawarkan 40–50% dari total, dan penanggap sering menolak tawaran di bawah sekitar 20–30%, merelakan uang sungguhan untuk menghukum pembagian yang mereka anggap tidak adil.',
        'Simulasi mengubah penanggap menjadi sebuah aturan: terima tawaran apa pun yang setara atau di atas ambang yang diatur slider Responder threshold, tolak yang di bawahnya. Slider Proposer offer mengatur berapa bagian dari $10 yang diberikan kepada penanggap. Play 1 round membayar tawaran saat ini atau menolaknya; Play 100 (random offers) mengambil 100 tawaran yang tersebar merata antara 0% dan 100% dan menguji masing-masing terhadap ambang, sehingga kamu bisa melihat berapa bagian yang gagal. Grafik di kanan mewarnai tiap tawaran hijau jika diterima dan merah jika ditolak, dan baris judul menjumlahkan perolehan tiap pemain.',
        'Ini model yang sengaja dibuat sangat sederhana. Penanggap tidak pernah berubah pikiran, tidak menimbang besarnya total, dan tidak bereaksi pada riwayat pengusul; pengusul tidak belajar dari penolakan; dan tawaran acaknya tidak menyerupai pengusul sungguhan, yang cenderung mengumpul di dekat pembagian adil. Penanggap sungguhan juga berbeda satu sama lain dan antarbudaya, sehingga satu ambang tunggal hanyalah ringkasan praktis dari perilaku rata-rata.',
      ],
    },
    figure: {
      caption: {
        en: 'Earnings from a $10 pot when the responder rejects anything below 30%. Offers under the threshold pay both players nothing. At exactly 30% the proposer keeps $7, the most they can get; every extra dollar offered is a dollar lost. The best offer is the smallest one the responder will still accept, so the responder\'s sense of fairness sets the price.',
        id: 'Perolehan dari total $10 ketika penanggap menolak apa pun di bawah 30%. Tawaran di bawah ambang membuat kedua pemain tidak mendapat apa-apa. Tepat di 30% pengusul menyimpan $7, yang terbanyak bisa didapatnya; setiap dolar tambahan yang ditawarkan adalah dolar yang hilang. Tawaran terbaik adalah yang terkecil yang masih diterima penanggap, sehingga rasa keadilan penanggap menentukan harganya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Earnings versus offer in the ultimatum game', 'Perolehan terhadap tawaran dalam permainan ultimatum')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.g{fill:none;stroke:currentColor;stroke-width:1;opacity:.5}</style>
  <text x="12" y="18" font-weight="bold">${L('What each player earns, by offer (pot $10, threshold 30%)', 'Perolehan tiap pemain menurut tawaran (total $10, ambang 30%)')}</text>
  <line x1="50" y1="200" x2="330" y2="200" class="g"/>
  <line x1="50" y1="50" x2="50" y2="200" class="g"/>
  <text x="30" y="204" class="s">$0</text>
  <text x="30" y="129" class="s">$5</text>
  <line x1="47" y1="125" x2="53" y2="125" class="g"/>
  <text x="26" y="54" class="s">$10</text>
  <line x1="47" y1="50" x2="53" y2="50" class="g"/>
  <text x="46" y="216" class="s">0%</text>
  <text x="126" y="216" class="s">30%</text>
  <text x="180" y="216" class="s">50%</text>
  <text x="312" y="216" class="s">100%</text>
  <text x="90" y="232" class="s">${L('offer to responder (share of the $10)', 'tawaran ke penanggap (bagian dari $10)')}</text>
  <rect x="50" y="50" width="84" height="150" fill="#ef4444" opacity=".12"/>
  <text x="56" y="66" fill="#ef4444" class="s">${L('rejected:', 'ditolak:')}</text>
  <text x="56" y="79" fill="#ef4444" class="s">${L('both get $0', 'keduanya $0')}</text>
  <line x1="50" y1="200" x2="134" y2="200" stroke="#ef4444" stroke-width="3"/>
  <line x1="134" y1="200" x2="134" y2="95" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3 3"/>
  <line x1="134" y1="95" x2="330" y2="200" stroke="#3b82f6" stroke-width="2.5"/>
  <line x1="134" y1="200" x2="134" y2="155" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3"/>
  <line x1="134" y1="155" x2="330" y2="50" stroke="#10b981" stroke-width="2.5"/>
  <circle cx="134" cy="95" r="5" fill="#f59e0b"/>
  <text x="142" y="92" fill="#f59e0b" class="s">${L('best offer: proposer keeps $7', 'tawaran terbaik: pengusul simpan $7')}</text>
  <text x="200" y="128" fill="#3b82f6" class="s">${L('proposer keeps 10 − offer', 'pengusul simpan 10 − tawaran')}</text>
  <text x="222" y="178" fill="#10b981" class="s">${L('responder gets offer', 'penanggap dapat tawaran')}</text>
  <circle cx="232" cy="125" r="3.5" fill="currentColor"/>
  <text x="238" y="121" class="s">${L('50%: $5 each', '50%: $5 masing-masing')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Pure self-interest predicts tiny offers and acceptance of anything, because any money beats none.',
        'Real proposers offer 40–50% and real responders often reject offers below about 20–30%: people pay to punish unfairness.',
        'Given a responder who rejects below a threshold, the proposer\'s best offer is exactly that threshold, so fairness norms set the price of a deal.',
        'Rejecting a low offer is not a mistake; it shows that people value fairness and relative outcomes, not just their own payoff.',
        'The simulation uses a fixed threshold for the responder, which summarizes average behaviour but hides how much real people vary.',
      ],
      id: [
        'Kepentingan diri murni memprediksi tawaran sangat kecil dan penerimaan apa pun, karena uang sedikit lebih baik daripada tidak sama sekali.',
        'Pengusul sungguhan menawarkan 40–50% dan penanggap sungguhan sering menolak tawaran di bawah sekitar 20–30%: orang rela membayar untuk menghukum ketidakadilan.',
        'Bila penanggap menolak di bawah suatu ambang, tawaran terbaik pengusul adalah tepat di ambang itu, sehingga norma keadilan menentukan harga kesepakatan.',
        'Menolak tawaran rendah bukan kekeliruan; itu menunjukkan orang menghargai keadilan dan hasil relatif, bukan hanya perolehannya sendiri.',
        'Simulasi memakai ambang tetap untuk penanggap, yang meringkas perilaku rata-rata tetapi menyembunyikan betapa beragamnya orang sungguhan.',
      ],
    },
    vocabulary: {
      en: [
        ['Proposer', 'The player who suggests how to split the money.'],
        ['Responder', 'The player who accepts the split (both are paid) or rejects it (nobody is paid).'],
        ['Offer', 'The share of the pot the proposer gives to the responder, shown as a percentage in the sim.'],
        ['Threshold', 'The smallest offer the responder is willing to accept.'],
        ['Rational self-interest', 'The assumption that each person cares only about maximizing their own money.'],
        ['Fairness norm', 'A shared expectation about what a reasonable split looks like, which people are willing to enforce at a cost.'],
        ['Costly punishment', 'Giving up something yourself in order to make someone else pay for unfair behaviour.'],
      ],
      id: [
        ['Pengusul', 'Pemain yang mengusulkan cara membagi uang.'],
        ['Penanggap', 'Pemain yang menerima pembagian (keduanya dibayar) atau menolaknya (tidak ada yang dibayar).'],
        ['Tawaran', 'Bagian dari total yang diberikan pengusul kepada penanggap, ditampilkan sebagai persentase dalam simulasi.'],
        ['Ambang', 'Tawaran terkecil yang masih bersedia diterima penanggap.'],
        ['Kepentingan diri rasional', 'Asumsi bahwa setiap orang hanya peduli memaksimalkan uangnya sendiri.'],
        ['Norma keadilan', 'Harapan bersama tentang seperti apa pembagian yang wajar, yang rela ditegakkan orang meski ada biayanya.'],
        ['Hukuman berbiaya', 'Merelakan sesuatu milik sendiri agar orang lain menanggung akibat perilaku tidak adilnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Rejecting $2 when the alternative is $0 is simply irrational.', 'It is irrational only if money is all you care about. People also care about being treated fairly and about relative outcomes, and are willing to pay to enforce that. Rejections are consistent and predictable, which makes them a fact for economics to explain, not an error.'],
        ['Proposers offer about half because they are generous.', 'Partly, but much of it is strategic. A proposer who expects low offers to be rejected offers more to avoid walking away with nothing. In the dictator game, where the responder cannot reject, offers drop sharply.'],
        ['The simulation shows how real humans play the game.', 'It shows the consequences of one simple rule. Real responders have different thresholds, consider the size of the stakes, and may accept more as the pot grows; real proposers learn from rejections. The sim ignores all of this.'],
      ],
      id: [
        ['Menolak $2 ketika alternatifnya $0 jelas tidak rasional.', 'Itu tidak rasional hanya jika uang satu-satunya yang kamu pedulikan. Orang juga peduli diperlakukan adil dan pada hasil relatif, dan rela membayar untuk menegakkannya. Penolakan terjadi secara konsisten dan dapat diprediksi, sehingga menjadi fakta yang harus dijelaskan ekonomi, bukan kekeliruan.'],
        ['Pengusul menawarkan sekitar setengah karena mereka dermawan.', 'Sebagian, tetapi banyak di antaranya bersifat strategis. Pengusul yang memperkirakan tawaran rendah akan ditolak menawarkan lebih banyak agar tidak pulang dengan tangan kosong. Dalam permainan diktator, ketika penanggap tidak bisa menolak, tawaran turun tajam.'],
        ['Simulasi menunjukkan cara manusia sungguhan memainkan permainan ini.', 'Ia menunjukkan akibat dari satu aturan sederhana. Penanggap sungguhan punya ambang yang berbeda-beda, mempertimbangkan besarnya taruhan, dan mungkin lebih menerima ketika totalnya membesar; pengusul sungguhan belajar dari penolakan. Simulasi mengabaikan semua itu.'],
      ],
    },
    realWorld: {
      en: [
        'Wage negotiations and strikes: workers sometimes reject a raise they consider insulting even though a strike costs them income, just as responders reject low offers.',
        'Haggling in a market: a seller who names an outrageous price risks the buyer walking away with no sale at all.',
        'Splitting chores, a bill or a group prize among friends: splits far from equal are often refused even when accepting would leave everyone better off.',
        'Cross-cultural studies have found that typical offers and rejection rates vary between societies, showing that fairness norms are learned, not fixed.',
      ],
      id: [
        'Negosiasi upah dan mogok kerja: pekerja kadang menolak kenaikan yang mereka anggap menghina meski mogok mengurangi penghasilan, sama seperti penanggap menolak tawaran rendah.',
        'Tawar-menawar di pasar: penjual yang menyebut harga keterlaluan berisiko ditinggalkan pembeli tanpa penjualan sama sekali.',
        'Membagi tugas rumah, tagihan, atau hadiah kelompok di antara teman: pembagian yang jauh dari setara sering ditolak meski menerimanya akan membuat semua orang lebih baik.',
        'Studi lintas budaya menemukan bahwa tawaran khas dan tingkat penolakan berbeda antarmasyarakat, menunjukkan norma keadilan itu dipelajari, bukan bawaan tetap.',
      ],
    },
    questions: {
      en: [
        { q: 'The responder threshold is 40% and the proposer offers 35%. What does each player get? What if the offer is raised to 40%?', a: 'At 35% the offer is below the threshold, so it is rejected and both get $0. At 40% it is accepted: the responder gets $4 and the proposer keeps $6. Offering a little more turned $0 into $6 for the proposer.' },
        { q: 'With the threshold at 30%, you press Play 100 (random offers). Roughly how many offers are accepted, and roughly how much does each player earn in total?', a: 'Offers are spread evenly from 0% to 100%, so about 70 of 100 are at or above 30% and get accepted. Those accepted offers average 65%, so the responder gets about 70 × $6.50 ≈ $455 and the proposer about 70 × $3.50 ≈ $245. The exact numbers vary from run to run.' },
        { q: 'Why might someone turn down a 10% offer ($1) even though $1 is better than nothing?', a: 'Because they are weighing more than their own dollar. Rejecting costs them $1 but costs the proposer $9, which punishes an unfair split and upholds a norm of fairness. Experiments show most people are willing to pay this price when the offer feels insulting, so fairness is part of what people value.' },
      ],
      id: [
        { q: 'Ambang penanggap 40% dan pengusul menawarkan 35%. Berapa yang didapat tiap pemain? Bagaimana jika tawaran dinaikkan ke 40%?', a: 'Pada 35% tawaran berada di bawah ambang, jadi ditolak dan keduanya mendapat $0. Pada 40% diterima: penanggap mendapat $4 dan pengusul menyimpan $6. Menawarkan sedikit lebih banyak mengubah $0 menjadi $6 bagi pengusul.' },
        { q: 'Dengan ambang 30%, kamu menekan Play 100 (random offers). Kira-kira berapa tawaran yang diterima, dan kira-kira berapa total perolehan tiap pemain?', a: 'Tawaran tersebar merata dari 0% sampai 100%, jadi sekitar 70 dari 100 berada di atau di atas 30% dan diterima. Tawaran yang diterima itu rata-rata 65%, sehingga penanggap mendapat sekitar 70 × $6,50 ≈ $455 dan pengusul sekitar 70 × $3,50 ≈ $245. Angka pastinya berbeda tiap kali dijalankan.' },
        { q: 'Mengapa seseorang bisa menolak tawaran 10% ($1) padahal $1 lebih baik daripada nol?', a: 'Karena ia menimbang lebih dari sekadar dolarnya sendiri. Menolak merugikannya $1 tetapi merugikan pengusul $9, yang menghukum pembagian tidak adil dan menegakkan norma keadilan. Eksperimen menunjukkan kebanyakan orang rela membayar harga ini ketika tawaran terasa menghina, jadi keadilan adalah bagian dari yang dihargai orang.' },
      ],
    },
  },
};
