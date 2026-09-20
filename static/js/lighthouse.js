// static/js/lighthouse.js
document.addEventListener('click', function (e) {
  if (!e.target.matches('.avatar')) return;

  const src = e.target.src;
  const alt = e.target.alt || 'Avatar image';
  const overlay = document.createElement('div');

  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', alt);
  overlay.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px';
  overlay.innerHTML = `
    <div style="max-width:100%;max-height:100%;display:flex;flex-direction:column;align-items:center;gap:12px">
      <img src="${src}" alt="${alt}" style="max-width:90%;max-height:80%;border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,0.6)">
      <button id="overlay-close" style="background:transparent;border:1px solid rgba(255,255,255,0.08);color:#fff;padding:.4rem .7rem;border-radius:6px;cursor:pointer">Close</button>
    </div>
  `;

  // prevent background scroll
  const prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';

  // close handlers
  function removeOverlay() {
    overlay.remove();
    document.documentElement.style.overflow = prevOverflow || '';
    document.removeEventListener('keydown', onKeyDown);
  }

  overlay.addEventListener('click', function (ev) {
    if (ev.target === overlay) removeOverlay();
  });

  overlay.querySelector('#overlay-close').addEventListener('click', removeOverlay);

  function onKeyDown(ev) {
    if (ev.key === 'Escape') removeOverlay();
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') ev.stopPropagation();
  }
  document.addEventListener('keydown', onKeyDown);

  document.body.appendChild(overlay);
  // move focus to close button for accessibility
  overlay.querySelector('#overlay-close').focus();
});

