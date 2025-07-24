document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    // --- Mobile Menu Toggle ---
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- Smooth Scrolling for All Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // --- Throttling function to limit how often a function can run ---
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // --- Unified Scroll Handler ---
    const handleScroll = () => {
        const scrollY = window.scrollY;

        header.style.background = scrollY > 50 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)';


        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navAnchors.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    // Attach the throttled scroll handler
    window.addEventListener('scroll', throttle(handleScroll, 100));


    // --- Marquee Animation ---
    const marqueeContent = document.querySelector(".marquee-content");
    if (marqueeContent) {

        marqueeContent.innerHTML += marqueeContent.innerHTML;

        const applyMarqueeAnimation = () => {
            marqueeContent.style.animation = 'none';
            
            setTimeout(() => {
                const contentWidth = marqueeContent.scrollWidth / 2;
                const speed = 80;
                const duration = contentWidth / speed;

                const animationName = `marquee_anim_${Date.now()}`;
                const keyframes = `
                    @keyframes ${animationName} {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-${contentWidth}px); }
                    }
                `;
                
                let styleElement = document.getElementById('marquee-animations');
                if (!styleElement) {
                    styleElement = document.createElement("style");
                    styleElement.id = 'marquee-animations';
                    document.head.appendChild(styleElement);
                }
                styleElement.innerHTML = keyframes;
                
                marqueeContent.style.animation = `${animationName} ${duration}s linear infinite`;
            }, 0);
        };
        
        applyMarqueeAnimation();
        window.addEventListener('resize', applyMarqueeAnimation);
    }
});

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});