const mediaQuery = window.matchMedia('(min-width: 1024px)');

const animation = {
  promo: {
    name: 'promo-lottie-animation',
    path: '/files/promo-main.json',
    mobile: true,
    desktop: true,
    instance: null,
  },
  ai: {
    name: 'ai-lottie-animation',
    path: '/files/corgi-ai.json',
    mobile: true,
    desktop: true,
    instance: null,
  },
  language: {
    name: 'language-lottie-animation',
    path: '/files/language.json',
    mobile: true,
    desktop: true,
    instance: null,
  },
  trainer: {
    name: 'trainer-lottie-animation',
    path: '/files/practice.json',
    mobile: true,
    desktop: true,
    instance: null,
  },
  learning: {
    name: 'learning-efficiency-animation',
    path: '/files/learning-efficiency.json',
    mobile: false,
    desktop: true,
    instance: null,
  },
  'learning-small': {
    name: 'learning-efficiency-animation',
    path: '/files/learning-efficiency-mobile.json',
    mobile: true,
    desktop: false,
    instance: null,
  },
};

function loadAnimation(id, path) {
  return lottie.loadAnimation({
    container: document.getElementById(id),
    path,
    renderer: 'svg',
    loop: true,
    autoplay: true,
  });
}

function loadAnimations({ mobile = false, desktop = false }) {
  Object.values(animation).forEach((animation) => {
    if ((mobile && animation.mobile) || (desktop && animation.desktop)) {
      if (animation.instance) {
        animation.instance.play();
      } else {
        animation.instance = loadAnimation(animation.name, animation.path);
      }
    } else if (animation.instance) {
      animation.instance.destroy();
      animation.instance = null
    }
  });
}

function handleTabletChange(e) {
  const desktop = e.matches;
  const mobile = !e.matches;
  loadAnimations({ desktop, mobile });
}

window.addEventListener('load', () => {
  loadAnimations({ desktop: mediaQuery.matches, mobile: !mediaQuery.matches });
  mediaQuery.addListener(handleTabletChange);
});
