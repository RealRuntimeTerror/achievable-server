const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.model')
const getActivity = require('../middleware/get-by-id')

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
//getiing activity
router.get('/:id',getActivity, (req,res) => {
    res.send(res.activity)
})

//creating activity
router.post('/', async (req,res) => {
    const activity = new Activity({
        activityName: req.body.activityName,
        description: req.body.description
    })
    try{
        const newActivity = await activity.save();
        res.status(201).json(newActivity) //201 - creation successful
    }
    catch(err){
        res.status(400).json({message: err.message})//400 client side error - bad input
    }
})
//updating activity --> patch cause we only want to update one field
router.patch('/:id', getActivity, async (req,res) => {
    if (req.body.activityName != null){
        res.activity.activityName = req.body.activityName
    }
    if (req.body.description != null){
        res.activity.description = req.body.description
    }
    try{
        const updatedActivity = await res.activity.save()
        res.json(updatedActivity)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
})

//deletion activity
router.delete('/:id', getActivity, async (req,res) => {
    try{
        res.activity.remove()
        res.json({message: 'Deleted Activity'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router