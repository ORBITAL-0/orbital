// El script está al final del body — DOM ya está disponible al ejecutarse

// ── Counter animado al hacer scroll ──────────────────────────────────────
const statsUl = document.querySelector('main>section:nth-of-type(2)>ul');
if (statsUl) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsUl);
}

function animateCounters() {
  const headings = document.querySelectorAll('main>section:nth-of-type(2)>ul li h4');
  headings.forEach(el => {
    const raw = el.textContent.trim();
    const suffix = raw.endsWith('M') ? 'M' : '';
    const target = parseFloat(raw.replace('M', ''));
    const duration = 1600;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const tick = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = suffix === 'M'
        ? (Math.round(current * 10) / 10) + 'M'
        : Math.floor(current).toString();

      if (frame >= totalFrames) {
        el.textContent = raw;
        clearInterval(tick);
      }
    }, frameDuration);
  });
}

// ── Carousel de vanguardia ───────────────────────────────────────────────
const items = document.querySelectorAll('#vanguardia ul li');
const prevBtn = document.getElementById('vanguardia-prev');
const nextBtn = document.getElementById('vanguardia-next');
const counter = document.getElementById('vanguardia-counter');

if (items.length && prevBtn && nextBtn) {
  let current = 0;

  function show(index) {
    items.forEach((item, i) => item.classList.toggle('carousel-active', i === index));
    if (counter) counter.textContent = `${index + 1} / ${items.length}`;
  }

  show(0);

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    show(current);
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % items.length;
    show(current);
  });
}
