const {model}=require("mongoose");

const {RegisterSchema}=require("../schemas/RegisterSchema");
const RegisterModel=new model("registration",RegisterSchema)

module.exports=RegisterModel