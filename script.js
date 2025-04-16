document.body.insertAdjacentHTML(
  "beforeend",
  /*html*/ `
    <main id="main">
        <input type="number" id="charCount" value="20" min="1" title="Enter character count here">
        <input type="text" id="output" title="Generated password" readonly>
        <input type="button" value="copy" title="Copy password to clipboard" id="copyBtn">
        <input type="button" value="generate" title="Generate password" id="generateBtn">
    </main>
`
);

const messagesEl = document.createElement("div");
messagesEl.id = "messages";
document.body.prepend(messagesEl);

const mainEl = document.getElementById("main");
const generateBtnEl = document.getElementById("generateBtn");
const outputEl = document.getElementById("output");
const charCountEl = document.getElementById("charCount");
const copyBtnEl = document.getElementById("copyBtn");

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";

function generatePassword() {
  let finalPass = "";
  const charLimit = Math.max(1, Number(charCountEl.value));
  for (let i = 0; i <= charLimit; i++) {
    finalPass += chars[Math.floor(Math.random() * chars.length)];
  }
  outputEl.value = finalPass;
}

outputEl.addEventListener("click", (event) => {
  event.target.select();
});

copyBtnEl.addEventListener("click", (event) => {
  outputEl.select();
  navigator.clipboard.writeText(outputEl.value);

  messagesEl.innerHTML = "";
  const msgEl = messagesEl.appendChild(document.createElement("div"));
  msgEl.classList.add("msg", "opacity0");
  msgEl.classList.add("opacity1");
  msgEl.innerText = "Password copied to clipboard";

  const mainElPos = mainEl.getBoundingClientRect();
  messagesEl.style.top = mainElPos.bottom + 5 + "px";

  const removeBtnTimeout = setTimeout(() => {
    msgEl.remove();
  }, 2500);

  msgEl.addEventListener("click", (e) => {
    clearTimeout(removeBtnTimeout);
    msgEl.remove();
  });
});

charCountEl.addEventListener("change", () => {
  if (charCountEl.value <= 100) {
    generatePassword();
  }
});

generateBtnEl.addEventListener("click", generatePassword);
generatePassword();
