// Long-form text for the Mutations sim (grade 12).
export default {
  objectives: {
    en: [
      'Transcribe a DNA coding sequence into mRNA and translate it with the genetic code table, reading codons in the correct frame from AUG.',
      'Classify point mutations as silent, missense or nonsense from the codon change, and explain why a one-base insertion or deletion causes a frameshift that changes every downstream codon.',
      'Relate the sickle-cell mutation (GAG → GTG, Glu → Val at codon 6 of mature β-globin, codon 7 in the sim which counts the start codon) to the altered protein and its consequences.',
    ],
    id: [
      'Mentranskripsikan urutan DNA pengode menjadi mRNA dan mentranslasikannya dengan tabel kode genetik, membaca kodon dalam kerangka yang benar dari AUG.',
      'Mengklasifikasikan mutasi titik sebagai diam, missense atau nonsense dari perubahan kodon, dan menjelaskan mengapa insersi atau delesi satu basa menyebabkan pergeseran kerangka yang mengubah semua kodon di hilir.',
      'Mengaitkan mutasi sel sabit (GAG → GTG, Glu → Val pada kodon 6 β-globin matang, kodon 7 dalam simulasi yang menghitung kodon awal) dengan protein yang berubah dan akibatnya.',
    ],
  },
  tryThis: {
    en: [
      'Choose Substitution at position 21 and try each of the four bases. Which give the same amino acid (silent), which change it (missense), and does any create a stop codon?',
      'Press the Sickle-cell preset. Which base changed, which codon, and which amino acid? Why does one amino acid matter so much here?',
      'Delete the base at position 4. How many amino acids after the change are different? Now delete three bases in a row (delete base 4, press "Keep mutation", and repeat twice more) and compare.',
      'Find a substitution that turns codon 9 (AAG, Lys) into a stop codon. How long is the protein now?',
    ],
    id: [
      'Pilih Substitusi pada posisi 21 dan coba keempat basa. Mana yang memberi asam amino yang sama (diam), mana yang mengubahnya (missense), dan adakah yang membuat kodon stop?',
      'Tekan preset Sel sabit. Basa mana yang berubah, kodon mana, dan asam amino apa? Mengapa satu asam amino begitu berpengaruh di sini?',
      'Hapus basa pada posisi 4. Berapa asam amino setelah perubahan yang berbeda? Sekarang hapus tiga basa berturut-turut (hapus basa 4, tekan "Keep mutation", lalu ulangi dua kali lagi) dan bandingkan.',
      'Temukan substitusi yang mengubah kodon 9 (AAG, Lys) menjadi kodon stop. Berapa panjang proteinnya sekarang?',
    ],
  },

  learn: {
    background: {
      en: [
        'A gene is a stretch of DNA whose sequence of bases (A, T, G, C) specifies a protein. During transcription, RNA polymerase copies the template strand into messenger RNA, so the mRNA has the same sequence as the coding strand with uracil (U) in place of thymine (T). During translation the ribosome reads the mRNA three bases at a time, starting at the start codon AUG (methionine). Each triplet, or codon, specifies one amino acid according to the genetic code: 64 codons encode 20 amino acids plus three stop signals (UAA, UAG, UGA). Because most amino acids are specified by several codons, the code is said to be degenerate, and the third base of a codon is often free to vary without changing the amino acid.',
        'A mutation is a change in the DNA sequence. The simplest is a substitution of one base for another, a point mutation. Its effect depends entirely on the codon table. If the new codon specifies the same amino acid (for example GAG → GAA, both glutamate), the mutation is silent. If it specifies a different amino acid, it is a missense mutation; whether that matters depends on where the amino acid sits and how different its chemistry is. If the new codon is a stop codon, the mutation is nonsense: translation ends early and the protein is truncated, usually losing its function. Substitution of a stop codon by an amino acid codon lengthens the protein instead.',
        'Insertions and deletions of one or two bases are more drastic. Because the ribosome keeps reading in triplets, every codon after the change is regrouped: the reading frame shifts, so almost every downstream amino acid is different and a premature stop usually appears within a few codons. Inserting or deleting three bases (or a multiple of three) keeps the frame and adds or removes whole amino acids, which is far less damaging. In the simulation the frameshift is shown by the codon boundaries moving and the changed amino acids lighting up.',
        'The sequence in the simulation is the real beginning of the human HBB gene, which codes for β-globin, one of the two chains of haemoglobin. In sickle-cell disease a single base in codon 6 of the mature protein (codon 7 counting the initial methionine, which is removed later) changes GAG to GTG, so glutamate, which is negatively charged, is replaced by valine, which is hydrophobic. The sticky valine makes deoxygenated haemoglobin molecules clump into fibres that distort red blood cells into a sickle shape, blocking small vessels and shortening the cells\' life. This is the classic example of how a single-base missense mutation can cause a serious disease, and of how the position of a change matters more than its size.',
      ],
      id: [
        'Gen adalah ruas DNA yang urutan basanya (A, T, G, C) menentukan sebuah protein. Selama transkripsi, RNA polimerase menyalin untai cetakan menjadi RNA duta, sehingga mRNA berurutan sama dengan untai pengode dengan urasil (U) menggantikan timin (T). Selama translasi ribosom membaca mRNA tiga basa sekaligus, mulai dari kodon awal AUG (metionin). Setiap triplet, atau kodon, menentukan satu asam amino menurut kode genetik: 64 kodon mengodekan 20 asam amino plus tiga sinyal stop (UAA, UAG, UGA). Karena sebagian besar asam amino ditentukan oleh beberapa kodon, kode disebut berdegenerasi, dan basa ketiga kodon sering bebas berubah tanpa mengubah asam aminonya.',
        'Mutasi adalah perubahan urutan DNA. Yang paling sederhana adalah substitusi satu basa dengan basa lain, mutasi titik. Efeknya sepenuhnya bergantung pada tabel kodon. Jika kodon baru menentukan asam amino yang sama (misalnya GAG → GAA, keduanya glutamat), mutasinya diam. Jika menentukan asam amino berbeda, itu mutasi missense; apakah itu penting bergantung pada letak asam amino dan seberapa beda sifat kimianya. Jika kodon baru adalah kodon stop, mutasinya nonsense: translasi berakhir lebih awal dan protein terpotong, biasanya kehilangan fungsinya. Substitusi kodon stop oleh kodon asam amino justru memanjangkan protein.',
        'Insersi dan delesi satu atau dua basa lebih drastis. Karena ribosom terus membaca dalam triplet, setiap kodon setelah perubahan dikelompokkan ulang: kerangka baca bergeser, sehingga hampir semua asam amino di hilir berbeda dan stop prematur biasanya muncul dalam beberapa kodon. Menyisipkan atau menghapus tiga basa (atau kelipatan tiga) mempertahankan kerangka dan menambah atau menghapus asam amino utuh, yang jauh lebih tidak merusak. Di simulasi pergeseran kerangka ditunjukkan oleh batas kodon yang berpindah dan asam amino yang berubah menyala.',
        'Urutan dalam simulasi adalah awal sesungguhnya dari gen HBB manusia, yang mengodekan β-globin, salah satu dari dua rantai hemoglobin. Pada penyakit sel sabit satu basa pada kodon 6 protein matang (kodon 7 jika menghitung metionin awal, yang nantinya dibuang) berubah dari GAG menjadi GTG, sehingga glutamat, yang bermuatan negatif, digantikan valin, yang hidrofobik. Valin yang lengket membuat molekul hemoglobin terdeoksigenasi menggumpal menjadi serat yang mengubah sel darah merah menjadi bentuk sabit, menyumbat pembuluh kecil dan memperpendek umur sel. Inilah contoh klasik bagaimana mutasi missense satu basa dapat menyebabkan penyakit serius, dan bagaimana posisi perubahan lebih penting daripada ukurannya.',
      ],
    },
    figure: {
      caption: {
        en: 'The same 12-base stretch read in triplets. Top: normal sequence and protein. A substitution (middle) changes one codon and at most one amino acid: silent, missense or nonsense depending on the new codon. A single-base deletion (bottom) shifts the reading frame so every later codon, and amino acid, is different.',
        id: 'Ruas 12 basa yang sama dibaca dalam triplet. Atas: urutan dan protein normal. Substitusi (tengah) mengubah satu kodon dan paling banyak satu asam amino: diam, missense atau nonsense bergantung pada kodon baru. Delesi satu basa (bawah) menggeser kerangka baca sehingga setiap kodon, dan asam amino, berikutnya berbeda.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const boxes = (y, seq, hl) => seq.split('').map((b, i) => `<rect x="${30 + i * 22}" y="${y}" width="20" height="18" rx="3" fill="${hl.includes(i) ? '#ef4444' : 'currentColor'}" opacity="${hl.includes(i) ? '.85' : '.15'}"/><text x="${40 + i * 22}" y="${y + 13}" text-anchor="middle" class="b">${b}</text>`).join('');
        const aa = (y, list, hl) => list.map((a, i) => `<rect x="${30 + i * 66}" y="${y}" width="62" height="16" rx="8" fill="${hl.includes(i) ? '#ef4444' : '#22c55e'}" opacity="${hl.includes(i) ? '.8' : '.35'}"/><text x="${61 + i * 66}" y="${y + 12}" text-anchor="middle" class="s">${a}</text>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Substitution versus frameshift mutation', 'Mutasi substitusi versus pergeseran kerangka')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.b{font:bold 11px ui-monospace,monospace;fill:currentColor}.s{font:9px system-ui,sans-serif;fill:currentColor}.t{font:10px system-ui,sans-serif;fill:currentColor;opacity:.8}</style>
  <text x="30" y="14" class="t">${L('normal: GTG CAC CTG ACT', 'normal: GTG CAC CTG ACT')}</text>
  ${boxes(18, 'GTGCACCTGACT', [])}
  ${aa(40, ['Val', 'His', 'Leu', 'Thr'], [])}
  <text x="30" y="80" class="t">${L('substitution at base 6 (C→A): CAC→CAA, His→Gln (missense)', 'substitusi pada basa 6 (C→A): CAC→CAA, His→Gln (missense)')}</text>
  ${boxes(84, 'GTGCAACTGACT', [5])}
  ${aa(106, ['Val', 'Gln', 'Leu', 'Thr'], [1])}
  <text x="30" y="146" class="t">${L('deletion of base 4 (C): frame shifts, every later codon changes', 'delesi basa 4 (C): kerangka bergeser, semua kodon berikutnya berubah')}</text>
  ${boxes(150, 'GTGACCTGACT', [3])}
  <line x1="${30 + 3 * 22 - 1}" y1="148" x2="${30 + 3 * 22 - 1}" y2="170" stroke="#ef4444" stroke-width="2"/>
  ${aa(172, ['Val', 'Thr', 'Stop', ''], [1, 2])}
  <rect x="${30 + 3 * 66}" y="172" width="62" height="16" rx="8" fill="none" stroke="currentColor" stroke-dasharray="3 2" opacity=".4"/>
  <text x="30" y="214" class="t">${L('silent: GAG→GAA (Glu→Glu) · nonsense: GAG→TAG (Glu→Stop)', 'diam: GAG→GAA (Glu→Glu) · nonsense: GAG→TAG (Glu→Stop)')}</text>
  <text x="30" y="230" class="t">${L('sickle cell: GAG→GTG (Glu→Val) at β-globin codon 6', 'sel sabit: GAG→GTG (Glu→Val) pada kodon 6 β-globin')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'mRNA is read in non-overlapping triplets (codons) from the start codon AUG; 61 codons specify amino acids and UAA, UAG, UGA are stops.',
        'A substitution changes one codon: silent (same amino acid), missense (different amino acid) or nonsense (new stop codon).',
        'The genetic code is degenerate, so many third-base substitutions are silent.',
        'A one- or two-base insertion or deletion shifts the reading frame and changes every downstream codon; a three-base change keeps the frame.',
        'Where a mutation falls matters more than its size: the single-base sickle-cell substitution (Glu → Val) changes haemoglobin\'s behaviour, while a frameshift near the start usually destroys the protein.',
      ],
      id: [
        'mRNA dibaca dalam triplet (kodon) yang tidak tumpang tindih dari kodon awal AUG; 61 kodon menentukan asam amino dan UAA, UAG, UGA adalah stop.',
        'Substitusi mengubah satu kodon: diam (asam amino sama), missense (asam amino berbeda) atau nonsense (kodon stop baru).',
        'Kode genetik berdegenerasi, sehingga banyak substitusi basa ketiga bersifat diam.',
        'Insersi atau delesi satu atau dua basa menggeser kerangka baca dan mengubah semua kodon di hilir; perubahan tiga basa mempertahankan kerangka.',
        'Letak mutasi lebih penting daripada ukurannya: substitusi satu basa sel sabit (Glu → Val) mengubah perilaku hemoglobin, sementara pergeseran kerangka di dekat awal biasanya merusak protein.',
      ],
    },
    vocabulary: {
      en: [
        ['Codon', 'A sequence of three mRNA bases that specifies one amino acid or a stop signal.'],
        ['Reading frame', 'The way a sequence is divided into triplets, set by the position of the start codon.'],
        ['Point mutation (substitution)', 'Replacement of one base by another; it changes a single codon.'],
        ['Silent mutation', 'A substitution that does not change the amino acid because the new codon is synonymous.'],
        ['Missense mutation', 'A substitution that changes one amino acid to another.'],
        ['Nonsense mutation', 'A substitution that creates a stop codon, truncating the protein.'],
        ['Frameshift mutation', 'An insertion or deletion of a number of bases not divisible by three, which shifts the reading frame.'],
        ['Degenerate code', 'The property that most amino acids are encoded by more than one codon.'],
      ],
      id: [
        ['Kodon', 'Urutan tiga basa mRNA yang menentukan satu asam amino atau sinyal stop.'],
        ['Kerangka baca', 'Cara urutan dibagi menjadi triplet, ditentukan oleh posisi kodon awal.'],
        ['Mutasi titik (substitusi)', 'Penggantian satu basa oleh basa lain; mengubah satu kodon.'],
        ['Mutasi diam', 'Substitusi yang tidak mengubah asam amino karena kodon baru bersinonim.'],
        ['Mutasi missense', 'Substitusi yang mengubah satu asam amino menjadi yang lain.'],
        ['Mutasi nonsense', 'Substitusi yang membuat kodon stop, memotong protein.'],
        ['Mutasi pergeseran kerangka', 'Insersi atau delesi sejumlah basa yang tidak habis dibagi tiga, yang menggeser kerangka baca.'],
        ['Kode berdegenerasi', 'Sifat bahwa sebagian besar asam amino dikodekan oleh lebih dari satu kodon.'],
      ],
    },
    misconceptions: {
      en: [
        ['Every mutation changes the protein.', 'Many substitutions are silent because of the degenerate code, and some missense changes swap chemically similar amino acids with little effect.'],
        ['Bigger changes to DNA always do more damage.', 'Deleting one base (a frameshift) usually wrecks the protein, while deleting three bases removes one amino acid and may be harmless. The sickle-cell disease comes from a single base.'],
        ['A mutation at the end of a gene does not matter.', 'A substitution that destroys the stop codon makes the ribosome read on into the next sequence, lengthening the protein; and frameshifts near the end still change the final amino acids.'],
        ['Mutations are always harmful.', 'Most are neutral, some are harmful and a few are beneficial; mutation is the raw material of variation on which natural selection acts.'],
      ],
      id: [
        ['Setiap mutasi mengubah protein.', 'Banyak substitusi bersifat diam karena kode berdegenerasi, dan beberapa perubahan missense menukar asam amino yang secara kimia serupa dengan efek kecil.'],
        ['Perubahan DNA yang lebih besar selalu lebih merusak.', 'Menghapus satu basa (pergeseran kerangka) biasanya merusak protein, sementara menghapus tiga basa menghilangkan satu asam amino dan mungkin tidak berbahaya. Penyakit sel sabit berasal dari satu basa.'],
        ['Mutasi di ujung gen tidak penting.', 'Substitusi yang merusak kodon stop membuat ribosom terus membaca ke urutan berikutnya, memanjangkan protein; dan pergeseran kerangka di dekat ujung tetap mengubah asam amino terakhir.'],
        ['Mutasi selalu merugikan.', 'Sebagian besar netral, beberapa merugikan dan sedikit menguntungkan; mutasi adalah bahan baku variasi yang dikerjakan seleksi alam.'],
      ],
    },
    realWorld: {
      en: [
        'Sickle-cell disease affects millions of people worldwide; carriers of one copy are partly protected against malaria, which is why the allele is common in malarial regions.',
        'About 70% of cystic fibrosis cases are caused by a three-base deletion (ΔF508) that removes one phenylalanine from the CFTR protein without shifting the frame.',
        'Many cancers begin with point mutations in genes such as TP53 or KRAS that change a single amino acid in a growth-control protein.',
        'Genetic testing reads a patient\'s DNA sequence and classifies each variant exactly as this sim does: silent, missense, nonsense or frameshift.',
        'Gene therapies approved for sickle-cell disease edit or replace the HBB gene in the patient\'s own blood stem cells.',
      ],
      id: [
        'Penyakit sel sabit memengaruhi jutaan orang di seluruh dunia; pembawa satu salinan sebagian terlindung dari malaria, itulah sebabnya alelnya umum di daerah malaria.',
        'Sekitar 70% kasus fibrosis kistik disebabkan delesi tiga basa (ΔF508) yang menghilangkan satu fenilalanin dari protein CFTR tanpa menggeser kerangka.',
        'Banyak kanker bermula dari mutasi titik pada gen seperti TP53 atau KRAS yang mengubah satu asam amino pada protein pengendali pertumbuhan.',
        'Pengujian genetik membaca urutan DNA pasien dan mengklasifikasikan setiap varian persis seperti simulasi ini: diam, missense, nonsense atau pergeseran kerangka.',
        'Terapi gen yang disetujui untuk penyakit sel sabit menyunting atau mengganti gen HBB pada sel punca darah pasien sendiri.',
      ],
    },
    questions: {
      en: [
        { q: 'The codon CAC (His) is changed to CAU by a substitution at its third base. Classify the mutation and explain.', a: 'Silent. CAC and CAU both encode histidine; the third base of many codons can change without altering the amino acid because the code is degenerate.' },
        { q: 'A gene of 300 bases loses one base at position 10. Roughly how much of the protein is affected, and why is this worse than losing three bases?', a: 'Everything from codon 4 onwards (about 97 of 100 codons) is read in a shifted frame, so almost all downstream amino acids change and a premature stop usually appears. Losing three bases keeps the frame and removes just one amino acid.' },
        { q: 'In β-globin the change GAG → GTG replaces glutamate with valine. Why does this one change cause disease when many missense mutations are harmless?', a: 'Glutamate is charged and sits on the protein surface; valine is hydrophobic. The hydrophobic patch makes deoxygenated haemoglobin molecules stick together into fibres that deform red blood cells. The effect depends on where the amino acid is and how different the new one is chemically.' },
      ],
      id: [
        { q: 'Kodon CAC (His) berubah menjadi CAU oleh substitusi pada basa ketiganya. Klasifikasikan mutasinya dan jelaskan.', a: 'Diam. CAC dan CAU keduanya mengodekan histidin; basa ketiga banyak kodon dapat berubah tanpa mengubah asam amino karena kode berdegenerasi.' },
        { q: 'Gen sepanjang 300 basa kehilangan satu basa pada posisi 10. Kira-kira seberapa banyak protein yang terpengaruh, dan mengapa ini lebih buruk daripada kehilangan tiga basa?', a: 'Semua dari kodon 4 ke hilir (sekitar 97 dari 100 kodon) dibaca dalam kerangka yang bergeser, sehingga hampir semua asam amino di hilir berubah dan stop prematur biasanya muncul. Kehilangan tiga basa mempertahankan kerangka dan hanya menghapus satu asam amino.' },
        { q: 'Pada β-globin perubahan GAG → GTG mengganti glutamat dengan valin. Mengapa satu perubahan ini menyebabkan penyakit padahal banyak mutasi missense tidak berbahaya?', a: 'Glutamat bermuatan dan berada di permukaan protein; valin hidrofobik. Bidang hidrofobik membuat molekul hemoglobin terdeoksigenasi saling menempel menjadi serat yang mengubah bentuk sel darah merah. Efeknya bergantung pada letak asam amino dan seberapa beda sifat kimia penggantinya.' },
      ],
    },
  },
};
