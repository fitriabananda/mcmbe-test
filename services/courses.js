const helper = require('../helper');
const config = require('../config');
const course = require('../models/course');
const { courseValidator, courseStudentValidator } = require('../utilities/validator');

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
    let message = 'Error in creating course.';
    let status = 500;
    let validation = courseValidator(data);
    if (validation.fails()) {
        message = validation.errors.all();
        status = 422;
    } else {
        const result = await course.create(data);
        if (result.id) {
            message = 'Course created successfully.';
            status = 200;
        }
    }
    return {message, status, id: result.id};
}

async function update(id, data) {
    let validation = courseStudentValidator(data);
    let result = {status:500};
    if (validation.fails()) {
        result.message = validation.errors.all();
        result.status = 422;
    } else {
        result = await course.update(data, {
            where: {
                id
            }
        });
        result.message = 'Error in updating course.';
        if (result && result.length > 0) {
            result.status = 200;
            result.message = 'Course  updated successfully.';
        }
    }
    return result;
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
