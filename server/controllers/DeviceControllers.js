const {Device, UserDevice, History} = require('../models')

class DeviceControllers {

    static addDevice(req,res,next){
        // console.log("todocontroller add todo")

        let obj = {
            UserId: req.userData.id,
            DeviceId: '3',
            DeviceCode: req.body.DeviceCode
        }
        UserDevice.create(obj)
        .then((product)=>{
            res.status(201).json(product)
        })
        .catch((err)=>{
            console.log(err, "ini error")
            // next(err)
        })
    }

    static showAllDevice(req,res,next){
        UserDevice.findAll({where: {UserId: req.userData.id},order: [['id', 'ASC']]})
        .then(devices=>{
            console.log(devices, "ini devices");
            res.status(201).json(devices)
        })
        .catch((err)=>{
            console.log(err, "ini error show all device")
            // next(err)
        })
    }

    static showOneDevice(req,res,next){
        UserDevice.findOne({where: {id: req.params.id}})
        .then(device=>{
            res.status(201).json(device)
        })
        .catch((err)=>{
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
            // next(err)
        })
    }

    static showHistory(req,res, next){
        // console.log(req.params.id);
        History.findAll({
            where: {DeviceId: req.params.id},
            order: [['createdAt', 'DESC']]
        })
        .then(function(histories){
            console.log(histories);
            res.status(201).json(histories)
        })
        .catch ((err) =>{
            // next(err)
            console.log(err, "error show history");
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
            res.status(201).json(currentLocation)
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