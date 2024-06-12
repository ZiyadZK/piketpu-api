const { DataTypes } = require("sequelize");
const db = require("../database_config");

const M_Riwayat = db.define('data_riwayat', {
    no_surat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tanggal: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    waktu: {
        type: DataTypes.STRING(6),
        allowNull: true
    },
    nama_akun: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    aksi: {
        type: DataTypes.STRING(12),
        allowNull: true
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    json: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'data_riwayat'
})

M_Riwayat.sync({ alter: true })

module.exports = M_Riwayat