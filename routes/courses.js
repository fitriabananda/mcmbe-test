var express = require('express');
var router = express.Router();
const courses = require('../services/courses');

/* GET courses listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await courses.getList(req.query.page));
  } catch (err) {
    console.error('Error while getting course list', err.message);
    next(err);
  }
});

/* GET course by ID */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await courses.getCourseById(req.params.id));
  } catch (err) {
    console.error('Error while getting course', err.message);
    next(err);
  }
});


/* POST course */
router.post('/', async function(req, res, next) {
  try {
    const result = await courses.create(req.body);
    res.statusCode = result.status;
    res.json(result);
  } catch (err) {
    console.error('Error while creating new course', err.message);
    next(err);
  }
});

/* PUT course */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await courses.update(req.params.id, req.body));
  } catch (err) {
    console.error('Error while updating course', err.message);
    next(err);
  }
});

/* DELETE course */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await courses.removeById(req.params.id, req.body));
  } catch (err) {
    console.error('Error while deleting study plan', err.message);
    next(err);
  }
});


module.exports = router;
