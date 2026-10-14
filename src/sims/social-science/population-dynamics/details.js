// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read coupled ODE behavior from a phase plot.',
      'Predict the effect of each parameter on cycle period and amplitude.',
      'Recognize stable, oscillating, and collapsing regimes.',
    ],
    id: [
      'Membaca perilaku ODE berpasangan dari grafik fase.',
      'Memprediksi pengaruh tiap parameter terhadap periode dan amplitudo siklus.',
      'Mengenali rezim stabil, berosilasi, dan runtuh.',
    ],
  },
  tryThis: {
    en: [
      'Set predation rate to zero — what happens to prey?',
      'Crank predation up — does the system still oscillate?',
      'Find a parameter set where both populations stabilize.',
    ],
    id: [
      'Atur laju pemangsaan ke nol — apa yang terjadi pada mangsa?',
      'Naikkan laju pemangsaan tinggi — apakah sistem masih berosilasi?',
      'Cari kombinasi parameter di mana kedua populasi stabil.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The Lotka-Volterra model, written down independently by Alfred Lotka and Vito Volterra in the 1920s, is the simplest description of a predator population y feeding on a prey population x. Prey breed at a per-capita rate α, so without predators they grow exponentially. Predators meet prey in proportion to the product x·y, and each meeting removes prey at rate β and feeds predator growth at rate δ. Predators without food die at rate γ. In symbols: dx/dt = αx − βxy and dy/dt = δxy − γy. The sim advances these two equations in small time steps and plots the populations against time on the left and against each other, the phase plot, on the right.',
        'The equations produce cycles. Plenty of prey lets predators multiply; many predators eat the prey down; starving predators die off; with few predators left the prey recover and the loop repeats. The predator peak always comes after the prey peak, by about a quarter of a cycle: when prey are at their maximum the predators are still growing, and they only start to decline once the prey have fallen below the level that can feed them. On the phase plot each cycle is a closed loop travelling anticlockwise around a fixed point, the equilibrium, where both populations would stay constant. Setting both rates of change to zero gives x* = γ/δ prey and y* = α/β predators; with the default values that is 3 prey and 2.5 predators. Note the twist: the equilibrium number of prey depends only on the predator parameters, and vice versa. Small loops near the equilibrium take about 2π/√(αγ) time units per cycle, about 8.1 for the defaults.',
        'Each slider acts immediately. Raising α makes prey breed faster, which raises the predator equilibrium y* = α/β, not the prey equilibrium. Raising the predation rate β lowers y* and makes the cycles sharper. Raising δ, the efficiency with which eaten prey turn into new predators, lowers x* = γ/δ: efficient predators keep prey scarce. Raising γ, the predator death rate, raises x*; if predators die faster than they can eat, they collapse and the prey, with nothing to stop them, grow exponentially. Reset restarts from 10 prey and 5 predators. Because the equilibrium is only neutrally stable, the size of the loop is fixed by where you start, not by the parameters: the only way to make the populations sit still is to choose parameters whose equilibrium is exactly the starting point.',
        'The model leaves out a great deal. Prey have no carrying capacity, so with β = 0 they grow without limit; predators never get full, never compete with each other and never switch to other food. Populations are continuous numbers, so 0.01 predators can still recover, which is impossible in reality; and there is no randomness, weather or seasons. In the sim β and δ are independent sliders, so with β = 0 predators still grow from prey they are not eating; in a consistent model δ would be a fraction of β. Finally, the sim steps forward numerically with a fourth-order Runge–Kutta method, which keeps the loops closed to very high accuracy; the exact equations trace perfectly closed loops, so any tiny drift you might see after a very long run is a numerical artefact, not biology.',
      ],
      id: [
        'Model Lotka-Volterra, yang dirumuskan secara terpisah oleh Alfred Lotka dan Vito Volterra pada 1920-an, adalah gambaran paling sederhana tentang populasi pemangsa y yang memakan populasi mangsa x. Mangsa berkembang biak dengan laju per kapita α, sehingga tanpa pemangsa mereka tumbuh secara eksponensial. Pemangsa bertemu mangsa sebanding dengan hasil kali x·y, dan setiap pertemuan mengurangi mangsa dengan laju β serta memberi makan pertumbuhan pemangsa dengan laju δ. Pemangsa tanpa makanan mati dengan laju γ. Dalam lambang: dx/dt = αx − βxy dan dy/dt = δxy − γy. Simulasi memajukan kedua persamaan ini dalam langkah waktu kecil dan menggambar populasi terhadap waktu di kiri serta satu terhadap yang lain, yaitu grafik fase, di kanan.',
        'Persamaan ini menghasilkan siklus. Mangsa yang melimpah membuat pemangsa berlipat ganda; pemangsa yang banyak memakan mangsa sampai menipis; pemangsa yang kelaparan mati; dengan sedikit pemangsa yang tersisa, mangsa pulih dan putaran berulang. Puncak pemangsa selalu datang setelah puncak mangsa, sekitar seperempat siklus kemudian: ketika mangsa berada di titik maksimum, pemangsa masih bertambah, dan mereka baru mulai menurun setelah mangsa jatuh di bawah tingkat yang bisa memberi mereka makan. Pada grafik fase, tiap siklus adalah lingkaran tertutup yang bergerak berlawanan arah jarum jam mengitari sebuah titik tetap, yaitu titik keseimbangan, tempat kedua populasi akan tetap konstan. Menyamakan kedua laju perubahan dengan nol memberi x* = γ/δ mangsa dan y* = α/β pemangsa; dengan nilai bawaan itu berarti 3 mangsa dan 2,5 pemangsa. Perhatikan kejutannya: jumlah keseimbangan mangsa hanya bergantung pada parameter pemangsa, dan sebaliknya. Lingkaran kecil di dekat keseimbangan menempuh satu siklus dalam sekitar 2π/√(αγ) satuan waktu, sekitar 8,1 untuk nilai bawaan.',
        'Setiap slider bekerja seketika. Menaikkan α membuat mangsa berkembang biak lebih cepat, yang menaikkan keseimbangan pemangsa y* = α/β, bukan keseimbangan mangsa. Menaikkan laju pemangsaan β menurunkan y* dan membuat siklus lebih tajam. Menaikkan δ, yaitu efisiensi mangsa yang dimakan menjadi pemangsa baru, menurunkan x* = γ/δ: pemangsa yang efisien membuat mangsa tetap langka. Menaikkan γ, laju kematian pemangsa, menaikkan x*; jika pemangsa mati lebih cepat daripada kemampuannya makan, mereka runtuh dan mangsa, tanpa ada yang menghentikan, tumbuh eksponensial. Reset memulai ulang dari 10 mangsa dan 5 pemangsa. Karena keseimbangannya hanya stabil netral, ukuran lingkaran ditentukan oleh titik awal, bukan oleh parameter: satu-satunya cara membuat populasi diam adalah memilih parameter yang titik keseimbangannya tepat di titik awal.',
        'Model ini mengabaikan banyak hal. Mangsa tidak punya daya dukung, sehingga dengan β = 0 mereka tumbuh tanpa batas; pemangsa tidak pernah kenyang, tidak pernah bersaing satu sama lain, dan tidak pernah beralih ke makanan lain. Populasi berupa bilangan kontinu, sehingga 0,01 pemangsa masih bisa pulih, yang mustahil dalam kenyataan; dan tidak ada keacakan, cuaca, atau musim. Dalam simulasi, β dan δ adalah slider yang saling bebas, sehingga dengan β = 0 pemangsa tetap tumbuh dari mangsa yang tidak mereka makan; dalam model yang konsisten δ seharusnya merupakan pecahan dari β. Terakhir, simulasi melangkah maju secara numerik dengan metode Runge–Kutta orde empat, yang menjaga lingkaran tetap tertutup dengan akurasi sangat tinggi; persamaan eksaknya menelusuri lingkaran yang tertutup sempurna, jadi geseran sangat kecil yang mungkin terlihat setelah berjalan sangat lama adalah artefak numerik, bukan biologi.',
      ],
    },
    figure: {
      caption: {
        en: 'Prey (green) and predators (red) with the default rates α = 1, β = 0.4, δ = 0.2, γ = 0.6, started near equilibrium. Each predator peak trails the prey peak by about a quarter cycle, and both curves swing around the equilibrium levels x* = γ/δ = 3 and y* = α/β = 2.5.',
        id: 'Mangsa (hijau) dan pemangsa (merah) dengan laju bawaan α = 1, β = 0,4, δ = 0,2, γ = 0,6, dimulai dekat keseimbangan. Tiap puncak pemangsa tertinggal sekitar seperempat siklus dari puncak mangsa, dan kedua kurva berayun di sekitar tingkat keseimbangan x* = γ/δ = 3 dan y* = α/β = 2,5.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const a = 1, b = 0.4, d = 0.2, g = 0.6, T = 16, h = 0.02, r = (v) => Math.round(v * 10) / 10;
        const f = ([x, y]) => [a * x - b * x * y, d * x * y - g * y];
        let s = [4.2, 2.5]; const pts = [];
        for (let t = 0, i = 0; t <= T + 1e-9; t += h, i++) {
          if (i % 4 === 0) pts.push([t, s[0], s[1]]);
          const k1 = f(s), s2 = s.map((v, j) => v + h / 2 * k1[j]), k2 = f(s2), s3 = s.map((v, j) => v + h / 2 * k2[j]), k3 = f(s3), s4 = s.map((v, j) => v + h * k3[j]), k4 = f(s4);
          s = s.map((v, j) => v + h / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
        }
        const vmax = 1.15 * Math.max(...pts.map((p) => Math.max(p[1], p[2]))), X = (t) => r(30 + (t / T) * 310), Y = (v) => r(200 - (v / vmax) * 160);
        const path = (k) => pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0])} ${Y(p[k])}`).join(' ');
        const peakPrey = pts.filter((p) => p[0] > 1 && p[0] < 9).reduce((m, p) => (p[1] > m[1] ? p : m));
        const peakPred = pts.filter((p) => p[0] > peakPrey[0] && p[0] < peakPrey[0] + 6).reduce((m, p) => (p[2] > m[2] ? p : m));
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Predator and prey populations cycling over time', 'Populasi pemangsa dan mangsa bersiklus sepanjang waktu')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.s{font-size:10px;opacity:.8}</style>
  <line x1="30" y1="200" x2="340" y2="200" class="m"/>
  <line x1="30" y1="30" x2="30" y2="200" class="m"/>
  <text x="340" y="214" text-anchor="end" class="s">${L('time', 'waktu')}</text>
  <text x="30" y="24" class="s">${L('population', 'populasi')}</text>
  <line x1="30" y1="${Y(3)}" x2="340" y2="${Y(3)}" stroke="#10b981" stroke-width="1" stroke-dasharray="4 3" opacity=".7"/>
  <text x="338" y="${Y(3) - 4}" text-anchor="end" class="s" fill="#10b981">x* = γ/δ = 3</text>
  <line x1="30" y1="${Y(2.5)}" x2="340" y2="${Y(2.5)}" stroke="#ef4444" stroke-width="1" stroke-dasharray="4 3" opacity=".7"/>
  <text x="338" y="${Y(2.5) + 12}" text-anchor="end" class="s" fill="#ef4444">${L('y* = α/β = 2.5', 'y* = α/β = 2,5')}</text>
  <path d="${path(1)}" fill="none" stroke="#10b981" stroke-width="2.5"/>
  <path d="${path(2)}" fill="none" stroke="#ef4444" stroke-width="2.5"/>
  <line x1="${X(peakPrey[0])}" y1="${Y(peakPrey[1])}" x2="${X(peakPrey[0])}" y2="${Y(peakPrey[1]) - 18}" class="m"/>
  <line x1="${X(peakPred[0])}" y1="${Y(peakPred[2])}" x2="${X(peakPred[0])}" y2="${Y(peakPrey[1]) - 18}" class="m"/>
  <path d="M${X(peakPrey[0])} ${Y(peakPrey[1]) - 14} L${X(peakPred[0])} ${Y(peakPrey[1]) - 14}" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="${(X(peakPrey[0]) + X(peakPred[0])) / 2}" y="${Y(peakPrey[1]) - 20}" text-anchor="middle" class="s" fill="#f59e0b">${L('predators lag about 1/4 cycle', 'pemangsa tertinggal sekitar 1/4 siklus')}</text>
  <text x="36" y="226" class="s" fill="#10b981">${L('prey x', 'mangsa x')}</text>
  <text x="90" y="226" class="s" fill="#ef4444">${L('predators y', 'pemangsa y')}</text>
  <text x="170" y="226" class="s">dx/dt = αx − βxy,  dy/dt = δxy − γy</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#f59e0b"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Prey grow exponentially on their own and are removed in proportion to prey-predator encounters; predators grow from those encounters and die at a constant rate.',
        'The coupled equations produce cycles in which the predator peak follows the prey peak by about a quarter of a cycle.',
        'The equilibrium is x* = γ/δ prey and y* = α/β predators: prey numbers are set by predator parameters and predator numbers by prey parameters.',
        'The equilibrium is neutrally stable, so the size of the cycle depends on the starting point, not on the parameters; the populations never settle unless they start exactly at equilibrium.',
        'Removing predation (β = 0) or killing predators quickly (large γ) leaves prey growing without limit, because the model has no carrying capacity.',
      ],
      id: [
        'Mangsa tumbuh eksponensial dengan sendirinya dan berkurang sebanding dengan pertemuan mangsa-pemangsa; pemangsa tumbuh dari pertemuan itu dan mati dengan laju tetap.',
        'Persamaan yang berpasangan menghasilkan siklus di mana puncak pemangsa mengikuti puncak mangsa sekitar seperempat siklus kemudian.',
        'Keseimbangannya x* = γ/δ mangsa dan y* = α/β pemangsa: jumlah mangsa ditentukan parameter pemangsa dan jumlah pemangsa ditentukan parameter mangsa.',
        'Keseimbangan itu stabil netral, sehingga ukuran siklus bergantung pada titik awal, bukan pada parameter; populasi tidak pernah menetap kecuali dimulai tepat di titik keseimbangan.',
        'Menghapus pemangsaan (β = 0) atau membunuh pemangsa dengan cepat (γ besar) membuat mangsa tumbuh tanpa batas, karena model ini tidak punya daya dukung.',
      ],
    },
    vocabulary: {
      en: [
        ['Prey growth rate α', 'The per-capita birth rate of prey in the absence of predators.'],
        ['Predation rate β', 'How strongly each prey-predator encounter reduces the prey population.'],
        ['Predator gain δ', 'How efficiently encounters with prey are converted into predator growth.'],
        ['Predator death rate γ', 'The per-capita rate at which predators die when there is no food.'],
        ['Equilibrium (fixed point)', 'The pair of populations at which both rates of change are zero: x* = γ/δ, y* = α/β.'],
        ['Phase plot', 'A graph of predator numbers against prey numbers; time is not an axis, and each cycle is a closed loop.'],
        ['Neutral stability', 'Small pushes away from equilibrium neither grow nor die out; the system simply orbits at the new distance.'],
        ['Carrying capacity', 'The maximum population an environment can sustain; absent from the Lotka-Volterra model.'],
      ],
      id: [
        ['Laju pertumbuhan mangsa α', 'Laju kelahiran per kapita mangsa tanpa adanya pemangsa.'],
        ['Laju pemangsaan β', 'Seberapa kuat tiap pertemuan mangsa-pemangsa mengurangi populasi mangsa.'],
        ['Perolehan pemangsa δ', 'Seberapa efisien pertemuan dengan mangsa diubah menjadi pertumbuhan pemangsa.'],
        ['Laju kematian pemangsa γ', 'Laju per kapita kematian pemangsa ketika tidak ada makanan.'],
        ['Keseimbangan (titik tetap)', 'Pasangan populasi ketika kedua laju perubahan bernilai nol: x* = γ/δ, y* = α/β.'],
        ['Grafik fase', 'Grafik jumlah pemangsa terhadap jumlah mangsa; waktu bukan sumbu, dan tiap siklus adalah lingkaran tertutup.'],
        ['Stabilitas netral', 'Dorongan kecil menjauhi keseimbangan tidak membesar dan tidak meredup; sistem hanya mengorbit pada jarak yang baru.'],
        ['Daya dukung', 'Populasi maksimum yang bisa ditopang lingkungan; tidak ada dalam model Lotka-Volterra.'],
      ],
    },
    misconceptions: {
      en: [
        ['More prey births (higher α) means more prey in the long run.', 'In this model the average prey level is x* = γ/δ, which does not contain α at all. Extra prey births end up feeding more predators: the predator equilibrium α/β rises instead.'],
        ['The populations will eventually settle down to the equilibrium.', 'The equilibrium is neutrally stable, not attracting. The exact model cycles forever at whatever amplitude it started with, and the sim\'s Runge–Kutta integrator reproduces that: the loop neither shrinks nor grows. Only starting exactly at (γ/δ, α/β) keeps both constant.'],
        ['Predators and prey peak at the same time.', 'The predator peak lags by about a quarter of a cycle. Predators keep increasing as long as prey are above x*, so they are still growing when prey are at their maximum.'],
        ['Wiping out predators is good for the prey population.', 'In the model, prey then grow exponentially without limit, which is a sign that the model is missing something, namely a carrying capacity. In real ecosystems prey released from predation often overshoot, exhaust their food and crash.'],
      ],
      id: [
        ['Lebih banyak kelahiran mangsa (α lebih tinggi) berarti lebih banyak mangsa dalam jangka panjang.', 'Dalam model ini tingkat rata-rata mangsa adalah x* = γ/δ, yang sama sekali tidak memuat α. Kelahiran mangsa tambahan akhirnya memberi makan lebih banyak pemangsa: yang naik justru keseimbangan pemangsa α/β.'],
        ['Populasi pada akhirnya akan menetap di titik keseimbangan.', 'Keseimbangannya stabil netral, bukan menarik. Model eksaknya bersiklus selamanya pada amplitudo awalnya, dan integrator Runge–Kutta di simulasi mereproduksi hal itu: lingkarannya tidak mengecil maupun membesar. Hanya memulai tepat di (γ/δ, α/β) yang membuat keduanya konstan.'],
        ['Pemangsa dan mangsa memuncak pada saat yang sama.', 'Puncak pemangsa tertinggal sekitar seperempat siklus. Pemangsa terus bertambah selama mangsa berada di atas x*, sehingga mereka masih tumbuh ketika mangsa berada di titik maksimum.'],
        ['Memusnahkan pemangsa baik bagi populasi mangsa.', 'Dalam model, mangsa lalu tumbuh eksponensial tanpa batas, dan itu pertanda model kehilangan sesuatu, yaitu daya dukung. Di ekosistem nyata, mangsa yang terbebas dari pemangsaan sering melonjak berlebihan, menghabiskan makanannya, lalu runtuh.'],
      ],
    },
    realWorld: {
      en: [
        'Fur-trading records from the Hudson\'s Bay Company show lynx and snowshoe hare numbers in Canada rising and falling together in roughly ten-year cycles, with the lynx peaks trailing the hare peaks.',
        'Volterra took up the problem because his son-in-law, a fisheries biologist, noticed that predatory fish became more common in the Adriatic when fishing paused during the First World War.',
        'Microbial predator-prey pairs in laboratory flasks, such as a ciliate feeding on bacteria, show sustained oscillations that can be fitted with extended versions of these equations.',
        'The same equations, with the signs changed, are used in economics to model boom-and-bust cycles between wages and employment.',
      ],
      id: [
        'Catatan perdagangan bulu Hudson\'s Bay Company menunjukkan jumlah lynx dan kelinci salju di Kanada naik turun bersama dalam siklus sekitar sepuluh tahun, dengan puncak lynx membuntuti puncak kelinci.',
        'Volterra menekuni soal ini karena menantunya, seorang ahli biologi perikanan, melihat ikan pemangsa menjadi lebih umum di Laut Adriatik ketika penangkapan ikan terhenti selama Perang Dunia Pertama.',
        'Pasangan pemangsa-mangsa mikroba di dalam labu laboratorium, misalnya ciliata yang memakan bakteri, memperlihatkan osilasi berkelanjutan yang bisa dicocokkan dengan versi lanjutan persamaan ini.',
        'Persamaan yang sama, dengan tanda yang diubah, dipakai dalam ekonomi untuk memodelkan siklus naik-turun antara upah dan lapangan kerja.',
      ],
    },
    questions: {
      en: [
        { q: 'With the default rates α = 1.0, β = 0.4, δ = 0.2, γ = 0.6, what are the equilibrium populations, and which slider would you move to raise the equilibrium number of prey?', a: 'x* = γ/δ = 0.6/0.2 = 3 prey and y* = α/β = 1.0/0.4 = 2.5 predators. To raise x* you must raise γ or lower δ, both predator parameters; changing α or β moves only the predator equilibrium.' },
        { q: 'The sim always starts at 10 prey and 5 predators. Choose rates so that both populations stay constant from the start.', a: 'You need γ/δ = 10 and α/β = 5. One choice is γ = 1.0, δ = 0.1, α = 1.0, β = 0.2. Set these and press Reset: both lines stay flat, because the starting point is exactly the equilibrium. Nudge any slider and the cycles reappear, which is what neutral stability means.' },
        { q: 'Explain, using the equations, why the predator population is still rising at the moment the prey population reaches its peak.', a: 'At the prey peak dx/dt = 0, so αx − βxy = 0 and y = α/β = y*: the predators are exactly at their equilibrium level. The predator equation dy/dt = y(δx − γ) is positive whenever x > γ/δ = x*, and at the prey peak x is far above x*, so predators keep growing. They only stop growing when prey fall back to x*, about a quarter cycle later.' },
      ],
      id: [
        { q: 'Dengan laju bawaan α = 1,0, β = 0,4, δ = 0,2, γ = 0,6, berapa populasi keseimbangannya, dan slider mana yang akan kamu geser untuk menaikkan jumlah keseimbangan mangsa?', a: 'x* = γ/δ = 0,6/0,2 = 3 mangsa dan y* = α/β = 1,0/0,4 = 2,5 pemangsa. Untuk menaikkan x* kamu harus menaikkan γ atau menurunkan δ, keduanya parameter pemangsa; mengubah α atau β hanya menggeser keseimbangan pemangsa.' },
        { q: 'Simulasi selalu dimulai dari 10 mangsa dan 5 pemangsa. Pilih laju agar kedua populasi tetap konstan sejak awal.', a: 'Kamu perlu γ/δ = 10 dan α/β = 5. Salah satu pilihannya γ = 1,0, δ = 0,1, α = 1,0, β = 0,2. Atur nilai itu lalu tekan Reset: kedua garis tetap datar, karena titik awalnya tepat di titik keseimbangan. Geser sedikit slider mana pun dan siklus muncul kembali; itulah arti stabilitas netral.' },
        { q: 'Jelaskan, dengan persamaannya, mengapa populasi pemangsa masih naik pada saat populasi mangsa mencapai puncaknya.', a: 'Pada puncak mangsa dx/dt = 0, sehingga αx − βxy = 0 dan y = α/β = y*: pemangsa tepat berada di tingkat keseimbangannya. Persamaan pemangsa dy/dt = y(δx − γ) bernilai positif setiap kali x > γ/δ = x*, dan pada puncak mangsa x jauh di atas x*, sehingga pemangsa terus tumbuh. Mereka baru berhenti tumbuh ketika mangsa turun kembali ke x*, sekitar seperempat siklus kemudian.' },
      ],
    },
  },
};
