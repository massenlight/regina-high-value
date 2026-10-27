(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero');
  const targets = document.querySelectorAll('.section-heading,.pain-grid article,.method-grid article,.mentor-editorial,.mentor-portrait,.mind-heart,.journey-heading,.audience-grid article,.support-list article,.enroll-card,.enroll-grid>div,.faq>div:first-child');
  const reveal = new IntersectionObserver(entries => entries.forEach(({target,isIntersecting}) => {
    if(isIntersecting) { target.classList.add('is-visible'); reveal.unobserve(target); }
  }), {threshold:0.08,rootMargin:'0px 0px -20px 0px'});
  targets.forEach((el,i) => { el.classList.add('atelier-reveal'); el.style.setProperty('--reveal-delay',`${(i%3)*65}ms`); reveal.observe(el); });
  document.documentElement.classList.add('motion-ready');
  let frame = 0;
  const update = () => {
    frame = 0; header.classList.toggle('is-scrolled', scrollY>25);
    if (!reduced.matches && innerWidth>760) hero.style.setProperty('--portrait-y',`${Math.min(scrollY,800)*.065}px`);
  };
  addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update)},{passive:true});
  reduced.addEventListener('change',update); update();
  const nav = [...document.querySelectorAll('.header nav a')];
  const active = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting)nav.forEach(a=>a.classList.toggle('is-current',a.hash===`#${entry.target.id}`));
  }),{rootMargin:'-15% 0px -55% 0px'});
  nav.forEach(a=>{const section=document.querySelector(a.hash);if(section)active.observe(section);});
})();
