// https://testcorgi.com/corgi_ai_page.html
const AI_API_BASE_URL = 'https://dev.ai.getcorgi.com/corgi_chatgpt/'
const TEMPORARY_MESSAGE_CLASS_NAME = 'js-message-temporary'

const Utils = {
  createElementFromHTML (htmlString) {
    const div = document.createElement('div')
    div.innerHTML = htmlString.trim()
    return div.firstChild
  },
  getMessageHtml ({text = '', isUser = false, loading = false, classes=''}) {
    return ''
      + `<div class="chatgpt__message chatgpt__message_${isUser ? 'user' : 'chat'} ${loading ? 'chatgpt__message_loading' : ''} ${classes}">
        <div class="chatgpt__message-inner">
          <div class="chatgpt__avatar"></div>
          <div class="chatgpt__message-text">
            ${text}
          </div>
        </div>
      </div>`
  },
  getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

const chatGptApi = {
  startDialog() {
    var xhttp = new XMLHttpRequest();

    document.getElementById("chatHistory").value = "";

    xhttp.open("POST", URL, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        for (let i = 0; i < JSON.parse(this.response).messages.length; i++) {
          document.getElementById("chatHistory").value += JSON.parse(this.response).messages[i].role + ":" + JSON.parse(this.response).messages[i].content + '\n';
        }
      }
    };

    var userId = document.getElementById('userId').value;

    var pair = document.getElementById('languagesPair').value;

    var sourceLang = pair.split(';')[0];
    var targetLang = pair.split(';')[1];

    xhttp.send(
      JSON.stringify({
        entity: "start_dialog",
        user_id: userId,
        sourceLang: sourceLang,
        targetLang: targetLang
      })
    );
  },
  sendMessage(message='') {
    let user_id = localStorage.getItem('aiUserId') || localStorage.getItem('userId')
    if(!user_id) {
      user_id = Utils.getRandomInt(500, 100500)
      localStorage.setItem('aiUserId', user_id)
    } else {
      user_id = parseInt(user_id)
    }
    if(!message) {
      throw new Error('Can not send message: message text not found')
    }
    return fetch(AI_API_BASE_URL, {
      method: 'POST',
      body: JSON.stringify({
        entity: 'send_one_message',
        user_id,
        message,
        isSound: false,
      })
    }).then(response => response.json())
  },
  clearDialog() {
    var xhttp = new XMLHttpRequest();

    document.getElementById("chatHistory").value = "";

    xhttp.open("POST", URL, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
      }
    };

    var userId = document.getElementById('userId').value;

    xhttp.send(
      JSON.stringify({
        entity: "clear_dialog",
        user_id: userId,
      })
    );
  },
  getLanguages() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", URL, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
      }
    };

    var userId = document.getElementById('userId').value;

    xhttp.send(
      JSON.stringify({
        entity: "get_languages",
        user_id: userId,
      })
    );
  },
  getTimestamp() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", URL, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
      }
    };

    var userId = document.getElementById('userId').value;

    xhttp.send(
      JSON.stringify({
        entity: "get_timestamp",
        user_id: userId,
      })
    );
  },
  setContext() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", URL, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
      }
    };

    var userId = document.getElementById('userId').value;
    var context = document.getElementById('context').value;

    var place = context.split(';')[0];
    var role = context.split(';')[1];

    xhttp.send(
      JSON.stringify({
        entity: "set_context",
        user_id: userId,
        assistantRole: role,
        place: place
      })
    );
  },
  setLanguages() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", URL, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
      }
    };

    var userId = document.getElementById('userId').value;
    var pair = document.getElementById('languagesPair').value;

    var sourceLang = pair.split(';')[0];
    var targetLang = pair.split(';')[1];

    xhttp.send(
      JSON.stringify({
        entity: "set_languages",
        user_id: userId,
        sourceLang: sourceLang,
        targetLang: targetLang
      })
    );
  },
  setLimit() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", URL, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
      }
    };

    var userId = document.getElementById('userId').value;
    var limit = document.getElementById('limit').value;

    xhttp.send(
      JSON.stringify({
        entity: "set_limit",
        user_id: userId,
        limit: limit
      })
    );
  }
}

