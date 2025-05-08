const mongoose = require('mongoose');
const { type } = require('os');
const {Schema} = mongoose;

const  kadraSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    mail:{
        type:String,
        required: true,
        isVerifired: false
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    login:{
        type: String,
        required: true
    },
    presence:{
        type: String,
        enum: ['Obecny', 'Nieobecny'],
        default: 'Obecny'
    }

}, {timestamps: true});

const Kadra = mongoose.model('Kadra', kadraSchema);
module.exports = Kadra;
