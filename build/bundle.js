/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/css-loader/dist/runtime/api.js"
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ "../node_modules/css-loader/dist/runtime/getUrl.js"
/*!*********************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
(module) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ },

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js"
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
(module) {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ },

/***/ "../node_modules/html-loader/dist/runtime/getUrl.js"
/*!**********************************************************!*\
  !*** ../node_modules/html-loader/dist/runtime/getUrl.js ***!
  \**********************************************************/
(module) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }
  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign

  url = String(url.__esModule ? url.default : url);
  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }
  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }
  return url;
};

/***/ },

/***/ "./js/main.js"
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
() {

var navbar = document.querySelector('.navbar');
var navToggle = document.querySelector('.nav-toggle');
var navLinksWrap = document.querySelector('.nav-links');
var navLinks = Array.from(document.querySelectorAll('.nav-link'));
var sections = Array.from(document.querySelectorAll('.section-observed'));
var slides = Array.from(document.querySelectorAll('.carousel-slide'));
var dotsWrap = document.querySelector('.carousel-dots');
var prevButton = document.querySelector('.carousel-control.prev');
var nextButton = document.querySelector('.carousel-control.next');
var modalButtons = Array.from(document.querySelectorAll('.open-modal'));
var modals = Array.from(document.querySelectorAll('.modal'));
var currentSlide = 0;
function setNavbarState() {
  navbar.classList.toggle('compact', window.scrollY > 36);
}
function setActiveNavLink() {
  var probeLine = window.scrollY + navbar.offsetHeight + 12;
  var activeSection = sections[0];
  sections.forEach(function (section) {
    if (section.offsetTop <= probeLine) {
      activeSection = section;
    }
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    activeSection = sections[sections.length - 1];
  }
  navLinks.forEach(function (link) {
    var targetId = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', targetId === activeSection.id);
  });
}
function getCompactNavHeight() {
  var wasCompact = navbar.classList.contains('compact');
  navbar.classList.add('compact');
  var compactHeight = navbar.offsetHeight;
  if (!wasCompact && window.scrollY <= 36) {
    navbar.classList.remove('compact');
  }
  return compactHeight;
}
function setActiveNavLinkById(sectionId) {
  navLinks.forEach(function (link) {
    var targetId = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', targetId === sectionId);
  });
}
function updateOnScroll() {
  setNavbarState();
  setActiveNavLink();
}
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach(function (slide, slideIndex) {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });
  Array.from(dotsWrap.children).forEach(function (dot, dotIndex) {
    dot.classList.toggle('active', dotIndex === currentSlide);
    dot.setAttribute('aria-current', dotIndex === currentSlide ? 'true' : 'false');
  });
}
function buildCarouselDots() {
  slides.forEach(function (slide, index) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', "Show slide ".concat(index + 1));
    dot.addEventListener('click', function () {
      return showSlide(index);
    });
    dotsWrap.appendChild(dot);
  });
  showSlide(0);
}
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) {
    return;
  }
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-active');
  modal.querySelector('.modal-close').focus();
}
function closeModal(modal) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-active');
}
navToggle.addEventListener('click', function () {
  var isOpen = navLinksWrap.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    var targetId = link.getAttribute('href').replace('#', '');
    var targetSection = document.getElementById(targetId);
    if (targetSection) {
      event.preventDefault();
      var top = targetSection.offsetTop - getCompactNavHeight() + 1;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', "#".concat(targetId));
      setActiveNavLinkById(targetId);
    }
    navLinksWrap.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
prevButton.addEventListener('click', function () {
  return showSlide(currentSlide - 1);
});
nextButton.addEventListener('click', function () {
  return showSlide(currentSlide + 1);
});
modalButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    return openModal(button.dataset.modal);
  });
});
modals.forEach(function (modal) {
  modal.addEventListener('click', function (event) {
    if (event.target === modal || event.target.classList.contains('modal-close')) {
      closeModal(modal);
    }
  });
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modals.filter(function (modal) {
      return modal.classList.contains('open');
    }).forEach(closeModal);
  }
  if (event.key === 'ArrowLeft') {
    showSlide(currentSlide - 1);
  }
  if (event.key === 'ArrowRight') {
    showSlide(currentSlide + 1);
  }
});
window.addEventListener('scroll', updateOnScroll, {
  passive: true
});
window.addEventListener('resize', setActiveNavLink);
buildCarouselDots();
updateOnScroll();

/***/ },

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss"
/*!*************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss ***!
  \*************************************************************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "../node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/uiuc-campus.png */ "./assets/uiuc-campus.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@charset "UTF-8";
:root {
  --nav-height: 84px;
  --ink: #0d0d0f;
  --mint: #bff4df;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: #0d0d0f;
  background: #f7f7f4;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  line-height: 1.6;
}

body.modal-active {
  overflow: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(247, 247, 244, 0.76);
  backdrop-filter: blur(18px);
}

.navbar {
  width: min(1180px, calc(100% - 52px));
  margin: 0 auto;
  min-height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
  transition: min-height 220ms ease;
}

.navbar.compact {
  --nav-height: 64px;
}

.brand,
.nav-links,
.hero-actions,
.social-links,
.project-heading,
.experience-head {
  display: flex;
  align-items: center;
}

.brand {
  gap: 12px;
  font-weight: 900;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: block;
  background: radial-gradient(circle at 50% 36%, transparent 0 8px, #0d0d0f 9px 10px, transparent 11px), radial-gradient(circle at 35% 38%, #0d0d0f 0 2px, transparent 3px), radial-gradient(circle at 63% 38%, #0d0d0f 0 2px, transparent 3px);
  border: 2px solid #0d0d0f;
  border-radius: 50% 50% 45% 45%;
}

.brand-text {
  font-size: 1rem;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 180ms ease, transform 180ms ease;
}

.navbar.compact .brand-text {
  opacity: 1;
  transform: translateX(0);
}

.nav-links {
  gap: 16px;
}

.nav-link {
  padding: 8px 16px;
  color: #22252a;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 800;
  white-space: nowrap;
  transition: color 180ms ease, background 180ms ease, font-size 220ms ease, transform 180ms ease;
}

.navbar.compact .nav-link {
  font-size: 0.84rem;
}

.nav-link:hover,
.nav-link.active {
  color: #ffffff;
  background: #0d0d0f;
  transform: translateY(-1px);
}

.nav-toggle {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 14px;
  background: #ffffff;
  cursor: pointer;
}

.nav-toggle span {
  width: 20px;
  height: 2px;
  display: block;
  margin: 5px auto;
  background: #0d0d0f;
}

.stripe {
  width: 100%;
  padding: 94px 0;
  scroll-margin-top: var(--nav-height);
}

.section-inner {
  width: min(1180px, calc(100% - 52px));
  margin: 0 auto;
}

.hero-section {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  background: radial-gradient(circle at 78% 44%, rgba(191, 244, 223, 0.7), transparent 16%), linear-gradient(180deg, #ffffff 0%, #f7f7f4 100%);
  overflow: hidden;
}

.hero-grid,
.split-layout,
.footer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.78fr);
  gap: clamp(36px, 7vw, 92px);
  align-items: center;
}

.hero-copy {
  animation: rise-in 700ms ease both;
}

.eyebrow {
  margin: 0 0 12px;
  color: #666a70;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 10px;
  font-size: clamp(3.4rem, 7vw, 6.6rem);
  line-height: 0.95;
  letter-spacing: 0;
}

h2 {
  margin-bottom: 18px;
  font-size: clamp(2.4rem, 5vw, 4.7rem);
  line-height: 1.02;
  text-align: inherit;
}

h3 {
  margin-bottom: 10px;
  font-size: 1.28rem;
  line-height: 1.2;
}

h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.05rem;
  line-height: 1.22;
}

.type-line {
  margin-bottom: 24px;
  color: #9b6ae8;
  font-size: clamp(1.55rem, 3vw, 2.5rem);
  font-weight: 700;
}

