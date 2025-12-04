// --- 1. DATOS ---

// Mapeo de áreas para filtros
const FILTER_MAP = {
    'Industrial': 'Industrial',
    'Branding': 'Branding',
    'Producto': 'Producto',
    'Gráfico': 'Gráfico' 
};

// Datos de trabajos (ACTUALIZADO con campos GALERIA y descripcion_larga para el CASO DE ESTUDIO)
const trabajos = [
    {
        id: 1,
        nombre: "Intervención Textil",
        areas: ["Industrial", "Producto"],
        rol: "Diseño textil + dirección de arte + producción fotográfica",
        thumb: "img/Proyectos destacados-01.png",// <--- IMAGEN PRINCIPAL (TIRA ANCHA)
        detalle_thumb: "img/img7.jpg", // <--- ¡NUEVA IMAGEN PARA EL DESPLIEGUE!
        descripcion_larga: "Este proyecto se centró en la exploración de nuevas materialidades textiles y en la dirección de arte para la campaña fotográfica, buscando un estilo orgánico y natural.",
        galeria: [
            "img/intervencion_detail_1.jpg", // <--- RUTA DE EJEMPLO 1
            "img/intervencion_detail_2.jpg", // <--- RUTA DE EJEMPLO 2
            "img/intervencion_diagrama.png"
        ]
    },
    {
        id: 2,
        nombre: "MIDO - Domótica",
        areas: ["UX/UI", "Branding"],
        rol: "Identidad de marca y diseño de APP",
        thumb: "img/Proyectos destacados 4.png",// <--- IMAGEN PRINCIPAL (TIRA ANCHA)
        detalle_thumb: "img/mido.webp", // <--- ¡NUEVA IMAGEN PARA EL DESPLIEGUE!
        descripcion_larga: "MIDO es una aplicación de domótica donde desarrollé la identidad de marca completa, desde el logo hasta el diseño de la interfaz de usuario, priorizando la simplicidad y la experiencia del usuario.",
        galeria: [
            "img/mido_app_screenshot.jpg",
            "img/mido_wireframe.png"
        ]
    },
    {
        id: 3,
        nombre: "Hábitat - Un mundo",
        areas: ["Producto"],
        rol: "Diseño de producto, propuesta para Atakama Outdoor SPA de diseño nueva linea de pantuflas",
        thumb: "img/Proyectos destacados 3.png", // <--- IMAGEN PRINCIPAL (TIRA ANCHA)
        detalle_thumb: "file:///C:/Users/josef/OneDrive%20-%20Universidad%20Cat%C3%B3lica%20de%20Chile/Documentos/Seminario%20de%20t%C3%ADtulo/web/trabajo%20final/img/panfufla.webp", // <--- ¡NUEVA IMAGEN PARA EL DESPLIEGUE!
        galeria: [] // Puedes dejarlo vacío si no hay más imágenes
    },
    {
        id: 4,
        nombre: "Tesoros Naturales de Chile",
        areas: ["Producto"],
        rol: "Diseño de producto, botella tipo bitácora",
        thumb: "img/Proyectos destacados.png", // <--- IMAGEN PRINCIPAL (TIRA ANCHA)
        detalle_thumb: "img/botella.webp", // <--- ¡NUEVA IMAGEN PARA EL DESPLIEGUE!
        galeria: []
    },
    {
        id: 5,
        nombre: "Diseño para la Inclusividad Universal",
        areas: ["Industrial - Espacios"],
        rol: "Diseño de producto, petaca, Hecha en práctica de Atakama Outdoor SPA",
        thumb: "img/Proyectos destacados-05.png",// <--- IMAGEN PRINCIPAL (TIRA ANCHA)
        detalle_thumb: "img/petaca.webp", // <--- ¡NUEVA IMAGEN PARA EL DESPLIEGUE!
        galeria: []
    },
    {
        id: 6,
        nombre: "Unidad de Urgencias UC",
        areas: ["Industrial", "Gráfico"],
        rol: "Diseño de espacios",
        thumb: "img/Proyectos destacados-07.png", // <--- IMAGEN PRINCIPAL (TIRA ANCHA)
        detalle_thumb: "img/intervencion_small_detail.jpg", // <--- ¡NUEVA IMAGEN PARA EL DESPLIEGUE!
        galeria: []
    },
    
    {
        id: 7,
        nombre: "Modelado 3D",
        areas: ["Industrial", "Gráfico"],
        rol: "Diseño integral",
        thumb: "img/Proyectos destacados-08.png", // <--- IMAGEN PRINCIPAL (TIRA ANCHA)
        detalle_thumb: "img/intervencion_small_detail.jpg", // <--- ¡NUEVA IMAGEN PARA EL DESPLIEGUE!
        galeria: []
    },
    
];

