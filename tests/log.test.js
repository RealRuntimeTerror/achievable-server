const request = require('supertest')
const app = require('../app')
const Log = require('../models/log.model')

let log; 

const log1 = {
    user: "user1",
    activity: "log1",
    noHours: "0",
};

beforeEach( async() => {
    await Log.deleteMany({})
    log = await Log(log1).save()
})

test('should ask for existing user and log', async () => {
    await request(app).post('/logs/')
    .send(
        {
            user: "user2",
            activity: "log2",
            noHours: "10",
        }       
    )
    .expect(400)
});

test('should receive the logs in DB', async () => {
    await request(app).get('/logs/')
    .expect(200)
})

test('should get by id', async() => {
    await request(app).get(`/logs/${log.id}`)
    .expect(200)
    .then((response) => {
        
        expect(response.body.user).toBe(log.user);
        expect(response.body.activity).toBe(log.activity);
        expect(response.body.noHours).toBe(log.noHours);
    })
});