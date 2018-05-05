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
var {generateMessage,generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation') 

const {Users} = require('./utils/users')
// var server = http.createServer((req,res)=>{

// }) 
//can be replaced by 
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();
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



    socket.on('join',(params,callback)=>{

        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('name and room are required.')
        }



        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room))

        //refs
        //io.to(params.room).emit
        //socket.brodcast.to(params.room).emit
        //socket.emit

        socket.emit('newMessage',generateMessage("Admin","Welcome to the time kill app"))

        socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin",`${params.name} has joined.`))
        
        callback();
    });

    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text))
        callback()
        // socket.broadcast.emit('newMessage',generateMessage(message.from,message.text))
    })

    socket.on('createLocationMessage',(coords,callback)=>{
        console.log('Coords:',coords);
        io.emit('newLocationMessage',generateLocationMessage(coords.from,coords.latitude,coords.longitude))
        callback('Location sent successfully.')
        // socket.broadcast.emit('newMessage',generateMessage(message.from,message.text))
    })

    socket.on('disconnect',()=>{
        console.log('Client Disconnected')
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin:',`${user.name} has left.`));
        }
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

