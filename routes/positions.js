const express = require('express');
const router = express.Router();
const controller = require ("../controllers/PositionController")

router.post('/add', controller.addPosition)
router.post('/update', controller.updatePosition)
router.get('/delete/:id', controller.deletePosition)

module.exports = router;
