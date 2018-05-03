const path = require('path');
const publicPath = path.join(__dirname,'../public');

const http = require('http');
const socketIO = require('socket.io');
console.log(publicPath);
const express = require('express');
const bodyparser = require('body-parser');
const port = process.env.PORT || 3000
var app = express();
// var server = http.createServer((req,res)=>{

// }) 
//can be replaced by 
var server = http.createServer(app);
var io = socketIO(server);
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

io.on('connection',(socket)=>{
    console.log('New user connected')
    
    // socket.emit('newMessage',{from:"yash@nodues.com",text:"yoman",createdAt:123});

    socket.on('createMessage',(msg)=>{
        console.log('createMessage',msg);

        io.emit('newMessage',{
            from:msg.from,
            text:msg.text,
            createdAt: new Date().getTime()
        })
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

