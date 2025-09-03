// Language switching functionality
class LanguageSwitcher {
    constructor() {
        // Check URL parameter first, default to Turkish
        const urlParams = new URLSearchParams(window.location.search);
        this.currentLanguage = urlParams.get('lang') === 'en' ? 'en' : 'tr';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setLanguage(this.currentLanguage);
    }

    bindEvents() {
        // Desktop language buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.id.split('-')[1];
                this.setLanguage(lang);
            });
            
            // Keyboard support
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const lang = e.target.id.split('-')[1];
                    this.setLanguage(lang);
                }
            });
        });
        
        // Mobile language buttons
        const mobileLangButtons = document.querySelectorAll('.mobile-lang-btn');
        mobileLangButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.id.split('-')[2]; // mobile-lang-en -> en
                this.setLanguage(lang);
                // Close mobile menu after language selection
                this.closeMobileMenu();
            });
            
            // Keyboard support
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const lang = e.target.id.split('-')[2];
                    this.setLanguage(lang);
                    // Close mobile menu after language selection
                    this.closeMobileMenu();
                }
            });
        });
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        
        // Update desktop button states and ARIA attributes
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        const activeBtn = document.getElementById(`lang-${lang}`);
        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.setAttribute('aria-pressed', 'true');
        }
        
        // Update mobile button states and ARIA attributes
        document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        const activeMobileBtn = document.getElementById(`mobile-lang-${lang}`);
        if (activeMobileBtn) {
            activeMobileBtn.classList.add('active');
            activeMobileBtn.setAttribute('aria-pressed', 'true');
        }

        // Update content
        const elements = document.querySelectorAll('[data-en][data-tr]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.innerHTML = text;
                }
            }
        });

        // Update select options
        const selectOptions = document.querySelectorAll('option[data-en][data-tr]');
        selectOptions.forEach(option => {
            const text = option.getAttribute(`data-${lang}`);
            if (text) {
                option.textContent = text;
            }
        });

        // Update document language and SEO elements
        document.documentElement.lang = lang;
        
        // Update meta description for SEO
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            if (lang === 'tr') {
                metaDesc.content = 'Doç. Dr. Ender Cem Bulut, Gazi Üniversitesi Tıp Fakültesi\'nde kapsamlı ürolojik bakım sunmaktadır. Robotik cerrahi, lazer tedavileri, böbrek taşı, prostat bakımı ve minimal invaziv cerrahi konularında uzman.';
            } else {
                metaDesc.content = 'Doç. Dr. Ender Cem Bulut provides comprehensive urological care at Gazi University Medical Faculty. Specializing in urology, nephrology, kidney stones, prostate care, men\'s health, and minimally invasive surgery.';
            }
        }
        
        // Update page title for SEO
        if (lang === 'tr') {
            document.title = 'Doç. Dr. Ender Cem Bulut - Üroloji Uzmanı | Uzman Ürolojik Bakım';
        } else {
            document.title = 'Doç. Dr. Ender Cem Bulut - Urologist | Expert Urological Care';
        }
        
        // Update URL without page reload for SEO
        const url = new URL(window.location);
        if (lang === 'en') {
            // Add English parameter for sharing
            url.searchParams.set('lang', 'en');
        } else {
            // Turkish is default, remove parameter
            url.searchParams.delete('lang');
        }
        window.history.replaceState({}, '', url);
        
        // Update Open Graph meta tags dynamically for sharing
        this.updateMetaTags(lang);
    }
    
    closeMobileMenu() {
        // Find and close mobile navigation if it exists
        const mobileNav = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (mobileNav && hamburger) {
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    }

    updateMetaTags(lang) {
        // Update Open Graph title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            if (lang === 'tr') {
                ogTitle.content = 'Doç. Dr. Ender Cem Bulut - Üroloji Uzmanı | Uzman Ürolojik Bakım';
            } else {
                ogTitle.content = 'Doç. Dr. Ender Cem Bulut - Urologist | Expert Urological Care';
            }
        }

        // Update Open Graph description
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            if (lang === 'tr') {
                ogDesc.content = 'Doç. Dr. Ender Cem Bulut, Gazi Üniversitesi Tıp Fakültesi\'nde kapsamlı ürolojik bakım sunmaktadır. Robotik cerrahi, lazer tedavileri, böbrek taşı, prostat bakımı ve minimal invaziv cerrahi konularında uzman.';
            } else {
                ogDesc.content = 'Doç. Dr. Ender Cem Bulut provides comprehensive urological care at Gazi University Medical Faculty. Specializing in urology, nephrology, kidney stones, prostate care, men\'s health, and minimally invasive surgery.';
            }
        }

        // Update Twitter title
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        if (twitterTitle) {
            if (lang === 'tr') {
                twitterTitle.content = 'Doç. Dr. Ender Cem Bulut - Üroloji Uzmanı | Uzman Ürolojik Bakım';
            } else {
                twitterTitle.content = 'Doç. Dr. Ender Cem Bulut - Urologist | Expert Urological Care';
            }
        }

        // Update Twitter description
        const twitterDesc = document.querySelector('meta[property="twitter:description"]');
        if (twitterDesc) {
            if (lang === 'tr') {
                twitterDesc.content = 'Doç. Dr. Ender Cem Bulut, Gazi Üniversitesi Tıp Fakültesi\'nde kapsamlı ürolojik bakım sunmaktadır. Robotik cerrahi, lazer tedavileri, böbrek taşı, prostat bakımı ve minimal invaziv cerrahi konularında uzman.';
            } else {
                twitterDesc.content = 'Doç. Dr. Ender Cem Bulut provides comprehensive urological care at Gazi University Medical Faculty. Specializing in urology, nephrology, kidney stones, prostate care, men\'s health, and minimally invasive surgery.';
            }
        }
    }
}

