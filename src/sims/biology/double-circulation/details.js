// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Trace the path of blood through the four chambers of the heart, the pulmonary loop and the systemic loop, and explain why it passes through the heart twice per circuit.',
      'Describe the job of the heart valves and relate the squeeze (systole) and relax (diastole) of the ventricles to the pulse of blood pressure.',
      'Estimate cardiac output from heart rate and stroke volume, and explain how a narrowed artery or a blocked coronary artery disturbs the system.',
    ],
    id: [
      'Menelusuri jalur darah melalui empat ruang jantung, peredaran kecil (paru-paru), dan peredaran besar (tubuh), serta menjelaskan mengapa darah melewati jantung dua kali dalam satu putaran.',
      'Menjelaskan tugas katup jantung dan menghubungkan fase memompa (sistol) dan mengendur (diastol) bilik jantung dengan denyut tekanan darah.',
      'Memperkirakan curah jantung dari denyut jantung dan volume sekuncup, serta menjelaskan bagaimana pembuluh nadi yang menyempit atau arteri koroner yang tersumbat mengganggu sistem.',
    ],
  },
  tryThis: {
    en: [
      'Follow one blue particle from the right atrium. Where does it turn red? Where does it turn blue again?',
      'Set the heart rate to 60, then 120, then 180 bpm. Record stroke volume and cardiac output each time. Does output keep doubling?',
      'Switch on "Narrowed artery". Which pressure number rises more, systolic or diastolic? Where on the diagram is the narrowing?',
      'Switch on "Blocked coronary artery". The heart rate is unchanged, so why does cardiac output fall?',
    ],
    id: [
      'Ikuti satu partikel biru dari serambi kanan. Di mana ia berubah merah? Di mana ia menjadi biru lagi?',
      'Atur denyut jantung ke 60, lalu 120, lalu 180 per menit. Catat volume sekuncup dan curah jantung setiap kali. Apakah curah jantung terus berlipat dua?',
      'Nyalakan "Pembuluh nadi menyempit". Angka tekanan mana yang naik lebih banyak, sistol atau diastol? Di bagian mana diagram penyempitannya?',
      'Nyalakan "Arteri koroner tersumbat". Denyut jantung tidak berubah, jadi mengapa curah jantung turun?',
    ],
  },

  learn: {
    background: {
      en: [
        'Humans have a double circulation: on each full round trip, blood passes through the heart twice. Oxygen-poor blood (drawn blue) returns from the body through the vena cava into the right atrium, drops into the right ventricle, and is pumped through the pulmonary artery to the lungs. This short pulmonary loop is where the blood picks up oxygen and turns bright red. The pulmonary veins bring it back to the left atrium, it fills the left ventricle, and the thick muscular wall of the left ventricle drives it out through the aorta on the long systemic loop around the body, where cells take the oxygen and the blood turns blue again.',
        'Keeping the two loops separate matters. The lungs are delicate and need low pressure; the body needs high pressure to push blood up to the brain and down to the toes. The left ventricle therefore has a far thicker wall than the right. Four valves make sure blood only moves forward: the two atrioventricular valves (tricuspid on the right, mitral on the left) open while the ventricles fill and snap shut when they squeeze, and the two semilunar valves (pulmonary and aortic) open during the squeeze and shut as the ventricles relax. The "lub-dub" of a heartbeat is these valves closing.',
        'The squeeze is called systole and the relaxation diastole. Blood pressure is written as two numbers, systolic over diastolic, for example 120/80 mmHg: the peak pressure in the arteries during the squeeze and the lowest pressure between beats. The amount pumped per beat is the stroke volume (about 70 mL at rest), and cardiac output = heart rate × stroke volume, about 5 litres per minute at rest. During exercise the heart rate rises and output can triple, although at very fast rates the ventricles have less time to fill and stroke volume starts to drop, which the sim models above 120 bpm.',
        'Two common problems are shown. A narrowed, stiffened artery (as in atherosclerosis or chronic hypertension) raises the resistance the heart pumps against, so pressure rises: the sim gives about 160/99 mmHg instead of 127/80. A blocked coronary artery is a heart attack: the coronary arteries are the small vessels on the surface of the heart that feed the heart muscle itself. Behind a blockage the muscle is starved of oxygen, stops contracting properly, and stroke volume and cardiac output fall even though the heart rate is unchanged.',
      ],
      id: [
        'Manusia memiliki peredaran darah ganda: dalam setiap putaran penuh, darah melewati jantung dua kali. Darah miskin oksigen (digambar biru) kembali dari tubuh melalui vena kava ke serambi kanan, turun ke bilik kanan, dan dipompa melalui arteri pulmonalis ke paru-paru. Lintasan pendek ini, peredaran kecil, adalah tempat darah mengambil oksigen dan berubah merah terang. Vena pulmonalis membawanya kembali ke serambi kiri, darah mengisi bilik kiri, dan dinding otot bilik kiri yang tebal mendorongnya keluar lewat aorta menempuh peredaran besar ke seluruh tubuh, tempat sel-sel mengambil oksigen sehingga darah menjadi biru lagi.',
        'Memisahkan kedua lintasan itu penting. Paru-paru halus dan membutuhkan tekanan rendah; tubuh membutuhkan tekanan tinggi untuk mendorong darah naik ke otak dan turun ke jari kaki. Karena itu dinding bilik kiri jauh lebih tebal daripada bilik kanan. Empat katup memastikan darah hanya bergerak maju: dua katup atrioventrikular (trikuspid di kanan, bikuspid atau mitral di kiri) terbuka saat bilik terisi dan menutup rapat saat bilik memompa, dan dua katup semilunar (pulmonal dan aorta) terbuka saat pemompaan dan menutup saat bilik mengendur. Bunyi "lub-dub" detak jantung adalah bunyi katup-katup ini menutup.',
        'Fase memompa disebut sistol dan fase mengendur disebut diastol. Tekanan darah ditulis sebagai dua angka, sistol per diastol, misalnya 120/80 mmHg: tekanan puncak di pembuluh nadi saat memompa dan tekanan terendah di antara dua denyut. Volume yang dipompa setiap denyut disebut volume sekuncup (sekitar 70 mL saat istirahat), dan curah jantung = denyut jantung × volume sekuncup, sekitar 5 liter per menit saat istirahat. Saat berolahraga denyut jantung naik dan curah jantung bisa tiga kali lipat, walaupun pada denyut yang sangat cepat bilik punya lebih sedikit waktu untuk terisi sehingga volume sekuncup mulai turun, yang dimodelkan simulasi di atas 120 denyut per menit.',
        'Dua gangguan umum ditampilkan. Pembuluh nadi yang menyempit dan kaku (seperti pada aterosklerosis atau hipertensi kronis) menaikkan hambatan yang harus dilawan jantung, sehingga tekanan naik: simulasi memberi sekitar 160/99 mmHg alih-alih 127/80. Arteri koroner yang tersumbat adalah serangan jantung: arteri koroner adalah pembuluh kecil di permukaan jantung yang memberi makan otot jantung itu sendiri. Di belakang sumbatan, otot kekurangan oksigen, berhenti berkontraksi dengan baik, dan volume sekuncup serta curah jantung turun walaupun denyut jantung tidak berubah.',
      ],
    },
    figure: {
      caption: {
        en: 'The double circulation. Blue vessels carry oxygen-poor blood, red vessels oxygen-rich blood. Right atrium (RA) and right ventricle (RV) drive the short pulmonary loop; left atrium (LA) and left ventricle (LV) drive the long systemic loop.',
        id: 'Peredaran darah ganda. Pembuluh biru membawa darah miskin oksigen, pembuluh merah membawa darah kaya oksigen. Serambi kanan (RA) dan bilik kanan (RV) menggerakkan peredaran kecil; serambi kiri (LA) dan bilik kiri (LV) menggerakkan peredaran besar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Diagram of the double circulation through heart, lungs and body', 'Diagram peredaran darah ganda melalui jantung, paru-paru, dan tubuh')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{fill:none;stroke:currentColor;stroke-width:1.3}.v{fill:none;stroke-width:7;stroke-linecap:round}.s{font-size:9.5px}</style>
  <defs><marker id="ar" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#ef4444"/></marker><marker id="ab" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#3b82f6"/></marker></defs>
  <rect x="120" y="14" width="120" height="34" rx="12" fill="#fecaca" opacity=".5"/><text x="180" y="35" text-anchor="middle" style="fill:#7f1d1d;font-weight:bold">${L('LUNGS', 'PARU-PARU')}</text>
  <rect x="110" y="192" width="140" height="34" rx="12" fill="#bfdbfe" opacity=".5"/><text x="180" y="213" text-anchor="middle" style="fill:#1e3a8a;font-weight:bold">${L('BODY', 'TUBUH')}</text>
  <path d="M150 104 L105 104 L105 31 L130 31" class="v" stroke="#3b82f6" marker-end="url(#ab)"/>
  <path d="M230 31 L255 31 L255 104 L212 104" class="v" stroke="#ef4444" marker-end="url(#ar)"/>
  <path d="M212 140 L285 140 L285 209 L252 209" class="v" stroke="#ef4444" marker-end="url(#ar)"/>
  <path d="M108 209 L75 209 L75 140 L150 140" class="v" stroke="#3b82f6" marker-end="url(#ab)"/>
  <rect x="150" y="90" width="30" height="28" rx="4" fill="#60a5fa"/><text x="165" y="109" text-anchor="middle" style="fill:#fff;font-weight:bold">RA</text>
  <rect x="150" y="126" width="30" height="28" rx="4" fill="#3b82f6"/><text x="165" y="145" text-anchor="middle" style="fill:#fff;font-weight:bold">RV</text>
  <rect x="182" y="90" width="30" height="28" rx="4" fill="#f87171"/><text x="197" y="109" text-anchor="middle" style="fill:#fff;font-weight:bold">LA</text>
  <rect x="182" y="126" width="30" height="28" rx="4" fill="#dc2626"/><text x="197" y="145" text-anchor="middle" style="fill:#fff;font-weight:bold">LV</text>
  <rect x="148" y="88" width="66" height="68" rx="8" class="c"/>
  <text x="40" y="70" class="s" fill="#3b82f6">${L('pulmonary artery', 'arteri pulmonalis')}</text>
  <text x="262" y="70" class="s" fill="#ef4444">${L('pulmonary vein', 'vena pulmonalis')}</text>
  <text x="292" y="175" class="s" fill="#ef4444">aorta</text>
  <text x="18" y="175" class="s" fill="#3b82f6">vena cava</text>
  <text x="180" y="78" text-anchor="middle" class="s">${L('pulmonary loop (short)', 'peredaran kecil (pendek)')}</text>
  <text x="180" y="180" text-anchor="middle" class="s">${L('systemic loop (long)', 'peredaran besar (panjang)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Blood passes through the heart twice per circuit: right side to the lungs (pulmonary loop), left side to the body (systemic loop).',
        'Blood gains oxygen in the lungs and loses it in the body; the colour change in the sim marks where this happens.',
        'The left ventricle has the thickest wall because it must pump blood at high pressure around the whole body.',
        'Valves open and close in time with the beat so blood only flows forward; the heart sounds are the valves closing.',
        'Cardiac output = heart rate × stroke volume (about 72 × 70 mL ≈ 5 L/min at rest).',
        'A narrowed artery raises blood pressure; a blocked coronary artery starves heart muscle of oxygen and lowers the heart\'s output.',
      ],
      id: [
        'Darah melewati jantung dua kali per putaran: sisi kanan ke paru-paru (peredaran kecil), sisi kiri ke tubuh (peredaran besar).',
        'Darah mendapat oksigen di paru-paru dan melepaskannya di tubuh; perubahan warna dalam simulasi menandai tempat terjadinya.',
        'Bilik kiri memiliki dinding paling tebal karena harus memompa darah bertekanan tinggi ke seluruh tubuh.',
        'Katup membuka dan menutup seirama denyut sehingga darah hanya mengalir maju; bunyi jantung adalah bunyi katup menutup.',
        'Curah jantung = denyut jantung × volume sekuncup (sekitar 72 × 70 mL ≈ 5 L/menit saat istirahat).',
        'Pembuluh nadi yang menyempit menaikkan tekanan darah; arteri koroner yang tersumbat membuat otot jantung kekurangan oksigen dan menurunkan keluaran jantung.',
      ],
    },
    vocabulary: {
      en: [
        ['Atrium', 'An upper chamber of the heart that receives blood from veins and passes it to a ventricle.'],
        ['Ventricle', 'A lower chamber of the heart with a muscular wall that pumps blood out into an artery.'],
        ['Artery / vein', 'Arteries carry blood away from the heart; veins carry it back. The pulmonary artery is the only artery carrying oxygen-poor blood.'],
        ['Valve', 'A flap that lets blood flow one way only: tricuspid and mitral between atria and ventricles, pulmonary and aortic at the exits.'],
        ['Systole / diastole', 'The contraction and relaxation phases of the heartbeat; systolic and diastolic blood pressure are the highest and lowest arterial pressures.'],
        ['Stroke volume', 'The volume of blood pumped by one ventricle in one beat, about 70 mL at rest.'],
        ['Cardiac output', 'Volume pumped per minute = heart rate × stroke volume, about 5 L/min at rest.'],
        ['Coronary artery', 'A small artery on the surface of the heart that supplies the heart muscle with oxygen.'],
      ],
      id: [
        ['Serambi (atrium)', 'Ruang atas jantung yang menerima darah dari vena dan meneruskannya ke bilik.'],
        ['Bilik (ventrikel)', 'Ruang bawah jantung berdinding otot yang memompa darah keluar ke pembuluh nadi.'],
        ['Arteri / vena', 'Arteri membawa darah menjauhi jantung; vena membawanya kembali. Arteri pulmonalis adalah satu-satunya arteri yang membawa darah miskin oksigen.'],
        ['Katup', 'Lipatan yang hanya mengizinkan darah mengalir satu arah: trikuspid dan bikuspid di antara serambi dan bilik, pulmonal dan aorta di pintu keluar.'],
        ['Sistol / diastol', 'Fase kontraksi dan relaksasi denyut jantung; tekanan sistol dan diastol adalah tekanan arteri tertinggi dan terendah.'],
        ['Volume sekuncup', 'Volume darah yang dipompa satu bilik dalam satu denyut, sekitar 70 mL saat istirahat.'],
        ['Curah jantung', 'Volume yang dipompa per menit = denyut jantung × volume sekuncup, sekitar 5 L/menit saat istirahat.'],
        ['Arteri koroner', 'Pembuluh nadi kecil di permukaan jantung yang memasok oksigen ke otot jantung.'],
      ],
    },
    misconceptions: {
      en: [
        ['Oxygen-poor blood is actually blue.', 'It is dark red; oxygen-rich blood is bright red. Diagrams (and this sim) use blue only as a colour code. Veins look bluish through the skin because of how light passes through tissue.'],
        ['All arteries carry oxygen-rich blood and all veins carry oxygen-poor blood.', 'The pulmonary artery carries oxygen-poor blood to the lungs and the pulmonary veins carry oxygen-rich blood back. Artery and vein describe direction (away from or towards the heart), not oxygen content.'],
        ['The heart pumps blood to the lungs so the lungs can use the oxygen.', 'The blood goes to the lungs to collect oxygen for the rest of the body. The heart itself gets its oxygen from the coronary arteries, not from the blood inside its chambers.'],
        ['A faster heart rate always means more blood pumped.', 'Up to a point. At very high rates the ventricles have too little time to fill, stroke volume drops, and output levels off, as the sim shows above 120 bpm.'],
      ],
      id: [
        ['Darah miskin oksigen benar-benar berwarna biru.', 'Warnanya merah gelap; darah kaya oksigen merah terang. Diagram (dan simulasi ini) memakai biru hanya sebagai kode warna. Vena tampak kebiruan lewat kulit karena cara cahaya melewati jaringan.'],
        ['Semua arteri membawa darah kaya oksigen dan semua vena membawa darah miskin oksigen.', 'Arteri pulmonalis membawa darah miskin oksigen ke paru-paru dan vena pulmonalis membawa darah kaya oksigen kembali. Arteri dan vena menggambarkan arah (menjauhi atau menuju jantung), bukan kandungan oksigen.'],
        ['Jantung memompa darah ke paru-paru supaya paru-paru bisa memakai oksigennya.', 'Darah pergi ke paru-paru untuk mengambil oksigen bagi seluruh tubuh. Jantung sendiri mendapat oksigen dari arteri koroner, bukan dari darah di dalam ruang-ruangnya.'],
        ['Denyut jantung yang lebih cepat selalu berarti lebih banyak darah dipompa.', 'Benar sampai batas tertentu. Pada denyut sangat cepat bilik terlalu sedikit waktu untuk terisi, volume sekuncup turun, dan keluaran mendatar, seperti ditunjukkan simulasi di atas 120 denyut per menit.'],
      ],
    },
    realWorld: {
      en: [
        'A blood pressure cuff measures systolic and diastolic pressure; readings consistently above 140/90 mmHg are treated as hypertension, a major risk factor for stroke.',
        'Angioplasty opens a blocked coronary artery with a tiny balloon and often a wire-mesh stent, restoring blood flow to the starved heart muscle.',
        'Trained endurance athletes have larger stroke volumes, so their resting heart rate can be as low as 40 to 50 bpm while output stays normal.',
        'Fish have a single circulation with a two-chambered heart; frogs have three chambers and mix the two bloods; birds and mammals have a complete double circulation.',
        'Smartwatches estimate heart rate by shining light into the wrist and detecting the pulse of blood volume with each beat.',
      ],
      id: [
        'Manset tekanan darah mengukur tekanan sistol dan diastol; pembacaan yang terus-menerus di atas 140/90 mmHg dianggap hipertensi, faktor risiko utama stroke.',
        'Angioplasti membuka arteri koroner yang tersumbat dengan balon kecil dan sering kali ring (stent) kawat, memulihkan aliran darah ke otot jantung yang kekurangan oksigen.',
        'Atlet ketahanan yang terlatih memiliki volume sekuncup lebih besar, sehingga denyut jantung istirahatnya bisa serendah 40 sampai 50 per menit dengan curah jantung tetap normal.',
        'Ikan memiliki peredaran tunggal dengan jantung dua ruang; katak memiliki tiga ruang dan mencampur kedua darah; burung dan mamalia memiliki peredaran ganda yang sempurna.',
        'Jam tangan pintar memperkirakan denyut jantung dengan menyinari pergelangan tangan dan mendeteksi denyut volume darah pada setiap detak.',
      ],
    },
    questions: {
      en: [
        { q: 'A particle has just left the right ventricle. List, in order, the places it visits before it leaves the left ventricle.', a: 'Pulmonary artery → lungs (gains oxygen, turns red) → pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve.' },
        { q: 'At 72 bpm the sim shows a stroke volume of 70 mL. Estimate the cardiac output and show your working.', a: 'Cardiac output = 72 beats/min × 70 mL = 5040 mL/min ≈ 5.0 L/min.' },
        { q: 'With the coronary artery blocked, heart rate is still 72 bpm but cardiac output falls to about 3.3 L/min. Explain.', a: 'The muscle beyond the blockage receives no oxygen and cannot contract properly, so each beat ejects less blood: stroke volume falls from 70 to about 46 mL. Output = rate × stroke volume, so output falls even though the rate is unchanged.' },
      ],
      id: [
        { q: 'Sebuah partikel baru saja meninggalkan bilik kanan. Urutkan tempat yang dilewatinya sebelum keluar dari bilik kiri.', a: 'Arteri pulmonalis → paru-paru (mendapat oksigen, menjadi merah) → vena pulmonalis → serambi kiri → katup bikuspid → bilik kiri → katup aorta.' },
        { q: 'Pada 72 denyut per menit simulasi menunjukkan volume sekuncup 70 mL. Perkirakan curah jantung dan tunjukkan perhitungannya.', a: 'Curah jantung = 72 denyut/menit × 70 mL = 5040 mL/menit ≈ 5,0 L/menit.' },
        { q: 'Dengan arteri koroner tersumbat, denyut jantung tetap 72 per menit tetapi curah jantung turun menjadi sekitar 3,3 L/menit. Jelaskan.', a: 'Otot di belakang sumbatan tidak menerima oksigen dan tidak dapat berkontraksi dengan baik, sehingga setiap denyut mengeluarkan lebih sedikit darah: volume sekuncup turun dari 70 menjadi sekitar 46 mL. Curah = denyut × volume sekuncup, sehingga curah turun walaupun denyutnya tidak berubah.' },
      ],
    },
  },
};
