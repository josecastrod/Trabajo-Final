const FILTER_MAP = {
    'Grid': 'Todos', // Muestra todo
    'List': 'Producto',
    'Feed': 'UX/UI',
    'Full': 'Experiencia'
};

// Se mantienen los datos originales pero se usan placeholders con estilo minimalista para simular las imágenes de referencia
const trabajos = [
    {
        id: 1,
        nombre: "Sistema modular de almacenaje",
        areas: ["Producto", "Industrial"],
        capas: ["Objeto", "Interfaz", "Servicio"],
        año: 2025,
        rol: "Diseño integral",
        tags: ["prototipo", "ergonomía", "fabricación"],
        thumb: "https://placehold.co/600x600/353535/FFFFFF?text=Product+Concept"
    },
    {
        id: 2,
        nombre: "App Recetas",
        areas: ["UX/UI", "Experiencia"],
        capas: ["Interfaz", "Servicio"],
        año: 2025,
        rol: "UX/UI Lead",
        tags: ["investigación", "wireframes", "UI kit"],
        thumb: "https://placehold.co/600x600/353535/FFFFFF?text=Digital+UI"
    },
    {
        id: 3,
        nombre: "Silla ergonómica OFF+",
        areas: ["Producto", "Industrial"],
        capas: ["Objeto"],
        año: 2024,
        rol: "Diseño de producto",
        tags: ["ergonomía", "materiales", "prototipo"],
        thumb: "https://placehold.co/600x600/888888/000000?text=Object+Design"
    },
    {
        id: 4,
        nombre: "Plataforma educativa STEM",
        areas: ["UX/UI", "Experiencia"],
        capas: ["Interfaz", "Servicio"],
        año: 2024,
        rol: "UX Research & Design",
        tags: ["investigación", "accesibilidad", "testing"],
        thumb: "https://placehold.co/600x600/353535/FFFFFF?text=UX+Platform"
    },
    {
        id: 5,
        nombre: "Luminaria adaptable Luna",
        areas: ["Producto", "Industrial"],
        capas: ["Objeto", "Interfaz"],
        año: 2024,
        rol: "Diseño integral",
        tags: ["iluminación", "IoT", "fabricación"],
        thumb: "https://placehold.co/600x600/888888/000000?text=IoT+Object"
    },
    {
        id: 6,
        nombre: "Sistema de diseño Pulse",
        areas: ["UX/UI"],
        capas: ["Interfaz"],
        año: 2024,
        rol: "Design System Lead",
        tags: ["componentes", "tokens", "documentación"],
        thumb: "https://placehold.co/600x600/353535/FFFFFF?text=Design+System"
    },
    {
        id: 7,
        nombre: "Servicio de movilidad urbana",
        areas: ["Experiencia", "UX/UI"],
        capas: ["Servicio", "Interfaz"],
        año: 2023,
        rol: "Service Designer",
        tags: ["journey mapping", "blueprints", "estrategia"],
        thumb: "https://placehold.co/600x600/888888/000000?text=Service+Map"
    },
    {
        id: 8,
        nombre: "Kit de herramientas modulares",
        areas: ["Producto", "Industrial"],
        capas: ["Objeto"],
        año: 2023,
        rol: "Diseño industrial",
        tags: ["modularidad", "materiales", "packaging"],
        thumb: "https://placehold.co/600x600/353535/FFFFFF?text=Modular+Kit"
    }
];

const skills = [
    { nombre: "Producto", nivel: 6 },
    { nombre: "Industrial", nivel: 6 },
    { nombre: "UX Research", nivel: 5 },
    { nombre: "UI Design", nivel: 6 },
    { nombre: "Prototipado", nivel: 6 },
    { nombre: "Figma", nivel: 6 },
    { nombre: "HTML/CSS", nivel: 5 },
    { nombre: "JS", nivel: 4 }
];

const filters = Object.keys(FILTER_MAP); // ['Grid', 'List', 'Feed', 'Full']

// --- 2. ESTADO GLOBAL ---
let currentPage = 'home';
let activeFilter = 'Grid'; // 'Grid' es el valor por defecto que equivale a 'Todos'


