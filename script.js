document.addEventListener('DOMContentLoaded', () => {
    // Initialisiere Icons
    lucide.createIcons();

    // 1. NAVBAR SCROLL EFFECT
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. MOBILE MENU TOGGLE
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    menuBtn.addEventListener('click', () => {
        const isVisible = navLinks.style.display === 'flex';
        navLinks.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'black';
            navLinks.style.padding = '20px';
        }
    });

    // 3. BEFORE / AFTER SLIDER LOGIC
    const slider = document.getElementById('comparison-slider');
    const beforeImgContainer = document.getElementById('slider-before');
    const handle = document.getElementById('slider-handle');
    const beforeImg = beforeImgContainer.querySelector('img');

    function moveSlider(e) {
        const rect = slider.getBoundingClientRect();
        let x = (e.pageX || e.touches[0].pageX) - rect.left;
        
        // Grenzen einhalten
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;

        const percent = (x / rect.width) * 100;
        beforeImgContainer.style.width = percent + '%';
        handle.style.left = percent + '%';
        
        // Verhindert das Verzerren des Bildes im Container
        beforeImg.style.width = rect.width + 'px';
    }

    // Event Listener für Maus und Touch
    let isDragging = false;
    
    const startDragging = () => isDragging = true;
    const stopDragging = () => isDragging = false;

    slider.addEventListener('mousedown', startDragging);
    slider.addEventListener('touchstart', startDragging);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveSlider(e);
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveSlider(e);
    });

    // Initiale Bildbreite setzen
    window.addEventListener('resize', () => {
        beforeImg.style.width = slider.offsetWidth + 'px';
    });
    beforeImg.style.width = slider.offsetWidth + 'px';

    // 4. FAQ ACCORDION
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
            const icon = q.querySelector('i');
            // Toggle Icon (+/-)
            if(item.classList.contains('active')) {
                q.innerHTML = q.innerText + ' <i data-lucide="minus"></i>';
            } else {
                q.innerHTML = q.innerText + ' <i data-lucide="plus"></i>';
            }
            lucide.createIcons();
        });
    });

    // 5. FADE-IN ANIMATION (Intersection Observer)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 6. DYNAMISCHE DATUMSBERECHNUNG (Dringlichkeit)
    const urgencyMsg = document.getElementById('urgency-msg');
    const now = new Date();
    const day = now.getDay(); // 0 = So, 1 = Mo...
    
    // Logik: Zeige Meldung nur Mo-Do
    if (day >= 1 && day <= 4) {
        const nextFree = new Date();
        nextFree.setDate(now.getDate() + 3);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        urgencyMsg.innerText = `Hohe Nachfrage: Nächste freie Termine ab dem ${nextFree.toLocaleDateString('de-DE', options)} verfügbar.`;
        urgencyMsg.style.display = 'block';
    } else {
        urgencyMsg.style.display = 'none';
    }
});
