// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply conservation of momentum: m₁v₁ + m₂v₂ = const.',
      'Distinguish elastic (KE conserved) from inelastic (KE lost).',
      'Predict final velocities from masses and elasticity.',
    ],
    id: [
      'Menerapkan kekekalan momentum: m₁v₁ + m₂v₂ = tetap.',
      'Membedakan elastis (KE kekal) dari tak elastis (KE hilang).',
      'Memprediksi kecepatan akhir dari massa dan elastisitas.',
    ],
  },
  tryThis: {
    en: [
      'Equal masses, elastic — they swap velocities.',
      'Heavy hits stationary light — light flies forward at ~2v.',
      'Perfectly inelastic — they stick. How much KE is lost?',
    ],
    id: [
      'Massa sama, elastis — keduanya bertukar kecepatan.',
      'Berat menabrak ringan diam — yang ringan terbang ~2v ke depan.',
      'Tak elastis sempurna — keduanya menempel. Berapa KE yang hilang?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'When two balls collide, each pushes on the other with a force of exactly the same size in the opposite direction, for exactly the same length of time (Newton\'s third law). So whatever momentum one ball loses, the other gains, and the total momentum p = m₁v₁ + m₂v₂ is the same before and after. This holds for every collision, gentle or violent, as long as no outside force acts along the track. In the sim the track is frictionless, so total momentum, shown in the readout, never changes during a collision.',
        'Kinetic energy is different. During the collision the balls deform, and some of their kinetic energy can end up as heat, sound and permanent dents. The coefficient of restitution e describes how much bounce survives: the speed at which the balls separate equals e times the speed at which they approached, v₂\' − v₁\' = e(v₁ − v₂). With e = 1 the collision is elastic and kinetic energy is conserved; with e = 0 the balls stick together and move off as one, which loses the most kinetic energy possible while still conserving momentum. Values in between describe real balls.',
        'Combining the momentum equation with the restitution rule gives the final velocities the sim uses: v₁\' = (m₁v₁ + m₂v₂ − m₂e(v₁ − v₂))/(m₁ + m₂) and v₂\' = (m₁v₁ + m₂v₂ + m₁e(v₁ − v₂))/(m₁ + m₂). Three special cases are worth knowing by heart. Equal masses colliding elastically simply swap velocities. A heavy ball hitting a light ball at rest keeps going and sends the light ball off at almost twice the heavy ball\'s speed. A light ball hitting a heavy ball at rest bounces back with almost its original speed while the heavy ball barely moves.',
        'The mass sliders (0.5 to 10 kg) and velocity sliders (−8 to 8 m/s) set the starting state; the e slider sets the type of collision. The readout reports the kinetic energy that has disappeared as "lost to heat". The model treats the balls as rigid objects that collide instantly, ignores rotation, air resistance and friction, and shows only one dimension. The walls at the ends of the track bounce the balls back elastically so the action stays on screen; those wall bounces change the total momentum of the two balls, so compare momentum only across the ball-to-ball collision.',
      ],
      id: [
        'Ketika dua bola bertumbukan, masing-masing mendorong yang lain dengan gaya yang sama besar dan berlawanan arah, selama waktu yang tepat sama (hukum ketiga Newton). Karena itu, momentum yang hilang dari satu bola diterima oleh bola lainnya, dan momentum total p = m₁v₁ + m₂v₂ sama sebelum dan sesudah tumbukan. Ini berlaku untuk setiap tumbukan, lembut maupun keras, selama tidak ada gaya luar yang bekerja searah lintasan. Di simulasi lintasannya tanpa gesekan, sehingga momentum total yang ditampilkan tidak pernah berubah saat tumbukan.',
        'Energi kinetik berbeda. Selama tumbukan bola berubah bentuk, dan sebagian energi kinetiknya bisa berakhir sebagai kalor, bunyi, dan penyok permanen. Koefisien restitusi e menggambarkan seberapa banyak pantulan yang tersisa: laju kedua bola saling menjauh sama dengan e kali laju saat mendekat, v₂\' − v₁\' = e(v₁ − v₂). Dengan e = 1 tumbukan bersifat elastis dan energi kinetik kekal; dengan e = 0 kedua bola menempel dan bergerak bersama, yang membuang energi kinetik paling banyak sambil tetap menjaga momentum. Nilai di antaranya menggambarkan bola sungguhan.',
        'Menggabungkan persamaan momentum dengan aturan restitusi menghasilkan kecepatan akhir yang dipakai simulasi: v₁\' = (m₁v₁ + m₂v₂ − m₂e(v₁ − v₂))/(m₁ + m₂) dan v₂\' = (m₁v₁ + m₂v₂ + m₁e(v₁ − v₂))/(m₁ + m₂). Tiga kasus khusus layak dihafal. Dua massa sama yang bertumbukan elastis hanya bertukar kecepatan. Bola berat yang menabrak bola ringan diam terus melaju dan melontarkan bola ringan dengan laju hampir dua kali laju bola berat. Bola ringan yang menabrak bola berat diam memantul kembali dengan laju hampir sama seperti semula, sementara bola berat hampir tidak bergerak.',
        'Slider massa (0,5 sampai 10 kg) dan kecepatan (−8 sampai 8 m/s) mengatur keadaan awal; slider e mengatur jenis tumbukan. Tampilan melaporkan energi kinetik yang hilang sebagai "lost to heat". Model ini memperlakukan bola sebagai benda tegar yang bertumbukan seketika, mengabaikan rotasi, hambatan udara, dan gesekan, serta hanya menampilkan satu dimensi. Dinding di ujung lintasan memantulkan bola secara elastis agar aksinya tetap di layar; pantulan dinding itu mengubah momentum total kedua bola, jadi bandingkan momentum hanya pada tumbukan antarbola saja.',
      ],
    },
    figure: {
      caption: {
        en: 'During contact the two balls feel equal and opposite forces for the same time, so momentum lost by one is gained by the other and the total is unchanged. Kinetic energy is only conserved when e = 1; otherwise part of it becomes heat.',
        id: 'Selama bersentuhan kedua bola merasakan gaya sama besar dan berlawanan arah dalam waktu yang sama, sehingga momentum yang hilang dari satu bola diterima bola lainnya dan totalnya tetap. Energi kinetik hanya kekal jika e = 1; selain itu sebagian menjadi kalor.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Before, during and after a collision', 'Sebelum, saat, dan sesudah tumbukan')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.v{stroke-width:2.4;fill:none}.s{font-size:10px;opacity:.8}</style>
  <text x="14" y="22" class="s">${L('before', 'sebelum')}</text>
  <line x1="14" y1="62" x2="226" y2="62" class="m"/>
  <circle cx="70" cy="47" r="14" fill="#3b82f6"/>
  <text x="62" y="51" class="s" fill="#fff" style="fill:#fff">m₁</text>
  <line x1="86" y1="47" x2="130" y2="47" class="v" stroke="#3b82f6" marker-end="url(#k)"/>
  <text x="100" y="40" fill="#3b82f6">v₁</text>
  <circle cx="175" cy="52" r="10" fill="#ef4444"/>
  <line x1="163" y1="52" x2="142" y2="52" class="v" stroke="#ef4444" marker-end="url(#k)"/>
  <text x="140" y="42" fill="#ef4444">v₂</text>
  <text x="14" y="96" class="s">${L('during', 'saat')}</text>
  <line x1="14" y1="137" x2="226" y2="137" class="m"/>
  <circle cx="106" cy="123" r="14" fill="#3b82f6"/>
  <circle cx="130" cy="127" r="10" fill="#ef4444"/>
  <line x1="92" y1="104" x2="62" y2="104" class="v" stroke="#10b981" marker-end="url(#k)"/>
  <text x="56" y="98" fill="#10b981" class="s">−F</text>
  <line x1="144" y1="104" x2="174" y2="104" class="v" stroke="#10b981" marker-end="url(#k)"/>
  <text x="172" y="98" fill="#10b981" class="s">F</text>
  <text x="60" y="152" class="s">${L('equal and opposite, same time', 'sama besar, berlawanan, waktu sama')}</text>
  <text x="14" y="172" class="s">${L('after', 'sesudah')}</text>
  <line x1="14" y1="212" x2="226" y2="212" class="m"/>
  <circle cx="62" cy="197" r="14" fill="#3b82f6"/>
  <line x1="78" y1="197" x2="96" y2="197" class="v" stroke="#3b82f6" marker-end="url(#k)"/>
  <text x="80" y="188" fill="#3b82f6">v₁'</text>
  <circle cx="172" cy="202" r="10" fill="#ef4444"/>
  <line x1="184" y1="202" x2="226" y2="202" class="v" stroke="#ef4444" marker-end="url(#k)"/>
  <text x="196" y="192" fill="#ef4444">v₂'</text>
  <line x1="244" y1="215" x2="350" y2="215" class="m"/>
  <rect x="252" y="150" width="16" height="65" fill="#10b981"/>
  <rect x="272" y="150" width="16" height="65" fill="#10b981" opacity=".55"/>
  <text x="250" y="230" class="s">p: ${L('before = after', 'sebelum = sesudah')}</text>
  <rect x="306" y="120" width="16" height="95" fill="#f59e0b"/>
  <rect x="326" y="150" width="16" height="65" fill="#f59e0b" opacity=".55"/>
  <rect x="326" y="120" width="16" height="30" fill="none" stroke="#f59e0b" stroke-dasharray="3 2"/>
  <text x="300" y="112" class="s" fill="#f59e0b" style="fill:#f59e0b">KE ${L('lost (e &lt; 1)', 'hilang (e &lt; 1)')}</text>
  <text x="296" y="140" class="s">${L('heat', 'kalor')}</text>
  <defs><marker id="k" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Total momentum is conserved in every collision because the two objects exert equal and opposite forces on each other for the same time.',
        'Kinetic energy is conserved only in an elastic collision (e = 1); in all others some of it turns into heat, sound or deformation.',
        'The coefficient of restitution e is the ratio of separation speed to approach speed, from 1 (perfectly bouncy) to 0 (stick together).',
        'Equal masses colliding elastically swap velocities; a heavy ball striking a light one at rest launches it at nearly twice the heavy ball\'s speed.',
        'A perfectly inelastic collision loses the maximum possible kinetic energy, ½(m₁m₂/(m₁ + m₂))(v₁ − v₂)², but still conserves momentum.',
      ],
      id: [
        'Momentum total kekal pada setiap tumbukan karena kedua benda saling memberi gaya yang sama besar dan berlawanan arah dalam waktu yang sama.',
        'Energi kinetik hanya kekal pada tumbukan elastis (e = 1); pada tumbukan lainnya sebagian berubah menjadi kalor, bunyi, atau perubahan bentuk.',
        'Koefisien restitusi e adalah perbandingan laju menjauh terhadap laju mendekat, dari 1 (memantul sempurna) sampai 0 (menempel).',
        'Dua massa sama yang bertumbukan elastis bertukar kecepatan; bola berat yang menabrak bola ringan diam melontarkannya dengan laju hampir dua kali laju bola berat.',
        'Tumbukan tak elastis sempurna membuang energi kinetik paling banyak, ½(m₁m₂/(m₁ + m₂))(v₁ − v₂)², tetapi tetap menjaga momentum.',
      ],
    },
    vocabulary: {
      en: [
        ['Momentum (p)', 'Mass times velocity, p = mv, in kg·m/s; it has a direction, so velocities to the left count as negative.'],
        ['Impulse', 'Force multiplied by the time it acts; it equals the change in momentum it produces.'],
        ['Elastic collision', 'A collision in which total kinetic energy is the same before and after (e = 1).'],
        ['Inelastic collision', 'A collision in which some kinetic energy is converted to other forms; the balls still conserve momentum.'],
        ['Perfectly inelastic', 'The extreme case e = 0, where the objects stick together and move with one common velocity.'],
        ['Coefficient of restitution (e)', 'Separation speed divided by approach speed; a measure of how bouncy the collision is.'],
        ['Closed system', 'A set of objects with no outside force acting on them, so their total momentum cannot change.'],
      ],
      id: [
        ['Momentum (p)', 'Massa kali kecepatan, p = mv, dalam kg·m/s; momentum punya arah, sehingga kecepatan ke kiri dihitung negatif.'],
        ['Impuls', 'Gaya dikali selang waktu gaya itu bekerja; sama dengan perubahan momentum yang dihasilkannya.'],
        ['Tumbukan elastis', 'Tumbukan dengan energi kinetik total yang sama sebelum dan sesudah (e = 1).'],
        ['Tumbukan tak elastis', 'Tumbukan dengan sebagian energi kinetik berubah ke bentuk lain; momentum kedua bola tetap kekal.'],
        ['Tak elastis sempurna', 'Kasus ekstrem e = 0, ketika kedua benda menempel dan bergerak dengan satu kecepatan bersama.'],
        ['Koefisien restitusi (e)', 'Laju menjauh dibagi laju mendekat; ukuran seberapa memantul sebuah tumbukan.'],
        ['Sistem tertutup', 'Sekumpulan benda tanpa gaya luar yang bekerja padanya, sehingga momentum totalnya tidak dapat berubah.'],
      ],
    },
    misconceptions: {
      en: [
        ['If kinetic energy is lost, momentum must be lost too.', 'No. Momentum is conserved in every collision, even a perfectly sticky one. Kinetic energy can change into heat, but there is no "heat" form of momentum for it to turn into.'],
        ['The heavier ball exerts a bigger force on the lighter one.', 'The forces are exactly equal (Newton\'s third law). The lighter ball changes velocity more because the same force produces a bigger acceleration on a smaller mass.'],
        ['In an elastic collision the balls do not deform.', 'They do compress briefly, storing energy like a spring, then give it all back. Elastic means the energy is returned, not that nothing happened.'],
        ['When the balls stick together, all the kinetic energy disappears.', 'Only if total momentum was zero to start with. Otherwise the pair keeps moving, and the kinetic energy of that shared motion remains.'],
      ],
      id: [
        ['Jika energi kinetik hilang, momentum pasti ikut hilang.', 'Tidak. Momentum kekal pada setiap tumbukan, bahkan yang menempel sempurna. Energi kinetik bisa berubah menjadi kalor, tetapi tidak ada bentuk "kalor" bagi momentum.'],
        ['Bola yang lebih berat memberi gaya lebih besar pada bola yang ringan.', 'Gayanya tepat sama besar (hukum ketiga Newton). Bola ringan berubah kecepatan lebih banyak karena gaya yang sama menghasilkan percepatan lebih besar pada massa yang lebih kecil.'],
        ['Pada tumbukan elastis bola tidak berubah bentuk.', 'Bola tetap tertekan sesaat, menyimpan energi seperti pegas, lalu mengembalikannya seluruhnya. Elastis berarti energinya dikembalikan, bukan berarti tidak terjadi apa-apa.'],
        ['Ketika kedua bola menempel, seluruh energi kinetik hilang.', 'Hanya jika momentum totalnya nol sejak awal. Jika tidak, pasangan bola terus bergerak, dan energi kinetik gerak bersama itu tetap ada.'],
      ],
    },
    realWorld: {
      en: [
        'Car crumple zones are deliberately inelastic: by deforming they convert kinetic energy into heat and stretch out the collision time, which lowers the force on the passengers.',
        'Newton\'s cradle shows equal-mass elastic collisions: each ball stops dead and passes its velocity to the next one.',
        'A golf club head is far heavier than the ball, so the ball leaves at nearly twice the club head speed; the rules even cap the club\'s coefficient of restitution.',
        'Billiard and bowling balls are made to have e close to 1 so that momentum and energy transfer predictably from ball to ball.',
      ],
      id: [
        'Zona remuk pada mobil sengaja dibuat tak elastis: dengan berubah bentuk, zona itu mengubah energi kinetik menjadi kalor dan memperpanjang waktu tumbukan, sehingga gaya pada penumpang berkurang.',
        'Ayunan Newton memperlihatkan tumbukan elastis antarmassa sama: tiap bola berhenti seketika dan meneruskan kecepatannya ke bola berikutnya.',
        'Kepala stik golf jauh lebih berat daripada bolanya, sehingga bola melesat dengan laju hampir dua kali laju kepala stik; aturan permainan bahkan membatasi koefisien restitusi stik.',
        'Bola biliar dan bola boling dibuat dengan e mendekati 1 agar perpindahan momentum dan energi dari bola ke bola dapat diprediksi.',
      ],
    },
    questions: {
      en: [
        { q: 'A 2 kg ball moving at 3 m/s hits a 1 kg ball at rest and they stick together (e = 0). What is their common final velocity, and how much kinetic energy is lost?', a: 'Momentum: 2 × 3 + 0 = 6 kg·m/s, shared by 3 kg, so v = 2 m/s. KE before = ½ × 2 × 9 = 9 J; after = ½ × 3 × 4 = 6 J. So 3 J (one third) becomes heat and deformation.' },
        { q: 'Two 1 kg balls approach each other at 4 m/s and −2 m/s and collide elastically. What are the velocities afterwards?', a: 'Equal masses in an elastic collision swap velocities: the first ends at −2 m/s and the second at 4 m/s. Check: momentum 2 kg·m/s before and after; KE 10 J before and after.' },
        { q: 'A light ball hits a very heavy stationary ball elastically. Why does it come back with almost the same speed, and where did its momentum go?', a: 'The heavy ball hardly moves, so to keep the separation speed equal to the approach speed (e = 1) the light ball must reverse at nearly the same speed. Its momentum changed by almost 2mv; the heavy ball absorbed that momentum, but because its mass is huge its velocity change is tiny and so is its kinetic energy.' },
      ],
      id: [
        { q: 'Bola 2 kg yang bergerak 3 m/s menabrak bola 1 kg yang diam dan keduanya menempel (e = 0). Berapa kecepatan akhir bersama mereka, dan berapa energi kinetik yang hilang?', a: 'Momentum: 2 × 3 + 0 = 6 kg·m/s, dibagi oleh 3 kg, sehingga v = 2 m/s. KE sebelum = ½ × 2 × 9 = 9 J; sesudah = ½ × 3 × 4 = 6 J. Jadi 3 J (sepertiga) menjadi kalor dan perubahan bentuk.' },
        { q: 'Dua bola 1 kg saling mendekat dengan kecepatan 4 m/s dan −2 m/s lalu bertumbukan elastis. Berapa kecepatan masing-masing sesudahnya?', a: 'Massa sama pada tumbukan elastis bertukar kecepatan: bola pertama berakhir pada −2 m/s dan bola kedua 4 m/s. Periksa: momentum 2 kg·m/s sebelum dan sesudah; KE 10 J sebelum dan sesudah.' },
        { q: 'Bola ringan menabrak bola sangat berat yang diam secara elastis. Mengapa bola ringan kembali dengan laju hampir sama, dan ke mana momentumnya?', a: 'Bola berat hampir tidak bergerak, sehingga agar laju menjauh sama dengan laju mendekat (e = 1) bola ringan harus berbalik dengan laju hampir sama. Momentumnya berubah hampir 2mv; bola berat menyerap momentum itu, tetapi karena massanya sangat besar perubahan kecepatannya sangat kecil, begitu pula energi kinetiknya.' },
      ],
    },
  },
};
