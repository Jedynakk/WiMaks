(() => {
  function route(path) {
    const script =
      document.currentScript ||
      document.querySelector('script[src$="site.js"]');
    const scriptUrl = script?.getAttribute("src") || "site.js";
    return new URL(path, scriptUrl).toString();
  }

  function initNavOverlay() {
    const overlay = document.getElementById("nav-overlay");
    if (!overlay) return;

    const openButtons = Array.from(
      document.querySelectorAll("[data-nav-overlay-open]"),
    );
    const closeButtons = Array.from(
      document.querySelectorAll("[data-nav-overlay-close]"),
    );
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    let lastActive = null;
    let closeTimer = null;

    function isMobile() {
      return window.matchMedia?.("(max-width: 860px)")?.matches ?? false;
    }

    function renderOverlayContent() {
      const content = overlay.querySelector(".nav-overlay-content");
      if (!content) return;

      // Single source of truth for the mobile nav overlay content.
      if (isMobile()) {
        content.innerHTML = `
          <nav class="nav-overlay-menu" aria-label="Menu">
            <div class="nav-overlay-accordion">
              <button
                class="nav-overlay-accordion-toggle"
                type="button"
                data-overlay-accordion
                aria-expanded="false"
                aria-controls="nav-overlay-about"
              >
                O nas <span class="nav-caret" aria-hidden="true"></span>
              </button>
              <div class="nav-overlay-submenu" id="nav-overlay-about" hidden>
                <a href="${route("o-nas/")}">O nas</a>
                <a href="${route("konsorcjum/")}">Konsorcjum</a>
                <a href="${route("referencje/")}">Referencje</a>
              </div>
            </div>

	            <a class="nav-overlay-link" href="${route("realizacje/")}">Realizacje</a>
	            <a class="nav-overlay-link" href="${route("oferta/")}">Oferta</a>
	            <a class="nav-overlay-link" href="${route("podwykonawcy/")}">Dla podwykonawców</a>
	            <a class="nav-overlay-link" href="${route("oferty-pracy/")}">Oferty pracy</a>
	            <a class="nav-overlay-link" href="${route("kontakt/")}">Kontakt</a>
	          </nav>
	        `;

        const accordionToggle = content.querySelector(
          "[data-overlay-accordion]",
        );
        const accordionPanel = content.querySelector("#nav-overlay-about");
        if (
          accordionToggle instanceof HTMLButtonElement &&
          accordionPanel instanceof HTMLElement
        ) {
          const initialExpanded =
            accordionToggle.getAttribute("aria-expanded") === "true";
          accordionPanel.toggleAttribute("hidden", !initialExpanded);
          accordionToggle.addEventListener("click", () => {
            const nextState =
              accordionToggle.getAttribute("aria-expanded") !== "true";
            accordionToggle.setAttribute("aria-expanded", String(nextState));
            accordionPanel.toggleAttribute("hidden", !nextState);
          });
        }
        return;
      }

      content.innerHTML = `
        <div class="nav-overlay-layout">
          <div class="nav-overlay-grid" aria-label="O nas">
            <a class="nav-tile" href="${route("o-nas/")}">
              <div class="nav-tile-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 21h16v-2H4v2Zm2-4h3V7H6v10Zm5 0h3V3h-3v14Zm5 0h3V9h-3v8Z" />
                </svg>
              </div>
              <div>
                <div class="nav-tile-title">O nas</div>
                <div class="nav-tile-desc">Informacje o firmie i skali realizacji.</div>
              </div>
            </a>
            <a class="nav-tile" href="${route("konsorcjum/")}">
              <div class="nav-tile-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M16 11c1.7 0 3-1.3 3-3S17.7 5 16 5s-3 1.3-3 3 1.3 3 3 3ZM8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3Zm0 2c-2.7 0-5 1.3-5 3v3h10v-3c0-1.7-2.3-3-5-3Zm8 0c-.3 0-.6 0-.9.1 1.2.8 1.9 1.8 1.9 2.9v3h6v-3c0-1.7-2.3-3-5-3Z" />
                </svg>
              </div>
              <div>
                <div class="nav-tile-title">Konsorcjum</div>
                <div class="nav-tile-desc">Współpraca przy większych i złożonych inwestycjach.</div>
              </div>
            </a>
            <a class="nav-tile" href="${route("referencje/")}">
              <div class="nav-tile-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M6 2h9l3 3v17H6V2Zm9 1.5V6h2.5L15 3.5ZM8 10h8V8H8v2Zm0 4h8v-2H8v2Zm0 4h6v-2H8v2Z" />
                </svg>
              </div>
              <div>
                <div class="nav-tile-title">Referencje</div>
                <div class="nav-tile-desc">Wybrane listy referencyjne i potwierdzenia.</div>
              </div>
            </a>
          </div>
        </div>
      `;
    }

    function setExpanded(isExpanded) {
      openButtons.forEach((btn) =>
        btn.setAttribute("aria-expanded", String(isExpanded)),
      );
    }

    function openOverlay() {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
      renderOverlayContent();
      lastActive = document.activeElement;
      overlay.hidden = false;
      document.body.classList.add("modal-open");
      setExpanded(true);

      // Allow the browser to paint before toggling the transition class.
      requestAnimationFrame(() => overlay.classList.add("is-open"));

      const first = overlay.querySelector(focusableSelector);
      if (first) first.focus();
    }

    function toggleOverlay() {
      if (overlay.hidden) {
        openOverlay();
      } else {
        closeOverlay();
      }
    }

    function closeOverlay() {
      overlay.classList.remove("is-open");
      document.body.classList.remove("modal-open");
      setExpanded(false);

      // Wait for the CSS transition to finish before hiding (so it animates smoothly).
      closeTimer = window.setTimeout(() => {
        overlay.hidden = true;
        if (lastActive && typeof lastActive.focus === "function") {
          lastActive.focus();
        }
      }, 190);
    }

    function onOverlayClick(event) {
      // Close the overlay when navigating via any link inside it.
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!link) return;
      closeOverlay();
    }

    function onKeyDown(event) {
      if (overlay.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeOverlay();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = Array.from(
        overlay.querySelectorAll(focusableSelector),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    openButtons.forEach((btn) => btn.addEventListener("click", toggleOverlay));
    closeButtons.forEach((btn) => btn.addEventListener("click", closeOverlay));
    overlay.addEventListener("click", onOverlayClick);
    document.addEventListener("keydown", onKeyDown);
  }

  function initCountUps() {
    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    const roots = Array.from(document.querySelectorAll("[data-countup-root]"));
    if (roots.length === 0) return;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateCount(el) {
      const rawTarget = el.getAttribute("data-countup");
      if (!rawTarget) return;
      if (el.getAttribute("data-countup-done") === "true") return;

      const target = Number.parseInt(rawTarget, 10);
      if (!Number.isFinite(target)) return;

      const suffix = el.getAttribute("data-suffix") ?? "";
      el.setAttribute("data-countup-done", "true");

      if (reducedMotion) {
        el.textContent = `${target}${suffix}`;
        return;
      }

      const start = 0;
      const durationMs = 900;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min(1, (now - startTime) / durationMs);
        const eased = easeOutCubic(progress);
        const value = Math.round(start + (target - start) * eased);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    function revealAndCount(root) {
      root.closest(".metrics-trust")?.classList.add("is-inview");
      const els = Array.from(root.querySelectorAll("[data-countup]"));
      els.forEach(animateCount);
    }

    if (!("IntersectionObserver" in window)) {
      roots.forEach(revealAndCount);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const root = entry.target;
          observer.unobserve(root);
          revealAndCount(root);
        });
      },
      { threshold: 0.25 },
    );

    roots.forEach((root) => observer.observe(root));
  }

  function initFooter() {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;

    footer.innerHTML = `
      <div class="container footer-grid">
        <div>
          <p class="footer-title">WiMAKS Toczyłowski sp.k.</p>
          <p class="footer-note">Generalny wykonawca i projektant inwestycji budowlanych.</p>
        </div>
        <div class="footer-block" aria-label="Kontakt">
          <p class="footer-heading">Kontakt</p>
          <a href="tel:+48786149888">+48 786 149 888</a>
          <a href="mailto:biuro@wimaks.eu">biuro@wimaks.eu</a>
          <p>Poniedziałek-Piątek 8:00-16:00</p>
        </div>
        <div class="footer-block" aria-label="Adres">
          <p class="footer-heading">Adres</p>
          <p>ul. Wawerska 48C</p>
          <p>05-420 Józefów</p>
          <a href="${route("kontakt/")}">Mapa i dane</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>© 2026 WiMaks.</p>
      </div>
    `;
  }

  function initOfferTabs() {
    const root = document.querySelector("[data-offer-tabs]");
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll("[data-offer-tab]")).filter(
      (el) => el instanceof HTMLAnchorElement,
    );
    const panels = Array.from(
      document.querySelectorAll("[data-offer-panel]"),
    ).filter((el) => el instanceof HTMLElement);
    const blurb = document.querySelector("[data-offer-blurb]");

    if (tabs.length === 0 || panels.length === 0) return;

    const panelById = new Map(panels.map((p) => [p.id, p]));
    const copyById = {
      publiczne:
        "W obszarze inwestycji publicznych realizujemy m.in. obiekty edukacyjne oraz zadania towarzyszące. Zapewniamy sprawne prowadzenie budowy, kontrolę jakości i terminową realizację przy jasnej komunikacji z inwestorem.",
      przemysl:
        "Realizujemy projekty przemysłowe i infrastrukturalne, gdzie kluczowe są harmonogram, logistyka i bezpieczeństwo. Prowadzimy prace przewidywalnie, z naciskiem na jakość wykonania i sprawną komunikację.",
      mieszkaniowe:
        "Realizujemy inwestycje mieszkaniowe — budynki wielorodzinne i osiedla. Dbamy o standard, detale i dobrą organizację robót, aby przekazanie obiektu przebiegło sprawnie i bez niespodzianek.",
    };

    function setActive(id) {
      panels.forEach((p) => p.toggleAttribute("hidden", p.id !== id));
      tabs.forEach((t) =>
        t.classList.toggle("is-active", t.getAttribute("href") === `#${id}`),
      );
      if (blurb instanceof HTMLElement && id && id in copyById) {
        blurb.textContent = copyById[id];
      }
    }

    function readHash() {
      const id = (window.location.hash || "").replace("#", "");
      const next = id && panelById.has(id) ? id : "publiczne";
      setActive(next);
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        const href = tab.getAttribute("href") ?? "";
        const id = href.startsWith("#") ? href.slice(1) : "";
        if (!id || !panelById.has(id)) return;
        history.replaceState(null, "", `#${id}`);
        readHash();
      });
    });

    window.addEventListener("hashchange", readHash);
    readHash();
  }

  function initJobAccordions() {
    const cards = Array.from(document.querySelectorAll(".job-card"));
    if (cards.length === 0) return;

    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    cards.forEach((card) => {
      if (!(card instanceof HTMLElement)) return;
      const toggle = card.querySelector(".job-toggle");
      if (!(toggle instanceof HTMLButtonElement)) return;

      const detailsId = toggle.getAttribute("aria-controls") ?? "";
      const details = detailsId ? document.getElementById(detailsId) : null;
      if (!(details instanceof HTMLElement)) return;

      let isAnimating = false;

      function setExpanded(isExpanded, { animate = true } = {}) {
        if (isAnimating) return;
        toggle.setAttribute("aria-expanded", String(isExpanded));
        card.classList.toggle("is-expanded", isExpanded);
        const nextLabel = isExpanded ? "Ukryj szczegóły" : "Pokaż szczegóły";
        const label = toggle.querySelector(".sr-only");
        if (label) label.textContent = nextLabel;
        const visible = toggle.querySelector(".job-toggle-text");
        if (visible) visible.textContent = nextLabel;

        if (!animate || reducedMotion) {
          details.hidden = !isExpanded;
          details.style.height = "";
          details.style.overflow = "";
          details.style.opacity = "";
          return;
        }

        isAnimating = true;
        details.hidden = false;
        details.style.overflow = "hidden";

        const startHeight = details.getBoundingClientRect().height;
        const endHeight = isExpanded ? details.scrollHeight : 0;
        const startOpacity = isExpanded ? 0 : 1;
        const endOpacity = isExpanded ? 1 : 0;

        details.style.height = `${startHeight}px`;
        details.style.opacity = String(startOpacity);

        requestAnimationFrame(() => {
          details.style.transition = "height 260ms ease, opacity 220ms ease";
          details.style.height = `${endHeight}px`;
          details.style.opacity = String(endOpacity);

          window.setTimeout(() => {
            details.style.transition = "";
            details.style.height = "";
            details.style.overflow = "";
            details.style.opacity = "";
            details.hidden = !isExpanded;
            isAnimating = false;
          }, 280);
        });
      }

      setExpanded(false, { animate: false });

      toggle.addEventListener("click", () => {
        const next = toggle.getAttribute("aria-expanded") !== "true";
        setExpanded(next);
      });
    });
  }

  function initCarousels() {
    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    const carousels = Array.from(document.querySelectorAll("[data-carousel]"));
    if (carousels.length === 0) return;

    carousels.forEach((carousel) => {
      const viewport = carousel.querySelector(".carousel-viewport");
      if (!(viewport instanceof HTMLElement)) return;

      const track = carousel.querySelector(".carousel-track");
      if (!(track instanceof HTMLElement)) return;

      const slides = Array.from(track.querySelectorAll(".carousel-slide"));
      if (slides.length <= 1) return;

      const prevBtn = carousel.querySelector("[data-carousel-prev]");
      const nextBtn = carousel.querySelector("[data-carousel-next]");
      const dotsRoot = carousel.querySelector("[data-carousel-dots]");

      let index = 0;

      function render() {
        if (dotsRoot) {
          const dots = Array.from(dotsRoot.querySelectorAll(".carousel-dot"));
          dots.forEach((dot, i) => {
            dot.setAttribute("aria-selected", String(i === index));
            dot.tabIndex = i === index ? 0 : -1;
          });
        }
      }

      function scrollToIndex(nextIndex) {
        const clamped = (nextIndex + slides.length) % slides.length;
        const left = Math.round(viewport.clientWidth * clamped);
        viewport.scrollTo({
          left,
          behavior: reducedMotion ? "auto" : "smooth",
        });
      }

      function goTo(nextIndex) {
        index = (nextIndex + slides.length) % slides.length;
        scrollToIndex(index);
        render();
      }

      function makeDots() {
        if (!(dotsRoot instanceof HTMLElement)) return;
        dotsRoot.innerHTML = "";
        slides.forEach((_, i) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "carousel-dot";
          btn.setAttribute("role", "tab");
          btn.setAttribute("aria-label", `Slajd ${i + 1}`);
          btn.addEventListener("click", () => goTo(i));
          dotsRoot.appendChild(btn);
        });
      }

      makeDots();
      render();

      prevBtn?.addEventListener("click", () => goTo(index - 1));
      nextBtn?.addEventListener("click", () => goTo(index + 1));

      viewport.addEventListener(
        "scroll",
        () => {
          const nextIndex = Math.round(
            viewport.scrollLeft / Math.max(1, viewport.clientWidth),
          );
          if (nextIndex === index) return;
          index = Math.min(slides.length - 1, Math.max(0, nextIndex));
          render();
        },
        { passive: true },
      );

      carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(index - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(index + 1);
        }
      });

      if (!reducedMotion) {
        // Swipe / drag
        let startX = 0;
        let active = false;

        function onPointerDown(e) {
          if (!(e instanceof PointerEvent)) return;
          active = true;
          startX = e.clientX;
          (e.currentTarget instanceof HTMLElement
            ? e.currentTarget
            : viewport
          ).setPointerCapture(e.pointerId);
        }

        function onPointerUp(e) {
          if (!(e instanceof PointerEvent)) return;
          if (!active) return;
          active = false;
          const dx = e.clientX - startX;
          if (Math.abs(dx) < 40) return;
          if (dx > 0) goTo(index - 1);
          else goTo(index + 1);
        }

        viewport.addEventListener("pointerdown", onPointerDown);
        viewport.addEventListener("pointerup", onPointerUp);
        viewport.addEventListener("pointercancel", () => {
          active = false;
        });
      }
    });
  }

  function initGalleries() {
    const galleries = Array.from(document.querySelectorAll("[data-gallery]"));
    if (galleries.length === 0) return;

    galleries.forEach((gallery) => {
      const mainImg = gallery.querySelector("[data-gallery-main]");
      if (!(mainImg instanceof HTMLImageElement)) return;

      const buttons = Array.from(
        gallery.querySelectorAll("[data-gallery-src]"),
      );
      if (buttons.length === 0) return;

      function setActive(btn) {
        buttons.forEach((b) => {
          if (!(b instanceof HTMLElement)) return;
          b.setAttribute("aria-current", String(b === btn));
        });
      }

      buttons.forEach((btn) => {
        if (!(btn instanceof HTMLElement)) return;
        btn.addEventListener("click", () => {
          const src = btn.getAttribute("data-gallery-src");
          if (!src) return;
          const alt = btn.getAttribute("data-gallery-alt") || mainImg.alt;
          mainImg.src = src;
          mainImg.alt = alt;
          setActive(btn);
        });
      });

      // Default active: first thumb.
      setActive(buttons[0] instanceof HTMLElement ? buttons[0] : null);
    });
  }

  function init() {
    initNavOverlay();
    initCountUps();
    initFooter();
    initOfferTabs();
    initCarousels();
    initGalleries();
    initJobAccordions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
