import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// ---- additive dictionary -------------------------------------------------
// kind: 'basic' (not an additive) | 'natural' | 'synthetic'
// fn:   'sweetener' | 'colouring' | 'preservative' | 'flavour' | 'other' | null
// adi:  mg per kg body mass per day (null = "not specified" / no numerical limit)
const A = {
  water:     { name: { en: 'Water', id: 'Air' }, kind: 'basic', fn: null, purpose: { en: 'The base of the drink.', id: 'Bahan dasar minuman.' }, note: { en: 'Not an additive.', id: 'Bukan aditif.' } },
  sugar:     { name: { en: 'Sugar (sucrose)', id: 'Gula (sukrosa)' }, kind: 'basic', fn: null, purpose: { en: 'Sweetness and energy. A basic ingredient, but the one most often eaten to excess.', id: 'Rasa manis dan energi. Bahan dasar, tetapi paling sering dikonsumsi berlebihan.' }, note: { en: 'WHO: free sugars under 10% of energy, ideally under 5% (about 25 g a day for a child).', id: 'WHO: gula bebas di bawah 10% energi, idealnya di bawah 5% (sekitar 25 g per hari untuk anak).' } },
  flour:     { name: { en: 'Wheat flour', id: 'Tepung terigu' }, kind: 'basic', fn: null, purpose: { en: 'The main food: starch and protein.', id: 'Makanan utama: pati dan protein.' }, note: { en: 'Not an additive.', id: 'Bukan aditif.' } },
  palmoil:   { name: { en: 'Palm oil', id: 'Minyak sawit' }, kind: 'basic', fn: null, purpose: { en: 'Fat for frying and texture.', id: 'Lemak untuk menggoreng dan tekstur.' }, note: { en: 'Not an additive.', id: 'Bukan aditif.' } },
  salt:      { name: { en: 'Salt', id: 'Garam' }, kind: 'basic', fn: null, purpose: { en: 'Taste. Sodium chloride is a basic ingredient.', id: 'Rasa. Natrium klorida adalah bahan dasar.' }, note: { en: 'WHO: under 5 g salt a day for adults, less for children.', id: 'WHO: di bawah 5 g garam per hari untuk dewasa, lebih sedikit untuk anak.' } },
  potato:    { name: { en: 'Potatoes', id: 'Kentang' }, kind: 'basic', fn: null, purpose: { en: 'The main food.', id: 'Makanan utama.' }, note: { en: 'Not an additive.', id: 'Bukan aditif.' } },
  vegoil:    { name: { en: 'Vegetable oil', id: 'Minyak nabati' }, kind: 'basic', fn: null, purpose: { en: 'Fat for frying.', id: 'Lemak untuk menggoreng.' }, note: { en: 'Not an additive.', id: 'Bukan aditif.' } },
  milk:      { name: { en: 'Milk', id: 'Susu' }, kind: 'basic', fn: null, purpose: { en: 'The main food: protein, fat, calcium and natural milk sugar (lactose).', id: 'Makanan utama: protein, lemak, kalsium dan gula susu alami (laktosa).' }, note: { en: 'Not an additive.', id: 'Bukan aditif.' } },
  tea:       { name: { en: 'Tea extract', id: 'Ekstrak teh' }, kind: 'basic', fn: null, purpose: { en: 'The tea itself; naturally contains some caffeine (about 20 mg per bottle).', id: 'Tehnya sendiri; secara alami mengandung sedikit kafein (sekitar 20 mg per botol).' }, note: { en: 'Not an additive.', id: 'Bukan aditif.' } },
  glucose:   { name: { en: 'Glucose syrup', id: 'Sirup glukosa' }, kind: 'basic', fn: null, purpose: { en: 'A sugar made from starch; sweetness and chewy texture.', id: 'Gula dari pati; rasa manis dan tekstur kenyal.' }, note: { en: 'Counts as free sugar in the daily limit.', id: 'Termasuk gula bebas dalam batas harian.' } },
  gelatin:   { name: { en: 'Gelatin', id: 'Gelatin' }, kind: 'basic', fn: null, purpose: { en: 'Protein from animal skin and bones that sets the jelly.', id: 'Protein dari kulit dan tulang hewan yang membekukan jeli.' }, note: { en: 'Source animal matters for halal and vegetarian consumers.', id: 'Sumber hewannya penting bagi konsumen halal dan vegetarian.' } },
  strawb:    { name: { en: 'Strawberry juice', id: 'Sari stroberi' }, kind: 'basic', fn: null, purpose: { en: 'Real fruit for taste.', id: 'Buah asli untuk rasa.' }, note: { en: 'Not an additive.', id: 'Bukan aditif.' } },
  co2:       { name: { en: 'Carbonated water', id: 'Air berkarbonasi' }, kind: 'basic', fn: null, purpose: { en: 'Water with dissolved carbon dioxide for the fizz.', id: 'Air dengan karbon dioksida terlarut untuk sodanya.' }, note: { en: 'Not an additive.', id: 'Bukan aditif.' } },
  // natural additives
  citric:    { name: { en: 'Citric acid (INS 330)', id: 'Asam sitrat (INS 330)' }, kind: 'natural', fn: 'other', purpose: { en: 'Acidity regulator: sour taste and keeps colour and flavour stable. Found in citrus fruit; made by fermentation.', id: 'Pengatur keasaman: rasa asam dan menjaga warna serta rasa tetap stabil. Terdapat dalam buah jeruk; dibuat dengan fermentasi.' }, adi: null, note: { en: 'ADI "not specified": no numerical limit needed.', id: 'ADI "tidak ditetapkan": tidak perlu batas angka.' } },
  ascorbic:  { name: { en: 'Ascorbic acid, vitamin C (INS 300)', id: 'Asam askorbat, vitamin C (INS 300)' }, kind: 'natural', fn: 'preservative', purpose: { en: 'Antioxidant: stops the drink browning and losing flavour by reacting with oxygen first.', id: 'Antioksidan: mencegah minuman menjadi kecokelatan dan hilang rasa dengan bereaksi lebih dulu dengan oksigen.' }, adi: null, note: { en: 'ADI not specified; it is a vitamin.', id: 'ADI tidak ditetapkan; ini vitamin.' } },
  paprika:   { name: { en: 'Paprika extract (INS 160c)', id: 'Ekstrak paprika (INS 160c)' }, kind: 'natural', fn: 'colouring', purpose: { en: 'Orange-red colour from sweet peppers.', id: 'Warna jingga-merah dari paprika.' }, adi: 1.5, note: { en: 'ADI 1.5 mg/kg (EFSA); normal use is well below this.', id: 'ADI 1,5 mg/kg (EFSA); pemakaian normal jauh di bawahnya.' } },
  carmine:   { name: { en: 'Carmine (INS 120)', id: 'Karmin (INS 120)' }, kind: 'natural', fn: 'colouring', purpose: { en: 'Deep red colour extracted from cochineal insects.', id: 'Warna merah pekat yang diekstrak dari serangga cochineal.' }, adi: 5, note: { en: 'ADI 5 mg/kg. Can cause allergic reactions; its insect origin matters to some consumers.', id: 'ADI 5 mg/kg. Dapat memicu alergi; asalnya dari serangga penting bagi sebagian konsumen.' } },
  beet:      { name: { en: 'Beetroot red (INS 162)', id: 'Merah bit (INS 162)' }, kind: 'natural', fn: 'colouring', purpose: { en: 'Pink-red colour from beetroot.', id: 'Warna merah jambu dari bit.' }, adi: null, note: { en: 'ADI not specified; fades when heated.', id: 'ADI tidak ditetapkan; memudar jika dipanaskan.' } },
  carrag:    { name: { en: 'Carrageenan (INS 407)', id: 'Karagenan (INS 407)' }, kind: 'natural', fn: 'other', purpose: { en: 'Thickener and stabiliser from red seaweed; stops the drink separating.', id: 'Pengental dan penstabil dari rumput laut merah; mencegah minuman memisah.' }, adi: 75, note: { en: 'Temporary ADI 75 mg/kg (EFSA 2018).', id: 'ADI sementara 75 mg/kg (EFSA 2018).' } },
  pectin:    { name: { en: 'Pectin (INS 440)', id: 'Pektin (INS 440)' }, kind: 'natural', fn: 'other', purpose: { en: 'Thickener from fruit peel.', id: 'Pengental dari kulit buah.' }, adi: null, note: { en: 'ADI not specified.', id: 'ADI tidak ditetapkan.' } },
  natflav:   { name: { en: 'Natural flavour', id: 'Perasa alami' }, kind: 'natural', fn: 'flavour', purpose: { en: 'Aroma compounds extracted from plants (fruit, spices, cola nut).', id: 'Senyawa aroma yang diekstrak dari tumbuhan (buah, rempah, biji kola).' }, adi: null, note: { en: 'Used in tiny amounts; each flavour substance is evaluated separately.', id: 'Dipakai dalam jumlah sangat kecil; tiap zat perasa dievaluasi terpisah.' } },
  lecithin:  { name: { en: 'Soy lecithin (INS 322)', id: 'Lesitin kedelai (INS 322)' }, kind: 'natural', fn: 'other', purpose: { en: 'Emulsifier from soybeans that keeps fat and water mixed.', id: 'Pengemulsi dari kedelai yang menjaga lemak dan air tercampur.' }, adi: null, note: { en: 'ADI not specified.', id: 'ADI tidak ditetapkan.' } },
  caffeine:  { name: { en: 'Caffeine', id: 'Kafein' }, kind: 'synthetic', fn: 'other', purpose: { en: 'Stimulant added for its bitter taste and "lift". An addictive substance, about 35 mg per can.', id: 'Stimulan yang ditambahkan untuk rasa pahit dan efek "segar". Zat adiktif, sekitar 35 mg per kaleng.' }, adi: 3, note: { en: 'Guideline for children: under 3 mg/kg per day (about 120 mg for 40 kg). Causes sleep problems and withdrawal headaches.', id: 'Pedoman anak: di bawah 3 mg/kg per hari (sekitar 120 mg untuk 40 kg). Menyebabkan gangguan tidur dan sakit kepala saat berhenti.' } },
  // synthetic additives
  msg:       { name: { en: 'MSG, monosodium glutamate (INS 621)', id: 'MSG, mononatrium glutamat (INS 621)' }, kind: 'synthetic', fn: 'flavour', purpose: { en: 'Flavour enhancer: makes savoury (umami) taste stronger. Manufactured by bacterial fermentation and purified.', id: 'Penguat rasa: membuat rasa gurih (umami) lebih kuat. Dibuat dengan fermentasi bakteri lalu dimurnikan.' }, adi: 30, note: { en: 'Group ADI 30 mg/kg (EFSA 2017), about 1.2 g for a 40 kg student; one pack of noodles has roughly 0.5 to 1 g.', id: 'ADI kelompok 30 mg/kg (EFSA 2017), sekitar 1,2 g untuk siswa 40 kg; satu bungkus mi berisi kira-kira 0,5 sampai 1 g.' } },
  inosinate: { name: { en: 'Disodium inosinate (INS 631)', id: 'Dinatrium inosinat (INS 631)' }, kind: 'synthetic', fn: 'flavour', purpose: { en: 'Flavour enhancer that works together with MSG.', id: 'Penguat rasa yang bekerja bersama MSG.' }, adi: null, note: { en: 'ADI not specified.', id: 'ADI tidak ditetapkan.' } },
  tbhq:      { name: { en: 'TBHQ (INS 319)', id: 'TBHQ (INS 319)' }, kind: 'synthetic', fn: 'preservative', purpose: { en: 'Antioxidant preservative that stops the frying oil going rancid.', id: 'Pengawet antioksidan yang mencegah minyak goreng menjadi tengik.' }, adi: 0.7, note: { en: 'ADI 0.7 mg/kg: a low limit, so use levels are tightly controlled.', id: 'ADI 0,7 mg/kg: batas rendah, sehingga kadar pemakaiannya diatur ketat.' } },
  caramel:   { name: { en: 'Caramel colour IV (INS 150d)', id: 'Pewarna karamel IV (INS 150d)' }, kind: 'synthetic', fn: 'colouring', purpose: { en: 'Brown colour made by heating sugar with ammonia and sulfite compounds.', id: 'Warna cokelat yang dibuat dengan memanaskan gula bersama senyawa amonia dan sulfit.' }, adi: 300, note: { en: 'Group ADI 300 mg/kg (EFSA); typical intake is far below.', id: 'ADI kelompok 300 mg/kg (EFSA); asupan umum jauh di bawahnya.' } },
  phosacid:  { name: { en: 'Phosphoric acid (INS 338)', id: 'Asam fosfat (INS 338)' }, kind: 'synthetic', fn: 'other', purpose: { en: 'Acidity regulator: sharp taste and keeps the drink clear.', id: 'Pengatur keasaman: rasa tajam dan menjaga minuman tetap jernih.' }, adi: 40, note: { en: 'Group ADI 40 mg phosphorus/kg (EFSA 2019). Acidic drinks wear tooth enamel.', id: 'ADI kelompok 40 mg fosfor/kg (EFSA 2019). Minuman asam mengikis email gigi.' } },
  tartrazine:{ name: { en: 'Tartrazine, Yellow 5 (INS 102)', id: 'Tartrazin, Kuning 5 (INS 102)' }, kind: 'synthetic', fn: 'colouring', purpose: { en: 'Bright yellow azo dye.', id: 'Pewarna azo kuning cerah.' }, adi: 7.5, note: { en: 'ADI 7.5 mg/kg. In the EU, foods with it carry a note about effects on activity and attention in children.', id: 'ADI 7,5 mg/kg. Di Uni Eropa, makanan yang memakainya diberi catatan tentang pengaruh pada aktivitas dan perhatian anak.' } },
  sunset:    { name: { en: 'Sunset Yellow (INS 110)', id: 'Kuning Sunset (INS 110)' }, kind: 'synthetic', fn: 'colouring', purpose: { en: 'Orange azo dye.', id: 'Pewarna azo jingga.' }, adi: 4, note: { en: 'ADI 4 mg/kg (EFSA 2014).', id: 'ADI 4 mg/kg (EFSA 2014).' } },
  blue:      { name: { en: 'Brilliant Blue FCF (INS 133)', id: 'Biru Berlian FCF (INS 133)' }, kind: 'synthetic', fn: 'colouring', purpose: { en: 'Blue dye; mixed with yellow it gives green sweets.', id: 'Pewarna biru; dicampur kuning menghasilkan permen hijau.' }, adi: 6, note: { en: 'ADI 6 mg/kg (EFSA 2010).', id: 'ADI 6 mg/kg (EFSA 2010).' } },
  benzoate:  { name: { en: 'Sodium benzoate (INS 211)', id: 'Natrium benzoat (INS 211)' }, kind: 'synthetic', fn: 'preservative', purpose: { en: 'Preservative: stops yeasts and moulds growing in acidic drinks.', id: 'Pengawet: mencegah khamir dan jamur tumbuh dalam minuman asam.' }, adi: 5, note: { en: 'ADI 5 mg/kg (as benzoic acid): 200 mg a day for 40 kg; a 250 mL drink may contain about 50 mg.', id: 'ADI 5 mg/kg (sebagai asam benzoat): 200 mg per hari untuk 40 kg; minuman 250 mL bisa berisi sekitar 50 mg.' } },
  artflav:   { name: { en: 'Artificial flavour', id: 'Perasa buatan' }, kind: 'synthetic', fn: 'flavour', purpose: { en: 'Aroma molecules made in a factory to copy a fruit smell, e.g. ethyl butyrate for strawberry.', id: 'Molekul aroma buatan pabrik untuk meniru bau buah, mis. etil butirat untuk stroberi.' }, adi: null, note: { en: 'Each flavour chemical is evaluated separately; used in tiny amounts.', id: 'Tiap zat perasa dievaluasi terpisah; dipakai dalam jumlah sangat kecil.' } },
  aspartame: { name: { en: 'Aspartame (INS 951)', id: 'Aspartam (INS 951)' }, kind: 'synthetic', fn: 'sweetener', purpose: { en: 'Sweetener 200 times sweeter than sugar, with almost no energy.', id: 'Pemanis 200 kali lebih manis dari gula, hampir tanpa energi.' }, adi: 40, note: { en: 'ADI 40 mg/kg: 1600 mg a day for 40 kg, about 9 cans. People with PKU must avoid it.', id: 'ADI 40 mg/kg: 1600 mg per hari untuk 40 kg, sekitar 9 kaleng. Penderita PKU harus menghindarinya.' } },
  acek:      { name: { en: 'Acesulfame K (INS 950)', id: 'Asesulfam K (INS 950)' }, kind: 'synthetic', fn: 'sweetener', purpose: { en: 'Sweetener usually blended with aspartame to hide aftertaste.', id: 'Pemanis yang biasa dicampur aspartam untuk menutupi rasa akhir.' }, adi: 9, note: { en: 'ADI 9 mg/kg (EFSA).', id: 'ADI 9 mg/kg (EFSA).' } },
  bicarb:    { name: { en: 'Sodium bicarbonate (INS 500)', id: 'Natrium bikarbonat (INS 500)' }, kind: 'synthetic', fn: 'other', purpose: { en: 'Raising agent: releases CO₂ so the dough puffs up.', id: 'Pengembang: melepaskan CO₂ sehingga adonan mengembang.' }, adi: null, note: { en: 'ADI not specified.', id: 'ADI tidak ditetapkan.' } },
};

