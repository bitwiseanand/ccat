document.addEventListener('DOMContentLoaded', () => {
  const deck = document.querySelector('.mcq-deck');
  if (!deck) return;

  const questions = JSON.parse(deck.dataset.mcqData);
  let current = 0;
  let score = 0;
  const answered = new Set();

  const currentEl = document.getElementById('current-q');
  const fillEl = document.getElementById('progress-fill');
  const summary = document.getElementById('mcq-summary');
  const scoreNum = document.getElementById('score-number');
  const scoreMsg = document.getElementById('score-message');
  const container = document.getElementById('questions-container');

  function updateProgress() {
    if (currentEl) currentEl.textContent = current + 1;
    if (fillEl) fillEl.style.width = `${((current + 1) / questions.length) * 100}%`;
  }

  function showCard(index) {
    container.querySelectorAll('.question-card').forEach((card, i) => {
      card.style.display = i === index ? 'block' : 'none';
    });
    current = index;
    updateProgress();
  }

  // Handle option clicks
  deck.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.question-card');
      const qIndex = parseInt(card.dataset.index);
      if (answered.has(qIndex)) return;

      answered.add(qIndex);
      const isCorrect = btn.dataset.correct === 'true';
      const explanation = card.querySelector('.explanation');

      if (isCorrect) score++;

      btn.classList.add(isCorrect ? 'correct' : 'wrong');
      if (!isCorrect) {
        const correctBtn = card.querySelector('.option-btn[data-correct="true"]');
        if (correctBtn) correctBtn.classList.add('correct');
      }

      card.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

      if (explanation) {
        const resultIcon = explanation.querySelector('.result-icon');
        const resultText = explanation.querySelector('.result-text');
        if (resultIcon) resultIcon.textContent = isCorrect ? '✅' : '❌';
        if (resultText) resultText.textContent = isCorrect ? 'Correct!' : 'Incorrect';
        explanation.style.display = 'block';
      }

      if (qIndex === questions.length - 1) {
        const finishBtn = card.querySelector('.finish-btn');
        if (finishBtn) finishBtn.style.display = 'inline-block';
      }
    });
  });

  // Handle nav buttons
  deck.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('finish-btn')) {
        container.style.display = 'none';
        if (summary) {
          summary.style.display = 'block';
          if (scoreNum) scoreNum.textContent = score;
          const pct = (score / questions.length) * 100;
          if (scoreMsg) {
            scoreMsg.textContent = pct >= 80 
              ? 'Excellent work! 🎉' 
              : pct >= 50 
                ? 'Good effort! Keep practicing.' 
                : 'Keep studying! Review the cheat sheet and try again.';
          }
        }
      } else {
        showCard(parseInt(btn.dataset.target));
      }
    });
  });

  updateProgress();
});
