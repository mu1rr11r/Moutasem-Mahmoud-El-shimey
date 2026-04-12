/* ======================== CURSOR ======================== */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.transform=`translate(${mx-4}px,${my-4}px)`;
});
(function animRing(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  ring.style.transform=`translate(${rx-18}px,${ry-18}px)`;
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.project-card,.cert-card,.achieve-card,.contact-link-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
});
 
/* ======================== CANVAS PARTICLES ======================== */
const canvas=document.getElementById('bg-canvas');
const ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize(); window.addEventListener('resize',resize);
class Particle{
  constructor(){this.reset()}
  reset(){
    this.x=Math.random()*W; this.y=Math.random()*H;
    this.size=Math.random()*1.5+0.3;
    this.vx=(Math.random()-0.5)*0.2; this.vy=(Math.random()-0.5)*0.2;
    this.opacity=Math.random()*0.5+0.1;
    this.life=0; this.maxLife=Math.random()*200+100;
  }
  update(){
    this.x+=this.vx; this.y+=this.vy; this.life++;
    if(this.life>this.maxLife||this.x<0||this.x>W||this.y<0||this.y>H) this.reset();
  }
  draw(){
    ctx.save();
    ctx.globalAlpha=this.opacity*(1-this.life/this.maxLife)*0.8;
    ctx.fillStyle='#4f9eff';
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}
for(let i=0;i<120;i++) particles.push(new Particle());
 
// draw lines between close particles
function drawConnections(){
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x;
      const dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        ctx.save();
        ctx.globalAlpha=(1-d/120)*0.07;
        ctx.strokeStyle='#7b5cf0';
        ctx.lineWidth=0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}
function animCanvas(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{p.update();p.draw()});
  drawConnections();
  requestAnimationFrame(animCanvas);
}
animCanvas();
 
/* ======================== LOADER ======================== */
const loaderName=document.getElementById('loader-name');
const loaderBar=document.getElementById('loader-bar');
const loaderPct=document.getElementById('loader-percent');
let pct=0;
// Animate name in
setTimeout(()=>{
  loaderName.style.transition='opacity 0.6s ease, transform 0.6s ease';
  loaderName.style.opacity='1';
  loaderName.style.transform='none';
},100);
const loaderInt=setInterval(()=>{
  pct+=Math.random()*4+2;
  if(pct>=100){pct=100;clearInterval(loaderInt);finishLoader()}
  loaderBar.style.width=pct+'%';
  loaderPct.textContent=Math.floor(pct)+'%';
},60);
function finishLoader(){
  setTimeout(()=>{
    const l=document.getElementById('loader');
    l.style.transition='opacity 0.8s ease, transform 0.8s ease';
    l.style.opacity='0';
    l.style.transform='translateY(-20px)';
    setTimeout(()=>{l.style.display='none'; startAnimations()},800);
  },300);
}
 
/* ======================== HERO ANIMATIONS ======================== */
function startAnimations(){
  // eyebrow
  const eyebrow=document.querySelector('.hero-eyebrow');
  eyebrow.style.transition='opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s';
  eyebrow.style.opacity='1'; eyebrow.style.transform='none';
  // name
  const heroName=document.querySelector('.hero-name');
  heroName.style.transition='opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
  heroName.style.opacity='1'; heroName.style.transform='none';
  // role
  const heroRole=document.querySelector('.hero-role');
  heroRole.style.transition='opacity 0.6s ease 0.7s';
  heroRole.style.opacity='1';
  // cta
  const heroCta=document.querySelector('.hero-cta');
  heroCta.style.transition='opacity 0.6s ease 0.9s, transform 0.6s ease 0.9s';
  heroCta.style.opacity='1'; heroCta.style.transform='none';
  // stats
  const heroStats=document.querySelector('.hero-stats');
  heroStats.style.transition='opacity 0.6s ease 1.1s, transform 0.6s ease 1.1s';
  heroStats.style.opacity='1'; heroStats.style.transform='none';
  // scroll indicator
  const heroScroll=document.querySelector('.hero-scroll');
  heroScroll.style.transition='opacity 0.6s ease 1.4s';
  heroScroll.style.opacity='0.6';
  // start typing
  setTimeout(startTyping, 800);
}
 
/* ======================== TYPING EFFECT ======================== */
const phrases_en=['Software Engineer','Frontend Developer','Angular Expert','Full Stack Builder','Problem Solver'];
const phrases_ar=['مهندس برمجيات','مطور واجهات','خبير Angular','مبرمج Full Stack','محلل مشاكل'];
let ti=0,ci=0,deleting=false;
function startTyping(){
  const el=document.getElementById('typed');
  const lang=document.documentElement.getAttribute('data-lang');
  const phrases=lang==='ar'?phrases_ar:phrases_en;
  const phrase=phrases[ti];
  if(!deleting){
    el.textContent=phrase.slice(0,ci+1); ci++;
    if(ci===phrase.length){setTimeout(()=>{deleting=true;typeLoop()},1800);return}
  } else {
    el.textContent=phrase.slice(0,ci-1); ci--;
    if(ci===0){deleting=false;ti=(ti+1)%phrases.length}
  }
  setTimeout(typeLoop, deleting?50:80);
}
function typeLoop(){startTyping()}
 
/* ======================== SCROLL REVEAL ======================== */
const revealEls=document.querySelectorAll('.reveal');
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible')}
  });
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
revealEls.forEach(el=>revealObs.observe(el));
 
