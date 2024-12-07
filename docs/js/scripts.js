// Smooth Scroll Implementation for anchor links
document.querySelectorAll('a.js-scroll-trigger').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ScrollReveal for animations
window.addEventListener('DOMContentLoaded', event => {
    ScrollReveal().reveal('.resume-section-content', {
        duration: 1500,
        distance: '50px',
        origin: 'bottom',
        opacity: 0,
        reset: true
    });
    
    // Collapse Navbar after clicking on a nav link (for mobile view)
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.map(function(responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

  
    
});
