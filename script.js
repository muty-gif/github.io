// REGISTRO DE PLUGINS Y SINCRONIZACIÓN LENIS + GSAP
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  anchors: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ANIMACIÓN DE ENTRADA (PRELOADER)
lenis.stop();

const introTl = gsap.timeline({
  onComplete: () => lenis.start(),
});

introTl
  .from('.preloader-name', {
    opacity: 0,
    y: 30,
    duration: 0.9,
    ease: 'power3.out',
  })
  .to('.preloader', {
    yPercent: -100,
    duration: 1,
    ease: 'power4.inOut',
    delay: 0.5,
  })
  .to(
    '.hero-reveal',
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
    },
    '-=0.6'
  );

// ANIMACIONES AL HACER SCROLL (ScrollTrigger)
gsap.utils.toArray('.reveal-up').forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
    },
  });
});

// PARALLAX SUTIL EN LA MINIATURA DEL PROYECTO
const thumb = document.querySelector('.proyecto-thumb');

if (thumb) {
  gsap.to(thumb, {
    yPercent: -12,
    ease: 'none',
    scrollTrigger: {
      trigger: thumb,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}