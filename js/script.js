const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  document.getElementById('project-count').textContent = `${count} proyek`;
}));
document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText('rdeantika8@gmail.com');
    status.textContent = 'Alamat email berhasil disalin.';
  } catch {
    status.textContent = 'Silakan salin alamat email di atas atau klik untuk mengirim email.';
  }
});
document.getElementById('year').textContent = new Date().getFullYear();
