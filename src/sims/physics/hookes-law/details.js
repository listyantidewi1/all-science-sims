// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Verify F = kx empirically: each pull gives a proportional stretch.',
      'Read the spring constant k from the slope of the F-vs-x line.',
      'See the elastic limit: real springs are linear only up to a point.',
    ],
    id: [
      'Memverifikasi F = kx secara empiris: tiap tarikan memberi pemanjangan proporsional.',
      'Membaca konstanta pegas k dari kemiringan garis F-vs-x.',
      'Melihat batas elastis: pegas nyata bersifat linear hanya sampai titik tertentu.',
    ],
  },
  tryThis: {
    en: [
      'Add 1 kg to a soft spring (k = 20 N/m) — stretches ~49 cm.',
      'Add 1 kg to a stiff spring (k = 200 N/m) — stretches only ~5 cm.',
      'Drag past the elastic limit — the line bends.',
    ],
    id: [
      'Tambahkan 1 kg ke pegas lunak (k = 20 N/m) — meregang ~49 cm.',
      'Tambahkan 1 kg ke pegas kaku (k = 200 N/m) — meregang hanya ~5 cm.',
      'Geser melewati batas elastis — garis membengkok.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Hang a mass on a spring and the spring stretches until its upward pull balances the weight of the mass. Pull with twice the force and the spring stretches twice as far. This is Hooke\'s law: the stretch x is proportional to the applied force F, written F = kx. The constant k is the spring constant, measured in newtons per metre (N/m). It tells you how many newtons are needed for each metre of stretch, so a large k means a stiff spring and a small k means a soft one.',
        'In the simulation the force comes from the hanging mass: F = mg, with g = 9.8 m/s². Drag the mass down (or move the slider) to add weight, and the spring extends to the new equilibrium length while a ruler reads off x. Three springs are available, soft (k = 20 N/m), medium (k = 80 N/m) and stiff (k = 200 N/m). With 1 kg hanging, F = 9.8 N, so the soft spring stretches 9.8 ÷ 20 = 0.49 m while the stiff spring stretches only 9.8 ÷ 200 = 0.049 m.',
        'The graph on the right plots force against stretch for all three springs. Each is a straight line through the origin, and the slope of each line is its k: the stiff spring rises steeply, the soft spring gently. The white dot marks the current spring\'s force and stretch, so you can watch it travel along the line as you change the mass. Reading k from a slope, rather than from one measurement, is how a real experiment averages out small errors.',
        'Hooke\'s law holds only up to the elastic limit, marked by the dashed red line at 60 cm of stretch. Beyond it the simulation bends each line over to a gentler slope, about 0.3k, to remind you that the proportional rule has broken down; the exact shape past the limit is only a sketch, and the readout warns that the spring is yielding. A real spring stretched past its elastic limit stretches more for each extra newton and is permanently deformed: it does not return to its original length when unloaded. The sim also ignores the spring\'s own weight and shows only the final resting position, not the bouncing that happens when a mass is first released.',
      ],
      id: [
        'Gantungkan beban pada pegas, maka pegas memanjang sampai tarikannya ke atas mengimbangi berat beban. Tarik dengan gaya dua kali lipat, pegas memanjang dua kali lebih jauh. Inilah hukum Hooke: pemanjangan x sebanding dengan gaya F yang diberikan, ditulis F = kx. Tetapan k disebut konstanta pegas, dengan satuan newton per meter (N/m). Nilainya menyatakan berapa newton yang diperlukan untuk tiap meter pemanjangan, sehingga k besar berarti pegas kaku dan k kecil berarti pegas lunak.',
        'Dalam simulasi, gaya berasal dari beban yang digantung: F = mg, dengan g = 9,8 m/s². Seret beban ke bawah (atau geser slider) untuk menambah berat, lalu pegas memanjang ke posisi setimbang yang baru sementara penggaris menunjukkan x. Ada tiga pegas: lunak (k = 20 N/m), sedang (k = 80 N/m) dan kaku (k = 200 N/m). Dengan beban 1 kg, F = 9,8 N, sehingga pegas lunak memanjang 9,8 ÷ 20 = 0,49 m sedangkan pegas kaku hanya 9,8 ÷ 200 = 0,049 m.',
        'Grafik di sebelah kanan memplot gaya terhadap pemanjangan untuk ketiga pegas. Masing-masing berupa garis lurus melalui titik asal, dan kemiringan tiap garis adalah k-nya: garis pegas kaku naik curam, pegas lunak landai. Titik putih menandai gaya dan pemanjangan pegas yang sedang dipilih, jadi kamu bisa melihatnya bergerak sepanjang garis ketika massa diubah. Membaca k dari kemiringan garis, bukan dari satu pengukuran saja, adalah cara percobaan sungguhan meratakan kesalahan kecil.',
        'Hukum Hooke hanya berlaku sampai batas elastis, yang ditandai garis putus-putus merah pada pemanjangan 60 cm. Di luar itu simulasi membengkokkan tiap garis ke kemiringan yang lebih landai, sekitar 0,3k, untuk mengingatkan bahwa aturan sebanding sudah tidak berlaku; bentuk persis kurva setelah batas itu hanya sketsa, dan panel memberi peringatan bahwa pegas sedang luluh. Pegas sungguhan yang ditarik melewati batas elastisnya memanjang lebih banyak untuk tiap newton tambahan dan berubah bentuk secara permanen: ia tidak kembali ke panjang semula setelah beban dilepas. Simulasi juga mengabaikan berat pegas itu sendiri dan hanya menampilkan posisi diam akhir, bukan ayunan yang terjadi saat beban pertama kali dilepas.',
      ],
    },
    figure: {
      caption: {
        en: 'Force against stretch. Up to the elastic limit the points lie on a straight line through the origin whose slope is the spring constant k; a stiffer spring gives a steeper line. For the same weight, the soft spring stretches much further.',
        id: 'Gaya terhadap pemanjangan. Sampai batas elastis, titik-titiknya terletak pada garis lurus melalui titik asal dengan kemiringan sama dengan konstanta pegas k; pegas yang lebih kaku memberi garis lebih curam. Untuk berat yang sama, pegas lunak memanjang jauh lebih banyak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Force-extension graph with a hanging spring', 'Grafik gaya-pemanjangan dengan pegas tergantung')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:9.5px}.m{fill:none;stroke:currentColor;stroke-width:1.3}.g{fill:none;stroke:currentColor;stroke-width:1;opacity:.25}.l{fill:none;stroke-width:2.2}</style>
  <defs><marker id="ax" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="context-stroke"/></marker></defs>
  <rect x="14" y="22" width="60" height="6" fill="currentColor" opacity=".6"/>
  <path d="M44 28 L44 36 L34 42 L54 48 L34 54 L54 60 L34 66 L54 72 L34 78 L54 84 L34 90 L54 96 L34 102 L54 108 L44 114 L44 122" class="m" stroke="#10b981"/>
  <rect x="30" y="122" width="28" height="22" fill="#3b82f6"/>
  <text x="44" y="137" class="s" fill="#fff" text-anchor="middle">m</text>
  <path d="M44 144 L44 174" class="m" stroke="#ef4444" marker-end="url(#ax)"/>
  <text x="50" y="170" fill="#ef4444">F = mg</text>
  <path d="M66 28 L66 122" class="g" stroke-dasharray="3 3"/>
  <path d="M74 72 L74 122" class="m" stroke="#f59e0b"/>
  <text x="78" y="100" fill="#f59e0b">x</text>
  <text x="14" y="196" class="s">${L('spring pulls up with kx,', 'pegas menarik ke atas dengan kx,')}</text>
  <text x="14" y="208" class="s">${L('balancing the weight mg', 'mengimbangi berat mg')}</text>
  <path d="M130 200 L130 30" class="m" marker-end="url(#ax)"/>
  <path d="M130 200 L340 200" class="m" marker-end="url(#ax)"/>
  <text x="118" y="26">F (N)</text>
  <text x="300" y="218">x (m)</text>
  <path d="M130 165 L340 165 M130 130 L340 130 M130 95 L340 95 M130 60 L340 60" class="g"/>
  <path d="M180 200 L180 40 M230 200 L230 40 M280 200 L280 40" class="g"/>
  <path d="M130 200 L160 60" class="l" stroke="#f59e0b"/>
  <text x="140" y="52" fill="#f59e0b" class="s">${L('stiff: large k', 'kaku: k besar')}</text>
  <path d="M130 200 L220 60" class="l" stroke="#10b981"/>
  <text x="224" y="56" fill="#10b981" class="s">${L('medium', 'sedang')}</text>
  <path d="M130 200 L290 130" class="l" stroke="#3b82f6"/>
  <path d="M290 130 Q310 118 318 92" class="l" stroke="#3b82f6" stroke-dasharray="4 3"/>
  <text x="246" y="152" fill="#3b82f6" class="s">${L('soft: small k', 'lunak: k kecil')}</text>
  <path d="M290 205 L290 44" class="m" stroke="#ef4444" stroke-dasharray="4 3" opacity=".8"/>
  <text x="262" y="40" fill="#ef4444" class="s">${L('elastic limit', 'batas elastis')}</text>
  <path d="M130 165 L210 165 L210 200" class="g" stroke-dasharray="3 3"/>
  <circle cx="210" cy="165" r="4" fill="currentColor"/>
  <text x="214" y="180" class="s">${L('slope = F ÷ x = k', 'kemiringan = F ÷ x = k')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'For a spring within its elastic limit, stretch is proportional to force: F = kx.',
        'The spring constant k (in N/m) measures stiffness; it is the slope of the force-stretch line.',
        'Doubling the hanging mass doubles the weight and therefore doubles the stretch.',
        'The hanging mass stops moving where the spring\'s upward pull kx equals the weight mg.',
        'Past the elastic limit the straight-line rule fails and a real spring is permanently stretched.',
      ],
      id: [
        'Untuk pegas yang masih dalam batas elastisnya, pemanjangan sebanding dengan gaya: F = kx.',
        'Konstanta pegas k (dalam N/m) mengukur kekakuan; nilainya adalah kemiringan garis gaya-pemanjangan.',
        'Menggandakan massa beban menggandakan beratnya dan karena itu menggandakan pemanjangan.',
        'Beban berhenti bergerak ketika tarikan pegas ke atas kx sama dengan berat mg.',
        'Melewati batas elastis, aturan garis lurus tidak berlaku lagi dan pegas sungguhan memanjang secara permanen.',
      ],
    },
    vocabulary: {
      en: [
        ['Hooke\'s law', 'The rule that the extension of a spring is proportional to the force applied to it, F = kx, as long as the elastic limit is not exceeded.'],
        ['Spring constant (k)', 'The force needed to stretch a spring by one metre, in N/m. A larger k means a stiffer spring.'],
        ['Extension (x)', 'How much longer the spring is than its unstretched natural length.'],
        ['Weight', 'The force of gravity on a mass, W = mg; on Earth about 9.8 N for each kilogram.'],
        ['Elastic', 'Describes a material that returns to its original shape when the force is removed.'],
        ['Elastic limit', 'The largest extension from which a spring still returns to its original length; beyond it the spring is permanently deformed.'],
        ['Equilibrium', 'The position where the forces on the mass balance, so it hangs at rest.'],
      ],
      id: [
        ['Hukum Hooke', 'Aturan bahwa pertambahan panjang pegas sebanding dengan gaya yang diberikan, F = kx, selama batas elastis tidak dilampaui.'],
        ['Konstanta pegas (k)', 'Gaya yang diperlukan untuk memanjangkan pegas sebesar satu meter, dalam N/m. k yang lebih besar berarti pegas lebih kaku.'],
        ['Pertambahan panjang (x)', 'Selisih panjang pegas terhadap panjang alaminya saat tidak ditarik.'],
        ['Berat', 'Gaya gravitasi pada suatu massa, W = mg; di Bumi sekitar 9,8 N untuk tiap kilogram.'],
        ['Elastis', 'Sifat bahan yang kembali ke bentuk semula ketika gayanya dihilangkan.'],
        ['Batas elastis', 'Pertambahan panjang terbesar yang masih memungkinkan pegas kembali ke panjang semula; di luar itu pegas berubah bentuk secara permanen.'],
        ['Setimbang', 'Posisi ketika gaya-gaya pada beban saling mengimbangi, sehingga beban menggantung diam.'],
      ],
    },
    misconceptions: {
      en: [
        ['A longer or bigger spring always has a bigger spring constant.', 'Not necessarily. k depends on the wire thickness, the coil diameter, the material and the number of coils. For the same wire, a longer spring is actually softer, because each coil shares the stretch.'],
        ['The spring constant changes when you hang a heavier mass.', 'Within the elastic limit k is a property of the spring alone. A heavier mass gives a bigger stretch, but F ÷ x stays the same. That constant ratio is exactly what the lab table checks.'],
        ['Any spring will go back to its original length if you wait long enough.', 'Only if it stayed within its elastic limit. Stretched beyond it, the metal has been permanently rearranged and the spring stays longer than it was.'],
        ['Mass and weight are the same thing.', 'Mass (in kg) is the amount of matter; weight (in N) is the gravitational force on it, W = mg. The spring responds to the weight, so the same mass would stretch it less on the Moon.'],
      ],
      id: [
        ['Pegas yang lebih panjang atau lebih besar selalu memiliki konstanta pegas lebih besar.', 'Tidak selalu. k bergantung pada tebal kawat, diameter lilitan, bahan dan jumlah lilitan. Untuk kawat yang sama, pegas yang lebih panjang justru lebih lunak, karena tiap lilitan berbagi pemanjangan.'],
        ['Konstanta pegas berubah ketika beban yang digantung lebih berat.', 'Dalam batas elastis, k adalah sifat pegas itu sendiri. Beban yang lebih berat memberi pemanjangan lebih besar, tetapi F ÷ x tetap sama. Perbandingan tetap inilah yang diperiksa tabel lab.'],
        ['Pegas apa pun akan kembali ke panjang semula jika ditunggu cukup lama.', 'Hanya jika masih dalam batas elastisnya. Jika ditarik melewati batas itu, susunan logamnya sudah berubah permanen dan pegas tetap lebih panjang dari semula.'],
        ['Massa dan berat adalah hal yang sama.', 'Massa (dalam kg) adalah banyaknya materi; berat (dalam N) adalah gaya gravitasi padanya, W = mg. Pegas menanggapi berat, jadi massa yang sama akan memanjangkan pegas lebih sedikit di Bulan.'],
      ],
    },
    realWorld: {
      en: [
        'Spring balances and many bathroom and kitchen scales measure weight by how far a calibrated spring stretches or compresses.',
        'Car and motorcycle suspensions use stiff springs chosen by their k so the vehicle sits at the right height and absorbs bumps.',
        'A trampoline, a bow, and the strings of a tennis racket all store energy by being stretched elastically and give it back when they recoil.',
        'Engineers use the same proportional law, called elasticity, to predict how much a bridge cable or a skyscraper column stretches under load.',
      ],
      id: [
        'Neraca pegas serta banyak timbangan badan dan dapur mengukur berat dari seberapa jauh pegas yang sudah dikalibrasi memanjang atau memendek.',
        'Suspensi mobil dan motor memakai pegas kaku yang dipilih berdasarkan k-nya agar kendaraan berada pada ketinggian yang tepat dan meredam guncangan.',
        'Trampolin, busur panah, dan senar raket tenis semuanya menyimpan energi dengan diregangkan secara elastis dan mengembalikannya saat memantul.',
        'Insinyur memakai hukum sebanding yang sama, disebut elastisitas, untuk memperkirakan seberapa jauh kabel jembatan atau kolom gedung pencakar langit memanjang akibat beban.',
      ],
    },
    questions: {
      en: [
        { q: 'A 2.0 kg mass hangs on the medium spring (k = 80 N/m). What stretch does the sim show?', a: 'About 0.25 m (25 cm). The weight is F = mg = 2.0 × 9.8 = 19.6 N, and x = F ÷ k = 19.6 ÷ 80 = 0.245 m. This is within the 60 cm elastic limit, so Hooke\'s law applies.' },
        { q: 'You record 0.5 kg, 1.0 kg and 1.5 kg on the soft spring and calculate F ÷ x for each row. What do you expect to find, and why?', a: 'All three values should be about 20 N/m. The stretch grows in proportion to the weight, so the ratio F ÷ x stays constant; that ratio is the spring constant k. Any small spread between rows would come from reading errors.' },
        { q: 'On the graph, the soft spring\'s line is the least steep. Does that mean the soft spring is the strongest or the weakest?', a: 'The weakest, in the sense of least stiff. A gentle slope means a small force produces a large stretch, so k is small. The stiff spring has the steepest line because it needs the most force per metre of stretch.' },
      ],
      id: [
        { q: 'Beban 2,0 kg digantung pada pegas sedang (k = 80 N/m). Berapa pemanjangan yang ditampilkan simulasi?', a: 'Sekitar 0,25 m (25 cm). Beratnya F = mg = 2,0 × 9,8 = 19,6 N, dan x = F ÷ k = 19,6 ÷ 80 = 0,245 m. Nilai ini masih di dalam batas elastis 60 cm, jadi hukum Hooke berlaku.' },
        { q: 'Kamu merekam 0,5 kg, 1,0 kg dan 1,5 kg pada pegas lunak dan menghitung F ÷ x untuk tiap baris. Apa yang kamu harapkan, dan mengapa?', a: 'Ketiga nilainya seharusnya sekitar 20 N/m. Pemanjangan bertambah sebanding dengan berat, sehingga perbandingan F ÷ x tetap; perbandingan itulah konstanta pegas k. Selisih kecil antarbaris berasal dari kesalahan pembacaan.' },
        { q: 'Pada grafik, garis pegas lunak paling landai. Apakah itu berarti pegas lunak paling kuat atau paling lemah?', a: 'Paling lemah, dalam arti paling tidak kaku. Kemiringan landai berarti gaya kecil menghasilkan pemanjangan besar, sehingga k kecil. Pegas kaku memiliki garis paling curam karena butuh gaya terbesar untuk tiap meter pemanjangan.' },
      ],
    },
  },
};
