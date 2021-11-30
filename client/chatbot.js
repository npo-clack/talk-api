const chatTokenDiv = document.getElementById("chat_token");
const chatTokenInput = document.getElementById("token_input");
const chatTokenButton = document.getElementById("token_send");
const chatWindowDiv = document.getElementById("chat_window");
const chatInputDiv = document.getElementById("chat_input");
const chatMessageInput = document.getElementById("message_input");
const chatMessageButton = document.getElementById("message_send");

const requestUrl = "https://api.a3rt.recruit.co.jp/talk/v1/smalltalk";
let apiToken;

chatTokenButton.onclick = (e) => {
  // apiToken = chatTokenInput.value;
  apiToken = "DZZlK4na6kWXu9MgW44pqf9NeMIFCNjD";
  if (!apiToken) {
    alert("トークンを入力してください。")
    return;
  }

  checkTokenAndDisplayChatWindow();
};

async function checkTokenAndDisplayChatWindow() {
  const result = await requestToTalkApi('おはよう');
  console.log(result);
}

async function requestToTalkApi(text) {
  try {
    const response = await fetch(window.location + "talk", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { apikey: apiToken, query: text }
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    return { error: e };
  }
}
