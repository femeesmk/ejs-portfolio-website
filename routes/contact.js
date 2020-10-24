let express = require('express');
let router = express.Router();
let mongoose  = require('mongoose');

// connect to contact model
let Contact = require('../models/contact');

// route for contacts list page
router.get('/', (req, res, next) => {
  Contact.find((err, contacts) => {
    if (err) {
      return console.log(err);
    }
    else {
      res.render('businessContacts', { title: 'Business Contacts', slug: 'contacts', contactList: contacts });
    }
  });
});

module.exports = router; 