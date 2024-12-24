const {model}=require('mongoose');

// const OrderSchema = import("../schemas/OrderSchema");

const {OrderSchema} = require("../schemas/OrderSchema")
const OrderModel=new model("orders",OrderSchema);
module.exports={OrderModel} 