const {  DataTypes } = require('sequelize')
const sequelize = require('../db/databaseConnection')
const Category = require('./categoryModel')

const Product = sequelize.define('Product', {
    ProductId : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    ProductName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    CategoryId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Category,
            key : 'CategoryId'
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
    },
    // CategoryName : {
    //     type : DataTypes.STRING,
    //     allowNull : false
    // }
}, {
    tableName : 'products'
})

Product.belongsTo(Category, {foreignKey : 'CategoryId'})
Category.hasMany(Product, {foreignKey : 'CategoryId'})

module.exports = Product