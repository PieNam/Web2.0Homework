var express = require('express');
var router = express.Router();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
// var validator = require('../public/javascripts/validator');
// var debug = require('debug')('signin:index');

// var users = {};

module.exports = function(db) {
  // var users = db.collection('users');
  // debug("users collection setup as: ", users);
  var userManager = require('../models/user')(db);

  /* GET signin page. */
  router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Sign In' });
  });
  /* post and redirect */
  router.post('/signin', function(req, res, next){
    userManager.findUser(req.body.username, req.body.password)
      .then(function(user) {
        console.log('session opr');
        req.session.user = user;
      })
      .then(function(user) {
        console.log('redirect');
        res.redirect('/detail');
      })
      .catch(function(error) {
        console.log('error occur when sign in');
        console.log(error);
        res.render('signin', { title: 'Sign In', error: 'Wrong username or password' });
      });
  });

  /* GET signup page. */
  router.get('/signout', function(req, res, next) {
    console.log('out');
    req.session.destroy();
    res.redirect('/signin');
  });

  /* GET signup page. */
  router.get('/regist', function(req, res, next) {
    res.render('signup', { title: 'Sign Up', user: {}});
  });
  router.post('/regist', function(req, res, next) {
    var user = req.body;
    userManager.checkUser(user)
      .then(userManager.createUser(user))
      .then(function() {
        console.log('session');
        req.session.user = user;
      })
      .then(function() {
        console.log('redirect');
        res.redirect('/detail');
      })
      .catch(function(error) {
        console.log('error');
        console.log(error);
        res.render('signup', { title: 'Sign Up', user: user, error: error });
      });
  });

  router.all('*', function(req, res, next) {
    req.session.user ? next() : res.redirect('/signin');
  });

  /* GET detail page. */
  router.get('/detail', function(req, res, next) {
    res.render('detail', { title: 'Detail', user: req.session.user });
  });

  return router;
}

// function checkUser(user) {
//   var errorMsgs = [];
//   for (var key in user) {
//       if (key == 'password' || key == 'confirmPassword') continue;
//       if (!validator.isFieldValid(key, user[key])) errorMsgs.push(validator.form[key].errorMsg);
//       if (!validator.isAttrValueUnique(users, user, key)) errorMsgs.push(
//           "Sorry, this " + key + " is already taken."
//       );
//   }
//   if (errorMsgs.length > 0) throw new Error(errorMsgs.join('<br />'));
// }

// module.exports = router;