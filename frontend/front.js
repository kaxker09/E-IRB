const jwt = require('jsonwebtoken');
const { functions, create } = require('lodash');
const Pchor = require('../models/pchor');
const { plugin } = require('mongoose');


module.exports.user_get = async (req,res) => {
    res.render('user');
}

module.exports.firstplatoon_get = async (req,res) => {
    if(req.xhr){
        try{
        const stanEwidencyjnyPierwszy = await Pchor.countDocuments({platoon: 1});
        const stanFaktycznyPierwszy = await Pchor.countDocuments({platoon: 1, status: "Obecny"});
        const users = await Pchor.find({platoon: 1}).sort({surname: 1});
        return res.json({stanFaktycznyPierwszy, stanEwidencyjnyPierwszy, users});
    }
    catch (err){
        console.log(err);
    }
}
    try {
        const stanEwidencyjnyPierwszy = await Pchor.countDocuments({platoon: 1});
        const stanFaktycznyPierwszy = await Pchor.countDocuments({platoon: 1, status: "Obecny"});
        const users = await Pchor.find({platoon: 1}).sort({surname: 1});
        res.render('1pluton', {stanFaktycznyPierwszy, stanEwidencyjnyPierwszy, users}); 

    }
    
    catch (err) {
        console.log(err);
    }
}

module.exports.secondplatoon_get = async (req,res) => {
    if(req.xhr){
        try{
        const stanEwidencyjnyDrugi = await Pchor.countDocuments({platoon: 2});
        const stanFaktycznyDrugi = await Pchor.countDocuments({platoon: 2, status: "Obecny"});
        const users = await Pchor.find({platoon: 2}).sort({surname: 1});
        return res.json({stanFaktycznyDrugi, stanEwidencyjnyDrugi, users});
    }
    catch (err){
        console.log(err);
    }
}
    try {
        const stanEwidencyjnyDrugi = await Pchor.countDocuments({platoon: 2});
        const stanFaktycznyDrugi = await Pchor.countDocuments({platoon: 2, status: "Obecny"});
        const users = await Pchor.find({platoon: 2}).sort({surname: 1});
        res.render('2pluton', {stanFaktycznyDrugi, stanEwidencyjnyDrugi, users}); 

    }
    
    catch (err) {
        console.log(err);
    }
}

module.exports.thirdplatoon_get = async (req,res) => {
    if(req.xhr){
        try{
        const stanEwidencyjnyTrzeci = await Pchor.countDocuments({platoon: 3});
        const stanFaktycznyTrzeci = await Pchor.countDocuments({platoon: 3, status: "Obecny"});
        const users = await Pchor.find({platoon: 3}).sort({surname: 1});
        return res.json({stanFaktycznyTrzeci, stanEwidencyjnyTrzeci, users});
    }
    catch (err){
        console.log(err);
    }
}
    try {
        const stanEwidencyjnyTrzeci = await Pchor.countDocuments({platoon: 3});
        const stanFaktycznyTrzeci = await Pchor.countDocuments({platoon: 3, status: "Obecny"});
        const users = await Pchor.find({platoon: 3}).sort({surname: 1});
        res.render('3pluton', {stanFaktycznyTrzeci, stanEwidencyjnyTrzeci, users}); 

    }
    
    catch (err) {
        console.log(err);
    }
}

module.exports.fourthplatoon_get = async (req,res) => {
    if(req.xhr){
        try{
        const stanEwidencyjnyCzwarty = await Pchor.countDocuments({platoon: 4});
        const stanFaktycznyCzwarty = await Pchor.countDocuments({platoon: 4, status: "Obecny"});
        const users = await Pchor.find({platoon: 4}).sort({surname: 1});
        return res.json({stanFaktycznyCzwarty, stanEwidencyjnyCzwarty, users});
    }
    catch (err){
        console.log(err);
    }
}
    try {
        const stanEwidencyjnyCzwarty = await Pchor.countDocuments({platoon: 4});
        const stanFaktycznyCzwarty = await Pchor.countDocuments({platoon: 4, status: "Obecny"});
        const users = await Pchor.find({platoon: 4}).sort({surname: 1});
        res.render('4pluton', {stanFaktycznyCzwarty, stanEwidencyjnyCzwarty, users}); 

    }
    
    catch (err) {
        console.log(err);
    }
}





