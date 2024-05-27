const { DataTypes } = require("sequelize");
const db = require("../database_config");

const M_DataSurat = db.define('data_surat', {
    id_surat_izin: {
        type: DataTypes.STRING,
        primaryKey: true
    }, 
    nama_siswa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kelas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jurusan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rombel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tanggal: {
        type: DataTypes.STRING
    },
    waktu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_guru_piket: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nama_guru_piket: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'data_akun'
})

M_DataSurat.sync({ alter: true })

module.exports = M_DataSurat