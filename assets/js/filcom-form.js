(function () {
  var WA = '6287789784423';

  // Push to GTM's dataLayer. gtag() is NOT defined when GA4 is configured
  // inside GTM (the normal setup here), so dataLayer is the reliable channel.
  // The gtag branch stays only as a fallback if gtag.js is ever added directly.
  function track(event, params) {
    var payload = { event: event };
    for (var k in params) { if (params.hasOwnProperty(k)) payload[k] = params[k]; }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') { window.gtag('event', event, params || {}); }
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('filcom-contact-form');
  if (form) {
    var thanks = document.getElementById('filcom-form-thanks');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = form.querySelectorAll('[required]');
      var ok = true;
      Array.prototype.forEach.call(required, function (el) {
        var bad = !String(el.value || '').trim();
        el.classList.toggle('filcom-field-error', bad);
        if (bad) ok = false;
      });
      if (!ok) {
        track('form_error', { form_name: 'kontak', form_location: location.pathname });
        return;
      }

      var g = function (n) { var el = form.elements[n]; return el ? String(el.value).trim() : ''; };
      var lines = [
        'Halo Filcom.id, saya ingin konsultasi.',
        '',
        'Nama: ' + g('nama'),
        'Perusahaan/Organisasi: ' + g('perusahaan'),
        'WhatsApp: ' + g('whatsapp'),
        'Email: ' + g('email'),
        'Layanan diminati: ' + g('layanan'),
        'Jumlah karyawan: ' + g('karyawan'),
        '',
        'Kebutuhan:',
        g('pesan')
      ];
      var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n'));

      if (thanks) thanks.classList.add('is-visible');

      // read the values BEFORE reset()
      track('generate_lead', {
        method: 'contact_form',
        service_interest: g('layanan') || '(tidak diisi)',
        company_size: g('karyawan') || '(tidak diisi)',
        form_location: location.pathname
      });

      form.reset();
      window.setTimeout(function () { window.open(url, '_blank'); }, 400);
    });
  }

  /* ---------- WhatsApp / telepon / email clicks (brief §10) ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';

    if (href.indexOf('wa.me/') > -1) {
      track('contact_click', {
        contact_method: 'whatsapp',
        link_location: a.classList.contains('filcom-wa') ? 'floating_button' : 'inline',
        page_path: location.pathname
      });
    } else if (href.indexOf('tel:') === 0) {
      track('contact_click', { contact_method: 'phone', page_path: location.pathname });
    } else if (href.indexOf('mailto:') === 0) {
      track('contact_click', { contact_method: 'email', page_path: location.pathname });
    }
  }, true);
})();
