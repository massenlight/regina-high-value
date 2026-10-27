// UI preview only: no requests, browser storage, LINE login or registration writes.
(() => {
  const form = document.querySelector('#webinar-form');
  const preview = document.querySelector('#webinar-line-preview');
  if (!form || !preview) return;
  const steps = [...document.querySelectorAll('.webinar-flow li')];
  const activate = index => steps.forEach((step,i) => {
    if (i===index) step.setAttribute('aria-current','step');
    else step.removeAttribute('aria-current');
  });
  form.addEventListener('submit',event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.hidden = true; preview.hidden = false; activate(1);
    preview.focus({preventScroll:true});
    preview.scrollIntoView({block:'center',behavior:'auto'});
  });
  document.querySelector('.webinar-back').addEventListener('click',() => {
    preview.hidden = true; form.hidden = false; activate(0);
    form.querySelector('input').focus({preventScroll:true});
    form.scrollIntoView({block:'center',behavior:'auto'});
  });
})();
