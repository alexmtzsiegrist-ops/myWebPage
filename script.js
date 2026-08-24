const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const appShell = document.querySelector('.app-shell');
const topicSidebar = document.querySelector('.topic-sidebar');
const topicClass = document.querySelector('#topic-class');
const topicList = document.querySelector('.topic-list');
const heroTitle = document.querySelector('#hero-title');
const heroText = document.querySelector('#hero-text');

const classContent = {
  Physik: {
    sentence: 'Die Welt steckt voller Kräfte, Bewegungen und kleiner Experimente zum Staunen.',
    topics: ['Messen und Einheiten', 'Kräfte und Bewegung', 'Arbeit und Energie', 'Wärme und Temperatur', 'Schall und Wellen', 'Elektrizität', 'Magnetismus', 'Licht und Optik']
  },
  Mathematik: {
    sentence: 'Zahlen sind einfach Buchstaben mit ausgezeichneten Manieren.',
    topics: ['Zahlen und Rechnen', 'Brüche und Dezimalzahlen', 'Prozentrechnen', 'Terme und Gleichungen', 'Funktionen', 'Geometrie', 'Wahrscheinlichkeit', 'Statistik']
  },
  Deutsch: {
    sentence: 'Jedes lange deutsche Wort hat einmal als kleines Wort angefangen.',
    topics: ['Lesen und Verstehen', 'Grammatik', 'Rechtschreibung', 'Wortarten', 'Satzbau', 'Texte schreiben', 'Literatur', 'Präsentieren']
  },
  Englisch: {
    sentence: 'Wörter sind kleine Türen. Such dir eines aus und schau, wohin es führt.',
    topics: ['Vocabulary', 'Grammar', 'Reading', 'Writing', 'Listening', 'Speaking', 'Tenses', 'Everyday English']
  },
  Französisch: {
    sentence: 'Ein wenig Übung heute lässt morgen alles magnifique klingen.',
    topics: ['Vocabulaire', 'Grammaire', 'Prononciation', 'Compréhension', 'Écrire des textes', 'Parler français', 'Les temps', 'La culture']
  },
  Chemie: {
    sentence: 'In der Chemie wird sichtbar, wie Stoffe sich verbinden, verändern und reagieren.',
    topics: ['Stoffe und Eigenschaften', 'Teilchenmodell', 'Atome und Elemente', 'Periodensystem', 'Chemische Reaktionen', 'Säuren und Basen', 'Salze', 'Chemie im Alltag']
  },
  Biologie: {
    sentence: 'Biologie zeigt dir, wie das Leben aufgebaut ist und miteinander verbunden bleibt.',
    topics: ['Zellen und Zellbestandteile', 'Pflanzen', 'Tiere und Lebensräume', 'Der menschliche Körper', 'Ernährung und Gesundheit', 'Ökosysteme', 'Evolution', 'Verhalten']
  },
  Geschichte: {
    sentence: 'Die Vergangenheit ist voller Menschen, die auch nicht wussten, was als Nächstes passiert.',
    topics: ['Zeit und Quellen', 'Frühe Hochkulturen', 'Antike', 'Mittelalter', 'Reformation', 'Industrialisierung', 'Weltkriege', 'Die Welt heute']
  }
};

function renderTopics(selectedClass) {
  topicList.innerHTML = classContent[selectedClass].topics
    .map((topic, index) => `<button class="topic-link${index === 0 ? ' active' : ''}" type="button">${topic}</button>`)
    .join('');

  topicList.querySelectorAll('.topic-link').forEach((topicLink) => {
    topicLink.addEventListener('click', () => {
      topicList.querySelectorAll('.topic-link').forEach((link) => link.classList.remove('active'));
      topicLink.classList.add('active');
    });
  });
}

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
    renderTopics(selectedClass);
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

renderTopics('Mathematik');

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

