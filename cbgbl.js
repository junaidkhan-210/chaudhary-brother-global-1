
// =====================================================
// CHAUDHARY BROTHERS GLOBAL
// PREMIUM 3D WEBSITE JAVASCRIPT
// =====================================================


// 1. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (!href || href === '#') return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// 2. MOBILE MENU
const mobileMenu = document.getElementById('mobile-menu');
const navContainer = document.querySelector('header nav');

function closeMobileMenu() {
    if (navContainer && mobileMenu) {
        navContainer.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    }
}

if (mobileMenu && navContainer) {
    mobileMenu.addEventListener('click', e => {
        e.stopPropagation();

        navContainer.classList.toggle('active');

        mobileMenu.setAttribute(
            'aria-expanded',
            navContainer.classList.contains('active')
        );
    });

    document.querySelectorAll('.nav-list li a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', e => {
        if (
            !navContainer.contains(e.target) &&
            !mobileMenu.contains(e.target)
        ) {
            closeMobileMenu();
        }
    });
}


// 3. CONTACT FORM — REAL FORM SUBMISSION
const form = document.querySelector('.contact-form');

if (form) {
    form.addEventListener('submit', () => {
        const submitButton = form.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;

            if (submitButton.tagName === 'BUTTON') {
                submitButton.textContent = 'Sending...';
            } else {
                submitButton.value = 'Sending...';
            }
        }

        // Important:
        // Do not preventDefault().
        // Browser will submit the form to send.php.
    });
}


// 4. HEADER SHADOW
const header = document.querySelector('header');

function updateHeader() {
    if (header) {
        header.style.boxShadow = window.scrollY > 50
            ? '0 5px 15px rgba(0,0,0,0.4)'
            : 'none';
    }
}

window.addEventListener('scroll', updateHeader, {
    passive: true
});

updateHeader();


// 5. SETTINGS
const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
);

const mobileScreen = window.matchMedia(
    '(max-width: 768px)'
);

const desktopPointer = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
);


// 6. PREMIUM 3D SCROLL EFFECT
const sections = document.querySelectorAll(
    'section#home, section.stats, section#about, section#services, section#projects, section#contact, section.map-section'
);

function setSection3D(section, visible) {
    if (visible) {
        section.style.opacity = '1';

        section.style.transform =
            'perspective(1600px) rotateX(0deg) translateY(0px) translateZ(0px) scale(1)';
    } else {
        section.style.opacity = mobileScreen.matches
            ? '0.65'
            : '0.45';

        section.style.transform = mobileScreen.matches
            ? 'perspective(1200px) rotateX(3deg) translateY(45px) translateZ(-35px) scale(0.96)'
            : 'perspective(1600px) rotateX(9deg) translateY(90px) translateZ(-120px) scale(0.91)';
    }
}

if (
    'IntersectionObserver' in window &&
    !reducedMotion.matches
) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            setSection3D(
                entry.target,
                entry.isIntersecting
            );
        });
    }, {
        threshold: 0.08,
        rootMargin: '-5% 0px -5% 0px'
    });

    sections.forEach(section => {
        section.style.transformOrigin = 'center center';
        section.style.transformStyle = 'preserve-3d';
        section.style.backfaceVisibility = 'hidden';
        section.style.willChange = 'transform, opacity';

        section.style.transition =
            'transform 1s cubic-bezier(0.2,0.7,0.2,1), opacity 0.8s ease';

        setSection3D(section, false);
        sectionObserver.observe(section);
    });
}


// 7. SERVICE CARDS 3D HOVER
const serviceCards = document.querySelectorAll(
    '.service-card'
);

if (!reducedMotion.matches) {
    serviceCards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';

        card.style.transition =
            'transform 0.35s ease, box-shadow 0.35s ease';

        card.addEventListener('pointermove', e => {
            if (!desktopPointer.matches) return;

            const rect = card.getBoundingClientRect();

            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * 14;
            const rotateX = (0.5 - y) * 14;

            card.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;

            card.style.boxShadow =
                '0 20px 35px rgba(0,0,0,0.25)';
        });

        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}


// 8. PROJECT GALLERY 3D HOVER
const galleryImages = document.querySelectorAll(
    '.gallery img, .project-gallery img'
);

if (!reducedMotion.matches) {
    galleryImages.forEach(img => {
        img.style.transition =
            'transform 0.4s ease';

        img.style.transformStyle = 'preserve-3d';

        img.addEventListener('pointerenter', () => {
            img.style.transform =
                'perspective(800px) translateZ(20px) scale(1.04)';
        });

        img.addEventListener('pointerleave', () => {
            img.style.transform = '';
        });
    });
}


// 9. PREMIUM HERO 3D PARALLAX
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (
    hero &&
    desktopPointer.matches &&
    !reducedMotion.matches
) {
    const heroBackground = hero.querySelector(
        '.hero-bg, .hero-background, .hero-image'
    );

    hero.addEventListener('pointermove', e => {
        const rect = hero.getBoundingClientRect();

        const x =
            (e.clientX - rect.left) / rect.width - 0.5;

        const y =
            (e.clientY - rect.top) / rect.height - 0.5;

        if (heroBackground) {
            heroBackground.style.transform =
                `scale(1.08) translate3d(${x * -22}px, ${y * -22}px, 0)`;

            heroBackground.style.transition =
                'transform 0.15s ease-out';
        }

        if (heroContent) {
            heroContent.style.transform =
                `perspective(1400px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) translate3d(${x * 12}px, ${y * 12}px, 25px)`;

            heroContent.style.transition =
                'transform 0.15s ease-out';
        }
    });

    hero.addEventListener('pointerleave', () => {
        if (heroBackground) {
            heroBackground.style.transform = '';
        }

        if (heroContent) {
            heroContent.style.transform = '';
        }
    });
}


// 10. ANIMATED COUNTERS
const counters = document.querySelectorAll('.counter');

const startCounter = counter => {
    if (counter.dataset.animated === 'true') return;

    counter.dataset.animated = 'true';

    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';

    if (!Number.isFinite(target) || target <= 0) {
        counter.innerText = '0' + suffix;
        return;
    }

    let count = 0;

    const update = () => {
        count += Math.max(
            1,
            Math.ceil(target / 100)
        );

        if (count >= target) {
            counter.innerText = target + suffix;
        } else {
            counter.innerText = count + suffix;
            requestAnimationFrame(update);
        }
    };

    update();
};

if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
} else {
    counters.forEach(startCounter);
}


// 11. WELCOME MESSAGE
window.addEventListener('load', () => {
    console.log(
        'Chaudhary Brothers Global — Premium 3D Website Loaded Successfully'
    );
});
