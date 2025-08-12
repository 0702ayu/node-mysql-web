const passport = require("passport");
const LocalStrategy = require("passport-local");
const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const cookieSession = require("cookie-session");
const secret = "secretCuisine123";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // ユーザーモデルのパスを適宜修正してください

module.exports = function (app) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
    }, function (username, password, done) {
      knex("users")
        .where({
          name: username,
        })
        .select("*")
        .then(async function (results) {
          if (results.length === 0) {
            return done(null, false, {message: "Invalid User"});
          } else if (await bcrypt.compare(password, results[0].password)) {
            return done(null, results[0]);
          } else {
            return done(null, false, {message: "Invalid User"});
          }
        })
        .catch(function (err) {
          console.error(err);
          return done(null, false, {message: err.toString()})
        });
    }
  ));

  app.use(
    cookieSession({
      name: "session",
      keys: [secret],

      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );

  app.use(passport.session());
};



// ユーザーのシリアライズ
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ユーザーのデシリアライズ
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// ローカルストラテジーの設定
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
      if (!user.verifyPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
      return done(null, user);
    });
  }
));

module.exports = passport;