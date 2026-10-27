// Original slot-roll motion, with enough line height for complete Georgia digits.
(() => {
  const numbers = [...document.querySelectorAll('.slot-number')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = [];
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({target:number,isIntersecting}) => {
      if (!isIntersecting) return;
      observer.unobserve(number);
      number.replaceChildren();
      [...number.dataset.number].forEach((digit,index) => {
        const window = document.createElement('span');
        window.className = 'slot-window';
        const reel = document.createElement('span');
        reel.className = 'slot-reel';
        const end = 20 + Number(digit);
        for (let n=0;n<=end;n++) {
          const cell = document.createElement('span');
          cell.textContent = String(n%10);
          reel.append(cell);
        }
        window.append(reel); number.append(window);
        const final = `translateY(-${end * 1.2}em)`;
        reel.style.transform = final;
        if (typeof reel.animate === 'function') animations.push(reel.animate(
          [{transform:'translateY(0)'},{transform:final}],
          {duration:1900+index*220,delay:index*100,easing:'cubic-bezier(.12,.65,.18,1)',fill:'backwards'}
        ));
      });
    });
  },{threshold:.55});
  numbers.forEach(number => observer.observe(number));
  reduced.addEventListener('change',event => {
    if (!event.matches) return;
    observer.disconnect(); animations.forEach(a=>a.cancel());
    numbers.forEach(n=>{n.textContent=n.dataset.number;});
  });
})();
