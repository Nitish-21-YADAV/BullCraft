const {Schema}=require("mongoose");

const OrderSchema = new Schema ({
    userId: {
        type:Schema.Types.ObjectId,
        required:true
  },
    name:String,
    qty:Number,
    avg:Number,
    price:Number,
    bs:String,
    date:{
        type:Date,
        default:Date.now,
    }
})

module.exports={OrderSchema}