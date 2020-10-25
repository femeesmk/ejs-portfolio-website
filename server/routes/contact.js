let express = require('express');
let router = express.Router();

let contactController = require('../controllers/contact');

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    req.flash('loginMessage', 'Access denied! Please login to access the content.');
    return res.redirect('/login');
  }
  next();
}

// GET route for contacts list page
router.get('/', requireAuth, contactController.displayContactItems);

/** *
 *  Add Contact Routes  - CREATE
 * */
// GET - display add contact page
router.get('/add', requireAuth, contactController.displayAddContactItem);

// POST - process add contact page
router.post('/add', requireAuth, contactController.addContactItem);

/** *
 * Edit Contact Routes  -  UPDATE
 * */
// GET - display edit contact page
router.get('/edit/:id', requireAuth, contactController.displayEditContactPage);

// POST - process edit contact page
router.post('/edit/:id', requireAuth, contactController.updateContactItem);

/** *
 * Delete Contact Routes - DELETE
 *  */
// GET - contact deletion
router.get('/delete/:id', requireAuth, contactController.deleteContactItem);

module.exports = router;
