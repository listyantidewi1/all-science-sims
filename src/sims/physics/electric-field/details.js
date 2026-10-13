// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read direction and density of field lines as field strength.',
      'Apply superposition: total field is the vector sum of contributions.',
      'Connect field-line patterns to charge sign and distance.',
    ],
    id: [
      'Membaca arah dan kerapatan garis medan sebagai kuat medan.',
      'Menerapkan superposisi: medan total adalah jumlah vektor kontribusi.',
      'Mengaitkan pola garis medan dengan tanda dan jarak muatan.',
    ],
  },
  tryThis: {
    en: [
      'Place two equal positive charges — find the point where the field is zero.',
      'Build a dipole and rotate it by dragging one charge in a circle.',
      'Toggle equipotentials — where do they cluster densely?',
    ],
    id: [
      'Tempatkan dua muatan positif sama besar — cari titik di mana medannya nol.',
      'Buat dipol dan putar dengan menyeret satu muatan dalam lingkaran.',
      'Aktifkan ekipotensial — di mana garisnya rapat?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Electric charges push and pull on each other across empty space. Coulomb\'s law gives the force between two point charges, F = k q1 q2 / r², and the field concept turns this into a property of space itself: the electric field E at a point is the force a small positive test charge would feel there, divided by its charge. A single point charge q therefore produces a field of magnitude E = k q / r² that points away from a positive charge and toward a negative one. Fields from several charges simply add as vectors; this is the superposition principle, and it is the whole engine of the simulation.',
        'Three pictures of the same field are offered. Field lines start on positive charges and end on negative ones (or run off to infinity); at every point the line is tangent to E, and lines are drawn closer together where the field is stronger. The vector grid shows E directly, with arrow length growing with strength. The potential heatmap shows the electric potential V, the energy per unit charge, which for point charges adds as V = k q / r. Equipotential contours join points of equal V, and the field is always perpendicular to them, pointing from high V to low V and strongest where contours are packed tightly.',
        'In the sim, clicking adds a charge of the chosen sign, dragging moves it, right-clicking removes it, and scrolling over a charge changes its magnitude from 0.5 to 5 units. The field probe at the cursor shows the direction and size of E at that point in the sim\'s own units. Two equal positive charges produce a point midway between them where the two fields cancel exactly, while a positive and a negative charge (a dipole) produce the classic looped pattern whose lines leave the positive charge and curve round to the negative one.',
        'The simulation is a static, two-dimensional snapshot: charges do not move in response to the forces on them, and there are no units, so the numbers are relative. Each charge is drawn with the same number of field lines regardless of its magnitude, so compare line density around one charge rather than between charges, and remember that in a flat drawing of a three-dimensional 1/r² field the line spacing only grows roughly in proportion to distance. The field is slightly softened very close to each charge to avoid infinite values.',
      ],
      id: [
        'Muatan listrik saling mendorong dan menarik melintasi ruang kosong. Hukum Coulomb memberikan gaya antara dua muatan titik, F = k q1 q2 / r², dan konsep medan mengubahnya menjadi sifat ruang itu sendiri: medan listrik E di suatu titik adalah gaya yang akan dirasakan muatan uji positif kecil di titik itu, dibagi muatannya. Sebuah muatan titik q menghasilkan medan sebesar E = k q / r² yang mengarah menjauhi muatan positif dan menuju muatan negatif. Medan dari beberapa muatan dijumlahkan sebagai vektor; inilah prinsip superposisi, dan inilah mesin utama simulasi ini.',
        'Tersedia tiga gambaran untuk medan yang sama. Garis medan berawal di muatan positif dan berakhir di muatan negatif (atau menuju tak hingga); di setiap titik garis menyinggung E, dan garis digambar lebih rapat di tempat medan lebih kuat. Kisi vektor menampilkan E secara langsung, dengan panjang panah yang bertambah sesuai kekuatan medan. Peta panas potensial menampilkan potensial listrik V, yaitu energi per satuan muatan, yang untuk muatan titik dijumlahkan sebagai V = k q / r. Kontur ekipotensial menghubungkan titik-titik dengan V sama, dan medan selalu tegak lurus terhadapnya, mengarah dari V tinggi ke V rendah serta paling kuat di tempat kontur paling rapat.',
        'Di simulasi, klik menambahkan muatan dengan tanda yang dipilih, menyeret memindahkannya, klik kanan menghapusnya, dan menggulir di atas muatan mengubah besarnya dari 0,5 sampai 5 satuan. Probe medan di kursor menunjukkan arah dan besar E di titik itu dalam satuan simulasi. Dua muatan positif sama besar menghasilkan satu titik di tengah-tengahnya tempat kedua medan saling meniadakan, sedangkan muatan positif dan negatif (dipol) menghasilkan pola lengkung klasik yang garisnya keluar dari muatan positif dan melengkung menuju muatan negatif.',
        'Simulasi ini adalah potret statis dua dimensi: muatan tidak bergerak menanggapi gaya yang bekerja padanya, dan tidak ada satuan, sehingga angkanya bersifat relatif. Setiap muatan digambar dengan jumlah garis medan yang sama apa pun besarnya, jadi bandingkan kerapatan garis di sekitar satu muatan, bukan antarmuatan, dan ingat bahwa pada gambar datar dari medan 1/r² tiga dimensi, jarak antargaris hanya bertambah kira-kira sebanding dengan jarak. Medan sedikit dihaluskan sangat dekat dengan tiap muatan untuk menghindari nilai tak hingga.',
      ],
    },
    figure: {
      caption: {
        en: 'Superposition at point P above a dipole: the field from +q points away from it, the field from −q points toward it, and their vector sum is the total field, which is tangent to the field line through P.',
        id: 'Superposisi di titik P di atas sebuah dipol: medan dari +q mengarah menjauhinya, medan dari −q mengarah menujunya, dan jumlah vektornya adalah medan total, yang menyinggung garis medan yang melalui P.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Dipole field and superposition at a point', 'Medan dipol dan superposisi di satu titik')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}</style>
  <path d="M120 120 Q180 0 240 120" class="m"/>
  <path d="M120 120 Q180 70 240 120" class="m"/>
  <line x1="120" y1="120" x2="240" y2="120" class="m"/>
  <path d="M120 120 Q180 170 240 120" class="m"/>
  <path d="M120 120 Q180 240 240 120" class="m"/>
  <path d="M120 120 Q60 40 100 10" class="m"/>
  <path d="M120 120 Q60 200 100 230" class="m"/>
  <path d="M240 120 Q300 40 260 10" class="m"/>
  <path d="M240 120 Q300 200 260 230" class="m"/>
  <path d="M120 120 Q40 120 20 100" class="m"/>
  <path d="M240 120 Q320 120 340 100" class="m"/>
  <circle cx="120" cy="120" r="13" fill="#ef4444"/>
  <text x="115" y="125" fill="#fff" font-weight="bold">+</text>
  <circle cx="240" cy="120" r="13" fill="#3b82f6"/>
  <text x="235" y="125" fill="#fff" font-weight="bold">−</text>
  <circle cx="180" cy="60" r="3.5" fill="currentColor"/>
  <text x="170" y="52">P</text>
  <line x1="180" y1="60" x2="208" y2="32" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="212" y="30" fill="#ef4444">E ${L('from', 'dari')} +q</text>
  <line x1="180" y1="60" x2="208" y2="88" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <text x="212" y="100" fill="#3b82f6">E ${L('from', 'dari')} −q</text>
  <line x1="208" y1="32" x2="236" y2="60" class="m" stroke-dasharray="3 3"/>
  <line x1="208" y1="88" x2="236" y2="60" class="m" stroke-dasharray="3 3"/>
  <line x1="180" y1="60" x2="236" y2="60" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="244" y="64" fill="#10b981">E total</text>
  <text x="14" y="222">${L('lines leave + and end on −', 'garis keluar dari + dan berakhir di −')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The field of a point charge has magnitude E = k q / r², pointing away from positive charge and toward negative charge.',
        'Fields from several charges add as vectors (superposition); field lines are tangent to the total field.',
        'Field lines never cross, start on positive charges, end on negative ones, and are densest where the field is strongest.',
        'Potential adds as a plain number, V = k q / r, and the field points downhill in V, perpendicular to equipotential lines.',
        'Where E is zero, V need not be zero, and vice versa: midway between two equal positive charges E = 0 but V is large.',
      ],
      id: [
        'Medan muatan titik besarnya E = k q / r², mengarah menjauhi muatan positif dan menuju muatan negatif.',
        'Medan dari beberapa muatan dijumlahkan sebagai vektor (superposisi); garis medan menyinggung medan total.',
        'Garis medan tidak pernah berpotongan, berawal di muatan positif, berakhir di muatan negatif, dan paling rapat di tempat medan paling kuat.',
        'Potensial dijumlahkan sebagai bilangan biasa, V = k q / r, dan medan mengarah menurun dalam V, tegak lurus garis ekipotensial.',
        'Di tempat E nol, V tidak harus nol, dan sebaliknya: di tengah dua muatan positif sama besar E = 0 tetapi V besar.',
      ],
    },
    vocabulary: {
      en: [
        ['Electric field (E)', 'The force per unit charge that a small positive test charge would feel at a point; a vector with direction and size.'],
        ['Coulomb\'s law', 'The force between two point charges, F = k q1 q2 / r², attractive for opposite signs and repulsive for like signs.'],
        ['Superposition', 'The rule that the total field (or potential) from many charges is the sum of the contributions of each one alone.'],
        ['Field line', 'A curve that is tangent to E everywhere; its direction shows where a positive charge would be pushed.'],
        ['Test charge', 'An imagined charge so small that it does not disturb the field being measured.'],
        ['Dipole', 'A positive and a negative charge of equal size separated by a small distance.'],
        ['Electric potential (V)', 'Potential energy per unit charge at a point; a number, not a vector, that adds as V = k q / r for point charges.'],
        ['Equipotential', 'A line (or surface) along which V is constant; no work is needed to move a charge along it, and E is perpendicular to it.'],
      ],
      id: [
        ['Medan listrik (E)', 'Gaya per satuan muatan yang akan dirasakan muatan uji positif kecil di suatu titik; sebuah vektor dengan arah dan besar.'],
        ['Hukum Coulomb', 'Gaya antara dua muatan titik, F = k q1 q2 / r², tarik-menarik untuk tanda berlawanan dan tolak-menolak untuk tanda sama.'],
        ['Superposisi', 'Aturan bahwa medan (atau potensial) total dari banyak muatan adalah jumlah kontribusi masing-masing muatan secara terpisah.'],
        ['Garis medan', 'Kurva yang di setiap titik menyinggung E; arahnya menunjukkan ke mana muatan positif akan didorong.'],
        ['Muatan uji', 'Muatan khayal yang begitu kecil sehingga tidak mengganggu medan yang diukur.'],
        ['Dipol', 'Sepasang muatan positif dan negatif sama besar yang terpisah pada jarak kecil.'],
        ['Potensial listrik (V)', 'Energi potensial per satuan muatan di suatu titik; sebuah bilangan, bukan vektor, yang dijumlahkan sebagai V = k q / r untuk muatan titik.'],
        ['Ekipotensial', 'Garis (atau permukaan) dengan V tetap; tidak perlu usaha untuk memindahkan muatan sepanjangnya, dan E tegak lurus terhadapnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Field lines are the paths a charge would follow if released.', 'They show the direction of the force at each point, not the path. A charge with any sideways velocity curves away from the line, just as a ball thrown sideways does not fall straight down.'],
        ['The field is zero in the gaps between drawn field lines.', 'The lines are a sample of a field that fills all of space. The gaps only mean the field is weaker there, and the probe shows a non-zero value at almost every point.'],
        ['Field lines can cross where two fields meet.', 'They cannot. At any point the total field has one direction, so only one line can pass through. Where two contributions oppose each other they add to a single smaller vector, or to zero.'],
        ['Where the field is zero, the potential must be zero too.', 'Not so. Midway between two equal positive charges E cancels to zero, yet V is large and positive. Midway between the charges of a dipole V = 0, yet E is strong. E measures how fast V changes, not its value.'],
      ],
      id: [
        ['Garis medan adalah lintasan yang akan ditempuh muatan jika dilepaskan.', 'Garis medan menunjukkan arah gaya di tiap titik, bukan lintasan. Muatan yang punya kecepatan menyamping akan melengkung menjauhi garis, sama seperti bola yang dilempar ke samping tidak jatuh lurus ke bawah.'],
        ['Medan bernilai nol di celah antara garis-garis medan yang digambar.', 'Garis-garis itu hanya cuplikan dari medan yang mengisi seluruh ruang. Celah hanya berarti medannya lebih lemah di sana, dan probe menunjukkan nilai tak nol di hampir setiap titik.'],
        ['Garis medan bisa berpotongan di tempat dua medan bertemu.', 'Tidak bisa. Di titik mana pun medan total hanya punya satu arah, sehingga hanya satu garis yang bisa melewatinya. Jika dua kontribusi berlawanan, keduanya menjadi satu vektor yang lebih kecil, atau nol.'],
        ['Di tempat medan nol, potensialnya juga harus nol.', 'Tidak demikian. Di tengah dua muatan positif sama besar E saling meniadakan menjadi nol, tetapi V besar dan positif. Di tengah dipol V = 0, tetapi E kuat. E mengukur seberapa cepat V berubah, bukan nilainya.'],
      ],
    },
    realWorld: {
      en: [
        'A water molecule is an electric dipole, which is why water dissolves salts and why a charged comb attracts a thin stream of water.',
        'Inkjet printers and electrostatic paint sprayers steer charged droplets with electric fields so they land exactly where intended.',
        'Lightning rods work because the field is strongest near sharp points, where field lines crowd together, so the air there breaks down first.',
        'The membrane of every nerve cell maintains a potential difference of about 70 millivolts; nerve signals are brief changes in that potential.',
      ],
      id: [
        'Molekul air adalah dipol listrik, itulah sebabnya air melarutkan garam dan sisir bermuatan dapat menarik aliran air yang tipis.',
        'Printer inkjet dan penyemprot cat elektrostatik mengarahkan tetesan bermuatan dengan medan listrik agar mendarat tepat di tempat yang diinginkan.',
        'Penangkal petir bekerja karena medan paling kuat di dekat ujung runcing, tempat garis medan berdesakan, sehingga udara di sana lebih dulu tembus.',
        'Membran setiap sel saraf mempertahankan beda potensial sekitar 70 milivolt; sinyal saraf adalah perubahan singkat pada potensial itu.',
      ],
    },
    questions: {
      en: [
        { q: 'Two equal positive charges sit a distance apart. Where is the total field zero, and is the potential zero there as well?', a: 'Exactly midway between them: the two fields are equal in size and opposite in direction, so they cancel. The potential is not zero; both charges contribute positive k q / r, so V there is 4 k q / d for separation d.' },
        { q: 'You scroll over a charge to double its magnitude, then drag it to twice the distance from the probe. How does the probe reading change?', a: 'It halves. E = k q / r², so doubling q doubles E but doubling r divides it by four. The net factor is 2/4 = 1/2.' },
        { q: 'In the potential heatmap, why are the contour lines packed tightly near each charge and widely spaced far away?', a: 'The spacing between equipotential lines is inversely related to the field strength: a strong field means V changes quickly over a short distance. Near a charge E is large (1/r² grows fast), so equally spaced values of V are crowded together.' },
      ],
      id: [
        { q: 'Dua muatan positif sama besar berjarak tertentu. Di mana medan totalnya nol, dan apakah potensial di sana juga nol?', a: 'Tepat di tengah-tengah keduanya: kedua medan sama besar dan berlawanan arah, sehingga saling meniadakan. Potensialnya tidak nol; kedua muatan menyumbang k q / r positif, sehingga V di sana 4 k q / d untuk jarak pisah d.' },
        { q: 'Kamu menggulir di atas muatan untuk menggandakan besarnya, lalu menyeretnya ke jarak dua kali lipat dari probe. Bagaimana pembacaan probe berubah?', a: 'Menjadi setengahnya. E = k q / r², sehingga menggandakan q menggandakan E tetapi menggandakan r membaginya dengan empat. Faktor bersihnya 2/4 = 1/2.' },
        { q: 'Pada peta panas potensial, mengapa garis kontur rapat di dekat tiap muatan dan renggang jauh darinya?', a: 'Jarak antargaris ekipotensial berbanding terbalik dengan kuat medan: medan kuat berarti V berubah cepat dalam jarak pendek. Di dekat muatan E besar (1/r² tumbuh cepat), sehingga nilai-nilai V yang berselang sama menjadi berdesakan.' },
      ],
    },
  },
};
