const Activity = require('../models/activity.model')
const User = require('../models/user.model')
const Log = require('../models/log.model')
const Group = require('../models/group.model')


module.exports = function getById (types) {
    if(types.type === "activity"){
        return async function (req,res, next){
            var activity;
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
            res.activity = activity;
            next()
        }
        
    }
    else if (types.type === "group"){
        return async function (req,res, next){
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
            res.group = group
            next()
        }
    }
    else if (types.type === "log"){
        return async function (req,res, next){
            try{
                log = await Log.findById(req.params.id)
                if(log == null){
                    return res.status(404).json({message: 'cannot find log'})
                }
            }
            catch(err){
                res.status(500).json({message: err.message})
            }
            res.log = log
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