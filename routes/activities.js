const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.model')
const Group = require('../models/group.model')
const getById = require('../middleware/get-by-id')
const {Types} = require('mongoose')

//getting all
router.get('/', async (req,res) => {
    try{
        const activities = await Activity.find()
        res.json(activities)
    }
    catch (err){
        res.status(500).json({
            message: err.message
        })
    }
})
//getiing all activities in a group
router.get('/:id',getById({type: "group"}), (req,res) => {
    res.send(res.group.activities)
})

//getiing 1 activity in a group
router.get('/:gid/:aid',getById({type: "activity"}), (req,res) => {
    res.send(res.activity)
})

//creating a new activity
router.patch('/:id', getById({type: "group"}), async (req,res) => {
    const activity = new Activity({
        activityName: req.body.activityName,
        description: req.body.description,
        activityColor: req.body.activityColor,
        sessions: req.body.sessions
    })
    res.group.activities.push(activity);
    try{
        const newActivity = await res.group.save();
        res.status(201).json(newActivity) //201 - creation successful
    }
    catch(err){
        res.status(400).json({message: err.message})//400 client side error - bad input
    }
})
//updating activity --> patch cause we only want to update one field
router.patch('/:gid/:aid' /*, getById({type: "activity_patch"})*/, async (req,res) => {
    
    try{
        const activity = await Group.updateOne(
            { '_id': req.params.gid,'activities._id': req.params.aid },
            { $set:  
                { 
                'activities.$.activityName': req.body.activityName,
                'activities.$.description': req.body.description,
                'activities.$.activityColor': req.body.activityColor,
                'activities.$.sessions': req.body.sessions
                }
            }
          );
        //const updatedActivity = await res.activity.save()
        res.json(activity)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
})

//deletion activity
router.patch('/del/:gid/:aid', async (req,res) => {
    const groupID = Types.ObjectId(req.params.gid);
    const activityID = Types.ObjectId(req.params.aid);
    try{
        const activity = await Group.findOneAndUpdate(
        { "_id": groupID},
        { $pull: 
            { "activities" : { "_id": activityID } }
        }
    );
        res.json({message: 'activity deleted', info: activity})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router