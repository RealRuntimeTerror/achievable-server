const request = require('supertest')
const app = require('../app')
const Activity = require('../models/activity.model')

var activity;

const actvity1 = {
    activityName: "activity11",
    description: "activity 11 description"
};

beforeEach(async () => {
    await Activity.deleteMany({})
    activity = await Activity(actvity1).save()
})

test('should add a new activity', async () => {
    await request(app).post('/activities/')
        .send({
            activityName: "TestActivity",
            description: "Test Description"
        })
        .expect(201);
});

test('should receive 1 activity', async () => {
    await request(app).get('/activities/')
        .expect(200);
});

test('verify post', async () => {
    const activity2 = await Activity.create({ activityName: "act2", description: "desc2" });

    await request(app).get(`/activities/`)
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(2);

            // Check data
            expect(response.body[1]._id).toBe(activity2.id);
            expect(response.body[1].activityName).toBe(activity2.activityName);
            expect(response.body[1].description).toBe(activity2.description);
        });
});

test('verify get by id', async() => {
    await request(app).get(`/activities/${activity.id}`)
    .expect(200)
    .then((response) => {
        
        expect(response.body.activityName).toBe(activity.activityName);
        expect(response.body.description).toBe(activity.description);
    })
});

test('patch activity id', async() => {
    await request(app).patch(`/activities/${activity.id}`)
    .send({
        activityName: "TestActivity2",
    })
    .expect(200)
    .then((response) => {
        
        expect(response.body.activityName).toBe("TestActivity2");
        expect(response.body.description).toBe(activity.description);
    })
});