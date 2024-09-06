// https://testcorgi.com/corgi_ai_page.html
const URL = "https://getcorgi.com:4443/corgi_chatgpt/"

const Utils = {
  createElementFromHTML (htmlString) {
    const div = document.createElement('div')
    div.innerHTML = htmlString.trim()
    return div.firstChild
  },
  getMessageHtml ({text = '', isUser = false}) {
    return ''
      + `<div class="chatgpt__message chatgpt__message_${isUser ? 'user' : 'chat'}">
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
  addMessage ({text = '', isUser = false}) {
    const messagesContainerEl = document.querySelector('.js-messages')
    const messageHtmlStr = Utils.getMessageHtml({text, isUser})
    const messageEl = Utils.createElementFromHTML(messageHtmlStr)
    messagesContainerEl.appendChild(messageEl)
  },
  clearMessages () {
    const messagesContainerEl = document.querySelector('.js-messages')
    messagesContainerEl.innerHTML = ''
  },
  init () {
    document.querySelector('.js-send-message').addEventListener('click', function (e) {
      e.preventDefault()
      const messageInputEl = document.querySelector('.js-message-input')
      if(messageInputEl.value) {
        MessageManager.addMessage({
          text: messageInputEl.value,
          isUser: true
        })
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
