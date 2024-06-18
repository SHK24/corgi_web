const mediaQuery = window.matchMedia('(min-width: 1024px)');

const htmlElement = document.querySelector('html');
const languageSelectButton = document.querySelector('.language-select__button');
const languageSelectionDialog = document.getElementById(
  'languageSelectionDialog'
);
const overlay = document.querySelector('.overlay');

let isOpen = false;

function changeLanguageSelectionVisibility() {
  htmlElement.classList.toggle('scroll-lock');
  languageSelectButton.classList.toggle('open');
  overlay.classList.toggle('overlay--open');

  if (!languageSelectionDialog.open) {
    languageSelectionDialog.show();
    isOpen = true;
    languageSelectionDialog.style.pointerEvents = 'auto';
    setTimeout(() => languageSelectionDialog.classList.add('show'), 10);
  } else {
    languageSelectionDialog.classList.remove('show');
    setTimeout(() => {
      languageSelectionDialog.close();
      isOpen = false;
    }, 300);
  }
}

languageSelectButton.addEventListener(
  'click',
  changeLanguageSelectionVisibility
);

overlay.addEventListener('click', () => {
  if (isOpen) {
    changeLanguageSelectionVisibility();
  }
});

mediaQuery.addListener((e) => {
  const desktop = e.matches;
  if (!desktop && isOpen) {
    changeLanguageSelectionVisibility();
  }
});
