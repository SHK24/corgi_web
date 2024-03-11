export const promoAnimation = lottie.loadAnimation({
  container: document.getElementById('promo-lottie-animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '../files/promo-main.json',
});

export const corgiAiAnimation = lottie.loadAnimation({
  container: document.getElementById('ai-lottie-animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '../files/corgi-ai.json',
});
