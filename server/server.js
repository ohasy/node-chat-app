const path = require('path');
const publicPath = path.join(__dirname,'../public');
console.log(publicPath);
const express = require('express');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 3000
var app = express()

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));


// app.use(bodyparser.json())

app.use(express.static(publicPath))

// app.get('/',(req,res)=>{
//     res.sendFile(publicPath+"/\index.html");
// })

app.listen(PORT,()=>{
    console.log(`Started on port ${PORT}`);
})

module.exports={app}