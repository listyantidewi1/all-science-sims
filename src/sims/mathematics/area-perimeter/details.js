// Long-form text for the Area and Perimeter sim (grades 4-6).
export default {
  objectives: {
    en: [
      'Find the area of a rectangle by counting unit squares, and see that the count equals width × height.',
      'Find the perimeter by counting the unit steps all the way around the outside of a shape.',
      'Show that two shapes can have the same area but different perimeters, and find the area of an L-shape and of a right triangle.',
    ],
    id: [
      'Menentukan luas persegi panjang dengan menghitung persegi satuan, dan melihat bahwa hasilnya sama dengan panjang × lebar.',
      'Menentukan keliling dengan menghitung langkah satuan di sekeliling sisi luar bangun.',
      'Menunjukkan bahwa dua bangun bisa punya luas sama tetapi keliling berbeda, serta menentukan luas bentuk L dan segitiga siku-siku.',
    ],
  },
  tryThis: {
    en: [
      'Drag a corner to make a 5 by 3 rectangle. Watch the squares get counted. Does the count match 5 × 3?',
      'Press "Walk the edge" and count out loud with the runner. Then make the rectangle wider by one square: how much longer does the walk get?',
      'Press "Challenge". Build a shape with the target area, then change its shape but keep the same area. Can you find a different perimeter?',
      'Switch to Triangle. Make a 6 by 4 rectangle: how many squares is the triangle half?',
    ],
    id: [
      'Geser sudut untuk membuat persegi panjang 5 kali 3. Lihat persegi satuannya dihitung. Apakah hasilnya sama dengan 5 × 3?',
      'Tekan "Jalan keliling tepi" dan hitung bersama pelari. Lalu lebarkan persegi panjang satu petak: berapa langkah lebih panjang jalannya?',
      'Tekan "Tantangan". Buat bangun dengan luas yang diminta, lalu ubah bentuknya tetapi luasnya tetap. Bisakah kamu menemukan keliling yang berbeda?',
      'Pilih Segitiga. Buat persegi panjang 6 kali 4: berapa persegi luas segitiga yang setengahnya?',
    ],
  },

  learn: {
    background: {
      en: [
        'Area is how much flat space a shape covers. In this sim we measure area in unit squares: the small squares of the grid. When you drag the corners of a rectangle, the sim shades the squares inside it one at a time and counts them. A rectangle that is 5 squares wide and 3 squares tall holds 3 rows of 5 squares, so its area is 5 × 3 = 15 squares. Counting squares and multiplying width by height always give the same answer.',
        'Perimeter is the distance all the way around the outside of a shape. Press "Walk the edge" and a runner sets off along the yellow outline, counting one step for every unit of length. For the 5 by 3 rectangle the runner takes 5 + 3 + 5 + 3 = 16 steps. The perimeter is measured in units of length, not in squares, because it is a line, not a space.',
        'Area and perimeter are different things, and one does not tell you the other. A 6 by 2 rectangle and a 4 by 3 rectangle both have an area of 12 squares, but their perimeters are 16 and 14. Long thin shapes have a lot of edge for their area. The Challenge button asks you to find two shapes with the same area but different perimeters, and lists every perimeter you discover.',
        'Shapes made of two rectangles, like an L, are measured the same way: shade the union and count every square once, even where the two rectangles overlap. A right triangle is exactly half of a rectangle cut along its diagonal, so its area is half of width × height. Its slanted side is longer than either straight side, so the sim shows that length approximately.',
      ],
      id: [
        'Luas adalah seberapa banyak ruang datar yang ditutupi sebuah bangun. Di simulasi ini luas diukur dengan persegi satuan, yaitu petak-petak kecil di kertas berpetak. Saat kamu menggeser sudut persegi panjang, simulasi mewarnai petak di dalamnya satu per satu dan menghitungnya. Persegi panjang yang lebarnya 5 petak dan tingginya 3 petak berisi 3 baris yang masing-masing 5 petak, jadi luasnya 5 × 3 = 15 persegi. Menghitung petak dan mengalikan panjang dengan lebar selalu memberi jawaban yang sama.',
        'Keliling adalah jarak mengitari sisi luar bangun. Tekan "Jalan keliling tepi", maka seorang pelari berjalan di sepanjang garis kuning dan menghitung satu langkah untuk setiap satuan panjang. Untuk persegi panjang 5 kali 3, pelari menempuh 5 + 3 + 5 + 3 = 16 langkah. Keliling diukur dengan satuan panjang, bukan persegi, karena keliling adalah garis, bukan ruang.',
        'Luas dan keliling adalah dua hal yang berbeda, dan yang satu tidak menentukan yang lain. Persegi panjang 6 kali 2 dan persegi panjang 4 kali 3 sama-sama berluas 12 persegi, tetapi kelilingnya 16 dan 14. Bangun yang panjang dan tipis punya banyak tepi dibanding luasnya. Tombol Tantangan memintamu mencari dua bangun dengan luas sama tetapi keliling berbeda, dan mencatat setiap keliling yang kamu temukan.',
        'Bangun yang terdiri dari dua persegi panjang, seperti bentuk L, diukur dengan cara yang sama: warnai gabungannya dan hitung setiap petak satu kali saja, termasuk di bagian yang tumpang tindih. Segitiga siku-siku adalah tepat setengah persegi panjang yang dipotong pada diagonalnya, jadi luasnya setengah dari panjang × lebar. Sisi miringnya lebih panjang daripada kedua sisi lurusnya, sehingga simulasi menampilkan panjang itu secara kira-kira.',
      ],
    },
    figure: {
      caption: {
        en: 'Two rectangles with the same area, 12 squares each, but different perimeters: the 4 by 3 rectangle has 14 steps around the edge, the 6 by 2 rectangle has 16. The yellow line is the perimeter; the shaded squares are the area.',
        id: 'Dua persegi panjang dengan luas sama, masing-masing 12 persegi, tetapi kelilingnya berbeda: persegi panjang 4 kali 3 punya 14 langkah di tepinya, persegi panjang 6 kali 2 punya 16. Garis kuning adalah keliling; petak berwarna adalah luas.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cells = (x0, y0, w, h, s) => {
          let out = '';
          let n = 0;
          for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) {
            n++;
            out += `<rect x="${x0 + c * s + 1}" y="${y0 + r * s + 1}" width="${s - 2}" height="${s - 2}" fill="#38bdf8" opacity=".7"/>`;
            out += `<text x="${x0 + c * s + s / 2}" y="${y0 + r * s + s / 2 + 4}" class="n">${n}</text>`;
          }
          return out;
        };
        const grid = (x0, y0, cols, rows, s) => {
          let d = '';
          for (let c = 0; c <= cols; c++) d += `M${x0 + c * s} ${y0} V${y0 + rows * s} `;
          for (let r = 0; r <= rows; r++) d += `M${x0} ${y0 + r * s} H${x0 + cols * s} `;
          return `<path d="${d.trim()}" class="g"/>`;
        };
        const s = 22;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Two rectangles with equal area and different perimeters', 'Dua persegi panjang dengan luas sama dan keliling berbeda')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.n{font:bold 10px system-ui,sans-serif;fill:#fff;text-anchor:middle}.g{fill:none;stroke:currentColor;stroke-width:.6;opacity:.35}.p{fill:none;stroke:#facc15;stroke-width:3;stroke-linejoin:round}.t{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}</style>
  ${grid(20, 30, 6, 4, s)}
  ${cells(20, 30, 4, 3, s)}
  <rect x="20" y="30" width="${4 * s}" height="${3 * s}" class="p"/>
  <text x="${20 + 2 * s}" y="24" class="t">4</text>
  <text x="12" y="${30 + 1.5 * s + 4}" class="t">3</text>
  <text x="${20 + 3 * s}" y="140" class="t">${L('area 4 × 3 = 12', 'luas 4 × 3 = 12')}</text>
  <text x="${20 + 3 * s}" y="156" class="t" fill="#facc15" style="fill:#facc15">${L('perimeter 14', 'keliling 14')}</text>
  ${grid(200, 30, 7, 4, s)}
  ${cells(200, 30, 6, 2, s)}
  <rect x="200" y="30" width="${6 * s}" height="${2 * s}" class="p"/>
  <text x="${200 + 3 * s}" y="24" class="t">6</text>
  <text x="192" y="${30 + s + 4}" class="t">2</text>
  <text x="${200 + 3.5 * s}" y="140" class="t">${L('area 6 × 2 = 12', 'luas 6 × 2 = 12')}</text>
  <text x="${200 + 3.5 * s}" y="156" class="t" style="fill:#facc15">${L('perimeter 16', 'keliling 16')}</text>
  <text x="180" y="190" class="t">${L('Same area, different perimeter!', 'Luas sama, keliling berbeda!')}</text>
  <rect x="40" y="206" width="14" height="14" fill="#38bdf8" opacity=".7"/>
  <text x="60" y="218">${L('one unit square (area)', 'satu persegi satuan (luas)')}</text>
  <line x1="210" y1="213" x2="240" y2="213" stroke="#facc15" stroke-width="3"/>
  <text x="246" y="218">${L('edge (perimeter)', 'tepi (keliling)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Area is the number of unit squares a shape covers. For a rectangle, area = width × height.',
        'Perimeter is the number of unit steps all the way around the outside. For a rectangle, perimeter = width + height + width + height.',
        'Area is measured in squares; perimeter is measured in units of length.',
        'Two shapes can have the same area but different perimeters. Long, thin shapes have more perimeter for the same area.',
        'An L-shape is two rectangles joined together: count every square once.',
        'A right triangle is half of a rectangle, so its area is half of width × height.',
      ],
      id: [
        'Luas adalah banyaknya persegi satuan yang ditutupi bangun. Untuk persegi panjang, luas = panjang × lebar.',
        'Keliling adalah banyaknya langkah satuan mengitari sisi luar. Untuk persegi panjang, keliling = panjang + lebar + panjang + lebar.',
        'Luas diukur dengan persegi; keliling diukur dengan satuan panjang.',
        'Dua bangun bisa punya luas sama tetapi keliling berbeda. Bangun yang panjang dan tipis punya keliling lebih besar untuk luas yang sama.',
        'Bentuk L adalah dua persegi panjang yang digabung: hitung setiap petak satu kali saja.',
        'Segitiga siku-siku adalah setengah persegi panjang, jadi luasnya setengah dari panjang × lebar.',
      ],
    },
    vocabulary: {
      en: [
        ['Area', 'The amount of flat space inside a shape, counted in unit squares.'],
        ['Perimeter', 'The distance all the way around the outside of a shape.'],
        ['Unit square', 'One small square of the grid. We count these to find area.'],
        ['Rectangle', 'A shape with four straight sides and four square corners.'],
        ['Right triangle', 'A triangle with one square corner. It is exactly half of a rectangle.'],
        ['Diagonal', 'A straight line from one corner of a rectangle to the opposite corner.'],
      ],
      id: [
        ['Luas', 'Banyaknya ruang datar di dalam bangun, dihitung dengan persegi satuan.'],
        ['Keliling', 'Jarak mengitari sisi luar sebuah bangun.'],
        ['Persegi satuan', 'Satu petak kecil pada kertas berpetak. Kita menghitungnya untuk menentukan luas.'],
        ['Persegi panjang', 'Bangun dengan empat sisi lurus dan empat sudut siku-siku.'],
        ['Segitiga siku-siku', 'Segitiga dengan satu sudut siku-siku. Bentuknya tepat setengah persegi panjang.'],
        ['Diagonal', 'Garis lurus dari satu sudut persegi panjang ke sudut yang berseberangan.'],
      ],
    },
    misconceptions: {
      en: [
        ['If two shapes have the same area, they must have the same perimeter.', 'No. A 6 by 2 rectangle and a 4 by 3 rectangle both have area 12, but their perimeters are 16 and 14. Try the Challenge to find more pairs.'],
        ['Perimeter is counted in squares, like area.', 'Perimeter is a length, so it is counted in unit steps along the edge. Area is a space, so it is counted in squares.'],
        ['When two rectangles overlap in an L-shape, you add both areas.', 'The squares where they overlap must be counted only once. The sim colours those squares green to remind you.'],
        ['A bigger perimeter always means a bigger area.', 'A 12 by 1 strip has a perimeter of 26 but an area of only 12. A 4 by 4 square has a smaller perimeter, 16, but a bigger area, 16.'],
      ],
      id: [
        ['Jika dua bangun luasnya sama, kelilingnya pasti sama.', 'Tidak. Persegi panjang 6 kali 2 dan 4 kali 3 sama-sama berluas 12, tetapi kelilingnya 16 dan 14. Coba Tantangan untuk menemukan pasangan lain.'],
        ['Keliling dihitung dengan persegi, seperti luas.', 'Keliling adalah panjang, jadi dihitung dengan langkah satuan di sepanjang tepi. Luas adalah ruang, jadi dihitung dengan persegi.'],
        ['Jika dua persegi panjang tumpang tindih membentuk L, kedua luasnya dijumlahkan.', 'Petak yang tumpang tindih hanya dihitung satu kali. Simulasi memberi warna hijau pada petak itu sebagai pengingat.'],
        ['Keliling yang lebih besar selalu berarti luas yang lebih besar.', 'Pita 12 kali 1 punya keliling 26 tetapi luasnya hanya 12. Persegi 4 kali 4 kelilingnya lebih kecil, 16, tetapi luasnya lebih besar, 16.'],
      ],
    },
    realWorld: {
      en: [
        'Tiling a floor: the number of tiles you need is the area of the room in tile-sized squares.',
        'Putting a fence around a garden: the length of fence you buy is the perimeter.',
        'A picture frame goes around the perimeter of a photo, but the glass covers its area.',
        'Farmers in Indonesia measure rice fields (sawah) by area, but the dyke path around a field is its perimeter.',
      ],
      id: [
        'Memasang ubin lantai: banyaknya ubin yang dibutuhkan adalah luas ruangan dalam petak seukuran ubin.',
        'Memasang pagar di sekeliling kebun: panjang pagar yang dibeli adalah kelilingnya.',
        'Bingkai foto mengitari keliling sebuah foto, tetapi kacanya menutupi luasnya.',
        'Petani di Indonesia mengukur sawah dengan luas, tetapi pematang di sekeliling petak sawah adalah kelilingnya.',
      ],
    },
    questions: {
      en: [
        { q: 'A rectangle is 7 squares wide and 2 squares tall. What is its area and what is its perimeter?', a: 'Area = 7 × 2 = 14 squares. Perimeter = 7 + 2 + 7 + 2 = 18 units.' },
        { q: 'Find two different rectangles that both have an area of 16 squares. Which one has the smaller perimeter?', a: 'For example 4 by 4 (perimeter 16) and 8 by 2 (perimeter 20). The square has the smaller perimeter. The 16 by 1 strip would be even longer, 34.' },
        { q: 'A right triangle is half of a 6 by 4 rectangle. What is its area?', a: 'The rectangle has area 6 × 4 = 24 squares, so the triangle has half of that: 12 squares.' },
      ],
      id: [
        { q: 'Sebuah persegi panjang lebarnya 7 petak dan tingginya 2 petak. Berapa luas dan kelilingnya?', a: 'Luas = 7 × 2 = 14 persegi. Keliling = 7 + 2 + 7 + 2 = 18 satuan.' },
        { q: 'Temukan dua persegi panjang berbeda yang sama-sama berluas 16 persegi. Mana yang kelilingnya lebih kecil?', a: 'Misalnya 4 kali 4 (keliling 16) dan 8 kali 2 (keliling 20). Persegi punya keliling lebih kecil. Pita 16 kali 1 bahkan lebih panjang lagi, 34.' },
        { q: 'Sebuah segitiga siku-siku adalah setengah dari persegi panjang 6 kali 4. Berapa luasnya?', a: 'Persegi panjang itu luasnya 6 × 4 = 24 persegi, jadi segitiganya setengahnya: 12 persegi.' },
      ],
    },
  },
};
