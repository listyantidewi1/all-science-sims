// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain that the eye focuses light with a convex lens onto the retina, and that a sharp image needs the focus to land exactly on the retina.',
      'Describe short-sightedness (myopia) and long-sightedness (hyperopia) as an eyeball that is too long or too short for its lens, and predict where the image forms in each case.',
      'Choose the sign and approximate power of the corrective lens, in dioptres, that fixes each condition.',
    ],
    id: [
      'Menjelaskan bahwa mata memfokuskan cahaya dengan lensa cembung ke retina, dan bayangan tajam terbentuk jika titik fokus jatuh tepat di retina.',
      'Menggambarkan rabun jauh (miopi) dan rabun dekat (hipermetropi) sebagai bola mata yang terlalu panjang atau terlalu pendek untuk lensanya, dan memprediksi letak bayangan pada tiap kasus.',
      'Memilih tanda dan besar kekuatan lensa korektif, dalam dioptri, yang memperbaiki tiap kelainan.',
    ],
  },
  tryThis: {
    en: [
      'Keep the eyeball at 24 mm and slide the object from 10 m to 25 cm with Auto-focus off. Where does the image move? Now turn Auto-focus on.',
      'Press Myopia (26 mm) and look far away. Slide the glasses power until the blur reads 0.00 mm. Is the lens convex or concave?',
      'Press Hyperopia (22 mm). Which sign of glasses fixes it? Then turn on Auto-focus: can the eye fix itself without glasses?',
      'Try 27 mm: how many dioptres do you need? Check that 1000/27 − 1000/24 gives nearly the same number.',
    ],
    id: [
      'Pertahankan bola mata 24 mm dan geser benda dari 10 m ke 25 cm dengan Fokus otomatis mati. Ke mana bayangan bergeser? Sekarang nyalakan Fokus otomatis.',
      'Tekan Miopi (26 mm) dan lihat benda jauh. Geser kekuatan kacamata sampai kekaburan terbaca 0,00 mm. Lensanya cembung atau cekung?',
      'Tekan Hipermetropi (22 mm). Tanda kacamata mana yang memperbaikinya? Lalu nyalakan Fokus otomatis: bisakah mata memperbaiki sendiri tanpa kacamata?',
      'Coba 27 mm: berapa dioptri yang dibutuhkan? Periksa bahwa 1000/27 − 1000/24 memberi angka yang hampir sama.',
    ],
  },

  learn: {
    background: {
      en: [
        'The eye is a camera made of living tissue. Light from an object enters through the cornea, passes the pupil, and is bent by the lens so that it converges to a point on the retina at the back of the eyeball. Light-sensitive cells on the retina turn that image into nerve signals. A sharp image needs the converging point to land exactly on the retina: if the rays meet in front of it or would only meet behind it, each point of the object spreads into a small disc on the retina, and we see blur.',
        'In this simulation the whole eye is modelled as one thin converging lens in air with a relaxed power of about 41.7 dioptres, which is exactly right to focus a very distant object onto a retina 24 mm behind it (1000 ÷ 24 ≈ 41.7). A real eye has a power of roughly 60 D because the inside is filled with watery jelly, not air, but the logic is identical. The power of a lens in dioptres is 1 ÷ (focal length in metres), so a +2 D lens has a focal length of 0.5 m and a −4 D lens a focal length of −0.25 m. Powers of thin lenses placed close together simply add.',
        'Myopia (short-sightedness, rabun jauh) usually happens because the eyeball has grown too long: a 26 mm eye focuses distant light 2 mm in front of the retina. A concave (negative) lens spreads the rays a little before they enter the eye, pushing the focus back onto the retina. Hyperopia (long-sightedness, rabun dekat) is the opposite: a 22 mm eye is too short, the rays would only meet behind the retina, and a convex (positive) lens is needed. In the model, every millimetre of extra length needs roughly −3 D of correction; real eyes need about −2.7 D per millimetre.',
        'The eye can also change its own power: tiny muscles squeeze the lens so it bulges and gains up to about 8 D in a young person. This is called accommodation and it is how a normal eye focuses on a book 25 cm away (1000 ÷ 250 = 4 D extra). The Auto-focus toggle switches accommodation on. Notice that it can only add power, never remove it, which is why a young hyperope can often compensate but a myope cannot.',
      ],
      id: [
        'Mata adalah kamera yang terbuat dari jaringan hidup. Cahaya dari benda masuk melalui kornea, melewati pupil, dan dibiaskan oleh lensa sehingga berkumpul di satu titik pada retina di bagian belakang bola mata. Sel peka cahaya di retina mengubah bayangan itu menjadi sinyal saraf. Bayangan tajam terbentuk jika titik kumpul jatuh tepat di retina: jika sinar bertemu di depannya atau baru akan bertemu di belakangnya, setiap titik benda menyebar menjadi cakram kecil di retina, dan kita melihat kabur.',
        'Dalam simulasi ini seluruh mata dimodelkan sebagai satu lensa cembung tipis di udara dengan kekuatan rileks sekitar 41,7 dioptri, tepat untuk memfokuskan benda yang sangat jauh ke retina yang berjarak 24 mm di belakangnya (1000 ÷ 24 ≈ 41,7). Mata sungguhan berkekuatan sekitar 60 D karena bagian dalamnya berisi cairan kental, bukan udara, tetapi logikanya sama. Kekuatan lensa dalam dioptri adalah 1 ÷ (jarak fokus dalam meter), jadi lensa +2 D berjarak fokus 0,5 m dan lensa −4 D berjarak fokus −0,25 m. Kekuatan lensa tipis yang berdekatan tinggal dijumlahkan.',
        'Miopi (rabun jauh) biasanya terjadi karena bola mata tumbuh terlalu panjang: mata 26 mm memfokuskan cahaya dari benda jauh 2 mm di depan retina. Lensa cekung (negatif) menyebarkan sinar sedikit sebelum masuk mata, sehingga titik fokus terdorong ke belakang tepat di retina. Hipermetropi (rabun dekat) adalah kebalikannya: mata 22 mm terlalu pendek, sinar baru akan bertemu di belakang retina, dan dibutuhkan lensa cembung (positif). Dalam model ini, setiap milimeter kelebihan panjang membutuhkan koreksi sekitar −3 D; mata sungguhan butuh sekitar −2,7 D per milimeter.',
        'Mata juga dapat mengubah kekuatannya sendiri: otot-otot kecil menekan lensa sehingga menggembung dan bertambah sampai sekitar 8 D pada orang muda. Ini disebut akomodasi, dan dengan inilah mata normal memfokus buku berjarak 25 cm (1000 ÷ 250 = 4 D tambahan). Tombol Fokus otomatis menyalakan akomodasi. Perhatikan bahwa akomodasi hanya bisa menambah kekuatan, tidak mengurangi, sehingga penderita hipermetropi muda sering bisa mengimbangi sendiri sedangkan penderita miopi tidak.',
      ],
    },
    figure: {
      caption: {
        en: 'Parallel rays from a distant object. Top: a normal 24 mm eye focuses them on the retina. Middle: in a too-long (myopic) eye the focus falls short; a concave lens in front spreads the rays so they meet on the retina. Bottom: in a too-short (hyperopic) eye the rays would meet behind the retina; a convex lens brings the focus forward.',
        id: 'Sinar sejajar dari benda jauh. Atas: mata normal 24 mm memfokuskannya di retina. Tengah: pada mata yang terlalu panjang (miopi) fokus jatuh di depan retina; lensa cekung di depan mata menyebarkan sinar agar bertemu di retina. Bawah: pada mata yang terlalu pendek (hipermetropi) sinar baru bertemu di belakang retina; lensa cembung memajukan titik fokus.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const eye = (cy, len, label, col) => `
  <ellipse cx="${200 + len / 2}" cy="${cy}" rx="${len / 2 + 6}" ry="26" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <path d="M${200 + len + 4} ${cy - 20} A ${len / 2 + 6} 26 0 0 1 ${200 + len + 4} ${cy + 20}" fill="none" stroke="${col}" stroke-width="3.5"/>
  <ellipse cx="200" cy="${cy}" rx="5" ry="14" fill="#60a5fa" opacity=".8"/>
  <text x="${200 + len / 2}" y="${cy + 38}" text-anchor="middle">${label}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Normal, myopic and hyperopic eyes with corrective lenses', 'Mata normal, miopi dan hipermetropi dengan lensa korektif')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.r{fill:none;stroke:#fbbf24;stroke-width:1.4}.d{fill:none;stroke:#fbbf24;stroke-width:1.2;stroke-dasharray:3 3;opacity:.7}</style>
  ${eye(40, 70, L('normal 24 mm', 'normal 24 mm'), '#f87171')}
  <path d="M60 28 L200 28 L274 40 M60 40 L274 40 M60 52 L200 52 L274 40" class="r"/>
  <circle cx="274" cy="40" r="2.5" fill="#22c55e"/>
  <text x="300" y="44">${L('sharp', 'tajam')}</text>

  ${eye(120, 86, L('myopia: too long', 'miopi: terlalu panjang'), '#f87171')}
  <path d="M60 108 L140 108 L140 112 L200 112 L278 120 M60 120 L290 120 M60 132 L140 132 L140 128 L200 128 L278 120" class="r"/>
  <path d="M60 108 L200 108 L256 120 M60 132 L200 132 L256 120" class="d"/>
  <path d="M136 100 Q140 120 136 140 M144 100 Q140 120 144 140" fill="none" stroke="#38bdf8" stroke-width="1.6"/>
  <text x="112" y="96" fill="#38bdf8">${L('concave (−)', 'cekung (−)')}</text>
  <circle cx="256" cy="120" r="2.5" fill="#ef4444"/>
  <text x="300" y="112">${L('focus too', 'fokus terlalu')}</text><text x="300" y="124">${L('early', 'awal')}</text>

  ${eye(200, 56, L('hyperopia: too short', 'hipermetropi: terlalu pendek'), '#f87171')}
  <path d="M60 188 L140 188 L140 192 L200 192 L260 200 M60 200 L260 200 M60 212 L140 212 L140 208 L200 208 L260 200" class="r"/>
  <path d="M60 188 L200 188 L256 200 L290 207 M60 212 L200 212 L256 200 L290 193" class="d"/>
  <path d="M138 180 Q131 200 138 220 M142 180 Q149 200 142 220" fill="none" stroke="#38bdf8" stroke-width="1.6"/>
  <text x="112" y="176" fill="#38bdf8">${L('convex (+)', 'cembung (+)')}</text>
  <circle cx="260" cy="200" r="2.5" fill="#22c55e"/>
  <text x="300" y="192">${L('would focus', 'fokus di')}</text><text x="300" y="204">${L('behind', 'belakang')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The eye lens is a convex lens; a sharp image forms only when the rays converge exactly on the retina.',
        'Lens power in dioptres is 1 ÷ focal length in metres, and the powers of touching thin lenses add.',
        'Myopia: eyeball too long, focus in front of the retina, corrected with a concave (negative) lens.',
        'Hyperopia: eyeball too short, focus behind the retina, corrected with a convex (positive) lens.',
        'In the model each extra millimetre of eyeball length needs about −3 D; real eyes need about −2.7 D per mm.',
        'Accommodation lets the eye add up to about 8 D of power for near objects, but it can never subtract power.',
      ],
      id: [
        'Lensa mata adalah lensa cembung; bayangan tajam terbentuk hanya jika sinar berkumpul tepat di retina.',
        'Kekuatan lensa dalam dioptri adalah 1 ÷ jarak fokus dalam meter, dan kekuatan lensa tipis yang berimpit dijumlahkan.',
        'Miopi: bola mata terlalu panjang, fokus di depan retina, dikoreksi dengan lensa cekung (negatif).',
        'Hipermetropi: bola mata terlalu pendek, fokus di belakang retina, dikoreksi dengan lensa cembung (positif).',
        'Dalam model ini setiap milimeter kelebihan panjang bola mata membutuhkan sekitar −3 D; mata sungguhan sekitar −2,7 D per mm.',
        'Akomodasi memungkinkan mata menambah kekuatan sampai sekitar 8 D untuk benda dekat, tetapi tidak pernah bisa menguranginya.',
      ],
    },
    vocabulary: {
      en: [
        ['Retina', 'The light-sensitive layer at the back of the eye where a sharp image must form.'],
        ['Dioptre (D)', 'The unit of lens power: 1 ÷ focal length in metres. A +4 D lens has f = 0.25 m.'],
        ['Myopia', 'Short-sightedness: distant objects are blurry because the eye focuses light in front of the retina.'],
        ['Hyperopia', 'Long-sightedness: near objects are blurry because the eye focuses light behind the retina.'],
        ['Accommodation', 'The eye changing the shape of its lens to add power and focus on nearer objects.'],
        ['Blur disc', 'The small circle that a point of the object makes on the retina when the image is out of focus.'],
      ],
      id: [
        ['Retina', 'Lapisan peka cahaya di belakang mata tempat bayangan tajam harus terbentuk.'],
        ['Dioptri (D)', 'Satuan kekuatan lensa: 1 ÷ jarak fokus dalam meter. Lensa +4 D mempunyai f = 0,25 m.'],
        ['Miopi', 'Rabun jauh: benda jauh tampak kabur karena mata memfokuskan cahaya di depan retina.'],
        ['Hipermetropi', 'Rabun dekat: benda dekat tampak kabur karena mata memfokuskan cahaya di belakang retina.'],
        ['Akomodasi', 'Perubahan bentuk lensa mata untuk menambah kekuatan dan memfokus benda yang lebih dekat.'],
        ['Cakram kabur', 'Lingkaran kecil yang dibentuk satu titik benda di retina ketika bayangan tidak fokus.'],
      ],
    },
    misconceptions: {
      en: [
        ['Glasses "fix" the eye lens.', 'Glasses do not change the eye at all. They bend the light before it arrives, so that the eye\'s own lens, unchanged, now focuses it on the retina.'],
        ['Short-sighted people need a stronger (convex) lens because their eyes are weak.', 'A myopic eye is actually too strong for its length. It needs a negative, concave lens that weakens the total power.'],
        ['The image on the retina is upright, like what we see.', 'The lens forms an inverted image on the retina. The brain interprets the signals the right way up.'],
        ['A higher dioptre number always means worse eyesight.', 'The number measures how much correction is needed, not how well you see with glasses. A −6 D myope sees perfectly well with the right lenses.'],
      ],
      id: [
        ['Kacamata "memperbaiki" lensa mata.', 'Kacamata tidak mengubah mata sama sekali. Kacamata membelokkan cahaya sebelum tiba, sehingga lensa mata yang tidak berubah kini memfokuskannya di retina.'],
        ['Penderita rabun jauh butuh lensa yang lebih kuat (cembung) karena matanya lemah.', 'Mata miopi justru terlalu kuat untuk panjangnya. Ia butuh lensa negatif (cekung) yang mengurangi kekuatan total.'],
        ['Bayangan di retina tegak, seperti yang kita lihat.', 'Lensa membentuk bayangan terbalik di retina. Otaklah yang menafsirkan sinyal itu menjadi tegak.'],
        ['Angka dioptri yang lebih besar selalu berarti penglihatan lebih buruk.', 'Angka itu mengukur seberapa besar koreksi yang dibutuhkan, bukan seberapa baik kamu melihat dengan kacamata. Penderita miopi −6 D melihat sempurna dengan lensa yang tepat.'],
      ],
    },
    realWorld: {
      en: [
        'An optometrist\'s prescription such as "R −2.50 L −2.75" lists the lens power for each eye in dioptres.',
        'Reading glasses sold in pharmacies are convex lenses of +1 to +3 D for older adults whose lenses have lost the ability to accommodate (presbyopia).',
        'Contact lenses sit on the cornea, so their power is slightly different from glasses for the same eye because of the 12 mm gap glasses have.',
        'Laser eye surgery (LASIK) reshapes the cornea to change the eye\'s power by a few dioptres, doing permanently what glasses do removably.',
        'Myopia is increasing worldwide; spending more time outdoors in daylight during childhood is linked to slower eyeball growth.',
      ],
      id: [
        'Resep dokter mata seperti "R −2,50 L −2,75" mencantumkan kekuatan lensa tiap mata dalam dioptri.',
        'Kacamata baca yang dijual di apotek adalah lensa cembung +1 sampai +3 D untuk orang lanjut usia yang lensanya tidak lagi bisa berakomodasi (presbiopi).',
        'Lensa kontak menempel di kornea, sehingga kekuatannya sedikit berbeda dari kacamata untuk mata yang sama karena kacamata berjarak sekitar 12 mm dari mata.',
        'Operasi mata laser (LASIK) membentuk ulang kornea untuk mengubah kekuatan mata beberapa dioptri, melakukan secara permanen apa yang dilakukan kacamata.',
        'Miopi meningkat di seluruh dunia; lebih banyak waktu di luar ruangan pada siang hari saat kanak-kanak dikaitkan dengan pertumbuhan bola mata yang lebih lambat.',
      ],
    },
    questions: {
      en: [
        { q: 'A relaxed model eye has a power of 41.7 D and the retina is 26 mm behind the lens. Where does light from a distant object focus, and what kind of glasses are needed?', a: 'Focal length = 1000/41.7 = 24 mm, so the focus is 2 mm in front of the retina: myopia. A concave lens of about 1000/26 − 41.7 ≈ −3.2 D is needed (slightly more, about −3.3 D, when the lens sits 12 mm in front of the eye).' },
        { q: 'A student reads a book 25 cm away. How much extra power must a normal 24 mm eye add by accommodation?', a: 'For a sharp image the total power must be 1000/24 + 1000/250 = 41.7 + 4.0 D, so the eye adds 4 D. The simulation shows this when Auto-focus is on.' },
        { q: 'Why can a young person with mild hyperopia often see clearly without glasses, while a person with mild myopia cannot?', a: 'Accommodation can only add power. The hyperopic eye needs more power, which the lens can supply by bulging. The myopic eye already has too much power and nothing in the eye can reduce it, so a negative lens is required.' },
      ],
      id: [
        { q: 'Mata model yang rileks berkekuatan 41,7 D dan retinanya 26 mm di belakang lensa. Di mana cahaya dari benda jauh difokuskan, dan kacamata apa yang dibutuhkan?', a: 'Jarak fokus = 1000/41,7 = 24 mm, sehingga fokus jatuh 2 mm di depan retina: miopi. Dibutuhkan lensa cekung sekitar 1000/26 − 41,7 ≈ −3,2 D (sedikit lebih besar, sekitar −3,3 D, jika lensa berada 12 mm di depan mata).' },
        { q: 'Seorang siswa membaca buku berjarak 25 cm. Berapa kekuatan tambahan yang harus diberikan mata normal 24 mm lewat akomodasi?', a: 'Agar bayangan tajam, kekuatan total harus 1000/24 + 1000/250 = 41,7 + 4,0 D, jadi mata menambah 4 D. Simulasi menunjukkan ini saat Fokus otomatis menyala.' },
        { q: 'Mengapa orang muda dengan hipermetropi ringan sering bisa melihat jelas tanpa kacamata, sedangkan penderita miopi ringan tidak?', a: 'Akomodasi hanya bisa menambah kekuatan. Mata hipermetropi butuh kekuatan lebih, yang bisa dipenuhi lensa dengan menggembung. Mata miopi sudah terlalu kuat dan tidak ada bagian mata yang bisa menguranginya, sehingga diperlukan lensa negatif.' },
      ],
    },
  },
};
