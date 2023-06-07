const helper = require('../utilities/helper');
const config = require('../utilities/config');
const student = require('../models/student');
const studyPlans = require('./studyPlans');
const { studentValidator } = require('../utilities/validator');

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

async function modifyStudyPlan(student_id, data) {
    let res = {};
    if (data.active_studyplan_id) {
        const result = await generateStudyPlan({
            id: data.active_studyplan_id,
            student_id: student_id
        })
        if (!result) {
            data.active_studyplan_id = null;
        }
    }
    if (data.previous_studyplans) {
        let i = 0;
        for await (const element of data.previous_studyplans) {
            const result = await generateStudyPlan({
                id: element.id,
                student_id,
                year: element.year,
                period: element.period,
                is_active: false
            });
            if (!result) {
                data.previous_studyplans.splice(i, 1);
            }    
            i++;
        }
    }
    if (data.active_studyplan_id || data.previous_studyplans.length > 0) {
        try {
            res = await modify(student_id, data);
        } catch(err) {
            console.error(err.message);
        }
    }
    return res;
}

async function generateStudyPlan(data) {
    const study_plan = await studyPlans.getStudyPlanById(data.id);
        if (study_plan.data.length == 0) {
            try {
                await studyPlans.create(data);
            } catch (err) {
                console.error(err.message);
            }
        } else if (study_plan.data.student_id == data.student_id) {
            try {
                await studyPlans.update(data.id, data);
            } catch (err) {
                console.error(err.message);
            }
        } else {
            console.error('Study plan is for another student.');
            return false;
        }
        return true;
}

async function create(data) {
    let message = 'Error in creating student.';
    let status = 500;
    let validation = studentValidator(data);
    if (validation.fails()) {
        message = validation.errors.all();
        status = 422;
    } else {
        const default_data = {
            fullname: data.fullname,
            entrance_year: data.entrance_year
        }
        const result = await student.create(default_data);
        if (result.id) {
            message = 'Student created successfully.';
            status = 200;
            await modifyStudyPlan(result.id, data);
        }
    }
    return {message, status};
}

async function update(id, data) {
    let modify_data = {}
    let result = {};
    if (data.active_studyplan_id) {
        modify_data.active_studyplan_id = data.active_studyplan_id;
        delete data.active_studyplan_id;
    }
    if (data.previous_studyplans) {
        modify_data.previous_studyplans = data.previous_studyplans;
        delete data.previous_studyplans;
    }
    try {
        result = await modify(id, data);
    } catch (err) {
        console.error(err.message);
    }
    if (Object.keys(modify_data).length > 0) {
        result = await modifyStudyPlan(id, modify_data);
    }
    return result;
}

async function modify(id, data) {
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
