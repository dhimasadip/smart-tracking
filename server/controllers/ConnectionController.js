const { Connection, Device } = require('../models')
const { Op } = require('sequelize')

class ConnectionController {
    static pairing(req, res, next) {
        const { deviceSerial } = req.body
        const { id } = req.user
        let deviceId

        Device.findOne({ where: { deviceSerial } })
            .then(data => {
                if (data) {
                    const { ...device } = data.dataValues
                    deviceId = device.id
                    return Connection.findOne({
                        where: {
                            [Op.and]: [{ UserId: id }, { DeviceId: device.id }]
                        }
                    })
                } else {
                    return { str_code: 'DEVICE_UNKNOWN' }
                }
            })
            .then(data => {
                if (data) {
                    if (data.str_code) {
                        return { str_code: 'DEVICE_UNKNOWN' }
                    } else {
                        return { str_code: 'ALREADY_PAIRED' }
                    } 
                } else {
                    return Connection.create({ UserId: id, DeviceId: deviceId })
                }
            })
            .then(data => {
                if (data.str_code == 'DEVICE_UNKNOWN') {
                    next({ str_code: 'DEVICE_UNKNOWN' })

                } else if (data.str_code == 'ALREADY_PAIRED') {
                    next({ str_code: 'ALREADY_PAIRED' })

                } else {
                    res.status(201).json(data)
                }
            })
            .catch(() => {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            })
    }
}

module.exports = ConnectionController