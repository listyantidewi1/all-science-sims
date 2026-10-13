// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See an integral as a limit of summed rectangles.',
      'Compare left, right, midpoint, and trapezoidal rules.',
      'See N → ∞ converge to the exact area.',
    ],
    id: [
      'Melihat integral sebagai limit jumlah persegi panjang.',
      'Membandingkan aturan kiri, kanan, titik tengah, dan trapesium.',
      'Mengamati N → ∞ menyatu ke luas eksak.',
    ],
  },  tryThis: {
    en: [
      'N=5 with left rule — over- or under-estimate?',
      'N=100 — is the approximation visibly any worse than 200?',
      "Switch to a function with both signs — does Riemann count negative area?",
    ],
    id: [
      'N=5 dengan aturan kiri — lebih besar atau lebih kecil?',
      'N=100 — apakah hasilnya berbeda nyata dari 200?',
      'Beralih ke fungsi dengan dua tanda — apakah Riemann menghitung luas negatif?',
    ],
  },
  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The area of a rectangle is easy: width times height. The area under a curve is not, because the height keeps changing. Riemann\'s idea is to cut the interval from a to b into N equal strips of width Δx = (b − a)/N, stand a rectangle on each strip whose height is the value of the function at one chosen point in that strip, and add up the N areas. The sum is only an approximation, but as N grows the strips get thinner, each rectangle hugs the curve more closely, and the total approaches a single number: the definite integral of f from a to b.',
        'The Rule menu decides where in each strip the height is measured. The Left rule uses the left edge, the Right rule the right edge, and the Midpoint rule the centre. On a stretch where the function is increasing, left rectangles sit below the curve and underestimate, while right rectangles poke above it and overestimate; the exact value is trapped between them. The Trapezoidal option replaces each rectangle by a trapezoid with the two edge heights, which is the same as averaging the left and right sums. It is not strictly a Riemann sum, but it is a close relative and converges quickly.',
        'The readout shows the current sum and, for x², x³ − x and sin(x), the exact integral from an antiderivative along with the error. Dragging N from 5 toward 200 you can watch the error shrink. It does not shrink at the same rate for every rule: for the left and right rules the error falls roughly in proportion to 1/N, so doubling N halves the error, while for the midpoint and trapezoidal rules it falls like 1/N², so doubling N divides the error by about four. The lab panel lets you record these numbers and test the pattern yourself.',
        'A rectangle below the x-axis is drawn in red and its area is counted as negative. That is not a quirk: the definite integral is signed, so for x³ − x from −1 to 1 the positive and negative parts cancel to exactly zero even though the curve clearly encloses some area. For e^(−x²) the simulation shows no exact value, because that integral has no antiderivative in terms of elementary functions; here the rectangle sum is the only way to get a number, which is how integrals are computed in practice when no formula exists. The sliders keep a below b and the window covers x from −3 to 3 and y from −3 to 9, so tall parts of x³ − x are clipped.',
      ],
      id: [
        'Luas persegi panjang itu mudah: lebar kali tinggi. Luas di bawah kurva tidak mudah, karena tingginya terus berubah. Gagasan Riemann: potong selang dari a sampai b menjadi N pita sama lebar Δx = (b − a)/N, dirikan persegi panjang pada tiap pita dengan tinggi sama dengan nilai fungsi di satu titik pilihan dalam pita itu, lalu jumlahkan N luasnya. Jumlah itu hanya pendekatan, tetapi saat N bertambah pita menjadi makin tipis, tiap persegi panjang makin menempel ke kurva, dan totalnya mendekati satu bilangan: integral tentu f dari a sampai b.',
        'Menu Rule menentukan di mana tinggi diukur dalam tiap pita. Aturan Left memakai tepi kiri, Right tepi kanan, dan Midpoint titik tengah. Pada bagian fungsi yang naik, persegi panjang kiri berada di bawah kurva dan menaksir terlalu rendah, sedangkan persegi panjang kanan menjulang di atas kurva dan menaksir terlalu tinggi; nilai eksaknya terjepit di antara keduanya. Pilihan Trapezoidal mengganti tiap persegi panjang dengan trapesium yang memakai dua tinggi tepi, yang sama dengan merata-ratakan jumlah kiri dan kanan. Ini bukan jumlah Riemann dalam arti ketat, tetapi kerabat dekatnya dan konvergen dengan cepat.',
        'Tampilan angka menunjukkan jumlah saat ini dan, untuk x², x³ − x, dan sin(x), integral eksak dari antiturunan beserta galatnya. Dengan menggeser N dari 5 ke arah 200 kamu bisa melihat galat menyusut. Laju penyusutannya tidak sama untuk tiap aturan: untuk aturan kiri dan kanan galat turun kira-kira sebanding dengan 1/N, jadi menggandakan N membagi dua galatnya, sedangkan untuk aturan titik tengah dan trapesium galat turun seperti 1/N², jadi menggandakan N membagi galat sekitar empat kali. Panel lab memungkinkanmu mencatat angka-angka ini dan menguji polanya sendiri.',
        'Persegi panjang di bawah sumbu-x digambar merah dan luasnya dihitung negatif. Itu bukan keanehan: integral tentu bertanda, sehingga untuk x³ − x dari −1 sampai 1 bagian positif dan negatif saling meniadakan menjadi tepat nol meskipun kurva jelas melingkupi suatu luas. Untuk e^(−x²) simulasi tidak menampilkan nilai eksak, karena integral itu tidak punya antiturunan dalam fungsi-fungsi elementer; di sini jumlah persegi panjang adalah satu-satunya cara memperoleh angka, dan begitulah integral dihitung dalam praktik ketika rumusnya tidak ada. Slider menjaga a tetap di bawah b, dan jendela mencakup x dari −3 sampai 3 serta y dari −3 sampai 9, sehingga bagian tinggi x³ − x terpotong.',
      ],
    },
    figure: {
      caption: {
        en: 'Left-rule rectangles under f(x) = x²/2 on [0, 4] with N = 4. Each rectangle has width Δx and height f(xᵢ) at its left edge, so on this rising curve they all fall short; the red-outlined gaps are the error, which shrinks as N grows.',
        id: 'Persegi panjang aturan kiri di bawah f(x) = x²/2 pada [0, 4] dengan N = 4. Tiap persegi panjang berlebar Δx dan bertinggi f(xᵢ) di tepi kirinya, jadi pada kurva yang naik ini semuanya kurang; celah bergaris merah adalah galatnya, yang menyusut saat N bertambah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Rectangles approximating the area under a curve', 'Persegi panjang yang mendekati luas di bawah kurva')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px;opacity:.7}.r{fill:#3b82f6;fill-opacity:.35;stroke:#3b82f6;stroke-width:1.2}</style>
  <line x1="30" y1="215" x2="340" y2="215" class="m"/>
  <line x1="40" y1="10" x2="40" y2="222" class="m"/>
  <rect x="110" y="202.5" width="70" height="12.5" class="r"/>
  <rect x="180" y="165" width="70" height="50" class="r"/>
  <rect x="250" y="102.5" width="70" height="112.5" class="r"/>
  <path d="M110 202.5 Q145 208 180 165 L180 202.5 Z" fill="#ef4444" fill-opacity=".25" stroke="#ef4444" stroke-width="1"/>
  <path d="M180 165 Q215 150 250 102.5 L250 165 Z" fill="#ef4444" fill-opacity=".25" stroke="#ef4444" stroke-width="1"/>
  <path d="M250 102.5 Q285 80 320 15 L320 102.5 Z" fill="#ef4444" fill-opacity=".25" stroke="#ef4444" stroke-width="1"/>
  <path d="M40 215 Q180 215 320 15" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
  <text x="290" y="24" fill="#f59e0b">y = f(x)</text>
  <text x="34" y="229" class="s">a = x₀</text>
  <text x="104" y="229" class="s">x₁</text>
  <text x="174" y="229" class="s">x₂</text>
  <text x="244" y="229" class="s">x₃</text>
  <text x="312" y="229" class="s">b</text>
  <line x1="180" y1="190" x2="250" y2="190" stroke="#10b981" stroke-width="1.5" marker-start="url(#a)" marker-end="url(#a)"/>
  <text x="206" y="186" fill="#10b981">Δx</text>
  <line x1="262" y1="215" x2="262" y2="102.5" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="267" y="160" fill="#8b5cf6">f(x₃)</text>
  <text x="46" y="200" class="s">${L('f(x₀) = 0, so the first rectangle has no height', 'f(x₀) = 0, jadi persegi panjang pertama tak bertinggi')}</text>
  <text x="140" y="60" fill="#ef4444">${L('gaps = error of the sum', 'celah = galat jumlah')}</text>
  <text x="140" y="74" fill="#3b82f6">${L('sum = Σ f(xᵢ)·Δx', 'jumlah = Σ f(xᵢ)·Δx')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A Riemann sum adds up N rectangles of width Δx = (b − a)/N; the definite integral is the limit of that sum as N grows without bound.',
        'On an increasing stretch the left rule underestimates and the right rule overestimates, so the exact area lies between them.',
        'Midpoint and trapezoidal errors shrink like 1/N², far faster than the 1/N of the left and right rules.',
        'Area below the x-axis counts as negative, so an integral can be zero even when the curve encloses area.',
        'When no antiderivative formula exists, as for e^(−x²), a rectangle sum is how the integral is actually computed.',
      ],
      id: [
        'Jumlah Riemann menjumlahkan N persegi panjang berlebar Δx = (b − a)/N; integral tentu adalah limit jumlah itu saat N bertambah tanpa batas.',
        'Pada bagian yang naik, aturan kiri menaksir terlalu rendah dan aturan kanan terlalu tinggi, jadi luas eksak berada di antara keduanya.',
        'Galat titik tengah dan trapesium menyusut seperti 1/N², jauh lebih cepat daripada 1/N pada aturan kiri dan kanan.',
        'Luas di bawah sumbu-x dihitung negatif, sehingga integral bisa nol meskipun kurva melingkupi suatu luas.',
        'Ketika rumus antiturunan tidak ada, seperti untuk e^(−x²), jumlah persegi panjang adalah cara integral benar-benar dihitung.',
      ],
    },
    vocabulary: {
      en: [
        ['Definite integral', 'The signed area between a curve and the x-axis from a to b, written ∫ from a to b of f(x) dx; the limit of Riemann sums.'],
        ['Partition', 'The division of [a, b] into N subintervals; here they are all the same width Δx.'],
        ['Δx', 'The width of each strip, (b − a)/N. Smaller Δx means more, thinner rectangles.'],
        ['Left / right / midpoint rule', 'Choices of where in each strip to measure the height: the left edge, the right edge or the centre.'],
        ['Trapezoidal rule', 'Using a trapezoid with the two edge heights on each strip; equal to the average of the left and right sums.'],
        ['Signed area', 'Area counted positive above the axis and negative below it, which is what the integral measures.'],
        ['Antiderivative', 'A function F whose derivative is f; the exact integral is F(b) − F(a) when such an F is known.'],
        ['Convergence', 'The way an approximation approaches the exact value as N increases.'],
      ],
      id: [
        ['Integral tentu', 'Luas bertanda antara kurva dan sumbu-x dari a sampai b, ditulis ∫ dari a sampai b f(x) dx; limit dari jumlah Riemann.'],
        ['Partisi', 'Pembagian [a, b] menjadi N selang bagian; di sini semuanya sama lebar, Δx.'],
        ['Δx', 'Lebar tiap pita, (b − a)/N. Δx yang lebih kecil berarti persegi panjang lebih banyak dan lebih tipis.'],
        ['Aturan kiri / kanan / titik tengah', 'Pilihan tempat mengukur tinggi dalam tiap pita: tepi kiri, tepi kanan, atau titik tengah.'],
        ['Aturan trapesium', 'Memakai trapesium dengan dua tinggi tepi pada tiap pita; sama dengan rata-rata jumlah kiri dan kanan.'],
        ['Luas bertanda', 'Luas dihitung positif di atas sumbu dan negatif di bawahnya, dan itulah yang diukur integral.'],
        ['Antiturunan', 'Fungsi F yang turunannya f; integral eksak adalah F(b) − F(a) bila F seperti itu diketahui.'],
        ['Konvergensi', 'Cara suatu pendekatan mendekati nilai eksak saat N bertambah.'],
      ],
    },
    misconceptions: {
      en: [
        ['The integral is the area, so it can never be negative.', 'The definite integral is a signed area. Rectangles below the axis contribute negative amounts, which is why x³ − x from −1 to 1 integrates to 0.'],
        ['More rectangles always means the left rule beats the midpoint rule eventually.', 'Both improve, but the midpoint error falls like 1/N² and the left error only like 1/N, so at every N the midpoint rule stays ahead; at N = 200 it is typically hundreds of times more accurate.'],
        ['Right-rule rectangles always overestimate.', 'Only where the function is increasing. On a decreasing stretch, such as sin(x) between π/2 and π, the right rule underestimates and the left rule overestimates.'],
        ['The rectangle sum at N = 200 is the exact value.', 'It is very close, but still an approximation; the error column in the readout is small, not zero. Only the limit as N grows without bound is exact.'],
      ],
      id: [
        ['Integral adalah luas, jadi tidak pernah negatif.', 'Integral tentu adalah luas bertanda. Persegi panjang di bawah sumbu memberi sumbangan negatif, itulah sebabnya x³ − x dari −1 sampai 1 berintegral 0.'],
        ['Dengan persegi panjang yang cukup banyak, aturan kiri akhirnya mengalahkan aturan titik tengah.', 'Keduanya membaik, tetapi galat titik tengah turun seperti 1/N² dan galat kiri hanya seperti 1/N, jadi pada setiap N aturan titik tengah tetap unggul; pada N = 200 biasanya ratusan kali lebih akurat.'],
        ['Persegi panjang aturan kanan selalu menaksir terlalu tinggi.', 'Hanya saat fungsi naik. Pada bagian yang turun, misalnya sin(x) antara π/2 dan π, aturan kanan menaksir terlalu rendah dan aturan kiri terlalu tinggi.'],
        ['Jumlah persegi panjang pada N = 200 adalah nilai eksak.', 'Sangat dekat, tetapi tetap pendekatan; kolom galat di tampilan kecil, bukan nol. Hanya limit saat N bertambah tanpa batas yang eksak.'],
      ],
    },
    realWorld: {
      en: [
        'Distance travelled is the integral of speed over time; a car\'s trip computer effectively adds up speed × short time intervals, which is a Riemann sum.',
        'Surveyors and GIS software estimate the area of an irregular plot of land by slicing it into thin strips, exactly like the rectangles here.',
        'Pharmacologists measure total drug exposure as the area under the blood-concentration curve, computed numerically with the trapezoidal rule.',
        'Any time a computer integrates a function with no closed-form antiderivative, such as the bell curve e^(−x²) used in statistics, it uses a refined version of these sums.',
      ],
      id: [
        'Jarak tempuh adalah integral kelajuan terhadap waktu; komputer perjalanan mobil pada dasarnya menjumlahkan kelajuan × selang waktu pendek, yaitu jumlah Riemann.',
        'Juru ukur dan perangkat lunak GIS menaksir luas sebidang tanah yang tidak beraturan dengan memotongnya menjadi pita-pita tipis, persis seperti persegi panjang di sini.',
        'Ahli farmakologi mengukur total paparan obat sebagai luas di bawah kurva konsentrasi darah, yang dihitung secara numerik dengan aturan trapesium.',
        'Setiap kali komputer mengintegralkan fungsi tanpa antiturunan tertutup, misalnya kurva lonceng e^(−x²) dalam statistika, ia memakai versi yang lebih halus dari jumlah-jumlah ini.',
      ],
    },
    questions: {
      en: [
        { q: 'For f(x) = x² on [0, 3] with N = 3, compute the left and right sums by hand and compare them with the exact value 9.', a: 'Δx = 1. Left: f(0) + f(1) + f(2) = 0 + 1 + 4 = 5. Right: f(1) + f(2) + f(3) = 1 + 4 + 9 = 14. The exact integral 3³/3 = 9 lies between them, closer to neither; the trapezoidal value (5 + 14)/2 = 9.5 is already much better.' },
        { q: 'With x² on [−1, 2] and N = 6 the simulation gives a midpoint sum of about 2.9375 and an exact value of 3. Roughly what midpoint sum do you expect at N = 12, and why?', a: 'The midpoint error is about −0.0625 at N = 6. Doubling N should divide the error by about 4, giving about −0.016, so the sum should be about 2.984. (The actual value is 2.984375.)' },
        { q: 'Set f(x) = x³ − x with a = −1 and b = 1. Why does the exact integral read 0 although the curve clearly bounds two regions?', a: 'From −1 to 0 the curve is above the axis and from 0 to 1 it is below, and because x³ − x is an odd function the two regions have equal area. One counts positive and one negative, so the signed total is 0. To get the total area you would integrate |f| or add the two pieces separately: 1/4 + 1/4 = 1/2.' },
      ],
      id: [
        { q: 'Untuk f(x) = x² pada [0, 3] dengan N = 3, hitung jumlah kiri dan kanan secara manual dan bandingkan dengan nilai eksak 9.', a: 'Δx = 1. Kiri: f(0) + f(1) + f(2) = 0 + 1 + 4 = 5. Kanan: f(1) + f(2) + f(3) = 1 + 4 + 9 = 14. Integral eksak 3³/3 = 9 berada di antara keduanya; nilai trapesium (5 + 14)/2 = 9,5 sudah jauh lebih baik.' },
        { q: 'Dengan x² pada [−1, 2] dan N = 6 simulasi memberi jumlah titik tengah sekitar 2,9375 dan nilai eksak 3. Kira-kira berapa jumlah titik tengah pada N = 12, dan mengapa?', a: 'Galat titik tengah sekitar −0,0625 pada N = 6. Menggandakan N seharusnya membagi galat sekitar 4 kali, menjadi sekitar −0,016, jadi jumlahnya sekitar 2,984. (Nilai sebenarnya 2,984375.)' },
        { q: 'Atur f(x) = x³ − x dengan a = −1 dan b = 1. Mengapa integral eksaknya terbaca 0 padahal kurva jelas membatasi dua daerah?', a: 'Dari −1 sampai 0 kurva berada di atas sumbu dan dari 0 sampai 1 di bawahnya, dan karena x³ − x fungsi ganjil kedua daerah itu sama luas. Satu dihitung positif dan satu negatif, jadi total bertandanya 0. Untuk mendapat luas total kamu perlu mengintegralkan |f| atau menjumlahkan kedua bagian secara terpisah: 1/4 + 1/4 = 1/2.' },
      ],
    },
  },
};
