const express = require('express')
const app = express()
const connect = require('./db/connect')
const devicesRouter = require('./routes/devices.router')
const bodyParser = require('body-parser')
const path = require('path')

//body-parser数据解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

//路由
app.use('/devices', devicesRouter)

//swagger ui
app.use('/swagger_ui', express.static(path.join(__dirname, 'swagger_ui')));

//开启服务
app.listen(8080, () => {
    console.log("devicesManage server start")
})