const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;
const { isEmail} = require('validator');
const bcrypt = require('bcrypt');

const dyzurnySchema = new Schema({
    login:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minLength: [6, 'Minimum 6 znaków']
    },
    isValid:{
        type: Boolean,
        default: true
    },
    uniqueString:{
        type: String
    },
    mail:{
        type:String,
        required: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    type:{
        type: String,
        enum: ['uzytkownik', 'dyzurny'],
        default: 'dyzurny'
    }
},{timestamps: true})


dyzurnySchema.post('save', function(doc, next) {
    console.log('new user was created', doc);
    next();
})

dyzurnySchema.statics.login = async function(password, mail) {
    var auth = false;
    const user = await this.findOne({mail: mail});
    if(!user) throw Error('incorrect mail');
   
    console.log(password)
    console.log(user.password)
    
    console.log(auth);
    if(password == user.password){
        auth = true;
    }

    console.log(auth);
 
    if(!auth) throw Error('wrong pass');
 
    return user;
 }

 const Dyzurny = mongoose.model('Dyzurny', dyzurnySchema);
 module.exports = Dyzurny;