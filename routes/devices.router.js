const express = require('express')
const router = express.Router()
const Device = require('../db/models/devices.model')

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/add', (req, res) => {
    //获取数据
    const {
        deviceName,
        owner,
        deviceStatus,
        deviceStatusDescription,
        status,
        statusDescription,
        userStartDate,
        deviceDetail,
        productDate,
        description,
        version,
        productFactory
    } = req.body
    console.log('新增设备-接受到的数据\n')
    console.log({
        deviceName,
        owner,
        deviceStatus,
        deviceStatusDescription,
        status,
        statusDescription,
        userStartDate,
        deviceDetail,
        productDate,
        description,
        version,
        productFactory
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
        owner:owner,
        deviceStatus: deviceStatus,
        deviceStatusDescription: deviceStatusDescription,
        useStatus: {
            status: status, 
            statusDescription:statusDescription,
            userStartDate: userStartDate
        },
        deviceDetail: {
            name: deviceName,
            productDate: productDate,
            description: description,
            version: version,
            productFactory: productFactory
        }
    }).then(()=>{
        res.send({
            code:"0000",
            message:"新增设备成功"
        })
    }).catch(()=>{
        res.send({
            code:"9000",
            message:"数据库-插入失败"
        })
    })
})

module.exports = router