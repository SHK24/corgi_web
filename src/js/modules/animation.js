const mediaQuery = window.matchMedia('(min-width: 743px)');

function loadAnimation(id, path) {
  lottie.loadAnimation({
    container: document.getElementById(id),
    path,
    renderer: 'svg',
    loop: true,
    autoplay: true,
  });
}

function handleTabletChange(e) {
  if (e.matches) {
    lottie.destroy();
    loadAnimation('promo-lottie-animation', 'files/promo-main.json');
    loadAnimation('ai-lottie-animation', 'files/promo-main.json');
    loadAnimation('ai-lottie-animation', 'files/corgi-ai.json');
    loadAnimation('language-lottie-animation', 'files/language.json');
    loadAnimation('trainer-lottie-animation', 'files/practice.json');
  } else {
    lottie.destroy();
    loadAnimation('promo-lottie-animation', 'files/promo-main-mobile.json');
    loadAnimation('ai-lottie-animation', 'files/corgi-ai-mobile.json');
    loadAnimation('language-lottie-animation', 'files/language-mobile.json');
    loadAnimation('trainer-lottie-animation', 'files/practice-mobile.json');
  }
}

window.addEventListener('load', () => {
  // Register event listener
  mediaQuery.addListener(handleTabletChange);
  handleTabletChange(mediaQuery);
});