// Extracción de áreas únicas para los botones de filtro, incluyendo 'Todos'
const allAreas = trabajos.flatMap(t => t.areas);
const uniqueAreas = ['Todos', ...new Set(allAreas)].filter(a => a !== 'Todos');

// --- 2. ESTADO GLOBAL ---
let currentPage = 'home';
let activeFilter = 'Todos';
let observer = null; // Variable para el Intersection Observer

// --- 3. FUNCIONES AUXILIARES Y LÓGICA DE NAVEGACIÓN ---

/**
 * Función para configurar el Intersection Observer para animar elementos al hacer scroll.
 */
function setupScrollAnimation() {
    if (observer) {
        observer.disconnect();
    }
    
    const options = {
        root: null, 
        rootMargin: '0px 0px -100px 0px', 
        threshold: 0.1
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.target.classList.contains('animate-on-scroll')) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            }
        });
    };

    observer = new IntersectionObserver(callback, options);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}


/**
 * Actualiza los botones de navegación en el header.
 */
function updateNavButtons() {
    document.querySelectorAll('.main-nav .nav-button').forEach(button => {
        const targetPage = button.id.replace('nav-', '');
        const targetMatch = (targetPage === 'projects' || targetPage === 'about' || targetPage === 'contact') ? 
                             targetPage : 'home'; 
        
        if (targetMatch === currentPage || (currentPage === 'full-projects' && targetMatch === 'projects') || (currentPage === 'single-project' && targetMatch === 'projects')) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * Maneja el cambio de página y renderiza el contenido.
 */
function navigateTo(page) {
    currentPage = page;
    switch (page) {
        case 'home':
            renderHomePage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'projects': 
        case 'full-projects': 
            renderProjectsPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'about':
            // Al hacer clic en ABOUT o CONTACT, siempre volvemos a renderizar HOME si no estamos en HOME
            if (document.getElementById('page-home').classList.contains('hidden')) {
                renderHomePage(); 
            }
            setTimeout(() => {
                const target = document.getElementById('about-section-home');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
            break;
        case 'contact':
            if (document.getElementById('page-home').classList.contains('hidden')) {
                renderHomePage(); 
            }
            setTimeout(() => {
                const target = document.getElementById('contact-section-home');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
            break;
        default:
            renderHomePage();
    }
}

/**
 * Configura los listeners de clic para la navegación.
 */
function setupNavigationListeners() {
    document.querySelectorAll('.main-nav .nav-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.id.replace('nav-', '');
            navigateTo(targetPage);
        });
    });
}

/**
 * Configura los listeners de clic para los filtros (Ahora en la sección de Proyectos Seleccionados).
 */
function setupVerticalFilterListeners(areas) {
    // ESTA FUNCIÓN ESTÁ AQUÍ POR SI QUIERES RE-ACTIVAR LOS FILTROS
    const filterListDiv = document.getElementById('projects-filter-list');
    if (!filterListDiv) return;

    filterListDiv.innerHTML = areas.map(area => `
        <button class="vertical-filter-button ${activeFilter === area ? 'active' : ''}" data-filter="${area}">
            ${area}
        </button>
    `).join('');

    filterListDiv.querySelectorAll('.vertical-filter-button').forEach(button => {
        button.addEventListener('click', (event) => {
            activeFilter = event.target.getAttribute('data-filter');
            
            filterListDiv.querySelectorAll('.vertical-filter-button').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            const oldGridContainer = document.querySelector('.projects-list-section');
            if (oldGridContainer) {
                 oldGridContainer.remove(); 
            }
            const filteredTrabajos = activeFilter === 'Todos'
                ? trabajos
                : trabajos.filter(t => t.areas.includes(activeFilter));

            const newGrid = renderProjectGrid(filteredTrabajos);
            newGrid.classList.add('animate-on-scroll');
            
            const projectsHeader = document.getElementById('projects-header-home');
            if (projectsHeader && projectsHeader.nextSibling) {
                projectsHeader.parentNode.insertBefore(newGrid, projectsHeader.nextSibling);
            } else if (projectsHeader) {
                projectsHeader.parentNode.appendChild(newGrid);
            }

            setupScrollAnimation();
        });
    });
}

/**
 * Función auxiliar para crear la sección "Sobre Mí" en el Home (Diseño CV de 2 columnas simple)
 */
function renderHomeAboutSection() {
    const section = document.createElement('section');
    section.className = 'home-about-section'; 
    section.id = 'about-section-home'; 
    
    section.innerHTML = `
        <div class="home-about-container main-container">
            
            <div class="home-about-image-wrapper">
                <img src="img/IMG_1917.jpg" alt="Retrato Maria Josefina">
            </div>
            
            <div class="cv-full-width-details">
                <div class="cv-details-section">
                    <h3 class="cv-subtitle">Estudios</h3>
                    <div class="cv-item">
                        <p class="cv-detail">Diseño Integral<br> <em class="cv-italic">Pontificia Universidad Católica de Chile</em></p>
                        <p class="cv-date"><em class="cv-italic">2021-2026</em></p>
                    </div>

                    <div class="cv-item">
                        <p class="cv-detail">Colegio Sagrado Corazón de Apoquindo<br> <em class="cv-italic">Santiago, Chile</em></p>
                        <p class="cv-date"><em class="cv-italic">2008-2020</em></p>
                    </div>
                </div>
            </div>

            <div class="home-about-text">
                <h2 class="cv-main-title">María Josefina Castro Dintrans</h2>
                <p>
                    Hola! Mi nombre <strong>Josefina</strong>, soy estudiante de quinto año de Diseño Integral en la 
                    Pontificia Universidad Católica de Santiago, Chile. Mis principales 
                    intereses están enfocados en diseño industrial, de servicio, experiencia y producto.
                </p>
                <p>
                    Me caracterizo por ser una persona entusiasta y comprometida, la cual siempre está a disposición a nuevos desafíos.
                    Tengo un buen desempeño tanto en proyectos individuales como colaborativos, donde se busco sacar el mayor provecho a ambos medios.
                </p>

                <div class="cv-details-section">
                    <h3 class="cv-subtitle">Experiencia Laboral</h3>
                    <div class="cv-item">
                        <p class="cv-date">Primer semestre,2025</p>
                        <p class="cv-detail">Practicante en diseño de producto<br> <em class="cv-italic">Atakama Outdoor SPA</em></p>
                    </div>
                    <div class="cv-item">
                        <p class="cv-date">2025</p>
                        <p class="cv-detail">Diseñador Gráfico y Marketing Digital <br> <em class="cv-italic">Mido</em></p>
                    </div>
                </div>
            </div>
            
        </div>
    `;
    
    return section;
}


/**
 * Función auxiliar para crear la sección de Contacto para el Home (REUTILIZABLE)
 */
function renderHomeContactSection() {
    const section = document.createElement('section');
    section.className = 'contact-section contact-section-dark'; 
    section.id = 'contact-section-home'; 

    section.innerHTML = `
        <div class="main-container contact-container">
            <h2 class="contact-title">Hablemos :)</h2>
            <div class="contact-info-grid">
                <p class="contact-cta-message">
                    Si quieres hablar o saber más, contáctame.
                </p>
                <div class="contact-links">
                    <a href="mailto: castro.josefina@uc.cl" class="contact-link">
                        <span class="link-label">Email:</span> castro.josefina@uc.cl
                    </a>
                    <a href="https://linkedin.com/in/tuperfil" target="_blank" class="contact-link">
                        <span class="link-label">LinkedIn:</span> /María Josefina Castro Dintrans
                    </a>
        <a href="https://instagram.com/in/tuperfil" target="_blank" class="contact-link">
                        <span class="link-label">Instagram:</span> /josefina_castrod
                    </a>
                    <span class="contact-link">
                        <span class="link-label">Ubicación:</span> Santiago, Chile
                    </span>
                </div>
            </div>
        </div>
    `;
    return section;
}

/**
 * Función para alternar la visibilidad de los detalles del proyecto (DESPLIEGUE INTERNO).
 * @param {HTMLElement} card El elemento de la tarjeta del proyecto.
 */
function toggleDetails(card) {
    const details = card.querySelector('.project-details-container');
    const allDetails = document.querySelectorAll('.project-details-container.visible');
    const allCards = document.querySelectorAll('.project-card.active');
    
    // 1. Cerrar y desactivar todos los demás detalles abiertos
    allDetails.forEach(d => {
        if (d !== details) {
            d.classList.remove('visible');
        }
    });
    allCards.forEach(c => {
        if (c !== card) {
            c.classList.remove('active');
        }
    });

    // 2. Alternar el estado visible del proyecto actual
    details.classList.toggle('visible');
    card.classList.toggle('active');
}


/**
 * NUEVA FUNCIÓN: Configura la previsualización de la imagen al pasar el ratón (Devansh Prakash style).
 */
function setupProjectHoverPreview(container) {
    const previewCursor = document.getElementById('project-preview-cursor');
    const previewImage = document.getElementById('project-preview-image');
    if (!previewCursor || !previewImage) return;

    let currentPreviewId = null;

    // 1. Mostrar/Ocultar y Cargar Imagen
    container.querySelectorAll('.project-card').forEach(card => {
        const imgSource = card.getAttribute('data-preview-img');
        const projectId = card.getAttribute('data-project-id');

        card.addEventListener('mouseenter', () => {
            if (projectId !== currentPreviewId) {
                previewImage.src = imgSource;
                currentPreviewId = projectId;
            }
            previewCursor.classList.add('visible');
        });

        card.addEventListener('mouseleave', () => {
            previewCursor.classList.remove('visible');
            currentPreviewId = null; 
        });
    });

    // 2. Seguir el cursor
    document.addEventListener('mousemove', (e) => {
        if (!previewCursor.classList.contains('visible')) return;

        const offsetX = 50; 
        const offsetY = 50;

        const x = Math.min(e.clientX + offsetX, window.innerWidth - 180); 
        const y = Math.min(e.clientY + offsetY, window.innerHeight - 180);

        previewCursor.style.left = `${x}px`;
        previewCursor.style.top = `${y}px`;
    });
}


/**
 * Renders the dedicated page for a single project (Case Study).
 * @param {number} projectId El ID del proyecto a mostrar.
 */
function renderSingleProjectPage(projectId) {
    const projectData = trabajos.find(t => t.id === projectId);
    
    if (!projectData) {
        navigateTo('full-projects');
        return;
    }

    const mainContent = document.getElementById('main-content');
    const singlePageDivId = 'page-single-project';

    // Ocultar todas las secciones principales
    document.getElementById('page-home').classList.add('hidden');
    document.getElementById('page-projects').classList.add('hidden');
    document.getElementById('page-about').classList.add('hidden');

    // Limpiar y crear el contenedor de la página única
    let singlePageDiv = document.getElementById(singlePageDivId);
    if (singlePageDiv) {
        singlePageDiv.remove();
    }
    
    singlePageDiv = document.createElement('div');
    singlePageDiv.id = singlePageDivId;
    singlePageDiv.className = 'page-section single-project-page';
    singlePageDiv.style.paddingTop = '8rem';

    // Renderizado dinámico de la galería del proyecto
    const galleryHtml = projectData.galeria ? projectData.galeria.map(imgUrl => `
        <img 
            src="${imgUrl}" 
            alt="Detalle de ${projectData.nombre}" 
            style="width: 100%; display: block; border-radius: 8px; max-height: 400px; object-fit: cover; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);"
            onerror="this.onerror=null; this.src='https://placehold.co/800x400?text=IMAGEN+DE+GALERÍA';"
        />
    `).join('') : '<p style="color: var(--fg-thin);">No hay imágenes de galería disponibles para este proyecto.</p>';


    singlePageDiv.innerHTML = `
        <div class="main-container">
            <h1 class="main-title-thin" style="font-size: 4rem; margin-bottom: 0.5rem;">${projectData.nombre}</h1>
            <p class="project-category" style="font-size: 1.2rem; color: var(--accent-color);">${projectData.areas.join(' | ')}</p>
            <p style="font-size: 1.1rem; color: var(--fg-thin); margin-bottom: 3rem;">Rol: ${projectData.rol}</p>
            
            <div class="project-case-study">
                <img src="${projectData.thumb}" alt="${projectData.nombre}" 
                    style="width: 100%; max-height: 600px; object-fit: cover; border-radius: 8px; margin-bottom: 3rem;"
                    onerror="this.onerror=null; this.src='https://placehold.co/1200x600/DCDCDC/333333?text=CASO+ESTUDIO';"
                />
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-bottom: 4rem;">
                    <div>
                        <h3 class="cv-subtitle" style="font-size: 1.5rem; color: var(--fg-dark);">El Desafío</h3>
                        <p>${projectData.descripcion_larga || 'Descripción detallada del problema de diseño o el brief inicial. (Agrega la descripción al array "trabajos")'}</p>
                    </div>
                    <div>
                        <h3 class="cv-subtitle" style="font-size: 1.5rem; color: var(--fg-dark);">Solución</h3>
                        <p>Explicación de la solución y tu enfoque. Fuimos pioneros en el uso de la materialidad X y logramos reducir los costos de producción en un 15% mediante el proceso Y.</p>
                    </div>
                </div>
                
                <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 2rem;">
                    <h3 class="cv-subtitle" style="font-size: 1.5rem; color: var(--fg-dark);">Galería de Proceso</h3>
                    ${galleryHtml}
                </div>
                
                <button id="back-to-home-button" class="action-button" style="display: inline-block; margin-top: 4rem;">&larr; Volver al Inicio</button>
            </div>
        </div>
    `;

    mainContent.appendChild(singlePageDiv);
    currentPage = 'single-project'; // Estado especial para la página única
    
    // Asignamos el listener justo después de que el elemento ha sido insertado
    const backButton = document.getElementById('back-to-home-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            navigateTo('home');
        });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateNavButtons();
}


/**
 * Renders the project grid section (Galeria de Imagen Dominante).
 */
function renderProjectGrid(projects) {
    const gridSection = document.createElement('section');
    gridSection.className = 'projects-list-section'; 

    gridSection.innerHTML = `
        <div class="projects-grid main-container">
            ${projects.map(p => `
                <article 
                    class="project-card" 
                    data-project-id="${p.id}" 
                    data-preview-img="${p.thumb || 'https://placehold.co/400x300/DCDCDC/333333?text=IMAGEN+FALTANTE'}"
                >
                    
                    <div class="project-thumb-wrapper">
                         <img 
                            src="${p.thumb}" 
                            alt="${p.nombre}" 
                            class="project-thumb"
                            loading="lazy"
                            onerror="this.onerror=null; this.src='https://placehold.co/1200x400/DCDCDC/333333?text=${p.nombre}';"
                        />
                        
                        <div class="project-text-overlay">
                            <h3>${p.nombre}</h3>
                            <p>${p.areas.join(' / ')}</p>
                        </div>
                    </div>
                    
                    <div class="project-details-container">
                        <div class="project-info">
                            <div class="details-image-wrapper">
                                <img 
                                    src="${p.detalle_thumb || p.thumb}" 
                                    alt="Detalle de ${p.nombre}" 
                                    class="details-thumb-small"
                                    onerror="this.onerror=null; this.src='https://placehold.co/250x250/F0F0F0/333333?text=DETAIL';"
                                />
                            </div>
                            
                            <div class="details-text">
                                <p class="project-category">${p.areas.join(' / ')}</p>
                                <h3 class="project-title">${p.nombre}</h3>
                                <p class="project-description">${p.rol} <br><br> (Haz clic en la tarjeta de imagen para cerrar.)</p>
                                
                                <button class="action-button saber-mas-button" data-project-id="${p.id}" style="margin-top: 1.5rem; background-color: var(--accent-color); color: var(--bg-white); border-color: var(--accent-color);">
                                    SABER MÁS
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            `).join('')}
        </div>
    `;
    
    // 1. Manejador de clic principal (DEPLIEGA DETALLES)
    gridSection.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (event) => {
            // Previene que el evento se propague si se hace clic en el botón "SABER MÁS"
            if (event.target.classList.contains('saber-mas-button')) {
                return;
            }
            toggleDetails(card);
        });
    });

    // 2. Manejador de clic del botón "SABER MÁS" (NAVEGA A PÁGINA ÚNICA)
    gridSection.querySelectorAll('.saber-mas-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que se dispare el evento toggleDetails del padre
            const projectId = parseInt(button.getAttribute('data-project-id'));
            renderSingleProjectPage(projectId);
        });
    });
    
    setupProjectHoverPreview(gridSection); 
    
    return gridSection;
}

