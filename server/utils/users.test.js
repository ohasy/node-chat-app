const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{
    var users;

    beforeEach(()=>{
        users = new Users();
        users.users = [
            {
                id: "1",
                name:'jen',
                room:'the office fans' 
            },{
                id:"2",
                name:'akshay',
                room:'the office fans'
            },{
                id:"3",
                name:'yash',
                room:'React'
            }
        ]
    })
    
    it('should add new user',()=>{
        var users = new Users()
        var user = {
            id:123,
            name:'yash',
            room:'the office fans'
        }
        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]); 
    })

    it('should remove the user',()=>{
         var userId = '3';
         var user = users.removeUser(userId)
         expect(user.id).toBe(userId)
         expect(users.users.length).toBe(2);
    })

    it('should not remove the user',()=>{
        var userId = '99';
        var user = users.removeUser(userId)

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    })

    it('should find the user',()=>{
        var userId = '3';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);

    })

    it('should not find the user',()=>{
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    })

    it('should return names for react course',()=>{
        var userList = users.getUserList('React');

        expect(userList).toEqual(['yash']); 
    })
})