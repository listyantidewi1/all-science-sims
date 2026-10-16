// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe that a seesaw tips towards the side that pushes down harder, and that a heavier weight pushes down harder.',
      'Discover that moving a weight further from the middle makes its side stronger, even if the weight stays the same.',
      'Find pairs of weight and distance that balance, and notice that weight times distance is the same on both sides.',
    ],
    id: [
      'Menjelaskan bahwa jungkat-jungkit miring ke sisi yang menekan lebih kuat, dan beban yang lebih berat menekan lebih kuat.',
      'Menemukan bahwa memindahkan beban lebih jauh dari tengah membuat sisinya lebih kuat, meskipun bebannya sama.',
      'Menemukan pasangan berat dan jarak yang seimbang, dan menyadari bahwa berat kali jarak sama di kedua sisi.',
    ],
  },
  tryThis: {
    en: [
      'Put 2 kg on each side, both at mark 3. Is it balanced? Now slide the right weight to mark 4. What happens?',
      'Set the left weight to 4 kg at mark 1. Can you balance it with a 1 kg weight? Where must the 1 kg go?',
      'Put 3 kg at mark 2 on the left. Find two different ways to balance it on the right.',
      'Turn on Show the numbers. Write down the two numbers every time the seesaw balances. What do you notice?',
    ],
    id: [
      'Letakkan 2 kg di tiap sisi, keduanya di tanda 3. Seimbang? Sekarang geser beban kanan ke tanda 4. Apa yang terjadi?',
      'Atur beban kiri 4 kg di tanda 1. Bisakah kamu menyeimbangkannya dengan beban 1 kg? Di mana 1 kg itu harus diletakkan?',
      'Letakkan 3 kg di tanda 2 di kiri. Temukan dua cara berbeda untuk menyeimbangkannya di kanan.',
      'Nyalakan Tampilkan angka. Tulis kedua angka setiap kali jungkat-jungkit seimbang. Apa yang kamu perhatikan?',
    ],
  },

  learn: {
    background: {
      en: [
        'A seesaw is a long plank that rests on a point in the middle, called the pivot. When a child sits on one end, that end goes down. When two children of the same weight sit at the same distance from the middle, the plank stays level: it is balanced. A seesaw is a kind of lever, one of the oldest and simplest machines.',
        'Two things decide how hard a side pushes the plank down: how heavy the weight is, and how far it is from the middle. A heavier weight pushes harder. A weight that is further from the middle also pushes harder, even though it has not got heavier. That is why a small child sitting at the very end can lift a bigger child who sits near the middle. In the sim, the bar next to each weight shows how strong that side is.',
        'The seesaw balances when the two sides are equally strong. If you turn on Show the numbers, you will see that the strength of a side is the weight multiplied by its distance from the middle: 2 kg at mark 3 gives 6, and so does 3 kg at mark 2, or 1 kg at mark 6. Scientists call this turning effect a moment or a torque. In the sim the seesaw tips slowly, like a real one, and a little rubber bump stops the plank when an end reaches the ground.',
      ],
      id: [
        'Jungkat-jungkit adalah papan panjang yang bertumpu pada satu titik di tengah, yang disebut titik tumpu. Saat seorang anak duduk di satu ujung, ujung itu turun. Saat dua anak dengan berat sama duduk pada jarak yang sama dari tengah, papan tetap datar: seimbang. Jungkat-jungkit adalah sejenis pengungkit, salah satu mesin paling tua dan paling sederhana.',
        'Dua hal menentukan seberapa kuat satu sisi menekan papan ke bawah: seberapa berat bebannya, dan seberapa jauh beban itu dari tengah. Beban yang lebih berat menekan lebih kuat. Beban yang lebih jauh dari tengah juga menekan lebih kuat, meskipun beratnya tidak bertambah. Itulah sebabnya anak kecil yang duduk di ujung paling luar bisa mengangkat anak yang lebih besar yang duduk dekat tengah. Di simulasi, batang di samping tiap beban menunjukkan seberapa kuat sisi itu.',
        'Jungkat-jungkit seimbang saat kedua sisi sama kuat. Jika kamu menyalakan Tampilkan angka, kamu akan melihat bahwa kekuatan satu sisi adalah berat dikalikan jaraknya dari tengah: 2 kg di tanda 3 menghasilkan 6, begitu juga 3 kg di tanda 2, atau 1 kg di tanda 6. Ilmuwan menyebut efek putar ini momen gaya atau torsi. Di simulasi, jungkat-jungkit miring perlahan seperti aslinya, dan bantalan karet kecil menahan papan saat ujungnya menyentuh tanah.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: the same weight on both sides at the same distance balances. Middle: moving the right weight further out makes the right side stronger, so it goes down. Bottom: a small weight far out balances a big weight close in, because 1 × 4 = 4 × 1.',
        id: 'Atas: beban sama di kedua sisi pada jarak sama membuat seimbang. Tengah: memindahkan beban kanan lebih jauh membuat sisi kanan lebih kuat, sehingga turun. Bawah: beban kecil yang jauh menyeimbangkan beban besar yang dekat, karena 1 × 4 = 4 × 1.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const seesaw = (cy, angle, lm, ld, rm, rd, label) => {
          const a = (angle * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
          const half = 110, cx = 180, step = 22;
          const px = (d) => (cx + d * step * c).toFixed(1), py = (d) => (cy + d * step * s).toFixed(1);
          const box = (m, d) => {
            const w = 8 + m * 4, h = 8 + m * 4;
            return `<rect x="${(Number(px(d)) - w / 2).toFixed(1)}" y="${(Number(py(d)) - h - 3).toFixed(1)}" width="${w}" height="${h}" rx="2" fill="${m > 2 ? '#ef4444' : '#3b82f6'}"/><text x="${px(d)}" y="${(Number(py(d)) - h - 6).toFixed(1)}" text-anchor="middle">${m} kg</text>`;
          };
          return `
  <line x1="${(cx - half * c).toFixed(1)}" y1="${(cy - half * s).toFixed(1)}" x2="${(cx + half * c).toFixed(1)}" y2="${(cy + half * s).toFixed(1)}" stroke="#a16207" stroke-width="6" stroke-linecap="round"/>
  <path d="M${cx - 12} ${cy + 22} L${cx} ${cy} L${cx + 12} ${cy + 22} Z" fill="currentColor" opacity=".8"/>
  ${box(lm, -ld)}${box(rm, rd)}
  <text x="12" y="${cy + 4}" class="l">${label}</text>`;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Three seesaws: balanced, tipped right, and balanced with unequal weights', 'Tiga jungkat-jungkit: seimbang, miring ke kanan, dan seimbang dengan beban berbeda')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.l{font:bold 11px system-ui,sans-serif;fill:currentColor}</style>
  ${seesaw(50, 0, 2, 3, 2, 3, L('balanced', 'seimbang'))}
  ${seesaw(125, 10, 2, 3, 2, 4, L('right is stronger', 'kanan lebih kuat'))}
  ${seesaw(205, 0, 4, 1, 1, 4, L('1 far = 4 near', '1 jauh = 4 dekat'))}
  <text x="180" y="236" text-anchor="middle">${L('strength of a side = weight × distance from the middle', 'kekuatan sisi = berat × jarak dari tengah')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A seesaw tips towards the side that pushes down harder.',
        'A heavier weight pushes down harder.',
        'A weight further from the middle pushes down harder too, even though it is not heavier.',
        'The seesaw balances when weight × distance is the same on both sides.',
        'A seesaw is a lever. A long lever lets a small push lift a heavy load.',
      ],
      id: [
        'Jungkat-jungkit miring ke sisi yang menekan ke bawah lebih kuat.',
        'Beban yang lebih berat menekan ke bawah lebih kuat.',
        'Beban yang lebih jauh dari tengah juga menekan lebih kuat, meskipun tidak lebih berat.',
        'Jungkat-jungkit seimbang saat berat × jarak sama di kedua sisi.',
        'Jungkat-jungkit adalah pengungkit. Pengungkit yang panjang membuat dorongan kecil bisa mengangkat beban berat.',
      ],
    },
    vocabulary: {
      en: [
        ['Pivot', 'The point in the middle that the seesaw rests and turns on.'],
        ['Balance', 'When the two sides are equally strong and the plank stays level.'],
        ['Lever', 'A stiff bar that turns on a pivot and helps lift or move things.'],
        ['Distance', 'How far the weight is from the pivot, counted in marks on the plank.'],
        ['Turning effect', 'How strongly a weight tries to turn the plank: weight × distance. Scientists call it a moment or torque.'],
      ],
      id: [
        ['Titik tumpu', 'Titik di tengah tempat jungkat-jungkit bertumpu dan berputar.'],
        ['Seimbang', 'Saat kedua sisi sama kuat dan papan tetap datar.'],
        ['Pengungkit', 'Batang kaku yang berputar pada titik tumpu dan membantu mengangkat atau memindahkan benda.'],
        ['Jarak', 'Seberapa jauh beban dari titik tumpu, dihitung dengan tanda di papan.'],
        ['Efek putar', 'Seberapa kuat beban mencoba memutar papan: berat × jarak. Ilmuwan menyebutnya momen gaya atau torsi.'],
      ],
    },
    misconceptions: {
      en: [
        ['The heavier side always goes down.', 'Not always. A 1 kg weight at mark 4 balances a 4 kg weight at mark 1, and at mark 5 it even lifts it. Distance matters as much as weight.'],
        ['Where a weight sits on the plank does not matter, only how heavy it is.', 'It matters a lot. Slide the same weight outwards and its side gets stronger and goes down.'],
        ['When the seesaw is balanced, the weights must be equal.', 'The turning effects must be equal, not the weights. Different weights balance at different distances.'],
      ],
      id: [
        ['Sisi yang lebih berat selalu turun.', 'Tidak selalu. Beban 1 kg di tanda 4 menyeimbangkan beban 4 kg di tanda 1, dan di tanda 5 bahkan mengangkatnya. Jarak sama pentingnya dengan berat.'],
        ['Letak beban di papan tidak penting, hanya beratnya yang penting.', 'Sangat penting. Geser beban yang sama ke luar, maka sisinya makin kuat dan turun.'],
        ['Saat jungkat-jungkit seimbang, bebannya pasti sama.', 'Efek putarnya yang harus sama, bukan beratnya. Beban berbeda seimbang pada jarak berbeda.'],
      ],
    },
    realWorld: {
      en: [
        'On a playground seesaw, a small child sits at the very end to balance a bigger friend sitting nearer the middle.',
        'A wheelbarrow is a lever: the long handles let you lift a heavy load with a small push.',
        'Scissors, pliers and nutcrackers are pairs of levers that turn a small squeeze into a strong one.',
        'An old-fashioned balance scale compares weights using a plank that must stay level.',
      ],
      id: [
        'Di jungkat-jungkit taman bermain, anak kecil duduk di ujung paling luar untuk menyeimbangkan teman yang lebih besar yang duduk lebih dekat ke tengah.',
        'Gerobak dorong adalah pengungkit: pegangan yang panjang membuatmu bisa mengangkat beban berat dengan dorongan kecil.',
        'Gunting, tang dan pemecah kacang adalah pasangan pengungkit yang mengubah remasan kecil menjadi kuat.',
        'Timbangan kuno membandingkan berat dengan papan yang harus tetap datar.',
      ],
    },
    questions: {
      en: [
        { q: 'There is 2 kg at mark 3 on the left. Where should 3 kg go on the right to balance?', a: 'At mark 2. Left is 2 × 3 = 6, and right is 3 × 2 = 6. Both sides are equally strong.' },
        { q: 'You slide a weight from mark 2 to mark 5 without changing it. What happens to the seesaw, and why?', a: 'That side goes down. The weight is the same, but it is further from the middle, so its turning effect is bigger.' },
        { q: 'Can 1 kg ever hold up 5 kg on this seesaw?', a: 'Only if 1 kg is at mark 5 and 5 kg is at mark 1: 1 × 5 = 5 × 1. Anywhere closer in, the 1 kg loses.' },
      ],
      id: [
        { q: 'Ada 2 kg di tanda 3 di kiri. Di mana 3 kg harus diletakkan di kanan agar seimbang?', a: 'Di tanda 2. Kiri 2 × 3 = 6, dan kanan 3 × 2 = 6. Kedua sisi sama kuat.' },
        { q: 'Kamu menggeser beban dari tanda 2 ke tanda 5 tanpa mengubahnya. Apa yang terjadi pada jungkat-jungkit, dan mengapa?', a: 'Sisi itu turun. Beratnya sama, tetapi lebih jauh dari tengah, jadi efek putarnya lebih besar.' },
        { q: 'Bisakah 1 kg menahan 5 kg di jungkat-jungkit ini?', a: 'Hanya jika 1 kg di tanda 5 dan 5 kg di tanda 1: 1 × 5 = 5 × 1. Jika lebih dekat ke tengah, 1 kg kalah.' },
      ],
    },
  },
};
