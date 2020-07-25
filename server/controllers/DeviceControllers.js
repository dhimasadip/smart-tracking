const {Device, UserDevice, History} = require('../models')

class DeviceControllers {

    static addDevice(req,res,next){
        // console.log("todocontroller add todo")

        let obj = {
            UserId: req.userData.id,
            DeviceCode: req.body.DeviceCode
        }
        Device.create(obj)
        .then((product)=>{
            // console.log(product, 'y add');
            res.status(201).json(product)
        })
        .catch((err)=>{
            // console.log(err.name, "err add")
            next(err)
        })
    }

    static showAllDevice(req,res,next){
        Device.findAll({where: {UserId: req.userData.id},order: [['id', 'ASC']]})
        .then(devices=>{
            // console.log(devices, "ini devices");
            res.status(200).json(devices)
        })
        .catch((err)=>{
            // console.log(err, "ini error show all device")
            next(err)
        })
    }

    static showOneDevice(req,res,next){
        Device.findOne({where: {id: req.params.id}})
        .then(device=>{
            if (!device) {
                throw({ name: `DEVICE_NOT_FOUND`, })
            } else {
                res.status(200).json(device)
            }
        })
        .catch((err)=>{
            // console.log(err, '<<<');
            next(err)
        })
    }

    static addHistory(req,res,next){
        // console.log("todocontroller add todo")
        let obj = {
            DeviceId: req.params.id,
            longitude: req.body.longitude,
            latitude: req.body.latitude
        }
        History.create(obj)
        .then((history)=>{
            res.status(201).json(history)
        })
        .catch((err)=>{
            console.log(err, "ini error")
            next(err)
        })
    }

    static showHistory(req,res, next){
        // console.log(req.params.id);
        History.findAll({
            where: {DeviceId: req.params.id},
            order: [['createdAt', 'DESC']]
        })
        .then(function(histories){
            // console.log(histories);
            res.status(200).json(histories)
        })
        .catch ((err) =>{
            // next(err)
            // console.log(err, "error show history");
            res.status(500).json({
                message: "Gagal memuat User"
            })
        })
    }

    static showLastLocation(req,res, next){
        History.findAll({
            order: [['createdAt', 'DESC']], limit: 1
        })
        .then(function(currentLocation){
            res.status(200).json(currentLocation)
        })
        .catch ((err) =>{
            // next(err)
            res.status(500).json({
                message: "Gagal memuat User"
            })
        })
    }

}

module.exports = DeviceControllers