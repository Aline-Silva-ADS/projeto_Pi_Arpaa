// Load events from data/events.json and render into #events-list
document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('events-list');
  if (!container) return;

  fetch('data/events.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (!data || !data.events) return;
      container.innerHTML = data.events.map(function (ev) {
        var date = new Date(ev.date);
        var dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
        return (
          '<article class="event-card bg-gray-50 p-6 rounded-2xl shadow relative overflow-visible">' +
            '<img src="assets/icons/paw.svg" class="paw-icon" alt="patinha" />' +
            '<h4 class="text-xl font-semibold pl-10">' + ev.title + '</h4>' +
            '<p class="text-sm text-gray-600 mb-2 pl-10"><time datetime="' + ev.date + '">' + dateStr + '</time> • ' + ev.location + '</p>' +
            '<p class="mb-4 text-gray-700 pl-10">' + ev.description + '</p>' +
            '<a href="' + ev.ctaLink + '" class="text-teal-600 font-semibold hover:underline pl-10">' + ev.cta + ' →</a>' +
          '</article>'
        );
      }).join('');
    })
    .catch(function (err) {
      console.error('Erro ao carregar eventos', err);
      container.innerHTML = '<p class="text-center text-gray-600">Não foi possível carregar os eventos no momento.</p>';
    });
});
