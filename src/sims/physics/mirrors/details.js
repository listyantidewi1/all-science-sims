// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the mirror equation 1/d_o + 1/d_i = 1/f.',
      'Distinguish real (in front) from virtual (behind) images.',
      'Connect the magnification m = -d_i/d_o to image size and orientation.',
    ],
    id: [
      'Menerapkan persamaan cermin 1/d_o + 1/d_i = 1/f.',
      'Membedakan bayangan nyata (di depan) dari maya (di belakang).',
      'Menghubungkan perbesaran m = -d_i/d_o dengan ukuran dan orientasi bayangan.',
    ],
  },
  tryThis: {
    en: [
      'Concave, object beyond C — real, inverted, smaller image.',
      'Concave, object between F and mirror — virtual, upright, magnified.',
      'Convex — always virtual, upright, smaller. (Used in car side mirrors.)',
    ],
    id: [
      'Cekung, objek di luar C — bayangan nyata, terbalik, lebih kecil.',
      'Cekung, objek antara F dan cermin — bayangan maya, tegak, diperbesar.',
      'Cembung — selalu maya, tegak, lebih kecil. (Digunakan di kaca spion.)',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A curved mirror obeys the same law as a flat one, the angle of reflection equals the angle of incidence, but because the surface curves, rays that arrive parallel to the principal axis are all sent through (or appear to come from) one point, the focal point F. For a spherical mirror F lies halfway between the mirror and its centre of curvature C, so the focal length is f = R/2. A concave mirror curves towards the light and converges rays to a real focus in front of it; a convex mirror bulges towards the light and spreads rays out as if they came from a focus behind it.',
        'The simulation locates the image with two principal rays from the tip of the object arrow. The first travels parallel to the axis and reflects through F. The second passes through F on its way to the mirror and reflects parallel to the axis. Where the two reflected rays cross, light from the tip really comes together, so a screen placed there would show a sharp, real image. If the reflected rays diverge, your eye traces them back to a crossing point behind the mirror: that is a virtual image, which can be seen but not projected. For the convex mirror the sim draws only the parallel ray and its dashed extension back to F.',
        'All of this is captured by the mirror equation 1/d_o + 1/d_i = 1/f, with the sign convention the sim uses: f is positive for a concave mirror and negative for a convex one, and d_i is positive for a real image in front of the mirror and negative for a virtual image behind it. The magnification m = −d_i/d_o gives the image height relative to the object height; a negative m means the image is inverted, and |m| greater than 1 means it is enlarged. Drag the object along the axis and watch d_i, m and the real/virtual label update together.',
        'Sliding the object through the special points of a concave mirror tells the whole story: beyond C the image is real, inverted and smaller; at C it is the same size; between C and F it is real, inverted and enlarged; at F the reflected rays are parallel and the image is at infinity; inside F the image becomes virtual, upright and enlarged, which is how a shaving mirror works. The sim uses paraxial optics, so rays reflect at the mirror\'s vertical plane and the image is perfectly sharp. Real spherical mirrors blur rays far from the axis, and the arrows here are measured in screen pixels rather than metres.',
      ],
      id: [
        'Cermin lengkung mengikuti hukum yang sama dengan cermin datar, sudut pantul sama dengan sudut datang, tetapi karena permukaannya melengkung, sinar-sinar yang datang sejajar sumbu utama semuanya diarahkan melewati (atau tampak berasal dari) satu titik, yaitu titik fokus F. Pada cermin sferis, F terletak di tengah antara cermin dan pusat kelengkungannya C, sehingga jarak fokus f = R/2. Cermin cekung melengkung ke arah cahaya dan mengumpulkan sinar ke fokus nyata di depannya; cermin cembung menonjol ke arah cahaya dan menyebarkan sinar seolah-olah berasal dari fokus di belakangnya.',
        'Simulasi menentukan letak bayangan dengan dua sinar istimewa dari ujung panah objek. Sinar pertama merambat sejajar sumbu dan dipantulkan melalui F. Sinar kedua melewati F dalam perjalanannya ke cermin dan dipantulkan sejajar sumbu. Di tempat kedua sinar pantul berpotongan, cahaya dari ujung objek benar-benar berkumpul, sehingga layar yang diletakkan di sana akan menampilkan bayangan nyata yang tajam. Jika sinar pantul menyebar, mata kita menelusurinya ke belakang sampai titik potong di balik cermin: itulah bayangan maya, yang dapat dilihat tetapi tidak dapat ditangkap layar. Untuk cermin cembung, simulasi hanya menggambar sinar sejajar dan perpanjangan putus-putusnya ke F.',
        'Semua ini terangkum dalam persamaan cermin 1/d_o + 1/d_i = 1/f, dengan perjanjian tanda yang dipakai simulasi: f positif untuk cermin cekung dan negatif untuk cermin cembung, dan d_i positif untuk bayangan nyata di depan cermin dan negatif untuk bayangan maya di belakangnya. Perbesaran m = −d_i/d_o menyatakan tinggi bayangan dibandingkan tinggi objek; m negatif berarti bayangan terbalik, dan |m| lebih dari 1 berarti bayangan diperbesar. Seret objek sepanjang sumbu dan lihat d_i, m dan label nyata/maya berubah bersama-sama.',
        'Menggeser objek melewati titik-titik istimewa cermin cekung menceritakan seluruh kisahnya: di luar C bayangan nyata, terbalik dan lebih kecil; di C bayangan sama besar; antara C dan F bayangan nyata, terbalik dan diperbesar; di F sinar pantul sejajar dan bayangan berada di tak hingga; di dalam F bayangan menjadi maya, tegak dan diperbesar, seperti cara kerja cermin cukur. Simulasi memakai optika paraksial, sehingga sinar dipantulkan di bidang tegak cermin dan bayangannya tajam sempurna. Cermin sferis sungguhan mengaburkan sinar yang jauh dari sumbu, dan panah di sini diukur dalam piksel layar, bukan meter.',
      ],
    },
    figure: {
      caption: {
        en: 'Concave mirror with the object beyond C. The ray parallel to the axis reflects through F; the ray through F reflects parallel. They cross below the axis in front of the mirror, giving a real, inverted, smaller image. Here 1/d_o + 1/d_i = 1/f with f = R/2.',
        id: 'Cermin cekung dengan objek di luar C. Sinar sejajar sumbu dipantulkan melalui F; sinar melalui F dipantulkan sejajar. Keduanya berpotongan di bawah sumbu di depan cermin, menghasilkan bayangan nyata, terbalik dan lebih kecil. Di sini 1/d_o + 1/d_i = 1/f dengan f = R/2.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Ray diagram for a concave mirror', 'Diagram sinar cermin cekung')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1.3}.r{stroke-width:1.8;fill:none}.v{stroke-width:2.4;fill:none}</style>
  <defs>
    <marker id="ob" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#3b82f6"/></marker>
    <marker id="im" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#10b981"/></marker>
  </defs>
  <line x1="20" y1="120" x2="345" y2="120" class="m" opacity=".5"/>
  <path d="M286.6 70 A100 100 0 0 1 286.6 170" class="m" stroke-width="3.5"/>
  <path d="M292 76 L302 82 M296 90 L306 96 M299 104 L309 110 M300 118 L310 124 M299 132 L309 138 M296 146 L306 152 M292 160 L302 166" class="m" opacity=".5"/>
  <circle cx="250" cy="120" r="3" fill="#f59e0b"/><text x="246" y="136" fill="#f59e0b">F</text>
  <circle cx="200" cy="120" r="3" fill="#f59e0b"/><text x="196" y="136" fill="#f59e0b">C</text>
  <line x1="160" y1="120" x2="160" y2="84" class="v" stroke="#3b82f6" marker-end="url(#ob)"/>
  <text x="132" y="72" fill="#3b82f6" class="s">${L('object', 'objek')}</text>
  <line x1="160" y1="80" x2="300" y2="80" class="r" stroke="#f59e0b"/>
  <line x1="300" y1="80" x2="200" y2="160" class="r" stroke="#f59e0b"/>
  <line x1="160" y1="80" x2="300" y2="142.2" class="r" stroke="#8b5cf6"/>
  <line x1="300" y1="142.2" x2="190" y2="142.2" class="r" stroke="#8b5cf6"/>
  <line x1="222.2" y1="120" x2="222.2" y2="138" class="v" stroke="#10b981" marker-end="url(#im)"/>
  <text x="206" y="178" fill="#10b981" class="s">${L('real image', 'bayangan nyata')}</text>
  <text x="206" y="190" fill="#10b981" class="s">${L('inverted, smaller', 'terbalik, lebih kecil')}</text>
  <text x="300" y="60" class="s">${L('mirror', 'cermin')}</text>
  <text x="20" y="26" class="s" fill="#f59e0b">${L('parallel ray reflects through F', 'sinar sejajar dipantulkan lewat F')}</text>
  <text x="20" y="40" class="s" fill="#8b5cf6">${L('ray through F reflects parallel', 'sinar lewat F dipantulkan sejajar')}</text>
  <path d="M160 206 L160 212 L300 212 L300 206" class="m" opacity=".6"/>
  <text x="222" y="226" text-anchor="middle" class="s">d_o</text>
  <path d="M222.2 196 L222.2 202 L300 202 L300 196" class="m" opacity=".6"/>
  <text x="268" y="194" text-anchor="middle" class="s">d_i</text>
  <text x="20" y="226" class="s">1/d_o + 1/d_i = 1/f</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Rays parallel to the axis reflect through the focal point F, which sits halfway to the centre of curvature: f = R/2.',
        'The mirror equation 1/d_o + 1/d_i = 1/f locates the image; f is positive for concave and negative for convex mirrors.',
        'A positive d_i means a real image in front of the mirror that can be projected; a negative d_i means a virtual image behind it.',
        'Magnification m = −d_i/d_o: negative means inverted, and |m| above 1 means enlarged.',
        'A concave mirror can form real or virtual images depending on where the object is; a convex mirror always forms a virtual, upright, smaller image.',
      ],
      id: [
        'Sinar yang sejajar sumbu dipantulkan melalui titik fokus F, yang terletak di tengah jarak ke pusat kelengkungan: f = R/2.',
        'Persamaan cermin 1/d_o + 1/d_i = 1/f menentukan letak bayangan; f positif untuk cermin cekung dan negatif untuk cermin cembung.',
        'd_i positif berarti bayangan nyata di depan cermin yang dapat ditangkap layar; d_i negatif berarti bayangan maya di belakang cermin.',
        'Perbesaran m = −d_i/d_o: negatif berarti terbalik, dan |m| lebih dari 1 berarti diperbesar.',
        'Cermin cekung dapat membentuk bayangan nyata atau maya bergantung pada letak objek; cermin cembung selalu membentuk bayangan maya, tegak dan lebih kecil.',
      ],
    },
    vocabulary: {
      en: [
        ['Principal axis', 'The straight line through the centre of the mirror and its centre of curvature; distances are measured along it.'],
        ['Focal point (F)', 'The point where rays parallel to the axis meet after reflection from a concave mirror, or appear to come from with a convex mirror.'],
        ['Focal length (f)', 'The distance from the mirror to F, equal to half the radius of curvature. Positive for concave, negative for convex.'],
        ['Centre of curvature (C)', 'The centre of the sphere the mirror is a part of; an object placed here forms a same-size inverted image.'],
        ['Real image', 'An image formed where reflected rays actually cross, in front of the mirror. It can be caught on a screen.'],
        ['Virtual image', 'An image where reflected rays only appear to come from, behind the mirror. It can be seen but not projected.'],
        ['Magnification (m)', 'Image height divided by object height, m = −d_i/d_o. The sign tells you whether the image is upright or inverted.'],
      ],
      id: [
        ['Sumbu utama', 'Garis lurus melalui pusat cermin dan pusat kelengkungannya; jarak-jarak diukur sepanjang garis ini.'],
        ['Titik fokus (F)', 'Titik tempat sinar-sinar sejajar sumbu bertemu setelah dipantulkan cermin cekung, atau tampak berasal pada cermin cembung.'],
        ['Jarak fokus (f)', 'Jarak dari cermin ke F, sama dengan setengah jari-jari kelengkungan. Positif untuk cekung, negatif untuk cembung.'],
        ['Pusat kelengkungan (C)', 'Pusat bola yang menjadi asal lengkungan cermin; objek yang diletakkan di sini membentuk bayangan terbalik sama besar.'],
        ['Bayangan nyata', 'Bayangan yang terbentuk di tempat sinar pantul benar-benar berpotongan, di depan cermin. Dapat ditangkap layar.'],
        ['Bayangan maya', 'Bayangan di tempat sinar pantul hanya tampak berasal, di belakang cermin. Dapat dilihat tetapi tidak dapat diproyeksikan.'],
        ['Perbesaran (m)', 'Tinggi bayangan dibagi tinggi objek, m = −d_i/d_o. Tandanya menunjukkan bayangan tegak atau terbalik.'],
      ],
    },
    misconceptions: {
      en: [
        ['A virtual image is not really there, so it cannot be seen.', 'It can be seen perfectly well; what you see in a bathroom mirror is a virtual image. "Virtual" only means the rays do not actually pass through the image, so it cannot be caught on a screen.'],
        ['The image forms on the surface of the mirror.', 'The image forms where the reflected rays cross, which may be well in front of the mirror or apparently behind it. The sim\'s image arrow moves along the axis as you drag the object, while the mirror stays put.'],
        ['A concave mirror always magnifies.', 'Only when the object is closer than C. With the object far beyond C the real image is smaller than the object, which is why concave mirrors are also used in telescopes.'],
        ['Rays really reflect from the vertical line drawn through the mirror.', 'That is a textbook simplification used in this sim. Real rays reflect from the curved surface, and for rays far from the axis that produces blurring called spherical aberration.'],
      ],
      id: [
        ['Bayangan maya tidak benar-benar ada, jadi tidak bisa dilihat.', 'Bayangan maya bisa dilihat dengan jelas; yang kamu lihat di cermin kamar mandi adalah bayangan maya. "Maya" hanya berarti sinar tidak benar-benar melewati bayangan itu, sehingga tidak bisa ditangkap layar.'],
        ['Bayangan terbentuk di permukaan cermin.', 'Bayangan terbentuk di tempat sinar pantul berpotongan, yang bisa jauh di depan cermin atau tampak di belakangnya. Panah bayangan di simulasi bergeser sepanjang sumbu saat objek diseret, sementara cermin tetap di tempat.'],
        ['Cermin cekung selalu memperbesar.', 'Hanya jika objek lebih dekat daripada C. Jika objek jauh di luar C, bayangan nyatanya lebih kecil daripada objek, dan karena itulah cermin cekung juga dipakai pada teleskop.'],
        ['Sinar sungguh-sungguh dipantulkan oleh garis tegak yang digambar melalui cermin.', 'Itu penyederhanaan buku teks yang dipakai simulasi ini. Sinar sungguhan dipantulkan oleh permukaan lengkung, dan untuk sinar yang jauh dari sumbu hal itu menimbulkan kekaburan yang disebut aberasi sferis.'],
      ],
    },
    realWorld: {
      en: [
        'Shaving and makeup mirrors are concave; held closer than their focal length they give an upright, enlarged virtual image of your face.',
        'Car side mirrors and shop security mirrors are convex: they always show an upright, smaller image, giving a wide field of view at the cost of making objects look farther away.',
        'Reflecting telescopes use a large concave mirror to bring light from distant stars to a real focus, where a camera or eyepiece sits.',
        'Torches, car headlights and solar cookers use concave reflectors in reverse: a source at F sends out a parallel beam, or parallel sunlight is concentrated at F.',
      ],
      id: [
        'Cermin cukur dan cermin rias bersifat cekung; jika wajah berada lebih dekat daripada jarak fokusnya, cermin memberikan bayangan maya yang tegak dan diperbesar.',
        'Kaca spion mobil dan cermin pengawas di toko bersifat cembung: selalu menampilkan bayangan tegak yang lebih kecil, sehingga medan pandang luas tetapi benda tampak lebih jauh.',
        'Teleskop pantul memakai cermin cekung besar untuk mengumpulkan cahaya bintang yang jauh ke fokus nyata, tempat kamera atau lensa okuler diletakkan.',
        'Senter, lampu depan mobil dan kompor tenaga surya memakai reflektor cekung secara terbalik: sumber di F memancarkan berkas sejajar, atau sinar matahari sejajar dipusatkan di F.',
      ],
    },
    questions: {
      en: [
        { q: 'A concave mirror has f = 80 px and the object is at d_o = 200 px. Where is the image, and what does it look like?', a: '1/d_i = 1/80 − 1/200 = 0.0125 − 0.005 = 0.0075, so d_i ≈ 133 px in front of the mirror: a real image. m = −133/200 ≈ −0.67, so it is inverted and about two-thirds the object\'s height.' },
        { q: 'With the same mirror (f = 80 px) you drag the object in to d_o = 60 px. Why does the sim now label the image virtual, and how big is it?', a: 'The object is inside F, so 1/d_i = 1/80 − 1/60 is negative: d_i = −240 px, meaning the reflected rays diverge and only appear to meet 240 px behind the mirror. m = −(−240)/60 = +4, so the image is upright and four times as tall. This is the makeup-mirror case.' },
        { q: 'Switch to a convex mirror with |f| = 80 px and d_o = 200 px. Predict d_i and m before reading them off.', a: 'With f = −80 px, 1/d_i = −1/80 − 1/200 = −0.0175, so d_i ≈ −57 px: virtual, behind the mirror. m = −(−57)/200 ≈ +0.29, upright and much smaller. Every object position gives this kind of image for a convex mirror.' },
      ],
      id: [
        { q: 'Cermin cekung memiliki f = 80 px dan objek berada pada d_o = 200 px. Di mana bayangannya, dan bagaimana rupanya?', a: '1/d_i = 1/80 − 1/200 = 0,0125 − 0,005 = 0,0075, sehingga d_i ≈ 133 px di depan cermin: bayangan nyata. m = −133/200 ≈ −0,67, jadi bayangan terbalik dan tingginya sekitar dua pertiga objek.' },
        { q: 'Dengan cermin yang sama (f = 80 px) kamu menyeret objek mendekat ke d_o = 60 px. Mengapa simulasi kini melabeli bayangan sebagai maya, dan seberapa besar bayangannya?', a: 'Objek berada di dalam F, sehingga 1/d_i = 1/80 − 1/60 bernilai negatif: d_i = −240 px, artinya sinar pantul menyebar dan hanya tampak bertemu 240 px di belakang cermin. m = −(−240)/60 = +4, jadi bayangan tegak dan empat kali lebih tinggi. Inilah kasus cermin rias.' },
        { q: 'Ganti ke cermin cembung dengan |f| = 80 px dan d_o = 200 px. Prediksikan d_i dan m sebelum membacanya di layar.', a: 'Dengan f = −80 px, 1/d_i = −1/80 − 1/200 = −0,0175, sehingga d_i ≈ −57 px: maya, di belakang cermin. m = −(−57)/200 ≈ +0,29, tegak dan jauh lebih kecil. Setiap posisi objek memberi bayangan seperti ini pada cermin cembung.' },
      ],
    },
  },
};
