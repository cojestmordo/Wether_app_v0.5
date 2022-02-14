const express = require('express')
const axios = require('axios')
const env = require('dotenv');
const nodemailer = require('nodemailer');
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

      // await findOneListingByName(client, 'mada');

      // await findMultipleListings(client, /./ )

    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }

  main().catch(console.error);

  async function findOneListingByName(client, nameOfListing) {

    const result = await client.db('weather_app').collection('users').findOne({ name: nameOfListing });

    if (result) {
      console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
      console.log(result);
    } else {
      console.log(`No listings found with the name'${nameOfListing}'`)
    }
  }
  async function findMultipleListings(client, nameOfListing) {

    const coursor = client.db('weather_app').collection('users').find({ name: nameOfListing })

    const result = await coursor.toArray();

    if (result) {
      console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].email)
      }
    } else {
      console.log(`No listings found with the name'${nameOfListing}'`)
    }
  }
  async function createListing(client, newListing) {
    const result = await client.db('weather_app').collection('users').insertOne(newListing)

    console.log(`New listing created with the following id: ${result.insertedId}`);
  }

  async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => {
      console.log(`- ${db.name}`);
    })
  }

  // async function main() {

  //     const api_key = process.env.API_KEY
  //     const mail_key = process.env.MAIL_KEY
  //     const config = {
  //         method: 'get',
  //         url: `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=London&aqi=no`
  //     }
  //     let api_res = await axios(config)
  //     let weather = api_res.data.current.condition.text;

  //     let transporter = nodemailer.createTransport({
  //       service: 'gmail',
  //       auth: {
  //         user: 'sjopel75@gmail.com', 
  //         pass: mail_key, 
  //       },
  //     });

  //     let info = await transporter.sendMail({
  //       from: '"Fred Foo" <foo@example.com>', // sender address
  //       to: req.body.newID, // list of receivers
  //       subject: "Hello ✔", // Subject line
  //       text: `Weather in London is: ${weather}`, // plain text body
  //       html: `<b>Weather in London is: ${weather}</b>`, // html body
  //     });

  //     console.log("Message sent: %s", info.messageId);
  // }
  //   main().catch(console.error);
})

module.exports = app;