const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../app')
const User = require("../models/user.model")
jest.setTimeout(6000);

let user;

const user1 = {  // for login checking
    googleId: "user1",
    name: "User One",
    imageUrl: "https://www.goo.gl"
}

beforeEach(async () => {
    await User.deleteMany({})
    user = await User(user1).save()
});


afterAll( async() => {
    mongoose.connection.close();
});
// test('should sign up for a user', async () => {
//     await request(app).post('/users/')
//     .send({
//         googleId: "test3",
//         name: "testName3",
//         imageUrl: "https://youtu.be"
//     })
//     .expect(201);
// })

test('should show user\'s details', async () => {
    await request(app).get('/users/')
        .expect(200);
})

test('should get user by id', async () => {
    await request(app).get(`/users/${user.id}`)
        .expect(200)
        .then((response) => {

            expect(response.body.googleId).toBe(user.googleId);
            expect(response.body.name).toBe(user.name);
            expect(response.body.imageUrl).toBe(user.imageUrl);
        })
});

test('patch user id', async () => {
    await request(app).patch(`/users/${user.id}`)
        .send({
            imageUrl: "https://fb.com"
        })
        .expect(200)
        .then((response) => {

            expect(response.body.imageUrl).toBe("https://fb.com");
            expect(response.body.name).toBe(user.name);
        })
});