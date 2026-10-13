// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect heritable variation, selection, and reproduction to allele frequency change.',
      'Predict how mutation rate and selection strength shape the rate of adaptation.',
      'Distinguish between drift and selection in small populations.',
    ],
    id: [
      'Mengaitkan variasi terwariskan, seleksi, dan reproduksi dengan perubahan frekuensi alel.',
      'Memprediksi pengaruh laju mutasi dan kekuatan seleksi terhadap kecepatan adaptasi.',
      'Membedakan hanyut genetik dan seleksi pada populasi kecil.',
    ],
  },
  tryThis: {
    en: [
      'Set the background to green — does the green trait dominate? How fast?',
      'Turn off selection — does the population still drift?',
      'Switch the background mid-run — watch the population catch up.',
    ],
    id: [
      'Atur latar belakang menjadi hijau — apakah sifat hijau mendominasi? Seberapa cepat?',
      'Matikan seleksi — apakah populasi tetap berfluktuasi?',
      'Ganti latar belakang di tengah simulasi — amati populasi mengejar.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Natural selection needs only three ingredients: individuals vary, the variation is inherited, and some variants survive and reproduce more than others. Nobody plans the outcome. In this sim each dot is a prey animal whose colour (a hue from 0° to 360°) is its only heritable trait, and the background colour stands for the habitat. An unseen predator removes animals in proportion to how much they stand out, so animals whose hue is far from the background are eaten more often and leave fewer offspring. Over many generations the colour of the whole population slides toward the background, even though no individual ever changes colour.',
        'Each generation the sim runs two phases. In the kill phase every animal is given a fitness score that falls as the hue distance from the background grows; the Selection strength slider controls how steeply it falls, and each animal survives with a probability tied to that score. In the reproduction phase the survivors copy themselves until the population is back at the Carrying capacity, and every copy inherits its parent\'s hue shifted by a small random amount set by the Mutation slider. The graph in the corner tracks the mean hue distance from the background: it drops quickly when the population is poorly matched and levels off as it approaches the optimum.',
        'Switching selection off gives every animal the same chance of surviving, so which hues persist is decided purely by luck. This is genetic drift. The mean still wanders, and in small populations it wanders a lot, because losing a few individuals by chance changes the mix noticeably; try a capacity of 20 against 200 to see the difference. With selection on, mutation plays two roles: it supplies the new variation that selection needs, but a large mutation step keeps scattering offspring away from the optimum, so the population never settles tightly on the background colour.',
        'The model is deliberately stripped down. Reproduction is asexual, so there is no mixing of parents, no genes or alleles in the usual sense, and no dominance; the hue is a single continuous trait rather than something controlled by many genes. The predator is not an agent that hunts, but a survival probability applied to everyone at once, and the environment never changes on its own. Real populations also face trade-offs, such as camouflage that costs warmth or attracts fewer mates, that this sim ignores, so treat it as a clean demonstration of the logic of selection rather than a picture of any particular species.',
      ],
      id: [
        'Seleksi alam hanya membutuhkan tiga bahan: individu beragam, keragaman itu diwariskan, dan sebagian varian bertahan serta berkembang biak lebih banyak daripada yang lain. Tidak ada yang merencanakan hasilnya. Di simulasi ini setiap titik adalah hewan mangsa yang warnanya (hue dari 0° sampai 360°) merupakan satu-satunya sifat terwariskan, dan warna latar belakang mewakili habitat. Predator yang tidak terlihat menyingkirkan hewan sebanding dengan seberapa mencolok mereka, sehingga hewan yang hue-nya jauh dari latar lebih sering dimakan dan meninggalkan lebih sedikit keturunan. Selama banyak generasi, warna seluruh populasi bergeser menuju warna latar, meskipun tidak ada satu pun individu yang berubah warna.',
        'Setiap generasi simulasi menjalankan dua fase. Pada fase pemangsaan, setiap hewan diberi skor kebugaran yang menurun seiring bertambahnya jarak hue dari latar; slider Selection strength mengatur seberapa tajam penurunannya, dan setiap hewan bertahan dengan peluang yang terkait skor itu. Pada fase reproduksi, para penyintas menyalin diri sampai populasi kembali ke Carrying capacity, dan setiap salinan mewarisi hue induknya yang digeser sedikit secara acak sebesar nilai slider Mutation. Grafik di sudut melacak rerata jarak hue dari latar: turun cepat ketika populasi belum cocok dan mendatar saat mendekati optimum.',
        'Mematikan seleksi memberi setiap hewan peluang bertahan yang sama, sehingga hue mana yang bertahan ditentukan murni oleh keberuntungan. Inilah hanyut genetik. Reratanya tetap berkelana, dan pada populasi kecil berkelananya jauh, karena kehilangan beberapa individu secara kebetulan sudah mengubah campuran secara nyata; coba kapasitas 20 dibandingkan 200 untuk melihat perbedaannya. Dengan seleksi menyala, mutasi memainkan dua peran: ia memasok variasi baru yang dibutuhkan seleksi, tetapi langkah mutasi yang besar terus menyebarkan keturunan menjauh dari optimum, sehingga populasi tidak pernah benar-benar rapat pada warna latar.',
        'Model ini sengaja dibuat sangat sederhana. Reproduksinya aseksual, sehingga tidak ada percampuran dua induk, tidak ada gen atau alel dalam arti biasa, dan tidak ada dominansi; hue adalah satu sifat kontinu, bukan sesuatu yang dikendalikan banyak gen. Predatornya bukan agen yang berburu, melainkan peluang bertahan yang diterapkan serentak ke semua, dan lingkungan tidak pernah berubah dengan sendirinya. Populasi nyata juga menghadapi tarik-ulur, misalnya kamuflase yang mengorbankan kehangatan atau mengurangi daya tarik pasangan, yang diabaikan simulasi ini, jadi anggaplah ini demonstrasi bersih tentang logika seleksi, bukan gambaran spesies tertentu.',
      ],
    },
    figure: {
      caption: {
        en: 'The spread of colours in the population over generations. Predators remove the poorly matched individuals (shaded), survivors reproduce with small mutations, and the distribution narrows around the background hue. No individual changes colour; the population changes because of who survives.',
        id: 'Sebaran warna dalam populasi selama beberapa generasi. Predator menyingkirkan individu yang kurang cocok (daerah berarsir), penyintas berkembang biak dengan mutasi kecil, dan sebaran menyempit di sekitar hue latar. Tidak ada individu yang berubah warna; populasi berubah karena siapa yang bertahan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Colour distribution narrowing toward the background over generations', 'Sebaran warna yang menyempit menuju warna latar selama beberapa generasi')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1.2}</style>
  <rect x="30" y="86" width="300" height="124" fill="#ef4444" opacity=".08"/>
  <rect x="100" y="86" width="60" height="124" fill="#10b981" opacity=".14"/>
  <line x1="30" y1="210" x2="330" y2="210" class="m"/>
  <line x1="30" y1="86" x2="30" y2="210" class="m"/>
  <line x1="130" y1="86" x2="130" y2="210" stroke="#10b981" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="94" y="80" fill="#10b981" font-weight="700">${L('background hue', 'hue latar')}</text>
  <polyline fill="none" stroke="currentColor" stroke-width="1.6" opacity=".5" points="30,196.9 60,194.7 90,191 110,188.9 130,188 150,188.9 170,191 200,194.7 230,196.9 270,197.9 330,198"/>
  <polyline fill="none" stroke="#3b82f6" stroke-width="1.8" points="30,210 60,209.5 75,207 85,202.7 95,195.1 105,184.4 115,173.2 125,166 130,165 135,166 145,173.2 155,184.4 165,195.1 175,202.7 185,207 200,209.5 230,210 330,210"/>
  <polyline fill="none" stroke="#8b5cf6" stroke-width="2.4" points="30,210 100,209.9 105,209.2 110,205.8 115,194.7 120,171.6 125,143.4 130,130 135,143.4 140,171.6 145,194.7 150,205.8 155,209.2 160,209.9 330,210"/>
  <text x="236" y="186" class="s" opacity=".7">${L('gen 0: all hues equally common', 'gen 0: semua hue sama banyak')}</text>
  <text x="170" y="170" fill="#3b82f6" class="s">${L('gen 10', 'gen 10')}</text>
  <text x="140" y="134" fill="#8b5cf6" class="s">${L('gen 30', 'gen 30')}</text>
  <text x="32" y="224" class="s">0°</text>
  <text x="318" y="224" class="s">360°</text>
  <text x="128" y="224" class="s">${L('hue of individuals', 'hue individu')}</text>
  <text x="2" y="150" class="s" transform="rotate(-90 10 150)">${L('number of animals', 'jumlah hewan')}</text>
  <text x="222" y="104" fill="#ef4444" class="s">${L('far from background:', 'jauh dari latar:')}</text>
  <text x="222" y="116" fill="#ef4444" class="s">${L('eaten more often', 'lebih sering dimakan')}</text>
  <rect x="30" y="14" width="88" height="40" rx="6" fill="#3b82f6" opacity=".18"/>
  <text x="38" y="30" class="s">${L('1. variation', '1. variasi')}</text>
  <text x="38" y="44" class="s">${L('(mutation)', '(mutasi)')}</text>
  <path d="M120 34 L132 34" class="m" marker-end="url(#a)"/>
  <rect x="136" y="14" width="88" height="40" rx="6" fill="#ef4444" opacity=".18"/>
  <text x="144" y="30" class="s">${L('2. selection', '2. seleksi')}</text>
  <text x="144" y="44" class="s">${L('(predator)', '(predator)')}</text>
  <path d="M226 34 L238 34" class="m" marker-end="url(#a)"/>
  <rect x="242" y="14" width="88" height="40" rx="6" fill="#10b981" opacity=".18"/>
  <text x="250" y="30" class="s">${L('3. inheritance', '3. pewarisan')}</text>
  <text x="250" y="44" class="s">${L('(survivors breed)', '(penyintas beranak)')}</text>
  <path d="M286 56 L286 64 L74 64 L74 58" class="m" marker-end="url(#a)"/>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Natural selection requires variation, inheritance and differences in survival or reproduction; given those, adaptation follows automatically.',
        'Individuals do not adapt; populations change because better-matched individuals leave more offspring.',
        'Stronger selection moves the population faster, and the pace slows as the population nears the optimum.',
        'Mutation supplies the raw variation selection acts on, but large mutation steps keep the population from matching the background tightly.',
        'With selection off, traits still change by chance (genetic drift), and the effect is strongest in small populations.',
      ],
      id: [
        'Seleksi alam membutuhkan variasi, pewarisan, dan perbedaan dalam bertahan hidup atau berkembang biak; jika ketiganya ada, adaptasi terjadi dengan sendirinya.',
        'Individu tidak beradaptasi; populasi berubah karena individu yang lebih cocok meninggalkan lebih banyak keturunan.',
        'Seleksi yang lebih kuat menggerakkan populasi lebih cepat, dan lajunya melambat saat populasi mendekati optimum.',
        'Mutasi memasok variasi mentah yang digarap seleksi, tetapi langkah mutasi yang besar menghalangi populasi menyamai latar dengan rapat.',
        'Dengan seleksi dimatikan, sifat tetap berubah karena kebetulan (hanyut genetik), dan efeknya paling kuat pada populasi kecil.',
      ],
    },
    vocabulary: {
      en: [
        ['Natural selection', 'The process by which individuals with traits suited to their environment survive and reproduce more, making those traits more common.'],
        ['Fitness', 'An individual\'s expected contribution of offspring to the next generation; in the sim it falls as hue distance from the background grows.'],
        ['Heritable variation', 'Differences between individuals that are passed from parent to offspring.'],
        ['Mutation', 'A random change in an inherited trait; in the sim, a small random shift in hue each time an animal reproduces.'],
        ['Adaptation', 'A trait that has become common because it improves survival or reproduction in a particular environment.'],
        ['Genetic drift', 'Change in a population\'s traits caused by chance alone, noticeable mainly in small populations.'],
        ['Carrying capacity', 'The maximum population the environment supports; the sim refills to this number every generation.'],
        ['Directional selection', 'Selection that favours one end of a trait\'s range, shifting the population mean toward it.'],
      ],
      id: [
        ['Seleksi alam', 'Proses ketika individu dengan sifat yang sesuai lingkungannya lebih banyak bertahan dan berkembang biak, sehingga sifat itu menjadi lebih umum.'],
        ['Kebugaran (fitness)', 'Sumbangan keturunan yang diharapkan dari seorang individu ke generasi berikutnya; di simulasi, menurun seiring bertambahnya jarak hue dari latar.'],
        ['Variasi terwariskan', 'Perbedaan antar-individu yang diturunkan dari induk ke keturunan.'],
        ['Mutasi', 'Perubahan acak pada sifat yang diwariskan; di simulasi, pergeseran hue kecil secara acak setiap kali hewan berkembang biak.'],
        ['Adaptasi', 'Sifat yang menjadi umum karena meningkatkan peluang bertahan atau berkembang biak di lingkungan tertentu.'],
        ['Hanyut genetik', 'Perubahan sifat populasi yang disebabkan kebetulan semata, terutama terlihat pada populasi kecil.'],
        ['Daya dukung', 'Populasi maksimum yang ditopang lingkungan; simulasi mengisi ulang sampai jumlah ini setiap generasi.'],
        ['Seleksi terarah', 'Seleksi yang menguntungkan satu ujung rentang sifat, menggeser rerata populasi ke arah itu.'],
      ],
    },
    misconceptions: {
      en: [
        ['Animals change their colour to match the background because they need to.', 'No individual changes. Each animal keeps the colour it was born with; the population shifts because mismatched animals are eaten and leave fewer offspring.'],
        ['Mutations happen in order to help the organism.', 'Mutations are random with respect to need. In the sim, offspring are just as likely to shift away from the background as toward it; selection, not mutation, provides the direction.'],
        ['Evolution always produces perfectly adapted organisms.', 'Mutation keeps reintroducing variation, chance removes some well-matched individuals, and environments change. The sim\'s population hovers near the optimum but never sits exactly on it.'],
        ['If selection is turned off, the population stays the same.', 'Random survival and random mutation still change which hues are present. This drift is small in large populations but can be dramatic in small ones.'],
      ],
      id: [
        ['Hewan mengubah warnanya agar sesuai latar karena membutuhkannya.', 'Tidak ada individu yang berubah. Setiap hewan mempertahankan warna lahirnya; populasi bergeser karena hewan yang tidak cocok dimakan dan meninggalkan lebih sedikit keturunan.'],
        ['Mutasi terjadi untuk membantu organisme.', 'Mutasi bersifat acak terhadap kebutuhan. Di simulasi, keturunan sama mungkinnya bergeser menjauhi latar maupun mendekatinya; seleksi, bukan mutasi, yang memberi arah.'],
        ['Evolusi selalu menghasilkan organisme yang beradaptasi sempurna.', 'Mutasi terus memunculkan variasi baru, kebetulan menyingkirkan sebagian individu yang cocok, dan lingkungan berubah. Populasi di simulasi berkisar dekat optimum tetapi tidak pernah tepat di atasnya.'],
        ['Jika seleksi dimatikan, populasi tetap sama.', 'Bertahan hidup secara acak dan mutasi acak tetap mengubah hue mana yang ada. Hanyut ini kecil pada populasi besar tetapi bisa dramatis pada populasi kecil.'],
      ],
    },
    realWorld: {
      en: [
        'Peppered moths in industrial England shifted from pale to dark forms as soot blackened tree trunks, and shifted back after clean-air laws, a classic case of selection by visual predators.',
        'Rock pocket mice in the American Southwest are sandy-coloured on desert sand but dark on old lava flows only a few kilometres away, matching each background.',
        'Bacteria evolve antibiotic resistance by exactly this logic: the drug is the "predator", and the few cells that happen to tolerate it repopulate the patient.',
        'Island populations are small, so genetic drift is strong there; this is one reason isolated islands often have unusual species.',
      ],
      id: [
        'Ngengat Biston betularia di Inggris era industri bergeser dari bentuk pucat ke bentuk gelap ketika jelaga menghitamkan batang pohon, dan bergeser kembali setelah undang-undang udara bersih, kasus klasik seleksi oleh predator visual.',
        'Tikus kantong batu di barat daya Amerika berwarna pasir di gurun berpasir tetapi gelap di aliran lava tua yang hanya beberapa kilometer jauhnya, menyamai masing-masing latarnya.',
        'Bakteri mengembangkan resistansi antibiotik dengan logika yang sama persis: obat adalah "predator"-nya, dan sedikit sel yang kebetulan tahan akan mengisi kembali tubuh pasien.',
        'Populasi di pulau berukuran kecil, sehingga hanyut genetik kuat di sana; ini salah satu alasan pulau-pulau terpencil sering memiliki spesies yang tidak biasa.',
      ],
    },
    questions: {
      en: [
        { q: 'The population has matched a green background for 30 generations. You switch the background to blue. Describe what the mean-distance graph will do and why.', a: 'It jumps up at once, because the whole population is now far from the new background, then falls over the following generations as the bluer offspring survive more often. The population has to re-adapt; nothing about its past match helps it.' },
        { q: 'Two runs use the same settings except carrying capacity: 20 versus 200. With selection off, which population\'s mean hue wanders more, and why?', a: 'The population of 20. Each generation random survival removes a sizeable fraction of a small population, so the mix of hues changes a lot by chance alone. In the population of 200 the random losses average out.' },
        { q: 'Mutation is set to 0. Selection is on. What happens to the population after many generations, and what does this show about the role of mutation?', a: 'The population converges on whichever starting hues happen to be closest to the background and then stops changing, because without mutation no new colours can appear. Mutation is the source of the variation that selection needs to keep improving the match.' },
      ],
      id: [
        { q: 'Populasi sudah menyamai latar hijau selama 30 generasi. Kamu mengganti latar menjadi biru. Gambarkan apa yang terjadi pada grafik rerata jarak dan mengapa.', a: 'Grafik langsung melonjak, karena seluruh populasi kini jauh dari latar yang baru, lalu turun pada generasi-generasi berikutnya saat keturunan yang lebih biru lebih sering bertahan. Populasi harus beradaptasi ulang; kecocokannya di masa lalu tidak membantu sama sekali.' },
        { q: 'Dua simulasi memakai pengaturan yang sama kecuali daya dukung: 20 dan 200. Dengan seleksi dimatikan, rerata hue populasi mana yang lebih banyak berkelana, dan mengapa?', a: 'Populasi 20. Setiap generasi, bertahan hidup secara acak menyingkirkan sebagian besar dari populasi kecil, sehingga campuran hue banyak berubah hanya karena kebetulan. Pada populasi 200 kehilangan acak itu saling merata.' },
        { q: 'Mutasi diatur ke 0. Seleksi menyala. Apa yang terjadi pada populasi setelah banyak generasi, dan apa yang ditunjukkan ini tentang peran mutasi?', a: 'Populasi mengumpul pada hue awal mana pun yang kebetulan paling dekat dengan latar, lalu berhenti berubah, karena tanpa mutasi tidak ada warna baru yang bisa muncul. Mutasi adalah sumber variasi yang dibutuhkan seleksi untuk terus memperbaiki kecocokan.' },
      ],
    },
  },
};
