const Validator = require('validatorjs');
const sequelize = require('./services/db');

Validator.registerAsync('exist', function(value, attribute, req, passes) {
    if (!attribute) throw new Error('Specify requirement exist:table,column');
    let attributes = attribute.split(",");
    if (attributes.length !== 2) throw new Error('Invalid format for validation rules');
    const {0: table, 1: column} = attributes;
    let message = `${column} is in use.`;
    sequelize.models[table].findOne({where: {[column]: value}})
        .then((res) => {
            if (res) {
                passes(false, message);
                return;
            }
            passes();
        })
})
async function validator(body, rules, customMessages, callback) {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
}

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}
  
function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
}

function currentYear() {
    return new Date().getFullYear();
}

function currentMonth() {
    return new Date().getMonth();
}



module.exports = {
    validator,
    getOffset,
    emptyOrRows,
    currentYear,
    currentMonth
}