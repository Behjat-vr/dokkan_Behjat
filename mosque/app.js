const items = {
  'mosque-adab': {
    title: 'آداب مسجد',
    type: 'lesson'
  },
  salah: {
    title: 'نماز در مسجد',
    type: 'aparat',
    id: 'NXiEn'
  },
  amanat: {
    title: 'امانت‌داری؛ قصه‌ای از امام علی (ع)',
    type: 'aparat',
    id: 'dYrom'
  },
  'good-morals': {
    title: 'داستان نیکوکاری',
    type: 'shiatv',
    id: '61cebf9f3218be972e46'
  },
  respect: {
    title: 'احترام به بزرگ‌ترها',
    type: 'shiatv',
    id: '31dade3e8ef4916a3e82'
  },
  'prophet-advice': {
    title: 'پندهایی از پیامبر (ص)',
    type: 'shiatv',
    id: 'f75f539a2d44326694b5'
  },
  noha: {
    title: 'نوای حسینی',
    type: 'shiatv',
    id: 'f7736089c757404650e4'
  }
};

const library = document.querySelector('#library');
const viewer = document.querySelector('#viewer');
const viewerTitle = document.querySelector('#viewerTitle');
const viewerContent = document.querySelector('#viewerContent');
const closeViewerButton = document.querySelector('#closeViewer');
let lastFocusedCard = null;

function makeFrame(src, title) {
  const frame = document.createElement('iframe');
  frame.title = title;
  frame.src = src;
  frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  return frame;
}

function showLesson() {
  const panel = document.createElement('div');
  panel.className = 'lesson-panel';
  panel.innerHTML = `
    <div class="lesson-icon" aria-hidden="true">🕌</div>
    <h3>در مسجد چه کارهای قشنگی می‌کنیم؟</h3>
    <ol class="lesson-steps">
      <li><span class="step-number">۱</span><span>با آرامش وارد می‌شویم و سلام می‌کنیم.</span></li>
      <li><span class="step-number">۲</span><span>صدایمان را آرام نگه می‌داریم تا همه راحت باشند.</span></li>
      <li><span class="step-number">۳</span><span>به تمیزی مسجد کمک می‌کنیم و با دیگران مهربانیم.</span></li>
    </ol>`;
  viewerContent.append(panel);
}

function openViewer(itemKey, card) {
  const item = items[itemKey];
  if (!item) return;

  lastFocusedCard = card;
  viewerTitle.textContent = item.title;
  viewerContent.replaceChildren();
  viewer.hidden = false;
  document.body.classList.add('viewer-open');

  if (item.type === 'lesson') {
    showLesson();
  } else if (item.type === 'aparat') {
    const params = new URLSearchParams({ autoplay: 'true', muted: 'true', titleShow: 'false' });
    const src = `https://www.aparat.com/video/video/embed/videohash/${item.id}/vt/frame?${params}`;
    viewerContent.append(makeFrame(src, item.title));
  } else {
    viewerContent.append(makeFrame(`https://shiatv.net/video/${item.id}`, item.title));
  }

  closeViewerButton.focus({ preventScroll: true });
}

function closeViewer() {
  if (viewer.hidden) return;
  viewer.hidden = true;
  document.body.classList.remove('viewer-open');
  viewerContent.replaceChildren();
  if (lastFocusedCard?.isConnected) lastFocusedCard.focus({ preventScroll: true });
  lastFocusedCard = null;
}

library.addEventListener('click', (event) => {
  const card = event.target.closest('[data-item]');
  if (card) openViewer(card.dataset.item, card);
});

closeViewerButton.addEventListener('click', closeViewer);
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) closeViewer();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !viewer.hidden) closeViewer();
});

window.addEventListener('popstate', () => {
  if (!viewer.hidden) closeViewer();
});

document.querySelectorAll('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach((other) => {
      const active = other === chip;
      other.classList.toggle('is-active', active);
      other.setAttribute('aria-pressed', String(active));
    });

    const category = chip.dataset.filter;
    document.querySelectorAll('.content-card').forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  });
});

document.querySelectorAll('.poster-image img').forEach((image) => {
  image.addEventListener('error', () => image.remove());
});
