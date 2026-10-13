// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read a Wolfram rule number as 8 binary outputs.',
      'Distinguish Wolfram\'s 4 classes (uniform, periodic, chaotic, complex).',
      'Recognize that simple rules can generate fractals and randomness.',
    ],
    id: [
      'Membaca nomor aturan Wolfram sebagai 8 keluaran biner.',
      'Membedakan 4 kelas Wolfram (seragam, periodik, kacau, kompleks).',
      'Mengenali bahwa aturan sederhana dapat menghasilkan fraktal dan keacakan.',
    ],
  },
  tryThis: {
    en: [
      'Run Rule 30 — does the right edge look random?',
      'Run Rule 90 — see Sierpinski emerge.',
      'Run Rule 110 — find a glider.',
    ],
    id: [
      'Jalankan Rule 30 — apakah tepi kanannya tampak acak?',
      'Jalankan Rule 90 — lihat Sierpinski muncul.',
      'Jalankan Rule 110 — temukan glider.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An elementary cellular automaton is the simplest possible world: a single row of cells, each either on (1) or off (0). Time runs downward. To compute a cell in the next row, you look at just three cells in the row above, the cell itself and its left and right neighbours, and a rule says whether the new cell is on or off. Since three cells can be in 8 possible patterns, from 111 down to 000, a rule is nothing more than a list of 8 answers. Writing those 8 bits in that order gives a binary number from 0 to 255, which is how Stephen Wolfram named the 256 rules. Rule 30 is 00011110 in binary: on for the patterns 100, 011, 010 and 001, off for the rest.',
        'The simulation shows the current rule\'s 8 patterns across the top with their outputs, and draws each new generation as one more row of pixels. The row is 200 cells wide and its ends are joined, so the leftmost cell treats the rightmost as its neighbour. You can start from a single on cell in the middle or from a random row, type any rule number into the slider, or jump to famous rules with the buttons. Changing the rule or the start recomputes the whole picture at once.',
        'Wolfram sorted the rules into four classes by what they do from a random start. Class 1 rules die into a uniform row, like Rule 0. Class 2 rules settle into stripes or small repeating patterns, like Rule 184, which models cars in traffic. Class 3 rules are chaotic: Rule 30 from a single cell produces a left half with regular stripes and a right half that passes statistical randomness tests, and Rule 90, where each cell is simply the XOR of its two outer neighbours, draws the Sierpinski triangle. Class 4 rules, with Rule 110 the famous example, produce localised structures that move and collide like gliders, and Rule 110 has been proved able to perform any computation.',
        'The picture is finite in two ways. It stops when the rows reach the bottom of the canvas, and because the ends of the 200-cell row are joined, a pattern growing from a single cell wraps around and meets itself after about 100 rows, after which it no longer matches the infinite-row version. The sim also uses only two colours and only the nearest neighbours; automata with more states or wider neighbourhoods exist, but these 256 rules already show that there is no simple relationship between how short a rule is and how complicated its behaviour can be.',
      ],
      id: [
        'Otomata seluler elementer adalah dunia paling sederhana yang mungkin: satu baris sel, masing-masing menyala (1) atau mati (0). Waktu berjalan ke bawah. Untuk menghitung sebuah sel di baris berikutnya, kamu hanya melihat tiga sel di baris atasnya, yaitu sel itu sendiri serta tetangga kiri dan kanannya, dan sebuah aturan menentukan apakah sel baru menyala atau mati. Karena tiga sel bisa membentuk 8 pola, dari 111 sampai 000, sebuah aturan hanyalah daftar 8 jawaban. Menuliskan 8 bit itu dalam urutan tersebut memberi bilangan biner dari 0 sampai 255, dan begitulah Stephen Wolfram menamai 256 aturan tersebut. Rule 30 adalah 00011110 dalam biner: menyala untuk pola 100, 011, 010, dan 001, mati untuk yang lain.',
        'Simulasi menampilkan 8 pola aturan saat ini di bagian atas beserta keluarannya, dan menggambar setiap generasi baru sebagai satu baris piksel tambahan. Barisnya selebar 200 sel dan kedua ujungnya tersambung, sehingga sel paling kiri menganggap sel paling kanan sebagai tetangganya. Kamu bisa mulai dari satu sel menyala di tengah atau dari baris acak, memasukkan nomor aturan apa pun lewat slider, atau melompat ke aturan terkenal dengan tombol. Mengubah aturan atau awalnya menghitung ulang seluruh gambar sekaligus.',
        'Wolfram memilah aturan ke dalam empat kelas berdasarkan perilakunya dari awal acak. Aturan kelas 1 mati menjadi baris seragam, seperti Rule 0. Aturan kelas 2 mengendap menjadi garis-garis atau pola kecil berulang, seperti Rule 184, yang memodelkan mobil dalam lalu lintas. Aturan kelas 3 bersifat kacau: Rule 30 dari satu sel menghasilkan separuh kiri bergaris teratur dan separuh kanan yang lolos uji keacakan statistik, dan Rule 90, dengan setiap sel hanyalah XOR dari dua tetangga luarnya, menggambar segitiga Sierpinski. Aturan kelas 4, dengan Rule 110 sebagai contoh terkenal, menghasilkan struktur setempat yang bergerak dan bertabrakan seperti glider, dan Rule 110 telah terbukti mampu melakukan komputasi apa pun.',
        'Gambarnya terbatas dalam dua hal. Ia berhenti ketika baris mencapai dasar kanvas, dan karena ujung-ujung baris 200 sel tersambung, pola yang tumbuh dari satu sel memutar dan bertemu dirinya sendiri setelah sekitar 100 baris, sehingga setelah itu tidak lagi sama dengan versi baris tak hingga. Simulasi juga hanya memakai dua warna dan hanya tetangga terdekat; otomata dengan lebih banyak keadaan atau lingkungan lebih lebar memang ada, tetapi 256 aturan ini sudah menunjukkan bahwa tidak ada hubungan sederhana antara pendeknya sebuah aturan dan rumitnya perilaku yang bisa dihasilkannya.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: Rule 30 as a lookup table. The 8 three-cell patterns are listed from 111 to 000, and the output bits 0 0 0 1 1 1 1 0 read as the binary number 30. Bottom: the first five generations grown from a single on cell, each row computed from the row above using that table.',
        id: 'Atas: Rule 30 sebagai tabel pencarian. Delapan pola tiga sel diurutkan dari 111 sampai 000, dan bit keluarannya 0 0 0 1 1 1 1 0 terbaca sebagai bilangan biner 30. Bawah: lima generasi pertama yang tumbuh dari satu sel menyala, setiap baris dihitung dari baris di atasnya dengan tabel itu.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const rule = 30;
        const c = 9;
        let table = '';
        for (let p = 7; p >= 0; p--) {
          const x0 = 14 + (7 - p) * 42;
          const bits = [(p >> 2) & 1, (p >> 1) & 1, p & 1];
          bits.forEach((b, i) => { table += `<rect x="${x0 + i * c}" y="40" width="${c}" height="${c}" class="c" fill="${b ? '#8b5cf6' : 'none'}"/>`; });
          const out = (rule >> p) & 1;
          table += `<rect x="${x0 + c}" y="${40 + c + 3}" width="${c}" height="${c}" class="c" fill="${out ? '#10b981' : 'none'}"/>`;
          table += `<text x="${x0 + 13.5}" y="76" text-anchor="middle" class="n">${bits.join('')}</text>`;
          table += `<text x="${x0 + 13.5}" y="90" text-anchor="middle" class="n" fill="${out ? '#10b981' : 'currentColor'}" font-weight="700">${out}</text>`;
        }
        const rows = [[0, 0, 0, 0, 1, 0, 0, 0, 0]];
        for (let r = 1; r < 5; r++) {
          const prev = rows[r - 1], next = [];
          for (let i = 0; i < 9; i++) {
            const l = prev[(i + 8) % 9], m = prev[i], rr = prev[(i + 1) % 9];
            next.push((rule >> ((l << 2) | (m << 1) | rr)) & 1);
          }
          rows.push(next);
        }
        const g = 14;
        let grid = '';
        rows.forEach((row, r) => row.forEach((v, i) => { grid += `<rect x="${117 + i * g}" y="${124 + r * g}" width="${g}" height="${g}" class="c" fill="${v ? '#8b5cf6' : 'none'}"/>`; }));
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Rule 30 lookup table and first generations', 'Tabel pencarian Rule 30 dan generasi pertama')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{stroke:currentColor;stroke-width:.8;stroke-opacity:.5}.n{font:9px ui-monospace,Menlo,monospace;fill:currentColor}.t{font-weight:700}.s{font-size:10px;opacity:.75}</style>
  <text x="14" y="24" class="t">${L('Rule 30 = 00011110 (binary)', 'Rule 30 = 00011110 (biner)')}</text>
  ${table}
  <text x="14" y="110" class="s">${L('3 cells above → 1 cell below', '3 sel di atas → 1 sel di bawah')}</text>
  ${grid}
  <text x="14" y="135" class="s">${L('gen 0', 'gen 0')}</text>
  <text x="14" y="191" class="s">${L('gen 4', 'gen 4')}</text>
  <text x="252" y="150" class="s">${L('each row from', 'tiap baris dari')}</text>
  <text x="252" y="163" class="s">${L('the row above', 'baris di atasnya')}</text>
  <text x="14" y="222" class="s">${L('e.g. gen 1: the cells at 100, 010 and 001 turn on', 'mis. gen 1: sel pada pola 100, 010, dan 001 menyala')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Each new cell depends only on three cells above it, so a rule is a table of 8 outputs, and there are exactly 256 such rules.',
        'The rule number is the 8 output bits read as a binary number, with pattern 111 as the most significant bit.',
        'Rules fall into four classes: uniform, periodic, chaotic and complex, and the class cannot be guessed from the rule number.',
        'Rule 90 computes left XOR right and draws the Sierpinski triangle; Rule 30 is deterministic yet produces a column that passes randomness tests.',
        'Rule 110 supports gliders and is capable of universal computation, so a one-dimensional two-colour world can compute anything.',
      ],
      id: [
        'Setiap sel baru hanya bergantung pada tiga sel di atasnya, sehingga sebuah aturan adalah tabel 8 keluaran, dan ada tepat 256 aturan semacam itu.',
        'Nomor aturan adalah 8 bit keluaran yang dibaca sebagai bilangan biner, dengan pola 111 sebagai bit paling berbobot.',
        'Aturan terbagi dalam empat kelas: seragam, periodik, kacau, dan kompleks, dan kelasnya tidak bisa ditebak dari nomor aturan.',
        'Rule 90 menghitung kiri XOR kanan dan menggambar segitiga Sierpinski; Rule 30 deterministik namun menghasilkan kolom yang lolos uji keacakan.',
        'Rule 110 mendukung glider dan mampu melakukan komputasi universal, sehingga dunia satu dimensi dua warna dapat menghitung apa pun.',
      ],
    },
    vocabulary: {
      en: [
        ['Cellular automaton', 'A grid of cells updated in discrete steps by a rule that depends only on nearby cells.'],
        ['Elementary', 'The one-dimensional, two-colour, nearest-neighbour case: 3 input cells, 1 output cell.'],
        ['Neighbourhood', 'The three cells (left, centre, right) that determine a cell\'s next value.'],
        ['Wolfram code', 'The rule number from 0 to 255 obtained by reading the 8 output bits, for patterns 111 down to 000, as a binary number.'],
        ['Generation', 'One row of the picture; each row is the state of the whole automaton at one time step.'],
        ['Periodic boundary', 'Joining the two ends of the row so every cell has two neighbours; the sim does this with its 200 cells.'],
        ['Wolfram classes', 'Four kinds of long-term behaviour: 1 uniform, 2 periodic, 3 chaotic, 4 complex with localised moving structures.'],
        ['Glider', 'A small pattern that reappears shifted sideways after a fixed number of generations, as in Rule 110.'],
      ],
      id: [
        ['Otomata seluler', 'Grid sel yang diperbarui dalam langkah diskret oleh aturan yang hanya bergantung pada sel di dekatnya.'],
        ['Elementer', 'Kasus satu dimensi, dua warna, tetangga terdekat: 3 sel masukan, 1 sel keluaran.'],
        ['Lingkungan (neighbourhood)', 'Tiga sel (kiri, tengah, kanan) yang menentukan nilai sel berikutnya.'],
        ['Kode Wolfram', 'Nomor aturan dari 0 sampai 255 yang diperoleh dengan membaca 8 bit keluaran, untuk pola 111 sampai 000, sebagai bilangan biner.'],
        ['Generasi', 'Satu baris gambar; setiap baris adalah keadaan seluruh otomata pada satu langkah waktu.'],
        ['Batas periodik', 'Menyambung kedua ujung baris sehingga setiap sel punya dua tetangga; simulasi melakukannya dengan 200 selnya.'],
        ['Kelas Wolfram', 'Empat jenis perilaku jangka panjang: 1 seragam, 2 periodik, 3 kacau, 4 kompleks dengan struktur bergerak setempat.'],
        ['Glider', 'Pola kecil yang muncul kembali bergeser ke samping setelah sejumlah generasi tetap, seperti pada Rule 110.'],
      ],
    },
    misconceptions: {
      en: [
        ['A simple rule must produce a simple pattern.', 'Rule 30 and Rule 110 are each only 8 bits long, yet one produces statistically random output and the other can compute anything. Rule complexity and behaviour complexity are unrelated.'],
        ['Rule 30 looks random because the computer uses random numbers somewhere.', 'From a single cell there is no randomness at all: every pixel is fixed by the rule, and the picture is identical every time. Only the Random start option uses random numbers.'],
        ['The rule number is just a label chosen by convention.', 'It encodes the entire rule. Write the number in 8-bit binary and you can read off exactly what each of the 8 neighbourhoods produces, and then run the automaton by hand.'],
        ['The picture on screen is what the infinite automaton would look like.', 'Only the top part is. The sim joins the row\'s two ends, so after roughly 100 generations the growing pattern wraps around and starts interacting with itself.'],
      ],
      id: [
        ['Aturan sederhana pasti menghasilkan pola sederhana.', 'Rule 30 dan Rule 110 masing-masing hanya sepanjang 8 bit, tetapi yang satu menghasilkan keluaran acak secara statistik dan yang lain dapat menghitung apa pun. Kerumitan aturan dan kerumitan perilaku tidak berkaitan.'],
        ['Rule 30 tampak acak karena komputer memakai bilangan acak di suatu tempat.', 'Dari satu sel tidak ada keacakan sama sekali: setiap piksel ditentukan oleh aturan, dan gambarnya identik setiap kali. Hanya pilihan awal Random yang memakai bilangan acak.'],
        ['Nomor aturan hanyalah label yang dipilih berdasarkan kesepakatan.', 'Nomor itu mengodekan seluruh aturan. Tulis nomornya dalam biner 8 bit dan kamu bisa membaca tepat apa yang dihasilkan masing-masing dari 8 lingkungan, lalu menjalankan otomata itu dengan tangan.'],
        ['Gambar di layar adalah tampilan otomata tak hingga.', 'Hanya bagian atasnya. Simulasi menyambung kedua ujung baris, sehingga setelah kira-kira 100 generasi pola yang tumbuh memutar dan mulai berinteraksi dengan dirinya sendiri.'],
      ],
    },
    realWorld: {
      en: [
        'Rule 30 was used for years as the random number generator in the Mathematica software, because its central column is so hard to predict.',
        'Rule 184 is a basic model of traffic on a single lane: cars move forward if the cell ahead is empty, and jams appear as backwards-moving stripes.',
        'The patterns on some cone snail shells closely resemble elementary automata, as the shell is laid down one row at a time by cells that respond to their neighbours.',
        'Cellular automata are used in physics and biology to simulate crystal growth, forest fires and the spread of epidemics with very simple local rules.',
      ],
      id: [
        'Rule 30 dipakai selama bertahun-tahun sebagai pembangkit bilangan acak dalam perangkat lunak Mathematica, karena kolom tengahnya sangat sulit diprediksi.',
        'Rule 184 adalah model dasar lalu lintas satu lajur: mobil maju jika sel di depannya kosong, dan kemacetan muncul sebagai garis-garis yang bergerak mundur.',
        'Pola pada beberapa cangkang siput kerucut sangat menyerupai otomata elementer, karena cangkang dibentuk baris demi baris oleh sel yang merespons tetangganya.',
        'Otomata seluler dipakai dalam fisika dan biologi untuk menyimulasikan pertumbuhan kristal, kebakaran hutan, dan penyebaran epidemi dengan aturan lokal yang sangat sederhana.',
      ],
    },
    questions: {
      en: [
        { q: 'Under Rule 30, what does a cell become if the three cells above it are 1 0 1? Show how you read it from the rule number.', a: '0. Rule 30 is 00011110 in binary. The pattern 101 is 5 in binary, so its output is bit number 5 counting from the right starting at 0: the bits from right to left are 0,1,1,1,1,0,0,0, and bit 5 is 0.' },
        { q: 'Rule 90 sets each cell to the XOR of its left and right neighbours, ignoring the centre. Why does this produce the Sierpinski triangle from a single cell?', a: 'Each cell is 1 exactly when an odd number of its two outer neighbours were 1 the row before, which is addition modulo 2. That is the rule for building Pascal\'s triangle and keeping only whether each entry is odd or even, and the odd entries of Pascal\'s triangle form the Sierpinski pattern.' },
        { q: 'Why are there exactly 256 elementary rules, and how many would there be if cells could be one of three colours instead of two?', a: 'There are 2 × 2 × 2 = 8 possible three-cell patterns, and each needs one of 2 outputs, giving 2 to the power 8 = 256 rules. With three colours there are 27 patterns and 3 outputs each, so 3 to the power 27, about 7.6 trillion rules.' },
      ],
      id: [
        { q: 'Menurut Rule 30, menjadi apa sebuah sel jika tiga sel di atasnya adalah 1 0 1? Tunjukkan cara membacanya dari nomor aturan.', a: '0. Rule 30 adalah 00011110 dalam biner. Pola 101 adalah 5 dalam biner, sehingga keluarannya adalah bit nomor 5 dihitung dari kanan mulai dari 0: bit dari kanan ke kiri adalah 0,1,1,1,1,0,0,0, dan bit 5 adalah 0.' },
        { q: 'Rule 90 menjadikan setiap sel XOR dari tetangga kiri dan kanannya, mengabaikan sel tengah. Mengapa ini menghasilkan segitiga Sierpinski dari satu sel?', a: 'Setiap sel bernilai 1 tepat ketika sejumlah ganjil dari dua tetangga luarnya bernilai 1 pada baris sebelumnya, yaitu penjumlahan modulo 2. Itu adalah aturan membangun segitiga Pascal dengan hanya menyimpan apakah setiap entri ganjil atau genap, dan entri ganjil segitiga Pascal membentuk pola Sierpinski.' },
        { q: 'Mengapa ada tepat 256 aturan elementer, dan berapa banyak aturan jika sel bisa berwarna salah satu dari tiga warna, bukan dua?', a: 'Ada 2 × 2 × 2 = 8 pola tiga sel yang mungkin, dan masing-masing butuh satu dari 2 keluaran, sehingga 2 pangkat 8 = 256 aturan. Dengan tiga warna ada 27 pola dan 3 keluaran untuk masing-masing, sehingga 3 pangkat 27, sekitar 7,6 triliun aturan.' },
      ],
    },
  },
};
