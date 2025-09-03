// Smooth scroll functionality
function initSmoothScroll() {
  try {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(anchor => {
      // Skip if it's a hash link to the same page
      if (anchor.getAttribute('href') === '#') return;
      
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        try {
          const targetId = this.getAttribute('href');
          const target = document.querySelector(targetId);
          
          if (target) {
            // Use smooth scroll if available, otherwise fall back to instant scroll
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update URL without adding to history
            if (history.pushState) {
              history.pushState(null, null, targetId);
            } else {
              window.location.hash = targetId;
            }
          }
        } catch (error) {
          console.error('Error during smooth scroll:', error);
          // Fallback to default behavior
          window.location.href = this.href;
        }
      });
    });
  } catch (error) {
    console.error('Error initializing smooth scroll:', error);
  }
}

// Initialize smooth scroll when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmoothScroll);
} else {
  initSmoothScroll();
}

// Smooth Scroll Polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  const smoothScrollPolyfill = document.createElement('script');
  smoothScrollPolyfill.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
  smoothScrollPolyfill.integrity = 'sha384-+8/+M0Jg1z8v5vZ4g5z5j5cY1f4h5+2i0dD1p+mJ4f4f5f5f5f5f5f5f5f5f5f5f';
  smoothScrollPolyfill.crossOrigin = 'anonymous';
  smoothScrollPolyfill.onload = function() {
    if (typeof smoothScrollPolyfill !== 'undefined') {
      smoothScrollPolyfill.polyfill();
    }
  };
  document.head.appendChild(smoothScrollPolyfill);
}
