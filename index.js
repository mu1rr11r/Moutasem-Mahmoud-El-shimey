const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobile-menu');

hamburger.addEventListener('click',()=>{
  mobileMenu.classList.toggle('open');
});

const themeBtn=document.getElementById('theme-toggle');
themeBtn.textContent='☀️';

themeBtn.addEventListener('click',()=>{
  const html=document.documentElement;
  const isDark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',isDark?'light':'dark');
  themeBtn.textContent=isDark?'☀️':'🌙';
});

const langBtn=document.getElementById('lang-toggle');
langBtn.textContent='عربي';

langBtn.addEventListener('click',()=>{
  const html=document.documentElement;
  const isEn=html.getAttribute('data-lang')==='en';
  const newLang=isEn?'ar':'en';
  html.setAttribute('data-lang',newLang);
  html.setAttribute('dir',isEn?'rtl':'ltr');
  langBtn.textContent=isEn?'EN':'عربي';
  updateLang(newLang);
});

function updateLang(lang){
  document.querySelectorAll('[data-en],[data-ar]').forEach(el=>{
    const val=el.getAttribute('data-'+lang);
    if(val) el.innerHTML=val;
  });
  document.querySelectorAll('[data-placeholder-'+lang+']').forEach(el=>{
    el.placeholder=el.getAttribute('data-placeholder-'+lang);
  });
}

updateLang(document.documentElement.getAttribute('data-lang') || 'en');

document.querySelectorAll('.nav-link,.mobile-link').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    const target=document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    mobileMenu.classList.remove('open');
  });
});

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

const scrollTopButton=document.getElementById('scroll-top');
window.addEventListener('scroll',()=>{
  if(window.scrollY>320){
    scrollTopButton.classList.add('show');
  } else {
    scrollTopButton.classList.remove('show');
  }
});
scrollTopButton.addEventListener('click',()=>{
  window.scrollTo({top:0,left:0,behavior:'smooth'});
});