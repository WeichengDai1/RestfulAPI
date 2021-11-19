// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'This is a demo',
    });
});
// Import contact controller
var contactController = require('./contactController');
var contactControllerSearch = require('./contactControllerSearch')
// Contact routes
router.route('/users')
    .get(contactController.index)
    .post(contactController.new);

router.route('/users/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

router.route('/find')
    .get(contactControllerSearch.view)

// Export API routes
module.exports = router;