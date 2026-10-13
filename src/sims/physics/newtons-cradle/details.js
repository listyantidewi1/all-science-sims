// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See conservation of momentum in nearly elastic collisions.',
      'Predict how many balls swing out for a given number lifted.',
      'Recognize that the trick comes from equal masses + elastic contacts.',
    ],
    id: [
      'Mengamati kekekalan momentum pada tumbukan hampir elastis.',
      'Memprediksi berapa bola yang terayun ke luar untuk sejumlah bola yang diangkat.',
      'Mengenali bahwa fenomena ini berasal dari massa sama + tumbukan elastis.',
    ],
  },
  tryThis: {
    en: [
      'Lift two balls together — how many swing out the other side?',
      'Add air friction — how does the cradle slow down?',
      'Predict before lifting three at once.',
    ],
    id: [
      'Angkat dua bola bersamaan — berapa bola yang terayun di sisi lain?',
      'Tambahkan gesekan udara — bagaimana ayunan melambat?',
      'Tebak dulu sebelum mengangkat tiga bola sekaligus.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A Newton\'s cradle is a row of identical steel balls, each hanging on its own strings so that it can only swing in one line. Lift the end ball and let it go: it swings down, hits its neighbour, and stops dead. Nothing seems to happen in the middle, but the ball at the far end flies out as if it had been hit directly. Lift two balls and two fly out; lift three and three fly out. The toy is a neat demonstration of two conservation laws working together.',
        'The first law is conservation of momentum. Momentum is mass times velocity, and in any collision the total momentum before equals the total momentum after. The second is conservation of kinetic energy, the energy of motion, which holds in an elastic collision where nothing is permanently bent, heated, or broken. When two balls of equal mass collide elastically, the only way to satisfy both laws at once is for them to swap velocities: the moving ball stops and the still ball moves off with the same speed. In the cradle this swap happens from ball to ball down the row in a fraction of a second, so the motion emerges at the far end.',
        'This also explains why lifting two balls never sends one ball out at double speed. That would conserve momentum, since one ball at twice the speed carries the same momentum as two balls at normal speed. But kinetic energy depends on the square of the speed, so one ball at double speed would carry twice the energy, which is impossible. Only two balls leaving at the original speed keep both totals the same.',
        'The simulation treats each ball as a pendulum pulled back by gravity, and whenever two neighbours touch while approaching each other it swaps their swing speeds, exactly as an ideal equal-mass elastic collision would. The number-of-balls slider changes the row, and the air-drag slider adds a resistance that grows with speed, so the swinging slowly dies away. Real cradles lose a little energy at every impact to sound and heat, so the balls gradually start moving together; the sim\'s collisions are perfectly elastic, and it ignores the small gaps and slight stretch of real strings.',
      ],
      id: [
        'Ayunan Newton adalah barisan bola baja yang sama besar, masing-masing tergantung pada talinya sendiri sehingga hanya bisa berayun dalam satu garis. Angkat bola di ujung lalu lepaskan: bola itu berayun turun, menabrak tetangganya, dan langsung berhenti. Di bagian tengah seolah tidak terjadi apa-apa, tetapi bola di ujung lain terbang keluar seakan dipukul langsung. Angkat dua bola, dua bola terbang; angkat tiga, tiga bola terbang. Mainan ini adalah peragaan rapi dari dua hukum kekekalan yang bekerja bersama.',
        'Hukum pertama adalah kekekalan momentum. Momentum adalah massa kali kecepatan, dan pada tumbukan apa pun jumlah momentum sebelum tumbukan sama dengan jumlah momentum sesudahnya. Hukum kedua adalah kekekalan energi kinetik, yaitu energi gerak, yang berlaku pada tumbukan elastis ketika tidak ada yang bengkok, memanas, atau pecah secara permanen. Ketika dua bola bermassa sama bertumbukan secara elastis, satu-satunya cara memenuhi kedua hukum sekaligus adalah bertukar kecepatan: bola yang bergerak berhenti dan bola yang diam bergerak dengan kelajuan yang sama. Di dalam ayunan Newton pertukaran ini terjadi dari bola ke bola sepanjang barisan dalam sepersekian detik, sehingga gerakan muncul di ujung jauh.',
        'Ini juga menjelaskan mengapa mengangkat dua bola tidak pernah membuat satu bola keluar dengan kelajuan dua kali lipat. Itu memang mengekalkan momentum, karena satu bola dengan kelajuan dua kali membawa momentum yang sama dengan dua bola berkelajuan biasa. Tetapi energi kinetik bergantung pada kuadrat kelajuan, sehingga satu bola berkelajuan dua kali akan membawa energi dua kali lipat, dan itu tidak mungkin. Hanya dua bola yang keluar dengan kelajuan semula yang menjaga kedua jumlah tetap sama.',
        'Simulasi memperlakukan tiap bola sebagai bandul yang ditarik kembali oleh gravitasi, dan setiap kali dua bola bertetangga bersentuhan sambil saling mendekat, kelajuan ayun keduanya ditukar, tepat seperti tumbukan elastis ideal antara massa yang sama. Slider jumlah bola mengubah barisan, dan slider hambatan udara menambahkan hambatan yang bertambah dengan kelajuan, sehingga ayunan perlahan mati. Ayunan Newton sungguhan kehilangan sedikit energi pada setiap benturan menjadi bunyi dan panas, sehingga bola-bola lambat laun mulai bergerak bersama; tumbukan di simulasi ini elastis sempurna, dan simulasi mengabaikan celah kecil serta sedikit regangan tali yang sebenarnya.',
      ],
    },
    figure: {
      caption: {
        en: 'One ball swings in and stops; its momentum and kinetic energy are handed along the row from ball to ball, and the last ball swings out at the same speed.',
        id: 'Satu bola berayun masuk lalu berhenti; momentum dan energi kinetiknya diteruskan sepanjang barisan dari bola ke bola, dan bola terakhir berayun keluar dengan kelajuan sama.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Momentum passing through a row of balls', 'Momentum merambat melewati barisan bola')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}</style>
  <rect x="60" y="22" width="240" height="8" fill="currentColor" opacity=".7"/>
  <line x1="106" y1="30" x2="36" y2="130" class="m"/>
  <circle cx="36" cy="130" r="17" fill="#3b82f6"/>
  <line x1="36" y1="155" x2="86" y2="155" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <text x="18" y="178" fill="#3b82f6">${L('before: swings in', 'sebelum: berayun masuk')}</text>
  <line x1="106" y1="30" x2="106" y2="150" class="m" stroke-dasharray="3 3"/>
  <circle cx="106" cy="150" r="17" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4 3"/>
  <line x1="144" y1="30" x2="144" y2="150" class="m"/>
  <circle cx="144" cy="150" r="17" fill="currentColor" opacity=".55"/>
  <line x1="182" y1="30" x2="182" y2="150" class="m"/>
  <circle cx="182" cy="150" r="17" fill="currentColor" opacity=".55"/>
  <line x1="220" y1="30" x2="220" y2="150" class="m"/>
  <circle cx="220" cy="150" r="17" fill="currentColor" opacity=".55"/>
  <line x1="258" y1="30" x2="258" y2="150" class="m" stroke-dasharray="3 3"/>
  <circle cx="258" cy="150" r="17" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4 3"/>
  <line x1="258" y1="30" x2="328" y2="130" class="m"/>
  <circle cx="328" cy="130" r="17" fill="#10b981"/>
  <line x1="278" y1="155" x2="328" y2="155" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="240" y="178" fill="#10b981">${L('after: swings out', 'sesudah: keluar')}</text>
  <line x1="128" y1="110" x2="236" y2="110" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="112" y="100" fill="#f59e0b">${L('momentum + energy pass through', 'momentum + energi merambat')}</text>
  <text x="128" y="206">${L('middle balls barely move', 'bola tengah hampir tak bergerak')}</text>
  <text x="36" y="230">${L('equal masses: colliding balls simply swap speeds', 'massa sama: bola yang bertumbukan bertukar laju')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Momentum (mass times velocity) is conserved in every collision, whatever happens to the balls.',
        'In an elastic collision kinetic energy is conserved too, because nothing is bent, heated, or broken.',
        'Two equal masses colliding elastically simply swap velocities, which is why the moving ball stops dead.',
        'The number of balls that swing out equals the number lifted, because only that keeps both momentum and energy the same.',
        'Real cradles slow down because every impact turns a little energy into sound and heat.',
      ],
      id: [
        'Momentum (massa kali kecepatan) kekal pada setiap tumbukan, apa pun yang terjadi pada bola.',
        'Pada tumbukan elastis energi kinetik juga kekal, karena tidak ada yang bengkok, memanas, atau pecah.',
        'Dua massa sama yang bertumbukan secara elastis hanya bertukar kecepatan, itulah sebabnya bola yang bergerak langsung berhenti.',
        'Jumlah bola yang berayun keluar sama dengan jumlah bola yang diangkat, karena hanya itu yang menjaga momentum dan energi tetap sama.',
        'Ayunan Newton sungguhan melambat karena tiap benturan mengubah sedikit energi menjadi bunyi dan panas.',
      ],
    },
    vocabulary: {
      en: [
        ['Momentum', 'Mass times velocity; a measure of how hard it is to stop a moving object.'],
        ['Kinetic energy', 'The energy of motion; it grows with the square of the speed, so doubling the speed quadruples it.'],
        ['Elastic collision', 'A collision in which the total kinetic energy after is the same as before.'],
        ['Inelastic collision', 'A collision in which some kinetic energy becomes heat, sound, or permanent deformation.'],
        ['Conservation law', 'A rule that a total quantity stays the same before and after an event.'],
        ['Pendulum', 'A mass swinging on a string under gravity; each ball in the cradle is one.'],
      ],
      id: [
        ['Momentum', 'Massa kali kecepatan; ukuran seberapa sulit menghentikan benda yang bergerak.'],
        ['Energi kinetik', 'Energi gerak; bertambah mengikuti kuadrat kelajuan, sehingga menggandakan kelajuan melipatempatkannya.'],
        ['Tumbukan elastis', 'Tumbukan yang jumlah energi kinetik sesudahnya sama dengan sebelumnya.'],
        ['Tumbukan tak elastis', 'Tumbukan yang sebagian energi kinetiknya berubah menjadi panas, bunyi, atau perubahan bentuk permanen.'],
        ['Hukum kekekalan', 'Aturan bahwa suatu jumlah total tetap sama sebelum dan sesudah suatu peristiwa.'],
        ['Bandul', 'Massa yang berayun pada tali di bawah pengaruh gravitasi; tiap bola di ayunan Newton adalah bandul.'],
      ],
    },
    misconceptions: {
      en: [
        ['Lifting two balls should send one ball out at twice the speed.', 'That would keep the momentum the same but double the kinetic energy, which cannot happen. Two balls leaving at the original speed is the only outcome that conserves both.'],
        ['The middle balls do nothing.', 'Each middle ball is hit, moves very slightly, and passes the motion on to its neighbour. The swap happens so fast that they look still, but the momentum travels through every one of them.'],
        ['A good cradle should swing forever.', 'Every real impact makes a click, and that sound carries energy away, along with a little heating of the steel. The motion always dies out; the sim\'s drag slider mimics the extra loss to air.'],
        ['Heavier balls would make the trick work better.', 'The clean one-in, one-out behaviour needs the masses to be equal. If one ball were heavier than the others, the velocities would no longer simply swap and several balls would move at once.'],
      ],
      id: [
        ['Mengangkat dua bola seharusnya membuat satu bola keluar dengan kelajuan dua kali.', 'Itu memang menjaga momentum tetap, tetapi menggandakan energi kinetik, dan itu tidak mungkin terjadi. Dua bola keluar dengan kelajuan semula adalah satu-satunya hasil yang mengekalkan keduanya.'],
        ['Bola-bola di tengah tidak melakukan apa-apa.', 'Tiap bola tengah tertumbuk, bergerak sangat sedikit, dan meneruskan gerak ke tetangganya. Pertukaran terjadi begitu cepat sehingga tampak diam, tetapi momentum merambat melewati setiap bola.'],
        ['Ayunan Newton yang bagus seharusnya berayun selamanya.', 'Setiap benturan sungguhan menghasilkan bunyi klik, dan bunyi itu membawa energi pergi, bersama sedikit pemanasan pada baja. Gerakan selalu akhirnya berhenti; slider hambatan di simulasi menirukan kehilangan tambahan ke udara.'],
        ['Bola yang lebih berat akan membuat trik ini lebih bagus.', 'Perilaku rapi satu masuk, satu keluar membutuhkan massa yang sama. Jika satu bola lebih berat dari yang lain, kecepatan tidak lagi sekadar bertukar dan beberapa bola akan bergerak sekaligus.'],
      ],
    },
    realWorld: {
      en: [
        'In billiards a straight-on hit makes the cue ball stop and the target ball move off with its speed, the same equal-mass swap as in the cradle.',
        'Car crumple zones are designed to make a collision inelastic on purpose, turning kinetic energy into bent metal instead of passing it on to the passengers.',
        'A hammer driving a nail, or a croquet mallet hitting a ball, both transfer momentum in a brief impact just like the balls in the cradle.',
        'Sound travels through solids in a similar way: each atom pushes its neighbour, so the disturbance moves along while the atoms themselves barely shift.',
      ],
      id: [
        'Pada biliar, pukulan lurus membuat bola putih berhenti dan bola sasaran bergerak dengan kelajuannya, pertukaran massa sama seperti pada ayunan Newton.',
        'Zona remuk pada mobil sengaja dirancang agar tumbukan menjadi tak elastis, mengubah energi kinetik menjadi logam yang bengkok daripada meneruskannya ke penumpang.',
        'Palu yang memukul paku, atau pemukul kroket yang mengenai bola, sama-sama memindahkan momentum dalam benturan singkat seperti bola-bola di ayunan Newton.',
        'Bunyi merambat dalam zat padat dengan cara serupa: tiap atom mendorong tetangganya, sehingga gangguan bergerak maju sementara atom-atomnya sendiri hampir tidak bergeser.',
      ],
    },
    questions: {
      en: [
        { q: 'You set the cradle to 5 balls and lift 3 together. How many swing out on the other side, and at what speed?', a: 'Three balls swing out, at the same speed the lifted balls had when they hit. That is the only outcome that keeps both the total momentum and the total kinetic energy unchanged.' },
        { q: 'Two balls hit the row at speed v. Suppose one ball left at speed 2v instead. Show with momentum and kinetic energy why this cannot happen.', a: 'Momentum: 2 × m × v in, 1 × m × 2v = 2mv out, so momentum would be fine. Kinetic energy: in, two balls each with half × m × v², total m v². Out, one ball with half × m × (2v)² = 2 m v², which is double. Energy cannot appear from nowhere, so this outcome is impossible.' },
        { q: 'With the drag slider at zero the sim swings forever, but a real cradle stops after a minute or two. Where does the energy go?', a: 'Into sound (the clicks), slight heating of the balls where they squash at each impact, air resistance, and friction at the string supports. Each of these takes a tiny share of the kinetic energy per swing, so the amplitude shrinks until the balls hang still.' },
      ],
      id: [
        { q: 'Kamu mengatur ayunan menjadi 5 bola dan mengangkat 3 bola bersamaan. Berapa bola yang berayun keluar di sisi lain, dan dengan kelajuan berapa?', a: 'Tiga bola berayun keluar, dengan kelajuan yang sama seperti kelajuan bola-bola yang diangkat saat menumbuk. Itulah satu-satunya hasil yang menjaga jumlah momentum dan jumlah energi kinetik tidak berubah.' },
        { q: 'Dua bola menumbuk barisan dengan kelajuan v. Misalkan satu bola keluar dengan kelajuan 2v. Tunjukkan dengan momentum dan energi kinetik mengapa ini tidak mungkin.', a: 'Momentum: 2 × m × v masuk, 1 × m × 2v = 2mv keluar, jadi momentum tidak bermasalah. Energi kinetik: masuk, dua bola masing-masing setengah × m × v², totalnya m v². Keluar, satu bola dengan setengah × m × (2v)² = 2 m v², dua kali lipat. Energi tidak bisa muncul dari ketiadaan, sehingga hasil ini tidak mungkin.' },
        { q: 'Dengan slider hambatan nol, simulasi berayun selamanya, tetapi ayunan Newton sungguhan berhenti setelah satu dua menit. Ke mana energinya pergi?', a: 'Menjadi bunyi (bunyi klik), sedikit pemanasan pada bola yang tertekan di tiap benturan, hambatan udara, dan gesekan di penyangga tali. Masing-masing mengambil sedikit energi kinetik tiap ayunan, sehingga amplitudo mengecil sampai bola-bola tergantung diam.' },
      ],
    },
  },
};
