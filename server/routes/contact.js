let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { render } = require('../config/app');

// connect to contact model
let Contact = require('../models/contact');

// GET route for contacts list page
router.get('/', (req, res, next) => {
  Contact.find((err, contacts) => {
    if (err) {
      return console.log(err);
    } else {
      res.render('contact/list', {
        title: 'Business Contacts',
        slug: 'contacts',
        contactList: contacts,
      });
    }
  });
});

/** *
 *  Add Contact Routes  - CREATE
 * */
// GET - display add contact page
router.get('/add', (req, res, next) => {
  res.render('contact/add', { title: 'Add Contact', slug: 'add-contact' });
});

// POST - process add contact page
router.post('/add', (req, res, next) => {
  let = newContact = Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });

  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/contact-list');
    }
  });
});

/** *
 * Edit Contact Routes  -  UPDATE
 * */
// GET - display edit contact page
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  Contact.findById(id, (err, selectedContact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render('contact/edit', {
        title: 'Edit Contact',
        slug: 'edit-contact',
        contact: selectedContact,
      });
    }
  });
});

// POST - process edit contact page
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  let updateContact = Contact({
    _id: id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });

  Contact.updateOne({ _id: id }, updateContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/contact-list');
    }
  });
});

/** *
 * Delete Contact Routes - DELETE
 *  */
// GET - contact deletion
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/contact-list');
    }
  });
});

module.exports = router;
