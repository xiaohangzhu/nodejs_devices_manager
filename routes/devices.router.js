const express = require('express')
const router = express.Router()
const Device = require('../db/models/devices.model')


/**
 * @api {post} /devices/add  Add a new device
 * @apiName addDevice
 * @apiGroup Devices
 * 
 * @apiParam {String} deviceName the deviceName of device.
 * @apiParam {String} owner the owner of device.
 * @apiParam {String} deviceStatus the deviceStatus of device.
 * @apiParam {String} deviceStatusDescription the deviceStatusDescription of device.
 * @apiParam {String} status the status of device.
 * @apiParam {String} statusDescription the statusDescription of device.
 * @apiParam {String} userStartDate the userStartDate of device.
 * @apiParam {String} deviceDetail the deviceDetail of device.
 * @apiParam {String} productDate the productDate of device.
 * @apiParam {String} description the description of device.
 * @apiParam {String} version the version of device.
 * @apiParam {String} productFactory the productFactory of device.
 *
 * @apiSuccess {String} code 0000
 * @apiSuccess {String} message 新增设备成功
 */
router.post('/add', (req, res) => {
    //获取数据
    const {
        deviceName, owner, deviceStatus, deviceStatusDescription, status, statusDescription,
        userStartDate, deviceDetail, productDate, description, version, productFactory
    } = req.body
    console.log('新增设备-接受到的数据\n')
    console.log({
        deviceName, owner, deviceStatus, deviceStatusDescription, status, statusDescription,
        userStartDate, deviceDetail, productDate, description, version, productFactory
    })
    //校验数据(不符合规则则返回)
    if (!deviceName || !deviceStatus || !status || !statusDescription) {
        res.send({
            code: '1000',
            message: "数据校验-不能为空"
        })
        return
    }
    //处理数据(返回数据)
    Device.insertMany({
        deviceName: deviceName,
        owner: owner,
        deviceStatus: deviceStatus,
        deviceStatusDescription: deviceStatusDescription,
        useStatus: {
            status: status,
            statusDescription: statusDescription,
            userStartDate: userStartDate
        },
        deviceDetail: {
            name: deviceName,
            productDate: productDate,
            description: description,
            version: version,
            productFactory: productFactory
        }
    }).then(() => {
        res.send({
            code: "0000",
            message: "新增设备成功"
        })
    }).catch(() => {
        res.send({
            code: "9000",
            message: "数据库异常-插入失败"
        })
    })
})

/**
 * @api {post} /devices/delete  Delete a new device
 * @apiName deleteDevice
 * @apiGroup Devices
 * 
 * @apiParam {String} _id the _id of device.
 *
 * @apiSuccess {String} code 0000
 * @apiSuccess {String} message 删除设备成功
 */
router.post('/delete', (req, res) => {
    //获取数据
    const { _id } = req.body
    console.log('删除设备-接受到的数据\n')
    console.log(_id)
    //校验数据
    if (!_id) {
        res.send({
            code: '1000',
            message: '数据校验- _id 不能为空'
        })
        return
    }
    //处理数据
    Device.remove({ _id })
        .then((data) => {
            console.log(data)
            res.send({
                code: "0000",
                message: "删除成功"
            })
        }).catch(() => {
            res.send({
                code: "9000",
                message: "数据库异常-删除设备失败"
            })
        })
})

/**
 * @api {post} /devices/update  Update a new device
 * @apiName updateDevice
 * @apiGroup Devices
 * 
 * @apiParam {String} _id the _id of device.
 * @apiParam {String} deviceName the deviceName of device.
 * @apiParam {String} owner the owner of device.
 * @apiParam {String} deviceStatus the deviceStatus of device.
 * @apiParam {String} deviceStatusDescription the deviceStatusDescription of device.
 * @apiParam {String} status the status of device.
 * @apiParam {String} statusDescription the statusDescription of device.
 * @apiParam {String} userStartDate the userStartDate of device.
 * @apiParam {String} deviceDetail the deviceDetail of device.
 * @apiParam {String} productDate the productDate of device.
 * @apiParam {String} description the description of device.
 * @apiParam {String} version the version of device.
 * @apiParam {String} productFactory the productFactory of device.
 * 
 * @apiSuccess {String} code 0000
 * @apiSuccess {String} message 更新设备成功
 */
router.post('/update', (req, res) => {
    //获取数据
    const {
        _id, deviceName, owner, deviceStatus, deviceStatusDescription, status, statusDescription,
        userStartDate, deviceDetail, productDate, description, version, productFactory
    } = req.body
    console.log('更新设备-接受到的数据\n')
    console.log({
        _id, deviceName, owner, deviceStatus, deviceStatusDescription, status, statusDescription,
        userStartDate, deviceDetail, productDate, description, version, productFactory
    })
    //校验数据(不符合规则则返回)
    if (!_id || !deviceName || !deviceStatus || !status || !statusDescription) {
        res.send({
            code: '1000',
            message: "数据校验-不能为空"
        })
        return
    }
    //处理数据(返回数据)
    Device.updateMany({
        "deviceDetail.productDate": productDate
    }, {
            deviceName,
            owner,
            deviceStatus,
            deviceStatusDescription,
            useStatus: {
                status: status,
                statusDescription: statusDescription,
                userStartDate: userStartDate
            },
            deviceDetail: {
                name: deviceName,
                productDate: 2017,
                description,
                version,
                productFactory
            }
        }).then(() => {
            res.send({
                code: "0000",
                message: "更新设备成功"
            })
        }).catch(() => {
            res.send({
                code: "9000",
                message: "数据库异常-更新失败"
            })
        })
})

/**
 * @api {post} /devices/query  Query a new device
 * @apiName queryDevice
 * @apiGroup Devices
 * 
 * @apiParam {String} _id the _id of device.
 * @apiParam {String} deviceName the deviceName of device.
 * @apiParam {String} owner the owner of device.
 * @apiParam {String} deviceStatus the deviceStatus of device.
 * 
 * @apiSuccess {String} code 0000
 * @apiSuccess {String} message 查询设备成功
 */
router.post('/query', (req, res) => {
    const { condition } = req.body
    console.log('查询设备-接受到的数据\n')
    console.log({ condition })
    //校验数据
    //处理数据(返回数据)
    Device.find({
        $or: [
            { deviceName: { $regex: condition, $options: '$i' } },
            { owner: { $regex: condition, $options: '$i' } },
            { deviceStatus: { $regex: condition, $options: '$i' } }
        ]
    }).then((data) => {
        console.log(data)
        res.send({
            code: "0000",
            message: "查询成功",
            data: data
        })
    }).catch(() => {
        res.send({
            code: "9000",
            message: "数据库异常-查询失败"
        })
    })
})

module.exports = router