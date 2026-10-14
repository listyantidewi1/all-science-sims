// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply T_chip = P · R_θ + T_ambient (steady state).',
      'Connect thermal resistance to fin area and airflow.',
      'See thermal capacitance: chips warm up over seconds, not instantly.',
    ],
    id: [
      'Menerapkan T_chip = P · R_θ + T_lingkungan (steady-state).',
      'Menghubungkan resistansi termal dengan luas sirip dan aliran udara.',
      'Melihat kapasitansi termal: chip menghangat dalam detik, tidak seketika.',
    ],
  },
  tryThis: {
    en: [
      'P = 65 W (a CPU), R_θ = 0.5 K/W, ambient 25 °C → 57 °C.',
      'Same chip, R_θ = 1.5 K/W (cheap heatsink) → 122 °C, throttle / damage.',
      'Crank ambient to 40 °C — every R_θ now produces a higher floor.',
    ],
    id: [
      'P = 65 W (CPU), R_θ = 0,5 K/W, lingkungan 25 °C → 57 °C.',
      'Chip sama, R_θ = 1,5 K/W (heatsink murah) → 122 °C, throttle/rusak.',
      'Naikkan lingkungan ke 40 °C — tiap R_θ kini menghasilkan dasar lebih tinggi.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Every watt of electrical power a chip consumes ends up as heat in a few square centimetres of silicon. Unless that heat is carried away as fast as it is produced, the chip\'s temperature keeps climbing. Heat flows from hot to cold, and how much flows for a given temperature difference is set by the thermal resistance R_θ of the path, in kelvin per watt: heat flow Q = (T_chip − T_ambient) / R_θ. This is exactly Ohm\'s law with temperature difference in place of voltage and heat flow in place of current. A heat sink lowers R_θ by spreading the heat over a large finned surface where moving air can pick it up; the convective part of the resistance is roughly 1 / (h · A), so more fin area A and a stronger airflow (larger heat-transfer coefficient h) both help. The sim draws more fins as you lower R_θ to hint at this.',
        'In steady state the chip settles where heat out equals heat in: P = (T_ss − T_amb) / R_θ, so T_ss = T_amb + P · R_θ. The sim prints this prediction as T_ss, and the live temperature always creeps toward it. With the defaults, 65 W through 0.5 K/W above a 25 °C room gives 57.5 °C. Switch to the Stock cooler preset (1.5 K/W) and the same chip would settle at 122.5 °C, well beyond the 90 to 105 °C limit at which real processors throttle or fail. The ambient slider shows that the room temperature is a floor you can never get below: everything shifts up degree for degree with it, which is why data centres spend so much on cold air.',
        'Temperature does not jump to T_ss at once because the chip and sink store heat. Their thermal capacitance C (joules per kelvin) plays the role of an electrical capacitor, giving the equation C · dT/dt = P − (T − T_amb) / R_θ. The solution is an exponential approach, T(t) = T_amb + P · R_θ · (1 − e^(−t/τ)), with time constant τ = R_θ · C. For the defaults τ = 0.5 × 30 = 15 s: after one τ the chip has covered 63% of the way to T_ss, after 3τ about 95%. A bigger heat sink has more metal, so a larger C and a slower warm-up, but it also lowers R_θ, so the two effects on τ partly offset. The sim runs its clock about four times faster than real time so the curves fill the 60-second chart quickly.',
        'The model lumps the whole chip-plus-sink into one temperature and one resistance. Real designs chain several resistances (silicon to package, package to sink through a thermal paste layer, sink to air), the sink is cooler at the fin tips than at the base, natural-convection R_θ falls somewhat as the sink gets hotter, radiation adds a little cooling, and a real CPU\'s power depends on its workload and on its own temperature through throttling. The single-node thermal RC model is nevertheless the first thing every thermal engineer calculates, and it is usually within 10 to 20% of measurement.',
      ],
      id: [
        'Setiap watt daya listrik yang dipakai sebuah chip berakhir sebagai panas di beberapa sentimeter persegi silikon. Jika panas itu tidak dibuang secepat dihasilkan, suhu chip terus naik. Panas mengalir dari yang panas ke yang dingin, dan banyaknya aliran untuk suatu beda suhu ditentukan oleh resistansi termal R_θ jalurnya, dalam kelvin per watt: aliran panas Q = (T_chip − T_lingkungan) / R_θ. Ini persis hukum Ohm dengan beda suhu menggantikan tegangan dan aliran panas menggantikan arus. Heat sink menurunkan R_θ dengan menyebarkan panas ke permukaan bersirip yang luas tempat udara yang bergerak bisa mengambilnya; bagian konvektif resistansinya kira-kira 1 / (h · A), sehingga luas sirip A yang lebih besar dan aliran udara yang lebih kuat (koefisien perpindahan panas h yang lebih besar) sama-sama membantu. Simulasi menggambar lebih banyak sirip saat R_θ kamu turunkan sebagai isyarat akan hal ini.',
        'Pada keadaan tunak, chip menetap di suhu ketika panas keluar sama dengan panas masuk: P = (T_ss − T_amb) / R_θ, sehingga T_ss = T_amb + P · R_θ. Simulasi menampilkan prediksi ini sebagai T_ss, dan suhu langsungnya selalu merayap menuju nilai itu. Dengan pengaturan awal, 65 W melalui 0,5 K/W di atas ruangan 25 °C menghasilkan 57,5 °C. Beralih ke preset Stock cooler (1,5 K/W) dan chip yang sama akan menetap di 122,5 °C, jauh melampaui batas 90 sampai 105 °C ketika prosesor sungguhan menurunkan kecepatannya (throttle) atau rusak. Slider suhu lingkungan menunjukkan bahwa suhu ruangan adalah dasar yang tidak pernah bisa kamu lewati ke bawah: semuanya bergeser naik derajat demi derajat mengikutinya, dan itulah sebabnya pusat data menghabiskan banyak biaya untuk udara dingin.',
        'Suhu tidak langsung melompat ke T_ss karena chip dan heat sink menyimpan panas. Kapasitansi termalnya C (joule per kelvin) berperan seperti kapasitor listrik, memberi persamaan C · dT/dt = P − (T − T_amb) / R_θ. Penyelesaiannya adalah pendekatan eksponensial, T(t) = T_amb + P · R_θ · (1 − e^(−t/τ)), dengan konstanta waktu τ = R_θ · C. Untuk pengaturan awal τ = 0,5 × 30 = 15 s: setelah satu τ chip sudah menempuh 63% jalan menuju T_ss, setelah 3τ sekitar 95%. Heat sink yang lebih besar punya lebih banyak logam, sehingga C lebih besar dan pemanasannya lebih lambat, tetapi R_θ-nya juga lebih rendah, sehingga kedua pengaruhnya pada τ sebagian saling mengimbangi. Simulasi menjalankan jamnya sekitar empat kali lebih cepat dari waktu nyata agar kurvanya cepat mengisi grafik 60 sekon.',
        'Model ini menggabungkan seluruh chip dan heat sink menjadi satu suhu dan satu resistansi. Rancangan sungguhan merangkai beberapa resistansi (silikon ke kemasan, kemasan ke heat sink melalui lapisan pasta termal, heat sink ke udara), heat sink lebih dingin di ujung sirip daripada di dasarnya, R_θ konveksi alami sedikit turun saat heat sink makin panas, radiasi menambah sedikit pendinginan, dan daya CPU sungguhan bergantung pada beban kerja dan pada suhunya sendiri melalui throttling. Meski demikian, model RC termal satu simpul ini adalah hal pertama yang dihitung setiap insinyur termal, dan biasanya meleset hanya 10 sampai 20% dari pengukuran.',
      ],
    },
    figure: {
      caption: {
        en: 'Heat produced in the chip flows through the heat sink to the air. The same system as a thermal circuit: power P is a current source, R_θ a resistor to the ambient "ground", and the thermal capacitance C a capacitor that sets the warm-up time τ = R_θ · C.',
        id: 'Panas yang dihasilkan chip mengalir melalui heat sink ke udara. Sistem yang sama sebagai rangkaian termal: daya P adalah sumber arus, R_θ resistor ke "ground" suhu lingkungan, dan kapasitansi termal C kapasitor yang menentukan waktu pemanasan τ = R_θ · C.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Finned heat sink on a chip, and its thermal circuit', 'Heat sink bersirip pada chip, dan rangkaian termalnya')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.t{text-anchor:middle}.w{fill:none;stroke:currentColor;stroke-width:1.6}</style>
  <rect x="60" y="150" width="90" height="22" rx="3" fill="#ef4444"/>
  <text x="105" y="165" class="t" fill="#ffffff" font-weight="700">${L('chip, P watts', 'chip, P watt')}</text>
  <rect x="40" y="134" width="130" height="16" fill="currentColor" opacity=".35"/>
  <path d="M48 134 V60 M68 134 V60 M88 134 V60 M108 134 V60 M128 134 V60 M148 134 V60 M162 134 V60" stroke="currentColor" stroke-width="7" opacity=".35"/>
  <text x="105" y="52" class="t">${L('fins: large area A in moving air', 'sirip: luas A besar dalam udara bergerak')}</text>
  <path d="M78 128 V96 M105 128 V96 M132 128 V96" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#a)"/>
  <path d="M8 90 H30 M8 110 H30" stroke="#3b82f6" stroke-width="2" marker-end="url(#a)"/>
  <path d="M176 90 H198 M176 110 H198" stroke="#3b82f6" stroke-width="2" marker-end="url(#a)"/>
  <text x="18" y="82" class="t" fill="#3b82f6">${L('air', 'udara')}</text>
  <rect x="40" y="172" width="130" height="8" fill="currentColor" opacity=".2"/>
  <text x="105" y="196" class="t">${L('heat flow Q = (T_chip − T_amb) / R_θ', 'aliran panas Q = (T_chip − T_amb) / R_θ')}</text>
  <text x="105" y="212" class="t">${L('steady: T_chip = T_amb + P · R_θ', 'tunak: T_chip = T_amb + P · R_θ')}</text>
  <circle cx="246" cy="130" r="14" class="w"/>
  <path d="M246 140 V120 M242 124 L246 120 L250 124" class="w"/>
  <text x="246" y="162" class="t">P</text>
  <path d="M246 116 V70 H330 V88 M246 144 V190 H330 V172 M288 70 V190" class="w"/>
  <path d="M288 88 l6 4 l-12 8 l12 8 l-12 8 l12 8 l-12 8 l6 4" class="w"/>
  <text x="302" y="134">R_θ</text>
  <path d="M322 88 H338 M322 96 H338" stroke="#8b5cf6" stroke-width="3"/>
  <path d="M330 96 V172" class="w"/>
  <text x="344" y="96">C</text>
  <path d="M236 190 H256 M240 196 H252 M244 202 H248" class="w"/>
  <text x="246" y="216" class="t">T_amb</text>
  <circle cx="288" cy="70" r="3" fill="#ef4444"/>
  <text x="288" y="60" class="t" fill="#ef4444">T_chip</text>
  <text x="288" y="232" class="t">τ = R_θ · C</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Heat flow through a path equals the temperature difference divided by its thermal resistance: Q = ΔT / R_θ, the thermal version of Ohm\'s law.',
        'In steady state the chip temperature is T_amb + P · R_θ: it depends on power, cooler quality and room temperature, and nothing else.',
        'A heat sink lowers R_θ by giving the heat a large finned area and moving air; fans and liquid cooling push R_θ lower still.',
        'Thermal capacitance makes the temperature approach its final value exponentially with time constant τ = R_θ · C.',
        'The sim is a single-node RC model: one temperature, one resistance, one capacitance, and no dependence of power on temperature.',
      ],
      id: [
        'Aliran panas melalui suatu jalur sama dengan beda suhu dibagi resistansi termalnya: Q = ΔT / R_θ, versi termal dari hukum Ohm.',
        'Pada keadaan tunak suhu chip adalah T_amb + P · R_θ: bergantung pada daya, mutu pendingin, dan suhu ruangan, tidak pada yang lain.',
        'Heat sink menurunkan R_θ dengan memberi panas luas sirip yang besar dan udara yang bergerak; kipas dan pendingin cair menekan R_θ lebih rendah lagi.',
        'Kapasitansi termal membuat suhu mendekati nilai akhirnya secara eksponensial dengan konstanta waktu τ = R_θ · C.',
        'Simulasi ini adalah model RC satu simpul: satu suhu, satu resistansi, satu kapasitansi, dan daya yang tidak bergantung pada suhu.',
      ],
    },
    vocabulary: {
      en: [
        ['Thermal resistance (R_θ)', 'The temperature rise per watt of heat flowing through a path, in K/W. Lower is better for cooling.'],
        ['Thermal capacitance (C)', 'The heat energy needed to raise an object\'s temperature by one kelvin, in J/K; mass times specific heat capacity.'],
        ['Steady state', 'The condition in which heat out equals heat in, so the temperature no longer changes.'],
        ['Time constant (τ)', 'R_θ · C: the time for the temperature to cover 63% of the gap to its final value.'],
        ['Convection', 'Heat carried away by a moving fluid such as air; forced convection (a fan) is much more effective than natural convection.'],
        ['Heat-transfer coefficient (h)', 'How much heat a surface passes to the fluid per square metre per kelvin; convective resistance is about 1 / (h · A).'],
        ['Thermal interface material', 'The paste or pad between chip and heat sink that fills microscopic gaps; a poor joint adds significant resistance.'],
        ['Throttling', 'A processor deliberately slowing down to reduce its power when it approaches its maximum safe temperature.'],
      ],
      id: [
        ['Resistansi termal (R_θ)', 'Kenaikan suhu per watt panas yang mengalir melalui suatu jalur, dalam K/W. Makin rendah makin baik untuk pendinginan.'],
        ['Kapasitansi termal (C)', 'Energi panas yang dibutuhkan untuk menaikkan suhu suatu benda sebesar satu kelvin, dalam J/K; massa dikali kalor jenis.'],
        ['Keadaan tunak (steady state)', 'Keadaan ketika panas keluar sama dengan panas masuk, sehingga suhu tidak lagi berubah.'],
        ['Konstanta waktu (τ)', 'R_θ · C: waktu yang dibutuhkan suhu untuk menempuh 63% selisih menuju nilai akhirnya.'],
        ['Konveksi', 'Panas yang dibawa pergi oleh fluida yang bergerak seperti udara; konveksi paksa (kipas) jauh lebih efektif daripada konveksi alami.'],
        ['Koefisien perpindahan panas (h)', 'Seberapa banyak panas yang diteruskan suatu permukaan ke fluida per meter persegi per kelvin; resistansi konvektif kira-kira 1 / (h · A).'],
        ['Material antarmuka termal', 'Pasta atau bantalan antara chip dan heat sink yang mengisi celah mikroskopis; sambungan yang buruk menambah resistansi yang berarti.'],
        ['Throttling', 'Prosesor yang sengaja memperlambat diri untuk mengurangi dayanya saat mendekati suhu aman maksimumnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['A heat sink makes the chip colder than the room.', 'Nothing passive can. Heat only flows from hot to cold, so the chip must be hotter than the air for any heat to leave. The best a heat sink can do is keep the rise above ambient small.'],
        ['A bigger heat sink cools the chip faster in time.', 'It lowers the final temperature, but its extra metal also adds thermal capacitance, so it may actually take longer to settle. Final temperature is set by R_θ; warm-up time is set by R_θ · C.'],
        ['The chip reaches its final temperature as soon as it is switched on.', 'It takes several time constants. With τ = 15 s in the default sim, the chip needs about 45 s to get within 5% of T_ss. Short bursts of work can end before the chip gets hot, which is why laptops tolerate brief spikes.'],
        ['A metal with higher conductivity always means a better cooler.', 'Conductivity governs only the resistance inside the metal, which is usually small. The dominant resistance is sink-to-air, set by fin area and airflow, which is why a large aluminium cooler with a fan beats a small copper block without one.'],
      ],
      id: [
        ['Heat sink membuat chip lebih dingin daripada ruangan.', 'Tidak ada komponen pasif yang bisa. Panas hanya mengalir dari yang panas ke yang dingin, sehingga chip harus lebih panas daripada udara agar ada panas yang keluar. Yang terbaik dari heat sink adalah menjaga kenaikan di atas suhu lingkungan tetap kecil.'],
        ['Heat sink yang lebih besar mendinginkan chip lebih cepat dalam waktu.', 'Ia menurunkan suhu akhir, tetapi logam tambahannya juga menambah kapasitansi termal, sehingga mungkin justru lebih lama menetap. Suhu akhir ditentukan R_θ; waktu pemanasan ditentukan R_θ · C.'],
        ['Chip mencapai suhu akhirnya segera setelah dinyalakan.', 'Dibutuhkan beberapa konstanta waktu. Dengan τ = 15 s pada pengaturan awal simulasi, chip butuh sekitar 45 s untuk berada dalam 5% dari T_ss. Pekerjaan singkat bisa selesai sebelum chip menjadi panas, itulah sebabnya laptop tahan terhadap lonjakan beban yang sebentar.'],
        ['Logam dengan konduktivitas lebih tinggi selalu berarti pendingin lebih baik.', 'Konduktivitas hanya menentukan resistansi di dalam logam, yang biasanya kecil. Resistansi yang dominan adalah dari heat sink ke udara, yang ditentukan luas sirip dan aliran udara; itulah sebabnya pendingin aluminium besar berkipas mengalahkan balok tembaga kecil tanpa kipas.'],
      ],
    },
    realWorld: {
      en: [
        'Desktop CPU coolers are rated in °C/W; a boxed stock cooler is around 0.3 to 0.5 K/W, a large tower cooler about 0.1 to 0.15 K/W, and the gap decides whether a 150 W processor runs at 70 °C or throttles.',
        'Phones have no fans, so they spread heat into the metal frame and glass back; when a game pushes the chip past its limit the phone throttles, which is why frame rates drop after a few minutes.',
        'Data centres keep inlet air at 18 to 27 °C because every degree of ambient adds a degree to every chip; cooling can be 30 to 40% of a data centre\'s electricity bill.',
        'Power transistors in audio amplifiers and solar inverters are bolted to finned heat sinks using thermal paste; the datasheet gives their junction-to-case R_θ so engineers can apply exactly the sim\'s formula.',
      ],
      id: [
        'Pendingin CPU desktop diberi peringkat dalam °C/W; pendingin bawaan sekitar 0,3 sampai 0,5 K/W, pendingin menara besar sekitar 0,1 sampai 0,15 K/W, dan selisihnya menentukan apakah prosesor 150 W berjalan di 70 °C atau melakukan throttling.',
        'Ponsel tidak punya kipas, sehingga menyebarkan panas ke rangka logam dan kaca belakangnya; ketika sebuah gim mendorong chip melewati batasnya, ponsel melakukan throttling, itulah sebabnya laju bingkai turun setelah beberapa menit.',
        'Pusat data menjaga udara masuk pada 18 sampai 27 °C karena setiap derajat suhu lingkungan menambah satu derajat pada setiap chip; pendinginan bisa mencapai 30 sampai 40% tagihan listrik pusat data.',
        'Transistor daya pada penguat audio dan inverter surya dibaut ke heat sink bersirip dengan pasta termal; lembar datanya memberi R_θ sambungan-ke-casing sehingga insinyur bisa menerapkan persis rumus simulasi ini.',
      ],
    },
    questions: {
      en: [
        { q: 'A 100 W chip must stay below 90 °C in a 30 °C room. What is the largest thermal resistance the cooler may have? Check it in the sim.', a: 'T_ss = T_amb + P · R_θ, so R_θ = (90 − 30) / 100 = 0.6 K/W at most. Set P = 100, ambient 30 and R_θ = 0.6 in the sim and T_ss reads 90 °C; any larger R_θ overshoots.' },
        { q: 'With the default settings (R_θ = 0.5 K/W, C = 30 J/K), how long after Reset does the chip reach about 95% of its final temperature rise? What happens to that time if you double C?', a: 'τ = R_θ · C = 15 s, and 95% of the rise takes about 3τ = 45 s of model time (the sim\'s clock runs about four times faster than real time, so it appears sooner). Doubling C to 60 J/K doubles τ to 30 s and the settling time to about 90 s, while the final temperature T_ss does not change at all.' },
        { q: 'You raise the ambient temperature from 25 °C to 40 °C without touching anything else. By how much does the chip\'s final temperature change, and why does R_θ not help here?', a: 'It rises by exactly 15 °C, from 57.5 °C to 72.5 °C with the defaults. The rise above ambient, P · R_θ, is unchanged; the cooler only controls that rise, not the floor it sits on. The only remedies are cooler air or less power.' },
      ],
      id: [
        { q: 'Sebuah chip 100 W harus tetap di bawah 90 °C di ruangan 30 °C. Berapa resistansi termal terbesar yang boleh dimiliki pendinginnya? Periksa di simulasi.', a: 'T_ss = T_amb + P · R_θ, sehingga R_θ = (90 − 30) / 100 = paling besar 0,6 K/W. Atur P = 100, suhu lingkungan 30, dan R_θ = 0,6 di simulasi, maka T_ss terbaca 90 °C; R_θ yang lebih besar akan melampauinya.' },
        { q: 'Dengan pengaturan awal (R_θ = 0,5 K/W, C = 30 J/K), berapa lama setelah Reset chip mencapai sekitar 95% kenaikan suhu akhirnya? Apa yang terjadi pada waktu itu jika C digandakan?', a: 'τ = R_θ · C = 15 s, dan 95% kenaikan membutuhkan sekitar 3τ = 45 s waktu model (jam simulasi berjalan sekitar empat kali lebih cepat dari waktu nyata, sehingga tampak lebih cepat). Menggandakan C menjadi 60 J/K menggandakan τ menjadi 30 s dan waktu menetap menjadi sekitar 90 s, sedangkan suhu akhir T_ss sama sekali tidak berubah.' },
        { q: 'Kamu menaikkan suhu lingkungan dari 25 °C ke 40 °C tanpa mengubah yang lain. Berapa perubahan suhu akhir chip, dan mengapa R_θ tidak membantu di sini?', a: 'Naik tepat 15 °C, dari 57,5 °C menjadi 72,5 °C dengan pengaturan awal. Kenaikan di atas suhu lingkungan, P · R_θ, tidak berubah; pendingin hanya mengendalikan kenaikan itu, bukan dasar tempatnya berpijak. Satu-satunya jalan keluar adalah udara yang lebih dingin atau daya yang lebih kecil.' },
      ],
    },
  },
};
