// Long-form text for the Pixels and Colour sim page.
export default {
  objectives: {
    en: [
      'Explain that a digital image is a grid of pixels and that each pixel is stored as numbers.',
      'Convert a colour between its red-green-blue values (0–255), its hex code (#RRGGBB) and its 24-bit binary code.',
      'Calculate the raw size of an image in bits and bytes from width × height × bits per pixel, and explain how resolution and bit depth change it.',
    ],
    id: [
      'Menjelaskan bahwa gambar digital adalah kisi piksel dan setiap piksel disimpan sebagai angka.',
      'Mengonversi warna antara nilai merah-hijau-biru (0–255), kode heksadesimal (#RRGGBB) dan kode biner 24-bitnya.',
      'Menghitung ukuran mentah gambar dalam bit dan byte dari lebar × tinggi × bit per piksel, dan menjelaskan bagaimana resolusi dan kedalaman bit mengubahnya.',
    ],
  },
  tryThis: {
    en: [
      'Set R = 255, G = 255, B = 0. What colour appears? Read its hex code, then set all three to 128 and compare.',
      'Paint a face on the 8×8 grid. Switch bit depth to 1-bit and then 8-bit grey: what information is lost each time?',
      'Keep the same picture and change the size from 8×8 to 32×32. By what factor does the number of bytes grow?',
      'Turn on "Pick colour" and tap a pixel you painted earlier. Do the sliders jump to the numbers you expected?',
    ],
    id: [
      'Atur R = 255, G = 255, B = 0. Warna apa yang muncul? Baca kode heksadesimalnya, lalu atur ketiganya ke 128 dan bandingkan.',
      'Lukis sebuah wajah di kisi 8×8. Ganti kedalaman bit ke 1-bit lalu abu-abu 8-bit: informasi apa yang hilang setiap kali?',
      'Pertahankan gambar yang sama dan ubah ukuran dari 8×8 ke 32×32. Berapa kali lipat jumlah byte bertambah?',
      'Nyalakan "Ambil warna" dan sentuh piksel yang tadi kamu lukis. Apakah slidernya melompat ke angka yang kamu duga?',
    ],
  },

  learn: {
    background: {
      en: [
        'Zoom far enough into any photo on a screen and it breaks up into tiny squares called pixels (picture elements). A digital image is just a grid of pixels, with a width and a height. The number of pixels across and down is the resolution: an 8×8 grid has 64 pixels, a 32×32 grid has 1024, and a Full HD screen has 1920 × 1080 = 2,073,600 pixels. Because a computer can only store numbers, each pixel must be described by numbers.',
        'Screens make colour by mixing red, green and blue light. In the common 24-bit (true colour) format each pixel stores three numbers from 0 to 255: how much red, how much green, how much blue. (255, 0, 0) is pure red, (255, 255, 0) is yellow because red and green light add to yellow, (0, 0, 0) is black and (255, 255, 255) is white. Equal values give grey. Each number fits in 8 bits (one byte), because 2⁸ = 256 different values, so one pixel is 3 bytes = 24 bits, and there are 256 × 256 × 256 ≈ 16.8 million possible colours.',
        'Programmers often write the same three numbers in hexadecimal: two hex digits per channel, as in #FFD700. FF is 255, D7 is 215, 00 is 0, so that colour is (255, 215, 0), a gold. In the sim the colour mixer shows all three forms at once: decimal, hex and the 24-bit binary string that is actually stored.',
        'Bit depth is the number of bits per pixel. A 1-bit image can only be black or white; an 8-bit greyscale image has 256 shades of grey; a 24-bit image has full colour. The raw size of an image is width × height × bits per pixel, divided by 8 to get bytes. A 32×32 picture is 128 bytes at 1-bit, 1024 bytes (1 KB) at 8-bit and 3072 bytes (3 KB) at 24-bit. Doubling the width and the height quadruples the number of pixels, so resolution grows the file fast; that is why real photo formats such as JPEG and PNG compress the data.',
      ],
      id: [
        'Perbesar foto apa pun di layar cukup jauh dan ia akan pecah menjadi kotak-kotak kecil yang disebut piksel (picture element, elemen gambar). Gambar digital hanyalah kisi piksel dengan lebar dan tinggi. Jumlah piksel ke samping dan ke bawah disebut resolusi: kisi 8×8 punya 64 piksel, kisi 32×32 punya 1024, dan layar Full HD punya 1920 × 1080 = 2.073.600 piksel. Karena komputer hanya bisa menyimpan angka, setiap piksel harus dinyatakan dengan angka.',
        'Layar membuat warna dengan mencampur cahaya merah, hijau dan biru. Pada format 24-bit (true colour) yang umum, setiap piksel menyimpan tiga angka dari 0 sampai 255: seberapa banyak merah, hijau dan biru. (255, 0, 0) adalah merah murni, (255, 255, 0) adalah kuning karena cahaya merah dan hijau bertambah menjadi kuning, (0, 0, 0) hitam dan (255, 255, 255) putih. Nilai yang sama ketiganya menghasilkan abu-abu. Setiap angka muat dalam 8 bit (satu byte), karena 2⁸ = 256 nilai berbeda, sehingga satu piksel adalah 3 byte = 24 bit, dan ada 256 × 256 × 256 ≈ 16,8 juta kemungkinan warna.',
        'Pemrogram sering menulis tiga angka yang sama dalam heksadesimal: dua digit heksa per kanal, seperti #FFD700. FF adalah 255, D7 adalah 215, 00 adalah 0, jadi warna itu (255, 215, 0), warna emas. Di simulasi, pencampur warna menampilkan ketiga bentuknya sekaligus: desimal, heksa dan deretan biner 24-bit yang benar-benar disimpan.',
        'Kedalaman bit adalah jumlah bit per piksel. Gambar 1-bit hanya bisa hitam atau putih; gambar skala abu-abu 8-bit punya 256 tingkat abu-abu; gambar 24-bit punya warna penuh. Ukuran mentah gambar adalah lebar × tinggi × bit per piksel, dibagi 8 untuk mendapatkan byte. Gambar 32×32 berukuran 128 byte pada 1-bit, 1024 byte (1 KB) pada 8-bit dan 3072 byte (3 KB) pada 24-bit. Menggandakan lebar dan tinggi melipatempatkan jumlah piksel, sehingga resolusi membuat berkas membesar dengan cepat; itulah sebabnya format foto sungguhan seperti JPEG dan PNG memampatkan datanya.',
      ],
    },
    figure: {
      caption: {
        en: 'One pixel of a 24-bit image is three bytes. The colour (255, 215, 0) is written #FFD700 in hex and as 24 binary digits in memory. Below: the same 4×4 picture at three bit depths and its raw size.',
        id: 'Satu piksel gambar 24-bit adalah tiga byte. Warna (255, 215, 0) ditulis #FFD700 dalam heksa dan sebagai 24 digit biner di memori. Bawah: gambar 4×4 yang sama pada tiga kedalaman bit dan ukuran mentahnya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const grid = (x0, y0, cells, size) => {
          let s = '';
          for (let i = 0; i < 16; i++) {
            const cx = x0 + (i % 4) * size, cy = y0 + Math.floor(i / 4) * size;
            s += `<rect x="${cx}" y="${cy}" width="${size}" height="${size}" fill="${cells[i]}" stroke="currentColor" stroke-width="0.4" opacity="0.95"/>`;
          }
          return s;
        };
        const col = ['#ffd700', '#ffd700', '#1d4ed8', '#1d4ed8', '#ffd700', '#ef4444', '#ef4444', '#1d4ed8', '#22c55e', '#ef4444', '#ef4444', '#22c55e', '#22c55e', '#22c55e', '#111827', '#111827'];
        const lum = (h) => { const n = parseInt(h.slice(1), 16); const r = n >> 16, g = (n >> 8) & 255, b = n & 255; return Math.round(0.299 * r + 0.587 * g + 0.114 * b); };
        const grey = col.map((h) => { const v = lum(h); return `rgb(${v},${v},${v})`; });
        const bw = col.map((h) => (lum(h) > 127 ? '#ffffff' : '#000000'));
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A pixel as three bytes, and bit depth examples', 'Piksel sebagai tiga byte, dan contoh kedalaman bit')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{font:10px ui-monospace,monospace;fill:currentColor}.k{font:10px system-ui,sans-serif;fill:currentColor;opacity:.75}.c{text-anchor:middle}</style>
  <rect x="14" y="14" width="44" height="44" fill="#ffd700" stroke="currentColor" stroke-width="1"/>
  <text x="36" y="72" class="c k">${L('1 pixel', '1 piksel')}</text>
  <path d="M60 36 L80 36" stroke="currentColor" stroke-width="1.2" fill="none"/>
  <rect x="84" y="18" width="80" height="18" fill="#ef4444" opacity=".85"/><text x="124" y="31" class="c m" fill="#fff">R = 255</text>
  <rect x="84" y="38" width="80" height="18" fill="#22c55e" opacity=".85"/><text x="124" y="51" class="c m">G = 215</text>
  <rect x="84" y="58" width="80" height="18" fill="#3b82f6" opacity=".85"/><text x="124" y="71" class="c m" fill="#fff">B = 0</text>
  <text x="176" y="31" class="m">FF = 11111111</text>
  <text x="176" y="51" class="m">D7 = 11010111</text>
  <text x="176" y="71" class="m">00 = 00000000</text>
  <text x="176" y="92" class="m">#FFD700 → 3 ${L('bytes', 'byte')} = 24 bit</text>
  ${grid(20, 120, bw, 18)}
  <text x="56" y="206" class="c k">1-bit</text><text x="56" y="219" class="c m">16 bit = 2 B</text>
  ${grid(144, 120, grey, 18)}
  <text x="180" y="206" class="c k">8-bit ${L('grey', 'abu-abu')}</text><text x="180" y="219" class="c m">128 bit = 16 B</text>
  ${grid(268, 120, col, 18)}
  <text x="304" y="206" class="c k">24-bit</text><text x="304" y="219" class="c m">384 bit = 48 B</text>
  <text x="20" y="112" class="k">${L('4×4 = 16 pixels at three bit depths', '4×4 = 16 piksel pada tiga kedalaman bit')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A digital image is a grid of pixels; resolution is the number of pixels across × down.',
        'In 24-bit colour each pixel is three numbers (R, G, B), each 0–255, each stored in one byte.',
        'Hex is shorthand for binary: one hex digit = 4 bits, so #RRGGBB is 6 hex digits = 24 bits.',
        'Bit depth sets how many colours are possible: 1 bit → 2, 8 bits → 256, 24 bits → about 16.8 million.',
        'Raw size in bits = width × height × bit depth; divide by 8 for bytes, by 1024 for KB.',
        'Doubling the resolution in both directions makes four times as many pixels and four times the size.',
      ],
      id: [
        'Gambar digital adalah kisi piksel; resolusi adalah jumlah piksel ke samping × ke bawah.',
        'Pada warna 24-bit setiap piksel adalah tiga angka (R, G, B), masing-masing 0–255, masing-masing disimpan dalam satu byte.',
        'Heksa adalah singkatan biner: satu digit heksa = 4 bit, sehingga #RRGGBB adalah 6 digit heksa = 24 bit.',
        'Kedalaman bit menentukan banyaknya warna yang mungkin: 1 bit → 2, 8 bit → 256, 24 bit → sekitar 16,8 juta.',
        'Ukuran mentah dalam bit = lebar × tinggi × kedalaman bit; bagi 8 untuk byte, bagi 1024 untuk KB.',
        'Menggandakan resolusi ke dua arah menghasilkan empat kali lebih banyak piksel dan empat kali ukuran.',
      ],
    },
    vocabulary: {
      en: [
        ['Pixel', 'The smallest square of a digital image; short for picture element.'],
        ['Resolution', 'The number of pixels in an image, given as width × height, for example 1920 × 1080.'],
        ['RGB', 'The red, green, blue colour model used by screens; each channel is a number from 0 to 255.'],
        ['Hexadecimal (hex)', 'Base-16 notation using digits 0–9 and A–F; two hex digits represent one byte.'],
        ['Bit depth', 'The number of bits used to store one pixel; it limits how many different colours are possible.'],
        ['Byte', 'A group of 8 bits; one colour channel of a 24-bit pixel takes exactly one byte.'],
      ],
      id: [
        ['Piksel', 'Kotak terkecil dari gambar digital; singkatan dari picture element (elemen gambar).'],
        ['Resolusi', 'Jumlah piksel dalam gambar, ditulis lebar × tinggi, misalnya 1920 × 1080.'],
        ['RGB', 'Model warna merah, hijau, biru yang dipakai layar; setiap kanal adalah angka dari 0 sampai 255.'],
        ['Heksadesimal (heksa)', 'Notasi basis 16 dengan digit 0–9 dan A–F; dua digit heksa mewakili satu byte.'],
        ['Kedalaman bit', 'Jumlah bit yang dipakai untuk menyimpan satu piksel; membatasi banyaknya warna berbeda yang mungkin.'],
        ['Byte', 'Kelompok 8 bit; satu kanal warna dari piksel 24-bit tepat memakai satu byte.'],
      ],
    },
    misconceptions: {
      en: [
        ['Mixing red and green makes brown, like paint.', 'On a screen colours are made of light, which adds. Red light plus green light makes yellow; all three at full strength make white, not black.'],
        ['A bigger file means a sharper picture.', 'Size depends on resolution and bit depth, not on quality alone. A blurry 32×32 picture at 24-bit is three times larger than a sharp one at 8-bit grey.'],
        ['Doubling the resolution doubles the file size.', 'Resolution is width × height. Going from 16×16 to 32×32 doubles both, so the pixel count and the file size grow four times.'],
        ['The computer stores the colour name, like "yellow".', 'It stores only numbers. Yellow is (255, 255, 0), or the 24 bits 11111111 11111111 00000000; the name exists only for humans.'],
      ],
      id: [
        ['Mencampur merah dan hijau menghasilkan cokelat, seperti cat.', 'Di layar warna dibuat dari cahaya, yang saling menambah. Cahaya merah ditambah hijau menjadi kuning; ketiganya pada kekuatan penuh menjadi putih, bukan hitam.'],
        ['Berkas yang lebih besar berarti gambar lebih tajam.', 'Ukuran bergantung pada resolusi dan kedalaman bit, bukan hanya kualitas. Gambar 32×32 yang buram pada 24-bit tiga kali lebih besar daripada gambar tajam pada abu-abu 8-bit.'],
        ['Menggandakan resolusi menggandakan ukuran berkas.', 'Resolusi adalah lebar × tinggi. Dari 16×16 ke 32×32 keduanya digandakan, sehingga jumlah piksel dan ukuran berkas bertambah empat kali.'],
        ['Komputer menyimpan nama warna, seperti "kuning".', 'Komputer hanya menyimpan angka. Kuning adalah (255, 255, 0), atau 24 bit 11111111 11111111 00000000; namanya hanya ada untuk manusia.'],
      ],
    },
    realWorld: {
      en: [
        'A 12-megapixel phone photo has about 12 million pixels; uncompressed at 24-bit that is 36 MB, which JPEG shrinks to 3–4 MB.',
        'Web designers write colours as hex codes such as #1E90FF in CSS, exactly the codes shown by the mixer.',
        'Old Game Boy screens used 2-bit graphics: only four shades of green, so sprites were tiny and files were small.',
        'Pixel art and emoji are deliberately low-resolution images, often 16×16 or 32×32 like the grid here.',
        'Fax machines and e-ink price tags still use 1-bit black-and-white images because they are small and fast to send.',
      ],
      id: [
        'Foto ponsel 12 megapiksel punya sekitar 12 juta piksel; tanpa kompresi pada 24-bit ukurannya 36 MB, yang dimampatkan JPEG menjadi 3–4 MB.',
        'Perancang web menulis warna sebagai kode heksa seperti #1E90FF di CSS, persis kode yang ditampilkan pencampur warna.',
        'Layar Game Boy lama memakai grafis 2-bit: hanya empat tingkat hijau, sehingga sprite-nya kecil dan berkasnya kecil.',
        'Seni piksel dan emoji sengaja dibuat beresolusi rendah, sering 16×16 atau 32×32 seperti kisi di sini.',
        'Mesin faks dan label harga e-ink masih memakai gambar 1-bit hitam-putih karena kecil dan cepat dikirim.',
      ],
    },
    questions: {
      en: [
        { q: 'A pixel has the hex code #00FF80. What are its R, G and B values, and roughly what colour is it?', a: 'R = 00 = 0, G = FF = 255, B = 80 = 128. Strong green with some blue: a spring green / mint colour.' },
        { q: 'How many bytes does a 16×16 image take at 1-bit, 8-bit grey and 24-bit colour?', a: '16 × 16 = 256 pixels. 1-bit: 256 bits = 32 bytes. 8-bit: 256 bytes. 24-bit: 256 × 3 = 768 bytes.' },
        { q: 'A Full HD frame is 1920 × 1080 pixels at 24-bit. How many bytes is one uncompressed frame, and why does video need compression?', a: '1920 × 1080 × 3 = 6,220,800 bytes, about 6.2 MB per frame. At 30 frames per second that is about 187 MB every second, far too much to stream, so video codecs compress heavily.' },
      ],
      id: [
        { q: 'Sebuah piksel punya kode heksa #00FF80. Berapa nilai R, G dan B-nya, dan kira-kira warna apa itu?', a: 'R = 00 = 0, G = FF = 255, B = 80 = 128. Hijau kuat dengan sedikit biru: warna hijau mint.' },
        { q: 'Berapa byte yang dibutuhkan gambar 16×16 pada 1-bit, abu-abu 8-bit dan warna 24-bit?', a: '16 × 16 = 256 piksel. 1-bit: 256 bit = 32 byte. 8-bit: 256 byte. 24-bit: 256 × 3 = 768 byte.' },
        { q: 'Satu bingkai Full HD berukuran 1920 × 1080 piksel pada 24-bit. Berapa byte satu bingkai tanpa kompresi, dan mengapa video perlu kompresi?', a: '1920 × 1080 × 3 = 6.220.800 byte, sekitar 6,2 MB per bingkai. Pada 30 bingkai per detik itu sekitar 187 MB setiap detik, terlalu besar untuk streaming, sehingga codec video memampatkannya dengan kuat.' },
      ],
    },
  },
};
