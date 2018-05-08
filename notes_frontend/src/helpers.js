// TO DO:

// function createRoom()
//
// function getMessages()

const messagesArray = [
{
id: 1,
user_id: 8,
room_id: 1,
body: "first message",
created_at: "2018-05-08T13:23:39.028Z",
updated_at: "2018-05-08T13:23:39.028Z"
},
{
id: 2,
user_id: 3,
room_id: 1,
body: "Response to first message",
created_at: "2018-05-08T13:24:26.190Z",
updated_at: "2018-05-08T13:24:26.190Z"
}
]

function displayMessages(messagesArray,selfId) {

}

//   function displayMessages(messagesArray,selfId) {
//     const messagesContainer = document.createElement("div")
//     container.append(messagesContainer)
//
//     console.log(userId)
//     if(userId === "8") {
//       messagesArray.forEach(message => {
//         return message.body.innerText
//       } else {
//       messagesArray.forEach(message => {
//           return message.body.innerText
//       }
//   }
//
//   if (mine) {
//     print
//   } else {
//
//   }
//
// })

// get the index of messages for a certain room



function displayMessages(container,messagesArray,selfId) {

  function createMessageContainer(messageObj){
    let messageContainer = document.createElement("div")
    messageContainer.className += "message-container"
  }

  function createMessage(messageObj){
    let message = document.createElement("div")
    message.innerText = messageObj.body
  }

  function messageFrom

  function createMessageElement(messageObj) {
    let messageContainer = document.createElement("div")
    messageContainer.className += "message-container"
    let message = document.createElement("div")
    message.innerText = messageObj.body
    let messageFrom = messageObj.user_id === selfId ? 'my-messages' : 'message-from-others'
    message.className += messageFrom;
    messageContainer.append(message)
    container.append(messageContainer)
  }

  messagesArray.forEach(mObj => createMessageElement(mObj))
}
