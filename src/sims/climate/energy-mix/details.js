// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See the cost-emissions-reliability trilemma in numbers.',
      'Understand why "100% renewable" is hard without storage or hydro.',
      'Compare your portfolio to historical and policy-target mixes.',
    ],
    id: [
      'Melihat trilema biaya-emisi-keandalan dalam angka.',
      'Memahami mengapa "100% terbarukan" sulit tanpa penyimpanan atau hidro.',
      'Membandingkan portofolio Anda dengan bauran historis dan target kebijakan.',
    ],
  },
  tryThis: {
    en: [
      'Preset "all coal" — cheap and reliable, terrible CO₂.',
      'Preset "all renewable" — zero CO₂ but reliability score collapses.',
      'Try a Nordic-like 60% hydro + 30% nuclear mix — low CO₂, high reliability, moderate cost.',
    ],
    id: [
      'Preset "semua batubara" — murah dan andal, CO₂ buruk.',
      'Preset "semua terbarukan" — CO₂ nol tetapi skor keandalan runtuh.',
      'Coba bauran ala Nordik 60% hidro + 30% nuklir — CO₂ rendah, andal, biaya sedang.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Electricity can be made in many ways: by burning coal or natural gas, by splitting uranium atoms in a nuclear reactor, by letting water fall through a dam, or by catching wind and sunlight. Every source has a different mix of strengths and weaknesses. Burning fossil fuels releases carbon dioxide, the main greenhouse gas warming the planet; wind and sunlight are free but come and go with the weather; nuclear and hydro run steadily but need big, expensive plants or the right geography. A country choosing its electricity mix is really choosing which problems it is willing to live with.',
        'The simulation scores any mix on three numbers. CO₂ intensity is measured in grams of CO₂-equivalent per kilowatt-hour, counted over the whole life of the plant, including mining, building and fuel. The sim uses typical lifecycle estimates: about 820 g/kWh for coal, 490 for gas, 45 for solar, 24 for hydro, 12 for nuclear and 11 for wind. Cost is a rough average price per megawatt-hour. For both of these, the dashboard simply takes each source\'s share of the mix times its value and adds everything up, so they are weighted averages.',
        'Reliability is modelled differently, because this is where variable sources bite. Each source gets a "firmness" score for how well it can deliver power on demand: 1.0 for coal, gas and nuclear, 0.85 for hydro, 0.4 for wind and 0.3 for solar. The sim averages these by share, then subtracts an extra penalty once wind and solar together exceed 30% of the mix. The penalty grows with the square of the excess, which is why the reliability score falls gently at first and then collapses. This stands in for the real-world need for storage, backup plants or long-distance grids when the weather supplies most of the power.',
        'The six sliders set each source\'s share; the sim always rescales them so the total is 100%, so pushing one up pulls the others down. The presets give you starting points to compare. Remember what the model leaves out: costs are fixed even though solar and wind costs fell steeply during the 2010s, there is no battery storage, no transmission network, no daily demand curve, no air pollution or land use, and hydro is treated as available everywhere even though it needs rivers and rainfall. The sim is a tool for seeing trade-offs, not a planning model.',
      ],
      id: [
        'Listrik bisa dibangkitkan dengan banyak cara: membakar batubara atau gas alam, membelah atom uranium di reaktor nuklir, mengalirkan air dari bendungan, atau menangkap angin dan sinar matahari. Setiap sumber punya kelebihan dan kekurangan yang berbeda. Membakar bahan bakar fosil melepaskan karbon dioksida, gas rumah kaca utama yang memanaskan Bumi; angin dan sinar matahari gratis tetapi datang dan pergi mengikuti cuaca; nuklir dan hidro berjalan stabil tetapi memerlukan pembangkit besar yang mahal atau kondisi geografis yang tepat. Ketika sebuah negara memilih bauran listriknya, sebenarnya ia memilih masalah mana yang bersedia ia tanggung.',
        'Simulasi ini menilai setiap bauran dengan tiga angka. Intensitas CO₂ diukur dalam gram CO₂-ekuivalen per kilowatt-jam, dihitung sepanjang umur pembangkit, termasuk penambangan, pembangunan, dan bahan bakar. Sim memakai perkiraan daur hidup yang umum dipakai: sekitar 820 g/kWh untuk batubara, 490 untuk gas, 45 untuk surya, 24 untuk hidro, 12 untuk nuklir, dan 11 untuk angin. Biaya adalah harga rata-rata kasar per megawatt-jam. Untuk kedua angka ini dasbor hanya mengalikan porsi tiap sumber dengan nilainya lalu menjumlahkan semuanya, jadi keduanya adalah rata-rata berbobot.',
        'Keandalan dimodelkan dengan cara lain, karena di sinilah sumber yang berubah-ubah menjadi masalah. Tiap sumber mendapat skor "kepastian" seberapa baik ia bisa menyuplai daya saat diminta: 1,0 untuk batubara, gas, dan nuklir; 0,85 untuk hidro; 0,4 untuk angin; dan 0,3 untuk surya. Sim merata-ratakan skor itu menurut porsi, lalu mengurangi penalti tambahan begitu angin dan surya bersama-sama melewati 30% bauran. Penalti ini bertambah sebanding dengan kuadrat kelebihannya, sehingga skor keandalan turun pelan di awal lalu runtuh. Ini mewakili kebutuhan nyata akan penyimpanan, pembangkit cadangan, atau jaringan jarak jauh ketika sebagian besar daya bergantung pada cuaca.',
        'Enam slider mengatur porsi tiap sumber; sim selalu menyesuaikan ulang agar totalnya 100%, jadi menaikkan satu sumber otomatis menurunkan yang lain. Preset memberi titik awal untuk dibandingkan. Ingat apa yang tidak dimodelkan: biaya dibuat tetap padahal biaya surya dan angin turun tajam sepanjang 2010-an, tidak ada baterai penyimpan, tidak ada jaringan transmisi, tidak ada kurva permintaan harian, tidak ada polusi udara atau tata guna lahan, dan hidro dianggap tersedia di mana saja padahal butuh sungai dan curah hujan. Sim ini alat untuk melihat trade-off, bukan model perencanaan.',
      ],
    },
    figure: {
      caption: {
        en: 'Replacing gas with wind and solar: CO₂ intensity falls in a straight line (weighted average), but the reliability score bends sharply downward once variable sources pass 30% of the mix, because of the sim\'s squared penalty.',
        id: 'Mengganti gas dengan angin dan surya: intensitas CO₂ turun lurus (rata-rata berbobot), tetapi skor keandalan membelok tajam ke bawah begitu sumber variabel melewati 30% bauran, akibat penalti kuadrat dalam sim.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('CO2 and reliability versus share of wind and solar', 'CO2 dan keandalan terhadap porsi angin dan surya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.m{stroke:currentColor;stroke-width:1;opacity:.35;fill:none}.c{fill:none;stroke-width:2.4}</style>
  <line x1="50" y1="200" x2="330" y2="200" class="ax"/>
  <line x1="50" y1="200" x2="50" y2="25" class="ax"/>
  <line x1="330" y1="200" x2="330" y2="25" class="ax"/>
  <line x1="134" y1="200" x2="134" y2="30" class="m" stroke-dasharray="4 4"/>
  <text x="124" y="214">30%</text>
  <text x="46" y="214">0%</text>
  <text x="310" y="214">100%</text>
  <text x="90" y="232">${L('share of wind + solar in the mix', 'porsi angin + surya dalam bauran')}</text>
  <text x="14" y="36" fill="#ef4444">500</text>
  <text x="14" y="120" fill="#ef4444">250</text>
  <text x="26" y="204" fill="#ef4444">0</text>
  <text x="4" y="18" fill="#ef4444">g CO₂/kWh</text>
  <text x="336" y="36" fill="#3b82f6">100</text>
  <text x="336" y="120" fill="#3b82f6">50</text>
  <text x="336" y="204" fill="#3b82f6">0</text>
  <text x="300" y="18" fill="#3b82f6">${L('reliability %', 'keandalan %')}</text>
  <line x1="50" y1="33" x2="330" y2="190" class="c" stroke="#ef4444"/>
  <polyline points="50,30 92,46 134,63 162,77 190,96 218,119 246,148 274,182 287,200 330,200" class="c" stroke="#3b82f6"/>
  <text x="200" y="78" fill="#ef4444">${L('CO₂ falls steadily', 'CO₂ turun teratur')}</text>
  <text x="148" y="150" fill="#3b82f6">${L('reliability collapses', 'keandalan runtuh')}</text>
  <text x="140" y="42">${L('penalty starts', 'penalti mulai')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'CO₂ intensity and cost are weighted averages: each source\'s share times its value, added up.',
        'No single source wins on all three axes, so every mix is a compromise.',
        'Wind and solar are cheap and clean but variable; past about 30% of the mix the sim\'s reliability score drops steeply.',
        'Hydro and nuclear are the low-carbon sources that also score as firm power, which is why they appear in most low-CO₂, high-reliability mixes.',
        'Swapping coal for gas roughly halves emissions, but gas alone cannot get close to a near-zero target.',
      ],
      id: [
        'Intensitas CO₂ dan biaya adalah rata-rata berbobot: porsi tiap sumber dikali nilainya, lalu dijumlahkan.',
        'Tidak ada satu sumber yang unggul di ketiga sumbu, sehingga setiap bauran adalah kompromi.',
        'Angin dan surya murah dan bersih tetapi berubah-ubah; melewati sekitar 30% bauran, skor keandalan dalam sim turun tajam.',
        'Hidro dan nuklir adalah sumber rendah karbon yang juga dinilai sebagai daya pasti, karena itu keduanya muncul di hampir semua bauran rendah CO₂ berkeandalan tinggi.',
        'Mengganti batubara dengan gas memangkas emisi kira-kira setengahnya, tetapi gas saja tidak bisa mendekati target hampir nol.',
      ],
    },
    vocabulary: {
      en: [
        ['Energy mix', 'The shares of each source (coal, gas, nuclear, hydro, wind, solar) in a region\'s electricity supply.'],
        ['CO₂ intensity', 'Grams of CO₂-equivalent emitted per kilowatt-hour of electricity, averaged over the plant\'s whole life.'],
        ['Lifecycle emissions', 'Emissions counted from mining and construction through operation to decommissioning, not only from the smokestack.'],
        ['Kilowatt-hour (kWh)', 'The energy used by a 1000 W appliance running for one hour; a megawatt-hour (MWh) is 1000 kWh.'],
        ['Firm (dispatchable) power', 'Generation that can be turned up or down when needed, regardless of the weather.'],
        ['Variable renewables', 'Wind and solar, whose output depends on the weather and the time of day.'],
        ['Trilemma', 'A situation with three goals, where improving any two tends to worsen the third.'],
      ],
      id: [
        ['Bauran energi', 'Porsi tiap sumber (batubara, gas, nuklir, hidro, angin, surya) dalam pasokan listrik suatu wilayah.'],
        ['Intensitas CO₂', 'Gram CO₂-ekuivalen yang dilepaskan per kilowatt-jam listrik, dirata-ratakan sepanjang umur pembangkit.'],
        ['Emisi daur hidup', 'Emisi yang dihitung dari penambangan dan pembangunan, pengoperasian, sampai pembongkaran, bukan hanya dari cerobong.'],
        ['Kilowatt-jam (kWh)', 'Energi yang dipakai alat 1000 W selama satu jam; satu megawatt-jam (MWh) sama dengan 1000 kWh.'],
        ['Daya pasti (dispatchable)', 'Pembangkitan yang bisa dinaikkan atau diturunkan saat dibutuhkan, tidak bergantung cuaca.'],
        ['Energi terbarukan variabel', 'Angin dan surya, yang keluarannya bergantung pada cuaca dan waktu dalam sehari.'],
        ['Trilema', 'Keadaan dengan tiga tujuan, di mana memperbaiki dua di antaranya cenderung memperburuk yang ketiga.'],
      ],
    },
    misconceptions: {
      en: [
        ['Wind and solar have zero emissions.', 'Running them emits nothing, but building, transporting and recycling the panels and turbines does. Lifecycle emissions are low (roughly 10 to 50 g/kWh) but not zero, which is why "all renewable" does not read 0 in the sim.'],
        ['The cheapest source per kWh is automatically the best choice.', 'Cheap variable power still needs backup or storage when the wind drops, and that cost is not in the per-kWh price. The sim shows this as a falling reliability score rather than a rising cost.'],
        ['Nuclear power is a major CO₂ emitter.', 'Lifecycle emissions of nuclear are among the lowest of any source, similar to wind. Its drawbacks are cost, construction time and waste, not greenhouse gases.'],
        ['Natural gas is a clean fuel.', 'Gas is cleaner than coal, at roughly 490 versus 820 g/kWh, but that is still far above every low-carbon source and about ten times the sim\'s 5% target line.'],
      ],
      id: [
        ['Angin dan surya sama sekali tidak menghasilkan emisi.', 'Saat beroperasi memang tidak, tetapi membangun, mengangkut, dan mendaur ulang panel serta turbin menghasilkan emisi. Emisi daur hidupnya rendah (sekitar 10 sampai 50 g/kWh) tetapi tidak nol, karena itu preset "semua terbarukan" tidak menunjukkan 0 di sim.'],
        ['Sumber termurah per kWh otomatis pilihan terbaik.', 'Daya variabel yang murah tetap butuh cadangan atau penyimpanan saat angin berhenti, dan biaya itu tidak termasuk dalam harga per kWh. Sim menampilkannya sebagai skor keandalan yang turun, bukan sebagai biaya yang naik.'],
        ['PLTN adalah penghasil CO₂ yang besar.', 'Emisi daur hidup nuklir termasuk yang terendah dari semua sumber, setara dengan angin. Kekurangannya adalah biaya, lama pembangunan, dan limbah, bukan gas rumah kaca.'],
        ['Gas alam adalah bahan bakar bersih.', 'Gas lebih bersih daripada batubara, sekitar 490 berbanding 820 g/kWh, tetapi itu masih jauh di atas semua sumber rendah karbon dan sekitar sepuluh kali garis target 5% dalam sim.'],
      ],
    },
    realWorld: {
      en: [
        'Norway generates almost all of its electricity from hydro, which is why a "Nordic-like" mix scores low CO₂ and high reliability at the same time.',
        'France built a fleet of nuclear reactors in the 1970s and 1980s and still gets most of its electricity from them, giving one of the lowest-carbon grids in Europe.',
        'Indonesia\'s grid relies heavily on coal, so its electricity has a high CO₂ intensity; expanding geothermal, hydro and solar is central to its emission plans.',
        'Grid operators in places with lots of solar must handle the evening ramp, when solar output disappears just as household demand peaks, using gas plants, hydro or batteries.',
      ],
      id: [
        'Norwegia membangkitkan hampir seluruh listriknya dari hidro, karena itu bauran "ala Nordik" mendapat CO₂ rendah sekaligus keandalan tinggi.',
        'Prancis membangun banyak reaktor nuklir pada 1970-an dan 1980-an dan sampai kini masih mendapat sebagian besar listriknya dari sana, menjadikan jaringannya salah satu yang paling rendah karbon di Eropa.',
        'Jaringan listrik Indonesia sangat bergantung pada batubara, sehingga intensitas CO₂ listriknya tinggi; perluasan panas bumi, hidro, dan surya menjadi inti rencana penurunan emisinya.',
        'Operator jaringan di daerah yang banyak PLTS harus menangani lonjakan sore hari, ketika keluaran surya hilang tepat saat permintaan rumah tangga memuncak, dengan pembangkit gas, hidro, atau baterai.',
      ],
    },
    questions: {
      en: [
        { q: 'A mix is 50% gas and 50% wind. Using the sim\'s numbers, what are its CO₂ intensity, cost and reliability score?', a: 'CO₂: 0.5 × 490 + 0.5 × 11 ≈ 250 g/kWh. Cost: 0.5 × 60 + 0.5 × 45 ≈ $53/MWh. Reliability: the weighted average is 0.5 × 1.0 + 0.5 × 0.4 = 0.70; wind is 20 points over the 30% line, so the penalty is 1.5 × 0.2² = 0.06, giving 0.64, or 64%.' },
        { q: 'The "All renewable" preset has 30% hydro, yet its reliability score is only about 27%. Why so low?', a: 'Wind plus solar make up 70% of that mix. The weighted average of firmness is 0.3 × 0.85 + 0.4 × 0.4 + 0.3 × 0.3 ≈ 0.51, and the squared penalty for being 40 points over the 30% line removes another 1.5 × 0.4² = 0.24, leaving about 0.27. In reality this stands for the storage and backup such a grid would need.' },
        { q: 'Why does a mix built mostly from hydro and nuclear score well on both CO₂ and reliability, and what stops every country from copying it?', a: 'Both sources have lifecycle emissions near 10 to 25 g/kWh and a firmness score near 1, so they pull CO₂ down without the variability penalty. But large hydro needs suitable rivers and rainfall, and nuclear plants are expensive and slow to build, so the mix depends on geography and investment that many countries do not have.' },
      ],
      id: [
        { q: 'Sebuah bauran terdiri dari 50% gas dan 50% angin. Dengan angka di sim, berapa intensitas CO₂, biaya, dan skor keandalannya?', a: 'CO₂: 0,5 × 490 + 0,5 × 11 ≈ 250 g/kWh. Biaya: 0,5 × 60 + 0,5 × 45 ≈ $53/MWh. Keandalan: rata-rata berbobotnya 0,5 × 1,0 + 0,5 × 0,4 = 0,70; angin melewati garis 30% sebesar 20 poin, jadi penaltinya 1,5 × 0,2² = 0,06, sehingga hasilnya 0,64 atau 64%.' },
        { q: 'Preset "All renewable" punya 30% hidro, tetapi skor keandalannya hanya sekitar 27%. Mengapa begitu rendah?', a: 'Angin dan surya menyusun 70% bauran itu. Rata-rata berbobot kepastiannya 0,3 × 0,85 + 0,4 × 0,4 + 0,3 × 0,3 ≈ 0,51, dan penalti kuadrat karena melewati garis 30% sebesar 40 poin mengurangi lagi 1,5 × 0,4² = 0,24, sehingga tersisa sekitar 0,27. Dalam kenyataan, ini mewakili penyimpanan dan cadangan yang dibutuhkan jaringan seperti itu.' },
        { q: 'Mengapa bauran yang sebagian besar hidro dan nuklir mendapat nilai bagus untuk CO₂ sekaligus keandalan, dan apa yang menghalangi setiap negara menirunya?', a: 'Keduanya punya emisi daur hidup sekitar 10 sampai 25 g/kWh dan skor kepastian mendekati 1, sehingga menurunkan CO₂ tanpa penalti variabilitas. Namun PLTA besar membutuhkan sungai dan curah hujan yang cocok, dan PLTN mahal serta lama dibangun, jadi bauran itu bergantung pada geografi dan investasi yang tidak dimiliki banyak negara.' },
      ],
    },
  },
};
