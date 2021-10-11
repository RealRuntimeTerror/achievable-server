const request = require('supertest')
const app = require('../app')
const Activity = require('../models/activity.model');
const Session = require('../models/session.model');
const Group = require('../models/group.model')
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
})

test('should just pass', async ()=> {
    await console.log('passed');
});

// test('should ask for existing user and log', async () => {
//     await request(app).post('/logs/')
//     .send(
//         {
//             user: "user2",
//             activity: "log2",
//             noHours: "10",
//         }       
//     )
//     .expect(400)
// });

// test('should receive the logs in DB', async () => {
//     await request(app).get('/logs/')
//     .expect(200)
// })

// test('should get by id', async() => {
//     await request(app).get(`/logs/${log.id}`)
//     .expect(200)
//     .then((response) => {
        
//         expect(response.body.user).toBe(log.user);
//         expect(response.body.activity).toBe(log.activity);
//         expect(response.body.noHours).toBe(log.noHours);
//     })
// });