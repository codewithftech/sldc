/**
 * SLDC site behaviors — single entry replacing legacy Drupal/jQuery script stack.
 * Requires: Swiper (swiper-bundle.min.js) loaded before this file.
 * Cookie manager: Investis CDN plugin (loaded from SiteScripts.tsx).
 */
(function (window, document) {
  "use strict";

  var DESKTOP_BP = 1200;
  var TABLET_BP = 768;
  var MOBILE_MENU_BP = 991;

  function showBackdrop(backdrop) {
    if (backdrop) backdrop.classList.add("visible");
  }
  function hideBackdrop(backdrop) {
    if (backdrop) backdrop.classList.remove("visible");
  }

  /* ---------- utilities ---------- */
  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }
  function on(el, ev, fn) {
    if (el) el.addEventListener(ev, fn);
  }
  function getParam(name, def) {
    var params = new URLSearchParams(window.location.search);
    return params.has(name) ? params.get(name) : def;
  }

  /* ---------- lazy images (.lazy with data-src) ---------- */
  function initLazyLoad() {
    var lazy = $$("img.lazy[data-src]");
    if (!lazy.length) return;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var img = entry.target;
          img.src = img.getAttribute("data-src") || "";
          img.classList.remove("lazy");
          img.classList.add("loaded");
          io.unobserve(img);
        });
      });
      lazy.forEach(function (img) {
        io.observe(img);
      });
    } else {
      lazy.forEach(function (img) {
        img.src = img.getAttribute("data-src") || "";
      });
    }
  }

  /* ---------- scroll animations [data-animate] ---------- */
  function initScrollAnimations() {
    var els = $$("[data-animate]");
    if (!els.length) return;
    function tick() {
      els.forEach(function (el) {
        if (el.classList.contains("animate")) return;
        var rect = el.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top >= 0 && rect.top <= vh) {
          el.classList.add("animate");
          var type = el.getAttribute("data-animation");
          if (type) el.classList.add("animate--" + type);
        }
      });
    }
    tick();
    window.addEventListener("scroll", tick, { passive: true });
  }

  /* ---------- back to top #auto-top-link ---------- */
  function initBackToTop() {
    var link = document.getElementById("auto-top-link");
    if (!link) return;
    on(link, "click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    function show() {
      link.style.display = window.scrollY >= 1 ? "" : "none";
    }
    show();
    window.addEventListener("scroll", show, { passive: true });
  }

  /* ---------- sticky header ---------- */
  function initStickyHeader() {
    var header = $(".js-header");
    if (!header) return;
    var last = 0;
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        header.classList.toggle("header--scrolled", y > 10);
        header.classList.toggle("header--hidden", y > last && y > 100);
        last = y;
      },
      { passive: true }
    );
  }

  /* ---------- header: drawer + search bar (matches legacy header.js) ---------- */
  function initHeader() {
    var header = $(".js-header");
    var headerContent = $(".js-header-content");
    var navigation = $(".js-navigation");
    var headerLinkItems = $(".js-header-link-items");
    var drawer = $(".js-drawer");
    var drawerMain = $(".js-drawer-main-content");
    var drawerFooter = $(".js-drawer-footer");
    var backdrop = $(".js-backdrop");
    var bar = $(".js-header-bottom-bar");
    var openBtn = $(".js-drawer-open-button");
    var closeBtn = $(".js-drawer-close-button");
    var backBtn = $(".js-drawer-back-button");
    var barCloseBtn = $(".js-header-bottom-bar-close-button");
    var barOpens = $$(".js-header-bottom-bar-open-button");
    if (!header || !drawer) return;

    var drawerScrollY = 0;
    var activeBarButton = null;

    function isMobileHeader() {
      return window.innerWidth < DESKTOP_BP;
    }

    function moveHeaderElementsToDrawer() {
      if (!navigation || !headerLinkItems || !headerContent || !drawerMain || !drawerFooter) return;
      if (isMobileHeader()) {
        if (navigation.parentElement !== drawerMain) drawerMain.appendChild(navigation);
        if (headerLinkItems.parentElement !== drawerFooter) drawerFooter.appendChild(headerLinkItems);
      } else {
        closeDrawer(true);
        closeBar(true);
        if (navigation.parentElement !== headerContent) headerContent.appendChild(navigation);
        if (headerLinkItems.parentElement !== headerContent) headerContent.appendChild(headerLinkItems);
      }
    }

    function closeDrawer(silent) {
      if (!drawer.classList.contains("opened")) return;
      drawer.classList.remove("opened");
      hideBackdrop(backdrop);
      document.body.style.overflow = "";
      document.body.classList.remove("no-scroll");
      if (openBtn) openBtn.setAttribute("aria-expanded", "false");
      if (backBtn) backBtn.classList.remove("active", "visible");
      if (drawerScrollY > 0) {
        window.scrollTo(0, drawerScrollY);
        drawerScrollY = 0;
      }
    }

    function openDrawer(e) {
      if (e) e.stopPropagation();
      closeBar(true);
      drawerScrollY = window.pageYOffset;
      drawer.classList.add("opened");
      showBackdrop(backdrop);
      document.body.style.overflow = "hidden";
      if (openBtn) openBtn.setAttribute("aria-expanded", "true");
    }

    function closeBar(silent) {
      if (!bar || !bar.classList.contains("opened")) return;
      bar.classList.remove("opened");
      bar.removeAttribute("data-active-bar");
      hideBackdrop(backdrop);
      document.body.style.overflow = "";
      document.body.classList.remove("no-scroll");
      barOpens.forEach(function (btn) {
        btn.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      });
      if (activeBarButton && !silent) {
        activeBarButton.focus();
      }
      activeBarButton = null;
    }

    function openBar(name, trigger) {
      closeDrawer(true);
      if (!bar) return;
      bar.classList.add("opened");
      bar.setAttribute("data-active-bar", name);
      $$("[data-bar]", bar).forEach(function (sec) {
        var show = sec.getAttribute("data-bar") === name;
        if (sec.classList.contains("socials--default") || sec.classList.contains("socials--v1")) {
          sec.style.display = show ? "block" : "none";
        } else {
          sec.style.display = show ? "flex" : "none";
        }
      });
      showBackdrop(backdrop);
      if (window.innerWidth >= DESKTOP_BP) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.style.overflow = "hidden";
      }
      barOpens.forEach(function (btn) {
        var on = btn.getAttribute("data-bar-button") === name;
        btn.classList.toggle("active", on);
        btn.setAttribute("aria-expanded", on ? "true" : "false");
      });
      activeBarButton = trigger || null;
      if (name === "search") {
        var searchInput = bar.querySelector("input[type='search'], input[name='q']");
        if (searchInput) {
          setTimeout(function () {
            searchInput.focus();
          }, 200);
        }
      }
    }

    if (openBtn) {
      on(openBtn, "click", function (e) {
        e.preventDefault();
        if (drawer.classList.contains("opened")) closeDrawer();
        else openDrawer(e);
      });
    }
    if (closeBtn) on(closeBtn, "click", closeDrawer);
    if (backBtn) on(backBtn, "click", closeDrawer);

    barOpens.forEach(function (btn) {
      btn.setAttribute("aria-expanded", "false");
      on(btn, "click", function (e) {
        e.preventDefault();
        var name = btn.getAttribute("data-bar-button");
        if (!name || !bar) return;
        if (btn.classList.contains("active")) {
          closeBar();
          return;
        }
        openBar(name, btn);
      });
    });

    if (barCloseBtn) {
      on(barCloseBtn, "click", function () {
        closeBar();
      });
    }

    if (backdrop) {
      on(backdrop, "click", function () {
        if (drawer.classList.contains("opened")) closeDrawer();
        else if (bar && bar.classList.contains("opened")) closeBar();
      });
    }

    document.addEventListener("click", function (e) {
      if (!drawer.classList.contains("opened")) return;
      if (drawer.contains(e.target) || (openBtn && openBtn.contains(e.target))) return;
      closeDrawer();
    });

    $$(".search-form").forEach(function (form) {
      on(form, "submit", function (e) {
        var input = form.querySelector("input[type='search'], input[name='q']");
        var err = form.querySelector(".js-error-message");
        if (!input || !input.value.trim()) {
          e.preventDefault();
          if (err) err.style.display = "block";
          return;
        }
        e.preventDefault();
        if (err) err.style.display = "none";
        window.location.href =
          "/search-result?q=" + encodeURIComponent(input.value.trim());
      });
    });

    moveHeaderElementsToDrawer();
    window.addEventListener("resize", function () {
      var inputFocused = header.querySelector("input") === document.activeElement;
      if (!inputFocused) moveHeaderElementsToDrawer();
    });
  }

  /* ---------- we-mega-menu mobile (footer + header toggles) ---------- */
  function initWeMobileMenu() {
    var accordionItems = [];

    function isMobileMenu() {
      return window.innerWidth <= MOBILE_MENU_BP;
    }

    function clearMobileMenu() {
      document.body.classList.remove("toggled");
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";
      $$(".region-we-mega-menu nav.navbar-we-mega-menu").forEach(function (nav) {
        nav.classList.remove("we-mobile-megamenu-active");
      });
      $$(".navbar-we-mega-menu").forEach(function (nav) {
        nav.classList.remove("mobile-main-menu");
      });
      var overlay = document.querySelector("body > .overlay");
      if (overlay) overlay.remove();
      var btnClose = document.querySelector("body > .btn-close");
      if (btnClose) btnClose.remove();
      accordionItems.forEach(function (item) {
        item.classList.remove("open");
        var sub = item.querySelector(":scope > .we-mega-menu-submenu");
        if (sub) sub.style.display = "";
      });
      accordionItems = [];
    }

    function bindAccordion(toggle) {
      var region = toggle.closest(".region-we-mega-menu");
      if (!region) return;
      var targetNav = region.querySelector("nav.navbar-we-mega-menu");
      if (!targetNav) return;
      var menu = targetNav.querySelector("ul.we-mega-menu-ul");
      if (!menu) return;
      accordionItems = $$('> li[data-submenu="1"]', menu);
      if (isMobileMenu()) {
        var active = menu.querySelector('> li[data-submenu="1"].active');
        if (active) {
          active.classList.add("open");
          var activeSub = active.querySelector(":scope > ul, :scope > .we-mega-menu-submenu");
          if (activeSub) activeSub.style.display = "block";
        }
      }
      accordionItems.forEach(function (item) {
        on(item, "click", function (e) {
          if (!isMobileMenu()) return;
          if (item.classList.contains("open")) return;
          e.preventDefault();
          e.stopPropagation();
          accordionItems.forEach(function (other) {
            if (other === item) return;
            other.classList.remove("open");
            var subInner = other.querySelector(":scope > .we-mega-menu-submenu");
            if (subInner) subInner.style.display = "none";
          });
          item.classList.add("open");
          var subMenu = item.querySelector(":scope > .we-mega-menu-submenu");
          if (subMenu) subMenu.style.display = "block";
          setTimeout(function () {
            targetNav.scrollTop = item.offsetTop;
          }, 100);
        });
      });
    }

    function openMobileMenu(toggle) {
      var region = toggle.closest(".region-we-mega-menu");
      if (!region) return;
      var targetNav = region.querySelector("nav.navbar-we-mega-menu");
      if (!targetNav) return;

      document.body.classList.add("toggled");
      document.body.style.position = "relative";
      targetNav.classList.add("we-mobile-megamenu-active");
      $$(".navbar-we-mega-menu").forEach(function (nav) {
        nav.classList.add("mobile-main-menu");
      });

      if (!document.querySelector("body > .overlay")) {
        var overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.insertBefore(overlay, document.body.firstChild);
        on(overlay, "click", clearMobileMenu);
      }
      if (!document.querySelector("body > .btn-close")) {
        var btnClose = document.createElement("span");
        btnClose.className = "btn-close";
        document.body.insertBefore(btnClose, document.body.firstChild);
        on(btnClose, "click", function (ev) {
          ev.preventDefault();
          clearMobileMenu();
        });
      }
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      bindAccordion(toggle);
    }

    on(document, "click", function (e) {
      var toggle = e.target.closest(".region-we-mega-menu .navbar-toggle");
      if (!toggle) return;
      e.preventDefault();
      e.stopPropagation();
      if (!isMobileMenu()) return;
      if (!document.body.classList.contains("toggled")) openMobileMenu(toggle);
      else clearMobileMenu();
    });

    window.addEventListener("resize", function () {
      if (!isMobileMenu()) clearMobileMenu();
      else {
        $$(".navbar-we-mega-menu").forEach(function (nav) {
          nav.classList.add("mobile-main-menu");
        });
      }
    });

    if (isMobileMenu()) {
      $$(".navbar-we-mega-menu").forEach(function (nav) {
        nav.classList.add("mobile-main-menu");
      });
    }
  }

  /* ---------- tabs (.tab-list .tab) ---------- */
  function initTabs() {
    $$(".tabs").forEach(function (root) {
      var tabList = root.querySelector(".tab-list");
      if (!tabList) return;
      var tabs = $$(".tab.link, a.tab", tabList);
      function activate(tab) {
        var controls = tab.getAttribute("aria-controls");
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.tabIndex = on ? 0 : -1;
        });
        $$(".tab-panel", root).forEach(function (panel) {
          var show = controls && panel.id === controls;
          if (show) {
            panel.removeAttribute("hidden");
            panel.style.display = "";
          } else {
            panel.setAttribute("hidden", "true");
            panel.style.display = "none";
          }
        });
      }
      tabs.forEach(function (tab) {
        on(tab, "click", function (e) {
          e.preventDefault();
          activate(tab);
          var href = tab.getAttribute("href");
          if (href && href.indexOf("?tab=") === 0) {
            var url = new URL(window.location.href);
            url.searchParams.set("tab", href.replace("?tab=", ""));
            window.history.replaceState(null, "", url.toString());
          }
        });
      });
      var urlTab = getParam("tab");
      if (urlTab) {
        var target = tabList.querySelector("#" + urlTab + ', [href="?tab=' + urlTab + '"]');
        if (target) activate(target);
      }
    });

    /* scrollable tab lists (>3 tabs, replaces slick tabsIntoSlider) */
    $$(".tab-list").forEach(function (tabList) {
      if ($$(".tab.link", tabList).length <= 3) return;
      tabList.style.overflowX = "auto";
      tabList.style.flexWrap = "nowrap";
    });
  }

  /* ---------- global DOM tweaks (globalJS) ---------- */
  function initGlobalDomTweaks() {
    $$('[description="cookieSettingLink"] a').forEach(function (a) {
      a.id = "cc-CookieSetting";
      a.setAttribute("href", "javascript:void(0);");
      a.removeAttribute("title");
      on(a, "click", function (e) {
        e.preventDefault();
        if (window.CookieConsent && typeof window.CookieConsent.showSettings === "function") {
          window.CookieConsent.showSettings();
        } else if (window.CookieConsent && typeof window.CookieConsent.setConfiguration === "function") {
          /* Investis plugin fallback */
          var w = document.getElementById("__cookieWrapper");
          if (w) w.style.display = "block";
        }
      });
    });
    $$(".tab-list div.more-tabs").forEach(function (el) {
      el.remove();
    });
    $$(".tab-panel, .tabs__content").forEach(function (el) {
      el.setAttribute("tabindex", "-1");
    });
    var wrapper = $(".inpage-nav-main--wrapper");
    var inPage = $(".in-page-nav");
    if (wrapper && inPage) wrapper.appendChild(inPage);
  }

  function jsForLargeScreen() {
    var social = document.getElementById("block-investis-project-socialmedialinks");
    var contact = document.getElementById("block-investis-project-contact");
    if (social && contact) contact.appendChild(social);
  }

  /* ---------- Swiper: signpost grids ---------- */
  function initSignpostSwipers() {
    if (typeof window.Swiper !== "function") return;
    $$("[data-signpost-swiper]").forEach(function (el) {
      var slides = $$(".swiper-slide", el);
      if (!slides.length) return;
      var prev = el.querySelector("[data-arrow-button]:first-of-type");
      var next = el.querySelector("[data-arrow-button]:last-of-type");
      var pag = el.querySelector("[data-carousel-pagination]");
      var spv = parseInt(el.getAttribute("data-slides-per-view") || "3", 10);
      var tablet = parseInt(el.getAttribute("data-tablet-slides-per-view") || String(spv), 10);
      var mobile = parseFloat(el.getAttribute("data-mobile-slides-per-view") || "1.36");
      new window.Swiper(el, {
        autoHeight: true,
        slidesPerView: spv,
        spaceBetween: 16,
        navigation: { prevEl: prev, nextEl: next },
        pagination: pag ? { el: pag, clickable: true } : undefined,
        breakpoints: {
          0: { slidesPerView: mobile, spaceBetween: 16 },
          768: { slidesPerView: tablet, spaceBetween: 16 },
          1200: { slidesPerView: spv, spaceBetween: slides.length < 2 ? 0 : 32 },
        },
      });
    });
  }

  /* ---------- Swiper: signpost carousels ---------- */
  function initSignpostCarousels() {
    if (typeof window.Swiper !== "function") return;
    $$("[data-signpost-carousel-wrapper]").forEach(function (wrap) {
      var el = wrap.querySelector("[data-signpost-carousel]");
      if (!el) return;
      var prev = wrap.querySelector("[data-arrow-button]:first-of-type");
      var next = wrap.querySelector("[data-arrow-button]:last-of-type");
      new window.Swiper(el, {
        slidesPerView: 1.355,
        spaceBetween: 16,
        navigation: { prevEl: prev, nextEl: next },
        keyboard: { enabled: true },
        breakpoints: {
          360: { slidesPerView: 1.355, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 16 },
          992: { slidesPerView: "auto", spaceBetween: 32 },
        },
      });
    });
  }

  /* ---------- counter [data-counter] ---------- */
  function initCounters() {
    if ($(".layout-builder")) return;
    var els = $$("[data-counter]:not(.counted)");
    if (!els.length) return;
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio <= 0) return;
          var el = entry.target;
          var end = parseInt(el.textContent || "0", 10);
          var start = 0;
          var dur = 2000;
          var t0 = null;
          function step(ts) {
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / dur, 1);
            el.textContent = String(Math.floor(p * (end - start) + start));
            if (p < 1) requestAnimationFrame(step);
            else el.classList.add("counted");
          }
          requestAnimationFrame(step);
          obs.unobserve(el);
        });
      },
      { threshold: 0.25 }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- leadership profiles [data-bod] ---------- */
  function initLeadershipProfiles() {
    $$("[data-bod]").forEach(function (bod) {
      var cards = $$("[data-profile-card]:not([data-bs-toggle])", bod);
      var checkPopup = bod.classList.contains("bod--popup");

      function closeAll() {
        cards.forEach(function (card) {
          if (!card.classList.contains("profile-card--visible")) return;
          card.classList.remove("profile-card--visible");
          var detail = card.nextElementSibling;
          if (detail) {
            detail.classList.remove("profile-detail--visible");
            if (!checkPopup) {
              $$("button, a", detail).forEach(function (b) {
                b.setAttribute("tabindex", "-1");
              });
            }
          }
          updateCta(card);
        });
      }
      function updateCta(card) {
        var label = card.querySelector(".cta__label");
        if (!label) return;
        var icon = card.querySelector(".cta__icon");
        var active = card.classList.contains("profile-card--visible");
        if (!label.dataset.textContent) label.dataset.textContent = "Learn more";
        label.textContent = active ? "Close" : label.dataset.textContent;
        if (icon) {
          icon.classList.toggle("icon-close", active);
          icon.classList.toggle("icon-chevron-right", !active);
        }
      }
      function toggle(card) {
        if (checkPopup) return;
        var active = card.classList.contains("profile-card--visible");
        closeAll();
        if (!active) {
          card.classList.add("profile-card--visible");
          var detail = card.nextElementSibling;
          if (detail) {
            detail.classList.add("profile-detail--visible");
            $$("button, a", detail).forEach(function (b) {
              b.setAttribute("tabindex", "0");
            });
          }
        }
        updateCta(card);
      }
      cards.forEach(function (card) {
        on(card, "click", function (e) {
          if (!e.target.closest(".profile-card__content")) toggle(card);
        });
        var inp = card.querySelector(".profile-card__input");
        if (inp) on(inp, "focus", function () {
          toggle(card);
        });
      });
      $$("[data-profile-details]", bod).forEach(function (d) {
        if (!checkPopup) $$("button, a", d).forEach(function (b) {
          b.setAttribute("tabindex", "-1");
        });
        var btn = d.querySelector("[data-action-button]");
        if (btn) on(btn, "click", closeAll);
      });
      on(bod, "keydown", function (e) {
        if (e.key === "Escape") closeAll();
      });
    });
    initBodPopup();
  }

  function initBodPopup() {
    $$(".bod--popup").forEach(function (wrap) {
      function openModal(modal) {
        modal.style.display = "block";
        modal.classList.add("custom-modal-open");
        document.body.classList.add("modal-open");
        document.body.style.overflow = "hidden";
      }
      function closeModal(modal) {
        modal.style.display = "none";
        modal.classList.remove("custom-modal-open");
        if (!$(".modal.custom-modal-open")) {
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
        }
      }
      $$(".profiles__wrapper .profile-card", wrap).forEach(function (card) {
        on(card, "click", function () {
          var id = card.getAttribute("data-bs-target");
          if (!id) return;
          var modal = wrap.querySelector(id);
          if (modal) openModal(modal);
        });
      });
      $$(".modal .icon-chevron-right", wrap).forEach(function (btn) {
        on(btn, "click", function () {
          var cur = btn.closest(".modal");
          var all = $$(".modal", wrap);
          var i = all.indexOf(cur);
          closeModal(cur);
          openModal(all[(i + 1) % all.length]);
        });
      });
      $$(".modal .icon-chevron-left", wrap).forEach(function (btn) {
        on(btn, "click", function () {
          var cur = btn.closest(".modal");
          var all = $$(".modal", wrap);
          var i = all.indexOf(cur);
          closeModal(cur);
          openModal(all[(i - 1 + all.length) % all.length]);
        });
      });
      $$(".modal .icon-close, .modal .action-button", wrap).forEach(function (btn) {
        on(btn, "click", function () {
          var m = btn.closest(".modal");
          if (m) closeModal(m);
        });
      });
    });
  }

  /* ---------- video popup (replaces magnific for youtube/vimeo/html5) ---------- */
  function initVideoPopups() {
    function openIframe(url) {
      var overlay = document.getElementById("sldc-video-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "sldc-video-overlay";
        overlay.className = "mfp-wrap mfp-fade mfp-ready";
        overlay.style.cssText =
          "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;";
        overlay.innerHTML =
          '<div class="mfp-container" style="position:relative;width:90%;max-width:900px">' +
          '<button type="button" class="mfp-close" aria-label="Close" style="position:absolute;right:-8px;top:-40px;color:#fff;font-size:32px;background:none;border:0;cursor:pointer">&times;</button>' +
          '<div class="mfp-content" id="sldc-video-content"></div></div>';
        document.body.appendChild(overlay);
        on(overlay.querySelector(".mfp-close"), "click", closeVideo);
        on(overlay, "click", function (e) {
          if (e.target === overlay) closeVideo();
        });
      }
      var content = document.getElementById("sldc-video-content");
      if (url.indexOf("<") === 0) content.innerHTML = url;
      else
        content.innerHTML =
          '<iframe src="' + url + '" style="width:100%;aspect-ratio:16/9;border:0" allowfullscreen></iframe>';
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
    function closeVideo() {
      var overlay = document.getElementById("sldc-video-overlay");
      if (!overlay) return;
      overlay.style.display = "none";
      var c = document.getElementById("sldc-video-content");
      if (c) c.innerHTML = "";
      document.body.style.overflow = "";
    }
    $$(".button--youtube, .button--vimeo").forEach(function (btn) {
      on(btn, "click", function (e) {
        e.preventDefault();
        var href = btn.getAttribute("href");
        if (href) openIframe(href);
      });
    });
    $$(".button--brightcove, .button--html5").forEach(function (btn) {
      on(btn, "click", function (e) {
        e.preventDefault();
        var src = btn.getAttribute("data-video-src");
        if (!src) {
          var bg = btn.closest(".simple-hero-banner__content, .carousel-banner__content");
          if (bg && bg.previousElementSibling) {
            var source = bg.previousElementSibling.querySelector("source");
            src = source && source.getAttribute("src");
          }
        }
        if (src)
          openIframe(
            '<video controls autoplay style="max-width:100%"><source src="' + src + '" type="video/mp4"></video>'
          );
      });
    });
  }

  /* ---------- background video play/pause ---------- */
  function initVideoPlayPause() {
    $$("[data-video-trigger], [data-action-button]").forEach(function (btn) {
      on(btn, "click", function () {
        var wrap = btn.closest("[data-video-wrapper]");
        if (!wrap) return;
        var type = wrap.getAttribute("data-video-type");
        var frame = wrap.querySelector("iframe");
        var video = wrap.querySelector("video");
        var status = btn.getAttribute("data-current-status");
        if (status === "pause") {
          btn.setAttribute("data-current-status", "play");
          btn.classList.remove("icon-pause");
          btn.classList.add("icon-play");
          if ((type === "youtube" || type === "vimeo") && frame) {
            var msg =
              type === "youtube"
                ? { event: "command", func: "pauseVideo", args: "" }
                : { method: "pause" };
            frame.contentWindow.postMessage(JSON.stringify(msg), "*");
          } else if ((type === "brightcove" || type === "html5") && video) video.pause();
        } else {
          btn.setAttribute("data-current-status", "pause");
          btn.classList.remove("icon-play");
          btn.classList.add("icon-pause");
          if ((type === "youtube" || type === "vimeo") && frame) {
            var msg2 =
              type === "youtube"
                ? { event: "command", func: "playVideo", args: "" }
                : { method: "play" };
            frame.contentWindow.postMessage(JSON.stringify(msg2), "*");
          } else if ((type === "brightcove" || type === "html5") && video) video.play();
        }
      });
    });
  }

  /* ---------- accordion ---------- */
  function initAccordion() {
    $$(".accordion__button").forEach(function (btn) {
      btn.setAttribute("aria-expanded", "false");
      btn.classList.add("collapsed");
      var content = btn.closest(".accordion__item");
      if (content) {
        var panel = content.querySelector(".accordion__content");
        if (panel) panel.style.display = "none";
      }
      on(btn, "click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        $$(".accordion__button").forEach(function (b) {
          b.setAttribute("aria-expanded", "false");
          b.classList.add("collapsed");
        });
        $$(".accordion__content").forEach(function (c) {
          c.style.display = "none";
        });
        if (!expanded) {
          btn.setAttribute("aria-expanded", "true");
          btn.classList.remove("collapsed");
          var p = btn.closest(".accordion__item");
          if (p) {
            var pan = p.querySelector(".accordion__content");
            if (pan) pan.style.display = "block";
          }
        }
      });
    });
  }

  /* ---------- header search autocomplete ---------- */
  function initSearchAutocomplete() {
    var inputs = $$(
      "input#solrstrap-searchbox-form, input#solrstrap-searchbox, input#mobile-search-field"
    );
    inputs.forEach(function (input) {
      var timer;
      var list;
      on(input, "input", function () {
        clearTimeout(timer);
        var term = input.value.trim();
        if (term.length < 2) {
          if (list) list.remove();
          list = null;
          return;
        }
        timer = setTimeout(function () {
          fetch("/searchautocomplete?term=" + encodeURIComponent(term))
            .then(function (r) {
              if (!r.ok) throw new Error("autocomplete failed");
              return r.json();
            })
            .then(function (data) {
              if (list) list.remove();
              if (!Array.isArray(data) || !data.length) return;
              list = document.createElement("ul");
              list.className = "solr-search-autocomplete ui-menu ui-widget ui-front";
              data.slice(0, 8).forEach(function (item) {
                var li = document.createElement("li");
                var b = document.createElement("button");
                b.type = "button";
                b.className = "ui-menu-item-wrapper";
                b.textContent = item;
                on(b, "click", function () {
                  input.value = item;
                  list.remove();
                  list = null;
                  var form = input.closest("form");
                  if (form) form.submit();
                });
                li.appendChild(b);
                list.appendChild(li);
              });
              input.parentElement.appendChild(list);
            })
            .catch(function () {});
        }, 250);
      });
    });
  }

  /* ---------- search results page (/search-result) ---------- */
  function initSearchPage() {
    if (window.location.pathname.indexOf("search-result") === -1) return;
    var q = getParam("q");
    if (!q) return;

    var box = document.getElementById("solrstrap-searchbox");
    if (box) box.value = q.replace(/\+/g, " ");

    var loader = document.getElementById("loading-indicator");
    var hitsEl = document.getElementById("solrstrap-hits");
    var tabsEl = document.getElementById("solrstrap-tabs");
    var sortEl = document.getElementById("sortlist");
    if (!hitsEl) return;

    var querytype = getParam("querytype", "Exact");
    var fq = getParam("fq");
    var sort = getParam("sort");
    var base = window.location.origin;

    function showLoader(on) {
      if (loader) loader.style.display = on ? "block" : "none";
    }

    function renderHits(docs, highlighting) {
      hitsEl.innerHTML = "";
      if (!docs || !docs.length) {
        hitsEl.innerHTML =
          '<div id="hit-template-noresult" class="text background-color-monochrome-9 font-primary-bold mt-20 mb-20 pt-20 pr-20 pb-20 pl-20">No Search result Found.</div>';
        return;
      }
      docs.forEach(function (doc, i) {
        var id = String(doc.id || i);
        var title = (highlighting && highlighting[id] && highlighting[id].title && highlighting[id].title[0]) || doc.title || doc.meta_title_sldc || "";
        var text = (highlighting && highlighting[id] && highlighting[id].text && highlighting[id].text[0]) || doc.text || "";
        var link = doc.absoluteurl || doc.url || "";
        var art = document.createElement("article");
        art.className = "search-hit mb-20 pb-20";
        art.innerHTML =
          (link ? '<h3 class="headline-sm"><a href="' + link + '">' + title + "</a></h3>" : "<h3>" + title + "</h3>") +
          (text ? '<div class="body-sm color-body mt-10">' + text + "</div>" : "");
        hitsEl.appendChild(art);
      });
    }

    function loadResults() {
      showLoader(true);
      var staticNoResult = document.getElementById("hit-template-noresult");
      if (staticNoResult) staticNoResult.style.display = "none";
      var payload = {
        Handler: "facet",
        keyword: q,
        langcode: "en",
        querytype: querytype,
      };
      if (fq) payload.fq = fq;
      if (sort) payload.sort = sort;

      fetch(base + "/solrSearch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r.text();
        })
        .then(function (text) {
          var result = JSON.parse(text);
          if (typeof result === "string") result = JSON.parse(result);
          renderHits(result.response && result.response.docs, result.highlighting);
          var sortMenu = document.getElementById("solrstrap-sortmenu");
          if (sortMenu && result.response && result.response.docs && result.response.docs.length) sortMenu.style.display = "";
        })
        .catch(function () {
          hitsEl.innerHTML = '<p class="color-body">Unable to load search results.</p>';
        })
        .finally(function () {
          showLoader(false);
        });

      if (tabsEl) {
        fetch(base + "/searchfacettag?q=" + encodeURIComponent(q))
          .then(function (r) {
            return r.json();
          })
          .then(function (data) {
            tabsEl.innerHTML = "";
            Object.keys(data || {}).forEach(function (key) {
              var label = data[key];
              var lower = key.toLowerCase();
              var active = fq ? fq.toLowerCase().indexOf(lower) > -1 : lower === "all" || lower === "tout";
              var disabled = String(label).indexOf("(0)") > -1;
              var a = document.createElement("a");
              a.className = "tab link" + (active ? " active" : "");
              a.setAttribute("role", "tab");
              a.setAttribute("aria-selected", active ? "true" : "false");
              if (disabled) {
                a.setAttribute("href", "javascript:void(0)");
                a.style.opacity = "0.5";
              } else {
                var href = base + "/search-result?q=" + encodeURIComponent(q) + "&querytype=" + encodeURIComponent(querytype) + "&start=0&page=1";
                if (lower.indexOf("documents") > -1) href += "&ftype=File";
                else if (lower !== "all" && lower !== "tout") href += "&fq=" + encodeURIComponent(key);
                a.href = href;
              }
              a.textContent = label;
              tabsEl.appendChild(a);
            });
            tabsEl.style.display = "";
          })
          .catch(function () {});
      }
    }

    if (sortEl) {
      on(sortEl, "change", function () {
        var val = sortEl.value;
        var url = new URL(window.location.href);
        if (val) url.searchParams.set("sort", val);
        else url.searchParams.delete("sort");
        window.location.href = url.toString();
      });
      if (sort) sortEl.value = sort;
    }

    var form = document.getElementById("searchresultform");
    if (form) {
      on(form, "submit", function (e) {
        e.preventDefault();
        var input = document.getElementById("solrstrap-searchbox");
        var err = document.getElementById("searchresultformError");
        if (!input || !input.value.trim()) {
          if (err) {
            err.textContent = "Please enter some keywords.";
            err.style.display = "block";
          }
          return;
        }
        if (err) err.style.display = "none";
        var url = new URL("/search-result", window.location.origin);
        url.searchParams.set("q", input.value.trim());
        var qt = form.querySelector('input[name="querytype"]:checked');
        if (qt) url.searchParams.set("querytype", qt.value);
        url.searchParams.set("start", "0");
        url.searchParams.set("page", "1");
        window.location.href = url.toString();
      });
    }

    loadResults();
  }

  /* ---------- init ---------- */
  function init() {
    document.documentElement.classList.add("js");
    document.body.classList.remove("no-js");
    document.body.classList.add("has-js");
    var year = document.getElementById("copyright-year");
    if (year) year.textContent = String(new Date().getFullYear());

    initLazyLoad();
    initScrollAnimations();
    initBackToTop();
    initStickyHeader();
    initHeader();
    initWeMobileMenu();
    initGlobalDomTweaks();
    jsForLargeScreen();
    initTabs();
    initSignpostSwipers();
    initSignpostCarousels();
    initCounters();
    initLeadershipProfiles();
    initVideoPopups();
    initVideoPlayPause();
    initAccordion();
    initSearchAutocomplete();
    initSearchPage();

    window.addEventListener("resize", jsForLargeScreen);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window, document);
