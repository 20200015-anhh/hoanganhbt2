const express = require('express');
const router = express.Router();
const controller = require ("../controllers/BillController")

router.post('/add', controller.addBill)
router.post('/update/:id', controller.updateBill)
router.get('/delete/:id', controller.deleteBill)

module.exports = router;
