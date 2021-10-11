const request = require('supertest')
const app = require('../app')
const Group = require('../models/group.model')

var group; 

const group1 = {
    groupName: "testgroup1",
    adminId: "Admin1"
};

beforeEach( async() => {
    await Group.deleteMany({})
    group = await Group(group1).save();
})


test('should add a new group', async() => {
    await request(app).post('/groups/')
    .send(
        {
            groupName: "newGroup",
            adminId: "G0001"
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

test('verify get group by id', async() => {

    await request(app).get(`/groups/${group.id}`)
    .expect(200)
    .then((response) => {
        
        expect(response.body.groupName).toBe(group.groupName);
        expect(response.body.adminId).toBe(group.adminId);
    })
});

