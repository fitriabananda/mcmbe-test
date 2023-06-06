const helper = require('../helper');
const config = require('../config');
const studyPlan = require('../models/studyplan');

async function getList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await studyPlan.findAll({offset, limit: config.listPerPage });
    
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
        data,
        meta
    }
}

async function getStudyPlanById(id) {
    const result = await studyPlan.findByPk(id);
    const data = helper.emptyOrRows(result);
    return {data};
}

async function create(data) {
    const result = await studyPlan.create(data);
    let message = 'Error in creating study plan.';
    if (result.id) {
        message = 'Study plan created successfully.';
    }
    return {message};
}

async function update(id, data) {
    const result = await studyPlan.update(data, {
        where: {
            id
        }
    });
    let message = 'Error in updating study plan.';
    if (result && result.length > 0) {
        message = 'Study plan updated successfully.';
    }
    return {message};
} 

async function removeById(id) {
    const result = await studyPlan.destroy({
        where: {
            id
        }
    });
    let message = 'Error in deleting study plan.';
    if (result) {
        message = 'Study plan deleted successfully.';
    }
    return {message};
}

async function removeByAttributes(attr) {
    const result = await studyPlan.destroy({
        where: {
            ...attr
        }
    });
    let message = 'Error in deleting study plans.';
    if (result) {
        message = 'Study plans with defined attribute(s) deleted successfully.';
    }
    return {message};
}

module.exports = {
    getList,
    getStudyPlanById,
    create,
    update,
    removeById,
    removeByAttributes
}
