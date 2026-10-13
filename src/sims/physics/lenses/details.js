// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the thin-lens equation 1/f = 1/do + 1/di.',
      'Predict whether the image is real or virtual, upright or inverted.',
      'Identify the focal length from the focal points.',
    ],
    id: [
      'Menerapkan persamaan lensa tipis 1/f = 1/so + 1/si.',
      'Memprediksi bayangan: nyata atau maya, tegak atau terbalik.',
      'Mengidentifikasi panjang fokus dari titik fokusnya.',
    ],
  },
  tryThis: {
    en: [
      'Place the object beyond 2f — what does the image look like?',
      'Move the object inside the focal length — does the image flip?',
      'Switch to a diverging lens — is the image ever real?',
    ],
    id: [
      'Letakkan benda di luar 2f — bagaimana bayangannya?',
      'Geser benda di dalam jarak fokus — apakah bayangan terbalik?',
      'Beralih ke lensa divergen — apakah bayangannya pernah nyata?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Light slows down when it enters glass, and a ray that hits the surface at an angle bends; this is refraction. A lens is a piece of glass shaped so that this bending is useful. A converging lens is thicker in the middle and bends parallel rays inward so they meet at the focal point, a distance f behind the lens. A diverging lens is thinner in the middle and spreads parallel rays outward as if they came from a focal point in front of it. The focal length f depends on how strongly the surfaces curve and on the glass; it is the single number that characterises the lens.',
        'To find where a lens forms an image, you only need to trace three rays from the top of the object. A ray parallel to the axis bends through the far focal point. A ray through the centre of the lens passes straight on. A ray through the near focal point leaves parallel to the axis. Where the three cross, the image of the object\'s tip appears. If the rays really cross on the far side, the image is real: light actually arrives there and could be caught on a screen. If they only appear to come from a point on the object\'s side, the image is virtual: you can see it by looking through the lens, but no light is there.',
        'The same geometry gives the thin-lens equation, 1/f = 1/do + 1/di, where do is the object distance and di the image distance. The magnification is m = −di/do: a negative m means the image is inverted, and |m| above 1 means it is enlarged. In the sim, f is positive for a converging lens and negative for a diverging one, and a negative di means a virtual image on the object\'s side, drawn dashed. Dragging the object or the sliders lets you check the three classic cases: object beyond 2f gives a small, inverted, real image; between f and 2f gives an enlarged, inverted, real image; inside f gives an enlarged, upright, virtual image, which is how a magnifying glass works. A diverging lens always gives a smaller, upright, virtual image.',
        'The sim uses the thin-lens approximation: the lens is treated as a single plane where rays bend once, rather than two curved surfaces where Snell\'s law applies twice. Distances are in arbitrary units, rays are assumed to stay close to the axis, and the lens has no colour or shape defects. Real lenses have thickness, focus different colours at slightly different points (chromatic aberration), and blur rays far from the axis (spherical aberration), which is why cameras combine several lens elements.',
      ],
      id: [
        'Cahaya melambat ketika memasuki kaca, dan sinar yang mengenai permukaan secara miring akan dibelokkan; inilah pembiasan. Lensa adalah kepingan kaca yang dibentuk agar pembelokan ini berguna. Lensa konvergen (cembung) lebih tebal di tengah dan membelokkan sinar-sinar sejajar ke dalam sehingga bertemu di titik fokus, sejauh f di belakang lensa. Lensa divergen (cekung) lebih tipis di tengah dan menyebarkan sinar sejajar ke luar seolah berasal dari titik fokus di depannya. Panjang fokus f bergantung pada kelengkungan permukaan dan jenis kacanya; inilah satu angka yang mencirikan sebuah lensa.',
        'Untuk menemukan tempat lensa membentuk bayangan, cukup menelusuri tiga sinar dari puncak benda. Sinar yang sejajar sumbu dibelokkan melalui titik fokus di sisi jauh. Sinar yang melalui pusat lensa diteruskan lurus. Sinar yang melalui titik fokus dekat keluar sejajar sumbu. Di tempat ketiganya berpotongan, muncul bayangan puncak benda. Jika sinar-sinar benar-benar berpotongan di sisi jauh, bayangannya nyata: cahaya sungguh tiba di sana dan dapat ditangkap layar. Jika sinar hanya tampak berasal dari satu titik di sisi benda, bayangannya maya: dapat dilihat dengan menatap lewat lensa, tetapi tidak ada cahaya di sana.',
        'Geometri yang sama menghasilkan persamaan lensa tipis, 1/f = 1/so + 1/si, dengan so jarak benda dan si jarak bayangan. Perbesarannya m = −si/so: m negatif berarti bayangan terbalik, dan |m| lebih dari 1 berarti diperbesar. Di simulasi, f positif untuk lensa konvergen dan negatif untuk lensa divergen, dan si negatif berarti bayangan maya di sisi benda, yang digambar putus-putus. Dengan menyeret benda atau slider kamu dapat memeriksa tiga kasus klasik: benda di luar 2f menghasilkan bayangan nyata, terbalik, diperkecil; antara f dan 2f menghasilkan bayangan nyata, terbalik, diperbesar; di dalam f menghasilkan bayangan maya, tegak, diperbesar, yang menjadi prinsip kerja kaca pembesar. Lensa divergen selalu menghasilkan bayangan maya, tegak, dan diperkecil.',
        'Simulasi memakai pendekatan lensa tipis: lensa dianggap sebagai satu bidang tempat sinar dibelokkan sekali, bukan dua permukaan lengkung tempat hukum Snellius berlaku dua kali. Jarak dalam satuan sembarang, sinar dianggap tetap dekat sumbu, dan lensa tidak punya cacat warna maupun bentuk. Lensa sungguhan punya ketebalan, memfokuskan warna berbeda di titik yang sedikit berbeda (aberasi kromatik), dan mengaburkan sinar yang jauh dari sumbu (aberasi sferis), itulah sebabnya kamera menggabungkan beberapa elemen lensa.',
      ],
    },
    figure: {
      caption: {
        en: 'Three principal rays from the tip of the object (green) through a converging lens: parallel ray via the far focus (amber), central ray undeviated (violet), ray through the near focus leaving parallel (blue). They meet at the real, inverted image (red).',
        id: 'Tiga sinar utama dari puncak benda (hijau) melalui lensa konvergen: sinar sejajar lewat fokus jauh (kuning), sinar pusat tak dibelokkan (ungu), sinar lewat fokus dekat keluar sejajar (biru). Ketiganya bertemu di bayangan nyata terbalik (merah).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Ray diagram for a converging lens', 'Diagram sinar lensa konvergen')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.r{stroke-width:1.8;fill:none}</style>
  <line x1="10" y1="130" x2="350" y2="130" class="m"/>
  <ellipse cx="180" cy="130" rx="8" ry="62" fill="#3b82f6" fill-opacity=".15" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="130" cy="130" r="3" fill="#f59e0b"/>
  <circle cx="230" cy="130" r="3" fill="#f59e0b"/>
  <circle cx="80" cy="130" r="2" fill="currentColor"/>
  <circle cx="280" cy="130" r="2" fill="currentColor"/>
  <text x="125" y="148">F</text>
  <text x="233" y="148">F</text>
  <text x="72" y="148">2F</text>
  <text x="284" y="148">2F</text>
  <line x1="70" y1="90" x2="180" y2="90" class="r" stroke="#f59e0b"/>
  <line x1="180" y1="90" x2="330" y2="210" class="r" stroke="#f59e0b"/>
  <line x1="70" y1="90" x2="330" y2="184.5" class="r" stroke="#8b5cf6"/>
  <line x1="70" y1="90" x2="180" y2="163.3" class="r" stroke="#3b82f6"/>
  <line x1="180" y1="163.3" x2="330" y2="163.3" class="r" stroke="#3b82f6"/>
  <line x1="70" y1="130" x2="70" y2="96" stroke="#10b981" stroke-width="3" marker-end="url(#g)"/>
  <text x="40" y="84" fill="#10b981">${L('object', 'benda')}</text>
  <line x1="271.7" y1="130" x2="271.7" y2="157" stroke="#ef4444" stroke-width="3" marker-end="url(#r)"/>
  <circle cx="271.7" cy="163.3" r="3" fill="#ef4444"/>
  <text x="282" y="176" fill="#ef4444">${L('image', 'bayangan')}</text>
  <text x="150" y="60">${L('thin lens', 'lensa tipis')}</text>
  <text x="14" y="226">${L('object distance do', 'jarak benda so')}</text>
  <line x1="70" y1="212" x2="180" y2="212" class="m" marker-end="url(#c)" marker-start="url(#c)"/>
  <text x="196" y="226">${L('image distance di', 'jarak bayangan si')}</text>
  <line x1="180" y1="212" x2="271.7" y2="212" class="m" marker-end="url(#c)" marker-start="url(#c)"/>
  <defs>
    <marker id="g" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#10b981"/></marker>
    <marker id="r" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#ef4444"/></marker>
    <marker id="c" markerWidth="6" markerHeight="6" refX="3" refY="3"><circle cx="3" cy="3" r="2" fill="currentColor"/></marker>
  </defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A converging lens brings parallel rays to a focal point at distance f; a diverging lens spreads them as if from a focal point in front.',
        'Three principal rays (parallel, central, through the focus) locate the image where they cross.',
        'The thin-lens equation 1/f = 1/do + 1/di links object distance, image distance, and focal length.',
        'Magnification m = −di/do: negative means inverted, |m| above 1 means enlarged.',
        'Real images form where light actually converges and can be projected; virtual images only appear to be there and can only be seen through the lens.',
      ],
      id: [
        'Lensa konvergen mengumpulkan sinar sejajar ke titik fokus sejauh f; lensa divergen menyebarkannya seolah dari titik fokus di depan.',
        'Tiga sinar utama (sejajar, pusat, lewat fokus) menentukan letak bayangan di tempat ketiganya berpotongan.',
        'Persamaan lensa tipis 1/f = 1/so + 1/si menghubungkan jarak benda, jarak bayangan, dan panjang fokus.',
        'Perbesaran m = −si/so: negatif berarti terbalik, |m| lebih dari 1 berarti diperbesar.',
        'Bayangan nyata terbentuk di tempat cahaya sungguh berkumpul dan dapat diproyeksikan; bayangan maya hanya tampak berada di sana dan hanya dapat dilihat lewat lensa.',
      ],
    },
    vocabulary: {
      en: [
        ['Refraction', 'The bending of light when it passes from one material into another at an angle.'],
        ['Focal length (f)', 'The distance from the lens to the point where parallel rays converge (or appear to diverge from); positive for converging, negative for diverging lenses.'],
        ['Principal axis', 'The straight line through the centre of the lens, perpendicular to it.'],
        ['Real image', 'An image formed where rays actually meet; it can be caught on a screen and is inverted for a single converging lens.'],
        ['Virtual image', 'An image at a point rays only appear to come from; it cannot be projected but is seen by looking through the lens.'],
        ['Magnification (m)', 'Image height divided by object height, equal to −di/do; the sign gives the orientation.'],
        ['Converging lens', 'A lens thicker at the centre that bends rays toward the axis.'],
        ['Diverging lens', 'A lens thinner at the centre that bends rays away from the axis.'],
      ],
      id: [
        ['Pembiasan', 'Pembelokan cahaya ketika melewati batas dua bahan secara miring.'],
        ['Panjang fokus (f)', 'Jarak dari lensa ke titik tempat sinar sejajar berkumpul (atau tampak menyebar); positif untuk lensa konvergen, negatif untuk lensa divergen.'],
        ['Sumbu utama', 'Garis lurus yang melalui pusat lensa dan tegak lurus terhadapnya.'],
        ['Bayangan nyata', 'Bayangan yang terbentuk di tempat sinar sungguh bertemu; dapat ditangkap layar dan terbalik untuk satu lensa konvergen.'],
        ['Bayangan maya', 'Bayangan di titik yang hanya tampak sebagai asal sinar; tidak dapat diproyeksikan tetapi terlihat saat menatap lewat lensa.'],
        ['Perbesaran (m)', 'Tinggi bayangan dibagi tinggi benda, sama dengan −si/so; tandanya menunjukkan orientasi.'],
        ['Lensa konvergen', 'Lensa yang lebih tebal di tengah dan membelokkan sinar menuju sumbu.'],
        ['Lensa divergen', 'Lensa yang lebih tipis di tengah dan membelokkan sinar menjauhi sumbu.'],
      ],
    },
    misconceptions: {
      en: [
        ['Covering half the lens removes half the image.', 'Every point of the image receives light from the whole lens, so covering part of it only makes the image dimmer. The three drawn rays are a convenience; countless other rays also pass through.'],
        ['A virtual image is not really visible.', 'You see virtual images all the time: in a flat mirror, through a magnifying glass, through spectacles. They just cannot be caught on a screen, because no light actually converges there.'],
        ['The image always forms at the focal point.', 'Only an object at effectively infinite distance images at F. For nearby objects the image lies beyond F, and for objects inside F it is virtual and on the object\'s side. The thin-lens equation gives the exact place.'],
        ['A bigger lens magnifies more.', 'Magnification depends on the focal length and the object distance, not on the lens diameter. A larger lens gathers more light and gives a brighter image, which is why telescopes use big lenses or mirrors.'],
      ],
      id: [
        ['Menutup separuh lensa menghilangkan separuh bayangan.', 'Setiap titik bayangan menerima cahaya dari seluruh lensa, sehingga menutup sebagian hanya membuat bayangan lebih redup. Tiga sinar yang digambar hanyalah alat bantu; tak terhitung sinar lain juga melewati lensa.'],
        ['Bayangan maya tidak benar-benar terlihat.', 'Kamu melihat bayangan maya setiap saat: di cermin datar, lewat kaca pembesar, lewat kacamata. Bayangan itu hanya tidak dapat ditangkap layar, karena tidak ada cahaya yang sungguh berkumpul di sana.'],
        ['Bayangan selalu terbentuk di titik fokus.', 'Hanya benda yang praktis berada di jarak tak hingga yang bayangannya di F. Untuk benda dekat, bayangan berada di luar F, dan untuk benda di dalam F bayangannya maya dan berada di sisi benda. Persamaan lensa tipis memberi letak tepatnya.'],
        ['Lensa yang lebih besar memperbesar lebih kuat.', 'Perbesaran bergantung pada panjang fokus dan jarak benda, bukan pada diameter lensa. Lensa lebih besar mengumpulkan lebih banyak cahaya dan memberi bayangan lebih terang, itulah sebabnya teleskop memakai lensa atau cermin besar.'],
      ],
    },
    realWorld: {
      en: [
        'The eye is a converging lens system that forms a real, inverted image on the retina; the brain turns the picture the right way up.',
        'A camera moves its lens back and forth to satisfy the thin-lens equation for objects at different distances; that is what focusing means.',
        'A magnifying glass is a converging lens with the object inside f, giving an enlarged upright virtual image; reading glasses work the same way.',
        'Spectacles for short-sightedness are diverging lenses, which push the image back onto a retina that would otherwise focus it too early.',
      ],
      id: [
        'Mata adalah sistem lensa konvergen yang membentuk bayangan nyata terbalik di retina; otak membalik gambarnya menjadi tegak.',
        'Kamera menggeser lensanya maju-mundur agar persamaan lensa tipis terpenuhi untuk benda di jarak berbeda; itulah arti memfokuskan.',
        'Kaca pembesar adalah lensa konvergen dengan benda di dalam f, yang memberi bayangan maya tegak diperbesar; kacamata baca bekerja dengan cara yang sama.',
        'Kacamata untuk rabun jauh memakai lensa divergen, yang memundurkan bayangan ke retina yang jika tidak akan memfokuskannya terlalu awal.',
      ],
    },
    questions: {
      en: [
        { q: 'A converging lens has f = 6 units and the object sits 12 units away (at 2f). Where is the image, and how big is it?', a: '1/di = 1/6 − 1/12 = 1/12, so di = 12: the image is at 2f on the other side. m = −12/12 = −1, so it is real, inverted, and the same size as the object.' },
        { q: 'Keep f = 6 but move the object to 4 units from the lens. Describe the image using the thin-lens equation.', a: '1/di = 1/6 − 1/4 = −1/12, so di = −12. The negative sign means a virtual image 12 units from the lens on the object\'s side. m = −(−12)/4 = +3: upright and three times larger. This is the magnifying-glass case.' },
        { q: 'Switch to a diverging lens with f = −6 and put the object 12 units away. Why can the image never be real?', a: '1/di = −1/6 − 1/12 = −1/4, so di = −4 and m = +1/3: a virtual, upright, smaller image 4 units in front of the lens. Since f is negative and 1/do is always positive, 1/di is always negative for a real object, so a single diverging lens never forms a real image.' },
      ],
      id: [
        { q: 'Lensa konvergen memiliki f = 6 satuan dan benda berada 12 satuan darinya (di 2f). Di mana bayangannya, dan seberapa besar?', a: '1/si = 1/6 − 1/12 = 1/12, sehingga si = 12: bayangan berada di 2f di sisi lain. m = −12/12 = −1, jadi bayangan nyata, terbalik, dan sama besar dengan benda.' },
        { q: 'Tetap dengan f = 6, geser benda ke 4 satuan dari lensa. Gambarkan bayangannya memakai persamaan lensa tipis.', a: '1/si = 1/6 − 1/4 = −1/12, sehingga si = −12. Tanda negatif berarti bayangan maya 12 satuan dari lensa di sisi benda. m = −(−12)/4 = +3: tegak dan tiga kali lebih besar. Inilah kasus kaca pembesar.' },
        { q: 'Beralih ke lensa divergen dengan f = −6 dan letakkan benda 12 satuan darinya. Mengapa bayangannya tidak pernah nyata?', a: '1/si = −1/6 − 1/12 = −1/4, sehingga si = −4 dan m = +1/3: bayangan maya, tegak, lebih kecil, 4 satuan di depan lensa. Karena f negatif dan 1/so selalu positif, 1/si selalu negatif untuk benda nyata, sehingga satu lensa divergen tidak pernah membentuk bayangan nyata.' },
      ],
    },
  },
};
