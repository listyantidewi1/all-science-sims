// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Explain the assign and update steps of k-means.',
      'See how initialization affects the final clusters.',
      'Recognize when k-means struggles (non-spherical clusters).',
    ],
    id: [
      'Menjelaskan langkah penugasan dan pembaruan pada k-means.',
      'Melihat bagaimana inisialisasi memengaruhi klaster akhir.',
      'Mengenali kasus k-means kesulitan (klaster bukan bola).',
    ],
  },  tryThis: {
    en: [
      'Make 3 obvious blobs and run k=3 — does it converge in one round?',
      'Pick a bad initial seed — does it land in a worse local minimum?',
      'Try k=2 on data that really has 4 clusters.',
    ],
    id: [
      'Buat 3 gumpalan yang jelas dan jalankan k=3 — apakah selesai dalam 1 putaran?',
      'Pilih posisi awal yang buruk — apakah berakhir di minimum lokal yang lebih buruk?',
      'Coba k=2 pada data yang sebenarnya berisi 4 klaster.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Clustering means grouping data points so that points in the same group are close together, without anyone telling the algorithm which group each point belongs to; this is unsupervised learning. K-means is the classic method. You choose the number of groups, k, and pick k starting centres called centroids. Then two steps repeat: assign each point to its nearest centroid, and move each centroid to the mean position of the points assigned to it. When an assignment step changes nothing, the algorithm has converged. Each step can only lower the total squared distance from points to their centroids, a quantity called inertia, so the process always settles, usually within a handful of iterations.',
        'In the simulation the points live in a square. Click empty space to add a point, drag a point or even a centroid, and right-click to remove a point. The k slider (2 to 8) sets the number of centroids; "Random clusters" scatters k blobs of 30 points, and "Reinit centroids" picks k random data points as fresh starting centroids, the simple Forgy initialisation. Step runs one assign-and-update pair, and "Run to convergence" repeats until nothing changes, with a safety limit of 100 iterations. Colours show the current assignment, the ringed crosshairs are the centroids, and "converged" appears once no point changed group and no centroid moved.',
        'Initialisation matters because k-means finds a local minimum of the inertia, not necessarily the global one. If two centroids start inside the same blob they may split it between them while another blob is left to share a centroid with its neighbour, and the algorithm will happily stop there. Same data, different start, different answer. Practitioners therefore run it several times and keep the result with the lowest inertia, or use a smarter seeding such as k-means++. Choosing k is a separate judgement: inertia always falls as k rises and reaches zero when every point is its own centroid, so instead of the minimum one looks for the "elbow" where extra clusters stop paying off, which the lab lets you measure.',
        'The method has built-in assumptions. Using straight-line distance to a mean works best for roughly round clusters of similar size; stretched, ring-shaped or crescent-shaped groups get cut in the wrong places. Outliers drag means toward them. The number k must be supplied in advance. The simulation is two-dimensional with equal axes, whereas real data have many features in different units that must usually be rescaled first, or the largest-valued feature dominates the distances. If a centroid ends up with no points, the simulation simply leaves it where it is.',
      ],
      id: [
        'Klastering berarti mengelompokkan titik-titik data sehingga titik dalam satu kelompok saling berdekatan, tanpa ada yang memberi tahu algoritma kelompok mana milik tiap titik; ini pembelajaran tanpa pengawasan. K-means adalah metode klasiknya. Kamu memilih banyaknya kelompok, k, dan menetapkan k pusat awal yang disebut centroid. Lalu dua langkah berulang: tugaskan tiap titik ke centroid terdekatnya, dan pindahkan tiap centroid ke posisi rata-rata titik-titik yang ditugaskan kepadanya. Ketika langkah penugasan tidak mengubah apa pun, algoritma telah konvergen. Setiap langkah hanya bisa menurunkan total kuadrat jarak dari titik ke centroid-nya, besaran yang disebut inersia, sehingga prosesnya selalu berhenti, biasanya dalam beberapa iterasi saja.',
        'Dalam simulasi, titik-titik berada di dalam sebuah persegi. Klik ruang kosong untuk menambah titik, seret titik atau bahkan centroid, dan klik kanan untuk menghapus titik. Slider k (2 sampai 8) menentukan jumlah centroid; "Random clusters" menebar k gumpalan berisi 30 titik, dan "Reinit centroids" memilih k titik data acak sebagai centroid awal yang baru, inisialisasi Forgy yang sederhana. Step menjalankan satu pasangan penugasan dan pembaruan, dan "Run to convergence" mengulanginya sampai tidak ada yang berubah, dengan batas aman 100 iterasi. Warna menunjukkan penugasan saat ini, lingkaran bersilang adalah centroid, dan "converged" muncul begitu tidak ada titik yang berpindah kelompok dan tidak ada centroid yang bergerak.',
        'Inisialisasi penting karena k-means menemukan minimum lokal inersia, belum tentu minimum global. Jika dua centroid mulai di dalam gumpalan yang sama, keduanya bisa membagi gumpalan itu, sementara gumpalan lain terpaksa berbagi centroid dengan tetangganya, dan algoritma akan berhenti di situ dengan tenang. Data sama, awal berbeda, jawaban berbeda. Karena itu praktisi menjalankannya beberapa kali dan menyimpan hasil dengan inersia terendah, atau memakai penyemaian yang lebih cerdas seperti k-means++. Memilih k adalah pertimbangan tersendiri: inersia selalu turun saat k naik dan mencapai nol ketika setiap titik menjadi centroid-nya sendiri, jadi alih-alih mencari minimum, orang mencari "siku" tempat tambahan klaster tidak lagi berarti, yang bisa kamu ukur di lab.',
        'Metode ini punya asumsi bawaan. Memakai jarak garis lurus ke rata-rata bekerja paling baik untuk klaster yang kira-kira bulat dan berukuran serupa; kelompok yang memanjang, berbentuk cincin, atau bulan sabit akan terpotong di tempat yang salah. Pencilan menyeret rata-rata ke arahnya. Bilangan k harus diberikan di muka. Simulasi ini dua dimensi dengan sumbu yang setara, sedangkan data nyata punya banyak fitur dengan satuan berbeda yang biasanya harus diskalakan ulang dulu, jika tidak, fitur bernilai terbesar mendominasi jarak. Jika sebuah centroid tidak kebagian titik, simulasi membiarkannya di tempat.',
      ],
    },
    figure: {
      caption: {
        en: 'Six points, k = 2, starting centroids placed by hand. Left: in the assign step each point takes the colour of its nearest centroid; the update step then moves each centroid to the mean of its points (dashed arrows). Right: the next iteration changes nothing, so the algorithm stops with one centroid in each group.',
        id: 'Enam titik, k = 2, centroid awal ditempatkan secara manual. Kiri: pada langkah penugasan tiap titik mengambil warna centroid terdekatnya; langkah pembaruan lalu memindahkan tiap centroid ke rata-rata titik-titiknya (panah putus-putus). Kanan: iterasi berikutnya tidak mengubah apa pun, sehingga algoritma berhenti dengan satu centroid di tiap kelompok.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const P = (x0, u, v) => [x0 + u * 150, 32 + v * 150];
        const pts = [[0.15, 0.3], [0.25, 0.2], [0.2, 0.45], [0.7, 0.7], [0.8, 0.6], [0.75, 0.85]];
        const dot = (x0, i, col) => { const [x, y] = P(x0, ...pts[i]); return `<circle cx="${x}" cy="${y}" r="4.5" fill="${col}"/>`; };
        const cen = (x0, u, v, col) => { const [x, y] = P(x0, u, v); return `<circle cx="${x}" cy="${y}" r="7" fill="none" stroke="${col}" stroke-width="2.5"/><line x1="${x - 10}" y1="${y}" x2="${x + 10}" y2="${y}" stroke="${col}" stroke-width="2"/><line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y + 10}" stroke="${col}" stroke-width="2"/>`; };
        const arrow = (x0, a, b, col) => { const [x1, y1] = P(x0, ...a), [x2, y2] = P(x0, ...b); return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="1.6" stroke-dasharray="4 3" marker-end="url(#k)"/>`; };
        const blue = '#3b82f6', red = '#ef4444';
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('One k-means iteration and the converged result', 'Satu iterasi k-means dan hasil konvergennya')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.t{font-size:11px;font-weight:700}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}</style>
  <text x="15" y="16" class="t">${L('Iteration 1: assign, then update', 'Iterasi 1: tugaskan, lalu perbarui')}</text>
  <rect x="15" y="24" width="150" height="170" rx="6" class="m"/>
  ${dot(15, 0, blue)}${dot(15, 1, blue)}${dot(15, 2, blue)}${dot(15, 3, red)}${dot(15, 4, red)}${dot(15, 5, red)}
  ${arrow(15, [0.5, 0.1], [0.2, 0.3167], blue)}
  ${arrow(15, [0.5, 0.9], [0.75, 0.7167], red)}
  ${cen(15, 0.5, 0.1, blue)}${cen(15, 0.5, 0.9, red)}
  <text x="195" y="16" class="t">${L('Converged (iteration 2)', 'Konvergen (iterasi 2)')}</text>
  <rect x="195" y="24" width="150" height="170" rx="6" class="m"/>
  ${dot(195, 0, blue)}${dot(195, 1, blue)}${dot(195, 2, blue)}${dot(195, 3, red)}${dot(195, 4, red)}${dot(195, 5, red)}
  ${cen(195, 0.2, 0.3167, blue)}${cen(195, 0.75, 0.7167, red)}
  <text x="15" y="206" class="s">${L('Left: each centroid moves to the mean of its points', 'Kiri: tiap centroid pindah ke rata-rata titik-titiknya')}</text>
  <text x="15" y="220" class="s">${L('Right: no point changes group, so it stops', 'Kanan: tidak ada titik berpindah kelompok, berhenti')}</text>
  <text x="15" y="234" class="s">${L('inertia = sum of squared point-to-centroid distances', 'inersia = jumlah kuadrat jarak titik ke centroid-nya')}</text>
  <defs><marker id="k" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'K-means alternates two steps: assign every point to its nearest centroid, then move each centroid to the mean of its points.',
        'Each step lowers the inertia (total squared distance to centroids), so the algorithm always converges, but only to a local minimum.',
        'Different starting centroids can give different final clusters; run it several times and keep the lowest inertia.',
        'Inertia always decreases as k grows, so k is chosen by the elbow of the inertia curve or by knowledge of the data, not by minimum inertia.',
        'It works best for round clusters of similar size and is thrown off by outliers and elongated shapes.',
      ],
      id: [
        'K-means bergantian antara dua langkah: tugaskan setiap titik ke centroid terdekat, lalu pindahkan tiap centroid ke rata-rata titik-titiknya.',
        'Setiap langkah menurunkan inersia (total kuadrat jarak ke centroid), sehingga algoritma selalu konvergen, tetapi hanya ke minimum lokal.',
        'Centroid awal yang berbeda bisa memberi klaster akhir yang berbeda; jalankan beberapa kali dan simpan yang inersianya terendah.',
        'Inersia selalu turun saat k bertambah, sehingga k dipilih dari siku kurva inersia atau dari pengetahuan tentang data, bukan dari inersia minimum.',
        'Metode ini bekerja paling baik untuk klaster bulat berukuran serupa dan terganggu oleh pencilan serta bentuk memanjang.',
      ],
    },
    vocabulary: {
      en: [
        ['Cluster', 'A group of points that are closer to each other than to points in other groups.'],
        ['Centroid', 'The centre of a cluster: the mean of the positions of its points.'],
        ['Assignment step', 'Giving each point to the cluster whose centroid is nearest.'],
        ['Update step', 'Moving each centroid to the mean of the points currently assigned to it.'],
        ['Inertia (WCSS)', 'The within-cluster sum of squares: the total of squared distances from every point to its centroid.'],
        ['Convergence', 'The state in which an iteration changes no assignment and moves no centroid.'],
        ['Local minimum', 'A solution that no single step can improve, even though a better solution may exist elsewhere.'],
        ['Elbow method', 'Choosing k at the point where plotting inertia against k stops dropping steeply.'],
      ],
      id: [
        ['Klaster', 'Kelompok titik yang lebih dekat satu sama lain daripada ke titik-titik di kelompok lain.'],
        ['Centroid', 'Pusat sebuah klaster: rata-rata posisi titik-titiknya.'],
        ['Langkah penugasan', 'Memberikan tiap titik ke klaster yang centroid-nya paling dekat.'],
        ['Langkah pembaruan', 'Memindahkan tiap centroid ke rata-rata titik-titik yang saat ini ditugaskan kepadanya.'],
        ['Inersia (WCSS)', 'Jumlah kuadrat dalam klaster: total kuadrat jarak dari setiap titik ke centroid-nya.'],
        ['Konvergensi', 'Keadaan ketika satu iterasi tidak mengubah penugasan apa pun dan tidak menggerakkan centroid mana pun.'],
        ['Minimum lokal', 'Solusi yang tidak bisa diperbaiki oleh satu langkah pun, meski solusi yang lebih baik mungkin ada di tempat lain.'],
        ['Metode siku', 'Memilih k pada titik ketika grafik inersia terhadap k berhenti turun tajam.'],
      ],
    },
    misconceptions: {
      en: [
        ['K-means discovers how many clusters the data has.', 'It needs k as an input and will split the data into k groups whether or not that number is natural. Choosing k is the analyst\'s job, helped by the elbow curve.'],
        ['It always finds the best possible clustering.', 'It finds a local minimum of inertia that depends on the starting centroids. The simulation\'s "Reinit centroids" button shows that the same data can end in different groupings.'],
        ['Centroids are always real data points.', 'Only at the start, in this simulation. After the first update each centroid is a mean position, which usually coincides with no actual point.'],
        ['Running more iterations after convergence keeps improving the result.', 'Once nothing changes, further iterations do nothing. Improvement can only come from a different start or a different k.'],
      ],
      id: [
        ['K-means menemukan sendiri berapa banyak klaster dalam data.', 'Ia membutuhkan k sebagai masukan dan akan membagi data menjadi k kelompok, wajar atau tidak jumlah itu. Memilih k adalah tugas analis, dibantu kurva siku.'],
        ['Ia selalu menemukan klastering terbaik yang mungkin.', 'Ia menemukan minimum lokal inersia yang bergantung pada centroid awal. Tombol "Reinit centroids" di simulasi menunjukkan data yang sama bisa berakhir dengan pengelompokan yang berbeda.'],
        ['Centroid selalu merupakan titik data sungguhan.', 'Hanya di awal, dalam simulasi ini. Setelah pembaruan pertama tiap centroid adalah posisi rata-rata, yang biasanya tidak berimpit dengan titik mana pun.'],
        ['Menjalankan lebih banyak iterasi setelah konvergen terus memperbaiki hasil.', 'Begitu tidak ada yang berubah, iterasi selanjutnya tidak berbuat apa-apa. Perbaikan hanya bisa datang dari awal yang berbeda atau k yang berbeda.'],
      ],
    },
    realWorld: {
      en: [
        'Shops and streaming services group customers by purchase or viewing patterns to tailor recommendations and offers.',
        'Image compression reduces a photo to k representative colours by running k-means on its pixel colours.',
        'Logistics planners place k warehouses or delivery hubs at cluster centres to shorten the distance to customers.',
        'Biologists cluster gene-expression profiles or cell measurements to find groups of similar samples without prior labels.',
      ],
      id: [
        'Toko dan layanan streaming mengelompokkan pelanggan berdasarkan pola pembelian atau tontonan untuk menyesuaikan rekomendasi dan penawaran.',
        'Kompresi citra mengurangi sebuah foto menjadi k warna perwakilan dengan menjalankan k-means pada warna pikselnya.',
        'Perencana logistik menempatkan k gudang atau hub pengiriman di pusat klaster untuk memperpendek jarak ke pelanggan.',
        'Ahli biologi mengelompokkan profil ekspresi gen atau pengukuran sel untuk menemukan kelompok sampel yang serupa tanpa label sebelumnya.',
      ],
    },
    questions: {
      en: [
        { q: 'Points (1,1), (2,1), (1,2) and (8,8), (9,8), (8,9) with k = 2; centroids start at (1,1) and (2,1). Trace the algorithm.', a: 'Iteration 1: (1,1) and (1,2) are nearest to (1,1); (2,1) and all three far points are nearest to (2,1). Update: centroid A = (1, 1.5), centroid B = mean of (2,1), (8,8), (9,8), (8,9) = (6.75, 6.5). Iteration 2: (2,1) is now nearer to A, so A = (1.33, 1.33) and B = (8.33, 8.33). Iteration 3: nothing changes, converged. A poor start still recovers here because the groups are far apart.' },
        { q: 'Why can inertia never go up when k increases, and what is it when k equals the number of points?', a: 'An extra centroid can only make some points closer to their nearest centroid, never farther, so the minimum inertia falls or stays equal. With k equal to the number of points every point is its own centroid and inertia is 0. That is why minimum inertia cannot pick k and the elbow is used instead.' },
        { q: 'You make three clear blobs and set k = 3, but two centroids start in the same blob. What can happen, and how would you fix it?', a: 'That blob may be split in two while the other two blobs share one centroid sitting between them; the algorithm converges there with a higher inertia than the obvious answer. Click "Reinit centroids" and run again, keeping the lowest inertia, or use k-means++ seeding, which spreads the starting centroids apart.' },
      ],
      id: [
        { q: 'Titik (1,1), (2,1), (1,2) dan (8,8), (9,8), (8,9) dengan k = 2; centroid bermula di (1,1) dan (2,1). Telusuri algoritmanya.', a: 'Iterasi 1: (1,1) dan (1,2) paling dekat ke (1,1); (2,1) dan ketiga titik jauh paling dekat ke (2,1). Pembaruan: centroid A = (1; 1,5), centroid B = rata-rata (2,1), (8,8), (9,8), (8,9) = (6,75; 6,5). Iterasi 2: (2,1) kini lebih dekat ke A, sehingga A = (1,33; 1,33) dan B = (8,33; 8,33). Iterasi 3: tidak ada yang berubah, konvergen. Awal yang buruk tetap pulih di sini karena kelompoknya berjauhan.' },
        { q: 'Mengapa inersia tidak pernah naik ketika k bertambah, dan berapa nilainya ketika k sama dengan banyaknya titik?', a: 'Centroid tambahan hanya bisa membuat sebagian titik lebih dekat ke centroid terdekatnya, tidak pernah lebih jauh, sehingga inersia minimum turun atau tetap. Dengan k sama dengan banyaknya titik, setiap titik menjadi centroid-nya sendiri dan inersia 0. Itulah sebabnya inersia minimum tidak bisa dipakai memilih k dan metode siku yang dipakai.' },
        { q: 'Kamu membuat tiga gumpalan yang jelas dan mengatur k = 3, tetapi dua centroid bermula di gumpalan yang sama. Apa yang bisa terjadi, dan bagaimana memperbaikinya?', a: 'Gumpalan itu bisa terbelah dua sementara dua gumpalan lainnya berbagi satu centroid yang berada di antara keduanya; algoritma konvergen di situ dengan inersia lebih tinggi daripada jawaban yang jelas. Klik "Reinit centroids" dan jalankan lagi sambil menyimpan inersia terendah, atau pakai penyemaian k-means++ yang menyebarkan centroid awal saling berjauhan.' },
      ],
    },
  },
};
