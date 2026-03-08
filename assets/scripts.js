// =====================================================
// CAROUSEL
// Maneja la navegación del carrusel en versión móvil
// =====================================================

// Creamos un objeto llamado "carousel"
// Este objeto agrupa todas las variables y funciones
// relacionadas con el carrusel
const carousel = {

    // =====================================================
    // ELEMENTOS DEL DOM
    // =====================================================

    // Selecciona el contenedor que tiene todas las tarjetas
    grid: document.getElementById('spacesGrid'),

    // Selecciona todas las tarjetas del carrusel
    // querySelectorAll devuelve una lista (NodeList)
    cards: document.querySelectorAll('.space-card'),

    // Selecciona los dots (indicadores inferiores del carrusel)
    dots: document.querySelectorAll('.carousel-dot'),

    // Botón para ir a la tarjeta anterior
    prevBtn: document.querySelector('.carousel-btn.prev'),

    // Botón para ir a la siguiente tarjeta
    nextBtn: document.querySelector('.carousel-btn.next'),

    // Índice de la tarjeta actual
    // empieza en 0 porque el carrusel inicia en la primera tarjeta
    current: 0,


    // =====================================================
    // FUNCIÓN PARA SABER SI ES MÓVIL
    // =====================================================

    isMobile() {

        // window.innerWidth devuelve el ancho de la pantalla
        // si es menor a 768px consideramos que es móvil
        return window.innerWidth < 768;

    },


    // =====================================================
    // FUNCIÓN PARA IR A UNA TARJETA ESPECÍFICA
    // =====================================================

    goTo(index) {

        // Si no estamos en móvil no hace nada
        if (!this.isMobile()) return;

        // Limita el índice entre 0 y el número máximo de tarjetas
        // Math.max evita valores menores a 0
        // Math.min evita valores mayores al último índice
        this.current = Math.max(0, Math.min(index, this.cards.length - 1));

        // Hace scroll horizontal del contenedor
        this.grid.scrollTo({

            // Calcula cuánto desplazarse
            // ancho de tarjeta + 20px de gap entre tarjetas
            left: (this.cards[0].offsetWidth + 20) * this.current,

            // comportamiento de desplazamiento suave
            behavior: 'smooth'

        });

        // Actualiza los dots activos
        this.updateDots();

    },


    // =====================================================
    // ACTUALIZA LOS INDICADORES (DOTS)
    // =====================================================

    updateDots() {

        // Recorre todos los dots
        this.dots.forEach((dot, i) =>

            // toggle activa o desactiva la clase "active"
            // se activa solo si el índice coincide con la card actual
            dot.classList.toggle('active', i === this.current)

        );

    },


    // =====================================================
    // SINCRONIZA DOTS CUANDO EL USUARIO DESLIZA
    // =====================================================

    syncOnScroll() {

        // Solo funciona en móvil
        if (!this.isMobile()) return;

        // Calcula qué tarjeta está visible
        const index = Math.round(

            // scrollLeft indica cuánto se desplazó horizontalmente
            this.grid.scrollLeft /

            // ancho de tarjeta + espacio
            (this.cards[0].offsetWidth + 20)

        );

        // Si el índice cambió
        if (index !== this.current) {

            // actualiza la tarjeta actual
            this.current = index;

            // actualiza los dots
            this.updateDots();

        }

    },


    // =====================================================
    // INICIALIZA EL CARRUSEL
    // =====================================================

    init() {

        // Evento click del botón anterior
        this.prevBtn.addEventListener('click', () =>

            // mueve una tarjeta hacia atrás
            this.goTo(this.current - 1)

        );


        // Evento click del botón siguiente
        this.nextBtn.addEventListener('click', () =>

            // mueve una tarjeta hacia adelante
            this.goTo(this.current + 1)

        );


        // Evento click en cada dot
        this.dots.forEach(dot =>

            dot.addEventListener('click', () =>

                // dataset.index obtiene el atributo data-index del HTML
                // el "+" convierte el texto a número
                this.goTo(+dot.dataset.index)

            )

        );


        // Detecta cuando el usuario desliza el carrusel
        this.grid.addEventListener('scroll', () =>

            this.syncOnScroll()

        );

    }

};


// =====================================================
// INICIA EL CARRUSEL
// =====================================================

// Ejecuta la función init cuando se carga el script
carousel.init();