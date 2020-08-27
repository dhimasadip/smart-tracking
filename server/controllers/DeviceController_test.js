const { Device, Connection, Buzzer } = require('../models')
const removeTimestamp = require('../helpers/removeTimestamp')

class DeviceController {

    static async addDevice(req, res, next) {
        const { deviceSerial } = req.body

        try {

            const createDevice = await Device.create({ deviceSerial })
            const deviceData = removeTimestamp(createDevice.dataValues)

            const newBuzz = {
                isActive: false,
                DeviceId: deviceData.id
            }

            const createBuzzer = await Buzzer.create(newBuzz)
            const buzzerData = removeTimestamp(createBuzzer.dataValues)

            res.status(201).json({ device: deviceData, alarm: buzzerData })

        } catch (err) {

            if (err.errors) {
                let err_data = err.errors.map(el => {
                    return el.message
                })

                err_data = err_data.join('. ')

                next({ str_code: 'REGISTRATION_VALIDATION', err_data })
            } else {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            }

        }

    }

    static listDevice(req, res, next) {

        const { id } = req.user

        Connection.findAll({
            include: Device,
            where: { UserId: id }
        })
            .then(devices => {
                res.status(200).json(devices)
            })
            .catch((err) => {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            })
    }

}

module.exports = DeviceController