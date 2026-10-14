// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Define congruent, incongruent, and neutral flanker displays.',
      'Measure the congruency effect in RT and error rate as a signature of response conflict.',
      'Explain why wider flanker spacing and a higher proportion of congruent trials change the effect.',
    ],
    id: [
      'Mendefinisikan tampilan flanker kongruen, inkongruen, dan netral.',
      'Mengukur efek kongruensi pada RT dan tingkat kesalahan sebagai tanda konflik respons.',
      'Menjelaskan mengapa jarak flanker lebih lebar dan proporsi percobaan kongruen lebih tinggi mengubah efek.',
    ],
  },
  tryThis: {
    en: [
      'Run 40 trials at tight spacing — compare RT and errors for congruent vs incongruent.',
      'Widen the spacing to the maximum and run again. Does the effect shrink?',
      'Set 80% congruent — incongruent trials become rare surprises; does the effect grow?',
    ],
    id: [
      'Jalankan 40 percobaan pada jarak rapat — bandingkan RT dan kesalahan kongruen vs inkongruen.',
      'Lebarkan jarak ke maksimum dan jalankan lagi. Apakah efeknya menyusut?',
      'Atur 80% kongruen — percobaan inkongruen menjadi kejutan langka; apakah efeknya membesar?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The flanker task asks a deceptively simple question: can you respond to one item while ignoring its neighbours? In 1974 Charles and Barbara Eriksen showed participants a target letter flanked by other letters and asked them to press one key for H or K and another for S or C. When the flankers called for the same response as the target (congruent), responses were fast; when they called for the opposite response (incongruent), responses were slower and more error-prone. Crucially, the interference shrank as the flankers were moved further from the target. The arrow version used here, in which you report the direction of the central arrow, became the standard form of the task.',
        'Two mechanisms are usually invoked. First, selective attention is not perfectly sharp: it behaves like a spotlight or zoom lens with a finite width, so items close to the target are processed too. Second, the flankers that get through partially activate their own response. On incongruent trials the wrong response and the right response are active at the same time, a state called response conflict, which has to be resolved before you can answer. Electrical recordings of the muscles and of the brain show this competing activation directly, and the slowing plus the extra errors on incongruent trials, the congruency effect, is the behavioural signature of that conflict. Neutral flankers that are not associated with any response (here, plain bars) give a baseline in between.',
        'In the simulation, each trial shows a fixation cross for 500 ms, then five items; you respond with F or the left arrow for a left-pointing centre and J or the right arrow for right, within 2 s. One trial in five is neutral; the rest are congruent or incongruent in the proportion set by the slider. The bar charts give the mean RT on correct trials and the error rate for each condition, and the headline number is the congruency effect, incongruent minus congruent RT. The spacing slider moves the flankers outward. The simulated participant option responds automatically with a built-in model: a base RT of 380 ms, an incongruent cost of 90 ms × e^(−(spacing − 20)/50), a 10 ms neutral cost, and an incongruent error rate that also decays with spacing, so you can see what a textbook data set looks like before collecting your own.',
        'Real behaviour is richer than the model. Human congruency effects also depend on expectation: when most trials are congruent, people relax control and the rare incongruent trials hurt more, whereas a block of mostly incongruent trials sharpens attention and shrinks the effect (Gratton, Coles and Donchin, 1992); the effect is also smaller right after an incongruent trial. The simulated participant does not implement any of this, so with auto-respond the proportion-congruent slider changes only how often each condition occurs, not the size of the effect; you need a human at the keyboard to see it. Spacing is in pixels rather than degrees of visual angle, browser timing adds jitter of 10–20 ms, and a few dozen trials give noisy means, so run many trials before trusting a difference.',
      ],
      id: [
        'Tugas flanker mengajukan pertanyaan yang tampak sederhana: dapatkah kamu merespons satu item sambil mengabaikan tetangganya? Pada 1974 Charles dan Barbara Eriksen menampilkan huruf target yang diapit huruf lain dan meminta peserta menekan satu tombol untuk H atau K dan tombol lain untuk S atau C. Ketika flanker menuntut respons yang sama dengan target (kongruen), respons cepat; ketika flanker menuntut respons berlawanan (inkongruen), respons lebih lambat dan lebih sering salah. Yang penting, gangguan itu menyusut ketika flanker dijauhkan dari target. Versi panah yang dipakai di sini, ketika kamu melaporkan arah panah tengah, menjadi bentuk standar tugas ini.',
        'Dua mekanisme biasanya dikemukakan. Pertama, perhatian selektif tidak sepenuhnya tajam: ia berperilaku seperti lampu sorot atau lensa zoom dengan lebar terbatas, sehingga item yang dekat dengan target ikut diproses. Kedua, flanker yang lolos sebagian mengaktifkan responsnya sendiri. Pada percobaan inkongruen, respons yang salah dan yang benar aktif bersamaan, keadaan yang disebut konflik respons, yang harus diselesaikan sebelum kamu bisa menjawab. Rekaman listrik otot dan otak menunjukkan aktivasi yang bersaing ini secara langsung, dan perlambatan plus kesalahan tambahan pada percobaan inkongruen, yaitu efek kongruensi, adalah tanda perilaku dari konflik itu. Flanker netral yang tidak terkait dengan respons apa pun (di sini, garis datar) memberi garis dasar di antaranya.',
        'Dalam simulasi, tiap percobaan menampilkan tanda silang fiksasi selama 500 ms, lalu lima item; kamu merespons dengan F atau panah kiri untuk panah tengah yang menunjuk kiri dan J atau panah kanan untuk kanan, dalam 2 s. Satu dari lima percobaan bersifat netral; sisanya kongruen atau inkongruen dengan proporsi yang diatur slider. Diagram batang menampilkan rata-rata RT pada percobaan benar dan tingkat kesalahan tiap kondisi, dan angka utamanya adalah efek kongruensi, RT inkongruen dikurangi kongruen. Slider jarak menggeser flanker ke luar. Opsi peserta simulasi merespons otomatis dengan model bawaan: RT dasar 380 ms, biaya inkongruen 90 ms × e^(−(jarak − 20)/50), biaya netral 10 ms, dan tingkat kesalahan inkongruen yang juga meluruh dengan jarak, sehingga kamu dapat melihat seperti apa data buku teks sebelum mengumpulkan datamu sendiri.',
        'Perilaku nyata lebih kaya daripada model. Efek kongruensi manusia juga bergantung pada ekspektasi: ketika sebagian besar percobaan kongruen, orang melonggarkan kendali dan percobaan inkongruen yang langka lebih mengganggu, sedangkan blok yang sebagian besar inkongruen menajamkan perhatian dan menyusutkan efek (Gratton, Coles, dan Donchin, 1992); efeknya juga lebih kecil tepat setelah percobaan inkongruen. Peserta simulasi tidak menerapkan satu pun dari ini, sehingga dengan respons otomatis slider proporsi kongruen hanya mengubah seberapa sering tiap kondisi muncul, bukan besar efeknya; kamu perlu manusia di keyboard untuk melihatnya. Jarak dinyatakan dalam piksel, bukan derajat sudut pandang, pewaktuan browser menambah goyangan 10–20 ms, dan beberapa puluh percobaan memberi rata-rata yang berderau, jadi jalankan banyak percobaan sebelum memercayai suatu selisih.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the three flanker displays; the task is always to report the central (highlighted) arrow. The dashed ellipse is the attentional spotlight: flankers inside it are processed and activate their response. Right: typical mean RTs, with the congruency effect as the gap between incongruent and congruent.',
        id: 'Kiri: tiga tampilan flanker; tugasnya selalu melaporkan panah tengah (yang disorot). Elips putus-putus adalah lampu sorot perhatian: flanker di dalamnya ikut diproses dan mengaktifkan responsnya. Kanan: rata-rata RT yang khas, dengan efek kongruensi sebagai selisih antara inkongruen dan kongruen.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const arrow = (x, y, right, col) => {
          const s = right ? 1 : -1;
          return `<path d="M${x - 9 * s} ${y} L${x + 9 * s} ${y} M${x + 3 * s} ${y - 6} L${x + 9 * s} ${y} L${x + 3 * s} ${y + 6}" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
        };
        const bar = (x, y, col) => `<path d="M${x - 9} ${y} L${x + 9} ${y}" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`;
        const rowOf = (y, kind) => [-2, -1, 0, 1, 2].map((i) => {
          const x = 100 + i * 26;
          if (i === 0) return arrow(x, y, true, '#f59e0b');
          if (kind === 'neutral') return bar(x, y, 'currentColor');
          return arrow(x, y, kind === 'congruent', 'currentColor');
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Flanker displays and the congruency effect', 'Tampilan flanker dan efek kongruensi')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.b{font-weight:700;font-size:11px}.s{font-size:9px;opacity:.85}.ax{stroke:currentColor;stroke-width:1;opacity:.6}</style>
  <text x="100" y="18" text-anchor="middle" class="b">${L('Report the centre arrow', 'Laporkan panah tengah')}</text>
  <text x="100" y="38" text-anchor="middle" fill="#10b981" class="s">${L('congruent', 'kongruen')}</text>
  ${rowOf(54, 'congruent')}
  <text x="100" y="86" text-anchor="middle" fill="#3b82f6" class="s">${L('neutral', 'netral')}</text>
  ${rowOf(102, 'neutral')}
  <text x="100" y="134" text-anchor="middle" fill="#ef4444" class="s">${L('incongruent', 'inkongruen')}</text>
  ${rowOf(150, 'incongruent')}
  <ellipse cx="100" cy="150" rx="46" ry="16" fill="none" stroke="#8b5cf6" stroke-width="1.2" stroke-dasharray="4 3"/>
  <text x="100" y="180" text-anchor="middle" fill="#8b5cf6" class="s">${L('attentional spotlight', 'lampu sorot perhatian')}</text>
  <text x="100" y="192" text-anchor="middle" fill="#8b5cf6" class="s">${L('near flankers get in; far ones do not', 'flanker dekat ikut masuk; yang jauh tidak')}</text>
  <text x="100" y="222" text-anchor="middle" class="s">${L('wider spacing pushes flankers outside the spotlight', 'jarak lebih lebar mendorong flanker keluar dari sorot')}</text>
  <text x="285" y="18" text-anchor="middle" class="b">${L('Mean RT', 'Rata-rata RT')}</text>
  <line x1="222" y1="40" x2="222" y2="180" class="ax"/>
  <line x1="222" y1="180" x2="350" y2="180" class="ax"/>
  <rect x="236" y="104" width="26" height="76" fill="#10b981" opacity=".8"/>
  <rect x="272" y="98" width="26" height="82" fill="#3b82f6" opacity=".8"/>
  <rect x="308" y="50" width="26" height="130" fill="#ef4444" opacity=".8"/>
  <text x="249" y="98" text-anchor="middle" class="s">380</text>
  <text x="285" y="92" text-anchor="middle" class="s">390</text>
  <text x="321" y="44" text-anchor="middle" class="s">470 ms</text>
  <text x="249" y="192" text-anchor="middle" class="s">${L('cong', 'kong')}</text>
  <text x="285" y="192" text-anchor="middle" class="s">${L('neut', 'net')}</text>
  <text x="321" y="192" text-anchor="middle" class="s">${L('incong', 'inkong')}</text>
  <line x1="262" y1="104" x2="308" y2="104" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
  <line x1="340" y1="50" x2="340" y2="104" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="344" y="80" fill="#f59e0b" class="s" transform="rotate(90 344 80)">${L('effect', 'efek')} ≈ 90 ms</text>
  <text x="285" y="212" text-anchor="middle" class="s">${L('incongruent trials are slower', 'percobaan inkongruen lebih lambat')}</text>
  <text x="285" y="224" text-anchor="middle" class="s">${L('and produce more errors', 'dan lebih banyak kesalahan')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Congruent flankers call for the same response as the target, incongruent flankers for the opposite one, neutral flankers for none.',
        'The congruency effect, slower and less accurate responses on incongruent trials, is the behavioural signature of response conflict.',
        'Attention has a finite spatial width, so flankers close to the target are processed and far ones are largely filtered out.',
        'In people the effect also depends on expectation: a mostly congruent block relaxes control and enlarges the effect.',
        'Mean RT on correct trials and error rate must be read together, because speeding up at the cost of errors is not better control.',
      ],
      id: [
        'Flanker kongruen menuntut respons yang sama dengan target, flanker inkongruen menuntut respons berlawanan, flanker netral tidak menuntut respons apa pun.',
        'Efek kongruensi, respons yang lebih lambat dan kurang akurat pada percobaan inkongruen, adalah tanda perilaku dari konflik respons.',
        'Perhatian punya lebar ruang yang terbatas, sehingga flanker yang dekat dengan target ikut diproses dan yang jauh sebagian besar tersaring.',
        'Pada manusia, efeknya juga bergantung pada ekspektasi: blok yang sebagian besar kongruen melonggarkan kendali dan memperbesar efek.',
        'Rata-rata RT pada percobaan benar dan tingkat kesalahan harus dibaca bersama, karena mempercepat dengan mengorbankan kesalahan bukanlah kendali yang lebih baik.',
      ],
    },
    vocabulary: {
      en: [
        ['Target', 'The item you must respond to; here, the central arrow.'],
        ['Flankers', 'The items beside the target that must be ignored.'],
        ['Congruent / incongruent', 'Flankers that point the same way as the target, or the opposite way.'],
        ['Neutral trial', 'A trial whose flankers (plain bars) are not linked to either response, used as a baseline.'],
        ['Congruency effect', 'Incongruent minus congruent mean RT (or error rate); the standard measure of interference.'],
        ['Response conflict', 'Simultaneous activation of two incompatible responses that must be resolved before acting.'],
        ['Selective attention', 'Prioritising some stimuli over others; in the flanker task its spatial focus has a limited width.'],
        ['Cognitive control', 'The processes that keep behaviour aligned with the current goal in the face of distraction or conflict.'],
      ],
      id: [
        ['Target', 'Item yang harus kamu respons; di sini, panah tengah.'],
        ['Flanker', 'Item di sebelah target yang harus diabaikan.'],
        ['Kongruen / inkongruen', 'Flanker yang menunjuk ke arah yang sama dengan target, atau ke arah berlawanan.'],
        ['Percobaan netral', 'Percobaan dengan flanker (garis datar) yang tidak terkait dengan salah satu respons, dipakai sebagai garis dasar.'],
        ['Efek kongruensi', 'Rata-rata RT inkongruen dikurangi kongruen (atau tingkat kesalahannya); ukuran standar gangguan.'],
        ['Konflik respons', 'Aktivasi serentak dua respons yang tidak sejalan yang harus diselesaikan sebelum bertindak.'],
        ['Perhatian selektif', 'Memprioritaskan sebagian stimulus di atas yang lain; dalam tugas flanker, fokus ruangnya punya lebar terbatas.'],
        ['Kendali kognitif', 'Proses yang menjaga perilaku selaras dengan tujuan saat ini meskipun ada gangguan atau konflik.'],
      ],
    },
    misconceptions: {
      en: [
        ['If you know to ignore the flankers, they cannot affect you.', 'Knowing the rule does not switch off early processing. Items within the attentional focus are identified and start activating their response automatically; control acts afterwards, by resolving the conflict, which costs time.'],
        ['A congruency effect of 80 ms means it takes 80 ms longer to see the arrow.', 'The arrow is seen just as quickly. The extra time is spent after perception, suppressing the competing response that the flankers have activated, and part of the cost shows up as errors rather than time.'],
        ['Faster responses mean better attention.', 'A person who answers quickly but makes many incongruent errors is showing more interference, not less. RT and error rate must be judged together, which is why the sim reports both.'],
        ['Incongruent trials are hard because there is more to look at.', 'Congruent and neutral displays contain exactly the same number of items. The difficulty comes specifically from flankers that are linked to the wrong response, not from visual clutter.'],
      ],
      id: [
        ['Jika kamu tahu harus mengabaikan flanker, flanker tidak bisa memengaruhimu.', 'Mengetahui aturan tidak mematikan pemrosesan awal. Item di dalam fokus perhatian dikenali dan mulai mengaktifkan responsnya secara otomatis; kendali bekerja setelahnya, dengan menyelesaikan konflik, dan itu memakan waktu.'],
        ['Efek kongruensi 80 ms berarti butuh 80 ms lebih lama untuk melihat panah.', 'Panahnya terlihat sama cepatnya. Waktu tambahan dihabiskan setelah persepsi, untuk menekan respons pesaing yang diaktifkan flanker, dan sebagian biayanya muncul sebagai kesalahan, bukan waktu.'],
        ['Respons yang lebih cepat berarti perhatian yang lebih baik.', 'Orang yang menjawab cepat tetapi banyak salah pada percobaan inkongruen justru menunjukkan gangguan lebih besar, bukan lebih kecil. RT dan tingkat kesalahan harus dinilai bersama, itulah sebabnya simulasi melaporkan keduanya.'],
        ['Percobaan inkongruen sulit karena ada lebih banyak yang harus dilihat.', 'Tampilan kongruen dan netral berisi jumlah item yang persis sama. Kesulitannya datang khusus dari flanker yang terkait dengan respons yang salah, bukan dari keramaian visual.'],
      ],
    },
    realWorld: {
      en: [
        'The flanker task is part of the NIH Toolbox and the Attention Network Test, used to measure executive attention in children, older adults and clinical groups.',
        'A pilot reading one gauge among many, or a driver reading one road sign in a cluster, faces real flanker interference; cockpit and signage design spaces critical items apart for exactly this reason.',
        'Larger-than-normal congruency effects are reported in ADHD and after sleep deprivation, making the task a sensitive probe of cognitive control.',
        'Studies of bilingual speakers and of action-video-game players often use flanker effects to ask whether everyday experience trains the ability to resist interference.',
      ],
      id: [
        'Tugas flanker termasuk dalam NIH Toolbox dan Attention Network Test, yang dipakai mengukur perhatian eksekutif pada anak-anak, orang lanjut usia, dan kelompok klinis.',
        'Pilot yang membaca satu alat ukur di antara banyak alat, atau pengemudi yang membaca satu rambu dalam kerumunan rambu, menghadapi gangguan flanker yang nyata; desain kokpit dan rambu memberi jarak pada item penting justru karena alasan ini.',
        'Efek kongruensi yang lebih besar dari normal dilaporkan pada ADHD dan setelah kurang tidur, menjadikan tugas ini pemeriksa kendali kognitif yang peka.',
        'Penelitian pada penutur dua bahasa dan pemain gim aksi sering memakai efek flanker untuk menanyakan apakah pengalaman sehari-hari melatih kemampuan menahan gangguan.',
      ],
    },
    questions: {
      en: [
        { q: 'After 60 trials you find mean RTs of 412 ms (congruent), 425 ms (neutral) and 488 ms (incongruent), with 2%, 3% and 14% errors. What is the congruency effect, and why does the neutral condition sit where it does?', a: 'The effect is 488 − 412 = 76 ms, with errors rising sevenfold. Neutral bars carry no response, so they add only a little perceptual load and no conflict; the small gap between congruent and neutral shows that congruent flankers actually help a bit.' },
        { q: 'With the simulated participant, predict the incongruent cost at spacings of 20, 70 and 120 px using cost = 90 × e^(−(spacing − 20)/50).', a: 'At 20 px the exponent is 0, so cost = 90 ms. At 70 px: 90 × e^(−1) ≈ 33 ms. At 120 px: 90 × e^(−2) ≈ 12 ms. Interference decays roughly by a factor of e for every 50 px, as the flankers leave the attentional spotlight.' },
        { q: 'A student sets 80% congruent, switches on the simulated participant and finds that the congruency effect does not change. Is this what real people do, and why does the sim behave this way?', a: 'No. Real participants show a larger effect when congruent trials are frequent, because they relax control and rare incongruent trials catch them off guard. The simulated participant\'s RT depends only on condition and spacing, so the proportion slider changes trial frequencies but not the modelled cost.' },
      ],
      id: [
        { q: 'Setelah 60 percobaan kamu mendapat rata-rata RT 412 ms (kongruen), 425 ms (netral), dan 488 ms (inkongruen), dengan kesalahan 2%, 3%, dan 14%. Berapa efek kongruensinya, dan mengapa kondisi netral berada di posisi itu?', a: 'Efeknya 488 − 412 = 76 ms, dengan kesalahan naik tujuh kali lipat. Garis netral tidak membawa respons, sehingga hanya menambah sedikit beban persepsi dan tanpa konflik; selisih kecil antara kongruen dan netral menunjukkan flanker kongruen justru sedikit membantu.' },
        { q: 'Dengan peserta simulasi, prediksi biaya inkongruen pada jarak 20, 70, dan 120 px menggunakan biaya = 90 × e^(−(jarak − 20)/50).', a: 'Pada 20 px eksponennya 0, sehingga biaya = 90 ms. Pada 70 px: 90 × e^(−1) ≈ 33 ms. Pada 120 px: 90 × e^(−2) ≈ 12 ms. Gangguan meluruh kira-kira dengan faktor e setiap 50 px, saat flanker meninggalkan lampu sorot perhatian.' },
        { q: 'Seorang siswa mengatur 80% kongruen, menyalakan peserta simulasi, dan mendapati efek kongruensi tidak berubah. Apakah ini yang dilakukan orang sungguhan, dan mengapa simulasi berperilaku begini?', a: 'Tidak. Peserta nyata menunjukkan efek yang lebih besar ketika percobaan kongruen sering muncul, karena mereka melonggarkan kendali dan percobaan inkongruen yang langka membuat mereka lengah. RT peserta simulasi hanya bergantung pada kondisi dan jarak, sehingga slider proporsi mengubah frekuensi percobaan tetapi tidak mengubah biaya yang dimodelkan.' },
      ],
    },
  },
};
