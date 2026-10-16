// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Relate the Moon\'s phase to the relative positions of the Sun, Earth and Moon, and explain why a full Moon and a new Moon are two weeks apart.',
      'Explain spring and neap tides and the two kinds of eclipse from the same Sun–Earth–Moon geometry, including why eclipses do not happen every month.',
      'Use the tilt of Earth\'s axis and its position in orbit to decide the season in each hemisphere and the latitude where the Sun is overhead.',
    ],
    id: [
      'Mengaitkan fase Bulan dengan posisi relatif Matahari, Bumi, dan Bulan, serta menjelaskan mengapa bulan purnama dan bulan baru berselang dua minggu.',
      'Menjelaskan pasang purnama dan pasang perbani serta dua jenis gerhana dari geometri Matahari–Bumi–Bulan yang sama, termasuk mengapa gerhana tidak terjadi setiap bulan.',
      'Menggunakan kemiringan sumbu Bumi dan posisinya di orbit untuk menentukan musim di setiap belahan Bumi dan lintang tempat Matahari tepat di atas kepala.',
    ],
  },
  tryThis: {
    en: [
      'Drag the Moon slowly once around the Earth anticlockwise. Watch the phase disc: in which direction does the lit edge grow? Record the Moon angle at first quarter and at full Moon.',
      'Press Full Moon and then Spring tide: nothing changes. Why are they the same configuration? Now press Neap tide and look at the tidal bulge drawn around Earth.',
      'Press Solar eclipse, then drag the Earth a quarter of the way around its orbit (keep the Moon between Earth and Sun). The eclipse disappears. What does the panel say about the Moon\'s height above the orbit plane?',
      'Set the hemisphere to South and drag Earth to the June solstice. Which season does the panel report? Switch to North and compare.',
    ],
    id: [
      'Geser Bulan perlahan satu putaran mengitari Bumi berlawanan arah jarum jam. Perhatikan cakram fase: ke arah mana tepi terang bertambah? Catat sudut Bulan pada perbani awal dan pada purnama.',
      'Tekan Bulan purnama lalu Pasang purnama: tidak ada yang berubah. Mengapa keduanya konfigurasi yang sama? Sekarang tekan Pasang perbani dan lihat tonjolan pasang yang digambar di sekitar Bumi.',
      'Tekan Gerhana matahari, lalu geser Bumi seperempat putaran orbitnya (pertahankan Bulan di antara Bumi dan Matahari). Gerhananya hilang. Apa kata panel tentang ketinggian Bulan di atas bidang orbit?',
      'Atur belahan Bumi ke Selatan dan geser Bumi ke titik balik Juni. Musim apa yang dilaporkan panel? Beralih ke Utara dan bandingkan.',
    ],
  },

  learn: {
    background: {
      en: [
        'The sim looks down on the Solar System from above Earth\'s North Pole. From there both the Earth\'s orbit around the Sun and the Moon\'s orbit around the Earth run anticlockwise, and so does the Earth\'s daily spin. Distances are not to scale: the Moon\'s orbit is drawn large so you can see it. The Moon takes 27.3 days to go once around the Earth relative to the stars, but because the Earth also moves along its orbit, the cycle of phases from one new Moon to the next takes 29.5 days.',
        'The Moon makes no light of its own; the Sun always lights the half of the Moon that faces it. What we see from Earth is how much of that lit half is turned towards us. When the Moon is between Earth and Sun (angle 0°) the lit side faces away and we see a new Moon. A quarter of the way around (90°) half the disc is lit: first quarter. Opposite the Sun (180°) we see the whole lit half: full Moon. Seen from the northern hemisphere the waxing Moon is lit on the right; from the southern hemisphere the picture is upside down and the waxing Moon is lit on the left.',
        'The same geometry controls tides and eclipses. The Moon\'s gravity pulls the oceans into two bulges, one facing the Moon and one on the far side; the Sun does the same with about half the strength. At new and full Moon the two bulges line up and add: spring tides, with the largest range. At the quarters they are at right angles and partly cancel: neap tides. An eclipse needs a new Moon (solar) or full Moon (lunar) as well, but one more condition: the Moon\'s orbit is tilted about 5° to Earth\'s orbit, so at most new and full Moons the shadow passes above or below. Only when the Moon is also near one of the two points where its orbit crosses Earth\'s orbit plane (the nodes) can an eclipse happen, which is why there are eclipses in only about two "seasons" a year. In the sim the line of nodes is fixed along the December–June direction; in reality it slowly rotates once every 18.6 years.',
        'Seasons have nothing to do with the Moon or with distance from the Sun. Earth\'s axis is tilted 23.4° and always points the same way in space. Around 21 June the North Pole leans towards the Sun: the northern hemisphere gets long days and high Sun (summer) and the southern hemisphere short days (winter). Around 21 December it is the other way round, and at the equinoxes in March and September neither pole leans towards the Sun and the Sun is overhead at the equator. The panel reports the latitude where the Sun is overhead at noon; for Indonesia, which straddles the equator, this passes overhead twice a year and the temperature barely changes, so the wet and dry seasons there are driven by monsoon winds rather than by the tilt directly.',
      ],
      id: [
        'Simulasi ini memandang Tata Surya dari atas Kutub Utara Bumi. Dari sana, orbit Bumi mengitari Matahari dan orbit Bulan mengitari Bumi sama-sama berlawanan arah jarum jam, begitu pula rotasi harian Bumi. Jarak tidak sesuai skala: orbit Bulan digambar besar supaya terlihat. Bulan membutuhkan 27,3 hari untuk satu putaran mengitari Bumi relatif terhadap bintang, tetapi karena Bumi juga bergerak di orbitnya, siklus fase dari satu bulan baru ke bulan baru berikutnya memakan waktu 29,5 hari.',
        'Bulan tidak memancarkan cahaya sendiri; Matahari selalu menerangi setengah Bulan yang menghadapnya. Yang kita lihat dari Bumi adalah seberapa banyak bagian terang itu menghadap kita. Ketika Bulan berada di antara Bumi dan Matahari (sudut 0°) sisi terangnya membelakangi kita dan kita melihat bulan baru. Seperempat putaran kemudian (90°) setengah cakram terang: perbani awal. Berseberangan dengan Matahari (180°) kita melihat seluruh bagian terang: purnama. Dilihat dari belahan Bumi utara, Bulan yang membesar terang di sisi kanan; dari belahan Bumi selatan gambarnya terbalik sehingga Bulan yang membesar terang di sisi kiri.',
        'Geometri yang sama mengendalikan pasang laut dan gerhana. Gravitasi Bulan menarik lautan menjadi dua tonjolan, satu menghadap Bulan dan satu di sisi jauh; Matahari melakukan hal yang sama dengan kekuatan sekitar setengahnya. Pada bulan baru dan purnama kedua tonjolan segaris dan saling menambah: pasang purnama, dengan rentang terbesar. Pada fase perbani keduanya tegak lurus dan sebagian saling meniadakan: pasang perbani. Gerhana juga membutuhkan bulan baru (gerhana matahari) atau purnama (gerhana bulan), tetapi ada satu syarat lagi: orbit Bulan miring sekitar 5° terhadap orbit Bumi, sehingga pada kebanyakan bulan baru dan purnama bayangannya lewat di atas atau di bawah. Hanya ketika Bulan juga dekat salah satu dari dua titik tempat orbitnya memotong bidang orbit Bumi (titik simpul) gerhana dapat terjadi, itulah sebabnya gerhana hanya terjadi pada sekitar dua "musim" setiap tahun. Dalam simulasi garis simpul dibuat tetap searah Desember–Juni; dalam kenyataannya garis itu berputar perlahan satu kali setiap 18,6 tahun.',
        'Musim tidak ada hubungannya dengan Bulan atau dengan jarak ke Matahari. Sumbu Bumi miring 23,4° dan selalu menunjuk ke arah yang sama di ruang angkasa. Sekitar 21 Juni Kutub Utara condong ke Matahari: belahan Bumi utara mendapat siang yang panjang dan Matahari yang tinggi (musim panas) dan belahan Bumi selatan mendapat siang yang pendek (musim dingin). Sekitar 21 Desember keadaannya terbalik, dan pada ekuinoks Maret dan September tidak ada kutub yang condong ke Matahari sehingga Matahari tepat di atas khatulistiwa. Panel melaporkan lintang tempat Matahari tepat di atas kepala pada tengah hari; bagi Indonesia yang terletak di khatulistiwa, Matahari melintas tepat di atas kepala dua kali setahun dan suhu hampir tidak berubah, sehingga musim hujan dan kemarau di sana lebih ditentukan oleh angin muson daripada langsung oleh kemiringan sumbu.',
      ],
    },
    figure: {
      caption: {
        en: 'Top view from above the North Pole. Sunlight comes from the left. Eight Moon positions around Earth and the phase seen from the northern hemisphere at each one; the waxing Moon (lower half of the orbit, moving anticlockwise from new towards full) is lit on the right.',
        id: 'Pandangan dari atas Kutub Utara. Cahaya Matahari datang dari kiri. Delapan posisi Bulan mengitari Bumi dan fase yang terlihat dari belahan Bumi utara pada tiap posisi; Bulan yang membesar (setengah orbit bawah, bergerak berlawanan arah jarum jam dari bulan baru menuju purnama) terang di sisi kanan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cx = 180, cy = 120, R = 78, rm = 9, rp = 11;
        // Moon positions by elongation e (0 = new, between Earth and Sun on the left). Anticlockwise seen from above:
        // on screen (y down) anticlockwise means angle increases towards the bottom first.
        const names = [L('new', 'baru'), L('waxing crescent', 'sabit awal'), L('first quarter', 'perbani awal'), L('waxing gibbous', 'cembung awal'), L('full', 'purnama'), L('waning gibbous', 'cembung akhir'), L('last quarter', 'perbani akhir'), L('waning crescent', 'sabit akhir')];
        let moons = '', phases = '';
        for (let k = 0; k < 8; k++) {
          const e = k * Math.PI / 4;
          // Sun is at -x. Direction Earth->Sun angle = PI. Moon absolute angle a = PI + e, anticlockwise => screen y = cy - R sin(a).
          const a = Math.PI + e;
          const mx = cx + R * Math.cos(a), my = cy - R * Math.sin(a);
          // Orbiting moon: lit half faces left (towards the Sun)
          moons += `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${rm}" fill="#475569"/><path d="M${mx.toFixed(1)} ${(my - rm).toFixed(1)} A${rm} ${rm} 0 0 0 ${mx.toFixed(1)} ${(my + rm).toFixed(1)} Z" fill="#e2e8f0"/>`;
          // Phase as seen from Earth (NH): place a small disc further out
          const px = cx + (R + 34) * Math.cos(a), py = cy - (R + 34) * Math.sin(a);
          const f = (1 - Math.cos(e)) / 2;
          const waxing = e < Math.PI;
          const w = Math.abs(Math.cos(e)) * rp;
          let lit = '';
          if (f > 0.01) {
            const side = waxing ? 1 : 0; // right half lit when waxing
            lit += `<path d="M${px.toFixed(1)} ${(py - rp).toFixed(1)} A${rp} ${rp} 0 0 ${side} ${px.toFixed(1)} ${(py + rp).toFixed(1)} Z" fill="#fde68a"/>`;
            const fillc = f > 0.5 ? '#fde68a' : '#1e293b';
            lit += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${w.toFixed(2)}" ry="${rp}" fill="${fillc}"/>`;
          }
          phases += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${rp}" fill="#1e293b" stroke="currentColor" stroke-width=".6"/>${lit}`;
          const tx = cx + (R + 60) * Math.cos(a), ty = cy - (R + 60) * Math.sin(a);
          phases += `<text x="${tx.toFixed(1)}" y="${(ty + 3).toFixed(1)}" text-anchor="middle" class="s">${names[k]}</text>`;
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Moon phases from the positions of Sun, Earth and Moon', 'Fase Bulan dari posisi Matahari, Bumi, dan Bulan')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.s{font-size:8.5px;opacity:.9}</style>
  <defs><linearGradient id="sun" x1="0" x2="1"><stop offset="0" stop-color="#fbbf24" stop-opacity=".5"/><stop offset="1" stop-color="#fbbf24" stop-opacity="0"/></linearGradient></defs>
  <rect x="0" y="100" width="40" height="40" fill="url(#sun)"/>
  <text x="2" y="96" class="s">${L('sunlight →', 'cahaya →')}</text>
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="currentColor" stroke-width=".8" stroke-dasharray="3 3" opacity=".6"/>
  <circle cx="${cx}" cy="${cy}" r="13" fill="#1e293b"/><path d="M${cx} ${cy - 13} A13 13 0 0 0 ${cx} ${cy + 13} Z" fill="#60a5fa"/>
  <text x="${cx}" y="${cy + 3}" text-anchor="middle" class="s" style="fill:#fff">${L('Earth', 'Bumi')}</text>
  ${moons}
  ${phases}
  <path d="M${cx + 20} ${cy + 60} A64 64 0 0 1 ${cx + 62} ${cy + 20}" fill="none" stroke="#10b981" stroke-width="1.5"/>
  <path d="M${cx + 62} ${cy + 20} l-5 2 l1 -6 z" fill="#10b981"/>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The Moon\'s phase depends only on the angle between the Moon and the Sun as seen from Earth: 0° new, 90° first quarter, 180° full, 270° last quarter.',
        'Seen from above the North Pole, Earth and Moon orbit anticlockwise; from the northern hemisphere the waxing Moon is lit on the right.',
        'Spring tides (largest range) occur at new and full Moon when Sun and Moon pull along the same line; neap tides at the quarters.',
        'Eclipses need a new or full Moon and the Moon near a node of its 5°-tilted orbit, so they occur only a few times a year.',
        'Seasons are caused by the 23.4° tilt of Earth\'s axis, which keeps pointing the same way as Earth orbits; the hemisphere leaning towards the Sun has summer.',
        'At the equinoxes the Sun is overhead at the equator; at the solstices it is overhead at 23.4° N or 23.4° S.',
      ],
      id: [
        'Fase Bulan hanya bergantung pada sudut antara Bulan dan Matahari dilihat dari Bumi: 0° bulan baru, 90° perbani awal, 180° purnama, 270° perbani akhir.',
        'Dilihat dari atas Kutub Utara, Bumi dan Bulan mengorbit berlawanan arah jarum jam; dari belahan Bumi utara Bulan yang membesar terang di sisi kanan.',
        'Pasang purnama (rentang terbesar) terjadi pada bulan baru dan purnama ketika Matahari dan Bulan menarik segaris; pasang perbani pada fase perbani.',
        'Gerhana membutuhkan bulan baru atau purnama dan Bulan dekat titik simpul orbitnya yang miring 5°, sehingga hanya terjadi beberapa kali setahun.',
        'Musim disebabkan oleh kemiringan sumbu Bumi 23,4° yang terus menunjuk ke arah yang sama saat Bumi mengorbit; belahan yang condong ke Matahari mengalami musim panas.',
        'Pada ekuinoks Matahari tepat di atas khatulistiwa; pada titik balik Matahari tepat di atas 23,4° LU atau 23,4° LS.',
      ],
    },
    vocabulary: {
      en: [
        ['Phase', 'The shape of the lit part of the Moon seen from Earth; it changes as the Moon orbits.'],
        ['Waxing / waning', 'Growing (new to full) / shrinking (full to new).'],
        ['Spring tide', 'The largest tidal range, at new and full Moon when the Sun\'s and Moon\'s pulls line up. Nothing to do with the season.'],
        ['Neap tide', 'The smallest tidal range, at first and last quarter when the pulls are at right angles.'],
        ['Node', 'One of the two points where the Moon\'s tilted orbit crosses the plane of Earth\'s orbit; eclipses can only happen when the Moon is near a node.'],
        ['Solstice', 'The day (about 21 June or 21 December) when one pole leans most towards the Sun.'],
        ['Equinox', 'The day (about 20 March or 22 September) when the Sun is overhead at the equator and day and night are equal everywhere.'],
      ],
      id: [
        ['Fase', 'Bentuk bagian Bulan yang terang dilihat dari Bumi; berubah saat Bulan mengorbit.'],
        ['Membesar / mengecil', 'Bertambah terang (bulan baru ke purnama) / berkurang (purnama ke bulan baru).'],
        ['Pasang purnama', 'Rentang pasang terbesar, pada bulan baru dan purnama ketika tarikan Matahari dan Bulan segaris.'],
        ['Pasang perbani', 'Rentang pasang terkecil, pada perbani awal dan akhir ketika tarikannya tegak lurus.'],
        ['Titik simpul', 'Salah satu dari dua titik tempat orbit Bulan yang miring memotong bidang orbit Bumi; gerhana hanya mungkin ketika Bulan dekat titik simpul.'],
        ['Titik balik Matahari (solstis)', 'Hari (sekitar 21 Juni atau 21 Desember) ketika salah satu kutub paling condong ke Matahari.'],
        ['Ekuinoks', 'Hari (sekitar 20 Maret atau 22 September) ketika Matahari tepat di atas khatulistiwa dan siang serta malam sama panjang di mana-mana.'],
      ],
    },
    misconceptions: {
      en: [
        ['The phases are caused by Earth\'s shadow falling on the Moon.', 'Earth\'s shadow only touches the Moon during a lunar eclipse. Phases are caused by how much of the Moon\'s sunlit half faces us; drag the Moon and watch that its lit half always points at the Sun.'],
        ['Seasons happen because Earth is closer to the Sun in summer.', 'Earth\'s distance changes by only 3%, and it is actually closest in early January. Seasons come from the tilt: the two hemispheres have opposite seasons at the same distance.'],
        ['There should be a solar eclipse at every new Moon.', 'The Moon\'s orbit is tilted about 5°, so its shadow usually misses Earth. Only when a new Moon happens near a node does the shadow hit, a few times a year.'],
        ['Spring tides happen in spring.', '"Spring" here means to leap up. Spring tides happen twice every month, at new and full Moon, in every season.'],
      ],
      id: [
        ['Fase Bulan disebabkan bayangan Bumi yang jatuh ke Bulan.', 'Bayangan Bumi hanya menyentuh Bulan saat gerhana bulan. Fase disebabkan oleh seberapa banyak bagian Bulan yang disinari Matahari menghadap kita; geser Bulan dan perhatikan bagian terangnya selalu mengarah ke Matahari.'],
        ['Musim terjadi karena Bumi lebih dekat ke Matahari pada musim panas.', 'Jarak Bumi hanya berubah sekitar 3%, dan Bumi justru paling dekat pada awal Januari. Musim berasal dari kemiringan sumbu: kedua belahan Bumi mengalami musim yang berlawanan pada jarak yang sama.'],
        ['Seharusnya ada gerhana matahari setiap bulan baru.', 'Orbit Bulan miring sekitar 5°, sehingga bayangannya biasanya meleset dari Bumi. Hanya ketika bulan baru terjadi dekat titik simpul bayangannya mengenai Bumi, beberapa kali setahun.'],
        ['Pasang purnama hanya terjadi saat bulan purnama penuh di langit cerah.', 'Pasang purnama terjadi dua kali setiap bulan, pada bulan baru dan purnama, dalam musim apa pun; yang penting adalah kesegarisan Matahari, Bumi, dan Bulan, bukan cuaca atau musim.'],
      ],
    },
    realWorld: {
      en: [
        'Fishing and shipping communities plan around spring tides, when harbours are deepest at high water and reefs most exposed at low water.',
        'The Islamic calendar begins each month at the first sighting of the thin waxing crescent after new Moon, so the dates of Ramadan and Eid follow the Moon\'s cycle.',
        'Total solar eclipses crossed Indonesia on 9 March 2016 and 20 April 2023; eclipse seasons return roughly every six months.',
        'Satellite solar panels and solar-powered homes are angled according to the Sun\'s overhead latitude, which the sim reports for each date.',
        'Midnight Sun in northern Norway in June and polar night in December are the extreme consequences of the axial tilt shown in the side panel.',
      ],
      id: [
        'Masyarakat nelayan dan pelayaran merencanakan kegiatan di sekitar pasang purnama, saat pelabuhan paling dalam pada air pasang dan terumbu paling tersingkap pada air surut.',
        'Kalender Hijriah memulai setiap bulan pada penampakan pertama hilal (sabit tipis) setelah bulan baru, sehingga tanggal Ramadan dan Idulfitri mengikuti siklus Bulan.',
        'Gerhana matahari total melintasi Indonesia pada 9 Maret 2016 dan 20 April 2023; musim gerhana kembali kira-kira setiap enam bulan.',
        'Panel surya satelit dan rumah bertenaga surya dimiringkan sesuai lintang tempat Matahari tepat di atas kepala, yang dilaporkan simulasi untuk setiap tanggal.',
        'Matahari tengah malam di Norwegia utara pada bulan Juni dan malam kutub pada Desember adalah akibat ekstrem kemiringan sumbu yang ditunjukkan di panel samping.',
      ],
    },
    questions: {
      en: [
        { q: 'The Moon is 90° anticlockwise from the Sun direction as seen from above. What phase is it, which side is lit from Indonesia, and what kind of tide is expected?', a: 'First quarter: half the disc is lit, on the right for a northern-hemisphere viewer (Indonesia straddles the equator, so the lit side appears on the right or at the top depending on latitude and time). Sun and Moon pull at right angles, so the tides are neap tides with a small range.' },
        { q: 'Why does the sim show "Solar eclipse possible" at the December new Moon but not at the March new Moon?', a: 'In the sim the line of nodes points along the December–June direction. At the December new Moon the Moon is at a node, in the plane of Earth\'s orbit, so its shadow can reach Earth. At the March new Moon the Moon is 90° from the nodes and about 5° above or below the plane, so the shadow misses.' },
        { q: 'On 21 June the panel says the Sun is overhead at 23.4° N. Explain what this means for Australia and for the Arctic.', a: 'The North Pole leans towards the Sun. Australia, in the southern hemisphere, leans away: short days, low Sun, winter. Above the Arctic Circle (66.6° N) the Sun does not set at all that day. The northern hemisphere has its summer solstice while the southern hemisphere has its winter solstice.' },
      ],
      id: [
        { q: 'Bulan berada 90° berlawanan arah jarum jam dari arah Matahari dilihat dari atas. Fase apa itu, sisi mana yang terang dilihat dari Indonesia, dan pasang jenis apa yang diharapkan?', a: 'Perbani awal: setengah cakram terang, di sisi kanan bagi pengamat belahan utara (Indonesia berada di khatulistiwa, sehingga sisi terang tampak di kanan atau di atas tergantung lintang dan waktu). Matahari dan Bulan menarik tegak lurus, sehingga terjadi pasang perbani dengan rentang kecil.' },
        { q: 'Mengapa simulasi menunjukkan "Gerhana matahari mungkin" pada bulan baru Desember tetapi tidak pada bulan baru Maret?', a: 'Dalam simulasi garis simpul mengarah Desember–Juni. Pada bulan baru Desember, Bulan berada di titik simpul, pada bidang orbit Bumi, sehingga bayangannya bisa mencapai Bumi. Pada bulan baru Maret, Bulan berada 90° dari titik simpul dan sekitar 5° di atas atau di bawah bidang, sehingga bayangannya meleset.' },
        { q: 'Pada 21 Juni panel menyatakan Matahari tepat di atas 23,4° LU. Jelaskan artinya bagi Australia dan bagi Arktik.', a: 'Kutub Utara condong ke Matahari. Australia, di belahan selatan, condong menjauh: siang pendek, Matahari rendah, musim dingin. Di atas Lingkar Arktik (66,6° LU) Matahari tidak terbenam sama sekali hari itu. Belahan utara mengalami titik balik musim panas sementara belahan selatan mengalami titik balik musim dingin.' },
      ],
    },
  },
};
