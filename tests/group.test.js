const request = require('supertest')
const app = require('../app')
const Group = require('../models/group.model')

var group; 

const group1 = {
    groupName: "testgroup1",
    members: null,
    activities: null
};


beforeEach( async() => {
    await Group.deleteMany({})
    group = await Group(group1).save();
})

test('should add a new group', async() => {
    await request(app).post('/groups/')
    .send(
        {
            groupName: "testgroup1",
            members: null,
            activities: null
        }
    )
    .expect(201)
});

test('should show 1 group', async() => {
    await request(app).get('/groups/')
    .expect(200)
    .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
    })
})

test('verify get by id', async() => {

    await request(app).get(`/groups/${group.id}`)
    .expect(200)
    .then((response) => {
        
        expect(response.body.groupName).toBe(group.groupName);
        expect(response.body.members).toEqual(group.members);
        expect(response.body.activities).toEqual(group.activities);
    })
});

