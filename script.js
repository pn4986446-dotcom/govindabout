/**
 * Govind Sharma Portfolio
 * Main JavaScript functionality
 */

// ==========================================
// PROGRESS BAR
// ==========================================

const progressBar = document.getElementById('progress');

window.addEventListener('scroll', () => {
  const scrollPercent =
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const menu = document.getElementById('menu');
const navlinks = document.getElementById('navlinks');

menu.addEventListener('click', () => {
  navlinks.classList.toggle('open');
});

// Close menu when link is clicked
navlinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navlinks.classList.remove('open');
  });
});

// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================

const navAnchors = document.querySelectorAll('.navlinks a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section[id]');

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('show');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Initial check on page load
if (document.readyState !== 'loading') {
  revealOnScroll();
}

// ==========================================
// SKILL BAR ANIMATION
// ==========================================

const bars = document.querySelectorAll('.bar b');

const animateBars = () => {
  bars.forEach((bar) => {
    if (!bar.hasAttribute('data-animated')) {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
        bar.setAttribute('data-animated', 'true');
      }
    }
  });
};

window.addEventListener('scroll', animateBars);
window.addEventListener('load', animateBars);

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const topBtn = document.getElementById('top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    topBtn.classList.add('show');
  } else {
    topBtn.classList.remove('show');
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// ==========================================
// COPY EMAIL FUNCTIONALITY
// ==========================================

const copyBtn = document.getElementById('copy');
const toast = document.getElementById('toast');

copyBtn.addEventListener('click', () => {
  const email = 'govindfinancehub@gmail.com';

  navigator.clipboard
    .writeText(email)
    .then(() => {
      toast.textContent = '✓ Email copied to clipboard';
      toast.classList.add('show', 'success');
      setTimeout(() => {
        toast.classList.remove('show', 'success');
      }, 2500);
    })
    .catch(() => {
      toast.textContent = 'Failed to copy email';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    });
});

// ==========================================
// DOCUMENT READY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Ensure page is visible
  document.body.style.opacity = '1';
});
