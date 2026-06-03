document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");
  const themeToggle = document.getElementById("theme-toggle");
  const closeMenu = document.getElementById("close-menu");
  const body = document.body;

  /* HEADER SCROLL */
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });

  /* SMOOTH SCROLL + CLOSE MENU */
  document.querySelectorAll('#nav-links a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });

      closeNav();
    });
  });

  /* OPEN MENU */
  menuToggle.addEventListener("click", () => {
    navLinks.classList.add("active");
    body.classList.add("menu-open");
  });

  /* CLOSE MENU FUNCTION */
  const closeNav = () => {
    navLinks.classList.remove("active");
    body.classList.remove("menu-open");
  };

  /* CLOSE BUTTON */
  closeMenu.addEventListener("click", closeNav);

  /* THEME */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") body.classList.add("dark");

  const updateIcon = () => {
    themeToggle.innerHTML = body.classList.contains("dark")
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  };

  updateIcon();

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      body.classList.contains("dark") ? "dark" : "light",
    );
    updateIcon();
  });
});
