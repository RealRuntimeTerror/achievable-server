const express = require('express')
const router = express.Router()
const Group = require('../models/group.model')
const getById = require('../middleware/get-by-id')
const User = require('../models/user.model')

//getting all groups
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find()
        res.json(groups)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//getting all groups + admin info
router.get('/search', async (req, res) => {
    try {
        const groups = await Group.aggregate([
            {
                $lookup:
                {
                    from: User.collection.name,
                    localField: "adminId",
                    foreignField: "googleId",
                    as: "adminData"
                }
            }
        ])
        res.json(groups)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getting groups that match query name
router.get('/search/:query', async (req,res) => {
    try {
        const groups = await Group.aggregate([
            {$match: {groupName: {$regex: '.*' + req.params.query + '.*', $options: 'ix'}}},
            {
                $lookup:
                {
                    from: User.collection.name,
                    localField: "adminId",
                    foreignField: "googleId",
                    as: "adminData"
                }
            }
        ]).limit(5)
        res.json(groups)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getting only groups that the user is in 
router.get('/user/:uid', getById({ type: "Usergroup" }), (req, res) => {
    res.send(res.group)
})

//searching only the groups that the user is in 
router.get('/user/:uid/:query', async (req, res) => {
    try {
        const groups = await Group.aggregate([
            {$match: {$and:[{groupName: {$regex: '.*' + req.params.query + '.*', $options: 'ix'}},{$or : [{"adminId": req.params.uid},{"members": req.params.uid}]}]}},
            {
                $lookup:
                {
                    from: User.collection.name,
                    localField: "adminId",
                    foreignField: "googleId",
                    as: "adminData"
                }
            }
        ]).limit(5)
        res.json(groups)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getiing a group
router.get('/:id', getById({ type: "group" }), (req, res) => {
    res.send(res.group)
})

//creating group
router.post('/', async (req, res) => {
    const group = new Group({
        groupName: req.body.groupName,
        adminId: req.body.adminId,
        activities: req.body.activities,
        members: req.body.members
    })
    try {
        const newGroup = await group.save();
        res.status(201).json(newGroup) //201 - creation successful
    }
    catch (err) {
        res.status(400).json({ message: err.message })//400 client side error - bad input
    }
})

//updating group --> patch cause we only want to update one field
router.patch('/:id', getById({ type: "group" }), async (req, res) => {
    if (req.body.groupname != null) {
        res.group.groupName = req.body.groupName
    }
    if (req.body.adminId != null) {
        res.group.adminId = req.body.adminId
    }
    if (req.body.activities != null) {
        res.group.activities.push(req.body.activities)
    }
    try {
        const updatedGroup = await res.group.save()
        res.json(updatedGroup)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//deletion 
router.delete('/:id', getById({ type: "group" }), async (req, res) => {
    try {
        res.group.remove()
        res.json({ message: 'Deleted Group' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//join group
router.patch('/join/:id', getById({type: "group"}), async(req,res) =>{
    res.group.members.push(req.body.googleId);
    try {
        const updatedGroup = await res.group.save()
        res.json(updatedGroup)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//leave group
router.patch('/leave/:id', getById({ type: "group" }), async (req, res) => {
    res.group.members = res.group.members.filter((m) => m != req.body.googleId);
    try {
        const updatedGroup = await res.group.save()
        res.json(updatedGroup)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})

module.exports = router