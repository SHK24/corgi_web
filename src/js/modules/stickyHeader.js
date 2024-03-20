const stickyPoint = 878;
const fixedPoint = 40;
const headerElement = document.querySelector('header');
const closeMenuButton = document.getElementById('close-menu');

const onHeaderSticky = () => {
  if (window.pageYOffset > stickyPoint) {
    headerElement.classList.add('header--sticky');
  }

  if (window.pageYOffset < fixedPoint) {
    headerElement.classList.remove('header--sticky');
  }
};

closeMenuButton.addEventListener('click', () => {
  headerElement.classList.remove('header--sticky');
  window.removeEventListener('scroll', onHeaderSticky);
});

window.addEventListener('scroll', onHeaderSticky);
