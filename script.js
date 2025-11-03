// 🚀 Hiper-optimizado, estable y adaptable
document.addEventListener('DOMContentLoaded', () => {
  const title = '¡Descubre Sojolo Business!';
  const text = 'Publica tus anuncios de forma gratuita con Sojolo Business. Ideal para emprendedores y empresas. ¡Descárgalo ya!';
  const url = window.location.href;

  const downloadBtn = document.getElementById('downloadBtn');
  const shareFacebook = document.getElementById('shareFacebook');
  const shareTwitter = document.getElementById('shareTwitter');

  // ✅ Descarga segura
  downloadBtn.addEventListener('click', () => {
    if ('ga' in window) {
      gtag('event', 'download', { event_category: 'engagement', event_label: 'APK' });
    }
    console.log('📥 Inicio de descarga: Sojolo Business APK');
  });

  // 🌐 Compartir adaptativo
  const shareContent = (e) => {
    e.preventDefault();

    if (navigator.canShare && navigator.share) {
      navigator.share({ title, text, url })
        .catch(err => {
          if (err.name !== 'AbortError') console.warn('Share failed:', err);
        });
    } else {
      const isFacebook = e.target.closest('#shareFacebook');
      const isTwitter = e.target.closest('#shareTwitter');

      if (isFacebook) {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
          'noopener,noreferrer,width=600,height=400'
        );
      } else if (isTwitter) {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank',
          'noopener,noreferrer,width=600,height=400'
        );
      }
    }
  };

  shareFacebook.addEventListener('click', shareContent);
  shareTwitter.addEventListener('click', shareContent);
});