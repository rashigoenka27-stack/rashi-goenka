// script.js
gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor Follower
const cursor = document.getElementById('cursor');

// Only run cursor logic if it's a pointing device (desktop)
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Add hover effect for links
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });
} else {
    // Hide cursor on mobile/touch
    if (cursor) cursor.style.display = 'none';
}

// 2. Responsive Menu Logic (Mobile & Desktop Overlay)
const mobileMenu = document.getElementById('mobile-menu'); // New ID from responsive HTML
const menuToggle = document.getElementById('menu-toggle'); // Hamburger button
const closeMenu = document.getElementById('close-menu');   // Close button inside menu
const desktopMenu = document.getElementById('menu');       // Legacy ID support

/**
 * Function to Open Menu
 */
const openMenuAction = () => {
    const targetMenu = mobileMenu || desktopMenu;
    if (targetMenu) {
        gsap.to(targetMenu, { 
            x: 0, 
            duration: 0.8, 
            ease: "expo.inOut" 
        });
        // Staggered text entrance for links inside menu
        gsap.from(targetMenu.querySelectorAll('a'), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
    }
};

/**
 * Function to Close Menu
 */
const closeMenuAction = () => {
    const targetMenu = mobileMenu || desktopMenu;
    if (targetMenu) {
        gsap.to(targetMenu, { 
            x: "100%", 
            duration: 0.8, 
            ease: "expo.inOut" 
        });
    }
};

// Event Listeners for Mobile Menu
if (menuToggle) menuToggle.addEventListener('click', openMenuAction);
if (closeMenu) closeMenu.addEventListener('click', closeMenuAction);

// Event Listeners for Desktop Overlay Menu (Legacy compatibility)
const oldMenuBtn = document.getElementById('menu-btn');
const oldCloseBtn = document.getElementById('close-btn');
if (oldMenuBtn) oldMenuBtn.addEventListener('click', openMenuAction);
if (oldCloseBtn) oldCloseBtn.addEventListener('click', closeMenuAction);

// 3. Smooth Close on Link Click
// Ensures the menu closes when a user clicks a nav link
const allMenuLinks = document.querySelectorAll('#mobile-menu a, #menu a');
allMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenuAction);
});

// 4. Handle Window Resizing
// If the user resizes from mobile to desktop while menu is open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenuAction();
    }
});