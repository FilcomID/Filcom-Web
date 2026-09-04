(function () {
  var form = document.getElementById('filcom-contact-form');
  if (!form) return;
  var WA = '6287789784423';
  var thanks = document.getElementById('filcom-form-thanks');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var required = form.querySelectorAll('[required]');
    var ok = true;
    required.forEach(function (el) {
      var bad = !String(el.value || '').trim();
      el.classList.toggle('filcom-field-error', bad);
      if (bad) ok = false;
    });
    if (!ok) return;

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
    form.reset();
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { method: 'contact_form' });
    }
    window.setTimeout(function () { window.open(url, '_blank'); }, 400);
  });
})();
