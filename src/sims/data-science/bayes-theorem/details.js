// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply P(D|+) = P(+|D)P(D) / P(+).',
      'See why prevalence dominates the posterior when it is small.',
      'Reason about base-rate fallacy.',
    ],
    id: [
      'Menerapkan P(D|+) = P(+|D)P(D) / P(+).',
      'Melihat mengapa prevalensi mendominasi posterior saat angkanya kecil.',
      'Menalar tentang kekeliruan base-rate.',
    ],
  },
  tryThis: {
    en: [
      'Set prevalence to 1% with 99% accuracy — what fraction of positives are true?',
      'Bump prevalence to 50% — does the same test feel reliable now?',
      'Increase specificity from 99% to 99.9% — how much does posterior change?',
    ],
    id: [
      'Atur prevalensi ke 1% dengan akurasi 99% — berapa fraksi positif yang benar?',
      'Naikkan prevalensi ke 50% — apakah tes yang sama terasa andal sekarang?',
      'Naikkan spesifisitas dari 99% ke 99,9% — seberapa besar perubahan posterior?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A medical test is usually described by two numbers. Sensitivity, P(+|D), is the chance that a sick person tests positive; specificity, P(−|¬D), is the chance that a healthy person tests negative. Neither answers the question a patient actually asks: "I tested positive, so what is the chance I really have the disease?" That is a different conditional probability, P(D|+), called the positive predictive value or posterior. Bayes\' theorem connects them: P(D|+) = P(+|D)·P(D) / P(+), where the denominator P(+) = P(+|D)·P(D) + P(+|¬D)·(1 − P(D)) adds up all the ways a positive result can happen.',
        'Instead of multiplying fractions, the simulation counts people. It draws a population of 10,000 dots. The prevalence P(D) decides how many of them are sick (the first rows of the grid); sensitivity decides how many of those sick people test positive (green true positives) or negative (amber false negatives); specificity decides how many healthy people correctly test negative (dark), leaving the rest as red false positives. The bar underneath collects everyone who tested positive, and its green share is exactly P(D|+). Working with whole-number counts like this is called using natural frequencies, and it is the same calculation as the formula.',
        'Drag the prevalence slider down and watch the balance change. With 1% prevalence and a test that is 99% sensitive and 99% specific, 100 people are sick and 99 of them test positive, but 9,900 are healthy and 1% of them, another 99, also test positive. Half of all positives are false, so P(D|+) is only 50%. The false positives come from the huge healthy group, which is why, when a disease is rare, raising specificity from 99% to 99.9% helps far more than raising sensitivity: it shrinks the false positives tenfold, pushing the posterior above 90%. You can also drag inside the dot grid to set prevalence directly.',
        'The simulation keeps things simple in a few ways. It rounds every group to whole people out of 10,000, so at very low prevalence (0.1% is only 10 people) the displayed percentage can differ slightly from the exact formula. It assumes the person tested is a random member of the population; in a clinic, people are tested because they have symptoms, which raises the prior P(D) before the test is even done. It also considers one test only. In practice a positive screening result is followed by a second, independent test, and Bayes\' theorem is applied again with the new, higher prior.',
      ],
      id: [
        'Sebuah tes medis biasanya digambarkan dengan dua angka. Sensitivitas, P(+|D), adalah peluang orang yang sakit mendapat hasil positif; spesifisitas, P(−|¬D), adalah peluang orang sehat mendapat hasil negatif. Keduanya tidak menjawab pertanyaan yang sebenarnya diajukan pasien: "Hasil tes saya positif, jadi berapa peluang saya benar-benar sakit?" Itu peluang bersyarat yang berbeda, P(D|+), yang disebut nilai prediksi positif atau posterior. Teorema Bayes menghubungkan keduanya: P(D|+) = P(+|D)·P(D) / P(+), dengan penyebut P(+) = P(+|D)·P(D) + P(+|¬D)·(1 − P(D)) yang menjumlahkan semua cara munculnya hasil positif.',
        'Alih-alih mengalikan pecahan, simulasi ini menghitung orang. Ia menggambar populasi 10.000 titik. Prevalensi P(D) menentukan berapa banyak yang sakit (baris-baris pertama kisi); sensitivitas menentukan berapa dari orang sakit itu yang positif (hijau, positif benar) atau negatif (kuning, negatif palsu); spesifisitas menentukan berapa orang sehat yang benar dinyatakan negatif (gelap), dan sisanya menjadi positif palsu berwarna merah. Batang di bawahnya mengumpulkan semua orang yang hasil tesnya positif, dan bagian hijaunya tepat sama dengan P(D|+). Bekerja dengan hitungan bilangan bulat seperti ini disebut memakai frekuensi alami, dan hasilnya sama persis dengan rumus.',
        'Geser slider prevalensi ke bawah dan perhatikan keseimbangannya berubah. Dengan prevalensi 1% dan tes yang sensitivitas serta spesifisitasnya 99%, ada 100 orang sakit dan 99 di antaranya positif, tetapi ada 9.900 orang sehat dan 1% di antaranya, yaitu 99 orang lagi, juga positif. Separuh dari semua hasil positif ternyata palsu, sehingga P(D|+) hanya 50%. Positif palsu itu berasal dari kelompok sehat yang sangat besar. Karena itulah, saat penyakit langka, menaikkan spesifisitas dari 99% ke 99,9% jauh lebih berguna daripada menaikkan sensitivitas: positif palsu menyusut sepuluh kali lipat dan posterior naik di atas 90%. Kamu juga bisa menyeret di dalam kisi titik untuk mengatur prevalensi secara langsung.',
        'Simulasi ini menyederhanakan beberapa hal. Setiap kelompok dibulatkan ke orang utuh dari 10.000, sehingga pada prevalensi sangat rendah (0,1% hanya 10 orang) persentase yang tampil bisa sedikit berbeda dari rumus eksak. Simulasi mengasumsikan orang yang dites adalah anggota acak populasi; di klinik, orang dites karena bergejala, dan itu menaikkan prior P(D) bahkan sebelum tes dilakukan. Simulasi juga hanya memperhitungkan satu tes. Dalam praktik, hasil skrining positif ditindaklanjuti dengan tes kedua yang independen, dan teorema Bayes diterapkan lagi dengan prior baru yang lebih tinggi.',
      ],
    },
    figure: {
      caption: {
        en: 'Natural-frequency tree for 10,000 people with 1% prevalence and a 99%/99% test. Positives come equally from the 100 sick and the 9,900 healthy, so a positive result means only a 50% chance of disease.',
        id: 'Pohon frekuensi alami untuk 10.000 orang dengan prevalensi 1% dan tes 99%/99%. Hasil positif datang sama banyak dari 100 orang sakit dan 9.900 orang sehat, sehingga hasil positif hanya berarti peluang sakit 50%.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Natural frequency tree for a medical test', 'Pohon frekuensi alami untuk tes medis')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.s{font-size:10px;opacity:.75}.b{font-weight:600}</style>
  <text x="8" y="104" class="b">${L('10,000 people', '10.000 orang')}</text>
  <text x="8" y="118" class="s">${L('tested once', 'dites sekali')}</text>
  <path d="M102 100 L118 100 L118 60 L134 60 M118 100 L118 160 L134 160" class="m"/>
  <text x="138" y="56" fill="#f59e0b" class="b">100 ${L('sick', 'sakit')}</text>
  <text x="138" y="69" class="s">${L('prevalence 1%', 'prevalensi 1%')}</text>
  <text x="138" y="156" class="b">9,900 ${L('healthy', 'sehat')}</text>
  <text x="138" y="169" class="s">${L('the other 99%', '99% sisanya')}</text>
  <path d="M222 60 L234 60 L234 36 L246 36 M234 60 L234 84 L246 84" class="m"/>
  <path d="M222 160 L234 160 L234 136 L246 136 M234 160 L234 184 L246 184" class="m"/>
  <text x="250" y="40" fill="#10b981" class="b">99 ${L('test +', 'tes +')} (TP)</text>
  <text x="250" y="88" fill="#f59e0b">1 ${L('test −', 'tes −')} (FN)</text>
  <text x="250" y="140" fill="#ef4444" class="b">99 ${L('test +', 'tes +')} (FP)</text>
  <text x="250" y="188">9,801 ${L('test −', 'tes −')} (TN)</text>
  <text x="250" y="54" class="s">99% ${L('of 100', 'dari 100')}</text>
  <text x="250" y="154" class="s">1% ${L('of 9,900', 'dari 9.900')}</text>
  <rect x="8" y="204" width="344" height="30" rx="6" fill="#3b82f6" opacity=".15"/>
  <text x="16" y="224" class="b">P(D | +) = TP / (TP + FP) = 99 / (99 + 99) = 50%</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'P(+|D) and P(D|+) are different questions: sensitivity describes the test, the posterior describes the patient.',
        'When a disease is rare, a small false-positive rate applied to the huge healthy group produces more false positives than true positives.',
        'The posterior is simply TP / (TP + FP); with 1% prevalence and a 99%/99% test it is only 50%.',
        'At low prevalence, specificity has far more leverage than sensitivity, because it acts on the large group.',
        'Counting people in a population of 10,000 gives the same answer as the formula and is much easier to reason about.',
      ],
      id: [
        'P(+|D) dan P(D|+) adalah pertanyaan yang berbeda: sensitivitas menggambarkan tesnya, posterior menggambarkan pasiennya.',
        'Saat penyakit langka, laju positif palsu yang kecil pada kelompok sehat yang sangat besar menghasilkan lebih banyak positif palsu daripada positif benar.',
        'Posterior hanyalah TP / (TP + FP); dengan prevalensi 1% dan tes 99%/99% nilainya hanya 50%.',
        'Pada prevalensi rendah, spesifisitas jauh lebih berpengaruh daripada sensitivitas, karena bekerja pada kelompok yang besar.',
        'Menghitung orang dalam populasi 10.000 memberi jawaban yang sama dengan rumus dan jauh lebih mudah dipahami.',
      ],
    },
    vocabulary: {
      en: [
        ['Prevalence (prior)', 'The fraction of the population that has the disease before any test result is known, P(D).'],
        ['Sensitivity', 'P(+|D): the probability that a sick person gets a positive result; also called the true positive rate.'],
        ['Specificity', 'P(−|¬D): the probability that a healthy person gets a negative result. 1 − specificity is the false positive rate.'],
        ['False positive', 'A healthy person whose test comes back positive.'],
        ['Posterior / positive predictive value', 'P(D|+): the probability of disease given a positive result; equals TP / (TP + FP).'],
        ['Base-rate fallacy', 'Ignoring the prevalence (base rate) and treating the test\'s accuracy as if it were the probability of disease.'],
        ['Natural frequencies', 'Expressing probabilities as counts out of a fixed population, such as 99 out of 10,000, instead of as percentages.'],
      ],
      id: [
        ['Prevalensi (prior)', 'Fraksi populasi yang mengidap penyakit sebelum hasil tes apa pun diketahui, P(D).'],
        ['Sensitivitas', 'P(+|D): peluang orang sakit mendapat hasil positif; disebut juga laju positif benar.'],
        ['Spesifisitas', 'P(−|¬D): peluang orang sehat mendapat hasil negatif. 1 − spesifisitas adalah laju positif palsu.'],
        ['Positif palsu', 'Orang sehat yang hasil tesnya positif.'],
        ['Posterior / nilai prediksi positif', 'P(D|+): peluang sakit jika hasil tes positif; sama dengan TP / (TP + FP).'],
        ['Kekeliruan base-rate', 'Mengabaikan prevalensi (laju dasar) dan memperlakukan akurasi tes seolah-olah itu peluang sakit.'],
        ['Frekuensi alami', 'Menyatakan peluang sebagai hitungan dari populasi tetap, misalnya 99 dari 10.000, bukan sebagai persentase.'],
      ],
    },
    misconceptions: {
      en: [
        ['A test that is 99% accurate means a positive result is 99% certain.', 'Accuracy describes the test, not your result. With 1% prevalence, a 99%/99% test gives a 50% chance of disease after a positive, because the false positives from 9,900 healthy people match the true positives from 100 sick people.'],
        ['Sensitivity and specificity matter equally.', 'For a rare disease, specificity dominates: it acts on the large healthy group. Raising specificity from 99% to 99.9% cuts false positives from 99 to about 10, while the same change in sensitivity adds only one true positive.'],
        ['If the posterior is only 50%, the test was useless.', 'The test raised the probability from 1% to 50%, a fifty-fold increase. A second independent positive test, applied with 50% as the new prior, pushes it to about 99%.'],
      ],
      id: [
        ['Tes yang akurat 99% berarti hasil positif pasti 99%.', 'Akurasi menggambarkan tesnya, bukan hasilmu. Dengan prevalensi 1%, tes 99%/99% memberi peluang sakit 50% setelah hasil positif, karena positif palsu dari 9.900 orang sehat sama banyak dengan positif benar dari 100 orang sakit.'],
        ['Sensitivitas dan spesifisitas sama pentingnya.', 'Untuk penyakit langka, spesifisitas yang menentukan: ia bekerja pada kelompok sehat yang besar. Menaikkan spesifisitas dari 99% ke 99,9% memangkas positif palsu dari 99 menjadi sekitar 10, sedangkan perubahan yang sama pada sensitivitas hanya menambah satu positif benar.'],
        ['Kalau posteriornya hanya 50%, tesnya tidak berguna.', 'Tes itu menaikkan peluang dari 1% ke 50%, lima puluh kali lipat. Tes kedua yang independen dan positif, dengan 50% sebagai prior baru, mendorongnya ke sekitar 99%.'],
      ],
    },
    realWorld: {
      en: [
        'Cancer screening programmes report that most positive mammograms in women without symptoms turn out to be false alarms, which is why a positive screen is always followed by further tests rather than treatment.',
        'Rapid antigen tests for infections work well when many people are infected, but in a population where the infection has almost disappeared most positives are false, so health agencies change their testing advice as prevalence falls.',
        'Spam filters are built directly on Bayes\' theorem: each word in an email updates the probability that the message is spam, starting from the base rate of spam in your inbox.',
        'Doctors are taught to "treat the patient, not the test": the same result means different things for a person with symptoms (high prior) and a person screened at random (low prior).',
      ],
      id: [
        'Program skrining kanker melaporkan bahwa sebagian besar hasil mamografi positif pada perempuan tanpa gejala ternyata alarm palsu, sehingga hasil skrining positif selalu ditindaklanjuti dengan pemeriksaan lanjutan, bukan langsung pengobatan.',
        'Tes antigen cepat bekerja baik ketika banyak orang terinfeksi, tetapi di populasi yang infeksinya hampir hilang sebagian besar hasil positif adalah palsu, sehingga lembaga kesehatan mengubah anjuran tes saat prevalensi turun.',
        'Filter spam dibangun langsung di atas teorema Bayes: setiap kata dalam surel memperbarui peluang bahwa pesan itu spam, dimulai dari laju dasar spam di kotak masukmu.',
        'Dokter diajari "mengobati pasien, bukan hasil tes": hasil yang sama bermakna berbeda untuk orang bergejala (prior tinggi) dan orang yang diskrining secara acak (prior rendah).',
      ],
    },
    questions: {
      en: [
        { q: 'Prevalence is 1%, sensitivity 99%, and specificity is raised to 99.9%. Out of 10,000 people, what is P(D|+)?', a: 'About 91%. 100 people are sick and 99 test positive. 9,900 are healthy and 0.1% of them, about 10, test positive. So P(D|+) = 99 / (99 + 10) ≈ 0.91. Cutting false positives tenfold nearly doubled the posterior.' },
        { q: 'The "Common" preset uses 20% prevalence with a weaker 95%/95% test, yet its posterior is higher than the 1%, 99%/99% case. Why?', a: 'Because the sick group is now large. 2,000 people are sick and 1,900 test positive; 8,000 are healthy and 5% of them, 400, test positive. P(D|+) = 1,900 / 2,300 ≈ 83%. A weaker test on a common disease beats a stronger test on a rare one.' },
        { q: 'A clinic only tests people who already have symptoms. The test itself is unchanged. What happens to P(D|+), and which number in Bayes\' theorem changed?', a: 'P(D|+) goes up. Only the prior P(D) changed: among people with symptoms the disease is more common than in the general population, so there are more true positives relative to false positives. Sensitivity and specificity stayed the same.' },
      ],
      id: [
        { q: 'Prevalensi 1%, sensitivitas 99%, dan spesifisitas dinaikkan ke 99,9%. Dari 10.000 orang, berapa P(D|+)?', a: 'Sekitar 91%. Ada 100 orang sakit dan 99 di antaranya positif. Ada 9.900 orang sehat dan 0,1% di antaranya, sekitar 10 orang, positif. Jadi P(D|+) = 99 / (99 + 10) ≈ 0,91. Memangkas positif palsu sepuluh kali lipat hampir menggandakan posterior.' },
        { q: 'Preset "Common" memakai prevalensi 20% dengan tes yang lebih lemah, 95%/95%, tetapi posteriornya lebih tinggi daripada kasus 1% dengan tes 99%/99%. Mengapa?', a: 'Karena kelompok sakitnya kini besar. Ada 2.000 orang sakit dan 1.900 positif; ada 8.000 orang sehat dan 5% di antaranya, 400 orang, positif. P(D|+) = 1.900 / 2.300 ≈ 83%. Tes yang lebih lemah untuk penyakit umum mengalahkan tes yang lebih kuat untuk penyakit langka.' },
        { q: 'Sebuah klinik hanya mengetes orang yang sudah bergejala. Tesnya sendiri tidak berubah. Apa yang terjadi pada P(D|+), dan angka mana dalam teorema Bayes yang berubah?', a: 'P(D|+) naik. Hanya prior P(D) yang berubah: di antara orang bergejala, penyakit lebih umum daripada di populasi umum, sehingga positif benar lebih banyak dibanding positif palsu. Sensitivitas dan spesifisitas tetap sama.' },
      ],
    },
  },
};
