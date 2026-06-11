/* ════════════════════════════════════════════════════════════
   KAMAX AL125 — interacciones
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ──────────────────────────────────────────────────────────
     CONFIG — único lugar donde se cargan los datos comerciales.
     Cuando estén los datos reales, se cambia acá y nada más.
     ────────────────────────────────────────────────────────── */
  var CONFIG = {
    whatsappNumber: "540000000000",                 // ← número real con código de país, sin "+"
    email: "ventas@veloxsolutions.com",             // ← email real
    address: "Dirección a confirmar · Concesionario Velox" // ← showroom real
  };

  var COLORS = [
    { slug: "negro-rojo",  name: "Negro / Rojo",  c1: "#14161c", c2: "#EC0606", ambient: "236,6,6" },
    { slug: "negro-azul",  name: "Negro / Azul",  c1: "#14161c", c2: "#2D7DFF", ambient: "45,125,255" },
    { slug: "plata-rojo",  name: "Plata / Rojo",  c1: "#c7ccd4", c2: "#EC0606", ambient: "236,6,6" },
    { slug: "plata-azul",  name: "Plata / Azul",  c1: "#c7ccd4", c2: "#2D7DFF", ambient: "45,125,255" },
    { slug: "blanco-rojo", name: "Blanco / Rojo", c1: "#f3f5f8", c2: "#EC0606", ambient: "236,6,6" },
    { slug: "blanco-azul", name: "Blanco / Azul", c1: "#f3f5f8", c2: "#2D7DFF", ambient: "45,125,255" }
  ];
  var current = 0;

  function $(id) { return document.getElementById(id); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function waUrl(message) {
    return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  /* ---- enlaces de WhatsApp: todos salen de CONFIG ---- */
  function refreshWaLinks() {
    var color = COLORS[current];
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      var msg = a.getAttribute("data-wa-msg") || "Hola! Quiero info de la KAMAX AL125.";
      msg = msg.replace("{color}", color.name);
      a.href = waUrl(msg);
    });
    var colorCta = $("colorCta");
    if (colorCta) colorCta.href = waUrl("Hola! Me interesa la KAMAX AL125 en " + color.name + ". ¿Me pasás precio y disponibilidad?");
  }

  /* ---- datos de contacto desde CONFIG ---- */
  var emailA = $("contactEmail");
  if (emailA) { emailA.href = "mailto:" + CONFIG.email; emailA.textContent = CONFIG.email; }
  var addr = $("contactAddress");
  if (addr) addr.textContent = CONFIG.address;
  var y = $("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- topbar + barra de progreso ---- */
  var topbar = $("topbar");
  var progress = $("scrollProgress");
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var sy = window.scrollY;
      if (topbar) topbar.classList.toggle("scrolled", sy > 24);
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (sy / max) * 100 : 0) + "%";
      }
      var ghost = $("heroGhost");
      if (ghost && sy < window.innerHeight) {
        ghost.style.transform = "translateY(calc(-54% + " + sy * 0.12 + "px))";
      }
      ticking = false;
    });
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- selector de colores ---- */
  var swWrap = $("swatches");
  var colorImg = $("colorImg");
  var colorName = $("colorName");
  var colorIdx = $("colorIdx");
  var colorGhost = $("colorGhost");
  var colorAmbient = $("colorAmbient");
  var heroMoto = $("heroMoto");
  var heroAmbient = $("heroAmbient");
  var composerDot = $("composerDot");
  var composerColorName = $("composerColorName");
  var mobileBarColor = $("mobileBarColor");

  function imgSrc(col) { return "assets/img/side-" + col.slug + ".webp"; }

  function buildSwatches() {
    if (!swWrap) return;
    COLORS.forEach(function (col, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "sw" + (i === 0 ? " active" : "");
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", i === 0 ? "true" : "false");
      b.setAttribute("aria-label", col.name);
      b.title = col.name;
      b.style.setProperty("--c1", col.c1);
      b.style.setProperty("--c2", col.c2);
      b.addEventListener("click", function () { select(i); });
      swWrap.appendChild(b);
    });
  }

  function select(i) {
    current = i;
    var col = COLORS[i];

    if (swWrap) {
      var all = swWrap.querySelectorAll(".sw");
      for (var k = 0; k < all.length; k++) {
        all[k].classList.toggle("active", k === i);
        all[k].setAttribute("aria-checked", k === i ? "true" : "false");
      }
    }

    if (colorImg) {
      colorImg.classList.remove("show");
      var pre = new Image();
      pre.onload = function () {
        colorImg.src = pre.src;
        colorImg.alt = "KAMAX AL125 colorway " + col.name;
        if (heroMoto) {
          heroMoto.src = pre.src;
          heroMoto.alt = "KAMAX AL125 color " + col.name;
        }
        requestAnimationFrame(function () { colorImg.classList.add("show"); });
      };
      pre.src = imgSrc(col);
    }

    var ambient = "radial-gradient(circle, rgba(" + col.ambient + ",.16) 0%, transparent 60%)";
    if (colorAmbient) colorAmbient.style.background = ambient;
    if (heroAmbient) heroAmbient.style.background = ambient;

    if (colorName) colorName.textContent = col.name;
    if (colorIdx) colorIdx.textContent = pad(i + 1);
    if (colorGhost) colorGhost.innerHTML = col.name.split(" / ").join("<br>");
    if (composerColorName) composerColorName.textContent = col.name;
    if (composerDot) composerDot.style.background = "linear-gradient(120deg, " + col.c1 + " 55%, " + col.c2 + " 55%)";
    if (mobileBarColor) mobileBarColor.textContent = col.name;

    refreshWaLinks();
  }

  buildSwatches();
  refreshWaLinks();

  /* el botón de color del formulario vuelve al selector */
  var composerColor = $("composerColor");
  if (composerColor) {
    composerColor.addEventListener("click", function () {
      var sec = $("colores");
      if (sec) sec.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---- compositor de WhatsApp (formulario) ---- */
  var form = $("leadForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = $("f-nombre");
      var err = $("nombreErr");
      var val = nombre ? nombre.value.trim() : "";
      if (!val) {
        if (nombre) { nombre.classList.add("err"); nombre.focus(); }
        if (err) err.classList.add("show");
        return;
      }
      if (nombre) nombre.classList.remove("err");
      if (err) err.classList.remove("show");

      var pago = form.querySelector("input[name=pago]:checked");
      var pagoTxt = pago ? pago.value : "financiación en cuotas";
      var col = COLORS[current];
      var msg = "Hola! Soy " + val + ". Quiero la KAMAX AL125 en " + col.name +
                ", pagando con " + pagoTxt + ". ¿Me pasás precio y disponibilidad?";
      window.open(waUrl(msg), "_blank", "noopener");
    });
    var nombreInput = $("f-nombre");
    if (nombreInput) {
      nombreInput.addEventListener("input", function () {
        nombreInput.classList.remove("err");
        var err2 = $("nombreErr");
        if (err2) err2.classList.remove("show");
      });
    }
  }

  /* ---- reveals on scroll ---- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".reveal, .reveal-wipe").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal, .reveal-wipe").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- barra CTA mobile: aparece después del hero ---- */
  var mobileBar = $("mobileBar");
  var hero = document.querySelector(".hero");
  if (mobileBar && hero && "IntersectionObserver" in window) {
    var ioBar = new IntersectionObserver(function (entries) {
      mobileBar.classList.toggle("show", !entries[0].isIntersecting);
    }, { threshold: 0.08 });
    ioBar.observe(hero);
  }
})();
