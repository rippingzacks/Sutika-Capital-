document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  // mark active nav link
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === path) {
      a.classList.add('active');
    }
  });

  // contact form: submits to Netlify Forms (no page reload)
  var form = document.querySelector('.contact-form');
  if (form) {
    function encode(data) {
      return Object.keys(data)
        .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); })
        .join('&');
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data)
      })
        .then(function () {
          btn.textContent = 'Sent';
          form.reset();
          setTimeout(function () { btn.textContent = original; }, 2800);
        })
        .catch(function () {
          btn.textContent = 'Try again';
          setTimeout(function () { btn.textContent = original; }, 2800);
        });
    });
  }
});
