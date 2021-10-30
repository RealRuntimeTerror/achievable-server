const Activity = require('../models/activity.model')
const User = require('../models/user.model')
const Log = require('../models/session.model')
const Group = require('../models/group.model')
const { Types } = require('mongoose')


module.exports = function getById (types) {
    if(types.type === "activity"){
        return async function (req,res, next){
            var activity;
            try{
                activity = await Group.aggregate([
                    { $match: {"_id": Types.ObjectId(req.params.gid)}},
                    { $unwind: "$activities"},
                    { $match: {"activities._id": Types.ObjectId(req.params.aid)}},
                    { $project: {
                        activityId: '$activities._id',
                          activityName: '$activities.activityName',
                          description: '$activities.description',
                          activityColor: '$activities.activityColor',
                          sessions: '$activities.sessions',
                          _id: 0,
                        }
                    },
                ]);

                if(activity == null){
                    return res.status(404).json({message: 'cannot find activity'})
                }
            }
            catch(err){
                res.status(500).json({
                    message: err.message
                })
            }
            res.activity = activity;
            next()
        }
        
    }
    else if(types.type === "activity_del"){
        return async function (req,res, next){

            try{
              
                if(activity == null){
                    return res.status(404).json({message: 'cannot find activity'})
                }
            }
            catch(err){
                res.status(500).json({
                    message: err.message
                })
            }
            res.activity = activity;
            next()
        }
        
    }
    else if (types.type === "group"){
        return async function (req,res, next){
            var group;
            try{
                group = await Group.findById(req.params.id)
                if(group == null){
                    return res.status(404).json({message: 'cannot find group'})
                }
            }
            catch(err){
                res.status(500).json({
                    message: err.message
                })
            }
            res.group = group;
            next()
        }
    }
    else if (types.type === "Usergroup"){
        return async function (req,res, next){
            try{
                group = await Group.aggregate([
                    //{$or:[{"adminId": req.params.uid},{"members": req.params.uid}]},
                    {$match: {$or : [{"adminId": req.params.uid},{"members": req.params.uid}]}},
                    {
                        $lookup:
                          {
                            from: User.collection.name,
                            localField: "adminId",
                            foreignField: "googleId",
                            as: "adminData"
                          }
                    }
                ]);
            
                if(group == null){
                    return res.status(404).json({message: 'cannot find group'})
                }
            }
            catch(err){
                res.status(500).json({
                    message: err.message
                })
            }
            res.group = group
            next()
        }
    }
    else if (types.type === "session"){
        return async function (req,res, next){
            const groupID = Types.ObjectId(req.params.gid);
            const activityID = Types.ObjectId(req.params.aid);
            try{
                log = await Group.aggregate([
                    { $match: {"_id": groupID }},
                    { $unwind: "$activities"},
                    { $match: {"activities._id": activityID}},
                    { $project: {
                          sessions: '$activities.sessions',
                          _id: 0,
                        }
                    },
                ]);

                if(log == null){
                    return res.status(404).json({message: 'cannot find session'})
                }
            }
            catch(err){
                res.status(500).json({message: err.message})
            }
            res.log = log
            next()
        }
    }
    else if (types.type == "Guser"){
        return async function (req,res, next){
            try{
                user = await User.findOne({googleId: req.params.id})
                if(user == null){
                    return res.status(404).json({message: 'cannot find google user'})
                }
            }
            catch(err){
                res.status(500).json({
                    message: err.message
                })
            }
            res.user = user
            next()
        }
    }
    else {
        return async function (req,res, next){
            try{
                user = await User.findById(req.params.id)
                if(user == null){
                    return res.status(404).json({message: 'cannot find user'})
                }
            }
            catch(err){
                res.status(500).json({
                    message: err.message
                })
            }
            res.user = user
            next()
        }
    }
}