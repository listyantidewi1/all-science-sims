// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Distinguish simple diffusion, facilitated diffusion through channel and carrier proteins, and active transport by the Na⁺/K⁺ pump, in terms of the direction relative to the concentration gradient and the need for ATP.',
      'Explain why O₂ crosses the lipid bilayer directly while glucose and ions need membrane proteins, using size, polarity and charge.',
      'Use particle counts and concentrations to predict net flow direction, recognise equilibrium, and quantify the pump’s 3 Na⁺ : 2 K⁺ : 1 ATP stoichiometry.',
    ],
    id: [
      'Membedakan difusi sederhana, difusi terfasilitasi melalui protein kanal dan pembawa, serta transpor aktif oleh pompa Na⁺/K⁺, berdasarkan arah relatif terhadap gradien konsentrasi dan kebutuhan ATP.',
      'Menjelaskan mengapa O₂ menembus lapisan ganda lipid secara langsung sedangkan glukosa dan ion memerlukan protein membran, berdasarkan ukuran, polaritas, dan muatan.',
      'Menggunakan jumlah partikel dan konsentrasi untuk memprediksi arah aliran neto, mengenali kesetimbangan, dan mengukur stoikiometri pompa 3 Na⁺ : 2 K⁺ : 1 ATP.',
    ],
  },
  tryThis: {
    en: [
      'With ATP off, watch the O₂ bars. How long until inside and outside are about equal? Does O₂ stop crossing at equilibrium, or just stop having a net flow?',
      'Press "+10 glucose outside" three times. Glucose crosses only at the carrier protein: does the rate keep rising with every press, or does it level off (saturation)?',
      'Open the Na⁺ channel with ATP off and watch Na⁺ pour in. Then switch ATP on. Which way does the net Na⁺ flow point now, and how many ATP does it cost per minute?',
      'Switch ATP on with the K⁺ channel closed: K⁺ keeps piling up inside. Now open the K⁺ channel and find the point where leak and pump balance.',
    ],
    id: [
      'Dengan ATP mati, amati batang O₂. Berapa lama hingga dalam dan luar hampir sama? Apakah O₂ berhenti menyeberang saat kesetimbangan, atau hanya berhenti punya aliran neto?',
      'Tekan "+10 glucose outside" tiga kali. Glukosa hanya menyeberang di protein pembawa: apakah lajunya terus naik tiap kali ditekan, atau mendatar (jenuh)?',
      'Buka kanal Na⁺ dengan ATP mati dan amati Na⁺ membanjir masuk. Lalu nyalakan ATP. Ke mana arah aliran neto Na⁺ sekarang, dan berapa ATP yang dipakai per menit?',
      'Nyalakan ATP dengan kanal K⁺ tertutup: K⁺ terus menumpuk di dalam. Sekarang buka kanal K⁺ dan temukan titik ketika kebocoran dan pompa seimbang.',
    ],
  },

  learn: {
    background: {
      en: [
        'The cell membrane is a phospholipid bilayer about 7–8 nm thick: hydrophilic phosphate heads face the water on both sides and hydrophobic fatty-acid tails fill the middle. Small, non-polar molecules such as O₂, CO₂ and steroid hormones dissolve in the tails and cross by simple diffusion, driven only by random thermal motion. Net movement is always from high to low concentration, and at equilibrium particles still cross in both directions at equal rates. Fick’s law says the net rate is proportional to the concentration difference and the membrane area, and inversely proportional to the thickness, so cells that exchange a lot of gas, like alveolar cells, are very thin and very spread out.',
        'Polar molecules and ions cannot dissolve in the oily core. Glucose (180 g/mol, many –OH groups) crosses through carrier proteins such as GLUT1 that bind one molecule, change shape and release it on the other side: this is facilitated diffusion, still passive and still down the gradient, but it saturates because a carrier can only flip a few hundred times per second. Ions such as Na⁺ and K⁺ are charged and surrounded by water molecules, so they pass only through channel proteins with a selective pore. In the simulation glucose can cross only at the carrier and the ions only at their channels, so you can see the rate level off when the carrier is busy and see a channel act as an on/off gate.',
        'Active transport moves a substance against its gradient using energy from ATP. The Na⁺/K⁺-ATPase, present in almost every animal cell, binds 3 Na⁺ from inside, is phosphorylated by one ATP, flips and releases them outside, then binds 2 K⁺ from outside and returns them inside. Typical concentrations are Na⁺ 145 mmol/L outside versus 12 inside, and K⁺ 4 outside versus 140 inside; the pump maintains these gradients and uses roughly a third of a resting cell’s ATP (two thirds in neurons). In the sim each particle stands for about 4 mmol/L; switch the ATP supply off and the gradients collapse through the leak channels, exactly as happens in a cell poisoned with cyanide.',
        'Very large cargo never crosses the bilayer molecule by molecule. In endocytosis the membrane folds inward around food particles, fluid or receptor-bound hormones and pinches off as a vesicle; in exocytosis a vesicle fuses with the membrane and releases its contents, which is how neurotransmitters, insulin and digestive enzymes are secreted. Both are active processes that use ATP for the cytoskeleton. Press the Endocytosis and Exocytosis buttons to see the two bulk-transport movements.',
      ],
      id: [
        'Membran sel adalah lapisan ganda fosfolipid setebal sekitar 7–8 nm: kepala fosfat hidrofilik menghadap air di kedua sisi dan ekor asam lemak hidrofobik mengisi bagian tengah. Molekul kecil nonpolar seperti O₂, CO₂, dan hormon steroid larut dalam ekor dan menyeberang melalui difusi sederhana, hanya didorong gerak termal acak. Pergerakan neto selalu dari konsentrasi tinggi ke rendah, dan pada kesetimbangan partikel tetap menyeberang ke dua arah dengan laju sama. Hukum Fick menyatakan laju neto sebanding dengan selisih konsentrasi dan luas membran, serta berbanding terbalik dengan ketebalan, sehingga sel yang banyak bertukar gas, seperti sel alveolus, sangat tipis dan sangat melebar.',
        'Molekul polar dan ion tidak dapat larut dalam inti berminyak. Glukosa (180 g/mol, banyak gugus –OH) menyeberang lewat protein pembawa seperti GLUT1 yang mengikat satu molekul, berubah bentuk, dan melepaskannya di sisi lain: inilah difusi terfasilitasi, tetap pasif dan tetap menuruni gradien, tetapi mengalami kejenuhan karena satu pembawa hanya dapat membalik beberapa ratus kali per detik. Ion seperti Na⁺ dan K⁺ bermuatan dan dikelilingi molekul air, sehingga hanya lewat protein kanal dengan pori selektif. Dalam simulasi glukosa hanya dapat menyeberang di pembawa dan ion hanya di kanalnya, sehingga kamu dapat melihat laju mendatar saat pembawa sibuk dan melihat kanal bertindak sebagai gerbang buka/tutup.',
        'Transpor aktif memindahkan zat melawan gradiennya menggunakan energi dari ATP. Na⁺/K⁺-ATPase, yang ada di hampir setiap sel hewan, mengikat 3 Na⁺ dari dalam, difosforilasi oleh satu ATP, membalik dan melepaskannya di luar, lalu mengikat 2 K⁺ dari luar dan mengembalikannya ke dalam. Konsentrasi tipikal adalah Na⁺ 145 mmol/L di luar versus 12 di dalam, dan K⁺ 4 di luar versus 140 di dalam; pompa mempertahankan gradien ini dan memakai kira-kira sepertiga ATP sel istirahat (dua pertiga pada neuron). Dalam simulasi setiap partikel mewakili sekitar 4 mmol/L; matikan pasokan ATP dan gradien runtuh melalui kanal bocor, persis seperti yang terjadi pada sel yang diracuni sianida.',
        'Muatan yang sangat besar tidak pernah menembus lapisan ganda molekul demi molekul. Pada endositosis membran melipat ke dalam mengelilingi partikel makanan, cairan, atau hormon yang terikat reseptor dan melepaskan diri sebagai vesikel; pada eksositosis vesikel berfusi dengan membran dan melepaskan isinya, itulah cara neurotransmiter, insulin, dan enzim pencernaan disekresikan. Keduanya proses aktif yang memakai ATP untuk sitoskeleton. Tekan tombol Endocytosis dan Exocytosis untuk melihat kedua gerakan transpor massal ini.',
      ],
    },
    figure: {
      caption: {
        en: 'Four routes across the membrane. Simple diffusion: O₂ slips between the lipid tails down its gradient. Facilitated diffusion: glucose through a carrier (GLUT) and K⁺ through a channel, still down the gradient and without ATP. Active transport: the Na⁺/K⁺ pump uses one ATP to move 3 Na⁺ out and 2 K⁺ in against their gradients (Na⁺ 145 mM outside vs 12 inside; K⁺ 4 vs 140).',
        id: 'Empat jalur melintasi membran. Difusi sederhana: O₂ menyelinap di antara ekor lipid menuruni gradien. Difusi terfasilitasi: glukosa melalui pembawa (GLUT) dan K⁺ melalui kanal, tetap menuruni gradien dan tanpa ATP. Transpor aktif: pompa Na⁺/K⁺ memakai satu ATP untuk memindahkan 3 Na⁺ keluar dan 2 K⁺ masuk melawan gradiennya (Na⁺ 145 mM di luar vs 12 di dalam; K⁺ 4 vs 140).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        let lipids = '';
        for (let x = 12; x < 350; x += 14) {
          if ((x > 80 && x < 120) || (x > 160 && x < 200) || (x > 240 && x < 300)) continue;
          lipids += `<circle cx="${x}" cy="104" r="5" class="hd"/><line x1="${x - 2}" y1="109" x2="${x - 2}" y2="120" class="tl"/><line x1="${x + 2}" y1="109" x2="${x + 2}" y2="120" class="tl"/>`;
          lipids += `<circle cx="${x}" cy="138" r="5" class="hd"/><line x1="${x - 2}" y1="133" x2="${x - 2}" y2="122" class="tl"/><line x1="${x + 2}" y1="133" x2="${x + 2}" y2="122" class="tl"/>`;
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Simple diffusion, facilitated diffusion and the sodium-potassium pump', 'Difusi sederhana, difusi terfasilitasi, dan pompa natrium-kalium')}">
  <style>text{font:9px system-ui,sans-serif;fill:currentColor}.h{font:bold 10px system-ui,sans-serif;fill:currentColor}.hd{fill:#38bdf8}.tl{stroke:#fbbf24;stroke-width:1.4}.pr{fill:rgba(139,92,246,0.35);stroke:#8b5cf6;stroke-width:1.2}.a{fill:none;stroke-width:1.8}</style>
  <defs><marker id="mt-m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="currentColor"/></marker></defs>
  <text x="6" y="14" class="h">${L('OUTSIDE (extracellular)', 'LUAR (ekstraseluler)')}</text>
  <text x="6" y="234" class="h">${L('INSIDE (cytoplasm)', 'DALAM (sitoplasma)')}</text>
  ${lipids}
  <rect x="84" y="96" width="32" height="50" rx="8" class="pr"/><ellipse cx="100" cy="121" rx="6" ry="12" fill="#0b1220" opacity="0.6"/>
  <rect x="164" y="96" width="32" height="50" rx="8" class="pr"/><rect x="176" y="100" width="8" height="42" fill="#0b1220" opacity="0.6"/>
  <rect x="244" y="92" width="52" height="58" rx="10" fill="rgba(244,114,182,0.3)" stroke="#f472b6" stroke-width="1.4"/>
  <text x="270" y="124" text-anchor="middle" class="h">Na⁺/K⁺</text><text x="270" y="134" text-anchor="middle">ATPase</text>
  <circle cx="40" cy="40" r="4" fill="#cbd5e1"/><circle cx="52" cy="60" r="4" fill="#cbd5e1"/><circle cx="30" cy="70" r="4" fill="#cbd5e1"/><circle cx="46" cy="190" r="4" fill="#cbd5e1"/>
  <path d="M40 78 L40 170" class="a" stroke="#cbd5e1" marker-end="url(#mt-m)"/>
  <text x="40" y="30" text-anchor="middle">O₂</text>
  <text x="40" y="210" text-anchor="middle">${L('simple', 'difusi')}</text><text x="40" y="220" text-anchor="middle">${L('diffusion', 'sederhana')}</text>
  <polygon points="100,38 106,41 106,48 100,51 94,48 94,41" fill="#f59e0b"/><polygon points="84,62 90,65 90,72 84,75 78,72 78,65" fill="#f59e0b"/><polygon points="116,66 122,69 122,76 116,79 110,76 110,69" fill="#f59e0b"/>
  <path d="M100 80 L100 170" class="a" stroke="#f59e0b" marker-end="url(#mt-m)"/>
  <text x="100" y="30" text-anchor="middle">${L('glucose', 'glukosa')}</text>
  <text x="100" y="210" text-anchor="middle">${L('carrier', 'pembawa')}</text><text x="100" y="220" text-anchor="middle">${L('(facilitated)', '(terfasilitasi)')}</text>
  <circle cx="180" cy="180" r="4" fill="#a78bfa"/><circle cx="168" cy="196" r="4" fill="#a78bfa"/><circle cx="194" cy="192" r="4" fill="#a78bfa"/><circle cx="180" cy="60" r="4" fill="#a78bfa"/>
  <path d="M180 160 L180 76" class="a" stroke="#a78bfa" marker-end="url(#mt-m)"/>
  <text x="180" y="30" text-anchor="middle">K⁺ 4 mM</text><text x="180" y="212" text-anchor="middle">K⁺ 140 mM</text>
  <text x="180" y="222" text-anchor="middle">${L('channel (leak)', 'kanal (bocor)')}</text>
  <path d="M258 168 L258 158 L258 86" class="a" stroke="#facc15" marker-end="url(#mt-m)"/>
  <text x="258" y="182" text-anchor="middle" fill="#facc15">3 Na⁺</text>
  <path d="M282 72 L282 158" class="a" stroke="#a78bfa" marker-end="url(#mt-m)"/>
  <text x="282" y="64" text-anchor="middle" fill="#a78bfa">2 K⁺</text>
  <text x="258" y="40" text-anchor="middle" fill="#facc15">Na⁺ 145 mM</text><text x="258" y="196" text-anchor="middle" fill="#facc15">Na⁺ 12 mM</text>
  <text x="318" y="176" fill="#f472b6">ATP →</text><text x="318" y="186" fill="#f472b6">ADP + Pᵢ</text>
  <text x="270" y="212" text-anchor="middle" class="h">${L('active transport', 'transpor aktif')}</text>
  <text x="270" y="222" text-anchor="middle">${L('against gradient', 'melawan gradien')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Passive transport (simple and facilitated diffusion, osmosis) needs no ATP and always moves substances down their concentration gradient; active transport uses ATP to move them up the gradient.',
        'Small non-polar molecules (O₂, CO₂) cross the lipid bilayer directly; polar molecules (glucose) need carrier proteins and ions (Na⁺, K⁺) need channel proteins because the hydrophobic core excludes them.',
        'Equilibrium is dynamic: at equal concentrations particles still cross in both directions, but the net flow is zero.',
        'Carrier-mediated transport saturates: once every carrier is occupied, adding more substrate no longer raises the rate.',
        'The Na⁺/K⁺ pump moves 3 Na⁺ out and 2 K⁺ in per ATP, maintaining about 145/12 mmol/L Na⁺ and 4/140 mmol/L K⁺ across the membrane and consuming up to a third of the cell’s ATP.',
        'Bulk transport (endocytosis, exocytosis) moves large particles and volumes by reshaping the membrane into vesicles; it is active and ATP-dependent.',
      ],
      id: [
        'Transpor pasif (difusi sederhana dan terfasilitasi, osmosis) tidak memerlukan ATP dan selalu memindahkan zat menuruni gradien konsentrasinya; transpor aktif memakai ATP untuk memindahkannya menaiki gradien.',
        'Molekul kecil nonpolar (O₂, CO₂) menembus lapisan ganda lipid langsung; molekul polar (glukosa) perlu protein pembawa dan ion (Na⁺, K⁺) perlu protein kanal karena inti hidrofobik menolaknya.',
        'Kesetimbangan bersifat dinamis: pada konsentrasi sama partikel tetap menyeberang ke dua arah, tetapi aliran netonya nol.',
        'Transpor berpembawa mengalami kejenuhan: setelah semua pembawa terisi, menambah substrat tidak lagi menaikkan laju.',
        'Pompa Na⁺/K⁺ memindahkan 3 Na⁺ keluar dan 2 K⁺ masuk per ATP, mempertahankan sekitar 145/12 mmol/L Na⁺ dan 4/140 mmol/L K⁺ melintasi membran dan memakai hingga sepertiga ATP sel.',
        'Transpor massal (endositosis, eksositosis) memindahkan partikel besar dan volume dengan membentuk ulang membran menjadi vesikel; prosesnya aktif dan bergantung ATP.',
      ],
    },
    vocabulary: {
      en: [
        ['Phospholipid bilayer', 'Two layers of phospholipids, heads outward and tails inward, forming a 7–8 nm barrier that is selectively permeable.'],
        ['Simple diffusion', 'Net movement of small non-polar molecules through the bilayer from high to low concentration, with no proteins or ATP.'],
        ['Facilitated diffusion', 'Passive movement down a gradient through a channel or carrier protein, used by ions and polar molecules such as glucose.'],
        ['Channel protein', 'A membrane protein with a water-filled, selective pore through which specific ions pass; may be gated open or closed.'],
        ['Carrier protein', 'A membrane protein that binds a specific molecule, changes shape and releases it on the other side; it saturates at high concentration.'],
        ['Active transport', 'Movement of a substance against its concentration gradient using energy, usually from ATP hydrolysis.'],
        ['Na⁺/K⁺ pump (Na⁺/K⁺-ATPase)', 'An active carrier that exports 3 Na⁺ and imports 2 K⁺ for each ATP, maintaining the ion gradients of animal cells.'],
        ['Endocytosis / exocytosis', 'Bulk transport into or out of the cell by forming or fusing membrane vesicles.'],
      ],
      id: [
        ['Lapisan ganda fosfolipid', 'Dua lapisan fosfolipid, kepala menghadap keluar dan ekor ke dalam, membentuk sawar 7–8 nm yang permeabel selektif.'],
        ['Difusi sederhana', 'Pergerakan neto molekul kecil nonpolar melalui lapisan ganda dari konsentrasi tinggi ke rendah, tanpa protein atau ATP.'],
        ['Difusi terfasilitasi', 'Pergerakan pasif menuruni gradien melalui protein kanal atau pembawa, dipakai oleh ion dan molekul polar seperti glukosa.'],
        ['Protein kanal', 'Protein membran dengan pori selektif berisi air yang dilewati ion tertentu; dapat bergerbang buka atau tutup.'],
        ['Protein pembawa', 'Protein membran yang mengikat molekul tertentu, berubah bentuk, dan melepaskannya di sisi lain; jenuh pada konsentrasi tinggi.'],
        ['Transpor aktif', 'Pergerakan zat melawan gradien konsentrasinya menggunakan energi, biasanya dari hidrolisis ATP.'],
        ['Pompa Na⁺/K⁺ (Na⁺/K⁺-ATPase)', 'Pembawa aktif yang mengekspor 3 Na⁺ dan mengimpor 2 K⁺ untuk setiap ATP, mempertahankan gradien ion sel hewan.'],
        ['Endositosis / eksositosis', 'Transpor massal ke dalam atau ke luar sel dengan membentuk atau memfusikan vesikel membran.'],
      ],
    },
    misconceptions: {
      en: [
        ['At equilibrium particles stop moving across the membrane.', 'They keep crossing in both directions at equal rates; only the net flow is zero. Watch the O₂ particles: they still pass through the bilayer after the bars become equal.'],
        ['Facilitated diffusion needs energy because a protein is involved.', 'The carrier or channel only provides a route. The driving force is still the concentration gradient and no ATP is used; the rate simply saturates when the proteins are busy.'],
        ['The Na⁺/K⁺ pump exchanges one Na⁺ for one K⁺.', 'It moves 3 Na⁺ out and 2 K⁺ in per ATP, so each cycle also moves one net positive charge out of the cell, which contributes to the resting membrane potential.'],
        ['Glucose is small enough to slip between the lipids like oxygen.', 'Glucose is polar, with five –OH groups that form hydrogen bonds with water, so it cannot dissolve in the hydrophobic tails. Without GLUT carriers almost no glucose would enter the cell.'],
      ],
      id: [
        ['Pada kesetimbangan partikel berhenti bergerak melintasi membran.', 'Partikel tetap menyeberang ke dua arah dengan laju sama; hanya aliran netonya yang nol. Amati partikel O₂: mereka tetap menembus lapisan ganda setelah batang menjadi sama.'],
        ['Difusi terfasilitasi memerlukan energi karena melibatkan protein.', 'Pembawa atau kanal hanya menyediakan jalur. Gaya pendorongnya tetap gradien konsentrasi dan tidak ada ATP yang dipakai; lajunya hanya jenuh ketika protein sibuk.'],
        ['Pompa Na⁺/K⁺ menukar satu Na⁺ dengan satu K⁺.', 'Pompa memindahkan 3 Na⁺ keluar dan 2 K⁺ masuk per ATP, sehingga setiap siklus juga memindahkan satu muatan positif neto keluar sel, yang berkontribusi pada potensial membran istirahat.'],
        ['Glukosa cukup kecil untuk menyelinap di antara lipid seperti oksigen.', 'Glukosa bersifat polar, dengan lima gugus –OH yang membentuk ikatan hidrogen dengan air, sehingga tidak dapat larut dalam ekor hidrofobik. Tanpa pembawa GLUT hampir tidak ada glukosa yang masuk sel.'],
      ],
    },
    realWorld: {
      en: [
        'Cyanide blocks ATP production; within minutes the Na⁺/K⁺ pumps stop, Na⁺ and water flood into cells and they swell, which is why cyanide poisoning is so fast.',
        'Oral rehydration solution for diarrhoea contains glucose and salt because the intestinal SGLT1 co-transporter absorbs Na⁺ together with glucose, dragging water with it.',
        'Digoxin, a heart drug from foxglove, partly inhibits the Na⁺/K⁺ pump in heart muscle, raising intracellular Ca²⁺ and strengthening each heartbeat.',
        'Local anaesthetics such as lidocaine block Na⁺ channels in nerve membranes so action potentials cannot form and no pain signal is sent.',
        'Insulin triggers exocytosis of vesicles carrying GLUT4 carriers to the membrane of muscle and fat cells, raising glucose uptake up to 10-fold after a meal.',
      ],
      id: [
        'Sianida menghambat produksi ATP; dalam hitungan menit pompa Na⁺/K⁺ berhenti, Na⁺ dan air membanjiri sel sehingga sel membengkak, itulah sebabnya keracunan sianida begitu cepat.',
        'Larutan rehidrasi oral untuk diare mengandung glukosa dan garam karena kotranspor SGLT1 di usus menyerap Na⁺ bersama glukosa, menyeret air ikut serta.',
        'Digoksin, obat jantung dari tanaman foxglove, sebagian menghambat pompa Na⁺/K⁺ di otot jantung, menaikkan Ca²⁺ intrasel dan memperkuat tiap denyut jantung.',
        'Anestesi lokal seperti lidokain menghambat kanal Na⁺ di membran saraf sehingga potensial aksi tidak dapat terbentuk dan tidak ada sinyal nyeri yang dikirim.',
        'Insulin memicu eksositosis vesikel pembawa GLUT4 ke membran sel otot dan lemak, menaikkan penyerapan glukosa hingga 10 kali lipat setelah makan.',
      ],
    },
    questions: {
      en: [
        { q: 'The sim shows Na⁺ at 36 particles outside and 3 inside (≈ 145 and 12 mmol/L). With ATP off and the Na⁺ channel open, which way is the net flow, by what process, and what happens to the gradient over time?', a: 'Net flow is inward (outside → inside) by facilitated diffusion through the channel. No energy is used; the gradient decays until the two sides are nearly equal and the net flow falls to zero.' },
        { q: 'With ATP on, the pump completes 12 cycles in one minute. How many Na⁺ and K⁺ were moved, how many ATP were used, and what net charge left the cell?', a: '12 cycles × 3 Na⁺ = 36 Na⁺ out, 12 × 2 K⁺ = 24 K⁺ in, 12 ATP hydrolysed. Each cycle moves one net positive charge out, so 12 positive charges left the cell.' },
        { q: 'You add glucose outside three times but the crossing rate at the carrier stops increasing. Explain, and name the same phenomenon in enzyme kinetics.', a: 'Each carrier can bind, flip and release only a limited number of molecules per second. When glucose is abundant every carrier is occupied all the time, so the rate reaches a maximum (Vmax). This is saturation, exactly as an enzyme saturates with substrate.' },
        { q: 'Why can O₂ cross anywhere along the membrane in the sim while K⁺ crosses only at one point?', a: 'O₂ is small and non-polar, so it dissolves in the hydrophobic lipid tails and diffuses straight through. K⁺ is charged and hydrated; the lipid core repels it, so it can only pass through the selective pore of a K⁺ channel protein.' },
      ],
      id: [
        { q: 'Simulasi menunjukkan Na⁺ 36 partikel di luar dan 3 di dalam (≈ 145 dan 12 mmol/L). Dengan ATP mati dan kanal Na⁺ terbuka, ke mana arah aliran neto, melalui proses apa, dan apa yang terjadi pada gradien seiring waktu?', a: 'Aliran neto ke dalam (luar → dalam) melalui difusi terfasilitasi lewat kanal. Tidak ada energi yang dipakai; gradien menurun sampai kedua sisi hampir sama dan aliran neto turun menjadi nol.' },
        { q: 'Dengan ATP menyala, pompa menyelesaikan 12 siklus dalam satu menit. Berapa Na⁺ dan K⁺ yang dipindahkan, berapa ATP dipakai, dan berapa muatan neto yang keluar sel?', a: '12 siklus × 3 Na⁺ = 36 Na⁺ keluar, 12 × 2 K⁺ = 24 K⁺ masuk, 12 ATP dihidrolisis. Setiap siklus memindahkan satu muatan positif neto keluar, sehingga 12 muatan positif meninggalkan sel.' },
        { q: 'Kamu menambah glukosa di luar tiga kali tetapi laju penyeberangan di pembawa berhenti naik. Jelaskan, dan sebutkan fenomena yang sama dalam kinetika enzim.', a: 'Setiap pembawa hanya dapat mengikat, membalik, dan melepaskan sejumlah terbatas molekul per detik. Ketika glukosa melimpah setiap pembawa terisi sepanjang waktu, sehingga laju mencapai maksimum (Vmaks). Inilah kejenuhan, persis seperti enzim jenuh oleh substrat.' },
        { q: 'Mengapa O₂ dapat menyeberang di mana saja sepanjang membran dalam simulasi sedangkan K⁺ hanya di satu titik?', a: 'O₂ kecil dan nonpolar, sehingga larut dalam ekor lipid hidrofobik dan berdifusi langsung menembus. K⁺ bermuatan dan terhidrasi; inti lipid menolaknya, sehingga hanya dapat lewat pori selektif protein kanal K⁺.' },
      ],
    },
  },
};
