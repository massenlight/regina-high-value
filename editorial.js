(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const targets=[...document.querySelectorAll('.editorial-heading,.editorial-shifts article,.practice-note,.mentor-editorial,.editorial-results>div,.course-volume,.course-takeaway,.enroll-card')];
 if(!reduced.matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.05});targets.forEach((el,i)=>{el.classList.add('ed-reveal');el.style.setProperty('--delay',`${i%3*70}ms`);observer.observe(el);});document.documentElement.classList.add('ed-motion');}
 reduced.addEventListener('change',()=>{if(reduced.matches)document.documentElement.classList.remove('ed-motion');});
 const openHash=()=>{const id=decodeURIComponent(location.hash.slice(1));const target=document.getElementById(id);if(target?.tagName==='DETAILS')target.open=true;};
 addEventListener('hashchange',openHash);openHash();
})();
