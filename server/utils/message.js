var moment = require('moment');

module.exports.generateMessage = (from,text) =>{
    return{
        from,
        text,
        createdAt: moment().valueOf()
        //createdAt: new Date().getTime()
        }
};

module.exports.generateLocationMessage = (from,lat,long) =>{
    return{
        from,
        url:`https://www.google.co.in/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
        }
    };