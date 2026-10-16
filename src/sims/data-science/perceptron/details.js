// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe a perceptron as a weighted sum z = w₁x₁ + w₂x₂ + b passed through a threshold, and read the decision line w₁x₁ + w₂x₂ + b = 0 from the weights.',
      'Explain the perceptron learning rule and gradient descent as ways of nudging the weights to reduce a loss, and interpret a loss curve.',
      'Show why a single neuron cannot learn XOR and how a hidden layer of two neurons makes it possible.',
    ],
    id: [
      'Menjelaskan perceptron sebagai jumlah berbobot z = w₁x₁ + w₂x₂ + b yang dilewatkan ambang, dan membaca garis keputusan w₁x₁ + w₂x₂ + b = 0 dari bobotnya.',
      'Menjelaskan aturan belajar perceptron dan penurunan gradien sebagai cara menggeser bobot untuk mengurangi loss, serta menafsirkan kurva loss.',
      'Menunjukkan mengapa satu neuron tidak bisa mempelajari XOR dan bagaimana lapisan tersembunyi berisi dua neuron membuatnya mungkin.',
    ],
  },
  tryThis: {
    en: [
      'On the separable dataset, move w₁, w₂ and b by hand until every point is on the right side. Then press Reset weights and Train: how many epochs does the rule need?',
      'Set the learning rate to 1.0 with gradient descent and watch the loss curve. Now try 0.02. Which is faster, which is smoother?',
      'Switch to the noisy dataset with the perceptron rule. Does training ever stop? Switch to gradient descent and compare.',
      'Choose XOR. Train the single neuron for 200 epochs: what accuracy does it get stuck at? Turn on the hidden layer and train again. If it stalls near 50–75%, press Reset weights and retry.',
    ],
    id: [
      'Pada dataset terpisah linear, geser w₁, w₂ dan b dengan tangan sampai semua titik berada di sisi yang benar. Lalu tekan Reset bobot dan Latih: berapa epoch yang dibutuhkan aturannya?',
      'Atur laju belajar ke 1,0 dengan penurunan gradien dan lihat kurva loss. Sekarang coba 0,02. Mana yang lebih cepat, mana yang lebih mulus?',
      'Pindah ke dataset bising dengan aturan perceptron. Apakah pelatihannya pernah berhenti? Pindah ke penurunan gradien dan bandingkan.',
      'Pilih XOR. Latih satu neuron selama 200 epoch: pada akurasi berapa ia tersangkut? Nyalakan lapisan tersembunyi dan latih lagi. Jika macet di sekitar 50–75%, tekan Reset bobot dan coba lagi.',
    ],
  },

  learn: {
    background: {
      en: [
        'A perceptron is the simplest artificial neuron. It takes inputs x₁ and x₂, multiplies each by a weight, adds a bias, and computes z = w₁x₁ + w₂x₂ + b. If z > 0 the neuron fires (output 1), otherwise it stays silent (output 0). The set of points where z = 0 is a straight line, the decision line; everything on one side is classified 1 and everything on the other side 0. The weights (w₁, w₂) are a vector perpendicular to that line, and the bias slides the line away from the origin. Moving the sliders by hand shows this directly.',
        'Learning means adjusting w₁, w₂ and b automatically from labelled examples. The perceptron rule (Rosenblatt, 1958) is wonderfully simple: for each example, if the prediction ŷ is wrong, update w ← w + η (y − ŷ) x and b ← b + η (y − ŷ), where η is the learning rate. A missed 1 pulls the weights towards that point; a false 1 pushes them away. If the data can be separated by a line at all, the rule is guaranteed to find one in a finite number of steps. If the data cannot be separated (the noisy dataset), it never settles and the line keeps jumping.',
        'Gradient descent is the method used by modern neural networks. Replace the hard threshold by the smooth sigmoid σ(z) = 1/(1 + e⁻ᶻ), so the output is a probability p. Measure the error with the cross-entropy loss L = −[y ln p + (1 − y) ln(1 − p)], averaged over the data, and move each weight a small step downhill: w ← w − η ∂L/∂w, which for the sigmoid works out to w ← w − η (p − y) x. The loss curve in the sim shows L after each epoch (one pass through the data). A learning rate that is too small crawls; one that is too large overshoots and the curve becomes jagged.',
        'XOR is the famous counter-example. Points at (−,−) and (+,+) are class 0, points at (−,+) and (+,−) are class 1, and no single straight line can separate them, so one neuron is stuck at about 50–75% accuracy whatever you do (Minsky and Papert, 1969). Adding a hidden layer of two neurons fixes this: each hidden neuron draws its own line, and the output neuron combines the two half-planes, producing a bent boundary. Training uses the same gradient descent with the chain rule (backpropagation). With only two hidden neurons the loss landscape has local minima, so some random starts get stuck; Reset weights draws a new start, and 3 or 4 hidden neurons almost always succeed. This is the whole idea of deep learning in miniature: stacking simple neurons builds complicated boundaries.',
      ],
      id: [
        'Perceptron adalah neuron buatan paling sederhana. Ia menerima masukan x₁ dan x₂, mengalikan masing-masing dengan sebuah bobot, menambahkan bias, dan menghitung z = w₁x₁ + w₂x₂ + b. Jika z > 0 neuron menyala (keluaran 1), jika tidak ia diam (keluaran 0). Himpunan titik dengan z = 0 adalah garis lurus, garis keputusan; semua di satu sisi diklasifikasi 1 dan semua di sisi lain 0. Bobot (w₁, w₂) adalah vektor yang tegak lurus garis itu, dan bias menggeser garis menjauh dari titik asal. Menggeser slider dengan tangan memperlihatkan hal ini secara langsung.',
        'Belajar berarti menyetel w₁, w₂ dan b secara otomatis dari contoh berlabel. Aturan perceptron (Rosenblatt, 1958) sangat sederhana: untuk setiap contoh, jika prediksi ŷ salah, perbarui w ← w + η (y − ŷ) x dan b ← b + η (y − ŷ), dengan η laju belajar. Kelas 1 yang terlewat menarik bobot ke arah titik itu; kelas 1 yang palsu mendorongnya menjauh. Jika data memang bisa dipisahkan oleh sebuah garis, aturan ini dijamin menemukannya dalam langkah yang berhingga. Jika data tidak bisa dipisahkan (dataset bising), ia tidak pernah tenang dan garisnya terus melompat.',
        'Penurunan gradien adalah metode yang dipakai jaringan saraf modern. Ganti ambang keras dengan sigmoid mulus σ(z) = 1/(1 + e⁻ᶻ), sehingga keluarannya berupa peluang p. Ukur kesalahan dengan loss entropi-silang L = −[y ln p + (1 − y) ln(1 − p)], dirata-ratakan atas data, dan geser setiap bobot selangkah kecil menurun: w ← w − η ∂L/∂w, yang untuk sigmoid menjadi w ← w − η (p − y) x. Kurva loss di simulasi menunjukkan L setelah setiap epoch (satu putaran melewati data). Laju belajar yang terlalu kecil merayap; yang terlalu besar melampaui sasaran dan kurvanya menjadi bergerigi.',
        'XOR adalah contoh tandingan yang terkenal. Titik di (−,−) dan (+,+) berkelas 0, titik di (−,+) dan (+,−) berkelas 1, dan tidak ada satu garis lurus pun yang bisa memisahkannya, sehingga satu neuron tersangkut pada akurasi sekitar 50–75% apa pun yang kamu lakukan (Minsky dan Papert, 1969). Menambahkan lapisan tersembunyi berisi dua neuron memperbaikinya: setiap neuron tersembunyi menggambar garisnya sendiri, dan neuron keluaran menggabungkan kedua setengah-bidang itu menjadi batas yang bengkok. Pelatihannya memakai penurunan gradien yang sama dengan aturan rantai (propagasi balik). Dengan hanya dua neuron tersembunyi, bentang loss-nya memiliki minimum lokal, sehingga beberapa awal acak tersangkut; Reset bobot mengundi awal baru, dan 3 atau 4 neuron tersembunyi hampir selalu berhasil. Inilah seluruh gagasan deep learning dalam bentuk mini: menumpuk neuron sederhana membangun batas yang rumit.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: one neuron computes z = w₁x₁ + w₂x₂ + b and fires when z > 0, which is one straight decision line. Right: with two hidden neurons the output combines two lines, so the XOR corners can be separated.',
        id: 'Kiri: satu neuron menghitung z = w₁x₁ + w₂x₂ + b dan menyala saat z > 0, yaitu satu garis keputusan lurus. Kanan: dengan dua neuron tersembunyi, keluaran menggabungkan dua garis, sehingga sudut-sudut XOR bisa dipisahkan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A single neuron and its decision line, and a two-hidden-neuron network solving XOR', 'Satu neuron dengan garis keputusannya, dan jaringan dua neuron tersembunyi yang memecahkan XOR')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.n{fill:none;stroke:currentColor;stroke-width:1.5}.w{stroke:currentColor;stroke-width:1.2;fill:none}</style>
  <text x="16" y="18" style="font:bold 12px system-ui,sans-serif">${L('one neuron', 'satu neuron')}</text>
  <circle cx="30" cy="50" r="10" class="n"/><text x="25" y="54">x₁</text>
  <circle cx="30" cy="90" r="10" class="n"/><text x="25" y="94">x₂</text>
  <circle cx="30" cy="130" r="10" class="n"/><text x="27" y="134">1</text>
  <line x1="40" y1="50" x2="90" y2="88" class="w"/><text x="52" y="62">w₁</text>
  <line x1="40" y1="90" x2="90" y2="90" class="w"/><text x="56" y="86">w₂</text>
  <line x1="40" y1="130" x2="90" y2="92" class="w"/><text x="56" y="124">b</text>
  <circle cx="102" cy="90" r="13" class="n" stroke-width="2"/><text x="95" y="94">Σ</text>
  <line x1="115" y1="90" x2="140" y2="90" class="w"/>
  <text x="144" y="94">z &gt; 0 ?</text>
  <rect x="20" y="150" width="130" height="80" fill="none" stroke="currentColor" opacity=".4"/>
  <circle cx="45" cy="210" r="4" fill="#3b82f6"/><circle cx="60" cy="195" r="4" fill="#3b82f6"/><circle cx="40" cy="185" r="4" fill="#3b82f6"/>
  <circle cx="120" cy="170" r="4" fill="#f97316"/><circle cx="130" cy="190" r="4" fill="#f97316"/><circle cx="105" cy="162" r="4" fill="#f97316"/>
  <line x1="60" y1="152" x2="130" y2="228" stroke="#fbbf24" stroke-width="2"/>
  <text x="210" y="18" style="font:bold 12px system-ui,sans-serif">${L('hidden layer of 2', 'lapisan tersembunyi 2')}</text>
  <circle cx="210" cy="50" r="10" class="n"/><text x="205" y="54">x₁</text>
  <circle cx="210" cy="90" r="10" class="n"/><text x="205" y="94">x₂</text>
  <circle cx="210" cy="130" r="10" class="n"/><text x="207" y="134">1</text>
  <circle cx="270" cy="65" r="11" class="n" stroke-width="2"/><text x="265" y="69">h₁</text>
  <circle cx="270" cy="115" r="11" class="n" stroke-width="2"/><text x="265" y="119">h₂</text>
  <line x1="220" y1="50" x2="259" y2="63" class="w"/><line x1="220" y1="90" x2="259" y2="68" class="w"/><line x1="220" y1="130" x2="259" y2="72" class="w"/>
  <line x1="220" y1="50" x2="259" y2="108" class="w"/><line x1="220" y1="90" x2="259" y2="112" class="w"/><line x1="220" y1="130" x2="259" y2="118" class="w"/>
  <circle cx="330" cy="90" r="12" class="n" stroke-width="2"/><text x="325" y="94">y</text>
  <line x1="281" y1="68" x2="318" y2="86" class="w"/><line x1="281" y1="112" x2="318" y2="94" class="w"/>
  <rect x="210" y="150" width="130" height="80" fill="none" stroke="currentColor" opacity=".4"/>
  <circle cx="232" cy="172" r="4" fill="#3b82f6"/><circle cx="318" cy="208" r="4" fill="#3b82f6"/>
  <circle cx="232" cy="208" r="4" fill="#f97316"/><circle cx="318" cy="172" r="4" fill="#f97316"/>
  <line x1="212" y1="196" x2="300" y2="152" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 3"/>
  <line x1="250" y1="228" x2="338" y2="184" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="246" y="226" fill="#fbbf24">XOR</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A neuron computes a weighted sum plus bias, z = w₁x₁ + w₂x₂ + b, and fires when z > 0.',
        'The decision boundary of one neuron is the straight line z = 0; the weight vector is perpendicular to it.',
        'Learning = repeatedly nudging the weights to reduce a loss; the learning rate η sets the step size.',
        'The perceptron rule converges only if the data is linearly separable; gradient descent on a smooth loss always settles somewhere.',
        'A single neuron cannot represent XOR; a hidden layer lets the network combine several lines into a bent boundary.',
        'Small networks can get stuck in local minima; re-initialising the weights gives a different starting point.',
      ],
      id: [
        'Neuron menghitung jumlah berbobot plus bias, z = w₁x₁ + w₂x₂ + b, dan menyala saat z > 0.',
        'Batas keputusan satu neuron adalah garis lurus z = 0; vektor bobot tegak lurus terhadapnya.',
        'Belajar = berulang kali menggeser bobot untuk mengurangi loss; laju belajar η menentukan besar langkah.',
        'Aturan perceptron konvergen hanya jika data terpisah linear; penurunan gradien pada loss yang mulus selalu menetap di suatu tempat.',
        'Satu neuron tidak bisa mewakili XOR; lapisan tersembunyi membuat jaringan menggabungkan beberapa garis menjadi batas yang bengkok.',
        'Jaringan kecil bisa tersangkut di minimum lokal; menginisialisasi ulang bobot memberi titik awal yang berbeda.',
      ],
    },
    vocabulary: {
      en: [
        ['Weight (w)', 'A number multiplying an input; it says how much, and in which direction, that input matters.'],
        ['Bias (b)', 'A constant added to the weighted sum; it shifts the decision line away from the origin.'],
        ['Activation function', 'The function applied to z: a hard step for the classic perceptron, a smooth sigmoid σ(z) = 1/(1 + e⁻ᶻ) for gradient descent.'],
        ['Loss', 'A single number measuring how wrong the predictions are; here cross-entropy, or the error rate for the perceptron rule.'],
        ['Epoch', 'One complete pass through all the training examples.'],
        ['Learning rate (η)', 'How far the weights move on each update.'],
        ['Linearly separable', 'A dataset whose two classes can be split perfectly by one straight line.'],
        ['Backpropagation', 'Using the chain rule to compute the gradient of the loss for weights in hidden layers.'],
      ],
      id: [
        ['Bobot (w)', 'Bilangan pengali masukan; menyatakan seberapa besar, dan ke arah mana, masukan itu berpengaruh.'],
        ['Bias (b)', 'Konstanta yang ditambahkan ke jumlah berbobot; menggeser garis keputusan menjauh dari titik asal.'],
        ['Fungsi aktivasi', 'Fungsi yang diterapkan pada z: tangga keras untuk perceptron klasik, sigmoid mulus σ(z) = 1/(1 + e⁻ᶻ) untuk penurunan gradien.'],
        ['Loss', 'Satu bilangan yang mengukur seberapa salah prediksinya; di sini entropi-silang, atau laju kesalahan untuk aturan perceptron.'],
        ['Epoch', 'Satu putaran lengkap melewati semua contoh latih.'],
        ['Laju belajar (η)', 'Seberapa jauh bobot bergerak pada setiap pembaruan.'],
        ['Terpisah linear', 'Dataset yang dua kelasnya dapat dipisahkan sempurna oleh satu garis lurus.'],
        ['Propagasi balik', 'Memakai aturan rantai untuk menghitung gradien loss bagi bobot di lapisan tersembunyi.'],
      ],
    },
    misconceptions: {
      en: [
        ['A bigger learning rate always learns faster.', 'Up to a point. Too large a step overshoots the minimum, the loss curve zigzags or even grows, and the line swings wildly instead of settling.'],
        ['If the perceptron rule has not converged, it needs more epochs.', 'Only if the data is separable. On the noisy dataset no line is perfect, so the rule keeps correcting mistakes forever; gradient descent with a smooth loss is the right tool there.'],
        ['A neural network that fails on XOR is broken.', 'A single neuron is mathematically unable to represent XOR, no matter how it is trained. The fix is architecture (a hidden layer), not more training.'],
        ['Training always finds the best weights.', 'Gradient descent finds a local minimum. With two hidden neurons on XOR, some starting weights lead to a dead end at 75% accuracy; a different random start may reach 100%.'],
      ],
      id: [
        ['Laju belajar yang lebih besar selalu belajar lebih cepat.', 'Sampai batas tertentu. Langkah yang terlalu besar melampaui minimum, kurva loss berzig-zag atau bahkan naik, dan garisnya berayun liar alih-alih menetap.'],
        ['Jika aturan perceptron belum konvergen, ia butuh lebih banyak epoch.', 'Hanya jika datanya terpisah linear. Pada dataset bising tidak ada garis yang sempurna, sehingga aturan itu terus mengoreksi kesalahan selamanya; penurunan gradien dengan loss yang mulus adalah alat yang tepat di sana.'],
        ['Jaringan saraf yang gagal pada XOR berarti rusak.', 'Satu neuron secara matematis tidak mampu mewakili XOR, bagaimanapun ia dilatih. Perbaikannya adalah arsitektur (lapisan tersembunyi), bukan pelatihan lebih lama.'],
        ['Pelatihan selalu menemukan bobot terbaik.', 'Penurunan gradien menemukan minimum lokal. Dengan dua neuron tersembunyi pada XOR, beberapa bobot awal berujung buntu pada akurasi 75%; awal acak yang lain bisa mencapai 100%.'],
      ],
    },
    realWorld: {
      en: [
        'The 1958 Mark I Perceptron was a room-sized machine that learned to tell simple shapes apart from a 20 × 20 photocell "retina".',
        'Logistic regression, which is exactly the sigmoid neuron trained by gradient descent, is still a standard tool for credit scoring and medical risk prediction.',
        'Modern image recognisers stack millions of these neurons in dozens of layers; every one of them still computes a weighted sum plus bias.',
        'The learning-rate trade-off you see here is why practitioners use schedules that start with large steps and shrink them over time.',
      ],
      id: [
        'Mark I Perceptron tahun 1958 adalah mesin sebesar ruangan yang belajar membedakan bentuk sederhana dari "retina" fotosel 20 × 20.',
        'Regresi logistik, yang persis sama dengan neuron sigmoid yang dilatih penurunan gradien, masih menjadi alat standar untuk penilaian kredit dan prediksi risiko medis.',
        'Pengenal gambar modern menumpuk jutaan neuron seperti ini dalam puluhan lapisan; setiap neuronnya tetap menghitung jumlah berbobot plus bias.',
        'Tarik-ulur laju belajar yang kamu lihat di sini adalah alasan para praktisi memakai jadwal yang mulai dengan langkah besar lalu mengecilkannya seiring waktu.',
      ],
    },
    questions: {
      en: [
        { q: 'A neuron has w₁ = 2, w₂ = −1, b = 0.5. Classify the point (x₁, x₂) = (0.2, 0.9) and write the equation of its decision line.', a: 'z = 2(0.2) − 1(0.9) + 0.5 = 0.4 − 0.9 + 0.5 = 0.0, right on the boundary (so output 0 with the rule z > 0). The decision line is 2x₁ − x₂ + 0.5 = 0, i.e. x₂ = 2x₁ + 0.5.' },
        { q: 'With the perceptron rule, η = 0.1, the example x = (0.5, −0.4) has label y = 1 but is predicted ŷ = 0. What are the updates to w₁, w₂ and b?', a: 'Δw = η (y − ŷ) x = 0.1 × 1 × (0.5, −0.4) = (+0.05, −0.04), and Δb = 0.1 × 1 = +0.1. The weights move towards the missed point.' },
        { q: 'Why does the loss curve for the perceptron rule on the noisy dataset keep oscillating instead of going to zero?', a: 'The noisy data is not linearly separable, so every line misclassifies some points. Each pass finds mistakes, applies corrections, and creates new mistakes elsewhere. The rule only converges when a perfect line exists.' },
        { q: 'Explain in one sentence why two hidden neurons can solve XOR when one neuron cannot.', a: 'Each hidden neuron draws a line, and the output neuron can respond to "between the two lines" versus "outside them", which is a region no single straight line can describe.' },
      ],
      id: [
        { q: 'Sebuah neuron memiliki w₁ = 2, w₂ = −1, b = 0,5. Klasifikasikan titik (x₁, x₂) = (0,2, 0,9) dan tulis persamaan garis keputusannya.', a: 'z = 2(0,2) − 1(0,9) + 0,5 = 0,4 − 0,9 + 0,5 = 0,0, tepat di batas (jadi keluaran 0 dengan aturan z > 0). Garis keputusannya 2x₁ − x₂ + 0,5 = 0, yaitu x₂ = 2x₁ + 0,5.' },
        { q: 'Dengan aturan perceptron, η = 0,1, contoh x = (0,5, −0,4) berlabel y = 1 tetapi diprediksi ŷ = 0. Berapa pembaruan w₁, w₂ dan b?', a: 'Δw = η (y − ŷ) x = 0,1 × 1 × (0,5, −0,4) = (+0,05, −0,04), dan Δb = 0,1 × 1 = +0,1. Bobot bergerak ke arah titik yang terlewat.' },
        { q: 'Mengapa kurva loss aturan perceptron pada dataset bising terus berosilasi alih-alih menuju nol?', a: 'Data bising tidak terpisah linear, sehingga setiap garis salah mengklasifikasi beberapa titik. Setiap putaran menemukan kesalahan, menerapkan koreksi, dan menciptakan kesalahan baru di tempat lain. Aturan itu hanya konvergen jika ada garis yang sempurna.' },
        { q: 'Jelaskan dalam satu kalimat mengapa dua neuron tersembunyi bisa memecahkan XOR sementara satu neuron tidak.', a: 'Setiap neuron tersembunyi menggambar sebuah garis, dan neuron keluaran dapat merespons "di antara kedua garis" versus "di luar keduanya", yaitu daerah yang tidak bisa digambarkan oleh satu garis lurus mana pun.' },
      ],
    },
  },
};
