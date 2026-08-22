// ============================================
// EMBER TRATTORIA — site script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initForm('reservation-form');
  initForm('contact-form');
});

/* ---------- Mobile nav ---------- */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a link is tapped (mobile)
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Form validation + submission ----------
   Works with any form endpoint that accepts a POST with
   an "Accept: application/json" header, e.g. Formspree
   (https://formspree.io) or a custom backend.
   Replace the form's `action` attribute in the HTML with
   your own endpoint. See README.md for setup steps.
------------------------------------------------------- */
function initForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const statusBox = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const endpoint = form.getAttribute('action');
    const placeholder = !endpoint || endpoint.includes('YOUR_FORM_ID');

    try {
      if (placeholder) {
        // No real endpoint configured yet — simulate success so the
        // flow can be demoed/tested before you wire up a form service.
        await new Promise(res => setTimeout(res, 600));
        showStatus(statusBox, 'success',
          'Demo mode: this would be sent once you connect a form endpoint (see README.md).');
        form.reset();
      } else {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });

        if (response.ok) {
          showStatus(statusBox, 'success', 'Thanks — your request has been sent. We\'ll confirm shortly.');
          form.reset();
        } else {
          showStatus(statusBox, 'error', 'Something went wrong sending your request. Please try again or call us directly.');
        }
      }
    } catch (err) {
      showStatus(statusBox, 'error', 'Network error — please check your connection and try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  // Live-clear error state as the person fixes a field
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.field')?.classList.remove('invalid');
    });
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const wrapper = field.closest('.field');
    let fieldValid = field.value.trim() !== '';

    if (field.type === 'email' && fieldValid) {
      fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    }
    if (field.type === 'tel' && fieldValid) {
      fieldValid = field.value.replace(/\D/g, '').length >= 7;
    }
    if (field.type === 'date' && fieldValid) {
      const chosen = new Date(field.value);
      const today = new Date();
      today.setHours(0,0,0,0);
      fieldValid = chosen >= today;
    }

    if (!fieldValid) {
      valid = false;
      wrapper?.classList.add('invalid');
    } else {
      wrapper?.classList.remove('invalid');
    }
  });

  if (!valid) {
    form.querySelector('.invalid input, .invalid select, .invalid textarea')?.focus();
  }
  return valid;
}

function showStatus(box, type, message) {
  if (!box) return;
  box.textContent = message;
  box.className = 'form-status ' + type;
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
