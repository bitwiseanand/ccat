document.addEventListener('DOMContentLoaded', () => {
  const deck = document.querySelector('.flashcard-deck');
  if (!deck) return;

  const cards = deck.querySelectorAll('.flashcard');
  let current = 0;

  const currentEl = document.getElementById('current-card');
  const fillEl = document.getElementById('card-progress-fill');
  const prevBtn = document.getElementById('prev-card');
  const nextBtn = document.getElementById('next-card');
  const summary = document.getElementById('flashcard-summary');
  const container = document.getElementById('flashcard-container');
  const nav = document.querySelector('.flashcard-nav');
  const progress = document.querySelector('.flashcard-progress');

  function updateProgress() {
    if (currentEl) currentEl.textContent = current + 1;
    if (fillEl) fillEl.style.width = `${((current + 1) / cards.length) * 100}%`;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.textContent = current === cards.length - 1 ? 'Finish' : 'Next →';
  }

  function showCard(index) {
    cards.forEach((card, i) => {
      card.style.display = i === index ? 'block' : 'none';
      card.classList.remove('flipped');
    });
    current = index;
    updateProgress();
  }

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.action-btn')) return;
      card.classList.toggle('flipped');
    });

    card.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (current < cards.length - 1) {
          showCard(current + 1);
        } else {
          finishDeck();
        }
      });
    });
  });

  function finishDeck() {
    if (container) container.style.display = 'none';
    if (nav) nav.style.display = 'none';
    if (progress) progress.style.display = 'none';
    if (summary) summary.style.display = 'block';
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => showCard(current - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (current === cards.length - 1) {
        finishDeck();
      } else {
        showCard(current + 1);
      }
    });
  }

  updateProgress();
});
