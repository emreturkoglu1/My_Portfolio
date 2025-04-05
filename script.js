// Mobile Navigation - Improved Version
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const body = document.querySelector('body');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Toggle body scroll
    if (nav.classList.contains('nav-active')) {
        body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
        body.style.overflow = 'auto';
    }
    
    // Burger Animation
    burger.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking outside or on a link
document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-active') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target)) {
        nav.classList.remove('nav-active');
        burger.classList.remove('active');
        body.style.overflow = 'auto';
        
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('active');
            body.style.overflow = 'auto';
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Add animation for nav links
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    </style>
`);

// Smooth Scrolling - Improved for Mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Get header height for proper scrolling position
            const headerHeight = document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
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
    
    // Fix iOS initial scroll issue
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

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
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Teşekkürler! Mesajınız alınmıştır. En kısa sürede dönüş yapacağım.');
            contactForm.reset();
        });
    }
});

// Fix viewport issues on mobile
function updateViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Run initially and on resize
updateViewportHeight();
window.addEventListener('resize', updateViewportHeight);

// Define the handleScrollAnimation function
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 80)) {
            displayScrollElement(el);
        }
    });
}; 