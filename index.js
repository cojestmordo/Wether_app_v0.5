const express = require ('express');
const axios = require ('axios');
const bodyParser = require('body-parser');
const env = require('dotenv');
const nodemailer = require('nodemailer')

env.config();

const app = express();

const port = process.env.PORT || 4444;



app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

app.get('/',  (req, res) => {
    res.writeHead(200, {'Content-Type':'text/html'})
    res.sendFile(__public + '/index.html');
});

app.get('/api', async (req, res) =>{
    const api_key = process.env.API_KEY

    const config = {
        method: 'get',
        url: `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=London&aqi=no`
    }
    let api_res = await axios(config)
    res.send(api_res.data)
})

app.post("/send", (req, res) => {
    var newID = req.body.ID;
    console.log(req.body.newID)
    res.redirect('/')
    async function main() {
    
        const api_key = process.env.API_KEY
        const mail_key = process.env.MAIL_KEY
        const config = {
            method: 'get',
            url: `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=London&aqi=no`
        }
        let api_res = await axios(config)
        let weather = api_res.data.current.condition.text;
    
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'sjopel75@gmail.com', 
            pass: mail_key, 
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo" <foo@example.com>', // sender address
          to: req.body.newID, // list of receivers
          subject: "Hello ✔", // Subject line
          text: `Weather in London is: ${weather}`, // plain text body
          html: `<b>Weather in London is: ${weather}</b>`, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
      
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
      
      main().catch(console.error);

})

app.listen (port, () => {
    console.log(`listening on port ${port}.`)
})
