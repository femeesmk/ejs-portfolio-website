var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home', slug: 'home' });
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home', slug: 'home' });
});

// about page 
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me', slug: 'about' });
});

// projects page 
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects', slug: 'projects' });
});

// service page 
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', slug: 'services' });
});

// contact page
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me', slug: 'contact' });
});


module.exports = router;
