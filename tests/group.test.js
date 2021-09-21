const request = require('supertest')
const app = require('../app')
const Group = require('../models/group.model')

const group1 = {
    groupName: "testgroup1",
    members: ["uname1","uname2"],
    activities: ["Act1", "Act2"]
};


beforeEach( async() => {
    await Group.deleteMany({})
    await Group(group1).save()
})

test('should add a new group', async() => {
    await request(app).post('/groups/')
    .send(
        {
            groupName: "testgroup1",
            members: ["uname1","uname2"],
            activities: ["Act1", "Act2"]
        }
    )
    .expect(201)
});

test('should show 1 group', async() => {
    await request(app).get('/groups/')
    .expect(200)
})