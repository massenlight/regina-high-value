(() => {
  const scene = document.querySelector('.sales-journey');
  if (!scene) return;
  const cards = [...scene.querySelectorAll('[data-step]')];
  const links = [...scene.querySelectorAll('[data-step-link]')];
  const track = scene.querySelector('.chapter-title-track');
  const row = scene.querySelector('.chapter-title-row');
  const counter = scene.querySelector('#chapter-count');
  let active = -1;
  let queued = false;
  function update() {
    queued = false;
    const focus = window.innerHeight * (window.innerWidth <= 760 ? 0.48 : 0.5);
    let next = 0;
    let distance = Infinity;
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const delta = Math.abs(rect.top + rect.height / 2 - focus);
      if (delta < distance) { distance = delta; next = index; }
    });
    track.style.transform = `translateY(${-next * row.getBoundingClientRect().height}px)`;
    scene.style.setProperty('--chapter-progress', `${(next + 1) / cards.length * 100}%`);
    if (next === active) return;
    active = next;
    counter.textContent = String(next + 1).padStart(2, '0');
    links.forEach((link, i) => {
      if (i === next) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    cards.forEach((card, i) => card.classList.toggle('is-active', i === next));
  }
  function requestUpdate() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('pageshow', requestUpdate);
  if ('ResizeObserver' in window) new ResizeObserver(requestUpdate).observe(scene);
  if (document.fonts) document.fonts.ready.then(requestUpdate);
  update();
})();
