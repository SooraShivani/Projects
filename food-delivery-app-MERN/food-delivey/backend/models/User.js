const mongoose = require('mongoose');
const mongoDB = require('../db');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('user', UserSchema)  //not filename and schemaname

// with the help of model we will be able to perform CRUD operation in 
// mongoDB with the help of mongoose