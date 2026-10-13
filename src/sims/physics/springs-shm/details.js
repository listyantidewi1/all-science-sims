// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply T = 2π√(m/k) for an ideal spring.',
      'Identify amplitude, period, and frequency from the graph.',
      'See how damping changes amplitude over time.',
    ],
    id: [
      'Menerapkan T = 2π√(m/k) untuk pegas ideal.',
      'Mengenali amplitudo, periode, dan frekuensi dari grafik.',
      'Melihat redaman mengurangi amplitudo seiring waktu.',
    ],
  },
  tryThis: {
    en: [
      'Quadruple the mass — does the period double?',
      'Increase damping until the system barely oscillates.',
      'Drag the mass while it bobs to add energy.',
    ],
    id: [
      'Lipat empat massa — apakah periode menjadi dua kali lipat?',
      'Tambah redaman sampai sistem hampir tidak berosilasi.',
      'Tarik massa sambil bergerak untuk menambah energi.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Stretch or compress a spring and it pushes back with a force proportional to how far you moved it: F = −k x, Hooke\'s law, where k is the spring constant in newtons per metre and the minus sign says the force always points back toward the rest position. Hang a mass on the spring and pull it down; when you let go, the restoring force accelerates it upward, it overshoots the rest position, the spring compresses and pushes it back down, and the cycle repeats. Because the force is proportional to displacement, this is simple harmonic motion, the same kind of motion as a pendulum at small angles.',
        'Newton\'s second law gives m a = −k x, so the acceleration is always −(k/m) times the displacement. The solution is a sine wave, x(t) = A cos(ωt), with angular frequency ω = √(k/m) and period T = 2π√(m/k). A heavier mass is harder to turn around, so T grows with √m; a stiffer spring pulls harder, so T shrinks with √k. The amplitude A does not appear at all: a bigger swing means a bigger restoring force, and the two effects cancel exactly, so the mass takes the same time per cycle whether it moves a little or a lot.',
        'The sim integrates exactly this equation. The displacement y is measured from the equilibrium position, where the spring force already balances the weight; gravity just sets where that point is and does not change the period, so it is not shown separately. The mass and stiffness sliders change ω, and the readout prints T = 2π√(m/k) for comparison with the graph, where one period is the distance between neighbouring peaks. The initial-displacement slider sets A, and dragging the mass sets a new starting position by hand. Energy sloshes back and forth: all elastic potential energy (½ k x²) at the extremes, all kinetic energy (½ m v²) as the mass whips through the centre.',
        'The damping slider adds a force proportional to velocity, like moving through thick air or oil. Energy leaks away, so the peaks on the graph shrink in a smooth exponential envelope while the period stays almost unchanged for light damping; turn damping far up and the mass creeps back to rest without oscillating at all. The sim ignores the spring\'s own mass, assumes the spring is never stretched beyond its linear range, and treats the mass as a point, so very large amplitudes behave more neatly here than they would in the lab.',
      ],
      id: [
        'Regangkan atau tekan sebuah pegas, maka pegas mendorong balik dengan gaya yang sebanding dengan seberapa jauh pegas digeser: F = −k x, hukum Hooke, dengan k tetapan pegas dalam newton per meter dan tanda minus menyatakan gaya selalu mengarah kembali ke posisi setimbang. Gantungkan beban pada pegas lalu tarik ke bawah; saat dilepas, gaya pemulih mempercepat beban ke atas, beban melewati posisi setimbang, pegas tertekan dan mendorongnya kembali ke bawah, dan siklusnya berulang. Karena gayanya sebanding dengan simpangan, ini adalah gerak harmonik sederhana, gerak yang sama jenisnya dengan bandul pada sudut kecil.',
        'Hukum kedua Newton memberi m a = −k x, sehingga percepatan selalu −(k/m) kali simpangan. Penyelesaiannya adalah gelombang sinus, x(t) = A cos(ωt), dengan frekuensi sudut ω = √(k/m) dan periode T = 2π√(m/k). Massa yang lebih besar lebih sulit dibalikkan arahnya, sehingga T bertambah mengikuti √m; pegas yang lebih kaku menarik lebih kuat, sehingga T berkurang mengikuti √k. Amplitudo A sama sekali tidak muncul: simpangan yang lebih besar berarti gaya pemulih lebih besar, dan kedua efek itu saling meniadakan, sehingga waktu tiap siklus sama baik beban bergerak sedikit maupun banyak.',
        'Simulasi mengintegrasikan persamaan ini secara langsung. Simpangan y diukur dari posisi setimbang, tempat gaya pegas sudah mengimbangi berat; gravitasi hanya menentukan letak titik itu dan tidak mengubah periode, sehingga tidak ditampilkan terpisah. Slider massa dan kekakuan mengubah ω, dan tampilan mencetak T = 2π√(m/k) untuk dibandingkan dengan grafik, tempat satu periode adalah jarak antara dua puncak berurutan. Slider simpangan awal mengatur A, dan menyeret beban menetapkan posisi awal baru secara langsung. Energi berpindah bolak-balik: seluruhnya energi potensial elastis (½ k x²) di titik terjauh, seluruhnya energi kinetik (½ m v²) saat beban melesat melewati titik tengah.',
        'Slider redaman menambahkan gaya yang sebanding dengan kecepatan, seperti bergerak di dalam udara kental atau minyak. Energi bocor keluar, sehingga puncak-puncak pada grafik mengecil mengikuti amplop eksponensial yang mulus sementara periode hampir tidak berubah untuk redaman ringan; naikkan redaman jauh lebih besar dan beban merayap kembali ke posisi diam tanpa berosilasi sama sekali. Simulasi mengabaikan massa pegas itu sendiri, menganggap pegas tidak pernah diregangkan melampaui daerah linearnya, dan memperlakukan beban sebagai titik, sehingga amplitudo yang sangat besar berperilaku lebih rapi di sini dibanding di laboratorium.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the spring force F = −k x always points back toward equilibrium, whichever side the mass is on. Right: the resulting displacement graph is a sine wave with amplitude A and period T = 2π√(m/k).',
        id: 'Kiri: gaya pegas F = −k x selalu mengarah kembali ke titik setimbang, di sisi mana pun beban berada. Kanan: grafik simpangan yang dihasilkan adalah gelombang sinus dengan amplitudo A dan periode T = 2π√(m/k).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const spring = (x, y1, y2) => {
          const n = 10, pts = [`${x},${y1}`];
          for (let i = 1; i < n; i++) pts.push(`${x + (i % 2 ? 7 : -7)},${(y1 + ((y2 - y1) * i) / n).toFixed(1)}`);
          pts.push(`${x},${y2}`);
          return pts.join(' ');
        };
        const sine = () => {
          const pts = [];
          for (let i = 0; i <= 80; i++) {
            const u = i / 80;
            pts.push(`${(170 + u * 170).toFixed(1)},${(130 - 45 * Math.cos(2 * Math.PI * 2 * u)).toFixed(1)}`);
          }
          return pts.join(' ');
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Restoring force on a spring and the displacement graph', 'Gaya pemulih pegas dan grafik simpangan')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}</style>
  <line x1="14" y1="22" x2="150" y2="22" stroke="currentColor" stroke-width="3"/>
  <line x1="14" y1="110" x2="150" y2="110" class="m" stroke-dasharray="4 4"/>
  <text x="92" y="126">${L('equilibrium', 'setimbang')}</text>
  <polyline points="${spring(50, 22, 140)}" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <rect x="34" y="140" width="32" height="28" fill="#3b82f6"/>
  <line x1="50" y1="154" x2="50" y2="118" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="58" y="138" fill="#10b981">F</text>
  <line x1="80" y1="110" x2="80" y2="154" class="m" marker-end="url(#a)"/>
  <text x="84" y="150">x</text>
  <polyline points="${spring(120, 22, 56)}" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <rect x="104" y="56" width="32" height="28" fill="#3b82f6"/>
  <line x1="120" y1="70" x2="120" y2="104" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="128" y="100" fill="#10b981">F</text>
  <text x="18" y="200">${L('F = −k x', 'F = −k x')}</text>
  <text x="18" y="218">${L('(always toward equilibrium)', '(selalu menuju setimbang)')}</text>
  <line x1="170" y1="130" x2="345" y2="130" class="m"/>
  <line x1="170" y1="75" x2="170" y2="185" class="m"/>
  <polyline points="${sine()}" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <line x1="170" y1="85" x2="170" y2="130" class="f" stroke="#ef4444" marker-start="url(#a)"/>
  <text x="176" y="112" fill="#ef4444">A</text>
  <line x1="170" y1="200" x2="255" y2="200" class="f" stroke="#f59e0b" marker-start="url(#a)" marker-end="url(#a)"/>
  <text x="206" y="218" fill="#f59e0b">T</text>
  <line x1="255" y1="85" x2="255" y2="200" class="m" stroke-dasharray="3 3"/>
  <text x="300" y="145">${L('time', 'waktu')}</text>
  <text x="158" y="82">x</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Hooke\'s law F = −k x: the spring force is proportional to the displacement and always points back toward equilibrium.',
        'Any system with a restoring force proportional to displacement performs simple harmonic motion, a pure sine wave in time.',
        'The period T = 2π√(m/k) depends on mass and stiffness only; the amplitude does not change it.',
        'Energy swaps between elastic potential energy at the extremes and kinetic energy at the centre, with the total constant when there is no damping.',
        'Damping makes the amplitude decay exponentially but barely changes the period until it is very strong.',
      ],
      id: [
        'Hukum Hooke F = −k x: gaya pegas sebanding dengan simpangan dan selalu mengarah kembali ke titik setimbang.',
        'Setiap sistem dengan gaya pemulih yang sebanding dengan simpangan melakukan gerak harmonik sederhana, gelombang sinus murni terhadap waktu.',
        'Periode T = 2π√(m/k) hanya bergantung pada massa dan kekakuan; amplitudo tidak mengubahnya.',
        'Energi berpindah antara energi potensial elastis di titik terjauh dan energi kinetik di titik tengah, dengan jumlah tetap jika tidak ada redaman.',
        'Redaman membuat amplitudo meluruh secara eksponensial tetapi hampir tidak mengubah periode sampai redamannya sangat kuat.',
      ],
    },
    vocabulary: {
      en: [
        ['Hooke\'s law', 'The rule F = −k x that the force from an ideal spring is proportional to its extension and opposes it.'],
        ['Spring constant (k)', 'The stiffness of a spring in N/m: the force needed to stretch it by one metre.'],
        ['Equilibrium position', 'The point where the net force on the mass is zero; for a hanging mass, where spring force balances weight.'],
        ['Amplitude (A)', 'The maximum displacement from equilibrium.'],
        ['Period (T)', 'The time for one complete oscillation, T = 2π√(m/k) for a mass on a spring.'],
        ['Angular frequency (ω)', 'ω = √(k/m) = 2π/T, the rate at which the phase of the sine wave advances, in radians per second.'],
        ['Restoring force', 'A force that always acts toward equilibrium, the ingredient that makes oscillation possible.'],
        ['Damping', 'A velocity-dependent force that removes energy and makes the oscillation die away.'],
      ],
      id: [
        ['Hukum Hooke', 'Aturan F = −k x bahwa gaya dari pegas ideal sebanding dengan pertambahan panjangnya dan berlawanan arah dengannya.'],
        ['Tetapan pegas (k)', 'Kekakuan pegas dalam N/m: gaya yang diperlukan untuk meregangkannya sejauh satu meter.'],
        ['Posisi setimbang', 'Titik tempat gaya total pada beban nol; untuk beban tergantung, tempat gaya pegas mengimbangi berat.'],
        ['Amplitudo (A)', 'Simpangan terbesar dari posisi setimbang.'],
        ['Periode (T)', 'Waktu untuk satu getaran penuh, T = 2π√(m/k) untuk beban pada pegas.'],
        ['Frekuensi sudut (ω)', 'ω = √(k/m) = 2π/T, laju bertambahnya fase gelombang sinus, dalam radian per sekon.'],
        ['Gaya pemulih', 'Gaya yang selalu bekerja menuju titik setimbang, bahan yang membuat getaran mungkin terjadi.'],
        ['Redaman', 'Gaya yang bergantung pada kecepatan, membuang energi, dan membuat getaran mati.'],
      ],
    },
    misconceptions: {
      en: [
        ['A heavier mass bobs faster because gravity pulls it harder.', 'It bobs slower. Gravity only shifts the equilibrium point; the oscillation is driven by the spring, and a bigger mass responds more sluggishly to the same force, so T grows as √m.'],
        ['Pulling the mass further down makes the period longer.', 'The period is independent of amplitude. A larger displacement gives a proportionally larger force, so the mass moves faster over the longer distance and arrives in exactly the same time.'],
        ['At the equilibrium position the mass is momentarily at rest.', 'The opposite: it is moving fastest there, because the whole stored spring energy has become kinetic energy. It is at rest only at the two extremes.'],
        ['Taking the spring to the Moon would change its period.', 'Weaker gravity moves the equilibrium point up but leaves k and m unchanged, so T is the same. This is different from a pendulum, whose period does depend on g.'],
      ],
      id: [
        ['Beban yang lebih berat berayun lebih cepat karena gravitasi menariknya lebih kuat.', 'Justru lebih lambat. Gravitasi hanya menggeser titik setimbang; getaran digerakkan oleh pegas, dan massa yang lebih besar menanggapi gaya yang sama dengan lebih lamban, sehingga T bertambah mengikuti √m.'],
        ['Menarik beban lebih jauh ke bawah membuat periode lebih panjang.', 'Periode tidak bergantung pada amplitudo. Simpangan lebih besar memberi gaya yang lebih besar secara sebanding, sehingga beban bergerak lebih cepat menempuh jarak yang lebih panjang dan tiba dalam waktu yang tepat sama.'],
        ['Di posisi setimbang beban sesaat berhenti.', 'Justru sebaliknya: di sana beban bergerak paling cepat, karena seluruh energi pegas yang tersimpan telah menjadi energi kinetik. Beban berhenti hanya di kedua titik terjauh.'],
        ['Membawa pegas ke Bulan akan mengubah periodenya.', 'Gravitasi yang lebih lemah menggeser titik setimbang ke atas tetapi tidak mengubah k dan m, sehingga T tetap. Ini berbeda dengan bandul, yang periodenya bergantung pada g.'],
      ],
    },
    realWorld: {
      en: [
        'Car suspensions are mass-spring systems with deliberate damping from shock absorbers, so a bump produces one dip instead of a long bounce.',
        'Astronauts weigh themselves on the space station by sitting on a sprung platform and measuring its oscillation period, since T depends on m but not on g.',
        'Quartz watches, atoms in a crystal lattice, and the suspension of a loudspeaker cone are all oscillators described by the same equation.',
        'Bungee jumping is a mass on a very long spring: the jumper oscillates about the equilibrium point until air drag and the cord\'s internal friction damp it out.',
      ],
      id: [
        'Suspensi mobil adalah sistem massa-pegas dengan redaman sengaja dari peredam kejut, sehingga sebuah gundukan menghasilkan satu kali turun, bukan pantulan panjang.',
        'Astronaut menimbang diri di stasiun antariksa dengan duduk di landasan berpegas dan mengukur periode getarannya, karena T bergantung pada m tetapi tidak pada g.',
        'Jam kuarsa, atom dalam kisi kristal, dan penyangga membran pengeras suara semuanya adalah osilator yang digambarkan oleh persamaan yang sama.',
        'Lompat bungee adalah massa pada pegas yang sangat panjang: pelompat berosilasi di sekitar titik setimbang sampai hambatan udara dan gesekan dalam tali meredamnya.',
      ],
    },
    questions: {
      en: [
        { q: 'In the sim, m = 1.0 kg and k = 8.0 N/m. What period should the graph show, and what happens if you set m = 4.0 kg?', a: 'T = 2π√(1/8) = 2π × 0.354 ≈ 2.22 s. With m = 4 kg, T = 2π√(4/8) ≈ 4.44 s: quadrupling the mass doubles the period because of the square root.' },
        { q: 'A mass of 2 kg hangs on a spring with k = 50 N/m. Find T. Then both m and k are doubled; what happens to T?', a: 'T = 2π√(2/50) = 2π√0.04 = 2π × 0.2 ≈ 1.26 s. Doubling both leaves the ratio m/k unchanged, so T stays at 1.26 s.' },
        { q: 'Where in the cycle is the kinetic energy greatest, where is the elastic potential energy greatest, and what stays the same throughout (with no damping)?', a: 'Kinetic energy is greatest as the mass passes through equilibrium, where its speed is maximal. Elastic potential energy ½ k x² is greatest at the extremes, x = ±A. Their sum, the total mechanical energy ½ k A², is constant throughout the motion.' },
      ],
      id: [
        { q: 'Di simulasi, m = 1,0 kg dan k = 8,0 N/m. Berapa periode yang seharusnya tampak di grafik, dan apa yang terjadi jika m diatur menjadi 4,0 kg?', a: 'T = 2π√(1/8) = 2π × 0,354 ≈ 2,22 s. Dengan m = 4 kg, T = 2π√(4/8) ≈ 4,44 s: melipatempatkan massa menggandakan periode karena adanya akar kuadrat.' },
        { q: 'Beban 2 kg tergantung pada pegas dengan k = 50 N/m. Hitung T. Lalu m dan k keduanya digandakan; apa yang terjadi pada T?', a: 'T = 2π√(2/50) = 2π√0,04 = 2π × 0,2 ≈ 1,26 s. Menggandakan keduanya tidak mengubah rasio m/k, sehingga T tetap 1,26 s.' },
        { q: 'Di bagian siklus mana energi kinetik terbesar, di mana energi potensial elastis terbesar, dan apa yang tetap sepanjang gerak (tanpa redaman)?', a: 'Energi kinetik terbesar saat beban melewati titik setimbang, tempat kelajuannya maksimum. Energi potensial elastis ½ k x² terbesar di titik terjauh, x = ±A. Jumlah keduanya, energi mekanik total ½ k A², tetap sepanjang gerak.' },
      ],
    },
  },
};
