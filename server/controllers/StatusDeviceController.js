const { StatusDevice, Device } = require('../models')

class StatusDeviceController {

    static getStatus(req, res, next) {
        const { id } = req.params

        Device.findOne({
            where: { id }
        })
        .then(data => {
            return StatusDevice.findAll({
                where: {
                    deviceSerial: data.deviceSerial
                },
                order: [['createdAt', 'DESC']],
                limit: 1
            })
        })
        .then(data => {
            const [status] = data
            res.status(200).json(status)
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

    static sendStatus(req, res, next) {
        const { deviceSerial, statusDevice } = req.body

        StatusDevice.create({ deviceSerial, statusDevice })
        .then(data => res.status(201).json(data))
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

}

module.exports = StatusDeviceController