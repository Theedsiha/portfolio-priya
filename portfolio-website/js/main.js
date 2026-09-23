/* ==========================================================================
   ENPHA PRIYA.G — GRAPHIC DESIGNER PORTFOLIO
   Vanilla JavaScript Interactivity & Modal Handling
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Project Data Array based on Enpha Priya.G's actual experience & specializations
  const projectsData = [
    {
      id: 'proj-1',
      title: 'Luxury Wedding Album Spread Layout',
      category: 'Album Design',
      categoryKey: 'album',
      image: 'C:\\Users\\ELCOT\\.gemini\\antigravity\\scratch\\portfolio-website\\assets\\images\\Screenshot 2026-09-23 200837.png',
      tools: ['Adobe Photoshop', 'Typography', 'Layout Hierarchy'],
      description: 'Custom wedding album layout created for a high-profile ceremony. Focuses on storytelling spreads, balanced white space, elegant typography, and photo composition for lasting memories.',
      clientType: 'Private Event Client',
      process: '1. Theme Selection → 2. Photo Curation → 3. Grid Layout & Spacing → 4. Color Harmonization → 5. Final Print Export'
    },
    {
      id: 'proj-2',
      title: 'Birthday & Family Memory Album Layout',
      category: 'Album Design',
      categoryKey: 'album',
      image: 'C:\\Users\\ELCOT\\.gemini\\antigravity\\scratch\\portfolio-website\\assets\\images\\Screenshot 2026-09-23 200637.png',
      tools: ['Adobe Photoshop', 'Color Correction', 'Image Enhancement'],
      description: 'Vibrant memory book spread for a family celebration. Incorporates photo grids, playful yet clean typography, background retouching, and cohesive color palette.',
      clientType: 'Family Event Client',
      process: '1. Photo Selection → 2. Background Cleaning → 3. Multi-Photo Collage Design → 4. Typography Accent Placement'
    },
    {
      id: 'proj-3',
      title: 'Creative Cultural Event Poster',
      category: 'Poster Design',
      categoryKey: 'poster',
      image: 'C:\\Users\\ELCOT\\.gemini\\antigravity\\scratch\\portfolio-website\\assets\\images\\fossil .jpg',
      tools: ['Adobe Photoshop', 'Poster Design', 'Creative Composition'],
      description: 'Eye-catching promotional event poster designed for celebration requirement. Utilizes bold typography hierarchy, abstract color contrast, and visual emphasis to drive event engagement.',
      clientType: 'Event Organizer',
      process: '1. Requirement Brief → 2. Visual Concept & Color Palette → 3. Typography Hierarchy → 4. High-Res Artwork Delivery'
    },
    {
      id: 'proj-4',
      title: 'High-End Portrait Skin Cleanup & Retouching',
      category: 'Photo Editing',
      categoryKey: 'editing',
      image: 'assets/images/retouch-portrait.jpg',
      tools: ['Adobe Photoshop', 'Photo Retouching', 'Skin Cleanup', 'Color Grading'],
      description: 'Detailed studio portrait photo editing featuring non-destructive frequency separation skin cleanup, lighting adjustment, shadow recovery, and professional color grading.',
      clientType: 'Portrait Photography Studio',
      process: '1. Raw Image Inspection → 2. Skin Cleanup & Blemish Removal → 3. Tone & Lighting Correction → 4. Selective Color Grading'
    },
    {
      id: 'proj-5',
      title: 'Promotional Festival & Celebration Banner',
      category: 'Poster Design',
      categoryKey: 'poster',
      image: 'assets/images/poster-event.jpg',
      tools: ['Adobe Photoshop', 'Banner Design', 'Typography'],
      description: 'Promotional banner graphic designed for social media and physical display. Crafted to highlight key event information with high visual clarity and strong call-to-action layout.',
      clientType: 'Commercial Promotion',
      process: '1. Concept Sketching → 2. Key Asset Editing → 3. Title & Date Typography → 4. Multi-Format Export'
    },
    {
      id: 'proj-6',
      title: 'Color Correction & Detail Enhancement',
      category: 'Photo Editing',
      categoryKey: 'editing',
      image: 'assets/images/retouch-portrait.jpg',
      tools: ['Adobe Photoshop', 'Color Correction', 'Image Enhancement'],
      description: 'Advanced photo enhancement service correcting muted lighting, adjusting color balance, sharpening subtle details, and improving visual pop for marketing materials.',
      clientType: 'Commercial Client',
      process: '1. Histogram Analysis → 2. White Balance & Exposure Fix → 3. Color Vibrancy Tuning → 4. Sharpening & Noise Reduction'
    }
  ];

  // DOM Elements
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const workGrid = document.getElementById('work-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const contactForm = document.getElementById('contact-form');
  const toastMsg = document.getElementById('toast-msg');
  const backToTopBtn = document.getElementById('back-to-top');

  // 1. Navbar Scroll Effect & Active Link Highlight
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy Active Link
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  });

  // 2. Mobile Menu Toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      menuToggle.innerHTML = isOpen ? '✕' : '☰';
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '☰';
      });
    });
  }

  // 3. Render Selected Work Cards
  function renderProjects(filterCategory = 'all') {
    if (!workGrid) return;
    workGrid.innerHTML = '';

    const filtered = filterCategory === 'all' 
      ? projectsData 
      : projectsData.filter(p => p.categoryKey === filterCategory);

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = 'work-card';
      card.innerHTML = `
        <div class="work-card-img-wrap">
          <img src="${project.image}" alt="${project.title} - ${project.category} by Enpha Priya.G" loading="lazy">
          <span class="work-category-badge">${project.category}</span>
        </div>
        <div class="work-card-body">
          <h3 class="work-title">${project.title}</h3>
          <p class="work-desc">${project.description}</p>
          <div class="work-tools">
            ${project.tools.map(tool => `<span class="tool-pill">${tool}</span>`).join('')}
          </div>
          <button class="work-view-btn" data-project-id="${project.id}">
            <span>View Project Details</span>
            <span>→</span>
          </button>
        </div>
      `;
      workGrid.appendChild(card);
    });

    // Attach click listeners to view detail buttons
    document.querySelectorAll('.work-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const projId = btn.getAttribute('data-project-id');
        openProjectModal(projId);
      });
    });
  }

  // Initial Project Render
  renderProjects('all');

  // 4. Category Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  // 5. Modal Popup View Logic
  function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !modalOverlay) return;

    document.getElementById('modal-img').src = project.image;
    document.getElementById('modal-img').alt = `${project.title} - Enpha Priya.G`;
    document.getElementById('modal-category').textContent = project.category;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-desc').textContent = project.description;
    document.getElementById('modal-tools').textContent = project.tools.join(', ');
    document.getElementById('modal-client').textContent = project.clientType;
    document.getElementById('modal-process').textContent = project.process;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 6. Back to top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
