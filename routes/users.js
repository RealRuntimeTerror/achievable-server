const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const Group = require('../models/group.model')
const getById = require('../middleware/get-by-id')

//getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//User sign-in/ sign-up
router.post('/auth', async (req, res) => {
    const { body } = req;
    const {name, googleId, imageUrl} = body;

    try {
        //check if user with same googleI is available in DB
        const usersLocated = await User.find({googleId:googleId})
        if(usersLocated.length>0){
            //user exists in DB
            return res.send({
                success:true,
                message:'User Located in the DB',
                usersLocatedLen:usersLocated.length,
                usersLocatedName:usersLocated[0].name
            })
        }
            
        else{
            //new user should be added to DB
            
            
            const user = new User({
                name,
                googleId,
                imageUrl
            })
                const newUser = await user.save();
               // res.status(201).json(newUser) //201 - creation successful

            //new group creation
            const group = new Group({
                groupName: name,
                adminId: googleId
            })
            const newGroup = await group.save();
            return res.send({
                success:true,
                message:'New user and group has been added to DB',        
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//updating user --> patch cause we only want to update one field
router.patch('/:id', getById({ type: "user" }), async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//deletion 
router.delete('/:id', getById({ type: "user" }), async (req, res) => {
    try {
        res.user.remove()
        res.json({ message: 'Deleted User' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router





/*
FOLLOWING METHODS DO NOT WORK DUE TO USER MODEL CHANGE



//getiing a user
router.get('/:id', getById({ type: "user" }), (req, res) => {
    res.send(res.user)
})

//creating user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser) //201 - creation successful
    }
    catch (err) {
        res.status(400).json({ message: err.message })//400 client side error - bad input
    }
})
*/