const films = {
  soul: { id: 'k83c32a', title: 'روح' },
  kungfu: { id: 'bho4b94', title: 'كونغ فو باندا ١' },
  spies: { id: 'aztr19j', title: 'جواسيس متخفّون' }
};

const playerLayer = document.querySelector('#playerLayer');
const playerMount = document.querySelector('#playerMount');
const home = document.querySelector('.home');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function playMotion(element, frames, options) {
  if (!reduceMotion && typeof element?.animate === 'function') element.animate(frames, options);
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
document.querySelectorAll('.film-card').forEach((card, index) => {
  playMotion(card, [
    { opacity: 0, transform: 'translateY(20px) scale(.94)' },
    { opacity: 1, transform: 'translateY(0) scale(1)' }
  ], { duration: 480, delay: index * 85, easing: 'cubic-bezier(.2,.8,.2,1)' });
});

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
  const params = new URLSearchParams({ autoplay: 'true', muted: 'true', titleShow: 'false' });
  playerMount.appendChild(makeIframe(`https://www.aparat.com/video/video/embed/videohash/${film.id}/vt/frame?${params}`, film.title));

  if (typeof playerLayer.requestFullscreen === 'function') {
    try {
      const request = playerLayer.requestFullscreen({ navigationUI: 'hide' });
      request?.catch(() => {});
    } catch {}
  }
}

function closePlayer() {
  playerMount.replaceChildren();
  playerLayer.hidden = true;
  if (document.fullscreenElement === playerLayer) {
    const request = document.exitFullscreen?.();
    request?.catch(() => {});
  }
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
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement !== playerLayer && !playerLayer.hidden) closePlayer();
});
