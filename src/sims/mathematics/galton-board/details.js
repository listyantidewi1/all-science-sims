// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See binomial distribution emerge from independent coin flips.',
      'Connect the bell curve to the central limit theorem.',
      'Verify variance scales with number of rows.',
    ],
    id: [
      'Melihat distribusi binomial muncul dari pelemparan koin independen.',
      'Mengaitkan kurva lonceng dengan teorema limit pusat.',
      'Memverifikasi varians sebanding dengan jumlah baris.',
    ],
  },  tryThis: {
    en: [
      'Drop 1000 balls — does the histogram look Gaussian?',
      'Bias the coin to 70% — does the peak shift?',
      'More rows — wider distribution?',
    ],
    id: [
      'Jatuhkan 1000 bola — apakah histogram tampak seperti Gauss?',
      'Bias koin ke 70% — apakah puncak bergeser?',
      'Lebih banyak baris — distribusi lebih lebar?',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A Galton board is a triangle of pegs with a row of collecting bins underneath. A ball dropped onto the top peg bounces left or right, meets another peg in the next row, bounces again, and so on until it drops into a bin. Each bounce is like a coin flip, and the bin a ball lands in simply counts how many times it went right. Landing in the far-left bin needs every bounce to go left, which is rare; landing near the middle can happen in many different left-right orders, which is common. That is why the middle bins fill up fastest.',
        'In the simulation the Rows slider sets how many bounces each ball makes (3 to 18), and the right-bias slider sets the chance p of bouncing right at each peg, from 0.1 to 0.9. The drop rate controls how fast animated balls fall, and "Drop 100 instantly" skips the animation and just rolls the dice for a hundred balls at once. The pink histogram counts balls per bin, and the yellow line shows the prediction from probability theory, the binomial distribution: the chance of exactly k rights in n bounces. As more balls fall, the histogram settles ever closer onto the yellow line.',
        'Two numbers describe the pile. Its centre is at rows times p, so with 12 rows and a fair bounce the peak is at bin 6, and raising p to 0.7 slides it to about 8.4. Its width, measured by the standard deviation, is the square root of rows times p times (1 minus p): about 1.73 bins for 12 fair rows. More rows make the pile wider, but only in proportion to the square root of the number of rows, so quadrupling the rows merely doubles the width. With many rows the stepped binomial shape becomes almost indistinguishable from the smooth bell curve, the normal distribution; this is a special case of the central limit theorem, which says that adding up many small independent random pushes always produces a bell shape.',
        'The sim is an idealisation. Real balls have size, speed and spin, and real pegs are not perfectly centred, so a physical board gives slightly uneven results; here every bounce is a perfect independent coin flip with the same p. The number of balls is finite, so the histogram will always be a little ragged, and with a strong bias the pile crowds against one edge because there is no bin beyond the last one. Note also that the smoothly animated balls and the instant drops are tallied into the same bins, so the two ways of adding balls are mixed in the one histogram.',
      ],
      id: [
        'Papan Galton adalah segitiga pasak dengan sederet wadah penampung di bawahnya. Bola yang dijatuhkan ke pasak teratas memantul ke kiri atau ke kanan, menemui pasak lain di baris berikutnya, memantul lagi, dan seterusnya sampai jatuh ke sebuah wadah. Setiap pantulan seperti lemparan koin, dan wadah tempat bola mendarat hanyalah hitungan berapa kali bola bergerak ke kanan. Mendarat di wadah paling kiri menuntut semua pantulan ke kiri, dan itu jarang; mendarat di dekat tengah bisa terjadi lewat banyak urutan kiri-kanan yang berbeda, dan itu sering. Itulah sebabnya wadah tengah terisi paling cepat.',
        'Dalam simulasi, slider Rows mengatur berapa kali tiap bola memantul (3 sampai 18), dan slider bias kanan mengatur peluang p memantul ke kanan di tiap pasak, dari 0,1 sampai 0,9. Laju jatuh mengatur seberapa cepat bola beranimasi jatuh, dan "Drop 100 instantly" melewati animasi dan langsung mengundi seratus bola sekaligus. Histogram merah muda menghitung bola per wadah, dan garis kuning menunjukkan prediksi dari teori peluang, yaitu distribusi binomial: peluang tepat k kali ke kanan dalam n pantulan. Semakin banyak bola jatuh, histogram makin menempel pada garis kuning.',
        'Dua bilangan menggambarkan tumpukannya. Pusatnya berada di jumlah baris dikali p, jadi dengan 12 baris dan pantulan yang adil puncaknya di wadah 6, dan menaikkan p ke 0,7 menggesernya ke sekitar 8,4. Lebarnya, yang diukur dengan simpangan baku, adalah akar kuadrat dari baris dikali p dikali (1 dikurangi p): sekitar 1,73 wadah untuk 12 baris yang adil. Lebih banyak baris membuat tumpukan lebih lebar, tetapi hanya sebanding dengan akar kuadrat jumlah baris, sehingga melipatempatkan baris hanya menggandakan lebarnya. Dengan banyak baris, bentuk binomial yang bertingkat hampir tak terbedakan dari kurva lonceng yang mulus, yaitu distribusi normal; ini kasus khusus teorema limit pusat, yang menyatakan bahwa menjumlahkan banyak dorongan acak kecil yang saling bebas selalu menghasilkan bentuk lonceng.',
        'Sim ini adalah idealisasi. Bola sungguhan punya ukuran, kelajuan, dan putaran, dan pasak sungguhan tidak tepat di tengah, sehingga papan fisik memberi hasil yang sedikit tidak rata; di sini setiap pantulan adalah lemparan koin sempurna yang saling bebas dengan p yang sama. Jumlah bola berhingga, sehingga histogram selalu agak bergerigi, dan dengan bias yang kuat tumpukan menumpuk di satu tepi karena tidak ada wadah di luar wadah terakhir. Perhatikan juga bahwa bola yang beranimasi dan bola yang dijatuhkan instan dihitung ke wadah yang sama, sehingga kedua cara menambah bola bercampur dalam satu histogram.',
      ],
    },
    figure: {
      caption: {
        en: 'Five rows of pegs give six bins. The red ball went L, R, R, L, R: three rights, so it lands in bin 3. The number of left-right orders that reach each bin is 1, 5, 10, 10, 5, 1, which already has the bell shape.',
        id: 'Lima baris pasak menghasilkan enam wadah. Bola merah bergerak Ki, Ka, Ka, Ki, Ka: tiga kali ke kanan, sehingga mendarat di wadah 3. Banyaknya urutan kiri-kanan yang mencapai tiap wadah adalah 1, 5, 10, 10, 5, 1, yang sudah berbentuk lonceng.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A ball bouncing through pegs into bins', 'Bola memantul melewati pasak ke dalam wadah')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.g{fill:currentColor;opacity:.55}.b{fill:#3b82f6;opacity:.8}.n{font:10px system-ui,sans-serif;text-anchor:middle}</style>
  <circle cx="180" cy="30" r="3.5" class="g"/>
  <circle cx="165" cy="56" r="3.5" class="g"/><circle cx="195" cy="56" r="3.5" class="g"/>
  <circle cx="150" cy="82" r="3.5" class="g"/><circle cx="180" cy="82" r="3.5" class="g"/><circle cx="210" cy="82" r="3.5" class="g"/>
  <circle cx="135" cy="108" r="3.5" class="g"/><circle cx="165" cy="108" r="3.5" class="g"/><circle cx="195" cy="108" r="3.5" class="g"/><circle cx="225" cy="108" r="3.5" class="g"/>
  <circle cx="120" cy="134" r="3.5" class="g"/><circle cx="150" cy="134" r="3.5" class="g"/><circle cx="180" cy="134" r="3.5" class="g"/><circle cx="210" cy="134" r="3.5" class="g"/><circle cx="240" cy="134" r="3.5" class="g"/>
  <polyline points="180,12 180,30 165,56 180,82 195,108 180,134 195,158" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
  <circle cx="195" cy="158" r="5" fill="#ef4444"/>
  <text x="168" y="46" fill="#ef4444">${L('L', 'Ki')}</text>
  <text x="176" y="73" fill="#ef4444">${L('R', 'Ka')}</text>
  <text x="191" y="99" fill="#ef4444">${L('R', 'Ka')}</text>
  <text x="183" y="125" fill="#ef4444">${L('L', 'Ki')}</text>
  <text x="192" y="150" fill="#ef4444">${L('R', 'Ka')}</text>
  <rect x="93" y="219" width="24" height="6" class="b"/>
  <rect x="123" y="195" width="24" height="30" class="b"/>
  <rect x="153" y="165" width="24" height="60" class="b"/>
  <rect x="183" y="165" width="24" height="60" class="b"/>
  <rect x="213" y="195" width="24" height="30" class="b"/>
  <rect x="243" y="219" width="24" height="6" class="b"/>
  <path d="M90 224 C120 210 135 170 165 165 Q180 162 195 165 C225 170 240 210 270 224" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="105" y="236" class="n">1</text><text x="135" y="236" class="n">5</text><text x="165" y="236" class="n">10</text><text x="195" y="236" class="n">10</text><text x="225" y="236" class="n">5</text><text x="255" y="236" class="n">1</text>
  <text x="275" y="178" fill="#f59e0b">${L('bell shape', 'bentuk lonceng')}</text>
  <text x="20" y="30" opacity=".8">${L('5 rows', '5 baris')}</text>
  <text x="20" y="46" opacity=".8">${L('p = 0.5', 'p = 0,5')}</text>
  <text x="20" y="205" opacity=".8">${L('bin 0', 'wadah 0')}</text>
  <text x="272" y="205" opacity=".8">${L('bin 5', 'wadah 5')}</text>
  <text x="250" y="30" opacity=".8">${L('ways to reach', 'banyak jalan')}</text>
  <text x="250" y="46" opacity=".8">${L('each bin ↓', 'ke tiap wadah ↓')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Each peg is a coin flip, and the bin number is just the count of right bounces, so one ball\'s landing spot is random but the pile of many balls is predictable.',
        'Middle bins fill fastest because there are many more left-right orders that lead there than to the edges.',
        'The pile\'s centre is rows × p and its width grows only with the square root of the number of rows.',
        'The histogram follows the binomial distribution, which for many rows looks like the smooth normal bell curve.',
        'The bell curve appears whenever many small independent chance effects add up, which is the central limit theorem.',
      ],
      id: [
        'Setiap pasak adalah lemparan koin, dan nomor wadah hanyalah hitungan pantulan ke kanan, sehingga tempat mendarat satu bola acak tetapi tumpukan banyak bola dapat diprediksi.',
        'Wadah tengah terisi paling cepat karena jauh lebih banyak urutan kiri-kanan yang menuju ke sana daripada ke tepi.',
        'Pusat tumpukan berada di baris × p dan lebarnya hanya bertambah sebanding dengan akar kuadrat jumlah baris.',
        'Histogram mengikuti distribusi binomial, yang untuk banyak baris tampak seperti kurva lonceng normal yang mulus.',
        'Kurva lonceng muncul setiap kali banyak pengaruh acak kecil yang saling bebas dijumlahkan; itulah teorema limit pusat.',
      ],
    },
    vocabulary: {
      en: [
        ['Trial', 'One chance event with two outcomes, such as one bounce going left or right.'],
        ['Independent', 'Events are independent when the result of one has no effect on the next; each bounce is independent of the ones before.'],
        ['Binomial distribution', 'The probabilities of getting 0, 1, 2, … successes in a fixed number of independent trials that each succeed with the same probability p.'],
        ['Histogram', 'A bar chart in which each bar\'s height shows how many results fell into that bin.'],
        ['Mean', 'The average bin number; for the Galton board it equals rows × p.'],
        ['Standard deviation', 'A measure of how spread out the results are around the mean; here it is the square root of rows × p × (1 − p).'],
        ['Normal distribution', 'The smooth, symmetric bell-shaped curve that the binomial distribution approaches when the number of trials is large.'],
        ['Central limit theorem', 'The result that the sum of many independent random quantities is approximately normally distributed, whatever the individual quantities look like.'],
      ],
      id: [
        ['Percobaan', 'Satu kejadian acak dengan dua hasil, misalnya satu pantulan ke kiri atau ke kanan.'],
        ['Saling bebas', 'Kejadian-kejadian saling bebas jika hasil yang satu tidak memengaruhi yang berikutnya; setiap pantulan bebas dari pantulan sebelumnya.'],
        ['Distribusi binomial', 'Peluang mendapat 0, 1, 2, … keberhasilan dalam sejumlah tetap percobaan saling bebas yang masing-masing berhasil dengan peluang p yang sama.'],
        ['Histogram', 'Diagram batang dengan tinggi tiap batang menunjukkan berapa banyak hasil yang masuk ke wadah itu.'],
        ['Rata-rata (mean)', 'Nomor wadah rata-rata; pada papan Galton nilainya baris × p.'],
        ['Simpangan baku', 'Ukuran seberapa menyebar hasil di sekitar rata-rata; di sini nilainya akar kuadrat dari baris × p × (1 − p).'],
        ['Distribusi normal', 'Kurva lonceng mulus dan simetris yang didekati distribusi binomial ketika jumlah percobaannya besar.'],
        ['Teorema limit pusat', 'Hasil yang menyatakan bahwa jumlah banyak besaran acak saling bebas kira-kira berdistribusi normal, apa pun bentuk masing-masing besaran itu.'],
      ],
    },
    misconceptions: {
      en: [
        ['After several balls have gone right, the next one is "due" to go left.', 'Each bounce is independent; the pegs have no memory. The pile looks balanced in the long run because of the sheer number of balls, not because later balls correct earlier ones.'],
        ['Every bin is equally likely, since left and right are equally likely.', 'Each individual path is equally likely, but many more paths end in the middle than at the edges. With 5 rows there is 1 path to the far-left bin and 10 paths to each middle bin.'],
        ['Doubling the number of rows doubles the width of the pile.', 'The width (standard deviation) grows with the square root of the rows, so doubling the rows makes the pile only about 1.4 times wider. The sim\'s lab panel lets you check this.'],
        ['A bell curve means the process must be fair, with p = 0.5.', 'A biased board also gives a bell shape; it is just centred off to one side, at rows × p. Set p to 0.7 and watch the peak move while the shape stays bell-like.'],
      ],
      id: [
        ['Setelah beberapa bola ke kanan, bola berikutnya "sudah waktunya" ke kiri.', 'Setiap pantulan saling bebas; pasak tidak punya ingatan. Tumpukan tampak seimbang dalam jangka panjang karena jumlah bolanya yang sangat banyak, bukan karena bola yang belakangan mengoreksi yang lebih dulu.'],
        ['Setiap wadah sama mungkinnya, karena kiri dan kanan sama mungkinnya.', 'Setiap jalur individu memang sama mungkinnya, tetapi jauh lebih banyak jalur yang berakhir di tengah daripada di tepi. Dengan 5 baris ada 1 jalur ke wadah paling kiri dan 10 jalur ke tiap wadah tengah.'],
        ['Menggandakan jumlah baris menggandakan lebar tumpukan.', 'Lebar (simpangan baku) bertambah sebanding akar kuadrat jumlah baris, jadi menggandakan baris hanya membuat tumpukan sekitar 1,4 kali lebih lebar. Panel lab di sim bisa dipakai untuk memeriksanya.'],
        ['Kurva lonceng berarti prosesnya pasti adil, dengan p = 0,5.', 'Papan yang bias juga memberi bentuk lonceng; pusatnya saja yang bergeser ke satu sisi, di baris × p. Atur p ke 0,7 dan lihat puncaknya berpindah sementara bentuknya tetap seperti lonceng.'],
      ],
    },
    realWorld: {
      en: [
        'Heights of adults, measurement errors in a laboratory, and the mass of eggs from a farm all follow bell curves, because each is the sum of many small independent influences.',
        'Pachinko and Plinko-style game machines are Galton boards: the prizes in the middle are small precisely because most balls end up there.',
        'Quality-control engineers compare a factory\'s measurements against a bell curve to decide whether a machine has drifted off centre.',
        'Opinion polls and exam marks are summarised with a mean and a standard deviation, the same two numbers that describe the Galton pile.',
      ],
      id: [
        'Tinggi badan orang dewasa, galat pengukuran di laboratorium, dan massa telur dari sebuah peternakan semuanya mengikuti kurva lonceng, karena masing-masing adalah jumlah dari banyak pengaruh kecil yang saling bebas.',
        'Mesin permainan seperti pachinko dan Plinko adalah papan Galton: hadiah di tengah kecil justru karena kebanyakan bola berakhir di sana.',
        'Insinyur pengendalian mutu membandingkan hasil pengukuran pabrik dengan kurva lonceng untuk menilai apakah sebuah mesin sudah bergeser dari pusatnya.',
        'Jajak pendapat dan nilai ujian dirangkum dengan rata-rata dan simpangan baku, dua bilangan yang sama dengan yang menggambarkan tumpukan Galton.',
      ],
    },
    questions: {
      en: [
        { q: 'With 12 rows and p = 0.5, which bin should hold the most balls, and roughly what fraction of all balls lands there?', a: 'Bin 6, the centre, since the mean is 12 × 0.5 = 6. The binomial probability of exactly 6 rights in 12 bounces is 924/4096 ≈ 0.23, so about 23% of the balls, which you can check against the yellow line.' },
        { q: 'You set p = 0.7 with 12 rows. Where does the peak move to, and does the pile get wider or narrower than with p = 0.5?', a: 'The mean moves to 12 × 0.7 = 8.4, so the peak sits between bins 8 and 9. The spread is the square root of 12 × 0.7 × 0.3 ≈ 1.59, slightly narrower than the 1.73 for a fair bounce, because a biased coin is more predictable.' },
        { q: 'A friend drops 20 balls, sees a lumpy histogram that looks nothing like the yellow curve, and concludes the theory is wrong. What would you tell them?', a: 'Twenty balls is far too few; chance variation is still large compared with the expected counts. Press "Drop 100 instantly" several times and the histogram will settle onto the curve. The theory predicts the long-run proportions, not the result of a handful of balls.' },
      ],
      id: [
        { q: 'Dengan 12 baris dan p = 0,5, wadah mana yang seharusnya paling banyak terisi, dan kira-kira berapa bagian dari semua bola mendarat di sana?', a: 'Wadah 6, yang di tengah, karena rata-ratanya 12 × 0,5 = 6. Peluang binomial tepat 6 kali ke kanan dalam 12 pantulan adalah 924/4096 ≈ 0,23, jadi sekitar 23% bola, yang bisa kamu periksa pada garis kuning.' },
        { q: 'Kamu mengatur p = 0,7 dengan 12 baris. Ke mana puncaknya berpindah, dan apakah tumpukan menjadi lebih lebar atau lebih sempit daripada dengan p = 0,5?', a: 'Rata-ratanya berpindah ke 12 × 0,7 = 8,4, sehingga puncaknya berada di antara wadah 8 dan 9. Sebarannya adalah akar kuadrat dari 12 × 0,7 × 0,3 ≈ 1,59, sedikit lebih sempit daripada 1,73 untuk pantulan adil, karena koin yang bias lebih mudah ditebak.' },
        { q: 'Seorang teman menjatuhkan 20 bola, melihat histogram yang bergerigi dan sama sekali tidak mirip kurva kuning, lalu menyimpulkan teorinya salah. Apa yang akan kamu katakan?', a: 'Dua puluh bola terlalu sedikit; variasi acaknya masih besar dibandingkan hitungan yang diharapkan. Tekan "Drop 100 instantly" beberapa kali dan histogram akan menempel pada kurva. Teori memprediksi proporsi jangka panjang, bukan hasil dari segelintir bola.' },
      ],
    },
  },
};
