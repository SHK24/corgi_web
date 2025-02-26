const initTolgee = async () => {
  const { Tolgee, InContextTools, FormatSimple, BackendFetch } =
    window['@tolgee/web'];

  const de = await fetch('/i18n/de.json').then(res => res.json())
  const en = await fetch('/i18n/en.json').then(res => res.json())
  const es = await fetch('/i18n/es.json').then(res => res.json())
  const fr = await fetch('/i18n/fr.json').then(res => res.json())
  const ja = await fetch('/i18n/ja.json').then(res => res.json())
  const ptBR = await fetch('/i18n/pt-br.json').then(res => res.json())
  const ru = await fetch('/i18n/ru.json').then(res => res.json())
  const vi = await fetch('/i18n/vi.json').then(res => res.json())

  const tolgee = Tolgee()
    .use(InContextTools())
    .use(FormatSimple())
    .use(BackendFetch())
    .init({
      // ############################################################
      // ## you should never leak your API key                     ##
      // ## remove it in for production publicly accessible site   ##
      // ############################################################
      // apiKey: '',
      // apiUrl: 'https://app.tolgee.io',
      defaultLanguage: 'en',
      staticData: {
        de,
        en,
        es,
        fr,
        ja,
        'pt-br': ptBR,
        ru,
        vi,
      }
    });

  tolgee.run().then(() => {
    langSwitcher.localizeAll()
  });

  /*tolgee.on('update', () => {
    console.log('Records')
    console.log(tolgee.getAllRecords())
  });*/

  window.tolgee = tolgee
  await langSwitcher.init()
}

document.addEventListener('DOMContentLoaded', async () => {
  await initTolgee()
});

