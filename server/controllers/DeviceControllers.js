const { Device, History } = require('../models')

class DeviceControllers {

    static addDevice(req, res, next) {
        let obj = {
            UserId: req.userData.id,
            DeviceCode: req.body.DeviceCode
        }
        Device.create(obj)
            .then((product) => {
                res.status(201).json(product)
            })
            .catch((err) => {
                next(err)
            })
    }

    static showAllDevice(req, res, next) {
        Device.findAll({
            where: { UserId: req.userData.id },
            order: [['id', 'ASC']]
        })
            .then(devices => {
                res.status(200).json(devices)
            })
            .catch((err) => {
                next(err)
            })
    }

    static showOneDevice(req, res, next) {
        Device.findOne({ where: { id: req.params.id } })
            .then(device => {
                if (!device) {
                    throw ({ name: `DEVICE_NOT_FOUND`, })
                } else {
                    res.status(200).json(device)
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static addHistory(req, res, next) {
        let obj = {
            DeviceId: req.params.id,
            longitude: req.body.longitude,
            latitude: req.body.latitude
        }
        History.create(obj)
            .then((history) => {
                res.status(201).json(history)
            })
            .catch((err) => {
                next(err)
            })
    }

    static showHistory(req, res, next) {
        History.findAll({
            where: { DeviceId: req.params.id },
            order: [['createdAt', 'DESC']]
        })
            .then((device) => {
                res.status(200).json(device)
            })
            .catch((err) => {
                next(err)
            })
    }

    static deleteHistory(req, res, next) {
        const { id } = req.params

        History.destroy({
            where: { DeviceId: id }
        })
            .then((device) => {
                if (!device) {
                    throw ({ name: `DEVICE_NOT_FOUND`, })
                } else {
                    res.status(200).json({
                        message: `History succesfully deleted`
                    })
                }
            }).catch((err) => {
                next(err)
            });
    }

    static showLastLocation(req, res, next) {
        History.findAll({
            order: [['createdAt', 'DESC']], limit: 1
        })
            .then(function (currentLocation) {
                res.status(200).json(currentLocation)
            })
            .catch((err) => {
                next(err)
            })
    }

}

module.exports = DeviceControllers