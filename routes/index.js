const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const controller = require ("../public/controllers/DBController")

router.get('/', controller.getAllAdRates);

module.exports = router;
