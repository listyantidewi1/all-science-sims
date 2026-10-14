// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Total magnification = ocular × objective.',
      'Focus by adjusting the distance between specimen and objective.',
      'Higher magnification → narrower field of view, less depth of field.',
    ],
    id: [
      'Perbesaran total = okuler × objektif.',
      'Fokus dengan mengatur jarak antara spesimen dan objektif.',
      'Perbesaran lebih tinggi → bidang pandang lebih sempit, kedalaman lebih dangkal.',
    ],
  },
  tryThis: {
    en: [
      '4× scanning — find your specimen first.',
      '40× high power — count individual cells.',
      'Defocus — see how blur scales with magnification.',
    ],
    id: [
      '4× pemindaian — cari spesimen Anda dulu.',
      '40× perbesaran tinggi — hitung sel individu.',
      'Tidak fokus — lihat bagaimana kabur berskala dengan perbesaran.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A compound microscope uses two lenses, one after the other. The objective lens sits just above the specimen and makes an enlarged image of it; the eyepiece (also called the ocular) then enlarges that image again for your eye. The two enlargements multiply: a 10× eyepiece with a 40× objective gives 10 × 40 = 400×. Light shines up from below through the specimen, so specimens must be very thin, and most are stained with dyes so that their parts show up against the bright background.',
        'In the sim you choose a slide, pick an objective (4×, 10×, 40× or 100× oil) and turn the focus knob until the image is sharp. Focusing means moving the specimen to just the right distance from the objective; the sim reports "in focus" when the knob is at that sweet spot. Good practice is to start with the lowest power, because its wide field of view makes the specimen easy to find, then centre what you want and switch up. Each switch needs refocusing, so the sim nudges the focus a little whenever you change objectives, just as real microscopes do. At high power the image goes blurry with only a tiny turn of the knob, because the depth of field is very shallow; that is why real microscopes have a separate fine-focus knob.',
        'The sim simplifies a lot. One knob stands in for both coarse and fine focus, and the cells are drawn patterns, not photographs. Cells do grow on screen as magnification rises, but not in true proportion: the sim scales them with the square root of the magnification, so 400× looks only about three times larger than 40× instead of ten times. There is no stage to move the slide, no light or diaphragm control, and no limit on detail, whereas a real light microscope cannot show anything smaller than about 0.2 micrometres however much you magnify. The 100× objective would need a drop of immersion oil between lens and slide in real life.',
      ],
      id: [
        'Mikroskop majemuk memakai dua lensa secara berurutan. Lensa objektif berada tepat di atas spesimen dan membuat bayangan yang diperbesar; lensa okuler (lensa mata) kemudian memperbesar bayangan itu lagi untuk matamu. Kedua perbesaran itu dikalikan: okuler 10× dengan objektif 40× menghasilkan 10 × 40 = 400×. Cahaya datang dari bawah menembus spesimen, sehingga spesimen harus sangat tipis, dan kebanyakan diwarnai dengan zat pewarna agar bagian-bagiannya tampak jelas di latar yang terang.',
        'Dalam simulasi kamu memilih slide, memilih objektif (4×, 10×, 40×, atau 100× minyak), dan memutar kenop fokus sampai gambar tajam. Memfokus berarti menggerakkan spesimen ke jarak yang tepat dari objektif; simulasi menampilkan "fokus" ketika kenop berada di titik yang pas. Kebiasaan yang baik adalah mulai dari perbesaran terendah, karena bidang pandangnya yang lebar memudahkan menemukan spesimen, lalu letakkan bagian yang kamu inginkan di tengah dan naikkan perbesaran. Tiap pergantian perlu fokus ulang, sehingga simulasi sedikit menggeser fokus setiap kali kamu mengganti objektif, seperti mikroskop sungguhan. Pada perbesaran tinggi gambar menjadi kabur hanya dengan putaran kenop yang sangat kecil, karena kedalaman fokusnya sangat dangkal; itulah sebabnya mikroskop sungguhan punya kenop fokus halus yang terpisah.',
        'Simulasi ini banyak menyederhanakan. Satu kenop mewakili fokus kasar dan fokus halus sekaligus, dan sel-selnya adalah pola gambar, bukan foto. Sel memang membesar di layar saat perbesaran naik, tetapi tidak sebanding sungguhan: simulasi menskalakannya dengan akar kuadrat perbesaran, sehingga 400× hanya tampak sekitar tiga kali lebih besar daripada 40×, bukan sepuluh kali. Tidak ada meja preparat untuk menggeser slide, tidak ada pengatur cahaya atau diafragma, dan tidak ada batas detail, padahal mikroskop cahaya sungguhan tidak bisa menampilkan apa pun yang lebih kecil dari sekitar 0,2 mikrometer berapa pun perbesarannya. Objektif 100× di dunia nyata membutuhkan setetes minyak imersi di antara lensa dan slide.',
      ],
    },
    figure: {
      caption: {
        en: 'Light passes up through the thin specimen into the objective, which forms an enlarged image; the eyepiece enlarges that image again. The two magnifications multiply, and the field of view shrinks as the total grows.',
        id: 'Cahaya naik menembus spesimen tipis ke lensa objektif, yang membentuk bayangan diperbesar; lensa okuler memperbesar bayangan itu lagi. Kedua perbesaran dikalikan, dan bidang pandang menyempit saat perbesaran total bertambah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Light path through a compound microscope', 'Jalur cahaya dalam mikroskop majemuk')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font-weight:700}.s{font-size:9.5px;opacity:.75}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.ray{stroke:#f59e0b;stroke-width:1.5;fill:none;opacity:.9}</style>
  <rect x="80" y="206" width="80" height="12" rx="3" fill="#f59e0b" opacity=".6"/>
  <text x="120" y="232" text-anchor="middle" class="s">${L('light source', 'sumber cahaya')}</text>
  <path d="M100 206 L112 176 M140 206 L128 176" class="ray"/>
  <rect x="70" y="170" width="100" height="6" fill="currentColor" opacity=".35"/>
  <rect x="108" y="166" width="24" height="4" fill="#10b981"/>
  <text x="178" y="176" class="s">${L('thin specimen on slide', 'spesimen tipis di slide')}</text>
  <ellipse cx="120" cy="136" rx="26" ry="8" fill="#3b82f6" opacity=".45" stroke="#3b82f6"/>
  <text x="178" y="140" class="b" fill="#3b82f6">${L('objective 4×, 10×, 40×, 100×', 'objektif 4×, 10×, 40×, 100×')}</text>
  <path d="M112 166 L100 136 L92 92 M128 166 L140 136 L148 92" class="ray"/>
  <line x1="92" y1="92" x2="148" y2="92" stroke="#3b82f6" stroke-width="1.2" stroke-dasharray="3 2"/>
  <text x="178" y="96" class="s">${L('first enlarged image', 'bayangan pertama (diperbesar)')}</text>
  <ellipse cx="120" cy="56" rx="26" ry="8" fill="#8b5cf6" opacity=".45" stroke="#8b5cf6"/>
  <text x="178" y="60" class="b" fill="#8b5cf6">${L('eyepiece 10×', 'okuler 10×')}</text>
  <path d="M92 92 L110 56 L118 26 M148 92 L130 56 L122 26" class="ray"/>
  <path d="M104 22 Q120 10 136 22 Q120 32 104 22" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="120" cy="22" r="4" fill="currentColor"/>
  <text x="178" y="26" class="s">${L('eye sees image enlarged twice', 'mata melihat bayangan yang diperbesar dua kali')}</text>
  <rect x="236" y="108" width="116" height="52" rx="6" class="m"/>
  <text x="294" y="124" text-anchor="middle" class="b">${L('total magnification', 'perbesaran total')}</text>
  <text x="294" y="140" text-anchor="middle">= ${L('eyepiece × objective', 'okuler × objektif')}</text>
  <text x="294" y="154" text-anchor="middle" fill="#10b981" class="b">10 × 40 = 400×</text>
  <circle cx="262" cy="196" r="20" class="m"/>
  <circle cx="262" cy="196" r="4" fill="#10b981"/>
  <circle cx="262" cy="186" r="3" fill="#10b981"/>
  <circle cx="272" cy="200" r="3" fill="#10b981"/>
  <circle cx="252" cy="202" r="3" fill="#10b981"/>
  <text x="262" y="226" text-anchor="middle" class="s">40×: ${L('wide view', 'pandangan luas')}</text>
  <circle cx="322" cy="196" r="20" class="m"/>
  <circle cx="322" cy="196" r="13" fill="#10b981" opacity=".8"/>
  <text x="322" y="226" text-anchor="middle" class="s">400×: ${L('one cell fills it', 'satu sel memenuhi')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Total magnification is the eyepiece magnification multiplied by the objective magnification.',
        'Always find and centre the specimen at low power first, then switch to higher power.',
        'Higher magnification shows a smaller area (narrower field of view) and needs more careful focusing (shallower depth of field).',
        'Magnification makes things look bigger; resolution is how fine the detail is, and a light microscope has a limit of about 0.2 micrometres.',
        'Specimens must be thin and are often stained so light can pass through and the parts stand out.',
      ],
      id: [
        'Perbesaran total adalah perbesaran okuler dikalikan perbesaran objektif.',
        'Selalu temukan dan tengahkan spesimen pada perbesaran rendah dulu, baru pindah ke perbesaran lebih tinggi.',
        'Perbesaran lebih tinggi memperlihatkan area lebih kecil (bidang pandang lebih sempit) dan menuntut pemfokusan lebih hati-hati (kedalaman fokus lebih dangkal).',
        'Perbesaran membuat benda tampak lebih besar; resolusi adalah sehalus apa detail yang terlihat, dan mikroskop cahaya punya batas sekitar 0,2 mikrometer.',
        'Spesimen harus tipis dan sering diwarnai agar cahaya bisa menembus dan bagian-bagiannya tampak jelas.',
      ],
    },
    vocabulary: {
      en: [
        ['Objective lens', 'The lens closest to the specimen; microscopes carry several (4×, 10×, 40×, 100×) on a rotating nosepiece.'],
        ['Eyepiece (ocular)', 'The lens you look through, usually 10×.'],
        ['Total magnification', 'How many times larger the image appears: eyepiece × objective.'],
        ['Field of view', 'The circular area of the specimen you can see at once; it gets smaller as magnification increases.'],
        ['Depth of field', 'How much thickness of the specimen is in focus at the same time; it gets shallower at high power.'],
        ['Focus', 'Adjusting the distance between specimen and objective until the image is sharp; coarse for big moves, fine for small ones.'],
        ['Stain', 'A dye added to a specimen so that cell parts show up more clearly.'],
        ['Resolution', 'The smallest detail a microscope can show as separate; about 0.2 micrometres for light microscopes.'],
      ],
      id: [
        ['Lensa objektif', 'Lensa yang paling dekat dengan spesimen; mikroskop membawa beberapa (4×, 10×, 40×, 100×) pada revolver yang bisa diputar.'],
        ['Lensa okuler', 'Lensa tempat kamu mengintip, biasanya 10×.'],
        ['Perbesaran total', 'Berapa kali lebih besar bayangan tampak: okuler × objektif.'],
        ['Bidang pandang', 'Area lingkaran spesimen yang terlihat sekaligus; semakin kecil saat perbesaran bertambah.'],
        ['Kedalaman fokus', 'Seberapa tebal bagian spesimen yang fokus pada saat yang sama; semakin dangkal pada perbesaran tinggi.'],
        ['Fokus', 'Mengatur jarak spesimen dan objektif sampai bayangan tajam; kasar untuk gerakan besar, halus untuk gerakan kecil.'],
        ['Pewarna', 'Zat warna yang ditambahkan ke spesimen agar bagian sel tampak lebih jelas.'],
        ['Resolusi', 'Detail terkecil yang bisa ditampilkan mikroskop secara terpisah; sekitar 0,2 mikrometer untuk mikroskop cahaya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Higher magnification is always better.', 'At high power you see a tiny area, the image is dimmer and focusing is fussy. Start low to find the specimen; go high only to study a detail you have already centred.'],
        ['Magnification and resolution are the same thing.', 'Magnification only enlarges. If two dots are closer than the microscope can resolve, enlarging them just gives one bigger blurry dot. That is why electron microscopes, not stronger lenses, are needed for viruses.'],
        ['You can see anything if you magnify enough.', 'Light microscopes cannot resolve detail finer than about 0.2 micrometres. Bacteria are visible, but viruses and most cell membranes are not.'],
        ['The microscope image is just the specimen made bigger, the same way round.', 'A compound microscope flips the image: move the slide left and the image moves right. The sim has no stage to show this, but you will meet it on a real microscope.'],
      ],
      id: [
        ['Perbesaran lebih tinggi selalu lebih baik.', 'Pada perbesaran tinggi kamu hanya melihat area kecil, gambarnya lebih redup, dan memfokusnya rewel. Mulailah dari perbesaran rendah untuk menemukan spesimen; naik ke perbesaran tinggi hanya untuk mengamati detail yang sudah kamu tengahkan.'],
        ['Perbesaran dan resolusi adalah hal yang sama.', 'Perbesaran hanya memperbesar. Jika dua titik lebih dekat daripada yang bisa dipisahkan mikroskop, memperbesarnya hanya menghasilkan satu titik kabur yang lebih besar. Itulah sebabnya virus memerlukan mikroskop elektron, bukan lensa yang lebih kuat.'],
        ['Apa pun bisa terlihat asal perbesarannya cukup.', 'Mikroskop cahaya tidak bisa memisahkan detail yang lebih halus dari sekitar 0,2 mikrometer. Bakteri terlihat, tetapi virus dan sebagian besar membran sel tidak.'],
        ['Bayangan mikroskop hanyalah spesimen yang diperbesar dengan arah yang sama.', 'Mikroskop majemuk membalik bayangan: geser slide ke kiri, bayangan bergerak ke kanan. Simulasi tidak punya meja preparat untuk menunjukkannya, tetapi kamu akan menjumpainya di mikroskop sungguhan.'],
      ],
    },
    realWorld: {
      en: [
        'Laboratory technicians diagnose malaria by looking for the parasite inside red blood cells on a stained blood smear at 1000× with an oil-immersion objective.',
        'Water quality scientists check pond and tap water under the microscope for algae, protists and other microorganisms.',
        'Robert Hooke used an early microscope to describe the tiny compartments in cork in 1665 and gave them the name "cells".',
        'Pathologists examine thin, stained slices of tissue to tell healthy cells from cancer cells.',
      ],
      id: [
        'Petugas laboratorium mendiagnosis malaria dengan mencari parasit di dalam sel darah merah pada apusan darah yang diwarnai, pada perbesaran 1000× dengan objektif minyak imersi.',
        'Ilmuwan kualitas air memeriksa air kolam dan air keran di bawah mikroskop untuk mencari alga, protista, dan mikroorganisme lain.',
        'Robert Hooke memakai mikroskop awal untuk menggambarkan ruang-ruang kecil pada gabus pada 1665 dan menamainya "sel".',
        'Ahli patologi memeriksa irisan jaringan tipis yang diwarnai untuk membedakan sel sehat dari sel kanker.',
      ],
    },
    questions: {
      en: [
        { q: 'You are using the 10× eyepiece and switch from the 4× to the 40× objective. What is the total magnification before and after?', a: 'Before: 10 × 4 = 40×. After: 10 × 40 = 400×. The total went up ten times, so the area you can see shrank a lot, which is why you centre the specimen first.' },
        { q: 'At 400× a cheek cell appears about 20 mm wide on the screen. Roughly how wide is the real cell?', a: 'Real size = image size ÷ magnification = 20 mm ÷ 400 = 0.05 mm, which is 50 micrometres. That is a typical size for a cheek cell.' },
        { q: 'Why does the sim\'s image go blurry so quickly when you turn the focus knob at 100× but hardly at all at 4×?', a: 'Depth of field gets shallower as magnification rises: only a very thin layer is in focus at once. A small turn moves the specimen out of that layer at 100× but not at 4×. Real microscopes solve this with a fine-focus knob for tiny movements.' },
      ],
      id: [
        { q: 'Kamu memakai okuler 10× dan berpindah dari objektif 4× ke 40×. Berapa perbesaran total sebelum dan sesudahnya?', a: 'Sebelum: 10 × 4 = 40×. Sesudah: 10 × 40 = 400×. Totalnya naik sepuluh kali, sehingga area yang terlihat menyusut banyak; karena itu spesimen ditengahkan dulu.' },
        { q: 'Pada 400× sebuah sel pipi tampak selebar sekitar 20 mm di layar. Berapa kira-kira lebar sel sesungguhnya?', a: 'Ukuran nyata = ukuran bayangan ÷ perbesaran = 20 mm ÷ 400 = 0,05 mm, yaitu 50 mikrometer. Itu ukuran yang wajar untuk sel pipi.' },
        { q: 'Mengapa gambar di simulasi cepat sekali kabur saat kenop fokus diputar pada 100×, tetapi hampir tidak pada 4×?', a: 'Kedalaman fokus semakin dangkal saat perbesaran naik: hanya lapisan yang sangat tipis yang fokus sekaligus. Putaran kecil sudah menggeser spesimen keluar dari lapisan itu pada 100×, tetapi tidak pada 4×. Mikroskop sungguhan mengatasinya dengan kenop fokus halus untuk gerakan kecil.' },
      ],
    },
  },
};
