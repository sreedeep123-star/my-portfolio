// ===== YEAR =====
const yearEl = document.getElementById("year");
if(yearEl) yearEl.textContent = new Date().getFullYear();

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;
const storedTheme = localStorage.getItem("theme");
if(storedTheme === "dark") htmlEl.classList.add("dark");
else if(!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) htmlEl.classList.add("dark");

function updateThemeIcon() {
  themeToggle.textContent = htmlEl.classList.contains("dark") ? "☀️" : "🌙";
}
updateThemeIcon();
themeToggle && themeToggle.addEventListener("click", () => {
  htmlEl.classList.toggle("dark");
  localStorage.setItem("theme", htmlEl.classList.contains("dark") ? "dark" : "light");
  updateThemeIcon();
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
menuToggle && menuToggle.addEventListener("click", () => {
  primaryNav && primaryNav.classList.toggle("open");
});
document.querySelectorAll('.primary-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if(primaryNav.classList.contains("open")) primaryNav.classList.remove("open");
  });
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("revealed");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL FOR ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
