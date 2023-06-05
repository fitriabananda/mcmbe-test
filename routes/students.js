var express = require('express');
var router = express.Router();
const student = require('../services/students');

/* GET students listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await student.getStudentsList(req.query.page));
  } catch (err) {
    console.log('Error while getting student list', err.message);
    next(err);
  }
});

module.exports = router;
