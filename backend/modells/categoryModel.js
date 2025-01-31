const {  DataTypes } = require('sequelize')
const sequelize = require('../db/databaseConnection')

const Category = sequelize.define('Category',{
    CategoryId : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CategoryName : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    tableName : 'Categories'
})

module.exports = Category