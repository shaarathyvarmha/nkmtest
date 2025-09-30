document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const wishlistButtons = document.querySelectorAll('.wishlist-toggle');
  const wishlistCount = document.querySelector('.wishlist-count');
  const toast = document.querySelector('.toast');
  const cartButtons = document.querySelectorAll('.add-to-cart');

  // Mobile Menu toggle with slide animation
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);

    if (!expanded) {
      mobileNav.hidden = false;
      mobileNav.style.maxHeight = '0';
      // Animate open
      setTimeout(() => {
        mobileNav.style.transition = 'max-height 0.35s ease-in-out';
        mobileNav.style.maxHeight = mobileNav.scrollHeight + 'px';
      }, 10);
    } else {
      // Animate close
      mobileNav.style.maxHeight = mobileNav.scrollHeight + 'px';
      setTimeout(() => {
        mobileNav.style.transition = 'max-height 0.35s ease-in-out';
        mobileNav.style.maxHeight = '0';
      }, 10);

      mobileNav.addEventListener(
        'transitionend',
        () => {
          mobileNav.hidden = true;
          mobileNav.style.transition = '';
          mobileNav.style.maxHeight = '';
        },
        { once: true }
      );
    }
  });

  // Wishlist toggle and count update
  wishlistButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');

      const activeCount = document.querySelectorAll('.wishlist-toggle.active').length;
      wishlistCount.textContent = activeCount;

      // Optionally: toast notification
      showToast(activeCount ? 'Added to wishlist!' : 'Removed from wishlist!');
    });
  });

  // Countdown timer for flash sale
  const countdown = document.querySelector('.countdown');
  if (countdown) {
    const daysSpan = countdown.querySelector('.days');
    const hoursSpan = countdown.querySelector('.hours');
    const minsSpan = countdown.querySelector('.minutes');
    const secsSpan = countdown.querySelector('.seconds');

    // Set sale end 11 days from page load
    const endTime = Date.now() + 11 * 24 * 60 * 60 * 1000;

    function updateTimer() {
      const now = Date.now();
      let diff = Math.max(0, endTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);

      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);

      const seconds = Math.floor(diff / 1000);

      daysSpan.textContent = days.toString().padStart(2, '0');
      hoursSpan.textContent = hours.toString().padStart(2, '0');
      minsSpan.textContent = minutes.toString().padStart(2, '0');
      secsSpan.textContent = seconds.toString().padStart(2, '0');

      if (diff <= 0) {
        clearInterval(timerInterval);
      }
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
  }

  // Toast notification for add to cart + smooth animation
  cartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Item added to cart!');
    });
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    toast.style.opacity = '1';
    // Auto hide toast
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.classList.remove('show');
    }, 3000);
  }
});

navToggle.addEventListener('click', () => {
  const isActive = mobileNav.classList.contains('active');
  navToggle.setAttribute('aria-expanded', !isActive);
  if (isActive) {
    mobileNav.classList.remove('active');
    // Hide with a little timeout for transition
    setTimeout(() => {
      mobileNav.hidden = true;
    }, 300);
  } else {
    mobileNav.hidden = false;
    setTimeout(() => mobileNav.classList.add('active'), 10);
  }
});

// Animate unicorn icon near hovered top nav link
  (() => {
    const nav = document.querySelector('.nav ul');
    const icon = document.getElementById('navIcon');

    if (!nav || !icon) return;

    nav.addEventListener('mousemove', (e) => {
      const target = e.target.closest('a');
      if (!target) {
        icon.style.opacity = '0';
        return;
      }
      const rect = target.getBoundingClientRect();

      icon.style.opacity = '1';
      icon.style.top = (rect.top + window.scrollY - 55) + 'px';
      icon.style.left = (rect.left + window.scrollX + rect.width / 2 - icon.offsetWidth / 2) + 'px';
      icon.style.transform = 'translateY(0px) scale(1)';
    });

    nav.addEventListener('mouseleave', () => {
      icon.style.opacity = '0';
      icon.style.transform = 'translateY(10px) scale(0.7)';
    });
  })();