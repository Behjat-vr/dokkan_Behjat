const films = {
  youtube: {
    title: 'قصص عجایب قرآن',
    subtitle: 'برصیصا · قسمت ۲۷، بخش اول',
    source: 'قصه‌ی تصویری · YouTube',
    description: 'یک قصه‌ی تصویری از مجموعه‌ی قصص عجایب قرآن',
    art: 'art-youtube',
    type: 'youtube',
    id: 'incY1Y9qgQU'
  },
  aparat: {
    title: 'انیمیشن دوم',
    subtitle: 'قصه‌ی تصویری · آپارات',
    source: 'قصه‌ی تصویری · آپارات',
    description: 'نمونه‌ی دوم برای پرده‌ی سینمای SLVR',
    art: 'art-aparat',
    type: 'aparat',
    id: 'y053odm'
  }
};

const screenArt = document.querySelector('#screenArt');
const screenPlayer = document.querySelector('#screenPlayer');
const playerMount = document.querySelector('#playerMount');
const screenState = document.querySelector('#screenState');
const toast = document.querySelector('#toast');
const youtubePoster = document.querySelector('#youtubePoster');
const artFallback = document.querySelector('#artFallback');
const fallbackLetter = document.querySelector('.fallback-letter');
const fallbackCaption = document.querySelector('.fallback-caption');
let selectedFilm = 'youtube';
let toastTimer;
let aparatTimer;
let customFilm = null;

function getFilm(key) {
  return key === 'custom' ? customFilm : films[key];
}

function parseVideoLink(value) {
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error('لینک رو بررسی کن و دوباره بفرست.');
  }
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('لینک ویدئو باید با https یا http شروع بشه.');

  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'youtu.be'].includes(host)) {
    const parts = url.pathname.split('/').filter(Boolean);
    const id = host === 'youtu.be' ? parts[0] : url.searchParams.get('v') || (['embed', 'shorts', 'live'].includes(parts[0]) ? parts[1] : '');
    if (!/^[\w-]{11}$/.test(id || '')) throw new Error('این لینک YouTube ویدئوی قابل پخشی نداره.');
    return { title: 'قصه‌ی تازه', subtitle: 'لینک تازه · YouTube', source: 'لینک تازه · YouTube', description: 'ویدئوی انتخاب‌شده روی پرده‌ی سینمای SLVR', type: 'youtube', id, art: 'art-custom' };
  }

  if (host === 'aparat.com' || host.endsWith('.aparat.com')) {
    const parts = url.pathname.split('/').filter(Boolean);
    const marker = parts.findIndex((part) => ['v', 'embed'].includes(part.toLowerCase()));
    const id = marker >= 0 ? parts[marker + 1] : '';
    if (!/^[\w-]{4,40}$/.test(id || '')) throw new Error('لینک آپارات باید از صفحه‌ی خود ویدئو یا embed آن باشه.');
    return { title: 'قصه‌ی تازه', subtitle: 'لینک تازه · آپارات', source: 'لینک تازه · آپارات', description: 'ویدئوی انتخاب‌شده روی پرده‌ی سینمای SLVR', type: 'aparat', id, art: 'art-custom' };
  }

  if (/\.(mp4|webm|ogv|ogg)$/i.test(url.pathname)) {
    return { title: 'قصه‌ی تازه', subtitle: 'ویدئوی مستقیم', source: 'لینک تازه · ویدئوی مستقیم', description: 'ویدئوی انتخاب‌شده روی پرده‌ی سینمای SLVR', type: 'file', url: url.href, art: 'art-custom' };
  }

  throw new Error('این لینک پشتیبانی نمی‌شه؛ YouTube، آپارات یا فایل MP4 / WebM بده.');
}

