let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);

// about page 
router.get('/about', indexController.displayAboutPage);

// projects page 
router.get('/projects', indexController.displayProjectsPage);

// service page 
router.get('/services', indexController.displayServicePage);

// contact page
router.get('/contact', indexController.displayContactPage);

module.exports = router;
 