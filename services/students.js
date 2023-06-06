const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getStudentsList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM students LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function createStudent(data) {
    const result = await db.query(
        `INSERT INTO students
        (fullname, entrance_year, studyplan_id, previous_studyplans)
        VALUES 
        (${data.fullname}, ${data.etrance_year}, ${data.studyplan_id}, ${data.previous_studyplans})`
    );

    let message = 'Error in creating student.';
    if (result.affectedRows) {
        message = 'Student created successfully.';
    }
    return {message}
}

module.exports = {
    getStudentsList,
    createStudent
}
