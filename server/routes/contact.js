let express = require('express');
let router = express.Router();
const { render } = require('../config/app');

let contactController = require('../controllers/contact')

// GET route for contacts list page
router.get('/', contactController.displayContactItems);

/** *
 *  Add Contact Routes  - CREATE
 * */
// GET - display add contact page
router.get('/add', contactController.displayAddContactItem);

// POST - process add contact page
router.post('/add', contactController.addContactItem);

/** *
 * Edit Contact Routes  -  UPDATE
 * */
// GET - display edit contact page
router.get('/edit/:id', contactController.displayEditContactPage);

// POST - process edit contact page
router.post('/edit/:id', contactController.updateContactItem );

/** *
 * Delete Contact Routes - DELETE
 *  */
// GET - contact deletion
router.get('/delete/:id',contactController.deleteContactItem);

module.exports = router;
