const request = require('supertest')
const app = require('../app')
const Log = require('../models/log.model')

const log1 = {
    user: "user1",
    activity: "activity1",
    noHours: "0",
};

beforeEach( async() => {
    await Log.deleteMany({})
    await Log(log1).save()
})

test('should ask for existing user and activity', async () => {
    await request(app).post('/logs/')
    .send(
        {
            user: "user2",
            activity: "activity2",
            noHours: "10",
        }       
    )
    .expect(400)
});

test('should receiver the logs in DB', async () => {
    await request(app).get('/logs/')
    .expect(200)
})