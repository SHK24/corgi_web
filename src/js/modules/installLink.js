const tabletWidth = 1024;
const appleLink = {
  iconHref: '../img/icons/icons.svg#apple-icon',
  textContent: 'App Store',
  href: '',
}

const androidLink = {
  iconHref: '../img/icons/icons.svg#play-market-icon',
  textContent: 'Google Play',
  href: '',
}

const chromeLink = {
  iconHref: '../img/icons/icons.svg#chrome-icon',
  textContent: 'Chrome Store',
  href: '',
}

const installLinks = document.querySelectorAll('.install-link');


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
}

const userOs = detectOS()

const updateAppLinkBasedOnOS = () => {
  const isTabletOrSmaller = window.innerWidth <= tabletWidth;

  installLinks.forEach((installLink) => {
    const installLinkIcon = installLink.querySelector('.install-link__icon use');
    const installLinkMainText = installLink.querySelector('.install-link__main-text');

    if (isTabletOrSmaller) {
      if (userOs === 'iOS') {
        installLink.href = appleLink.href;
        installLinkIcon.setAttribute('xlink:href', appleLink.iconHref);
        installLinkMainText.textContent = appleLink.textContent;
      } else if (userOs === 'Android') {
        installLink.href = androidLink.href;
        installLinkIcon.setAttribute('xlink:href', androidLink.iconHref);
        installLinkMainText.textContent = androidLink.textContent;
      }
    } else {
      installLink.href = chromeLink.href;
      installLinkIcon.setAttribute('xlink:href', chromeLink.iconHref);
      installLinkMainText.textContent = chromeLink.textContent;
    }
   })
}

document.addEventListener('DOMContentLoaded', updateAppLinkBasedOnOS);

window.addEventListener('resize', updateAppLinkBasedOnOS);
