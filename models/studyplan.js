const { DataTypes } = require('@sequelize/core');
const { sequelize } = require('../services/db');
// const student = require('./student');
// const course = require('./course');

const studyplan = sequelize.define('StudyPlan', {
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: student,
        //     key: 'id'
        // }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    period: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    courses: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'study_plans',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// studyplan.belongsTo(student);
// studyplan.hasMany(course);

module.exports = studyplan;