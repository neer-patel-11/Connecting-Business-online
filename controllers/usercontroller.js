const User = require('../models/userModel');
const usermodel = require('../models/userModel');
const Chat = require('../models/chatModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require("crypto")
const express = require('express')
const path = require('path');
const app = express()
var http = require('http');
var url = require('url');
var randomstring = require('randomstring')
const config = require('../config/config');
// setting view engine
app.set('view engine', 'ejs');

// ************** SIGN UP METHODS *********************
// securing password using bcrypt

app.use(express.static(path.join(__dirname, 'static')))

const securePassword = async (password) => {
  try {
    let hexDigest = crypto.createHash('sha256').update(password).digest('hex')
    const passwordHash = hexDigest
    return passwordHash;
  } catch (error) {
    res.redirect('/404')

    console.log(error.message);
  }
}
// ================================

// function to load the Register.ejs file
const loadRegister = async (req, res) => {

  try {
    res.render('registration', { req: req })
  } catch (error) {
    res.redirect('/404')

    console.log(error);
  }
}
// =================================


// sending mail using nodemailer
const sendMail = async (req, res, name, companyemail, user_id) => {

  var hostname = req.headers.host; // hostname = 'localhost:8080'
  var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
  console.log('http://' + hostname + pathname);
  // console.log(companyemail);
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTls: true,
      auth: {
        user: 'query.businera@gmail.com',
        pass: 'wkqkjirfcbibiirq' //app password
      }
    });

    const mailDetails = {
      from: 'query.businera@gmail.com',
      to: companyemail,
      subject: 'Businera Verification',
      // html: '<p>Hi ' + name + ', please click here to <a href="http://' + hostname + '/verify?id=' + user_id + '">Verify </a> your mail.</p>',
      html: ` 
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
                <tbody>
                    <tr>
                        <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding-top: 20px; padding-bottom: 20px; padding-right: 0px;" align="right" valign="middle" class="webview"> <a href="#" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:right;text-decoration:underline;padding:0;margin:0" target="_blank" class="text hideOnMobile">Oh wait, there's more! →</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-top: 60px; padding-bottom: 20px;" align="center" valign="middle" class="emailLogo">
                                                            <a href="#" style="text-decoration:none" target="_blank">
                                                                <img alt="" border="0" src="https://businera.shop/images/logo.png" style="width:100%;max-width:150px;height:auto;display:block" width="150">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero">
                                                            
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
                                                            <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Hi `+ name + ` </h2>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                                                            <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">Verify Your Email Account</h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                                            <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> Please click confirm button for verification .</p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top">
                                                                            <table border="0" cellpadding="0" cellspacing="0" align="center">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="background-color: rgb(0, 210, 244); padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href= "http://` + hostname + `/verify?id=` + user_id + `" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="href="http://` + hostname + `/verify?id=` + user_id + `"class="text">Confirm Email</a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center" valign="middle" style="padding-bottom: 40px;" class="emailRegards">
                                                            <!-- Image and Link // -->
                
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                                <tbody>
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="socialLinks">
                                                            <a href="https://www.facebook.com/profile.php?id=100093521044717&is_tour_completed=true" style="display:inline-block" target="_blank" class="facebook">
                                                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/facebook.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                            </a>
                                                            <a href="https://twitter.com/Businera" style="display: inline-block;" target="_blank" class="twitter">
                                                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/twitter.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                            </a>
                                                           
                                                            <a href="https://www.instagram.com/businera.shop/" style="display: inline-block;" target="_blank" class="instagram">
                                                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/instagram.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                            </a>
                                                            <a href="https://www.linkedin.com/company/96793840/admin/?feedType=following" style="display: inline-block;" target="_blank" class="linkdin">
                                                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/linkdin.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                   
                                                        <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="appLinks">
                                                          
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>`

    }

    transporter.sendMail(mailDetails, function(error, info) {
      if (error) {

        console.log("eroor of email verification")
        console.log(error.message);
        res.redirect('/404')
      }
      else {
        console.log('mail sent successfully', info.response);
      }
    })
  } catch (error) {
    console.log("22eroor of email verification")

    console.log(error.message);
    res.redirect('/404')

  }
}
// =================================

