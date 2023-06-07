var express = require('express');
var router = express.Router();
const service = require('../services/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
