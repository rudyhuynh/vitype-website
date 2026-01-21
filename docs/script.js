// ===== DOM Elements =====
const navbar = document.getElementById("navbar");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navLinks = document.getElementById("nav-links");
const typingText = document.getElementById("typing-text");
const themeToggle = document.getElementById("theme-toggle");

// ===== Theme Toggle =====
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme() {
  return localStorage.getItem("theme");
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function initTheme() {
  // Priority: stored preference > system preference
  const storedTheme = getStoredTheme();
  const systemTheme = getSystemTheme();
  const theme = storedTheme || systemTheme;
  setTheme(theme);
}

// Initialize theme on page load
initTheme();

// Theme toggle button click handler
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    // Only auto-switch if user hasn't set a preference
    if (!getStoredTheme()) {
      setTheme(e.matches ? "dark" : "light");
    }
  });

// ===== Mobile Menu Toggle =====
mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// ===== Navbar Scroll Effect =====
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ===== Typing Animation =====
const phrases = [
  "Xin chào Việt Nam! 🇻🇳",
  "Gõ tiếng Việt thật dễ dàng",
  "Telex: Vieejt Nam",
  "VNI: Vie65t Nam",
  "ViType - Mã nguồn mở ❤️",
  "Không lo gõ nhầm khi code",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isPaused) {
    setTimeout(typeEffect, 1500);
    isPaused = false;
    isDeleting = true;
    return;
  }

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(typeEffect, 30);
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      isPaused = true;
    }

    setTimeout(typeEffect, 80);
  }
}

// Start typing animation
if (typingText) {
  setTimeout(typeEffect, 500);
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe feature cards and download cards
document.querySelectorAll(".feature-card, .download-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});

// Add animation class styles dynamically
const style = document.createElement("style");
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Stagger animation for cards =====
const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 100}ms`;
});

const downloadCards = document.querySelectorAll(".download-card");
downloadCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 150}ms`;
});

// ===== Google Analytics Event Tracking =====
const btnDownload = document.getElementById("btn-download");
if (btnDownload) {
  btnDownload.addEventListener("click", function () {
    if (typeof gtag === "function") {
      gtag("event", "download");
    }
  });
}
