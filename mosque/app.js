const items = {
  'mosque-adab': {
    title: 'آداب المسجد',
    type: 'lesson'
  },
  salah: {
    title: 'الصلاة في المسجد',
    type: 'aparat',
    id: 'NXiEn'
  },
  amanat: {
    title: 'الأمانة: قصة عن الإمام علي (ع)',
    type: 'aparat',
    id: 'dYrom'
  },
  'good-morals': {
    title: 'قصة عن الإحسان',
    type: 'shiatv',
    id: '61cebf9f3218be972e46'
  },
  respect: {
    title: 'احترام الكبار',
    type: 'shiatv',
    id: '31dade3e8ef4916a3e82'
  },
  'prophet-advice': {
    title: 'كلمات من النبي (ص)',
    type: 'shiatv',
    id: 'f75f539a2d44326694b5'
  },
  noha: {
    title: 'نشيد حسيني للأطفال',
    type: 'shiatv',
    id: 'f7736089c757404650e4'
  }
};

const library = document.querySelector('#library');
const viewer = document.querySelector('#viewer');
const viewerTitle = document.querySelector('#viewerTitle');
const viewerContent = document.querySelector('#viewerContent');
const closeViewerButton = document.querySelector('#closeViewer');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lastFocusedCard = null;

function playMotion(element, frames, options = {}) {
  if (!reduceMotion && typeof element?.animate === 'function') {
    element.animate(frames, { duration: 380, easing: 'cubic-bezier(.2,.8,.2,1)', ...options });
  }
}

function floatIn(element, delay = 0) {
  playMotion(element, [
    { opacity: 0, transform: 'translateY(10px) scale(.98)' },
    { opacity: 1, transform: 'translateY(0) scale(1)' }
  ], { duration: 420, delay });
}

function animateCards(cards) {
  [...cards].forEach((card, index) => floatIn(card, Math.min(index * 55, 330)));
}

animateCards(document.querySelectorAll('.content-card'));

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
    <h3>ماذا نفعل في المسجد؟</h3>
    <ol class="lesson-steps">
      <li><span class="step-number">١</span><span>ندخل بهدوء ونلقي السلام.</span></li>
      <li><span class="step-number">٢</span><span>نخفض أصواتنا حتى يشعر الجميع بالراحة.</span></li>
      <li><span class="step-number">٣</span><span>نحافظ على نظافة المسجد ونتعامل بلطف مع الجميع.</span></li>
    </ol>`;
  viewerContent.append(panel);
  floatIn(panel);
  panel.querySelectorAll('.lesson-icon, h3, .lesson-steps li').forEach((part, index) => {
    playMotion(part, [
      { opacity: 0, transform: 'translateY(8px) scale(.96)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], { duration: 360, delay: 60 + index * 65, easing: 'cubic-bezier(.2,.8,.2,1)' });
  });
}

function openViewer(itemKey, card) {
  const item = items[itemKey];
  if (!item) return;

  lastFocusedCard = card;
  viewerTitle.textContent = item.title;
  viewerContent.replaceChildren();
  viewer.hidden = false;
  document.body.classList.add('viewer-open');
  playMotion(viewer.querySelector('.viewer-bar'), [
    { opacity: 0, transform: 'translateY(-8px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 280 });

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
  if (lastFocusedCard?.isConnected) {
    lastFocusedCard.focus({ preventScroll: true });
    playMotion(lastFocusedCard, [
      { transform: 'scale(1)' },
      { transform: 'scale(1.035)' },
      { transform: 'scale(1)' }
    ], { duration: 320 });
  }
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
    const visibleCards = [];
    document.querySelectorAll('.content-card').forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) visibleCards.push(card);
    });
    animateCards(visibleCards);
    playMotion(chip, [
      { transform: 'scale(1)' },
      { transform: 'scale(1.08)' },
      { transform: 'scale(1)' }
    ], { duration: 280 });
  });
});

document.querySelectorAll('.poster-image img').forEach((image) => {
  image.addEventListener('error', () => image.remove());
});
