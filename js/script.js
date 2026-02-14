document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    // 1. Mobile Menu Toggle
    if (menuToggle && nav && header) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            header.classList.toggle('menu-open');
            
            // Animasi icon toggle (Ganti bars jadi times/X)
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // 2. Smooth Scrolling dengan Offset Header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Tutup menu mobile otomatis setelah klik link
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    header.classList.remove('menu-open');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }

                // Hitung posisi scroll agar tidak tertutup header yang fixed
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Header Scroll Effect (Transparan ke Solid)
    window.addEventListener('scroll', () => {
        if (header) {
            // Header menjadi solid & memiliki border setelah scroll 50px
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // 4. Form Submission Logic (Optional)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Update URL backend sesuai environment kamu
            const backendUrl = 'http://localhost:5000/api/contact'; 

            formStatus.textContent = 'Sending...';
            formStatus.className = 'status-sending';

            try {
                const response = await fetch(backendUrl, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json' 
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    formStatus.textContent = result.message || 'Success! Message sent.';
                    formStatus.className = 'status-success';
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to send.');
                }
            } catch (error) {
                formStatus.textContent = 'Error: ' + error.message;
                formStatus.className = 'status-error';
                console.error('Submission Error:', error);
            }
        });
    }
});