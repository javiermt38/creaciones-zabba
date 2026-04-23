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
