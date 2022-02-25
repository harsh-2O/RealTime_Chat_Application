
const socket = io("http://localhost:8000");

// Get DOM elements in respective JS variables.
const form = document.getElementById('send-container');
const msgInput = document.getElementById('sendMsg');
const msgContainer = document.querySelector(".container");

// Audio that will play on receiving messages.
var audio = new Audio('ting.mp3');

// Function which will append event info to the container.
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}


// Ask new user for his or her name and let the server know.
const name = prompt("Enter your name to join : ");
socket.emit('new-user-joined', name);

// If new user joins, receive the event form the client server.
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
})

// Server sends a message receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})

// If the form gets submitted,send the message to server.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';
})

// If user leaves the chat append the info on container.
socket.on('leave', name => {
    append(`${name} has left the chat`, 'left');
})