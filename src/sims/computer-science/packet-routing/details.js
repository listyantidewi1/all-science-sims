// Long-form text for the packet routing sim page.
export default {
  objectives: {
    en: [
      'Describe how a message is split into packets that travel independently, hop by hop, and are reassembled at the destination.',
      'Read a routing table (destination, next hop, cost) and explain how Dijkstra\'s shortest-path algorithm fills it in from the link costs.',
      'Diagnose a network problem: predict how traffic reroutes when a link fails, and explain how lost packets are detected and retransmitted.',
    ],
    id: [
      'Menjelaskan bagaimana pesan dipecah menjadi paket yang bergerak sendiri-sendiri, lompatan demi lompatan, dan disusun kembali di tujuan.',
      'Membaca tabel routing (tujuan, lompatan berikutnya, biaya) dan menjelaskan bagaimana algoritma jalur terpendek Dijkstra mengisinya dari biaya tautan.',
      'Mendiagnosis masalah jaringan: memprediksi pengalihan lalu lintas saat sebuah tautan putus, dan menjelaskan bagaimana paket yang hilang terdeteksi dan dikirim ulang.',
    ],
  },
  tryThis: {
    en: [
      'Send from Home PC to Web server with 0% loss. Read the traceroute: which routers does the message pass through, and what is the total path cost?',
      'Select router "Core 1" and read its routing table. Then tap the link between ISP A and Core 3 to break it and watch the table and the packets change.',
      'Set packet loss to 20% and send 10 packets. How many were retransmitted? Turn retransmission off and send again: what arrives at the server?',
      'Break links until the Web server is unreachable from Home. How many links did it take? Repair one: does the waiting traffic recover?',
    ],
    id: [
      'Kirim dari PC rumah ke Server web dengan kehilangan 0%. Baca traceroute: router mana yang dilewati pesan, dan berapa total biaya jalurnya?',
      'Pilih router "Inti 1" dan baca tabel routingnya. Lalu sentuh tautan antara ISP A dan Inti 3 untuk memutusnya dan perhatikan tabel serta paketnya berubah.',
      'Atur kehilangan paket ke 20% dan kirim 10 paket. Berapa yang dikirim ulang? Matikan pengiriman ulang dan kirim lagi: apa yang sampai di server?',
      'Putuskan tautan sampai Server web tidak terjangkau dari Rumah. Berapa tautan yang diperlukan? Perbaiki satu: apakah lalu lintas yang menunggu pulih?',
    ],
  },

  learn: {
    background: {
      en: [
        'The Internet is a network of networks. Your device connects to a home or school router, which connects to an Internet service provider (ISP), whose routers connect to other ISPs and finally to the network where the server lives. Every device has an IP address, such as 192.168.1.10 for a PC on a home network or 203.0.113.5 for a public server; routers use the destination address to decide where to send data next. In the sim the private addresses 192.168.x.x, 172.16.x.x and 10.x.x.x belong to the home, school and ISP networks, while the servers have public addresses.',
        'Data is not sent as one long stream. The message is cut into packets, each carrying a sequence number plus the source and destination IP addresses. Packets travel independently: each router reads the destination, looks it up in its routing table and forwards the packet to the next hop, one link at a time. Routers do not know the whole route; they only know the best next step. At the destination the packets are put back in order using their sequence numbers. In the sim you can watch the letters of the message land in their slots.',
        'How does a router know the best next hop? Each link has a cost (in real networks it comes from bandwidth, delay or policy). Routers share link information and run a shortest-path algorithm, usually Dijkstra\'s, which finds the cheapest path from the router to every destination; the first hop of that path goes into the routing table. From Home PC to Web server the cheapest path is R1 → ISP A → Core 3 → Web, cost 1 + 2 + 4 + 2 = 9, even though a route through Core 1 has fewer links. When a link fails the routers recompute, and the table at Core 1 or ISP A changes within a few steps: that is rerouting, and it is why the Internet survives cable cuts.',
        'Packets can still be lost, by congestion, faulty hardware or a link that breaks while they are in flight. The Transmission Control Protocol (TCP) fixes this: the receiver acknowledges what arrived, and the sender retransmits any packet that is not acknowledged before a timeout. With retransmission on, a 20% loss rate only slows the message down; with it off, gaps stay in the message, which is how video calls (which use UDP, without retransmission) sometimes glitch instead of pausing. The traceroute tool sends probes that reveal each router along the path with its address and round-trip time, which is exactly the readout in the sim; network engineers use it to find where a connection breaks.',
      ],
      id: [
        'Internet adalah jaringan dari banyak jaringan. Perangkatmu tersambung ke router rumah atau sekolah, yang tersambung ke penyedia layanan Internet (ISP), yang router-routernya tersambung ke ISP lain dan akhirnya ke jaringan tempat server berada. Setiap perangkat punya alamat IP, misalnya 192.168.1.10 untuk PC di jaringan rumah atau 203.0.113.5 untuk server publik; router memakai alamat tujuan untuk memutuskan ke mana data dikirim berikutnya. Di simulasi, alamat privat 192.168.x.x, 172.16.x.x dan 10.x.x.x milik jaringan rumah, sekolah dan ISP, sedangkan server punya alamat publik.',
        'Data tidak dikirim sebagai satu aliran panjang. Pesan dipotong menjadi paket, masing-masing membawa nomor urut serta alamat IP sumber dan tujuan. Paket bergerak sendiri-sendiri: setiap router membaca tujuan, mencarinya di tabel routing dan meneruskan paket ke lompatan berikutnya, satu tautan pada satu waktu. Router tidak tahu seluruh rute; ia hanya tahu langkah berikutnya yang terbaik. Di tujuan paket disusun kembali berurutan memakai nomor urutnya. Di simulasi kamu bisa melihat huruf-huruf pesan mendarat di slotnya.',
        'Bagaimana router tahu lompatan berikutnya yang terbaik? Setiap tautan punya biaya (di jaringan nyata berasal dari lebar pita, tundaan atau kebijakan). Router saling berbagi informasi tautan dan menjalankan algoritma jalur terpendek, biasanya Dijkstra, yang menemukan jalur termurah dari router ke setiap tujuan; lompatan pertama jalur itu masuk ke tabel routing. Dari PC rumah ke Server web jalur termurah adalah R1 → ISP A → Inti 3 → Web, biaya 1 + 2 + 4 + 2 = 9, walaupun rute lewat Inti 1 punya lebih sedikit tautan. Saat sebuah tautan putus router menghitung ulang, dan tabel di Inti 1 atau ISP A berubah dalam beberapa langkah: itulah pengalihan rute, dan itulah sebabnya Internet tetap hidup saat kabel putus.',
        'Paket masih bisa hilang, karena kemacetan, perangkat keras rusak atau tautan yang putus saat paket sedang lewat. Transmission Control Protocol (TCP) mengatasinya: penerima mengonfirmasi apa yang tiba, dan pengirim mengirim ulang paket yang belum dikonfirmasi sebelum batas waktu. Dengan pengiriman ulang menyala, kehilangan 20% hanya memperlambat pesan; dengan mati, celah tetap ada di pesan, dan begitulah panggilan video (yang memakai UDP, tanpa pengiriman ulang) kadang tersendat alih-alih berhenti. Alat traceroute mengirim penyelidik yang mengungkap setiap router di sepanjang jalur beserta alamat dan waktu bolak-baliknya, persis bacaan di simulasi; teknisi jaringan memakainya untuk menemukan di mana koneksi putus.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: a small network with link costs. The cheapest path from PC to Server (bold) costs 1 + 2 + 2 = 5, cheaper than the two-hop path via B that costs 1 + 6 = 7. Right: router A\'s routing table built from those costs, and the packets of one message, each carrying its sequence number.',
        id: 'Kiri: jaringan kecil dengan biaya tautan. Jalur termurah dari PC ke Server (tebal) berbiaya 1 + 2 + 2 = 5, lebih murah daripada jalur dua lompatan lewat B yang berbiaya 1 + 6 = 7. Kanan: tabel routing router A yang dibangun dari biaya itu, dan paket-paket satu pesan yang masing-masing membawa nomor urutnya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Shortest path routing and a routing table', 'Routing jalur terpendek dan tabel routing')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{fill:none;stroke:currentColor;stroke-width:1.3;opacity:.6}.p{fill:none;stroke:#22d3ee;stroke-width:3}.k{font:9.5px system-ui,sans-serif;fill:currentColor;opacity:.8}.m{font:9.5px ui-monospace,monospace;fill:currentColor}.c{text-anchor:middle}</style>
  <line x1="30" y1="120" x2="90" y2="120" class="p"/><line x1="90" y1="120" x2="150" y2="60" class="p"/><line x1="150" y1="60" x2="210" y2="120" class="p"/>
  <line x1="90" y1="120" x2="150" y2="180" class="s"/><line x1="150" y1="180" x2="210" y2="120" class="s"/><line x1="150" y1="60" x2="150" y2="180" class="s"/>
  <text x="60" y="113" class="c m">1</text><text x="112" y="86" class="c m">2</text><text x="188" y="86" class="c m">2</text>
  <text x="112" y="160" class="c m">1</text><text x="188" y="160" class="c m">6</text><text x="158" y="124" class="m">3</text>
  <rect x="18" y="108" width="24" height="24" rx="3" fill="#1e293b" stroke="currentColor"/><text x="30" y="124" class="c" fill="#fff">PC</text>
  <circle cx="90" cy="120" r="12" fill="#3b2f6b" stroke="#a78bfa"/><text x="90" y="124" class="c" fill="#fff">A</text>
  <circle cx="150" cy="60" r="12" fill="#3b2f6b" stroke="#a78bfa"/><text x="150" y="64" class="c" fill="#fff">C</text>
  <circle cx="150" cy="180" r="12" fill="#3b2f6b" stroke="#a78bfa"/><text x="150" y="184" class="c" fill="#fff">B</text>
  <rect x="198" y="108" width="24" height="24" rx="3" fill="#14352a" stroke="#34d399"/><text x="210" y="124" class="c k" fill="#fff">Srv</text>
  <text x="30" y="150" class="c k">192.168.1.10</text><text x="210" y="150" class="c k">203.0.113.5</text>
  <text x="120" y="212" class="c k">${L('cheapest PC→Srv: A, C, Srv = 5', 'termurah PC→Srv: A, C, Srv = 5')}</text>
  <text x="120" y="226" class="c k">${L('via B: 1 + 6 = 7 (fewer links, higher cost)', 'lewat B: 1 + 6 = 7 (lebih sedikit tautan, biaya lebih tinggi)')}</text>
  <rect x="240" y="24" width="112" height="86" rx="4" class="s" style="opacity:1"/>
  <text x="296" y="38" class="c k">${L('Routing table of A', 'Tabel routing A')}</text>
  <text x="246" y="54" class="m">${L('dest', 'tujuan')}   ${L('next', 'lompat')}  ${L('cost', 'biaya')}</text>
  <line x1="246" y1="59" x2="346" y2="59" class="s"/>
  <text x="246" y="72" class="m">PC     PC     1</text>
  <text x="246" y="84" class="m">C      C      2</text>
  <text x="246" y="96" class="m">B      B      1</text>
  <text x="246" y="108" class="m">Srv    C      4</text>
  <text x="296" y="136" class="c k">${L('one message, four packets', 'satu pesan, empat paket')}</text>
  <rect x="244" y="144" width="24" height="18" rx="2" fill="#0e3a4a" stroke="#22d3ee"/><text x="256" y="157" class="c m" fill="#fff">#1</text>
  <rect x="272" y="144" width="24" height="18" rx="2" fill="#0e3a4a" stroke="#22d3ee"/><text x="284" y="157" class="c m" fill="#fff">#2</text>
  <rect x="300" y="144" width="24" height="18" rx="2" fill="#0e3a4a" stroke="#22d3ee"/><text x="312" y="157" class="c m" fill="#fff">#3</text>
  <rect x="328" y="144" width="24" height="18" rx="2" fill="#0e3a4a" stroke="#22d3ee"/><text x="340" y="157" class="c m" fill="#fff">#4</text>
  <text x="298" y="178" class="c k">${L('each packet: seq + source IP + dest IP + data', 'tiap paket: urut + IP sumber + IP tujuan + data')}</text>
  <text x="298" y="196" class="c k">${L('lost packet → no ACK → resend', 'paket hilang → tak ada ACK → kirim ulang')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Every device on a network has an IP address; routers forward packets toward the destination address one hop at a time.',
        'A message is split into numbered packets that may travel different paths and are reassembled in order at the destination.',
        'A routing table maps each destination to a next hop and a cost; it is filled in by a shortest-path algorithm such as Dijkstra\'s.',
        'The best path is the one with the lowest total cost, not necessarily the fewest hops.',
        'When a link fails, routers recompute their tables and traffic reroutes; if no path remains, the destination is unreachable.',
        'Reliable transport (TCP) detects lost packets by missing acknowledgements and retransmits them; traceroute reveals the path hop by hop.',
      ],
      id: [
        'Setiap perangkat di jaringan punya alamat IP; router meneruskan paket menuju alamat tujuan satu lompatan pada satu waktu.',
        'Pesan dipecah menjadi paket bernomor yang mungkin melewati jalur berbeda dan disusun kembali berurutan di tujuan.',
        'Tabel routing memetakan setiap tujuan ke lompatan berikutnya dan biaya; diisi oleh algoritma jalur terpendek seperti Dijkstra.',
        'Jalur terbaik adalah yang total biayanya terendah, belum tentu yang lompatannya paling sedikit.',
        'Saat tautan putus, router menghitung ulang tabelnya dan lalu lintas dialihkan; jika tak ada jalur tersisa, tujuan tidak terjangkau.',
        'Transport andal (TCP) mendeteksi paket hilang dari konfirmasi yang tidak datang dan mengirimnya ulang; traceroute mengungkap jalur lompatan demi lompatan.',
      ],
    },
    vocabulary: {
      en: [
        ['IP address', 'A numeric label such as 10.1.0.1 that identifies a device on a network; private ranges (10.x, 172.16.x, 192.168.x) are used inside homes, schools and ISPs.'],
        ['Packet', 'A small unit of data with a header (source, destination, sequence number) and a piece of the message.'],
        ['Router', 'A device that joins networks and forwards packets toward their destination using its routing table.'],
        ['Routing table', 'A router\'s list of destinations with the next hop and cost for each.'],
        ['Hop', 'One step of a packet\'s journey, from one router to the next.'],
        ['Link cost (metric)', 'A number assigned to a link; shortest-path routing minimises the sum of costs along a path.'],
        ['Dijkstra\'s algorithm', 'A method that finds the lowest-cost path from one node to every other node in a graph with non-negative link costs.'],
        ['Traceroute', 'A diagnostic tool that lists every router between you and a destination, with its address and delay.'],
      ],
      id: [
        ['Alamat IP', 'Label numerik seperti 10.1.0.1 yang mengidentifikasi perangkat di jaringan; rentang privat (10.x, 172.16.x, 192.168.x) dipakai di dalam rumah, sekolah dan ISP.'],
        ['Paket', 'Satuan data kecil dengan header (sumber, tujuan, nomor urut) dan sepotong pesan.'],
        ['Router', 'Perangkat yang menghubungkan jaringan dan meneruskan paket menuju tujuannya memakai tabel routing.'],
        ['Tabel routing', 'Daftar tujuan milik router beserta lompatan berikutnya dan biaya masing-masing.'],
        ['Lompatan (hop)', 'Satu langkah perjalanan paket, dari satu router ke router berikutnya.'],
        ['Biaya tautan (metrik)', 'Angka yang diberikan pada tautan; routing jalur terpendek meminimalkan jumlah biaya sepanjang jalur.'],
        ['Algoritma Dijkstra', 'Metode yang menemukan jalur berbiaya terendah dari satu simpul ke setiap simpul lain pada graf dengan biaya tautan tak negatif.'],
        ['Traceroute', 'Alat diagnosis yang mendaftar setiap router antara kamu dan tujuan, beserta alamat dan tundaannya.'],
      ],
    },
    misconceptions: {
      en: [
        ['A message travels as one piece along a fixed wire to the server.', 'It is cut into packets that are forwarded independently, hop by hop; different packets of the same message can even take different paths if the network changes mid-way.'],
        ['The shortest path is the one with the fewest routers.', 'Routers minimise total cost. In the sim Home → Core 1 → Core 3 → Web has the same number of hops as the chosen path but a higher cost, so it is not used.'],
        ['If one cable breaks, the Internet connection is simply gone.', 'Routers recompute and reroute around the failure, usually within seconds. Only when every path is cut does the destination become unreachable.'],
        ['A lost packet means the message is corrupted forever.', 'With TCP the sender notices the missing acknowledgement and resends the packet; the receiver slots it into place using the sequence number.'],
      ],
      id: [
        ['Pesan bergerak sebagai satu kesatuan lewat kabel tetap ke server.', 'Pesan dipotong menjadi paket yang diteruskan sendiri-sendiri, lompatan demi lompatan; paket-paket dari pesan yang sama bahkan bisa melewati jalur berbeda jika jaringan berubah di tengah jalan.'],
        ['Jalur terpendek adalah yang routernya paling sedikit.', 'Router meminimalkan total biaya. Di simulasi Rumah → Inti 1 → Inti 3 → Web punya jumlah lompatan yang sama dengan jalur terpilih tetapi biayanya lebih tinggi, sehingga tidak dipakai.'],
        ['Jika satu kabel putus, koneksi Internet langsung hilang.', 'Router menghitung ulang dan mengalihkan rute mengitari kerusakan, biasanya dalam hitungan detik. Hanya jika semua jalur terputus tujuan menjadi tak terjangkau.'],
        ['Paket hilang berarti pesan rusak selamanya.', 'Dengan TCP pengirim menyadari konfirmasi yang hilang dan mengirim ulang paketnya; penerima menempatkannya pada posisinya memakai nomor urut.'],
      ],
    },
    realWorld: {
      en: [
        'Undersea cable cuts (for example off Indonesia\'s coast in 2024) slowed traffic but did not stop it, because routers rerouted through other cables.',
        'Typing "tracert google.com" (Windows) or "traceroute google.com" (macOS/Linux) shows the real routers between your PC and Google, usually 10–20 hops.',
        'Video calls use UDP without retransmission, so a lost packet becomes a brief glitch; file downloads use TCP, so they pause and resume instead.',
        'ISPs choose link costs to steer traffic onto cheaper or less congested cables, which is why a path through more routers can still be preferred.',
        'Home routers hand out private 192.168.x.x addresses and translate them to one public address (NAT), so many devices share one Internet connection.',
      ],
      id: [
        'Putusnya kabel bawah laut (misalnya di lepas pantai Indonesia pada 2024) memperlambat lalu lintas tetapi tidak menghentikannya, karena router mengalihkan rute lewat kabel lain.',
        'Mengetik "tracert google.com" (Windows) atau "traceroute google.com" (macOS/Linux) menampilkan router sungguhan antara PC-mu dan Google, biasanya 10–20 lompatan.',
        'Panggilan video memakai UDP tanpa pengiriman ulang, sehingga paket hilang menjadi gangguan singkat; unduhan berkas memakai TCP, sehingga berhenti sejenak lalu lanjut.',
        'ISP memilih biaya tautan untuk mengarahkan lalu lintas ke kabel yang lebih murah atau kurang padat, itulah sebabnya jalur lewat lebih banyak router tetap bisa dipilih.',
        'Router rumah membagikan alamat privat 192.168.x.x dan menerjemahkannya ke satu alamat publik (NAT), sehingga banyak perangkat berbagi satu koneksi Internet.',
      ],
    },
    questions: {
      en: [
        { q: 'From Home PC to Web server the sim chooses R1 → ISP A → Core 3 → Web. Add up the link costs. Why is Home → R1 → Core 1 → Core 3 → Web not chosen even though it has the same number of hops?', a: 'Chosen path: 1 + 2 + 4 + 2 = 9. The alternative costs 1 + 5 + 3 + 2 = 11. Routing minimises total cost, not hop count.' },
        { q: 'You break the link ISP A – Core 3. What is the new cheapest path from Home PC to Web server and its cost?', a: 'Home → R1 → ISP A → Core 1 → Core 3 → Web: 1 + 2 + 2 + 3 + 2 = 10. One hop longer, cost up by 1.' },
        { q: 'With 20% loss per hop on a 4-hop path, roughly what fraction of packets arrive without being lost? Why does the message still complete with retransmission on?', a: 'Each hop succeeds with probability 0.8, so 0.8⁴ ≈ 0.41, about 41% arrive first time. Every lost packet times out and is resent until acknowledged, so eventually all sequence numbers arrive; it just takes longer.' },
        { q: 'Traceroute shows hops 1–3 replying but hop 4 and everything after it timing out. Where is the fault likely to be?', a: 'Between the third and fourth router (or at the fourth router itself): packets reach hop 3 but no further, so the link or device just beyond hop 3 is down or blocking traffic.' },
      ],
      id: [
        { q: 'Dari PC rumah ke Server web simulasi memilih R1 → ISP A → Inti 3 → Web. Jumlahkan biaya tautannya. Mengapa Rumah → R1 → Inti 1 → Inti 3 → Web tidak dipilih meski jumlah lompatannya sama?', a: 'Jalur terpilih: 1 + 2 + 4 + 2 = 9. Alternatifnya berbiaya 1 + 5 + 3 + 2 = 11. Routing meminimalkan total biaya, bukan jumlah lompatan.' },
        { q: 'Kamu memutus tautan ISP A – Inti 3. Apa jalur termurah baru dari PC rumah ke Server web dan berapa biayanya?', a: 'Rumah → R1 → ISP A → Inti 1 → Inti 3 → Web: 1 + 2 + 2 + 3 + 2 = 10. Satu lompatan lebih panjang, biaya naik 1.' },
        { q: 'Dengan kehilangan 20% per lompatan pada jalur 4 lompatan, kira-kira berapa bagian paket yang tiba tanpa hilang? Mengapa pesan tetap selesai dengan pengiriman ulang menyala?', a: 'Setiap lompatan berhasil dengan peluang 0,8, jadi 0,8⁴ ≈ 0,41, sekitar 41% tiba pada percobaan pertama. Setiap paket yang hilang kehabisan waktu dan dikirim ulang sampai dikonfirmasi, sehingga akhirnya semua nomor urut tiba; hanya lebih lama.' },
        { q: 'Traceroute menunjukkan lompatan 1–3 menjawab tetapi lompatan 4 dan seterusnya kehabisan waktu. Di mana kemungkinan letak gangguannya?', a: 'Antara router ketiga dan keempat (atau di router keempat sendiri): paket mencapai lompatan 3 tetapi tidak lebih jauh, sehingga tautan atau perangkat tepat setelah lompatan 3 mati atau memblokir lalu lintas.' },
      ],
    },
  },
};
