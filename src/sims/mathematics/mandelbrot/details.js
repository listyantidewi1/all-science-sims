// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the Mandelbrot iteration: z_{n+1} = z_n² + c.',
      'See self-similarity at every zoom level.',
      'Distinguish points in the set (black) from outside (color = escape time).',
    ],
    id: [
      'Menerapkan iterasi Mandelbrot: z_{n+1} = z_n² + c.',
      'Melihat kemiripan diri di setiap level zoom.',
      'Membedakan titik dalam himpunan (hitam) dari luar (warna = waktu lepas).',
    ],
  },  tryThis: {
    en: [
      'Click on the boundary — zoom into a deep mini-Mandelbrot.',
      'Click into the bulb on the left — find a smaller copy.',
      'Try max iterations 50 vs 500 at deep zoom.',
    ],
    id: [
      'Klik pada batas — zoom ke mini-Mandelbrot yang dalam.',
      'Klik ke gelembung kiri — temukan salinan kecilnya.',
      'Coba iterasi max 50 vs 500 di zoom dalam.',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A complex number c = a + bi is a point in a plane: a along the real axis, b along the imaginary axis. Squaring it and adding c again is a simple rule, so simple that you can iterate it by hand: start at z₀ = 0, then z₁ = z₀² + c, z₂ = z₁² + c, and so on. For some values of c the sequence stays close to the origin forever; for others it quickly shoots off to infinity. The Mandelbrot set is defined as the set of all c for which the sequence stays bounded. Try c = −1: the orbit is 0, −1, 0, −1, … and never escapes, so −1 is in the set. Try c = 1: the orbit is 0, 1, 2, 5, 26, … and escapes, so 1 is not.',
        'The simulation does this test for the c behind every pixel. A useful theorem says that once |z| exceeds 2 the orbit is certain to escape, so the sim stops iterating at that point and colours the pixel by how many steps it took: the escape time. Points that have not escaped after the maximum number of iterations are painted black and treated as members of the set. Clicking recentres the view on that point and doubles the zoom; the Max iterations slider sets how patient the test is before giving up. The yellow readout shows the current centre and zoom factor.',
        'The boundary of the set is where all the detail lives. Points just outside it take a very long time to escape, so near the boundary a small change in c changes the colour completely, and zooming in reveals spirals, filaments and little copies of the whole set at every scale. The set is connected and the main body is a heart-shaped cardioid, with a circular bulb of radius 1/4 attached at c = −1 and smaller bulbs all around, each corresponding to orbits that settle into cycles of a particular length.',
        'What you see depends on the computing budget. With a low iteration cap, slow-escaping points near the boundary are wrongly painted black, so the set looks fatter than it is; raising the cap sharpens the edge but costs time, which is why deep zooms need 500 iterations or more. Zoom is also limited by the precision of ordinary floating-point numbers: beyond roughly a trillion-fold magnification neighbouring pixels can no longer be told apart. The colours themselves are arbitrary, a palette applied to the escape time, and carry no mathematical meaning beyond "slower" or "faster".',
      ],
      id: [
        'Bilangan kompleks c = a + bi adalah sebuah titik pada bidang: a sepanjang sumbu real, b sepanjang sumbu imajiner. Mengkuadratkannya lalu menambahkan c kembali adalah aturan yang sederhana, begitu sederhana sehingga bisa diiterasi dengan tangan: mulai dari z₀ = 0, lalu z₁ = z₀² + c, z₂ = z₁² + c, dan seterusnya. Untuk beberapa nilai c barisannya tetap dekat titik asal selamanya; untuk nilai lain barisannya cepat melesat ke tak hingga. Himpunan Mandelbrot didefinisikan sebagai himpunan semua c yang barisannya tetap terbatas. Coba c = −1: orbitnya 0, −1, 0, −1, … dan tidak pernah lepas, jadi −1 ada di himpunan. Coba c = 1: orbitnya 0, 1, 2, 5, 26, … dan lepas, jadi 1 tidak termasuk.',
        'Simulasi ini melakukan uji tersebut untuk c di balik setiap piksel. Sebuah teorema yang berguna menyatakan bahwa begitu |z| melebihi 2 orbit pasti lepas, sehingga sim berhenti mengiterasi di titik itu dan mewarnai piksel menurut jumlah langkah yang dibutuhkan: waktu lepas. Titik yang belum lepas setelah jumlah iterasi maksimum dicat hitam dan dianggap anggota himpunan. Mengklik memusatkan tampilan ke titik itu dan menggandakan zoom; slider Max iterations mengatur seberapa sabar uji dilakukan sebelum menyerah. Panel kuning menampilkan pusat dan faktor zoom saat ini.',
        'Batas himpunan adalah tempat semua detail berada. Titik-titik yang tepat di luar batas membutuhkan waktu sangat lama untuk lepas, sehingga di dekat batas perubahan kecil pada c mengubah warna sepenuhnya, dan memperbesar tampilan memunculkan spiral, filamen, dan salinan-salinan kecil seluruh himpunan pada setiap skala. Himpunan ini terhubung dan tubuh utamanya berbentuk kardioid seperti jantung, dengan gelembung lingkaran berjari-jari 1/4 menempel di c = −1 dan gelembung-gelembung lebih kecil di sekelilingnya, masing-masing berkaitan dengan orbit yang menetap menjadi siklus dengan panjang tertentu.',
        'Yang kamu lihat bergantung pada anggaran komputasi. Dengan batas iterasi rendah, titik-titik yang lambat lepas di dekat batas keliru dicat hitam, sehingga himpunan tampak lebih gemuk dari sebenarnya; menaikkan batas mempertajam tepinya tetapi memakan waktu, itulah sebabnya zoom yang dalam memerlukan 500 iterasi atau lebih. Zoom juga dibatasi oleh ketelitian bilangan desimal komputer biasa: di atas perbesaran sekitar satu triliun kali, piksel-piksel yang berdampingan tidak lagi dapat dibedakan. Warnanya sendiri sembarang, palet yang diterapkan pada waktu lepas, dan tidak membawa makna matematis selain "lebih lambat" atau "lebih cepat".',
      ],
    },
    figure: {
      caption: {
        en: 'The complex plane with the main cardioid and the period-2 bulb of the Mandelbrot set. For c = i (green) the orbit 0 → i → −1+i → −i → −1+i → … stays inside the circle |z| = 2 forever, so i is in the set. For c = 1 (red) the orbit 0 → 1 → 2 → 5 → 26 escapes.',
        id: 'Bidang kompleks dengan kardioid utama dan gelembung periode 2 dari himpunan Mandelbrot. Untuk c = i (hijau) orbit 0 → i → −1+i → −i → −1+i → … tetap di dalam lingkaran |z| = 2 selamanya, jadi i ada di himpunan. Untuk c = 1 (merah) orbit 0 → 1 → 2 → 5 → 26 lepas.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Two orbits in the complex plane: one bounded, one escaping', 'Dua orbit di bidang kompleks: satu terbatas, satu lepas')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.5}.o{fill:none;stroke-width:1.8}</style>
  <line x1="20" y1="120" x2="345" y2="120" class="m"/>
  <line x1="190" y1="8" x2="190" y2="232" class="m"/>
  <text x="333" y="134" opacity=".7">Re</text>
  <text x="194" y="16" opacity=".7">Im</text>
  <text x="128" y="132" opacity=".7">−1</text>
  <text x="80" y="132" opacity=".7">−2</text>
  <text x="243" y="132" opacity=".7">1</text>
  <text x="298" y="132" opacity=".7">2</text>
  <text x="194" y="60" opacity=".7">i</text>
  <circle cx="190" cy="120" r="110" fill="none" stroke="#8b5cf6" stroke-width="1.2" stroke-dasharray="5 4"/>
  <text x="248" y="48" fill="#8b5cf6">|z| = 2</text>
  <path d="M203.8 120.0 L204.7 119.8 L206.9 118.2 L209.4 114.3 L210.6 108.1 L209.0 100.3 L203.8 92.5 L194.8 86.6 L183.1 84.3 L170.6 86.8 L159.3 94.3 L151.5 106.0 L148.8 120.0 L151.5 134.0 L159.3 145.7 L170.6 153.2 L183.1 155.7 L194.8 153.4 L203.8 147.5 L209.0 139.7 L210.6 131.9 L209.4 125.7 L206.9 121.8 L204.7 120.2 Z" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="135" cy="120" r="13.75" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="1.2"/>
  <text x="108" y="160" opacity=".8">${L('Mandelbrot set', 'himpunan Mandelbrot')}</text>
  <polyline points="190,120 190,65 135,65 190,175" class="o" stroke="#10b981" marker-end="url(#a)"/>
  <path d="M190 175 Q150 125 135 65" class="o" stroke="#10b981" stroke-dasharray="3 3" fill="none"/>
  <circle cx="190" cy="65" r="4.5" fill="#10b981"/>
  <circle cx="135" cy="65" r="3.5" fill="#10b981"/>
  <circle cx="190" cy="175" r="3.5" fill="#10b981"/>
  <text x="112" y="58" fill="#10b981">−1+i</text>
  <text x="196" y="188" fill="#10b981">−i</text>
  <text x="22" y="40" fill="#10b981">c = i: 0 → i → −1+i → −i → …</text>
  <text x="22" y="54" fill="#10b981">${L('bounded, in the set', 'terbatas, di dalam himpunan')}</text>
  <polyline points="190,120 245,120 300,120 340,120" class="o" stroke="#ef4444" marker-end="url(#a)"/>
  <circle cx="245" cy="120" r="4.5" fill="#ef4444"/>
  <circle cx="300" cy="120" r="3.5" fill="#ef4444"/>
  <text x="22" y="206" fill="#ef4444">c = 1: 0 → 1 → 2 → 5 → 26 → …</text>
  <text x="22" y="220" fill="#ef4444">${L('escapes, not in the set', 'lepas, bukan anggota himpunan')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The Mandelbrot set is the set of complex numbers c for which iterating z → z² + c from z = 0 never escapes to infinity.',
        'If |z| ever exceeds 2 the orbit is guaranteed to escape, so the test can stop there; the number of steps taken is the escape time that sets the colour.',
        'The boundary is infinitely intricate: zooming in reveals new structure at every scale, including miniature copies of the whole set.',
        'Black pixels mean "not escaped yet", so a higher iteration cap gives a thinner, more accurate set near the boundary.',
        'A rule as simple as z² + c can produce unlimited complexity; the complexity is in the behaviour, not the formula.',
      ],
      id: [
        'Himpunan Mandelbrot adalah himpunan bilangan kompleks c yang iterasinya z → z² + c dari z = 0 tidak pernah lepas ke tak hingga.',
        'Jika |z| pernah melebihi 2, orbitnya pasti lepas, sehingga uji bisa berhenti di sana; jumlah langkah yang dibutuhkan adalah waktu lepas yang menentukan warna.',
        'Batasnya rumit tanpa batas: memperbesar tampilan memunculkan struktur baru pada setiap skala, termasuk salinan mini seluruh himpunan.',
        'Piksel hitam berarti "belum lepas", sehingga batas iterasi yang lebih tinggi memberi himpunan yang lebih tipis dan lebih akurat di dekat batas.',
        'Aturan sesederhana z² + c dapat menghasilkan kerumitan tanpa batas; kerumitannya ada pada perilakunya, bukan pada rumusnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Complex number', 'A number of the form a + bi, where i² = −1; it can be drawn as the point (a, b) in a plane.'],
        ['Modulus |z|', 'The distance of a complex number from the origin, √(a² + b²); the sim uses |z| > 2 as its escape test.'],
        ['Iteration', 'Applying the same rule again and again, each time to the previous result.'],
        ['Orbit', 'The sequence of points z₀, z₁, z₂, … produced by iterating the rule from a starting value.'],
        ['Bounded', 'An orbit is bounded if it stays within some fixed distance of the origin forever; such c belong to the Mandelbrot set.'],
        ['Escape time', 'The number of iterations before |z| first exceeds 2; the sim maps it to a colour.'],
        ['Fractal', 'A shape with detail at every scale of magnification, often containing smaller copies of itself.'],
        ['Cardioid', 'The heart-shaped curve that bounds the main body of the Mandelbrot set.'],
      ],
      id: [
        ['Bilangan kompleks', 'Bilangan berbentuk a + bi, dengan i² = −1; dapat digambar sebagai titik (a, b) pada bidang.'],
        ['Modulus |z|', 'Jarak bilangan kompleks dari titik asal, √(a² + b²); sim memakai |z| > 2 sebagai uji lepas.'],
        ['Iterasi', 'Menerapkan aturan yang sama berulang-ulang, setiap kali pada hasil sebelumnya.'],
        ['Orbit', 'Barisan titik z₀, z₁, z₂, … yang dihasilkan dengan mengiterasi aturan dari suatu nilai awal.'],
        ['Terbatas', 'Orbit disebut terbatas jika selamanya berada dalam jarak tertentu dari titik asal; c seperti itu termasuk himpunan Mandelbrot.'],
        ['Waktu lepas', 'Jumlah iterasi sebelum |z| pertama kali melebihi 2; sim memetakannya ke warna.'],
        ['Fraktal', 'Bentuk yang memiliki detail pada setiap skala perbesaran, sering memuat salinan dirinya yang lebih kecil.'],
        ['Kardioid', 'Kurva berbentuk jantung yang membatasi tubuh utama himpunan Mandelbrot.'],
      ],
    },
    misconceptions: {
      en: [
        ['The colourful part is the Mandelbrot set.', 'The set is the black region. The colours mark points outside the set, graded by how quickly their orbits escape; they are a visualisation choice, not part of the definition.'],
        ['The set is a picture that was drawn by an artist or designed to look that way.', 'Every pixel is decided by a mechanical test on z² + c. Nobody chose the shapes; they follow from the arithmetic, which is why the same picture appears on every computer.'],
        ['Zooming in eventually reaches a smooth edge.', 'The boundary has structure at every scale; the only limit is the precision of the computer\'s numbers. The sim\'s "infinite detail" is a genuine mathematical property.'],
        ['If a point has not escaped after 100 iterations, it is definitely in the set.', 'It might escape at iteration 101 or 10 000. The sim can only say "not yet"; raising the iteration cap often turns black pixels near the boundary into coloured ones.'],
      ],
      id: [
        ['Bagian yang berwarna-warni adalah himpunan Mandelbrot.', 'Himpunannya adalah daerah hitam. Warna menandai titik-titik di luar himpunan, dibedakan menurut seberapa cepat orbitnya lepas; warna itu pilihan visualisasi, bukan bagian dari definisi.'],
        ['Himpunan ini adalah gambar yang dilukis seniman atau dirancang supaya tampak begitu.', 'Setiap piksel ditentukan oleh uji mekanis pada z² + c. Tidak ada yang memilih bentuknya; bentuk itu mengikuti aritmetika, itulah sebabnya gambar yang sama muncul di setiap komputer.'],
        ['Jika terus diperbesar, akhirnya kita sampai pada tepi yang mulus.', 'Batasnya punya struktur pada setiap skala; satu-satunya batasan adalah ketelitian bilangan komputer. "Detail tak hingga" di sim adalah sifat matematis yang sungguhan.'],
        ['Jika suatu titik belum lepas setelah 100 iterasi, titik itu pasti anggota himpunan.', 'Titik itu bisa saja lepas pada iterasi ke-101 atau ke-10.000. Sim hanya bisa berkata "belum"; menaikkan batas iterasi sering mengubah piksel hitam di dekat batas menjadi berwarna.'],
      ],
    },
    realWorld: {
      en: [
        'Coastlines, river networks, lung airways and broccoli heads all show fractal branching, with similar structure at many scales.',
        'Antenna designers use fractal shapes to make small antennas that work across many frequencies.',
        'Film and game studios generate mountains, clouds and terrain with fractal algorithms, because repeated simple rules give realistic roughness cheaply.',
        'Weather forecasting and other chaotic systems share the Mandelbrot lesson: a simple deterministic rule can be extremely sensitive to tiny changes in the starting value.',
      ],
      id: [
        'Garis pantai, jaringan sungai, saluran udara paru-paru, dan kepala brokoli semuanya menunjukkan percabangan fraktal, dengan struktur serupa pada banyak skala.',
        'Perancang antena memakai bentuk fraktal untuk membuat antena kecil yang bekerja pada banyak frekuensi.',
        'Studio film dan gim membangkitkan gunung, awan, dan medan dengan algoritme fraktal, karena aturan sederhana yang diulang memberi kekasaran realistis dengan murah.',
        'Prakiraan cuaca dan sistem kacau lainnya berbagi pelajaran Mandelbrot: aturan deterministik yang sederhana bisa sangat peka terhadap perubahan kecil pada nilai awal.',
      ],
    },
    questions: {
      en: [
        { q: 'Iterate z → z² + c by hand for c = −2, starting from 0. Is −2 in the Mandelbrot set?', a: 'The orbit is 0, −2, 2, 2, 2, … : (−2)² − 2 = 2 and then 2² − 2 = 2 forever. It never exceeds 2 in modulus, so −2 is in the set. It is in fact the leftmost point of the set.' },
        { q: 'For c = 0.5, how many iterations does it take for |z| to exceed 2, and what colour band would the sim put the point in compared with c = 1?', a: 'The orbit is 0, 0.5, 0.75, 1.0625, 1.629, 3.153: |z| first exceeds 2 at the fifth iteration. For c = 1 the orbit is already at 2 after two steps and at 5 after three (0, 1, 2, 5). So c = 0.5 escapes more slowly and gets the colour for a longer escape time, which is what you see nearer the cusp of the cardioid.' },
        { q: 'You zoom deep into the boundary with the iteration cap at 50 and see a large black blob. You raise the cap to 500 and most of the blob dissolves into colour. Which picture is more correct, and why?', a: 'The 500-iteration picture. Black only means "has not escaped within the cap". Points near the boundary escape slowly, so at 50 iterations many points that eventually escape are wrongly painted black; with 500 iterations more of them are correctly identified as outside the set.' },
      ],
      id: [
        { q: 'Iterasi z → z² + c dengan tangan untuk c = −2, mulai dari 0. Apakah −2 anggota himpunan Mandelbrot?', a: 'Orbitnya 0, −2, 2, 2, 2, … : (−2)² − 2 = 2 lalu 2² − 2 = 2 selamanya. Modulusnya tidak pernah melebihi 2, jadi −2 ada di himpunan. Titik ini bahkan titik paling kiri dari himpunan.' },
        { q: 'Untuk c = 0,5, berapa iterasi dibutuhkan sampai |z| melebihi 2, dan warna seperti apa yang diberikan sim dibandingkan dengan c = 1?', a: 'Orbitnya 0; 0,5; 0,75; 1,0625; 1,629; 3,153: |z| pertama kali melebihi 2 pada iterasi kelima. Untuk c = 1 orbitnya sudah mencapai 2 setelah dua langkah dan 5 setelah tiga langkah (0, 1, 2, 5). Jadi c = 0,5 lepas lebih lambat dan mendapat warna untuk waktu lepas yang lebih panjang, seperti yang terlihat semakin dekat ke lekukan kardioid.' },
        { q: 'Kamu memperbesar jauh ke dalam batas dengan batas iterasi 50 dan melihat gumpalan hitam besar. Kamu naikkan batasnya ke 500 dan sebagian besar gumpalan itu larut menjadi warna. Gambar mana yang lebih benar, dan mengapa?', a: 'Gambar dengan 500 iterasi. Hitam hanya berarti "belum lepas dalam batas iterasi". Titik-titik dekat batas lepas dengan lambat, sehingga pada 50 iterasi banyak titik yang akhirnya lepas keliru dicat hitam; dengan 500 iterasi lebih banyak dari mereka yang dikenali dengan benar sebagai di luar himpunan.' },
      ],
    },
  },
};
