const validator = require('../helper');

async function studentValidator(req, res, next) {
    const rules = {
        fullname: 'required|alpha',
        entrance_year: 'required',
    }
    await validator(req.body, rules, {}, (err, status) => {
        if(!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.error(err));
}

module.exports = {
    studentValidator
}