const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose');
const Activity = require('../models/activity.model');
const Session = require('../models/session.model');
const Group = require('../models/group.model');
jest.setTimeout(8000);
let log; 

const session1 = new Session({
    userID: "user1",
    duration: "0"
});

const activity1 = new Activity({
    activityName: "activity3",
    description: "activity 3 description",
    sessions: [session1]
});

const group3 = {
    groupName: "testgroup3",
    adminId: "Admin3",
    activities: [activity1]
};

beforeEach( async() => {
    await Group.deleteMany({})
    log = await Group(group3).save()
});

afterAll( async() => {
    mongoose.connection.close();
});

test('should get all the logs in an activity by id', async() => {
    await request(app).get(`/sessions/${log.id}/${log.activities[0].id}`)
    .expect(200)
    .then((response) => {
        
        expect(response.body[0].sessions[0].duration).toBe(log.activities[0].sessions[0].duration);
        expect(response.body[0].sessions[0].userID).toBe(log.activities[0].sessions[0].userID);
    })
});

//create
test('should create a session in DB', async () => {
    await request(app).patch(`/sessions/ins/${log.id}/${log.activities[0].id}`)
    .send({
        userID: "user2",
        duration: "10"
    })
    .expect(201)
    .then((response) =>{
        expect(response.body.modifiedCount).toBe(1);
        expect(response.body.matchedCount).toBe(1);
    })
})

//delete
test('should delete the session', async() => {
    await request(app).patch(`/sessions/del/${log.id}/${log.activities[0].id}/${log.activities[0].sessions[0].id}`)
    .expect(200)
    .then((response) => {
        expect(response.body.message.modifiedCount).toBe(1);
        expect(response.body.message.matchedCount).toBe(1);
    })
})