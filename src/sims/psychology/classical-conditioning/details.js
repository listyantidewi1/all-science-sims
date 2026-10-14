// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Pair UCS (food) + NS (bell) → CS (bell alone) elicits CR (salivation).',
      'See acquisition: pairing strengthens association curve.',
      'See extinction: bell-without-food slowly weakens the response.',
    ],
    id: [
      'Pasangkan UCS (makanan) + NS (bel) → CS (bel saja) memicu CR (salivasi).',
      'Melihat akuisisi: berpasangan memperkuat kurva asosiasi.',
      'Melihat pemadaman: bel-tanpa-makanan perlahan melemahkan respons.',
    ],
  },
  tryThis: {
    en: [
      'Pair bell + food 10 times — bell alone now triggers strong salivation.',
      'Ring bell without food many times — extinction; salivation drops.',
      'Pair again briefly — "spontaneous recovery" is fast.',
    ],
    id: [
      'Pasangkan bel + makanan 10 kali — bel saja kini memicu salivasi kuat.',
      'Bunyikan bel tanpa makanan berkali-kali — pemadaman; salivasi turun.',
      'Pasangkan lagi singkat — "pemulihan spontan" cepat.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Some responses are built in: food in the mouth makes a dog salivate without any learning. Ivan Pavlov, studying digestion in the 1890s and 1900s, noticed that his dogs began salivating before the food arrived, at the sight of the assistant or the sound of footsteps. He turned this into a controlled experiment: sound a neutral signal such as a metronome or bell, then present food, and repeat. After enough pairings the signal alone made the dog salivate. The dog had learned that one event predicts another.',
        'Psychologists describe this with four labels. Food is the unconditioned stimulus (UCS) because it produces salivation, the unconditioned response (UCR), automatically. The bell starts as a neutral stimulus; after pairing it becomes a conditioned stimulus (CS), and the salivation it now produces on its own is the conditioned response (CR). The learning phase is called acquisition. If the bell is then sounded repeatedly without food, the CR fades, which is extinction. Pavlov also found that after a rest an extinguished response partly returns (spontaneous recovery), that similar sounds also trigger the CR (generalisation), and that the dog can learn to respond to one tone but not another (discrimination).',
        'The simulation tracks a single number, association strength, from 0 to 1. Each click of Pair bell and food raises it by the Learning rate, and the food itself always produces full salivation. Bell only produces salivation in proportion to the current association (the CR), then lowers the association by the Extinction rate. Food only produces the UCR without changing the association, which shows that salivating to food is not learned. The chart colours each trial by type and draws the association as a white line, so you can see acquisition climb and extinction fall.',
        'The model is a simplification. Real acquisition curves rise quickly at first and then flatten, because each pairing teaches less as the signal becomes a better predictor; the sim adds the same amount every time until it hits the ceiling. The sim has no clock, so it cannot show spontaneous recovery after a rest, and re-learning after extinction happens at the same rate as original learning, whereas in real animals it is faster. Timing also matters in reality (the bell should come just before the food) and is ignored here.',
      ],
      id: [
        'Beberapa respons sudah bawaan: makanan di mulut membuat anjing mengeluarkan air liur tanpa perlu belajar. Ivan Pavlov, yang meneliti pencernaan pada 1890-an dan 1900-an, memperhatikan anjing-anjingnya mulai berliur sebelum makanan datang, saat melihat asisten atau mendengar langkah kaki. Ia mengubah ini menjadi eksperimen terkontrol: bunyikan sinyal netral seperti metronom atau bel, lalu sajikan makanan, dan ulangi. Setelah cukup banyak pasangan, sinyal saja sudah membuat anjing berliur. Anjing telah belajar bahwa satu peristiwa meramalkan peristiwa lain.',
        'Psikolog menjelaskan ini dengan empat label. Makanan adalah stimulus tak terkondisi (UCS) karena menghasilkan salivasi, respons tak terkondisi (UCR), secara otomatis. Bel awalnya stimulus netral; setelah dipasangkan ia menjadi stimulus terkondisi (CS), dan salivasi yang kini dihasilkannya sendiri adalah respons terkondisi (CR). Fase belajarnya disebut akuisisi. Jika bel kemudian dibunyikan berulang kali tanpa makanan, CR memudar; inilah pemadaman. Pavlov juga menemukan bahwa setelah jeda istirahat, respons yang telah padam sebagian kembali (pemulihan spontan), bahwa bunyi yang serupa juga memicu CR (generalisasi), dan bahwa anjing bisa belajar merespons satu nada tetapi tidak nada lain (diskriminasi).',
        'Simulasi ini melacak satu angka, kekuatan asosiasi, dari 0 sampai 1. Setiap klik Pair bell and food menaikkannya sebesar Learning rate, dan makanan itu sendiri selalu menghasilkan salivasi penuh. Bell only menghasilkan salivasi sebanding dengan asosiasi saat itu (CR), lalu menurunkan asosiasi sebesar Extinction rate. Food only menghasilkan UCR tanpa mengubah asosiasi, yang menunjukkan bahwa berliur terhadap makanan bukan hasil belajar. Grafik mewarnai tiap percobaan menurut jenisnya dan menggambar asosiasi sebagai garis putih, sehingga kamu bisa melihat akuisisi menanjak dan pemadaman menurun.',
        'Model ini adalah penyederhanaan. Kurva akuisisi sungguhan naik cepat pada awalnya lalu mendatar, karena tiap pasangan mengajarkan lebih sedikit saat sinyal makin menjadi peramal yang baik; simulasi menambahkan jumlah yang sama setiap kali sampai mencapai batas atas. Simulasi tidak punya jam, sehingga tidak bisa menunjukkan pemulihan spontan setelah istirahat, dan belajar ulang setelah pemadaman berlangsung dengan laju yang sama seperti belajar awal, padahal pada hewan sungguhan lebih cepat. Pengaturan waktu juga penting dalam kenyataan (bel harus berbunyi tepat sebelum makanan) dan diabaikan di sini.',
      ],
    },
    figure: {
      caption: {
        en: 'Before conditioning the bell does nothing and food alone triggers salivation. During conditioning the two are paired. Afterwards the bell alone triggers salivation: the neutral stimulus has become a conditioned stimulus. The inset shows association rising during pairing and falling during bell-only extinction.',
        id: 'Sebelum pengondisian, bel tidak berpengaruh dan hanya makanan yang memicu salivasi. Selama pengondisian keduanya dipasangkan. Setelahnya, bel saja memicu salivasi: stimulus netral telah menjadi stimulus terkondisi. Sisipan menunjukkan asosiasi naik saat dipasangkan dan turun saat pemadaman dengan bel saja.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Classical conditioning timeline', 'Garis waktu pengondisian klasik')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.ar{stroke:currentColor;stroke-width:1.4;fill:none}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.5}</style>
  <text x="10" y="18" font-weight="bold">${L('1. Before', '1. Sebelum')}</text>
  <text x="20" y="38" fill="#f59e0b">${L('bell (NS)', 'bel (NS)')}</text>
  <line x1="84" y1="34" x2="118" y2="34" class="ar" marker-end="url(#a)"/>
  <text x="126" y="38" class="s" opacity=".7">${L('no response', 'tak ada respons')}</text>
  <text x="20" y="58" fill="#ef4444">${L('food (UCS)', 'makanan (UCS)')}</text>
  <line x1="98" y1="54" x2="118" y2="54" class="ar" marker-end="url(#a)"/>
  <text x="126" y="58" fill="#3b82f6">${L('salivation (UCR)', 'salivasi (UCR)')}</text>
  <text x="10" y="88" font-weight="bold">${L('2. During: pairing', '2. Selama: dipasangkan')}</text>
  <text x="20" y="108" fill="#f59e0b">${L('bell', 'bel')}</text>
  <text x="48" y="108">+</text>
  <text x="60" y="108" fill="#ef4444">${L('food', 'makanan')}</text>
  <line x1="106" y1="104" x2="118" y2="104" class="ar" marker-end="url(#a)"/>
  <text x="126" y="108" fill="#3b82f6">${L('salivation', 'salivasi')}</text>
  <text x="20" y="124" class="s" opacity=".7">${L('repeated many times', 'diulang berkali-kali')}</text>
  <text x="10" y="154" font-weight="bold">${L('3. After', '3. Setelah')}</text>
  <text x="20" y="174" fill="#f59e0b">${L('bell alone (CS)', 'bel saja (CS)')}</text>
  <line x1="108" y1="170" x2="118" y2="170" class="ar" marker-end="url(#a)"/>
  <text x="126" y="174" fill="#3b82f6">${L('salivation (CR)', 'salivasi (CR)')}</text>
  <text x="20" y="190" class="s" opacity=".7">${L('learned: bell predicts food', 'dipelajari: bel meramalkan makanan')}</text>
  <rect x="226" y="30" width="124" height="140" class="ax"/>
  <text x="228" y="24" class="s">${L('association strength', 'kekuatan asosiasi')}</text>
  <rect x="228" y="32" width="58" height="136" fill="#10b981" opacity=".12"/>
  <rect x="288" y="32" width="60" height="136" fill="#f59e0b" opacity=".12"/>
  <polyline points="228,166 238,146 248,128 258,112 268,98 278,86 286,78 296,88 306,100 316,114 326,128 336,142 346,154" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="232" y="184" class="s" fill="#10b981">${L('acquisition', 'akuisisi')}</text>
  <text x="292" y="184" class="s" fill="#f59e0b">${L('extinction', 'pemadaman')}</text>
  <text x="252" y="200" class="s">${L('trials →', 'percobaan →')}</text>
  <text x="234" y="222" class="s" opacity=".8">${L('green: bell + food   amber: bell only', 'hijau: bel + makanan   kuning: bel saja')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Classical conditioning is learning that one stimulus predicts another; the learner does nothing to earn the outcome.',
        'A neutral stimulus becomes a conditioned stimulus when it is repeatedly paired with an unconditioned stimulus that already triggers a response.',
        'Acquisition builds the association; presenting the CS alone, with nothing following it, extinguishes it.',
        'Extinction is new learning that suppresses the old response, not erasure, which is why spontaneous recovery and fast re-learning happen in real animals.',
        'In the sim the association rises by the learning rate per pairing and falls by the extinction rate per unpaired bell; salivation to food never needs learning.',
      ],
      id: [
        'Pengondisian klasik adalah belajar bahwa satu stimulus meramalkan stimulus lain; si pembelajar tidak melakukan apa pun untuk memperoleh hasilnya.',
        'Stimulus netral menjadi stimulus terkondisi ketika berulang kali dipasangkan dengan stimulus tak terkondisi yang sudah memicu respons.',
        'Akuisisi membangun asosiasi; menyajikan CS saja, tanpa apa pun yang mengikutinya, memadamkannya.',
        'Pemadaman adalah belajar baru yang menekan respons lama, bukan penghapusan, karena itu pemulihan spontan dan belajar ulang yang cepat terjadi pada hewan sungguhan.',
        'Dalam simulasi, asosiasi naik sebesar laju belajar per pasangan dan turun sebesar laju pemadaman per bel tanpa makanan; salivasi terhadap makanan tidak pernah perlu dipelajari.',
      ],
    },
    vocabulary: {
      en: [
        ['Unconditioned stimulus (UCS)', 'A stimulus that triggers a response automatically, without learning, such as food in the mouth.'],
        ['Unconditioned response (UCR)', 'The automatic, unlearned response to the UCS, such as salivating to food.'],
        ['Neutral stimulus (NS)', 'A stimulus that initially produces no particular response, such as a bell before training.'],
        ['Conditioned stimulus (CS)', 'A formerly neutral stimulus that, after pairing with the UCS, triggers a response on its own.'],
        ['Conditioned response (CR)', 'The learned response to the CS, such as salivating to the bell.'],
        ['Acquisition', 'The phase in which the CS and UCS are paired and the association grows stronger.'],
        ['Extinction', 'The weakening of the CR when the CS is repeatedly presented without the UCS.'],
        ['Spontaneous recovery', 'The partial return of an extinguished CR after a rest period, showing the association was suppressed rather than erased.'],
      ],
      id: [
        ['Stimulus tak terkondisi (UCS)', 'Stimulus yang memicu respons secara otomatis, tanpa belajar, seperti makanan di mulut.'],
        ['Respons tak terkondisi (UCR)', 'Respons otomatis yang tidak dipelajari terhadap UCS, seperti berliur terhadap makanan.'],
        ['Stimulus netral (NS)', 'Stimulus yang awalnya tidak menghasilkan respons khusus, seperti bel sebelum pelatihan.'],
        ['Stimulus terkondisi (CS)', 'Stimulus yang tadinya netral dan, setelah dipasangkan dengan UCS, memicu respons dengan sendirinya.'],
        ['Respons terkondisi (CR)', 'Respons hasil belajar terhadap CS, seperti berliur terhadap bel.'],
        ['Akuisisi', 'Fase ketika CS dan UCS dipasangkan dan asosiasi makin kuat.'],
        ['Pemadaman', 'Melemahnya CR ketika CS berulang kali disajikan tanpa UCS.'],
        ['Pemulihan spontan', 'Kembalinya sebagian CR yang telah padam setelah jeda istirahat, menunjukkan asosiasi hanya ditekan, bukan dihapus.'],
      ],
    },
    misconceptions: {
      en: [
        ['The dog learned to salivate.', 'Salivating to food is unlearned. What the dog learned is that the bell predicts food; the new thing is the trigger, not the response.'],
        ['Extinction erases the memory, so the dog is back to square one.', 'Extinction adds a new "bell means nothing now" lesson on top of the old one. After a rest the old response partly returns, and re-training is faster than the first time. The sim does not model this, so it understates how persistent conditioning is.'],
        ['Conditioning requires rewards and punishments.', 'That describes operant conditioning, where behaviour is shaped by its consequences. In classical conditioning the animal receives the food regardless of what it does; it simply learns the signal.'],
        ['The association grows by the same amount with every pairing.', 'That is how the sim works, but real learning curves flatten: the first pairings produce the biggest gains and later ones add little, because the bell already predicts the food well.'],
      ],
      id: [
        ['Anjing itu belajar berliur.', 'Berliur terhadap makanan tidak dipelajari. Yang dipelajari anjing adalah bahwa bel meramalkan makanan; yang baru adalah pemicunya, bukan responsnya.'],
        ['Pemadaman menghapus ingatan, jadi anjing kembali ke titik awal.', 'Pemadaman menambahkan pelajaran baru "bel kini tidak berarti apa-apa" di atas pelajaran lama. Setelah jeda, respons lama sebagian kembali, dan pelatihan ulang lebih cepat daripada yang pertama. Simulasi tidak memodelkan ini, sehingga meremehkan betapa awetnya pengondisian.'],
        ['Pengondisian memerlukan hadiah dan hukuman.', 'Itu menggambarkan pengondisian operan, ketika perilaku dibentuk oleh konsekuensinya. Dalam pengondisian klasik, hewan menerima makanan apa pun yang ia lakukan; ia hanya mempelajari sinyalnya.'],
        ['Asosiasi bertambah dengan jumlah yang sama pada setiap pasangan.', 'Begitulah cara kerja simulasi, tetapi kurva belajar sungguhan mendatar: pasangan-pasangan pertama memberi kenaikan terbesar dan yang berikutnya hanya menambah sedikit, karena bel sudah meramalkan makanan dengan baik.'],
      ],
    },
    realWorld: {
      en: [
        'The smell of a hospital or the sound of a dentist\'s drill can make people anxious before anything happens, because those cues have been paired with discomfort.',
        'Advertising pairs products with attractive music, people and places so that the product alone later produces a pleasant feeling.',
        'Patients undergoing chemotherapy often develop nausea at the sight of the clinic or the taste of a food eaten before treatment; this learned taste aversion can form after a single pairing.',
        'A cat that comes running at the sound of a tin opener, and a phone notification sound that makes you reach for your pocket, are everyday conditioned responses.',
      ],
      id: [
        'Bau rumah sakit atau suara bor dokter gigi dapat membuat orang cemas sebelum apa pun terjadi, karena isyarat itu telah dipasangkan dengan rasa tidak nyaman.',
        'Iklan memasangkan produk dengan musik, orang, dan tempat yang menarik agar produk itu sendiri kemudian menimbulkan perasaan menyenangkan.',
        'Pasien kemoterapi sering merasa mual saat melihat klinik atau mengecap makanan yang dimakan sebelum pengobatan; keengganan rasa yang dipelajari ini bisa terbentuk setelah satu pasangan saja.',
        'Kucing yang berlari mendengar bunyi pembuka kaleng, dan bunyi notifikasi ponsel yang membuat tangan kita merogoh kantong, adalah respons terkondisi sehari-hari.',
      ],
    },
    questions: {
      en: [
        { q: 'With the learning rate at 0.18, how many pairings does the sim need to reach an association of 90% or more, and what salivation would the next bell-only trial produce?', a: 'Five pairings: 5 × 0.18 = 0.90. A bell-only trial then produces salivation equal to the association, 90%, and afterwards the association drops by the extinction rate (0.06 by default) to 0.84.' },
        { q: 'A child is frightened by a loud bang while a white rabbit is nearby and afterwards cries when shown the rabbit. Label the UCS, UCR, CS and CR.', a: 'The loud bang is the UCS and the fear it causes automatically is the UCR. The rabbit, neutral at first, becomes the CS after the pairing, and crying at the sight of the rabbit is the CR. This is the same structure as bell and food, with fear in place of salivation.' },
        { q: 'After extinguishing the response completely, Pavlov left a dog alone for a day and then rang the bell. Salivation returned, though weaker. Why does this show extinction is not forgetting, and can the sim reproduce it?', a: 'If extinction had erased the association, the bell would have stayed silent. The return (spontaneous recovery) shows the original association survived and was only being suppressed by the newer "no food" learning, which fades with time. The sim cannot reproduce it: it has no clock, and its association number is literally reduced to zero, so the rested bell produces nothing.' },
      ],
      id: [
        { q: 'Dengan laju belajar 0,18, berapa pasangan yang diperlukan simulasi untuk mencapai asosiasi 90% atau lebih, dan berapa salivasi yang dihasilkan percobaan bel saja berikutnya?', a: 'Lima pasangan: 5 × 0,18 = 0,90. Percobaan bel saja kemudian menghasilkan salivasi sebesar asosiasi, 90%, dan setelahnya asosiasi turun sebesar laju pemadaman (0,06 secara bawaan) menjadi 0,84.' },
        { q: 'Seorang anak terkejut oleh suara ledakan keras saat ada kelinci putih di dekatnya, dan setelah itu menangis ketika diperlihatkan kelinci. Tentukan UCS, UCR, CS, dan CR-nya.', a: 'Suara ledakan adalah UCS dan rasa takut yang otomatis ditimbulkannya adalah UCR. Kelinci, yang awalnya netral, menjadi CS setelah pemasangan, dan menangis saat melihat kelinci adalah CR. Strukturnya sama dengan bel dan makanan, dengan rasa takut menggantikan salivasi.' },
        { q: 'Setelah memadamkan respons sepenuhnya, Pavlov meninggalkan anjing sendirian selama sehari lalu membunyikan bel. Salivasi kembali, meski lebih lemah. Mengapa ini menunjukkan pemadaman bukan lupa, dan dapatkah simulasi mereproduksinya?', a: 'Jika pemadaman menghapus asosiasi, bel akan tetap tanpa respons. Kembalinya respons (pemulihan spontan) menunjukkan asosiasi awal masih ada dan hanya ditekan oleh pelajaran baru "tidak ada makanan", yang memudar seiring waktu. Simulasi tidak bisa mereproduksinya: ia tidak punya jam, dan angka asosiasinya benar-benar dikurangi sampai nol, sehingga bel setelah istirahat tidak menghasilkan apa pun.' },
      ],
    },
  },
};
