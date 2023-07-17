// requiring my config file
const myConfigFile = require('../config/config');
// =========================

// using express
const express = require('express');
const userRoute = express();


// ===========================

// using express session
const session = require('express-session');
userRoute.use(session({ secret: myConfigFile.sessionSecret }))
// ===========================

// using a middleware to handle a session 
const auth = require('../middleware/auth');
// ===========================

// setting view engine
userRoute.set('view engine', 'ejs');
userRoute.set('views', './views/users');
userRoute.use(express.static('static'));
// ============================

// using body-parser
const bodyparser = require('body-parser');
userRoute.use(bodyparser.json());
userRoute.use(bodyparser.urlencoded({ extended: true }));
// ============================

const path = require('path');


// ============================

// *********** ROUTES FOR SIGNUP *************
// using user controller to call load and insert methods
const userController = require('../controllers/usercontroller');
const { config } = require('process');
userRoute.get('/register', auth.isLogout, userController.loadRegister);
userRoute.post('/register', userController.insertUser);
// ============================

// using user controller to verify the email
userRoute.get('/verify', userController.verifyMail);
// ================================

// *************** ROUTES FOR LOGIN ************

userRoute.get('/login', auth.isLogout, userController.loginLoad);
// userRoute.get('/',auth.isLogout,userController.loginLoad);

userRoute.post('/login', userController.verifyLogin);
// userRoute.post('/',userController.verifyLogin);

// ************** ROUTES TO LOAD HOME PAGE ***********
// userRoute.get('/home',auth.isLogin,userController.loadHome);
// ============================

// ************** LOGOUT ****************
userRoute.get('/logout', auth.isLogin, userController.userLogout);
// exporting the route to use it in index.js

userRoute.get('/profile', auth.isLogin, userController.profile);


// ************** FORGET PASSWORD *************
userRoute.get('/forget', auth.isLogout, userController.forgetLoad);
userRoute.post('/forget', userController.forgetVerify);
userRoute.post('/forget-password', userController.resetPassword);
userRoute.get('/forget-password', auth.isLogout, userController.forgetPasswordLoad);

// ===========================

// ************* Verifying the mail if not done at the time of registration ************
userRoute.get('/verification', userController.verificationLoad);
userRoute.post('/verification', userController.sendVerificationLink);
// ============================

//Update

userRoute.get('/edit', auth.isLogin, userController.editLoad);
userRoute.post('/edit', auth.isLogin, userController.updateProfile);

userRoute.get('/dashboard', auth.isLogin, userController.dashboard);
userRoute.post('/save-chat', userController.saveChat);



module.exports = userRoute;
// ============================