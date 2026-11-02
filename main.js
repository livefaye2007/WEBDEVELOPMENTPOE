'use strict';

document.documentElement.classList.add('js-enabled');

// Shared navigation, footer year and accessible accordion behaviour.
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !expanded);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  document.querySelectorAll('[data-accordion]').forEach(group => {
    group.querySelectorAll('.accordion-trigger').forEach(button => {
      button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isOpen));
        const panel = button.closest('.accordion-item').querySelector('.accordion-panel');
        panel.hidden = isOpen;
        const icon = button.querySelector('span'); if (icon) icon.textContent = isOpen ? '＋' : '−';
      });
    });
  });

  // Product search, category filtering and sorting.
  const list = document.querySelector('#product-list');
  if (list) {
    const search = document.querySelector('#product-search');
    const category = document.querySelector('#category-filter');
    const sort = document.querySelector('#sort-products');
    const count = document.querySelector('#product-count');
    const empty = document.querySelector('#no-products');
    const cards = Array.from(list.querySelectorAll('.catalog-card'));
    const updateProducts = () => {
      const term = (search.value || '').trim().toLowerCase();
      const chosen = category.value;
      const visible = cards.filter(card => card.dataset.name.includes(term) && (chosen === 'all' || card.dataset.category === chosen));
      visible.sort((a,b) => {
        const aName = a.dataset.name, bName = b.dataset.name;
        if (sort.value === 'az') return aName.localeCompare(bName);
        if (sort.value === 'za') return bName.localeCompare(aName);
        return cards.indexOf(a) - cards.indexOf(b);
      });
      cards.forEach(card => { card.hidden = true; });
      visible.forEach(card => { card.hidden = false; list.appendChild(card); });
      count.textContent = `Showing ${visible.length} of ${cards.length} product categories`;
      empty.hidden = visible.length !== 0;
    };
    [search, category, sort].forEach(control => control.addEventListener('input', updateProducts));
    updateProducts();
  }

  // Accessible image lightbox for the product gallery.
  const lightbox = document.querySelector('#lightbox');
  if (lightbox) {
    const image = document.querySelector('#lightbox-image');
    const closeButton = lightbox.querySelector('.lightbox-close');
    let lastTrigger = null;
    const close = () => { lightbox.hidden = true; document.body.style.overflow = ''; if (lastTrigger) lastTrigger.focus(); };
    document.querySelectorAll('.gallery-open').forEach(trigger => trigger.addEventListener('click', () => {
      lastTrigger = trigger; image.src = trigger.dataset.full; image.alt = trigger.dataset.alt || '';
      lightbox.hidden = false; document.body.style.overflow = 'hidden'; closeButton.focus();
    }));
    closeButton.addEventListener('click', close);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !lightbox.hidden) close(); });
  }

  // Populate enquiry subject when a visitor follows a product enquiry link.
  const enquiryItem = document.querySelector('#enquiry-item');
  if (enquiryItem) {
    const item = new URLSearchParams(window.location.search).get('item');
    if (item) enquiryItem.value = item.slice(0, 100);
  }

  setupForm('enquiry-form', 'enquiry-status', 'info@freshharvest.co.za', 'Fresh Harvest Grocery enquiry');
  setupForm('contact-form', 'contact-status', 'info@freshharvest.co.za', 'Fresh Harvest Grocery contact message');
});

function setupForm(formId, statusId, recipient, subjectPrefix) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form || !status) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.className = 'form-status'; status.textContent = '';
    if (!form.reportValidity()) {
      status.classList.add('error'); status.textContent = 'Please correct the highlighted fields before submitting.';
      return;
    }
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    if (values['bot-field']) return;
    const subject = `${subjectPrefix} — ${values.name || 'Website visitor'}`;
    const body = Object.entries(values).filter(([key]) => !['form-name','bot-field'].includes(key)).map(([key,value]) => `${key}: ${value}`).join('\n');
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Netlify Forms processes this request after deployment. If the site is opened
    // directly from a computer (file://) or a local server, use an email fallback.
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      try {
        const encoded = new URLSearchParams();
        for (const [key, value] of data.entries()) encoded.append(key, value);
        const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encoded.toString() });
        if (!response.ok) throw new Error('Form endpoint unavailable');
        status.classList.add('success');
        status.textContent = 'Thank you. Your form was submitted successfully.';
        form.reset();
        return;
      } catch (error) {
        status.classList.add('error');
        status.textContent = 'This preview cannot send forms yet. Your email app will open with the completed message; please review and press Send.';
      }
    } else {
      status.classList.add('error');
      status.textContent = 'Local preview: your email app will open with the completed message; please review and press Send.';
    }
    window.location.href = mailto;
  });
}
