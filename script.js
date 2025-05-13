document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('.title');
    const header = document.querySelector('.parallax-header');
    const navItems = document.querySelectorAll('.nav-item');

    // Configurar data-text para efecto chroma
    if (title) {
        title.setAttribute('data-text', title.textContent);
        // Iniciar con animación automática
        title.classList.add('chroma-animate');
    }

    // Parallax con capas RGB desplazadas
    if (header) {
        header.addEventListener('mouseenter', () => {
            if (title) {
                title.classList.remove('chroma-animate');
            }
        });

        header.addEventListener('mouseleave', () => {
            if (title) {
                title.style.transform = 'translate(0, 0)';
                // Resetear propiedades y reactivar animación
                title.style.setProperty('--chroma-rx', '0px');
                title.style.setProperty('--chroma-ry', '0px');
                title.style.setProperty('--chroma-bx', '0px');
                title.style.setProperty('--chroma-by', '0px');
                // Pequeño delay para que se resetee antes de animar
                setTimeout(() => {
                    title.classList.add('chroma-animate');
                }, 50);
            }
        });

        header.addEventListener('mousemove', (e) => {
            if (!title) return;
            
            const x = (window.innerWidth / 2 - e.pageX);
            const y = (window.innerHeight / 2 - e.pageY);

            title.style.transform = `translate(${x / 50}px, ${y / 50}px)`;
            title.style.setProperty('--chroma-rx', `${x / 30}px`);
            title.style.setProperty('--chroma-ry', `${y / 30}px`);
            title.style.setProperty('--chroma-bx', `${-x / 30}px`);
            title.style.setProperty('--chroma-by', `${-y / 30}px`);
        });
    }

    // Resto del código (navegación) permanece igual...
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');

            document.querySelectorAll('.content-section').forEach(section =>
                section.classList.remove('active')
            );

            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');

            if (header) {
                header.style.display = (sectionId === 'inicio') ? 'flex' : 'none';
            }

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    if (navItems.length > 0) {
        const firstSectionId = navItems[0].getAttribute('data-section');
        document.getElementById(firstSectionId).classList.add('active');
    }
});