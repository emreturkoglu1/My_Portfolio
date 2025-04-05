// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70, // Account for fixed header
            behavior: 'smooth'
        });
    });
});

// Scroll Animation - FIXED
const scrollElements = document.querySelectorAll('.project-card, .about-content, .contact-content');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
    // Ensure element stays visible
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 80)) {
            displayScrollElement(el);
        }
        // Removed the else condition that was hiding elements
    });
};

// Initialize
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

window.addEventListener('load', () => {
    handleScrollAnimation();
    // Make all elements visible on load
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('active');
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }
        
        // Normally would send to a server here
        alert('Teşekkürler! Mesajınız gönderildi. En kısa sürede size dönüş yapacağım.');
        contactForm.reset();
    });
}

// Simplified fade-in function to ensure elements stay visible
const fadeIn = () => {
    document.querySelectorAll('.fade-in').forEach(element => {
        element.classList.add('active');
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
    });
};

window.addEventListener('scroll', fadeIn);
window.addEventListener('load', fadeIn);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.section-title, .hero-content, .about-text, .about-image, .project-card, .contact-info, .contact-form');
    
    animateElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Initial check for elements in view
    fadeIn();
}); 