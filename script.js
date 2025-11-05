document.addEventListener('DOMContentLoaded', () => {
    const title = '¡Descubre Sojolo Business!';
    const text = 'Publica tus anuncios de forma gratuita con Sojolo Business. Ideal para emprendedores y empresas. ¡Descárgalo ya!';
    const url = 'https://sojololite.github.io/business/';
    const motivationalMessage = '🚀 ¡Impulsa tu negocio! Descubre Sojolo Business y publica anuncios gratis. Perfecto para emprendedores. ¡No te lo pierdas! ' + url;

    const downloadBtn = document.getElementById('downloadBtn');
    const socialButtons = document.querySelectorAll('.social-btn');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Menú hamburguesa
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace (en móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Detectar sección activa para el menú
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Funcionalidad de descarga
    downloadBtn.addEventListener('click', () => {
        if ('ga' in window) {
            gtag('event', 'download', { event_category: 'engagement', event_label: 'APK' });
        }
        console.log('📥 Inicio de descarga: Sojolo Business APK');
    });

    const shareContent = (platform) => {
        const shareUrls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(motivationalMessage)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            messenger: `fb-messenger://share/?link=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(motivationalMessage)}`,
            instagram: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
            sms: `sms:?body=${encodeURIComponent(motivationalMessage)}`
        };

        if (platform === 'copy') {
            navigator.clipboard.writeText(motivationalMessage)
                .then(() => {
                    showNotification('✅ Enlace copiado al portapapeles');
                })
                .catch(err => {
                    console.error('Error al copiar: ', err);
                    showNotification('❌ Error al copiar el enlace');
                });
            return;
        }

        if (navigator.share && (platform === 'whatsapp' || platform === 'sms')) {
            navigator.share({
                title: title,
                text: motivationalMessage,
                url: url
            }).catch(err => {
                if (err.name !== 'AbortError') {
                    console.warn('Error al compartir:', err);
                    window.open(shareUrls[platform], '_blank');
                }
            });
        } else {
            if (platform === 'messenger' && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = shareUrls[platform];
            } else {
                window.open(shareUrls[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
            }
        }
    };

    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: var(--shadow-md);
            animation: slideIn 0.3s ease;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 3000);
    };

    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = button.dataset.platform;
            shareContent(platform);
            
            if ('ga' in window) {
                gtag('event', 'share', {
                    event_category: 'social',
                    event_label: platform
                });
            }
        });
    });
});