// --- 3. FUNCIONES DE RENDERIZADO ---

/**
 * Renders the filter buttons and attaches event listeners.
 * @param {Array<Object>} filteredWorks - The list of works currently displayed.
 */
function renderFilters(filteredWorks) {
    const filtersSection = document.createElement('section');
    filtersSection.className = 'filters-section';
    
    // Contenido del encabezado de filtros
    filtersSection.innerHTML = `
        <div class="works-count">
            <h2>Selected Works</h2>
            <p>(${filteredWorks.length})</p>
        </div>
        <div class="filter-buttons" id="filter-buttons-container">
            <!-- Buttons will be injected here -->
        </div>
    `;

    const buttonsContainer = filtersSection.querySelector('#filter-buttons-container');
    
    filters.forEach(filterLabel => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        if (filterLabel === activeFilter) {
            button.classList.add('active');
        }
        button.textContent = filterLabel;
        
        button.addEventListener('click', () => {
            activeFilter = filterLabel;
            renderHomePage(); // Volver a renderizar la página con el nuevo filtro
        });
        
        buttonsContainer.appendChild(button);
    });

    return filtersSection;
}

/**
 * Renders the grid of projects.
 * @param {Array<Object>} works - The list of projects to display.
 */
function renderProjectGrid(works) {
    const gridSection = document.createElement('section');
    gridSection.className = 'projects-grid-section';

    const gridDiv = document.createElement('div');
    gridDiv.className = 'projects-grid';

    works.forEach(trabajo => {
        const card = document.createElement('article');
        card.className = 'project-card';
        // En el diseño minimalista, solo se muestra la imagen, sin info debajo
        card.innerHTML = `
            <div class="project-thumb">
                <img
                    src="${trabajo.thumb}"
                    alt="${trabajo.nombre}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/600x600/AAAAAA/000000?text=FOTO+${trabajo.id}'"
                />
            </div>
            <!-- La info detallada fue eliminada de la tarjeta para el estilo Grid -->
        `;
        
        // Agregar efecto de hover manual con JavaScript puro para las transiciones
        card.addEventListener('mouseenter', () => {
            card.style.opacity = '0.9';
            const img = card.querySelector('img');
            if (img) img.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.opacity = '1';
            const img = card.querySelector('img');
            if (img) img.style.transform = 'scale(1)';
        });

        gridDiv.appendChild(card);
    });

    gridSection.appendChild(gridDiv);
    return gridSection;
}

/**
 * Renders the main Home page content.
 */
function renderHomePage() {
    const homePageDiv = document.getElementById('page-home');
    const aboutPageDiv = document.getElementById('page-about');
    
    // Mostrar/Ocultar secciones
    homePageDiv.classList.remove('hidden');
    aboutPageDiv.classList.add('hidden');
    
    // Limpiar contenido anterior
    homePageDiv.innerHTML = ''; 

    // 1. Determinar el filtro real basado en el mapeo
    const filterValue = FILTER_MAP[activeFilter] || 'Todos';

    // 2. Filtrar trabajos
    const filteredTrabajos = filterValue === 'Todos'
        ? trabajos
        : trabajos.filter(t => t.areas.includes(filterValue));

    // 3. Hero Section (Ajustado al nuevo layout)
    const heroSection = document.createElement('section');
    heroSection.className = 'hero-section';
    heroSection.innerHTML = `
        <h1 class="hero-logo">Josefina Castro</h1>
        <div class="hero-info">
            <p class="label">Creative Studio</p>
            <p>Licenciada en Diseño Integral de la PUC, en dónde mis principales intereses están enfocados en diseño industrial, de servicio, experiencia y producto.</p>
        </div>
    `;
    homePageDiv.appendChild(heroSection);

    // 4. Filters Section
    homePageDiv.appendChild(renderFilters(filteredTrabajos));

    // 5. Project Grid Section
    homePageDiv.appendChild(renderProjectGrid(filteredTrabajos));
    
    // Actualizar botones de navegación
    updateNavButtons();
}

/**
 * Renders the main About page content.
 */
