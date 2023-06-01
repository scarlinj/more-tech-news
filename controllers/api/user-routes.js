const router = require('express').Router();
const { User, Post, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get user by id
// GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_url', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts'
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
// create a user
router.post('/', withAuth, (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    // the below gives our server easy access to the user's user_id, username, and a Boolean describing whether or not the user is logged in.
    .then(dbUserData => {
      res.json(dbUserData);
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        // Boolean describing whether or not the user is logged in
        req.session.loggedIn = true;
        
        // res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
});

// This route will be found at http://localhost:3001/api/users/login in the browser
router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  {{
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }
  // Because the below instance method returns a Boolean, we can use it in a conditional statement to verify whether the user has been verified or not.
  const validPassword = dbUserData.checkPassword(req.body.password);

  if (!validPassword) {
    res.status(400).json({ message: 'Incorrect password!' });
    return;
  }

  req.session.save(() => {
    // declare session variables
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;

    res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
};
  } 
  // catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }
});

router.post('/logout', withAuth, (req, res) => {
  // send back a 204 status after session destroyed
  if (req.session.loggedIn) {
      req.session.destroy(() => {
      res.status(204).end();
      console.log("user has logged out.")
      });
  }
  else {
      res.status(404).end();
  }
});

// update existing user data
// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
  // expects {username: 'scarlinj', email: 'scarlinj@gmail.com', password: 'password'}

  // if req.body has exact key/value pairs to match the model, pass in req.body instead to only update what's passed through
  // Sequelize documentation shows to use individualHooks: true, in order to use hooks for each individual record, along with the bulk hooks
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a user from database
// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;