const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/devices_manage',{useNewUrlParser:true})
var db = mongoose.connection
db.on('error', console.error.bind(console, '设备管理数据库连接异常 connection error:'))
db.once('open', function() {
    console.log('设备管理数据库连接成功')
  });
