const express = require ('express');
const axios = require ('axios');
const bodyParser = require('body-parser');
const env = require('dotenv');

env.config();

console.log(process.env)

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

app.get('/',  (req, res) => {
    res.writeHead(200, {'Content-Type':'text/html'})
    res.sendFile(__public + '/index.html');
});

app.get('/api', async (req, res) =>
{
    const api_key = process.env.API_KEY
    const config = {
        method: 'get',
        url: `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=London&aqi=no`
    }
    let api_res = await axios(config)
    res.send(api_res.data)
})

app.listen (port, () => {
    console.log(`listening on port ${port}.`)
})
