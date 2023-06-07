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

    }

    let validator = new Validator(data, rules, {

    })

    validator.setAttributeNames({

    })
    return validator;
}

function courseValidator(data) {
    const rules = {

    }

    let validator = new Validator(data, rules, {

    })

    validator.setAttributeNames({

    })
    return validator;
}
module.exports = {
    studentValidator,
    studyPlanValidator,
    courseValidator
}
