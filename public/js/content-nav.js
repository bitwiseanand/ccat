document.addEventListener('DOMContentLoaded', () => {
  const toc = document.querySelector('.toc');
  if (!toc) return;

  const links = toc.querySelectorAll('a[href^="#"]');
  const headings = document.querySelectorAll('article h2[id], article h3[id]');

  if (headings.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px' });

  headings.forEach(h => observer.observe(h));

  // Smooth scroll
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', link.getAttribute('href'));
      }
    });
  });
});
