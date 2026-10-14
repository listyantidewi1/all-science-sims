// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Experience automatic processing (reading) interfering with controlled processing (color naming).',
      'Compare congruent vs incongruent reaction times.',
      'See why "automatic" tasks are hard to override.',
    ],
    id: [
      'Mengalami proses otomatis (membaca) mengganggu proses terkendali (menamai warna).',
      'Membandingkan waktu reaksi kongruen vs tak kongruen.',
      'Memahami mengapa tugas "otomatis" sulit ditekan.',
    ],
  },
  tryThis: {
    en: [
      'Run 20 incongruent trials — your reaction time will be slower than congruent trials.',
      'Try matching tasks (same word + color) — fast and easy.',
      'Compare your average to the typical 30–50% slowdown for incongruent.',
    ],
    id: [
      'Jalankan 20 percobaan tak kongruen — waktu reaksi lebih lambat.',
      'Coba percobaan kongruen (kata + warna sama) — cepat dan mudah.',
      'Bandingkan rata-rata Anda dengan perlambatan tipikal 30-50%.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Look at the word RED printed in blue ink and say the colour of the ink. It is surprisingly hard: the word "red" seems to jump out before you can say "blue". This is the Stroop effect, named after John Ridley Stroop, who reported it in 1935. He timed people naming the ink colours of colour words that were printed in the wrong colour and found they took much longer than naming the colours of plain coloured squares. The reverse task, reading the words aloud while ignoring their ink colour, caused almost no slowdown.',
        'The usual explanation is a contest between two kinds of mental processing. Reading is automatic for a practised reader: it happens fast, without effort and whether you want it to or not. Naming a colour is a controlled process that needs attention. When the word and the ink disagree, the automatic reading produces one answer ("red") while the task demands another ("blue"), and resolving this conflict takes extra time and sometimes produces an error. When the word and the ink agree, the two processes point to the same answer and responses are fast.',
        'In the simulation a colour word appears in one of five ink colours and you click the button that matches the ink. Congruent mode shows only matching word and ink, Incongruent mode only mismatches, and Mixed mode shuffles both so you cannot settle into one strategy. The header reports your average time for each type and the interference, the percentage by which incongruent trials are slower than congruent ones. Only correct answers count toward the averages; wrong clicks are recorded but excluded, which is standard practice in reaction-time research.',
        'The sim differs from Stroop\'s original test in ways that affect the numbers. Stroop\'s participants named colours aloud, which taps the reading conflict most directly; clicking a labelled button adds a search for the right button and lets you ignore the word a little more easily. Reaction times also vary from person to person and improve with practice, so compare conditions within the same session rather than against a fixed figure. Averages from only three trials are very rough; ten to twenty trials per condition give a much steadier estimate.',
      ],
      id: [
        'Lihat kata MERAH yang dicetak dengan tinta biru dan sebutkan warna tintanya. Ternyata sulit: kata "merah" seolah melompat keluar sebelum kamu bisa mengucapkan "biru". Inilah efek Stroop, dinamai menurut John Ridley Stroop yang melaporkannya pada 1935. Ia mengukur waktu orang menyebutkan warna tinta kata-kata warna yang dicetak dengan warna yang salah dan menemukan mereka butuh waktu jauh lebih lama dibanding menyebutkan warna kotak-kotak berwarna polos. Tugas kebalikannya, membaca kata dengan lantang sambil mengabaikan warna tintanya, hampir tidak menimbulkan perlambatan.',
        'Penjelasan yang biasa adalah persaingan antara dua jenis pemrosesan mental. Membaca bersifat otomatis bagi pembaca yang terlatih: berlangsung cepat, tanpa usaha, dan terjadi mau tidak mau. Menyebutkan warna adalah proses terkendali yang memerlukan perhatian. Ketika kata dan tinta tidak sesuai, pembacaan otomatis menghasilkan satu jawaban ("merah") sementara tugas menuntut jawaban lain ("biru"), dan menyelesaikan konflik ini memakan waktu tambahan dan kadang menghasilkan kesalahan. Ketika kata dan tinta sesuai, kedua proses menunjuk ke jawaban yang sama dan respons menjadi cepat.',
        'Dalam simulasi, sebuah kata warna muncul dengan salah satu dari lima warna tinta dan kamu mengklik tombol yang sesuai dengan tintanya. Mode Congruent hanya menampilkan kata dan tinta yang sesuai, mode Incongruent hanya yang tidak sesuai, dan mode Mixed mengacak keduanya sehingga kamu tidak bisa bersandar pada satu strategi. Bagian atas layar melaporkan waktu rata-ratamu untuk tiap jenis dan interferensinya, yaitu persentase percobaan tak kongruen lebih lambat dibanding yang kongruen. Hanya jawaban benar yang dihitung dalam rata-rata; klik yang salah dicatat tetapi dikecualikan, praktik standar dalam penelitian waktu reaksi.',
        'Simulasi berbeda dari tes asli Stroop dalam beberapa hal yang memengaruhi angkanya. Peserta Stroop menyebutkan warna dengan suara, yang paling langsung menyentuh konflik membaca; mengklik tombol berlabel menambahkan pencarian tombol yang tepat dan membuat kata sedikit lebih mudah diabaikan. Waktu reaksi juga berbeda antarorang dan membaik dengan latihan, jadi bandingkan kondisi dalam sesi yang sama, bukan dengan angka tetap. Rata-rata dari tiga percobaan saja sangat kasar; sepuluh sampai dua puluh percobaan per kondisi memberi perkiraan yang jauh lebih mantap.',
      ],
    },
    figure: {
      caption: {
        en: 'Congruent card: word and ink agree, so reading and colour naming give the same answer and the response is fast. Incongruent card: the automatically read word competes with the ink colour, and resolving the conflict adds time to the reaction.',
        id: 'Kartu kongruen: kata dan tinta sesuai, sehingga membaca dan menyebut warna memberi jawaban yang sama dan responsnya cepat. Kartu tak kongruen: kata yang terbaca otomatis bersaing dengan warna tinta, dan menyelesaikan konflik itu menambah waktu reaksi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Congruent and incongruent Stroop cards with reaction-time bars', 'Kartu Stroop kongruen dan tak kongruen dengan batang waktu reaksi')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.c{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.w{font:bold 22px system-ui,sans-serif}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.5}</style>
  <text x="14" y="18" font-weight="bold">${L('Congruent', 'Kongruen')}</text>
  <rect x="14" y="26" width="150" height="56" rx="6" class="c"/>
  <text x="89" y="62" class="w" fill="#10b981" text-anchor="middle">${L('GREEN', 'HIJAU')}</text>
  <text x="14" y="98" class="s">${L('read: "green"  ·  ink: green', 'baca: "hijau"  ·  tinta: hijau')}</text>
  <text x="14" y="110" class="s" fill="#10b981">${L('same answer → fast', 'jawaban sama → cepat')}</text>
  <text x="196" y="18" font-weight="bold">${L('Incongruent', 'Tak kongruen')}</text>
  <rect x="196" y="26" width="150" height="56" rx="6" class="c"/>
  <text x="271" y="62" class="w" fill="#3b82f6" text-anchor="middle">${L('RED', 'MERAH')}</text>
  <text x="196" y="98" class="s">${L('read: "red"  ·  ink: blue', 'baca: "merah"  ·  tinta: biru')}</text>
  <text x="196" y="110" class="s" fill="#ef4444">${L('conflict → slow, more errors', 'konflik → lambat, lebih banyak salah')}</text>
  <line x1="60" y1="140" x2="60" y2="212" class="ax"/>
  <line x1="60" y1="212" x2="340" y2="212" class="ax"/>
  <rect x="60" y="146" width="160" height="22" fill="#10b981" opacity=".8"/>
  <text x="226" y="162" class="s">${L('congruent ≈ 650 ms', 'kongruen ≈ 650 ms')}</text>
  <rect x="60" y="178" width="160" height="22" fill="#3b82f6" opacity=".8"/>
  <rect x="220" y="178" width="70" height="22" fill="#ef4444" opacity=".8"/>
  <text x="296" y="194" class="s">${L('≈ 950 ms', '≈ 950 ms')}</text>
  <text x="222" y="174" class="s" fill="#ef4444">${L('interference', 'interferensi')}</text>
  <text x="14" y="162" class="s">${L('match', 'sesuai')}</text>
  <text x="14" y="194" class="s">${L('clash', 'beda')}</text>
  <text x="60" y="226" class="s">0</text>
  <text x="140" y="226" class="s">500 ms</text>
  <text x="300" y="226" class="s">1000 ms</text>
  <text x="130" y="238" class="s" opacity=".8">${L('time to click the ink colour (example values)', 'waktu mengklik warna tinta (nilai contoh)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Naming the ink colour of a colour word is slower and more error-prone when the word names a different colour.',
        'Reading is automatic: skilled readers cannot switch it off, so the word is processed even when it is irrelevant.',
        'Naming a colour is a controlled process that needs attention, and it loses the race against automatic reading.',
        'The interference is the extra time, or the percentage slowdown, on incongruent compared with congruent trials.',
        'Practice shrinks the effect but does not remove it, and children who cannot yet read fluently show little Stroop interference.',
      ],
      id: [
        'Menyebutkan warna tinta sebuah kata warna lebih lambat dan lebih sering salah ketika kata itu menamai warna yang berbeda.',
        'Membaca bersifat otomatis: pembaca mahir tidak bisa mematikannya, sehingga kata tetap diproses meski tidak relevan.',
        'Menyebutkan warna adalah proses terkendali yang memerlukan perhatian, dan kalah bersaing dengan membaca yang otomatis.',
        'Interferensi adalah waktu tambahan, atau persentase perlambatan, pada percobaan tak kongruen dibandingkan yang kongruen.',
        'Latihan mengecilkan efek ini tetapi tidak menghilangkannya, dan anak yang belum lancar membaca hanya menunjukkan sedikit interferensi Stroop.',
      ],
    },
    vocabulary: {
      en: [
        ['Stroop effect', 'The delay and extra errors in naming an ink colour when the printed word names a different colour.'],
        ['Congruent trial', 'Word and ink colour agree, for example GREEN in green ink.'],
        ['Incongruent trial', 'Word and ink colour disagree, for example RED in blue ink.'],
        ['Automatic processing', 'Fast, effortless mental processing that occurs without intention, such as reading a familiar word.'],
        ['Controlled processing', 'Slower processing that requires attention and effort, such as naming a colour.'],
        ['Selective attention', 'Focusing on one feature of a stimulus (the ink) while trying to ignore another (the word).'],
        ['Interference', 'The slowing of one task by a competing process; here measured as incongruent minus congruent reaction time.'],
      ],
      id: [
        ['Efek Stroop', 'Keterlambatan dan tambahan kesalahan saat menyebutkan warna tinta ketika kata yang tercetak menamai warna yang berbeda.'],
        ['Percobaan kongruen', 'Kata dan warna tinta sesuai, misalnya HIJAU dengan tinta hijau.'],
        ['Percobaan tak kongruen', 'Kata dan warna tinta tidak sesuai, misalnya MERAH dengan tinta biru.'],
        ['Pemrosesan otomatis', 'Pemrosesan mental yang cepat dan tanpa usaha yang terjadi tanpa disengaja, seperti membaca kata yang dikenal.'],
        ['Pemrosesan terkendali', 'Pemrosesan yang lebih lambat dan memerlukan perhatian serta usaha, seperti menyebutkan warna.'],
        ['Perhatian selektif', 'Memusatkan perhatian pada satu ciri stimulus (tinta) sambil berusaha mengabaikan ciri lain (kata).'],
        ['Interferensi', 'Melambatnya satu tugas oleh proses yang bersaing; di sini diukur sebagai waktu reaksi tak kongruen dikurangi kongruen.'],
      ],
    },
    misconceptions: {
      en: [
        ['The Stroop effect happens because the task is confusing or the instructions are unclear.', 'People understand the task perfectly and still cannot avoid the slowdown. The interference comes from reading being automatic, not from misunderstanding.'],
        ['If you concentrate hard enough you can switch off reading and eliminate the effect.', 'Effort and practice reduce the interference but cannot remove it in a fluent reader. The word is processed before you have any chance to stop it.'],
        ['The effect is the same in both directions: colours also slow down reading the words.', 'Stroop found the reverse task barely suffered. Reading is faster and more automatic than colour naming, so the word interferes with the colour far more than the colour interferes with the word.'],
        ['A big Stroop interference means someone is less intelligent.', 'Interference reflects reading fluency and attention control, not intelligence. Fluent readers often show a larger effect precisely because their reading is so automatic.'],
      ],
      id: [
        ['Efek Stroop terjadi karena tugasnya membingungkan atau instruksinya tidak jelas.', 'Orang memahami tugasnya dengan sempurna dan tetap tidak bisa menghindari perlambatan. Interferensi berasal dari membaca yang otomatis, bukan dari salah paham.'],
        ['Kalau cukup berkonsentrasi, kita bisa mematikan kebiasaan membaca dan menghilangkan efeknya.', 'Usaha dan latihan mengurangi interferensi tetapi tidak bisa menghilangkannya pada pembaca yang lancar. Kata sudah diproses sebelum kita punya kesempatan menghentikannya.'],
        ['Efeknya sama di kedua arah: warna juga memperlambat membaca kata.', 'Stroop menemukan tugas kebalikannya hampir tidak terganggu. Membaca lebih cepat dan lebih otomatis daripada menyebut warna, sehingga kata mengganggu warna jauh lebih besar daripada warna mengganggu kata.'],
        ['Interferensi Stroop yang besar berarti seseorang kurang cerdas.', 'Interferensi mencerminkan kelancaran membaca dan kendali perhatian, bukan kecerdasan. Pembaca lancar sering menunjukkan efek lebih besar justru karena membacanya begitu otomatis.'],
      ],
    },
    realWorld: {
      en: [
        'Neuropsychologists use Stroop-type tests to assess attention and self-control after brain injury and in conditions such as ADHD.',
        'Warning signs and cockpit displays are designed so that colour, shape and text all agree, because a red sign reading "GO" would be processed more slowly and misread more often.',
        'Learning a second language: beginners show little Stroop interference from words in the new language, and the effect grows as reading in that language becomes automatic.',
        'Any skill practised to automaticity shows the same pattern: experienced drivers find it hard to drive on the other side of the road, because the old habit runs before they can override it.',
      ],
      id: [
        'Neuropsikolog memakai tes bertipe Stroop untuk menilai perhatian dan kendali diri setelah cedera otak dan pada kondisi seperti ADHD.',
        'Rambu peringatan dan tampilan kokpit dirancang agar warna, bentuk, dan teksnya selaras, karena rambu merah bertuliskan "JALAN" akan diproses lebih lambat dan lebih sering salah dibaca.',
        'Belajar bahasa kedua: pemula hanya menunjukkan sedikit interferensi Stroop dari kata-kata dalam bahasa baru, dan efeknya tumbuh seiring membaca dalam bahasa itu menjadi otomatis.',
        'Keterampilan apa pun yang dilatih sampai otomatis menunjukkan pola yang sama: pengemudi berpengalaman kesulitan mengemudi di sisi jalan yang berlawanan, karena kebiasaan lama berjalan sebelum bisa ditekan.',
      ],
    },
    questions: {
      en: [
        { q: 'A student averages 620 ms on congruent trials and 870 ms on incongruent trials. What is the interference in milliseconds and as a percentage, as the sim reports it?', a: 'The interference is 870 − 620 = 250 ms. As a percentage of the congruent time it is 250 / 620 × 100 ≈ 40%, so the sim would display "Stroop interference: +40%", comfortably inside the typical range.' },
        { q: 'Why does the Mixed mode give a fairer comparison between congruent and incongruent trials than running the two modes one after the other?', a: 'In Mixed mode the two trial types are interleaved within the same block, so practice, fatigue and warming up affect both equally. Running Congruent first and Incongruent second would confuse the Stroop effect with any improvement or tiredness that happened between the blocks.' },
        { q: 'A child who is just learning to read shows almost no Stroop interference, while her older brother shows a large one. Explain using the idea of automatic processing.', a: 'The Stroop effect depends on reading being automatic. For the child, reading is still slow and effortful, so the word does not jump out and the ink colour wins easily. For her brother, years of practice have made reading automatic, so the word is processed whether he wants it or not and competes with naming the colour.' },
      ],
      id: [
        { q: 'Seorang siswa rata-rata 620 ms pada percobaan kongruen dan 870 ms pada percobaan tak kongruen. Berapa interferensinya dalam milidetik dan dalam persen, seperti yang dilaporkan simulasi?', a: 'Interferensinya 870 − 620 = 250 ms. Sebagai persentase dari waktu kongruen, 250 / 620 × 100 ≈ 40%, sehingga simulasi akan menampilkan "Stroop interference: +40%", masih dalam rentang tipikal.' },
        { q: 'Mengapa mode Mixed memberi perbandingan yang lebih adil antara percobaan kongruen dan tak kongruen dibanding menjalankan kedua mode berturut-turut?', a: 'Pada mode Mixed kedua jenis percobaan diselang-seling dalam blok yang sama, sehingga latihan, kelelahan, dan pemanasan memengaruhi keduanya sama rata. Menjalankan Congruent dulu lalu Incongruent akan mencampuradukkan efek Stroop dengan perbaikan atau kelelahan yang terjadi di antara kedua blok.' },
        { q: 'Seorang anak yang baru belajar membaca hampir tidak menunjukkan interferensi Stroop, sementara kakak laki-lakinya menunjukkan interferensi yang besar. Jelaskan dengan gagasan pemrosesan otomatis.', a: 'Efek Stroop bergantung pada membaca yang sudah otomatis. Bagi si anak, membaca masih lambat dan butuh usaha, sehingga kata tidak melompat keluar dan warna tinta menang dengan mudah. Bagi kakaknya, latihan bertahun-tahun telah membuat membaca otomatis, sehingga kata diproses mau tidak mau dan bersaing dengan menyebutkan warna.' },
      ],
    },
  },
};
