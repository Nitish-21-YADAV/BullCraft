const { string, boolean } = require('joi')
const {Schema, Model} =require('mongoose')

const StocksSchema = new Schema({
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss:Boolean
})

module.exports={StocksSchema}