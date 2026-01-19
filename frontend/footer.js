// Footer Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
  setupFooterToggle();
  setupSmoothScroll();
  setupCopyToClipboard();
});

// Toggle footer sections on mobile
function setupFooterToggle() {
  const footerSections = document.querySelectorAll('.footer-section');
  
  if (window.innerWidth <= 768) {
    footerSections.forEach(section => {
      const heading = section.querySelector('h3');
      
      heading.addEventListener('click', function() {
        section.classList.toggle('collapsed');
        section.classList.toggle('toggle-active');
      });
    });
  }
}

// Smooth scroll for links
function setupSmoothScroll() {
  const footerLinks = document.querySelectorAll('footer a[href^="#"]');
  
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Copy email to clipboard functionality
function setupCopyToClipboard() {
  const contactItems = document.querySelectorAll('.contact-item[data-copy]');
  
  contactItems.forEach(item => {
    item.addEventListener('click', function() {
      const textToCopy = this.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = this.textContent;
        this.textContent = '✓ Copied!';
        
        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    });
  });
}

// Handle window resize for responsive footer toggle
window.addEventListener('resize', function() {
  const footerSections = document.querySelectorAll('.footer-section');
  
  if (window.innerWidth > 768) {
    footerSections.forEach(section => {
      section.classList.remove('collapsed', 'toggle-active');
    });
  }
});

// Scroll to top button if footer is scrolled to
function handleFooterScroll() {
  const footer = document.querySelector('footer');
  
  if (!footer) return;
  
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.id = 'scrollToTop';
  scrollToTopBtn.textContent = '↑ Top';
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #667eea;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 50px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    font-weight: bold;
    z-index: 999;
  `;
  
  document.body.appendChild(scrollToTopBtn);
  
  window.addEventListener('scroll', function() {
    const footerPosition = footer.getBoundingClientRect().top;
    
    if (footerPosition < window.innerHeight) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.pointerEvents = 'none';
    }
  });
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Initialize scroll to top functionality
handleFooterScroll();
