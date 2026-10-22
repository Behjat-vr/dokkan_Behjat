const activities = {
  math: {
    title: 'ریاضیِ شیرین',
    emoji: '🍎',
    questions: () => {
      const a = 2 + Math.floor(Math.random() * 7);
      const b = 1 + Math.floor(Math.random() * 6);
      const answer = a + b;
      return { emoji: '🍎 🍐', prompt: a + ' + ' + b + ' چند می‌شود؟', answer: String(answer), choices: [String(answer), String(answer + 1), String(answer - 1)] };
    },
    success: 'آفرین! جمع را درست پیدا کردی.'
  },
  space: {
    title: 'سفر به فضا',
    emoji: '🪐',
    questions: [
      { emoji: '🔴', prompt: 'کدام سیاره را سیارهٔ سرخ می‌نامند؟', answer: 'مریخ', choices: ['مریخ', 'زمین', 'نپتون'], fact: 'به‌خاطر خاک سرخ‌رنگش، به مریخ سیارهٔ سرخ می‌گویند.' },
      { emoji: '🌍', prompt: 'ما روی کدام سیاره زندگی می‌کنیم؟', answer: 'زمین', choices: ['زحل', 'زمین', 'مشتری'], fact: 'خانهٔ ما زمین است؛ سیاره‌ای پر از آب و زندگی.' },
      { emoji: '💍', prompt: 'کدام سیاره حلقه‌های بزرگ و دیدنی دارد؟', answer: 'زحل', choices: ['عطارد', 'زحل', 'مریخ'], fact: 'حلقه‌های زحل از تکه‌های یخ و سنگ ساخته شده‌اند.' }
    ],
    success: 'درست گفتی، کاوشگر کوچولو!'
  },
  float: {
    title: 'شناور یا غرق؟',
    emoji: '🧪',
    questions: [
      { emoji: '🪵', prompt: 'یک تکه چوب را در آب بیندازیم؛ چه می‌شود؟', answer: 'روی آب می‌ماند', choices: ['روی آب می‌ماند', 'ته آب می‌رود'], fact: 'چوب معمولاً سبک‌تر از آبی است که جابه‌جا می‌کند، پس روی آب می‌ماند.' },
      { emoji: '🪨', prompt: 'یک سنگ کوچک در آب چه می‌کند؟', answer: 'ته آب می‌رود', choices: ['روی آب می‌ماند', 'ته آب می‌رود'], fact: 'سنگ از مقدار آبی که جابه‌جا می‌کند سنگین‌تر است، پس پایین می‌رود.' },
      { emoji: '🧽', prompt: 'یک اسفنج خشک روی آب چه می‌کند؟', answer: 'روی آب می‌ماند', choices: ['روی آب می‌ماند', 'ته آب می‌رود'], fact: 'اسفنج خشک پر از هواست و اول روی آب شناور می‌ماند.' }
    ],
    success: 'آزمایشگر باهوش!'
  },
  words: {
    title: 'حرف گمشده',
    emoji: '📖',
    questions: [
      { emoji: '📚', prompt: 'جای خالی را پر کن: ک_تاب', answer: 'ت', choices: ['ت', 'م', 'ر'], fact: 'ک + ت + ا + ب می‌شود کتاب.' },
      { emoji: '🏫', prompt: 'جای خالی را پر کن: مد_سه', answer: 'ر', choices: ['ن', 'ر', 'ب'], fact: 'مد + ر + سه می‌شود مدرسه.' },
      { emoji: '🌧️', prompt: 'جای خالی را پر کن: بارا_', answer: 'ن', choices: ['د', 'ن', 'م'], fact: 'بارا + ن می‌شود باران.' }
    ],
    success: 'چه خوب کلمه‌ها را می‌شناسی!'
  },
  english: {
    title: 'کلمه‌های رنگی',
    emoji: '🐾',
    questions: [
      { emoji: '🐱', prompt: 'Cat یعنی چه؟', answer: 'گربه', choices: ['گربه', 'ماهی', 'پرنده'], fact: 'Cat یعنی گربه. صدای گربه را هم می‌شناسی؟' },
      { emoji: '☀️', prompt: 'Sun یعنی چه؟', answer: 'خورشید', choices: ['ماه', 'خورشید', 'ابر'], fact: 'Sun یعنی خورشید؛ ستارهٔ روشن روز ما.' },
      { emoji: '🐶', prompt: 'Dog یعنی چه؟', answer: 'سگ', choices: ['خرگوش', 'سگ', 'اسب'], fact: 'Dog یعنی سگ؛ یک دوست وفادار.' }
    ],
    success: 'عالی بود! یک واژهٔ تازه یاد گرفتی.'
  },
  pattern: {
    title: 'الگوی عجیب',
    emoji: '🧩',
    questions: [
      { emoji: '🔴 🔵 🔴 🔵 ❔', prompt: 'شکل بعدی کدام است؟', answer: '🔴', choices: ['🔴', '🔵', '🟡'], fact: 'رنگ‌ها یکی‌درمیان تکرار می‌شوند.' },
      { emoji: '⭐ 🌙 ⭐ 🌙 ❔', prompt: 'بعد از ماه چه شکلی می‌آید؟', answer: '⭐', choices: ['☁️', '⭐', '🌙'], fact: 'ستاره و ماه یکی‌درمیان آمده‌اند.' },
      { emoji: '🟩 🟩 🟨 🟩 🟩 ❔', prompt: 'کدام رنگ جای خالی را پر می‌کند؟', answer: '🟨', choices: ['🟩', '🟨', '🟥'], fact: 'بعد از دو مربع سبز، یک مربع زرد می‌آید.' }
    ],
    success: 'الگوها دیگر راز نیستند!'
  },
  world: {
    title: 'خانهٔ حیوان‌ها',
    emoji: '🌍',
    questions: [
      { emoji: '🐪', prompt: 'شتر بیشتر در کجا زندگی می‌کند؟', answer: 'بیابان', choices: ['بیابان', 'قطب شمال', 'اقیانوس'], fact: 'شتر برای زندگی در جاهای گرم و خشک سازگار شده است.' },
      { emoji: '🐻‍❄️', prompt: 'خرس قطبی کجا زندگی می‌کند؟', answer: 'جای سرد و یخی', choices: ['جنگل گرم', 'جای سرد و یخی', 'بیابان'], fact: 'خرس قطبی در نواحی سرد نزدیک قطب شمال زندگی می‌کند.' },
      { emoji: '🐠', prompt: 'ماهی کجا خانه دارد؟', answer: 'آب', choices: ['درخت', 'آب', 'غار خشک'], fact: 'ماهی با آبشش در آب نفس می‌کشد.' }
    ],
    success: 'تو یک راهنمای طبیعتی!'
  }
};

