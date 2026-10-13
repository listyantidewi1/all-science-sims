// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Recognize sensitivity to initial conditions (the "butterfly effect").',
      'Distinguish chaotic motion from periodic motion.',
      'See that deterministic ≠ predictable in practice.',
    ],
    id: [
      'Mengenali sensitivitas terhadap kondisi awal ("efek kupu-kupu").',
      'Membedakan gerak kacau dari gerak periodik.',
      'Melihat bahwa deterministik ≠ dapat diprediksi dalam praktiknya.',
    ],
  },
  tryThis: {
    en: [
      'Run with the ghost pendulum on — at what time do they visibly diverge?',
      'Make masses very different — does it become more or less chaotic?',
      'Drag both bobs to nearly aligned upward — is that motion stable?',
    ],
    id: [
      'Jalankan dengan bandul bayangan aktif — kapan keduanya tampak menyimpang?',
      'Buat massa sangat berbeda — apakah jadi lebih kacau atau lebih teratur?',
      'Seret kedua bola hampir lurus ke atas — apakah gerakannya stabil?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A double pendulum is one pendulum hanging from the end of another: a rod of length L1 with mass m1 swings from a fixed pivot, and a second rod of length L2 with mass m2 swings from m1. Its state at any instant is fixed by four numbers, the two angles θ1 and θ2 and the two angular velocities. Gravity, the rod constraints, and Newton\'s laws then determine the future completely: the system is deterministic, with no randomness anywhere in its equations.',
        'And yet, swung hard, it is unpredictable. For small swings the two angles stay small, the equations are nearly linear, and the motion is a tidy combination of two regular patterns (normal modes). For large swings the equations are strongly nonlinear, because the pull of each rod on the other depends on sin and cos of the angle difference, and the motion becomes chaotic. The defining feature of chaos is sensitive dependence on initial conditions: two starts that differ by a tiny amount drift apart exponentially fast, so the gap roughly doubles every fixed interval of time until the two motions have nothing in common. Since no measurement is perfect, long-term prediction is impossible in practice even though the laws are exact.',
        'The sim integrates the full equations of motion with a high-accuracy method (fourth-order Runge–Kutta) for two copies of the pendulum at once. The blue one is the pendulum you drag; the red ghost starts with θ1 larger by one hundred-thousandth of a radian (about 0.0006°), an error far smaller than any real measurement. The readout prints the on-screen separation of their lower bobs in pixels: it stays near zero for a while, then explodes. The mass and length sliders change the equations; the trail shows the path of the lower bob, which is smooth and repeating for small swings and tangled for large ones.',
        'There is no friction in the model, so total energy (kinetic plus gravitational potential) is conserved and the motion never dies out; the trail is simply cut off after a fixed number of points. The rods are massless and rigid, the bobs are points, and the motion is confined to a plane. Because chaos amplifies every error, including the tiny rounding errors of the computer, the simulated path after a long time is not the exact path of any real pendulum, only a typical one; this is true of every chaotic simulation, including weather models.',
      ],
      id: [
        'Bandul ganda adalah sebuah bandul yang tergantung pada ujung bandul lain: batang sepanjang L1 dengan massa m1 berayun dari poros tetap, dan batang kedua sepanjang L2 dengan massa m2 berayun dari m1. Keadaannya pada saat mana pun ditentukan oleh empat bilangan, dua sudut θ1 dan θ2 serta dua kecepatan sudut. Gravitasi, kekangan batang, dan hukum Newton kemudian menentukan masa depannya sepenuhnya: sistem ini deterministik, tanpa unsur acak sedikit pun dalam persamaannya.',
        'Namun, jika diayunkan dengan keras, geraknya tidak dapat diprediksi. Untuk ayunan kecil kedua sudut tetap kecil, persamaannya hampir linear, dan geraknya adalah gabungan rapi dari dua pola teratur (moda normal). Untuk ayunan besar persamaannya sangat tak linear, karena tarikan tiap batang terhadap batang lain bergantung pada sin dan cos selisih sudut, dan geraknya menjadi kacau (chaotic). Ciri utama kekacauan adalah kepekaan terhadap kondisi awal: dua keadaan awal yang berbeda sangat sedikit menyimpang secara eksponensial, sehingga selisihnya kira-kira menggandakan diri setiap selang waktu tertentu sampai kedua gerak tidak lagi punya kesamaan. Karena tidak ada pengukuran yang sempurna, prediksi jangka panjang mustahil dalam praktik meskipun hukumnya eksak.',
        'Simulasi mengintegrasikan persamaan gerak lengkap dengan metode berakurasi tinggi (Runge–Kutta orde empat) untuk dua salinan bandul sekaligus. Yang biru adalah bandul yang kamu seret; bayangan merah mulai dengan θ1 lebih besar 0,00001 radian (sekitar 0,0006°), galat yang jauh lebih kecil daripada pengukuran nyata mana pun. Tampilan mencetak jarak di layar antara kedua bola bawah dalam piksel: nilainya tetap dekat nol untuk sementara, lalu meledak. Slider massa dan panjang mengubah persamaannya; jejak menunjukkan lintasan bola bawah, yang mulus dan berulang untuk ayunan kecil tetapi kusut untuk ayunan besar.',
        'Tidak ada gesekan dalam model, sehingga energi total (kinetik ditambah potensial gravitasi) kekal dan gerak tidak pernah mati; jejak hanya dipotong setelah sejumlah titik tertentu. Batang dianggap tak bermassa dan kaku, bola dianggap titik, dan gerak dibatasi pada satu bidang. Karena kekacauan memperbesar setiap galat, termasuk galat pembulatan kecil di komputer, lintasan simulasi setelah waktu lama bukanlah lintasan tepat bandul nyata mana pun, hanya lintasan yang khas; ini berlaku untuk setiap simulasi kacau, termasuk model cuaca.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the four state variables θ1, θ2 and their rates, with a ghost copy (red, dashed) started a hair\'s breadth away. Right: the separation between the two copies stays tiny, then grows exponentially, which is the signature of chaos.',
        id: 'Kiri: empat variabel keadaan θ1, θ2 dan lajunya, dengan salinan bayangan (merah, putus-putus) yang dimulai hanya sehelai rambut berbeda. Kanan: jarak antara kedua salinan tetap kecil, lalu tumbuh secara eksponensial, inilah tanda kekacauan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const curve = () => {
          const pts = [];
          for (let i = 0; i <= 60; i++) {
            const u = i / 60;
            const y = 200 - 130 * (Math.exp(5 * u) - 1) / (Math.exp(5) - 1);
            pts.push(`${(205 + u * 130).toFixed(1)},${y.toFixed(1)}`);
          }
          return pts.join(' ');
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Double pendulum geometry and exponential divergence', 'Geometri bandul ganda dan penyimpangan eksponensial')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}</style>
  <line x1="60" y1="30" x2="120" y2="30" stroke="currentColor" stroke-width="3"/>
  <line x1="90" y1="30" x2="90" y2="100" class="m" stroke-dasharray="4 4"/>
  <line x1="130" y1="87" x2="130" y2="160" class="m" stroke-dasharray="4 4"/>
  <line x1="90" y1="30" x2="130" y2="87" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" opacity=".7"/>
  <line x1="130" y1="87" x2="142" y2="156" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" opacity=".7"/>
  <circle cx="142" cy="156" r="8" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 2"/>
  <line x1="90" y1="30" x2="130" y2="87" stroke="currentColor" stroke-width="2"/>
  <line x1="130" y1="87" x2="106" y2="153" stroke="currentColor" stroke-width="2"/>
  <circle cx="90" cy="30" r="3" fill="currentColor"/>
  <circle cx="130" cy="87" r="9" fill="#3b82f6"/>
  <circle cx="106" cy="153" r="9" fill="#3b82f6"/>
  <path d="M90 60 A30 30 0 0 0 107 54" class="m"/>
  <text x="96" y="76">θ1</text>
  <path d="M130 120 A33 33 0 0 1 118 118" class="m"/>
  <text x="108" y="132">θ2</text>
  <text x="120" y="52" fill="#3b82f6">L1, m1</text>
  <text x="60" y="176" fill="#3b82f6">L2, m2</text>
  <text x="150" y="174" fill="#ef4444">${L('ghost', 'bayangan')}</text>
  <text x="18" y="214">${L('deterministic equations', 'persamaan deterministik')}</text>
  <text x="18" y="230">${L('no randomness anywhere', 'tanpa unsur acak')}</text>
  <line x1="205" y1="200" x2="345" y2="200" class="m"/>
  <line x1="205" y1="200" x2="205" y2="60" class="m"/>
  <polyline points="${curve()}" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="290" y="216">${L('time', 'waktu')}</text>
  <text x="210" y="56">${L('separation', 'jarak pisah')}</text>
  <text x="212" y="190" fill="#10b981">${L('nearly identical', 'hampir sama')}</text>
  <text x="244" y="110" fill="#ef4444">${L('doubles every', 'dua kali lipat')}</text>
  <text x="244" y="124" fill="#ef4444">${L('fixed interval', 'tiap selang tetap')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The double pendulum obeys exact deterministic equations; its future is fully fixed by four numbers at the start.',
        'For large swings the motion is chaotic: a tiny change in the start grows exponentially until the two motions are unrelated.',
        'Chaos is not randomness: run the same exact start twice and you get the same motion twice.',
        'Small swings are regular, because the equations are nearly linear there; chaos needs the nonlinear coupling between the two rods.',
        'Energy is conserved throughout, so chaos does not break any law of physics; it only destroys long-term predictability.',
      ],
      id: [
        'Bandul ganda mematuhi persamaan deterministik yang eksak; masa depannya sepenuhnya ditentukan oleh empat bilangan di awal.',
        'Untuk ayunan besar geraknya kacau: perubahan kecil di awal tumbuh secara eksponensial sampai kedua gerak tidak lagi berkaitan.',
        'Kekacauan bukan keacakan: jalankan keadaan awal yang tepat sama dua kali, hasilnya gerak yang sama dua kali.',
        'Ayunan kecil bersifat teratur, karena persamaannya hampir linear di sana; kekacauan membutuhkan kopling tak linear antara kedua batang.',
        'Energi kekal sepanjang gerak, sehingga kekacauan tidak melanggar hukum fisika mana pun; ia hanya menghancurkan kemampuan prediksi jangka panjang.',
      ],
    },
    vocabulary: {
      en: [
        ['Chaos', 'Deterministic motion that is so sensitive to its starting conditions that it cannot be predicted far ahead.'],
        ['Deterministic', 'Governed by rules that fix the future completely once the present state is known.'],
        ['Initial conditions', 'The starting values of all the state variables, here two angles and two angular velocities.'],
        ['Sensitive dependence', 'The property that tiny differences in the start grow exponentially with time; popularly, the butterfly effect.'],
        ['Degrees of freedom', 'The number of independent coordinates needed to describe the system; two angles for the double pendulum.'],
        ['Nonlinear', 'An equation in which doubling the input does not double the output; here the sin and cos of the angles.'],
        ['Normal mode', 'A pattern of small oscillation in which every part moves at the same frequency; the double pendulum has two.'],
        ['Predictability horizon', 'The time after which an initial error has grown so much that a forecast is useless.'],
      ],
      id: [
        ['Kekacauan (chaos)', 'Gerak deterministik yang begitu peka terhadap keadaan awalnya sehingga tidak dapat diprediksi jauh ke depan.'],
        ['Deterministik', 'Diatur oleh aturan yang menentukan masa depan sepenuhnya begitu keadaan sekarang diketahui.'],
        ['Kondisi awal', 'Nilai awal semua variabel keadaan, di sini dua sudut dan dua kecepatan sudut.'],
        ['Kepekaan terhadap kondisi awal', 'Sifat bahwa perbedaan kecil di awal tumbuh secara eksponensial terhadap waktu; populer disebut efek kupu-kupu.'],
        ['Derajat kebebasan', 'Jumlah koordinat bebas yang diperlukan untuk menggambarkan sistem; dua sudut untuk bandul ganda.'],
        ['Tak linear', 'Persamaan yang jika masukannya digandakan, keluarannya tidak ikut menggandakan; di sini sin dan cos sudut.'],
        ['Moda normal', 'Pola getaran kecil ketika setiap bagian bergerak dengan frekuensi yang sama; bandul ganda memiliki dua moda.'],
        ['Batas prediktabilitas', 'Waktu setelah galat awal tumbuh begitu besar sehingga ramalan tidak lagi berguna.'],
      ],
    },
    misconceptions: {
      en: [
        ['Chaotic means random.', 'The equations contain no randomness at all. The same starting state always produces exactly the same motion; what is lost is predictability from an imperfectly known start, not determinism.'],
        ['A faster computer or more decimal places would let us predict the motion indefinitely.', 'Each extra digit of precision buys only a fixed extra stretch of time, because errors grow exponentially. Doubling the precision roughly doubles the prediction horizon; it never removes the limit.'],
        ['Chaos needs a complicated system with many parts.', 'Two rigid rods and two point masses are enough. What matters is nonlinearity and at least two coupled degrees of freedom, not complexity.'],
        ['The wild motion means energy is being created or lost.', 'The sim conserves total energy exactly (apart from tiny numerical error). The bobs trade kinetic and potential energy with each other in an irregular way, but the sum is constant.'],
      ],
      id: [
        ['Kacau berarti acak.', 'Persamaannya sama sekali tidak mengandung keacakan. Keadaan awal yang sama selalu menghasilkan gerak yang tepat sama; yang hilang adalah kemampuan prediksi dari keadaan awal yang tidak diketahui sempurna, bukan determinismenya.'],
        ['Komputer yang lebih cepat atau lebih banyak angka desimal memungkinkan prediksi gerak tanpa batas.', 'Setiap tambahan digit ketelitian hanya membeli tambahan waktu yang tetap, karena galat tumbuh secara eksponensial. Menggandakan ketelitian kira-kira menggandakan batas prediksi; tidak pernah menghapus batasnya.'],
        ['Kekacauan membutuhkan sistem rumit dengan banyak bagian.', 'Dua batang kaku dan dua massa titik sudah cukup. Yang penting adalah ketaklinearan dan setidaknya dua derajat kebebasan yang saling berkopling, bukan kerumitan.'],
        ['Gerak liar itu berarti energi diciptakan atau hilang.', 'Simulasi mengekalkan energi total secara tepat (selain galat numerik kecil). Kedua bola saling menukar energi kinetik dan potensial secara tak teratur, tetapi jumlahnya tetap.'],
      ],
    },
    realWorld: {
      en: [
        'Weather forecasts lose reliability after about a week for the same reason the ghost pendulum diverges: the atmosphere is chaotic and the initial state is never known perfectly.',
        'The orbits of asteroids and the long-term positions of the planets are chaotic over millions of years, which limits how far ahead astronomers can compute them exactly.',
        'Turbulent flow in rivers, smoke plumes, and the mixing of cream in coffee are everyday examples of sensitive dependence on initial conditions.',
        'Heart rhythms, animal populations, and some electronic circuits show chaotic behaviour that is studied with the same mathematics as the double pendulum.',
      ],
      id: [
        'Ramalan cuaca kehilangan keandalannya setelah sekitar satu minggu karena alasan yang sama dengan menyimpangnya bandul bayangan: atmosfer bersifat kacau dan keadaan awalnya tidak pernah diketahui sempurna.',
        'Orbit asteroid dan posisi jangka panjang planet-planet bersifat kacau dalam skala jutaan tahun, yang membatasi seberapa jauh ke depan astronom dapat menghitungnya secara tepat.',
        'Aliran turbulen di sungai, kepulan asap, dan bercampurnya krim dalam kopi adalah contoh sehari-hari dari kepekaan terhadap kondisi awal.',
        'Irama jantung, populasi hewan, dan beberapa rangkaian elektronik menunjukkan perilaku kacau yang dipelajari dengan matematika yang sama seperti bandul ganda.',
      ],
    },
    questions: {
      en: [
        { q: 'With the ghost switched on, the separation readout stays near zero for several seconds and then shoots up. Why the delay, and why the sudden growth?', a: 'The initial difference is only 0.00001 radians, so even after doubling several times it is still invisible. Exponential growth is slow in absolute terms at first and then becomes dramatic: after about 17 doublings a difference of 0.00001 has become about 1 radian, so the bobs are suddenly in completely different places.' },
        { q: 'Drag both bobs so they hang nearly straight down and release them. Is the motion chaotic? Explain.', a: 'No, it is regular. For small angles sin θ ≈ θ and the equations become linear, so the motion is a combination of two normal modes with fixed frequencies. The ghost stays with the real pendulum and the trail repeats. Chaos appears only when the swings are large enough for the nonlinear terms to matter.' },
        { q: 'Suppose the separation between two nearly identical double pendulums doubles every 0.5 s. If they start 0.00001 rad apart, roughly how long until they differ by about 1 rad?', a: 'Going from 0.00001 to 1 is a factor of 100 000, which is about 2 to the power 17 (2^17 ≈ 131 000). Seventeen doublings at 0.5 s each take about 8.5 s. Measuring the start a thousand times more precisely would add only about 10 more doublings, roughly 5 s.' },
      ],
      id: [
        { q: 'Dengan bayangan aktif, tampilan jarak pisah tetap dekat nol selama beberapa sekon lalu melonjak. Mengapa ada penundaan, dan mengapa pertumbuhannya mendadak?', a: 'Perbedaan awalnya hanya 0,00001 radian, sehingga setelah menggandakan diri beberapa kali pun masih tak terlihat. Pertumbuhan eksponensial awalnya lambat secara mutlak lalu menjadi dramatis: setelah sekitar 17 kali penggandaan, perbedaan 0,00001 menjadi sekitar 1 radian, sehingga kedua bola tiba-tiba berada di tempat yang sama sekali berbeda.' },
        { q: 'Seret kedua bola agar hampir lurus ke bawah lalu lepaskan. Apakah geraknya kacau? Jelaskan.', a: 'Tidak, geraknya teratur. Untuk sudut kecil sin θ ≈ θ dan persamaannya menjadi linear, sehingga geraknya adalah gabungan dua moda normal dengan frekuensi tetap. Bayangan tetap menempel pada bandul asli dan jejaknya berulang. Kekacauan hanya muncul ketika ayunan cukup besar sehingga suku tak linear berpengaruh.' },
        { q: 'Misalkan jarak pisah antara dua bandul ganda yang hampir sama menggandakan diri setiap 0,5 s. Jika awalnya berbeda 0,00001 rad, kira-kira berapa lama sampai keduanya berbeda sekitar 1 rad?', a: 'Dari 0,00001 ke 1 adalah faktor 100.000, yaitu sekitar 2 pangkat 17 (2^17 ≈ 131.000). Tujuh belas kali penggandaan dengan 0,5 s tiap kali memakan waktu sekitar 8,5 s. Mengukur keadaan awal seribu kali lebih teliti hanya menambah sekitar 10 penggandaan lagi, kira-kira 5 s.' },
      ],
    },
  },
};
