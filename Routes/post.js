const express = require('express')
const env = require('dotenv');
const { MongoClient } = require('mongodb');

let app = express.Router();
env.config();

app.post("/", (req, res) => {
  res.redirect('/')

  var newID = req.body.newID;
  var username = req.body.username

  async function main() {
    const password = process.env.DB_KEY
    const uri = `mongodb+srv://mada:${password}@cluster0.jeg4l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

    const client = new MongoClient(uri);

    try {
      await client.connect();
      await createListing(client, {
        name: username,
        email: newID
      })

    } catch (e) {
    } finally {
      await client.close();
    }
  } 
  main().catch(console.error);

  async function createListing(client, newListing) {
    const result = await client.db('weather_app').collection('users').insertOne(newListing)
    console.log(`New listing created with the following id: ${result.insertedId}`);
  }

})

module.exports = app;