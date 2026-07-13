// Smooth scroll effect for navigation links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {
    
        e.preventDefault();
    
        document.querySelector(
            this.getAttribute('href')
        ).scrollIntoView({
            behavior: 'smooth'
        });
    
    });
    
    });
    
    // Contact Form Alert
    
    const form = document.querySelector(".contact-form");
    
    if(form){
    
    form.addEventListener("submit", function(e){
    
        e.preventDefault();
    
        alert(
            "Thank you! Your message has been sent successfully."
        );
    
        form.reset();
    
    });
    
    }
    
    // Sticky Header Shadow
    
    window.addEventListener("scroll", () => {
    
    const header =
        document.querySelector("header");
    
    if(window.scrollY > 50){
    
        header.style.boxShadow =
            "0 5px 15px rgba(0,0,0,0.4)";
    
    }else{
    
        header.style.boxShadow = "none";
    
    }
    
    });
    
    // Fade In Animation
    
    const revealElements = document.querySelectorAll(
    ".service-card, .gallery img, .about-content, .contact-form"
    );
    
    function revealOnScroll(){
    
    revealElements.forEach(element => {
    
        const windowHeight =
            window.innerHeight;
    
        const elementTop =
            element.getBoundingClientRect().top;
    
        if(elementTop < windowHeight - 100){
    
            element.style.opacity = "1";
            element.style.transform =
                "translateY(0)";
        }
    
    });
    
    }
    
    revealElements.forEach(element => {
    
    element.style.opacity = "0";
    
    element.style.transform =
        "translateY(40px)";
    
    element.style.transition =
        "all 0.8s ease";
    
    });
    
    window.addEventListener(
    "scroll",
    revealOnScroll
    );
    
    revealOnScroll();
    
    // Welcome Message
    
    window.onload = function(){
    
    
    console.log(
        "Chaudhary Brothers Global Pvt. Limited Website Loaded Successfully"
    );
    
    
    };