/* =====================================================
   SABOOR MUSTAFA — SENIOR SDET PORTFOLIO
   ===================================================== */

/* === TYPEWRITER === */
const phrases = [
  'Senior SDET',
  'Playwright Expert',
  'Automation Architect',
  'CI/CD Specialist',
  'Mobile Test Engineer',
  'Quality Engineer'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const current = phrases[phraseIdx];
  typeEl.textContent = deleting
    ? current.slice(0, charIdx--)
    : current.slice(0, charIdx++);

  if (!deleting && charIdx > current.length) {
    setTimeout(() => { deleting = true; typeWriter(); }, 2200);
    return;
  }
  if (deleting && charIdx < 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    charIdx = 0;
    setTimeout(typeWriter, 480);
    return;
  }
  setTimeout(typeWriter, deleting ? 55 : 95);
}
typeWriter();

/* === PARTICLE CANVAS === */
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PARTICLE_COUNT = 55;
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.8 + 0.4,
  dx: (Math.random() - 0.5) * 0.35,
  dy: (Math.random() - 0.5) * 0.35,
  o: Math.random() * 0.45 + 0.1
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,212,255,${p.o})`;
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q    = particles[j];
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(0,212,255,${0.07 * (1 - dist / 130)})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* === SCROLL PROGRESS === */
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const total    = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = ((window.scrollY / total) * 100) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* === NAVBAR === */
const navbar   = document.getElementById('navbar');
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const spans    = toggle.querySelectorAll('span');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)'  : '';
  spans[1].style.opacity   = open ? '0' : '';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* === CUSTOM CURSOR === */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .project-card, .skill-pill, .highlight-card, .cert-card, .meth-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity  = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity  = '1';
  cursorRing.style.opacity = '1';
});

/* === ACTIVE NAV LINK ON SCROLL === */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}, { passive: true });

/* === COUNTER ANIMATION === */
function animateCounter(el, target) {
  const duration = 1600;
  const step     = target / (duration / 16);
  let current    = 0;
  const timer    = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, parseInt(entry.target.dataset.count, 10));
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObs.observe(el));

/* === AOS (Animate On Scroll) — lightweight custom === */
const aosObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delayAttr = entry.target.dataset.aosDelay;
      const delay     = delayAttr ? parseFloat(delayAttr) * 1000 : 0;
      setTimeout(() => entry.target.classList.add('aos-animate'), delay);
      aosObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => aosObs.observe(el));

/* === BACK TO TOP === */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 450);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* === SMOOTH SCROLL for anchor links === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
