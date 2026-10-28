// Await verified Regina sessions and LINE integration; no anonymous registration writes.
(() => {
  const form = document.querySelector('#webinar-form');
  if (!form) return;
  form.addEventListener('submit', event => event.preventDefault());
})();
