import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const SPAM_COL = '#ef4444', HAM_COL = '#22c55e';

// Twenty short training messages per language: 10 spam, 10 ham.
const CORPUS = {
  en: {
    spam: [
      'win a free prize now click here',
      'congratulations you won a free gift card claim now',
      'cheap loans approved instantly apply today',
      'urgent your account is locked click the link now',
      'free bonus credits for the first 100 winners',
      'buy now limited offer 90 percent discount',
      'you have been selected to win cash call now',
      'claim your free vacation prize today',
      'hot deal cheap phones buy today free shipping',
      'earn money fast from home guaranteed',
    ],
    ham: [
      'are we still meeting for lunch tomorrow',
      'can you send me the notes from class today',
      'happy birthday hope you have a great day',
      'the homework is due on friday',
      'mom asked if you are coming home for dinner',
      "let's play football after school",
      'thanks for your help with the project',
      'see you at the library at four',
      'did you finish reading the chapter',
      'practice is cancelled today because of rain',
    ],
    examples: [
      'free prize for you click now',
      'see you at lunch tomorrow',
      'free lunch',
      'congratulations on finishing the project',
      'cheap notes from class today',
    ],
    placeholder: 'Type a message to classify…',
  },
  id: {
    spam: [
      'menangkan hadiah gratis sekarang klik di sini',
      'selamat anda memenangkan voucher gratis klaim sekarang',
      'pinjaman murah langsung cair daftar hari ini',
      'penting akun anda diblokir klik tautan sekarang',
      'bonus pulsa gratis untuk 100 pemenang pertama',
      'beli sekarang promo terbatas diskon 90 persen',
      'anda terpilih memenangkan uang tunai hubungi sekarang',
      'klaim hadiah liburan gratis anda hari ini',
      'promo heboh hp murah beli hari ini gratis ongkir',
      'dapatkan uang cepat dari rumah dijamin',
    ],
    ham: [
      'jadi makan siang besok masih jalan',
      'bisa kirim catatan pelajaran hari ini',
      'selamat ulang tahun semoga harimu menyenangkan',
      'pr nya dikumpulkan hari jumat',
      'ibu tanya kamu pulang makan malam atau tidak',
      'main bola yuk sepulang sekolah',
      'terima kasih sudah bantu tugas kelompok',
      'sampai jumpa di perpustakaan jam empat',
      'sudah selesai baca babnya belum',
      'latihan hari ini batal karena hujan',
    ],
    examples: [
      'hadiah gratis untuk kamu klik sekarang',
      'sampai jumpa besok makan siang',
      'gratis makan siang',
      'selamat sudah selesai tugas kelompok',
      'catatan murah pelajaran hari ini',
    ],
    placeholder: 'Ketik pesan untuk diklasifikasi…',
  },
};

