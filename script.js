// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // --- 3. Active Navigation Highlighting ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Navbar Background Change
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.background = '#0d0d0d';
                nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
                nav.style.padding = '0.8rem 5%';
            } else {
                nav.style.background = '#1a1a1a';
                nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
                nav.style.padding = '0 5%';
            }
        }
    });

    // --- 4. General Fade-In Animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .section-title, .contact-item, .about-text, .about-image, .team-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animationObserver.observe(el);
    });

    // --- 5. Service Button Interactions (Home Page Only) ---
    const serviceButtons = document.querySelectorAll('.service-btn, .service-link');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.tagName === 'A' && button.getAttribute('href').startsWith('#')) {
                return; 
            }

            e.preventDefault();
            const serviceName = button.closest('.service-card').querySelector('h3').textContent;
            
            alert(`Thank you for your interest in ${serviceName}! \n\nPlease fill out the contact form below or call us at +1 (234) 567-890.`);
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 6. Number Counter Animation (About Page Only) ---
    const counters = document.querySelectorAll('.counter-number');
    
    if (counters.length > 0) {
        const speed = 200;
        
        const startCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace('+', '');
                    
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCount();
            });
        };

        const counterSection = document.querySelector('.counter-section');
        if (counterSection) {
            const counterObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    startCounters();
                    counterObserver.unobserve(counterSection);
                }
            }, { threshold: 0.5 });

            counterObserver.observe(counterSection);
        }
    }

    console.log('✅ Pet Care Website JS Loaded Successfully!');
});
// --- 7. Form Handling (Booking & Contact) ---
const bookingForm = document.getElementById('bookingForm');
const contactForm = document.getElementById('contactForm');

function handleFormSubmit(e, formName) {
    e.preventDefault();
    alert(`Thank you! Your ${formName} has been received. We will contact you shortly.`);
    e.target.reset();
}

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => handleFormSubmit(e, 'booking request'));
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'message'));
}
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. Hero Slider Functionality (The Arrows) ---
    const heroSection = document.querySelector('.hero');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    
    // Define your slides (Images, Titles, Subtitles)
    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1920',
            title: 'Keep Your Pet Happy',
            subtitle: 'Duo minimuy et dolor tempor no et. Diam sit diam sit diam erat.'
        },
        {
            image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920',
            title: 'Professional Grooming',
            subtitle: 'Expert care for your furry friends with our certified groomers.'
        },
        {
            image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=1920',
            title: 'Veterinary Services',
            subtitle: 'Top-notch medical care to keep your pets healthy and active.'
        }
    ];

    let currentSlide = 0;

    function updateSlide(index) {
        // Fade out effect
        if (heroSection) {
            heroSection.style.opacity = '0.8';
            setTimeout(() => {
                // Change content
                heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${slides[index].image}')`;
                if (heroTitle) heroTitle.textContent = slides[index].title;
                if (heroSubtitle) heroSubtitle.textContent = slides[index].subtitle;
                
                // Fade in effect
                heroSection.style.opacity = '1';
                heroSection.style.transition = 'opacity 0.5s ease, background-image 0.5s ease';
            }, 200);
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    }

    if (arrowRight) {
        arrowRight.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (arrowLeft) {
        arrowLeft.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Auto Play Slider every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    function resetAutoPlay() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // --- 3. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // If it's a real page link (e.g., about.html), don't prevent default
            if (targetId && !targetId.startsWith('#')) {
                return; 
            }
            
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // --- 4. Button Actions (Book Now & Learn More) ---
    const btnBook = document.querySelector('.btn-book');
    const btnLearn = document.querySelector('.btn-learn');

    if (btnBook) {
        btnBook.addEventListener('click', (e) => {
            // If href is set, let it work naturally, otherwise redirect
            if (!btnBook.getAttribute('href') || btnBook.getAttribute('href') === '#') {
                e.preventDefault();
                window.location.href = 'booking.html'; // Redirect to booking page
            }
        });
    }

    if (btnLearn) {
        btnLearn.addEventListener('click', (e) => {
            if (!btnLearn.getAttribute('href') || btnLearn.getAttribute('href') === '#') {
                e.preventDefault();
                // If on home page, scroll to services
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else {
                    // If on other pages, go to services page
                    window.location.href = 'services.html';
                }
            }
        });
    }

    // --- 5. Active Navigation Highlighting ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Navbar Background Change
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.background = '#0d0d0d';
                nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
                nav.style.padding = '0.8rem 5%';
            } else {
                nav.style.background = '#1a1a1a';
                nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
                nav.style.padding = '0 5%';
            }
        }
    });

    // --- 6. General Fade-In Animations ---
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .section-title, .contact-item, .about-text, .about-image, .team-card, .price-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animationObserver.observe(el);
    });

    // --- 7. Number Counter Animation (About Page Only) ---
    const counters = document.querySelectorAll('.counter-number');
    if (counters.length > 0) {
        const speed = 200;
        const startCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace('+', '');
                    const inc = target / speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCount();
            });
        };
        const counterSection = document.querySelector('.counter-section');
        if (counterSection) {
            const counterObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    startCounters();
                    counterObserver.unobserve(counterSection);
                }
            }, { threshold: 0.5 });
            counterObserver.observe(counterSection);
        }
    }

    // --- 8. Form Handling ---
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');

    function handleFormSubmit(e, formName) {
        e.preventDefault();
        alert(`Thank you! Your ${formName} has been received. We will contact you shortly.`);
        e.target.reset();
    }

    if (bookingForm) bookingForm.addEventListener('submit', (e) => handleFormSubmit(e, 'booking request'));
    if (contactForm) contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'message'));

    console.log('✅ Pet Care Website Fully Functional!');
});