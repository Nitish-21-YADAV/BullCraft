const {model} = require('mongoose')

const {TargetSchema} = require('../schemas/TargetSchema');

const TargetModel = new model("targets",TargetSchema);
module.exports={TargetModel}