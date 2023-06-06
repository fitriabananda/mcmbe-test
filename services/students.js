const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getList(page = 1) {
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

async function create(data) {
    const result = await db.query(
        `INSERT INTO students
        (fullname, entrance_year, studyplan_id, previous_studyplans)
        VALUES 
        (${data.fullname}, ${data.entrance_year}, ${data.studyplan_id}, ${data.previous_studyplans})`
    );

    let message = 'Error in creating student.';
    if (result.affectedRows) {
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
