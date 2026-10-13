// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish unsaturated, saturated, and supersaturated solutions.',
      'Predict how temperature changes solubility.',
      'Read solubility from a curve at a chosen temperature.',
    ],
    id: [
      'Membedakan larutan tidak jenuh, jenuh, dan lewat jenuh.',
      'Memprediksi perubahan kelarutan terhadap suhu.',
      'Membaca kelarutan dari kurva pada suhu tertentu.',
    ],
  },
  tryThis: {
    en: [
      'Add solute past the saturation point — does the rest sink?',
      'Heat the water from 20 °C to 80 °C — what happens to the deposit?',
      'Compare KNO₃ vs NaCl curves — which is more sensitive to temperature?',
    ],
    id: [
      'Tambahkan zat terlarut melebihi batas jenuh — apakah sisanya mengendap?',
      'Panaskan air dari 20 °C ke 80 °C — apa yang terjadi pada endapan?',
      'Bandingkan kurva KNO₃ vs NaCl — mana yang lebih peka suhu?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Stir a spoon of sugar into a glass of water and it disappears: the sugar has dissolved. Water molecules surround each sugar particle and pull it away from the crystal, spreading it evenly through the liquid. Keep adding sugar and at some point no more will dissolve, however long you stir; the extra sinks and sits at the bottom. The solution is now saturated. The amount that can dissolve is called the solubility, and chemists measure it in grams of solute per 100 grams of water at a given temperature.',
        'The simulation uses a solubility curve for each substance: a line showing how many grams dissolve in 100 g of water at each temperature. The limit for your beaker is the curve value scaled by how much water you have; with 200 g of water you can dissolve twice as much as with 100 g. As long as you add less than the limit, everything dissolves and the solution is unsaturated. Add more and the excess appears as a deposit on the bottom, while the water above it holds exactly the limit and is saturated. The water tint deepens as the solution approaches saturation.',
        'The temperature slider is the most interesting control. For most solids, hot water dissolves more than cold water, but by very different amounts. Potassium nitrate (KNO₃) is extremely sensitive: its curve climbs steeply, so warming a beaker that has a deposit makes the deposit shrink and vanish, and cooling it makes crystals come back. Table salt (NaCl) is nearly flat, so heating hardly helps. Sugar dissolves in huge amounts at any temperature. The spoon button adds 5 g at a time, which is handy for creeping up to the limit and watching the status change from unsaturated to saturated.',
        'The simulation keeps things simple. Dissolving happens instantly, whereas real crystals take time and stirring. The curves are smooth approximations of measured data, so the numbers are close but not exact. Real solutions can also become supersaturated for a while: if a hot saturated solution cools slowly without dust or a seed crystal, it can hold more than the limit until something triggers sudden crystallisation. The sim never does this; excess always drops out at once. Gases behave the opposite way to these solids, dissolving less in warm water, and that is not shown here.',
      ],
      id: [
        'Aduk sesendok gula ke dalam segelas air dan gula itu menghilang: gula telah larut. Molekul air mengerumuni tiap partikel gula dan menariknya lepas dari kristal, lalu menyebarkannya merata di seluruh cairan. Terus tambahkan gula, dan pada suatu titik tidak ada lagi yang mau larut walau diaduk berapa lama pun; sisanya tenggelam dan mengendap di dasar. Larutan kini jenuh. Banyaknya zat yang dapat larut disebut kelarutan, dan kimiawan mengukurnya dalam gram zat terlarut per 100 gram air pada suhu tertentu.',
        'Simulasi memakai kurva kelarutan untuk setiap zat: garis yang menunjukkan berapa gram larut dalam 100 g air pada tiap suhu. Batas untuk gelasmu adalah nilai kurva yang disesuaikan dengan banyaknya air; dengan 200 g air kamu dapat melarutkan dua kali lebih banyak daripada dengan 100 g. Selama yang ditambahkan kurang dari batas, semuanya larut dan larutan tidak jenuh. Tambahkan lebih banyak, maka kelebihannya muncul sebagai endapan di dasar, sementara air di atasnya menampung tepat sebesar batas dan bersifat jenuh. Warna air makin pekat saat larutan mendekati jenuh.',
        'Slider suhu adalah kontrol yang paling menarik. Untuk kebanyakan zat padat, air panas melarutkan lebih banyak daripada air dingin, tetapi besarnya sangat berbeda. Kalium nitrat (KNO₃) sangat peka: kurvanya menanjak tajam, sehingga memanaskan gelas yang berendapan membuat endapan menyusut dan hilang, dan mendinginkannya membuat kristal muncul kembali. Garam dapur (NaCl) hampir datar, sehingga pemanasan hampir tidak membantu. Gula larut dalam jumlah sangat besar pada suhu apa pun. Tombol sendok menambahkan 5 g setiap kali, cocok untuk mendekati batas pelan-pelan sambil mengamati status berubah dari tidak jenuh menjadi jenuh.',
        'Simulasi ini dibuat sederhana. Pelarutan terjadi seketika, padahal kristal sungguhan butuh waktu dan pengadukan. Kurvanya adalah pendekatan halus dari data pengukuran, sehingga angkanya mendekati tetapi tidak persis. Larutan nyata juga bisa lewat jenuh untuk sementara: jika larutan jenuh yang panas didinginkan perlahan tanpa debu atau kristal bibit, ia dapat menampung lebih dari batas sampai sesuatu memicu pengkristalan mendadak. Simulasi tidak pernah melakukannya; kelebihan selalu langsung mengendap. Gas berperilaku berlawanan dengan zat padat ini, lebih sedikit larut dalam air hangat, dan itu tidak ditampilkan di sini.',
      ],
    },
    figure: {
      caption: {
        en: 'A solubility curve tells you the most that can dissolve at each temperature. Below the curve everything dissolves (unsaturated); on the curve the solution is saturated; above it the extra solute cannot dissolve and settles as a deposit. KNO₃ rises steeply with temperature while NaCl barely changes.',
        id: 'Kurva kelarutan menunjukkan jumlah terbanyak yang dapat larut pada tiap suhu. Di bawah kurva semuanya larut (tidak jenuh); pada kurva larutan jenuh; di atasnya zat berlebih tidak dapat larut dan mengendap. KNO₃ naik tajam terhadap suhu, sedangkan NaCl hampir tidak berubah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Solubility curves of KNO3 and NaCl', 'Kurva kelarutan KNO3 dan NaCl')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{stroke:currentColor;stroke-width:.6;opacity:.25}.c{fill:none;stroke-width:2.6}</style>
  <line x1="50" y1="166" x2="330" y2="166" class="g"/><line x1="50" y1="132" x2="330" y2="132" class="g"/>
  <line x1="50" y1="98" x2="330" y2="98" class="g"/><line x1="50" y1="64" x2="330" y2="64" class="g"/>
  <path d="M50 191 Q106 176 162 150 Q218 118 274 82 Q302 60 330 38" class="c" stroke="#8b5cf6"/>
  <path d="M50 176 L330 172" class="c" stroke="#3b82f6"/>
  <text x="290" y="36" fill="#8b5cf6" style="font-weight:bold">KNO₃</text>
  <text x="290" y="188" fill="#3b82f6" style="font-weight:bold">NaCl</text>
  <circle cx="162" cy="150" r="5" fill="#f59e0b"/>
  <text x="172" y="146" fill="#f59e0b">${L('saturated: on the curve', 'jenuh: pada kurva')}</text>
  <circle cx="162" cy="100" r="5" fill="#ef4444"/>
  <text x="172" y="96" fill="#ef4444">${L('too much: deposit forms', 'terlalu banyak: terbentuk endapan')}</text>
  <circle cx="110" cy="195" r="5" fill="#10b981"/>
  <text x="120" y="212" fill="#10b981">${L('unsaturated: all dissolves', 'tidak jenuh: semua larut')}</text>
  <line x1="162" y1="186" x2="162" y2="108" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".6" marker-end="url(#ar)"/>
  <text x="166" y="178" opacity=".8">${L('add solute', 'tambah zat')}</text>
  <line x1="50" y1="20" x2="50" y2="200" class="ax"/>
  <line x1="50" y1="200" x2="330" y2="200" class="ax"/>
  <text x="46" y="203" text-anchor="end">0</text><text x="46" y="169" text-anchor="end">50</text><text x="46" y="135" text-anchor="end">100</text>
  <text x="46" y="101" text-anchor="end">150</text><text x="46" y="67" text-anchor="end">200</text>
  <text x="14" y="110" transform="rotate(-90 14 110)" text-anchor="middle">${L('grams per 100 g water', 'gram per 100 g air')}</text>
  <text x="50" y="214" text-anchor="middle">0</text><text x="190" y="214" text-anchor="middle">50</text><text x="330" y="214" text-anchor="middle">100</text>
  <text x="190" y="230" text-anchor="middle">${L('temperature (°C)', 'suhu (°C)')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Solubility is the greatest mass of a substance that can dissolve in 100 g of water at a given temperature.',
        'A solution is unsaturated while it can still take more solute, and saturated when it holds the maximum; any extra settles as a deposit.',
        'Doubling the amount of water doubles the amount of solute that can dissolve.',
        'For most solids, solubility rises with temperature, but by very different amounts: KNO₃ changes a lot, NaCl hardly at all.',
        'Cooling a saturated solution makes solute crystallise out, because the limit falls below what is dissolved.',
      ],
      id: [
        'Kelarutan adalah massa terbesar suatu zat yang dapat larut dalam 100 g air pada suhu tertentu.',
        'Larutan disebut tidak jenuh selama masih dapat menerima zat terlarut, dan jenuh ketika sudah menampung jumlah maksimum; kelebihannya mengendap.',
        'Menggandakan jumlah air menggandakan jumlah zat yang dapat larut.',
        'Untuk kebanyakan zat padat, kelarutan naik seiring suhu, tetapi besarnya sangat berbeda: KNO₃ berubah banyak, NaCl hampir tidak.',
        'Mendinginkan larutan jenuh membuat zat terlarut mengkristal, karena batasnya turun di bawah jumlah yang terlarut.',
      ],
    },
    vocabulary: {
      en: [
        ['Solute', 'The substance that dissolves, such as salt or sugar.'],
        ['Solvent', 'The liquid that does the dissolving; here, water.'],
        ['Solution', 'The even mixture formed when a solute dissolves in a solvent.'],
        ['Solubility', 'How much solute can dissolve in 100 g of water at a given temperature.'],
        ['Saturated solution', 'A solution holding as much dissolved solute as it can at that temperature.'],
        ['Unsaturated solution', 'A solution that could still dissolve more solute.'],
        ['Supersaturated solution', 'An unstable solution holding more than the normal limit, made by cooling a saturated solution slowly; not shown in the sim.'],
        ['Crystallisation', 'Dissolved solute coming out of solution as solid crystals, for example when a solution cools.'],
      ],
      id: [
        ['Zat terlarut', 'Zat yang larut, misalnya garam atau gula.'],
        ['Pelarut', 'Cairan yang melarutkan; di sini, air.'],
        ['Larutan', 'Campuran merata yang terbentuk ketika zat terlarut larut dalam pelarut.'],
        ['Kelarutan', 'Banyaknya zat terlarut yang dapat larut dalam 100 g air pada suhu tertentu.'],
        ['Larutan jenuh', 'Larutan yang sudah menampung zat terlarut sebanyak yang bisa pada suhu itu.'],
        ['Larutan tidak jenuh', 'Larutan yang masih dapat melarutkan zat terlarut lebih banyak.'],
        ['Larutan lewat jenuh', 'Larutan tidak stabil yang menampung lebih dari batas normal, dibuat dengan mendinginkan larutan jenuh secara perlahan; tidak ditampilkan di simulasi.'],
        ['Pengkristalan', 'Zat terlarut keluar dari larutan sebagai kristal padat, misalnya ketika larutan mendingin.'],
      ],
    },
    misconceptions: {
      en: [
        ['When a solute dissolves it disappears, so the solution weighs less.', 'The solute is still there, broken into particles too small to see. The mass of the solution equals the mass of water plus the mass of solute; you can get it all back by evaporating the water.'],
        ['Stirring makes more solute dissolve.', 'Stirring only makes dissolving faster. The limit at a given temperature is the same whether you stir or not; once saturated, stirring for an hour changes nothing.'],
        ['Everything dissolves better in hot water.', 'Most solids do, but by different amounts (NaCl barely changes), and gases such as oxygen and carbon dioxide dissolve less in warm water, which is why warm soda goes flat faster.'],
        ['A saturated solution is always a very concentrated one.', 'Saturated means at the limit, whatever that limit is. Sugar is saturated at over 180 g per 100 g water, but some substances saturate at a tiny fraction of a gram.'],
      ],
      id: [
        ['Ketika zat terlarut larut, ia menghilang, sehingga larutan menjadi lebih ringan.', 'Zat itu masih ada, terpecah menjadi partikel yang terlalu kecil untuk dilihat. Massa larutan sama dengan massa air ditambah massa zat terlarut; semuanya bisa didapat kembali dengan menguapkan airnya.'],
        ['Mengaduk membuat lebih banyak zat larut.', 'Mengaduk hanya mempercepat pelarutan. Batas pada suhu tertentu tetap sama, diaduk atau tidak; begitu jenuh, mengaduk satu jam pun tidak mengubah apa-apa.'],
        ['Semua zat lebih mudah larut dalam air panas.', 'Kebanyakan zat padat memang begitu, tetapi besarnya berbeda-beda (NaCl hampir tidak berubah), dan gas seperti oksigen dan karbon dioksida justru lebih sedikit larut dalam air hangat; itulah sebabnya soda hangat lebih cepat kehilangan gasnya.'],
        ['Larutan jenuh selalu larutan yang sangat pekat.', 'Jenuh berarti berada pada batas, berapa pun batas itu. Gula jenuh pada lebih dari 180 g per 100 g air, tetapi beberapa zat sudah jenuh pada sepersekian gram saja.'],
      ],
    },
    realWorld: {
      en: [
        'Rock candy is made by dissolving as much sugar as possible in hot water and letting it cool slowly: the sugar that no longer fits grows into large crystals on a string.',
        'Sea salt is harvested in shallow ponds where sunlight evaporates the water until the brine is saturated and salt crystallises out.',
        'Sugar dissolves easily in hot tea but sits at the bottom of iced tea, so iced drinks are usually sweetened with syrup.',
        'Fish struggle in warm, still water because oxygen gas dissolves less as the temperature rises, the reverse of what the sim shows for solids.',
      ],
      id: [
        'Permen kristal gula dibuat dengan melarutkan gula sebanyak mungkin dalam air panas lalu mendinginkannya perlahan: gula yang tidak lagi muat tumbuh menjadi kristal besar pada seutas tali.',
        'Garam laut dipanen di tambak dangkal; sinar matahari menguapkan air sampai air garamnya jenuh dan garam mengkristal.',
        'Gula mudah larut dalam teh panas tetapi mengendap di dasar es teh, sehingga minuman dingin biasanya dimaniskan dengan sirup.',
        'Ikan kesulitan di air hangat yang tenang karena gas oksigen lebih sedikit larut saat suhu naik, kebalikan dari yang ditunjukkan simulasi untuk zat padat.',
      ],
    },
    questions: {
      en: [
        { q: 'At 20 °C about 36 g of NaCl dissolves in 100 g of water. How much NaCl can you dissolve in 300 g of water at the same temperature?', a: 'About 108 g. Three times as much water dissolves three times as much salt, because every 100 g of water takes its own 36 g.' },
        { q: 'You make a saturated KNO₃ solution in 100 g of water at 60 °C and let it cool to 20 °C. What will you see, and how would you work out how much?', a: 'Crystals of KNO₃ appear on the bottom as the solution cools, because the limit at 20 °C is much lower than at 60 °C. The mass that crystallises is the difference between the two curve readings: solubility at 60 °C minus solubility at 20 °C (roughly 80 g for the curve in the sim).' },
        { q: 'A beaker of NaCl solution has a deposit on the bottom. Will heating the water from 20 °C to 80 °C make the deposit dissolve? Compare with KNO₃.', a: 'Hardly at all. The NaCl curve is almost flat, so the limit rises only a few grams over that range and most of the deposit stays. A KNO₃ deposit would dissolve easily, because its limit rises by well over 100 g per 100 g of water between 20 °C and 80 °C.' },
      ],
      id: [
        { q: 'Pada 20 °C sekitar 36 g NaCl larut dalam 100 g air. Berapa NaCl yang dapat kamu larutkan dalam 300 g air pada suhu yang sama?', a: 'Sekitar 108 g. Air tiga kali lebih banyak melarutkan garam tiga kali lebih banyak, karena setiap 100 g air menampung 36 g-nya sendiri.' },
        { q: 'Kamu membuat larutan KNO₃ jenuh dalam 100 g air pada 60 °C lalu membiarkannya mendingin sampai 20 °C. Apa yang akan terlihat, dan bagaimana menghitung banyaknya?', a: 'Kristal KNO₃ muncul di dasar saat larutan mendingin, karena batas pada 20 °C jauh lebih rendah daripada pada 60 °C. Massa yang mengkristal adalah selisih dua pembacaan kurva: kelarutan pada 60 °C dikurangi kelarutan pada 20 °C (kira-kira 80 g untuk kurva di simulasi).' },
        { q: 'Sebuah gelas larutan NaCl memiliki endapan di dasar. Apakah memanaskan air dari 20 °C ke 80 °C akan melarutkan endapannya? Bandingkan dengan KNO₃.', a: 'Hampir tidak. Kurva NaCl hampir datar, sehingga batasnya hanya naik beberapa gram pada rentang itu dan sebagian besar endapan tetap ada. Endapan KNO₃ akan larut dengan mudah, karena batasnya naik lebih dari 100 g per 100 g air antara 20 °C dan 80 °C.' },
      ],
    },
  },
};
