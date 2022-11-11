const UUDI=require('uuid');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//id, name , password, phone number, role

const Forgotpassword = sequelize.define('forgotpassword', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
   isActive:Sequelize.BOOLEAN,
   isexpiredBy:Sequelize.DATE
})

module.exports = Forgotpassword;