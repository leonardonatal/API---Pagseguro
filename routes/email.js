
const nodemailer = require("nodemailer");
const emailValidationHandler = require('../common/validation-email-handler')

module.exports = function(app){
    app.post("/api/send-mail",[emailValidationHandler,function(req,resp){

        const email = req.body.sender.email;
        const body = req.body.sender.body;
        const subject = req.body.sender.subject;
        const title = req.body.sender.title;
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure:true,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "Felizbela.modainfantil@gmail.com", // generated ethereal user
              pass: "jesuscristoeosenhor" // generated ethereal password
            }
          });
        
          let mailOptions = {
            from: '"Feliz bela" <suporte@felizbela.com.br>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: title, // plain text body
            html: body // html body
          };

          transporter.sendMail(mailOptions).then(info =>{
            return resp.status(200).json(info)
          })
          .catch(error=>{
            return resp.status(500).json(error) 
          })
    }])
}