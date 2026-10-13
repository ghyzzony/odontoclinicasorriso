(() => {
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const dialog = document.querySelector('#plan-dialog');
  const dialogTitle = document.querySelector('#dialog-title');
  const dialogPrice = document.querySelector('#dialog-price');
  const dialogFeatures = document.querySelector('#dialog-features');
  const closeDialog = document.querySelector('.dialog-close');

  const plans = {
    essencial: {
      title: 'Essencial', price: 'R$ 39,00 / mês', features: ['1 consulta por ano', '2 limpezas por ano', '1 kit de higiene oral na adesão', '10% de desconto em procedimentos básicos.']
    },
    mais: {
      title: 'Mais', price: 'R$ 59,00 / mês', features: ['2 consultas por ano', '2 limpezas por ano', '2 raios-x simples por ano', '1 urgência por ano', 'Kit de higiene oral na adesão', '20% de desconto em procedimentos básicos e 10% nos demais.']
    },
    premium: {
      title: 'Premium', price: 'R$ 79,00 / mês', features: ['2 consultas por ano', '2 limpezas por ano', '2 raios-x simples por ano', '1 urgência por ano', 'Kit de higiene oral na adesão', '25% de desconto em procedimentos básicos e 15% nos demais.']
    },
    'premium-plus': {
      title: 'Premium Plus', price: 'R$ 99,00 / mês', features: ['3 consultas por ano', '3 limpezas por ano', '3 raios-x simples por ano', '1 urgência por ano', 'Kit de higiene oral na adesão', '30% de desconto em procedimentos básicos e 20% nos demais.']
    },
    familia: {
      title: 'Clube do Sorriso Família', price: 'Condições especiais para famílias', features: ['+1 limpeza por pessoa, sem urgência', '15% de desconto em procedimentos básicos', '5% de desconto em implantes, próteses, estética e ortodontia.']
    }
  };

  function openPlan(key) {
    const plan = plans[key];
    if (!plan) return;
    dialogTitle.textContent = plan.title;
    dialogPrice.textContent = plan.price;
    dialogFeatures.innerHTML = '';
    plan.features.forEach((feature) => {
      const item = document.createElement('li');
      item.textContent = feature;
      dialogFeatures.appendChild(item);
    });
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  document.querySelectorAll('.plan-more').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.closest('[data-plan]')?.dataset.plan || button.dataset.plan;
      openPlan(key);
    });
  });

  closeDialog?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
      mainNav?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (!link) return;
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => observer.observe(section));
})();
