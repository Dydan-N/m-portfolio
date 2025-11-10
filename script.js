// --- ELEMEN DOM ---
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingElement = document.querySelector('.typing');
const sections = document.querySelectorAll('section');

// --- EVENT LISTENERS ---
navToggle.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', highlightActiveLink);
document.addEventListener('DOMContentLoaded', () => {
    startTypingEffect();
    observeSections();
});

// --- FUNGSI-FUNGSI ---

// 1. Toggle Menu (Mobile)
function toggleMenu() {
    navMenu.classList.toggle('show');
}

function closeMenu() {
    navMenu.classList.remove('show');
}

// 2. Typing Effect
function startTypingEffect() {
    const texts = ['Full-Stack Developer', 'Game Developer', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Jeda sebelum menghapus
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Jeda sebelum mengetik ulang
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// 3. Highlight Active Link on Scroll
function highlightActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// 4. Scroll Reveal Animation
function observeSections() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing once shown
            }
        });
    }, observerOptions);

    // Target all elements to be animated
    const animatedElements = document.querySelectorAll('.section-title, .about-content, .skills-group, .portfolio-card, .contact-info, .contact-form');
    animatedElements.forEach(el => {
        el.classList.add('hidden'); // Hide initially
        observer.observe(el);
    });
}