const PRODUCTS = [
  { id: 'noodles', name: { en: 'Instant noodles (1 pack, 80 g)', id: 'Mi instan (1 bungkus, 80 g)' }, shape: 'bag', color: '#f59e0b', sugar: 2, caffeine: 0, items: ['flour', 'palmoil', 'salt', 'msg', 'tbhq', 'caramel'] },
  { id: 'cola', name: { en: 'Cola (330 mL can)', id: 'Kola (kaleng 330 mL)' }, shape: 'can', color: '#b91c1c', sugar: 35, caffeine: 35, items: ['co2', 'sugar', 'caramel', 'phosacid', 'natflav', 'caffeine'] },
  { id: 'orange', name: { en: 'Orange-flavoured drink (250 mL)', id: 'Minuman rasa jeruk (250 mL)' }, shape: 'box', color: '#f97316', sugar: 27, caffeine: 0, items: ['water', 'sugar', 'citric', 'tartrazine', 'sunset', 'benzoate', 'artflav', 'ascorbic'] },
  { id: 'crisps', name: { en: 'Potato crisps (1 bag, 68 g)', id: 'Keripik kentang (1 bungkus, 68 g)' }, shape: 'bag', color: '#eab308', sugar: 1, caffeine: 0, items: ['potato', 'vegoil', 'salt', 'msg', 'inosinate', 'paprika'] },
  { id: 'jelly', name: { en: 'Fruit jelly sweets (1 pack, 40 g)', id: 'Permen jeli buah (1 bungkus, 40 g)' }, shape: 'bag', color: '#ec4899', sugar: 20, caffeine: 0, items: ['sugar', 'glucose', 'gelatin', 'citric', 'carmine', 'blue', 'artflav'] },
  { id: 'tea', name: { en: 'Bottled sweet tea (350 mL)', id: 'Teh manis botol (350 mL)' }, shape: 'bottle', color: '#92400e', sugar: 30, caffeine: 20, items: ['water', 'sugar', 'tea', 'ascorbic', 'natflav'] },
  { id: 'diet', name: { en: 'Diet cola (330 mL can)', id: 'Kola diet (kaleng 330 mL)' }, shape: 'can', color: '#6b7280', sugar: 0, caffeine: 35, items: ['co2', 'aspartame', 'acek', 'caramel', 'phosacid', 'benzoate', 'caffeine'] },
  { id: 'yog', name: { en: 'Strawberry yoghurt drink (200 mL)', id: 'Minuman yoghurt stroberi (200 mL)' }, shape: 'bottle', color: '#f472b6', sugar: 18, caffeine: 0, items: ['milk', 'sugar', 'strawb', 'beet', 'carrag', 'pectin', 'natflav'] },
];
const CUBE_G = 4;
const DAILY_LIMIT_G = 25;
const FN_COLOR = { sweetener: '#f472b6', colouring: '#fbbf24', preservative: '#38bdf8', flavour: '#fb923c', other: '#a3a3a3' };

