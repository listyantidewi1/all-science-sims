// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      "See the derivative defined geometrically as instantaneous slope.",
      "Identify where f' = 0 (turning points) and where f' is positive/negative.",
      'Compare a function with its derivative side by side.',
    ],
    id: [
      'Melihat turunan didefinisikan secara geometris sebagai kemiringan sesaat.',
      "Mengenali di mana f' = 0 (titik balik) dan di mana f' positif/negatif.",
      'Membandingkan fungsi dengan turunannya secara berdampingan.',
    ],
  },  tryThis: {
    en: [
      "Drag to the top of the curve — what does f' equal there?",
      "Find where f' is most positive — what does the curve look like?",
      "Switch to sin(x) — what's its derivative shape?",
    ],
    id: [
      "Geser ke puncak kurva — berapa f' di sana?",
      "Cari titik di mana f' paling positif — bagaimana bentuk kurvanya?",
      "Beralih ke sin(x) — bagaimana bentuk turunannya?",
    ],
  },
  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The slope of a straight line is rise over run, and it is the same everywhere on the line. A curve has no single slope: it is steep in some places and flat in others. The derivative answers the question "how steep is the curve right here?" The idea is to draw a secant line through two nearby points on the curve, measure its slope (f(x + h) − f(x))/h, and then slide the second point toward the first. As h shrinks to zero the secant settles onto a single line, the tangent, and its slope is the derivative f\'(x).',
        'The upper panel of the simulation shows the function f (blue) with a red point you can drag horizontally and the tangent line (yellow) drawn at that point. The lower panel plots f\'(x) in amber, and the red point there sits at the height equal to the slope above. So when the tangent in the top panel tilts upward, the point in the bottom panel is above zero; when the tangent is flat, the point is on the axis; when the tangent tilts downward, the point is below zero. Dragging across the whole curve traces out the derivative as a second function.',
        'Each choice in the Function menu makes a different connection visible. For x² the derivative is the straight line 2x, so the slope grows steadily as you move right. For x³ − 3x the tangent is horizontal at x = −1 and x = 1, exactly where the derivative crosses zero, and those are the local maximum and minimum. For sin(x) the derivative is cos(x): the slope is largest where the sine crosses the axis and zero at its peaks. For e^x − 1 the derivative is e^x, so the curve has the same shape as its own slope, shifted down by one.',
        'The simulation does not take a limit on the fly: for each function it uses the known derivative formula, so the lower curve is exact rather than approximated. Both panels share the same vertical scale from −4 to 4, which means parts of e^x − 1 and its derivative leave the window on the right. The red point is kept inside x from −2.9 to 2.9. Every function offered here is smooth, so a tangent exists at every point; corners and jumps, where the derivative does not exist, are not shown.',
      ],
      id: [
        'Kemiringan garis lurus adalah kenaikan dibagi pergeseran mendatar, dan nilainya sama di seluruh garis. Kurva tidak punya satu kemiringan: ia curam di beberapa tempat dan landai di tempat lain. Turunan menjawab pertanyaan "seberapa curam kurva tepat di sini?" Gagasannya: tarik garis sekan melalui dua titik berdekatan pada kurva, ukur kemiringannya (f(x + h) − f(x))/h, lalu geser titik kedua mendekati titik pertama. Saat h menyusut ke nol, sekan itu menetap menjadi satu garis, yaitu garis singgung, dan kemiringannya adalah turunan f\'(x).',
        'Panel atas simulasi menampilkan fungsi f (biru) dengan titik merah yang bisa kamu seret mendatar dan garis singgung (kuning) yang digambar di titik itu. Panel bawah menggambar f\'(x) dengan warna kuning tua, dan titik merah di sana berada pada ketinggian yang sama dengan kemiringan di atasnya. Jadi ketika garis singgung di panel atas miring ke atas, titik di panel bawah berada di atas nol; ketika garis singgung mendatar, titik itu tepat di sumbu; ketika garis singgung miring ke bawah, titik itu di bawah nol. Menyeret sepanjang kurva akan menjejaki turunan sebagai fungsi kedua.',
        'Setiap pilihan di menu Function memperlihatkan hubungan yang berbeda. Untuk x² turunannya adalah garis lurus 2x, jadi kemiringan bertambah teratur saat bergerak ke kanan. Untuk x³ − 3x garis singgungnya mendatar di x = −1 dan x = 1, tepat di tempat turunan melewati nol, dan itulah maksimum dan minimum lokalnya. Untuk sin(x) turunannya adalah cos(x): kemiringan paling besar saat sinus memotong sumbu dan nol di puncaknya. Untuk e^x − 1 turunannya adalah e^x, jadi kurvanya berbentuk sama dengan kemiringannya sendiri, hanya bergeser turun satu satuan.',
        'Simulasi ini tidak menghitung limit secara langsung: untuk setiap fungsi ia memakai rumus turunan yang sudah diketahui, sehingga kurva bawah bersifat eksak, bukan pendekatan. Kedua panel memakai skala tegak yang sama dari −4 sampai 4, sehingga sebagian e^x − 1 dan turunannya keluar dari jendela di sisi kanan. Titik merah dibatasi pada x dari −2,9 sampai 2,9. Semua fungsi yang disediakan di sini mulus, jadi garis singgung ada di setiap titik; sudut tajam dan lompatan, tempat turunan tidak ada, tidak ditampilkan.',
      ],
    },
    figure: {
      caption: {
        en: 'The secant through P and Q has slope Δy/Δx. As Q slides toward P the secant turns into the tangent at P, whose slope is the derivative f\'(x) at that point.',
        id: 'Sekan melalui P dan Q berkemiringan Δy/Δx. Saat Q digeser mendekati P, sekan berubah menjadi garis singgung di P, yang kemiringannya adalah turunan f\'(x) di titik itu.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Secant and tangent lines on a curve', 'Garis sekan dan garis singgung pada kurva')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px;opacity:.7}</style>
  <clipPath id="w"><rect x="20" y="10" width="320" height="222"/></clipPath>
  <line x1="20" y1="215" x2="340" y2="215" class="m"/>
  <line x1="72.9" y1="12" x2="72.9" y2="232" class="m"/>
  <text x="326" y="229" class="s">x</text>
  <path d="M30 208.7 Q169.3 249.8 308.6 23.4" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <text x="300" y="20" fill="#3b82f6">y = f(x)</text>
  <line x1="124.3" y1="222.6" x2="308.6" y2="45.6" stroke="#8b5cf6" stroke-width="1.8" stroke-dasharray="6 4" clip-path="url(#w)"/>
  <text x="236" y="50" fill="#8b5cf6">${L('secant', 'sekan')}</text>
  <text x="236" y="63" fill="#8b5cf6" class="s">${L('slope = Δy / Δx', 'kemiringan = Δy / Δx')}</text>
  <line x1="85.7" y1="232.7" x2="308.6" y2="101" stroke="#f59e0b" stroke-width="2.2" clip-path="url(#w)"/>
  <text x="258" y="128" fill="#f59e0b">${L('tangent', 'garis singgung')}</text>
  <text x="258" y="141" fill="#f59e0b" class="s">${L("slope = f'(x)", "kemiringan = f'(x)")}</text>
  <line x1="158.6" y1="189.7" x2="265.7" y2="189.7" stroke="#10b981" stroke-width="1.5"/>
  <line x1="265.7" y1="189.7" x2="265.7" y2="86.8" stroke="#10b981" stroke-width="1.5"/>
  <text x="200" y="204" fill="#10b981">Δx</text>
  <text x="271" y="142" fill="#10b981">Δy</text>
  <circle cx="158.6" cy="189.7" r="5" fill="#ef4444"/>
  <text x="140" y="183">P</text>
  <circle cx="265.7" cy="86.8" r="4.5" fill="#ef4444"/>
  <text x="252" y="82">Q</text>
  <path d="M250 96 L228 118" stroke="currentColor" stroke-width="1.2" fill="none" marker-end="url(#a)" opacity=".7"/>
  <text x="178" y="112" class="s">${L('Q slides toward P', 'Q digeser ke P')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The derivative at a point is the slope of the tangent line there: the limit of secant slopes as the two points merge.',
        "Where f is rising, f' is positive; where f is falling, f' is negative; at a local maximum or minimum, f' = 0.",
        "The derivative is itself a function: plotting the tangent slope at every x gives the curve f'(x).",
        'Basic pairs to recognise: x² goes to 2x, x³ to 3x², sin(x) to cos(x), and e^x to itself.',
        'The size of the derivative tells you how fast the output changes per unit of input, not how large the output is.',
      ],
      id: [
        'Turunan di suatu titik adalah kemiringan garis singgung di sana: limit kemiringan sekan saat kedua titik menyatu.',
        "Saat f naik, f' positif; saat f turun, f' negatif; pada maksimum atau minimum lokal, f' = 0.",
        "Turunan juga sebuah fungsi: menggambar kemiringan garis singgung di setiap x menghasilkan kurva f'(x).",
        'Pasangan dasar yang perlu dikenali: x² menjadi 2x, x³ menjadi 3x², sin(x) menjadi cos(x), dan e^x tetap e^x.',
        'Besar turunan menyatakan seberapa cepat keluaran berubah per satuan masukan, bukan seberapa besar keluarannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Secant line', 'A straight line through two points on a curve; its slope is the average rate of change between them.'],
        ['Tangent line', 'The line that just touches the curve at one point and has the same direction as the curve there.'],
        ['Derivative f\'(x)', 'The slope of the tangent at x; the instantaneous rate of change of f.'],
        ['Difference quotient', 'The expression (f(x + h) − f(x))/h, the slope of a secant with horizontal gap h.'],
        ['Limit', 'The value an expression approaches as a quantity (here h) gets arbitrarily close to a target (here 0).'],
        ['Critical point', 'An x where f\'(x) = 0, the candidate location of a local maximum or minimum.'],
        ['Rate of change', 'How much the output changes for each unit change of input; speed is the rate of change of position.'],
      ],
      id: [
        ['Garis sekan', 'Garis lurus melalui dua titik pada kurva; kemiringannya adalah laju perubahan rata-rata di antara keduanya.'],
        ['Garis singgung', 'Garis yang hanya menyentuh kurva di satu titik dan searah dengan kurva di titik itu.'],
        ['Turunan f\'(x)', 'Kemiringan garis singgung di x; laju perubahan sesaat dari f.'],
        ['Hasil bagi beda', 'Ungkapan (f(x + h) − f(x))/h, yaitu kemiringan sekan dengan jarak mendatar h.'],
        ['Limit', 'Nilai yang didekati suatu ungkapan ketika sebuah besaran (di sini h) mendekati target (di sini 0) sedekat apa pun.'],
        ['Titik kritis', 'Nilai x dengan f\'(x) = 0, calon lokasi maksimum atau minimum lokal.'],
        ['Laju perubahan', 'Seberapa besar keluaran berubah untuk setiap satuan perubahan masukan; kelajuan adalah laju perubahan posisi.'],
      ],
    },
    misconceptions: {
      en: [
        ['The derivative is large where the function is large.', "Size and steepness are different. At the top of x³ − 3x the function is at a local high but f' = 0, and sin(x) has its biggest slope where it equals zero."],
        ["If f' = 0 at a point, that point must be a maximum or minimum.", 'Not always. For x³ the slope is zero at x = 0 but the curve keeps rising through it. A zero slope is only a candidate; you must check whether the sign of f\' changes.'],
        ['A tangent line touches the curve at exactly one point and never crosses it.', 'Tangency is about matching direction at one point. The tangent to x³ − 3x at x = 0 crosses the curve there, and a tangent can meet the curve again far away.'],
        ["The derivative is the change in y.", 'It is the change in y per unit change in x, a ratio. Doubling the vertical scale of a graph does not change what the derivative means.'],
      ],
      id: [
        ['Turunan besar ketika nilai fungsinya besar.', "Ukuran dan kecuraman itu berbeda. Di puncak x³ − 3x nilai fungsi tinggi secara lokal tetapi f' = 0, dan sin(x) punya kemiringan terbesar justru saat nilainya nol."],
        ["Jika f' = 0 di suatu titik, titik itu pasti maksimum atau minimum.", 'Tidak selalu. Untuk x³ kemiringan nol di x = 0 tetapi kurva terus naik melewatinya. Kemiringan nol hanyalah calon; kamu harus memeriksa apakah tanda f\' berubah.'],
        ['Garis singgung menyentuh kurva tepat di satu titik dan tidak pernah memotongnya.', 'Menyinggung berarti searah di satu titik. Garis singgung x³ − 3x di x = 0 memotong kurva di titik itu, dan garis singgung bisa bertemu kurva lagi di tempat yang jauh.'],
        ['Turunan adalah perubahan y.', 'Turunan adalah perubahan y per satuan perubahan x, sebuah perbandingan. Menggandakan skala tegak grafik tidak mengubah makna turunan.'],
      ],
    },
    realWorld: {
      en: [
        'A speedometer shows the derivative of distance with respect to time; the odometer shows the distance itself.',
        'In economics, marginal cost is the derivative of total cost: the extra cost of producing one more unit.',
        'Weather reports quote the rate at which temperature is rising or falling, which is a derivative of temperature over time.',
        'Engineers find the strongest or cheapest design by locating where the derivative of a cost or stress function is zero.',
      ],
      id: [
        'Spidometer menunjukkan turunan jarak terhadap waktu; odometer menunjukkan jaraknya sendiri.',
        'Dalam ekonomi, biaya marginal adalah turunan biaya total: tambahan biaya untuk memproduksi satu unit lagi.',
        'Laporan cuaca menyebut laju kenaikan atau penurunan suhu, yang merupakan turunan suhu terhadap waktu.',
        'Insinyur menemukan rancangan terkuat atau termurah dengan mencari tempat turunan fungsi biaya atau tegangan bernilai nol.',
      ],
    },
    questions: {
      en: [
        { q: 'Select x² and drag the point to x = 1.5. What value does the simulation show for f\'(x), and how could you check it with a secant?', a: "f'(1.5) = 2 × 1.5 = 3. A check: the secant from x = 1.5 to x = 1.6 has slope (2.56 − 2.25)/0.1 = 3.1, already close to 3; a smaller gap gives a slope even closer to 3." },
        { q: 'For x³ − 3x, at which x values is the tangent horizontal, and which one is the local maximum?', a: "f'(x) = 3x² − 3 = 0 gives x = −1 and x = 1. At x = −1, f = 2 and the slope changes from positive to negative, so it is the local maximum; at x = 1, f = −2 and it is the local minimum." },
        { q: 'When the function is sin(x), the lower panel shows cos(x). Explain, using the tangent line, why the derivative is zero at x = π/2.', a: 'At x = π/2 the sine reaches its peak value 1. Just before the peak the curve is still rising and just after it is falling, so at the peak itself the tangent is horizontal, and a horizontal line has slope 0. That matches cos(π/2) = 0.' },
      ],
      id: [
        { q: 'Pilih x² dan seret titik ke x = 1,5. Berapa nilai f\'(x) yang ditampilkan simulasi, dan bagaimana memeriksanya dengan sekan?', a: "f'(1,5) = 2 × 1,5 = 3. Pemeriksaan: sekan dari x = 1,5 ke x = 1,6 berkemiringan (2,56 − 2,25)/0,1 = 3,1, sudah dekat ke 3; jarak yang lebih kecil memberi kemiringan yang lebih dekat lagi ke 3." },
        { q: 'Untuk x³ − 3x, pada nilai x berapa garis singgungnya mendatar, dan mana yang merupakan maksimum lokal?', a: "f'(x) = 3x² − 3 = 0 memberi x = −1 dan x = 1. Di x = −1, f = 2 dan kemiringan berubah dari positif ke negatif, jadi itu maksimum lokal; di x = 1, f = −2 dan itu minimum lokal." },
        { q: 'Ketika fungsinya sin(x), panel bawah menampilkan cos(x). Jelaskan, dengan garis singgung, mengapa turunannya nol di x = π/2.', a: 'Di x = π/2 sinus mencapai puncaknya, 1. Sesaat sebelum puncak kurva masih naik dan sesaat sesudahnya turun, jadi tepat di puncak garis singgungnya mendatar, dan garis mendatar berkemiringan 0. Ini cocok dengan cos(π/2) = 0.' },
      ],
    },
  },
};
