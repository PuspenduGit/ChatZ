const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('send-message');
const messageContainer = document.querySelector('.container');

var audio = new Audio('../assets/ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add(position === 'right' ? 'client' : 'server' );
    messageElement.classList.add('message');
    messageElement.innerHTML = (
        `<div class="message-content">
            <span>${message}</span>
        </div>`
    )
    messageContainer.append(messageElement);
    position == 'left' ? audio.play() : null;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

const user_name = prompt("Enter your name: ");
socket.emit("new-join", user_name);

socket.on('join', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('leave', name => {
    append(`${name} left the chat`, 'left');
});

// socket.emit('new-join', prompt('Enter your name: '));
