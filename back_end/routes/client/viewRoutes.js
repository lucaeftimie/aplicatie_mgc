const express = require('express')
const router = express.Router();
const viewsController = require('../../controllers/viewsController')


router.route("/home").get(viewsController.renderHome);

module.exports = router;
