document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const menuToggle = document.getElementById("mobile-menu");
  const navLinksContainer = document.querySelector(".nav-links");
  const bodyElement = document.body;

  // 1. Optimized Unified Scroll Listener
  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    },
    { passive: true },
  );

  // 2. Precise Smooth Scrolling Logic
  const smoothScrollLinks = document.querySelectorAll(
    ".nav-links a, .btn-primary, .btn-nav",
  );

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - 80;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // 3. Scroll-Reveal Observer (Intersection Observer API)
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealOnScroll.observe(element));

  // 4. Mobile Navigation Overlay Controller
  const toggleMenu = (forceClose = false) => {
    const shouldOpen = forceClose
      ? false
      : !navLinksContainer.classList.contains("active");

    menuToggle.classList.toggle("is-active", shouldOpen);
    navLinksContainer.classList.toggle("active", shouldOpen);
    bodyElement.style.overflow = shouldOpen ? "hidden" : "auto";

    // a11y Updates
    menuToggle.setAttribute("aria-expanded", shouldOpen);
    menuToggle.setAttribute(
      "aria-label",
      shouldOpen ? "Close navigation menu" : "Open navigation menu",
    );
  };

  menuToggle.addEventListener("click", () => toggleMenu());

  // Auto-closes mobile overlay cleanly upon clicking any menu item link
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(true));
  });
});
