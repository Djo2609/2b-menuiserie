/* 2B Menuiserie — scripts du site (chargé en defer, aucune dépendance) */
(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.setAttribute('data-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Apparition au défilement ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Filtres de la galerie (realisations.html) ---------- */
  var filters = document.querySelectorAll('.filter');
  var status = document.getElementById('filter-status');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      var shown = 0;
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      document.querySelectorAll('#gallery .project').forEach(function (p) {
        var match = cat === 'tout' || p.getAttribute('data-cat') === cat;
        p.hidden = !match;
        if (match) { shown++; p.classList.add('is-in'); }
      });
      if (status) status.textContent = shown + ' réalisation' + (shown > 1 ? 's' : '') + ' affichée' + (shown > 1 ? 's' : '');
    });
  });

  /* ---------- Formulaire de devis : validation accessible ---------- */
  var form = document.getElementById('devis');
  if (form) {
    var rules = [
      { id: 'nom', err: 'nom-err', msg: 'Indiquez votre nom pour que je sache à qui répondre.' },
      { id: 'tel', err: 'tel-err', msg: 'Indiquez un numéro de téléphone (ex. 06 12 34 56 78).', test: function (v) { return v.replace(/[^\d+]/g, '').length >= 10; } },
      { id: 'email', err: 'email-err', msg: 'Indiquez une adresse e-mail valide (ex. nom@exemple.fr).', test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); } },
      { id: 'message', err: 'msg-err', msg: 'Décrivez votre projet en quelques mots.' }
    ];
    var check = function (r) {
      var el = document.getElementById(r.id);
      var v = el.value.trim();
      var ok = v.length > 0 && (!r.test || r.test(v));
      el.setAttribute('aria-invalid', String(!ok));
      document.getElementById(r.err).textContent = ok ? '' : r.msg;
      return ok;
    };
    rules.forEach(function (r) {
      var el = document.getElementById(r.id);
      el.addEventListener('blur', function () { if (el.value.trim()) check(r); });
    });
    form.addEventListener('submit', function (e) {
      var firstBad = null;
      rules.forEach(function (r) { if (!check(r) && !firstBad) firstBad = document.getElementById(r.id); });
      var consent = form.querySelector('[name="rgpd"]');
      var rgpdErr = document.getElementById('rgpd-err');
      if (!consent.checked) {
        rgpdErr.textContent = 'Merci de cocher cette case pour envoyer votre demande.';
        if (!firstBad) firstBad = consent;
      } else { rgpdErr.textContent = ''; }
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      var st = form.querySelector('.form-status');
      if (form.action.indexOf('VOTRE_ID') !== -1) {
        e.preventDefault();
        st.textContent = 'Formulaire non encore relié : appelez le 06 50 69 27 95 ou écrivez à benoit.bertrand75@gmail.com.';
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.style.opacity = '0.6';
      st.textContent = 'Envoi en cours…';
    });
  }
})();
