let express = require('express');
let router = express.Router();

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