// Mobile navigation functionality
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Keyboard support for hamburger menu
        this.hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleMenu();
            }
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const isExpanded = this.hamburger.getAttribute('aria-expanded') === 'true';
        this.hamburger.setAttribute('aria-expanded', !isExpanded);
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Focus management
        if (!isExpanded) {
            // Menu is opening, focus first menu item
            const firstMenuItem = this.navMenu.querySelector('a');
            if (firstMenuItem) {
                firstMenuItem.focus();
            }
        }
    }

    closeMenu() {
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Form handling with Formspree integration
class FormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.btnText = this.submitBtn?.querySelector('.btn-text');
        this.btnLoading = this.submitBtn?.querySelector('.btn-loading');
        this.messagesContainer = document.getElementById('form-messages');
        this.successMessage = document.getElementById('success-message');
        this.errorMessage = document.getElementById('error-message');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        // Validate form first
        if (!this.validateForm()) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);
        this.hideMessages();

        // Try submitting with fetch first, fallback to form submission
        this.submitWithFetch()
            .then(() => {
                this.showSuccessMessage();
                this.form.reset();
                this.setLoadingState(false);
            })
            .catch(() => {
                // Fallback: submit to hidden iframe
                this.form.submit();
                setTimeout(() => {
                    this.showSuccessMessage();
                    this.form.reset();
                    this.setLoadingState(false);
                }, 1000);
            });
    }

    async submitWithFetch() {
        const formData = new FormData(this.form);
        const response = await fetch(this.form.action, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Forms
            body: formData
        });
        // Note: no-cors means we can't read the response, but that's okay
        return Promise.resolve();
    }

    validateForm() {
        const name = this.form.querySelector('input[name="entry.822703692"]').value.trim();
        const email = this.form.querySelector('input[name="entry.735862794"]').value.trim();
        const phone = this.form.querySelector('input[name="entry.1627089863"]').value.trim();
        const service = this.form.querySelector('select[name="entry.2122743812"]').value;

        // Name is required
        if (!name) {
            const message = this.currentLanguage === 'tr' ? 
                'Ad Soyad gereklidir. Lütfen tam adınızı girin.' : 
                'Name is required. Please enter your full name.';
            this.showErrorMessage(message);
            return false;
        }

        // Phone is required
        if (!phone) {
            const message = this.currentLanguage === 'tr' ? 
                'Telefon numarası gereklidir. Lütfen telefon numaranızı girin.' : 
                'Phone number is required. Please enter your phone number.';
            this.showErrorMessage(message);
            return false;
        }

        // Email validation (if provided)
        if (email && !this.isValidEmail(email)) {
            const message = this.currentLanguage === 'tr' ? 
                'Lütfen geçerli bir e-posta adresi girin.' : 
                'Please enter a valid email address.';
            this.showErrorMessage(message);
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setLoadingState(loading) {
        if (this.submitBtn && this.btnText && this.btnLoading) {
            this.submitBtn.disabled = loading;
            if (loading) {
                this.btnText.style.display = 'none';
                this.btnLoading.style.display = 'flex';
            } else {
                this.btnText.style.display = 'inline';
                this.btnLoading.style.display = 'none';
            }
        }
    }

    hideMessages() {
        if (this.messagesContainer) {
            this.messagesContainer.style.display = 'none';
        }
        if (this.successMessage) {
            this.successMessage.style.display = 'none';
        }
        if (this.errorMessage) {
            this.errorMessage.style.display = 'none';
        }
    }

    showSuccessMessage() {
        if (this.messagesContainer && this.successMessage) {
            this.messagesContainer.style.display = 'block';
            this.successMessage.style.display = 'flex';
            this.scrollToMessages();
        }
    }

    showErrorMessage(customMessage = null) {
        if (this.messagesContainer && this.errorMessage) {
            this.messagesContainer.style.display = 'block';
            this.errorMessage.style.display = 'flex';
            
            // Update message if custom message provided
            if (customMessage) {
                const messageSpan = this.errorMessage.querySelector('span');
                if (messageSpan) {
                    messageSpan.textContent = customMessage;
                }
            }
            
            this.scrollToMessages();
        }
    }

    scrollToMessages() {
        if (this.messagesContainer) {
            setTimeout(() => {
                this.messagesContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        }
    }
}

// Navbar scroll effect
class NavbarScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        if (this.navbar) {
            this.bindEvents();
        }
    }

    bindEvents() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove shadow based on scroll position
            if (scrollTop > 10) {
                this.navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                this.navbar.style.boxShadow = 'none';
                this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }

            lastScrollTop = scrollTop;
        });
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.service-card, .contact-item, .stat-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Loading animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Add loading class to body initially
        document.body.classList.add('loading');

        // Remove loading class when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
            }, 300);
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
    new MobileNavigation();
    new SmoothScroll();
    new FormHandler();
    new NavbarScrollEffect();
    new ScrollAnimations();
    new LoadingAnimation();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    // Close mobile menu if open
    const mobileNav = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (mobileNav && hamburger) {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileNav = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (mobileNav && hamburger && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Prevent flash of unstyled content
document.documentElement.style.visibility = 'visible';

