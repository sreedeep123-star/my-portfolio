// script.js — theme + mobile menu + scroll reveal + year

// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Theme toggle (persist in localStorage)
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;
const stored = localStorage.getItem('theme');
if (stored === 'dark') htmlEl.classList.add('dark');
else if (!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  htmlEl.classList.add('dark');
}
function updateThemeButton() {
  if (!themeToggle) return;
  themeToggle.textContent = htmlEl.classList.contains('dark') ? '☀️' : '🌙';
}
updateThemeButton();
themeToggle && themeToggle.addEventListener('click', () => {
  htmlEl.classList.toggle('dark');
  localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light');
  updateThemeButton();
});

// Mobile menu toggle (minimal)
const menuToggle = document.getElementById('menuToggle');
const primaryNav = document.getElementById('primaryNav');
menuToggle && menuToggle.addEventListener('click', () => {
  primaryNav && primaryNav.classList.toggle('open');
});

// Close nav when link clicked (mobile)
document.querySelectorAll('.primary-nav a, .nav-link').forEach(a => {
  a.addEventListener('click', () => {
    if (primaryNav && primaryNav.classList.contains('open')) primaryNav.classList.remove('open');
  });
});

// Scroll reveal using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // optionally unobserve to run only once
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(r => observer.observe(r));

// Smooth internal link scrolling is handled by CSS `scroll-behavior: smooth`
