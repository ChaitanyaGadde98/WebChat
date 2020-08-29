// const socket = io('http://localhost:3000')
const socket = io('http://chaitanyagadde98.github.io:3000')
const messageContainer = document.getElementById('msg-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('msg-input')

const name = prompt('What is your name?')
// appendSendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendRecvMessage(`${data.message}`)
})

socket.on('user-connected', name => {
  appendRecvMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendRecvMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendSendMessage(`${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendSendMessage(message) {
  if(message != '' && message.charAt(0) != ' ' )
  {
    const messageElement = document.createElement('div')
    messageElement.setAttribute("id", "send-msg")
    messageElement.innerHTML = '<p> '+ message +'</p>';
    messageContainer.append(messageElement)
  }
  
}

function appendRecvMessage(message) {
  if(message != ''  && message.charAt(0) != ' ')
  {
    const messageElement = document.createElement('div')
    messageElement.setAttribute("id", "recv-msg")
    messageElement.innerHTML = '<p> '+ message +'</p>';
    messageContainer.append(messageElement)
  }
}