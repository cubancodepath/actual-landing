import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // ----------------------------------------------------------------
  // Navbar scroll effect
  // ----------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        navbar.classList.toggle('scrolled', self.progress > 0);
      },
    });
  }

  // ----------------------------------------------------------------
  // Fade-up animations for [data-animate="fade-up"]
  // ----------------------------------------------------------------
  const fadeUpElements = document.querySelectorAll('[data-animate="fade-up"]');
  fadeUpElements.forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-delay') || '0');
    gsap.set(el, { opacity: 0, y: 40 });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  // ----------------------------------------------------------------
  // Hero device — float + 3D tilt
  // ----------------------------------------------------------------
  const heroDevice = document.getElementById('hero-device');
  if (heroDevice) {
    gsap.to(heroDevice, {
      y: -12,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    const xTo = gsap.quickTo(heroDevice, 'rotateY', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(heroDevice, 'rotateX', { duration: 0.5, ease: 'power2.out' });
    gsap.set(heroDevice, { transformPerspective: 800 });

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        xTo(x * 12);
        yTo(-y * 8);
      });
      heroSection.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    }
  }

  // ----------------------------------------------------------------
  // Hero glow parallax
  // ----------------------------------------------------------------
  const heroGlow = document.querySelector('.device-glow') as HTMLElement;
  if (heroGlow) {
    gsap.to(heroGlow, {
      y: 80,
      scale: 1.3,
      opacity: 0.4,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // ----------------------------------------------------------------
  // Feature cards hover
  // ----------------------------------------------------------------
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.03, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });

  // ----------------------------------------------------------------
  // Feature icons — flip-in
  // ----------------------------------------------------------------
  const featureIcons = document.querySelectorAll('.feature-icon');
  featureIcons.forEach((icon) => {
    gsap.from(icon, {
      rotateY: 90,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: icon, start: 'top 85%', once: true },
    });
  });

  // ----------------------------------------------------------------
  // Step numbers counter
  // ----------------------------------------------------------------
  const stepNumbers = document.querySelectorAll('.step-number span');
  stepNumbers.forEach((span) => {
    const text = span.textContent || '';
    gsap.from(span, {
      textContent: '00',
      duration: 1.2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: { trigger: span, start: 'top 80%', once: true },
      onComplete() { span.textContent = text; },
    });
  });

  // ----------------------------------------------------------------
  // Step connectors — draw-in
  // ----------------------------------------------------------------
  const stepConnectors = document.querySelectorAll('.step-connector');
  stepConnectors.forEach((connector) => {
    gsap.from(connector, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: connector, start: 'top 80%', once: true },
    });
  });

  // ----------------------------------------------------------------
  // Screenshot frames — 3D tilt on hover
  // ----------------------------------------------------------------
  const screenshotFrames = document.querySelectorAll('.screenshot-frame');
  screenshotFrames.forEach((frame) => {
    const el = frame as HTMLElement;
    gsap.set(el, { transformPerspective: 600 });

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, { rotateY: x * 10, rotateX: -y * 6, duration: 0.3, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
    });
  });

  // ----------------------------------------------------------------
  // Waitlist glow — breathe
  // ----------------------------------------------------------------
  const waitlistGlow = document.querySelector('.waitlist-glow') as HTMLElement;
  if (waitlistGlow) {
    gsap.to(waitlistGlow, {
      scale: 1.2,
      opacity: 0.6,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }

} else {
  // Reduced motion — show everything immediately
  const hidden = document.querySelectorAll('[data-animate]');
  hidden.forEach((el) => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });

  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }
}
