const express = require('express');
const axios = require('axios');
const env = require('dotenv');
let app = express.Router()

env.config();

app.get('/',  (req, res) => {
    async function getAPI(){
        const city = 'Warsaw'
        const api_key = process.env.API_KEY
        const config = {
            method: 'get',
            url: `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=2&aqi=no&alerts=no`
        }
        let api_res = await axios(config)
        return res.json(api_res.data)
    }
   getAPI();
});



module.exports = app;