const MessageManager = {
  addMessage ({text = '', isUser = false, loading = false, isTemporary=false}) {
    const messagesContainerEl = document.querySelector('.js-messages')
    const messageInputEl = document.querySelector('.js-message-input')
    const messageHtmlStr = Utils.getMessageHtml({
      text,
      isUser,
      loading,
      classes: isTemporary ? TEMPORARY_MESSAGE_CLASS_NAME : ''
    })
    const messageEl = Utils.createElementFromHTML(messageHtmlStr)
    messagesContainerEl.appendChild(messageEl)
    messagesContainerEl.scrollTo(0, messagesContainerEl.scrollHeight)
    messageInputEl.value = ''
    messageInputEl.focus()
  },
  clearMessages (temporaryOnly=false) {
    if(temporaryOnly) {
      const tmpMessages = document.querySelectorAll(`.${TEMPORARY_MESSAGE_CLASS_NAME}`)
      tmpMessages.forEach(messageEl => {
        messageEl.remove()
      })
    } else {
      const messagesContainerEl = document.querySelector('.js-messages')
      messagesContainerEl.innerHTML = ''
    }
  },
  init () {
    const sendMessageBtn = document.querySelector('.js-send-message')
    const messageInputEl = document.querySelector('.js-message-input')
    const SEND_BTN_DISABLED_CLASS_NAME = 'chatgpt__btn_disabled'

    const sendUserMessage = async () => {
      const messageInputEl = document.querySelector('.js-message-input')
      if(messageInputEl.value) {
        const hasIntro = !!document.querySelector('.js-messages .js-chatgpt-intro')
        if(hasIntro) {
          MessageManager.clearMessages()
        }

        const text = messageInputEl.value

        MessageManager.addMessage({
          text,
          isUser: true,
          isTemporary: true,
        })

        MessageManager.addMessage({
          text: '...',
          isUser: false,
          loading: true,
          isTemporary: true,
        })

        const response = await chatGptApi.sendMessage(text)

        const messageLoading = document.querySelector('.chatgpt__message_loading')
        messageLoading.remove()

        if(response.success === 'OK') {
          MessageManager.clearMessages(true)

          for(let i=0, len = response.messages.length; i < len; i++) {
            const {
              content: text,
              role,
            } = response.messages[i]
            MessageManager.addMessage({
              text,
              isUser: role === 'user'
            })
          }
        }
      }
    }

    sendMessageBtn && sendMessageBtn.addEventListener('click', async function (e) {
      e.preventDefault()
      if(!sendMessageBtn.classList.contains(SEND_BTN_DISABLED_CLASS_NAME)) {
        await sendUserMessage()
      }
    })


    messageInputEl && messageInputEl.addEventListener('keypress', async function(e) {
      if (e.key === 'Enter') {
        e.preventDefault()
        if(!sendMessageBtn.classList.contains(SEND_BTN_DISABLED_CLASS_NAME)) {
          await sendUserMessage()
        }
      }
    })

    messageInputEl && messageInputEl.addEventListener('keyup', function(e) {
      if(messageInputEl.value) {
        sendMessageBtn.classList.remove(SEND_BTN_DISABLED_CLASS_NAME)
      } else {
        sendMessageBtn.classList.add(SEND_BTN_DISABLED_CLASS_NAME)
      }
    })

    messageInputEl && messageInputEl.addEventListener('change', function(e) {
      if(messageInputEl.value) {
        sendMessageBtn.classList.remove(SEND_BTN_DISABLED_CLASS_NAME)
      } else {
        sendMessageBtn.classList.add(SEND_BTN_DISABLED_CLASS_NAME)
      }
    })

    /*MessageManager.clearMessages()
    MessageManager.addMessage({
      text: 'Enter your message to start a chat. This could be a question, a statement, or any other text.',
      isUser: false
    })
    MessageManager.addMessage({
      text: 'Enter your message to start a chat. This could be a question, a statement, or any other text.',
      isUser: true
    })
    MessageManager.addMessage({
      text: 'Enter your message to start a chat. This could be a question, a statement, or any other text.',
      isUser: false
    })*/
  }
}

window.addEventListener('load', () => {
  MessageManager.init()
})
