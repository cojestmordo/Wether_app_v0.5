const express = require('express');
const bodyParser = require('body-parser');

let app = express.Router()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.sendFile(__public + '/index.html');
});

module.exports = app;