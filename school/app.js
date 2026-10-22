function toArabicDigits(value) {
  return String(value).replace(/[0-9]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 1584));
}

const activities = {
  math: {
    title: 'رياضيات ممتعة',
    emoji: '🍎',
    questions: () => {
      const a = 2 + Math.floor(Math.random() * 7);
      const b = 1 + Math.floor(Math.random() * 6);
      const answer = a + b;
      return { emoji: '🍎 🍐', prompt: '<bdi dir="ltr">' + toArabicDigits(a) + ' + ' + toArabicDigits(b) + ' = ؟</bdi>', answer: String(answer), choices: [String(answer), String(answer + 1), String(answer - 1)] };
    },
    success: 'أحسنت! أجبت عن مسألة الجمع بشكل صحيح.'
  },
  space: {
    title: 'رحلة إلى الفضاء',
    emoji: '🪐',
    questions: [
      { emoji: '🔴', prompt: 'أي كوكب يُسمّى الكوكب الأحمر؟', answer: 'المريخ', choices: ['المريخ', 'الأرض', 'نبتون'], fact: 'يُسمّى المريخ الكوكب الأحمر بسبب تربته الحمراء.' },
      { emoji: '🌍', prompt: 'على أي كوكب نعيش؟', answer: 'الأرض', choices: ['زحل', 'الأرض', 'المشتري'], fact: 'الأرض بيتنا؛ كوكب مليء بالماء والحياة.' },
      { emoji: '💍', prompt: 'أي كوكب له حلقات كبيرة وجميلة؟', answer: 'زحل', choices: ['عطارد', 'زحل', 'المريخ'], fact: 'تتكوّن حلقات زحل من قطع الجليد والصخور.' }
    ],
    success: 'أحسنت يا مستكشف صغير!'
  },
  float: {
    title: 'يطفو أم يغرق؟',
    emoji: '🧪',
    questions: [
      { emoji: '🪵', prompt: 'ماذا يحدث إذا وضعنا قطعة خشب في الماء؟', answer: 'يطفو على الماء', choices: ['يطفو على الماء', 'يغرق إلى القاع'], fact: 'الخشب عادة أخفّ من الماء الذي يزيحه، لذلك يطفو.' },
      { emoji: '🪨', prompt: 'ماذا يحدث لحجر صغير في الماء؟', answer: 'يغرق إلى القاع', choices: ['يطفو على الماء', 'يغرق إلى القاع'], fact: 'الحجر أثقل من الماء الذي يزيحه، لذلك يغرق.' },
      { emoji: '🧽', prompt: 'ماذا يحدث لإسفنجة جافة على الماء؟', answer: 'يطفو على الماء', choices: ['يطفو على الماء', 'يغرق إلى القاع'], fact: 'الإسفنجة الجافة مليئة بالهواء، لذلك تطفو في البداية.' }
    ],
    success: 'أحسنت أيها العالِم!'
  },
  words: {
    title: 'الحرف المفقود',
    emoji: '📖',
    questions: [
      { emoji: '📚', prompt: 'أكمل الحرف الناقص: ك_تاب', answer: 'ت', choices: ['ت', 'م', 'ر'], fact: 'بإضافة ت تصبح الكلمة: كتاب.' },
      { emoji: '🏫', prompt: 'أكمل الحرف الناقص: م_رسة', answer: 'د', choices: ['م', 'د', 'ك'], fact: 'بإضافة د تصبح الكلمة: مدرسة.' },
      { emoji: '🌙', prompt: 'أكمل الحرف الناقص: ق_ر', answer: 'م', choices: ['م', 'س', 'ب'], fact: 'بإضافة م تصبح الكلمة: قمر.' }
    ],
    success: 'أحسنت! أنت تعرف الكلمات جيدًا.'
  },
  english: {
    title: 'كلمات جديدة',
    emoji: '🐾',
    questions: [
      { emoji: '🐱', prompt: 'ما معنى كلمة Cat؟', answer: 'قطة', choices: ['قطة', 'سمكة', 'طائر'], fact: 'Cat تعني قطة. هل تعرف صوتها؟' },
      { emoji: '☀️', prompt: 'ما معنى كلمة Sun؟', answer: 'الشمس', choices: ['القمر', 'الشمس', 'سحابة'], fact: 'Sun تعني الشمس؛ نجمنا المضيء في النهار.' },
      { emoji: '🐶', prompt: 'ما معنى كلمة Dog؟', answer: 'كلب', choices: ['أرنب', 'كلب', 'حصان'], fact: 'Dog تعني كلبًا؛ صديقًا وفيًا.' }
    ],
    success: 'رائع! تعلّمت كلمة جديدة.'
  },
  pattern: {
    title: 'النمط الغامض',
    emoji: '🧩',
    questions: [
      { emoji: '🔴 🔵 🔴 🔵 ❔', prompt: 'ما الشكل التالي؟', answer: '🔴', choices: ['🔴', '🔵', '🟡'], fact: 'الألوان تتناوب في هذا النمط.' },
      { emoji: '⭐ 🌙 ⭐ 🌙 ❔', prompt: 'أي شكل يأتي بعد القمر؟', answer: '⭐', choices: ['☁️', '⭐', '🌙'], fact: 'يتناوب النجم والقمر في هذا النمط.' },
      { emoji: '🟩 🟩 🟨 🟩 🟩 ❔', prompt: 'أي لون يُكمل النمط؟', answer: '🟨', choices: ['🟩', '🟨', '🟥'], fact: 'بعد مربعين أخضرين يأتي مربع أصفر.' }
    ],
    success: 'لم تعد الأنماط سرًا!'
  },
  world: {
    title: 'موطن الحيوانات',
    emoji: '🌍',
    questions: [
      { emoji: '🐪', prompt: 'أين يعيش الجمل غالبًا؟', answer: 'الصحراء', choices: ['الصحراء', 'القطب الشمالي', 'المحيط'], fact: 'الجمل متأقلم للعيش في الأماكن الحارة والجافة.' },
      { emoji: '🐻‍❄️', prompt: 'أين يعيش الدب القطبي؟', answer: 'مكان بارد وجليدي', choices: ['غابة دافئة', 'مكان بارد وجليدي', 'الصحراء'], fact: 'يعيش الدب القطبي في المناطق الباردة قرب القطب الشمالي.' },
      { emoji: '🐠', prompt: 'أين تعيش السمكة؟', answer: 'الماء', choices: ['الشجرة', 'الماء', 'كهف جاف'], fact: 'تتنفّس السمكة بالخياشيم في الماء.' }
    ],
    success: 'أنت دليل بارع للطبيعة!'
  }
};

