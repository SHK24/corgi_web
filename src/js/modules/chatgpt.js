// https://testcorgi.com/corgi_ai_page.html
const URL = "https://getcorgi.com:4443/corgi_chatgpt/"

const getMessageHtml = (text='', isUser=false) => {
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


function startDialog() {
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
}

function sendMessage() {
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
      entity: "send_message",
      user_id: userId,
      message: userMessage,
      isSound: false,
      tone: tone
    })
  );
}

function clearDialog() {
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
}

function getLanguages() {
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
}

function getTimestamp() {
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
}

function setContext() {
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
}

function setLanguages() {
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
}

function setLimit() {
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

const addMessage = () => {

}

window.addEventListener('load', () => {
  // TODO
})
