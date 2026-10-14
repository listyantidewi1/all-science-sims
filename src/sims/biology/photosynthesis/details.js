// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the limiting factor at any operating point.',
      'See temperature optimum and the drop above it.',
      "See light saturation: more light doesn't always mean faster.",
    ],
    id: [
      'Mengidentifikasi faktor pembatas pada titik operasi mana pun.',
      'Melihat suhu optimum dan penurunan di atasnya.',
      'Melihat kejenuhan cahaya: lebih banyak cahaya tidak selalu berarti lebih cepat.',
    ],
  },
  tryThis: {
    en: [
      'Crank light past 80% — does the rate keep rising?',
      'Lower CO₂ to 0.005% (50 ppm) — what is now limiting?',
      'Heat past 40 °C — does the rate collapse?',
    ],
    id: [
      'Naikkan cahaya melebihi 80% — apakah laju terus naik?',
      'Turunkan CO₂ ke 0,005% (50 ppm) — sekarang apa yang membatasi?',
      'Panaskan melebihi 40 °C — apakah laju runtuh?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Photosynthesis is how plants build sugar from carbon dioxide and water using light energy, releasing oxygen as a by-product: carbon dioxide + water, with light, gives glucose + oxygen. It happens in the chloroplasts and has two linked parts. The light-dependent reactions use light to split water and release oxygen; the light-independent reactions (the Calvin cycle) use that captured energy to fix carbon dioxide into sugar with the help of enzymes. Because the two parts are linked, the overall rate is held back by whichever supply runs short first: light, carbon dioxide, or the enzyme activity set by temperature.',
        'The simulation measures the rate as the stream of oxygen bubbles rising from a submerged water plant, the classic school experiment with pondweed. Each factor is turned into a "capacity" between 0 and 1, and the rate is the smallest of the three. This is the law of limiting factors: adding more of something the plant already has enough of does nothing. Light and carbon dioxide each follow a saturating curve, rising steeply at first and then flattening. Temperature follows a hump centred on about 25 °C, falling off on both sides and collapsing above 50 °C because enzymes lose their shape.',
        'The sliders set light intensity, carbon dioxide concentration and temperature, and the readout names the factor that is currently limiting. Try raising light from 60% to 100% at the default settings: the rate hardly moves, because carbon dioxide is the bottleneck. Raise carbon dioxide instead and the rate climbs until light takes over as the limit. The presets show typical situations: "Dim" is light-limited, "Drought" is carbon-dioxide-limited because a thirsty plant closes its stomata, and "Heatwave" is temperature-limited.',
        'The model is a caricature in a few ways. Real response curves blend smoothly rather than switching abruptly from one limit to the next. The carbon dioxide slider is in percent of air by volume: ordinary air holds about 0.04% (400 ppm), and the top of the slider, 0.1% (1000 ppm), is roughly what greenhouse growers add; the saturation curve is tuned so that air gives about 70% of the maximum rate. The temperature hump is symmetric here, whereas in real plants the optimum depends on the species and the drop above it is partly permanent damage. The bubbles count gross oxygen production only; a real plant also uses some oxygen in respiration, and bubble size varies, so counting bubbles is a rough measure.',
      ],
      id: [
        'Fotosintesis adalah cara tumbuhan membangun gula dari karbon dioksida dan air dengan energi cahaya, sambil melepaskan oksigen sebagai hasil samping: karbon dioksida + air, dengan cahaya, menghasilkan glukosa + oksigen. Prosesnya terjadi di kloroplas dan memiliki dua bagian yang saling terkait. Reaksi bergantung cahaya memakai cahaya untuk memecah air dan melepaskan oksigen; reaksi tak bergantung cahaya (siklus Calvin) memakai energi yang ditangkap itu untuk mengikat karbon dioksida menjadi gula dengan bantuan enzim. Karena kedua bagian terkait, laju keseluruhan ditahan oleh pasokan mana pun yang lebih dulu menipis: cahaya, karbon dioksida, atau aktivitas enzim yang ditentukan suhu.',
        'Simulasi mengukur laju sebagai aliran gelembung oksigen yang naik dari tumbuhan air yang terendam, percobaan sekolah klasik dengan Hydrilla. Setiap faktor diubah menjadi "kapasitas" antara 0 dan 1, dan lajunya adalah yang terkecil dari ketiganya. Inilah hukum faktor pembatas: menambah sesuatu yang sudah cukup bagi tumbuhan tidak berpengaruh apa pun. Cahaya dan karbon dioksida masing-masing mengikuti kurva jenuh, naik tajam di awal lalu mendatar. Suhu mengikuti kurva berpunuk yang berpusat di sekitar 25 °C, turun di kedua sisi dan runtuh di atas 50 °C karena enzim kehilangan bentuknya.',
        'Slider mengatur intensitas cahaya, konsentrasi karbon dioksida, dan suhu, dan tampilan menyebutkan faktor yang saat itu membatasi. Coba naikkan cahaya dari 60% ke 100% pada pengaturan awal: lajunya hampir tidak bergerak, karena karbon dioksidalah penyempitnya. Naikkan karbon dioksida sebagai gantinya dan laju naik sampai cahaya mengambil alih sebagai pembatas. Praatur menunjukkan situasi khas: "Dim" dibatasi cahaya, "Drought" dibatasi karbon dioksida karena tumbuhan yang kehausan menutup stomatanya, dan "Heatwave" dibatasi suhu.',
        'Model ini adalah karikatur dalam beberapa hal. Kurva respons sungguhan berpadu mulus, bukan berganti mendadak dari satu pembatas ke pembatas berikutnya. Slider karbon dioksida dinyatakan dalam persen volume udara: udara biasa mengandung sekitar 0,04% (400 ppm), dan ujung atas slider, 0,1% (1000 ppm), kira-kira kadar yang ditambahkan petani rumah kaca; kurva kejenuhan disetel agar udara biasa memberi sekitar 70% dari laju maksimum. Punuk suhu di sini simetris, sedangkan pada tumbuhan sungguhan nilai optimumnya bergantung pada spesies dan penurunan di atasnya sebagian berupa kerusakan permanen. Gelembung hanya menghitung produksi oksigen kotor; tumbuhan sungguhan juga memakai sebagian oksigen untuk respirasi, dan ukuran gelembung bervariasi, sehingga menghitung gelembung adalah ukuran kasar.',
      ],
    },
    figure: {
      caption: {
        en: 'Rate of photosynthesis against light intensity at two carbon dioxide levels. On the rising part light is limiting; on the flat part light is saturated and carbon dioxide (or temperature) sets the ceiling, so only raising CO₂ lifts the curve.',
        id: 'Laju fotosintesis terhadap intensitas cahaya pada dua kadar karbon dioksida. Pada bagian menanjak, cahaya yang membatasi; pada bagian datar, cahaya sudah jenuh dan karbon dioksida (atau suhu) yang menentukan batas atas, sehingga hanya menaikkan CO₂ yang mengangkat kurva.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Limiting factors: rate versus light at two CO₂ levels', 'Faktor pembatas: laju terhadap cahaya pada dua kadar CO₂')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.4;fill:none}.s{font-size:10px;opacity:.75}</style>
  <line x1="44" y1="20" x2="44" y2="200" class="m" marker-end="url(#a)"/>
  <line x1="44" y1="200" x2="340" y2="200" class="m" marker-end="url(#a)"/>
  <text x="200" y="224" class="s">${L('light intensity', 'intensitas cahaya')}</text>
  <text x="14" y="130" class="s" transform="rotate(-90 14 130)">${L('rate of photosynthesis', 'laju fotosintesis')}</text>
  <path d="M44 200 C80 130 110 70 160 54 C200 42 260 40 336 40" class="f" stroke="#10b981"/>
  <path d="M44 200 C76 150 96 118 130 110 C170 102 260 100 336 100" class="f" stroke="#3b82f6"/>
  <line x1="150" y1="40" x2="340" y2="40" class="m" stroke-dasharray="3 4"/>
  <line x1="130" y1="100" x2="340" y2="100" class="m" stroke-dasharray="3 4"/>
  <text x="240" y="34" fill="#10b981">${L('high CO₂', 'CO₂ tinggi')}</text>
  <text x="282" y="118" fill="#3b82f6">${L('low CO₂', 'CO₂ rendah')}</text>
  <path d="M52 196 C70 160 86 136 106 122" fill="none" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="4 3"/>
  <text x="48" y="44" fill="#f59e0b" class="s">${L('light limits here:', 'cahaya membatasi:')}</text>
  <text x="48" y="56" fill="#f59e0b" class="s">${L('more light = faster', 'lebih terang = lebih cepat')}</text>
  <line x1="200" y1="100" x2="200" y2="40" class="f" stroke="#ef4444" stroke-width="1.6" marker-end="url(#a)"/>
  <text x="206" y="74" fill="#ef4444" class="s">${L('adding CO₂ lifts', 'menambah CO₂')}</text>
  <text x="206" y="86" fill="#ef4444" class="s">${L('the ceiling', 'menaikkan batas')}</text>
  <text x="150" y="150" class="s">${L('light saturated:', 'cahaya jenuh:')}</text>
  <text x="150" y="162" class="s">${L('CO₂ or temperature limits', 'CO₂ atau suhu membatasi')}</text>
  <text x="150" y="174" class="s">${L('(more light = no change)', '(lebih terang = tidak berubah)')}</text>
  <line x1="200" y1="140" x2="230" y2="106" class="m" stroke-dasharray="3 3"/>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The rate of photosynthesis is set by the factor in shortest supply: light, carbon dioxide or temperature.',
        'Increasing a factor that is not limiting has no effect; only the limiting factor matters at that moment.',
        'Light and carbon dioxide responses saturate: beyond a certain level, more makes little difference.',
        'Temperature has an optimum because photosynthesis depends on enzymes, which work slowly when cold and are destroyed when too hot.',
        'Which factor limits depends on conditions, so the limiting factor changes between dawn, noon, a drought and a heatwave.',
      ],
      id: [
        'Laju fotosintesis ditentukan oleh faktor yang pasokannya paling sedikit: cahaya, karbon dioksida, atau suhu.',
        'Menambah faktor yang tidak membatasi tidak berpengaruh; hanya faktor pembatas yang berarti pada saat itu.',
        'Respons terhadap cahaya dan karbon dioksida mengalami kejenuhan: melewati kadar tertentu, penambahan hampir tidak berpengaruh.',
        'Suhu memiliki nilai optimum karena fotosintesis bergantung pada enzim, yang bekerja lambat saat dingin dan rusak saat terlalu panas.',
        'Faktor yang membatasi bergantung pada kondisi, sehingga faktor pembatas berubah antara pagi, siang, kekeringan, dan gelombang panas.',
      ],
    },
    vocabulary: {
      en: [
        ['Photosynthesis', 'The process in which plants, algae and some bacteria use light energy to make glucose from carbon dioxide and water, releasing oxygen.'],
        ['Limiting factor', 'The single factor that is in shortest supply and therefore controls the rate of a process.'],
        ['Light saturation', 'The light intensity above which more light no longer speeds up photosynthesis.'],
        ['Chloroplast', 'The organelle in plant cells where photosynthesis takes place; it contains the green pigment chlorophyll.'],
        ['Enzyme', 'A protein that speeds up a chemical reaction; its activity rises with temperature up to an optimum.'],
        ['Denaturation', 'The loss of an enzyme\'s shape, and so its function, when it gets too hot; usually permanent.'],
        ['Stomata', 'Tiny pores in a leaf that let carbon dioxide in and water vapour out; plants close them in drought.'],
      ],
      id: [
        ['Fotosintesis', 'Proses tumbuhan, alga, dan beberapa bakteri memakai energi cahaya untuk membuat glukosa dari karbon dioksida dan air, sambil melepaskan oksigen.'],
        ['Faktor pembatas', 'Satu faktor yang pasokannya paling sedikit dan karena itu mengendalikan laju suatu proses.'],
        ['Kejenuhan cahaya', 'Intensitas cahaya yang di atasnya penambahan cahaya tidak lagi mempercepat fotosintesis.'],
        ['Kloroplas', 'Organel pada sel tumbuhan tempat fotosintesis berlangsung; mengandung pigmen hijau klorofil.'],
        ['Enzim', 'Protein yang mempercepat reaksi kimia; aktivitasnya naik seiring suhu sampai nilai optimum.'],
        ['Denaturasi', 'Hilangnya bentuk enzim, dan dengan demikian fungsinya, ketika terlalu panas; biasanya permanen.'],
        ['Stomata', 'Pori-pori kecil pada daun yang memasukkan karbon dioksida dan mengeluarkan uap air; tumbuhan menutupnya saat kekeringan.'],
      ],
    },
    misconceptions: {
      en: [
        ['More light always means more photosynthesis.', 'Only while light is the limiting factor. Once the plant is light-saturated, extra light does nothing, and very intense light can even damage the photosystems.'],
        ['Plants get their food from the soil.', 'Almost all of a plant\'s dry mass comes from carbon dioxide taken from the air and fixed by photosynthesis. Soil supplies water and small amounts of minerals, not the carbon.'],
        ['Warmer is always better for plants.', 'Rate rises with temperature only up to an optimum. Above it, enzymes start to denature and the rate falls steeply, which the "Heatwave" preset shows.'],
        ['Plants photosynthesise by day and respire only at night.', 'Plants respire all the time, day and night. In daylight photosynthesis usually outpaces respiration, so there is a net release of oxygen, but both are happening at once.'],
      ],
      id: [
        ['Lebih banyak cahaya selalu berarti lebih banyak fotosintesis.', 'Hanya selama cahaya menjadi faktor pembatas. Setelah tumbuhan jenuh cahaya, cahaya tambahan tidak berpengaruh, dan cahaya yang sangat kuat bahkan bisa merusak fotosistem.'],
        ['Tumbuhan mendapat makanannya dari tanah.', 'Hampir seluruh massa kering tumbuhan berasal dari karbon dioksida yang diambil dari udara dan diikat lewat fotosintesis. Tanah memasok air dan sedikit mineral, bukan karbonnya.'],
        ['Semakin hangat selalu semakin baik bagi tumbuhan.', 'Laju naik seiring suhu hanya sampai nilai optimum. Di atasnya, enzim mulai terdenaturasi dan laju turun tajam, seperti ditunjukkan praatur "Heatwave".'],
        ['Tumbuhan berfotosintesis pada siang hari dan hanya berespirasi pada malam hari.', 'Tumbuhan berespirasi setiap saat, siang dan malam. Pada siang hari fotosintesis biasanya melampaui respirasi, sehingga ada pelepasan oksigen neto, tetapi keduanya berlangsung bersamaan.'],
      ],
    },
    realWorld: {
      en: [
        'Commercial greenhouses pump extra carbon dioxide to around 1,000 parts per million, roughly 2.5 times the outdoor level, because carbon dioxide is often the limiting factor for tomatoes and cucumbers under good light.',
        'Planted aquariums use carbon dioxide injection and strong lamps to make water plants grow faster, following exactly the logic of this sim.',
        'During heatwaves crop yields fall even in bright sunshine, because temperature rather than light has become the limit.',
        'Leaves in deep shade on a forest floor are light-limited all day, which is why shade plants have large, thin, dark-green leaves.',
      ],
      id: [
        'Rumah kaca komersial memompa karbon dioksida tambahan hingga sekitar 1.000 bagian per juta, kira-kira 2,5 kali kadar udara luar, karena karbon dioksida sering menjadi faktor pembatas bagi tomat dan mentimun saat cahaya cukup.',
        'Akuarium bertanaman memakai injeksi karbon dioksida dan lampu kuat agar tumbuhan air tumbuh lebih cepat, persis mengikuti logika simulasi ini.',
        'Selama gelombang panas, hasil panen turun bahkan di bawah sinar matahari terang, karena suhu, bukan cahaya, yang menjadi pembatas.',
        'Daun di naungan rapat lantai hutan dibatasi cahaya sepanjang hari, itulah sebabnya tumbuhan naungan berdaun besar, tipis, dan hijau tua.',
      ],
    },
    questions: {
      en: [
        { q: 'At the default settings (light 60%, CO₂ 0.04%, 25 °C) the readout says the rate is 70% and CO₂ is limiting. What happens to the rate if you raise light to 100%? What if you raise CO₂ to 0.06% instead?', a: 'Raising light changes nothing: CO₂ still limits, so the rate stays at 70%. Raising CO₂ to 0.06% (600 ppm) lifts the CO₂ capacity to about 83%, so the rate rises to about 83%; keep raising CO₂ and light soon becomes the new limiting factor at around 91%.' },
        { q: 'Explain why a plant\'s rate of photosynthesis is lower at 45 °C than at 25 °C, even though chemical reactions generally go faster when warmer.', a: 'Photosynthesis depends on enzymes. Warming speeds up the molecules, but above the optimum the enzymes begin to lose their shape (denature), so fewer working enzymes remain. The loss of enzymes outweighs the extra molecular speed, and the rate falls.' },
        { q: 'A gardener in a bright greenhouse at 25 °C wants faster growth and considers adding more lamps or adding CO₂. Which is more likely to help, and how could they check with this sim?', a: 'Adding CO₂ is more likely to help, because bright light is probably already saturating and CO₂ is the limit. In the sim, set light high and CO₂ at 0.04%: raising light further does nothing, while raising CO₂ increases the bubble rate, until light or temperature becomes limiting instead.' },
      ],
      id: [
        { q: 'Pada pengaturan awal (cahaya 60%, CO₂ 0,04%, 25 °C) tampilan menyebutkan laju 70% dan CO₂ yang membatasi. Apa yang terjadi pada laju jika cahaya dinaikkan ke 100%? Bagaimana jika CO₂ yang dinaikkan ke 0,06%?', a: 'Menaikkan cahaya tidak mengubah apa pun: CO₂ masih membatasi, sehingga laju tetap 70%. Menaikkan CO₂ ke 0,06% (600 ppm) mengangkat kapasitas CO₂ ke sekitar 83%, sehingga laju naik ke sekitar 83%; jika CO₂ terus dinaikkan, cahaya segera menjadi faktor pembatas baru di sekitar 91%.' },
        { q: 'Jelaskan mengapa laju fotosintesis tumbuhan lebih rendah pada 45 °C daripada pada 25 °C, padahal reaksi kimia umumnya lebih cepat saat lebih hangat.', a: 'Fotosintesis bergantung pada enzim. Pemanasan mempercepat gerak molekul, tetapi di atas nilai optimum enzim mulai kehilangan bentuknya (terdenaturasi), sehingga enzim yang masih berfungsi berkurang. Hilangnya enzim melebihi tambahan kecepatan molekul, dan laju pun turun.' },
        { q: 'Seorang petani di rumah kaca yang terang bersuhu 25 °C ingin pertumbuhan lebih cepat dan mempertimbangkan menambah lampu atau menambah CO₂. Mana yang lebih mungkin membantu, dan bagaimana memeriksanya dengan simulasi ini?', a: 'Menambah CO₂ lebih mungkin membantu, karena cahaya terang kemungkinan sudah jenuh dan CO₂ yang membatasi. Di simulasi, atur cahaya tinggi dan CO₂ pada 0,04%: menaikkan cahaya lebih lanjut tidak berpengaruh, sedangkan menaikkan CO₂ menambah laju gelembung, sampai cahaya atau suhu yang gantian membatasi.' },
      ],
    },
  },
};
