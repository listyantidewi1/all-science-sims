// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Match Moon position in orbit to the phase observed from Earth.',
      'Identify new, first-quarter, full, and last-quarter from geometry.',
      'Recognize that half the Moon is always lit — only our view changes.',
    ],
    id: [
      'Mencocokkan posisi Bulan di orbit dengan fase yang teramati dari Bumi.',
      'Mengenali bulan baru, kuartal awal, purnama, dan kuartal akhir dari geometri.',
      'Menyadari bahwa setengah Bulan selalu terang — hanya sudut pandang kita yang berubah.',
    ],
  },
  tryThis: {
    en: [
      'Drag the Moon between Sun and Earth — what phase do we see?',
      'Find the position that gives a waxing crescent.',
      'Auto-orbit and pause at the moment exactly half the disc is lit.',
    ],
    id: [
      'Seret Bulan di antara Matahari dan Bumi — fase apa yang terlihat?',
      'Cari posisi yang menghasilkan sabit naik (waxing crescent).',
      'Putar otomatis lalu jeda saat tepat setengah piringan Bulan terang.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The Moon does not make its own light. It shines because sunlight bounces off its grey rocky surface. The Sun always lights up exactly half of the Moon, the half that faces the Sun, just as it is daytime on half of Earth. The other half is in darkness. The phase we see is simply how much of the sunlit half is turned toward us as the Moon travels around Earth.',
        'The simulation shows two pictures at once. On the left you look down on the Moon\'s orbit from above, with the Sun far off to the right; notice that the bright side of the Moon always faces the Sun, wherever the Moon is. On the right you see the Moon as it looks from Earth. When the Moon is between Earth and the Sun, its dark half faces us and we see nothing: a new moon. When it is on the far side of Earth, we see the whole lit half: a full moon. Halfway in between, we see half of the lit half, which looks like a half-lit disc called a quarter moon. You can drag the Moon, use the slider or the preset buttons, or let it orbit by itself while the readout shows the phase name, the lit percentage and the day of the cycle.',
        'A complete cycle from one new moon to the next takes about 29.5 days, which is where the word "month" comes from. The picture is not to scale: the real Moon is about 30 Earth-widths away. The Moon\'s real orbit is also tilted a little, about 5 degrees, so most months the Moon passes just above or below the Sun or Earth\'s shadow; the sim\'s "eclipse alignment" badge only means the Moon is lined up in this flat drawing, and a real eclipse happens only when the tilt lines up too. Which side of the Moon looks lit also depends on where you stand on Earth: viewers in the northern and southern hemispheres see the same phase flipped left to right.',
      ],
      id: [
        'Bulan tidak memancarkan cahayanya sendiri. Bulan tampak bersinar karena sinar matahari memantul dari permukaannya yang berbatu dan kelabu. Matahari selalu menerangi tepat setengah Bulan, yaitu setengah yang menghadap Matahari, sama seperti separuh Bumi yang mengalami siang. Setengah lainnya gelap. Fase yang kita lihat hanyalah seberapa banyak bagian terang itu yang menghadap kita saat Bulan mengelilingi Bumi.',
        'Simulasi menampilkan dua gambar sekaligus. Di kiri kamu melihat orbit Bulan dari atas, dengan Matahari jauh di sebelah kanan; perhatikan bahwa sisi terang Bulan selalu menghadap Matahari, di mana pun Bulan berada. Di kanan kamu melihat Bulan seperti tampak dari Bumi. Saat Bulan berada di antara Bumi dan Matahari, sisi gelapnya menghadap kita dan kita tidak melihat apa-apa: bulan baru. Saat Bulan berada di sisi jauh Bumi, kita melihat seluruh bagian yang terang: bulan purnama. Di tengah-tengahnya, kita melihat setengah dari bagian terang, yang tampak seperti piringan setengah terang dan disebut bulan kuartal. Kamu bisa menyeret Bulan, memakai slider atau tombol preset, atau membiarkannya mengorbit sendiri sementara layar menunjukkan nama fase, persen bagian terang, dan hari dalam siklus.',
        'Satu siklus penuh dari bulan baru ke bulan baru berikutnya memakan waktu sekitar 29,5 hari, dan dari sinilah asal kata "bulan" untuk satuan waktu. Gambar ini tidak sesuai skala: Bulan sungguhan berjarak sekitar 30 kali lebar Bumi. Orbit Bulan yang sebenarnya juga sedikit miring, sekitar 5 derajat, sehingga pada kebanyakan bulan, Bulan lewat sedikit di atas atau di bawah Matahari atau bayangan Bumi; tanda "eclipse alignment" di simulasi hanya berarti Bulan segaris dalam gambar datar ini, dan gerhana sungguhan hanya terjadi jika kemiringannya juga pas. Sisi Bulan yang tampak terang juga bergantung pada tempatmu berdiri di Bumi: pengamat di belahan utara dan selatan melihat fase yang sama tetapi terbalik kiri-kanan.',
      ],
    },
    figure: {
      caption: {
        en: 'Seen from above, the sunlit half of the Moon (yellow) always faces the Sun. From Earth we see different amounts of that lit half: none at new moon, all of it at full moon, half of it at the quarters.',
        id: 'Dilihat dari atas, setengah Bulan yang terkena sinar matahari (kuning) selalu menghadap Matahari. Dari Bumi kita melihat bagian terang itu dalam jumlah berbeda: tidak ada saat bulan baru, seluruhnya saat purnama, setengahnya saat kuartal.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Moon phases from above', 'Fase Bulan dilihat dari atas')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.4}.s{font-size:10.5px}.d{fill:currentColor;opacity:.35}</style>
  <line x1="350" y1="60" x2="315" y2="60" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a)"/>
  <line x1="350" y1="120" x2="315" y2="120" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a)"/>
  <line x1="350" y1="180" x2="315" y2="180" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="352" y="104" fill="#f59e0b" class="s" text-anchor="end" transform="rotate(-90 352 104)">${L('sunlight', 'sinar matahari')}</text>
  <circle cx="160" cy="120" r="78" class="m"/>
  <circle cx="160" cy="120" r="16" fill="#3b82f6"/>
  <path d="M160 104 A16 16 0 0 0 160 136 Z" class="d"/>
  <text x="160" y="150" text-anchor="middle" class="s">${L('Earth', 'Bumi')}</text>
  <circle cx="238" cy="120" r="10" class="d"/>
  <path d="M238 110 A10 10 0 0 1 238 130 Z" fill="#f59e0b"/>
  <circle cx="215" cy="65" r="10" class="d"/>
  <path d="M215 55 A10 10 0 0 1 215 75 Z" fill="#f59e0b"/>
  <circle cx="160" cy="42" r="10" class="d"/>
  <path d="M160 32 A10 10 0 0 1 160 52 Z" fill="#f59e0b"/>
  <circle cx="105" cy="65" r="10" class="d"/>
  <path d="M105 55 A10 10 0 0 1 105 75 Z" fill="#f59e0b"/>
  <circle cx="82" cy="120" r="10" class="d"/>
  <path d="M82 110 A10 10 0 0 1 82 130 Z" fill="#f59e0b"/>
  <circle cx="105" cy="175" r="10" class="d"/>
  <path d="M105 165 A10 10 0 0 1 105 185 Z" fill="#f59e0b"/>
  <circle cx="160" cy="198" r="10" class="d"/>
  <path d="M160 188 A10 10 0 0 1 160 208 Z" fill="#f59e0b"/>
  <circle cx="215" cy="175" r="10" class="d"/>
  <path d="M215 165 A10 10 0 0 1 215 185 Z" fill="#f59e0b"/>
  <text x="254" y="124" class="s">${L('new', 'bulan baru')}</text>
  <text x="254" y="136" class="s" opacity=".7">${L('dark side faces us', 'sisi gelap menghadap kita')}</text>
  <text x="8" y="112" class="s">${L('full', 'purnama')}</text>
  <text x="8" y="124" class="s" opacity=".7">${L('lit side', 'sisi terang')}</text>
  <text x="8" y="136" class="s" opacity=".7">${L('faces us', 'menghadap kita')}</text>
  <text x="160" y="22" text-anchor="middle" class="s">${L('quarter: half lit', 'kuartal: setengah terang')}</text>
  <text x="160" y="226" text-anchor="middle" class="s">${L('quarter: half lit', 'kuartal: setengah terang')}</text>
  <text x="228" y="52" class="s" fill="#10b981">${L('crescent', 'sabit')}</text>
  <text x="60" y="52" class="s" fill="#8b5cf6">${L('gibbous', 'cembung')}</text>
  <text x="60" y="194" class="s" fill="#8b5cf6">${L('gibbous', 'cembung')}</text>
  <text x="228" y="194" class="s" fill="#10b981">${L('crescent', 'sabit')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The Moon shines by reflecting sunlight; it makes no light of its own.',
        'Half of the Moon is always lit by the Sun. The phase is how much of that lit half we can see.',
        'New moon: the Moon is between Earth and the Sun. Full moon: Earth is between the Moon and the Sun.',
        'The phases repeat every 29.5 days, the length of a lunar month.',
        'The dark part of the Moon is still there; it is just not lit, so we cannot see it.',
      ],
      id: [
        'Bulan bersinar dengan memantulkan sinar matahari; Bulan tidak membuat cahayanya sendiri.',
        'Setengah Bulan selalu disinari Matahari. Fase adalah seberapa banyak bagian terang itu yang bisa kita lihat.',
        'Bulan baru: Bulan berada di antara Bumi dan Matahari. Purnama: Bumi berada di antara Bulan dan Matahari.',
        'Fase berulang setiap 29,5 hari, yaitu panjang satu bulan sinodis.',
        'Bagian gelap Bulan tetap ada; bagian itu hanya tidak disinari, sehingga tidak terlihat.',
      ],
    },
    vocabulary: {
      en: [
        ['Phase', 'The shape of the lit part of the Moon that we see from Earth.'],
        ['New moon', 'The Moon is between Earth and the Sun; its dark side faces us and it is almost invisible.'],
        ['Full moon', 'The Moon is on the far side of Earth from the Sun; we see the whole lit half as a round disc.'],
        ['Quarter moon', 'The Moon is a quarter of the way around its orbit and looks half lit; "first quarter" comes after new moon, "last quarter" after full moon.'],
        ['Crescent', 'A thin curved sliver of lit Moon, seen just before or after new moon.'],
        ['Gibbous', 'More than half but less than fully lit, seen just before or after full moon.'],
        ['Waxing and waning', 'Waxing means the lit part is growing (from new to full); waning means it is shrinking (from full to new).'],
        ['Lunar month', 'The time from one new moon to the next, about 29.5 days.'],
      ],
      id: [
        ['Fase', 'Bentuk bagian terang Bulan yang kita lihat dari Bumi.'],
        ['Bulan baru', 'Bulan berada di antara Bumi dan Matahari; sisi gelapnya menghadap kita sehingga hampir tidak terlihat.'],
        ['Bulan purnama', 'Bulan berada di sisi Bumi yang jauh dari Matahari; kita melihat seluruh bagian terangnya sebagai piringan bundar.'],
        ['Bulan kuartal', 'Bulan berada seperempat jalan di orbitnya dan tampak setengah terang; "kuartal awal" terjadi setelah bulan baru, "kuartal akhir" setelah purnama.'],
        ['Bulan sabit', 'Sepotong tipis bagian terang Bulan yang melengkung, terlihat sesaat sebelum atau sesudah bulan baru.'],
        ['Bulan cembung', 'Lebih dari setengah tetapi belum seluruhnya terang, terlihat sesaat sebelum atau sesudah purnama.'],
        ['Membesar dan mengecil', 'Membesar berarti bagian terang bertambah (dari bulan baru ke purnama); mengecil berarti berkurang (dari purnama ke bulan baru).'],
        ['Bulan sinodis', 'Waktu dari satu bulan baru ke bulan baru berikutnya, sekitar 29,5 hari.'],
      ],
    },
    misconceptions: {
      en: [
        ['The phases are caused by Earth\'s shadow falling on the Moon.', 'Earth\'s shadow only touches the Moon during a lunar eclipse, a few times a year at most. Phases happen because we see the Moon\'s sunlit half from different angles. At a quarter moon, Earth is not even between the Sun and the Moon.'],
        ['The Moon can only be seen at night.', 'The Moon is up in the daytime about as often as at night. A first-quarter Moon, for example, rises around midday and is easy to spot in the afternoon sky.'],
        ['The dark part of the Moon disappears or is hidden by clouds.', 'The whole Moon is always there. The dark part is simply not lit by the Sun, so it is hard to see. Near new moon you can sometimes see it faintly, lit by sunlight reflected off Earth.'],
        ['The Moon has a permanently dark side.', 'Every part of the Moon gets two weeks of sunlight and two weeks of night, just like the sim shows. The "far side" never faces Earth, but it is lit just as often as the near side.'],
      ],
      id: [
        ['Fase Bulan terjadi karena bayangan Bumi jatuh ke Bulan.', 'Bayangan Bumi hanya menyentuh Bulan saat gerhana bulan, paling banyak beberapa kali setahun. Fase terjadi karena kita melihat setengah Bulan yang terang dari sudut yang berbeda-beda. Saat bulan kuartal, Bumi bahkan tidak berada di antara Matahari dan Bulan.'],
        ['Bulan hanya bisa dilihat pada malam hari.', 'Bulan berada di langit pada siang hari kira-kira sesering pada malam hari. Bulan kuartal awal, misalnya, terbit sekitar tengah hari dan mudah dilihat di langit sore.'],
        ['Bagian gelap Bulan menghilang atau tertutup awan.', 'Seluruh Bulan selalu ada di sana. Bagian gelapnya hanya tidak disinari Matahari, sehingga sulit dilihat. Di dekat bulan baru kamu kadang bisa melihatnya samar-samar, disinari pantulan cahaya dari Bumi.'],
        ['Bulan memiliki sisi yang selalu gelap.', 'Setiap bagian Bulan mendapat dua minggu siang dan dua minggu malam, seperti yang ditunjukkan simulasi. "Sisi jauh" Bulan tidak pernah menghadap Bumi, tetapi disinari sama seringnya dengan sisi dekat.'],
      ],
    },
    realWorld: {
      en: [
        'The Islamic calendar used in Indonesia for Ramadan and Eid is based on the Moon: each month begins when the thin crescent is first sighted after new moon.',
        'Fishermen and sailors watch the phases because the highest tides, called spring tides, come at new moon and full moon.',
        'A full moon rises at sunset and sets at sunrise, because it is on the opposite side of Earth from the Sun; that is why it lights up the whole night.',
        'Astronauts on the far side of the Moon would see Earth going through phases too: when we see a full moon, they would see a "new Earth".',
      ],
      id: [
        'Kalender Hijriah yang dipakai di Indonesia untuk Ramadan dan Lebaran didasarkan pada Bulan: setiap bulan dimulai saat hilal, sabit tipis setelah bulan baru, pertama kali terlihat.',
        'Nelayan dan pelaut memperhatikan fase Bulan karena pasang tertinggi, yang disebut pasang purnama, terjadi saat bulan baru dan bulan purnama.',
        'Bulan purnama terbit saat matahari terbenam dan terbenam saat matahari terbit, karena posisinya berseberangan dengan Matahari; itulah sebabnya purnama menerangi sepanjang malam.',
        'Astronaut di sisi jauh Bulan juga akan melihat Bumi mengalami fase: saat kita melihat bulan purnama, mereka akan melihat "Bumi baru".',
      ],
    },
    questions: {
      en: [
        { q: 'Where is the Moon in its orbit when we see a full moon? Why do we see the whole disc lit?', a: 'On the far side of Earth from the Sun. The Sun lights the half of the Moon facing it, and from Earth we are looking at that same half, so the whole disc appears bright.' },
        { q: 'A new moon was on the 1st of the month. About what date will the full moon be, and when will the next new moon be?', a: 'Full moon is about halfway through the 29.5-day cycle, so around the 15th or 16th. The next new moon comes about 29 or 30 days later, around the 30th or the 1st of the next month.' },
        { q: 'Drag the Moon so the readout says "Illuminated: 50%". Describe where the Moon is compared with Earth and the Sun.', a: 'The Moon is off to one side, so that the line from Earth to the Moon makes a right angle with the line from Earth to the Sun. We are looking at the lit half edge-on, so we see half of it lit and half dark: a quarter moon.' },
      ],
      id: [
        { q: 'Di mana posisi Bulan di orbitnya saat kita melihat bulan purnama? Mengapa seluruh piringannya tampak terang?', a: 'Di sisi Bumi yang jauh dari Matahari. Matahari menyinari setengah Bulan yang menghadapnya, dan dari Bumi kita memandang setengah yang sama itu, sehingga seluruh piringan tampak terang.' },
        { q: 'Bulan baru terjadi pada tanggal 1. Kira-kira tanggal berapa purnama terjadi, dan kapan bulan baru berikutnya?', a: 'Purnama terjadi sekitar pertengahan siklus 29,5 hari, jadi sekitar tanggal 15 atau 16. Bulan baru berikutnya datang sekitar 29 atau 30 hari kemudian, sekitar tanggal 30 atau tanggal 1 bulan berikutnya.' },
        { q: 'Seret Bulan sampai layar menunjukkan "Illuminated: 50%". Jelaskan posisi Bulan dibandingkan Bumi dan Matahari.', a: 'Bulan berada di samping, sehingga garis dari Bumi ke Bulan membentuk sudut siku-siku dengan garis dari Bumi ke Matahari. Kita memandang bagian terangnya dari samping, sehingga terlihat setengah terang dan setengah gelap: bulan kuartal.' },
      ],
    },
  },
};
