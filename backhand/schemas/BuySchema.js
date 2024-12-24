const {Schema}=require("mongoose");

const BuySchema=new Schema({
    name: String,
    qty:Number,
    price: Number,
    mode: String
});

module.exports={BuySchema};