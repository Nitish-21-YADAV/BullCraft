const {model}=require("mongoose");

const {BuySchema}=require("../schemas/BuySchema");

const BuyModel= new model("order",BuySchema);

module.exports={BuyModel};