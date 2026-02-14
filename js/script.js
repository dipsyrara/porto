// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const header = document.querySelector('.header');
    const loading = document.getElementById('loading');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const projectsScroll = document.querySelector('.projects-horizontal-scroll');
    const backToTop = document.getElementById('backToTop');

    // ===== LOADING ANIMATION =====
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loading) loading.classList.add('hidden');
        }, 500);
    });

    // ===== CUSTOM CURSOR - Optimal Balance =====
    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let outlineX = 0, outlineY = 0;

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animasi dengan speed yang pas
        function animateCursor() {
            // Dot follow lebih cepat (responsif)
            dotX += (mouseX - dotX) * 0.8;
            dotY += (mouseY - dotY) * 0.8;

            // Outline follow sedikit lebih lambat (efek trail tipis)
            outlineX += (mouseX - outlineX) * 0.5;
            outlineY += (mouseY - outlineY) * 0.5;

            cursorDot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
            cursorOutline.style.transform = `translate3d(${outlineX - 20}px, ${outlineY - 20}px, 0)`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Hover effects
        const clickables = document.querySelectorAll('a, button, .project-bento-card, .skill-tag, .social-card, .cta-button, .footer-social-link');

        clickables.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.width = '12px';
                cursorDot.style.height = '12px';
                cursorDot.style.backgroundColor = 'white';

                cursorOutline.style.width = '50px';
                cursorOutline.style.height = '50px';
                cursorOutline.style.borderColor = 'white';
                cursorOutline.style.backgroundColor = 'rgba(242, 181, 181, 0.1)';
            });

            element.addEventListener('mouseleave', () => {
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
                cursorDot.style.backgroundColor = 'var(--primary)';

                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = 'var(--primary)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });

        // Hide/show
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===== BACK TO TOP BUTTON =====
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement && header) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== PROJECTS HORIZONTAL SCROLL =====
    if (projectsScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;

        projectsScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            projectsScroll.classList.add('active');
            startX = e.pageX - projectsScroll.offsetLeft;
            scrollLeft = projectsScroll.scrollLeft;
        });

        projectsScroll.addEventListener('mouseleave', () => {
            isDown = false;
            projectsScroll.classList.remove('active');
        });

        projectsScroll.addEventListener('mouseup', () => {
            isDown = false;
            projectsScroll.classList.remove('active');
        });

        projectsScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectsScroll.offsetLeft;
            const walk = (x - startX) * 2;
            projectsScroll.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        projectsScroll.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - projectsScroll.offsetLeft;
            scrollLeft = projectsScroll.scrollLeft;
        });

        projectsScroll.addEventListener('touchend', () => {
            isDown = false;
        });

        projectsScroll.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - projectsScroll.offsetLeft;
            const walk = (x - startX) * 2;
            projectsScroll.scrollLeft = scrollLeft - walk;
        });
    }

    // ===== PARALLAX EFFECT ON HERO =====
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-png');
    const heroTitle = document.querySelector('.hero-container');

    if (hero && heroImage && heroTitle) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;

            heroImage.style.transform = `translateY(${rate * 0.3}px)`;
            heroTitle.style.transform = `translate(-50%, calc(-50% + ${rate * 0.2}px))`;
        });
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
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

    // Observe sections for fade-in effect
    document.querySelectorAll('.section:not(#hero)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe timeline rows
    document.querySelectorAll('.timeline-row').forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(50px)';
        row.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(row);
    });

    // Observe project cards
    document.querySelectorAll('.project-bento-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe contact items
    document.querySelectorAll('.contact-item, .social-card').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(item);
    });

    // ===== SKILL TAGS INTERACTION =====
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tag.style.transform = '';
            }, 200);
        });
    });

    // ===== DYNAMIC YEAR IN FOOTER =====
    const footerYear = document.querySelector('.footer-bottom .copyright');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }

    // ===== PREVENT DEFAULT FOR EMPTY LINKS =====
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => e.preventDefault());
    });

    // ===== DROPDOWN CLICK TOGGLE =====
    const dropdowns = document.querySelectorAll('.repo-dropdown');

    if (dropdowns.length > 0) {
        // Fungsi untuk menutup semua dropdown
        function closeAllDropdowns(except = null) {
            dropdowns.forEach(dropdown => {
                if (dropdown !== except) {
                    dropdown.classList.remove('active');
                }
            });
        }

        // Tambahkan tombol close ke setiap dropdown content
        dropdowns.forEach(dropdown => {
            const content = dropdown.querySelector('.repo-dropdown-content');
            if (content && !content.querySelector('.repo-dropdown-close')) {
                const closeBtn = document.createElement('div');
                closeBtn.className = 'repo-dropdown-close';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.remove('active');
                });
                content.appendChild(closeBtn);
            }
        });

        // Toggle dropdown saat button diklik
        dropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('.repo-dropdown-btn');

            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    // Jika dropdown ini sudah active, tutup saja
                    if (dropdown.classList.contains('active')) {
                        dropdown.classList.remove('active');
                    } else {
                        // Tutup dropdown lain, buka yang ini
                        closeAllDropdowns(dropdown);
                        dropdown.classList.add('active');
                    }
                });
            }

            // Mencegah dropdown tertutup saat klik di dalam content
            const content = dropdown.querySelector('.repo-dropdown-content');
            if (content) {
                content.addEventListener('click', (e) => {
                    e.stopPropagation(); // Mencegah event bubbling
                });
            }
        });

        // Tutup dropdown saat klik di luar
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.repo-dropdown')) {
                closeAllDropdowns();
            }
        });

        // Tutup dropdown dengan tombol ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllDropdowns();
            }
        });
    }

    // ===== COPY EMAIL FUNCTION =====
    window.copyEmail = function() {
        const email = "ragil@example.com"; // Ganti dengan email asli
        navigator.clipboard.writeText(email).then(() => {
            // Tampilkan notifikasi sederhana
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.innerHTML = '<i class="fas fa-check-circle"></i> Email copied to clipboard! ✨';
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 2000);
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };

    // ===== ADD TOAST NOTIFICATION STYLES =====
    const style = document.createElement('style');
    style.textContent = `
        .toast-notification {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--dark);
            color: var(--primary);
            padding: 15px 30px;
            border-radius: 50px;
            font-family: var(--font-body);
            font-size: 0.9rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border: 1px solid var(--primary);
            z-index: 10001;
            opacity: 0;
            transition: all 0.3s var(--transition-bounce);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .toast-notification.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        
        .toast-notification i {
            color: #4caf50;
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
});

// ===== PARALLAX ON MOUSEMOVE (Optional) =====
window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    const heroTitle = document.querySelector('.hero-container');
    if (heroTitle) {
        heroTitle.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    }
});