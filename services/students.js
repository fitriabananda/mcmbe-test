const helper = require('../helper');
const config = require('../config');
const student = require('../models/student');

async function getList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await student.findAll({offset, limit: config.listPerPage });
    
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
        data,
        meta
    }
}

async function getStudentById(id) {
    const result = await student.findByPk(id);
    const data = helper.emptyOrRows(result);
    return {data};
}

async function create(data) {
    const result = await student.create(data);
    let message = 'Error in creating student.';
    if (result.id) {
        message = 'Student created successfully.';
    }
    return {message};
}

async function update(id, data) {
    const result = await student.update(data, {
        where: {
            id
        }
    });
    let message = 'Error in updating student.';
    if (result && result.length > 0) {
        message = 'Student updated successfully.';
    }
    return {message};
} 

async function removeById(id) {
    const result = await student.destroy({
        where: {
            id
        }
    });
    let message = 'Error in deleting student.';
    if (result) {
        message = 'Student deleted successfully.';
    }
    return {message};
}

async function removeByAttributes(attr) {
    const result = await student.destroy({
        where: {
            ...attr
        }
    });
    let message = 'Error in deleting students.';
    if (result) {
        message = 'Students with defined attribute(s) deleted successfully.';
    }
    return {message};
}

module.exports = {
    getList,
    getStudentById,
    create,
    update,
    removeById,
    removeByAttributes
}
