const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Reset = require('../models/resetPassword');
const jwt = require('jsonwebtoken');
const Admin = require('../models/dyzurny');
const { functions, create } = require('lodash');

const createToken = (id) => {
    return jwt.sign({id}, 'secret', {
        expiresIn: 1 * 24 * 60 * 60
    });
}

module.exports.login_post = async (req,res) => { 
    const {password,mail} = req.body;

    try{
        const user = await Admin.login(password, mail);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 24*60*60*1000});
        res.status(200).json({user: user._id});
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: err.message});
    }
}