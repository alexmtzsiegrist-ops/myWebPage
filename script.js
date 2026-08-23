const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const appShell = document.querySelector('.app-shell');

menuToggle.addEventListener('click', () => {
  if (window.innerWidth <= 680) {
    sidebar.classList.toggle('open');
  } else {
    appShell.classList.toggle('collapsed');
  }

  const isOpen = window.innerWidth <= 680
    ? sidebar.classList.contains('open')
    : !appShell.classList.contains('collapsed');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.class-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 680) {
      sidebar.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    document.querySelector('#site-search').focus();
  }
});