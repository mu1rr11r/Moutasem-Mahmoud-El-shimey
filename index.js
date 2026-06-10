/* ═══════════════════════════════════════════════
   MOUTASEM MAHMOUD — Interactions & Animations
════════════════════════════════════════════════ */

// ─── SCROLL BAR ───
const scrollFill = document.getElementById('scrollFill');
window.addEventListener('scroll', () => {
  const dh = document.documentElement.scrollHeight - window.innerHeight;
  scrollFill.style.width = (dh > 0 ? (window.scrollY / dh) * 100 : 0) + '%';
});

// ─── NAV SCROLL ───
const nav = document.getElementById('nav');
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
  scrollTopBtn.classList.toggle('show', window.scrollY > 600);
  const secs = document.querySelectorAll('section[id]');
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 300) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobClose = document.getElementById('mobClose');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobClose.addEventListener('click', closeMobile);
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ─── REVEAL ON SCROLL ───
const rvObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('v'), i * 80);
      rvObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-s').forEach(el => rvObs.observe(el));

// ─── COUNTER ANIMATION ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const dur = 1800;
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(ease * target) + '+';
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target + '+';
  }
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── PARALLAX HERO ───
const heroBg = document.querySelector('.hero-bg img');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.35}px) scale(1.05)`;
  }
});

// ─── PROJECT CARD HOVER ───
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const img = card.querySelector('.proj-img-wrap img');
    if (img) img.style.transform = `scale(1.05) translate(${x * -6}px, ${y * -6}px)`;
  });
  card.addEventListener('mouseleave', () => {
    const img = card.querySelector('.proj-img-wrap img');
    if (img) img.style.transform = '';
  });
});

// ─── CONTACT FORM ───
function sendMsg() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmsg').value.trim();
  if (!name || !email || !msg) {
    const btn = document.querySelector('.sub-btn');
    btn.textContent = 'Please fill all fields';
    btn.style.background = 'var(--terra)';
    btn.style.color = 'var(--cream)';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
    return;
  }
  document.getElementById('formWrap').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}
