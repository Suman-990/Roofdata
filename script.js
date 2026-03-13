// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  /* ==================== RESPONSIVE NAVBAR ==================== */
  const header = document.querySelector('.header');
  const nav = document.querySelector('.navbar');
  const navMenu = document.querySelector('.nav-menu');

  // Create a mobile menu toggle button if it doesn't exist
  if (!document.querySelector('.menu-toggle')) {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    // Insert before the nav menu
    nav.insertBefore(menuToggle, navMenu);
  }

  const menuToggle = document.querySelector('.menu-toggle');

  // Toggle menu on button click
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    // Change icon between bars and times (close)
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!nav.contains(event.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  // Handle window resize: remove active class if screen becomes large
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });


  /* ==================== TYPING ANIMATION ON HERO HEADING ==================== */
  const heroTitleElement = document.querySelector('.hero-title');
  if (heroTitleElement) {
    // Get the original text content, stripping any HTML
    const originalText = heroTitleElement.textContent || heroTitleElement.innerText;
    const lines = originalText.split('\n').filter(line => line.trim() !== '');
    
    // Clear the element
    heroTitleElement.innerHTML = '';
    
    // Create first line (static)
    const line1 = document.createElement('span');
    line1.className = 'hero-line-static';
    line1.textContent = lines[0] || 'Clear Roof Data.';
    
    // Create second line (typing container)
    const line2Container = document.createElement('span');
    line2Container.className = 'hero-line-typing-container';
    line2Container.style.display = 'inline-block';
    
    const typingSpan = document.createElement('span');
    typingSpan.className = 'typed-text';
    typingSpan.textContent = '';
    line2Container.appendChild(typingSpan);
    
    // Add cursor element
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.textContent = '|';
    line2Container.appendChild(cursorSpan);
    
    // Create third line (static)
    const line3 = document.createElement('span');
    line3.className = 'hero-line-static';
    line3.textContent = lines[2] || 'Zero Risk.';
    
    // Assemble with line breaks
    heroTitleElement.appendChild(line1);
    heroTitleElement.appendChild(document.createElement('br'));
    heroTitleElement.appendChild(line2Container);
    heroTitleElement.appendChild(document.createElement('br'));
    heroTitleElement.appendChild(line3);
    
    // Text to type - the second line without any HTML
    const textToType = (lines[1] || 'Faster Decisions.').trim();
    let i = 0;
    const speed = 80; // ms per character
    
    function typeWriter() {
      if (i < textToType.length) {
        typingSpan.textContent += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        // Animation finished - make cursor disappear
        cursorSpan.style.animation = 'none'; // Remove the blinking animation
        cursorSpan.style.opacity = '0'; // Make it invisible
        // or to completely remove the cursor element:
        // cursorSpan.remove();
      }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  }


  /* ==================== SLIDE-IN ENTRY FOR HERO RIGHT IMAGE ==================== */
  const heroImage = document.querySelector('.hero-main-image');
  if (heroImage) {
    // Add a class that will trigger CSS transition
    heroImage.classList.add('slide-in-init'); // initial hidden state
    
    // Use intersection observer to trigger when hero section enters view
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            heroImage.classList.add('slide-in-active');
            observer.unobserve(heroImage); // only once
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(heroImage);
    } else {
      // Fallback: trigger after a small delay
      setTimeout(() => heroImage.classList.add('slide-in-active'), 200);
    }
  }


  /* ==================== HOVER EFFECTS ON LINKS AND BUTTONS ==================== */
  // All nav links
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'color 0.2s ease';
      this.style.color = '#ffffff';
    });
    link.addEventListener('mouseleave', function() {
      this.style.color = '#b8c1d9';
    });
  });

  // All buttons with class btn-primary, btn-secondary, footer-cta
  document.querySelectorAll('.btn-primary, .btn-secondary, .footer-cta, .hero-buttons .btn-primary, .hero-buttons .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease';
      this.style.transform = 'scale(1.02)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Additional hover for footer links
  document.querySelectorAll('.footer-column ul li a').forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'color 0.2s ease';
      this.style.color = '#ffffff';
    });
    link.addEventListener('mouseleave', function() {
      this.style.color = '#8a9aa9';
    });
  });

  // FAQ items hover (chevron subtle change)
  document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transition = 'color 0.2s ease';
        icon.style.color = '#408ed7';
      }
    });
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.color = '#b0b0b0';
      }
    });
  });

  // Simple click toggle for FAQ (open/close)
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      if (faqItem) {
        // Close all others? For simplicity, just toggle current
        faqItem.classList.toggle('faq-item-open');
        
        // Change chevron icon direction
        const icon = this.querySelector('i');
        if (faqItem.classList.contains('faq-item-open')) {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
          
          // Show the answer if it exists (you may need to create it dynamically)
          let answerDiv = faqItem.querySelector('.faq-answer');
          if (!answerDiv) {
            answerDiv = document.createElement('div');
            answerDiv.className = 'faq-answer';
            // You might want to add appropriate content here
            answerDiv.innerHTML = '<p>Answer content would go here.</p>';
            faqItem.appendChild(answerDiv);
          }
        } else {
          icon.classList.remove('fa-chevron-up');
          icon.classList.add('fa-chevron-down');
          
          // Hide the answer
          const answerDiv = faqItem.querySelector('.faq-answer');
          if (answerDiv) {
            answerDiv.remove();
          }
        }
      }
    });
  });


  /* ==================== ADDITIONAL CSS CLASSES FOR ANIMATIONS ==================== */
  
  if (!document.querySelector('#typing-keyframes')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'typing-keyframes';
    styleSheet.textContent = `
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      .cursor {
        display: inline-block;
        width: 3px;
        margin-left: 2px;
        font-weight: 100;
        color: #4d8cff;
        transition: opacity 0.3s ease;
      }
      .cursor.blinking {
        animation: blink 0.7s infinite;
      }
      .hero-line-typing-container {
        display: inline-block;
        white-space: nowrap;
      }
      .typed-text {
        font-weight: 700;
        color: #4d8cff; /* highlight color for typed part */
      }
      /* Slide-in for hero image */
      .hero-main-image.slide-in-init {
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .hero-main-image.slide-in-active {
        opacity: 1;
        transform: translateX(0);
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  // Add blinking class to cursor initially
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    cursor.classList.add('blinking');
  }
});