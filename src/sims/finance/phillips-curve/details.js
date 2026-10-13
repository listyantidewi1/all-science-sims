// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read the short-run inflation/unemployment trade-off.',
      'See how a shift in expected inflation moves the whole curve.',
      'Recognize the natural rate of unemployment as where π = πᵉ.',
    ],
    id: [
      'Membaca trade-off jangka pendek inflasi/pengangguran.',
      'Melihat ekspektasi inflasi menggeser kurva sebagai keseluruhan.',
      'Mengenali tingkat pengangguran alami di mana π = πᵉ.',
    ],
  },
  tryThis: {
    en: [
      'Increase expected inflation — does the curve shift up?',
      'Find the natural rate where actual = expected inflation.',
      "Crank loose policy — what happens to inflation?",
    ],
    id: [
      'Naikkan ekspektasi inflasi — apakah kurva bergeser ke atas?',
      'Cari tingkat alami di mana inflasi aktual = ekspektasi.',
      'Naikkan kebijakan longgar — apa yang terjadi pada inflasi?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In 1958 the economist A. W. Phillips plotted almost a century of British data and found that when unemployment was low, wages (and so prices) rose quickly, and when unemployment was high they rose slowly or fell. The mechanism is intuitive: when workers are scarce, firms must bid up wages to hire and keep them, and they pass the higher costs on as higher prices; when jobs are scarce, workers accept small raises and firms hold prices down. This downward-sloping relation between inflation and unemployment became known as the Phillips curve, and for a while it looked like a menu from which governments could pick a combination.',
        'The 1970s broke the simple menu: inflation and unemployment rose together. Milton Friedman and Edmund Phelps had predicted this by pointing out that what matters for wage bargaining is inflation relative to what people expect. The sim uses this expectations-augmented form: π = πᵉ − a(u − uₙ). Actual inflation π equals expected inflation πᵉ plus a surprise term that is positive when unemployment u is below the natural rate uₙ and negative when it is above. The slope a measures how strongly a one-point gap in unemployment moves inflation. The chart draws the curve across unemployment rates from 0 to 15%, marks uₙ with a vertical amber line, and shows the economy\'s current position as a red dot.',
        'The sliders separate the two kinds of movement economists distinguish. Moving the unemployment slider moves the dot along a fixed curve: this is the short-run trade-off, and in the sim it stands in for policy, since a central bank that eases credit pushes unemployment down and inflation up, while tightening does the reverse. Moving the expected-inflation slider shifts the whole curve up or down without changing its slope: once people expect higher inflation, every unemployment rate comes with higher inflation. The natural-rate slider slides the curve left or right, and the slope slider tilts it, steeper when wages respond strongly to labour-market conditions. Whenever the dot sits exactly on the natural rate, actual inflation equals expected inflation and the sim notes that there is no surprise.',
        'This is the textbook version, not a forecasting model. The curve is a straight line, whereas estimated curves are usually convex, flattening at high unemployment. Expectations are set by a slider and do not adapt; in reality, if the economy is held below uₙ, people gradually revise πᵉ upward, the curve shifts up, and the same unemployment rate brings ever higher inflation. That adaptive process is why the long-run Phillips curve is vertical at uₙ: there is no lasting trade-off, only a temporary one bought with inflation surprises. The sim also omits supply shocks, such as an oil-price jump that raises inflation at any unemployment rate, and it treats uₙ as known, when in practice it can only be estimated and changes over time.',
      ],
      id: [
        'Pada 1958 ekonom A. W. Phillips memplot hampir seabad data Inggris dan menemukan bahwa ketika pengangguran rendah, upah (dan karenanya harga) naik cepat, dan ketika pengangguran tinggi, upah naik lambat atau turun. Mekanismenya masuk akal: saat pekerja langka, perusahaan harus menaikkan upah untuk merekrut dan mempertahankan mereka, lalu meneruskan biaya yang lebih tinggi itu menjadi harga yang lebih tinggi; saat pekerjaan langka, pekerja menerima kenaikan kecil dan perusahaan menahan harga. Hubungan menurun antara inflasi dan pengangguran ini dikenal sebagai kurva Phillips, dan untuk sementara tampak seperti menu yang bisa dipilih pemerintah.',
        'Tahun 1970-an meruntuhkan menu sederhana itu: inflasi dan pengangguran naik bersamaan. Milton Friedman dan Edmund Phelps telah meramalkannya dengan menunjukkan bahwa yang penting dalam tawar-menawar upah adalah inflasi relatif terhadap yang diharapkan orang. Simulasi memakai bentuk yang diperluas dengan ekspektasi ini: π = πᵉ − a(u − uₙ). Inflasi aktual π sama dengan inflasi yang diharapkan πᵉ ditambah suku kejutan yang positif saat pengangguran u di bawah tingkat alami uₙ dan negatif saat di atasnya. Kemiringan a mengukur seberapa kuat selisih satu poin pengangguran menggerakkan inflasi. Grafik menggambar kurva untuk pengangguran dari 0 sampai 15%, menandai uₙ dengan garis vertikal kuning, dan menunjukkan posisi ekonomi saat ini sebagai titik merah.',
        'Slider memisahkan dua jenis gerakan yang dibedakan para ekonom. Menggeser slider pengangguran menggerakkan titik sepanjang kurva yang tetap: inilah trade-off jangka pendek, dan di simulasi ia mewakili kebijakan, karena bank sentral yang melonggarkan kredit mendorong pengangguran turun dan inflasi naik, sementara pengetatan berlaku sebaliknya. Menggeser slider ekspektasi inflasi menggeser seluruh kurva ke atas atau ke bawah tanpa mengubah kemiringannya: begitu orang mengharapkan inflasi lebih tinggi, setiap tingkat pengangguran datang dengan inflasi lebih tinggi. Slider tingkat alami menggeser kurva ke kiri atau kanan, dan slider kemiringan memiringkannya, lebih curam saat upah merespons kuat kondisi pasar tenaga kerja. Setiap kali titik tepat berada di tingkat alami, inflasi aktual sama dengan ekspektasi dan simulasi mencatat tidak ada kejutan.',
        'Ini versi buku teks, bukan model peramalan. Kurvanya garis lurus, sedangkan kurva hasil estimasi biasanya konveks, mendatar pada pengangguran tinggi. Ekspektasi diatur slider dan tidak beradaptasi; dalam kenyataan, jika ekonomi ditahan di bawah uₙ, orang perlahan merevisi πᵉ ke atas, kurva bergeser naik, dan tingkat pengangguran yang sama membawa inflasi yang semakin tinggi. Proses adaptif itulah sebabnya kurva Phillips jangka panjang vertikal di uₙ: tidak ada trade-off yang langgeng, hanya yang sementara dan dibeli dengan kejutan inflasi. Simulasi juga mengabaikan guncangan penawaran, seperti lonjakan harga minyak yang menaikkan inflasi pada tingkat pengangguran mana pun, dan memperlakukan uₙ sebagai diketahui, padahal dalam praktik ia hanya bisa diestimasi dan berubah seiring waktu.',
      ],
    },
    figure: {
      caption: {
        en: 'Two short-run Phillips curves with slope a = 1.5 and natural rate uₙ = 5%. With expected inflation of 2% (blue), pushing unemployment down to 3% raises inflation to 5%. If people come to expect 6% (purple), the whole curve shifts up and 3% unemployment brings 9% inflation. In the long run the economy returns to uₙ, the vertical line, at whatever inflation is expected.',
        id: 'Dua kurva Phillips jangka pendek dengan kemiringan a = 1,5 dan tingkat alami uₙ = 5%. Dengan ekspektasi inflasi 2% (biru), menekan pengangguran ke 3% menaikkan inflasi ke 5%. Jika orang mulai mengharapkan 6% (ungu), seluruh kurva bergeser naik dan pengangguran 3% membawa inflasi 9%. Dalam jangka panjang ekonomi kembali ke uₙ, garis vertikal, pada tingkat inflasi apa pun yang diharapkan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Short-run Phillips curves shifting with expected inflation around a vertical long-run curve', 'Kurva Phillips jangka pendek bergeser bersama ekspektasi inflasi di sekitar kurva jangka panjang vertikal')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.s{font-size:10px;opacity:.75}.c{fill:none;stroke-width:2.6}</style>
  <line x1="50" y1="30" x2="50" y2="210" class="ax"/>
  <line x1="50" y1="210" x2="330" y2="210" class="ax"/>
  <line x1="50" y1="165" x2="330" y2="165" stroke="currentColor" stroke-width=".8" stroke-dasharray="3 3" opacity=".4"/>
  <text x="30" y="169" class="s">0%</text>
  <text x="30" y="124" class="s">5%</text>
  <text x="26" y="79" class="s">10%</text>
  <text x="46" y="224" class="s">0</text>
  <text x="136" y="224" class="s">5%</text>
  <text x="228" y="224" class="s">10%</text>
  <text x="222" y="238" class="s">${L('unemployment u', 'pengangguran u')} →</text>
  <text x="54" y="26" class="s">${L('inflation π', 'inflasi π')}</text>
  <line x1="143.3" y1="30" x2="143.3" y2="210" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 3"/>
  <text x="148" y="200" fill="#f59e0b" class="s">uₙ = 5%</text>
  <text x="148" y="40" fill="#f59e0b" class="s">${L('long-run curve', 'kurva jangka panjang')}</text>
  <line x1="50" y1="79.5" x2="230.4" y2="210" class="c" stroke="#3b82f6"/>
  <line x1="50" y1="43.5" x2="280.2" y2="210" class="c" stroke="#8b5cf6"/>
  <circle cx="143.3" cy="147" r="4.5" fill="#3b82f6"/>
  <circle cx="143.3" cy="111" r="4.5" fill="#8b5cf6"/>
  <circle cx="106" cy="120" r="5.5" fill="#ef4444"/>
  <circle cx="106" cy="84" r="5.5" fill="#ef4444" opacity=".55"/>
  <text x="56" y="112" fill="#ef4444" class="s">u = 3%, π = 5%</text>
  <text x="56" y="76" fill="#ef4444" class="s">u = 3%, π = 9%</text>
  <text x="190" y="176" fill="#3b82f6">πᵉ = 2%</text>
  <text x="236" y="152" fill="#8b5cf6">πᵉ = 6%</text>
  <text x="178" y="60" fill="#8b5cf6" class="s">${L('higher expectations', 'ekspektasi lebih tinggi')}</text>
  <text x="178" y="71" fill="#8b5cf6" class="s">${L('shift the curve up', 'menggeser kurva ke atas')}</text>
  <text x="196" y="110" class="s">π = πᵉ − a(u − uₙ)</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In the short run, lower unemployment tends to come with higher inflation, because scarce labour pushes wages and prices up.',
        'The expectations-augmented curve π = πᵉ − a(u − uₙ) says actual inflation is expected inflation plus a surprise driven by the unemployment gap.',
        'Changing unemployment moves the economy along a curve; changing expected inflation shifts the whole curve.',
        'At the natural rate uₙ, actual and expected inflation coincide, so there is no inflation surprise.',
        'Because expectations eventually catch up, the long-run Phillips curve is vertical: unemployment cannot be held below uₙ permanently without ever-rising inflation.',
      ],
      id: [
        'Dalam jangka pendek, pengangguran lebih rendah cenderung datang bersama inflasi lebih tinggi, karena tenaga kerja yang langka mendorong upah dan harga naik.',
        'Kurva yang diperluas dengan ekspektasi π = πᵉ − a(u − uₙ) menyatakan inflasi aktual adalah ekspektasi inflasi ditambah kejutan yang digerakkan oleh selisih pengangguran.',
        'Mengubah pengangguran menggerakkan ekonomi sepanjang kurva; mengubah ekspektasi inflasi menggeser seluruh kurva.',
        'Pada tingkat alami uₙ, inflasi aktual dan ekspektasi berimpit, sehingga tidak ada kejutan inflasi.',
        'Karena ekspektasi akhirnya menyusul, kurva Phillips jangka panjang vertikal: pengangguran tidak bisa ditahan di bawah uₙ selamanya tanpa inflasi yang terus naik.',
      ],
    },
    vocabulary: {
      en: [
        ['Inflation (π)', 'The yearly percentage rise in the general price level.'],
        ['Unemployment rate (u)', 'The share of the labour force that is looking for work but has none.'],
        ['Expected inflation (πᵉ)', 'The inflation that workers and firms build into wage and price decisions.'],
        ['Natural rate of unemployment (uₙ)', 'The unemployment rate at which inflation equals expected inflation; also called the NAIRU.'],
        ['Short-run Phillips curve', 'The downward-sloping relation between π and u for a given level of expected inflation.'],
        ['Long-run Phillips curve', 'The vertical line at uₙ that results once expectations have fully adjusted.'],
        ['Stagflation', 'High inflation and high unemployment at the same time, as in the 1970s.'],
        ['Inflation surprise', 'The gap π − πᵉ between actual and expected inflation; it is what moves unemployment away from uₙ.'],
      ],
      id: [
        ['Inflasi (π)', 'Persentase kenaikan tingkat harga umum per tahun.'],
        ['Tingkat pengangguran (u)', 'Bagian angkatan kerja yang mencari pekerjaan tetapi belum memilikinya.'],
        ['Ekspektasi inflasi (πᵉ)', 'Inflasi yang diperhitungkan pekerja dan perusahaan dalam keputusan upah dan harga.'],
        ['Tingkat pengangguran alami (uₙ)', 'Tingkat pengangguran saat inflasi sama dengan ekspektasi inflasi; disebut juga NAIRU.'],
        ['Kurva Phillips jangka pendek', 'Hubungan menurun antara π dan u untuk suatu tingkat ekspektasi inflasi tertentu.'],
        ['Kurva Phillips jangka panjang', 'Garis vertikal pada uₙ yang terbentuk setelah ekspektasi menyesuaikan sepenuhnya.'],
        ['Stagflasi', 'Inflasi tinggi dan pengangguran tinggi pada saat yang sama, seperti pada 1970-an.'],
        ['Kejutan inflasi', 'Selisih π − πᵉ antara inflasi aktual dan ekspektasi; inilah yang menggerakkan pengangguran menjauh dari uₙ.'],
      ],
    },
    misconceptions: {
      en: [
        ['A government can permanently buy low unemployment with a bit more inflation.', 'Only while the inflation is a surprise. As people revise their expectations the curve shifts up, and holding unemployment below uₙ then requires ever higher inflation. In the long run the curve is vertical.'],
        ['Inflation and unemployment always move in opposite directions.', 'They do along a given curve, but a shift of the curve, from higher expectations or a supply shock such as an oil-price jump, can raise both at once. The 1970s stagflation is the classic case.'],
        ['The natural rate means zero unemployment.', 'It is the unemployment that remains when inflation is stable, typically several percent, because people are always between jobs and skills do not match vacancies perfectly. In the sim it defaults to 5%.'],
        ['Expected inflation is just last year\'s inflation.', 'Expectations can be formed from past inflation, from central-bank announcements, or from forecasts of policy. The sim leaves πᵉ as an independent slider precisely so you can see its effect separately.'],
      ],
      id: [
        ['Pemerintah bisa membeli pengangguran rendah secara permanen dengan sedikit inflasi tambahan.', 'Hanya selama inflasi itu berupa kejutan. Saat orang merevisi ekspektasinya, kurva bergeser naik, dan menahan pengangguran di bawah uₙ kemudian menuntut inflasi yang semakin tinggi. Dalam jangka panjang kurvanya vertikal.'],
        ['Inflasi dan pengangguran selalu bergerak berlawanan arah.', 'Benar sepanjang satu kurva, tetapi pergeseran kurva, dari ekspektasi yang lebih tinggi atau guncangan penawaran seperti lonjakan harga minyak, bisa menaikkan keduanya sekaligus. Stagflasi 1970-an adalah contoh klasiknya.'],
        ['Tingkat alami berarti pengangguran nol.', 'Itu adalah pengangguran yang tersisa saat inflasi stabil, biasanya beberapa persen, karena selalu ada orang yang berpindah pekerjaan dan keterampilan tidak selalu cocok dengan lowongan. Di simulasi nilai bawaannya 5%.'],
        ['Ekspektasi inflasi sama saja dengan inflasi tahun lalu.', 'Ekspektasi bisa dibentuk dari inflasi masa lalu, pengumuman bank sentral, atau perkiraan kebijakan. Simulasi membiarkan πᵉ sebagai slider tersendiri justru agar efeknya bisa dilihat terpisah.'],
      ],
    },
    realWorld: {
      en: [
        'The stagflation of the 1970s, when oil shocks and rising expectations pushed inflation and unemployment up together, is the episode that forced economists to add expectations to the curve.',
        'Central banks such as Bank Indonesia and the US Federal Reserve announce inflation targets partly to anchor πᵉ, because stable expectations keep the short-run curve from drifting upward.',
        'Policymakers watch estimates of the natural rate closely: if unemployment falls well below it, the model predicts rising inflation, which is a signal to tighten policy.',
        'Milton Friedman and Edmund Phelps each received the Nobel Memorial Prize in Economics, in 1976 and 2006, with the natural-rate hypothesis among their cited contributions.',
      ],
      id: [
        'Stagflasi 1970-an, ketika guncangan harga minyak dan ekspektasi yang meningkat mendorong inflasi dan pengangguran naik bersamaan, adalah episode yang memaksa para ekonom menambahkan ekspektasi ke dalam kurva.',
        'Bank sentral seperti Bank Indonesia dan Federal Reserve AS mengumumkan target inflasi sebagian untuk menjangkar πᵉ, karena ekspektasi yang stabil mencegah kurva jangka pendek merayap naik.',
        'Pembuat kebijakan mengamati estimasi tingkat alami dengan saksama: jika pengangguran turun jauh di bawahnya, model meramalkan inflasi naik, yang menjadi sinyal untuk mengetatkan kebijakan.',
        'Milton Friedman dan Edmund Phelps masing-masing menerima Hadiah Nobel Ekonomi, pada 1976 dan 2006, dengan hipotesis tingkat alami di antara kontribusi yang disebutkan.',
      ],
    },
    questions: {
      en: [
        { q: 'With expected inflation 2%, natural rate 5% and slope 1.5, what inflation does the model predict when unemployment is 3%? And when it is 7%?', a: 'π = 2% − 1.5 × (3% − 5%) = 2% + 3% = 5%. At 7% unemployment, π = 2% − 1.5 × (7% − 5%) = 2% − 3% = −1%, a mild deflation. The gap from uₙ is the same size, so the surprise is equal and opposite.' },
        { q: 'The economy sits at 3% unemployment with 5% inflation, and over time people come to expect 5% inflation. What happens to the curve, and to inflation if unemployment is kept at 3%?', a: 'Expected inflation rises from 2% to 5%, so the whole curve shifts up by 3 points. Keeping u at 3% then gives π = 5% − 1.5 × (−2%) = 8%. Repeating the process pushes inflation higher each round, which is why unemployment cannot be held below uₙ without accelerating inflation.' },
        { q: 'Why does doubling the slope a leave inflation unchanged at the natural rate but double the effect of a given unemployment gap?', a: 'Inflation is πᵉ − a(u − uₙ). At u = uₙ the bracket is zero, so a multiplies nothing and π = πᵉ regardless of a. Away from uₙ the bracket is non-zero and its effect scales with a, so a steeper curve means a stronger inflation response to the same unemployment gap.' },
      ],
      id: [
        { q: 'Dengan ekspektasi inflasi 2%, tingkat alami 5%, dan kemiringan 1,5, berapa inflasi yang diramalkan model saat pengangguran 3%? Dan saat 7%?', a: 'π = 2% − 1,5 × (3% − 5%) = 2% + 3% = 5%. Pada pengangguran 7%, π = 2% − 1,5 × (7% − 5%) = 2% − 3% = −1%, deflasi ringan. Selisih dari uₙ sama besarnya, sehingga kejutannya sama besar dan berlawanan tanda.' },
        { q: 'Ekonomi berada pada pengangguran 3% dengan inflasi 5%, dan seiring waktu orang mulai mengharapkan inflasi 5%. Apa yang terjadi pada kurva, dan pada inflasi jika pengangguran ditahan di 3%?', a: 'Ekspektasi inflasi naik dari 2% ke 5%, sehingga seluruh kurva bergeser naik 3 poin. Menahan u di 3% kemudian memberi π = 5% − 1,5 × (−2%) = 8%. Mengulang proses ini mendorong inflasi semakin tinggi tiap putaran, itulah sebabnya pengangguran tidak bisa ditahan di bawah uₙ tanpa inflasi yang terus meningkat.' },
        { q: 'Mengapa menggandakan kemiringan a tidak mengubah inflasi pada tingkat alami tetapi menggandakan efek suatu selisih pengangguran?', a: 'Inflasi adalah πᵉ − a(u − uₙ). Pada u = uₙ tanda kurungnya nol, sehingga a mengalikan nol dan π = πᵉ apa pun nilai a. Di luar uₙ tanda kurungnya tidak nol dan efeknya berskala dengan a, sehingga kurva lebih curam berarti respons inflasi lebih kuat terhadap selisih pengangguran yang sama.' },
      ],
    },
  },
};
