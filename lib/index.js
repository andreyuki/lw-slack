const batch = 1885; // change to your own batch id
const baseUrl = "https://chat.api.lewagon.com/";

// Your turn to code!
// const refreshButton = document.getElementById("refresh");
const chatSection = document.querySelector(".chat-conversation");
let lastMessageId = 1;

function scrollToBottom() {
  const chatConversation = document.querySelector(".chat-conversation");
  chatConversation.scrollTop = chatConversation.scrollHeight;
}


const addMessage = (message) => {
  const receivedMessage = `
  <div class="message">
    <img
      src="https://picsum.photos/40/40?random=1"
      alt="profile-pic"
    />
    <div class="message-content">
      <p><strong>${message.author}</strong></p>
      <p>${message.content}</p>
    </div>
  </div>`
  chatSection.insertAdjacentHTML("beforeend", receivedMessage);
}

const refreshMessages = () => {
  const url = `${baseUrl}${batch}/messages`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      data.messages.forEach((message) => {
        if (message.id > lastMessageId) {
          addMessage(message)
          lastMessageId = message.id;
          scrollToBottom();
        }
      });
    });
}

setInterval(() => {
  refreshMessages();
}, 1000);

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
})

const yourName = document.getElementById("your-name");
const yourMessage = document.getElementById("your-message");

document.addEventListener("keyup", (event) => {
  // event.preventDefault();
  if (event.key === "Enter" && yourMessage.value !== '') {
    const newMessage = { author: yourName.innerText, content: yourMessage.value };
    const url = `${baseUrl}${batch}/messages`;

    fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage)
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data: " + response.status);
        }
      })
      .then((data) => {
        refreshMessages();
        yourMessage.value = '';
      });
  }
});
