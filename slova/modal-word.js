/**
 * SlovaWordModal — AddWordModal
 * Stub for Stage 1 (fills in during Stage 2 - Agent D)
 */

var SlovaWordModal = (function () {
  function open(root, opts) {
    // Stub: just show a placeholder
    root.innerHTML = '<div class="slova-stub" style="padding:20px">Модалка — в работе</div>';
  }

  function close() {
    var root = document.getElementById('slova-modal-root');
    if (root) root.innerHTML = '';
  }

  return { open: open, close: close };
}());

window.SlovaWordModal = SlovaWordModal;
