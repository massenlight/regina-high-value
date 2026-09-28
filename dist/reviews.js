(() => {
  const section = document.querySelector('#reviews');
  if (!section) return;
  const track = section.querySelector('.reviews-track');
  const toggle = section.querySelector('[data-review-toggle]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motion.matches, hovering = false, focused = false, visible = false;
  const sync = () => { toggle.textContent = paused ? '播放' : '暫停'; toggle.setAttribute('aria-label', paused ? '播放自動滑動' : '暫停自動滑動'); };
  const move = (direction) => {
    const step = track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    const end = track.scrollWidth - track.clientWidth;
    const target = direction > 0 && track.scrollLeft >= end - 2 ? 0 : direction < 0 && track.scrollLeft <= 2 ? end : track.scrollLeft + direction * step;
    track.scrollTo({left: target, behavior: motion.matches ? 'instant' : 'smooth'});
  };
  section.querySelector('[data-review-prev]').addEventListener('click', () => move(-1));
  section.querySelector('[data-review-next]').addEventListener('click', () => move(1));
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  section.addEventListener('pointerenter', () => hovering = true);
  section.addEventListener('pointerleave', () => hovering = false);
  section.addEventListener('focusin', () => focused = true);
  section.addEventListener('focusout', e => focused = section.contains(e.relatedTarget));
  track.addEventListener('pointerdown', e => { if(e.pointerType === 'touch'){ paused = true; sync(); } });
  motion.addEventListener('change', () => { paused = motion.matches; sync(); });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(section);
  setInterval(() => { if(visible && !paused && !hovering && !focused && !document.hidden) move(1); }, 8000);
  sync();
})();
