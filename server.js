const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const fs = require('fs');
const mongoose = require('mongoose');
const helpers = require('./utils/helpers');
const bcrypt = require('bcrypt');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<Mongo user>:<password>@cluster0.f4cqg6h.mongodb.net/?retryWrites=true&w=majority";


// add PORT before app - dynamically set PORT as a variable for Heroku to configure automatically - leave this open variable as PORT
const PORT = process.env.PORT || 3001;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/more-tech-news';
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';
const app = express();
const sequelize = require('./config/connection');

// initiate sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  })
};

// pass helpers into handlebars
const hbs = exphbs.create({ helpers });

// configure express with database 
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, '/public/images')));

// set up server in Mongoose - use mongodb://127.0.0.1:27017/app-name as of 2023
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
//     // for deploy, use in pakage.json "start": MONGODB_URI=http://localhost:27017 node server.js
//     // the above did not work 6-27-2023
// try {
// mongoose.connect(MONGODB_URI || 'mongodb://127.0.0.1:27017/more-tech-news');
// } catch(error) {
//     handleError(error);
//   // // as of 2022, the below are no longer supported in Mongoose.  Will prevent app from starting.
//   // userNewUrlParser: true,
//   // useFindAndModify: false,
// };


// add routes
app.use(require('./controllers'));

sequelize.sync({
      // change this when you create new databases
    // "force: true" would cause Sequelize to drop and recreate database tables on startup.  We want database to understand when we change something, 
    // so this allows for us to make those changes while updating the project.
    // If we change the value of the force property to true, then the database connection must sync with the model definitions and associations. 
    // By forcing the sync method to true, we will make the tables re-create if there are any association changes
    force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
  });
});
