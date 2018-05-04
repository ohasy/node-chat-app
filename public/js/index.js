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

var messageTextBox = jQuery('[name=message]')

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('')
        //acknowledge function.
    })
});

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from}`)
    a.attr('href',message.url)
    li.append(a)
    jQuery('#messages').append(li) 
})

var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.')
    }

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        console.log("position:",position);
            socket.emit('createLocationMessage',{
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude,
            },function(fromServer){
                console.log("Status:",fromServer)
            })
    },function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    })
})