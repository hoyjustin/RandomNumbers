'use strict';
var express = require('express');
var router = express.Router();

var randomGenController = require('../controllers/randomGenController');

router.post('/', randomGenController.randomList);

module.exports = router;