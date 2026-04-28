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
 *   });
 *   // ... later: drag.destroy();
 *
 * Coordinates are translated from clientX/Y to canvas-local CSS pixels so the
 * caller works in the same space they draw in.
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
  } = opts;

  const baseCursor = canvas.style.cursor || cursor;
  let active = null;

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

  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  canvas.addEventListener('pointerleave', () => {
    if (active == null) canvas.style.cursor = baseCursor;
  });

  return {
    isDragging: () => active != null,
    activeId: () => active,
    destroy() {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      canvas.style.cursor = baseCursor;
    },
  };
}
