// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Derive the allowed wavelengths of standing waves in an open–open pipe (λₙ = 2L/n), an open–closed pipe (λₙ = 4L/n, n odd) and a string fixed at both ends (λₙ = 2L/n) from the boundary conditions.',
      'Calculate harmonic frequencies with fₙ = v/λₙ, using v = 343 m/s for air or v = √(T/μ) for a string, and explain why an open–closed pipe has only odd harmonics.',
      'Use the resonance lengths of an air column driven by a tuning fork to measure the speed of sound from ΔL = λ/2 and v = fλ.',
    ],
    id: [
      'Menurunkan panjang gelombang yang diizinkan untuk gelombang stasioner pada pipa terbuka–terbuka (λₙ = 2L/n), pipa terbuka–tertutup (λₙ = 4L/n, n ganjil), dan dawai terikat kedua ujung (λₙ = 2L/n) dari syarat batasnya.',
      'Menghitung frekuensi harmonik dengan fₙ = v/λₙ, memakai v = 343 m/s untuk udara atau v = √(T/μ) untuk dawai, dan menjelaskan mengapa pipa terbuka–tertutup hanya memiliki harmonik ganjil.',
      'Menggunakan panjang-panjang resonansi kolom udara yang digetarkan garpu tala untuk mengukur cepat rambat bunyi dari ΔL = λ/2 dan v = fλ.',
    ],
  },
  tryThis: {
    en: [
      'Keep L = 1.00 m and step through n = 1, 2, 3 on the open–open pipe. Check that the frequencies are 171.5, 343 and 514.5 Hz, exact multiples of the fundamental.',
      'Switch to the open–closed pipe at the same length. The fundamental halves to 85.75 Hz and the next allowed harmonics are 3× and 5× — try to find a 2nd harmonic. You cannot.',
      'On the string, double the tension from 50 N to 100 N. The frequency should rise by a factor of √2 ≈ 1.41, not by 2.',
      'Turn on the resonance tube with the 512 Hz fork and lower the water from the top. Note every length where the loudness meter peaks; successive peaks differ by λ/2.',
    ],
    id: [
      'Tahan L = 1,00 m dan ubah n = 1, 2, 3 pada pipa terbuka–terbuka. Periksa bahwa frekuensinya 171,5, 343, dan 514,5 Hz, kelipatan bulat dari nada dasar.',
      'Pindah ke pipa terbuka–tertutup dengan panjang yang sama. Nada dasarnya turun setengah menjadi 85,75 Hz dan harmonik berikutnya adalah 3× dan 5× — coba cari harmonik ke-2. Tidak ada.',
      'Pada dawai, gandakan tegangan dari 50 N ke 100 N. Frekuensi seharusnya naik dengan faktor √2 ≈ 1,41, bukan 2.',
      'Nyalakan tabung resonansi dengan garpu tala 512 Hz dan turunkan air dari atas. Catat setiap panjang saat meter kenyaringan memuncak; puncak berturut-turut berbeda λ/2.',
    ],
  },

  learn: {
    background: {
      en: [
        'A standing wave forms when a wave and its reflection travel back and forth along the same path and interfere. At some points, the nodes, the two waves always cancel and the medium never moves; halfway between them, at the antinodes, they always add and the oscillation is largest. The distance from one node to the next is exactly half a wavelength, λ/2. A pipe or string can only hold standing waves whose nodes and antinodes fit its ends, so each system has a discrete set of allowed wavelengths and, through f = v/λ, a discrete set of natural frequencies called harmonics.',
        'The ends decide the pattern. A string fixed at both ends must have a displacement node at each end, so L = n·λ/2 and λₙ = 2L/n with n = 1, 2, 3, …; its frequencies are fₙ = n·v/(2L), where the wave speed on the string is v = √(T/μ) (T the tension in newtons, μ the mass per unit length in kg/m). An open pipe end is a displacement antinode (air moves freely) and, equivalently, a pressure node (the pressure is pinned at atmospheric). An open–open pipe therefore has antinodes at both ends and the same formula as the string, λₙ = 2L/n, with fₙ = n·v/(2L) and v = 343 m/s in air at 20 °C. A closed end forces a displacement node (air cannot move into the wall) and a pressure antinode. An open–closed pipe needs an antinode at one end and a node at the other, so L must be an odd number of quarter wavelengths: λₙ = 4L/n and fₙ = n·v/(4L) with n = 1, 3, 5, … only. Its fundamental is an octave lower than that of an open pipe of the same length, and all even harmonics are missing, which is why a clarinet (closed at the reed) sounds so different from a flute (open at both ends).',
        'The sim draws the displacement standing wave as a curve inside the pipe and also moves rows of air "molecules" longitudinally, so you can see that a displacement node is where the air piles up and thins out most, that is, a pressure antinode. Switching on the pressure view overlays the pressure wave, shifted by a quarter wavelength from the displacement wave. In the resonance-tube lab a tuning fork of fixed frequency sits above a tube that is partly filled with water. The air column is open at the top and closed at the water surface, so it resonates loudly only when its length is λ/4, 3λ/4, 5λ/4, … Measuring two successive resonance lengths gives ΔL = λ/2, and v = fλ then yields the speed of sound without needing a stopwatch. Real tubes need a small end correction of about 0.6 times the tube radius, which this sim ignores.',
      ],
      id: [
        'Gelombang stasioner terbentuk ketika sebuah gelombang dan pantulannya bergerak bolak-balik pada lintasan yang sama dan berinterferensi. Di titik-titik tertentu, yaitu simpul, kedua gelombang selalu saling meniadakan sehingga medium tidak pernah bergerak; di tengah-tengah antara simpul, yaitu perut, keduanya selalu saling menguatkan dan getarannya paling besar. Jarak dari satu simpul ke simpul berikutnya tepat setengah panjang gelombang, λ/2. Pipa atau dawai hanya dapat menampung gelombang stasioner yang simpul dan perutnya cocok dengan ujung-ujungnya, sehingga setiap sistem memiliki himpunan panjang gelombang tertentu dan, melalui f = v/λ, himpunan frekuensi alami tertentu yang disebut harmonik.',
        'Ujung-ujungnya menentukan polanya. Dawai yang terikat di kedua ujung harus memiliki simpul simpangan di setiap ujung, sehingga L = n·λ/2 dan λₙ = 2L/n dengan n = 1, 2, 3, …; frekuensinya fₙ = n·v/(2L), dengan cepat rambat gelombang pada dawai v = √(T/μ) (T tegangan dalam newton, μ massa per satuan panjang dalam kg/m). Ujung pipa yang terbuka adalah perut simpangan (udara bebas bergerak) dan sekaligus simpul tekanan (tekanannya terpaku pada tekanan atmosfer). Pipa terbuka–terbuka karenanya berperut di kedua ujung dan mengikuti rumus yang sama dengan dawai, λₙ = 2L/n, dengan fₙ = n·v/(2L) dan v = 343 m/s di udara pada 20 °C. Ujung tertutup memaksa adanya simpul simpangan (udara tidak dapat masuk ke dinding) dan perut tekanan. Pipa terbuka–tertutup memerlukan perut di satu ujung dan simpul di ujung lainnya, sehingga L harus berupa kelipatan ganjil seperempat panjang gelombang: λₙ = 4L/n dan fₙ = n·v/(4L) hanya dengan n = 1, 3, 5, … Nada dasarnya satu oktaf lebih rendah daripada pipa terbuka dengan panjang yang sama, dan semua harmonik genap tidak ada; itulah sebabnya klarinet (tertutup di bagian lidah getar) terdengar sangat berbeda dari seruling (terbuka di kedua ujung).',
        'Simulasi menggambar gelombang stasioner simpangan sebagai kurva di dalam pipa dan juga menggerakkan barisan "molekul" udara secara longitudinal, sehingga kamu dapat melihat bahwa simpul simpangan adalah tempat udara paling menumpuk dan paling merenggang, yaitu perut tekanan. Menyalakan tampilan tekanan menampilkan gelombang tekanan yang bergeser seperempat panjang gelombang dari gelombang simpangan. Pada lab tabung resonansi, garpu tala berfrekuensi tetap diletakkan di atas tabung yang sebagian berisi air. Kolom udaranya terbuka di atas dan tertutup di permukaan air, sehingga beresonansi nyaring hanya ketika panjangnya λ/4, 3λ/4, 5λ/4, … Mengukur dua panjang resonansi berturut-turut memberikan ΔL = λ/2, dan v = fλ lalu menghasilkan cepat rambat bunyi tanpa perlu stopwatch. Tabung sungguhan memerlukan koreksi ujung kecil sekitar 0,6 kali jari-jari tabung, yang diabaikan dalam simulasi ini.',
      ],
    },
    figure: {
      caption: {
        en: 'Displacement standing waves for the first two allowed harmonics of each system. Open ends and free air are antinodes (A); fixed ends and closed ends are nodes (N). Only the open–closed pipe skips n = 2.',
        id: 'Gelombang stasioner simpangan untuk dua harmonik pertama yang diizinkan pada setiap sistem. Ujung terbuka adalah perut (A); ujung terikat dan ujung tertutup adalah simpul (N). Hanya pipa terbuka–tertutup yang melompati n = 2.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // Build a sin/cos standing-wave envelope path between x0..x1 at centre y, amplitude a.
        const env = (x0, x1, y, a, kind, n) => {
          let p1 = '', p2 = '';
          const steps = 48;
          for (let i = 0; i <= steps; i++) {
            const u = i / steps;
            const x = x0 + (x1 - x0) * u;
            let v;
            if (kind === 'oo') v = Math.cos(Math.PI * n * u);
            else if (kind === 'oc') v = Math.cos((Math.PI / 2) * n * u);
            else v = Math.sin(Math.PI * n * u);
            const y1 = (y - a * v).toFixed(1), y2 = (y + a * v).toFixed(1);
            p1 += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y1 + ' ';
            p2 += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y2 + ' ';
          }
          return `<path d="${p1}" class="w"/><path d="${p2}" class="w2"/>`;
        };
        const row = (y, kind, n1, n2, title, f1, f2) => {
          const x0 = 70, x1 = 200, x2 = 220, x3 = 350;
          const wall = (xa, xb) => kind === 's'
            ? `<line x1="${xa}" y1="${y - 14}" x2="${xa}" y2="${y + 14}" class="k"/><line x1="${xb}" y1="${y - 14}" x2="${xb}" y2="${y + 14}" class="k"/>`
            : `<line x1="${xa}" y1="${y - 14}" x2="${xb}" y2="${y - 14}" class="m"/><line x1="${xa}" y1="${y + 14}" x2="${xb}" y2="${y + 14}" class="m"/>` +
              (kind === 'oc' ? `<line x1="${xb}" y1="${y - 14}" x2="${xb}" y2="${y + 14}" class="k"/>` : '');
          const endLab = (xa, xb) => kind === 'oo'
            ? `<text x="${xa}" y="${y + 28}" text-anchor="middle" class="s">A</text><text x="${xb}" y="${y + 28}" text-anchor="middle" class="s">A</text>`
            : kind === 'oc'
              ? `<text x="${xa}" y="${y + 28}" text-anchor="middle" class="s">A</text><text x="${xb}" y="${y + 28}" text-anchor="middle" class="s">N</text>`
              : `<text x="${xa}" y="${y + 28}" text-anchor="middle" class="s">N</text><text x="${xb}" y="${y + 28}" text-anchor="middle" class="s">N</text>`;
          return `
  <text x="4" y="${y - 18}" class="t">${title}</text>
  ${wall(x0, x1)}${env(x0, x1, y, 11, kind, n1)}${endLab(x0, x1)}
  <text x="${(x0 + x1) / 2}" y="${y - 18}" text-anchor="middle" class="s">${f1}</text>
  ${wall(x2, x3)}${env(x2, x3, y, 11, kind, n2)}${endLab(x2, x3)}
  <text x="${(x2 + x3) / 2}" y="${y - 18}" text-anchor="middle" class="s">${f2}</text>`;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Standing wave patterns in an open–open pipe, an open–closed pipe and a fixed string', 'Pola gelombang stasioner pada pipa terbuka–terbuka, pipa terbuka–tertutup, dan dawai terikat')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.t{font:bold 10px system-ui,sans-serif;fill:currentColor}.s{font:10px system-ui,sans-serif;fill:currentColor;opacity:.85}.m{stroke:currentColor;stroke-width:1.4;opacity:.6}.k{stroke:currentColor;stroke-width:3}.w{fill:none;stroke:#3b82f6;stroke-width:1.8}.w2{fill:none;stroke:#3b82f6;stroke-width:1.8;opacity:.45}</style>
  ${row(44, 'oo', 1, 2, L('open–open', 'terbuka–terbuka'), 'n = 1, λ = 2L', 'n = 2, λ = L')}
  ${row(118, 'oc', 1, 3, L('open–closed', 'terbuka–tertutup'), 'n = 1, λ = 4L', 'n = 3, λ = 4L/3')}
  ${row(192, 's', 1, 2, L('string', 'dawai'), 'n = 1, λ = 2L', 'n = 2, λ = L')}
  <text x="4" y="236" class="s">${L('f = v/λ;  air v = 343 m/s;  string v = √(T/μ)', 'f = v/λ;  udara v = 343 m/s;  dawai v = √(T/μ)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Adjacent nodes (or adjacent antinodes) are λ/2 apart; a node and the nearest antinode are λ/4 apart.',
        'Fixed string ends and closed pipe ends are displacement nodes; open pipe ends are displacement antinodes (and pressure nodes).',
        'Open–open pipe and fixed string: λₙ = 2L/n, fₙ = n·v/(2L), n = 1, 2, 3, … — all harmonics present.',
        'Open–closed pipe: λₙ = 4L/n, fₙ = n·v/(4L), n = 1, 3, 5, … — only odd harmonics, fundamental one octave lower.',
        'On a string v = √(T/μ): quadrupling the tension doubles every harmonic frequency; a heavier string (larger μ) plays lower.',
        'A tuning fork of frequency f makes an air column resonate at lengths λ/4, 3λ/4, 5λ/4, …, so ΔL between resonances equals λ/2 and v = fλ.',
      ],
      id: [
        'Simpul yang berdekatan (atau perut yang berdekatan) berjarak λ/2; simpul dan perut terdekat berjarak λ/4.',
        'Ujung dawai yang terikat dan ujung pipa yang tertutup adalah simpul simpangan; ujung pipa yang terbuka adalah perut simpangan (dan simpul tekanan).',
        'Pipa terbuka–terbuka dan dawai terikat: λₙ = 2L/n, fₙ = n·v/(2L), n = 1, 2, 3, … — semua harmonik ada.',
        'Pipa terbuka–tertutup: λₙ = 4L/n, fₙ = n·v/(4L), n = 1, 3, 5, … — hanya harmonik ganjil, nada dasar satu oktaf lebih rendah.',
        'Pada dawai v = √(T/μ): melipatempatkan tegangan menggandakan setiap frekuensi harmonik; dawai yang lebih berat (μ lebih besar) berbunyi lebih rendah.',
        'Garpu tala berfrekuensi f membuat kolom udara beresonansi pada panjang λ/4, 3λ/4, 5λ/4, …, sehingga ΔL antar resonansi sama dengan λ/2 dan v = fλ.',
      ],
    },
    vocabulary: {
      en: [
        ['Standing wave', 'The interference pattern of a wave and its reflection in which fixed points (nodes) never move and points between them (antinodes) oscillate with maximum amplitude.'],
        ['Node / antinode', 'A node is a point of zero displacement; an antinode is a point of maximum displacement. For sound, a displacement node is a pressure antinode.'],
        ['Harmonic', 'One of the natural frequencies of a system, labelled by n. The lowest (n = 1) is the fundamental; higher ones are overtones.'],
        ['Linear density μ', 'Mass per unit length of a string, in kg/m. Together with tension T it fixes the wave speed v = √(T/μ).'],
        ['Resonance', 'The large response of a system driven at one of its natural frequencies, for example an air column that sings when a tuning fork matches its fundamental.'],
        ['End correction', 'The small extra length (≈ 0.6 × radius) by which a real open pipe behaves longer than its physical length, because the antinode sits slightly outside the opening.'],
      ],
      id: [
        ['Gelombang stasioner', 'Pola interferensi gelombang dan pantulannya dengan titik-titik tetap (simpul) yang tidak pernah bergerak dan titik-titik di antaranya (perut) yang bergetar dengan amplitudo maksimum.'],
        ['Simpul / perut', 'Simpul adalah titik dengan simpangan nol; perut adalah titik dengan simpangan maksimum. Untuk bunyi, simpul simpangan adalah perut tekanan.'],
        ['Harmonik', 'Salah satu frekuensi alami sistem, diberi label n. Yang terendah (n = 1) disebut nada dasar; yang lebih tinggi disebut nada atas.'],
        ['Massa jenis linear μ', 'Massa per satuan panjang dawai, dalam kg/m. Bersama tegangan T, besaran ini menentukan cepat rambat v = √(T/μ).'],
        ['Resonansi', 'Tanggapan besar suatu sistem ketika digetarkan pada salah satu frekuensi alaminya, misalnya kolom udara yang berbunyi nyaring ketika garpu tala cocok dengan nada dasarnya.'],
        ['Koreksi ujung', 'Tambahan panjang kecil (≈ 0,6 × jari-jari) yang membuat pipa terbuka sungguhan berperilaku lebih panjang daripada panjang fisiknya, karena perut berada sedikit di luar bukaan.'],
      ],
    },
    misconceptions: {
      en: [
        ['A standing wave is a wave that has stopped moving.', 'Energy is still oscillating at every antinode. The pattern is the sum of two travelling waves moving in opposite directions; only the node positions stand still.'],
        ['The open end of a pipe is where the sound is "trapped", so it must be a node.', 'At an open end the air is free to move and the pressure must equal the atmosphere outside. That makes it a displacement antinode and a pressure node.'],
        ['Doubling the tension of a guitar string doubles its pitch.', 'Frequency scales with √T, so doubling T raises f by only √2 ≈ 1.41 (about 6 semitones). You need four times the tension to double the frequency.'],
        ['A longer pipe always gives a higher harmonic number.', 'Length changes the wavelength and frequency of every harmonic, but n is set by how many half (or quarter) wavelengths fit, not by the length itself. At fixed L, n is chosen by how the pipe is driven.'],
      ],
      id: [
        ['Gelombang stasioner adalah gelombang yang sudah berhenti bergerak.', 'Energi masih bergetar di setiap perut. Polanya adalah jumlah dua gelombang berjalan yang arahnya berlawanan; hanya posisi simpulnya yang diam.'],
        ['Ujung terbuka pipa adalah tempat bunyi "terjebak", jadi pasti simpul.', 'Di ujung terbuka udara bebas bergerak dan tekanannya harus sama dengan tekanan atmosfer di luar. Itu menjadikannya perut simpangan dan simpul tekanan.'],
        ['Menggandakan tegangan senar gitar menggandakan nadanya.', 'Frekuensi berbanding lurus dengan √T, jadi menggandakan T hanya menaikkan f sebesar √2 ≈ 1,41 (sekitar 6 seminada). Dibutuhkan tegangan empat kali lipat untuk menggandakan frekuensi.'],
        ['Pipa yang lebih panjang selalu menghasilkan nomor harmonik yang lebih tinggi.', 'Panjang mengubah panjang gelombang dan frekuensi setiap harmonik, tetapi n ditentukan oleh berapa banyak setengah (atau seperempat) panjang gelombang yang muat, bukan oleh panjangnya sendiri. Pada L tetap, n ditentukan oleh cara pipa digetarkan.'],
      ],
    },
    realWorld: {
      en: [
        'A flute is open at both ends (λ₁ = 2L); a clarinet is closed at the reed (λ₁ = 4L), which is why a clarinet of similar length plays almost an octave lower and has a hollow, odd-harmonic tone.',
        'Guitarists tune by changing tension (v = √(T/μ)) and change notes by shortening L with their fingers; bass strings are wound with extra metal to increase μ.',
        'Organ pipes are cut to length to set their fundamental: a 16-foot (4.9 m) open pipe sounds about 35 Hz.',
        'Blowing across a bottle excites the open–closed resonance of the air inside; adding water shortens the air column and raises the note.',
        'The resonance-tube experiment is a standard way to measure the speed of sound in school labs with only a tuning fork, a tube and a ruler.',
      ],
      id: [
        'Seruling terbuka di kedua ujung (λ₁ = 2L); klarinet tertutup di bagian lidah getar (λ₁ = 4L), sehingga klarinet dengan panjang serupa berbunyi hampir satu oktaf lebih rendah dan bernada khas berharmonik ganjil.',
        'Pemain gitar menyetel nada dengan mengubah tegangan (v = √(T/μ)) dan mengganti nada dengan memperpendek L memakai jari; senar bass dililit logam tambahan untuk memperbesar μ.',
        'Pipa organ dipotong sesuai panjang untuk menentukan nada dasarnya: pipa terbuka 16 kaki (4,9 m) berbunyi sekitar 35 Hz.',
        'Meniup mulut botol membangkitkan resonansi terbuka–tertutup udara di dalamnya; menambah air memperpendek kolom udara dan menaikkan nadanya.',
        'Percobaan tabung resonansi adalah cara baku mengukur cepat rambat bunyi di laboratorium sekolah hanya dengan garpu tala, tabung, dan mistar.',
      ],
    },
    questions: {
      en: [
        { q: 'An open–open pipe is 0.50 m long. What are its first three harmonic frequencies in air (v = 343 m/s)?', a: 'fₙ = n·v/(2L) = n × 343/(2 × 0.50) = n × 343 Hz, so 343 Hz, 686 Hz and 1029 Hz.' },
        { q: 'The same 0.50 m pipe is now closed at one end. List its first three allowed frequencies.', a: 'fₙ = n·v/(4L) with n odd: f₁ = 343/2.0 = 171.5 Hz, f₃ = 514.5 Hz, f₅ = 857.5 Hz. There is no 343 Hz harmonic because n = 2 is forbidden.' },
        { q: 'In the resonance tube with a 512 Hz fork, the first two resonances occur at air-column lengths 0.168 m and 0.503 m. Find λ and the speed of sound.', a: 'ΔL = 0.503 − 0.168 = 0.335 m = λ/2, so λ = 0.670 m and v = fλ = 512 × 0.670 ≈ 343 m/s.' },
        { q: 'A string of linear density 2.0 g/m under 50 N tension is 1.00 m long. Find the fundamental frequency, then the tension needed to raise it to 220 Hz.', a: 'v = √(50/0.0020) = 158 m/s and f₁ = v/(2L) = 79 Hz. For 220 Hz, v must be 440 m/s, so T = μv² = 0.0020 × 440² = 387 N.' },
      ],
      id: [
        { q: 'Sebuah pipa terbuka–terbuka panjangnya 0,50 m. Berapakah tiga frekuensi harmonik pertamanya di udara (v = 343 m/s)?', a: 'fₙ = n·v/(2L) = n × 343/(2 × 0,50) = n × 343 Hz, yaitu 343 Hz, 686 Hz, dan 1029 Hz.' },
        { q: 'Pipa 0,50 m yang sama kini ditutup di satu ujung. Sebutkan tiga frekuensi pertama yang diizinkan.', a: 'fₙ = n·v/(4L) dengan n ganjil: f₁ = 343/2,0 = 171,5 Hz, f₃ = 514,5 Hz, f₅ = 857,5 Hz. Tidak ada harmonik 343 Hz karena n = 2 terlarang.' },
        { q: 'Pada tabung resonansi dengan garpu tala 512 Hz, dua resonansi pertama terjadi pada panjang kolom udara 0,168 m dan 0,503 m. Tentukan λ dan cepat rambat bunyi.', a: 'ΔL = 0,503 − 0,168 = 0,335 m = λ/2, jadi λ = 0,670 m dan v = fλ = 512 × 0,670 ≈ 343 m/s.' },
        { q: 'Dawai dengan massa jenis linear 2,0 g/m bertegangan 50 N dan panjangnya 1,00 m. Tentukan frekuensi dasarnya, lalu tegangan yang diperlukan agar menjadi 220 Hz.', a: 'v = √(50/0,0020) = 158 m/s dan f₁ = v/(2L) = 79 Hz. Untuk 220 Hz, v harus 440 m/s, sehingga T = μv² = 0,0020 × 440² = 387 N.' },
      ],
    },
  },
};
