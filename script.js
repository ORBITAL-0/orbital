

// ── Nav — marcar link activo según página actual ─────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav#principal ul li a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

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
      const eased = 1 - Math.pow(1 - frame / totalFrames, 3);
      el.textContent = suffix === 'M'
        ? (Math.round(target * eased * 10) / 10) + 'M'
        : Math.floor(target * eased).toString();

      if (frame >= totalFrames) {
        el.textContent = raw;
        clearInterval(tick);
      }
    }, frameDuration);
  });
}

// menu hamburguesa en telefono //
const nav = document.querySelector('#principal');
const boton = nav.querySelector('button');
const menu = nav.querySelector('ul');

// abrir / cerrar al tocar el botón
boton.addEventListener('click', () => {
  const abierto = menu.classList.toggle('open');
  boton.setAttribute('aria-expanded', abierto);
});

// cerrar al tocar una opción del menú
menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    boton.setAttribute('aria-expanded', 'false');
  });
});

// cerrar al tocar fuera del menú
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    menu.classList.remove('open');
    boton.setAttribute('aria-expanded', 'false');
  }
});

const cardsTecnologia = document.querySelectorAll(".card-tech");

cardsTecnologia.forEach(card => {

  card.addEventListener("mouseover", () => {
    card.classList.add("card-activa");
  });

  card.addEventListener("mouseout", () => {
    card.classList.remove("card-activa");
  });

});
