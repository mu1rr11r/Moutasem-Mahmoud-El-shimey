  /* ─── CURSOR ─── */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
 
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
 
  function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
 
  document.querySelectorAll('a, button, .skill-card, .project-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
 
  /* ─── PARTICLES ─── */
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
 
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
 
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1
    });
  }
 
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
 
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      ctx.fill();
    });
 
    // connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
 
  /* ─── NAV SCROLL ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
 
  /* ─── SCROLL REVEAL ─── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
 
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
 
  /* ─── SKILL BARS ─── */
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
      }
    });
  }, { threshold: 0.3 });
 
  document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));
 
  /* ─── TYPING ANIMATION ─── */
  const titles = [
    '> Angular Developer_',
    '> Node.js Engineer_',
    '> Full Stack Dev_',
    '> مطور فول ستاك_'
  ];
  let ti = 0, ci = 0, deleting = false;
  const typingEl = document.getElementById('typingEl');
 
  function typeLoop() {
    const current = titles[ti];
    if (!deleting) {
      typingEl.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
    } else {
      typingEl.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % titles.length; }
    }
    setTimeout(typeLoop, deleting ? 50 : 80);
  }
  setTimeout(typeLoop, 1500);
 
  /* ─── LANGUAGE TOGGLE ─── */
  let isAr = false;
  function toggleLang() {
    isAr = !isAr;
    document.body.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.getElementById('langBtn').textContent = isAr ? 'EN' : 'AR';
 
    document.querySelectorAll('[data-en]').forEach(el => {
      el.innerHTML = isAr ? el.dataset.ar : el.dataset.en;
    });
 
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
      el.placeholder = isAr ? el.dataset.placeholderAr : el.dataset.placeholderEn;
    });
  }
 
  /* ─── MOBILE MENU ─── */
  function openMenu() { document.getElementById('mobileMenu').classList.add('open'); }
  function closeMenu() { document.getElementById('mobileMenu').classList.remove('open'); }
 
  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });