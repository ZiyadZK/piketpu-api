const { DataTypes } = require("sequelize");
const db = require("../database_config");

const M_Surat = db.define('data_surat', {
    id_surat_izin: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
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
    fk_surat_id_akun: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        references: {
            model: 'data_akun',
            key: 'id_akun'
        }
    }
}, {
    timestamps: false,
    tableName: 'data_surat'
})

module.exports = M_Surat