//verifying email function
const verifyMail = async (req, res) => {

  try {
    const updateinfo = await User.updateOne({ _id: req.query.id }, { $set: { isVerified: true } });
    console.log(updateinfo);
    res.render('emailVerified', { req: req });
  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}
// =================================

// function to insert the User in db
const insertUser = async (req, res) => {
  const data = req.body;

  var user = await User.find({ companyEmail: data.companyemail })
  // console.log(user)
  if (user.length != 0) {
    res.render('registration', { message: "Your Email is already registered please login ", req: req })

  }

  else {


    const defaultFriend = ['647d831b151873bc3522e708', '647d8728151873bc3522e714']

    try {


      let hexDigest = crypto.createHash('sha256').update(data.password).digest('hex')

      const UserModel = new User({

        companyEmail: data.companyemail,
        password: hexDigest,
        companyName: data.companyname,
        contactNumber: data.contactnumber,
        address: data.address,
        yearOfEstablise: data.yearofestablishment,
        continent: data.region,
        country: data.country,
        companyInfo: data.companyInfo,
        buisnessType: data.buisenessType,
        pincode: data.pincode,
        state: data.city_state,
        friends: defaultFriend,
        isVerified: true,

      });
      const userData = await UserModel.save();
      if (userData) {
      
        // sendMail(req, res, req.body.companyname, req.body.companyemail, userData._id);
        res.render('registration', { message: "your registration has been successfully completed ", req: req })
      }
      else {
        res.render('registration', { message: "your registration has been failed", req: req })
      }
    } catch (error) {
     
      res.redirect('/404')

    }
  }
}
// ===============================


// ************** LOGIN METHODS *******************
// function to load login .ejs file
const loginLoad = async (req, res) => {

  try {
    res.render('login', { req: req });
  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}
// function to verify login
const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ companyEmail: email });
    // console.log(email)
    // console.log(userData)
    if (userData) {
      // const passMatch = await bcrypt.compare(password,userData.password);
      let hexDigest = crypto.createHash('sha256').update(password).digest('hex')
      // console.log(hexDigest)
      // console.log(userData)

      if (hexDigest == userData.password) {
        if (userData.isVerified === true) {
          req.session.user = userData;
          req.session.user_id = userData._id;
          res.redirect('/home');
        }
        else {
          res.render('login', { message: 'please verify your mail', req: req });
        }
      }
      else {
        res.render('login', { message: 'Email and password are incorrect', req: req })
      }
    }
    else {
      res.render('login', { message: 'Email and password incorrect', req: req });
    }
  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}



//  ********* LOGOUT **************
const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}

// ************ forget password *******************

// load forget password function
const forgetLoad = async (req, res) => {

  try {
    res.render('forget', { req: req });
  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}
// ==============================

// sending and verifying forget password link
const forgetVerify = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ companyEmail: email });
    if (userData) {
      if (userData.isVerified) {
        const randomString = randomstring.generate();
        const updatedData = await User.updateOne({ companyEmail: email }, { $set: { token: randomString } });
        console.log(randomString)
        sendResetPasswodMail(req, userData.name, userData.companyEmail, randomString);
        res.render('forget', { message: 'please check your mail to reset the password', req: req });
      }
      else {
        res.render('forget', { message: 'verify your email first', req: req })
      }
    }
    else {
      res.render('forget', { message: 'email doesnt exist', req: req })
    }
  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}
