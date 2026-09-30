/* ===================================
   site.js — Trail de l'Estran
   Vanilla JS, zéro jQuery
   =================================== */

(function () {
  "use strict";

  /* --- URL propre : retire ".html" (et "index") de la barre d'adresse --- */
  if (/^https?:$/.test(location.protocol) && /\.html$/.test(location.pathname)) {
    var clean = location.pathname.replace(/index\.html$/, "").replace(/\.html$/, "");
    history.replaceState(null, "", clean + location.search + location.hash);
  }

  /* --- Preload animation --- */
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.body.classList.remove("is-preload");
    }, 100);
  });

  /* --- Smooth scroll pour .scrolly --- */
  document.addEventListener("click", function (e) {
    const link = e.target.closest(".scrolly");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.charAt(0) !== "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });

  /* --- Nav : fond scrolled quand on quitte le header/hero --- */
  document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("nav");
    if (!nav) return;

    /* Trouver le hero de la page (header sur index, epreuves-hero sur épreuves, etc.) */
    const hero =
      document.getElementById("header") ||
      document.querySelector(".epreuves-hero") ||
      document.querySelector(".page-hero");

    if (!hero) {
      /* Pas de hero → toujours scrolled */
      nav.classList.add("scrolled");
      return;
    }

    const obs = new IntersectionObserver(
      function (entries) {
        nav.classList.toggle("scrolled", !entries[0].isIntersecting);
      },
      { threshold: 0.2 },
    );
    obs.observe(hero);

    /* Scrollspy (seulement pour les liens internes #) */
    var navLinks = Array.from(document.querySelectorAll('#nav a[href^="#"]'));
    var sections = navLinks
      .map(function (a) {
        return document.querySelector(a.getAttribute("href"));
      })
      .filter(Boolean);

    function setActive(id) {
      document.querySelectorAll("#nav li").forEach(function (li) {
        li.classList.remove("active", "current");
      });
      var link = document.querySelector('#nav a[href="#' + id + '"]');
      if (link && link.parentElement)
        link.parentElement.classList.add("active");
    }

    if (sections.length) {
      var spy = new IntersectionObserver(
        function (entries) {
          var visible = entries
            .filter(function (e) {
              return e.isIntersecting;
            })
            .sort(function (a, b) {
              return b.intersectionRatio - a.intersectionRatio;
            })[0];
          if (visible) setActive(visible.target.id);
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.25, 0.5, 0.75] },
      );
      sections.forEach(function (sec) {
        spy.observe(sec);
      });
    }
  });

  /* --- Countdown (index only) --- */
  document.addEventListener("DOMContentLoaded", function () {
    var dEl = document.getElementById("cd-days");
    if (!dEl) return;

    var hEl = document.getElementById("cd-hours");
    var mEl = document.getElementById("cd-mins");
    var sEl = document.getElementById("cd-secs");
    var noteEl = document.getElementById("countdown-note");

    /* Date cible lue sur #countdown[data-target] ; si absente, date inconnue ("??" laissés dans le HTML) */
    var cdEl = document.getElementById("countdown");
    var targetAttr = cdEl && cdEl.dataset.target;
    if (!targetAttr) return;
    var target = new Date(targetAttr).getTime();
    if (isNaN(target)) return;

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        dEl.textContent = "0";
        hEl.textContent = "00";
        mEl.textContent = "00";
        sEl.textContent = "00";
        if (noteEl) noteEl.textContent = "C'est parti ! 🎉";
        return;
      }
      var d = Math.floor(diff / 86400000);
      diff -= d * 86400000;
      var h = Math.floor(diff / 3600000);
      diff -= h * 3600000;
      var m = Math.floor(diff / 60000);
      diff -= m * 60000;
      var s = Math.floor(diff / 1000);

      dEl.textContent = String(d);
      hEl.textContent = pad(h);
      mEl.textContent = pad(m);
      sEl.textContent = pad(s);
    }

    tick();
    setInterval(tick, 1000);
  });

  /* --- Partners highlight (index only) --- */
  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.getElementById("partners-grid");
    if (!grid) return;
    var items = Array.from(grid.querySelectorAll(".partner"));
    if (!items.length) return;
    var cur = -1;

    function highlight() {
      items.forEach(function (el) {
        el.classList.remove("is-highlight");
      });
      var next;
      do {
        next = Math.floor(Math.random() * items.length);
      } while (next === cur && items.length > 1);
      items[next].classList.add("is-highlight");
      cur = next;
    }

    highlight();
    setInterval(highlight, 2000);
  });
})();
