// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the four phases: filling, isovolumetric contraction, ejection, isovolumetric relaxation.',
      'Recognize the lub-dub heart sounds (S1 = AV close, S2 = aortic close).',
      'Trace the pressure-volume loop and read stroke volume from its width.',
    ],
    id: [
      'Mengidentifikasi empat fase: pengisian, kontraksi isovolumetrik, ejeksi, relaksasi isovolumetrik.',
      'Mengenali bunyi lub-dub (S1 = AV menutup, S2 = aorta menutup).',
      'Menelusuri loop tekanan-volume dan membaca volume sekuncup dari lebarnya.',
    ],
  },
  tryThis: {
    en: [
      'Resting heart rate 60 bpm — one cycle per second.',
      'Crank to 180 bpm (intense exercise) — diastole shrinks more than systole.',
      'Reduce contractility — loop area shrinks, less work per beat.',
    ],
    id: [
      'Denyut istirahat 60 bpm — satu siklus per detik.',
      'Naikkan ke 180 bpm (olahraga berat) — diastol menyusut lebih banyak daripada sistol.',
      'Kurangi kontraktilitas — luas loop menyusut, kerja per detak berkurang.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The heart is two pumps working side by side. Each side has an atrium that receives blood and a ventricle that pumps it out: the right side sends blood to the lungs, the left side sends it round the body. One heartbeat is one cardiac cycle, made of diastole, when the ventricles relax and fill, and systole, when they contract and eject. Four valves keep the blood moving one way. The atrioventricular (AV) valves, tricuspid on the right and mitral on the left, sit between atrium and ventricle; the semilunar valves, pulmonary and aortic, guard the exits. Valves have no muscles of their own: they are flaps pushed open and shut purely by pressure differences.',
        'Follow the left ventricle through one cycle. During filling its pressure is low (about 5 to 10 mmHg), the mitral valve is open and blood flows in until the ventricle holds about 130 mL, the end-diastolic volume. Contraction begins and pressure rises; as soon as it exceeds atrial pressure the mitral valve snaps shut (the "lub", S1). For a moment both valves are closed, so volume cannot change while pressure climbs steeply: isovolumetric contraction. When ventricular pressure passes aortic pressure (about 80 mmHg) the aortic valve opens and ejection begins; pressure peaks near 120 mmHg while about 80 mL is pumped out, leaving the end-systolic volume of about 50 mL. The ventricle relaxes, pressure falls below aortic pressure, the aortic valve closes (the "dub", S2), and pressure drops with both valves closed again, isovolumetric relaxation, until it falls below atrial pressure and filling restarts.',
        'The simulation plots this as a pressure-volume loop: filling runs along the bottom, the two isovolumetric phases are the vertical sides, and ejection is the top. The loop\'s width is the stroke volume (130 − 50 = 80 mL) and its area is the work done per beat. The heart-rate slider sets how quickly the cycle repeats; in this sim every phase keeps the same share of the cycle, so the whole loop just runs faster. The contractility slider scales how hard the ventricle squeezes: the loop grows taller and encloses more area, meaning more work per beat. Cardiac output is heart rate × stroke volume: at 70 bpm, 70 × 80 mL = 5.6 L/min.',
        'The sim is deliberately idealised. It models only the left ventricle, with pressure and volume following fixed curves, and the heart silhouette simply scales with volume rather than showing chambers. Real hearts shorten diastole much more than systole when the rate rises, so filling time and stroke volume fall at very high rates; this sim keeps the proportions fixed. Likewise, higher contractility in a real heart ejects more blood (a smaller end-systolic volume), whereas here the stroke volume stays at 80 mL and only the pressure changes. Heart sounds, the ECG, atrial pressures and the right ventricle are not shown.',
      ],
      id: [
        'Jantung adalah dua pompa yang bekerja berdampingan. Tiap sisi memiliki atrium yang menerima darah dan ventrikel yang memompanya keluar: sisi kanan mengirim darah ke paru-paru, sisi kiri mengedarkannya ke seluruh tubuh. Satu denyut jantung adalah satu siklus jantung, terdiri atas diastol, saat ventrikel berelaksasi dan terisi, dan sistol, saat ventrikel berkontraksi dan memompa. Empat katup menjaga darah mengalir satu arah. Katup atrioventrikular (AV), trikuspid di kanan dan mitral di kiri, berada di antara atrium dan ventrikel; katup semilunar, pulmonal dan aorta, menjaga pintu keluar. Katup tidak punya otot sendiri: katup adalah daun yang terbuka dan tertutup semata-mata karena perbedaan tekanan.',
        'Ikuti ventrikel kiri melalui satu siklus. Selama pengisian, tekanannya rendah (sekitar 5 sampai 10 mmHg), katup mitral terbuka, dan darah mengalir masuk sampai ventrikel menampung sekitar 130 mL, yaitu volume akhir diastol. Kontraksi dimulai dan tekanan naik; begitu melampaui tekanan atrium, katup mitral menutup ("lub", S1). Sesaat kedua katup tertutup, sehingga volume tidak bisa berubah sementara tekanan naik tajam: kontraksi isovolumetrik. Ketika tekanan ventrikel melewati tekanan aorta (sekitar 80 mmHg), katup aorta terbuka dan ejeksi dimulai; tekanan memuncak di dekat 120 mmHg sementara sekitar 80 mL dipompa keluar, menyisakan volume akhir sistol sekitar 50 mL. Ventrikel berelaksasi, tekanan turun di bawah tekanan aorta, katup aorta menutup ("dub", S2), dan tekanan turun dengan kedua katup tertutup lagi, relaksasi isovolumetrik, sampai turun di bawah tekanan atrium dan pengisian dimulai kembali.',
        'Simulasi menggambarkannya sebagai loop tekanan-volume: pengisian berjalan di sisi bawah, dua fase isovolumetrik adalah sisi tegaknya, dan ejeksi adalah sisi atas. Lebar loop adalah volume sekuncup (130 − 50 = 80 mL) dan luasnya adalah kerja per denyut. Slider denyut jantung mengatur seberapa cepat siklus berulang; dalam simulasi ini setiap fase mempertahankan porsi siklus yang sama, sehingga seluruh loop hanya berjalan lebih cepat. Slider kontraktilitas mengatur seberapa kuat ventrikel memeras: loop menjadi lebih tinggi dan melingkupi luas lebih besar, artinya kerja per denyut lebih besar. Curah jantung adalah denyut jantung × volume sekuncup: pada 70 bpm, 70 × 80 mL = 5,6 L/menit.',
        'Simulasi ini sengaja diidealkan. Ia hanya memodelkan ventrikel kiri, dengan tekanan dan volume mengikuti kurva tetap, dan siluet jantung hanya membesar-mengecil mengikuti volume tanpa menampilkan ruang-ruangnya. Jantung sungguhan memperpendek diastol jauh lebih banyak daripada sistol saat denyut naik, sehingga waktu pengisian dan volume sekuncup turun pada denyut sangat tinggi; simulasi ini mempertahankan proporsinya tetap. Demikian pula, kontraktilitas yang lebih tinggi pada jantung nyata memompa lebih banyak darah (volume akhir sistol lebih kecil), sedangkan di sini volume sekuncup tetap 80 mL dan hanya tekanannya yang berubah. Bunyi jantung, EKG, tekanan atrium, dan ventrikel kanan tidak ditampilkan.',
      ],
    },
    figure: {
      caption: {
        en: 'The four chambers and four valves (left), and the four phases of one beat in the left ventricle (right). The AV valves open during filling; the semilunar valves open during ejection; during the two isovolumetric phases all four are shut.',
        id: 'Empat ruang dan empat katup (kiri), serta empat fase satu denyut di ventrikel kiri (kanan). Katup AV terbuka saat pengisian; katup semilunar terbuka saat ejeksi; selama dua fase isovolumetrik keempatnya tertutup.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Heart chambers, valves and the phases of one beat', 'Ruang jantung, katup, dan fase satu denyut')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.b{font-weight:700}.s{font-size:8.5px;opacity:.75}.ch{stroke:currentColor;stroke-width:1.2;opacity:.9}.v{stroke:currentColor;stroke-width:2.5}.f{stroke-width:1.5;fill:none}</style>
  <rect x="20" y="40" width="70" height="55" rx="10" fill="#3b82f6" opacity=".25" class="ch"/>
  <rect x="100" y="40" width="70" height="55" rx="10" fill="#ef4444" opacity=".25" class="ch"/>
  <rect x="20" y="115" width="70" height="80" rx="10" fill="#3b82f6" opacity=".35" class="ch"/>
  <rect x="100" y="115" width="70" height="80" rx="10" fill="#ef4444" opacity=".35" class="ch"/>
  <text x="55" y="62" text-anchor="middle" class="b">${L('right atrium', 'atrium kanan')}</text>
  <text x="55" y="76" text-anchor="middle" class="s">${L('from body', 'dari tubuh')}</text>
  <text x="135" y="62" text-anchor="middle" class="b">${L('left atrium', 'atrium kiri')}</text>
  <text x="135" y="76" text-anchor="middle" class="s">${L('from lungs', 'dari paru')}</text>
  <text x="55" y="150" text-anchor="middle" class="b">${L('right', 'ventrikel')}</text>
  <text x="55" y="162" text-anchor="middle" class="b">${L('ventricle', 'kanan')}</text>
  <text x="135" y="150" text-anchor="middle" class="b">${L('left', 'ventrikel')}</text>
  <text x="135" y="162" text-anchor="middle" class="b">${L('ventricle', 'kiri')}</text>
  <line x1="42" y1="105" x2="68" y2="105" class="v" stroke="#10b981"/>
  <text x="55" y="113" text-anchor="middle" class="s" fill="#10b981">${L('tricuspid', 'trikuspid')}</text>
  <line x1="122" y1="105" x2="148" y2="105" class="v" stroke="#10b981"/>
  <text x="135" y="113" text-anchor="middle" class="s" fill="#10b981">${L('mitral', 'mitral')}</text>
  <path d="M55 195 L55 212 L20 212" class="f" stroke="#3b82f6" marker-end="url(#c)"/>
  <line x1="55" y1="198" x2="55" y2="208" class="v" stroke="#f59e0b"/>
  <text x="62" y="222" class="s" fill="#f59e0b">${L('pulmonary valve → lungs', 'katup pulmonal → paru')}</text>
  <path d="M135 195 L135 212 L170 212" class="f" stroke="#ef4444" marker-end="url(#c)"/>
  <line x1="135" y1="198" x2="135" y2="208" class="v" stroke="#f59e0b"/>
  <text x="100" y="234" class="s" fill="#f59e0b">${L('aortic valve → body', 'katup aorta → tubuh')}</text>
  <text x="95" y="26" text-anchor="middle" class="s">${L('blue: low-oxygen blood, red: oxygen-rich', 'biru: darah miskin O₂, merah: kaya O₂')}</text>
  <line x1="190" y1="30" x2="190" y2="200" stroke="currentColor" stroke-width="1" opacity=".4"/>
  <text x="275" y="30" text-anchor="middle" class="b">${L('one beat, left ventricle', 'satu denyut, ventrikel kiri')}</text>
  <rect x="205" y="42" width="140" height="28" rx="4" fill="#3b82f6" opacity=".3"/>
  <text x="212" y="54" class="b">1 ${L('filling', 'pengisian')}</text>
  <text x="212" y="65" class="s">${L('mitral open · 50 → 130 mL', 'mitral terbuka · 50 → 130 mL')}</text>
  <rect x="205" y="78" width="140" height="28" rx="4" fill="#f59e0b" opacity=".3"/>
  <text x="212" y="90" class="b">2 ${L('isovolumetric contraction', 'kontraksi isovolumetrik')}</text>
  <text x="212" y="101" class="s">${L('all valves shut · S1 "lub"', 'semua katup tertutup · S1 "lub"')}</text>
  <rect x="205" y="114" width="140" height="28" rx="4" fill="#ef4444" opacity=".3"/>
  <text x="212" y="126" class="b">3 ${L('ejection', 'ejeksi')}</text>
  <text x="212" y="137" class="s">${L('aortic open · 130 → 50 mL · ~120 mmHg', 'aorta terbuka · 130 → 50 mL · ~120 mmHg')}</text>
  <rect x="205" y="150" width="140" height="28" rx="4" fill="#8b5cf6" opacity=".3"/>
  <text x="212" y="162" class="b">4 ${L('isovolumetric relaxation', 'relaksasi isovolumetrik')}</text>
  <text x="212" y="173" class="s">${L('all valves shut · S2 "dub"', 'semua katup tertutup · S2 "dub"')}</text>
  <text x="275" y="196" text-anchor="middle" class="s">${L('stroke volume = 130 − 50 = 80 mL', 'volume sekuncup = 130 − 50 = 80 mL')}</text>
  <text x="275" y="210" text-anchor="middle" class="s">${L('ejection fraction = 80 ÷ 130 ≈ 62%', 'fraksi ejeksi = 80 ÷ 130 ≈ 62%')}</text>
  <defs><marker id="c" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'One cardiac cycle is diastole (relax and fill) followed by systole (contract and eject).',
        'Valves open and close passively, driven only by the pressure difference across them.',
        'During the two isovolumetric phases all valves are closed, so pressure changes while volume stays fixed; these are the vertical sides of the PV loop.',
        'Stroke volume = end-diastolic volume − end-systolic volume; the loop\'s width shows it, and its area is the work per beat.',
        'Cardiac output = heart rate × stroke volume, about 5 L/min at rest.',
      ],
      id: [
        'Satu siklus jantung adalah diastol (relaksasi dan pengisian) diikuti sistol (kontraksi dan ejeksi).',
        'Katup membuka dan menutup secara pasif, hanya digerakkan oleh perbedaan tekanan di kedua sisinya.',
        'Selama dua fase isovolumetrik semua katup tertutup, sehingga tekanan berubah sementara volume tetap; inilah sisi tegak loop PV.',
        'Volume sekuncup = volume akhir diastol − volume akhir sistol; lebar loop menunjukkannya, dan luasnya adalah kerja per denyut.',
        'Curah jantung = denyut jantung × volume sekuncup, sekitar 5 L/menit saat istirahat.',
      ],
    },
    vocabulary: {
      en: [
        ['Systole', 'The phase in which the ventricles contract and eject blood.'],
        ['Diastole', 'The phase in which the ventricles relax and fill with blood.'],
        ['Atrioventricular (AV) valves', 'Tricuspid (right) and mitral (left) valves between atria and ventricles; their closing makes the first heart sound.'],
        ['Semilunar valves', 'Pulmonary and aortic valves at the ventricle outlets; their closing makes the second heart sound.'],
        ['Isovolumetric', 'Happening at constant volume; the brief moments when all valves are shut.'],
        ['End-diastolic volume (EDV)', 'Blood in the ventricle at the end of filling, about 130 mL in the sim.'],
        ['Stroke volume (SV)', 'Blood ejected per beat, EDV − ESV, about 80 mL.'],
        ['Cardiac output', 'Blood pumped per minute: heart rate × stroke volume.'],
      ],
      id: [
        ['Sistol', 'Fase ketika ventrikel berkontraksi dan memompa darah keluar.'],
        ['Diastol', 'Fase ketika ventrikel berelaksasi dan terisi darah.'],
        ['Katup atrioventrikular (AV)', 'Katup trikuspid (kanan) dan mitral (kiri) di antara atrium dan ventrikel; penutupannya menghasilkan bunyi jantung pertama.'],
        ['Katup semilunar', 'Katup pulmonal dan aorta di pintu keluar ventrikel; penutupannya menghasilkan bunyi jantung kedua.'],
        ['Isovolumetrik', 'Berlangsung pada volume tetap; saat singkat ketika semua katup tertutup.'],
        ['Volume akhir diastol (EDV)', 'Darah di ventrikel pada akhir pengisian, sekitar 130 mL dalam simulasi.'],
        ['Volume sekuncup (SV)', 'Darah yang dipompa per denyut, EDV − ESV, sekitar 80 mL.'],
        ['Curah jantung', 'Darah yang dipompa per menit: denyut jantung × volume sekuncup.'],
      ],
    },
    misconceptions: {
      en: [
        ['The heart valves are opened and closed by nerves or by their own muscles.', 'Valves are passive flaps. They open when pressure behind them is higher and close when pressure in front is higher. The heart muscle sets the pressures; the valves just respond.'],
        ['The "lub-dub" is the sound of the heart muscle contracting.', 'The sounds come from valves closing: S1 as the AV valves shut at the start of systole, S2 as the aortic and pulmonary valves shut at its end.'],
        ['The ventricle empties completely with each beat.', 'About 50 mL remains at the end of systole. The ejection fraction, about 60% in a healthy heart, is the share of the end-diastolic volume that is pumped out.'],
        ['A faster heart rate always means proportionally more blood pumped.', 'Only up to a point. Filling time shrinks as the rate rises, so stroke volume eventually falls; very fast rhythms can pump less blood than moderate ones. The sim does not show this fall-off.'],
      ],
      id: [
        ['Katup jantung dibuka dan ditutup oleh saraf atau oleh ototnya sendiri.', 'Katup adalah daun pasif. Katup terbuka saat tekanan di belakangnya lebih tinggi dan tertutup saat tekanan di depannya lebih tinggi. Otot jantung yang mengatur tekanan; katup hanya mengikuti.'],
        ['"Lub-dub" adalah bunyi otot jantung berkontraksi.', 'Bunyi itu berasal dari katup yang menutup: S1 saat katup AV menutup di awal sistol, S2 saat katup aorta dan pulmonal menutup di akhirnya.'],
        ['Ventrikel kosong sepenuhnya pada tiap denyut.', 'Sekitar 50 mL tetap tersisa di akhir sistol. Fraksi ejeksi, sekitar 60% pada jantung sehat, adalah bagian volume akhir diastol yang dipompa keluar.'],
        ['Denyut lebih cepat selalu berarti darah yang dipompa bertambah secara sebanding.', 'Hanya sampai batas tertentu. Waktu pengisian menyusut saat denyut naik, sehingga volume sekuncup akhirnya turun; irama yang sangat cepat bisa memompa lebih sedikit darah daripada irama sedang. Simulasi tidak menampilkan penurunan ini.'],
      ],
    },
    realWorld: {
      en: [
        'A blood pressure reading of 120/80 mmHg is the peak aortic pressure during ejection over the lowest aortic pressure during diastole.',
        'Echocardiograms measure the ejection fraction; a value well below about 55% is a sign of heart failure with reduced pumping strength.',
        'Endurance athletes develop larger ventricles and a bigger stroke volume, so their resting heart rate can be below 50 bpm while cardiac output stays normal.',
        'A doctor with a stethoscope listens to S1 and S2; a murmur between them is often a leaking or narrowed valve.',
      ],
      id: [
        'Bacaan tekanan darah 120/80 mmHg adalah tekanan aorta puncak saat ejeksi dibandingkan tekanan aorta terendah saat diastol.',
        'Ekokardiogram mengukur fraksi ejeksi; nilai jauh di bawah sekitar 55% menandakan gagal jantung dengan daya pompa menurun.',
        'Atlet ketahanan memiliki ventrikel lebih besar dan volume sekuncup lebih besar, sehingga denyut istirahatnya bisa di bawah 50 bpm sementara curah jantungnya tetap normal.',
        'Dokter dengan stetoskop mendengarkan S1 dan S2; bising di antara keduanya sering berarti katup yang bocor atau menyempit.',
      ],
    },
    questions: {
      en: [
        { q: 'In the sim the ventricle holds 130 mL at the end of filling and 50 mL at the end of ejection. What are the stroke volume and the ejection fraction?', a: 'Stroke volume = 130 − 50 = 80 mL. Ejection fraction = 80 ÷ 130 ≈ 0.62, or 62%. On the PV loop, 80 mL is the distance between the two vertical sides.' },
        { q: 'At 70 bpm with a stroke volume of 80 mL, what is the cardiac output? If the rate rises to 180 bpm, would you expect the output to rise in proportion?', a: '70 × 80 = 5 600 mL/min = 5.6 L/min. In proportion it would be 14.4 L/min, and that is what this sim implies because its stroke volume is fixed. In a real heart the filling time shortens so much at 180 bpm that stroke volume drops, and the output rises less than in proportion.' },
        { q: 'Why are the left and right sides of the pressure-volume loop vertical lines?', a: 'They are the isovolumetric phases. With the AV valve and the aortic valve both closed, no blood can enter or leave, so volume is constant while pressure rises (contraction, right side) or falls (relaxation, left side).' },
      ],
      id: [
        { q: 'Dalam simulasi ventrikel menampung 130 mL di akhir pengisian dan 50 mL di akhir ejeksi. Berapa volume sekuncup dan fraksi ejeksinya?', a: 'Volume sekuncup = 130 − 50 = 80 mL. Fraksi ejeksi = 80 ÷ 130 ≈ 0,62, atau 62%. Pada loop PV, 80 mL adalah jarak antara kedua sisi tegaknya.' },
        { q: 'Pada 70 bpm dengan volume sekuncup 80 mL, berapa curah jantungnya? Jika denyut naik ke 180 bpm, apakah curahnya naik sebanding?', a: '70 × 80 = 5.600 mL/menit = 5,6 L/menit. Jika sebanding, hasilnya 14,4 L/menit, dan itulah yang tersirat dari simulasi karena volume sekuncupnya tetap. Pada jantung nyata, waktu pengisian pada 180 bpm memendek begitu banyak sehingga volume sekuncup turun, dan curah jantung naik kurang dari sebanding.' },
        { q: 'Mengapa sisi kiri dan kanan loop tekanan-volume berupa garis tegak?', a: 'Keduanya adalah fase isovolumetrik. Dengan katup AV dan katup aorta sama-sama tertutup, tidak ada darah yang masuk atau keluar, sehingga volume tetap sementara tekanan naik (kontraksi, sisi kanan) atau turun (relaksasi, sisi kiri).' },
      ],
    },
  },
};
