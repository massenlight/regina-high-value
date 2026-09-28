(() => {
  const root = document.querySelector('.life-section');
  if (!root) return;
  const controls = [...root.querySelectorAll('[data-life-layer], [data-life-card]')];
  let selected = null;
  const keyOf = node => node.dataset.lifeLayer || node.dataset.lifeCard;
  const display = key => {
    controls.forEach(node => {
      const active = keyOf(node) === key;
      node.classList.toggle('is-highlighted', active);
      node.setAttribute('aria-pressed', String(keyOf(node) === selected));
    });
  };
  controls.forEach(node => {
    node.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') display(keyOf(node));
    });
    node.addEventListener('pointerleave', () => display(selected));
    node.addEventListener('focus', () => display(keyOf(node)));
    node.addEventListener('blur', () => display(selected));
    node.addEventListener('click', () => {
      selected = selected === keyOf(node) ? null : keyOf(node);
      display(selected);
    });
    if (node.matches('[data-life-layer]')) {
      node.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          node.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
      });
    }
  });
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape') { selected = null; display(null); }
  });
})();