const tokenize = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}\s']/gu, ' ').split(/\s+/).filter(Boolean);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = {
    lang: getLocale() === 'id' ? 'id' : 'en',
    msgs: [],          // { text, label: 'spam' | 'ham', user: bool }
    alpha: 1,
    query: '',
    truth: '',         // '', 'spam' or 'ham' — the student's own judgement for the lab
    model: null,
    result: null,
  };

  function loadCorpus(lang) {
    state.lang = lang;
    const c = CORPUS[lang];
    state.msgs = [
      ...c.spam.map((text) => ({ text, label: 'spam', user: false })),
      ...c.ham.map((text) => ({ text, label: 'ham', user: false })),
    ];
    rebuild();
  }

  // --- Naive Bayes with Laplace smoothing ---------------------------------------
  function rebuild() {
    const counts = { spam: new Map(), ham: new Map() };
    const tokens = { spam: 0, ham: 0 };
    const docs = { spam: 0, ham: 0 };
    const vocab = new Set();
    for (const m of state.msgs) {
      docs[m.label]++;
      for (const w of tokenize(m.text)) {
        counts[m.label].set(w, (counts[m.label].get(w) || 0) + 1);
        tokens[m.label]++;
        vocab.add(w);
      }
    }
    state.model = { counts, tokens, docs, vocab };
    classify();
    renderTables();
  }
  function wordProb(w, label, V) {
    const m = state.model;
    return ((m.counts[label].get(w) || 0) + state.alpha) / (m.tokens[label] + state.alpha * V);
  }
  function classify() {
    const m = state.model;
    const words = tokenize(state.query);
    const nDocs = Math.max(1, m.docs.spam + m.docs.ham);
    // unseen query words join the vocabulary so no probability is ever zero
    const extra = new Set(words.filter((w) => !m.vocab.has(w)));
    const V = Math.max(1, m.vocab.size + extra.size);
    const priorS = m.docs.spam / nDocs, priorH = m.docs.ham / nDocs;
    const logPrior = Math.log(Math.max(priorS, 1e-9)) - Math.log(Math.max(priorH, 1e-9));
    let logOdds = logPrior;
    const rows = words.map((w) => {
      const ps = wordProb(w, 'spam', V), ph = wordProb(w, 'ham', V);
      const lo = Math.log(ps) - Math.log(ph);
      logOdds += lo;
      return { w, cs: m.counts.spam.get(w) || 0, ch: m.counts.ham.get(w) || 0, ps, ph, lo, unseen: extra.has(w) };
    });
    const pSpam = 1 / (1 + Math.exp(clamp(-logOdds, -500, 500)));
    state.result = { words: rows, priorS, priorH, logPrior, logOdds, pSpam, V, pred: pSpam > 0.5 ? 'spam' : 'ham' };
  }

  // --- canvas: evidence bars and posterior meter ----------------------------------
  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const r = state.result;
    const fs = Math.max(10, Math.round(H * 0.032));
    const font = `${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    const bold = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    const mono = `${fs}px ui-monospace, Menlo, Consolas, monospace`;
    // bold text that shrinks to fit maxW instead of running off the right edge (narrow screens)
    const fitBold = (text, x, y, maxW) => {
      ctx.font = bold;
      const w = ctx.measureText(text).width;
      if (w > maxW) ctx.font = `bold ${Math.max(7, fs * maxW / w)}px system-ui, -apple-system, Roboto, sans-serif`;
      ctx.fillText(text, x, y);
      ctx.font = bold;
    };

    ctx.fillStyle = '#e2e8f0'; ctx.font = bold; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    const m = state.model;
    fitBold(T(`Training data: ${m.docs.spam} spam + ${m.docs.ham} ham messages, ${m.vocab.size} different words, α = ${state.alpha}`,
      `Data latih: ${m.docs.spam} spam + ${m.docs.ham} bukan spam, ${m.vocab.size} kata berbeda, α = ${state.alpha}`), W * 0.03, H * 0.07, W * 0.94);

    if (!r || !r.words.length) {
      ctx.fillStyle = '#94a3b8'; ctx.font = font; ctx.textAlign = 'center';
      ctx.fillText(T('Type a message below (or pick an example) to see the evidence for each word.', 'Ketik pesan di bawah (atau pilih contoh) untuk melihat bukti tiap kata.'), W / 2, H * 0.45);
      ctx.fillText(T('Each word adds log P(word | spam) − log P(word | ham). Right = spam evidence, left = ham evidence.', 'Setiap kata menambahkan log P(kata | spam) − log P(kata | bukan). Kanan = bukti spam, kiri = bukti bukan spam.'), W / 2, H * 0.55);
      return;
    }

    // layout of the bar list
    const maxRows = 9;
    const shown = r.words.slice(0, maxRows);
    const hidden = r.words.length - shown.length;
    const top = H * 0.14, bottomList = H * 0.70;
    const nRows = shown.length + 1 + (hidden > 0 ? 1 : 0);
    const rowH = Math.min(fs * 2.1, (bottomList - top) / nRows);
    const colWord = W * 0.03, colCounts = W * 0.25, cx = W * 0.62, scale = W * 0.11; // px per unit of log-odds
    const maxAbs = Math.max(1, ...r.words.map((x) => Math.abs(x.lo)), Math.abs(r.logPrior));
    const sc = Math.min(scale, (W * 0.34) / maxAbs);

    ctx.font = `${Math.round(fs * 0.85)}px system-ui, sans-serif`; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    ctx.fillText(T('word', 'kata'), colWord, top - fs * 0.5);
    ctx.fillText(T('count spam : ham', 'hitung spam : bukan'), colCounts, top - fs * 0.5);
    ctx.textAlign = 'center';
    ctx.fillText('log P(w|spam) − log P(w|ham)', cx, top - fs * 0.5);
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, top); ctx.lineTo(cx, top + rowH * nRows); ctx.stroke();

    const bar = (y, label, counts, v, dim) => {
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillStyle = dim ? '#94a3b8' : '#e2e8f0'; ctx.font = mono;
      ctx.fillText(label, colWord, y);
      ctx.font = font; ctx.fillStyle = '#cbd5e1';
      ctx.fillText(counts, colCounts, y);
      const w = Math.abs(v) * sc;
      ctx.fillStyle = v >= 0 ? SPAM_COL : HAM_COL;
      ctx.globalAlpha = dim ? 0.5 : 0.9;
      ctx.beginPath(); ctx.roundRect(v >= 0 ? cx : cx - w, y - rowH * 0.3, Math.max(2, w), rowH * 0.6, 3); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#e2e8f0'; ctx.textAlign = v >= 0 ? 'left' : 'right';
      ctx.fillText(`${v >= 0 ? '+' : ''}${v.toFixed(2)}`, v >= 0 ? cx + w + 6 : cx - w - 6, y);
      ctx.textBaseline = 'alphabetic';
    };
    let y = top + rowH / 2;
    bar(y, T('prior', 'prior'), `${m.docs.spam} : ${m.docs.ham}`, r.logPrior, true);
    y += rowH;
    for (const row of shown) {
      const label = row.unseen ? `${row.w} ${T('(new)', '(baru)')}` : row.w;
      bar(y, label, `${row.cs} : ${row.ch}`, row.lo, false);
      y += rowH;
    }
    if (hidden > 0) {
      ctx.fillStyle = '#94a3b8'; ctx.font = font; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(T(`… and ${hidden} more words (all counted)`, `… dan ${hidden} kata lagi (semua dihitung)`), colWord, y);
      ctx.textBaseline = 'alphabetic';
    }

    // sum and posterior meter
    const my = H * 0.80;
    ctx.fillStyle = '#e2e8f0'; ctx.font = bold; ctx.textAlign = 'left';
    fitBold(T(`sum of log-odds = ${r.logOdds >= 0 ? '+' : ''}${r.logOdds.toFixed(2)}   →   P(spam | message) = 1 / (1 + e^(−sum)) = ${(r.pSpam * 100).toFixed(1)}%`,
      `jumlah log-odds = ${r.logOdds >= 0 ? '+' : ''}${r.logOdds.toFixed(2)}   →   P(spam | pesan) = 1 / (1 + e^(−jumlah)) = ${(r.pSpam * 100).toFixed(1)}%`), W * 0.03, my - fs * 1.1, W * 0.94);
    const mx = W * 0.03, mw = W * 0.64, mh = fs * 1.3;
    ctx.fillStyle = HAM_COL; ctx.beginPath(); ctx.roundRect(mx, my, mw, mh, 6); ctx.fill();
    ctx.fillStyle = SPAM_COL; ctx.beginPath(); ctx.roundRect(mx, my, mw * r.pSpam, mh, 6); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(mx + mw / 2, my - 4); ctx.lineTo(mx + mw / 2, my + mh + 4); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs * 0.85)}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillText('50%', mx + mw / 2, my + mh + fs);
    ctx.textAlign = 'left'; ctx.fillStyle = SPAM_COL; ctx.fillText(`spam ${(r.pSpam * 100).toFixed(0)}%`, mx, my + mh + fs);
    ctx.textAlign = 'right'; ctx.fillStyle = HAM_COL; ctx.fillText(T(`ham ${((1 - r.pSpam) * 100).toFixed(0)}%`, `bukan spam ${((1 - r.pSpam) * 100).toFixed(0)}%`), mx + mw, my + mh + fs);
    // verdict
    const vx = W * 0.70, vw = W * 0.27, vh = fs * 2.6;
    ctx.fillStyle = r.pred === 'spam' ? SPAM_COL : HAM_COL;
    ctx.beginPath(); ctx.roundRect(vx, my - fs * 0.6, vw, vh, 10); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = `bold ${Math.round(fs * 1.4)}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(r.pred === 'spam' ? 'SPAM' : T('HAM', 'BUKAN SPAM'), vx + vw / 2, my - fs * 0.6 + vh / 2);
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  }

  // --- DOM: input, examples, add-to-corpus, word table, corpus list -----------------
  const inputLabel = document.createElement('label');
  inputLabel.textContent = T('Message to classify', 'Pesan yang diklasifikasi');
  inputLabel.style.cssText = 'font-size:var(--type-sm);color:var(--color-muted);font-weight:600;display:block';
  const input = document.createElement('input');
  input.type = 'text';
  input.spellcheck = false;
  input.setAttribute('aria-label', inputLabel.textContent);
  input.style.cssText = 'width:100%;font-size:16px;padding:10px 12px;border:1px solid var(--color-border);border-radius:8px;background:var(--color-surface-2);color:var(--color-fg);margin:6px 0 10px;box-sizing:border-box';
  input.addEventListener('input', () => { state.query = input.value; state.truth = ''; truthSel.value = ''; classify(); });
  ctrlPanel.append(inputLabel, input);

  const exampleSel = select({
    label: T('Try an example', 'Coba contoh'), key: 'example',
    options: [{ value: '', label: '—' }],
    value: '',
    onChange: (v) => { if (v) { input.value = v; state.query = v; state.truth = ''; truthSel.value = ''; classify(); } },
  });
  function fillExamples() {
    const sel = exampleSel.el.querySelector('select');
    sel.innerHTML = '';
    for (const v of ['', ...CORPUS[state.lang].examples]) {
      const o = document.createElement('option'); o.value = v; o.textContent = v || '—'; sel.appendChild(o);
    }
  }
  const truthSel = select({
    label: T('Actual label (your judgement, for the lab)', 'Label sebenarnya (penilaianmu, untuk lab)'), key: 'truth',
    options: [{ value: '', label: '—' }, { value: 'spam', label: 'spam' }, { value: 'ham', label: T('ham', 'bukan spam') }],
    value: '',
    onChange: (v) => { state.truth = v; },
  });
  const alphaS = slider({ label: 'Laplace α', key: 'alpha', min: 0.1, max: 2, step: 0.1, value: 1, format: (v) => v.toFixed(1), onInput: (v) => { state.alpha = v; classify(); renderTables(); } });
  const addSpamB = button({ label: T('Add message as SPAM', 'Tambah pesan sebagai SPAM'), onClick: () => addMessage('spam') });
  const addHamB = button({ label: T('Add message as HAM', 'Tambah pesan sebagai BUKAN SPAM'), onClick: () => addMessage('ham') });
  const resetB = button({ label: T('Reset corpus', 'Reset korpus'), onClick: () => loadCorpus(state.lang) });
  const langT = toggle({ label: T('Indonesian corpus', 'Korpus bahasa Indonesia'), key: 'id-corpus', value: state.lang === 'id', onChange: (v) => {
    loadCorpus(v ? 'id' : 'en'); fillExamples(); input.placeholder = CORPUS[state.lang].placeholder;
    input.value = ''; state.query = ''; classify();
  } });
  function addMessage(label) {
    const text = input.value.trim();
    if (!tokenize(text).length) return;
    state.msgs.push({ text, label, user: true });
    rebuild();
  }
  ctrlPanel.append(exampleSel.el, truthSel.el, alphaS.el, row(addSpamB, addHamB, resetB), row(langT));

  // word-probability table
  const tableDet = document.createElement('details');
  tableDet.className = 'lab-section';
  const tableSum = document.createElement('summary');
  tableSum.textContent = T('Word probability table', 'Tabel peluang kata');
  tableDet.appendChild(tableSum);
  const tableWrap = document.createElement('div');
  tableWrap.style.cssText = 'max-height:280px;overflow:auto;font-size:13px';
  tableDet.appendChild(tableWrap);
  // corpus list
  const corpusDet = document.createElement('details');
  corpusDet.className = 'lab-section';
  const corpusSum = document.createElement('summary');
  corpusDet.appendChild(corpusSum);
  const corpusWrap = document.createElement('div');
  corpusWrap.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px';
  corpusDet.appendChild(corpusWrap);
  ctrlPanel.append(tableDet, corpusDet);

  function renderTables() {
    const m = state.model;
    const V = Math.max(1, m.vocab.size);
    const words = [...m.vocab].map((w) => {
      const ps = wordProb(w, 'spam', V), ph = wordProb(w, 'ham', V);
      return { w, cs: m.counts.spam.get(w) || 0, ch: m.counts.ham.get(w) || 0, ps, ph, lo: Math.log(ps) - Math.log(ph) };
    }).sort((a, b) => b.lo - a.lo);
    const td = (s, align = 'left') => `<td style="padding:2px 8px;text-align:${align};white-space:nowrap">${s}</td>`;
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    let html = `<table style="border-collapse:collapse;width:100%"><thead><tr style="color:var(--color-muted)">${td(T('word', 'kata'))}${td('spam', 'right')}${td(T('ham', 'bukan'), 'right')}${td('P(w|spam)', 'right')}${td(T('P(w|ham)', 'P(w|bukan)'), 'right')}${td('log-odds', 'right')}</tr></thead><tbody>`;
    for (const r of words) {
      const col = r.lo > 0.05 ? SPAM_COL : r.lo < -0.05 ? HAM_COL : 'inherit';
      html += `<tr>${td(`<code>${esc(r.w)}</code>`)}${td(r.cs, 'right')}${td(r.ch, 'right')}${td(r.ps.toFixed(4), 'right')}${td(r.ph.toFixed(4), 'right')}<td style="padding:2px 8px;text-align:right;color:${col};font-weight:600">${r.lo >= 0 ? '+' : ''}${r.lo.toFixed(2)}</td></tr>`;
    }
    html += '</tbody></table>';
    tableWrap.innerHTML = html;

    corpusSum.textContent = T(`Training corpus (${m.docs.spam} spam, ${m.docs.ham} ham) — click × to remove`, `Korpus latih (${m.docs.spam} spam, ${m.docs.ham} bukan spam) — klik × untuk menghapus`);
    corpusWrap.innerHTML = '';
    for (const label of ['spam', 'ham']) {
      const col = document.createElement('div');
      const h = document.createElement('div');
      h.textContent = label === 'spam' ? 'SPAM' : T('HAM', 'BUKAN SPAM');
      h.style.cssText = `font-weight:700;color:${label === 'spam' ? SPAM_COL : HAM_COL};margin-bottom:4px`;
      col.appendChild(h);
      state.msgs.forEach((msg, i) => {
        if (msg.label !== label) return;
        const line = document.createElement('div');
        line.style.cssText = 'display:flex;gap:6px;align-items:baseline;margin:2px 0';
        const del = document.createElement('button');
        del.type = 'button'; del.className = 'lab-del'; del.textContent = '×'; del.title = T('Remove from training data', 'Hapus dari data latih');
        del.addEventListener('click', () => { state.msgs.splice(i, 1); rebuild(); });
        const span = document.createElement('span');
        span.textContent = msg.text + (msg.user ? T(' (added)', ' (ditambahkan)') : '');
        if (msg.user) span.style.fontStyle = 'italic';
        line.append(del, span);
        col.appendChild(line);
      });
      corpusWrap.appendChild(col);
    }
  }

  const lab = labPanel({
    title: 'Spam filter lab',
    filename: 'text-classifier-data.csv',
    columns: [
      { key: 'corpus', label: 'Corpus' },
      { key: 'nTrain', label: 'Training msgs' },
      { key: 'message', label: 'Message' },
      { key: 'pSpam', label: 'P(spam) %', format: (v) => v.toFixed(1) },
      { key: 'pred', label: 'Predicted' },
      { key: 'truth', label: 'Actual' },
      { key: 'correct', label: 'Correct?' },
    ],
    procedure: [
      'Pick each example message in turn, decide yourself whether it is spam (Actual label), and Record.',
      'Write three messages of your own: one obvious spam, one obvious ham, one tricky mix. Record each.',
      'Add two ham messages containing a spam word (e.g. "free"). Re-test your tricky message. Record.',
      'Remove three ham messages from the corpus. How does the prior change, and what happens to a neutral message?',
    ],
    predict: 'Which single word in the corpus will be the strongest spam evidence? What will the filter say about a message made only of words it has never seen?',
    source: () => {
      const r = state.result;
      if (!r || !r.words.length) return null;
      return {
        corpus: state.lang,
        nTrain: state.msgs.length,
        message: state.query,
        pSpam: r.pSpam * 100,
        pred: r.pred,
        truth: state.truth || '?',
        correct: state.truth ? (state.truth === r.pred ? 'yes' : 'no') : '?',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  loadCorpus(state.lang);
  fillExamples();
  input.placeholder = CORPUS[state.lang].placeholder;

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
