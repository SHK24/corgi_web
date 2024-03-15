const mediaQuery = window.matchMedia('(min-width: 743px)');

function handleTabletChange(e) {
  if (e.matches) {
    lottie.destroy();

    lottie.loadAnimation({
      name: 'promo-main',
      container: document.getElementById('promo-lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../files/promo-main.json',
    });

    lottie.loadAnimation({
      name: 'promo-main',
      container: document.getElementById('ai-lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../files/corgi-ai.json',
    });

    lottie.loadAnimation({
      name: 'promo-main',
      container: document.getElementById('language-lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../files/language.json',
    });

    lottie.loadAnimation({
      name: 'promo-main',
      container: document.getElementById('trainer-lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../files/practice.json',
    });

  } else {
    lottie.destroy();

    lottie.loadAnimation({
      name: 'promo-main',
      container: document.getElementById('promo-lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../files/promo-main-mobile.json',
    });

    lottie.loadAnimation({
      name: 'promo-main',
      container: document.getElementById('ai-lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../files/corgi-ai-mobile.json',
    });

    lottie.loadAnimation({
      name: 'promo-main',
      container: document.getElementById('language-lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../files/language-mobile.json',
    });

    lottie.loadAnimation({
      name: 'promo-main',
      container: document.getElementById('trainer-lottie-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../files/practice-mobile.json',
    });
  }
}

// Register event listener
mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);
