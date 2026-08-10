// Smooth scroll effect for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Hamburger Toggle Functionality
const mobileMenu = document.getElementById('mobile-menu');
const navContainer = document.querySelector('.nav-container');

if (mobileMenu && navContainer) {
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        navContainer.classList.toggle('active');
        const isExpanded = navContainer.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking any nav link on mobile
    document.querySelectorAll('.nav-list li a').forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target) && !mobileMenu.contains(e.target)) {
            navContainer.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    });
}

// Contact Form Alert
const form = document.querySelector(".contact-form");
if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();
        alert("Thank you! Your message has been sent successfully.");
        form.reset();
    });
}

// Sticky Header Shadow
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if(header) {
        if(window.scrollY > 50){
            header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.4)";
        }else{
            header.style.boxShadow = "none";
        }
    }
});

// Fade In Animation
const revealElements = document.querySelectorAll(
    ".service-card, .gallery img, .about-content, .contact-form"
);

function revealOnScroll(){
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        if(elementTop < windowHeight - 100){
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all 0.8s ease";
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Welcome Message
window.onload = function(){
    console.log("Chaudhary Brothers Global Pvt. Limited Website Loaded Successfully");
};

// Animated Statistics Counters
const counters = document.querySelectorAll(".counter");

const startCounter = (counter)=>{
    const target = +counter.dataset.target;
    const suffix = counter.dataset.suffix || "";
    let count = 0;

    const update = ()=>{
        const increment = Math.ceil(target / 100);
        count += increment;

        if(count >= target){
            counter.innerText = target + suffix;
        }else{
            counter.innerText = count + suffix;
            requestAnimationFrame(update);
        }
    };

    update();
};

const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
},{threshold: 0.5});

counters.forEach(counter => observer.observe(counter));