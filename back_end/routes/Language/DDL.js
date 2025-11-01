const express = require('express');
const router = express.Router();
const {createTables, dropTables,integrityConstraints} = require('../../controllers/DDLController');

router.route("/createtables").post(createTables);
router.route("/droptables").delete(dropTables);
router.patch("/addconstraints", integrityConstraints);

module.exports = router;