.type-line span {
  display: inline-block;
  margin-left: 4px;
  animation: blink 1s steps(2, start) infinite;
}

.hero-text {
  max-width: 660px;
  color: #4b5058;
  font-size: 1.1rem;
}

.hero-actions {
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  border: 0;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 900;
}

.button {
  padding: 0 20px;
}

.button-primary {
  color: #0d0d0f;
  background: #bff4df;
  transition: color 180ms ease, background 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}

.button-primary:hover {
  color: #ffffff;
  background: #0d0d0f;
  box-shadow: 0 14px 36px rgba(13, 13, 15, 0.18);
  transform: translateY(-2px);
}

.button-secondary {
  color: #0d0d0f;
  background: #ffffff;
  border: 2px solid #0d0d0f;
  transition: color 180ms ease, background 180ms ease, transform 180ms ease;
}

.button-secondary:hover {
  color: #ffffff;
  background: #0d0d0f;
  transform: translateY(-2px);
}

.button.compact {
  color: #0d0d0f;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.08);
}

.hero-portrait-card {
  min-height: 540px;
  position: relative;
  display: grid;
  place-items: end center;
}

.hero-portrait-card::before {
  content: "";
  position: absolute;
  width: min(92%, 430px);
  aspect-ratio: 0.72;
  bottom: 20px;
  background: linear-gradient(160deg, rgba(191, 244, 223, 0.9), rgba(93, 216, 189, 0.45));
  border-radius: 48% 48% 8px 8px;
  filter: blur(1px);
}

.portrait-ring {
  position: relative;
  z-index: 1;
  width: min(96%, 430px);
  aspect-ratio: 0.76;
  overflow: hidden;
  border-radius: 48% 48% 6px 6px;
  border: 8px solid #5dd8bd;
  box-shadow: 0 10px 34px rgba(19, 22, 26, 0.08);
}

.portrait-ring img {
  width: 100%;
  height: 100%;
  display: block;
  -o-object-fit: cover;
     object-fit: cover;
  -o-object-position: 50% 18%;
     object-position: 50% 18%;
}

.feature-section {
  background: #ffffff;
}

.about-section {
  position: relative;
  background: linear-gradient(rgba(247, 247, 244, 0.38), rgba(247, 247, 244, 0.72)), url(${___CSS_LOADER_URL_REPLACEMENT_0___}) center/cover fixed;
}

.about-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.18);
  pointer-events: none;
}

.about-section .section-inner {
  position: relative;
  z-index: 1;
}

.about-section .split-layout {
  display: block;
}

.resume-panel,
.experience-card {
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.68);
  border-radius: 22px;
  box-shadow: 0 20px 70px rgba(19, 22, 26, 0.08);
}

.resume-panel {
  padding: clamp(28px, 5vw, 48px);
}

.resume-panel {
  width: min(100%, 1120px);
  margin: 0 auto;
  background: transparent;
  border: 0;
  box-shadow: none;
}

.resume-panel .eyebrow,
.resume-panel h2 {
  text-align: center;
}

.education-list {
  display: grid;
  gap: 16px;
  margin-top: 18px;
}

.education-skills-grid {
  display: grid;
  grid-template-columns: minmax(390px, 1.35fr) repeat(2, minmax(210px, 0.72fr));
  gap: 18px;
  align-items: stretch;
  margin-top: 30px;
}

.resume-column {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 22px;
  box-shadow: 0 20px 70px rgba(19, 22, 26, 0.08);
}

.resume-column h3 {
  margin-bottom: 18px;
  font-size: clamp(1.25rem, 2vw, 1.65rem);
}

.skill-modal-card {
  align-items: center;
  justify-content: center;
  min-height: 236px;
  color: #0d0d0f;
  text-align: center;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.skill-modal-card:hover {
  background: #ffffff;
  box-shadow: 0 24px 80px rgba(19, 22, 26, 0.14);
  transform: translateY(-4px);
}

.skill-modal-card h3 {
  margin-bottom: 8px;
}

.card-hint {
  color: #666a70;
  font-size: 0.86rem;
  font-weight: 900;
}

.skill-stack {
  display: grid;
  gap: 10px;
}

.skill-stack span {
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 0 14px;
  color: #1d252a;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 14px;
  font-size: 0.98rem;
  font-weight: 900;
}

.skill-stack span:nth-child(3n+1) {
  background: rgba(191, 244, 223, 0.62);
}

.skill-stack span:nth-child(3n+2) {
  background: rgba(255, 216, 200, 0.72);
}

.skill-stack span:nth-child(3n) {
  background: rgba(117, 189, 243, 0.28);
}

.modal-skill-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 22px;
}

.timeline-block {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  min-height: 132px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 18px;
}

.school-icon {
  width: 58px;
  height: 58px;
  -o-object-fit: contain;
     object-fit: contain;
  padding: 8px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 16px;
  box-shadow: 0 10px 34px rgba(19, 22, 26, 0.08);
}

.date-pill {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 4px 12px;
  color: #a65332;
  background: #ffd8c8;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 900;
}

.timeline-block h4 {
  max-width: 100%;
  margin-bottom: 10px;
  font-size: clamp(1.02rem, 1.6vw, 1.18rem);
  overflow-wrap: anywhere;
}

.timeline-block p {
  margin-bottom: 0;
  color: #666a70;
  font-size: 0.95rem;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 34px;
}

.project-heading {
  justify-content: space-between;
  max-width: none;
}

.experience-card {
  padding: clamp(24px, 4vw, 42px);
}

.experience-head {
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 26px;
  padding-bottom: 22px;
}

.experience-head p {
  margin-bottom: 0;
  color: #666a70;
}

.experience-head span {
  color: #666a70;
  font-weight: 800;
  white-space: nowrap;
}

.carousel {
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  gap: 16px;
  align-items: center;
}

.carousel-viewport {
  overflow: hidden;
  border-radius: 18px;
}

.carousel-slide {
  display: none;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 0.7fr);
  min-height: 360px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 18px;
}

.carousel-slide.active {
  display: grid;
  animation: fade-in 280ms ease both;
}

.slide-visual {
  min-height: 300px;
  display: grid;
  place-items: center;
  padding: 24px;
  color: #273039;
  font-weight: 900;
  text-align: center;
}

.car-visual {
  background: radial-gradient(circle at 22% 20%, rgba(255, 255, 255, 0.95), transparent 24%), linear-gradient(135deg, rgba(191, 234, 255, 0.88), rgba(201, 245, 231, 0.72));
}

.flow-visual {
  background: radial-gradient(circle at 22% 20%, rgba(255, 255, 255, 0.95), transparent 24%), linear-gradient(135deg, rgba(217, 207, 248, 0.88), rgba(200, 244, 237, 0.72));
}

.board-visual {
  background: radial-gradient(circle at 22% 20%, rgba(255, 255, 255, 0.95), transparent 24%), linear-gradient(135deg, rgba(191, 232, 224, 0.88), rgba(255, 240, 201, 0.72));
}

.slide-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(28px, 5vw, 54px);
}

.slide-copy p,
.footer-section p,
.video-heading p {
  color: #666a70;
}

.project-meta {
  color: #666a70;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.carousel-control {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: #0d0d0f;
  background: #bff4df;
  cursor: pointer;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 9px;
  margin-top: 18px;
}

.carousel-dots button {
  width: 30px;
  height: 5px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(13, 13, 15, 0.18);
  cursor: pointer;
}

.carousel-dots button.active {
  background: #0d0d0f;
}

.process-section {
  position: relative;
  min-height: 620px;
  display: grid;
  align-items: center;
  overflow: hidden;
  color: #ffffff;
  background: #0d0d0f;
}

.video-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(circle at 22% 24%, rgba(191, 244, 223, 0.28), transparent 30%), linear-gradient(90deg, rgba(13, 13, 15, 0.88), rgba(13, 13, 15, 0.48));
}

.demo-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
  filter: saturate(0.9) contrast(1.08);
}

