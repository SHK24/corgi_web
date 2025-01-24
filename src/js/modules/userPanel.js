const USER_PANEL_CLASS_NAME = 'js-user-panel'

const refreshUserPanel = () => {
  const token = localStorage.getItem('authToken')
  const userId = localStorage.getItem('userId')
  const email = localStorage.getItem('email')

  const userPanelEl = document.querySelector(`.${USER_PANEL_CLASS_NAME}`)
  const userPanelTextEl = document.querySelector('.js-user-panel-text')
  const USER_PANEL_TYPE_SIGN_IN_CLASS_NAME = 'authorization-button--in'
  const USER_PANEL_TYPE_SIGN_OUT_CLASS_NAME = 'authorization-button--out'
  const USER_PANEL_HIDDEN_CLASS_NAME = 'authorization-button_hidden'
  const USER_PANEL_TYPE_SIGN_IN_TEXT = 'Sign In'

  if (token && userId && email) {
    userPanelEl?.classList.remove(USER_PANEL_TYPE_SIGN_IN_CLASS_NAME)
    userPanelEl?.classList.add(USER_PANEL_TYPE_SIGN_OUT_CLASS_NAME)
    userPanelTextEl && (userPanelTextEl.innerText = email)
  } else {
    userPanelEl?.classList.remove(USER_PANEL_TYPE_SIGN_OUT_CLASS_NAME)
    userPanelEl?.classList.add(USER_PANEL_TYPE_SIGN_IN_CLASS_NAME)
    userPanelTextEl && (userPanelTextEl.innerText = USER_PANEL_TYPE_SIGN_IN_TEXT)
  }
  userPanelEl?.classList.remove(USER_PANEL_HIDDEN_CLASS_NAME)
}

const init = () => {
  refreshUserPanel()

  const userPanelEl = document.querySelector(`.${USER_PANEL_CLASS_NAME}`)
  userPanelEl?.addEventListener('click', function () {
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    if(token && userId) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userId')
      localStorage.removeItem('email')
      refreshUserPanel()
    } else {
      window.location.href = '/auth'
    }
  })
}

window.addEventListener('load', () => {
  init()
})
