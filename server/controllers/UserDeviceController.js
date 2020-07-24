const {UserDevice} = require('../models')

class UserDeviceControllers {

    static showAll(req,res, next){
        // UserDevice.findAll({
        //     where:  {
        //         UserId: req.userData.id,
        //         paid: false
        //     },
        //     include: [Product],
        //     order: [['id', 'ASC']]
        // })
        // .then(data=>{
        //     res.status(200).json(data)
        // })
        // .catch((err)=>{
        //     next(err)
        // })
    }



}

module.exports = UserDeviceControllers