// sending mail for reseting password
const sendResetPasswodMail = async (req, name, email, token) => {
  var hostname = req.headers.host; // hostname = 'localhost:8080'
  var pathname = url.parse(req.url).pathname; // pathname = 
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTls: true,
      auth: {
        user: config.username,
        pass: config.password
      }
    });

    const mailDetails = {
      from: config.username,
      to: email,
      subject: 'Reset Password For Volcanic',

      html: `     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
                <tbody>
                    <tr>
                        <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding-top: 20px; padding-bottom: 20px; padding-right: 0px;" align="right" valign="middle" class="webview"> <a href="#" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:right;text-decoration:underline;padding:0;margin:0" target="_blank" class="text hideOnMobile">Oh wait, there's more! →</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                                <tbody>
                                                    <tr>
                                                        <td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-top: 60px; padding-bottom: 20px;" align="center" valign="middle" class="emailLogo">
                                                            <a href="#" style="text-decoration:none" target="_blank">
                                                                <img alt="" border="0" src="https://businera.shop/images/logo.png" style="width:100%;max-width:150px;height:auto;display:block" width="150">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero">
                                                            
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
                                                            <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Hi Sir/Ma'am </h2>
                                                        </td>
                                                    </tr>
                                                   
                                                    <tr>
                                                        <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                                            <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> Please click here to <a href="http://` + hostname + `/forget-password?token=` + token + `">Reset your password</a> </p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top">
                                                                            <table border="0" cellpadding="0" cellspacing="0" align="center">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="background-color: rgb(0, 210, 244); padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href="http://` + hostname + `/forget-password?token=` + token + `" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="http://` + hostname + `/forget-password?token=` + token + `"class="text">Reset Password</a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center" valign="middle" style="padding-bottom: 40px;" class="emailRegards">
                                                            <!-- Image and Link // -->
                
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                                <tbody>
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="socialLinks">
                                                            <a href="https://www.facebook.com/profile.php?id=100093521044717&is_tour_completed=true" style="display:inline-block" target="_blank" class="facebook">
                                                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/facebook.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                            </a>
                                                            <a href="https://twitter.com/Businera" style="display: inline-block;" target="_blank" class="twitter">
                                                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/twitter.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                            </a>
                                                           
                                                            <a href="https://www.instagram.com/businera.shop/" style="display: inline-block;" target="_blank" class="instagram">
                                                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/instagram.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                            </a>
                                                            <a href="https://www.linkedin.com/company/96793840/admin/?feedType=following" style="display: inline-block;" target="_blank" class="linkdin">
                                                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/linkdin.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                   
                                                        <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="appLinks">
                                                          
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>`


    }

    transporter.sendMail(mailDetails, function(error, info) {
      console.log(email)
      if (error) {
        console.log(error.message);
      }
      else {
        console.log('mail sent successfully', info.response);
      }
    })
  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}
// =================================

const forgetPasswordLoad = async (req, res) => {
  console.log("forgetPass")

  try {
    const token = req.query.token;
    console.log(token)
    const tokenData = await User.findOne({ token: token })
    if (tokenData) {
      res.render('forget-password', { user_id: tokenData._id, req: req })
    }
    else {
      res.render('404', { message: 'token is invalid', req: req });
    }

  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}
// ========================================

// new password

const resetPassword = async (req, res) => {
  console.log("reset")
  try {
    const password = req.body.password;
    const user_id = req.body.user_id;
    const securepass = await securePassword(password);
    const updatedData = await User.findByIdAndUpdate({ _id: user_id }, { $set: { password: securepass, token: '' } });
    res.redirect("/")

  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}

// *************** FUNCTIONS FOR VERIFYING THE ACCOUNT IF NOT DONE AT THE TIME OF REGISTRATION **********

// loading verification page
const verificationLoad = async (req, res) => {
  try {
    res.render('verification', { req: req })
  } catch (error) {
    console.log(error.message);
    res.redirect('./404')

  }
}

// send verification link
const sendVerificationLink = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ companyEmail: email })
    if (userData) {
      if (userData.isVerified) {
        res.render('verification', { message: 'this account is already verified', req: req })
      }
      else {
        sendMail(req, res, userData.companyName, userData.companyEmail, userData._id);
        res.render('verification', { message: 'the verification link has been sent to the entered email', req: req })
      }

    }
    else {
      res.render('verification', { message: 'this mail is not registered', req: req })
    }
  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}

