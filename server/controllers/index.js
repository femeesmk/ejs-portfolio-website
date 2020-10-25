let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//  User Model
let userModel = require('../models/user');
let User = userModel.User; // alias

//home page
module.exports.displayHomePage = (req, res, next) => {
  res.render('home', { title: 'Home', slug: 'home' });
};

//about page
module.exports.displayAboutPage = (req, res, next) => {
  res.render('about', { title: 'About Me', slug: 'about' });
};

//projects page
module.exports.displayProjectsPage = (req, res, next) => {
  res.render('projects', { title: 'Projects', slug: 'projects' });
};

//service page
module.exports.displayServicePage = (req, res, next) => {
  res.render('services', { title: 'Services', slug: 'services' });
};

// contact page
module.exports.displayContactPage = (req, res, next) => {
  res.render('contact', { title: 'Contact Me', slug: 'contact' });
};

// login
module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.user) {
    res.render('auth/login', {
      title: 'Login',
      slug: 'login',
      notification: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : '',
    });
  } else {
    return res.redirect('/');
  }
};

// process login

module.exports.processLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // error?
    if (err) {
      return next(err);
    }
    // login error?
    if (!user) {
      req.flash('loginMessage', 'Login Failed!  Invalid username or password.');
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      // error?
      if (err) {
        return next(err);
      }

      const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
      };

      return res.redirect('/contact-list');
    });
  })(req, res, next);
};

// process  logout
module.exports.processLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

// register page
module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if (!req.user) {
    res.render('auth/register', {
      title: 'Register',
      slug: 'login',
      notification: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : '',
    });
  } else {
    return res.redirect('/');
  }
};

//process registration

module.exports.processRegistration = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log('Error: Inserting New User');
      if (err.name == 'UserExistsError') {
        req.flash(
          'registerMessage',
          'Registration Error: User Already Exists!'
        );
        console.log('Error: User Already Exists!');
      }
      return res.render('auth/register', {
        title: 'Register',
        notification: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName : '',
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user and authenticate them

      /* TODO - Getting Ready to convert to API
          res.json({success: true, msg: 'User Registered Successfully!'});
          */

      return passport.authenticate('local')(req, res, () => {
        res.redirect('/contact-list');
      });
    }
  });
};
