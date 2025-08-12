const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

const express = require('express');
const router = express.Router();

// Import calendar routes
const calendarRoutes = require('../calendar/calendarRoutes');


router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  knex("tasks")
    .select("*")
    .then(function (results) {
      res.render('index', {
        title: 'ToDo App',
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

router.post('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const todo = req.body.add;
  knex("tasks")
    .insert({user_id: 1, content: todo})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

const express = require('express');
const router = express.Router();

// Import calendar routes
const calendarRoutes = require('../calendar/calendarRoutes');

// Use calendar routes
router.use('/calendar', calendarRoutes);


module.exports = router;
