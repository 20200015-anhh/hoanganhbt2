const express = require('express');
const router = express.Router();
const controller = require ("../controllers/ClientController")

router.post('/add/', controller.addClient)
router.post('/update/', controller.updateClient)
router.get('/delete/:id', controller.deleteClient)

module.exports = router;
