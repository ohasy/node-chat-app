

module.exports.generateMessage = (from,text) =>{
    return{
        from,
        text,
        createdAt: new Date().getTime()
        }
};

module.exports.generateLocationMessage = (from,lat,long) =>{
    return{
        from,
        url:`https://www.google.co.in/maps?q=${lat},${long}`,
        createdAt: new Date().getTime()
        }
    };