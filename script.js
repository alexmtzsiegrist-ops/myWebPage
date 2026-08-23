const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const appShell = document.querySelector('.app-shell');
const topicSidebar = document.querySelector('.topic-sidebar');
const topicClass = document.querySelector('#topic-class');
const heroTitle = document.querySelector('#hero-title');
const heroText = document.querySelector('#hero-text');

const classContent = {
  Mathematik: {
    sentence: 'Zahlen sind einfach Buchstaben mit ausgezeichneten Manieren.'
  },
  German: {
    sentence: 'Jedes lange deutsche Wort hat einmal als kleines Wort angefangen.'
  },
  English: {
    sentence: 'Wörter sind kleine Türen. Such dir eines aus und schau, wohin es führt.'
  },
  French: {
    sentence: 'Ein wenig Übung heute lässt morgen alles magnifique klingen.'
  },
  'Natur und Technik': {
    sentence: 'Neugier ist dein Kopf, der einfach genauer hinschauen möchte.'
  },
  History: {
    sentence: 'Die Vergangenheit ist voller Menschen, die auch nicht wussten, was als Nächstes passiert.'
  }
};

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
    const selectedClass = link.dataset.class;
    const content = classContent[selectedClass];
    document.querySelectorAll('.class-link').forEach((classLink) => classLink.classList.remove('active'));
    link.classList.add('active');
    topicClass.textContent = selectedClass;
    appShell.classList.toggle('math-selected', selectedClass === 'Mathematik');
    heroTitle.innerHTML = selectedClass === 'Mathematik'
      ? 'Mathe<br><em>ruft.</em>'
      : `${selectedClass}<br><em>ruft.</em>`;
    heroText.textContent = content.sentence;
    appShell.classList.add('topic-open');
    topicSidebar.setAttribute('aria-hidden', 'false');
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

document.querySelector('.topic-toggle').addEventListener('click', () => {
  const isOpen = appShell.classList.toggle('topic-collapsed') === false;
  topicSidebar.setAttribute('aria-hidden', String(!isOpen));
  document.querySelector('.topic-toggle').setAttribute('aria-expanded', String(isOpen));
});

