const { DataTypes } = require('@sequelize/core');
const { sequelize } = require('../services/db');

const student = sequelize.define('Student', {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeIndex'
    },
    entrance_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    active_studyplan_id: {
        type: DataTypes.INTEGER,
        unique: true
    },
    previous_studyplans: {
        type: DataTypes.TEXT('long'),
        unique: true,
        get: function() {
            return JSON.parse(this.getDataValue('previous_studyplans'));
        },
        set: function(value) {
            this.setDataValue('previous_studyplans', JSON.stringify(value));
        },
    } 
}, {
    tableName: 'students',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = student;