const grid = document.querySelector('#activityGrid');
const viewer = document.querySelector('#gameViewer');
const title = document.querySelector('#gameTitle');
const progress = document.querySelector('#gameProgress');
const content = document.querySelector('#gameContent');
const closeButton = document.querySelector('#closeGame');
let activeKey = null;
let questionIndex = 0;
let score = 0;
let answered = false;
let lastCard = null;
let quizQuestions = [];

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
  renderQuestion();
  closeButton.focus({ preventScroll: true });
}

function renderQuestion() {
  const quiz = activities[activeKey];
  const question = quizQuestions[questionIndex];
  progress.textContent = 'پرسش ' + (questionIndex + 1) + ' از ' + quizQuestions.length;
  content.innerHTML =
    '<div class="quiz-card">' +
      '<div class="quiz-emoji" aria-hidden="true">' + question.emoji + '</div>' +
      '<p class="quiz-prompt">' + question.prompt + '</p>' +
      '<div class="answers" role="group" aria-label="پاسخ‌ها">' +
        question.choices.map((choice) => '<button class="answer" type="button" data-answer="' + choice + '">' + choice + '</button>').join('') +
      '</div>' +
      '<p class="feedback" id="feedback" aria-live="polite"></p>' +
      '<button class="next-button" id="nextQuestion" type="button" hidden>پرسش بعدی ←</button>' +
    '</div>';
  answered = false;
}

function showFinish() {
  progress.textContent = 'پایان بازی';
  const total = 3;
  const stars = score === total ? '⭐⭐⭐' : score > 0 ? '⭐⭐' : '🌟';
  content.innerHTML =
    '<div class="quiz-card finish-card">' +
      '<div class="quiz-emoji" aria-hidden="true">' + (score === total ? '🏆' : '🎉') + '</div>' +
      '<div class="quiz-prompt">آفرین! بازی را تمام کردی.</div>' +
      '<div class="finish-note">' + stars + '<br>از ۳ پرسش، ' + score + ' پاسخ درست داشتی.<br>هر بار که بازی کنی، چیز تازه‌ای یاد می‌گیری.</div>' +
      '<button class="next-button" id="replayGame" type="button">یک بار دیگر بازی کنیم؟</button>' +
    '</div>';
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
    if (isCorrect) {
      score += 1;
      document.querySelector('#feedback').textContent = 'آفرین! ' + (question.fact || activities[activeKey].success);
    } else {
      answerButton.classList.add('wrong');
      document.querySelector('#feedback').textContent = 'اشکالی ندارد! ' + (question.fact || ('پاسخ درست «' + question.answer + '» بود.'));
    }
    answered = true;
    const next = document.querySelector('#nextQuestion');
    next.hidden = false;
    next.textContent = questionIndex === quizQuestions.length - 1 ? 'دیدن نتیجه' : 'پرسش بعدی ←';
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
    document.querySelectorAll('.activity-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

