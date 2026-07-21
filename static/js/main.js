(() => {
  const root = document.documentElement;
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const themeToggle = document.getElementById("theme-toggle");
  const backToTop = document.getElementById("back-to-top");

  const getPreferred = () => {
    try {
      return localStorage.getItem("theme") || root.getAttribute("data-theme") || "system";
    } catch {
      return "system";
    }
  };

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = getPreferred();
      const order = ["system", "light", "dark"];
      const next = order[(order.indexOf(current) + 1) % order.length];
      setTheme(next);
      themeToggle.setAttribute("aria-label", `Tema actual: ${next}. Cambiar tema`);
    });
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (backToTop) {
    const onScroll = () => {
      backToTop.hidden = window.scrollY < 480;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
