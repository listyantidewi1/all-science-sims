// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect viscosity & gas content to eruption style.',
      'Identify shield (Hawaii), stratovolcano (Mt Fuji), cinder cone (Paricutin), lava dome.',
      'Understand why silica-rich magma traps gas → explosive eruptions.',
    ],
    id: [
      'Menghubungkan viskositas & gas dengan gaya letusan.',
      'Mengidentifikasi perisai (Hawaii), stratovolkano (Gunung Fuji), kerucut bara (Paricutin), kubah lava.',
      'Memahami mengapa magma kaya silika menjebak gas → letusan eksplosif.',
    ],
  },
  tryThis: {
    en: [
      'Low viscosity, low gas — Hawaiian shield, broad gentle slopes.',
      'High viscosity, high gas — Plinian stratovolcano, towering ash column.',
      'High viscosity, low gas — lava dome, slow extrusion.',
    ],
    id: [
      'Viskositas rendah, gas rendah — perisai Hawaii, lereng landai.',
      'Viskositas tinggi, gas tinggi — stratovolkano Plinian, kolom abu menjulang.',
      'Viskositas tinggi, gas rendah — kubah lava, ekstrusi lambat.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Deep under a volcano sits a chamber of magma: molten rock mixed with dissolved gases such as water vapour, carbon dioxide and sulfur dioxide. Not all magma is the same. Magma that is hot and low in silica, such as basalt, is runny, a bit like warm honey. Magma that is cooler and rich in silica, such as rhyolite, is sticky, more like cold toothpaste. How runny or sticky a liquid is called its viscosity. When magma rises toward the surface, the pressure on it drops and the dissolved gas forms bubbles, just as a fizzy drink foams when you open the bottle. In runny magma the bubbles slip out easily, so the lava simply pours out and flows away: an effusive eruption. In sticky magma the bubbles are trapped until the pressure is high enough to blow the magma apart into ash: an explosive eruption.',
        'The simulation lets you set those two properties with the viscosity and gas sliders, and it redraws the volcano to match. Stickier magma piles up near the vent instead of flowing away, so the cone grows steeper and taller as you raise the viscosity, while very runny magma spreads into a broad, gently sloping shield. The gas slider sets the eruption style when Erupting is switched on: with low gas, red lava fountains and flows; above about half, the volcano fires grey ash high into the air. From the two slider positions the sim names the type you have built: a shield volcano (runny, little gas), a cinder cone (fairly runny but gas-rich, so lava is sprayed into small chunks that pile up), a stratovolcano (sticky and gas-rich, giving tall ash columns and dangerous pyroclastic flows), or a lava dome (sticky with little gas, so the lava is squeezed out slowly like paste). In between it says mixed.',
        'The picture is a sketch rather than a real mountain. The sim draws every type at roughly the same scale, but real cinder cones are small, usually only a few hundred metres high, and they are steep because loose cinders pile up at the steepest angle they can hold, not because of viscosity. Real lava domes are also small bulges, often growing inside the crater of a larger volcano, whereas the sim draws them as tall as a stratovolcano. A real volcano can also change style from one eruption to the next, and features like lahars (mudflows), lava tubes and calderas are not shown. The link the sim does get right is the important one: viscosity shapes the cone, and gas decides whether the eruption flows or explodes.',
      ],
      id: [
        'Jauh di bawah gunung api terdapat dapur magma: batuan cair yang bercampur dengan gas terlarut seperti uap air, karbon dioksida, dan belerang dioksida. Tidak semua magma sama. Magma yang panas dan rendah silika, seperti basal, bersifat encer, agak seperti madu hangat. Magma yang lebih dingin dan kaya silika, seperti riolit, bersifat kental dan lengket, lebih seperti pasta gigi dingin. Seberapa encer atau kental suatu cairan disebut viskositas. Ketika magma naik menuju permukaan, tekanannya turun dan gas terlarut membentuk gelembung, sama seperti minuman bersoda yang berbuih saat botolnya dibuka. Dalam magma encer gelembung mudah lolos, sehingga lava hanya mengucur keluar dan mengalir pergi: letusan efusif. Dalam magma kental gelembung terjebak sampai tekanannya cukup besar untuk meledakkan magma menjadi abu: letusan eksplosif.',
        'Simulasi ini membiarkanmu mengatur kedua sifat itu dengan slider viskositas dan gas, lalu menggambar ulang gunung apinya agar sesuai. Magma yang lebih kental menumpuk di dekat lubang kepundan alih-alih mengalir pergi, sehingga kerucut menjadi makin curam dan tinggi saat viskositas dinaikkan, sedangkan magma yang sangat encer menyebar menjadi perisai yang lebar dan landai. Slider gas menentukan gaya letusan ketika sakelar Erupting dinyalakan: dengan gas rendah, lava merah memancar dan mengalir; di atas sekitar setengah, gunung api menyemburkan abu kelabu tinggi ke udara. Dari posisi kedua slider, simulasi menamai tipe yang kamu buat: gunung api perisai (encer, sedikit gas), kerucut bara (agak encer tetapi kaya gas, sehingga lava disemburkan menjadi bongkahan kecil yang menumpuk), stratovolkano (kental dan kaya gas, menghasilkan kolom abu tinggi dan aliran piroklastik yang berbahaya), atau kubah lava (kental dengan sedikit gas, sehingga lava terperas keluar perlahan seperti pasta). Di antaranya, simulasi menyebutnya campuran.',
        'Gambarnya adalah sketsa, bukan gunung sungguhan. Simulasi menggambar semua tipe dengan skala yang hampir sama, padahal kerucut bara sungguhan kecil, biasanya hanya beberapa ratus meter tingginya, dan curam karena bara yang lepas menumpuk pada sudut tercuram yang bisa ditahannya, bukan karena viskositas. Kubah lava sungguhan juga hanya tonjolan kecil, sering tumbuh di dalam kawah gunung api yang lebih besar, sedangkan simulasi menggambarnya setinggi stratovolkano. Gunung api sungguhan juga bisa berganti gaya dari satu letusan ke letusan berikutnya, dan hal-hal seperti lahar, terowongan lava, dan kaldera tidak ditampilkan. Kaitan yang digambarkan dengan benar oleh simulasi adalah yang terpenting: viskositas membentuk kerucut, dan gas menentukan apakah letusan mengalir atau meledak.',
      ],
    },
    figure: {
      caption: {
        en: 'Cross-section of a stratovolcano: sticky, gas-rich magma builds a steep cone of alternating ash and lava layers and erupts explosively. Runny magma spreads into a low shield; sticky magma with little gas oozes out as a small lava dome.',
        id: 'Penampang stratovolkano: magma kental yang kaya gas membangun kerucut curam dari lapisan abu dan lava yang berselang-seling dan meletus secara eksplosif. Magma encer menyebar menjadi perisai rendah; magma kental dengan sedikit gas merembes keluar sebagai kubah lava kecil.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Volcano cross-section with magma chamber, conduit, layers and ash column', 'Penampang gunung api dengan dapur magma, saluran, lapisan, dan kolom abu')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.t{text-anchor:middle}</style>
  <line x1="0" y1="170" x2="360" y2="170" stroke="currentColor" stroke-width="1.5"/>
  <rect x="0" y="170" width="360" height="70" fill="currentColor" opacity=".08"/>
  <path d="M88 170 L164 62 L176 62 L252 170 Z" fill="currentColor" opacity=".15" stroke="currentColor" stroke-width="1.2"/>
  <path d="M104 148 L158 72 M118 128 L160 68 M236 148 L182 72 M222 128 L180 68" stroke="#f59e0b" stroke-width="1.5" opacity=".8"/>
  <path d="M112 136 L159 70 M126 118 L161 66 M228 136 L181 70 M214 118 L179 66" stroke="#ef4444" stroke-width="1.5" opacity=".6"/>
  <text x="258" y="110">${L('layers of ash', 'lapisan abu')}</text>
  <text x="258" y="122">${L('and lava', 'dan lava')}</text>
  <rect x="166" y="62" width="8" height="118" fill="#ef4444"/>
  <text x="196" y="150">${L('conduit', 'saluran')}</text>
  <ellipse cx="170" cy="206" rx="52" ry="22" fill="#ef4444" opacity=".65"/>
  <text x="170" y="210" class="t">${L('magma chamber', 'dapur magma')}</text>
  <circle cx="162" cy="200" r="3" fill="#ffffff" opacity=".7"/><circle cx="180" cy="212" r="2.5" fill="#ffffff" opacity=".7"/><circle cx="192" cy="200" r="2" fill="#ffffff" opacity=".7"/>
  <text x="232" y="196">${L('gas bubbles', 'gelembung gas')}</text>
  <path d="M170 60 L170 30" stroke="#8b5cf6" stroke-width="3"/>
  <circle cx="170" cy="26" r="14" fill="#8b5cf6" opacity=".55"/><circle cx="152" cy="32" r="11" fill="#8b5cf6" opacity=".55"/><circle cx="188" cy="32" r="11" fill="#8b5cf6" opacity=".55"/><circle cx="170" cy="14" r="9" fill="#8b5cf6" opacity=".55"/>
  <text x="212" y="28">${L('ash column (explosive)', 'kolom abu (eksplosif)')}</text>
  <path d="M176 66 Q200 110 236 160" fill="none" stroke="#ef4444" stroke-width="2.5"/>
  <text x="226" y="60" fill="#ef4444">${L('lava flow', 'aliran lava')}</text>
  <path d="M250 170 Q302 136 356 170" fill="none" stroke="#3b82f6" stroke-width="1.8" stroke-dasharray="5 3"/>
  <text x="304" y="150" class="t" fill="#3b82f6">${L('shield: runny magma', 'perisai: magma encer')}</text>
  <path d="M20 170 Q44 128 68 170" fill="none" stroke="#10b981" stroke-width="1.8" stroke-dasharray="5 3"/>
  <text x="44" y="120" class="t" fill="#10b981">${L('lava dome:', 'kubah lava:')}</text>
  <text x="44" y="132" class="t" fill="#10b981">${L('sticky, little gas', 'kental, sedikit gas')}</text>
  <text x="180" y="236" class="t">${L('stickier magma = steeper cone;  more gas = more explosive', 'magma lebih kental = kerucut lebih curam;  gas lebih banyak = lebih eksplosif')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Viscosity (how sticky the magma is) depends mainly on silica content and temperature: basalt is runny, rhyolite is sticky.',
        'Runny magma lets gas escape and produces gentle lava flows and broad shield volcanoes.',
        'Sticky magma traps gas until it bursts, producing ash columns and steep stratovolcanoes.',
        'Sticky magma with little gas oozes out slowly as a lava dome; runny, gas-rich magma sprays cinders into a small cinder cone.',
        'The sim links the cone shape and eruption style to just two sliders; real volcanoes also depend on size, history and surroundings.',
      ],
      id: [
        'Viskositas (seberapa kental magma) bergantung terutama pada kandungan silika dan suhu: basal encer, riolit kental.',
        'Magma encer membiarkan gas lolos dan menghasilkan aliran lava yang tenang serta gunung api perisai yang lebar.',
        'Magma kental menjebak gas sampai meledak, menghasilkan kolom abu dan stratovolkano yang curam.',
        'Magma kental dengan sedikit gas merembes keluar perlahan sebagai kubah lava; magma encer yang kaya gas menyemburkan bara menjadi kerucut bara yang kecil.',
        'Simulasi mengaitkan bentuk kerucut dan gaya letusan hanya dengan dua slider; gunung api sungguhan juga bergantung pada ukuran, sejarah, dan lingkungannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Magma', 'Molten rock, with dissolved gases and crystals, while it is still underground.'],
        ['Lava', 'Magma once it reaches the surface. It is the same material with a new name.'],
        ['Viscosity', 'How much a liquid resists flowing. Honey has a high viscosity, water a low one.'],
        ['Silica', 'Silicon dioxide, the main ingredient of most rock. More silica makes magma stickier.'],
        ['Effusive eruption', 'A gentle eruption in which lava pours out and flows away, typical of runny magma.'],
        ['Explosive eruption', 'An eruption in which trapped gas blasts the magma apart into ash and rock fragments.'],
        ['Pyroclastic flow', 'A fast-moving avalanche of hot ash, gas and rock that races down a volcano\'s slopes; the deadliest volcanic hazard.'],
        ['Vent', 'The opening through which magma, gas and ash leave the volcano; the crater is the bowl around it.'],
      ],
      id: [
        ['Magma', 'Batuan cair, dengan gas terlarut dan kristal, selagi masih di bawah tanah.'],
        ['Lava', 'Magma setelah mencapai permukaan. Bahannya sama, hanya namanya yang berganti.'],
        ['Viskositas', 'Seberapa besar suatu cairan menahan aliran. Madu berviskositas tinggi, air berviskositas rendah.'],
        ['Silika', 'Silikon dioksida, bahan utama sebagian besar batuan. Makin banyak silika, makin kental magma.'],
        ['Letusan efusif', 'Letusan tenang ketika lava mengucur keluar dan mengalir pergi, khas magma encer.'],
        ['Letusan eksplosif', 'Letusan ketika gas yang terjebak meledakkan magma menjadi abu dan pecahan batuan.'],
        ['Aliran piroklastik', 'Longsoran cepat berupa abu panas, gas, dan batuan yang meluncur menuruni lereng gunung api; bahaya gunung api yang paling mematikan.'],
        ['Lubang kepundan', 'Bukaan tempat magma, gas, dan abu keluar dari gunung api; kawah adalah cekungan di sekitarnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['All volcanoes erupt with a huge explosion.', 'Many do not. Shield volcanoes such as those in Hawaii mostly pour out rivers of lava with little explosion, because their runny magma lets gas escape quietly. Explosions need sticky, gas-rich magma.'],
        ['Lava is the most dangerous thing a volcano produces.', 'Lava usually moves slowly enough to walk away from. Far more people have been killed by pyroclastic flows, ash falls, mudflows (lahars) and the tsunamis some eruptions trigger.'],
        ['Magma and lava are different substances.', 'They are the same molten rock. It is called magma while underground and lava once it reaches the surface.'],
        ['A volcano\'s shape is just chance.', 'The shape records the magma. Runny lava spreads far before it cools, building a low wide shield; sticky lava and ash stay near the vent, building a steep cone.'],
      ],
      id: [
        ['Semua gunung api meletus dengan ledakan dahsyat.', 'Banyak yang tidak. Gunung api perisai seperti di Hawaii umumnya mengucurkan sungai lava dengan sedikit ledakan, karena magmanya yang encer membiarkan gas lolos dengan tenang. Ledakan membutuhkan magma yang kental dan kaya gas.'],
        ['Lava adalah hal paling berbahaya yang dihasilkan gunung api.', 'Lava biasanya bergerak cukup lambat untuk dihindari dengan berjalan kaki. Jauh lebih banyak orang tewas karena aliran piroklastik, hujan abu, lahar, dan tsunami yang dipicu oleh beberapa letusan.'],
        ['Magma dan lava adalah zat yang berbeda.', 'Keduanya adalah batuan cair yang sama. Disebut magma selagi di bawah tanah dan lava setelah mencapai permukaan.'],
        ['Bentuk gunung api hanya kebetulan.', 'Bentuknya merekam magmanya. Lava encer menyebar jauh sebelum mendingin, membangun perisai rendah yang lebar; lava kental dan abu tetap di dekat lubang kepundan, membangun kerucut yang curam.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesia has about 130 active volcanoes, more than any other country, and most of them are stratovolcanoes such as Merapi, Semeru and Sinabung, fed by sticky magma above the subducting Indo-Australian plate.',
        'Mount Merapi repeatedly grows a lava dome in its summit crater; when the dome collapses it sends pyroclastic flows, known locally as wedhus gembel, racing down its slopes.',
        'Mauna Loa in Hawaii is the classic shield volcano: its slopes are so gentle that the mountain is about 120 km across, yet it rises more than 9 km from the sea floor.',
        'In 1943 the cinder cone Paricutín appeared in a Mexican cornfield and grew to over 400 m in a year; in 1980 Mount St Helens blew out its side and then slowly built a new lava dome inside the crater.',
      ],
      id: [
        'Indonesia memiliki sekitar 130 gunung api aktif, lebih banyak dari negara mana pun, dan sebagian besar adalah stratovolkano seperti Merapi, Semeru, dan Sinabung, yang diberi makan magma kental di atas lempeng Indo-Australia yang menunjam.',
        'Gunung Merapi berulang kali menumbuhkan kubah lava di kawah puncaknya; ketika kubah itu runtuh, ia mengirim aliran piroklastik, yang oleh penduduk disebut wedhus gembel, meluncur menuruni lerengnya.',
        'Mauna Loa di Hawaii adalah gunung api perisai yang klasik: lerengnya begitu landai sehingga gunung itu lebarnya sekitar 120 km, tetapi menjulang lebih dari 9 km dari dasar laut.',
        'Pada 1943 kerucut bara Paricutín muncul di ladang jagung di Meksiko dan tumbuh lebih dari 400 m dalam setahun; pada 1980 Gunung St Helens meledakkan sisinya lalu perlahan membangun kubah lava baru di dalam kawahnya.',
      ],
    },
    questions: {
      en: [
        { q: 'Set viscosity low and gas low, then viscosity high and gas high. How does the cone change, and why does the eruption look so different?', a: 'The low-low setting gives a wide, gentle shield that pours out red lava, because runny magma flows far before cooling and lets its gas escape calmly. The high-high setting gives a tall, steep cone firing grey ash, because sticky magma piles up near the vent and traps gas until it bursts the magma into fragments.' },
        { q: 'Keep viscosity high but slide the gas from high to low. What type does the sim name now, and what does that tell you about the role of gas?', a: 'It changes from a stratovolcano to a lava dome. The magma is just as sticky, but with little gas there is nothing to blow it apart, so it is squeezed out slowly as a thick paste. Gas, not viscosity, decides whether an eruption explodes.' },
        { q: 'Why does a bottle of fizzy drink help explain an explosive eruption?', a: 'Gas is dissolved in the drink under pressure. Open the bottle and the pressure drops, so the gas comes out as bubbles; shake it first and it sprays out violently. Magma works the same way: as it rises, pressure falls and dissolved gas forms bubbles. In sticky magma the bubbles cannot escape, so the pressure builds until the whole mass bursts into ash.' },
      ],
      id: [
        { q: 'Atur viskositas rendah dan gas rendah, lalu viskositas tinggi dan gas tinggi. Bagaimana kerucutnya berubah, dan mengapa letusannya tampak begitu berbeda?', a: 'Pengaturan rendah-rendah memberi perisai lebar dan landai yang mengucurkan lava merah, karena magma encer mengalir jauh sebelum mendingin dan membiarkan gasnya lolos dengan tenang. Pengaturan tinggi-tinggi memberi kerucut tinggi dan curam yang menyemburkan abu kelabu, karena magma kental menumpuk di dekat lubang kepundan dan menjebak gas sampai gas itu memecah magma menjadi serpihan.' },
        { q: 'Biarkan viskositas tinggi tetapi geser gas dari tinggi ke rendah. Tipe apa yang kini disebut simulasi, dan apa artinya tentang peran gas?', a: 'Berubah dari stratovolkano menjadi kubah lava. Magmanya sama kentalnya, tetapi dengan sedikit gas tidak ada yang meledakkannya, sehingga ia terperas keluar perlahan seperti pasta kental. Gas, bukan viskositas, yang menentukan apakah letusan meledak.' },
        { q: 'Mengapa sebotol minuman bersoda membantu menjelaskan letusan eksplosif?', a: 'Gas terlarut dalam minuman di bawah tekanan. Buka botolnya dan tekanannya turun, sehingga gas keluar sebagai gelembung; kocok dulu dan minuman menyembur dengan keras. Magma bekerja dengan cara yang sama: saat naik, tekanannya turun dan gas terlarut membentuk gelembung. Dalam magma kental gelembung tidak bisa lolos, sehingga tekanan menumpuk sampai seluruh massa meledak menjadi abu.' },
      ],
    },
  },
};
