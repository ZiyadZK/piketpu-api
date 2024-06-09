const { DataTypes } = require("sequelize");
const db = require("../database_config");

const M_Riwayat = db.define('data_riwayat', {
    no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
})