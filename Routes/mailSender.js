const express = require('express');
const env = require('dotenv');
const nodemailer = require('nodemailer');

let app = express.Router();
env.config();

app.post("/", (req, res) => {
  res.redirect('/')
  async function sendMail() {

      const mail_key = process.env.MAIL_KEY
      const weather = 'elo'
    
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sjopel75@gmail.com', 
          pass: mail_key, 
        },
      });

      let info = await transporter.sendMail({
        from: '"Fred Foo" <foo@example.com>', // sender address
        to: req.body.newID, // list of receiversgit 
        subject: "Hello ✔", // Subject line
        text: `Weather in London is: ${weather}`, // plain text body
        html: `<b>Weather in London is: ${weather}</b>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
  }
    sendMail().catch(console.error);
});

module.exports = app;