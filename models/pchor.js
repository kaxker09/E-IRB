const mongoose = require('mongoose');
const { type } = require('os');
const bcrypt = require('bcrypt');
const { isEmail} = require('validator')
const Schema = mongoose.Schema

const pchorSchema = new Schema({
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
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    uniqueString:{
        type: String
    },
    phone:{
        type: Number,
        required: false
    },
    password:{
        type:String,
        required: true,
        minLength: [6, 'Minimum 6 znaków']
    },
    platoon:{
        type: Number,
        required: true
    },
    section:{
        type: Number,
        required: true
    },
    room:{
        type: Number,
        required: false,
    },
    status:{
        type: String,
        enum: ['Obecny', 'Nieobecny'],
        default: 'Obecny'
    },
    role:{
        type: String,
        enum: ['Pomocnik D-cy plutony', 'D-ca drużyny', 'Student'],
        default: 'Student'
    },
    isValid:{
        type: Boolean,
        default: false
    },
    action:{
        type: String,
        enum: ['Wychodzę', 'Wchodzę'],
        default: 'Wychodzę'
    },
    type:{
            type: String,
            enum: ['uzytkownik', 'dyzurny'],
            default: 'uzytkownik'
        }

}, {timestamps: true});

const saltRounds = 10;

pchorSchema.post('save', function(doc, next) {
    console.log('new user was created', doc);
    next();
})

pchorSchema.statics.login = async function(password, mail) {
    const user = await this.findOne({mail: mail});
    if(!user) throw Error('incorrect login');
    if(user.isValid == false) throw Error('not verify');
    console.log(password)
    console.log(user.password)
    let hash = user.password.toString()
    const auth = await bcrypt.compare(password, hash);
 
    if(!auth) throw Error('wrong pass');
 
    return user;
 }

const Pchor = mongoose.model('Pchor', pchorSchema);
module.exports = Pchor;

