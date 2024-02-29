export function isWebp() {
  function testWebp(callback) {
    const webP = new Image();
    // eslint-disable-next-line no-multi-assign
    webP.onload = webP.onerror = function () {
      callback(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebp((support) => {
    if (support === true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });
}
