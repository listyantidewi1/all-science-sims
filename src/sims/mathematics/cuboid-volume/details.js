// Long-form text for the Fill the Box sim (grades 3-6).
export default {
  objectives: {
    en: [
      'Measure the volume of a box by counting the unit cubes that fill it.',
      'See that a box fills up in equal layers, so the number of cubes is cubes-in-one-layer × number-of-layers, which is length × width × height.',
      'Match a 3D box with its flat front, top and side views.',
    ],
    id: [
      'Mengukur volume kotak dengan menghitung kubus satuan yang mengisinya.',
      'Melihat bahwa kotak terisi lapis demi lapis yang sama besar, sehingga banyak kubus = kubus dalam satu lapisan × banyak lapisan, yaitu panjang × lebar × tinggi.',
      'Memasangkan kotak 3D dengan tampak depan, atas dan sampingnya yang datar.',
    ],
  },
  tryThis: {
    en: [
      'Set height to 1. Count the cubes in the single layer. Now set height to 2: did the number double?',
      'Make a box of 2 × 3 × 4. Then swap the numbers around, like 4 × 3 × 2. Does the volume change?',
      'Try to find three different boxes that each hold exactly 12 cubes.',
      'Switch to Top view, then Front view, then Side view. Which two numbers does each view show you?',
    ],
    id: [
      'Atur tinggi ke 1. Hitung kubus di satu lapisan itu. Sekarang atur tinggi ke 2: apakah jumlahnya menjadi dua kali lipat?',
      'Buat kotak 2 × 3 × 4. Lalu tukar urutan angkanya, misalnya 4 × 3 × 2. Apakah volumenya berubah?',
      'Coba temukan tiga kotak berbeda yang masing-masing memuat tepat 12 kubus.',
      'Ganti ke Tampak atas, lalu Tampak depan, lalu Tampak samping. Dua angka mana yang ditunjukkan setiap tampilan?',
    ],
  },

  learn: {
    background: {
      en: [
        'Volume is how much space something takes up. One way to measure it is to fill the space with little cubes that are all the same size and count them. In this sim the glass box fills with unit cubes, one at a time, and the counter goes up with every cube. When the box is full, the number of cubes is its volume.',
        'Watch how the box fills. The cubes first cover the floor of the box in rows: a box 3 long and 4 wide gets 3 × 4 = 12 cubes on the floor. That is one layer. Then a second layer goes on top with another 12 cubes, then a third, and so on. Every layer has the same number of cubes, so you can count quickly: cubes in one layer × number of layers. The number of layers is the height of the box, so volume = length × width × height.',
        'The order of the three numbers does not matter. A box that is 2 × 3 × 4 holds 24 cubes, and so does a box that is 4 × 3 × 2: it is the same box lying on a different side. A box with all three sides the same is a cube, and a cube of side 3 holds 3 × 3 × 3 = 27 small cubes.',
        'Builders and designers draw a 3D shape as flat pictures from different sides. The front view shows the length and the height. The top view shows the length and the width. The side view shows the width and the height. Each flat view shows only two of the three numbers, so you need more than one view to know the whole box.',
      ],
      id: [
        'Volume adalah seberapa banyak ruang yang ditempati sebuah benda. Salah satu cara mengukurnya adalah mengisi ruang itu dengan kubus-kubus kecil yang sama besar, lalu menghitungnya. Di simulasi ini, kotak kaca terisi kubus satuan satu per satu, dan penghitungnya bertambah setiap kali ada kubus baru. Ketika kotak penuh, banyaknya kubus itulah volumenya.',
        'Perhatikan cara kotak terisi. Kubus-kubus pertama menutupi alas kotak dalam baris-baris: kotak dengan panjang 3 dan lebar 4 mendapat 3 × 4 = 12 kubus di alasnya. Itu satu lapisan. Lalu lapisan kedua ditumpuk di atasnya dengan 12 kubus lagi, lalu lapisan ketiga, dan seterusnya. Setiap lapisan punya jumlah kubus yang sama, jadi kamu bisa menghitung dengan cepat: kubus dalam satu lapisan × banyak lapisan. Banyak lapisan sama dengan tinggi kotak, jadi volume = panjang × lebar × tinggi.',
        'Urutan ketiga angka tidak penting. Kotak 2 × 3 × 4 memuat 24 kubus, begitu juga kotak 4 × 3 × 2: itu kotak yang sama, hanya diletakkan pada sisi yang berbeda. Kotak yang ketiga sisinya sama panjang disebut kubus, dan kubus dengan sisi 3 memuat 3 × 3 × 3 = 27 kubus kecil.',
        'Tukang bangunan dan perancang menggambar bentuk 3D sebagai gambar datar dari berbagai sisi. Tampak depan menunjukkan panjang dan tinggi. Tampak atas menunjukkan panjang dan lebar. Tampak samping menunjukkan lebar dan tinggi. Setiap tampak datar hanya menunjukkan dua dari tiga angka, jadi kamu perlu lebih dari satu tampak untuk mengetahui kotak seutuhnya.',
      ],
    },
    figure: {
      caption: {
        en: 'A box 3 long, 2 wide and 2 high. The bottom layer (blue) holds 3 × 2 = 6 cubes, the top layer (orange) holds another 6, so the box holds 12 cubes: 3 × 2 × 2 = 12.',
        id: 'Kotak dengan panjang 3, lebar 2 dan tinggi 2. Lapisan bawah (biru) memuat 3 × 2 = 6 kubus, lapisan atas (jingga) memuat 6 lagi, jadi kotak memuat 12 kubus: 3 × 2 × 2 = 12.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const l = 3, w = 2, h = 2, s = 34;
        const a = s * Math.cos(Math.PI / 6), b = s * 0.5;
        const ox = 120, oy = 120;
        const P = (x, y, z) => `${(ox + (x - y) * a).toFixed(1)},${(oy + (x + y) * b - z * s).toFixed(1)}`;
        const cols = [['#7dd3fc', '#0ea5e9', '#0369a1'], ['#fdba74', '#f97316', '#c2410c']];
        let cubes = '';
        for (let z = 0; z < h; z++) for (let d = 0; d <= l + w - 2; d++) for (let x = Math.max(0, d - w + 1); x <= Math.min(l - 1, d); x++) {
          const y = d - x;
          const c = cols[z];
          if (z === h - 1) cubes += `<polygon points="${P(x, y, z + 1)} ${P(x + 1, y, z + 1)} ${P(x + 1, y + 1, z + 1)} ${P(x, y + 1, z + 1)}" fill="${c[0]}" stroke="#0b1220" stroke-width=".8"/>`;
          if (x === l - 1) cubes += `<polygon points="${P(x + 1, y, z)} ${P(x + 1, y + 1, z)} ${P(x + 1, y + 1, z + 1)} ${P(x + 1, y, z + 1)}" fill="${c[1]}" stroke="#0b1220" stroke-width=".8"/>`;
          if (y === w - 1) cubes += `<polygon points="${P(x, y + 1, z)} ${P(x + 1, y + 1, z)} ${P(x + 1, y + 1, z + 1)} ${P(x, y + 1, z + 1)}" fill="${c[2]}" stroke="#0b1220" stroke-width=".8"/>`;
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A 3 by 2 by 2 box filled with 12 unit cubes in two layers', 'Kotak 3 kali 2 kali 2 berisi 12 kubus satuan dalam dua lapisan')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.t{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.s{font:11px system-ui,sans-serif;text-anchor:middle}</style>
  ${cubes}
  <text x="${(ox + (l / 2 - w) * a - 14).toFixed(1)}" y="${(oy + (l / 2 + w) * b + 22).toFixed(1)}" class="t">${L('length 3', 'panjang 3')}</text>
  <text x="${(ox + (l - w / 2) * a + 26).toFixed(1)}" y="${(oy + (l + w / 2) * b + 22).toFixed(1)}" class="t">${L('width 2', 'lebar 2')}</text>
  <text x="${(ox + (l - w) * a + 44).toFixed(1)}" y="${(oy + (l + w) * b - h * s / 2 + 4).toFixed(1)}" class="t">${L('height 2', 'tinggi 2')}</text>
  <rect x="222" y="40" width="14" height="14" fill="#0ea5e9"/>
  <text x="242" y="52">${L('bottom layer: 3 × 2 = 6 cubes', 'lapisan bawah: 3 × 2 = 6 kubus')}</text>
  <rect x="222" y="64" width="14" height="14" fill="#f97316"/>
  <text x="242" y="76">${L('top layer: 6 more cubes', 'lapisan atas: 6 kubus lagi')}</text>
  <text x="290" y="110" class="t">3 × 2 × 2 = 12</text>
  <text x="290" y="128" class="s" style="fill:currentColor">${L('cubes in the whole box', 'kubus di seluruh kotak')}</text>
  <text x="180" y="226" class="t">${L('volume = length × width × height', 'volume = panjang × lebar × tinggi')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Volume is the amount of space inside a shape. We can measure it by counting unit cubes.',
        'A box fills in equal layers. Cubes in one layer = length × width.',
        'Volume of a box = length × width × height, which is the same as one layer × number of layers.',
        'Swapping the order of the three numbers does not change the volume.',
        'Front, top and side views each show two of the three sides of the box.',
      ],
      id: [
        'Volume adalah banyaknya ruang di dalam sebuah bangun. Kita bisa mengukurnya dengan menghitung kubus satuan.',
        'Kotak terisi lapis demi lapis yang sama besar. Kubus dalam satu lapisan = panjang × lebar.',
        'Volume kotak = panjang × lebar × tinggi, sama dengan satu lapisan × banyak lapisan.',
        'Menukar urutan ketiga angka tidak mengubah volume.',
        'Tampak depan, atas dan samping masing-masing menunjukkan dua dari tiga sisi kotak.',
      ],
    },
    vocabulary: {
      en: [
        ['Volume', 'How much space is inside a shape, counted in unit cubes.'],
        ['Unit cube', 'A small cube with every side 1 unit long. We count these to find volume.'],
        ['Cuboid (box)', 'A 3D shape with six flat rectangular faces, like a shoebox.'],
        ['Cube', 'A box whose length, width and height are all the same.'],
        ['Layer', 'One flat row of cubes that covers the floor of the box.'],
        ['Front, top and side views', 'Flat pictures of a 3D shape seen from the front, from above and from the side.'],
      ],
      id: [
        ['Volume', 'Banyaknya ruang di dalam sebuah bangun, dihitung dalam kubus satuan.'],
        ['Kubus satuan', 'Kubus kecil yang setiap sisinya panjangnya 1 satuan. Kita menghitungnya untuk menentukan volume.'],
        ['Balok (kotak)', 'Bangun ruang dengan enam sisi datar berbentuk persegi panjang, seperti kotak sepatu.'],
        ['Kubus', 'Balok yang panjang, lebar dan tingginya sama semua.'],
        ['Lapisan', 'Satu baris datar kubus yang menutupi alas kotak.'],
        ['Tampak depan, atas dan samping', 'Gambar datar bangun ruang jika dilihat dari depan, dari atas dan dari samping.'],
      ],
    },
    misconceptions: {
      en: [
        ['To find the volume you add the three sides: 3 + 4 + 2.', 'No. You multiply: 3 × 4 × 2 = 24 cubes. Adding would give 9, but you can count 24 cubes in the box.'],
        ['A taller box always holds more cubes than a shorter one.', 'Not always. A box 1 × 1 × 10 is tall but holds only 10 cubes, while a 3 × 3 × 2 box is shorter and holds 18.'],
        ['The top view tells you everything about the box.', 'The top view shows only length and width. Two boxes with the same top view can have different heights and very different volumes.'],
      ],
      id: [
        ['Untuk menentukan volume, ketiga sisinya dijumlahkan: 3 + 4 + 2.', 'Tidak. Ketiganya dikalikan: 3 × 4 × 2 = 24 kubus. Menjumlahkan hanya memberi 9, padahal kamu bisa menghitung 24 kubus di dalam kotak.'],
        ['Kotak yang lebih tinggi selalu memuat lebih banyak kubus daripada kotak yang lebih pendek.', 'Tidak selalu. Kotak 1 × 1 × 10 memang tinggi tetapi hanya memuat 10 kubus, sedangkan kotak 3 × 3 × 2 lebih pendek tetapi memuat 18.'],
        ['Tampak atas sudah menjelaskan semua tentang kotak.', 'Tampak atas hanya menunjukkan panjang dan lebar. Dua kotak dengan tampak atas yang sama bisa punya tinggi yang berbeda dan volume yang sangat berbeda.'],
      ],
    },
    realWorld: {
      en: [
        'Packing boxes into a truck or a shipping container: the number of boxes that fit is a volume problem.',
        'A fish tank that is 50 cm long, 30 cm wide and 40 cm high holds 50 × 30 × 40 = 60 000 cubic centimetres, which is 60 litres of water.',
        'Sugar cubes in a box come in neat layers, just like the cubes in the sim.',
        'Architects draw a house as a plan (top view) and elevations (front and side views) before building it.',
      ],
      id: [
        'Menyusun kardus ke dalam truk atau peti kemas: banyaknya kardus yang muat adalah soal volume.',
        'Akuarium dengan panjang 50 cm, lebar 30 cm dan tinggi 40 cm memuat 50 × 30 × 40 = 60.000 sentimeter kubik, yaitu 60 liter air.',
        'Gula kotak dalam kemasan tersusun dalam lapisan rapi, sama seperti kubus di simulasi.',
        'Arsitek menggambar rumah sebagai denah (tampak atas) dan tampak depan serta samping sebelum membangunnya.',
      ],
    },
    questions: {
      en: [
        { q: 'A box is 5 cubes long, 2 cubes wide and 3 cubes high. How many cubes are in one layer, and how many in the whole box?', a: 'One layer has 5 × 2 = 10 cubes. There are 3 layers, so the box holds 10 × 3 = 30 cubes.' },
        { q: 'A box holds 24 cubes and its floor is 4 × 3. How high is it?', a: 'One layer is 4 × 3 = 12 cubes. 24 ÷ 12 = 2, so the box is 2 cubes high.' },
        { q: 'The front view of a box shows 4 squares across and 2 up. The top view shows 4 across and 5 down. What is the volume?', a: 'Length 4, height 2, width 5. Volume = 4 × 5 × 2 = 40 cubes.' },
      ],
      id: [
        { q: 'Sebuah kotak panjangnya 5 kubus, lebarnya 2 kubus dan tingginya 3 kubus. Berapa kubus dalam satu lapisan, dan berapa dalam seluruh kotak?', a: 'Satu lapisan berisi 5 × 2 = 10 kubus. Ada 3 lapisan, jadi kotak memuat 10 × 3 = 30 kubus.' },
        { q: 'Sebuah kotak memuat 24 kubus dan alasnya 4 × 3. Berapa tingginya?', a: 'Satu lapisan berisi 4 × 3 = 12 kubus. 24 ÷ 12 = 2, jadi tinggi kotak 2 kubus.' },
        { q: 'Tampak depan sebuah kotak menunjukkan 4 persegi ke samping dan 2 ke atas. Tampak atasnya menunjukkan 4 ke samping dan 5 ke bawah. Berapa volumenya?', a: 'Panjang 4, tinggi 2, lebar 5. Volume = 4 × 5 × 2 = 40 kubus.' },
      ],
    },
  },
};
