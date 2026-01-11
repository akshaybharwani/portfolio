document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navbarDefault = document.querySelector('.navbar-default');
    const navName = document.querySelector('.navName');
    const workSection = document.getElementById('work');
    const navbarCollapse = document.getElementById('navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const collapseInstance = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

    const toggleNavBackground = () => {
        const scrolled = window.scrollY > 50;
        if (navbar) {
            navbar.classList.toggle('top-nav-collapse', scrolled);
        }
    };

    const toggleBrandVisibility = () => {
        if (!workSection || !navName || !navbarDefault) {
            return;
        }
        const triggerPoint = workSection.offsetTop - 100;
        const shouldShow = window.scrollY > triggerPoint;
        navName.style.display = shouldShow ? 'block' : 'none';
        navbarDefault.classList.toggle('navbarBG', shouldShow);
    };

    const handleScroll = () => {
        toggleNavBackground();
        toggleBrandVisibility();
    };

    // init state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Close nav on link click for mobile
    document.querySelectorAll('a.page-scroll').forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const destination = document.querySelector(targetId);
                if (destination) {
                    event.preventDefault();
                    destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
            if (collapseInstance && navbarToggler && getComputedStyle(navbarToggler).display !== 'none') {
                collapseInstance.hide();
            }
        });
    });
});