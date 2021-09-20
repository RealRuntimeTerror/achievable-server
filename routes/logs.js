const express = require('express')
const router = express.Router()
const Log = require('../models/log.model')
const getById = require('../middleware/get-by-id')
const User = require('../models/user.model')
const Activity = require('../models/activity.model')

//getting all logs
router.get('/', async (req,res) => {
    try{
        const logs = await Log.find()
        res.json(logs)
    }
    catch (err){
        res.status(500).json({
            message: err.message
        })
    }
})

//getiing a log
router.get('/:id',getById({type: "log"}), (req,res) => {
    res.send(res.log)
})

//creating log
router.post('/', async (req,res) => {
    try{

    const foundUser = await User.findOne({username: req.body.username})
    const foundActivity = await Activity.findOne({activityName: req.body.activityName})
    
    if(foundUser == null || foundActivity == null){
        throw new Error('could not find the activity or the user')
    }
    const log = new Log({
        user: req.body.username,
        activity: req.body.activityName,
        noHours: req.body.noHours
    })
    
        const newLog = await log.save();
        res.status(201).json(newLog) //201 - creation successful
    }
    catch(err){
        res.status(400).json({message: err.message})//400 client side error - bad input
    }
})

//updating log --> patch cause we only want to update one field
router.patch('/:id', getById({type: "log"}), async (req,res) => {
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
        const updatedLog = await res.log.save()
        res.json(updatedLog)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
})

//deletion 
router.delete('/:id', getById({type: "log"}), async (req,res) => {
    try{
        res.log.remove()
        res.json({message: 'Deleted Log'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router