const express = require('express')
const router = express.Router()
const getById = require('../middleware/get-by-id')
const Session = require('../models/session.model')
const Group = require('../models/group.model')
const {Types} = require('mongoose')

//getting all logs
router.get('/', async (req,res) => {
    try{
        const logs = await sessionSchema.find()
        res.json(logs)
    }
    catch (err){
        res.status(500).json({
            message: err.message
        })
    }
})

//getiing all sessions of an activity of a group
router.get('/:gid/:aid',getById({type: "session"}), (req,res) => {
    res.send(res.log)
})

//creating log session
router.patch('/ins/:gid/:aid', async (req,res) => {
    const groupID = Types.ObjectId(req.params.gid);
    const activityID = Types.ObjectId(req.params.aid);

    try{
    const log = new Session({
        userID: req.body.userID,
        duration: req.body.duration
    });
    const saved = await Group.updateOne(
        {"_id": groupID},
        {$push: 
            {'activities.$[a].sessions': log }
        },
        {arrayFilters: [{'a._id': activityID}]}
        );
        res.status(201).json(saved)
    }
    catch(err){
        res.status(400).json({message: err.message})//400 client side error - bad input
    }
})

//updating session TODO:
router.patch('/up/:gid/:aid', async (req,res) => {
    if (req.body.logname != null){
        res.log.logname = req.body.logname
    }
    if (req.body.name != null){
        res.log.name = req.body.name
    }
    if (req.body.password != null){
        res.log.password = req.body.password
    }
    try{
        const updatedsessionSchema = await res.log.save()
        res.json(updatedsessionSchema)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
})

//delete session
router.patch('/del/:gid/:aid/:sid', async (req,res) => {
    const groupID = Types.ObjectId(req.params.gid);
    const activityID = Types.ObjectId(req.params.aid);
    const sessionID = Types.ObjectId(req.params.sid);
    try{
        const deleted = await Group.updateOne(
            {"_id": groupID},
            {$pull: 
            {'activities.$[a].sessions': {'_id': sessionID}}
            },
            {arrayFilters: [{'a._id': activityID}]}
            );

        res.json({message: deleted})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router