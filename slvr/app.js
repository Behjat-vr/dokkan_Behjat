const films = {
  soul: { provider: 'aparat', id: 'k83c32a', title: 'روح' },
  kungfu: { provider: 'aparat', id: 'bho4b94', title: 'كونغ فو باندا ١' },
  caminandes: { provider: 'peertube', id: '5ruRYckTcQMTMQvyqMnVsr', title: 'كاميانديز: لاميجوس' }
};

const playerLayer = document.querySelector('#playerLayer');
const playerMount = document.querySelector('#playerMount');
const home = document.querySelector('.home');
const brand = document.querySelector('.brand');
const heading = home.querySelector('h1');
const filmCards = [...document.querySelectorAll('.film-card')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function playMotion(element, frames, options) {
  if (!reduceMotion && typeof element?.animate === 'function') element.animate(frames, options);
}

function addCardTilt(card) {
  if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  card.addEventListener('pointermove', (event) => {
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty('--tilt-x', `${x * 5}deg`);
    card.style.setProperty('--tilt-y', `${y * -4}deg`);
    card.classList.add('is-tilting');
  });
  card.addEventListener('pointerleave', () => {
    card.classList.remove('is-tilting');
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  });
}

function addAmbientStars() {
  const positions = [
    ['8%', '28%', '#f28b9e', '17px'], ['17%', '76%', '#8c7ade', '14px'],
    ['29%', '16%', '#f5b94e', '12px'], ['42%', '84%', '#79bca4', '16px'],
    ['59%', '19%', '#f28b9e', '13px'], ['72%', '79%', '#f5b94e', '18px'],
    ['86%', '34%', '#8c7ade', '13px'], ['94%', '68%', '#79bca4', '15px']
  ];

  positions.forEach(([left, top, color, size], index) => {
    const star = document.createElement('span');
    star.className = 'ambient-star';
    star.setAttribute('aria-hidden', 'true');
    star.textContent = index % 3 === 0 ? '✦' : '✧';
    star.style.setProperty('--star-left', left);
    star.style.setProperty('--star-top', top);
    star.style.setProperty('--star-color', color);
    star.style.setProperty('--star-size', size);
    star.style.setProperty('--star-delay', `${index * -0.42}s`);
    home.prepend(star);
  });
}

addAmbientStars();

function revealCinema() {
  document.body.classList.remove('intro-active');
  playMotion(heading, [
    { opacity: 0, transform: 'translateY(16px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });

  filmCards.forEach((card, index) => {
    addCardTilt(card);
    playMotion(card, [
      { opacity: 0, transform: 'translateY(22px) scale(.93)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], { duration: 480, delay: 90 + index * 90, easing: 'cubic-bezier(.2,.8,.2,1)' });
  });
}

if (reduceMotion) {
  revealCinema();
} else {
  let introFallback = window.setTimeout(revealCinema, 2300);
  brand.addEventListener('animationend', (event) => {
    if (event.animationName !== 'brand-intro') return;
    window.clearTimeout(introFallback);
    revealCinema();
  }, { once: true });
}

function makeIframe(src, title) {
  const iframe = document.createElement('iframe');
  iframe.title = title;
  iframe.src = src;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  return iframe;
}

function playFilm(key) {
  const film = films[key];
  if (!film) return;

  playerLayer.hidden = false;
  playerMount.replaceChildren();
  playMotion(playerLayer, [
    { opacity: 0.55, transform: 'scale(.99)' },
    { opacity: 1, transform: 'scale(1)' }
  ], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
  const embedUrl = film.provider === 'peertube'
    ? `https://video.blender.org/videos/embed/${film.id}?${new URLSearchParams({ autoplay: '1', muted: '1', title: '0', warningTitle: '0', controlBar: '1', peertubeLink: '0', p2p: '0' })}`
    : `https://www.aparat.com/video/video/embed/videohash/${film.id}/vt/frame?${new URLSearchParams({ autoplay: 'true', muted: 'true', titleShow: 'false' })}`;
  playerMount.appendChild(makeIframe(embedUrl, film.title));

}

function closePlayer() {
  playerMount.replaceChildren();
  playerLayer.hidden = true;
  playMotion(home, [
    { opacity: 0.72, transform: 'scale(.985)' },
    { opacity: 1, transform: 'scale(1)' }
  ], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' });
}

document.querySelectorAll('[data-film]').forEach((card) => {
  card.addEventListener('click', () => playFilm(card.dataset.film));
});
document.querySelector('#closePlayer').addEventListener('click', closePlayer);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !playerLayer.hidden) closePlayer();
});
