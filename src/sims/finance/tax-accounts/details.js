// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compare taxable, pre-tax (Trad), and Roth growth over 30 years.',
      'See why "tax now vs tax later" depends on your future tax bracket.',
      'Recognize the drag of annual taxes in a taxable account.',
    ],
    id: [
      'Membandingkan pertumbuhan akun kena pajak, pra-pajak (Trad), dan Roth selama 30 tahun.',
      'Melihat mengapa "pajak sekarang vs nanti" bergantung pada bracket masa depan.',
      'Mengenali beban pajak tahunan pada akun kena pajak.',
    ],
  },
  tryThis: {
    en: [
      'Same tax bracket now and later — Trad and Roth tie.',
      'Lower bracket in retirement — Trad wins.',
      'Higher bracket in retirement — Roth wins.',
    ],
    id: [
      'Bracket pajak sekarang dan nanti sama — Trad dan Roth seri.',
      'Bracket lebih rendah saat pensiun — Trad menang.',
      'Bracket lebih tinggi saat pensiun — Roth menang.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Governments tax the money you earn and, usually, the money your investments earn. Retirement accounts do not make that tax disappear, but they change when it is collected, and timing turns out to matter a great deal. The simulation compares three ways of saving the same slice of salary every year. In an ordinary taxable account you invest money that has already been taxed as income, and the growth is taxed as it comes. In a pre-tax account (a traditional 401(k) or similar) the full slice goes in untaxed, grows untaxed, and is taxed as income when you withdraw it in retirement. In a Roth-style account you pay income tax first, invest what is left, and never pay tax on that money or its growth again.',
        'Each year the model takes a contribution C from your salary. The pre-tax account receives the whole C; the other two receive C × (1 − tax bracket now). Every balance then grows by the same yearly return r. The taxable account loses a slice of each year\'s growth to capital-gains tax, so it effectively compounds at r × (1 − capital-gains rate). The pre-tax balance grows at the full rate and is multiplied once at the end by (1 − tax bracket in retirement). The Roth balance also grows at the full rate and keeps everything. The legend shows each account\'s final after-tax value.',
        'The sliders set the contribution, return, number of years, the two tax brackets and the capital-gains rate. The key comparison is a piece of algebra. After n years a single pre-tax contribution is worth C × (1 + r)^n × (1 − t_later), while the Roth version is worth C × (1 − t_now) × (1 + r)^n. These are the same factors multiplied in a different order, so when the two brackets are equal the two accounts tie exactly. Whichever bracket is lower wins: a lower bracket in retirement favours pre-tax, a higher one favours Roth. The taxable account always trails, because the tax taken each year is money that can no longer compound.',
        'The model leaves out a lot. Real tax systems are progressive, so withdrawals are taxed at several rates rather than one; there are contribution limits, employer matching, early-withdrawal penalties and compulsory withdrawals in old age; and tax laws change over 30 years. The taxable account here is taxed on all of its growth every year, which overstates the drag compared with holding an investment and paying tax only when it is sold. Inflation and fees are ignored. The simulation is for understanding the mechanism of tax timing, not for planning anyone\'s retirement.',
      ],
      id: [
        'Pemerintah memajaki penghasilan yang kamu peroleh dan, biasanya, juga hasil investasimu. Akun pensiun tidak menghilangkan pajak itu, tetapi mengubah kapan pajak dipungut, dan ternyata waktu pemungutan sangat berpengaruh. Simulasi ini membandingkan tiga cara menabung potongan gaji yang sama setiap tahun. Pada akun investasi biasa yang kena pajak, kamu menanamkan uang yang sudah dipajaki sebagai penghasilan, dan pertumbuhannya dipajaki saat diperoleh. Pada akun prapajak (seperti 401(k) tradisional) seluruh potongan masuk tanpa dipajaki, tumbuh tanpa pajak, lalu dipajaki sebagai penghasilan ketika ditarik saat pensiun. Pada akun bergaya Roth kamu membayar pajak penghasilan dulu, menanamkan sisanya, dan tidak pernah lagi membayar pajak atas uang itu maupun pertumbuhannya.',
        'Setiap tahun model mengambil setoran C dari gajimu. Akun prapajak menerima seluruh C; dua akun lainnya menerima C × (1 − bracket pajak sekarang). Setiap saldo lalu tumbuh dengan imbal hasil tahunan r yang sama. Akun kena pajak kehilangan sebagian pertumbuhan tiap tahun untuk pajak keuntungan modal, sehingga secara efektif ia tumbuh majemuk dengan laju r × (1 − tarif pajak keuntungan modal). Saldo prapajak tumbuh dengan laju penuh lalu dikalikan sekali di akhir dengan (1 − bracket pajak saat pensiun). Saldo Roth juga tumbuh dengan laju penuh dan seluruhnya menjadi milikmu. Legenda menampilkan nilai akhir setelah pajak untuk tiap akun.',
        'Slider mengatur setoran, imbal hasil, jumlah tahun, kedua bracket pajak, dan tarif pajak keuntungan modal. Perbandingan kuncinya adalah sedikit aljabar. Setelah n tahun, satu setoran prapajak bernilai C × (1 + r)^n × (1 − t_nanti), sedangkan versi Roth bernilai C × (1 − t_sekarang) × (1 + r)^n. Faktor-faktornya sama, hanya urutan perkaliannya berbeda, sehingga ketika kedua bracket sama, kedua akun seri persis. Bracket yang lebih rendahlah yang menang: bracket lebih rendah saat pensiun menguntungkan prapajak, bracket lebih tinggi menguntungkan Roth. Akun kena pajak selalu tertinggal, karena pajak yang diambil tiap tahun adalah uang yang tidak bisa lagi tumbuh majemuk.',
        'Model ini mengabaikan banyak hal. Sistem pajak sungguhan bersifat progresif, sehingga penarikan dipajaki dengan beberapa tarif, bukan satu; ada batas setoran, tambahan dari pemberi kerja, denda penarikan dini, dan kewajiban penarikan di usia lanjut; dan aturan pajak berubah dalam 30 tahun. Akun kena pajak di sini dipajaki atas seluruh pertumbuhannya setiap tahun, yang melebih-lebihkan bebannya dibanding menahan investasi dan membayar pajak hanya saat dijual. Inflasi dan biaya diabaikan. Simulasi ini untuk memahami mekanisme waktu pemajakan, bukan untuk merencanakan pensiun siapa pun.',
      ],
    },
    figure: {
      caption: {
        en: 'Every account multiplies the same contribution by a tax factor and a growth factor; only the order and the rates differ. Because the order of multiplication does not matter, pre-tax and Roth tie when the two tax rates are equal, while the taxable account gives up part of its growth every single year.',
        id: 'Setiap akun mengalikan setoran yang sama dengan faktor pajak dan faktor pertumbuhan; hanya urutan dan tarifnya yang berbeda. Karena urutan perkalian tidak berpengaruh, prapajak dan Roth seri bila kedua tarif pajak sama, sedangkan akun kena pajak melepaskan sebagian pertumbuhannya setiap tahun.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Tax and growth factors for three account types', 'Faktor pajak dan pertumbuhan untuk tiga jenis akun')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.h{font-weight:600}.b{fill:none;stroke-width:1.6}.ar{stroke:currentColor;stroke-width:1.2;fill:none}.s{font-size:10px}</style>
  <text x="100" y="22" class="h">${L('1. contribute', '1. setor')}</text>
  <text x="176" y="22" class="h">${L('2. grow n years', '2. tumbuh n tahun')}</text>
  <text x="272" y="22" class="h">${L('3. withdraw', '3. tarik')}</text>
  <text x="8" y="60" class="h">${L('Taxable', 'Kena pajak')}</text>
  <text x="8" y="120" class="h">${L('Pre-tax', 'Prapajak')}</text>
  <text x="8" y="180" class="h">Roth</text>
  <line x1="80" y1="56" x2="90" y2="56" class="ar" marker-end="url(#a)"/>
  <line x1="80" y1="116" x2="90" y2="116" class="ar" marker-end="url(#a)"/>
  <line x1="80" y1="176" x2="90" y2="176" class="ar" marker-end="url(#a)"/>
  <rect x="94" y="42" width="60" height="28" rx="4" class="b" stroke="#ef4444"/>
  <text x="102" y="60" class="s">× (1 − t_now)</text>
  <rect x="174" y="42" width="78" height="28" rx="4" class="b" stroke="#f59e0b"/>
  <text x="178" y="60" class="s">× (1 + r(1 − t_cg))^n</text>
  <rect x="272" y="42" width="60" height="28" rx="4" class="b" stroke="currentColor" stroke-dasharray="3 3" opacity=".6"/>
  <text x="290" y="60" class="s">× 1</text>
  <rect x="94" y="102" width="60" height="28" rx="4" class="b" stroke="currentColor" stroke-dasharray="3 3" opacity=".6"/>
  <text x="112" y="120" class="s">× 1</text>
  <rect x="174" y="102" width="78" height="28" rx="4" class="b" stroke="#10b981"/>
  <text x="192" y="120" class="s">× (1 + r)^n</text>
  <rect x="272" y="102" width="60" height="28" rx="4" class="b" stroke="#ef4444"/>
  <text x="278" y="120" class="s">× (1 − t_later)</text>
  <rect x="94" y="162" width="60" height="28" rx="4" class="b" stroke="#ef4444"/>
  <text x="102" y="180" class="s">× (1 − t_now)</text>
  <rect x="174" y="162" width="78" height="28" rx="4" class="b" stroke="#10b981"/>
  <text x="192" y="180" class="s">× (1 + r)^n</text>
  <rect x="272" y="162" width="60" height="28" rx="4" class="b" stroke="currentColor" stroke-dasharray="3 3" opacity=".6"/>
  <text x="290" y="180" class="s">× 1</text>
  <line x1="156" y1="56" x2="170" y2="56" class="ar" marker-end="url(#a)"/>
  <line x1="254" y1="56" x2="268" y2="56" class="ar" marker-end="url(#a)"/>
  <line x1="156" y1="116" x2="170" y2="116" class="ar" marker-end="url(#a)"/>
  <line x1="254" y1="116" x2="268" y2="116" class="ar" marker-end="url(#a)"/>
  <line x1="156" y1="176" x2="170" y2="176" class="ar" marker-end="url(#a)"/>
  <line x1="254" y1="176" x2="268" y2="176" class="ar" marker-end="url(#a)"/>
  <rect x="8" y="206" width="10" height="10" fill="none" stroke="#ef4444" stroke-width="1.6"/>
  <text x="24" y="215" class="s">${L('income tax', 'pajak penghasilan')}</text>
  <rect x="118" y="206" width="10" height="10" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
  <text x="134" y="215" class="s">${L('growth taxed yearly', 'pertumbuhan dipajaki tiap tahun')}</text>
  <rect x="8" y="224" width="10" height="10" fill="none" stroke="#10b981" stroke-width="1.6"/>
  <text x="24" y="233" class="s">${L('untaxed growth', 'pertumbuhan tanpa pajak')}</text>
  <text x="134" y="233" class="s">${L('t_now = t_later  ⇒  pre-tax = Roth', 't_now = t_later  ⇒  prapajak = Roth')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The three account types differ in when tax is paid, not in whether it is paid.',
        'Pre-tax and Roth are the same factors multiplied in a different order, so they tie exactly when the tax rate now equals the tax rate in retirement.',
        'A lower tax bracket in retirement favours the pre-tax account; a higher one favours Roth.',
        'Taxing growth every year is a drag on compounding, which is why the taxable account falls further behind the longer the money is invested.',
        'The gap between accounts grows with the return and the number of years, because tax timing acts on the compounded total.',
      ],
      id: [
        'Ketiga jenis akun berbeda dalam kapan pajak dibayar, bukan apakah pajak dibayar.',
        'Prapajak dan Roth adalah faktor-faktor yang sama dalam urutan perkalian berbeda, sehingga keduanya seri persis bila tarif pajak sekarang sama dengan tarif saat pensiun.',
        'Bracket pajak yang lebih rendah saat pensiun menguntungkan akun prapajak; bracket yang lebih tinggi menguntungkan Roth.',
        'Memajaki pertumbuhan setiap tahun menghambat bunga berbunga, sehingga akun kena pajak semakin tertinggal semakin lama uang diinvestasikan.',
        'Selisih antar akun membesar seiring imbal hasil dan jumlah tahun, karena waktu pemajakan bekerja pada total yang sudah tumbuh majemuk.',
      ],
    },
    vocabulary: {
      en: [
        ['Tax bracket', 'The percentage rate applied to a slice of income; the simulation uses one rate for your working years and one for retirement.'],
        ['Pre-tax (traditional) account', 'Contributions are made before income tax; growth is untaxed; withdrawals are taxed as income.'],
        ['Roth account', 'Contributions are made from after-tax money; growth and withdrawals are tax-free.'],
        ['Taxable account', 'An ordinary investment account: contributions are after-tax and investment gains are taxed as they are earned or realised.'],
        ['Capital-gains tax', 'Tax on the profit from selling an investment for more than it cost; often at a lower rate than income tax.'],
        ['Compounding', 'Growth on previous growth; a balance that grows by r each year is multiplied by (1 + r)^n after n years.'],
        ['Tax drag', 'The reduction in long-run growth caused by paying tax on returns before they can be reinvested.'],
      ],
      id: [
        ['Bracket pajak', 'Tarif persentase yang dikenakan pada suatu lapisan penghasilan; simulasi memakai satu tarif untuk masa kerja dan satu untuk masa pensiun.'],
        ['Akun prapajak (tradisional)', 'Setoran dilakukan sebelum pajak penghasilan; pertumbuhan tidak dipajaki; penarikan dipajaki sebagai penghasilan.'],
        ['Akun Roth', 'Setoran berasal dari uang yang sudah dipajaki; pertumbuhan dan penarikan bebas pajak.'],
        ['Akun kena pajak', 'Akun investasi biasa: setoran dari uang setelah pajak dan keuntungan investasi dipajaki saat diperoleh atau direalisasikan.'],
        ['Pajak keuntungan modal', 'Pajak atas laba dari menjual investasi di atas harga belinya; sering kali tarifnya lebih rendah daripada pajak penghasilan.'],
        ['Bunga berbunga (pertumbuhan majemuk)', 'Pertumbuhan atas pertumbuhan sebelumnya; saldo yang tumbuh r per tahun dikalikan (1 + r)^n setelah n tahun.'],
        ['Beban pajak (tax drag)', 'Berkurangnya pertumbuhan jangka panjang karena pajak dibayar atas imbal hasil sebelum bisa diinvestasikan kembali.'],
      ],
    },
    misconceptions: {
      en: [
        ['Roth is always better because the growth is never taxed.', 'The Roth contribution is smaller to begin with, because tax was taken first. With equal tax rates the two paths give exactly the same final amount; Roth only wins when the rate in retirement is higher than the rate now.'],
        ['Pre-tax is always better because you invest more money up front.', 'The larger balance is taxed in full at withdrawal. Multiplying by (1 − t) at the end has exactly the same effect as multiplying by it at the start, so the extra money up front is no advantage by itself.'],
        ['A low capital-gains rate makes the taxable account nearly as good as the others.', 'Even at 15%, the tax is taken every year from the growth, so the money removed stops compounding. Over 30 years at 7% that yearly bite costs roughly a quarter of the final balance in this model.'],
      ],
      id: [
        ['Roth selalu lebih baik karena pertumbuhannya tidak pernah dipajaki.', 'Setoran Roth sejak awal lebih kecil, karena pajak sudah diambil lebih dulu. Dengan tarif pajak yang sama, kedua jalur menghasilkan jumlah akhir yang persis sama; Roth hanya menang bila tarif saat pensiun lebih tinggi daripada tarif sekarang.'],
        ['Prapajak selalu lebih baik karena uang yang diinvestasikan di awal lebih besar.', 'Saldo yang lebih besar itu dipajaki penuh saat ditarik. Mengalikan dengan (1 − t) di akhir berdampak persis sama dengan mengalikannya di awal, sehingga uang ekstra di awal bukan keunggulan dengan sendirinya.'],
        ['Tarif pajak keuntungan modal yang rendah membuat akun kena pajak hampir sebaik yang lain.', 'Meski hanya 15%, pajak diambil setiap tahun dari pertumbuhan, sehingga uang yang diambil berhenti tumbuh majemuk. Selama 30 tahun pada 7%, gigitan tahunan itu memakan kira-kira seperempat saldo akhir dalam model ini.'],
      ],
    },
    realWorld: {
      en: [
        'Many countries offer accounts with the same two patterns: tax relief on the way in with taxed withdrawals, or taxed contributions with tax-free withdrawals; the names differ but the mechanism is identical.',
        'Workers who expect a higher income (and tax bracket) later in their careers often favour paying tax up front, while those at the peak of their earnings often defer it.',
        'Index funds that rarely sell their holdings are described as tax-efficient precisely because they postpone capital-gains tax and reduce the yearly drag this simulation shows.',
        'Governments use these rules deliberately: a tax break today encourages saving, and the deferred tax arrives decades later when the saver withdraws the money.',
      ],
      id: [
        'Banyak negara menawarkan akun dengan dua pola yang sama: keringanan pajak saat menyetor dengan penarikan yang dipajaki, atau setoran yang dipajaki dengan penarikan bebas pajak; namanya berbeda tetapi mekanismenya identik.',
        'Pekerja yang memperkirakan penghasilan (dan bracket pajak) lebih tinggi di kemudian hari sering memilih membayar pajak di depan, sedangkan yang berada di puncak penghasilan sering menundanya.',
        'Reksa dana indeks yang jarang menjual kepemilikannya disebut efisien pajak justru karena menunda pajak keuntungan modal dan mengurangi beban tahunan yang ditunjukkan simulasi ini.',
        'Pemerintah memakai aturan ini dengan sengaja: keringanan pajak hari ini mendorong orang menabung, dan pajak yang ditunda baru masuk puluhan tahun kemudian saat penabung menarik uangnya.',
      ],
    },
    questions: {
      en: [
        { q: 'You can set aside $1,000 of pre-tax salary. Your tax bracket is 25% now and will be 25% in retirement, and the investment triples over the period. Compare the pre-tax and Roth outcomes.', a: 'Pre-tax: 1,000 × 3 × (1 − 0.25) = $2,250. Roth: 1,000 × (1 − 0.25) × 3 = 750 × 3 = $2,250. They tie, because the same two factors (×3 and ×0.75) are applied in a different order.' },
        { q: 'Same $1,000 and tripling, but the bracket is 30% now and 15% in retirement. Which account wins, and by what ratio?', a: 'Pre-tax: 1,000 × 3 × 0.85 = $2,550. Roth: 1,000 × 0.70 × 3 = $2,100. Pre-tax wins, by 0.85 / 0.70 ≈ 1.21, about 21% more. The lower rate wins, and it is applied to the pre-tax account at withdrawal.' },
        { q: 'The capital-gains rate (15%) is lower than either income-tax bracket, yet the taxable account finishes well behind. Why?', a: 'Because the tax is taken from the growth every year, the account compounds at 7% × (1 − 0.15) = 5.95% instead of 7%. Over 30 years (1.07)^30 ≈ 7.6 while (1.0595)^30 ≈ 5.7, so each early contribution ends up about 25% smaller. A one-off tax at the end or the start removes a fixed fraction; a yearly tax removes money that would itself have grown.' },
      ],
      id: [
        { q: 'Kamu bisa menyisihkan Rp1.000 gaji prapajak. Bracket pajakmu 25% sekarang dan tetap 25% saat pensiun, dan investasinya tumbuh tiga kali lipat selama periode itu. Bandingkan hasil akun prapajak dan Roth.', a: 'Prapajak: 1.000 × 3 × (1 − 0,25) = Rp2.250. Roth: 1.000 × (1 − 0,25) × 3 = 750 × 3 = Rp2.250. Keduanya seri, karena dua faktor yang sama (×3 dan ×0,75) hanya dikalikan dalam urutan berbeda.' },
        { q: 'Rp1.000 yang sama dan tumbuh tiga kali lipat, tetapi bracket-nya 30% sekarang dan 15% saat pensiun. Akun mana yang menang, dan dengan rasio berapa?', a: 'Prapajak: 1.000 × 3 × 0,85 = Rp2.550. Roth: 1.000 × 0,70 × 3 = Rp2.100. Prapajak menang, dengan rasio 0,85 / 0,70 ≈ 1,21, sekitar 21% lebih banyak. Tarif yang lebih rendahlah yang menang, dan tarif itu dikenakan pada akun prapajak saat penarikan.' },
        { q: 'Tarif pajak keuntungan modal (15%) lebih rendah daripada kedua bracket pajak penghasilan, tetapi akun kena pajak finis jauh di belakang. Mengapa?', a: 'Karena pajak diambil dari pertumbuhan setiap tahun, akun itu tumbuh majemuk dengan laju 7% × (1 − 0,15) = 5,95%, bukan 7%. Selama 30 tahun (1,07)^30 ≈ 7,6 sedangkan (1,0595)^30 ≈ 5,7, sehingga setiap setoran awal berakhir sekitar 25% lebih kecil. Pajak sekali di akhir atau di awal mengambil fraksi yang tetap; pajak tahunan mengambil uang yang seharusnya ikut tumbuh.' },
      ],
    },
  },
};
