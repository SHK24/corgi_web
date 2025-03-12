window.langSwitcher = (() => {
  const LANGUAGE_LINK_CLASS_NAME = 'js-lang-item'
  const ACTIVE_CLASS_NAME = 'language-selection__link_active'
  const SELECTED_LANG_FLAG_IMAGE_CLASS_NAME = 'js-selected-lang-flag'
  const LANGUAGE_ITEM_NAME_CLASS_NAME = 'js-lang-name'
  const LANGUAGE_STORAGE_KEY = 'lang'

  const setLanguage = async (langKey='') => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, langKey)
    const allLangsList = tolgee.getAllRecords().map(r => r.language)
    if(!allLangsList.includes(langKey.toLowerCase())) {
      return
    }
    if(window.location.pathname === '/' && langKey !== 'en') {
      window.location.pathname = `/${langKey}/`
      return
    }

    const pathParts = location.pathname.split('/').filter(i => !!i)

    if(pathParts.length > 0) {
      if(allLangsList.includes(pathParts[pathParts.length - 1])) {
        window.location.pathname = langKey === 'en' ? '/' : `/${langKey}/`
        return
      }
      window.location.pathname = langKey === 'en' ? `/${pathParts[pathParts.length - 1]}` : `/${langKey}/${pathParts[pathParts.length - 1]}`
    }
  }

  const selectLangButtonsByLang = (langKey='en') => {
    const selectedLangItemEl = document.querySelector(`.${LANGUAGE_LINK_CLASS_NAME}[data-lang="${langKey}"]`)
    if(!selectedLangItemEl) {
      return
    }
    const flagImgEl = selectedLangItemEl?.querySelector('img')
    const langName = selectedLangItemEl
      .querySelector(`.${LANGUAGE_ITEM_NAME_CLASS_NAME}`)?.textContent.trim()

    const {
      src,
      srcset,
    } = flagImgEl || {}

    document.querySelectorAll(`.${ACTIVE_CLASS_NAME}`)
      .forEach((el) => {
        el.classList.remove(ACTIVE_CLASS_NAME)
      })
    document.querySelectorAll(`[data-lang="${langKey}"]`)
      .forEach((el) => {
        el.classList.add(ACTIVE_CLASS_NAME)
      })

    document.querySelectorAll(`.${SELECTED_LANG_FLAG_IMAGE_CLASS_NAME}`).forEach(flagImgEl => {
      flagImgEl.src = src
      flagImgEl.srcset = srcset
      flagImgEl.alt = langName
    })
  }

  const getBrowserLang = () => {
    if (navigator.languages !== undefined) {
      return navigator.languages[0]
    }
    return navigator.language
  }

  const getLang = () => {
    const allLangsList = tolgee.getAllRecords().map(r => r.language)
    const defaultLang = 'en'

    const langFromStorage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if(langFromStorage && allLangsList.includes(langFromStorage)) {
      return langFromStorage
    }

    let langFromBrowser = getBrowserLang().toLowerCase()
    if(langFromBrowser === 'pt-br') {
      return 'pt-br'
    }

    if(langFromBrowser && langFromBrowser.includes('-')) {
      langFromBrowser = langFromBrowser.split('-')[0]
      if(allLangsList.includes(langFromBrowser)) {
        return langFromBrowser
      }
    }
    return defaultLang
  }

  const loadLang = async function () {
    const allLangsList = tolgee.getAllRecords().map(r => r.language)
    const langKey = getLang()
    const pathParts = location.pathname.split('/')
    let langKeyFromRoute = 'en'
    if(pathParts.length > 0 && allLangsList.includes(pathParts[1].toLowerCase())) {
      langKeyFromRoute = pathParts[1].toLowerCase()
    }
    if(langKey !== langKeyFromRoute) {
      await setLanguage(langKey)
    }

    selectLangButtonsByLang(langKey)
    await tolgee.changeLanguage(langKey)
    localizeAll()
  }

  const init = async () => {
    await loadLang()

    document.querySelectorAll(`.${LANGUAGE_LINK_CLASS_NAME}`).forEach((el) => {
      el.addEventListener('click', async (e) => {
        e.preventDefault()
        const lang = el.dataset.lang
        await setLanguage(lang)
        document.querySelector('.overlay').click()
      })
    })
  }

  const localizeMeta = () => {
    if(window.pagei18nKey) {
      document.title = tolgee.t(`meta_${window.pagei18nKey}_title`, { noWrap: true })
      document.querySelector('meta[name="description"]')
        .setAttribute('content',  tolgee.t(`meta_${window.pagei18nKey}_description`, { noWrap: true }))
    }
  }

  const localizeAll = () => {
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder
      const placeholder = tolgee.t(key, { noWrap: true })
      if(placeholder !== key) {
        el.setAttribute('placeholder', placeholder)
      }
    })

    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const key = el.dataset.i18nAlt
      const alt = tolgee.t(key, { noWrap: true })
      if(alt !== key) {
        el.setAttribute('alt', alt)
      }
    })

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n
      const localizedText = tolgee.t(key, { noWrap: true })
      if(localizedText !== key) {
        el.textContent = localizedText
      }
    })

    document.querySelectorAll('[data-href]').forEach((el) => {
      const hrefTemplate = el.dataset.href
      const langKey = tolgee.getPendingLanguage()
      if(langKey !== 'en') {
        el.href = hrefTemplate.replace('%lang%', langKey)
      }
    })

    localizeMeta()
  }

  return {
    loadLang,
    setLanguage,
    init,
    localizeAll,
  }
})()
