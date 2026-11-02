const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('[data-volume]').forEach(button => {
  button.addEventListener('click', () => {
    const select = document.getElementById('volumeSelect');
    select.value = button.dataset.volume;
    document.getElementById('order').scrollIntoView({behavior:'smooth'});
  });
});

document.getElementById('orderForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = (data.get('name') || '').trim();
  const phone = (data.get('phone') || '').trim();
  const address = (data.get('address') || '').trim();
  const volume = data.get('volume') || 'Не выбран';
  const floor = (data.get('floor') || '').trim() || 'Не указан';
  const message = `Здравствуйте! Хочу заказать техническую воду.%0AИмя: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phone)}%0AАдрес: ${encodeURIComponent(address)}%0AОбъём: ${encodeURIComponent(volume)}%0AЭтаж: ${encodeURIComponent(floor)}`;
  const status = document.getElementById('formStatus');
  status.textContent = 'Открываем WhatsApp с подготовленной заявкой…';
  // WhatsApp recipient number is configured from the phone supplied for the business.
  window.open(`https://wa.me/79498997150?text=${message}`, '_blank', 'noopener,noreferrer');
});