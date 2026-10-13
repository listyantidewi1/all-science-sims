// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Recognize convection cells driven by temperature differences.',
      'Connect mantle plumes and slabs to plate motion at the surface.',
      'See how Rayleigh number controls vigour of convection.',
    ],
    id: [
      'Mengenali sel konveksi yang didorong perbedaan suhu.',
      'Mengaitkan plum mantel dan slab dengan gerakan lempeng di permukaan.',
      'Melihat bagaimana bilangan Rayleigh mengendalikan ketegapan konveksi.',
    ],
  },  tryThis: {
    en: [
      'Drop heat at the bottom — does a plume rise?',
      'Drop a cold patch at the top — does it sink?',
      'Crank up Rayleigh number — does the pattern get chaotic?',
    ],
    id: [
      'Tambahkan panas di dasar — apakah plum naik?',
      'Tambahkan area dingin di puncak — apakah tenggelam?',
      'Naikkan bilangan Rayleigh — apakah pola jadi kacau?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Earth\'s mantle is solid rock, yet over millions of years it flows like extremely thick syrup. Heat leaking out of the core and heat from radioactive decay warm the rock at the bottom of the mantle. Warm rock expands and becomes slightly less dense than its surroundings, so it is slowly pushed upward by the denser, cooler rock sinking around it. This slow circulation is convection, the same process that stirs a pot of soup on a stove, except that here the material moves only a few centimetres per year. Convection is how most of Earth\'s internal heat reaches the surface, and it is what drags the tectonic plates around.',
        'The simulation is a two-dimensional slice of fluid that is kept hot along the bottom (red) and cold along the top (blue). Each frame it works out a flow pattern from the sideways temperature differences: wherever hot material sits next to cold material, the hot side tends to rise and the cold side tends to sink, which sets up a rotating cell. The flow then carries the temperature along with it, and a little heat also spreads by conduction between neighbouring cells. The white ticks along the top show how fast the surface layer is being dragged sideways, which is where real plates would ride.',
        'The Rayleigh number compares the buoyant push that drives convection with the viscosity and conduction that resist it. In a real fluid heated from below, convection only begins above a Rayleigh number of roughly 1,000, and the pattern becomes faster and more irregular as the number grows. In this sim the "Rayleigh-like" slider simply scales the strength of the buoyant push, so low values give a few slow, orderly cells and high values give fast, writhing plumes. The thermal diffusion slider sets how quickly heat leaks between neighbouring cells; more diffusion blurs the sharp edges of plumes and slabs. Clicking paints a hot patch (left button) or a cold patch (right button), so you can seed a plume or a sinking slab yourself.',
        'The model leaves out a great deal. The real mantle is a spherical shell in three dimensions, its viscosity depends strongly on temperature and pressure, its minerals change structure at depths of about 410 and 660 km, and it is heated from inside by radioactivity as well as from below by the core. The slider value is not the mantle\'s true Rayleigh number, which is estimated at around a million to a hundred million, far beyond what this sim can handle. Plates are not modelled as rigid pieces: the top edge is simply a cold boundary. And time is compressed enormously, so a few seconds here stand for millions of years.',
      ],
      id: [
        'Mantel Bumi adalah batuan padat, tetapi dalam jutaan tahun ia mengalir seperti sirup yang sangat kental. Panas yang bocor dari inti dan panas dari peluruhan radioaktif menghangatkan batuan di dasar mantel. Batuan yang hangat memuai dan menjadi sedikit kurang rapat daripada sekitarnya, sehingga perlahan terdorong naik oleh batuan dingin yang lebih rapat dan tenggelam di sekelilingnya. Peredaran lambat ini disebut konveksi, proses yang sama dengan yang mengaduk sepanci sup di atas kompor, hanya saja di sini materialnya bergerak beberapa sentimeter per tahun. Lewat konveksi inilah sebagian besar panas dalam Bumi mencapai permukaan, dan konveksi pula yang menyeret lempeng-lempeng tektonik.',
        'Simulasi ini adalah irisan dua dimensi dari fluida yang dijaga panas di dasar (merah) dan dingin di puncak (biru). Pada setiap frame, program menghitung pola aliran dari perbedaan suhu ke arah samping: di mana pun material panas bersebelahan dengan material dingin, sisi panas cenderung naik dan sisi dingin cenderung turun, sehingga terbentuk sel yang berputar. Aliran itu kemudian membawa suhu bersamanya, dan sedikit panas juga merambat secara konduksi antara sel-sel yang bertetangga. Garis-garis putih di bagian atas menunjukkan seberapa cepat lapisan permukaan diseret ke samping, yaitu tempat lempeng sungguhan akan menumpang.',
        'Bilangan Rayleigh membandingkan dorongan apung yang menggerakkan konveksi dengan kekentalan dan konduksi yang melawannya. Pada fluida nyata yang dipanaskan dari bawah, konveksi baru mulai di atas bilangan Rayleigh sekitar 1.000, dan polanya makin cepat serta makin tak teratur ketika bilangan itu membesar. Dalam sim ini slider "Rayleigh-like" hanya menskalakan kekuatan dorongan apung, sehingga nilai rendah menghasilkan beberapa sel yang lambat dan teratur, sedangkan nilai tinggi menghasilkan plum yang cepat dan meliuk-liuk. Slider difusi termal mengatur seberapa cepat panas merambat antara sel tetangga; difusi yang lebih besar mengaburkan tepi tajam plum dan slab. Klik pada kanvas melukis bercak panas (tombol kiri) atau bercak dingin (tombol kanan), sehingga kamu bisa memicu sendiri sebuah plum atau slab yang tenggelam.',
        'Model ini mengabaikan banyak hal. Mantel sungguhan berbentuk kulit bola tiga dimensi, kekentalannya sangat bergantung pada suhu dan tekanan, mineralnya berubah struktur pada kedalaman sekitar 410 dan 660 km, dan ia dipanaskan dari dalam oleh radioaktivitas selain dari bawah oleh inti. Nilai slider bukanlah bilangan Rayleigh mantel yang sebenarnya, yang diperkirakan sekitar satu juta sampai seratus juta, jauh di luar jangkauan sim ini. Lempeng tidak dimodelkan sebagai kepingan kaku: tepi atas hanyalah batas dingin. Dan waktu dipadatkan luar biasa, sehingga beberapa detik di sini mewakili jutaan tahun.',
      ],
    },
    figure: {
      caption: {
        en: 'Two convection cells. Hot, less dense rock rises in a plume, spreads out under the surface and drags the plates apart at a ridge; cold, denser rock sinks as slabs at the trenches and returns along the bottom to be reheated.',
        id: 'Dua sel konveksi. Batuan panas yang kurang rapat naik sebagai plum, menyebar di bawah permukaan dan menyeret lempeng saling menjauh di punggungan; batuan dingin yang lebih rapat tenggelam sebagai slab di palung lalu kembali di dasar untuk dipanaskan lagi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Two convection cells in the mantle', 'Dua sel konveksi di mantel')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:10px;opacity:.75}</style>
  <rect x="30" y="44" width="300" height="156" class="m"/>
  <rect x="30" y="44" width="300" height="10" fill="#3b82f6" opacity=".35"/>
  <rect x="30" y="190" width="300" height="10" fill="#ef4444" opacity=".35"/>
  <path d="M180 186 L180 66" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <path d="M172 62 L68 62" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <path d="M188 62 L292 62" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <path d="M60 68 L60 180" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <path d="M300 68 L300 180" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <path d="M68 186 L170 186" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <path d="M292 186 L190 186" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="186" y="118" fill="#ef4444">${L('hot, less dense,', 'panas, kurang rapat,')}</text>
  <text x="186" y="132" fill="#ef4444">${L('rises (plume)', 'naik (plum)')}</text>
  <text x="66" y="112" fill="#3b82f6">${L('cold,', 'dingin,')}</text>
  <text x="66" y="126" fill="#3b82f6">${L('denser,', 'rapat,')}</text>
  <text x="66" y="140" fill="#3b82f6">${L('sinks (slab)', 'turun (slab)')}</text>
  <text x="306" y="112" fill="#3b82f6">${L('cold,', 'dingin,')}</text>
  <text x="306" y="126" fill="#3b82f6">${L('denser,', 'rapat,')}</text>
  <text x="306" y="140" fill="#3b82f6">${L('sinks', 'turun')}</text>
  <text x="163" y="36">${L('ridge', 'punggungan')}</text>
  <text x="40" y="36" class="s">${L('trench', 'palung')}</text>
  <text x="282" y="36" class="s">${L('trench', 'palung')}</text>
  <text x="30" y="222" class="s">${L('surface: cold boundary (blue). bottom: heated by the core (red). orange: flow under the plates', 'puncak: batas dingin (biru). dasar: dipanaskan inti (merah). jingga: aliran di bawah lempeng')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Warm rock expands and becomes less dense, so it rises; cool rock is denser, so it sinks. This density difference, acting under gravity, drives convection.',
        'Convection carries heat out of the Earth far faster than conduction through solid rock could.',
        'Rising plumes and sinking slabs organise into cells, and the sideways flow beneath the surface is what moves the tectonic plates.',
        'A higher Rayleigh number means more vigorous and more chaotic convection; stronger thermal diffusion smooths out temperature differences and calms the flow.',
        'The mantle is solid, but over millions of years it creeps at a few centimetres per year.',
      ],
      id: [
        'Batuan hangat memuai dan menjadi kurang rapat sehingga naik; batuan dingin lebih rapat sehingga turun. Perbedaan kerapatan inilah, di bawah pengaruh gravitasi, yang menggerakkan konveksi.',
        'Konveksi membawa panas keluar dari Bumi jauh lebih cepat daripada konduksi melalui batuan padat.',
        'Plum yang naik dan slab yang tenggelam tersusun menjadi sel-sel, dan aliran menyamping di bawah permukaan itulah yang menggerakkan lempeng tektonik.',
        'Bilangan Rayleigh yang lebih tinggi berarti konveksi lebih kuat dan lebih kacau; difusi termal yang lebih besar meratakan perbedaan suhu dan menenangkan aliran.',
        'Mantel bersifat padat, tetapi selama jutaan tahun ia merayap beberapa sentimeter per tahun.',
      ],
    },
    vocabulary: {
      en: [
        ['Convection', 'Heat transport by the bulk movement of a fluid: warm material rises, cool material sinks.'],
        ['Mantle', 'The thick layer of hot, solid rock between Earth\'s crust and its core, about 2,900 km deep.'],
        ['Plume', 'A narrow column of unusually hot rock rising through the mantle.'],
        ['Slab', 'A sheet of cold, dense rock (a subducted plate) sinking into the mantle.'],
        ['Rayleigh number', 'A dimensionless number comparing the buoyancy that drives convection with the viscosity and conduction that resist it.'],
        ['Thermal diffusion', 'The spreading of heat by conduction from warmer to cooler neighbouring material.'],
        ['Density', 'Mass per unit volume; warming rock expands and lowers its density.'],
        ['Lithosphere', 'The cold, rigid outer shell of Earth that is broken into tectonic plates.'],
      ],
      id: [
        ['Konveksi', 'Perpindahan panas melalui gerakan fluida secara keseluruhan: material hangat naik, material dingin turun.'],
        ['Mantel', 'Lapisan tebal batuan padat yang panas antara kerak Bumi dan intinya, sedalam sekitar 2.900 km.'],
        ['Plum', 'Kolom sempit batuan yang luar biasa panas yang naik menembus mantel.'],
        ['Slab', 'Lembaran batuan dingin dan rapat (lempeng yang menunjam) yang tenggelam ke dalam mantel.'],
        ['Bilangan Rayleigh', 'Bilangan tak berdimensi yang membandingkan gaya apung penggerak konveksi dengan kekentalan dan konduksi yang melawannya.'],
        ['Difusi termal', 'Perambatan panas secara konduksi dari material yang lebih hangat ke tetangganya yang lebih dingin.'],
        ['Kerapatan', 'Massa per satuan volume; batuan yang memanas memuai sehingga kerapatannya turun.'],
        ['Litosfer', 'Kulit terluar Bumi yang dingin dan kaku, yang terpecah menjadi lempeng-lempeng tektonik.'],
      ],
    },
    misconceptions: {
      en: [
        ['The mantle is an ocean of molten lava.', 'The mantle is solid rock: earthquake S waves, which cannot travel through liquids, pass straight through it. It flows only by very slow creep, and magma forms only in small pockets near the surface.'],
        ['Hot material rises on its own, so convection would happen anywhere.', 'Hot material rises only because gravity pulls the surrounding denser, cooler material down beneath it. Without gravity (or without a density difference) there is no convection.'],
        ['Plates move because Earth spins, or because they float on liquid.', 'Plates ride on the slowly convecting solid mantle. They are pushed apart where hot material rises and pulled down where cold slabs sink, and the sinking slabs are the main driver.'],
      ],
      id: [
        ['Mantel adalah lautan lava cair.', 'Mantel adalah batuan padat: gelombang S dari gempa, yang tidak bisa merambat melalui cairan, melewatinya dengan mudah. Mantel mengalir hanya lewat rayapan yang sangat lambat, dan magma hanya terbentuk di kantong-kantong kecil dekat permukaan.'],
        ['Material panas naik dengan sendirinya, jadi konveksi bisa terjadi di mana saja.', 'Material panas naik hanya karena gravitasi menarik material dingin yang lebih rapat di sekitarnya ke bawah. Tanpa gravitasi (atau tanpa perbedaan kerapatan) tidak ada konveksi.'],
        ['Lempeng bergerak karena Bumi berputar, atau karena lempeng terapung di atas cairan.', 'Lempeng menumpang di atas mantel padat yang berkonveksi perlahan. Lempeng didorong menjauh di tempat material panas naik dan ditarik turun di tempat slab dingin tenggelam, dan slab yang tenggelam itulah penggerak utamanya.'],
      ],
    },
    realWorld: {
      en: [
        'Mid-ocean ridges such as the one running through Iceland sit above rising mantle, which is why new sea floor forms there and the plates move apart.',
        'The Hawaiian islands line up along a chain because the Pacific plate drifts over a long-lived mantle plume that keeps feeding volcanoes.',
        'Indonesia\'s volcanoes and deep earthquakes trace the Indo-Australian plate sinking beneath the Sunda trench, a real cold slab descending into the mantle.',
        'The same convection you see here operates in a pot of soup on the stove, in the atmosphere (thunderstorms) and inside the Sun.',
      ],
      id: [
        'Punggungan tengah samudra, seperti yang melintasi Islandia, berada di atas mantel yang naik; itulah sebabnya dasar laut baru terbentuk di sana dan lempeng saling menjauh.',
        'Kepulauan Hawaii berjajar membentuk rantai karena lempeng Pasifik bergeser di atas plum mantel berumur panjang yang terus menyuplai gunung api.',
        'Gunung api dan gempa dalam di Indonesia menandai lempeng Indo-Australia yang menunjam di bawah palung Sunda, sebuah slab dingin sungguhan yang turun ke mantel.',
        'Konveksi yang sama seperti yang kamu lihat di sini juga bekerja di sepanci sup di atas kompor, di atmosfer (awan badai) dan di dalam Matahari.',
      ],
    },
    questions: {
      en: [
        { q: 'In the sim a hot patch painted near the bottom grows into a rising plume, but a hot patch painted at the very top fades without doing much. Why?', a: 'A hot patch rises because the cooler, denser material around it sinks and pushes it up. At the bottom there is a whole mantle above for it to rise through. At the top it has nowhere to go and sits against the cold boundary, which quickly conducts its heat away.' },
        { q: 'Mantle rock moves at roughly 5 cm per year. About how long would it take to travel the full 2,900 km depth of the mantle?', a: '2,900 km is 290,000,000 cm. At 5 cm per year that is about 58 million years. This is why the sim must compress millions of years into seconds.' },
        { q: 'Set the Rayleigh-like number low and thermal diffusion high. What happens to the pattern, and why?', a: 'The flow weakens and the picture becomes a smooth gradient from red at the bottom to blue at the top. Diffusion evens out temperature differences faster than the weak buoyant push can use them, so heat moves mainly by conduction instead of convection.' },
      ],
      id: [
        { q: 'Dalam sim, bercak panas yang dilukis dekat dasar tumbuh menjadi plum yang naik, tetapi bercak panas di bagian paling atas memudar tanpa banyak efek. Mengapa?', a: 'Bercak panas naik karena material dingin yang lebih rapat di sekitarnya turun dan mendorongnya ke atas. Di dasar, ada seluruh mantel di atasnya untuk dilalui. Di puncak, ia tidak punya tempat untuk naik dan menempel pada batas dingin yang cepat menyalurkan panasnya keluar.' },
        { q: 'Batuan mantel bergerak kira-kira 5 cm per tahun. Berapa lama waktu yang dibutuhkan untuk menempuh seluruh kedalaman mantel sejauh 2.900 km?', a: '2.900 km sama dengan 290.000.000 cm. Dengan 5 cm per tahun, dibutuhkan sekitar 58 juta tahun. Itulah sebabnya sim harus memadatkan jutaan tahun menjadi beberapa detik.' },
        { q: 'Atur bilangan Rayleigh-like rendah dan difusi termal tinggi. Apa yang terjadi pada polanya, dan mengapa?', a: 'Aliran melemah dan gambar menjadi gradasi mulus dari merah di dasar ke biru di puncak. Difusi meratakan perbedaan suhu lebih cepat daripada dorongan apung yang lemah bisa memanfaatkannya, sehingga panas berpindah terutama lewat konduksi, bukan konveksi.' },
      ],
    },
  },
};
