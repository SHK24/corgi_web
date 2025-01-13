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
      apiUrl: '',
      defaultLanguage: 'en',
      observerType: 'text',
      observerOptions: { inputPrefix: '{{', inputSuffix: '}}' },
    });

  tolgee.run()/*.then(() => {
    document.getElementById('loading').style.display = 'none';
  })*/;

  tolgee.on('update', () => {
    document.title = tolgee.t('common_title', { noWrap: true });
  });
}

window.addEventListener('load', () => {
  initTolgee();
});


