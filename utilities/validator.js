const Validator = require('validatorjs');
const course = require('../models/course');

Validator.registerAsync('code_available', async function(code, attribute, req, passes) {
    const result = await course.findOne({
        where: {
            code
        }
    });
    result ? passes(false, 'Code is already reserved for another course') : passes();
    return true;
})

function studentValidator(data) {
    const rules = {
        fullname: 'required|alpha',
        entrance_year: 'required',
    }
    let validator = new Validator(data, rules)
    return validator;
}

function studyPlanValidator(data) {
    const rules = {
        student_id: 'required',
        courses: 'max:3'
    }
    let validator = new Validator(data, rules, {
        max: {
            array: 'A study plan can only have up to :max :attribute.'
        }
    });
    return validator;
}

function studyPlanCoursesValidator(data) {
    let validator = new Validator(data, {courses: 'max:3'}, {
        max: {
            string: 'A study plan can only have up to :max :attribute.'
        }
    });
    return validator;
}

function courseValidator(data) {
    const rules = {
        code: 'required|code_available',
        active_students: 'max:4'
    }
    let validator = new Validator(data, rules, {
        // code_available: {
        //     string: 'Code is already reserved for another course'
        // },
        max: {
            array: 'A course can only have up to :max :attribute at a time.'
        }
    })
    validator.setAttributeNames({active_students: 'active students'});
    return validator;
}

function courseStudentValidator(data) {
    let validator = new Validator(data, {active_students: 'max:4'}, {
        max: {
            array: 'A course can only have up to :max :attribute at a time.'
        }
    })
    validator.setAttributeNames({active_students: 'active students'});
    return validator;
}

function courseCodeValidator(data) {
    let validator = new Validator(data, {code: 'code_available'}, {
        // code_available: {
        //     string: 'Code is already reserved for another course'
        // }
    })
    return validator;
}
module.exports = {
    studentValidator,
    studyPlanValidator,
    studyPlanCoursesValidator,
    courseValidator,
    courseStudentValidator,
    courseCodeValidator
}
