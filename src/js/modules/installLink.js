const tabletWidth = 1024;
const appleLink = {
  iconHref: '../img/icons/icons.svg#apple-icon',
  textContent: 'App Store',
  href: '',
};

const androidLink = {
  iconHref: '../img/icons/icons.svg#play-market-icon',
  textContent: 'Google Play',
  href: '',
};

const chromeLink = {
  iconHref: '../img/icons/icons.svg#chrome-icon',
  textContent: 'Chrome Store',
  href: 'https://chromewebstore.google.com/detail/corgi-ai-your-language-te/jgabolakboecklnmocdljjcdkkhjigck',
};

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
};

const changeLink = (installLink, href, iconHref, textContent) => {
  const installLinkIcon = installLink.querySelector('.install-link__icon use');
  const installLinkMainText = installLink.querySelector(
    '.install-link__main-text'
  );

  installLink.href = href;
  installLinkIcon.setAttribute('xlink:href', iconHref);
  installLinkMainText.textContent = textContent;
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

document.addEventListener('DOMContentLoaded', updateAppLinkBasedOnOS);

window.addEventListener('resize', updateAppLinkBasedOnOS);
