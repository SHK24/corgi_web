const mediaQuery = window.matchMedia('(min-width: 1024px)');

const htmlElement = document.querySelector('html');

const headerOpenMenuButton = document.querySelector(
  '.header__open-button-menu'
);
const headerNavigationWrapper = document.querySelector(
  '.header__navigation-wrapper'
);
const overlay = document.querySelector('.overlay');

let isOpen = false;

function changeHeaderNavigationVisibility() {
  htmlElement.classList.toggle('scroll-lock');
  headerNavigationWrapper.classList.toggle('header__navigation-wrapper--open');
  overlay.classList.toggle('overlay--open');
  isOpen = !isOpen;
}

headerOpenMenuButton.addEventListener(
  'click',
  changeHeaderNavigationVisibility
);

overlay.addEventListener('click', () => {
  if (isOpen) {
    changeHeaderNavigationVisibility();
  }
});

mediaQuery.addListener((e) => {
  const desktop = e.matches;
  if (desktop && isOpen) {
    changeHeaderNavigationVisibility();
  }
});
