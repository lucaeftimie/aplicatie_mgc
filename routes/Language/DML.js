const express = require('express');
const router = express.Router();
const {insertData, updateData, deleteData} = require('./../../controllers/DMLController')

router.route('/insertdata').post(insertData);
router.route('/deletedata').delete(deleteData)
router.route('/updatedata').patch(updateData);

module.exports = router;
