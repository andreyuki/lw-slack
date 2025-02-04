const batch = 1885; // change to your own batch id
const baseUrl = "https://chat.api.lewagon.com/";

// Your turn to code!
const refreshButton = document.getElementById("refresh");
const messages = document.querySelector("#messages").querySelector("ul");

refreshButton.addEventListener("click", (event) => {
  const url = `${baseUrl}${batch}/messages`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      data.messages.forEach((message) => {
        const listItem = `<li>${message.content} was send by ${message.author} on ${message.channel}</li>`;
        messages.insertAdjacentHTML("beforeend", listItem);
      });
    });
});

const yourName = document.getElementById("your-name");
const yourMessage = document.getElementById("your-message");
const form = document.getElementById("comment-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newMessage = { author: yourName.value, content: yourMessage.value };
  const url = `${baseUrl}${batch}/messages`;

  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMessage)
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
});
