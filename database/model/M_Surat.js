const { DataTypes } = require("sequelize");
const db = require("../database_config");

const M_Surat = db.define('data_surat', {
    id_surat_izin: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nis_siswa: {
        type: DataTypes.STRING,
        allowNull: false
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
        type: DataTypes.STRING,
        allowNull: false
    },
    waktu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alasan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: true
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
    tableName: 'data_surat'
})

M_Surat.sync()

module.exports = M_Surat