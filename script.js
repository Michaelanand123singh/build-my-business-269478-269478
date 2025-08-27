document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const menuButton = document.getElementById('menu-button');
  const closeButton = document.getElementById('close-button');
  const menuLinks = mobileMenu?.querySelectorAll('a');

  if (menuButton && mobileMenu && closeButton) {
    const toggleMenu = () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !expanded);
      mobileMenu.classList.toggle('hidden');
      closeButton.classList.toggle('hidden');
      menuButton.classList.toggle('hidden');

      if (!expanded) {
        // Trap focus when menu is open
        menuLinks[0]?.focus();
        document.addEventListener('keydown', trapFocus);
      } else {
        document.removeEventListener('keydown', trapFocus);
      }
    };

    const trapFocus = (e) => {
      const firstFocusable = menuLinks[0];
      const lastFocusable = menuLinks[menuLinks.length - 1];

      if (e.key === 'Tab' || e.keyCode === 9) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }

      if (e.key === 'Escape' || e.keyCode === 27) {
        toggleMenu();
        menuButton.focus();
      }
    };

    menuButton.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', toggleMenu);

    // Close menu on outside click
    document.addEventListener('click', (event) => {
      if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target) && menuButton.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
    });
  }


  // Smooth Scroll & Back to Top
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const backToTopButton = document.getElementById('back-to-top');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.remove('hidden');
      } else {
        backToTopButton.classList.add('hidden');
      }
    });

    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // Testimonial Slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  const testimonials = testimonialSlider?.querySelectorAll('.testimonial');
  const prevButton = testimonialSlider?.querySelector('.slider-prev');
  const nextButton = testimonialSlider?.querySelector('.slider-next');

  if (testimonialSlider && testimonials && prevButton && nextButton) {
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;

    const showTestimonial = (index) => {
      testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('hidden', i !== index);
      });
    };

    const nextTestimonial = () => {
      currentIndex = (currentIndex + 1) % totalTestimonials;
      showTestimonial(currentIndex);
    };

    const prevTestimonial = () => {
      currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
      showTestimonial(currentIndex);
    };

    showTestimonial(currentIndex); // Initial display

    let autoSlideInterval = setInterval(nextTestimonial, 5000);

    //Pause on hover
    testimonialSlider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    testimonialSlider.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(nextTestimonial, 5000);
    });

    prevButton.addEventListener('click', () => {
      prevTestimonial();
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextTestimonial, 5000);
    });
    nextButton.addEventListener('click', () => {
      nextTestimonial();
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextTestimonial, 5000);
    });
  }


  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('button');
    const content = item.querySelector('.faq-content');

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';

      // Close all other accordions
      faqItems.forEach(otherItem => {
        const otherButton = otherItem.querySelector('button');
        const otherContent = otherItem.querySelector('.faq-content');
        if (otherButton !== button) {
          otherButton.setAttribute('aria-expanded', 'false');
          otherContent.classList.add('hidden');
        }
      });

      // Toggle current accordion
      button.setAttribute('aria-expanded', !expanded);
      content.classList.toggle('hidden');
    });
  });


  // Email Capture Validation
  const emailForm = document.getElementById('email-capture-form');

  emailForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = emailForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    console.log('Email submitted:', email);
    emailInput.value = ''; // Clear the input
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  // UTM-aware CTA Click Logging
  const ctaButtons = document.querySelectorAll('.cta-button'); // Replace with your CTA selector

  ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
      const utmParams = getUtmParams();
      console.log('CTA Clicked with UTM:', utmParams);
      // Here you would typically send this data to your analytics provider
    });
  });

  function getUtmParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {};
    for (const [key, value] of urlParams) {
      if (key.startsWith('utm_')) {
        utmParams[key] = value;
      }
    }
    return utmParams;
  }


});