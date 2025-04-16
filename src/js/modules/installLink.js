const tabletWidth = 1024;
const appleLink = {
  iconHref: '../img/icons/icons.svg#apple-icon',
  textContent: 'App Store',
  href: 'https://dub.sh/corgi-app-store',
};

const androidLink = {
  iconHref: '../img/icons/icons.svg#play-market-icon',
  textContent: 'Google Play',
  href: 'https://dub.sh/corgi-google-play',
};

const chromeLink = {
  iconHref: '../img/icons/icons.svg#chrome-icon',
  textContent: 'Chrome',
  href: 'https://dub.sh/corgi-chrome-store',
};

const installLinks = document.querySelectorAll('.js-install-link');

const detectOS = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }
  if (/android/i.test(userAgent)) {
    return 'Android';
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }
  if (/Macintosh/.test(userAgent) && 'ontouchend' in document) {
    return 'iOS';
  }
  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
    return 'iOS';
  }
  return 'unknown';
};

const changeLink = (installLink, href, iconHref, textContent) => {
  const installLinkIcon = installLink.querySelector('.js-install-link-icon use');
  const installLinkMainText = installLink.querySelector(
    '.js-install-link-text'
  );
  installLink.href = href;
  installLinkIcon?.setAttribute('xlink:href', iconHref);
  installLinkMainText && (installLinkMainText.textContent = textContent);
};

const userOs = detectOS();
let currentButton = 'chrome';

const updateAppLinkBasedOnOS = () => {
  const isTabletOrSmaller = window.innerWidth <= tabletWidth;

  if (isTabletOrSmaller) {
    if (userOs === 'iOS' && currentButton !== 'apple') {
      const { href, iconHref, textContent } = appleLink;
      installLinks.forEach((installLink) => {
        changeLink(installLink, href, iconHref, textContent);
      });
      currentButton = 'apple';
    } else if (userOs === 'Android' && currentButton !== 'android') {
      const { href, iconHref, textContent } = androidLink;
      installLinks.forEach((installLink) => {
        changeLink(installLink, href, iconHref, textContent);
      });
      currentButton = 'android';
    }
  } else {
    const { href, iconHref, textContent } = chromeLink;
    installLinks.forEach((installLink) => {
      changeLink(installLink, href, iconHref, textContent);
    });
    currentButton = 'chrome';
  }
};

const init = () => {
  initQrPopup()
  updateAppLinkBasedOnOS()
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', updateAppLinkBasedOnOS);

const initQrPopup = () => {
  document.querySelectorAll('.js-qr-popup').forEach((qrPopupEl) => {
    qrPopupEl.querySelectorAll('.js-close-qr-popup')
      .forEach((closeBtn) => {
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closeBtn.closest('.js-qr-popup').classList.remove('qr-popup_visible')
          closeBtn.closest('.js-qr-popup-wrapper')
            .querySelector('.js-qr-popup-mask').classList.add('qr-popup-mask_hidden')
        })
      })

    qrPopupEl.closest('.js-qr-popup-wrapper').querySelectorAll('.js-qr-popup-mask')
      .forEach((maskEl) => {
        maskEl.addEventListener('click', (e) => {
          e.preventDefault();
          qrPopupEl.classList.remove('qr-popup_visible')
          maskEl.classList.add('qr-popup-mask_hidden')
        })
      })
  })

  document.querySelectorAll('.js-open-qr-popup').forEach((openPopupLinkEl) => {
    openPopupLinkEl.addEventListener('click', (e) => {
      e.preventDefault();
      const popupEl = document.querySelector('.js-qr-popup')
      popupEl.classList.add('qr-popup_visible')
      popupEl.closest('.js-qr-popup-wrapper')
        .querySelector('.js-qr-popup-mask').classList.remove('qr-popup-mask_hidden')
    })
  })
}
