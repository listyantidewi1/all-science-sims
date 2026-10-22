// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Define pressure as force per unit area and calculate it with P = F/A in pascals (N/m²) and kilopascals.',
      'Predict how changing the force or the contact area changes the pressure, and how deep an object sinks into a soft surface.',
      'Explain everyday designs such as sharp pins, wide snowshoes and tractor tyres in terms of pressure.',
    ],
    id: [
      'Mendefinisikan tekanan sebagai gaya per satuan luas dan menghitungnya dengan P = F/A dalam pascal (N/m²) dan kilopascal.',
      'Memprediksi bagaimana perubahan gaya atau luas bidang sentuh mengubah tekanan, dan seberapa dalam benda tenggelam ke permukaan yang lunak.',
      'Menjelaskan rancangan sehari-hari seperti jarum yang runcing, sepatu salju yang lebar dan ban traktor dengan konsep tekanan.',
    ],
  },
  tryThis: {
    en: [
      'Keep the force at 600 N and switch between the four objects. Read the pressure each time: by what factor does it change from the flat shoe to the heel?',
      'Choose the flat shoe and halve the force. Does the sink depth also halve?',
      'Drag the area slider until the pressure reads about 100 kPa. What area is that for a 600 N force?',
      'Make the ground firmer and find the smallest area that still keeps a 600 N person from sinking more than 2 cm.',
    ],
    id: [
      'Pertahankan gaya 600 N dan ganti-ganti keempat benda. Baca tekanannya setiap kali: berapa kali lipat perubahannya dari sepatu datar ke hak sepatu?',
      'Pilih sepatu datar dan kurangi gayanya menjadi setengah. Apakah kedalaman tenggelamnya juga menjadi setengah?',
      'Geser slider luas sampai tekanan menunjukkan sekitar 100 kPa. Berapa luas itu untuk gaya 600 N?',
      'Buat tanah lebih keras dan cari luas terkecil yang masih membuat orang 600 N tenggelam tidak lebih dari 2 cm.',
    ],
  },

  learn: {
    background: {
      en: [
        'Pressure tells you how concentrated a force is. The same push feels very different if it is spread over your whole palm or focused on the tip of a pin. Pressure is defined as force divided by the area the force acts on: P = F/A. With force in newtons and area in square metres, pressure comes out in newtons per square metre, a unit called the pascal (Pa). One pascal is tiny, so kilopascals (1 kPa = 1000 Pa) are common; air pressure at sea level is about 100 kPa.',
        'Because area is on the bottom of the fraction, a small area gives a huge pressure. A person weighing 600 N standing on a flat shoe of 200 cm² (0.02 m²) presses on the ground with 30 kPa. The same person balanced on a stiletto heel of 1 cm² produces 6000 kPa, two hundred times more. A pin tip of 1 mm² pushed with just 10 N reaches 10 000 kPa, which is why it goes into cork or cloth so easily.',
        'In the sim the weight is pressed into sand, and the sand is modelled as a simple spring: every kilopascal of pressure pushes the object a fixed extra distance in. That makes the sink depth proportional to pressure, until the object reaches the firm bottom of the sand bed. You can change the ground firmness to imitate soft snow, dry sand or packed clay. Watch how the snowshoe barely dents the surface while the heel plunges straight to the bottom, even though the force on both is identical.',
        'Engineers use this rule in both directions. To cut, pierce or grip, they make the area small: knife edges, needles, nails and ice skates. To avoid sinking or damage, they make the area large: snowshoes, skis, camel feet, wide tractor tyres and the broad foundations under buildings.',
      ],
      id: [
        'Tekanan menunjukkan seberapa terpusat sebuah gaya. Dorongan yang sama terasa sangat berbeda jika disebarkan ke seluruh telapak tangan atau dipusatkan pada ujung jarum. Tekanan didefinisikan sebagai gaya dibagi luas bidang yang ditekan: P = F/A. Dengan gaya dalam newton dan luas dalam meter persegi, tekanan bersatuan newton per meter persegi, yang disebut pascal (Pa). Satu pascal sangat kecil, sehingga kilopascal (1 kPa = 1000 Pa) sering dipakai; tekanan udara di permukaan laut sekitar 100 kPa.',
        'Karena luas berada di penyebut, luas yang kecil menghasilkan tekanan yang sangat besar. Orang dengan berat 600 N yang berdiri di atas sepatu datar seluas 200 cm² (0,02 m²) menekan tanah dengan 30 kPa. Orang yang sama bertumpu pada hak sepatu runcing seluas 1 cm² menghasilkan 6000 kPa, dua ratus kali lebih besar. Ujung jarum seluas 1 mm² yang ditekan dengan hanya 10 N mencapai 10 000 kPa, itulah sebabnya jarum mudah menembus gabus atau kain.',
        'Di simulasi, berat ditekan ke pasir, dan pasir dimodelkan sebagai pegas sederhana: setiap kilopascal tekanan mendorong benda masuk sejauh jarak tambahan yang tetap. Jadi kedalaman tenggelam sebanding dengan tekanan, sampai benda mencapai dasar keras lapisan pasir. Kamu dapat mengubah kekerasan tanah untuk meniru salju lembut, pasir kering atau tanah liat padat. Perhatikan sepatu salju yang hampir tidak membekas, sementara hak sepatu langsung menancap sampai dasar, padahal gaya pada keduanya sama persis.',
        'Para insinyur memakai aturan ini dalam dua arah. Untuk memotong, menusuk atau mencengkeram, luasnya dibuat kecil: mata pisau, jarum, paku dan sepatu luncur es. Untuk mencegah tenggelam atau kerusakan, luasnya dibuat besar: sepatu salju, ski, kaki unta, ban traktor yang lebar dan fondasi lebar di bawah bangunan.',
      ],
    },
    figure: {
      caption: {
        en: 'The same 600 N weight on three different contact areas. Pressure P = F/A grows as the area shrinks, and the object sinks deeper into the soft ground.',
        id: 'Berat 600 N yang sama pada tiga luas bidang sentuh berbeda. Tekanan P = F/A membesar ketika luas mengecil, dan benda tenggelam lebih dalam ke tanah lunak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const col = (cx, w, sink, label, p) => `
  <rect x="${cx - 22}" y="${96 + sink - 46}" width="44" height="36" rx="6" fill="#8b5cf6"/>
  <text x="${cx}" y="${96 + sink - 22}" class="c" fill="#fff">600 N</text>
  <rect x="${cx - w / 2}" y="${96 + sink - 10}" width="${w}" height="${10 + sink}" fill="#f59e0b"/>
  <line x1="${cx}" y1="${50}" x2="${cx}" y2="${96 + sink - 48}" stroke="#ef4444" stroke-width="2.5" marker-end="url(#ar)"/>
  <text x="${cx}" y="${200}" class="c">${label}</text>
  <text x="${cx}" y="${216}" class="c" fill="#10b981">${p}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Same weight, three contact areas, three sink depths', 'Berat sama, tiga luas sentuh, tiga kedalaman')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{text-anchor:middle}.b{font:bold 12px system-ui,sans-serif}</style>
  <defs><marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#ef4444"/></marker></defs>
  <rect x="10" y="96" width="340" height="88" fill="currentColor" opacity=".12"/>
  <line x1="10" y1="96" x2="350" y2="96" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>
  <text x="14" y="90">${L('ground surface', 'permukaan tanah')}</text>
  ${col(70, 110, 2, L('snowshoe 2500 cm²', 'sepatu salju 2500 cm²'), '2.4 kPa')}
  ${col(190, 36, 20, L('flat shoe 200 cm²', 'sepatu datar 200 cm²'), '30 kPa')}
  ${col(300, 4, 80, L('heel 1 cm²', 'hak 1 cm²'), '6000 kPa')}
  <text x="180" y="236" class="c b">P = F / A</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Pressure = force ÷ area: P = F/A, measured in pascals (1 Pa = 1 N/m²) or kilopascals (1 kPa = 1000 Pa).',
        'The same force on half the area gives twice the pressure; on one tenth of the area, ten times the pressure.',
        'Doubling the force on the same area doubles the pressure.',
        'Small areas (pins, blades, heels) concentrate force to pierce and cut; large areas (snowshoes, wide tyres) spread it to avoid sinking.',
        'Always convert area to square metres before using P = F/A: 1 cm² = 0.0001 m², 1 mm² = 0.000001 m².',
      ],
      id: [
        'Tekanan = gaya ÷ luas: P = F/A, diukur dalam pascal (1 Pa = 1 N/m²) atau kilopascal (1 kPa = 1000 Pa).',
        'Gaya yang sama pada setengah luas memberi tekanan dua kali lipat; pada sepersepuluh luas, tekanan sepuluh kali lipat.',
        'Menggandakan gaya pada luas yang sama menggandakan tekanan.',
        'Luas kecil (jarum, mata pisau, hak sepatu) memusatkan gaya untuk menusuk dan memotong; luas besar (sepatu salju, ban lebar) menyebarkannya agar tidak tenggelam.',
        'Selalu ubah luas ke meter persegi sebelum memakai P = F/A: 1 cm² = 0,0001 m², 1 mm² = 0,000001 m².',
      ],
    },
    vocabulary: {
      en: [
        ['Pressure (P)', 'Force per unit area, P = F/A. Unit: pascal (Pa), equal to one newton per square metre.'],
        ['Pascal (Pa)', 'The SI unit of pressure; 1 Pa = 1 N/m². 1 kPa = 1000 Pa.'],
        ['Contact area (A)', 'The area over which an object actually touches the surface it presses on, in m².'],
        ['Weight', 'The force of gravity on an object, in newtons; a 60 kg person weighs about 600 N.'],
        ['Firmness', 'How much pressure a surface can take per centimetre it is pushed in; soft snow has low firmness, packed clay high.'],
      ],
      id: [
        ['Tekanan (P)', 'Gaya per satuan luas, P = F/A. Satuan: pascal (Pa), sama dengan satu newton per meter persegi.'],
        ['Pascal (Pa)', 'Satuan SI untuk tekanan; 1 Pa = 1 N/m². 1 kPa = 1000 Pa.'],
        ['Luas bidang sentuh (A)', 'Luas bagian benda yang benar-benar menyentuh permukaan yang ditekannya, dalam m².'],
        ['Berat', 'Gaya gravitasi pada benda, dalam newton; orang bermassa 60 kg beratnya sekitar 600 N.'],
        ['Kekerasan', 'Seberapa besar tekanan yang dapat ditahan permukaan untuk tiap sentimeter penekanan; salju lembut kekerasannya rendah, tanah liat padat tinggi.'],
      ],
    },
    misconceptions: {
      en: [
        ['Pressure and force are the same thing.', 'Force is the total push in newtons; pressure is how concentrated that push is, in newtons per square metre. The same force can give a tiny or a huge pressure depending on the area.'],
        ['A heavier object always sinks deeper.', 'Only if the areas are the same. A light person on a stiletto heel sinks far deeper than a heavy person on snowshoes, because pressure depends on area as well as force.'],
        ['Bigger area means bigger pressure.', 'The opposite: area is in the denominator, so a bigger contact area gives a smaller pressure for the same force.'],
      ],
      id: [
        ['Tekanan dan gaya adalah hal yang sama.', 'Gaya adalah dorongan total dalam newton; tekanan adalah seberapa terpusat dorongan itu, dalam newton per meter persegi. Gaya yang sama dapat memberi tekanan kecil atau sangat besar tergantung luasnya.'],
        ['Benda yang lebih berat selalu tenggelam lebih dalam.', 'Hanya jika luasnya sama. Orang ringan dengan hak sepatu runcing tenggelam jauh lebih dalam daripada orang berat dengan sepatu salju, karena tekanan bergantung pada luas dan juga gaya.'],
        ['Luas lebih besar berarti tekanan lebih besar.', 'Kebalikannya: luas berada di penyebut, jadi luas bidang sentuh yang lebih besar memberi tekanan lebih kecil untuk gaya yang sama.'],
      ],
    },
    realWorld: {
      en: [
        'Snowshoes and skis spread a person\'s weight over a large area so they stay on top of soft snow.',
        'Hospital beds and wheelchair cushions are designed to spread body weight and prevent pressure sores.',
        'Camels have wide, soft feet that stop them sinking into sand; tractors and tanks use wide tyres or tracks for the same reason.',
        'Knives, needles and nails are sharpened to a tiny area so an ordinary push creates enough pressure to pierce.',
        'Stiletto heels can dent wooden floors and are banned on some aircraft evacuation slides because of the huge pressure they produce.',
      ],
      id: [
        'Sepatu salju dan ski menyebarkan berat tubuh ke luas yang besar sehingga orang tetap di atas salju lembut.',
        'Tempat tidur rumah sakit dan bantalan kursi roda dirancang untuk menyebarkan berat tubuh agar tidak timbul luka tekan.',
        'Unta memiliki kaki yang lebar dan lunak sehingga tidak tenggelam ke pasir; traktor dan tank memakai ban lebar atau rantai dengan alasan yang sama.',
        'Pisau, jarum dan paku diruncingkan ke luas yang sangat kecil sehingga dorongan biasa menghasilkan tekanan yang cukup untuk menembus.',
        'Hak sepatu runcing dapat melekukkan lantai kayu dan dilarang di beberapa peluncur evakuasi pesawat karena tekanannya yang sangat besar.',
      ],
    },
    questions: {
      en: [
        { q: 'A 600 N student stands on one foot with a sole area of 150 cm². What pressure does the shoe put on the floor?', a: 'A = 150 cm² = 0.015 m². P = 600 / 0.015 = 40 000 Pa = 40 kPa.' },
        { q: 'The same student stands on both feet. What happens to the pressure, and why?', a: 'It halves to 20 kPa, because the same weight is now spread over twice the area (0.030 m²).' },
        { q: 'A thumbtack is pushed with 15 N. The head has an area of 1 cm² and the point 0.1 mm². Compare the pressure on the thumb with the pressure on the wall.', a: 'Thumb: 15 / 0.0001 = 150 kPa. Wall: 15 / 0.0000001 = 150 000 kPa, a thousand times more. Same force, but the tiny point area makes the pressure enormous, so the tack goes in without hurting the thumb.' },
      ],
      id: [
        { q: 'Seorang siswa dengan berat 600 N berdiri dengan satu kaki dan luas sol sepatu 150 cm². Berapa tekanan sepatu pada lantai?', a: 'A = 150 cm² = 0,015 m². P = 600 / 0,015 = 40 000 Pa = 40 kPa.' },
        { q: 'Siswa yang sama berdiri dengan dua kaki. Apa yang terjadi pada tekanan, dan mengapa?', a: 'Tekanan menjadi setengahnya, 20 kPa, karena berat yang sama kini tersebar pada luas dua kali lipat (0,030 m²).' },
        { q: 'Sebuah paku payung ditekan dengan gaya 15 N. Kepalanya seluas 1 cm² dan ujungnya 0,1 mm². Bandingkan tekanan pada ibu jari dengan tekanan pada dinding.', a: 'Ibu jari: 15 / 0,0001 = 150 kPa. Dinding: 15 / 0,0000001 = 150 000 kPa, seribu kali lebih besar. Gayanya sama, tetapi luas ujung yang sangat kecil membuat tekanannya luar biasa, sehingga paku masuk tanpa melukai ibu jari.' },
      ],
    },
  },
};
