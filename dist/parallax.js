(() => {
  const hero = document.querySelector('.hero-parallax');
  if (!hero) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  let frame = 0;
  function update() {
    frame = 0;
    const rect = hero.getBoundingClientRect();
    const distance = reduced.matches ? 0 : Math.min(Math.max(-rect.top, 0), rect.height);
    const factor = mobile.matches ? .4 : 1;
    hero.style.setProperty('--audience-y', `${distance * .24 * factor}px`);
    hero.style.setProperty('--speaker-y', `${-distance * .075 * factor}px`);
    hero.style.setProperty('--title-y', `${distance * .12 * factor}px`);
  }
  function queue() { if (!frame) frame = requestAnimationFrame(update); }
  addEventListener('scroll', queue, {passive:true});
  addEventListener('resize', queue);
  reduced.addEventListener('change', queue);
  mobile.addEventListener('change', queue);
  update();
})();
