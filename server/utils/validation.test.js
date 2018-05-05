const expect = require('expect')

const {isRealString} = require('./validation')

describe('isRealString',()=>{
    it('should reject non-string values', ()=>{
        var res = isRealString(98)
        expect(res).toBe(false);
    })
    it('should rejectstring with onlu spaces', ()=>{
        var res = isRealString('        ')
        expect(res).toBe(false);
    })
    it('should allow string with non space characters', ()=>{
        var res = isRealString(' Andrew ')
        expect(res).toBe(true);
    })
})