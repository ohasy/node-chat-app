var socket = io();
socket.on('connect',function(){
    console.log('connected to server')

    // socket.emit('createMessage',{
    //     from:"anyfucking@thing.com",
    //     text:"sardar kya btau"
    // })
})
socket.on('disconnect',function(){
    console.log('diconnected to server')
})

socket.on('newMessage',function(newMsg){
    console.log('New msg',newMsg);
})