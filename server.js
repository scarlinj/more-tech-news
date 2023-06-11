const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// add PORT before app
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://0.0.0.0/more-tech-news";
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

// set up server in Mongoose
// mongoose.connect(MONGODB_URI || 'mongodb://0.0.0.0/more-tech-news', {
//   userNewUrlParser: true,
//   useFindAndModify: false,
// });

// configure express with database 
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, "/public/images")));

app.use(require('./controllers'));

sequelize.sync({
      // change this when you create new databases
    // "force: true" would cause Sequelize to drop and recreate database tables on startup.  We want database to understand when we change something, 
    // so this allows for us to make those changes while updating the project.
    // If we change the value of the force property to true, then the database connection must sync with the model definitions and associations. 
    // By forcing the sync method to true, we will make the tables re-create if there are any association changes
    force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

// SequelizeStore.sync()