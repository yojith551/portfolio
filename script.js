// Add projects here as they are built. Leave links empty until they are real.
const projects = [
  { title: 'A first project, soon.', category: 'IN THE WORKS', description: 'This spot is saved for something I’ve actually made. Once my first project is ready, I can add its story, tools and links here.', technologies: ['COMING SOON'], github: '', demo: '', placeholder: true }
];
// Add a real email address here to activate the contact form.
const contactEmail = 'yojith551@gmail.com';

const projectGrid = document.querySelector('#project-grid');
projectGrid.innerHTML = projects.map(project => `
  <article class="project-card">
    <div class="project-preview" aria-label="Abstract placeholder preview for ${project.title}">
      <div class="preview-window"><div class="preview-bar"></div><div class="preview-lines"><i></i><i></i><i></i></div><div class="preview-block"></div><span class="preview-mark">${project.placeholder ? 'A+' : 'YT'}</span></div>
    </div>
    <div class="project-content"><div class="project-meta"><span>${project.category}</span><span>✳ &nbsp; PERSONAL WORK</span></div><h3>${project.title}</h3><p>${project.description}</p><div class="project-tags">${project.technologies.map(tech => `<span>${tech}</span>`).join('')}</div><div class="project-links">${project.github ? `<a href="${project.github}" target="_blank" rel="noreferrer">GitHub ↗</a>` : '<span>GitHub link to come</span>'}${project.demo ? `<a href="${project.demo}" target="_blank" rel="noreferrer">Live demo ↗</a>` : ''}</div></div>
  </article>`).join('');

document.querySelector('#year').textContent = new Date().getFullYear();
const progress = document.querySelector('.scroll-progress');
const backTop = document.querySelector('.back-top');
const cursor = document.querySelector('.cursor-bat');
let pointerX = 0, pointerY = 0, lastX = 0, lastY = 0;
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  backTop.classList.toggle('visible', scrollY > 500);
}, { passive: true });
backTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
if (matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', event => { pointerX = event.clientX; pointerY = event.clientY; cursor.style.left = `${pointerX}px`; cursor.style.top = `${pointerY}px`; });
  document.querySelectorAll('a,button').forEach(el => { el.addEventListener('pointerenter', () => cursor.classList.add('is-hover')); el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover')); });
  function cursorTilt() { const dx = pointerX - lastX, dy = pointerY - lastY; if (Math.abs(dx) + Math.abs(dy) > 1) cursor.style.rotate = `${Math.max(-20, Math.min(20, dx * .35))}deg`; lastX = pointerX; lastY = pointerY; requestAnimationFrame(cursorTilt); }
  requestAnimationFrame(cursorTilt);
}
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`)); } }), { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.section-label,.section-intro,.about-grid,.timeline-item,.achievement-band,.learn-card,.goals-row,.project-card,.project-note,.interest-card,.contact-layout').forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!contactEmail) { document.querySelector('#form-note').innerHTML = 'To activate this form, add your real email address to <code>contactEmail</code> in <code>script.js</code>.'; document.querySelector('#form-note').style.color = 'var(--brown)'; return; }
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Hello from ${data.get('name')}`);
  const body = encodeURIComponent(`${data.get('message')}\n\nReply to: ${data.get('email')}`);
  location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});

const roles = ['Computer Science Student', 'Aspiring Software Engineer', 'Python Learner', 'Technology Enthusiast'];
const roleEl = document.querySelector('#typed-role');
let roleIndex = 0, charIndex = roles[0].length, deleting = false;
function typeRole() {
  const word = roles[roleIndex];
  charIndex += deleting ? -1 : 1;
  roleEl.textContent = word.slice(0, charIndex);
  let delay = deleting ? 42 : 75;
  if (!deleting && charIndex === word.length) { deleting = true; delay = 1450; }
  else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }
  setTimeout(typeRole, delay);
}
setTimeout(typeRole, 1800);
