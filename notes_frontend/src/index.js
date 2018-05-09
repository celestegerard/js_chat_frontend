document.addEventListener("DOMContentLoaded", function() {
  let form = document.getElementById('form')
  const container = document.getElementById('container')
  let currentAlias
  let userId


  form.addEventListener("submit", function(e){
    e.preventDefault();
    let userName = document.getElementById('username')
    createUser(userName.value)
    userName.value = ''
  })

  //container.addEventListener('click',selectChatRoomHandler)

  function createUser(userName) {
    return fetch("http://localhost:3000/api/v1/users", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user:{username:userName}})
    }).then(response => response.json())
    .then( (userJSON) => {currentAlias = userName;userId=userJSON.user_id} )
    .then( fetchAnddisplayRoom )
  }

  function fetchAnddisplayRoom() {
    let url = `http://localhost:3000/api/v1/messages`
    fetch(url)
    .then( r=>r.json() )
    .then( displayRoom )
  }

  function displayRoom(messagesJSON) {
    container.innerHTML = ''
    const messageFormHTML = `
      <form id='message-form'>
        <input id='new-message-input' type='text'>
        <button type='submit'>Send message</button>
      </form>
    `

    container.innerHTML += messageFormHTML
    const messageForm = document.getElementById('message-form')
    messageForm.addEventListener('submit',(e) => {
      e.preventDefault()
      const messageInput = document.getElementById('new-message-input')
      sendMessage(messageInput.value)
      messageInput.value = ''
    })

    let messageFrame =  document.createElement("div")
    container.append(messageFrame)

    setInterval(fetchMessages,1000)

    function fetchMessages() {
      let url = `http://localhost:3000/api/v1/messages`
      fetch(url)
      .then( r=>r.json() )
      .then( updateMessages )
    }

    function updateMessages(messagesJSON) {
      messageFrame.innerHTML = ''
      messagesJSON.forEach(createMessageElement)
    }


    function createMessageElement(messageJSON) {
      let messageContainer = document.createElement("div")
      messageContainer.className += "message-container";
      let message = document.createElement("div")
      messageContainer.append(message)
      message.innerText = messageJSON.body

      let messageOwner = messageJSON.user_id === userId ? 'my-messages' : 'message-from-others'
      message.className += messageOwner
      messageFrame.append(messageContainer)
    }
    messagesJSON.forEach(createMessageElement)
  }

  function sendMessage(messageBody) {
    let url = `http://localhost:3000/api/v1/messages`
    let config = {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({message:{body:messageBody,user_id:userId}})
    }
    fetch(url,config).then(r=>r.json()).then(console.log)
  }


})
