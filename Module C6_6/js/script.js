const sendBtn = document.querySelector(".btn-send");
const sendGeo = document.querySelector(".btn-geo");
const msgPlace = document.querySelector(".messages-place");
const msgInput = document.querySelector(".msg_input");
const btnConnect = document.querySelector(".btn-connect");
const wsUri = "wss://echo-ws-service.herokuapp.com/";
let websocket;
let canShowResponse = true;


function WriteMsg(text, style) {
  let html = msgPlace.innerHTML;
  switch(style) {
    case 'server':
      if (canShowResponse){
        html = html + `<div class="message"><p>Сервер:</p><p>${text}</p></div>`;
      }else{
        canShowResponse = true;
      };
      break;
    case 'user':
      html = html + `<div class="message msg-right">${text}</div>`;
      break;
    case 'system':
      html = html + `<div class="msg-system">${text}</div>`;
      break;
    case 'error':
      html = html + `<div class="msg-error">${text}</div>`;
      break;
    case 'position':
      html = html + `<div class="message msg-right"><a href="${text}">Гео-локация</a></div>`;
  };
  msgPlace.innerHTML = html; 
};


function Connect () {
  WriteMsg("Попытка установить соедиение ...", "system");
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    WriteMsg("Соединение установлено.", "system");
    btnConnect.style = "display: none";
  };
  websocket.onclose = function(evt) {
    WriteMsg("Соединение разорвано.", "system");
    btnConnect.style = "display: block";
  };
  websocket.onmessage = function(evt) {
    WriteMsg(evt.data, "server");
  };
  websocket.onerror = function(evt) {
    WriteMsg("Ошибка соединения !", "error");
  };
};


document.addEventListener("DOMContentLoaded", () => {
  Connect();

  if (!("geolocation" in navigator)) {
    sendGeo.style = "display: none";
  };
});


sendBtn.addEventListener("click", () => {
  const message = msgInput.value;
  if (message) {
    WriteMsg(message, "user");
    websocket.send(message);
    msgInput.value = "";
  }
});


sendGeo.addEventListener("click", () => {
  const message = msgInput.value;
  navigator.geolocation.getCurrentPosition((position) => {
    const { coords } = position;
    canShowResponse = false;
    websocket.send(position);
    const text = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
    WriteMsg(text, "position");
  });
});


btnConnect.addEventListener("click", () => {
  Connect();
});