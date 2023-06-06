var express = require('express');
var router = express.Router();
const students = require('../services/students');

/* GET students listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await students.getList(req.query.page));
  } catch (err) {
    console.log('Error while getting student list', err.message);
    next(err);
  }
});

/* POST student */
router.post('/', async function(req, res, next) {
  try {
    res.json(await students.create(req.body));
  } catch (err) {
    console.error('Error while creating new student', err.message);
    next(err);
  }
})

/* PUT student */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await students.update(req.params.id, req.body));
  } catch (err) {
    console.error('Error while updating student', err.message);
    next(err);
  }
})

module.exports = router;
