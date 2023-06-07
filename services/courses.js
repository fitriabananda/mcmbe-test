const helper = require('../utilities/helper');
const config = require('../utilities/config');
const course = require('../models/course');

async function getList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await course.findAll({offset, limit: config.listPerPage });
    
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
        data,
        meta
    }
}

async function getCourseById(id) {
    const result = await course.findByPk(id);
    const data = helper.emptyOrRows(result);
    return {data};
}

async function getCourseByAttr(attr) {
    const result = await course.findOne({
        where: attr
    });
    const data = result ? result.dataValues : [];
    return {data};
}

async function create(data) {
    const result = await course.create(data);
    let message = 'Error in creating course.';
    if (result.id) {
        message = 'Course created successfully.';
    }
    return {message, id: result.id};
}

async function update(id, data) {
    const result = await course.update(data, {
        where: {
            id
        }
    });
    let message = 'Error in updating course.';
    if (result && result.length > 0) {
        message = 'Course  updated successfully.';
    }
    return {message};
} 

async function removeById(id) {
    const result = await course.destroy({
        where: {
            id
        }
    });
    let message = 'Error in deleting course.';
    if (result) {
        message = 'Course deleted successfully.';
    }
    return {message};
}

async function removeByAttributes(attr) {
    const result = await course.destroy({
        where: {
            ...attr
        }
    });
    let message = 'Error in deleting courses.';
    if (result) {
        message = 'Courses with defined attribute(s) deleted successfully.';
    }
    return {message};
}

module.exports = {
    getList,
    getCourseById,
    getCourseByAttr,
    create,
    update,
    removeById,
    removeByAttributes
}
