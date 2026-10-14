// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect atmospheric CO₂ (ppm) to surface-ocean pH and Ω.',
      'See the pre-industrial vs today vs RCP-scenario differences.',
      'Identify the Ω = 1 threshold below which carbonate skeletons dissolve.',
    ],
    id: [
      'Menghubungkan CO₂ atmosfer (ppm) dengan pH permukaan laut dan Ω.',
      'Melihat perbedaan pra-industri vs hari ini vs skenario RCP.',
      'Mengidentifikasi ambang Ω = 1 di mana kerangka karbonat larut.',
    ],
  },
  tryThis: {
    en: [
      'Pre-industrial 280 ppm — pH 8.18, Ω ≈ 4.5 (ample for shell growth).',
      'Today ~420 ppm — pH 8.07, Ω dropped ~25%.',
      'RCP 8.5 ~900 ppm — pH 7.75, Ω near 1.5; corals struggle.',
    ],
    id: [
      'Pra-industri 280 ppm — pH 8,18; Ω ≈ 4,5 (cukup untuk pertumbuhan cangkang).',
      'Hari ini ~420 ppm — pH 8,07; Ω turun ~25%.',
      'RCP 8.5 ~900 ppm — pH 7,75; Ω hampir 1,5; karang kesulitan.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The ocean absorbs roughly a quarter of the CO₂ that people emit each year. That slows warming, but it changes seawater chemistry. Dissolved CO₂ reacts with water to form carbonic acid, H2CO3, which releases hydrogen ions: CO2 + H2O ⇌ H2CO3 ⇌ H+ + HCO3−. More hydrogen ions means a lower pH. Since pH is a logarithmic scale, the fall from about 8.2 before the industrial era to about 8.1 today, which looks small, corresponds to roughly 26 to 30% more hydrogen ions in surface water.',
        'The hydrogen ions do a second thing that matters for life: they combine with carbonate ions, CO3 2−, to make more bicarbonate, HCO3−. Corals, oysters, sea snails and many plankton build shells and skeletons from calcium carbonate, CaCO3, and they need carbonate ions to do it. Chemists describe the ease of building shell with the saturation state, Ω = [Ca2+][CO3 2−] / Ksp, where Ksp is the solubility product of the mineral. When Ω is above 1 the water is supersaturated and shells can form; below 1 the water is corrosive and bare carbonate dissolves. The sim uses aragonite, the more soluble form that corals and pteropods use, which is why its Ω values are lower than those for calcite.',
        'Rather than solving the full set of equilibrium equations, the simulation uses two simple empirical curves fitted to published values. Surface pH is modelled as 8.20 minus 0.18 for every doubling of atmospheric CO₂ relative to 280 ppm, and Ω as 4.7 times (280 / CO₂) to the power 0.55. Drag the slider or the marker to set CO₂ between 200 and 1500 ppm and read both quantities off the curves; the preset buttons jump to the pre-industrial value, today, and two emission scenarios for 2100. The red dashed line marks Ω = 1.',
        'The model is a global average at equilibrium, so it hides several things. The surface ocean takes years to adjust to the air, so the real pH lags a fast rise in CO₂. Cold water holds more CO₂ and has naturally lower Ω, so polar oceans are expected to cross Ω = 1 for aragonite within this century even though the global-average curve in the sim never reaches it. Warming, changes in alkalinity and river inputs are ignored, and so is biology: in reality many organisms struggle well before Ω reaches 1, because building shell costs them more energy as carbonate becomes scarce. The sim\'s fit is also slightly gentler than full chemistry models, which predict a somewhat larger pH drop at high CO₂ because the ocean\'s buffering weakens as it acidifies.',
      ],
      id: [
        'Lautan menyerap kira-kira seperempat CO₂ yang dilepaskan manusia setiap tahun. Itu memperlambat pemanasan, tetapi mengubah kimia air laut. CO₂ yang terlarut bereaksi dengan air membentuk asam karbonat, H2CO3, yang melepaskan ion hidrogen: CO2 + H2O ⇌ H2CO3 ⇌ H+ + HCO3−. Semakin banyak ion hidrogen, semakin rendah pH. Karena pH adalah skala logaritmik, penurunan dari sekitar 8,2 sebelum era industri menjadi sekitar 8,1 hari ini, yang tampak kecil, setara dengan kira-kira 26 sampai 30% lebih banyak ion hidrogen di air permukaan.',
        'Ion hidrogen melakukan hal kedua yang penting bagi kehidupan: mereka bergabung dengan ion karbonat, CO3 2−, membentuk lebih banyak bikarbonat, HCO3−. Karang, tiram, siput laut, dan banyak plankton membangun cangkang dan kerangka dari kalsium karbonat, CaCO3, dan mereka membutuhkan ion karbonat untuk itu. Ahli kimia menggambarkan kemudahan membangun cangkang dengan keadaan jenuh, Ω = [Ca2+][CO3 2−] / Ksp, dengan Ksp adalah hasil kali kelarutan mineral tersebut. Jika Ω di atas 1, air lewat jenuh dan cangkang bisa terbentuk; di bawah 1, air bersifat korosif dan karbonat yang terbuka akan larut. Sim memakai aragonit, bentuk yang lebih mudah larut yang dipakai karang dan pteropoda, karena itu nilai Ω-nya lebih rendah daripada untuk kalsit.',
        'Alih-alih menyelesaikan seluruh persamaan kesetimbangan, simulasi memakai dua kurva empiris sederhana yang dicocokkan dengan nilai terpublikasi. pH permukaan dimodelkan sebagai 8,20 dikurangi 0,18 untuk setiap penggandaan CO₂ atmosfer relatif terhadap 280 ppm, dan Ω sebagai 4,7 kali (280 / CO₂) pangkat 0,55. Geser slider atau penanda untuk mengatur CO₂ antara 200 dan 1500 ppm dan baca kedua besaran dari kurvanya; tombol preset melompat ke nilai pra-industri, hari ini, dan dua skenario emisi untuk 2100. Garis putus-putus merah menandai Ω = 1.',
        'Model ini adalah rata-rata global dalam kesetimbangan, sehingga menyembunyikan beberapa hal. Permukaan laut butuh bertahun-tahun untuk menyesuaikan diri dengan udara, jadi pH sebenarnya tertinggal di belakang kenaikan CO₂ yang cepat. Air dingin menampung lebih banyak CO₂ dan secara alami punya Ω lebih rendah, sehingga lautan kutub diperkirakan melewati Ω = 1 untuk aragonit dalam abad ini meskipun kurva rata-rata global di sim tidak pernah mencapainya. Pemanasan, perubahan alkalinitas, dan masukan sungai diabaikan, begitu pula biologi: pada kenyataannya banyak organisme sudah kesulitan jauh sebelum Ω mencapai 1, karena membangun cangkang semakin menguras energi saat karbonat makin langka. Kecocokan kurva di sim juga sedikit lebih landai daripada model kimia lengkap, yang memperkirakan penurunan pH agak lebih besar pada CO₂ tinggi karena daya penyangga lautan melemah saat mengasam.',
      ],
    },
    figure: {
      caption: {
        en: 'The carbonate chain. CO₂ from the air dissolves and forms carbonic acid, which releases H+. The extra H+ lowers pH and converts carbonate ions into bicarbonate, so fewer carbonate ions remain, Ω falls, and calcium carbonate shells become harder to build.',
        id: 'Rantai karbonat. CO₂ dari udara larut dan membentuk asam karbonat, yang melepaskan H+. Tambahan H+ menurunkan pH dan mengubah ion karbonat menjadi bikarbonat, sehingga ion karbonat berkurang, Ω turun, dan cangkang kalsium karbonat makin sulit dibangun.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Chemical chain from atmospheric CO2 to dissolving shells', 'Rantai kimia dari CO2 atmosfer sampai cangkang yang larut')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{fill:none;stroke:currentColor;stroke-width:1.2;rx:6}.a{stroke:currentColor;stroke-width:1.6;fill:none}.k{font-size:10px;opacity:.75}</style>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
  <line x1="0" y1="52" x2="360" y2="52" stroke="#3b82f6" stroke-width="1.2" stroke-dasharray="6 4"/>
  <text x="6" y="14" class="k">${L('air', 'udara')}</text>
  <text x="6" y="66" class="k">${L('seawater', 'air laut')}</text>
  <rect x="20" y="20" width="70" height="24" class="b"/>
  <text x="33" y="37" fill="#ef4444" font-weight="bold">CO₂ ↑</text>
  <line x1="55" y1="44" x2="55" y2="78" class="a" marker-end="url(#ar)"/>
  <text x="62" y="68" class="k">${L('dissolves', 'larut')}</text>
  <rect x="20" y="80" width="70" height="24" class="b"/>
  <text x="26" y="97">CO₂ + H₂O</text>
  <line x1="90" y1="92" x2="118" y2="92" class="a" marker-end="url(#ar)"/>
  <rect x="120" y="80" width="56" height="24" class="b"/>
  <text x="128" y="97">H₂CO₃</text>
  <line x1="176" y1="92" x2="204" y2="92" class="a" marker-end="url(#ar)"/>
  <rect x="206" y="80" width="134" height="24" class="b"/>
  <text x="214" y="97"><tspan fill="#ef4444" font-weight="bold">H⁺</tspan> + HCO₃⁻</text>
  <text x="206" y="124" fill="#ef4444">${L('more H⁺  →  pH falls', 'H⁺ bertambah  →  pH turun')}</text>
  <line x1="240" y1="104" x2="200" y2="150" class="a" marker-end="url(#ar)"/>
  <rect x="60" y="150" width="190" height="26" class="b"/>
  <text x="68" y="168"><tspan fill="#ef4444" font-weight="bold">H⁺</tspan> + <tspan fill="#10b981" font-weight="bold">CO₃²⁻</tspan>  →  HCO₃⁻</text>
  <text x="60" y="194" fill="#10b981">${L('carbonate ions are used up  →  Ω falls', 'ion karbonat terpakai  →  Ω turun')}</text>
  <line x1="155" y1="176" x2="155" y2="206" class="a" marker-end="url(#ar)"/>
  <rect x="40" y="208" width="240" height="26" class="b" stroke="#f59e0b"/>
  <text x="48" y="226" fill="#f59e0b">${L('CaCO₃ shell: Ω above 1 grows, Ω below 1 dissolves', 'Cangkang CaCO₃: Ω di atas 1 tumbuh, Ω di bawah 1 larut')}</text>
  <text x="262" y="168" class="k">Ω = [Ca²⁺][CO₃²⁻]/Ksp</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'CO₂ dissolving in seawater forms carbonic acid, which releases hydrogen ions and lowers pH.',
        'pH is logarithmic: a drop of 0.1 means roughly 26% more hydrogen ions, and a drop of 0.3 means about twice as many.',
        'The extra hydrogen ions turn carbonate into bicarbonate, so the carbonate ions that shell-builders need become scarcer.',
        'The saturation state Ω measures how easy it is to form calcium carbonate: above 1 shells can grow, below 1 they dissolve.',
        'The sim is an equilibrium, global-average fit; cold polar waters reach low Ω much sooner than the average curve suggests.',
      ],
      id: [
        'CO₂ yang larut dalam air laut membentuk asam karbonat, yang melepaskan ion hidrogen dan menurunkan pH.',
        'pH bersifat logaritmik: penurunan 0,1 berarti sekitar 26% lebih banyak ion hidrogen, dan penurunan 0,3 berarti sekitar dua kali lipat.',
        'Tambahan ion hidrogen mengubah karbonat menjadi bikarbonat, sehingga ion karbonat yang dibutuhkan pembangun cangkang makin langka.',
        'Keadaan jenuh Ω mengukur seberapa mudah kalsium karbonat terbentuk: di atas 1 cangkang bisa tumbuh, di bawah 1 cangkang larut.',
        'Sim adalah kecocokan kurva rata-rata global dalam kesetimbangan; perairan kutub yang dingin mencapai Ω rendah jauh lebih cepat daripada yang ditunjukkan kurva rata-rata.',
      ],
    },
    vocabulary: {
      en: [
        ['pH', 'A measure of acidity equal to minus the logarithm of the hydrogen-ion concentration; lower pH means more hydrogen ions.'],
        ['Carbonic acid (H2CO3)', 'The weak acid formed when CO₂ dissolves in water; it releases hydrogen ions and bicarbonate.'],
        ['Bicarbonate (HCO3−)', 'The most abundant form of dissolved carbon in seawater; formed both from carbonic acid and from carbonate reacting with H+.'],
        ['Carbonate ion (CO3 2−)', 'The building block that organisms combine with calcium to make shells; its concentration falls as CO₂ rises.'],
        ['Saturation state (Ω)', 'The ratio [Ca2+][CO3 2−]/Ksp; Ω above 1 favours shell formation, Ω below 1 favours dissolution.'],
        ['Aragonite and calcite', 'Two crystal forms of calcium carbonate; aragonite (corals, pteropods) is more soluble, so its Ω is lower than calcite\'s.'],
        ['ppm', 'Parts per million by volume; 420 ppm means 420 CO₂ molecules per million molecules of air.'],
        ['RCP scenario', 'A "representative concentration pathway", a standard storyline of future emissions used in climate projections.'],
      ],
      id: [
        ['pH', 'Ukuran keasaman yang sama dengan minus logaritma konsentrasi ion hidrogen; pH lebih rendah berarti ion hidrogen lebih banyak.'],
        ['Asam karbonat (H2CO3)', 'Asam lemah yang terbentuk saat CO₂ larut dalam air; melepaskan ion hidrogen dan bikarbonat.'],
        ['Bikarbonat (HCO3−)', 'Bentuk karbon terlarut yang paling melimpah di air laut; terbentuk dari asam karbonat maupun dari karbonat yang bereaksi dengan H+.'],
        ['Ion karbonat (CO3 2−)', 'Bahan bangunan yang digabungkan organisme dengan kalsium untuk membuat cangkang; konsentrasinya turun saat CO₂ naik.'],
        ['Keadaan jenuh (Ω)', 'Nisbah [Ca2+][CO3 2−]/Ksp; Ω di atas 1 mendukung pembentukan cangkang, Ω di bawah 1 mendukung pelarutan.'],
        ['Aragonit dan kalsit', 'Dua bentuk kristal kalsium karbonat; aragonit (karang, pteropoda) lebih mudah larut, sehingga Ω-nya lebih rendah daripada kalsit.'],
        ['ppm', 'Bagian per juta berdasarkan volume; 420 ppm berarti 420 molekul CO₂ per sejuta molekul udara.'],
        ['Skenario RCP', '"Representative concentration pathway", alur baku emisi masa depan yang dipakai dalam proyeksi iklim.'],
      ],
    },
    misconceptions: {
      en: [
        ['The ocean is becoming acidic.', 'Seawater is still basic, with pH above 7. "Acidification" means moving toward the acidic end of the scale, from about 8.2 to 8.1 so far, not crossing into it.'],
        ['A 0.1 change in pH is too small to matter.', 'Because pH is logarithmic, 0.1 is about a 26% increase in hydrogen ions, and marine organisms have evolved in water whose pH varied far less than that over millions of years.'],
        ['Adding carbon to the water should give shell-builders more carbonate to work with.', 'The extra carbon ends up as bicarbonate, not carbonate. The hydrogen ions released by carbonic acid actually consume carbonate ions, so there are fewer of them, not more.'],
        ['Shells are safe as long as Ω stays above 1.', 'Ω = 1 is where bare mineral dissolves. Living organisms need Ω well above 1 to build shell at a healthy rate; reef growth already slows noticeably when Ω falls toward 3.'],
      ],
      id: [
        ['Lautan sedang menjadi asam.', 'Air laut masih bersifat basa, dengan pH di atas 7. "Pengasaman" berarti bergerak ke arah ujung asam pada skala, dari sekitar 8,2 ke 8,1 sampai saat ini, bukan menyeberang ke wilayah asam.'],
        ['Perubahan pH sebesar 0,1 terlalu kecil untuk berarti.', 'Karena pH logaritmik, 0,1 berarti kenaikan ion hidrogen sekitar 26%, dan organisme laut berevolusi dalam air yang pH-nya berubah jauh lebih sedikit dari itu selama jutaan tahun.'],
        ['Menambah karbon ke air seharusnya memberi lebih banyak karbonat bagi pembangun cangkang.', 'Tambahan karbon itu berakhir sebagai bikarbonat, bukan karbonat. Ion hidrogen yang dilepaskan asam karbonat justru menghabiskan ion karbonat, sehingga jumlahnya berkurang, bukan bertambah.'],
        ['Cangkang aman selama Ω masih di atas 1.', 'Ω = 1 adalah titik ketika mineral terbuka mulai larut. Organisme hidup butuh Ω jauh di atas 1 untuk membangun cangkang dengan laju sehat; pertumbuhan terumbu sudah melambat nyata ketika Ω turun mendekati 3.'],
      ],
    },
    realWorld: {
      en: [
        'Oyster hatcheries on the Pacific coast of North America lost large numbers of larvae in the late 2000s when upwelled low-pH water reached their intakes; they now monitor seawater chemistry and buffer the water.',
        'Pteropods, tiny swimming sea snails that feed fish such as salmon, have been found with pitted, partly dissolved shells in parts of the Southern Ocean and the North Pacific.',
        'Coral reefs in Indonesia and across the tropics face acidification on top of heat stress: lower Ω slows the growth of the skeleton that the whole reef is built on.',
        'Ocean time-series stations such as the one off Hawaii have tracked surface pH falling in step with rising atmospheric CO₂ since the 1980s.',
      ],
      id: [
        'Pembenihan tiram di pantai Pasifik Amerika Utara kehilangan banyak larva pada akhir 2000-an ketika air ber-pH rendah dari arus naik mencapai saluran masuk mereka; kini mereka memantau kimia air laut dan menambahkan penyangga.',
        'Pteropoda, siput laut renang mungil yang menjadi makanan ikan seperti salmon, ditemukan dengan cangkang berlubang dan sebagian larut di beberapa bagian Samudra Selatan dan Pasifik Utara.',
        'Terumbu karang di Indonesia dan di seluruh tropis menghadapi pengasaman di samping tekanan panas: Ω yang lebih rendah memperlambat pertumbuhan kerangka yang menjadi fondasi seluruh terumbu.',
        'Stasiun pengamatan laut jangka panjang seperti yang berada di lepas pantai Hawaii mencatat pH permukaan turun seiring kenaikan CO₂ atmosfer sejak 1980-an.',
      ],
    },
    questions: {
      en: [
        { q: 'Surface pH has fallen from about 8.2 to about 8.1. By what factor has the hydrogen-ion concentration increased?', a: 'By 10 to the power 0.1, which is about 1.26, so roughly 26% more hydrogen ions. Each full pH unit is a factor of ten, so even tenths of a unit are large changes in concentration.' },
        { q: 'Using the sim\'s curves, what pH and Ω does it give when CO₂ doubles from 280 to 560 ppm? Is Ω still above 1?', a: 'One doubling lowers the sim\'s pH by 0.18, from 8.20 to about 8.02. Ω becomes 4.7 × 0.5^0.55 ≈ 4.7 × 0.68 ≈ 3.2, still well above 1. Real chemistry gives a somewhat larger pH drop, and cold polar waters would be much closer to Ω = 1 than this global average.' },
        { q: 'Explain, step by step, why pumping more CO₂ into seawater leaves fewer carbonate ions even though CO₂ contains carbon.', a: 'CO₂ reacts with water to form carbonic acid, which releases H+ and bicarbonate. The H+ then reacts with carbonate ions already in the water, converting them to bicarbonate as well. So the added carbon, and some of the original carbonate, both end up as bicarbonate, and the carbonate concentration, and with it Ω, falls.' },
      ],
      id: [
        { q: 'pH permukaan telah turun dari sekitar 8,2 menjadi sekitar 8,1. Berapa kali konsentrasi ion hidrogen bertambah?', a: 'Sebesar 10 pangkat 0,1, yaitu sekitar 1,26, jadi kira-kira 26% lebih banyak ion hidrogen. Setiap satu satuan pH penuh adalah faktor sepuluh, sehingga sepersepuluh satuan pun merupakan perubahan konsentrasi yang besar.' },
        { q: 'Dengan kurva di sim, berapa pH dan Ω yang diberikan ketika CO₂ berlipat dua dari 280 menjadi 560 ppm? Apakah Ω masih di atas 1?', a: 'Satu penggandaan menurunkan pH sim sebesar 0,18, dari 8,20 menjadi sekitar 8,02. Ω menjadi 4,7 × 0,5^0,55 ≈ 4,7 × 0,68 ≈ 3,2, masih jauh di atas 1. Kimia sesungguhnya memberi penurunan pH yang agak lebih besar, dan perairan kutub yang dingin akan jauh lebih dekat ke Ω = 1 daripada rata-rata global ini.' },
        { q: 'Jelaskan langkah demi langkah mengapa memompa lebih banyak CO₂ ke air laut justru menyisakan lebih sedikit ion karbonat, padahal CO₂ mengandung karbon.', a: 'CO₂ bereaksi dengan air membentuk asam karbonat, yang melepaskan H+ dan bikarbonat. H+ itu lalu bereaksi dengan ion karbonat yang sudah ada di air, mengubahnya menjadi bikarbonat juga. Jadi karbon tambahan itu, dan sebagian karbonat semula, sama-sama berakhir sebagai bikarbonat, sehingga konsentrasi karbonat, dan bersamanya Ω, turun.' },
      ],
    },
  },
};
