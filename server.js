const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});
 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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