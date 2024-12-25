const {model}=require('mongoose');


const {OrderSchema} = require("../schemas/OrderSchema")
const OrderModel=new model("orders",OrderSchema);
module.exports={OrderModel} 