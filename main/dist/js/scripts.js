/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const autoAnimateGroups = [
        { selector: '.masthead-avatar', animation: 'zoom-in', baseDelay: 0, stagger: 0 },
        { selector: '.masthead-heading', animation: 'fade-up', baseDelay: 0.05, stagger: 0 },
        { selector: '.hero .lead', animation: 'fade-up', baseDelay: 0.12, stagger: 0 },
        { selector: '.hero .btn', animation: 'fade-up', baseDelay: 0.2, stagger: 0.08 },
        { selector: '.hero-highlights .highlight-card', animation: 'fade-up', baseDelay: 0.3, stagger: 0.12 },
        { selector: '.page-section-heading', animation: 'fade-up', baseDelay: 0, stagger: 0.05 },
        { selector: '.section-lead', animation: 'fade-up', baseDelay: 0.1, stagger: 0 },
        { selector: '.project-card', animation: 'fade-up', baseDelay: 0, stagger: 0.08 },
        { selector: '.feature-card', animation: 'fade-up', baseDelay: 0, stagger: 0.08 },
        { selector: '.publication-card', animation: 'fade-up', baseDelay: 0, stagger: 0.05 },
        { selector: '.clients-intro, .clients-grid .client-logo', animation: 'fade-up', baseDelay: 0, stagger: 0.06 },
        { selector: '.contact-card', animation: 'fade-up', baseDelay: 0, stagger: 0.08 },
        { selector: '.footer .footer-inner > *', animation: 'fade-up', baseDelay: 0, stagger: 0.08 },
    ];

    autoAnimateGroups.forEach(({ selector, animation, baseDelay = 0, stagger = 0 }) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            if (!animation) {
                return;
            }

            if (!element.dataset.animate) {
                element.dataset.animate = animation;
            }

            if (!element.dataset.animateDelay) {
                const delay = baseDelay + index * stagger;
                if (delay > 0) {
                    element.dataset.animateDelay = `${delay.toFixed(2)}s`;
                }
            }
        });
    });

    const animateTargets = document.querySelectorAll('[data-animate]');
    if (animateTargets.length) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        const reveal = (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                const element = entry.target;
                const delay = element.dataset.animateDelay;

                if (delay) {
                    element.style.transitionDelay = delay;
                }

                element.classList.add('animate-in');

                if (element.dataset.animateOnce !== 'false') {
                    observer.unobserve(element);
                }
            });
        };

        if (prefersReducedMotion.matches) {
            animateTargets.forEach(element => {
                element.classList.add('animate-in');
            });
        } else {
            const observer = new IntersectionObserver(reveal, {
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.25,
            });

            animateTargets.forEach(element => observer.observe(element));

            prefersReducedMotion.addEventListener('change', event => {
                if (event.matches) {
                    observer.disconnect();
                    animateTargets.forEach(element => element.classList.add('animate-in'));
                }
            });
        }
    }

});
