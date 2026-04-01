// =====================================================
// CAROUSEL SIN CLONES + AUTOPLAY
// =====================================================

const carousel = {
  grid: document.getElementById("spacesGrid"),
  cards: document.querySelectorAll(".space-card"),
  prevBtn: document.querySelector(".carousel-btn.prev"),
  nextBtn: document.querySelector(".carousel-btn.next"),

  current: 0,
  autoPlayInterval: null,
  autoPlayDelay: 3000,
  userInteracted: false,

  isMobile() {
    return window.innerWidth < 768;
  },

  getGap() {
    return 20;
  },

  getCardWidth() {
    return this.cards.length ? this.cards[0].offsetWidth : 0;
  },

  getStep() {
    return this.getCardWidth() + this.getGap();
  },

  getMaxIndex() {
    return this.cards.length - 1;
  },

  goTo(index, behavior = "smooth") {
    if (!this.grid || !this.cards.length) return;

    this.current = Math.max(0, Math.min(index, this.getMaxIndex()));

    this.grid.scrollTo({
      left: this.getStep() * this.current,
      behavior,
    });
  },

  next() {
    if (!this.cards.length) return;

    if (this.current >= this.getMaxIndex()) {
      this.current = 0;
    } else {
      this.current += 1;
    }

    this.goTo(this.current);
  },

  prev() {
    if (!this.cards.length) return;

    if (this.current <= 0) {
      this.current = this.getMaxIndex();
    } else {
      this.current -= 1;
    }

    this.goTo(this.current);
  },

  syncOnScroll() {
    if (!this.grid || !this.cards.length) return;

    const index = Math.round(this.grid.scrollLeft / this.getStep());
    this.current = Math.max(0, Math.min(index, this.getMaxIndex()));
  },

  startAutoPlay() {
    this.stopAutoPlay();

    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, this.autoPlayDelay);
  },

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  },

  restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  },

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.userInteracted = true;
        this.prev();
        this.restartAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.userInteracted = true;
        this.next();
        this.restartAutoPlay();
      });
    }

    let scrollTimeout;

    this.grid.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.userInteracted = true;
        this.syncOnScroll();
      }, 100);
    });

    this.grid.addEventListener("mouseenter", () => this.stopAutoPlay());
    this.grid.addEventListener("mouseleave", () => this.startAutoPlay());

    this.grid.addEventListener("touchstart", () => this.stopAutoPlay(), {
      passive: true,
    });

    this.grid.addEventListener("touchend", () => {
      this.userInteracted = true;
      this.syncOnScroll();
      this.startAutoPlay();
    });

    window.addEventListener("resize", () => {
      this.goTo(this.current, "auto");
    });
  },

  init() {
    if (!this.grid || !this.cards.length) return;

    this.goTo(0, "auto");
    this.bindEvents();
    this.startAutoPlay();
  },
};

document.addEventListener("DOMContentLoaded", () => {
  carousel.init();
});

// =====================================================
// COUNTERS
// =====================================================

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const increment = target / 100;

  function updateCounter() {
    count += increment;

    if (count < target) {
      counter.innerText = Math.floor(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  }

  updateCounter();
});
