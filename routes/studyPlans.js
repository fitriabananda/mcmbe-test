var express = require('express');
var router = express.Router();
const studyPlans = require('../services/studyPlans');

/* GET students' study plans list. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await studyPlans.getList(req.query.page));
  } catch (err) {
    console.error('Error while getting student list', err.message);
    next(err);
  }
});

/* GET study plan by ID */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await studyPlans.getStudyPlanById(req.params.id));
  } catch (err) {
    console.error('Error while getting study plan', err.message);
    next(err);
  }
});


/* POST study plan */
router.post('/', async function(req, res, next) {
  try {
    const result = await studyPlans.create(req.body);
    res.statusCode = result.status;
    res.json(result);
  } catch (err) {
    console.error('Error while creating new study plan', err.message);
    next(err);
  }
});

/* PUT study plan */
router.put('/:id', async function(req, res, next) {
  try {
    const result = await studyPlans.update(req.params.id, req.body);
    res.statusCode = result.status;
    res.json(result);
  } catch (err) {
    console.error('Error while updating study plan', err.message);
    next(err);
  }
});

/* DELETE study plan */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await studyPlans.removeById(req.params.id, req.body));
  } catch (err) {
    console.error('Error while deleting study plan', err.message);
    next(err);
  }
});


module.exports = router;
