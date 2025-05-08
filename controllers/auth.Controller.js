const Pchor = require('../models/pchor');
const Kadra = require('../models/kadra');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { functions, create } = require('lodash');
const bcrypt = require('bcrypt');
const Reset = require('../models/resetPassword');
const Dyzurny = require('../models/dyzurny');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {mail: '', password: ''};

    if(err.code ===11000){
        errors.mail = 'that email is already register';
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const createToken = (id) => {
    return jwt.sign({id}, 'secret', {
        expiresIn: 1 * 24 * 60 * 60
    });
}

const radnString = () => {
    const len = 8
    let randStr = ''
    for(let i=0; i<len; i++){
        const ch = Math.floor((Math.random() *10) +1)
        randStr += ch
    }
    return randStr
}

const sendMail = async (mail, uniqueString) => {

    let Transport = nodemailer.createTransport({
        service: "Gmail",
        port: 587,
        auth:{
            user: "eirb23kp@gmail.com",
            pass: "kgoi wsno qvgu jnaz"
        },
    });

    var mailOptions;
    let sender = "Szef 23kp";

    mailOptions = {
        from: sender,
        to: mail,
        subject: "Email verify",
        html: `Press <a href="http://localhost:3000/verify/${uniqueString}"> here </a>`
    };

    Transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("send");
        }
    });
}

const sendMailToResetPass = async(mail, uniqueReset) => {
    let Transport = nodemailer.createTransport({
        service: "Gmail",
        port: 587,
        auth:{
            user: "eirb23kp@gmail.com",
            pass: "udhi hgun mrcv kpdz"
        },
    });

    var mailOptions;
    let sender = "Szef 23kp";

    mailOptions = {
        from: sender,
        to: mail,
        subject: "Reset Password",
        html: `Press <a href="http://localhost:3000/resetPassword/${uniqueReset}"> here to change password </a>`
    };

    Transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("send");
        }
    });
}

module.exports.homepage_get = (req,res) =>{
    res.render('home');
}
 
module.exports.signup_get = (req,res) => {
    res.render('signup');
}

module.exports.login_get = (req,res) => {
    res.render('login');
}

module.exports.logout_get = (req,res) => {
    res.cookie('jwt', '',{maxAge:1});
    res.redirect('/');
}

module.exports.requestResetPaswsword_get = async (req,res) => {
    res.render('requestResetPass');
    
}

module.exports.resetPassword_get = async (req,res) => {
    res.render('resetPass');
    
}

module.exports.verify_get = async (req,res) => {
    const {uniqueString} = req.params
    
    const user = await Pchor.findOne({uniqueString: uniqueString})
    if(user){
        user.isValid = true;
        await user.save();
        console.log('verifed')
        res.redirect('/login')
    }
    else
    {
        res.json('user not found')
    }
}

module.exports.signup_post = async (req,res) => {
    const {name, surname, mail, password, platoon, section,role, isValid} = req.body;
   
    let hash = await bcrypt.hash(password, 10);
    try{
        uniqueString = radnString();
       const user = await Pchor.create({name, surname, mail, password: hash, platoon, section,role, isValid, uniqueString});
       const token = createToken(user._id);
       sendMail(mail,uniqueString);
       res.cookie('jwt', token, {httpOnly: true, maxAge: 24*60*60*1000});
       res.status(201).json({user: user._id});
    }
    catch(err){
        console.log(err);
        res.status(400);
    }
}

module.exports.login_post = async (req,res) => { 
    const {password,mail} = req.body;

    let user = null;

    try{
        try{
            user = await Pchor.login(password, mail);
        }
        catch(err){
            console.log(err);
        }
        if(!user){
            try{
                user = await Dyzurny.login(password, mail);
            }
            catch(err){
                console.log(err)
            }
        }
        if(!user){
            res.status(400).json({message: err.message});
        }
        const tokenUser = createToken(user._id);
        res.cookie('jwt', tokenUser, {httpOnly: true, maxAge: 24*60*60*1000});
        res.status(200).json({user: user._id, type: user.type});    
    }
    catch(err){
        console.log(err);
    }

}



module.exports.requestResetPaswsword_post = async(req,res) => {
    const {mail} = req.body;

    try{
        uniqueReset = radnString();
        let user = await Pchor.findOne({mail: mail});
        if(!user) throw Error('incorrect login');
        if(user.isValid == false) throw Error('not verify');
        user = await Reset.create({uniqueReset, mail});
        sendMailToResetPass(mail,uniqueReset);        
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: err.message});
    }

}

module.exports.resetPassword_post = async(req,res) => {
    const {newPassword, uniqueReset} = req.body;
    
    let hash = await bcrypt.hash(newPassword,10);

    const data = await Reset.findOne({uniqueReset:uniqueReset})
    if(!data) {
        res.status(401).json({message: "Bad id"})
        console.log('Bad  uniqueReset code');
    }
    const user = await Pchor.findOne({mail: data.mail});
    if(!user) console.log('user not found'); 
   
    await Pchor.findOneAndUpdate({mail: data.mail}, {$set:{password:hash}})
   
    const deleteResult = await Reset.findOneAndDelete({uniqueReset:uniqueReset});
 
    return res.sendStatus(200)
}


