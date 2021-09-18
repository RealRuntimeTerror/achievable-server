const Activity = require('../models/activity.model')


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

    }
}