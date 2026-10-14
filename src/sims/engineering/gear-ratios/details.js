// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compute gear ratio = N_driven / N_drive (tooth counts).',
      'See that ω_out / ω_in = N_in / N_out and τ_out / τ_in = N_out / N_in (no friction).',
      'Power in = power out (energy conservation).',
    ],
    id: [
      'Menghitung rasio = N_digerakkan / N_penggerak.',
      'Melihat ω_keluar / ω_masuk = N_masuk / N_keluar dan τ_keluar / τ_masuk = N_keluar / N_masuk.',
      'Daya masuk = daya keluar (kekekalan energi).',
    ],
  },
  tryThis: {
    en: [
      'Big input gear, small output — speed multiplier, torque divided.',
      'Small input, big output — torque amplifier, slower output.',
      'All three the same — ratio 1:1.',
    ],
    id: [
      'Input besar, output kecil — pengali kecepatan, torsi dibagi.',
      'Input kecil, output besar — pengali torsi, output lebih lambat.',
      'Ketiganya sama — rasio 1:1.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A gear is a wheel with teeth around its edge. When two gears mesh, their teeth interlock, so every tooth that passes the meeting point on one gear pushes exactly one tooth past on the other. That simple fact fixes everything. If the input gear has 12 teeth and the output gear has 24, then one full turn of the input moves 12 teeth past the meeting point, which is only half a turn of the output. The output turns at half the speed, and in the opposite direction, because the teeth at the meeting point move the same way while the two centres sit on opposite sides of it. The rule is: output speed equals input speed times the input tooth count divided by the output tooth count.',
        'Slowing a gear down is not a loss, because what you give up in speed you gain in turning force, or torque. The teeth press on each other with the same force, but on the bigger gear that force acts further from the centre, so it produces a bigger twist. Ideally, with no friction, torque goes up by exactly the same factor that speed goes down, and the power (torque times rotational speed) coming out equals the power going in. You cannot get energy for free from gears; you can only trade speed for force or force for speed, the same bargain a lever or a ramp offers.',
        'The simulation shows three gears in a row. Sliders set the input speed in revolutions per minute (negative values spin it backwards), the tooth count of each gear from 8 to 60, and the input torque. The gears are drawn with sizes proportional to their tooth counts, as real meshing gears must be, since all their teeth have to be the same size. The readout gives the output speed and torque, the overall ratio, and power in and out. Notice that the middle gear cancels out of the ratio: it turns the same number of teeth it receives, so it only reverses direction and bridges the gap. A gear used like this is called an idler, and it is why the output here turns the same way as the input.',
        'The model is ideal. Real gear trains lose a few percent of their power at every mesh to friction between the teeth and in the bearings, so real output power is a little less than input power and the teeth warm up. Real gears also have to be designed with the right tooth shape to run smoothly, and very small gears with few teeth run roughly. None of that is shown here, which lets you see the clean speed-torque trade-off on its own.',
      ],
      id: [
        'Roda gigi adalah roda dengan gigi-gigi di sekeliling tepinya. Ketika dua roda gigi bersinggungan, gigi-giginya saling mengait, sehingga setiap gigi yang melewati titik pertemuan pada satu roda mendorong tepat satu gigi melewati titik itu pada roda lainnya. Fakta sederhana ini menentukan segalanya. Jika roda gigi masukan bergigi 12 dan roda gigi keluaran bergigi 24, satu putaran penuh roda masukan menggerakkan 12 gigi melewati titik pertemuan, yang hanya setengah putaran bagi roda keluaran. Roda keluaran berputar dengan setengah kecepatan, dan berlawanan arah, karena gigi-gigi di titik pertemuan bergerak searah sementara kedua pusat roda berada di sisi yang berlawanan. Aturannya: kecepatan keluaran sama dengan kecepatan masukan dikali jumlah gigi masukan dibagi jumlah gigi keluaran.',
        'Memperlambat roda gigi bukanlah kerugian, karena yang hilang dalam kecepatan diperoleh kembali sebagai gaya putar, atau torsi. Gigi-gigi saling menekan dengan gaya yang sama, tetapi pada roda yang lebih besar gaya itu bekerja lebih jauh dari pusat, sehingga menghasilkan puntiran yang lebih besar. Idealnya, tanpa gesekan, torsi naik dengan faktor yang tepat sama dengan turunnya kecepatan, dan daya (torsi dikali kecepatan putar) yang keluar sama dengan daya yang masuk. Kamu tidak bisa mendapat energi gratis dari roda gigi; kamu hanya bisa menukar kecepatan dengan gaya atau gaya dengan kecepatan, tawar-menawar yang sama seperti pada tuas atau bidang miring.',
        'Simulasi ini menampilkan tiga roda gigi berjajar. Slider mengatur kecepatan masukan dalam putaran per menit (nilai negatif memutarnya mundur), jumlah gigi tiap roda dari 8 sampai 60, dan torsi masukan. Roda gigi digambar dengan ukuran sebanding dengan jumlah giginya, seperti seharusnya pada roda gigi sungguhan yang bersinggungan, karena semua giginya harus berukuran sama. Tampilan angka memberi kecepatan dan torsi keluaran, rasio keseluruhan, serta daya masuk dan keluar. Perhatikan bahwa roda gigi tengah tidak muncul dalam rasio: ia meneruskan gigi sebanyak yang diterimanya, sehingga hanya membalik arah dan menjembatani jarak. Roda gigi yang dipakai seperti ini disebut roda gigi perantara (idler), dan inilah sebabnya keluaran di sini berputar searah dengan masukan.',
        'Modelnya ideal. Rangkaian roda gigi sungguhan kehilangan beberapa persen dayanya di tiap persinggungan karena gesekan antar gigi dan di bantalan, sehingga daya keluaran sebenarnya sedikit lebih kecil dari daya masukan dan gigi-giginya menghangat. Roda gigi sungguhan juga harus dirancang dengan bentuk gigi yang tepat agar berputar halus, dan roda gigi yang sangat kecil dengan sedikit gigi berputar kasar. Semua itu tidak ditampilkan di sini, sehingga kamu bisa melihat pertukaran kecepatan-torsi yang bersih dengan sendirinya.',
      ],
    },
    figure: {
      caption: {
        en: 'A 12-tooth gear driving a 24-tooth gear. Each tooth that passes the meeting point moves one tooth on the other gear, so the big gear turns half as fast, in the opposite direction, with twice the torque.',
        id: 'Roda gigi 12 gigi menggerakkan roda gigi 24 gigi. Setiap gigi yang melewati titik pertemuan menggerakkan satu gigi pada roda lainnya, sehingga roda besar berputar setengah kali lebih lambat, berlawanan arah, dengan torsi dua kali lipat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A small gear meshing with a large gear', 'Roda gigi kecil bersinggungan dengan roda gigi besar')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.t{text-anchor:middle}.s{font-size:10px}</style>
  <circle cx="100" cy="118" r="40" fill="none" stroke="#3b82f6" stroke-width="12" stroke-dasharray="10.5 10.4"/>
  <circle cx="100" cy="118" r="34" fill="#3b82f6" opacity=".25"/>
  <circle cx="100" cy="118" r="4" fill="currentColor"/>
  <text x="100" y="122" class="t" font-weight="700">12T</text>
  <circle cx="226" cy="118" r="80" fill="none" stroke="#10b981" stroke-width="12" stroke-dasharray="10.5 10.4"/>
  <circle cx="226" cy="118" r="74" fill="#10b981" opacity=".2"/>
  <circle cx="226" cy="118" r="4" fill="currentColor"/>
  <text x="226" y="122" class="t" font-weight="700">24T</text>
  <line x1="146" y1="100" x2="146" y2="136" class="m" stroke-dasharray="3 3"/>
  <text x="146" y="92" class="t s">${L('meeting point', 'titik pertemuan')}</text>
  <path d="M100 60 A58 58 0 0 1 150 90" fill="none" stroke="#3b82f6" stroke-width="2.2" marker-end="url(#a)"/>
  <text x="48" y="48" class="s" fill="#3b82f6">${L('input: 60 rpm', 'masukan: 60 rpm')}</text>
  <path d="M226 20 A98 98 0 0 0 150 50" fill="none" stroke="#10b981" stroke-width="2.2" marker-end="url(#a)"/>
  <text x="236" y="26" class="s" fill="#10b981">${L('output: 30 rpm, opposite way', 'keluaran: 30 rpm, arah berlawanan')}</text>
  <line x1="140" y1="118" x2="140" y2="156" stroke="#ef4444" stroke-width="2.2" marker-end="url(#a)"/>
  <text x="142" y="172" class="s" fill="#ef4444">${L('same tooth force F', 'gaya gigi F sama')}</text>
  <line x1="100" y1="118" x2="140" y2="118" stroke="#f59e0b" stroke-width="2"/>
  <text x="112" y="112" class="s" fill="#f59e0b">r</text>
  <line x1="226" y1="118" x2="146" y2="118" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
  <text x="190" y="112" class="s" fill="#f59e0b">2r</text>
  <text x="180" y="218" class="t s">${L('speed out = speed in × 12/24 = half;  torque out = F × 2r = double', 'kecepatan keluar = kecepatan masuk × 12/24 = setengah;  torsi keluar = F × 2r = dua kali')}</text>
  <text x="180" y="234" class="t s">${L('power = torque × speed stays the same (no friction)', 'daya = torsi × kecepatan tetap sama (tanpa gesekan)')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Meshing gears move the same number of teeth past the meeting point, so output speed equals input speed times the ratio of tooth counts, input over output.',
        'Each mesh reverses the direction of rotation; two meshes bring it back to the original direction.',
        'A gear that turns slower delivers more torque by the same factor; a gear that turns faster delivers less.',
        'With no friction, power out equals power in: gears trade speed for torque but never create energy.',
        'An idler gear in the middle changes direction and bridges distance but does not change the overall ratio.',
      ],
      id: [
        'Roda gigi yang bersinggungan menggerakkan jumlah gigi yang sama melewati titik pertemuan, sehingga kecepatan keluaran sama dengan kecepatan masukan dikali rasio jumlah gigi, masukan per keluaran.',
        'Setiap persinggungan membalik arah putaran; dua persinggungan mengembalikannya ke arah semula.',
        'Roda gigi yang berputar lebih lambat memberikan torsi lebih besar dengan faktor yang sama; roda gigi yang berputar lebih cepat memberikan torsi lebih kecil.',
        'Tanpa gesekan, daya keluar sama dengan daya masuk: roda gigi menukar kecepatan dengan torsi tetapi tidak pernah menciptakan energi.',
        'Roda gigi perantara di tengah mengubah arah dan menjembatani jarak tetapi tidak mengubah rasio keseluruhan.',
      ],
    },
    vocabulary: {
      en: [
        ['Gear', 'A toothed wheel that transmits rotation to another toothed wheel by interlocking teeth.'],
        ['Tooth count', 'The number of teeth around a gear. Meshing gears must have teeth of the same size, so a gear with twice the teeth has twice the diameter.'],
        ['Gear ratio', 'The comparison of turning speeds (or tooth counts) between two gears, for example 2:1 when the output turns once for every two turns of the input.'],
        ['Torque', 'Turning force: how hard something is being twisted about its axis, measured in newton-metres (N·m).'],
        ['rpm', 'Revolutions per minute, a unit of rotational speed.'],
        ['Idler gear', 'A gear placed between the input and output that reverses direction but leaves the overall ratio unchanged.'],
        ['Power', 'The rate of doing work. For rotation, power equals torque times rotational speed, measured in watts.'],
      ],
      id: [
        ['Roda gigi', 'Roda bergigi yang meneruskan putaran ke roda bergigi lain melalui gigi-gigi yang saling mengait.'],
        ['Jumlah gigi', 'Banyaknya gigi di sekeliling roda gigi. Roda gigi yang bersinggungan harus bergigi sama besar, sehingga roda dengan dua kali jumlah gigi berdiameter dua kali lipat.'],
        ['Rasio roda gigi', 'Perbandingan kecepatan putar (atau jumlah gigi) antara dua roda gigi, misalnya 2:1 ketika keluaran berputar sekali untuk setiap dua putaran masukan.'],
        ['Torsi', 'Gaya putar: seberapa kuat sesuatu dipuntir pada sumbunya, diukur dalam newton-meter (N·m).'],
        ['rpm', 'Putaran per menit, satuan kecepatan putar.'],
        ['Roda gigi perantara (idler)', 'Roda gigi yang ditempatkan di antara masukan dan keluaran yang membalik arah tetapi tidak mengubah rasio keseluruhan.'],
        ['Daya', 'Laju melakukan usaha. Untuk putaran, daya sama dengan torsi dikali kecepatan putar, diukur dalam watt.'],
      ],
    },
    misconceptions: {
      en: [
        ['A bigger gear is always "stronger" and better.', 'A bigger output gear gives more torque but less speed; a smaller one gives more speed but less torque. Neither is better; the right choice depends on whether the job needs force (climbing a hill) or speed (cruising on a flat road).'],
        ['Gears can multiply power.', 'They cannot. Power out can never exceed power in; in the ideal sim they are equal, and real gears lose a little to friction. Gears only change the mix of torque and speed that carries that power.'],
        ['The middle gear changes the overall ratio.', 'In a simple train it does not. Try changing the middle gear\'s tooth count in the sim: the output speed stays the same. The idler only reverses direction and fills the space between the other two gears.'],
        ['Gears meshing together turn in the same direction.', 'Two meshing gears always turn in opposite directions. The output of this three-gear train turns the same way as the input only because the direction is reversed twice.'],
      ],
      id: [
        ['Roda gigi yang lebih besar selalu "lebih kuat" dan lebih baik.', 'Roda gigi keluaran yang lebih besar memberi torsi lebih besar tetapi kecepatan lebih rendah; yang lebih kecil memberi kecepatan lebih tinggi tetapi torsi lebih kecil. Tidak ada yang lebih baik; pilihan yang tepat bergantung pada apakah pekerjaannya membutuhkan gaya (menanjak) atau kecepatan (melaju di jalan datar).'],
        ['Roda gigi bisa melipatgandakan daya.', 'Tidak bisa. Daya keluar tidak pernah melebihi daya masuk; dalam simulasi ideal keduanya sama, dan roda gigi sungguhan kehilangan sedikit karena gesekan. Roda gigi hanya mengubah perpaduan torsi dan kecepatan yang membawa daya itu.'],
        ['Roda gigi tengah mengubah rasio keseluruhan.', 'Pada rangkaian sederhana tidak. Coba ubah jumlah gigi roda tengah di simulasi: kecepatan keluaran tetap sama. Roda perantara hanya membalik arah dan mengisi jarak antara dua roda lainnya.'],
        ['Roda gigi yang bersinggungan berputar searah.', 'Dua roda gigi yang bersinggungan selalu berputar berlawanan arah. Keluaran rangkaian tiga roda gigi ini berputar searah dengan masukan hanya karena arahnya dibalik dua kali.'],
      ],
    },
    realWorld: {
      en: [
        'A bicycle uses a chain instead of meshing teeth, but the same tooth-count rule applies: a small rear sprocket gives speed on the flat, a large one gives the torque to climb hills.',
        'A car gearbox has several gear pairs to choose from, so the engine can stay in its best speed range whether the car is crawling or cruising.',
        'Mechanical clocks use trains of gears so that the minute hand turns exactly 12 times for each turn of the hour hand.',
        'Electric drills, wind turbines and kitchen mixers all contain gear trains that convert a fast motor or rotor into the slower, stronger turning the job needs, or the reverse.',
      ],
      id: [
        'Sepeda memakai rantai, bukan gigi yang bersinggungan, tetapi aturan jumlah gigi yang sama berlaku: gir belakang yang kecil memberi kecepatan di jalan datar, gir yang besar memberi torsi untuk menanjak.',
        'Girboks mobil memiliki beberapa pasang roda gigi untuk dipilih, sehingga mesin bisa tetap pada rentang kecepatan terbaiknya baik saat mobil merayap maupun melaju.',
        'Jam mekanis memakai rangkaian roda gigi sehingga jarum menit berputar tepat 12 kali untuk setiap putaran jarum jam.',
        'Bor listrik, turbin angin, dan mixer dapur semuanya berisi rangkaian roda gigi yang mengubah putaran motor atau rotor yang cepat menjadi putaran yang lebih lambat dan lebih kuat sesuai kebutuhan, atau sebaliknya.',
      ],
    },
    questions: {
      en: [
        { q: 'The input gear has 12 teeth, the output gear has 48 teeth, and the input turns at 60 rpm. How fast does the output turn, and what happens to the torque?', a: 'The output turns at 60 × 12/48 = 15 rpm, four times slower. Its torque is four times larger, because the same tooth force acts four times further from the centre. Power stays the same: a quarter of the speed times four times the torque.' },
        { q: 'With the sim at its default 12-24-18 teeth, change the middle gear to 60 teeth. Does the output speed change? Explain.', a: 'No, it stays at 40 rpm (60 × 12/18). The middle gear receives 12 teeth per input turn and passes exactly those 12 teeth on to the output gear, whatever its own size. It is an idler: it reverses direction and bridges the gap but drops out of the ratio.' },
        { q: 'Someone proposes a gear train that outputs more power than it takes in. Use the sim\'s power readout to argue why this is impossible.', a: 'In every setting the readout shows power out equal to power in: when speed goes up by some factor, torque goes down by exactly the same factor, so their product is unchanged. Gears only redistribute power between speed and torque. Real gears do worse, not better, because friction turns some of the power into heat.' },
      ],
      id: [
        { q: 'Roda gigi masukan bergigi 12, roda gigi keluaran bergigi 48, dan masukan berputar 60 rpm. Berapa kecepatan putar keluaran, dan apa yang terjadi pada torsinya?', a: 'Keluaran berputar 60 × 12/48 = 15 rpm, empat kali lebih lambat. Torsinya empat kali lebih besar, karena gaya gigi yang sama bekerja empat kali lebih jauh dari pusat. Dayanya tetap: seperempat kecepatan dikali empat kali torsi.' },
        { q: 'Dengan simulasi pada pengaturan awal 12-24-18 gigi, ubah roda gigi tengah menjadi 60 gigi. Apakah kecepatan keluaran berubah? Jelaskan.', a: 'Tidak, tetap 40 rpm (60 × 12/18). Roda tengah menerima 12 gigi per putaran masukan dan meneruskan tepat 12 gigi itu ke roda keluaran, berapa pun ukurannya sendiri. Ia adalah roda perantara: membalik arah dan menjembatani jarak tetapi tidak muncul dalam rasio.' },
        { q: 'Seseorang mengusulkan rangkaian roda gigi yang mengeluarkan daya lebih besar daripada yang diterimanya. Gunakan tampilan daya di simulasi untuk menjelaskan mengapa ini tidak mungkin.', a: 'Pada setiap pengaturan, tampilan menunjukkan daya keluar sama dengan daya masuk: ketika kecepatan naik dengan suatu faktor, torsi turun dengan faktor yang tepat sama, sehingga hasil kalinya tidak berubah. Roda gigi hanya membagi ulang daya antara kecepatan dan torsi. Roda gigi sungguhan justru lebih buruk, bukan lebih baik, karena gesekan mengubah sebagian daya menjadi panas.' },
      ],
    },
  },
};
