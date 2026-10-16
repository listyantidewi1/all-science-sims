// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe how trees soak up rain and hold soil in place on a hillside.',
      'Explain why cutting down a forest makes floods and landslides more likely in the village below.',
      'Give reasons why planting and protecting forests is a way of looking after nature and the climate.',
    ],
    id: [
      'Menjelaskan bagaimana pohon menyerap hujan dan menahan tanah di lereng bukit.',
      'Menjelaskan mengapa menebang hutan membuat banjir dan tanah longsor lebih mungkin terjadi di desa di bawahnya.',
      'Memberikan alasan mengapa menanam dan melindungi hutan adalah cara menjaga alam dan iklim.',
    ],
  },
  tryThis: {
    en: [
      'Set the forest to full and the rain to heavy. Does the river flood? Now slide the forest down to zero and watch.',
      'Find the smallest amount of forest that keeps the village dry in heavy rain.',
      'With no trees, watch the brown soil wash into the river. Press "Plant trees" a few times. What happens to the soil?',
      'In light rain, does cutting the forest still cause a flood? What does that tell you?',
    ],
    id: [
      'Atur hutan penuh dan hujan deras. Apakah sungai meluap? Sekarang geser hutan sampai nol dan perhatikan.',
      'Cari jumlah hutan paling sedikit yang menjaga desa tetap kering saat hujan deras.',
      'Tanpa pohon, lihat tanah cokelat terbawa ke sungai. Tekan "Tanam pohon" beberapa kali. Apa yang terjadi pada tanahnya?',
      'Saat hujan ringan, apakah menebang hutan tetap menyebabkan banjir? Apa artinya itu?',
    ],
  },

  learn: {
    background: {
      en: [
        'When rain falls on a forest, it does not hit the ground all at once. The leaves catch it and slow it down. The soft forest floor, full of roots and dead leaves, acts like a sponge and soaks the water up. The water sinks slowly into the ground and comes out of springs over many days. The roots also hold the soil together like a net.',
        'When the trees are cut down, the rain hits bare ground. The ground is hard and there is nothing to soak the water up, so most of the rain runs straight down the hill. This fast water is called runoff. Runoff picks up loose soil and carries it away; that is erosion. The muddy water pours into the river all at once, the river rises quickly and spills over its banks into the village. Hillsides with no trees can also slide down in a landslide.',
        'In this simulation you choose how much of the hill is forest and how hard it rains. The sim works out how much of the rain runs off, how much soil is lost, and how high the river gets. The river floods when it rises above its bank. Forests also take carbon dioxide out of the air, so protecting and replanting them helps slow climate change, and at the same time it protects villages from floods. Looking after forests is one of the ways Indonesia can prepare for heavier rains in the future.',
      ],
      id: [
        'Ketika hujan turun di hutan, air tidak langsung mengenai tanah sekaligus. Daun menangkapnya dan memperlambatnya. Lantai hutan yang gembur, penuh akar dan daun kering, bekerja seperti spons dan menyerap air. Air meresap perlahan ke dalam tanah dan keluar dari mata air selama berhari-hari. Akar juga menahan tanah agar menyatu seperti jaring.',
        'Ketika pohon ditebang, hujan langsung mengenai tanah gundul. Tanahnya keras dan tidak ada yang menyerap air, sehingga sebagian besar hujan langsung mengalir menuruni bukit. Air deras ini disebut air larian. Air larian mengangkut tanah yang gembur dan membawanya pergi; itulah erosi. Air berlumpur mengalir ke sungai sekaligus, sungai naik dengan cepat dan meluap dari tepiannya ke desa. Lereng tanpa pohon juga bisa runtuh menjadi tanah longsor.',
        'Dalam simulasi ini kamu memilih seberapa luas bukit yang berhutan dan seberapa deras hujannya. Simulasi menghitung berapa banyak hujan yang menjadi air larian, berapa banyak tanah yang hilang, dan seberapa tinggi sungai naik. Sungai meluap ketika naik melewati tepiannya. Hutan juga mengambil karbon dioksida dari udara, sehingga melindungi dan menanam kembali hutan membantu memperlambat perubahan iklim, dan sekaligus melindungi desa dari banjir. Menjaga hutan adalah salah satu cara Indonesia bersiap menghadapi hujan yang lebih deras di masa depan.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: on a forested hill most rain soaks into the ground and the river stays low. Right: on a bare hill most rain runs off, carrying soil, and the river overflows into the village.',
        id: 'Kiri: di bukit berhutan sebagian besar hujan meresap ke tanah dan sungai tetap rendah. Kanan: di bukit gundul sebagian besar hujan menjadi air larian, membawa tanah, dan sungai meluap ke desa.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Forested hill versus bare hill in rain', 'Bukit berhutan dibandingkan bukit gundul saat hujan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.t{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.s{font:10px system-ui,sans-serif;fill:currentColor;text-anchor:middle;opacity:.85}</style>
  <defs><marker id="fa" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#3b82f6"/></marker></defs>
  <line x1="180" y1="20" x2="180" y2="220" stroke="currentColor" stroke-width="1" opacity=".3" stroke-dasharray="4 4"/>
  <text x="90" y="18" class="t">${L('with forest', 'dengan hutan')}</text>
  <text x="270" y="18" class="t">${L('without forest', 'tanpa hutan')}</text>
  <path d="M10 160 L10 60 L120 150 L170 150 L170 160 z" fill="#65a30d"/>
  <path d="M190 160 L190 60 L300 150 L350 150 L350 160 z" fill="#a16207"/>
  <g fill="#15803d"><polygon points="25,66 17,84 33,84"/><polygon points="45,82 37,100 53,100"/><polygon points="65,98 57,116 73,116"/><polygon points="85,114 77,132 93,132"/><polygon points="35,100 27,118 43,118"/><polygon points="55,116 47,134 63,134"/></g>
  <g stroke="#60a5fa" stroke-width="1.5"><line x1="30" y1="30" x2="27" y2="40"/><line x1="55" y1="26" x2="52" y2="36"/><line x1="80" y1="32" x2="77" y2="42"/><line x1="105" y1="28" x2="102" y2="38"/><line x1="210" y1="30" x2="207" y2="40"/><line x1="235" y1="26" x2="232" y2="36"/><line x1="260" y1="32" x2="257" y2="42"/><line x1="285" y1="28" x2="282" y2="38"/></g>
  <path d="M40 90 L40 125" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#fa)"/>
  <path d="M70 112 L70 140" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#fa)"/>
  <text x="60" y="178" class="s">${L('rain soaks in', 'hujan meresap')}</text>
  <path d="M205 72 L290 142" stroke="#3b82f6" stroke-width="3" marker-end="url(#fa)"/>
  <path d="M215 100 L292 150" stroke="#92400e" stroke-width="3" marker-end="url(#fa)"/>
  <text x="240" y="178" class="s">${L('runoff carries soil', 'air larian membawa tanah')}</text>
  <rect x="120" y="142" width="50" height="8" fill="#3b82f6"/>
  <rect x="300" y="122" width="50" height="28" fill="#1d4ed8" opacity=".85"/>
  <rect x="130" y="128" width="14" height="14" fill="#f8fafc"/><polygon points="128,128 137,120 146,128" fill="#dc2626"/>
  <rect x="310" y="128" width="14" height="14" fill="#f8fafc" opacity=".6"/><polygon points="308,128 317,120 326,128" fill="#dc2626"/>
  <text x="145" y="198" class="s">${L('river low, village dry', 'sungai rendah, desa kering')}</text>
  <text x="315" y="198" class="s" fill="#ef4444">${L('river overflows!', 'sungai meluap!')}</text>
  <text x="180" y="226" class="s">${L('trees = sponge + net for the soil', 'pohon = spons + jaring bagi tanah')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Trees catch rain with their leaves and soak it up with their roots and the soft forest floor.',
        'Tree roots hold the soil together like a net.',
        'On a bare hill, rain runs off fast, carries soil away and fills the river quickly.',
        'A river floods when the water rises higher than its banks.',
        'Planting and protecting forests protects villages from floods and landslides, and also helps the climate.',
      ],
      id: [
        'Pohon menangkap hujan dengan daunnya dan menyerapnya dengan akar dan lantai hutan yang gembur.',
        'Akar pohon menahan tanah agar menyatu seperti jaring.',
        'Di bukit gundul, hujan mengalir cepat, membawa tanah, dan memenuhi sungai dengan cepat.',
        'Sungai meluap ketika airnya naik lebih tinggi daripada tepiannya.',
        'Menanam dan melindungi hutan melindungi desa dari banjir dan tanah longsor, dan juga membantu iklim.',
      ],
    },
    vocabulary: {
      en: [
        ['Runoff', 'Rain water that flows over the ground instead of soaking in.'],
        ['Erosion', 'When water or wind carries soil away.'],
        ['Flood', 'When a river rises over its banks and water covers the land.'],
        ['Forest cover', 'How much of the land is covered by trees.'],
        ['Landslide', 'When a whole piece of hillside slides down, often after heavy rain on bare ground.'],
        ['Replanting', 'Planting new trees where a forest was cut down.'],
      ],
      id: [
        ['Air larian', 'Air hujan yang mengalir di atas tanah dan tidak meresap.'],
        ['Erosi', 'Ketika air atau angin membawa tanah pergi.'],
        ['Banjir', 'Ketika sungai naik melewati tepiannya dan air menutupi daratan.'],
        ['Tutupan hutan', 'Seberapa luas daratan yang tertutup pohon.'],
        ['Tanah longsor', 'Ketika sebagian lereng bukit runtuh ke bawah, sering terjadi setelah hujan deras di tanah gundul.'],
        ['Penanaman kembali', 'Menanam pohon baru di tempat hutan yang sudah ditebang.'],
      ],
    },
    misconceptions: {
      en: [
        ['Floods are only caused by too much rain.', 'The same rain can cause a flood or not, depending on the land. In the sim, heavy rain on a forested hill does not flood, but the same rain on a bare hill does.'],
        ['Trees use up water, so cutting them down gives the village more water.', 'Trees help water sink into the ground, where it feeds springs and wells for months. Without trees the water rushes away in a day and the ground dries out.'],
        ['Soil is just dirt and it does not matter if some washes away.', 'Soil takes hundreds of years to form. Once it washes into the river, farms lose their best soil and the river bed fills with mud, making floods worse.'],
      ],
      id: [
        ['Banjir hanya disebabkan oleh hujan yang terlalu banyak.', 'Hujan yang sama bisa menyebabkan banjir atau tidak, tergantung keadaan lahannya. Di simulasi, hujan deras di bukit berhutan tidak menyebabkan banjir, tetapi hujan yang sama di bukit gundul menyebabkannya.'],
        ['Pohon menghabiskan air, jadi menebangnya memberi desa lebih banyak air.', 'Pohon membantu air meresap ke dalam tanah, tempat air mengisi mata air dan sumur selama berbulan-bulan. Tanpa pohon, air mengalir pergi dalam sehari dan tanah menjadi kering.'],
        ['Tanah hanyalah kotoran dan tidak masalah jika sebagian terbawa.', 'Tanah butuh ratusan tahun untuk terbentuk. Begitu terbawa ke sungai, ladang kehilangan tanah terbaiknya dan dasar sungai penuh lumpur, membuat banjir lebih parah.'],
      ],
    },
    realWorld: {
      en: [
        'Many floods and landslides in Indonesia happen below hills where forest was cleared for farms or mines.',
        'Mangrove forests on the coast do the same job as hill forests: they slow waves and hold the mud in place.',
        'Villages plant bamboo and trees along river banks because their roots stop the banks from washing away.',
        'Indonesia\'s tree-planting programmes aim to restore damaged forest, which also stores carbon and helps the climate.',
      ],
      id: [
        'Banyak banjir dan tanah longsor di Indonesia terjadi di bawah bukit yang hutannya dibuka untuk ladang atau tambang.',
        'Hutan bakau di pantai melakukan tugas yang sama seperti hutan di bukit: memperlambat gelombang dan menahan lumpur.',
        'Warga desa menanam bambu dan pohon di sepanjang tepi sungai karena akarnya mencegah tepian terbawa air.',
        'Program penanaman pohon di Indonesia bertujuan memulihkan hutan yang rusak, yang juga menyimpan karbon dan membantu iklim.',
      ],
    },
    questions: {
      en: [
        { q: 'It rains hard on two hills: one with a full forest, one with no trees. Which river floods, and why?', a: 'The river below the bare hill floods. Without trees, most of the rain runs off straight away and fills the river at once. On the forested hill most of the rain soaks into the ground.' },
        { q: 'Why does the river turn brown when the forest is cut down?', a: 'Runoff on the bare hill carries loose soil with it. There are no roots to hold the soil, so it washes into the river. That is erosion.' },
        { q: 'A village wants to stop floods. Give two things they could do that you tested in the sim.', a: 'Replant trees on the hill above the village, and protect the forest that is already there so the ground keeps soaking up rain. In the sim, more forest cover means less runoff and a lower river.' },
      ],
      id: [
        { q: 'Hujan deras turun di dua bukit: satu berhutan penuh, satu tanpa pohon. Sungai mana yang meluap, dan mengapa?', a: 'Sungai di bawah bukit gundul yang meluap. Tanpa pohon, sebagian besar hujan langsung mengalir dan memenuhi sungai sekaligus. Di bukit berhutan, sebagian besar hujan meresap ke tanah.' },
        { q: 'Mengapa sungai menjadi cokelat ketika hutan ditebang?', a: 'Air larian di bukit gundul membawa tanah yang gembur. Tidak ada akar yang menahan tanah, sehingga tanah terbawa ke sungai. Itulah erosi.' },
        { q: 'Sebuah desa ingin menghentikan banjir. Sebutkan dua hal yang bisa mereka lakukan yang kamu uji di simulasi.', a: 'Menanam kembali pohon di bukit di atas desa, dan melindungi hutan yang sudah ada agar tanah terus menyerap hujan. Di simulasi, tutupan hutan yang lebih luas berarti air larian lebih sedikit dan sungai lebih rendah.' },
      ],
    },
  },
};
