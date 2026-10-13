// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect R₀ to whether an epidemic spreads or fizzles.',
      'Read the SIR curves: when does the peak happen?',
      'See how vaccination reduces peak and total infections.',
    ],
    id: [
      'Mengaitkan R₀ dengan apakah wabah menyebar atau mereda.',
      'Membaca kurva SIR: kapan puncaknya?',
      'Melihat vaksinasi menurunkan puncak dan total kasus.',
    ],
  },
  tryThis: {
    en: [
      'Set R₀ = 1 — does the epidemic still spread?',
      'Vaccinate 60% before start — what happens to the peak?',
      'Drop R₀ to 0.8 mid-outbreak — when does it stop spreading?',
    ],
    id: [
      'Atur R₀ = 1 — apakah wabah tetap menyebar?',
      'Vaksinasi 60% sebelum mulai — bagaimana puncaknya?',
      'Turunkan R₀ ke 0,8 di tengah wabah — kapan penyebaran berhenti?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The SIR model, introduced by Kermack and McKendrick in 1927, sorts a population into three compartments: Susceptible people who can catch the disease, Infected people who have it and can pass it on, and Recovered people who are immune. The sim tracks each group as a fraction of a closed population, so S + I + R = 1 at all times. New infections happen when susceptible and infected people meet, at a rate proportional to the product S × I with a contact coefficient β. Infected people recover at a rate γ, which is 1 divided by the average infectious period in days. In symbols: dS/dt = −βSI, dI/dt = βSI − γI and dR/dt = γI. The sim steps these equations forward in small time increments and draws the three curves.',
        'The key number is R₀ = β/γ, the average number of people one infected person infects when everyone around them is susceptible. The sim takes R₀ and the recovery time from the sliders and sets β = R₀ divided by the recovery time. As the outbreak proceeds, each infected person meets fewer susceptible people, so the effective reproduction number is R₀ × S. Infections grow while R₀ × S is greater than 1 and shrink once S falls below 1/R₀. That gives the peak a precise meaning: the infected curve tops out exactly when the susceptible fraction reaches 1/R₀, which for R₀ = 2.5 is 40%. The epidemic then fades, not because everyone has been infected, but because infected people can no longer find enough susceptible ones. Infections continue past the peak, however, so the final total overshoots: for R₀ = 2.5 about 89% of an unvaccinated population is eventually infected, which solves 1 − R = exp(−R₀ × R).',
        'The R₀ slider acts immediately, so lowering it mid-outbreak mimics distancing or masks and raising it mimics reopening. The recovery-time slider changes γ; at a fixed R₀ a longer infectious period simply stretches the same curves over more days, leaving the peak height and the final total unchanged. The pre-vaccinated slider moves that share of the population straight into R before the first case and restarts the run. Because the outbreak can only grow if R₀ × S is greater than 1, vaccinating a fraction of at least 1 − 1/R₀, the herd-immunity threshold, prevents it from taking off at all; for R₀ = 2.5 that is 60%, for R₀ = 4 it is 75%. The presets load illustrative values of R₀ and recovery time for three diseases, and the readout reports the peak infected share and the final R, which includes the vaccinated.',
        'The model is deliberately simple. It assumes everyone mixes equally with everyone else, with no households, schools, cities or super-spreaders; no one is born, dies or travels in; immunity is permanent; and there is no latent period between infection and becoming infectious, which the SEIR extension adds. The populations are continuous fractions, so an outbreak seeded with 0.1% can never die out by chance the way a real one with a handful of cases might. Behaviour never changes unless you move a slider. These omissions matter for forecasting real epidemics, but the qualitative lessons, the role of R₀, the peak at S = 1/R₀ and the herd-immunity threshold, carry over to far more detailed models.',
      ],
      id: [
        'Model SIR, yang diperkenalkan Kermack dan McKendrick pada 1927, memilah populasi ke dalam tiga kompartemen: Susceptible, yaitu orang rentan yang bisa tertular; Infected, yaitu orang yang terinfeksi dan bisa menularkan; dan Recovered, yaitu orang yang sudah sembuh dan kebal. Simulasi melacak tiap kelompok sebagai pecahan dari populasi tertutup, sehingga S + I + R = 1 setiap saat. Infeksi baru terjadi ketika orang rentan dan orang terinfeksi bertemu, dengan laju yang sebanding dengan hasil kali S × I dikalikan koefisien kontak β. Orang yang terinfeksi sembuh dengan laju γ, yaitu 1 dibagi rata-rata masa menular dalam hari. Dalam lambang: dS/dt = −βSI, dI/dt = βSI − γI dan dR/dt = γI. Simulasi melangkahkan persamaan ini dalam pertambahan waktu kecil dan menggambar ketiga kurvanya.',
        'Angka kuncinya adalah R₀ = β/γ, rata-rata jumlah orang yang ditulari satu orang terinfeksi ketika semua orang di sekitarnya masih rentan. Simulasi mengambil R₀ dan waktu pemulihan dari slider lalu menetapkan β = R₀ dibagi waktu pemulihan. Seiring wabah berjalan, tiap orang terinfeksi bertemu lebih sedikit orang rentan, sehingga bilangan reproduksi efektifnya adalah R₀ × S. Infeksi bertambah selama R₀ × S lebih besar dari 1 dan menyusut begitu S turun di bawah 1/R₀. Itu memberi puncak makna yang tepat: kurva terinfeksi mencapai puncak tepat ketika pecahan rentan mencapai 1/R₀, yang untuk R₀ = 2,5 adalah 40%. Wabah kemudian meredup, bukan karena semua orang sudah tertular, melainkan karena orang terinfeksi tidak lagi menemukan cukup orang rentan. Namun infeksi berlanjut melewati puncak, sehingga total akhirnya melampaui ambang itu: untuk R₀ = 2,5 sekitar 89% populasi yang tidak divaksin akhirnya tertular, yang merupakan penyelesaian dari 1 − R = exp(−R₀ × R).',
        'Slider R₀ bekerja seketika, jadi menurunkannya di tengah wabah meniru pembatasan jarak atau masker dan menaikkannya meniru pembukaan kembali. Slider waktu pemulihan mengubah γ; pada R₀ yang tetap, masa menular yang lebih panjang hanya merentangkan kurva yang sama pada lebih banyak hari, dengan tinggi puncak dan total akhir yang tidak berubah. Slider pra-vaksinasi memindahkan bagian populasi itu langsung ke R sebelum kasus pertama dan memulai ulang simulasi. Karena wabah hanya bisa tumbuh jika R₀ × S lebih besar dari 1, memvaksinasi paling sedikit 1 − 1/R₀ dari populasi, yaitu ambang kekebalan kelompok, mencegahnya meledak sama sekali; untuk R₀ = 2,5 itu 60%, untuk R₀ = 4 itu 75%. Tombol preset memuat nilai ilustratif R₀ dan waktu pemulihan untuk tiga penyakit, dan tampilan melaporkan bagian terinfeksi puncak serta R akhir, yang sudah termasuk yang divaksin.',
        'Model ini sengaja dibuat sederhana. Ia mengasumsikan semua orang bercampur merata dengan semua orang lain, tanpa rumah tangga, sekolah, kota, atau penular super; tidak ada yang lahir, mati, atau datang dari luar; kekebalan bersifat permanen; dan tidak ada masa laten antara tertular dan mulai menular, yang ditambahkan oleh perluasan SEIR. Populasinya berupa pecahan kontinu, sehingga wabah yang dimulai dengan 0,1% tidak pernah bisa padam karena kebetulan seperti wabah nyata dengan segelintir kasus. Perilaku tidak pernah berubah kecuali kamu menggeser slider. Hal-hal yang diabaikan ini penting untuk meramalkan wabah sungguhan, tetapi pelajaran kualitatifnya, yaitu peran R₀, puncak pada S = 1/R₀, dan ambang kekebalan kelompok, tetap berlaku pada model yang jauh lebih rinci.',
      ],
    },
    figure: {
      caption: {
        en: 'SIR curves for R₀ = 2.5 and a 7-day infectious period, starting from 0.1% infected. The infected curve peaks exactly when the susceptible share falls to 1/R₀ = 40%; infections then decline but continue, so the final recovered share reaches about 89%.',
        id: 'Kurva SIR untuk R₀ = 2,5 dan masa menular 7 hari, dimulai dari 0,1% terinfeksi. Kurva terinfeksi memuncak tepat ketika bagian rentan turun ke 1/R₀ = 40%; infeksi kemudian menurun tetapi berlanjut, sehingga bagian sembuh akhir mencapai sekitar 89%.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const R0 = 2.5, g = 1 / 7, b = R0 * g, T = 100, h = 0.1, r = (v) => Math.round(v * 10) / 10;
        const f = ([S, I]) => [-b * S * I, b * S * I - g * I];
        let s = [0.999, 0.001]; const pts = [];
        for (let t = 0, i = 0; t <= T + 1e-9; t += h, i++) {
          if (i % 5 === 0) pts.push([t, s[0], s[1], 1 - s[0] - s[1]]);
          const k1 = f(s), s2 = s.map((v, j) => v + h / 2 * k1[j]), k2 = f(s2), s3 = s.map((v, j) => v + h / 2 * k2[j]), k3 = f(s3), s4 = s.map((v, j) => v + h * k3[j]), k4 = f(s4);
          s = s.map((v, j) => v + h / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
        }
        const X = (t) => r(30 + (t / T) * 300), Y = (v) => r(200 - v * 160);
        const path = (k) => pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0])} ${Y(p[k])}`).join(' ');
        const pk = pts.reduce((m, p) => (p[2] > m[2] ? p : m));
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('SIR epidemic curves with the peak marked', 'Kurva epidemi SIR dengan puncak ditandai')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.s{font-size:10px;opacity:.8}</style>
  <line x1="30" y1="200" x2="330" y2="200" class="m"/>
  <line x1="30" y1="40" x2="30" y2="200" class="m"/>
  <text x="330" y="214" text-anchor="end" class="s">${L('days', 'hari')}</text>
  <text x="26" y="44" text-anchor="end" class="s">100%</text>
  <text x="26" y="204" text-anchor="end" class="s">0%</text>
  <line x1="30" y1="${Y(1 / R0)}" x2="${X(pk[0])}" y2="${Y(1 / R0)}" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="26" y="${Y(1 / R0) + 4}" text-anchor="end" class="s" fill="#3b82f6">40%</text>
  <path d="${path(1)}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <path d="${path(2)}" fill="none" stroke="#ef4444" stroke-width="2.5"/>
  <path d="${path(3)}" fill="none" stroke="#10b981" stroke-width="2.5"/>
  <line x1="${X(pk[0])}" y1="${Y(pk[2])}" x2="${X(pk[0])}" y2="${Y(1 / R0)}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3"/>
  <circle cx="${X(pk[0])}" cy="${Y(pk[2])}" r="4" fill="#f59e0b"/>
  <circle cx="${X(pk[0])}" cy="${Y(1 / R0)}" r="4" fill="#f59e0b"/>
  <text x="${X(pk[0]) + 8}" y="${Y(pk[2]) + 4}" class="s" fill="#f59e0b">${L('peak: I ≈ 23%', 'puncak: I ≈ 23%')}</text>
  <text x="${X(pk[0]) + 8}" y="${Y(1 / R0) + 14}" class="s" fill="#f59e0b">S = 1/R₀ = 40%</text>
  <text x="326" y="${Y(pts[pts.length - 1][3]) - 6}" text-anchor="end" class="s" fill="#10b981">${L('final R ≈ 89%', 'R akhir ≈ 89%')}</text>
  <text x="326" y="${Y(pts[pts.length - 1][1]) - 6}" text-anchor="end" class="s" fill="#3b82f6">${L('S never reaches 0', 'S tidak pernah mencapai 0')}</text>
  <text x="36" y="226" class="s" fill="#3b82f6">S ${L('susceptible', 'rentan')}</text>
  <text x="126" y="226" class="s" fill="#ef4444">I ${L('infected', 'terinfeksi')}</text>
  <text x="206" y="226" class="s" fill="#10b981">R ${L('recovered', 'sembuh')}</text>
  <text x="330" y="226" text-anchor="end" class="s">${L('R₀ = 2.5, γ = 1/7', 'R₀ = 2,5, γ = 1/7')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'R₀ = β/γ is the number of people one case infects in a fully susceptible population; an outbreak grows only if R₀ is greater than 1.',
        'The effective reproduction number is R₀ × S, so the infected curve peaks exactly when the susceptible share falls to 1/R₀.',
        'The epidemic ends because susceptible people become scarce, not because everyone was infected; the final total still overshoots 1 − 1/R₀.',
        'Vaccinating at least 1 − 1/R₀ of the population before an outbreak keeps R₀ × S below 1, so the disease cannot spread: the herd-immunity threshold.',
        'Changing the recovery time at fixed R₀ stretches or compresses the curves in time without changing the peak share or the final total.',
      ],
      id: [
        'R₀ = β/γ adalah jumlah orang yang ditulari satu kasus dalam populasi yang seluruhnya rentan; wabah hanya tumbuh jika R₀ lebih besar dari 1.',
        'Bilangan reproduksi efektif adalah R₀ × S, sehingga kurva terinfeksi memuncak tepat ketika bagian rentan turun ke 1/R₀.',
        'Wabah berakhir karena orang rentan menjadi langka, bukan karena semua orang tertular; total akhirnya tetap melampaui 1 − 1/R₀.',
        'Memvaksinasi paling sedikit 1 − 1/R₀ dari populasi sebelum wabah menjaga R₀ × S di bawah 1, sehingga penyakit tidak bisa menyebar: ambang kekebalan kelompok.',
        'Mengubah waktu pemulihan pada R₀ tetap merentangkan atau memampatkan kurva dalam waktu tanpa mengubah bagian puncak atau total akhir.',
      ],
    },
    vocabulary: {
      en: [
        ['Susceptible (S)', 'The share of the population that can still catch the disease.'],
        ['Infected (I)', 'The share currently infected and able to transmit.'],
        ['Recovered (R)', 'The share that is immune, whether through recovery or, in the sim, vaccination.'],
        ['Basic reproduction number R₀', 'The average number of new infections caused by one case when everyone else is susceptible; equal to β/γ.'],
        ['Effective reproduction number', 'The actual number of new infections per case at a given moment; in the SIR model it equals R₀ × S.'],
        ['Herd-immunity threshold', 'The immune fraction, 1 − 1/R₀, above which each case causes fewer than one new case and an outbreak cannot grow.'],
        ['Final size (attack rate)', 'The total fraction of the population infected by the end of the epidemic.'],
        ['Compartment model', 'A model that divides a population into groups and tracks flows between them with rate equations.'],
      ],
      id: [
        ['Rentan (S)', 'Bagian populasi yang masih bisa tertular penyakit.'],
        ['Terinfeksi (I)', 'Bagian yang saat ini terinfeksi dan bisa menularkan.'],
        ['Sembuh (R)', 'Bagian yang kebal, baik karena sembuh maupun, dalam simulasi, karena divaksin.'],
        ['Bilangan reproduksi dasar R₀', 'Rata-rata jumlah infeksi baru yang ditimbulkan satu kasus ketika semua orang lain rentan; sama dengan β/γ.'],
        ['Bilangan reproduksi efektif', 'Jumlah infeksi baru per kasus yang sesungguhnya pada suatu saat; dalam model SIR sama dengan R₀ × S.'],
        ['Ambang kekebalan kelompok', 'Pecahan kebal, 1 − 1/R₀, yang jika dilampaui membuat tiap kasus menimbulkan kurang dari satu kasus baru sehingga wabah tidak bisa tumbuh.'],
        ['Ukuran akhir (laju serangan)', 'Total pecahan populasi yang tertular sampai wabah berakhir.'],
        ['Model kompartemen', 'Model yang membagi populasi ke dalam kelompok-kelompok dan melacak aliran di antaranya dengan persamaan laju.'],
      ],
    },
    misconceptions: {
      en: [
        ['The epidemic stops when everyone has been infected.', 'It stops when the susceptible share drops below 1/R₀, because each case then causes fewer than one new case. For R₀ = 2.5 about 11% of people are never infected, and the S curve in the sim never reaches zero.'],
        ['Herd immunity means nobody gets sick any more.', 'It means an outbreak can no longer grow. Individual cases and small clusters still occur; what changes is that each one dies out instead of spreading. Below the threshold, the unvaccinated are protected only partly.'],
        ['Vaccinating 60% of the population with R₀ = 2.5 cuts the cases by 60%.', 'It cuts them almost entirely. 60% is the herd-immunity threshold for R₀ = 2.5, so R₀ × S starts at 1 and the infected curve never rises. The effect of vaccination is strongly non-linear.'],
        ['A disease with R₀ just above 1, such as 1.1, is harmless.', 'It spreads slowly but it does spread, and over a long period can still infect a sizeable share of the population; for R₀ = 1.1 the final size in the SIR model is about 18%. What R₀ near 1 does guarantee is that modest measures can push it below 1.'],
      ],
      id: [
        ['Wabah berhenti ketika semua orang sudah tertular.', 'Wabah berhenti ketika bagian rentan turun di bawah 1/R₀, karena tiap kasus lalu menimbulkan kurang dari satu kasus baru. Untuk R₀ = 2,5 sekitar 11% orang tidak pernah tertular, dan kurva S dalam simulasi tidak pernah mencapai nol.'],
        ['Kekebalan kelompok berarti tidak ada lagi yang sakit.', 'Artinya wabah tidak lagi bisa tumbuh. Kasus perorangan dan gerombolan kecil tetap terjadi; yang berubah, masing-masing padam alih-alih menyebar. Di bawah ambang, yang tidak divaksin hanya terlindungi sebagian.'],
        ['Memvaksinasi 60% populasi dengan R₀ = 2,5 memangkas kasus sebesar 60%.', 'Ia memangkasnya hampir seluruhnya. 60% adalah ambang kekebalan kelompok untuk R₀ = 2,5, sehingga R₀ × S dimulai pada 1 dan kurva terinfeksi tidak pernah naik. Pengaruh vaksinasi sangat tidak linear.'],
        ['Penyakit dengan R₀ sedikit di atas 1, misalnya 1,1, tidak berbahaya.', 'Ia menyebar perlahan tetapi tetap menyebar, dan dalam waktu lama masih bisa menulari bagian populasi yang cukup besar; untuk R₀ = 1,1 ukuran akhir dalam model SIR sekitar 18%. Yang dijamin R₀ dekat 1 hanyalah bahwa langkah-langkah sederhana bisa menekannya ke bawah 1.'],
      ],
    },
    realWorld: {
      en: [
        'Measles has an R₀ of roughly 12 to 18, which is why health agencies aim for about 95% vaccination coverage to stop outbreaks.',
        'During COVID-19, public dashboards reported the effective reproduction number daily; values above 1 meant growth, below 1 decline, exactly as in the model.',
        'Public-health campaigns to "flatten the curve" are about lowering the peak of the I curve so hospitals are not overwhelmed, even if the total number of cases changes less.',
        'The same equations are used for the spread of rumours on social networks and of computer viruses, with "recovery" meaning losing interest or installing a patch.',
      ],
      id: [
        'Campak punya R₀ kira-kira 12 sampai 18, itulah sebabnya badan kesehatan menargetkan cakupan vaksinasi sekitar 95% untuk menghentikan wabah.',
        'Selama COVID-19, dasbor publik melaporkan bilangan reproduksi efektif setiap hari; nilai di atas 1 berarti pertumbuhan, di bawah 1 berarti penurunan, tepat seperti dalam model.',
        'Kampanye kesehatan masyarakat untuk "meratakan kurva" bertujuan menurunkan puncak kurva I agar rumah sakit tidak kewalahan, meskipun jumlah total kasus berubah lebih sedikit.',
        'Persamaan yang sama dipakai untuk penyebaran rumor di jejaring sosial dan virus komputer, dengan "sembuh" berarti hilang minat atau memasang tambalan keamanan.',
      ],
    },
    questions: {
      en: [
        { q: 'A disease has R₀ = 4. What fraction of the population must be immune before an outbreak to stop it from growing? Check it in the sim.', a: '1 − 1/R₀ = 1 − 0.25 = 0.75, so 75%. Set R₀ = 4 and pre-vaccinated to 75% or more and press Reset: the infected curve never rises. At 70% it still produces a small outbreak, because R₀ × S = 4 × 0.3 = 1.2 is above 1.' },
        { q: 'With R₀ = 2.5 and no vaccination, at what susceptible share does the infected curve peak, and how many people have been infected by then? Why is the final total larger?', a: 'The peak comes when S = 1/R₀ = 40%, so 60% of the population has already been infected (they are now in I or R). After the peak each case causes fewer than one new case, but cases do not stop instantly, so infections keep accumulating and the final total is about 89%.' },
        { q: 'Keep R₀ = 2.5 but change the recovery time from 7 days to 14 days. What changes in the curves, and what stays the same?', a: 'The sim halves both γ and β to keep R₀ = 2.5, so the whole outbreak runs at half speed: the peak arrives roughly twice as many days later. The peak share of infected (about 23%) and the final total (about 89%) are unchanged, because the shape of an SIR epidemic depends only on R₀; the infectious period only sets the time scale.' },
      ],
      id: [
        { q: 'Suatu penyakit punya R₀ = 4. Berapa bagian populasi yang harus kebal sebelum wabah agar wabah tidak tumbuh? Periksa di simulasi.', a: '1 − 1/R₀ = 1 − 0,25 = 0,75, jadi 75%. Atur R₀ = 4 dan pra-vaksinasi 75% atau lebih lalu tekan Reset: kurva terinfeksi tidak pernah naik. Pada 70% masih muncul wabah kecil, karena R₀ × S = 4 × 0,3 = 1,2 berada di atas 1.' },
        { q: 'Dengan R₀ = 2,5 dan tanpa vaksinasi, pada bagian rentan berapa kurva terinfeksi memuncak, dan berapa orang yang sudah tertular saat itu? Mengapa total akhirnya lebih besar?', a: 'Puncak terjadi ketika S = 1/R₀ = 40%, jadi 60% populasi sudah tertular (mereka kini berada di I atau R). Setelah puncak tiap kasus menimbulkan kurang dari satu kasus baru, tetapi kasus tidak berhenti seketika, sehingga infeksi terus bertambah dan total akhirnya sekitar 89%.' },
        { q: 'Pertahankan R₀ = 2,5 tetapi ubah waktu pemulihan dari 7 hari menjadi 14 hari. Apa yang berubah pada kurva, dan apa yang tetap?', a: 'Simulasi membagi dua γ dan β sekaligus agar R₀ tetap 2,5, sehingga seluruh wabah berjalan dengan separuh kecepatan: puncaknya datang sekitar dua kali lebih lama. Bagian puncak terinfeksi (sekitar 23%) dan total akhir (sekitar 89%) tidak berubah, karena bentuk wabah SIR hanya bergantung pada R₀; masa menular hanya menentukan skala waktunya.' },
      ],
    },
  },
};
