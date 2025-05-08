const jwt = require('jsonwebtoken');
const Pchor = require('../models/pchor');
const Dyzurny = require('../models/dyzurny')

const requiredAuth = async (req,res,next) =>{
    const token = req.cookies.jwt;

    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'secret');
            const user = await Pchor.findById(decodedToken.id);
            const user2 = await Dyzurny.findById(decodedToken.id);

            if ((!user || user.isValid === false) && !user2)  {
                return res.redirect('/blocked'); // zabezpieczenie
            }

            if(user){
                res.locals.user = user;
            }
            if(user2){ 
                res.locals.user = user2;
            }
            
            next();

        } catch (err) {
            console.log('Błąd JWT:', err);
            return res.redirect('/login');
        }
    } else {
        return res.redirect('/login');
    }
}

const checkUser = (req,res,next) =>{
    const token = req.cookies.jwt;
    let user = null;

    if(token){
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if(err){
                
                res.locals.name = null;
                next();
            }
            else{
                
                try{
                    try{
                        user = await Pchor.findById(decodedToken.id);
                        if(user){
                            res.locals.user = user;
                        }
                        
                    }
                    catch(err){
                        console.log(err)
                    }
                    if(!user){
                        user = await Dyzurny.findById(decodedToken.id);
                        if(user){
                            res.locals.user = user;
                        }
                    }
                }
                catch(err){
                    console.log(err)
                }

                console.log(decodedToken);
                res.locals.user = user;
                console.log(user.name);
                next();
            }
        })
    }
    else{
        res.locals.nane = null;
        next();
    }
}

const redirectIfLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                return next(); 
            }

            try {
                const pchor = await Pchor.findById(decodedToken.id);
                if (pchor) {
                    return res.redirect('/user');
                }

                const dyzurny = await Dyzurny.findById(decodedToken.id);
                if (dyzurny) {
                    return res.redirect('/dyzurny');
                }
            } catch (e) {
                console.log(e);
            }

            return next();
        });
    } else {
        return next(); 
    }
};


const checkRole = (role) => {
    return async (req, res, next) => {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, 'secret', async (err, decodedToken) => {
                if (err) {
                    return res.redirect('/login');
                }

                try {
                    const userId = decodedToken.id;

                    if (role === 'pchor') {
                        const pchor = await Pchor.findById(userId);
                        if (pchor) {
                            return next(); 
                        } else {
                            return res.redirect('/dyzurny'); 
                        }
                    }

                    if (role === 'dyzurny') {
                        const dyzurny = await Dyzurny.findById(userId);
                        if (dyzurny) {
                            return next(); 
                        } else {
                            return res.redirect('/user'); 
                        }
                    }

                } catch (error) {
                    console.log(error);
                    return res.redirect('/login');
                }
            });
        } else {
            return res.redirect('/login');
        }
    };
};

module.exports = { requiredAuth, checkUser, redirectIfLoggedIn, checkRole };