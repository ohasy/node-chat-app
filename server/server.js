const path = require('path');
const publicPath = path.join(__dirname,'../public');
const https = require('https');
const http = require('http');
const socketIO = require('socket.io');
console.log(publicPath);
const express = require('express');
const bodyparser = require('body-parser');
const port = process.env.PORT || 3000
var app = express();
var {generateMessage} = require('./utils/message');
// var server = http.createServer((req,res)=>{

// }) 
//can be replaced by 
var server = http.createServer(app);
var io = socketIO(server);
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

//for heroku.
// io.configure(function () { 
//     io.set("transports", ["xhr-polling"]); 
//     io.set("polling duration", 10); 
//   });

io.on('connection',(socket)=>{
    console.log('New user connected')
    
    // socket.emit('newMessage',{from:"yash@nodues.com",text:"yoman",createdAt:123});
    socket.emit('newMessage',generateMessage("Admin","Welcome to the chat app"))
    socket.broadcast.emit('newMessage',generateMessage("Admin","new user has joined."))

    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text))
        callback('This is from the server.')
        // socket.broadcast.emit('newMessage',generateMessage(message.from,message.text))
    })
    socket.on('createLocationMessage',(coords,callback)=>{
        console.log('Coords:',coords);
        io.emit('newMessage',generateMessage('Admin',`${coords.latitude}, ${coords.longitude}`))
        callback('Location sent successfully.')
        // socket.broadcast.emit('newMessage',generateMessage(message.from,message.text))
    })
    socket.on('disconnect',()=>{
        console.log('Client Disconnected')
    })
})


// app.use(bodyparser.json())

app.use(express.static(publicPath))

// app.get('/',(req,res)=>{
//     res.sendFile(publicPath+"/\index.html");
// })

server.listen(port,()=>{
    console.log(`Started on port ${port}`);
})

