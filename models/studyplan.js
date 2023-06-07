const { DataTypes } = require('@sequelize/core');
const { sequelize } = require('../services/db');
const { currentYear, currentMonth } = require('../helper');
// const student = require('./student');
// const course = require('./course');

const studyPlan = sequelize.define('StudyPlan', {
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
        allowNull: false,
        defaultValue: function () {
            return currentYear();
        }
    },
    period: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: function() {
            return currentMonth() < 6 ? 2 : 1;
        }
    },
    courses: {
        type: DataTypes.TEXT('long'),
        get: function() {
            return JSON.parse(this.getDataValue('courses'));
        },
        set: function(value) {
            this.setDataValue('courses', JSON.stringify(value));
        },
        validate: {
            isLength(value) {
                console.log('courses value ', JSON.parse(value).length);
                if (JSON.parse(value).length > 3) {
                    throw new Error('A student can only take 3 courses at a time.');
                }
            }
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'studyplans',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// studyplan.belongsTo(student);
// studyplan.hasMany(course);

module.exports = studyPlan;