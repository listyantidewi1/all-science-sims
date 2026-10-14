// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      "Distinguish sub-threshold from supra-threshold stimuli.",
      'Explain depolarization, repolarization, and afterhyperpolarization.',
      'See refractory period — a second strong pulse close after fails to fire.',
    ],
    id: [
      'Membedakan rangsangan di bawah dan di atas ambang.',
      'Menjelaskan depolarisasi, repolarisasi, dan hiperpolarisasi.',
      'Mengamati periode refrakter — pulsa kuat kedua segera setelahnya gagal memicu.',
    ],
  },
  tryThis: {
    en: [
      'Pulse just below threshold — does the membrane spike?',
      'Click "Double pulse" (two stimuli about 5 ms apart) — does the second spike fire?',
      'Shorten the pulse width to 0.2 ms — how much stronger must the pulse be before it fires?',
    ],
    id: [
      'Beri pulsa tepat di bawah ambang — apakah membran melonjak?',
      'Klik "Double pulse" (dua rangsangan berjarak sekitar 5 ms) — apakah lonjakan kedua muncul?',
      'Persingkat lebar pulsa ke 0,2 ms — seberapa kuat pulsa harus ditambah sebelum neuron menembak?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A resting neuron keeps its inside about 70 mV more negative than the outside. The sodium-potassium pump stacks K⁺ inside and Na⁺ outside, and because the resting membrane leaks K⁺ far more easily than Na⁺, positive charge trickles out until the inside is negative. A stimulus that lets positive charge in makes the inside less negative (depolarization). If the membrane potential reaches a threshold near −55 mV, voltage-gated Na⁺ channels snap open, Na⁺ floods in and the potential shoots up to around +30 to +40 mV in under a millisecond. Those Na⁺ channels then inactivate while slower voltage-gated K⁺ channels open, K⁺ leaves, and the potential falls back (repolarization), briefly dipping below rest (afterhyperpolarization) before the K⁺ channels close.',
        'The simulation does not track every ion channel. It uses the FitzHugh-Nagumo model, a classic two-variable simplification of the Hodgkin-Huxley equations. One fast variable plays the role of the membrane potential and the Na⁺ rush; one slow "recovery" variable stands in for Na⁺ inactivation together with K⁺ activation. The dimensionless voltage is mapped onto a millivolt scale so the trace rests near −75 mV and a full spike peaks near +40 mV. Despite its simplicity this model reproduces the essentials: a threshold, an all-or-nothing spike of fixed shape, an undershoot and a refractory period. Time is slowed about 60-fold so one second on screen is roughly 60 ms of neuron time.',
        '"Pulse strength" sets the size of the injected current and "Pulse width" how long it lasts, so together they set how much charge is delivered. A weak pulse that lasts longer can still reach threshold, and a strong pulse that is very short may not. Clicking the soma or "Fire pulse" delivers the pulse; "Subthreshold" injects a small fixed current that produces only a bump that decays away. "Double pulse" fires twice about 5 ms apart in neuron time: the second arrives during the refractory period, when the recovery variable is still high, so it produces a much smaller response or none at all. The lab records the peak voltage and the time taken to cross threshold for each pulse.',
        'What the model leaves out matters. There are no separate Na⁺ and K⁺ currents, no ion concentrations and no pump, so you cannot change extracellular K⁺ or block a channel. The dashed threshold line at −55 mV is a visual guide; the model\'s real threshold emerges from its equations and is not perfectly sharp, so pulses very close to threshold can give intermediate-sized responses, which real neurons show only over a very narrow range. The whole neuron is treated as a single patch of membrane, so the spike does not travel down the axon, and there is no myelin and no synapse.',
      ],
      id: [
        'Neuron dalam keadaan istirahat menjaga bagian dalamnya sekitar 70 mV lebih negatif daripada bagian luar. Pompa natrium-kalium menumpuk K⁺ di dalam dan Na⁺ di luar, dan karena membran istirahat jauh lebih mudah dilewati K⁺ daripada Na⁺, muatan positif merembes keluar sampai bagian dalam menjadi negatif. Rangsangan yang memasukkan muatan positif membuat bagian dalam kurang negatif (depolarisasi). Jika potensial membran mencapai ambang di sekitar −55 mV, kanal Na⁺ bergerbang tegangan terbuka serentak, Na⁺ membanjir masuk, dan potensial melesat ke sekitar +30 sampai +40 mV dalam waktu kurang dari satu milidetik. Kanal Na⁺ itu kemudian terinaktivasi sementara kanal K⁺ bergerbang tegangan yang lebih lambat terbuka, K⁺ keluar, dan potensial turun kembali (repolarisasi), sejenak turun di bawah nilai istirahat (hiperpolarisasi susulan) sebelum kanal K⁺ menutup.',
        'Simulasi ini tidak melacak setiap kanal ion. Ia memakai model FitzHugh-Nagumo, penyederhanaan klasik dua variabel dari persamaan Hodgkin-Huxley. Satu variabel cepat berperan sebagai potensial membran dan serbuan Na⁺; satu variabel "pemulihan" yang lambat mewakili inaktivasi Na⁺ sekaligus aktivasi K⁺. Tegangan tak berdimensi itu dipetakan ke skala milivolt sehingga grafik beristirahat di sekitar −75 mV dan lonjakan penuh berpuncak di sekitar +40 mV. Meski sederhana, model ini mereproduksi hal-hal pokok: ambang, lonjakan "semua atau tidak" berbentuk tetap, undakan di bawah istirahat, dan periode refrakter. Waktu diperlambat sekitar 60 kali sehingga satu detik di layar setara kira-kira 60 ms waktu neuron.',
        '"Pulse strength" mengatur besar arus yang disuntikkan dan "Pulse width" lamanya, sehingga keduanya bersama-sama menentukan jumlah muatan yang disampaikan. Pulsa lemah yang lebih lama masih bisa mencapai ambang, dan pulsa kuat yang sangat singkat bisa gagal. Mengklik soma atau "Fire pulse" memberi pulsa; "Subthreshold" menyuntikkan arus kecil tetap yang hanya menghasilkan tonjolan yang lalu meluruh. "Double pulse" menembak dua kali berselang sekitar 5 ms waktu neuron: pulsa kedua tiba saat periode refrakter, ketika variabel pemulihan masih tinggi, sehingga responsnya jauh lebih kecil atau tidak ada sama sekali. Panel lab mencatat tegangan puncak dan waktu yang dibutuhkan untuk melewati ambang pada setiap pulsa.',
        'Hal-hal yang diabaikan model ini penting. Tidak ada arus Na⁺ dan K⁺ yang terpisah, tidak ada konsentrasi ion, dan tidak ada pompa, sehingga kamu tidak bisa mengubah K⁺ ekstrasel atau memblokir kanal. Garis putus-putus ambang di −55 mV hanyalah panduan visual; ambang sesungguhnya dalam model muncul dari persamaannya dan tidak sepenuhnya tajam, sehingga pulsa yang sangat dekat ambang bisa memberi respons berukuran sedang, yang pada neuron sungguhan hanya terjadi pada rentang yang sangat sempit. Seluruh neuron diperlakukan sebagai satu bidang membran, sehingga lonjakan tidak merambat sepanjang akson, dan tidak ada mielin maupun sinapsis.',
      ],
    },
    figure: {
      caption: {
        en: 'One action potential. Reaching threshold opens voltage-gated Na⁺ channels (Na⁺ in, red); their inactivation plus slower K⁺ channels (K⁺ out, blue) bring the potential back down and briefly below rest.',
        id: 'Satu potensial aksi. Tercapainya ambang membuka kanal Na⁺ bergerbang tegangan (Na⁺ masuk, merah); inaktivasinya ditambah kanal K⁺ yang lebih lambat (K⁺ keluar, biru) mengembalikan potensial ke bawah dan sejenak di bawah nilai istirahat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Membrane potential during an action potential', 'Potensial membran selama potensial aksi')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:10px;opacity:.75}</style>
  <line x1="40" y1="20" x2="40" y2="210" class="m"/>
  <line x1="40" y1="210" x2="345" y2="210" class="m"/>
  <text x="300" y="226" class="s">${L('time (ms)', 'waktu (ms)')}</text>
  <text x="6" y="60" class="s" transform="rotate(-90 6 60)">${L('mV', 'mV')}</text>
  <line x1="40" y1="60" x2="345" y2="60" class="m" stroke-dasharray="3 4"/><text x="4" y="64" class="s">+30</text>
  <line x1="40" y1="93" x2="345" y2="93" class="m" stroke-dasharray="3 4"/><text x="14" y="97" class="s">0</text>
  <line x1="40" y1="143" x2="345" y2="143" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4 4"/><text x="4" y="147" class="s">−55</text>
  <line x1="40" y1="160" x2="345" y2="160" class="m" stroke-dasharray="3 4"/><text x="4" y="164" class="s">−70</text>
  <text x="250" y="139" fill="#f59e0b" class="s">${L('threshold', 'ambang')}</text>
  <text x="250" y="172" class="s">${L('resting potential', 'potensial istirahat')}</text>
  <path d="M40 160 L90 160 L104 143 C112 110 120 60 128 60 C136 60 146 120 156 165 C166 180 180 182 200 174 C230 162 270 160 345 160" class="f" stroke="#10b981"/>
  <path d="M76 160 L82 152 L84 160" class="m" stroke="#10b981" stroke-opacity="1" stroke-width="1.5"/>
  <text x="40" y="122" class="s">${L('stimulus', 'rangsangan')}</text>
  <line x1="78" y1="128" x2="100" y2="150" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="98" y="30" fill="#ef4444">${L('Na⁺ in', 'Na⁺ masuk')}</text>
  <text x="98" y="44" class="s">${L('depolarization', 'depolarisasi')}</text>
  <text x="168" y="100" fill="#3b82f6">${L('K⁺ out', 'K⁺ keluar')}</text>
  <text x="168" y="114" class="s">${L('repolarization', 'repolarisasi')}</text>
  <text x="150" y="196" class="s">${L('afterhyperpolarization', 'hiperpolarisasi susulan')}</text>
  <line x1="104" y1="212" x2="156" y2="212" class="m" stroke="#8b5cf6" stroke-opacity="1"/>
  <text x="40" y="228" fill="#8b5cf6" class="s">${L('refractory period', 'periode refrakter')}</text>
  <line x1="104" y1="208" x2="104" y2="216" class="m" stroke="#8b5cf6" stroke-opacity="1"/>
  <line x1="200" y1="208" x2="200" y2="216" class="m" stroke="#8b5cf6" stroke-opacity="1"/>
  <line x1="156" y1="212" x2="200" y2="212" class="m" stroke="#8b5cf6" stroke-opacity="1" stroke-dasharray="3 3"/>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'An action potential is all-or-nothing: once threshold is reached the spike has the same size and shape whatever the stimulus strength.',
        'Stimulus strength is encoded in how often and how soon a neuron fires, not in how tall the spikes are.',
        'Depolarization is Na⁺ rushing in through voltage-gated channels; repolarization is K⁺ leaving through slower voltage-gated channels.',
        'During the refractory period a second stimulus fails or gives a smaller response, which limits firing rate and keeps impulses travelling one way along an axon.',
        'Only a tiny fraction of the ions move during a spike; the sodium-potassium pump restores the gradients slowly in the background.',
      ],
      id: [
        'Potensial aksi bersifat "semua atau tidak": begitu ambang tercapai, lonjakannya berukuran dan berbentuk sama apa pun kekuatan rangsangannya.',
        'Kekuatan rangsangan dikodekan dalam seberapa sering dan seberapa cepat neuron menembak, bukan dalam tinggi lonjakannya.',
        'Depolarisasi adalah Na⁺ yang menyerbu masuk lewat kanal bergerbang tegangan; repolarisasi adalah K⁺ yang keluar lewat kanal bergerbang tegangan yang lebih lambat.',
        'Selama periode refrakter, rangsangan kedua gagal atau memberi respons lebih kecil, yang membatasi laju tembakan dan menjaga impuls merambat satu arah sepanjang akson.',
        'Hanya sebagian sangat kecil ion yang berpindah saat satu lonjakan; pompa natrium-kalium memulihkan gradien perlahan di latar belakang.',
      ],
    },
    vocabulary: {
      en: [
        ['Resting potential', 'The steady voltage across the membrane of an unstimulated neuron, about −70 mV inside relative to outside.'],
        ['Threshold', 'The membrane potential, around −55 mV, at which enough voltage-gated Na⁺ channels open to trigger a full action potential.'],
        ['Depolarization', 'A change that makes the inside of the cell less negative, here driven by Na⁺ entering.'],
        ['Repolarization', 'The return of the membrane potential toward rest, driven by K⁺ leaving the cell.'],
        ['Afterhyperpolarization', 'The brief undershoot below the resting potential while K⁺ channels are still open.'],
        ['Refractory period', 'The time after a spike during which a new action potential cannot be triggered (absolute) or needs a stronger stimulus (relative).'],
        ['Voltage-gated channel', 'An ion channel that opens or closes in response to the membrane potential itself.'],
        ['All-or-nothing', 'The rule that a neuron either fires a complete spike or does not fire at all; there are no half-size action potentials.'],
      ],
      id: [
        ['Potensial istirahat', 'Tegangan tetap melintasi membran neuron yang tidak dirangsang, sekitar −70 mV di dalam relatif terhadap luar.'],
        ['Ambang', 'Potensial membran, sekitar −55 mV, ketika cukup banyak kanal Na⁺ bergerbang tegangan terbuka untuk memicu potensial aksi penuh.'],
        ['Depolarisasi', 'Perubahan yang membuat bagian dalam sel kurang negatif, di sini didorong oleh masuknya Na⁺.'],
        ['Repolarisasi', 'Kembalinya potensial membran menuju nilai istirahat, didorong oleh keluarnya K⁺ dari sel.'],
        ['Hiperpolarisasi susulan', 'Penurunan singkat di bawah potensial istirahat selagi kanal K⁺ masih terbuka.'],
        ['Periode refrakter', 'Waktu setelah lonjakan ketika potensial aksi baru tidak bisa dipicu (absolut) atau memerlukan rangsangan lebih kuat (relatif).'],
        ['Kanal bergerbang tegangan', 'Kanal ion yang membuka atau menutup sebagai respons terhadap potensial membran itu sendiri.'],
        ['Semua atau tidak', 'Aturan bahwa neuron menembakkan lonjakan utuh atau tidak menembak sama sekali; tidak ada potensial aksi setengah ukuran.'],
      ],
    },
    misconceptions: {
      en: [
        ['A stronger stimulus produces a bigger action potential.', 'Above threshold the spike has a fixed peak. Compare strength 20 and 40 in the lab: the peak is the same, but the stronger pulse reaches threshold sooner. Intensity is coded by firing frequency.'],
        ['The sodium-potassium pump causes the spike.', 'The pump works slowly and continuously to maintain the ion gradients. The spike itself is produced by voltage-gated channels letting ions run down gradients that already exist.'],
        ['During an action potential the inside of the cell fills with Na⁺ and empties of K⁺.', 'Only a minute fraction of the ions move; the concentrations barely change. The voltage swings because the membrane is so thin that a tiny charge imbalance gives a large potential difference.'],
        ['A neuron at rest has no electrical activity.', 'The resting membrane is already polarized at about −70 mV, maintained actively. Rest is a steady state, not an absence of activity.'],
      ],
      id: [
        ['Rangsangan yang lebih kuat menghasilkan potensial aksi yang lebih besar.', 'Di atas ambang, lonjakan memiliki puncak tetap. Bandingkan kekuatan 20 dan 40 di panel lab: puncaknya sama, tetapi pulsa yang lebih kuat mencapai ambang lebih cepat. Intensitas dikodekan lewat frekuensi tembakan.'],
        ['Pompa natrium-kalium yang menyebabkan lonjakan.', 'Pompa bekerja lambat dan terus-menerus untuk mempertahankan gradien ion. Lonjakan itu sendiri dihasilkan oleh kanal bergerbang tegangan yang membiarkan ion mengalir menuruni gradien yang sudah ada.'],
        ['Selama potensial aksi, bagian dalam sel terisi Na⁺ dan kehabisan K⁺.', 'Hanya sebagian sangat kecil ion yang berpindah; konsentrasinya hampir tidak berubah. Tegangan berayun karena membran begitu tipis sehingga ketidakseimbangan muatan yang kecil saja menghasilkan beda potensial yang besar.'],
        ['Neuron yang beristirahat tidak memiliki aktivitas listrik.', 'Membran istirahat sudah terpolarisasi di sekitar −70 mV dan dipertahankan secara aktif. Istirahat adalah keadaan tunak, bukan ketiadaan aktivitas.'],
      ],
    },
    realWorld: {
      en: [
        'Local anaesthetics such as lidocaine block voltage-gated Na⁺ channels, so pain neurons cannot fire and the signal never reaches the brain.',
        'Tetrodotoxin from pufferfish blocks the same Na⁺ channels throughout the body, which is why the poisoning is so dangerous.',
        'Abnormal blood potassium levels change the resting potential of nerve and heart cells and can cause dangerous heart rhythms.',
        'In multiple sclerosis the myelin around axons is damaged, so action potentials slow down or fail to propagate.',
      ],
      id: [
        'Anestesi lokal seperti lidokain memblokir kanal Na⁺ bergerbang tegangan, sehingga neuron nyeri tidak bisa menembak dan sinyalnya tidak pernah sampai ke otak.',
        'Tetrodotoksin dari ikan buntal memblokir kanal Na⁺ yang sama di seluruh tubuh, itulah sebabnya keracunannya sangat berbahaya.',
        'Kadar kalium darah yang abnormal mengubah potensial istirahat sel saraf dan sel jantung, dan bisa menyebabkan irama jantung yang berbahaya.',
        'Pada multiple sclerosis, mielin di sekeliling akson rusak, sehingga potensial aksi melambat atau gagal merambat.',
      ],
    },
    questions: {
      en: [
        { q: 'A neuron rests at −70 mV with a threshold of −55 mV. A stimulus depolarizes it by 10 mV. Does it fire? What happens to the membrane potential?', a: 'No. It reaches only −60 mV, which is below threshold, so the voltage-gated Na⁺ channels do not open in large numbers. The small depolarization simply decays back to −70 mV, exactly like the "Subthreshold" button.' },
        { q: 'In the lab, pulses of strength 20 and 40 give the same peak voltage. Why does doubling the stimulus not double the spike?', a: 'Once threshold is crossed, the Na⁺ channels open on their own, driven by the voltage itself, so the rise no longer depends on the stimulus. The peak is set by the Na⁺ gradient and channel inactivation, not by the input. The stronger pulse only crosses threshold sooner, which the latency column shows.' },
        { q: 'The absolute refractory period of a typical neuron is about 1 to 2 ms. What is the maximum firing rate this allows, and why does the "Double pulse" second stimulus fail?', a: 'If a new spike cannot start for about 2 ms, at most about 500 spikes per second are possible (1 s / 0.002 s); real neurons usually fire far slower. The second pulse arrives while Na⁺ channels are still inactivated and K⁺ channels are still open (the recovery variable is high in the model), so the membrane cannot be driven back to threshold.' },
      ],
      id: [
        { q: 'Sebuah neuron beristirahat pada −70 mV dengan ambang −55 mV. Rangsangan mendepolarisasinya sebesar 10 mV. Apakah neuron menembak? Apa yang terjadi pada potensial membran?', a: 'Tidak. Potensial hanya mencapai −60 mV, masih di bawah ambang, sehingga kanal Na⁺ bergerbang tegangan tidak terbuka dalam jumlah besar. Depolarisasi kecil itu meluruh kembali ke −70 mV, persis seperti tombol "Subthreshold".' },
        { q: 'Di panel lab, pulsa berkekuatan 20 dan 40 memberi tegangan puncak yang sama. Mengapa menggandakan rangsangan tidak menggandakan lonjakan?', a: 'Begitu ambang terlewati, kanal Na⁺ terbuka dengan sendirinya, didorong oleh tegangan itu sendiri, sehingga kenaikannya tidak lagi bergantung pada rangsangan. Puncaknya ditentukan oleh gradien Na⁺ dan inaktivasi kanal, bukan oleh masukan. Pulsa yang lebih kuat hanya melewati ambang lebih cepat, seperti ditunjukkan kolom latensi.' },
        { q: 'Periode refrakter absolut neuron tipikal sekitar 1 sampai 2 ms. Berapa laju tembakan maksimum yang dimungkinkan, dan mengapa rangsangan kedua pada "Double pulse" gagal?', a: 'Jika lonjakan baru tidak bisa dimulai selama sekitar 2 ms, paling banyak sekitar 500 lonjakan per detik yang mungkin (1 s / 0,002 s); neuron sungguhan biasanya menembak jauh lebih lambat. Pulsa kedua tiba saat kanal Na⁺ masih terinaktivasi dan kanal K⁺ masih terbuka (variabel pemulihan dalam model masih tinggi), sehingga membran tidak bisa didorong kembali ke ambang.' },
      ],
    },
  },
};
