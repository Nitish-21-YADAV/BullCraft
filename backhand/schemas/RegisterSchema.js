// UserSchema.js
const { required } = require("joi");
const { Schema } = require("mongoose");

const RegisterSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        unique: true     
    },
    contact: {
        type: String,
        required: true
    },
    email:{ type:String,
        required: true,
        unique: true
    },
    country:{
        type: String,
        required: true
    },
    altcontact:{ 
        type: String 
    },
    altemail:{type: String },
    state: { type: String },
    address: { 
        type: String
    },
    work: { 
        type: String
    }
});

module.exports = {RegisterSchema}; 