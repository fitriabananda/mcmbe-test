const { DataTypes } = require('@sequelize/core');
const { sequelize } = require('../services/db');

const studyplan = sequelize.define('studyplan', {

});

module.exports = studyplan;