document.addEventListener('DOMContentLoaded', () => {

  // ── Favorite toggle ────────────────────────
  document.querySelectorAll('.card__fav').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
    });
  });

  // ── Filter buttons ─────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const match = filter === 'all' || card.dataset.type === filter;

        if (match) {
          card.classList.remove('card--hidden');
          // Re-trigger stagger animation
          card.style.animationDelay = `${i * 0.06}s`;
          card.style.animation = 'none';
          void card.offsetHeight; // reflow
          card.style.animation = '';
        } else {
          card.classList.add('card--hidden');
        }
      });
    });
  });

  // ── Reserve button feedback ─────────────────
  document.querySelectorAll('.card__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const original = btn.textContent;
      btn.textContent = '✓ ¡Reservado!';
      btn.style.background = '#00c48c';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 2200);
    });
  });

});