const db = require('./db');
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

async function create(data) {
    const result = await student.create(data);
    let message = 'Error in creating student.';
    if (result.id) {
        message = 'Student created successfully.';
    }
    return {message};
}

async function update(id, data) {
    const result = await db.query(
        `UPDATE students
        SET fullname=${data.fullname}, entrance_year=${data.entrance_year}, 
        studyplan_id=${data.studyplan_id}, previous_studyplans=${previous_studyplans}
        WHERE id=${id}`
    );

    let message = 'Error in updating student';
    if (result.affectedRows) {
        message = 'Student updated successfully.';
    }
    return {message};
}

module.exports = {
    getList,
    create,
    update
}
