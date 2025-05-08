const express = require('express');
const morgan = require('morgan');
const {result} = require('lodash');
const Pchor = require('./models/pchor');
const Kadra = require('./models/kadra');
const Dyzurny = require('./models/dyzurny');
const mongoose = require('mongoose');
const blogRoutes = require('./backend/routes');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config.env' });



const bcrypt = require('bcrypt');

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));

const dbURI = process.env.URL;

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(express.json());

app.use('/public', express.static('public'));

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(3000)
        console.log('datebase connected')
    })
    .catch((error) => console.log(error)); 

app.use(blogRoutes);





