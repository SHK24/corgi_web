const bodyElement = document.querySelector('body');
const headerOpenMenuButton = document.querySelector('.header__open-button-menu');
const headerNavigationWrapper = document.querySelector('.header__navigation-wrapper');
const overlay = document.querySelector('.overlay');


headerOpenMenuButton.addEventListener('click', function() {
  headerNavigationWrapper.classList.toggle("header__navigation-wrapper--open");
  bodyElement.classList.toggle("unclickable");
  overlay.classList.toggle("overlay--open");
});
