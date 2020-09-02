const express = require('express');

const errorHandlerController = require('../controllers/errorHandler')

const router = express.Router();

router.use('/', errorHandlerController.notFound);

module.exports = router;