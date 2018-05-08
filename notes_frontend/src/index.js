document.addEventListener("DOMContentLoaded", function() {
  let form = document.getElementById('form')
  const container = document.getElementById('container')
  let currentAlias
  let activeRoom
  let userId

  form.addEventListener("submit", function(e){
    e.preventDefault();
    let userName = document.getElementById('username')
    createUser(userName.value)
    userName.value = ''
  })

  container.addEventListener('click',selectChatRoomHandler)

  function createUser(userName) {
    return fetch("http://localhost:3000/api/v1/users", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user:{username:userName}})
    }).then(response => response.json())
    .then( (userJSON) => {currentAlias = userName;userId=userJSON.user_id} )
    .then( fetchChatRooms )
    .then( renderChatRooms )
  }

  function fetchChatRooms(){
      return fetch(`http://localhost:3000/api/v1/rooms`)
      .then(response => response.json())
  }

  function renderChatRooms(roomsJSON) {
      console.log("works!")
      let ul = document.createElement("ul")
      container.append(ul)
      roomsJSON.rooms.forEach(function(room) {

        let li = document.createElement("li")
        li.innerText = room.name
        li.dataset.roomId = room.id
        ul.append(li)
        console.log(room)
    })
  }

  function selectChatRoomHandler(e) {

    if (event.target.dataset.roomId) {
      let roomId = parseInt(event.target.dataset.roomId)
      fetchAnddisplayRoom(roomId)
    }
  }

  function fetchAnddisplayRoom(roomId) {
    activeRoom = roomId
    let url = `http://localhost:3000/api/v1/rooms/${roomId}/messages`
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

    setInterval(fetchMessagesForCurrentRoom,3000)

    function fetchMessagesForCurrentRoom() {
      let url = `http://localhost:3000/api/v1/rooms/${activeRoom}/messages`
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
    let url = `http://localhost:3000/api/v1/rooms/${activeRoom}/messages`
    let config = {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({body:messageBody,user_id:userId,room_id:activeRoom})
    }
    fetch(url,config).then(r=>r.json()).then(console.log)
  }


})






//

//
//   function welcomeUserToChat() {
//     fetchChatRooms()
//     .then(roomsJSON=>renderChatRooms(roomsJSON))
//   }
//
//   function createRoom(){
//     return fetch(`http://localhost:3000/api/v1/rooms/${messages.room_id}`, {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({})
//     }).then(response => response.json())
//   }
//
//   function renderRoom(roomJSON){}
//
//   function postMessages(){
//     return fetch(`http://localhost:3000/api/v1/rooms`, {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({messages})
//     }).then(response => response.json())
//   }
//

//
//
//
