// year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// sticky nav helper (optional class)
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// fade-in on scroll (for any .fade-in)
const fadeEls = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => observer.observe(el));
} else {
  // fallback if no IntersectionObserver support
  fadeEls.forEach((el) => el.classList.add("visible"));
}

// dark / light toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.contains("theme-dark");
    body.classList.toggle("theme-dark", !isDark);
    body.classList.toggle("theme-light", isDark);
  });
}
