const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
require('dotenv').config();

//import routs
const authRoute = require('./routes/auth');

require('dotenv').config();
//connect to db

mongoose.connect('mongodb+srv://chinmay:chinmay@cluster0.rx3rt.mongodb.net/<dbname>?retryWrites=true&w=majority',
{ useNewUrlParser: true },
()=> console.log('connected to db')
);

//Middleware
app.use(express.json());



//Route
app.use('/api/user',authRoute);

app.listen(3000,() => console.log('server is runnning'));