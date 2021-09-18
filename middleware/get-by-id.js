const express = require('express')
const Activity = require('../models/activity.model')

async function getActivity (req,res, next){
    try{
        activity = await Activity.findById(req.params.id)
        if(activity == null){
            return res.status(404).json({message: 'cannot find activity'})
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
    res.activity = activity
    next()
}

module.exports = getActivity

