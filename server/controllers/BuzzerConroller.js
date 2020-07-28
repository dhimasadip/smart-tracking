const { Buzzer, Device } = require('../models')

class BuzzerController {
    static turnOn(req, res, next) {
        const { DeviceId } = req.params

        const newBuzz = {
            isActive: true,
            DeviceId
        }

        Buzzer.create(newBuzz)
            .then(buzzer => {
                res.status(201).json(buzzer)
            })
            .catch((err) => {
                if (err.name = 'SequelizeForeignKeyConstraintError') {
                    next({ str_code: 'DEVICE_UNKNOWN' })
                } else {
                    next({ str_code: 'INTERNAL_SERVER_ERROR' })
                }
            })
    }

    static turnOff(req, res, next) {

        const { DeviceId } = req.params

        const newBuzz = {
            isActive: false,
            DeviceId
        }

        Buzzer.create(newBuzz)
            .then(buzzer => {
                res.status(201).json(buzzer)
            })
            .catch((err) => {
                if (err.name = 'SequelizeForeignKeyConstraintError') {
                    next({ str_code: 'DEVICE_UNKNOWN' })
                } else {
                    next({ str_code: 'INTERNAL_SERVER_ERROR' })
                }
            })
    }


    static deviceRead(req, res, next) {
        const { buzzerId } = req.params

        Buzzer.findAll({
            include: Device,
            where: {
                '$Device.deviceSerial$': buzzerId
            },
            order: [['createdAt', 'DESC']],
            limit: 1
        })
            .then(data => {
                if (data.length == 0) {
                    throw ({ str_code: 'DEVICE_UNKNOWN' })
                } else {
                    const resp = { isActive: data[0].isActive }
                    res.status(200).json(resp)
                }
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = BuzzerController