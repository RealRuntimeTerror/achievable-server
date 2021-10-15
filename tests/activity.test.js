const request = require('supertest')
const mongoose = require('mongoose');
const app = require('../app');
const Activity = require('../models/activity.model');
const Group = require('../models/group.model');
jest.setTimeout(8000);
var group;

const activity1 = new Activity({
    activityName: "activity11",
    description: "activity 11 description"
});

const group2 = {
    groupName: "testgroup2",
    adminId: "Admin2",
    activities: [activity1]
};

beforeEach(async () => {
    await Group.deleteMany({})
    group = await Group(group2).save();
});

afterAll( async() => {
    await mongoose.connection.close();
});

test('should add a new activity', async () => {
    await request(app).patch(`/activities/${group.id}`)
        .send({
            activityName: "TestActivity",
            description: "Test Description",
            activityColor: "purple"
        })
        .expect(201);
});

test('should receive group\'s activity', async () => {
    await request(app).get(`/activities/${group.id}`)
        .expect(200);
});

test('verify activity', async () => {

    await request(app).get(`/activities/${group.id}`)
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);

            // Check data
            expect(response.body[0].activityName).toBe(activity1.activityName);
            expect(response.body[0].description).toBe(activity1.description);
        });
});

test('verify get activity by id', async() => {
    await request(app).get(`/activities/${group.id}/${group.activities[0].id}`)
    .expect(200)
    .then((response) => {
        
        expect(response.body[0].activityName).toBe(activity1.activityName);
        expect(response.body[0].description).toBe(activity1.description);
    })
});

test('patch activity id', async() => {
    await request(app).patch(`/activities/${group.id}/${group.activities[0].id}`)
    .send({
        activityName: "TestActivity2",
    })
    .expect(200)
    .then((response) => {
        
        expect(response.body.modifiedCount).toBe(1);
        expect(response.body.matchedCount).toBe(1);
    })
});