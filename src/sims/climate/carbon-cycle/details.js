// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See where emitted carbon ends up — most stays in the atmosphere on human timescales.',
      'Watch the ocean uptake lag emissions; the deep ocean is slow.',
      'Compare cutting emissions to half vs zero — the difference is the climate.',
    ],
    id: [
      'Melihat ke mana karbon yang dilepas berakhir — kebanyakan tetap di atmosfer dalam skala waktu manusia.',
      'Mengamati penyerapan laut tertinggal di belakang emisi; laut dalam lambat.',
      'Membandingkan pemotongan emisi setengah vs nol — selisihnya adalah iklim.',
    ],
  },  tryThis: {
    en: [
      'Set emissions to "today" (~10 GtC/yr) — atmosphere keeps growing.',
      'Drop emissions to zero — atmosphere starts to fall (slowly) as ocean absorbs.',
      'Spike emissions then return to zero — atmosphere holds the bulge for decades.',
    ],
    id: [
      'Atur emisi ke "hari ini" (~10 GtC/thn) — atmosfer terus tumbuh.',
      'Turunkan emisi ke nol — atmosfer mulai turun (perlahan) karena diserap laut.',
      'Lonjakan emisi lalu kembalikan ke nol — atmosfer mempertahankan kelebihan selama dekade.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Carbon never sits still. It is stored in a few big reservoirs and constantly moves between them: the atmosphere (as carbon dioxide, about 600 billion tonnes of carbon, or 600 GtC, before the industrial era), plants and soils on land (about 2,300 GtC), the sunlit surface layer of the ocean (about 900 GtC) and the cold deep ocean (about 37,000 GtC, by far the largest). Photosynthesis pulls carbon out of the air into leaves and wood; respiration and decay send it back. Carbon dioxide also dissolves into seawater and escapes from it again. Before humans started burning fossil fuels, each flow in was matched by a flow out, so the amount in the air stayed close to 280 parts per million for thousands of years.',
        'The simulation is a "four-box model". Each box is one reservoir, and each flow between boxes is simply proportional to how much carbon is in the box it leaves: twice as much carbon in the atmosphere means twice as much dissolving into the ocean each year. The starting values are chosen so that every pair of flows cancels exactly; that is why nothing happens until you move the Emissions slider, which pours extra carbon straight into the atmosphere box. Today\'s emissions are roughly 10 GtC per year, which is why the "Today" preset sits there. The speed slider only changes how many simulated years pass per second, and the chart shows each pool as a percentage change from its pre-industrial size, so the enormous deep ocean looks almost flat even when it has taken up tens of gigatonnes.',
        'Watch the timescales. Extra carbon is shared between the atmosphere, land and surface ocean within years to a couple of decades, because those exchanges are large (about 60 GtC per year each way in the model). The surface ocean passes carbon down to the deep ocean much more slowly, only a few GtC per year, so the deep ocean takes centuries to notice. This is why cutting emissions to zero makes the atmosphere drop quickly at first, as the fast pools catch up, and then level off into a very slow decline that lasts for hundreds of years. Halving emissions instead of stopping them does not stabilise the atmosphere: as long as carbon is added faster than the deep ocean can swallow it, the atmospheric pool keeps growing.',
        'The model is deliberately simple, and it leaves things out. Real seawater chemistry means the ocean can only hold a fraction of the extra CO₂ that a strictly proportional rule would predict, land plants cannot keep absorbing more indefinitely, and a warmer ocean holds less CO₂. Because those limits are missing, the model keeps only about one fifth of the emitted carbon in the air after a century, whereas in the real world roughly 40–45% of what we have emitted since 1850 is still in the atmosphere. The model also has no temperature, no seasonal cycle and no rock weathering, the geological process that finally removes CO₂ over tens of thousands of years.',
      ],
      id: [
        'Karbon tidak pernah diam. Ia tersimpan di beberapa reservoir besar dan terus berpindah di antaranya: atmosfer (sebagai karbon dioksida, sekitar 600 miliar ton karbon atau 600 GtC sebelum era industri), tumbuhan dan tanah di darat (sekitar 2.300 GtC), lapisan permukaan laut yang tersinari matahari (sekitar 900 GtC), dan laut dalam yang dingin (sekitar 37.000 GtC, jauh yang terbesar). Fotosintesis menarik karbon dari udara ke daun dan kayu; respirasi dan pembusukan mengembalikannya. Karbon dioksida juga larut ke air laut dan lepas lagi darinya. Sebelum manusia membakar bahan bakar fosil, setiap aliran masuk diimbangi aliran keluar, sehingga kadar di udara bertahan di sekitar 280 bagian per juta selama ribuan tahun.',
        'Simulasi ini adalah "model empat kotak". Tiap kotak adalah satu reservoir, dan tiap aliran antar kotak sebanding dengan jumlah karbon di kotak asalnya: karbon di atmosfer dua kali lebih banyak berarti dua kali lebih banyak yang larut ke laut setiap tahun. Nilai awal dipilih agar setiap pasang aliran saling meniadakan; itulah sebabnya tidak ada yang berubah sampai kamu menggeser slider Emisi, yang menuangkan karbon tambahan langsung ke kotak atmosfer. Emisi saat ini kira-kira 10 GtC per tahun, sehingga tombol "Today" berada di nilai itu. Slider kecepatan hanya mengubah berapa tahun simulasi berlalu per detik, dan grafik menampilkan tiap pool sebagai persentase perubahan dari ukuran praindustrinya, sehingga laut dalam yang raksasa tampak hampir datar meskipun sudah menyerap puluhan gigaton.',
        'Perhatikan skala waktunya. Karbon tambahan dibagi antara atmosfer, darat, dan laut permukaan dalam hitungan tahun sampai beberapa dekade, karena pertukarannya besar (sekitar 60 GtC per tahun di tiap arah dalam model). Laut permukaan meneruskan karbon ke laut dalam jauh lebih lambat, hanya beberapa GtC per tahun, sehingga laut dalam butuh berabad-abad untuk merasakannya. Karena itu, memotong emisi ke nol membuat atmosfer turun cepat di awal saat pool-pool cepat menyusul, lalu mendatar menjadi penurunan sangat lambat yang berlangsung ratusan tahun. Memotong emisi menjadi setengah, bukan nol, tidak menstabilkan atmosfer: selama karbon ditambahkan lebih cepat daripada yang bisa ditelan laut dalam, pool atmosfer terus bertambah.',
        'Model ini sengaja dibuat sederhana dan mengabaikan beberapa hal. Kimia air laut yang sebenarnya membuat laut hanya mampu menampung sebagian kecil dari CO₂ tambahan yang diprediksi aturan sebanding, tumbuhan darat tidak bisa terus menyerap tanpa batas, dan laut yang lebih hangat menampung lebih sedikit CO₂. Karena batasan itu tidak ada, model hanya menyisakan sekitar seperlima karbon yang diemisikan di udara setelah seabad, padahal di dunia nyata sekitar 40–45% dari yang kita emisikan sejak 1850 masih berada di atmosfer. Model ini juga tidak punya suhu, tidak punya siklus musiman, dan tidak punya pelapukan batuan, proses geologis yang akhirnya menghilangkan CO₂ dalam puluhan ribu tahun.',
      ],
    },
    figure: {
      caption: {
        en: 'The four reservoirs of the model with their pre-industrial sizes and the yearly flows between them. Natural flows cancel in pairs; human emissions add carbon to the atmosphere with no matching return flow.',
        id: 'Empat reservoir dalam model dengan ukuran praindustrinya dan aliran tahunan di antaranya. Aliran alami saling meniadakan berpasangan; emisi manusia menambah karbon ke atmosfer tanpa aliran balik yang mengimbangi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Carbon reservoirs and flows', 'Reservoir dan aliran karbon')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font-weight:700}.s{font-size:9.5px;opacity:.8}.f{stroke-width:2;fill:none}.box{stroke:currentColor;stroke-width:1;fill-opacity:.25}</style>
  <defs><marker id="c" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
  <rect x="115" y="14" width="130" height="44" rx="6" fill="#f59e0b" class="box"/>
  <text x="180" y="32" text-anchor="middle" class="b">${L('Atmosphere', 'Atmosfer')}</text>
  <text x="180" y="48" text-anchor="middle" class="s">600 GtC</text>
  <rect x="14" y="136" width="112" height="50" rx="6" fill="#10b981" class="box"/>
  <text x="70" y="156" text-anchor="middle" class="b">${L('Land', 'Darat')}</text>
  <text x="70" y="172" text-anchor="middle" class="s">${L('plants + soil', 'tumbuhan + tanah')} 2 300 GtC</text>
  <rect x="234" y="136" width="112" height="40" rx="6" fill="#3b82f6" class="box"/>
  <text x="290" y="152" text-anchor="middle" class="b">${L('Surface ocean', 'Laut permukaan')}</text>
  <text x="290" y="167" text-anchor="middle" class="s">900 GtC</text>
  <rect x="234" y="198" width="112" height="38" rx="6" fill="#8b5cf6" class="box"/>
  <text x="290" y="214" text-anchor="middle" class="b">${L('Deep ocean', 'Laut dalam')}</text>
  <text x="290" y="229" text-anchor="middle" class="s">37 000 GtC</text>
  <line x1="150" y1="60" x2="82" y2="132" class="f" stroke="#10b981" marker-end="url(#c)"/>
  <line x1="100" y1="130" x2="168" y2="60" class="f" stroke="#10b981" marker-end="url(#c)"/>
  <text x="56" y="96" text-anchor="end" fill="#10b981" class="s">${L('photosynthesis', 'fotosintesis')} ~60/${L('yr', 'thn')}</text>
  <text x="126" y="118" fill="#10b981" class="s">${L('respiration + decay', 'respirasi + pembusukan')}</text>
  <line x1="210" y1="60" x2="278" y2="132" class="f" stroke="#3b82f6" marker-end="url(#c)"/>
  <line x1="260" y1="130" x2="192" y2="60" class="f" stroke="#3b82f6" marker-end="url(#c)"/>
  <text x="300" y="96" fill="#3b82f6" class="s">${L('dissolving', 'melarut')} ~60/${L('yr', 'thn')}</text>
  <text x="212" y="118" fill="#3b82f6" class="s">${L('outgassing', 'lepas ke udara')}</text>
  <line x1="276" y1="178" x2="276" y2="194" class="f" stroke="#8b5cf6" marker-end="url(#c)"/>
  <line x1="304" y1="196" x2="304" y2="180" class="f" stroke="#8b5cf6" marker-end="url(#c)"/>
  <text x="228" y="191" text-anchor="end" fill="#8b5cf6" class="s">${L('slow mixing', 'pencampuran lambat')} ~4,5/${L('yr', 'thn')}</text>
  <line x1="30" y1="36" x2="110" y2="36" class="f" stroke="#ef4444" marker-end="url(#c)"/>
  <text x="14" y="22" fill="#ef4444" class="b">${L('Human emissions', 'Emisi manusia')}</text>
  <text x="14" y="52" fill="#ef4444" class="s">~10 GtC/${L('yr', 'thn')}, ${L('no return flow', 'tanpa aliran balik')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Carbon flows between reservoirs all the time; what matters for climate is whether the flows balance.',
        'Natural flows in and out of the atmosphere cancel; human emissions are an extra input with no matching output.',
        'Extra carbon is shared quickly (years to decades) between the atmosphere, land and surface ocean, but reaches the deep ocean only over centuries.',
        'Stopping emissions makes the atmospheric pool fall quickly at first and then very slowly; it does not return to pre-industrial levels within a human lifetime.',
        'Halving emissions slows the rise but does not stop it, because carbon is still being added faster than it is removed.',
      ],
      id: [
        'Karbon selalu mengalir di antara reservoir; yang penting bagi iklim adalah apakah aliran-aliran itu seimbang.',
        'Aliran alami masuk dan keluar atmosfer saling meniadakan; emisi manusia adalah masukan tambahan tanpa keluaran yang mengimbangi.',
        'Karbon tambahan dibagi dengan cepat (tahun sampai dekade) antara atmosfer, darat, dan laut permukaan, tetapi baru mencapai laut dalam setelah berabad-abad.',
        'Menghentikan emisi membuat pool atmosfer turun cepat di awal lalu sangat lambat; ia tidak kembali ke tingkat praindustri dalam satu masa hidup manusia.',
        'Memotong emisi menjadi setengah memperlambat kenaikan tetapi tidak menghentikannya, karena karbon masih ditambahkan lebih cepat daripada dihilangkan.',
      ],
    },
    vocabulary: {
      en: [
        ['Reservoir (pool)', 'A place where carbon is stored, such as the atmosphere, the ocean or soils, measured in gigatonnes of carbon.'],
        ['Flux', 'The amount of carbon moving from one reservoir to another per year, for example in GtC per year.'],
        ['GtC', 'Gigatonne of carbon: one billion tonnes of carbon. 1 GtC corresponds to 3.67 Gt of CO₂ and raises atmospheric CO₂ by about 0.47 ppm.'],
        ['Steady state', 'A condition in which every reservoir receives as much carbon as it loses, so pool sizes stay constant.'],
        ['Residence time', 'The average time a carbon atom spends in a reservoir: the pool size divided by the flow out of it.'],
        ['Airborne fraction', 'The share of emitted carbon that is still in the atmosphere after a given time.'],
        ['Carbon sink', 'A reservoir that is currently taking up more carbon than it releases, such as today\'s oceans and forests.'],
      ],
      id: [
        ['Reservoir (pool)', 'Tempat karbon tersimpan, seperti atmosfer, laut, atau tanah, diukur dalam gigaton karbon.'],
        ['Fluks', 'Jumlah karbon yang berpindah dari satu reservoir ke reservoir lain per tahun, misalnya dalam GtC per tahun.'],
        ['GtC', 'Gigaton karbon: satu miliar ton karbon. 1 GtC setara dengan 3,67 Gt CO₂ dan menaikkan CO₂ atmosfer sekitar 0,47 ppm.'],
        ['Keadaan tunak', 'Kondisi ketika setiap reservoir menerima karbon sebanyak yang dilepaskannya, sehingga ukuran pool tetap.'],
        ['Waktu tinggal', 'Rata-rata lama sebuah atom karbon berada di suatu reservoir: ukuran pool dibagi aliran keluarnya.'],
        ['Fraksi di udara', 'Bagian dari karbon yang diemisikan yang masih berada di atmosfer setelah waktu tertentu.'],
        ['Penyerap karbon (sink)', 'Reservoir yang saat ini menyerap lebih banyak karbon daripada yang dilepaskannya, seperti laut dan hutan saat ini.'],
      ],
    },
    misconceptions: {
      en: [
        ['Human emissions are tiny compared with natural flows, so they cannot matter.', 'Natural flows are large but balanced: what goes out comes back. Emissions are a one-way addition, and even 10 GtC per year adds up to hundreds of gigatonnes over decades, with nothing removing it quickly.'],
        ['If we stop emitting, CO₂ levels will return to normal within a few years.', 'Only the fast exchange with land and the surface ocean happens within years. Moving carbon into the deep ocean takes centuries, so a large part of the excess stays in the air for hundreds of years.'],
        ['Cutting emissions in half will stop CO₂ from rising.', 'The atmosphere stops rising only when inputs no longer exceed removals. At half of today\'s emissions the pool still grows, just more slowly; the sim shows this directly.'],
        ['The ocean is so big that it will absorb everything.', 'The deep ocean is huge, but the door to it is narrow: only a few GtC per year mix down from the surface. The surface layer fills up quickly, and real ocean chemistry limits uptake even more than the sim does.'],
      ],
      id: [
        ['Emisi manusia kecil dibanding aliran alami, jadi tidak mungkin berpengaruh.', 'Aliran alami memang besar tetapi seimbang: yang keluar kembali lagi. Emisi adalah tambahan satu arah, dan bahkan 10 GtC per tahun menumpuk menjadi ratusan gigaton dalam beberapa dekade, tanpa ada yang menghilangkannya dengan cepat.'],
        ['Jika kita berhenti mengemisi, kadar CO₂ akan kembali normal dalam beberapa tahun.', 'Hanya pertukaran cepat dengan darat dan laut permukaan yang terjadi dalam hitungan tahun. Memindahkan karbon ke laut dalam butuh berabad-abad, sehingga sebagian besar kelebihan tetap di udara selama ratusan tahun.'],
        ['Memotong emisi menjadi setengah akan menghentikan kenaikan CO₂.', 'Atmosfer berhenti naik hanya ketika masukan tidak lagi melebihi penghilangan. Pada setengah emisi saat ini pool masih tumbuh, hanya lebih lambat; simulasi menunjukkannya langsung.'],
        ['Laut begitu besar sehingga akan menyerap semuanya.', 'Laut dalam memang raksasa, tetapi pintunya sempit: hanya beberapa GtC per tahun yang tercampur turun dari permukaan. Lapisan permukaan cepat penuh, dan kimia laut sungguhan membatasi penyerapan lebih ketat lagi daripada simulasi ini.'],
      ],
    },
    realWorld: {
      en: [
        'Atmospheric CO₂ measured at Mauna Loa, Hawaii, has risen from about 315 ppm in 1958 to over 420 ppm today, with a sawtooth each year as Northern Hemisphere forests leaf out in spring and shed in autumn.',
        'The ocean has absorbed roughly a quarter of human CO₂ emissions; the dissolved CO₂ forms carbonic acid, lowering seawater pH, which is why ocean acidification and climate change share the same cause.',
        'Deforestation moves carbon from the land box to the atmosphere box; reforestation and soil protection do the reverse, which is why forests appear in national climate plans.',
        'Carbon budgets used in climate policy follow the same logic as the sim: the temperature reached depends on the total amount of carbon added to the atmosphere, not just on this year\'s emission rate.',
      ],
      id: [
        'CO₂ atmosfer yang diukur di Mauna Loa, Hawaii, naik dari sekitar 315 ppm pada 1958 menjadi lebih dari 420 ppm saat ini, dengan pola gigi gergaji tiap tahun saat hutan Belahan Bumi Utara berdaun di musim semi dan merontokkannya di musim gugur.',
        'Laut telah menyerap kira-kira seperempat emisi CO₂ manusia; CO₂ yang larut membentuk asam karbonat dan menurunkan pH air laut, sehingga pengasaman laut dan perubahan iklim punya penyebab yang sama.',
        'Penggundulan hutan memindahkan karbon dari kotak darat ke kotak atmosfer; penghijauan kembali dan perlindungan tanah melakukan kebalikannya, itulah sebabnya hutan masuk dalam rencana iklim nasional.',
        'Anggaran karbon dalam kebijakan iklim mengikuti logika yang sama dengan simulasi: suhu yang dicapai bergantung pada total karbon yang ditambahkan ke atmosfer, bukan hanya laju emisi tahun ini.',
      ],
    },
    questions: {
      en: [
        { q: 'In the model, about 60 GtC per year dissolves from the atmosphere into the surface ocean and about 60 GtC per year comes back out. Why does the atmospheric pool stay constant when emissions are zero?', a: 'Because the two flows are equal and opposite, so the net exchange is zero; the same is true for the land exchange. Only an input with no matching output, such as human emissions, changes the pool size.' },
        { q: 'Run the sim at 10 GtC per year for 100 years. Roughly 1,000 GtC are emitted, but the atmosphere grows by only about 190 GtC. Where did the rest go, and why does the sim differ from the real world?', a: 'In the model about half goes into land plants and soils, a quarter into the surface ocean and a small part into the deep ocean. Real land and ocean sinks are weaker than the model\'s proportional rule allows, so in reality about 40–45% of emitted carbon stays airborne.' },
        { q: 'The surface ocean holds 900 GtC and passes about 4.5 GtC per year to the deep ocean. Estimate the average time a carbon atom spends in the surface layer before sinking, and explain what this means for recovery after emissions stop.', a: 'Residence time is pool size divided by outflow: 900 divided by 4.5 is about 200 years. Draining the excess carbon into the deep ocean is therefore a multi-century process, so the atmosphere stays elevated long after emissions stop.' },
      ],
      id: [
        { q: 'Dalam model, sekitar 60 GtC per tahun larut dari atmosfer ke laut permukaan dan sekitar 60 GtC per tahun kembali keluar. Mengapa pool atmosfer tetap konstan saat emisi nol?', a: 'Karena kedua aliran itu sama besar dan berlawanan arah, sehingga pertukaran netonya nol; hal yang sama berlaku untuk pertukaran dengan darat. Hanya masukan tanpa keluaran yang mengimbangi, seperti emisi manusia, yang mengubah ukuran pool.' },
        { q: 'Jalankan simulasi pada 10 GtC per tahun selama 100 tahun. Kira-kira 1.000 GtC diemisikan, tetapi atmosfer hanya bertambah sekitar 190 GtC. Ke mana sisanya, dan mengapa simulasi berbeda dari dunia nyata?', a: 'Dalam model, sekitar setengahnya masuk ke tumbuhan dan tanah, seperempat ke laut permukaan, dan sebagian kecil ke laut dalam. Penyerap darat dan laut yang sebenarnya lebih lemah daripada aturan sebanding dalam model, sehingga di dunia nyata sekitar 40–45% karbon yang diemisikan tetap berada di udara.' },
        { q: 'Laut permukaan menyimpan 900 GtC dan meneruskan sekitar 4,5 GtC per tahun ke laut dalam. Perkirakan rata-rata waktu sebuah atom karbon berada di lapisan permukaan sebelum tenggelam, dan jelaskan artinya bagi pemulihan setelah emisi berhenti.', a: 'Waktu tinggal adalah ukuran pool dibagi aliran keluar: 900 dibagi 4,5 kira-kira 200 tahun. Mengalirkan kelebihan karbon ke laut dalam karena itu adalah proses berabad-abad, sehingga atmosfer tetap tinggi lama setelah emisi berhenti.' },
      ],
    },
  },
};
