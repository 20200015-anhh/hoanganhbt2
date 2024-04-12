const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const controller = require ("../controllers/DBController")

router.get('/', controller.getAll);

module.exports = router;
