const htmlRoot = document.documentElement;
const themeToggleButton = document.getElementById('themeToggle');
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle with localStorage
const savedTheme = localStorage.getItem('asc-theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
  htmlRoot.setAttribute('data-theme', savedTheme);
}

updateThemeIcon();

themeToggleButton?.addEventListener('click', () => {
  const current = htmlRoot.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  htmlRoot.setAttribute('data-theme', next);
  localStorage.setItem('asc-theme', next);
  updateThemeIcon();
});

function updateThemeIcon() {
  const isLight = htmlRoot.getAttribute('data-theme') === 'light';
  if (themeToggleButton) {
    themeToggleButton.querySelector('.icon').textContent = isLight ? '🌙' : '☀️';
  }
}

// Mobile nav toggle
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('open');
});

// Close nav when clicking a link
navList?.addEventListener('click', (e) => {
  const target = e.target;
  if (target.tagName === 'A' && navList.classList.contains('open')) {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', href);
    }
  });
});

// 3D Animation Banner scroll functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// Animation banner scroll parallax effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const banner = document.querySelector('.animation-banner');
  const slider = document.querySelector('.animation-banner .slider');
  
  if (banner && slider) {
    const bannerHeight = banner.offsetHeight;
    const scrollProgress = scrolled / bannerHeight;
    
    if (scrollProgress <= 1) {
      slider.style.transform = `perspective(1000px) rotateX(-16deg) rotateY(${scrollProgress * 180}deg)`;
    }
  }
});