module.exports.admin_get = async (req,res) => {
    if(req.xhr){
    try{
        const stanEwidencyjny = await Pchor.countDocuments();
        const stanFaktyczny = await Pchor.countDocuments({status: "Obecny"});

        const stanEwidencyjnyPierwszy = await Pchor.countDocuments({platoon: 1});
        const stanFaktycznyPierwszy = await Pchor.countDocuments({platoon: 1, status: "Obecny"});

        const stanEwidencyjnyDrugi = await Pchor.countDocuments({platoon: 2});
        const stanFaktycznyDrugi = await Pchor.countDocuments({platoon: 2, status: "Obecny"});
        const stanEwidencyjnyTrzeci = await Pchor.countDocuments({platoon: 3});
        const stanFaktycznyTrzeci = await Pchor.countDocuments({platoon: 3, status: "Obecny"});
        const stanEwidencyjnyCzwarty = await Pchor.countDocuments({platoon: 4});
        const stanFaktycznyCzwarty = await Pchor.countDocuments({platoon: 4, status: "Obecny"});

        const user1 = await  Pchor.find({platoon:1}).lean();
        const user2 = await  Pchor.find({platoon:2}).lean();
        const user3 = await  Pchor.find({platoon:3}).lean();
        const user4 = await  Pchor.find({platoon:4}).lean();
    
        return res.json({ stanFaktyczny, stanEwidencyjny, stanEwidencyjnyPierwszy,stanFaktycznyPierwszy,pluton1:user1, stanEwidencyjnyDrugi, stanFaktycznyDrugi, stanEwidencyjnyTrzeci, stanFaktycznyTrzeci, stanEwidencyjnyCzwarty, stanFaktycznyCzwarty, pluton2:user2, pluton3:user3, pluton4:user4});
    }
    catch (err){
        console.log(err);
    }
}

    try {
    const stanEwidencyjny = await Pchor.countDocuments();
    const stanFaktyczny = await Pchor.countDocuments({ status: "Obecny" });
    const stanEwidencyjnyPierwszy = await Pchor.countDocuments({platoon: 1});
    const stanFaktycznyPierwszy = await Pchor.countDocuments({platoon: 1, status: "Obecny"});
    const stanEwidencyjnyDrugi = await Pchor.countDocuments({platoon: 2});
    const stanFaktycznyDrugi = await Pchor.countDocuments({platoon: 2, status: "Obecny"});
    const stanEwidencyjnyTrzeci = await Pchor.countDocuments({platoon: 3});
    const stanFaktycznyTrzeci = await Pchor.countDocuments({platoon: 3, status: "Obecny"});
    const stanEwidencyjnyCzwarty = await Pchor.countDocuments({platoon: 4});
    const stanFaktycznyCzwarty = await Pchor.countDocuments({platoon: 4, status: "Obecny"});

    const user1 = await  Pchor.find({platoon:1}).lean();
    const user2 = await  Pchor.find({platoon:2}).lean();
    const user3 = await  Pchor.find({platoon:3}).lean();
    const user4 = await  Pchor.find({platoon:4}).lean();   
    res.render('admin', { stanFaktyczny, stanEwidencyjny, stanEwidencyjnyPierwszy,stanFaktycznyPierwszy,pluton1:user1, stanEwidencyjnyDrugi, stanFaktycznyDrugi, stanEwidencyjnyTrzeci, stanFaktycznyTrzeci, stanEwidencyjnyCzwarty, stanFaktycznyCzwarty, pluton2:user2, pluton3:user3, pluton4:user4});
    }
    catch (err) {
        console.log(err);

    }
}




