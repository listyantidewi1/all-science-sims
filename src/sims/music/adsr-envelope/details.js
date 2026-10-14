// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Map each parameter to its sonic role.',
      'Build common timbres: pluck, pad, organ, percussion.',
      'See why fast attacks sound percussive and slow attacks sound smooth.',
    ],
    id: [
      'Memetakan tiap parameter ke peran sonik.',
      'Membangun timbre umum: petik, pad, organ, perkusi.',
      'Memahami mengapa attack cepat terdengar perkusif dan attack lambat terdengar mulus.',
    ],
  },  tryThis: {
    en: [
      'Pluck — A: 0.01s, D: 0.4s, S: 0, R: 0.2s.',
      'Pad — A: 0.8s, D: 0.4s, S: 0.6, R: 1.0s.',
      'Organ — A: 0.01s, D: 0, S: 1.0, R: 0.05s.',
    ],
    id: [
      'Petik — A: 0,01s; D: 0,4s; S: 0; R: 0,2s.',
      'Pad — A: 0,8s; D: 0,4s; S: 0,6; R: 1,0s.',
      'Organ — A: 0,01s; D: 0; S: 1,0; R: 0,05s.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Press a piano key and the sound jumps out, then fades even while you hold the key. Bow a violin string and the sound swells in slowly and stays as long as you keep bowing. What makes these so different is not the pitch but the way the loudness changes over time. Sound designers call this shape the envelope. A synthesizer has no strings or bows, so it needs a rule for how loud each moment of a note should be, and the most common rule has four parts: Attack, Decay, Sustain and Release, or ADSR.',
        'In this simulation the green curve is the envelope and the shaded bands are its four stages. Attack is the time it takes the sound to climb from silence to full volume after the key is pressed. Decay is the time it then takes to fall from full volume to the sustain level. Sustain is not a time but a level: the volume that is held for as long as the key stays down, shown as a fraction of full volume. Release is the time the sound takes to fade from the sustain level to silence after the key is let go. The sim fixes the moment of key release at a draggable point (around 1.5 s), so you can see all four stages in one picture.',
        'You can drag the red handles or use the sliders. Attack, Decay and Release range from 5 ms to 2 s; Sustain runs from 0 (the sound dies away completely while the key is still held, like a plucked string) to 1 (the sound never drops after the attack, like an organ). The pitch slider only changes the note being shaped. Press Play and the sim plays a triangle-wave tone whose volume follows exactly the curve on screen, so you can hear why a 10 ms attack sounds like a tap and an 800 ms attack sounds like a breath.',
        'This is a simplified picture. The sim draws straight lines, while many real synthesizers use curved segments because our ears judge loudness roughly in ratios, so a straight ramp sounds as if it rushes at the start. Here the envelope only controls volume; in a real synthesizer envelopes also sweep filters and pitch, and in real instruments each harmonic has its own envelope, which is why a piano note gets duller as it fades. Finally, the key-release moment is fixed in the sim, whereas a player releases whenever they like, and a very short note may be released before the attack has even finished.',
      ],
      id: [
        'Tekan tuts piano dan bunyinya langsung melonjak, lalu meredup walaupun tuts masih ditahan. Gesek dawai biola dan bunyinya membesar perlahan dan bertahan selama kamu terus menggesek. Yang membuat keduanya begitu berbeda bukan tinggi nadanya, melainkan cara kekerasan bunyinya berubah seiring waktu. Perancang suara menyebut bentuk ini envelop. Synthesizer tidak punya dawai atau busur, sehingga ia butuh aturan tentang seberapa keras tiap saat dalam sebuah nada, dan aturan yang paling umum punya empat bagian: Attack, Decay, Sustain, dan Release, atau ADSR.',
        'Dalam simulasi ini kurva hijau adalah envelop dan pita berwarna adalah empat tahapnya. Attack adalah waktu yang dibutuhkan bunyi untuk naik dari hening ke volume penuh setelah tuts ditekan. Decay adalah waktu untuk turun dari volume penuh ke tingkat sustain. Sustain bukan waktu melainkan tingkat: volume yang ditahan selama tuts tetap ditekan, dinyatakan sebagai pecahan dari volume penuh. Release adalah waktu yang dibutuhkan bunyi untuk memudar dari tingkat sustain ke hening setelah tuts dilepas. Simulasi menetapkan saat pelepasan tuts pada titik yang bisa digeser (sekitar 1,5 s), sehingga keempat tahap terlihat dalam satu gambar.',
        'Kamu bisa menyeret pegangan merah atau memakai slider. Attack, Decay, dan Release berkisar dari 5 ms sampai 2 s; Sustain dari 0 (bunyi lenyap sepenuhnya walau tuts masih ditahan, seperti dawai yang dipetik) sampai 1 (bunyi tidak pernah turun setelah attack, seperti organ). Slider pitch hanya mengubah nada yang dibentuk. Tekan Play dan simulasi membunyikan nada gelombang segitiga yang volumenya mengikuti persis kurva di layar, jadi kamu bisa mendengar mengapa attack 10 ms terdengar seperti ketukan dan attack 800 ms terdengar seperti tarikan napas.',
        'Ini gambaran yang disederhanakan. Simulasi menggambar garis lurus, sedangkan banyak synthesizer sungguhan memakai ruas melengkung karena telinga kita menilai kekerasan secara kira-kira dalam perbandingan, sehingga tanjakan lurus terdengar seperti terburu-buru di awal. Di sini envelop hanya mengatur volume; pada synthesizer sungguhan envelop juga menggerakkan filter dan tinggi nada, dan pada alat musik nyata tiap harmonik punya envelop sendiri, itulah sebabnya nada piano makin redup saat memudar. Terakhir, saat pelepasan tuts di simulasi ini tetap, sedangkan pemain melepas kapan saja, dan nada yang sangat pendek bisa dilepas sebelum attack-nya selesai.',
      ],
    },
    figure: {
      caption: {
        en: 'The ADSR envelope: volume rises during Attack, falls during Decay to the Sustain level, holds there while the key is down, and fades to silence during Release after the key is let go. Three of the four are times; Sustain is a level.',
        id: 'Envelop ADSR: volume naik selama Attack, turun selama Decay ke tingkat Sustain, bertahan di sana selama tuts ditekan, lalu memudar ke hening selama Release setelah tuts dilepas. Tiga di antaranya adalah waktu; Sustain adalah tingkat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // x: key down 30, attack end 85, decay end 140, key up 240, release end 320. y: 0 -> 200, 1 -> 40, S = 0.6 -> 104
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('ADSR envelope with its four stages', 'Envelop ADSR dengan empat tahapnya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.8}.ax{stroke:currentColor;stroke-width:1;opacity:.5}</style>
  <rect x="30" y="30" width="55" height="170" fill="#3b82f6" opacity=".15"/>
  <rect x="85" y="30" width="55" height="170" fill="#f59e0b" opacity=".15"/>
  <rect x="140" y="30" width="100" height="170" fill="#10b981" opacity=".15"/>
  <rect x="240" y="30" width="80" height="170" fill="#ef4444" opacity=".15"/>
  <text x="34" y="22" fill="#3b82f6">Attack</text>
  <text x="89" y="22" fill="#f59e0b">Decay</text>
  <text x="160" y="22" fill="#10b981">Sustain</text>
  <text x="252" y="22" fill="#ef4444">Release</text>
  <line x1="30" y1="200" x2="340" y2="200" class="ax"/>
  <line x1="30" y1="200" x2="30" y2="30" class="ax"/>
  <line x1="30" y1="104" x2="320" y2="104" class="ax" stroke-dasharray="4 3"/>
  <text x="300" y="100" class="s">S = ${L('0.6', '0,6')}</text>
  <line x1="30" y1="40" x2="140" y2="40" class="ax" stroke-dasharray="4 3"/>
  <text x="120" y="52" class="s">${L('full volume = 1', 'volume penuh = 1')}</text>
  <path d="M30 200 L85 40 L140 104 L240 104 L320 200" fill="none" stroke="#10b981" stroke-width="3"/>
  <circle cx="85" cy="40" r="4" fill="#ef4444"/>
  <circle cx="140" cy="104" r="4" fill="#ef4444"/>
  <circle cx="240" cy="104" r="4" fill="#ef4444"/>
  <circle cx="320" cy="200" r="4" fill="#ef4444"/>
  <line x1="30" y1="200" x2="30" y2="214" stroke="currentColor" stroke-width="1.5"/>
  <text x="18" y="226" class="s">${L('key pressed', 'tuts ditekan')}</text>
  <line x1="240" y1="200" x2="240" y2="214" stroke="currentColor" stroke-width="1.5"/>
  <text x="212" y="226" class="s">${L('key released', 'tuts dilepas')}</text>
  <text x="300" y="226" class="s">${L('time →', 'waktu →')}</text>
  <text x="2" y="120" class="s" transform="rotate(-90 10 120)">${L('volume', 'volume')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'An envelope describes how the loudness of one note changes from the moment the key is pressed until the sound is gone.',
        'Attack, Decay and Release are lengths of time; Sustain is a level, held for as long as the key is down.',
        'Short attacks sound percussive (plucks, drums); long attacks sound soft and breathy (pads, strings).',
        'Sustain at zero means the note fades out by itself, like a plucked string; sustain at one means it holds steady, like an organ.',
        'The same pitch with a different envelope sounds like a different instrument.',
      ],
      id: [
        'Envelop menggambarkan bagaimana kekerasan satu nada berubah sejak tuts ditekan sampai bunyinya hilang.',
        'Attack, Decay, dan Release adalah lama waktu; Sustain adalah tingkat yang ditahan selama tuts ditekan.',
        'Attack pendek terdengar perkusif (petikan, drum); attack panjang terdengar lembut dan seperti napas (pad, alat gesek).',
        'Sustain nol berarti nada memudar sendiri, seperti dawai yang dipetik; sustain satu berarti bunyi bertahan tetap, seperti organ.',
        'Tinggi nada yang sama dengan envelop berbeda terdengar seperti alat musik yang berbeda.',
      ],
    },
    vocabulary: {
      en: [
        ['Envelope', 'The shape of a sound\'s volume over time, from its start to its end.'],
        ['Attack', 'The time for the sound to rise from silence to full volume after the key is pressed.'],
        ['Decay', 'The time for the sound to fall from full volume down to the sustain level.'],
        ['Sustain', 'The volume level held while the key stays pressed, given as a fraction of full volume.'],
        ['Release', 'The time for the sound to fade from the sustain level to silence after the key is let go.'],
        ['Amplitude', 'The size of a sound wave\'s vibration; larger amplitude means louder sound.'],
        ['Timbre', 'The character of a sound that lets you tell two instruments apart even on the same note; the envelope is a big part of it.'],
      ],
      id: [
        ['Envelop', 'Bentuk perubahan volume sebuah bunyi seiring waktu, dari awal hingga akhir.'],
        ['Attack', 'Waktu bagi bunyi untuk naik dari hening ke volume penuh setelah tuts ditekan.'],
        ['Decay', 'Waktu bagi bunyi untuk turun dari volume penuh ke tingkat sustain.'],
        ['Sustain', 'Tingkat volume yang ditahan selama tuts tetap ditekan, dinyatakan sebagai pecahan dari volume penuh.'],
        ['Release', 'Waktu bagi bunyi untuk memudar dari tingkat sustain ke hening setelah tuts dilepas.'],
        ['Amplitudo', 'Besar getaran gelombang bunyi; amplitudo lebih besar berarti bunyi lebih keras.'],
        ['Warna nada (timbre)', 'Karakter bunyi yang membuatmu bisa membedakan dua alat musik walau pada nada yang sama; envelop adalah bagian besar darinya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Sustain is how long the note lasts.', 'Sustain is a level, not a time. The note is held for as long as the player keeps the key down; the sustain setting only says how loud it is during that time.'],
        ['A longer release makes the note louder or longer while you hold it.', 'Release only matters after the key is let go. It controls how slowly the tail fades; while the key is down the release setting has no effect at all.'],
        ['The envelope changes the pitch of the note.', 'In this sim the envelope changes only the volume. The pitch slider is separate: a 440 Hz note stays at 440 Hz whether its attack is 5 ms or 2 s.'],
      ],
      id: [
        ['Sustain adalah lamanya nada berbunyi.', 'Sustain adalah tingkat, bukan waktu. Nada ditahan selama pemain menekan tuts; pengaturan sustain hanya menyatakan seberapa keras bunyinya selama waktu itu.'],
        ['Release yang lebih panjang membuat nada lebih keras atau lebih panjang saat ditahan.', 'Release hanya berperan setelah tuts dilepas. Ia mengatur seberapa lambat ekor bunyi memudar; selama tuts ditekan, pengaturan release tidak berpengaruh sama sekali.'],
        ['Envelop mengubah tinggi nada.', 'Dalam simulasi ini envelop hanya mengubah volume. Slider pitch terpisah: nada 440 Hz tetap 440 Hz baik attack-nya 5 ms maupun 2 s.'],
      ],
    },
    realWorld: {
      en: [
        'A piano has a near-instant attack and a long decay with no real sustain: the note fades even while the key is held, which the Pluck preset imitates.',
        'A church organ has a very short attack and full sustain: the note stays at the same volume until the key is released, then stops almost at once.',
        'Film and game composers use long attacks and long releases to make "pads" that swell and melt into each other without clicks.',
        'Drum machines use a tiny attack, a short decay and zero sustain for snappy kicks and snares, like the Stab preset.',
      ],
      id: [
        'Piano memiliki attack yang hampir seketika dan decay panjang tanpa sustain nyata: nadanya memudar walaupun tuts ditahan, yang ditiru oleh preset Petik.',
        'Organ gereja memiliki attack sangat pendek dan sustain penuh: nadanya bertahan pada volume yang sama sampai tuts dilepas, lalu berhenti hampir seketika.',
        'Komposer film dan gim memakai attack dan release yang panjang untuk membuat "pad" yang membesar dan melebur satu sama lain tanpa bunyi klik.',
        'Mesin drum memakai attack sangat singkat, decay pendek, dan sustain nol untuk bunyi kick dan snare yang tajam, seperti preset Stab.',
      ],
    },
    questions: {
      en: [
        { q: 'The Pluck preset has Attack 10 ms, Decay 400 ms and Sustain 0. If you hold the key for 1.5 s, when does the sound stop, and why does the release setting not matter here?', a: 'About 0.41 s after the key is pressed: 0.01 s to reach full volume plus 0.40 s to decay to the sustain level, which is zero. Release only fades the sound from the sustain level, and there is nothing left to fade, so its value makes no difference.' },
        { q: 'The Organ preset sets Decay to 0 and Sustain to 1.0. Why does the yellow Decay band disappear from the graph?', a: 'Decay is the fall from full volume (1) to the sustain level. With sustain at 1 there is nothing to fall to, and with decay time 0 the stage takes no time, so the band has zero width: the envelope goes straight from the attack peak into a flat sustain.' },
        { q: 'You want a sound that fades in gently, holds at about half volume while the key is down, and then lingers for a second after you let go. Which settings would you try?', a: 'A long Attack (around 0.5–1 s) for the gentle fade-in, a Sustain of about 0.5 for half volume, a short Decay so it reaches that level quickly, and a Release of about 1 s so the tail lingers. This is close to the Pad preset.' },
      ],
      id: [
        { q: 'Preset Petik memiliki Attack 10 ms, Decay 400 ms, dan Sustain 0. Jika tuts ditahan 1,5 s, kapan bunyinya berhenti, dan mengapa pengaturan release tidak berpengaruh di sini?', a: 'Sekitar 0,41 s setelah tuts ditekan: 0,01 s untuk mencapai volume penuh plus 0,40 s untuk turun ke tingkat sustain, yang bernilai nol. Release hanya memudarkan bunyi dari tingkat sustain, dan tidak ada lagi yang bisa dipudarkan, jadi nilainya tidak membuat perbedaan.' },
        { q: 'Preset Organ mengatur Decay ke 0 dan Sustain ke 1,0. Mengapa pita kuning Decay hilang dari grafik?', a: 'Decay adalah penurunan dari volume penuh (1) ke tingkat sustain. Dengan sustain 1 tidak ada penurunan, dan dengan waktu decay 0 tahap itu tidak memakan waktu, sehingga pitanya berlebar nol: envelop langsung dari puncak attack ke sustain yang datar.' },
        { q: 'Kamu ingin bunyi yang masuk perlahan, bertahan di sekitar setengah volume selama tuts ditekan, lalu masih terdengar sekitar satu sekon setelah dilepas. Pengaturan apa yang akan kamu coba?', a: 'Attack panjang (sekitar 0,5–1 s) untuk masuk perlahan, Sustain sekitar 0,5 untuk setengah volume, Decay pendek agar cepat mencapai tingkat itu, dan Release sekitar 1 s agar ekornya tertinggal. Ini mirip preset Pad.' },
      ],
    },
  },
};
