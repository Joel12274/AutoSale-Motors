const navMenu = document.querySelector('.nav__menu');
const navClose = document.querySelector('.nav__close');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__item');

// Función para detectar si es un dispositivo móvil (definir un breakpoint)
const isMobile = () => window.innerWidth <= 768; // Ajusta según tu diseño

// Función para abrir el menú
navMenu.addEventListener('click', () => {
    navList.style.display = 'flex';
    setTimeout(() => {
        navList.classList.add('nav__list--show');
    }, 10);
});

// Función para cerrar el menú
const closeMenu = () => {
    if (isMobile()) { // Solo cerrar si es en móvil
        navList.classList.remove('nav__list--show');
        setTimeout(() => {
            navList.style.display = 'none';
        }, 300);
    }
};

// Cerrar con el botón de cerrar
navClose.addEventListener('click', closeMenu);

// Cerrar al hacer clic en un enlace solo en móvil
navLinks.forEach(link => link.addEventListener('click', closeMenu));



// Filtrado de vehículos por tipo y estado
document.addEventListener('DOMContentLoaded', function () {
    const typeFilterButtons = document.querySelectorAll('.filter__btn--type');
    const stateFilterButtons = document.querySelectorAll('.filter__btn--state');
    const vehicleCards = document.querySelectorAll('.catalog__card');

    let activeTypeFilter = 'todos'; // Tipo de filtro activo (por defecto, "todos")
    let activeStateFilter = 'todos'; // Estado de filtro activo (por defecto, "todos")

    // Filtro por tipo
    typeFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover la clase activa de todos los botones de tipo
            typeFilterButtons.forEach(btn => btn.classList.remove('filter__btn--active'));
            // Agregar la clase activa al botón de tipo clickeado
            button.classList.add('filter__btn--active');

            activeTypeFilter = button.getAttribute('data-filter'); // Obtener el filtro de tipo seleccionado
            filterCards(); // Aplicar el filtrado
        });
    });

    // Filtro por estado
    stateFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover la clase activa de todos los botones de estado
            stateFilterButtons.forEach(btn => btn.classList.remove('filter__btn--active'));
            // Agregar la clase activa al botón de estado clickeado
            button.classList.add('filter__btn--active');

            activeStateFilter = button.getAttribute('data-filter'); // Obtener el filtro de estado seleccionado
            filterCards(); // Aplicar el filtrado
        });
    });

    // Función para aplicar el filtrado combinado
    function filterCards() {
        vehicleCards.forEach(card => {
            const isTypeMatch = activeTypeFilter === 'todos' || card.classList.contains(activeTypeFilter);
            const isStateMatch = activeStateFilter === 'todos' || card.classList.contains(activeStateFilter);

            // Solo mostrar la tarjeta si coincide con ambos filtros
            if (isTypeMatch && isStateMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});





document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    let modalImages = []; // Almacena las imágenes para el artículo actual

    // Función para abrir el modal
    function openModal(images) {
        modalImages = images; // Almacena las imágenes para el artículo
        currentIndex = 0; // Resetea el índice a 0 (primer imagen)
        showImage(currentIndex); // Muestra la primera imagen
        createDots(); // Crea los puntos indicadores
        document.getElementById('imageModal').style.display = 'block'; // Muestra el modal
    }

    // Función para mostrar la imagen correspondiente
    function showImage(index) {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = modalImages[index]; // Cambia la imagen en el modal
        updateDots(index); // Actualiza los puntos
    }

    // Función para mover entre imágenes (previo/siguiente)
    window.moveSlide = function(step) {
        currentIndex += step;
        if (currentIndex < 0) currentIndex = modalImages.length - 1; // Si está en la primera imagen, va a la última
        if (currentIndex >= modalImages.length) currentIndex = 0; // Si está en la última imagen, va a la primera
        showImage(currentIndex); // Muestra la nueva imagen
    };

    // Crear los puntos indicadores
    function createDots() {
        const dotsContainer = document.getElementById('dots');
        if (dotsContainer) { // Aseguramos que el contenedor de los puntos existe
            dotsContainer.innerHTML = ''; // Limpiar puntos anteriores
            modalImages.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.addEventListener('click', () => showImage(index)); // Hacer clic en un punto para mostrar la imagen
                dotsContainer.appendChild(dot);
            });
            // Al crear los puntos, aseguramos que el primero se marque como activo
            updateDots(0); // Marca el primer punto como activo
        }
    }

    // Actualizar los puntos para resaltar el punto activo
    function updateDots(index) {
        const dots = document.querySelectorAll('.dots span');
        dots.forEach(dot => dot.classList.remove('active')); // Remover clase activa de todos los puntos
        if (dots[index]) { // Aseguramos que el punto existe antes de intentar modificarlo
            dots[index].classList.add('active'); // Agregar clase activa al punto correspondiente
        }
    }

    // Cerrar el modal
    function closeModal() {
        document.getElementById('imageModal').style.display = 'none'; // Ocultar modal
    }

    // Escuchar clics en los botones "Ver Detalles"
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const images = JSON.parse(e.target.getAttribute('data-images')); // Obtener las imágenes del artículo
            openModal(images); // Abrir el modal con las imágenes correspondientes
        });
    });

    // Escuchar clic en el botón de cierre (X)
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Cerrar el modal si el usuario hace clic fuera del modal
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('imageModal')) {
            closeModal();
        }
    });
});





