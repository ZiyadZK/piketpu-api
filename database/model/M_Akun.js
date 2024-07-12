const { DataTypes } = require("sequelize");
const db = require("../database_config");
const M_Riwayat = require("./M_Riwayat");
const M_Surat = require("./M_Surat");

const M_DataAkun = db.define('data_akun', {
    id_akun: {
        type: DataTypes.INTEGER(4),
        primaryKey: true,
        autoIncrement: true
    },
    email_akun: {
        type: DataTypes.STRING,
        unique: 'email_akun'
    },
    nama_akun: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nickname_akun: {
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
    piket_id_pegawai: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        unique: 'piket_id_pegawai'
    }
}, {
    timestamps: true,
    tableName: 'data_akun'
})

M_DataAkun.hasMany(M_Riwayat, { foreignKey: 'fk_riwayat_id_akun', sourceKey: 'id_akun', as: 'akun_riwayat', onDelete: 'CASCADE'})
M_DataAkun.hasMany(M_Surat, { foreignKey: 'fk_surat_id_akun', sourceKey: 'id_akun', as: 'akun_surat', onDelete: 'SET NULL' })

M_Surat.belongsTo(M_DataAkun, { foreignKey: 'fk_surat_id_akun', targetKey: 'id_akun' })
M_Riwayat.belongsTo(M_DataAkun, { foreignKey: 'fk_riwayat_id_akun', targetKey: 'id_akun'})

module.exports = M_DataAkun