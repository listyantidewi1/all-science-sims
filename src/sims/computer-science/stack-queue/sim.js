import { button, row, select } from '../../../lib/controls.js';

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.cssText = 'padding:var(--space-4);display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const stackWrap = document.createElement('div');
  stackWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);min-height:380px';
  stage.appendChild(stackWrap);

  const queueWrap = document.createElement('div');
  queueWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);min-height:380px';
  stage.appendChild(queueWrap);

  const state = {
    stack: [],
    queue: [],
    counter: 1,
    log: [],
  };

  function renderStack() {
    let html = `<h3 style="margin:0 0 var(--space-2);font-size:var(--type-md)">Stack (LIFO)</h3>`;
    html += `<div style="font-size:11px;color:var(--color-muted);margin-bottom:var(--space-3)">push / pop on top</div>`;
    html += `<div style="display:flex;flex-direction:column-reverse;gap:4px;min-height:280px;align-items:center;justify-content:flex-end;border-bottom:3px solid #475569;padding-bottom:8px">`;
    state.stack.forEach((v, i) => {
      const isTop = i === state.stack.length - 1;
      html += `<div style="
        padding: 8px 24px; border-radius: 6px;
        background: ${isTop ? '#0ea5e9' : '#1f2937'};
        color: white; font-family: var(--font-mono); font-weight: 700;
        border: ${isTop ? '2px solid #fbbf24' : '1px solid var(--color-border)'};
        min-width: 60px; text-align: center;
      ">${v}${isTop ? ' ← top' : ''}</div>`;
    });
    if (state.stack.length === 0) html += `<div style="color:var(--color-muted);font-size:12px">empty</div>`;
    html += `</div>`;
    stackWrap.innerHTML = html;
  }

  function renderQueue() {
    let html = `<h3 style="margin:0 0 var(--space-2);font-size:var(--type-md)">Queue (FIFO)</h3>`;
    html += `<div style="font-size:11px;color:var(--color-muted);margin-bottom:var(--space-3)">enqueue at back, dequeue from front</div>`;
    html += `<div style="display:flex;gap:4px;min-height:280px;align-items:flex-start;flex-wrap:wrap">`;
    state.queue.forEach((v, i) => {
      const isFront = i === 0;
      const isBack = i === state.queue.length - 1;
      html += `<div style="
        padding: 12px 16px; border-radius: 6px;
        background: ${isFront ? '#10b981' : isBack ? '#ec4899' : '#1f2937'};
        color: white; font-family: var(--font-mono); font-weight: 700;
        border: 1px solid var(--color-border);
        min-width: 50px; text-align: center;
      ">${v}</div>`;
    });
    if (state.queue.length === 0) html += `<div style="color:var(--color-muted);font-size:12px">empty</div>`;
    html += `</div>`;
    if (state.queue.length > 0) {
      html += `<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--color-muted);margin-top:6px">`;
      html += `<span style="color:#10b981">front (dequeue ←)</span>`;
      html += `<span style="color:#ec4899">back (enqueue ←)</span>`;
      html += `</div>`;
    }
    queueWrap.innerHTML = html;
  }

  function render() {
    renderStack();
    renderQueue();
  }
  render();

  // controls
  const pushB = button({ label: 'Push (stack)', primary: true, onClick: () => {
    state.stack.push(state.counter++);
    render();
  } });
  const popB = button({ label: 'Pop (stack)', onClick: () => {
    if (state.stack.length === 0) return;
    state.stack.pop();
    render();
  } });
  const enqB = button({ label: 'Enqueue', primary: true, onClick: () => {
    state.queue.push(state.counter++);
    render();
  } });
  const deqB = button({ label: 'Dequeue', onClick: () => {
    if (state.queue.length === 0) return;
    state.queue.shift();
    render();
  } });
  const bothB = button({ label: 'Push + Enqueue together', onClick: () => {
    const v = state.counter++;
    state.stack.push(v);
    state.queue.push(v);
    render();
  } });
  const clearB = button({ label: 'Clear all', onClick: () => {
    state.stack = []; state.queue = []; state.counter = 1;
    render();
  } });

  ctrlPanel.append(row(pushB, popB), row(enqB, deqB), row(bothB, clearB));

  return () => {};
}
