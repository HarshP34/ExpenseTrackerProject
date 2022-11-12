const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const DownloadedFiles = sequelize.define('filedownloaded', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fileUrl:Sequelize.STRING
})

module.exports = DownloadedFiles;