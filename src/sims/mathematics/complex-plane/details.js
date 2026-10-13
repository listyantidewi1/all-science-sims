// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See z² as "double the angle, square the magnitude".',
      'Recognize 1/z as inversion through the unit circle.',
      'Apply Euler: e^(iθ) traces the unit circle.',
    ],
    id: [
      'Melihat z² sebagai "gandakan sudut, kuadratkan magnitudo".',
      'Mengenali 1/z sebagai inversi melalui lingkaran satuan.',
      'Menerapkan Euler: e^(iθ) menelusuri lingkaran satuan.',
    ],
  },  tryThis: {
    en: [
      'Place z on the unit circle — does z² stay on it?',
      'Move z to (2, 0) — where is 1/z?',
      'Trace z=e^(iθ) by rotating around origin — what curve does z² follow?',
    ],
    id: [
      'Letakkan z pada lingkaran satuan — apakah z² tetap di sana?',
      'Geser z ke (2, 0) — di mana 1/z?',
      'Telusuri z=e^(iθ) dengan memutar di sekitar origin — kurva apa yang ditelusuri z²?',
    ],
  },
  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A complex number z = x + iy has a real part x and an imaginary part y, where i is defined by i² = −1. Plotting x along the horizontal axis and y along the vertical one turns every complex number into a point in the plane, and the sim lets you drag that point. The same number can be described in polar form by its distance from the origin, the modulus r = |z| = √(x² + y²), and the angle it makes with the positive real axis, the argument θ. The readout shows both descriptions at once, and the faint circle of radius 1 is the unit circle, where |z| = 1.',
        'Multiplying complex numbers is where the polar form earns its keep: to multiply two numbers you multiply their moduli and add their arguments. Squaring is the special case of multiplying z by itself, so z² has modulus r² and argument 2θ, and z³ has modulus r³ and argument 3θ. Watch the green z² point as you drag z: it moves twice as fast around the origin and leaps outward when |z| is greater than 1 or collapses inward when |z| is less than 1. On the unit circle r = 1, so r² = 1 as well and z² stays on the circle, just at double the angle.',
        'The reciprocal 1/z has modulus 1/r and argument −θ: a point outside the unit circle maps inside, a point inside maps outside, and the angle flips to the other side of the real axis. The conjugate z̄ = x − iy keeps the modulus and only flips the sign of the angle, so 1/z is the conjugate scaled down by r². The exponential uses Euler\'s formula: e^z = e^(x + iy) = e^x·(cos y + i sin y), so the real part of z sets the modulus e^x and the imaginary part sets the angle y in radians. Dragging z straight up along the imaginary axis makes e^z run around the unit circle.',
        'The Snap to unit circle button divides z by its modulus, giving a number with the same direction and |z| = 1. The sim shows z³ by multiplying twice and 1/z by the formula (x − iy)/(x² + y²), and it hides 1/z when z is at the origin, where the reciprocal is undefined. The visible window is only about 5 units across, so z², z³ and e^z leave the screen quickly for larger z: e^z with x = 3 already has modulus e³ ≈ 20. Angles in the readout are in degrees, while the argument fed into e^z is in radians, so a point at height y = 3.14 makes e^z point almost exactly along the negative real axis.',
      ],
      id: [
        'Bilangan kompleks z = x + iy mempunyai bagian real x dan bagian imajiner y, dengan i didefinisikan oleh i² = −1. Menggambar x pada sumbu mendatar dan y pada sumbu tegak mengubah setiap bilangan kompleks menjadi titik di bidang, dan simulasi membiarkanmu menyeret titik itu. Bilangan yang sama dapat dinyatakan dalam bentuk polar lewat jaraknya dari titik asal, yaitu modulus r = |z| = √(x² + y²), dan sudutnya terhadap sumbu real positif, yaitu argumen θ. Tampilan angka menunjukkan kedua bentuk sekaligus, dan lingkaran samar berjari-jari 1 adalah lingkaran satuan, tempat |z| = 1.',
        'Perkalian bilangan kompleks adalah tempat bentuk polar menunjukkan gunanya: untuk mengalikan dua bilangan, kalikan modulusnya dan jumlahkan argumennya. Mengkuadratkan adalah kasus khusus mengalikan z dengan dirinya sendiri, sehingga z² bermodulus r² dan berargumen 2θ, dan z³ bermodulus r³ dan berargumen 3θ. Perhatikan titik hijau z² saat kamu menyeret z: ia bergerak dua kali lebih cepat mengitari titik asal dan melesat keluar saat |z| lebih dari 1 atau menyusut ke dalam saat |z| kurang dari 1. Pada lingkaran satuan r = 1, jadi r² = 1 juga dan z² tetap di lingkaran itu, hanya pada sudut dua kali lipat.',
        'Kebalikan 1/z bermodulus 1/r dan berargumen −θ: titik di luar lingkaran satuan dipetakan ke dalam, titik di dalam dipetakan ke luar, dan sudutnya berbalik ke sisi lain sumbu real. Sekawan z̄ = x − iy mempertahankan modulus dan hanya membalik tanda sudut, sehingga 1/z adalah sekawan yang diperkecil dengan faktor r². Eksponensial memakai rumus Euler: e^z = e^(x + iy) = e^x·(cos y + i sin y), jadi bagian real z menentukan modulus e^x dan bagian imajinernya menentukan sudut y dalam radian. Menyeret z lurus ke atas sepanjang sumbu imajiner membuat e^z berlari mengitari lingkaran satuan.',
        'Tombol Snap to unit circle membagi z dengan modulusnya, menghasilkan bilangan searah dengan |z| = 1. Simulasi menampilkan z³ dengan mengalikan dua kali dan 1/z dengan rumus (x − iy)/(x² + y²), serta menyembunyikan 1/z saat z berada di titik asal, tempat kebalikan tidak terdefinisi. Jendela yang terlihat hanya sekitar 5 satuan lebarnya, sehingga z², z³, dan e^z cepat keluar layar untuk z yang lebih besar: e^z dengan x = 3 saja sudah bermodulus e³ ≈ 20. Sudut pada tampilan dalam derajat, sedangkan argumen yang masuk ke e^z dalam radian, jadi titik pada ketinggian y = 3,14 membuat e^z mengarah hampir tepat sepanjang sumbu real negatif.',
      ],
    },
    figure: {
      caption: {
        en: 'z with modulus r = 1.4 and argument θ = 35°. Squaring gives modulus r² = 1.96 and angle 2θ = 70°; the reciprocal 1/z has modulus 1/r ≈ 0.71 and angle −θ; the conjugate z̄ keeps r and flips the angle.',
        id: 'z dengan modulus r = 1,4 dan argumen θ = 35°. Mengkuadratkan memberi modulus r² = 1,96 dan sudut 2θ = 70°; kebalikan 1/z bermodulus 1/r ≈ 0,71 dan bersudut −θ; sekawan z̄ mempertahankan r dan membalik sudut.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Powers and reciprocal of a complex number', 'Pangkat dan kebalikan bilangan kompleks')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px;opacity:.7}.r{stroke-width:1.6}</style>
  <line x1="20" y1="125" x2="340" y2="125" class="m"/>
  <line x1="150" y1="10" x2="150" y2="232" class="m"/>
  <text x="326" y="139" class="s">Re</text>
  <text x="155" y="20" class="s">Im</text>
  <circle cx="150" cy="125" r="55" fill="none" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4 4"/>
  <text x="56" y="80" fill="#f59e0b" class="s">${L('unit circle |z| = 1', 'lingkaran satuan |z| = 1')}</text>
  <line x1="150" y1="125" x2="213.1" y2="80.8" stroke="#3b82f6" class="r"/>
  <circle cx="213.1" cy="80.8" r="5" fill="#3b82f6"/>
  <text x="220" y="78" fill="#3b82f6">z, r = 1.4</text>
  <path d="M177.5 125 A27.5 27.5 0 0 0 172.5 109.2" fill="none" stroke="#3b82f6" stroke-width="1.4"/>
  <text x="181" y="118" fill="#3b82f6" class="s">θ = 35°</text>
  <line x1="150" y1="125" x2="186.9" y2="23.7" stroke="#10b981" class="r"/>
  <circle cx="186.9" cy="23.7" r="5" fill="#10b981"/>
  <text x="194" y="22" fill="#10b981">z², r² = 1.96</text>
  <path d="M191.3 125 A41 41 0 0 0 164.1 86.2" fill="none" stroke="#10b981" stroke-width="1.4"/>
  <text x="196" y="100" fill="#10b981" class="s">2θ = 70°</text>
  <line x1="150" y1="125" x2="182.2" y2="147.5" stroke="#ef4444" class="r"/>
  <circle cx="182.2" cy="147.5" r="5" fill="#ef4444"/>
  <text x="190" y="160" fill="#ef4444">1/z, 1/r ≈ 0.71, −θ</text>
  <line x1="150" y1="125" x2="213.1" y2="169.2" stroke="#8b5cf6" class="r" stroke-dasharray="4 3"/>
  <circle cx="213.1" cy="169.2" r="5" fill="#8b5cf6"/>
  <text x="220" y="182" fill="#8b5cf6">z̄, r = 1.4, −θ</text>
  <text x="22" y="212" class="s">${L('multiply: multiply the moduli, add the angles', 'perkalian: kalikan modulus, jumlahkan sudut')}</text>
  <text x="22" y="226" class="s">${L('so z·z has modulus r·r and angle θ + θ', 'jadi z·z bermodulus r·r dan bersudut θ + θ')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A complex number is a point in the plane: x + iy in rectangular form, or modulus r and argument θ in polar form.',
        'To multiply complex numbers, multiply the moduli and add the arguments; squaring doubles the angle and squares the modulus.',
        'On the unit circle every power of z stays on the unit circle, because 1 raised to any power is still 1.',
        '1/z has modulus 1/r and argument −θ, so it swaps the inside and outside of the unit circle and reflects across the real axis.',
        'Euler\'s formula e^(iθ) = cos θ + i sin θ means e^z = e^x·e^(iy): the real part of z sets the size and the imaginary part sets the angle.',
      ],
      id: [
        'Bilangan kompleks adalah titik di bidang: x + iy dalam bentuk kartesius, atau modulus r dan argumen θ dalam bentuk polar.',
        'Untuk mengalikan bilangan kompleks, kalikan modulusnya dan jumlahkan argumennya; mengkuadratkan menggandakan sudut dan mengkuadratkan modulus.',
        'Pada lingkaran satuan setiap pangkat z tetap di lingkaran satuan, karena 1 dipangkatkan berapa pun tetap 1.',
        '1/z bermodulus 1/r dan berargumen −θ, jadi ia menukar bagian dalam dan luar lingkaran satuan serta mencerminkan terhadap sumbu real.',
        'Rumus Euler e^(iθ) = cos θ + i sin θ berarti e^z = e^x·e^(iy): bagian real z menentukan ukuran dan bagian imajinernya menentukan sudut.',
      ],
    },
    vocabulary: {
      en: [
        ['Imaginary unit i', 'The number with i² = −1; multiplying by i rotates a point 90° counterclockwise about the origin.'],
        ['Real and imaginary parts', 'In z = x + iy, x is the real part (horizontal) and y the imaginary part (vertical).'],
        ['Modulus |z|', 'The distance from the origin, √(x² + y²); the length of the arrow to z.'],
        ['Argument arg z', 'The angle from the positive real axis to z, measured counterclockwise.'],
        ['Polar form', 'Writing z as r·(cos θ + i sin θ) = r·e^(iθ) using modulus and argument.'],
        ['Conjugate z̄', 'x − iy, the mirror image of z across the real axis; z·z̄ = |z|².'],
        ['Unit circle', 'The set of complex numbers with |z| = 1, where e^(iθ) lives.'],
        ['Euler\'s formula', 'e^(iθ) = cos θ + i sin θ, connecting the exponential to rotation.'],
      ],
      id: [
        ['Satuan imajiner i', 'Bilangan dengan i² = −1; mengalikan dengan i memutar titik 90° berlawanan arah jarum jam terhadap titik asal.'],
        ['Bagian real dan imajiner', 'Pada z = x + iy, x adalah bagian real (mendatar) dan y bagian imajiner (tegak).'],
        ['Modulus |z|', 'Jarak dari titik asal, √(x² + y²); panjang panah ke z.'],
        ['Argumen arg z', 'Sudut dari sumbu real positif ke z, diukur berlawanan arah jarum jam.'],
        ['Bentuk polar', 'Menulis z sebagai r·(cos θ + i sin θ) = r·e^(iθ) dengan modulus dan argumen.'],
        ['Sekawan z̄', 'x − iy, bayangan cermin z terhadap sumbu real; z·z̄ = |z|².'],
        ['Lingkaran satuan', 'Himpunan bilangan kompleks dengan |z| = 1, tempat e^(iθ) berada.'],
        ['Rumus Euler', 'e^(iθ) = cos θ + i sin θ, yang menghubungkan eksponensial dengan rotasi.'],
      ],
    },
    misconceptions: {
      en: [
        ['Squaring always makes a number bigger.', 'Only outside the unit circle. If |z| is less than 1 then |z²| = |z|² is even smaller, and on the unit circle the modulus does not change at all; only the angle doubles.'],
        ['The conjugate and the reciprocal are the same thing.', 'They share the angle −θ but differ in size: z̄ has modulus r while 1/z has modulus 1/r. They coincide only on the unit circle, where r = 1.'],
        ['e^z is just a bigger version of e^x.', 'The imaginary part of z does not change the size at all; it rotates. e^(iy) always has modulus 1, which is why e^(iπ) = −1.'],
        ['Imaginary numbers are not real quantities, so they cannot be pictured.', 'They are points in a plane, as the sim shows, and multiplication by them is an ordinary rotation and scaling of that plane.'],
      ],
      id: [
        ['Mengkuadratkan selalu membuat bilangan lebih besar.', 'Hanya di luar lingkaran satuan. Jika |z| kurang dari 1 maka |z²| = |z|² lebih kecil lagi, dan pada lingkaran satuan modulusnya tidak berubah sama sekali; hanya sudutnya yang digandakan.'],
        ['Sekawan dan kebalikan itu hal yang sama.', 'Keduanya bersudut −θ tetapi berbeda ukuran: z̄ bermodulus r sedangkan 1/z bermodulus 1/r. Keduanya berimpit hanya pada lingkaran satuan, tempat r = 1.'],
        ['e^z hanyalah versi lebih besar dari e^x.', 'Bagian imajiner z tidak mengubah ukuran sama sekali; ia memutar. e^(iy) selalu bermodulus 1, itulah sebabnya e^(iπ) = −1.'],
        ['Bilangan imajiner bukan besaran nyata, jadi tidak bisa digambarkan.', 'Bilangan itu adalah titik di bidang, seperti yang ditunjukkan simulasi, dan perkalian dengannya adalah rotasi dan penskalaan biasa pada bidang itu.'],
      ],
    },
    realWorld: {
      en: [
        'Electrical engineers describe alternating voltages and currents as complex numbers (phasors): the modulus is the amplitude and the argument is the phase shift.',
        'Signal processing and audio software use e^(iθ) in the Fourier transform to pick out which frequencies a sound contains.',
        'The Mandelbrot set is drawn by repeatedly squaring and adding complex numbers, exactly the z² operation shown here.',
        'Control systems for aircraft and drones are judged stable or unstable by where certain complex numbers (poles) sit relative to the imaginary axis.',
      ],
      id: [
        'Insinyur listrik menyatakan tegangan dan arus bolak-balik sebagai bilangan kompleks (fasor): modulusnya adalah amplitudo dan argumennya adalah pergeseran fase.',
        'Pengolahan sinyal dan perangkat lunak audio memakai e^(iθ) dalam transformasi Fourier untuk memilah frekuensi apa saja yang terkandung dalam bunyi.',
        'Himpunan Mandelbrot digambar dengan berulang kali mengkuadratkan dan menjumlahkan bilangan kompleks, persis operasi z² yang ditunjukkan di sini.',
        'Sistem kendali pesawat dan drone dinilai stabil atau tidak dari letak bilangan kompleks tertentu (pole) relatif terhadap sumbu imajiner.',
      ],
    },
    questions: {
      en: [
        { q: 'Drag z to (2, 0), that is z = 2. Where do z², 1/z and z̄ appear, and why?', a: 'z has modulus 2 and angle 0°. z² = 4 (modulus 4, angle 0°), 1/z = 0.5 (modulus 1/2, angle −0° = 0°), and z̄ = 2 because a real number is its own conjugate. All stay on the real axis since doubling or negating an angle of 0° gives 0°.' },
        { q: 'z sits on the unit circle at angle 120°. What are the angle and modulus of z³, and what number is that?', a: 'Modulus 1³ = 1 and angle 3 × 120° = 360°, which is the same direction as 0°. So z³ = 1: this z is a cube root of 1, namely z = −1/2 + i·(√3/2).' },
        { q: 'With z = 0 + iy, dragging y from 0 up to about 3.14 makes e^z move along a particular path. Describe the path and give the value of e^z at the top.', a: 'e^(iy) = cos y + i sin y has modulus 1 for every y, so e^z travels counterclockwise along the unit circle, starting at 1. At y = π ≈ 3.14 the angle is 180°, so e^z = cos π + i sin π = −1, which is Euler\'s identity e^(iπ) = −1.' },
      ],
      id: [
        { q: 'Seret z ke (2, 0), yaitu z = 2. Di mana z², 1/z, dan z̄ muncul, dan mengapa?', a: 'z bermodulus 2 dan bersudut 0°. z² = 4 (modulus 4, sudut 0°), 1/z = 0,5 (modulus 1/2, sudut −0° = 0°), dan z̄ = 2 karena bilangan real adalah sekawan dirinya sendiri. Semuanya tetap di sumbu real karena menggandakan atau menegatifkan sudut 0° memberi 0°.' },
        { q: 'z berada di lingkaran satuan pada sudut 120°. Berapa sudut dan modulus z³, dan bilangan apa itu?', a: 'Modulus 1³ = 1 dan sudut 3 × 120° = 360°, yang searah dengan 0°. Jadi z³ = 1: z ini adalah akar pangkat tiga dari 1, yaitu z = −1/2 + i·(√3/2).' },
        { q: 'Dengan z = 0 + iy, menyeret y dari 0 sampai sekitar 3,14 membuat e^z bergerak pada lintasan tertentu. Jelaskan lintasannya dan berikan nilai e^z di puncaknya.', a: 'e^(iy) = cos y + i sin y bermodulus 1 untuk setiap y, jadi e^z bergerak berlawanan arah jarum jam sepanjang lingkaran satuan, mulai dari 1. Pada y = π ≈ 3,14 sudutnya 180°, jadi e^z = cos π + i sin π = −1, yaitu identitas Euler e^(iπ) = −1.' },
      ],
    },
  },
};
