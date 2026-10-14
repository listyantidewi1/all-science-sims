// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compute equal-temperament intervals: 100 cents per semitone.',
      'Compare to "just" ratios from small whole numbers.',
      'Hear which intervals are nearly identical (octave, fifth) vs noticeably off (third, sixth).',
    ],
    id: [
      'Menghitung interval temperamen sama: 100 cents per semiton.',
      'Bandingkan dengan rasio "murni" dari bilangan bulat kecil.',
      'Dengar interval yang hampir identik (oktaf, kuint) vs yang berbeda jelas (terts, sekst).',
    ],
  },  tryThis: {
    en: [
      'Major third — equal-temperament is +14 cents sharp of pure 5:4. Hear it.',
      'Perfect fifth — only 2 cents off, basically identical.',
      'Minor seventh — both versions exist; play both back-to-back.',
    ],
    id: [
      'Terts mayor — temperamen sama +14 cents lebih tinggi dari 5:4 murni. Dengarkan.',
      'Kuint sempurna — hanya 2 cents berbeda, praktis identik.',
      'Septim minor — kedua versi ada; mainkan keduanya berurutan.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Two notes sound consonant when their frequencies are in a ratio of small whole numbers. An octave is 2:1, a perfect fifth 3:2, a major third 5:4. These ratios arise naturally from the harmonic series, and when two tones are tuned to them their harmonics line up exactly, so nothing beats. Tuning built from such ratios is called just intonation. The trouble is that the ratios do not fit together neatly: stacking twelve pure fifths gives (3/2)^12 ≈ 129.7, while seven octaves give 2^7 = 128. The gap, about 23.5 cents (the Pythagorean comma), means no fixed set of twelve notes can be pure in every key.',
        'Equal temperament (ET) solves this by giving up purity everywhere, a little, instead of badly in a few places. The octave is divided into 12 identical steps, so each semitone multiplies frequency by 2^(1/12) ≈ 1.05946, and every interval of n semitones is 2^(n/12). To compare tunings we use cents: 1 cent is one hundredth of an ET semitone, so an interval with frequency ratio r measures 1200·log₂(r) cents. An ET semitone is exactly 100 cents by definition; a just fifth is 1200·log₂(1.5) = 701.96 cents, so the ET fifth at 700 cents is only 2 cents flat, far below what most listeners can hear.',
        'The simulation lists thirteen intervals above middle C (C4 = 261.63 Hz). For each it shows the just ratio chosen here, the just frequency, the ET frequency and the difference Δ = ET cents − just cents, coloured green when |Δ| < 4 cents, amber below 12, red above. Click a row to select it, then play the just version, the ET version, or both one after the other. The big discrepancies are the thirds and sixths: the ET major third is 13.7 cents sharp of 5:4 and the ET minor third 15.6 cents flat of 6:5. Listen to the sustained major third: the just one is smooth, the ET one has a faint shimmer.',
        'Several things are simplified. "Just" ratios are not unique: the tritone could be 7:5 instead of 45:32, the minor seventh 16:9 instead of 9:5, and the table shows one common choice. The root is always C4, and the tones are synthetic triangle waves, which contain only odd harmonics, so the beating between mismatched harmonics is weaker than it would be on a piano or organ. Historical tunings in between the two extremes, such as meantone and the well temperaments of Bach\'s time, are not shown. The sim\'s point is the trade-off itself: ET lets every key sound the same, at the price of thirds that are never quite pure.',
      ],
      id: [
        'Dua nada terdengar selaras (konsonan) ketika frekuensinya berbanding sebagai bilangan bulat kecil. Oktaf adalah 2:1, kuint sempurna 3:2, terts mayor 5:4. Rasio-rasio ini muncul secara alami dari deret harmonik, dan ketika dua nada disetel menurut rasio itu, harmonik-harmoniknya berimpit tepat sehingga tidak ada layangan. Penyetelan yang dibangun dari rasio semacam ini disebut intonasi murni. Masalahnya, rasio-rasio itu tidak saling cocok dengan rapi: menumpuk dua belas kuint murni menghasilkan (3/2)^12 ≈ 129,7, sedangkan tujuh oktaf menghasilkan 2^7 = 128. Selisihnya, sekitar 23,5 sen (koma Pythagoras), berarti tidak ada himpunan tetap dua belas nada yang murni di semua kunci.',
        'Temperamen sama (ET) mengatasinya dengan mengorbankan kemurnian di mana-mana, sedikit, alih-alih rusak parah di beberapa tempat. Oktaf dibagi menjadi 12 langkah identik, sehingga tiap semiton mengalikan frekuensi dengan 2^(1/12) ≈ 1,05946, dan setiap interval n semiton adalah 2^(n/12). Untuk membandingkan penyetelan dipakai satuan sen (cent): 1 sen adalah seperseratus semiton ET, sehingga interval dengan rasio frekuensi r berukuran 1200·log₂(r) sen. Semiton ET tepat 100 sen menurut definisi; kuint murni adalah 1200·log₂(1,5) = 701,96 sen, sehingga kuint ET pada 700 sen hanya 2 sen lebih rendah, jauh di bawah yang bisa didengar kebanyakan orang.',
        'Simulasi ini mendaftar tiga belas interval di atas C tengah (C4 = 261,63 Hz). Untuk masing-masing ditampilkan rasio murni yang dipilih, frekuensi murni, frekuensi ET, dan selisih Δ = sen ET − sen murni, berwarna hijau jika |Δ| < 4 sen, kuning di bawah 12, merah di atasnya. Klik sebuah baris untuk memilihnya, lalu mainkan versi murni, versi ET, atau keduanya berurutan. Selisih terbesar ada pada terts dan sekst: terts mayor ET 13,7 sen lebih tinggi dari 5:4 dan terts minor ET 15,6 sen lebih rendah dari 6:5. Dengarkan terts mayor yang ditahan: versi murninya halus, versi ET-nya bergetar samar.',
        'Beberapa hal disederhanakan. Rasio "murni" tidak tunggal: tritonus bisa 7:5 alih-alih 45:32, septim minor 16:9 alih-alih 9:5, dan tabel ini menampilkan satu pilihan yang umum. Nada dasarnya selalu C4, dan nadanya adalah gelombang segitiga sintetis yang hanya memuat harmonik ganjil, sehingga layangan antara harmonik yang tidak cocok lebih lemah daripada pada piano atau organ. Penyetelan historis di antara dua ekstrem itu, seperti meantone dan well temperament pada zaman Bach, tidak ditampilkan. Inti simulasi ini adalah tukar-tambahnya sendiri: ET membuat setiap kunci terdengar sama, dengan harga terts yang tidak pernah benar-benar murni.',
      ],
    },
    figure: {
      caption: {
        en: 'How far each equal-tempered interval sits from its just ratio, in cents (1 cent = 1/100 semitone). Fifths and fourths are almost pure; thirds, sixths and sevenths are off by 12–18 cents.',
        id: 'Seberapa jauh tiap interval temperamen sama dari rasio murninya, dalam sen (1 sen = 1/100 semiton). Kuint dan kuart hampir murni; terts, sekst, dan septim meleset 12–18 sen.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const rows = [
          ['Minor 2nd', 'Sekon minor', '16:15', -11.7], ['Major 2nd', 'Sekon mayor', '9:8', -3.9],
          ['Minor 3rd', 'Terts minor', '6:5', -15.6], ['Major 3rd', 'Terts mayor', '5:4', 13.7],
          ['Perfect 4th', 'Kuart', '4:3', 2.0], ['Tritone', 'Tritonus', '45:32', 9.8],
          ['Perfect 5th', 'Kuint', '3:2', -2.0], ['Minor 6th', 'Sekst minor', '8:5', -13.7],
          ['Major 6th', 'Sekst mayor', '5:3', 15.6], ['Minor 7th', 'Septim minor', '9:5', -17.6],
          ['Major 7th', 'Septim mayor', '15:8', 11.7],
        ];
        const cx = 215, k = 4.5;
        const col = (c) => (Math.abs(c) < 4 ? '#10b981' : Math.abs(c) < 12 ? '#f59e0b' : '#ef4444');
        const body = rows.map(([en, id, ratio, c], i) => {
          const y = 34 + i * 17, x = cx + c * k;
          const v = (c > 0 ? '+' : '') + L(c.toFixed(1), c.toFixed(1).replace('.', ','));
          return `<text x="12" y="${y + 4}">${L(en, id)}</text><text x="78" y="${y + 4}" class="r">${ratio}</text>`
            + `<line x1="${cx}" y1="${y}" x2="${x.toFixed(1)}" y2="${y}" stroke="${col(c)}" stroke-width="4"/>`
            + `<circle cx="${x.toFixed(1)}" cy="${y}" r="3.5" fill="${col(c)}"/>`
            + `<text x="${(c > 0 ? x + 7 : x - 7).toFixed(1)}" y="${y + 4}" class="r"${c > 0 ? '' : ' text-anchor="end"'} fill="${col(c)}">${v}</text>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Equal temperament minus just intonation, in cents', 'Temperamen sama dikurangi intonasi murni, dalam sen')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.r{font-size:9px;opacity:.85}.ax{stroke:currentColor;stroke-width:1;opacity:.35}</style>
  <line x1="${cx}" y1="22" x2="${cx}" y2="212" stroke="currentColor" stroke-width="1" opacity=".6"/>
  <line x1="${cx - 20 * k}" y1="212" x2="${cx + 20 * k}" y2="212" class="ax"/>
  <line x1="${cx - 10 * k}" y1="209" x2="${cx - 10 * k}" y2="215" class="ax"/>
  <line x1="${cx + 10 * k}" y1="209" x2="${cx + 10 * k}" y2="215" class="ax"/>
  <text x="${cx - 20 * k - 6}" y="226" class="r">−20</text>
  <text x="${cx - 10 * k - 6}" y="226" class="r">−10</text>
  <text x="${cx - 3}" y="226" class="r">0</text>
  <text x="${cx + 10 * k - 7}" y="226" class="r">+10</text>
  <text x="${cx + 20 * k - 7}" y="226" class="r">+20</text>
  <text x="${cx + 20 * k - 40}" y="238" class="r">${L('cents, ET − just', 'sen, ET − murni')}</text>
  <text x="${cx - 95}" y="16" class="r">${L('ET flat of just', 'ET lebih rendah')}</text>
  <text x="${cx + 12}" y="16" class="r">${L('ET sharp of just', 'ET lebih tinggi')}</text>
  ${body}
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Consonant intervals correspond to simple frequency ratios: 2:1 octave, 3:2 fifth, 5:4 major third.',
        'Twelve pure fifths overshoot seven octaves by about 23.5 cents, so no fixed 12-note tuning can be pure in every key.',
        'Equal temperament makes every semitone the same ratio, 2^(1/12) ≈ 1.0595, so all keys sound alike.',
        'Cents measure interval size on a logarithmic scale: cents = 1200·log₂(ratio); a semitone is 100 cents.',
        'ET fifths and fourths are within 2 cents of pure, but ET thirds and sixths are 14–16 cents off, which trained ears can hear as a slight shimmer.',
      ],
      id: [
        'Interval yang selaras bersesuaian dengan rasio frekuensi sederhana: oktaf 2:1, kuint 3:2, terts mayor 5:4.',
        'Dua belas kuint murni melampaui tujuh oktaf sekitar 23,5 sen, sehingga tidak ada penyetelan tetap 12 nada yang murni di semua kunci.',
        'Temperamen sama membuat setiap semiton berasio sama, 2^(1/12) ≈ 1,0595, sehingga semua kunci terdengar serupa.',
        'Sen mengukur besar interval pada skala logaritmik: sen = 1200·log₂(rasio); satu semiton adalah 100 sen.',
        'Kuint dan kuart ET berbeda kurang dari 2 sen dari murni, tetapi terts dan sekst ET meleset 14–16 sen, yang oleh telinga terlatih terdengar sebagai getaran samar.',
      ],
    },
    vocabulary: {
      en: [
        ['Interval', 'The distance between two pitches, described by the ratio of their frequencies.'],
        ['Just intonation', 'Tuning in which intervals are exact small-whole-number ratios, such as 3:2 or 5:4.'],
        ['Equal temperament', 'Tuning in which the octave is split into 12 equal semitones, each a ratio of 2^(1/12).'],
        ['Semitone', 'The smallest step on a piano keyboard; 100 cents in equal temperament.'],
        ['Cent', 'One hundredth of an equal-tempered semitone; an interval of ratio r is 1200·log₂(r) cents.'],
        ['Pythagorean comma', 'The gap of about 23.5 cents between twelve pure fifths and seven octaves.'],
        ['Temperament', 'Any systematic way of slightly adjusting pure intervals so that a fixed set of notes works in many keys.'],
      ],
      id: [
        ['Interval', 'Jarak antara dua tinggi nada, dinyatakan dengan rasio frekuensinya.'],
        ['Intonasi murni', 'Penyetelan dengan interval berupa rasio bilangan bulat kecil yang tepat, seperti 3:2 atau 5:4.'],
        ['Temperamen sama', 'Penyetelan yang membagi oktaf menjadi 12 semiton sama besar, masing-masing berasio 2^(1/12).'],
        ['Semiton', 'Langkah terkecil pada papan tuts piano; 100 sen dalam temperamen sama.'],
        ['Sen (cent)', 'Seperseratus semiton temperamen sama; interval berasio r berukuran 1200·log₂(r) sen.'],
        ['Koma Pythagoras', 'Selisih sekitar 23,5 sen antara dua belas kuint murni dan tujuh oktaf.'],
        ['Temperamen', 'Cara sistematis apa pun untuk sedikit menggeser interval murni agar satu himpunan nada tetap dapat dipakai di banyak kunci.'],
      ],
    },
    misconceptions: {
      en: [
        ['A piano is tuned perfectly in tune.', 'A piano is tuned so that every key is equally slightly out of tune. Its fifths are 2 cents narrow and its major thirds 14 cents wide compared with pure ratios; the compromise is what lets it play in all twelve keys.'],
        ['Cents add up like hertz: a 100 Hz interval is always the same number of cents.', 'Cents are logarithmic. 100 Hz above 200 Hz is a fifth (702 cents), but 100 Hz above 2000 Hz is less than a semitone (84 cents). Equal musical steps are equal ratios, not equal differences.'],
        ['Just intonation is simply "correct" and equal temperament is "wrong".', 'Each serves a purpose. Just intervals are smoother for a chord held in one key, but a fixed just scale makes some chords in other keys badly out of tune. Singers and string players often shift between the two without noticing.'],
      ],
      id: [
        ['Piano disetel benar-benar tepat.', 'Piano disetel agar setiap kunci sama-sama sedikit meleset. Kuintnya 2 sen lebih sempit dan terts mayornya 14 sen lebih lebar dibanding rasio murni; kompromi inilah yang membuatnya bisa dimainkan di dua belas kunci.'],
        ['Sen bertambah seperti hertz: interval 100 Hz selalu sama banyak sennya.', 'Sen bersifat logaritmik. 100 Hz di atas 200 Hz adalah kuint (702 sen), tetapi 100 Hz di atas 2000 Hz kurang dari satu semiton (84 sen). Langkah musik yang sama berarti rasio yang sama, bukan selisih yang sama.'],
        ['Intonasi murni itu "benar" dan temperamen sama itu "salah".', 'Keduanya punya tujuan. Interval murni lebih halus untuk akord yang ditahan dalam satu kunci, tetapi tangga nada murni yang tetap membuat beberapa akord di kunci lain sangat meleset. Penyanyi dan pemain alat gesek sering berpindah di antara keduanya tanpa sadar.'],
      ],
    },
    realWorld: {
      en: [
        'Pianos, guitars with fixed frets and most electronic keyboards use 12-tone equal temperament so they can play in any key.',
        'Barbershop quartets and a cappella choirs tune chords by ear toward just ratios, which is why their held chords can sound unusually "locked in".',
        'Piano tuners check an ET major third by listening for the roughly 10 beats per second between the fourth harmonic of the upper note and the fifth harmonic of the lower one.',
        'Some musical traditions use different divisions altogether: Indonesian gamelan sets use their own slendro and pelog scales, and Arabic maqam music uses intervals near quarter-tones.',
      ],
      id: [
        'Piano, gitar dengan fret tetap, dan sebagian besar keyboard elektronik memakai temperamen sama 12 nada agar bisa dimainkan di kunci apa pun.',
        'Kuartet barbershop dan paduan suara a cappella menyetel akord dengan telinga menuju rasio murni, sehingga akord yang mereka tahan terdengar sangat "menyatu".',
        'Penyetel piano memeriksa terts mayor ET dengan mendengarkan sekitar 10 layangan per sekon antara harmonik keempat nada atas dan harmonik kelima nada bawah.',
        'Beberapa tradisi musik memakai pembagian yang sama sekali berbeda: gamelan Indonesia memakai laras slendro dan pelog, dan musik maqam Arab memakai interval yang mendekati seperempat nada.',
      ],
    },
    questions: {
      en: [
        { q: 'Work out the size in cents of a just perfect fifth (3:2) and compare it with the ET fifth.', a: '1200·log₂(1.5) = 1200 × 0.58496 ≈ 701.96 cents. The ET fifth is 7 semitones = 700 cents, so ET is about 2 cents flat: Δ ≈ −2.0, as the table shows.' },
        { q: 'Why can twelve pure fifths not be made to close exactly into seven octaves, and how does equal temperament deal with that?', a: '(3/2)^12 ≈ 129.75 but 2^7 = 128, so twelve pure fifths land about 23.5 cents too high. Something has to absorb the gap. ET shaves it equally off all twelve fifths, 23.5/12 ≈ 2 cents each, which is why every ET fifth is 700 instead of 702 cents.' },
        { q: 'In the table the major third shows Δ = +13.7 cents and the minor sixth Δ = −13.7 cents. Explain why they must be equal and opposite.', a: 'The two intervals together make an octave in both systems: in ET 400 + 800 = 1200 cents, and in just intonation 5/4 × 8/5 = 2. Since the octave itself is identical (0 cents difference), whatever ET adds to the third it must take away from the sixth. The same holds for the minor third and major sixth (−15.6 and +15.6).' },
      ],
      id: [
        { q: 'Hitung besar kuint sempurna murni (3:2) dalam sen dan bandingkan dengan kuint ET.', a: '1200·log₂(1,5) = 1200 × 0,58496 ≈ 701,96 sen. Kuint ET adalah 7 semiton = 700 sen, jadi ET sekitar 2 sen lebih rendah: Δ ≈ −2,0, seperti yang ditampilkan tabel.' },
        { q: 'Mengapa dua belas kuint murni tidak bisa menutup tepat menjadi tujuh oktaf, dan bagaimana temperamen sama mengatasinya?', a: '(3/2)^12 ≈ 129,75 tetapi 2^7 = 128, sehingga dua belas kuint murni mendarat sekitar 23,5 sen terlalu tinggi. Selisih itu harus ditanggung sesuatu. ET memotongnya rata dari kedua belas kuint, 23,5/12 ≈ 2 sen masing-masing, sehingga setiap kuint ET menjadi 700, bukan 702 sen.' },
        { q: 'Di tabel, terts mayor menunjukkan Δ = +13,7 sen dan sekst minor Δ = −13,7 sen. Jelaskan mengapa keduanya harus sama besar dan berlawanan tanda.', a: 'Kedua interval itu bersama-sama membentuk satu oktaf dalam kedua sistem: dalam ET 400 + 800 = 1200 sen, dan dalam intonasi murni 5/4 × 8/5 = 2. Karena oktafnya sendiri identik (selisih 0 sen), apa pun yang ditambahkan ET pada terts harus dikurangi dari sekst. Hal yang sama berlaku untuk terts minor dan sekst mayor (−15,6 dan +15,6).' },
      ],
    },
  },
};