function renderAboutPage() {
    const homePageDiv = document.getElementById('page-home');
    const aboutPageDiv = document.getElementById('page-about');
    
    // Mostrar/Ocultar secciones
    homePageDiv.classList.add('hidden');
    aboutPageDiv.classList.remove('hidden');
    
    // Limpiar contenido anterior
    aboutPageDiv.innerHTML = ''; 

    // 1. Hero Section (Info)
    aboutPageDiv.innerHTML += `
        <section class="about-hero">
            <p class="label">Info</p>
            <h1>Industrial - Servicios - Experiencia - Producto</h1>
            <div class="about-text">
                <p>Mi práctica une la materialidad del objeto físico con la fluidez de las interfaces digitales y el pensamiento estratégico del diseño de servicios.</p>
                <p>Creo soluciones coherentes donde cada capa del diseño refuerza a las demás, siempre con foco en las personas y el impacto medible.</p>
            </div>
        </section>
    `;

    // 2. Principles Section
    const principlesSection = document.createElement('section');
    principlesSection.className = 'principles-section';
    principlesSection.innerHTML = `
        <h2>Principios</h2>
        <div class="principles-grid">
            ${['Claridad', 'Escala', 'Accesibilidad', 'Medición'].map(p => `
                <div class="principle-card">
                    <h3>${p}</h3>
                </div>
            `).join('')}
        </div>
    `;
    aboutPageDiv.appendChild(principlesSection);

    // 3. Process Section
    const processSection = document.createElement('section');
    processSection.className = 'process-section';
    const processSteps = ['Descubrir', 'Definir', 'Prototipar', 'Probar', 'Iterar'];
    
    processSection.innerHTML = `
        <h2>Proceso</h2>
        <div class="process-steps">
            ${processSteps.map((paso, idx) => `
                <div class="process-step">${paso}</div>
                ${idx < processSteps.length - 1 ? '<span class="process-arrow">→</span>' : ''}
            `).join('')}
        </div>
    `;
    aboutPageDiv.appendChild(processSection);

    // 4. Skills Chart Section
    const skillsSection = document.createElement('section');
    skillsSection.className = 'skills-section';
    
    const skillsHtml = skills.map(skill => `
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name">${skill.nombre}</span>
                <span class="skill-level">${skill.nivel}/7</span>
            </div>
            <div class="skill-bar">
                <div class="skill-fill" style="width: ${(skill.nivel / 7) * 100}%;"></div>
            </div>
        </div>
    `).join('');
    
    skillsSection.innerHTML = `
        <h2>Skills</h2>
        <div class="skills-container">${skillsHtml}</div>
    `;
    aboutPageDiv.appendChild(skillsSection);

    // 5. README Placeholder
    aboutPageDiv.innerHTML += `
        <section class="readme-section">
            <div class="readme-box">
                <h3>📄 README</h3>
                <p>Espacio reservado para cargar documentación adicional en formato Markdown.</p>
            </div>
        </section>
    `;
    
    // Actualizar botones de navegación
    updateNavButtons();
}


// --- 4. LÓGICA DE NAVEGACIÓN Y EVENTOS ---

/**
 * Updates the 'active' class on navigation buttons.
 */
function updateNavButtons() {
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (currentPage === 'home') {
        document.getElementById('nav-home').classList.add('active');
    } else if (currentPage === 'about') {
        document.getElementById('nav-about').classList.add('active');
    }
}

/**
 * Initializes all event listeners and renders the initial page.
 */
function initApp() {
    // Event Listeners para navegación
    document.getElementById('nav-home').addEventListener('click', () => {
        if (currentPage !== 'home') {
            currentPage = 'home';
            // Restablecer el filtro al cambiar a 'home' para que siempre inicie en "Grid" (Todos)
            activeFilter = 'Grid'; 
            renderHomePage();
        }
    });

    document.getElementById('nav-about').addEventListener('click', () => {
        if (currentPage !== 'about') {
            currentPage = 'about';
            renderAboutPage();
        }
    });
    
    // El botón de descarga fue eliminado, por lo que el listener ya no es necesario aquí.

    // Renderizar la página inicial
    renderHomePage();
}

// Iniciar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initApp);