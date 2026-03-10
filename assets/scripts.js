// =====================================================
// CAROUSEL
// =====================================================

const carousel = {

    grid: document.getElementById('spacesGrid'),
    cards: document.querySelectorAll('.space-card'),
    dots: document.querySelectorAll('.carousel-dot'),
    prevBtn: document.querySelector('.carousel-btn.prev'),
    nextBtn: document.querySelector('.carousel-btn.next'),
    current: 0,

    isMobile() {
        return window.innerWidth < 768;
    },

    goTo(index) {
        if (!this.isMobile()) return;
        this.current = Math.max(0, Math.min(index, this.cards.length - 1));
        this.grid.scrollTo({
            left: (this.cards[0].offsetWidth + 20) * this.current,
            behavior: 'smooth'
        });
        this.updateDots();
    },

    updateDots() {
        this.dots.forEach((dot, i) =>
            dot.classList.toggle('active', i === this.current)
        );
    },

    syncOnScroll() {
        if (!this.isMobile()) return;
        const index = Math.round(
            this.grid.scrollLeft / (this.cards[0].offsetWidth + 20)
        );
        if (index !== this.current) {
            this.current = index;
            this.updateDots();
        }
    },

    init() {
        this.prevBtn.addEventListener('click', () => this.goTo(this.current - 1));
        this.nextBtn.addEventListener('click', () => this.goTo(this.current + 1));
        this.dots.forEach(dot =>
            dot.addEventListener('click', () => this.goTo(+dot.dataset.index))
        );
        this.grid.addEventListener('scroll', () => this.syncOnScroll());
    }

};

carousel.init();


// =====================================================
// COUNTERS
// =====================================================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    let target = +counter.getAttribute("data-target");
    let count = 0;
    let increment = target / 100;

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