var express = require('express');
var router = express.Router();
const students = require('../services/students');

/* GET students listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await students.getList(req.query.page));
  } catch (err) {
    console.error('Error while getting student list', err.message);
    next(err);
  }
});

/* GET student by ID */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await students.getStudentById(req.params.id));
  } catch (err) {
    console.error('Error while getting student', err.message);
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
});

/* PUT student */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await students.update(req.params.id, req.body));
  } catch (err) {
    console.error('Error while updating student', err.message);
    next(err);
  }
});

/* DELETE student by ID */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await students.removeById(req.params.id));
  } catch (err) {
    console.error('Error while deleting student', err.message);
    next(err);
  }
});

/* DELETE student by attributes */
router.delete('/', async function(req, res, next) {
  try {
    res.json(await students.removeByAttributes(req.body));
  } catch (err) {
    console.error('Error while deleting students', err.message);
    next(err);
  }
});

module.exports = router;
