// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Calculate gravitational potential energy PE = m·g·h and kinetic energy KE = ½·m·v² in joules.',
      'Use conservation of energy, PE + KE + heat = constant, to predict the speed of a cart at any height on a track.',
      'Explain how friction does work that turns mechanical energy into heat, so the cart cannot return to its release height.',
    ],
    id: [
      'Menghitung energi potensial gravitasi EP = m·g·h dan energi kinetik EK = ½·m·v² dalam joule.',
      'Menggunakan kekekalan energi, EP + EK + kalor = tetap, untuk memprediksi kelajuan kereta pada ketinggian mana pun di lintasan.',
      'Menjelaskan bagaimana gesekan melakukan usaha yang mengubah energi mekanik menjadi kalor, sehingga kereta tidak bisa kembali ke ketinggian pelepasannya.',
    ],
  },
  tryThis: {
    en: [
      'With μ = 0, release from 8 m and watch the bars: when is KE largest? Does the total bar ever move?',
      'Drag the flag to the lowest dip. Check that KE there equals m·g·(h₀ − h) and that v = √(2·g·(h₀ − h)).',
      'Raise a middle hump above the release height. Can the cart get over it? Now raise the release point.',
      'Set μ = 0.1 and release. Watch the orange heat bar grow and the cart settle in a valley.',
    ],
    id: [
      'Dengan μ = 0, lepaskan dari 8 m dan perhatikan batang energi: kapan EK paling besar? Apakah batang total pernah bergerak?',
      'Seret bendera ke lembah terendah. Periksa bahwa EK di sana sama dengan m·g·(h₀ − h) dan v = √(2·g·(h₀ − h)).',
      'Naikkan bukit tengah di atas ketinggian pelepasan. Bisakah kereta melewatinya? Sekarang naikkan titik pelepasan.',
      'Atur μ = 0,1 dan lepaskan. Perhatikan batang kalor oranye membesar dan kereta berhenti di lembah.',
    ],
  },

  learn: {
    background: {
      en: [
        'Energy is the ability to do work, measured in joules (J). A cart high on a track stores gravitational potential energy, PE = m·g·h, where m is its mass in kg, g = 9.8 m/s² and h its height in metres above the ground. A 40 kg cart at 8 m stores 40 × 9.8 × 8 ≈ 3136 J. A moving cart has kinetic energy, KE = ½·m·v²; the same cart at 10 m/s has ½ × 40 × 100 = 2000 J.',
        'As the cart rolls downhill, gravity does work on it and potential energy turns into kinetic energy; uphill, the reverse happens. Without friction the total mechanical energy PE + KE stays exactly constant, so the cart is fastest at the lowest point and can climb back up to exactly its release height h₀, never higher. That gives a simple way to predict speed: at any height h, ½·m·v² = m·g·(h₀ − h), so v = √(2·g·(h₀ − h)). Notice that the mass cancels: a heavy cart and a light cart reach the same speed.',
        'Real tracks have friction. Friction does work against the motion, W = f·d, and that work does not disappear: it becomes thermal energy (heat) in the wheels and rails. The sim keeps a running total of this heat, and the four bars show that PE + KE + heat always equals the starting energy m·g·h₀. With friction the cart climbs a little less each time and finally settles in a valley, with all the original energy turned into heat.',
        'In the sim the track is a smooth curve through six points you can drag. The cart is constrained to the track: the sim moves it along the curve using the component of gravity along the slope, subtracts the friction work into the heat bar, and then uses the energy balance to set the speed, so the bars are exact. Drag the flag to any point on the track and the readout tells you the energies there the moment the cart passes.',
      ],
      id: [
        'Energi adalah kemampuan melakukan usaha, diukur dalam joule (J). Kereta yang berada tinggi di lintasan menyimpan energi potensial gravitasi, EP = m·g·h, dengan m massanya dalam kg, g = 9,8 m/s² dan h ketinggiannya dalam meter di atas tanah. Kereta 40 kg pada 8 m menyimpan 40 × 9,8 × 8 ≈ 3136 J. Kereta yang bergerak mempunyai energi kinetik, EK = ½·m·v²; kereta yang sama pada 10 m/s mempunyai ½ × 40 × 100 = 2000 J.',
        'Saat kereta meluncur turun, gravitasi melakukan usaha padanya dan energi potensial berubah menjadi energi kinetik; saat naik, terjadi sebaliknya. Tanpa gesekan energi mekanik total EP + EK tetap sama persis, sehingga kereta paling cepat di titik terendah dan bisa naik kembali tepat ke ketinggian pelepasan h₀, tidak pernah lebih tinggi. Ini memberi cara sederhana memprediksi kelajuan: pada ketinggian h, ½·m·v² = m·g·(h₀ − h), sehingga v = √(2·g·(h₀ − h)). Perhatikan bahwa massanya saling meniadakan: kereta berat dan ringan mencapai kelajuan yang sama.',
        'Lintasan sungguhan mempunyai gesekan. Gesekan melakukan usaha melawan gerak, W = f·d, dan usaha itu tidak hilang: ia menjadi energi termal (kalor) pada roda dan rel. Simulasi menjumlahkan kalor ini terus-menerus, dan keempat batang menunjukkan bahwa EP + EK + kalor selalu sama dengan energi awal m·g·h₀. Dengan gesekan kereta naik sedikit lebih rendah tiap kali dan akhirnya berhenti di lembah, dengan seluruh energi awal berubah menjadi kalor.',
        'Di simulasi, lintasan adalah kurva mulus melalui enam titik yang bisa kamu seret. Kereta terikat pada lintasan: simulasi menggerakkannya sepanjang kurva memakai komponen gravitasi searah lereng, mengurangkan usaha gesekan ke batang kalor, lalu memakai neraca energi untuk menetapkan kelajuan, sehingga batang energinya tepat. Seret bendera ke titik mana pun di lintasan dan tampilan memberitahu energi di sana saat kereta melintas.',
      ],
    },
    figure: {
      caption: {
        en: 'A cart released from height h₀ on a frictionless track. At the top the energy is all potential (PE = m·g·h₀); at the bottom it is all kinetic (KE = ½·m·v²); on the far hump it is shared. The total bar is the same everywhere. With friction, part of the total becomes heat and the cart cannot reach h₀ again.',
        id: 'Kereta dilepaskan dari ketinggian h₀ di lintasan tanpa gesekan. Di puncak semua energinya potensial (EP = m·g·h₀); di dasar semuanya kinetik (EK = ½·m·v²); di bukit seberang energinya terbagi. Batang total sama di mana-mana. Dengan gesekan, sebagian total menjadi kalor dan kereta tidak dapat mencapai h₀ lagi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const bars = (x, pe, ke) => `
  <rect x="${x}" y="${150 - pe}" width="12" height="${pe}" fill="#34d399"/>
  <rect x="${x + 14}" y="${150 - ke}" width="12" height="${ke}" fill="#38bdf8"/>
  <rect x="${x + 28}" y="90" width="12" height="60" fill="#a78bfa"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Energy of a cart at three points on a track', 'Energi kereta di tiga titik pada lintasan')}">
  <style>text{font:9px system-ui,sans-serif;fill:currentColor}.t{font:10px system-ui,sans-serif;fill:currentColor}</style>
  <line x1="10" y1="200" x2="350" y2="200" stroke="currentColor" stroke-width="1.5"/>
  <path d="M20 40 C 80 40, 90 190, 150 190 S 230 110, 260 110 S 330 190, 350 100" fill="none" stroke="#94a3b8" stroke-width="4"/>
  <line x1="20" y1="40" x2="350" y2="40" stroke="#34d399" stroke-dasharray="4 3"/>
  <text x="300" y="36" fill="#34d399">h₀</text>
  <rect x="12" y="26" width="16" height="10" rx="2" fill="#3b82f6"/>
  <rect x="142" y="176" width="16" height="10" rx="2" fill="#3b82f6"/>
  <rect x="252" y="96" width="16" height="10" rx="2" fill="#3b82f6"/>
  <line x1="150" y1="200" x2="150" y2="190" stroke="currentColor" opacity=".5"/>
  <line x1="260" y1="200" x2="260" y2="110" stroke="currentColor" opacity=".5" stroke-dasharray="2 2"/>
  <text x="264" y="160">h</text>
  ${bars(30, 60, 0)}
  <text x="30" y="162">PE</text><text x="44" y="162">KE</text><text x="58" y="162">${L('tot', 'tot')}</text>
  <text x="30" y="68" class="t">${L('top: all PE', 'puncak: semua EP')}</text>
  ${bars(96, 0, 60)}
  <text x="96" y="162">PE</text><text x="110" y="162">KE</text><text x="124" y="162">${L('tot', 'tot')}</text>
  <text x="90" y="80" class="t">${L('bottom: all KE', 'dasar: semua EK')}</text>
  <text x="90" y="92" class="t">v = √(2·g·h₀)</text>
  ${bars(290, 36, 24)}
  <text x="290" y="162">PE</text><text x="304" y="162">KE</text><text x="318" y="162">${L('tot', 'tot')}</text>
  <text x="270" y="80" class="t">${L('hump: PE + KE', 'bukit: EP + EK')}</text>
  <text x="10" y="222" class="t">PE = m·g·h    KE = ½·m·v²    PE + KE (+ ${L('heat', 'kalor')}) = m·g·h₀</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Gravitational potential energy: PE = m·g·h (joules), zero at ground level.',
        'Kinetic energy: KE = ½·m·v²; doubling the speed quadruples the kinetic energy.',
        'Without friction, PE + KE is constant, so the cart is fastest at the lowest point and can climb back only to its release height.',
        'Speed at height h: v = √(2·g·(h₀ − h)); it does not depend on the mass.',
        'Friction does work f·d that becomes heat; PE + KE + heat is still constant, but the cart loses height every swing.',
        'Work is energy transferred: W = F·d, also measured in joules.',
      ],
      id: [
        'Energi potensial gravitasi: EP = m·g·h (joule), nol di permukaan tanah.',
        'Energi kinetik: EK = ½·m·v²; menggandakan kelajuan melipatempatkan energi kinetik.',
        'Tanpa gesekan, EP + EK tetap, sehingga kereta paling cepat di titik terendah dan hanya bisa naik kembali sampai ketinggian pelepasannya.',
        'Kelajuan pada ketinggian h: v = √(2·g·(h₀ − h)); tidak bergantung pada massa.',
        'Gesekan melakukan usaha f·d yang menjadi kalor; EP + EK + kalor tetap, tetapi kereta kehilangan ketinggian tiap ayunan.',
        'Usaha adalah energi yang dipindahkan: W = F·d, juga diukur dalam joule.',
      ],
    },
    vocabulary: {
      en: [
        ['Energy', 'The capacity to do work, measured in joules (J). 1 J = 1 N·m.'],
        ['Potential energy (PE)', 'Energy stored because of position; for gravity PE = m·g·h.'],
        ['Kinetic energy (KE)', 'Energy of motion, KE = ½·m·v².'],
        ['Work (W)', 'Energy transferred when a force moves something: W = F·d.'],
        ['Conservation of energy', 'Energy cannot be created or destroyed, only transferred or changed in form; the total stays the same.'],
        ['Thermal energy (heat)', 'The energy of random particle motion; friction turns mechanical energy into it.'],
      ],
      id: [
        ['Energi', 'Kemampuan melakukan usaha, diukur dalam joule (J). 1 J = 1 N·m.'],
        ['Energi potensial (EP)', 'Energi yang tersimpan karena posisi; untuk gravitasi EP = m·g·h.'],
        ['Energi kinetik (EK)', 'Energi gerak, EK = ½·m·v².'],
        ['Usaha (W)', 'Energi yang dipindahkan ketika gaya menggerakkan sesuatu: W = F·d.'],
        ['Kekekalan energi', 'Energi tidak dapat diciptakan atau dimusnahkan, hanya dipindahkan atau diubah bentuknya; totalnya tetap.'],
        ['Energi termal (kalor)', 'Energi gerak acak partikel; gesekan mengubah energi mekanik menjadi energi ini.'],
      ],
    },
    misconceptions: {
      en: [
        ['A heavier cart goes faster down the same track.', 'Without friction both reach the same speed: the mass cancels in v = √(2·g·(h₀ − h)). The heavier cart has more energy, but needs more energy to reach the same speed.'],
        ['Energy is "used up" when the cart stops because of friction.', 'The energy is not gone; it has become heat in the track and wheels. The heat bar shows exactly how much.'],
        ['The cart can get over a hump as long as it is moving fast at the bottom.', 'It can only reach a hump lower than its release height (without friction). Speed at the bottom is fixed by h₀, and so is the maximum height it can regain.'],
        ['Doubling the release height doubles the top speed.', 'KE doubles, but v² doubles, so v grows by only √2 ≈ 1.41 times.'],
      ],
      id: [
        ['Kereta yang lebih berat meluncur lebih cepat di lintasan yang sama.', 'Tanpa gesekan keduanya mencapai kelajuan yang sama: massa saling meniadakan dalam v = √(2·g·(h₀ − h)). Kereta berat mempunyai energi lebih besar, tetapi juga butuh energi lebih besar untuk kelajuan yang sama.'],
        ['Energi "habis" ketika kereta berhenti karena gesekan.', 'Energinya tidak hilang; ia menjadi kalor di lintasan dan roda. Batang kalor menunjukkan jumlahnya dengan tepat.'],
        ['Kereta bisa melewati bukit asalkan cukup cepat di dasar.', 'Kereta hanya bisa mencapai bukit yang lebih rendah dari ketinggian pelepasannya (tanpa gesekan). Kelajuan di dasar ditentukan oleh h₀, begitu pula ketinggian maksimum yang bisa dicapai kembali.'],
        ['Menggandakan ketinggian pelepasan menggandakan kelajuan maksimum.', 'EK menjadi dua kali, tetapi yang dua kali adalah v², sehingga v hanya bertambah √2 ≈ 1,41 kali.'],
      ],
    },
    realWorld: {
      en: [
        'Real roller coasters are pulled up only the first hill; every later hill must be lower, because friction keeps turning energy into heat.',
        'Hydroelectric dams store water high up (PE) and let it fall through turbines to make electricity (KE → electrical).',
        'A pendulum clock and a child on a swing trade PE and KE back and forth, slowly losing energy to air resistance.',
        'Brake discs glow red on a mountain descent: the car\'s potential energy has become heat.',
        'Skate-park bowls are built so riders can pump back lost energy; without pumping each run is a little lower.',
      ],
      id: [
        'Roller coaster sungguhan hanya ditarik naik di bukit pertama; setiap bukit berikutnya harus lebih rendah, karena gesekan terus mengubah energi menjadi kalor.',
        'PLTA menyimpan air di tempat tinggi (EP) dan membiarkannya jatuh melalui turbin untuk menghasilkan listrik (EK → listrik).',
        'Jam bandul dan anak di ayunan menukar EP dan EK bolak-balik, perlahan kehilangan energi karena hambatan udara.',
        'Cakram rem membara merah saat turun gunung: energi potensial mobil telah menjadi kalor.',
        'Mangkuk skate park dibuat agar pemain bisa memompa kembali energi yang hilang; tanpa memompa, tiap luncuran sedikit lebih rendah.',
      ],
    },
    questions: {
      en: [
        { q: 'A 40 kg cart is released from 8 m on a frictionless track. What is its speed at a point 2 m above the ground?', a: 'v = √(2·g·(h₀ − h)) = √(2 × 9.8 × 6) = √117.6 ≈ 10.8 m/s. Check: PE lost = 40 × 9.8 × 6 = 2352 J = ½ × 40 × 10.8².' },
        { q: 'The same cart has 3136 J at the top. At the flag it has PE = 1200 J and KE = 1500 J. How much heat has friction produced?', a: 'Heat = 3136 − 1200 − 1500 = 436 J.' },
        { q: 'A 20 kg cart and an 80 kg cart are released from the same height with μ = 0. Which is faster at the bottom?', a: 'Neither: both have v = √(2·g·h₀). The 80 kg cart has four times the energy but also four times the mass.' },
        { q: 'With friction on, can the cart ever reach a point higher than where it was released? Explain with the energy bars.', a: 'No. Some of m·g·h₀ has already become heat, so the PE available is less than m·g·h₀, which means h < h₀.' },
      ],
      id: [
        { q: 'Kereta 40 kg dilepaskan dari 8 m di lintasan tanpa gesekan. Berapa kelajuannya di titik 2 m di atas tanah?', a: 'v = √(2·g·(h₀ − h)) = √(2 × 9,8 × 6) = √117,6 ≈ 10,8 m/s. Periksa: EP yang hilang = 40 × 9,8 × 6 = 2352 J = ½ × 40 × 10,8².' },
        { q: 'Kereta yang sama mempunyai 3136 J di puncak. Di bendera EP = 1200 J dan EK = 1500 J. Berapa kalor yang dihasilkan gesekan?', a: 'Kalor = 3136 − 1200 − 1500 = 436 J.' },
        { q: 'Kereta 20 kg dan 80 kg dilepaskan dari ketinggian sama dengan μ = 0. Mana yang lebih cepat di dasar?', a: 'Tidak ada: keduanya v = √(2·g·h₀). Kereta 80 kg energinya empat kali lebih besar tetapi massanya juga empat kali.' },
        { q: 'Dengan gesekan menyala, bisakah kereta mencapai titik yang lebih tinggi dari tempat pelepasannya? Jelaskan dengan batang energi.', a: 'Tidak. Sebagian m·g·h₀ sudah menjadi kalor, sehingga EP yang tersedia kurang dari m·g·h₀, artinya h < h₀.' },
      ],
    },
  },
};
