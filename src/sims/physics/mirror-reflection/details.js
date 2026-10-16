// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe that light travels in straight lines and bounces off a flat mirror.',
      'Show that the angle the light comes in at equals the angle it goes out at (angle of incidence = angle of reflection).',
      'Use two or three mirrors to steer a beam of light around an obstacle to a target.',
    ],
    id: [
      'Menjelaskan bahwa cahaya merambat lurus dan memantul pada cermin datar.',
      'Menunjukkan bahwa sudut datang cahaya sama dengan sudut pantulnya (sudut datang = sudut pantul).',
      'Menggunakan dua atau tiga cermin untuk mengarahkan berkas cahaya melewati penghalang menuju sasaran.',
    ],
  },
  tryThis: {
    en: [
      'Start with Puzzle 1. Drag the small ring on the end of mirror 1 to turn it until the beam hits the target.',
      'Turn on "Show angles". Turn a mirror slowly and watch the "in" and "out" angles. Are they ever different?',
      'In Puzzle 2 the wall is in the way. Send the beam up and over it with two mirrors.',
      'Try to hit the target in Puzzle 3 using all three mirrors. Then try with only two!',
    ],
    id: [
      'Mulai dari Tekateki 1. Geser cincin kecil di ujung cermin 1 untuk memutarnya sampai berkas cahaya mengenai sasaran.',
      'Nyalakan "Tampilkan sudut". Putar cermin perlahan dan lihat sudut "masuk" dan "keluar". Apakah pernah berbeda?',
      'Di Tekateki 2 ada tembok yang menghalangi. Lewatkan berkas cahaya di atas tembok dengan dua cermin.',
      'Coba kenai sasaran di Tekateki 3 dengan ketiga cermin. Lalu coba hanya dengan dua cermin!',
    ],
  },

  learn: {
    background: {
      en: [
        'Light travels in straight lines. When a beam of light meets a smooth, shiny surface like a flat mirror, it bounces off. We call this bouncing reflection. The beam does not stop at the mirror and it does not pass through it; it changes direction and keeps going in a new straight line.',
        'To see which way the light bounces, scientists draw an imaginary line that stands straight up from the mirror at the point where the light lands. This line is called the normal. The angle between the incoming beam and the normal is the angle of incidence. The angle between the outgoing beam and the normal is the angle of reflection. For a flat mirror these two angles are always exactly equal. If the light comes in at 30 degrees, it leaves at 30 degrees, but on the other side of the normal.',
        'In this sim the torch sends out one beam. Each mirror has a round handle in the middle for moving it and a small ring at one end for turning it. The dotted line at each bounce is the normal, and the numbers show the in and out angles. When the beam reaches the target it lights up and says Hit! Walls block the light, so sometimes you need two or three bounces to reach the target.',
      ],
      id: [
        'Cahaya merambat dalam garis lurus. Ketika berkas cahaya mengenai permukaan yang halus dan mengilap seperti cermin datar, cahaya itu memantul. Peristiwa ini disebut pemantulan. Berkas cahaya tidak berhenti di cermin dan tidak menembusnya; cahaya berubah arah dan terus bergerak dalam garis lurus yang baru.',
        'Untuk melihat ke arah mana cahaya memantul, ilmuwan menggambar garis khayal yang tegak lurus pada cermin di titik tempat cahaya jatuh. Garis ini disebut garis normal. Sudut antara berkas datang dan garis normal disebut sudut datang. Sudut antara berkas pantul dan garis normal disebut sudut pantul. Pada cermin datar kedua sudut ini selalu sama besar. Jika cahaya datang dengan sudut 30 derajat, cahaya keluar dengan sudut 30 derajat juga, tetapi di sisi lain garis normal.',
        'Di simulasi ini senter memancarkan satu berkas cahaya. Setiap cermin punya pegangan bulat di tengah untuk menggesernya dan cincin kecil di salah satu ujung untuk memutarnya. Garis putus-putus di setiap pantulan adalah garis normal, dan angkanya menunjukkan sudut masuk dan keluar. Ketika berkas mencapai sasaran, sasaran menyala dan muncul tulisan Kena! Tembok menghalangi cahaya, jadi kadang kamu perlu dua atau tiga pantulan untuk mencapai sasaran.',
      ],
    },
    figure: {
      caption: {
        en: 'A beam from the torch hits a flat mirror. The dotted normal stands straight up from the mirror. The angle in (i) and the angle out (r) are always the same size.',
        id: 'Berkas cahaya dari senter mengenai cermin datar. Garis normal putus-putus tegak lurus pada cermin. Sudut masuk (i) dan sudut keluar (r) selalu sama besar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Light reflecting off a flat mirror with equal angles', 'Cahaya memantul pada cermin datar dengan sudut yang sama')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.ray{stroke:#f59e0b;stroke-width:3;fill:none}</style>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#f59e0b"/></marker></defs>
  <rect x="60" y="190" width="240" height="10" fill="#94a3b8"/>
  <rect x="60" y="200" width="240" height="6" fill="#475569"/>
  <text x="180" y="226" text-anchor="middle">${L('flat mirror', 'cermin datar')}</text>
  <line x1="180" y1="190" x2="180" y2="40" class="m" stroke-dasharray="5 4"/>
  <text x="186" y="48">${L('normal', 'garis normal')}</text>
  <rect x="28" y="52" width="34" height="18" rx="4" fill="#64748b"/>
  <rect x="62" y="48" width="12" height="26" rx="2" fill="#fbbf24"/>
  <text x="20" y="90">${L('torch', 'senter')}</text>
  <line x1="74" y1="61" x2="176" y2="186" class="ray"/>
  <line x1="180" y1="190" x2="290" y2="56" class="ray" marker-end="url(#ar)"/>
  <path d="M180 140 A50 50 0 0 0 148 151" class="m"/>
  <path d="M180 140 A50 50 0 0 1 212 151" class="m"/>
  <text x="150" y="134" fill="#38bdf8" font-weight="bold">i</text>
  <text x="203" y="134" fill="#a78bfa" font-weight="bold">r</text>
  <text x="300" y="50" fill="#f59e0b">${L('out', 'keluar')}</text>
  <text x="90" y="130" fill="#f59e0b">${L('in', 'masuk')}</text>
  <text x="180" y="20" text-anchor="middle" font-weight="bold">${L('angle in = angle out', 'sudut masuk = sudut keluar')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Light travels in straight lines until it hits something.',
        'A flat mirror reflects light: the beam bounces off and keeps going in a new direction.',
        'The normal is an imaginary line standing straight up from the mirror where the light lands.',
        'The angle in (angle of incidence) is always equal to the angle out (angle of reflection).',
        'Turning the mirror a little changes where the beam goes a lot, because both angles change.',
      ],
      id: [
        'Cahaya merambat lurus sampai mengenai sesuatu.',
        'Cermin datar memantulkan cahaya: berkas memantul dan terus bergerak ke arah baru.',
        'Garis normal adalah garis khayal yang tegak lurus pada cermin di titik cahaya jatuh.',
        'Sudut masuk (sudut datang) selalu sama dengan sudut keluar (sudut pantul).',
        'Memutar cermin sedikit saja mengubah arah berkas cukup banyak, karena kedua sudut berubah.',
      ],
    },
    vocabulary: {
      en: [
        ['Reflection', 'Light bouncing off a surface such as a mirror.'],
        ['Normal', 'An imaginary line at right angles to the mirror at the point where the light lands.'],
        ['Angle of incidence', 'The angle between the incoming beam and the normal.'],
        ['Angle of reflection', 'The angle between the outgoing beam and the normal. It equals the angle of incidence.'],
        ['Beam', 'A narrow line of light, like the light from a torch.'],
      ],
      id: [
        ['Pemantulan', 'Cahaya yang memantul dari suatu permukaan seperti cermin.'],
        ['Garis normal', 'Garis khayal yang tegak lurus pada cermin di titik cahaya jatuh.'],
        ['Sudut datang', 'Sudut antara berkas cahaya yang datang dan garis normal.'],
        ['Sudut pantul', 'Sudut antara berkas cahaya yang keluar dan garis normal. Besarnya sama dengan sudut datang.'],
        ['Berkas cahaya', 'Garis cahaya yang sempit, seperti cahaya dari senter.'],
      ],
    },
    misconceptions: {
      en: [
        ['Light stays inside the mirror or stops when it hits it.', 'Light bounces off the mirror and keeps travelling. That is why you can shine a torch at a mirror and light up the wall behind you.'],
        ['The angle is measured from the mirror surface.', 'Scientists measure both angles from the normal, the dotted line standing straight up from the mirror. Measured this way, the two angles are always equal.'],
        ['A mirror can bend light around a corner by itself.', 'A flat mirror only bounces light in one new straight line. To get around a wall you may need more than one mirror, like in Puzzle 2.'],
      ],
      id: [
        ['Cahaya tertahan di dalam cermin atau berhenti ketika mengenainya.', 'Cahaya memantul dari cermin dan terus merambat. Itulah sebabnya kamu bisa menyorot cermin dengan senter dan menerangi tembok di belakangmu.'],
        ['Sudut diukur dari permukaan cermin.', 'Ilmuwan mengukur kedua sudut dari garis normal, yaitu garis putus-putus yang tegak lurus pada cermin. Diukur dengan cara ini, kedua sudut selalu sama.'],
        ['Satu cermin bisa membelokkan cahaya mengitari sudut ruangan sendiri.', 'Cermin datar hanya memantulkan cahaya ke satu garis lurus baru. Untuk melewati tembok kamu mungkin perlu lebih dari satu cermin, seperti di Tekateki 2.'],
      ],
    },
    realWorld: {
      en: [
        'A periscope uses two mirrors so a submarine crew can see above the water.',
        'Car wing mirrors and bicycle mirrors let you see what is behind you by bouncing light to your eyes.',
        'Dentists use a small mirror on a stick to look at the back of your teeth.',
        'Road reflectors and cat\'s eyes bounce car headlights straight back to the driver.',
      ],
      id: [
        'Periskop memakai dua cermin agar awak kapal selam bisa melihat ke atas permukaan air.',
        'Kaca spion mobil dan sepeda membuatmu bisa melihat ke belakang dengan memantulkan cahaya ke matamu.',
        'Dokter gigi memakai cermin kecil bertangkai untuk melihat bagian belakang gigimu.',
        'Pemantul di jalan dan mata kucing memantulkan lampu mobil langsung kembali ke pengemudi.',
      ],
    },
    questions: {
      en: [
        { q: 'The beam hits a mirror with an angle in of 40 degrees. What is the angle out?', a: '40 degrees. On a flat mirror the angle of reflection always equals the angle of incidence.' },
        { q: 'You want the beam to bounce straight back to the torch. How should the mirror face?', a: 'The mirror must face the torch squarely, so the beam travels along the normal. Then both angles are 0 degrees and the light goes straight back.' },
        { q: 'In Puzzle 2 the target is behind a wall. Why is one mirror not enough?', a: 'One mirror only turns the beam once, into one new straight line, and the wall blocks that line. A second mirror can turn the beam again, down to the target.' },
      ],
      id: [
        { q: 'Berkas cahaya mengenai cermin dengan sudut masuk 40 derajat. Berapa sudut keluarnya?', a: '40 derajat. Pada cermin datar sudut pantul selalu sama dengan sudut datang.' },
        { q: 'Kamu ingin berkas cahaya memantul lurus kembali ke senter. Bagaimana cermin harus menghadap?', a: 'Cermin harus menghadap tepat ke senter, sehingga berkas merambat sepanjang garis normal. Kedua sudut menjadi 0 derajat dan cahaya kembali lurus.' },
        { q: 'Di Tekateki 2 sasaran berada di balik tembok. Mengapa satu cermin tidak cukup?', a: 'Satu cermin hanya membelokkan berkas sekali, menjadi satu garis lurus baru, dan tembok menghalangi garis itu. Cermin kedua bisa membelokkan berkas lagi, turun ke sasaran.' },
      ],
    },
  },
};
