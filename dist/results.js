(() => {
  const numbers = [...document.querySelectorAll('.slot-number')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = [];
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const number = entry.target;
      observer.unobserve(number);
      const digits = [...number.dataset.number];
      number.replaceChildren();
      digits.forEach((digit, index) => {
        const window = document.createElement('span');
        window.className = 'slot-window';
        const reel = document.createElement('span');
        reel.className = 'slot-reel';
        const end = 20 + Number(digit);
        for (let n = 0; n <= end; n++) {
          const cell = document.createElement('span');
          cell.textContent = String(n % 10);
          reel.append(cell);
        }
        window.append(reel);
        number.append(window);
        const final = `translateY(-${end}em)`;
        reel.style.transform = final;
        if (typeof reel.animate === 'function') {
          const animation = reel.animate(
            [{ transform: 'translateY(0)' }, { transform: final }],
            { duration: 1900 + index * 220, delay: index * 100, easing: 'cubic-bezier(.12,.65,.18,1)', fill: 'backwards' }
          );
          animations.push(animation);
        }
      });
    });
  }, { threshold: 0.55 });
  numbers.forEach(number => { number.textContent = '0'; observer.observe(number); });
  reduced.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    animations.forEach(animation => animation.cancel());
    numbers.forEach(number => { number.textContent = number.dataset.number; });
  });
})();
