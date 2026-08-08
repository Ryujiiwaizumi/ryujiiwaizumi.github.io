/*
 * main.js — お名前 Portfolio Site
 * Dependency-free vanilla JS. Handles:
 *   1. Mobile navigation open/close
 *   2. Scroll-reveal fade-in for sections (IntersectionObserver)
 *   3. Current-section highlighting in the nav
 *   4. Footer copyright year
 */
(function () {
  "use strict";

  /* ---------- 1. Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navMobile = document.getElementById("nav-mobile");

  function openNav() {
    navMobile.hidden = false;
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    navMobile.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeNav(); else openNav();
    });

    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        closeNav();
        navToggle.focus();
      }
    });

    // Close the mobile menu automatically if the viewport grows into desktop size.
    window.matchMedia("(min-width: 880px)").addEventListener("change", function (e) {
      if (e.matches) closeNav();
    });
  }

  /* ---------- 2. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealEls.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // No IntersectionObserver support, or the user prefers reduced motion: show everything immediately.
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 3. Current-section nav highlighting ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll('.nav-pc a[href^="#"]');

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.getAttribute("id");
          var link = document.querySelector('.nav-pc a[href="#' + id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("is-active"); });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- 4. Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
