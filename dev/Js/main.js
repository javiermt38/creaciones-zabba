'use strict';

// Optimized lazy loading para imágenes
if('IntersectionObserver' in window){
  const images=document.querySelectorAll('img[loading="lazy"]');
  const imageObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const img=entry.target;
        img.src=img.dataset.src||img.src;
        imageObserver.unobserve(img);
      }
    });
  },{rootMargin:'50px'});
  images.forEach(img=>imageObserver.observe(img));
}

// Toggle menú hamburguesa - Optimized
const toggle=document.querySelector('.toggle');
const navigation=document.querySelector('.navigation');
const navLinks=document.querySelectorAll('.navigation a');

if(toggle){
  toggle.addEventListener('click',(e)=>{
    e.stopPropagation();
    navigation.classList.toggle('active');
  });
}

navLinks.forEach(link=>{
  link.addEventListener('click',()=>{
    navigation.classList.remove('active');
  });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click',(e)=>{
  if(!e.target.closest('nav')&&navigation.classList.contains('active')){
    navigation.classList.remove('active');
  }
});

// Performance: Defer non-critical animations
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersReducedMotion){
  document.documentElement.style.scrollBehavior='smooth';
}

// ========== WHATSAPP DYNAMIC MESSAGES ==========
function getGreeting(){
  const hour=new Date().getHours();
  if(hour>=5&&hour<12)return'Buenos días';
  if(hour>=12&&hour<18)return'Buenas tardes';
  return'Buenas noches';
}

function getProductRef(btn){
  const card=btn.closest('.card');
  const img=card.querySelector('img');
  const src=img.src;
  const match=src.match(/producto-(\d+)/);
  return match?match[1]:'';
}

function sendWhatsAppMessage(btn){
  const ref=getProductRef(btn);
  const greeting=getGreeting();
  const message=`${greeting} 👋, vengo de la página web de Creaciones ZABBA y me interesa este producto Ref:${ref}. Quiero más información 📧`;
  const encoded=encodeURIComponent(message);
  const url=`https://api.whatsapp.com/send?phone=573203473120&text=${encoded}`;
  window.open(url,'_blank');
}

function sendWhatsAppGeneral(){
  const greeting=getGreeting();
  const message=`${greeting} 👋, vengo de la página web de Creaciones ZABBA. Quiero más información sobre sus diseños 📧`;
  const encoded=encodeURIComponent(message);
  const url=`https://api.whatsapp.com/send?phone=573203473120&text=${encoded}`;
  window.open(url,'_blank');
}
