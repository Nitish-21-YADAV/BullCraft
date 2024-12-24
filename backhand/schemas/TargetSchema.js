const { types } = require('joi')
const {Schema} = require('mongoose')

const TargetSchema = new Schema({
    userId: {
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
  },
    name:String,
    price:Number,
    target:Number

})

module.exports={TargetSchema}