// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Predict how launch angle affects horizontal range.',
      'Decompose velocity into horizontal and vertical components.',
      'Explain how gravity changes vertical velocity but not horizontal.',
    ],
    id: [
      'Memprediksi pengaruh sudut peluncuran terhadap jangkauan horizontal.',
      'Menguraikan kecepatan menjadi komponen horizontal dan vertikal.',
      'Menjelaskan bagaimana gravitasi mengubah kecepatan vertikal namun tidak horizontal.',
    ],
  },
  tryThis: {
    en: [
      'Find the launch angle that gives the longest range.',
      'Set air drag to 0 — does the optimal angle change?',
      'Match a target by tweaking only the speed.',
    ],
    id: [
      'Cari sudut peluncuran yang memberi jangkauan terjauh.',
      'Atur hambatan udara ke 0 — apakah sudut optimal berubah?',
      'Capai target dengan hanya mengubah kecepatan.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A projectile is anything thrown or launched that then moves under gravity alone: a football, a water jet, a cannonball. The key insight, first stated clearly by Galileo, is that its motion can be split into two independent parts. Horizontally, nothing pushes or pulls on it (once air resistance is ignored), so the horizontal velocity vx stays constant. Vertically, gravity pulls down with acceleration g, so the vertical velocity vy decreases on the way up, passes through zero at the top, and grows again on the way down. The curved path, a parabola, is just these two motions happening at the same time.',
        'At launch the speed v and angle θ set the two components: vx = v cos θ and vy = v sin θ. From there, with no drag, the standard results follow: time of flight t = 2 v sin θ / g, peak height H = v² sin²θ / (2g), and range R = v² sin(2θ) / g. Because sin(2θ) is largest at θ = 45°, that angle gives the longest range on flat ground, and two angles that add to 90° (such as 30° and 60°) give the same range: the high shot stays in the air longer, the low shot moves faster sideways.',
        'The sliders change exactly these inputs. Angle trades horizontal speed for vertical speed. Speed scales the whole trajectory, and because v appears squared, doubling the speed quadruples the range. Gravity sets how fast vy changes; on Mars (3.7 m/s²) the same throw goes about 2.6 times farther. The velocity arrows show vx (red) staying the same length throughout the flight while vy (green) shrinks, vanishes at the peak, and grows pointing downward.',
        'The sim adds air resistance as a simple drag force proportional to velocity: the acceleration from drag is minus k times v, where k is the "Air drag" slider in units of 1/s. Drag removes energy, so the range and peak shrink, the path is no longer a symmetric parabola, and the best angle drops below 45°. Real air drag on fast objects grows roughly with the square of speed and depends on shape and spin, which the sim ignores; it also launches from ground level and treats the ground as flat.',
      ],
      id: [
        'Proyektil adalah benda apa pun yang dilempar atau diluncurkan lalu bergerak hanya di bawah pengaruh gravitasi: bola sepak, pancaran air, peluru meriam. Gagasan kuncinya, yang pertama kali dijelaskan dengan gamblang oleh Galileo, adalah bahwa geraknya dapat dipisahkan menjadi dua bagian yang saling bebas. Secara horizontal tidak ada yang mendorong atau menariknya (jika hambatan udara diabaikan), sehingga kecepatan horizontal vx tetap. Secara vertikal, gravitasi menariknya ke bawah dengan percepatan g, sehingga kecepatan vertikal vy berkurang saat naik, menjadi nol di puncak, lalu bertambah lagi saat turun. Lintasan lengkungnya, sebuah parabola, hanyalah gabungan kedua gerak itu pada saat yang sama.',
        'Saat peluncuran, kelajuan v dan sudut θ menentukan kedua komponen: vx = v cos θ dan vy = v sin θ. Dari sini, tanpa hambatan udara, diperoleh hasil baku: waktu tempuh t = 2 v sin θ / g, tinggi maksimum H = v² sin²θ / (2g), dan jangkauan R = v² sin(2θ) / g. Karena sin(2θ) terbesar pada θ = 45°, sudut itulah yang memberi jangkauan terjauh di tanah datar, dan dua sudut yang jumlahnya 90° (misalnya 30° dan 60°) memberi jangkauan yang sama: tembakan tinggi lebih lama di udara, tembakan rendah lebih cepat bergerak ke samping.',
        'Slider mengubah tepat masukan-masukan ini. Sudut menukar kelajuan horizontal dengan kelajuan vertikal. Kelajuan memperbesar seluruh lintasan, dan karena v muncul dalam bentuk kuadrat, menggandakan kelajuan melipatempatkan jangkauan. Gravitasi menentukan seberapa cepat vy berubah; di Mars (3,7 m/s²) lemparan yang sama mencapai sekitar 2,6 kali lebih jauh. Panah kecepatan memperlihatkan vx (merah) yang panjangnya tetap sepanjang penerbangan, sedangkan vy (hijau) mengecil, hilang di puncak, lalu membesar mengarah ke bawah.',
        'Simulasi menambahkan hambatan udara sebagai gaya hambat sederhana yang sebanding dengan kecepatan: percepatan akibat hambatan adalah minus k kali v, dengan k adalah slider "Air drag" dalam satuan 1/s. Hambatan membuang energi, sehingga jangkauan dan tinggi puncak mengecil, lintasan tidak lagi berupa parabola simetris, dan sudut terbaik turun di bawah 45°. Hambatan udara sesungguhnya pada benda cepat bertambah kira-kira sebanding dengan kuadrat kelajuan dan bergantung pada bentuk serta putaran benda, yang diabaikan simulasi ini; simulasi juga meluncurkan dari permukaan tanah dan menganggap tanah datar.',
      ],
    },
    figure: {
      caption: {
        en: 'Along the whole path the horizontal velocity vx (red) keeps the same length, while gravity changes the vertical velocity vy (green): upward at first, zero at the peak, downward on the way back.',
        id: 'Di sepanjang lintasan, kecepatan horizontal vx (merah) panjangnya tetap, sedangkan gravitasi mengubah kecepatan vertikal vy (hijau): ke atas di awal, nol di puncak, ke bawah saat kembali.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Velocity components along a projectile path', 'Komponen kecepatan sepanjang lintasan proyektil')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}</style>
  <line x1="20" y1="200" x2="340" y2="200" stroke="currentColor" stroke-width="2"/>
  <path d="M40 200 Q180 -60 320 200" class="m" stroke-dasharray="5 4"/>
  <circle cx="40" cy="200" r="4" fill="currentColor"/>
  <circle cx="96" cy="117" r="6" fill="#3b82f6"/>
  <circle cx="180" cy="70" r="6" fill="#3b82f6"/>
  <circle cx="264" cy="117" r="6" fill="#3b82f6"/>
  <line x1="96" y1="117" x2="131" y2="117" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <line x1="96" y1="117" x2="96" y2="78" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="100" y="80" fill="#10b981">vy</text>
  <text x="112" y="132" fill="#ef4444">vx</text>
  <line x1="180" y1="70" x2="215" y2="70" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="196" y="86" fill="#ef4444">vx</text>
  <text x="150" y="50" fill="#10b981">vy = 0</text>
  <line x1="264" y1="117" x2="299" y2="117" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <line x1="264" y1="117" x2="264" y2="156" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="270" y="158" fill="#10b981">vy</text>
  <text x="280" y="110" fill="#ef4444">vx</text>
  <line x1="330" y1="40" x2="330" y2="80" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="336" y="64" fill="#f59e0b">g</text>
  <text x="24" y="222">${L('launch', 'peluncuran')}</text>
  <text x="250" y="222">${L('range R', 'jangkauan R')}</text>
  <text x="40" y="22">${L('vx stays constant; only vy changes', 'vx tetap; hanya vy yang berubah')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Horizontal and vertical motion are independent: gravity changes only the vertical velocity.',
        'With no drag the path is a parabola, and R = v² sin(2θ) / g gives the range on flat ground.',
        'The longest range is at 45°, and angles that add to 90° give equal ranges.',
        'Doubling the launch speed quadruples the range, because v appears squared.',
        'Air drag shortens the flight, breaks the symmetry of the path, and lowers the best angle below 45°.',
      ],
      id: [
        'Gerak horizontal dan vertikal saling bebas: gravitasi hanya mengubah kecepatan vertikal.',
        'Tanpa hambatan udara lintasannya parabola, dan R = v² sin(2θ) / g memberi jangkauan di tanah datar.',
        'Jangkauan terjauh dicapai pada 45°, dan sudut-sudut yang berjumlah 90° memberi jangkauan sama.',
        'Menggandakan kelajuan awal melipatempatkan jangkauan, karena v muncul dalam bentuk kuadrat.',
        'Hambatan udara memperpendek penerbangan, merusak simetri lintasan, dan menurunkan sudut terbaik di bawah 45°.',
      ],
    },
    vocabulary: {
      en: [
        ['Projectile', 'An object moving only under gravity (and possibly air resistance) after being launched.'],
        ['Trajectory', 'The path the projectile follows; a parabola when air resistance is ignored.'],
        ['Velocity components', 'The horizontal part vx = v cos θ and vertical part vy = v sin θ of the velocity.'],
        ['Range (R)', 'The horizontal distance from the launch point to where the projectile lands.'],
        ['Peak height (H)', 'The highest point of the flight, where the vertical velocity is momentarily zero.'],
        ['Time of flight', 'The total time in the air; it depends only on the vertical motion.'],
        ['Drag', 'Air resistance, a force opposite to the velocity that removes energy from the motion.'],
      ],
      id: [
        ['Proyektil', 'Benda yang bergerak hanya di bawah pengaruh gravitasi (dan mungkin hambatan udara) setelah diluncurkan.'],
        ['Lintasan', 'Jalur yang ditempuh proyektil; berbentuk parabola jika hambatan udara diabaikan.'],
        ['Komponen kecepatan', 'Bagian horizontal vx = v cos θ dan bagian vertikal vy = v sin θ dari kecepatan.'],
        ['Jangkauan (R)', 'Jarak horizontal dari titik peluncuran sampai titik proyektil mendarat.'],
        ['Tinggi maksimum (H)', 'Titik tertinggi penerbangan, saat kecepatan vertikal sesaat bernilai nol.'],
        ['Waktu tempuh', 'Total waktu di udara; hanya bergantung pada gerak vertikal.'],
        ['Hambatan udara', 'Gaya yang berlawanan arah dengan kecepatan dan membuang energi gerak.'],
      ],
    },
    misconceptions: {
      en: [
        ['At the top of the path the projectile has stopped moving.', 'Only its vertical velocity is zero there. It is still moving sideways at vx, which is why it keeps travelling forward over the peak.'],
        ['Gravity slows the projectile down horizontally as well.', 'Gravity acts straight down, so it has no effect on vx. Only air drag can reduce the horizontal speed, and the sim lets you turn drag off to see vx stay constant.'],
        ['45° is always the best angle.', 'That is true only on flat ground with no drag. With air resistance the best angle is lower, and a launch from a height or toward a cliff shifts it too.'],
        ['Something must keep pushing the projectile forward during the flight.', 'After launch nothing pushes it forward. It keeps moving because of inertia; the only forces in flight are gravity and, if present, drag.'],
      ],
      id: [
        ['Di puncak lintasan proyektil berhenti bergerak.', 'Hanya kecepatan vertikalnya yang nol di sana. Proyektil masih bergerak ke samping dengan vx, itulah sebabnya ia terus maju melewati puncak.'],
        ['Gravitasi juga memperlambat proyektil secara horizontal.', 'Gravitasi bekerja lurus ke bawah, jadi tidak berpengaruh pada vx. Hanya hambatan udara yang bisa mengurangi kelajuan horizontal, dan di simulasi hambatan bisa dimatikan agar terlihat vx tetap.'],
        ['45° selalu sudut terbaik.', 'Itu hanya benar di tanah datar tanpa hambatan udara. Dengan hambatan udara sudut terbaik lebih rendah, dan peluncuran dari ketinggian atau ke arah tebing juga menggesernya.'],
        ['Harus ada yang terus mendorong proyektil ke depan selama penerbangan.', 'Setelah diluncurkan tidak ada yang mendorongnya ke depan. Ia terus bergerak karena inersia; gaya yang bekerja saat terbang hanya gravitasi dan, jika ada, hambatan udara.'],
      ],
    },
    realWorld: {
      en: [
        'A basketball free throw and a football kick are projectiles; players learn by feel that a higher arc gives more hang time, a flatter one more speed.',
        'Water from a garden hose traces a parabola, and tilting the nozzle to about 45° sends it farthest across the lawn.',
        'Long jumpers and ski jumpers leave the ramp at angles well below 45°, because they already have a lot of horizontal speed and air drag matters.',
        'Artillery tables and sports-ball tracking systems both solve the projectile equations with real drag included to predict where the object will land.',
      ],
      id: [
        'Lemparan bebas bola basket dan tendangan bola sepak adalah proyektil; pemain belajar dari pengalaman bahwa busur tinggi memberi waktu melayang lebih lama, busur rendah memberi kecepatan lebih besar.',
        'Air dari selang taman membentuk parabola, dan memiringkan ujung selang sekitar 45° membuat air mencapai titik terjauh.',
        'Atlet lompat jauh dan lompat ski meninggalkan papan dengan sudut jauh di bawah 45°, karena mereka sudah punya kecepatan horizontal besar dan hambatan udara berpengaruh.',
        'Tabel tembak artileri dan sistem pelacak bola olahraga sama-sama menyelesaikan persamaan proyektil dengan hambatan udara sesungguhnya untuk meramalkan titik jatuh.',
      ],
    },
    questions: {
      en: [
        { q: 'With no drag, a projectile is launched at 20 m/s and 30° where g = 9.8 m/s². What range does the formula predict?', a: 'R = v² sin(2θ) / g = 400 × sin 60° / 9.8 = 400 × 0.866 / 9.8 ≈ 35 m. Check it in the sim by setting speed 20, angle 30 and drag 0.' },
        { q: 'Shots at 30° and 60° with the same speed land at the same spot. Which one stays in the air longer, and why?', a: 'The 60° shot. Time of flight depends only on the vertical component v sin θ, which is larger at 60°. It goes higher and takes longer, while the 30° shot covers the same distance with a larger vx in less time.' },
        { q: 'When you turn air drag on, the best launch angle drops below 45°. Explain why.', a: 'Drag acts for the whole flight and removes energy. A high shot spends longer in the air, so drag has more time to slow it, and much of that time it is moving slowly sideways. A lower angle keeps the flight short and the sideways speed high, so less range is lost.' },
      ],
      id: [
        { q: 'Tanpa hambatan udara, proyektil diluncurkan dengan 20 m/s pada sudut 30° di tempat dengan g = 9,8 m/s². Berapa jangkauan menurut rumus?', a: 'R = v² sin(2θ) / g = 400 × sin 60° / 9,8 = 400 × 0,866 / 9,8 ≈ 35 m. Periksa di simulasi dengan mengatur kelajuan 20, sudut 30, dan hambatan 0.' },
        { q: 'Tembakan pada 30° dan 60° dengan kelajuan sama mendarat di titik yang sama. Mana yang lebih lama di udara, dan mengapa?', a: 'Tembakan 60°. Waktu tempuh hanya bergantung pada komponen vertikal v sin θ, yang lebih besar pada 60°. Tembakan itu naik lebih tinggi dan lebih lama, sedangkan tembakan 30° menempuh jarak yang sama dengan vx lebih besar dalam waktu lebih singkat.' },
        { q: 'Saat hambatan udara dinyalakan, sudut peluncuran terbaik turun di bawah 45°. Jelaskan mengapa.', a: 'Hambatan bekerja sepanjang penerbangan dan membuang energi. Tembakan tinggi lebih lama di udara, sehingga hambatan punya lebih banyak waktu memperlambatnya, dan selama itu gerak menyampingnya lambat. Sudut lebih rendah membuat penerbangan singkat dan kelajuan menyamping tetap besar, sehingga jangkauan yang hilang lebih sedikit.' },
      ],
    },
  },
};