export function mount(rootEl) {
  const lang = () => (getLocale() === 'id' ? 'id' : 'en');
  const T = (en, id) => (lang() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = {
    product: PRODUCTS[1],
    selected: null,            // key of ingredient being examined
    answers: {},               // key -> 'correct' | 'wrong'
    revealed: {},              // key -> true once answered
    showAddictive: false,
    cubeAnim: 0,               // 0..1 stack growth
    t: 0,
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fnLabel = (fn) => ({
    sweetener: T('sweetener', 'pemanis'), colouring: T('colouring', 'pewarna'), preservative: T('preservative / antioxidant', 'pengawet / antioksidan'),
    flavour: T('flavour / flavour enhancer', 'perasa / penguat rasa'), other: T('other (acid, thickener, stimulant...)', 'lainnya (asam, pengental, stimulan...)'),
  })[fn] || '';
  const kindLabel = (k) => (k === 'basic' ? T('basic ingredient', 'bahan dasar') : k === 'natural' ? T('natural additive', 'aditif alami') : T('synthetic additive', 'aditif sintetis'));
  const kindColor = (k) => (k === 'basic' ? '#e2e8f0' : k === 'natural' ? '#4ade80' : '#c084fc');

  function counts() {
    const p = state.product;
    let nat = 0, syn = 0;
    for (const k of p.items) { if (A[k].kind === 'natural') nat++; else if (A[k].kind === 'synthetic') syn++; }
    return { nat, syn, total: nat + syn };
  }

  // ---------- DOM: ingredient chips ----------
  const chipWrap = document.createElement('div');
  chipWrap.className = 'ctrl-row';
  chipWrap.style.flexWrap = 'wrap';
  chipWrap.setAttribute('role', 'group');
  chipWrap.setAttribute('aria-label', 'Ingredients on the label');
  const chips = new Map();
  function buildChips() {
    chipWrap.innerHTML = ''; chips.clear();
    for (const k of state.product.items) {
      const b = button({ label: A[k].name[lang()], onClick: () => { state.selected = k; refreshChips(); } });
      b.el.style.fontSize = '0.85rem';
      chips.set(k, b);
      chipWrap.appendChild(b.el);
    }
    refreshChips();
  }
  function refreshChips() {
    for (const [k, b] of chips) {
      const ans = state.answers[k];
      const mark = ans === 'correct' ? '✓ ' : ans === 'wrong' ? '✗ ' : '';
      b.label = mark + A[k].name[lang()];
      b.el.classList.toggle('btn--primary', state.selected === k);
      b.el.style.borderColor = ans === 'correct' ? '#4ade80' : ans === 'wrong' ? '#f87171' : '';
      b.el.setAttribute('aria-pressed', state.selected === k ? 'true' : 'false');
    }
  }
  function answer(kind) {
    const k = state.selected;
    if (!k) return;
    if (!state.revealed[k]) {
      state.answers[k] = A[k].kind === kind ? 'correct' : 'wrong';
      state.revealed[k] = true;
    }
    refreshChips();
  }
  function setProduct(id) {
    state.product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
    state.selected = null; state.answers = {}; state.revealed = {}; state.cubeAnim = 0;
    buildChips();
  }

  // ---------- drawing ----------
  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  function wrapText(ctx, text, x, y, maxW, lh) {
    const words = String(text).split(' ');
    let line = '', yy = y;
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, yy); line = w; yy += lh; }
      else line = test;
    }
    if (line) ctx.fillText(line, x, yy);
    return yy + lh;
  }

  function drawPackage(ctx, x, y, w, h) {
    const p = state.product;
    ctx.save();
    ctx.fillStyle = p.color;
    if (p.shape === 'can') {
      ctx.beginPath(); ctx.roundRect(x - w * 0.3, y - h * 0.45, w * 0.6, h * 0.9, w * 0.08); ctx.fill();
      ctx.fillStyle = '#d1d5db'; ctx.fillRect(x - w * 0.3, y - h * 0.5, w * 0.6, h * 0.06); ctx.fillRect(x - w * 0.3, y + h * 0.42, w * 0.6, h * 0.05);
    } else if (p.shape === 'bottle') {
      ctx.beginPath(); ctx.roundRect(x - w * 0.26, y - h * 0.2, w * 0.52, h * 0.68, w * 0.1); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x - w * 0.26, y - h * 0.2); ctx.lineTo(x - w * 0.1, y - h * 0.42); ctx.lineTo(x + w * 0.1, y - h * 0.42); ctx.lineTo(x + w * 0.26, y - h * 0.2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#e5e7eb'; ctx.fillRect(x - w * 0.1, y - h * 0.5, w * 0.2, h * 0.09);
    } else if (p.shape === 'box') {
      ctx.beginPath(); ctx.roundRect(x - w * 0.28, y - h * 0.42, w * 0.56, h * 0.88, 4); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(x - w * 0.28, y - h * 0.42, w * 0.56, h * 0.08);
    } else {
      ctx.beginPath(); ctx.moveTo(x - w * 0.36, y - h * 0.4); ctx.lineTo(x + w * 0.36, y - h * 0.4); ctx.lineTo(x + w * 0.3, y + h * 0.45); ctx.lineTo(x - w * 0.3, y + h * 0.45); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(x - w * 0.36, y - h * 0.46, w * 0.72, h * 0.07);
    }
    // label stripe
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.roundRect(x - w * 0.22, y - h * 0.05, w * 0.44, h * 0.22, 4); ctx.fill();
    ctx.fillStyle = '#1f2937'; ctx.font = font(w * 0.09, true); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(T('LABEL', 'LABEL'), x, y + h * 0.06);
    ctx.textBaseline = 'alphabetic';
    ctx.restore();
  }

  function drawSugar(ctx, x, yBase, w, hMax) {
    const p = state.product;
    const cubes = p.sugar / CUBE_G;
    const nFull = Math.floor(cubes), frac = cubes - nFull;
    const cubeH = Math.min(hMax / 12, w * 0.22), cubeW = w * 0.55;
    const shown = cubes * state.cubeAnim;
    const limitCubes = DAILY_LIMIT_G / CUBE_G;
    // limit line
    const ly = yBase - limitCubes * cubeH;
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(x - w * 0.5, ly); ctx.lineTo(x + w * 0.5, ly); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#4ade80'; ctx.font = font(w * 0.12); ctx.textAlign = 'left';
    ctx.fillText(T(`child's daily limit ≈ ${DAILY_LIMIT_G} g`, `batas harian anak ≈ ${DAILY_LIMIT_G} g`), x - w * 0.5, ly - 4);
    for (let i = 0; i < Math.ceil(shown); i++) {
      const hFrac = clamp(shown - i, 0, 1) * (i === nFull ? frac : 1);
      if (hFrac <= 0) continue;
      const cy = yBase - i * cubeH - cubeH * hFrac;
      ctx.fillStyle = i >= limitCubes ? '#f87171' : '#f8fafc';
      ctx.beginPath(); ctx.roundRect(x - cubeW / 2, cy, cubeW, cubeH * hFrac - 1.5, 2); ctx.fill();
    }
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(w * 0.14, true); ctx.textAlign = 'center';
    ctx.fillText(`${p.sugar} g`, x, yBase + w * 0.2);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(w * 0.11);
    ctx.fillText(T(`= ${cubes.toFixed(cubes % 1 ? 1 : 0)} cubes of ${CUBE_G} g`, `= ${cubes.toFixed(cubes % 1 ? 1 : 0)} batu @ ${CUBE_G} g`), x, yBase + w * 0.34);
    if (p.sugar > DAILY_LIMIT_G) {
      ctx.fillStyle = '#f87171';
      ctx.fillText(T(`${(p.sugar / DAILY_LIMIT_G).toFixed(1)}× the daily limit`, `${(p.sugar / DAILY_LIMIT_G).toFixed(1)}× batas harian`), x, yBase + w * 0.47);
    } else if (p.sugar === 0) {
      ctx.fillStyle = '#c084fc';
      ctx.fillText(T('no sugar: sweeteners instead', 'tanpa gula: diganti pemanis'), x, yBase + w * 0.47);
    }
  }

  function drawCard(ctx, x, y, w, h) {
    ctx.fillStyle = '#111c33'; ctx.beginPath(); ctx.roundRect(x, y, w, h, 10); ctx.fill();
    const pad = w * 0.04, lh = Math.max(13, w * 0.036);
    const fs = Math.max(10, w * 0.03);
    ctx.textAlign = 'left';
    if (state.showAddictive) {
      ctx.fillStyle = '#fbbf24'; ctx.font = font(fs * 1.25, true);
      ctx.fillText(T('Addictive substances', 'Zat adiktif'), x + pad, y + pad + fs);
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs);
      let yy = y + pad + fs + lh * 1.3;
      yy = wrapText(ctx, T('An addictive substance changes the brain so a person feels a need to keep taking it, and feels unwell (withdrawal) when they stop.', 'Zat adiktif mengubah otak sehingga seseorang merasa perlu terus memakainya, dan merasa tidak enak (gejala putus zat) saat berhenti.'), x + pad, yy, w - 2 * pad, lh);
      ctx.fillStyle = '#fb923c'; ctx.font = font(fs, true);
      ctx.fillText(T('Caffeine (cola, tea, coffee, energy drinks)', 'Kafein (kola, teh, kopi, minuman energi)'), x + pad, yy + lh * 0.4); yy += lh * 1.4;
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs);
      yy = wrapText(ctx, T('Mild stimulant: raises alertness and heart rate, delays sleep; stopping causes headaches and tiredness. Guideline for children: under 3 mg per kg per day (about 120 mg for 40 kg). Cola can 35 mg; cup of coffee 80 to 100 mg; energy drink 80 to 160 mg.', 'Stimulan ringan: meningkatkan kewaspadaan dan denyut jantung, menunda tidur; berhenti menyebabkan sakit kepala dan lelah. Pedoman anak: di bawah 3 mg per kg per hari (sekitar 120 mg untuk 40 kg). Kaleng kola 35 mg; secangkir kopi 80 sampai 100 mg; minuman energi 80 sampai 160 mg.'), x + pad, yy, w - 2 * pad, lh);
      ctx.fillStyle = '#f87171'; ctx.font = font(fs, true);
      ctx.fillText(T('Nicotine (cigarettes, vapes)', 'Nikotin (rokok, vape)'), x + pad, yy + lh * 0.4); yy += lh * 1.4;
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs);
      yy = wrapText(ctx, T('Strongly addictive within weeks. Raises blood pressure and heart rate, harms the developing brain and lungs; tobacco smoke causes cancer. Not a food additive: it is never allowed in food.', 'Sangat adiktif dalam hitungan minggu. Menaikkan tekanan darah dan denyut jantung, merusak otak dan paru-paru yang berkembang; asap tembakau menyebabkan kanker. Bukan aditif makanan: tidak pernah diizinkan dalam makanan.'), x + pad, yy, w - 2 * pad, lh);
      if (state.product.caffeine > 0) {
        ctx.fillStyle = '#fcd34d';
        wrapText(ctx, T(`This product: about ${state.product.caffeine} mg caffeine. A 40 kg student reaches 120 mg after ${(120 / state.product.caffeine).toFixed(1)} servings.`, `Produk ini: sekitar ${state.product.caffeine} mg kafein. Siswa 40 kg mencapai 120 mg setelah ${(120 / state.product.caffeine).toFixed(1)} porsi.`), x + pad, yy + lh * 0.3, w - 2 * pad, lh);
      }
      return;
    }
    const k = state.selected;
    if (!k) {
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 1.2, true);
      ctx.fillText(T('Read the label', 'Baca labelnya'), x + pad, y + pad + fs);
      ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs);
      let yy = y + pad + fs + lh * 1.4;
      yy = wrapText(ctx, T('Tap an ingredient below the picture, then decide: basic ingredient, natural additive or synthetic additive. The card will reveal what it does and its safe daily intake (ADI).', 'Ketuk sebuah bahan di bawah gambar, lalu putuskan: bahan dasar, aditif alami atau aditif sintetis. Kartu akan mengungkap fungsinya dan asupan harian yang aman (ADI).'), x + pad, yy, w - 2 * pad, lh);
      const c = counts();
      ctx.fillStyle = '#94a3b8';
      wrapText(ctx, T(`This product lists ${state.product.items.length} ingredients, ${c.total} of them additives.`, `Produk ini mencantumkan ${state.product.items.length} bahan, ${c.total} di antaranya aditif.`), x + pad, yy + lh * 0.4, w - 2 * pad, lh);
      return;
    }
    const a = A[k];
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 1.2, true);
    let yy = wrapText(ctx, a.name[lang()], x + pad, y + pad + fs, w - 2 * pad, lh * 1.2);
    if (!state.revealed[k]) {
      ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs);
      wrapText(ctx, T('Is this a basic ingredient, a natural additive or a synthetic additive? Choose below.', 'Apakah ini bahan dasar, aditif alami atau aditif sintetis? Pilih di bawah.'), x + pad, yy + lh * 0.3, w - 2 * pad, lh);
      return;
    }
    const ok = state.answers[k] === 'correct';
    ctx.fillStyle = ok ? '#4ade80' : '#f87171'; ctx.font = font(fs, true);
    ctx.fillText(ok ? T('Correct!', 'Benar!') : T('Not quite.', 'Belum tepat.'), x + pad, yy + lh * 0.2);
    // badges
    let bx = x + pad; const by = yy + lh * 0.8;
    const badge = (txt, col, dark) => {
      ctx.font = font(fs * 0.95, true);
      const bw = ctx.measureText(txt).width + fs * 1.2;
      ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(bx, by, bw, lh * 1.15, 6); ctx.fill();
      ctx.fillStyle = dark ? '#0b1220' : '#f8fafc'; ctx.fillText(txt, bx + fs * 0.6, by + lh * 0.85);
      bx += bw + fs * 0.6;
    };
    badge(kindLabel(a.kind), a.kind === 'basic' ? '#475569' : kindColor(a.kind), a.kind !== 'basic');
    if (a.fn) badge(fnLabel(a.fn), FN_COLOR[a.fn], a.fn !== 'sweetener');
    yy = by + lh * 1.15 + lh * 1.1;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs);
    yy = wrapText(ctx, a.purpose[lang()], x + pad, yy, w - 2 * pad, lh);
    ctx.fillStyle = '#fcd34d';
    yy = wrapText(ctx, (a.kind === 'basic' ? '' : T('Safe intake: ', 'Asupan aman: ')) + a.note[lang()], x + pad, yy + lh * 0.3, w - 2 * pad, lh);
    if (a.adi != null && a.kind !== 'basic') {
      ctx.fillStyle = '#94a3b8';
      wrapText(ctx, T(`For a 40 kg student: ${a.adi} × 40 = ${(a.adi * 40).toLocaleString('en')} mg per day.`, `Untuk siswa 40 kg: ${a.adi} × 40 = ${(a.adi * 40).toLocaleString('id')} mg per hari.`), x + pad, yy + lh * 0.2, w - 2 * pad, lh);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const w = cv.width, h = cv.height;
    if (w < 10 || h < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, w, h);
    const fs = Math.max(10, w * 0.02);
    // title
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 1.15, true); ctx.textAlign = 'left';
    ctx.fillText(state.product.name[lang()], w * 0.03, h * 0.08);
    // package
    drawPackage(ctx, w * 0.13, h * 0.42, w * 0.18, h * 0.5);
    // sugar cubes
    drawSugar(ctx, w * 0.34, h * 0.66, w * 0.16, h * 0.5);
    // card
    drawCard(ctx, w * 0.46, h * 0.13, w * 0.51, h * 0.66);
    // summary strip
    const c = counts();
    const sy = h * 0.86;
    ctx.fillStyle = '#111c33'; ctx.beginPath(); ctx.roundRect(w * 0.03, sy, w * 0.94, h * 0.11, 8); ctx.fill();
    ctx.font = font(fs); ctx.textAlign = 'left';
    const answered = Object.keys(state.revealed).length, correct = Object.values(state.answers).filter((v) => v === 'correct').length;
    ctx.fillStyle = '#4ade80'; ctx.fillText(`${T('natural additives', 'aditif alami')}: ${c.nat}`, w * 0.05, sy + h * 0.07);
    ctx.fillStyle = '#c084fc'; ctx.fillText(`${T('synthetic', 'sintetis')}: ${c.syn}`, w * 0.30, sy + h * 0.07);
    ctx.fillStyle = '#fbbf24'; ctx.fillText(`${T('caffeine', 'kafein')}: ${state.product.caffeine} mg`, w * 0.48, sy + h * 0.07);
    ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'right';
    ctx.fillText(`${T('classified', 'terklasifikasi')}: ${correct}/${answered} ✓ ${T('of', 'dari')} ${state.product.items.length}`, w * 0.95, sy + h * 0.07);
    ctx.textAlign = 'left';
  }

  function step(dt) {
    state.t += dt;
    state.cubeAnim = Math.min(1, state.cubeAnim + dt * 1.2);
  }

  // ---------- controls ----------
  const prodSel = select({
    label: 'Product', key: 'product',
    options: PRODUCTS.map((p) => ({ value: p.id, label: p.name.en })),
    value: state.product.id,
    onChange: (v) => setProduct(v),
  });
  const basicB = button({ label: 'Basic ingredient', onClick: () => answer('basic') });
  const natB = button({ label: 'Natural additive', onClick: () => answer('natural') });
  const synB = button({ label: 'Synthetic additive', onClick: () => answer('synthetic') });
  const addT = toggle({ label: 'Show addictive substances card (caffeine, nicotine)', key: 'addictive', value: false, onChange: (v) => { state.showAddictive = v; } });
  const resetB = button({ label: 'Reset answers', onClick: () => setProduct(state.product.id) });
  const chipsLabel = document.createElement('div');
  chipsLabel.className = 'ctrl';
  const lbl = document.createElement('label'); lbl.textContent = 'Ingredients on the label (tap one, then classify it):';
  chipsLabel.appendChild(lbl);
  ctrlPanel.append(prodSel.el, chipsLabel, chipWrap, row(basicB, natB, synB), row(addT, resetB));
  buildChips();

  const lab = labPanel({
    title: 'Label lab: sugar and additives',
    filename: 'food-additives-data.csv',
    columns: [
      { key: 'product', label: 'Product' },
      { key: 'sugar', label: 'Sugar (g)' },
      { key: 'cubes', label: 'Sugar cubes (4 g)', format: (v) => v.toFixed(1) },
      { key: 'additives', label: 'Additives' },
      { key: 'natural', label: 'Natural' },
      { key: 'synthetic', label: 'Synthetic' },
      { key: 'caffeine', label: 'Caffeine (mg)' },
    ],
    procedure: [
      'Choose a product and classify every ingredient until all chips show ✓ or ✗.',
      'Record the product. Repeat for all 8 products.',
      'Sort your table by sugar. Which products exceed a child\'s 25 g daily limit on their own?',
      'Sort by number of synthetic additives. Is the product with the most additives also the one with the most sugar?',
      'Pick the two products you would choose for a healthier snack and drink, and explain using the table.',
    ],
    predict: 'Which product do you think has the most sugar, and which has the most additives? Will they be the same product?',
    source: () => {
      const p = state.product, c = counts();
      return { product: p.name.en, sugar: p.sugar, cubes: p.sugar / CUBE_G, additives: c.total, natural: c.nat, synthetic: c.syn, caffeine: p.caffeine };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
