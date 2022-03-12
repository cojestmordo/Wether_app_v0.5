const express = require('express');
const env = require('dotenv');
const axios = require('axios')
const nodemailer = require('nodemailer');
let app = express.Router();
env.config();

app.post("/", (req, res) => {
  res.redirect('/')
  async function sendMail() {


    const city = 'Warsaw'
        const api_key = process.env.API_KEY
        const config = {
            method: 'get',
            url: `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=2&aqi=no&alerts=no`
        }

    const response = await axios(config).then(result => {
      return result.data.current.condition.text
    });

      const mail_key = process.env.MAIL_KEY;
    
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sjopel75@gmail.com', 
          pass: mail_key, 
        },
      });

      let info = await transporter.sendMail({
        from: '"Fred Foo" <foo@example.com>', 
        to: req.body.newID,
        subject: "Hello ✔",
        text: `Weather in London is: ${response}`, 
        html: `<b>Weather in London is: ${response}</b>`,
      });
      console.log("Message sent: %s", info.messageId);
  }
  sendMail().catch(console.error);
});
module.exports = app;