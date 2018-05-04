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

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log("position:",position);
            socket.emit('createLocationMessage',{
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude,
            },function(fromServer){
                console.log("Status:",fromServer)
            })
    },function(){
        alert('Unable to fetch location.');
    })
})