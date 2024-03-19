const stickyPoint = 878;
const fixedPoint = 40;
const headerElement = document.querySelector('header')


window.addEventListener('scroll', () => {
  if (window.pageYOffset > stickyPoint) {
    headerElement.classList.add("header--sticky")
  }

  if (window.pageYOffset < fixedPoint) {
    headerElement.classList.remove("header--sticky")
  }
});

