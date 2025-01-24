const initTolgee = () => {
  const { Tolgee, InContextTools, FormatSimple, BackendFetch } =
    window['@tolgee/web'];

  const tolgee = Tolgee()
    .use(InContextTools())
    .use(FormatSimple())
    .use(BackendFetch())
    .init({
      // ############################################################
      // ## you should never leak your API key                     ##
      // ## remove it in for production publicly accessible site   ##
      // ############################################################
      apiKey: '',
      apiUrl: 'https://app.tolgee.io',
      defaultLanguage: 'en',
      observerType: 'text',
      observerOptions: { inputPrefix: '{{', inputSuffix: '}}' },
    });

  tolgee.run().then(() => {
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const placeholder = tolgee.t(el.dataset.i18nPlaceholder, { noWrap: true })
      if(placeholder) {
        el.setAttribute('placeholder', placeholder)
      }
    })

    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const alt = tolgee.t(el.dataset.i18nAlt, { noWrap: true })
      if(alt) {
        el.setAttribute('alt', alt)
      }
    })

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const localizedText = tolgee.t(el.dataset.i18n, { noWrap: true })
      if(localizedText) {
        el.textContent = localizedText
      }
    })
  });

  tolgee.on('update', () => {
    console.log('Records')
    console.log([...tolgee.getAllRecords()[0].data].map(item => item[0]))
  });
}

window.addEventListener('load', () => {
  initTolgee();
});


