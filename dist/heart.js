(() => {
  const root = document.querySelector('.mind-heart');
  if (!root) return;
  const buttons = [...root.querySelectorAll('[data-heart-node]')];
  const panels = [...root.querySelectorAll('[data-heart-panel]')];
  const lines = [...root.querySelectorAll('[data-heart-line]')];
  const activate = index => {
    buttons.forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === index));
      button.classList.toggle('is-active', i === index);
      panels[i].hidden = i !== index;
      lines[i].classList.toggle('is-active', i === index);
    });
  };
  buttons.forEach((button, index) => {
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') activate(index);
    });
    button.addEventListener('focus', () => activate(index));
    button.addEventListener('click', () => activate(index));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + buttons.length - 1) % buttons.length;
      if (next === undefined) return;
      event.preventDefault();
      buttons[next].focus();
    });
  });
  activate(0);
})();
