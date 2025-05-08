const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema({
    uniqueReset:{
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    }

})

const Reset = mongoose.model('Reset', resetPasswordSchema);
module.exports = Reset;
