const { DataTypes } = require('@sequelize/core');
const { sequelize } = require('../services/db');
const studyplan = require('./studyplan');

const student = sequelize.define('Student', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     allowNull: false
    // },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeIndex'
    },
    entrance_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    studyplan_id: {
        type: DataTypes.INTEGER,
        references: {
            model: studyplan,
            key: 'id'
        }
    },
    previous_studyplans: {
        type: DataTypes.JSON,
    } 
}, {
    tableName: 'students',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = student;