const grid = document.querySelector('#activityGrid');
const viewer = document.querySelector('#gameViewer');
const title = document.querySelector('#gameTitle');
const progress = document.querySelector('#gameProgress');
const content = document.querySelector('#gameContent');
const closeButton = document.querySelector('#closeGame');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let activeKey = null;
let questionIndex = 0;
let score = 0;
let answered = false;
let lastCard = null;
let quizQuestions = [];

function playMotion(element, frames, options = {}) {
  if (!reduceMotion && typeof element?.animate === 'function') {
    element.animate(frames, { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)', ...options });
  }
}

function floatIn(element, delay = 0) {
  playMotion(element, [
    { opacity: 0, transform: 'translateY(9px) scale(.98)' },
    { opacity: 1, transform: 'translateY(0) scale(1)' }
  ], { duration: 380, delay });
}

function addCardTilt(card) {
  if (reduceMotion || card.dataset.tiltReady || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  card.dataset.tiltReady = 'true';
  card.addEventListener('pointermove', (event) => {
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty('--tilt-x', `${x * 4}deg`);
    card.style.setProperty('--tilt-y', `${y * -4}deg`);
    card.classList.add('is-tilting');
  });
  card.addEventListener('pointerleave', () => {
    card.classList.remove('is-tilting');
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  });
}

function animateCards(cards) {
  [...cards].forEach((card, index) => {
    addCardTilt(card);
    floatIn(card, Math.min(index * 55, 330));
  });
}

function celebrate(card) {
  if (reduceMotion || !card) return;
  const burst = document.createElement('span');
  burst.className = 'confetti-burst';
  burst.setAttribute('aria-hidden', 'true');
  const colors = ['#f2879b', '#ffd166', '#76c9a6', '#8c7ade', '#72c6e8'];
  for (let index = 0; index < 14; index += 1) {
    const piece = document.createElement('i');
    const angle = (Math.PI * 2 * index) / 14;
    const distance = 56 + (index % 4) * 17;
    piece.className = 'confetti-piece';
    piece.style.setProperty('--burst-x', `${Math.cos(angle) * distance}px`);
    piece.style.setProperty('--burst-y', `${Math.sin(angle) * distance}px`);
    piece.style.setProperty('--burst-turn', `${index % 2 ? 230 : -230}deg`);
    piece.style.setProperty('--burst-color', colors[index % colors.length]);
    piece.style.setProperty('--burst-delay', `${(index % 4) * 18}ms`);
    burst.append(piece);
  }
  card.append(burst);
  requestAnimationFrame(() => burst.classList.add('is-running'));
  window.setTimeout(() => burst.remove(), 900);
}

animateCards(grid.querySelectorAll('.activity-card'));

function questionsFor(key) {
  const source = activities[key].questions;
  if (typeof source === 'function') return [source(), source(), source()];
  return source;
}

function openActivity(key, card) {
  if (!activities[key]) return;
  activeKey = key;
  questionIndex = 0;
  score = 0;
  answered = false;
  quizQuestions = questionsFor(key);
  lastCard = card;
  title.textContent = activities[key].title;
  viewer.hidden = false;
  document.body.classList.add('game-open');
  playMotion(viewer, [
    { opacity: 0.5 },
    { opacity: 1 }
  ], { duration: 240 });
  renderQuestion();
  closeButton.focus({ preventScroll: true });
}

function renderQuestion() {
  const quiz = activities[activeKey];
  const question = quizQuestions[questionIndex];
  progress.textContent = 'السؤال ' + toArabicDigits(questionIndex + 1) + ' من ' + toArabicDigits(quizQuestions.length);
  content.innerHTML =
    '<div class="quiz-card">' +
      '<div class="quiz-emoji" aria-hidden="true">' + question.emoji + '</div>' +
      '<p class="quiz-prompt">' + question.prompt + '</p>' +
      '<div class="answers" role="group" aria-label="الإجابات">' +
        question.choices.map((choice) => {
          const label = activeKey === 'math' ? toArabicDigits(choice) : choice;
          return '<button class="answer" type="button" data-answer="' + choice + '">' + label + '</button>';
        }).join('') +
      '</div>' +
      '<p class="feedback" id="feedback" aria-live="polite"></p>' +
      '<button class="next-button" id="nextQuestion" type="button" hidden>السؤال التالي ←</button>' +
    '</div>';
  floatIn(content.querySelector('.quiz-card'));
  content.querySelectorAll('.answer').forEach((button, index) => {
    playMotion(button, [
      { opacity: 0, transform: 'translateY(7px) scale(.97)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], { duration: 280, delay: index * 65 });
  });
  answered = false;
}

function showFinish() {
  progress.textContent = 'نهاية اللعبة';
  const total = 3;
  const stars = score === total ? '⭐⭐⭐' : score > 0 ? '⭐⭐' : '🌟';
  content.innerHTML =
    '<div class="quiz-card finish-card">' +
      '<div class="quiz-emoji" aria-hidden="true">' + (score === total ? '🏆' : '🎉') + '</div>' +
      '<div class="quiz-prompt">أحسنت! لقد أنهيت اللعبة.</div>' +
      '<div class="finish-note">' + stars + '<br>من ٣ أسئلة، ' + toArabicDigits(score) + ' إجابات صحيحة.<br>ستتعلّم شيئًا جديدًا في كل مرة تلعب فيها.</div>' +
      '<button class="next-button" id="replayGame" type="button">هل نلعب مرة أخرى؟</button>' +
    '</div>';
  const finishCard = content.querySelector('.finish-card');
  floatIn(finishCard);
  playMotion(finishCard.querySelector('.quiz-emoji'), [
    { transform: 'rotate(-12deg) scale(.7)' },
    { transform: 'rotate(10deg) scale(1.12)' },
    { transform: 'rotate(0) scale(1)' }
  ], { duration: 520 });
  if (score === total) celebrate(finishCard);
}

function closeActivity() {
  if (viewer.hidden) return;
  viewer.hidden = true;
  document.body.classList.remove('game-open');
  content.replaceChildren();
  activeKey = null;
  if (lastCard && lastCard.isConnected) lastCard.focus({ preventScroll: true });
  lastCard = null;
}

grid.addEventListener('click', (event) => {
  const card = event.target.closest('[data-activity]');
  if (card) openActivity(card.dataset.activity, card);
});

content.addEventListener('click', (event) => {
  const answerButton = event.target.closest('[data-answer]');
  if (answerButton && !answered) {
    const question = quizQuestions[questionIndex];
    const buttons = content.querySelectorAll('.answer');
    buttons.forEach((button) => {
      button.disabled = true;
      if (button.dataset.answer === question.answer) button.classList.add('correct');
    });
    const isCorrect = answerButton.dataset.answer === question.answer;
    const feedback = document.querySelector('#feedback');
    if (isCorrect) {
      score += 1;
      feedback.textContent = question.fact ? 'أحسنت! ' + question.fact : activities[activeKey].success;
      playMotion(answerButton, [
        { transform: 'scale(1)' },
        { transform: 'scale(1.1) rotate(-2deg)' },
        { transform: 'scale(1) rotate(0)' }
      ], { duration: 380 });
      celebrate(content.querySelector('.quiz-card'));
    } else {
      answerButton.classList.add('wrong');
      feedback.textContent = 'لا بأس! ' + (question.fact || ('الإجابة الصحيحة «' + question.answer + '» هي.'));
      playMotion(answerButton, [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-7px)' },
        { transform: 'translateX(7px)' },
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(0)' }
      ], { duration: 300 });
    }
    floatIn(feedback);
    answered = true;
    const next = document.querySelector('#nextQuestion');
    next.hidden = false;
    next.textContent = questionIndex === quizQuestions.length - 1 ? 'عرض النتيجة' : 'السؤال التالي ←';
  }

  if (event.target.closest('#nextQuestion') && answered) {
    if (questionIndex < quizQuestions.length - 1) {
      questionIndex += 1;
      renderQuestion();
    } else {
      showFinish();
    }
  }

  if (event.target.closest('#replayGame')) {
    questionIndex = 0;
    score = 0;
    renderQuestion();
  }
});

closeButton.addEventListener('click', closeActivity);
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) closeActivity();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !viewer.hidden) closeActivity();
});

document.querySelectorAll('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach((other) => {
      const selected = other === chip;
      other.classList.toggle('is-active', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    const filter = chip.dataset.filter;
    const visibleCards = [];
    document.querySelectorAll('.activity-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
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