/**
 * Renders the dedicated Projects page (Portafolio completo, con diseño de galería de tarjetas).
 */
function renderProjectsPage() {
    const homePageDiv = document.getElementById('page-home');
    const projectsPageDiv = document.getElementById('page-projects');
    const singlePageDiv = document.getElementById('page-single-project');
    
    // Ocultar la página de proyecto único si existe
    if (singlePageDiv) singlePageDiv.remove();
    
    // Ocultar Home y mostrar Projects
    homePageDiv.classList.add('hidden');
    projectsPageDiv.classList.remove('hidden');
    
    // Limpiar contenido anterior
    projectsPageDiv.innerHTML = ''; 

    const header = document.createElement('div');
    header.className = 'main-container page-header';
    header.style.paddingTop = '5rem';
    header.innerHTML = `
        <h1 class="main-title-thin" style="font-size: 3rem; margin-bottom: 1rem;">PORTAFOLIO COMPLETO</h1>
        <p style="font-size: 1.1rem; color: var(--fg-thin);">Aquí puedes explorar todos mis trabajos de diseño.</p>
    `;
    projectsPageDiv.appendChild(header);

    const fullProjectsGrid = document.createElement('div');
    fullProjectsGrid.className = 'projects-grid-full main-container';

    fullProjectsGrid.innerHTML = `
        ${trabajos.map(p => `
            <article class="project-card-full">
                
                <div class="project-header-full">
                    <p class="project-year-full">2025</p> 
                    <p class="project-category">${p.areas[0] || 'Diseño'}</p>
                </div>

                <div class="project-thumb-wrapper-full">
                    <img 
                        src="${p.thumb}" 
                        alt="${p.nombre}" 
                        class="project-thumb"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='https://placehold.co/400x300/DCDCDC/333333?text=${p.nombre}';"
                    />
                </div>
                
                <div class="project-info-full">
                    <h3 class="project-title-full">${p.nombre}</h3>
                    <p class="project-category-full">${p.rol}</p>
                </div>
            </article>
        `).join('')}
    `;
    
    projectsPageDiv.appendChild(fullProjectsGrid);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateNavButtons();
}


