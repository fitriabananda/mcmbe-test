const helper = require('../helper');
const config = require('../config');
const courses = require('./courses');
const studyPlan = require('../models/studyPlan');

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
    const default_data = {
        student_id: data.student_id,
        year: data.year,
        period: data.period,
        is_active: data.is_active 
    }
    const result = await studyPlan.create(default_data);
    let message = 'Error in creating study plan.';
    if (result.id) {
        message = 'Study plan created successfully.';
        await modifyCourses(result.id, data);
    }
    return {message};
}

async function modifyCourses(id, data) {
    let res = {};
    if (data.courses) {
        let i = 0;
        for await (const element of data.courses) {
            const result = await generateCourse({
                id: element.id,
                student_id: data.is_active && data.student_id,
                code: element.code,
                period_open: data.period,
                name: element.name
            });
            if (!result) {
                data.courses.splice(i, 1);
            }
            i++;
        }
        if (data.courses.length > 0) {
            try {
                res = await modify(id, data);
            } catch (err) {
                console.error(err.message);
            }
        }
    }
    return res;
}

async function generateCourse(data) {
    const course = await courses.getCourseById(data.id);
    if (course.data.length == 0) {
        try {
            await courses.create({
                ...data,
                active_students: data.student_id ? [data.student_id] : []
            });
        } catch (err) {
            console.error(err.message);
        }
    } else {
        let active_students = course.data.active_students;
        if (data.student_id) {
            active_students.push(data.student_id);
        }
        delete data.student_id;
        try {
            await courses.update(data.id, {
                ...data,
                active_students
            })
        } catch (err) {
            console.error(err.message);
            return false;
        }
    }
    return true;
}

async function update(id, data) {
    let modify_data = {};
    let result = {};
    if (data.courses) {
        modify_data.courses = data.courses;
        delete data.courses;
    }
    try {
        result = await modify(id, data);
        modify_data.is_active = result.data.is_active;
        modify_data.student_id = result.data.student_id;
    } catch (err) {
        console.error(err.message);
    }
    if (Object.keys(modify_data).length > 0) {
        result = await modifyCourses(id, modify_data);
    }
    return result;
}

async function modify(id, data) {
    const result = await studyPlan.update(data, {
        where: {
            id
        }
    });
    let message = 'Error in updating study plan.';
    let res = {};
    if (result && result.length > 0) {
        message = 'Study plan updated successfully.';
        const updated_studyplan = await studyPlan.findOne({
            where: {
                id
            }
        });
        res = updated_studyplan;
        return {message, data: res.dataValues};
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
