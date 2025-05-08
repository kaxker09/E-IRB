const Pchor = require('../models/pchor');

module.exports.status_post = async (req, res) => {
    const {_id} = req.body;

    try{
        const user = await Pchor.findOne({_id: _id});
        if(!user){
            console.log('user not found');
        }
        user.status = user.status === "Obecny" ? "Nieobecny" : "Obecny";
        user.action = user.action === "Wychodzę" ? "Wchodzę" : "Wychodzę";


        await user.save();
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
}