/**
 * Renders the main Home page content.
 */
function renderHomePage() {
    const homePageDiv = document.getElementById('page-home');
    const aboutPageDiv = document.getElementById('page-about');
    const projectsPageDiv = document.getElementById('page-projects');
    const singlePageDiv = document.getElementById('page-single-project');
    
    // Limpiar páginas no utilizadas si existen
    if (singlePageDiv) singlePageDiv.remove();
    
    // Mostrar HOME y ocultar otras secciones
    homePageDiv.classList.remove('hidden');
    aboutPageDiv.classList.add('hidden');
    projectsPageDiv.classList.add('hidden');
    
    // FORZAMOS LA RE-RENDERIZACIÓN para garantizar que la página no esté en blanco.
    homePageDiv.innerHTML = ''; 

    const filteredTrabajos = activeFilter === 'Todos'
        ? trabajos
        : trabajos.filter(t => t.areas.includes(activeFilter));

    // CLAVE: Dividir la palabra "PORTAFOLIO" y aplicar el retraso escalonado
    const titleText = "PORTAFOLIO";
    const staggeredHtml = titleText.split('').map((letter, index) => {
        // Aplicar el retraso progresivo (80ms por letra)
        return `<span class="stagger-letter" style="animation-delay: ${index * 0.08}s;">${letter === ' ' ? '&nbsp;' : letter}</span>`;
    }).join('');
    
    
    // 2. Hero Section (Portada - Título Minimalista y Centrado)
    const heroSection = document.createElement('section');
    heroSection.className = 'hero-section new-minimalist-hero'; 
    
    heroSection.innerHTML = `
        <div class="main-container">
            <h1 class="main-title-thin">${staggeredHtml}</h1> 
            <div class="personal-info">
                <p>Maria Josefina Castro Dintrans</p>
                <p class="role">Diseñadora Integral</p>
            </div>
        </div>
    `;
    homePageDiv.appendChild(heroSection);
    
    // 3. Agregar Sección Sobre Mí
    const homeAboutSection = renderHomeAboutSection(); 
    homeAboutSection.classList.add('animate-on-scroll'); 
    homePageDiv.appendChild(homeAboutSection);
    
    // 4. Agregar Header de Proyectos (Título Simple)
    const projectsTitle = document.createElement('div');
    projectsTitle.className = 'main-container animate-on-scroll'; 
    projectsTitle.style.paddingTop = '4rem';
    projectsTitle.innerHTML = `<h3 style="font-weight: 300; font-size: 1.5rem; color: var(--fg-dark);">Proyectos Seleccionados</h3>`;
    homePageDiv.appendChild(projectsTitle); 

    
    setupVerticalFilterListeners(uniqueAreas);


    // 5. Agregar Grid de Proyectos
    const gridSection = renderProjectGrid(filteredTrabajos);
    gridSection.classList.add('animate-on-scroll'); 
    homePageDiv.appendChild(gridSection);

    // 5.5. Agregar botón de "Saber Más" (Portafolio Completo)
    const moreButtonContainer = document.createElement('div');
    moreButtonContainer.className = 'main-container';
    moreButtonContainer.style.textAlign = 'center';
    moreButtonContainer.style.paddingTop = '2rem';
    moreButtonContainer.innerHTML = `
        <button id="nav-all-projects" class="action-button">SABER MÁS</button>
    `;
    homePageDiv.appendChild(moreButtonContainer);
    
    moreButtonContainer.querySelector('#nav-all-projects').addEventListener('click', () => {
        navigateTo('full-projects'); 
    });
    
    // 6. Agregar la Sección de Contacto (como bloque de cierre en el Home)
    const contactSection = renderHomeContactSection(); 
    contactSection.classList.add('animate-on-scroll');
    homePageDiv.appendChild(contactSection);

    // 7. Configurar el observador después de agregar todos los elementos
    setupScrollAnimation();
    
    updateNavButtons();
}

/**
 * Configura el efecto de foco de luz (spotlight) que sigue al cursor, 
 * haciendo que el círculo de luz sea sutilmente blanco.
 */
function setupMouseSpotlight() {
    const spotlight = document.getElementById('mouse-spotlight');
    if (!spotlight) return;

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        spotlight.style.backgroundImage = `
            radial-gradient(
                circle 120px at ${x}px ${y}px, 
                var(--bg-white), 
                transparent 70% 
            )
        `;
    });
}


// --- 5. INICIALIZACIÓN ---

window.onload = () => {
    // Restauramos la inicialización simple
    setupNavigationListeners();
    setupMouseSpotlight();
    
    // Mostrar la página principal inmediatamente
    navigateTo('home'); 
    
    // Restaurar el scroll del cuerpo
    document.body.style.overflowY = 'auto';
};