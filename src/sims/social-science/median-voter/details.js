// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See why two candidates converge to the median voter.',
      'Recognize when the theorem fails (multi-peaked preferences).',
      'Connect to first-past-the-post elections.',
    ],
    id: [
      'Melihat mengapa dua kandidat menyatu ke pemilih median.',
      'Mengenali kapan teorema gagal (preferensi multi-puncak).',
      'Mengaitkan dengan pemilu mayoritas sederhana.',
    ],
  },
  tryThis: {
    en: [
      'Drag candidate A toward the right tail — does B chase from the left?',
      'Add 3 candidates — does the simple result hold?',
      'Switch to bimodal voters — does converging center still win?',
    ],
    id: [
      'Geser kandidat A ke ekor kanan — apakah B mengejar dari kiri?',
      'Tambah 3 kandidat — apakah hasil sederhana ini bertahan?',
      'Beralih ke pemilih bimodal — apakah pusat tetap menang?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Imagine every voter\'s political view as a point on a line from left to right, and suppose each voter picks the candidate whose position is closest to their own. This is the spatial model of voting, introduced by Hotelling in 1929 for shops competing along a street and applied to elections by Black and Downs in the 1940s and 1950s. Its central result is the median voter theorem: with two candidates and one dimension, the candidate closer to the median voter, the one with exactly half the electorate on either side, wins. Both candidates therefore have an incentive to move toward the median, and the only position from which neither can gain by moving is the median itself.',
        'The simulation draws 200 voters from a chosen distribution along the axis and shows them as a purple histogram; the dashed yellow line marks the median voter. Each voter votes for the nearest candidate, and the percentages above the candidate dots are the resulting vote shares. Drag a candidate and watch the shares change: the boundary between two candidates\' supporters is the midpoint between them, so moving toward your rival captures the voters between the old and new midpoints. Auto-optimize candidates lets each of two candidates test a small step left and right every frame and keep the one that increases their share; both drift toward the median and end up side by side.',
        'The Voter distribution menu changes who is in the electorate. With a normal or uniform distribution the median sits in the centre. With the right-skewed distribution the median moves to the right of the centre, showing that it is the median, not the midpoint of the axis or the mean, that matters. With a bimodal, polarized electorate few voters are actually at the median, yet with two candidates the one nearer the median still wins, because the nearest-candidate rule gives them every voter on their side of the midpoint. The convergence of platforms does not require voters to be centrist.',
        'The theorem is fragile outside its assumptions. Add candidate makes three or more candidates compete, and the logic breaks: a candidate who sits at the median can be squeezed from both sides, and there is no stable set of positions, so Auto-optimize is disabled beyond two candidates. The model also ignores turnout (in reality voters far from every candidate may abstain), issues with more than one dimension, party primaries, candidate credibility and the fact that a candidate cannot change position without a reputation cost. The sim additionally assumes voters never tie: a voter exactly between two candidates is given to the first of them.',
      ],
      id: [
        'Bayangkan pandangan politik setiap pemilih sebagai titik pada garis dari kiri ke kanan, dan anggap setiap pemilih memilih kandidat yang posisinya paling dekat dengan posisinya sendiri. Inilah model spasial pemungutan suara, diperkenalkan Hotelling pada 1929 untuk toko-toko yang bersaing di sepanjang jalan dan diterapkan pada pemilu oleh Black dan Downs pada 1940-an dan 1950-an. Hasil utamanya adalah teorema pemilih median: dengan dua kandidat dan satu dimensi, kandidat yang lebih dekat ke pemilih median, yaitu pemilih yang tepat separuh pemilih lain berada di tiap sisinya, menang. Karena itu kedua kandidat terdorong bergerak ke median, dan satu-satunya posisi yang tidak memberi keuntungan jika ditinggalkan adalah median itu sendiri.',
        'Simulasi mengambil 200 pemilih dari distribusi yang dipilih di sepanjang sumbu dan menampilkannya sebagai histogram ungu; garis putus-putus kuning menandai pemilih median. Setiap pemilih memilih kandidat terdekat, dan persentase di atas titik kandidat adalah perolehan suara yang dihasilkan. Seret seorang kandidat dan lihat perolehannya berubah: batas antara pendukung dua kandidat adalah titik tengah di antara keduanya, sehingga bergerak mendekati pesaing merebut pemilih di antara titik tengah lama dan baru. Auto-optimize candidates membuat masing-masing dari dua kandidat mencoba langkah kecil ke kiri dan ke kanan setiap frame dan mempertahankan langkah yang menaikkan perolehannya; keduanya bergeser ke median dan berakhir berdampingan.',
        'Menu Voter distribution mengubah siapa yang menjadi pemilih. Dengan distribusi normal atau uniform, median berada di tengah. Dengan distribusi miring ke kanan, median bergeser ke kanan dari pusat, menunjukkan bahwa yang penting adalah median, bukan titik tengah sumbu atau rata-rata. Dengan pemilih bimodal yang terpolarisasi, hanya sedikit pemilih yang benar-benar berada di median, tetapi dengan dua kandidat yang lebih dekat ke median tetap menang, karena aturan kandidat terdekat memberinya semua pemilih di sisinya dari titik tengah. Menyatunya platform tidak membutuhkan pemilih yang sentris.',
        'Teorema ini rapuh di luar asumsinya. Add candidate membuat tiga kandidat atau lebih bersaing, dan logikanya runtuh: kandidat yang duduk di median bisa terjepit dari kedua sisi, dan tidak ada susunan posisi yang stabil, sehingga Auto-optimize dimatikan untuk lebih dari dua kandidat. Model ini juga mengabaikan partisipasi (pada kenyataannya pemilih yang jauh dari semua kandidat bisa tidak memilih), isu dengan lebih dari satu dimensi, pemilihan pendahuluan partai, kredibilitas kandidat, dan kenyataan bahwa kandidat tidak bisa berpindah posisi tanpa mengorbankan reputasi. Simulasi juga mengasumsikan pemilih tidak pernah seri: pemilih yang tepat di tengah dua kandidat diberikan kepada kandidat yang pertama.',
      ],
    },
    figure: {
      caption: {
        en: 'Voters (curve) choose the nearest candidate, so the boundary between A and B is the midpoint between them. With A at 30 and B at 70 the boundary is 50, the median, and they tie. If A moves to 40 the boundary shifts to 55 and A gains the shaded voters. B\'s best reply is to move left, and the chase ends only when both stand at the median.',
        id: 'Pemilih (kurva) memilih kandidat terdekat, sehingga batas antara A dan B adalah titik tengah di antara keduanya. Dengan A di 30 dan B di 70, batasnya 50, yaitu median, dan hasilnya seri. Jika A pindah ke 40, batas bergeser ke 55 dan A meraih pemilih di daerah berbayang. Balasan terbaik B adalah bergerak ke kiri, dan kejar-mengejar baru berhenti ketika keduanya berdiri di median.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const X = (v) => 30 + v * 300;
        const Y = (v) => 190 - 125 * Math.exp(-(((v - 0.5) / 0.15) ** 2) / 2);
        const pts = [];
        for (let i = 0; i <= 60; i++) { const v = i / 60; pts.push(`${i ? 'L' : 'M'}${X(v).toFixed(1)} ${Y(v).toFixed(1)}`); }
        const band = [];
        for (let i = 0; i <= 10; i++) { const v = 0.5 + 0.005 * i; band.push(`${i ? 'L' : 'M'}${X(v).toFixed(1)} ${Y(v).toFixed(1)}`); }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Two candidates competing for the median voter', 'Dua kandidat memperebutkan pemilih median')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.g{fill:none;stroke:currentColor;stroke-width:1;opacity:.5}</style>
  <text x="12" y="18" font-weight="bold">${L('Nearest candidate wins each voter', 'Kandidat terdekat memenangkan tiap pemilih')}</text>
  <path d="${band.join(' ')} L${X(0.55).toFixed(1)} 190 L${X(0.5).toFixed(1)} 190 Z" fill="#3b82f6" opacity=".45"/>
  <path d="${pts.join(' ')}" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".7"/>
  <line x1="30" y1="190" x2="330" y2="190" class="g"/>
  <text x="30" y="204" class="s">${L('left', 'kiri')}</text>
  <text x="305" y="204" class="s">${L('right', 'kanan')}</text>
  <line x1="${X(0.5)}" y1="40" x2="${X(0.5)}" y2="190" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="${X(0.5) + 4}" y="50" fill="#f59e0b" class="s">${L('median (50)', 'median (50)')}</text>
  <text x="${X(0.5) + 4}" y="62" fill="#f59e0b" class="s">${L('= old boundary', '= batas lama')}</text>
  <line x1="${X(0.55)}" y1="100" x2="${X(0.55)}" y2="190" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="${X(0.55) + 4}" y="110" fill="#3b82f6" class="s">${L('new boundary (55)', 'batas baru (55)')}</text>
  <text x="${X(0.55) + 4}" y="122" fill="#3b82f6" class="s">${L('A gains these voters', 'A meraih pemilih ini')}</text>
  <circle cx="${X(0.3)}" cy="190" r="9" fill="#3b82f6" opacity=".4"/>
  <text x="${X(0.3) - 4}" y="194" class="s">A</text>
  <text x="${X(0.3) - 20}" y="218" class="s">A: 30</text>
  <path d="M${X(0.32)} 170 L${X(0.38)} 170 L${X(0.35)} 165 M${X(0.38)} 170 L${X(0.35)} 175" fill="none" stroke="#3b82f6" stroke-width="1.6"/>
  <circle cx="${X(0.4)}" cy="190" r="9" fill="#3b82f6"/>
  <text x="${X(0.4) - 4}" y="194" fill="#ffffff" font-weight="bold">A</text>
  <text x="${X(0.4) - 10}" y="218" fill="#3b82f6" class="s">A: 40</text>
  <circle cx="${X(0.7)}" cy="190" r="9" fill="#ef4444"/>
  <text x="${X(0.7) - 4}" y="194" fill="#ffffff" font-weight="bold">B</text>
  <text x="${X(0.7) - 10}" y="218" fill="#ef4444" class="s">B: 70</text>
  <path d="M${X(0.68)} 170 L${X(0.62)} 170 L${X(0.65)} 165 M${X(0.62)} 170 L${X(0.65)} 175" fill="none" stroke="#ef4444" stroke-width="1.6"/>
  <text x="${X(0.56)}" y="182" fill="#ef4444" class="s">${L('B chases', 'B mengejar')}</text>
  <text x="60" y="236" class="s">${L('boundary = (A + B) ÷ 2; voters left of it vote A, right of it vote B', 'batas = (A + B) ÷ 2; pemilih di kirinya memilih A, di kanannya memilih B')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'When voters pick the nearest candidate on one dimension, the boundary between two candidates\' supporters is the midpoint between them.',
        'With two candidates, whoever is closer to the median voter wins, so both have an incentive to move toward the median.',
        'The median, not the mean or the middle of the axis, decides the outcome; a skewed electorate pulls the winning position with it.',
        'Convergence happens even with a polarized, bimodal electorate, because the nearest-candidate rule still hands the centrist a majority.',
        'With three or more candidates, multiple dimensions, or abstention, there is no longer a stable centre, and the theorem fails.',
      ],
      id: [
        'Ketika pemilih memilih kandidat terdekat pada satu dimensi, batas antara pendukung dua kandidat adalah titik tengah di antara keduanya.',
        'Dengan dua kandidat, yang lebih dekat ke pemilih median menang, sehingga keduanya terdorong bergerak ke median.',
        'Median, bukan rata-rata atau titik tengah sumbu, yang menentukan hasil; pemilih yang miring menarik posisi pemenang bersamanya.',
        'Penyatuan terjadi bahkan dengan pemilih bimodal yang terpolarisasi, karena aturan kandidat terdekat tetap memberi si sentris suara mayoritas.',
        'Dengan tiga kandidat atau lebih, banyak dimensi, atau pemilih yang abstain, tidak ada lagi pusat yang stabil, dan teorema gagal.',
      ],
    },
    vocabulary: {
      en: [
        ['Spatial model of voting', 'A model in which candidates and voters are points on a line and voters prefer the closest candidate.'],
        ['Median voter', 'The voter with exactly half of the other voters on each side.'],
        ['Single-peaked preferences', 'Each voter has one favourite position and likes positions less the further they are from it; the theorem needs this.'],
        ['Plurality rule (first past the post)', 'The candidate with the most votes wins, even without a majority; this is what the sim counts.'],
        ['Convergence', 'The tendency of competing candidates to adopt similar positions near the median.'],
        ['Bimodal (polarized) distribution', 'An electorate with two clusters of voters and few in between.'],
        ['Skewed distribution', 'An electorate with a long tail on one side, so the median lies away from the centre of the axis.'],
        ['Equilibrium', 'A set of positions from which no candidate can gain votes by moving alone.'],
      ],
      id: [
        ['Model spasial pemungutan suara', 'Model yang menempatkan kandidat dan pemilih sebagai titik pada garis dan pemilih lebih menyukai kandidat terdekat.'],
        ['Pemilih median', 'Pemilih yang tepat separuh pemilih lain berada di masing-masing sisinya.'],
        ['Preferensi berpuncak tunggal', 'Setiap pemilih punya satu posisi favorit dan makin kurang menyukai posisi yang makin jauh darinya; teorema membutuhkan ini.'],
        ['Aturan pluralitas (first past the post)', 'Kandidat dengan suara terbanyak menang, meski tanpa mayoritas; inilah yang dihitung simulasi.'],
        ['Konvergensi', 'Kecenderungan kandidat yang bersaing untuk mengambil posisi serupa di dekat median.'],
        ['Distribusi bimodal (terpolarisasi)', 'Pemilih yang mengumpul dalam dua kelompok dengan sedikit di antaranya.'],
        ['Distribusi miring', 'Pemilih dengan ekor panjang di satu sisi, sehingga median berada jauh dari pusat sumbu.'],
        ['Kesetimbangan', 'Susunan posisi yang tidak memungkinkan kandidat mana pun menambah suara dengan berpindah sendirian.'],
      ],
    },
    misconceptions: {
      en: [
        ['Candidates converge because most voters are moderate.', 'Convergence comes from competition, not from voters\' views. Switch to the bimodal distribution: hardly anyone is in the centre, yet two optimizing candidates still meet at the median.'],
        ['The median voter is the average voter.', 'The median is the person in the middle of the ordering; the mean is the arithmetic average of positions. In the right-skewed electorate they differ, and it is the median that candidates chase.'],
        ['The theorem shows the centre always wins real elections.', 'It holds under strict assumptions: two candidates, one issue dimension, everyone votes, and voters choose the nearest option. Primaries, multi-party contests, abstention and multiple issues all break it, and the sim shows the three-candidate case failing.'],
        ['A third candidate in the centre should do best, since the centre is the winning position.', 'With two rivals on either side, the centrist only gets the voters between the two midpoints, a thin slice. Being in the middle wins against one opponent, not when squeezed between two.'],
      ],
      id: [
        ['Kandidat menyatu karena kebanyakan pemilih moderat.', 'Penyatuan berasal dari persaingan, bukan dari pandangan pemilih. Beralihlah ke distribusi bimodal: hampir tak ada yang di tengah, tetapi dua kandidat yang mengoptimalkan tetap bertemu di median.'],
        ['Pemilih median sama dengan pemilih rata-rata.', 'Median adalah orang di tengah urutan; rata-rata adalah mean aritmetika posisi. Pada pemilih miring ke kanan keduanya berbeda, dan medianlah yang dikejar kandidat.'],
        ['Teorema menunjukkan pusat selalu menang dalam pemilu nyata.', 'Ia berlaku di bawah asumsi ketat: dua kandidat, satu dimensi isu, semua orang memilih, dan pemilih memilih opsi terdekat. Pemilihan pendahuluan, kontes multipartai, abstain, dan banyak isu semuanya merusaknya, dan simulasi menunjukkan kasus tiga kandidat yang gagal.'],
        ['Kandidat ketiga di tengah seharusnya paling unggul, karena pusat adalah posisi pemenang.', 'Dengan dua pesaing di kedua sisinya, si sentris hanya mendapat pemilih di antara dua titik tengah, irisan yang tipis. Berada di tengah menang melawan satu lawan, bukan ketika terjepit di antara dua.'],
      ],
    },
    realWorld: {
      en: [
        'In two-party systems the main parties\' platforms often look alike on many issues, which the model explains as both chasing the same median voter.',
        'Party primaries pull candidates toward their own party\'s median first, then toward the national median for the general election, producing visible shifts in rhetoric.',
        'Multi-party systems with proportional representation show spread-out parties rather than convergence, consistent with the theorem failing beyond two candidates.',
        'Hotelling\'s original example: two ice-cream sellers on a beach both end up in the middle, which is also why rival shops cluster on the same street.',
      ],
      id: [
        'Dalam sistem dua partai, platform partai-partai utama sering tampak serupa pada banyak isu; model menjelaskannya sebagai keduanya mengejar pemilih median yang sama.',
        'Pemilihan pendahuluan partai menarik kandidat ke median partainya sendiri lebih dulu, lalu ke median nasional untuk pemilu umum, menghasilkan pergeseran retorika yang kentara.',
        'Sistem multipartai dengan perwakilan proporsional menunjukkan partai yang tersebar, bukan menyatu, sejalan dengan gagalnya teorema untuk lebih dari dua kandidat.',
        'Contoh asli Hotelling: dua penjual es krim di pantai sama-sama berakhir di tengah; itulah pula sebabnya toko-toko pesaing berkumpul di jalan yang sama.',
      ],
    },
    questions: {
      en: [
        { q: 'Voters are spread uniformly from 0 to 100. Candidate A stands at 30 and B at 70. What are the vote shares? What if A moves to 40?', a: 'The boundary is the midpoint, 50, so each gets 50% and they tie. If A moves to 40 the midpoint becomes 55: A wins everyone below 55, i.e. 55%, and B keeps 45%. Moving toward the rival gained A the voters between 50 and 55.' },
        { q: 'Switch to the bimodal electorate, where almost nobody is at the median. Does a candidate at the median still beat one standing on the left peak? Why?', a: 'Yes. Suppose B is at the median and A is at the left peak. The boundary is halfway between them, to the left of the median, so B wins all voters to the right of that boundary: the whole right peak plus part of the left one, which is more than half. Few voters love B\'s position, but under nearest-candidate voting that does not matter.' },
        { q: 'With three candidates, why is there no stable set of positions, and what does this say about the two-candidate result?', a: 'Suppose two candidates sit at the median. A third who moves just beside them takes almost all voters on that side, roughly half the electorate, while the two in the middle split the rest. But then one of the squeezed candidates can leapfrog to the outside and do better, and so on; every arrangement invites a profitable move. Convergence to the median is a two-candidate result that depends on there being only one rival.' },
      ],
      id: [
        { q: 'Pemilih tersebar merata dari 0 sampai 100. Kandidat A berdiri di 30 dan B di 70. Berapa perolehan suaranya? Bagaimana jika A pindah ke 40?', a: 'Batasnya adalah titik tengah, 50, sehingga masing-masing mendapat 50% dan seri. Jika A pindah ke 40, titik tengahnya menjadi 55: A memenangkan semua pemilih di bawah 55, yaitu 55%, dan B mempertahankan 45%. Bergerak mendekati pesaing memberi A pemilih di antara 50 dan 55.' },
        { q: 'Beralih ke pemilih bimodal, yang hampir tak seorang pun berada di median. Apakah kandidat di median tetap mengalahkan kandidat yang berdiri di puncak kiri? Mengapa?', a: 'Ya. Misalkan B di median dan A di puncak kiri. Batasnya di tengah-tengah keduanya, di kiri median, sehingga B memenangkan semua pemilih di kanan batas itu: seluruh puncak kanan plus sebagian puncak kiri, yang lebih dari separuh. Hanya sedikit pemilih yang menyukai posisi B, tetapi dengan aturan kandidat terdekat hal itu tidak penting.' },
        { q: 'Dengan tiga kandidat, mengapa tidak ada susunan posisi yang stabil, dan apa artinya bagi hasil dua kandidat?', a: 'Misalkan dua kandidat duduk di median. Kandidat ketiga yang bergeser tepat di samping mereka merebut hampir semua pemilih di sisi itu, kira-kira separuh pemilih, sementara dua yang di tengah membagi sisanya. Tetapi kemudian salah satu kandidat yang terjepit bisa melompat ke sisi luar dan lebih unggul, dan seterusnya; setiap susunan mengundang perpindahan yang menguntungkan. Penyatuan ke median adalah hasil dua kandidat yang bergantung pada adanya hanya satu pesaing.' },
      ],
    },
  },
};
