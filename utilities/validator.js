const Validator = require('validatorjs');

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
            JSON: 'The :attribute can only have :max at a time.'
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
        max: {
            JSON: 'The :attribute can only have :max at a time.'
        }
    })
    return validator;
}
module.exports = {
    studentValidator,
    studyPlanValidator,
    courseValidator
}