.process-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.75fr);
  gap: clamp(34px, 6vw, 76px);
  align-items: center;
}

.video-heading {
  margin-bottom: 0;
}

.video-heading h2 {
  max-width: 680px;
}

.video-heading p {
  color: rgba(255, 255, 255, 0.78);
}

.process-list {
  display: grid;
  gap: 14px;
}

.process-list article {
  padding: 20px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 18px;
  backdrop-filter: blur(16px);
}

.process-list h3,
.process-list p {
  color: #ffffff;
}

.process-list p {
  margin-bottom: 0;
  opacity: 0.78;
}

.process-list span {
  color: #bff4df;
  font-weight: 900;
}

.footer-section {
  color: #0d0d0f;
  background: #ffffff;
}

.footer-grid {
  grid-template-columns: 1fr auto;
}

.social-links {
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-end;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 46px;
  padding: 0 16px;
  background: #f7f7f4;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 14px;
  font-weight: 900;
  transition: color 180ms ease, background 180ms ease, border-color 180ms ease;
}

.social-link:hover {
  color: #ffffff;
  background: #0d0d0f;
  border-color: #0d0d0f;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(13, 13, 15, 0.38);
  backdrop-filter: blur(8px);
}

.modal.open {
  display: flex;
}

.modal-panel {
  width: min(620px, 100%);
  position: relative;
  padding: clamp(30px, 5vw, 46px);
  padding-top: clamp(48px, 6vw, 58px);
  color: #0d0d0f;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 24px;
  box-shadow: 0 20px 70px rgba(19, 22, 26, 0.08);
  animation: modal-in 220ms ease both;
}

.modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  color: #ffffff;
  background: #0d0d0f;
  cursor: pointer;
  font-size: 0;
}

.modal-close::before {
  content: "×";
  font-size: 1.65rem;
  font-weight: 900;
  line-height: 1;
}

.css-icon {
  width: 20px;
  height: 20px;
  position: relative;
  flex: 0 0 auto;
  display: inline-block;
}

.github-icon {
  border: 2px solid currentColor;
  border-radius: 50%;
}

.github-icon::before,
.github-icon::after {
  content: "";
  position: absolute;
  top: -3px;
  width: 7px;
  height: 7px;
  border-top: 2px solid currentColor;
  border-radius: 2px;
}

.github-icon::before {
  left: 1px;
  transform: rotate(-35deg);
}

.github-icon::after {
  right: 1px;
  transform: rotate(35deg);
}

.linkedin-icon {
  border: 2px solid currentColor;
  border-radius: 3px;
}

.linkedin-icon::before {
  content: "in";
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 0.72rem;
  font-weight: 900;
  line-height: 1;
}

.gmail-icon {
  border: 2px solid currentColor;
  border-radius: 3px;
}

.gmail-icon::before,
.gmail-icon::after {
  content: "";
  position: absolute;
  top: 4px;
  width: 9px;
  height: 9px;
  border-top: 2px solid #ea4335;
}

.gmail-icon::before {
  left: 2px;
  border-left: 2px solid #ea4335;
  transform: skewY(34deg);
}

.gmail-icon::after {
  right: 2px;
  border-right: 2px solid #ea4335;
  transform: skewY(-34deg);
}

.instagram-icon {
  border: 2px solid currentColor;
  border-radius: 6px;
}

.instagram-icon::before {
  content: "";
  position: absolute;
  inset: 5px;
  border: 2px solid currentColor;
  border-radius: 50%;
}

.instagram-icon::after {
  content: "";
  position: absolute;
  top: 3px;
  right: 3px;
  width: 3px;
  height: 3px;
  background: currentColor;
  border-radius: 50%;
}

.chevron-right::before,
.chevron-left::before {
  content: "";
  position: absolute;
  inset: 4px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
}

.chevron-right::before {
  transform: rotate(45deg);
}

.chevron-left::before {
  transform: rotate(-135deg);
}

.code-icon,
.layers-icon,
.spark-icon {
  width: 42px;
  height: 42px;
  margin-bottom: 24px;
  color: #0d0d0f;
}

.code-icon {
  border: 4px solid currentColor;
  border-radius: 50%;
}

.code-icon::before {
  content: "";
  position: absolute;
  top: -12px;
  left: 50%;
  width: 6px;
  height: 58px;
  background: #9b6ae8;
  border: 2px solid rgba(155, 106, 232, 0.88);
  border-radius: 999px;
  transform: translateX(-50%);
}

.code-icon::after {
  content: "";
  position: absolute;
  top: -16px;
  left: 50%;
  width: 2px;
  height: 66px;
  background: rgba(155, 106, 232, 0.42);
  transform: translateX(-50%);
}

.layers-icon {
  border: 2px solid currentColor;
  border-radius: 12px;
  box-shadow: 8px 8px 0 #bff4df;
}

.spark-icon::before,
.spark-icon::after {
  content: "";
  position: absolute;
}

.spark-icon::before {
  inset: 0;
  border-radius: 50%;
  border: 3px solid currentColor;
}

