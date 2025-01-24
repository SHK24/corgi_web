const copyButton = document.getElementById('copyButton');
const textToCopy = 'hey@getcorgi.com';

export async function copyTextToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

copyButton?.addEventListener('click', () => {
  copyTextToClipboard(textToCopy);
  copyButton.classList.add("footer__mail-button--copied")

  setTimeout(function() {
    return copyButton.classList.remove("footer__mail-button--copied")
  }, 5000);
});


