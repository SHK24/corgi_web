const mediaQuery = window.matchMedia('(min-width: 1024px)');

const animation = {
  promo: {
    name: 'promo-lottie-animation',
    path: 'files/promo-main.json',
    mobile: true,
    desktop: true,
    observable: false,
    instance: null,
  },
  ai: {
    name: 'ai-lottie-animation',
    path: 'files/corgi-ai.json',
    mobile: true,
    desktop: true,
    observable: false,
    instance: null,
  },
  language: {
    name: 'language-lottie-animation',
    path: 'files/language.json',
    mobile: true,
    desktop: true,
    observable: false,
    instance: null,
  },
  trainer: {
    name: 'trainer-lottie-animation',
    path: 'files/practice.json',
    mobile: true,
    desktop: true,
    observable: false,
    instance: null,
  },
  learning: {
    name: 'learning-efficiency-animation',
    path: 'files/learning-efficiency.json',
    mobile: false,
    desktop: true,
    observable: true,
    instance: null,
  },
  'learning-small': {
    name: 'learning-efficiency-animation',
    path: 'files/learning-efficiency-mobile.json',
    mobile: true,
    desktop: false,
    observable: true,
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

function playAnimation(animation) {
  if (animation.instance) {
    animation.instance.play();
  } else {
    animation.instance = loadAnimation(animation.name, animation.path);
  }
}

function stopAnimation(animation) {
  if (animation.instance) {
    animation.instance.destroy();
    animation.instance = null;
  }
}

function handleTabletChange(e) {
  const desktop = e.matches;
  const mobile = !e.matches;
  loadAnimations({ desktop, mobile });
}

function loadAnimations({ mobile = false, desktop = false }) {
  Object.values(animation).forEach((animation) => {
    if ((mobile && animation.mobile) || (desktop && animation.desktop)) {
      if (animation.observable) {
        createObserver(animation);
      } else {
        playAnimation(animation);
      }
    } else if (animation.instance) {
      stopAnimation(animation);
    }
  });
}

function createObserver(animation) {
  const element = document.getElementById(animation.name);
  if (!element) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        playAnimation(animation);
      }
    });
  });

  observer.observe(element);
}

window.addEventListener('load', () => {
  loadAnimations({ desktop: mediaQuery.matches, mobile: !mediaQuery.matches });
  mediaQuery.addListener(handleTabletChange);
});