.spark-icon::after {
  top: -6px;
  bottom: -6px;
  left: 50%;
  width: 5px;
  background: #9b6ae8;
  border-radius: 999px;
  transform: translateX(-50%);
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@media (max-width: 1080px) {
  .nav-links {
    gap: 6px;
  }

  .nav-link {
    padding: 8px 10px;
    font-size: 0.82rem;
  }
}
@media (max-width: 1024px) {
  .hero-grid,
.split-layout,
.process-content,
.footer-grid {
    grid-template-columns: 1fr;
  }

  .education-skills-grid {
    grid-template-columns: 1fr;
  }

  .hero-portrait-card {
    min-height: 420px;
    place-items: center;
  }

  .carousel-slide {
    grid-template-columns: 1fr;
  }

  .footer-grid,
.social-links {
    justify-content: flex-start;
  }
}
@media (max-width: 820px) {
  .navbar {
    align-items: flex-start;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  .nav-toggle {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 14px 26px 20px;
    background: rgba(247, 247, 244, 0.96);
    border-bottom: 1px solid rgba(17, 17, 17, 0.08);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-link {
    width: 100%;
  }

  .stripe {
    padding: 74px 0;
  }

  .timeline-block {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 18px;
    text-align: center;
  }

  .school-icon {
    width: 64px;
    height: 64px;
    border-radius: 14px;
  }

  .carousel {
    grid-template-columns: 1fr;
  }

  .carousel-control {
    position: absolute;
    z-index: 2;
    top: 130px;
  }

  .carousel-control.prev {
    left: 12px;
  }

  .carousel-control.next {
    right: 12px;
  }
}
@media (max-width: 560px) {
  .section-inner,
.navbar {
    width: min(100% - 28px, 1180px);
  }

  h1 {
    font-size: 3.1rem;
  }

  h2 {
    font-size: 2.35rem;
  }

  .hero-actions,
.social-links {
    align-items: stretch;
    flex-direction: column;
  }

  .button,
.social-link {
    width: 100%;
  }

  .experience-head,
.project-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}`, "",{"version":3,"sources":["webpack://./css/main.scss"],"names":[],"mappings":"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","sourcesContent":["$ink: #0d0d0f;\n$paper: #f7f7f4;\n$panel: #ffffff;\n$soft: #f0f1ee;\n$muted: #666a70;\n$line: rgba(17, 17, 17, 0.08);\n$mint: #bff4df;\n$aqua: #5dd8bd;\n$lavender: #9b6ae8;\n$blue: #75bdf3;\n$peach: #ffd8c8;\n$shadow: 0 20px 70px rgba(19, 22, 26, 0.08);\n$soft-shadow: 0 10px 34px rgba(19, 22, 26, 0.08);\n$max-width: 1180px;\n$nav-height-large: 84px;\n$nav-height-small: 64px;\n\n@mixin centered-section {\n    width: min(#{$max-width}, calc(100% - 52px));\n    margin: 0 auto;\n}\n\n@mixin glass-panel {\n    background: rgba(255, 255, 255, 0.86);\n    border: 1px solid rgba(255, 255, 255, 0.68);\n    border-radius: 22px;\n    box-shadow: $shadow;\n}\n\n@mixin pastel-visual($from, $to) {\n    background:\n        radial-gradient(circle at 22% 20%, rgba(255, 255, 255, 0.95), transparent 24%),\n        linear-gradient(135deg, rgba($from, 0.88), rgba($to, 0.72));\n}\n\n:root {\n    --nav-height: #{$nav-height-large};\n    --ink: #{$ink};\n    --mint: #{$mint};\n}\n\n* {\n    box-sizing: border-box;\n}\n\nhtml {\n    scroll-behavior: smooth;\n}\n\nbody {\n    margin: 0;\n    color: $ink;\n    background: $paper;\n    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif;\n    line-height: 1.6;\n}\n\nbody.modal-active {\n    overflow: hidden;\n}\n\na {\n    color: inherit;\n    text-decoration: none;\n}\n\nbutton {\n    font: inherit;\n}\n\n.site-header {\n    position: sticky;\n    top: 0;\n    z-index: 20;\n    background: rgba(247, 247, 244, 0.76);\n    backdrop-filter: blur(18px);\n}\n\n.navbar {\n    @include centered-section;\n    min-height: var(--nav-height);\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 26px;\n    transition: min-height 220ms ease;\n}\n\n.navbar.compact {\n    --nav-height: #{$nav-height-small};\n}\n\n.brand,\n.nav-links,\n.hero-actions,\n.social-links,\n.project-heading,\n.experience-head {\n    display: flex;\n    align-items: center;\n}\n\n.brand {\n    gap: 12px;\n    font-weight: 900;\n}\n\n.brand-mark {\n    width: 42px;\n    height: 42px;\n    display: block;\n    background:\n        radial-gradient(circle at 50% 36%, transparent 0 8px, $ink 9px 10px, transparent 11px),\n        radial-gradient(circle at 35% 38%, $ink 0 2px, transparent 3px),\n        radial-gradient(circle at 63% 38%, $ink 0 2px, transparent 3px);\n    border: 2px solid $ink;\n    border-radius: 50% 50% 45% 45%;\n}\n\n.brand-text {\n    font-size: 1rem;\n    opacity: 0;\n    transform: translateX(-6px);\n    transition: opacity 180ms ease, transform 180ms ease;\n}\n\n.navbar.compact .brand-text {\n    opacity: 1;\n    transform: translateX(0);\n}\n\n.nav-links {\n    gap: 16px;\n}\n\n.nav-link {\n    padding: 8px 16px;\n    color: #22252a;\n    border-radius: 999px;\n    font-size: 0.95rem;\n    font-weight: 800;\n    white-space: nowrap;\n    transition: color 180ms ease, background 180ms ease, font-size 220ms ease, transform 180ms ease;\n}\n\n.navbar.compact .nav-link {\n    font-size: 0.84rem;\n}\n\n.nav-link:hover,\n.nav-link.active {\n    color: #ffffff;\n    background: $ink;\n    transform: translateY(-1px);\n}\n\n.nav-toggle {\n    display: none;\n    width: 44px;\n    height: 44px;\n    border: 1px solid $line;\n    border-radius: 14px;\n    background: #ffffff;\n    cursor: pointer;\n}\n\n.nav-toggle span {\n    width: 20px;\n    height: 2px;\n    display: block;\n    margin: 5px auto;\n    background: $ink;\n}\n\n.stripe {\n    width: 100%;\n    padding: 94px 0;\n    scroll-margin-top: var(--nav-height);\n}\n\n.section-inner {\n    @include centered-section;\n}\n\n.hero-section {\n    min-height: calc(100vh - var(--nav-height));\n    display: flex;\n    align-items: center;\n    background:\n        radial-gradient(circle at 78% 44%, rgba($mint, 0.7), transparent 16%),\n        linear-gradient(180deg, #ffffff 0%, $paper 100%);\n    overflow: hidden;\n}\n\n.hero-grid,\n.split-layout,\n.footer-grid {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.78fr);\n    gap: clamp(36px, 7vw, 92px);\n    align-items: center;\n}\n\n.hero-copy {\n    animation: rise-in 700ms ease both;\n}\n\n.eyebrow {\n    margin: 0 0 12px;\n    color: $muted;\n    font-size: 0.78rem;\n    font-weight: 900;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n}\n\nh1,\nh2,\nh3,\np {\n    margin-top: 0;\n}\n\nh1 {\n    margin-bottom: 10px;\n    font-size: clamp(3.4rem, 7vw, 6.6rem);\n    line-height: 0.95;\n    letter-spacing: 0;\n}\n\nh2 {\n    margin-bottom: 18px;\n    font-size: clamp(2.4rem, 5vw, 4.7rem);\n    line-height: 1.02;\n    text-align: inherit;\n}\n\nh3 {\n    margin-bottom: 10px;\n    font-size: 1.28rem;\n    line-height: 1.2;\n}\n\nh4 {\n    margin-top: 0;\n    margin-bottom: 10px;\n    font-size: 1.05rem;\n    line-height: 1.22;\n}\n\n.type-line {\n    margin-bottom: 24px;\n    color: $lavender;\n    font-size: clamp(1.55rem, 3vw, 2.5rem);\n    font-weight: 700;\n}\n\n.type-line span {\n    display: inline-block;\n    margin-left: 4px;\n    animation: blink 1s steps(2, start) infinite;\n}\n\n.hero-text {\n    max-width: 660px;\n    color: #4b5058;\n    font-size: 1.1rem;\n}\n\n.hero-actions {\n    flex-wrap: wrap;\n    gap: 14px;\n    margin-top: 34px;\n}\n\n.button {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    min-height: 46px;\n    border: 0;\n    border-radius: 16px;\n    cursor: pointer;\n    font-weight: 900;\n}\n\n.button {\n    padding: 0 20px;\n}\n\n.button-primary {\n    color: $ink;\n    background: $mint;\n    transition: color 180ms ease, background 180ms ease, transform 180ms ease, box-shadow 180ms ease;\n}\n\n.button-primary:hover {\n    color: #ffffff;\n    background: $ink;\n    box-shadow: 0 14px 36px rgba(13, 13, 15, 0.18);\n    transform: translateY(-2px);\n}\n\n.button-secondary {\n    color: $ink;\n    background: #ffffff;\n    border: 2px solid $ink;\n    transition: color 180ms ease, background 180ms ease, transform 180ms ease;\n}\n\n.button-secondary:hover {\n    color: #ffffff;\n    background: $ink;\n    transform: translateY(-2px);\n}\n\n.button.compact {\n    color: $ink;\n    background: #ffffff;\n    border: 1px solid $line;\n}\n\n.hero-portrait-card {\n    min-height: 540px;\n    position: relative;\n    display: grid;\n    place-items: end center;\n}\n\n.hero-portrait-card::before {\n    content: \"\";\n    position: absolute;\n    width: min(92%, 430px);\n    aspect-ratio: 0.72;\n    bottom: 20px;\n    background: linear-gradient(160deg, rgba($mint, 0.9), rgba($aqua, 0.45));\n    border-radius: 48% 48% 8px 8px;\n    filter: blur(1px);\n}\n\n.portrait-ring {\n    position: relative;\n    z-index: 1;\n    width: min(96%, 430px);\n    aspect-ratio: 0.76;\n    overflow: hidden;\n    border-radius: 48% 48% 6px 6px;\n    border: 8px solid $aqua;\n    box-shadow: $soft-shadow;\n}\n\n.portrait-ring img {\n    width: 100%;\n    height: 100%;\n    display: block;\n    object-fit: cover;\n    object-position: 50% 18%;\n}\n\n.feature-section {\n    background: #ffffff;\n}\n\n.about-section {\n    position: relative;\n    background:\n        linear-gradient(rgba(247, 247, 244, 0.38), rgba(247, 247, 244, 0.72)),\n        url(\"../assets/uiuc-campus.png\") center / cover fixed;\n}\n\n.about-section::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background: rgba(255, 255, 255, 0.18);\n    pointer-events: none;\n}\n\n.about-section .section-inner {\n    position: relative;\n    z-index: 1;\n}\n\n.about-section .split-layout {\n    display: block;\n}\n\n.resume-panel,\n.experience-card {\n    @include glass-panel;\n}\n\n.resume-panel {\n    padding: clamp(28px, 5vw, 48px);\n}\n\n.resume-panel {\n    width: min(100%, 1120px);\n    margin: 0 auto;\n    background: transparent;\n    border: 0;\n    box-shadow: none;\n}\n\n.resume-panel .eyebrow,\n.resume-panel h2 {\n    text-align: center;\n}\n\n.education-list {\n    display: grid;\n    gap: 16px;\n    margin-top: 18px;\n}\n\n.education-skills-grid {\n    display: grid;\n    grid-template-columns: minmax(390px, 1.35fr) repeat(2, minmax(210px, 0.72fr));\n    gap: 18px;\n    align-items: stretch;\n    margin-top: 30px;\n}\n\n.resume-column {\n    min-height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 24px;\n    background: rgba(255, 255, 255, 0.86);\n    border: 1px solid rgba(255, 255, 255, 0.7);\n    border-radius: 22px;\n    box-shadow: $shadow;\n}\n\n.resume-column h3 {\n    margin-bottom: 18px;\n    font-size: clamp(1.25rem, 2vw, 1.65rem);\n}\n\n.skill-modal-card {\n    align-items: center;\n    justify-content: center;\n    min-height: 236px;\n    color: $ink;\n    text-align: center;\n    cursor: pointer;\n    transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;\n}\n\n.skill-modal-card:hover {\n    background: #ffffff;\n    box-shadow: 0 24px 80px rgba(19, 22, 26, 0.14);\n    transform: translateY(-4px);\n}\n\n.skill-modal-card h3 {\n    margin-bottom: 8px;\n}\n\n.card-hint {\n    color: $muted;\n    font-size: 0.86rem;\n    font-weight: 900;\n}\n\n.skill-stack {\n    display: grid;\n    gap: 10px;\n}\n\n.skill-stack span {\n    display: flex;\n    align-items: center;\n    min-height: 42px;\n    padding: 0 14px;\n    color: #1d252a;\n    background: rgba(255, 255, 255, 0.78);\n    border: 1px solid $line;\n    border-radius: 14px;\n    font-size: 0.98rem;\n    font-weight: 900;\n}\n\n.skill-stack span:nth-child(3n + 1) {\n    background: rgba($mint, 0.62);\n}\n\n.skill-stack span:nth-child(3n + 2) {\n    background: rgba($peach, 0.72);\n}\n\n.skill-stack span:nth-child(3n) {\n    background: rgba($blue, 0.28);\n}\n\n.modal-skill-stack {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    margin-top: 22px;\n}\n\n.timeline-block {\n    display: grid;\n    grid-template-columns: 58px minmax(0, 1fr);\n    gap: 16px;\n    align-items: center;\n    min-height: 132px;\n    padding: 18px;\n    background: rgba(255, 255, 255, 0.72);\n    border: 1px solid $line;\n    border-radius: 18px;\n}\n\n.school-icon {\n    width: 58px;\n    height: 58px;\n    object-fit: contain;\n    padding: 8px;\n    background: #ffffff;\n    border: 1px solid $line;\n    border-radius: 16px;\n    box-shadow: $soft-shadow;\n}\n\n.date-pill {\n    display: inline-flex;\n    margin-bottom: 12px;\n    padding: 4px 12px;\n    color: #a65332;\n    background: $peach;\n    border-radius: 999px;\n    font-size: 0.82rem;\n    font-weight: 900;\n}\n\n.timeline-block h4 {\n    max-width: 100%;\n    margin-bottom: 10px;\n    font-size: clamp(1.02rem, 1.6vw, 1.18rem);\n    overflow-wrap: anywhere;\n}\n\n.timeline-block p {\n    margin-bottom: 0;\n    color: $muted;\n    font-size: 0.95rem;\n}\n\n.section-heading {\n    max-width: 760px;\n    margin-bottom: 34px;\n}\n\n.project-heading {\n    justify-content: space-between;\n    max-width: none;\n}\n\n.experience-card {\n    padding: clamp(24px, 4vw, 42px);\n}\n\n.experience-head {\n    justify-content: space-between;\n    gap: 20px;\n    margin-bottom: 26px;\n    padding-bottom: 22px;\n}\n\n.experience-head p {\n    margin-bottom: 0;\n    color: $muted;\n}\n\n.experience-head span {\n    color: $muted;\n    font-weight: 800;\n    white-space: nowrap;\n}\n\n.carousel {\n    position: relative;\n    display: grid;\n    grid-template-columns: 48px 1fr 48px;\n    gap: 16px;\n    align-items: center;\n}\n\n.carousel-viewport {\n    overflow: hidden;\n    border-radius: 18px;\n}\n\n.carousel-slide {\n    display: none;\n    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.7fr);\n    min-height: 360px;\n    background: #ffffff;\n    border: 1px solid $line;\n    border-radius: 18px;\n}\n\n.carousel-slide.active {\n    display: grid;\n    animation: fade-in 280ms ease both;\n}\n\n.slide-visual {\n    min-height: 300px;\n    display: grid;\n    place-items: center;\n    padding: 24px;\n    color: #273039;\n    font-weight: 900;\n    text-align: center;\n}\n\n.car-visual {\n    @include pastel-visual(#bfeaff, #c9f5e7);\n}\n\n.flow-visual {\n    @include pastel-visual(#d9cff8, #c8f4ed);\n}\n\n.board-visual {\n    @include pastel-visual(#bfe8e0, #fff0c9);\n}\n\n.slide-copy {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    padding: clamp(28px, 5vw, 54px);\n}\n\n.slide-copy p,\n.footer-section p,\n.video-heading p {\n    color: $muted;\n}\n\n.project-meta {\n    color: $muted;\n    font-size: 0.78rem;\n    font-weight: 900;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n}\n\n.carousel-control {\n    width: 48px;\n    height: 48px;\n    display: grid;\n    place-items: center;\n    border: 0;\n    border-radius: 50%;\n    color: $ink;\n    background: $mint;\n    cursor: pointer;\n}\n\n.carousel-dots {\n    display: flex;\n    justify-content: center;\n    gap: 9px;\n    margin-top: 18px;\n}\n\n.carousel-dots button {\n    width: 30px;\n    height: 5px;\n    padding: 0;\n    border: 0;\n    border-radius: 999px;\n    background: rgba(13, 13, 15, 0.18);\n    cursor: pointer;\n}\n\n.carousel-dots button.active {\n    background: $ink;\n}\n\n.process-section {\n    position: relative;\n    min-height: 620px;\n    display: grid;\n    align-items: center;\n    overflow: hidden;\n    color: #ffffff;\n    background: $ink;\n}\n\n.video-overlay {\n    position: absolute;\n    inset: 0;\n    z-index: 1;\n    background:\n        radial-gradient(circle at 22% 24%, rgba($mint, 0.28), transparent 30%),\n        linear-gradient(90deg, rgba(13, 13, 15, 0.88), rgba(13, 13, 15, 0.48));\n}\n\n.demo-video {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    filter: saturate(0.9) contrast(1.08);\n}\n\n.process-content {\n    position: relative;\n    z-index: 2;\n    display: grid;\n    grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.75fr);\n    gap: clamp(34px, 6vw, 76px);\n    align-items: center;\n}\n\n.video-heading {\n    margin-bottom: 0;\n}\n\n.video-heading h2 {\n    max-width: 680px;\n}\n\n.video-heading p {\n    color: rgba(255, 255, 255, 0.78);\n}\n\n.process-list {\n    display: grid;\n    gap: 14px;\n}\n\n.process-list article {\n    padding: 20px;\n    background: rgba(255, 255, 255, 0.14);\n    border: 1px solid rgba(255, 255, 255, 0.22);\n    border-radius: 18px;\n    backdrop-filter: blur(16px);\n}\n\n.process-list h3,\n.process-list p {\n    color: #ffffff;\n}\n\n.process-list p {\n    margin-bottom: 0;\n    opacity: 0.78;\n}\n\n.process-list span {\n    color: $mint;\n    font-weight: 900;\n}\n\n.footer-section {\n    color: $ink;\n    background: #ffffff;\n}\n\n.footer-grid {\n    grid-template-columns: 1fr auto;\n}\n\n.social-links {\n    flex-wrap: wrap;\n    gap: 12px;\n    justify-content: flex-end;\n}\n\n.social-link {\n    display: inline-flex;\n    align-items: center;\n    gap: 10px;\n    min-height: 46px;\n    padding: 0 16px;\n    background: $paper;\n    border: 1px solid $line;\n    border-radius: 14px;\n    font-weight: 900;\n    transition: color 180ms ease, background 180ms ease, border-color 180ms ease;\n}\n\n.social-link:hover {\n    color: #ffffff;\n    background: $ink;\n    border-color: $ink;\n}\n\n.modal {\n    position: fixed;\n    inset: 0;\n    z-index: 40;\n    display: none;\n    align-items: center;\n    justify-content: center;\n    padding: 24px;\n    background: rgba(13, 13, 15, 0.38);\n    backdrop-filter: blur(8px);\n}\n\n.modal.open {\n    display: flex;\n}\n\n.modal-panel {\n    width: min(620px, 100%);\n    position: relative;\n    padding: clamp(30px, 5vw, 46px);\n    padding-top: clamp(48px, 6vw, 58px);\n    color: $ink;\n    background: rgba(255, 255, 255, 0.92);\n    border: 1px solid rgba(255, 255, 255, 0.78);\n    border-radius: 24px;\n    box-shadow: $shadow;\n    animation: modal-in 220ms ease both;\n}\n\n.modal-close {\n    position: absolute;\n    top: 18px;\n    right: 18px;\n    width: 44px;\n    height: 44px;\n    border: 0;\n    border-radius: 50%;\n    color: #ffffff;\n    background: $ink;\n    cursor: pointer;\n    font-size: 0;\n}\n\n.modal-close::before {\n    content: \"×\";\n    font-size: 1.65rem;\n    font-weight: 900;\n    line-height: 1;\n}\n\n.css-icon {\n    width: 20px;\n    height: 20px;\n    position: relative;\n    flex: 0 0 auto;\n    display: inline-block;\n}\n\n.github-icon {\n    border: 2px solid currentColor;\n    border-radius: 50%;\n}\n\n.github-icon::before,\n.github-icon::after {\n    content: \"\";\n    position: absolute;\n    top: -3px;\n    width: 7px;\n    height: 7px;\n    border-top: 2px solid currentColor;\n    border-radius: 2px;\n}\n\n.github-icon::before {\n    left: 1px;\n    transform: rotate(-35deg);\n}\n\n.github-icon::after {\n    right: 1px;\n    transform: rotate(35deg);\n}\n\n.linkedin-icon {\n    border: 2px solid currentColor;\n    border-radius: 3px;\n}\n\n.linkedin-icon::before {\n    content: \"in\";\n    position: absolute;\n    inset: 0;\n    display: grid;\n    place-items: center;\n    font-size: 0.72rem;\n    font-weight: 900;\n    line-height: 1;\n}\n\n.gmail-icon {\n    border: 2px solid currentColor;\n    border-radius: 3px;\n}\n\n.gmail-icon::before,\n.gmail-icon::after {\n    content: \"\";\n    position: absolute;\n    top: 4px;\n    width: 9px;\n    height: 9px;\n    border-top: 2px solid #ea4335;\n}\n\n.gmail-icon::before {\n    left: 2px;\n    border-left: 2px solid #ea4335;\n    transform: skewY(34deg);\n}\n\n.gmail-icon::after {\n    right: 2px;\n    border-right: 2px solid #ea4335;\n    transform: skewY(-34deg);\n}\n\n.instagram-icon {\n    border: 2px solid currentColor;\n    border-radius: 6px;\n}\n\n.instagram-icon::before {\n    content: \"\";\n    position: absolute;\n    inset: 5px;\n    border: 2px solid currentColor;\n    border-radius: 50%;\n}\n\n.instagram-icon::after {\n    content: \"\";\n    position: absolute;\n    top: 3px;\n    right: 3px;\n    width: 3px;\n    height: 3px;\n    background: currentColor;\n    border-radius: 50%;\n}\n\n.chevron-right::before,\n.chevron-left::before {\n    content: \"\";\n    position: absolute;\n    inset: 4px;\n    border-top: 2px solid currentColor;\n    border-right: 2px solid currentColor;\n}\n\n.chevron-right::before {\n    transform: rotate(45deg);\n}\n\n.chevron-left::before {\n    transform: rotate(-135deg);\n}\n\n.code-icon,\n.layers-icon,\n.spark-icon {\n    width: 42px;\n    height: 42px;\n    margin-bottom: 24px;\n    color: $ink;\n}\n\n.code-icon {\n    border: 4px solid currentColor;\n    border-radius: 50%;\n}\n\n.code-icon::before {\n    content: \"\";\n    position: absolute;\n    top: -12px;\n    left: 50%;\n    width: 6px;\n    height: 58px;\n    background: $lavender;\n    border: 2px solid rgba($lavender, 0.88);\n    border-radius: 999px;\n    transform: translateX(-50%);\n}\n\n.code-icon::after {\n    content: \"\";\n    position: absolute;\n    top: -16px;\n    left: 50%;\n    width: 2px;\n    height: 66px;\n    background: rgba($lavender, 0.42);\n    transform: translateX(-50%);\n}\n\n.layers-icon {\n    border: 2px solid currentColor;\n    border-radius: 12px;\n    box-shadow: 8px 8px 0 $mint;\n}\n\n.spark-icon::before,\n.spark-icon::after {\n    content: \"\";\n    position: absolute;\n}\n\n.spark-icon::before {\n    inset: 0;\n    border-radius: 50%;\n    border: 3px solid currentColor;\n}\n\n.spark-icon::after {\n    top: -6px;\n    bottom: -6px;\n    left: 50%;\n    width: 5px;\n    background: $lavender;\n    border-radius: 999px;\n    transform: translateX(-50%);\n}\n\n@keyframes rise-in {\n    from {\n        opacity: 0;\n        transform: translateY(20px);\n    }\n\n    to {\n        opacity: 1;\n        transform: translateY(0);\n    }\n}\n\n@keyframes blink {\n    50% {\n        opacity: 0;\n    }\n}\n\n@keyframes fade-in {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n@keyframes modal-in {\n    from {\n        opacity: 0;\n        transform: translateY(12px) scale(0.98);\n    }\n\n    to {\n        opacity: 1;\n        transform: translateY(0) scale(1);\n    }\n}\n\n@media (max-width: 1080px) {\n    .nav-links {\n        gap: 6px;\n    }\n\n    .nav-link {\n        padding: 8px 10px;\n        font-size: 0.82rem;\n    }\n}\n\n@media (max-width: 1024px) {\n    .hero-grid,\n    .split-layout,\n    .process-content,\n    .footer-grid {\n        grid-template-columns: 1fr;\n    }\n\n    .education-skills-grid {\n        grid-template-columns: 1fr;\n    }\n\n    .hero-portrait-card {\n        min-height: 420px;\n        place-items: center;\n    }\n\n    .carousel-slide {\n        grid-template-columns: 1fr;\n    }\n\n    .footer-grid,\n    .social-links {\n        justify-content: flex-start;\n    }\n}\n\n@media (max-width: 820px) {\n    .navbar {\n        align-items: flex-start;\n        padding-top: 14px;\n        padding-bottom: 14px;\n    }\n\n    .nav-toggle {\n        display: block;\n    }\n\n    .nav-links {\n        position: absolute;\n        top: 100%;\n        left: 0;\n        right: 0;\n        display: none;\n        flex-direction: column;\n        align-items: stretch;\n        padding: 14px 26px 20px;\n        background: rgba(247, 247, 244, 0.96);\n        border-bottom: 1px solid $line;\n    }\n\n    .nav-links.open {\n        display: flex;\n    }\n\n    .nav-link {\n        width: 100%;\n    }\n\n    .stripe {\n        padding: 74px 0;\n    }\n\n    .timeline-block {\n        grid-template-columns: 1fr;\n        justify-items: center;\n        gap: 18px;\n        text-align: center;\n    }\n\n    .school-icon {\n        width: 64px;\n        height: 64px;\n        border-radius: 14px;\n    }\n\n    .carousel {\n        grid-template-columns: 1fr;\n    }\n\n    .carousel-control {\n        position: absolute;\n        z-index: 2;\n        top: 130px;\n    }\n\n    .carousel-control.prev {\n        left: 12px;\n    }\n\n    .carousel-control.next {\n        right: 12px;\n    }\n}\n\n@media (max-width: 560px) {\n    .section-inner,\n    .navbar {\n        width: min(100% - 28px, #{$max-width});\n    }\n\n    h1 {\n        font-size: 3.1rem;\n    }\n\n    h2 {\n        font-size: 2.35rem;\n    }\n\n    .hero-actions,\n    .social-links {\n        align-items: stretch;\n        flex-direction: column;\n    }\n\n    .button,\n    .social-link {\n        width: 100%;\n    }\n\n    .experience-head,\n    .project-heading {\n        align-items: flex-start;\n        flex-direction: column;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./index.html"
/*!********************!*\
  !*** ./index.html ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "../node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/portrait-secondary.png */ "./assets/portrait-secondary.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/uiuc-icon.png */ "./assets/uiuc-icon.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/ucsb-icon.png */ "./assets/ucsb-icon.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/image.jpg */ "./assets/image.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/IMG_2742.mov */ "./assets/IMG_2742.mov"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_4___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n        <meta charset=\"utf-8\" />\n        <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <meta name=\"description\" content=\"Zhenbi's personal portfolio for CS409 MP1\">\n        <title>Zhenbi | Personal Portfolio</title>\n    </head>\n    <body>\n        <header class=\"site-header\" id=\"top\">\n            <nav class=\"navbar\" aria-label=\"Primary navigation\">\n                <a class=\"brand\" href=\"#hero\" aria-label=\"Go to top\">\n                    <span class=\"brand-mark\" aria-hidden=\"true\"></span>\n                    <span class=\"brand-text\">Zhenbi</span>\n                </a>\n                <button class=\"nav-toggle\" type=\"button\" aria-label=\"Toggle navigation\" aria-expanded=\"false\">\n                    <span></span>\n                    <span></span>\n                    <span></span>\n                </button>\n                <div class=\"nav-links\">\n                    <a class=\"nav-link active\" href=\"#hero\">About Me</a>\n                    <a class=\"nav-link\" href=\"#about\">Education</a>\n                    <a class=\"nav-link\" href=\"#projects\">Projects</a>\n                    <a class=\"nav-link\" href=\"#process\">Experience</a>\n                    <a class=\"nav-link\" href=\"#contact\">Contact</a>\n                </div>\n            </nav>\n        </header>\n\n        <main>\n            <section class=\"stripe hero-section section-observed\" id=\"hero\">\n                <div class=\"section-inner hero-grid\">\n                    <div class=\"hero-copy\">\n                        <p class=\"eyebrow\">Software Developer</p>\n                        <h1>Hi, I'm Zhenbi</h1>\n                        <p class=\"type-line\">Web & Mobile App Developer<span aria-hidden=\"true\">|</span></p>\n                        <p class=\"hero-text\">\n                            I am a computer science student and software developer with experience in full-stack web development,\n                            mobile apps, and AI-powered Q&A systems. I enjoy building practical, user-centered products with\n                            React Native, Vue, Flask, Python, JavaScript, and Java.\n                        </p>\n                        <div class=\"hero-actions\">\n                            <a class=\"button button-secondary\" href=\"assets/June_resume_newestversion.pdf\" download>Download Resume</a>\n                            <a class=\"button button-primary\" href=\"#contact\">Contact Me</a>\n                        </div>\n                    </div>\n                    <div class=\"hero-portrait-card\">\n                        <div class=\"portrait-ring\">\n                            <img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"Portrait of Zhenbi\">\n                        </div>\n                    </div>\n                </div>\n            </section>\n\n            <section class=\"stripe about-section section-observed\" id=\"about\">\n                <div class=\"section-inner split-layout\">\n                    <div class=\"resume-panel\">\n                        <p class=\"eyebrow\">Education & Skills</p>\n                        <h2></h2>\n                        <div class=\"education-skills-grid\">\n                            <article class=\"resume-column education-column\">\n                                <h3>Education</h3>\n                                <div class=\"education-list\">\n                                    <div class=\"timeline-block\">\n                                        <img class=\"school-icon\" src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\" alt=\"UIUC icon\">\n                                        <div>\n                                            <span class=\"date-pill\">Aug 2025 - Dec 2026</span>\n                                            <h4>University of Illinois Urbana-Champaign</h4>\n                                            <p>Master of Computer Science, Computer Science</p>\n                                        </div>\n                                    </div>\n                                    <div class=\"timeline-block\">\n                                        <img class=\"school-icon\" src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\" alt=\"UCSB icon\">\n                                        <div>\n                                            <span class=\"date-pill\">Sep 2021 - Apr 2025</span>\n                                            <h4>University of California, Santa Barbara</h4>\n                                            <p>Bachelor of Science, Computer Science</p>\n                                        </div>\n                                    </div>\n                                </div>\n                            </article>\n                            <button class=\"resume-column skill-modal-card open-modal\" type=\"button\" data-modal=\"languages-modal\">\n                                <span class=\"css-icon spark-icon\" aria-hidden=\"true\"></span>\n                                <h3>Programming Languages</h3>\n                                <span class=\"card-hint\">View details</span>\n                            </button>\n                            <button class=\"resume-column skill-modal-card open-modal\" type=\"button\" data-modal=\"frameworks-modal\">\n                                <span class=\"css-icon layers-icon\" aria-hidden=\"true\"></span>\n                                <h3>Frameworks</h3>\n                                <span class=\"card-hint\">View details</span>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </section>\n\n            <section class=\"stripe feature-section section-observed\" id=\"projects\">\n                <div class=\"section-inner\">\n                    <div class=\"section-heading project-heading\">\n                        <div>\n                            <p class=\"eyebrow\">Projects</p>\n                            <h2>Projects</h2>\n                        </div>\n                    </div>\n\n                    <div class=\"experience-card\">\n                        <div class=\"experience-head\">\n                        </div>\n\n                        <div class=\"carousel\" aria-roledescription=\"carousel\" aria-label=\"Featured project carousel\">\n                            <button class=\"carousel-control prev\" type=\"button\" aria-label=\"Previous project\">\n                                <span class=\"css-icon chevron-left\" aria-hidden=\"true\"></span>\n                            </button>\n                            <div class=\"carousel-viewport\">\n                                <article class=\"carousel-slide active\">\n                                    <div class=\"slide-visual car-visual\">\n                                        <span>GoldTracker app screenshot placeholder</span>\n                                    </div>\n                                    <div class=\"slide-copy\">\n                                        <p class=\"project-meta\">React Native / Expo / Firebase</p>\n                                        <h3>GoldTracker Mobile App</h3>\n                                        <p>Designed and developed an educational app for college students to track spare spaces in classes, contributing 1,000+ lines of code, 5+ pull requests, and 10+ code review comments.</p>\n                                    </div>\n                                </article>\n                                <article class=\"carousel-slide\">\n                                    <div class=\"slide-visual flow-visual\">\n                                        <span>SBUsed app screenshot placeholder</span>\n                                    </div>\n                                    <div class=\"slide-copy\">\n                                        <p class=\"project-meta\">React Native / Mobile UI</p>\n                                        <h3>SBUsedFull Mobile App</h3>\n                                        <p>Designed and developed a sell-buy app for college students, implementing search, scrolling views, card styling, filters, and intuitive mobile interactions.</p>\n                                    </div>\n                                </article>\n                                <article class=\"carousel-slide\">\n                                    <div class=\"slide-visual board-visual\">\n                                        <span>SmartAns web screenshot placeholder</span>\n                                    </div>\n                                    <div class=\"slide-copy\">\n                                        <p class=\"project-meta\">Python / Flask / HTML / CSS</p>\n                                        <h3>SmartAns Web App</h3>\n                                        <p>Built a web app for students to upload files and receive related answers based on asymmetric semantic search, with Python backend, Flask file handling, and front-end interface design.</p>\n                                    </div>\n                                </article>\n                            </div>\n                            <button class=\"carousel-control next\" type=\"button\" aria-label=\"Next project\">\n                                <span class=\"css-icon chevron-right\" aria-hidden=\"true\"></span>\n                            </button>\n                        </div>\n                        <div class=\"carousel-dots\" aria-label=\"Carousel position\"></div>\n                    </div>\n                </div>\n            </section>\n\n\n            <section class=\"stripe process-section section-observed\" id=\"process\">\n                <video class=\"demo-video\" autoplay muted loop playsinline poster=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\" aria-label=\"Abstract background video\">\n                    <source src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" type=\"video/quicktime\">\n                    Your browser does not support the video tag.\n                </video>\n                <div class=\"video-overlay\" aria-hidden=\"true\"></div>\n                <div class=\"section-inner process-content\">\n                    <div class=\"section-heading video-heading\">\n                        <p class=\"eyebrow\">Experience</p>\n                        <h2>Intern - XXX</h2>\n                        <p>June 2024 - Sep 2024</p>\n                    </div>\n                    <div class=\"process-list\">\n                        <article>\n                            <span>01</span>\n                            <h3>Java Document Processing</h3>\n                            <p>Implemented features to process and transfer users' provided text into a specific government document genre using Rouyi Model in Java, making the app more comprehensive.</p>\n                        </article>\n                        <article>\n                            <span>02</span>\n                            <h3>Vue Interface Optimization</h3>\n                            <p>Optimized project interfaces for an intelligent Q&A model in Vue, enhancing user experience.</p>\n                        </article>\n                        <article>\n                            <span>03</span>\n                            <h3>Reliability Testing</h3>\n                            <p>Conducted unit testing on knowledge base answers, improving system reliability.</p>\n                        </article>\n                    </div>\n                </div>\n            </section>\n        </main>\n\n        <footer class=\"stripe footer-section section-observed\" id=\"contact\">\n            <div class=\"section-inner footer-grid\">\n                <div>\n                    <p class=\"eyebrow\">Contact</p>\n                    <h2>Contact Me</h2>\n                    <p>Feel free to reach out to me via email, LinkedIn, or GitHub!</p>\n                </div>\n                <div class=\"social-links\" aria-label=\"Social links\">\n                    <a class=\"social-link\" href=\"https://github.com/zhenbi93\" target=\"_blank\" rel=\"noreferrer\" aria-label=\"GitHub profile\">\n                        <span class=\"css-icon github-icon\" aria-hidden=\"true\"></span>\n                        GitHub\n                    </a>\n                    <a class=\"social-link\" href=\"https://www.linkedin.com/in/zhen-bi-74363224a/\" target=\"_blank\" rel=\"noreferrer\" aria-label=\"LinkedIn profile\">\n                        <span class=\"css-icon linkedin-icon\" aria-hidden=\"true\"></span>\n                        LinkedIn\n                    </a>\n                    <a class=\"social-link\" href=\"mailto:junebi0422@gmail.com\" aria-label=\"Send email with Gmail\">\n                        <span class=\"css-icon gmail-icon\" aria-hidden=\"true\"></span>\n                        Gmail\n                    </a>\n                    <a class=\"social-link\" href=\"https://www.instagram.com/o1b_june3e/\" target=\"_blank\" rel=\"noreferrer\" aria-label=\"Instagram profile\">\n                        <span class=\"css-icon instagram-icon\" aria-hidden=\"true\"></span>\n                        Instagram\n                    </a>\n                </div>\n            </div>\n        </footer>\n\n        <div class=\"modal\" id=\"languages-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"languages-title\" aria-hidden=\"true\">\n            <div class=\"modal-panel\">\n                <button class=\"modal-close\" type=\"button\" aria-label=\"Close modal\">&times;</button>\n                <p class=\"eyebrow\">Technical Skills</p>\n                <h2 id=\"languages-title\">Programming Languages</h2>\n                <div class=\"skill-stack modal-skill-stack\" aria-label=\"Programming languages\">\n                    <span>Python</span>\n                    <span>C/C++</span>\n                    <span>JavaScript</span>\n                    <span>Java</span>\n                    <span>Ren'Py</span>\n                    <span>HTML5</span>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"modal\" id=\"frameworks-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"frameworks-title\" aria-hidden=\"true\">\n            <div class=\"modal-panel\">\n                <button class=\"modal-close\" type=\"button\" aria-label=\"Close modal\">&times;</button>\n                <p class=\"eyebrow\">Technical Skills</p>\n                <h2 id=\"frameworks-title\">Frameworks</h2>\n                <div class=\"skill-stack modal-skill-stack\" aria-label=\"Frameworks\">\n                    <span>React</span>\n                    <span>Expo</span>\n                    <span>Figma</span>\n                    <span>Flask</span>\n                    <span>Xcode</span>\n                    <span>Vue</span>\n                </div>\n            </div>\n        </div>\n    </body>\n</html>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ },

/***/ "./css/main.scss"
/*!***********************!*\
  !*** ./css/main.scss ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ },

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
(module) {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js"
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
(module) {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js"
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js"
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js"
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ },

/***/ "./assets/IMG_2742.mov"
/*!*****************************!*\
  !*** ./assets/IMG_2742.mov ***!
  \*****************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "27cc5e5d8ff57943db67.mov";

/***/ },

/***/ "./assets/image.jpg"
/*!**************************!*\
  !*** ./assets/image.jpg ***!
  \**************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "f7c3d1bc154868c1bcc8.jpg";

/***/ },

/***/ "./assets/portrait-secondary.png"
/*!***************************************!*\
  !*** ./assets/portrait-secondary.png ***!
  \***************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "48c8aec7592515715256.png";

/***/ },

/***/ "./assets/ucsb-icon.png"
/*!******************************!*\
  !*** ./assets/ucsb-icon.png ***!
  \******************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "fad883882872a2784af8.png";

/***/ },

/***/ "./assets/uiuc-campus.png"
/*!********************************!*\
  !*** ./assets/uiuc-campus.png ***!
  \********************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "a03b7e271dbdfce15941.png";

/***/ },

/***/ "./assets/uiuc-icon.png"
/*!******************************!*\
  !*** ./assets/uiuc-icon.png ***!
  \******************************/
(module) {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		let scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		const document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript?.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					let i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^https?:/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:|[?#].*$/g, "").replace(/\/[^/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = (typeof document !== 'undefined' && document.baseURI) || self.location.href;
/******/ 		
/******/ 		// no installed chunks
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	__webpack_require__.nc = undefined;
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./index.html");
/* harmony import */ var _css_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/main.scss */ "./css/main.scss");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/main.js */ "./js/main.js");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_main_js__WEBPACK_IMPORTED_MODULE_2__);
/*
 * This is the main entry point for Webpack, the compiler & dependency loader.
 * All files that are necessary for your web page and need to be 'watched' for changes should be included here!
 */

// HTML Files


// Stylesheets


// Scripts

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map