const express = require('express')
const router = express.Router()

//getting all
router.get('/', (req,res) => {
    res.send("hello world")
})
//getiing activity
router.get('/:id', (req,res) => {
    res.send(req.params.id)
})

//creating activity
router.post('/', (req,res) => {
    
})
//updating activity --> patch cause we only want to update one field
router.patch('/:id', (req,res) => {
    
})

//deletion activity
router.delete('/:id', (req,res) => {
    
})
module.exports = router