const { DataTypes } = require('@sequelize/core');
const { sequelize } = require('../services/db');

const course = sequelize.define('course', {
    name: {
        type: DataTypes.STRING
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: 'compositeIndex',
        validate: {
            isAlphanumeric: true
        }
    },
    period_open: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    active_students: {
        type: DataTypes.TEXT('long'),
        get: function() {
            return JSON.parse(this.getDataValue('active_students'));
        },
        set: function(value) {
            this.setDataValue('active_students', JSON.stringify(value));
        },
        validate: {
            isLength(value) {
                if (JSON.parse(value).length > 4) {
                    throw new Error('A course can only have 4 active students at a time.');
                }
            }
        }
    }
}, {
    tableName: 'courses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = course;