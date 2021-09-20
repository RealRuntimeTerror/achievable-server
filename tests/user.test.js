const request = require('supertest')
const app = require('../app')
const User = require("../models/user.model")

const user1 = {  // for login checking
    username: "user1",
    name: "User One",
    password: "1234567"
}

beforeEach( async() => {
    await User.deleteMany({})
    await User(user1).save()
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
