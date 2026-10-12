/**
 * dragHandle — turn a canvas into a drag surface for one or more handles.
 *
 *   const drag = dragHandle(cv.canvas, {
 *     hitTest(x, y) { ... return 'pointA' | null },
 *     onStart(id, x, y),
 *     onDrag(id, x, y),  // x, y in canvas CSS pixels
 *     onEnd(id),
 *     cursor: 'grab',
 *     hoverCursor: 'pointer',  // when hovering over a hit
 *
 *     // Optional, but strongly encouraged: makes every handle reachable by
 *     // keyboard and screen reader. Return the CURRENT position of each
 *     // handle in the same canvas CSS-pixel space hitTest uses.
 *     handles: () => [{ id: 'pointA', x, y, label: 'Point A' }],
 *     keyStep: 4,        // px per arrow press (Shift multiplies by 5)
 *   });
 *   // ... later: drag.destroy();
 *
 * Coordinates are translated from clientX/Y to canvas-local CSS pixels so the
 * caller works in the same space they draw in.
 *
 * Keyboard: when `handles` is given, an invisible focusable button is placed
 * over each handle (Tab reaches them, arrows nudge, Shift+arrow nudges more).
 * A nudge is delivered as onStart → onDrag → onEnd with the displaced
 * position, so sims written for pointer drags work unchanged.
 */
export function dragHandle(canvas, opts) {
  const {
    hitTest,
    onStart,
    onDrag,
    onEnd,
    cursor = 'grab',
    hoverCursor = 'pointer',
    grabbingCursor = 'grabbing',
    handles = null,
    keyStep = 4,
  } = opts;

  const baseCursor = canvas.style.cursor || cursor;
  let active = null;

  // Without this, a touch drag scrolls the page instead of moving the handle.
  canvas.style.touchAction = 'none';

  function localPos(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (canvas.width / r.width) / (window.devicePixelRatio || 1),
      y: (e.clientY - r.top) * (canvas.height / r.height) / (window.devicePixelRatio || 1),
    };
  }

  function down(e) {
    const p = localPos(e);
    const id = hitTest(p.x, p.y);
    if (id == null) return;
    e.preventDefault();
    active = id;
    canvas.style.cursor = grabbingCursor;
    if (canvas.setPointerCapture && e.pointerId != null) {
      try { canvas.setPointerCapture(e.pointerId); } catch {}
    }
    onStart?.(id, p.x, p.y);
  }

  function move(e) {
    if (active == null) {
      if (hoverCursor) {
        const p = localPos(e);
        const hit = hitTest(p.x, p.y);
        canvas.style.cursor = hit != null ? hoverCursor : baseCursor;
      }
      return;
    }
    const p = localPos(e);
    onDrag?.(active, p.x, p.y);
  }

  function up() {
    if (active == null) return;
    const id = active;
    active = null;
    canvas.style.cursor = baseCursor;
    onEnd?.(id);
  }

  const leave = () => { if (active == null) canvas.style.cursor = baseCursor; };

  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
  canvas.addEventListener('pointerleave', leave);

  // ---- Keyboard / assistive layer -------------------------------------
  let a11y = null;
  if (typeof handles === 'function') a11y = mountA11yLayer();

  function nudge(id, dx, dy) {
    const list = handles() || [];
    const h = list.find((it) => it.id === id);
    if (!h) return;
    onStart?.(id, h.x, h.y);
    onDrag?.(id, h.x + dx, h.y + dy);
    onEnd?.(id);
  }

  function mountA11yLayer() {
    const parent = canvas.parentElement;
    if (!parent) return null;
    if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';

    const layer = document.createElement('div');
    layer.className = 'handle-a11y';
    layer.setAttribute('role', 'group');
    layer.setAttribute('aria-label', 'Draggable handles (use Tab, then arrow keys)');
    parent.appendChild(layer);

    const buttons = new Map(); // id -> button

    function keydown(e) {
      const id = e.currentTarget.dataset.handleId;
      const step = keyStep * (e.shiftKey ? 5 : 1);
      let dx = 0, dy = 0;
      switch (e.key) {
        case 'ArrowLeft':  dx = -step; break;
        case 'ArrowRight': dx = step;  break;
        case 'ArrowUp':    dy = -step; break;
        case 'ArrowDown':  dy = step;  break;
        default: return;
      }
      e.preventDefault();
      nudge(parseId(id), dx, dy);
    }

    // Handle ids may be strings or numbers (array indices); keep them intact.
    const idKey = (id) => (typeof id === 'number' ? `n:${id}` : `s:${id}`);
    const parseId = (key) => (key.startsWith('n:') ? Number(key.slice(2)) : key.slice(2));

    function sync() {
      let list;
      try { list = handles() || []; } catch { list = []; }
      const seen = new Set();
      const r = canvas.getBoundingClientRect();
      const pr = parent.getBoundingClientRect();
      const offX = r.left - pr.left + parent.scrollLeft;
      const offY = r.top - pr.top + parent.scrollTop;
      for (const h of list) {
        if (h == null || h.id == null || !Number.isFinite(h.x) || !Number.isFinite(h.y)) continue;
        const key = idKey(h.id);
        seen.add(key);
        let b = buttons.get(key);
        if (!b) {
          b = document.createElement('button');
          b.type = 'button';
          b.className = 'handle-a11y__btn';
          b.dataset.handleId = key;
          b.addEventListener('keydown', keydown);
          buttons.set(key, b);
          layer.appendChild(b);
        }
        const label = h.label || String(h.id);
        if (b.getAttribute('aria-label') !== label) b.setAttribute('aria-label', label);
        b.style.transform = `translate(${(offX + h.x).toFixed(1)}px, ${(offY + h.y).toFixed(1)}px)`;
      }
      for (const [key, b] of buttons) {
        if (!seen.has(key)) { b.remove(); buttons.delete(key); }
      }
    }

    let raf = 0;
    const tick = () => { sync(); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);

    return {
      destroy() {
        cancelAnimationFrame(raf);
        layer.remove();
        buttons.clear();
      },
    };
  }

  return {
    isDragging: () => active != null,
    activeId: () => active,
    /** Programmatic nudge (also what the keyboard layer calls). */
    nudge,
    destroy() {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      canvas.removeEventListener('pointerleave', leave);
      canvas.style.cursor = baseCursor;
      a11y?.destroy();
    },
  };
}
