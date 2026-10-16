// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Name the four main compass directions (North, South, East, West) and the four in-between directions.',
      'Use compass directions and counted steps to describe a route on a grid map.',
      'Say in which direction one place lies from another, using the compass rose.',
    ],
    id: [
      'Menyebutkan empat arah mata angin utama (Utara, Selatan, Timur, Barat) dan empat arah di antaranya.',
      'Menggunakan arah mata angin dan jumlah langkah untuk menjelaskan rute pada peta berpetak.',
      'Menyebutkan arah suatu tempat dari tempat lain dengan menggunakan mawar kompas.',
    ],
  },
  tryThis: {
    en: [
      'Puzzle 1: before you press anything, say the route out loud, like "South 3, East 2". Then try it.',
      'Look at the compass rose. In which direction is the school from Adi right now?',
      'Puzzle 2: the river is in the way. Find the bridge and plan a route across it.',
      'Finish a puzzle, then press Start again and try to do it with fewer steps.',
    ],
    id: [
      'Tekateki 1: sebelum menekan apa pun, ucapkan rutenya, misalnya "Selatan 3, Timur 2". Lalu coba.',
      'Lihat mawar kompas. Ke arah mana sekolah dari posisi Adi sekarang?',
      'Tekateki 2: sungai menghalangi. Temukan jembatan dan rencanakan rute untuk menyeberang.',
      'Selesaikan satu tekateki, lalu tekan Mulai lagi dan coba dengan langkah yang lebih sedikit.',
    ],
  },

  learn: {
    background: {
      en: [
        'A map is a drawing of a place seen from above. To say where things are, we use the compass directions. The four main directions are North, East, South and West. On almost every map, North is at the top, so East is on the right, South is at the bottom and West is on the left. An easy way to remember the order going clockwise is Never Eat Soggy Waffles.',
        'Between the main directions are four more: North-East, South-East, South-West and North-West. All eight directions are shown on a drawing called a compass rose. A real compass has a magnetic needle that always points North, so once you know where North is, you can find every other direction.',
        'On a grid map we can describe a route with directions and counted steps, such as "East 3, South 2". The map in this sim has squares. Adi moves one square each step. If two routes both reach the goal, the one with fewer steps is shorter. Rivers can block the way, so you may need to go round by the bridge.',
        'The compass rose in the sim also points an arrow toward the place Adi is trying to reach. It tells you the direction, for example North-East, and the angle from North, for example 45 degrees. Sailors and pilots call this angle a bearing.',
      ],
      id: [
        'Peta adalah gambar suatu tempat yang dilihat dari atas. Untuk menyebutkan letak sesuatu, kita memakai arah mata angin. Empat arah utama adalah Utara, Timur, Selatan dan Barat. Pada hampir semua peta, Utara ada di atas, sehingga Timur di kanan, Selatan di bawah dan Barat di kiri. Urutannya searah jarum jam: Utara, Timur, Selatan, Barat.',
        'Di antara arah-arah utama ada empat arah lagi: Timur Laut, Tenggara, Barat Daya dan Barat Laut. Kedelapan arah ini digambarkan pada gambar yang disebut mawar kompas. Kompas sungguhan punya jarum magnet yang selalu menunjuk ke Utara, jadi kalau kamu tahu arah Utara, kamu bisa menemukan semua arah lainnya.',
        'Pada peta berpetak kita bisa menjelaskan rute dengan arah dan jumlah langkah, misalnya "Timur 3, Selatan 2". Peta di simulasi ini berpetak. Adi bergerak satu petak setiap langkah. Jika dua rute sama-sama sampai tujuan, rute dengan langkah lebih sedikit adalah yang lebih pendek. Sungai bisa menghalangi jalan, jadi kamu mungkin perlu memutar lewat jembatan.',
        'Mawar kompas di simulasi juga menunjuk dengan panah ke tempat yang ingin dicapai Adi. Panah itu memberitahu arahnya, misalnya Timur Laut, dan sudutnya dari Utara, misalnya 45 derajat. Pelaut dan pilot menyebut sudut ini arah haluan.',
      ],
    },
    figure: {
      caption: {
        en: 'A compass rose with the eight directions. North is at the top of the map. Going clockwise: North, North-East, East, South-East, South, South-West, West, North-West.',
        id: 'Mawar kompas dengan delapan arah mata angin. Utara ada di bagian atas peta. Searah jarum jam: Utara, Timur Laut, Timur, Tenggara, Selatan, Barat Daya, Barat, Barat Laut.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cx = 180, cy = 125, R = 78;
        const main = [[L('N', 'U'), 0], [L('E', 'T'), 90], [L('S', 'S'), 180], [L('W', 'B'), 270]];
        const inter = [[L('NE', 'TL'), 45], [L('SE', 'TG'), 135], [L('SW', 'BD'), 225], [L('NW', 'BL'), 315]];
        const pt = (deg, r) => { const a = (deg - 90) * Math.PI / 180; return `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`; };
        let star = '';
        for (const [, d] of inter) star += `<path d="M${pt(d, R * 0.62)} L${pt(d + 25, R * 0.14)} L${pt(d - 25, R * 0.14)} Z" fill="currentColor" opacity="0.35"/>`;
        for (const [, d] of main) star += `<path d="M${pt(d, R)} L${pt(d + 18, R * 0.2)} L${pt(d - 18, R * 0.2)} Z" fill="${d === 0 ? '#ef4444' : 'currentColor'}" opacity="${d === 0 ? 1 : 0.8}"/>`;
        let labels = '';
        for (const [n, d] of main) labels += `<text x="${pt(d, R + 16).split(' ')[0]}" y="${+pt(d, R + 16).split(' ')[1] + 4}" font-weight="bold" font-size="14">${n}</text>`;
        for (const [n, d] of inter) labels += `<text x="${pt(d, R * 0.62 + 16).split(' ')[0]}" y="${+pt(d, R * 0.62 + 16).split(' ')[1] + 4}" font-size="11">${n}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Compass rose with eight directions', 'Mawar kompas dengan delapan arah mata angin')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}</style>
  <circle cx="${cx}" cy="${cy}" r="${R + 4}" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>
  ${star}
  <circle cx="${cx}" cy="${cy}" r="5" fill="currentColor"/>
  ${labels}
  <text x="40" y="20" font-size="11">${L('North is at the top of the map', 'Utara di bagian atas peta')}</text>
  <text x="300" y="232" font-size="11">${L('clockwise: N, E, S, W', 'searah jarum jam: U, T, S, B')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The four main compass directions are North, East, South and West. On a map, North is usually at the top.',
        'Between them are North-East, South-East, South-West and North-West, making eight directions in all.',
        'A compass rose is the drawing on a map that shows the directions.',
        'A route can be described with directions and steps, like "East 3, South 2".',
        'The shortest route uses the fewest steps, but rivers and other obstacles may force you to go round.',
      ],
      id: [
        'Empat arah mata angin utama adalah Utara, Timur, Selatan dan Barat. Pada peta, Utara biasanya di atas.',
        'Di antaranya ada Timur Laut, Tenggara, Barat Daya dan Barat Laut, sehingga semuanya delapan arah.',
        'Mawar kompas adalah gambar pada peta yang menunjukkan arah mata angin.',
        'Rute bisa dijelaskan dengan arah dan langkah, misalnya "Timur 3, Selatan 2".',
        'Rute terpendek memakai langkah paling sedikit, tetapi sungai dan penghalang lain bisa memaksamu memutar.',
      ],
    },
    vocabulary: {
      en: [
        ['Map', 'A drawing of a place as seen from above.'],
        ['Compass', 'A tool with a magnetic needle that always points North.'],
        ['Compass rose', 'The drawing on a map that shows North, East, South, West and the directions in between.'],
        ['Route', 'The way you travel from one place to another.'],
        ['Bearing', 'The direction to a place measured as an angle from North, going clockwise. East is 90 degrees.'],
        ['Landmark', 'An easy-to-see place that helps you find your way, like a mosque or a school.'],
      ],
      id: [
        ['Peta', 'Gambar suatu tempat seperti dilihat dari atas.'],
        ['Kompas', 'Alat dengan jarum magnet yang selalu menunjuk ke Utara.'],
        ['Mawar kompas', 'Gambar pada peta yang menunjukkan Utara, Timur, Selatan, Barat dan arah di antaranya.'],
        ['Rute', 'Jalan yang kamu tempuh dari satu tempat ke tempat lain.'],
        ['Arah haluan', 'Arah ke suatu tempat yang diukur sebagai sudut dari Utara, searah jarum jam. Timur adalah 90 derajat.'],
        ['Penanda tempat', 'Tempat yang mudah dilihat dan membantumu menemukan jalan, seperti masjid atau sekolah.'],
      ],
    },
    misconceptions: {
      en: [
        ['North is wherever I am facing, or always "up" in real life.', 'North is a fixed direction on the Earth. On a map it is drawn at the top, but when you walk, North stays the same whichever way you turn.'],
        ['East is on the left because that is where the Sun rises when I look at the map.', 'With North at the top, East is on the right. Remember the clockwise order: North, East, South, West.'],
        ['The shortest route is always the straight line.', 'On a map with obstacles like a river, the straight line may be blocked. The shortest route you can actually walk might go round by the bridge.'],
      ],
      id: [
        ['Utara adalah arah yang sedang kuhadapi, atau selalu "ke atas" di dunia nyata.', 'Utara adalah arah tetap di Bumi. Pada peta digambar di atas, tetapi saat kamu berjalan, Utara tetap sama ke mana pun kamu berputar.'],
        ['Timur ada di kiri karena di sanalah matahari terbit saat aku melihat peta.', 'Dengan Utara di atas, Timur ada di kanan. Ingat urutan searah jarum jam: Utara, Timur, Selatan, Barat.'],
        ['Rute terpendek selalu garis lurus.', 'Pada peta dengan penghalang seperti sungai, garis lurus bisa terhalang. Rute terpendek yang benar-benar bisa dilalui mungkin memutar lewat jembatan.'],
      ],
    },
    realWorld: {
      en: [
        'The Sun rises in the East and sets in the West, so in the morning your shadow points West.',
        'Muslims in Indonesia face roughly North-West to pray, because that is the direction of Mecca from Indonesia.',
        'Phone map apps show a small compass arrow so you know which way you are facing.',
        'Sailors, pilots and hikers use bearings in degrees to steer in the right direction.',
      ],
      id: [
        'Matahari terbit di Timur dan terbenam di Barat, jadi di pagi hari bayanganmu menunjuk ke Barat.',
        'Umat Islam di Indonesia menghadap kira-kira ke Barat Laut saat salat, karena itulah arah Mekah dari Indonesia.',
        'Aplikasi peta di ponsel menampilkan panah kompas kecil agar kamu tahu arah yang kamu hadapi.',
        'Pelaut, pilot dan pendaki memakai arah haluan dalam derajat untuk mengarahkan perjalanan.',
      ],
    },
    questions: {
      en: [
        { q: 'Adi walks North 2 steps and then East 3 steps. Describe the shortest way back home.', a: 'West 3 steps and South 2 steps (or South 2 then West 3). Going back means using the opposite directions.' },
        { q: 'The compass arrow says the mosque is South-East of Adi. If he walks only East, will he reach it?', a: 'No. South-East means he must also go South. He needs some East steps and some South steps.' },
        { q: 'The market is straight East of Adi, but the river is in between. What should he do?', a: 'Walk to the bridge first, cross it, and then go on to the market. The route is longer than the straight line but it is the shortest one he can walk.' },
      ],
      id: [
        { q: 'Adi berjalan 2 langkah ke Utara lalu 3 langkah ke Timur. Jelaskan jalan terpendek untuk pulang.', a: '3 langkah ke Barat dan 2 langkah ke Selatan (atau Selatan 2 dulu lalu Barat 3). Pulang berarti memakai arah yang berlawanan.' },
        { q: 'Panah kompas menunjukkan masjid ada di Tenggara Adi. Jika Adi hanya berjalan ke Timur, apakah ia sampai?', a: 'Tidak. Tenggara berarti ia juga harus ke Selatan. Ia perlu beberapa langkah ke Timur dan beberapa langkah ke Selatan.' },
        { q: 'Pasar tepat di Timur Adi, tetapi ada sungai di antaranya. Apa yang harus ia lakukan?', a: 'Berjalan dulu ke jembatan, menyeberang, lalu lanjut ke pasar. Rutenya lebih panjang dari garis lurus, tetapi itulah rute terpendek yang bisa ia lalui.' },
      ],
    },
  },
};
