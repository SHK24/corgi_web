window.langSwitcher = (() => {
  const LANGUAGE_STORAGE_KEY = 'langCode'
  const LANGUAGE_LINK_CLASS_NAME = 'js-lang-item'
  const ACTIVE_CLASS_NAME = 'language-selection__link_active'
  const SELECTED_LANG_FLAG_IMAGE_CLASS_NAME = 'js-selected-lang-flag'
  const LANGUAGE_ITEM_NAME_CLASS_NAME = 'js-lang-name'

  const setLanguage = async (langKey='en') => {
    selectLangButtonsByLang(langKey)
    await tolgee.changeLanguage(langKey)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, langKey)
    localizeAll()
  }

  const selectLangButtonsByLang = (langKey='en') => {
    const selectedLangItemEl = document.querySelector(`.${LANGUAGE_LINK_CLASS_NAME}[data-lang="${langKey}"]`)
    const flagImgEl = selectedLangItemEl.querySelector('img')
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

  const loadLang = async function () {
    const langKey = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en'
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

  const localizeAll = () => {
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
  }

  return {
    loadLang,
    setLanguage,
    init,
    localizeAll,
  }
})()