function selectFilm(key) {
  const film = getFilm(key);
  if (!film) return;
  if (!screenPlayer.hidden) closePlayback();
  selectedFilm = key;

  document.querySelectorAll('[data-film]').forEach((button) => {
    const selected = button.dataset.film === key;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  screenArt.classList.remove('art-youtube', 'art-aparat', 'art-custom');
  screenArt.classList.add(film.art);
  youtubePoster.hidden = film.type !== 'youtube';
  artFallback.hidden = film.type === 'youtube';
  fallbackLetter.textContent = film.type === 'aparat' ? 'A' : '▶';
  fallbackCaption.textContent = film.type === 'aparat' ? 'APARAT' : 'ویدئو';
  if (film.type === 'youtube') youtubePoster.src = 'https://i.ytimg.com/vi/' + film.id + '/hqdefault.jpg';
  document.querySelector('#filmTitle').textContent = film.title;
  document.querySelector('#filmSubtitle').textContent = film.subtitle;
  document.querySelector('#captionTitle').textContent = film.title;
  document.querySelector('#captionDescription').textContent = film.description;
  document.querySelector('#filmSource').textContent = film.source;
  screenState.classList.remove('is-playing');
  screenState.querySelector('span:last-child').textContent = 'آماده‌ی اکران';
}

function startPlayback() {
  const film = getFilm(selectedFilm);
  if (!film) return;
  clearTimeout(aparatTimer);
  playerMount.replaceChildren();
  screenArt.hidden = true;
  screenPlayer.hidden = false;
  screenState.classList.add('is-playing');
  screenState.querySelector('span:last-child').textContent = 'در حال اکران';

  if (film.type === 'youtube') {
    const iframe = document.createElement('iframe');
    iframe.title = film.title;
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + film.id + '?autoplay=1&playsinline=1&rel=0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    playerMount.appendChild(iframe);
    return;
  }

  if (film.type === 'file') {
    const video = document.createElement('video');
    video.title = film.title;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.src = film.url;
    video.addEventListener('error', () => showToast('این فایل ویدئویی در وب‌ویو باز نشد؛ لینک مستقیم فایل رو بررسی کن.'));
    playerMount.appendChild(video);
    return;
  }

  const embedId = String(Date.now());
  const host = document.createElement('div');
  host.id = embedId;
  host.className = 'aparat-embed-host';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://www.aparat.com/embed/' + film.id + '?data[rnddiv]=' + embedId + '&data[responsive]=yes&titleShow=true';
  script.addEventListener('error', () => showToast('پخش آپارات در این وب‌ویو در دسترس نیست.'));
  host.appendChild(script);
  playerMount.appendChild(host);

  aparatTimer = setTimeout(() => {
    if (getFilm(selectedFilm) === film && !playerMount.querySelector('iframe')) {
      showToast('اگر پلیر آپارات باز نشد، اتصال وب‌ویو به آپارات را بررسی کن.');
    }
  }, 9000);
}

function closePlayback() {
  clearTimeout(aparatTimer);
  playerMount.replaceChildren();
  screenPlayer.hidden = true;
  screenArt.hidden = false;
  screenState.classList.remove('is-playing');
  screenState.querySelector('span:last-child').textContent = 'آماده‌ی اکران';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

document.querySelectorAll('[data-film]').forEach((button) => {
  button.addEventListener('click', () => selectFilm(button.dataset.film));
});

document.querySelector('#customLinkForm').addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    customFilm = parseVideoLink(document.querySelector('#videoLink').value);
    selectFilm('custom');
    startPlayback();
    document.querySelector('#videoLink').value = '';
  } catch (error) {
    showToast(error.message || 'لینک ویدئو رو بررسی کن.');
  }
});

document.querySelector('#screenPlayButton').addEventListener('click', startPlayback);
document.querySelector('#captionPlayButton').addEventListener('click', startPlayback);
document.querySelector('#closePlayback').addEventListener('click', closePlayback);

document.querySelector('#fullscreenButton').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.querySelector('#screenFrame').requestFullscreen();
  } catch {
    showToast('حالت تمام‌صفحه در این وب‌ویو پشتیبانی نمی‌شود.');
  }
});

document.addEventListener('fullscreenchange', () => {
  const isFullscreen = Boolean(document.fullscreenElement);
  const button = document.querySelector('#fullscreenButton');
  button.setAttribute('aria-label', isFullscreen ? 'خروج از تمام‌صفحه' : 'نمایش تمام‌صفحه');
  button.title = isFullscreen ? 'خروج از تمام‌صفحه' : 'نمایش تمام‌صفحه';
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !screenPlayer.hidden) closePlayback();
});

youtubePoster.addEventListener('error', () => {
  youtubePoster.hidden = true;
  screenArt.classList.add('poster-unavailable');
});
youtubePoster.addEventListener('load', () => screenArt.classList.remove('poster-unavailable'));

selectFilm('youtube');
