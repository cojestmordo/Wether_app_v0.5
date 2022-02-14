const express = require('express');
const env = require('dotenv');
const morgan = require('morgan')

const home = require('./Routes/home.js');
const api = require('./Routes/api.js');
const post = require('./Routes/post.js');
const mailSender = require('./Routes/mailSender');

env.config();
const app = express();
const port = process.env.PORT || 5654;

app.use(morgan('combined'))
app.use('/', home);
app.use('/api', api);
app.use('/send', mailSender);
app.use('/send', post);


app.listen(port, () => {
  console.log(`listening on port ${port}.`)
})
