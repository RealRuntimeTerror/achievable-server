const express = require('express')
const router = express.Router()
const Group = require('../models/group.model')
const getById = require('../middleware/get-by-id')

//getting all groups
router.get('/', async (req,res) => {
    try{
        const groups = await Group.find()
        res.json(groups)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

//getiing a group
router.get('/:id',getById({type: "group"}), (req,res) => {
    res.send(res.group)
})

//creating group
router.post('/', async (req,res) => {
    const group = new Group({
        groupName: req.body.groupName,
        members: req.body.members,
        activities: req.body.activities
    })
    try{
        const newGroup = await group.save();
        res.status(201).json(newGroup) //201 - creation successful
    }
    catch(err){
        res.status(400).json({message: err.message})//400 client side error - bad input
    }
})

//updating group --> patch cause we only want to update one field
router.patch('/:id', getById({type: "group"}), async (req,res) => {
    if (req.body.groupname != null){
        res.group.groupname = req.body.groupname
    }
    if (req.body.name != null){
        res.group.name = req.body.name
    }
    if (req.body.password != null){
        res.group.password = req.body.password
    }
    try{
        const updatedGroup = await res.group.save()
        res.json(updatedGroup)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
})

//deletion 
router.delete('/:id', getById({type: "group"}), async (req,res) => {
    try{
        res.group.remove()
        res.json({message: 'Deleted Group'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router