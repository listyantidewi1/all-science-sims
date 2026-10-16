// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Compare how much electricity different home appliances use, and spot the biggest energy user.',
      'Read an electricity meter in kilowatt-hours (kWh) and link it to the monthly bill in rupiah.',
      'Explain how LED bulbs and rooftop solar panels save energy or replace energy from the power station.',
    ],
    id: [
      'Membandingkan pemakaian listrik berbagai peralatan rumah, dan menemukan pemakai energi terbesar.',
      'Membaca meteran listrik dalam kilowatt-jam (kWh) dan menghubungkannya dengan tagihan bulanan dalam rupiah.',
      'Menjelaskan bagaimana bohlam LED dan panel surya di atap menghemat energi atau menggantikan energi dari pembangkit listrik.',
    ],
  },
  tryThis: {
    en: [
      'Switch everything on. Then turn appliances off one at a time and watch the meter. Which one makes the biggest drop?',
      'Turn on the LED bulbs. How many kWh per day do you save just by changing light bulbs?',
      'Try to win the challenge without switching the air conditioner off. Is it possible?',
      'Add the solar panels. What happens to the bill? Why does it not go to zero?',
    ],
    id: [
      'Nyalakan semuanya. Lalu matikan peralatan satu per satu dan perhatikan meterannya. Mana yang membuat penurunan terbesar?',
      'Nyalakan bohlam LED. Berapa kWh per hari yang kamu hemat hanya dengan mengganti bohlam?',
      'Coba menangkan tantangan tanpa mematikan AC. Apakah mungkin?',
      'Pasang panel surya. Apa yang terjadi pada tagihan? Mengapa tidak menjadi nol?',
    ],
  },

  learn: {
    background: {
      en: [
        'Every electrical appliance uses power, measured in watts (W). A bright old-style light bulb uses about 40 W, a fan about 50 W, a TV about 100 W, and an air conditioner about 800 W. Power is how fast an appliance uses energy. The energy itself is what you pay for, and it is measured in kilowatt-hours (kWh). One kWh is 1000 W used for one hour. So a 100 W TV on for 10 hours uses 1 kWh, and an 800 W air conditioner uses 1 kWh in just over an hour.',
        'The electricity meter in the sim adds up the energy of every appliance that is switched on, using typical hours per day: lights 6 hours, air conditioner 8 hours, fan 10 hours, TV 5 hours, water heater 1 hour, and the fridge, which runs on and off all day and night. The bill is the monthly energy multiplied by the price of electricity, about Rp 1,445 per kWh for many Indonesian homes. The air conditioner is usually the biggest user by far, because it uses a lot of power for many hours.',
        'There are two ways to lower the bill. The first is to use less: switch things off, use a fan instead of the air conditioner, and swap old bulbs for LED bulbs, which give the same light for about one sixth of the power. The second is to make your own electricity. A small rooftop solar system of about 1 kilowatt makes roughly 4 kWh on a sunny Indonesian day. That energy replaces energy from the power station, which often burns coal and releases carbon dioxide. Saving energy at home is one of the easiest ways to help slow climate change.',
      ],
      id: [
        'Setiap peralatan listrik memakai daya, yang diukur dalam watt (W). Bohlam lama yang terang memakai sekitar 40 W, kipas sekitar 50 W, TV sekitar 100 W, dan AC sekitar 800 W. Daya adalah seberapa cepat peralatan memakai energi. Energinya sendiri yang kamu bayar, dan diukur dalam kilowatt-jam (kWh). Satu kWh adalah 1000 W yang dipakai selama satu jam. Jadi TV 100 W yang menyala 10 jam memakai 1 kWh, dan AC 800 W memakai 1 kWh dalam waktu sedikit lebih dari satu jam.',
        'Meteran listrik di simulasi menjumlahkan energi setiap peralatan yang menyala, dengan lama pemakaian yang umum per hari: lampu 6 jam, AC 8 jam, kipas 10 jam, TV 5 jam, pemanas air 1 jam, dan kulkas, yang hidup-mati sepanjang hari dan malam. Tagihan adalah energi sebulan dikalikan harga listrik, sekitar Rp 1.445 per kWh untuk banyak rumah di Indonesia. AC biasanya pemakai terbesar, karena memakai daya besar selama berjam-jam.',
        'Ada dua cara menurunkan tagihan. Pertama, memakai lebih sedikit: matikan peralatan, pakai kipas daripada AC, dan ganti bohlam lama dengan bohlam LED, yang memberi cahaya sama dengan dayanya hanya sekitar seperenam. Kedua, membuat listrik sendiri. Sistem panel surya kecil di atap sekitar 1 kilowatt menghasilkan kira-kira 4 kWh pada hari yang cerah di Indonesia. Energi itu menggantikan energi dari pembangkit listrik, yang sering membakar batu bara dan melepaskan karbon dioksida. Menghemat energi di rumah adalah salah satu cara termudah membantu memperlambat perubahan iklim.',
      ],
    },
    figure: {
      caption: {
        en: 'Energy used per day by each appliance in the sim, with typical hours of use. Energy (kWh) = power (kW) × hours. The air conditioner alone uses more than everything else together.',
        id: 'Energi yang dipakai per hari oleh tiap peralatan di simulasi, dengan lama pemakaian yang umum. Energi (kWh) = daya (kW) × jam. AC sendiri memakai lebih banyak daripada semua yang lain digabungkan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const rows = [
          [L('air conditioner', 'AC'), '800 W × 8 h', 6.4, '#ef4444'],
          [L('old bulbs (8)', 'bohlam lama (8)'), '320 W × 6 h', 1.92, '#f59e0b'],
          [L('water heater', 'pemanas air'), '1500 W × 1 h', 1.5, '#f97316'],
          [L('fridge', 'kulkas'), '45 W × 24 h', 1.08, '#38bdf8'],
          [L('TV', 'TV'), '100 W × 5 h', 0.5, '#a78bfa'],
          [L('fan', 'kipas'), '50 W × 10 h', 0.5, '#22c55e'],
          [L('LED bulbs (8)', 'bohlam LED (8)'), '56 W × 6 h', 0.34, '#facc15'],
        ];
        const bars = rows.map((r, i) => {
          const y = 34 + i * 27, w = Math.max(2, (r[2] / 6.4) * 150);
          return `<text x="112" y="${y + 12}" text-anchor="end">${r[0]}</text><rect x="118" y="${y}" width="${w.toFixed(1)}" height="17" rx="3" fill="${r[3]}"/><text x="${(124 + w).toFixed(1)}" y="${y + 12}" style="font-weight:bold">${r[2]} kWh</text><text x="${(124 + w).toFixed(1)}" y="${y + 12}" dx="${(String(r[2]).length * 6.5 + 32).toFixed(0)}" style="font-size:9px;opacity:.7">${r[1]}</text>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Bar chart of daily energy use per appliance', 'Diagram batang energi harian per peralatan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}</style>
  <text x="180" y="18" text-anchor="middle" style="font-weight:bold">${L('Energy per day (kWh)', 'Energi per hari (kWh)')}</text>
  ${bars}
  <text x="180" y="234" text-anchor="middle" style="font-size:10px;opacity:.8">${L('1 kWh ≈ Rp 1,445 · all on with old bulbs ≈ 11.9 kWh/day ≈ Rp 516,000/month', '1 kWh ≈ Rp 1.445 · semua menyala dengan bohlam lama ≈ 11,9 kWh/hari ≈ Rp 516.000/bulan')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Power (watts) is how fast an appliance uses energy; energy (kWh) is power multiplied by time, and that is what the bill charges for.',
        'The air conditioner is usually the biggest energy user in a home because it has high power and runs for many hours.',
        'LED bulbs give the same light for about one sixth of the power of old bulbs.',
        'Rooftop solar panels make electricity from sunlight, so the house takes less from the power station.',
        'Saving electricity saves money and cuts the carbon dioxide released by power stations.',
      ],
      id: [
        'Daya (watt) adalah seberapa cepat peralatan memakai energi; energi (kWh) adalah daya dikalikan waktu, dan itulah yang ditagih.',
        'AC biasanya pemakai energi terbesar di rumah karena dayanya besar dan menyala berjam-jam.',
        'Bohlam LED memberi cahaya yang sama dengan daya hanya sekitar seperenam bohlam lama.',
        'Panel surya di atap membuat listrik dari sinar matahari, sehingga rumah mengambil lebih sedikit dari pembangkit listrik.',
        'Menghemat listrik menghemat uang dan mengurangi karbon dioksida yang dilepaskan pembangkit listrik.',
      ],
    },
    vocabulary: {
      en: [
        ['Watt (W)', 'The unit of power: how fast energy is used. A fan uses about 50 W.'],
        ['Kilowatt-hour (kWh)', 'The unit of electrical energy on your bill: 1000 watts used for one hour.'],
        ['Electricity meter', 'The box that counts the kWh a house uses; the company reads it to make the bill.'],
        ['LED bulb', 'A light bulb that uses very little power and lasts a long time.'],
        ['Solar panel', 'A flat panel that turns sunlight into electricity.'],
        ['Renewable energy', 'Energy from sources that do not run out, such as sunlight, wind and flowing water.'],
      ],
      id: [
        ['Watt (W)', 'Satuan daya: seberapa cepat energi dipakai. Kipas memakai sekitar 50 W.'],
        ['Kilowatt-jam (kWh)', 'Satuan energi listrik di tagihan: 1000 watt yang dipakai selama satu jam.'],
        ['Meteran listrik', 'Kotak yang menghitung kWh yang dipakai rumah; perusahaan listrik membacanya untuk membuat tagihan.'],
        ['Bohlam LED', 'Bohlam yang memakai daya sangat kecil dan tahan lama.'],
        ['Panel surya', 'Lempeng datar yang mengubah sinar matahari menjadi listrik.'],
        ['Energi terbarukan', 'Energi dari sumber yang tidak habis, seperti sinar matahari, angin, dan air mengalir.'],
      ],
    },
    misconceptions: {
      en: [
        ['Lights are the biggest waste of electricity, so switching them off solves everything.', 'Lights matter, but one air conditioner uses more than all the lights, TV and fan together. Switching off lights is good; using the air conditioner less is far better.'],
        ['A fridge uses little energy because it is quiet.', 'The fridge is on 24 hours a day, so even its small power adds up to about 1 kWh every day. Keeping its door shut helps.'],
        ['Solar panels mean free, unlimited electricity.', 'A rooftop system only makes a few kWh a day and nothing at night. It lowers the bill but a normal house still needs power from the grid.'],
        ['Switching the TV to standby means it uses no power.', 'Many devices on standby still use a few watts all day long. Switching off at the plug saves more.'],
      ],
      id: [
        ['Lampu adalah pemborosan listrik terbesar, jadi mematikannya menyelesaikan semuanya.', 'Lampu memang penting, tetapi satu AC memakai lebih banyak daripada semua lampu, TV, dan kipas digabung. Mematikan lampu itu baik; mengurangi pemakaian AC jauh lebih baik.'],
        ['Kulkas memakai sedikit energi karena tidak bersuara.', 'Kulkas menyala 24 jam sehari, jadi dayanya yang kecil tetap terkumpul menjadi sekitar 1 kWh setiap hari. Menjaga pintunya tertutup membantu.'],
        ['Panel surya berarti listrik gratis tanpa batas.', 'Sistem di atap hanya menghasilkan beberapa kWh sehari dan tidak menghasilkan apa pun di malam hari. Tagihan turun, tetapi rumah biasa tetap butuh listrik dari jaringan.'],
        ['Mengubah TV ke mode siaga berarti tidak memakai daya.', 'Banyak perangkat dalam mode siaga tetap memakai beberapa watt sepanjang hari. Mematikan dari stopkontak lebih hemat.'],
      ],
    },
    realWorld: {
      en: [
        'PLN charges most Indonesian homes about Rp 1,445 per kWh; a family that uses 300 kWh a month pays over Rp 430,000.',
        'Indonesia\'s government offers rooftop solar schemes so homes can send spare daytime electricity back to the grid.',
        'Setting an air conditioner to 25 °C instead of 18 °C can cut its energy use by a quarter or more.',
        'Appliances in shops carry energy labels with stars; more stars means less electricity for the same job.',
        'Schools that switch to LED lighting often cut their lighting bill by more than half in the first year.',
      ],
      id: [
        'PLN menagih sebagian besar rumah di Indonesia sekitar Rp 1.445 per kWh; keluarga yang memakai 300 kWh sebulan membayar lebih dari Rp 430.000.',
        'Pemerintah Indonesia menyediakan skema PLTS atap agar rumah bisa mengirim kelebihan listrik siang hari kembali ke jaringan.',
        'Mengatur AC pada 25 °C daripada 18 °C bisa memangkas pemakaian energinya seperempat atau lebih.',
        'Peralatan di toko memakai label energi berbintang; semakin banyak bintang, semakin sedikit listrik untuk pekerjaan yang sama.',
        'Sekolah yang beralih ke lampu LED sering memangkas tagihan penerangannya lebih dari setengah pada tahun pertama.',
      ],
    },
    questions: {
      en: [
        { q: 'A 100 W TV is on for 5 hours a day. How many kWh does it use in a day, and in a 30-day month?', a: '100 W × 5 h = 500 Wh = 0.5 kWh per day. In 30 days that is 15 kWh, about Rp 21,700.' },
        { q: 'You switch all 8 old bulbs for LEDs. The meter drops from 11.9 to about 10.3 kWh per day. How much is that per month in rupiah?', a: 'The saving is about 1.6 kWh per day, or 48 kWh per month. At Rp 1,445 per kWh that is about Rp 69,000 saved every month.' },
        { q: 'Why does the challenge not count if you switch the fridge off?', a: 'Saving energy must not harm health or safety. A fridge keeps food from spoiling, so a sensible energy plan keeps it on and saves elsewhere, for example on the air conditioner.' },
      ],
      id: [
        { q: 'TV 100 W menyala 5 jam sehari. Berapa kWh yang dipakainya dalam sehari, dan dalam sebulan 30 hari?', a: '100 W × 5 jam = 500 Wh = 0,5 kWh per hari. Dalam 30 hari menjadi 15 kWh, sekitar Rp 21.700.' },
        { q: 'Kamu mengganti 8 bohlam lama dengan LED. Meteran turun dari 11,9 menjadi sekitar 10,3 kWh per hari. Berapa hematnya per bulan dalam rupiah?', a: 'Hematnya sekitar 1,6 kWh per hari, atau 48 kWh per bulan. Dengan harga Rp 1.445 per kWh, hematnya sekitar Rp 69.000 setiap bulan.' },
        { q: 'Mengapa tantangan tidak dihitung jika kulkas dimatikan?', a: 'Menghemat energi tidak boleh membahayakan kesehatan atau keselamatan. Kulkas menjaga makanan agar tidak basi, jadi rencana hemat energi yang bijak tetap menyalakannya dan berhemat di tempat lain, misalnya pada AC.' },
      ],
    },
  },
};
