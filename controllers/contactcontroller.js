const nodemailer = require('nodemailer')
const fromSideEmail = 'query.businera@gmail.com';
const fromSidePass = 'wkqkjirfcbibiirq';

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromSideEmail,
    pass: fromSidePass,
  }
})

const sendMessage = async (req, res) => {

  const Data = req.body;
  // console.log(Data)
  let message = "If Mail received then message send successfully";

  let msg = `Company '${Data.company_name}' has sent their mail. \n \n` +
    `Message: ${Data.message} \n \n` +
    `Sender: ${Data.sender_name} \n \n` +
    `Phone number:  + ${Data.phoneNo} \n \n` +
    `Email: ${Data.sender_email}`;

  let UserQuery = {
    from: '"Businera" <query.businera@gmail.com>',
    to: fromSideEmail,
    subject: Data.company_name,
    text: msg
  }

  let ThankyouMsg = {
    from: '"Businera" <query.businera@gmail.com>',
    to: Data.sender_email,
    subject: "Mail received successfully",
    html: ` <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
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
                                                            <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Thank You ,for contacting us we will reach out to you soon. </h2>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                                                           
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                                           
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

  mailTransporter.sendMail(UserQuery, (err) => {
    if (err) {

      console.log(err);
    } else {

      console.log('Email_1 has been sent successfully');
      console.log(message)
      res.redirect('/404')

    }
  })

  mailTransporter.sendMail(ThankyouMsg, (err) => {
    if (err) {
      console.log(err);
      res.redirect('/404')

    } else {
      console.log('Email_2 has been sent successfully')
    }
  })

  res.render('contact', { req: req, message: message })

}

module.exports = { sendMessage }