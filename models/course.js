const { DataTypes } = require('@sequelize/core');
const { sequelize } = require('../services/db');
// const student = require('./student');
// const studyplan = require('./studyplan');

const course = sequelize.define('Course', {
    name: {
        type: DataTypes.STRING
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: 'compositeIndex'
    },
    period_open: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'courses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// course.belongsToMany(student);
// course.belongsToMany(studyplan);

module.exports = course;