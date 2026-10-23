// minipy — Unicode case mappings that JavaScript lacks, for str.title() / capitalize() / casefold() / swapcase()
// and the is*() predicates, matching CPython 3.13 (Unicode 15.1.0; the character data comes from unidata.js).
// Generated with python3: TITLE lists the characters whose full titlecase mapping differs from their uppercase
// (SpecialCasing.txt ligatures, Greek with ypogegrammeni, the Dz digraphs, Georgian Mkhedruli); FOLD the
// characters whose full case folding differs from their lowercase (CaseFolding.txt C + F).

const TITLE_DATA = 'df:53.73,1c4:1c5,1c5:1c5,1c6:1c5,1c7:1c8,1c8:1c8,1c9:1c8,1ca:1cb,1cb:1cb,1cc:1cb,1f1:1f2,1f2:1f2,1f3:1f2,587:535.582,10d0:10d0,10d1:10d1,10d2:10d2,10d3:10d3,10d4:10d4,10d5:10d5,10d6:10d6,10d7:10d7,10d8:10d8,10d9:10d9,10da:10da,10db:10db,10dc:10dc,10dd:10dd,10de:10de,10df:10df,10e0:10e0,10e1:10e1,10e2:10e2,10e3:10e3,10e4:10e4,10e5:10e5,10e6:10e6,10e7:10e7,10e8:10e8,10e9:10e9,10ea:10ea,10eb:10eb,10ec:10ec,10ed:10ed,10ee:10ee,10ef:10ef,10f0:10f0,10f1:10f1,10f2:10f2,10f3:10f3,10f4:10f4,10f5:10f5,10f6:10f6,10f7:10f7,10f8:10f8,10f9:10f9,10fa:10fa,10fd:10fd,10fe:10fe,10ff:10ff,1f80:1f88,1f81:1f89,1f82:1f8a,1f83:1f8b,1f84:1f8c,1f85:1f8d,1f86:1f8e,1f87:1f8f,1f88:1f88,1f89:1f89,1f8a:1f8a,1f8b:1f8b,1f8c:1f8c,1f8d:1f8d,1f8e:1f8e,1f8f:1f8f,1f90:1f98,1f91:1f99,1f92:1f9a,1f93:1f9b,1f94:1f9c,1f95:1f9d,1f96:1f9e,1f97:1f9f,1f98:1f98,1f99:1f99,1f9a:1f9a,1f9b:1f9b,1f9c:1f9c,1f9d:1f9d,1f9e:1f9e,1f9f:1f9f,1fa0:1fa8,1fa1:1fa9,1fa2:1faa,1fa3:1fab,1fa4:1fac,1fa5:1fad,1fa6:1fae,1fa7:1faf,1fa8:1fa8,1fa9:1fa9,1faa:1faa,1fab:1fab,1fac:1fac,1fad:1fad,1fae:1fae,1faf:1faf,1fb2:1fba.345,1fb3:1fbc,1fb4:386.345,1fb7:391.342.345,1fbc:1fbc,1fc2:1fca.345,1fc3:1fcc,1fc4:389.345,1fc7:397.342.345,1fcc:1fcc,1ff2:1ffa.345,1ff3:1ffc,1ff4:38f.345,1ff7:3a9.342.345,1ffc:1ffc,fb00:46.66,fb01:46.69,fb02:46.6c,fb03:46.66.69,fb04:46.66.6c,fb05:53.74,fb06:53.74,fb13:544.576,fb14:544.565,fb15:544.56b,fb16:54e.576,fb17:544.56d';
const FOLD_DATA = 'b5:3bc,df:73.73,149:2bc.6e,17f:73,1f0:6a.30c,345:3b9,390:3b9.308.301,3b0:3c5.308.301,3c2:3c3,3d0:3b2,3d1:3b8,3d5:3c6,3d6:3c0,3f0:3ba,3f1:3c1,3f5:3b5,587:565.582,13a0:13a0,13a1:13a1,13a2:13a2,13a3:13a3,13a4:13a4,13a5:13a5,13a6:13a6,13a7:13a7,13a8:13a8,13a9:13a9,13aa:13aa,13ab:13ab,13ac:13ac,13ad:13ad,13ae:13ae,13af:13af,13b0:13b0,13b1:13b1,13b2:13b2,13b3:13b3,13b4:13b4,13b5:13b5,13b6:13b6,13b7:13b7,13b8:13b8,13b9:13b9,13ba:13ba,13bb:13bb,13bc:13bc,13bd:13bd,13be:13be,13bf:13bf,13c0:13c0,13c1:13c1,13c2:13c2,13c3:13c3,13c4:13c4,13c5:13c5,13c6:13c6,13c7:13c7,13c8:13c8,13c9:13c9,13ca:13ca,13cb:13cb,13cc:13cc,13cd:13cd,13ce:13ce,13cf:13cf,13d0:13d0,13d1:13d1,13d2:13d2,13d3:13d3,13d4:13d4,13d5:13d5,13d6:13d6,13d7:13d7,13d8:13d8,13d9:13d9,13da:13da,13db:13db,13dc:13dc,13dd:13dd,13de:13de,13df:13df,13e0:13e0,13e1:13e1,13e2:13e2,13e3:13e3,13e4:13e4,13e5:13e5,13e6:13e6,13e7:13e7,13e8:13e8,13e9:13e9,13ea:13ea,13eb:13eb,13ec:13ec,13ed:13ed,13ee:13ee,13ef:13ef,13f0:13f0,13f1:13f1,13f2:13f2,13f3:13f3,13f4:13f4,13f5:13f5,13f8:13f0,13f9:13f1,13fa:13f2,13fb:13f3,13fc:13f4,13fd:13f5,1c80:432,1c81:434,1c82:43e,1c83:441,1c84:442,1c85:442,1c86:44a,1c87:463,1c88:a64b,1e96:68.331,1e97:74.308,1e98:77.30a,1e99:79.30a,1e9a:61.2be,1e9b:1e61,1e9e:73.73,1f50:3c5.313,1f52:3c5.313.300,1f54:3c5.313.301,1f56:3c5.313.342,1f80:1f00.3b9,1f81:1f01.3b9,1f82:1f02.3b9,1f83:1f03.3b9,1f84:1f04.3b9,1f85:1f05.3b9,1f86:1f06.3b9,1f87:1f07.3b9,1f88:1f00.3b9,1f89:1f01.3b9,1f8a:1f02.3b9,1f8b:1f03.3b9,1f8c:1f04.3b9,1f8d:1f05.3b9,1f8e:1f06.3b9,1f8f:1f07.3b9,1f90:1f20.3b9,1f91:1f21.3b9,1f92:1f22.3b9,1f93:1f23.3b9,1f94:1f24.3b9,1f95:1f25.3b9,1f96:1f26.3b9,1f97:1f27.3b9,1f98:1f20.3b9,1f99:1f21.3b9,1f9a:1f22.3b9,1f9b:1f23.3b9,1f9c:1f24.3b9,1f9d:1f25.3b9,1f9e:1f26.3b9,1f9f:1f27.3b9,1fa0:1f60.3b9,1fa1:1f61.3b9,1fa2:1f62.3b9,1fa3:1f63.3b9,1fa4:1f64.3b9,1fa5:1f65.3b9,1fa6:1f66.3b9,1fa7:1f67.3b9,1fa8:1f60.3b9,1fa9:1f61.3b9,1faa:1f62.3b9,1fab:1f63.3b9,1fac:1f64.3b9,1fad:1f65.3b9,1fae:1f66.3b9,1faf:1f67.3b9,1fb2:1f70.3b9,1fb3:3b1.3b9,1fb4:3ac.3b9,1fb6:3b1.342,1fb7:3b1.342.3b9,1fbc:3b1.3b9,1fbe:3b9,1fc2:1f74.3b9,1fc3:3b7.3b9,1fc4:3ae.3b9,1fc6:3b7.342,1fc7:3b7.342.3b9,1fcc:3b7.3b9,1fd2:3b9.308.300,1fd3:3b9.308.301,1fd6:3b9.342,1fd7:3b9.308.342,1fe2:3c5.308.300,1fe3:3c5.308.301,1fe4:3c1.313,1fe6:3c5.342,1fe7:3c5.308.342,1ff2:1f7c.3b9,1ff3:3c9.3b9,1ff4:3ce.3b9,1ff6:3c9.342,1ff7:3c9.342.3b9,1ffc:3c9.3b9,ab70:13a0,ab71:13a1,ab72:13a2,ab73:13a3,ab74:13a4,ab75:13a5,ab76:13a6,ab77:13a7,ab78:13a8,ab79:13a9,ab7a:13aa,ab7b:13ab,ab7c:13ac,ab7d:13ad,ab7e:13ae,ab7f:13af,ab80:13b0,ab81:13b1,ab82:13b2,ab83:13b3,ab84:13b4,ab85:13b5,ab86:13b6,ab87:13b7,ab88:13b8,ab89:13b9,ab8a:13ba,ab8b:13bb,ab8c:13bc,ab8d:13bd,ab8e:13be,ab8f:13bf,ab90:13c0,ab91:13c1,ab92:13c2,ab93:13c3,ab94:13c4,ab95:13c5,ab96:13c6,ab97:13c7,ab98:13c8,ab99:13c9,ab9a:13ca,ab9b:13cb,ab9c:13cc,ab9d:13cd,ab9e:13ce,ab9f:13cf,aba0:13d0,aba1:13d1,aba2:13d2,aba3:13d3,aba4:13d4,aba5:13d5,aba6:13d6,aba7:13d7,aba8:13d8,aba9:13d9,abaa:13da,abab:13db,abac:13dc,abad:13dd,abae:13de,abaf:13df,abb0:13e0,abb1:13e1,abb2:13e2,abb3:13e3,abb4:13e4,abb5:13e5,abb6:13e6,abb7:13e7,abb8:13e8,abb9:13e9,abba:13ea,abbb:13eb,abbc:13ec,abbd:13ed,abbe:13ee,abbf:13ef,fb00:66.66,fb01:66.69,fb02:66.6c,fb03:66.66.69,fb04:66.66.6c,fb05:73.74,fb06:73.74,fb13:574.576,fb14:574.565,fb15:574.56b,fb16:57e.576,fb17:574.56d';
import { uflags, upperOf, lowerOf, U_CASED, U_IGNORABLE, U_UPPER, U_LOWER, U_TITLE } from './unidata.js';

