const { StatusDevice, Device } = require('../models')

class StatusDeviceController {

    static getStatus(req, res, next) {
        const { id } = req.params

        Device.findOne({
            where: { id }
        })
            .then(data => {
                if (!data) {
                    throw ({ str_code: 'DEVICE_UNKNOWN' })
                } else {
                    return StatusDevice.findAll({
                        where: {
                            deviceSerial: data.deviceSerial
                        },
                        order: [['createdAt', 'DESC']],
                        limit: 1
                    })
                }
            })
            .then(data => {
                const [status] = data
                res.status(200).json(status)
            })
            .catch((err) => {
                next(err)
            })
    }

    static sendStatus(req, res, next) {
        const { deviceSerial, statusDevice } = req.body

        StatusDevice.create({ deviceSerial, statusDevice })
            .then(data => res.status(201).json(data))
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

}

module.exports = StatusDeviceController