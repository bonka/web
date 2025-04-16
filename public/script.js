// JavaScript for Bare Form website
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Fade-in animation with staggered delay
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight delay based on the index for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Add fade-in class to appropriate elements
    document.querySelectorAll('.service-item, .work-item, .question-item, .testimonial-item').forEach(item => {
        if (!item.classList.contains('fade-in')) {
            item.classList.add('fade-in');
        }
    });

    // Smooth scrolling for anchor links with offset adjustment
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height dynamically
                const headerHeight = document.getElementById('header').offsetHeight;
                const offset = headerHeight + 20; // Add extra padding
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (menuBtn.classList.contains('active')) {
                        menuBtn.classList.remove('active');
                    }
                }
            }
        });
    });

    // Parallax effect for work images
    const workImages = document.querySelectorAll('.work-image img');
    
    window.addEventListener('scroll', () => {
        workImages.forEach(image => {
            const scrollPosition = window.pageYOffset;
            const imagePosition = image.getBoundingClientRect().top + scrollPosition;
            const distance = scrollPosition - imagePosition;
            
            if (Math.abs(distance) < window.innerHeight) {
                // Subtle parallax effect
                image.style.transform = `translateY(${distance * 0.05}px)`;
            }
        });
    });

    // Add hover effect for service items
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
