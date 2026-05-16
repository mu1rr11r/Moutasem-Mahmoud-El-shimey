/* ─── PARTICLES ─── */
(function(){
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
 
  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
 
  const colors = ['#ff6b35','#00b4d8','#ff85b3','#2dc653','#ffc43d','#9b5de5'];
 
  for(let i=0;i<55;i++){
    particles.push({
      x: Math.random()*2000, y: Math.random()*2000,
      r: Math.random()*3+1,
      vx: (Math.random()-.5)*.4,
      vy: (Math.random()-.5)*.4,
      color: colors[Math.floor(Math.random()*colors.length)],
      alpha: Math.random()*.5+.2
    });
  }
 
  function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x%w, p.y%h, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
 
/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=> e.target.classList.add('visible'), i*80);
    }
  });
},{threshold:.12});
revealEls.forEach(el=>revealObs.observe(el));
 
/* ─── SKILL BARS ─── */
const barObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.progress-fill').forEach(bar=>{
        bar.style.width = bar.dataset.pct+'%';
      });
    }
  });
},{threshold:.3});
const skillsGrid = document.getElementById('skillsGrid');
if(skillsGrid) barObs.observe(skillsGrid);
 
/* ─── COUNTER ANIMATION ─── */
function animateCounters(){
  document.querySelectorAll('.stat-num[data-target]').forEach(el=>{
    const target = parseInt(el.dataset.target);
    let start = 0;
    const dur = 1600;
    const step = (timestamp)=>{
      if(!start) start = timestamp;
      const prog = Math.min((timestamp-start)/dur, 1);
      el.textContent = Math.floor(prog*target)+(target>5?'+':'+');
      if(prog<1) requestAnimationFrame(step);
      else el.textContent = target+'+';
    };
    requestAnimationFrame(step);
  });
}
setTimeout(animateCounters, 800);
 
/* ─── SCROLL TO TOP ─── */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll',()=>{
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});
 
/* ─── NAV ACTIVE LINK ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{
    if(window.scrollY >= s.offsetTop - 200) cur = s.id;
  });
  navLinks.forEach(a=>{
    a.style.background = a.getAttribute('href')==='#'+cur ? 'var(--dark)' : '';
    a.style.color = a.getAttribute('href')==='#'+cur ? '#fff' : '';
  });
});
 
/* ─── FORM ─── */
function sendMsg(){
  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();
  if(!name||!email||!msg){ alert('Please fill in all fields!'); return; }
  document.getElementById('formContent').style.display='none';
  document.getElementById('formSuccess').style.display='block';
}
 
/* ─── SMOOTH NAV HIGHLIGHT ON LOAD ─── */
window.dispatchEvent(new Event('scroll'));