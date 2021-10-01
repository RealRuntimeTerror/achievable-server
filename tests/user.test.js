const request = require('supertest')
const app = require('../app')
const User = require("../models/user.model")

let user;

const user1 = {  // for login checking
    googleId: "user1",
    name: "User One",
    password: "1234567",
    email: "user1@gmail.com",
    imageUrl: "https://www.goo.gl",
    activities: null
}

beforeEach( async() => {
    await User.deleteMany({})
    user = await User(user1).save()
})

test('should sign up for a user', async () => {
    await request(app).post('/users/')
    .send({
        googleId: "test3",
        name: "testName3",
        password: "testPwd3",
        email: "testName@gmail.com",
        imageUrl: "https://youtu.be",
        activities: null
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
        email: "Test4@gmail.com"
    })
    .expect(200)
    .then((response) => {
        
        expect(response.body.email).toBe("Test4@gmail.com");
        expect(response.body.name).toBe(user.name);
        expect(response.body.password).toBe(user.password);
    })
});