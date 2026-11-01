'use strict';
// Play only the selected testimonial; keep the other interviews quiet.
const videos = [...document.querySelectorAll('video')];
for (const video of videos) {
  video.addEventListener('play', () => {
    for (const other of videos) if (other !== video) other.pause();
  });
}
const sticky = document.querySelector('.mobile-cta');
const signup = document.querySelector('#signup');
if ('IntersectionObserver' in window && sticky && signup) {
  new IntersectionObserver(entries => {
    const visible = entries.some(entry => entry.isIntersecting);
    sticky.classList.toggle('is-hidden', visible);
    sticky.inert = visible;
  }, {threshold: .15}).observe(signup);
}
