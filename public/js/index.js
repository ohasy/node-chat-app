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

socket.on('newMessage',function(message){
    console.log('New msg',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`)
    jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function(){
        //acknowledge function.
    })
});