function table(data) {
  const m = new Map();
  for (const e of data.split(',')) {
    const [k, v] = e.split(':');
    m.set(parseInt(k, 16), String.fromCodePoint(...v.split('.').map((h) => parseInt(h, 16))));
  }
  return m;
}
let TITLE = null, FOLD = null;
const NONASCII = /[^\x00-\x7f]/;

export const isCased = (c) => (uflags(c.codePointAt(0)) & U_CASED) !== 0;
const isIgnorable = (c) => (uflags(c.codePointAt(0)) & U_IGNORABLE) !== 0;
export const isUpperCh = (c) => (uflags(c.codePointAt(0)) & U_UPPER) !== 0;      // Py_UNICODE_ISUPPER (derived Uppercase)
export const isLowerCh = (c) => (uflags(c.codePointAt(0)) & U_LOWER) !== 0;      // Py_UNICODE_ISLOWER (derived Lowercase)
export const isTitleCh = (c) => (uflags(c.codePointAt(0)) & U_TITLE) !== 0;      // Py_UNICODE_ISTITLE (category Lt)

const upperCh = upperOf;
const lowerCh = lowerOf;
function titleCh(c) { if (!TITLE) TITLE = table(TITLE_DATA); const t = TITLE.get(c.codePointAt(0)); return t !== undefined ? t : upperCh(c); }
function foldCh(c) { if (!FOLD) FOLD = table(FOLD_DATA); const t = FOLD.get(c.codePointAt(0)); return t !== undefined ? t : lowerCh(c); }
/** lower_ucs4: U+03A3 becomes final sigma when preceded by a cased letter and not followed by one */
function lowerAt(cs, i) {
  const c = cs[i];
  if (c !== '\u03a3') return lowerCh(c);
  let j = i - 1;
  while (j >= 0 && isIgnorable(cs[j])) j--;
  let fin = j >= 0 && isCased(cs[j]);
  if (fin && i + 1 < cs.length) {
    j = i + 1;
    while (j < cs.length && isIgnorable(cs[j])) j++;
    fin = j === cs.length || !isCased(cs[j]);
  }
  return fin ? '\u03c2' : '\u03c3';
}
export function pyUpper(s) { return NONASCII.test(s) ? Array.from(s, upperCh).join('') : s.toUpperCase(); }
export function pyLower(s) {
  if (!NONASCII.test(s)) return s.toLowerCase();
  const cs = Array.from(s);
  let out = '';
  for (let i = 0; i < cs.length; i++) out += lowerAt(cs, i);
  return out;
}
export function pyCasefold(s) { return NONASCII.test(s) ? Array.from(s, foldCh).join('') : s.toLowerCase(); }
export function pyTitle(s) {
  const cs = Array.from(s);
  let out = '', prev = false;
  for (let i = 0; i < cs.length; i++) { out += prev ? lowerAt(cs, i) : titleCh(cs[i]); prev = isCased(cs[i]); }
  return out;
}
export function pyCapitalize(s) {
  const cs = Array.from(s);
  if (!cs.length) return s;
  let out = titleCh(cs[0]);
  for (let i = 1; i < cs.length; i++) out += lowerAt(cs, i);
  return out;
}
export function pySwapcase(s) {
  const cs = Array.from(s);
  let out = '';
  for (let i = 0; i < cs.length; i++) { const c = cs[i]; out += isUpperCh(c) ? lowerAt(cs, i) : isLowerCh(c) ? upperCh(c) : c; }
  return out;
}
export function pyIsUpper(s) {
  let cased = false;
  for (const c of s) { if (isLowerCh(c) || isTitleCh(c)) return false; if (!cased && isUpperCh(c)) cased = true; }
  return cased;
}
export function pyIsLower(s) {
  let cased = false;
  for (const c of s) { if (isUpperCh(c) || isTitleCh(c)) return false; if (!cased && isLowerCh(c)) cased = true; }
  return cased;
}
export function pyIsTitle(s) {
  let cased = false, prev = false;
  for (const c of s) {
    if (isUpperCh(c) || isTitleCh(c)) { if (prev) return false; prev = true; cased = true; }
    else if (isLowerCh(c)) { if (!prev) return false; prev = true; cased = true; }
    else prev = false;
  }
  return cased;
}
