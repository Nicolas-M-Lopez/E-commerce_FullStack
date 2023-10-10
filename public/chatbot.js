const socket = io()
 
let userName

Swal.fire({
    title: "Please write your name",
    input: "text",
    inputValidator: (value) => !value && "Write your name",
    allowOutsideClick: false,
}).then((res)=>{
    userName = res.value
    document.getElementById("user").innerHTML = userName
    socket.emit("auth", userName)
    console.log(userName)
})

let chatbox = document.getElementById("chatbot")
chatbox.addEventListener('keyup', send)

function send (e){
    if(e.key === 'Enter'){
        console.log(chatbox.value)
        socket.emit("new_message", {
            userName,
            message: chatbox.value
        })
        chatbox.value=''
    }
}

