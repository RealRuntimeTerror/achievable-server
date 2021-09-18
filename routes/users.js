const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const getById = require('../middleware/get-by-id')

//getting all users
router.get('/', async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch (err){
        res.status(500).json({
            message: err.message
        })
    }
})

//getiing a user
router.get('/:id',getById({type: "user"}), (req,res) => {
    res.send(res.user)
})

//creating user
router.post('/', async (req,res) => {
    const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
    })
    try{
        const newUser = await user.save();
        res.status(201).json(newUser) //201 - creation successful
    }
    catch(err){
        res.status(400).json({message: err.message})//400 client side error - bad input
    }
})

//updating user --> patch cause we only want to update one field
router.patch('/:id', getById({type: "user"}), async (req,res) => {
    if (req.body.username != null){
        res.user.username = req.body.username
    }
    if (req.body.name != null){
        res.user.name = req.body.name
    }
    if (req.body.password != null){
        res.user.password = req.body.password
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
})

//deletion 
router.delete('/:id', getById({type: "user"}), async (req,res) => {
    try{
        res.user.remove()
        res.json({message: 'Deleted User'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router