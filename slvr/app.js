const films = {
  soul: { id: 'k83c32a', title: 'روح' },
  kungfu: { id: 'bho4b94', title: 'كونغ فو باندا ١' },
  spies: { id: 'aztr19j', title: 'جواسيس متخفّون' }
};

const playerLayer = document.querySelector('#playerLayer');
const playerMount = document.querySelector('#playerMount');

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
