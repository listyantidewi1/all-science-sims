// Long-form text for the sim page aside, written for the teacher.
export default {
  objectives: {
    en: [
      'Put the stages of a butterfly, frog, and bean plant life cycle in order.',
      'Explain why a life cycle is drawn as a ring: the adult makes new eggs or seeds.',
      'Compare the three cycles: which animals change shape completely, and which stage lasts longest.',
    ],
    id: [
      'Mengurutkan tahapan daur hidup kupu-kupu, katak, dan tanaman kacang.',
      'Menjelaskan mengapa daur hidup digambar sebagai lingkaran: yang dewasa membuat telur atau biji baru.',
      'Membandingkan ketiga daur: hewan mana yang berubah bentuk sepenuhnya, dan tahap mana yang paling lama.',
    ],
  },
  tryThis: {
    en: [
      'Before dragging, say the order out loud. Then build the ring and see if it comes alive.',
      'Use Watch mode and pause on the stage you find most surprising. What is changing?',
      'Record the days for each stage in the lab. Which stage is the longest for the frog?',
    ],
    id: [
      'Sebelum menyeret, sebutkan urutannya dengan lantang. Lalu susun lingkarannya dan lihat apakah daurnya hidup.',
      'Pakai mode Tonton dan berhenti di tahap yang paling mengejutkan. Apa yang berubah?',
      'Catat jumlah hari tiap tahap di lab. Tahap mana yang paling lama untuk katak?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Every living thing starts small, grows up, and makes new living things like itself. The steps it goes through are called its life cycle. We draw a life cycle as a ring, not a line, because it never really ends. A butterfly lays eggs, the eggs become caterpillars, the caterpillars become butterflies, and those butterflies lay eggs too. The ring goes round and round, year after year.',
        'In this sim you pick a butterfly, a frog or a bean plant. The four stage cards come out mixed up. Drag each card into the ring. The arrows show which way the cycle goes. If two cards are in the wrong order, the arrow between them turns red. When all four are right, a dot runs round the ring to show the cycle is alive. Press Watch the cycle to see one stage at a time, big, with its name. The lab lets you write down about how many days each stage lasts.',
        'Real life is a bit messier than four cards. A frog egg hatches into a tadpole with a tail and no legs, then slowly grows legs and loses its tail, so "froglet" is really many small changes, not one jump. The number of days is a rough guide. A butterfly egg may hatch in a few days or a few weeks depending on the kind of butterfly and how warm it is, and a frog can live for many years. The sim also shows just one plant and two animals; worms, fish, birds and people have life cycles too.',
      ],
      id: [
        'Setiap makhluk hidup mulai dari kecil, tumbuh besar, lalu menghasilkan makhluk hidup baru yang serupa dengannya. Langkah-langkah yang dilaluinya disebut daur hidup. Kita menggambar daur hidup sebagai lingkaran, bukan garis, karena daur itu tidak pernah benar-benar berakhir. Kupu-kupu bertelur, telur menjadi ulat, ulat menjadi kupu-kupu, dan kupu-kupu itu bertelur lagi. Lingkarannya berputar terus, tahun demi tahun.',
        'Di sim ini kamu memilih kupu-kupu, katak, atau tanaman kacang. Empat kartu tahap muncul dalam urutan acak. Seret tiap kartu ke dalam lingkaran. Panahnya menunjukkan arah daur. Kalau dua kartu urutannya salah, panah di antaranya berubah merah. Kalau keempatnya benar, sebuah titik berlari mengitari lingkaran untuk menunjukkan daurnya hidup. Tekan Tonton daur untuk melihat satu tahap dalam ukuran besar beserta namanya. Lab membantumu mencatat kira-kira berapa hari tiap tahap berlangsung.',
        'Kehidupan nyata sedikit lebih rumit daripada empat kartu. Telur katak menetas menjadi berudu yang berekor dan tidak berkaki, lalu perlahan tumbuh kaki dan kehilangan ekornya, jadi "katak muda" sebenarnya adalah banyak perubahan kecil, bukan satu lompatan. Jumlah harinya hanya perkiraan kasar. Telur kupu-kupu bisa menetas dalam beberapa hari atau beberapa minggu, tergantung jenis kupu-kupu dan hangatnya cuaca, dan katak bisa hidup bertahun-tahun. Sim ini juga hanya menunjukkan satu tumbuhan dan dua hewan; cacing, ikan, burung, dan manusia juga punya daur hidup.',
      ],
    },
    figure: {
      caption: {
        en: 'Three life cycles drawn as rings. The arrows always come back to the start, because the grown-up makes new eggs or seeds.',
        id: 'Tiga daur hidup digambar sebagai lingkaran. Panahnya selalu kembali ke awal, karena yang dewasa membuat telur atau biji baru.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const ring = (cx, cy, color, stages, title) => `
  <path d="M${cx} ${cy - 46} A46 46 0 0 1 ${cx + 46} ${cy}" class="r" stroke="${color}" marker-end="url(#lc)"/>
  <path d="M${cx + 46} ${cy} A46 46 0 0 1 ${cx} ${cy + 46}" class="r" stroke="${color}" marker-end="url(#lc)"/>
  <path d="M${cx} ${cy + 46} A46 46 0 0 1 ${cx - 46} ${cy}" class="r" stroke="${color}" marker-end="url(#lc)"/>
  <path d="M${cx - 46} ${cy} A46 46 0 0 1 ${cx} ${cy - 46}" class="r" stroke="${color}" marker-end="url(#lc)"/>
  <text x="${cx}" y="${cy - 54}" text-anchor="middle">${stages[0]}</text>
  <text x="${cx + 50}" y="${cy + 4}">${stages[1]}</text>
  <text x="${cx}" y="${cy + 62}" text-anchor="middle">${stages[2]}</text>
  <text x="${cx - 50}" y="${cy + 4}" text-anchor="end">${stages[3]}</text>
  <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-weight="bold" fill="${color}">${title}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Life cycle rings for a butterfly, a frog and a bean plant', 'Lingkaran daur hidup kupu-kupu, katak, dan tanaman kacang')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.r{fill:none;stroke-width:3;stroke-linecap:round}</style>
  ${ring(72, 120, '#f59e0b', [L('egg', 'telur'), L('caterpillar', 'ulat'), L('chrysalis', 'kepompong'), L('butterfly', 'kupu-kupu')], L('butterfly', 'kupu-kupu'))}
  ${ring(188, 120, '#10b981', [L('egg', 'telur'), L('tadpole', 'berudu'), L('froglet', 'katak muda'), L('frog', 'katak')], L('frog', 'katak'))}
  ${ring(304, 120, '#8b5cf6', [L('seed', 'biji'), L('sprout', 'tunas'), L('young plant', 'tanaman muda'), L('flowering plant', 'berbunga')], L('bean', 'kacang'))}
  <text x="180" y="22" text-anchor="middle" font-size="11">${L('Round and round: the grown-up makes new eggs or seeds', 'Berputar terus: yang dewasa membuat telur atau biji baru')}</text>
  <text x="180" y="228" text-anchor="middle" font-size="10">${L('Each arrow means "grows into". The ring never ends.', 'Setiap panah berarti "tumbuh menjadi". Lingkarannya tidak pernah berakhir.')}</text>
  <defs><marker id="lc" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A life cycle is the set of stages a living thing goes through: it starts small, grows, and makes new ones like itself.',
        'A life cycle is drawn as a ring because the grown-up lays eggs or makes seeds, and the cycle starts again.',
        'A butterfly and a frog change shape completely as they grow; a bean plant just gets bigger and adds new parts.',
        'Different stages last different amounts of time, and different living things have cycles of different lengths.',
      ],
      id: [
        'Daur hidup adalah rangkaian tahap yang dilalui makhluk hidup: mulai kecil, tumbuh, lalu menghasilkan makhluk baru yang serupa.',
        'Daur hidup digambar sebagai lingkaran karena yang dewasa bertelur atau membuat biji, dan daurnya mulai lagi.',
        'Kupu-kupu dan katak berubah bentuk sepenuhnya saat tumbuh; tanaman kacang hanya menjadi lebih besar dan menambah bagian baru.',
        'Tiap tahap berlangsung dengan lama yang berbeda, dan makhluk hidup yang berbeda punya daur dengan panjang yang berbeda.',
      ],
    },
    vocabulary: {
      en: [
        ['Life cycle', 'The stages a living thing goes through from the start of its life until it makes new living things.'],
        ['Egg', 'The first stage of a butterfly or a frog; a baby animal grows inside it.'],
        ['Caterpillar', 'The young butterfly, which eats leaves and grows very fast.'],
        ['Chrysalis', 'The hard case a caterpillar makes around itself while it changes into a butterfly.'],
        ['Tadpole', 'The young frog, which lives in water, has a tail and no legs, and breathes like a fish.'],
        ['Seed', 'The first stage of a plant; a tiny plant and its food are packed inside.'],
      ],
      id: [
        ['Daur hidup', 'Tahap-tahap yang dilalui makhluk hidup dari awal hidupnya sampai menghasilkan makhluk hidup baru.'],
        ['Telur', 'Tahap pertama kupu-kupu atau katak; bayi hewan tumbuh di dalamnya.'],
        ['Ulat', 'Kupu-kupu muda, yang makan daun dan tumbuh sangat cepat.'],
        ['Kepompong', 'Selubung keras yang dibuat ulat di sekeliling tubuhnya saat berubah menjadi kupu-kupu.'],
        ['Berudu', 'Katak muda, yang hidup di air, punya ekor dan belum berkaki, dan bernapas seperti ikan.'],
        ['Biji', 'Tahap pertama tumbuhan; tumbuhan kecil dan makanannya terbungkus di dalamnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['A caterpillar and a butterfly are two different animals.', 'They are the same animal at two stages of its life, just as a tadpole and a frog are. The caterpillar changes into the butterfly inside the chrysalis.'],
        ['The life cycle ends when the animal is grown up.', 'The grown-up lays new eggs, so the cycle starts again. That is why we draw it as a ring with arrows all the way round.'],
        ['A seed is not alive.', 'A seed is a tiny living plant that is resting. Give it water and warmth and it wakes up and starts to grow.'],
      ],
      id: [
        ['Ulat dan kupu-kupu adalah dua hewan yang berbeda.', 'Keduanya adalah hewan yang sama pada dua tahap hidupnya, seperti berudu dan katak. Ulat berubah menjadi kupu-kupu di dalam kepompong.'],
        ['Daur hidup berakhir ketika hewan sudah dewasa.', 'Yang dewasa bertelur lagi, jadi daurnya mulai dari awal. Itulah sebabnya kita menggambarnya sebagai lingkaran dengan panah mengitari seluruhnya.'],
        ['Biji itu tidak hidup.', 'Biji adalah tumbuhan kecil yang hidup dan sedang beristirahat. Beri air dan kehangatan, biji akan bangun dan mulai tumbuh.'],
      ],
    },
    realWorld: {
      en: [
        'Farmers keep some seeds from each harvest to plant the next year, which uses the plant life cycle on purpose.',
        'Mosquitoes lay eggs in still water and their young grow there, so tipping out old water in buckets and pots breaks their life cycle.',
        'Many butterflies spend the winter as a chrysalis and come out in spring when there are flowers to feed on.',
        'Frogs lay their eggs in ponds in the rainy season, and you can often hear the grown-ups calling at night.',
      ],
      id: [
        'Petani menyimpan sebagian biji dari tiap panen untuk ditanam tahun berikutnya; ini memanfaatkan daur hidup tumbuhan dengan sengaja.',
        'Nyamuk bertelur di air yang tergenang dan anak-anaknya tumbuh di sana, jadi membuang air lama di ember dan pot memutus daur hidupnya.',
        'Banyak kupu-kupu melewati musim dingin sebagai kepompong dan keluar di musim semi saat sudah ada bunga untuk dimakan.',
        'Katak bertelur di kolam pada musim hujan, dan kamu sering bisa mendengar katak dewasa bersuara di malam hari.',
      ],
    },
    questions: {
      en: [
        { q: 'Look at the frog cycle in Watch mode. Which stage lasts the longest, and how do you know from the lab table?', a: 'The grown-up frog, which can live for years. The table says "years" for that stage, while the tadpole stage is about 60 days and the egg about 7 days.' },
        { q: 'Which of the three living things changes its shape the most as it grows? Which changes the least?', a: 'The butterfly changes the most: an egg, a crawling caterpillar, a still chrysalis and then a flying butterfly look nothing alike. The frog also changes a lot, from a swimming tadpole to a jumping frog. The bean plant changes the least; it mostly gets taller and adds leaves and flowers.' },
        { q: 'When you put two cards in the wrong order, what does the ring show you, and why does the sim only cheer when all four are right?', a: 'The arrow between the wrong cards turns red. The sim waits for all four because a life cycle only works if every stage leads to the next one, all the way round, with the grown-up making the next eggs or seeds.' },
      ],
      id: [
        { q: 'Lihat daur katak dalam mode Tonton. Tahap mana yang paling lama, dan bagaimana kamu tahu dari tabel lab?', a: 'Katak dewasa, yang bisa hidup bertahun-tahun. Tabel menulis "tahun" untuk tahap itu, sementara tahap berudu sekitar 60 hari dan telur sekitar 7 hari.' },
        { q: 'Dari ketiga makhluk hidup, mana yang bentuknya paling banyak berubah saat tumbuh? Mana yang paling sedikit berubah?', a: 'Kupu-kupu paling banyak berubah: telur, ulat yang merayap, kepompong yang diam, lalu kupu-kupu yang terbang tampak sama sekali berbeda. Katak juga banyak berubah, dari berudu yang berenang menjadi katak yang melompat. Tanaman kacang paling sedikit berubah; ia hanya makin tinggi dan menambah daun serta bunga.' },
        { q: 'Saat dua kartu urutannya salah, apa yang ditunjukkan lingkaran, dan mengapa sim hanya bersorak kalau keempatnya benar?', a: 'Panah di antara kartu yang salah berubah merah. Sim menunggu keempatnya karena daur hidup hanya berjalan kalau setiap tahap mengarah ke tahap berikutnya, mengitari seluruh lingkaran, dengan yang dewasa membuat telur atau biji berikutnya.' },
      ],
    },
  },
};
