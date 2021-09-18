const Activity = require('../models/activity.model')
const User = require('../models/user.model')


module.exports = function getById (types) {
    if(types.type = "activity"){
        return async function (req,res, next){
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
        
    }
    else if (types.type = "group"){

    }
    else if (types.type = "log"){

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