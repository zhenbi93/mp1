const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinksWrap = document.querySelector('.nav-links');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('.section-observed'));
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const dotsWrap = document.querySelector('.carousel-dots');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const modalButtons = Array.from(document.querySelectorAll('.open-modal'));
const modals = Array.from(document.querySelectorAll('.modal'));
let currentSlide = 0;

function setNavbarState() {
    navbar.classList.toggle('compact', window.scrollY > 36);
}

function setActiveNavLink() {
    const probeLine = window.scrollY + navbar.offsetHeight + 12;
    let activeSection = sections[0];

    sections.forEach((section) => {
        if (section.offsetTop <= probeLine) {
            activeSection = section;
        }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        activeSection = sections[sections.length - 1];
    }

    navLinks.forEach((link) => {
        const targetId = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', targetId === activeSection.id);
    });
}

function getCompactNavHeight() {
    const wasCompact = navbar.classList.contains('compact');
    navbar.classList.add('compact');
    const compactHeight = navbar.offsetHeight;

    if (!wasCompact && window.scrollY <= 36) {
        navbar.classList.remove('compact');
    }

    return compactHeight;
}

function setActiveNavLinkById(sectionId) {
    navLinks.forEach((link) => {
        const targetId = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', targetId === sectionId);
    });
}

function updateOnScroll() {
    setNavbarState();
    setActiveNavLink();
}

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === currentSlide);
    });

    Array.from(dotsWrap.children).forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === currentSlide);
        dot.setAttribute('aria-current', dotIndex === currentSlide ? 'true' : 'false');
    });
}

function buildCarouselDots() {
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show slide ${index + 1}`);
        dot.addEventListener('click', () => showSlide(index));
        dotsWrap.appendChild(dot);
    });
    showSlide(0);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
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

navToggle.addEventListener('click', () => {
    const isOpen = navLinksWrap.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            event.preventDefault();
            const top = targetSection.offsetTop - getCompactNavHeight() + 1;
            window.scrollTo({ top, behavior: 'smooth' });
            window.history.pushState(null, '', `#${targetId}`);
            setActiveNavLinkById(targetId);
        }

        navLinksWrap.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

modalButtons.forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.modal));
});

modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('modal-close')) {
            closeModal(modal);
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modals.filter((modal) => modal.classList.contains('open')).forEach(closeModal);
    }

    if (event.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
    }

    if (event.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
    }
});

window.addEventListener('scroll', updateOnScroll, { passive: true });
window.addEventListener('resize', setActiveNavLink);

buildCarouselDots();
updateOnScroll();
