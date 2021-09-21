const request = require('supertest')
const app = require('../app')
const Activity = require('../models/activity.model')

const actvity1 = {
    activityName: "activity11",
    description: "activity 11 description"
};

beforeEach( async() => {
    await Activity.deleteMany({})
    await Activity(actvity1).save()
})

test('should add a new activity', async() => {
    await request(app).post('/activities/')
    .send({
            activityName: "TestActivity",
            description: "Test Description"        
    })
    .expect(201);
});

test('should receive 1 activity', async() => {
    await request(app).get('/activities/')
    .expect(200);
});