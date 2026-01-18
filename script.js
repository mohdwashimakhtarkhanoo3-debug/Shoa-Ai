function sendMessage() {
  const input = document.getElementById("userInput");
  let text = input.value.trim();
  if (text === "") return;

  const chatBox = document.getElementById("chat-box");

  // User message
  const userDiv = document.createElement("div");
  userDiv.className = "user-msg";
  userDiv.innerText = text;
  chatBox.appendChild(userDiv);

  // AI placeholder
  const aiDiv = document.createElement("div");
  aiDiv.className = "ai-msg";

  let lower = text.toLowerCase();

  // Decide placeholder text
  if (isMath(lower)) {
    aiDiv.innerText = "Thinking...";
  } else if (lower.includes("who made you") || lower.includes("kon banaya")) {
    aiDiv.innerText = "Progressing...";
  } else {
    aiDiv.innerText = "Thinking...";
  }

  chatBox.appendChild(aiDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";

  // 3 seconds delay
  setTimeout(() => {
    aiDiv.innerText = getBotReply(text);
  }, 3000);
}

function isMath(msg) {
  msg = msg.replace(/x/g, "*").replace(/=/g, "");
  return /^[0-9+\-*/(). ]+$/.test(msg);
}

function getBotReply(msg) {
  msg = msg.toLowerCase().replace(/x/g, "*").replace(/=/g, "");

  // creator
  if (msg.includes("who made you") || msg.includes("kon banaya")) {
    return "I was made by Mohammad Shoaib Akhtar Khan.";
  }

  // math
  try {
    let ans = eval(msg);
    if (!isNaN(ans)) return "Answer: " + ans;
  } catch {}

  return "Ask me math or who made me 🙂";
}

function enterSend(e) {
  if (e.key === "Enter") sendMessage();
}