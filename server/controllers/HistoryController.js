const { History, Device } = require('../models')

class HistoryController {

    static send(req, res, next) {
        const { latitude, longitude, deviceSerial } = req.body

        Device.findOne({ where: { deviceSerial } })
        .then(data => {
            const newData = {
                latitude,longitude,
                DeviceId: data.id
            }

            return History.create(newData)
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch((err) => {
            if (err.errors) {
                let err_data = err.errors.map(el => {
                    return el.message
                })

                err_data = err_data.join('. ')

                next({ str_code: 'REGISTRATION_VALIDATION', err_data })
            } else {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            }
        })
    }

    static getHistory(req,res,next) {
        const DeviceId = req.params.id

        History.findAll({
            where: { DeviceId}
        })
        .then(data => {
            if (data.length == 0) {
                throw ({ str_code: 'DEVICE_UNKNOWN' })
            } else {
                res.status(200).json(data)
            }
        })
        .catch((err) => {
            next(err)
        })

    }

    static currentLocation(req,res,next) {
        const DeviceId = req.params.id
        
        History.findAll({
            where: { DeviceId },
            order: [['createdAt', 'DESC']],
            limit: 1
        })
        .then(data => {
            if (data.length == 0) {
                throw ({ str_code: 'DEVICE_UNKNOWN' })
            } else {
                res.status(200).json(data[0])
            }
        })
        .catch((err) => {
            next(err)
        })

    }
}

module.exports = HistoryController