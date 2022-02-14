const express = require('express');
const axios = require('axios');
const env = require('dotenv');

let app = express.Router()

env.config();

app.get('/', async (req, res) => {
    const api_key = process.env.API_KEY
    const config = {
        method: 'get',
        url: `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=London&aqi=no`
    }
    let api_res = await axios(config)
    let weather = api_res.data.current.condition.text;
    res.send(api_res.data)
    return weather;
});

module.exports = app;
