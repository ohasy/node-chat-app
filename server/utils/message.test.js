var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
      it('should generate correct message object',()=>{
          var from = 'Jen';
          var text = 'some message';
          var message =generateMessage(from,text);

          expect(typeof message.createdAt).toBe('number');
          expect(message.from).toBeTruthy();
          expect(message.text).toBeTruthy();
      })
})

describe('generate Location Message',()=>{
    it('should generate correct Location message object',()=>{
        var from = 'Jen';
        var lat = 1;
        var long = 1;
        var message = generateLocationMessage(from,lat,long);
        var url = `https://www.google.co.in/maps?q=1,1`
        expect(typeof message.createdAt).toBe('number');
        expect(message.url).toEqual(url);
    })
})