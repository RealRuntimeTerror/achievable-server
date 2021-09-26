const request = require('supertest')
const app = require('../app')
const User = require("../models/user.model")

let user;

const user1 = {  // for login checking
    username: "user1",
    name: "User One",
    password: "1234567"
}

beforeEach( async() => {
    await User.deleteMany({})
    user = await User(user1).save()
})

test('should sign up for a user', async () => {
    await request(app).post('/users/')
    .send({
        username: "test3",
        name: "testName3",
        password: "testPwd3"
    })
    .expect(201);
})

test('should show user\'s details', async() =>{
    await request(app).get('/users/')
    .expect(200);
})

test('should get user by id', async() => {
    await request(app).get(`/users/${user.id}`)
    .expect(200)
    .then((response) => {
        
        expect(response.body.username).toBe(user.username);
        expect(response.body.name).toBe(user.name);
        expect(response.body.password).toBe(user.password);
    })
});

test('patch user id', async() => {
    await request(app).patch(`/users/${user.id}`)
    .send({
        username: "Test4",
    })
    .expect(200)
    .then((response) => {
        
        expect(response.body.username).toBe("Test4");
        expect(response.body.name).toBe(user.name);
        expect(response.body.password).toBe(user.password);
    })
});