const { Op } = require("sequelize")
const { date_getMonthRange } = require("../../libs/date")
const M_DataAkun = require("../model/M_Akun")
const M_Surat = require("../model/M_Surat")

exports.F_Detail_getAll = async (nis) => {
    try {
        const data = await M_Surat.findAll({
            raw: true,
            where: {
                nis_siswa: nis
            },
            order: [
                ['tanggal', 'DESC'],
                ['waktu', 'DESC'],
            ],
            include: [
                {
                    model: M_DataAkun,
                    as: 'data_akun'
                }
            ]
        })

        const formattedData = data.map(value => {
            return {
                id_surat_izin: value['id_surat_izin'],
                nis_siswa: value['nis_siswa'],
                nama_siswa: value['nama_siswa'],
                kelas: value['kelas'],
                jurusan: value['jurusan'],
                rombel: value['rombel'],
                tanggal: value['tanggal'],
                waktu: value['waktu'],
                tipe: value['tipe'],
                keterangan: value['keterangan'],
                fk_surat_id_akun: value['fk_surat_id_akun'],
                nama_piket: value['data_akun.nama_akun'],
                nickname_piket: value['data_akun.nickname_akun'],
                email_piket: value['data_akun.email_akun'],
            }
        })

        return {
            success: true,
            data: formattedData
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message,
            debug: error
        }   
    }
}

exports.F_Detail_getAll_thisMonth = async (nis) => {
    try {

        const { startDate, endDate }= date_getMonthRange()

        const data = await M_Surat.findAll({
            raw: true,
            where: {
                nis_siswa: nis,
                tanggal: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: [
                ['tanggal', 'DESC'],
                ['waktu', 'DESC'],
            ],
            include: [
                {
                    model: M_DataAkun,
                    as: 'data_akun'
                }
            ]
        })

        const formattedData = data.map(value => {
            return {
                id_surat_izin: value['id_surat_izin'],
                nis_siswa: value['nis_siswa'],
                nama_siswa: value['nama_siswa'],
                kelas: value['kelas'],
                jurusan: value['jurusan'],
                rombel: value['rombel'],
                tanggal: value['tanggal'],
                waktu: value['waktu'],
                tipe: value['tipe'],
                keterangan: value['keterangan'],
                fk_surat_id_akun: value['fk_surat_id_akun'],
                nama_piket: value['data_akun.nama_akun'],
                nickname_piket: value['data_akun.nickname_akun'],
                email_piket: value['data_akun.email_akun'],
            }
        })

        return {
            success: true,
            data: formattedData
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message,
            debug: error
        }   
    }
}

