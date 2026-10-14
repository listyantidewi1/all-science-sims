// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply Sharpe = (μ − rᶠ) / σ.',
      'See risk adjustment change which fund "wins".',
      "Recognize that high return alone isn't a fair comparison.",
    ],
    id: [
      'Menerapkan Sharpe = (µ − rᶠ) / σ.',
      'Melihat penyesuaian risiko mengubah fund mana yang "menang".',
      'Mengenali bahwa return tinggi saja bukan perbandingan adil.',
    ],
  },
  tryThis: {
    en: [
      'Set rᶠ to 0 — does the high-vol fund still win on Sharpe?',
      'Crank rᶠ to 5% — does anyone have negative Sharpe?',
      'Tweak fund volatilities — find the rank inversion.',
    ],
    id: [
      'Atur rᶠ ke 0 — apakah fund volatil tinggi tetap menang Sharpe?',
      'Naikkan rᶠ ke 5% — adakah yang Sharpe negatif?',
      'Atur volatilitas tiap fund — temukan inversi peringkat.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Comparing two investments by their average return alone leaves out half the story: how bumpy the ride was. The Sharpe ratio, proposed by William Sharpe in 1966, asks how much extra return an investment earned for each unit of risk it took. It is written Sharpe = (μ − r_f) / σ, where μ is the average yearly return, r_f is the risk-free rate (what a very safe asset such as a short-term government bill pays) and σ is the volatility, the standard deviation of the yearly returns. Subtracting r_f matters because that much return was available with no risk at all; only the excess return μ − r_f is a reward for taking risk.',
        'The simulation plots three sample funds on a risk–return chart, with volatility along the bottom and return up the side. The yellow dot on the left edge is the risk-free asset: zero volatility, return r_f. Each fund\'s Sharpe ratio is simply the slope of the straight line from that yellow dot to the fund\'s dot, so the steepest line wins, no matter how high the dot sits. The dashed line through the best fund is the capital allocation line: any mix of that fund with the risk-free asset lands somewhere on it. The panel on the right ranks the funds and colours a Sharpe ratio above 1 green, between 0 and 1 yellow, and below 0 red.',
        'Drag any dot, or use the sliders, to change a fund\'s μ and σ, and move the r_f slider to shift the anchor point. Raising r_f subtracts the same amount from every fund\'s return, but that loss is then divided by very different volatilities, so low-return, low-risk funds are hurt most. With the default funds and r_f = 3%, the steady bond fund ranks first (0.50); at r_f = 5% its excess return disappears, its Sharpe ratio drops to zero, and the volatile fund moves to the top. The ranking is not a fixed property of the funds; it depends on the alternative you compare them with.',
        'The simulation treats μ and σ as known numbers that you type in. In reality both are estimated from past returns, are uncertain, and change over time, and a fund that looks good over one five-year window may look poor over the next. The ratio also counts upward swings as risk just like downward ones, works best when returns are roughly bell-shaped, and says nothing about rare crashes, fees, taxes or how long you plan to stay invested. It is a tool for making comparisons fairer, not a forecast, and nothing here is investment advice.',
      ],
      id: [
        'Membandingkan dua investasi hanya dari rata-rata imbal hasilnya mengabaikan separuh cerita: seberapa bergejolak perjalanannya. Rasio Sharpe, yang diusulkan William Sharpe pada 1966, menanyakan berapa banyak imbal hasil ekstra yang diperoleh sebuah investasi untuk setiap satuan risiko yang diambilnya. Rumusnya Sharpe = (μ − r_f) / σ, dengan μ rata-rata imbal hasil tahunan, r_f suku bunga bebas risiko (imbal hasil aset yang sangat aman seperti surat utang negara jangka pendek), dan σ volatilitas, yaitu simpangan baku imbal hasil tahunan. Pengurangan dengan r_f penting karena imbal hasil sebesar itu bisa didapat tanpa risiko sama sekali; hanya kelebihan imbal hasil μ − r_f yang merupakan imbalan atas risiko yang diambil.',
        'Simulasi ini menempatkan tiga reksa dana contoh pada grafik risiko–imbal hasil, dengan volatilitas pada sumbu mendatar dan imbal hasil pada sumbu tegak. Titik kuning di tepi kiri adalah aset bebas risiko: volatilitas nol, imbal hasil r_f. Rasio Sharpe tiap reksa dana tidak lain adalah kemiringan garis lurus dari titik kuning itu ke titik reksa dana tersebut, sehingga garis paling curamlah yang menang, setinggi apa pun letak titiknya. Garis putus-putus yang melewati reksa dana terbaik adalah garis alokasi modal: campuran apa pun antara reksa dana itu dan aset bebas risiko akan berada di garis tersebut. Panel di kanan mengurutkan reksa dana dan memberi warna hijau untuk Sharpe di atas 1, kuning antara 0 dan 1, serta merah di bawah 0.',
        'Seret titik mana pun, atau gunakan slider, untuk mengubah μ dan σ sebuah reksa dana, dan geser slider r_f untuk memindahkan titik acuan. Menaikkan r_f mengurangi imbal hasil setiap reksa dana dengan jumlah yang sama, tetapi pengurangan itu lalu dibagi dengan volatilitas yang sangat berbeda, sehingga reksa dana berimbal hasil rendah dan berisiko rendah paling terpukul. Dengan reksa dana bawaan dan r_f = 3%, reksa dana obligasi yang stabil menempati peringkat pertama (0,50); pada r_f = 5% kelebihan imbal hasilnya hilang, rasio Sharpe-nya jatuh ke nol, dan reksa dana yang volatil naik ke puncak. Peringkat bukan sifat tetap reksa dana; ia bergantung pada alternatif yang menjadi pembanding.',
        'Simulasi memperlakukan μ dan σ sebagai angka pasti yang kamu masukkan. Kenyataannya keduanya ditaksir dari imbal hasil masa lalu, tidak pasti, dan berubah seiring waktu, sehingga reksa dana yang tampak bagus dalam satu periode lima tahun bisa tampak buruk pada periode berikutnya. Rasio ini juga menghitung lonjakan ke atas sebagai risiko sama seperti penurunan, paling cocok bila imbal hasil tersebar kira-kira seperti kurva lonceng, dan tidak mengatakan apa pun tentang kejatuhan langka, biaya, pajak, atau berapa lama kamu berencana berinvestasi. Ini alat untuk membuat perbandingan lebih adil, bukan ramalan, dan tidak ada bagian di sini yang merupakan saran investasi.',
      ],
    },
    figure: {
      caption: {
        en: 'Each fund\'s Sharpe ratio is the slope of the line from the risk-free point to its dot. Fund A has the lowest return but the steepest line, so it has the best Sharpe ratio; raising r_f lifts the anchor point and changes every slope.',
        id: 'Rasio Sharpe tiap reksa dana adalah kemiringan garis dari titik bebas risiko ke titiknya. Reksa dana A berimbal hasil paling rendah tetapi garisnya paling curam, sehingga rasio Sharpe-nya paling baik; menaikkan r_f mengangkat titik acuan dan mengubah semua kemiringan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Sharpe ratio as a slope on the risk-return chart', 'Rasio Sharpe sebagai kemiringan pada grafik risiko-imbal hasil')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.4;fill:none}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.f{stroke-width:2;fill:none}</style>
  <line x1="50" y1="200" x2="340" y2="200" class="ax" marker-end="url(#a)"/>
  <line x1="50" y1="200" x2="50" y2="20" class="ax" marker-end="url(#a)"/>
  <text x="272" y="222">${L('σ (risk)', 'σ (risiko)')}</text>
  <text x="56" y="30">${L('μ (return)', 'μ (imbal hasil)')}</text>
  <text x="150" y="30">${L('slope = (μ − r_f) / σ = Sharpe', 'kemiringan = (μ − r_f) / σ = Sharpe')}</text>
  <line x1="50" y1="170" x2="170" y2="170" class="m" stroke-dasharray="3 3"/>
  <line x1="170" y1="170" x2="170" y2="110" class="m" stroke-dasharray="3 3"/>
  <text x="104" y="185">σ</text>
  <text x="176" y="146">μ − r_f</text>
  <line x1="50" y1="170" x2="90" y2="140" class="f" stroke="#10b981"/>
  <line x1="90" y1="140" x2="190" y2="65" class="f" stroke="#10b981" stroke-dasharray="4 4" opacity=".6"/>
  <line x1="50" y1="170" x2="170" y2="110" class="f" stroke="#3b82f6"/>
  <line x1="50" y1="170" x2="300" y2="60" class="f" stroke="#ef4444"/>
  <circle cx="50" cy="170" r="4.5" fill="#f59e0b"/>
  <text x="14" y="174" fill="#f59e0b">r_f</text>
  <circle cx="90" cy="140" r="7" fill="#10b981"/>
  <text x="86" y="128" fill="#10b981">A</text>
  <circle cx="170" cy="110" r="7" fill="#3b82f6"/>
  <text x="166" y="98" fill="#3b82f6">B</text>
  <circle cx="300" cy="60" r="7" fill="#ef4444"/>
  <text x="296" y="48" fill="#ef4444">C</text>
  <text x="200" y="200" opacity=".7">${L('CAL through the best fund', 'garis alokasi modal (CAL)')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The Sharpe ratio measures excess return per unit of volatility: (μ − r_f) / σ.',
        'On a risk–return chart it is the slope of the line from the risk-free point to the fund, so a low-return fund can still win.',
        'Raising the risk-free rate lowers every Sharpe ratio, but hurts low-return funds most and can reorder the ranking.',
        'A negative Sharpe ratio means the fund earned less than the risk-free asset while taking on risk.',
        'Sharpe ratios depend on the period measured and on r_f; they are estimates, not fixed properties.',
      ],
      id: [
        'Rasio Sharpe mengukur kelebihan imbal hasil per satuan volatilitas: (μ − r_f) / σ.',
        'Pada grafik risiko–imbal hasil, rasio ini adalah kemiringan garis dari titik bebas risiko ke reksa dana, sehingga reksa dana berimbal hasil rendah tetap bisa menang.',
        'Menaikkan suku bunga bebas risiko menurunkan semua rasio Sharpe, tetapi paling memukul reksa dana berimbal hasil rendah dan bisa mengubah urutan peringkat.',
        'Rasio Sharpe negatif berarti reksa dana itu menghasilkan lebih sedikit daripada aset bebas risiko padahal menanggung risiko.',
        'Rasio Sharpe bergantung pada periode pengukuran dan pada r_f; ia adalah taksiran, bukan sifat yang tetap.',
      ],
    },
    vocabulary: {
      en: [
        ['Return (μ)', 'The average percentage gain of an investment per year.'],
        ['Volatility (σ)', 'The standard deviation of yearly returns; a measure of how widely the results scatter around the average.'],
        ['Risk-free rate (r_f)', 'The return available with essentially no risk, usually taken from short-term government debt.'],
        ['Excess return', 'μ − r_f: the part of the return that rewards you for taking risk.'],
        ['Sharpe ratio', 'Excess return divided by volatility; the slope of the line from the risk-free point to the investment.'],
        ['Capital allocation line (CAL)', 'The line through the risk-free point and a fund; mixing the two in any proportion gives a point on this line.'],
        ['Risk-adjusted return', 'Any measure of return that takes into account how much risk was needed to earn it.'],
      ],
      id: [
        ['Imbal hasil (μ)', 'Rata-rata keuntungan sebuah investasi per tahun, dalam persen.'],
        ['Volatilitas (σ)', 'Simpangan baku imbal hasil tahunan; ukuran seberapa jauh hasilnya tersebar di sekitar rata-rata.'],
        ['Suku bunga bebas risiko (r_f)', 'Imbal hasil yang bisa didapat hampir tanpa risiko, biasanya dari surat utang negara jangka pendek.'],
        ['Kelebihan imbal hasil', 'μ − r_f: bagian imbal hasil yang menjadi imbalan atas risiko yang diambil.'],
        ['Rasio Sharpe', 'Kelebihan imbal hasil dibagi volatilitas; kemiringan garis dari titik bebas risiko ke investasi tersebut.'],
        ['Garis alokasi modal (CAL)', 'Garis yang melalui titik bebas risiko dan sebuah reksa dana; mencampur keduanya dalam proporsi apa pun menghasilkan titik di garis ini.'],
        ['Imbal hasil terkoreksi risiko', 'Ukuran imbal hasil apa pun yang memperhitungkan seberapa besar risiko yang diperlukan untuk memperolehnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['The fund with the highest return is the best one.', 'High return often comes with high volatility. Borrowing money to double a position doubles the excess return and the volatility alike, so raw return can be "bought" with risk; the Sharpe ratio removes that effect.'],
        ['A Sharpe ratio of 2 means the fund earns twice as much as one with a Sharpe ratio of 1.', 'It means twice the excess return per unit of volatility. The fund with the higher ratio may well have the lower return, as fund A in the figure does.'],
        ['Volatility only counts the losses.', 'Standard deviation measures swings in both directions. A fund that occasionally jumps up by 30% has a high σ even if it never falls, which is one reason the ratio is criticised.'],
        ['A fund\'s Sharpe ratio is a fixed number.', 'It depends on the period over which μ and σ were measured and on the r_f used. The same fund can show a Sharpe of 1.2 over one decade and 0.3 over the next.'],
      ],
      id: [
        ['Reksa dana dengan imbal hasil tertinggi adalah yang terbaik.', 'Imbal hasil tinggi sering datang bersama volatilitas tinggi. Meminjam uang untuk menggandakan posisi menggandakan kelebihan imbal hasil sekaligus volatilitasnya, sehingga imbal hasil mentah bisa "dibeli" dengan risiko; rasio Sharpe menghilangkan efek itu.'],
        ['Rasio Sharpe 2 berarti reksa dana itu menghasilkan dua kali lipat dibanding yang rasionya 1.', 'Artinya kelebihan imbal hasil per satuan volatilitasnya dua kali lipat. Reksa dana dengan rasio lebih tinggi justru bisa berimbal hasil lebih rendah, seperti reksa dana A pada gambar.'],
        ['Volatilitas hanya menghitung kerugian.', 'Simpangan baku mengukur gejolak ke dua arah. Reksa dana yang sesekali melonjak 30% memiliki σ tinggi meskipun tidak pernah turun, dan ini salah satu kritik terhadap rasio Sharpe.'],
        ['Rasio Sharpe sebuah reksa dana adalah angka yang tetap.', 'Rasio ini bergantung pada periode pengukuran μ dan σ serta pada r_f yang dipakai. Reksa dana yang sama bisa menunjukkan Sharpe 1,2 dalam satu dekade dan 0,3 pada dekade berikutnya.'],
      ],
    },
    realWorld: {
      en: [
        'Mutual fund fact sheets and comparison websites usually print a 3-year or 5-year Sharpe ratio beside the return, so investors can see whether a high return was earned smoothly or by taking large swings.',
        'Pension funds and university endowments judge the managers they hire on risk-adjusted performance, because any manager can raise raw returns simply by taking more risk.',
        'When central banks raise interest rates, r_f rises and Sharpe ratios across the whole market fall, even for funds whose performance has not changed at all.',
        'Doubling a position with borrowed money (leverage) doubles both the excess return and the volatility, leaving the Sharpe ratio unchanged; this is why it is called a scale-free measure.',
      ],
      id: [
        'Lembar fakta reksa dana dan situs pembanding biasanya mencetak rasio Sharpe 3 atau 5 tahun di samping imbal hasil, sehingga investor bisa melihat apakah imbal hasil tinggi diperoleh dengan mulus atau lewat gejolak besar.',
        'Dana pensiun dan dana abadi universitas menilai manajer investasi yang mereka pakai dari kinerja terkoreksi risiko, karena manajer mana pun bisa menaikkan imbal hasil mentah hanya dengan mengambil risiko lebih besar.',
        'Ketika bank sentral menaikkan suku bunga, r_f naik dan rasio Sharpe di seluruh pasar turun, bahkan untuk reksa dana yang kinerjanya sama sekali tidak berubah.',
        'Menggandakan posisi dengan uang pinjaman (leverage) menggandakan kelebihan imbal hasil sekaligus volatilitasnya, sehingga rasio Sharpe tidak berubah; karena itu ia disebut ukuran yang bebas skala.',
      ],
    },
    questions: {
      en: [
        { q: 'A fund returns 12% per year on average with a volatility of 20%, and the risk-free rate is 3%. What is its Sharpe ratio?', a: 'Sharpe = (0.12 − 0.03) / 0.20 = 0.09 / 0.20 = 0.45. The fund earned 0.45 percentage points of excess return for every percentage point of volatility.' },
        { q: 'With the default funds, the bond fund (μ = 5%, σ = 4%) ranks first at r_f = 3%. What happens to the ranking when you raise r_f to 5%, and why?', a: 'The bond fund\'s excess return becomes 5% − 5% = 0, so its Sharpe ratio falls to 0 and it drops to last place. The index fund gives (10 − 5) / 16 = 0.31 and the hot stock (18 − 5) / 40 = 0.325, so the hot stock now leads. Subtracting r_f removes the same two percentage points from everyone, but that is half of the bond fund\'s return and only a ninth of the hot stock\'s.' },
        { q: 'What does it mean when a fund\'s Sharpe ratio is negative, and how does the chart show it?', a: 'Its average return was below the risk-free rate, so the line from the yellow r_f point to the fund slopes downward. An investor took on volatility and still ended up with less than a safe deposit would have paid over that period.' },
      ],
      id: [
        { q: 'Sebuah reksa dana rata-rata memberi imbal hasil 12% per tahun dengan volatilitas 20%, dan suku bunga bebas risiko 3%. Berapa rasio Sharpe-nya?', a: 'Sharpe = (0,12 − 0,03) / 0,20 = 0,09 / 0,20 = 0,45. Reksa dana itu memperoleh 0,45 poin persen kelebihan imbal hasil untuk setiap poin persen volatilitas.' },
        { q: 'Dengan reksa dana bawaan, reksa dana obligasi (μ = 5%, σ = 4%) berada di peringkat pertama pada r_f = 3%. Apa yang terjadi pada peringkat ketika r_f dinaikkan ke 5%, dan mengapa?', a: 'Kelebihan imbal hasil reksa dana obligasi menjadi 5% − 5% = 0, sehingga rasio Sharpe-nya jatuh ke 0 dan ia turun ke posisi terakhir. Reksa dana indeks memberi (10 − 5) / 16 = 0,31 dan saham panas (18 − 5) / 40 = 0,325, sehingga saham panas kini memimpin. Pengurangan r_f mengambil dua poin persen yang sama dari semua, tetapi itu separuh imbal hasil reksa dana obligasi dan hanya sepersembilan imbal hasil saham panas.' },
        { q: 'Apa arti rasio Sharpe yang negatif, dan bagaimana grafik menunjukkannya?', a: 'Rata-rata imbal hasilnya berada di bawah suku bunga bebas risiko, sehingga garis dari titik kuning r_f ke reksa dana itu miring ke bawah. Investor menanggung volatilitas tetapi tetap mendapat lebih sedikit daripada yang diberikan simpanan aman pada periode itu.' },
      ],
    },
  },
};
