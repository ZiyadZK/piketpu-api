const { DataTypes } = require("sequelize");
const db = require("../database_config");

const M_DataAkun = db.define('data_akun', {
    id_akun: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    email_akun: {
        type: DataTypes.STRING,
        unique: 'email_akun'
    },
    nama_akun: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password_akun: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role_akun: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_guru_piket_akun: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'id_guru_piket_akun'
    }
}, {
    timestamps: true,
    tableName: 'data_akun'
})

M_DataAkun.sync()

module.exports = M_DataAkun