const mongoose  = require('mongoose')

//创建 schema 对象
var deviceSchema = new mongoose.Schema({
    deviceName:{type:String,require:true},
    owner:{type:String},
    deviceStatus:{type:String,require:true}, //0正常 1损坏 2废弃
    deviceStatusDescription:{type:String,require:true},
    useStatus:{
        status:{type:String,require:true},//0使用中1未使用
        statusDescription:{type:String,require:true},
        userStartDate:String
    },
    deviceDetail:{
        name:String,
        productDate:String,
        description:String,
        version:String,
        productFactory:String
    }
})

//将schema对象转化成model 并 导出
module.exports = mongoose.model("devices",deviceSchema)
