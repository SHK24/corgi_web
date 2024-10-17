// https://testcorgi.com/corgi_ai_page.html
const URL = "https://getcorgi.com:4443/corgi_chatgpt/"

const Utils = {
  createElementFromHTML (htmlString) {
    const div = document.createElement('div')
    div.innerHTML = htmlString.trim()
    return div.firstChild
  },
  getMessageHtml ({text = '', isUser = false, loading = false}) {
    return ''
      + `<div class="chatgpt__message chatgpt__message_${isUser ? 'user' : 'chat'} ${loading ? 'chatgpt__message_loading' : ''}">
        <div class="chatgpt__message-inner">
          <div class="chatgpt__avatar"></div>
          <div class="chatgpt__message-text">
            ${text}
          </div>
        </div>
      </div>`
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
  sendMessage() {
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
    var userMessage = document.getElementById('userMessage').value;
    var tone = document.getElementById('tone').value;

    xhttp.send(
      JSON.stringify({
        entity: 'send_message',
        user_id: userId,
        message: userMessage,
        isSound: false,
        tone: tone
      })
    );
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
  addMessage ({text = '', isUser = false, loading = false}) {
    const messagesContainerEl = document.querySelector('.js-messages')
    const messageInputEl = document.querySelector('.js-message-input')
    const messageHtmlStr = Utils.getMessageHtml({ text, isUser, loading })
    const messageEl = Utils.createElementFromHTML(messageHtmlStr)
    messagesContainerEl.appendChild(messageEl)
    messagesContainerEl.scrollTo(0, messagesContainerEl.scrollHeight)
    messageInputEl.value = ''
    messageInputEl.focus()
  },
  clearMessages () {
    const messagesContainerEl = document.querySelector('.js-messages')
    messagesContainerEl.innerHTML = ''
  },
  init () {
    const sendMessageBtn = document.querySelector('.js-send-message')
    const messageInputEl = document.querySelector('.js-message-input')
    const SEND_BTN_DISABLED_CLASS_NAME = 'chatgpt__btn_disabled'

    const sendUserMessage = () => {
      const messageInputEl = document.querySelector('.js-message-input')
      if(messageInputEl.value) {
        const hasIntro = !!document.querySelector('.js-messages .js-chatgpt-intro')
        if(hasIntro) {
          MessageManager.clearMessages()
        }

        MessageManager.addMessage({
          text: messageInputEl.value,
          // text: 'Unlock the full potential of ChatGPT with free, no-signup access. Whether you\'re in school or at home, enjoy ChatGPT for all your conversational AI needs. Experience seamless interactions and explore endless possibilities with ChatGPT anytime, anywhere',
          isUser: true
        })

        MessageManager.addMessage({
          text: '...',
          isUser: false,
          loading: true
        })

        setTimeout(function () {
          const messageLoading = document.querySelector('.chatgpt__message_loading')
          messageLoading.remove()

          MessageManager.addMessage({
            text: 'ChatGPT works through a process called natural language processing (NLP). It uses a deep learning model known as a transformer to analyze and generate text. The model has been trained on a diverse dataset that includes books, websites, and other textual content, enabling it to understand context and respond appropriately. When you type a question or a statement, ChatGPT processes the input, generates a response based on its training data, and delivers a coherent and contextually relevant reply. The technology behind ChatGPT is continually refined to improve its accuracy, relevance, and fluency in conversations.',
            isUser: false
          })
        }, 500)
      }
    }

    sendMessageBtn.addEventListener('click', function (e) {
      e.preventDefault()
      if(!sendMessageBtn.classList.contains(SEND_BTN_DISABLED_CLASS_NAME)) {
        sendUserMessage()
      }

    })


    messageInputEl.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault()
        if(!sendMessageBtn.classList.contains(SEND_BTN_DISABLED_CLASS_NAME)) {
          sendUserMessage()
        }
      }
    })

    messageInputEl.addEventListener('keyup', function(e) {
      if(messageInputEl.value) {
        sendMessageBtn.classList.remove(SEND_BTN_DISABLED_CLASS_NAME)
      } else {
        sendMessageBtn.classList.add(SEND_BTN_DISABLED_CLASS_NAME)
      }
    })

    messageInputEl.addEventListener('change', function(e) {
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
