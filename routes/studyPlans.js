var express = require('express');
var router = express.Router();
const studyPlans = require('../services/studyPlans');

/* GET students' studyplans listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await studyPlans.getList(req.query.page));
  } catch (err) {
    console.error('Error while getting student list', err.message);
    next(err);
  }
});

module.exports = router;
