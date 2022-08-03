
const room = window.location.pathname.replace(/\//g,'');
const socket = io(`http://localhost:3000/${room}`)

let user = null

socket.on('update_messagens', (messages)=>{
    
    updateMessagesOnScreen(messages)
})

 function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('#messages');

    let list_messages = '<ul>'

    messages.forEach(message => {
        list_messages += `<li>${message.user}: ${message.msg}</li>`
    });
    list_messages += '</ul>'

    div_messages.innerHTML = list_messages 

 }

 document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#messege_form')
    form.addEventListener('submit', (e)=>{
        e.preventDefault();//para prever o comportamento padrão do formulario de mostrar o valor da variavel
       
       if(!user){
            alert('Defina um usuario');
            return;
       }

        const message = document.forms['messege_form_name']['msg'].value;
        socket.emit('new_message', {user:user, msg:message})
        document.forms['messege_form_name']['msg'].value = ''
    })

    const userForm = document.querySelector('#user_form')
    userForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        user = document.forms['user_form_name']['user'].value;
        userForm.parentNode.removeChild(userForm)
    })
 })