/* ======================== SKILL BARS ======================== */
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar=>{
        setTimeout(()=>{bar.style.width=bar.dataset.pct+'%'},200);
      });
      skillObs.unobserve(e.target);
    }
  });
},{threshold:0.2});
document.querySelectorAll('#skills .reveal').forEach(el=>skillObs.observe(el));
 
/* ======================== TIMELINE REVEAL ======================== */
const tlObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>{
        e.target.style.transition='opacity 0.7s ease, transform 0.7s ease';
        e.target.style.opacity='1'; e.target.style.transform='none';
      },i*150);
      tlObs.unobserve(e.target);
    }
  });
},{threshold:0.1});
document.querySelectorAll('.timeline-item').forEach(el=>tlObs.observe(el));
 
/* ======================== PROJECT CARDS ======================== */
const projObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>{
        e.target.style.transition='opacity 0.7s ease, transform 0.7s ease';
        e.target.style.opacity='1'; e.target.style.transform='none';
      },i*120);
      projObs.unobserve(e.target);
    }
  });
},{threshold:0.1});
document.querySelectorAll('.project-card').forEach(el=>projObs.observe(el));
 
/* ======================== CERT CARDS ======================== */
const certObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>{
        e.target.style.transition='opacity 0.7s ease, transform 0.7s ease';
        e.target.style.opacity='1'; e.target.style.transform='none';
      },i*100);
      certObs.unobserve(e.target);
    }
  });
},{threshold:0.1});
document.querySelectorAll('.cert-card').forEach(el=>certObs.observe(el));
 
/* ======================== ACHIEVE CARDS ======================== */
const achObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>{
        e.target.style.transition='opacity 0.7s ease, transform 0.7s ease';
        e.target.style.opacity='1'; e.target.style.transform='none';
      },i*120);
      achObs.unobserve(e.target);
    }
  });
},{threshold:0.1});
document.querySelectorAll('.achieve-card').forEach(el=>achObs.observe(el));
 
/* ======================== NAVBAR SCROLL ======================== */
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60);
});
 
/* ======================== NAV LINKS ======================== */
document.querySelectorAll('.nav-link,.mobile-link').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    const target=document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    // close mobile menu
    document.getElementById('mobile-menu').classList.remove('open');
  });
});
 
/* ======================== HAMBURGER ======================== */
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobile-menu');
hamburger.addEventListener('click',()=>{
  mobileMenu.classList.toggle('open');
  if(mobileMenu.classList.contains('open')){
    document.querySelectorAll('.mobile-link').forEach((l,i)=>{
      l.style.transition=`opacity 0.4s ease ${i*0.08+0.1}s, transform 0.4s ease ${i*0.08+0.1}s`;
      l.style.opacity='1'; l.style.transform='none';
    });
  } else {
    document.querySelectorAll('.mobile-link').forEach(l=>{
      l.style.opacity='0'; l.style.transform='translateY(20px)';
    });
  }
});
 
/* ======================== THEME TOGGLE ======================== */
const themeBtn=document.getElementById('theme-toggle');
themeBtn.addEventListener('click',()=>{
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  themeBtn.textContent=isDark?'🌙':'☀️';
});
 
/* ======================== LANGUAGE TOGGLE ======================== */
const langBtn=document.getElementById('lang-toggle');
langBtn.addEventListener('click',()=>{
  const html=document.documentElement;
  const isEn=html.getAttribute('data-lang')==='en';
  const newLang=isEn?'ar':'en';
  html.setAttribute('data-lang',newLang);
  html.setAttribute('dir',isEn?'rtl':'ltr');
  langBtn.textContent=isEn?'EN':'عربي';
  updateLang(newLang);
  // restart typing
  ti=0;ci=0;deleting=false;
  document.getElementById('typed').textContent='';
  startTyping();
});
 
function updateLang(lang){
  // text elements
  document.querySelectorAll('[data-en],[data-ar]').forEach(el=>{
    const val=el.getAttribute('data-'+lang);
    if(val) el.innerHTML=val;
  });
  // section titles with spans
  document.querySelectorAll('.section-title[data-en]').forEach(el=>{
    el.innerHTML=el.getAttribute('data-'+lang);
  });
  document.querySelectorAll('.contact-info h3[data-en]').forEach(el=>{
    el.innerHTML=el.getAttribute('data-'+lang);
  });
  // placeholders
  document.querySelectorAll('[data-placeholder-'+lang+']').forEach(el=>{
    el.placeholder=el.getAttribute('data-placeholder-'+lang);
  });
  // hero name spans
  document.querySelector('.hero-name .word1').textContent=
    document.querySelector('.hero-name .word1').getAttribute('data-'+lang);
  document.querySelector('.hero-name .word2').textContent=
    document.querySelector('.hero-name .word2').getAttribute('data-'+lang);
}
 
/* ======================== CONTACT FORM ======================== */
document.getElementById('form-submit').addEventListener('click',()=>{
  const n=document.getElementById('form-name').value;
  const e=document.getElementById('form-email').value;
  const m=document.getElementById('form-msg').value;
  if(!n||!e||!m){
    const lang=document.documentElement.getAttribute('data-lang');
    alert(lang==='ar'?'يرجى ملء جميع الحقول':'Please fill all fields');
    return;
  }
  document.getElementById('form-submit').textContent='Sending...';
  setTimeout(()=>{
    document.getElementById('form-submit').style.display='none';
    const s=document.getElementById('form-success');
    s.style.display='block';
    const lang=document.documentElement.getAttribute('data-lang');
    const msg=s.querySelector('[data-'+lang+']');
    if(msg) s.innerHTML='✅ '+msg.getAttribute('data-'+lang);
  },1200);
});