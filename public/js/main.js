(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     1. Scroll Reveal Observer
     ------------------------------------------------------------------- */
  function initReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      reveals.forEach((el) => observer.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("active"));
    }
  }

  /* ---------------------------------------------------------------------
     2. Interactive Terminal Typewriter
     ------------------------------------------------------------------- */
  function initTypewriter() {
    const typeWriterElement = document.getElementById("typewriter");
    if (!typeWriterElement) return;

    const commands = [
      "root@infralab:~# systemctl status nginx",
      "● nginx.service - High performance web server",
      "   Loaded: loaded (/lib/systemd/system/nginx.service; enabled)",
      "   Active: active (running) since Tue 2026-08-11 19:40:00 WIB",
      "root@infralab:~# docker ps --format 'table {{.Names}}\\t{{.Status}}'",
      "NAMES               STATUS",
      "infra-gateway       Up 42 hours (healthy)",
      "postgres-db         Up 42 hours (healthy)",
      "root@infralab:~# ufw status verbose",
      "Status: active",
      "Default: deny (incoming), allow (outgoing)",
      "To                         Action      From",
      "--                         ------      ----",
      "22/tcp (SSH)               ALLOW IN    Anywhere",
      "443/tcp (HTTPS)            ALLOW IN    Anywhere",
      "root@infralab:~# _",
    ];

    let cmdIndex = 0;
    let charIndex = 0;

    const staticRender =
      prefersReducedMotion ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 1023px)").matches;

    if (staticRender) {
      typeWriterElement.innerHTML = commands
        .map(
          (cmd) =>
            `<div class="${
              cmd.startsWith("root@infralab")
                ? "text-[#1d1d1f] font-semibold py-0.5"
                : "text-[#86868b] py-0.5"
            }">${cmd}</div>`
        )
        .join("");
      return;
    }

    function typeWriter() {
      if (cmdIndex >= commands.length) return;

      const currentCmd = commands[cmdIndex];

      if (!currentCmd.startsWith("root@infralab")) {
        typeWriterElement.innerHTML += `<div class="text-[#86868b] py-0.5">${currentCmd}</div>`;
        cmdIndex++;
        setTimeout(typeWriter, 280);
        return;
      }

      if (charIndex === 0) {
        typeWriterElement.innerHTML += `<div id="cmd-${cmdIndex}" class="text-[#1d1d1f] font-semibold py-0.5"></div>`;
      }

      const cmdLine = document.getElementById(`cmd-${cmdIndex}`);

      if (charIndex < currentCmd.length) {
        cmdLine.innerHTML += currentCmd.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 28 + Math.random() * 28);
      } else {
        cmdIndex++;
        charIndex = 0;
        setTimeout(typeWriter, 480);
      }
    }

    setTimeout(typeWriter, 700);
  }

  /* ---------------------------------------------------------------------
     3. Floating navbar — scroll state + active section highlight
     ------------------------------------------------------------------- */
  function initFloatingNav() {
    const wrapper = document.getElementById("mac-nav-wrapper");
    const navLinks = document.querySelectorAll(".mac-nav-link[data-nav]");
    if (!wrapper || !navLinks.length) return;

    const sections = Array.from(navLinks)
      .map((link) => {
        const id = link.getAttribute("data-nav");
        const el = document.getElementById(id);
        return el ? { id, el, link } : null;
      })
      .filter(Boolean);

    let sectionTops = [];

    function measureSections() {
      sectionTops = sections.map((section) => ({
        link: section.link,
        top: section.el.offsetTop,
      }));
    }

    function onScroll() {
      wrapper.classList.toggle("is-scrolled", window.scrollY > 24);

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = sectionTops[0];

      sectionTops.forEach((section) => {
        if (section.top <= scrollPos) current = section;
      });

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link === current.link);
      });
    }

    measureSections();
    window.addEventListener("resize", measureSections, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------------
     4. Subtle 3D tilt on cards + hero terminal
     ------------------------------------------------------------------- */
  function initTiltCards() {
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const cards = document.querySelectorAll(".tilt-card");

    cards.forEach((card) => {
      let frame = null;

      card.addEventListener("mousemove", (e) => {
        if (frame) return;
        const { clientX, clientY } = e;

        frame = requestAnimationFrame(() => {
          frame = null;
          const rect = card.getBoundingClientRect();
          const x = (clientX - rect.left) / rect.width - 0.5;
          const y = (clientY - rect.top) / rect.height - 0.5;

          card.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
        });
      });

      card.addEventListener("mouseleave", () => {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = null;
        }
        card.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------------------
     5. Hero parallax — terminal + floating photos follow cursor
     ------------------------------------------------------------------- */
  function initHeroParallax() {
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const visual = document.getElementById("hero-visual");
    const terminal = document.getElementById("hero-terminal");
    const photos = document.querySelectorAll(".hero-photo");

    if (!visual || !terminal) return;

    let frame = null;

    visual.addEventListener("mousemove", (e) => {
      if (frame) return;
      const { clientX, clientY } = e;

      frame = requestAnimationFrame(() => {
        frame = null;
        const rect = visual.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;

        terminal.style.transform = `translate(${x * 10}px, ${y * 8}px)`;

        photos.forEach((photo, i) => {
          const factor = i === 0 ? 18 : 14;
          const dir = i === 0 ? 1 : -1;
          photo.style.translate = `${x * factor * dir}px ${y * factor}px`;
        });
      });
    });

    visual.addEventListener("mouseleave", () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      terminal.style.transform = "";
      photos.forEach((photo) => {
        photo.style.translate = "";
      });
    });
  }

  /* ---------------------------------------------------------------------
     6. Magnetic hover on CTA buttons
     ------------------------------------------------------------------- */
  function initMagnetic() {
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    document.querySelectorAll("[data-magnetic]").forEach((wrap) => {
      let frame = null;

      wrap.addEventListener("mousemove", (e) => {
        if (frame) return;
        const { clientX, clientY } = e;

        frame = requestAnimationFrame(() => {
          frame = null;
          const rect = wrap.getBoundingClientRect();
          const x = clientX - rect.left - rect.width / 2;
          const y = clientY - rect.top - rect.height / 2;
          wrap.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
        });
      });

      wrap.addEventListener("mouseleave", () => {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = null;
        }
        wrap.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------------------
     7. Traffic light micro-interaction
     ------------------------------------------------------------------- */
  function initTrafficLights() {
    const dots = document.querySelectorAll(".mac-dot");
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        dot.style.transform = "scale(0.85)";
        setTimeout(() => {
          dot.style.transform = "";
        }, 150);
      });
    });
  }

  /* ---------------------------------------------------------------------
     8. Mobile & tablet menu — toggle + auto-close
     ------------------------------------------------------------------- */
  function initMobileNav() {
    const menuBtn = document.getElementById("menu-btn");
    const menuWrap = document.getElementById("mobile-menu-wrap");
    const navHeader = document.getElementById("mobile-nav");
    if (!menuBtn || !menuWrap || !navHeader) return;

    const setOpen = (open) => {
      menuWrap.classList.toggle("is-open", open);
      menuWrap.classList.toggle("hidden", !open);
      menuBtn.classList.toggle("is-open", open);
      const iconOpen = menuBtn.querySelector(".menu-icon-open");
      const iconClose = menuBtn.querySelector(".menu-icon-close");
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle("hidden", open);
        iconClose.classList.toggle("hidden", !open);
      }
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!menuWrap.classList.contains("is-open"));
    });

    menuWrap.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", (e) => {
      if (menuWrap.classList.contains("is-open") && !navHeader.contains(e.target)) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuWrap.classList.contains("is-open")) {
        setOpen(false);
        menuBtn.focus();
      }
    });

    window.addEventListener("resize", onResize, { passive: true });
  }

  function boot() {
    initReveal();
    initTypewriter();
    initFloatingNav();
    initMobileNav();
    initTiltCards();
    initHeroParallax();
    initMagnetic();
    initTrafficLights();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
