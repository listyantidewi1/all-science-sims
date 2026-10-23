// Rendering of SyntaxError reports, ported from CPython 3.13 Lib/traceback.py
// (TracebackException._format_syntax_error), so carets match `python3 main.py`.

/**
 * @param {{type: string, msg: string, line: number, col?: number|null, endLine?: number|null, endCol?: number|null}} err
 *   col / endCol are CPython's 1-based `offset` / `end_offset` (endCol may be -1, 0 or null like CPython's).
 * @param {string|null} text  the source line including its '\n' when the file continues (CPython's `text`)
 * @param {string} filename
 */
export function formatSyntaxError(err, text, filename) {
  let tb = `  File "${filename}", line ${err.line}\n`;
  if (typeof text === 'string') {
    const rtext = text.replace(/\n+$/, '');
    const ltext = rtext.replace(/^[ \n\f]+/, '');
    const spaces = rtext.length - ltext.length;
    if (err.col == null) tb += `    ${ltext}\n`;
    else {
      let offset = err.col;
      let end;
      if (err.line === err.endLine) end = Number.isInteger(err.endCol) && err.endCol !== 0 ? err.endCol : offset;
      else end = rtext.length + 1;
      if (text && offset > text.length) offset = rtext.length + 1;
      if (text && end > text.length) end = rtext.length + 1;
      if (offset >= end || end < 0) end = offset + 1;
      const colno = offset - 1 - spaces, endColno = end - 1 - spaces;
      tb += `    ${ltext}\n`;
      if (colno >= 0) {
        const space = Array.from(ltext.slice(0, colno), (c) => (/\s/.test(c) ? c : ' ')).join('');
        tb += `    ${space}${'^'.repeat(Math.max(0, endColno - colno))}\n`;
      }
    }
  }
  return tb + `${err.type}: ${err.msg || '<no detail available>'}`;
}

/** CPython's `text` attribute for a SyntaxError on `line` of a file split on '\n' (null when out of range). */
export function errorLineText(rawLines, line) {
  if (!(line >= 1 && line <= rawLines.length)) return null;
  const t = rawLines[line - 1];
  return line < rawLines.length ? t + '\n' : t;
}