//Profile
const profile = async (req, res) => {
  const id = req.session.user_id;
  const userData = await usermodel.findOne({ _id: id });

  if (userData != null) {
    console.log(userData)
    let image = userData.contactNumber[4]
    image = Number(image)
    image = image % 5
    // console.log(typeof(image))
    res.render('profile', { userData: userData, req: req, image: image })
  }

}

//Update

const editLoad = async (req, res) => {
  try {
    const id = req.session.user_id;
    const userData = await User.findById({ _id: id });
    if (userData) {
      res.render('edit', { user: userData, req: req })
    }
    else {
      res.redirect('/home');
    }

  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}

const updateProfile = async (req, res) => {
  const data = req.body
  console.log(data)
  try {
    const updatedData = await User.findByIdAndUpdate(
      { _id: req.session.user_id },
      {
        $set: {
          companyName: data.companyname,
          contactNumber: data.contactnumber,
          address: data.address,
          yearOfEstablise: data.yearofestablishment,
          continent: data.region,
          country: data.country,
          companyInfo: data.companyInfo,
          buisnessType: data.buisenessType,
          pincode: data.pincode,
          state: data.city_state,
        }
      })

    res.redirect('/profile');
  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}


const dashboard = async (req, res) => {
  try {
    var users = []

    var search = 'tiugdtudturoy';
    var cname = 'ugujgoog';
    var cemail = 'oufgu@gma';
    var userData = null
    if (req.query.search) {
      search = req.query.search;
      // console.log(search)

      userData = await usermodel.findOne({ companyName: search });
      if (userData == null) {
        userData = await usermodel.findOne({ _id: search });
        // console.log("NULL")
      }

      if (userData != null) {
        cname = userData.companyName
        cemail = userData.companyEmail
      }


    }
    users = await User.find({
      _id: { $nin: [req.session.user_id] },
      $or: [
        { companyName: { $regex: '.*' + cname + '.*', $options: 'i' } },
        // { companyName: { $regex: '.*' + search + '.*', $options: 'i' } },
        { companyEmail: { $regex: '.*' + cemail + '.*', $options: 'i' } }
      ]
    })
    console.log(users)
    if (users.length == 0) {
      for (var i = 0; i < req.session.user.friends.length; i++) {
        var user1 = await User.find({ _id: req.session.user.friends[i] });
        users.push(user1);
      }
    }

    console.log("USERs" + users);
    var user = await User.findById({ _id: req.session.user_id })
    res.render('dashboard', { req: req, user: user, users: users });

  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}



const saveChat = async (req, res) => {
  try {
    var chat = new Chat({
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      message: req.body.message

    });

    var newChat = await chat.save();
    addfriend(req.body.sender_id, req.body.receiver_id);
    res.status(200).send({ success: true, msg: 'chat sent', data: newChat });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false, msg: error.message });
  }
}
const addfriend = async (sender_id, receiver_id) => {
  try {

    var sender = await User.findOne({ _id: sender_id });
    var receiver = await User.findOne({ _id: receiver_id });
    if (!sender.friends.includes(receiver_id)) {
      sender.friends.push(receiver_id);
      sender.save();
      receiver.friends.push(sender_id);
      receiver.save();
    }
  } catch (error) {
    console.log(error.message);
    res.redirect('/404')

  }
}
// exporting functions as an Object
module.exports = {
  loadRegister,
  updateProfile,
  editLoad,
  profile,
  insertUser,
  verifyMail,
  loginLoad,
  verifyLogin,
  userLogout,
  forgetLoad,
  forgetVerify,
  sendResetPasswodMail,
  forgetPasswordLoad,
  resetPassword,
  verificationLoad,
  sendVerificationLink,
  dashboard,
  saveChat
}
// ================================