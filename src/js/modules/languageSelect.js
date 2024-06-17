const bodyElement = document.querySelector('body');
const languageSelectButton = document.querySelector('.language-select__button');
const languageSelectionDialog = document.getElementById('languageSelectionDialog');
const dialogOverlay = document.querySelector('.overlay');

languageSelectButton.addEventListener('click', function() {

  languageSelectButton.classList.toggle('open');
  bodyElement.classList.toggle("unclickable");
  dialogOverlay.classList.toggle("overlay--open");

  if (!languageSelectionDialog.open) {
    languageSelectionDialog.show();
    languageSelectionDialog.style.pointerEvents = "auto";
    setTimeout(() => languageSelectionDialog.classList.add('show'), 10);
  } else {
    languageSelectionDialog.classList.remove('show');
    setTimeout(() => {
      languageSelectionDialog.close();
    }, 300);
  }
});
